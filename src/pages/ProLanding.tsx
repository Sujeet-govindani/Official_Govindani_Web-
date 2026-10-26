import { useEffect, useState, useCallback, useRef } from 'react';
import { NGO, ECOM, HEALTH, BUSINESS, OTHERS, US_NGO, ALL, type Work } from '@/data/usaWork';
import ProLeadForm from '@/components/usa/ProLeadForm';
import HeroWall from '@/components/usa/HeroWall';
import '@/styles/usa.css';

/**
 * Multi-industry landing page (/pro) — "the super website creator".
 * One page that positions Govindani as the team behind 1000+ websites for ANY
 * industry (NGO, school, e-commerce, real estate, hotel, hospital, business…),
 * serving India and internationally. Built by duplicating /usa so it inherits
 * the exact design/colors (usa.css), but reframed multi-industry and wired to
 * its own CRM lead form (ProLeadForm, source "Pro Website", round-robin).
 * Portfolio images only — no videos.
 */

const WA = '919201958273';
const R2 = 'https://gi-img-cdn.sujeet.workers.dev/Images';

// On touch devices a single tap just "interacts" (no navigation); a double tap
// visits the site. On desktop, a normal click navigates.
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

/* ---- auto-scrolling marquee carousel (pauses on hover) ---- */
function Marquee({ items, onViewAll, label }: { items: Work[]; onViewAll: () => void; label: string }) {
  const loop = [...items, ...items]; // duplicate for seamless loop
  const ref = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });

  useEffect(() => {
    const el = ref.current; if (!el) return;
    let raf = 0;
    el.scrollLeft = 1;
    const step = () => {
      if (!paused.current && el.scrollWidth > el.clientWidth + 4) {
        el.scrollLeft += 1.1;
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

// Industries we build for — each a card with a "fully loaded" claim.
const INDUSTRIES: [string, string, string][] = [
  ['❤️', 'NGO & Non-profit', 'Donation-ready sites, 80G / tax receipts, donor & campaign management — 0% commission, fully owned.'],
  ['🎓', 'School & Education', 'Admissions, enquiries, galleries, notices & parent portals — the engine behind Birla Open Minds.'],
  ['🛒', 'E-commerce & Retail', 'Catalogue, cart, payments, order tracking & 9 automated emails — custom-coded or Shopify.'],
  ['🏢', 'Real Estate & Builders', 'Project showcases, enquiry capture, floor plans & lead routing that actually converts.'],
  ['🏨', 'Hotel & Hospitality', 'Menus, bookings, galleries & reviews — restaurants, cafés and stays that fill up.'],
  ['🏥', 'Hospital & Healthcare', 'Appointments, departments, doctor profiles & patient enquiries — trust built in.'],
  ['💼', 'Business & Corporate', 'Services, portfolios, lead funnels & SEO — a site that wins you clients.'],
  ['✨', '…and any industry', 'Whatever you do, we have built it before — and we build it better. Just ask.'],
];

// Industry-neutral proof of depth — the functionality we pack into any build.
const GENERIC_POWER: [string, string[]][] = [
  ['Built for your goal', ['Custom-coded to your exact workflow — never a template', 'Payments, donations, bookings or enquiries — whatever you need', 'Your own branded customer / member / donor portal']],
  ['Dashboards & control', ['A full admin panel to manage content, orders & enquiries', 'Role-based access for your whole team', 'Reports & insights that show what’s working']],
  ['Capture & convert', ['Lead capture, enquiry forms & smart routing', 'SEO + Google-ranking foundations on every page', 'Speed-optimised, mobile-first, conversion-focused']],
  ['Automation on autopilot', ['WhatsApp, email & SMS journeys — done for you', 'Automatic receipts, confirmations & follow-ups', 'AI-assisted content & campaigns in seconds']],
  ['Payments, done right', ['UPI, cards, net-banking & wallets for India', 'PayPal / Stripe / Apple Pay for the world', 'Multiple gateways with automatic failover']],
  ['Enterprise-grade & yours', ['SSL security, backups & generous media storage', 'Developer API & webhooks when you need them', '100% ownership — your site, your data, no lock-in']],
];
// "On us" value props — industry-neutral.
const GENERIC_INCLUDED = [
  ['🎁', '100% custom-coded website', 'Built for you — never a template'],
  ['🌐', 'Hosting handled for you', 'Premium hosting, set up and managed'],
  ['🛠️', '1 full year of maintenance', 'Updates, fixes & support — on us'],
  ['✉️', 'Marketing emails on us', 'Campaigns set up and sent for you'],
  ['💬', 'Dedicated WhatsApp integration', 'Reach people where they actually reply'],
  ['🔑', '100% yours', 'Full ownership, full data, no lock-in'],
];

// Rotating trust strip items (icon + label). `meta` styles the ∞ in Meta blue.
const TRUST: { ic: string; t: string; meta?: boolean }[] = [
  { ic: '🌐', t: '1000+ websites delivered' },
  { ic: '∞', t: 'Meta Business Partner', meta: true },
  { ic: '🎓', t: 'Trusted by Birla Open Minds' },
  { ic: '🏆', t: 'Founder — Guinness World Record holder' },
  { ic: '🇮🇳', t: 'India Pvt. Ltd. · 🇺🇸 US LLC' },
  { ic: '⭐', t: '5.0 average client rating' },
  { ic: '⚡', t: 'Custom-coded — never templates' },
  { ic: '🔒', t: '100% ownership · your data' },
  { ic: '🌍', t: 'India · US · serving worldwide' },
  { ic: '🤝', t: 'A dedicated project manager' },
  { ic: '🎯', t: 'SEO & conversion-first builds' },
  { ic: '💬', t: 'WhatsApp support that replies' },
  { ic: '🕐', t: 'On-time delivery, every time' },
  { ic: '🛠️', t: 'Every industry · one team' },
];

// flagship cross-industry trio for the "proof" strip
// Flagship trio-of-industries for the "top websites" strip — one standout build per
// industry, each labelled, to prove we deliver across every sector (hard proof).
const FLAGSHIP: { n: string; u: string; i: string; tag: string }[] = [
  { tag: 'School & Education', n: 'Birla Open Minds', u: 'https://birlaopenmindsbhopal.com', i: `${R2}/PortfolioProjects/PortFolioWebsites/School/School-Birla-Open-Minds.webp` },
  { tag: 'NGO / Non-profit', n: US_NGO[0].n, u: US_NGO[0].u, i: US_NGO[0].i },
  { tag: 'E-commerce', n: 'Tarush Pranaa', u: 'https://tarushpranaa.com/', i: `${R2}/PortfolioProjects/PortFolioWebsites/E-Commerce/Coding/Coding-Tarushpranna.webp` },
  { tag: 'Real estate', n: 'CI Builders', u: OTHERS[0].u, i: OTHERS[0].i },
  { tag: 'Healthcare', n: 'Mahaveer Eye Hospital', u: 'https://mahaveereyehospital.com/', i: HEALTH[1].i },
  { tag: 'Hospitality', n: 'Café Nouris', u: 'https://cafenouris.com/', i: OTHERS[4].i },
];

export default function ProLanding() {
  // Library defaults to the full cross-industry set; "View all" swaps the shown list.
  const [viewAll, setViewAll] = useState<{ label: string; items: Work[] }>({ label: 'All our websites', items: ALL });
  const STEP = 15;
  const [shown, setShown] = useState(STEP);
  const [formOpen, setFormOpen] = useState(false);
  const openForm = useCallback(() => setFormOpen(true), []);
  const feedRef = useRef<HTMLDivElement>(null);
  const openAll = useCallback((label: string, items: Work[]) => {
    setViewAll({ label, items }); setShown(STEP);
    setTimeout(() => document.getElementById('gusa-lib')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 70);
  }, []);

  // auto-feed: reveal more cards as the sentinel scrolls into view
  useEffect(() => {
    const el = feedRef.current; if (!el) return;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) setShown((s) => Math.min(viewAll.items.length, s + STEP));
    }, { rootMargin: '600px' });
    io.observe(el);
    return () => io.disconnect();
  }, [viewAll, shown]);

  return (
    <div className="gusa">
      {/* header comes from the global site nav */}

      {/* hero */}
      <section className="gusa-hero gusa-hero-wall">
        <HeroWall />
        <div className="gusa-hero-in">
          <p className="gusa-eyebrow">1000+ websites delivered &middot; India &amp; worldwide</p>
          <h1 className="gusa-h1">We build websites that win<br /><em>for every industry</em></h1>
          <p className="gusa-lead">
            NGO, school, e-commerce, real estate, hotel, hospital &mdash; whatever you do, we&rsquo;ve
            built it, and we build it better. One team behind 1000+ live websites, serving India and
            the world.
          </p>
          <div className="gusa-hero-cta">
            <button type="button" className="gusa-btn" onClick={openForm}>Get your free quote &rarr;</button>
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

      {/* industries — one team, every industry */}
      <section className="gusa-services">
        <h2 className="gusa-h2">One team. Every industry.</h2>
        <p className="gusa-sub">We don&rsquo;t do one thing well &mdash; we do your thing well. Each build comes loaded with everything your industry actually needs.</p>
        <div className="gusa-svc-grid">
          {INDUSTRIES.map(([ic, t, d]) => (
            <div className="gusa-svc" key={t}><span className="gusa-svc-ic">{ic}</span><h3>{t}</h3><p>{d}</p></div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '26px' }}>
          <button type="button" className="gusa-btn" onClick={openForm}>Tell us your industry &rarr;</button>
        </div>
      </section>

      {/* flagship cross-industry proof */}
      {FLAGSHIP.length > 0 && (
        <section className="gusa-usngo">
          <div className="gusa-usngo-in">
            <p className="gusa-eyebrow">One standout build per industry</p>
            <h2 className="gusa-h2">Proof across every industry</h2>
            <p className="gusa-sub">A school, a non-profit, an online store, a real-estate brand, a hospital and a restaurant &mdash; all live, all custom-built by us.</p>
            <div className="gusa-usngo-grid">
              {FLAGSHIP.map((w) => (
                <a key={w.n} className="gusa-usngo-card" href={w.u !== '#' ? w.u : undefined} onClick={cardTap} target={w.u !== '#' ? '_blank' : undefined} rel="noopener noreferrer">
                  <div className="gusa-usngo-shot"><img src={w.i} alt={`${w.n} — ${w.tag} website by Govindani Infotech`} loading="lazy" /><span className="gusa-taphint" aria-hidden="true">👆 Double-tap to visit</span></div>
                  <span className="gusa-usngo-tag">{w.tag}</span>
                  <span className="gusa-usngo-name">{w.n}{w.u !== '#' && <em> &#8599;</em>}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 1000+ websites stat band */}
      <section className="gusa-stat">
        <div className="gusa-stat-in">
          <p className="gusa-stat-num">1000+</p>
          <h2 className="gusa-h2">websites built &mdash; and counting</h2>
          <p className="gusa-sub">Live, custom-built websites for every kind of business across India, the US and the world.</p>
          <button type="button" className="gusa-btn" onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>See our work &darr;</button>
        </div>
      </section>

      {/* Meta Business Partner credibility */}
      <section className="gusa-meta">
        <div className="gusa-meta-in">
          <img className="gusa-meta-badge" src={`${R2}/partners/meta-partner-badge-dark.png`} alt="Meta Business Partner" loading="lazy" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
          <p className="gusa-eyebrow gusa-meta-eyebrow">Officially recognised by Meta</p>
          <h2 className="gusa-h2"><em>Meta</em> approves a few. We made the cut.</h2>
          <p className="gusa-lead gusa-center">You don&rsquo;t take our word for it &mdash; you take Meta&rsquo;s. Govindani is a <strong>verified Meta Business Partner</strong>, vetted and badged by Meta itself to run your ads and growth.</p>
          <button type="button" className="gusa-btn" onClick={openForm} style={{ marginTop: '20px' }}>Grow with a Meta Partner &rarr;</button>
        </div>
      </section>

      {/* Birla Open Minds — school / institution proof */}
      <section className="gusa-birla">
        <div className="gusa-birla-in">
          <img className="gusa-birla-logo" src={`${R2}/partners/birla-open-minds-mark.svg`} alt="Birla Open Minds" loading="lazy" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
          <p className="gusa-eyebrow">A Birla-legacy institution chose us</p>
          <h2 className="gusa-h2">The digital force behind <em>Birla Open Minds</em></h2>
          <p className="gusa-lead gusa-center">When a name like <strong>Birla</strong> needed a school website built, structured and powered end-to-end, they chose Govindani &mdash; engineered for the scale and trust a legacy institution demands. If we can do it for Birla, we can do it for your school.</p>
          <div className="gusa-hero-cta" style={{ justifyContent: 'center', marginTop: '20px' }}>
            <a className="gusa-btn gusa-btn-ghost" href="https://birlaopenmindsbhopal.com" target="_blank" rel="noopener noreferrer">See it live &#8599;</a>
            <button type="button" className="gusa-btn" onClick={openForm}>Build my school site &rarr;</button>
          </div>
        </div>
      </section>

      {/* Founder — Sujeet Govindani */}
      <section className="gusa-legal">
        <div className="gusa-legal-in">
          <div className="gusa-legal-copy">
            <p className="gusa-eyebrow">Led by a record-breaking founder</p>
            <h2 className="gusa-h2 gusa-h2-left">Sujeet Govindani &mdash; <em>he doesn&rsquo;t just think big, he builds bigger</em></h2>
            <p className="gusa-lead">Govindani Infotech is led by <strong>Sujeet Govindani</strong>, a <strong>Guinness World Record holder</strong> who wrote <strong>101 Startup Ideas</strong> and authored <strong>25+ books</strong> on digital marketing, SEO &amp; growth &mdash; all rated 4.9+ on Kindle. When you work with us, you&rsquo;re backed by a team that thinks like founders and delivers like record-breakers.</p>
            <p className="gusa-addr">🏆 Guinness World Record &middot; ✍️ 25+ published books &middot; 🚀 1000+ websites shipped</p>
            <button type="button" className="gusa-btn" onClick={openForm} style={{ marginTop: '18px' }}>Work with our team &rarr;</button>
          </div>
          <div className="gusa-legal-docs">
            <figure className="gusa-doc">
              <img src={`${R2}/Sujeetsir.webp`} alt="Sujeet Govindani — Founder, Govindani Infotech" loading="lazy" />
              <figcaption>Sujeet Govindani &middot; Founder &amp; CEO<br /><span>Guinness World Record holder &middot; author of 25+ books</span></figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* how deep every build goes — industry-neutral proof */}
      <section className="gusa-offer gusa-offer-ngo">
        <div className="gusa-offer-in">
          <p className="gusa-eyebrow">The depth behind every build</p>
          <h2 className="gusa-h2 gusa-h2-left">We don&rsquo;t ship brochure pages &mdash; <em>we build platforms you own</em></h2>
          <p className="gusa-lead">Whatever your industry, here&rsquo;s the kind of functionality we pack into a single build &mdash; and we go this deep every time.</p>
          <div className="gusa-pwr-grid">
            {GENERIC_POWER.map(([group, items]) => (
              <div className="gusa-pwr" key={group}>
                <h4 className="gusa-pwr-h">{group}</h4>
                <ul className="gusa-ticks gusa-ticks-1">{items.map((f) => <li key={f}><span className="gusa-tick">&#10003;</span>{f}</li>)}</ul>
              </div>
            ))}
          </div>
          <p className="gusa-incl-head">And a lot of it is <em>on us</em></p>
          <div className="gusa-incl">
            {GENERIC_INCLUDED.map(([ic, t, d]) => (
              <div className="gusa-incl-card" key={t}><span className="gusa-incl-ic">{ic}</span><div><h4>{t}</h4><p>{d}</p></div></div>
            ))}
          </div>
          <button type="button" className="gusa-btn" onClick={openForm}>Get a site built this deep &rarr;</button>
        </div>
      </section>

      {/* work carousels + library (all industries) */}
      <section className="gusa-work" id="work">
        <h2 className="gusa-h2">Explore our work</h2>
        <p className="gusa-sub">Every site is live and custom-built. Drag or swipe to browse &middot; tap &ldquo;View all&rdquo; for the full library.</p>
        <Marquee label="Non-profit & NGO websites" items={NGO.slice(0, 14)} onViewAll={() => openAll('Non-profit & NGO websites', NGO)} />
        <Marquee label="E-commerce & online stores" items={ECOM} onViewAll={() => openAll('E-commerce & online stores', ECOM)} />
        <Marquee label="Healthcare & clinics" items={HEALTH} onViewAll={() => openAll('Healthcare & clinics', HEALTH)} />
        <Marquee label="Real estate, hospitality & more" items={OTHERS} onViewAll={() => openAll('Real estate, hospitality & more', OTHERS)} />
        <Marquee label="Business & corporate" items={BUSINESS} onViewAll={() => openAll('Business & corporate', BUSINESS)} />

        <div className="gusa-allbanner">
          <div>
            <h3>1000+ websites built &mdash; explore the library</h3>
            <p>NGOs, online stores, schools, clinics, real estate, corporates &amp; more &mdash; a sample of what we&rsquo;ve delivered.</p>
          </div>
          <button type="button" className="gusa-btn" onClick={() => openAll('All our websites', ALL)}>Browse all our work &rarr;</button>
        </div>

        {/* inline library — auto-feeds more as you scroll */}
        <div className="gusa-lib" id="gusa-lib">
          <div className="gusa-lib-head">
            <h3 className="gusa-h2 gusa-h2-left">{viewAll.label}</h3>
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
          <div className="gusa-all-cta"><button type="button" className="gusa-btn" onClick={openForm}>Get a website like these &rarr;</button></div>
        </div>
      </section>

      {/* one agency — everything you need */}
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

      {/* legal / registration — India + US */}
      <section className="gusa-legal">
        <div className="gusa-legal-in">
          <div className="gusa-legal-copy">
            <p className="gusa-eyebrow">Registered &amp; accountable</p>
            <h2 className="gusa-h2 gusa-h2-left">A registered company you can trust &mdash; in India &amp; the US</h2>
            <p className="gusa-lead">Govindani Infotech is a registered private limited company in India and a registered LLC in the United States, with a US federal EIN &mdash; so you work with a legally accountable partner for contracts, invoicing and support, wherever you are.</p>
            <p className="gusa-addr">🇮🇳 Pune, Maharashtra, India &middot; 🇺🇸 Sheridan, Wyoming, USA</p>
          </div>
          <div className="gusa-legal-docs">
            <div className="gusa-doc-badges">
              <div className="gusa-badge-card"><span className="gusa-badge-ic">&#127470;&#127475;</span><div><h4>Registered Indian company</h4><p>Govindani Infotech Pvt. Ltd. &middot; Pune, India</p></div></div>
              <div className="gusa-badge-card"><span className="gusa-badge-ic">&#127482;&#127480;</span><div><h4>Registered US LLC</h4><p>Govindani Infotech LLC &middot; Wyoming, USA</p></div></div>
              <div className="gusa-badge-card"><span className="gusa-badge-ic">&#10003;</span><div><h4>Federal EIN issued</h4><p>Registered with the IRS for US tax &amp; banking</p></div></div>
              <div className="gusa-badge-card"><span className="gusa-badge-ic">&#128196;</span><div><h4>Full papers on request</h4><p>Registration &amp; compliance docs shared during onboarding</p></div></div>
            </div>
          </div>
        </div>
      </section>

      {/* thanks */}
      <section className="gusa-thanks">
        <h2 className="gusa-h2">Thank you for trusting us</h2>
        <p className="gusa-lead gusa-center">Every brand on this page put their vision in our hands &mdash; and we delivered. Whatever your industry, we&rsquo;d be honored to do the same for you.</p>
        <p className="gusa-usline gusa-usline-dark">🌍 India &middot; United States &middot; serving businesses &amp; non-profits worldwide</p>
        <button type="button" className="gusa-btn" onClick={openForm} style={{ marginTop: '22px' }}>Get your free quote &rarr;</button>
      </section>

      {/* get a quote */}
      <section className="gusa-book" id="book">
        <h2 className="gusa-h2">Get your free website quote</h2>
        <p className="gusa-sub">Tell us your industry &mdash; our team gets back to you within one business day.</p>
        <p className="gusa-usline">🌍 Govindani Infotech &middot; India &amp; United States &middot; serving clients worldwide</p>
        <button type="button" className="gusa-btn" onClick={openForm} style={{ marginTop: '18px' }}>Get your free quote &rarr;</button>
        <p className="gusa-book-fallback">Prefer to talk first? WhatsApp us at{' '}
          <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer">+91 92019 58273</a>.</p>
      </section>

      {/* footer */}
      <footer className="gusa-foot">
        <div className="gusa-foot-in">
          <div className="gusa-foot-brand">
            <img className="gusa-logo" src={`${R2}/govindanilogo-400w.webp`} alt="Govindani Infotech" loading="lazy" decoding="async" />
            <p>Websites, e-commerce &amp; social media for every industry &mdash; India and worldwide.</p>
          </div>
          <div className="gusa-foot-addr">
            <h5>&#127470;&#127475; India</h5>
            <p>Govindani Infotech Pvt. Ltd.<br />2nd Floor, Landmark Plaza, 206<br />Satara Rd, Pune, MH 411009</p>
          </div>
          <div className="gusa-foot-addr">
            <h5>&#127482;&#127480; United States</h5>
            <p>Govindani Infotech LLC<br />30 N Gould St, Ste N<br />Sheridan, WY 82801</p>
          </div>
          <div className="gusa-foot-addr">
            <h5>Talk to us</h5>
            <p><a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer">WhatsApp: +91 92019 58273</a><br />
            <button type="button" className="gusa-foot-link" onClick={openForm}>Get a free quote</button></p>
          </div>
        </div>
        <p className="gusa-foot-sm">&copy; {new Date().getFullYear()} Govindani Infotech. All rights reserved.</p>
      </footer>

      {/* mobile sticky quote bar */}
      <div className="gusa-sticky">
        <button type="button" className="gusa-sticky-book" onClick={openForm}>Get your website from just ₹40,000</button>
      </div>

      {/* desktop floating quote button */}
      <div className="gusa-float">
        <button type="button" className="gusa-float-book" onClick={openForm}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
          Get a free quote
        </button>
      </div>

      <ProLeadForm open={formOpen} onClose={() => setFormOpen(false)}
        source="Pro Website" sheet="pro-quote" turnKey="gi.pro.turn" page="pro"
        priceNote="Websites from just ₹40,000 · custom-coded · 100% ownership" />
    </div>
  );
}
