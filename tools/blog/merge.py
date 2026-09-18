#!/usr/bin/env python3
"""Merge generated articles into src/data/blogs.ts in the existing record shape."""
import datetime, json, pathlib, re

ROOT = pathlib.Path(__file__).resolve().parents[2]
OUT = pathlib.Path(__file__).resolve().parent / "out"
BLOGS = ROOT / "src" / "data" / "blogs.ts"

src = BLOGS.read_text()
existing = set(re.findall(r'\bid:\s*"([^"]+)"', src))

def ts(s: str) -> str:
    """Escape for a JS template literal: backticks and ${ would break it."""
    return s.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")

def dq(s: str) -> str:
    return s.replace("\\", "\\\\").replace('"', '\\"').replace("\n", " ")

def excerpt_of(body: str) -> str:
    """The answer-first opening sentence is already the best summary."""
    for para in body.split("\n"):
        p = para.strip()
        if p and not p.startswith("#") and not p.startswith("|"):
            p = re.sub(r"\*\*|\*|`", "", p)
            if len(p) <= 158:
                return p
            cut = p[:158].rsplit(" ", 1)[0].rstrip(",;:-—– ")
            return cut + "…"
    return ""

recs, skipped = [], 0
for f in sorted(OUT.glob("*.json")):
    d = json.loads(f.read_text())
    if d["slug"] in existing:
        skipped += 1
        continue
    body = d["content"]
    # drop a duplicated H1/H2 title line if the model repeated the headline
    words = len(body.split())
    recs.append({
        "id": d["slug"], "title": d["title"], "excerpt": excerpt_of(body),
        "category": d.get("category", "Technology"),
        "tags": [t for t in (d.get("tags") or [])][:5] or [d.get("keyword", "")],
        "readTime": max(6, min(20, round(words / 220))),
        "content": body, "words": words,
    })

# Published today, all of them: dating them earlier would invent a history that
# never happened. Staggering future posts is worth doing manually.
today = datetime.date.today().isoformat()

blocks = []
for r in recs:
    tags = ", ".join(f'"{dq(t)}"' for t in r["tags"] if t)
    blocks.append(
f'''  {{
    id: "{dq(r['id'])}",
    title: "{dq(r['title'])}",
    excerpt: "{dq(r['excerpt'])}",
    category: "{dq(r['category'])}",
    tags: [{tags}],
    readTime: {r['readTime']},
    date: "{today}",
    content: `{ts(r['content'])}`
  }}''')

if not blocks:
    print("  nothing new to merge"); raise SystemExit

# insert before the final `];` of the exported array
m = list(re.finditer(r"\n\];\s*$", src))
assert m, "could not find the end of the blogs array"
at = m[-1].start()
merged = src[:at] + ",\n" + ",\n".join(blocks) + src[at:]
BLOGS.write_text(merged)
print(f"  merged {len(blocks)} new posts (skipped {skipped} duplicates)")
print(f"  blogs.ts: {len(src):,} -> {len(merged):,} chars")
print(f"  words added: {sum(r['words'] for r in recs):,}")
