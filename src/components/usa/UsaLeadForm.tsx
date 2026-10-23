import { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { submitWebsiteIntake } from '@/api/websiteIntake';
import { track, getVisitorId } from '@/lib/track';
import { metaContext, trackLead } from '@/lib/metaTracking';
import '@/styles/ngo-india.css';   // the gnf-* modal styles live here (shared with the NGO India form)

/**
 * NGO-only enquiry popup for /usa (US & international). A guided, multi-step
 * confirmation: what to build, which functions, which country, NGO status,
 * portfolio check, a preferred meeting time, and the $1,000 pricing comfort —
 * then contact. Posts to the CRM as "NGO USA Website", round-robin Lucky/Sarita.
 */

const SHEET_URL =
  'https://script.google.com/macros/s/AKfycbyCwHETPazQKcZvbKYif6hD_K3pN5bVDLRP01wJFeN8skkGUtix2cvYGHWJ5vpRVZuv5Q/exec';

const AGENTS = [
  { name: 'Lucky', sheet: 'Lucky', wa: '919201958274' },
  { name: 'Sarita', sheet: 'Sarita', wa: '919201958274' },
] as const;
const TURN_KEY = 'gi.usa.turn';

function nextAgent() {
  let turn: number;
  try {
    const seen = window.localStorage.getItem(TURN_KEY);
    turn = seen === null ? Math.floor(Math.random() * AGENTS.length) : (Number(seen) + 1) % AGENTS.length;
    window.localStorage.setItem(TURN_KEY, String(turn));
  } catch { turn = Math.floor(Math.random() * AGENTS.length); }
  return AGENTS[turn];
}

function normalisePhoneIntl(raw: string): string {
  const plus = /^\s*\+/.test(raw || '');
  const d = (raw || '').replace(/\D/g, '');
  if (d.length < 7 || d.length > 15) return '';
  return plus ? `+${d}` : d;
}

const FUNCS = [
  'Online donations + instant 80G / tax receipts',
  'Recurring monthly giving',
  'Donor login & management',
  'Campaign / fundraiser pages with goal tracking',
  'Volunteer & member sign-up',
  'Events, gallery & impact updates',
  'Everything — the full platform',
];

const COUNTRIES = [
  'Worldwide / Global',
  'United States', 'United Kingdom', 'Canada', 'Australia', 'India', 'United Arab Emirates',
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
type OtherStep = { t: 'multi' | 'country' | 'portfolio' | 'datetime' | 'contact'; k?: string; q?: string; a?: string[] };
type Step = ChoiceStep | OtherStep;

const STEPS: Step[] = [
  { t: 'choice', k: 'need', q: 'What are you looking to build?', a: ['A fundraising / donation website', 'A complete donor platform', 'Not sure yet — guide me'] },
  { t: 'multi', k: 'funcs', q: 'Which functions matter most for your NGO site?' },
  { t: 'country', k: 'country', q: 'Which country is your NGO based in?' },
  { t: 'choice', k: 'status', q: 'Do you already have an NGO, or will you register one?', a: ['We are a registered NGO', 'We are registering / in process'] },
  { t: 'portfolio', k: 'seen', q: 'Have you seen our NGO website portfolio?', a: ['Yes, I have seen your work', 'No, not yet'] },
  { t: 'datetime', k: 'meet', q: 'When suits you for a quick Google Meet / Zoom?' },
  { t: 'choice', k: 'budget', q: 'Our NGO websites start at $1,000. Comfortable with that?', a: ['Yes, that works for us', 'Need more details first', 'Looking for a lower budget'] },
  { t: 'contact' },
];
const TOTAL = STEPS.length;

export default function UsaLeadForm({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [pick, setPick] = useState<Record<string, string>>({});
  const [funcs, setFuncs] = useState<string[]>([]);
  const [country, setCountry] = useState('');
  const [meet, setMeet] = useState('');
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
  }, [open, step, sameWa, err, busy, funcs, country, meet, pick]);

  useEffect(() => { if (open) track('cta_click', { cta: 'get_quote', page: 'usa' }); }, [open]);
  useEffect(() => { if (open) track('form_step', { step: step + 1, page: 'usa' }); }, [open, step]);

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
        setDone(false); setStep(0); setPick({}); setFuncs([]); setCountry(''); setMeet('');
        setF({ name: '', phone: '', whatsapp: '', email: '' });
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
    const who = nextAgent();
    setAgent(who);
    const meetNice = meet ? new Date(meet).toLocaleString() : 'Not specified';
    const fnStr = funcs.length ? funcs.join(', ') : 'Not specified';
    setWaText(
      `Hi! I just filled your NGO website enquiry. My details —\n` +
      `Name: ${f.name}\nPhone: ${phone}\nEmail: ${f.email}\n` +
      `Country: ${country || 'Not specified'}\nLooking for: ${pick.need || '-'}\n` +
      `Functions: ${fnStr}\nNGO status: ${pick.status || '-'}\n` +
      `Preferred meeting: ${meetNice}\nPricing ($1,000): ${pick.budget || '-'}`,
    );
    setBusy(true);
    try {
      const message = [
        `Requirement: ${pick.need || '-'}`,
        `Functions wanted: ${fnStr}`,
        `Country: ${country || '-'}`,
        `NGO status: ${pick.status || '-'}`,
        `Seen portfolio: ${pick.seen || '-'}`,
        `Preferred meeting (Google Meet/Zoom): ${meetNice}`,
        `Pricing ($1,000) comfort: ${pick.budget || '-'}`,
        `WhatsApp: ${wa}`,
        `Assigned to: ${who.name}`,
      ].join('\n');
      let created = true;
      try {
        const res = await submitWebsiteIntake({
          name: f.name, phone, whatsapp: wa, email: f.email, city: country,
          requirement: pick.need, has_website: pick.status, budget: pick.budget,
          message,
          source: 'NGO USA Website',
          sheet: 'usa-quote',
          assigned_to: who.sheet,
          visitor_id: getVisitorId(),
          ...meta,
        });
        created = res.data.created !== false;
      } catch {
        await fetch(SHEET_URL, {
          method: 'POST', mode: 'no-cors',
          body: JSON.stringify({
            name: f.name, phone, email: f.email, experience: country,
            subject: `USA NGO website enquiry — ${pick.need || ''}`,
            message, whatsapp: wa, city: country,
            requirement: pick.need, hasWebsite: pick.status, budget: pick.budget,
            source: '/usa', agent: who.name, sheet: who.sheet,
          }),
        });
      }
      track('lead_submit', { requirement: pick.need, country, budget: pick.budget, page: 'usa' });
      if (created) trackLead(meta.meta_event_id);
      setDone(true);
    } catch {
      setErr('Could not send just now. Please WhatsApp us at +91 92019 58274.');
    } finally {
      setBusy(false);
    }
  };

  if (!open || typeof document === 'undefined') return null;

  // local datetime min = now (so they can't pick a past slot)
  const nowLocal = (() => { const d = new Date(Date.now() - new Date().getTimezoneOffset() * 60000); return d.toISOString().slice(0, 16); })();

  return createPortal(
    <div className="gnf-modal" role="dialog" aria-modal="true" aria-label="NGO website enquiry">
      <button type="button" className="gnf-back" onClick={close} aria-label="Close" />
      <div className="gnf-panel" ref={panelRef} tabIndex={-1}>
        <button type="button" className="gnf-x" onClick={close} aria-label="Close">×</button>

        {done ? (
          <div className="gnf-done">
            <div className="gnf-tick" aria-hidden="true">✓</div>
            <h3 className="gnf-done-h">Thank you, {f.name.split(' ')[0] || 'friend'}.</h3>
            <p className="gnf-done-s">
              We have your details{meet ? <> and your preferred time (<b>{new Date(meet).toLocaleString()}</b>)</> : ''}.
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
                          {FUNCS.map((opt) => (
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
                        <label className="gnf-f gnf-f-wide">
                          <span>Country</span>
                          <select value={country} onChange={(e) => setCountry(e.target.value)}
                            style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid #d9cfc0', background: '#fff', fontSize: '1rem' }}>
                            <option value="">Select a country…</option>
                            {COUNTRIES.map((c) => (<option key={c} value={c}>{c}</option>))}
                          </select>
                        </label>
                        <button type="button" className="gnf-send" style={{ marginTop: 14 }}
                          disabled={!country} onClick={advance}>Continue →</button>
                      </>
                    )}

                    {S.t === 'portfolio' && (
                      <>
                        <h3 className="gnf-q">{S.q}</h3>
                        <div className="gnf-opts">
                          {(S as ChoiceStep).a.map((opt) => (
                            <button type="button" key={opt}
                              className={`gnf-opt${pick.seen === opt ? ' on' : ''}`}
                              onClick={() => choose('seen', opt, !/No/i.test(opt))}>
                              <span className="gnf-dot" aria-hidden="true" /><span>{opt}</span>
                            </button>
                          ))}
                        </div>
                        {/No/i.test(pick.seen || '') && (
                          <div style={{ marginTop: 14, display: 'grid', gap: 10 }}>
                            <button type="button" className="gnf-send" onClick={seeWork}>See our NGO work first →</button>
                            <button type="button" className="gnf-prev" onClick={advance}>Continue anyway →</button>
                          </div>
                        )}
                      </>
                    )}

                    {S.t === 'datetime' && (
                      <>
                        <h3 className="gnf-q">{S.q}</h3>
                        <p className="gnf-q-s">Pick a time that suits you — we&rsquo;ll confirm the meeting link.</p>
                        <label className="gnf-f gnf-f-wide">
                          <span>Preferred date &amp; time</span>
                          <input type="datetime-local" value={meet} min={nowLocal}
                            onChange={(e) => setMeet(e.target.value)}
                            style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid #d9cfc0', background: '#fff', fontSize: '1rem' }} />
                        </label>
                        <button type="button" className="gnf-send" style={{ marginTop: 14 }}
                          disabled={!meet} onClick={advance}>Continue →</button>
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
                              <input type="tel" value={f.phone} onChange={set('phone')} placeholder="+1 555 123 4567" autoComplete="tel" /></label>
                            <label className="gnf-f"><span>Email</span>
                              <input type="email" value={f.email} onChange={set('email')} placeholder="you@yourorg.org" autoComplete="email" /></label>
                          </div>
                          <label className="gnf-same">
                            <input type="checkbox" checked={sameWa} onChange={(e) => setSameWa(e.target.checked)} />
                            <span>My WhatsApp number is the same</span>
                          </label>
                          {!sameWa && (
                            <label className="gnf-f gnf-f-wide"><span>WhatsApp number</span>
                              <input type="tel" value={f.whatsapp} onChange={set('whatsapp')} placeholder="+1 555 123 4567" /></label>
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

            <p className="gnf-price">NGO websites <b>from $1,000</b> · 0% donation commission</p>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
