# Bot training — resume point

Blocked on the free gateway, not on the work. Balance is $0.00 and the API
returns `insufficient_quota` for all four models. Only the account owner can
top it up: https://platform.experientiallabs.ai/credits (top-ups start at $5).
The earlier note here said the free allowance resets at 00:00 UTC — that was an
assumption, and the API's own error message says nothing of the kind. Do not
repeat it as fact.

## Where the run actually stands

- corpus: 1,672 questions, sharded 836 + 836
- scored: 170  (f0 90 · f1 80)
- remaining: 1,502
- of the 170: 26 flagged, 9 of which were the credit exhaustion itself
  (gateway/judge unreachable), so 17 real failures = 89.4% passing

## Resume command

    cd ~/Documents/Official_Govindani_Web
    for i in 0 1; do
      nohup python3 tools/bot/probe.py f$i --big --shard=$i --of=2 > tools/bot/f$i.log 2>&1 &
    done

Results accumulate in tools/bot/results-f0.json and results-f1.json.
Both the answer and the judge run on the free models, so this costs no
Anthropic credit — only the gateway balance.

## All 17 failures are fixed

They are corrections 3–15 in the CORRECTIONS block of public/api/chat.php,
each checked against tools/bot/givesetu_reference.txt before being written.
Two of them were the judge being wrong rather than the bot:

- "no delete facility" in the quotation is about the append-only audit trail,
  not donor data. Records can be deleted, with a thirty-day undo bin.
- on a donor asking to be removed, the document does answer it: global opt-out
  is honoured automatically. The bot was right not to invent a deletion
  process and wrong to deflect the opt-out.

Verified live afterwards: the Growth capacity figure (10,000 active donors)
and the exit-terms answer. The exit-terms one needed a scripted answer — a
prohibition alone did not hold, exactly as with the lead ask.

## Judge caveat for the next run

The judge marked replies wrong on both points above. Read its reasoning
against the quotation before acting on it; scoring it produced 9 infra
failures counted as bot failures once already.
