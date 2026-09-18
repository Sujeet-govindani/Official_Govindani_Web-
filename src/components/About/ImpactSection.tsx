import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Target, Award, Building, Crown, Youtube, BookOpen, Medal, Star } from 'lucide-react';

/* ─────────────────────────────────────────────
   SECTION 1 YOUTUBE SHOWCASE
───────────────────────────────────────────── */
const YoutubeShowcaseSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  const ytStats = [
    { value: '1,00,000+', label: 'Subscribers' },
    { value: '15M+', label: 'Total Views' },
    { value: '1 Lakh+', label: 'Monthly Views' },
  ];

  return (
    <>
      <style>{`

        .yt-root {
          position: relative;
          padding: 40px 40px 80px;
          overflow: hidden;
          background: #000;
          font-family: 'Libre Baskerville', serif;
        }

        /* backgrounds */
        .yt-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        .yt-bg-glow1 {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 60% at 65% 50%, rgba(180,120,0,0.12), transparent);
        }
        .yt-bg-glow2 {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 50% 40% at 10% 80%, rgba(80,50,0,0.10), transparent);
        }
        .yt-bg-dots {
          position: absolute;
          inset: 0;
          opacity: 0.025;
          background-image: radial-gradient(circle, #d4af37 1px, transparent 1px);
          background-size: 32px 32px;
        }
        .yt-bg-fade {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, #000 0%, transparent 15%, transparent 85%, #000 100%);
        }

        .yt-inner {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        @media (max-width: 900px) {
          .yt-root { padding: 72px 28px; }
          .yt-inner { grid-template-columns: 1fr; gap: 48px; }
        }

        /* left */
        .yt-eyebrow {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }
        .yt-eyebrow-line {
          width: 32px;
          height: 1px;
          background: rgba(217,168,55,0.5);
        }
        .yt-eyebrow-text {
          font-size: 10px;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: rgba(217,168,55,0.65);
          font-weight: 400;
        }
        .yt-heading {
          font-size: clamp(36px, 5vw, 58px);
          font-weight: 300;
          line-height: 1.1;
          color: #fff;
          margin-bottom: 20px;
          letter-spacing: -0.02em;
        }
        .yt-heading em {
          font-style: italic;
          background: linear-gradient(135deg, #ffe08a, #f4a918, #c47d00);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .yt-body {
          font-size: 16px;
          line-height: 1.9;
          color: rgba(255,255,255,0.5);
          margin-bottom: 14px;
        }
        .yt-body2 {
          font-size: 14px;
          line-height: 1.8;
          color: rgba(255,255,255,0.35);
          margin-bottom: 36px;
        }
        .yt-stats-row {
          display: flex;
          flex-wrap: wrap;
          gap: 36px;
          margin-bottom: 36px;
        }
        .yt-stat-val {
          font-size: 26px;
          font-weight: 300;
          background: linear-gradient(135deg, #ffe08a, #c47d00);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: block;
          margin-bottom: 4px;
        }
        .yt-stat-lbl {
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
        }
        .yt-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          border: 1px solid rgba(217,168,55,0.35);
          padding: 12px 24px;
          color: rgba(217,168,55,0.9);
          font-family: 'Libre Baskerville', serif;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          text-decoration: none;
          background: transparent;
          cursor: pointer;
          transition: background 0.35s ease, border-color 0.35s ease;
        }
        .yt-cta:hover {
          background: rgba(217,168,55,0.08);
          border-color: rgba(217,168,55,0.6);
        }
        .yt-cta-arrow {
          color: rgba(217,168,55,0.4);
          font-size: 14px;
        }

        /* right image block */
        .yt-img-wrap {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .yt-img-glow {
          position: absolute;
          inset: -40px;
          background: radial-gradient(ellipse 70% 70% at 50% 50%, rgba(180,120,0,0.20), transparent);
          filter: blur(32px);
          pointer-events: none;
          z-index: 0;
        }
        .yt-img-frame {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 480px;
          border: 1px solid rgba(217,168,55,0.22);
          padding: 12px;
          box-sizing: border-box;
        }
        .yt-img-frame img {
          width: 100%;
          height: auto;
          object-fit: contain;
          display: block;
          filter: drop-shadow(0 0 36px rgba(180,120,0,0.28));
        }
        /* corner accents */
        .yt-corner {
          position: absolute;
          width: 20px;
          height: 20px;
          pointer-events: none;
        }
        .yt-corner.tl { top: -1px; left: -1px; border-top: 2px solid rgba(217,168,55,0.7); border-left: 2px solid rgba(217,168,55,0.7); }
        .yt-corner.tr { top: -1px; right: -1px; border-top: 2px solid rgba(217,168,55,0.7); border-right: 2px solid rgba(217,168,55,0.7); }
        .yt-corner.bl { bottom: -1px; left: -1px; border-bottom: 2px solid rgba(217,168,55,0.7); border-left: 2px solid rgba(217,168,55,0.7); }
        .yt-corner.br { bottom: -1px; right: -1px; border-bottom: 2px solid rgba(217,168,55,0.7); border-right: 2px solid rgba(217,168,55,0.7); }

        .yt-live-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 16px;
          border: 1px solid rgba(217,168,55,0.28);
          padding: 8px 20px;
          background: #000;
          position: relative;
          z-index: 1;
        }
        .yt-live-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #f4a918;
          animation: yt-pulse 2s ease-in-out infinite;
        }
        @keyframes yt-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        .yt-live-text {
          font-size: 9px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(217,168,55,0.75);
        }
      `}</style>

      <section className="yt-root" ref={ref}>
        <div className="yt-bg">
          <div className="yt-bg-glow1" />
          <div className="yt-bg-glow2" />
          <div className="yt-bg-dots" />
          <div className="yt-bg-fade" />
        </div>

        <div className="yt-inner">
          {/* ── LEFT ── */}
          <div>
            <motion.div
              className="yt-eyebrow"
              initial={{ opacity: 0, x: -24 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="yt-eyebrow-line" />
              <span className="yt-eyebrow-text">Digital Presence</span>
            </motion.div>

            <motion.h2
              className="yt-heading"
              initial={{ opacity: 0, y: 36 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              A Voice That<br /><em>Moves Millions</em>
            </motion.h2>

            <motion.p
              className="yt-body"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              Sujeet Govindani's YouTube channel is a powerful hub for startup wisdom,
              digital marketing mastery, and motivational strategy trusted by
              entrepreneurs, founders, and growth-seekers worldwide.
            </motion.p>

            <motion.p
              className="yt-body2"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              From zero to 1 Lakh subscribers fuelled purely by value, vision, and the
              relentless pursuit of impact. Every video is a masterclass in execution.
            </motion.p>

            <motion.div
              className="yt-stats-row"
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              {ytStats.map((s, i) => (
                <div key={i}>
                  <span className="yt-stat-val">{s.value}</span>
                  <span className="yt-stat-lbl">{s.label}</span>
                </div>
              ))}
            </motion.div>

            <motion.a
              href="https://www.youtube.com/@Sujeetgovindani"
              className="yt-cta"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              <Youtube size={14} />
              Visit Channel
              <span className="yt-cta-arrow">→</span>
            </motion.a>
          </div>

          {/* ── RIGHT ── */}
          <motion.div
            className="yt-img-wrap"
            initial={{ opacity: 0, x: 48 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="yt-img-glow" />
            <div className="yt-img-frame">
              <div className="yt-corner tl" />
              <div className="yt-corner tr" />
              <div className="yt-corner bl" />
              <div className="yt-corner br" />
              {/* ── replace with your image path ── */}
              <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/YoutubeSilverPlate.webp" alt="Sujeet Govindani YouTube Channel" loading="lazy" decoding="async" />
            </div>

          </motion.div>
        </div>
      </section>
    </>
  );
};

/* ─────────────────────────────────────────────
   SECTION 2 INDIAN BOOK OF RECORDS
───────────────────────────────────────────── */
const IndianBookOfRecordsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  const cards = [
    {
      icon: Medal,
      title: 'Youngest Startup Author',
      desc: 'Recognised as the youngest author to document 101 Startup Ideas in a single volume, setting a national benchmark.',
    },
    {
      icon: BookOpen,
      title: 'Prolific Publisher',
      desc: 'Certified for publishing 25+ books on digital marketing and business growth an unprecedented feat at his age.',
    },
    {
      icon: Star,
      title: 'National Distinction',
      desc: 'Inducted into the Indian Book of Records for extraordinary contributions to the knowledge and startup ecosystem.',
    },
  ];

  return (
    <>
      <style>{`
        .ibr-root {
          position: relative;
          padding: 60px 48px 100px;
          overflow: hidden;
          background: linear-gradient(180deg, #000 0%, #0c0800 50%, #000 100%);
          font-family: 'Libre Baskerville', serif;
        }

        /* bg */
        .ibr-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        .ibr-bg-top {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 50% at 50% 0%, rgba(180,120,0,0.13), transparent);
        }
        .ibr-bg-hatch {
          position: absolute;
          inset: 0;
          opacity: 0.025;
          background-image: repeating-linear-gradient(
            45deg, #d4af37 0, #d4af37 1px, transparent 0, transparent 50%
          );
          background-size: 24px 24px;
        }
        .ibr-bg-fade {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, #000 0%, transparent 12%, transparent 88%, #000 100%);
        }

        .ibr-inner {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
        }

        /* header */
        .ibr-header {
          text-align: center;
          margin-bottom: 64px;
        }
        .ibr-icon-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }
        .ibr-icon-box {
          position: relative;
          display: inline-flex;
          border: 1px solid rgba(217,168,55,0.28);
          padding: 16px;
          background: rgba(217,168,55,0.04);
        }
        .ibr-icon-glow {
          position: absolute;
          inset: -16px;
          background: radial-gradient(ellipse 80% 80% at 50% 50%, rgba(180,120,0,0.22), transparent);
          filter: blur(20px);
          border-radius: 50%;
          pointer-events: none;
        }
        .ibr-eyebrow-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-bottom: 20px;
        }
        .ibr-eyebrow-line {
          height: 1px;
          width: 48px;
          background: linear-gradient(90deg, transparent, rgba(217,168,55,0.5));
        }
        .ibr-eyebrow-line.rev {
          background: linear-gradient(270deg, transparent, rgba(217,168,55,0.5));
        }
        .ibr-eyebrow-text {
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(217,168,55,0.60);
        }
        .ibr-h2 {
          font-size: clamp(38px, 6vw, 70px);
          font-weight: 300;
          line-height: 1.08;
          letter-spacing: -0.02em;
          margin-bottom: 20px;
        }
        .ibr-h2 .white { color: #fff; display: block; margin-bottom: 4px; }
        .ibr-h2 .gold {
          display: block;
          background: linear-gradient(135deg, #ffe08a, #f4a918, #c47d00);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .ibr-subtitle {
          font-size: 15px;
          line-height: 1.85;
          color: rgba(255,255,255,0.42);
          max-width: 580px;
          margin: 0 auto;
        }

        /* 3-col layout */
        .ibr-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr 1fr;
          gap: 24px;
          align-items: center;
          margin-bottom: 56px;
        }
        @media (max-width: 960px) {
          .ibr-root { padding: 72px 28px; }
          .ibr-grid { grid-template-columns: 1fr; }
        }

        /* left / right cards */
        .ibr-card {
          position: relative;
          border: 1px solid rgba(217,168,55,0.18);
          background: linear-gradient(160deg, rgba(40,28,0,0.35), rgba(0,0,0,0.5));
          padding: 28px 24px;
          overflow: hidden;
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), border-color 0.4s ease;
          cursor: default;
        }
        .ibr-card:hover {
          transform: translateY(-6px);
          border-color: rgba(217,168,55,0.35);
        }
        .ibr-card-top-line {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(217,168,55,0.5), transparent);
        }
        .ibr-card-bot-line {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(217,168,55,0.25), transparent);
        }
        .ibr-card-icon {
          display: inline-flex;
          border: 1px solid rgba(217,168,55,0.22);
          background: rgba(217,168,55,0.04);
          padding: 10px;
          margin-bottom: 14px;
          transition: background 0.4s ease;
        }
        .ibr-card:hover .ibr-card-icon {
          background: rgba(217,168,55,0.10);
        }
        .ibr-card-title {
          font-size: 16px;
          font-weight: 400;
          color: #fff;
          margin-bottom: 10px;
          line-height: 1.35;
        }
        .ibr-card-desc {
          font-size: 13px;
          line-height: 1.85;
          color: rgba(255,255,255,0.4);
        }

        /* right stacked cards */
        .ibr-right-stack {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .ibr-card-sm { padding: 22px 20px; }

        /* centre image */
        .ibr-centre {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .ibr-centre-glow {
          position: absolute;
          inset: -40px;
          background: radial-gradient(ellipse 80% 80% at 50% 50%, rgba(180,120,0,0.20), transparent);
          filter: blur(28px);
          pointer-events: none;
          z-index: 0;
        }
        .ibr-centre-frame {
          position: relative;
          z-index: 1;
          width: 100%;
          border: 1px solid rgba(217,168,55,0.24);
          padding: 8px;
          box-sizing: border-box;
        }
        .ibr-centre-inner {
          border: 1px solid rgba(217,168,55,0.12);
          padding: 6px;
        }
        .ibr-centre-img {
          width: 100%;
          height: auto;
          object-fit: contain;
          display: block;
          filter: drop-shadow(0 0 28px rgba(180,120,0,0.32));
        }
        .ibr-badge {
          position: relative;
          z-index: 1;
          margin-top: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          border: 1px solid rgba(217,168,55,0.28);
          padding: 8px 18px;
          background: #000;
        }
        .ibr-badge-diamond {
          width: 7px;
          height: 7px;
          transform: rotate(45deg);
          background: #f4a918;
          flex-shrink: 0;
        }
        .ibr-badge-text {
          font-size: 9px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(217,168,55,0.78);
        }

        /* bottom divider */
        .ibr-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }
        .ibr-div-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(217,168,55,0.20));
        }
        .ibr-div-line.rev {
          background: linear-gradient(270deg, transparent, rgba(217,168,55,0.20));
        }
        .ibr-div-gems { display: flex; gap: 8px; }
        .ibr-gem {
          width: 7px; height: 7px;
          transform: rotate(45deg);
          background: rgba(217,168,55,0.35);
        }
        .ibr-gem.mid { background: rgba(217,168,55,0.60); width: 9px; height: 9px; }
      `}</style>

      <section className="ibr-root" ref={ref}>
        <div className="ibr-bg">
          <div className="ibr-bg-top" />
          <div className="ibr-bg-hatch" />
          <div className="ibr-bg-fade" />
        </div>

        <div className="ibr-inner">
          {/* header */}
          <motion.div
            className="ibr-header"
            initial={{ opacity: 0, y: 36 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="ibr-icon-wrap"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.15, duration: 0.7, type: 'spring', stiffness: 200 }}
            >
              <div className="ibr-icon-box">
                <div className="ibr-icon-glow" />
                <BookOpen size={40} color="#d4a017" style={{ position: 'relative', zIndex: 1 }} />
              </div>
            </motion.div>

            <motion.div
              className="ibr-eyebrow-row"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <div className="ibr-eyebrow-line" />
              <span className="ibr-eyebrow-text">National Recognition</span>
              <div className="ibr-eyebrow-line rev" />
            </motion.div>

            <motion.h2
              className="ibr-h2"
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.9 }}
            >
              <span className="white">Indian Book</span>
              <span className="gold">of Records</span>
            </motion.h2>

            <motion.p
              className="ibr-subtitle"
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.55, duration: 0.8 }}
            >
              Beyond global records, Sujeet Govindani stands honoured by India's own
              hall of extraordinary achievers a testament to national-level excellence.
            </motion.p>
          </motion.div>

          {/* 3-col grid */}
          <div className="ibr-grid">

            {/* LEFT card */}
            <motion.div
              className="ibr-card"
              initial={{ opacity: 0, x: -48 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.7, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="ibr-card-top-line" />
              <div className="ibr-card-icon">
                <Medal size={24} color="#d4a017" />
              </div>
              <div className="ibr-card-title">{cards[0].title}</div>
              <div className="ibr-card-desc">{cards[0].desc}</div>
              <div className="ibr-card-bot-line" />
            </motion.div>

            {/* CENTRE image */}
            <motion.div
              className="ibr-centre"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="ibr-centre-glow" />
              <div className="ibr-centre-frame">
                <div className="ibr-centre-inner">
                  {/* ── replace with your image path ── */}
                  <img
                    className="ibr-centre-img"
                    src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Book12.webp"
                    alt="Indian Book of Records Sujeet Govindani"
                  />
                </div>
              </div>
              <motion.div
                className="ibr-badge"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.1, duration: 0.5 }}
              >
                <div className="ibr-badge-diamond" />
                <span className="ibr-badge-text">Certified Achievement</span>
                <div className="ibr-badge-diamond" />
              </motion.div>
            </motion.div>

            {/* RIGHT stacked cards */}
            <div className="ibr-right-stack">
              {cards.slice(1).map((c, i) => {
                const Icon = c.icon;
                return (
                  <motion.div
                    key={i}
                    className="ibr-card ibr-card-sm"
                    initial={{ opacity: 0, x: 48 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.75 + i * 0.15, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="ibr-card-top-line" />
                    <div className="ibr-card-icon">
                      <Icon size={20} color="#d4a017" />
                    </div>
                    <div className="ibr-card-title">{c.title}</div>
                    <div className="ibr-card-desc">{c.desc}</div>
                    <div className="ibr-card-bot-line" />
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* divider */}
          <motion.div
            className="ibr-divider"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.4, duration: 1 }}
          >
            <div className="ibr-div-line" />
            <div className="ibr-div-gems">
              <div className="ibr-gem" />
              <div className="ibr-gem mid" />
              <div className="ibr-gem" />
            </div>
            <div className="ibr-div-line rev" />
          </motion.div>
        </div>
      </section>
    </>
  );
};

/* ─────────────────────────────────────────────
   SECTION 3 IMPACT  (original, fully intact)
───────────────────────────────────────────── */
const impacts = [
  {
    icon: Target,
    title: "Performance Marketing",
    description: "Directly generated for clients across NGOs, e-commerce, and enterprise growth programs",
    value: 48,
    suffix: "Cr+",
    metric: "Revenue Generated",
    detail: "Strategic campaigns delivering measurable ROI"
  },
  {
    icon: Award,
    title: "Client Profit Impact",
    description: "Transformational outcomes for brands practicing his frameworks",
    value: 25,
    suffix: "Cr+",
    metric: "Client Success",
    detail: "Proven methodologies creating lasting value"
  },
  {
    icon: Building,
    title: "Real Estate Revenue",
    description: "Property revenue unlocked across Pune, Bengaluru, Mumbai, Bhopal & 15+ cities",
    value: 100,
    suffix: "Cr+",
    metric: "Market Value",
    detail: "Pan-India property portfolio development"
  },
];

const CountUp = ({ end, duration = 2, isInView }: { end: number; duration?: number; isInView: boolean }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    let animationFrame: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);
      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isInView]);
  return <span>{count}</span>;
};

const AnimatedBorder = ({ delay = 0 }: { delay?: number }) => (
  <>
    <motion.div className="abs-border-t" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '1px', background: 'linear-gradient(90deg,transparent,rgba(180,120,0,0.5),transparent)' }} />
    <motion.div className="abs-border-b" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 1.2, delay: delay + 0.2, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '1px', background: 'linear-gradient(90deg,transparent,rgba(180,120,0,0.5),transparent)' }} />
    <motion.div className="abs-border-l" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} transition={{ duration: 1.2, delay: delay + 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: 'absolute', top: 0, left: 0, width: '1px', height: '100%', background: 'linear-gradient(180deg,transparent,rgba(180,120,0,0.5),transparent)' }} />
    <motion.div className="abs-border-r" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} transition={{ duration: 1.2, delay: delay + 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: 'absolute', top: 0, right: 0, width: '1px', height: '100%', background: 'linear-gradient(180deg,transparent,rgba(180,120,0,0.5),transparent)' }} />
  </>
);

const ImpactSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <>
      <style>{`
        .impact-section {
          position: relative;
          padding: 40px 24px 80px;
          overflow: hidden;
          background: #000;
          font-family: 'Libre Baskerville', serif;
        }
        .impact-bg-texture {
          position: absolute;
          inset: 0;
          opacity: 0.03;
        }
        .impact-bg-fade {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, #000, transparent, #000);
        }
        .impact-inner {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
        }
        .impact-header {
          text-align: center;
          margin-bottom: 48px;
        }
        .impact-crown-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: 16px;
        }
        .impact-crown-glow {
          position: absolute;
          inset: 0;
          background: rgba(180,120,0,0.20);
          filter: blur(16px);
          border-radius: 50%;
        }
        .impact-h2 {
          font-size: clamp(38px, 6vw, 68px);
          font-weight: 300;
          line-height: 1.1;
          margin-bottom: 16px;
          letter-spacing: -0.02em;
        }
        .impact-h2 .white { color: #fff; display: block; }
        .impact-h2 .gold {
          display: block;
          background: linear-gradient(135deg, #ffe08a, #f4a918, #c47d00);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .impact-div-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-bottom: 16px;
        }
        .impact-div-line {
          height: 1px;
          width: 64px;
          background: linear-gradient(90deg, transparent, rgba(180,120,0,0.5));
        }
        .impact-div-line.rev { background: linear-gradient(270deg, transparent, rgba(180,120,0,0.5)); }
        .impact-div-diamond {
          width: 6px; height: 6px;
          transform: rotate(45deg);
          background: rgba(180,120,0,0.5);
        }
        .impact-subtitle {
          font-size: 16px;
          line-height: 1.85;
          color: rgba(255,255,255,0.42);
          max-width: 600px;
          margin: 0 auto;
        }
        .impact-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 900px) {
          .impact-cards-grid { grid-template-columns: 1fr; }
        }
        .impact-card-inner {
          position: relative;
          height: 100%;
          background: linear-gradient(160deg, rgba(30,20,0,0.5), rgba(0,0,0,0.5));
          overflow: hidden;
          padding: 32px;
          box-sizing: border-box;
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .impact-card-inner:hover { transform: translateY(-8px); }
        .impact-icon-box {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 56px; height: 56px;
          border: 1px solid rgba(180,120,0,0.30);
          background: rgba(180,120,0,0.05);
          margin-bottom: 24px;
          transition: background 0.5s ease;
        }
        .impact-card-inner:hover .impact-icon-box { background: rgba(180,120,0,0.12); }
        .impact-metric-label {
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(180,120,0,0.60);
          margin-bottom: 10px;
        }
        .impact-value-row {
          display: flex;
          align-items: baseline;
          gap: 6px;
          margin-bottom: 8px;
        }
        .impact-value-num {
          font-size: clamp(44px, 6vw, 60px);
          font-weight: 300;
          color: #fff;
          line-height: 1;
          letter-spacing: -0.02em;
        }
        .impact-value-suf {
          font-size: 28px;
          font-weight: 300;
          color: #f4a918;
          line-height: 1;
        }
        .impact-card-title {
          font-size: 17px;
          color: #fff;
          font-weight: 400;
          margin-bottom: 10px;
          line-height: 1.35;
        }
        .impact-card-detail {
          font-size: 12px;
          color: rgba(180,120,0,0.75);
          font-style: italic;
          margin-bottom: 14px;
          line-height: 1.7;
        }
        .impact-card-desc {
          font-size: 13px;
          color: rgba(255,255,255,0.40);
          line-height: 1.85;
        }
        .impact-ornament {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 48px;
        }
        .impact-orn-gem {
          width: 7px; height: 7px;
          transform: rotate(45deg);
          background: rgba(180,120,0,0.30);
        }
        .impact-orn-gem.lg { width: 9px; height: 9px; background: rgba(180,120,0,0.50); }
        .impact-orn-gem.sm { width: 5px; height: 5px; background: rgba(180,120,0,0.40); }
      `}</style>

      <section ref={sectionRef} className="impact-section">
        <motion.div className="impact-bg-texture" style={{ y: backgroundY }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(255,215,0,0.05), transparent)' }} />
        </motion.div>
        <div className="impact-bg-fade" />

        <div className="impact-inner">
          {/* header */}
          <motion.div className="impact-header" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 1 }}>
            <motion.div className="impact-crown-wrap" initial={{ opacity: 0, y: -20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
              <div style={{ position: 'relative' }}>
                <motion.div
                  className="impact-crown-glow"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
                <Crown size={48} color="#c47d00" style={{ position: 'relative', zIndex: 1 }} />
              </div>
            </motion.div>

            <motion.h2 className="impact-h2" initial={{ opacity: 0, y: 28 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.4 }}>
              <span className="white">Proven</span>
              <span className="gold">Excellence</span>
            </motion.h2>

            <motion.div className="impact-div-row" initial={{ opacity: 0, scaleX: 0 }} animate={isInView ? { opacity: 1, scaleX: 1 } : {}} transition={{ duration: 1, delay: 0.6 }}>
              <div className="impact-div-line" />
              <div className="impact-div-diamond" />
              <div className="impact-div-line rev" />
            </motion.div>

            <motion.p className="impact-subtitle" initial={{ opacity: 0, y: 18 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.8 }}>
              A distinguished legacy of measurable impact, unwavering commitment,
              and transformational results across diverse markets
            </motion.p>
          </motion.div>

          {/* cards */}
          <div className="impact-cards-grid">
            {impacts.map((impact, index) => {
              const Icon = impact.icon;
              return (
                <motion.div
                  key={index}
                  style={{ position: 'relative' }}
                  initial={{ opacity: 0, y: 60 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 1, delay: 1 + index * 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="impact-card-inner">
                    <AnimatedBorder delay={1.2 + index * 0.2} />
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={isInView ? { scale: 1, rotate: 0 } : {}}
                      transition={{ duration: 0.8, delay: 1.4 + index * 0.2, type: 'spring', stiffness: 200 }}
                    >
                      <div className="impact-icon-box">
                        <Icon size={28} color="#c47d00" />
                      </div>
                    </motion.div>
                    <motion.div className="impact-metric-label" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 1.6 + index * 0.2 }}>
                      {impact.metric}
                    </motion.div>
                    <motion.div className="impact-value-row" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 1.7 + index * 0.2 }}>
                      <span className="impact-value-num">₹<CountUp end={impact.value} isInView={isInView} /></span>
                      <span className="impact-value-suf">{impact.suffix}</span>
                    </motion.div>
                    <motion.h3 className="impact-card-title" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 1.8 + index * 0.2 }}>
                      {impact.title}
                    </motion.h3>
                    <motion.p className="impact-card-detail" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 1.9 + index * 0.2 }}>
                      {impact.detail}
                    </motion.p>
                    <motion.p className="impact-card-desc" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 2 + index * 0.2 }}>
                      {impact.description}
                    </motion.p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ornament */}
          <motion.div className="impact-ornament" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 2.8, duration: 1 }}>
            <div className="impact-orn-gem" />
            <div className="impact-orn-gem sm" />
            <div className="impact-orn-gem lg" />
            <div className="impact-orn-gem sm" />
            <div className="impact-orn-gem" />
          </motion.div>
        </div>
      </section>
    </>
  );
};

/* ─────────────────────────────────────────────
   ROOT EXPORT
───────────────────────────────────────────── */
const AllSections = () => (
  <>
    <YoutubeShowcaseSection />
    <IndianBookOfRecordsSection />
    <ImpactSection />
  </>
);

export default AllSections;