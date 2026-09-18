// ============================================================
// FILE: src/components/ServicesOffered/ECOMMERCE/EcommerceSocialMediaPage.tsx
// ============================================================

import React, { useState, useEffect } from "react";
import {
  SectionLabel, SectionHeading, GoldButton, OutlineButton,
  BulletList, ProcessSteps, FAQAccordion, CTABand, EmbedPlaceholder, ClientStrip, GalleryGrid
} from "../../ui/Components";
import ServiceSection from "@/components/HomePage/ServicesSection";
import ContactUsForm from "@/pages/ContactUsForm";
import { FaInstagram, FaFacebook, FaExternalLinkAlt } from "react-icons/fa";

/* ─── colour tokens ─── */
const C = {
  gold: "#C9A84C",
  goldLine: "rgba(201,168,76,0.15)",
  cream: "#F5F0E8",
  creamMid: "rgba(245,240,232,0.72)",
  creamDim: "rgba(245,240,232,0.4)",
  bg: "#090909",
};

const SERIF = { fontFamily: "'Cormorant Garamond', serif" } as const;
const SANS = { fontFamily: "'Montserrat', sans-serif" } as const;
const BODY = { fontFamily: "'EB Garamond', serif" } as const;

/* ─── Metric tile ─── */
function MetricTile({ val, label }: { val: string; label: string }) {
  return (
    <div style={{ background: C.bg, textAlign: "center", padding: "28px 16px", flex: "1 1 130px" }}>
      <div style={{ ...SERIF, fontSize: 34, fontWeight: 600, color: C.gold, lineHeight: 1 }}>{val}</div>
      <div style={{ ...SANS, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: C.creamDim, marginTop: 8 }}>{label}</div>
    </div>
  );
}

/* ─── Service card ─── */
function ServiceCard({ title, icon, bullets }: { title: string; icon: string; bullets: string[] }) {
  return (
    <div style={{ background: C.bg, padding: "40px 32px", flex: "1 1 260px" }}>
      <div style={{ fontSize: 32, marginBottom: 12 }}>{icon}</div>
      <div style={{ ...SERIF, fontSize: 22, fontWeight: 500, color: C.cream, marginBottom: 18 }}>{title}</div>
      <BulletList items={bullets} />
    </div>
  );
}

/* ─── Data ─── */
const processSteps = [
  { num: "01", title: "Catalog & Store Audit", desc: "We review your product catalog, website, existing ads and competitor brands on social." },
  { num: "02", title: "Content Strategy & Campaign Calendar", desc: "Monthly calendar mapped to sale events, product launches, combos and seasonal demand peaks." },
  { num: "03", title: "Creative Production", desc: "Product reels, use-case videos, unboxing content, offer banners all designed for platform-native formats." },
  { num: "04", title: "Publishing & UTM Tracking", desc: "Scheduled posts with UTM links tied to your store (Shopify/WooCommerce) so every order source is traceable." },
  { num: "05", title: "Order Attribution & Monthly Review", desc: "Monthly report on social-attributed orders, revenue, best-performing creatives and next campaign plan." },
];

const faqs = [
  { q: "Can you track how many orders come from social media?", a: "Yes. We set up UTM parameters on every link so your analytics can attribute orders and revenue directly to specific posts, reels or campaigns on each platform." },
  { q: "Do you integrate with Shopify or WooCommerce?", a: "Yes. We link directly to your product pages, collection pages and offer landing pages on Shopify, WooCommerce or any custom ecommerce setup." },
  { q: "Do you also run paid ads or only organic content?", a: "Our Social Media Management covers organic. We also offer a Meta & Google Ads add-on that uses the same creatives and links to the same pages so the funnel is seamless." },
  { q: "What kind of brands have you scaled on social?", a: "We've scaled food brands, wellness products and specialty D2C brands including Babaji Ki Booti, Khambani Foods and Devi Chitra Lekha to 700 800 orders per day through combined social and ads systems." },
];

const galleryItems = [
  { label: "Product Feature Post", tag: "Ecommerce", emoji: "" },
  { label: "Combo Offer Banner", tag: "Campaign", emoji: "" },
  { label: "Unboxing Reel Cover", tag: "Video", emoji: "" },
  { label: "How-to-Use Reel", tag: "Education", emoji: "" },
  { label: "Sale Campaign Banner", tag: "Campaign", emoji: "" },
  { label: "Customer Review Post", tag: "Social Proof", emoji: "" },
  { label: "Festive Product Post", tag: "Festival", emoji: "" },
  { label: "New Launch Teaser", tag: "Launch", emoji: "" },
];

const metrics = [
  { val: "700+", label: "Orders / Day" },
  { val: "UTM", label: "Tracked Revenue" },
  { val: "Shopify", label: "Integrated" },
  { val: "Meta", label: "Ads Supported" },
];

/* ─── Baba Jikibuti Social Media Grid Items ─── */
const babajiGridItems = [
  {
    id: 1,
    imgUrl: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Social-Media-Pages-Images/babajikibutisocialmedia1.png",
    title: "Pure Herbal Wellness",
    likes: "1,248",
    comments: "84",
    link: "https://www.instagram.com/babajikibuti_official?igsh=ZTY1bHB2cHBvNWRw",
    tag: "Product Spotlight"
  },
  {
    id: 2,
    imgUrl: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Social-Media-Pages-Images/babajikibutisocialmedia2.png",
    title: "Nourishing Wellness Tea",
    likes: "942",
    comments: "56",
    link: "https://www.instagram.com/babajikibuti_official?igsh=ZTY1bHB2cHBvNWRw",
    tag: "Daily Rituals"
  },
  {
    id: 3,
    imgUrl: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Social-Media-Pages-Images/babajikibutisocialmedia3.png",
    title: "100% Organic Extracts",
    likes: "2,056",
    comments: "112",
    link: "https://www.instagram.com/babajikibuti_official?igsh=ZTY1bHB2cHBvNWRw",
    tag: "Ingredients"
  },
  {
    id: 4,
    imgUrl: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Social-Media-Pages-Images/babajikibutisocialmedia4.png",
    title: "Natural Healing Power",
    likes: "1,580",
    comments: "95",
    link: "https://www.instagram.com/babajikibuti_official?igsh=ZTY1bHB2cHBvNWRw",
    tag: "Customer Love"
  }
];

/* ══════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════ */
export default function EcommerceSocialMediaPage() {
  const [vw, setVw] = useState(1440);
  useEffect(() => {
    const fn = () => setVw(window.innerWidth);

    // Sync to the real viewport immediately after mount. The initial state is
    // fixed at the pre-render value so hydration matches; without this line a
    // phone would stay on the desktop layout until the first resize event.
    fn();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const isMobile = vw < 640;

  /*
   * NAVBAR_H height of your fixed navbar in px.
   * Increase / decrease to match your actual bar.
   */
  const NAVBAR_H = isMobile ? 72 : 80;

  const hPad = isMobile ? "20px" : "clamp(32px,5vw,80px)";
  const secPad = `20px ${hPad}`;

  return (
    <div
      style={{
        background: C.bg,
        color: C.cream,
        minHeight: "100vh",
        ...BODY,
        overflowX: "hidden",
        paddingTop: NAVBAR_H, /* ← push below fixed navbar */
      }}
    >
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        img { display: block; max-width: 100%; }

        /* ── LIVE SOCIAL FEED ─────────────────────────────────── */
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
        .live-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: #ff0000;
          color: white;
          font-family: 'Montserrat', sans-serif;
          font-size: 8px;
          font-weight: 800;
          padding: 2px 6px;
          border-radius: 2px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          animation: pulse 2s infinite;
          z-index: 3;
          pointer-events: none;
        }
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
        .instagram-redirect {
          position: absolute;
          bottom: 15px;
          right: 15px;
          width: 40px;
          height: 40px;
          background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
          transform: translateY(20px);
          opacity: 0;
          transition: all 0.3s ease;
          z-index: 4;
          pointer-events: auto;
        }
        .social-feed-card:hover .instagram-redirect {
          transform: translateY(0);
          opacity: 1;
        }
      `}</style>

      {/* ════════════════════════════════════════
          HERO extra top padding, fully centred
      ════════════════════════════════════════ */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          /*
           * top padding is larger (140px desktop / 100px mobile) so the
           * content feels comfortably below the navbar.
           */
          padding: isMobile ? "100px 20px 79px" : `140px ${hPad} 100px`,
        }}
      >
        {/* ambient glow */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 80% 55% at 50% 45%, rgba(201,168,76,0.09) 0%, transparent 65%)",
        }} />
        {/* grid lines */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage:
            "repeating-linear-gradient(0deg,rgba(201,168,76,0.025) 0px,transparent 1px,transparent 70px)," +
            "repeating-linear-gradient(90deg,rgba(201,168,76,0.025) 0px,transparent 1px,transparent 70px)",
        }} />

        {/* ── inner content ALWAYS centred ── */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 860,          /* constrain for readability */
            margin: "0 auto",       /* horizontal centre on all breakpoints */
            width: "100%",
            textAlign: "center",    /* centre-align ALL hero text */
            display: "flex",
            flexDirection: "column",
            alignItems: "center",   /* centre flex children too */
          }}
        >
          {/* H1 */}
          <h1
            style={{
              ...SERIF,
              fontSize: isMobile ? "2.4rem" : "clamp(40px,6.5vw,84px)",
              fontWeight: 300,
              lineHeight: 1.12,
              color: C.cream,
              marginBottom: 32,
              maxWidth: "100%",
              marginTop: "100px"
            }}
          >
            Social Media Marketing
            <br />
            <em style={{ color: C.gold }}>for Ecommerce Brands</em>
          </h1>

          {/* sub-paragraph */}
          <p
            style={{
              ...BODY,
              fontSize: isMobile ? "1.1rem" : "clamp(17px,2vw,21px)",
              lineHeight: 1.8,
              color: C.creamMid,
              maxWidth: 620,
              marginBottom: 28,
            }}
          >
            We connect your product catalog, website and logistics with content
            that actually pushes orders. Creatives, reels and offers are mapped
            directly to product pages and campaigns.
          </p>

          {/* gold accent quote */}
          <div
            style={{
              borderTop: "2px solid rgba(201,168,76,0.35)",
              borderBottom: "2px solid rgba(201,168,76,0.35)",
              padding: "18px 24px",
              marginBottom: 48,
              maxWidth: 560,
              width: "100%",
            }}
          >
            <p style={{
              ...SANS,
              fontSize: 13,
              color: "rgba(201,168,76,0.9)",
              letterSpacing: "0.04em",
              lineHeight: 1.65,
            }}>
              700 800 orders per day achieved for our ecommerce clients through
              structured content and ad systems.
            </p>
          </div>

          {/* CTA buttons */}
          {/* <div style={{ display: "flex", gap: 16, flexWrap: "wrap" as const, justifyContent: "center", marginBottom: 72 }}>
            <GoldButton>Scale My Ecommerce Brand</GoldButton>
            <OutlineButton>View Ecommerce Work</OutlineButton>
          </div> */}

          {/* metric tiles centred strip */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap" as const,
              gap: 1,
              background: "rgba(201,168,76,0.12)",
              width: "100%",
              maxWidth: 640,
            }}
          >
            {metrics.map((m) => (
              <MetricTile key={m.label} val={m.val} label={m.label} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          BABAJI KI BOOTI SOCIAL MEDIA GRID
      ════════════════════════════════════════ */}
      <section style={{ padding: secPad, background: "rgba(201,168,76,0.02)", borderTop: "1px solid rgba(201,168,76,0.08)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeading
            label="Social Showcase"
            title={<>Babaji Ki Booti<br /><em style={{ color: C.gold }}>Social Media Feed</em></>}
            subtitle="Curated visual stories, product spotlights, and daily wellness rituals from @babajikibooti."
          />
          <div className="social-feed-grid">
            {babajiGridItems.map((item) => (
              <div
                key={item.id}
                className="social-feed-card"
                onClick={() => window.open(item.link, '_blank')}
              >
                {/* Header */}
                <div className="feed-header">
                  <div className="feed-user">

                    <span className="feed-handle">@babajikibooti</span>
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
                    <FaInstagram style={{ color: C.gold, fontSize: 44, display: "inline-block", zIndex: 5 }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          WHAT WE DO
      ════════════════════════════════════════ */}
      <section style={{ padding: secPad, borderTop: `1px solid ${C.goldLine}` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeading
            label="Our Approach"
            title={<>Ecommerce Social<br /><em style={{ color: C.gold }}>That Drives Orders</em></>}
            subtitle="Every post is designed to push someone closer to checkout not just rack up likes."
          />
          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 2, background: "rgba(201,168,76,0.07)" }}>
            <ServiceCard icon="" title="Product-Centric Content" bullets={[
              "Posts highlighting USPs, bundles, combos and value stacks",
              "Lifestyle content showing your product in use not just flat lays",
              "New launch sequences: teaser → reveal → offer → urgency",
            ]} />
            <ServiceCard icon="" title="Reels & Video Content" bullets={[
              "How-to-use reels that educate and convert",
              "Unboxing and customer reaction videos for trust and social proof",
              "Behind-the-scenes packaging and sourcing content for brand story",
            ]} />
            <ServiceCard icon="" title="Campaign & Offer Management" bullets={[
              "Sale campaigns (Big Billion, festive, anniversary) with UTM tracking",
              "Limited-time offers with countdown graphics and story urgency formats",
              "WhatsApp flows for abandoned cart recovery and post-order upsells",
            ]} />
            <ServiceCard icon="" title="Platform & Ad Integration" bullets={[
              "Coordination with Meta & Google ads team for creative consistency",
              "Instagram Shopping and Facebook Catalog integration",
              "Performance posts designed to work as both organic and paid creatives",
            ]} />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          PROCESS
      ════════════════════════════════════════ */}
      <section style={{ padding: secPad }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeading
            label="Our Process"
            title={<>How We Run Ecommerce<br /><em style={{ color: C.gold }}>Social for You</em></>}
          />
          <ProcessSteps steps={processSteps} />
        </div>
      </section>

      {/* ════════════════════════════════════════
          FAQ
      ════════════════════════════════════════ */}
      <section style={{ padding: secPad }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeading
            label="Quick Answers"
            title={<>Ecommerce Social <em style={{ color: C.gold }}>FAQ</em></>}
          />
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      {/* ════════════════════════════════════════
          CTA BAND
      ════════════════════════════════════════ */}
      <ContactUsForm />

      <ServiceSection />
    </div>
  );
}