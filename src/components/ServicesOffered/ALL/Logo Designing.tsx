import React, { useEffect, useRef } from 'react';
import ServiceSection from '@/components/HomePage/ServicesSection';
import ContactUsForm from '@/pages/ContactUsForm';

const LogoDesigning: React.FC = () => {
  const logoImages = [
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Logo-Designing/Logos/AadevLogo.png',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Logo-Designing/Logos/Aashray-Samiti.png',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Logo-Designing/Logos/AhilyasFoundation.png',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Logo-Designing/Logos/Akhil-Bharat-Datta-Foundation.png',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Logo-Designing/Logos/AnekaLogo.webp',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Logo-Designing/Logos/BabajikiButiLogo.webp',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Logo-Designing/Logos/CKReddyLogo.png',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Logo-Designing/Logos/Cafe-Nouris.png',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Logo-Designing/Logos/GSD-Organics.webp',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Logo-Designing/Logos/Gau-Seva-Dham-Hospital.webp',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Logo-Designing/Logos/GauMandirlogo.png',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Logo-Designing/Logos/Gllora.png',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Logo-Designing/Logos/Hand-In-Hand-Logo.png',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Logo-Designing/Logos/Happilee-Foundation.png',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Logo-Designing/Logos/Harshchhikara-Logo.png',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Logo-Designing/Logos/Humanity-Foundation.png',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Logo-Designing/Logos/Janki-Group.webp',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Logo-Designing/Logos/JungleBrook.webp',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Logo-Designing/Logos/KhambaniFoods.webp',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Logo-Designing/Logos/Krishna-Logo.webp',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Logo-Designing/Logos/LOGOS-Little-Heart-Foundation.webp',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Logo-Designing/Logos/Label-Numani.webp',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Logo-Designing/Logos/Madhav-Numerology.png',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Logo-Designing/Logos/MahipathSinh-Foundation.png',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Logo-Designing/Logos/Manav-Janhit-Kalyan.webp',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Logo-Designing/Logos/Nanhi-Pari-Foundation.webp',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Logo-Designing/Logos/Nishchay-Foundation.png',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Logo-Designing/Logos/PBLogo.png',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Logo-Designing/Logos/PalaviLogo.png',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Logo-Designing/Logos/Parag-Foundation-Logo.png',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Logo-Designing/Logos/Pratibha-MindSpace.webp',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Logo-Designing/Logos/RBNEUROZYME.webp',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Logo-Designing/Logos/Second-Chance.webp',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Logo-Designing/Logos/TastyFoodsHub.webp',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Logo-Designing/Logos/ThePerfumeByGoldy.webp',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Logo-Designing/Logos/Vikasana-Foundation-Logo.png',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Logo-Designing/Logos/Vishram-Ghar-Foundation-Logo.png',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Logo-Designing/Logos/fortune-logo.png',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Logo-Designing/Logos/kryelet.avif',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Logo-Designing/Logos/muktaShop.webp',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Logo-Designing/Logos/social-media-real-estate-CI%20Builders-img1.webp',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Logo-Designing/Logos/Mahaveer-Eye-Hospital.png',
  ];

  const gridRef = useRef<HTMLDivElement>(null);
  const featuredTrackRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for staggered fade-up animation
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll<HTMLDivElement>('.logo-card');
    if (!cards) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLDivElement).style.animationPlayState = 'running';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    cards.forEach((card) => {
      card.style.animationPlayState = 'paused';
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const featuredLogos = logoImages.slice(0, 10);
  const doubledFeatured = [...featuredLogos, ...featuredLogos];

  return (
    <>
      <style>{`
        /* ── Fonts ───────────────────────────────────────── */

        /* ── CSS Variables ───────────────────────────────── */
        :root {
          --gold-primary: #f5c842;
          --gold-light:   #fde68a;
          --gold-muted:   #c9a227;
          --gold-dim:     rgba(245,200,66,0.18);
          --gold-glow:    rgba(245,200,66,0.12);
          --black-deep:   #050505;
          --black-card:   rgba(255,255,255,0.028);
          --black-card2:  rgba(255,255,255,0.012);
        }

        /* ── Keyframes ───────────────────────────────────── */
        @keyframes ld-fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes ld-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes ld-shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position:  400px 0; }
        }
        @keyframes ld-swipe {
          0%   { transform: translateX(-100%) skewX(-12deg); opacity: 0.7; }
          60%  { opacity: 0.55; }
          100% { transform: translateX(160%)  skewX(-12deg); opacity: 0; }
        }

        /* ── Section wrapper ─────────────────────────────── */
        .ld-section {
          background: var(--black-deep);
          padding: 90px 48px 100px;
          position: relative;
          overflow: hidden;
        }
        .ld-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 72% 48% at 50% 8%,  rgba(245,200,66,0.055) 0%, transparent 58%),
            radial-gradient(ellipse 44% 36% at 10% 88%, rgba(245,200,66,0.03)  0%, transparent 55%),
            radial-gradient(ellipse 44% 36% at 90% 72%, rgba(245,200,66,0.03)  0%, transparent 55%);
          pointer-events: none;
        }
        /* subtle noise grain */
        .ld-section::after {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0.35;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
        }

        /* ── Inner content ───────────────────────────────── */
        .ld-inner {
          position: relative;
          z-index: 2;
          max-width: 1280px;
          margin: 0 auto;
        }

        /* ── Section header ──────────────────────────────── */
        .ld-header {
          text-align: center;
          margin-bottom: 56px;
        }
        .ld-title {
          font-family: 'Libre Baskerville', serif;
          font-size: clamp(2rem, 4.5vw, 3.2rem);
          font-weight: 700;
          background: linear-gradient(135deg, #c9a227 0%, #f5c842 38%, #fde68a 58%, #c9a227 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: 0.025em;
          line-height: 1.18;
          margin-bottom: 14px;
        }
        .ld-rule {
          width: 56px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #f5c842, transparent);
          margin: 14px auto 18px;
        }
        .ld-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 12.5px;
          color: rgba(245,200,66,0.45);
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 400;
        }

        /* ── Featured slider ─────────────────────────────── */
        .ld-slider-label {
          font-family: 'Inter', sans-serif;
          font-size: 10.5px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(245,200,66,0.32);
          text-align: center;
          margin-bottom: 18px;
        }
        .ld-slider-wrap {
          position: relative;
          overflow: hidden;
          margin-bottom: 72px;
        }
        .ld-slider-wrap::before,
        .ld-slider-wrap::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          width: 100px;
          z-index: 3;
          pointer-events: none;
        }
        .ld-slider-wrap::before { left: 0;  background: linear-gradient(90deg,  #050505, transparent); }
        .ld-slider-wrap::after  { right: 0; background: linear-gradient(-90deg, #050505, transparent); }
        .ld-slider-track {
          display: flex;
          gap: 18px;
          padding: 20px 80px;
          animation: ld-scroll 32s linear infinite;
          width: max-content;
        }
        .ld-slider-track:hover { animation-play-state: paused; }

        /* ── Featured card ─────────────────────────────────
           FIXED: padding reduced to 8px so logo fills ~90% of card.
           object-fit: contain keeps the full logo visible (no cropping).
        ── */
        .ld-featured-card {
          flex: 0 0 190px;
          height: 112px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          border: 1px solid rgba(245,200,66,0.2);
          background: linear-gradient(145deg, var(--black-card), var(--black-card2));
          backdrop-filter: blur(6px);
          padding: 8px 10px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform 0.32s ease, border-color 0.32s ease, box-shadow 0.32s ease;
        }
        .ld-featured-card::before {
          content: '';
          position: absolute; inset: 0;
          background: var(--black-deep);
          opacity: 0;
          transition: opacity 0.32s ease;
          border-radius: inherit;
        }
        .ld-featured-card:hover::before { opacity: 1; }
        .ld-featured-card:hover {
          transform: translateY(-6px) scale(1.06);
          border-color: rgba(245,200,66,0.55);
          box-shadow: 0 0 28px rgba(245,200,66,0.14), 0 10px 36px rgba(0,0,0,0.55);
        }
        /* FIXED: width/height 100% fills the padded area; contain prevents cropping */
        .ld-featured-card img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: transform 0.32s ease, filter 0.32s ease;
          filter: brightness(0.92);
          position: relative;
          z-index: 1;
        }
        .ld-featured-card:hover img {
          transform: scale(1.06);
          filter: brightness(1.12);
        }

        /* ── Main Logo Grid ──────────────────────────────── */
        .ld-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
          gap: 22px;
        }

        /* ── Logo card ─────────────────────────────────────
           FIXED: padding reduced to 8px so image fills ~90% of each card.
           object-fit: contain keeps every logo fully visible without any cropping.
        ── */
        .logo-card {
          aspect-ratio: 4 / 3;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          border: 1px solid rgba(245,200,66,0.14);
          background: var(--black-deep);
          backdrop-filter: blur(4px);
          padding: 8px;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          opacity: 0;
          transform: translateY(26px);
          animation: ld-fadeUp 0.65s ease forwards;
          transition: transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
        }
        /* top-edge gold shimmer line */
        .logo-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 10%, rgba(245,200,66,0.35) 50%, transparent 90%);
          opacity: 0;
          transition: opacity 0.35s ease;
          z-index: 2;
        }
        /* inner glow bloom on hover */
        .logo-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 0%, rgba(245,200,66,0.09), transparent 65%);
          opacity: 0;
          transition: opacity 0.35s ease;
          border-radius: inherit;
          z-index: 2;
        }
        .logo-card:hover::before { opacity: 1; }
        .logo-card:hover::after  { opacity: 1; }
        .logo-card:hover {
          transform: translateY(-7px);
          border-color: rgba(245,200,66,0.48);
          box-shadow:
            0 0 22px rgba(245,200,66,0.11),
            0 14px 44px rgba(0,0,0,0.6),
            inset 0 1px 0 rgba(245,200,66,0.09);
        }

        /* FIXED: width/height 100% makes image as large as possible inside the 8px padding.
           object-fit: contain ensures every logo is shown completely, never cropped. */
        .logo-card img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: brightness(0.91) contrast(1.02);
          transition: transform 0.35s ease, filter 0.35s ease;
          position: relative;
          z-index: 1;
          display: block;
        }
        .logo-card:hover img {
          transform: scale(1.07);
          filter: brightness(1.1) contrast(1.02);
        }

        /* swipe-shine element only on main grid cards */
        .logo-card .ld-swipe {
          position: absolute;
          inset: 0;
          z-index: 3;
          overflow: hidden;
          border-radius: inherit;
          pointer-events: none;
        }
        .logo-card .ld-swipe::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          left: 0;
          width: 55%;
          background: linear-gradient(
            105deg,
            transparent 20%,
            rgba(245,200,66,0.18) 45%,
            rgba(255,255,255,0.22) 55%,
            rgba(245,200,66,0.12) 65%,
            transparent 80%
          );
          transform: translateX(-100%) skewX(-12deg);
          opacity: 0;
        }
        .logo-card:hover .ld-swipe::after {
          animation: ld-swipe 0.62s cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
        }
        .logo-card-dot {
          position: absolute;
          top: 9px; right: 9px;
          width: 4px; height: 4px;
          border-radius: 50%;
          background: rgba(245,200,66,0);
          transition: background 0.35s ease;
          z-index: 4;
        }
        .logo-card:hover .logo-card-dot {
          background: rgba(245,200,66,0.65);
        }

        /* ── Responsive ──────────────────────────────────── */
        @media (max-width: 768px) {
          .ld-section { padding: 60px 22px 70px; }
          .ld-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
          .ld-featured-card { flex: 0 0 148px; height: 92px; }
          .ld-slider-track { padding: 16px 40px; gap: 14px; }
        }
        @media (max-width: 480px) {
          .ld-grid { gap: 12px; }
        }
      `}</style>

      <div className="service-page pt-[100px] md:pt-[120px] lg:pt-[140px] px-0">
        <style>{`
          @media (max-width: 768px) {
            .service-page {
              padding-top: 100px !important;
            }
          }
        `}</style>
        {/* ── Hero Section ─────────────────────────────────── */}
        <section className="service-section" style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="w-full max-w-6xl text-center space-y-6">
            <h1
              className="ld-title"
              style={{ fontFamily: "'Libre Baskerville', serif" }}
            >
              Logo Designing
            </h1>
            <p className="service-text text-base md:text-lg" style={{ fontFamily: "'Inter', sans-serif" }}>
              A logo is more than just a visual mark it's the face of your brand, the first impression
              that speaks volumes about who you are and what you stand for. At Govindani Infotech Pvt. Ltd.,
              we craft distinctive, memorable logos that capture the essence of your business and leave a
              lasting impact on your audience.
            </p>
            <p className="service-text-muted text-sm md:text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
              Our logo design process blends creative artistry with strategic thinking. We dive deep into
              understanding your brand's personality, values, target audience, and competitive landscape to
              create a logo that's not just beautiful but also meaningful and versatile. From minimalist
              wordmarks to intricate emblems, we design logos that work seamlessly across digital platforms,
              print materials, merchandise, and signage.
            </p>
          </div>
        </section>

        {/* ── Our Logos Section ────────────────────────────── */}
        <section className="ld-section">
          <div className="ld-inner">

            {/* Header */}
            <div className="ld-header">
              <h2 className="ld-title">Our Logos</h2>
              <div className="ld-rule" />
              <p className="ld-subtitle">A curated collection of brands we've brought to life</p>
            </div>

            {/* Featured auto-scroll slider */}
            <div className="ld-slider-wrap">
              <div className="ld-slider-track" ref={featuredTrackRef}>
                {doubledFeatured.map((src, i) => (
                  <div className="ld-featured-card" key={`featured-${i}`}>
                    <img
                      src={src}
                      alt={`Featured logo ${(i % featuredLogos.length) + 1}`}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Main grid */}
            <div className="ld-grid" ref={gridRef}>
              {logoImages.map((src, index) => (
                <div
                  key={index}
                  className="logo-card"
                  style={{
                    animationDelay: `${Math.floor(index / 4) * 90 + (index % 4) * 45}ms`,
                  }}
                >
                  <span className="logo-card-dot" />
                  <span className="ld-swipe" />
                  <img
                    src={src}
                    alt={`Logo design ${index + 1}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Contact + Services */}
        <ServiceSection />
        <ContactUsForm />
      </div>
    </>
  );
};

export default LogoDesigning;