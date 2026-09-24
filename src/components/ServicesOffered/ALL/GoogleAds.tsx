import React, { useState, useEffect } from "react";
import ServiceSection from "@/components/ServicesSection";
import ContactUsForm from "@/pages/ContactUsForm";
import SEO from "@/components/SEO";
import { pageSEO } from "@/seo/pageSEO";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #000000;
    --surface: rgba(245, 222, 179, 0.03);
    --glass: rgba(245, 222, 179, 0.05);
    --glass-border: rgba(218, 165, 32, 0.2);
    --gold: #D4AF37;
    --gold-light: #F5D742;
    --gold-glow: rgba(212, 175, 55, 0.35);
    --cream: #FEF7E6;
    --text-primary: #FFF9EF;
    --text-secondary: #EADAA7;
    --text-muted: #B89A5B;
    --heading: 'Libre Baskerville', Georgia, serif;
    --body: 'Inter', sans-serif;
    --text-base: 16px;
    --text-md: 15px;
    --text-sm: 14px;
  }

  html {  margin: 0; padding: 0; font-size: 16px; }
  body { background: var(--bg); color: var(--text-primary); font-family: var(--body); -webkit-font-smoothing: antialiased; margin: 0; padding: 0; font-size: var(--text-base); line-height: 1.6; }
  .container { width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 24px; }
  .section { padding: 80px 0; position: relative; }
  .section-sm { padding: 60px 0; }
  .label-pill { display: inline-flex; align-items: center; gap: 8px; background: rgba(212, 175, 55, 0.12); border: 1px solid rgba(212, 175, 55, 0.4); color: var(--gold-light); font-family: var(--body); font-size: 12px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; padding: 6px 16px; border-radius: 100px; margin-bottom: 20px; }
  .label-dot { width: 6px; height: 6px; background: var(--gold); border-radius: 50%; animation: pulse-dot 2s ease-in-out infinite; }
  @keyframes pulse-dot { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.5; transform:scale(1.4); } }
  h1, h2, h3, h4 { font-family: var(--heading); margin: 0; }
  .heading-xl { font-size: clamp(38px, 5vw, 64px); font-weight: 700; line-height: 1.12; letter-spacing: -0.02em; color: var(--cream); }
  .heading-lg { font-size: clamp(30px, 3.5vw, 48px); font-weight: 700; line-height: 1.2; letter-spacing: -0.02em; color: var(--cream); }
  .heading-md { font-size: clamp(22px, 2.5vw, 30px); font-weight: 700; line-height: 1.3; letter-spacing: -0.01em; color: var(--cream); }
  .heading-sm { font-size: clamp(18px, 1.8vw, 22px); font-weight: 700; line-height: 1.35; color: var(--cream); }
  .body-lg { font-size: clamp(17px, 1.5vw, 19px); line-height: 1.65; color: var(--text-secondary); font-weight: 400; }
  .body-md { font-size: 16px; line-height: 1.65; color: var(--text-secondary); font-weight: 400; }
  .body-sm { font-size: 15px; line-height: 1.6; color: var(--text-secondary); font-weight: 400; }
  .gold-accent { color: var(--gold); }
  .glass-card { background: var(--glass); border: 1px solid var(--glass-border); border-radius: 20px; backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); }
  .glass-card-dark { background: rgba(10,10,10,0.6); border: 1px solid rgba(212,175,55,0.12); border-radius: 16px; backdrop-filter: blur(10px); }
  .icon-circle { width: 56px; height: 56px; background: linear-gradient(135deg, var(--gold) 0%, #b8860b 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 8px 24px var(--gold-glow); }
  .icon-circle svg { width: 24px; height: 24px; stroke: #1E1A0C; fill: none; stroke-width: 1.8; }
  .bullet-item { display: flex; align-items: center; gap: 12px; font-family: var(--body); font-size: 15px; font-weight: 500; color: var(--text-secondary); padding: 12px 18px; border-radius: 12px; background: rgba(245, 222, 179, 0.04); border: 1px solid rgba(212,175,55,0.15); }
  .bullet-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--gold); flex-shrink: 0; }
  .divider { width: 60px; height: 2px; background: linear-gradient(90deg, var(--gold), transparent); margin: 24px 0; }
  .btn-primary { display: inline-flex; align-items: center; gap: 10px; background: linear-gradient(135deg, var(--gold) 0%, #B8860B 100%); color: #0a0a0a; font-family: var(--body); font-size: 15px; font-weight: 700; letter-spacing: 0.3px; padding: 14px 32px; border-radius: 100px; border: none; cursor: pointer; box-shadow: 0 8px 32px var(--gold-glow); transition: transform 0.2s, box-shadow 0.2s; text-decoration: none; }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(212,175,55,0.6); background: linear-gradient(135deg, #F5D742, #D4AF37); }
  .noise-bg { position: fixed; inset: 0; pointer-events: none; z-index: 0; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.025'/%3E%3C/svg%3E"); opacity: 0.5; }
  .glow-blob { position: absolute; border-radius: 50%; background: radial-gradient(circle, rgba(212,175,55,0.2) 0%, transparent 70%); pointer-events: none; filter: blur(60px); z-index: 0; }
  .hero { position: relative; min-height: 80vh; display: flex; align-items: center; overflow: hidden; padding: clamp(100px, 8vw, 120px) 0 clamp(48px, 5vw, 80px); margin: 0; }
  .hero .container { padding-top: 0; padding-bottom: 0; }
  .hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; width: 100%; }
  .hero-tag { font-family: var(--body); font-size: 13px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: var(--gold); margin-bottom: 18px; }
  .hero-heading { margin-bottom: 24px; }
  .hero-heading em { font-style: italic; color: var(--gold); }
  .hero-img-wrapper { position: relative; border-radius: 24px; overflow: hidden; aspect-ratio: 4/3; }
  .hero-img-wrapper::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(212,175,55,0.2) 0%, transparent 70%); z-index: 1; border-radius: inherit; }
  .hero-img-wrapper img { width: 100%; height: 100%; object-fit: cover; border-radius: inherit; filter: brightness(0.85) contrast(1.05); }
  .hero-img-frame { position: absolute; inset: 0; border: 1px solid rgba(212,175,55,0.3); border-radius: 24px; z-index: 2; pointer-events: none; }
  .hero-stat-bar { display: flex; gap: 32px; margin-top: 40px; padding-top: 32px; border-top: 1px solid rgba(212,175,55,0.15); }
  .hero-stat-value { font-family: var(--heading); font-size: 34px; font-weight: 700; color: var(--gold); line-height: 1; }
  .hero-stat-label { font-size: 14px; color: var(--text-muted); font-weight: 500; margin-top: 6px; letter-spacing: 0.3px; }
  .about-grid { display: grid; grid-template-columns: 1fr 420px; gap: 60px; align-items: start; }
  .about-para { margin-bottom: 24px; }
  .about-keys { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 36px; }
  .feature-card-torn { position: relative; background: linear-gradient(160deg, rgba(212,175,55,0.1) 0%, rgba(245,222,179,0.04) 100%); border: 1px solid rgba(212,175,55,0.3); border-radius: 20px; padding: 36px; backdrop-filter: blur(10px); overflow: hidden; }
  .feature-card-torn::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, var(--gold), transparent); }
  .feat-title { font-family: var(--heading); font-size: 14px; font-weight: 700; color: var(--gold); letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 24px; }
  .feat-list { list-style: none; display: flex; flex-direction: column; gap: 14px; margin: 0; padding: 0; }
  .feat-list li { display: flex; align-items: center; gap: 14px; font-family: var(--body); font-size: 15px; font-weight: 500; color: var(--text-secondary); padding: 12px 16px; border-radius: 12px; background: rgba(245,222,179,0.03); border: 1px solid rgba(212,175,55,0.12); transition: background 0.2s, border-color 0.2s; }
  .feat-list li:hover { background: rgba(212,175,55,0.08); border-color: rgba(212,175,55,0.3); }
  .feat-num { font-family: var(--heading); font-size: 13px; font-weight: 700; color: var(--gold); background: rgba(212,175,55,0.15); width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .help-section { position: relative; }
  .help-top-card { background: linear-gradient(135deg, rgba(212,175,55,0.12) 0%, rgba(184,134,11,0.06) 100%); border: 1px solid rgba(212,175,55,0.25); border-radius: 20px; padding: 36px 48px; text-align: center; margin-bottom: 64px; backdrop-filter: blur(10px); position: relative; overflow: hidden; }
  .help-top-card::before { content: ''; position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 200px; height: 2px; background: linear-gradient(90deg, transparent, var(--gold), transparent); }
  .logos-row { display: flex; align-items: center; justify-content: space-between; gap: 20px; margin-top: 36px; flex-wrap: wrap; }
  .logo-chip { display: flex; align-items: center; gap: 10px; background: rgba(242,234,210,0.04); border: 1px solid rgba(212,175,55,0.2); border-radius: 100px; padding: 10px 22px; font-family: var(--body); font-size: 14px; font-weight: 600; color: #F5DEB3; letter-spacing: 0.5px; flex: 1; justify-content: center; min-width: 140px; }
  .logo-chip-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--gold); }
  .help-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; margin-bottom: 0; }
  .help-card { background: rgba(242,234,210,0.02); border: 1px solid rgba(212,175,55,0.15); border-radius: 20px; padding: 32px 28px; display: flex; flex-direction: column; gap: 16px; transition: border-color 0.25s, background 0.25s, transform 0.25s; cursor: default; }
  .help-card:hover { border-color: rgba(212,175,55,0.45); background: rgba(212,175,55,0.05); transform: translateY(-4px); }
  .help-card-title { font-family: var(--heading); font-size: 19px; font-weight: 700; line-height: 1.35; }
  .help-card-body { font-family: var(--body); font-size: 15px; line-height: 1.65; color: var(--text-muted); font-weight: 400; }
  .ppc-bg-section { position: relative; min-height: 520px; display: flex; align-items: center; overflow: hidden; }
  .ppc-bg-img { position: absolute; inset: 0; width: 100%; height: auto; object-fit: initial; filter: brightness(0.25) saturate(0.8); }
  .ppc-bg-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 100%); }
  .ppc-bg-content { position: relative; z-index: 2; display: grid; grid-template-columns: 360px 1fr; gap: 60px; align-items: start; padding: 80px 0; }
  .ppc-left-glass { background: rgba(212,175,55,0.08); border: 1px solid rgba(212,175,55,0.35); border-radius: 20px; padding: 44px 36px; backdrop-filter: blur(10px); position: relative; overflow: hidden; }
  .ppc-left-glass::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, var(--gold), #B8860B, transparent); }
  .ppc-right-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
  .ppc-col-title { font-family: var(--heading); font-size: 20px; font-weight: 700; margin-bottom: 12px; }
  .ppc-col-desc { font-family: var(--body); font-size: 15px; color: var(--text-muted); margin-bottom: 24px; line-height: 1.65; }
  .ppc-items { display: flex; flex-direction: column; gap: 12px; }
  .leads-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-top: 56px; }
  .leads-card { background: rgba(242,234,210,0.02); border: 1px solid rgba(212,175,55,0.15); border-radius: 24px; padding: 36px 32px; transition: border-color 0.25s, transform 0.25s; }
  .leads-card:hover { border-color: rgba(212,175,55,0.45); transform: translateY(-3px); }
  .leads-card-header { display: flex; align-items: center; gap: 18px; margin-bottom: 18px; }
  .leads-items { display: flex; flex-direction: column; gap: 12px; margin-top: 22px; }
  .factors-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; margin-top: 56px; }
  .factor-card { background: rgba(242,234,210,0.02); border: 1px solid rgba(212,175,55,0.15); border-radius: 24px; padding: 36px 30px; display: flex; flex-direction: column; gap: 18px; transition: border-color 0.25s, transform 0.25s; }
  .factor-card:hover { border-color: rgba(212,175,55,0.45); transform: translateY(-4px); }
  .factor-card-top { display: flex; align-items: flex-start; gap: 18px; }
  .factor-items { display: flex; flex-direction: column; gap: 12px; }

  @media (max-width: 1024px) {
    .hero-grid { grid-template-columns: 1fr; gap: 48px; }
    .about-grid { grid-template-columns: 1fr; gap: 48px; }
    .help-grid { grid-template-columns: repeat(2, 1fr); }
    .ppc-bg-content { grid-template-columns: 1fr; gap: 40px; }
    .ppc-right-cols { grid-template-columns: 1fr; gap: 32px; }
    .factors-grid { grid-template-columns: 1fr; gap: 24px; }
    .about-keys { grid-template-columns: 1fr; }
    .section { padding: 60px 0; }
  }

  @media (max-width: 768px) {
    .section { padding: 50px 0; }
    .section-sm { padding: 40px 0; }
    .help-grid { grid-template-columns: 1fr; }
    .leads-grid { grid-template-columns: 1fr; }
    .hero-stat-bar { gap: 24px; flex-wrap: wrap; }
    .logos-row { gap: 14px; }
    .logo-chip { min-width: 120px; font-size: 13px; padding: 8px 16px; }
    .ppc-bg-content { padding: 40px 0; }
    .help-top-card { padding: 28px 24px; }
    .hero { min-height: auto; padding: clamp(80px, 10vw, 100px) 0 clamp(32px, 5vw, 48px); }
  }

  @media (max-width: 480px) {
    .container { padding: 0 16px; }
    .hero-stat-bar { gap: 20px; }
    .about-keys { grid-template-columns: 1fr; }
    .ppc-right-cols { grid-template-columns: 1fr; }
    .factors-grid { grid-template-columns: 1fr; }
    .section { padding: 40px 0; }
    .bullet-item { padding: 10px 14px; font-size: 14px; }
  }
`;

const IconChat = () => (
  <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
);
const IconLayers = () => (
  <svg viewBox="0 0 24 24"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
);
const IconMonitor = () => (
  <svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
);
const IconTrendUp = () => (
  <svg viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
);
const IconTarget = () => (
  <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
);
const IconAward = () => (
  <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>
);
const IconUsers = () => (
  <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);
const IconSettings = () => (
  <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
);
const IconDollar = () => (
  <svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
);
const IconBar = () => (
  <svg viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
);

interface HelpCard { icon: React.ReactNode; title: string; body: string; }
const helpCards: HelpCard[] = [
  { icon: <IconChat />, title: "Increase Your Visibility", body: "Google Ads places your business at the top of search results when customers look for your products or services." },
  { icon: <IconLayers />, title: "Effective Audience Targeting", body: "Target by demographics, locations, languages, and time of day — maximizing conversions from the most relevant audience." },
  { icon: <IconMonitor />, title: "Optimize Your Campaigns", body: "Measure and analyze campaign performance in real-time with detailed insights into clicks, impressions, and conversion rates." },
  { icon: <IconTrendUp />, title: "Gain a Competitive Edge", body: "Capture market share with competitor analysis and auction insights to understand how your ads perform relative to rivals." },
];

interface PpcService { icon: React.ReactNode; title: string; desc: string; items: string[]; }
const ppcServices: PpcService[] = [
  { icon: <IconSettings />, title: "Comprehensive Campaign Management", desc: "Our PPC experts handle every aspect of your campaign, from keyword research to ad copy creation and ongoing optimization.", items: ["Keyword research and selection", "Ad copy creation and A/B testing", "Bid management and optimization"] },
  { icon: <IconBar />, title: "Detailed Performance Reporting", desc: "Track your campaign performance with detailed analytics and reporting, allowing you to monitor ROI and make informed decisions.", items: ["Customized reporting dashboards", "Performance tracking and analysis", "Ongoing optimization based on data insights"] },
];

interface LeadCard { icon: React.ReactNode; title: string; subtitle: string; desc: string; items: string[]; }
const leadsCards: LeadCard[] = [
  { icon: <IconTarget />, title: "Drive Targeted Traffic", subtitle: "Targeted Audience Reach", desc: "Reach your ideal customers with precision targeting based on demographics, interests, and online behavior.", items: ["Highly targeted audience segmentation", "Tailored ad messaging for different segments", "Increased relevance and engagement"] },
  { icon: <IconDollar />, title: "Strategic Budget Allocation", subtitle: "Maximize Every Rupee", desc: "Optimize your advertising budget for maximum impact, focusing on the most profitable keywords and audience segments.", items: ["Budget allocation based on performance data", "Cost-effective bidding strategies", "Continuous budget optimization"] },
];

interface FactorCard { icon: React.ReactNode; title: string; desc: string; items: string[]; }
const factorCards: FactorCard[] = [
  { icon: <IconAward />, title: "Industry Experience", desc: "Look for a PPC company with extensive experience in your industry, as they will have a better understanding of your target audience.", items: ["Industry-specific expertise", "Case studies and client testimonials", "Track record of success in similar industries"] },
  { icon: <IconUsers />, title: "Transparency & Communication", desc: "Choose a PPC company that prioritizes transparency and open communication, providing regular updates and insights.", items: ["Clear communication channels", "Regular progress reports", "Responsive customer support team"] },
  { icon: <IconSettings />, title: "Customized Solutions", desc: "Seek a PPC company that offers customized solutions tailored to your unique business needs and objectives.", items: ["Personalized campaign strategies", "Flexible service options", "Scalable solutions to accommodate growth"] },
];

const aboutKeys: string[] = ["Boost Your Brand Awareness", "Increase Your Conversions", "Local Lead Generation", "Get Instant ROI", "Targeted Geographic Campaigns", "Stay Ahead of Competitors", "Flexible & Goal-Driven Services", "Reach Ideal Customers"];
const features: string[] = ["Boosted ROI", "Strong Understanding of PPC", "Daily Tracking & Monitoring", "User Experience Flow", "Wide Variety of Niches"];
const logoChips: string[] = ["Search Ads", "Display Ads", "Shopping Ads", "Video Ads", "App Ads", "Smart Campaigns"];

const BulletItem = ({ text }: { text: string }) => (
  <div className="bullet-item"><span className="bullet-dot" /><span>{text}</span></div>
);

export default function GoogleAdsPage() {
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <>
      <SEO {...pageSEO.googleAds} />
      <style dangerouslySetInnerHTML={{ __html: style }} />
      <div className="noise-bg" />

      <section className="hero">
        <div className="glow-blob" style={{ width: 600, height: 600, top: -100, right: -100 }} />
        <div className="glow-blob" style={{ width: 400, height: 400, bottom: -100, left: -50, opacity: 0.5 }} />
        <div className="container">
          <div className="hero-grid">
            <div>
              <div className="label-pill"><span className="label-dot" />PPC Advertising</div>
              <p className="hero-tag">Google Ads</p>
              <h1 className="heading-xl hero-heading">Maximize Your Revenue with{" "}<em>Targeted</em>{" "}Google Ads</h1>
              <div className="divider" />
              <p className="body-lg">Drive more leads and sales with our expertly managed Google Ads services. Reach your ideal customers and boost your brand visibility with strategic PPC campaigns tailored to your business goals.</p>
              <div style={{ display: "flex", gap: 14, marginTop: 36, flexWrap: "wrap" }}>
                <a href="#about" className="btn-primary">Get Started<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1E1A0C" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg></a>
                <a href="#factors" style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "1px solid rgba(212,175,55,0.3)", borderRadius: 100, padding: "13px 28px", fontSize: 15, fontFamily: "var(--body)", fontWeight: 500, color: "#EADAA7", textDecoration: "none" }}>Learn More</a>
              </div>
              <div className="hero-stat-bar">
                {[["500+", "Campaigns Managed"], ["3x", "Average ROI"], ["98%", "Client Retention"]].map(([v, l]) => (
                  <div key={l}><div className="hero-stat-value">{v}</div><div className="hero-stat-label">{l}</div></div>
                ))}
              </div>
            </div>
            <div className="hero-img-wrapper">
              <img src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80" alt="Google Ads Dashboard"  loading="lazy" decoding="async" />
              <div className="hero-img-frame" />
              <div style={{ position: "absolute", bottom: 24, left: 24, zIndex: 3, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(10px)", border: "1px solid rgba(212,175,55,0.4)", borderRadius: 14, padding: "14px 20px", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#D4AF37,#B8860B)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1E1A0C" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
                </div>
                <div>
                  <div style={{ fontFamily: "var(--heading)", fontSize: 16, fontWeight: 700, color: "#FFF9EF" }}>+242% ROI</div>
                  <div style={{ fontFamily: "var(--body)", fontSize: 12, color: "#B89A5B", marginTop: 2 }}>Avg. client result</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="about">
        <div className="container">
          <div className="about-grid">
            <div>
              <div className="label-pill"><span className="label-dot" />About Our Services</div>
              <h2 className="heading-lg" style={{ marginBottom: 28 }}>Know About <span className="gold-accent">Google Ads</span></h2>
              <p className="body-lg about-para">Investing in Google Ads services is a surefire way for companies to increase revenue while minimizing risk. Our services are designed to deliver results, helping you achieve your business objectives efficiently and effectively.</p>
              <p className="body-lg about-para">We believe in complete transparency during your PPC advertising journey. You have constant access to your campaign, detailed reports, and all essential data. Our real-time reporting gives you the insights to make informed decisions quickly.</p>
              <div className="divider" />
              <p style={{ fontFamily: "var(--heading)", fontSize: 16, fontWeight: 700, color: "#B89A5B", marginBottom: 18, letterSpacing: 1, textTransform: "uppercase" }}>Key Components of Our Google Ads Services</p>
              <div className="about-keys">{aboutKeys.map(k => <BulletItem key={k} text={k} />)}</div>
            </div>
            <div className="feature-card-torn">
              <p className="feat-title">Why Choose Us</p>
              <ul className="feat-list">
                {features.map((f, i) => (<li key={f}><span className="feat-num">{i < 9 ? `0${i + 1}` : `${i + 1}`}</span>{f}</li>))}
              </ul>
              <div style={{ marginTop: 32, padding: "22px 20px", background: "rgba(212,175,55,0.08)", borderRadius: 12, border: "1px solid rgba(212,175,55,0.25)" }}>
                <p style={{ fontFamily: "var(--body)", fontSize: 14, color: "#EADAA7", lineHeight: 1.65 }}>Trusted by <strong style={{ color: "var(--gold)" }}>500+ businesses</strong> across industries. Our data-driven approach ensures maximum ROI on every campaign.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section help-section" id="help">
        <div className="glow-blob" style={{ width: 500, height: 500, top: "20%", left: "50%", transform: "translateX(-50%)", opacity: 0.4 }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="help-top-card">
            <div className="label-pill" style={{ margin: "0 auto 16px" }}><span className="label-dot" />Google Ads Benefits</div>
            <h2 className="heading-lg">How Google Ads Can Help<br /><span className="gold-accent">Your Business?</span></h2>
            <p className="body-md" style={{ maxWidth: 520, margin: "16px auto 0" }}>Drive Targeted Traffic and unlock exponential growth across all your digital channels.</p>
            <div className="logos-row">{logoChips.map(chip => (<div className="logo-chip" key={chip}><span className="logo-chip-dot" />{chip}</div>))}</div>
          </div>
          <div className="help-grid">
            {helpCards.map(card => (<div className="help-card" key={card.title}><div className="icon-circle">{card.icon}</div><h3 className="help-card-title">{card.title}</h3><p className="help-card-body">{card.body}</p></div>))}
          </div>
        </div>
      </section>

      <section className="ppc-bg-section" id="services">
        <img className="ppc-bg-img" src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=75" alt="" aria-hidden="true"  loading="lazy" decoding="async" />
        <div className="ppc-bg-overlay" />
        <div className="container" style={{ position: "relative", zIndex: 2, width: "100%" }}>
          <div className="ppc-bg-content">
            <div className="ppc-left-glass">
              <div className="label-pill"><span className="label-dot" />Our Services</div>
              <h2 className="heading-md" style={{ marginTop: 8, lineHeight: 1.3 }}>What Is Included In Our{" "}<span className="gold-accent">PPC Marketing</span> Services?</h2>
              <div className="divider" style={{ marginTop: 24 }} />
              <p className="body-md">A full-stack PPC solution built to drive measurable results for your business every step of the way.</p>
            </div>
            <div className="ppc-right-cols">
              {ppcServices.map(s => (
                <div key={s.title}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}><div className="icon-circle" style={{ width: 48, height: 48 }}>{s.icon}</div><h3 className="ppc-col-title">{s.title}</h3></div>
                  <p className="ppc-col-desc">{s.desc}</p>
                  <div className="ppc-items">{s.items.map(item => <BulletItem key={item} text={item} />)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="leads">
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
            <div className="label-pill" style={{ margin: "0 auto 18px" }}><span className="label-dot" />Results That Matter</div>
            <h2 className="heading-lg">How Our PPC Services Can Increase Your{" "}<span className="gold-accent">Leads & Sales?</span></h2>
          </div>
          <div className="leads-grid">
            {leadsCards.map(card => (
              <div className="leads-card" key={card.title}>
                <div className="leads-card-header"><div className="icon-circle">{card.icon}</div><div><h3 className="heading-sm">{card.title}</h3><p style={{ fontFamily: "var(--body)", fontSize: 14, color: "var(--gold)", fontWeight: 600, marginTop: 4 }}>{card.subtitle}</p></div></div>
                <p className="body-md">{card.desc}</p>
                <div className="leads-items">{card.items.map(i => <BulletItem key={i} text={i} />)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="factors" style={{ position: "relative" }}>
        <div className="glow-blob" style={{ width: 500, height: 500, bottom: 0, right: 0, opacity: 0.35 }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", marginBottom: 8, padding: "48px 40px", background: "rgba(212,175,55,0.03)", border: "1px solid rgba(212,175,55,0.18)" }}>
            <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=60" alt="" aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.12) saturate(0.6)", zIndex: 0 }}  loading="lazy" decoding="async" />
            <div style={{ position: "relative", zIndex: 1, maxWidth: 560 }}>
              <div className="label-pill"><span className="label-dot" />Decision Guide</div>
              <h2 className="heading-lg">Factors to Evaluate in Your Search for a{" "}<span className="gold-accent">PPC Company in India</span></h2>
            </div>
          </div>
          <div className="factors-grid">
            {factorCards.map(card => (
              <div className="factor-card" key={card.title}>
                <div className="factor-card-top"><div className="icon-circle">{card.icon}</div><div><h3 className="heading-sm">{card.title}</h3></div></div>
                <p className="body-md">{card.desc}</p>
                <div className="factor-items">{card.items.map(item => <BulletItem key={item} text={item} />)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <section style={{ padding: "80px 0", textAlign: "center", position: "relative", overflow: "hidden", borderTop: "1px solid rgba(212,175,55,0.15)" }}>
        <div className="glow-blob" style={{ width: 600, height: 300, bottom: -100, left: "50%", transform: "translateX(-50%)", opacity: 0.3 }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="label-pill" style={{ margin: "0 auto 20px" }}><span className="label-dot" />Ready to Grow?</div>
          <h2 className="heading-lg" style={{ marginBottom: 18 }}>Start Your <span className="gold-accent">Google Ads</span> Journey Today</h2>
          <p className="body-lg" style={{ maxWidth: 480, margin: "0 auto 36px" }}>Let our experts build and manage a high-performing campaign tailored to your goals.</p>
          <a href="#about" className="btn-primary" style={{ fontSize: 16, padding: "16px 40px" }}>Book a Free Consultation<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1E1A0C" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg></a>
        </div>
      </section> */}

      {/* Services Section */}
      <ContactUsForm/>

      <section style={{ maxWidth:"100%" }}>
        <ServiceSection />
      </section>
    </>
  );
}
