import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import '@/styles/usa.css';

/**
 * Dedicated USA landing page — a single shareable link for US prospects.
 * Showcases our website + social-media services, real work by category
 * (NGO / E-Commerce / Healthcare carousels), our US registration for trust,
 * and a Calendly booking to schedule a consultation.
 *
 * PLACEHOLDERS to confirm with the client:
 *   - CALENDLY_URL  → replace with the real Calendly scheduling link
 *   - LEGAL_DOCS    → add the actual US registration / incorporation document images/PDFs
 *   - a few USA-specific site links the client will share
 */

const CALENDLY_URL = 'https://calendly.com/govindaniit/consultation'; // TODO: confirm real link
const R2 = 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images';
const ECOM = `${R2}/PortfolioProjects/PortFolioWebsites/E-Commerce`;

const NGO_WORK = [
  { name: 'Mahipatsinh Foundation', url: 'https://mahipatsinhfoundation.org', img: '/images/portfolio-sites/mahipatsinh.jpg' },
  { name: 'Aajol Parivar', url: 'https://aajol.org', img: '/images/portfolio-sites/aajol-parivar.jpg' },
  { name: 'Anugrah Foundation', url: 'https://anugrahfoundation.org', img: '/images/portfolio-sites/anugrah-foundation.jpg' },
  { name: 'Amee Foundation', url: 'https://ameefoundation.com', img: '/images/portfolio-sites/amee-foundation.jpg' },
  { name: 'Nostro Destino Foundation', url: 'https://nostrodestino.org', img: '/images/portfolio-sites/nostro-destino-foundation.jpg' },
  { name: 'Bhumi Mitra Foundation', url: 'https://bhumimitra.org', img: '/images/portfolio-sites/bhumi-mitra-foundation.jpg' },
  { name: 'Kishan Singh Foundation', url: 'https://kishanfoundation.org', img: '/images/portfolio-sites/kishan-singh-foundation.jpg' },
  { name: 'Handmade Heart Foundation', url: 'https://handmadehearts.org', img: '/images/portfolio-sites/handmade-heart-foundation.jpg' },
];

const ECOM_WORK = [
  { name: 'Baba Ji Ki Buti', url: 'https://babajikibuti.com/home', img: `${ECOM}/Coding/Coding-Babajikibuti.webp` },
  { name: 'Tarush Pranaa', url: 'https://tarushpranaa.com', img: `${ECOM}/Coding/Coding-Tarushpranna.webp` },
  { name: 'Terra by Trishla', url: '#', img: `${ECOM}/Wordpress/Wordpress-Terra-By-Trishla.webp` },
  { name: 'GSD Organics', url: '#', img: `${ECOM}/Wordpress/Wordpress-Gsd-Organics.webp` },
  { name: 'Mukta Shop', url: '#', img: `${ECOM}/Shopify/Shopify-Muktashop.webp` },
  { name: 'Gllora', url: '#', img: `${ECOM}/Shopify/Shopify-Gllora.webp` },
  { name: 'Kryelet Studios', url: '#', img: `${ECOM}/Shopify/Shopify-kryelet-studios.webp` },
];

const HEALTH_WORK = [
  { name: 'Dentivaa', url: 'https://dentivaa.com', img: '/images/portfolio-sites/dentivaa.jpg' },
  { name: 'Mahaveer Eye Hospital', url: 'https://mahaveereyehospital.com', img: `${R2}/PortfolioProjects/PortFolioWebsites/Healthcare/Healthcare-mahaveer-eye-hospital.webp` },
];

function Carousel({ id, items }: { id: string; items: { name: string; url: string; img: string }[] }) {
  return (
    <div className="gusa-rail" aria-label={id}>
      {items.map((w) => (
        <a key={w.name} className="gusa-slide" href={w.url && w.url !== '#' ? w.url : undefined}
           target={w.url && w.url !== '#' ? '_blank' : undefined} rel="noopener noreferrer">
          <div className="gusa-shot"><img src={w.img} alt={`${w.name} website by Govindani Infotech`} loading="lazy" /></div>
          <span className="gusa-slide-name">{w.name}{w.url && w.url !== '#' && <em> &#8599;</em>}</span>
        </a>
      ))}
    </div>
  );
}

export default function UsaLanding() {
  useEffect(() => {
    // Load Calendly inline widget assets once.
    const css = document.createElement('link');
    css.rel = 'stylesheet'; css.href = 'https://assets.calendly.com/assets/external/widget.css';
    document.head.appendChild(css);
    const s = document.createElement('script');
    s.src = 'https://assets.calendly.com/assets/external/widget.js'; s.async = true;
    document.body.appendChild(s);
    return () => { css.remove(); s.remove(); };
  }, []);

  return (
    <div className="gusa">
      <Helmet>
        <title>US Web &amp; Social Media Partner | Govindani Infotech</title>
        <meta name="description" content="Govindani Infotech builds high-converting websites, e-commerce stores and social media for US businesses & non-profits. US-registered. Book a free consultation." />
      </Helmet>

      {/* top bar */}
      <header className="gusa-top">
        <img className="gusa-logo" src={`${R2}/govindanilogo-400w.webp`} alt="Govindani Infotech" />
        <a className="gusa-top-cta" href="#book">Book a consultation</a>
      </header>

      {/* hero */}
      <section className="gusa-hero">
        <div className="gusa-hero-in">
          <p className="gusa-eyebrow">US-registered &middot; Wyoming, USA</p>
          <h1 className="gusa-h1">Websites &amp; social media that<br /><em>grow US businesses</em></h1>
          <p className="gusa-lead">
            We design, build and market high-converting websites, online stores and social presence for
            US companies and non-profits &mdash; custom-coded to your goals, delivered end-to-end.
          </p>
          <div className="gusa-hero-cta">
            <a className="gusa-btn" href="#book">Book a free consultation &rarr;</a>
            <a className="gusa-btn gusa-btn-ghost" href="#work">See our work</a>
          </div>
          <ul className="gusa-trustchips">
            <li>&#127482;&#127480; US-registered entity</li>
            <li>&#10003; Meta Business Partner</li>
            <li>&#10003; 200+ websites delivered</li>
          </ul>
        </div>
      </section>

      {/* services */}
      <section className="gusa-services">
        <h2 className="gusa-h2">What we do for you</h2>
        <div className="gusa-svc-grid">
          <div className="gusa-svc"><span className="gusa-svc-ic">&#128187;</span><h3>Website design &amp; development</h3><p>Custom, fast, mobile-first websites that turn visitors into customers.</p></div>
          <div className="gusa-svc"><span className="gusa-svc-ic">&#128722;</span><h3>E-commerce stores</h3><p>Shopify, WooCommerce &amp; custom stores built to sell and scale.</p></div>
          <div className="gusa-svc"><span className="gusa-svc-ic">&#128241;</span><h3>Social media marketing</h3><p>Content, campaigns and Meta ads managed by a Meta Business Partner.</p></div>
        </div>
      </section>

      {/* work carousels */}
      <section className="gusa-work" id="work">
        <h2 className="gusa-h2">A snapshot of our work</h2>
        <p className="gusa-sub">A few examples per category &mdash; scroll sideways. Every site below is live and custom-built.</p>

        <div className="gusa-cat">
          <h3 className="gusa-cat-h">Non-profit &amp; NGO websites</h3>
          <Carousel id="NGO work" items={NGO_WORK} />
        </div>
        <div className="gusa-cat">
          <h3 className="gusa-cat-h">E-commerce &amp; online stores</h3>
          <Carousel id="E-commerce work" items={ECOM_WORK} />
        </div>
        <div className="gusa-cat">
          <h3 className="gusa-cat-h">Healthcare &amp; clinics</h3>
          <Carousel id="Healthcare work" items={HEALTH_WORK} />
        </div>
      </section>

      {/* legal / registration */}
      <section className="gusa-legal">
        <div className="gusa-legal-in">
          <div className="gusa-legal-copy">
            <p className="gusa-eyebrow">Registered &amp; accountable</p>
            <h2 className="gusa-h2 gusa-h2-left">A US-registered company you can trust</h2>
            <p className="gusa-lead">
              Govindani Infotech is a registered business in the United States, so you work with a
              legally accountable partner &mdash; contracts, invoicing and support, all above board.
            </p>
            <p className="gusa-addr">&#128205; 30 N Gould St, Ste N, Sheridan, WY 82801, USA</p>
          </div>
          <div className="gusa-legal-docs">
            <figure className="gusa-doc">
              <img src="/images/usa/wy-articles-of-organization.jpg" alt="Wyoming Articles of Organization — Govindani Infotech LLC" loading="lazy" />
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

      {/* trust / thank you */}
      <section className="gusa-thanks">
        <h2 className="gusa-h2">Thank you for trusting us</h2>
        <p className="gusa-lead gusa-center">
          Every brand on this page put their vision in our hands &mdash; and we delivered. We&rsquo;d be
          honored to do the same for you. No pressure, just an honest conversation about your goals.
        </p>
      </section>

      {/* calendly booking */}
      <section className="gusa-book" id="book">
        <h2 className="gusa-h2">Book your free consultation</h2>
        <p className="gusa-sub">Pick a time that works for you &mdash; we&rsquo;ll walk you through exactly how we&rsquo;d approach your project.</p>
        <div className="calendly-inline-widget gusa-calendly" data-url={CALENDLY_URL} style={{ minWidth: '320px', height: '680px' }} />
        <p className="gusa-book-fallback">Prefer to talk first? WhatsApp us at{' '}
          <a href="https://wa.me/919201958278" target="_blank" rel="noopener noreferrer">+91 92019 58278</a>.</p>
      </section>

      <footer className="gusa-foot">
        <img className="gusa-logo" src={`${R2}/govindanilogo-400w.webp`} alt="Govindani Infotech" />
        <p>Govindani Infotech Pvt. Ltd. &middot; USA: 30 N Gould St, Ste N, Sheridan, WY 82801</p>
        <p className="gusa-foot-sm">&copy; {new Date().getFullYear()} Govindani Infotech. All rights reserved.</p>
      </footer>
    </div>
  );
}
