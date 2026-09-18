import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import ReactDOM from "react-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Award,
  Trophy,
  Star,
  Play,
  BookOpen,
  Youtube,
  X,
  Zap,
  Medal,
  Gem,
  ExternalLink,
  ShoppingCart,
} from "lucide-react";
import "./AboutHero.css";

/* ═══════ CUSTOM CSS PROPERTIES TYPE ═══════ */
interface CustomCSSProperties extends React.CSSProperties {
  '--a'?: string;
  '--c'?: string;
  '--ac'?: string;
}

/* ═══════ COUNTER ═══════ */
type AnimatedCounterProps = {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  duration?: number;
};

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  label,
  suffix = "",
  prefix = "",
  duration = 2.2,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const iv = useInView(ref, { once: true });
  const [dv, setDv] = useState(0);

  const fmt = (n: number) => {
    if (n >= 10000000) return (n / 10000000).toFixed(1) + " Cr";
    if (n >= 100000) return (n / 100000).toFixed(0) + " Lakh";
    if (n >= 1000) return (n / 1000).toFixed(0) + "K";
    return n.toString();
  };

  useEffect(() => {
    if (!iv) return;
    let s = 0;
    const inc = value / (duration * 60);
    const t = window.setInterval(() => {
      s += inc;
      if (s >= value) { setDv(value); window.clearInterval(t); }
      else setDv(Math.floor(s));
    }, 1000 / 60);
    return () => window.clearInterval(t);
  }, [iv, value, duration]);

  return (
    <div ref={ref} className="fstat-box">
      <div className="fstat-conn" />
      <div className="fstat-val">{prefix}{fmt(dv)}{suffix}</div>
      <div className="fstat-lbl">{label}</div>
    </div>
  );
};

/* ═══════ REVEAL TEXT ═══════ */
type RevealTextProps = { text: string; delay?: number; className?: string };
const RevealText: React.FC<RevealTextProps> = ({ text, delay = 0, className = "" }) => {
  const words = text.split(" ");
  return (
    <motion.p className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="reveal-word"
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.45, delay: delay + i * 0.045, ease: [0.22, 1, 0.36, 1] }}
        >
          {word}{" "}
        </motion.span>
      ))}
    </motion.p>
  );
};

/* ═══════ SHIMMER TAG ═══════ */
const ShimmerTag: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
  <motion.span
    className="shimmer-tag-wrapper"
    initial={{ opacity: 0, x: -15 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    <span className="shimmer-text">{children}</span>
  </motion.span>
);

/* ═══════ VIDEO STRIP ═══════ */
type Vid = { title: string; views: string; id: string; img?: string; href?: string };

const VideoStrip: React.FC = () => {
  const vids: Vid[] = [
    { title: "The Truth About Entrepreneurship", views: "2.3M", id: "vE-0flz-12k", href: "https://youtu.be/vE-0flz-12k?si=1FBiu26sixVBiSap" },
    { title: "All About Content Writing", views: "1.5M", id: "7dhbPvWg39s", href: "https://youtu.be/7dhbPvWg39s?si=t2mXHGcCBtgbtF3j" },
    { title: "All About Blogging", views: "890K", id: "IabDFSIA9o8", href: "https://youtu.be/IabDFSIA9o8?si=GDauv6oqJvAX6LA3" },
    { title: "All About Social Media", views: "1.2M", id: "XRUUVqr8Vl4", href: "https://youtu.be/XRUUVqr8Vl4?si=WU6FgSPFveroEuOM" },
    { title: "All About Affiliate Marketing", views: "750K", id: "Yjs6NomMmRw", href: "https://youtu.be/Yjs6NomMmRw?si=ahq3Dz8A0hwbkbxe" },
    { title: "All About SEO", views: "1.8M", id: "4sg3tdSvie8", href: "https://youtu.be/4sg3tdSvie8?si=38D-EoiXtUn3Q8TR" },
    { title: "Growth Engine", views: "920K", id: "nh8dvV_fmcE", href: "https://youtu.be/nh8dvV_fmcE?si=xWwK3hbV5wBw5dwJ" },
    { title: "The Startup Blueprint", views: "1.1M", id: "HTTL3VcN0iM", href: "https://youtu.be/HTTL3VcN0iM?si=2iSSKzsgudzUkG46" },
    { title: "Content Mastery", views: "670K", id: "Gk6esY1YLNY", href: "https://youtu.be/Gk6esY1YLNY?si=aqqyDlxrC1JDLvRN" },
    { title: "Leadership Alchemy", views: "1.4M", id: "QwLwLmqRoqU", href: "https://youtu.be/QwLwLmqRoqU?si=0ZPdNilFWBhj1wh4" },
    { title: "Scale or Fail", views: "980K", id: "I52e09S9-L0", href: "https://youtu.be/I52e09S9-L0?si=edNbrtR4O_0u-KuA" },
    { title: "Digital Transformation", views: "1.7M", id: "8UxhIOiyEFU", href: "https://youtu.be/8UxhIOiyEFU?si=em08zf_8GkowHTMh" },
  ];

  const handleVideoClick = (video: Vid) => {
    const url = video.href || `https://www.youtube.com/watch?v=${video.id}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="s-curve-container">
      {[
        { slice: vids.slice(0, 3), cls: "s-row-1", dir: "s-scroll-ltr" },
        { slice: vids.slice(3, 6), cls: "s-row-2", dir: "s-scroll-rtl" },
        { slice: vids.slice(6, 9), cls: "s-row-3", dir: "s-scroll-ltr" },
        { slice: vids.slice(9, 12), cls: "s-row-4", dir: "s-scroll-rtl" },
      ].map((row, ri) => (
        <div key={ri} className={`s-row ${row.cls}`}>
          <div className={`s-scroll ${row.dir}`}>
            {[...row.slice, ...row.slice, ...row.slice].map((v, i) => (
              <div
                key={i}
                className="scard"
                onClick={() => handleVideoClick(v)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleVideoClick(v); }
                }}
              >
                <div className="scard-in">
                  <img
                    className="scard-thumb"
                    src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`}
                    alt={v.title}
                    loading="lazy"
                    onError={(e) => { (e.target as HTMLImageElement).src = "https://via.placeholder.com/320x180/1a1a1a/d4af37?text=Video"; }}
                  />
                  <div className="scard-grain" />
                  <div className="splay"><Play size={14} fill="currentColor" /></div>
                  <div className="scard-bot">
                    <p className="scard-t">{v.title}</p>
                    <p className="scard-v">{v.views} views</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

/* ═══════ BOOK MODAL rendered via Portal on document.body ═══════ */
type Book = { title: string; color: string; accent: string; amazonUrl: string; img: string };

const BookModal: React.FC<{ book: Book; onClose: () => void }> = ({ book, onClose }) => {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  useEffect(() => {
    const onScroll = () => onClose();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return ReactDOM.createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      <motion.div
        initial={{ scale: 0.82, opacity: 0, y: 28 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.82, opacity: 0, y: 28 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "14px",
          padding: "22px 18px 18px",
          width: "190px",
          background: "#111",
          border: "1px solid rgba(255,255,255,0.13)",
          borderRadius: "16px",
          boxShadow: "0 32px 80px rgba(0,0,0,0.85)",
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            background: "rgba(255,255,255,0.1)",
            border: "none",
            borderRadius: "50%",
            width: "26px",
            height: "26px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <X size={14} />
        </button>

        <div
          style={{
            width: "140px",
            height: "200px",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 10px 32px rgba(0,0,0,0.65)",
            flexShrink: 0,
          }}
        >
          <img
            src={book.img}
            alt={book.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        </div>

        <a
          href={book.amazonUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            padding: "9px 0",
            width: "100%",
            background: "#ff9900",
            color: "#111",
            fontSize: "12px",
            fontWeight: 700,
            borderRadius: "8px",
            textDecoration: "none",
            whiteSpace: "nowrap",
            boxSizing: "border-box",
            transition: "filter 0.2s",
          }}
        >
          <ShoppingCart size={14} />
          Buy now on Kindle
          <ExternalLink size={12} />
        </a>
      </motion.div>
    </motion.div>,
    document.body
  );
};

/* ═══════ BOOKS GLOBE ═══════ */
const BooksGlobe: React.FC = () => {
  const books: Book[] = [
    { title: "The Truth About Entrepreneurship", color: "#D4A017", accent: "#F0C850", amazonUrl: "https://www.amazon.in/dp/example1", img: "https://m.media-amazon.com/images/I/81mOFOtf40S._SY522_.jpg" },
    { title: "All About Content Writing", color: "#1E40AF", accent: "#3B82F6", amazonUrl: "https://www.amazon.in/dp/example2", img: "https://m.media-amazon.com/images/I/81kPFKiHSJS._SY522_.jpg" },
    { title: "All About Blogging", color: "#047857", accent: "#10B981", amazonUrl: "https://www.amazon.in/dp/example3", img: "https://m.media-amazon.com/images/I/81OHctalkcS._SY522_.jpg" },
    { title: "Growth Engine", color: "#7C3AED", accent: "#A78BFA", amazonUrl: "https://www.amazon.in/dp/example4", img: "https://m.media-amazon.com/images/I/81NaTlpzXES._SY522_.jpg" },
    { title: "The Startup Blueprint", color: "#DC2626", accent: "#F87171", amazonUrl: "https://www.amazon.in/dp/example5", img: "https://m.media-amazon.com/images/I/41Lz+aao4TL._SY445_SX342_QL70_FMwebp_.jpg" },
    { title: "Content Mastery", color: "#0891B2", accent: "#22D3EE", amazonUrl: "https://www.amazon.in/dp/example6", img: "https://m.media-amazon.com/images/I/81mnFCaANCL._SY522_.jpg" },
    { title: "Leadership Alchemy", color: "#B45309", accent: "#F59E0B", amazonUrl: "https://www.amazon.in/dp/example7", img: "https://m.media-amazon.com/images/I/81Ix5BescUL._SY522_.jpg" },
    { title: "Scale or Fail", color: "#4338CA", accent: "#818CF8", amazonUrl: "https://www.amazon.in/dp/example8", img: "https://m.media-amazon.com/images/I/51VpBY68j5L._SY445_SX342_QL70_FMwebp_.jpg" },
  ];

  const [sel, setSel] = useState<number | null>(null);
  const [rotationY, setRotationY] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => setRotationY((p) => (p + 0.5) % 360), 50);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <>
      {sel !== null && (
        <BookModal book={books[sel]} onClose={() => setSel(null)} />
      )}

      <div className="globe-wrapper">
        <div className="globe-c">
          <div className="globe-r" style={{ transform: `rotateY(${rotationY}deg)` }}>
            {books.map((b, i) => (
              <div
                key={i}
                className="globe-b-wrap"
                style={{ '--a': `${(360 / books.length) * i}deg`, '--c': b.color, '--ac': b.accent } as CustomCSSProperties}
                onClick={() => setSel(i)}
              >
                <div className="globe-b-face globe-b-front">
                  <img
                    src={b.img}
                    alt={b.title}
                    className="globe-book-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const parent = target.parentElement;
                      if (parent) {
                        parent.style.background = `linear-gradient(135deg, ${b.color}, ${b.accent})`;
                        const fb = document.createElement("div");
                        fb.className = "globe-book-fallback";
                        fb.textContent = b.title.substring(0, 3);
                        parent.appendChild(fb);
                      }
                    }}
                  />
                  <div className="globe-book-spine" />
                </div>
                <div className="globe-b-back-plain" />
              </div>
            ))}
          </div>
        </div>
        <div className="globe-author-below">
          <span className="globe-author-inner">SUJEET GOVINDANI</span>
        </div>
      </div>
    </>
  );
};

/* ═══════ CERTIFICATES SECTION — 3D Carousel (desktop) + flip (mobile) ═══════ */
type CertCard = { title: string; badge: string; img: string; };

/* shared card content */
const CertCardFace: React.FC<{ cert: CertCard; isCenter?: boolean }> = ({ cert, isCenter }) => (
  <div className="cert-card-shell" style={{ height: '100%' }}>
    <div className="cert-inner-scroll">
      <div className="cert-img-wrap">
        <img src={cert.img} alt={cert.title} className="cert-img" draggable={false} loading="lazy" decoding="async" />
      </div>
      <div className="cert-grad-top" />
      <div className="cert-grad-bot" />

      {isCenter && <div className="cert-scrollbar"><div className="cert-scrollbar-fill" /></div>}
      <div className="cert-info"><h3 className="cert-title">{cert.title}</h3></div>
    </div>
  </div>
);

const CertificatesSection: React.FC = () => {
  const certs: CertCard[] = [
    { title: "Incorporation Certificate", badge: "", img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Coi-1.webp" },
    { title: "USA Certificate", badge: "", img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Usa-certificate.webp" },
    { title: "GST Registered", badge: "", img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/gst-main.webp" },
  ];

  /* ── 3D Carousel state ── */
  const [centerIdx, setCenterIdx] = useState(0);
  const [animating, setAnimating] = useState(false);

  const rotate = useCallback((dir: 'left' | 'right') => {
    if (animating) return;
    setAnimating(true);

    setCenterIdx(prev =>
      dir === 'right'
        ? (prev + 1) % certs.length
        : (prev - 1 + certs.length) % certs.length
    );

    // Lock interaction during transition
    setTimeout(() => setAnimating(false), 600);
  }, [animating, certs.length]);

  /* auto-rotate every 4s */
  useEffect(() => {
    const t = window.setInterval(() => rotate('right'), 4000);
    return () => window.clearInterval(t);
  }, [rotate]);

  return (
    <>
      <style>{`
        /* ════ CARD SHELL ════ */
        .cert-card-shell {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          background: #0a0a0a;
          border: 1.5px solid rgba(212,175,55,.22);
          box-shadow: 0 8px 32px rgba(0,0,0,.65);
          transition: border-color .4s ease, box-shadow .4s ease;
          height: 100%;
        }
        .cert-card-shell::after {
          content: '';
          position: absolute; inset: 0; border-radius: 16px;
          border: 2px solid transparent;
          background: linear-gradient(135deg,rgba(212,175,55,.65),transparent 50%,rgba(212,175,55,.35)) border-box;
          -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: destination-out; mask-composite: exclude;
          opacity: 0; transition: opacity .3s ease; pointer-events: none; z-index: 20;
        }

        /* ════ INNER SCROLL ════ */
        .cert-inner-scroll {
          position: relative; height: 100%;
          overflow-y: auto; overflow-x: hidden; scrollbar-width: none;
        }
        .cert-inner-scroll::-webkit-scrollbar { display: none; }
        .cert-img-wrap { height: auto; pointer-events: none; }
        .cert-img {
          width: 100%; height: 100%; object-fit: cover;
          object-position: top center; display: block; user-select: none;
        }
        .cert-grad-top {
          position: sticky; top: 0; left: 0; right: 0; height: 60px; margin-bottom: -60px;
          background: linear-gradient(to bottom,rgba(0,0,0,.65),transparent);
          pointer-events: none; z-index: 3;
        }
        .cert-grad-bot {
          position: sticky; bottom: 0; left: 0; right: 0; height: 150px; margin-top: -150px;
          background: linear-gradient(to top,rgba(0,0,0,1) 0%,rgba(0,0,0,.88) 30%,rgba(0,0,0,.5) 65%,transparent 100%);
          pointer-events: none; z-index: 3;
        }
        .cert-badge {
          position: sticky; top: 12px; float: left; margin: -48px 0 0 12px;
          background: rgba(212,175,55,.93); color: #000;
          padding: 4px 12px; border-radius: 50px;
          font-size: 9px; font-weight: 700; letter-spacing: .07em;
          font-family: 'Inter', sans-serif; backdrop-filter: blur(4px); z-index: 10; clear: left;
        }
        .cert-scrollbar {
          position: sticky; bottom: 58px; float: right; margin: 0 10px -20px 0;
          width: 3px; height: 44px; background: rgba(255,255,255,.1);
          border-radius: 2px; overflow: hidden; z-index: 10; clear: right;
        }
        .cert-scrollbar-fill {
          width: 100%; height: 22%;
          background: linear-gradient(to bottom,#d4af37,#b8912a); border-radius: 2px;
        }
        .cert-info {
          position: sticky; bottom: 0; padding: 10px 14px 14px; z-index: 10; pointer-events: none;
        }
        .cert-title {
          font-family: 'Libre Baskerville', serif;
          font-size: 11px; font-weight: 700; color: #fff; line-height: 1.3;
          text-shadow: 0 1px 10px rgba(0,0,0,1); margin: 0;
        }

        /* ════ 3D CAROUSEL WRAPPER ════ */
        .cert-carousel-wrap {
          width: 100%; height: 100%;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
        }
        .cert-carousel-stage {
          position: relative;
          width: 100%;
          height: 290px;
          perspective: 1400px;
          perspective-origin: 50% 50%;
        }
        .cert-carousel-card {
          position: absolute;
          top: 0;
          left: 50%;
          width: 190px; /* Reduced Base width */
          height: 100%;
          cursor: pointer;
          transform-style: preserve-3d;
        }
        .cert-carousel-card.is-center {
          width: 230px; /* Reduced Center width */
          cursor: default;
        }
        .cert-carousel-card.is-center .cert-card-shell {
          border-color: rgba(212,175,55,.55);
          box-shadow:
            0 0 0 1px rgba(212,175,55,0.3),
            0 25px 80px rgba(212,175,55,0.25),
            0 12px 48px rgba(0,0,0,0.85);
        }
        .cert-carousel-card.is-center .cert-card-shell::after { opacity: 1; }

        .cert-section-wrap { width: 100%; height: 100%; display: flex; flex-direction: column; }

        /* ════ RESPONSIVE ════ */
        @media (max-width: 1024px) {
          .cert-carousel-stage { height: 270px; }
          .cert-carousel-card { width: 180px; }
          .cert-carousel-card.is-center { width: 220px; }
        }
        @media (max-width: 768px) {
          .cert-carousel-stage { height: 230px; perspective: 1000px; }
          .cert-carousel-card { width: 160px; }
          .cert-carousel-card.is-center { width: 200px; }
        }
        @media (max-width: 480px) {
          .cert-carousel-stage { height: 200px; perspective: 800px; }
          .cert-carousel-card { width: 140px; }
          .cert-carousel-card.is-center { width: 180px; }
        }
      `}</style>

      <div className="cert-section-wrap">
        <div className="cert-carousel-wrap">
          <div className="cert-carousel-stage">
            {certs.map((cert, i) => {
              let diff = i - centerIdx;
              if (diff > 1) diff -= certs.length;
              if (diff < -1) diff += certs.length;

              const isCenter = diff === 0;
              const isLeft = diff === -1;
              const isRight = diff === 1;

              // Responsive offsets
              const getOffset = () => {
                if (typeof window === 'undefined') return 130;
                const w = window.innerWidth;
                if (w <= 480) return 90;
                if (w <= 768) return 110;
                if (w <= 1024) return 120;
                return 130;
              };

              const offset = getOffset();

              return (
                <motion.div
                  key={i}
                  className={`cert-carousel-card ${isCenter ? 'is-center' : ''}`}
                  initial={false}
                  animate={{
                    x: isCenter ? '-50%' : isLeft ? `calc(-50% - ${offset}px)` : `calc(-50% + ${offset}px)`,
                    z: isCenter ? 0 : -150,
                    rotateY: isCenter ? 0 : isLeft ? 38 : -38,
                    scale: isCenter ? 1 : 0.82,
                    opacity: isCenter ? 1 : 0.4,
                    zIndex: isCenter ? 10 : 5,
                    filter: isCenter ? 'brightness(1)' : 'brightness(0.4)',
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1], // Smooth cubic-bezier for a premium feel
                  }}
                  style={{ willChange: 'transform, opacity' }}
                  onClick={() => {
                    if (isLeft) rotate('left');
                    if (isRight) rotate('right');
                  }}
                >
                  <CertCardFace cert={cert} isCenter={isCenter} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

/* ═══════ PARTICLES ═══════ */
const Particles: React.FC = () => {
  const ps = useMemo(
    () => Array.from({ length: 50 }, (_, i) => ({
      i, x: Math.random() * 100, y: Math.random() * 100,
      s: Math.random() * 2.5 + 0.5, du: Math.random() * 8 + 6, de: Math.random() * 5,
    })),
    []
  );
  return (
    <div className="pf">
      {ps.map((p) => (
        <div
          key={p.i} className="pt"
          style={{
            left: `${p.x}%`, top: `${p.y}%`,
            width: `${p.s}px`, height: `${p.s}px`,
            animationDuration: `${p.du}s`, animationDelay: `${p.de}s`,
          }}
        />
      ))}
    </div>
  );
};

/* ═══════ HERO SECTION ═══════ */
const HeroSection = () => (
  <section className="hero">
    <Particles />
    <div className="hero-grid" />
    <div className="hero-aura" />

    <div className="hero-hl">
      <motion.h1
        className="hero-name"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="hn1">SUJEET</span>
        <span className="hn2">GOVINDANI</span>
      </motion.h1>

      <motion.div
        className="hero-tag interactive-tagline"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <ShimmerTag delay={0.5}>The Visionary Who Doesn&apos;t Just Think Big</ShimmerTag>
        <ShimmerTag delay={0.75}>{" He Builds Bigger."}</ShimmerTag>
      </motion.div>

      <RevealText
        className="hero-sub"
        text="At 22, he shattered conventions. Today, he ignites founders, fuels CEOs, and leads millions toward growth, impact, and real transformation."
        delay={0.9}
      />

      <motion.div
        className="hero-chips"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.0 }}
      >
        <span className="chip"><Zap size={11} /> 2× Guinness Records</span>
        <span className="chip"><Youtube size={11} /> 1 Lakh+ Subscribers</span>
        <span className="chip"><BookOpen size={11} /> 25+ Global Books</span>
      </motion.div>
    </div>

    <div className="frow">
      {[
        { content: <VideoStrip />, cArea: "fc-vid", stat: { v: 15000000, l: "Total Views", s: "+" }, shift: -1 },
        { content: <BooksGlobe />, cArea: "fc-book", stat: { v: 25, l: "Published Books", s: "+" }, shift: 0 },
        { content: <CertificatesSection />, cArea: "fc-aw", stat: { v: 3, l: "Company Registrations", s: "" }, shift: 1 },
      ].map((f, idx) => (
        <motion.div
          key={idx}
          className={`fcol fcol-shift-${f.shift}`}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.0 + idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="fbody">
            <div className="fcone"><div className="fcone-l" /></div>
            <div className={`fca ${f.cArea}`}>{f.content}</div>
            <div className="ftip"><div className="forb" /></div>
          </div>
          <AnimatedCounter value={f.stat.v} label={f.stat.l} suffix={f.stat.s} />
        </motion.div>
      ))}
    </div>
  </section>
);

export default HeroSection;