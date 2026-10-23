import { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { submitWebsiteIntake } from '@/api/websiteIntake';
import { track, getVisitorId } from '@/lib/track';
import { metaContext, trackLead } from '@/lib/metaTracking';

/**
 * Enquiry popup for /usa (US & international clients) — same proven flow as the
 * NGO India form (reuses the gnf-* styles and the CRM Website Intake wiring),
 * but with US-appropriate questions, international phone handling, USD framing,
 * and its own round-robin turn key. Leads post to the CRM as "NGO USA Website".
 */

const SHEET_URL =
  'https://script.google.com/macros/s/AKfycbyCwHETPazQKcZvbKYif6hD_K3pN5bVDLRP01wJFeN8skkGUtix2cvYGHWJ5vpRVZuv5Q/exec';

// Same two agents as India, alternating one-each — just a separate turn key so
// the USA funnel round-robins independently.
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
  } catch {
    turn = Math.floor(Math.random() * AGENTS.length);
  }
  return AGENTS[turn];
}

/** International phone: keep a leading + and digits; accept 7–15 digits. Does NOT
 *  force a 10-digit Indian mobile (US/intl numbers differ). '' if it can't be one. */
function normalisePhoneIntl(raw: string): string {
  const plus = /^\s*\+/.test(raw || '');
  const d = (raw || '').replace(/\D/g, '');
  if (d.length < 7 || d.length > 15) return '';
  return plus ? `+${d}` : d;
}

const QS = [
  {
    k: 'need' as const,
    q: 'What are you looking to build?',
    a: ['A fundraising website / donor platform', 'An e-commerce store', 'Marketing & ads', 'Not sure yet'],
  },
  {
    k: 'has' as const,
    q: 'Are you a non-profit or a business?',
    a: ['Non-profit / NGO', 'Business / e-commerce', 'Both'],
  },
  {
    k: 'budget' as const,
    q: 'Ready to invest in your own platform (from $1,000)?',
    a: ['Yes, ready to start', 'Need more details first', 'Just exploring'],
  },
];

type Key = (typeof QS)[number]['k'];
const TOTAL = QS.length + 1;

export default function UsaLeadForm({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [pick, setPick] = useState<Record<Key, string>>({ need: '', has: '', budget: '' });
  const [f, setF] = useState({ name: '', phone: '', whatsapp: '', email: '', city: '' });
  const [sameWa, setSameWa] = useState(true);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [agent, setAgent] = useState<(typeof AGENTS)[number]>(AGENTS[0]);
  const [waText, setWaText] = useState('');   // prefilled WhatsApp message with the lead's own details
  const panelRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [viewH, setViewH] = useState<number | undefined>(undefined);

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));

  const choose = (k: Key, v: string) => {
    setPick((p) => ({ ...p, [k]: v }));
    setErr('');
    window.setTimeout(() => setStep((s) => Math.min(s + 1, QS.length)), 260);
  };

  const close = useCallback(() => { onClose(); }, [onClose]);

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
  }, [open, step, sameWa, err, busy]);

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
      if (done) { setDone(false); setStep(0); setPick({ need: '', has: '', budget: '' }); setF({ name: '', phone: '', whatsapp: '', email: '', city: '' }); }
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
    if (!f.city.trim()) return setErr('Please enter your city & country.');

    const wa = normalisePhoneIntl(sameWa ? f.phone : f.whatsapp) || phone;
    const meta = metaContext();
    const who = nextAgent();
    setAgent(who);
    // Pre-fill the WhatsApp message with everything the lead just entered, so one tap
    // sends their full details to the assigned (round-robin) agent.
    setWaText(
      `Hi! I just filled your enquiry form. My details —\n` +
      `Name: ${f.name}\nPhone: ${phone}\nEmail: ${f.email}\nLocation: ${f.city}\n` +
      `Looking for: ${pick.need}\nType: ${pick.has}\nReadiness: ${pick.budget}`,
    );
    setBusy(true);
    try {
      const message = [
        `Requirement: ${pick.need}`,
        `Org type: ${pick.has}`,
        `Readiness ($1,000+): ${pick.budget}`,
        `WhatsApp: ${wa}`,
        `Location: ${f.city}`,
        `Assigned to: ${who.name}`,
      ].join('\n');
      let created = true;
      try {
        const res = await submitWebsiteIntake({
          name: f.name, phone, whatsapp: wa, email: f.email, city: f.city,
          requirement: pick.need, has_website: pick.has, budget: pick.budget,
          message,
          source: 'NGO USA Website',   // CRM funnel label for the US funnel
          sheet: 'usa-quote',          // form identifier
          assigned_to: who.sheet,      // Lucky / Sarita (round-robin, same as India)
          visitor_id: getVisitorId(),
          ...meta,
        });
        created = res.data.created !== false;
      } catch {
        await fetch(SHEET_URL, {
          method: 'POST',
          mode: 'no-cors',
          body: JSON.stringify({
            name: f.name, phone, email: f.email, experience: f.city,
            subject: `USA website enquiry — ${pick.need}`,
            message,
            whatsapp: wa, city: f.city,
            requirement: pick.need, hasWebsite: pick.has, budget: pick.budget,
            source: '/usa',
            agent: who.name,
            sheet: who.sheet,
          }),
        });
      }
      track('lead_submit', { requirement: pick.need, org: pick.has, budget: pick.budget, page: 'usa' });
      if (created) trackLead(meta.meta_event_id);
      setDone(true);
    } catch {
      setErr('Could not send just now. Please WhatsApp us at +91 92019 58274.');
    } finally {
      setBusy(false);
    }
  };

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div className="gnf-modal" role="dialog" aria-modal="true" aria-label="USA website enquiry">
      <button type="button" className="gnf-back" onClick={close} aria-label="Close" />
      <div className="gnf-panel" ref={panelRef} tabIndex={-1}>
        <button type="button" className="gnf-x" onClick={close} aria-label="Close">×</button>

        {done ? (
          <div className="gnf-done">
            <div className="gnf-tick" aria-hidden="true">✓</div>
            <h3 className="gnf-done-h">Thank you, {f.name.split(' ')[0] || 'friend'}.</h3>
            <p className="gnf-done-s">
              We have your details. <b>Our team</b> will reach out to you on{' '}
              <b>{f.phone}</b> within one business day.
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
                {Array.from({ length: TOTAL }, (_, i) => (
                  <span key={i} className={i <= step ? 'on' : ''} />
                ))}
              </div>
              <p className="gnf-count">Question {Math.min(step + 1, TOTAL)} of {TOTAL}</p>
            </div>

            <div className="gnf-view" style={viewH ? { height: viewH } : undefined}>
              <div className="gnf-rail" ref={railRef} style={{ transform: `translateX(-${step * 100}%)` }}>
                {QS.map((Q) => (
                  <div className="gnf-slide" key={Q.k} aria-hidden={QS[step]?.k !== Q.k}>
                    <h3 className="gnf-q">{Q.q}</h3>
                    <div className="gnf-opts">
                      {Q.a.map((opt) => (
                        <button
                          type="button" key={opt}
                          className={`gnf-opt${pick[Q.k] === opt ? ' on' : ''}`}
                          onClick={() => choose(Q.k, opt)}
                        >
                          <span className="gnf-dot" aria-hidden="true" />
                          <span>{opt}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="gnf-slide" aria-hidden={step !== QS.length}>
                  <h3 className="gnf-q">Where should we reach you?</h3>
                  <p className="gnf-q-s">We&rsquo;ll connect with you — no sales script, no obligation.</p>
                  <form className="gnf-form" onSubmit={submit} noValidate>
                    <div className="gnf-fields">
                      <label className="gnf-f">
                        <span>Full name</span>
                        <input type="text" value={f.name} onChange={set('name')} placeholder="Your name" autoComplete="name" />
                      </label>
                      <label className="gnf-f">
                        <span>Phone number</span>
                        <input type="tel" value={f.phone} onChange={set('phone')} placeholder="+1 555 123 4567" autoComplete="tel" />
                      </label>
                      <label className="gnf-f">
                        <span>Email</span>
                        <input type="email" value={f.email} onChange={set('email')} placeholder="you@yourorg.org" autoComplete="email" />
                      </label>
                      <label className="gnf-f">
                        <span>City &amp; Country</span>
                        <input type="text" value={f.city} onChange={set('city')} placeholder="New York, USA" autoComplete="address-level2" />
                      </label>
                    </div>
                    <label className="gnf-same">
                      <input type="checkbox" checked={sameWa} onChange={(e) => setSameWa(e.target.checked)} />
                      <span>My WhatsApp number is the same</span>
                    </label>
                    {!sameWa && (
                      <label className="gnf-f gnf-f-wide">
                        <span>WhatsApp number</span>
                        <input type="tel" value={f.whatsapp} onChange={set('whatsapp')} placeholder="+1 555 123 4567" />
                      </label>
                    )}
                    {err && <p className="gnf-err" role="alert">{err}</p>}
                    <button type="submit" className="gnf-send" disabled={busy}>
                      {busy ? 'Sending…' : 'Send my details →'}
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {step > 0 && (
              <div className="gnf-foot">
                <button type="button" className="gnf-prev" onClick={() => { setErr(''); setStep((s) => s - 1); }}>← Back</button>
              </div>
            )}

            <p className="gnf-price">Your own platform <b>from $1,000</b> · 0% donation commission</p>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
