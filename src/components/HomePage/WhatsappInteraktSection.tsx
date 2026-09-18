import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const LOGO_STRIP_SRC = "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Logo1.png";
const WHATSAPP_NUMBER = "919201958278"; // bot line → guided flow
const WHATSAPP_MESSAGE = encodeURIComponent("Hi! I'd like to book a strategy call.");
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

const BG_IMAGES = [
  { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/demo1.webp", top: "6%", left: "2%", rotate: -14, scale: 1.05 },
  { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/demo2.webp", top: "5%", right: "1%", rotate: 12, scale: 0.95 },
  { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/demo3.webp", top: "38%", left: "-2%", rotate: -8, scale: 1.0 },
  { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/demo4.webp", top: "40%", right: "-1%", rotate: 10, scale: 1.08 },
  {
    src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/demo5.webp", top: "72%", left: "4%", rotate: -16, scale: 0.92

  },
  { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wauto1.webp", top: "75%", right: "3%", rotate: 18, scale: 1.0 },
];

const LAPTOP_CAROUSEL_IMAGES = ["https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wasap33.webp", "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wasapcimg13.webp"];
const MOBILE_CAROUSEL_IMAGES = ["https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/was62.webp", "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wasapmbc2.webp"];

/* ══════════════════════════════════════════════════════════
   FLOATING BG IMAGES
══════════════════════════════════════════════════════════ */
const FloatingBgImages = ({ revealed }: { revealed: boolean }) => (
  <>
    {BG_IMAGES.map((img, i) => (
      <motion.div
        key={i}
        style={{
          position: "absolute", zIndex: 0,
          top: img.top ?? "auto",
          left: (img as any).left ?? "auto",
          right: (img as any).right ?? "auto",
          bottom: (img as any).bottom ?? "auto",
        }}
        initial={{ opacity: 0, scale: 0.85, rotate: img.rotate }}
        animate={revealed ? { opacity: 1, scale: img.scale, rotate: img.rotate } : { opacity: 0, scale: 0.85, rotate: img.rotate }}
        transition={{ opacity: { duration: 0.9, delay: 0.15 + i * 0.12, ease: "easeOut" }, scale: { duration: 0.9, delay: 0.15 + i * 0.12, ease: "easeOut" } }}
      >
        <img
          src={img.src}
          alt={`showcase-${i + 1}`}
          style={{
            width: "clamp(120px, 14vw, 220px)", height: "auto", display: "block",
            WebkitMaskImage: "radial-gradient(ellipse 82% 82% at 50% 50%, black 55%, transparent 100%)",
            maskImage: "radial-gradient(ellipse 82% 82% at 50% 50%, black 55%, transparent 100%)",
            filter: "brightness(0.85) saturate(0.9)", opacity: 0.82,
            pointerEvents: "none", userSelect: "none",
          }}
        />
      </motion.div>
    ))}
  </>
);

/* ══════════════════════════════════════════════════════════
   LAPTOP CAROUSEL fills entire viewport, no gaps
══════════════════════════════════════════════════════════ */
const LaptopCarousel = ({ activeIdx }: { activeIdx: number }) => (
  <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden", background: "#000" }}>
    {LAPTOP_CAROUSEL_IMAGES.map((src, i) => (
      <img
        key={i}
        src={src}
        alt={`Screen ${i + 1}`}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          /* KEY FIX: cover fills the entire space; top anchors the image */
          objectFit: "cover",
          objectPosition: "center top",
          transition: "opacity 0.8s ease-in-out",
          opacity: activeIdx === i ? 1 : 0,
          display: "block",
        }}
      />
    ))}
  </div>
);

/* ══════════════════════════════════════════════════════════
   MOBILE carousel self-contained with dots
══════════════════════════════════════════════════════════ */
const MobileImageCarousel = ({ images }: { images: string[] }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  useEffect(() => {
    if (images.length <= 1) return;
    const t = setInterval(() => setActiveIdx(p => (p + 1) % images.length), 6500);
    return () => clearInterval(t);
  }, [images]);
  return (
    <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden", transformStyle: "preserve-3d", transform: "translateZ(0)" }}>
      {images.map((src, i) => (
        <img key={i} src={src} alt={`Screen ${i + 1}`}
          style={{ 
            position: "absolute", 
            inset: 0, 
            width: "100%", 
            height: "100%", 
            objectFit: "cover", 
            transition: "opacity 0.8s ease-in-out", 
            opacity: activeIdx === i ? 1 : 0,
            /* Enhanced clarity hacks for mobile browsers */
            transform: "perspective(1px) translateZ(0) scale(1.0)",
            WebkitBackfaceVisibility: "hidden",
            backfaceVisibility: "hidden",
            WebkitTransform: "perspective(1px) translate3d(0,0,0)",
            imageRendering: "auto",
            willChange: "transform, opacity"
          }}
        />
      ))}
      <div style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 5, zIndex: 5 }}>
        {images.map((_, i) => (
          <div key={i} style={{ width: activeIdx === i ? 16 : 6, height: 6, borderRadius: 999, background: activeIdx === i ? "rgba(37,211,102,0.9)" : "rgba(255,255,255,0.35)", transition: "all 0.3s ease" }} />
        ))}
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════
   LAPTOP SCREEN CONTENT
   Stack (top → bottom inside the MacBook viewport):
     ① Carousel image   fills all available flex space
     ② Middle strip     CTA button (compact) + slide dots
     ③ Logo marquee     fixed at the very bottom
══════════════════════════════════════════════════════════ */
const LaptopScreenContent = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (LAPTOP_CAROUSEL_IMAGES.length <= 1) return;
    const t = setInterval(() => setActiveIdx(p => (p + 1) % LAPTOP_CAROUSEL_IMAGES.length), 6500);
    return () => clearInterval(t);
  }, []);

  return (
    <div id="whatsapp" style={{
      width: "100%",
      height: "100%",
      background: "#000",
      display: "flex",
      flexDirection: "column",
      boxSizing: "border-box",
      fontFamily: "'Inter','Segoe UI',sans-serif",
      overflow: "hidden",
    }}>

      {/* ① Carousel grows to fill remaining height, images cover entire area */}
      <div style={{ flex: 1, minHeight: 0, position: "relative", overflow: "hidden" }}>
        <LaptopCarousel activeIdx={activeIdx} />
      </div>

      {/* ② CTA button + dots */}
      <div style={{
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "clamp(5px, 0.65vw, 10px)",
        padding: "clamp(7px, 1vw, 14px) 12px clamp(6px, 0.8vw, 12px)",
        background: "rgba(4,10,6,0.95)",
        borderTop: "1px solid rgba(37,211,102,0.09)",
      }}>

        {/* Compact CTA button */}
        <Link
          to="/contact-us"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(4px, 0.5vw, 7px)",
            background: "linear-gradient(135deg,#1a4a2a,#0f3019)",
            color: "#e9edef",
            fontWeight: 700,
            fontSize: "clamp(9px, 1.05vw, 14px)",
            padding: "clamp(5px, 0.65vw, 10px) clamp(16px, 2.2vw, 32px)",
            borderRadius: 999,
            textDecoration: "none",
            border: "1px solid rgba(37,211,102,0.45)",
            boxShadow: "0 0 20px rgba(37,211,102,0.22), 0 4px 16px rgba(0,0,0,0.65)",
            letterSpacing: "0.01em",
            whiteSpace: "nowrap",
            cursor: "pointer",
          }}
        >
          <svg viewBox="0 0 32 32" fill="#25D366"
            style={{ width: "clamp(10px, 1.15vw, 16px)", height: "clamp(10px, 1.15vw, 16px)", flexShrink: 0 }}>
            <path d="M16 2C8.268 2 2 8.268 2 16c0 2.49.664 4.82 1.82 6.83L2 30l7.39-1.78A13.93 13.93 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm7.2 19.4c-.3.85-1.76 1.62-2.43 1.72-.62.09-1.4.13-2.26-.14-.87-.27-1.97-.7-3.39-1.37-2.83-1.33-4.83-3.9-5.14-4.32-.31-.42-1.56-2.08-1.56-3.97s.99-2.81 1.34-3.2c.35-.39.76-.49 1.02-.49.26 0 .51.01.74.01.23 0 .55-.09.86.66.31.75 1.08 2.65 1.18 2.84.1.19.16.42.03.68-.13.26-.19.42-.38.64-.19.22-.4.49-.57.66-.19.19-.38.4-.17.79.22.38.96 1.58 2.06 2.56 1.41 1.26 2.6 1.65 2.97 1.83.38.19.61.16.83-.1.22-.25.96-1.12 1.22-1.5.25-.38.51-.32.86-.19.34.13 2.23 1.05 2.61 1.24.38.19.64.29.73.45.1.16.1.93-.22 1.79z" />
          </svg>
          Book a Strategy Call
          <svg style={{ width: "clamp(9px,1vw,13px)", height: "clamp(9px,1vw,13px)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>

        {/* Slide dots */}
        <div style={{ display: "flex", gap: "clamp(3px, 0.4vw, 6px)", alignItems: "center" }}>
          {LAPTOP_CAROUSEL_IMAGES.map((_, i) => (
            <div
              key={i}
              onClick={() => setActiveIdx(i)}
              style={{
                width: activeIdx === i ? "clamp(18px,1.10vw,22px)" : "clamp(5px,0.6vw,8px)",
                height: "clamp(5px,0.6vw,8px)",
                borderRadius: 999,
                background: activeIdx === i ? "rgba(37,211,102,0.9)" : "rgba(255,255,255,0.28)",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>

      {/* ③ Logo marquee */}
      <div style={{
        flexShrink: 0,
        overflow: "hidden",
        borderTop: "1px solid rgba(37,211,102,0.10)",
        background: "rgba(10,30,18,0.6)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}>
        <div style={{ display: "flex", width: "max-content", animation: "marqueeScroll 30s linear infinite" }}>
          {[...Array(4)].map((_, i) => (
            <img key={i} src={LOGO_STRIP_SRC} alt="Partner logos"
              style={{ height: "clamp(20px, 2.8vw, 38px)", width: "auto", display: "block", opacity: 0.9, flexShrink: 0 }}
            />
          ))}
        </div>
      </div>

    </div>
  );
};

/* ══════════════════════════════════════════════════════════
   MOBILE SCREEN CONTENT
══════════════════════════════════════════════════════════ */
const MobileScreenContent = () => (
  <div style={{ width: "100%", height: "100%", background: "#000", position: "relative", overflow: "hidden" }}>
    <MobileImageCarousel images={MOBILE_CAROUSEL_IMAGES} />
  </div>
);

/* ══════════════════════════════════════════════════════════
   CSS MACBOOK MOCKUP
   KEY FIX: .mb-viewport margin removed → images fill 100% of screen area
══════════════════════════════════════════════════════════ */
const MacBookMockup = () => (
  <div className="macbook-wrap">
    <div className="mb-screen">
      <div className="mb-screen-inner">
        <div style={{ position: "absolute", top: "1.8%", left: "50%", transform: "translateX(-50%)", width: 6, height: 6, borderRadius: "50%", background: "#1a1a1a", boxShadow: "0 0 0 1.5px rgba(255,255,255,0.08), inset 0 0 3px rgba(0,0,0,0.9)", zIndex: 10 }} />
        {/* mb-viewport: margin removed so content fills the entire bezel area */}
        <div className="mb-viewport"><LaptopScreenContent /></div>
        <div style={{ position: "absolute", bottom: "0.75%", left: "0.5%", borderTop: "1.5px solid rgba(255,255,255,0.12)", width: "99%", pointerEvents: "none" }} />
      </div>
    </div>
    <div className="mb-base"><div className="mb-base-inner" /></div>
    <div className="mb-notch" />
  </div>
);

/* ══════════════════════════════════════════════════════════
   IPHONE MOCKUP
══════════════════════════════════════════════════════════ */
const IPhoneMockup = () => (
  <div style={{ perspective: 1400, perspectiveOrigin: "50% 20%", width: "100%", display: "flex", justifyContent: "center" }}>
    <div style={{ width: "min(400px,102vw)", transform: "rotateX(5deg) rotateY(-10deg)", transformStyle: "preserve-3d", transformOrigin: "center bottom" }}>
      <div style={{ width: "100%", aspectRatio: "9/19.5", background: "linear-gradient(160deg,#3e3e3e 0%,#282828 10%,#191919 50%,#111 100%)", borderRadius: 46, position: "relative", overflow: "hidden", boxShadow: ["inset 3px 0 0 rgba(255,255,255,0.13)", "inset 0 4px 0 rgba(255,255,255,0.1)", "inset -2px 0 0 rgba(0,0,0,0.55)", "inset 0 -2px 0 rgba(0,0,0,0.4)", "0 0 0 1.5px #333", "-18px 25px 70px rgba(0,0,0,0.95)", "0 40px 90px rgba(0,0,0,0.85)", "0 0 70px rgba(37,211,102,0.08)"].join(", ") }}>
        {[{ t: "15%", h: "4.5%" }, { t: "23%", h: "8%" }, { t: "33.5%", h: "8%" }].map((b, i) => (
          <div key={i} style={{ position: "absolute", left: -4, top: b.t, width: 4, height: b.h, background: "linear-gradient(to right,#1a1a1a,#2e2e2e 50%,#242424)", borderRadius: "3px 0 0 3px", boxShadow: "-2px 0 5px rgba(0,0,0,0.7),inset 0 1px 0 rgba(255,255,255,0.07)" }} />
        ))}
        <div style={{ position: "absolute", right: -4, top: "27%", width: 4, height: "15%", background: "linear-gradient(to left,#1a1a1a,#2e2e2e 50%,#242424)", borderRadius: "0 3px 3px 0", boxShadow: "2px 0 5px rgba(0,0,0,0.7),inset 0 1px 0 rgba(255,255,255,0.07)" }} />
        <div style={{ 
          position: "absolute", 
          inset: "3.5px", 
          background: "#000", 
          borderRadius: 43, 
          overflow: "hidden", 
          boxShadow: "inset 0 0 20px rgba(0,0,0,0.6)",
          /* Isolation prevents the border-radius clipping from de-optimizing the inner content */
          isolation: "isolate",
          WebkitMaskImage: "-webkit-radial-gradient(white, black)"
        }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 34, zIndex: 20, display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "9px 18px 0" }}>
            <span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>9:41</span>
            <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
              <svg width={12} height={9} viewBox="0 0 24 18" fill="#fff"><rect x="0" y="9" width="4" height="9" rx="1" /><rect x="6" y="5" width="4" height="13" rx="1" /><rect x="12" y="2" width="4" height="16" rx="1" /><rect x="18" y="0" width="4" height="18" rx="1" /></svg>
              <svg width={13} height={9} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><path d="M1.5 8.5C5 5 9.5 3 12 3s7 2 10.5 5.5M5 12c1.9-1.9 4.3-3 7-3s5.1 1.1 7 3M8.5 15.5c1-1 2.1-1.5 3.5-1.5s2.5.5 3.5 1.5" /></svg>
              <svg width={22} height={10} viewBox="0 0 32 14" fill="none"><rect x="0" y="0" width="28" height="14" rx="3" stroke="#fff" strokeWidth="1.5" /><rect x="1.5" y="1.5" width="24" height="11" rx="2" fill="#fff" /><path d="M29 4.5v5c1.3-.5 2.1-1.5 2.1-2.5s-.8-2-2.1-2.5z" fill="#fff" /></svg>
            </div>
          </div>
          <div style={{ position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", width: 80, height: 24, background: "#000", borderRadius: 999, zIndex: 25, boxShadow: "0 0 0 1px rgba(255,255,255,0.06)" }} />
          <div style={{ position: "absolute", inset: 0, top: 34, height: "calc(100% - 34px)" }}><MobileScreenContent /></div>
          <div style={{ position: "absolute", inset: 0, borderRadius: 43, pointerEvents: "none", zIndex: 30, background: "linear-gradient(130deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 25%, transparent 50%)" }} />
        </div>
        <div style={{ position: "absolute", inset: 0, borderRadius: 46, pointerEvents: "none", background: "linear-gradient(135deg,rgba(255,255,255,0.09) 0%,transparent 35%)" }} />
        <div style={{ position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)", width: "34%", height: 5, borderRadius: 999, background: "rgba(255,255,255,0.3)", zIndex: 35 }} />
      </div>
      <div style={{ width: "65%", margin: "0 auto", height: 22, background: "linear-gradient(to bottom,rgba(37,211,102,0.05),transparent)", filter: "blur(6px)", borderRadius: "0 0 50% 50%" }} />
      <div style={{ width: "58%", height: 16, margin: "-2px auto 0", background: "radial-gradient(ellipse,rgba(0,0,0,0.75) 0%,transparent 70%)", filter: "blur(12px)" }} />
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════
   MAIN SECTION
══════════════════════════════════════════════════════════ */
const PremiumSection = () => {
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) setRevealed(true); },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: revealed ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] as any },
  });

  return (
    <div
      ref={ref}
      style={{
        background: "radial-gradient(ellipse 100% 50% at 50% 0%, rgba(8,30,15,0.98) 0%, #040a06 45%, #000 100%)",
        position: "relative",
        overflow: "visible",
        fontFamily: "'Inter','Segoe UI',sans-serif",
      }}
    >
      <div style={{ position: "absolute", inset: 0, opacity: 0.03, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(37,211,102,1) 1px,transparent 1px),linear-gradient(90deg,rgba(37,211,102,1) 1px,transparent 1px)", backgroundSize: "52px 52px" }} />
      <div style={{ position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)", width: 1000, height: 500, pointerEvents: "none", background: "radial-gradient(ellipse,rgba(37,211,102,0.11) 0%,transparent 70%)" }} />
      <div className="ps-bg-images"><FloatingBgImages revealed={revealed} /></div>
      <div style={{ position: "absolute", left: "3%", top: "20%", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(37,211,102,0.04) 0%, transparent 70%)", pointerEvents: "none", filter: "blur(30px)" }} />
      <div style={{ position: "absolute", right: "3%", top: "30%", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(37,211,102,0.04) 0%, transparent 70%)", pointerEvents: "none", filter: "blur(30px)" }} />

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ── DESKTOP MacBook only ── */}
        <div className="ps-desktop">
          <div style={{ padding: "clamp(44px,6vw,80px) clamp(16px,4vw,48px)" }}>
            <motion.div {...fadeUp(0)}>
              <MacBookMockup />
            </motion.div>
          </div>
        </div>

        {/* ── MOBILE unchanged ── */}
        <div className="ps-mobile">
          <div style={{ padding: "40px 20px 56px", display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>

            <motion.div {...fadeUp(0)} style={{ marginBottom: 18 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(37,211,102,0.1)", border: "1px solid rgba(37,211,102,0.3)", borderRadius: 999, padding: "6px 16px" }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#25D366", boxShadow: "0 0 7px rgba(37,211,102,0.9)", animation: "waPulse 2s ease-in-out infinite" }} />
                <span style={{ color: "#25D366", fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase" }}>Official Interakt Partner</span>
              </div>
            </motion.div>

            <motion.div {...fadeUp(0.08)} style={{ textAlign: "center", marginBottom: 14 }}>
              <h1 style={{ color: "#fff", fontSize: "clamp(1.65rem,6vw,2.4rem)", fontWeight: 900, letterSpacing: "-0.025em", lineHeight: 1.15, margin: "0 0 12px" }}>
                Scale <span style={{ color: "#25D366" }}>WhatsApp</span> Into a<br />Sales &amp; Automation Engine
              </h1>
              <p style={{ color: "rgba(201,220,210,0.6)", fontSize: "0.88rem", maxWidth: 320, margin: "0 auto", lineHeight: 1.65 }}>
                We implement <strong style={{ color: "#e9edef" }}>Interakt</strong> for end-to-end WhatsApp automation from lead capture to payment collection.
              </p>
            </motion.div>

            <motion.div {...fadeUp(0.16)} style={{ width: "100%", marginBottom: 24 }}>
              <IPhoneMockup />
            </motion.div>

            <motion.p {...fadeUp(0.22)} style={{ textAlign: "center", color: "rgba(201,220,210,0.32)", fontSize: 12, letterSpacing: "0.02em", marginBottom: 28 }}>
              Powered by <strong style={{ color: "rgba(201,220,210,0.55)" }}>Interakt</strong> · Backed by Meta &amp; Jio
            </motion.p>

            <motion.div {...fadeUp(0.28)} style={{ width: "100%", display: "flex", justifyContent: "center" }}>
              <Link to="/contact-us"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, background: "linear-gradient(135deg,#1a4a2a,#0f3019)", color: "#e9edef", fontWeight: 700, fontSize: "1rem", padding: "16px 0", borderRadius: 999, textDecoration: "none", width: "100%", maxWidth: 320, border: "1px solid rgba(37,211,102,0.4)", boxShadow: "0 0 28px rgba(37,211,102,0.18), 0 8px 24px rgba(0,0,0,0.55)", WebkitTapHighlightColor: "transparent", position: "relative", zIndex: 10 }}>
                <svg viewBox="0 0 32 32" fill="#25D366" style={{ width: 20, height: 20, flexShrink: 0 }}>
                  <path d="M16 2C8.268 2 2 8.268 2 16c0 2.49.664 4.82 1.82 6.83L2 30l7.39-1.78A13.93 13.93 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm7.2 19.4c-.3.85-1.76 1.62-2.43 1.72-.62.09-1.4.13-2.26-.14-.87-.27-1.97-.7-3.39-1.37-2.83-1.33-4.83-3.9-5.14-4.32-.31-.42-1.56-2.08-1.56-3.97s.99-2.81 1.34-3.2c.35-.39.76-.49 1.02-.49.26 0 .51.01.74.01.23 0 .55-.09.86.66.31.75 1.08 2.65 1.18 2.84.1.19.16.42.03.68-.13.26-.19.42-.38.64-.19.22-.4.49-.57.66-.19.19-.38.4-.17.79.22.38.96 1.58 2.06 2.56 1.41 1.26 2.6 1.65 2.97 1.83.38.19.61.16.83-.1.22-.25.96-1.12 1.22-1.5.25-.38.51-.32.86-.19.34.13 2.23 1.05 2.61 1.24.38.19.64.29.73.45.1.16.1.93-.22 1.79z" />
                </svg>
                Book a Strategy Call
                <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            </motion.div>

          </div>
        </div>
      </div>

      <style>{`

        .macbook-wrap      { padding:2% 2%; margin:0 auto; max-width:1200px; width:100%; }
        .mb-screen         { background:#000; border-radius:3% 3% 0.5% 0.5%/5%; margin:0 auto; position:relative; width:92%; }
        .mb-screen-inner   { border:2px solid #cacacc; border-radius:3% 3% 0.5% 0.5%/5%; box-shadow:0 0 0 1px rgba(0,0,0,0.8) inset,0 0 1px 2px rgba(255,255,255,0.3) inset; display:block; padding-top:54%; position:relative; }
        .mb-screen-inner::after { content:""; border-top:2px solid rgba(255,255,255,0.15); position:absolute; bottom:0.75%; left:0.5%; padding-top:1%; width:99%; }

        /* percentage radius scales proportionally with the mockup at every viewport width */
        .mb-viewport       { position:absolute; bottom:0; left:0; right:0; top:0; background:#000; overflow:hidden; border-radius:2.8% 2.8% 0.5% 0.5% / 4.5% 4.5% 0.8% 0.8%; }

        .mb-base           { position:relative; width:100%; }
        .mb-base-inner     { display:block; padding-top:3.3%; background:linear-gradient(#eaeced,#edeef0 55%,#fff 55%,#8a8b8f 56%,#999ba0 61%,#4B4B4F 84%,#262627 89%,rgba(0,0,0,.01) 98%); border-radius:0 0 10% 10%/0 0 50% 50%; position:relative; }
        .mb-base-inner::after { background:linear-gradient(90deg,rgba(0,0,0,0.5),rgba(255,255,255,0.8) 0.5%,rgba(0,0,0,0.4) 3.3%,transparent 15%,rgba(255,255,255,0.8) 50%,transparent 85%,rgba(0,0,0,0.4) 96.7%,rgba(255,255,255,0.8) 99.5%,rgba(0,0,0,0.5) 100%); content:""; height:53%; position:absolute; top:0; width:100%; }
        .mb-notch          { background:#ddd; border-radius:0 0 7% 7%/0 0 95% 95%; box-shadow:-5px -1px 3px rgba(0,0,0,0.2) inset,5px -1px 3px rgba(0,0,0,0.2) inset; margin:0 auto; margin-top:-3.5%; z-index:2; position:relative; width:14%; }
        .mb-notch::before  { content:""; display:block; padding-top:10%; }

        .ps-desktop   { display:block; }
        .ps-mobile    { display:none;  }
        .ps-bg-images { display:block; }

        @media (max-width: 767px) {
          .ps-desktop   { display:none;  }
          .ps-mobile    { display:block; }
          .ps-bg-images { display:none;  }
        }
        @keyframes waPulse {
          0%, 100% { opacity:1; transform:scale(1); }
          50%       { opacity:0.5; transform:scale(1.35); }
        }
        @keyframes marqueeScroll {
          0%   { transform:translateX(0); }
          100% { transform:translateX(-25%); }
        }
      `}</style>
    </div>
  );
};

export default PremiumSection;