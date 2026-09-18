import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight, Rocket, Check, ChevronDown, ChevronUp,
  Target, BarChart3, Settings, Zap,
  ChevronLeft, ChevronRight, ShoppingBag, GraduationCap,
  Heart, UtensilsCrossed, MessageSquare,
} from "lucide-react";
import ContactUsForm from "@/pages/ContactUsForm";
import SEO from "@/components/SEO";
import { pageSEO } from "@/seo/pageSEO";
 // Import your existing ContactUsForm component

const useScrollFade = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("sv"); }),
      { threshold: 0.06, rootMargin: "0px 0px -20px 0px" }
    );
    const el = ref.current;
    if (!el) return;
    el.querySelectorAll(".si").forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);
  return ref;
};

const H = ({ children, tag: Tag = "h2", className = "", style = {} }: {
  children: React.ReactNode; tag?: "h1"|"h2"|"h3"|"h4"; className?: string; style?: React.CSSProperties;
}) => (
  <Tag className={`wa-heading ${className}`} style={{
    fontFamily: "'Libre Baskerville','Baskerville','Georgia',serif",
    fontSize: "18px", lineHeight: "1.45", fontWeight: 700,
    background: "linear-gradient(135deg,#c9961a 0%,#fff 50%,#e8c04a 100%)",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
    backgroundClip: "text", display: "inline-block", paddingBottom: "0.1em", ...style,
  }}>{children}</Tag>
);

const GoldBtn = ({ children, outline = false, className = "" }: {
  children: React.ReactNode; outline?: boolean; className?: string;
}) => (
  <button className={`wa-btn inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-0.5 ${className}`}
    style={{ fontFamily: "Inter,sans-serif", fontSize: "14px", cursor: "pointer",
      ...(outline ? { border: "1px solid #c9961a", color: "#e8c04a", background: "transparent", boxShadow: "0 0 16px rgba(201,150,26,0.12)" }
                 : { background: "linear-gradient(135deg,#c9961a,#e8c04a,#c9961a)", color: "#000", boxShadow: "0 4px 20px rgba(201,150,26,0.35)", border: "none" }) }}>
    {children}
  </button>
);

const Sec = ({ children, className = "", id = "", style = {} }: {
  children: React.ReactNode; className?: string; id?: string; style?: React.CSSProperties;
}) => (
  <section id={id} className={`relative overflow-hidden ${className}`}
    style={{ paddingTop: "clamp(80px, 8vw, 110px)", paddingBottom: "clamp(32px, 4vw, 48px)", ...style }}>
    {children}
  </section>
);

const Card = ({ children, className = "", style = {} }: {
  children: React.ReactNode; className?: string; style?: React.CSSProperties;
}) => (
  <div className={`wa-card relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 ${className}`}
    style={{ background: "hsl(0,0%,7%)", border: "1px solid rgba(201,150,26,0.15)", ...style }}>
    <div className="wa-shine absolute inset-0 pointer-events-none rounded-2xl" />
    {children}
  </div>
);

const SplitCard = ({ icon: Icon, iconBg, iconColor, title, desc, imgSrc, imgAlt, className = "", style = {} }: {
  icon: React.ElementType; iconBg: string; iconColor: string;
  title: React.ReactNode; desc: string;
  imgSrc: string; imgAlt: string;
  className?: string; style?: React.CSSProperties;
}) => (
  <Card className={`split-card ${className}`} style={{ display: "flex", flexDirection: "column", ...style }}>
    {/* Image — top on mobile, right on desktop */}
    <div className="split-img" style={{ position: "relative", overflow: "hidden", background: "hsl(0,0%,5%)" }}>
      <img src={imgSrc} alt={imgAlt}
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; const fb = e.currentTarget.nextElementSibling as HTMLElement; if (fb) fb.style.display = "flex"; }}
      />
      <div style={{ display: "none", alignItems: "center", justifyContent: "center", minHeight: "160px" }}>
        <Icon style={{ width: 48, height: 48, color: iconColor, opacity: 0.2 }} />
      </div>
    </div>
    {/* Content — bottom on mobile, left on desktop */}
    <div className="split-content" style={{ padding: "28px 24px 28px 28px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div style={{ width: 40, height: 40, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: iconBg, marginBottom: 14, flexShrink: 0 }}>
        <Icon style={{ width: 20, height: 20, color: iconColor }} />
      </div>
      <H tag="h3" className="mb-2" style={{ fontSize: "16px" }}>{title}</H>
      <p style={{ fontFamily: "Inter,sans-serif", fontSize: "13px", color: "#888", lineHeight: "1.7", margin: 0 }}>{desc}</p>
    </div>
  </Card>
);

const StackCard = ({ icon: Icon, iconBg, iconColor, title, desc, imgSrc, imgAlt, imgPaddingTop = "58%", className = "", style = {} }: {
  icon: React.ElementType; iconBg: string; iconColor: string;
  title: React.ReactNode; desc: string;
  imgSrc: string; imgAlt: string; imgPaddingTop?: string;
  className?: string; style?: React.CSSProperties;
}) => (
  <Card className={className} style={{ display: "flex", flexDirection: "column", ...style }}>
    <div style={{ padding: "32px 32px 24px" }}>
      <div style={{ width: 44, height: 44, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: iconBg, marginBottom: 18 }}>
        <Icon style={{ width: 22, height: 22, color: iconColor }} />
      </div>
      <H tag="h3" className="mb-3" style={{ fontSize: "18px" }}>{title}</H>
      <p style={{ fontFamily: "Inter,sans-serif", fontSize: "14px", color: "#888", lineHeight: "1.75" }}>{desc}</p>
    </div>
    <div style={{ position: "relative", flex: 1, overflow: "hidden", background: "hsl(0,0%,5%)", borderTop: "1px solid rgba(201,150,26,0.08)" }}>
      <div style={{ display: "block", paddingTop: imgPaddingTop }} />
      <img src={imgSrc} alt={imgAlt}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; const fb = e.currentTarget.nextElementSibling as HTMLElement; if (fb) fb.style.display = "flex"; }}
      />
      <div style={{ display: "none", position: "absolute", inset: 0, alignItems: "center", justifyContent: "center", color: "#333", fontSize: "13px", fontFamily: "Inter,sans-serif" }}>
        {imgAlt} placeholder
      </div>
    </div>
  </Card>
);

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const TRUST_BRANDS = [
  { name: "Zydus",      img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/M1.svg" }, { name: "EuroKids",  img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/M2.svg" },
  { name: "Noise",      img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/M3.svg" }, { name: "MyGlamm",   img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/M4.svg" },
  { name: "Chai Sutta", img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/M5.svg" }, { name: "PTAL",      img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/M6.svg" },
  { name: "Bisleri",    img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/M7.svg" }, { name: "Brand8",    img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/M8.svg" },
  { name: "Brand9",     img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/M9.svg" }, { name: "Brand10",   img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/M10.svg" },
  { name: "Brand11",    img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/M11.svg"}, { name: "Brand12",   img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/M12.svg" },
];

const COMPARISON_ROWS = [
  { label: "Ads Manager Setup",                    interakt: "Automatically created by Whats App Ads",                             fb: "Manual setup (can be complex)" },
  { label: "WhatsApp Ad Creation",                 interakt: "Built-in with guided steps",                                    fb: "Available but not intuitive" },
  { label: "Chatbot Integration at Setup",         interakt: "Seamlessly connect a chatbot while creating the ad",            fb: "Needs separate integration via third-party tools" },
  { label: "Conversion Point Configuration",       interakt: "Choose conversion events (lead, call, sale) during ad setup",   fb: "Not directly available during ad setup" },
  { label: "Unified Dashboard for Ads & WhatsApp", interakt: "One place for ad creation + conversation tracking",             fb: "Requires switching between platforms" },
  { label: "Analytics & Performance Tracking",     interakt: "Real time, WhatsApp focused insights",                          fb: "Generic ad metrics" },
  { label: "Ease of Use",                          interakt: "Designed for business users, no expertise needed",               fb: "Requires prior ad experience" },
  { label: "Best For",                             interakt: "Businesses looking to drive conversations & automate workflows", fb: "Ad agencies managing complex funnels" },
];

const USE_CASES = [
  { id: "edtech",     icon: GraduationCap,   label: "Edtech",              heading: "Capture student attention with click to WhatsApp ads and get them enrolled with our automated flows",   img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Edutech.gif" },
  { id: "d2c",        icon: ShoppingBag,     label: "D2C",                 heading: "Run click to WhatsApp Ads to capture prospect attention and acquire qualified leads",                    img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Consumer.gif" },
  { id: "healthcare", icon: Heart,           label: "Healthcare",          heading: "Re-target your website visitors on Facebook & Instagram and nudge them towards booking an appointment", img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Healthcare.gif" },
  { id: "hotels",     icon: UtensilsCrossed, label: "Hotels / Restaurant", heading: "Be where your customers with click to WhatsApp ads on Facebook & Instagram and boost reservations",     img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Hotel.gif" },
];

const TESTIMONIALS = [
  {
    metric: "52% reduction in CAC with CTWA as compared to other ad formats",
    quote: "CTWA helped us enrich customer conversations in profound ways and offer a seamless shopping experience.",
    name: "Jitendra Sharma",
    role: "Founder & CEO",
    img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ad6.webp",
  },
  {
    metric: "2.4X ROAS surpassing the performance of all the campaigns by threefold",
    quote: "We witnessed a significant improvement in our return on ad spend, as well as an increase in orders with CTWA.",
    name: "Kushal Soni",
    role: "Co-founder, Creative Dukaan & Socialee",
    img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ad7.webp",
  },
  {
    metric: "84% more conversions than other ad formats",
    quote: "With CTWA ads, we achieved record-breaking conversions within 2:15 minutes of Instagram discovery.",
    name: "Adil Khan",
    role: "Founder, BWT Experiences",
    img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ad8.webp",
  },
];

const WhatsAppAdsPage: React.FC = () => {
  const pageRef = useScrollFade();
  const [activeUseCase, setActiveUseCase] = useState(0);
  const [activeSlide, setActiveSlide]     = useState(0);

  // ── Mobile detection ──
  // Used ONLY to apply marginTop on h1 on mobile. Desktop is 100% untouched.
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 860);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const prevSlide = () => setActiveSlide((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const nextSlide = () => setActiveSlide((p) => (p + 1) % TESTIMONIALS.length);

  return (
    <>
      <SEO {...pageSEO.whatsappClickToAds} />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');

        .wa-root *, .wa-root *::before, .wa-root *::after { box-sizing: border-box; }
        .wa-root { font-family: "Inter", sans-serif; font-size: 14px; color: #d0d0d0; background: #000; min-height: 100vh; }
        .wa-inner { width: 100%; max-width: 1400px; margin: 0 auto; padding-left: clamp(16px,3vw,48px); padding-right: clamp(16px,3vw,48px); }

        .wa-heading { position: relative; overflow: hidden; }
        .wa-heading::after { content: ''; position: absolute; top: 0; left: -70%; width: 45%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent); animation: waShimmer 4s ease-in-out infinite; pointer-events: none; }
        @keyframes waShimmer { 0% { left: -70%; } 100% { left: 130%; } }

        .wa-shine { background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.045) 50%, transparent 70%); transform: translateX(-100%); transition: transform .55s ease; }
        .wa-card:hover .wa-shine { transform: translateX(100%); }
        .wa-card { transition: transform .3s ease, box-shadow .3s ease, border-color .3s ease; }
        .wa-card:hover { border-color: rgba(201,150,26,0.38) !important; box-shadow: 0 6px 36px rgba(201,150,26,0.16); }

        .si { opacity: 0; transform: translateY(30px); transition: opacity .65s ease, transform .65s ease; }
        .si.sv { opacity: 1; transform: translateY(0); }
        .si.d1.sv { transition-delay: .08s; } .si.d2.sv { transition-delay: .16s; }
        .si.d3.sv { transition-delay: .24s; } .si.d4.sv { transition-delay: .32s; }

        .wa-btn:hover { filter: brightness(1.1); }

        .wa-marquee { animation: waMarquee 28s linear infinite; }
        .wa-marquee:hover { animation-play-state: paused; }
        @keyframes waMarquee { 0% { transform: translateX(0); } 100% { transform: translateX(calc(-100% / 3)); } }

        .wa-brand { display: flex; align-items: center; justify-content: center; cursor: default; transition: transform 0.35s ease; padding: 0 20px; }
        .wa-brand:hover { transform: scale(1.07); }
        .wa-brand img { height: 48px; max-width: 160px; object-fit: contain; transition: filter 0.35s ease; display: block; }
        .wa-brand:hover img { filter: brightness(1.2) drop-shadow(0 0 6px rgba(201,150,26,0.4)); }
        .wa-brand-text { font-family: "Libre Baskerville", serif; font-size: 15px; font-weight: 700; color: #666; letter-spacing: 0.06em; white-space: nowrap; transition: color .3s; }
        .wa-brand:hover .wa-brand-text { color: #c9961a; }

        .wa-table th, .wa-table td { padding: 11px 16px; font-family: "Inter", sans-serif; font-size: 13px; border-bottom: 1px solid rgba(201,150,26,0.1); }
        .wa-table th { font-family: "Libre Baskerville","Georgia",serif; font-size: 14px; background: rgba(201,150,26,0.08); }
        .wa-table tr:last-child td { border-bottom: none; }
        .wa-table td:first-child { color: #b0b0b0; font-weight: 500; }
        .wa-table tr { transition: background .2s ease; }
        .wa-table tbody tr:hover { background: rgba(201,150,26,0.04) !important; }

        .uc-tab { display: flex; align-items: center; gap: 10px; width: 100%; padding: 14px 18px; text-align: left; background: none; border: none; cursor: pointer; border-left: 3px solid transparent; transition: all .25s ease; font-family: "Inter", sans-serif; font-size: 14px; color: #888; }
        .uc-tab.active { border-left-color: #c9961a; color: #e8c04a; background: rgba(201,150,26,0.06); }
        .uc-tab:hover:not(.active) { color: #d0d0d0; background: rgba(255,255,255,0.03); }

        .testi-dot { width: 10px; height: 10px; border-radius: 50%; background: rgba(255,255,255,0.2); transition: all .3s; cursor: pointer; border: none; padding: 0; }
        .testi-dot.active { background: #00b894; transform: scale(1.2); }

        /* ── SplitCard: desktop = side-by-side grid, mobile = image top + content below ── */
        .split-card .split-img  { height: 200px; }
        .split-card .split-content { border-top: 1px solid rgba(201,150,26,0.08); }
        @media (min-width: 861px) {
          .split-card { flex-direction: row !important; height: 280px; }
          .split-card .split-content { flex: 1; border-top: none; border-right: 1px solid rgba(201,150,26,0.08); order: -1; }
          .split-card .split-img { flex: 1; height: auto; }
        }

        /* ── Desktop hero layout — completely unchanged ── */
        .hero-wrap { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; min-height: 420px; }
        .hero-left  { display: flex; flex-direction: column; justify-content: center; }
        .hero-right { display: flex; align-items: center; justify-content: center; }

        .bento-outer { display: flex; flex-direction: row; gap: 16px; align-items: stretch; }
        .bento-left-col  { flex: 58; display: flex; flex-direction: column; gap: 16px; }
        .bento-right-col { flex: 42; display: flex; flex-direction: column; gap: 16px; }
        .b-c4-wrap { flex: 1; display: flex; flex-direction: column; min-height: 0; }
        .b-c4-wrap > * { flex: 1; }

        @media (max-width: 860px) {
          .bento-outer { flex-direction: column !important; }
          .bento-left-col, .bento-right-col { flex: none !important; width: 100% !important; }
          .b-c4-wrap { flex: none !important; }
          .hero-wrap { grid-template-columns: 1fr !important; gap: 32px !important; min-height: unset !important; }
          .uc-grid-inner { grid-template-columns: 1fr !important; }
          .testi-layout { flex-direction: column !important; text-align: center !important; }
          .wa-brand img { height: 36px; max-width: 120px; }
          .hero-right img { max-width: 80% !important; margin: 0 auto; }
          .hero-left { text-align: center; align-items: center; }
          .hero-left > div:last-child { display: flex; justify-content: center; width: 100%; }
          .hero-left p { max-width: 100% !important; }
        }
      `}</style>

      <div ref={pageRef} className="wa-root">

        {/* ══ 1. HERO ══
            Desktop: paddingTop 140px (unchanged, same as original)
            Mobile : paddingTop stays at 140px too — but the h1 gets
                     marginTop: 120px via inline style so the heading
                     is pushed below the fixed navbar.
                     marginTop on the element itself cannot be overridden
                     by any CSS class or media query — it always wins.
        */}
        <section
          style={{
            background: "#000",
            overflow: "hidden",
            marginTop: "140px",                          /* ← desktop value, untouched */
            paddingBottom: "clamp(20px,4vw,40px)",
            position: "relative",
          }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(201,150,26,0.08) 0%, transparent 70%)" }} />
          <div className="wa-inner relative" style={{ zIndex: 10 }}>
            <div className="hero-wrap">
              <div className="hero-left">

                {/* ── h1: marginTop 120px on mobile only, 0 on desktop ── */}
                <h1
                  className="wa-heading"
                  style={{
                    fontFamily: "'Libre Baskerville','Baskerville','Georgia',serif",
                    fontSize: isMobile ? "28px" : "34px",
                    lineHeight: isMobile ? "1.3" : "1.25",
                    fontWeight: 700,
                    background: "linear-gradient(135deg,#c9961a 0%,#fff 50%,#e8c04a 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    display: "inline-block",
                    paddingBottom: "0.1em",
                    marginBottom: isMobile ? "16px" : "20px",
                    marginTop: isMobile ? "120px" : "0px",  /* ← ONLY mobile change */
                  }}
                >
                  Launch Click-to-WhatsApp Ads<br />&amp; boost your conversions!
                </h1>

                <p style={{
                  fontFamily: "Inter,sans-serif",
                  fontSize: "15px",
                  color: "#a0a0a0",
                  lineHeight: "1.7",
                  marginBottom: isMobile ? "28px" : "32px",
                  maxWidth: "480px",
                }}>
                  The fastest way to run high-converting Click-to-WhatsApp ads, without the complexity of Meta Ads Manager.
                </p>

                

              </div>
              <div className="hero-right" style={{ marginTop:150 }}>
                <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ad1.webp" alt="Hero"
                  style={{ width: "100%", maxWidth: "580px", height: "auto", objectFit: "contain", display: "block" }}
                  onError={(e) => { const el = e.currentTarget as HTMLImageElement; el.style.display = "none"; const fb = el.nextElementSibling as HTMLElement; if (fb) fb.style.display = "flex"; }} />
                <div style={{ display: "none", alignItems: "center", justifyContent: "center", width: "100%", minHeight: "320px", background: "hsl(0,0%,8%)", borderRadius: "16px", border: "1px solid rgba(201,150,26,0.12)", color: "#444", fontSize: "13px", fontFamily: "Inter,sans-serif" }}>Hero Image</div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 2. TRUST BRANDS ══ */}
        <Sec style={{ borderTop: "1px solid rgba(201,150,26,0.08)", borderBottom: "1px solid rgba(201,150,26,0.08)" }}>
          <div className="si text-center mb-5">
            <p style={{ fontFamily: "Inter,sans-serif", fontSize: "13px", color: "#555", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 600 }}>
              50,000+ Businesses Across the Globe Trust Whats App Ads
            </p>
          </div>
          <div className="relative overflow-hidden" style={{ maskImage: "linear-gradient(90deg,transparent 0%,#000 10%,#000 90%,transparent 100%)", WebkitMaskImage: "linear-gradient(90deg,transparent 0%,#000 10%,#000 90%,transparent 100%)" }}>
            <div className="wa-marquee flex items-center" style={{ width: "max-content" }}>
              {[...TRUST_BRANDS, ...TRUST_BRANDS, ...TRUST_BRANDS].map((b, i) => (
                <div key={i} className="wa-brand shrink-0 select-none">
                  {b.img ? (<><img src={b.img} alt={b.name} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; const fb = e.currentTarget.nextElementSibling as HTMLElement; if (fb) fb.style.display = "block"; }} /><span className="wa-brand-text" style={{ display: "none" }}>{b.name}</span></>) : <span className="wa-brand-text">{b.name}</span>}
                </div>
              ))}
            </div>
          </div>
        </Sec>

        {/* ══ 3. FEATURES BENTO ══ */}
        <Sec>
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 45% at 50% 50%,rgba(201,150,26,0.04) 0%,transparent 70%)" }} />
          <div className="wa-inner relative z-10">
            <div className="si text-center mb-10">
              <H tag="h2" style={{ fontSize: "22px" }}>Turn Clicks into Customers with Whats App Ads's CTWA Ad Launcher</H>
            </div>
            <div className="bento-outer si">
              <div className="bento-left-col">
                <StackCard className="b-c1 d1" icon={Target} iconBg="rgba(0,184,148,0.12)" iconColor="#00b894"
                  title="Acquire New Customers"
                  desc="Run ads on Instagram & Facebook and acquire customer details once they click on your ads for future re-targeting campaigns."
                  imgSrc="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ad2.webp" imgAlt="Acquire New Customers" imgPaddingTop="58%" />
                <SplitCard className="b-c3 d3" icon={BarChart3} iconBg="rgba(201,150,26,0.1)" iconColor="#c9961a"
                  title="Powerful Dashboard"
                  desc="Save user information for re-targeting, track ROAS and more with Smart CTWA dashboard."
                  imgSrc="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ad4.webp" imgAlt="Powerful Dashboard" />
              </div>
              <div className="bento-right-col">
                <SplitCard className="b-c2 d2" icon={Settings} iconBg="rgba(201,150,26,0.1)" iconColor="#c9961a"
                  title={<>No Meta Ads Manager?<br />No trouble!</>}
                  desc="Whats App Ads will automatically create a Meta Ads Manager Account for you in the background, saving time and avoiding errors during setup."
                  imgSrc="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ad3.webp" imgAlt="No Meta Ads Manager" />
                <div className="b-c4-wrap d4">
                  <StackCard className="b-c4" icon={Zap} iconBg="rgba(0,184,148,0.1)" iconColor="#00b894"
                    title="Take your CTWA Ads to the next level with Conversion API (CAPI)"
                    desc="Take your Click-to-WhatsApp Ads to the next level with Conversion API (CAPI) for more accurate tracking and better ad performance."
                    imgSrc="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ad5.webp" imgAlt="Conversion API CAPI" imgPaddingTop="65%" />
                </div>
              </div>
            </div>
          </div>
        </Sec>

        {/* ══ 4. COMPARISON TABLE ══ */}
        <Sec>
          <div className="wa-inner">
            <div className="si text-center mb-8">
              <H tag="h2" style={{ fontSize: "22px" }}>Whats App Ads vs Facebook Ads Manager</H>
            </div>
            <div className="si rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(201,150,26,0.18)", background: "hsl(0,0%,5%)" }}>
              <div className="overflow-x-auto">
                <table className="wa-table w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="text-left" style={{ color: "#888", width: "24%" }}>&nbsp;</th>
                      <th className="text-center" style={{ color: "#e8c04a", width: "38%" }}><H tag="h4" style={{ fontSize: "16px" }}>Whats App Ads Launcher</H></th>
                      <th className="text-center" style={{ color: "#888", width: "38%" }}><H tag="h4" style={{ fontSize: "16px" }}>Facebook Ads Manager</H></th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON_ROWS.map((row, i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent" }}>
                        <td>{row.label}</td>
                        <td className="text-center"><span style={{ color: "#a0d8cc", fontSize: "13px" }}>{row.interakt}</span></td>
                        <td className="text-center"><span style={{ color: "#777", fontSize: "13px" }}>{row.fb}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Sec>

        {/* ══ 5. USE CASES ══ */}
        <Sec>
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 55% 45% at 50% 50%,rgba(0,184,148,0.04) 0%,transparent 70%)" }} />
          <div className="wa-inner relative z-10">
            <div className="si text-center mb-10">
              <H tag="h2" style={{ fontSize: "22px" }}>
                Full-stack WhatsApp Business Solution built to<br />support any industry use case:
              </H>
            </div>
            <div className="uc-grid-inner si" style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "32px", alignItems: "start" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {USE_CASES.map((uc, i) => (
                  <button key={uc.id} className={`uc-tab ${i === activeUseCase ? "active" : ""}`} onClick={() => setActiveUseCase(i)}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: i === activeUseCase ? "rgba(201,150,26,0.15)" : "rgba(255,255,255,0.04)" }}>
                      <uc.icon style={{ width: 16, height: 16, color: i === activeUseCase ? "#c9961a" : "#666" }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: i === activeUseCase ? 600 : 400 }}>{uc.label}</div>
                      {i === activeUseCase && (
                        <div style={{ fontFamily: "Inter,sans-serif", fontSize: "12px", color: "#888", fontWeight: 400, marginTop: 4, lineHeight: "1.5", whiteSpace: "normal" }}>
                          {uc.heading}
                        </div>
                      )}
                    </div>
                    {i === activeUseCase
                      ? <ChevronUp style={{ width: 16, height: 16, marginLeft: "auto", flexShrink: 0, color: "#c9961a" }} />
                      : <ChevronDown style={{ width: 16, height: 16, marginLeft: "auto", flexShrink: 0, color: "#555" }} />}
                  </button>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img
                  key={USE_CASES[activeUseCase].id}
                  src={USE_CASES[activeUseCase].img}
                  alt={USE_CASES[activeUseCase].label}
                  style={{ width: "100%", maxHeight: "440px", objectFit: "contain", display: "block" }}
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                />
              </div>
            </div>
          </div>
        </Sec>

        {/* ══ 6. TESTIMONIALS ══ */}
        <Sec>
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 45% at 50% 50%,rgba(201,150,26,0.03) 0%,transparent 70%)" }} />
          <div className="wa-inner relative z-10">
            <div className="si text-center mb-12">
              <H tag="h2" style={{ fontSize: "26px" }}>Real Brands, Real Results</H>
            </div>
            <div className="si" style={{ maxWidth: "860px", margin: "0 auto" }}>
              <div className="testi-layout" style={{ display: "flex", alignItems: "center", gap: "48px", marginBottom: "40px", flexDirection: isMobile ? "column" : "row", textAlign: isMobile ? "center" : "left" }}>
                <div style={{ flexShrink: 0, position: "relative", width: "200px", height: "240px" }}>
                  <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "180px", height: "200px", background: "rgba(0,184,148,0.25)", borderRadius: "100px 100px 0 0" }} />
                  <img
                    src={TESTIMONIALS[activeSlide].img}
                    alt={TESTIMONIALS[activeSlide].name}
                    style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "170px", height: "210px", objectFit: "cover", objectPosition: "top center", borderRadius: "100px 100px 0 0", display: "block" }}
                    onError={(e) => { const el = e.currentTarget as HTMLImageElement; el.style.display = "none"; const fb = el.nextElementSibling as HTMLElement; if (fb) fb.style.display = "flex"; }}
                  />
                  <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 170, height: 210, borderRadius: "100px 100px 0 0", display: "none", alignItems: "center", justifyContent: "center", background: "rgba(0,184,148,0.15)", color: "#555", fontSize: "12px", fontFamily: "Inter,sans-serif" }}>Photo</div>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: "'Libre Baskerville','Georgia',serif", fontSize: isMobile ? "18px" : "22px", fontWeight: 700, lineHeight: "1.35", color: "#00b894", marginBottom: "16px" }}>
                    {TESTIMONIALS[activeSlide].metric}
                  </p>
                  <p style={{ fontFamily: "Inter,sans-serif", fontSize: isMobile ? "14px" : "15px", color: "#b0b0b0", lineHeight: "1.75", marginBottom: "20px" }}>
                    {TESTIMONIALS[activeSlide].quote}
                  </p>
                  <div>
                    <p style={{ fontFamily: "'Libre Baskerville',serif", fontSize: "16px", fontWeight: 700, color: "#e8e8e8", marginBottom: "4px" }}>{TESTIMONIALS[activeSlide].name}</p>
                    <p style={{ fontFamily: "Inter,sans-serif", fontSize: "13px", color: "#666" }}>{TESTIMONIALS[activeSlide].role}</p>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                {TESTIMONIALS.map((_, i) => (
                  <button key={i} onClick={() => setActiveSlide(i)} className={`testi-dot ${i === activeSlide ? "active" : ""}`} />
                ))}
              </div>
            </div>
          </div>
        </Sec>

        {/* ══ 7. CONTACT US FORM SECTION ══ */}
        <Sec style={{ paddingTop: "clamp(20px,5vw,40px)", paddingBottom: "clamp(40px,8vw,80px)" }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 45% at 50% 50%,rgba(201,150,26,0.04) 0%,transparent 70%)" }} />
          <div className="wa-inner relative z-10">
          
            <section className="si" style={{ maxWidth: "100%", margin: "0 auto" }}>
              <ContactUsForm />
            </section>
          </div>
        </Sec>

      </div>
      
    </>
  );
};

export default WhatsAppAdsPage;