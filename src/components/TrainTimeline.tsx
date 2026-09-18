import React, { useEffect, useRef, useState, useCallback } from 'react';

const TIMELINE = [
  {
    year: '2018',
    title: 'The Beginning of Digital Excellence',
    body: 'Govindani Infotech Pvt. Ltd. began its journey in Bhopal with a vision to build strong digital ecosystems through social media management, videography, branding, and digital marketing solutions.'
  },
  {
    year: '2019',
    title: 'Expansion into Real Estate & Education',
    body: 'Performance Marketing Growth: The company expanded into real estate, retail, and educational marketing campaigns, delivering lead generation systems and performance-driven strategies for institutes, builders, and growing businesses.'
  },
  {
    year: '2020',
    title: 'Guinness World Record Milestone',
    body: 'National Recognition & Brand Authority: Our Founder Sujeet Govindani achieved a Guinness World Record milestone while Govindani Infotech continued building its reputation in branding, startup growth, and digital business development.'
  },
  {
    year: '2021',
    title: 'Publishing & Social Media Expansion',
    body: 'Global Digital Presence: The company strengthened its digital influence through globally published marketing books on Kindle, high-rated Amazon publications, and rapid growth in social media management and branded content production.'
  },
  {
    year: '2022',
    title: 'Strategic Campaigns & Technology Services',
    body: 'Web Development & CRM Introduction: Govindani Infotech expanded into WordPress websites, custom-coded platforms, CRM systems, automation tools, and high-performance real estate campaign management across multiple Indian cities.'
  },
  {
    year: '2023',
    title: 'Digital Infrastructure & Website Growth',
    body: 'NGO & E-Commerce Expansion: The company successfully scaled its website division with NGO platforms, business portals, and e-commerce development, creating independent digital systems for brands and organizations.'
  },
  {
    year: '2024',
    title: 'Nationwide Digital Growth',
    body: '150+ Websites Delivered Across India: Govindani Infotech crossed the milestone of 150+ active websites, including NGO websites, e-commerce platforms, business portals, and branding systems while expanding operations nationwide.'
  },
  {
    year: '2025',
    title: 'Holding Expansion & Welcoming Pune',
    body: 'Operational Growth & Infrastructure Expansion: As part of a major expansion phase, Govindani Infotech strengthened its operational structure by expanding its holding presence to Pune, establishing a dedicated studio setup, and scaling management operations between Bhopal, Delhi, and Pune.'
  },
  {
    year: '2026',
    title: 'Enterprise Platforms & Premium Brand Collaborations',
    body: 'Large-Scale E-Commerce & CRM Systems: The company entered a new growth phase with advanced in-house e-commerce systems, enterprise CRM development, and premium brand collaborations, including major digital infrastructure projects like Babaji Ke Buti, Happilee Digital Innovations and CI Builders CRM.'
  },
];

const TOTAL_COACHES = 20;

function FlagSVG({ year, active }: { year: string; active: boolean }) {
  const baseColor = active ? '#D4AF37' : '#C9A227';
  const darkColor = active ? '#8B6914' : '#7a5c10';
  return (
    <svg viewBox="0 0 100 80" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <linearGradient id={`fg-${year}`} x1="0" y1="0" x2="1" y2="0.3">
          <stop offset="0%" stopColor={baseColor} /><stop offset="40%" stopColor={darkColor} />
          <stop offset="70%" stopColor={baseColor} /><stop offset="100%" stopColor={darkColor} />
        </linearGradient>
        <filter id={`fglow-${year}`}><feGaussianBlur stdDeviation={active ? "4" : "2"} result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <clipPath id={`fclip-${year}`}><rect x="6" y="0" width="94" height="80" /></clipPath>
        <linearGradient id={`pole-${year}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6b5010" /><stop offset="50%" stopColor="#D4AF37" /><stop offset="100%" stopColor="#6b5010" />
        </linearGradient>
      </defs>
      <rect x="5" y="2" width="3" height="78" rx="1.5" fill={`url(#pole-${year})`} />
      <circle cx="6.5" cy="4" r="4" fill="#D4AF37" stroke="#8B6914" strokeWidth="0.8" />
      <circle cx="6.5" cy="4" r="1.8" fill="#FFD700" />
      {active && <ellipse cx="52" cy="26" rx="46" ry="22" fill="rgba(212,175,55,0.18)" filter={`url(#fglow-${year})`} />}
      <g clipPath={`url(#fclip-${year})`}>
        <path d="M 8,8 C 28,5 48,16 68,9 C 85,3 95,13 98,10 L 98,44 C 90,48 78,36 68,42 C 48,52 28,40 8,44 Z"
          fill={`url(#fg-${year})`} stroke={active ? "rgba(255,215,0,0.6)" : "rgba(212,175,55,0.35)"} strokeWidth="0.7" opacity={active ? "1" : "0.85"}
          filter={active ? `url(#fglow-${year})` : undefined}>
          <animate attributeName="d" dur="3s" repeatCount="indefinite" values="M 8,8 C 28,5 48,16 68,9 C 85,3 95,13 98,10 L 98,44 C 90,48 78,36 68,42 C 48,52 28,40 8,44 Z;M 8,10 C 28,14 48,4 68,13 C 85,20 95,7 98,13 L 98,47 C 90,42 78,52 68,44 C 48,37 28,50 8,44 Z;M 8,8 C 28,5 48,16 68,9 C 85,3 95,13 98,10 L 98,44 C 90,48 78,36 68,42 C 48,52 28,40 8,44 Z" />
        </path>
      </g>
      <text x="52" y="31" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700" fontFamily="'Libre Baskerville', serif" letterSpacing="1.5" opacity="0.98">{year}</text>
    </svg>
  );
}

function ComingSoonFlagSVG() {
  return (
    <svg viewBox="0 0 100 80" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <linearGradient id="csfg" x1="0" y1="0" x2="1" y2="0.3">
          <stop offset="0%" stopColor="#0f1e38" /><stop offset="50%" stopColor="#071428" /><stop offset="100%" stopColor="#0f1e38" />
        </linearGradient>
        <filter id="csglow"><feGaussianBlur stdDeviation="2.5" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <clipPath id="csclip"><rect x="6" y="0" width="94" height="80" /></clipPath>
        <linearGradient id="cspole" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1a2a4a" /><stop offset="50%" stopColor="#4a7cc7" /><stop offset="100%" stopColor="#1a2a4a" />
        </linearGradient>
      </defs>
      <rect x="5" y="2" width="3" height="78" rx="1.5" fill="url(#cspole)" />
      <circle cx="6.5" cy="4" r="4" fill="#4a7cc7" stroke="#1a2a4a" strokeWidth="0.8" />
      <circle cx="6.5" cy="4" r="1.8" fill="#7ab3f5" />
      <g clipPath="url(#csclip)">
        <path d="M 8,8 C 28,5 48,16 68,9 C 85,3 95,13 98,10 L 98,44 C 90,48 78,36 68,42 C 48,52 28,40 8,44 Z"
          fill="url(#csfg)" stroke="rgba(74,124,199,0.5)" strokeWidth="0.7" opacity="0.95" filter="url(#csglow)">
          <animate attributeName="d" dur="3.5s" repeatCount="indefinite" values="M 8,8 C 28,5 48,16 68,9 C 85,3 95,13 98,10 L 98,44 C 90,48 78,36 68,42 C 48,52 28,40 8,44 Z;M 8,10 C 28,14 48,4 68,13 C 85,20 95,7 98,13 L 98,47 C 90,42 78,52 68,44 C 48,37 28,50 8,44 Z;M 8,8 C 28,5 48,16 68,9 C 85,3 95,13 98,10 L 98,44 C 90,48 78,36 68,42 C 48,52 28,40 8,44 Z" />
        </path>
        {[[20, 18], [50, 22], [75, 14], [35, 30], [65, 28]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.5" fill="rgba(180,210,255,0.7)">
            <animate attributeName="opacity" dur={`${1.2 + i * 0.4}s`} repeatCount="indefinite" values="0.3;1;0.3" />
          </circle>
        ))}
      </g>
      <text x="52" y="26" textAnchor="middle" fill="rgba(180,210,255,0.95)" fontSize="7.5" fontWeight="700" fontFamily="'Libre Baskerville', serif" letterSpacing="0.5">COMING</text>
      <text x="52" y="37" textAnchor="middle" fill="rgba(180,210,255,0.95)" fontSize="7.5" fontWeight="700" fontFamily="'Libre Baskerville', serif" letterSpacing="0.5">SOON</text>
    </svg>
  );
}

function LocomotiveSVG({ w, h }: { w: number; h: number }) {
  return (
    <svg viewBox="0 0 500 200" width={w} height={h} preserveAspectRatio="none" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="locoBody" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2a2520" /><stop offset="30%" stopColor="#1a1714" /><stop offset="70%" stopColor="#12100d" /><stop offset="100%" stopColor="#0a0908" /></linearGradient>
        <linearGradient id="locoAccent" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#8B6914" /><stop offset="50%" stopColor="#D4AF37" /><stop offset="100%" stopColor="#8B6914" /></linearGradient>
        <linearGradient id="locoRoof" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3a3530" /><stop offset="100%" stopColor="#252220" /></linearGradient>
        <linearGradient id="windowGlass" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="rgba(140,200,255,0.25)" /><stop offset="100%" stopColor="rgba(60,100,160,0.12)" /></linearGradient>
        <linearGradient id="locoNose" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#1a1714" /><stop offset="100%" stopColor="#2a2520" /></linearGradient>
        <linearGradient id="metalShine" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="rgba(255,255,255,0.08)" /><stop offset="50%" stopColor="rgba(255,255,255,0)" /><stop offset="100%" stopColor="rgba(0,0,0,0.15)" /></linearGradient>
        <filter id="locoGlow"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      <rect x="10" y="45" width="400" height="110" rx="6" fill="url(#locoBody)" stroke="rgba(212,175,55,0.3)" strokeWidth="1.5" />
      <rect x="10" y="45" width="400" height="110" rx="6" fill="url(#metalShine)" />
      <path d="M15,45 Q15,28 40,28 L370,28 Q395,28 395,45" fill="url(#locoRoof)" stroke="rgba(212,175,55,0.2)" strokeWidth="1" />
      <rect x="10" y="43" width="400" height="3" fill="url(#locoAccent)" opacity="0.8" />
      <rect x="10" y="130" width="400" height="3" fill="url(#locoAccent)" opacity="0.6" />
      <path d="M410,45 L480,65 Q498,72 498,100 Q498,128 480,135 L410,155 Z" fill="url(#locoNose)" stroke="rgba(212,175,55,0.35)" strokeWidth="1.5" />
      <rect x="30" y="52" width="55" height="40" rx="4" fill="url(#windowGlass)" stroke="rgba(212,175,55,0.25)" strokeWidth="1.2" />
      <rect x="95" y="52" width="55" height="40" rx="4" fill="url(#windowGlass)" stroke="rgba(212,175,55,0.25)" strokeWidth="1.2" />
      <circle cx="470" cy="80" r="10" fill="rgba(255,240,180,0.15)" stroke="rgba(212,175,55,0.4)" strokeWidth="1.5" />
      <circle cx="470" cy="80" r="5" fill="rgba(255,230,100,0.9)" filter="url(#locoGlow)" />
      <circle cx="470" cy="120" r="7" fill="rgba(255,50,50,0.15)" stroke="rgba(200,50,50,0.4)" strokeWidth="1" />
      <circle cx="470" cy="120" r="3.5" fill="rgba(255,80,80,0.7)" />
      <rect x="5" y="155" width="420" height="14" rx="2" fill="#0d0c0a" stroke="rgba(212,175,55,0.15)" strokeWidth="1" />
      <g>
        <rect x="40" y="168" width="110" height="8" rx="2" fill="#151310" stroke="rgba(212,175,55,0.2)" strokeWidth="1" />
        {[60, 95, 130].map(cx => (
          <g key={cx}>
            <circle cx={cx} cy="186" r="14" fill="#1a1714" stroke="rgba(212,175,55,0.5)" strokeWidth="2.5" />
            <circle cx={cx} cy="186" r="4" fill="rgba(212,175,55,0.35)" />
            {[0, 45, 90, 135].map(a => <line key={a} x1={cx} y1={186} x2={cx + 10 * Math.cos(a * Math.PI / 180)} y2={186 + 10 * Math.sin(a * Math.PI / 180)} stroke="rgba(212,175,55,0.15)" strokeWidth="1" />)}
          </g>
        ))}
      </g>
      <g>
        <rect x="270" y="168" width="110" height="8" rx="2" fill="#151310" stroke="rgba(212,175,55,0.2)" strokeWidth="1" />
        {[290, 325, 360].map(cx => (
          <g key={cx}>
            <circle cx={cx} cy="186" r="14" fill="#1a1714" stroke="rgba(212,175,55,0.5)" strokeWidth="2.5" />
            <circle cx={cx} cy="186" r="4" fill="rgba(212,175,55,0.35)" />
            {[0, 45, 90, 135].map(a => <line key={a} x1={cx} y1={186} x2={cx + 10 * Math.cos(a * Math.PI / 180)} y2={186 + 10 * Math.sin(a * Math.PI / 180)} stroke="rgba(212,175,55,0.15)" strokeWidth="1" />)}
          </g>
        ))}
      </g>
    </svg>
  );
}

function CoachSVG({ w, h, coachNum }: { w: number; h: number; coachNum: number }) {
  const colors = [{ body: '#1c1915', accent: '#D4AF37' }, { body: '#1a1612', accent: '#C5A028' }, { body: '#1e1b17', accent: '#D4AF37' }];
  const c = colors[coachNum % colors.length];
  return (
    <svg viewBox="0 0 500 200" width={w} height={h} preserveAspectRatio="none" style={{ display: 'block' }}>
      <defs>
        <linearGradient id={`cb${coachNum}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={c.body} /><stop offset="40%" stopColor="#141210" /><stop offset="100%" stopColor="#0c0b09" /></linearGradient>
        <linearGradient id={`cr${coachNum}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#353028" /><stop offset="100%" stopColor="#252220" /></linearGradient>
        <linearGradient id={`cw${coachNum}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="rgba(140,210,255,0.22)" /><stop offset="100%" stopColor="rgba(60,110,170,0.08)" /></linearGradient>
      </defs>
      <rect x="8" y="40" width="484" height="118" rx="5" fill={`url(#cb${coachNum})`} stroke="rgba(212,175,55,0.28)" strokeWidth="1.5" />
      <path d="M12,40 Q12,22 35,22 L465,22 Q488,22 488,40" fill={`url(#cr${coachNum})`} stroke="rgba(212,175,55,0.18)" strokeWidth="1" />
      <rect x="8" y="38" width="484" height="3" fill={c.accent} opacity="0.7" rx="1" />
      <rect x="8" y="133" width="484" height="3" fill={c.accent} opacity="0.55" rx="1" />
      {[30, 82, 134, 186, 238, 290, 342, 394, 446].map((x, i) => (
        <g key={i}><rect x={x} y="50" width="40" height="44" rx="3" fill={`url(#cw${coachNum})`} stroke="rgba(212,175,55,0.22)" strokeWidth="1" /></g>
      ))}
      <rect x="5" y="158" width="490" height="12" rx="2" fill="#0d0c0a" stroke="rgba(212,175,55,0.12)" strokeWidth="1" />
      <text x="250" y="121" textAnchor="middle" fill="rgba(212,175,55,0.4)" fontSize="10" fontFamily="'Libre Baskerville', serif" fontWeight="700">{coachNum}</text>
      <rect x="50" y="169" width="100" height="7" rx="2" fill="#151310" stroke="rgba(212,175,55,0.18)" strokeWidth="1" />
      {[70, 100, 130].map(cx => (
        <g key={cx}><circle cx={cx} cy="186" r="12" fill="#1a1714" stroke="rgba(212,175,55,0.45)" strokeWidth="2.5" /><circle cx={cx} cy="186" r="3.5" fill="rgba(212,175,55,0.3)" />{[0, 60, 120].map(a => <line key={a} x1={cx} y1={186} x2={cx + 8.5 * Math.cos(a * Math.PI / 180)} y2={186 + 8.5 * Math.sin(a * Math.PI / 180)} stroke="rgba(212,175,55,0.12)" strokeWidth="0.8" />)}</g>
      ))}
      <rect x="350" y="169" width="100" height="7" rx="2" fill="#151310" stroke="rgba(212,175,55,0.18)" strokeWidth="1" />
      {[370, 400, 430].map(cx => (
        <g key={cx}><circle cx={cx} cy="186" r="12" fill="#1a1714" stroke="rgba(212,175,55,0.45)" strokeWidth="2.5" /><circle cx={cx} cy="186" r="3.5" fill="rgba(212,175,55,0.3)" />{[0, 60, 120].map(a => <line key={a} x1={cx} y1={186} x2={cx + 8.5 * Math.cos(a * Math.PI / 180)} y2={186 + 8.5 * Math.sin(a * Math.PI / 180)} stroke="rgba(212,175,55,0.12)" strokeWidth="0.8" />)}</g>
      ))}
    </svg>
  );
}

function FutureCoachSVG({ w, h }: { w: number; h: number }) {
  return (
    <svg viewBox="0 0 500 200" width={w} height={h} preserveAspectRatio="none" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="fcoach" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0d1520" /><stop offset="40%" stopColor="#091018" /><stop offset="100%" stopColor="#040810" /></linearGradient>
        <linearGradient id="fcroof" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#151f30" /><stop offset="100%" stopColor="#0d1520" /></linearGradient>
        <linearGradient id="fcglass" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="rgba(100,160,255,0.18)" /><stop offset="100%" stopColor="rgba(50,100,200,0.08)" /></linearGradient>
        <filter id="fstarGlow"><feGaussianBlur stdDeviation="2" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      <rect x="8" y="40" width="484" height="118" rx="5" fill="url(#fcoach)" stroke="rgba(74,124,199,0.3)" strokeWidth="1.5" />
      <path d="M12,40 Q12,22 35,22 L465,22 Q488,22 488,40" fill="url(#fcroof)" stroke="rgba(74,124,199,0.2)" strokeWidth="1" />
      <rect x="8" y="38" width="484" height="3" fill="#4a7cc7" opacity="0.5" rx="1" />
      <rect x="8" y="133" width="484" height="3" fill="#4a7cc7" opacity="0.4" rx="1" />
      {[30, 82, 134, 186, 238, 290, 342, 394, 446].map((x, i) => <rect key={i} x={x} y="50" width="40" height="44" rx="3" fill="url(#fcglass)" stroke="rgba(74,124,199,0.2)" strokeWidth="1" />)}
      {[[60, 70], [150, 60], [250, 75], [350, 65], [440, 72], [100, 110], [200, 95], [300, 105], [400, 100]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.8" fill="rgba(180,210,255,0.6)" filter="url(#fstarGlow)">
          <animate attributeName="opacity" dur={`${1 + i * 0.3}s`} repeatCount="indefinite" values="0.2;0.9;0.2" />
        </circle>
      ))}
      <text x="250" y="118" textAnchor="middle" fill="rgba(100,170,255,0.45)" fontSize="11" fontFamily="'Libre Baskerville', serif" fontWeight="700" letterSpacing="4">THE FUTURE</text>
      <rect x="5" y="158" width="490" height="12" rx="2" fill="#080d14" stroke="rgba(74,124,199,0.15)" strokeWidth="1" />
      <rect x="50" y="169" width="100" height="7" rx="2" fill="#0d1520" stroke="rgba(74,124,199,0.2)" strokeWidth="1" />
      {[70, 100, 130].map(cx => (<g key={cx}><circle cx={cx} cy="186" r="12" fill="#0d1520" stroke="rgba(74,124,199,0.45)" strokeWidth="2.5" /><circle cx={cx} cy="186" r="3.5" fill="rgba(74,124,199,0.3)" /></g>))}
      <rect x="350" y="169" width="100" height="7" rx="2" fill="#0d1520" stroke="rgba(74,124,199,0.2)" strokeWidth="1" />
      {[370, 400, 430].map(cx => (<g key={cx}><circle cx={cx} cy="186" r="12" fill="#0d1520" stroke="rgba(74,124,199,0.45)" strokeWidth="2.5" /><circle cx={cx} cy="186" r="3.5" fill="rgba(74,124,199,0.3)" /></g>))}
    </svg>
  );
}

function SmokeParticles() {
  return (
    <div className="rt-smoke-wrap">
      {[0, 1, 2, 3, 4, 5, 6].map(i => <div key={i} className={`rt-smoke-particle rt-sp-${i}`} />)}
    </div>
  );
}

export default function TrainTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const trainRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const posRef = useRef<number>(9999);
  const pauseUntilRef = useRef(0);
  const lastFlagRef = useRef(-1);
  const jumpToRef = useRef<number | null>(null);
  const hasScrolledRef = useRef(false);

  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [displayed, setDisplayed] = useState<number | null>(null);
  const [fading, setFading] = useState(false);
  const [viewW, setViewW] = useState(1200);

  const updateContent = useCallback((newIdx: number) => {
    if (displayed === newIdx) return;
    if (displayed === null) { setActiveIdx(newIdx); setDisplayed(newIdx); return; }
    setFading(true);
    setTimeout(() => { setActiveIdx(newIdx); setDisplayed(newIdx); setFading(false); }, 280);
  }, [displayed]);
  const updateContentRef = useRef(updateContent);
  updateContentRef.current = updateContent;

  const getCoachW = useCallback(() => {
    if (viewW <= 480) return viewW * 0.68;
    if (viewW <= 768) return viewW * 0.52;
    return viewW * 0.37;
  }, [viewW]);

  const coachW = getCoachW();
  const coachH = coachW * 0.38;
  const gap = 2;
  const unit = coachW + gap;
  const trainW = TOTAL_COACHES * unit;
  const flagH = Math.max(20, coachH * 0.16);
  const GROUND = 28;
  const trackH = flagH + coachH + GROUND;
  const railTop = flagH + coachH - 4;
  const ballastTop = flagH + coachH;
  const sleeperTop = flagH + coachH - 8;

  useEffect(() => {
    const measure = () => { if (containerRef.current) setViewW(containerRef.current.clientWidth); };
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const centreX = viewW / 2;
  const coachCentreInTrain = (ci: number) => ci * unit + coachW / 2;
  const xWhenCentred = (ci: number) => centreX - coachCentreInTrain(ci);
  const flagCoachIndex = (idx: number) => idx * 2;

  // Train starts with locomotive at RIGHT edge of viewport
  const startX = viewW - coachW; // locomotive right edge = viewW

  const handleDotClick = useCallback((i: number) => {
    if (lastFlagRef.current === i) lastFlagRef.current = -1;
    jumpToRef.current = i;
  }, []);

  useEffect(() => {
    // Reset to right-edge start (locomotive nose at right side)
    posRef.current = startX;
    lastFlagRef.current = -1;
    hasScrolledRef.current = false;

    // Slower speed: ~0.55 base vs original 0.85
    const baseSpeed = Math.max(0.50, viewW * 0.00060);

    const animate = () => {
      const now = performance.now();

      if (jumpToRef.current !== null) {
        const ci = flagCoachIndex(jumpToRef.current);
        const targetX = xWhenCentred(ci);
        const diff = targetX - posRef.current;
        if (Math.abs(diff) > 2) {
          posRef.current += diff * 0.09;
        } else {
          posRef.current = targetX;
          pauseUntilRef.current = now + 3800;
          updateContentRef.current(jumpToRef.current);
          setActiveIdx(jumpToRef.current);
          lastFlagRef.current = jumpToRef.current;
          jumpToRef.current = null;
        }
      } else {
        const speed = now < pauseUntilRef.current ? baseSpeed * 0.1 : baseSpeed;
        posRef.current -= speed;
      }

      if (trainRef.current) {
        trainRef.current.style.transform = `translateX(${posRef.current}px)`;
      }

      // Detect flags
      for (let i = 0; i < TIMELINE.length; i++) {
        const ci = flagCoachIndex(i);
        const targetX = xWhenCentred(ci);
        if (Math.abs(posRef.current - targetX) < unit * 0.06 && lastFlagRef.current !== i) {
          lastFlagRef.current = i;
          pauseUntilRef.current = now + 3800;
          updateContentRef.current(i);
          setActiveIdx(i);

          // Auto-scroll after last milestone display
          if (i === TIMELINE.length - 1 && !hasScrolledRef.current) {
            hasScrolledRef.current = true;
            setTimeout(() => {
              const section = sectionRef.current?.closest('.ab-section');
              const next = section?.nextElementSibling as HTMLElement | null;
              if (next) next.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 4200);
          }
        }
      }

      // Loop: reset when train leaves screen left
      if (posRef.current < -(trainW + 200)) {
        posRef.current = startX;
        lastFlagRef.current = -1;
        hasScrolledRef.current = false;
        pauseUntilRef.current = 0;
        setActiveIdx(null);
        setDisplayed(null);
        setFading(false);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [viewW, coachW, trainW, unit, startX]);

  const current = displayed !== null ? TIMELINE[displayed] : null;
  const showPlaceholder = displayed === null;
  const contentVisible = displayed !== null && !fading;

  return (
    <div className="rt-section" ref={sectionRef}>
      <div className="rt-card-wrap">
        <div className="rt-card">
          <div className={`rt-card-placeholder-text${showPlaceholder ? '' : ' rt-ph-hidden'}`}>
            <span>  Watch the train pass a milestone  </span>
          </div>
          <div className={`rt-card-content${contentVisible ? ' rt-content-visible' : ''}`}>
            {current && (
              <>
                <div className="rt-card-year">{current.year}</div>
                <div className="rt-card-inner">
                  <div className="rt-card-title">{current.title}</div>
                  <p className="rt-card-body">{current.body}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="rt-track" style={{ height: trackH }} ref={containerRef}>
        <div className="rt-ballast" style={{ top: ballastTop }} />
        <div className="rt-rail rt-rail-1" style={{ top: railTop }} />
        <div className="rt-rail rt-rail-2" style={{ top: railTop + 10 }} />
        <div className="rt-sleepers-row" style={{ top: sleeperTop }}>
          {Array.from({ length: Math.ceil(viewW / 34) + 2 }).map((_, i) => (
            <div key={i} className="rt-sleeper" style={{ left: i * 34 }} />
          ))}
        </div>
        <div className="rt-fade-left" style={{ top: flagH }} />
        <div className="rt-fade-left-edge" style={{ top: flagH }} />

        <div ref={trainRef} className="rt-train"
          style={{ top: flagH, transform: `translateX(${startX}px)`, gap }}>
          {Array.from({ length: TOTAL_COACHES }).map((_, ci) => {
            const isEngine = ci === 0;
            const isLastCoach = ci === TOTAL_COACHES - 1;
            const timelineIdx = (!isLastCoach && ci % 2 === 0) ? ci / 2 : -1;
            const hasFlag = timelineIdx >= 0 && timelineIdx < TIMELINE.length;
            const flagEntry = hasFlag ? TIMELINE[timelineIdx] : null;
            const isFlagActive = displayed !== null && flagCoachIndex(displayed) === ci;

            return (
              <div key={ci} className="rt-coach-wrap" style={{ width: coachW, height: coachH, flexShrink: 0 }}>
                {hasFlag && flagEntry && (
                  <div className={`rt-flag${isFlagActive ? ' rt-flag-active' : ''}`}
                    style={{ width: coachW * 0.24, minWidth: 62, height: flagH }}>
                    <FlagSVG year={flagEntry.year} active={isFlagActive} />
                  </div>
                )}
                {isLastCoach && (
                  <div className="rt-flag" style={{ width: coachW * 0.24, minWidth: 62, height: flagH }}>
                    <ComingSoonFlagSVG />
                  </div>
                )}
                <div className="rt-coach-svg" style={{ width: coachW, height: coachH }}>
                  {isEngine ? (<><LocomotiveSVG w={coachW} h={coachH} /><SmokeParticles /></>)
                    : isLastCoach ? (<FutureCoachSVG w={coachW} h={coachH} />)
                      : (<CoachSVG w={coachW} h={coachH} coachNum={ci} />)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Clickable year dots fully golden, always visible */}
      <div className="rt-dots">
        {TIMELINE.map((t, i) => (
          <div
            key={i}
            className={`rt-dot-item${displayed === i ? ' rt-dot-active' : ''}`}
            onClick={() => handleDotClick(i)}
            style={{ cursor: 'pointer' }}
            title={`Go to ${t.year}`}
          >
            <div className="rt-dot" />
            <span className="rt-dot-yr">{t.year}</span>
          </div>
        ))}
      </div>
    </div>
  );
}