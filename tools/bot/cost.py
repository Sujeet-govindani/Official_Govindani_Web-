#!/usr/bin/env python3
"""What the assistant has actually cost, from the token counts it logged.

Reads gs-private/state/usage.log (one JSON line per API call) and prices it.
Measured rather than estimated: the estimate could not see how many calls paid
the cache-write price, and that single figure decides the bill. A cold start
costs nine times a cached message, so spend tracks idle gaps between visitors
far more than it tracks how many people talked to the bot.

    ssh -p 65002 u705135964@195.35.5.105 \
      "cat ~/domains/govindaniit.com/gs-private/state/usage.log" | python3 cost.py
    python3 cost.py --balance 20
"""
import argparse, collections, json, sys, time

# $ per million tokens. Cache read is 0.1x input, cache write 1.25x.
RATES = {
    "claude-haiku-4-5": (1.00, 5.00),
    "claude-sonnet-5":  (2.00, 10.00),
}
DEFAULT = "claude-haiku-4-5"


def price(row):
    model = (row.get("model") or DEFAULT).split("-2")[0]
    inp, out = RATES.get(model, RATES[DEFAULT])
    return (row.get("in", 0) * inp
            + row.get("out", 0) * out
            + row.get("read", 0) * inp * 0.10
            + row.get("write", 0) * inp * 1.25) / 1e6


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--balance", type=float, help="credit added, to project how long it lasts")
    a = ap.parse_args()

    rows = []
    for line in sys.stdin:
        line = line.strip()
        if not line:
            continue
        try:
            rows.append(json.loads(line))
        except json.JSONDecodeError:
            continue
    if not rows:
        print("  no usage logged yet — the log fills as people use the bot")
        return

    total = sum(price(r) for r in rows)
    cold = sum(1 for r in rows if r.get("write", 0) > 0)
    span_days = max((max(r["t"] for r in rows) - min(r["t"] for r in rows)) / 86400, 1 / 24)

    print(f"  calls           {len(rows):,}")
    print(f"  cold starts     {cold:,}  ({cold / len(rows) * 100:.0f}% of calls paid to rewrite the brief)")
    print(f"  spent           ${total:.2f}")
    print(f"  per call        ${total / len(rows):.4f}")
    print(f"  over            {span_days:.1f} days  ->  ${total / span_days:.2f}/day")

    # Where the money actually went.
    buckets = collections.Counter()
    for r in rows:
        m = (r.get("model") or DEFAULT).split("-2")[0]
        inp, out = RATES.get(m, RATES[DEFAULT])
        buckets["cache writes (cold starts)"] += r.get("write", 0) * inp * 1.25 / 1e6
        buckets["cache reads"] += r.get("read", 0) * inp * 0.10 / 1e6
        buckets["uncached input"] += r.get("in", 0) * inp / 1e6
        buckets["output"] += r.get("out", 0) * out / 1e6
    print("\n  where it went:")
    for k, v in buckets.most_common():
        share = v / total * 100 if total else 0
        print(f"    ${v:>7.2f}  {share:>3.0f}%  {k}")

    by_model = collections.Counter()
    for r in rows:
        by_model[(r.get("model") or DEFAULT)] += price(r)
    if len(by_model) > 1:
        print("\n  by model:")
        for k, v in by_model.most_common():
            print(f"    ${v:>7.2f}  {k}")

    if a.balance:
        rate = total / span_days
        left = a.balance - total
        print(f"\n  balance ${a.balance:.2f} - spent ${total:.2f} = ${left:.2f} left")
        if rate > 0:
            print(f"  at ${rate:.2f}/day that is {left / rate:.0f} more days"
                  f" (empty around {time.strftime('%d %b', time.localtime(time.time() + left / rate * 86400))})")


if __name__ == "__main__":
    main()
