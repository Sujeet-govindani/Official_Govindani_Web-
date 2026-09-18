import { useState, useEffect } from 'react';
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

export default function LatestWork() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [open]);

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
          <button type="button" className="giwork-btn" onClick={() => setOpen(true)}>Check hundreds more &rarr;</button>
        </div>
      </div>

      {open && (
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
        </div>
      )}
    </section>
  );
}
