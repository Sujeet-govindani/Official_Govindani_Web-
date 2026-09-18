import ServiceSection from "@/components/HomePage/ServicesSection";
import { useState, useEffect, useRef } from "react";

// ─── Google Fonts ────────────────────────────────────────────────────────────
const FontLoader = () => (
  <style>{`

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --gold:       #C9A84C;
      --gold-light: #E8C96A;
      --gold-dim:   #8B6914;
      --cream:      #F5EDD6;
      --white:      #FFFFFF;
      --black:      #000000;
      --black-soft: #0A0A0A;
      --glass-bg:   rgba(255,255,255,0.04);
      --glass-border: rgba(201,168,76,0.22);
      --glass-hover:  rgba(201,168,76,0.10);
    }

body { background: #000; font-family: 'Inter', sans-serif; color: var(--white); overflow-x: hidden; }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: #000; }
    ::-webkit-scrollbar-thumb { background: var(--gold-dim); border-radius: 2px; }

    body::before {
      content: '';
      position: fixed; inset: 0; z-index: 0; pointer-events: none;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
      opacity: 0.35;
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(28px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }
    @keyframes pulse-ring {
      0%   { box-shadow: 0 0 0 0 rgba(201,168,76,0.4); }
      70%  { box-shadow: 0 0 0 14px rgba(201,168,76,0); }
      100% { box-shadow: 0 0 0 0 rgba(201,168,76,0); }
    }
    @keyframes glow-border {
      0%, 100% { border-color: rgba(201,168,76,0.3); }
      50%       { border-color: rgba(201,168,76,0.7); }
    }
  `}</style>
);

// ─── Hooks ───────────────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─── Shared styles ───────────────────────────────────────────────────────────
const S = {
  section: (): React.CSSProperties => ({ position: "relative", zIndex: 1, padding: "30px 24px" }),
  container: (): React.CSSProperties => ({ maxWidth: 1200, margin: "0 auto", width: "100%" }),
  glassCard: (extra?: React.CSSProperties): React.CSSProperties => ({
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(201,168,76,0.22)",
    borderRadius: 20,
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    ...extra,
  }),
  goldGradient: (): React.CSSProperties => ({
    background: "linear-gradient(135deg, #C9A84C 0%, #E8C96A 50%, #C9A84C 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  }),
  titleFont: (size = 42, extra?: React.CSSProperties): React.CSSProperties => ({
    fontFamily: "'Libre Baskerville', serif",
    fontSize: size,
    fontWeight: 700,
    lineHeight: 1.18,
    ...extra,
  }),
  bodyFont: (extra?: React.CSSProperties): React.CSSProperties => ({
    fontFamily: "'Inter', sans-serif",
    fontSize: 15,
    lineHeight: 1.75,
    color: "rgba(255,255,255,0.62)",
    ...extra,
  }),
  badge: (): React.CSSProperties => ({
    display: "inline-block",
    fontFamily: "'Inter', sans-serif",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: 3,
    textTransform: "uppercase" as const,
    color: "var(--gold)",
  }),
};

// ─── Icon Components ─────────────────────────────────────────────────────────
const Icon = ({ d, size = 20, color = "var(--gold)" }: { d: string; size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const GoldIcon = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    width: 52, height: 52, borderRadius: 14,
    background: "linear-gradient(135deg, rgba(201,168,76,0.15), rgba(232,201,106,0.08))",
    border: "1px solid rgba(201,168,76,0.35)",
    display: "flex", alignItems: "center", justifyContent: "center",
    animation: "pulse-ring 3s ease-out infinite",
    flexShrink: 0,
  }}>
    {children}
  </div>
);

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{
      position: "relative", zIndex: 1, minHeight: "min(60vh, var(--hero-max))",
      display: "flex", alignItems: "center",
      // Reduced bottom padding to close gap with About section
      padding: "120px 24px 20px",
      overflow: "hidden",
    }}>
      {/* Radial glow */}
      <div style={{
        position: "absolute", top: "20%", left: "-10%",
        width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "10%", right: "-5%",
        width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      {/* Grid lines */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `
          linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
      }} />

      <div style={{ ...S.container(), display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <div style={{ animation: "fadeUp 0.9s ease both", maxWidth: 680 }}>
          <span style={S.badge()}>✦ LinkedIn Ads</span>
          <h1 style={{ ...S.titleFont(58), color: "var(--cream)", marginBottom: 24, marginTop: 16 }}>
            Harness the Power of{" "}
            <span style={S.goldGradient()}>LinkedIn</span>
            {" "}to Grow Your Business
          </h1>
          <p style={{ ...S.bodyFont(), fontSize: 16, marginBottom: 0 }}>
            Specialized LinkedIn Ads services to help businesses enhance their B2B marketing efforts.
            Our expert strategies ensure that your ads reach the right professionals, driving engagement and conversions.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── About Section ────────────────────────────────────────────────────────────
function About() {
  const { ref, visible } = useInView();
  const features = [
    { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", text: "Advanced Targeting" },
    { icon: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z", text: "Custom Ad Creatives" },
    { icon: "M22 12h-4l-3 9L9 3l-3 9H2", text: "Continuous Optimization" },
    { icon: "M18 20V10M12 20V4M6 20v-6", text: "Detailed Analytics" },
    { icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75", text: "Comprehensive Support" },
  ];

  const components = [
    "Audience Targeting", "Ad Creative Development", "A/B Testing", "Campaign Setup and Management",
    "Performance Tracking", "Budget Optimization", "Conversion Tracking", "Lead Generation Forms",
  ];

  return (
    // Small top padding to sit tight below Hero
    <section style={{ ...S.section(), padding: "20px 24px 30px" }} ref={ref}>
      <div style={S.container()}>
        <div style={{ display: "flex", gap: 38, flexWrap: "wrap" }}>
          {/* Left text */}
          <div style={{
            flex: "1 1 560px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease",
          }}>
            <span style={S.badge()}>✦ About LinkedIn Ads</span>
            <h2 style={{ ...S.titleFont(36), color: "var(--cream)", marginBottom: 20, marginTop: 12 }}>
              Know About <span style={S.goldGradient()}>LinkedIn Ads</span>
            </h2>
            <p style={{ ...S.bodyFont(), marginBottom: 16 }}>
              In the realm of B2B marketing, LinkedIn stands out as a powerful platform for connecting with professionals
              and decision-makers. LinkedIn Ads offer a unique opportunity to target a highly specific audience based on
              their professional profiles, industries, and interests.
            </p>
            <p style={{ ...S.bodyFont(), marginBottom: 24 }}>
              At Govindan Infotech Pvt. Ltd., we provide comprehensive LinkedIn Ads services designed to leverage this
              potential and drive impactful results for your business. Our services include a full suite of offerings,
              from initial campaign setup and targeting to continuous optimization and performance tracking.
            </p>

            <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 22, color: "var(--cream)", marginBottom: 20 }}>
              Key Components of Our LinkedIn Ads Service:
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 32px" }}>
              {components.map(c => (
                <div key={c} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ color: "var(--gold)", fontSize: 14 }}>✓</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.72)" }}>{c}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right feature card no button, no image */}
          <div style={{
            flex: "1 1 280px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease 0.2s",
          }}>
            <div style={{
              ...S.glassCard({
                padding: "32px 28px",
                animation: "glow-border 4s ease-in-out infinite",
              }),
            }}>
              <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 22, color: "var(--cream)", marginBottom: 24 }}>
                Features
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {features.map(f => (
                  <div key={f.text} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <GoldIcon><Icon d={f.icon} size={20} /></GoldIcon>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>{f.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── B2B Section ──────────────────────────────────────────────────────────────
function B2BSection() {
  const { ref, visible } = useInView();
  const cards = [
    {
      icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
      title: "Targeted Outreach",
      desc: "Reach specific professionals and decision-makers with precision targeting.",
    },
    {
      icon: "M22 12h-4l-3 9L9 3l-3 9H2",
      title: "Lead Generation",
      desc: "Generate high-quality leads through precise targeting on LinkedIn.",
    },
    {
      icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
      title: "Brand Awareness",
      desc: "Increase your brand's visibility among industry professionals.",
    },
    {
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
      title: "Website Traffic",
      desc: "Drive targeted traffic to your website with ads encouraging clicks.",
    },
  ];

  return (
    <section style={{
      ...S.section(),
      background: "linear-gradient(180deg, transparent 0%, rgba(201,168,76,0.03) 50%, transparent 100%)",
      textAlign: "center",
    }} ref={ref}>
      <div style={S.container()}>
        <span style={S.badge()}>✦ How LinkedIn Ads Can Help You?</span>
        <h2 style={{ ...S.titleFont(40), color: "var(--cream)", marginBottom: 16, marginTop: 12 }}>
          Boost Your <span style={S.goldGradient()}>B2B Marketing</span> Efforts
        </h2>
        <p style={{ ...S.bodyFont({ fontSize: 16, textAlign: "center", maxWidth: 560, margin: "0 auto 40px" }) }}>
          Leverage the power of LinkedIn's professional network to drive meaningful business outcomes.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
          {cards.map((c, i) => (
            <div key={c.title} style={{
              ...S.glassCard({ padding: "36px 28px", textAlign: "center", cursor: "pointer" }),
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(40px)",
              transition: `opacity 0.7s ease ${i * 0.12}s, transform 0.7s ease ${i * 0.12}s, background 0.3s, box-shadow 0.3s`,
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.background = "rgba(201,168,76,0.08)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 20px 60px rgba(201,168,76,0.15)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.04)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              }}
            >
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
                <div style={{
                  width: 64, height: 64, borderRadius: "50%",
                  background: "linear-gradient(135deg, rgba(201,168,76,0.2), rgba(201,168,76,0.06))",
                  border: "1px solid rgba(201,168,76,0.35)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  animation: "pulse-ring 3s ease-out infinite",
                  animationDelay: `${i * 0.5}s`,
                }}>
                  <Icon d={c.icon} size={26} />
                </div>
              </div>
              <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 20, color: "var(--cream)", marginBottom: 12 }}>{c.title}</h3>
              <p style={S.bodyFont({ fontSize: 14, textAlign: "center" })}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Included Services Section ────────────────────────────────────────────────
function IncludedSection() {
  const { ref, visible } = useInView();

  // Image containers removed cards show title, subtitle, and bullet points only
  const services = [
    {
      title: "Sponsored Content",
      subtitle: "Promote your content directly in LinkedIn's feed.",
      points: ["Create engaging sponsored posts", "Target specific audiences for better reach"],
    },
    {
      title: "Sponsored InMail",
      subtitle: "Send personalized messages to LinkedIn members.",
      points: ["Craft tailored InMail campaigns", "Ensure high open and response rates"],
    },
  ];

  return (
    <section style={{ ...S.section(), overflow: "hidden" }} ref={ref}>
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(20,14,0,0.9) 100%)",
        zIndex: 0,
      }} />

      <div style={{ ...S.container(), position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{
            ...S.titleFont(38), color: "var(--cream)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease",
          }}>
            What Is Included In Our{" "}
            <span style={S.goldGradient()}>LinkedIn Ads Services?</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
          {services.map((s, i) => (
            <div key={s.title} style={{
              ...S.glassCard({ padding: "32px 28px" }),
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(30px)",
              transition: `all 0.8s ease ${i * 0.2}s`,
            }}>
              <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 22, color: "var(--cream)", marginBottom: 8 }}>{s.title}</h3>
              <p style={{ ...S.bodyFont({ fontSize: 13, marginBottom: 16 }) }}>{s.subtitle}</p>
              {s.points.map(p => (
                <div key={p} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
                  <span style={{ color: "var(--gold)", fontSize: 14, marginTop: 2 }}>◆</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.65)" }}>{p}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Why Choose Us Section ────────────────────────────────────────────────────
function WhyUs() {
  const { ref, visible } = useInView();

  const reasons = [
    {
      icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
      title: "Experienced Team",
      subtitle: "Our team consists of seasoned LinkedIn Ads experts.",
      points: ["Extensive experience in managing LinkedIn Ads campaigns", "Proven track record of successful B2B advertising"],
    },
    {
      icon: "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18",
      title: "Customized Approach",
      subtitle: "We offer tailored LinkedIn Ads strategies.",
      points: ["Flexible and adaptive approach to suit your business needs", "Personalized solutions based on detailed analysis"],
    },
  ];

  return (
    <section style={{ ...S.section(), textAlign: "center" }} ref={ref}>
      <div style={S.container()}>
        <span style={S.badge()}>✦ Why Choose Our LinkedIn Ads Services?</span>
        <h2 style={{
          ...S.titleFont(38), color: "var(--cream)", maxWidth: 600, margin: "12px auto 40px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s ease",
        }}>
          Expertise and Precision for{" "}
          <span style={S.goldGradient()}>Maximized Campaign Performance</span>
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32 }}>
          {reasons.map((r, i) => (
            <div key={r.title} style={{
              ...S.glassCard({ padding: "40px 32px", textAlign: "left" }),
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(40px)",
              transition: `all 0.8s ease ${i * 0.2}s`,
            }}>
              <GoldIcon><Icon d={r.icon} size={24} /></GoldIcon>
              <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 22, color: "var(--cream)", margin: "20px 0 10px" }}>{r.title}</h3>
              <p style={{ ...S.bodyFont({ fontSize: 13, marginBottom: 20 }) }}>{r.subtitle}</p>
              <div style={{ width: "100%", height: 1, background: "rgba(201,168,76,0.15)", marginBottom: 20 }} />
              {r.points.map(p => (
                <div key={p} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
                  <span style={{ color: "var(--gold)", fontSize: 16, marginTop: 1 }}>◆</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.65)" }}>{p}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Factors Section ─────────────────────────────────────────────────────────
function Factors() {
  const { ref, visible } = useInView();

  const cols = [
    {
      icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
      title: "Experience and Expertise",
      desc: "Look for a company with a proven track record in LinkedIn Ads.",
      points: ["Industry-specific expertise", "Case studies and client testimonials", "Track record of success"],
    },
    {
      icon: "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18",
      title: "Technical Proficiency",
      desc: "Ensure the company uses the latest tools and techniques for LinkedIn Ads.",
      points: ["Proficiency in LinkedIn's advertising", "Regular progress reports", "Responsive customer support team"],
    },
    {
      icon: "M4 4h16v16H4zM9 9h6M9 13h6M9 17h4",
      title: "Customization and Flexibility",
      desc: "Choose a company that offers customized solutions.",
      points: ["Personalized campaign strategies", "Flexible service options", "Evaluate their flexibility with feedback"],
    },
  ];

  return (
    <section style={{
      ...S.section(),
      background: "linear-gradient(180deg, transparent, rgba(201,168,76,0.03) 50%, transparent)",
    }} ref={ref}>
      <div style={S.container()}>
        <div style={{ display: "flex", gap: 64, flexWrap: "wrap", alignItems: "flex-start" }}>
          {/* Left: title text only no image container */}
          <div style={{
            flex: "1 1 340px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(-40px)",
            transition: "all 0.9s ease",
            display: "flex", alignItems: "center",
          }}>
            
          </div>

          {/* Right: 3 cards */}
          <div style={{
            flex: "1 1 480px", display: "flex", flexDirection: "column", gap: 20,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(40px)",
            transition: "all 0.9s ease 0.2s",
          }}>
            {cols.map(c => (
              <div key={c.title} style={{
                ...S.glassCard({ padding: "24px 28px", display: "flex", gap: 20, alignItems: "flex-start" }),
                transition: "all 0.3s",
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(201,168,76,0.07)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(201,168,76,0.4)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.04)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(201,168,76,0.22)";
                }}
              >
                <GoldIcon><Icon d={c.icon} size={20} /></GoldIcon>
                <div>
                  <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 18, color: "var(--cream)", marginBottom: 6 }}>{c.title}</h3>
                  <p style={{ ...S.bodyFont({ fontSize: 13, marginBottom: 12 }) }}>{c.desc}</p>
                  {c.points.map(p => (
                    <div key={p} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 6 }}>
                      <span style={{ color: "var(--gold)", fontSize: 12, marginTop: 3 }}>◆</span>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const cols = [
    { title: "Services", links: ["Lead Generation", "Email Marketing", "Public Relations", "Link Building", "Videography"] },
    { title: "Design", links: ["Graphic Designing", "Virtual Tour", "PPT", "Performance Marketing"] },
    { title: "Support", links: ["Contact Us", "Consultancy", "Careers"] },
    { title: "Company", links: ["About Us", "Member Directory", "Awards", "Pricing", "Our Clients"] },
  ];

  return (
    <footer style={{
      position: "relative", zIndex: 1,
      borderTop: "1px solid rgba(201,168,76,0.15)",
      padding: "56px 24px 32px",
      background: "linear-gradient(180deg, transparent, rgba(201,168,76,0.03))",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: "linear-gradient(135deg, #C9A84C, #E8C96A)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontFamily: "'Libre Baskerville', serif", fontWeight: 700, color: "#000", fontSize: 20 }}>G</span>
              </div>
              <span style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 16, fontWeight: 700, color: "var(--cream)" }}>
                Govindan Infotech
              </span>
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, lineHeight: 1.75, color: "rgba(255,255,255,0.62)", maxWidth: 260 }}>
              Transforming Ideas Into Digital Excellence. Elevate your online presence with our innovative solutions
              and strategic digital services.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
              {["f", "in", "t", "yt"].map(s => (
                <div key={s} style={{
                  width: 36, height: 36, borderRadius: "50%",
                  border: "1px solid rgba(201,168,76,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", transition: "all 0.3s",
                  fontFamily: "'Inter', sans-serif", fontSize: 12, color: "var(--gold)",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = "rgba(201,168,76,0.15)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
                >{s}</div>
              ))}
            </div>
          </div>

          {cols.map(col => (
            <div key={col.title}>
              <h4 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 16, color: "var(--cream)", marginBottom: 20 }}>{col.title}</h4>
              {col.links.map(link => (
                <a key={link} href="#" style={{
                  display: "block", fontFamily: "'Inter', sans-serif", fontSize: 13,
                  color: "rgba(255,255,255,0.5)", textDecoration: "none", marginBottom: 10, transition: "color 0.2s",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--gold)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.5)"; }}
                >{link}</a>
              ))}
            </div>
          ))}
        </div>

        <div style={{
          borderTop: "1px solid rgba(201,168,76,0.12)",
          paddingTop: 24,
          display: "flex", justifyContent: "center", alignItems: "center",
          flexWrap: "wrap", gap: 8,
        }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
            Copyright © 2025 Govindan Infotech Pvt. Ltd. All rights reserved.
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          footer > div > div:first-child { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          footer > div > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function LinkedInAdsPage() {
  return (
    <>
      <FontLoader />
      <div style={{ background: "#000", minHeight: "min(100vh, var(--hero-max))", position: "relative" }}>
        <Hero />
        <About />
        <B2BSection />
        <IncludedSection />
        <WhyUs />
        <Factors />
        <ServiceSection />
      </div>

      <style>{`
        @media (max-width: 768px) {
          section { padding: 24px 20px !important; }
          h1 { font-size: 36px !important; }
          h2 { font-size: 28px !important; }
        }
        @media (max-width: 480px) {
          h1 { font-size: 28px !important; }
          h2 { font-size: 22px !important; }
          section { padding: 20px 16px !important; }
        }
      `}</style>
    </>
  );
}