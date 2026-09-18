// ============================================================
// FILE: src/components/ServicesOffered/OVERVIEW/SocialMediaOverviewPage.tsx
// ADD ROUTE: your route for Social Media Overview page
// ============================================================

import ServicesSection from "@/components/HomePage/ServicesSection";
import {
  SectionLabel, SectionHeading, GoldButton, OutlineButton,
  BulletList, ProcessSteps, FAQAccordion, CTABand,
} from "../../ui/Components";
import { FONTS, GLOBAL_CSS } from "../../ui/styles";
import ServiceSection from "@/components/ServicesSection";
import ContactUsForm from "@/pages/ContactUsForm";
import SEO from "@/components/SEO";
import { pageSEO } from "@/seo/pageSEO";

const industries = [
  { label: "NGO", icon: "", href: "/social-media/ngo#/social-media/ngo" },
  { label: "Real Estate", icon: "", href: "/social-media/ngo#/social-media/real-estate" },
  { label: "Ecommerce", icon: "", href: "/social-media/ecommerce#/social-media/ecommerce" },
  { label: "Healthcare", icon: "", href: "/social-media/ecommerce#/social-media/healthcare" },
  { label: "Numerology & Spiritual", icon: "", href: "/social-media/ecommerce#/social-media/astrology" },

];

const scopeCards = [
  {
    icon: "◈", title: "Strategy & Planning",
    bullets: [
      "Audience research, competitor mapping and positioning for each platform",
      "Monthly content calendar with campaign themes, hooks and CTAs",
    ],
  },
  {
    icon: "◉", title: "Creative & Content",
    bullets: [
      "Static posts, carousels, reels/shorts and stories tailored to each platform",
      "Festival creatives, brand campaigns and announcement posts in one visual language",
    ],
  },
  {
    icon: "◎", title: "Publishing & Community",
    bullets: [
      "Scheduled posting across Instagram, Facebook, LinkedIn, YouTube & others as needed",
      "Comment, DM and review monitoring with escalation rules shared with your team",
    ],
  },
  {
    icon: "◇", title: "Performance & Growth",
    bullets: [
      "Campaign-based growth experiments (contests, collabs, influencer tie-ins)",
      "Analytics dashboard: reach, engagement, clicks, leads/sales/donations tracked monthly",
    ],
  },
  {
    icon: "◆", title: "Integrated Systems",
    bullets: [
      "Social ads coordination (Meta / Google / LinkedIn) with landing pages & lead forms",
      "WhatsApp & CRM integration for leads, orders and donor journeys",
    ],
  },
];

const processSteps = [
  { num: "01", title: "Discovery & Audit", desc: "We audit your current social presence, competitors and industry benchmarks." },
  { num: "02", title: "Strategy & Calendar", desc: "We lock monthly objectives, platforms, posting frequency and content pillars." },
  { num: "03", title: "Content Production", desc: "Our team designs creatives, writes captions and scripts reels/videos." },
  { num: "04", title: "Publishing & Monitoring", desc: "We schedule, post and monitor response across all agreed platforms." },
  { num: "05", title: "Performance Review", desc: "Monthly reports with numbers, learnings and next-month action plan." },
];

const faqs = [
  { q: "Do you only handle content or also run ads?", a: "We handle both. The Social Media Marketing service covers organic content. If you want us to also run Meta / Google / LinkedIn ads, we plug that in with a performance marketing add-on." },
  { q: "How do you measure success for NGOs vs businesses?", a: "For NGOs we track donations, repeat donors and reach among relevant audiences. For businesses we track leads, bookings, orders and revenue generated from social campaigns." },
  { q: "Can you manage only one platform (for example, just Instagram)?", a: "Yes. The scope can be restricted to a single platform if required. Pricing is adjusted based on the number of platforms and content volume." },
  { q: "How soon can we expect results?", a: "Usually 60–90 days to see stable patterns in reach, engagement and lead / donation / order flow, assuming you stay consistent with content and approvals." },
];

const heroStats = [
  { val: "10+ Cr", label: "Donations Raised" },
  { val: "300%+", label: "Real Estate Growth" },
  { val: "700+", label: "Orders / Day" },
  { val: "6+", label: "Industries Served" },
];

export default function SocialMediaOverviewPage() {
  return (
    <div style={{ background: "#090909", color: "#F5F0E8", minHeight: "100vh", fontFamily: "'EB Garamond', serif" }}>
      <SEO {...pageSEO.socialMediaOverview} />
      <style>{`
        ${FONTS}
        ${GLOBAL_CSS}
        .industry-tile {
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; gap: 12px; padding: 36px 24px;
          border: 1px solid rgba(201,168,76,0.15); background: #090909;
          text-decoration: none; transition: all 0.3s; cursor: pointer;
        }
        .industry-tile:hover {
          border-color: #C9A84C; background: rgba(201,168,76,0.05);
          transform: translateY(-4px);
        }
        .scope-card { background: #090909; padding: 40px 32px; }

        /* ── HERO PADDING ─────────────────────────────────────── */
        .hero-section {
          padding-top: clamp(100px, 8vw, 120px);
          padding-bottom: 40px;
          padding-left: clamp(16px, 5vw, 80px);
          padding-right: clamp(16px, 5vw, 80px);
        }
        @media (min-width: 768px) {
          .hero-section {
            padding-top: clamp(100px, 8vw, 120px);
            padding-bottom: 60px;
          }
        }

        /* ── INLINE STATS GRID ────────────────────────────────── */
        .hero-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;   /* 2 columns on mobile */
          gap: 0;
          width: 100%;
          margin-top: 48px;
          border-top: 1px solid rgba(201,168,76,0.2);
        }
        @media (min-width: 640px) {
          .hero-stats {
            grid-template-columns: repeat(4, 1fr); /* 4 columns on desktop */
          }
        }
        .hero-stat-item {
          padding: 28px 16px;
          border-right: 1px solid rgba(201,168,76,0.15);
          border-bottom: 1px solid rgba(201,168,76,0.15);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }
        .hero-stat-item:nth-child(2n) {
          border-right: none; /* remove right border on last column (mobile) */
        }
        @media (min-width: 640px) {
          .hero-stat-item:nth-child(2n) {
            border-right: 1px solid rgba(201,168,76,0.15);
          }
          .hero-stat-item:last-child {
            border-right: none;
          }
        }
        .hero-stat-val {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(28px, 5vw, 48px);
          font-weight: 300;
          color: #C9A84C;
          line-height: 1;
        }
        .hero-stat-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.55);
          text-align: center;
        }

        /* ── SCOPE CARDS GRID ─────────────────────────────────── */
        .scope-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr); /* ✅ all 5 cards in one row */
          gap: 2px;
          background: rgba(201,168,76,0.08);
        }
        @media (max-width: 1100px) {
          .scope-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 700px) {
          .scope-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .scope-card { padding: 28px 20px; }
          .industry-tile { padding: 24px 16px; }
        }
      `}</style>


      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="hero-section"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,168,76,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg,rgba(201,168,76,0.025) 0px,transparent 1px,transparent 80px),repeating-linear-gradient(90deg,rgba(201,168,76,0.025) 0px,transparent 1px,transparent 80px)", pointerEvents: "none" }} />

        <div style={{
          maxWidth: 1280,
          marginTop: "120px",
          width: "100%",
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
          <SectionLabel>Social Media Marketing</SectionLabel>
          <h1 style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "clamp(42px,7vw,92px)", fontWeight: 300,
            lineHeight: 1.1, color: "#F5F0E8", marginTop: 20, maxWidth: 900,
          }}>
            Social Media Marketing<br />
            <em style={{ color: "#C9A84C" }}>That Actually Moves Numbers</em>
          </h1>
          <p style={{
            fontSize: "clamp(17px,2vw,22px)", lineHeight: 1.7,
            color: "rgba(245,240,232,0.72)", maxWidth: 680, marginBottom: 20,
            fontFamily: "'EB Garamond',serif",
          }}>
            From NGOs and real estate to ecommerce, healthcare and personal brands, we plan, design and manage your social channels to drive real donations, bookings, leads and sales.
          </p>
          <p style={{
            fontSize: 14, color: "rgba(201,168,76,0.85)",
            fontFamily: "'Montserrat',sans-serif", letterSpacing: "0.03em",
            marginBottom: 44, paddingLeft: 16,
            borderLeft: "2px solid rgba(201,168,76,0.4)",
            textAlign: "left",
            maxWidth: 680,
          }}>
            10+ Cr donations raised · 300%+ sales growth in real estate · 700–800 ecommerce orders/day — backed by structured social media systems.
          </p>
          {/* <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
            <GoldButton>Book a Strategy Call</GoldButton>
            <OutlineButton>View Our Work</OutlineButton>
          </div> */}

          {/* ✅ Inline stats — full control over mobile layout */}
          <div className="hero-stats">
            {heroStats.map((s) => (
              <div key={s.label} className="hero-stat-item">
                <span className="hero-stat-val">{s.val}</span>
                <span className="hero-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ───────────────────────────────────────── */}
      <section style={{ padding: "80px clamp(16px,5vw,80px)", borderTop: "1px solid rgba(201,168,76,0.1)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeading
            label="Filter by Sector"
            title={<>Industries We<br /><em style={{ color: "#C9A84C" }}>Power on Social</em></>}
            subtitle="Choose your industry to see how our social media systems adapt to your world."
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 2, background: "rgba(201,168,76,0.07)" }}>
            {industries.map((ind) => (
              <a key={ind.label} href={ind.href} className="industry-tile">
                <span style={{ fontSize: 40 }}>{ind.icon}</span>
                <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, color: "#F5F0E8", textAlign: "center" }}>
                  {ind.label}
                </span>
                <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#C9A84C" }}>
                  View Page →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ──────────────────────────────────── */}
      <section style={{ padding: "80px clamp(16px,5vw,80px)", background: "rgba(201,168,76,0.02)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeading
            label="Scope & Deliverables"
            title={<>What's Included in Our<br /><em style={{ color: "#C9A84C" }}>Social Media Marketing</em></>}
            subtitle="One team, one calendar, one system handling everything from content ideas to campaign reports."
          />
          {/* ✅ Changed from inline style with auto-fit to scope-grid class → forces all 5 cards in one row */}
          <div className="scope-grid">
            {scopeCards.map((card) => (
              <div key={card.title} className="scope-card">
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, color: "#C9A84C", marginBottom: 12 }}>
                  {card.icon}
                </div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 500, color: "#F5F0E8", marginBottom: 18 }}>
                  {card.title}
                </div>
                <BulletList items={card.bullets} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────── */}
      <section style={{ padding: "80px clamp(16px,5vw,80px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeading
            label="Our Process"
            title={<>How Our Social Media<br /><em style={{ color: "#C9A84C" }}>System Runs for You</em></>}
          />
          <ProcessSteps steps={processSteps} />
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section style={{ padding: "80px clamp(16px,5vw,80px)", background: "rgba(201,168,76,0.02)", borderTop: "1px solid rgba(201,168,76,0.1)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeading
            label="Quick Answers"
            title={<>Frequently Asked<br /><em style={{ color: "#C9A84C" }}>Questions</em></>}
          />
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      <ContactUsForm/>
      <ServiceSection/>
    </div>
    
  );
}