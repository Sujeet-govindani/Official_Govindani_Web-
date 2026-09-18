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
}
interface FeatureRowProps {
  label?: string;
  title: string;
  desc: string;
  image: string;
  imageAlt: string;
  reverse?: boolean;
  badge?: string;
  delay?: number;
}
interface FaqItemProps {
  question: string;
  answer: string;
}
interface BrandPillProps {
  name: string;
  logoSrc?: string;
}
interface AppImageProps {
  src?: string;
  alt: string;
  className?: string;
}

// ─── Scroll Reveal Hook ───────────────────────────────────────────────────────
function useScrollReveal(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
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
    up: "translateY(52px)",
    left: "translateX(-52px)",
    right: "translateX(52px)",
    fade: "none",
  };
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : transforms[direction],
      transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      willChange: "opacity, transform",
    }}>
      {children}
    </div>
  );
}

// ─── Animated Section Heading ─────────────────────────────────────────────────
function AnimatedHeading({
  children,
  delay = 0,
  centered = true,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  centered?: boolean;
  className?: string;
}) {
  const { ref, visible } = useScrollReveal(0.1);
  return (
    <div ref={ref} className={`${centered ? "text-center" : ""} ${className}`}>
      <h2
        className="section-heading gold-text inline-block relative overflow-hidden"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(36px)",
          transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
          willChange: "opacity, transform",
        }}
      >
        {children}
        <span
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%)",
            transform: visible ? "translateX(200%)" : "translateX(-100%)",
            transition: visible
              ? `transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay + 120}ms`
              : "none",
            pointerEvents: "none",
          }}
        />
      </h2>
    </div>
  );
}

// ─── Gold Button ─────────────────────────────────────────────────────────────
function GoldButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      className={`relative overflow-hidden rounded-full font-semibold tracking-wide transition-all duration-300 ${className}`}
      style={{
        background: hovered
          ? "linear-gradient(135deg,#f5d87a 0%,#c8922a 50%,#e8b84b 100%)"
          : "linear-gradient(135deg,#c8922a 0%,#f5d87a 50%,#e8b84b 100%)",
        color: "#0a0800",
        boxShadow: hovered ? "0 0 28px rgba(245,216,122,0.55)" : "0 0 14px rgba(200,146,42,0.35)",
        transform: hovered ? "scale(1.05)" : "scale(1)",
        padding: "10px 28px",
        fontSize: "14px",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <span className="absolute inset-0 pointer-events-none" style={{
          background: "linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.35) 50%,transparent 60%)",
          animation: "shimmer 0.65s ease forwards",
        }} />
      )}
      {children}
    </button>
  );
}

// ─── Hover Card ───────────────────────────────────────────────────────────────
function HoverCard({ children, className = "" }: HoverCardProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`relative rounded-2xl overflow-hidden transition-all duration-500 ${className}`}
      style={{
        border: hovered ? "1px solid rgba(245,216,122,0.65)" : "1px solid rgba(200,146,42,0.22)",
        boxShadow: hovered
          ? "0 0 38px rgba(245,216,122,0.15), 0 10px 36px rgba(0,0,0,0.6)"
          : "0 4px 24px rgba(0,0,0,0.45)",
        background: hovered
          ? "linear-gradient(145deg,rgba(245,216,122,0.07) 0%,rgba(14,10,2,0.97) 100%)"
          : "linear-gradient(145deg,rgba(255,255,255,0.03) 0%,rgba(8,6,1,0.97) 100%)",
        transform: hovered ? "translateY(-5px) scale(1.01)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <div className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{ background: "radial-gradient(ellipse at 50% 0%,rgba(245,216,122,0.1) 0%,transparent 70%)" }} />
      )}
      {children}
    </div>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`px-4 sm:px-8 lg:px-16 xl:px-24 ${className}`} style={{ paddingTop: "clamp(80px, 8vw, 110px)", paddingBottom: "clamp(24px, 4vw, 40px)" }}>
      {children}
    </section>
  );
}

// ─── App Image ────────────────────────────────────────────────────────────────
function AppImage({ src, alt, className = "" }: AppImageProps) {
  if (src) {
    return (
      <img src={src} alt={alt} className={`w-full rounded-2xl ${className}`}
        style={{ display: "block", objectFit: "contain", objectPosition: "center" }} />
    );
  }
  return (
    <div className={`rounded-2xl overflow-hidden flex items-center justify-center min-h-[200px] ${className}`}
      style={{ background: "linear-gradient(135deg,rgba(200,146,42,0.1) 0%,rgba(245,216,122,0.04) 100%)", border: "1px dashed rgba(200,146,42,0.25)" }}>
      <div className="flex flex-col items-center gap-2 opacity-35">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(245,216,122,0.7)" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21,15 16,10 5,21" />
        </svg>
        <span style={{ color: "rgba(245,216,122,0.45)", fontSize: "11px", fontFamily: "'Inter',sans-serif" }}>{alt}</span>
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
        <img src={logoSrc} alt={name} style={{ height: "32px", width: "auto", maxWidth: "110px", objectFit: "contain", display: "block" }} />
      ) : (
        <span style={{ fontFamily: "'Baskerville','Libre Baskerville',Georgia,serif", fontSize: "14px", letterSpacing: "0.04em", color: hovered ? "#f5d87a" : "rgba(245,216,122,0.75)", whiteSpace: "nowrap" }}>
          {name}
        </span>
      )}
    </div>
  );
}

// ─── Feature Row ─────────────────────────────────────────────────────────────
function FeatureRow({ label, title, desc, image, imageAlt, reverse = false, badge, delay = 0 }: FeatureRowProps) {
  return (
    <div className={`flex flex-col ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-8 lg:gap-14`}>
      <Reveal direction={reverse ? "right" : "left"} delay={delay} className="flex-1 w-full">
        <div className="relative">
          {badge && (
            <span className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-xs font-semibold"
              style={{ background: "linear-gradient(135deg,#c8922a,#f5d87a)", color: "#0a0800", fontFamily: "'Inter',sans-serif", boxShadow: "0 0 12px rgba(200,146,42,0.4)" }}>
              {badge}
            </span>
          )}
          <AppImage src={image} alt={imageAlt} />
        </div>
      </Reveal>

      <Reveal direction={reverse ? "left" : "right"} delay={delay + 120} className="flex-1 w-full">
        <div className={`flex flex-col gap-4 ${reverse ? "lg:pr-4" : "lg:pl-4"}`}>
          {label && (
            <span className="text-xs uppercase tracking-widest" style={{ color: "rgba(245,216,122,0.5)", fontFamily: "'Inter',sans-serif" }}>{label}</span>
          )}
          <h3 className="relative overflow-hidden inline-block" style={{
            fontFamily: "'Baskerville','Libre Baskerville',Georgia,serif",
            fontSize: "18px", lineHeight: 1.4,
            background: "linear-gradient(135deg,#f5d87a 0%,#fff8e7 55%,#c8922a 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", margin: 0,
          }}>
            {title}
          </h3>
          <p style={{ color: "rgba(255,248,231,0.58)", fontFamily: "'Inter',sans-serif", fontSize: "15px", lineHeight: 1.75, margin: 0 }}>
            {desc}
          </p>
        </div>
      </Reveal>
    </div>
  );
}

// ─── FAQ Item ─────────────────────────────────────────────────────────────────
function FaqItem({ question, answer }: FaqItemProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="cursor-pointer transition-all duration-300"
      style={{ borderBottom: "1px solid rgba(200,146,42,0.18)" }}
      onClick={() => setOpen(!open)}>
      <div className="flex justify-between items-center py-4 px-1 gap-4">
        <span style={{
          fontFamily: "'Baskerville','Libre Baskerville',Georgia,serif",
          fontSize: "18px",
          background: "linear-gradient(135deg,#f5d87a 0%,#fff8e7 50%,#c8922a 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1.4,
        }}>
          {question}
        </span>
        <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: open ? "linear-gradient(135deg,#c8922a,#f5d87a)" : "rgba(200,146,42,0.15)",
            color: open ? "#0a0800" : "#f5d87a",
            transform: open ? "rotate(45deg)" : "none",
            fontSize: "20px", fontWeight: 300, lineHeight: 1,
          }}>
          +
        </span>
      </div>
      <div style={{ maxHeight: open ? "300px" : "0", overflow: "hidden", transition: "max-height 0.45s cubic-bezier(0.16,1,0.3,1)" }}>
        <p style={{ padding: "0 4px 16px", fontSize: "14px", lineHeight: 1.75, color: "rgba(245,216,122,0.58)", fontFamily: "'Inter',sans-serif", margin: 0 }}>
          {answer}
        </p>
      </div>
    </div>
  );
}

// ─── Campaign Card ────────────────────────────────────────────────────────────
function CampaignCard({ title, desc, delay, image }: { title: string; desc: string; delay: number; image?: string }) {
  return (
    <Reveal delay={delay} direction="up">
      <HoverCard className="p-6 flex flex-col gap-4 h-full">
        {image ? (
          <img src={image} alt={title} className="w-full rounded-xl" style={{ objectFit: "contain", display: "block" }} />
        ) : (
          <AppImage alt={title} />
        )}
        <h4 style={{
          fontFamily: "'Baskerville','Libre Baskerville',Georgia,serif",
          fontSize: "18px",
          background: "linear-gradient(135deg,#f5d87a 0%,#fff8e7 55%,#c8922a 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          margin: 0, lineHeight: 1.35,
        }}>
          {title}
        </h4>
        <p style={{ color: "rgba(255,248,231,0.55)", fontFamily: "'Inter',sans-serif", fontSize: "14px", lineHeight: 1.7, margin: 0, flex: 1 }}>
          {desc}
        </p>
      </HoverCard>
    </Reveal>
  );
}

// ─── Global Styles ────────────────────────────────────────────────────────────
const globalStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap');

  @keyframes shimmer      { 0%   { transform:translateX(-100%); } 100% { transform:translateX(200%);  } }
  @keyframes floatUp      { 0%,100% { transform:translateY(0px); } 50% { transform:translateY(-8px); } }
  @keyframes pulseGlow    { 0%,100% { opacity:0.6; }              50% { opacity:1;                   } }
  @keyframes gradientMove { 0% { background-position:0% 50%;   } 50% { background-position:100% 50%;} 100% { background-position:0% 50%; } }
  @keyframes headingSweep { 0%   { transform: translateX(-110%); opacity: 0; } 20%  { opacity: 1; } 100% { transform: translateX(110%);  opacity: 0; } }
  @keyframes fadeRise     { from { opacity: 0; transform: translateY(22px); } to   { opacity: 1; transform: translateY(0);    } }
  @keyframes scanLine     { 0%   { transform: translateX(-100%); opacity: 0; } 10%  { opacity: 0.6; } 90%  { opacity: 0.6; } 100% { transform: translateX(100%);  opacity: 0; } }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  ::selection { background: rgba(200,146,42,0.3); color: #fff8e7; }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: #060400; }
  ::-webkit-scrollbar-thumb { background: linear-gradient(180deg,#c8922a,#f5d87a); border-radius: 99px; }

  .gold-text {
    background: linear-gradient(135deg,#f5d87a 0%,#fff8e7 50%,#c8922a 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .section-heading {
    font-family: 'Baskerville','Libre Baskerville',Georgia,serif;
    font-size: 18px; line-height: 1.45;
  }
  .brand-strip {
    display: flex; flex-direction: row; flex-wrap: nowrap; align-items: center;
    gap: 20px; overflow-x: auto; overflow-y: visible; padding-bottom: 4px;
    -webkit-overflow-scrolling: touch; scrollbar-width: none;
  }
  .brand-strip::-webkit-scrollbar { display: none; }

  .section-enter { position: relative; overflow: hidden; }
  .section-enter::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(245,216,122,0.5) 40%, rgba(255,255,255,0.7) 50%, rgba(245,216,122,0.5) 60%, transparent);
    transform: translateX(-100%);
    animation: scanLine 1.4s cubic-bezier(0.16,1,0.3,1) forwards;
    z-index: 1; pointer-events: none;
  }
`;

// ─── DATA ─────────────────────────────────────────────────────────────────────
const faqData = [
  { question: "What is a WhatsApp Commerce?", answer: "WhatsApp Commerce is a business strategy that leverages the WhatsApp platform to connect with customers, showcase products, and facilitate transactions. WhatsApp commerce grows your businesses to engage with their audience, answer queries, and offer a seamless shopping experience within the WhatsApp messaging app." },
  { question: "How can I categorize my products into WhatsApp Collections?", answer: "To categorize products into WhatsApp Collections, you can use WhatsApp's catalog feature. Simply organize your products into different catalog categories, making it easier for customers to browse and find what they need." },
  { question: "What is a WhatsApp Catalog, and how can I create one?", answer: "A WhatsApp Catalog is a tailored product showcase that you can create to highlight specific items or promotions. You can create one by using your WhatsApp Business account." },
  { question: "How can I set up checkout workflows on WhatsApp?", answer: "To set up automated checkout workflows, it is mandatory to configure WhatsApp Business API to your WhatsApp Business account. WhatsApp checkout workflow can guide customers through the checkout process, provide order updates, and even collect payments seamlessly." },
  { question: "Can automated checkout workflows on WhatsApp handle payment collection?", answer: "Yes, many automated checkout solutions for WhatsApp are designed to collect payments securely. They can integrate with payment gateways to facilitate seamless transactions." },
  { question: "How do I share order updates automatically through WhatsApp?", answer: "With automated checkout workflows, you can configure the system to place order on WhatsApp, get order updates, including shipping details and delivery notifications, to customers." },
];

const brandData = [
  { name: "wc1",  logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wc1.webp"  },
  { name: "wc2",  logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wc2.webp"  },
  { name: "wc3",  logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wc3.webp"  },
  { name: "wc4",  logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wc4.webp"  },
  { name: "wc5",  logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wc5.webp"  },
  { name: "wc6",  logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wc6.webp"  },
  { name: "wc7",  logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wc7.webp"  },
  { name: "wc8",  logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wc8.webp"  },
  { name: "wc9",  logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wc9.webp"  },
  { name: "wc10", logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wc10.webp" },
];

const campaignData = [
  {
    title: "Catalogs as part of One-time and ongoing Campaigns",
    desc: "You can send products and product catalogs as part of one time or ongoing campaigns from your 'Templates' section. You can even A/B test catalogues with your audience. Simply create or browse through the catalog in the templates menu.",
    image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wc17.webp",
    delay: 0,
  },
  {
    title: "Add catalogs to auto-replies",
    desc: "You can also include products and catalogs as part of auto-replies to your customers. Use the auto-reply catalog feature to create automated catalog replies for every possible customer touchpoint. You can also create catalog auto-replies based on keywords and customer attributes.",
    image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wc18.webp",
    delay: 120,
  },
];

const carouselSlides = [
  { image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wc19.webp", imageAlt: "Quick query resolution",           title: "Quick query resolution",           desc: "Enable customers to seek product details, from availability to sizes and colours, all within the convenience of WhatsApp. This facilitates rapid and direct communication for a seamless shopping experience." },
  { image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wc20.webp", imageAlt: "Track Orders",                     title: "Track Orders",                     desc: "Facilitate customers in placing orders directly within WhatsApp, enabling them to specify product quantities and preferences with ease. Simplify the end-to-end shopping experience by eliminating the necessity to visit separate websites." },
  { image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wc21.webp", imageAlt: "Collect Payment",                  title: "Collect Payment",                  desc: "Empower customers to purchase and complete transactions right in the WhatsApp chat window. Integrate payment gateways seamlessly, including WhatsApp Pay." },
  { image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wc24.webp", imageAlt: "Share Order Updates",              title: "Share Order Updates",              desc: "Stay connected with your customers & offer instant order updates and shipping status notifications. Ensure a hassle-free ordering experience and round-the-clock query resolution with intelligent automation solutions." },
  { image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wc23.webp", imageAlt: "Personalised Shopping Experience", title: "Personalised Shopping Experience", desc: "Optimise your communication strategy to deliver personalised customer interactions, including customised product recommendations based on past purchases and browsing habits to boost customer satisfaction & retention." },
];

// ─── Animated Section Wrapper ─────────────────────────────────────────────────
function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useScrollReveal(0.06);
  return (
    <section
      ref={ref}
      className={`px-4 sm:px-8 lg:px-16 xl:px-24 ${visible ? "section-enter" : ""} ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(40px)",
        transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
        willChange: "opacity, transform",
      }}
    >
      {children}
    </section>
  );
}

// ─── Carousel Card ────────────────────────────────────────────────────────────
function CarouselCard({ slide, perView }: { slide: typeof carouselSlides[0]; perView: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="flex-shrink-0 flex flex-col rounded-2xl overflow-hidden transition-all duration-500"
      style={{
        width: `calc((100% - ${(perView - 1) * 20}px) / ${perView})`,
        border: hovered ? "1px solid rgba(245,216,122,0.55)" : "1px solid rgba(200,146,42,0.2)",
        background: hovered
          ? "linear-gradient(145deg,rgba(245,216,122,0.07) 0%,rgba(14,10,2,0.97) 100%)"
          : "linear-gradient(145deg,rgba(255,255,255,0.025) 0%,rgba(8,6,1,0.97) 100%)",
        boxShadow: hovered
          ? "0 0 32px rgba(245,216,122,0.12), 0 8px 32px rgba(0,0,0,0.55)"
          : "0 4px 22px rgba(0,0,0,0.45)",
        transform: hovered ? "translateY(-5px)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {slide.image ? (
        <img src={slide.image} alt={slide.imageAlt} className="w-full"
          style={{ display: "block", objectFit: "contain", objectPosition: "center" }} />
      ) : (
        <div className="flex flex-col items-center gap-3 py-10" style={{ opacity: 0.3 }}>
          <svg width="56" height="90" viewBox="0 0 56 90" fill="none" stroke="rgba(245,216,122,0.9)" strokeWidth="2">
            <rect x="2" y="2" width="52" height="86" rx="8" />
            <line x1="20" y1="8" x2="36" y2="8" strokeWidth="3" strokeLinecap="round" />
            <circle cx="28" cy="82" r="3" />
          </svg>
          <span style={{ color: "rgba(245,216,122,0.6)", fontSize: "10px", fontFamily: "'Inter',sans-serif", textAlign: "center" }}>
            {slide.imageAlt}
          </span>
        </div>
      )}
      <div className="flex flex-col gap-3 p-5">
        <h4 style={{
          fontFamily: "'Baskerville','Libre Baskerville',Georgia,serif",
          fontSize: "18px",
          background: "linear-gradient(135deg,#f5d87a 0%,#fff8e7 55%,#c8922a 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          margin: 0, lineHeight: 1.35,
        }}>
          {slide.title}
        </h4>
        <p style={{ color: "rgba(255,248,231,0.55)", fontFamily: "'Inter',sans-serif", fontSize: "13px", lineHeight: 1.7, margin: 0 }}>
          {slide.desc}
        </p>
      </div>
    </div>
  );
}

// ─── Section 11 Carousel ──────────────────────────────────────────────────────
function Section11Carousel() {
  const [current, setCurrent] = useState(0);
  const [perView, setPerView] = useState(3);
  const total = carouselSlides.length;

  useEffect(() => {
    const update = () => setPerView(window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, total - perView);
  const prev = () => setCurrent((c) => Math.max(0, c - 1));
  const next = () => setCurrent((c) => Math.min(maxIndex, c + 1));
  const pageCount = maxIndex + 1;

  return (
    <AnimatedSection>
      <AnimatedHeading delay={0}>
        Leverage WhatsApp Commerce Start Your Online Store Today!
      </AnimatedHeading>
      <Reveal direction="up" delay={80}>
        <p className="text-center text-sm mb-8 max-w-xl mx-auto mt-3"
          style={{ color: "rgba(255,248,231,0.48)", fontFamily: "'Inter',sans-serif" }}>
          Everything you need to run a full commerce experience inside WhatsApp from discovery to delivery.
        </p>
      </Reveal>

      <Reveal direction="up" delay={150}>
        <div className="max-w-6xl mx-auto relative">
          <div style={{ overflow: "hidden" }}>
            <div style={{
              display: "flex", gap: "20px",
              transform: `translateX(calc(-${current} * (100% / ${perView} + 20px / ${perView} * (${perView} - 1))))`,
              transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
              willChange: "transform",
            }}>
              {carouselSlides.map((slide, i) => <CarouselCard key={i} slide={slide} perView={perView} />)}
            </div>
          </div>
          <button onClick={prev} disabled={current === 0}
            className="absolute top-1/2 -left-5 md:-left-8 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center z-10 transition-all duration-300"
            style={{ background: current === 0 ? "rgba(200,146,42,0.08)" : "linear-gradient(135deg,#c8922a,#f5d87a)", border: "1px solid rgba(200,146,42,0.3)", color: current === 0 ? "rgba(245,216,122,0.3)" : "#0a0800", cursor: current === 0 ? "not-allowed" : "pointer", fontSize: "20px", fontWeight: 600, lineHeight: 1 }}>
            ‹
          </button>
          <button onClick={next} disabled={current >= maxIndex}
            className="absolute top-1/2 -right-5 md:-right-8 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center z-10 transition-all duration-300"
            style={{ background: current >= maxIndex ? "rgba(200,146,42,0.08)" : "linear-gradient(135deg,#c8922a,#f5d87a)", border: "1px solid rgba(200,146,42,0.3)", color: current >= maxIndex ? "rgba(245,216,122,0.3)" : "#0a0800", cursor: current >= maxIndex ? "not-allowed" : "pointer", fontSize: "20px", fontWeight: 600, lineHeight: 1 }}>
            ›
          </button>
        </div>
      </Reveal>

      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: pageCount }).map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            style={{ width: i === current ? "24px" : "8px", height: "8px", borderRadius: "999px", background: i === current ? "linear-gradient(90deg,#c8922a,#f5d87a)" : "rgba(200,146,42,0.28)", border: "none", cursor: "pointer", transition: "all 0.3s ease", padding: 0 }} />
        ))}
      </div>
    </AnimatedSection>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export default function WhatsAppCommerce() {

  // ── Mobile detection — used ONLY for h1 marginTop ──
  // Desktop (>767px) : marginTop = "0px"  → zero change to desktop
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
      <SEO {...pageSEO.whatsappCommerce} />
      <style>{globalStyle}</style>

      <div style={{ background: "#070500", color: "#fff8e7", fontFamily: "'Inter',sans-serif", overflowX: "hidden", position: "relative" }}>

        {/* Ambient orbs */}
        <div className="fixed pointer-events-none" style={{ top: "8%", right: "8%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle,rgba(200,146,42,0.07) 0%,transparent 70%)", filter: "blur(70px)", zIndex: 0 }} />
        <div className="fixed pointer-events-none" style={{ bottom: "20%", left: "4%", width: "380px", height: "380px", borderRadius: "50%", background: "radial-gradient(circle,rgba(245,216,122,0.05) 0%,transparent 70%)", filter: "blur(90px)", zIndex: 0 }} />
        <div className="fixed pointer-events-none" style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "700px", height: "700px", borderRadius: "50%", background: "radial-gradient(circle,rgba(200,146,42,0.03) 0%,transparent 65%)", filter: "blur(100px)", zIndex: 0 }} />

        {/* ══ SECTION 1 — HERO ══
            Desktop: pt-24 md:pt-36 (unchanged via Tailwind classes)
            Mobile : h1 gets marginTop: "110px" via inline style
                     → pushes heading below the fixed navbar
                     → inline style always wins, cannot be overridden
        */}
        <AnimatedSection className="relative z-10 pt-24 md:pt-36 pb-8 md:pb-14">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16" style={{ marginTop: 150 }}>
            <div className="flex-1 flex flex-col gap-5 text-center lg:text-left">

              {/* Hero h1 — marginTop on mobile only, 0 on desktop */}
              <Reveal direction="left" delay={80}>
                <h1
                  className="relative overflow-hidden inline-block"
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
                  Setup Online Store &amp;<br />
                  Start Your WhatsApp<br />
                  Commerce Journey!
                </h1>
              </Reveal>

              <Reveal direction="left" delay={180}>
                <p className="text-sm md:text-base leading-relaxed max-w-md mx-auto lg:mx-0" style={{ color: "rgba(255,248,231,0.55)" }}>
                  Transform the way your customers shop. Build a WhatsApp store, showcase products with rich catalogues, automate checkout flows, and drive more revenue directly on WhatsApp.
                </p>
              </Reveal>

            
            </div>

            <Reveal direction="right" delay={160} className="flex-1 w-full">
              <div className="relative w-full" style={{ animation: "floatUp 5s ease-in-out infinite" }}>
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse,rgba(200,146,42,0.18) 0%,transparent 70%)", filter: "blur(28px)", animation: "pulseGlow 3s ease-in-out infinite" }} />
                <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Hero-image.gif" alt="Hero image" className="w-full rounded-2xl"
                  style={{ objectFit: "contain", display: "block" }} />
              </div>
            </Reveal>
          </div>
        </AnimatedSection>

        {/* ══ SECTION 2 — TRUSTED BY ══ */}
        <AnimatedSection className="relative z-10">
          <Reveal direction="up" delay={0}>
            <p className="text-center text-xs uppercase tracking-widest mb-5" style={{ color: "rgba(245,216,122,0.38)", fontFamily: "'Inter',sans-serif" }}>
              25,000+ Businesses Across the Globe Trust 
            </p>
          </Reveal>
          <Reveal direction="up" delay={80}>
            <div className="brand-strip justify-center">
              {brandData.map((brand, i) => (
                <Reveal key={brand.name} direction="fade" delay={i * 40}>
                  <BrandPill name={brand.name} logoSrc={brand.logo} />
                </Reveal>
              ))}
            </div>
          </Reveal>
        </AnimatedSection>

        {/* ══ SECTION 3 — NATIVE PAYMENTS ══ */}
        <AnimatedSection className="relative z-10">
          <div className="max-w-7xl mx-auto">
            <FeatureRow title="Accept Native Payments on WhatsApp"
              desc="Streamline the checkout experience. Receive payments directly inside WhatsApp — no redirects, no friction. Customers can browse products, add to cart, and complete payment without ever leaving the chat. Supports UPI, cards, net banking, and more."
              image="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wc11.webp" imageAlt="Native Payments on WhatsApp" reverse={false} delay={0} />
          </div>
        </AnimatedSection>

        {/* ══ SECTION 4 — CONVERSATIONAL FLOWS ══ */}
        <AnimatedSection className="relative z-10">
          <div className="max-w-7xl mx-auto">
            <FeatureRow title="Create Conversational Flows that Convert"
              desc="Create automated conversation flows to guide your customers from discovery to purchase. The no-code Flows builder helps you design interactive journeys that nurture leads and drive conversions — automatically, 24/7."
              image="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wc12.webp" imageAlt="Conversational Flows" reverse={true} delay={0} />
          </div>
        </AnimatedSection>

        {/* ══ SECTION 5 — AUTOMATED WORKFLOWS ══ */}
        <AnimatedSection className="relative z-10">
          <div className="max-w-7xl mx-auto">
            <FeatureRow title="Set up Automated Workflows w/ Your WhatsApp Commerce Store"
              desc="Automate key e-commerce interactions on WhatsApp for shopping and checkout flows. Send payment confirmation, order status updates, and shipping updates directly to customers on WhatsApp."
              image="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wc13.webp" imageAlt="Automated Workflows" reverse={false} delay={0} />
          </div>
        </AnimatedSection>

        {/* ══ SECTION 6 — CATEGORIZE PRODUCTS ══ */}
        <AnimatedSection className="relative z-10">
          <div className="max-w-7xl mx-auto">
            <FeatureRow title="Categorize Products into Collections"
              desc="Organise your products into neat WhatsApp catalogue collections or effectively your catalogue. Create collections to make purchasing smoother and make browsing products in your e-commerce easy."
              image="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wc14.webp" imageAlt="Product Collections" reverse={true} delay={0} />
          </div>
        </AnimatedSection>

        {/* ══ SECTION 7 — CUSTOM CATALOGS ══ */}
        <AnimatedSection className="relative z-10">
          <div className="max-w-7xl mx-auto">
            <FeatureRow title="Start WhatsApp Store Create Custom Catalogs"
              desc="With a WhatsApp store, you can be able to reach your target audience with time-relevant and personalised custom catalogs from the most comprehensive inbox tool in your business."
              image="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wc15.webp" imageAlt="Custom Catalogs" reverse={false} delay={0} />
          </div>
        </AnimatedSection>

        {/* ══ SECTION 8 — SEND CATALOGS ══ */}
        <AnimatedSection className="relative z-10">
          <div className="max-w-7xl mx-auto" style={{ marginTop: 150 }}>
            <FeatureRow title="Send catalogs as part of campaigns & auto-replies"
              desc="With Interakt, you can now send product catalogs directly from within your WhatsApp campaigns or auto-replies. This means now you can now seamlessly send product catalogs as part of your campaigns or auto replies."
              image="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wc16.webp" imageAlt="Send Catalogs in Campaigns" reverse={true} delay={0} />
          </div>
        </AnimatedSection>

        {/* ══ SECTION 9 — SHOPIFY BANNER ══ */}
        <AnimatedSection className="relative z-10" >
          <Reveal direction="up" delay={0}>
            <div className="rounded-2xl overflow-hidden relative px-8 md:px-14 py-8 flex flex-col md:flex-row items-center justify-between gap-6" 
              style={{ background: "linear-gradient(135deg,rgba(200,146,42,0.18) 0%,rgba(14,10,2,0.97) 50%,rgba(200,146,42,0.12) 100%)", border: "1px solid rgba(200,146,42,0.3)", boxShadow: "0 0 60px rgba(200,146,42,0.08)" }}>
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg,transparent,#f5d87a 50%,transparent)" }} />
              <p className="text-sm md:text-base leading-relaxed max-w-2xl" style={{ color: "rgba(255,248,231,0.65)", fontFamily: "'Inter',sans-serif" }}>
                If you use a Shopify Merchant, build your Sales Journey! Start from the Interakt App Store or check out our dedicated{" "}
                <span style={{ color: "#f5d87a" }}>Shopify page</span> to discover more features and upgrade your WhatsApp sales strategy!
              </p>
            </div>
          </Reveal>
        </AnimatedSection>

        {/* ══ SECTION 10 — CAMPAIGN CARDS ══ */}
        <AnimatedSection className="relative z-10">
          <AnimatedHeading delay={0}>Send catalogs as part of campaigns &amp; auto-replies</AnimatedHeading>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {campaignData.map((campaign) => (
              <CampaignCard key={campaign.title} title={campaign.title} desc={campaign.desc} image={campaign.image} delay={campaign.delay} />
            ))}
          </div>
        </AnimatedSection>

        {/* ══ SECTION 11 — CAROUSEL ══ */}
        <Section11Carousel />

        {/* ══ SECTION 12 — FAQ ══ */}
        <AnimatedSection className="relative z-10">
          <AnimatedHeading delay={0}>FAQs</AnimatedHeading>
          <Reveal direction="up" delay={100} className="max-w-3xl mx-auto mt-6">
            <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.018)", border: "1px solid rgba(200,146,42,0.18)" }}>
              <div className="px-6 py-2">
                {faqData.map((item, i) => (
                  <Reveal key={item.question} direction="up" delay={i * 60}>
                    <FaqItem question={item.question} answer={item.answer} />
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </AnimatedSection>
<ContactUsForm/>
        {/* Bottom accent line */}
        <div style={{ height: "2px", background: "linear-gradient(90deg,transparent,rgba(200,146,42,0.5) 40%,rgba(245,216,122,0.7) 50%,rgba(200,146,42,0.5) 60%,transparent)" }} />
      </div>
    </>
  );
}