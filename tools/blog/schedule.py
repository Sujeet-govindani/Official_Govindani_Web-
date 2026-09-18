#!/usr/bin/env python3
"""Spread the one-day batch across the coming weeks.

183 articles all carrying today's date is honest but reads as a dump. Rather
than backdate them — which would invent a history a reader can check — this
moves most of them FORWARD, so each one genuinely publishes on the day its date
says. A post whose date has not arrived is not prerendered, not in the sitemap
and not reachable: it does not exist yet, rather than existing quietly.
"""
import datetime, pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
IDX = ROOT / "src" / "data" / "blogIndex.ts"
TODAY = datetime.date.today()
KEEP_NOW = 33          # go out with this batch
PER_DAY = 3            # weekdays only

src = IDX.read_text()
recs = re.findall(r'^  \{ id: "([^"]+)".*?date: "([^"]*)" \},$', src, re.M)
batch = sorted(i for i, d in recs if d == TODAY.isoformat())
print(f"  {len(recs)} posts total; {len(batch)} dated today")

def weekdays_from(start, n):
    out, d = [], start
    while len(out) < n:
        d += datetime.timedelta(days=1)
        if d.weekday() < 5:
            out.append(d)
    return out

hold = batch[KEEP_NOW:]
slots = weekdays_from(TODAY, (len(hold) + PER_DAY - 1) // PER_DAY)
plan = {}
for i, slug in enumerate(hold):
    plan[slug] = slots[i // PER_DAY].isoformat()

for slug, new in plan.items():
    pat = re.compile(rf'(^  \{{ id: "{re.escape(slug)}".*?date: ")[^"]*(" \}},$)', re.M)
    src2 = pat.sub(lambda m: m.group(1) + new + m.group(2), src, count=1)
    assert src2 != src, slug
    src = src2
IDX.write_text(src)

last = max(plan.values()) if plan else TODAY.isoformat()
print(f"  publishing now:      {KEEP_NOW + sum(1 for i, d in recs if d != TODAY.isoformat())}")
print(f"  scheduled ahead:     {len(hold)} across {len(slots)} weekdays")
print(f"  last one goes live:  {last}")
