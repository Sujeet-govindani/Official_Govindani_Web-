<?php
/**
 * The assistant, on WhatsApp.
 *
 * wacrm posts here when a contact messages the business number; this answers
 * with the same brain the website widget uses, so a question asked on WhatsApp
 * gets the same answer as the same question asked on the site. The brief, the
 * junk gate, the respect rules and the lead capture all live in chat.php and
 * are reached over loopback rather than copied — two implementations of the
 * same product knowledge would drift apart within a week.
 *
 * Contract (github.com/ArnasDon/wacrm, docs/public-api.md):
 *   in   POST { id, event, occurred_at, account_id, data }
 *        data for message.received: { conversation_id, contact_id,
 *                                     whatsapp_message_id, content_type, text }
 *        headers X-Wacrm-Event, X-Wacrm-Webhook-Id, X-Wacrm-Signature
 *   out  GET  /api/v1/contacts/{id}   -> the phone, in E.164
 *        POST /api/v1/messages        { to, type: "text", text }
 *
 * Three things the documentation makes non-negotiable:
 *
 * 1. Delivery is ONE attempt with a short timeout, and consecutive failures
 *    auto-disable the endpoint. A model call takes seconds, so the 200 is
 *    returned and the connection closed BEFORE any thinking starts. A webhook
 *    disabled for being slow is a silent outage that costs leads.
 * 2. Redirects are not followed, so this must answer at its exact URL.
 * 3. The same delivery can arrive twice and order is not guaranteed, so every
 *    envelope id is recorded and repeats are dropped. Without that, a retry
 *    means the customer is answered twice.
 *
 * Config, in ~/gs-private/config.php on the server — never in the repo:
 *   'wacrm_secret'   => the whsec_… returned once when the webhook was registered
 *   'wacrm_key'      => wacrm_live_… API key (scopes: messages:send, contacts:read,
 *                       messages:read)
 *   'wacrm_base'     => e.g. 'https://gitesting.online'
 *   'internal_token' => shared with chat.php so this can identify the rate-limit
 *                       subject as the WhatsApp number rather than the server
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

const WA_MAX_REPLY   = 900;      // characters; longer reads badly on a phone
const WA_REPLAY_SECS = 300;      // signature age allowed, per the docs

$private = dirname($_SERVER['DOCUMENT_ROOT']) . '/gs-private';
$cfg     = is_file("$private/config.php") ? (require "$private/config.php") : [];
$state   = "$private/state";
if (!is_dir($state)) @mkdir($state, 0700, true);

/* This host has log_errors Off, so every error_log() call in this file would go
 * nowhere and a failed reply would be silent — the worst possible property for
 * something that answers customers unattended. Logging is therefore turned on
 * for this request only, writing beside the state files, outside the web root.
 * Without this the first real WhatsApp message that fails tells us nothing. */
ini_set('log_errors', '1');
ini_set('error_log', "$state/wa.log");

$raw = (string) file_get_contents('php://input', false, null, 0, 256 * 1024);

/* ---------- authenticate before anything else ---------- */

function signatureOk(string $raw, string $header, string $secret): bool {
    if ($secret === '' || !preg_match('/t=(\d+),\s*v1=([0-9a-f]+)/i', $header, $m)) return false;
    if (abs(time() - (int) $m[1]) > WA_REPLAY_SECS) return false;      // replay
    $expected = hash_hmac('sha256', $m[1] . '.' . $raw, $secret);
    return hash_equals($expected, strtolower($m[2]));
}

$sig = (string) ($_SERVER['HTTP_X_WACRM_SIGNATURE'] ?? '');
if (!signatureOk($raw, $sig, (string) ($cfg['wacrm_secret'] ?? ''))) {
    http_response_code(404);        // look like nothing, not like a target
    echo '{"ok":false}';
    exit;
}

$evt = json_decode($raw, true);
if (!is_array($evt)) { echo '{"ok":true}'; exit; }

/* ---------- answer the webhook now; think afterwards ---------- */

echo '{"ok":true}';
if (function_exists('fastcgi_finish_request')) {
    fastcgi_finish_request();
} elseif (function_exists('litespeed_finish_request')) {
    litespeed_finish_request();
} else {
    // Neither hook available: flush what we can and keep going regardless of
    // whether the client is still listening.
    @ob_end_flush();
    @flush();
}
ignore_user_abort(true);
@set_time_limit(60);

/* ---------- from here on, nobody is waiting ---------- */

if (($evt['event'] ?? '') !== 'message.received') exit;

$d    = is_array($evt['data'] ?? null) ? $evt['data'] : [];
$text = trim((string) ($d['text'] ?? ''));
if ($text === '' || ($d['content_type'] ?? 'text') !== 'text') exit;   // media: leave it to a human

// Deliveries repeat and arrive out of order. One answer per envelope id.
$seen = "$state/wa-seen-" . substr(hash('sha256', (string) ($evt['id'] ?? $raw)), 0, 24) . '.txt';
if (is_file($seen)) exit;
@file_put_contents($seen, (string) time());
foreach (glob("$state/wa-seen-*.txt") ?: [] as $old) {         // keep the dir small
    if (time() - (int) @filemtime($old) > 86400) @unlink($old);
}

$base = rtrim((string) ($cfg['wacrm_base'] ?? ''), '/');
$key  = (string) ($cfg['wacrm_key'] ?? '');
if ($base === '' || $key === '') { error_log('[gs-wa] not configured'); exit; }

/** One JSON call to the CRM. Returns the decoded `data`, or null. */
function crm(string $method, string $url, string $key, ?array $body = null): ?array {
    $ch = curl_init($url);
    $opt = [
        CURLOPT_CUSTOMREQUEST  => $method,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 15,
        CURLOPT_HTTPHEADER     => ['Authorization: Bearer ' . $key, 'Content-Type: application/json'],
    ];
    if ($body !== null) $opt[CURLOPT_POSTFIELDS] = json_encode($body, JSON_UNESCAPED_UNICODE);
    curl_setopt_array($ch, $opt);
    $out  = curl_exec($ch);
    $code = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    if (curl_errno($ch)) { error_log('[gs-wa] crm: ' . curl_error($ch)); curl_close($ch); return null; }
    curl_close($ch);
    $j = json_decode((string) $out, true);
    if ($code >= 300) {
        // wacrm returns a stable error.code; keep it, it is how a missing scope
        // or an unconfigured WhatsApp number gets diagnosed.
        error_log("[gs-wa] crm $code " . substr((string) ($j['error']['code'] ?? $out), 0, 120));
        return null;
    }
    return is_array($j['data'] ?? null) ? $j['data'] : null;
}

/* The webhook carries a contact_id, not a number, and the send endpoint wants
 * E.164 — so the phone is looked up rather than guessed. */
$contactId = (string) ($d['contact_id'] ?? '');
$contact   = $contactId !== '' ? crm('GET', "$base/api/v1/contacts/" . rawurlencode($contactId), $key) : null;
$to        = (string) ($contact['phone'] ?? '');
if ($to === '') { error_log('[gs-wa] no phone for contact ' . $contactId); exit; }

/* Prior turns, so the assistant is not amnesiac between messages. Read from the
 * CRM instead of kept here: it already stores the thread, and a second copy
 * would be one more thing to keep in step. */
$history = [];
$convId  = (string) ($d['conversation_id'] ?? '');
if ($convId !== '') {
    $rows = crm('GET', "$base/api/v1/conversations/" . rawurlencode($convId) . '/messages?limit=12', $key);
    foreach (array_reverse($rows ?? []) as $m) {          // API returns newest first
        $body = trim((string) ($m['content_text'] ?? $m['text'] ?? ''));
        if ($body === '') continue;
        $history[] = [
            'role'    => ($m['direction'] ?? '') === 'outbound' ? 'assistant' : 'user',
            'content' => mb_substr($body, 0, 1500),
        ];
    }
}
$history[] = ['role' => 'user', 'content' => mb_substr($text, 0, 1500)];
$history = array_slice($history, -12);

/* The brain, unchanged. chat.php owns the brief, the junk gate, the respect
 * rules and the lead capture; this asks it the question and relays the answer.
 * The subject header makes rate limiting count the WhatsApp number, not this
 * server — without it every WhatsApp visitor would share one bucket. */
$ch = curl_init('https://govindaniit.com/api/chat.php');
curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 45,
    CURLOPT_HTTPHEADER     => [
        'Content-Type: application/json',
        'X-GS-Internal: ' . (string) ($cfg['internal_token'] ?? ''),
        'X-GS-Subject: wa:' . substr(hash('sha256', $to), 0, 32),
    ],
    CURLOPT_POSTFIELDS     => json_encode([
        'messages' => $history,
        'lang'     => 'the language the visitor used',
        'context'  => 'Channel: WhatsApp. Keep the reply short enough to read on a phone.',
    ], JSON_UNESCAPED_UNICODE),
]);
$answer = json_decode((string) curl_exec($ch), true);
curl_close($ch);

$reply = trim((string) ($answer['reply'] ?? ''));
if ($reply === '') { error_log('[gs-wa] empty reply'); exit; }

/* WhatsApp is not markdown. It reads *one* asterisk as bold, so the widget's
 * **double** would show up as literal asterisks — the same complaint that was
 * raised about the web panel before it was fixed there. */
$reply = preg_replace('/\*\*(.+?)\*\*/su', '*$1*', $reply) ?? $reply;
$reply = preg_replace('/^\s*#{1,6}\s*/mu', '', $reply) ?? $reply;     // headings
$reply = preg_replace('/`([^`]*)`/u', '$1', $reply) ?? $reply;        // code ticks
if (mb_strlen($reply) > WA_MAX_REPLY) {
    $cut = mb_substr($reply, 0, WA_MAX_REPLY);
    $dot = max(mb_strrpos($cut, '. '), mb_strrpos($cut, '। '), mb_strrpos($cut, "\n"));
    $reply = ($dot > 200 ? mb_substr($cut, 0, $dot + 1) : $cut);
}

crm('POST', "$base/api/v1/messages", $key, ['to' => $to, 'type' => 'text', 'text' => $reply]);
error_log('[gs-wa] replied to ' . substr($to, 0, 5) . 'xxxxx (' . mb_strlen($reply) . ' chars)');
