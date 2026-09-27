#!/usr/bin/env python3
"""Keep the scheduled-post queue from running away into the future.

tools/blog/schedule.py was a ONE-OFF migration for the original 183-article
dump: it took the posts dated today, kept KEEP_NOW=33 and pushed the rest out
at PER_DAY=3 weekday slots. It was never meant to run daily, and the daily
writer does not call it — the writer appends each new batch at the TAIL of
whatever is already scheduled.

That is the bug. The writer produces ~4.7 posts per calendar day (~33/week).
Weekday-only slots at 3/day drain 15/week. The queue therefore grows by about
18 posts — roughly 2.5 calendar days of lead time — every single day:

    batch of 2026-09-25 -> dated 2026-12-10 .. 2026-12-11
    batch of 2026-09-26 -> dated 2026-12-14 .. 2026-12-16
    batch of 2026-09-27 -> dated 2026-12-17 .. 2026-12-18   (82 days out)

Everything downstream then behaves correctly and the post simply does not
exist: isPublished() is false, prerender.mjs writes no page, prune_scheduled.py
deletes the body from dist/, gen_sitemap.py cannot list a URL it never built,
and deploy.yml MIRRORS blog/ and blog-data/ so the server matches the build.
CI is green because nothing failed.

This script makes the schedule repeatable and bounded:

  * Posts already published (date <= today) are NEVER touched. Moving a date a
    reader has already seen would invent a history, which is the exact thing
    the original scheduling note refused to do.
  * Future-dated posts keep their relative ORDER and are repacked onto the
    earliest free weekday slots starting tomorrow, PER_DAY per weekday.
  * Idempotent: running it twice in a row changes nothing the second time.

Usage:
    python3 tools/blog/compact_schedule.py --dry-run     # show the plan
    python3 tools/blog/compact_schedule.py --apply       # rewrite blogIndex.ts
    python3 tools/blog/compact_schedule.py --check       # CI: warn if runaway
"""
import argparse, datetime, pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
IDX = ROOT / "src" / "data" / "blogIndex.ts"

# Slots per weekday. This MUST be >= the writer's output rate or the queue can
# only grow. The writer currently emits ~33 posts/week; 5 weekdays x 7 = 35.
PER_DAY = 7
# Anything scheduled further out than this is a runaway queue, not scheduling.
MAX_LEAD_DAYS = 45

# Same record shape prune_scheduled.py and schedule.py match: one line, exactly
# two leading spaces, terminated by '" },'. Keep the three in sync.
REC = re.compile(r'^  \{ id: "([^"]+)".*?date: "([^"]*)" \},$', re.M)


def india_today():
    """A post's date is its intended IST publish day — the same clock
    isPublished() and prune_scheduled.py use. Never the runner's UTC date."""
    return (datetime.datetime.now(datetime.timezone.utc)
            + datetime.timedelta(hours=5, minutes=30)).date()


def weekday_slots(start, count, per_day):
    """`count` slots on consecutive weekdays, `per_day` each, starting the day
    AFTER `start`. Weekends are skipped — B2B readers are not reading on a
    Sunday and the existing queue already follows that shape."""
    out, d = [], start
    while len(out) < count:
        d += datetime.timedelta(days=1)
        if d.weekday() < 5:
            out.extend([d] * per_day)
    return out[:count]


def build_plan(src, today, per_day, front=()):
    recs = REC.findall(src)
    if not recs:
        sys.exit("compact_schedule: matched 0 records — blogIndex.ts format changed")
    future = [(datetime.date.fromisoformat(d), s) for s, d in recs
              if d and datetime.date.fromisoformat(d) > today]
    # Sort by the date the writer intended, then by slug, so the order a human
    # planned is preserved and the result is stable across runs.
    future.sort(key=lambda x: (x[0], x[1]))
    # --front pulls named slugs to the head of the queue. This exists for one
    # specific situation: a slug that was already submitted to IndexNow while
    # its page 404s. Search engines have been told the URL exists, so the honest
    # repair is to publish it now rather than leave a dead URL advertised.
    if front:
        known = {s for _, s in future}
        missing = [s for s in front if s not in known]
        if missing:
            sys.exit("compact_schedule: --front slug not in the queue: "
                     + ", ".join(missing))
        order = {s: i for i, s in enumerate(front)}
        future.sort(key=lambda x: (0, order[x[1]]) if x[1] in order else (1, 0))
    slots = weekday_slots(today, len(future), per_day)
    plan = {}
    for i, (old, slug) in enumerate(future):
        new = slots[i]
        if new != old:
            plan[slug] = (old.isoformat(), new.isoformat())
    return recs, future, slots, plan


def apply_plan(src, plan):
    for slug, (_old, new) in plan.items():
        pat = re.compile(rf'(^  \{{ id: "{re.escape(slug)}".*?date: ")[^"]*(" \}},$)',
                         re.M)
        src2 = pat.sub(lambda m: m.group(1) + new + m.group(2), src, count=1)
        if src2 == src:
            sys.exit(f"compact_schedule: could not rewrite {slug}")
        src = src2
    return src


def main():
    ap = argparse.ArgumentParser()
    g = ap.add_mutually_exclusive_group(required=True)
    g.add_argument("--dry-run", action="store_true")
    g.add_argument("--apply", action="store_true")
    g.add_argument("--check", action="store_true")
    ap.add_argument("--per-day", type=int, default=PER_DAY)
    ap.add_argument("--max-lead-days", type=int, default=MAX_LEAD_DAYS)
    ap.add_argument("--front", default="",
                    help="comma-separated slugs to pull to the head of the "
                         "queue (use for slugs already submitted to IndexNow)")
    a = ap.parse_args()

    today = india_today()
    src = IDX.read_text()
    front = tuple(x.strip() for x in a.front.split(",") if x.strip())
    recs, future, slots, plan = build_plan(src, today, a.per_day, front)

    published = len(recs) - len(future)
    tail_now = max((d for d, _ in future), default=today)
    tail_after = slots[-1] if slots else today
    lead_now = (tail_now - today).days
    lead_after = (tail_after - today).days

    print(f"  today (IST):      {today}")
    print(f"  posts total:      {len(recs)}  (published {published}, queued {len(future)})")
    print(f"  queue tail now:   {tail_now}  (+{lead_now}d)")
    print(f"  queue tail after: {tail_after}  (+{lead_after}d) at {a.per_day}/weekday")
    print(f"  posts that move:  {len(plan)}")

    if a.check:
        if lead_now > a.max_lead_days:
            print(f"::warning::blog queue is {lead_now} days deep "
                  f"(limit {a.max_lead_days}). {len(future)} posts are written but "
                  f"unreachable. Run: npm run blog:compact")
            return 1
        print("  queue depth OK")
        return 0

    if not plan:
        print("  nothing to compact")
        return 0

    for slug, (old, new) in sorted(plan.items(), key=lambda kv: kv[1][1])[:12]:
        print(f"    {old} -> {new}  {slug[:58]}")
    if len(plan) > 12:
        print(f"    ... and {len(plan) - 12} more")

    if a.apply:
        IDX.write_text(apply_plan(src, plan))
        print(f"  rewrote {IDX.relative_to(ROOT)}")
    else:
        print("  DRY RUN — nothing written")
    return 0


if __name__ == "__main__":
    sys.exit(main())
