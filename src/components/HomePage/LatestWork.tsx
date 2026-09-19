import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import '@/styles/latest-work.css';

/**
 * "Check out our latest websites" — homepage showcase of three custom-built
 * live sites. Each card shows the full site screenshot, panning top→bottom on
 * hover, and links to the live site. "Check hundreds more" opens a category
 * popup (the golden badges) right here — no page navigation — from which the
 * visitor jumps into any category's portfolio.
 */
const R2 = 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images';

const WORKS = [
  { name: 'Baba Ji Ki Buti', category: 'E-Commerce', url: 'https://babajikibuti.com/home', img: '/images/latest-work/babaji.jpg' },
  { name: 'Tarush Pranaa', category: 'Business Website', url: 'https://tarushpranaa.com', img: '/images/latest-work/tarush.jpg' },
  { name: 'Mahipatsinh Foundation', category: 'NGO & Donations', url: 'https://mahipatsinhfoundation.org', img: '/images/latest-work/mahipat.jpg' },
];

const CATEGORIES = [
  { title: 'NGO', img: `${R2}/ngoicon.webp`, to: '/portfolio/ngo' },
  { title: 'Real Estate', img: `${R2}/REICON.webp`, to: '/portfolio/builders' },
  { title: 'E-Commerce', img: `${R2}/ECOMMERCEICON.webp`, to: '/portfolio/ecommerce' },
  { title: 'Healthcare', img: `${R2}/HEALTHCAREICON.webp`, to: '/portfolio/healthcare' },
  { title: 'Business Websites', img: `${R2}/BWICON.webp`, to: '/portfolio/business' },
  { title: 'Hospitality', img: `${R2}/RESTOICON.webp`, to: '/portfolio/hospitality' },
];

const WA_NUMBER = '919201958278';
// Once a visitor submits the lead form ANYWHERE on the site, this flag unlocks
// every gated portfolio entry point so they are never asked to fill it again.
const LEAD_KEY = 'gi_lead_unlocked';

export default function LatestWork() {
  const [open, setOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', kind: 'NGO / Non-profit', detail: '' });

  useEffect(() => {
    try { if (localStorage.getItem(LEAD_KEY) === '1') setUnlocked(true); } catch { /* private mode */ }
  }, []);

  useEffect(() => {
    const anyOpen = open || formOpen;
    if (!anyOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); setFormOpen(false); } };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [open, formOpen]);

  // Gate: if they've filled the form before, open the portfolio straight away;
  // otherwise show the lead form first.
  const openPortfolio = () => {
    if (unlocked) setOpen(true);
    else setFormOpen(true);
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const msg =
      `Hi Govindani Infotech! I'd like a website like the ones in your portfolio.%0A%0A` +
      `Name: ${encodeURIComponent(form.name)}%0A` +
      `Phone: ${encodeURIComponent(form.phone)}%0A` +
      `Type: ${encodeURIComponent(form.kind)}%0A` +
      `Details: ${encodeURIComponent(form.detail)}`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank', 'noopener,noreferrer');
    try { localStorage.setItem(LEAD_KEY, '1'); localStorage.setItem('gi_lead_info', JSON.stringify(form)); } catch { /* private mode */ }
    setUnlocked(true);       // remembered — never gate this visitor again
    setFormOpen(false);
    setOpen(true);           // reveal the full portfolio options right away
  };

  return (
    <section className="giwork" aria-labelledby="giwork-h">
      <div className="giwork-wrap">
        <header className="giwork-head">
          <p className="giwork-eyebrow">Custom coded · Custom developed</p>
          <h2 id="giwork-h" className="giwork-h">Check out our <em>latest websites</em></h2>
          <p className="giwork-sub">Real, live builds &mdash; each one custom-engineered to the client&rsquo;s own requirement, not a template. Hover to scroll through the site.</p>
        </header>

        <div className="giwork-grid">
          {WORKS.map((w) => (
            <a key={w.name} className="giwork-card" href={w.url} target="_blank" rel="noopener noreferrer">
              <img src={w.img} alt={`${w.name} website built by Govindani Infotech`} loading="lazy" />
              <span className="giwork-veil" aria-hidden="true"></span>
              <span className="giwork-cat">{w.category}</span>
              <span className="giwork-info">
                <span className="giwork-name">{w.name}</span>
                <span className="giwork-tag">✦ Custom coded &amp; developed</span>
                <span className="giwork-visit">Visit live site &#8599;</span>
              </span>
            </a>
          ))}
        </div>

        <div className="giwork-more">
          <button type="button" className="giwork-btn" onClick={openPortfolio}>View more &amp; get yours &rarr;</button>
        </div>
      </div>

      {open && typeof document !== 'undefined' && createPortal(
        <div className="giwork-modal" role="dialog" aria-modal="true" aria-label="Website portfolio categories">
          <div className="giwork-modal-back" onClick={() => setOpen(false)}></div>
          <div className="giwork-modal-panel">
            <div className="giwork-modal-head">
              <div>
                <p className="giwork-modal-title">Website Portfolio · Click to explore</p>
                <h3 className="giwork-modal-h">Explore our work by category</h3>
              </div>
              <button type="button" className="giwork-x" onClick={() => setOpen(false)} aria-label="Close">&#10005;</button>
            </div>
            <div className="giwork-badges">
              {CATEGORIES.map((c) => (
                <Link key={c.title} className="giwork-badge" to={c.to} onClick={() => setOpen(false)}>
                  <img src={c.img} alt={c.title} loading="lazy" />
                  <span>{c.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>,
        document.body,
      )}

      {formOpen && typeof document !== 'undefined' && createPortal(
        <div className="giwork-modal" role="dialog" aria-modal="true" aria-label="Request a website">
          <div className="giwork-modal-back" onClick={() => setFormOpen(false)}></div>
          <div className="giwork-modal-panel giwork-formpanel">
            <button type="button" className="giwork-x" onClick={() => setFormOpen(false)} aria-label="Close">&#10005;</button>
            <p className="giwork-modal-title">One quick step</p>
            <h3 className="giwork-modal-h">Unlock our full portfolio</h3>
            <p className="giwork-form-note">Tell us a little about you &mdash; we&rsquo;ll open all our work instantly and take your requirement forward on WhatsApp. <strong>Just once</strong>, we won&rsquo;t ask again.</p>
            <form className="giwork-form" onSubmit={submitForm}>
              <label className="giwork-field">
                <span>Your name</span>
                <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Rahul Sharma" />
              </label>
              <label className="giwork-field">
                <span>WhatsApp number</span>
                <input type="tel" required pattern="[0-9+ ]{8,15}" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="e.g. 98765 43210" />
              </label>
              <label className="giwork-field">
                <span>What kind of website?</span>
                <select value={form.kind} onChange={(e) => setForm({ ...form, kind: e.target.value })}>
                  <option>NGO / Non-profit</option>
                  <option>E-Commerce / Store</option>
                  <option>Business / Corporate</option>
                  <option>Healthcare / Clinic</option>
                  <option>Real Estate</option>
                  <option>Other</option>
                </select>
              </label>
              <label className="giwork-field">
                <span>Anything specific? (optional)</span>
                <textarea rows={2} value={form.detail} onChange={(e) => setForm({ ...form, detail: e.target.value })} placeholder="Pages, features, references&hellip;"></textarea>
              </label>
              <button type="submit" className="giwork-btn giwork-form-submit">Unlock portfolio &amp; continue &rarr;</button>
            </form>
          </div>
        </div>,
        document.body,
      )}
    </section>
  );
}
