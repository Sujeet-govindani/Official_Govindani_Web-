import { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Helmet } from 'react-helmet-async';
import { NGO, ECOM, HEALTH, BUSINESS, OTHERS, ALL, type Work } from '@/data/usaWork';
import '@/styles/usa.css';

/**
 * Dedicated USA landing page (/usa, and intended for usa.govindaniit.com).
 * Standalone: the global site header/bottom-nav are hidden on this route.
 *
 * Flow: an interest popup on arrival (NGO / E-commerce / Both) tailors which
 * offer blocks + work carousels lead. Every "Book" CTA opens the Calendly
 * popup (no cheap inline widget). Carousels auto-scroll; "View all" opens a
 * full grid per category.
 */

const CALENDLY_URL = 'https://calendly.com/sujeet-govindaniit/30min';
const WA = '919201958278';
const R2 = 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images';
const INTEREST_KEY = 'gi_usa_interest';
type Interest = 'ngo' | 'ecommerce' | 'both';

function openCalendly() {
  const C = (window as unknown as { Calendly?: { initPopupWidget: (o: { url: string }) => void } }).Calendly;
  if (C) C.initPopupWidget({ url: CALENDLY_URL });
  else window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer');
}

/* ---- auto-scrolling marquee carousel (pauses on hover) ---- */
function Marquee({ items, onViewAll, label }: { items: Work[]; onViewAll: () => void; label: string }) {
  const loop = [...items, ...items]; // duplicate for seamless scroll
  return (
    <div className="gusa-cat">
      <div className="gusa-cat-head">
        <h3 className="gusa-cat-h">{label}</h3>
        <button type="button" className="gusa-viewall" onClick={onViewAll}>View all &rarr;</button>
      </div>
      <div className="gusa-marquee">
        <div className="gusa-track" style={{ ['--n' as string]: items.length }}>
          {loop.map((w, idx) => (
            <a key={`${w.n}-${idx}`} className="gusa-slide" href={w.u !== '#' ? w.u : undefined}
               target={w.u !== '#' ? '_blank' : undefined} rel="noopener noreferrer" aria-hidden={idx >= items.length}>
              <div className="gusa-shot"><img src={w.i} alt={`${w.n} website by Govindani Infotech`} loading="lazy" /></div>
              <span className="gusa-slide-name">{w.n}{w.u !== '#' && <em> &#8599;</em>}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

const GIVESETU_FEATURES = [
  '100% ownership — zero platform commission on donations',
  'Recurring, one-time, tribute & anonymous donations',
  'Instant 80G / tax receipts, auto-generated PDFs',
  'Peer-to-peer & campaign fundraising with progress bars',
  'Direct donor relationship — full donor data is yours',
  'WhatsApp + SMS + Email donor automation',
  'Transparent accounting, reports & CSR pages',
  'International donations, all major gateways, FCRA-ready',
];
const ECOM_FEATURES = [
  'PayPal, Stripe, Apple Pay & all major cards',
  'Product catalog, cart & secure one-page checkout',
  'Inventory, orders, shipping & tax management',
  'Coupons, offers & abandoned-cart recovery',
  'Mobile-first, lightning-fast, SEO-ready',
  'Analytics, email & marketing integrations',
];

// Rotating trust strip items (icon + label). `meta` styles the ∞ in Meta blue.
const TRUST: { ic: string; t: string; meta?: boolean }[] = [
  { ic: '🇺🇸', t: 'US-registered LLC · Wyoming' },
  { ic: '∞', t: 'Meta Business Partner', meta: true },
  { ic: '✅', t: 'Federal EIN issued' },
  { ic: '🌐', t: '1000+ websites delivered' },
  { ic: '⭐', t: '5.0 average client rating' },
  { ic: '🏆', t: '8+ years building on the web' },
  { ic: '⚡', t: 'Custom-coded — never templates' },
  { ic: '🔒', t: '100% ownership · zero commission' },
  { ic: '💳', t: 'PayPal · Stripe · Apple Pay' },
  { ic: '🕐', t: 'On-time delivery, every time' },
  { ic: '🌍', t: 'US · India · serving worldwide' },
  { ic: '🤝', t: 'A dedicated project manager' },
  { ic: '🎯', t: 'SEO & conversion-first builds' },
  { ic: '💬', t: 'WhatsApp support that replies' },
];

export default function UsaLanding() {
  const [interest, setInterest] = useState<Interest | null>(null);
  const [askInterest, setAskInterest] = useState(false);
  const [viewAll, setViewAll] = useState<{ label: string; items: Work[] } | null>(null);
  const [page, setPage] = useState(0);
  const PER_PAGE = 15;
  const openAll = useCallback((label: string, items: Work[]) => { setViewAll({ label, items }); setPage(0); }, []);

  useEffect(() => {
    // Calendly popup assets
    const css = document.createElement('link');
    css.rel = 'stylesheet'; css.href = 'https://assets.calendly.com/assets/external/widget.css';
    document.head.appendChild(css);
    const s = document.createElement('script');
    s.src = 'https://assets.calendly.com/assets/external/widget.js'; s.async = true;
    document.body.appendChild(s);
    // remembered interest, else ask — but never during prerender (headless =
    // navigator.webdriver), so the popup is not baked into the static HTML as a
    // dead, non-interactive overlay. Real visitors get it client-side.
    let saved: string | null = null;
    try { saved = localStorage.getItem(INTEREST_KEY); } catch { /* private */ }
    const isPrerender = typeof navigator !== 'undefined' && navigator.webdriver;
    if (saved === 'ngo' || saved === 'ecommerce' || saved === 'both') setInterest(saved);
    else if (!isPrerender) setAskInterest(true);
    return () => { css.remove(); s.remove(); };
  }, []);

  const chooseInterest = useCallback((v: Interest) => {
    setInterest(v); setAskInterest(false);
    try { localStorage.setItem(INTEREST_KEY, v); } catch { /* private */ }
  }, []);

  useEffect(() => {
    if (!viewAll && !askInterest) return;
    const prev = document.body.style.overflow; document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setViewAll(null); };
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; document.removeEventListener('keydown', onKey); };
  }, [viewAll, askInterest]);

  const showNGO = interest === 'ngo' || interest === 'both' || interest === null;
  const showEcom = interest === 'ecommerce' || interest === 'both' || interest === null;
  const ngoFirst = interest !== 'ecommerce';

  const NgoBlock = (
    <section className="gusa-offer gusa-offer-ngo" key="ngo-offer">
      <div className="gusa-offer-in">
        <p className="gusa-eyebrow">For NGOs &amp; non-profits &middot; powered by Give Setu</p>
        <h2 className="gusa-h2 gusa-h2-left">Your own donation-ready NGO website<br /><em>from just $1,000</em></h2>
        <p className="gusa-lead">For our US &amp; international clients we provide the <strong>complete advanced Give Setu plan</strong> &mdash; a full fundraising platform you own outright, no crowdfunding commissions, no listing pages.</p>
        <ul className="gusa-ticks">
          {GIVESETU_FEATURES.map((f) => <li key={f}><span className="gusa-tick">&#10003;</span>{f}</li>)}
        </ul>
        <button type="button" className="gusa-btn" onClick={openCalendly}>Get your NGO website &rarr;</button>
      </div>
    </section>
  );
  const EcomBlock = (
    <section className="gusa-offer gusa-offer-ecom" key="ecom-offer">
      <div className="gusa-offer-in">
        <p className="gusa-eyebrow">For online stores &amp; brands</p>
        <h2 className="gusa-h2 gusa-h2-left">A store built to sell worldwide<br /><em>from just $1,000</em></h2>
        <p className="gusa-lead">Custom e-commerce with global checkout &mdash; take payments the way US customers expect.</p>
        <div className="gusa-pay">
          <span>PayPal</span><span>Stripe</span><span>Apple&nbsp;Pay</span><span>Visa</span><span>Mastercard</span>
        </div>
        <ul className="gusa-ticks">
          {ECOM_FEATURES.map((f) => <li key={f}><span className="gusa-tick">&#10003;</span>{f}</li>)}
        </ul>
        <button type="button" className="gusa-btn" onClick={openCalendly}>Build my store &rarr;</button>
      </div>
    </section>
  );

  return (
    <div className="gusa">
      <Helmet>
        <title>US Web, E-commerce &amp; NGO Sites from $1,000 | Govindani Infotech</title>
        <meta name="description" content="US-registered web partner: donation-ready NGO sites (advanced Give Setu plan) and global e-commerce stores from $1,000. Book a free consultation." />
      </Helmet>

      {/* header */}
      <header className="gusa-top">
        <span className="gusa-logo-wrap"><img className="gusa-logo" src={`${R2}/govindanilogo-400w.webp`} alt="Govindani Infotech" /></span>
        <button type="button" className="gusa-top-cta" onClick={openCalendly}>Book a free consultation</button>
      </header>

      {/* hero */}
      <section className="gusa-hero">
        <div className="gusa-hero-in">
          <p className="gusa-eyebrow">US-registered LLC &middot; Wyoming, USA</p>
          <h1 className="gusa-h1">Get your own website<br /><em>from just $1,000</em></h1>
          <p className="gusa-lead">
            Donation-ready NGO platforms and global e-commerce stores &mdash; custom-built end-to-end
            by a US-registered team you can hold accountable.
          </p>
          <div className="gusa-hero-cta">
            <button type="button" className="gusa-btn" onClick={openCalendly}>Book a free consultation &rarr;</button>
            <a className="gusa-btn gusa-btn-ghost" href="#work">See our work</a>
          </div>
        </div>
      </section>

      {/* rotating trust strip */}
      <div className="gusa-trustbar" aria-label="Why teams trust Govindani">
        <div className="gusa-trusttrack" style={{ ['--tn' as string]: TRUST.length }}>
          {[...TRUST, ...TRUST].map((t, i) => (
            <span className="gusa-trustitem" key={`${t.t}-${i}`} aria-hidden={i >= TRUST.length}>
              <span className={`gusa-trustic${t.meta ? ' gusa-metaic' : ''}`}>{t.ic}</span>{t.t}
            </span>
          ))}
        </div>
      </div>

      {/* tailored offer blocks */}
      {ngoFirst ? <>{showNGO && NgoBlock}{showEcom && EcomBlock}</> : <>{showEcom && EcomBlock}{showNGO && NgoBlock}</>}

      {/* work carousels */}
      <section className="gusa-work" id="work">
        <h2 className="gusa-h2">{ALL.length}+ websites &mdash; and counting</h2>
        <p className="gusa-sub">Every site is live and custom-built. Hover to pause &middot; tap &ldquo;View all&rdquo; to page through the full library.</p>
        {(ngoFirst ? [
          showNGO && <Marquee key="ngo" label={`Non-profit & NGO websites (${NGO.length})`} items={NGO.slice(0, 14)} onViewAll={() => openAll('Non-profit & NGO websites', NGO)} />,
          showEcom && <Marquee key="ecom" label={`E-commerce & online stores (${ECOM.length})`} items={ECOM} onViewAll={() => openAll('E-commerce & online stores', ECOM)} />,
        ] : [
          showEcom && <Marquee key="ecom" label={`E-commerce & online stores (${ECOM.length})`} items={ECOM} onViewAll={() => openAll('E-commerce & online stores', ECOM)} />,
          showNGO && <Marquee key="ngo" label={`Non-profit & NGO websites (${NGO.length})`} items={NGO.slice(0, 14)} onViewAll={() => openAll('Non-profit & NGO websites', NGO)} />,
        ])}
        <Marquee label={`Healthcare & clinics (${HEALTH.length})`} items={HEALTH} onViewAll={() => openAll('Healthcare & clinics', HEALTH)} />
        <Marquee label={`Business & corporate (${BUSINESS.length})`} items={BUSINESS} onViewAll={() => openAll('Business & corporate', BUSINESS)} />
        <Marquee label={`Real estate, hospitality & more (${OTHERS.length})`} items={OTHERS} onViewAll={() => openAll('Real estate, hospitality & more', OTHERS)} />

        <div className="gusa-allbanner">
          <div>
            <h3>Explore all {ALL.length}+ websites we&rsquo;ve built</h3>
            <p>NGOs, online stores, clinics, real estate, corporates &amp; more &mdash; one library.</p>
          </div>
          <button type="button" className="gusa-btn" onClick={() => openAll(`All our websites`, ALL)}>Browse all {ALL.length}+ &rarr;</button>
        </div>
      </section>

      {/* legal / registration */}
      <section className="gusa-legal">
        <div className="gusa-legal-in">
          <div className="gusa-legal-copy">
            <p className="gusa-eyebrow">Registered &amp; accountable</p>
            <h2 className="gusa-h2 gusa-h2-left">A US-registered company you can trust</h2>
            <p className="gusa-lead">Govindani Infotech LLC is registered with the Wyoming Secretary of State and holds a US federal EIN &mdash; so you work with a legally accountable partner for contracts, invoicing and support.</p>
            <p className="gusa-addr">&#128205; 30 N Gould St, Ste N, Sheridan, WY 82801, USA</p>
          </div>
          <div className="gusa-legal-docs">
            <figure className="gusa-doc">
              <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/USA/wy-articles-of-organization.jpg" alt="Wyoming Articles of Organization — Govindani Infotech LLC" loading="lazy" />
              <figcaption>Articles of Organization &middot; Wyoming Secretary of State<br /><span>Public filing ID 2025-001850382</span></figcaption>
            </figure>
            <div className="gusa-doc-badges">
              <div className="gusa-badge-card"><span className="gusa-badge-ic">&#127482;&#127480;</span><div><h4>Registered US LLC</h4><p>Govindani Infotech LLC &middot; Wyoming, USA</p></div></div>
              <div className="gusa-badge-card"><span className="gusa-badge-ic">&#10003;</span><div><h4>Federal EIN issued</h4><p>Registered with the IRS for US tax &amp; banking</p></div></div>
              <div className="gusa-badge-card"><span className="gusa-badge-ic">&#128196;</span><div><h4>Full papers on request</h4><p>Operating agreement &amp; compliance docs shared during onboarding</p></div></div>
            </div>
          </div>
        </div>
      </section>

      {/* thanks */}
      <section className="gusa-thanks">
        <h2 className="gusa-h2">Thank you for trusting us</h2>
        <p className="gusa-lead gusa-center">Every brand on this page put their vision in our hands &mdash; and we delivered. We&rsquo;d be honored to do the same for you.</p>
        <button type="button" className="gusa-btn" onClick={openCalendly} style={{ marginTop: '22px' }}>Book your free consultation &rarr;</button>
      </section>

      {/* footer — one clean footer, both addresses */}
      <footer className="gusa-foot">
        <div className="gusa-foot-in">
          <div className="gusa-foot-brand">
            <img className="gusa-logo" src={`${R2}/govindanilogo-400w.webp`} alt="Govindani Infotech" />
            <p>Websites, e-commerce &amp; social media for businesses and non-profits worldwide.</p>
          </div>
          <div className="gusa-foot-addr">
            <h5>&#127482;&#127480; United States</h5>
            <p>Govindani Infotech LLC<br />30 N Gould St, Ste N<br />Sheridan, WY 82801</p>
          </div>
          <div className="gusa-foot-addr">
            <h5>&#127470;&#127475; India</h5>
            <p>Govindani Infotech Pvt. Ltd.<br />2nd Floor, Landmark Plaza, 206<br />Satara Rd, Pune, MH 411009</p>
          </div>
          <div className="gusa-foot-addr">
            <h5>Talk to us</h5>
            <p><a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer">WhatsApp: +91 92019 58278</a><br />
            <button type="button" className="gusa-foot-link" onClick={openCalendly}>Book a consultation</button></p>
          </div>
        </div>
        <p className="gusa-foot-sm">&copy; {new Date().getFullYear()} Govindani Infotech. All rights reserved.</p>
      </footer>

      {/* mobile sticky book bar */}
      <div className="gusa-sticky">
        <a className="gusa-sticky-wa" href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">&#128172;</a>
        <button type="button" className="gusa-sticky-book" onClick={openCalendly}>Book a free consultation</button>
      </div>

      {/* interest popup */}
      {askInterest && typeof document !== 'undefined' && createPortal(
        <div className="gusa-modal" role="dialog" aria-modal="true" aria-label="What are you interested in">
          <div className="gusa-modal-back"></div>
          <div className="gusa-modal-panel gusa-interest">
            <p className="gusa-eyebrow">Welcome &#128075;</p>
            <h3 className="gusa-modal-h">What can we build for you?</h3>
            <p className="gusa-modal-note">Pick one so we show you the most relevant work &amp; pricing.</p>
            <div className="gusa-interest-grid">
              <button type="button" onClick={() => chooseInterest('ngo')}><span>&#127757;</span>NGO / Non-profit website</button>
              <button type="button" onClick={() => chooseInterest('ecommerce')}><span>&#128722;</span>E-commerce / Online store</button>
              <button type="button" onClick={() => chooseInterest('both')}><span>&#10024;</span>Both / Just exploring</button>
            </div>
          </div>
        </div>,
        document.body,
      )}

      {/* view-all grid modal */}
      {viewAll && typeof document !== 'undefined' && createPortal(
        <div className="gusa-modal" role="dialog" aria-modal="true" aria-label={viewAll.label}>
          <div className="gusa-modal-back" onClick={() => setViewAll(null)}></div>
          <div className="gusa-modal-panel gusa-allpanel">
            <div className="gusa-all-head">
              <h3 className="gusa-modal-h">{viewAll.label} <span>({viewAll.items.length})</span></h3>
              <button type="button" className="gusa-x" onClick={() => setViewAll(null)} aria-label="Close">&#10005;</button>
            </div>
            <div className="gusa-all-grid">
              {viewAll.items.slice(page * PER_PAGE, (page + 1) * PER_PAGE).map((w) => (
                <a key={`${w.n}-${w.u}`} className="gusa-slide" href={w.u !== '#' ? w.u : undefined} target={w.u !== '#' ? '_blank' : undefined} rel="noopener noreferrer">
                  <div className="gusa-shot"><img src={w.i} alt={w.n} loading="lazy" /></div>
                  <span className="gusa-slide-name">{w.n}{w.u !== '#' && <em> &#8599;</em>}</span>
                </a>
              ))}
            </div>
            {viewAll.items.length > PER_PAGE && (() => {
              const pages = Math.ceil(viewAll.items.length / PER_PAGE);
              return (
                <div className="gusa-pager">
                  <button type="button" onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}>&larr; Prev</button>
                  <span className="gusa-pager-info">Page {page + 1} of {pages}</span>
                  <button type="button" onClick={() => setPage((p) => Math.min(pages - 1, p + 1))} disabled={page >= pages - 1}>Next &rarr;</button>
                </div>
              );
            })()}
            <div className="gusa-all-cta"><button type="button" className="gusa-btn" onClick={openCalendly}>Get a website like these &rarr;</button></div>
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
}
