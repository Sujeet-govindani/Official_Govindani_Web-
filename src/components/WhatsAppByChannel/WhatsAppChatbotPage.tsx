import React, { useEffect, useRef, useState } from "react";
import {
    Play, Zap, GitBranch, Bot, Users,
    BarChart3, ChevronDown, ChevronUp,
    MessageSquare, Rocket, Check
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

const GoldBtn = ({ children, outline = false }: { children: React.ReactNode; outline?: boolean }) => (
    <button
        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-0.5"
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

/* ── Section: tighter padding ── */
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
    { num: "1", title: "Sign up",                       desc: "Create your account and connect your WhatsApp Business number." },
    { num: "2", title: "Pick a Template or Start Fresh",desc: "Choose from ready-to-use flows or design your own." },
    { num: "3", title: "Drag & Drop Elements",          desc: "Add messages, buttons, lists, and conditions." },
    { num: "4", title: "Test Your Flows",               desc: "Preview how it works on WhatsApp before going live." },
    { num: "5", title: "Launch & Automate",             desc: "Publish your bot and start engaging customers instantly." },
];

const FAQS: FaqItem[] = [
    { q: "What is a WhatsApp Chatbot?",                          a: "A WhatsApp chatbot is an AI-powered tool for business that automates chats on WhatsApp. See real WhatsApp chatbot examples in action daily." },
    { q: "Can I build a WhatsApp Chatbot without coding?",       a: "Yes, you can create a WhatsApp chatbot using no-code platforms. It's easy, fast, and cost-effective even for small businesses." },
    { q: "How can a WhatsApp Chatbot improve my customer service?", a: "WhatsApp chatbot AI replies instantly, reduces wait time, and handles FAQs making it ideal for business support and lead generation." },
    { q: "How long does it take to build a WhatsApp Chatbot?",   a: "You can create a WhatsApp chatbot in hours using templates. Advanced bots take longer, depending on features and WhatsApp chatbot pricing." },
    { q: "Does a WhatsApp Chatbot support multiple languages?",  a: "Yes, most WhatsApp chatbots for business support multiple languages using AI, perfect for global brands serving diverse customers." },
];

const SLIDER_CARDS = [
    { image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/chatbot1.webp",  title: "Instant Query Resolution",             desc: "Reply instantly to customers with automated, AI-assisted conversations." },
    { image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/F2.png",   title: "Offer a 24×7 personalised experience", desc: "AI-generated personalized workflows + commerce integrations help you deliver contextual conversations." },
    { image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/F3.webp",  title: "AI-Powered Scalable Conversations",    desc: "Handle thousands of chats simultaneously as AI routes, detects intent, and responds instantly." },
    { image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/F4.webp",  title: "Intuitive Interface",                  desc: "Let your chatbot handle routine questions, order updates, and lead qualification." },
    { image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/chatbot2.webp",  title: "Made for Business Teams",              desc: "From marketers to support agents, anyone can build this no-code Chatbot for WhatsApp." },
    { image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/chatbot3.webp",  title: "Improve conversions",                  desc: "AI-driven flows and intent detection ensure customers reach the right journey." },
];

const WhatsAppChatbotPage: React.FC = () => {
    const pageRef = useScrollFade();
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        const t = setInterval(() => setActiveSlide((p) => (p + 1) % SLIDER_CARDS.length), 4000);
        return () => clearInterval(t);
    }, []);

    return (
        <>
            <SEO {...pageSEO.whatsappChatbot} />
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');

        .wcb-root { box-sizing:border-box; font-size:16px; }

        /* All three slides stay in the DOM so the prerendered HTML is identical
           no matter which slide the capture happened to catch. Only the parent
           class differs between server and client, which React hydrates without
           the text/structure mismatch that threw #418/#425/#423 here. It also
           puts all three slides' copy in the HTML instead of just one. */
        .wcb-root .wcb-slide { display:none; }
        .wcb-root .wcb-slides.slide-0 .wcb-slide:nth-child(1),
        .wcb-root .wcb-slides.slide-1 .wcb-slide:nth-child(2),
        .wcb-root .wcb-slides.slide-2 .wcb-slide:nth-child(3) { display:grid; }
        .wcb-root p,.wcb-root span,.wcb-root li,
        .wcb-root td,.wcb-root th,.wcb-root a,
        .wcb-root input,.wcb-root label { font-size:16px; }
        .wcb-root button { font-size:16px; }
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
        .wcb-root .text-7xl { font-size:60px !important; line-height:1.05; }

        @media (max-width:767px) {
          .wcb-root h1,.wcb-root .text-6xl,.wcb-root .text-7xl { font-size:32px !important; line-height:1.2; }
          .wcb-root h2,.wcb-root .text-5xl,.wcb-root .text-4xl,.wcb-root .text-3xl { font-size:22px !important; line-height:1.3; }
          .wcb-root h3,.wcb-root .text-2xl,.wcb-root .text-xl { font-size:18px !important; line-height:1.4; }
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

        .dot { width:8px; height:8px; border-radius:50%; background:rgba(255,255,255,0.25); transition:all .3s; cursor:pointer; }
        .dot.active { width:24px; border-radius:4px; background:linear-gradient(90deg,#c9961a,#e8c04a); }

        /* ══ Bento grid responsive ══ */
        @media (max-width:767px) {
          .bento-top { grid-template-columns:1fr !important; }
          .bento-bot  { grid-template-columns:1fr !important; }
        }

        .tl-inner {
          display:flex; flex-direction:row;
          gap:24px; align-items:stretch; height:100%;
        }
        .tl-divider-v {
          width:1px; background:rgba(201,150,26,0.15);
          flex-shrink:0; align-self:stretch;
        }
        .tl-divider-h {
          display:none; height:1px;
          background:rgba(201,150,26,0.15);
          width:100%; flex-shrink:0;
        }
        .tl-logo {
          width:150px; flex-shrink:0;
          display:flex; align-items:center; justify-content:center;
        }
        @media (max-width:767px) {
          .tl-inner  { flex-direction:column; gap:0; height:auto; }
          .tl-divider-v { display:none; }
          .tl-divider-h { display:block; margin:16px 0; }
          .tl-logo { width:100%; padding:4px 0 8px; justify-content:center; }
        }

        .br-inner {
          display:grid;
          grid-template-columns:1fr 1fr;
          min-height:200px;
          height:100%;
        }
        .br-logo-cell {
          display:flex; align-items:center; justify-content:center;
          padding:28px 20px;
          border-right:1px solid rgba(201,150,26,0.12);
        }
        .br-quote-cell {
          padding:28px 28px;
          display:flex; flex-direction:column; justify-content:space-between;
        }
        @media (max-width:767px) {
          .br-inner {
            display:flex; flex-direction:column;
            min-height:unset;
          }
          .br-logo-cell {
            border-right:none;
            border-bottom:1px solid rgba(201,150,26,0.12);
            padding:24px 20px;
          }
          .br-quote-cell {
            padding:20px 24px;
          }
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
                                Smart WhatsApp Chatbot for<br />Sales, Support & Customer Engagement
                            </ShimmerHeading>
                            <p className="max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: "#a0a0a0", fontSize: "16px" }}>
                                Automate conversations, qualify leads, close sales, and offer instant support with Whats App Voice Calling.
                                no-code WhatsApp Chatbot now smarter with AI-generated workflows and AI-based intent detection.
                            </p>
                            
                        </div>
                        <div className="fs d2 mt-14 w-full max-w-5xl mx-auto rounded-2xl overflow-hidden"
                            style={{ border: "1px solid rgba(201,150,26,0.18)", background: "hsl(0,0%,5%)" }}>
                            <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Wp4.webp" alt="WhatsApp Chatbot dashboard"
                                className="w-full h-auto object-cover" style={{ display: "block" }} />
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

                {/* ════════ 3. WHAT IS A WHATSAPP CHATBOT ════════ */}
                <Section>
                    <div className="absolute inset-0 pointer-events-none"
                        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%,rgba(0,184,148,0.04) 0%,transparent 70%)" }} />
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="max-w-3xl mx-auto text-center">
                            <div className="fs"><ShimmerHeading className="mb-5">What is a WhatsApp Chatbot?</ShimmerHeading></div>
                            <div className="fs d1">
                                <p className="leading-relaxed mb-3" style={{ color: "#a0a0a0", fontSize: "16px" }}>
                                    A WhatsApp Chatbot is a virtual assistant that automates customer interactions on WhatsApp
                                    from answering FAQs to managing order-related updates.
                                </p>
                                <p className="leading-relaxed" style={{ color: "#a0a0a0", fontSize: "16px" }}>
                                    With Whats App Voice Calling new AI-layer, your no-code chatbot doesn't just follow keyword-based commands.
                                    It understands intent, responds more naturally and creates ready-to-use workflows using your
                                    website content to help you go live faster.
                                </p>
                            </div>
                            <div className="fs d2 mt-10 w-full">
                                <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Wpgif.gif" alt="WhatsApp Chatbot interface"
                                    className="w-full h-auto block" style={{ borderRadius: "0px" }} />
                            </div>
                        </div>
                    </div>
                </Section>

                {/* ════════ 4. SLIDER ════════ */}
                <Section>
                    <div className="container mx-auto px-6">
                        <div className="fs text-center mb-10">
                            <ShimmerHeading className="mb-4">
                                Why do you need <br />Smart WhatsApp Chatbot?
                            </ShimmerHeading>
                        </div>
                        <div className="fs d1 max-w-6xl mx-auto">
                            <div className={`wcb-slides slide-${activeSlide}`}>
                                {SLIDER_CARDS.map((card, si) => (
                                    <div key={si} className="wcb-slide grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                                        <div className="rounded-2xl overflow-hidden flex items-center justify-center"
                                            style={{ background: "hsl(0,0%,5%)", border: "1px solid rgba(201,150,26,0.1)", width: "100%", aspectRatio: "4/3" }}>
                                            <img src={card.image} alt={card.title}
                                                className="w-full h-full object-contain" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold mb-5 leading-tight"
                                                style={{ fontFamily: "'Libre Baskerville',serif", color: "#e8c04a", fontSize: "34px" }}>
                                                {card.title}
                                            </h3>
                                            <p className="leading-relaxed mb-6" style={{ color: "#a0a0a0", fontSize: "18px" }}>
                                                {card.desc}
                                            </p>
                                            {si === 0 && (
                                                <div className="space-y-3">
                                                    {["24/7 automated responses to customer queries", "AI-powered intent detection for natural conversations", "Seamless integration with your existing systems"].map((item, i) => (
                                                        <div key={i} className="flex items-start gap-3">
                                                            <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                                                                style={{ background: "rgba(232,192,74,0.2)" }}>
                                                                <Check className="w-4 h-4" style={{ color: "#e8c04a" }} />
                                                            </div>
                                                            <p style={{ color: "#a0a0a0" }}>{item}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-center gap-2 mt-10">
                                {SLIDER_CARDS.map((_, i) => (
                                    <button key={i} onClick={() => setActiveSlide(i)} className={`dot ${i === activeSlide ? "active" : ""}`} />
                                ))}
                            </div>
                        </div>
                    </div>
                </Section>

                {/* ════════ 5. WHY CHOOSE ════════ */}
                <Section>
                    <div className="absolute inset-0 pointer-events-none"
                        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%,rgba(201,150,26,0.04) 0%,transparent 70%)" }} />
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="fs text-center mb-10">
                            <ShimmerHeading className="mb-4">
                                Why Choose No-code<br />WhatsApp Chatbot?
                            </ShimmerHeading>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
                            {WHY_FEATURES.map((f, i) => (
                                <Card key={i} className={`fs d${Math.min(i + 1, 5)}`}>
                                    <TealIcon icon={f.icon} />
                                    <h3 className="mt-3 mb-2 font-bold"
                                        style={{ fontFamily: "'Libre Baskerville',serif", color: "#e8c04a", fontSize: "18px" }}>
                                        {f.title}
                                    </h3>
                                    <p className="leading-relaxed" style={{ color: "#a0a0a0", fontSize: "16px" }}>{f.desc}</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                </Section>

                {/* ════════ 6. HOW TO BUILD ════════ */}
                <Section>
                    <div className="container mx-auto px-6">
                        <div className="fs text-center mb-10">
                            <ShimmerHeading className="mb-4">
                                How to build your WhatsApp chatbot<br />in 5 easy steps
                            </ShimmerHeading>
                        </div>
                        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                            <div className="space-y-5">
                                {STEPS.map((s, i) => (
                                    <div key={i} className={`fs d${i + 1} flex gap-5`}>
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold"
                                            style={{ background: "linear-gradient(135deg,#c9961a,#e8c04a)", color: "#000", fontSize: "16px" }}>
                                            {s.num}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-1"
                                                style={{ fontFamily: "'Libre Baskerville',serif", color: "#e8c04a", fontSize: "18px" }}>
                                                {s.title}
                                            </h4>
                                            <p className="leading-relaxed" style={{ color: "#888", fontSize: "16px" }}>{s.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="fs d2 flex justify-center items-center">
                                <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/chatbot.gif" alt="WhatsApp Chatbot Animation"
                                    className="w-full max-w-3xl rounded-lg shadow-2xl"
                                    style={{ border: "1px solid rgba(232,192,74,0.3)", boxShadow: "0 25px 50px -12px rgba(232,192,74,0.25)", transform: "scale(1.1)" }} />
                            </div>
                        </div>
                    </div>
                </Section>

                {/* ════════════════════════════════════════════════════════
                    7. TESTIMONIALS — BENTO GRID
                ════════════════════════════════════════════════════════ */}
                <Section>
                    <div className="absolute inset-0 pointer-events-none"
                        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%,rgba(0,184,148,0.04) 0%,transparent 70%)" }} />
                    <div className="container mx-auto px-6 relative z-10">

                        <div className="fs text-center mb-10">
                            <ShimmerHeading className="mb-4">
                                The results speak for themselves,<br />just like our customers
                            </ShimmerHeading>
                        </div>

                        <div className="fs d1 max-w-5xl mx-auto" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

                            {/* ── TOP ROW ── */}
                            <div className="bento-top" style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: "14px" }}>

                                {/* TOP-LEFT: Quote + eatoes logo */}
                                <div className="relative rounded-2xl overflow-hidden"
                                    style={{ background: "hsl(0,0%,7%)", border: "1px solid rgba(201,150,26,0.14)", padding: "28px 32px" }}>
                                    <div className="tl-inner">
                                        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                            <div>
                                                <span style={{ fontFamily: "Georgia,serif", fontSize: "48px", lineHeight: "1", color: "#c9961a", opacity: 0.8, display: "block", marginBottom: "10px" }}>&ldquo;&ldquo;</span>
                                                <p style={{ fontStyle: "italic", color: "#b0b0b0", fontSize: "15px", lineHeight: "1.85", margin: 0 }}>
                                                    Whats App Voice Calling helped us recover 30% more abandoned carts and gave us a direct line
                                                    to our customers. WhatsApp has become our top revenue channel.
                                                </p>
                                            </div>
                                            <div style={{ textAlign: "right", marginTop: "14px" }}>
                                                <span style={{ fontFamily: "Georgia,serif", fontSize: "40px", lineHeight: "0.8", color: "#c9961a", opacity: 0.8 }}>&rdquo;&rdquo;</span>
                                            </div>
                                        </div>
                                        <div className="tl-divider-v" />
                                        <div className="tl-divider-h" />
                                        <div className="tl-logo">
                                            <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/eatoes-logo.webp" alt="eatoes"
                                                style={{ maxWidth: "130px", maxHeight: "65px", objectFit: "contain" }}
                                                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; const fb = e.currentTarget.nextElementSibling as HTMLElement; if (fb) fb.style.display = "flex"; }} />
                                            <div style={{ display: "none", alignItems: "center", justifyContent: "center", width: "130px", height: "65px", fontWeight: 800, fontSize: "26px", color: "#888", fontFamily: "Inter,sans-serif", letterSpacing: "-1px" }}>eatoes</div>
                                        </div>
                                    </div>
                                </div>

                                {/* TOP-RIGHT: Prithu Homes + 70% */}
                                <div className="relative rounded-2xl overflow-hidden"
                                    style={{ background: "hsl(0,0%,7%)", border: "1px solid rgba(201,150,26,0.14)", padding: "28px 32px", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                                    <div>
                                        <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/mm1.webp" alt="Prithu Homes"
                                            style={{ height: "52px", objectFit: "contain" }}
                                            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; const fb = e.currentTarget.nextElementSibling as HTMLElement; if (fb) fb.style.display = "block"; }} />
                                        <span style={{ display: "none", fontWeight: 700, color: "#e8c04a", fontSize: "17px", fontFamily: "'Libre Baskerville',serif" }}>Prithu Homes</span>
                                    </div>
                                    <div style={{ marginTop: "16px" }}>
                                        <div style={{ fontWeight: 800, fontSize: "70px", lineHeight: 1, color: "#00b894", fontFamily: "Inter,sans-serif", letterSpacing: "-2px", textShadow: "0 0 30px rgba(0,184,148,0.4)" }}>70%</div>
                                        <p style={{ color: "#888", fontSize: "15px", margin: "8px 0 0 0" }}>Customer communication automated</p>
                                    </div>
                                </div>
                            </div>

                            {/* ── BOTTOM ROW ── */}
                            <div className="bento-bot" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "14px" }}>

                                {/* BOTTOM-LEFT: A Square + ₹1.5 */}
                                <div className="relative rounded-2xl overflow-hidden"
                                    style={{ background: "hsl(0,0%,7%)", border: "1px solid rgba(201,150,26,0.14)", padding: "28px 28px", display: "flex", flexDirection: "column", justifyContent: "flex-start", minHeight: "200px" }}>
                                    <div>
                                        <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/mm.webp" alt="A Square GoKarting"
                                            style={{ height: "48px", objectFit: "contain" }}
                                            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; const fb = e.currentTarget.nextElementSibling as HTMLElement; if (fb) fb.style.display = "block"; }} />
                                        <span style={{ display: "none", fontWeight: 700, color: "#e8c04a", fontSize: "14px", fontFamily: "'Libre Baskerville',serif" }}>A Square GoKarting</span>
                                    </div>
                                    <div style={{ marginTop: "16px" }}>
                                        <div style={{ fontWeight: 800, fontSize: "52px", lineHeight: 1, color: "#00b894", fontFamily: "Inter,sans-serif", letterSpacing: "-1px", textShadow: "0 0 24px rgba(0,184,148,0.4)" }}>₹ 1.5</div>
                                        <p style={{ color: "#888", fontSize: "14px", margin: "8px 0 0 0" }}>Lakhs revenue generated</p>
                                    </div>
                                </div>

                                {/* BOTTOM-RIGHT MERGED: Chikankari logo + Quote */}
                                <div className="relative rounded-2xl overflow-hidden"
                                    style={{ background: "hsl(0,0%,7%)", border: "1px solid rgba(201,150,26,0.14)" }}>
                                    <div className="br-inner">
                                        <div className="br-logo-cell">
                                            <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/mm2.webp" alt="House of Chikankari"
                                                style={{ maxWidth: "100%", maxHeight: "110px", objectFit: "contain", filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.4))" }}
                                                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; const fb = e.currentTarget.nextElementSibling as HTMLElement; if (fb) fb.style.display = "flex"; }} />
                                            <div style={{ display: "none", alignItems: "center", justifyContent: "center", textAlign: "center", fontWeight: 700, color: "#e8c04a", fontSize: "16px", fontFamily: "'Libre Baskerville',serif", lineHeight: "1.4" }}>
                                                House of<br />Chikankari
                                            </div>
                                        </div>
                                        <div className="br-quote-cell">
                                            <span style={{ fontFamily: "Georgia,serif", fontSize: "44px", lineHeight: "1", color: "#c9961a", opacity: 0.8, display: "block", marginBottom: "10px" }}>&ldquo;&ldquo;</span>
                                            <p style={{ fontStyle: "italic", color: "#b0b0b0", fontSize: "14px", lineHeight: "1.85", margin: 0, flex: 1 }}>
                                                Setting up took minutes. Now our entire order tracking runs through WhatsApp,
                                                and our support response time has dropped by 70%.
                                            </p>
                                            <div style={{ textAlign: "right", marginTop: "10px" }}>
                                                <span style={{ fontFamily: "Georgia,serif", fontSize: "38px", lineHeight: "0.8", color: "#c9961a", opacity: 0.8 }}>&rdquo;&rdquo;</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </Section>

                {/* ════════ 8. FAQ ════════ */}
                <Section>
                    <div className="container mx-auto px-6">
                        <div className="fs text-center mb-10">
                            <ShimmerHeading className="mb-4">
                                Still Have Questions?<br />We've Got Answers
                            </ShimmerHeading>
                        </div>
                        <div className="fs d1 max-w-3xl mx-auto rounded-2xl p-6 md:p-8"
                            style={{ background: "hsl(0,0%,5%)", border: "1px solid rgba(201,150,26,0.12)" }}>
                            {FAQS.map((faq, i) => <FaqRow key={i} item={faq} idx={i} />)}
                        </div>
                       
                    </div>
                </Section>
<ContactUsForm/>
            </div>
        </>
    );
};

export default WhatsAppChatbotPage;