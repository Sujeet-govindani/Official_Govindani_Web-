#!/usr/bin/env python3
"""Harvest every user-visible string from the prerendered site.

Reading the BUILT html, not the JSX, is deliberate: it captures exactly what a
visitor sees across all 249 components without touching one of them, and it
cannot drift from the real output.
"""
import html, json, pathlib, re, sys
from html.parser import HTMLParser

SKIP = {"script", "style", "noscript", "svg", "path", "code", "pre"}
ATTRS = ("alt", "title", "placeholder", "aria-label", "value")


class Harvest(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack, self.out = [], []

    def handle_starttag(self, tag, attrs):
        self.stack.append(tag)
        d = dict(attrs)
        for a in ATTRS:
            if d.get(a):
                self.out.append(("attr", d[a]))
        if tag == "meta" and d.get("name") in ("description",) and d.get("content"):
            self.out.append(("meta", d["content"]))
        if tag == "meta" and d.get("property", "").startswith("og:") and d.get("content"):
            if d["property"] in ("og:title", "og:description"):
                self.out.append(("meta", d["content"]))
        if tag in ("img", "br", "meta", "link", "input", "hr"):
            self.stack.pop()

    def handle_endtag(self, tag):
        if self.stack and tag in self.stack:
            while self.stack and self.stack.pop() != tag:
                pass

    def handle_data(self, data):
        if any(t in SKIP for t in self.stack):
            return
        t = data.strip()
        if t:
            self.out.append(("title" if "title" in self.stack else "text", t))


def worth(s: str) -> bool:
    """Filter out things a translator should never see."""
    s = s.strip()
    if len(s) < 2 or len(s) > 1200:
        return False
    if not re.search(r"[A-Za-z]", s):          # numbers, ₹, bullets, icons
        return False
    if re.fullmatch(r"[\d\s.,%₹$+\-–—/:()]+", s):
        return False
    if re.match(r"^(https?://|www\.|/|#|@|\{|\[)", s):
        return False
    if re.fullmatch(r"[A-Za-z]{1,2}", s):      # stray letters
        return False
    if s.count("{") or s.count("}"):           # template leftovers
        return False
    return True


def main(dist):
    seen, by_page = {}, {}
    for f in sorted(pathlib.Path(dist).rglob("*.html")):
        h = Harvest()
        try:
            h.feed(f.read_text(encoding="utf-8", errors="replace"))
        except Exception:
            continue
        page = str(f.relative_to(dist))
        keep = []
        for kind, raw in h.out:
            s = html.unescape(re.sub(r"\s+", " ", raw)).strip()
            if worth(s):
                keep.append(s)
                seen.setdefault(s, {"kind": kind, "pages": 0})["pages"] += 1
        by_page[page] = keep
    return seen, by_page


if __name__ == "__main__":
    seen, by_page = main(sys.argv[1] if len(sys.argv) > 1 else "dist")
    words = sum(len(s.split()) for s in seen)
    print(f"  pages scanned      {len(by_page)}")
    print(f"  unique strings     {len(seen):,}")
    print(f"  unique words       {words:,}")
    print(f"  total occurrences  {sum(v['pages'] for v in seen.values()):,}")
    buckets = {"1-3 words": 0, "4-12": 0, "13-40": 0, "41+": 0}
    for s in seen:
        n = len(s.split())
        buckets["1-3 words" if n <= 3 else "4-12" if n <= 12 else "13-40" if n <= 40 else "41+"] += 1
    for k, v in buckets.items():
        print(f"    {k:<10} {v:,}")
    pathlib.Path("tools/i18n/strings.json").write_text(
        json.dumps({"strings": list(seen), "byPage": by_page}, ensure_ascii=False, indent=0))
    print("  -> tools/i18n/strings.json")
    big = sorted(by_page.items(), key=lambda kv: -sum(len(s.split()) for s in kv[1]))[:8]
    print("\n  heaviest pages:")
    for p, ss in big:
        print(f"    {sum(len(s.split()) for s in ss):>7,} words  {p}")
