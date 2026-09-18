import React, { useEffect, useRef, useState } from "react";
import {
    Play, Zap, GitBranch, Bot, Users,
    BarChart3, ChevronDown, ChevronUp,
    MessageSquare, Rocket, Check, Phone, Mail, Send
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
    { name: "AJIO", img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/IM32.webp", alt: "AJIO logo" },
    { name: "Zoop", img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/IM33.webp", alt: "Zoop logo" },
    { name: "LAKMÉ", img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/IM34.webp", alt: "Lakmé logo" },
    { name: "Money Solution", img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/IM35.webp", alt: "Money Solution logo" },
    { name: "IIB", img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/IM36.webp", alt: "IIB logo" },
    { name: "FOAID", img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/IM37.webp", alt: "FOAID logo" },
    { name: "steelbazaar", img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/IM38.webp", alt: "Steelbazaar logo" },
    { name: "eatoes", img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/IM39.webp", alt: "eatoes logo" },
];

const WHY_FEATURES: FeatureCard[] = [
    { 
        icon: Zap, 
        title: "Save precious business hours", 
        desc: "AI instantly generates ready-to-use templates tailored to your website and industry, no manual writing or copy-pasting needed." 
    },
    { 
        icon: GitBranch, 
        title: "Eliminate grammatical errors and typos", 
        desc: "AI-generated templates are professionally written and optimized for clarity, tone, and compliance." 
    },
    { 
        icon: Bot, 
        title: "Respond to customers faster", 
        desc: "Use AI-generated templates to reply instantly to common queries, updates, and confirmations." 
    },
    { 
        icon: Users, 
        title: "Personalization made effortless", 
        desc: "Templates are personalized using your business details, making it easy to send messages that feel relevant, not generic." 
    },
    { 
        icon: BarChart3, 
        title: "Boost open and response rates", 
        desc: "Highly engaging, AI-optimized templates are designed to drive better clicks, replies, and conversions on WhatsApp." 
    },
];

const STEPS: StepItem[] = [
    { 
        num: "1", 
        title: "Set up your WhatsApp API account with Interakt", 
        desc: "No code. No complications. We'll guide you through the process." 
    },
    { 
        num: "2", 
        title: "Build Your Contact List", 
        desc: "Collect opt-ins via website, QR codes, ads, and social media." 
    },
    { 
        num: "3", 
        title: "Launch Your First Campaign", 
        desc: "Start with a broadcast or drip WhatsApp marketing campaign – we'll help you set it up." 
    },
    { 
        num: "4", 
        title: "Automate Customer Journeys", 
        desc: "Add chatbots, create Flows, and let WhatsApp do the heavy lifting." 
    },
];

const FAQS: FaqItem[] = [
    { 
        q: "Is WhatsApp Marketing suitable for all types of businesses?", 
        a: "Yes, WhatsApp Marketing services can benefit all types of businesses. They enable direct engagement, personalized communication, and 24/7 customer interaction—helping you showcase products and reach customers at scale." 
    },
    { 
        q: "How can WhatsApp Marketing be used for lead generation?", 
        a: "WhatsApp can enhance lead generation by:\n1. Opt-in Campaigns: Promote subscribing to updates and offer valuable content.\n2. Content Sharing: Share ebooks, webinar recordings, etc., in exchange for user info.\n3. Contests: Run interactive contests for engaging and gathering data from participants.\n4. Exclusive Offers: Provide discounts or offers for contact information.\n5. Personalized Communication: Build relationships and nurture leads over time." 
    },
    { 
        q: "Is WhatsApp Marketing compliant with privacy regulations?", 
        a: "Yes, WhatsApp Marketing must comply with privacy regulations. Businesses must obtain user consent before sending messages, provide opt-out options, and handle personal data responsibly. Non-compliance can result in penalties. Always adhere to relevant data protection laws to ensure ethical and legal practices." 
    },
    { 
        q: "How can I measure the success of my WhatsApp Marketing campaigns?", 
        a: "Measure WhatsApp Marketing campaign success:\n– Open Rates: Track how many recipients open your messages.\n– Conversion Rates: Monitor how many recipients take desired actions.\n– Response Time: Gauge user engagement and satisfaction.\n– Opt-out Rates: Track unsubscribes to refine targeting.\n– Sales/Leads Generated: Measure direct impact on business goals.\n– Customer Feedback: Collect qualitative insights for improvements.\n– A/B Testing: Compare variations to identify effective strategies. Use these metrics to assess performance and refine future campaigns." 
    },
    { 
        q: "What content types work best for WhatsApp Marketing?", 
        a: "Personalized offers or discount deals are highly effective in WhatsApp Marketing. They instantly capture users' attention and boost engagement. For instance, during festive seasons, businesses like Flipkart, Jio, Myntra, Nykaa, etc., use WhatsApp to share exclusive discount deals, driving increased customer interaction and sales." 
    },
    { 
        q: "How can I avoid coming across as spammy with WhatsApp Marketing?", 
        a: "To avoid being spammy in WhatsApp Marketing:\n– Obtain explicit consent before sending messages.\n– Send relevant and valuable content.\n– Limit message frequency.\n– Provide easy opt-out options.\n– Respect user preferences for a personalized and respectful approach." 
    },
    { 
        q: "How do I choose the right WhatsApp marketing solution?", 
        a: "Consider your budget, business size, and campaign goals. Look for WhatsApp marketing software that offers essential tools like automation, analytics, and personalization. Ensure it complies with WhatsApp's policies and integrates well with your existing systems." 
    },
];

const SLIDER_CARDS = [
    { 
        image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wm11.webp", 
        title: "Leverage AI-powered Template Library", 
        desc: "Over 100+ proven WhatsApp templates created by AI. Categorized by goal: Sales, Engagement, Win-backs, Reminders, Offers & more. Templates that follow WhatsApp best practices." 
    },
    { 
        image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wm12.webp", 
        title: "Let AI Co-pilot create all your templates", 
        desc: "Inform the AI about your campaign's goal, target audience, and desired tone. Instantly generate tailored message templates. Edit, personalize, and approve faster than ever." 
    },
    { 
        image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wm13.webp", 
        title: "Reach millions - instantly and intelligently.", 
        desc: "Send promotions, product updates, and festive offers at scale. Schedule campaigns, personalize messages, and reach the right audience at the right time. Built for high delivery, high opens, and real conversions." 
    },
    { 
        image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wm14.webp", 
        title: "Engage customers 24/7 - without lifting a finger.", 
        desc: "Automate FAQs, order updates, lead collection, and support queries. Create smart chat flows that respond instantly and guide users forward. Reduce support load while improving customer experience." 
    },
    { 
        image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wm15.webp", 
        title: "Smart Campaign Retries", 
        desc: "Automatically retry sends to contacts who didn't open. Intelligent retry windows based on engagement patterns. Increase reach without manual follow-ups." 
    },
    { 
        image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wm16.webp", 
        title: "Reconnect at the moment that matters.", 
        desc: "Re-engage users who abandoned carts, viewed products, or showed intent. Send timely nudges with personalized messaging. Bring warm leads back into the conversation and closer to conversion." 
    },
];

const WhatsAppNotificationLibrary: React.FC = () => {
    const pageRef = useScrollFade();
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        const t = setInterval(() => setActiveSlide((p) => (p + 1) % SLIDER_CARDS.length), 4000);
        return () => clearInterval(t);
    }, []);

    const handleContactUs = () => {
        // You can replace this with your actual contact logic
        window.location.href = "mailto:hello@interakt.com?subject=WhatsApp%20Notification%20Templates%20Inquiry";
        // Or open a contact form modal
        // alert("Contact our sales team: +91-80-1234-5678 | hello@interakt.com");
    };

    const handleCall = () => {
        window.location.href = "tel:+918012345678";
    };

    return (
        <>
            <SEO {...pageSEO.whatsappNotification} />
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');

        .wcb-root { box-sizing:border-box; font-size:16px; }
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

        /* ══════════════════════════════════════════════════════
           TOP-LEFT CARD  (Quote | divider | eatoes logo)
           Desktop : row   Mobile : column (quote → logo)
        ══════════════════════════════════════════════════════ */
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

        /* ══════════════════════════════════════════════════════
           BOTTOM-RIGHT MERGED CARD  (Chikankari | divider | Quote)
           Desktop : side-by-side grid
           Mobile  : column (logo top → divider → quote below)
        ══════════════════════════════════════════════════════ */
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
            display:flex; flex-direction:column;  /* stack on mobile */
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

        /* Contact button mobile styles */
        .contact-btn-mobile {
          width: 100%;
          justify-content: center;
        }
        @media (max-width: 640px) {
          .contact-btn-mobile {
            padding-left: 1rem;
            padding-right: 1rem;
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
                                AI-Generated WhatsApp Templates, Personalized for Your Business
                            </ShimmerHeading>
                            <p className="max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: "#a0a0a0", fontSize: "16px" }}>
                                Just sign up. Interakt's AI instantly generates 10+ personalized, ready-to-send WhatsApp templates, created using your website, industry, and business goals, so you can start sending campaigns in minutes.
                            </p>
                           
                        </div>
                        <div className="fs d2 mt-14 w-full max-w-5xl mx-auto rounded-2xl overflow-hidden"
                            style={{ border: "1px solid rgba(201,150,26,0.18)", background: "hsl(0,0%,5%)" }}>
                            <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wn1.webp" alt="WhatsApp Chatbot dashboard"
                                className="w-full h-auto object-cover" style={{ display: "block" }} />
                        </div>
                    </div>
                </Section>

                {/* ════════ 2. TRUST MARQUEE ════════ */}
                <section className="relative py-8 overflow-hidden"
                    style={{ borderTop: "1px solid rgba(201,150,26,0.08)", borderBottom: "1px solid rgba(201,150,26,0.08)" }}>
                    <div className="text-center mb-5 fs">
                        <p className="font-semibold tracking-[0.25em] uppercase" style={{ color: "#555", fontSize: "16px" }}>
                            Trusted by 50,000+ businesses across the globe
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

                {/* ════════ 3. WHY CHOOSE ════════ */}
                <Section>
                    <div className="absolute inset-0 pointer-events-none"
                        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%,rgba(201,150,26,0.04) 0%,transparent 70%)" }} />
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="fs text-center mb-10">
                            <ShimmerHeading className="mb-4">
                               Why do you need AI-Generated WhatsApp Notification Templates?
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

                {/* ════════ 4. SLIDER SECTION ════════ */}
                <Section>
                    <div className="container mx-auto px-6">
                        <div className="fs text-center mb-10">
                            <ShimmerHeading className="mb-4">
                               AI-Powered Template Generation
                            </ShimmerHeading>
                        </div>
                        <div className="fs d1 max-w-6xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                                <div className="rounded-2xl overflow-hidden flex items-center justify-center"
                                    style={{ background: "hsl(0,0%,5%)", border: "1px solid rgba(201,150,26,0.1)", width: "100%", aspectRatio: "4/3" }}>
                                    <img src={SLIDER_CARDS[activeSlide].image} alt={SLIDER_CARDS[activeSlide].title}
                                        className="w-full h-full object-contain" />
                                </div>
                                <div>
                                    <h3 className="font-bold mb-5 leading-tight"
                                        style={{ fontFamily: "'Libre Baskerville',serif", color: "#e8c04a", fontSize: "34px" }}>
                                        {SLIDER_CARDS[activeSlide].title}
                                    </h3>
                                    <p className="leading-relaxed mb-6" style={{ color: "#a0a0a0", fontSize: "18px" }}>
                                        {SLIDER_CARDS[activeSlide].desc}
                                    </p>
                                    {activeSlide === 0 && (
                                        <div className="space-y-3">
                                            {["Instant template generation", "Industry-specific messaging", "Compliance-ready content"].map((item, i) => (
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
                            <div className="flex justify-center gap-2 mt-10">
                                {SLIDER_CARDS.map((_, i) => (
                                    <button key={i} onClick={() => setActiveSlide(i)} className={`dot ${i === activeSlide ? "active" : ""}`} />
                                ))}
                            </div>
                        </div>
                    </div>
                </Section>

                {/* ════════ 5. HOW TO BUILD ════════ */}
                <Section>
                    <div className="container mx-auto px-6">
                        <div className="fs text-center mb-10">
                            <ShimmerHeading className="mb-4">
                               How to Start WhatsApp Marketing
(Step-by-Step)
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
                                <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wmvideo.gif" alt="WhatsApp Chatbot Animation"
                                    className="w-full max-w-3xl rounded-lg shadow-2xl"
                                    style={{ border: "1px solid rgba(232,192,74,0.3)", boxShadow: "0 25px 50px -12px rgba(232,192,74,0.25)", transform: "scale(1.1)" }} />
                            </div>
                        </div>
                    </div>
                </Section>

                {/* ════════ 6. TESTIMONIALS — BENTO GRID ════════ */}
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
                            {/* TOP ROW */}
                            <div className="bento-top" style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: "14px" }}>
                                <div className="relative rounded-2xl overflow-hidden"
                                    style={{ background: "hsl(0,0%,7%)", border: "1px solid rgba(201,150,26,0.14)", padding: "28px 32px" }}>
                                    <div className="tl-inner">
                                        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                            <div>
                                                <span style={{ fontFamily: "Georgia,serif", fontSize: "48px", lineHeight: "1", color: "#c9961a", opacity: 0.8, display: "block", marginBottom: "10px" }}>&ldquo;&ldquo;</span>
                                                <p style={{ fontStyle: "italic", color: "#b0b0b0", fontSize: "15px", lineHeight: "1.85", margin: 0 }}>
                                                   "Interakt helped us recover 30% more abandoned carts and gave us a direct line to our customers. WhatsApp has become our top revenue channel."
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
                            {/* BOTTOM ROW */}
                            <div className="bento-bot" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "14px" }}>
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
                                               "Setting up took minutes. Now our entire order tracking runs through WhatsApp, and our support response time has dropped by 70%."
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

                {/* ════════ 7. FAQ ════════ */}
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

export default WhatsAppNotificationLibrary;