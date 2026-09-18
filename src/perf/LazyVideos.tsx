import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Defers every <video> on the page until it is actually near the viewport.
 *
 * Why this exists: the homepage mounts 11 <video> elements, 4 with autoPlay and
 * the rest previously declaring preload="metadata". Chrome opened a request for every
 * one of them on page load, before the visitor has scrolled anywhere near them.
 * Measured on production: DOM was interactive at 2.1s, but the load event did
 * not fire until 49.5s. Everything in that gap was video.
 *
 * Rather than edit 36 <video> tags across 20 files, this walks the DOM after
 * each route render and rewires them centrally:
 *
 *   - the FIRST video is left eager, so a hero still plays immediately
 *   - every other video has its src detached and autoplay removed
 *   - an IntersectionObserver restores src and plays it when it approaches view
 *
 * Reverting is deleting this component and its one line in App.tsx.
 */

const EAGER_COUNT = 1;        // how many leading videos stay eager (the hero)
const ROOT_MARGIN = '300px';  // start loading slightly before it scrolls in

export default function LazyVideos() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    // During pre-rendering, leave the DOM untouched so the captured HTML keeps
    // its original markup — the prerenderer stubs media requests anyway.
    if (navigator.userAgent.includes('HeadlessChrome')) return;

    let observer: IntersectionObserver | null = null;
    const sweep = () => {
      const videos = Array.from(document.querySelectorAll('video'));
      const deferred = videos.slice(EAGER_COUNT);
      if (!deferred.length) return;

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const v = entry.target as HTMLVideoElement;

            const src = v.dataset.lazySrc;
            if (src && !v.src) v.src = src;
            Array.from(v.querySelectorAll('source')).forEach((s) => {
              const ds = (s as HTMLSourceElement).dataset.lazySrc;
              if (ds && !s.getAttribute('src')) s.setAttribute('src', ds);
            });

            v.preload = 'auto';
            v.load();
            if (v.dataset.lazyAutoplay === '1') {
              v.muted = true; // browsers only permit muted autoplay
              // load() has only just been issued, so calling play() straight away
              // loses the race and rejects with AbortError — which the catch then
              // swallowed, leaving the video parked on its first frame. Wait until
              // there is enough data to actually start.
              const start = () => { v.play().catch(() => { /* a blocked play is not worth surfacing */ }); };
              if (v.readyState >= 3) start();
              else v.addEventListener('canplay', start, { once: true });
            }
            observer?.unobserve(v);
          }
        },
        { rootMargin: ROOT_MARGIN }
      );

      for (const v of deferred) {
        if (v.dataset.lazyDone === '1') { observer.observe(v); continue; }

        // Remember whether this video wanted to autoplay, then stop it doing so.
        // The pre-renderer may already have deferred this video at build time
        // and recorded its autoplay intent in data-lazy-autoplay. By then it has
        // also stripped the autoplay attribute, so re-deriving it here would
        // overwrite that '1' with '0' and the video would never start.
        if (v.dataset.lazyAutoplay === undefined) {
          v.dataset.lazyAutoplay = v.autoplay ? '1' : '0';
        }
        v.autoplay = false;
        v.preload = 'none';

        // Detach the source so the browser cannot begin fetching it.
        if (v.src) { v.dataset.lazySrc = v.src; v.removeAttribute('src'); }
        Array.from(v.querySelectorAll('source')).forEach((s) => {
          const el = s as HTMLSourceElement;
          const cur = el.getAttribute('src');
          if (cur) { el.dataset.lazySrc = cur; el.removeAttribute('src'); }
        });

        v.dataset.lazyDone = '1';
        observer.observe(v);
      }
    };
    sweep();

    return () => {

      observer?.disconnect();
    };
  }, [pathname]);

  return null;
}
