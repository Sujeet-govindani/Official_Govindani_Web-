// Public Website Lead Intake API client.
// POSTs a public enquiry to the CRM, which creates a lead (201) or records a repeat
// enquiry against an existing one (200). No credentials are sent — the endpoint is
// public and rate-limited server-side. Base URL comes from VITE_BASE_URL, with the
// production CRM host as the default so the build works without an env file.
const BASE = (import.meta.env.VITE_BASE_URL || 'https://crm.hisabit.tech').replace(/\/+$/, '');

export interface WebsiteIntakePayload {
  name: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  city?: string;
  requirement?: string;
  has_website?: string;
  budget?: string;
  message?: string;
  source?: string;
  sheet?: string;
  assigned_to?: 'Lucky' | 'Gajendra' | 'Sarita' | string;
  visitor_id?: string;   // gi_vid — lets the CRM stitch the visitor's journey onto this lead
  // Meta attribution context (all optional). The CRM stores these on the lead and uses them for the
  // server-side Lead event, every later CRM-stage event, and per-ad reporting.
  meta_event_id?: string;
  meta_fbp?: string;
  meta_fbc?: string;
  meta_fbclid?: string;
  meta_user_agent?: string;
  meta_page_url?: string;
  meta_ad_id?: string;
  meta_adset_id?: string;
  meta_campaign_id?: string;
  meta_ad_name?: string;
  meta_utm_source?: string;
  meta_utm_medium?: string;
  meta_utm_campaign?: string;
  meta_utm_content?: string;
  // USA funnel: the customer picks a meeting slot in THEIR local time. Send it machine-readable
  // (wall-clock, no offset) plus the browser's IANA timezone so the CRM converts it to the agent's
  // IST correctly. e.g. meeting_local "2026-10-30T14:30", meeting_tz "America/New_York".
  meeting_local?: string;
  meeting_tz?: string;
}

export interface WebsiteIntakeResult {
  data: { created: boolean; id?: number } & Record<string, unknown>;
  status: number;
}

/** Submit a public website enquiry. Resolves with { data, status } on 2xx, throws an
 *  axios-shaped error ({ response: { status, data } }) on any non-2xx so callers can
 *  read error.response.data.detail.
 *
 *  Retries TRANSIENT failures — a network blip, a request timeout, or a 5xx/proxy error
 *  (e.g. the backend briefly restarting) — up to 4 attempts with backoff, so a momentary
 *  outage never drops a lead. A 4xx (genuine bad payload) is thrown immediately and NOT
 *  retried. If every attempt fails the error propagates, and the caller's Google-Sheet
 *  fallback still captures the lead. */
export async function submitWebsiteIntake(payload: WebsiteIntakePayload): Promise<WebsiteIntakeResult> {
  const url = `${BASE}/social/website-intake/`;
  const body = JSON.stringify(payload);
  const delays = [0, 1500, 4000, 9000]; // 4 attempts over ~15s
  const isClientErr = (s?: number) => typeof s === 'number' && s >= 400 && s < 500;
  let lastErr: unknown;

  for (let i = 0; i < delays.length; i++) {
    if (delays[i]) await new Promise((r) => setTimeout(r, delays[i]));
    const ctrl = new AbortController();
    const to = setTimeout(() => ctrl.abort(), 12000);
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        signal: ctrl.signal,
      });
      clearTimeout(to);
      let data: WebsiteIntakeResult['data'] = { created: false };
      try { data = await res.json(); } catch { /* non-JSON body */ }
      if (res.ok) return { data, status: res.status };
      const err = new Error(`website-intake ${res.status}`) as Error & { response?: unknown };
      err.response = { status: res.status, data };
      if (isClientErr(res.status)) throw err;  // 4xx: bad payload — do not retry
      lastErr = err;                            // 5xx: transient — retry
    } catch (e) {
      clearTimeout(to);
      if (isClientErr((e as { response?: { status?: number } })?.response?.status)) throw e;
      lastErr = e;                              // network error / timeout / 5xx — retry
    }
  }
  throw lastErr ?? new Error('website-intake failed after retries');
}
