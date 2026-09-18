'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';

const extractVideoId = (url: string): string => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return url;
};

const NGOVideoIntro: React.FC<{ videoUrl?: string }> = ({
  videoUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
}) => {
  const videoId = extractVideoId(videoUrl);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [apiReady, setApiReady] = useState(false);

  useEffect(() => {
    const w = window as any;
    if (w.YT && w.YT.Player) { setApiReady(true); return; }
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    tag.async = true;
    document.head.appendChild(tag);
    w.onYouTubeIframeAPIReady = () => setApiReady(true);
    return () => { delete w.onYouTubeIframeAPIReady; };
  }, []);

  useEffect(() => {
    if (!apiReady || !containerRef.current) return;
    const w = window as any;
    const playerDiv = document.createElement('div');
    const playerId = `yt-p-${Date.now()}`;
    playerDiv.id = playerId;
    containerRef.current.appendChild(playerDiv);
    playerRef.current = new w.YT.Player(playerId, {
      videoId,
      width: '100%',
      height: '100%',
      playerVars: {
        autoplay: 0, controls: 0, modestbranding: 1,
        rel: 0, showinfo: 0, fs: 0, iv_load_policy: 3,
        disablekb: 1, playsinline: 1,
      },
      events: {
        onReady: (e: any) => { e.target.mute(); },
        onStateChange: (e: any) => {
          const YTP = w.YT.PlayerState;
          if (e.data === YTP.PLAYING) setIsPlaying(true);
          else if (e.data === YTP.PAUSED || e.data === YTP.ENDED) setIsPlaying(false);
        },
      },
    });
    return () => {
      if (playerRef.current) { playerRef.current.destroy(); playerRef.current = null; }
    };
  }, [apiReady, videoId]);

  const handlePlay = useCallback(() => {
    if (!playerRef.current) return;
    playerRef.current.playVideo();
    setIsPlaying(true);
  }, []);

  const handleMuteToggle = useCallback(() => {
    if (!playerRef.current) return;
    if (isMuted) { playerRef.current.unMute(); setIsMuted(false); }
    else { playerRef.current.mute(); setIsMuted(true); }
  }, [isMuted]);

  return (
    <>
      <style>{`
        @keyframes pulse-ring {
          0%   { transform: translate(-50%,-50%) scale(1);   opacity:.6; }
          70%  { transform: translate(-50%,-50%) scale(1.6); opacity:0;  }
          100% { transform: translate(-50%,-50%) scale(1.6); opacity:0;  }
        }
        .pulse-ring {
          position: absolute; top: 50%; left: 50%;
          width: 88px; height: 88px; border-radius: 50%;
          border: 2px solid #D4AF37;
          pointer-events: none;
          animation: pulse-ring 2s ease-out infinite;
        }
        .pulse-ring.d2 { animation-delay: .65s; }
        .pulse-ring.d3 { animation-delay: 1.3s; }

        .video-section-wrap {
          margin: 20px 0 !important;
          padding: 0 !important;
          display: block !important;
        }
        .video-section-wrap section {
          margin-top: 0 !important;
          margin-bottom: 0 !important;
          padding-top: 1.5rem !important;
          padding-bottom: 1.5rem !important;
        }
      `}</style>

      <div className="video-section-wrap">
        <section style={s.section}>

          {/*
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SVG MERGE GRADIENT replaces the old CSS div
            Mimics the screenshot: the section above has a
            warm tan/beige foggy texture that already fades
            to near-black at its bottom edge.
            This SVG continues that fade:
              • very top  → fully transparent (blends into above)
              • mid zone  → soft semi-transparent black haze
              • bottom    → solid #000 (matches section bg)
            The feGaussianBlur filter adds the "blurry fog"
            look seen in the highlighted area.
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          */}
          <div style={s.mergeGradientWrap}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
              style={{ display: 'block', width: '100%', height: '100%' }}
            >
              <defs>
                {/* Vertical gradient: transparent → black */}
                <linearGradient id="mgGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="#000" stopOpacity="0"   />
                  <stop offset="30%"  stopColor="#000" stopOpacity="0.08"/>
                  <stop offset="55%"  stopColor="#000" stopOpacity="0.35"/>
                  <stop offset="75%"  stopColor="#000" stopOpacity="0.72"/>
                  <stop offset="100%" stopColor="#000" stopOpacity="1"   />
                </linearGradient>

                {/* Blur filter for the soft foggy haze in the upper portion */}
                <filter id="mgBlur" x="0%" y="0%" width="100%" height="100%">
                  <feGaussianBlur stdDeviation="0 18" />
                </filter>

                {/* Clip so blur doesn't spill outside */}
                <clipPath id="mgClip">
                  <rect x="0" y="0" width="1440" height="320" />
                </clipPath>
              </defs>

              {/* Blurred haze layer only in upper 60% */}
              <rect
                x="0" y="0" width="1440" height="195"
                fill="black"
                fillOpacity="0.28"
                filter="url(#mgBlur)"
                clipPath="url(#mgClip)"
              />

              {/* Main crisp gradient overlay */}
              <rect
                x="0" y="0" width="1440" height="320"
                fill="url(#mgGrad)"
              />
            </svg>
          </div>

          {/* ambient glow */}
          <div style={s.glow} />

          {/* ── Header ── */}
          <header style={s.header}>
            <div style={s.goldLine} />
            <h1 style={s.title}>A Message to All NGO Owners</h1>
            <p style={s.subtitle}>Experience the journey in full</p>
            <div style={s.goldLine} />
          </header>

          {/* ── Video wrapper ── */}
          <div style={s.videoWrap}>
            <div style={s.frame}>
              <div style={s.inner}>
                <div ref={containerRef} style={s.playerBox} />

                {!isPlaying && <div style={s.overlay} />}

                {!isPlaying && (
                  <>
                    <div className="pulse-ring" />
                    <div className="pulse-ring d2" />
                    <div className="pulse-ring d3" />
                  </>
                )}

                {!isPlaying && (
                  <button
                    onClick={handlePlay}
                    style={s.playBtn}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = 'translate(-50%,-50%) scale(1.12)';
                      el.style.boxShadow = '0 0 50px rgba(212,175,55,.8),0 0 100px rgba(212,175,55,.4),inset 0 0 20px rgba(255,255,255,.12)';
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = 'translate(-50%,-50%) scale(1)';
                      el.style.boxShadow = '0 0 30px rgba(212,175,55,.6),0 0 60px rgba(212,175,55,.3),inset 0 0 15px rgba(255,255,255,.05)';
                    }}
                    aria-label="Play video"
                  >
                    <svg width="38" height="38" viewBox="0 0 24 24" fill="#fff" style={{ marginLeft: 5 }}>
                      <polygon points="6,3 20,12 6,21" />
                    </svg>
                  </button>
                )}

                <button
                  onClick={handleMuteToggle}
                  style={{ ...s.muteBtn, background: isMuted ? 'rgba(212,175,55,.85)' : 'rgba(255,248,231,.9)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.15)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" fill="#1a1a1a" stroke="none" />
                      <line x1="23" y1="9" x2="17" y2="15" />
                      <line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" fill="#1a1a1a" stroke="none" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="#1a1a1a" />
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="#1a1a1a" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {(['tl', 'tr', 'bl', 'br'] as const).map((pos) => (
              <span
                key={pos}
                style={{
                  ...s.corner,
                  ...(pos === 'tl' ? { top: -2, left: -2 }
                    : pos === 'tr' ? { top: -2, right: -2, transform: 'rotate(90deg)' }
                    : pos === 'bl' ? { bottom: -2, left: -2, transform: 'rotate(-90deg)' }
                    : { bottom: -2, right: -2, transform: 'rotate(180deg)' }),
                }}
              />
            ))}
          </div>

          {/* ── Footer hint ── */}
          <div style={s.footer}>
            <span style={{ ...s.fLine, background: 'linear-gradient(90deg,transparent,rgba(212,175,55,.4))' }} />
            <p style={s.footerTxt}>Click to play · Toggle sound in corner</p>
            <span style={{ ...s.fLine, background: 'linear-gradient(270deg,transparent,rgba(212,175,55,.4))' }} />
          </div>

        </section>
      </div>
    </>
  );
};

/* ═══════════════════  STYLES  ═══════════════════ */
const s: Record<string, React.CSSProperties> = {

  section: {
    background: '#000',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    margin: 0,
    padding: '3rem 1.5rem',
    boxSizing: 'border-box',

    // ← ADD THESE TWO LINES ONLY
  

WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 12%)',
  maskImage: 'linear-gradient(to top, transparent 0%, black 12%)',
  
  },
  /*
    SVG MERGE GRADIENT WRAPPER
    Climbs 220px into the section above (top: -220px)
    Total height 420px covers the seam generously.
    pointer-events:none so it never blocks clicks.
  */
  mergeGradientWrap: {
    position: 'absolute',
    top: '-220px',
    left: 0,
    width: '100%',
    height: '420px',
    pointerEvents: 'none',
    zIndex: 10,
  },

  glow: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    width: 900,
    height: 550,
    background: 'radial-gradient(ellipse,rgba(212,175,55,.07) 0%,transparent 70%)',
    pointerEvents: 'none',
    zIndex: 0,
  },

  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '.75rem',
    marginBottom: '2.5rem',
    marginTop: 0,
    zIndex: 11,
  },
  goldLine: {
    width: 60,
    height: 1,
    background: 'linear-gradient(90deg,transparent,#D4AF37,transparent)',
  },
  title: {
    color: '#D4AF37',
    fontSize: 'clamp(1.8rem,4vw,3rem)',
    fontWeight: 700,
    letterSpacing: '.08em',
    margin: 0,
    fontFamily: 'Georgia,serif',
    textShadow: '0 0 30px rgba(212,175,55,.3)',
    lineHeight: 1.4,
    padding: '0.15em 0',
  },
  subtitle: {
    color: '#FFF8E7',
    fontSize: 'clamp(.9rem,1.5vw,1.1rem)',
    margin: 0,
    opacity: 0.7,
    letterSpacing: '.1em',
    lineHeight: 1.5,
    padding: '0.1em 0',
  },

  videoWrap: {
    position: 'relative',
    width: '92vw',
    maxWidth: 1100,
    zIndex: 1,
  },
  frame: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
    border: '1px solid rgba(212,175,55,.4)',
    boxShadow: '0 0 40px rgba(212,175,55,.1),0 0 80px rgba(212,175,55,.05),0 20px 60px rgba(0,0,0,.8)',
  },
  inner: {
    position: 'relative',
    width: '100%',
    aspectRatio: '16/9',
    overflow: 'hidden',
    background: '#0a0a0a',
  },
  playerBox: { position: 'absolute', inset: 0 },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: 'rgba(0,0,0,.45)',
    zIndex: 5,
  },
  playBtn: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    width: 88,
    height: 88,
    borderRadius: '50%',
    background: 'linear-gradient(145deg,#F5D060,#D4AF37,#B8960F)',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 0 30px rgba(212,175,55,.6),0 0 60px rgba(212,175,55,.3),inset 0 0 15px rgba(255,255,255,.05)',
    transition: 'transform .3s ease,box-shadow .3s ease',
    zIndex: 10,
  },
  muteBtn: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 44,
    height: 44,
    borderRadius: '50%',
    border: '1px solid rgba(212,175,55,.4)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 20px rgba(0,0,0,.6)',
    transition: 'all .3s ease',
    zIndex: 10,
  },
  corner: {
    position: 'absolute',
    width: 26,
    height: 26,
    borderLeft: '2px solid #D4AF37',
    borderTop: '2px solid #D4AF37',
    pointerEvents: 'none',
    zIndex: 2,
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginTop: '2rem',
    zIndex: 1,
  },
  fLine: { width: 40, height: 1, display: 'block' },
  footerTxt: {
    color: 'rgba(212,175,55,.5)',
    fontSize: '.75rem',
    letterSpacing: '.2em',
    textTransform: 'uppercase' as const,
    margin: 0,
    fontFamily: 'system-ui,sans-serif',
  },
};

export default NGOVideoIntro;