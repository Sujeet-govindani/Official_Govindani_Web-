// Post-prerender critical-CSS pass. Runs AFTER prerender.mjs has written each route's
// static HTML. For every dist/**/*.html, Beasties inlines the above-the-fold CSS that
// page actually uses and converts the big render-blocking stylesheet(s) to an async
// (preload→stylesheet) load with a <noscript> fallback. This removes the ~450ms
// render-blocking-CSS hit on FCP without FOUC (the critical rules are inlined).
//
// pruneSource:false keeps the full external CSS intact (re-applied once it loads), so
// nothing below the fold loses styling. Safe to re-run; idempotent per build.
import Beasties from 'beasties';
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';

function htmlFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) out.push(...htmlFiles(p));
    else if (name.endsWith('.html')) out.push(p);
  }
  return out;
}

const files = htmlFiles(DIST);
console.log(`critical-css — ${files.length} HTML files`);

let ok = 0, failed = 0;
for (const file of files) {
  try {
    const html = readFileSync(file, 'utf8');
    // A fresh instance per file so each page gets its own critical set.
    const beasties = new Beasties({
      path: DIST,
      publicPath: '/',
      preload: 'swap',       // non-critical CSS: <link rel=preload ... onload=this.rel='stylesheet'>
      pruneSource: false,    // keep the full stylesheet; only ADD inlined critical
      mergeStylesheets: false,
      logLevel: 'silent',
    });
    const out = await beasties.process(html);
    if (out && out.length) { writeFileSync(file, out); ok++; }
  } catch (e) {
    failed++;
    console.warn(`  skip ${file}: ${String(e).slice(0, 120)}`);
  }
}
console.log(`critical-css — inlined ${ok}, skipped ${failed}`);
// Never fail the build over critical-CSS; a skipped page just keeps its blocking CSS.
process.exit(0);
