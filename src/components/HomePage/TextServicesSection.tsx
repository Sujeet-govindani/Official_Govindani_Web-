import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";

const TextServicesSection = () => {
  const words = [
    { text: "HUM", highlight: false },
    { text: "AAPKE", highlight: false },
    { text: "LIYE", highlight: false },
    { text: "KYA", highlight: false },
    { text: "KAR", highlight: true },
    { text: "SAKTE", highlight: true },
    { text: "HAIN", highlight: false },
  ];

  const services = [
    { text: "Aapki Website Bana Sakte Hain", highlight: "Website", route: "/services/website-creation" },
    { text: "Aapka Product Shoot Kar Sakte Hain", highlight: "Product Shoot", route: "/services/product-shoot" },
    { text: "Aapke Liye CRM System Build Kar Sakte Hain", highlight: "CRM", route: "/services/ci-crm" },
    { text: "Aapke Liye E-Commerce Listing Kar Sakte Hain", highlight: "E-Commerce", route: "/pages/Ecommerce" },
    { text: "Aapke Liye SaaS Based Platform Bana Sakte Hain", highlight: "SaaS", route: "/services/hotel-crm" },
    { text: "Aapke Product ki Photography Kar Sakte Hain", highlight: "Photography", route: "/Portfolioshowcase/photography" },
  ];

  const COLORS = {
    black: '#000000',
    midnightBlue: '#141B2D',
    golden: '#d4af37',
    goldenLight: '#e8c547',
    goldenWhite: '#fff8dc',
    greenLight: '#25D366',
  };

  // ── Detect mobile once ─────────────────────────────────────────────
  const isMobile = useRef(
    typeof window !== 'undefined' && window.innerWidth < 768
  ).current;

  // ── Scroll-into-view ──────────────────────────────────────────────
  const sectionRef = useRef(null);
  const hasAnimated = useRef(false);
  const isInView = useInView(sectionRef, { once: false, amount: 0.25 });

  const [phase, setPhase] = useState('idle');
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (isInView && phase === 'idle') {
      setPhase('building');
      hasAnimated.current = true;
    }
    if (!isInView && hasAnimated.current) {
      setPhase('idle');
      setShown(0);
      hasAnimated.current = false;
    }
  }, [isInView]);

  // ── Word-by-word loop ─────────────────────────────────────────────
  useEffect(() => {
    let t;
    const buildDelay = isMobile ? 380 : 420;
    const clearDelay = isMobile ? 100 : 120;
    const pauseDelay = isMobile ? 1600 : 2000;

    if (phase === 'building') {
      if (shown < words.length) {
        t = setTimeout(() => setShown(s => s + 1), buildDelay);
      } else {
        t = setTimeout(() => setPhase('clearing'), pauseDelay);
      }
    } else if (phase === 'clearing') {
      if (shown > 0) {
        t = setTimeout(() => setShown(s => s - 1), clearDelay);
      } else {
        t = setTimeout(() => setPhase('building'), 300);
      }
    }
    return () => clearTimeout(t);
  }, [phase, shown, isMobile]);

  const navigate = useNavigate();
  const handleServiceClick = (route) => navigate(route);

  const highlightText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === highlight.toLowerCase()
        ? <span key={i} style={{ color: COLORS.goldenLight, fontWeight: 700 }}>{part}</span>
        : <span key={i}>{part}</span>
    );
  };

  // ── Animation variants ─────────────────────────────────────────────
  const wordVariants = {
    initial: isMobile
      ? { opacity: 0, x: -30 }
      : { opacity: 0, x: -80, scaleX: 0.2, filter: 'blur(12px)', transformOrigin: 'left center' },
    animate: isMobile
      ? { opacity: 1, x: 0, transition: { duration: 0.28, ease: 'easeOut' } }
      : { opacity: 1, x: 0, scaleX: 1, filter: 'blur(0px)', transition: { duration: 0.38, ease: [0.16, 1.2, 0.4, 1] } },
    exit: isMobile
      ? { opacity: 0, x: -20, transition: { duration: 0.15, ease: 'easeIn' } }
      : { opacity: 0, x: -50, scaleX: 0.3, filter: 'blur(8px)', transition: { duration: 0.18, ease: 'easeIn' } },
  };

  const cardHover = isMobile ? {} : {
    x: 8,
    scale: 1.015,
    boxShadow: `0 0 22px rgba(212,175,55,0.18), inset 0 0 0 1px rgba(212,175,55,0.22)`,
    transition: { duration: 0.18 },
  };

  return (
    <div
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: '#000000',
        padding: 'clamp(2.5rem, 6vw, 4rem) clamp(1rem, 4vw, 2rem)',
        paddingTop: 'clamp(2rem, 3vw, 3rem)',
        willChange: 'transform',
      }}
    >

      {/* ── Ambient blobs ─── */}
      {isMobile ? (
        <>
          <div className="ambient-blob blob-tl" />
          <div className="ambient-blob blob-br" />
        </>
      ) : (
        <>
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 6, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-16 left-8 w-24 h-24 rounded-full pointer-events-none"
            style={{ background: COLORS.golden, opacity: 0.07, filter: 'blur(2px)' }}
          />
          <motion.div
            animate={{ y: [0, 20, 0], rotate: [0, -6, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-16 right-8 w-36 h-36 rounded-full pointer-events-none"
            style={{ background: COLORS.goldenLight, opacity: 0.07, filter: 'blur(2px)' }}
          />
        </>
      )}

      <div
        className="max-w-7xl w-full"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: 'clamp(2rem, 5vw, 4rem)',
          alignItems: 'center',
        }}
      >

        {/* ═══════════════════════════════════════
            LEFT Giant ? + animated words
            ═══════════════════════════════════════ */}
        <div
          className="relative flex items-stretch"
          style={{ height: 'clamp(300px, 55vw, 620px)' }}
        >
          {/* Giant ? */}
          <div
            className="flex-shrink-0 flex items-center justify-center select-none font-black"
            style={{
              minWidth: 'clamp(7rem, 18vw, 18rem)',
              width: 'clamp(7rem, 18vw, 18rem)',
            }}
          >
            <motion.span
              initial={{ scale: 0.4, opacity: 0 }}
              animate={isInView ? {
                scale: isMobile ? 1 : [1, 1.03, 1],
                textShadow: isMobile
                  ? `0 0 60px ${COLORS.goldenLight}55`
                  : [
                    `0 0 60px ${COLORS.goldenLight}55`,
                    `0 0 120px ${COLORS.goldenLight}99`,
                    `0 0 60px ${COLORS.goldenLight}55`,
                  ],
                opacity: 1,
              } : { opacity: 0, scale: 0.4 }}
              transition={isMobile
                ? { opacity: { duration: 0.4 } }
                : {
                  scale: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
                  textShadow: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
                  opacity: { duration: 0.5, ease: 'easeOut' },
                }
              }
              style={{
                fontFamily: "'Georgia', 'Times New Roman', serif",
                fontSize: 'clamp(12rem, 30vw, 34rem)',
                lineHeight: 0.95,
                color: COLORS.goldenLight,
                display: 'inline-block',
                letterSpacing: '0.08em',
                transform: 'scaleY(1.3)',
                transformOrigin: 'center center',
                willChange: 'transform, opacity',
              }}
            >
              ?
            </motion.span>
          </div>

          {/* Words column */}
          <div
            className="absolute inset-0 flex flex-col justify-center"
            style={{
              left: 'clamp(7rem, 18vw, 18rem)',
              paddingLeft: 'clamp(0.6rem, 1.5vw, 1.6rem)',
              overflow: 'hidden',
            }}
          >
            {/* Ghost spacer */}
            <div style={{ visibility: 'hidden', pointerEvents: 'none', position: 'absolute', top: '50%', transform: 'translateY(-50%)' }}>
              {words.map((w, i) => (
                <div
                  key={`ghost-${w.text}`}
                  className="leading-none font-black uppercase"
                  style={{
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    fontSize: 'clamp(1.55rem, 4.5vw, 4.8rem)',
                    letterSpacing: '-0.02em',
                    marginBottom: 'clamp(0.15rem, 0.6vw, 0.65rem)',
                    paddingLeft: i % 2 === 1 ? 'clamp(0.4rem, 1.2vw, 1.4rem)' : '0',
                  }}
                >
                  {w.text}
                </div>
              ))}
            </div>

            {/* Animated words */}
            <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', width: '100%' }}>
              <AnimatePresence>
                {words.slice(0, shown).map((w, i) => (
                  <motion.div
                    key={w.text}
                    variants={wordVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="leading-none font-black uppercase select-none"
                    style={{
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      fontSize: 'clamp(1.55rem, 4.5vw, 4.8rem)',
                      letterSpacing: '-0.02em',
                      marginBottom: 'clamp(0.15rem, 0.6vw, 0.65rem)',
                      paddingLeft: i % 2 === 1 ? 'clamp(0.4rem, 1.2vw, 1.4rem)' : '0',
                      willChange: 'transform, opacity',
                    }}
                  >
                    <span
                      className="word-shimmer"
                      style={{
                        filter: w.highlight
                          ? `drop-shadow(0 0 10px ${COLORS.goldenLight}99)`
                          : `drop-shadow(0 0 5px ${COLORS.golden}66)`,
                      }}
                    >
                      {w.text}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Vertical divider */}
            <motion.div
              animate={{ scaleX: shown > 0 ? 1 : 0, opacity: shown > 0 ? 0.22 : 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'absolute',
                left: 0, top: '50%',
                width: '3px', height: '70%',
                transform: 'translateY(-50%)',
                background: `linear-gradient(to bottom, transparent, ${COLORS.golden}, transparent)`,
                transformOrigin: 'top',
              }}
            />
          </div>
        </div>

        {/* ═══════════════════════════════════════
            RIGHT Service Cards
            ═══════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: isMobile ? 30 : 0, x: isMobile ? 0 : 50 }}
          animate={isInView
            ? { opacity: 1, y: 0, x: 0 }
            : { opacity: 0, y: isMobile ? 30 : 0, x: isMobile ? 0 : 50 }
          }
          transition={{ duration: 0.6, delay: 0.25 }}
          style={{ willChange: 'transform, opacity' }}
        >
          <div
            className="rounded-2xl p-5 shadow-2xl"
            style={{
              background: isMobile ? 'rgba(14,20,35,0.96)' : 'rgba(20,27,45,0.45)',
              ...(isMobile ? {} : {
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
              }),
              boxShadow: `0 8px 40px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(212,175,55,0.12)`,
            }}
          >
            <div className="mb-5">
              <motion.h2
                initial={{ opacity: 0, y: -15 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -15 }}
                transition={{ delay: 0.4 }}
                className="font-bold mb-1"
                style={{
                  fontSize: 'clamp(1.4rem, 4vw, 2.25rem)',
                  color: COLORS.goldenLight,
                  textShadow: `0 0 18px ${COLORS.golden}44`,
                }}
              >
                Hamari Services
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.5 }}
                style={{ color: '#9ca3af', fontSize: 'clamp(0.7rem, 2vw, 0.875rem)' }}
              >
                Aapke Business Ko Badhane Ke Liye Sabkuch
              </motion.p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {services.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 }}
                  transition={{ delay: 0.55 + i * 0.07 }}
                  whileHover={cardHover}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleServiceClick(s.route)}
                  className="flex items-center gap-3 rounded-xl cursor-pointer relative group"
                  style={{
                    padding: 'clamp(0.55rem, 1.5vw, 0.85rem) clamp(0.75rem, 2vw, 1rem)',
                    background: 'rgba(10,22,40,0.6)',
                    border: '1px solid rgba(212,175,55,0.09)',
                    userSelect: 'none',
                    willChange: 'transform',
                    transform: 'translateZ(0)',
                  }}
                >
                  {/* Left accent bar only on desktop */}
                  {!isMobile && (
                    <motion.div
                      className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full"
                      initial={{ scaleY: 0, opacity: 0 }}
                      whileHover={{ scaleY: 1, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        background: `linear-gradient(to bottom, transparent, ${COLORS.goldenLight}, transparent)`,
                        transformOrigin: 'center',
                      }}
                    />
                  )}

                  {/* Check icon */}
                  <div
                    className="flex-shrink-0 rounded-full flex items-center justify-center"
                    style={{
                      width: 'clamp(1.2rem, 3vw, 1.5rem)',
                      height: 'clamp(1.2rem, 3vw, 1.5rem)',
                      background: 'rgba(32,233,106,0.82)',
                      boxShadow: '0 0 10px #25D36644',
                    }}
                  >
                    <svg
                      style={{ width: 'clamp(0.6rem, 1.5vw, 1rem)', height: 'clamp(0.6rem, 1.5vw, 1rem)' }}
                      fill="none" viewBox="0 0 24 24" stroke="white"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>

                  {/* Label */}
                  <p
                    className="text-white font-medium flex-1"
                    style={{ fontSize: 'clamp(0.72rem, 2.2vw, 1rem)' }}
                  >
                    {highlightText(s.text, s.highlight)}
                  </p>

                  {/* ── "Click Here →" label (NEW) ── */}
                  <span
                    className="click-here-label"
                    style={{
                      flexShrink: 0,
                      fontSize: 'clamp(0.55rem, 1.4vw, 0.7rem)',
                      fontWeight: 600,
                      color: COLORS.goldenLight,
                      letterSpacing: '0.04em',
                      whiteSpace: 'nowrap',
                      opacity: isMobile ? 0.75 : 0.65,
                      transition: 'opacity 0.18s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3px',
                    }}
                  >
                    Click Here
                    {/* small arrow SVG */}
                    <svg
                      fill="none" viewBox="0 0 16 16" stroke={COLORS.goldenLight}
                      style={{ width: '0.65rem', height: '0.65rem', flexShrink: 0 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </span>

                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>

      {/* ── Styles ─────────────────────────────────────────────────── */}
      <style>{`
        .word-shimmer {
          display: inline-block;
          background: linear-gradient(
            90deg,
            #C8961E 0%,
            #D4AF37 20%,
            #FFD700 40%,
            #FFF8DC 55%,
            #FFD700 70%,
            #D4AF37 85%,
            #C8961E 100%
          );
          background-size: 220% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: wordShimmer 2.6s linear infinite;
          will-change: background-position;
        }

        @keyframes wordShimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }

        @media (prefers-reduced-motion: reduce) {
          .word-shimmer { animation: none; background-position: center; }
        }

        /* Brighten "Click Here" on card hover (desktop) */
        @media (hover: hover) {
          .group:hover .click-here-label {
            opacity: 1 !important;
          }
        }

        .ambient-blob {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          opacity: 0.07;
        }
        .blob-tl {
          top: 4rem; left: 1.5rem;
          width: 5rem; height: 5rem;
          background: #d4af37;
          animation: blobFloat 7s ease-in-out infinite;
        }
        .blob-br {
          bottom: 4rem; right: 1.5rem;
          width: 7rem; height: 7rem;
          background: #e8c547;
          animation: blobFloat 9s ease-in-out infinite reverse;
        }

        @keyframes blobFloat {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-14px); }
        }
      `}</style>
    </div>
  );
};

export default TextServicesSection;