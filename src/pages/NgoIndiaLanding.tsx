import { useEffect, useState, useCallback, useRef } from 'react';
import { NGO, type Work } from '@/data/usaWork';
import '@/styles/usa.css';
import GiveSetuDemos from '@/components/ngo/GiveSetuDemos';

/**
 * NGO landing page for the Indian market (/ngo).
 *
 * Scope: NGOs only. There is no e-commerce offer, no interest switch and no
 * arrival popup - every visitor is here for one thing, so the page goes
 * straight to the NGO offer. Pricing is INR; the trust section shows the real
 * India registration.
 *
 * Standalone: the global bottom-nav and floating widgets are hidden on this
 * route. Every "Book" CTA opens the Calendly popup. Carousels auto-scroll;
 * "View all" opens the full NGO library.
 */

const CALENDLY_URL = 'https://calendly.com/sujeet-govindaniit/30min';
const WA = '919201958273';
const R2 = 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images';


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
    // start midway so there's room to loop both directions
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
  ['Donation receipts & records', ['Automatic receipts emailed the moment a gift lands', 'Year-end donor statements and immutable records', '80G certificates issued automatically for your donors']],
  ['Memberships & campaigns', ['Build membership tiers & plans for your community', 'Unlimited live cases & fundraising campaigns', 'Our team designs & builds fresh campaign cases for you every month']],
  ['Marketing on autopilot', ['Create high-converting campaigns with AI in seconds', 'WhatsApp, email & SMS donor journeys — done for you', 'AI insights that tell you who to thank, nudge & re-engage']],
  ['Compliance, built in', ['10BD / 10BE statements and 80G reporting, ready to file', 'Full contribution exports for your CA or trustees', 'Audit-ready trail on every transaction']],
  ['Enterprise-grade & yours', ['Multiple payment gateways with automatic failover', 'Developer API & webhooks · generous media storage', 'Custom admin roles, priority support & a dedicated CA / auditor seat']],
];
// "On us" value props — the big reasons to say yes
const NGO_INCLUDED = [
  ['🎁', '100% custom-coded website', 'Yours for a lifetime, free — you only pay the subscription'],
  ['🌐', 'Hosting is on us', 'Premium hosting handled for you, every year'],
  ['🛠️', '1 full year of maintenance', 'Updates, fixes & support — on us'],
  ['✉️', 'Marketing emails on us', 'Donor campaigns set up and sent for you'],
  ['💬', 'Dedicated WhatsApp integration', 'Reach donors where they actually reply'],
  ['🧾', 'Clean donor records', 'Exports, year-end statements and an audit-ready trail — built in'],
];

// Rotating trust strip items (icon + label). `meta` styles the ∞ in Meta blue.
const TRUST: { ic: string; t: string; meta?: boolean }[] = [
  { ic: '🇮🇳', t: 'Registered in India · Pune' },
  { ic: '∞', t: 'Meta Business Partner', meta: true },
  { ic: '✅', t: '8+ years, 1000+ sites delivered' },
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
  // Library is permanent (never closes) — defaults to the full NGO list; category
  // "View all" buttons just swap which set it shows.
  const [viewAll, setViewAll] = useState<{ label: string; items: Work[] }>({ label: 'Our NGO websites', items: NGO });
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
    return () => { css.remove(); s.remove(); };
  }, []);




  const NgoBlock = (
    <section className="gusa-offer gusa-offer-ngo" key="ngo-offer">
      <div className="gusa-offer-in">
        <p className="gusa-eyebrow">For NGOs &amp; non-profits &middot; powered by Give Setu</p>
        <h2 className="gusa-h2 gusa-h2-left">Your own donation-ready NGO website<br /><em>from just &#8377;40,000</em></h2>
        <p className="gusa-lead">You get the <strong>complete advanced Give Setu plan</strong> &mdash; a full fundraising platform your trust owns outright. No crowdfunding commission, no listing pages, no cut of your donations.</p>
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

  return (
    <div className="gusa">
      {/* Title, description and social card (og:image = the designed /usa card)
          come from ROUTE_META['/usa'] via the global Seo component, so there is a
          single, prerendered source of truth and no duplicate/competing tags. */}

      {/* header comes from the global site nav (full site, so visitors can explore everything) */}

      {/* hero */}
      <section className="gusa-hero">
        <div className="gusa-hero-in">
          <p className="gusa-eyebrow">Registered in India &middot; Pune, Maharashtra</p>
          <h1 className="gusa-h1">Your own NGO website<br /><em>from just &#8377;40,000</em></h1>
          <p className="gusa-lead">
            A donation-ready platform your trust owns outright &mdash; 80G receipts, recurring giving
            and zero commission on every rupee you raise.
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

      {/* featured top 3 */}
      {(
        <section className="gusa-usngo">
          <div className="gusa-usngo-in">
            <p className="gusa-eyebrow">&#11088; Top 3 &middot; Trusted by Indian non-profits</p>
            <h2 className="gusa-h2">The best NGO websites we&rsquo;ve built</h2>
            <p className="gusa-sub">Real donation-ready websites for registered trusts and societies, taking gifts from day one.</p>
            <div className="gusa-usngo-grid">
              {NGO.slice(0, 3).map((w) => (
                <a key={w.n} className="gusa-usngo-card" href={w.u} onClick={cardTap} target="_blank" rel="noopener noreferrer">
                  <div className="gusa-usngo-shot"><img src={w.i} alt={`${w.n} — NGO website by Govindani Infotech`} loading="lazy" /><span className="gusa-taphint" aria-hidden="true">👆 Double-tap to visit</span></div>
                  <span className="gusa-usngo-name">{w.n} <em>&#8599;</em></span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 1000+ websites & counting (stat band) */}
      <section className="gusa-stat">
        <div className="gusa-stat-in">
          <p className="gusa-stat-num">1000+</p>
          <h2 className="gusa-h2">websites built &mdash; and counting</h2>
          <p className="gusa-sub">Live, custom-built websites for trusts, societies and foundations across India.</p>
          <button type="button" className="gusa-btn" onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>See our work &darr;</button>
        </div>
      </section>

      {/* 4 — Meta Business Partner credibility */}
      <section className="gusa-meta">
        <div className="gusa-meta-in">
          <img className="gusa-meta-badge" src={`${R2}/partners/meta-partner-badge-dark.png`} alt="Meta Business Partner" loading="lazy" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
          <p className="gusa-eyebrow gusa-meta-eyebrow">Officially recognised by Meta</p>
          <h2 className="gusa-h2"><em>Meta</em> approves a few. We made the cut.</h2>
          <p className="gusa-lead gusa-center">You don&rsquo;t take our word for it &mdash; you take Meta&rsquo;s. Govindani is a <strong>verified Meta Business Partner</strong>, vetted and badged by Meta itself to run your ads and growth.</p>
          <button type="button" className="gusa-btn" onClick={openCalendly} style={{ marginTop: '20px' }}>Run ads with a Meta Partner &rarr;</button>
        </div>
      </section>

      {/* 5 — our functionalities (tailored offer blocks) */}
      {/* the platform running by itself — demos sell this better than the list below */}
      <GiveSetuDemos onBook={openCalendly} />

      {NgoBlock}

      {/* 6 — other projects (work carousels + library) */}
      <section className="gusa-work" id="work">
        <h2 className="gusa-h2">Explore more of our work</h2>
        <p className="gusa-sub">Every site is live and custom-built. Drag or swipe to browse &middot; tap &ldquo;View all&rdquo; for the full library.</p>
        <Marquee label="Non-profit & NGO websites" items={NGO.slice(0, 14)} onViewAll={() => openAll('Non-profit & NGO websites', NGO)} />

        <div className="gusa-allbanner">
          <div>
            <h3>500+ NGO websites built &mdash; explore the library</h3>
            <p>Donation-ready websites for trusts, societies and foundations across India.</p>
          </div>
          <button type="button" className="gusa-btn" onClick={() => openAll('Our NGO work', NGO)}>Browse our work &rarr;</button>
        </div>

        {/* inline library — auto-feeds more as you scroll (no pages, no gaps) */}
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
          <div className="gusa-all-cta"><button type="button" className="gusa-btn" onClick={openCalendly}>Get a website like these &rarr;</button></div>
        </div>
      </section>

      {/* one agency — everything you need (kept near the end) */}
      <section className="gusa-services">
        <h2 className="gusa-h2">One agency. Everything you need.</h2>
        <p className="gusa-sub">We don&rsquo;t just build the website &mdash; we run the whole growth engine for you.</p>
        <div className="gusa-svc-grid">
          {[
            ['💻', 'NGO website & donor platform', 'Custom-coded, yours to own'],
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

      {/* legal / registration */}
      <section className="gusa-legal">
        <div className="gusa-legal-in">
          <div className="gusa-legal-copy">
            <p className="gusa-eyebrow">Registered &amp; accountable</p>
            <h2 className="gusa-h2 gusa-h2-left">A registered company you can hold accountable</h2>
            <p className="gusa-lead">Govindani Infotech Pvt. Ltd. is a company registered in India, with a US arm registered in Wyoming &mdash; so your trust contracts with a legally accountable company, not a freelancer who disappears after launch.</p>
            <p className="gusa-addr">&#128205; 2nd Floor, Landmark Plaza, 206, Satara Rd, Pune, MH 411009</p>
          </div>
          <div className="gusa-legal-docs">
            <figure className="gusa-doc">
              <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/USA/wy-articles-of-organization.jpg" alt="Wyoming Articles of Organization — Govindani Infotech LLC" loading="lazy" />
              <figcaption>Articles of Organization &middot; Wyoming Secretary of State<br /><span>Public filing ID 2025-001850382</span></figcaption>
            </figure>
            <div className="gusa-doc-badges">
              <div className="gusa-badge-card"><span className="gusa-badge-ic">&#127482;&#127480;</span><div><h4>Registered US LLC</h4><p>Govindani Infotech LLC &middot; Wyoming, USA</p></div></div>
              <div className="gusa-badge-card"><span className="gusa-badge-ic">&#127470;&#127475;</span><div><h4>Registered in India</h4><p>Govindani Infotech Pvt. Ltd. &middot; Pune, Maharashtra</p></div></div>
              <div className="gusa-badge-card"><span className="gusa-badge-ic">&#128196;</span><div><h4>Full papers on request</h4><p>Operating agreement &amp; compliance docs shared during onboarding</p></div></div>
            </div>
          </div>
        </div>
      </section>

      {/* thanks */}
      <section className="gusa-thanks">
        <h2 className="gusa-h2">Thank you for trusting us</h2>
        <p className="gusa-lead gusa-center">Every brand on this page put their vision in our hands &mdash; and we delivered. We&rsquo;d be honored to do the same for you.</p>
        <p className="gusa-usline gusa-usline-dark">&#127470;&#127475; Serving trusts, societies and foundations across India &middot; registered in Pune, Maharashtra</p>
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
            <img className="gusa-logo" src={`${R2}/govindanilogo-400w.webp`} alt="Govindani Infotech"  loading="lazy" decoding="async" />
            <p>Donation-ready websites, donor platforms and social media for non-profits across India.</p>
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

      {/* desktop floating book-a-call button (always visible) */}
      <div className="gusa-float">
        <a className="gusa-float-wa" href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp us">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2Zm5.8 14.09c-.24.68-1.42 1.32-1.95 1.37-.5.05-.96.23-3.23-.67-2.72-1.07-4.45-3.86-4.58-4.04-.13-.18-1.1-1.46-1.1-2.79s.7-1.98.95-2.25c.24-.27.53-.34.7-.34.18 0 .35 0 .5.01.16.01.38-.06.59.45.24.58.82 2 .89 2.14.07.14.12.31.02.49-.09.18-.14.29-.27.45-.14.16-.29.36-.41.48-.14.14-.28.29-.12.57.16.27.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.21 1.37.27.14.43.12.59-.07.16-.18.68-.79.86-1.07.18-.27.36-.22.59-.13.24.09 1.51.71 1.77.84.27.14.44.2.5.31.07.11.07.63-.17 1.31Z"/></svg>
        </a>
        <button type="button" className="gusa-float-book" onClick={openCalendly}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
          Book a free call
        </button>
      </div>


    </div>
  );
}
