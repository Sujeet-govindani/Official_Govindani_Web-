import { useEffect, useState, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Helmet } from 'react-helmet-async';
import { NGO, ECOM, HEALTH, BUSINESS, OTHERS, ALL, US_NGO, type Work } from '@/data/usaWork';
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
const WA = '919201958273';
const R2 = 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images';
const INTEREST_KEY = 'gi_usa_interest';
type Interest = 'ngo' | 'ecommerce' | 'both';

// On touch devices a single tap just "interacts" (no navigation); a double tap
// visits the site. On desktop, a normal click navigates. Prevents accidental
// redirects and lets people preview the auto-scrolling screenshot first.
function cardTap(e: React.MouseEvent<HTMLAnchorElement>) {
  const a = e.currentTarget;
  const href = a.getAttribute('href');
  if (!href) { e.preventDefault(); return; }
  const touch = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;
  if (!touch) return; // desktop: normal navigation
  e.preventDefault();
  const now = Date.now();
  const last = Number(a.dataset.lt || 0);
  if (now - last < 550) {
    window.open(href, '_blank', 'noopener,noreferrer');
    a.dataset.lt = '0'; a.classList.remove('gusa-tapped');
  } else {
    a.dataset.lt = String(now);
    a.classList.add('gusa-tapped');
    window.setTimeout(() => a.classList.remove('gusa-tapped'), 1600);
  }
}

// All "Book" CTAs open the Calendly popup (fast, no long scroll to a far-down form).
function openCalendly() {
  const C = (window as unknown as { Calendly?: { initPopupWidget: (o: { url: string }) => void } }).Calendly;
  if (C) C.initPopupWidget({ url: CALENDLY_URL });
  else window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer');
}

/* ---- auto-scrolling marquee carousel (pauses on hover) ---- */
function Marquee({ items, onViewAll, label }: { items: Work[]; onViewAll: () => void; label: string }) {
  const loop = [...items, ...items]; // duplicate for seamless loop
  const ref = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });

  // Auto-scroll + finger/mouse drag. Native overflow-x gives touch swipe; a
  // pointer handler adds mouse drag on desktop. Auto-scroll pauses on interaction.
  useEffect(() => {
    const el = ref.current; if (!el) return;
    let raf = 0;
    const step = () => {
      if (!paused.current && el.scrollWidth > el.clientWidth + 4) {
        el.scrollLeft += 0.5;
        if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft -= el.scrollWidth / 2;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onEnter = () => { paused.current = true; };
  const onLeave = () => { paused.current = false; drag.current.active = false; };
  const onDown = (e: React.PointerEvent) => {
    paused.current = true;
    if (e.pointerType === 'mouse') drag.current = { active: true, startX: e.clientX, startScroll: ref.current!.scrollLeft, moved: false };
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    ref.current!.scrollLeft = drag.current.startScroll - dx;
  };
  const onUp = () => { drag.current.active = false; setTimeout(() => { paused.current = false; }, 600); };
  // prevent a drag from also triggering the card link
  const onClickCapture = (e: React.MouseEvent) => { if (drag.current.moved) { e.preventDefault(); e.stopPropagation(); drag.current.moved = false; } };

  return (
    <div className="gusa-cat">
      <div className="gusa-cat-head">
        <h3 className="gusa-cat-h">{label}</h3>
        <button type="button" className="gusa-viewall" onClick={onViewAll}>View all &rarr;</button>
      </div>
      <div className="gusa-marquee" ref={ref}
           onMouseEnter={onEnter} onMouseLeave={onLeave}
           onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}
           onClickCapture={onClickCapture}>
        <div className="gusa-track">
          {loop.map((w, idx) => (
            <a key={`${w.n}-${idx}`} className="gusa-slide" href={w.u !== '#' ? w.u : undefined} onClick={cardTap}
               target={w.u !== '#' ? '_blank' : undefined} rel="noopener noreferrer" aria-hidden={idx >= items.length} draggable={false}>
              <div className="gusa-shot"><img src={w.i} alt={`${w.n} website by Govindani Infotech`} loading="lazy" draggable={false} /><span className="gusa-taphint" aria-hidden="true">👆 Double-tap to visit</span></div>
              <span className="gusa-slide-name">{w.n}{w.u !== '#' && <em> &#8599;</em>}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// The advanced Give Setu plan — full power (no starter/growth comparison).
const NGO_POWER: [string, string[]][] = [
  ['Your own platform', ['A fully custom-coded website & donor platform — built for you, yours to own', 'Zero platform commission on donations, forever', 'Beautiful donor & member portals under your own brand']],
  ['Donors & giving', ['Track unlimited donors — active, recurring and lapsed', 'One-time, recurring, tribute & anonymous giving', 'Recurring-donor self-service — donors manage their own gifts']],
  ['Tax receipts — US & India', ['Automatic IRS tax-deductible receipts for your US donors', '80G certificates for your Indian donors', 'Instant PDFs, year-end statements & immutable records']],
  ['Memberships & campaigns', ['Build membership tiers & plans for your community', 'Unlimited live cases & fundraising campaigns', 'Our team designs & builds fresh campaign cases for you every month']],
  ['Marketing on autopilot', ['Create high-converting campaigns with AI in seconds', 'WhatsApp, email & SMS donor journeys — done for you', 'AI insights that tell you who to thank, nudge & re-engage']],
  ['US compliance, built in', ['IRS Form 990 export & Schedule B contributor disclosure', 'Written acknowledgments ($250+) & quid-pro-quo statements ($75+)', 'Form 8283 non-cash gifts & audit-ready trail — India 10BD / 10BE too']],
  ['Enterprise-grade & yours', ['Multiple payment gateways with automatic failover', 'Developer API & webhooks · generous media storage', 'Custom admin roles, priority support & a dedicated CA / auditor seat']],
];
// Complete e-commerce functionality set (54 functions), grouped.
const ECOM_POWER: [string, string[]][] = [
  ['🛒 Store & catalogue', ['Catalogue with categories, filters, search & sorting', 'Product pages — images, variants, stock status, reviews', 'Inventory & stock management with low-stock email alerts', 'Auto out-of-stock badges']],
  ['💳 Checkout & payments', ['Razorpay / Cashfree / Stripe — UPI, cards, net-banking, wallets', 'Partial COD with configurable ratio per product/category', 'Cart with coupons, quantity update & order review', 'Order confirmation / thank-you screen']],
  ['📦 Order management', ['Admin order dashboard — view, filter, process, hold, cancel', 'Real-time tracking: Confirmed → Packed → Shipped → Out for delivery → Delivered', 'Return & refund management with gateway refunds', 'Full audit trail on every order']],
  ['📧 Email automation', ['9 automated emails — placed, paid, processed, shipped, out-for-delivery, delivered, cancelled, refund initiated & completed', 'Professional SMTP (not server mail)']],
  ['🎟️ Coupons & marketing', ['Unlimited coupons — %, flat, free-shipping, product/cart/first-order/user-specific', 'Flash sales · BOGO · referral codes · loyalty points', 'Sales analytics — revenue, top products, coupon performance']],
  ['👤 Customer dashboard', ['Account with order history & tracking links', 'Address book · downloadable invoices · wishlist', 'Loyalty points balance']],
  ['⚙️ Admin panel', ['Product, category & attribute management + bulk update', 'Order fulfilment, inventory, coupons & discounts', 'Sales reports · customer management · multi-admin roles']],
  ['🔧 Technical', ['Mobile responsive · cross-browser · SSL/HTTPS', 'Speed-optimised (lazy load, caching, image compression)', 'SEO — meta, Open Graph, XML sitemap · Google Analytics · WhatsApp chat widget']],
];
// "On us" value props — the big reasons to say yes
const NGO_INCLUDED = [
  ['🎁', '100% custom-coded website', 'Yours for a lifetime, free — you only pay the subscription'],
  ['🌐', 'Hosting is on us', 'Premium hosting handled for you, every year'],
  ['🛠️', '1 full year of maintenance', 'Updates, fixes & support — on us'],
  ['✉️', 'Marketing emails on us', 'Donor campaigns set up and sent for you'],
  ['💬', 'Dedicated WhatsApp integration', 'Reach donors where they actually reply'],
  ['🧾', 'US + India tax compliance', 'IRS-ready records for the US · 80G / 10BD-10BE for India — built in'],
];
const ECOM_INCLUDED = [
  ['🧾', 'WhatsApp receipts to customers', 'Every order confirmed instantly on WhatsApp'],
  ['📸', 'Professional product shoots', 'We shoot & retouch your catalog'],
  ['🎨', 'Design, layouts & USP', 'Store design, sections and positioning done for you'],
  ['📈', 'Marketing & performance ads', 'We drive traffic that converts — Meta Business Partner'],
  ['🛒', 'Custom-coded or Shopify', 'Baba Ji Ki Buti & Tarush (custom) · Gllora (Shopify)'],
  ['🔑', '100% the website is yours', 'Full ownership, full data, no lock-in'],
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
  // Library is permanent (never closes) — defaults to the full ALL list; category
  // "View all" buttons just swap which set it shows.
  const [viewAll, setViewAll] = useState<{ label: string; items: Work[] }>({ label: 'All our websites', items: ALL });
  const STEP = 15;
  const [shown, setShown] = useState(STEP);
  const feedRef = useRef<HTMLDivElement>(null);
  const openAll = useCallback((label: string, items: Work[]) => {
    setViewAll({ label, items }); setShown(STEP);
    setTimeout(() => document.getElementById('gusa-lib')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 70);
  }, []);

  // auto-feed: reveal more cards as the sentinel scrolls into view (no pages, no gaps)
  useEffect(() => {
    const el = feedRef.current; if (!el) return;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) setShown((s) => Math.min(viewAll.items.length, s + STEP));
    }, { rootMargin: '600px' });
    io.observe(el);
    return () => io.disconnect();
  }, [viewAll, shown]);

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
    // Only the interest popup locks scroll; the library is inline, not a modal.
    if (!askInterest) return;
    const prev = document.body.style.overflow; document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [askInterest]);

  const showNGO = interest === 'ngo' || interest === 'both' || interest === null;
  const showEcom = interest === 'ecommerce' || interest === 'both' || interest === null;
  const ngoFirst = interest !== 'ecommerce';

  const NgoBlock = (
    <section className="gusa-offer gusa-offer-ngo" key="ngo-offer">
      <div className="gusa-offer-in">
        <p className="gusa-eyebrow">For NGOs &amp; non-profits &middot; powered by Give Setu</p>
        <h2 className="gusa-h2 gusa-h2-left">Your own donation-ready NGO website<br /><em>from just $1,000</em></h2>
        <p className="gusa-lead">For our US &amp; international clients we provide the <strong>complete advanced Give Setu plan</strong> &mdash; a full fundraising platform you own outright, no crowdfunding commissions, no listing pages.</p>
        <div className="gusa-pwr-grid">
          {NGO_POWER.map(([group, items]) => (
            <div className="gusa-pwr" key={group}>
              <h4 className="gusa-pwr-h">{group}</h4>
              <ul className="gusa-ticks gusa-ticks-1">{items.map((f) => <li key={f}><span className="gusa-tick">&#10003;</span>{f}</li>)}</ul>
            </div>
          ))}
        </div>
        <p className="gusa-incl-head">Everything below is <em>on us</em> &mdash; you just run your cause</p>
        <div className="gusa-incl">
          {NGO_INCLUDED.map(([ic, t, d]) => (
            <div className="gusa-incl-card" key={t}><span className="gusa-incl-ic">{ic}</span><div><h4>{t}</h4><p>{d}</p></div></div>
          ))}
        </div>
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
        <div className="gusa-pwr-grid">
          {ECOM_POWER.map(([group, items]) => (
            <div className="gusa-pwr" key={group}>
              <h4 className="gusa-pwr-h">{group}</h4>
              <ul className="gusa-ticks gusa-ticks-1">{items.map((f) => <li key={f}><span className="gusa-tick">&#10003;</span>{f}</li>)}</ul>
            </div>
          ))}
        </div>
        <p className="gusa-incl-head">Done-for-you, end to end &mdash; <em>we handle all of it</em></p>
        <div className="gusa-incl">
          {ECOM_INCLUDED.map(([ic, t, d]) => (
            <div className="gusa-incl-card" key={t}><span className="gusa-incl-ic">{ic}</span><div><h4>{t}</h4><p>{d}</p></div></div>
          ))}
        </div>
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

      {/* header comes from the global site nav (full site, so visitors can explore everything) */}

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

      {/* interest switch — one-click toggle between tailored experiences */}
      <div className="gusa-switch">
        <span className="gusa-switch-label">I&rsquo;m here for:</span>
        <div className="gusa-switch-btns">
          <button type="button" className={interest === 'ngo' ? 'on' : ''} onClick={() => chooseInterest('ngo')}>NGO / Non-profit</button>
          <button type="button" className={interest === 'ecommerce' ? 'on' : ''} onClick={() => chooseInterest('ecommerce')}>E-commerce</button>
          <button type="button" className={interest === 'both' || interest === null ? 'on' : ''} onClick={() => chooseInterest('both')}>Explore both</button>
        </div>
      </div>

      {/* featured top 3 — tailored to interest */}
      {showNGO && (
        <section className="gusa-usngo">
          <div className="gusa-usngo-in">
            <p className="gusa-eyebrow">&#127482;&#127480; Top 3 &middot; Trusted by US non-profits</p>
            <h2 className="gusa-h2">The best NGO sites we&rsquo;ve built &mdash; including a 501(c)(3)</h2>
            <p className="gusa-sub">Real donation-ready websites for non-profits registered in the United States.</p>
            <div className="gusa-usngo-grid">
              {US_NGO.map((w) => (
                <a key={w.n} className="gusa-usngo-card" href={w.u} onClick={cardTap} target="_blank" rel="noopener noreferrer">
                  <div className="gusa-usngo-shot"><img src={w.i} alt={`${w.n} — US NGO website by Govindani Infotech`} loading="lazy" /><span className="gusa-taphint" aria-hidden="true">👆 Double-tap to visit</span></div>
                  <span className="gusa-usngo-name">{w.n} <em>&#8599;</em></span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
      {showEcom && (
        <section className="gusa-usngo">
          <div className="gusa-usngo-in">
            <p className="gusa-eyebrow">&#128722; Top 3 &middot; Stores we&rsquo;re proud of</p>
            <h2 className="gusa-h2">The best online stores we&rsquo;ve built</h2>
            <p className="gusa-sub">End-to-end e-commerce &mdash; custom-coded &amp; Shopify &mdash; built to sell.</p>
            <div className="gusa-usngo-grid">
              {[ECOM[0], ECOM[1], ECOM[3]].map((w) => (
                <a key={w.n} className="gusa-usngo-card" href={w.u !== '#' ? w.u : undefined} onClick={cardTap} target={w.u !== '#' ? '_blank' : undefined} rel="noopener noreferrer">
                  <div className="gusa-usngo-shot"><img src={w.i} alt={`${w.n} — e-commerce website by Govindani Infotech`} loading="lazy" /><span className="gusa-taphint" aria-hidden="true">👆 Double-tap to visit</span></div>
                  <span className="gusa-usngo-name">{w.n}{w.u !== '#' && <em> &#8599;</em>}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 2 — one agency, everything you need */}
      <section className="gusa-services">
        <h2 className="gusa-h2">One agency. Everything you need.</h2>
        <p className="gusa-sub">We don&rsquo;t just build the website &mdash; we run the whole growth engine for you.</p>
        <div className="gusa-svc-grid">
          {[
            ['💻', 'Website & e-commerce', 'Custom-coded, Shopify & WordPress'],
            ['📱', 'Social media management', 'Content, calendars & community'],
            ['🎯', 'Performance marketing', 'Meta & Google ads that convert'],
            ['🎨', 'Logo & graphic design', 'Brand identity & creatives'],
            ['📸', 'Product & brand shoots', 'Studio-grade visuals'],
            ['🤝', 'A team that owns it', 'One dedicated partner, end to end'],
          ].map(([ic, t, d]) => (
            <div className="gusa-svc" key={t}><span className="gusa-svc-ic">{ic}</span><h3>{t}</h3><p>{d}</p></div>
          ))}
        </div>
      </section>

      {/* 3 — 1000+ websites & counting (stat band) */}
      <section className="gusa-stat">
        <div className="gusa-stat-in">
          <p className="gusa-stat-num">1000+</p>
          <h2 className="gusa-h2">websites built &mdash; and counting</h2>
          <p className="gusa-sub">Live, custom-built websites for causes and brands across the US, India and the world.</p>
          <button type="button" className="gusa-btn" onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>See our work &darr;</button>
        </div>
      </section>

      {/* 4 — Birla legacy + Meta official partner */}
      <section className="gusa-birla">
        <div className="gusa-birla-in">
          <div className="gusa-cred-logos">
            <img className="gusa-birla-logo" src={`${R2}/partners/birla-open-minds-mark.svg`} alt="Birla Open Minds" loading="lazy" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
            <img className="gusa-meta-logo" src={`${R2}/partners/meta-partner-badge-dark.png`} alt="Meta Business Partner" loading="lazy" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
          </div>
          <p className="gusa-eyebrow">Trusted by a Birla-legacy institution &middot; Official Meta Business Partner</p>
          <h2 className="gusa-h2">The team behind <em>Birla Open Minds</em> &mdash; and a Meta-recognised partner</h2>
          <p className="gusa-lead gusa-center">Birla Open Minds is part of the storied Birla legacy &mdash; <strong>250+ schools across India</strong> and a globally respected name in education &mdash; and they trust Govindani to build and power their digital world. We&rsquo;re also an <strong>official Meta Business Partner</strong>, vetted by Meta itself to run your ads and growth.</p>
        </div>
      </section>

      {/* 5 — our functionalities (tailored offer blocks) */}
      {ngoFirst ? <>{showNGO && NgoBlock}{showEcom && EcomBlock}</> : <>{showEcom && EcomBlock}{showNGO && NgoBlock}</>}

      {/* 6 — other projects (work carousels + library) */}
      <section className="gusa-work" id="work">
        <h2 className="gusa-h2">Explore more of our work</h2>
        <p className="gusa-sub">Every site is live and custom-built. Drag or swipe to browse &middot; tap &ldquo;View all&rdquo; for the full library.</p>
        {(ngoFirst ? [
          showNGO && <Marquee key="ngo" label={`Non-profit & NGO websites (${NGO.length})`} items={NGO.slice(0, 14)} onViewAll={() => openAll('Non-profit & NGO websites', NGO)} />,
          showEcom && <Marquee key="ecom" label={`E-commerce & online stores (${ECOM.length})`} items={ECOM} onViewAll={() => openAll('E-commerce & online stores', ECOM)} />,
        ] : [
          showEcom && <Marquee key="ecom" label={`E-commerce & online stores (${ECOM.length})`} items={ECOM} onViewAll={() => openAll('E-commerce & online stores', ECOM)} />,
          showNGO && <Marquee key="ngo" label={`Non-profit & NGO websites (${NGO.length})`} items={NGO.slice(0, 14)} onViewAll={() => openAll('Non-profit & NGO websites', NGO)} />,
        ])}
        {showEcom && <Marquee label={`Business & corporate (${BUSINESS.length})`} items={BUSINESS} onViewAll={() => openAll('Business & corporate', BUSINESS)} />}
        {interest === 'both' && <Marquee label={`Healthcare & clinics (${HEALTH.length})`} items={HEALTH} onViewAll={() => openAll('Healthcare & clinics', HEALTH)} />}
        {interest === 'both' && <Marquee label={`Real estate, hospitality & more (${OTHERS.length})`} items={OTHERS} onViewAll={() => openAll('Real estate, hospitality & more', OTHERS)} />}

        <div className="gusa-allbanner">
          <div>
            <h3>1000+ websites built &mdash; explore the library</h3>
            <p>NGOs, online stores, clinics, real estate, corporates &amp; more &mdash; a sample of what we&rsquo;ve delivered.</p>
          </div>
          <button type="button" className="gusa-btn" onClick={() => openAll(`Our work`, ALL)}>Browse our work &rarr;</button>
        </div>

        {/* inline library — auto-feeds more as you scroll (no pages, no gaps) */}
        <div className="gusa-lib" id="gusa-lib">
          <div className="gusa-lib-head">
            <h3 className="gusa-h2 gusa-h2-left">{viewAll.label} <span className="gusa-lib-count">(showing {Math.min(shown, viewAll.items.length)} of {viewAll.items.length})</span></h3>
          </div>
          <div className="gusa-lib-grid">
            {viewAll.items.slice(0, shown).map((w) => (
              <a key={`${w.n}-${w.u}`} className="gusa-slide" href={w.u !== '#' ? w.u : undefined} onClick={cardTap} target={w.u !== '#' ? '_blank' : undefined} rel="noopener noreferrer">
                <div className="gusa-shot"><img src={w.i} alt={w.n} loading="lazy" /><span className="gusa-taphint" aria-hidden="true">👆 Double-tap to visit</span></div>
                <span className="gusa-slide-name">{w.n}{w.u !== '#' && <em> &#8599;</em>}</span>
              </a>
            ))}
          </div>
          {shown < viewAll.items.length && (
            <div className="gusa-feed" ref={feedRef}>
              <button type="button" className="gusa-btn gusa-btn-ghost" onClick={() => setShown((s) => Math.min(viewAll.items.length, s + STEP))}>Load more websites &darr;</button>
            </div>
          )}
          <div className="gusa-all-cta"><button type="button" className="gusa-btn" onClick={openCalendly}>Get a website like these &rarr;</button></div>
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
        <p className="gusa-usline gusa-usline-dark">&#127482;&#127480; A US-registered company &middot; Sheridan, Wyoming &middot; serving businesses & non-profits across America</p>
        <button type="button" className="gusa-btn" onClick={openCalendly} style={{ marginTop: '22px' }}>Book your free consultation &rarr;</button>
      </section>

      {/* inline booking — Calendly embedded directly in the page (no popup) */}
      <section className="gusa-book" id="book">
        <h2 className="gusa-h2">Book your free consultation</h2>
        <p className="gusa-sub">Pick a time that works for you &mdash; it&rsquo;s booked instantly, right here.</p>
        <p className="gusa-usline">&#127482;&#127480; Govindani Infotech LLC &middot; 30 N Gould St, Ste N, Sheridan, WY 82801 &middot; serving all 50 states</p>
        <div className="gusa-book-frame">
          <div className="calendly-inline-widget" data-url={`${CALENDLY_URL}?hide_gdpr_banner=1&background_color=fffdf8&primary_color=b8860b`} style={{ minWidth: '320px', height: '720px' }} />
        </div>
        <p className="gusa-book-fallback">Prefer to talk first? WhatsApp us at{' '}
          <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer">+91 92019 58273</a>.</p>
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
            <p><a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer">WhatsApp: +91 92019 58273</a><br />
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

    </div>
  );
}
