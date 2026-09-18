#!/usr/bin/env node
/**
 * prerender.mjs — static pre-rendering for the Govindani SPA.
 *
 * Replaces react-snap, which is unmaintained (last release 2020) and aborts the
 * entire run when a single page fails — we observed it die at page 4 of 36 with
 * "Cannot write to stream after nil" on both Node 18 and Node 24.
 *
 * This does the same job with three differences that matter:
 *   1. Routes come from App.tsx, not from crawling <a> tags, so unlinked routes
 *      are still captured.
 *   2. A page that fails is recorded and skipped. One bad route never costs you
 *      the other 87.
 *   3. Third-party requests (Cloudflare R2 video, ~150 MB) are blocked during
 *      capture, so the network actually reaches idle.
 *
 * Usage:  node prerender.mjs [--port 4180] [--timeout 45000] [--concurrency 2]
 */

import { createServer } from 'node:http';
import { promises as fs } from 'node:fs';
import { readFileSync } from 'node:fs';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(ROOT, 'dist');
const APP = path.join(ROOT, 'src', 'App.tsx');

const args = process.argv.slice(2);
const opt = (name, def) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : def;
};
const PORT = +opt('port', 4180);
const TIMEOUT = +opt('timeout', 45000);
const CONCURRENCY = +opt('concurrency', 2);
const ORIGIN = `http://127.0.0.1:${PORT}`;

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif',
  '.gif': 'image/gif', '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2',
  '.mp4': 'video/mp4', '.webm': 'video/webm', '.jfif': 'image/jpeg',
};

// ---------- route discovery ----------
async function readRoutes() {
  const src = await fs.readFile(APP, 'utf8');
  const found = [...src.matchAll(/<Route\s+[^>]*path=["']([^"']+)["']/g)].map(m => m[1]);
  const routes = new Set(['/']);

  // Dynamic segments (:slug) cannot be pre-rendered as-is. Expand the case
  // study route into one real URL per case study so each gets its own static
  // HTML, title, description and JSON-LD.
  try {
    const csSrc = readFileSync(path.join(ROOT, 'src', 'data', 'caseStudies.ts'), 'utf8');
    for (const m of csSrc.matchAll(/\bid:\s*["']([^"']+)["']/g)) {
      routes.add('/pages/case-study/' + m[1]);
    }
  } catch { /* no case studies file yet */ }

  // The Give Setu page has language variants at /pricing/ngo-os/<code>. The
  // route existed in the SPA but was never written to disk, so clicking a
  // language on the live site returned 404 while hreflang advertised the URL.
  try {
    const i18n = readFileSync(path.join(ROOT, 'src', 'components', 'Pricing', 'i18n', 'index.ts'), 'utf8');
    const block = i18n.split('export const LANGS = [')[1]?.split('] as const;')[0] ?? '';
    for (const m of block.matchAll(/code:\s*'([a-z]{2})'/g)) {
      if (m[1] !== 'en') routes.add('/pricing/ngo-os/' + m[1]);
    }
  } catch { /* no pricing i18n */ }

  // Expand /blog/:id into one real URL per blog post.
  try {
    const blogsSrc = readFileSync(path.join(ROOT, 'src', 'data', 'blogIndex.ts'), 'utf8');
    // Only posts whose date has arrived. A scheduled post must not exist as a
    // file on the server: hidden-from-the-listing but still fetchable is not
    // scheduling, it is just an unlinked page.
    const today = new Date().toISOString().slice(0, 10);
    let due = 0, held = 0;
    for (const m of blogsSrc.matchAll(/\{ id: "([^"]+)"[^\n]*?date: "([^"]*)" \}/g)) {
      if (!m[2] || m[2] <= today) { routes.add('/blog/' + m[1]); due++; }
      else held++;
    }
    if (held) console.log(`  ${due} posts due, ${held} scheduled for later`);
  } catch { /* no blogs file yet */ }

  // Expand /pages/case-study/:slug the same way. Without this the 15 case
  // studies ship as empty SPA shells and drop out of the sitemap.
  try {
    const csSrc = readFileSync(path.join(ROOT, 'src', 'data', 'caseStudies.ts'), 'utf8');
    for (const m of csSrc.matchAll(/\bid:\s*["']([^"']+)["']/g)) {
      routes.add('/pages/case-study/' + m[1]);
    }
  } catch { /* no case studies file yet */ }
  for (const r of found) {
    if (!r || r === '*' || r.includes(':')) continue;      // skip catch-all and params
    if (r.includes(':') || r.includes('*')) continue;   // dynamic routes are expanded above
    routes.add(r.startsWith('/') ? r : '/' + r);
  }
  return [...routes];
}

// ---------- static server ----------
function serve() {
  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
      let file = path.join(DIST, urlPath);
      try {
        const st = await fs.stat(file).catch(() => null);
        if (st?.isDirectory()) file = path.join(file, 'index.html');
        if (!existsSync(file)) file = path.join(DIST, 'index.html'); // SPA fallback
        const buf = await fs.readFile(file);
        res.writeHead(200, { 'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream' });
        res.end(buf);
      } catch {
        res.writeHead(500).end('error');
      }
    });
    server.listen(PORT, '127.0.0.1', () => resolve(server));
  });
}

// ---------- defer video sources in the emitted HTML ----------
/**
 * Rewrites <video> markup so the browser cannot fetch media during HTML parse.
 *
 * The runtime LazyVideos component detaches sources too, but it can only run
 * after React mounts — by which point the browser has already opened requests
 * for every src in the static HTML. Measured: 32 video requests still fired and
 * the load event took 35s. Stripping the src at build time is the only way to
 * stop a request that happens before any JavaScript executes.
 *
 * The first <video> keeps its src so a hero still plays immediately. All others
 * carry data-lazy-src, which LazyVideos restores on scroll.
 */
/**
 * Restore the non-blocking font stylesheet.
 *
 * index.html ships the Google Fonts link as media="print" with an onload that
 * flips it to "all" — that is what stops it blocking the first paint, and
 * Lighthouse measured 1,850 ms of render-blocking on mobile without it.
 *
 * The catch: this pre-renderer runs the page in a real browser, so that onload
 * FIRES during capture and the serialized HTML comes out with media="all" —
 * silently undoing the optimisation in every one of the 91 built pages. Put it
 * back after capture.
 */
function restoreAsyncFonts(html) {
  return html.replace(
    /<link([^>]*?)rel="stylesheet"([^>]*?)href="(https:\/\/fonts\.googleapis\.com\/css2\?[^"]+)"([^>]*?)>/gi,
    (tag, pre, mid, href, post) => {
      // leave the <noscript> copy alone — it has no media/onload attributes
      if (!/onload/i.test(tag)) return tag;
      return `<link rel="stylesheet" href="${href}" media="print" onload="this.media='all';this.onload=null">`;
    }
  );
}

/**
 * Inline the stylesheet.
 *
 * Vite emits one ~30 KB CSS file and links it from <head>, where it blocks the
 * first paint — Lighthouse measured 913 ms of render-blocking on mobile, and
 * reported 27 of those 30 KB as unused on the homepage.
 *
 * Rather than guess at a "critical" subset and risk a flash of unstyled text,
 * inline the whole thing and drop the external request. It costs ~6 KB per page
 * after brotli and removes a blocking round trip entirely.
 */
function inlineCss(html, distDir) {
  return html.replace(
    /<link[^>]*rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/gi,
    (tag, href) => {
      try {
        const css = readFileSync(path.join(distDir, href.replace(/^\//, '')), 'utf8');
        return '<style>' + css + '</style>';
      } catch {
        return tag;   // if it cannot be read, leave the link alone
      }
    }
  );
}

/**
 * Make the stylesheet non-blocking.
 *
 * Vite emits a 218 KB CSS bundle and links it in <head>, where it blocks the
 * first paint — measured at 913 ms of render-blocking and an FCP of 3.2 s on
 * throttled mobile. Inlining it was tried and rejected: it added 222 KB to
 * every one of 85 pages and killed cross-page caching.
 *
 * Deferring is viable here specifically because this codebase styles almost
 * everything with inline style={{...}} props, so very little of the visible
 * layout actually depends on the external sheet.
 */
function deferCss(html) {
  return html.replace(
    /<link([^>]*?)rel="stylesheet"([^>]*?)href="(\/assets\/[^"]+\.css)"([^>]*?)>/gi,
    (tag, a, b, href, c) => {
      if (/media=/i.test(tag)) return tag;
      return `<link rel="preload" as="style" href="${href}">` +
             `<link rel="stylesheet" href="${href}" media="print" onload="this.media='all';this.onload=null">` +
             `<noscript><link rel="stylesheet" href="${href}"></noscript>`;
    }
  );
}

function deferVideos(html) {
  let index = 0;
  return html.replace(/<video\b[^>]*>[\s\S]*?<\/video>/gi, (block) => {
    if (index++ === 0) return block;                 // hero stays eager
    // Reserve the video's box so deferring it does not collapse the layout.
    // A <video> with no src and no dimensions renders at 0 height, and when the
    // source is restored on scroll the surrounding section jumps — measured as a
    // 0.175 layout shift attributed to SECTION elements. 16:9 is the aspect of
    // every video in this library.
    let out = block;
    if (!/\sposter=/i.test(out) && !/style="[^"]*aspect-ratio/i.test(out)) {
      // Reserve space so detaching the source cannot shift layout. The element
      // often already carries a style attribute — emitting a second one is
      // invalid HTML, and the browser keeps only the first, silently dropping
      // the component's real sizing (object-fit, height). Merge into the
      // existing attribute instead, placing ours first so the component's own
      // declarations still win.
      if (/<video\b[^>]*\sstyle="/i.test(out)) {
        out = out.replace(/(<video\b[^>]*?\sstyle=")/i, '$1aspect-ratio:16/9;width:100%;');
      } else {
        out = out.replace(/<video\b/i, '<video style="aspect-ratio:16/9;width:100%"');
      }
    }
    out = out
      .replace(/\ssrc=(["'])(.*?)\1/gi, ' data-lazy-src=$1$2$1')
      .replace(/\sautoplay(?:=(["']).*?\1)?/gi, ' data-lazy-autoplay="1"')
      .replace(/\spreload=(["']).*?\1/gi, ' preload="none"');
    if (!/\spreload=/i.test(out)) out = out.replace(/<video\b/i, '<video preload="none"');
    return out;
  });
}

/**
 * Adds loading="lazy" to images that are not in the first screenful.
 *
 * The homepage carries ~145 <img> elements, nearly all below the fold, and only
 * 25 of 346 tags in the codebase declare lazy loading. The browser therefore
 * fetches images nobody has scrolled to.
 *
 * The first EAGER_IMAGES are deliberately left eager: marking a hero image lazy
 * delays the Largest Contentful Paint, which is the opposite of the goal. Any
 * tag that already sets loading= is left exactly as the author wrote it.
 */
const EAGER_IMAGES = 8;

// Intrinsic dimensions for every image in the library, measured from the actual
// files. Without these, lazy-loading is actively harmful: the browser reserves
// no space, so each arriving image shoves the page down. Measured on production
// after the first lazy rollout, CLS went from 0.011 to 1.0491 — ten times the
// failing threshold. width/height lets the browser reserve the correct box
// before the bytes arrive, which is what makes lazy-loading safe.
let DIMS = {};
try {
  DIMS = JSON.parse(readFileSync(path.join(ROOT, 'image-dimensions.json'), 'utf8'));
} catch { /* no manifest: fall back to not lazy-loading, never to unsized lazy */ }

function lazyImages(html) {
  let index = 0;
  return html.replace(/<img\b[^>]*>/gi, (tag) => {
    index++;

    // Dimensions go on EVERY image we can identify, including ones the author
    // already marked lazy. Those were the gap in the first attempt: 40 images
    // carried loading="lazy" from source, were skipped here, and kept shifting.
    const srcMatch = tag.match(/\ssrc=(["'])(.*?)\1/i);
    if (!srcMatch) return tag;
    const file = decodeURIComponent(srcMatch[2].split('/').pop().split('?')[0]);
    const dim = DIMS[file];
    if (!dim) return tag;

    let out = tag;
    if (!/\swidth=/i.test(out)) out = out.replace(/<img\b/i, `<img width="${dim[0]}" height="${dim[1]}"`);
    if (index <= EAGER_IMAGES) return out;          // above the fold: sized, but eager
    if (/\sloading=/i.test(out)) return out;        // already lazy: now sized too
    out = out.replace(/<img\b/i, '<img loading="lazy"');
    if (!/\sdecoding=/i.test(out)) out = out.replace(/<img\b/i, '<img decoding="async"');
    return out;
  });
}

// ---------- capture ----------
async function capture(browser, route, shellHead) {
  const page = await browser.newPage();
  const errors = [];
  try {
    await page.setViewport({ width: 1440, height: 900 });
    await page.setRequestInterception(true);
    page.on('request', (r) => {
      const u = r.url();
      if (u.startsWith(ORIGIN) || u.startsWith('data:')) return r.continue();

      // Off-origin requests are stubbed, NOT aborted.
      //
      // Aborting looked right — R2 video alone is ~150 MB and the network would
      // never go idle. But an aborted request can leave networkidle0 waiting
      // indefinitely: /AboutUs/about-founder pulls 10 book covers from
      // m.media-amazon.com and failed at both 45s and 90s because of it.
      // Answering with a valid empty response completes the request cleanly,
      // so the page settles without ever fetching the bytes.
      const type = r.resourceType();
      if (type === 'image') {
        return r.respond({
          status: 200,
          contentType: 'image/gif',
          body: Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64'),
        });
      }
      if (type === 'stylesheet' || type === 'font') {
        return r.respond({ status: 200, contentType: 'text/css', body: '' });
      }
      return r.respond({ status: 204, body: '' });
    });
    page.on('pageerror', (e) => errors.push(String(e).slice(0, 120)));

    await page.goto(ORIGIN + route, { waitUntil: 'networkidle0', timeout: TIMEOUT });
    // let late effects settle
    await new Promise(r => setTimeout(r, 700));

    const html = await page.content();
    const text = await page.evaluate(() => document.body.innerText || '');
    return { html: restoreAsyncFonts(lazyImages(deferVideos(html))), words: text.trim().split(/\s+/).filter(Boolean).length, errors };
  } finally {
    await page.close().catch(() => {});
  }
}

async function main() {
  if (!existsSync(DIST)) { console.error('dist/ not found — run `npm run build` first (without postbuild).'); process.exit(1); }

  const puppeteer = (await import('puppeteer')).default;
  const routes = await readRoutes();
  console.log(`prerender — ${routes.length} routes from App.tsx\n  timeout ${TIMEOUT}ms · concurrency ${CONCURRENCY}\n`);

  const server = await serve();
  const browser = await puppeteer.launch({
    // Portable across machines: CI sets PUPPETEER_EXECUTABLE_PATH to the
    // runner's Chrome. Falls back to the local macOS install so nothing
    // changes for a developer running this by hand.
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH
      || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    headless: true,
  });

  const ok = [], failed = [], thin = [];
  let idx = 0, done = 0;

  async function worker() {
    while (idx < routes.length) {
      const route = routes[idx++];
      try {
        const { html, words, errors } = await capture(browser, route);
        // Never overwrite a page with something emptier than the shell.
        if (words < 50) { thin.push({ route, words, errors: errors.slice(0, 1) }); }
        else {
          const outDir = route === '/' ? DIST : path.join(DIST, route);
          await fs.mkdir(outDir, { recursive: true });
          await fs.writeFile(path.join(outDir, 'index.html'), html);
          ok.push({ route, bytes: Buffer.byteLength(html), words });
        }
      } catch (e) {
        failed.push({ route, reason: String(e.message || e).split('\n')[0].slice(0, 90) });
      }
      done++;
      process.stdout.write(`\r  ${done}/${routes.length}  ok:${ok.length} thin:${thin.length} failed:${failed.length}   `);
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  process.stdout.write('\n\n');

  await browser.close().catch(() => {});
  server.close();

  ok.sort((a, b) => b.words - a.words);
  console.log('Captured (top 12 by content):');
  for (const r of ok.slice(0, 12)) console.log(`  ${String(r.words).padStart(6)} words  ${(r.bytes / 1024).toFixed(0).padStart(5)} KB  ${r.route}`);

  if (thin.length) {
    console.log(`\nSkipped — too little content to be worth writing (${thin.length}):`);
    for (const t of thin.slice(0, 12)) console.log(`  ${String(t.words).padStart(4)} words  ${t.route}${t.errors[0] ? '  — ' + t.errors[0] : ''}`);
  }
  if (failed.length) {
    console.log(`\nFailed (${failed.length}):`);
    for (const f of failed.slice(0, 12)) console.log(`  ${f.route}  — ${f.reason}`);
  }

  const totalWords = ok.reduce((s, r) => s + r.words, 0);
  console.log('\n' + '─'.repeat(56));
  console.log(`  routes            ${routes.length}`);
  console.log(`  prerendered       ${ok.length}`);
  console.log(`  skipped (thin)    ${thin.length}`);
  console.log(`  failed            ${failed.length}`);
  console.log(`  total words made crawlable  ${totalWords.toLocaleString()}`);
  console.log('─'.repeat(56));

  await fs.writeFile(path.join(ROOT, 'prerender-report.json'),
    JSON.stringify({ ok, thin, failed }, null, 2));
  console.log('\n  Report: prerender-report.json');
}

main().catch(e => { console.error(e); process.exit(1); });
