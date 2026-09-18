import { useState, useRef, useEffect } from "react";
import ContactUsForm from "./ContactUsForm";
import ServiceSection from "@/components/HomePage/ServicesSection";

const SERVICES = [
  {
    title: "Interact CRM Automation",
    desc: "Seamlessly automate your customer relationship management. Build intelligent pipelines that nurture leads, follow up automatically, and convert prospects all on autopilot.",
  },
  {
    title: "Shiprocket Integration",
    desc: "End-to-end e-commerce logistics automation. Sync orders, track shipments, manage returns, and update customers without lifting a finger.",
  },
  {
    title: "WhatsApp Automation",
    desc: "Engage customers where they already are. Automated WhatsApp flows for order updates, lead nurturing, support queries, and promotions.",
  },
  {
    title: "AI Tool Integration",
    desc: "Leverage any AI tool GPT, Claude, Gemini, and more embedded into your business workflows to create unprecedented operational leverage.",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Book a Consultancy Call",
    desc: "Schedule a free discovery session with our automation specialists.",
  },
  {
    num: "02",
    title: "Business Review",
    desc: "We deep-dive into your current processes, tools, and bottlenecks.",
  },
  {
    num: "03",
    title: "Custom Automation Blueprint",
    desc: "We identify exactly which tools and flows will unlock maximum leverage.",
  },
  {
    num: "04",
    title: "Deploy & Scale",
    desc: "We implement, test, and hand over a fully automated system built for growth.",
  },
];

const CATEGORIES = [
  { label: "CRM", detail: "Interact CRM leads, pipelines, follow-ups" },
  { label: "E-Commerce", detail: "Shiprocket orders, shipping, returns" },
  { label: "WhatsApp", detail: "Messaging flows, broadcasts, bots" },
  { label: "AI Tools", detail: "Any AI tool tailored to your use case" },
];

export default function AIAutomationPage() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`

        /* ─────────────────────────────────────────────────────────────────
           ALL RULES ARE SCOPED UNDER .ai-automation-page
           This prevents styles from leaking into <ServiceSection />
        ───────────────────────────────────────────────────────────────── */

        .ai-automation-page *,
        .ai-automation-page *::before,
        .ai-automation-page *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .ai-automation-page {
          --black: #0a0a0a;
          --cream: #f5f0e8;
          --gold: #c9a84c;
          --gold-light: #e0c068;
          --gold-dim: rgba(201,168,76,0.5);
          --card-bg: #111111;
          --border: rgba(201,168,76,0.2);
          --font-head: 'Libre Baskerville', Georgia, serif;
          --font-body: 'Inter', sans-serif;
          --nav-h: 80px;

          background: var(--black);
          color: var(--cream);
          font-family: var(--font-body);
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }

        .ai-automation-page .hero.aap-section {
          min-height: min(85svh, var(--hero-max));
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          position: relative;
          overflow: hidden;
          background: #000;
          padding: 0px 5vw 0px;
        }

        .ai-automation-page .hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        .ai-automation-page .hero-glow {
          position: absolute;
          top: 40%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 70vw;
          height: 40vw;
          background: radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .ai-automation-page .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          border: 1px solid var(--border);
          background: rgba(201,168,76,0.05);
          padding: 0.4rem 1rem;
          border-radius: 100px;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 1.5rem;
          position: relative;
          z-index: 1;
        }

        .ai-automation-page .hero-badge::before {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--gold);
          animation: aap-pulse 2s infinite;
        }

        @keyframes aap-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.4); }
        }

        .ai-automation-page .hero h1 {
          font-family: var(--font-head);
          font-size: clamp(2rem, 7vw, 5.5rem);
          font-weight: 700;
          line-height: 1.12;
          color: var(--cream);
          max-width: 860px;
          margin: 0 auto 1.25rem;
          position: relative;
          z-index: 1;
        }

        .ai-automation-page .hero h1 em {
          font-style: italic;
          color: var(--gold);
        }

        .ai-automation-page .hero-sub {
          font-size: clamp(0.88rem, 2vw, 1.1rem);
          font-weight: 300;
          color: rgba(245,240,232,0.65);
          max-width: 580px;
          margin: 0 auto 2.4rem;
          line-height: 1.75;
          letter-spacing: 0.01em;
          position: relative;
          z-index: 1;
        }

        .ai-automation-page .hero-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
          margin-bottom: 3rem;
        }

        .ai-automation-page .hero-stats {
          display: flex;
          gap: clamp(1.5rem, 4vw, 4rem);
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
          border-top: 1px solid var(--border);
          padding-top: 2.5rem;
          width: 100%;
          max-width: 620px;
        }

        .ai-automation-page .stat { text-align: center; }

        .ai-automation-page .stat-num {
          font-family: var(--font-head);
          font-size: clamp(1.6rem, 3.5vw, 2.6rem);
          color: var(--gold);
          display: block;
          line-height: 1;
          margin-bottom: 0.4rem;
        }

        .ai-automation-page .stat-label {
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.45);
          font-weight: 400;
        }

        .ai-automation-page .divider {
          width: 1px;
          height: 48px;
          background: var(--border);
          align-self: center;
        }

        /* ── BUTTONS ── */
        .ai-automation-page .btn-primary {
          background: var(--gold);
          color: var(--black);
          border: none;
          padding: 0.85rem 2rem;
          border-radius: 2px;
          font-family: var(--font-body);
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
        }

        .ai-automation-page .btn-primary:hover {
          background: var(--gold-light);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(201,168,76,0.35);
        }

        .ai-automation-page .btn-outline {
          background: transparent;
          color: var(--cream);
          border: 1px solid rgba(245,240,232,0.3);
          padding: 0.85rem 2rem;
          border-radius: 2px;
          font-family: var(--font-body);
          font-size: 0.82rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s, transform 0.15s;
        }

        .ai-automation-page .btn-outline:hover {
          border-color: var(--gold);
          color: var(--gold);
          transform: translateY(-2px);
        }

        /* ── SECTIONS — scoped, no bare "section" selector ── */
        .ai-automation-page .aap-section {
          padding: clamp(48px, 8vw, 100px) 5vw;
        }

        .ai-automation-page .section-tag {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 0.85rem;
        }

        .ai-automation-page .section-title {
          font-family: var(--font-head);
          font-size: clamp(1.6rem, 4vw, 3rem);
          font-weight: 700;
          color: var(--cream);
          line-height: 1.2;
          margin-bottom: 0.75rem;
        }

        .ai-automation-page .section-title em {
          font-style: italic;
          color: var(--gold);
        }

        .ai-automation-page .section-desc {
          color: rgba(245,240,232,0.6);
          font-size: clamp(0.88rem, 1.6vw, 1.02rem);
          line-height: 1.75;
          font-weight: 300;
          max-width: 520px;
        }

        /* ── SERVICES PILLARS ── */
        .ai-automation-page .automation-pillars {
          background: #000;
        }

        .ai-automation-page .services-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 2rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .ai-automation-page .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(260px, 100%), 1fr));
          gap: 1.5px;
          border: 1.5px solid var(--border);
        }

        .ai-automation-page .service-card {
          background: var(--card-bg);
          padding: clamp(1.5rem, 3.5vw, 2.8rem);
          position: relative;
          transition: background 0.3s;
          cursor: default;
          overflow: hidden;
        }

        .ai-automation-page .service-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 2px;
          background: var(--gold);
          transition: width 0.4s ease;
        }

        .ai-automation-page .service-card:hover { background: #141414; }
        .ai-automation-page .service-card:hover::after { width: 100%; }

        .ai-automation-page .service-title {
          font-family: var(--font-head);
          font-size: clamp(1rem, 2vw, 1.2rem);
          color: var(--cream);
          margin-bottom: 0.75rem;
          line-height: 1.3;
          padding-right: 2.5rem;
        }

        .ai-automation-page .service-desc {
          font-size: 0.86rem;
          line-height: 1.75;
          color: rgba(245,240,232,0.55);
          font-weight: 300;
        }

        .ai-automation-page .service-num {
          position: absolute;
          top: 1.25rem; right: 1.25rem;
          font-family: var(--font-head);
          font-size: 0.68rem;
          color: var(--gold);
          letter-spacing: 0.1em;
          opacity: 0.55;
        }

        /* ── HOW IT WORKS ── */
        .ai-automation-page .how-it-works {
          background: #0d0d0d;
        }

        .ai-automation-page .hiw-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(2rem, 6vw, 6rem);
          align-items: start;
        }

        .ai-automation-page .hiw-left { position: sticky; top: 100px; }

        .ai-automation-page .hiw-line {
          width: 40px; height: 2px;
          background: var(--gold);
          margin: 1.25rem 0;
        }

        .ai-automation-page .hiw-steps {
          display: flex;
          flex-direction: column;
        }

        .ai-automation-page .step-item {
          display: flex;
          gap: 1.25rem;
          padding: 1.75rem 0;
          border-bottom: 1px solid var(--border);
          align-items: flex-start;
          transition: all 0.3s;
          cursor: default;
        }

        .ai-automation-page .step-item:first-child { border-top: 1px solid var(--border); }
        .ai-automation-page .step-item:hover .step-num { color: var(--gold); }

        .ai-automation-page .step-num {
          font-family: var(--font-head);
          font-size: 1.4rem;
          color: var(--gold-dim);
          min-width: 2.5rem;
          transition: color 0.3s;
          line-height: 1;
          padding-top: 0.1rem;
        }

        .ai-automation-page .step-title {
          font-family: var(--font-head);
          font-size: clamp(0.95rem, 2vw, 1.1rem);
          color: var(--cream);
          margin-bottom: 0.45rem;
        }

        .ai-automation-page .step-desc {
          font-size: 0.85rem;
          line-height: 1.7;
          color: rgba(245,240,232,0.5);
          font-weight: 300;
        }

        /* ── CATEGORIES ── */
        .ai-automation-page .categories-section {
          background: var(--black);
        }

        .ai-automation-page .cat-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .ai-automation-page .cat-header .section-desc {
          margin: 0.75rem auto 0;
        }

        .ai-automation-page .cat-tabs {
          display: flex;
          border: 1.5px solid var(--border);
          max-width: 700px;
          margin: 0 auto 2.5rem;
          flex-wrap: wrap;
        }

        .ai-automation-page .cat-tab {
          flex: 1;
          min-width: 90px;
          padding: 0.8rem 0.75rem;
          border: none;
          border-right: 1px solid var(--border);
          background: transparent;
          color: rgba(245,240,232,0.5);
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s;
        }

        .ai-automation-page .cat-tab:last-child { border-right: none; }

        .ai-automation-page .cat-tab.active {
          background: var(--gold);
          color: var(--black);
          font-weight: 600;
        }

        .ai-automation-page .cat-tab:not(.active):hover {
          color: var(--gold);
          background: rgba(201,168,76,0.06);
        }

        .ai-automation-page .cat-display {
          max-width: 700px;
          margin: 0 auto;
          border: 1.5px solid var(--border);
          padding: clamp(1.75rem, 4vw, 3.5rem);
          background: var(--card-bg);
          position: relative;
          overflow: hidden;
          min-height: 160px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .ai-automation-page .cat-display::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 3px; height: 100%;
          background: var(--gold);
        }

        .ai-automation-page .cat-name {
          font-family: var(--font-head);
          font-size: clamp(1.3rem, 4vw, 2.4rem);
          color: var(--cream);
          margin-bottom: 0.75rem;
          font-style: italic;
        }

        .ai-automation-page .cat-detail {
          font-size: 0.92rem;
          color: rgba(245,240,232,0.6);
          font-weight: 300;
          line-height: 1.7;
        }

        /* ── RESPONSIVE: TABLET ── */
        @media (max-width: 900px) {
          .ai-automation-page { --nav-h: 70px; }
          .ai-automation-page .hiw-inner { grid-template-columns: 1fr; }
          .ai-automation-page .hiw-left { position: static; }
        }

        /* ── RESPONSIVE: MOBILE ── */
        @media (max-width: 640px) {
          .ai-automation-page { --nav-h: 80px; }

          .ai-automation-page .hero {
            padding: 0px 2vw 20px;
            min-height: auto;
            justify-content: center;
          }

          .ai-automation-page .hero h1 { font-size: clamp(1.85rem, 9vw, 2.8rem); }
          .ai-automation-page .hero-sub { font-size: 0.9rem; }
          .ai-automation-page .hero-stats { gap: 1.25rem; }
          .ai-automation-page .divider { display: none; }
          .ai-automation-page .stat-num { font-size: 1.5rem; }
          .ai-automation-page .stat-label { font-size: 0.65rem; }

          .ai-automation-page .services-header {
            flex-direction: column;
            align-items: flex-start;
            margin-bottom: 2rem;
          }
          .ai-automation-page .services-grid { grid-template-columns: 1fr; }
          .ai-automation-page .service-card { padding: 1.5rem; }
          .ai-automation-page .step-item { gap: 1rem; padding: 1.25rem 0; }
          .ai-automation-page .step-num { font-size: 1.1rem; min-width: 2rem; }

          .ai-automation-page .cat-tab {
            flex: none;
            width: 50%;
            border-bottom: 1px solid var(--border);
          }
          .ai-automation-page .cat-tab:nth-child(2) { border-right: none; }
          .ai-automation-page .cat-tab:nth-child(3) { border-bottom: none; }
          .ai-automation-page .cat-tab:nth-child(4) { border-right: none; border-bottom: none; }
        }
      `}</style>

      {/* The wrapper div carries the scoping class */}
      <div className="ai-automation-page">

        {/* ══ HERO ══════════════════════════════════════════════════════════ */}
        <div className="hero aap-section" id="hero">
          
          {/* Navbar spacer - adjusted for more breathing room */}
          <div style={{
            display: "block", width: "100%", height: isMobile ? "100px" : "160px",
            flexShrink: 0, pointerEvents: "none", paddingTop: '0px'
          }} aria-hidden="true" />

          <div className="hero-grid" />
          <div className="hero-glow" />



          <h1>
            Automate Your Business<br />
            <em>Unlock True Leverage</em>
          </h1>
          <p className="hero-sub" style={{ marginTop: "10px" }}>
            From CRM pipelines to WhatsApp flows, Shiprocket logistics to AI integrations
            we build the automation infrastructure your business deserves.
          </p>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-num">100%</span>
              <span className="stat-label">Automation Coverage</span>
            </div>
            <div className="divider" />
            <div className="stat">
              <span className="stat-num">4</span>
              <span className="stat-label">Core Platforms</span>
            </div>
            <div className="divider" />
            <div className="stat">
              <span className="stat-num">∞</span>
              <span className="stat-label">Scale Potential</span>
            </div>
          </div>
        </div>

        {/* ══ SERVICES PILLARS ══════════════════════════════════════════════ */}
        <div className="automation-pillars aap-section" id="automation-pillars">
          <div className="services-header">
            <div>
              <span className="section-tag">What We Do</span>
              <h2 className="section-title">
                Four Pillars of<br />
                <em>Complete Automation</em>
              </h2>
            </div>
            <p className="section-desc">
              Each service is designed to eliminate manual work,
              reduce errors, and give your team back the time to focus on what truly matters.
            </p>
          </div>
          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <div className="service-card" key={i}>
                <span className="service-num">0{i + 1}</span>
                <h3 className="service-title">{s.title}</h3>
                <p className="service-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ══ HOW IT WORKS ══════════════════════════════════════════════════ */}
        <div className="how-it-works aap-section" id="how-it-works">
          <div className="hiw-inner">
            <div className="hiw-left">
              <span className="section-tag">The Process</span>
              <h2 className="section-title">
                How We Transform<br />
                <em>Your Business</em>
              </h2>
              <div className="hiw-line" />
              <p className="section-desc">
                Every engagement starts with understanding your unique business context.
                We don't sell generic solutions we engineer automation systems that fit
                precisely where your operations need them most.
              </p>
            </div>
            <div className="hiw-steps">
              {STEPS.map((s, i) => (
                <div className="step-item" key={i}>
                  <span className="step-num">{s.num}</span>
                  <div className="step-content">
                    <h4 className="step-title">{s.title}</h4>
                    <p className="step-desc">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ CATEGORIES ════════════════════════════════════════════════════ */}
        <div className="categories-section aap-section" id="categories">
          <div className="cat-header">
            <span className="section-tag">Automation Categories</span>
            <h2 className="section-title">Pick Your <em>Leverage</em></h2>
            <p className="section-desc">
              Choose from our four categories or combine them all for total business automation.
            </p>
          </div>
          <div className="cat-tabs">
            {CATEGORIES.map((c, i) => (
              <button
                key={i}
                className={`cat-tab ${activeCategory === i ? "active" : ""}`}
                onClick={() => setActiveCategory(i)}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="cat-display">
            <h3 className="cat-name">{CATEGORIES[activeCategory].label} Automation</h3>
            <p className="cat-detail">{CATEGORIES[activeCategory].detail}</p>
            <p className="cat-detail" style={{ marginTop: "0.75rem" }}>
              {SERVICES[activeCategory].desc}
            </p>
          </div>
        </div>

      </div>

      {/* ══ SERVICE SECTION — outside the scoped wrapper ══════════════════
          This ensures zero CSS bleed from .ai-automation-page styles       */}
      <ServiceSection />

      <ContactUsForm />
    </>
  );
}