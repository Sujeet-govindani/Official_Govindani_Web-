import { useState } from 'react';
import '../styles/career-role.css';

/**
 * The Social Media Marketer opening, as its own page on our own domain.
 *
 * This mirrors the standalone careers app on the VPS: the same advert, the same
 * questions, and the same hand-off — the candidate applies, we register and tag
 * them, and then *they* open WhatsApp, which is what makes the AI screening
 * round free to run. The page simply has to live somewhere a candidate will
 * trust, and an sslip.io address is not that.
 *
 * The apply POST goes to the same endpoint the VPS page uses, so there is one
 * applicant store and one screening queue, not two.
 */

const APPLY_URL = 'https://careers.187-52-115-246.sslip.io/apply';
const WA_NUMBER = '919201958278';
const ROLE = 'Social Media Marketer';

/**
 * The server normalises the number the same way before it will accept an
 * application. Doing it here too means an unusable number is caught while the
 * candidate is still looking at the field, rather than becoming a row nobody
 * can call.
 */
function normPhone(raw: string) {
  const d = (raw || '').replace(/\D/g, '');
  const n = d.length === 10 ? '91' + d : d.startsWith('0') ? '91' + d.slice(1) : d;
  return n.length === 12 && n.startsWith('91') && /^[6-9]/.test(n[2]) ? n : '';
}

const LOOKING_FOR = [
  ['Hands-on video editing', '(Adobe Premiere Pro / CapCut / DaVinci)'],
  ['Graphic design', '(Canva / Photoshop / Figma) and using AI for design'],
  ['Strong content writing', 'for social'],
  ['Real paid-ads experience', '(running Meta/Google campaigns yourself)'],
  ['AI & automation savvy', ''],
] as const;

const FIELDS = [
  { k: 'name', label: 'Full name', req: true, ph: 'Your name', ac: 'name' },
  { k: 'phone', label: 'WhatsApp number', req: true, ph: '10-digit', ac: 'tel', mode: 'numeric' },
  { k: 'email', label: 'Email', ph: 'you@example.com', ac: 'email', type: 'email' },
  { k: 'experience', label: 'Years of experience', ph: 'e.g. 3', mode: 'numeric' },
  { k: 'company', label: 'Current company / role', ph: 'Where you work now' },
  { k: 'skills', label: 'Your key skills', ph: 'e.g. Premiere Pro, Meta Ads, Canva, content writing', wide: true },
  { k: 'expected', label: 'Expected salary (monthly)', ph: 'e.g. 25,000' },
  { k: 'location', label: 'Current location (city)', ph: 'Pune' },
  { k: 'notice', label: 'Notice period', ph: 'Immediate / 15 days / 1 month' },
  { k: 'portfolio', label: 'Portfolio / LinkedIn / Instagram link', ph: 'https://', wide: true },
] as const;

type Key = (typeof FIELDS)[number]['k'];
const EMPTY = Object.fromEntries(FIELDS.map((f) => [f.k, ''])) as Record<Key, string>;

export default function CareerSmmLanding() {
  const [f, setF] = useState<Record<Key, string>>(EMPTY);
  const [trap, setTrap] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const [waLink, setWaLink] = useState('');

  const set = (k: Key) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr('');
    const name = f.name.trim();
    if (name.length < 2) return setErr('Please enter your full name.');
    if (!normPhone(f.phone)) return setErr('Please enter a valid 10-digit WhatsApp number.');

    setBusy(true);
    const payload = { ...f, name, company_website: trap };
    try {
      // The endpoint is on another origin and does not send CORS headers yet, so
      // a plain POST is rejected before it is read. Try it properly first — the
      // day a header is added this starts reporting real errors on its own — and
      // fall back to an opaque send, which still reaches the server.
      try {
        const r = await fetch(APPLY_URL, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const j = await r.json();
        if (!j.ok) { setErr(j.error || 'Something went wrong.'); setBusy(false); return; }
        setWaLink(j.wa);
        return;
      } catch {
        await fetch(APPLY_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }
      // Same message the server composes, so the HR bot reads the same opening line.
      setWaLink(
        `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
          `Hi Govindani Infotech 👋 I've applied for the ${ROLE} role and I'd like to start my first interview round. — ${name}`,
        )}`,
      );
    } catch {
      setErr('Network error. Please try again, or WhatsApp us on +91 92019 58278.');
      setBusy(false);
    }
  };

  return (
    <div className="gcr">
      <section className="gcr-hero">
        <div className="gcr-hero-in">
          <p className="gcr-kicker">We&rsquo;re hiring · Pune</p>
          <h1 className="gcr-h1">{ROLE}</h1>
          <p className="gcr-sub">Govindani Infotech Pvt. Ltd. &middot; Satara Road, Pune</p>
          <div className="gcr-chips">
            <span className="gcr-chip">Full-time</span>
            <span className="gcr-chip">In-office</span>
            <span className="gcr-chip">Immediate joiners preferred</span>
          </div>
          <a className="gcr-hero-cta" href="#apply">Apply in 2 minutes →</a>
          <p className="gcr-hero-note">
            Your <b>first interview round starts instantly on WhatsApp</b> — no waiting for a call-back.
          </p>
        </div>
      </section>

      <div className="gcr-body">
        <article className="gcr-main">
          <h2 className="gcr-h2">About the role</h2>
          <p className="gcr-p">
            We&rsquo;re hiring a <b>{ROLE}</b> to own content, short-form video/reels, graphic design,
            and paid ads (Meta &amp; Google) for our brands. You&rsquo;ll plan and create content, run
            campaigns end-to-end, and use AI tools to move fast.
          </p>

          <h2 className="gcr-h2">What we&rsquo;re looking for</h2>
          <ul className="gcr-list">
            {LOOKING_FOR.map(([strong, rest]) => (
              <li key={strong}><b>{strong}</b>{rest ? ` ${rest}` : ''}</li>
            ))}
          </ul>

          <h2 className="gcr-h2">How hiring works here</h2>
          <ol className="gcr-steps">
            <li><b>You apply</b> — the short form below, about two minutes.</li>
            <li><b>WhatsApp screening, straight away</b> — tap the button and our HR assistant asks you a few role questions right there.</li>
            <li><b>In-person round</b> — if the screening goes well, we book a slot at our Satara Road office.</li>
          </ol>
        </article>

        <aside className="gcr-apply" id="apply">
          {waLink ? (
            <div className="gcr-done">
              <div className="gcr-tick" aria-hidden="true">✓</div>
              <h2 className="gcr-done-h">Application received</h2>
              <p className="gcr-done-p">
                Your first interview round is a quick chat on <b>WhatsApp</b> with our HR assistant.
                Tap below to start it now.
              </p>
              <a className="gcr-wa" href={waLink} target="_blank" rel="noopener noreferrer">
                Start my interview on WhatsApp
              </a>
              <p className="gcr-done-s">
                This opens WhatsApp with a message ready to send — just hit send and the questions begin.
              </p>
            </div>
          ) : (
            <>
              <h2 className="gcr-apply-h">Apply for this role</h2>
              <p className="gcr-apply-s">
                Fill the form, then tap the WhatsApp button — your first interview round starts instantly.
              </p>
              <form className="gcr-form" onSubmit={submit} noValidate>
                <div className="gcr-fields">
                  {FIELDS.map((fd) => (
                    <label className={`gcr-f${'wide' in fd && fd.wide ? ' gcr-f-wide' : ''}`} key={fd.k}>
                      <span>
                        {fd.label}
                        {'req' in fd && fd.req ? <i className="gcr-req" aria-hidden="true"> *</i> : null}
                      </span>
                      <input
                        type={'type' in fd ? fd.type : 'text'}
                        inputMode={'mode' in fd ? (fd.mode as 'numeric') : undefined}
                        autoComplete={'ac' in fd ? fd.ac : undefined}
                        value={f[fd.k]}
                        onChange={set(fd.k)}
                        placeholder={fd.ph}
                      />
                    </label>
                  ))}
                </div>

                {/* Left for scripted submitters; a real applicant never sees it. */}
                <input
                  className="gcr-trap" tabIndex={-1} autoComplete="off" aria-hidden="true"
                  name="company_website" value={trap} onChange={(e) => setTrap(e.target.value)}
                />

                {err && <p className="gcr-err" role="alert">{err}</p>}
                <button type="submit" className="gcr-send" disabled={busy}>
                  {busy ? 'Submitting…' : 'Submit application'}
                </button>
                <p className="gcr-fine">
                  By applying you agree to be contacted on WhatsApp about this role.
                </p>
              </form>
            </>
          )}
        </aside>
      </div>

      {/* On a phone the form is below a screenful of advert, and the site's own
          bottom navigation already owns the last 57px — so the way back to the
          form rides just above it, and leaves once the application is in. */}
      {!waLink && (
        <div className="gcr-sticky">
          <span className="gcr-sticky-t">Pune &middot; full-time</span>
          <a className="gcr-sticky-btn" href="#apply">Apply now &rarr;</a>
        </div>
      )}
    </div>
  );
}
