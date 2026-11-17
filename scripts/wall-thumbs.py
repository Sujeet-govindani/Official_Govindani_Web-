"""Rebuild the homepage wall thumbnails.

The wall behind the hero is ~106 site captures drifting up and down in columns.
Two things about it are load-bearing, and both were learned the hard way:

1. SIZE. It once pointed at the full-page portfolio captures - 800px wide and
   up to 4,688px TALL - rendered into a card of 138x103. That is ~265x more
   pixels than the card can show: about 40 MB of download and ~13 MB of raw
   bitmap per image to decode. Phones thrashed and the hero visibly stuttered.

2. BLUR. The softness used to come from `filter: blur()` on the columns in
   CSS. Those columns animate every frame, so the browser had to re-rasterise
   the blurred result continuously - the most expensive thing on the page once
   the images were small. The blur is BAKED into these files now, the CSS
   filter is gone, and the columns only translate, which the compositor does
   for free.

Never point the wall at the originals, and never put a CSS filter back on an
animated column. Both regress the same symptom.

Sources live in scripts/wall-sources.json - the ORIGINAL captures, deliberately
not src/data/websiteWall.ts, which holds the generated thumbnail URLs. Reading
the rendered list would re-blur already-blurred images a little more on every
run, until the wall turned to soup.

Usage:
    python3 scripts/wall-thumbs.py
    for f in .wall-thumbs/*.webp; do
      npx wrangler r2 object put "govindaniit/Images/wall/$(basename $f)" \
        --file="$f" --content-type=image/webp --remote
    done

Then bump the ?v= on the URLs in src/data/websiteWall.ts: the CDN serves these
immutable for a year, so without it nobody sees the new files.
"""
import json
import os
import urllib.request

from PIL import Image, ImageEnhance, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, '.wall-thumbs')
os.makedirs(OUT, exist_ok=True)

W, H = 300, 225      # 4:3, the card's own aspect-ratio
BLUR = 2.4           # baked, replaces the old runtime filter: blur()
DIM = 0.82           # a touch darker, so the scrim over it can be lighter

sources = json.load(open(os.path.join(ROOT, 'scripts/wall-sources.json')))
done = failed = 0
tmp = os.path.join(OUT, '_tmp')

for url, filename in sorted(sources.items()):
    try:
        req = urllib.request.Request(
            url, headers={'User-Agent': 'Mozilla/5.0 (compatible; thumbnailer)'})
        raw = urllib.request.urlopen(req, timeout=60).read()
        with open(tmp, 'wb') as fh:
            fh.write(raw)

        im = Image.open(tmp).convert('RGB')
        # Top-crop to 4:3, matching objectFit:cover + objectPosition:top center,
        # so each card shows that site's header rather than a slice of its middle.
        crop_h = int(im.width * H / W)
        im = im.crop((0, 0, im.width, min(crop_h, im.height)))
        im = im.resize((W, H), Image.LANCZOS)
        im = im.filter(ImageFilter.GaussianBlur(BLUR))
        im = ImageEnhance.Brightness(im).enhance(DIM)
        # Blurred images carry almost no high-frequency detail, so they compress
        # far harder than sharp ones: quality 70 here looks like 90 did and is
        # roughly half the bytes.
        im.save(os.path.join(OUT, filename), 'WEBP', quality=70, method=6)
        done += 1
    except Exception as exc:                                  # noqa: BLE001
        print(f'FAIL {url}: {exc}', flush=True)
        failed += 1

if os.path.exists(tmp):
    os.remove(tmp)

sizes = [os.path.getsize(os.path.join(OUT, f))
         for f in os.listdir(OUT) if f.endswith('.webp')]
print(f'thumbs={done} failed={failed} '
      f'avg={sum(sizes) / len(sizes) / 1024:.1f}KB '
      f'total={sum(sizes) / 1048576:.2f}MB')
