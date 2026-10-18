import { useEffect, useState, useCallback, useRef } from 'react';
import { NGO, type Work } from '@/data/usaWork';
import '@/styles/usa.css';
import '@/styles/ngo-india.css';
import GiveSetuDemos from '@/components/ngo/GiveSetuDemos';
import NgoLeadForm from '@/components/ngo/NgoLeadForm';

/**
 * NGO landing page for the Indian market (/ngo).
 *
 * Scope: NGOs only. There is no e-commerce offer, no interest switch and no
 * arrival popup - every visitor is here for one thing, so the page goes
 * straight to the NGO offer. Pricing is INR; the trust section shows the real
 * India registration.
 *
 * Standalone: the global bottom-nav and floating widgets are hidden on this
 * route. Every CTA drops to the enquiry form. Carousels auto-scroll;
 * "View all" opens the full NGO library.
 */

const WA = '919201958273';
const R2 = 'https://gi-img-cdn.sujeet.workers.dev/Images';


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


// Rotating trust strip items (icon + label). `meta` styles the ∞ in Meta blue.
// The four we lead with. Ordered by Instagram reach, because the follower
// count is the proof a trustee recognises before they read a word.
const FLAGSHIPS = [
  { n: 'Gau Seva Dham',          who: 'Devi Chitralekha',  f: '6.7M', u: 'https://gausevadham.org/',                      i: `${R2}/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Gau-Seva-Dham.webp`,                    p: `${R2}/devichitra.webp` },
  { n: 'Popatbhai Foundation',   who: 'Popatbhai Trust',   f: '1.9M', u: 'https://popatbhaicharitablefoundation.org/',     i: `${R2}/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Popatbhai-Charitable-Trust.webp`,      p: `${R2}/Popat.webp` },
  { n: 'Mahipatsinh Foundation', who: 'Mahipatsinh Chauhan', f: '1.3M', u: 'https://mahipatsinhfoundation.org/',          i: `${R2}/PortfolioSites/mahipatsinh.jpg`,                                                            p: `${R2}/founder-open.webp` },
  { n: 'Harsh Chhikara Trust',   who: 'Harsh Chhikara',    f: '1.2M', u: 'https://harshchhikara.com/',                    i: `${R2}/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Harsh-Chhikkara-Jan-Seva-Trust.webp`,  p: `${R2}/harshi.webp` },
];

const TRUST: { ic: string; t: string; meta?: boolean }[] = [
  { ic: '🇮🇳', t: 'Registered in India · Pune' },
  { ic: '📘', t: 'Founder authored 25+ books' },
  { ic: '🏅', t: 'Guinness World Record holder' },
  { ic: '▶️', t: 'YouTube Silver Button' },
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
  const [formOpen, setFormOpen] = useState(false);
  const goToForm = useCallback(() => setFormOpen(true), []);
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

  return (
    <div className="gusa">
      {/* Title, description and social card (og:image = the designed /usa card)
          come from ROUTE_META['/usa'] via the global Seo component, so there is a
          single, prerendered source of truth and no duplicate/competing tags. */}

      {/* header comes from the global site nav (full site, so visitors can explore everything) */}

      {/* rotating trust strip — now the opening element, so it carries the
          header clearance the hero used to provide */}
      <div className="gusa-trustbar gni-first" aria-label="Why teams trust Govindani">
        <div className="gusa-trusttrack" style={{ ['--tn' as string]: TRUST.length }}>
          {[...TRUST, ...TRUST].map((t, i) => (
            <span className="gusa-trustitem" key={`${t.t}-${i}`} aria-hidden={i >= TRUST.length}>
              <span className={`gusa-trustic${t.meta ? ' gusa-metaic' : ''}`}>{t.ic}</span>{t.t}
            </span>
          ))}
        </div>
      </div>

      {/* the four flagships — follower count first, it is the proof they recognise */}
      <section className="gni-flag">
        <div className="gni-flag-in">
          <p className="gusa-eyebrow" style={{ textAlign: 'center' }}>Who believed in us</p>
          <h2 className="gusa-h2">The biggest names in Indian seva<br /><em>trusted us with their website</em></h2>
          <p className="gusa-sub">Between them they reach over 11 million people. Every one of these sites takes donations, issues 80G receipts and is live right now.</p>
          <div className="gni-grid">
            {FLAGSHIPS.map((w, idx) => (
              <a key={w.n} className="gni-card" href={w.u} onClick={cardTap} target="_blank" rel="noopener noreferrer">
                <div className="gni-shot">
                  <img src={w.i} alt={`${w.n} — NGO website built by Govindani Infotech`} loading="lazy" decoding="async" />
                  <span className="gni-rank">{idx + 1}</span>
                  <span className="gni-foll">
                    <span className="gni-ig" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.1" fill="#fff" stroke="none"/></svg>
                    </span>
                    <span>
                      <span className="gni-foll-n">{w.f}+</span>
                      <span className="gni-foll-l">followers</span>
                    </span>
                  </span>
                </div>
                <div className="gni-body">
                  <img className="gni-face" src={w.p} alt={w.who} loading="lazy" decoding="async" onError={(e) => { (e.currentTarget as HTMLImageElement).style.visibility = 'hidden'; }} />
                  <div>
                    <p className="gni-name">{w.n}</p>
                    <p className="gni-who">{w.who}</p>
                  </div>
                  <span className="gni-go">Visit &#8599;</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — Meta Business Partner credibility */}
      <section className="gusa-meta">
        <div className="gusa-meta-in">
          <img className="gusa-meta-badge" src={`${R2}/partners/meta-partner-badge-dark.png`} alt="Meta Business Partner" loading="lazy" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
          <p className="gusa-eyebrow gusa-meta-eyebrow">Officially recognised by Meta</p>
          <h2 className="gusa-h2"><em>Meta</em> approves a few. We made the cut.</h2>
          <p className="gusa-lead gusa-center">You don&rsquo;t take our word for it &mdash; you take Meta&rsquo;s. Govindani is a <strong>verified Meta Business Partner</strong>, vetted and badged by Meta itself to run your ads and growth.</p>
          <button type="button" className="gusa-btn" onClick={goToForm} style={{ marginTop: '20px' }}>Run ads with a Meta Partner &rarr;</button>
        </div>
      </section>

      {/* the counter sits after the Meta badge: proof, then scale */}
      <section className="gni-count">
        <div className="gni-count-in">
          <div className="gni-count-i"><div className="gni-count-n">500+</div><div className="gni-count-l">NGO websites built</div></div>
          <div className="gni-count-i"><div className="gni-count-n">&#8377;1100 Cr+</div><div className="gni-count-l">donations processed</div></div>
          <div className="gni-count-i"><div className="gni-count-n">8+ yrs</div><div className="gni-count-l">building for causes</div></div>
          <div className="gni-count-i"><div className="gni-count-n">0%</div><div className="gni-count-l">commission, ever</div></div>
        </div>
      </section>

      {/* cherry on top: they are not hiring an agency, they are hiring him */}
      <section className="gni-founder">
        <div className="gni-founder-in">
          <img className="gni-founder-pic" src={`${R2}/Sujeetsir.webp`} alt="Sujeet Govindani, founder of Govindani Infotech" loading="lazy" decoding="async" />
          <div>
            <p className="gni-founder-k">And the person behind it</p>
            <h2 className="gni-founder-h">You won&rsquo;t be handed to an account manager.<br /><em>You work with Sujeet Govindani.</em></h2>
            <p className="gni-founder-p">
              Founder of Govindani Infotech, author of 25+ books including <em>101 Startup Ideas</em>,
              and the person who has personally overseen 500+ NGO websites. Your cause gets the
              same attention his own work does.
            </p>
            <div className="gni-medals">
              <span className="gni-medal">&#128216; <b>25+</b> books authored</span>
              <span className="gni-medal">&#127941; Guinness World Record holder</span>
              <span className="gni-medal">&#9654;&#65039; YouTube <b>Silver Button</b></span>
              <span className="gni-medal">&#8734; Meta Business Partner</span>
            </div>
          </div>
        </div>
      </section>

      <GiveSetuDemos onBook={goToForm} />

      {/* 6 — other projects (work carousels + library) */}
      <section className="gusa-work gni-two" id="work">
        <h2 className="gusa-h2">Explore more of our work</h2>
        <p className="gusa-sub">Every site is live and custom-built. Drag or swipe to browse &middot; tap &ldquo;View all&rdquo; for the full library.</p>
        <Marquee label="Non-profit & NGO websites" items={NGO.slice(0, 14)} onViewAll={() => openAll('Non-profit & NGO websites', NGO)} />

        {/* Stays pinned while the portfolio scrolls past, so the number is in
            view the whole way down instead of being a box they scroll past once. */}
        <div className="gni-pin">
          <div className="gni-pin-in">
            <span className="gni-pin-n">500<i>+</i></span>
            <span className="gni-pin-t">
              <b>NGO websites built</b>
              <em>&mdash; and you&rsquo;re looking at them</em>
            </span>
            <button type="button" className="gni-pin-btn" onClick={() => openAll('Our NGO work', NGO)}>Browse all &rarr;</button>
          </div>
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
          <div className="gusa-all-cta"><button type="button" className="gusa-btn" onClick={goToForm}>Get a website like these &rarr;</button></div>
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

      {/* thanks */}
      <section className="gusa-thanks">
        <h2 className="gusa-h2">Thank you for trusting us</h2>
        <p className="gusa-lead gusa-center">Every brand on this page put their vision in our hands &mdash; and we delivered. We&rsquo;d be honored to do the same for you.</p>
        <p className="gusa-usline gusa-usline-dark">&#127470;&#127475; Serving trusts, societies and foundations across India &middot; registered in Pune, Maharashtra</p>
        <button type="button" className="gusa-btn" onClick={goToForm} style={{ marginTop: '22px' }}>Start with three questions &rarr;</button>
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
            <button type="button" className="gusa-foot-link" onClick={goToForm}>Talk to us</button></p>
          </div>
        </div>
        <div className="gni-foot-price">
          <p>Get your full NGO website at <b>&#8377;40,000 only</b></p>
          <span>Donation-ready, 80G receipts, all 44 features &middot; zero commission, ever</span>
          <button type="button" className="gni-foot-btn" onClick={goToForm}>Get quote &rarr;</button>
        </div>
        <p className="gusa-foot-sm">&copy; {new Date().getFullYear()} Govindani Infotech. All rights reserved.</p>
      </footer>

      <NgoLeadForm open={formOpen} onClose={() => setFormOpen(false)} />

      {/* mobile sticky book bar */}
      <div className="gusa-sticky gni-sticky">
        <p className="gni-sticky-price">Full NGO website at <b>&#8377;40,000 only</b></p>
        <div className="gni-sticky-row">
          <button type="button" className="gusa-sticky-book" onClick={goToForm}>Get quote</button>
        </div>
      </div>

      {/* desktop floating book-a-call button (always visible) */}
      <div className="gusa-float">
        <button type="button" className="gusa-float-book" onClick={goToForm}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 5h16v12H7l-3 3z"/></svg>
          Get quote
        </button>
      </div>


    </div>
  );
}
