import {
  SectionLabel, SectionHeading, GoldButton, OutlineButton,
  BulletList, ProcessSteps, FAQAccordion, CTABand, EmbedPlaceholder, ClientStrip, GalleryGrid
} from "../../ui/Components";
import { FONTS, GLOBAL_CSS } from "@/components/ui/styles";
import ServiceSection from "@/components/HomePage/ServicesSection";
import ContactUsForm from "@/pages/ContactUsForm";
import { FaInstagram, FaFacebook, FaExternalLinkAlt } from "react-icons/fa";

const processSteps = [
  { num: "01", title: "Brand & Business Audit", desc: "We study your business, existing content, audience and how you want to be perceived online." },
  { num: "02", title: "Content & Brand Strategy", desc: "We define your content pillars: expertise, results, behind-the-scenes, community and offers." },
  { num: "03", title: "Visual Identity & Aesthetic", desc: "We align your visual language professional, consistent and on-brand across all posts and platforms." },
  { num: "04", title: "Publishing & Lead Funnel", desc: "Posts linked to your website, WhatsApp or booking pages for seamless lead-to-conversion flow." },
  { num: "05", title: "Growth & Performance Review", desc: "Monthly review of follower growth, reach, engagement, enquiries and conversion performance." },
];

const faqs = [
  { q: "Can you handle social media for any industry?", a: "Yes. We build content strategies tailored to your specific industry whether it's services, products, B2B or B2C aligned with your brand positioning and target audience." },
  { q: "How do you ensure content feels authentic and not salesy?", a: "We focus on value-first content educational posts, behind-the-scenes, real results and storytelling. Promotional content is woven in naturally after trust is established." },
  { q: "Do you help with campaign launches on social media?", a: "Yes. We plan full launch sequences teaser, value content, proof, offer window, urgency close across posts, stories and reels to maximise results." },
  { q: "How do lead capture and bookings get integrated?", a: "We embed your website, WhatsApp, Calendly or any booking/payment system into posts, bio and story CTAs so interested followers can convert without friction." },
];

const galleryItems = [
  { label: "Brand Awareness Post", tag: "Awareness", emoji: "" },
  { label: "Client Results Card", tag: "Proof", emoji: "" },
  { label: "Service Showcase Reel", tag: "Promotion", emoji: "" },
  { label: "Campaign Launch Teaser", tag: "Launch", emoji: "" },
  { label: "Educational Carousel", tag: "Education", emoji: "" },
  { label: "Engagement Story Template", tag: "Engagement", emoji: "" },
  { label: "Offer Announcement Banner", tag: "Campaign", emoji: "" },
  { label: "Q&A Story Template", tag: "Community", emoji: "" },
];

const heroStats = [
  { val: "Strategy", label: "Tailored to You" },
  { val: "Content", label: "That Converts" },
  { val: "Growth", label: "Month on Month" },
  { val: "Brand", label: "Consistency" },
];

/* ─── Numerology Social Media Grid Items ─── */
const numerologyGridItems = [
  {
    id: 1,
    imgUrl: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Social-Media-Pages-Images/Tarushpranasocialmedia1.png",
    title: "Vedic Numerology Analysis",
    link: "https://www.instagram.com/tarushpranaa?igsh=MXV5M3VpNHZmOTl0Zg==",
    tag: "Astro Feature"
  },
  {
    id: 2,
    imgUrl: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Social-Media-Pages-Images/Tarushpranasocialmedia2.jpg",
    title: "Destiny Number Secrets",
    link: "https://www.instagram.com/tarushpranaa?igsh=MXV5M3VpNHZmOTl0Zg==",
    tag: "Knowledge"
  },
  {
    id: 3,
    imgUrl: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Social-Media-Pages-Images/Tarushpranasocialmedia3.png",
    title: "Daily Horoscope Rituals",
    link: "https://www.instagram.com/tarushpranaa?igsh=MXV5M3VpNHZmOTl0Zg==",
    tag: "Daily Astro"
  },
  {
    id: 4,
    imgUrl: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Social-Media-Pages-Images/Tarushprana7.png",
    title: "Success & Spiritual Guide",
    link: "https://www.instagram.com/tarushpranaa?igsh=MXV5M3VpNHZmOTl0Zg==",
    tag: "Life Coach"
  }
];

export default function SocialMediaServicePage() {
  return (
    <div style={{ background: "#090909", color: "#F5F0E8", minHeight: "100vh", fontFamily: "'EB Garamond', serif" }}>
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
        .num-hero-section {
          min-height: min(90vh, var(--hero-max));
          display: flex; flex-direction: column;
          justify-content: center; align-items: center;
          padding-top: 100px; padding-bottom: 40px;
          padding-left: clamp(16px, 5vw, 80px);
          padding-right: clamp(16px, 5vw, 80px);
          position: relative; overflow: hidden;
          background: #090909;
        }
        @media (min-width: 768px) {
          .num-hero-section { padding-top: 100px; padding-bottom: 80px; }
        }
        .num-hero-stats {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 0; width: 100%; max-width: 680px;
          margin-top: 48px; background: rgba(201,168,76,0.1);
        }
        @media (min-width: 640px) {
          .num-hero-stats { grid-template-columns: repeat(4, 1fr); }
        }
        .num-stat-item {
          background: #090909; text-align: center;
          padding: 28px 16px; margin: 1px;
        }
        .num-stat-val {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(24px, 4vw, 36px);
          font-weight: 600; color: #C9A84C; line-height: 1;
        }
        .num-stat-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 10px; letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.4); margin-top: 8px;
        }

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
      `}</style>

      {/* HERO */}
      <section className="num-hero-section">
        <div style={{ maxWidth: 1280, width: "100%", position: "relative", zIndex: 1, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(40px,6.5vw,84px)", fontWeight: 300, lineHeight: 1.1, color: "#F5F0E8", maxWidth: 860 }}>
            Social Media Marketing<br /><em style={{ color: "#C9A84C" }}>That Drives Real Results</em>
          </h1>
          <p style={{ fontSize: "clamp(17px,2vw,21px)", lineHeight: 1.75, color: "rgba(245,240,232,0.72)", maxWidth: 660, marginBottom: 20, fontFamily: "'EB Garamond',serif" }}>
            We create strategy-driven social media content that builds your brand, engages your audience and converts followers into paying customers.
          </p>
          <p style={{ fontSize: 14, color: "rgba(201,168,76,0.85)", fontFamily: "'Montserrat',sans-serif", letterSpacing: "0.03em", marginBottom: 44, paddingLeft: 16, borderLeft: "2px solid rgba(201,168,76,0.4)", textAlign: "left", maxWidth: 660 }}>
            Professional, consistent content that positions your brand as the go-to choice in your industry.
          </p>
          {/* <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
            <GoldButton>Build My Brand</GoldButton>
            <OutlineButton>View Our Work</OutlineButton>
          </div> */}
          <div className="num-hero-stats">
            {heroStats.map((s) => (
              <div key={s.label} className="num-stat-item">
                <div className="num-stat-val">{s.val}</div>
                <div className="num-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ASTRO SOCIAL SHOWCASE */}
      <section style={{ padding: "20px clamp(16px,5vw,80px)", background: "rgba(201,168,76,0.02)", borderTop: "1px solid rgba(201,168,76,0.08)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeading label="Social Showcase" title={<>Numerology & Astro<br /><em style={{ color: "#C9A84C" }}>Social Feed</em></>} subtitle="Curated cosmic insights, destiny readings, and daily horoscopes." />
          <div className="social-feed-grid">
            {numerologyGridItems.map((item) => (
              <div
                key={item.id}
                className="social-feed-card"
                onClick={() => window.open(item.link, '_blank')}
              >
                {/* Header */}
                <div className="feed-header">
                  <div className="feed-user">

                    <span className="feed-handle">@Tarushpranna</span>
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

      {/* WHAT WE DO */}
      <section style={{ padding: "20px clamp(16px,5vw,80px)", borderTop: "1px solid rgba(201,168,76,0.1)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeading label="Our Approach" title={<>Social Media<br /><em style={{ color: "#C9A84C" }}>That Builds & Converts</em></>} subtitle="Strategy before content. Value before selling." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 2, background: "rgba(201,168,76,0.07)" }}>
            {[
              { title: "Brand & Authority Content", icon: "", bullets: ["Industry insights, tips and educational posts that position you as an expert", "Behind-the-scenes content that humanises your brand and builds trust", "Thought leadership posts that differentiate you from competitors"] },
              { title: "Results & Social Proof", icon: "", bullets: ["Client success stories and transformation showcases", "Before/after results and case study highlights", "Testimonial graphics and video testimonials that build credibility"] },
              { title: "Campaigns & Promotions", icon: "", bullets: ["Product/service launch sequences across posts, stories and reels", "Seasonal and event-based campaign planning and execution", "Offer announcements with urgency-driven creative"] },
              { title: "Lead Funnel & Visual Identity", icon: "", bullets: ["Website, WhatsApp and booking links integrated into every touchpoint", "Consistent visual aesthetic colours, fonts, layouts every week", "Bio optimisation, highlight covers and profile setup for conversions"] },
            ].map((card) => (
              <div key={card.title} style={{ background: "#090909", padding: "40px 32px" }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{card.icon}</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 500, color: "#F5F0E8", marginBottom: 18 }}>{card.title}</div>
                <BulletList items={card.bullets} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section style={{ padding: "20px clamp(16px,5vw,80px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeading label="Our Process" title={<>How We Build Your<br /><em style={{ color: "#C9A84C" }}>Social Media Presence</em></>} />
          <ProcessSteps steps={processSteps} />
        </div>
      </section>



      {/* FAQ */}
      <section style={{ padding: "20px clamp(16px,5vw,80px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeading label="Quick Answers" title={<>Social Media <em style={{ color: "#C9A84C" }}>FAQ</em></>} />
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      <ContactUsForm />
      <ServiceSection />
    </div>
  );
}
