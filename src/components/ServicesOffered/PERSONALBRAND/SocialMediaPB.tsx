// ============================================================
// FILE: src/components/ServicesOffered/PERSONALBRAND/PersonalBrandingSocialMediaPage.tsx
// ADD ROUTE: your route for Personal Branding page
// ============================================================

// PersonalBrandingSocialMediaPage.tsx
// Route: /social-media/personal-branding

import {
  SectionLabel, SectionHeading, GoldButton, OutlineButton,
  BulletList, ProcessSteps, FAQAccordion, CTABand, EmbedPlaceholder, ClientStrip, GalleryGrid
} from "../../ui/Components";
import { FONTS, GLOBAL_CSS } from "../../ui/styles";
import ServiceSection from "@/components/HomePage/ServicesSection"; // Adjust the path if your ServicesSection is located elsewhere

const processSteps = [
  { num: "01", title: "Founder & Brand Audit", desc: "We study your expertise, story, existing presence, audience and business goals for social." },
  { num: "02", title: "Content Pillar Strategy", desc: "We define 4 6 content pillars: expertise, stories, proof, opinions, behind-the-scenes and community." },
  { num: "03", title: "Profile Optimization", desc: "Bio, highlights, pinned posts and link-in-bio structured for new visitors to convert on first look." },
  { num: "04", title: "Ghostwriting & Design", desc: "We write posts in your voice, design carousels and script reels all approved by you before publishing." },
  { num: "05", title: "Growth & Lead Review", desc: "Monthly report on follower growth, reach, engagement quality and leads into your consulting/community/course." },
];

const faqs = [
  { q: "Do you write in my voice or a generic tone?", a: "We write in your voice we learn it from your interviews, existing content and brand brief. Posts should sound like you, not like an agency." },
  { q: "Which platforms do you focus on for personal brands?", a: "Primarily LinkedIn and Instagram, depending on your industry. If you have a YouTube channel or podcast, we design supporting content for those platforms too." },
  { q: "Do you help with thought leadership content?", a: "Yes opinion posts, industry commentary, framework carousels and trend reactions are all part of thought-leadership content we produce for founders and experts." },
  { q: "How do you generate leads from a personal brand?", a: "Through CTAs in posts directing to newsletters, consultation forms, community links or course pages depending on your revenue model. We design the full funnel, not just the posts." },
];

const galleryItems = [
  { label: "Founder Story Post", tag: "Personal Brand", emoji: "" },
  { label: "Expert Framework Carousel", tag: "Thought Leadership", emoji: "" },
  { label: "Behind-the-Scenes Reel", tag: "Video", emoji: "" },
  { label: "Opinion Post", tag: "Engagement", emoji: "" },
  { label: "Client Win Post", tag: "Proof", emoji: "" },
  { label: "LinkedIn Text Post", tag: "LinkedIn", emoji: "" },
  { label: "Newsletter CTA Story", tag: "Lead Gen", emoji: "" },
  { label: "Community Launch Graphic", tag: "Launch", emoji: "" },
];

export default function PersonalBrandingSocialMediaPage() {
  return (
    <div style={{ background: "#090909", color: "#F5F0E8", minHeight: "100vh", fontFamily: "'EB Garamond', serif" }}>
      <style>{`${FONTS}${GLOBAL_CSS}
        .back-link { display: inline-flex; align-items: center; gap: 8px; font-family: 'Montserrat',sans-serif; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(201,168,76,0.65); text-decoration: none; margin-bottom: 32px; transition: color 0.2s; }
        .back-link:hover { color: #C9A84C; }
      `}</style>


      {/* ── HERO ── */}
      <section style={{ minHeight: "min(90vh, var(--hero-max))", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px clamp(16px,5vw,80px) 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 75% 55% at 70% 40%, rgba(201,168,76,0.09) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: "-100px", top: "50%", transform: "translateY(-50%)", width: 500, height: 500, borderRadius: "50%", border: "1px solid rgba(201,168,76,0.06)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: "-50px", top: "50%", transform: "translateY(-50%)", width: 300, height: 300, borderRadius: "50%", border: "1px solid rgba(201,168,76,0.08)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
          <a href="/services/social-media" className="back-link">← All Industries</a>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
            <span style={{ fontSize: 52 }}>👤</span>
            <SectionLabel>Founders · Experts · Leaders</SectionLabel>
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(40px,6.5vw,84px)", fontWeight: 300, lineHeight: 1.1, color: "#F5F0E8", marginBottom: 28, maxWidth: 860 }}>
            Social Media Marketing for<br /><em style={{ color: "#C9A84C" }}>Personal Brands & Founders</em>
          </h1>
          <p style={{ fontSize: "clamp(17px,2vw,21px)", lineHeight: 1.75, color: "rgba(245,240,232,0.72)", maxWidth: 660, marginBottom: 20, fontFamily: "'EB Garamond',serif" }}>
            We package your expertise into a predictable content engine so your LinkedIn, Instagram and YouTube grow with the same discipline as your business.
          </p>
          <p style={{ fontSize: 14, color: "rgba(201,168,76,0.85)", fontFamily: "'Montserrat',sans-serif", letterSpacing: "0.03em", marginBottom: 44, paddingLeft: 16, borderLeft: "2px solid rgba(201,168,76,0.4)" }}>
            Ghostwritten in your voice. Designed in your aesthetic. Published on your schedule. Your brand, our system.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <GoldButton>Build My Personal Brand</GoldButton>
            <OutlineButton>View Founder Work</OutlineButton>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 1, background: "rgba(201,168,76,0.1)", marginTop: 64, maxWidth: 680 }}>
            {[
              { val: "Your", label: "Voice & Tone" },
              { val: "Multi", label: "Platform Growth" },
              { val: "Lead", label: "Capture Built-in" },
              { val: "Ghost", label: "Written & Designed" },
            ].map((m) => (
              <div key={m.label} style={{ background: "#090909", textAlign: "center", padding: "28px 16px" }}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 36, fontWeight: 600, color: "#C9A84C", lineHeight: 1 }}>{m.val}</div>
                <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(245,240,232,0.4)", marginTop: 8 }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT WE DO ── */}
      <section style={{ padding: "80px clamp(16px,5vw,80px)", borderTop: "1px solid rgba(201,168,76,0.1)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeading label="Our Approach" title={<>Personal Brand Social<br /><em style={{ color: "#C9A84C" }}>Built Around You</em></>} subtitle="Expertise shared consistently is the most powerful marketing a founder can do." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 2, background: "rgba(201,168,76,0.07)" }}>
            {[
              { title: "Content Pillars & Strategy", icon: "", bullets: ["4 6 content pillars: expertise, stories, proof, opinions and behind-the-scenes", "Monthly calendar mapping each post to a business objective (leads, reach, trust)", "Platform-specific formats: long-form LinkedIn, quick Instagram, YouTube scripts"] },
              { title: "Ghostwriting & Design", icon: "", bullets: ["Posts, carousels and captions written in your exact voice and style", "Thought-leadership carousels, opinion threads and industry frameworks designed in-house", "Reel scripts written for you to record or fully produced if camera-ready content is available"] },
              { title: "Profile & Funnel Optimization", icon: "", bullets: ["Bio and headline optimized for your target audience and keywords", "Highlight covers and pinned posts structured for first-time visitors", "Link-in-bio pages connecting to newsletter, consultation form, community or courses"] },
              { title: "Lead Generation & Growth", icon: "", bullets: ["CTA posts driving to newsletters, communities, consulting or course pages", "Collaboration and duet content to expand reach into adjacent audiences", "Follower quality tracking: we care about right-fit followers, not vanity metrics"] },
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

      {/* ── LIVE EMBEDS ── */}
      <section style={{ padding: "80px clamp(16px,5vw,80px)", background: "rgba(201,168,76,0.02)", borderTop: "1px solid rgba(201,168,76,0.08)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeading label="Live Proof" title={<>Founder Profiles<br /><em style={{ color: "#C9A84C" }}>We Manage</em></>} subtitle="Live handles of founders and experts we grow on social." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 2, background: "rgba(201,168,76,0.06)" }}>
            {["Founder A", "Expert B", "Leader C"].map((n) => (
              <EmbedPlaceholder key={n} icon="👤" label={n} sub="Live LinkedIn / Instagram Grid" />
            ))}
          </div>
          <ClientStrip label="Founders & personal brands we've grown:" clients={["Founder A", "Expert B", "Leader C"]} />
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section style={{ padding: "80px clamp(16px,5vw,80px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeading label="Our Process" title={<>How We Build Your<br /><em style={{ color: "#C9A84C" }}>Personal Brand System</em></>} />
          <ProcessSteps steps={processSteps} />
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section style={{ padding: "80px clamp(16px,5vw,80px)", background: "rgba(201,168,76,0.02)", borderTop: "1px solid rgba(201,168,76,0.08)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeading label="Creative Gallery" title={<>Personal Brand Creatives<br /><em style={{ color: "#C9A84C" }}>We've Designed</em></>} subtitle="Carousels, story cards, LinkedIn posts, reel scripts and thought-leadership content made in-house." />
          <GalleryGrid items={galleryItems} />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: "80px clamp(16px,5vw,80px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeading label="Quick Answers" title={<>Personal Brand <em style={{ color: "#C9A84C" }}>FAQ</em></>} />
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      <CTABand
        heading={"Ready to Grow Your\nPersonal Brand With\nSystem-Level Discipline?"}
        sub="Let's build a content engine that positions you as the authority in your space and turns followers into clients."
      />
      <ServiceSection/>
    </div>
  );
}