#!/usr/bin/env python3
"""Audit every built page for the on-page SEO basics."""
import collections, html, json, pathlib, re, sys

DIST = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "dist")

def tag(h, name):
    m = re.search(rf"<{name}[^>]*>(.*?)</{name}>", h, re.S | re.I)
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", "", m.group(1)))).strip() if m else None

def meta(h, key, attr="name"):
    m = re.search(rf'<meta[^>]+{attr}=["\']{key}["\'][^>]*content=["\'](.*?)["\']', h, re.I | re.S)
    if not m:
        m = re.search(rf'<meta[^>]+content=["\'](.*?)["\'][^>]*{attr}=["\']{key}["\']', h, re.I | re.S)
    return html.unescape(m.group(1)).strip() if m else None

def link(h, rel):
    m = re.search(rf'<link[^>]+rel=["\']{rel}["\'][^>]*href=["\'](.*?)["\']', h, re.I)
    return m.group(1) if m else None

rows, issues = [], collections.Counter()
titles, descs, canons = collections.Counter(), collections.Counter(), collections.Counter()

for f in sorted(DIST.rglob("*.html")):
    h = f.read_text(encoding="utf-8", errors="replace")
    url = "/" + str(f.relative_to(DIST)).replace("index.html", "")
    t = tag(h, "title") or ""
    d = meta(h, "description") or ""
    can = link(h, "canonical") or ""
    h1s = re.findall(r"<h1[^>]*>(.*?)</h1>", h, re.S | re.I)
    h1s = [re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", "", x))).strip() for x in h1s]
    imgs = re.findall(r"<img\b[^>]*>", h, re.I)
    noalt = [i for i in imgs if not re.search(r'\balt=["\'][^"\']+["\']', i)]
    body_txt = re.sub(r"<(script|style)[^>]*>.*?</\1>", " ", h, flags=re.S | re.I)
    words = len(re.sub(r"<[^>]+>", " ", body_txt).split())
    ld = re.findall(r'<script[^>]+application/ld\+json[^>]*>(.*?)</script>', h, re.S | re.I)
    types = []
    for blob in ld:
        try:
            j = json.loads(blob)
            for o in (j if isinstance(j, list) else [j]):
                if isinstance(o, dict):
                    types.append(o.get("@type"))
                    for g in o.get("@graph", []) or []:
                        types.append(g.get("@type"))
        except Exception:
            issues["invalid JSON-LD"] += 1

    p = {"url": url, "title": t, "tlen": len(t), "desc": d, "dlen": len(d),
         "canonical": can, "h1": len(h1s), "words": words,
         "imgs": len(imgs), "imgs_no_alt": len(noalt), "schema": [x for x in types if x],
         "og": bool(meta(h, "og:title", "property")), "robots": meta(h, "robots")}
    rows.append(p)
    titles[t] += 1; descs[d] += 1; canons[can] += 1
    if not t: issues["missing title"] += 1
    elif len(t) > 62: issues["title over 62 chars"] += 1
    elif len(t) < 25: issues["title under 25 chars"] += 1
    if not d: issues["missing meta description"] += 1
    elif len(d) > 165: issues["description over 165"] += 1
    elif len(d) < 70: issues["description under 70"] += 1
    if not can: issues["missing canonical"] += 1
    if len(h1s) == 0: issues["no H1"] += 1
    elif len(h1s) > 1: issues["multiple H1"] += 1
    if noalt: issues["images without alt"] += 1
    if words < 300: issues["thin (<300 words)"] += 1
    if not p["og"]: issues["no og:title"] += 1
    if not p["schema"]: issues["no structured data"] += 1

print(f"  pages audited: {len(rows)}\n")
print("  ISSUES")
for k, v in issues.most_common():
    print(f"    {v:>4}  {k}")
dupes = lambda c, lbl: [(k, v) for k, v in c.items() if v > 1 and k]
print("\n  DUPLICATES")
for lbl, c in (("title", titles), ("description", descs), ("canonical", canons)):
    d_ = dupes(c, lbl)
    print(f"    {len(d_):>4}  duplicated {lbl}s" + (f"   e.g. {d_[0][0][:52]!r} x{d_[0][1]}" if d_ else ""))
pathlib.Path("tools/seo/audit.json").write_text(json.dumps(rows, ensure_ascii=False, indent=1))
print("\n  -> tools/seo/audit.json")
