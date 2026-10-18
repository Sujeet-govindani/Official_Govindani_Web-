#!/usr/bin/env python3
"""Refresh the 'Recent guides' list in public/llms.txt from the latest PUBLISHED
blog posts, so AI crawlers (ChatGPT, Perplexity, Google-Extended) always get a
current map of our content. Keeps the hand-written header/footer untouched.
Runs in prebuild, after gen_blog_faq.py."""
import datetime, pathlib, re

ROOT = pathlib.Path(__file__).resolve().parents[2]
LLMS = ROOT / "public" / "llms.txt"
IDX = ROOT / "src" / "data" / "blogIndex.ts"
TODAY = datetime.date.today().isoformat()
N = 30

recs = re.findall(r'\{ id: "([^"]+)", title: "((?:[^"\\]|\\.)*)".*?date: "([^"]*)" \}', IDX.read_text())
pub = [(s, t.replace('\\"', '"'), d) for s, t, d in recs if d and d <= TODAY]
pub.sort(key=lambda x: x[2], reverse=True)
bullets = "\n".join(f"- [{t}](https://govindaniit.com/blog/{s})" for s, t, d in pub[:N])

txt = LLMS.read_text()
# replace everything between "Recent guides include:" and the next "## " section
m = re.search(r"(Recent guides include:\n)(.*?)(\n## )", txt, re.S)
if m:
    txt = txt[:m.start(2)] + bullets + txt[m.end(2):]
    LLMS.write_text(txt)
    print(f"  llms.txt: refreshed with {min(N,len(pub))} recent guides")
else:
    print("  llms.txt: 'Recent guides include:' marker not found — left unchanged")
