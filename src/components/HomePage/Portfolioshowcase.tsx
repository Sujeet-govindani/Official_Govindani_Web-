// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';

// ══════════════════════════════════════════════════════════════════════════════
// TYPES
// ══════════════════════════════════════════════════════════════════════════════

interface VideoItem {
  title: string;
  videoUrl: string;
  isYouTube?: boolean;
  videoId?: string;
}

interface VideoCard {
  id: number;
  title: string;
  videos: VideoItem[];
}

interface PortfolioShowcaseProps {
  videoCards?: VideoCard[];
}

// ══════════════════════════════════════════════════════════════════════════════
// ▼▼▼  PHOTOGRAPHY IMAGES REPLACE PATHS WITH YOUR OWN  ▼▼▼
// ══════════════════════════════════════════════════════════════════════════════

const CATEGORY_IMAGES: Record<string, string[]> = {
  'Real Estate': [
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Real-Estate-Photography-Images/Real-Estate-Photography-Section-img1.webp',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Real-Estate-Photography-Images/Real-Estate-Photography-Section-img2.webp',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Real-Estate-Photography-Images/Real-Estate-Photography-Section-img3.webp',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Real-Estate-Photography-Images/Real-Estate-Photography-Section-img4.webp',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Real-Estate-Photography-Images/Real-Estate-Photography-Section-img5.webp',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Real-Estate-Photography-Images/Real-Estate-Photography-Section-img6.webp',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Real-Estate-Photography-Images/Real-Estate-Photography-Section-img7.webp',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Real-Estate-Photography-Images/Real-Estate-Photography-Section-img8.webp',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Real-Estate-Photography-Images/Real-Estate-Photography-Section-img9.webp',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Real-Estate-Photography-Images/Real-Estate-Photography-Section-img10.webp',
  ],

  'NGO & Social Impact': [
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Ngo-Images/Ngo-Photography-img1.webp',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Ngo-Images/Ngo-Photography-img2.webp',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Ngo-Images/Ngo-Photography-img6.webp',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Ngo-Images/Ngo-Photography-img9.webp',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Ngo-Images/Ngo-Photography-img10.webp',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Ngo-Images/Ngo-Photography-img11.webp',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Ngo-Images/Ngo-Photography-img12.webp',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Ngo-Images/Ngo-Photography-img14.webp',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Ngo-Images/Ngo-Photography-img15.webp',
    'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Ngo-Images/Ngo-Photography-img2.webp',
  ],


};

// ══════════════════════════════════════════════════════════════════════════════
// DERIVED CONSTANTS
// ══════════════════════════════════════════════════════════════════════════════

const CATEGORY_NAMES = Object.keys(CATEGORY_IMAGES);
const CATEGORIES = ['All', ...CATEGORY_NAMES];

function mobileLabel(cat: string): string {
  if (!cat.includes(' ') || cat.length <= 11) return cat;
  return cat.split(' ')[0];
}

const MOBILE_CATEGORIES = CATEGORIES.map(mobileLabel);

function useTypewriter(words: string[], paused: boolean) {
  const [display, setDisplay] = useState('');
  const wordIdxRef = useRef(0);
  const charIdxRef = useRef(0);
  const deletingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const tick = () => {
      if (paused) { timerRef.current = setTimeout(tick, 120); return; }
      const word = words[wordIdxRef.current];
      const deleting = deletingRef.current;
      if (!deleting) {
        charIdxRef.current += 1;
        setDisplay(word.slice(0, charIdxRef.current));
        if (charIdxRef.current === word.length) {
          timerRef.current = setTimeout(() => { deletingRef.current = true; tick(); }, 1500);
          return;
        }
        timerRef.current = setTimeout(tick, 82);
      } else {
        charIdxRef.current -= 1;
        setDisplay(word.slice(0, charIdxRef.current));
        if (charIdxRef.current === 0) {
          deletingRef.current = false;
          wordIdxRef.current = (wordIdxRef.current + 1) % words.length;
          timerRef.current = setTimeout(tick, 280);
          return;
        }
        timerRef.current = setTimeout(tick, 38);
      }
    };
    timerRef.current = setTimeout(tick, 500);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused]);

  return display;
}

// ══════════════════════════════════════════════════════════════════════════════
// CONSTANTS
// ══════════════════════════════════════════════════════════════════════════════

const gold = "linear-gradient(135deg,#f5c842 0%,#fff8dc 50%,#c8952a 100%)";
const goldTextStyle: React.CSSProperties = {
  background: gold,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};
const bodyFont: React.CSSProperties = {
  fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
};

// ══════════════════════════════════════════════════════════════════════════════
// RESPONSIVE HOOK
// ══════════════════════════════════════════════════════════════════════════════

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    false
  );
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 768);

    // Sync to the real viewport immediately after mount. The initial state is
    // fixed at the pre-render value so hydration matches; without this line a
    // phone would stay on the desktop layout until the first resize event.
    handler();
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return isMobile;
}

// ══════════════════════════════════════════════════════════════════════════════
// VIDEO GROUPS DATA  ←  UPDATED: all YouTube IDs replaced with CDN video URLs
// ══════════════════════════════════════════════════════════════════════════════

const VIDEO_GROUPS_DATA = [
  {
    label: "Real Estate",
    videos: [
      {
        videoUrl: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Real-Estate-Videos/Real-Estate-Capture-1.webm",

      },
      {
        videoUrl: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Real-Estate-Videos/Real-Estate-Capture2.webm",

      },
      {
        videoUrl: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Real-Estate-Videos/Real-Estate-Capture3.webm",

      },
    ],
  },
  {
    label: "Branding & Social",
    videos: [
      {
        videoUrl: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Services-VideoGraphy/Video2.mp4",

      },
      {
        videoUrl: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Services-VideoGraphy/Video1.mp4",

      },
      {
        videoUrl: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Services-VideoGraphy/Video3.mp4",

      },
    ],
  },
  {
    label: "NGO & Social Impact",
    videos: [
      {
        videoUrl: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Ngo-Videos/Ngo-Videography2.mp4",

      },
      {
        videoUrl: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Ngo-Videos/Ngo-Videography3.mp4",

      },
      {
        videoUrl: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Services-VideoGraphy/Video2.mp4",

      },
    ],
  },
];

// ══════════════════════════════════════════════════════════════════════════════
// PHONE DIMENSIONS
// ══════════════════════════════════════════════════════════════════════════════

const DIMS = {
  desktop: {
    centerW: 182,
    get centerH() { return Math.round(this.centerW * 2.1); },
    sideW: 148,
    get sideH() { return Math.round(this.sideW * 2.1); },
    offsetX: 148,
    offsetY: 24,
    groupW: 488,
    groupH: 460,
  },
  mobile: {
    centerW: 152,
    get centerH() { return Math.round(this.centerW * 2.1); },
    sideW: 120,
    get sideH() { return Math.round(this.sideW * 2.1); },
    offsetX: 120,
    offsetY: 20,
    groupW: 370,
    groupH: 390,
  },
};

// ══════════════════════════════════════════════════════════════════════════════
// SINGLE PHONE MOCKUP  ←  UPDATED: renders <video> instead of YouTube iframe
// ══════════════════════════════════════════════════════════════════════════════

interface PhoneVideo {
  videoUrl: string;
  title: string;
  category: string;
}
type PhonePos = 'left' | 'center' | 'right';
type DimSet = typeof DIMS.desktop;

function PhoneItem({
  video,
  position,
  dims,
  onClick,
}: {
  video: PhoneVideo;
  position: PhonePos;
  dims: DimSet;
  onClick?: () => void;
}) {
  const isCenter = position === 'center';
  const isLeft = position === 'left';
  const videoRef = useRef<HTMLVideoElement>(null);

  // Play/pause based on whether this phone is the center one
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (isCenter) {
      el.play().catch(() => {/* autoplay may be blocked */ });
    } else {
      el.pause();
    }
  }, [isCenter]);

  const w = isCenter ? dims.centerW : dims.sideW;
  const h = isCenter ? dims.centerH : dims.sideH;
  const tx = isLeft ? -dims.offsetX : isCenter ? 0 : dims.offsetX;
  const ty = isCenter ? 0 : dims.offsetY;
  const tz = isCenter ? 0 : -24;
  const ry = isLeft ? 16 : isCenter ? 0 : -16;

  return (
    <div
      onClick={onClick}
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: w,
        height: h,
        transform: `translate(-50%,-50%) translateX(${tx}px) translateY(${ty}px) translateZ(${tz}px) rotateY(${ry}deg)`,
        opacity: isCenter ? 1 : 0.80,
        zIndex: isCenter ? 5 : 2,
        borderRadius: 22,
        overflow: 'hidden',
        background: '#0d0d0d',
        border: isCenter
          ? '2.5px solid rgba(245,200,66,0.9)'
          : '2px solid #282828',
        boxShadow: isCenter
          ? '0 0 0 1px rgba(245,200,66,0.2), 0 40px 90px rgba(0,0,0,0.98)'
          : '0 20px 52px rgba(0,0,0,0.9)',
        transition: 'all 0.75s cubic-bezier(.23,1,.32,1)',
        cursor: onClick ? 'pointer' : 'default',
        animation: isCenter ? 'phonePulse 3.5s ease-in-out infinite' : 'none',
      }}
    >
      {/* Gold top bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 4,
        background: gold, zIndex: 10, borderRadius: '22px 22px 0 0',
        boxShadow: '0 0 8px rgba(245,200,66,0.6)',
      }} />

      {/* Notch */}
      <div style={{
        position: 'absolute', top: 4, left: '50%', transform: 'translateX(-50%)',
        width: '32%', height: 13, background: '#000',
        borderRadius: '0 0 10px 10px', zIndex: 10,
      }} />

      {/* Side-phone overlay with arrow */}
      {!isCenter && (
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 9,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0,0,0,0.14)',
        }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'rgba(245,200,66,0.18)',
            border: '1.5px solid rgba(245,200,66,0.55)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 14px rgba(245,200,66,0.35)',
          }}>
            <span style={{ color: '#f5c842', fontSize: 18, fontWeight: 700, lineHeight: 1 }}>
              {isLeft ? '‹' : '›'}
            </span>
          </div>
        </div>
      )}

      {/* ── CDN Video player (replaces YouTube iframe) ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 3 }}>
        <video
          ref={videoRef}
          src={video.videoUrl}
          muted
          loop
          playsInline
          autoPlay={isCenter}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Bottom gradient label */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'linear-gradient(0deg,rgba(0,0,0,0.97) 0%,rgba(0,0,0,0.45) 65%,transparent 100%)',
        padding: '30px 12px 14px',
        zIndex: 8,
        pointerEvents: 'none',
      }}>
        <p style={{
          ...bodyFont,
          fontSize: isCenter ? 9 : 7,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          ...goldTextStyle,
          margin: '0 0 3px',
          fontWeight: 700,
        }}>
          {video.category}
        </p>
        <p style={{
          fontFamily: "'Baskerville','Libre Baskerville',serif",
          fontSize: isCenter ? 11 : 9,
          fontWeight: 700,
          ...goldTextStyle,
          margin: 0,
          lineHeight: 1.35,
        }}>
          {video.title}
        </p>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// GROUP OF 3 PHONES
// ══════════════════════════════════════════════════════════════════════════════

function PhoneGroup({
  groupData,
  centerIdx,
  groupIdx,
  onPhoneClick,
  isMobile,
}: {
  groupData: typeof VIDEO_GROUPS_DATA[0];
  centerIdx: number;
  groupIdx: number;
  onPhoneClick: (groupIdx: number, videoIdx: number) => void;
  isMobile: boolean;
}) {
  const dims = isMobile ? DIMS.mobile : DIMS.desktop;

  const getPosition = (i: number): PhonePos => {
    const offset = (i - centerIdx + 3) % 3;
    if (offset === 0) return 'center';
    if (offset === 1) return 'right';
    return 'left';
  };

  return (
    <div style={{
      position: 'relative',
      width: dims.groupW,
      maxWidth: '100%',
      height: dims.groupH,
      flexShrink: 0,
      perspective: 950,
    }}>
      {groupData.videos.map((video, i) => {
        const pos = getPosition(i);
        return (
          <PhoneItem
            key={i}
            video={video}
            position={pos}
            dims={dims}
            onClick={pos !== 'center' ? () => onPhoneClick(groupIdx, i) : undefined}
          />
        );
      })}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MOBILE PHONE CAROUSEL
// ══════════════════════════════════════════════════════════════════════════════

function MobilePhoneCarousel() {
  const [centerIndices, setCenterIndices] = useState([0, 0, 0]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isMobile = useIsMobile();

  const startAutoRotate = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCenterIndices(prev => prev.map(idx => (idx + 1) % 3));
    }, 6000);
  };

  useEffect(() => {
    startAutoRotate();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePhoneClick = (groupIdx: number, videoIdx: number) => {
    setCenterIndices(prev => {
      const next = [...prev];
      next[groupIdx] = videoIdx;
      return next;
    });
    startAutoRotate();
  };

  return (
    <section style={{ padding: isMobile ? '20px 0 10px' : '40px 0 20px', width: '100%', overflow: 'hidden', background: '#000' }}>
      <style>{`
        @keyframes phonePulse {
          0%,100% { box-shadow: 0 40px 90px rgba(0,0,0,0.98), 0 0 0 0 rgba(245,200,66,0); }
          50%      { box-shadow: 0 40px 90px rgba(0,0,0,0.98), 0 0 0 6px rgba(245,200,66,0.28); }
        }
      `}</style>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 20px 36px', textAlign: 'center' }}>
        <p style={{ ...bodyFont, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', ...goldTextStyle, marginBottom: 6 }}>
          Take A Look at Our Videography Projects
        </p>
        <h2 style={{
          fontFamily: "'Baskerville','Libre Baskerville',Georgia,serif",
          fontSize: 30, fontWeight: 700, letterSpacing: '0.04em',
          ...goldTextStyle, marginBottom: 12,
        }}>
          Our Videography
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0 20px' }}>
          <div style={{ width: 80, height: 2, background: gold, borderRadius: 2 }} />
        </div>
        <p style={{ ...bodyFont, color: '#c2ab6a', fontSize: 14 }}>Premium visual stories crafted for impact</p>
      </div>

      <div style={{
        position: 'relative',
        maxWidth: 1560,
        margin: '0 auto',
        padding: isMobile ? '0 12px 30px' : '10px 10px 50px',
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          width: 760,
          height: 440,
          background: 'radial-gradient(ellipse, rgba(245,200,66,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }} />

        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: isMobile ? 56 : 0,
          position: 'relative',
          zIndex: 2,
        }}>
          {VIDEO_GROUPS_DATA.map((groupData, gi) => (
            <div key={gi} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {isMobile && (
                <p style={{
                  ...bodyFont,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  ...goldTextStyle,
                  marginBottom: 12,
                  marginTop: gi === 0 ? 0 : 0,
                }}>
                  {groupData.label}
                </p>
              )}

              <PhoneGroup
                groupData={groupData}
                centerIdx={centerIndices[gi]}
                groupIdx={gi}
                onPhoneClick={handlePhoneClick}
                isMobile={isMobile}
              />

              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 16 }}>
                {groupData.videos.map((_, vi) => (
                  <div
                    key={vi}
                    onClick={() => handlePhoneClick(gi, vi)}
                    style={{
                      width: centerIndices[gi] === vi ? 24 : 7,
                      height: 7,
                      borderRadius: 4,
                      background: centerIndices[gi] === vi ? '#f5c842' : 'rgba(245,200,66,0.25)',
                      transition: 'all 0.38s ease',
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {!isMobile && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 0,
            marginTop: 16,
            position: 'relative',
            zIndex: 5,
          }}>
            {VIDEO_GROUPS_DATA.map((groupData, gi) => (
              <div
                key={gi}
                style={{
                  width: DIMS.desktop.groupW,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <p style={{
                  ...bodyFont,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  ...goldTextStyle,
                  margin: 0,
                }}>
                  {groupData.label}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ textAlign: 'center', padding: '10px 20px 10px', maxWidth: 700, margin: '0 auto' }}>
        <p style={{
          fontFamily: "'Baskerville','Libre Baskerville',Georgia,serif",
          fontSize: 18, fontWeight: 600, ...goldTextStyle, margin: 0, lineHeight: 1.5,
        }}>
          Explore Our Complete Collection of Visual Stories
        </p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '14px 0 36px' }}>
        <button
          onClick={() => { window.location.href = '/services/videography'; }}
          style={{
            padding: '.65rem 2.2rem',
            fontFamily: "'Libre Baskerville',serif",
            fontSize: '.75rem',
            fontWeight: 600,
            color: '#7a5c0e',
            WebkitTextFillColor: '#7a5c0e',
            background: 'linear-gradient(145deg,#fdf5e0 0%,#f2df9a 45%,#e8c96e 100%)',
            border: '1.5px solid rgba(212,175,55,.5)',
            borderRadius: '50px',
            cursor: 'pointer',
            letterSpacing: '.6px',
            textTransform: 'uppercase' as const,
            boxShadow: 'rgba(139,105,20,.42) 0 20px 30px -10px,rgba(0,0,0,.5) 0 8px 18px -5px,inset 0 1px 0 rgba(255,255,255,.55)',
            transition: 'box-shadow .22s cubic-bezier(.23,1,.32,1)',
            whiteSpace: 'nowrap' as const,
          }}
        >
          VIEW MORE
        </button>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN PORTFOLIO SHOWCASE COMPONENT
// ══════════════════════════════════════════════════════════════════════════════

const PortfolioShowcase: React.FC<PortfolioShowcaseProps> = ({
  videoCards = [
    {
      id: 1, title: 'Commercial & Advertising',
      videos: [
        { title: 'Product Showcase', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', isYouTube: true, videoId: 'dQw4w9WgXcQ' },
        { title: 'Brand Campaign', videoUrl: 'https://www.youtube.com/embed/9bZkp7q19f0', isYouTube: true, videoId: '9bZkp7q19f0' },
        { title: 'Creative Ad', videoUrl: 'https://www.youtube.com/embed/LjhCEhWiKXk', isYouTube: true, videoId: 'LjhCEhWiKXk' },
      ],
    },
    {
      id: 2, title: 'Events & Weddings',
      videos: [
        { title: 'Wedding Highlights', videoUrl: 'https://www.youtube.com/embed/3JZ_D3ELwOQ', isYouTube: true, videoId: '3JZ_D3ELwOQ' },
        { title: 'Corporate Event', videoUrl: 'https://www.youtube.com/embed/0KSOMA3QBU0', isYouTube: true, videoId: '0KSOMA3QBU0' },
        { title: 'Music Festival', videoUrl: 'https://www.youtube.com/embed/AkR2jF7zNOM', isYouTube: true, videoId: 'AkR2jF7zNOM' },
      ],
    },
    {
      id: 3, title: 'Documentary & Storytelling',
      videos: [
        { title: 'Short Documentary', videoUrl: 'https://www.youtube.com/embed/6frd_dHxPRs', isYouTube: true, videoId: '6frd_dHxPRs' },
        { title: 'Behind the Scenes', videoUrl: 'https://www.youtube.com/embed/9P6rdqiybaw', isYouTube: true, videoId: '9P6rdqiybaw' },
        { title: 'Travel Story', videoUrl: 'https://www.youtube.com/embed/2LqzF5WauAw', isYouTube: true, videoId: '2LqzF5WauAw' },
      ],
    },
  ],
}) => {
  const [allCatIdx, setAllCatIdx] = useState(0);
  const [allVisible, setAllVisible] = useState(true);
  const [catImgIdx, setCatImgIdx] = useState(0);
  const [catImgVisible, setCatImgVisible] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [catLabelVisible, setCatLabelVisible] = useState(true);
  const [gridVisible, setGridVisible] = useState(true);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  const typewriterText = useTypewriter(MOBILE_CATEGORIES, mobileDropdownOpen);

  useEffect(() => {
    if (activeCategory !== 'All') return;
    const timer = setInterval(() => {
      setAllVisible(false);
      setTimeout(() => { setAllCatIdx(prev => (prev + 1) % CATEGORY_NAMES.length); setAllVisible(true); }, 500);
    }, 4000);
    return () => clearInterval(timer);
  }, [activeCategory]);

  useEffect(() => {
    if (activeCategory === 'All') return;
    const timer = setInterval(() => {
      setCatImgVisible(false);
      setTimeout(() => { setCatImgIdx(prev => (prev + 1) % 5); setCatImgVisible(true); }, 500);
    }, 3000);
    return () => clearInterval(timer);
  }, [activeCategory]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(e.target as Node)) {
        setMobileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleCategoryChange = (cat: string) => {
    if (cat === activeCategory) { setMobileDropdownOpen(false); return; }
    setCatLabelVisible(false);
    setGridVisible(false);
    setMobileDropdownOpen(false);
    setTimeout(() => {
      setActiveCategory(cat);
      setCatImgIdx(0);
      setCatImgVisible(true);
      setGridVisible(true);
      setCatLabelVisible(true);
      if (cat === 'All') { setAllCatIdx(0); setAllVisible(true); }
    }, 350);
  };

  const currentCatName = CATEGORY_NAMES[allCatIdx];
  const currentCatImgs = CATEGORY_IMAGES[currentCatName];
  const catImages = activeCategory !== 'All' ? CATEGORY_IMAGES[activeCategory] : [];

  const catLeftSrc = catImages[catImgIdx];
  const catRightSrc = catImages[catImgIdx + 5];

  return (
    <div id="photography" className="portfolio-showcase">
      <style>{`

        .portfolio-showcase{
          width:100%;background:#000;position:relative;
          font-family:'Cormorant Garamond',serif;
        }
        .portfolio-showcase::before{
          content:'';position:fixed;inset:0;
          background:
            radial-gradient(circle at 20% 30%,rgba(212,175,55,.08) 0%,transparent 50%),
            radial-gradient(circle at 80% 70%,rgba(25,25,112,.15) 0%,transparent 50%);
          pointer-events:none;z-index:1;
        }

        .photography-section{
          width:100%;min-height:85vh;position:relative;
          display:flex;flex-direction:column;z-index:2;
          padding-bottom:100px;
        }
        .section-header{
          padding:20px 10px 10px;z-index:10;flex-shrink:0;
          text-align:center;display:flex;flex-direction:column;
          align-items:center;justify-content:center;
        }
        .section-title{
          font-family:'Libre Baskerville',serif;font-size:4rem;font-weight:700;
          background:linear-gradient(135deg,#d4af37 0%,#f4e4a6 50%,#d4af37 100%);
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
          margin:0;letter-spacing:4px;text-transform:uppercase;
          animation:titleGlow 3s ease-in-out infinite;
          filter:drop-shadow(0 0 30px rgba(212,175,55,.4));
        }
        @keyframes titleGlow{
          0%,100%{filter:drop-shadow(0 0 30px rgba(212,175,55,.3)) brightness(1);}
          50%    {filter:drop-shadow(0 0 40px rgba(212,175,55,.6)) brightness(1.2);}
        }

        .filter-buttons-container{
          display:flex;flex-wrap:wrap;justify-content:center;
          gap:10px;padding:20px 40px 16px;z-index:10;position:relative;
        }
        @media(max-width:768px){ .filter-buttons-container{ display:none !important; } }

        .filter-btn{
          padding:.5rem 1.2rem;
          font-family:'Libre Baskerville',serif;font-size:.75rem;font-weight:600;
          color:#7a5c0e;-webkit-text-fill-color:#7a5c0e !important;
          background:linear-gradient(145deg,#fdf5e0 0%,#f2df9a 45%,#e8c96e 100%);
          border:1.5px solid rgba(212,175,55,.5);border-radius:50px;cursor:pointer;
          letter-spacing:.6px;text-transform:uppercase;
          box-shadow:rgba(139,105,20,.42) 0 20px 30px -10px,rgba(0,0,0,.5) 0 8px 18px -5px,inset 0 1px 0 rgba(255,255,255,.55);
          transition:box-shadow .22s cubic-bezier(.23,1,.32,1),background .22s cubic-bezier(.23,1,.32,1),border-color .22s cubic-bezier(.23,1,.32,1);
          position:relative;white-space:nowrap;overflow:hidden;
        }
        .filter-btn::after{
          content:'';display:block;height:100%;width:100%;border-radius:100px;
          position:absolute;top:0;left:0;z-index:-1;background:#f0d96a;transition:all .4s;
        }
        .filter-btn:hover{
          background:linear-gradient(145deg,#fffde8 0%,#f7e8a0 45%,#f0d35a 100%) !important;
          color:#7a5c0e !important;-webkit-text-fill-color:#7a5c0e !important;
          border-color:rgba(212,175,55,.75);
          box-shadow:rgba(212,175,55,.55) 0 28px 40px -8px,rgba(0,0,0,.52) 0 16px 28px -6px,inset 0 1px 0 rgba(255,255,255,.65);
        }
        .filter-btn:hover::after{transform:scaleX(1.4) scaleY(1.6);opacity:0;}
        .filter-btn:active{
          box-shadow:rgba(139,105,20,.3) 0 10px 18px -8px,rgba(0,0,0,.4) 0 4px 10px -4px,inset 0 1px 0 rgba(255,255,255,.4);
        }
        .filter-btn.active{
          background:linear-gradient(145deg,#d4af37 0%,#c49b25 50%,#a8800f 100%) !important;
          color:#fff8e0 !important;-webkit-text-fill-color:#fff8e0 !important;
          border-color:rgba(212,175,55,.85);
          box-shadow:rgba(212,175,55,.7) 0 22px 32px -10px,rgba(0,0,0,.55) 0 8px 18px -6px,inset 0 1px 0 rgba(255,255,255,.3);
        }
        .filter-btn.active:hover{
          background:linear-gradient(145deg,#e0bc45 0%,#d0a82e 50%,#b8901c 100%) !important;
          color:#fff8e0 !important;-webkit-text-fill-color:#fff8e0 !important;
          box-shadow:rgba(212,175,55,.8) 0 30px 44px -8px,rgba(0,0,0,.55) 0 14px 24px -6px,inset 0 1px 0 rgba(255,255,255,.3);
        }

        .mob-filter-wrap{ display: none; }
        @media(max-width:768px){
          .mob-filter-wrap{ display: block; width: 100%; padding: 10px 20px 0; }
        }
        .mob-trigger-row{ display: flex; align-items: center; gap: 14px; padding-bottom: 6px; }

        @keyframes clickHerePulseMobile{
          0%,100%{ background:#F5F5DC; box-shadow:0 0 30px rgba(245,245,220,.5),0 0 12px rgba(245,245,220,.25); color:#43230F;transform:scale(1); }
          50%{ background:linear-gradient(270deg,#E3C766 0%,#F4E5B8 60%); box-shadow:0 0 40px rgba(212,175,55,.8),0 0 16px rgba(212,175,55,.5); color:#43230F;transform:scale(1.02); }
        }
        .mob-click-btn{
          flex-shrink:0;border:none;outline:none;cursor:default;
          text-transform:uppercase;letter-spacing:.05em;
          font-family:'Libre Baskerville',serif;font-weight:700;
          pointer-events:none;border-radius:.4rem;white-space:nowrap;
          background:#F5F5DC;color:#43230F;
          animation:clickHerePulseMobile 3s ease-in-out infinite;
          font-size:.58rem;padding:.42rem .8rem;
        }

        @keyframes blink{0%,50%{opacity:1}51%,100%{opacity:0}}

        .mob-dd-trigger{
          display:inline-flex;align-items:center;
          font-family:'Libre Baskerville',serif;font-weight:700;
          border:none;outline:none;cursor:pointer;
          font-size:clamp(1.05rem,4.2vw,1.28rem);line-height:1.2;
          padding:0;background:transparent;flex:1;min-width:0;overflow:hidden;
        }
        .mob-dd-trigger-text{
          background:linear-gradient(90deg,#d4af37,#f4e5b8,#d4af37);
          -webkit-background-clip:text;background-clip:text;
          -webkit-text-fill-color:transparent;white-space:nowrap;overflow:hidden;max-width:100%;
        }
        .mob-typing-cursor{
          display:inline-block;flex-shrink:0;animation:blink 1s step-end infinite;
          margin-left:2px;-webkit-text-fill-color:#d4af37;color:#d4af37;
          font-size:clamp(1.05rem,4.2vw,1.28rem);line-height:1.2;
        }

        .mob-dd-body{ overflow:hidden;max-height:0;opacity:0;transition:max-height 0.38s cubic-bezier(0.4,0,0.2,1),opacity 0.28s ease; }
        .mob-dd-body.mob-dd-open{ max-height:440px;opacity:1; }

        .mob-ddpanel{
          margin:6px 0 14px 0;border-radius:12px;overflow:hidden;
          border:1px solid rgba(212,175,55,.35);
          box-shadow:0 16px 48px rgba(0,0,0,.9),0 6px 20px rgba(212,175,55,.25);
          backdrop-filter:blur(10px);
          background:linear-gradient(135deg,rgba(13,27,46,.98),rgba(10,22,40,.98));
        }
        .mob-ddopt{
          width:100%;padding:12px 18px;text-align:left;
          background:transparent;border:none;cursor:pointer;
          font-family:'Libre Baskerville',serif;font-size:13px;
          font-weight:500;color:#cbd5e1;
          transition:all .2s ease;
          display:flex;align-items:center;justify-content:space-between;
        }
        .mob-ddopt+.mob-ddopt{ border-top:1px solid rgba(212,175,55,.1); }
        .mob-ddopt:hover{ background:rgba(212,175,55,.07);color:#fff; }
        .mob-ddopt.mob-ddactive{
          background:linear-gradient(90deg,#d4af37,#f4e5b8,#d4af37);
          -webkit-background-clip:text;background-clip:text;
          -webkit-text-fill-color:transparent;font-weight:700;
        }
        .mob-ddopt.mob-ddactive::after{
          content:'';width:8px;height:8px;border-radius:50%;
          background:#d4af37;box-shadow:0 0 10px rgba(212,175,55,.9);
          flex-shrink:0;margin-left:8px;display:inline-block;
        }

        .split-slideshow-container{
          position:relative;width:100%;height:70vh;
          overflow:hidden;transition:opacity .35s ease;
        }
        .split-slideshow-container.grid-hidden{opacity:0;}

        .all-panels{display:flex;width:100%;height:100%;}
        .all-panel{width:50%;height:100%;position:relative;overflow:hidden;}
        .all-panel-img{
          width:100%;height:100%;object-fit:cover;display:block;
          position:absolute;inset:0;
          transition:opacity .55s ease,transform .55s ease;
        }
        .all-panel-img.visible     {opacity:1;transform:translateY(0) scale(1);}
        .all-panel-img.hidden-up   {opacity:0;transform:translateY(-28px) scale(1.03);}
        .all-panel-img.hidden-down {opacity:0;transform:translateY( 28px) scale(1.03);}

        .photo-navigation{
          position:absolute;right:28px;top:50%;transform:translateY(-50%);
          z-index:110;display:flex;flex-direction:column;gap:12px;
        }
        .photo-nav-dot{
          width:7px;height:30px;background:rgba(212,175,55,.3);
          border-radius:4px;cursor:pointer;transition:all .3s ease;position:relative;
        }
        .photo-nav-dot::before{
          content:'';position:absolute;inset:0;background:#d4af37;border-radius:4px;
          transform:scaleY(0);transform-origin:bottom;transition:transform .3s ease;
        }
        .photo-nav-dot.active::before{transform:scaleY(1);}

        .cat-img-dots{
          position:absolute;right:28px;top:50%;transform:translateY(-50%);
          z-index:110;display:flex;flex-direction:column;gap:12px;
        }
        .cat-img-dot{
          width:7px;height:30px;background:rgba(212,175,55,.3);
          border-radius:4px;transition:all .3s ease;position:relative;cursor:default;
        }
        .cat-img-dot::before{
          content:'';position:absolute;inset:0;background:#d4af37;border-radius:4px;
          transform:scaleY(0);transform-origin:bottom;transition:transform .3s ease;
        }
        .cat-img-dot.active::before{transform:scaleY(1);}

        .photo-button-container{
          position:absolute;bottom:35px;left:50%;transform:translateX(-50%);z-index:110;
        }

        .center-divider{
          width:100%;height:2px;
          background:linear-gradient(to right,transparent 0%,rgba(212,175,55,.3) 20%,rgba(212,175,55,.8) 50%,rgba(212,175,55,.3) 80%,transparent 100%);
          position:relative;z-index:100;box-shadow:0 0 20px rgba(212,175,55,.4);margin:40px 0;
        }
        .center-divider::before,.center-divider::after{
          content:'';position:absolute;top:50%;width:10px;height:10px;background:#d4af37;
          border-radius:50%;transform:translateY(-50%);box-shadow:0 0 15px rgba(212,175,55,.6);
        }
        .center-divider::before{left:60px;}
        .center-divider::after{right:60px;}

        @media(max-width:768px){
          .photography-section{min-height:70vh;padding-bottom:80px;}
          .section-title{font-size:2.5rem;letter-spacing:2px;}
          .split-slideshow-container{height:auto;aspect-ratio:4/3;}
          .all-panels{flex-direction:column;}
          .all-panel{width:100%;height:50%;}
          .photo-navigation{right:10px;gap:10px;}
          .cat-img-dots{right:10px;gap:10px;}
          .photo-nav-dot{width:6px;height:24px;}
          .cat-img-dot{width:6px;height:24px;}
          .photo-button-container{bottom:20px;width:100%;display:flex;justify-content:center;}
          .center-divider{margin:26px 0;}
          .center-divider::before{left:14px;} .center-divider::after{right:14px;}
        }
        @media(max-width:480px){
          .section-title{font-size:1.9rem;}
          .mob-dd-trigger{font-size:1rem;}
          .mob-typing-cursor{font-size:1rem;}
        }
      `}</style>

      {/* ── Photography Section ── */}
      <div className="photography-section">
        <div className="section-header">
          <h2 className="section-title">Photography</h2>
        </div>

        <div className="filter-buttons-container">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`filter-btn${activeCategory === cat ? ' active' : ''}`}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mob-filter-wrap" ref={mobileDropdownRef}>
          <div className="mob-trigger-row">
            <span className="mob-click-btn">CLICK HERE →</span>
            <button
              className="mob-dd-trigger"
              onClick={() => setMobileDropdownOpen(o => !o)}
              aria-haspopup="listbox"
              aria-expanded={mobileDropdownOpen}
            >
              <span className="mob-dd-trigger-text">{typewriterText}</span>
              <span className="mob-typing-cursor">|</span>
            </button>
          </div>
          <div className={`mob-dd-body${mobileDropdownOpen ? ' mob-dd-open' : ''}`}>
            <div className="mob-ddpanel" role="listbox" aria-label="Filter portfolio by category">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={`mob-ddopt${activeCategory === cat ? ' mob-ddactive' : ''}`}
                  onClick={() => handleCategoryChange(cat)}
                  role="option"
                  aria-selected={activeCategory === cat}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={`split-slideshow-container${!gridVisible ? ' grid-hidden' : ''}`}>
          {activeCategory === 'All' ? (
            <div className="all-panels">
              <div className="all-panel">
                <img src={currentCatImgs?.[allCatIdx % (currentCatImgs?.length || 1)]} alt="" className={`all-panel-img ${allVisible ? 'visible' : 'hidden-up'}`} loading="lazy" decoding="async" />
              </div>
              <div className="all-panel">
                <img src={currentCatImgs?.[(allCatIdx + 5) % (currentCatImgs?.length || 1)]} alt="" className={`all-panel-img ${allVisible ? 'visible' : 'hidden-down'}`} loading="lazy" decoding="async" />
              </div>
            </div>
          ) : (
            <div className="all-panels">
              <div className="all-panel">
                <img src={catLeftSrc} alt="" className={`all-panel-img ${catImgVisible ? 'visible' : 'hidden-up'}`} loading="lazy" decoding="async" />
              </div>
              <div className="all-panel">
                <img src={catRightSrc} alt="" className={`all-panel-img ${catImgVisible ? 'visible' : 'hidden-down'}`} loading="lazy" decoding="async" />
              </div>
            </div>
          )}
        </div>

        {activeCategory === 'All' && (
          <div className="photo-navigation">
            {CATEGORY_NAMES.map((_, idx) => (
              <div
                key={idx}
                className={`photo-nav-dot${allCatIdx === idx ? ' active' : ''}`}
                onClick={() => {
                  setAllVisible(false);
                  setTimeout(() => { setAllCatIdx(idx); setAllVisible(true); }, 300);
                }}
              />
            ))}
          </div>
        )}

        {activeCategory !== 'All' && (
          <div className="cat-img-dots">
            {[0, 1, 2, 3, 4].map(idx => (
              <div key={idx} className={`cat-img-dot${catImgIdx === idx ? ' active' : ''}`} />
            ))}
          </div>
        )}

        <div className="photo-button-container">
          <button
            className="filter-btn"
            onClick={() => { window.location.href = '/services/photography'; }}
          >
            View Gallery
          </button>
        </div>
      </div>

      <div className="center-divider" />

      {/* ── Videography Section 9 Mobile Phone Mockups ── */}
      <MobilePhoneCarousel />
    </div>
  );
};

export default PortfolioShowcase;