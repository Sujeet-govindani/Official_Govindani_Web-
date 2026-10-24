import { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { submitWebsiteIntake } from '@/api/websiteIntake';
import { track, getVisitorId } from '@/lib/track';
import { metaContext, trackLead } from '@/lib/metaTracking';
import '@/styles/ngo-india.css';   // the gnf-* modal styles live here (shared with the NGO India form)

/**
 * Multi-industry enquiry popup for /pro (India & international). A guided,
 * multi-step flow: which industry, which functions, which country, website
 * status, portfolio check, a preferred meeting time, and rough budget — then
 * contact. Posts to the CRM as "Pro Website", round-robin Lucky/Sarita, with
 * per-agent WhatsApp hand-off carrying the full lead detail.
 */

const SHEET_URL =
  'https://script.google.com/macros/s/AKfycbyCwHETPazQKcZvbKYif6hD_K3pN5bVDLRP01wJFeN8skkGUtix2cvYGHWJ5vpRVZuv5Q/exec';

const AGENTS = [
  { name: 'Lucky', sheet: 'Lucky', wa: '919201958271' },
  { name: 'Sarita', sheet: 'Sarita', wa: '919201958274' },
] as const;

function nextAgent(turnKey: string) {
  let turn: number;
  try {
    const seen = window.localStorage.getItem(turnKey);
    turn = seen === null ? Math.floor(Math.random() * AGENTS.length) : (Number(seen) + 1) % AGENTS.length;
    window.localStorage.setItem(turnKey, String(turn));
  } catch { turn = Math.floor(Math.random() * AGENTS.length); }
  return AGENTS[turn];
}

function normalisePhoneIntl(raw: string): string {
  const plus = /^\s*\+/.test(raw || '');
  const d = (raw || '').replace(/\D/g, '');
  if (d.length < 7 || d.length > 15) return '';
  return plus ? `+${d}` : d;
}

const INDUSTRIES = [
  'NGO / Non-profit',
  'E-commerce / Online store',
  'School / Education',
  'Real estate / Builders',
  'Hotel / Restaurant / Hospitality',
  'Hospital / Clinic / Healthcare',
  'Business / Corporate',
  'Something else',
];

// Generic fallback (used for "Something else" / before an industry is picked).
const FUNCS = [
  'Online payments',
  'Bookings, appointments or enquiries',
  'Customer / member login & dashboard',
  'Admin panel to manage everything',
  'SEO + Google ranking',
  'WhatsApp, email & marketing automation',
  'Everything — the full platform',
];

// Step-2 options tailored to the industry chosen in step 1. Keys MUST match INDUSTRIES.
const FUNCS_BY_INDUSTRY: Record<string, string[]> = {
  'NGO / Non-profit': [
    'Online donations + instant 80G / tax receipts',
    'Recurring monthly giving',
    'Donor login & management',
    'Campaign / fundraiser pages with goal tracking',
    'Volunteer & member sign-up',
    'Events, gallery & impact updates',
    'Everything — the full donor platform',
  ],
  'E-commerce / Online store': [
    'Product catalogue with variants & stock',
    'Cart, checkout & online payments (UPI/cards/wallets)',
    'Order tracking + automated emails',
    'Coupons, offers & loyalty points',
    'Customer accounts & wishlist',
    'Admin dashboard & inventory',
    'Everything — the full store',
  ],
  'School / Education': [
    'Admissions & enquiry forms',
    'Courses / classes & fee details',
    'Photo & video gallery',
    'Notices, events & announcements',
    'Parent / student portal',
    'Online fee payment',
    'Everything — the full school platform',
  ],
  'Real estate / Builders': [
    'Property / project listings with filters',
    'Floor plans, gallery & virtual tours',
    'Enquiry capture & lead routing',
    'Location maps & amenities',
    'Brochure / price-list downloads',
    'WhatsApp & call-back integration',
    'Everything — the full real-estate site',
  ],
  'Hotel / Restaurant / Hospitality': [
    'Online booking / table reservation',
    'Menu / rooms with photos & pricing',
    'Gallery & reviews',
    'Online payments / deposits',
    'Offers & packages',
    'WhatsApp & enquiry integration',
    'Everything — the full hospitality site',
  ],
  'Hospital / Clinic / Healthcare': [
    'Appointment booking',
    'Departments & doctor profiles',
    'Patient enquiry & contact',
    'Services & treatment pages',
    'Online payments',
    'WhatsApp & call integration',
    'Everything — the full healthcare site',
  ],
  'Business / Corporate': [
    'Services / portfolio showcase',
    'Lead capture & enquiry forms',
    'SEO + Google ranking',
    'Blog / insights section',
    'Team & testimonials',
    'WhatsApp, email & marketing automation',
    'Everything — the full business site',
  ],
  'Something else': FUNCS,
};

const COUNTRIES = [
  'India', 'Worldwide / Global',
  'United States', 'United Kingdom', 'Canada', 'Australia', 'United Arab Emirates',
  'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Austria', 'Bahrain', 'Bangladesh', 'Belgium',
  'Bhutan', 'Brazil', 'Bulgaria', 'Cambodia', 'Chile', 'China', 'Colombia', 'Croatia', 'Cyprus',
  'Czechia', 'Denmark', 'Egypt', 'Ethiopia', 'Finland', 'France', 'Germany', 'Ghana', 'Greece',
  'Hong Kong', 'Hungary', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Japan',
  'Jordan', 'Kenya', 'Kuwait', 'Lebanon', 'Luxembourg', 'Malaysia', 'Maldives', 'Mauritius',
  'Mexico', 'Morocco', 'Myanmar', 'Nepal', 'Netherlands', 'New Zealand', 'Nigeria', 'Norway',
  'Oman', 'Pakistan', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia',
  'Saudi Arabia', 'Singapore', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'Sweden',
  'Switzerland', 'Tanzania', 'Thailand', 'Turkey', 'Uganda', 'Ukraine', 'Vietnam', 'Zambia',
  'Zimbabwe', 'Other',
];

type ChoiceStep = { t: 'choice'; k: string; q: string; a: string[] };
type OtherStep = { t: 'industry' | 'multi' | 'country' | 'portfolio' | 'datetime' | 'contact'; k?: string; q?: string; a?: string[] };
type Step = ChoiceStep | OtherStep;

const STEPS: Step[] = [
  { t: 'industry', k: 'industry', q: 'What kind of website do you need?' },
  { t: 'multi', k: 'funcs', q: 'Which features matter most to you?' },
  { t: 'country', k: 'country', q: 'Which country is your business based in?' },
  { t: 'choice', k: 'status', q: 'Do you already have a website?', a: ['Yes — I want it redesigned', 'No — this is my first website'] },
  { t: 'portfolio', k: 'seen', q: 'Have you seen our portfolio of 1000+ websites?', a: ['Yes, I have seen your work', 'No, not yet'] },
  { t: 'datetime', k: 'meet', q: 'When suits you for a quick Google Meet / Zoom?' },
  { t: 'choice', k: 'budget', q: 'What budget range are you planning for?', a: ['Just starting — guide me', 'I have a set budget in mind', 'Budget is flexible for the right team'] },
  { t: 'contact' },
];
const TOTAL = STEPS.length;

type ProLeadFormProps = {
  open: boolean;
  onClose: () => void;
  /** Lead source tag sent to the CRM — lets /pro (India) and /prousa (USA) be told apart. */
  source?: string;
  sheet?: string;
  /** Per-page round-robin key so each page rotates Lucky/Sarita independently. */
  turnKey?: string;
  /** Page label for analytics. */
  page?: string;
  /** Small reassurance line under the form. */
  priceNote?: string;
};

export default function ProLeadForm({
  open, onClose,
  source = 'Pro Website',
  sheet = 'pro-quote',
  turnKey = 'gi.pro.turn',
  page = 'pro',
  priceNote = '1000+ websites delivered · custom-coded · 100% ownership',
}: ProLeadFormProps) {
  const [step, setStep] = useState(0);
  const [pick, setPick] = useState<Record<string, string>>({});
  const [funcs, setFuncs] = useState<string[]>([]);
  const [country, setCountry] = useState('');
  const [geo, setGeo] = useState(false);   // true once the country was auto-filled from the visitor's location
  const [meetDate, setMeetDate] = useState('');   // ISO yyyy-mm-dd
  const [meetTime, setMeetTime] = useState('');   // slot label
  const [f, setF] = useState({ name: '', phone: '', whatsapp: '', email: '' });
  const [sameWa, setSameWa] = useState(true);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [agent, setAgent] = useState<(typeof AGENTS)[number]>(AGENTS[0]);
  const [waText, setWaText] = useState('');
  const panelRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [viewH, setViewH] = useState<number | undefined>(undefined);

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));

  const advance = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const choose = (k: string, v: string, autoAdvance = true) => {
    setPick((p) => ({ ...p, [k]: v }));
    setErr('');
    if (k === 'industry') setFuncs([]);   // options change per industry — clear any earlier picks
    if (autoAdvance) window.setTimeout(advance, 240);
  };
  const toggleFunc = (v: string) =>
    setFuncs((p) => (p.includes(v) ? p.filter((x) => x !== v) : [...p, v]));
  const close = useCallback(() => { onClose(); }, [onClose]);

  const seeWork = () => { close(); setTimeout(() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120); };

  useLayoutEffect(() => {
    if (!open) return;
    const measure = () => {
      const slide = railRef.current?.children[step] as HTMLElement | undefined;
      if (slide) setViewH(slide.scrollHeight);
    };
    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    const slide = railRef.current?.children[step] as HTMLElement | undefined;
    if (slide && ro) ro.observe(slide);
    window.addEventListener('resize', measure);
    return () => { ro?.disconnect(); window.removeEventListener('resize', measure); };
  }, [open, step, sameWa, err, busy, funcs, country, meetDate, meetTime, pick]);

  // Auto-detect the visitor's country (IP geo) to pre-fill the dropdown — they can still change it.
  useEffect(() => {
    if (!open || country) return;
    if (typeof navigator !== 'undefined' && (navigator.webdriver || navigator.userAgent.indexOf('HeadlessChrome') > -1)) return;
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch('https://ipwho.is/?fields=country,success');
        const d = await r.json();
        if (cancelled || !d || d.success === false || !d.country) return;
        const name = String(d.country);
        const match = COUNTRIES.find((c) => c.toLowerCase() === name.toLowerCase());
        setCountry(match || name);
        setGeo(true);
      } catch { /* geo is optional */ }
    })();
    return () => { cancelled = true; };
  }, [open, country]);

  useEffect(() => { if (open) track('cta_click', { cta: 'get_quote', page }); }, [open, page]);
  useEffect(() => { if (open) track('form_step', { step: step + 1, page }); }, [open, step, page]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', esc);
    panelRef.current?.focus();
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', esc); };
  }, [open, close]);

  useEffect(() => {
    if (open) return;
    const t = window.setTimeout(() => {
      if (done) {
        setDone(false); setStep(0); setPick({}); setFuncs([]); setCountry(''); setGeo(false);
        setMeetDate(''); setMeetTime(''); setF({ name: '', phone: '', whatsapp: '', email: '' });
      }
      setErr('');
    }, 350);
    return () => window.clearTimeout(t);
  }, [open, done]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr('');
    if (f.name.trim().length < 2) return setErr('Please enter your full name.');
    const phone = normalisePhoneIntl(f.phone);
    if (!phone) return setErr('Please enter a valid phone number with country code.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) return setErr('Please enter a valid email address.');

    const wa = normalisePhoneIntl(sameWa ? f.phone : f.whatsapp) || phone;
    const meta = metaContext();
    const who = nextAgent(turnKey);
    setAgent(who);
    const meetNice = meetDate && meetTime
      ? `${new Date(meetDate + 'T00:00').toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })} · ${meetTime}`
      : 'Not specified';
    // Machine-readable slot in the CUSTOMER's local time + their IANA timezone, so the CRM converts
    // the meeting to the agent's IST exactly (never guesses). e.g. "2026-10-30T14:30" + "America/New_York".
    const slotTo24 = (slot: string): string => {
      const m = slot.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
      if (!m) return '';
      let h = parseInt(m[1], 10);
      if (/pm/i.test(m[3]) && h !== 12) h += 12;
      if (/am/i.test(m[3]) && h === 12) h = 0;
      return `${String(h).padStart(2, '0')}:${m[2]}`;
    };
    const meetingLocal = meetDate && meetTime && slotTo24(meetTime) ? `${meetDate}T${slotTo24(meetTime)}` : '';
    const meetingTz = (() => { try { return Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch { return ''; } })();
    const fnStr = funcs.length ? funcs.join(', ') : 'Not specified';
    const industry = pick.industry || 'Not specified';
    setWaText(
      `Hi! I just filled your website enquiry. My details —\n` +
      `Name: ${f.name}\nPhone: ${phone}\nEmail: ${f.email}\n` +
      `Country: ${country || 'Not specified'}\nIndustry: ${industry}\n` +
      `Features: ${fnStr}\nWebsite status: ${pick.status || '-'}\n` +
      `Preferred meeting: ${meetNice}\nBudget: ${pick.budget || '-'}`,
    );
    setBusy(true);
    try {
      const message = [
        `Industry: ${industry}`,
        `Features wanted: ${fnStr}`,
        `Country: ${country || '-'}`,
        `Website status: ${pick.status || '-'}`,
        `Seen portfolio: ${pick.seen || '-'}`,
        `Preferred meeting (Google Meet/Zoom): ${meetNice}`,
        `Budget: ${pick.budget || '-'}`,
        `WhatsApp: ${wa}`,
        `Assigned to: ${who.name}`,
      ].join('\n');
      let created = true;
      try {
        const res = await submitWebsiteIntake({
          name: f.name, phone, whatsapp: wa, email: f.email, city: country,
          requirement: industry, has_website: pick.status, budget: pick.budget,
          message,
          source,
          sheet,
          assigned_to: who.sheet,
          visitor_id: getVisitorId(),
          meeting_local: meetingLocal,
          meeting_tz: meetingTz,
          ...meta,
        });
        created = res.data.created !== false;
      } catch {
        await fetch(SHEET_URL, {
          method: 'POST', mode: 'no-cors',
          body: JSON.stringify({
            name: f.name, phone, email: f.email, experience: country,
            subject: `Website enquiry — ${industry}`,
            message, whatsapp: wa, city: country,
            requirement: industry, hasWebsite: pick.status, budget: pick.budget,
            source: `/${page}`, agent: who.name, sheet: who.sheet,
          }),
        });
      }
      track('lead_submit', { requirement: industry, country, budget: pick.budget, page });
      if (created) trackLead(meta.meta_event_id);
      setDone(true);
    } catch {
      setErr('Could not send just now. Please WhatsApp us at +91 92019 58273.');
    } finally {
      setBusy(false);
    }
  };

  if (!open || typeof document === 'undefined') return null;

  // On-brand meeting picker: next 12 days (from tomorrow) + a few friendly time slots.
  const days = Array.from({ length: 12 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() + i + 1); return d; });
  const SLOTS = ['10:00 AM', '11:30 AM', '1:00 PM', '2:30 PM', '4:00 PM', '5:30 PM', '7:00 PM'];
  const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const meetLabel = meetDate && meetTime
    ? `${new Date(meetDate + 'T00:00').toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' })} · ${meetTime}`
    : '';

  return createPortal(
    <div className="gnf-modal" role="dialog" aria-modal="true" aria-label="Website enquiry">
      <button type="button" className="gnf-back" onClick={close} aria-label="Close" />
      <div className="gnf-panel" ref={panelRef} tabIndex={-1}>
        <button type="button" className="gnf-x" onClick={close} aria-label="Close">×</button>

        {done ? (
          <div className="gnf-done">
            <div className="gnf-tick" aria-hidden="true">✓</div>
            <h3 className="gnf-done-h">Thank you, {f.name.split(' ')[0] || 'friend'}.</h3>
            <p className="gnf-done-s">
              We have your details{meetLabel ? <> and your preferred time (<b>{meetLabel}</b>)</> : ''}.
              {' '}<b>Our team</b> will confirm your Google Meet / Zoom and reach out within one business day.
            </p>
            <a
              className="gnf-send"
              href={`https://wa.me/${agent.wa}?text=${encodeURIComponent(waText)}`}
              target="_blank" rel="noopener noreferrer"
            >
              Send my details on WhatsApp now →
            </a>
          </div>
        ) : (
          <>
            <div className="gnf-head">
              <div className="gnf-prog" aria-hidden="true">
                {Array.from({ length: TOTAL }, (_, i) => (<span key={i} className={i <= step ? 'on' : ''} />))}
              </div>
              <p className="gnf-count">Step {Math.min(step + 1, TOTAL)} of {TOTAL}</p>
            </div>

            <div className="gnf-view" style={viewH ? { height: viewH } : undefined}>
              <div className="gnf-rail" ref={railRef} style={{ transform: `translateX(-${step * 100}%)` }}>
                {STEPS.map((S, i) => (
                  <div className="gnf-slide" key={i} aria-hidden={step !== i}>
                    {S.t === 'industry' && (
                      <>
                        <h3 className="gnf-q">{S.q}</h3>
                        <p className="gnf-q-s">We build for every industry — pick yours.</p>
                        <div className="gnf-opts">
                          {INDUSTRIES.map((opt) => (
                            <button type="button" key={opt}
                              className={`gnf-opt${pick.industry === opt ? ' on' : ''}`}
                              onClick={() => choose('industry', opt)}>
                              <span className="gnf-dot" aria-hidden="true" /><span>{opt}</span>
                            </button>
                          ))}
                        </div>
                      </>
                    )}

                    {S.t === 'choice' && (
                      <>
                        <h3 className="gnf-q">{S.q}</h3>
                        <div className="gnf-opts">
                          {(S as ChoiceStep).a.map((opt) => (
                            <button type="button" key={opt}
                              className={`gnf-opt${pick[(S as ChoiceStep).k] === opt ? ' on' : ''}`}
                              onClick={() => choose((S as ChoiceStep).k, opt)}>
                              <span className="gnf-dot" aria-hidden="true" /><span>{opt}</span>
                            </button>
                          ))}
                        </div>
                      </>
                    )}

                    {S.t === 'multi' && (
                      <>
                        <h3 className="gnf-q">{S.q}</h3>
                        <p className="gnf-q-s">Pick all that apply.</p>
                        <div className="gnf-opts">
                          {(FUNCS_BY_INDUSTRY[pick.industry] || FUNCS).map((opt) => (
                            <button type="button" key={opt}
                              className={`gnf-opt${funcs.includes(opt) ? ' on' : ''}`}
                              onClick={() => toggleFunc(opt)}>
                              <span className="gnf-dot" aria-hidden="true" /><span>{opt}</span>
                            </button>
                          ))}
                        </div>
                        <button type="button" className="gnf-send" style={{ marginTop: 14 }}
                          disabled={!funcs.length} onClick={advance}>Continue →</button>
                      </>
                    )}

                    {S.t === 'country' && (
                      <>
                        <h3 className="gnf-q">{S.q}</h3>
                        {geo && country && <p className="gnf-geo">📍 Detected <b>{country}</b> from your location — change if needed.</p>}
                        <label className="gnf-f gnf-f-wide">
                          <span>Country</span>
                          <select className="gnf-select" value={country} onChange={(e) => { setCountry(e.target.value); setGeo(false); }}>
                            <option value="">Select a country…</option>
                            {country && !COUNTRIES.includes(country) && <option value={country}>{country}</option>}
                            {COUNTRIES.map((c) => (<option key={c} value={c}>{c}</option>))}
                          </select>
                        </label>
                        <button type="button" className="gnf-send" style={{ marginTop: 14 }} disabled={!country} onClick={advance}>Continue →</button>
                      </>
                    )}

                    {S.t === 'portfolio' && (
                      <>
                        <h3 className="gnf-q">{S.q}</h3>
                        <div className="gnf-opts">
                          {(S.a || []).map((opt) => (
                            <button type="button" key={opt}
                              className={`gnf-opt${pick.seen === opt ? ' on' : ''}`}
                              onClick={() => choose('seen', opt, !/No/i.test(opt))}>
                              <span className="gnf-dot" aria-hidden="true" /><span>{opt}</span>
                            </button>
                          ))}
                        </div>
                        {/No/i.test(pick.seen || '') && (
                          <div style={{ marginTop: 14, display: 'grid', gap: 10 }}>
                            <button type="button" className="gnf-send" onClick={seeWork}>See our work first →</button>
                            <button type="button" className="gnf-prev" onClick={advance}>Continue anyway →</button>
                          </div>
                        )}
                      </>
                    )}

                    {S.t === 'datetime' && (
                      <>
                        <h3 className="gnf-q">{S.q}</h3>
                        <p className="gnf-q-s">Pick a day and a time — we&rsquo;ll confirm your Google Meet / Zoom link.</p>
                        <p className="gnf-pick-lbl">Choose a day</p>
                        <div className="gnf-days">
                          {days.map((d) => {
                            const v = iso(d);
                            return (
                              <button type="button" key={v} className={`gnf-day${meetDate === v ? ' on' : ''}`} onClick={() => setMeetDate(v)}>
                                <span className="gnf-day-dow">{d.toLocaleDateString(undefined, { weekday: 'short' })}</span>
                                <span className="gnf-day-num">{d.getDate()}</span>
                                <span className="gnf-day-mon">{d.toLocaleDateString(undefined, { month: 'short' })}</span>
                              </button>
                            );
                          })}
                        </div>
                        <p className="gnf-pick-lbl">Choose a time</p>
                        <div className="gnf-slots">
                          {SLOTS.map((t) => (
                            <button type="button" key={t} className={`gnf-slot${meetTime === t ? ' on' : ''}`} onClick={() => setMeetTime(t)}>{t}</button>
                          ))}
                        </div>
                        <button type="button" className="gnf-send" style={{ marginTop: 16 }} disabled={!meetDate || !meetTime} onClick={advance}>Continue →</button>
                      </>
                    )}

                    {S.t === 'contact' && (
                      <>
                        <h3 className="gnf-q">Where should we reach you?</h3>
                        <p className="gnf-q-s">We&rsquo;ll confirm your meeting and details — no sales script.</p>
                        <form className="gnf-form" onSubmit={submit} noValidate>
                          <div className="gnf-fields">
                            <label className="gnf-f"><span>Full name</span>
                              <input type="text" value={f.name} onChange={set('name')} placeholder="Your name" autoComplete="name" /></label>
                            <label className="gnf-f"><span>Phone number</span>
                              <input type="tel" value={f.phone} onChange={set('phone')} placeholder="+91 98765 43210" autoComplete="tel" /></label>
                            <label className="gnf-f"><span>Email</span>
                              <input type="email" value={f.email} onChange={set('email')} placeholder="you@yourbusiness.com" autoComplete="email" /></label>
                          </div>
                          <label className="gnf-same">
                            <input type="checkbox" checked={sameWa} onChange={(e) => setSameWa(e.target.checked)} />
                            <span>My WhatsApp number is the same</span>
                          </label>
                          {!sameWa && (
                            <label className="gnf-f gnf-f-wide"><span>WhatsApp number</span>
                              <input type="tel" value={f.whatsapp} onChange={set('whatsapp')} placeholder="+91 98765 43210" /></label>
                          )}
                          {err && <p className="gnf-err" role="alert">{err}</p>}
                          <button type="submit" className="gnf-send" disabled={busy}>
                            {busy ? 'Sending…' : 'Send my details →'}
                          </button>
                        </form>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {step > 0 && !done && (
              <div className="gnf-foot">
                <button type="button" className="gnf-prev" onClick={() => { setErr(''); setStep((s) => s - 1); }}>← Back</button>
              </div>
            )}

            <p className="gnf-price">{priceNote}</p>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
