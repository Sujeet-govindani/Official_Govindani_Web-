import ContactUsForm from "@/pages/ContactUsForm";
import { useEffect, useRef, useState } from "react";
import SEO from "@/components/SEO";
import { pageSEO } from "@/seo/pageSEO";

// ─── Scroll Animation Hook ───────────────────────────────────────────────────
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

// ─── Reveal Wrapper ───────────────────────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "fade";
  className?: string;
}) {
  const { ref, visible } = useScrollReveal();
  const translate =
    direction === "up" ? "translateY(40px)" :
    direction === "left" ? "translateX(-40px)" :
    direction === "right" ? "translateX(40px)" : "none";

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : translate,
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Gold Gradient Text ───────────────────────────────────────────────────────
function GoldText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={className}
      style={{
        background: "linear-gradient(135deg, #f5d87a 0%, #e8b84b 30%, #fff8e7 55%, #c8922a 80%, #f5d87a 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {children}
    </span>
  );
}

// ─── Section Wrapper ──────────────────────────────────────────────────────────
function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`px-4 sm:px-6 lg:px-12 xl:px-20 ${className}`} style={{ paddingTop: "clamp(80px, 8vw, 110px)", paddingBottom: "clamp(32px, 4vw, 48px)" }}>
      {children}
    </section>
  );
}

// ─── Hover Card ───────────────────────────────────────────────────────────────
function HoverCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`relative rounded-2xl overflow-hidden transition-all duration-500 ${className}`}
      style={{
        border: hovered
          ? "1px solid rgba(245,216,122,0.7)"
          : "1px solid rgba(200,146,42,0.25)",
        boxShadow: hovered
          ? "0 0 35px rgba(245,216,122,0.18), 0 8px 32px rgba(0,0,0,0.55)"
          : "0 4px 20px rgba(0,0,0,0.4)",
        background: hovered
          ? "linear-gradient(145deg, rgba(245,216,122,0.08) 0%, rgba(18,14,6,0.95) 100%)"
          : "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(10,8,2,0.95) 100%)",
        transform: hovered ? "translateY(-4px) scale(1.01)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            background: "radial-gradient(ellipse at 50% 0%, rgba(245,216,122,0.12) 0%, transparent 70%)",
          }}
        />
      )}
      {children}
    </div>
  );
}

// ─── Shimmer Button ───────────────────────────────────────────────────────────
function GoldButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      className={`relative overflow-hidden rounded-full px-6 py-2.5 text-sm font-family: "Libre Baskerville" tracking-wide transition-all duration-300 ${className}`}
      style={{
        background: hovered
          ? "linear-gradient(135deg, #f5d87a 0%, #c8922a 50%, #e8b84b 100%)"
          : "linear-gradient(135deg, #c8922a 0%, #f5d87a 50%, #e8b84b 100%)",
        color: "#0a0800",
        boxShadow: hovered ? "0 0 24px rgba(245,216,122,0.5)" : "0 0 12px rgba(200,146,42,0.3)",
        transform: hovered ? "scale(1.04)" : "scale(1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <span
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.35) 50%, transparent 60%)",
            animation: "shimmer 0.6s ease forwards",
          }}
        />
      )}
      {children}
    </button>
  );
}

// ─── Outline Button ───────────────────────────────────────────────────────────
function OutlineButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      className={`relative rounded-full px-6 py-2.5 text-sm font-family: "Libre Baskerville" tracking-wide transition-all duration-300 ${className}`}
      style={{
        border: "1px solid",
        borderColor: hovered ? "#f5d87a" : "rgba(200,146,42,0.5)",
        color: hovered ? "#f5d87a" : "rgba(245,216,122,0.7)",
        background: hovered ? "rgba(245,216,122,0.07)" : "transparent",
        boxShadow: hovered ? "0 0 18px rgba(245,216,122,0.15)" : "none",
        transform: hovered ? "scale(1.03)" : "scale(1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  );
}

// ─── FAQ Item ─────────────────────────────────────────────────────────────────
function FaqItem({ question }: { question: string }) {
  const [open, setOpen] = useState(false);
  const answers: Record<string, string> = {
    "What is WhatsApp automation?":
      "WhatsApp automation uses software to send messages, replies, and workflows automatically—no manual effort needed for each conversation.",
    "Is WhatsApp automation free?":
      "Basic features may be free, but advanced automation, broadcasts, and AI concierge are available on paid plans tailored to your business size.",
    "What are automated workflows on WhatsApp?":
      "Automated workflows are pre-built message sequences triggered by user actions—like a welcome message when someone signs up, or a follow-up after a purchase.",
    "What are some common use cases for WhatsApp automation?":
      "Lead nurturing, order confirmations, appointment reminders, customer support FAQs, re-engagement campaigns, and feedback collection.",
    "How can I get started with WhatsApp automation?":
      "Sign up for Interakt, connect your WhatsApp Business API number, and start building flows within minutes using our no-code builder.",
    "How can I set custom replies for FAQs on WhatsApp?":
      "Use the Flows editor to map keywords or intents to canned responses. You can create as many FAQ pairs as needed.",
    "How do I set up an auto-reply on WhatsApp?":
      "Navigate to Automation → Auto Replies, define the trigger (keyword, time window, or event), and compose your message template.",
    "How do I create an automated workflow on WhatsApp?":
      "In the Flows builder, drag and drop steps—send message, wait, condition branch, API call—and publish when ready.",
    "Is it safe to use an automatic WhatsApp message sender?":
      "Yes, when using the official WhatsApp Business API via a verified BSP like Interakt. All messages comply with WhatsApp's policies.",
    "Can I set up a custom FAQ on WhatsApp?":
      "Absolutely. You can build a full FAQ tree with conditional branching so users get precise answers based on their selections.",
    "How to send automated messages on WhatsApp?":
      "Create a broadcast or flow campaign in Interakt, select your audience segment, schedule the time, and hit send.",
  };
  return (
    <div
      className="border-b transition-all duration-300 cursor-pointer"
      style={{ borderColor: "rgba(200,146,42,0.2)" }}
      onClick={() => setOpen(!open)}
    >
      <div className="flex justify-between items-center py-4 px-2 gap-4">
        <span
          style={{
            fontFamily: "'Baskerville', 'Libre Baskerville', Georgia, serif",
            fontSize: "18px",
            background: "linear-gradient(135deg, #f5d87a 0%, #fff8e7 50%, #c8922a 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {question}
        </span>
        <span
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: open ? "linear-gradient(135deg,#c8922a,#f5d87a)" : "rgba(200,146,42,0.15)",
            color: open ? "#0a0800" : "#f5d87a",
            transform: open ? "rotate(45deg)" : "none",
            fontSize: "18px",
            fontWeight: 300,
          }}
        >
          +
        </span>
      </div>
      <div
        style={{
          maxHeight: open ? "200px" : "0",
          overflow: "hidden",
          transition: "max-height 0.4s ease",
        }}
      >
        <p className="px-2 pb-4 text-sm leading-relaxed" style={{ color: "rgba(245,216,122,0.6)", fontFamily: "'Inter', sans-serif" }}>
          {answers[question] ?? "Answer coming soon."}
        </p>
      </div>
    </div>
  );
}

// ─── Tab Button ───────────────────────────────────────────────────────────────
function TabBtn({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
      style={{
        fontFamily: "'Inter', sans-serif",
        background: active
          ? "linear-gradient(135deg,#c8922a,#f5d87a)"
          : "rgba(200,146,42,0.08)",
        color: active ? "#0a0800" : "rgba(245,216,122,0.7)",
        border: active ? "none" : "1px solid rgba(200,146,42,0.25)",
        boxShadow: active ? "0 0 18px rgba(245,216,122,0.25)" : "none",
        fontWeight: active ? 700 : 400,
      }}
    >
      {label}
    </button>
  );
}

// ─── Moving Marquee Component ─────────────────────────────────────────────────
function MovingMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;
    const handleMouseEnter = () => { marquee.style.animationPlayState = 'paused'; };
    const handleMouseLeave = () => { marquee.style.animationPlayState = 'running'; };
    marquee.addEventListener('mouseenter', handleMouseEnter);
    marquee.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      marquee.removeEventListener('mouseenter', handleMouseEnter);
      marquee.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const brands = [
    { logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/W2.webp" },
    { logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/W3.webp" },
    { logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/W4.webp" },
    { logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/W5.webp" },
    { logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/W6.webp" },
    { logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/W7.webp" },
    { logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/W8.webp" },
    { logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/W9.webp" },
    { logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/W10.webp" },
  ];

  return (
    <div className="w-full overflow-hidden py-4">
      <div
        ref={marqueeRef}
        className="whitespace-nowrap inline-block"
        style={{ animation: "marquee 35s linear infinite", willChange: "transform" }}
      >
        {[...brands, ...brands].map((brand, index) => (
          <span
            key={index}
            className="inline-flex items-center mx-10"
            style={{
              verticalAlign: "middle",
              cursor: "default",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              const img = e.currentTarget.querySelector("img") as HTMLImageElement;
              if (img) img.style.filter = "brightness(1.4) drop-shadow(0 0 8px rgba(245,216,122,0.4))";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              const img = e.currentTarget.querySelector("img") as HTMLImageElement;
              if (img) img.style.filter = "brightness(1.15)";
            }}
          >
            <img
              src={brand.logo}
              alt=""
              style={{
                height: "48px",
                width: "auto",
                objectFit: "contain",
                filter: "brightness(1.15)",
                flexShrink: 0,
                transition: "filter 0.3s ease, transform 0.3s ease",
                display: "block",
              }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Shared Image-Top Card ────────────────────────────────────────────────────
function ImageTopCard({
  imageSrc,
  imageAlt,
  title,
  description,
}: {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
}) {
  return (
    <HoverCard className="p-6 h-full flex flex-col">
      <div className="mb-4">
        <div
          className="rounded-xl overflow-hidden"
          style={{
            border: "1px solid rgba(200,146,42,0.3)",
            background: "linear-gradient(145deg, rgba(200,146,42,0.12) 0%, rgba(18,12,2,0.95) 100%)",
          }}
        >
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-auto object-cover"
            style={{ display: "block", borderRadius: "10px" }}
          />
        </div>
      </div>
      <h3
        style={{
          fontFamily: "'Baskerville', 'Libre Baskerville', Georgia, serif",
          fontSize: "20px",
          background: "linear-gradient(135deg, #f5d87a 0%, #fff8e7 55%, #c8922a 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          lineHeight: 1.3,
          marginBottom: "12px",
        }}
      >
        {title}
      </h3>
      <p className="text-sm leading-relaxed flex-1" style={{ color: "rgba(255,248,231,0.58)", fontFamily: "'Inter', sans-serif" }}>
        {description}
      </p>
    </HoverCard>
  );
}

// ─── Marketing Automation Tab Cards ──────────────────────────────────────────

function MarketingFullWidthCard() {
  return (
    <HoverCard className="p-8 w-full">
      <div className="flex flex-col lg:flex-row items-center gap-8">
        <div className="flex-1">
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              border: "1px solid rgba(200,146,42,0.3)",
              background: "linear-gradient(145deg, rgba(200,146,42,0.12) 0%, rgba(18,12,2,0.95) 100%)",
            }}
          >
            <img
              src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/tab1.webp"
              alt="Automated Checkout Workflows"
              className="w-full h-auto object-cover"
              style={{ display: "block", borderRadius: "14px" }}
            />
          </div>
        </div>
        <div className="flex-1 space-y-4">
          <h3
            style={{
              fontFamily: "'Baskerville', 'Libre Baskerville', Georgia, serif",
              fontSize: "28px",
              background: "linear-gradient(135deg, #f5d87a 0%, #fff8e7 55%, #c8922a 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              lineHeight: 1.3,
            }}
          >
            Streamline Checkouts with WhatsApp Automation
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,248,231,0.58)", fontFamily: "'Inter', sans-serif" }}>
            Optimize your ordering process with automated checkout flows. Share payment details, provide payment links, and collect payments for fast, seamless transactions all within WhatsApp.
          </p>
         
        </div>
      </div>
    </HoverCard>
  );
}

function MarketingImageLeftCard() {
  return (
    <ImageTopCard
      imageSrc="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/tab2.webp"
      imageAlt="Automated Order Tracking"
      title="Improve Customer Satisfaction with Automated Order Tracking"
      description="No more sending order updates manually to every customer let Interakt do it for you. Just integrate our platform with your."
    />
  );
}

function MarketingImageTopCard() {
  return (
    <ImageTopCard
      imageSrc="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/tab3.webp"
      imageAlt="Drive Shopify Sales with WhatsApp Automation"
      title="Drive Shopify Sales with WhatsApp Automation"
      description="Put your Shopify sales on auto-pilot with Interakt. From acquisition, and conversion to support, our full-stack WhatsApp Business Platform does it all for you!"
    />
  );
}

// ─── Commerce Automation Tab Cards ────────────────────────────────────────────

function CommerceImageTopCard1() {
  return (
    <ImageTopCard
      imageSrc="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/tab4.webp"
      imageAlt="WhatsApp Broadcast Campaigns"
      title="Automate Bulk Messages with WhatsApp Broadcast"
      description="Turn conversations into conversions with WhatsApp Broadcasts. Engage customers with personalised alerts and rich media campaigns."
    />
  );
}

function CommerceImageTopCard2() {
  return (
    <ImageTopCard
      imageSrc="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/tab5.webp"
      imageAlt="No-Code Chatbot Builder"
      title="Build Chatbots Without Coding"
      description="Effortless Automation with Interakt's No-Code Chatbot Builder. Streamline your customer support."
    />
  );
}

function CommerceFullWidthCard() {
  return (
    <HoverCard className="p-8 w-full">
      <div className="flex flex-col lg:flex-row items-center gap-8">
        <div className="flex-1 space-y-4">
          <h3
            style={{
              fontFamily: "'Baskerville', 'Libre Baskerville', Georgia, serif",
              fontSize: "28px",
              background: "linear-gradient(135deg, #f5d87a 0%, #fff8e7 55%, #c8922a 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              lineHeight: 1.3,
            }}
          >
            Welcome to AnswerBot
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,248,231,0.58)", fontFamily: "'Inter', sans-serif" }}>
            Say hello to your intelligent AI powered AnswerBot who will assist you in answering your customer queries instantly and automatically on WhatsApp. Your customers no longer need to wait for manual intervention.
          </p>
        </div>
        <div className="flex-1">
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              border: "1px solid rgba(200,146,42,0.3)",
              background: "linear-gradient(145deg, rgba(200,146,42,0.12) 0%, rgba(18,12,2,0.95) 100%)",
            }}
          >
            <img
              src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/tab6.webp"
              alt="AnswerBot AI Support"
              className="w-full h-auto object-cover"
              style={{ display: "block", borderRadius: "14px" }}
            />
          </div>
        </div>
      </div>
    </HoverCard>
  );
}

// ─── Support Automation Tab Cards ─────────────────────────────────────────────

function SupportFullWidthCard() {
  return (
    <HoverCard className="p-8 w-full">
      <div className="flex flex-col lg:flex-row items-center gap-8">
        <div className="flex-1">
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              border: "1px solid rgba(200,146,42,0.3)",
              background: "linear-gradient(145deg, rgba(200,146,42,0.12) 0%, rgba(18,12,2,0.95) 100%)",
            }}
          >
            <img
              src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/tab8.webp"
              alt="Auto-Chat Assignment"
              className="w-full h-auto object-cover"
              style={{ display: "block", borderRadius: "14px" }}
            />
          </div>
        </div>
        <div className="flex-1 space-y-4">
          <h3
            style={{
              fontFamily: "'Baskerville', 'Libre Baskerville', Georgia, serif",
              fontSize: "28px",
              background: "linear-gradient(135deg, #f5d87a 0%, #fff8e7 55%, #c8922a 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              lineHeight: 1.3,
            }}
          >
            Optimize Team Productivity with Auto-Chat Assignment
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,248,231,0.58)", fontFamily: "'Inter', sans-serif" }}>
            Ensure timely support by automating chat assignments on Interakt, and directing queries to the right agents instantly so no customer concern goes unanswered.
          </p>
        </div>
      </div>
    </HoverCard>
  );
}

function SupportImageLeftCard() {
  return (
    <ImageTopCard
      imageSrc="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/tab9.webp"
      imageAlt="WhatsApp Answer Bot"
      title="Respond Faster with WhatsApp Answer Bot"
      description="Automate FAQs and resolve queries instantly with our AI-powered AnswerBot for a seamless customer experience, with easy agent hand-off for extra complex queries."
    />
  );
}

function SupportImageTopCard() {
  return (
    <ImageTopCard
      imageSrc="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/tab10.webp"
      imageAlt="Auto-Chat Assignment Dashboard"
      title="Optimize Team Productivity with Auto-Chat Assignment"
      description="Ensure timely support by automating chat assignments on Interakt, and directing queries to the right agents instantly."
    />
  );
}

// ─── Keyframe styles ──────────────────────────────────────────────────────────
const globalStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap');

  @keyframes shimmer {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(200%); }
  }
  @keyframes floatUp {
    0%,100% { transform: translateY(0); }
    50%      { transform: translateY(-10px); }
  }
  @keyframes pulseGlow {
    0%,100% { box-shadow: 0 0 20px rgba(200,146,42,0.3); }
    50%      { box-shadow: 0 0 45px rgba(245,216,122,0.55); }
  }
  @keyframes gradientMove {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes scanLine {
    0%   { top: 0; opacity: 0.7; }
    100% { top: 100%; opacity: 0; }
  }
  @keyframes marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  * { box-sizing: border-box; }
  ::selection { background: rgba(200,146,42,0.35); color: #fff8e7; }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: #080600; }
  ::-webkit-scrollbar-thumb { background: linear-gradient(180deg,#c8922a,#f5d87a); border-radius: 99px; }
`;

const faqs = [
  "What is WhatsApp automation?",
  "Is WhatsApp automation free?",
  "What are automated workflows on WhatsApp?",
  "What are some common use cases for WhatsApp automation?",
  "How can I get started with WhatsApp automation?",
  "How can I set custom replies for FAQs on WhatsApp?",
  "How do I set up an auto-reply on WhatsApp?",
  "How do I create an automated workflow on WhatsApp?",
  "Is it safe to use an automatic WhatsApp message sender?",
  "Can I set up a custom FAQ on WhatsApp?",
  "How to send automated messages on WhatsApp?",
];

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function WhatsAppAutomation() {
  const [activeTab, setActiveTab] = useState("Marketing Automation");

  const renderTabContent = () => {
    switch(activeTab) {
      case "Marketing Automation":
        return (
          <div className="max-w-6xl mx-auto space-y-6">
            <Reveal delay={150} direction="up">
              <MarketingFullWidthCard />
            </Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Reveal delay={200} direction="left">
                <MarketingImageLeftCard />
              </Reveal>
              <Reveal delay={250} direction="right">
                <MarketingImageTopCard />
              </Reveal>
            </div>
          </div>
        );
      case "Commerce Automation":
        return (
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Reveal delay={150} direction="up">
                <CommerceImageTopCard1 />
              </Reveal>
              <Reveal delay={200} direction="up">
                <CommerceImageTopCard2 />
              </Reveal>
            </div>
            <Reveal delay={250} direction="up">
              <CommerceFullWidthCard />
            </Reveal>
          </div>
        );
      case "Support Automation":
        return (
          <div className="max-w-6xl mx-auto space-y-6">
            <Reveal delay={150} direction="up">
              <SupportFullWidthCard />
            </Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Reveal delay={200} direction="left">
                <SupportImageLeftCard />
              </Reveal>
              <Reveal delay={250} direction="right">
                <SupportImageTopCard />
              </Reveal>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <SEO {...pageSEO.whatsappAutomation} />
      <style>{globalStyle}</style>

      <div
        style={{
          background: "#070500",
          color: "#fff8e7",
          fontFamily: "'Inter', sans-serif",
          overflowX: "hidden",
          position: "relative",
        }}
      >
        {/* Ambient background orbs */}
        <div
          className="fixed pointer-events-none"
          style={{
            top: "5%", right: "10%",
            width: "520px", height: "520px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(200,146,42,0.07) 0%, transparent 70%)",
            filter: "blur(60px)", zIndex: 0,
          }}
        />
        <div
          className="fixed pointer-events-none"
          style={{
            bottom: "15%", left: "5%",
            width: "400px", height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(245,216,122,0.05) 0%, transparent 70%)",
            filter: "blur(80px)", zIndex: 0,
          }}
        />

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        {/*
          Desktop (lg+): flex-row — left column (heading+desc+btns+stats), right column (image).
          Mobile (<lg):  flex-col stacked as:
            order-1 → Heading only
            order-2 → Image
            order-3 → Description + Buttons + Stats
          
          FIX: Added margin-top to heading for mobile only to push it below navbar
        */}
        <Section className="relative z-10 !pt-8 md:!pt-36">
          <div className="max-w-7xl mx-auto flex flex-wrap lg:flex-nowrap lg:flex-row items-center gap-6 lg:gap-16" style={{ marginTop:150 }}>

            {/* ── LEFT COLUMN (desktop) — on mobile splits into order-1 and order-3 ── */}
            <div className="w-full lg:flex-1 flex flex-col gap-6 text-center lg:text-left">

              {/* Heading — mobile order-1, desktop stays in flow */}
              <div className="order-1 lg:order-none w-full">
                <Reveal direction="left" delay={0}>
                  <h1
                    style={{
                      fontFamily: "'Baskerville','Libre Baskerville',Georgia,serif",
                      fontSize: "clamp(28px, 4vw, 52px)",
                      lineHeight: 1.2,
                      background: "linear-gradient(135deg, #f5d87a 0%, #fff8e7 40%, #e8b84b 70%, #f5d87a 100%)",
                      backgroundSize: "200% 200%",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      animation: "gradientMove 5s ease infinite",
                      marginTop: "80px", // Added large margin-top for mobile
                      marginBottom: "16px",
                      wordBreak: "break-word",
                    }}
                  >
                    Boost Conversions<br />
                    &amp; Simplify Workflows<br />
                    with WhatsApp Automation
                  </h1>
                </Reveal>
              </div>

              {/* Image - mobile order-2 (between heading and desc) */}
              <div className="order-2 lg:order-none w-full flex justify-center lg:hidden">
                <Reveal delay={150} direction="up" className="w-full max-w-[400px]">
                  <div
                    className="relative w-full"
                    style={{ animation: "floatUp 5s ease-in-out infinite" }}
                  >
                    <div
                      className="absolute inset-0 rounded-3xl"
                      style={{
                        background: "radial-gradient(ellipse, rgba(200,146,42,0.2) 0%, transparent 70%)",
                        filter: "blur(30px)",
                        animation: "pulseGlow 3s ease-in-out infinite",
                      }}
                    />
                    <div
                      className="relative rounded-3xl overflow-hidden"
                      style={{
                        background: "linear-gradient(145deg, rgba(200,146,42,0.12) 0%, rgba(18,12,2,0.95) 100%)",
                        border: "1px solid rgba(200,146,42,0.35)",
                        boxShadow: "0 30px 80px rgba(0,0,0,0.7), 0 0 40px rgba(200,146,42,0.15)",
                        minHeight: "300px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        className="absolute left-0 right-0 h-px pointer-events-none"
                        style={{
                          background: "linear-gradient(90deg, transparent, rgba(245,216,122,0.4), transparent)",
                          animation: "scanLine 3s linear infinite",
                          zIndex: 10,
                        }}
                      />
                      <img
                        src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wauto1.webp"
                        alt="WhatsApp automation flow builder showing an automated customer conversation"
                        className="w-full h-auto object-cover rounded-2xl scale-105 hover:scale-110 transition-transform duration-500"
                        style={{ opacity: 0.95 }}
                      />
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Description + Buttons + Stats — mobile order-3, desktop stays in flow */}
              <div className="order-3 lg:order-none w-full flex flex-col gap-6">
                <Reveal delay={200} direction="left">
                  <p
                    className="text-sm md:text-base leading-relaxed max-w-lg mx-auto lg:mx-0"
                    style={{ color: "rgba(255,248,231,0.55)", fontFamily: "'Inter', sans-serif" }}
                  >
                    Send automated messages, auto replies &amp; custom flows to boost lead generation.
                  </p>
                </Reveal>

               

                <Reveal delay={400} direction="left">
                  <div className="flex flex-wrap justify-center lg:justify-start gap-6 mt-4">
                    {[["25K+", "Businesses"], ["3x", "ROAS Boost"], ["70%", "Query Resolution"]].map(([num, label]) => (
                      <div key={label} className="flex flex-col items-center lg:items-start">
                        <span
                          style={{
                            fontFamily: "'Baskerville','Libre Baskerville',Georgia,serif",
                            fontSize: "22px",
                            background: "linear-gradient(135deg,#f5d87a,#c8922a)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            fontWeight: 700,
                          }}
                        >
                          {num}
                        </span>
                        <span className="text-xs" style={{ color: "rgba(255,248,231,0.45)", fontFamily: "'Inter', sans-serif" }}>
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>

            {/* ── IMAGE BLOCK — desktop only (hidden on mobile) ── */}
            <Reveal delay={200} direction="right" className="hidden lg:flex lg:flex-1 justify-center lg:justify-end">
              <div
                className="relative w-full max-w-[500px] lg:max-w-[600px]"
                style={{ animation: "floatUp 5s ease-in-out infinite" }}
              >
                <div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background: "radial-gradient(ellipse, rgba(200,146,42,0.2) 0%, transparent 70%)",
                    filter: "blur(30px)",
                    animation: "pulseGlow 3s ease-in-out infinite",
                  }}
                />
                <div
                  className="relative rounded-3xl overflow-hidden"
                  style={{
                    background: "linear-gradient(145deg, rgba(200,146,42,0.12) 0%, rgba(18,12,2,0.95) 100%)",
                    border: "1px solid rgba(200,146,42,0.35)",
                    boxShadow: "0 30px 80px rgba(0,0,0,0.7), 0 0 40px rgba(200,146,42,0.15)",
                    minHeight: "400px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    className="absolute left-0 right-0 h-px pointer-events-none"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(245,216,122,0.4), transparent)",
                      animation: "scanLine 3s linear infinite",
                      zIndex: 10,
                    }}
                  />
                  <img
                    src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wauto1.webp"
                    className="w-full h-auto object-cover rounded-2xl scale-105 hover:scale-110 transition-transform duration-500"
                    style={{ opacity: 0.95 }}
                  />
                </div>
              </div>
            </Reveal>

          </div>
        </Section>

        {/* ── TRUSTED BY HEADER + MOVING MARQUEE ───────────────────────────── */}
        <div className="relative z-10 py-4">
          <Reveal direction="up">
            <p
              className="text-center text-xs uppercase tracking-widest mb-4"
              style={{ color: "rgba(245,216,122,0.4)", fontFamily: "'Inter', sans-serif" }}
            >
              TRUSTED BY 25K+ BUSINESSES — WHY CHOOSE INTERAKT FOR WHATSAPP AUTOMATION
            </p>
          </Reveal>
          <MovingMarquee />
        </div>

        {/* ── HOW TO SET UP ────────────────────────────────────────────────── */}
        <Section className="relative z-10">
          <Reveal direction="up">
            <h2
              className="text-center mb-6"
              style={{
                fontFamily: "'Baskerville','Libre Baskerville',Georgia,serif",
                fontSize: "18px",
                background: "linear-gradient(135deg,#f5d87a 0%,#fff8e7 50%,#c8922a 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              How to Set Up WhatsApp Automation for Your Business
            </h2>
          </Reveal>

          <Reveal delay={100} direction="up">
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {["Marketing Automation", "Commerce Automation", "Support Automation"].map((tab) => (
                <TabBtn
                  key={tab}
                  label={tab}
                  active={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                />
              ))}
            </div>
          </Reveal>

          {renderTabContent()}
        </Section>

        {/* ── TESTIMONIAL ──────────────────────────────────────────────────── */}
        <Section className="relative z-10">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

            {/* Left - Testimonial Content */}
            <Reveal direction="left" delay={0} className="flex-1">
              <HoverCard className="p-8 md:p-10">
                <div
                  className="text-6xl leading-none mb-4 select-none"
                  style={{
                    fontFamily: "Georgia, serif",
                    background: "linear-gradient(135deg,#c8922a,#f5d87a)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  "
                </div>
                <p
                  className="italic text-sm md:text-base leading-relaxed mb-6"
                  style={{ color: "rgba(255,248,231,0.72)", fontFamily: "'Inter', sans-serif" }}
                >
                  Interakt has truly transformed the way we engage with our students throughout their journey. WhatsApp is a globally preferred communication platform, and Interakt has allowed us to harness its full potential. By leveraging its seamless integration and automated outreach, we've seen substantial improvements in response times and engagement rates.
                </p>
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                    style={{ background: "linear-gradient(135deg,#c8922a,#f5d87a)", color: "#0a0800" }}
                  >
                    TL
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Baskerville','Libre Baskerville',Georgia,serif",
                        fontSize: "18px",
                        background: "linear-gradient(135deg,#f5d87a,#c8922a)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      Tejas Labhshetwar
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: "rgba(255,248,231,0.45)", fontFamily: "'Inter', sans-serif" }}>
                      Founder &amp; Chief Executive Officer, Gyanberry
                    </div>
                  </div>
                </div>

                
              </HoverCard>
            </Reveal>

            {/* Right - Testimonial Image — enlarged */}
            <Reveal direction="right" delay={150} className="flex-[1.4] flex justify-center lg:justify-end">
              <div
                className="relative w-full max-w-[640px] lg:max-w-[720px]"
                style={{ animation: "floatUp 5s ease-in-out infinite" }}
              >
                {/* Glow ring */}
                <div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background: "radial-gradient(ellipse, rgba(200,146,42,0.2) 0%, transparent 70%)",
                    filter: "blur(30px)",
                    animation: "pulseGlow 3s ease-in-out infinite",
                  }}
                />
                {/* Image container */}
                <div
                  className="relative rounded-3xl overflow-hidden"
                  style={{
                    border: "1px solid rgba(200,146,42,0.35)",
                    boxShadow: "0 30px 80px rgba(0,0,0,0.7), 0 0 40px rgba(200,146,42,0.15)",
                    background: "linear-gradient(145deg, rgba(200,146,42,0.12) 0%, rgba(18,12,2,0.95) 100%)",
                  }}
                >
                  {/* Scan line */}
                  <div
                    className="absolute left-0 right-0 h-px pointer-events-none"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(245,216,122,0.4), transparent)",
                      animation: "scanLine 3s linear infinite",
                      zIndex: 10,
                    }}
                  />
                  <img
                    src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/tab7.webp"
                    alt="Gyanberry Testimonial"
                    className="w-full h-auto object-cover"
                    style={{
                      display: "block",
                      borderRadius: "24px",
                      opacity: 0.95,
                    }}
                    onError={(e) => {
                      const el = e.currentTarget;
                      el.style.display = "none";
                      const parent = el.parentElement;
                      if (parent && !parent.querySelector(".img-fallback")) {
                        const fb = document.createElement("div");
                        fb.className = "img-fallback";
                        fb.style.cssText = "min-height:500px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2rem;text-align:center;";
                        fb.innerHTML = `
                          <div style="width:80px;height:80px;border-radius:50%;background:rgba(200,146,42,0.2);display:flex;align-items:center;justify-content:center;margin-bottom:16px;">
                            <span style="font-size:36px;">🖼️</span>
                          </div>
                          <p style="color:rgba(245,216,122,0.6);font-size:14px;font-family:Inter,sans-serif;">Add your testimonial image</p>
                          <p style="color:rgba(255,248,231,0.3);font-size:11px;font-family:Inter,sans-serif;margin-top:6px;">src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/tab7.webp"</p>`;
                        parent.appendChild(fb);
                      }
                    }}
                  />
                </div>
              </div>
            </Reveal>

          </div>
        </Section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <Section className="relative z-10">
          <Reveal direction="up">
            <h2
              className="text-center mb-8"
              style={{
                fontFamily: "'Baskerville','Libre Baskerville',Georgia,serif",
                fontSize: "18px",
                background: "linear-gradient(135deg,#f5d87a 0%,#fff8e7 50%,#c8922a 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Your Questions About WhatsApp Automation: Answered
            </h2>
          </Reveal>
          <Reveal delay={100} direction="up" className="max-w-3xl mx-auto">
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(200,146,42,0.18)",
              }}
            >
              <div className="p-4 md:p-6">
                {faqs.map((q) => (
                  <FaqItem key={q} question={q} />
                ))}
              </div>
            </div>
          </Reveal>
        </Section>

        <ContactUsForm/>

        {/* Bottom glow */}
        <div
          className="pointer-events-none"
          style={{
            height: "2px",
            background: "linear-gradient(90deg, transparent, rgba(200,146,42,0.5) 40%, rgba(245,216,122,0.7) 50%, rgba(200,146,42,0.5) 60%, transparent)",
          }}
        />

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(12px); }
            to   { opacity: 1; transform: none; }
          }
        `}</style>
      </div>
    </>
  );
}