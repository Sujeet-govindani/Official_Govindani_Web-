// @ts-nocheck
'use client';

import React, { useRef, useState, useCallback } from 'react';

const NgoVideoIntroSection: React.FC<{ videoUrl?: string; logoUrl?: string }> = ({
  videoUrl = 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/IntroVideo/NGO2.mp4',
  logoUrl = 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Official-Logo.webp'
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMuteToggle = useCallback(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (isMuted) {
      vid.muted = false;
      vid.currentTime = 0;
      vid.play();
      setIsMuted(false);
      setIsPlaying(true);
    } else {
      vid.muted = true;
      setIsMuted(true);
    }
  }, [isMuted]);

  return (
    <>
      <style>{`

        @keyframes shimmer-line {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes float-orb {
          0%, 100% { transform: translateY(0px) scale(1); }
          50%       { transform: translateY(-18px) scale(1.04); }
        }
        @keyframes badge-glow {
          0%, 100% { box-shadow: 0 0 12px rgba(212,175,55,.25), 0 4px 24px rgba(0,0,0,.6); }
          100%      { box-shadow: 0 0 28px rgba(212,175,55,.5),  0 4px 24px rgba(0,0,0,.6); }
        }
        @keyframes corner-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(212,175,55,0.55), 0 2px 12px rgba(0,0,0,.7); }
          50%       { box-shadow: 0 0 0 6px rgba(212,175,55,0.0), 0 2px 12px rgba(0,0,0,.7); }
        }

        .founder-shimmer-title {
          background: linear-gradient(90deg, #B8960F 0%, #D4AF37 30%, #F9E97B 50%, #D4AF37 70%, #B8960F 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer-line 4s linear infinite;
          padding: 0.15em 0; /* Added padding to prevent clipping of descenders */
        }
        .founder-orb-left {
          position: absolute; width: 380px; height: 380px; border-radius: 50%;
          background: radial-gradient(circle, rgba(212,175,55,0.13) 0%, rgba(212,175,55,0.04) 50%, transparent 72%);
          top: -60px; left: -80px; pointer-events: none;
          animation: float-orb 7s ease-in-out infinite;
        }
        .founder-orb-right {
          position: absolute; width: 340px; height: 340px; border-radius: 50%;
          background: radial-gradient(circle, rgba(212,175,55,0.10) 0%, rgba(212,175,55,0.03) 50%, transparent 72%);
          bottom: -40px; right: -60px; pointer-events: none;
          animation: float-orb 9s ease-in-out infinite reverse;
        }
        .founder-orb-center {
          position: absolute; width: 600px; height: 250px; border-radius: 50%;
          background: radial-gradient(ellipse, rgba(212,175,55,0.07) 0%, transparent 70%);
          top: 50%; left: 50%; transform: translate(-50%, -50%); pointer-events: none;
        }
        .founder-pill-badge {
          animation: badge-glow 3s ease-in-out infinite;
        }
        .video-section-wrap { margin: 0 !important; padding: 0 !important; display: block !important; }
        .founder-grain {
          position: absolute; inset: 0;
          background-image: repeating-linear-gradient(45deg, rgba(212,175,55,0.015) 0px, rgba(212,175,55,0.015) 1px, transparent 1px, transparent 12px);
          pointer-events: none; z-index: 0;
        }
        .gold-separator {
          width: 100%; height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(212,175,55,.18) 20%, rgba(212,175,55,.45) 50%, rgba(212,175,55,.18) 80%, transparent 100%);
        }

        /* ── Mute button top-right corner of video ── */
        .corner-mute-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: linear-gradient(145deg, rgba(212,175,55,0.22) 0%, rgba(5,4,1,0.92) 100%);
          border: 1.5px solid rgba(212,175,55,0.58);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          transition: transform .22s cubic-bezier(.34,1.56,.64,1), box-shadow .22s ease;
          animation: corner-pulse 2.4s ease-in-out infinite;
        }
        .corner-mute-btn:hover {
          transform: scale(1.16) !important;
          box-shadow: 0 0 30px rgba(212,175,55,.8), 0 4px 20px rgba(0,0,0,.7) !important;
          animation: none;
        }
        .corner-mute-btn.is-playing {
          animation: none;
          box-shadow: 0 0 16px rgba(212,175,55,.35), 0 4px 20px rgba(0,0,0,.7);
        }

        /* ── Pill desktop: absolute bottom overlap (original) ── */
        .founder-pill-outer {
          position: absolute;
          bottom: -28px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 20;
        }

        /* ── Mobile overrides ── */
        @media (max-width: 768px) {
          .video-section-wrap {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
          }
          .video-section-inner {
            padding-top: clamp(1rem, 3vw, 1.5rem) !important;
            padding-bottom: clamp(1rem, 3vw, 1.5rem) !important;
          }

          /* Button: fully clickable/tappable on mobile */
          .corner-mute-btn {
            width: 44px;
            height: 44px;
            min-width: 44px;
            min-height: 44px;
            top: 8px;
            right: 8px;
            border-width: 1.5px;
            z-index: 9999 !important;
            pointer-events: auto !important;
            touch-action: manipulation;
            -webkit-tap-highlight-color: rgba(212,175,55,0.2);
            cursor: pointer;
            position: absolute !important;
          }
          .corner-mute-btn svg {
            width: 18px !important;
            height: 18px !important;
            pointer-events: none;
          }

          /* Pill: pull OUT of absolute overlap, render as normal flow below video */
          .founder-pill-outer {
            position: relative;
            bottom: auto;
            left: auto;
            transform: none;
            display: flex;
            justify-content: center;
            margin-top: 14px;
          }
          .founder-pill-badge {
            padding: 0.38rem 0.9rem 0.38rem 0.5rem !important;
            gap: 0.5rem !important;
          }
          .pill-avatar {
            width: 26px !important;
            height: 26px !important;
            font-size: 0.6rem !important;
          }
          .pill-name {
            font-size: 0.72rem !important;
          }
          .pill-role {
            font-size: 0.58rem !important;
          }
        }
      `}</style>

      <section id="intro" style={s.section} className="video-section-wrap">
        <div className="gold-separator" />

        <div style={{ position: 'relative', width: '100%', maxWidth: 1200, margin: '0 auto' }} className="video-section-inner">
          <div className="founder-grain" />
          <div className="founder-orb-left" />
          <div className="founder-orb-right" />
          <div className="founder-orb-center" />

          {/* Header */}
          <div style={s.header}>
            <div style={s.eyebrow}>
              <span style={{ ...s.eyebrowText, marginTop: "100px" }}></span>
            </div>
            <h2 className="founder-shimmer-title" style={s.title}>The Journey of Change</h2>
            <p style={s.subtitle}>Driven by purpose, powered by humanity</p>
            <div style={s.ornament}>
              <span style={s.ornLine} />
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="rgba(212,175,55,0.5)" />
              </svg>
              <span style={s.ornLine} />
            </div>
          </div>

          {/* Video + Pill wrapper flex column on mobile so pill flows below */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 'min(72vw, 860px)', position: 'relative', zIndex: 1 }}>

              {/* Video frame */}
              <div style={{ position: 'relative', width: '100%' }}>
                <div style={s.ambientRing} />
                <div style={s.frame}>
                  <div style={s.inner}>

                    <video
                      ref={videoRef}
                      src={videoUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                      style={s.videoEl}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                    />

                    {isMuted && <div style={s.overlay} />}

                    {/* Mute button top-right, always above video content */}
                    <button
                      onClick={handleMuteToggle}
                      className={`corner-mute-btn${!isMuted ? ' is-playing' : ''}`}
                      aria-label={isMuted ? 'Unmute and play from start' : 'Mute video'}
                    >
                      {isMuted ? (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 5L6 9H2v6h4l5 4V5z" />
                          <line x1="23" y1="9" x2="17" y2="15" />
                          <line x1="17" y1="9" x2="23" y2="15" />
                        </svg>
                      ) : (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 5L6 9H2v6h4l5 4V5z" />
                          <path d="M19.07 4.93a10 10 0 010 14.14" />
                          <path d="M15.54 8.46a5 5 0 010 7.07" />
                        </svg>
                      )}
                    </button>

                  </div>
                </div>
              </div>

              {/* Founder pill absolute on desktop, flows below on mobile */}
              <div className="founder-pill-outer">
                <div style={s.pill} className="founder-pill-badge">
                  {logoUrl ? (
                    <img
                      src={logoUrl}
                      alt="Logo"
                      className="pill-avatar"
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        objectFit: 'contain',
                        background: 'linear-gradient(135deg, #1a1000 0%, #0d0900 100%)',
                        border: '1.5px solid rgba(212,175,55,0.45)',
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,.10)',
                        flexShrink: 0,
                        display: 'block',
                      }}
                    />
                  ) : (
                    <div style={s.avatar} className="pill-avatar">SG</div>
                  )}
                  <div style={s.pillTextWrap}>
                    <span style={s.pillName} className="pill-name">Sujeet Govindani</span>
                    <span style={s.pillRole} className="pill-role">Founder Govindani Infotech Pvt Ltd</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Footer */}
          <div style={s.footer}>
            <span style={s.fLine} />
            <p style={s.footerTxt}>  ·  </p>
            <span style={s.fLine} />
          </div>
        </div>

        <div className="gold-separator" />
      </section>
    </>
  );
};

const s: Record<string, React.CSSProperties> = {
  section: {
    background: `
      radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,175,55,0.10) 0%, transparent 55%),
      radial-gradient(ellipse 60% 40% at 80% 100%, rgba(180,140,30,0.08) 0%, transparent 55%),
      radial-gradient(ellipse 50% 35% at 10% 80%, rgba(212,175,55,0.06) 0%, transparent 55%),
      linear-gradient(180deg, #0a0800 0%, #050400 40%, #080600 70%, #0a0800 100%)
    `,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    margin: 0,
    padding: 'clamp(2.5rem, 4vw, 5rem) 1.5rem clamp(3rem, 5vw, 6rem)',
    boxSizing: 'border-box',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '.85rem',
    marginBottom: 'clamp(1.8rem, 3vw, 3.5rem)',
    marginTop: 0,
    zIndex: 11,
    position: 'relative',
  },
  eyebrow: { display: 'flex', alignItems: 'center', gap: '0.6rem' },
  eyebrowDot: {
    display: 'inline-block', width: 5, height: 5, borderRadius: '50%',
    background: 'rgba(212,175,55,0.6)',
  },
  eyebrowText: {
    color: 'rgba(212,175,55,0.65)', fontSize: 'clamp(0.65rem, 1vw, 0.78rem)',
    letterSpacing: '.28em', textTransform: 'uppercase' as const,
    fontFamily: 'system-ui, sans-serif', fontWeight: 500,
  },
  title: {
    fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', fontWeight: 700, letterSpacing: '.04em', margin: 0,
    fontFamily: '"Libre Baskerville", Georgia, serif', textAlign: 'center', lineHeight: 1.4,
    padding: '0.15em 0',
  },
  subtitle: {
    color: 'rgba(255,248,231,0.52)', fontSize: 'clamp(.85rem, 1.4vw, 1rem)', margin: 0,
    letterSpacing: '.1em', textAlign: 'center', fontFamily: 'system-ui, sans-serif', fontStyle: 'italic',
    lineHeight: 1.5,
    padding: '0.1em 0',
  },
  ornament: { display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '.1rem' },
  ornLine: {
    display: 'block', width: 48, height: 1,
    background: 'linear-gradient(90deg, transparent, rgba(212,175,55,.45), transparent)',
  },
  ambientRing: {
    position: 'absolute', inset: -24, borderRadius: 28,
    background: 'transparent',
    boxShadow: `
      0 0 0 1.5px rgba(212,175,55,0.12),
      0 0 400px rgba(212,175,55,0.18),
      0 0 600px rgba(212,175,55,0.10),
      0 0 400px rgba(212,175,55,0.06),
      0 60px 300px rgba(0,0,0,0.9)
    `,
    pointerEvents: 'none', zIndex: 0,
  },
  frame: {
    position: 'relative', borderRadius: 20, overflow: 'hidden',
    border: '1px solid rgba(212,175,55,0.30)',
    boxShadow: `
      0 0 0 1px rgba(212,175,55,0.06),
      0 0 60px rgba(212,175,55,0.20),
      0 0 120px rgba(212,175,55,0.10),
      0 30px 80px rgba(0,0,0,0.90),
      inset 0 1px 0 rgba(212,175,55,0.10)
    `,
    zIndex: 1,
  },
  inner: {
    position: 'relative', width: '100%', aspectRatio: '16/9',
    overflow: 'hidden', background: '#080601', WebkitTapHighlightColor: 'transparent',
  },
  videoEl: {
    position: 'absolute',
    top: 0, left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  overlay: {
    position: 'absolute', inset: 0,
    background: 'linear-gradient(160deg, rgba(0,0,0,0.28) 0%, rgba(10,8,2,0.20) 100%)',
    zIndex: 5, transition: 'opacity 0.4s ease',
    pointerEvents: 'none',
  },
  pill: {
    display: 'flex', alignItems: 'center', gap: '0.75rem',
    background: 'linear-gradient(135deg, rgba(28,18,4,0.97) 0%, rgba(14,10,2,0.99) 100%)',
    border: '1px solid rgba(212,175,55,.42)', borderRadius: 999,
    padding: '0.55rem 1.5rem 0.55rem 0.75rem', whiteSpace: 'nowrap',
  },
  avatar: {
    width: 36, height: 36, borderRadius: '50%',
    background: 'linear-gradient(135deg, #D4AF37 0%, #9A7B10 100%)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '0.72rem', fontWeight: 700, color: '#1a1000',
    fontFamily: 'system-ui, sans-serif', flexShrink: 0, letterSpacing: '.04em',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,.15)',
  },
  pillTextWrap: { display: 'flex', flexDirection: 'column', gap: '0.1rem' },
  pillName: {
    color: '#D4AF37', fontSize: 'clamp(0.75rem, 1.1vw, 0.9rem)', fontWeight: 700,
    fontFamily: '"Libre Baskerville", Georgia, serif', letterSpacing: '.03em', lineHeight: 1.2,
  },
  pillRole: {
    color: 'rgba(255,248,231,0.55)', fontSize: 'clamp(0.62rem, 0.9vw, 0.74rem)',
    fontFamily: 'system-ui, sans-serif', letterSpacing: '.05em', lineHeight: 1.2,
  },
  footer: {
    display: 'flex', alignItems: 'center', gap: '1rem',
    marginTop: 'clamp(2.8rem, 4vw, 4.5rem)', zIndex: 1, position: 'relative',
  },
  fLine: {
    width: 44, height: 1, display: 'block',
    background: 'linear-gradient(90deg, transparent, rgba(212,175,55,.28), transparent)',
  },
  footerTxt: {
    color: 'rgba(212,175,55,0.38)', fontSize: '.72rem', letterSpacing: '.22em',
    textTransform: 'uppercase' as const, margin: 0,
    fontFamily: 'system-ui, sans-serif', whiteSpace: 'nowrap',
  },
};

export default NgoVideoIntroSection;