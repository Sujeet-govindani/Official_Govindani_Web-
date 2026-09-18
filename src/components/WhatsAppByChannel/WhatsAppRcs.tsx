import React, { useEffect, useRef, useState } from "react";
import {
    Play, Zap, GitBranch, Bot, Users,
    BarChart3, ChevronDown, ChevronUp,
    MessageSquare, Rocket, Check,
    ShoppingCart, Package, HeartPulse, GraduationCap, CircleDollarSign, Globe,
    Phone, Mail, Send
} from "lucide-react";
import ContactUsForm from "@/pages/ContactUsForm";
import SEO from "@/components/SEO";
import { pageSEO } from "@/seo/pageSEO";

interface FaqItem { q: string; a: string; }
interface FeatureCard { icon: React.ElementType; title: string; desc: string; }
interface StepItem { num: string; title: string; desc: string; }

const useScrollFade = () => {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("fv"); }),
            { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
        );
        const el = ref.current;
        if (!el) return;
        el.querySelectorAll(".fs").forEach((node) => observer.observe(node));
        return () => observer.disconnect();
    }, []);
    return ref;
};

const TealIcon = ({ icon: Icon }: { icon: React.ElementType }) => (
    <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
        style={{ background: "rgba(0,184,148,0.15)" }}>
        <Icon className="w-6 h-6" style={{ color: "#00b894" }} />
    </div>
);

const GoldBtn = ({ children, outline = false, onClick, className = "" }: { children: React.ReactNode; outline?: boolean; onClick?: () => void; className?: string }) => (
    <button
        onClick={onClick}
        className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-0.5 ${className}`}
        style={{
            fontSize: "16px",
            ...(outline
                ? { border: "1px solid #c9961a", color: "#d4a827", background: "transparent", boxShadow: "0 0 18px rgba(201,150,26,0.15)" }
                : { background: "linear-gradient(135deg,#c9961a,#e8c04a,#c9961a)", color: "#000", boxShadow: "0 4px 24px rgba(201,150,26,0.3)" }
            )
        }}
    >
        {children}
    </button>
);

const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <section className={`relative overflow-hidden ${className}`} style={{ paddingTop: "clamp(80px, 8vw, 110px)", paddingBottom: "clamp(32px, 4vw, 48px)" }}>
        {children}
    </section>
);

const ShimmerHeading = ({
    children, className = "", tag: Tag = "h2"
}: { children: React.ReactNode; className?: string; tag?: "h1" | "h2" | "h3" }) => (
    <Tag className={`shimmer-heading relative overflow-hidden ${className}`}
        style={{
            fontFamily: "'Baskerville', 'Libre Baskerville', 'Georgia', serif",
            background: "linear-gradient(135deg,#c9961a 0%,#fff 45%,#e8c04a 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text", paddingBottom: "0.15em", display: "inline-block",
        }}>
        {children}
    </Tag>
);

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`relative rounded-2xl p-6 overflow-hidden transition-all duration-400
    hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(201,150,26,0.18)] ${className}`}
        style={{ background: "hsl(0,0%,6%)", border: "1px solid hsl(43,74%,49%,0.14)" }}>
        <div className="shine-sweep absolute inset-0 pointer-events-none rounded-2xl" />
        {children}
    </div>
);

const FaqRow = ({ item, idx }: { item: FaqItem; idx: number }) => {
    const [open, setOpen] = useState(idx === 0);
    return (
        <div className="border-b last:border-0 transition-colors"
            style={{ borderColor: "hsl(43,74%,49%,0.12)" }}>
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between py-5 text-left gap-4 group"
                style={{ fontSize: "16px" }}
            >
                <span className="font-medium transition-colors group-hover:text-yellow-300"
                    style={{ fontFamily: "Inter, sans-serif", color: open ? "#e8c04a" : "#e5e5e5", fontSize: "16px" }}>
                    {`0${idx + 1}. ${item.q}`}
                </span>
                <span className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors"
                    style={{ background: open ? "rgba(201,150,26,0.2)" : "rgba(255,255,255,0.06)" }}>
                    {open ? <ChevronUp className="w-4 h-4 text-yellow-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </span>
            </button>
            {open && (
                <p className="pb-5 leading-relaxed" style={{ color: "#a0a0a0", fontFamily: "Inter, sans-serif", fontSize: "16px" }}>
                    {item.a}
                </p>
            )}
        </div>
    );
};

const BRAND_ITEMS = [
    { name: "Raheja Realty", img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/IM31.webp", alt: "Raheja Realty logo" },
    { name: "AJIO",          img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/IM32.webp", alt: "AJIO logo" },
    { name: "Zoop",          img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/IM33.webp", alt: "Zoop logo" },
    { name: "LAKMÉ",         img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/IM34.webp", alt: "Lakmé logo" },
    { name: "Money Solution",img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/IM35.webp", alt: "Money Solution logo" },
    { name: "IIB",           img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/IM36.webp", alt: "IIB logo" },
    { name: "FOAID",         img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/IM37.webp", alt: "FOAID logo" },
    { name: "steelbazaar",   img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/IM38.webp", alt: "Steelbazaar logo" },
    { name: "eatoes",        img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/IM39.webp", alt: "eatoes logo" },
];

const WHY_FEATURES: FeatureCard[] = [
    { icon: Zap,       title: "Pre-built workflows",      desc: "Leverage personalised, ready-to-use workflow templates for quick turnaround." },
    { icon: GitBranch, title: "Dynamic Flows",            desc: "Customise responses and branches based on customer behaviour." },
    { icon: Bot,       title: "Smart AI-powered Bots",   desc: "All matches customer intent even without exact keywords." },
    { icon: Users,     title: "Agent Handoff",            desc: "Seamlessly transfer chats to a live agent when needed." },
    { icon: BarChart3, title: "Real-time Insights",       desc: "Track chatbot performance and optimise flows." },
];

const STEPS: StepItem[] = [
    { num: "1", title: "Sign up ",           desc: "Create your account and connect your WhatsApp Business number." },
    { num: "2", title: "Pick a Template or Start Fresh",desc: "Choose from ready-to-use flows or design your own." },
    { num: "3", title: "Drag & Drop Elements",          desc: "Add messages, buttons, lists, and conditions." },
    { num: "4", title: "Test Your Flows",               desc: "Preview how it works on WhatsApp before going live." },
    { num: "5", title: "Launch & Automate",             desc: "Publish your bot and start engaging customers instantly." },
];

const FAQS: FaqItem[] = [
    { q: "What is a WhatsApp Chatbot?",                          a: "A WhatsApp chatbot is an AI-powered assistant for businesses that automates chats on WhatsApp." },
    { q: "Can I build a WhatsApp Chatbot without coding?",       a: "Yes! WhatsApp Rcs's no-code builder lets you drag and drop elements to build powerful flows in minutes." },
    { q: "How can a WhatsApp Chatbot improve my customer service?", a: "It can handle FAQs instantly, qualify leads 24/7, route complex queries to human agents." },
    { q: "How long does it take to build a WhatsApp Chatbot?",   a: "With Whats App Rcs pre-built templates you can launch a fully functional bot in under 30 minutes." },
    { q: "Does a WhatsApp Chatbot support multiple languages?",  a: "Yes, Whats App Rcs chatbot supports multi-language conversations to serve your global customer base." },
];

const RCS_TABS = [
    {
        label: "Basic RCS",
        desc: "Branded transactional messages with verified sender identity, delivery, and read receipts. Ideal for OTPs, payment alerts, order updates, and critical notifications.",
        imageSrc: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/RCS3.webp",
        imageAlt: "Basic RCS Preview",
    },
    {
        label: "Rich RCS",
        desc: "Interactive messages with images, carousels, videos, and clear action buttons. Perfect for promotions, product discovery, and driving higher engagement than SMS.",
        imageSrc: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/RCS4.webp",
        imageAlt: "Rich RCS Preview",
    },
    {
        label: "Conversational RCS",
        desc: "Automated two-way conversations with bot flows and seamless agent handover. Enable support, lead qualification, and guided journeys inside the native messaging app.",
        imageSrc: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/RCS5.webp",
        imageAlt: "Conversational RCS Preview",
    },
];

const JOURNEY_ITEMS = [
    {
        label: "Full Branding, Zero Setup Pain",
        subtitle: "Your brand identity, fully brought to life",
        desc: "Deliver messages that look and feel like your app, without any development work.",
        imageSrc: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/RCS6.webp",
        imageAlt: "Full Branding RCS Preview",
    },
    {
        label: "Long-Form Messaging, Without Limits",
        subtitle: "Communicate more clearly in one seamless thread",
        desc: "RCS removes the restrictions of SMS, making space for complete and contextual communication.",
        imageSrc: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/RCS7.webp",
        imageAlt: "Long-Form Messaging Preview",
    },
    {
        label: "Carousels Designed for Product Discovery",
        subtitle: "Showcase multiple offerings in an interactive format",
        desc: "Highlight different products or services through RCS carousels that users can swipe through effortlessly.",
        imageSrc: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/RCS8.webp",
        imageAlt: "Carousel RCS Preview",
    },
    {
        label: "Secure, High-Speed OTP Delivery",
        subtitle: "Frictionless verification inside the messaging inbox",
        desc: "RCS ensures OTPs reach users instantly and reliably, powering fast verification flows for logins, transactions, and account access.",
        imageSrc: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/RCS9.webp",
        imageAlt: "OTP Delivery Preview",
    },
];

const AUDIENCE_CARDS = [
    { icon: ShoppingCart, title: "Retail",      desc: "New launches, offers, abandoned cart." },
    { icon: Package,      title: "D2C",         desc: "Order tracking, COD confirmation, reorders." },
    { icon: HeartPulse,   title: "Healthcare",  desc: "Appointments, reports, reminders." },
    { icon: GraduationCap,title: "Edtech",      desc: "Demo reminders, payment follow-ups." },
    { icon: CircleDollarSign, title: "Fintech", desc: "KYC, statements, alerts." },
    { icon: Globe,        title: "Travel",      desc: "Tickets, itineraries, directions." },
];

const WhatsAppRcs: React.FC = () => {
    const pageRef = useScrollFade();
    const [rcsTab, setRcsTab]         = useState(0);
    const [journeyTab, setJourneyTab] = useState(0);

    const handleContactUs = () => {
        window.location.href = "mailto:hello@interakt.com?subject=RCS%20Inquiry";
    };

    const handleCall = () => {
        window.location.href = "tel:+918012345678";
    };

    return (
        <>
            <SEO {...pageSEO.whatsappRcs} />
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');

        .wcb-root { box-sizing:border-box; font-size:16px; }
        .wcb-root p,.wcb-root span,.wcb-root li,
        .wcb-root td,.wcb-root th,.wcb-root a,
        .wcb-root input,.wcb-root label { font-size:16px; }
        .wcb-root button { font-size:16px; }
        
        /* Responsive typography */
        .wcb-root .text-xs   { font-size:13px !important; }
        .wcb-root .text-sm   { font-size:14px !important; }
        .wcb-root .text-base { font-size:16px !important; }
        .wcb-root .text-lg   { font-size:16px !important; }
        .wcb-root h4,.wcb-root .text-xl  { font-size:18px !important; line-height:1.4; }
        .wcb-root h3,.wcb-root .text-2xl { font-size:22px !important; line-height:1.35; }
        .wcb-root h2,.wcb-root .text-3xl { font-size:28px !important; line-height:1.25; }
        .wcb-root .text-4xl { font-size:34px !important; line-height:1.2; }
        .wcb-root .text-5xl { font-size:42px !important; line-height:1.15; }
        .wcb-root h1,.wcb-root .text-6xl { font-size:52px !important; line-height:1.1; }

        @media (max-width:767px) {
          .wcb-root h1,.wcb-root .text-6xl { font-size:32px !important; line-height:1.2; }
          .wcb-root h2,.wcb-root .text-5xl,.wcb-root .text-4xl,.wcb-root .text-3xl { font-size:24px !important; line-height:1.3; }
          .wcb-root h3,.wcb-root .text-2xl,.wcb-root .text-xl { font-size:20px !important; line-height:1.4; }
          .wcb-root .container.px-6 { padding-left: 1rem !important; padding-right: 1rem !important; }
        }

        .fs { opacity:0; transform:translateY(32px); transition:opacity .7s ease,transform .7s ease; }
        .fs.fv { opacity:1; transform:translateY(0); }
        .fs.fv.d1 { transition-delay:.1s; }
        .fs.fv.d2 { transition-delay:.2s; }
        .fs.fv.d3 { transition-delay:.3s; }
        .fs.fv.d4 { transition-delay:.4s; }
        .fs.fv.d5 { transition-delay:.5s; }

        .shimmer-heading::after {
          content:''; position:absolute; top:0; left:-70%;
          width:50%; height:100%;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent);
          animation:shimmerSweep 3.5s ease-in-out infinite; pointer-events:none;
        }
        @keyframes shimmerSweep { 0%{left:-70%} 100%{left:130%} }

        .shine-sweep {
          background:linear-gradient(120deg,transparent 30%,rgba(255,255,255,0.04) 50%,transparent 70%);
          transform:translateX(-100%); transition:transform .6s ease;
        }
        *:hover > .shine-sweep { transform:translateX(100%); }

        .marquee-track { animation:marqueeRTL 28s linear infinite; }
        .marquee-track:hover { animation-play-state:paused; }
        @keyframes marqueeRTL { 0%{transform:translateX(0)} 100%{transform:translateX(calc(-100% / 3))} }

        .brand-logo-wrap { position:relative; transition:transform 0.35s ease; }
        .brand-logo-wrap::before {
          content:''; position:absolute; inset:-8px -14px; border-radius:12px;
          background:radial-gradient(ellipse 80% 70% at 50% 50%,rgba(201,150,26,0) 0%,rgba(201,150,26,0) 100%);
          filter:blur(10px); opacity:0;
          transition:opacity 0.4s ease,background 0.4s ease; pointer-events:none; z-index:0;
        }
        .brand-logo-wrap:hover::before {
          background:radial-gradient(ellipse 80% 70% at 50% 50%,rgba(201,150,26,0.22) 0%,rgba(201,150,26,0.06) 60%,transparent 100%);
          opacity:1;
        }
        .brand-logo-wrap:hover { transform:scale(1.07); }
        .brand-logo-wrap img,.brand-logo-wrap .brand-text { position:relative; z-index:1; }

        /* RCS Stats Box - Responsive */
        .rcs-stats-box {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border: 2px solid rgba(0,184,148,0.6);
          border-radius: 16px;
          overflow: visible;
          background: transparent;
          position: relative;
        }
        .rcs-stat-item {
          padding: 28px 24px;
          text-align: center;
          position: relative;
        }
        .rcs-stat-item:not(:last-child)::after {
          content: '';
          position: absolute;
          right: 0; top: 15%; bottom: 15%;
          width: 1px;
          background: repeating-linear-gradient(
            to bottom,
            rgba(0,184,148,0.5) 0px,
            rgba(0,184,148,0.5) 6px,
            transparent 6px,
            transparent 12px
          );
          animation: dashScroll 1.5s linear infinite;
        }
        @keyframes dashScroll {
          0%   { background-position: 0 0; }
          100% { background-position: 0 24px; }
        }
        @media (max-width: 768px) {
          .rcs-stats-box { grid-template-columns: 1fr; gap: 20px; }
          .rcs-stat-item:not(:last-child)::after {
            top: auto; bottom: 0; left: 15%; right: 15%;
            width: auto; height: 1px;
            background: repeating-linear-gradient(
              to right,
              rgba(0,184,148,0.5) 0px,
              rgba(0,184,148,0.5) 6px,
              transparent 6px,
              transparent 12px
            );
            animation: dashScrollH 1.5s linear infinite;
          }
          @keyframes dashScrollH {
            0%   { background-position: 0 0; }
            100% { background-position: 24px 0; }
          }
        }

        /* Tab Buttons - Responsive */
        .rcs-tab-btn {
          padding: 10px 28px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          font-family: Inter, sans-serif;
          cursor: pointer;
          border: none;
          transition: all 0.25s ease;
          background: transparent;
          color: #555;
        }
        .rcs-tab-btn.active {
          background: linear-gradient(135deg,#3bba8c,#00d4a8);
          color: #000;
          box-shadow: 0 4px 16px rgba(0,184,148,0.35);
        }
        @media (max-width: 640px) {
          .rcs-tab-btn { padding: 8px 16px; font-size: 14px; }
        }

        .rcs-tab-panel {
          border: 1px solid rgba(201,150,26,0.14);
          border-radius: 20px;
          background: hsl(0,0%,7%);
          overflow: hidden;
        }

        .journey-item {
          padding: 18px 0;
          border-bottom: 1px dashed rgba(201,150,26,0.2);
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .journey-item:last-child { border-bottom: none; }
        .journey-item-label {
          font-size: 18px;
          font-family: "'Libre Baskerville', Georgia, serif";
          font-weight: 600;
          transition: color 0.25s ease;
          color: #555;
        }
        .journey-item.active .journey-item-label { color: #00b894; }
        .journey-item-bar {
          width: 4px;
          border-radius: 2px;
          align-self: stretch;
          flex-shrink: 0;
          background: transparent;
          transition: background 0.25s ease;
        }
        .journey-item.active .journey-item-bar { background: #00b894; }

        .audience-card {
          border-radius: 16px;
          padding: 28px 24px;
          background: hsl(0,0%,6%);
          border: 1px solid rgba(201,150,26,0.12);
          transition: all 0.3s ease;
          text-align: center;
        }
        .audience-card:hover {
          border-color: rgba(201,150,26,0.3);
          transform: translateY(-4px);
          box-shadow: 0 8px 32px rgba(201,150,26,0.12);
        }
        .audience-icon-wrap {
          width: 56px; height: 56px;
          border-radius: 50%;
          background: rgba(0,184,148,0.12);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 16px;
          margin-left: auto;
          margin-right: auto;
        }

        /* Responsive Grids */
        @media (max-width: 768px) {
          .rcs-tab-panel-inner { flex-direction: column !important; }
          .journey-panel-inner { flex-direction: column !important; }
          .audience-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .why-brands-grid { grid-template-columns: 1fr !important; }
          .google-recognition-grid { grid-template-columns: 1fr !important; gap: 30px !important; text-align: center; }
        }
        @media (max-width: 480px) {
          .audience-grid { grid-template-columns: 1fr !important; }
          .rcs-tab-btn { padding: 8px 12px; font-size: 12px; }
        }

        .contact-btn-mobile {
          width: 100%;
          justify-content: center;
        }
        @media (max-width: 640px) {
          .contact-btn-mobile { width: 100%; }
        }
      `}</style>

            <div ref={pageRef} className="wcb-root min-h-screen"
                style={{ background: "#000", fontFamily: "Inter, sans-serif", color: "#e5e5e5", fontSize: "16px" }}>

                {/* ════════ 1. HERO ════════ */}
                <Section>
                    <div className="absolute inset-0 pointer-events-none"
                        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%,rgba(201,150,26,0.07) 0%,transparent 70%)" }} />
                    <div className="container mx-auto px-6 relative z-10" style={{ paddingTop: "100px" }}>
                        <div className="fs text-center max-w-4xl mx-auto">
                            <ShimmerHeading tag="h1" className="leading-tight mb-6">
                                Maximize WhatsApp Message
                                deliveries with RCS Fallback
                            </ShimmerHeading>
                            <p className="max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: "#a0a0a0", fontSize: "16px" }}>
                               Never lose customers to failed WhatsApp messages. Whats App now automatically switches to RCS for seamless message delivery with rich, interactive experiences built into the SMS inbox.
                            </p>
                        </div>
                        <div className="fs d2 mt-14 w-full max-w-5xl mx-auto">
                            <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/RCS1.webp" alt="WhatsApp Chatbot dashboard"
                                className="w-full h-auto rounded-2xl" style={{ display: "block" }} />
                        </div>
                    </div>
                </Section>

                {/* ════════ 2. TRUST MARQUEE ════════ */}
                <section className="relative py-8 overflow-hidden"
                    style={{ borderTop: "1px solid rgba(201,150,26,0.08)", borderBottom: "1px solid rgba(201,150,26,0.08)" }}>
                    <div className="text-center mb-5 fs">
                        <p className="font-semibold tracking-[0.25em] uppercase" style={{ color: "#555", fontSize: "16px" }}>
                            50,000+ Businesses Across the Globe Trust 
                        </p>
                    </div>
                    <div className="relative overflow-hidden"
                        style={{
                            maskImage: "linear-gradient(90deg,transparent 0%,#000 10%,#000 90%,transparent 100%)",
                            WebkitMaskImage: "linear-gradient(90deg,transparent 0%,#000 10%,#000 90%,transparent 100%)"
                        }}>
                        <div className="marquee-track flex items-center gap-16" style={{ width: "max-content" }}>
                            {[...BRAND_ITEMS, ...BRAND_ITEMS, ...BRAND_ITEMS].map((b, i) => (
                                <div key={i} className="flex items-center shrink-0 cursor-default select-none">
                                    {b.img ? (
                                        <div className="brand-logo-wrap flex items-center justify-center"
                                            style={{ height: "38px", maxWidth: "130px", padding: "0 4px" }}>
                                            <img src={b.img} alt={b.alt} className="h-full w-auto object-contain"
                                                style={{ filter: "grayscale(100%) brightness(0.4)", transition: "filter 0.35s ease" }}
                                                onMouseEnter={e => (e.currentTarget.style.filter = "grayscale(0%) brightness(1.1) drop-shadow(0 0 8px rgba(201,150,26,0.6))")}
                                                onMouseLeave={e => (e.currentTarget.style.filter = "grayscale(100%) brightness(0.4)")} />
                                        </div>
                                    ) : (
                                        <div className="brand-logo-wrap flex items-center justify-center" style={{ padding: "6px 10px" }}>
                                            <span className="brand-text font-bold whitespace-nowrap"
                                                style={{ fontSize: "16px", color: "#3a3a3a", letterSpacing: "0.08em", transition: "color 0.35s ease,text-shadow 0.35s ease" }}
                                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#c9961a"; (e.currentTarget as HTMLElement).style.textShadow = "0 0 20px rgba(201,150,26,0.5)"; }}
                                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#3a3a3a"; (e.currentTarget as HTMLElement).style.textShadow = "none"; }}>
                                                {b.name}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ════════ 3. WHY RCS MATTERS RIGHT NOW ════════ */}
                <Section>
                    <div className="absolute inset-0 pointer-events-none"
                        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%,rgba(0,184,148,0.04) 0%,transparent 70%)" }} />
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="max-w-4xl mx-auto text-center">
                            <div className="fs">
                                <ShimmerHeading className="mb-5">Why RCS Matters Right Now</ShimmerHeading>
                            </div>

                            <div className="fs d1 rcs-stats-box mx-auto mb-4">
                                <div className="rcs-stat-item">
                                    <div style={{
                                        fontFamily: "Inter, sans-serif",
                                        fontSize: "clamp(32px, 6vw, 64px)",
                                        fontWeight: 800,
                                        color: "#e5e5e5",
                                        lineHeight: 1.05,
                                        marginBottom: "14px",
                                        letterSpacing: "-1px",
                                    }}>6B+</div>
                                    <p style={{ color: "#999", fontSize: "15px", lineHeight: 1.55, margin: 0, textAlign: "center" }}>
                                        RCS-capable users<br />worldwide
                                    </p>
                                </div>

                                <div className="rcs-stat-item">
                                    <div style={{
                                        fontFamily: "Inter, sans-serif",
                                        fontSize: "clamp(32px, 6vw, 64px)",
                                        fontWeight: 800,
                                        color: "#e5e5e5",
                                        lineHeight: 1.05,
                                        marginBottom: "14px",
                                        letterSpacing: "-1px",
                                    }}>90%+</div>
                                    <p style={{ color: "#999", fontSize: "15px", lineHeight: 1.55, margin: 0, textAlign: "center" }}>
                                        Android penetration in<br />India
                                    </p>
                                </div>

                                <div className="rcs-stat-item">
                                    <div style={{
                                        fontFamily: "Inter, sans-serif",
                                        fontSize: "clamp(32px, 6vw, 64px)",
                                        fontWeight: 800,
                                        color: "#e5e5e5",
                                        lineHeight: 1.05,
                                        marginBottom: "14px",
                                        letterSpacing: "-1px",
                                    }}>10X</div>
                                    <p style={{ color: "#999", fontSize: "15px", lineHeight: 1.55, margin: 0, textAlign: "center" }}>
                                        better engagement vs<br />SMS
                                    </p>
                                </div>
                            </div>

                            <div className="fs d2 mx-auto">
                                <div style={{
                                    background: "rgba(0,184,148,0.22)",
                                    border: "1.5px solid rgba(0,184,148,0.5)",
                                    borderRadius: "12px",
                                    padding: "18px 32px",
                                    textAlign: "center",
                                    width: "100%",
                                }}>
                                    <span style={{
                                        fontFamily: "Inter, sans-serif",
                                        fontSize: "17px",
                                        fontWeight: 700,
                                        color: "#00d4a8",
                                        letterSpacing: "0.01em",
                                    }}>
                                        Looks like WhatsApp, delivers like SMS
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* ════════ CHANNEL FALLBACKS ════════ */}
                <Section>
                    <div className="absolute inset-0 pointer-events-none"
                        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%,#000 0%,transparent 70%)" }} />
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="fs text-center max-w-4xl mx-auto">
                            <ShimmerHeading tag="h1" className="leading-tight mb-4">
                                Whats App RCS's Biggest Advantage: Channel Fallbacks
                            </ShimmerHeading>
                            <p className="max-w-2xl mx-auto mb-6 leading-relaxed" style={{ color: "#a0a0a0", fontSize: "16px" }}>
                               Never lose customers to failed WhatsApp messages. Whats App now automatically switches to RCS for seamless message delivery with rich, interactive experiences built into the SMS inbox.
                            </p>
                        </div>
                        <div className="fs d2 mt-6 w-full max-w-5xl mx-auto">
                            <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/RCS2.webp" alt="Channel Fallbacks"
                                className="w-full h-auto rounded-2xl" style={{ display: "block" }} />
                        </div>
                    </div>
                </Section>

                {/* ════════ 4. TYPES OF RCS MESSAGING ════════ */}
                <Section>
                    <div className="absolute inset-0 pointer-events-none"
                        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%,rgba(0,184,148,0.04) 0%,transparent 70%)" }} />
                    <div className="container mx-auto px-6 relative z-10">

                        <div className="fs text-center mb-8">
                            <ShimmerHeading className="mb-2">Types of RCS Messaging Powered by Whats App Rcs</ShimmerHeading>
                        </div>

                        <div className="fs d1 flex items-center justify-center gap-3 flex-wrap mb-8">
                            {RCS_TABS.map((tab, i) => (
                                <button
                                    key={i}
                                    onClick={() => setRcsTab(i)}
                                    className={`rcs-tab-btn ${rcsTab === i ? "active" : ""}`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        <div className="fs d2 max-w-5xl mx-auto rcs-tab-panel">
                            <div className="rcs-tab-panel-inner flex flex-col md:flex-row items-stretch" style={{ minHeight: "340px" }}>

                                <div className="flex-1 p-6 md:p-10 flex flex-col justify-center" style={{ minWidth: 0 }}>
                                    <p style={{ color: "#b0b0b0", fontSize: "16px", lineHeight: 1.85, margin: 0 }}>
                                        {RCS_TABS[rcsTab].desc}
                                    </p>
                                </div>

                                <div className="hidden md:block w-px flex-shrink-0" style={{ background: "rgba(201,150,26,0.12)" }} />

                                <div className="flex-1 p-4 flex items-center justify-center" style={{ minWidth: 0 }}>
                                    {RCS_TABS[rcsTab].imageSrc ? (
                                        <img
                                            src={RCS_TABS[rcsTab].imageSrc}
                                            alt={RCS_TABS[rcsTab].imageAlt}
                                            style={{ width: "100%", maxWidth: "380px", height: "auto", display: "block", borderRadius: "12px" }}
                                        />
                                    ) : (
                                        <div style={{
                                            maxWidth: "380px", width: "100%", aspectRatio: "4/3",
                                            borderRadius: "12px", border: "1px dashed rgba(201,150,26,0.2)",
                                            display: "flex", flexDirection: "column",
                                            alignItems: "center", justifyContent: "center", gap: "8px",
                                        }}>
                                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(201,150,26,0.35)" strokeWidth="1.5">
                                                <rect x="3" y="3" width="18" height="18" rx="2" />
                                                <circle cx="8.5" cy="8.5" r="1.5" fill="rgba(201,150,26,0.35)" stroke="none" />
                                                <polyline points="21,15 16,10 5,21" />
                                            </svg>
                                            <span style={{ color: "rgba(201,150,26,0.35)", fontSize: "12px", fontFamily: "Inter,sans-serif" }}>{RCS_TABS[rcsTab].imageAlt}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* ════════ 5. POWER HIGH-INTENT JOURNEYS ════════ */}
                <Section>
                    <div className="absolute inset-0 pointer-events-none"
                        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%,rgba(201,150,26,0.03) 0%,transparent 70%)" }} />
                    <div className="container mx-auto px-6 relative z-10">

                        <div className="fs text-center mb-3">
                            <ShimmerHeading className="mb-2">Power High-Intent Journeys Using RCS</ShimmerHeading>
                        </div>
                        <div className="fs d1 text-center mb-10">
                            <p style={{ color: "#666", fontSize: "16px" }}>RCS helps brands use the messaging inbox as an interactive, branded surface</p>
                        </div>

                        <div className="fs d2 max-w-5xl mx-auto journey-panel-inner flex flex-col md:flex-row gap-10 items-start">

                            <div style={{ flex: "0 0 45%", minWidth: 0, width: "100%" }}>
                                {JOURNEY_ITEMS.map((item, i) => (
                                    <div
                                        key={i}
                                        className={`journey-item ${journeyTab === i ? "active" : ""}`}
                                        onClick={() => setJourneyTab(i)}
                                    >
                                        <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                                            <div className="journey-item-bar" style={{ marginTop: "4px", minHeight: "24px" }} />
                                            <div style={{ flex: 1 }}>
                                                <div className="journey-item-label" style={{
                                                    fontFamily: "'Libre Baskerville',Georgia,serif",
                                                    fontSize: "18px",
                                                    fontWeight: 600,
                                                    color: journeyTab === i ? "#00b894" : "#555",
                                                    transition: "color 0.25s ease",
                                                }}>
                                                    {item.label}
                                                </div>

                                                {journeyTab === i && (
                                                    <div style={{ marginTop: "10px", animation: "none" }}>
                                                        <p style={{ fontFamily: "'Libre Baskerville',Georgia,serif", fontWeight: 700, fontSize: "15px", color: "#e5e5e5", marginBottom: "8px", fontStyle: "italic" }}>
                                                            {item.subtitle}
                                                        </p>
                                                        <p style={{ color: "#888", fontSize: "15px", lineHeight: 1.75, margin: 0 }}>
                                                            {item.desc}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div style={{ flex: 1, minWidth: 0, width: "100%" }}>
                                {JOURNEY_ITEMS[journeyTab].imageSrc ? (
                                    <img
                                        src={JOURNEY_ITEMS[journeyTab].imageSrc}
                                        alt={JOURNEY_ITEMS[journeyTab].imageAlt}
                                        className="w-full rounded-2xl"
                                        style={{ height: "auto", display: "block" }}
                                    />
                                ) : (
                                    <div style={{
                                        aspectRatio: "4/3", borderRadius: "16px",
                                        border: "1px dashed rgba(201,150,26,0.2)",
                                        display: "flex", flexDirection: "column",
                                        alignItems: "center", justifyContent: "center", gap: "8px",
                                    }}>
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(201,150,26,0.35)" strokeWidth="1.5">
                                            <rect x="3" y="3" width="18" height="18" rx="2" />
                                            <circle cx="8.5" cy="8.5" r="1.5" fill="rgba(201,150,26,0.35)" stroke="none" />
                                            <polyline points="21,15 16,10 5,21" />
                                        </svg>
                                        <span style={{ color: "rgba(201,150,26,0.35)", fontSize: "12px", fontFamily: "Inter,sans-serif" }}>
                                            {JOURNEY_ITEMS[journeyTab].imageAlt}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Section>

                {/* ════════ 6. TARGET AUDIENCES ════════ */}
                <Section>
                    <div className="absolute inset-0 pointer-events-none"
                        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%,rgba(0,184,148,0.03) 0%,transparent 70%)" }} />
                    <div className="container mx-auto px-6 relative z-10">

                        <div className="fs text-center mb-3">
                            <ShimmerHeading className="mb-2">Target Audiences You Can Reach at Scale</ShimmerHeading>
                        </div>
                        <div className="fs d1 text-center mb-10">
                            <p style={{ color: "#666", fontSize: "16px" }}>Whats App RCS gives you access to curated, high-intent cohorts across industries.</p>
                        </div>

                        <div className="fs d2 audience-grid max-w-5xl mx-auto"
                            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
                            {AUDIENCE_CARDS.map((card, i) => (
                                <div key={i} className="audience-card">
                                    <div className="audience-icon-wrap">
                                        <card.icon size={24} color="#00b894" strokeWidth={1.8} />
                                    </div>
                                    <h3 style={{ fontFamily: "'Libre Baskerville',Georgia,serif", fontSize: "18px", fontWeight: 700, color: "#e5e5e5", marginBottom: "10px" }}>
                                        {card.title}
                                    </h3>
                                    <p style={{ color: "#777", fontSize: "15px", lineHeight: 1.65, margin: 0 }}>
                                        {card.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Section>

                {/* ════════ 7. PRICING ════════ */}
                <Section>
                    <div className="absolute inset-0 pointer-events-none"
                        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%,rgba(0,184,148,0.05) 0%,transparent 70%)" }} />
                    <div className="container mx-auto px-6 relative z-10 text-center">

                        <div className="fs mb-10">
                            <ShimmerHeading className="mb-2">Pay Only For Delivered<br />Messages. No Setup Cost.</ShimmerHeading>
                        </div>

                        <div className="fs d1 mx-auto" style={{ maxWidth: "560px", position: "relative" }}>
                            <svg viewBox="0 0 560 28" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%" }}>
                                <path d="M0,28 L0,14 L20,28 L40,14 L60,28 L80,14 L100,28 L120,14 L140,28 L160,14 L180,28 L200,14 L220,28 L240,14 L260,28 L280,14 L300,28 L320,14 L340,28 L360,14 L380,28 L400,14 L420,28 L440,14 L460,28 L480,14 L500,28 L520,14 L540,28 L560,14 L560,28 Z" fill="#00b894" />
                            </svg>

                            <div style={{
                                background: "#00b894",
                                padding: "20px 24px",
                                position: "relative",
                            }}>
                                <div style={{
                                    border: "2px dashed rgba(255,255,255,0.45)",
                                    borderRadius: "10px",
                                    padding: "20px 24px",
                                    display: "inline-block",
                                    width: "100%",
                                }}>
                                    <p style={{ color: "#fff", fontWeight: 700, fontSize: "18px", marginBottom: "14px", fontFamily: "Inter, sans-serif" }}>
                                        Rich Communication Services
                                    </p>
                                    {[
                                        { label: "Basic",        price: "00.14 INR" },
                                        { label: "Rich",         price: "00.20 INR" },
                                        { label: "Conversation", price: "00.25 INR" },
                                    ].map((row) => (
                                        <p key={row.label} style={{ color: "rgba(255,255,255,0.9)", fontSize: "16px", margin: "6px 0", fontFamily: "Inter, sans-serif" }}>
                                            {row.label} - <strong style={{ color: "#fff", fontSize: "18px" }}>{row.price}</strong>
                                        </p>
                                    ))}
                                </div>
                            </div>

                            <svg viewBox="0 0 560 28" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%", transform: "rotate(180deg)" }}>
                                <path d="M0,28 L0,14 L20,28 L40,14 L60,28 L80,14 L100,28 L120,14 L140,28 L160,14 L180,28 L200,14 L220,28 L240,14 L260,28 L280,14 L300,28 L320,14 L340,28 L360,14 L380,28 L400,14 L420,28 L440,14 L460,28 L480,14 L500,28 L520,14 L540,28 L560,14 L560,28 Z" fill="#00b894" />
                            </svg>
                        </div>

                        <div className="fs d2 mt-6">
                            <p style={{ color: "#666", fontSize: "16px", marginBottom: "24px" }}>
                                Available only on Advanced &amp; Enterprise Plans.
                            </p>
                            <button
                                onClick={handleContactUs}
                                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-0.5"
                                style={{ background: "#006b54", color: "#fff", fontSize: "16px", border: "none", cursor: "pointer", boxShadow: "0 4px 20px rgba(0,107,84,0.4)" }}
                            >
                                Contact Us →
                            </button>
                        </div>
                    </div>
                </Section>

                {/* ════════ 8. WHY BRANDS CHOOSE ════════ */}
                <Section>
                    <div className="absolute inset-0 pointer-events-none"
                        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%,rgba(0,184,148,0.03) 0%,transparent 70%)" }} />
                    <div className="container mx-auto px-6 relative z-10">

                        <div className="fs text-center mb-3">
                            <ShimmerHeading className="mb-2">Why Brands Choose Whats App for RCS</ShimmerHeading>
                        </div>
                        <div className="fs d1 text-center mb-10">
                            <p style={{ color: "#666", fontSize: "16px" }}>Whats App doesn't just support RCS, it elevates it.</p>
                        </div>

                        <div className="fs d2 why-brands-grid max-w-5xl mx-auto" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "16px" }}>
                            {[
                                {
                                    icon: "⚙️",
                                    title: "RCS API for End-to-End Automation",
                                    intro: "Send triggered messages through:",
                                    bullets: ["Signups", "Purchases", "Abandoned carts", "Renewals"],
                                },
                                {
                                    icon: "🎯",
                                    title: "Advanced Targeting & Cohort Reach",
                                    intro: "Use:",
                                    bullets: ["Your own data dump", "Whats App RCS's proprietary high-intent cohorts", "Behavior-based & interest-based segments"],
                                },
                                {
                                    icon: "⚡",
                                    title: "Lightning Fast Delivery",
                                    intro: null,
                                    bullets: ["Critical messages reach users instantly, ensuring optimal customer experience."],
                                },
                                {
                                    icon: "📊",
                                    title: "Unified Dashboard",
                                    intro: "Analyze performance across:",
                                    bullets: ["RCS | WhatsApp | Instagram | Email", "All in one place."],
                                },
                            ].map((card, i) => (
                                <div key={i} className="fs" style={{
                                    background: "hsl(0,0%,7%)",
                                    border: "1px solid rgba(0,184,148,0.14)",
                                    borderRadius: "16px",
                                    padding: "28px 28px 32px",
                                    transition: "border-color 0.3s,transform 0.3s,box-shadow 0.3s",
                                }}
                                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,184,148,0.4)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(0,184,148,0.1)"; }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,184,148,0.14)"; (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                                >
                                    <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "rgba(0,184,148,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "18px", fontSize: "22px" }}>
                                        {card.icon}
                                    </div>
                                    <h3 style={{ fontFamily: "'Libre Baskerville',Georgia,serif", fontSize: "18px", fontWeight: 700, color: "#e5e5e5", marginBottom: "12px", lineHeight: 1.35 }}>
                                        {card.title}
                                    </h3>
                                    {card.intro && (
                                        <p style={{ color: "#888", fontSize: "15px", marginBottom: "8px" }}>{card.intro}</p>
                                    )}
                                    <ul style={{ paddingLeft: "18px", margin: 0 }}>
                                        {card.bullets.map((b, j) => (
                                            <li key={j} style={{ color: "#888", fontSize: "15px", lineHeight: 1.7, marginBottom: "2px" }}>{b}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </Section>

                {/* ════════ 9. RECOGNIZED BY GOOGLE ════════ */}
                <Section>
                    <div className="absolute inset-0 pointer-events-none"
                        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%,rgba(0,184,148,0.04) 0%,transparent 70%)" }} />
                    <div className="container mx-auto px-6 relative z-10">

                        <div className="fs text-center mb-10">
                            <ShimmerHeading className="mb-2">Recognized by Google.<br />Trusted by thousands.</ShimmerHeading>
                        </div>

                        <div
                            className="fs d1 google-recognition-grid max-w-5xl mx-auto"
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(3, 1fr)",
                                gap: "20px",
                                alignItems: "center",
                            }}
                        >
                            <div>
                                <img
                                    src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/RCS9.webp"
                                    alt="Google RCS Innovation Award"
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                        aspectRatio: "4/3",
                                        objectFit: "cover",
                                        borderRadius: "16px",
                                        display: "block",
                                    }}
                                />
                                <p style={{
                                    color: "#00b894",
                                    fontSize: "18px",
                                    fontWeight: 700,
                                    fontFamily: "'Libre Baskerville',Georgia,serif",
                                    lineHeight: 1.35,
                                    marginTop: "14px",
                                    marginBottom: 0,
                                }}>
                                    Google RCS Innovation Award
                                </p>
                            </div>

                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                                <img
                                    src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/RCS11.webp"
                                    alt="Google Badge"
                                    style={{
                                        width: "100%",
                                        maxWidth: "340px",
                                        height: "auto",
                                        display: "block",
                                        objectFit: "contain",
                                    }}
                                />
                            </div>

                            <div>
                                <p style={{
                                    color: "#00b894",
                                    fontSize: "16px",
                                    fontWeight: 700,
                                    fontFamily: "'Libre Baskerville',Georgia,serif",
                                    marginBottom: "10px",
                                    marginTop: 0,
                                }}>
                                    Google RCS Partner
                                </p>
                                <img
                                    src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/RCS10.webp"
                                    alt="Google RCS Partner"
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                        aspectRatio: "4/3",
                                        objectFit: "cover",
                                        borderRadius: "16px",
                                        display: "block",
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </Section>

              <ContactUsForm/>

            </div>
        </>
    );
};

export default WhatsAppRcs;