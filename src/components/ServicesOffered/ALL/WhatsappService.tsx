import React, { useEffect, useRef } from "react";
import ServiceSection from "@/components/ServicesSection";
import ContactUsForm from "@/pages/ContactUsForm";
import SEO from "@/components/SEO";
import { pageSEO } from "@/seo/pageSEO";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --black-bg:     #0A0A0A;
    --black-deep:   #050505;
    --cream:        #FAF6EE;
    --cream-2:      #F3EDD8;
    --cream-3:      #EDE4CC;
    --gold:         #B8963E;
    --gold-light:   #D4AE5A;
    --gold-dim:     rgba(184,150,62,0.12);
    --gold-border:  rgba(184,150,62,0.30);
    --ink:          #F5F0E6;
    --ink-2:        #E8E0D2;
    --muted:        #C8BFA8;
    --divider:      rgba(184,150,62,0.22);
    --white:        #FFFFFF;
    --card-bg:      #111111;
    --surface:      #0F0F0F;
    --font-head:    'Libre Baskerville', Georgia, serif;
    --font-body:    'Inter', sans-serif;
  }

  body {
    background: var(--black-bg);
  }

  .wa-page {
    background: var(--black-bg);
    color: var(--cream);
    font-family: var(--font-body);
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  /* ─── HERO ────────────────────────────────────────── */
  .wa-hero {
    padding: 150px 80px 80px;
    text-align: center;
    position: relative;
    overflow: hidden;
    background: var(--black-bg);
  }
  .wa-hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 60% 55% at 50% 0%,
      rgba(184,150,62,0.18) 0%, transparent 70%);
    pointer-events: none;
  }
  .wa-hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--gold-dim);
    border: 1px solid var(--gold-border);
    padding: 6px 24px;
    border-radius: 100px;
    font-size: 10.5px;
    font-weight: 600;
    color: var(--gold-light);
    letter-spacing: 1.8px;
    text-transform: uppercase;
    margin-bottom: 34px;
    position: relative;
  }
  .wa-hero h1 {
    font-family: var(--font-head);
    font-size: clamp(40px, 6vw, 78px);
    font-weight: 700;
    line-height: 1.07;
    letter-spacing: -2.5px;
    color: var(--cream);
    max-width: 820px;
    margin: 0 auto 26px;
    position: relative;
  }
  .wa-hero h1 em { font-style: italic; color: var(--gold); }
  .wa-hero-sub {
    font-size: 18px;
    line-height: 1.85;
    color: var(--muted);
    max-width: 540px;
    margin: 0 auto 48px;
    font-weight: 400;
    position: relative;
  }
  .wa-hero-btns {
    display: flex;
    gap: 14px;
    justify-content: center;
    flex-wrap: wrap;
    position: relative;
  }
  .wa-btn-gold {
    background: var(--gold);
    color: #0A0A0A;
    border: none;
    padding: 15px 36px;
    border-radius: 8px;
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    letter-spacing: .2px;
    transition: background .2s, transform .2s, box-shadow .2s;
  }
  .wa-btn-gold:hover {
    background: var(--gold-light);
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(184,150,62,0.28);
  }
  .wa-btn-outline {
    background: transparent;
    color: var(--cream);
    border: 1.5px solid var(--gold-border);
    padding: 15px 36px;
    border-radius: 8px;
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: border-color .2s, transform .2s;
  }
  .wa-btn-outline:hover { border-color: var(--gold); transform: translateY(-1px); color: var(--gold-light); }

  .wa-hero-img {
    max-width: 1040px;
    margin: 72px auto 0;
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid var(--divider);
  }
  .wa-hero-img img { width: 100%; display: block; }

  /* ─── PARTNER STRIP ───────────────────────────────── */
  .wa-strip {
    background: var(--black-bg);
    border-top: 1px solid var(--divider);
    border-bottom: 1px solid var(--divider);
    padding: 48px 80px;
    text-align: center;
  }
  .wa-strip-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 3.5px;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 36px;
  }
  .wa-strip-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 60px;
    flex-wrap: wrap;
  }
  .wa-strip-partner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
  .wa-strip-logo-img {
    overflow: hidden;
  }
  .wa-strip-logo-img img {
    height: 32px; width: auto; display: block;
    opacity: .85; transition: opacity .2s;
  }
  .wa-strip-partner:hover .wa-strip-logo-img img { opacity: 1; }
  .wa-strip-name {
    font-family: var(--font-head);
    font-size: 22px;
    font-weight: 700;
    letter-spacing: -.4px;
    color: var(--cream);
  }
  .wa-strip-tag {
    font-size: 9.5px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--gold);
    background: var(--gold-dim);
    border: 1px solid var(--gold-border);
    padding: 3px 10px;
    border-radius: 100px;
  }
  .wa-strip-vr { width: 1px; height: 56px; background: var(--divider); }

  /* ─── STATS ───────────────────────────────────────── */
  .wa-stats { background: var(--black-bg); border-bottom: 1px solid var(--divider); }
  .wa-stats-grid {
    display: grid;
    grid-template-columns: repeat(4,1fr);
    max-width: 1200px;
    margin: 0 auto;
  }
  .wa-stat {
    padding: 52px 36px;
    text-align: center;
    border-right: 1px solid var(--divider);
    background: var(--black-bg);
  }
  .wa-stat:last-child { border-right: none; }
  .wa-stat-num {
    display: block;
    font-family: var(--font-head);
    font-size: clamp(36px, 4vw, 54px);
    font-weight: 700;
    color: var(--gold);
    letter-spacing: -2px;
    margin-bottom: 10px;
    line-height: 1;
  }
  .wa-stat-txt { font-size: 14px; color: var(--muted); line-height: 1.65; max-width: 130px; margin: 0 auto; }

  /* ─── SECTION SHELL ───────────────────────────────── */
  .wa-sec { max-width: 100%; margin: 0 auto; padding: 90px 80px;  background: var(--black-bg); }
  .wa-sec-eyebrow {
    font-size: 10px; font-weight: 600; letter-spacing: 3.5px;
    text-transform: uppercase; color: var(--gold); margin-bottom: 16px;
    
  }
  .wa-sec-h2 {
    font-family: var(--font-head);
    font-size: clamp(28px, 3.5vw, 46px);
    font-weight: 700; line-height: 1.12; letter-spacing: -1.4px;
    color: var(--cream); margin-bottom: 16px;
  }
  .wa-sec-sub { font-size: 16.5px; line-height: 1.8; color: var(--muted); max-width: 480px; }

  /* ─── SERVICES ────────────────────────────────────── */
  .wa-services-bg {
    background: var(--surface);
    border-top: 1px solid var(--divider);
    border-bottom: 1px solid var(--divider);
  }
  .wa-services-hdr {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: end;
    margin-bottom: 56px;
  }
  .wa-services-grid {
    display: grid;
    grid-template-columns: repeat(3,1fr);
    gap: 1px;
    background: var(--divider);
    border: 1px solid var(--divider);
    border-radius: 16px;
    overflow: hidden;
  }
  .wa-svc-card {
    background: var(--card-bg);
    padding: 38px 34px;
    transition: background .2s;
  }
  .wa-svc-card:hover { background: #1a1a1a; }
  .wa-svc-icon-img {
    width: 44px; height: 44px;
    overflow: hidden; margin-bottom: 20px; border-radius: 10px;
  }
  .wa-svc-icon-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .wa-svc-icon-emoji {
    width: 44px; height: 44px;
    border-radius: 10px;
    background: var(--gold-dim);
    border: 1px solid var(--gold-border);
    display: flex; align-items: center; justify-content: center;
    font-size: 19px; margin-bottom: 20px;
  }
  .wa-svc-card h3 {
    font-family: var(--font-head);
    font-size: 17px; font-weight: 700; color: var(--cream);
    margin-bottom: 10px; letter-spacing: -.3px;
  }
  .wa-svc-card p { font-size: 14.5px; line-height: 1.75; color: var(--muted); }

  /* ─── PARTNER SHOWCASE ────────────────────────────── */
  .wa-pshowcase { border-top: 1px solid var(--divider); padding: 90px 80px; background: var(--black-bg); }
  .wa-pshowcase.alt { background: var(--black-bg); }
  .wa-pshowcase-inner {
    max-width: 1200px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 80px; align-items: center;
  }
  .wa-pshowcase.alt .wa-pshowcase-inner { direction: rtl; }
  .wa-pshow-info, .wa-pshow-visual { direction: ltr; }

  .wa-p-pill {
    display: inline-flex; align-items: center; gap: 7px;
    background: var(--gold-dim); border: 1px solid var(--gold-border);
    padding: 5px 15px; border-radius: 100px;
    font-size: 10px; font-weight: 600; color: var(--gold-light);
    letter-spacing: 1.6px; text-transform: uppercase; margin-bottom: 26px;
  }
  .wa-pshow-info h2 {
    font-family: var(--font-head);
    font-size: clamp(24px, 3vw, 38px);
    font-weight: 700; line-height: 1.14; letter-spacing: -1px;
    color: var(--cream); margin-bottom: 18px;
  }
  .wa-pshow-info > p {
    font-size: 15.5px; line-height: 1.85; color: var(--muted); margin-bottom: 28px;
  }
  .wa-feat-list { list-style: none; display: flex; flex-direction: column; gap: 12px; margin-bottom: 34px; }
  .wa-feat-list li {
    display: flex; align-items: flex-start; gap: 11px;
    font-size: 14.5px; color: var(--ink-2); line-height: 1.65;
  }
  .wa-feat-tick {
    flex-shrink: 0; width: 18px; height: 18px; border-radius: 50%;
    background: var(--gold-dim); border: 1px solid var(--gold-border);
    display: flex; align-items: center; justify-content: center;
    font-size: 8.5px; color: var(--gold); font-weight: 700; margin-top: 2px;
  }
  .wa-mini-stats {
    display: flex; gap: 32px;
    padding-top: 28px; border-top: 1px solid var(--divider); flex-wrap: wrap;
  }
  .wa-mini-stat strong {
    display: block; font-family: var(--font-head);
    font-size: 26px; font-weight: 700; color: var(--gold);
    letter-spacing: -1px; margin-bottom: 4px; line-height: 1;
  }
  .wa-mini-stat span { font-size: 12px; color: var(--muted); letter-spacing: .2px; }

  .wa-pshow-visual {
    border-radius: 18px; overflow: hidden;
    border: 1px solid var(--divider);
    box-shadow: 0 20px 60px rgba(184,150,62,0.10);
  }
  .wa-pshow-visual img { width: 100%; display: block; }

  /* ─── CAPABILITIES ────────────────────────────────── */
  .wa-caps-bg {
    background: var(--surface);
    border-top: 1px solid var(--divider);
    border-bottom: 1px solid var(--divider);
  }
  .wa-caps-hdr {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 60px; align-items: end; margin-bottom: 56px;
  }
  .wa-caps-grid {
    display: grid; grid-template-columns: repeat(2,1fr);
    gap: 1px; background: var(--divider);
    border: 1px solid var(--divider); border-radius: 16px; overflow: hidden;
  }
  .wa-cap-card { background: var(--card-bg); padding: 44px 40px; transition: background .2s; }
  .wa-cap-card:hover { background: #1a1a1a; }
  .wa-cap-num {
    font-family: var(--font-head); font-size: 48px; font-weight: 700;
    color: rgba(184,150,62,0.18); letter-spacing: -2px; line-height: 1; margin-bottom: 18px;
  }
  .wa-cap-card h3 {
    font-family: var(--font-head); font-size: 19px; font-weight: 700;
    color: var(--cream); margin-bottom: 11px; letter-spacing: -.3px;
  }
  .wa-cap-card p { font-size: 14.5px; line-height: 1.75; color: var(--muted); }

  /* ─── STEPS ───────────────────────────────────────── */
  .wa-how-bg {
    background: var(--black-bg);
    border-top: 1px solid var(--divider);
    border-bottom: 1px solid var(--divider);
  }
  .wa-how-hdr { text-align: center; margin-bottom: 64px; }
  .wa-how-hdr .wa-sec-sub { margin: 14px auto 0; text-align: center; max-width: 440px; }
  .wa-steps {
    display: grid; grid-template-columns: repeat(4,1fr);
    gap: 1px; background: var(--divider);
    border: 1px solid var(--divider); border-radius: 16px; overflow: hidden;
  }
  .wa-step { background: var(--card-bg); padding: 38px 30px; transition: background .2s; }
  .wa-step:hover { background: #1a1a1a; }
  .wa-step-dot {
    width: 36px; height: 36px; border-radius: 50%;
    background: var(--gold-dim); border: 1px solid var(--gold-border);
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-head); font-size: 12px; font-weight: 700;
    color: var(--gold); margin-bottom: 20px;
  }
  .wa-step h3 {
    font-family: var(--font-head); font-size: 16px; font-weight: 700;
    color: var(--cream); margin-bottom: 9px; letter-spacing: -.2px;
  }
  .wa-step p { font-size: 14px; line-height: 1.75; color: var(--muted); }

  /* ─── CTA ─────────────────────────────────────────── */
  .wa-cta {
    background: linear-gradient(135deg, #0F0F0F 0%, #080808 100%);
    padding: 110px 80px;
    text-align: center;
    position: relative;
    overflow: hidden;
    border-top: 1px solid var(--divider);
  }
  .wa-cta::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 55% 60% at 50% 100%,
      rgba(184,150,62,0.12) 0%, transparent 68%);
    pointer-events: none;
  }
  .wa-cta-inner { max-width: 660px; margin: 0 auto; position: relative; }
  .wa-cta-inner .wa-sec-eyebrow { color: var(--gold-light); }
  .wa-cta-inner h2 {
    font-family: var(--font-head);
    font-size: clamp(32px, 5vw, 56px);
    font-weight: 700; line-height: 1.1;
    letter-spacing: -2px; color: var(--cream); margin-bottom: 20px;
  }
  .wa-cta-inner h2 em { font-style: italic; color: var(--gold-light); }
  .wa-cta-inner p {
    font-size: 16.5px; line-height: 1.85;
    color: var(--muted); margin-bottom: 44px;
  }
  .wa-cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
  .wa-cta .wa-btn-outline { color: var(--cream); border-color: var(--gold-border); }
  .wa-cta .wa-btn-outline:hover { border-color: var(--gold-light); color: var(--gold-light); }

  /* ─── RESPONSIVE ──────────────────────────────────── */
  @media (max-width: 1024px) {
    .wa-hero  { padding: 100px 40px 64px; }
    .wa-strip { padding: 40px 40px; }
    .wa-stats-grid { grid-template-columns: repeat(2,1fr); }
    .wa-stat  { border-right: none; border-bottom: 1px solid var(--divider); }
    .wa-stat:nth-child(odd) { border-right: 1px solid var(--divider); }
    .wa-stat:nth-child(3)   { border-bottom: none; }
    .wa-stat:last-child     { border-bottom: none; }
    .wa-sec   { padding: 70px 40px; }
    .wa-services-hdr { grid-template-columns: 1fr; gap: 24px; }
    .wa-services-grid { grid-template-columns: repeat(2,1fr); }
    .wa-pshowcase { padding: 70px 40px; }
    .wa-pshowcase-inner { gap: 50px; }
    .wa-caps-bg .wa-sec { padding: 70px 40px; }
    .wa-caps-hdr { grid-template-columns: 1fr; gap: 24px; }
    .wa-how-bg .wa-sec { padding: 70px 40px; }
    .wa-steps { grid-template-columns: repeat(2,1fr); }
    .wa-cta   { padding: 80px 40px; }
  }

  @media (max-width: 768px) {
    /* ── HERO: push content well below fixed header ── */
    .wa-hero {
      padding: 100px 24px 56px;
      min-height: auto;
    }
    .wa-hero-badge {
      font-size: 9px;
      padding: 4px 20px;
      letter-spacing: 1.2px;
      margin-bottom: 24px;   /* ← was 100px — caused the overlap */
    }
    .wa-hero h1 {
      font-size: clamp(28px, 7vw, 44px);
      letter-spacing: -1.5px;
      margin-bottom: 20px;
    }
    .wa-hero-sub {
      font-size: 15px;
      line-height: 1.75;
      margin-bottom: 36px;
      max-width: 100%;
    }
    .wa-hero-btns { flex-direction: column; }
    .wa-btn-gold, .wa-btn-outline {
      width: 100%;
      text-align: center;
      padding: 14px 28px;
    }

    .wa-strip { padding: 36px 24px; }
    .wa-strip-row { gap: 28px; }
    .wa-strip-vr { display: none; }

    .wa-stats-grid {
      display: flex !important;
      flex-direction: row !important;
      justify-content: center;
      align-items: stretch;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
    }
    .wa-stats-grid::-webkit-scrollbar { display: none; }
    .wa-stat {
      flex: 1 0 0 !important;
      min-width: 0 !important;
      padding: 28px 8px !important;
      border-right: 1px solid var(--divider) !important;
      border-bottom: none !important;
      text-align: center;
    }
    .wa-stat:last-child { border-right: none !important; }
    .wa-stat-num {
      font-size: clamp(20px, 4.5vw, 30px) !important;
      letter-spacing: -1px;
      margin-bottom: 6px;
    }
    .wa-stat-txt { font-size: 11px; line-height: 1.45; max-width: 68px; }

    .wa-sec  { padding: 56px 24px; }
    .wa-services-grid { grid-template-columns: 1fr; }
    .wa-pshowcase { padding: 56px 24px; }
    .wa-pshowcase-inner {
      grid-template-columns: 1fr;
      direction: ltr !important;
      gap: 36px;
    }
    .wa-mini-stats { gap: 18px; }
    .wa-caps-bg .wa-sec { padding: 56px 24px; }
    .wa-caps-grid { grid-template-columns: 1fr; }
    .wa-how-bg .wa-sec { padding: 56px 24px; }
    .wa-steps { grid-template-columns: 1fr; }
    .wa-cta { padding: 64px 24px; }
    .wa-cta-btns { flex-direction: column; }
    .wa-cta .wa-btn-gold, .wa-cta .wa-btn-outline { width: 100%; }
  }

  @media (max-width: 480px) {
    .wa-hero {
      padding: 120px 16px 48px;  /* ← enough room below any fixed header */
    }
    .wa-hero-badge {
      margin-bottom: 24px;       /* ← consistent, no big gap */
    }
    .wa-hero h1 { font-size: clamp(26px, 7vw, 36px); }
    .wa-hero-sub { font-size: 14px; margin-bottom: 28px; }

    .wa-stats-grid {
      display: flex !important;
      flex-direction: row !important;
    }
    .wa-stat {
      padding: 18px 5px !important;
      border-right: 1px solid var(--divider) !important;
      border-bottom: none !important;
    }
    .wa-stat:last-child { border-right: none !important; }
    .wa-stat-num { font-size: clamp(16px, 4vw, 22px) !important; }
    .wa-stat-txt { font-size: 10px; max-width: 52px; }
  }
`;

/* ── DATA ─────────────────────────────────────────────── */
const services = [
  { emoji: "📢", title: "Broadcast Campaigns",   desc: "Reach thousands with personalised WhatsApp messages that achieve 90%+ open rates — far beyond email." },
  { emoji: "🤖", title: "AI Chatbots",           desc: "No-code bots that handle FAQs, qualify leads and resolve tickets 24 / 7 with instant responses." },
  { emoji: "👥", title: "Shared Team Inbox",     desc: "One unified inbox for your entire support team — assign, track and close conversations at scale." },
  { emoji: "⚡", title: "Smart Automations",     desc: "Trigger flows for abandoned carts, onboarding, re-engagement and post-purchase follow-ups automatically." },
  { emoji: "🛒", title: "Commerce Integrations", desc: "Connect Shopify, WooCommerce and payment gateways to send order alerts and collect payments on WhatsApp." },
  { emoji: "🔗", title: "60 + Integrations",     desc: "Plug in your CRM, helpdesk and analytics — HubSpot, Salesforce, Freshdesk, Razorpay and more." },
];

const interaktFeatures = [
  "Bulk messaging with RCS-enhanced delivery optimisation",
  "Launch WhatsApp & Instagram chatbots with zero code",
  "Built-in CRM sales pipeline to track and close leads",
  "60 + integrations including Shopify, HubSpot and Salesforce",
  "Campaign analytics — open rates, CTRs and conversions",
];

const watiFeatures = [
  "Personalised broadcasts to unlimited contacts instantly",
  "No-code chatbot builder for 24 / 7 automated support",
  "Multi-agent shared inbox with smart routing and reporting",
  "Low-code automation flows for campaigns and re-engagement",
  "WhatsApp Click-to-Ad campaigns integrated with Meta",
];

const capabilities = [
  { n: "01", title: "Certified Partner Access",  desc: "As official partners of Interakt and Wati we unlock priority onboarding, exclusive features and dedicated account support for your brand." },
  { n: "02", title: "Strategy & Consultation",   desc: "We map your customer journey first — then architect WhatsApp flows that convert at every stage from awareness to repeat purchase." },
  { n: "03", title: "End-to-End Setup",          desc: "API activation, chatbot scripting, campaign design, CRM integration and team training — we manage everything start to finish." },
  { n: "04", title: "Continuous Optimisation",   desc: "We monitor delivery rates, open rates and revenue metrics and refine your campaigns continuously to maximise long-term ROI." },
];

const steps = [
  { n: "01", title: "Discovery Call",   desc: "We understand your goals, current stack and customer journey to recommend the right WhatsApp strategy." },
  { n: "02", title: "Platform Setup",   desc: "We activate your WhatsApp Business API, configure the dashboard and integrate with your existing tools." },
  { n: "03", title: "Build & Launch",   desc: "Chatbots, automations and broadcast campaigns — tested and live in the shortest possible time." },
  { n: "04", title: "Scale & Optimise", desc: "Ongoing reviews, A/B tests and campaign refinements ensure sustained growth and measurable results." },
];

/* ── COMPONENT ────────────────────────────────────────── */
const WhatsAppServicesPage: React.FC = () => {
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const s = document.createElement("style");
    s.innerHTML = css;
    document.head.appendChild(s);
    return () => { document.head.removeChild(s); };
  }, []);

  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="pt-20 md:pt-1" >
      <SEO {...pageSEO.whatsappFlow} />

      {/* ── HERO ── */}
      <section className="wa-hero" >
        
        <h1 style={{marginTop:100}}>Connect. Convert.<br /><em>Grow</em> on WhatsApp.</h1>
        <p className="wa-hero-sub">
          We deliver enterprise-grade WhatsApp Business solutions - powered by
          Interakt &amp; Wati - helping brands scale marketing, automate support
          and win more deals.
        </p>
        
        {/* ✅ FIX: removed style={{ display: "none" }} */}
        <div className="wa-hero-img">
          <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/bannerint.webp" alt="WhatsApp Business Dashboard"  loading="lazy" decoding="async" />
        </div>
      </section>

      {/* ── CERTIFIED PARTNER STRIP ── */}
      <div className="wa-strip">
        <p className="wa-strip-label">Certified Solution Partners</p>
        <div className="wa-strip-row">
          <div className="wa-strip-partner">
            {/* ✅ FIX: removed style={{ display: "none" }} */}
            <div className="wa-strip-logo-img">
              <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/interaktlogo.png" alt="Interakt"  loading="lazy" decoding="async" />
            </div>
            <span className="wa-strip-name">Interakt</span>
            <span className="wa-strip-tag">Official Partner</span>
          </div>
          <div className="wa-strip-vr" />
          <div className="wa-strip-partner">
            {/* ✅ FIX: removed style={{ display: "none" }} */}
            <div className="wa-strip-logo-img">
              <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/watilogo.png" alt="Wati"  loading="lazy" decoding="async" />
            </div>
            <span className="wa-strip-name">Wati</span>
            <span className="wa-strip-tag">Official Partner</span>
          </div>
        </div>
      </div>

      {/* ── STATS ── */}
      <div className="wa-stats">
        <div className="wa-stats-grid">
          {[
            { num: "2B+",  txt: "WhatsApp active users worldwide" },
            { num: "98%",  txt: "Average message open rate vs 22% for email" },
            { num: "60%",  txt: "Average revenue increase for our clients" },
            { num: "50K+", txt: "Businesses on our partner platforms" },
          ].map((s, i) => (
            <div key={i} className="wa-stat">
              <span className="wa-stat-num">{s.num}</span>
              <p className="wa-stat-txt">{s.txt}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── SERVICES ── */}
      <div ref={servicesRef} className="wa-services-bg">
        <div className="wa-sec">
          <div className="wa-services-hdr">
            <div>
              <p className="wa-sec-eyebrow">What We Offer</p>
              <h2 className="wa-sec-h2">End-to-end WhatsApp<br />Business Solutions</h2>
            </div>
            <p className="wa-sec-sub">
              From broadcast campaigns to intelligent chatbots - we set up, manage
              and scale your full WhatsApp presence using the industry's leading platforms.
            </p>
          </div>
          <div className="wa-services-grid">
            {services.map((s, i) => (
              <div key={i} className="wa-svc-card">
                {/* ✅ FIX: removed style={{ display: "none" }} */}
                <div className="wa-svc-icon-img">
                  <img src={`/images/icons/svc-icon-${i + 1}.png`} alt={s.title}  loading="lazy" decoding="async" />
                </div>
                <div className="wa-svc-icon-emoji">{s.emoji}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── INTERAKT PARTNER SHOWCASE ── */}
      <div className="wa-pshowcase">
        <div className="wa-pshowcase-inner">
          <div className="wa-pshow-info">
            <div className="wa-p-pill"> Official Partner - Interakt</div>
            <h2>Scale Marketing &amp;<br />Win More Deals on WhatsApp</h2>
            <p>
              Interakt is trusted by 50,000+ businesses globally to drive growth
              through WhatsApp. As certified partners we help you unlock its full
              suite - bulk messaging, advanced chatbots, Instagram automation and
              CRM-style lead pipelines.
            </p>
            <ul className="wa-feat-list">
              {interaktFeatures.map((f, i) => (
                <li key={i}><span className="wa-feat-tick">✓</span>{f}</li>
              ))}
            </ul>
            <div className="wa-mini-stats">
              <div className="wa-mini-stat"><strong>89%</strong><span>Avg. open rate</span></div>
              <div className="wa-mini-stat"><strong>133%</strong><span>Higher sales efficiency</span></div>
              <div className="wa-mini-stat"><strong>60%</strong><span>Cost reduction</span></div>
            </div>
          </div>
          {/* ✅ FIX: removed style={{ display: "none" }} */}
          <div className="wa-pshow-visual">
            <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/intmain.webp" alt="Interakt Platform"  loading="lazy" decoding="async" />
          </div>
        </div>
      </div>

      {/* ── WATI PARTNER SHOWCASE ── */}
      <div className="wa-pshowcase alt">
        <div className="wa-pshowcase-inner">
          <div className="wa-pshow-info">
            <div className="wa-p-pill">🚀 Official Partner - Wati</div>
            <h2>Automate Support &amp;<br />Grow Revenue with Wati</h2>
            <p>
              Wati powers 16,000+ businesses across 180+ countries with its
              WhatsApp Business Suite. As a certified Wati partner we configure,
              deploy and manage its powerful automation tools to deliver seamless
              customer experiences at scale.
            </p>
            <ul className="wa-feat-list">
              {watiFeatures.map((f, i) => (
                <li key={i}><span className="wa-feat-tick">✓</span>{f}</li>
              ))}
            </ul>
            <div className="wa-mini-stats">
              <div className="wa-mini-stat"><strong>16K+</strong><span>Happy customers</span></div>
              <div className="wa-mini-stat"><strong>180+</strong><span>Countries served</span></div>
              <div className="wa-mini-stat"><strong>60%</strong><span>Revenue uplift</span></div>
            </div>
          </div>
          {/* ✅ FIX: removed style={{ display: "none" }} */}
          <div className="wa-pshow-visual">
            <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/watimain.webp" alt="Wati Platform"  loading="lazy" decoding="async" />
          </div>
        </div>
      </div>

      {/* ── WHY US ── */}
      <div className="wa-caps-bg">
        <div className="wa-sec">
          <div className="wa-caps-hdr">
            <div>
              <p className="wa-sec-eyebrow">Why Choose Us</p>
              <h2 className="wa-sec-h2">Built for results,<br />not just reach</h2>
            </div>
            <p className="wa-sec-sub">
              We don't just activate WhatsApp - we architect a complete conversational
              growth engine tailored to your business goals and customer journey.
            </p>
          </div>
          <div className="wa-caps-grid">
            {capabilities.map((c, i) => (
              <div key={i} className="wa-cap-card">
                <div className="wa-cap-num">{c.n}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <div className="wa-how-bg">
        <div className="wa-sec">
          <div className="wa-how-hdr">
            <p className="wa-sec-eyebrow">The Process</p>
            <h2 className="wa-sec-h2">From zero to live in four simple steps</h2>
            <p className="wa-sec-sub">
              A clear, proven process designed to get your WhatsApp presence up
              and converting quickly - with zero technical headaches on your end.
            </p>
          </div>
          <div className="wa-steps">
            {steps.map((s, i) => (
              <div key={i} className="wa-step">
                <div className="wa-step-dot">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      {/* <div className="wa-cta">
        <div className="wa-cta-inner">
          <p className="wa-sec-eyebrow">Ready to Grow?</p>
          <h2>Let's put WhatsApp<br /><em>to work</em> for you</h2>
          <p>
            Book a free strategy call. We'll audit your current setup, recommend
            the right platform — Interakt or Wati — and build a tailored growth
            plan at no cost and no commitment.
          </p>
          <div className="wa-cta-btns">
            <button className="wa-btn-gold">Book a Free Strategy Call</button>
            <button className="wa-btn-outline">View Our Work →</button>
          </div>
        </div>
      </div> */}
      <ContactUsForm/>
     <ServiceSection />
    </div>
  );
};

export default WhatsAppServicesPage;