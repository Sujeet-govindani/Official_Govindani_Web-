import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import ServiceSection from '@/components/HomePage/ServicesSection';
import ContactUsForm from '@/pages/ContactUsForm';

// ─── DIAMOND GRID ─────────────────────────────────────────────────────────────
const diamondImages = [
  {
    src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Product-Shoot/Product-Shoot-Img1.webp",
    alt: "Luxury Watch Product Shot",
  },
  {
    src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Product-Shoot/productshoot19.webp",
    alt: "Perfume Bottle Product Shot",
  },
  {
    src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Product-Shoot/productshoot18.webp",
    alt: "Sneakers Product Shot",
  },
  {
    src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Product-Shoot/productshoot17.webp",
    alt: "Sunglasses Product Shot",
  },
  {
    src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Product-Shoot/productshoot14.png",
    alt: "Camera Product Shot",
  },
  {
    src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Product-Shoot/product-Shoot-Img10.webp",
    alt: "Red Sneaker Product Shot",
  },
  {
    src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Product-Shoot/productshoot20.png",
    alt: "Sports Shoes Product Shot",
  },
  {
    src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Product-Shoot/productshoot12.JPG",
    alt: "Cosmetics Product Shot",
  },
  {
    src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Product-Shoot/productshoot13.JPG",
    alt: "Handbag Product Shot",
  },
];

function DiamondGrid() {
  return (
    <div
      className="diamond-grid-desktop"
      style={{
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
      {diamondImages.map((img, index) => {
        const isLast = index === diamondImages.length - 1;
        const isShiftedUp = index === 1 || index === 2;
        const isShiftedDown = index === 5 || index === 6;

        const pulseDelay = `${(index * 0.37).toFixed(2)}s`;

        return (
          <div
            key={index}
            className={isLast ? "" : "diamond-card-wrapper"}
            style={{
              aspectRatio: "1",
              position: isLast ? "absolute" : "relative",
              borderRadius: "1.4rem",
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
            {!isLast && (
              <div
                className="card-glow"
                style={{
                  position: "absolute",
                  inset: "-12px",
                  borderRadius: "2rem",
                  background:
                    "radial-gradient(ellipse at 50% 85%, rgba(212,175,55,0.30) 0%, rgba(180,120,20,0.14) 45%, transparent 72%)",
                  animation: `shadowPulse 3.4s ease-in-out ${pulseDelay} infinite`,
                  zIndex: 0,
                  pointerEvents: "none",
                  filter: "blur(8px)",
                }}
              />
            )}

            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "1.4rem",
                overflow: "hidden",
                backgroundColor: "#1a1208",
                zIndex: 1,
                boxShadow: isLast
                  ? "none"
                  : "0 12px 40px rgba(0,0,0,0.75), 0 3px 10px rgba(0,0,0,0.55)",
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  ...(isLast && { transform: "rotate(45deg) scale(1.5)" }),
                }}
              />

              {!isLast && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(160deg, rgba(0,0,0,0.06) 0%, transparent 38%, rgba(0,0,0,0.32) 100%)",
                    zIndex: 2,
                    pointerEvents: "none",
                  }}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── 3D CAROUSEL FOR MOBILE ───────────────────────────────────────────────────
function ProductShootCarousel() {
  const [centerIdx, setCenterIdx] = useState(0);
  const [animating, setAnimating] = useState(false);

  const rotate = useCallback((dir: 'left' | 'right') => {
    if (animating) return;
    setAnimating(true);
    setCenterIdx(prev => dir === 'right'
      ? (prev + 1) % diamondImages.length
      : (prev - 1 + diamondImages.length) % diamondImages.length
    );
    setTimeout(() => setAnimating(false), 600);
  }, [animating]);

  useEffect(() => {
    const t = window.setInterval(() => rotate('right'), 4000);
    return () => window.clearInterval(t);
  }, [rotate]);

  return (
    <div className="block md:hidden">
      <div style={{
        position: 'relative',
        width: '100%',
        height: '320px',
        perspective: '1200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '2rem 0'
      }}>
        {diamondImages.map((img, i) => {
          let diff = i - centerIdx;
          if (diff > 1) diff -= diamondImages.length;
          if (diff < -1) diff += diamondImages.length;

          const isCenter = diff === 0;
          const isLeft = diff === -1;
          const isRight = diff === 1;
          const isVisible = Math.abs(diff) <= 1;

          return (
            <motion.div
              key={i}
              initial={false}
              animate={{
                x: isCenter ? '-50%' : isLeft ? 'calc(-50% - 110px)' : 'calc(-50% + 110px)',
                z: isCenter ? 0 : -150,
                rotateY: isCenter ? 0 : isLeft ? 38 : -38,
                scale: isCenter ? 1 : 0.82,
                opacity: isVisible ? (isCenter ? 1 : 0.4) : 0,
                zIndex: isCenter ? 10 : 5,
                filter: isCenter ? 'brightness(1)' : 'brightness(0.3)',
              }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                width: isCenter ? '240px' : '180px',
                height: '100%',
                cursor: 'pointer',
                transformStyle: 'preserve-3d',
                pointerEvents: isVisible ? 'auto' : 'none',
              }}
              onClick={() => {
                if (isLeft) rotate('left');
                if (isRight) rotate('right');
              }}
            >
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1.5px solid rgba(212,175,55,0.3)',
                background: '#111',
                boxShadow: isCenter ? '0 15px 40px rgba(212,175,55,0.2), 0 10px 30px rgba(0,0,0,0.8)' : '0 5px 20px rgba(0,0,0,0.6)'
              }}>
                <img src={img.src} alt={img.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" decoding="async" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ─── PRODUCT SHOOT PAGE ───────────────────────────────────────────────────────
const ProductShoot: React.FC = () => {
  return (
    <div className="service-page pt-[100px] md:pt-[120px] lg:pt-[140px] px-0">
      <style>{`
        @media (max-width: 768px) {
          .service-page {
            padding-top: 140px !important;
          }
          .product-shoot-showcase-section {
            padding-top: 2.5rem !important;
            padding-bottom: 2.5rem !important;
          }
          .product-shoot-heading {
            margin-bottom: 1.5rem !important;
          }
        }

        .diamond-grid-desktop {
          display: grid;
        }
        @media (max-width: 768px) {
          .diamond-grid-desktop {
            display: none !important;
          }
        }

        /* ── Diamond clip-path reveal on page load ── */
        @keyframes diamondReveal {
          from { clip-path: polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%); }
          to   { clip-path: polygon(50% -100%, 200% 50%, 50% 200%, -100% 50%); }
        }

        /* ── Breathing glow under each card ── */
        @keyframes shadowPulse {
          0%   {
            opacity: 0.45;
            transform: scaleX(0.90) scaleY(0.82) translateY(2px);
          }
          50%  {
            opacity: 0.95;
            transform: scaleX(1.06) scaleY(1.12) translateY(12px);
          }
          100% {
            opacity: 0.45;
            transform: scaleX(0.90) scaleY(0.82) translateY(2px);
          }
        }

        /* ── Hover lift on regular cards ── */
        .diamond-card-wrapper {
          transition: filter 0.4s ease;
        }
        .diamond-card-wrapper:hover {
          filter: brightness(1.10);
          z-index: 5 !important;
        }
        .diamond-card-wrapper:hover .card-glow {
          opacity: 1 !important;
          filter: blur(12px) !important;
        }
      `}</style>

      {/* ══════════════════════════
          Section 1: Hero
      ══════════════════════════ */}
      <section className="service-section">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16">
          <div className="w-full lg:w-1/2 space-y-6">
            <p className="font-body text-gold uppercase tracking-[0.2em] text-sm font-semibold">
              PRODUCT SHOOT
            </p>
            <h2
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "clamp(1.7rem, 3.5vw, 2.9rem)",
                fontWeight: 700,
                color: "#f5f0e8",
                lineHeight: 1.18,
              }}
            >
              Professional Product <span style={{ color: "#D4AF37" }}>Photography</span>
            </h2>
            <p className="service-text text-base md:text-lg">
              High-quality product photography that makes your products irresistible. From clean
              white-background shots to creative lifestyle compositions we capture every angle,
              every detail, and every story your product has to tell.
            </p>
            <p className="service-text-muted text-sm md:text-base">
              Our professional studio and on-location shoots are tailored for e commerce platforms,
              social media, catalogs, and marketing materials. We understand what sells and we
              shoot to convert.
            </p>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="image-container aspect-[4/3] rounded-2xl overflow-hidden">
              <img
                src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Product-Shoot/Services-Product-Shoot-Hero-img-Section1.webp"
                alt="Product Shoot"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════
          Section 2: Diamond Grid Showcase
      ══════════════════════════ */}
      <section
        className="product-shoot-showcase-section"
        style={{
          position: "relative",
          background: "#000",
          padding: "7rem 2vw 11rem",
          overflow: "hidden",
        }}
      >
        {/* Noise overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.04,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "200px",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        {/* Centre radial gold glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: "700px",
            height: "700px",
            background: "radial-gradient(circle, #D4AF3709 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        {/* Section heading */}
        <div
          className="product-shoot-heading"
          style={{
            textAlign: "center",
            marginBottom: "4rem",
            position: "relative",
            zIndex: 3,
          }}
        >
          <span
            style={{
              display: "block",
              fontFamily: "'Inter', sans-serif",
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "#D4AF37",
              marginBottom: "1.1rem",
            }}
          >
            Have a Look at Our
          </span>
          <h2
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: "clamp(1.7rem, 3.5vw, 2.9rem)",
              fontWeight: 700,
              color: "#f5f0e8",
              lineHeight: 1.18,
            }}
          >
            Our Product <span style={{ color: "#D4AF37" }}>Shoots</span>
          </h2>
        </div>

        <div style={{ position: "relative", zIndex: 2 }}>
          <DiamondGrid />
          <ProductShootCarousel />
        </div>
      </section>

      {/* Services & Contact */}

      <ServiceSection />
      <ContactUsForm />
    </div>
  );
};

export default ProductShoot;