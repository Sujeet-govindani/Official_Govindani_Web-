// Public Website Lead Intake API client.
// POSTs a public enquiry to the CRM, which creates a lead (201) or records a repeat
// enquiry against an existing one (200). No credentials are sent — the endpoint is
// public and rate-limited server-side. Base URL comes from VITE_BASE_URL, with the
// production CRM host as the default so the build works without an env file.
const BASE = (import.meta.env.VITE_BASE_URL || 'https://wa-api.gitesting.online').replace(/\/+$/, '');

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
