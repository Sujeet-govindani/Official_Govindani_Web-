// First-party website tracking beacon -> our own CRM (crm.hisabit.tech/social/web-track/).
// No third-party analytics. Fire-and-forget via navigator.sendBeacon so it never blocks the page.
// A gi_vid visitor id threads anonymous events together and is attached to the lead on submit,
// so the CRM can stitch the full visitor -> lead journey. Respects Do-Not-Track and an opt-out.

const BASE = (import.meta.env.VITE_BASE_URL || 'https://crm.hisabit.tech').replace(/\/+$/, '');
const TRACK_URL = `${BASE}/social/web-track/`;

type Meta = Record<string, unknown>;
interface Evt { event: string; url: string; referrer: string; utm: Record<string, string>; ts: number; meta?: Meta; }

let queue: Evt[] = [];
let flushTimer: number | undefined;
let started = false;

/** Tracking is off during prerender (HeadlessChrome), under Do-Not-Track, or on explicit opt-out. */
function enabled(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  if (navigator.userAgent.indexOf('HeadlessChrome') > -1) return false;         // prerender guard
  const dnt = navigator.doNotTrack || (window as unknown as { doNotTrack?: string }).doNotTrack;
  if (dnt === '1' || dnt === 'yes') return false;
  try { if (localStorage.getItem('gi_track') === 'off') return false; } catch { /* storage blocked */ }
  return true;
}

function uuid(): string {
  try { if (crypto?.randomUUID) return crypto.randomUUID(); } catch { /* older browser */ }
  return 'xxxxxxxxyxxxyxxxyxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0; return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

/** Stable per-browser visitor id. Also attached to the lead on submit (the stitch). */
export function getVisitorId(): string {
  try {
    let v = localStorage.getItem('gi_vid');
    if (!v) { v = `gi_vid-${uuid()}`; localStorage.setItem('gi_vid', v); }
    return v;
  } catch { return `gi_vid-${uuid()}`; }   // storage blocked -> ephemeral id
}

/** First-touch UTM is remembered; current-touch UTM is read live. */
function utm(): Record<string, string> {
  const out: Record<string, string> = {};
  try {
    const p = new URLSearchParams(location.search);
    for (const k of ['source', 'medium', 'campaign', 'term', 'content'] as const) {
      const v = p.get(`utm_${k}`); if (v) out[k] = v;
    }
    const firstRaw = localStorage.getItem('gi_utm0');
    if (Object.keys(out).length && !firstRaw) localStorage.setItem('gi_utm0', JSON.stringify(out));
    const first = firstRaw ? JSON.parse(firstRaw) : null;
    if (first?.source && !out.source) out.first_source = first.source;
  } catch { /* ignore */ }
  return out;
}

function scheduleFlush(): void {
  if (flushTimer != null) return;
  flushTimer = window.setTimeout(flush, 2500);
}

export function flush(): void {
  if (flushTimer != null) { clearTimeout(flushTimer); flushTimer = undefined; }
  if (!queue.length || !enabled()) { queue = []; return; }
  const body = JSON.stringify({ visitor_id: getVisitorId(), events: queue.slice(0, 50) });
  queue = [];
  try {
    const blob = new Blob([body], { type: 'application/json' });
    if (navigator.sendBeacon && navigator.sendBeacon(TRACK_URL, blob)) return;
  } catch { /* fall through to fetch */ }
  try { fetch(TRACK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true }); }
  catch { /* fire-and-forget */ }
}

/** Record one event. Safe to call anywhere; a no-op when tracking is disabled. */
export function track(event: string, meta?: Meta): void {
  if (!enabled()) return;
  queue.push({ event, url: location.href, referrer: document.referrer, utm: utm(), ts: Date.now(), meta });
  if (queue.length >= 25) flush(); else scheduleFlush();
}

export function trackPageView(): void { track('page_view'); }

/** Call once on app start. Sets up the visitor id, a per-tab session_start, CTA clicks, and flush-on-leave. */
export function initTracking(): void {
  if (started || !enabled()) return;
  started = true;
  getVisitorId();

  try {
    if (!sessionStorage.getItem('gi_sess')) {
      sessionStorage.setItem('gi_sess', '1');
      track('session_start', { landing: location.pathname, ref: document.referrer, w: innerWidth, h: innerHeight });
    }
  } catch { /* ignore */ }

  // Delegated CTA tracking (no per-component edits): WhatsApp + phone links.
  document.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement)?.closest?.('a') as HTMLAnchorElement | null;
    if (!a) return;
    const href = (a.getAttribute('href') || '').toLowerCase();
    if (/wa\.me|whatsapp|api\.whatsapp/.test(href)) track('cta_click', { cta: 'whatsapp', href });
    else if (href.startsWith('tel:')) track('cta_click', { cta: 'phone', href });
  }, { capture: true, passive: true });

  // Flush pending events before the page is hidden/unloaded.
  const leave = () => flush();
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') leave(); });
  window.addEventListener('pagehide', leave);
}
