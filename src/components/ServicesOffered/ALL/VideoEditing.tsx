import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import ContactUsForm from "@/pages/ContactUsForm";
import ServiceSection from "@/components/HomePage/ServicesSection";

// ─── Utility ──────────────────────────────────────────────────────────────────
function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

// ─── CARD STACK TYPES & HELPERS ───────────────────────────────────────────────
export type CardStackItem = {
  id: string | number;
  title: string;
  description?: string;
  mediaSrc?: string; // can be image OR video URL
  href?: string;
};

function wrapIndex(n: number, len: number) {
  return ((n % len) + len) % len;
}

function signedOffset(i: number, active: number, len: number) {
  const raw = i - active;
  const alt = raw > 0 ? raw - len : raw + len;
  return Math.abs(alt) < Math.abs(raw) ? alt : raw;
}

// ─── Detect if a URL is a video ───────────────────────────────────────────────
function isVideoSrc(src: string): boolean {
  return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(src);
}

// ─── CARD STACK ───────────────────────────────────────────────────────────────
function CardStack({
  items,
  initialIndex = 0,
  maxVisible = 5,
  cardWidth = 360,
  cardHeight = 250,
  overlap = 0.38,
  spreadDeg = 36,
  activeScale = 1.06,
  inactiveScale = 0.88,
}: {
  items: CardStackItem[];
  initialIndex?: number;
  maxVisible?: number;
  cardWidth?: number;
  cardHeight?: number;
  overlap?: number;
  spreadDeg?: number;
  activeScale?: number;
  inactiveScale?: number;
}) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(initialIndex);
  const maxOffset = Math.floor(maxVisible / 2);
  const spacing = cardWidth * (1 - overlap);
  const stepDeg = spreadDeg / maxOffset;

  const next = useCallback(() => setActive((a) => wrapIndex(a + 1, items.length)), [items.length]);
  const prev = useCallback(() => setActive((a) => wrapIndex(a - 1, items.length)), [items.length]);

  // Auto-advance every 6.5 seconds
  useEffect(() => {
    const t = setInterval(next, 6500);
    return () => clearInterval(t);
  }, [next]);

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          width: "100%",
          height: cardHeight + 40,
        }}
      >
        <AnimatePresence>
          {items.map((item, i) => {
            const off = signedOffset(i, active, items.length);
            const abs = Math.abs(off);
            if (abs > maxOffset) return null;
            const x = off * spacing;
            const rotate = off * stepDeg;
            const scale = off === 0 ? activeScale : inactiveScale;
            const zIndex = 100 - abs;
            const isActive = off === 0;
            const isVideo = item.mediaSrc ? isVideoSrc(item.mediaSrc) : false;

            return (
              <motion.div
                key={item.id}
                style={{
                  position: "absolute",
                  bottom: 0,
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: isActive
                    ? "0 24px 60px rgba(212,175,55,0.15), 0 8px 24px rgba(0,0,0,0.7)"
                    : "0 12px 40px rgba(0,0,0,0.6)",
                  cursor: "pointer",
                  width: cardWidth,
                  height: cardHeight,
                  zIndex,
                }}
                initial={reduceMotion ? false : { opacity: 0, y: 40, scale: 0.8 }}
                animate={{ opacity: 1, x, rotateZ: rotate, scale }}
                transition={{ type: "spring", stiffness: 260, damping: 25 }}
                onClick={() => setActive(i)}
              >
                <div style={{ position: "relative", width: "100%", height: "100%" }}>

                  {/* ── Media: video or image ── */}
                  {item.mediaSrc ? (
                    isVideo ? (
                      <video
                        src={item.mediaSrc}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                          pointerEvents: "none",
                        }}
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    ) : (
                      <img
                        src={item.mediaSrc}
                        alt={item.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        draggable={false}
                      />
                    )
                  ) : (
                    <div style={{
                      display: "flex", alignItems: "center", justifyContent: "center",
                      width: "100%", height: "100%", background: "#1a1208", color: "#555",
                    }}>
                      No Media
                    </div>
                  )}

                  {/* Gradient overlay */}
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, transparent 55%)",
                  }} />

                  {/* Title & description */}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 22px" }}>
                    <h3 style={{
                      fontFamily: "'Libre Baskerville', serif",
                      fontSize: "14px", fontWeight: 700,
                      color: "#f5f0e8", margin: 0,
                    }}>
                      {item.title}
                    </h3>
                    {item.description && (
                      <p style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "11px", color: "#D4AF37",
                        marginTop: "5px", letterSpacing: "0.4px",
                      }}>
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── DIAMOND GRID ─────────────────────────────────────────────────────────────
const diamondVideos = [
  "/videos/video1.mp4",
  "/videos/video2.mp4",
  "/videos/video3.mp4",
  "/videos/video4.mp4",
  "/videos/video5.mp4",
  "/videos/video6.mp4",
  "/videos/video7.mp4",
  "/videos/video8.mp4",
  "/videos/video9.mp4",
];

function DiamondGrid() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridTemplateRows: "repeat(2, 1fr)",
        width: "100%",
        maxWidth: "1440px",
        margin: "0 auto",
        padding: "3rem 2rem",
        gap: "2rem",
        position: "relative",
      }}
    >
      {diamondVideos.map((src, index) => {
        const isLast = index === diamondVideos.length - 1;
        const isShiftedUp = index === 1 || index === 2;
        const isShiftedDown = index === 5 || index === 6;

        return (
          <div
            key={index}
            style={{
              aspectRatio: "1",
              position: isLast ? "absolute" : "relative",
              backgroundColor: "#1a1208",
              borderRadius: "1.4rem",
              overflow: "hidden",
              animation: `diamondReveal 1s cubic-bezier(0.455,0.03,0.515,0.955) ${index * 0.2}s both`,
              transform: isLast
                ? undefined
                : isShiftedUp
                  ? "translateY(-25%)"
                  : isShiftedDown
                    ? "translateY(25%)"
                    : undefined,
              ...(isLast && {
                top: "50%",
                left: "50%",
                width: "20vw",
                height: "20vw",
                maxWidth: "280px",
                maxHeight: "280px",
                rotate: "-45deg",
                marginLeft: "-10vw",
                marginTop: "-10vw",
                outline: "0.9rem solid #080808",
                zIndex: 10,
              }),
            }}
          >
            <video
              src={src}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                ...(isLast && { transform: "rotate(45deg) scale(1.5)" }),
              }}
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        );
      })}
    </div>
  );
}

// ─── SOCIAL CARD DATA ─────────────────────────────────────────────────────────
// ↓↓ Replace these CDN video URLs with your actual CDN links ↓↓
const socialCards: CardStackItem[] = [
  {
    id: 1,
    title: "Real-Estate-Capture-Moment",
    mediaSrc: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Real-Estate-Videos/Real-Estate-Capture-1.webm",
  },
  {
    id: 2,
    title: "Product Reveal",
    mediaSrc: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Video-Editing/Video-Editing-Video3.mp4",
  },
  {
    id: 3,
    title: "Natuare Friendly",
    mediaSrc: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Video-Editing/Video-Editing-Video1.mp4",
  },
  {
    id: 4,
    title: "Real-Captures",
    mediaSrc: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Video-Editing/Video-Editing-Video2.mp4",
  },
  {
    id: 5,
    title: "Creativity",
    mediaSrc: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Video-Editing/Video-Editing-Creativity-Video4.mp4",
  },
];

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function VideoEditingPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <style>{`

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { background: #0a0a0a; color: #f5f0e8; font-family: 'Inter', sans-serif; overflow-x: hidden; }

        @keyframes diamondReveal {
          from { clip-path: polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%); }
          to   { clip-path: polygon(50% -100%, 200% 50%, 50% 200%, -100% 50%); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .section-label {
          display: block;
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #D4AF37;
        }

        .hero-title {
          font-family: 'Libre Baskerville', serif;
          font-size: clamp(2.4rem, 6vw, 5.8rem);
          font-weight: 700;
          line-height: 1.07;
          color: #f5f0e8;
        }

        .hero-sub {
          font-family: 'Inter', sans-serif;
          font-weight: 300;
          font-size: clamp(0.9rem, 1.4vw, 1.1rem);
          color: #c9b99a;
          line-height: 1.9;
        }

        .section-title {
          font-family: 'Libre Baskerville', serif;
          font-size: clamp(1.7rem, 3.5vw, 2.9rem);
          font-weight: 700;
          color: #f5f0e8;
          line-height: 1.18;
        }

        .section-sub {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.86rem, 1.05vw, 0.96rem);
          color: #c9b99a;
          line-height: 1.9;
          font-weight: 300;
        }

        .gold-accent { color: #D4AF37; }

        .btn-gold {
          display: inline-block;
          padding: 13px 38px;
          border: 1px solid #D4AF37;
          color: #D4AF37;
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          background: transparent;
          cursor: pointer;
          transition: all 0.35s;
          border-radius: 2px;
        }
        .btn-gold:hover { background: #D4AF37; color: #0a0a0a; }

        .ve-noise-overlay {
          position: absolute; inset: 0; opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px; pointer-events: none; z-index: 1;
        }

        .afu { animation: fadeUp 1s ease both; }

        @media (max-width: 880px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 2rem !important; padding: 1rem 6vw !important; }
          .about-img-col { display: block !important; margin-bottom: 2rem; }
          .stats-row { gap: 1.5rem !important; justify-content: center !important; }
        }
        @media (max-width: 600px) {
          .stats-row { flex-direction: row !important; gap: 1rem !important; justify-content: center !important; }
          .diamond-section { padding: 3rem 1rem 4rem !important; }
          .social-section  { padding: 2rem 2vw 4rem !important; }
          .social-heading { margin-bottom: 0.5rem !important; }
        }
      `}</style>

      {/* ══════════════════════════
          SECTION 1 HERO
      ══════════════════════════ */}
      <section style={{
        position: "relative",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "6rem 2rem 1rem", overflow: "hidden", background: "#0a0a0a",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/video-editing-bg.webp')",
          backgroundSize: "cover", backgroundPosition: "center", opacity: 0.25, zIndex: 0,
        }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.65)", zIndex: 1 }} />
        <div className="ve-noise-overlay" />
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "3px",
          background: "linear-gradient(90deg, transparent, #D4AF37, transparent)", zIndex: 10,
        }} />

        <div style={{ position: "relative", zIndex: 5, maxWidth: "840px", width: "100%", marginTop: "var(--page-open, 100px)" }}>
          <div className="gold-line afu" style={{ animationDelay: "0.2s", marginBottom: "1.8rem" }} />
          <h1 className="hero-title afu" style={{ animationDelay: "0.3s", marginBottom: "0.4rem" }}>
            Video Editing
          </h1>
          <h1 className="hero-title afu" style={{
            animationDelay: "0.42s", marginBottom: "2rem",
            background: "linear-gradient(135deg, #D4AF37 0%, #f5e090 50%, #b8962e 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            Creative Visual Stories
          </h1>
          <p className="hero-sub afu" style={{ animationDelay: "0.55s", margin: "0 auto 2.8rem", maxWidth: "520px" }}>
            Explore our work and see how we can help you make a powerful impact
            through the art of video editing.
          </p>
        </div>

      </section>



      {/* ══════════════════════════
          SECTION 2 ABOUT
      ══════════════════════════ */}
      <section style={{ position: "relative", background: "#000", overflow: "hidden" }}>
        <div className="ve-noise-overlay" />
        <div
          className="about-grid"
          style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "5rem", alignItems: "center",
            maxWidth: "1260px", margin: "0 auto",
            padding: "1.5rem 6vw",
            position: "relative", zIndex: 2,
          }}
        >
          {/* Image */}
          <div className="about-img-col" style={{ position: "relative" }}>
            <div style={{
              position: "absolute", top: "-18px", left: "-18px", right: "18px", bottom: "18px",
              border: "1px solid #D4AF3745", borderRadius: "4px", zIndex: 0,
            }} />
            <img
              src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/VideoEditing.webp"
              alt="Video Editing"
              style={{
                width: "100%", aspectRatio: "4/5", objectFit: "cover",
                borderRadius: "4px", position: "relative", zIndex: 1, display: "block",
                background: "#1a1208", filter: "brightness(0.85) contrast(1.1)",
              }}
              onError={e => {
                (e.target as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80";
              }}
            />
            <div style={{
              position: "absolute", bottom: "24px", right: "-22px",
              background: "#D4AF37", color: "#000", padding: "16px 20px",
              borderRadius: "2px", zIndex: 5, textAlign: "center",
              boxShadow: "0 8px 32px rgba(212,175,55,0.3)",
            }}>
              <p style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.7rem", fontWeight: 700, lineHeight: 1 }}>10+</p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", marginTop: "4px" }}>
                Years of Experience
              </p>
            </div>
          </div>

          {/* Text */}
          <div>

            <div className="gold-line-left" />
            <h2 className="section-title" style={{ marginBottom: "1.8rem" }}>
              What is <span className="gold-accent">Video Editing?</span>
            </h2>
            <p className="section-sub" style={{ marginBottom: "1.5rem" }}>
              Video editing is the process of manipulating and rearranging video shots to create a
              cohesive, compelling story. In the business world, video editing is an essential tool
              for creating impactful marketing materials, engaging social media content, informative
              tutorials, and polished corporate presentations.
            </p>
            <p className="section-sub" style={{ marginBottom: "2.8rem" }}>
              Professional video editing ensures that your videos have a consistent style and tone,
              reinforcing your brand identity and making your business instantly recognizable to your audience.
            </p>
            <div className="stats-row" style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap" }}>
              {[
                { num: "500+", label: "Projects Delivered" },
                { num: "98%", label: "Client Satisfaction" },
                { num: "40+", label: "Brands Served" },
              ].map(s => (
                <div key={s.label} style={{ textAlign: "center" }}>
                  <p style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.7rem", fontWeight: 700, color: "#D4AF37" }}>{s.num}</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "1px", textTransform: "uppercase", color: "#8a7a5a", marginTop: "4px" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>




      {/* ══════════════════════════
          SECTION 4 SOCIAL MEDIA
      ══════════════════════════ */}
      <section
        className="social-section"
        style={{ position: "relative", background: "#000", padding: "3rem 4vw 3rem", overflow: "hidden" }}
      >
        <div className="ve-noise-overlay" />
        <div style={{ position: "absolute", top: 0, right: "8vw", width: "1px", height: "110px", background: "linear-gradient(to bottom, #D4AF37, transparent)" }} />
        <div style={{ position: "absolute", bottom: 0, left: "8vw", width: "1px", height: "110px", background: "linear-gradient(to top, #D4AF37, transparent)" }} />

        <div className="social-heading" style={{ textAlign: "center", marginBottom: "1.5rem", position: "relative", zIndex: 3 }}>
          <span className="section-label" style={{ marginBottom: "1.1rem" }}>Have a Look at Our</span>
          <h2 className="section-title">
            Social Media <span className="gold-accent">Videos</span>
          </h2>
          <p className="section-sub" style={{ maxWidth: "460px", margin: "1.2rem auto 0" }}>
            Crafted for reach, retention, and real results across every platform.
          </p>
        </div>

        <div style={{ position: "relative", zIndex: 2, maxWidth: "1000px", margin: "0 auto", marginBottom: "40px" }}>
          <CardStack
            items={socialCards}
            cardWidth={isMobile ? 300 : 500}
            cardHeight={isMobile ? 200 : 300}
            maxVisible={5}
            overlap={0.38}
            spreadDeg={36}
          />
        </div>
      </section>

      <ContactUsForm />
      <ServiceSection />
    </>
  );
}