import { useState } from 'react';

/**
 * The enquiry form for /ngoindia — replaces the Calendly booking embed.
 *
 * Three qualifying questions before the contact fields, so the call is
 * already half-qualified before anyone picks up the phone: what they need,
 * whether a site already exists, and whether ₹40,000 is actually on the table.
 *
 * Posts to the same Google Apps Script the site's contact form uses, so leads
 * land in the sheet the team already watches. The script only reads a known
 * set of keys, so the three answers are repeated inside `message` as readable
 * text — nothing is lost even if the sheet never grows new columns.
 */

const SHEET_URL =
  'https://script.google.com/macros/s/AKfycbxaXavz15SJMeTef1SgZAvrAK4yZNkCVOuCInvCtns9vEgqzmYj1NWzaDs8t56TsoHp/exec';

const Q = {
  need: {
    q: 'What is your primary requirement?',
    a: ['A new website for my NGO', 'Improve my existing website', 'Marketing and advertisement support', 'Other'],
  },
  has: {
    q: 'Do you already have a website for your NGO?',
    a: ['Yes, I have a website', 'No, this is my first website'],
  },
  budget: {
    q: 'Are you ready to invest ₹40,000 for your NGO website?',
    a: ['Yes, ready to proceed', 'Need more details first', 'No, looking for a lower budget'],
  },
} as const;

type Key = keyof typeof Q;

export default function NgoLeadForm() {
  const [pick, setPick] = useState<Record<Key, string>>({ need: '', has: '', budget: '' });
  const [f, setF] = useState({ name: '', phone: '', whatsapp: '', email: '', city: '' });
  const [sameWa, setSameWa] = useState(true);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr('');

    if (!pick.need || !pick.has || !pick.budget) return setErr('Please answer all three questions above.');
    if (f.name.trim().length < 2) return setErr('Please enter your full name.');
    const phone = f.phone.replace(/\D/g, '');
    if (phone.length < 10) return setErr('Please enter a valid phone number.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) return setErr('Please enter a valid email address.');
    if (!f.city.trim()) return setErr('Please enter your city.');

    const wa = sameWa ? f.phone : f.whatsapp;
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
            `WhatsApp: ${wa || f.phone}`,
            `City: ${f.city}`,
          ].join('\n'),
          // also sent as their own keys, in case the sheet gains columns later
          whatsapp: wa || f.phone,
          city: f.city,
          requirement: pick.need,
          hasWebsite: pick.has,
          budget: pick.budget,
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

  if (done) {
    return (
      <section className="gnf" id="book">
        <div className="gnf-in gnf-done">
          <div className="gnf-tick" aria-hidden="true">✓</div>
          <h2 className="gusa-h2">Thank you, {f.name.split(' ')[0] || 'friend'}.</h2>
          <p className="gnf-sub">
            We have your details. Someone from our team will call you on <b>{f.phone}</b> within one
            working day &mdash; usually much sooner.
          </p>
          <a className="gusa-btn" href="https://wa.me/919201958273" target="_blank" rel="noopener noreferrer">
            Or message us on WhatsApp now &rarr;
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="gnf" id="book">
      <div className="gnf-in">
        <p className="gusa-eyebrow" style={{ textAlign: 'center' }}>Tell us about your NGO</p>
        <h2 className="gusa-h2">Three questions. Then we call you.</h2>
        <p className="gnf-sub">
          No sales script and no obligation &mdash; the answers just let us arrive at the call
          already knowing what your trust needs.
        </p>

        <form className="gnf-form" onSubmit={submit} noValidate>
          {(Object.keys(Q) as Key[]).map((k, i) => (
            <fieldset className="gnf-q" key={k}>
              <legend className="gnf-q-h"><span className="gnf-q-n">{i + 1}</span>{Q[k].q}</legend>
              <div className="gnf-opts">
                {Q[k].a.map((opt) => (
                  <label className={`gnf-opt${pick[k] === opt ? ' on' : ''}`} key={opt}>
                    <input
                      type="radio" name={k} value={opt} checked={pick[k] === opt}
                      onChange={() => setPick((p) => ({ ...p, [k]: opt }))}
                    />
                    <span className="gnf-dot" aria-hidden="true" />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}

          <fieldset className="gnf-q">
            <legend className="gnf-q-h"><span className="gnf-q-n">4</span>Contact information</legend>
            <p className="gnf-q-s">We&rsquo;ll connect with you</p>
            <div className="gnf-fields">
              <label className="gnf-f">
                <span>Full name</span>
                <input type="text" value={f.name} onChange={set('name')} placeholder="Your name" autoComplete="name" required />
              </label>
              <label className="gnf-f">
                <span>Phone number</span>
                <input type="tel" value={f.phone} onChange={set('phone')} placeholder="+91 " autoComplete="tel" required />
              </label>
              <label className="gnf-f">
                <span>Email</span>
                <input type="email" value={f.email} onChange={set('email')} placeholder="you@yourngo.org" autoComplete="email" required />
              </label>
              <label className="gnf-f">
                <span>City</span>
                <input type="text" value={f.city} onChange={set('city')} placeholder="Pune" autoComplete="address-level2" required />
              </label>
            </div>

            <label className="gnf-same">
              <input type="checkbox" checked={sameWa} onChange={(e) => setSameWa(e.target.checked)} />
              <span>My WhatsApp number is the same as my phone number</span>
            </label>
            {!sameWa && (
              <label className="gnf-f gnf-f-wide">
                <span>WhatsApp number</span>
                <input type="tel" value={f.whatsapp} onChange={set('whatsapp')} placeholder="+91 " />
              </label>
            )}
          </fieldset>

          {err && <p className="gnf-err" role="alert">{err}</p>}

          <button type="submit" className="gusa-btn gnf-send" disabled={busy}>
            {busy ? 'Sending…' : 'Send my details →'}
          </button>
          <p className="gnf-fine">
            We never share your details. Prefer to talk first?{' '}
            <a href="https://wa.me/919201958273" target="_blank" rel="noopener noreferrer">WhatsApp +91 92019 58273</a>
          </p>
        </form>
      </div>
    </section>
  );
}
