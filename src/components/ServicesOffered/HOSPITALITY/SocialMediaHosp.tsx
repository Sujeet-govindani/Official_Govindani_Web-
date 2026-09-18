// ============================================================
// FILE: src/components/ServicesOffered/HOSPITALITY/SocialMediaHosp.tsx
// ============================================================

import ContactUsForm from "@/pages/ContactUsForm";
import {
  SectionHeading, GoldButton, OutlineButton,
  BulletList, ProcessSteps, FAQAccordion, CTABand, EmbedPlaceholder, ClientStrip, GalleryGrid
} from "../../ui/Components";
import { FONTS, GLOBAL_CSS } from "../../ui/styles";
import ServiceSection from "@/components/HomePage/ServicesSection";
import { FaInstagram, FaFacebook, FaExternalLinkAlt } from "react-icons/fa";

const processSteps = [
  { num: "01", title: "Brand & Experience Audit", desc: "We review your brand story, property design, guest journey, and current social presence." },
  { num: "02", title: "Cinematic Experience Strategy", desc: "We define visual content themes: virtual property tours, gourmet culinary highlights, local experiences, and guest diaries." },
  { num: "03", title: "Premium Content & Reel Shoots", desc: "We script, direct, and produce high-end reels, drone footage, and photography capturing the vibe of your stay." },
  { num: "04", title: "Booking Funnel & Lead Setup", desc: "Posts and bio links optimized for direct booking engine integration, WhatsApp booking, and customized landing pages." },
  { num: "05", title: "Engagement & Community Review", desc: "Weekly monitoring of booking inquiries, click-through rates, follower loyalty, and visual reach." },
];

const faqs = [
  { q: "How do you capture the property's atmosphere?", a: "We conduct on-site professional shoots using high-end videography, cinematic drone tours, and mood photography to convey the luxury, comfort, and ambient beauty of your property." },
  { q: "Can you increase direct bookings through social?", a: "Absolutely. By integrating seamless CTAs, story links, WhatsApp bookers, and target-rich campaign funnels, we aim to reduce OTAs reliance and maximize your direct booking revenue." },
  { q: "What type of content performs best for hotels and resorts?", a: "Short-form cinematic reels showcasing room walkthroughs, sunrise vistas, gourmet cooking showcases, guest-generated reels, and behind-the-scenes hospitality stories get the highest reach and booking intent." },
  { q: "How do you handle influencer collaborations?", a: "We design influencer vetting criteria, coordinate visits, structure deliverable briefs, and run co-authored campaigns to amplify your property to highly relevant travel and lifestyle audiences." },
];

const galleryItems = [
  { label: "Cinematic Room Tour", tag: "Hospitality", emoji: "" },
  { label: "Gourmet Culinary Showcase", tag: "Food & Beverage", emoji: "" },
  { label: "Direct Booking CTA Story", tag: "Conversion", emoji: "" },
  { label: "Guest Experience Highlight", tag: "Social Proof", emoji: "" },
  { label: "Drone Sunrise Tour", tag: "Aesthetics", emoji: "" },
  { label: "Behind-the-Scenes Story", tag: "Hospitality", emoji: "" },
  { label: "Weekend Retreat Package", tag: "Promotion", emoji: "" },
  { label: "Infinity Pool Drone Cover", tag: "Video", emoji: "" },
];

const stats = [
  { val: "Drone", label: "Walkthroughs Shot" },
  { val: "Direct", label: "Booking CTA" },
  { val: "Cinematic", label: "First Approach" },
  { val: "OTAs", label: "Funnel Optimized" },
];

/* ─── Hospitality Social Media Grid Items ─── */
const hospitalityGridItems = [
  {
    id: 1,
    imgUrl: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Social-Media-Pages-Images/Healthcaresocialmedia1.png",
    title: "Cinematic Resort Sunrise",
    link: "https://www.instagram.com/aadevinternationalllc?igsh=MXIxZ2dxM2xsbnY5Zg==",
    tag: "Resort Stay"
  },
  {
    id: 2,
    imgUrl: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Social-Media-Pages-Images/Healthcaresocialmedia2.png",
    title: "Luxury Suite Walkthrough",
    link: "https://www.instagram.com/aadevinternationalllc?igsh=MXIxZ2dxM2xsbnY5Zg==",
    tag: "Room Tour"
  },
  {
    id: 3,
    imgUrl: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Social-Media-Pages-Images/Healthcaresocialmedia3.png",
    title: "Fine Dining Culinary Showcase",
    link: "https://www.instagram.com/aadevinternationalllc?igsh=MXIxZ2dxM2xsbnY5Zg==",
    tag: "Gastronomy"
  },
  {
    id: 4,
    imgUrl: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Social-Media-Pages-Images/Healthcaresocialmedia4.png",
    title: "Infinity Pool Experience",
    link: "https://www.instagram.com/aadevinternationalllc?igsh=MXIxZ2dxM2xsbnY5Zg==",
    tag: "Vibe Check"
  }
];

export default function HospitalitySocialMediaPage() {
  return (
    <div style={{ background: "#090909", color: "#F5F0E8", minHeight: "100vh", fontFamily: "'EB Garamond', serif", paddingTop: 100 }}>
      <style>{`
        ${FONTS}
        ${GLOBAL_CSS}

        /* ─── HERO SECTION ─── */
        .hc-hero-section {
          min-height: 40vh !important;
          width: 100% !important;
          box-sizing: border-box !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: center !important;
          align-items: center !important;
          padding-top: 160px !important;
          padding-bottom: 80px !important;
          padding-left: clamp(20px, 6vw, 80px) !important;
          padding-right: clamp(20px, 6vw, 80px) !important;
          position: relative !important;
          overflow: hidden !important;
          text-align: center !important;
          background: #090909 !important;
        }

        /* Inner column */
        .hc-hero-inner {
          position: relative !important;
          z-index: 1 !important;
          width: 100% !important;
          max-width: 820px !important;
          margin: 0 auto !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          justify-content: center !important;
          text-align: center !important;
        }

        /* Back link */
        .hc-back-link {
          display: inline-flex !important;
          align-items: center !important;
          gap: 8px !important;
          font-family: 'Montserrat', sans-serif !important;
          font-size: 11px !important;
          letter-spacing: 0.1em !important;
          text-transform: uppercase !important;
          color: rgba(201,168,76,0.65) !important;
          text-decoration: none !important;
          margin-bottom: 32px !important;
          transition: color 0.2s !important;
          text-align: center !important;
        }
        .hc-back-link:hover { color: #C9A84C !important; }

        /* Icon */
        .hc-icon {
          font-size: clamp(36px, 6vw, 52px) !important;
          line-height: 1 !important;
          margin-bottom: 16px !important;
          display: block !important;
          text-align: center !important;
          width: 100% !important;
        }

        /* Label badge */
        .hc-label {
          font-family: 'Montserrat', sans-serif !important;
          font-size: 11px !important;
          letter-spacing: 0.14em !important;
          text-transform: uppercase !important;
          color: rgba(201,168,76,0.75) !important;
          border: 1px solid rgba(201,168,76,0.3) !important;
          padding: 6px 18px !important;
          display: inline-block !important;
          margin-bottom: 28px !important;
          text-align: center !important;
        }

        /* H1 */
        .hc-h1 {
          font-family: 'Cormorant Garamond', serif !important;
          font-size: clamp(32px, 7vw, 80px) !important;
          font-weight: 300 !important;
          line-height: 1.12 !important;
          color: #F5F0E8 !important;
          margin: 0 0 28px 0 !important;
          padding: 0 !important;
          text-align: center !important;
          width: 100% !important;
        }

        /* Description paragraph */
        .hc-desc {
          font-family: 'EB Garamond', serif !important;
          font-size: clamp(15px, 2.2vw, 20px) !important;
          line-height: 1.78 !important;
          color: rgba(245,240,232,0.72) !important;
          max-width: 600px !important;
          width: 100% !important;
          margin: 0 0 24px 0 !important;
          padding: 0 !important;
          text-align: center !important;
        }

        /* Tagline with left border */
        .hc-tagline {
          font-family: 'Montserrat', sans-serif !important;
          font-size: clamp(12px, 1.5vw, 14px) !important;
          color: rgba(201,168,76,0.85) !important;
          letter-spacing: 0.03em !important;
          margin: 0 0 44px 0 !important;
          padding: 6px 16px !important;
          border-left: 2px solid rgba(201,168,76,0.45) !important;
          max-width: 500px !important;
          width: 100% !important;
          text-align: left !important;
          box-sizing: border-box !important;
        }

        /* CTA row */
        .hc-cta-row {
          display: flex !important;
          gap: 16px !important;
          flex-wrap: wrap !important;
          justify-content: center !important;
          align-items: center !important;
          width: 100% !important;
          margin-bottom: 56px !important;
        }

        /* Stats grid */
        .hc-stats-grid {
          display: grid !important;
          grid-template-columns: repeat(4, 1fr) !important;
          gap: 1px !important;
          background: rgba(201,168,76,0.15) !important;
          width: 100% !important;
          max-width: 640px !important;
          margin: 0 auto !important;
        }

        .hc-stat-cell {
          background: #090909 !important;
          text-align: center !important;
          padding: clamp(18px, 3vw, 28px) clamp(8px, 2vw, 16px) !important;
          box-sizing: border-box !important;
        }

        .hc-stat-val {
          font-family: 'Cormorant Garamond', serif !important;
          font-size: clamp(20px, 4vw, 36px) !important;
          font-weight: 600 !important;
          color: #C9A84C !important;
          line-height: 1 !important;
          text-align: center !important;
        }

        .hc-stat-label {
          font-family: 'Montserrat', sans-serif !important;
          font-size: clamp(8px, 1.1vw, 10px) !important;
          letter-spacing: 0.08em !important;
          text-transform: uppercase !important;
          color: rgba(245,240,232,0.4) !important;
          margin-top: 8px !important;
          text-align: center !important;
        }

        /* ── Mobile ── */
        @media (max-width: 600px) {
          .hc-hero-section {
            padding-top: 70px ;
            padding-bottom: 0px !important;
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
          .hc-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .hc-cta-row {
            flex-direction: column !important;
            align-items: center !important;
          }
        }

        /* ── LIVE SOCIAL FEED ── */
        .social-feed-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 32px;
          margin-top: 40px;
          max-width: 1100px;
          margin-left: auto;
          margin-right: auto;
        }
        @media (min-width: 640px) {
          .social-feed-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        .social-feed-card {
          background: #0d0d0d;
          border: 1px solid rgba(201,168,76,0.15);
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          border-radius: 8px;
        }
        .social-feed-card:hover {
          border-color: rgba(201,168,76,0.5);
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(201,168,76,0.1);
        }
        .feed-header {
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255,255,255,0.02);
          border-bottom: 1px solid rgba(201,168,76,0.1);
          z-index: 2;
        }
        .feed-user {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .feed-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
          padding: 2px;
        }
        .feed-avatar img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 2px solid #0d0d0d;
          object-fit: cover;
        }
        .feed-handle {
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #F5F0E8;
        }
        .feed-content {
          flex: 1;
          background: rgba(201,168,76,0.02);
          overflow: hidden;
          position: relative;
          min-height: 0;
        }
        .feed-iframe {
          width: 100%;
          height: 100%;
          border: none;
          overflow: auto;
        }
        .feed-img {
          transition: all 0.4s ease;
        }
        .feed-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          z-index: 4;
        }
        .social-feed-card:hover .feed-overlay {
          opacity: 1;
        }
        .social-feed-card:hover .feed-img {
          transform: scale(1.06);
          opacity: 0.35;
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="hc-hero-section" style={{ marginTop: "100px" }}>
        {/* Bg layers */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 50% 45%, rgba(201,168,76,0.09) 0%, transparent 65%)", pointerEvents: "none", zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(90deg,rgba(201,168,76,0.02) 0px,transparent 1px,transparent 60px)", pointerEvents: "none", zIndex: 0 }} />

        <div className="hc-hero-inner">
          <h1 className="hc-h1">
            Social Media Marketing
            <br />
            <em style={{ color: "#C9A84C", fontStyle: "italic" }}>for Hospitality, Hotels &amp; Resorts</em>
          </h1>

          <p className="hc-desc">
            We capture the aesthetic, the warmth, and the premium vibe of your stay. The goal: stellar drone walkthroughs, direct booking growth, and guest brand loyalty.
          </p>

          <div className="hc-tagline">
            Cinematic visuals and custom funnel systems designed for hotels, retreats, and restaurants booking directly on social media.
          </div>

          <div className="hc-stats-grid">
            {stats.map((m) => (
              <div key={m.label} className="hc-stat-cell">
                <div className="hc-stat-val">{m.val}</div>
                <div className="hc-stat-label">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOSPITALITY SHOWCASE ── */}
      <section style={{ padding: "20px clamp(20px,5vw,80px)", background: "rgba(201,168,76,0.02)", borderTop: "1px solid rgba(201,168,76,0.08)", boxSizing: "border-box" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeading
            label="Social Showcase"
            title={<>Hospitality Social<br /><em style={{ color: "#C9A84C" }}>Media Feed</em></>}
            subtitle="Curated stay tours, culinary highlights, and guest reels."
          />
          <div className="social-feed-grid">
            {hospitalityGridItems.map((item) => (
              <div
                key={item.id}
                className="social-feed-card"
                onClick={() => window.open(item.link, '_blank')}
              >
                {/* Header */}
                <div className="feed-header">
                  <div className="feed-user">

                    <span className="feed-handle">@aadevinternationalllc</span>
                  </div>
                  <FaInstagram style={{ color: '#E4405F', fontSize: 18 }} />
                </div>

                {/* Image Container */}
                <div className="feed-content" style={{ position: "relative", width: "100%", height: "auto", overflow: "hidden" }}>
                  <img
                    src={item.imgUrl}
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      transition: "all 0.4s ease"
                    }}
                    className="feed-img"
                  />

                  {/* Hover Overlay */}
                  <div className="feed-overlay">
                    <FaInstagram style={{ color: "#C9A84C", fontSize: 44, display: "inline-block", zIndex: 5 }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT WE DO ── */}
      <section style={{ padding: "20px clamp(20px,5vw,80px)", borderTop: "1px solid rgba(201,168,76,0.1)", boxSizing: "border-box" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeading label="Our Approach" title={<>Hospitality Social<br /><em style={{ color: "#C9A84C" }}>That Drives direct Bookings</em></>} subtitle="Experience-driven visual aesthetics and direct funnels." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 2, background: "rgba(201,168,76,0.07)" }}>
            {[
              { title: "Cinematic Drone & Visuals", icon: "", bullets: ["Property walkthroughs, drone sunrise shots and guest-first experiences", "Instagram Reels and TikTok videos curated for wanderlust lifestyle markets", "High-fidelity imagery of rooms, fine-dining, pool areas and amenities"] },
              { title: "Direct Booking Engine Integration", icon: "", bullets: ["Optimized bios and post links connected to your booking software", "Targeted Meta ad funnels aiming to reduce OTA reliance", "WhatsApp-enabled quick inquiry and room availability booking chats"] },
              { title: "Influencer Campaign Management", icon: "", bullets: ["Structured partner invites, content guides and co-authored reels", "Audited vetting protocols ensuring only high-quality creators visit", "Consistent brand amplification to travel, luxury and wellness audiences"] },
              { title: "Behind-The-Scenes storytelling", icon: "", bullets: ["Chef cooking showcases, farm-to-table narratives and staff diaries", "Exclusive package features, seasonal retreats and weekend promotions", "Fostering premium community interaction and reputation monitoring"] },
            ].map((card) => (
              <div key={card.title} style={{ background: "#090909", padding: "40px 32px", boxSizing: "border-box" }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{card.icon}</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 500, color: "#F5F0E8", marginBottom: 18 }}>{card.title}</div>
                <BulletList items={card.bullets} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section style={{ padding: "20px clamp(20px,5vw,80px)", boxSizing: "border-box" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeading label="Our Process" title={<>How We Run Hospitality<br /><em style={{ color: "#C9A84C" }}>Social for You</em></>} />
          <ProcessSteps steps={processSteps} />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: "20px clamp(20px,5vw,80px)", boxSizing: "border-box" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeading label="Quick Answers" title={<>Hospitality Social <em style={{ color: "#C9A84C" }}>FAQ</em></>} />
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      <ContactUsForm />
      <ServiceSection />
    </div>
  );
}
