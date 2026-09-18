import ServiceSection from '@/components/HomePage/ServicesSection';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// ─── Types ────────────────────────────────────────────────────────────────────
interface PhotographyPageProps {
  heroImageUrl?: string;
}

// ─── Category data ────────────────────────────────────────────────────────────
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

const CATEGORY_NAMES = Object.keys(CATEGORY_IMAGES);
const CATEGORIES = ['All', ...CATEGORY_NAMES];

function mobileLabel(cat: string): string {
  if (!cat.includes(' ') || cat.length <= 11) return cat;
  return cat.split(' ')[0];
}
const MOBILE_CATEGORIES = CATEGORIES.map(mobileLabel);

// ─── Typewriter hook ──────────────────────────────────────────────────────────
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
      if (!deletingRef.current) {
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

// ─── Main Component ───────────────────────────────────────────────────────────
const PhotographyPage: React.FC<PhotographyPageProps> = ({
  heroImageUrl = 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/photographyimg.webp',
}) => {
  const navigate = useNavigate();

  // ── Portfolio section state ──
  const [allCatIdx, setAllCatIdx] = useState(0);
  const [allVisible, setAllVisible] = useState(true);
  const [catImgIdx, setCatImgIdx] = useState(0);
  const [catImgVisible, setCatImgVisible] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [catLabelVisible, setCatLabelVisible] = useState(true);
  const [gridVisible, setGridVisible] = useState(true);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  // ── Intro section state ──
  const [introVisible, setIntroVisible] = useState(false);
  const introRef = useRef<HTMLDivElement>(null);

  const mobileDropdownRef = useRef<HTMLDivElement>(null);
  const typewriterText = useTypewriter(MOBILE_CATEGORIES, mobileDropdownOpen);

  // ── Intersection observer for intro section ──
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIntroVisible(true); },
      { threshold: 0.18 }
    );
    if (introRef.current) obs.observe(introRef.current);
    return () => obs.disconnect();
  }, []);

  // ── Auto-cycle All category ──
  useEffect(() => {
    if (activeCategory !== 'All') return;
    const timer = setInterval(() => {
      setAllVisible(false);
      setTimeout(() => { setAllCatIdx(prev => (prev + 1) % CATEGORY_NAMES.length); setAllVisible(true); }, 500);
    }, 4000);
    return () => clearInterval(timer);
  }, [activeCategory]);

  // ── Auto-cycle category images ──
  useEffect(() => {
    if (activeCategory === 'All') return;
    const timer = setInterval(() => {
      setCatImgVisible(false);
      setTimeout(() => { setCatImgIdx(prev => (prev + 1) % 5); setCatImgVisible(true); }, 500);
    }, 3000);
    return () => clearInterval(timer);
  }, [activeCategory]);

  // ── Close mobile dropdown on outside click ──
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(e.target as Node))
        setMobileDropdownOpen(false);
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
  const overlayText = activeCategory === 'All' ? currentCatName : activeCategory;
  const overlayVisible = activeCategory === 'All' ? allVisible : catLabelVisible;
  const catImages = activeCategory !== 'All' ? CATEGORY_IMAGES[activeCategory] : [];
  const catLeftSrc = catImages[catImgIdx];
  const catRightSrc = catImages[catImgIdx + 5];

  return (
    <div className="photography-page">
      <style>{`

        *{margin:0;padding:0;box-sizing:border-box;}
        html,body{overflow-x:hidden;}

        .photography-page{
          width:100%;background:#000;position:relative;
          font-family:'Libre Baskerville',serif;
          padding-top: 80px;
        }
        .photography-page::before{
          content:'';position:fixed;inset:0;
          background:
            radial-gradient(circle at 20% 30%,rgba(212,175,55,.08) 0%,transparent 50%),
            radial-gradient(circle at 80% 70%,rgba(25,25,112,.15) 0%,transparent 50%);
          pointer-events:none;z-index:1;
        }

        /* ═══════════════════════════════════════════════════
           SECTION 1 INTRO  (text left · image right)
        ═══════════════════════════════════════════════════ */
        .intro-section{
          width:100%;min-height:min(100vh, var(--hero-max));position:relative;z-index:2;
          display:flex;align-items:center;justify-content:center;
          padding:100px 80px;overflow:hidden;
        }

        /* Grain texture overlay */
        .intro-section::after{
          content:'';position:absolute;inset:0;pointer-events:none;z-index:0;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          opacity:.5;
        }

        .intro-inner{
          width:100%;max-width:1280px;display:grid;
          grid-template-columns:1fr 1fr;gap:90px;
          align-items:center;position:relative;z-index:1;
        }

        /* ── Left: text ── */
        .intro-text-col{
          display:flex;flex-direction:column;gap:32px;
          opacity:0;transform:translateX(-60px);
          transition:opacity .9s ease, transform .9s ease;
        }
        .intro-text-col.revealed{
          opacity:1;transform:translateX(0);
        }

        .intro-eyebrow{
          display:inline-flex;align-items:center;gap:12px;
          font-family:'Libre Baskerville',serif;font-size:.7rem;font-weight:600;
          letter-spacing:.32em;text-transform:uppercase;
          color:rgba(212,175,55,.7);
        }
        .intro-eyebrow::before{
          content:'';flex-shrink:0;width:40px;height:1px;
          background:linear-gradient(90deg,transparent,#d4af37);
        }

        .intro-heading{
          font-family:'Libre Baskerville',serif;
          font-size:clamp(3rem,5vw,5.2rem);font-weight:900;
          line-height:1.0;color:#f4e4a6;
          letter-spacing:-1px;
        }
        .intro-heading em{
          font-style:normal;
          background:linear-gradient(135deg,#d4af37 0%,#f4e5b8 50%,#d4af37 100%);
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
          display:block;
        }

        .intro-rule{
          width:60px;height:2px;
          background:linear-gradient(90deg,#d4af37,rgba(212,175,55,.2));
          border-radius:2px;
        }

        .intro-body{
          font-family:'Libre Baskerville',serif;font-size:1.1rem;
          font-weight:400;line-height:1.85;
          color:rgba(244,228,166,.72);letter-spacing:.02em;
        }
        .intro-body strong{
          color:#d4af37;font-weight:600;
        }

        .intro-stats{
          display:flex;gap:40px;padding-top:8px;
        }
        .stat-item{display:flex;flex-direction:column;gap:4px;}
        .stat-number{
          font-family:'Libre Baskerville',serif;font-size:2rem;font-weight:700;
          background:linear-gradient(135deg,#d4af37,#f4e5b8);
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
          line-height:1;
        }
        .stat-label{
          font-family:'Libre Baskerville',serif;font-size:.82rem;
          letter-spacing:.2em;text-transform:uppercase;
          color:rgba(212,175,55,.55);
        }

        .intro-cta{
          display:inline-flex;align-items:center;gap:14px;
          padding:.75rem 2rem;border-radius:50px;cursor:pointer;
          font-family:'Libre Baskerville',serif;font-size:.72rem;font-weight:600;
          letter-spacing:.08em;text-transform:uppercase;
          color:#7a5c0e;-webkit-text-fill-color:#7a5c0e;
          background:linear-gradient(145deg,#fdf5e0 0%,#f2df9a 45%,#e8c96e 100%);
          border:1.5px solid rgba(212,175,55,.5);
          box-shadow:rgba(139,105,20,.42) 0 20px 30px -10px,rgba(0,0,0,.5) 0 8px 18px -5px,inset 0 1px 0 rgba(255,255,255,.55);
          transition:box-shadow .22s cubic-bezier(.23,1,.32,1),background .22s cubic-bezier(.23,1,.32,1);
          align-self:flex-start;
        }
        .intro-cta:hover{
          background:linear-gradient(145deg,#fffde8 0%,#f7e8a0 45%,#f0d35a 100%);
          box-shadow:rgba(212,175,55,.55) 0 28px 40px -8px,rgba(0,0,0,.52) 0 16px 28px -6px,inset 0 1px 0 rgba(255,255,255,.65);
        }
        .intro-cta-arrow{
          font-size:1rem;transition:transform .3s ease;
        }
        .intro-cta:hover .intro-cta-arrow{transform:translateX(5px);}

        /* ── Right: image ── */
        .intro-image-col{
          position:relative;
          opacity:0;transform:translateX(60px);
          transition:opacity .9s ease .2s, transform .9s ease .2s;
        }
        .intro-image-col.revealed{opacity:1;transform:translateX(0);}

        .intro-img-frame{
          position:relative;border-radius:4px;overflow:visible;
        }
        /* Decorative border offset */
        .intro-img-frame::before{
          content:'';position:absolute;
          top:-16px;right:-16px;bottom:16px;left:16px;
          border:1.5px solid rgba(212,175,55,.35);
          border-radius:4px;pointer-events:none;z-index:0;
        }
        /* Gold corner accents */
        .intro-img-frame::after{
          content:'';position:absolute;
          top:-16px;right:-16px;
          width:50px;height:50px;
          border-top:2.5px solid #d4af37;
          border-right:2.5px solid #d4af37;
          border-radius:0 4px 0 0;
          pointer-events:none;z-index:2;
        }
        .corner-bl{
          position:absolute;bottom:16px;left:16px;
          width:50px;height:50px;
          border-bottom:2.5px solid #d4af37;
          border-left:2.5px solid #d4af37;
          border-radius:0 0 0 4px;
          pointer-events:none;z-index:2;
        }

        .intro-img-main{
          width:100%;aspect-ratio:4/5;object-fit:cover;
          display:block;border-radius:4px;position:relative;z-index:1;
          box-shadow:0 40px 100px rgba(0,0,0,.8),0 0 0 1px rgba(212,175,55,.15);
          filter:brightness(.92) contrast(1.06) saturate(.9);
        }

        /* Floating label badge */
        .intro-badge{
          position:absolute;bottom:-22px;left:-22px;z-index:3;
          background:linear-gradient(135deg,#0a0a0a,#1a1a1a);
          border:1px solid rgba(212,175,55,.4);border-radius:6px;
          padding:14px 18px;
          box-shadow:0 20px 60px rgba(0,0,0,.7),0 0 20px rgba(212,175,55,.15);
        }
        .badge-number{
          font-family:'Libre Baskerville',serif;font-size:1.6rem;font-weight:700;
          background:linear-gradient(135deg,#d4af37,#f4e5b8);
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
          line-height:1;display:block;
        }
        .badge-text{
          font-family:'Libre Baskerville',serif;font-size:.72rem;
          letter-spacing:.18em;text-transform:uppercase;
          color:rgba(212,175,55,.6);margin-top:4px;white-space:nowrap;
        }

        /* Vertical text along right edge */
        .intro-vertical-text{
          position:absolute;right:-38px;top:50%;
          transform:translateY(-50%) rotate(90deg);
          transform-origin:center center;
          font-family:'Libre Baskerville',serif;font-size:.6rem;
          letter-spacing:.35em;text-transform:uppercase;
          color:rgba(212,175,55,.35);white-space:nowrap;
        }

        /* ═══════════════════════════════════════════════════
           GOLDEN DIVIDER
        ═══════════════════════════════════════════════════ */
        .page-divider{
          width:100%;height:2px;position:relative;z-index:2;
          background:linear-gradient(to right,transparent 0%,rgba(212,175,55,.3) 20%,rgba(212,175,55,.8) 50%,rgba(212,175,55,.3) 80%,transparent 100%);
          box-shadow:0 0 20px rgba(212,175,55,.4);margin:0;
        }
        .page-divider::before,.page-divider::after{
          content:'';position:absolute;top:50%;width:10px;height:10px;
          background:#d4af37;border-radius:50%;transform:translateY(-50%);
          box-shadow:0 0 15px rgba(212,175,55,.6);
        }
        .page-divider::before{left:60px;}
        .page-divider::after{right:60px;}

        /* ═══════════════════════════════════════════════════
           SECTION 2 PORTFOLIO (from original component)
        ═══════════════════════════════════════════════════ */
        .photography-section{
          width:100%;min-height:85vh;position:relative;
          display:flex;flex-direction:column;z-index:2;
          padding-bottom:100px;
        }
        .section-header{
          padding:60px 20px 10px;z-index:10;flex-shrink:0;
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

        /* Desktop filter row */
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

        /* Action button */
        .action-btn{
          padding:.65rem 2.2rem;
          font-family:'Libre Baskerville',serif;font-size:.75rem;font-weight:600;
          color:#7a5c0e;-webkit-text-fill-color:#7a5c0e !important;
          background:linear-gradient(145deg,#fdf5e0 0%,#f2df9a 45%,#e8c96e 100%);
          border:1.5px solid rgba(212,175,55,.5);border-radius:50px;cursor:pointer;
          letter-spacing:.6px;text-transform:uppercase;
          box-shadow:rgba(139,105,20,.42) 0 20px 30px -10px,rgba(0,0,0,.5) 0 8px 18px -5px,inset 0 1px 0 rgba(255,255,255,.55);
          transition:box-shadow .22s cubic-bezier(.23,1,.32,1),background .22s cubic-bezier(.23,1,.32,1),border-color .22s cubic-bezier(.23,1,.32,1);
          position:relative;white-space:nowrap;overflow:hidden;
        }
        .action-btn::after{
          content:'';display:block;height:100%;width:100%;border-radius:100px;
          position:absolute;top:0;left:0;z-index:-1;background:#f0d96a;transition:all .4s;
        }
        .action-btn:hover{
          background:linear-gradient(145deg,#fffde8 0%,#f7e8a0 45%,#f0d35a 100%) !important;
          color:#7a5c0e !important;-webkit-text-fill-color:#7a5c0e !important;
          border-color:rgba(212,175,55,.75);
          box-shadow:rgba(212,175,55,.55) 0 28px 40px -8px,rgba(0,0,0,.52) 0 16px 28px -6px,inset 0 1px 0 rgba(255,255,255,.65);
        }
        .action-btn:hover::after{transform:scaleX(1.4) scaleY(1.6);opacity:0;}
        .action-btn:active{
          box-shadow:rgba(139,105,20,.3) 0 10px 18px -8px,rgba(0,0,0,.4) 0 4px 10px -4px,inset 0 1px 0 rgba(255,255,255,.4);
        }

        /* Mobile dropdown */
        .mob-filter-wrap{ display:none; }
        @media(max-width:768px){
          .mob-filter-wrap{ display:block;width:100%;padding:10px 20px 0; }
        }
        .mob-trigger-row{ display:flex;align-items:center;gap:14px;padding-bottom:6px; }

        @keyframes clickHerePulseMobile{
          0%,100%{ background:#F5F5DC;box-shadow:0 0 30px rgba(245,245,220,.5),0 0 12px rgba(245,245,220,.25);color:#43230F;transform:scale(1); }
          50%    { background:linear-gradient(270deg,#E3C766 0%,#F4E5B8 60%);box-shadow:0 0 40px rgba(212,175,55,.8),0 0 16px rgba(212,175,55,.5);color:#43230F;transform:scale(1.02); }
        }
        .mob-click-btn{
          flex-shrink:0;border:none;outline:none;cursor:default;
          text-transform:uppercase;letter-spacing:.05em;
          font-family:'Libre Baskerville',serif;font-weight:700;
          pointer-events:none;border-radius:.4rem;white-space:nowrap;
          background:#F5F5DC;color:#43230F;
          animation:clickHerePulseMobile 3s ease-in-out infinite;
          font-size:.58rem;padding:.42rem .8rem;
          -webkit-box-reflect:below 5px linear-gradient(to bottom,rgba(0,0,0,0),rgba(0,0,0,.2));
        }
        @keyframes blink{0%,50%{opacity:1}51%,100%{opacity:0}}
        .mob-dd-trigger{
          display:inline-flex;align-items:center;
          font-family:'Libre Baskerville',serif;font-weight:700;
          border:none;outline:none;cursor:pointer;
          font-size:clamp(1.05rem,4.2vw,1.28rem);line-height:1.2;padding:0;
          background:transparent;flex:1;min-width:0;overflow:hidden;
        }
        .mob-dd-trigger-text{
          background:linear-gradient(90deg,#d4af37,#f4e5b8,#d4af37);
          -webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;
          white-space:nowrap;overflow:hidden;max-width:100%;
        }
        .mob-typing-cursor{
          display:inline-block;flex-shrink:0;animation:blink 1s step-end infinite;
          margin-left:2px;-webkit-text-fill-color:#d4af37;color:#d4af37;
          font-size:clamp(1.05rem,4.2vw,1.28rem);line-height:1.2;
        }
        .mob-dd-body{ overflow:hidden;max-height:0;opacity:0;transition:max-height .38s cubic-bezier(.4,0,.2,1),opacity .28s ease; }
        .mob-dd-body.mob-dd-open{ max-height:440px;opacity:1; }
        .mob-ddpanel{
          margin:6px 0 14px 0;border-radius:12px;overflow:hidden;
          border:1px solid rgba(212,175,55,.35);
          box-shadow:0 16px 48px rgba(0,0,0,.9),0 6px 20px rgba(212,175,55,.25);
          backdrop-filter:blur(10px);
          background:linear-gradient(135deg,rgba(13,27,46,.98),rgba(10,22,40,.98));
        }
        .mob-ddopt{
          width:100%;padding:12px 18px;text-align:left;background:transparent;border:none;cursor:pointer;
          font-family:'Libre Baskerville',serif;font-size:13px;font-weight:500;color:#cbd5e1;
          transition:all .2s ease;display:flex;align-items:center;justify-content:space-between;
        }
        .mob-ddopt + .mob-ddopt{ border-top:1px solid rgba(212,175,55,.1); }
        .mob-ddopt:hover{ background:rgba(212,175,55,.07);color:#fff; }
        .mob-ddopt.mob-ddactive{
          background:linear-gradient(90deg,#d4af37,#f4e5b8,#d4af37);
          -webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;font-weight:700;
        }
        .mob-ddopt.mob-ddactive::after{
          content:'';width:8px;height:8px;border-radius:50%;
          background:#d4af37;box-shadow:0 0 10px rgba(212,175,55,.9);
          flex-shrink:0;margin-left:8px;display:inline-block;
        }

        /* Slideshow */
        .split-slideshow-container{ position:relative;width:100%;height:70vh;overflow:hidden;transition:opacity .35s ease; }
        .split-slideshow-container.grid-hidden{ opacity:0; }
        .all-panels{ display:flex;width:100%;height:100%; }
        .all-panel{ width:50%;height:100%;position:relative;overflow:hidden; }
        .all-panel-img{
          width:100%;height:100%;object-fit:cover;display:block;
          position:absolute;inset:0;transition:opacity .55s ease,transform .55s ease;
        }
        .all-panel-img.visible     { opacity:1;transform:translateY(0) scale(1); }
        .all-panel-img.hidden-up   { opacity:0;transform:translateY(-28px) scale(1.03); }
        .all-panel-img.hidden-down { opacity:0;transform:translateY(28px) scale(1.03); }

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
        .photo-nav-dot.active::before{ transform:scaleY(1); }
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
        .cat-img-dot.active::before{ transform:scaleY(1); }
        .photo-button-container{
          position:absolute;bottom:35px;left:50%;transform:translateX(-50%);z-index:110;
        }

        /* ── Responsive ── */
        @media(max-width:1024px){
          .intro-section{ padding:80px 50px; }
          .intro-inner{ gap:60px; }
        }
        @media(max-width:768px){
          .intro-section{ padding:60px 24px;min-height:auto; }
          .intro-inner{ grid-template-columns:1fr;gap:50px; }
          .intro-image-col{ order:-1; }
          .intro-img-frame::after{ display:none; }
          .intro-img-frame::before{ top:-10px;right:-10px;bottom:10px;left:10px; }
          .corner-bl{ bottom:10px;left:10px; }
          .intro-vertical-text{ display:none; }
          .intro-badge{ bottom:-14px;left:-10px;padding:10px 14px; }
          .badge-number{ font-size:1.2rem; }
          .photography-section{ min-height:70vh;padding-bottom:80px; }
          .section-title{ font-size:2.5rem;letter-spacing:2px; }
          .split-slideshow-container{ height:auto;aspect-ratio:4/3; }
          .all-panels{ flex-direction:column; }
          .all-panel{ width:100%;height:50%; }
          .slide-text-item{ font-size:2rem;letter-spacing:4px;white-space:normal;line-height:1.2; }
          .photo-navigation{ right:10px;gap:10px; }
          .cat-img-dots{ right:10px;gap:10px; }
          .photo-nav-dot{ width:6px;height:24px; }
          .cat-img-dot{ width:6px;height:24px; }
          .photo-button-container{ bottom:20px;width:100%;display:flex;justify-content:center; }
          .page-divider::before{ left:14px; }
          .page-divider::after{ right:14px; }
        }
        @media(max-width:480px){
          .intro-heading{ font-size:2.6rem; }
          .intro-body{ font-size:1.05rem; }
          .intro-stats{ gap:24px; }
          .section-title{ font-size:1.9rem; }
          .slide-text-item{ font-size:1.4rem;letter-spacing:2px; }
          .action-btn{ font-size:.56rem;padding:.36rem .7rem; }
        }
        @media(hover:none) and (pointer:coarse){
          .intro-cta:hover{ background:linear-gradient(145deg,#fdf5e0 0%,#f2df9a 45%,#e8c96e 100%); }
        }
      `}</style>

      {/* ══════════════════════════════════════════════════
          SECTION 1 INTRO
      ══════════════════════════════════════════════════ */}
      <section className="intro-section" ref={introRef}>
        <div className="intro-inner">

          {/* Left: text */}
          <div className={`intro-text-col${introVisible ? ' revealed' : ''}`}>
            <span className="intro-eyebrow">The Art of Seeing</span>

            <h2 className="intro-heading">
              Every Frame<br />
              <em>Tells a Story</em>
            </h2>

            <div className="intro-rule" />

            <p className="intro-body">
              Photography is more than a click of a shutter it is the art of{' '}
              <strong>freezing time</strong>, of finding beauty in the ordinary, and turning
              fleeting moments into <strong>timeless memories</strong>. From the golden hour
              glow on a bridal veil to the raw emotion of a candid portrait, every image
              we create is a collaboration between light, shadow, and soul.
            </p>

            <p className="intro-body">
              With a decade of experience across{' '}
              <strong>weddings, real estate, editorial, and commercial</strong> photography,
              our studio brings a cinematic eye and meticulous post-production to every project.
              We don't just capture what's there we reveal what's possible.
            </p>

            <div className="intro-stats">
              <div className="stat-item">
                <span className="stat-number">800+</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">8</span>
                <span className="stat-label">Specialities</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">10+</span>
                <span className="stat-label">Years</span>
              </div>
            </div>

            <button className="intro-cta" onClick={() => navigate('/contact-us')}>
              Book a Session
              <span className="intro-cta-arrow">→</span>
            </button>
          </div>

          {/* Right: image replace src with your own */}
          <div className={`intro-image-col${introVisible ? ' revealed' : ''}`}>
            <div className="intro-img-frame">
              <img
                className="intro-img-main"
                src={heroImageUrl}
                alt="Photography showcase"
              />
              <div className="corner-bl" />

              <div className="intro-badge">
                <span className="badge-number">4.9★</span>
                <span className="badge-text">Client Rating</span>
              </div>

              <span className="intro-vertical-text">LIGHT · MOMENT · TRUTH</span>
            </div>
          </div>

        </div>
      </section>

      {/* Divider */}
      <div className="page-divider" />

      {/* ══════════════════════════════════════════════════
          SECTION 2 PORTFOLIO GALLERY
      ══════════════════════════════════════════════════ */}
      <div className="photography-section">
        <div className="section-header">
          <h1 className="section-title">Photography</h1>
        </div>

        {/* Desktop filter buttons */}
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

        {/* Mobile in-flow dropdown */}
        <div className="mob-filter-wrap" ref={mobileDropdownRef}>
          <div className="mob-trigger-row">
            <button className="mob-click-btn" disabled>CLICK HERE →</button>
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
            <div className="mob-ddpanel" role="listbox">
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

        {/* Slideshow */}
        <div className={`split-slideshow-container${gridVisible ? '' : ' grid-hidden'}`}>
          {activeCategory === 'All' ? (
            <div className="all-panels">
              <div className="all-panel">
                <img
                  key={`lp-${allCatIdx}`}
                  className={`all-panel-img ${allVisible ? 'visible' : 'hidden-up'}`}
                  src={currentCatImgs[0]}
                  alt={currentCatName}
                />
              </div>
              <div className="all-panel">
                <img
                  key={`rp-${allCatIdx}`}
                  className={`all-panel-img ${allVisible ? 'visible' : 'hidden-down'}`}
                  src={currentCatImgs[1]}
                  alt={currentCatName}
                />
              </div>
            </div>
          ) : (
            <div className="all-panels">
              <div className="all-panel">
                <img
                  key={`lcat-${activeCategory}-${catImgIdx}`}
                  className={`all-panel-img ${catImgVisible ? 'visible' : 'hidden-up'}`}
                  src={catLeftSrc}
                  alt={`${activeCategory} ${catImgIdx + 1}`}
                />
              </div>
              <div className="all-panel">
                <img
                  key={`rcat-${activeCategory}-${catImgIdx}`}
                  className={`all-panel-img ${catImgVisible ? 'visible' : 'hidden-down'}`}
                  src={catRightSrc}
                  alt={`${activeCategory} ${catImgIdx + 7}`}
                />
              </div>
            </div>
          )}


        </div>

        {activeCategory === 'All' && (
          <div className="photo-navigation">
            {CATEGORY_NAMES.map((_, idx) => (
              <div
                key={idx}
                className={`photo-nav-dot ${allCatIdx === idx ? 'active' : ''}`}
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
            {[0, 1, 2, 3, 4, 5].map(idx => (
              <div key={idx} className={`cat-img-dot ${catImgIdx === idx ? 'active' : ''}`} />
            ))}
          </div>
        )}

        <div className="photo-button-container">
          <button className="action-btn">View Gallery</button>
        </div>
      </div>
      <ServiceSection />
    </div>
  );
};

export default PhotographyPage;