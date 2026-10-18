#!/usr/bin/env python3
"""Fetch real Google reviews from social-ops into src/data/reviews.json at build time,
so the homepage renders genuine review cards + aggregateRating schema in prerendered HTML.
Never fabricates — if the endpoint is unreachable, keeps the last good file."""
import json, pathlib, urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[2]
OUT = ROOT / "src" / "data" / "reviews.json"
URL = "https://social-ops.sujeet.workers.dev/public/reviews"

try:
    req = urllib.request.Request(URL, headers={"User-Agent": "govindani-build/1.0"})
    with urllib.request.urlopen(req, timeout=30) as r:
        data = json.loads(r.read())
    revs = [x for x in data.get("reviews", []) if (x.get("text") or "").strip()]
    agg = data.get("aggregate", {})
    if revs and agg.get("ratingValue"):
        OUT.write_text(json.dumps({"aggregate": agg, "reviews": revs[:9]}, ensure_ascii=False, indent=1))
        print(f"  reviews.json: {len(revs[:9])} reviews, {agg['ratingValue']}★/{agg.get('reviewCount')}")
    else:
        print("  reviews endpoint returned nothing usable — keeping existing reviews.json")
except Exception as e:
    print(f"  reviews fetch failed ({str(e)[:60]}) — keeping existing reviews.json")
