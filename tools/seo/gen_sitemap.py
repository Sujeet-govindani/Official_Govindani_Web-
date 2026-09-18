#!/usr/bin/env python3
"""Rebuild sitemap.xml from what was actually prerendered.

The hand-maintained file drifts the moment a route is added — it listed 155 URLs
while the build produced more, and every new article would have been invisible
to it. Generating from dist means the sitemap can only ever contain URLs that
really exist.
"""
import datetime, pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
DIST = ROOT / "dist"
SITE = "https://govindaniit.com"
TODAY = datetime.date.today().isoformat()

# Pages that exist but should not be advertised for indexing.
SKIP = {"/404", "/video-section"}

def priority(url: str) -> str:
    if url == "/": return "1.0"
    depth = url.strip("/").count("/")
    if url.startswith("/blog/"): return "0.6"
    if url.startswith(("/services", "/pricing", "/whatsapp", "/pages")): return "0.8"
    return "0.7" if depth == 0 else "0.6"

def changefreq(url: str) -> str:
    if url == "/": return "daily"
    if url.startswith("/blog"): return "weekly"
    return "monthly"

urls = []
for f in sorted(DIST.rglob("index.html")):
    rel = "/" + str(f.parent.relative_to(DIST)).replace("\\", "/")
    if rel == "/.":
        rel = "/"
    if rel.rstrip("/") in SKIP:
        continue
    html = f.read_text(errors="replace")
    if re.search(r'<meta[^>]+name=["\']robots["\'][^>]*noindex', html, re.I):
        continue
    urls.append(rel if rel == "/" else rel.rstrip("/") + "/")

urls = sorted(set(urls))
lines = ['<?xml version="1.0" encoding="UTF-8"?>',
         '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
for u in urls:
    lines += ["  <url>", f"    <loc>{SITE}{u}</loc>",
              f"    <lastmod>{TODAY}</lastmod>",
              f"    <changefreq>{changefreq(u)}</changefreq>",
              f"    <priority>{priority(u)}</priority>", "  </url>"]
lines.append("</urlset>")
out = "\n".join(lines) + "\n"
(ROOT / "public" / "sitemap.xml").write_text(out)
(DIST / "sitemap.xml").write_text(out)
print(f"  sitemap: {len(urls)} URLs ({sum(1 for u in urls if u.startswith('/blog/'))} blog posts)")
