#!/usr/bin/env python3
"""Keep unpublished article bodies out of the build output.

public/ is copied wholesale into dist/, so a scheduled post's body shipped as a
fetchable JSON file even though its page correctly 404s. Hidden-from-the-listing
but still readable is not scheduling.

This only ever touches dist/. Removing a post that is already on the server is a
separate, deliberate act — see the note in the commit.
"""
import datetime, pathlib, re

ROOT = pathlib.Path(__file__).resolve().parents[2]
IDX = ROOT / "src" / "data" / "blogIndex.ts"
DIST = ROOT / "dist"
TODAY = datetime.date.today().isoformat()

recs = re.findall(r'^  \{ id: "([^"]+)".*?date: "([^"]*)" \},$', IDX.read_text(), re.M)
held = sorted(slug for slug, d in recs if d and d > TODAY)

pruned = 0
for slug in held:
    f = DIST / "blog-data" / f"{slug}.json"
    if f.exists():
        f.unlink()
        pruned += 1

# What is on the server but should not be, named explicitly for a human to act on.
(DIST.parent / "tools" / "blog" / "withdraw-list.txt").write_text(
    "\n".join(f"blog/{s}\nblog-data/{s}.json" for s in held) + ("\n" if held else ""))

print(f"  scheduled: {len(held)} posts")
print(f"  bodies removed from dist: {pruned}")
print(f"  withdraw list: tools/blog/withdraw-list.txt ({len(held)*2} paths)")
