import ContactUsForm from "@/pages/ContactUsForm";
import { useEffect, useRef, useState } from "react";
import SEO from "@/components/SEO";
import { pageSEO } from "@/seo/pageSEO";

// ─── Types ────────────────────────────────────────────────────────────────────
interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "fade";
  className?: string;
}
interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
interface BrandPillProps {
  name: string;
  logoSrc?: string;
}

// ─── Scroll Reveal Hook ───────────────────────────────────────────────────────
function useScrollReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
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
function Reveal({ children, delay = 0, direction = "up", className = "" }: RevealProps) {
  const { ref, visible } = useScrollReveal();
  const transforms: Record<string, string> = {
    up: "translateY(44px)",
    left: "translateX(-44px)",
    right: "translateX(44px)",
    fade: "none",
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : transforms[direction],
        transition: `opacity 0.82s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.82s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

// ─── Hover Card ───────────────────────────────────────────────────────────────
function HoverCard({ children, className = "", style = {} }: HoverCardProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`relative rounded-2xl overflow-hidden transition-all duration-500 ${className}`}
      style={{
        border: hovered ? "1px solid rgba(245,216,122,0.6)" : "1px solid rgba(200,146,42,0.2)",
        boxShadow: hovered
          ? "0 0 36px rgba(245,216,122,0.13), 0 10px 38px rgba(0,0,0,0.6)"
          : "0 4px 22px rgba(0,0,0,0.45)",
        background: hovered
          ? "linear-gradient(145deg,rgba(245,216,122,0.07) 0%,rgba(12,9,2,0.97) 100%)"
          : "linear-gradient(145deg,rgba(255,255,255,0.03) 0%,rgba(8,6,1,0.97) 100%)",
        transform: hovered ? "translateY(-4px) scale(1.008)" : "none",
        ...style,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{ background: "radial-gradient(ellipse at 50% 0%,rgba(245,216,122,0.09) 0%,transparent 68%)" }}
        />
      )}
      {children}
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────
function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`px-4 sm:px-8 lg:px-16 xl:px-24 ${className}`} style={{ paddingTop: "clamp(80px, 8vw, 110px)", paddingBottom: "clamp(24px, 4vw, 40px)" }}>
      {children}
    </section>
  );
}

// ─── Gold Button ─────────────────────────────────────────────────────────────
function GoldButton({ children, className = "", small = false, onClick }: { children: React.ReactNode; className?: string; small?: boolean; onClick?: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      className={`relative overflow-hidden rounded-full font-semibold tracking-wide transition-all duration-300 ${className}`}
      style={{
        background: hovered
          ? "linear-gradient(135deg,#f5d87a 0%,#c8922a 50%,#e8b84b 100%)"
          : "linear-gradient(135deg,#c8922a 0%,#f5d87a 50%,#e8b84b 100%)",
        color: "#0a0800",
        boxShadow: hovered ? "0 0 26px rgba(245,216,122,0.5)" : "0 0 14px rgba(200,146,42,0.3)",
        transform: hovered ? "scale(1.05)" : "scale(1)",
        padding: small ? "8px 20px" : "10px 28px",
        fontSize: small ? "13px" : "14px",
        fontFamily: "'Inter',sans-serif",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <span
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.32) 50%,transparent 60%)", animation: "shimmer 0.65s ease forwards" }}
        />
      )}
      {children}
    </button>
  );
}

// ─── Outline Button ───────────────────────────────────────────────────────────
function OutlineButton({ children, className = "", small = false }: { children: React.ReactNode; className?: string; small?: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      className={`relative rounded-full font-semibold tracking-wide transition-all duration-300 ${className}`}
      style={{
        border: `1px solid ${hovered ? "#f5d87a" : "rgba(200,146,42,0.45)"}`,
        color: hovered ? "#f5d87a" : "rgba(245,216,122,0.7)",
        background: hovered ? "rgba(245,216,122,0.07)" : "transparent",
        boxShadow: hovered ? "0 0 16px rgba(245,216,122,0.14)" : "none",
        transform: hovered ? "scale(1.03)" : "scale(1)",
        padding: small ? "8px 20px" : "10px 28px",
        fontSize: small ? "13px" : "14px",
        fontFamily: "'Inter',sans-serif",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  );
}

// ─── Image Component with Placement Options ───────────────────────────────────
function ImgBox({ alt, aspect = "aspect-[16/10]", className = "", src }: { alt: string; aspect?: string; className?: string; src?: string }) {
  if (src) {
    return (
      <div className={`${aspect} rounded-2xl overflow-hidden ${className}`}>
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          style={{ display: 'block' }}
        />
      </div>
    );
  }
  return (
    <div
      className={`${aspect} rounded-2xl flex items-center justify-center ${className}`}
      style={{
        background: "linear-gradient(135deg,rgba(200,146,42,0.1) 0%,rgba(245,216,122,0.05) 50%,rgba(200,146,42,0.07) 100%)",
        border: "1px solid rgba(200,146,42,0.18)",
      }}
    >
      <div className="flex flex-col items-center gap-2 opacity-35">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(245,216,122,0.8)" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21,15 16,10 5,21" />
        </svg>
        <span style={{ color: "rgba(245,216,122,0.45)", fontSize: "10px", fontFamily: "'Inter',sans-serif", textAlign: "center", padding: "0 8px" }}>{alt}</span>
      </div>
    </div>
  );
}

// ─── Brand Pill ───────────────────────────────────────────────────────────────
function BrandPill({ name, logoSrc }: BrandPillProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="flex-shrink-0 flex items-center justify-center cursor-default"
      style={{
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-3px) scale(1.08)" : "none",
        filter: hovered ? "brightness(1.2) drop-shadow(0 0 8px rgba(245,216,122,0.4))" : "brightness(1)",
        opacity: hovered ? 1 : 0.85,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      {logoSrc ? (
        <img src={logoSrc} alt={name} style={{ height: "32px", width: "auto", maxWidth: "110px", objectFit: "contain", display: "block" }}  loading="lazy" decoding="async" />
      ) : (
        <span style={{ fontFamily: "'Baskerville','Libre Baskerville',Georgia,serif", fontSize: "14px", letterSpacing: "0.04em", color: hovered ? "#f5d87a" : "rgba(245,216,122,0.75)", whiteSpace: "nowrap" }}>
          {name}
        </span>
      )}
    </div>
  );
}

// ─── Widget Preview Card ──────────────────────────────────────────────────────
function WidgetPreviewCard({ label, color, delay }: { label: string; color: string; delay: number }) {
  return (
    <Reveal direction="up" delay={delay}>
      <HoverCard className="p-4 flex flex-col gap-3">
        <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(200,146,42,0.15)" }}>
          <div className="px-3 py-2 flex items-center gap-2" style={{ background: color }}>
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold text-white">B</div>
            <div>
              <div style={{ color: "rgba(255,255,255,0.95)", fontSize: "11px", fontFamily: "'Inter',sans-serif", fontWeight: 600 }}>Brand Store</div>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "9px", fontFamily: "'Inter',sans-serif" }}>● Online</div>
            </div>
          </div>
          <div className="px-3 py-3 flex flex-col gap-2" style={{ background: "rgba(12,9,2,0.95)" }}>
            <div className="rounded-lg px-2 py-1.5 text-left max-w-[85%]" style={{ background: "rgba(200,146,42,0.1)", border: "1px solid rgba(200,146,42,0.15)" }}>
              <p style={{ color: "rgba(255,248,231,0.7)", fontSize: "10px", fontFamily: "'Inter',sans-serif" }}>How can I help you today? 👋</p>
            </div>
            <div className="rounded-lg px-2 py-1 self-end" style={{ background: color, maxWidth: "80%" }}>
              <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "10px", fontFamily: "'Inter',sans-serif" }}>I need some help!</p>
            </div>
          </div>
          <div className="px-3 py-2 flex items-center gap-2 rounded-b-xl" style={{ background: "rgba(200,146,42,0.07)", borderTop: "1px solid rgba(200,146,42,0.12)" }}>
            <span style={{ flex: 1, color: "rgba(245,216,122,0.3)", fontSize: "9px", fontFamily: "'Inter',sans-serif" }}>Type a message…</span>
            <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs" style={{ background: color }}>➤</div>
          </div>
        </div>
        <div className="text-center">
          <span style={{ color: "rgba(245,216,122,0.55)", fontFamily: "'Inter',sans-serif", fontSize: "11px" }}>{label}</span>
        </div>
      </HoverCard>
    </Reveal>
  );
}

// ─── Step Badge ───────────────────────────────────────────────────────────────
function StepBadge({ number }: { number: number }) {
  return (
    <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
      style={{ background: "linear-gradient(135deg,#c8922a,#f5d87a)", color: "#0a0800", fontFamily: "'Baskerville',Georgia,serif" }}>
      {number}
    </div>
  );
}

// ─── Benefit Card ─────────────────────────────────────────────────────────────
function BenefitCard({ icon, title, desc, delay }: { icon: string; title: string; desc: string; delay: number }) {
  return (
    <Reveal direction="up" delay={delay}>
      <HoverCard className="p-6 flex flex-col gap-4 h-full">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{ background: "linear-gradient(135deg,rgba(200,146,42,0.22),rgba(245,216,122,0.08))", border: "1px solid rgba(200,146,42,0.28)" }}
        >
          {icon}
        </div>
        <h3
          style={{
            fontFamily: "'Baskerville','Libre Baskerville',Georgia,serif",
            fontSize: "18px",
            background: "linear-gradient(135deg,#f5d87a 0%,#fff8e7 55%,#c8922a 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            lineHeight: 1.35,
            margin: 0,
          }}
        >
          {title}
        </h3>
        <p style={{ color: "rgba(255,248,231,0.55)", fontFamily: "'Inter',sans-serif", fontSize: "14px", lineHeight: 1.72, margin: 0 }}>
          {desc}
        </p>
      </HoverCard>
    </Reveal>
  );
}

// ─── Tab Button ───────────────────────────────────────────────────────────────
function TabBtn({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
      style={{
        fontFamily: "'Inter',sans-serif",
        background: active ? "linear-gradient(135deg,#c8922a,#f5d87a)" : "rgba(200,146,42,0.08)",
        color: active ? "#0a0800" : "rgba(245,216,122,0.7)",
        border: active ? "none" : "1px solid rgba(200,146,42,0.22)",
        fontWeight: active ? 700 : 400,
        boxShadow: active ? "0 0 16px rgba(245,216,122,0.22)" : "none",
      }}
    >
      {label}
    </button>
  );
}

// ─── FAQ Item ─────────────────────────────────────────────────────────────────
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="cursor-pointer transition-all duration-300"
      style={{ borderBottom: "1px solid rgba(200,146,42,0.16)" }}
      onClick={() => setOpen(!open)}
    >
      <div className="flex justify-between items-center py-4 px-1 gap-4">
        <span style={{ fontFamily: "'Baskerville','Libre Baskerville',Georgia,serif", fontSize: "18px", background: "linear-gradient(135deg,#f5d87a 0%,#fff8e7 50%,#c8922a 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1.4 }}>
          {question}
        </span>
        <span
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
          style={{ background: open ? "linear-gradient(135deg,#c8922a,#f5d87a)" : "rgba(200,146,42,0.14)", color: open ? "#0a0800" : "#f5d87a", transform: open ? "rotate(45deg)" : "none", fontSize: "20px", fontWeight: 300, lineHeight: 1 }}
        >+</span>
      </div>
      <div style={{ maxHeight: open ? "300px" : "0", overflow: "hidden", transition: "max-height 0.45s cubic-bezier(0.16,1,0.3,1)" }}>
        <p style={{ padding: "0 4px 16px", fontSize: "14px", lineHeight: 1.75, color: "rgba(245,216,122,0.56)", fontFamily: "'Inter',sans-serif", margin: 0 }}>
          {answer}
        </p>
      </div>
    </div>
  );
}

// ─── Check Item ───────────────────────────────────────────────────────────────
function CheckItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs mt-0.5"
        style={{ background: "linear-gradient(135deg,#c8922a,#f5d87a)", color: "#0a0800", fontWeight: 700 }}>✓</span>
      <span style={{ color: "rgba(255,248,231,0.68)", fontFamily: "'Inter',sans-serif", fontSize: "14px", lineHeight: 1.6 }}>{text}</span>
    </div>
  );
}

// ─── Global Styles ────────────────────────────────────────────────────────────
const globalStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap');
  @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }
  @keyframes floatUp { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
  @keyframes pulseGlow { 0%,100% { opacity:0.5; } 50% { opacity:1; } }
  @keyframes gradientMove { 0% { background-position:0% 50%; } 50% { background-position:100% 50%; } 100% { background-position:0% 50%; } }
  @keyframes tickerScroll { 0% { transform:translateX(0); } 100% { transform:translateX(-50%); } }
  @keyframes fadeIn { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:none; } }
  * { box-sizing:border-box; margin:0; padding:0; }
  ::selection { background:rgba(200,146,42,0.3); color:#fff8e7; }
  ::-webkit-scrollbar { width:5px; }
  ::-webkit-scrollbar-track { background:#060400; }
  ::-webkit-scrollbar-thumb { background:linear-gradient(180deg,#c8922a,#f5d87a); border-radius:99px; }
  .gold-text {
    background:linear-gradient(135deg,#f5d87a 0%,#fff8e7 50%,#c8922a 100%);
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
    background-clip:text;
  }
  .section-h2 {
    font-family:'Baskerville','Libre Baskerville',Georgia,serif;
    font-size:18px;
    line-height:1.42;
    background:linear-gradient(135deg,#f5d87a 0%,#fff8e7 50%,#c8922a 100%);
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
    background-clip:text;
  }
  /* ── Mobile: 2-column grid, bare images, no container ── */
  .brand-strip {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px 24px;
    max-width: 480px;
    margin: 0 auto;
    align-items: center;
    justify-items: center;
  }
  /* ── Desktop (sm+): restore flex wrap ── */
  @media (min-width: 640px) {
    .brand-strip {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: 16px 24px;
      max-width: none;
    }
  }
  img {
    display: block;
    max-width: 100%;
    height: auto;
  }
`;

// ─── DATA ─────────────────────────────────────────────────────────────────────
const brandData = [
  { name: "paisabazaar", logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wc1.webp" },
  { name: "JioMart",     logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wc2.webp" },
  { name: "Disney+ hotstar", logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wc3.webp" },
  { name: "pepperfry",   logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wc4.webp" },
  { name: "upstox",      logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wc5.webp" },
  { name: "BLUE DART",   logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wc6.webp" },
  { name: "ZOOP",        logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wc7.webp" },
  { name: "INDmoney",    logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wc8.webp" },
  { name: "atomberg",    logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wc9.webp" },
  { name: "atomberg",    logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wc10.webp" },
];

const widgetTemplates = [
  { label: "General",  color: "rgba(0,168,132,0.85)",  delay: 0 },
  { label: "Support",  color: "rgba(14,99,187,0.85)",  delay: 80 },
  { label: "Sales",    color: "rgba(200,146,42,0.85)", delay: 160 },
  { label: "Feedback", color: "rgba(147,51,234,0.85)", delay: 240 },
];

const benefits = [
  { icon: "🚀", title: "Boost Conversions with Consultation",        desc: "Help website shoppers make the right decision by answering queries and upselling by sharing product recommendations in real time on WhatsApp.", delay: 0 },
  { icon: "💬", title: "Engaging chat elements",                      desc: "When customers reach out to you via the WhatsApp chat button, you can use various elements to make your conversations engaging — emojis, images, videos, and media clips.", delay: 100 },
  { icon: "🔄", title: "Address the complete life cycle on WhatsApp", desc: "Engage visitors, nudge for sales, reduce customer queries & more with a chat widget on your website or a warm link on your social media profiles too.", delay: 200 },
];

const engageTabContent = {
  Acquire: {
    heading: "Leverage WhatsApp to acquire new customers",
    subheading: "Generate high-intent leads for your business with Interakt",
    points: [
      "No more email & phone cold leads. Invite website visitors for a chat on WhatsApp with the chat widget.",
      "Generate qualified leads by triggering our automated workflows on WhatsApp.",
    ],
  },
  Engage: {
    heading: "Drive Sales & Conversions on WhatsApp",
    subheading: "Transform Conversations into Conversions with Interakt",
    points: [
      "Enhance customer engagement by strategically placing the widget throughout the website with a floating bubble, embedded bubble, or embedded chat window.",
      "Engage & re-engage leads with personalized notifications on WhatsApp to drive conversions",
    ],
  },
  Delight: {
    heading: "Offer Support at scale on WhatsApp",
    subheading: "Offer 24×7 Support to your customers with Interakt at scale",
    points: [
      "Solve customer queries on the go with a free WhatsApp chat button/link/QR code respectively on your website/social media/packaging.",
      "Increase your CSAT score with quick auto-replies for FAQs",
    ],
  },
};

const faqData = [
  { question: "What is a WhatsApp chat widget?", answer: "WhatsApp chat widget allows you to integrate WhatsApp messaging functionality directly into your website or app. With a chat widget, your customers can easily start a conversation with your business without having to leave your website or switch to a separate messaging app." },
  { question: "How does a WhatsApp live chat widget work?", answer: "WhatsApp chat widget works by embedding a small window on your website or app that displays a chat icon or button. When a user clicks on the button, they are taken to a WhatsApp chat window where they can start a conversation with your business." },
  { question: "What is a floating widget for a website?", answer: "A floating widget is a type of chat widget that remains visible on your website as a user scrolls through your content. This ensures that the chat widget is always accessible to your customers, even if they have scrolled past the initial point of contact." },
  { question: "What are click-to-chat links for social media?", answer: "Click-to-chat links are clickable links that allow users to initiate a conversation with your business on WhatsApp directly from social media platforms such as Facebook or Instagram. These links can be added to your social media profiles, posts, or ads to make it easy for customers to contact you." },
  { question: "How can I add a free WhatsApp chat button to social media ads?", answer: "To add chat buttons to social media ads, you can create a click-to-chat link and include it in your ad copy or call-to-action. When users click on the chat button, they will be directed to a WhatsApp chat window where they can start a conversation with your business." },
  { question: "How to add a WhatsApp chat widget to a website?", answer: "To add a WhatsApp chat button you can use a tool like Interakt that provides a code snippet to embed on your website. After customizing your chat widget, you can copy the code snippet and paste it into the HTML code of your website. Once you have saved the changes, the chat widget will be visible on your website, and customers can use it to initiate conversations with your business on WhatsApp." },
];

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function WhatsAppWidget() {
  const [activeEngageTab, setActiveEngageTab] = useState<"Acquire" | "Engage" | "Delight">("Acquire");

  // ── Mobile detection — used ONLY for h1 marginTop ──
  // Desktop (>767px) : marginTop = "0px"   → zero change to desktop
  // Mobile  (≤767px) : marginTop = "110px" → pushes h1 below fixed navbar
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 767);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <>
      <SEO {...pageSEO.whatsappWidget} />
      <style>{globalStyle}</style>
      <div style={{ background: "#070500", color: "#fff8e7", fontFamily: "'Inter',sans-serif", overflowX: "hidden", position: "relative" }}>

        {/* Ambient orbs */}
        <div className="fixed pointer-events-none" style={{ top: "6%", right: "6%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle,rgba(200,146,42,0.07) 0%,transparent 70%)", filter: "blur(70px)", zIndex: 0 }} />
        <div className="fixed pointer-events-none" style={{ bottom: "18%", left: "4%", width: "380px", height: "380px", borderRadius: "50%", background: "radial-gradient(circle,rgba(245,216,122,0.05) 0%,transparent 70%)", filter: "blur(90px)", zIndex: 0 }} />
        <div className="fixed pointer-events-none" style={{ top: "50%", left: "48%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle,rgba(200,146,42,0.03) 0%,transparent 65%)", filter: "blur(100px)", zIndex: 0 }} />

        {/* ══ SECTION 1 — HERO ══
            Desktop: pt-24 md:pt-32 via Tailwind (unchanged)
            Mobile : h1 gets marginTop: "110px" via inline style
                     → pushes heading below the fixed navbar
                     → inline style always wins, cannot be overridden
        */}
        <Section className="relative z-10 pt-24 md:pt-32">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16"style={{ marginTop: 150 }}>

            {/* Left */}
            <div className="flex-1 flex flex-col gap-5 text-center lg:text-left" >
              <Reveal direction="left" delay={0}>
                <h1
                  style={{
                    fontFamily: "'Baskerville','Libre Baskerville',Georgia,serif",
                    fontSize: "clamp(26px,4vw,50px)",
                    lineHeight: 1.2,
                    background: "linear-gradient(135deg,#f5d87a 0%,#fff8e7 40%,#e8b84b 70%,#f5d87a 100%)",
                    backgroundSize: "200% 200%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: "gradientMove 5s ease infinite",
                    marginTop: isMobile ? "110px" : "0px",   /* ← ONLY mobile change */
                  }}
                >
                  Free WhatsApp Chat<br />Widget for your website
                </h1>
              </Reveal>

              <Reveal direction="left" delay={100}>
                <p className="text-sm md:text-base leading-relaxed max-w-md mx-auto lg:mx-0"
                  style={{ color: "rgba(255,248,231,0.55)" }}>
                  The fastest way to connect with your website visitors and convert them into paying customers.
                </p>
              </Reveal>

                        </div>

            {/* Right – hero widget preview */}
            <Reveal direction="right" delay={150} className="flex-1 w-full">
              <div className="relative" style={{ animation: "floatUp 5s ease-in-out infinite" }}>
                <div
                  className="absolute inset-0 rounded-3xl pointer-events-none"
                  style={{ background: "radial-gradient(ellipse,rgba(200,146,42,0.2) 0%,transparent 70%)", filter: "blur(28px)", animation: "pulseGlow 3s ease-in-out infinite" }}
                />
                <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wd1.webp" alt="WhatsApp Chat Widget Preview" className="w-full rounded-2xl"  loading="lazy" decoding="async" />
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ══ SECTION 2 — TRUSTED BY ══ */}
        <Section className="relative z-10">
          <Reveal direction="up" delay={0}>
            <p className="text-center text-xs uppercase tracking-widest mb-5" style={{ color: "rgba(245,216,122,0.38)", fontFamily: "'Inter',sans-serif" }}>
              25,000+ Businesses Across the Globe Trust Interakt
            </p>
          </Reveal>
          <Reveal direction="up" delay={80}>
            <div className="brand-strip">
              {brandData.map((brand, i) => (
                <BrandPill key={brand.name + i} name={brand.name} logoSrc={brand.logo} />
              ))}
            </div>
          </Reveal>
        </Section>

        {/* ══ SECTION 3 — CREATE IN 3 STEPS ══ */}
        <Section className="relative z-10">
          <div className="max-w-6xl mx-auto">
            <Reveal direction="up" delay={0}>
              <h2 className="section-h2 text-center mb-2">Create Whatsapp Chat widget in 3 simple steps</h2>
              <p className="text-center text-sm mb-10" style={{ color: "rgba(255,248,231,0.4)", fontFamily: "'Inter',sans-serif" }}>
                Choose from a wide variety of templates or customize one according to your need.
              </p>
            </Reveal>

            {/* Step 1: Select Template */}
            <Reveal direction="up" delay={80}>
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-5">
                  <StepBadge number={1} />
                  <div>
                    <h3 className="section-h2">Step 1/3 : Select Template</h3>
                    <p style={{ color: "rgba(255,248,231,0.4)", fontFamily: "'Inter',sans-serif", fontSize: "13px" }}>Select a template out of the following options</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <HoverCard className="p-0 overflow-hidden">
                    <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wd2.webp" alt="General Template" className="w-full h-full object-cover"  loading="lazy" decoding="async" />
                  </HoverCard>
                  <HoverCard className="p-0 overflow-hidden">
                    <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wd3.webp" alt="Support Template" className="w-full h-full object-cover"  loading="lazy" decoding="async" />
                  </HoverCard>
                  <HoverCard className="p-0 overflow-hidden">
                    <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wd4.webp" alt="Sales Template" className="w-full h-full object-cover"  loading="lazy" decoding="async" />
                  </HoverCard>
                  <HoverCard className="p-0 overflow-hidden">
                    <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wd5.webp" alt="Feedback Template" className="w-full h-full object-cover"  loading="lazy" decoding="async" />
                  </HoverCard>
                </div>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ══ SECTION 4 — WHY DO YOU NEED THE WIDGET ══ */}
        <Section className="relative z-10">
          <div className="max-w-6xl mx-auto">
            <Reveal direction="up" delay={0}>
              <h2 className="section-h2 text-center mb-2">Why do you need Interakt's free WhatsApp widget?</h2>
              <p className="text-center text-sm mb-10" style={{ color: "rgba(255,248,231,0.4)", fontFamily: "'Inter',sans-serif" }}>
                Discover the key features &amp; benefits of the WhatsApp chat widget
              </p>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {benefits.map((b) => (
                <BenefitCard key={b.title} {...b} />
              ))}
            </div>
          </div>
        </Section>

        {/* ══ SECTION 5 — ACQUIRE / ENGAGE / DELIGHT TABS ══ */}
        <Section className="relative z-10">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-stretch gap-10 lg:gap-16">

            {/* Left – image that changes with tab */}
            <Reveal direction="left" delay={0} className="flex-1">
              <div className="relative h-full">
                <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ background: "radial-gradient(ellipse,rgba(200,146,42,0.15) 0%,transparent 70%)", filter: "blur(24px)" }} />
                <img
                  src={
                    activeEngageTab === "Acquire" ? "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wd6.webp" :
                    activeEngageTab === "Engage"  ? "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wd7.webp" :
                    "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wd8.webp"
                  }
                  alt={`${activeEngageTab} Preview`}
                  className="w-full h-full object-cover rounded-2xl"
                  style={{ transition: "opacity 0.3s ease" }}
                  key={activeEngageTab}
                />
                <div
                  className="absolute bottom-4 right-4 w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg,rgba(0,168,132,0.9),rgba(0,128,100,0.9))", boxShadow: "0 0 20px rgba(0,168,132,0.4)", animation: "pulseGlow 2.5s ease-in-out infinite" }}
                >
                  <svg viewBox="0 0 24 24" fill="white" width="20" height="20">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
              </div>
            </Reveal>

            {/* Right – tabs + content */}
            <Reveal direction="right" delay={100} className="flex-1">
              <div className="flex flex-col gap-6">
                <div className="flex gap-2 flex-wrap">
                  {(["Acquire", "Engage", "Delight"] as const).map((tab) => (
                    <TabBtn key={tab} label={tab} active={activeEngageTab === tab} onClick={() => setActiveEngageTab(tab)} />
                  ))}
                </div>
                <div key={activeEngageTab} style={{ animation: "fadeIn 0.4s ease" }}>
                  <h2 className="section-h2 mb-2">{engageTabContent[activeEngageTab].heading}</h2>
                  <p style={{ color: "rgba(255,248,231,0.5)", fontFamily: "'Inter',sans-serif", fontSize: "14px", marginBottom: "20px" }}>
                    {engageTabContent[activeEngageTab].subheading}
                  </p>
                  <div className="flex flex-col gap-3">
                    {engageTabContent[activeEngageTab].points.map((pt, i) => (
                      <CheckItem key={i} text={pt} />
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ══ SECTION 6 — FREE LINK + QR CODE GENERATOR ══ */}
        <Section className="relative z-10">
          <div className="max-w-6xl mx-auto">
            <Reveal direction="up" delay={0}>
              <h2 className="section-h2 text-center mb-2">
                Struggling to create a WhatsApp chat link or QR Code? Now create<br className="hidden md:block" /> them for free with Interakt
              </h2>
              <p className="text-center text-sm mb-10" style={{ color: "rgba(255,248,231,0.4)", fontFamily: "'Inter',sans-serif" }}>
                No technical knowledge needed — just enter your number and get shareable links and scannable QR codes in seconds.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Reveal direction="left" delay={0}>
                <HoverCard className="p-6 flex flex-col gap-4 h-full">
                  <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wd9.webp" alt="WhatsApp Link Generator UI" className="w-full rounded-2xl"  loading="lazy" decoding="async" />
                  <h3 className="section-h2">Free WhatsApp link generator</h3>
                  <p style={{ color: "rgba(255,248,231,0.52)", fontFamily: "'Inter',sans-serif", fontSize: "14px", lineHeight: 1.72 }}>
                    Create free WhatsApp chat links for your WhatsApp Business number and share them on your Instagram bio, Facebook and Twitter feeds, and Initiate conversations with customers to drive conversions.
                  </p>
                </HoverCard>
              </Reveal>

              <Reveal direction="right" delay={100}>
                <HoverCard className="p-6 flex flex-col gap-4 h-full">
                  <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wd10.webp" alt="WhatsApp QR Code Generator UI" className="w-full rounded-2xl"  loading="lazy" decoding="async" />
                  <h3 className="section-h2">Free WhatsApp QR code generator</h3>
                  <p style={{ color: "rgba(255,248,231,0.52)", fontFamily: "'Inter',sans-serif", fontSize: "14px", lineHeight: 1.72 }}>
                    Generate a free WhatsApp QR code for your WhatsApp Business number and use it on your social media images, sticker decks, websites, printed material or anywhere for your customers to scan and directly initiate a chat on WhatsApp.
                  </p>
                </HoverCard>
              </Reveal>
            </div>
          </div>
        </Section>

        {/* ══ SECTION 7 — FAQ ══ */}
        <Section className="relative z-10">
          <div className="max-w-6xl mx-auto">
            <Reveal direction="up" delay={0}>
              <h2 className="section-h2 text-center mb-2">
                Have more questions about the WhatsApp chat widget?<br className="hidden md:block" /> We have got you covered
              </h2>
              <p className="text-center text-sm mb-10" style={{ color: "rgba(255,248,231,0.38)", fontFamily: "'Inter',sans-serif" }}>
                Everything you need to know about the WhatsApp widget
              </p>
            </Reveal>

            <Reveal direction="up" delay={80} className="max-w-3xl mx-auto">
              <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.016)", border: "1px solid rgba(200,146,42,0.17)" }}>
                <div className="px-6 py-2">
                  {faqData.map((item) => (
                    <FaqItem key={item.question} question={item.question} answer={item.answer} />
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </Section>
<ContactUsForm/>
        {/* Bottom accent line */}
        <div style={{ height: "2px", background: "linear-gradient(90deg,transparent,rgba(200,146,42,0.5) 40%,rgba(245,216,122,0.7) 50%,rgba(200,146,42,0.5) 60%,transparent)" }} />
      </div>
    </>
  );
}