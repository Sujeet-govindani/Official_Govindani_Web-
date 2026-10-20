import { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { submitWebsiteIntake } from '@/api/websiteIntake';
import { track, getVisitorId } from '@/lib/track';
import { metaContext, trackLead, normalisePhoneIN } from '@/lib/metaTracking';

/**
 * Enquiry popup for /ngoindia — one question per screen.
 *
 * A single tall form asking three qualifying questions plus five contact
 * fields reads as work. Split across four slides it reads as a conversation:
 * the choice questions advance themselves the moment one is tapped, so the
 * whole thing is three taps and one short form.
 *
 * Posts to the same Google Apps Script the site's contact form uses, so leads
 * land in the sheet the team already watches. That script reads a fixed set of
 * keys, so the three answers are repeated inside `message` as readable text —
 * nothing is lost even if the sheet never gains columns.
 */

const SHEET_URL =
  'https://script.google.com/macros/s/AKfycbyCwHETPazQKcZvbKYif6hD_K3pN5bVDLRP01wJFeN8skkGUtix2cvYGHWJ5vpRVZuv5Q/exec';

/**
 * Leads alternate between the two telecallers. `sheet` is the tab the Apps
 * Script writes the row into; `wa` is the number the lead is handed to on the
 * thank-you screen, so they land in the right person's WhatsApp themselves.
 */
const AGENTS = [
  { name: 'Lucky', sheet: 'Lucky', wa: '919201958274' },
  { name: 'Sarita', sheet: 'Sarita', wa: '919201958274' },
] as const;
const TURN_KEY = 'gi.ngoindia.turn';

/**
 * Strict one-each alternation, remembered per browser. A global counter would
 * need the round-robin to live in the Apps Script, which we cannot read back
 * through a no-cors POST — so the first lead from each device starts on a
 * random side and alternates from there, which evens out across volume.
 */
function nextAgent() {
  let turn: number;
  try {
    const seen = window.localStorage.getItem(TURN_KEY);
    turn = seen === null ? Math.floor(Math.random() * AGENTS.length) : (Number(seen) + 1) % AGENTS.length;
    window.localStorage.setItem(TURN_KEY, String(turn));
  } catch {
    turn = Math.floor(Math.random() * AGENTS.length);   // private mode
  }
  return AGENTS[turn];
}

const QS = [
  {
    k: 'need' as const,
    q: 'What is your primary requirement?',
    a: ['A new website for my NGO', 'Improve my existing website', 'Marketing and advertisement support', 'Other'],
  },
  {
    k: 'has' as const,
    q: 'Do you already have a website for your NGO?',
    a: ['Yes, I have a website', 'No, this is my first website'],
  },
  {
    k: 'budget' as const,
    q: 'Are you ready to invest ₹40,000 for your NGO website?',
    a: ['Yes, ready to proceed', 'Need more details first', 'No, looking for a lower budget'],
  },
];

type Key = (typeof QS)[number]['k'];
const TOTAL = QS.length + 1;

export default function NgoLeadForm({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [pick, setPick] = useState<Record<Key, string>>({ need: '', has: '', budget: '' });
  const [f, setF] = useState({ name: '', phone: '', whatsapp: '', email: '', city: '' });
  const [sameWa, setSameWa] = useState(true);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [agent, setAgent] = useState<(typeof AGENTS)[number]>(AGENTS[0]);
  const panelRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [viewH, setViewH] = useState<number | undefined>(undefined);

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));

  // choosing an answer moves on by itself — a Next button here is a dead tap
  const choose = (k: Key, v: string) => {
    setPick((p) => ({ ...p, [k]: v }));
    setErr('');
    window.setTimeout(() => setStep((s) => Math.min(s + 1, QS.length)), 260);
  };

  const close = useCallback(() => { onClose(); }, [onClose]);

  // All four slides sit side by side, so a flex rail would make every one as
  // tall as the tallest — leaving a lake of empty panel under a 4-option
  // question. Measure the visible slide and let the panel follow it.
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

  // Analytics: form opened (a quote-intent CTA) and per-step progress / drop-off.
  useEffect(() => { if (open) track('cta_click', { cta: 'get_quote' }); }, [open]);
  useEffect(() => { if (open) track('form_step', { step: step + 1 }); }, [open, step]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', esc);
    panelRef.current?.focus();
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', esc); };
  }, [open, close]);

  // a fresh start next time it is opened, but only once it is fully closed
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
    const phone = normalisePhoneIN(f.phone);
    if (!phone) return setErr('Please enter a valid 10-digit mobile number.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) return setErr('Please enter a valid email address.');
    if (!f.city.trim()) return setErr('Please enter your city.');

    const wa = normalisePhoneIN(sameWa ? f.phone : f.whatsapp) || phone;
    const meta = metaContext();   // event id + fbp/fbc + ad ids, shared by the browser and CRM Lead events
    const who = nextAgent();
    setAgent(who);
    setBusy(true);
    try {
      const message = [
        `Requirement: ${pick.need}`,
        `Existing website: ${pick.has}`,
        `Budget (₹40,000): ${pick.budget}`,
        `WhatsApp: ${wa}`,
        `City: ${f.city}`,
        `Assigned to: ${who.name}`,
      ].join('\n');
      // Primary: CRM Website Intake API — creates/updates a real lead, round-robin
      // assignment and a 24h initial-call task. Falls back to the Google Apps Script
      // sheet if the endpoint is unavailable, so a lead is never lost.
      let created = true;
      try {
        const res = await submitWebsiteIntake({
          name: f.name, phone, whatsapp: wa, email: f.email, city: f.city,
          requirement: pick.need, has_website: pick.has, budget: pick.budget,
          message,
          source: 'NGO India Website',   // CRM funnel label (per CRM intake contract)
          sheet: 'ngoindia-quote',       // form identifier the auto-dialer keys on
          assigned_to: who.sheet,   // Lucky / Sarita (round-robin picked above)
          visitor_id: getVisitorId(),  // stitch this lead to the visitor's tracked journey
          ...meta,
        });
        created = res.data.created !== false;   // 200 {created:false} = repeat enquiry, not a new Lead
      } catch {
        await fetch(SHEET_URL, {
          method: 'POST',
          mode: 'no-cors',
          body: JSON.stringify({
            name: f.name, phone, email: f.email, experience: f.city,
            subject: `NGO website enquiry — ${pick.need}`,
            message,
            whatsapp: wa, city: f.city,
            requirement: pick.need, hasWebsite: pick.has, budget: pick.budget,
            source: '/ngoindia',
            agent: who.name,
            sheet: who.sheet,
          }),
        });
      }
      track('lead_submit', { requirement: pick.need, has_website: pick.has, budget: pick.budget });
      if (created) trackLead(meta.meta_event_id);   // fires only after the lead really went through
      setDone(true);
    } catch {
      setErr('Could not send just now. Please WhatsApp us on +91 92019 58274.');
    } finally {
      setBusy(false);
    }
  };

  if (!open || typeof document === 'undefined') return null;

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
              We have your details. <b>Our team</b> will call you on{' '}
              <b>{f.phone}</b> within one working day — usually much sooner.
            </p>
            <a
              className="gnf-send"
              href={`https://wa.me/${agent.wa}?text=${encodeURIComponent(
                'Hi, I want to get more details about the NGO website.',
              )}`}
              target="_blank" rel="noopener noreferrer"
            >
              Message our team on WhatsApp now →
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
                  <h3 className="gnf-q">Where should we call you?</h3>
                  <p className="gnf-q-s">We&rsquo;ll connect with you — no sales script, no obligation.</p>
                  <form className="gnf-form" onSubmit={submit} noValidate>
                    <div className="gnf-fields">
                      <label className="gnf-f">
                        <span>Full name</span>
                        <input type="text" value={f.name} onChange={set('name')} placeholder="Your name" autoComplete="name" />
                      </label>
                      <label className="gnf-f">
                        <span>Phone number</span>
                        <input type="tel" value={f.phone} onChange={set('phone')} placeholder="+91" autoComplete="tel" />
                      </label>
                      <label className="gnf-f">
                        <span>Email</span>
                        <input type="email" value={f.email} onChange={set('email')} placeholder="you@yourngo.org" autoComplete="email" />
                      </label>
                      <label className="gnf-f">
                        <span>City</span>
                        <input type="text" value={f.city} onChange={set('city')} placeholder="Pune" autoComplete="address-level2" />
                      </label>
                    </div>
                    <label className="gnf-same">
                      <input type="checkbox" checked={sameWa} onChange={(e) => setSameWa(e.target.checked)} />
                      <span>My WhatsApp number is the same</span>
                    </label>
                    {!sameWa && (
                      <label className="gnf-f gnf-f-wide">
                        <span>WhatsApp number</span>
                        <input type="tel" value={f.whatsapp} onChange={set('whatsapp')} placeholder="+91" />
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

            {/* the price rides along the bottom of the panel — they are
                answering questions, so the number has to stay in sight */}
            <p className="gnf-price">Full NGO website at <b>₹40,000 only</b></p>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
