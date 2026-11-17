"""Rebuild the homepage wall thumbnails.

Reads the URLs in src/data/websiteWall.ts, downloads each capture, crops it
top-anchored to 4:3 and resizes to 300x225 (~11 KB) into .wall-thumbs/.
Upload with:
  npx wrangler r2 object put "govindaniit/Images/wall/<file>" \
      --file=.wall-thumbs/<file> --content-type=image/webp --remote

The originals are up to 4,688px tall and the wall renders them at 138x103,
which is what made the hero stutter on phones. Never point the wall at the
full captures again.
"""
import re, os, sys, hashlib, urllib.request
from PIL import Image
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, '.wall-thumbs')
os.makedirs(OUT, exist_ok=True)
src = open(os.path.join(ROOT, 'src/data/websiteWall.ts')).read()
urls = re.findall(r"'(https://[^']+)'", src)
seen, mapping = set(), {}
W, H = 300, 225            # 4:3, matches the card's aspect-ratio exactly
for u in urls:
    if u in mapping: continue
    base = os.path.basename(u).split('?')[0]
    stem = os.path.splitext(base)[0]
    key = re.sub(r'[^A-Za-z0-9._-]', '-', stem)[:60]
    while key in seen: key += '-x'
    seen.add(key)
    dst = os.path.join(OUT, key + '.webp')
    mapping[u] = key + '.webp'
    if os.path.exists(dst): continue
    try:
        req = urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0 (compatible; thumbnailer)'})
        raw = urllib.request.urlopen(req, timeout=60).read()
        tmp = os.path.join(OUT, '_tmp')
        open(tmp, 'wb').write(raw)
        im = Image.open(tmp).convert('RGB')
        # top-crop to 4:3, same as objectPosition:'top center' + objectFit:'cover'
        cw = im.width
        ch = int(cw * H / W)
        im = im.crop((0, 0, cw, min(ch, im.height)))
        im = im.resize((W, H), Image.LANCZOS)
        im.save(dst, 'WEBP', quality=80, method=6)
    except Exception as e:
        print('FAIL', u, e, flush=True)
import json
json.dump(mapping, open(os.path.join(OUT, '_map.json'), 'w'), indent=1)
sizes = [os.path.getsize(os.path.join(OUT, f)) for f in os.listdir(OUT) if f.endswith('.webp')]
print(f'thumbs={len(sizes)} avg={sum(sizes)/len(sizes)/1024:.0f}KB total={sum(sizes)/1048576:.2f}MB')
