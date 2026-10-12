import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';

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
  'https://script.google.com/macros/s/AKfycbxaXavz15SJMeTef1SgZAvrAK4yZNkCVOuCInvCtns9vEgqzmYj1NWzaDs8t56TsoHp/exec';

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
  const panelRef = useRef<HTMLDivElement>(null);

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));

  // choosing an answer moves on by itself — a Next button here is a dead tap
  const choose = (k: Key, v: string) => {
    setPick((p) => ({ ...p, [k]: v }));
    setErr('');
    window.setTimeout(() => setStep((s) => Math.min(s + 1, QS.length)), 260);
  };

  const close = useCallback(() => { onClose(); }, [onClose]);

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
    if (f.phone.replace(/\D/g, '').length < 10) return setErr('Please enter a valid phone number.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) return setErr('Please enter a valid email address.');
    if (!f.city.trim()) return setErr('Please enter your city.');

    const wa = (sameWa ? f.phone : f.whatsapp) || f.phone;
    setBusy(true);
    try {
      await fetch(SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({
          name: f.name,
          phone: f.phone,
          email: f.email,
          experience: f.city,
          subject: `NGO website enquiry — ${pick.need}`,
          message: [
            `Requirement: ${pick.need}`,
            `Existing website: ${pick.has}`,
            `Budget (₹40,000): ${pick.budget}`,
            `WhatsApp: ${wa}`,
            `City: ${f.city}`,
          ].join('\n'),
          whatsapp: wa, city: f.city,
          requirement: pick.need, hasWebsite: pick.has, budget: pick.budget,
          source: '/ngoindia',
        }),
      });
      setDone(true);
    } catch {
      setErr('Could not send just now. Please WhatsApp us on +91 92019 58273.');
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
              We have your details. Someone from our team will call you on <b>{f.phone}</b> within
              one working day — usually much sooner.
            </p>
            <a className="gnf-send" href="https://wa.me/919201958273" target="_blank" rel="noopener noreferrer">
              Message us on WhatsApp now →
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

            <div className="gnf-view">
              <div className="gnf-rail" style={{ transform: `translateX(-${step * 100}%)` }}>
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

            <div className="gnf-foot">
              {step > 0 ? (
                <button type="button" className="gnf-prev" onClick={() => { setErr(''); setStep((s) => s - 1); }}>← Back</button>
              ) : <span />}
              <a className="gnf-wa" href="https://wa.me/919201958273" target="_blank" rel="noopener noreferrer">
                Prefer WhatsApp?
              </a>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
