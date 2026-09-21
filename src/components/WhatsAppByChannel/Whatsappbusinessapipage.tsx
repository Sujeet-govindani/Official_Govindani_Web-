import React, { useEffect, useRef, useState } from "react";
import {
  CheckCircle, ChevronDown, ChevronUp, ArrowRight,
  MessageSquare, CreditCard, Bot, RefreshCw,
  ShoppingBag, TrendingUp, Rocket, Check, BarChart3,
} from "lucide-react";
import ContactUsForm from "@/pages/ContactUsForm";
import SEO from "@/components/SEO";
import { pageSEO } from "@/seo/pageSEO";

/* ─────────────────────────────────────────────
   SCROLL FADE HOOK — only for below-fold elements
───────────────────────────────────────────── */
const useScrollFade = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("sv"); }),
      { threshold: 0.05, rootMargin: "0px" }
    );
    const el = ref.current;
    if (!el) return;
    el.querySelectorAll(".si").forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);
  return ref;
};

/* ─────────────────────────────────────────────
   SHIMMER HEADING
───────────────────────────────────────────── */
const H = ({
  children, tag: Tag = "h2", className = "", style = {},
}: {
  children: React.ReactNode;
  tag?: "h1" | "h2" | "h3" | "h4";
  className?: string;
  style?: React.CSSProperties;
}) => (
  <Tag
    className={`wba-heading ${className}`}
    style={{
      fontFamily: "'Libre Baskerville','Baskerville','Georgia',serif",
      fontSize: "18px", lineHeight: "1.45", fontWeight: 700,
      background: "linear-gradient(135deg,#c9961a 0%,#fff 50%,#e8c04a 100%)",
      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
      backgroundClip: "text", display: "inline-block", paddingBottom: "0.1em",
      ...style,
    }}
  >
    {children}
  </Tag>
);

/* ─────────────────────────────────────────────
   GOLD BUTTON
───────────────────────────────────────────── */
const GoldBtn = ({ children, outline = false, className = "" }: {
  children: React.ReactNode; outline?: boolean; className?: string;
}) => (
  <button
    className={`wba-btn inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-0.5 ${className}`}
    style={{
      fontFamily: "Inter,sans-serif", fontSize: "14px", cursor: "pointer",
      ...(outline
        ? { border: "1px solid #c9961a", color: "#e8c04a", background: "transparent", boxShadow: "0 0 16px rgba(201,150,26,0.12)" }
        : { background: "linear-gradient(135deg,#c9961a,#e8c04a,#c9961a)", color: "#000", boxShadow: "0 4px 20px rgba(201,150,26,0.35)", border: "none" }),
    }}
  >
    {children}
  </button>
);

/* ─────────────────────────────────────────────
   SECTION WRAPPER
───────────────────────────────────────────── */
const Sec = ({ children, className = "", id = "", style = {} }: {
  children: React.ReactNode; className?: string; id?: string; style?: React.CSSProperties;
}) => (
  <section id={id} className={`relative overflow-hidden ${className}`}
    style={{ paddingTop: "clamp(80px, 8vw, 110px)", paddingBottom: "clamp(32px, 4vw, 48px)", ...style }}>
    {children}
  </section>
);

/* ─────────────────────────────────────────────
   CARD
───────────────────────────────────────────── */
const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div
    className={`wba-card relative rounded-2xl p-5 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_6px_36px_rgba(201,150,26,0.18)] ${className}`}
    style={{ background: "hsl(0,0%,6%)", border: "1px solid rgba(201,150,26,0.14)" }}
  >
    <div className="wba-shine absolute inset-0 pointer-events-none rounded-2xl" />
    {children}
  </div>
);

/* ─────────────────────────────────────────────
   FAQ ROW
───────────────────────────────────────────── */
const FaqRow = ({ q, a, idx }: { q: string; a: string; idx: number }) => {
  const [open, setOpen] = useState(idx === 0);
  return (
    <div className="border-b last:border-0" style={{ borderColor: "rgba(201,150,26,0.12)" }}>
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left gap-3 group"
        style={{ background: "none", border: "none", cursor: "pointer" }}>
        <span className="font-medium transition-colors group-hover:text-yellow-300"
          style={{ fontFamily: "Inter,sans-serif", fontSize: "14px", color: open ? "#e8c04a" : "#d0d0d0" }}>
          {q}
        </span>
        <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
          style={{ background: open ? "rgba(201,150,26,0.18)" : "rgba(255,255,255,0.06)" }}>
          {open ? <ChevronUp className="w-3.5 h-3.5 text-yellow-400" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-400" />}
        </span>
      </button>
      {open && (
        <p className="pb-4 leading-relaxed"
          style={{ fontFamily: "Inter,sans-serif", fontSize: "13px", color: "#888" }}>{a}</p>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────
   FEATURE IMAGE
───────────────────────────────────────────── */
const FeatImg = ({ src, alt, icon: Icon, className = "" }: {
  src: string; alt: string; icon: React.ElementType; className?: string;
}) => (
  <div className={`feat-img-wrap overflow-hidden ${className}`}
    style={{ borderRadius: "12px", border: "1px solid rgba(201,150,26,0.15)", background: "hsl(0,0%,5%)", width: "100%" }}>
    <img src={src} alt={alt}
      style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }}
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).style.display = "none";
        const fb = e.currentTarget.nextElementSibling as HTMLElement;
        if (fb) fb.style.display = "flex";
      }} />
    <div style={{ display: "none", alignItems: "center", justifyContent: "center", width: "100%", minHeight: "120px", background: "hsl(0,0%,8%)" }}>
      <Icon className="w-10 h-10" style={{ color: "#c9961a", opacity: 0.3 }} />
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const TRUST_BRANDS: { name: string; img: string; alt: string }[] = [
  { name: "Jio",       img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/W6.webp",  alt: "Jio" },
  { name: "Disney+",   img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/W7.webp",  alt: "Disney+" },
  { name: "pepperfry", img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/W8.webp",  alt: "pepperfry" },
  { name: "upstox",    img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/W9.webp",  alt: "upstox" },
  { name: "BBLUNT",    img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/W5.webp",  alt: "BBLUNT" },
  { name: "BLUE DART", img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/W3.webp",  alt: "BLUE DART" },
];

const ROW1_CARDS = [
  { icon: MessageSquare, title: "Send Bulk Messages with WhatsApp Business API",   desc: "Scale your business communication effortlessly. Send personalized bulk WhatsApp messages to drive customer engagement and conversions.", img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/W11.webp" },
  { icon: TrendingUp,    title: "Drive Leads and Sales with WhatsApp API Ads",      desc: "Turn clicks into conversations with WhatsApp Ads. Connect directly with leads from Instagram & Facebook on WhatsApp and nurture them into loyal customers.", img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/W12.webp" },
  { icon: CreditCard,    title: "Setup Payments with WhatsApp API Integration",     desc: "Simplify your payment process with WhatsApp. Enable customers to complete transactions securely while chatting with your brand.", img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/W13.webp" },
];

const ROW3_CARDS = [
  { icon: RefreshCw,   title: "Automated Message Retries with WhatsApp Business API", desc: "Never miss a message delivery. Whats App Business's automated retries ensure important updates reach your customers without fail.", img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/W15.webp" },
  { icon: ShoppingBag, title: "Seamless WhatsApp API Integration for Your Business",   desc: "Power up your business with seamless WhatsApp integrations. Sync your CRM, ecommerce, or support tools for a unified customer experience.", img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/W16.webp" },
  { icon: BarChart3,   title: "WhatsApp Marketing Messages: Simplified",               desc: "No more living in the fear of frequency capping! Attain higher campaign delivery rates and better insights with Marketing Messages Lite.", img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/W17.webp" },
];

const COMPARISON_ROWS = [
  { label: "Automated Messages",      app: false,                                         api: "Send unlimited automated messages to customers" },
  { label: "Send Bulk Notifications", app: "Limited to 256 contacts per broadcast group", api: "Send personalised messages to thousands of users simultaneously" },
  { label: "Individual access",       app: false,                                         api: "Integrate with 200+ leading CRM providers" },
  { label: "Integration",             app: false,                                         api: "Integrate with 200+ leading CRM providers" },
  { label: "Catalogue",               app: "Not customisable",                            api: "Setup an entire e-commerce store on WhatsApp" },
  { label: "Workflow Setup",          app: false,                                         api: "Set up complex, intelligent Workflow automations" },
  { label: "Analytics",               app: false,                                         api: "Get comprehensive business analytics" },
];

const SETUP_STEPS = [
  { num: "1", title: "Step 1", desc: "Connect your Facebook Business Page with Whats App Business Api" },
  { num: "2", title: "Step 2", desc: "Create your WhatsApp Business Account" },
  { num: "3", title: "Step 3", desc: "Add a WhatsApp Business number and start messaging your customers" },
];

const FAQS = [
  { q: "How to get WhatsApp Business API?",                                                   a: "To get access to the WhatsApp Business API, you need to apply through a WhatsApp Business Solution Provider (BSP). The process involves verifying your business, setting up a WhatsApp Business Account (WABA), and linking it to a phone number. Once approved, you can start using WhatsApp API for customer engagement." },
  { q: "How to integrate WhatsApp to client's CRM?",                                         a: "Integrating the WhatsApp Business API requires setting up a WhatsApp Business Account, verifying your phone number, and connecting it to a messaging platform like BSP. You can integrate it with CRM, e-commerce platforms, or third-party tools via APIs or pre-built connectors for seamless automation." },
  {
  q: "How to create a WhatsApp Business account?",
  a: `To create a WhatsApp Business API account, follow these steps:

Register your business with Meta Business Manager.
Apply for API access via a WhatsApp BSP like BSP.
Verify your business and phone number.
Set up message templates and integrate with your preferred platform.
Once approved, you can start using the API for customer interactions.`
},
  { q: "Can I download WhatsApp Business API?",                                                     a: "No, the WhatsApp Business API is not an app you can download. It is a cloud-based or on-premise solution that requires integration with a business platform like BSP. You need to set it up through an official WhatsApp BSP to use it for customer messaging." },
  { q: "Can I use WhatsApp API for sending messages in bulk??",                                                a: "Yes, businesses can send bulk messages using the WhatsApp Business API, but all messages must comply with WhatsApp's policies. You must use pre-approved message templates for outbound notifications, while session messages (customer-initiated) allow more flexibility." },
  { q: "Is WhatsApp Cloud API similar to WhatsApp Business API?",                            a: "Yes, the WhatsApp Cloud API and WhatsApp Business API offer similar functionalities, but with key differences. The Cloud API is hosted by Meta, making it more scalable and easier to set up for someone with coding and tech know-how. The on-premise Business API requires a BSP-managed solution, where a third-party sets-up your APIs." },
  { q: "What is the best WhatsApp Business platform for businesses?",               a: "The best WhatsApp Business platform depends on your business needs. If you're looking for an all-in-one solution, BSP offers a powerful platform with automation, CRM integrations, campaign management, and analytics to help businesses grow using WhatsApp." },
 {
  q: "What documents are required to set up a WhatsApp Business API account?",
  a: "To set up a WhatsApp Business API account, you need: a verified Meta Business Manager account, a phone number that is not linked to another WhatsApp account, business verification documents such as GST or another relevant document, and access to a WhatsApp BSP for seamless onboarding."
},
 {
  q: "How is WhatsApp Business API pricing determined?",
  a: "WhatsApp Business API pricing is based on a conversation-based model, where charges apply per conversation session within a 24-hour window. Pricing varies based on user-initiated vs. business-initiated messages, the category of messages (Marketing, Utility, Authentication, or Service), and regional pricing based on customer location. BSP provides a transparent pricing structure to help businesses optimize costs."
},
];

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
const WhatsAppBusinessAPIPage: React.FC = () => {
  const pageRef = useScrollFade();

  // ── Mobile detection — used ONLY for h1 marginTop ──
  // Desktop (>767px): marginTop = 0  →  zero change to desktop
  // Mobile (≤767px) : marginTop = 120px → pushes heading below navbar
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 767);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <>
      <SEO {...pageSEO.whatsappBusinessAPI} />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');

        .wba-root *, .wba-root *::before, .wba-root *::after { box-sizing:border-box; }
        .wba-root { font-family:"Inter",sans-serif; font-size:14px; color:#d0d0d0; }

        .wba-inner {
          width:100%; max-width:1400px; margin:0 auto;
          padding-left:clamp(16px,3vw,48px); padding-right:clamp(16px,3vw,48px);
        }

        /* ── Heading shimmer ── */
        .wba-heading { position:relative; overflow:hidden; }
        .wba-heading::after {
          content:''; position:absolute; top:0; left:-70%; width:45%; height:100%;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent);
          animation:wbaShimmer 4s ease-in-out infinite; pointer-events:none;
        }
        @keyframes wbaShimmer { 0%{left:-70%} 100%{left:130%} }

        /* ── Card shine ── */
        .wba-shine {
          background:linear-gradient(120deg,transparent 30%,rgba(255,255,255,0.045) 50%,transparent 70%);
          transform:translateX(-100%); transition:transform .55s ease;
        }
        .wba-card:hover .wba-shine { transform:translateX(100%); }
        .wba-card { transition:transform .3s ease, box-shadow .3s ease, border-color .3s ease; }
        .wba-card:hover { border-color:rgba(201,150,26,0.38) !important; }

        /* ── Scroll animations (NOT used on hero) ── */
        .si { opacity:0; transform:translateY(28px); transition:opacity .65s ease, transform .65s ease; }
        .si.sv { opacity:1; transform:translateY(0); }
        .si.d1.sv { transition-delay:.08s; } .si.d2.sv { transition-delay:.16s; }
        .si.d3.sv { transition-delay:.24s; } .si.d4.sv { transition-delay:.32s; }
        .si.d5.sv { transition-delay:.40s; } .si.d6.sv { transition-delay:.48s; }
        .si.d7.sv { transition-delay:.56s; }
        .si-left  { opacity:0; transform:translateX(-32px); transition:opacity .65s ease, transform .65s ease; }
        .si-right { opacity:0; transform:translateX(32px);  transition:opacity .65s ease, transform .65s ease; }
        .si-left.sv, .si-right.sv { opacity:1; transform:translateX(0); }

        .wba-btn:hover { filter:brightness(1.08); }

        /* ── Table ── */
        .wba-table th, .wba-table td {
          padding:10px 14px; font-family:"Inter",sans-serif;
          font-size:13px; border-bottom:1px solid rgba(201,150,26,0.1);
        }
        .wba-table th { font-family:"Libre Baskerville","Georgia",serif; font-size:14px; background:rgba(201,150,26,0.08); }
        .wba-table tr:last-child td { border-bottom:none; }
        .wba-table td:first-child { color:#b0b0b0; font-weight:500; }

        /* ── Marquee ── */
        .wba-marquee { animation:wbaMarquee 28s linear infinite; }
        .wba-marquee:hover { animation-play-state:paused; }
        @keyframes wbaMarquee { 0%{transform:translateX(0)} 100%{transform:translateX(calc(-100% / 3))} }

        /* ── Brand item ── */
        .brand-item {
          position:relative; display:flex; align-items:center; justify-content:center;
          cursor:default; transition:transform 0.35s ease;
          background:rgba(255,255,255,0.07); border-radius:10px; padding:8px 16px;
        }
        .brand-item::before {
          content:''; position:absolute; inset:-6px -10px; border-radius:14px;
          background:radial-gradient(ellipse 80% 70% at 50% 50%,rgba(201,150,26,0) 0%,rgba(201,150,26,0) 100%);
          filter:blur(10px); opacity:0; transition:opacity 0.4s ease,background 0.4s ease;
          pointer-events:none; z-index:0;
        }
        .brand-item:hover::before {
          background:radial-gradient(ellipse 80% 70% at 50% 50%,rgba(201,150,26,0.22) 0%,rgba(201,150,26,0.06) 60%,transparent 100%);
          opacity:1;
        }
        .brand-item:hover { transform:scale(1.07); background:rgba(255,255,255,0.11); }
        .brand-item img, .brand-item .brand-text { position:relative; z-index:1; }
        .brand-logo { height:32px; max-width:110px; object-fit:contain; filter:none; transition:filter 0.35s ease; display:block; }
        .brand-item:hover .brand-logo { filter:brightness(1.15) drop-shadow(0 0 6px rgba(201,150,26,0.35)); }
        .brand-text { font-family:"Libre Baskerville","Georgia",serif; font-size:14px; font-weight:700; color:#888; letter-spacing:0.06em; white-space:nowrap; transition:color .3s,text-shadow .3s; }
        .brand-item:hover .brand-text { color:#c9961a; text-shadow:0 0 18px rgba(201,150,26,0.5); }

        .wba-gold-line { display:inline-block; height:2px; width:40px; background:linear-gradient(90deg,#c9961a,#e8c04a); border-radius:2px; }

        .feat-img-wrap { transition:box-shadow .3s,border-color .3s; }
        .feat-img-wrap:hover { box-shadow:0 0 32px rgba(201,150,26,0.15); border-color:rgba(201,150,26,0.3) !important; }

        .mid-feat-container {
          border-radius:16px; border:1px solid rgba(201,150,26,0.14);
          background:hsl(0,0%,6%); overflow:hidden;
          transition:box-shadow .3s,border-color .3s;
        }
        .mid-feat-container:hover { box-shadow:0 6px 40px rgba(201,150,26,0.14); border-color:rgba(201,150,26,0.3); }

        .new-badge {
          display:inline-flex; align-items:center; gap:4px; padding:3px 10px; border-radius:20px;
          background:linear-gradient(135deg,#00b894,#00cba4); color:#000; font-size:12px; font-weight:700;
          font-family:"Inter",sans-serif; margin-left:8px; vertical-align:middle;
        }

        .testi-quote { font-family:"Georgia",serif; font-size:56px; line-height:1; color:#c9961a; opacity:0.7; display:block; }

        .step-circle {
          width:36px; height:36px; border-radius:50%;
          background:linear-gradient(135deg,#c9961a,#e8c04a);
          color:#000; font-weight:800; font-size:15px;
          display:flex; align-items:center; justify-content:center;
          flex-shrink:0; box-shadow:0 0 18px rgba(201,150,26,0.4);
        }

        .yt-wrap {
          position:relative; width:100%; padding-top:56.25%;
          border-radius:16px; overflow:hidden;
          border:1px solid rgba(201,150,26,0.2); box-shadow:0 8px 40px rgba(0,0,0,0.5);
        }
        .yt-wrap iframe { position:absolute; inset:0; width:100%; height:100%; border:none; }

        .cmp-no { color:#e74c3c; }

        .wba-input {
          width:100%; padding:10px 14px; border-radius:8px; outline:none;
          background:hsl(0,0%,8%); border:1px solid rgba(201,150,26,0.2);
          color:#d0d0d0; font-family:"Inter",sans-serif; font-size:13px; transition:border-color .2s;
        }
        .wba-input:focus { border-color:rgba(201,150,26,0.5); }
        .wba-input::placeholder { color:#444; }

        /* ════════════════════════════════════════════════════════
           HERO — Desktop layout (always shown, no scroll animation)
           Left col : heading (row 1) + bullets (row 2)
           Right col: image spans both rows
           ── DESKTOP COMPLETELY UNTOUCHED ──
        ════════════════════════════════════════════════════════ */
        .hero-wrap {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto 1fr;
          column-gap: 48px;
          align-items: start;
        }
        .hero-text-top   { grid-column:1; grid-row:1; }
        .hero-text-btm   { grid-column:1; grid-row:2; padding-top:20px; }
        .hero-img-col    { grid-column:2; grid-row:1/3; display:flex; align-items:center; justify-content:center; }

        /* ════════════════════════════════════════
           MOBILE OVERRIDES — max 767px only
        ════════════════════════════════════════ */
        @media (max-width:767px) {
          /* Stack hero: heading → image → bullets/CTA */
          .hero-wrap {
            display: flex !important;
            flex-direction: column !important;
            gap: 0 !important;
          }
          .hero-text-top { order:1; }
          .hero-img-col  { order:2; width:100%; margin:16px 0; }
          .hero-text-btm { order:3; padding-top:0; }

          /* Testimonial: image first, content below */
          .testi-grid {
            display: flex !important;
            flex-direction: column !important;
          }
          .testi-content { order:2 !important; border-right:none !important; border-top:1px solid rgba(201,150,26,0.1); }
          .testi-image   { order:1 !important; min-height:220px !important; }

          .wba-heading { font-size:15px !important; }
          .hero-h1     { font-size:20px !important; }
        }

        /* Header clearance. The global section:first-of-type reset in index.css
           zeroed this hero section's padding-top, so the h1 sat behind the fixed
           header. Double class plus important beats that reset; the h1 no longer
           needs its marginTop workaround. Stepped up on smaller screens. */
        .wba-root .hero-sec.hero-sec { padding-top: 112px !important; }
        @media (max-width: 900px) { .wba-root .hero-sec.hero-sec { padding-top: 120px !important; } }
        @media (max-width: 600px) { .wba-root .hero-sec.hero-sec { padding-top: 124px !important; } }
      `}</style>

      <div ref={pageRef} className="wba-root min-h-screen" style={{ background: "#000" }}>

        {/* ══════════════════════════════════════════
            1. HERO
            Desktop: paddingTop 140px (unchanged)
            Mobile : paddingTop stays 140px, but the h1
                     gets marginTop: 120px via inline style
                     to push heading below the fixed navbar.
                     Inline style on the element itself cannot
                     be overridden by any CSS — always wins.
        ══════════════════════════════════════════ */}
        <Sec
          className="hero-sec"
          style={{ paddingTop: "clamp(100px, 8vw, 120px)", paddingBottom: "clamp(32px, 4vw, 48px)" }}
        >
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 70% 55% at 50% 0%,rgba(201,150,26,0.07) 0%,transparent 70%)" }} />

          <div className="wba-inner relative z-10">
            <div className="hero-wrap">

              {/* ── Heading (desktop: col1 row1 / mobile: order 1) ── */}
              <div className="hero-text-top">
                {/*
                  marginTop: isMobile ? "120px" : "0px"
                  → Mobile only: pushes h1 down below the fixed navbar
                  → Desktop: zero change, exactly as before
                */}
                <H
                  tag="h1"
                  className="hero-h1"
                  style={{
                    fontSize: "32px",
                    marginTop: "0px",
                  }}
                >
                  Transform Your Business with<br />WhatsApp Business API
                </H>
              </div>

              {/* ── Image (desktop: col2 row1+2 / mobile: order 2) ── */}
              <div className="hero-img-col" style={{marginTop:100}}>
                <img
                  src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/W1.webp"
                  alt="WhatsApp Business API"
                  style={{ width: "100%", maxWidth: "560px", height: "auto", display: "block", objectFit: "contain",marginTop:"200" }}
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0.12"; }}
                />
              </div>

              {/* ── Bullets + CTA (desktop: col1 row2 / mobile: order 3) ── */}
              <div className="hero-text-btm">
                <ul className="space-y-2 mb-8">
                  {[
                    "Send bulk messages on WhatsApp",
                    "Get your team on WhatsApp",
                    "Send fast automated notifications",
                    "Setup automated WhatsApp chatbot",
                    "Run powerful WhatsApp marketing campaigns",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2" style={{ fontSize: "13px", color: "#a0a0a0" }}>
                      <CheckCircle className="w-4 h-4 shrink-0" style={{ color: "#00b894" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </Sec>

        {/* ══ 2. TRUST MARQUEE ══ */}
        <Sec style={{ borderTop: "1px solid rgba(201,150,26,0.08)", borderBottom: "1px solid rgba(201,150,26,0.08)" }}>
          <div className="si text-center mb-5">
            <p style={{ fontFamily: "Inter,sans-serif", fontSize: "13px", color: "#555", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 600 }}>
              25K+ Businesses Choose for WhatsApp API
            </p>
          </div>
          <div className="relative overflow-hidden"
            style={{
              maskImage: "linear-gradient(90deg,transparent 0%,#000 10%,#000 90%,transparent 100%)",
              WebkitMaskImage: "linear-gradient(90deg,transparent 0%,#000 10%,#000 90%,transparent 100%)",
            }}>
            <div className="wba-marquee flex items-center gap-6" style={{ width: "max-content" }}>
              {[...TRUST_BRANDS, ...TRUST_BRANDS, ...TRUST_BRANDS].map((b, i) => (
                <div key={i} className="brand-item shrink-0 select-none">
                  {b.img ? (
                    <>
                      <img src={b.img} alt={b.alt} className="brand-logo"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = "none";
                          const fb = e.currentTarget.nextElementSibling as HTMLElement;
                          if (fb) fb.style.display = "block";
                        }} />
                      <span className="brand-text" style={{ display: "none" }}>{b.name}</span>
                    </>
                  ) : (
                    <span className="brand-text">{b.name}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Sec>

        {/* ══ 3. COMPARISON TABLE ══ */}
        <Sec>
          <div className="wba-inner">
            <div className="si text-center mb-8">
              <p style={{ fontSize: "13px", color: "#888", fontFamily: "Inter,sans-serif", marginBottom: "6px" }}>
                A Suitable WhatsApp Business Account is Essential for Growth
              </p>
              <H tag="h2">WhatsApp Business App vs. API Key Differences</H>
            </div>
            <div className="si rounded-2xl overflow-hidden"
              style={{ border: "1px solid rgba(201,150,26,0.15)", background: "hsl(0,0%,5%)" }}>
              <div className="overflow-x-auto">
                <table className="wba-table w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="text-left" style={{ color: "#e8c04a", width: "26%" }}>Feature</th>
                      <th className="text-center" style={{ color: "#888", width: "37%" }}><H tag="h4">WhatsApp Business App</H></th>
                      <th className="text-center" style={{ color: "#e8c04a", width: "37%" }}><H tag="h4">WhatsApp Business API</H></th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON_ROWS.map((row, i) => (
                      <tr key={i}
                        style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent", transition: "background .2s" }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(201,150,26,0.04)")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = i % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent")}>
                        <td>{row.label}</td>
                        <td className="text-center">
                          {row.app === false
                            ? <span className="cmp-no font-bold text-lg">✗</span>
                            : <span style={{ color: "#888", fontSize: "12px" }}>{row.app}</span>}
                        </td>
                        <td className="text-center">
                          {row.api && <span style={{ color: "#a0d8cc", fontSize: "12px" }}>{row.api}</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Sec>

        {/* ══ 4. FEATURES ══ */}
        <Sec>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%,rgba(201,150,26,0.04) 0%,transparent 70%)" }} />
          <div className="wba-inner relative z-10">
            <div className="si text-center mb-8">
              <H tag="h2">Unbeatable WhatsApp API Features to Grow Your Business</H>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
              {ROW1_CARDS.map((f, i) => (
                <Card key={i} className={`si d${i + 1}`}>
                  <FeatImg src={f.img} alt={f.title} icon={f.icon} className="mb-4" />
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(0,184,148,0.12)" }}>
                      <f.icon className="w-4 h-4" style={{ color: "#00b894" }} />
                    </div>
                    <H tag="h3" className="leading-snug" style={{ fontSize: "15px" }}>{f.title}</H>
                  </div>
                  <p style={{ fontSize: "13px", color: "#888", lineHeight: "1.7", fontFamily: "Inter,sans-serif" }}>{f.desc}</p>
                </Card>
              ))}
            </div>

            <div className="mid-feat-container si mb-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="relative overflow-hidden flex items-center justify-center"
                  style={{ background: "hsl(0,0%,5%)", borderRight: "1px solid rgba(201,150,26,0.12)", minHeight: "300px" }}>
                  <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/W20.webp" alt="Build Chatbots"
                    style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                      const fb = e.currentTarget.nextElementSibling as HTMLElement;
                      if (fb) fb.style.display = "flex";
                    }} />
                  <div style={{ display: "none", alignItems: "center", justifyContent: "center", width: "100%", minHeight: "300px", background: "hsl(0,0%,7%)" }}>
                    <Bot className="w-14 h-14" style={{ color: "#c9961a", opacity: 0.25 }} />
                  </div>
                </div>
                <div className="flex flex-col justify-center" style={{ padding: "40px" }}>
                  <div className="mb-4">
                    <H tag="h2" style={{ fontSize: "20px" }}>Build Chatbots with Our No-Code WhatsApp API Tool</H>
                    <span className="new-badge">New ✦</span>
                  </div>
                  <p style={{ fontFamily: "Inter,sans-serif", fontSize: "14px", color: "#a0a0a0", lineHeight: "1.75", marginBottom: "24px" }}>
                    Build and deploy WhatsApp chatbots in minutes no coding required! Automate responses and enhance customer interactions with ease.
                  </p>
                  <ul className="space-y-2 mb-8">
                    {["No-code drag-and-drop flow builder","AI-powered intent detection","Seamless handoff to live agents","Ready-to-use chatbot templates"].map((item, idx2) => (
                      <li key={idx2} className="flex items-center gap-2" style={{ fontSize: "13px", color: "#a0a0a0" }}>
                        <CheckCircle className="w-4 h-4 shrink-0" style={{ color: "#00b894" }} /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {ROW3_CARDS.map((f, i) => (
                <Card key={i} className={`si d${i + 1}`}>
                  <FeatImg src={f.img} alt={f.title} icon={f.icon} className="mb-4" />
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(0,184,148,0.12)" }}>
                      <f.icon className="w-4 h-4" style={{ color: "#00b894" }} />
                    </div>
                    <H tag="h3" className="leading-snug" style={{ fontSize: "15px" }}>{f.title}</H>
                  </div>
                  <p style={{ fontSize: "13px", color: "#888", lineHeight: "1.7", fontFamily: "Inter,sans-serif" }}>{f.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </Sec>

        {/* ══════════════════════════════════════════
            5. TESTIMONIAL
            Desktop: left=content | right=image
            Mobile : image TOP → content BELOW
        ══════════════════════════════════════════ */}
        <Sec>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 55% 40% at 50% 50%,rgba(0,184,148,0.04) 0%,transparent 70%)" }} />
          <div className="wba-inner relative z-10">
            <div className="si rounded-2xl overflow-hidden"
              style={{ background: "hsl(0,0%,6%)", border: "1px solid rgba(201,150,26,0.14)" }}>
              <div className="testi-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                <div className="testi-content p-8 flex flex-col justify-center"
                  style={{ borderRight: "1px solid rgba(201,150,26,0.1)" }}>
                  <span className="testi-quote mb-3">&ldquo;</span>
                  <p style={{ fontFamily: "Libre Baskerville,Georgia,serif", fontSize: "16px", fontStyle: "italic", color: "#c8c8c8", lineHeight: "1.8", marginBottom: "20px" }}>
                    We were able to increase our revenue from the first Diwali to the second Diwali
                    to approximately 4× of what we did and we couldn't have done this without the of Whats App Business Automation help.
                  </p>
                  <div>
                    <p style={{ fontFamily: "Libre Baskerville,Georgia,serif", fontSize: "15px", fontWeight: 700, color: "#e8c04a", marginBottom: "2px" }}>Yash Banage</p>
                    <p style={{ fontFamily: "Inter,sans-serif", fontSize: "12px", color: "#666" }}>Co-founder, Bombay Sweet Shop</p>
                  </div>
                </div>
                <div className="testi-image flex items-center justify-center overflow-hidden"
                  style={{ minHeight: "300px", background: "hsl(0,0%,7%)" }}>
                  <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/W18.webp" alt="Yash Banage"
                    style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                      const fb = e.currentTarget.nextElementSibling as HTMLElement;
                      if (fb) fb.style.display = "flex";
                    }} />
                  <div style={{ display: "none", alignItems: "center", justifyContent: "center", width: "100%", minHeight: "300px", color: "#333", fontSize: "13px", fontFamily: "Inter,sans-serif" }}>
                    Testimonial Image
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Sec>

        {/* ══ 6. SETUP STEPS — YouTube LEFT ══ */}
        <Sec>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 65% 50% at 50% 50%,rgba(201,150,26,0.05) 0%,transparent 70%)" }} />
          <div className="wba-inner relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="si si-left">
                <div className="yt-wrap">
                  <iframe width="560" height="315" src="https://www.youtube.com/embed/BZABGc2DXWk?si=1_Iu0jVn7rrCUC7R" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </div>
              </div>
              <div className="si si-right">
                <p style={{ fontSize: "12px", color: "#666", fontFamily: "Inter,sans-serif", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "6px" }}>Quick Onboarding</p>
                <H tag="h2" className="mb-7">Set Up WhatsApp Business API in 3 Simple Steps</H>
                <div className="space-y-5">
                  {SETUP_STEPS.map((s, i) => (
                    <div key={i} className={`si d${i + 1} flex gap-4 items-start`}>
                      <div className="step-circle">{s.num}</div>
                      <div>
                        <H tag="h4" className="mb-1">{s.title}</H>
                        <p style={{ fontFamily: "Inter,sans-serif", fontSize: "13px", color: "#888", lineHeight: "1.65" }}>{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Sec>

        {/* ══ 7. FAQ ══ */}
        <Sec>
          <div className="wba-inner">
            <div className="si text-center mb-8">
              <H tag="h2">Frequently Asked Questions</H>
            </div>
            <div className="si rounded-2xl p-5 md:p-7"
              style={{ background: "hsl(0,0%,5%)", border: "1px solid rgba(201,150,26,0.12)" }}>
              {FAQS.map((faq, i) => (
                <FaqRow key={i} q={faq.q} a={faq.a} idx={i} />
              ))}
            </div>
          </div>
        </Sec>

      </div>
    <ContactUsForm/>
    </>
  );
};

export default WhatsAppBusinessAPIPage;