#!/usr/bin/env python3
"""Split the flat Hindi dictionary into what each page actually needs.

One 18k-entry file would make a Hindi reader download the whole site's copy to
read one page. Strings shared across many pages (nav, footer, CTAs) go to
common.json; the rest ride with their page.
"""
import json, pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parent
OUT = ROOT.parent.parent / "public" / "i18n" / "hi"
SHARED_ON = 8  # appears on this many pages or more -> common.json


def slug(dist_path: str) -> str:
    """dist path -> the slug the runtime asks for. Must match pageSlug()."""
    p = re.sub(r"/?index\.html$", "", dist_path)
    p = p.strip("/")
    return re.sub(r"[^a-z0-9]+", "-", p, flags=re.I).lower() if p else "home"


def main():
    data = json.loads((ROOT / "strings.json").read_text())
    hi = json.loads((ROOT / "hi.json").read_text())

    freq = {}
    for ss in data["byPage"].values():
        for s in set(ss):
            freq[s] = freq.get(s, 0) + 1

    # Strings that appear on many pages, PLUS anything translated that no page
    # claims. The second group matters: the mobile dock is client-rendered only,
    # so its labels never appear in the desktop prerender the extractor reads,
    # and without this they would be translated and then silently dropped.
    onpage = set(freq)
    common = {s: hi[s] for s in hi if freq.get(s, 0) >= SHARED_ON or s not in onpage}
    OUT.mkdir(parents=True, exist_ok=True)
    for f in OUT.glob("*.json"):
        f.unlink()
    (OUT / "common.json").write_text(json.dumps(common, ensure_ascii=False, separators=(",", ":")))

    pages = 0
    for dist_path, ss in data["byPage"].items():
        d = {s: hi[s] for s in dict.fromkeys(ss) if s in hi and s not in common}
        if not d:
            continue
        (OUT / f"{slug(dist_path)}.json").write_text(
            json.dumps(d, ensure_ascii=False, separators=(",", ":")))
        pages += 1

    sizes = sorted(((f.stat().st_size, f.name) for f in OUT.glob("*.json")), reverse=True)
    total = sum(s for s, _ in sizes)
    print(f"  translated so far  {len(hi):,}/{len(data['strings']):,} strings")
    print(f"  common.json        {len(common):,} strings, {(OUT/'common.json').stat().st_size/1024:.0f} KB")
    print(f"  page files         {pages}")
    print(f"  total on disk      {total/1024:.0f} KB  (a visitor loads common + one page)")
    print("  heaviest pages:")
    for s, n in sizes[:5]:
        print(f"    {s/1024:>6.0f} KB  {n}")


if __name__ == "__main__":
    main()
