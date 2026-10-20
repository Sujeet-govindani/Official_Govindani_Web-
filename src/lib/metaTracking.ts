// src/lib/metaTracking.ts
// First-party identifiers that let Meta (and the CRM) connect a lead back to the exact ad click,
// plus the one-per-submit Lead event. No PII is stored here.

const CTX_KEY = 'gi.adctx';
const WEEK = 7 * 86400000;

// Query-string keys remembered from the ad click. fbclid is Meta's click id; the rest come from the
// ad's "URL parameters" field (see the brief) so the CRM knows which ad produced which lead.
const KEYS = ['fbclid', 'ad_id', 'adset_id', 'campaign_id', 'ad_name',
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_content'] as const;
type Key = (typeof KEYS)[number];
type AdCtx = Partial<Record<Key, string>> & { t: number };

const cookie = (name: string): string => {
  try {
    const m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
    return m ? decodeURIComponent(m[1]) : '';
  } catch {
    return '';
  }
};

/** Call once at app start (src/main.tsx), before the router can touch the URL.
 *  fbevents.js is deferred to first interaction on this site, so the `_fbc` cookie may not exist
 *  yet; remember the click ourselves. A new ad click replaces the old context; a plain revisit
 *  (no ad params) keeps it for 7 days. */
export function captureAdContext(): void {
  try {
    const q = new URLSearchParams(window.location.search);
    const ctx: AdCtx = { t: Date.now() };
    let any = false;
    for (const k of KEYS) {
      const v = q.get(k);
      if (v) { ctx[k] = v.slice(0, 250); any = true; }
    }
    if (any && (ctx.fbclid || ctx.ad_id || ctx.utm_source)) {
      window.localStorage.setItem(CTX_KEY, JSON.stringify(ctx));
    }
  } catch {
    /* private mode / blocked storage: attribution simply won't be available */
  }
}

const stored = (): AdCtx | null => {
  try {
    const raw = window.localStorage.getItem(CTX_KEY);
    if (!raw) return null;
    const o = JSON.parse(raw) as AdCtx;
    // Meta attributes a click for 7 days; older than that is not worth sending.
    return o && typeof o.t === 'number' && Date.now() - o.t < WEEK ? o : null;
  } catch {
    return null;
  }
};

/** Meta's `fbc` format: fb.1.<click time ms>.<fbclid> (the `_fbc` cookie wins if present). */
export function getFbc(): string {
  const c = cookie('_fbc');
  if (c) return c;
  const s = stored();
  return s && s.fbclid ? `fb.1.${s.t}.${s.fbclid}` : '';
}

export const getFbp = (): string => cookie('_fbp');

export function newEventId(): string {
  const c = (typeof crypto !== 'undefined' ? crypto : undefined) as Crypto | undefined;
  return c && 'randomUUID' in c
    ? c.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
}

/** Everything the CRM stores on the lead. Sent with the intake POST (extra, optional fields). */
export interface MetaContext {
  meta_event_id: string;   // SAME id is used by the browser Lead event and by the CRM's server Lead event
  meta_fbp: string;
  meta_fbc: string;
  meta_fbclid: string;
  meta_user_agent: string;
  meta_page_url: string;
  meta_ad_id: string;
  meta_adset_id: string;
  meta_campaign_id: string;
  meta_ad_name: string;
  meta_utm_source: string;
  meta_utm_medium: string;
  meta_utm_campaign: string;
  meta_utm_content: string;
}

export function metaContext(): MetaContext {
  const s = stored() || ({ t: 0 } as AdCtx);
  return {
    meta_event_id: newEventId(),
    meta_fbp: getFbp(),
    meta_fbc: getFbc(),
    meta_fbclid: s.fbclid || '',
    meta_user_agent: navigator.userAgent,
    meta_page_url: window.location.href.split('#')[0],
    meta_ad_id: s.ad_id || '',
    meta_adset_id: s.adset_id || '',
    meta_campaign_id: s.campaign_id || '',
    meta_ad_name: s.ad_name || '',
    meta_utm_source: s.utm_source || '',
    meta_utm_medium: s.utm_medium || '',
    meta_utm_campaign: s.utm_campaign || '',
    meta_utm_content: s.utm_content || '',
  };
}

/** Browser-side Lead. eventID makes Meta merge it with the CRM's server-side Lead instead of
 *  counting two. fbq is a queueing stub until fbevents.js loads, so calling it early is safe. */
export function trackLead(eventId: string): void {
  const fbq = (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq;
  if (typeof fbq !== 'function') return;
  fbq('track', 'Lead', { content_name: 'ngoindia-quote' }, { eventID: eventId });
}

/** Indian mobile as 10 digits, or '' if it cannot be one. Also repairs the stray leading "1" seen on
 *  some real submissions (16351305527 -> 6351305527) and strips +91 / 91 / 0 prefixes. */
export function normalisePhoneIN(raw: string): string {
  let d = (raw || '').replace(/\D/g, '').replace(/^0+/, '');
  if (d.length === 13 && d.startsWith('191')) d = d.slice(1);
  if (d.length === 11 && d.startsWith('1') && /^[6-9]/.test(d.slice(1))) d = d.slice(1);
  if (d.length === 12 && d.startsWith('91')) d = d.slice(2);
  return /^[6-9]\d{9}$/.test(d) ? d : '';
}
