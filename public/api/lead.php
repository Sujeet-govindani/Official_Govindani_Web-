<?php
/**
 * api/lead.php — website lead bridge.
 *
 * The contact form (ContactUsForm.tsx) and blog CTAs POST here, same-origin.
 * Two sinks, both server-side (no secret ever reaches the browser):
 *   1. append to gs-private/state/web_leads.jsonl  (full record incl. source +
 *      campaign/message — powers the daily "website leads" Slack digest and
 *      attribution; always written).
 *   2. find-or-create the contact in wacrm via /api/v1/contacts using the key
 *      already in gs-private/config.php (same key chat.php/wa.php use), so the
 *      lead lands in the WhatsApp CRM pipeline for the team to work.
 * Never fails the form: always returns {ok:true}; CRM errors are reported inside.
 */
header('Content-Type: application/json');
header('X-Content-Type-Options: nosniff');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'POST only']);
    exit;
}

$private = dirname($_SERVER['DOCUMENT_ROOT']) . '/gs-private';
$cfg = is_file("$private/config.php") ? (require "$private/config.php") : [];

$raw = file_get_contents('php://input');
$in = json_decode($raw, true);
if (!is_array($in)) {
    // also accept urlencoded form posts
    $in = $_POST ?: [];
}

$clip = function ($s, $n) { $s = trim((string)$s); return mb_substr($s, 0, $n); };
$name     = $clip($in['name']     ?? '', 120);
$email    = $clip($in['email']    ?? '', 160);
$subject  = $clip($in['subject']  ?? '', 160);
$message  = $clip($in['message']  ?? '', 2000);
$source   = $clip($in['source']   ?? 'website', 60);
$campaign = $clip($in['campaign'] ?? '', 160);

$digits = preg_replace('/\D+/', '', (string)($in['phone'] ?? ''));
if (strlen($digits) === 10) {
    $digits = '91' . $digits;          // bare Indian mobile
}
$phoneE = $digits ? '+' . $digits : '';

// --- sink 1: local jsonl (always) ----------------------------------------
$rec = [
    'at'       => date('c'),
    'name'     => $name,
    'phone'    => $phoneE,
    'email'    => $email,
    'subject'  => $subject,
    'message'  => $message,
    'source'   => $source,
    'campaign' => $campaign,
    'ua'       => $clip($_SERVER['HTTP_USER_AGENT'] ?? '', 180),
];
@mkdir("$private/leads", 0775, true);
@file_put_contents(
    "$private/leads/web_leads.jsonl",
    json_encode($rec, JSON_UNESCAPED_UNICODE) . "\n",
    FILE_APPEND | LOCK_EX
);

// --- sink 2: wacrm contact (needs a phone) -------------------------------
$crm = ['ok' => false, 'skipped' => 'no phone or crm not configured'];
if ($phoneE !== '' && !empty($cfg['wacrm_base']) && !empty($cfg['wacrm_key'])) {
    $payload = ['phone' => $phoneE];
    if ($name)  $payload['name']  = $name;
    if ($email) $payload['email'] = $email;
    $ch = curl_init(rtrim($cfg['wacrm_base'], '/') . '/api/v1/contacts');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST           => true,
        CURLOPT_TIMEOUT        => 15,
        CURLOPT_HTTPHEADER     => [
            'Authorization: Bearer ' . $cfg['wacrm_key'],
            'Content-Type: application/json',
        ],
        CURLOPT_POSTFIELDS     => json_encode($payload, JSON_UNESCAPED_UNICODE),
    ]);
    $resp = curl_exec($ch);
    $code = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    $crm = ['ok' => ($code >= 200 && $code < 300), 'http' => $code];
}

echo json_encode(['ok' => true, 'crm' => $crm]);
