// ============================================================
// FILE: src/components/ServicesOffered/LIVEPROFILES/LiveProfileEmbedsPage.tsx
// ADD ROUTE: your route for Live Profiles page
// ============================================================

// LiveProfileEmbedsPage.tsx
// Route: /social-media/live-profiles

import { SectionLabel, SectionHeading, GoldButton, OutlineButton, CTABand, EmbedPlaceholder } from "../../ui/Components";
import { FONTS, GLOBAL_CSS } from "../../ui/styles";
import ServiceSection from "@/components/HomePage/ServicesSection";

const profileGroups = [
  {
    category: "NGO",
    icon: "",
    desc: "Non-profits and mission-driven organisations whose social media we manage end-to-end.",
    profiles: [
      { name: "NGO Handle 1", platform: "Instagram + Facebook", note: "Donor-focused storytelling, 80G campaigns" },
      { name: "NGO Handle 2", platform: "Instagram", note: "Ground-level impact reels and monthly drives" },
      { name: "NGO Handle 3", platform: "Facebook + WhatsApp", note: "Emergency appeal campaigns and updates" },
    ],
  },
  {
    category: "Real Estate",
    icon: "",
    desc: "Developers and realtors for whom we run project launches, lead gen and CRM-integrated campaigns.",
    profiles: [
      { name: "CI Builders", platform: "Instagram + Facebook", note: "Project launch campaigns, site reels" },
      { name: "Vikrant Realtors", platform: "Instagram", note: "Property walk-throughs and testimonials" },
      { name: "Mangalam Landmarks", platform: "Facebook + YouTube", note: "Render posts and offer campaigns" },
    ],
  },
  {
    category: "Ecommerce",
    icon: "",
    desc: "D2C brands whose social content we produce and connect to orders via UTM-tracked links.",
    profiles: [
      { name: "Babaji Ki Booti", platform: "Instagram + Facebook", note: "Product reels, offer campaigns, 700+ orders/day" },
      { name: "Khambani Foods", platform: "Instagram", note: "Food photography, recipe reels, festive offers" },
      { name: "Devi Chitra Lekha", platform: "Instagram + Facebook", note: "Spiritual products, launch campaigns" },
    ],
  },
  {
    category: "Healthcare",
    icon: "",
    desc: "Clinics and practitioners for whom we create compliant, trust-first social content.",
    profiles: [
      { name: "Clinic Handle 1", platform: "Instagram + Facebook", note: "Education posts, appointment CTAs" },
      { name: "Hospital Handle 2", platform: "Facebook", note: "Facility highlights, doctor introductions" },
      { name: "Wellness Brand 3", platform: "Instagram", note: "Wellness education, myth-busting reels" },
    ],
  },
  {
    category: "Numerology & Spiritual",
    icon: "",
    desc: "Numerologists, astrologers and spiritual practitioners we build personal brands for.",
    profiles: [
      { name: "Spiritual Brand 1", platform: "Instagram", note: "Daily insights, course launches, session promos" },
      { name: "Numerologist 2", platform: "Instagram + YouTube", note: "Teaching content, transformation case posts" },
      { name: "Astrologer 3", platform: "Instagram", note: "Aesthetic quotes, live session promotions" },
    ],
  },
  {
    category: "Personal Branding",
    icon: "",
    desc: "Founders and experts whose thought-leadership content and lead funnels we manage.",
    profiles: [
      { name: "Founder A", platform: "LinkedIn + Instagram", note: "Thought leadership, community building" },
      { name: "Expert B", platform: "LinkedIn", note: "Framework carousels, opinion posts" },
      { name: "Leader C", platform: "Instagram + LinkedIn", note: "Behind-the-scenes, consulting lead gen" },
    ],
  },
];

export default function LiveProfileEmbedsPage() {
  return (
    <div style={{ background: "#090909", color: "#F5F0E8", minHeight: "100vh", fontFamily: "'EB Garamond', serif" }}>
      <style>{`${FONTS}${GLOBAL_CSS}
        .profile-meta { display: flex; flex-direction: column; gap: 4; }
        .platform-badge { display: inline-block; padding: 3px 10px; border: 1px solid rgba(201,168,76,0.3); font-family: 'Montserrat',sans-serif; font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(201,168,76,0.7); margin-right: 6px; }
        .category-header { display: flex; align-items: center; gap: 16px; margin-bottom: 12px; padding-bottom: 16px; border-bottom: 1px solid rgba(201,168,76,0.12); }
      `}</style>


      {/* ── HERO ── */}
      <section style={{ paddingTop: 140, padding: "140px clamp(16px,5vw,80px) 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(201,168,76,0.08) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <SectionLabel>Live Proof</SectionLabel>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(42px,7vw,88px)", fontWeight: 300, lineHeight: 1.1, color: "#F5F0E8", marginBottom: 24 }}>
            See Our Social Media<br /><em style={{ color: "#C9A84C" }}>Work Live</em>
          </h1>
          <p style={{ fontSize: "clamp(17px,2vw,21px)", lineHeight: 1.75, color: "rgba(245,240,232,0.65)", maxWidth: 620, margin: "0 auto 16px", fontFamily: "'EB Garamond',serif" }}>
            These aren't mockups. These are live profiles we manage or have managed for our clients across NGOs, real estate, ecommerce, healthcare and personal brands.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginTop: 36 }}>
            <GoldButton>Work With Us</GoldButton>
            <OutlineButton>View Plans</OutlineButton>
          </div>
        </div>
      </section>

      {/* ── PROFILE GROUPS ── */}
      {profileGroups.map((group, gi) => (
        <section key={group.category} style={{ padding: "80px clamp(16px,5vw,80px)", background: gi % 2 === 0 ? "#090909" : "rgba(201,168,76,0.02)", borderTop: "1px solid rgba(201,168,76,0.08)" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            {/* Category header */}
            <div className="category-header">
              <span style={{ fontSize: 40 }}>{group.icon}</span>
              <div>
                <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A84C", marginBottom: 4 }}>{group.category}</div>
                <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 300, color: "#F5F0E8" }}>
                  {group.category} Profiles We Manage
                </h2>
              </div>
            </div>
            <p style={{ fontFamily: "'EB Garamond',serif", fontSize: 17, color: "rgba(245,240,232,0.55)", marginBottom: 36, lineHeight: 1.7, maxWidth: 660 }}>
              {group.desc}
            </p>

            {/* Profile grid with embed placeholders + meta */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 2, background: "rgba(201,168,76,0.06)" }}>
              {group.profiles.map((p) => (
                <div key={p.name} style={{ background: "#090909", display: "flex", flexDirection: "column" }}>
                  {/* Embed placeholder */}
                  <EmbedPlaceholder icon={group.icon} label={p.name} sub={`Embed ${p.platform} Grid Here`} />
                  {/* Meta below */}
                  <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(201,168,76,0.1)" }}>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, color: "#F5F0E8", marginBottom: 6 }}>{p.name}</div>
                    <div style={{ marginBottom: 8 }}>
                      {p.platform.split(" + ").map((pl) => (
                        <span key={pl} className="platform-badge">{pl}</span>
                      ))}
                    </div>
                    <div style={{ fontFamily: "'EB Garamond',serif", fontSize: 14, color: "rgba(245,240,232,0.45)", fontStyle: "italic", lineHeight: 1.5 }}>{p.note}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 24 }}>
              <a href={`/services/social-media/${group.category.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
                style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 11, color: "#C9A84C", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>
                View {group.category} Page →
              </a>
            </div>
          </div>
        </section>
      ))}

      {/* ── BOTTOM CTA ── */}
      <CTABand
        heading={"Want Your Profile\nAmong These\nLive Handles?"}
        sub="We manage social profiles across 6 industries. Let's add yours to the list."
      />
      <ServiceSection/>
    </div>
  );
}