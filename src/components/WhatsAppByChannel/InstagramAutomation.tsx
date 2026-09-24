import ContactUsForm from "@/pages/ContactUsForm";
import { useEffect, useRef, useState } from "react";
import SEO from "@/components/SEO";
import { pageSEO } from "@/seo/pageSEO";

// ─── Scroll Reveal Hook ───────────────────────────────────────────────────────
function useScrollReveal(threshold = 0.08) {
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
type RevealDir = "up" | "left" | "right" | "fade";
function Reveal({
  children, delay = 0, direction = "up", className = "",
}: { children: React.ReactNode; delay?: number; direction?: RevealDir; className?: string }) {
  const { ref, visible } = useScrollReveal();
  const transforms: Record<RevealDir, string> = {
    up: "translateY(48px)", left: "translateX(-48px)",
    right: "translateX(48px)", fade: "none",
  };
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : transforms[direction],
      transition: `opacity 0.78s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.78s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      willChange: "opacity, transform",
    }}>
      {children}
    </div>
  );
}

// ─── Hover Card ───────────────────────────────────────────────────────────────
function HoverCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`relative rounded-2xl overflow-hidden transition-all duration-500 ${className}`}
      style={{
        border: hovered ? "1px solid rgba(245,216,122,0.55)" : "1px solid rgba(200,146,42,0.2)",
        boxShadow: hovered ? "0 0 32px rgba(245,216,122,0.12), 0 8px 32px rgba(0,0,0,0.55)" : "0 4px 20px rgba(0,0,0,0.4)",
        background: hovered
          ? "linear-gradient(145deg,rgba(245,216,122,0.07) 0%,rgba(10,8,2,0.97) 100%)"
          : "linear-gradient(145deg,rgba(255,255,255,0.025) 0%,rgba(6,4,0,0.97) 100%)",
        transform: hovered ? "translateY(-5px) scale(1.01)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <div className="pointer-events-none absolute inset-0 rounded-2xl" style={{
          background: "radial-gradient(ellipse at 50% 0%,rgba(245,216,122,0.08) 0%,transparent 65%)",
        }} />
      )}
      {children}
    </div>
  );
}

// ─── Section Wrapper ─────────────────────────────────────────────────────────
function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`px-4 sm:px-8 lg:px-16 xl:px-24 ${className}`} style={{ paddingTop: "clamp(80px, 8vw, 110px)", paddingBottom: "clamp(24px, 4vw, 40px)" }}>
      {children}
    </section>
  );
}

// ─── Gold Button ─────────────────────────────────────────────────────────────
function GoldButton({ children, className = "", small = false }: { children: React.ReactNode; className?: string; small?: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      className={`relative overflow-hidden rounded-full font-semibold tracking-wide transition-all duration-300 ${className}`}
      style={{
        background: hovered
          ? "linear-gradient(135deg,#f5d87a 0%,#c8922a 50%,#e8b84b 100%)"
          : "linear-gradient(135deg,#c8922a 0%,#f5d87a 50%,#e8b84b 100%)",
        color: "#0a0800",
        boxShadow: hovered ? "0 0 28px rgba(245,216,122,0.55)" : "0 0 14px rgba(200,146,42,0.3)",
        transform: hovered ? "scale(1.06)" : "scale(1)",
        padding: small ? "8px 22px" : "11px 32px",
        fontSize: small ? "13px" : "14px",
        fontFamily: "'Inter',sans-serif",
        fontWeight: 600,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <span className="absolute inset-0 pointer-events-none" style={{
          background: "linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.35) 50%,transparent 60%)",
          animation: "shimmer 0.6s ease forwards",
        }} />
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
        border: `1px solid ${hovered ? "#f5d87a" : "rgba(200,146,42,0.4)"}`,
        color: hovered ? "#f5d87a" : "rgba(245,216,122,0.65)",
        background: hovered ? "rgba(245,216,122,0.07)" : "transparent",
        boxShadow: hovered ? "0 0 16px rgba(245,216,122,0.14)" : "none",
        transform: hovered ? "scale(1.03)" : "scale(1)",
        padding: small ? "8px 22px" : "11px 32px",
        fontSize: small ? "13px" : "14px",
        fontFamily: "'Inter',sans-serif",
        fontWeight: 600,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  );
}

// ─── Media Box ────────────────────────────────────────────────────────────────
function MediaBox({ alt = "Image", aspect = "aspect-[16/10]", src, className = "" }: {
  alt?: string; aspect?: string; src?: string; className?: string;
}) {
  const [imageError, setImageError] = useState(false);
  if (src && !imageError) {
    return (
      <img src={src} alt={alt} className={`w-full rounded-2xl ${className}`}
        style={{ display: "block", objectFit: "cover", height: "auto" }}
        onError={() => setImageError(true)} />
    );
  }
  return (
    <div className={`${aspect} rounded-2xl flex flex-col items-center justify-center gap-3 ${className}`}
      style={{ background: "linear-gradient(135deg,rgba(200,146,42,0.15),rgba(245,216,122,0.05))", border: "1px dashed rgba(200,146,42,0.4)" }}>
      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(200,146,42,0.2)" }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(245,216,122,0.7)" strokeWidth="1.5">
          <rect x="2" y="2" width="20" height="20" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5" fill="rgba(245,216,122,0.7)"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
      </div>
      <span style={{ color: "rgba(245,216,122,0.6)", fontSize: "12px", fontFamily: "'Inter',sans-serif", textAlign: "center", fontWeight: 500 }}>
        {alt} Preview
      </span>
    </div>
  );
}

// ─── Check Badge ──────────────────────────────────────────────────────────────
function Check({ gold = true }: { gold?: boolean }) {
  return (
    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full flex-shrink-0" style={{
      background: gold ? "linear-gradient(135deg,#c8922a,#f5d87a)" : "rgba(255,255,255,0.06)",
      fontSize: "9px", color: gold ? "#0a0800" : "rgba(255,255,255,0.25)",
    }}>
      {gold ? "✓" : "×"}
    </span>
  );
}

// ─── Section Heading ──────────────────────────────────────────────────────────
function SectionHeading({ children, centered = true, accent }: {
  children: React.ReactNode; centered?: boolean; accent?: string;
}) {
  return (
    <h2 className={`${centered ? "text-center" : ""}`} style={{
      fontFamily: "'Libre Baskerville','Baskerville',Georgia,serif",
      fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 700, lineHeight: 1.3,
      background: "linear-gradient(135deg,#f5d87a 0%,#fff8e7 50%,#c8922a 100%)",
      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
    }}>
      {accent ? (
        <>
          {(children as string).split(accent)[0]}
          <span style={{ fontStyle: "italic", background: "linear-gradient(135deg,#f5d87a,#e8b84b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            {accent}
          </span>
          {(children as string).split(accent)[1]}
        </>
      ) : children}
    </h2>
  );
}

// ─── Sub Text ─────────────────────────────────────────────────────────────────
function SubText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`${className}`} style={{
      fontFamily: "'Inter',sans-serif", fontSize: "clamp(13px, 1.2vw, 15px)", lineHeight: 1.72,
      color: "rgba(255,248,231,0.52)",
    }}>
      {children}
    </p>
  );
}

// ─── Feature Card ─────────────────────────────────────────────────────────────
function FeatureCard({ icon, title, desc, delay, imageSrc }: {
  icon: string; title: string; desc: string; delay: number; imageSrc?: string;
}) {
  return (
    <Reveal delay={delay} direction="up">
      <HoverCard className="p-5 flex flex-col gap-3 h-full">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
            style={{ background: "linear-gradient(135deg,rgba(200,146,42,0.22),rgba(245,216,122,0.07))", border: "1px solid rgba(200,146,42,0.28)" }}>
            {icon}
          </div>
          <h3 style={{
            fontFamily: "'Libre Baskerville','Baskerville',Georgia,serif",
            fontSize: "clamp(14px, 1.3vw, 17px)", fontWeight: 700,
            background: "linear-gradient(135deg,#f5d87a 0%,#fff8e7 55%,#c8922a 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            lineHeight: 1.3, margin: 0,
          }}>
            {title}
          </h3>
        </div>
        <SubText className="text-sm">{desc}</SubText>
        {imageSrc ? (
          <img src={imageSrc} alt={title} className="w-full rounded-xl mt-auto" style={{ display: "block", objectFit: "cover" }}  loading="lazy" decoding="async" />
        ) : (
          <div className="aspect-[16/9] rounded-xl mt-auto" style={{
            background: "linear-gradient(135deg,rgba(200,146,42,0.12),rgba(245,216,122,0.04))",
            border: "1px dashed rgba(200,146,42,0.3)", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ color: "rgba(245,216,122,0.3)", fontSize: "11px", fontFamily: "'Inter',sans-serif" }}>{title}</span>
          </div>
        )}
      </HoverCard>
    </Reveal>
  );
}

// ─── FAQ Item ─────────────────────────────────────────────────────────────────
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="cursor-pointer transition-all duration-300" style={{ borderBottom: "1px solid rgba(200,146,42,0.15)" }} onClick={() => setOpen(!open)}>
      <div className="flex justify-between items-center py-4 px-1 gap-4">
        <span style={{
          fontFamily: "'Libre Baskerville','Baskerville',Georgia,serif",
          fontSize: "clamp(14px, 1.2vw, 16px)",
          background: "linear-gradient(135deg,#f5d87a 0%,#fff8e7 50%,#c8922a 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1.45,
        }}>
          {question}
        </span>
        <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
          style={{ background: open ? "linear-gradient(135deg,#c8922a,#f5d87a)" : "rgba(200,146,42,0.14)", color: open ? "#0a0800" : "#f5d87a", transform: open ? "rotate(45deg)" : "none", fontSize: "20px", fontWeight: 300, lineHeight: 1 }}>
          +
        </span>
      </div>
      <div style={{ maxHeight: open ? "200px" : "0", overflow: "hidden", transition: "max-height 0.42s cubic-bezier(0.16,1,0.3,1)" }}>
        <p style={{ padding: "0 4px 14px", fontSize: "clamp(12px, 1.1vw, 14px)", lineHeight: 1.72, color: "rgba(245,216,122,0.52)", fontFamily: "'Inter',sans-serif", margin: 0, whiteSpace: "pre-line" }}>
          {answer}
        </p>
      </div>
    </div>
  );
}

// ─── YouTube Helper ───────────────────────────────────────────────────────────
function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const patterns = [/youtu\.be\/([^?&\s]+)/, /[?&]v=([^?&\s]+)/, /youtube\.com\/embed\/([^?&\s]+)/, /youtube\.com\/shorts\/([^?&\s]+)/];
  for (const p of patterns) { const m = url.match(p); if (m) return m[1]; }
  return null;
}

// ─── Video Card ───────────────────────────────────────────────────────────────
function VideoCard({ title, src, youtubeSrc, thumbnailSrc, delay }: {
  title: string; src?: string; youtubeSrc?: string; thumbnailSrc?: string; delay: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [playing, setPlaying] = useState(false);
  const ytId = youtubeSrc ? getYouTubeId(youtubeSrc) : null;
  const autoThumb = ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : undefined;
  const thumbToShow = thumbnailSrc || autoThumb || src;

  return (
    <Reveal delay={delay} direction="up">
      <div className="flex flex-col gap-3" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <div className="relative rounded-2xl overflow-hidden" style={{
          aspectRatio: "16/10", background: "#000",
          border: hovered ? "1px solid rgba(245,216,122,0.45)" : "1px solid rgba(200,146,42,0.2)",
          boxShadow: hovered ? "0 0 24px rgba(245,216,122,0.12)" : "none",
          transition: "border 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease",
          transform: hovered && !playing ? "translateY(-4px)" : "none",
        }}>
          {playing && ytId ? (
            <iframe src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1`} title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none", display: "block" }} />
          ) : (
            <>
              {thumbToShow ? (
                <img src={thumbToShow} alt={title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}  loading="lazy" decoding="async" />
              ) : (
                <div style={{ position: "absolute", inset: 0 }}><MediaBox alt={title} aspect="aspect-[16/10]" className="h-full" /></div>
              )}
              <div style={{ position: "absolute", inset: 0, background: hovered ? "rgba(0,0,0,0.38)" : "rgba(0,0,0,0.22)", transition: "background 0.3s" }} />
              {ytId && (
                <button onClick={() => setPlaying(true)} aria-label={`Play ${title}`}
                  style={{ position: "absolute", top: "50%", left: "50%", transform: `translate(-50%,-50%) scale(${hovered ? 1.1 : 1})`, transition: "transform 0.25s ease", background: "none", border: "none", cursor: "pointer", padding: 0, lineHeight: 0 }}>
                  <svg width="68" height="48" viewBox="0 0 68 48" xmlns="http://www.w3.org/2000/svg">
                    <path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C0 13.05 0 24 0 24s0 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C68 34.95 68 24 68 24s0-10.95-1.48-16.26z" fill="#FF0000" style={{ filter: hovered ? "brightness(1.12)" : "none", transition: "filter 0.2s" }} />
                    <path d="M45 24 27 14v20z" fill="#fff" />
                  </svg>
                </button>
              )}
            </>
          )}
        </div>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(12px, 1.1vw, 14px)", textAlign: "center", color: "rgba(255,248,231,0.6)", fontWeight: 500 }}>{title}</p>
      </div>
    </Reveal>
  );
}

// ─── Comparison Table Data ────────────────────────────────────────────────────
const comparisonRows = [
  { category: "Automation Features", feature: "Unlimited DMs & Comments", interakt: true, manychat: false },
  { category: "", feature: "Quick Flows – 'This/Then/As' Auto Reply / Giveaway Automators", interakt: true, manychat: false },
  { category: "", feature: "Custom Auto Replies", interakt: true, manychat: true },
  { category: "Lead Generation", feature: "Instagram-to-WhatsApp workflow for lead creation & qualification", interakt: true, manychat: false },
  { category: "Team Collaboration", feature: "Free Unlimited Team Members", interakt: true, manychat: false },
  { category: "", feature: "Omni-channel Inbox (Live on WhatsApp)", interakt: true, manychat: false },
  { category: "Pricing & Accessibility", feature: "Flat Pricing — ₹999/month free trial", interakt: true, manychat: false },
  { category: "", feature: "Unlimited Conversations", interakt: true, manychat: false },
  { category: "", feature: "No caps", interakt: true, manychat: false },
  { category: "", feature: "Onboarding Experience", interakt: true, manychat: false },
  { category: "Integrations", feature: "WhatsApp – Instagram Integration", interakt: true, manychat: false },
  { category: "", feature: "eCommerce Integrations (Shopify, Razorpay, etc.)", interakt: true, manychat: false },
];

const pricingFeatures = ["Unlimited DMs & Comments", "Price Always Automation", "Giveaway Automation", "Custom Auto Replies"];

const faqData = [
  { question: "What is automation on Instagram?", answer: "With Instagram automation, creators and brands can automate repetitive tasks like replying to DMs, posts, and comments, hence boosting engagement. With omni-channel tools it is easier setup all of these automation under one inbox." },
  { question: "Is Instagram automation legal?", answer: "Yes, Instagram automation is done using Meta's official APIs. However, consider strictly adhering to Instagram policies to avoid any bans." },
  { question: "Can I automate Instagram without Interakt?", answer: "Yes, you can automate your Instagram directly from Instagram but it has limitations. Hence to automate at scale, consider using authorised tools like Instagram Automation for tasks like DMs automation, comments automation, price query automation and giveaway quick flows to grow your followers on Instagram and increase your engagement." },
  { question: "What are the best Instagram automation tools?", answer: "Instagram Automation is the top choice! It helps grow followers with easy-to-set-up automation, Instagram Automation has the most affordable price per month and offers unlimited usage while other tools have limitations on your usage." },
  { question: "Can I automate Instagram DM for free?", answer: "Yes, you can automate Instagram using its built-in feature but it has limits. With top tools like Instagram Automation it gets seamless and affordable to use Instagram-based solutions to automated DMs, comments and giveaways on Instagram." },
  { question: "Can I automate comments on Instagram?", answer: "Yes, it is possible to automate Instagram comments with automation tools. With comment automation creators and brands can set triggers and reply to each comment personally." },
  { question: "How can I gain more followers with automation?", answer: `With Instagram automation you can gain more followers with following activities:\n\nSchedule Posts\nHashtag recommendation\nAutomate comments\nAutomate DMs\nFollow-for-Giveaway automation\nPrice query automation` },
  { question: "Can I setup comment-to-DM automation on Instagram?", answer: "Yes, with Instagram automation tools, it is possible to send-auto responses to any one who comments on your Instagram posts and also send them an automated DM." },
];

const testimonialSlides = [
  { avatarSrc: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ins6.webp", avatarAlt: "Lakshit Sethiya", headline: "80+ new leads acquired in one single day!", body: "In just one day we have never seen such results with any marketing strategy.", name: "Lakshit Sethiya", role: "Founder, Social Seller Academy", rating: 5 },
  { avatarSrc: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ins7.webp", avatarAlt: "Coding Stella", headline: "12K Followers increase in Just One Month!", body: "If you're struggling with handling Instagram DMs and comments, automate as much as possible.", name: "Coding Stella", role: "Founder", rating: 5 },
  { avatarSrc: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ins8.webp", avatarAlt: "Deepak Badariya", headline: "Grew Instagram followers to 300K with Instagram Automation.", body: "We were able to increase our followers to 300K with the Giveaway automation.", name: "Deepak Badariya", role: "Founder, Jeevan Handicrafts", rating: 5 },
];

// ─── Testimonial Carousel ─────────────────────────────────────────────────────
function TestimonialCarousel({ onActiveChange }: { onActiveChange?: (i: number) => void }) {
  const [active, setActive] = useState(0);
  const total = testimonialSlides.length;
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((prev) => { const next = (prev + 1) % total; onActiveChange?.(next); return next; });
    }, 3000);
    return () => clearInterval(id);
  }, [paused, total, onActiveChange]);

  const go = (i: number) => { setActive(i); onActiveChange?.(i); };
  const slide = testimonialSlides[active];

  return (
    <div className="max-w-4xl mx-auto mt-8 relative" style={{ padding: "0 52px" }}
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="flex flex-col md:flex-row items-center gap-10 md:gap-12">
        <div className="flex-shrink-0" style={{ width: "220px", minHeight: "260px" }}>
          {slide.avatarSrc ? (
            <img src={slide.avatarSrc} alt={slide.avatarAlt} style={{ width: "220px", height: "280px", objectFit: "cover", display: "block", borderRadius: "20px" }}  loading="lazy" decoding="async" />
          ) : (
            <div style={{ width: "220px", height: "280px", borderRadius: "20px", background: "linear-gradient(135deg,rgba(200,146,42,0.15),rgba(245,216,122,0.05))", border: "1px dashed rgba(200,146,42,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ color: "#c8922a", fontWeight: 700, fontSize: "56px", fontFamily: "'Libre Baskerville',Georgia,serif", opacity: 0.5 }}>{slide.name.charAt(0)}</span>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4 flex-1 text-left">
          <p style={{ fontFamily: "'Libre Baskerville',serif", fontSize: "clamp(16px,1.8vw,22px)", fontStyle: "italic", background: "linear-gradient(135deg,#f5d87a,#e8b84b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontWeight: 700, margin: 0, lineHeight: 1.35 }}>{slide.headline}</p>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(13px,1.2vw,15px)", lineHeight: 1.8, color: "rgba(255,248,231,0.62)", margin: 0 }}>{slide.body}</p>
          <div style={{ marginTop: "8px" }}>
            <p style={{ fontFamily: "'Libre Baskerville',serif", fontSize: "16px", fontWeight: 700, background: "linear-gradient(135deg,#f5d87a,#c8922a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", margin: 0 }}>{slide.name}</p>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "13px", color: "rgba(255,248,231,0.42)", margin: 0, marginTop: "2px" }}>{slide.role}</p>
          </div>
          <div className="flex gap-1">{[...Array(slide.rating)].map((_, i) => <span key={i} style={{ color: "#f5d87a", fontSize: "15px" }}>★</span>)}</div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "28px" }}>
        {testimonialSlides.map((_, i) => (
          <button key={i} onClick={() => go(i)} style={{ width: i === active ? "22px" : "8px", height: "8px", borderRadius: "9999px", border: "none", cursor: "pointer", background: i === active ? "linear-gradient(90deg,#c8922a,#f5d87a)" : "rgba(200,146,42,0.28)", transition: "all 0.35s ease", padding: 0 }} />
        ))}
      </div>
    </div>
  );
}

const LOGO_STRIP_SRC = "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Logo-Strip-2048x98.webp";

const videoTutorials = [
  { title: "How to Automate Your Comment Replies",           youtubeSrc: "https://youtu.be/7LcbnNO1FkI", thumbnailSrc: "" },
  { title: "How to connect your number to Instagram Automation.", youtubeSrc: "https://youtu.be/IPBxsPPsAkQ", thumbnailSrc: "" },
  { title: "How To Automate Your Instagram DMs.",            youtubeSrc: "https://youtu.be/9S_P0aTk8pY", thumbnailSrc: "" },
];

// ─── Global Styles ────────────────────────────────────────────────────────────
const globalStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap');
  @keyframes shimmer    { 0%   { transform:translateX(-100%); } 100% { transform:translateX(200%);  } }
  @keyframes floatUp    { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-8px); } }
  @keyframes pulseGlow  { 0%,100% { opacity:0.55; } 50% { opacity:1; } }
  @keyframes gradientMove { 0% { background-position:0% 50%; } 50% { background-position:100% 50%; } 100% { background-position:0% 50%; } }
  @keyframes spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
  * { box-sizing:border-box; margin:0; padding:0; }
  ::selection { background:rgba(200,146,42,0.3); color:#fff8e7; }
  ::-webkit-scrollbar { width:5px; }
  ::-webkit-scrollbar-track { background:#060400; }
  ::-webkit-scrollbar-thumb { background:linear-gradient(180deg,#c8922a,#f5d87a); border-radius:99px; }
  body { background:#070500; }
`;

// ─── Video Carousel ──────────────────────────────────────────────────────────
// Mobile  : 1 card at a time, auto-slides every 3 s, pause on hover
// Desktop : all 3 cards in a 3-column grid (no carousel behaviour)
function VideoCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [perView, setPerView] = useState(1);
  const total = videoTutorials.length;

  // Detect desktop vs mobile
  useEffect(() => {
    const update = () => setPerView(window.innerWidth >= 640 ? 3 : 1);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Auto-slide every 3 s (mobile only — perView === 1)
  useEffect(() => {
    if (paused || perView > 1) return;
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % total);
    }, 3000);
    return () => clearInterval(id);
  }, [paused, perView, total]);

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  // ── Desktop: plain 3-column grid ──
  if (perView >= 3) {
    return (
      <div className="max-w-5xl mx-auto mt-8">
        <div className="grid grid-cols-3 gap-6">
          {videoTutorials.map((v, i) => (
            <VideoCard key={i} delay={i * 100} title={v.title} youtubeSrc={v.youtubeSrc} thumbnailSrc={v.thumbnailSrc} />
          ))}
        </div>
      </div>
    );
  }

  // ── Mobile: single-card carousel ──
  const v = videoTutorials[current];
  return (
    <div
      className="max-w-lg mx-auto mt-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Card */}
      <div style={{ position: "relative" }}>
        <VideoCard key={current} delay={0} title={v.title} youtubeSrc={v.youtubeSrc} thumbnailSrc={v.thumbnailSrc} />

        {/* Prev arrow */}
        <button
          onClick={prev}
          aria-label="Previous video"
          style={{
            position: "absolute", top: "38%", left: "-20px", transform: "translateY(-50%)",
            width: "38px", height: "38px", borderRadius: "50%",
            background: "rgba(10,8,2,0.85)", border: "1px solid rgba(200,146,42,0.4)",
            color: "#f5d87a", fontSize: "20px", fontWeight: 600, lineHeight: 1,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", zIndex: 10,
            boxShadow: "0 2px 12px rgba(0,0,0,0.5)",
            transition: "background 0.2s, border-color 0.2s",
          }}
        >‹</button>

        {/* Next arrow */}
        <button
          onClick={next}
          aria-label="Next video"
          style={{
            position: "absolute", top: "38%", right: "-20px", transform: "translateY(-50%)",
            width: "38px", height: "38px", borderRadius: "50%",
            background: "rgba(10,8,2,0.85)", border: "1px solid rgba(200,146,42,0.4)",
            color: "#f5d87a", fontSize: "20px", fontWeight: 600, lineHeight: 1,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", zIndex: 10,
            boxShadow: "0 2px 12px rgba(0,0,0,0.5)",
            transition: "background 0.2s, border-color 0.2s",
          }}
        >›</button>
      </div>

      {/* Dot indicators */}
      <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "20px" }}>
        {videoTutorials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              width: i === current ? "22px" : "8px", height: "8px",
              borderRadius: "9999px", border: "none", cursor: "pointer", padding: 0,
              background: i === current
                ? "linear-gradient(90deg,#c8922a,#f5d87a)"
                : "rgba(200,146,42,0.28)",
              transition: "all 0.35s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export default function InstagramAutomation() {

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
      <SEO {...pageSEO.instagramAutomation} />
      <style>{globalStyle}</style>
      <div style={{ background: "#070500", color: "#fff8e7", fontFamily: "'Inter',sans-serif", overflowX: "hidden", position: "relative" }}>

        {/* Ambient orbs */}
        <div className="fixed pointer-events-none" style={{ top: "4%", right: "5%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle,rgba(200,146,42,0.07) 0%,transparent 70%)", filter: "blur(80px)", zIndex: 0 }} />
        <div className="fixed pointer-events-none" style={{ bottom: "20%", left: "3%", width: "350px", height: "350px", borderRadius: "50%", background: "radial-gradient(circle,rgba(245,216,122,0.05) 0%,transparent 70%)", filter: "blur(100px)", zIndex: 0 }} />

        {/* ══ SECTION 1 — HERO ══
            Desktop: pt-20 md:pt-28 lg:pt-32 via Tailwind (unchanged)
            Mobile : h1 gets marginTop: "110px" via inline style
                     → pushes heading below the fixed navbar
                     → inline style always wins, cannot be overridden
        */}
        <section className="relative z-10 px-4 sm:px-8 lg:px-16 xl:px-24 py-16 md:py-24 pt-20 md:pt-28 lg:pt-32">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16" style={{ marginTop:150 }}>

            <div className="flex-1 flex flex-col gap-6 text-center lg:text-left">
              <Reveal direction="left" delay={0}>
                {/*
                  marginTop: isMobile ? "110px" : "0px"
                  Mobile only: pushes h1 down below the fixed navbar
                  Desktop: zero change, exactly as before
                */}
                <h1 style={{
                  fontFamily: "'Libre Baskerville','Baskerville',Georgia,serif",
                  fontSize: "clamp(28px,4vw,52px)", lineHeight: 1.2,
                  background: "linear-gradient(135deg,#f5d87a 0%,#fff8e7 40%,#e8b84b 70%,#f5d87a 100%)",
                  backgroundSize: "200% 200%", WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent", backgroundClip: "text",
                  animation: "gradientMove 5s ease infinite",
                  marginTop: isMobile ? "110px" : "0px",   /* ← ONLY mobile change */
                }}>
                  Turn <span style={{ fontStyle: "italic", color: "#f5d87a" }}>Instagram Comments</span> into Conversions!
                </h1>
              </Reveal>

              <Reveal direction="left" delay={80}>
                <SubText className="max-w-lg mx-auto lg:mx-0">
                  Turn DMs, comments, real mentions into sales with Instagram Automation.
                </SubText>
              </Reveal>

              <Reveal direction="left" delay={150}>
                <div className="flex items-center gap-3 flex-wrap justify-center lg:justify-start">
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "13px", color: "rgba(255,248,231,0.55)", fontWeight: 500 }}>
                    Trusted by 50,000+ Businesses Globally
                  </span>
                </div>
                <div className="mt-4 flex justify-center lg:justify-start">
                  {LOGO_STRIP_SRC ? (
                    <img src={LOGO_STRIP_SRC} alt="Trusted brands logo strip"
                      style={{ display: "block", height: "48px", width: "auto", maxWidth: "100%", objectFit: "contain", filter: "brightness(1.1)" }} />
                  ) : (
                    <div className="flex flex-wrap items-center gap-3 justify-center lg:justify-start">
                      {["Interakt", "KIRO", "DLY", "& more"].map((b) => (
                        <span key={b} className="px-3 py-1.5 rounded-lg text-xs"
                          style={{ border: "1px solid rgba(200,146,42,0.22)", color: "rgba(245,216,122,0.6)", fontFamily: "'Inter',sans-serif", background: "rgba(200,146,42,0.06)", fontWeight: 500 }}>
                          {b}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Reveal>

             
            </div>

            <Reveal direction="right" delay={150} className="flex-1 w-full">
              <div className="relative" style={{ animation: "floatUp 5s ease-in-out infinite" }}>
                <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{
                  background: "radial-gradient(ellipse,rgba(200,146,42,0.16) 0%,transparent 70%)",
                  filter: "blur(24px)", animation: "pulseGlow 3s ease-in-out infinite",
                }} />
                <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ins1.webp" alt="Instagram Automation Hero"
                  className="w-full rounded-2xl" style={{ display: "block", objectFit: "cover", minHeight: "300px" }} />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══ SECTION 2 — FEATURE CARDS ══ */}
        <Section className="relative z-10">
          <Reveal direction="up" delay={0}>
            <SectionHeading accent="Instagram">Supercharge your Instagram game with Automation</SectionHeading>
            <SubText className="text-center mt-3 max-w-2xl mx-auto">
              Automate comments, DMs, story mentions and more all from a single platform built for growth.
            </SubText>
          </Reveal>
          <div className="max-w-6xl mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FeatureCard icon="⚡" imageSrc="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ins2.webp" delay={80} title="Engage, Automate, Convert." desc="Whether it's a 'How much is it?' on your post or a story reply,Instagram automation responds to customers automatically, making it easier for you to generate leads." />
            <FeatureCard icon="❓" imageSrc="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ins3.webp" delay={160} title="Overwhelmed by FAQs in your DMs?" desc="Let Instagram Automation handle repetitive questions, freeing up your team to focus on actual relationship-building with customers." />
            <FeatureCard icon="📥" imageSrc="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ins4.webp" delay={240} title="Omnichannel Inbox to offer support across Instagram & WhatsApp" desc="Omnichannel Inbox unifies your customer conversations across Instagram comments, story reactions, and DMs, making it easier for your team to respond to them from a common platform!" />
            <FeatureCard icon="🎁" imageSrc="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ins5.webp" delay={320} title="Grow Followers & Capture Leads with Giveaways" desc="helps you to automatically engage your followers, capture data from comments and DM interactions, directly build contact records for follow-up, boosting your campaigns, and more." />
          </div>
        </Section>

        {/* ══ SECTION 3 — COMPARISON TABLE ══ */}
        <Section className="relative z-10">
          <Reveal direction="up" delay={0}>
            <p className="text-center text-sm mb-2" style={{ color: "rgba(255,248,231,0.38)", fontFamily: "'Inter',sans-serif" }}>Still wasting your time with ManyChat?</p>
            <SectionHeading>Switch to a better platform now!</SectionHeading>
          </Reveal>
          <Reveal direction="up" delay={100} className="max-w-5xl mx-auto mt-8">
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(200,146,42,0.22)", background: "rgba(255,255,255,0.015)" }}>
              <div className="grid grid-cols-12 px-4 py-4" style={{ borderBottom: "1px solid rgba(200,146,42,0.18)", background: "rgba(200,146,42,0.06)" }}>
                <div className="col-span-3" style={{ fontFamily: "'Libre Baskerville',serif", fontSize: "13px", color: "rgba(255,248,231,0.5)" }}>Category</div>
                <div className="col-span-5" style={{ fontFamily: "'Libre Baskerville',serif", fontSize: "13px", color: "rgba(255,248,231,0.5)" }}>Feature</div>
                <div className="col-span-2 text-center" style={{ fontFamily: "'Libre Baskerville',serif", fontSize: "13px", background: "linear-gradient(135deg,#f5d87a,#c8922a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Instagram Automation</div>
                <div className="col-span-2 text-center" style={{ fontFamily: "'Libre Baskerville',serif", fontSize: "13px", color: "rgba(255,248,231,0.38)" }}>ManyChat</div>
              </div>
              {comparisonRows.map((row, i) => (
                <div key={i} className="grid grid-cols-12 px-4 py-3 items-center"
                  style={{ borderBottom: i < comparisonRows.length - 1 ? "1px solid rgba(200,146,42,0.1)" : "none", background: i % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent" }}>
                  <div className="col-span-3" style={{ fontFamily: "'Inter',sans-serif", fontSize: "12px", color: row.category ? "rgba(245,216,122,0.55)" : "transparent", fontWeight: 600 }}>{row.category || "·"}</div>
                  <div className="col-span-5" style={{ fontFamily: "'Inter',sans-serif", fontSize: "12px", color: "rgba(255,248,231,0.6)", lineHeight: 1.5 }}>{row.feature}</div>
                  <div className="col-span-2 flex justify-center"><Check gold={row.interakt} /></div>
                  <div className="col-span-2 flex justify-center"><Check gold={row.manychat} /></div>
                </div>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* ══ SECTION 4 — PRICING ══ */}
        <Section className="relative z-10">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
            <Reveal direction="left" delay={0} className="flex-1">
              <SectionHeading centered={false}>Best Instagram Automation Tools with Affordable Pricing</SectionHeading>
              <SubText className="mt-4 max-w-sm">Simple, flat pricing no hidden fees, no per-message charges. Built for businesses that want to scale.</SubText>
            </Reveal>
            <Reveal direction="right" delay={100} className="flex-1 w-full max-w-sm">
              <HoverCard className="p-8 flex flex-col gap-5">
                <div>
                  <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "rgba(245,216,122,0.42)", fontFamily: "'Inter',sans-serif" }}>Instagram Automation</p>
                  <div className="flex items-end gap-1">
                    <span style={{ fontFamily: "'Libre Baskerville',serif", fontSize: "42px", fontWeight: 700, background: "linear-gradient(135deg,#f5d87a,#c8922a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>₹999</span>
                    <span style={{ color: "rgba(255,248,231,0.38)", fontFamily: "'Inter',sans-serif", fontSize: "13px", paddingBottom: "8px" }}>/mo free trial</span>
                  </div>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "12px", color: "rgba(245,216,122,0.45)", marginTop: "2px" }}>Unlimited Agents (Add)</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "rgba(245,216,122,0.4)", fontFamily: "'Inter',sans-serif" }}>All Instagram Features</p>
                  <div className="flex flex-col gap-2">
                    {pricingFeatures.map((f) => (
                      <div key={f} className="flex items-center gap-2">
                        <Check gold />
                        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "13px", color: "rgba(255,248,231,0.7)" }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <GoldButton className="w-full text-center">Start Your Trial</GoldButton>
              </HoverCard>
            </Reveal>
          </div>
        </Section>

        {/* ══ SECTION 5 — TESTIMONIALS ══ */}
        <Section className="relative z-10">
          <Reveal direction="up" delay={0}><SectionHeading>Real Brands, Real Results</SectionHeading></Reveal>
          <TestimonialCarousel />
        </Section>

        {/* ══ SECTION 6 — VIDEO TUTORIALS CAROUSEL ══
            Mobile  : 1 card visible, auto-slides every 3s, prev/next arrows
            Desktop : all 3 cards shown in a grid (sm:grid-cols-3), no carousel
        */}
        <Section className="relative z-10">
          <Reveal direction="up" delay={0}>
            <SectionHeading>Video Tutorials</SectionHeading>
            <p className="text-center mt-2" style={{ fontFamily: "'Inter',sans-serif", fontSize: "13px", color: "rgba(255,248,231,0.38)", fontStyle: "italic" }}>Watch &amp; Learn</p>
          </Reveal>
          <VideoCarousel />
        </Section>

        {/* ══ SECTION 7 — FAQ ══ */}
        <Section className="relative z-10">
          <Reveal direction="up" delay={0}><SectionHeading>Frequently Asked Questions</SectionHeading></Reveal>
          <Reveal direction="up" delay={80} className="max-w-3xl mx-auto mt-8">
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(200,146,42,0.18)", background: "rgba(255,255,255,0.015)" }}>
              <div className="px-6 py-2">
                {faqData.map((item) => <FaqItem key={item.question} question={item.question} answer={item.answer} />)}
              </div>
            </div>
          </Reveal>
        </Section>
       <ContactUsForm/>
        {/* Bottom accent line */}
        
      </div>
    </>
  );
}