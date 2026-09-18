# Give Setu chat proxy — server setup

One-time, on the Hostinger server. Takes about ten minutes.

The browser never sees the Anthropic API key. It POSTs to `/api/chat.php`, and
that file — which is server-side PHP, not shipped JavaScript — adds the key and
calls the Messages API.

**Do not put the key in the repo, in any file under `public/`, or in any
environment variable the front-end build can read.** A key in front-end code is
readable by anyone who opens devtools, and it is billed to you until you notice.

---

## 1. Create a private directory OUTSIDE the web root

SSH in, then:

```bash
cd ~/domains/govindaniit.com          # the parent of public_html
mkdir -p gs-private/state
chmod 700 gs-private gs-private/state
```

`public_html/` is served over HTTP. `gs-private/` sits beside it and is not.
`chat.php` looks for exactly `dirname(DOCUMENT_ROOT) . '/gs-private'`.

## 2. Install the Anthropic PHP SDK there

```bash
cd ~/domains/govindaniit.com/gs-private
composer require "anthropic-ai/sdk"
```

If `composer` is missing:

```bash
cd ~/domains/govindaniit.com/gs-private
curl -sS https://getcomposer.org/installer | php
php composer.phar require "anthropic-ai/sdk"
```

## 3. Write the config, with your own key

Create `~/domains/govindaniit.com/gs-private/config.php`:

```php
<?php
return [
    // From console.anthropic.com. Paste it here on the server, nowhere else.
    'api_key' => 'sk-ant-...',

    // claude-opus-5 is the most capable. For a pricing chat that answers the
    // same questions repeatedly, claude-sonnet-5 costs about 40% as much per
    // token and is very likely enough. Your call — change the string and test.
    'model'  => 'claude-opus-5',

    // low | medium | high. 'low' keeps answers fast and cheap, which is what a
    // chat box wants. Raise it only if answers come back too thin.
    'effort' => 'low',

    // Any long random string. Used to hash visitor IPs for rate limiting so
    // raw IPs are never written to disk.
    'salt'   => 'change-this-to-something-random',
];
```

Then lock it down:

```bash
chmod 600 ~/domains/govindaniit.com/gs-private/config.php
```

## 4. Check it parses before you trust it

```bash
php -l ~/domains/govindaniit.com/public_html/api/chat.php
```

Must print `No syntax errors detected`. This step matters — the file could not
be linted locally, because there is no PHP on the development machine.

## 5. Prove the key is not reachable from the web

```bash
curl -s -o /dev/null -w '%{http_code}\n' https://govindaniit.com/gs-private/config.php   # expect 404
curl -s https://govindaniit.com/api/chat.php                                              # expect {"error":"POST only."}
```

Then a real request:

```bash
curl -s -X POST https://govindaniit.com/api/chat.php \
  -H 'Content-Type: application/json' \
  -H 'Origin: https://govindaniit.com' \
  -d '{"messages":[{"role":"user","content":"What does Give Setu cost for 3000 donors?"}],"lang":"English"}'
```

If it answers, you are done. If it returns `{"error":"Chat is not configured
on this server yet.","setup":true}`, step 1, 2 or 3 is incomplete.

---

## What stops this becoming an expensive mistake

A public proxy can be drained by anyone who finds the URL, even though the key
never leaves the server. These limits are in `chat.php` and are the actual
spend ceiling:

| Control | Value | Why |
|---|---|---|
| `MAX_TOKENS` | 700 | Caps the cost of any single answer |
| `PER_IP_PER_HOUR` | 25 | Stops one visitor looping it |
| `PER_IP_PER_DAY` | 120 | Stops a slow drip from one source |
| `GLOBAL_PER_DAY` | 4000 | Whole-site circuit breaker |
| `MAX_HISTORY_TURNS` | 10 | Old turns are dropped, not re-billed every message |
| `MAX_BODY_BYTES` | 12000 | Nobody pastes a book into it |
| Origin allowlist | govindaniit.com | Rejects use from other sites |
| Prompt caching | on the system brief | The long brief is charged at ~10% after the first call |

Raise or lower them by editing the constants at the top of `chat.php`.

**Set a spend limit in the Anthropic console as well.** The controls above are
ours; a console limit is enforced regardless of any bug in this file.

## Rotating the key

Replace `api_key` in `config.php`. Nothing else changes and no deploy is
needed — the key was never in the build.

## What it costs, roughly

The system brief is about 1,200 tokens and is cached, so after the first call
each answer costs roughly 1,200 cached input + a few hundred fresh input + up
to 700 output. On Sonnet 5 that is well under ₹1 per conversation; on Opus 5,
a few rupees. The daily global cap is the real ceiling either way.
