import { useState, useEffect, useRef } from "react";
import ContactUsForm from "@/pages/ContactUsForm";
import ServiceSection from "@/components/HomePage/ServicesSection";

const styles = `

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --gold: #C9A84C;
    --gold-light: #E8CC7A;
    --gold-dim: rgba(201, 168, 76, 0.15);
    --gold-border: rgba(201, 168, 76, 0.3);
    --cream: #F5EDD6;
    --cream-dim: rgba(245, 237, 214, 0.08);
    --white: #FFFFFF;
    --white-dim: rgba(255,255,255,0.07);
    --glass: rgba(255, 255, 255, 0.04);
    --glass-border: rgba(255, 255, 255, 0.1);
    --bg: #080808;
    --bg2: #0D0D0D;
    --text-muted: rgba(245, 237, 214, 0.5);
  }

body {
    background: var(--bg);
    color: var(--cream);
    font-family: 'Inter', sans-serif;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  .sr-page { 
    min-height: min(100vh, var(--hero-max)); 
    background: var(--bg); 
    position: relative; 
    padding-top: 80px; /* Added padding to offset fixed header */
  }

  /* ─── NOISE OVERLAY ─── */
  .sr-page::before {
    content: '';
    position: fixed; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events: none; z-index: 0; opacity: 0.4;
  }

  /* ─── AMBIENT GLOW ORBS ─── */
  .orb {
    position: fixed; border-radius: 50%; filter: blur(120px);
    pointer-events: none; z-index: 0; animation: orbFloat 12s ease-in-out infinite;
  }
  .orb-1 { width: 600px; height: 600px; background: radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%); top: -200px; right: -150px; }
  .orb-2 { width: 500px; height: 500px; background: radial-gradient(circle, rgba(245,237,214,0.05) 0%, transparent 70%); bottom: 20%; left: -200px; animation-delay: -6s; }
  .orb-3 { width: 400px; height: 400px; background: radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%); top: 50%; right: 10%; animation-delay: -3s; }

  @keyframes orbFloat {
    0%, 100% { transform: translateY(0px) scale(1); }
    50% { transform: translateY(-30px) scale(1.05); }
  }

  /* ─── HERO ─── */
  .hero {
    position: relative; z-index: 1;
    min-height: min(80vh, var(--hero-max));
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    text-align: center;
    padding: 60px clamp(20px, 6vw, 100px) 80px !important; /* Added !important to override index.css global rule */
    overflow: hidden;
  }

  .hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--gold-dim);
    border: 1px solid var(--gold-border);
    border-radius: 100px;
    padding: 6px 16px;
    font-family: 'Inter', sans-serif;
    font-size: 11px; font-weight: 600;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--gold-light);
    margin-bottom: 32px;
    animation: fadeUp 0.8s ease both;
  }

  .badge-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--gold);
    animation: pulse 2s ease infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.8); }
  }

  .hero h1 {
    font-family: 'Libre Baskerville', serif;
    font-size: clamp(38px, 7vw, 90px);
    font-weight: 700;
    line-height: 1.08;
    letter-spacing: -0.02em;
    color: var(--white);
    max-width: 900px;
    margin-top: 40px;
    margin-bottom: 24px;
    animation: fadeUp 0.8s 0.15s ease both;
  }

  .hero h1 .gradient-text {
    background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 50%, var(--cream) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-sub {
    font-family: 'Inter', sans-serif;
    font-size: clamp(15px, 2vw, 18px);
    font-weight: 400; line-height: 1.7;
    color: var(--text-muted);
    max-width: 580px;
    margin-bottom:0px;
    animation: fadeUp 0.8s 0.3s ease both;
  }

  .hero-actions {
    display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;
    animation: fadeUp 0.8s 0.45s ease both;
  }

  .btn-primary {
    background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%);
    color: #0D0900;
    border: none; cursor: pointer;
    font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 700;
    letter-spacing: 0.04em;
    padding: 14px 32px; border-radius: 8px;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 0 40px rgba(201,168,76,0.25);
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 50px rgba(201,168,76,0.4); }

  .btn-secondary {
    background: var(--glass);
    color: var(--cream);
    border: 1px solid var(--glass-border); cursor: pointer;
    font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 500;
    padding: 14px 32px; border-radius: 8px;
    backdrop-filter: blur(10px);
    transition: border-color 0.3s, background 0.3s;
  }
  .btn-secondary:hover { border-color: var(--gold-border); background: var(--gold-dim); }

  /* Hero metrics strip */
  .hero-metrics {
    display: flex; gap: clamp(24px, 4vw, 64px);
    margin-top: 72px; flex-wrap: wrap; justify-content: center;
    animation: fadeUp 0.8s 0.6s ease both;
  }

  .metric {
    text-align: center;
  }

  .metric-val {
    font-family: 'Libre Baskerville', serif;
    font-size: clamp(26px, 3.5vw, 40px);
    font-weight: 700;
    background: linear-gradient(135deg, var(--gold), var(--gold-light));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    display: block;
  }

  .metric-label {
    font-family: 'Inter', sans-serif;
    font-size: 12px; font-weight: 500;
    color: var(--text-muted);
    letter-spacing: 0.08em; text-transform: uppercase;
    margin-top: 4px; display: block;
  }

  /* ─── SECTION WRAPPER ─── */
  .section {
    position: relative; z-index: 1;
    padding: clamp(60px, 8vw, 120px) clamp(20px, 6vw, 100px);
  }

  .section-inner { max-width: 1200px; margin: 0 auto; }

  .section-tag {
    font-family: 'Inter', sans-serif;
    font-size: 11px; font-weight: 600;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 16px;
    display: flex; align-items: center; gap: 10px;
  }
  .section-tag::before {
    content: ''; display: block;
    width: 28px; height: 1px; background: var(--gold);
  }

  .section-title {
    font-family: 'Libre Baskerville', serif;
    font-size: clamp(28px, 4vw, 54px);
    font-weight: 700; line-height: 1.15;
    letter-spacing: -0.02em;
    color: var(--white);
    margin-bottom: 16px;
  }

  .section-title .gold { color: var(--gold-light); }

  .section-desc {
    font-family: 'Inter', sans-serif;
    font-size: clamp(14px, 1.5vw, 16px);
    line-height: 1.8; font-weight: 400;
    color: var(--text-muted);
    max-width: 560px;
  }

  /* ─── WHAT IS SHIPROCKET ─── */
  .what-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(32px, 4vw, 80px);
    align-items: center;
    margin-top: 64px;
  }

  .what-visual {
    position: relative;
  }

  .what-card-main {
    background: var(--glass);
    border: 1px solid var(--glass-border);
    border-radius: 20px;
    padding: 32px;
    backdrop-filter: blur(10px);
    position: relative; overflow: hidden;
  }

  .what-card-main::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
  }

  .ship-icon-large {
    font-size: 56px; margin-bottom: 20px; display: block;
  }

  .what-card-title {
    font-family: 'Libre Baskerville', serif;
    font-size: 22px; font-weight: 700;
    color: var(--white); margin-bottom: 12px;
  }

  .what-card-text {
    font-family: 'Inter', sans-serif;
    font-size: 14px; line-height: 1.8;
    color: var(--text-muted);
  }

  .what-card-mini {
    position: absolute;
    bottom: -24px; right: -24px;
    background: linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05));
    border: 1px solid var(--gold-border);
    border-radius: 14px;
    padding: 16px 20px;
    backdrop-filter: blur(10px);
    min-width: 160px;
  }

  .mini-val {
    font-family: 'Libre Baskerville', serif;
    font-size: 28px; font-weight: 700;
    color: var(--gold-light);
  }
  .mini-lbl {
    font-family: 'Inter', sans-serif;
    font-size: 11px; color: var(--text-muted); margin-top: 2px;
    letter-spacing: 0.06em;
  }

  .what-points {
    display: flex; flex-direction: column; gap: 20px;
    margin-top: 32px;
  }

  .what-point {
    display: flex; gap: 16px; align-items: flex-start;
  }

  .point-icon {
    width: 44px; height: 44px; min-width: 44px;
    border-radius: 12px;
    background: var(--gold-dim);
    border: 1px solid var(--gold-border);
    display: flex; align-items: center; justify-content: center;
    font-size: 20px;
  }

  .point-title {
    font-family: 'Inter', sans-serif;
    font-size: 15px; font-weight: 600;
    color: var(--cream); margin-bottom: 4px;
  }

  .point-desc {
    font-family: 'Inter', sans-serif;
    font-size: 13px; line-height: 1.7;
    color: var(--text-muted);
  }

  /* ─── DIVIDER ─── */
  .divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--glass-border) 20%, var(--gold-border) 50%, var(--glass-border) 80%, transparent);
    margin: 0 clamp(20px, 6vw, 100px);
    position: relative; z-index: 1;
  }

  /* ─── HOW IT WORKS ─── */
  .steps-header {
    text-align: center;
    margin-bottom: 72px;
  }

  .steps-header .section-tag { justify-content: center; }
  .steps-header .section-tag::before { display: none; }
  .steps-header .section-title { margin: 0 auto; }
  .steps-header .section-desc { margin: 16px auto 0; text-align: center; }

  .steps-flow {
    position: relative;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }

  /* connector line */
  .steps-flow::before {
    content: '';
    position: absolute;
    top: 52px; left: 12.5%; right: 12.5%;
    height: 1px;
    background: linear-gradient(90deg, var(--gold-border), var(--gold), var(--gold-border));
    z-index: 0;
  }

  .step-card {
    position: relative; z-index: 1;
    background: var(--glass);
    border: 1px solid var(--glass-border);
    border-radius: 18px;
    padding: 28px 22px;
    backdrop-filter: blur(10px);
    text-align: center;
    transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
    cursor: default;
  }

  .step-card:hover {
    border-color: var(--gold-border);
    transform: translateY(-6px);
    box-shadow: 0 20px 60px rgba(201,168,76,0.12);
  }

  .step-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold-border), transparent);
    border-radius: 18px 18px 0 0;
    opacity: 0;
    transition: opacity 0.3s;
  }
  .step-card:hover::before { opacity: 1; }

  .step-num {
    width: 48px; height: 48px;
    background: linear-gradient(135deg, var(--gold), var(--gold-light));
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Libre Baskerville', serif;
    font-size: 18px; font-weight: 700;
    color: #0D0900;
    margin: 0 auto 20px;
    box-shadow: 0 0 30px rgba(201,168,76,0.3);
  }

  .step-emoji { font-size: 28px; display: block; margin-bottom: 14px; }

  .step-title {
    font-family: 'Libre Baskerville', serif;
    font-size: 16px; font-weight: 700;
    color: var(--white); margin-bottom: 10px;
  }

  .step-desc {
    font-family: 'Inter', sans-serif;
    font-size: 13px; line-height: 1.7;
    color: var(--text-muted);
  }

  /* ─── INTEGRATION ─── */
  .integration-grid {
    display: grid;
    grid-template-columns: 1fr 1.1fr;
    gap: clamp(32px, 5vw, 80px);
    align-items: start;
    margin-top: 64px;
  }

  .int-code-block {
    background: rgba(0,0,0,0.6);
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    overflow: hidden;
    backdrop-filter: blur(10px);
  }

  /* ─── ANIMATIONS ─── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .reveal {
    opacity: 0; transform: translateY(32px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  .reveal-delay-1 { transition-delay: 0.1s; }
  .reveal-delay-2 { transition-delay: 0.2s; }
  .reveal-delay-3 { transition-delay: 0.3s; }
  .reveal-delay-4 { transition-delay: 0.4s; }

  /* ─── RESPONSIVE ─── */
  @media (max-width: 1024px) {
    .what-grid { grid-template-columns: 1fr; }
    .what-visual { max-width: 500px; margin: 0 auto; }
    .integration-grid { grid-template-columns: 1fr; }
    .steps-flow { grid-template-columns: repeat(2, 1fr); }
    .steps-flow::before { display: none; }
  }

  @media (max-width: 768px) {
    .sr-page { padding-top: 60px; }
    .hero { padding-top: 40px !important; }
    .hero h1 { margin-top: 20px; }
    .hero-metrics { gap: 28px; }
    .what-card-mini { position: static; margin-top: 16px; }
  }

  @media (max-width: 500px) {
    .steps-flow { grid-template-columns: 1fr; }
    .hero-actions { flex-direction: column; align-items: center; }
    .steps-header .section-title { white-space: nowrap; font-size: clamp(18px, 6.5vw, 26px); }
  }
`;

export default function LogisticIntegration() {
  const revealRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    revealRefs.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const addRef = (i: number) => (el: HTMLDivElement | null) => { revealRefs.current[i] = el; };

  return (
    <>
      <style>{styles}</style>
      <div className="sr-page">
        {/* Ambient orbs */}
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        {/* ── HERO ── */}
        <section className="hero" id="top">

          <h1>
            Logistics Made<br />
            <span className="gradient-text">Effortlessly Powerful</span>
          </h1>



          <p className="hero-sub">
            Shiprocket unifies 25+ courier partners into a single, intelligent platform giving your e-commerce business the logistics backbone it deserves.
          </p>

          <div className="hero-metrics">
            {[
              { val: "25+", label: "Courier Partners" },
              { val: "29,000+", label: "Pincodes Covered" },
              { val: "2,20,000+", label: "Merchants Trust Us" },
              { val: "1B+", label: "Shipments Processed" },
            ].map((m, i) => (
              <div className="metric" key={i}>
                <span className="metric-val">{m.val}</span>
                <span className="metric-label">{m.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── WHAT IS SHIPROCKET ── */}
        <section className="section" id="what">
          <div className="section-inner">
            <div ref={addRef(0)} className="reveal">
              <div className="section-tag">About the Platform</div>
              <h2 className="section-title">What is <span className="gold">Shiprocket?</span></h2>
              <p className="section-desc">
                An all-in-one logistics intelligence layer that automates shipping, tracks orders in real-time, and optimises costs so you never juggle courier dashboards again.
              </p>
            </div>

            <div className="what-grid">
              <div ref={addRef(1)} className="reveal reveal-delay-1 what-visual">
                <div className="what-card-main">
                  <div className="what-card-title">One Platform. Every Courier.</div>
                  <p className="what-card-text">
                    Shiprocket aggregates India's leading courier services BlueDart, Delhivery, FedEx, DTDC, XpressBees, and 20+ more into a unified API. You ship smarter. They compete on your behalf.
                  </p>
                </div>

              </div>

              <div ref={addRef(2)} className="reveal reveal-delay-2 what-points">
                {[
                  { title: "Smart Courier Recommendation", desc: "AI picks the best courier for each order based on weight, destination, delivery speed, and cost automatically." },
                  { title: "Unified Dashboard", desc: "Track all shipments across all couriers in one clean interface. No more tab-switching or manual reconciliation." },
                  { title: "Real-Time NDR Management", desc: "Automated non-delivery resolution workflows that reduce RTO (Return to Origin) rates by up to 45%." },
                  { title: "Global Shipping Support", desc: "Expand internationally with cross-border shipping to 220+ countries through a single integration." },
                ].map((p, i) => (
                  <div className="what-point" key={i}>
                    <div className="point-icon">✦</div>
                    <div>
                      <div className="point-title">{p.title}</div>
                      <div className="point-desc">{p.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ── HOW IT WORKS ── */}
        <section className="section" id="how">
          <div className="section-inner">
            <div ref={addRef(3)} className="reveal steps-header">
              <div className="section-tag">The Flow</div>
              <h2 className="section-title">How Shiprocket <span className="gold">Works</span></h2>
              <p className="section-desc">
                From order creation to doorstep delivery four intelligent steps that run on autopilot.
              </p>
            </div>

            <div className="steps-flow">
              {[
                { num: "01", title: "Order Created", desc: "Customer places order on your store. Shiprocket receives it instantly via API, webhook, or platform sync." },
                { num: "02", title: "Courier Assigned", desc: "AI engine evaluates 25+ couriers on rate, ETA, serviceability, and performance history picks the best." },
                { num: "03", title: "Label Generated", desc: "Pickup scheduled, AWB number generated, and shipping label printed all within seconds of confirmation." },
                { num: "04", title: "Live Tracking", desc: "End-to-end tracking updates pushed to your dashboard and customers via WhatsApp, email, or SMS." },
              ].map((s, i) => (
                <div ref={addRef(4 + i)} className={`reveal reveal-delay-${i + 1} step-card`} key={i}>
                  <div className="step-num">{s.num}</div>
                  <div className="step-title">{s.title}</div>
                  <p className="step-desc">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider" />
      </div>
      <ServiceSection />
      <ContactUsForm />
    </>
  );
}
