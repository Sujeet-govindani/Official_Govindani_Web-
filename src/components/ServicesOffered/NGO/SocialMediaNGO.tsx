// ============================================================
// FILE: src/components/ServicesOffered/NGO/NGOSocialMediaPage.tsx
// ADD ROUTE: your route for NGO page
// ============================================================

import ContactUsForm from "@/pages/ContactUsForm";
import {
  SectionLabel, SectionHeading, GoldButton, OutlineButton,
  BulletList, ProcessSteps, FAQAccordion, CTABand,
  EmbedPlaceholder, ClientStrip, GalleryGrid,
} from "../../ui/Components";
import { FONTS, GLOBAL_CSS } from "../../ui/styles";
import ServiceSection from "@/components/ServicesSection";
import SEO from "@/components/SEO";
import { pageSEO } from "@/seo/pageSEO";

const processSteps = [
  { num: "01", title: "NGO Audit & Mission Mapping", desc: "We study your mission, beneficiary profile, existing donor base and social presence." },
  { num: "02", title: "Donor Persona & Content Strategy", desc: "We define your donor segments and map content themes to trust-building and donation intent." },
  { num: "03", title: "Campaign Calendar & Creative Production", desc: "Monthly calendar aligned to causes, festivals and fundraising windows. All creatives designed in-house." },
  { num: "04", title: "Publishing & Donor Engagement", desc: "Scheduled posts, story updates, DM handling and comment responses to nurture donor relationships." },
  { num: "05", title: "Impact Reports & Monthly Review", desc: "We track reach, engagement, click-throughs to donation pages and recurring donor growth monthly." },
];

const faqs = [
  { q: "Do you manage donation campaigns during emergencies or disasters?", a: "Yes. We have rapid-response workflows to launch emergency appeal campaigns within 24–48 hours with urgency messaging, impact numbers and clear CTAs." },
  { q: "Will you link directly to our own donation page?", a: "Always. We never push donors to third-party aggregators. All campaigns point to your own 80G-enabled donation page for full control over donor data." },
  { q: "Do you handle 80G and transparency communication?", a: "Yes. We design donor education posts that explain 80G benefits, publish impact updates and share utilization reports in a clean, trustworthy format." },
  { q: "Can you manage multiple NGO handles simultaneously?", a: "Yes, we manage multiple handles for NGOs that run separate programmes or regional branches under one unified content system." },
];

const galleryItems = [
  { label: "Donor Impact Story", tag: "NGO", emoji: "" },
  { label: "80G Explainer Post", tag: "Awareness", emoji: "" },
  { label: "Emergency Appeal Banner", tag: "Campaign", emoji: "" },
  { label: "Volunteer Feature Reel", tag: "Story", emoji: "" },
  { label: "Monthly Impact Carousel", tag: "Report", emoji: "" },
  { label: "Festival Cause Post", tag: "Festival", emoji: "" },
  { label: "Donation Drive Banner", tag: "Campaign", emoji: "" },
  { label: "Beneficiary Story Card", tag: "Impact", emoji: "" },
];

const whatWeDoCards = [
  {
    title: "Impact Storytelling", icon: "",
    bullets: [
      "Stories of beneficiaries, volunteers and ground-level impact",
      "Before/after narratives and transformation posts that build emotional trust",
      "Reels capturing field work, events and community impact",
    ],
  },
  {
    title: "Donation Drive Campaigns", icon: "",
    bullets: [
      "Campaigns synced with donation drives (festivals, emergencies, monthly causes)",
      "Urgency messaging with real-time counters and milestone posts",
      "Clear CTAs leading to your own donation pages, not third-party platforms",
    ],
  },
  {
    title: "Donor Education & Trust", icon: "",
    bullets: [
      "Donor education posts around 80G tax benefits, transparency and reports",
      "Annual report highlights in digestible carousel formats",
      "Q&A posts that answer common donor doubts upfront",
    ],
  },
  {
    title: "Community & Volunteer Growth", icon: "",
    bullets: [
      "Volunteer spotlight posts to humanize your team",
      "Community-building content: polls, challenges, awareness days",
      "Cause amplification through shareable graphics and awareness campaigns",
    ],
  },
];

const heroStats = [
  { val: "10+ Cr", label: "Donations Raised" },
  { val: "3X", label: "Avg Donor Growth" },
  { val: "6+", label: "NGOs Managed" },
  { val: "80G", label: "Compliant Comms" },
];

export default function NGOSocialMediaPage() {
  return (
    <div style={{ background: "#090909", color: "#F5F0E8", minHeight: "100vh", fontFamily: "'EB Garamond', serif" }}>
      <SEO {...pageSEO.socialMediaNGO} />
      <style>{`
        ${FONTS}
        ${GLOBAL_CSS}
        .back-link {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'Montserrat',sans-serif; font-size: 11px;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(201,168,76,0.65); text-decoration: none;
          margin-bottom: 32px; transition: color 0.2s;
        }
        .back-link:hover { color: #C9A84C; }
        .what-card { background: #090909; padding: 40px 32px; }
        @media (max-width: 600px) { .what-card { padding: 28px 20px; } }

        /* ── HERO SECTION ─────────────────────────────────────── */
        .ngo-hero-section {
          min-height: 90vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding-top: 20px;
          padding-bottom: 40px;
          padding-left: clamp(16px, 5vw, 80px);
          padding-right: clamp(16px, 5vw, 80px);
          position: relative;
          overflow: hidden;
        }
        @media (min-width: 768px) {
          .ngo-hero-section {
            padding-top: 60px;
            padding-bottom: 80px;
          }
        }

        /* ── INLINE STATS GRID ────────────────────────────────── */
        .ngo-hero-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          width: 100%;
          max-width: 680px;
          margin-top: 48px;
          background: rgba(201,168,76,0.1);
        }
        @media (min-width: 640px) {
          .ngo-hero-stats {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        .ngo-stat-item {
          background: #090909;
          text-align: center;
          padding: 28px 16px;
          margin: 1px;
        }
        .ngo-stat-val {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(28px, 5vw, 36px);
          font-weight: 600;
          color: #C9A84C;
          line-height: 1;
        }
        .ngo-stat-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.4);
          margin-top: 8px;
        }
      `}</style>


      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="ngo-hero-section" style={{ paddingTop: "clamp(80px, 8vw, 110px)" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(201,168,76,0.09) 0%, transparent 70%)", pointerEvents: "none",paddingTop: 30 }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(45deg,rgba(201,168,76,0.02) 0px,transparent 1px,transparent 60px)", pointerEvents: "none" }} />

        <div style={{
          maxWidth: 1280,
          marginTop: "-20px",
          width: "100%",
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
          
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 100,paddingTop: 30 }}>
            <span style={{ fontSize: 52 }}></span>
            <SectionLabel>NGO · Non-Profit</SectionLabel>
          </div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "clamp(40px,6.5vw,84px)", fontWeight: 300,
            lineHeight: 1.1, color: "#F5F0E8", marginBottom: 28, maxWidth: 860,
          }}>
            Social Media Marketing<br /><em style={{ color: "#C9A84C" }}>for NGOs</em>
          </h1>
          <p style={{
            fontSize: "clamp(17px,2vw,21px)", lineHeight: 1.75,
            color: "rgba(245,240,232,0.72)", maxWidth: 660, marginBottom: 20,
            fontFamily: "'EB Garamond',serif",
          }}>
            We turn your mission into consistent, donor-friendly storytelling. Every post, reel and campaign is designed to build trust, show impact and drive recurring donations through your own infrastructure.
          </p>
          <p style={{
            fontSize: 14, color: "rgba(201,168,76,0.85)",
            fontFamily: "'Montserrat',sans-serif", letterSpacing: "0.03em",
            marginBottom: 44, paddingLeft: 16,
            borderLeft: "2px solid rgba(201,168,76,0.4)",
            textAlign: "left",
            maxWidth: 660,
          }}>
            10+ Cr in donations facilitated through structured social campaigns — for NGOs like yours.
          </p>
          {/* <div style={{ display: "center", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
            <GoldButton>Start NGO Social Media</GoldButton>
            
          </div> */}

          {/* ✅ Inline stats grid — 2×2 on mobile, 4-col on desktop */}
          <div className="ngo-hero-stats">
            {heroStats.map((s) => (
              <div key={s.label} className="ngo-stat-item">
                <div className="ngo-stat-val">{s.val}</div>
                <div className="ngo-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT WE DO ───────────────────────────────────────── */}
      <section style={{ padding: "80px clamp(16px,5vw,80px)", borderTop: "1px solid rgba(201,168,76,0.1)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeading
            label="Our NGO Approach"
            title={<>What We Do for<br /><em style={{ color: "#C9A84C" }}>Your NGO on Social</em></>}
            subtitle="Impact-led content systems that move hearts and open wallets — built around your cause, not generic formats."
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 2, background: "rgba(201,168,76,0.07)" }}>
            {whatWeDoCards.map((card) => (
              <div key={card.title} className="what-card">
                <div style={{ fontSize: 32, marginBottom: 12 }}>{card.icon}</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 500, color: "#F5F0E8", marginBottom: 18 }}>{card.title}</div>
                <BulletList items={card.bullets} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIVE EMBEDS ──────────────────────────────────────── */}
      <section style={{ padding: "80px clamp(16px,5vw,80px)", background: "rgba(201,168,76,0.02)", borderTop: "1px solid rgba(201,168,76,0.08)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeading
            label="Live Proof"
            title={<>NGO Profiles<br /><em style={{ color: "#C9A84C" }}>We Manage</em></>}
            subtitle="These are live handles — not mockups."
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 2, background: "rgba(201,168,76,0.06)" }}>
            {["NGO Handle 1", "NGO Handle 2", "NGO Handle 3"].map((n) => (
              <EmbedPlaceholder key={n} icon="" label={n} sub="Live Instagram / Facebook Grid" />
            ))}
          </div>
          <ClientStrip
            label="Featured NGO handles we manage:"
            clients={["NGO Handle 1", "NGO Handle 2", "NGO Handle 3"]}
          />
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────── */}
      <section style={{ padding: "80px clamp(16px,5vw,80px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeading
            label="Our Process"
            title={<>How We Run Social<br /><em style={{ color: "#C9A84C" }}>for Your NGO</em></>}
          />
          <ProcessSteps steps={processSteps} />
        </div>
      </section>

      {/* ── GALLERY ──────────────────────────────────────────── */}
      <section style={{ padding: "80px clamp(16px,5vw,80px)", background: "rgba(201,168,76,0.02)", borderTop: "1px solid rgba(201,168,76,0.08)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeading
            label="Creative Gallery"
            title={<>NGO Creatives<br /><em style={{ color: "#C9A84C" }}>We've Designed</em></>}
            subtitle="Festival campaigns, impact posts, emergency appeals and donor education content — all made in-house."
          />
          <GalleryGrid items={galleryItems} />
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section style={{ padding: "80px clamp(16px,5vw,80px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeading
            label="Quick Answers"
            title={<>NGO Social Media<br /><em style={{ color: "#C9A84C" }}>FAQ</em></>}
          />
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      <ContactUsForm/>
      <ServiceSection/>
    </div>
  );
}