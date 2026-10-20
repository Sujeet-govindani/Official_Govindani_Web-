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
}

export interface WebsiteIntakeResult {
  data: { created: boolean; id?: number } & Record<string, unknown>;
  status: number;
}

/** Submit a public website enquiry. Resolves with { data, status } on 2xx, throws an
 *  axios-shaped error ({ response: { status, data } }) on any non-2xx so callers can
 *  read error.response.data.detail. */
export async function submitWebsiteIntake(payload: WebsiteIntakePayload): Promise<WebsiteIntakeResult> {
  const res = await fetch(`${BASE}/social/website-intake/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  let data: WebsiteIntakeResult['data'] = { created: false };
  try { data = await res.json(); } catch { /* non-JSON body */ }
  if (!res.ok) {
    const err = new Error(`website-intake ${res.status}`) as Error & { response?: unknown };
    err.response = { status: res.status, data };
    throw err;
  }
  return { data, status: res.status };
}
