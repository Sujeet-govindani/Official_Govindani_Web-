import ContactUsForm from "@/pages/ContactUsForm";
import { useEffect, useRef, useState } from "react";
import SEO from "@/components/SEO";
import { pageSEO } from "@/seo/pageSEO";

// ─── Scroll Reveal Hook ───────────────────────────────────────────────────────
function useScrollReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─── Reveal Wrapper ───────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, direction = "up", className = "" }) {
  const { ref, visible } = useScrollReveal();
  const transforms = { up: "translateY(44px)", left: "translateX(-44px)", right: "translateX(44px)", fade: "none" };
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : transforms[direction], transition: `opacity 0.82s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.82s cubic-bezier(0.16,1,0.3,1) ${delay}ms`, willChange: "opacity, transform" }}>
      {children}
    </div>
  );
}

// ─── Hover Card ───────────────────────────────────────────────────────────────
function HoverCard({ children, className = "", style = {} }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`relative rounded-2xl overflow-hidden transition-all duration-500 ${className}`}
      style={{ border: hovered ? "1px solid rgba(245,216,122,0.6)" : "1px solid rgba(200,146,42,0.2)", boxShadow: hovered ? "0 0 36px rgba(245,216,122,0.14), 0 10px 38px rgba(0,0,0,0.6)" : "0 4px 22px rgba(0,0,0,0.45)", background: hovered ? "linear-gradient(145deg,rgba(245,216,122,0.07) 0%,rgba(12,9,2,0.97) 100%)" : "linear-gradient(145deg,rgba(255,255,255,0.03) 0%,rgba(8,6,1,0.97) 100%)", transform: hovered ? "translateY(-4px) scale(1.008)" : "none", ...style }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    >
      {hovered && <div className="pointer-events-none absolute inset-0 rounded-2xl" style={{ background: "radial-gradient(ellipse at 50% 0%,rgba(245,216,122,0.09) 0%,transparent 68%)" }} />}
      {children}
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────
function Section({ children, className = "" }) {
  return <section className={`px-4 sm:px-8 lg:px-16 xl:px-24 ${className}`} style={{ paddingTop: "clamp(80px, 8vw, 110px)", paddingBottom: "clamp(24px, 4vw, 40px)" }}>{children}</section>;
}

// ─── Gold Button ─────────────────────────────────────────────────────────────
function GoldButton({ children, className = "", small = false }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button className={`relative overflow-hidden rounded-full font-semibold tracking-wide transition-all duration-300 ${className}`}
      style={{ background: hovered ? "linear-gradient(135deg,#f5d87a 0%,#c8922a 50%,#e8b84b 100%)" : "linear-gradient(135deg,#c8922a 0%,#f5d87a 50%,#e8b84b 100%)", color: "#0a0800", boxShadow: hovered ? "0 0 26px rgba(245,216,122,0.5)" : "0 0 14px rgba(200,146,42,0.3)", transform: hovered ? "scale(1.05)" : "scale(1)", padding: small ? "8px 20px" : "10px 28px", fontSize: small ? "13px" : "14px", fontFamily: "'Inter',sans-serif" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {hovered && <span className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.32) 50%,transparent 60%)", animation: "shimmer 0.65s ease forwards" }} />}
      {children}
    </button>
  );
}

// ─── Outline Button ───────────────────────────────────────────────────────────
function OutlineButton({ children, className = "", small = false }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button className={`relative rounded-full font-semibold tracking-wide transition-all duration-300 ${className}`}
      style={{ border: `1px solid ${hovered ? "#f5d87a" : "rgba(200,146,42,0.45)"}`, color: hovered ? "#f5d87a" : "rgba(245,216,122,0.7)", background: hovered ? "rgba(245,216,122,0.07)" : "transparent", boxShadow: hovered ? "0 0 16px rgba(245,216,122,0.14)" : "none", transform: hovered ? "scale(1.03)" : "scale(1)", padding: small ? "8px 20px" : "10px 28px", fontSize: small ? "13px" : "14px", fontFamily: "'Inter',sans-serif" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {children}
    </button>
  );
}

// ─── Media Box ────────────────────────────────────────────────────────────────
function MediaBox({ src, type = "auto", alt = "Media", aspect = "aspect-[16/10]", className = "" }) {
  const detectedType = type !== "auto" ? type : (src && /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(src) ? "video" : "image");

  if (src) {
    if (detectedType === "video") return (
      <video src={src} controls playsInline
        className={`w-full rounded-2xl ${className}`}
        style={{ display: "block" }} />
    );
    return (
      <img
        src={src}
        alt={alt}
        className={`w-full rounded-2xl ${className}`}
        style={{ display: "block", objectFit: "contain", height: "auto" }}
      />
    );
  }

  return (
    <div className={`${aspect} rounded-2xl flex items-center justify-center ${className}`}
      style={{ background: "linear-gradient(135deg,rgba(200,146,42,0.1) 0%,rgba(245,216,122,0.05) 50%,rgba(200,146,42,0.07) 100%)", border: "1px dashed rgba(200,146,42,0.35)" }}>
      <div className="flex flex-col items-center gap-2 opacity-60">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(245,216,122,0.8)" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21,15 16,10 5,21" />
        </svg>
        <span style={{ color: "rgba(245,216,122,0.6)", fontSize: "10px", fontFamily: "'Inter',sans-serif", textAlign: "center", padding: "0 8px" }}>
          {alt}<br /><span style={{ fontSize: "9px", opacity: 0.7 }}>Set src prop with image/video URL</span>
        </span>
      </div>
    </div>
  );
}

// ─── Hero Video — autoplay, muted, loop, borderless ──────────────────────────
function HeroVideo({ src }) {
  const videoRef = useRef(null);
  useEffect(() => { if (videoRef.current) videoRef.current.play().catch(() => {}); }, [src]);

  const isVideo = src && /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(src);
  const isImage = src && !isVideo;

  if (isVideo) return (
    <video ref={videoRef} src={src} autoPlay muted loop playsInline
      style={{ width: "100%", display: "block", borderRadius: "16px", objectFit: "cover" }} />
  );
  if (isImage) return (
    <img src={src} alt="WhatsApp CRM Dashboard"
      style={{ width: "100%", display: "block", borderRadius: "16px", objectFit: "cover" }} />
  );
  return <MediaBox src={undefined} alt="WhatsApp CRM Dashboard" aspect="aspect-[4/3]" className="w-full" />;
}

// ─── Integration Logo Strip (Hero) ───────────────────────────────────────────
const integrationLogos = [
  { name: "logo-1", logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wcrm12.webp" },
];

function IntegrationLogoStrip() {
  return (
    <div className="flex flex-col gap-3 justify-center lg:justify-start mt-4">
      <span style={{ color: "rgba(255,248,231,0.45)", fontFamily: "'Inter',sans-serif", fontSize: "13px", fontWeight: 500 }}>
        Integrates with &nbsp;<span style={{ color: "rgba(255,248,231,0.28)", fontSize: "12px" }}>+60 more</span>
      </span>
      <div className="flex items-center gap-6 flex-wrap justify-center lg:justify-start">
        {integrationLogos.map((intg) =>
          intg.logo ? (
            <img key={intg.name} src={intg.logo} alt={intg.name}
              style={{ height: "56px", width: "auto", maxWidth: "400px", objectFit: "contain", display: "block", flexShrink: 0, opacity: 1 }} />
          ) : null
        )}
      </div>
    </div>
  );
}

// ─── Stat Pill ────────────────────────────────────────────────────────────────
function StatPill({ value, label, icon }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="flex flex-col items-center gap-1 px-5 py-4 rounded-2xl"
      style={{ border: hovered ? "1px solid rgba(245,216,122,0.4)" : "1px solid rgba(200,146,42,0.2)", background: hovered ? "rgba(245,216,122,0.06)" : "rgba(200,146,42,0.05)", transform: hovered ? "translateY(-3px)" : "none", boxShadow: hovered ? "0 0 18px rgba(245,216,122,0.1)" : "none", transition: "all 0.35s ease" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <span className="text-xl">{icon}</span>
      <span style={{ fontFamily: "'Baskerville','Libre Baskerville',Georgia,serif", fontSize: "22px", fontWeight: 700, background: "linear-gradient(135deg,#f5d87a,#c8922a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{value}</span>
      <span style={{ color: "rgba(255,248,231,0.48)", fontFamily: "'Inter',sans-serif", fontSize: "12px", textAlign: "center", lineHeight: 1.4 }}>{label}</span>
    </div>
  );
}

// ─── Feature Card ─────────────────────────────────────────────────────────────
function FeatureCard({ icon, title, desc, delay, image }) {
  const isPathString = typeof image === "string" && (image.startsWith(".") || image.startsWith("/") || image.startsWith("http"));
  const mediaSrc = isPathString ? image : typeof image === "object" ? image?.src : undefined;
  const mediaType = typeof image === "object" ? image?.type : "auto";
  const mediaAlt = isPathString ? title : typeof image === "string" ? image : (image?.alt || title);
  return (
    <Reveal delay={delay} direction="up">
      <HoverCard className="pt-3 px-3 flex flex-col gap-1.5 h-full">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0"
            style={{ background: "linear-gradient(135deg,rgba(200,146,42,0.22),rgba(245,216,122,0.08))", border: "1px solid rgba(200,146,42,0.28)" }}>{icon}</div>
          <h3 style={{ fontFamily: "'Baskerville','Libre Baskerville',Georgia,serif", fontSize: "15px", background: "linear-gradient(135deg,#f5d87a 0%,#fff8e7 55%,#c8922a 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1.25, margin: 0 }}>{title}</h3>
        </div>
        <p style={{ color: "rgba(255,248,231,0.55)", fontFamily: "'Inter',sans-serif", fontSize: "12px", lineHeight: 1.55, margin: 0 }}>{desc}</p>
        <MediaBox src={mediaSrc} type={mediaType} alt={mediaAlt} className="mt-1" />
      </HoverCard>
    </Reveal>
  );
}

// ─── Impact Card ─────────────────────────────────────────────────────────────
function ImpactCard({ icon, title, desc, delay }) {
  return (
    <Reveal delay={delay} direction="up">
      <div className="flex flex-col items-center text-center gap-3 px-4 py-6">
        <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
          style={{ background: "linear-gradient(135deg,rgba(200,146,42,0.2),rgba(245,216,122,0.07))", border: "1px solid rgba(200,146,42,0.25)" }}>{icon}</div>
        <h4 style={{ fontFamily: "'Baskerville','Libre Baskerville',Georgia,serif", fontSize: "18px", background: "linear-gradient(135deg,#f5d87a,#fff8e7 55%,#c8922a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", margin: 0 }}>{title}</h4>
        <p style={{ color: "rgba(255,248,231,0.52)", fontFamily: "'Inter',sans-serif", fontSize: "13px", lineHeight: 1.7, margin: 0 }}>{desc}</p>
      </div>
    </Reveal>
  );
}

// ─── FAQ Item ─────────────────────────────────────────────────────────────────
function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="cursor-pointer transition-all duration-300" style={{ borderBottom: "1px solid rgba(200,146,42,0.16)" }} onClick={() => setOpen(!open)}>
      <div className="flex justify-between items-center py-4 px-1 gap-4">
        <span style={{ fontFamily: "'Baskerville','Libre Baskerville',Georgia,serif", fontSize: "18px", background: "linear-gradient(135deg,#f5d87a 0%,#fff8e7 50%,#c8922a 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1.4 }}>{question}</span>
        <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
          style={{ background: open ? "linear-gradient(135deg,#c8922a,#f5d87a)" : "rgba(200,146,42,0.14)", color: open ? "#0a0800" : "#f5d87a", transform: open ? "rotate(45deg)" : "none", fontSize: "20px", fontWeight: 300, lineHeight: 1 }}>+</span>
      </div>
      <div style={{ maxHeight: open ? "300px" : "0", overflow: "hidden", transition: "max-height 0.45s cubic-bezier(0.16,1,0.3,1)" }}>
        <p style={{ padding: "0 4px 16px", fontSize: "14px", lineHeight: 1.75, color: "rgba(245,216,122,0.56)", fontFamily: "'Inter',sans-serif", margin: 0 }}>{answer}</p>
      </div>
    </div>
  );
}

// ─── Testimonial Card ─────────────────────────────────────────────────────────
function TestimonialCard({ quote, name, title, company, rating }) {
  return (
    <HoverCard className="p-8 flex flex-col gap-5">
      <div className="flex gap-1">{Array.from({ length: rating }).map((_, i) => <span key={i} style={{ color: "#f5d87a", fontSize: "16px" }}>★</span>)}</div>
      <div className="text-4xl select-none" style={{ fontFamily: "Georgia,serif", background: "linear-gradient(135deg,#c8922a,#f5d87a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1 }}>"</div>
      <p className="italic text-sm leading-relaxed" style={{ color: "rgba(255,248,231,0.7)", fontFamily: "'Inter',sans-serif" }}>{quote}</p>
      <div className="flex items-center gap-3 mt-auto">
        <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
          style={{ background: "linear-gradient(135deg,#c8922a,#f5d87a)", color: "#0a0800", fontFamily: "'Baskerville',Georgia,serif" }}>{name.charAt(0)}</div>
        <div>
          <div style={{ fontFamily: "'Baskerville','Libre Baskerville',Georgia,serif", fontSize: "15px", background: "linear-gradient(135deg,#f5d87a,#c8922a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{name}</div>
          <div style={{ color: "rgba(255,248,231,0.42)", fontFamily: "'Inter',sans-serif", fontSize: "12px" }}>{title}, {company}</div>
        </div>
      </div>
    </HoverCard>
  );
}

// ─── Integration Logo Grid (Section 7) ───────────────────────────────────────
function IntegrationLogo({ name, icon }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="flex flex-col items-center gap-2 py-3 transition-all duration-300 cursor-default"
      style={{ transform: hovered ? "translateY(-3px)" : "none" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <span style={{ fontSize: "28px", filter: hovered ? "drop-shadow(0 0 8px rgba(245,216,122,0.5))" : "none", transition: "filter 0.3s ease" }}>{icon}</span>
      <span style={{ color: hovered ? "#f5d87a" : "rgba(245,216,122,0.55)", fontFamily: "'Inter',sans-serif", fontSize: "11px", transition: "color 0.3s ease" }}>{name}</span>
    </div>
  );
}

// ─── How It Works Video ───────────────────────────────────────────────────────
function VideoSection({ src }) {
  const isVideo = src && /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(src);
  const isImage = src && !isVideo;
  if (isVideo) return (
    <Reveal direction="up" delay={0}>
      <div className="relative w-full rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(200,146,42,0.25)", boxShadow: "0 20px 60px rgba(0,0,0,0.6)" }}>
        <video src={src} controls playsInline style={{ width: "100%", display: "block" }} />
      </div>
    </Reveal>
  );
  if (isImage) return (
    <Reveal direction="up" delay={0}>
      <div className="relative w-full rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(200,146,42,0.25)", boxShadow: "0 20px 60px rgba(0,0,0,0.6)" }}>
        <img src={src} alt="How it works" style={{ width: "100%", display: "block", objectFit: "cover" }}  loading="lazy" decoding="async" />
      </div>
    </Reveal>
  );
  return (
    <Reveal direction="up" delay={0}>
      <div className="relative w-full rounded-2xl overflow-hidden cursor-pointer group"
        style={{ border: "1px solid rgba(200,146,42,0.25)", boxShadow: "0 20px 60px rgba(0,0,0,0.6)" }}>
        <MediaBox src={undefined} alt="How it works - Video" aspect="aspect-video" className="w-full" />
        <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(7,5,0,0.45)", backdropFilter: "blur(2px)" }}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            style={{ background: "linear-gradient(135deg,#c8922a,#f5d87a)", boxShadow: "0 0 30px rgba(245,216,122,0.4)" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#0a0800" style={{ marginLeft: "3px" }}><polygon points="5,3 19,12 5,21" /></svg>
          </div>
          <span style={{ position: "absolute", bottom: "20px", left: "50%", transform: "translateX(-50%)", color: "rgba(255,248,231,0.5)", fontFamily: "'Inter',sans-serif", fontSize: "12px" }}>Set HOW_IT_WORKS_VIDEO_SRC to a video URL</span>
        </div>
      </div>
    </Reveal>
  );
}

// ─── Pricing Section ─────────────────────────────────────────────────────────
function PricingSection() {
  const [activeTab, setActiveTab] = useState("growth");
  const plans = {
    starter: { price: "₹0", period: "/month", badge: "Setup under 30 min", features: [{ text: "Sales Pipeline Tracking", included: true }, { text: "Catalogue & Catalogue (3)", included: true }, { text: "Quality Outreach (1)", included: true }, { text: "5 Chat Operators", included: true }, { text: "Basic Analytics", included: true }, { text: "Advanced Automation", included: false }, { text: "AI-powered Insights", included: false }] },
    growth:  { price: "₹499", period: "/month", badge: "Most Popular", features: [{ text: "Everything in Free", included: true }, { text: "Unlimited Pipelines", included: true }, { text: "AI-powered Lead Scoring", included: true }, { text: "Advanced Automation", included: true }, { text: "Priority Support", included: true }, { text: "Custom Integrations", included: true }, { text: "White-label Option", included: false }] },
    enterprise: { price: "Custom", period: "", badge: "For large teams", features: [{ text: "Everything in Pro", included: true }, { text: "Dedicated Account Manager", included: true }, { text: "Custom SLA", included: true }, { text: "White-label Option", included: true }, { text: "On-premise Deployment", included: true }, { text: "Custom AI Training", included: true }, { text: "99.99% Uptime SLA", included: true }] },
  };
  const plan = plans[activeTab];
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-center gap-2 mb-8 flex-wrap">
        {["starter", "growth", "enterprise"].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
            style={{ fontFamily: "'Inter',sans-serif", background: activeTab === tab ? "linear-gradient(135deg,#c8922a,#f5d87a)" : "rgba(200,146,42,0.08)", color: activeTab === tab ? "#0a0800" : "rgba(245,216,122,0.65)", border: activeTab === tab ? "none" : "1px solid rgba(200,146,42,0.22)", fontWeight: activeTab === tab ? 700 : 400, boxShadow: activeTab === tab ? "0 0 16px rgba(245,216,122,0.22)" : "none" }}>
            {tab === "starter" ? "Sales CRM Free" : tab === "growth" ? "Sales CRM Pro" : "Enterprise"}
          </button>
        ))}
      </div>
      <Reveal direction="up" delay={0}>
        <HoverCard className="p-8 md:p-10">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-shrink-0 flex flex-col gap-3">
              {plan.badge && <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold" style={{ background: "linear-gradient(135deg,#c8922a,#f5d87a)", color: "#0a0800", fontFamily: "'Inter',sans-serif" }}>{plan.badge}</span>}
              <div>
                <span style={{ fontFamily: "'Baskerville','Libre Baskerville',Georgia,serif", fontSize: "clamp(32px,5vw,52px)", fontWeight: 700, background: "linear-gradient(135deg,#f5d87a,#c8922a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{plan.price}</span>
                {plan.period && <span style={{ color: "rgba(255,248,231,0.4)", fontFamily: "'Inter',sans-serif", fontSize: "14px" }}>{plan.period}</span>}
              </div>
              <p style={{ color: "rgba(255,248,231,0.45)", fontFamily: "'Inter',sans-serif", fontSize: "13px", maxWidth: "200px" }}>Billed annually. Affordable & flexible plans for teams.</p>
              <div className="flex flex-col gap-2 mt-2">
                <GoldButton>Start Free Trial</GoldButton>
                <OutlineButton small>Talk to Sales</OutlineButton>
              </div>
            </div>
            <div className="hidden md:block w-px self-stretch" style={{ background: "linear-gradient(180deg,transparent,rgba(200,146,42,0.3) 30%,rgba(245,216,122,0.4) 50%,rgba(200,146,42,0.3) 70%,transparent)" }} />
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {plan.features.map((f) => (
                <div key={f.text} className="flex items-center gap-2.5">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs"
                    style={{ background: f.included ? "linear-gradient(135deg,#c8922a,#f5d87a)" : "rgba(255,255,255,0.06)", color: f.included ? "#0a0800" : "rgba(255,248,231,0.2)" }}>{f.included ? "✓" : "×"}</span>
                  <span style={{ color: f.included ? "rgba(255,248,231,0.75)" : "rgba(255,248,231,0.25)", fontFamily: "'Inter',sans-serif", fontSize: "13px" }}>{f.text}</span>
                </div>
              ))}
            </div>
          </div>
        </HoverCard>
      </Reveal>
    </div>
  );
}

// ─── Global Styles ────────────────────────────────────────────────────────────
const globalStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap');
  @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }
  @keyframes floatUp { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
  @keyframes pulseGlow { 0%,100% { opacity:0.6; } 50% { opacity:1; } }
  @keyframes gradientMove { 0% { background-position:0% 50%; } 50% { background-position:100% 50%; } 100% { background-position:0% 50%; } }
  * { box-sizing:border-box; margin:0; padding:0; }
  ::selection { background:rgba(200,146,42,0.3); color:#fff8e7; }
  ::-webkit-scrollbar { width:5px; }
  ::-webkit-scrollbar-track { background:#060400; }
  ::-webkit-scrollbar-thumb { background:linear-gradient(180deg,#c8922a,#f5d87a); border-radius:99px; }

  /* ─────────────────────────────────────────────────────────────────────
     MOBILE-ONLY HERO REORDER  (max-width: 1023px)
     Final order: badge(1) → title(2) → video(3) → desc(4) → buttons(5) → logos(6)
     Desktop (≥1024px): Tailwind lg: classes remain in full control — UNTOUCHED.
  ───────────────────────────────────────────────────────────────────── */
  @media (max-width: 1023px) {
    .hero-section { padding-top: 0 !important; }
    .hero-inner {
      display: flex !important;
      flex-direction: column !important;
      gap: 18px !important;
      padding-top: 88px;
    }
    .hero-left { display: contents !important; }
    .hero-badge   { order: 1; text-align: center; }
    .hero-title   { order: 2; text-align: center; }
    .hero-video   { order: 3; width: 100% !important; flex: none !important; }
    .hero-desc    { order: 4; text-align: center; }
    .hero-buttons { order: 5; display: flex; justify-content: center; }
    .hero-logos   { order: 6; align-items: center !important; }
  }
`;

// ─── DATA ─────────────────────────────────────────────────────────────────────
const crmFeatures = [
  { icon: "🎯", title: "Effortless Lead Generation",                  desc: "Automatically capture leads from WhatsApp, web, and social. Qualify them instantly with AI-powered scoring and push them into the right pipeline stage without manual entry.",          image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wcc1.webp"  },
  { icon: "📢", title: "Smarter Lead Qualification",                  desc: "Stop chasing cold leads. AI analyses every conversation and behaviour signal to surface your hottest prospects so your team focuses energy where it converts.",                       image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wcc34.webp"  },
  { icon: "👥", title: "Unified Customer View",                       desc: "Every customer interaction, deal note, message, and activity in a single timeline. Zero context-switching your reps always know exactly where each deal stands.",                    image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wcc2.webp"  },
  { icon: "📡", title: "Broadcast Personalised Messages at Scale",    desc: "Send hyper-personalised WhatsApp campaigns to thousands of contacts in minutes. Dynamic variables, rich media, and smart scheduling for maximum open rates.",                      image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wcc33.webp"  },
  { icon: "🚀", title: "Faster Conversions & Closures",               desc: "Shorten your sales cycle with automated follow-ups, instant quote sharing, and one-tap payment links all inside WhatsApp where your customers already are.",                       image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wcc3.webp"  },
  { icon: "📊", title: "Seamless Sales Pipeline Management",          desc: "Move deals faster with a visual sales pipeline, role-based access, and task management ensuring no lead is left behind.",                                                            image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wcc4.webp"  },
];

const impactItems = [
  { icon: "⚡", title: "Boost Productivity",  desc: "Automate repetitive tasks so your sales team closes more deals in less time." },
  { icon: "📈", title: "Drive Conversions",   desc: "AI-powered insights tell you the right time and message to convert each prospect." },
  { icon: "🌍", title: "Sell Anywhere",       desc: "Mobile-first CRM lets your team manage pipelines and reply to leads from any device." },
  { icon: "🧠", title: "Smarter Decisions",   desc: "Real-time analytics and dashboards give leadership instant visibility into revenue health." },
];

const integrations = [
  { name: "Shopify",       icon: "🏪" }, { name: "WooCommerce",   icon: "🛍️" }, { name: "Salesforce",    icon: "☁️" },
  { name: "HubSpot",       icon: "🔶" }, { name: "Zapier",        icon: "⚡" }, { name: "Google Sheets", icon: "📊" },
  { name: "Razorpay",      icon: "💳" }, { name: "Stripe",        icon: "💰" }, { name: "Zoho CRM",      icon: "🔵" },
  { name: "Slack",         icon: "💬" }, { name: "Gmail",         icon: "📧" }, { name: "Webhooks",      icon: "🔗" },
];

const faqData = [
  { question: "What is a Sales CRM?",                                                  answer: "A Sales CRM is a customer relationship management software that helps businesses track leads, manage customer interactions, and automate sales processes to improve conversions." },
  { question: "How to use CRM in sales?",                                               answer: "To use a Sales CRM effectively, businesses can track customer interactions, automate follow-ups, manage pipelines, and generate reports to optimize sales strategies." },
  { question: "Are Sales CRMs free?",                                                   answer: "Some Sales CRMs offer free plans with limited features, but advanced sales automation, analytics, and integrations usually require a paid subscription." },
  { question: "Which CRM is best for sales?",                                           answer: "The best Sales CRM depends on business needs, but popular options include Interakt, HubSpot, Salesforce, and Zoho CRM, which offer lead management, automation, and analytics." },
  { question: "Does Sales CRM help in pipeline management?",                            answer: "Yes, a Sales CRM helps in pipeline management by organizing leads, tracking deal progress, and automating follow-ups to improve sales efficiency." },
  { question: "Is it possible to qualify leads with Sales CRM?",                        answer: "Yes, a Sales CRM qualifies leads using AI-powered scoring, customer behavior tracking, and automation to identify high-potential prospects." },
  { question: "Does AI in Sales CRM help sales teams?",                                 answer: "Yes, AI in Sales CRM enhances productivity by automating tasks, analyzing customer behavior, and providing predictive insights to help sales teams close deals faster." },
  { question: "Can I integrate Sales CRM with WhatsApp?",                               answer: "Yes, Sales CRM integration with WhatsApp is possible using platforms like Interakt, which enables automated messaging, lead management, and customer engagement." },
  { question: "Is WhatsApp Sales CRM free?",                                            answer: "WhatsApp Sales CRM like Interakt may offer a free trial, but full-featured access often comes with paid plans for automation, bulk messaging, and CRM integrations." },
  { question: "Can I integrate my Instagram Business Account with Sales CRM?",          answer: "Yes, integrating Instagram Business with a Sales CRM allows businesses to capture leads, track interactions, and automate responses directly from Instagram." },
  { question: "What are the best WhatsApp CRM features for SMBs?",                     answer: "The best WhatsApp CRM features for SMBs include automated responses, interactive messages, lead capture, quick replies, and seamless payment collection." },
  { question: "Is there a CRM for WhatsApp?",                                          answer: "Yes, WhatsApp CRM solutions like Interakt help businesses manage customer conversations, automate replies, and integrate WhatsApp with their sales workflow." },
  { question: "Do enterprises use WhatsApp CRM?",                                       answer: "Yes, enterprises use WhatsApp CRM to streamline sales, automate customer interactions, and improve engagement with large-scale messaging solutions." },
  { question: "Can I automate messages on WhatsApp with a CRM?",                        answer: "Yes, WhatsApp CRM like Interakt allows businesses to automate messages, send bulk notifications, and personalize customer interactions." },
];

// ─── MEDIA CONFIGURATION ─────────────────────────────────────────────────────
const HERO_VIDEO_SRC        = "/Videos/wcrm1.webm";
const DESKTOP_IMAGE_SRC     = "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wcc35.webp";
const MOBILE_IMAGE_SRC      = "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wcc36.webp";
const INTEGRATIONS_IMAGE_SRC = "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wcrm11.webp";

// ─── Testimonial Carousel Data ────────────────────────────────────────────────
const testimonialSlides = [
  {
    logoSrc: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/L1.webp",
    logoAlt: "The Design Cart",
    quote: "30% higher retention rate in the last 6 months. 20% of business revenue is from WhatsApp alone. With Interakt, WhatsApp became more than just a chat platform — it turned into a powerful sales and retention channel, driving seamless customer engagement and business growth.",
    avatarSrc: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Circle-Avatar2.webp",
    avatarAlt: "Apaar Gupta",
    name: "Apaar Gupta",
    role: "Founder",
  },
  {
    logoSrc: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/L2.webp",
    logoAlt: "Bombay Sweet Shop",
    quote: "We were able to increase our revenue from the first Diwali to the second Diwali to approximately 4× of what we did and we couldn't have done this without the help of Interakt.",
    avatarSrc: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Circle-Avatar3.webp",
    avatarAlt: "Yash Bhanage",
    name: "Yash Bhanage",
    role: "Co-founder",
  },
  {
    logoSrc: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/L7.webp",
    logoAlt: "ISAK",
    logoText: "I S A K",
    quote: "42% boost in customer engagement. We are excited to continue scaling our operations with Interakt, leveraging their automation and other innovative features to further enhance our customer engagement.",
    avatarSrc: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Circle-Avatar.webp",
    avatarAlt: "Vidushi Vijayvergiya",
    name: "Vidushi Vijayvergiya",
    role: "Founder & CEO",
  },
  {
    logoSrc: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/L4.webp",
    logoAlt: "OKHAI",
    logoText: "O K H A I",
    quote: "60% reduction in Cart Abandonment. 15% increase in sales month-over-month. Since Interakt our cart abandonment is almost nil. Every day we find orders in the abandoned carts, we hit at it and we get conversions. We get real-time sales from there.",
    avatarSrc: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Circle-Avatar4.webp",
    avatarAlt: "Manorath Dhillon",
    name: "Manorath Dhillon",
    role: "CEO",
  },
];

// ─── Testimonial Carousel Component (NO container box) ───────────────────────
function TestimonialCarousel() {
  const [active, setActive] = useState(0);
  const total = testimonialSlides.length;
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((prev) => (prev + 1) % total), 3000);
    return () => clearInterval(id);
  }, [paused, total]);

  const prev = () => setActive((a) => (a - 1 + total) % total);
  const next = () => setActive((a) => (a + 1) % total);
  const slide = testimonialSlides[active];

  return (
    <Section className="relative z-10">
      {/* Heading */}
      <Reveal direction="up" delay={0}>
        <h2 className="text-center mb-2" style={{ fontFamily: "'Baskerville','Libre Baskerville',Georgia,serif", fontSize: "18px", background: "linear-gradient(135deg,#f5d87a,#fff8e7 55%,#c8922a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          What our clients have to say
        </h2>
        <p className="text-center text-sm mb-10" style={{ color: "rgba(255,248,231,0.38)", fontFamily: "'Inter',sans-serif" }}>
          Real results from real businesses growing with WhatsApp CRM
        </p>
      </Reveal>

      {/* Carousel — no card, no border, no background */}
      <div
        className="max-w-2xl mx-auto relative flex flex-col items-center gap-6"
        style={{ padding: "0 48px" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Logo */}
        <div style={{ minHeight: "56px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {slide.logoSrc ? (
            <img
              src={slide.logoSrc}
              alt={slide.logoAlt}
              style={{ maxHeight: "60px", maxWidth: "200px", objectFit: "contain", display: "block" }}
            />
          ) : (
            <span style={{
              fontFamily: "'Baskerville','Libre Baskerville',Georgia,serif",
              fontSize: "clamp(18px,3vw,28px)",
              letterSpacing: "0.3em",
              background: "linear-gradient(135deg,#c8922a,#f5d87a)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>{slide.logoText}</span>
          )}
        </div>

        {/* Quote */}
        <p style={{
          color: "rgba(255,248,231,0.72)",
          fontFamily: "'Inter',sans-serif",
          fontSize: "clamp(13px,1.5vw,15px)",
          lineHeight: 1.85,
          fontStyle: "italic",
          textAlign: "center",
          margin: 0,
        }}>
          "{slide.quote}"
        </p>

        {/* Avatar + name */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", justifyContent: "center" }}>
          <div style={{
            width: "52px", height: "52px", borderRadius: "50%",
            overflow: "hidden", flexShrink: 0,
            border: "2px solid rgba(200,146,42,0.5)",
            background: "linear-gradient(135deg,#c8922a,#f5d87a)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {slide.avatarSrc ? (
              <img
                src={slide.avatarSrc}
                alt={slide.avatarAlt}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            ) : (
              <span style={{ color: "#0a0800", fontWeight: 700, fontSize: "20px", fontFamily: "'Baskerville',Georgia,serif" }}>
                {slide.name.charAt(0)}
              </span>
            )}
          </div>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontFamily: "'Baskerville','Libre Baskerville',Georgia,serif", fontSize: "15px", background: "linear-gradient(135deg,#f5d87a,#c8922a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {slide.name}
            </div>
            <div style={{ color: "rgba(255,248,231,0.42)", fontFamily: "'Inter',sans-serif", fontSize: "12px" }}>
              {slide.role}
            </div>
          </div>
        </div>
      </div>

      {/* Dot indicators */}
      <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "24px" }}>
        {testimonialSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              width: i === active ? "24px" : "8px",
              height: "8px",
              borderRadius: "9999px",
              border: "none",
              cursor: "pointer",
              background: i === active ? "linear-gradient(90deg,#c8922a,#f5d87a)" : "rgba(200,146,42,0.28)",
              transition: "all 0.35s ease",
              padding: 0,
            }}
          />
        ))}
      </div>
    </Section>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function WhatsAppCrm() {
  return (
    <>
      <SEO {...pageSEO.whatsappCRM} />
      <style>{globalStyle}</style>
      <div style={{ background: "#070500", color: "#fff8e7", fontFamily: "'Inter',sans-serif", overflowX: "hidden", position: "relative" }}>

        {/* Ambient orbs */}
        <div className="fixed pointer-events-none" style={{ top: "6%", right: "6%", width: "520px", height: "520px", borderRadius: "50%", background: "radial-gradient(circle,rgba(200,146,42,0.07) 0%,transparent 70%)", filter: "blur(70px)", zIndex: 0 }} />
        <div className="fixed pointer-events-none" style={{ bottom: "18%", left: "4%", width: "380px", height: "380px", borderRadius: "50%", background: "radial-gradient(circle,rgba(245,216,122,0.05) 0%,transparent 70%)", filter: "blur(90px)", zIndex: 0 }} />
        <div className="fixed pointer-events-none" style={{ top: "45%", left: "45%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle,rgba(200,146,42,0.03) 0%,transparent 65%)", filter: "blur(100px)", zIndex: 0 }} />

        {/* ══ SECTION 1 — HERO ══════════════════════════════════════════════ */}
        <Section className="hero-section relative z-10 pt-28 md:pt-40">
          <div className="hero-inner max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16" style={{ marginTop: 150 }}>

            <div className="hero-left flex-1 flex flex-col gap-5 text-center lg:text-left">

              <Reveal direction="left" delay={0} className="hero-badge">
                <span className="inline-block text-xs uppercase tracking-widest px-3 py-1 rounded-full mb-1"
                  style={{ border: "1px solid rgba(200,146,42,0.3)", color: "rgba(245,216,122,0.6)", fontFamily: "'Inter',sans-serif", background: "rgba(200,146,42,0.07)" }}>
                  WhatsApp Sales CRM
                </span>
              </Reveal>

              <Reveal direction="left" delay={80} className="hero-title">
                <h1 style={{ fontFamily: "'Baskerville','Libre Baskerville',Georgia,serif", fontSize: "clamp(26px,4vw,52px)", lineHeight: 1.18, background: "linear-gradient(135deg,#f5d87a 0%,#fff8e7 40%,#e8b84b 70%,#f5d87a 100%)", backgroundSize: "200% 200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "gradientMove 5s ease infinite" }}>
                  Your Smartest <span style={{ fontStyle: "italic" }}>WhatsApp</span><br />Sales CRM Yet
                </h1>
              </Reveal>

              <Reveal direction="left" delay={160} className="hero-desc">
                <p className="text-sm md:text-base leading-relaxed max-w-md mx-auto lg:mx-0" style={{ color: "rgba(255,248,231,0.55)" }}>
                  Capture, nurture, and close deals faster all inside WhatsApp. The CRM built for modern sales teams that want to meet customers where they already are.
                </p>
              </Reveal>

              

              <Reveal direction="left" delay={300} className="hero-logos">
                <IntegrationLogoStrip />
              </Reveal>
            </div>

            <Reveal direction="right" delay={150} className="hero-video flex-1 w-full">
              <div className="relative" style={{ animation: "floatUp 5s ease-in-out infinite" }}>
                <div className="absolute inset-0 pointer-events-none" style={{ borderRadius: "16px", background: "radial-gradient(ellipse,rgba(200,146,42,0.18) 0%,transparent 70%)", filter: "blur(28px)", animation: "pulseGlow 3s ease-in-out infinite" }} />
                <HeroVideo src={HERO_VIDEO_SRC} />
              </div>
            </Reveal>
          </div>

          <Reveal direction="up" delay={350}>
            <div className="max-w-7xl mx-auto mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: "⏱️", value: "6 hr",  label: "Avg setup time" },
                { icon: "📈", value: "70%",    label: "Faster lead response with WhatsApp" },
                { icon: "🔄", value: "2x",     label: "Salesforce reps productivity boost" },
                { icon: "🎯", value: "60%",    label: "Boost in agent productivity with SMS" },
              ].map((s) => <StatPill key={s.label} {...s} />)}
            </div>
          </Reveal>
        </Section>

        {/* ══ SECTION 3 — FEATURE CARDS ═════════════════════════════════════ */}
        <Section className="relative z-10">
          <div className="max-w-7xl mx-auto">
            <Reveal direction="up" delay={0}>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                <div>
                  <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "rgba(245,216,122,0.4)", fontFamily: "'Inter',sans-serif" }}>Sales conversations from close every time</p>
                  <h2 style={{ fontFamily: "'Baskerville','Libre Baskerville',Georgia,serif", fontSize: "18px", background: "linear-gradient(135deg,#f5d87a 0%,#fff8e7 55%,#c8922a 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    Sales CRM for WhatsApp:<br />Capture, Track &amp; Close Faster
                  </h2>
                </div>
                <div className="flex gap-3">
                  
                </div>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {crmFeatures.map((feat, i) => <FeatureCard key={feat.title} {...feat} delay={i * 90} />)}
            </div>
          </div>
        </Section>

        {/* ══ SECTION 4 — IMPACT STRIP ══════════════════════════════════════ */}
        <Section className="relative z-10">
          <Reveal direction="up" delay={0}>
            <h2 className="text-center mb-8" style={{ fontFamily: "'Baskerville','Libre Baskerville',Georgia,serif", fontSize: "18px", background: "linear-gradient(135deg,#f5d87a,#fff8e7 55%,#c8922a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Effortless Sales, Maximum Impact
            </h2>
          </Reveal>
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 divide-y sm:divide-y-0 sm:divide-x"
            style={{ border: "1px solid rgba(200,146,42,0.18)", borderRadius: "16px", overflow: "hidden", background: "rgba(255,255,255,0.015)" }}>
            {impactItems.map((item, i) => <ImpactCard key={item.title} {...item} delay={i * 80} />)}
          </div>
        </Section>

        {/* ══ SECTION 6 — DESKTOP + MOBILE ══════════════════════════════════ */}
        <Section className="relative z-10">
          <Reveal direction="up" delay={0}>
            <h2 className="text-center mb-2" style={{ fontFamily: "'Baskerville','Libre Baskerville',Georgia,serif", fontSize: "18px", background: "linear-gradient(135deg,#f5d87a,#fff8e7 55%,#c8922a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Take care of business anywhere, anytime
            </h2>
            <p className="text-center text-sm mb-8" style={{ color: "rgba(255,248,231,0.4)", fontFamily: "'Inter',sans-serif" }}>Desktop power, mobile freedom. Manage your entire sales pipeline from any device.</p>
          </Reveal>
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Reveal direction="left" delay={0}>
              <HoverCard className="p-6 flex flex-col gap-4">
                <MediaBox src={DESKTOP_IMAGE_SRC} alt="Desktop CRM Dashboard" aspect="aspect-[16/10]" />
                <h3 style={{ fontFamily: "'Baskerville','Libre Baskerville',Georgia,serif", fontSize: "18px", background: "linear-gradient(135deg,#f5d87a,#fff8e7 55%,#c8922a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Stay In Control, Right from Your Desk</h3>
                <p style={{ color: "rgba(255,248,231,0.52)", fontFamily: "'Inter',sans-serif", fontSize: "14px", lineHeight: 1.72 }}>Full-featured web dashboard with Kanban pipelines, bulk actions, team inbox management, advanced filters, and real-time analytics. Everything a power user needs.</p>
                
              </HoverCard>
            </Reveal>
            <Reveal direction="right" delay={100}>
              <HoverCard className="p-6 flex flex-col gap-4">
                <div className="flex gap-4">
                  <MediaBox src={MOBILE_IMAGE_SRC} alt="Mobile CRM App" aspect="aspect-[9/16]" className="w-2/5" />
                </div>
                <h3 style={{ fontFamily: "'Baskerville','Libre Baskerville',Georgia,serif", fontSize: "18px", background: "linear-gradient(135deg,#f5d87a,#fff8e7 55%,#c8922a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Power Your Sales On-the-Go</h3>
                <p style={{ color: "rgba(255,248,231,0.52)", fontFamily: "'Inter',sans-serif", fontSize: "14px", lineHeight: 1.72 }}>Manage your pipeline, reply to WhatsApp leads, send follow-ups, and close deals from your phone. The Interakt mobile app gives your team full CRM power in their pocket.</p>
              </HoverCard>
            </Reveal>
          </div>
        </Section>

        {/* ══ SECTION 7 — INTEGRATIONS ══════════════════════════════════════ */}
        <Section className="relative z-10">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <div className="flex-1">
              <Reveal direction="left" delay={0}>
                <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "rgba(245,216,122,0.4)", fontFamily: "'Inter',sans-serif" }}>Plug &amp; Play</p>
                <h2 style={{ fontFamily: "'Baskerville','Libre Baskerville',Georgia,serif", fontSize: "18px", background: "linear-gradient(135deg,#f5d87a,#fff8e7 55%,#c8922a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: "16px" }}>
                  Unifying Your Processes with 60+<br />Plug &amp; Play Integrations
                </h2>
                <p style={{ color: "rgba(255,248,231,0.52)", fontFamily: "'Inter',sans-serif", fontSize: "14px", lineHeight: 1.72, marginBottom: "20px" }}>
                  Connect Interakt's WhatsApp CRM with the tools your team already loves e-commerce, payment gateways, CRMs, automation platforms, and more. No code required.
                </p>
              </Reveal>
            </div>
            <Reveal direction="right" delay={120} className="flex-1">
              {INTEGRATIONS_IMAGE_SRC ? (
                <img
                  src={INTEGRATIONS_IMAGE_SRC}
                  alt="Integrations"
                  className="w-full rounded-2xl"
                  style={{ display: "block", objectFit: "contain", height: "auto" }}
                />
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                  {integrations.map((intg, i) => (
                    <Reveal key={intg.name} direction="fade" delay={i * 40}>
                      <IntegrationLogo {...intg} />
                    </Reveal>
                  ))}
                </div>
              )}
            </Reveal>
          </div>
        </Section>

        {/* ══ SECTION 9 — TESTIMONIALS CAROUSEL ════════════════════════════ */}
        <TestimonialCarousel />

        {/* ══ SECTION 10 — FAQ ══════════════════════════════════════════════ */}
        <Section className="relative z-10">
          <Reveal direction="up" delay={0}>
            <h2 className="text-center mb-2" style={{ fontFamily: "'Baskerville','Libre Baskerville',Georgia,serif", fontSize: "18px", background: "linear-gradient(135deg,#f5d87a,#fff8e7 55%,#c8922a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Still Have Questions? We've Got Answers</h2>
            <p className="text-center text-sm mb-8" style={{ color: "rgba(255,248,231,0.38)", fontFamily: "'Inter',sans-serif" }}>Everything you need to know about Interakt's WhatsApp Sales CRM</p>
          </Reveal>
          <Reveal direction="up" delay={80} className="max-w-3xl mx-auto">
            <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.016)", border: "1px solid rgba(200,146,42,0.17)" }}>
              <div className="px-6 py-2">{faqData.map((item) => <FaqItem key={item.question} question={item.question} answer={item.answer} />)}</div>
            </div>
          </Reveal>
        </Section>
<ContactUsForm/>
        {/* Bottom accent line */}
        <div style={{ height: "2px", background: "linear-gradient(90deg,transparent,rgba(200,146,42,0.5) 40%,rgba(245,216,122,0.7) 50%,rgba(200,146,42,0.5) 60%,transparent)" }} />
      </div>
    </>
  );
}