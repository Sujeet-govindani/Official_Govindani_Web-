import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const highlights = [
  {
    icon: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wordrecord1.webp",
    number: "01",
    tag: "WORLD RECORD",
    title: "Record-Smashing Beginnings",
    items: [
      "Youngest author to record 101 Startup Ideas at age 22 Guinness World Record",
      "Secondary Guinness Record for publishing 25+ books on digital marketing",
    ],
  },
  {
    icon: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Bookpublished1.webp",
    number: "02",
    tag: "PUBLISHED WORKS",
    title: "Books That Shape Minds",
    items: [
      "25+ titles on strategy, SEO, digital growth, creative scaling",
      "All published and distributed globally on Kindle",
      "Rated 4.9+ / 5 consistently by readers worldwide",
    ],
  },
  {
    icon: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/you1.webp",
    number: "03",
    tag: "DIGITAL REACH",
    title: "A Voice Heard by Millions",
    items: [
      "1,00,000+ YouTube subscribers",
      "15,000,000+ views across motivational & strategy content",
      "Monthly view average: 1 Lakh+",
    ],
  },
];

const stats = [
  { value: "101", label: "Startup Ideas", suffix: "+", desc: "World Record" },
  { value: "25", label: "Books Published", suffix: "+", desc: "Global Kindle" },
  { value: "15M", label: "Total Views", suffix: "+", desc: "YouTube" },
  { value: "4.9", label: "Reader Rating", suffix: "★", desc: "Out of 5" },
];

// ─── Smart Icon Renderer ───────────────────────────────────────────────────
const CardIcon = ({ icon }: { icon: string }) => {
  const isImagePath =
    icon.startsWith('/') ||
    icon.startsWith('http://') ||
    icon.startsWith('https://') ||
    icon.startsWith('./');

  if (isImagePath) {
    return (
      <img
        src={icon}
      alt=""
      aria-hidden="true"
        alt="card icon"
        className="glass-card-icon-img"
      />
    );
  }

  return <span className="glass-card-icon">{icon}</span>;
};

// 3D tilt card with mouse tracking
const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, gx: 50, gy: 50 });
  const [hovered, setHovered] = useState(false);

  const handleMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    const gx = ((e.clientX - rect.left) / rect.width) * 100;
    const gy = ((e.clientY - rect.top) / rect.height) * 100;
    setTilt({ x: dy * -5, y: dx * 5, gx, gy });
  };

  const style = {
    transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${hovered ? '12px' : '0px'})`,
    transition: hovered ? 'transform 0.08s linear' : 'transform 0.6s cubic-bezier(0.23,1,0.32,1)',
    '--gx': `${tilt.gx}%`,
    '--gy': `${tilt.gy}%`,
    '--hovered': hovered ? '1' : '0',
    /* ✅ KEY FIX: fill the motion wrapper height */
    height: '100%',
  } as React.CSSProperties & {
    '--gx'?: string;
    '--gy'?: string;
    '--hovered'?: string;
  };

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0, gx: 50, gy: 50 }); setHovered(false); }}
      style={style}
    >
      {children}
    </div>
  );
};

const StorySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <>
      <style>{`

        /* ═══ CSS VARIABLES ═══ */
        .glass-root {
          --gold-1: #FFE066;
          --gold-2: #FFD700;
          --gold-3: #C9A84C;
          --gold-4: #8B6914;
          --gold-5: #4A3500;

          --glass-base: rgba(255, 255, 255, 0.08);
          --glass-border: rgba(255, 255, 255, 0.18);
          --glass-shadow: rgba(0, 0, 0, 0.6);
          --glass-highlight: rgba(255, 255, 255, 0.25);

          --text-primary: #FFFFFF;
          --text-secondary: rgba(255, 255, 255, 0.70);
          --text-tertiary: rgba(255, 255, 255, 0.40);

          --bg-primary: #0A0A0A;
          --bg-secondary: #121212;

          font-family: 'Inter', sans-serif;
          background: var(--bg-primary);
          position: relative;
          overflow: hidden;
          padding: 0;
        }

        /* ═══ ATMOSPHERIC BACKGROUND ═══ */
        .glass-atmosphere {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        .glass-glow-1 {
          position: absolute;
          top: -25%;
          left: 50%;
          transform: translateX(-50%);
          width: 140%;
          height: 80%;
          background: radial-gradient(ellipse at 50% 0%, rgba(255,215,0,0.15) 0%, rgba(160,110,10,0.08) 35%, transparent 70%);
          filter: blur(80px);
        }

        .glass-glow-2 {
          position: absolute;
          bottom: -15%;
          left: -15%;
          width: 60%;
          height: 60%;
          background: radial-gradient(ellipse at 20% 80%, rgba(139,105,20,0.12) 0%, transparent 65%);
          filter: blur(70px);
        }

        .glass-glow-3 {
          position: absolute;
          top: 25%;
          right: -10%;
          width: 50%;
          height: 70%;
          background: radial-gradient(ellipse at 85% 40%, rgba(100,75,10,0.10) 0%, transparent 65%);
          filter: blur(70px);
        }

        .glass-dots {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(255,215,0,0.08) 1px, transparent 1px);
          background-size: 32px 32px;
          mask-image: radial-gradient(ellipse 70% 50% at 50% 50%, black 10%, transparent 70%);
        }

        .glass-grain {
          position: absolute;
          inset: 0;
          opacity: 0.045;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px 200px;
        }

        .glass-scan {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px);
          pointer-events: none;
        }

        /* ═══ LAYOUT ═══ */
        .glass-container {
          position: relative;
          z-index: 2;
          max-width: 1280px;
          margin: 0 auto;
          padding: 120px 56px;
        }

        @media (max-width: 900px) { .glass-container { padding: 80px 32px; } }
        @media (max-width: 480px) { .glass-container { padding: 64px 20px; } }

        /* ═══ SECTION HEADER ═══ */
        .glass-section-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .glass-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--gold-3);
          margin-bottom: 32px;
          padding: 10px 24px;
          background: var(--glass-base);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid var(--glass-border);
          border-radius: 100px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 var(--glass-highlight);
        }

        .glass-eyebrow::before,
        .glass-eyebrow::after {
          content: '';
          width: 4px;
          height: 4px;
          background: var(--gold-2);
          border-radius: 50%;
          box-shadow: 0 0 8px var(--gold-2);
        }

        .glass-h1 {
          font-family: 'Libre Baskerville', serif;
          font-size: clamp(56px, 10vw, 120px);
          font-weight: 300;
          line-height: 0.95;
          letter-spacing: -0.03em;
          color: var(--text-primary);
          margin-bottom: 24px;
        }

        .glass-h1 em {
          font-style: italic;
          background: linear-gradient(135deg, var(--gold-1) 0%, var(--gold-2) 40%, var(--gold-3) 70%, var(--gold-1) 100%);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: goldShimmer 6s ease infinite;
        }

        @keyframes goldShimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .glass-subtitle {
          font-family: 'Libre Baskerville', serif;
          font-size: clamp(16px, 2.4vw, 22px);
          font-weight: 300;
          font-style: italic;
          color: rgba(255, 255, 255, 0.85);
          letter-spacing: 0.03em;
        }

        /* ═══ NARRATIVE SECTION ═══ */
        .glass-narrative {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          margin-bottom: 80px;
          padding: 64px;
          background: var(--glass-base);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid var(--glass-border);
          border-radius: 32px;
          box-shadow: 0 24px 80px rgba(0,0,0,0.5), inset 0 1px 0 var(--glass-highlight), inset 0 -1px 0 rgba(0,0,0,0.4);
          position: relative;
          overflow: hidden;
        }

        .glass-narrative::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 20% 30%, rgba(255,215,0,0.06) 0%, transparent 60%);
          pointer-events: none;
        }

        @media (max-width: 800px) {
          .glass-narrative { grid-template-columns: 1fr; gap: 40px; padding: 48px 32px; }
        }

        .glass-quote {
          font-family: 'Libre Baskerville', serif;
          font-size: clamp(22px, 3.5vw, 38px);
          font-weight: 400;
          line-height: 1.5;
          color: var(--text-primary);
          margin-bottom: 32px;
          position: relative;
          z-index: 1;
        }

        .glass-quote .highlight {
          background: linear-gradient(135deg, var(--gold-1), var(--gold-2));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-style: italic;
          font-weight: 500;
        }

        .glass-author-badge {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 100px;
          padding: 12px 24px 12px 12px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2);
          position: relative;
          z-index: 1;
        }

        .glass-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--gold-4), var(--gold-3), var(--gold-2));
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Inter', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #000;
          box-shadow: 0 4px 16px rgba(255,215,0,0.3);
        }

        .glass-author-info {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .glass-author-name {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: 0.02em;
        }

        .glass-author-title {
          font-size: 10px;
          color: var(--gold-3);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .glass-body-text {
          font-size: 17px;
          font-weight: 400;
          line-height: 2;
          color: rgba(255, 255, 255, 0.80);
          position: relative;
          z-index: 1;
        }

        .glass-body-text .em {
          color: var(--gold-2);
          font-weight: 600;
        }

        .glass-body-text + .glass-body-text {
          margin-top: 24px;
        }

        /* ═══ DIVIDER ═══ */
        .glass-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin: 72px 0;
        }

        .glass-divider-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,215,0,0.2), transparent);
        }

        .glass-divider-dots { display: flex; gap: 6px; }

        .glass-dot {
          width: 5px;
          height: 5px;
          background: var(--gold-3);
          border-radius: 50%;
          opacity: 0.6;
        }

        .glass-dot.active {
          width: 8px;
          height: 8px;
          background: var(--gold-2);
          opacity: 1;
          box-shadow: 0 0 12px var(--gold-2);
        }

        /* ═══ STATS BAND ═══ */
        .glass-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 4px;
          margin-bottom: 80px;
          background: var(--glass-base);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid var(--glass-border);
          border-radius: 28px;
          overflow: hidden;
          padding: 4px;
          box-shadow: 0 32px 100px rgba(0,0,0,0.6), inset 0 1px 0 var(--glass-highlight);
        }

        @media (max-width: 720px) { .glass-stats { grid-template-columns: repeat(2, 1fr); } }

        .glass-stat-item {
          background: rgba(0,0,0,0.4);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 48px 32px;
          text-align: center;
          position: relative;
          transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
        }

        .glass-stat-item:hover {
          background: rgba(255,215,0,0.06);
          border-color: rgba(255,215,0,0.2);
          transform: translateY(-4px);
        }

        .glass-stat-item::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 0%, rgba(255,215,0,0.08) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
          border-radius: 24px;
        }

        .glass-stat-item:hover::before { opacity: 1; }

        .glass-stat-value {
          font-family: 'Inter', sans-serif;
          font-size: clamp(42px, 6vw, 68px);
          font-weight: 700;
          line-height: 1;
          background: linear-gradient(135deg, var(--gold-1), var(--gold-2), var(--gold-3));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 4px;
          margin-bottom: 12px;
        }

        .glass-stat-suffix { font-size: 0.45em; font-weight: 600; opacity: 0.9; }
        .glass-stat-label {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--text-tertiary);
          margin-bottom: 6px;
        }

        .glass-stat-desc {
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--gold-4);
          font-weight: 700;
        }

        /* ═══ FEATURE CARDS ═══
         *  ✅ FIX: align-items: stretch (default) + height propagation chain
         *     grid → motion.div → TiltCard div → .glass-card
         *  All three wrappers must be height:100% so every card
         *  stretches to the tallest sibling in the row.
         * ══════════════════════════════════════════════════════ */
        .glass-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 80px;
          /* align-items defaults to stretch keeps all cells equal height */
          align-items: stretch;
        }

        @media (max-width: 960px) { .glass-cards { grid-template-columns: 1fr; } }
        @media (min-width: 600px) and (max-width: 960px) { .glass-cards { grid-template-columns: repeat(2, 1fr); } }

        /* ✅ motion.div wrapper must fill its grid cell */
        .glass-card-motion-wrapper {
          display: flex;          /* makes child TiltCard fill height */
          flex-direction: column;
        }

        /* ✅ TiltCard root div height:100% is set inline in the component */

        /* ✅ .glass-card fills TiltCard, uses flex-col so list grows to bottom */
        .glass-card {
          position: relative;
          background: var(--glass-base);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid var(--glass-border);
          border-radius: 32px;
          padding: 48px 40px;
          overflow: hidden;
          box-shadow: 0 24px 80px rgba(0,0,0,0.6), inset 0 1px 0 var(--glass-highlight), inset 0 -1px 0 rgba(0,0,0,0.3);
          transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
          will-change: transform;

          /* ✅ KEY: fill wrapper height, stack content top-to-bottom */
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
        }

        .glass-card:hover {
          border-color: rgba(255,215,0,0.25);
          box-shadow: 0 32px 100px rgba(0,0,0,0.7), 0 0 60px rgba(255,215,0,0.1), inset 0 1px 0 rgba(255,255,255,0.3);
        }

        .glass-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent 0%, rgba(255,215,0,0.2) 20%, rgba(255,215,0,0.8) 50%, rgba(255,215,0,0.2) 80%, transparent 100%);
        }

        .glass-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(250px circle at var(--gx, 50%) var(--gy, 50%), rgba(255,215,0,0.08) 0%, transparent 70%);
          opacity: calc(var(--hovered, 0) * 1);
          transition: opacity 0.3s ease;
          pointer-events: none;
          border-radius: 32px;
        }

        .glass-card-number {
          position: absolute;
          bottom: -12px; right: 16px;
          font-family: 'Inter', sans-serif;
          font-size: 120px;
          font-weight: 800;
          line-height: 1;
          color: rgba(255,215,0,0.06);
          letter-spacing: -0.05em;
          user-select: none;
          pointer-events: none;
        }

        .glass-card-tag {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 24px;
          /* ✅ prevent shrink so tag stays at top */
          flex-shrink: 0;
        }

        .glass-card-tag-line {
          width: 24px;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold-3));
        }

        .glass-card-tag-text {
          font-family: 'Inter', sans-serif;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--gold-3);
        }

        /* ─── Emoji icon (span) ─── */
        .glass-card-icon {
          font-size: 36px;
          display: block;
          margin-bottom: 20px;
          filter: drop-shadow(0 0 20px rgba(255,215,0,0.3));
          line-height: 1;
          flex-shrink: 0;
        }

        /* ─── Image icon (img) ─── */
        .glass-card-icon-img {
          width: 80px;
          height: 80px;
          object-fit: contain;
          display: block;
          margin-bottom: 20px;
          filter: drop-shadow(0 0 20px rgba(255,215,0,0.4)) brightness(1.1);
          flex-shrink: 0;
        }

        .glass-card-title {
          font-family: 'Libre Baskerville', serif;
          font-size: clamp(20px, 2.2vw, 25px);
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.3;
          margin-bottom: 28px;
          letter-spacing: -0.01em;
          position: relative;
          z-index: 1;
          flex-shrink: 0;
        }

        /* ✅ List grows to fill remaining card space so all cards bottom-align */
        .glass-card-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
          position: relative;
          z-index: 1;
          flex: 1;          /* ← grows to fill leftover card height */
        }

        .glass-card-item { display: flex; gap: 14px; align-items: flex-start; }

        .glass-card-bullet {
          flex-shrink: 0;
          margin-top: 7px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: rgba(255,215,0,0.12);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,215,0,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2);
        }

        .glass-card-bullet::after {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--gold-2);
          box-shadow: 0 0 10px var(--gold-2);
        }

        .glass-card-text {
          font-size: 14px;
          font-weight: 400;
          line-height: 1.9;
          color: var(--text-secondary);
        }

        /* ═══ IDENTITY FOOTER ═══ */
        .glass-identity {
          position: relative;
          background: var(--glass-base);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid var(--glass-border);
          border-radius: 32px;
          padding: 56px 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          overflow: hidden;
          box-shadow: 0 32px 100px rgba(0,0,0,0.7), 0 0 80px rgba(255,215,0,0.08), inset 0 1px 0 var(--glass-highlight);
        }

        @media (max-width: 768px) {
          .glass-identity { flex-direction: column; text-align: center; padding: 48px 32px; gap: 32px; }
        }

        .glass-identity::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 20% 50%, rgba(255,215,0,0.08) 0%, transparent 60%);
          pointer-events: none;
        }

        .glass-identity-glow {
          position: absolute;
          left: -100px; top: -100px;
          width: 400px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,215,0,0.12) 0%, transparent 70%);
          pointer-events: none;
          filter: blur(60px);
        }

        .glass-identity-left { position: relative; z-index: 1; }

        .glass-identity-name {
          font-family: 'Libre Baskerville', serif;
          font-size: clamp(32px, 5vw, 56px);
          font-weight: 700;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #FFFFFF 0%, var(--gold-1) 30%, var(--gold-2) 60%, var(--gold-3) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.2;
          padding-bottom: 0.1em;
          margin-bottom: 12px;
        }

        .glass-identity-role {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--text-tertiary);
        }

        .glass-identity-right {
          position: relative;
          z-index: 1;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: flex-end;
        }

        @media (max-width: 768px) { .glass-identity-right { justify-content: center; } }

        .glass-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 100px;
          padding: 10px 20px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2);
          transition: all 0.3s ease;
        }

        .glass-badge:hover {
          background: rgba(255,215,0,0.12);
          border-color: rgba(255,215,0,0.3);
          transform: translateY(-2px);
        }

        .glass-badge-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--gold-2);
          box-shadow: 0 0 10px var(--gold-2);
        }

        .glass-badge-text {
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--gold-3);
        }
      `}</style>

      <section className="glass-root" ref={ref}>
        {/* ═══ ATMOSPHERIC BACKGROUND ═══ */}
        <div className="glass-atmosphere">
          <div className="glass-glow-1" />
          <div className="glass-glow-2" />
          <div className="glass-glow-3" />
          <div className="glass-dots" />
          <div className="glass-grain" />
          <div className="glass-scan" />
        </div>

        <div className="glass-container">
          {/* ═══ HEADER ═══ */}
          <motion.div
            className="glass-section-header"
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="glass-eyebrow">The Story of Excellence</div>
            <h2 className="glass-h1">
              The Mind<br />
              That <em>Rewrote</em><br />
              The Rules
            </h2>
            <p className="glass-subtitle">
              Global Startup Mentor · Guinness Record Holder · Digital Growth Architect
            </p>
          </motion.div>

          {/* ═══ NARRATIVE ═══ */}
          <motion.div
            className="glass-narrative"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div>
              <p className="glass-quote">
                "A young architect of ideas who didn't just write a book wrote{' '}
                <span className="highlight">101 Startup Ideas</span> the world had never seen, and etched it into the{' '}
                <span className="highlight">Guinness World Records.</span>"
              </p>
              <div className="glass-author-badge">
                <div className="glass-avatar">SG</div>
                <div className="glass-author-info">
                  <span className="glass-author-name">Sujeet Govindani</span>
                  <span className="glass-author-title">Author · Mentor · Record Holder</span>
                </div>
              </div>
            </div>

            <div>
              <p className="glass-body-text">
                Imagine a mind that sees possibilities when others see problems. In less than a month, he authored{' '}
                <span className="em">25+ breakthrough books</span> on digital marketing, strategy, SEO, and growth all published globally on Kindle.
              </p>
              <p className="glass-body-text">
                All rated <span className="em">4.9+ out of 5</span> used by leaders, founders, and creators around the world. This is not just authorship. This is the beginning of a <span className="em">legacy</span>.
              </p>
            </div>
          </motion.div>

          {/* ═══ DIVIDER ═══ */}
          <motion.div
            className="glass-divider"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="glass-divider-line" />
            <div className="glass-divider-dots">
              <div className="glass-dot" />
              <div className="glass-dot active" />
              <div className="glass-dot" />
            </div>
            <div className="glass-divider-line" />
          </motion.div>

          {/* ═══ STATS BAND ═══ */}
          <motion.div
            className="glass-stats"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {stats.map((stat, i) => (
              <div key={i} className="glass-stat-item">
                <div className="glass-stat-value">
                  {stat.value}<span className="glass-stat-suffix">{stat.suffix}</span>
                </div>
                <div className="glass-stat-label">{stat.label}</div>
                <div className="glass-stat-desc">{stat.desc}</div>
              </div>
            ))}
          </motion.div>

          {/* ═══ FEATURE CARDS ═══ */}
          <div className="glass-cards">
            {highlights.map((card, i) => (
              <motion.div
                key={i}
                className="glass-card-motion-wrapper"   /* ✅ flex col wrapper */
                initial={{ opacity: 0, y: 60 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 1 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* TiltCard sets height:100% inline so it fills motion wrapper */}
                <TiltCard className="glass-card">
                  <div className="glass-card-number">{card.number}</div>
                  <div className="glass-card-tag">
                    <div className="glass-card-tag-line" />
                    <span className="glass-card-tag-text">{card.tag}</span>
                  </div>

                  {/* Smart icon: renders <img> for paths, <span> for emojis */}
                  <CardIcon icon={card.icon} />

                  <h3 className="glass-card-title">{card.title}</h3>
                  <ul className="glass-card-list">
                    {card.items.map((item, j) => (
                      <li key={j} className="glass-card-item">
                        <div className="glass-card-bullet" />
                        <span className="glass-card-text">{item}</span>
                      </li>
                    ))}
                  </ul>
                </TiltCard>
              </motion.div>
            ))}
          </div>

          {/* ═══ IDENTITY FOOTER ═══ */}
          <motion.div
            className="glass-identity"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="glass-identity-glow" />
            <div className="glass-identity-left">
              <div className="glass-identity-name">Sujeet Govindani</div>
              <div className="glass-identity-role">
                Global Startup Mentor &amp; Digital Growth Architect
              </div>
            </div>
            <div className="glass-identity-right">
              <div className="glass-badge">
                <div className="glass-badge-dot" />
                <span className="glass-badge-text">Guinness Record Holder</span>
              </div>
              <div className="glass-badge">
                <div className="glass-badge-dot" />
                <span className="glass-badge-text">25+ Books</span>
              </div>
              <div className="glass-badge">
                <div className="glass-badge-dot" />
                <span className="glass-badge-text">15M+ Views</span>
              </div>
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
};

export default StorySection;