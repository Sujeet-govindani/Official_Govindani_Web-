import { useState, useEffect, useRef, useCallback } from "react";
import PortfolioSection from "@/components/HomePage/PortfolioSection";
import ContactUsForm from "@/pages/ContactUsForm";


const isTouchDevice = () =>
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

function SearchBar({ query, onChange, placeholder = "Search projects...", prefix = "bw" }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className={`${prefix}-search-bar-wrap ${focused ? "focused" : ""}`} style={{ marginTop: "60px" }}>
      <div className={`${prefix}-search-bar`}>
        <svg className={`${prefix}-search-icon`} width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <input
          className={`${prefix}-search-input`}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          autoComplete="off"
          spellCheck={false}
        />
        {query && (
          <button className={`${prefix}-search-clear`} onClick={() => onChange("")} type="button" aria-label="Clear">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>
      {query && (
        <p className={`${prefix}-search-hint`}>
          Showing results for <em>"{query}"</em>
        </p>
      )}
    </div>
  );
}

function MobileCard({ project, index }) {
  const cardRef = useRef(null);
  const scrollRef = useRef(null);
  const lastTapRef = useRef(0);
  const tapTimerRef = useRef(null);
  const scrollAnimRef = useRef(0);
  const [visible, setVisible] = useState(false);
  const [hintVisible, setHintVisible] = useState(true);
  const [hintPulse, setHintPulse] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onInnerScroll = () => {
      if (!scrolled) { setScrolled(true); setHintVisible(false); }
    };
    el.addEventListener("scroll", onInnerScroll, { passive: true });
    return () => el.removeEventListener("scroll", onInnerScroll);
  }, [scrolled]);

  const triggerScrollHint = useCallback(() => {
    const el = scrollRef.current;
    if (!el || scrolled) return;
    setHintPulse(true);
    setTimeout(() => setHintPulse(false), 600);
    let progress = 0;
    const target = 130;
    const goDown = () => {
      progress += (target - progress) * 0.14;
      el.scrollTop = progress;
      if (target - progress > 0.8) {
        scrollAnimRef.current = requestAnimationFrame(goDown);
      } else {
        el.scrollTop = target;
        setTimeout(() => {
          const goUp = () => {
            el.scrollTop = el.scrollTop * 0.84;
            if (el.scrollTop > 0.5) scrollAnimRef.current = requestAnimationFrame(goUp);
            else el.scrollTop = 0;
          };
          scrollAnimRef.current = requestAnimationFrame(goUp);
        }, 520);
      }
    };
    cancelAnimationFrame(scrollAnimRef.current);
    scrollAnimRef.current = requestAnimationFrame(goDown);
  }, [scrolled]);

  useEffect(() => () => {
    cancelAnimationFrame(scrollAnimRef.current);
    if (tapTimerRef.current) clearTimeout(tapTimerRef.current);
  }, []);

  const handleTap = useCallback((e) => {
    if (e.type === "touchend") e.preventDefault();
    const now = Date.now();
    const gap = now - lastTapRef.current;
    lastTapRef.current = now;
    if (gap < 320 && gap > 0) {
      if (tapTimerRef.current) clearTimeout(tapTimerRef.current);
      cancelAnimationFrame(scrollAnimRef.current);
      window.open(project.url, "_blank", "noopener,noreferrer");
    } else {
      if (tapTimerRef.current) clearTimeout(tapTimerRef.current);
      tapTimerRef.current = setTimeout(() => triggerScrollHint(), 200);
    }
  }, [project.url, triggerScrollHint]);

  return (
    <div
      ref={cardRef}
      className="mob-card-anim"
      style={{
        transitionDelay: `${(index % 3) * 0.08}s`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(48px) scale(0.95)",
      }}
    >
      <div className="mob-img-outer">
        <div ref={scrollRef} className="mob-scroll-container" onTouchEnd={handleTap} onClick={handleTap}>
          <div className="mob-img-wrap">
            <img src={project.image} alt={project.title} className="mob-img" draggable={false} loading="lazy" decoding="async" />
          </div>
        </div>
        <div className={`mob-shine ${visible ? "mob-shine-run" : ""}`} />
        <div className="mob-grad-top" />
        <div className="mob-grad-bot" />
        <div className="mob-badge">{project.category.toUpperCase()}</div>
        {hintVisible && (
          <div className={`mob-hint ${hintPulse ? "mob-hint-pulse" : ""}`}>
            <span className="mob-hint-scroll">
              <svg width="13" height="20" viewBox="0 0 13 20" fill="none">
                <rect x="1" y="1" width="11" height="16" rx="5.5" stroke="currentColor" strokeWidth="1.4" />
                <line x1="6.5" y1="4" x2="6.5" y2="8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>Scroll
            </span>
            <span className="mob-hint-divider">·</span>
            <span className="mob-hint-dbl">
              <svg className="tap-ico" width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M8.2 6.4a5.4 5.4 0 0 1 7.6 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity=".6"/>
                <path d="M5.6 3.9a9 9 0 0 1 12.8 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity=".3"/>
                <path d="M12.9 9.6v5.1l-1.7-1.3-1.3 1.2 2.8 3.4a2.6 2.6 0 0 0 2 .95h2.7a2.6 2.6 0 0 0 2.6-2.6v-3.1a1.7 1.7 0 0 0-1.37-1.67l-3.4-.7V9.6a1.15 1.15 0 0 0-2.3 0Z" fill="currentColor"/>
              </svg>Double tap to visit
            </span>
          </div>
        )}
        <div className="mob-info">
          <h3 className="mob-title">{project.title}</h3>
          <span className="mob-arrow">↗</span>
        </div>
        <div className="mob-scroll-track"><div className="mob-scroll-dot" /></div>
      </div>
    </div>
  );
}

function DesktopCard({ project, index, isVisible }) {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const scrollAnimRef = useRef(0);
  const cursorAnimRef = useRef(0);
  const [cursor, setCursor] = useState({ x: 0, y: 0, opacity: 0 });

  const animateCursor = useCallback(() => {
    cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.12;
    cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.12;
    setCursor(prev => ({ ...prev, x: cursorPos.current.x, y: cursorPos.current.y }));
    cursorAnimRef.current = requestAnimationFrame(animateCursor);
  }, []);

  const animateScrollReset = useCallback(() => {
    if (!scrollRef.current) return;
    const cur = scrollRef.current.scrollTop;
    if (cur > 0.5) {
      scrollRef.current.scrollTop = cur * 0.88;
      scrollAnimRef.current = requestAnimationFrame(animateScrollReset);
    } else { scrollRef.current.scrollTop = 0; }
  }, []);

  const handleMouseEnter = useCallback(() => {
    cancelAnimationFrame(scrollAnimRef.current);
    setCursor(prev => ({ ...prev, opacity: 1 }));
    cursorAnimRef.current = requestAnimationFrame(animateCursor);
  }, [animateCursor]);

  const handleMouseLeave = useCallback(() => {
    cancelAnimationFrame(cursorAnimRef.current);
    setCursor(prev => ({ ...prev, opacity: 0 }));
    scrollAnimRef.current = requestAnimationFrame(animateScrollReset);
  }, [animateScrollReset]);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mousePos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  useEffect(() => () => {
    cancelAnimationFrame(cursorAnimRef.current);
    cancelAnimationFrame(scrollAnimRef.current);
  }, []);

  return (
    <div className={`bw-card-anim ${isVisible ? "visible" : ""}`} style={{ transitionDelay: `${index * 0.1}s` }}>
      <div
        ref={containerRef}
        className="bw-card-outer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onClick={() => window.open(project.url, "_blank", "noopener,noreferrer")}
      >
        <div ref={scrollRef} className="bw-card-inner-scroll">
          <div className="bw-card-img-wrap">
            <img src={project.image} alt={project.title} className="bw-card-img" draggable={false} loading="lazy" decoding="async" />
          </div>
          <div className="bw-card-grad-top" />
          <div className="bw-card-grad-bot" />
          <div className="bw-cat-badge">{project.category.toUpperCase()}</div>
          <div className="bw-scroll-bar"><div className="bw-scroll-bar-fill" /></div>
          <div className="bw-card-info">
            <h3 className="bw-card-title">{project.title}</h3>
            <span className="bw-card-arrow">↗</span>
          </div>
        </div>
        <div className="bw-custom-cursor" style={{ left: cursor.x, top: cursor.y, opacity: cursor.opacity }}>
          <div className="bw-cursor-circle">
            <svg width="18" height="26" viewBox="0 0 18 26" fill="none">
              <rect x="1" y="1" width="16" height="22" rx="8" stroke="white" strokeWidth="1.5" />
              <line x1="9" y1="5" x2="9" y2="10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnimatedCard({ project, index, isVisible }) {
  const [touch, setTouch] = useState(false);
  useEffect(() => { setTouch(isTouchDevice()); }, []);
  return touch
    ? <MobileCard project={project} index={index} />
    : <DesktopCard project={project} index={index} isVisible={isVisible} />;
}

const BusinessWebsitesPage = () => {
  const [sec3Visible, setSec3Visible] = useState(false);
  const [sec4Visible, setSec4Visible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const sec3Ref = useRef(null);
  const sec4Ref = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const bwProjects = [
    { title: "HAPPILEE DIGITAL INNOVATIONS", category: "business", url: "https://happileedigitalinnovations.com/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/BusinessWebsites/Business-Website-Happili-Digital-Innovations.webp" },
    { title: "Aadev International Trade Solutions", category: "business", url: "https://aadevtrade.com", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/BusinessWebsites/Business-Website-Aadev-International-Trade-Solutions.webp" },
    { title: "MADHAV NUMEROLOGY", category: "business", url: "https://madhavnumerology.com/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/BusinessWebsites/Business-Website-Madhav-Numerology.webp" },
    { title: "DR. C.K. REDDY GROUP", category: "business", url: "https://drckreddygroup.com/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/BusinessWebsites/Business-Website-Dr-C-K-Reddy-Group.webp" },

  ];

  const filteredProjects = bwProjects.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const items = [
      { ref: sec3Ref, setter: setSec3Visible },
      { ref: sec4Ref, setter: setSec4Visible },
    ];
    const obs = items.map(({ ref, setter }) => {
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setter(true); },
        { threshold: 0.08 }
      );
      if (ref.current) o.observe(ref.current);
      return o;
    });
    return () => obs.forEach(o => o.disconnect());
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setSec3Visible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes bwShimmer  { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes bwFloatY   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
        @keyframes bwPulseDot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.45;transform:scale(1.6)} }
        @keyframes bwShineSweep {
          0%{left:-100%;opacity:.55} 60%{left:120%;opacity:.25} 100%{left:120%;opacity:0}
        }
        @keyframes bwHintPulse {
          0%,100%{transform:translateX(-50%) scale(1)} 50%{transform:translateX(-50%) scale(1.06)}
        }
        @keyframes bwTornFlicker {
          0%,100%{filter:drop-shadow(0 0 18px rgba(212,175,55,.3))}
          50%    {filter:drop-shadow(0 0 30px rgba(212,175,55,.58))}
        }

        .bw-page { background:#000; min-height:100vh; overflow-x:hidden; width:100%; }

        /* ════ SEARCH BAR ════ */
        .bw-search-bar-wrap {
          max-width: 520px;
          margin: 0 auto 32px;
          padding: 0 16px;
          width: 100%;
        }
        .bw-search-bar {
          display: flex; align-items: center; gap: 10px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(212,175,55,0.25);
          border-radius: 50px; padding: 12px 20px;
          transition: border-color .3s, box-shadow .3s;
        }
        .bw-search-bar-wrap.focused .bw-search-bar {
          border-color: rgba(212,175,55,0.6);
          box-shadow: 0 0 0 3px rgba(212,175,55,0.08);
        }
        .bw-search-icon { color: rgba(212,175,55,0.7); flex-shrink: 0; }
        .bw-search-input {
          flex: 1; background: transparent; border: none; outline: none;
          font-family: 'Inter', sans-serif; font-size: 14px; color: #fff; min-width: 0;
        }
        .bw-search-input::placeholder { color: rgba(255,255,255,0.35); }
        .bw-search-clear {
          background: rgba(212,175,55,0.12); border: 1px solid rgba(212,175,55,0.25);
          border-radius: 50%; width: 24px; height: 24px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; flex-shrink: 0; color: rgba(212,175,55,0.8);
          transition: background .2s;
        }
        .bw-search-clear:hover { background: rgba(212,175,55,0.22); }
        .bw-search-hint {
          font-family: 'Inter', sans-serif; font-size: 12px;
          color: rgba(255,255,255,0.4); text-align: center; margin-top: 10px;
        }
        .bw-search-hint em { color: rgba(212,175,55,0.7); font-style: normal; }
        .bw-no-results {
          text-align: center; padding: 40px 20px;
          font-family: 'Inter', sans-serif; color: rgba(255,255,255,0.35); font-size: 15px;
        }
        .bw-no-results span { color: rgba(212,175,55,0.6); }

        /* ════ PROJECTS SECTION ════ */
        .bw-projects-section {
          position: relative;
          background: linear-gradient(to bottom, #000, #08070d, #000);
          padding: 70px 28px 60px;
          overflow: hidden;
          width: 100%;
        }
        .bw-projects-section::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse at 50% 0%, rgba(212,175,55,.06) 0%, transparent 55%);
          pointer-events: none;
        }

        /* ── Header ── */
        .bw-projects-header {
          text-align: center; max-width: 740px;
          margin: 0 auto 36px;
          opacity: 0; transform: translateY(28px);
          transition: opacity .75s ease, transform .75s ease;
        }
        .bw-projects-header.visible { opacity: 1; transform: translateY(0); }
        .bw-eyebrow-row {
          display: inline-flex; align-items: center; gap: 10px; margin-bottom: 14px; margin-top: 0px;
        }
        .bw-eyebrow-line { width: 34px; height: 1px; background: linear-gradient(to right, transparent, #d4af37); }
        .bw-eyebrow-line.r { background: linear-gradient(to left, transparent, #d4af37); }
        .bw-eyebrow-text {
          font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 700;
          letter-spacing: .16em; color: #d4af37; text-transform: uppercase;
        }
        .bw-projects-title {
          font-family: 'Libre Baskerville', serif;
          font-size: clamp(1.9rem, 3.8vw, 3rem);
          font-weight: 700; line-height: 1.18; color: #fff; margin-bottom: 8px;
        }
        .bw-projects-title span {
          background: linear-gradient(90deg, #d4af37, #f4e5b8, #d4af37);
          background-size: 200% auto;
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: bwShimmer 4s linear infinite;
        }
        .bw-projects-sub {
          font-family: 'Libre Baskerville', serif; font-style: italic;
          font-size: 1.05rem; color: rgba(212,175,55,.65);
        }

        /* ════ GRID 3 top row, 2 bottom row centered ════ */
        .bw-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Last 2 cards centered when showing all 5 */
        .bw-grid-row2 {
          display: flex;
          justify-content: center;
          gap: 28px;
          max-width: 1200px;
          margin: 28px auto 0;
        }
        .bw-grid-row2 > * {
          width: calc((100% - 28px) / 3);
          max-width: calc((1200px - 56px) / 3);
          flex-shrink: 0;
        }

        /* ── Desktop Cards ── */
        .bw-card-anim {
          opacity: 0; transform: translateY(24px) scale(.97);
          transition: opacity .5s ease, transform .5s ease;
        }
        .bw-card-anim.visible { opacity: 1; transform: translateY(0) scale(1); }
        .bw-card-outer {
          position: relative; height: 380px; border-radius: 16px;
          overflow: hidden; cursor: none; background: #0a0a0a;
          box-shadow: 0 8px 32px rgba(0,0,0,.6);
          transition: box-shadow .3s ease, transform .3s ease;
        }
        .bw-card-inner-scroll {
          position: relative; height: 100%;
          overflow-y: auto; overflow-x: hidden; scrollbar-width: none;
        }
        .bw-card-inner-scroll::-webkit-scrollbar { display: none; }
        .bw-card-img-wrap { position: relative; height: auto; pointer-events: none; }
        .bw-card-img {
          width: 100%; height: 100%; object-fit: cover;
          object-position: top center; display: block; user-select: none;
        }
        .bw-card-grad-top {
          position: sticky; top: 0; left: 0; right: 0; height: 60px; margin-bottom: -60px;
          background: linear-gradient(to bottom, rgba(0,0,0,.6), transparent);
          pointer-events: none; z-index: 3;
        }
        .bw-card-grad-bot {
          position: sticky; bottom: 0; left: 0; right: 0; height: 160px; margin-top: -160px;
          background: linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,.9) 30%, rgba(0,0,0,.55) 65%, transparent 100%);
          pointer-events: none; z-index: 3;
        }
        .bw-cat-badge {
          position: sticky; top: 12px; float: left; margin: -48px 0 0 12px;
          background: rgba(212,175,55,.92); color: #000;
          padding: 4px 13px; border-radius: 50px;
          font-size: 10px; font-weight: 700; letter-spacing: .06em;
          font-family: 'Inter', sans-serif; backdrop-filter: blur(4px);
          z-index: 10; clear: left;
        }
        .bw-scroll-bar {
          position: sticky; bottom: 62px; float: right; margin: 0 10px -24px 0;
          width: 3px; height: 50px; background: rgba(255,255,255,.12);
          border-radius: 2px; overflow: hidden; z-index: 10; clear: right;
        }
        .bw-scroll-bar-fill {
          width: 100%; height: 22%;
          background: linear-gradient(to bottom, #d4af37, #b8912a); border-radius: 2px;
        }
        .bw-card-info {
          position: sticky; bottom: 0; padding: 12px 16px 16px;
          z-index: 10; pointer-events: none;
          display: flex; align-items: flex-end; justify-content: space-between;
        }
        .bw-card-title {
          font-family: 'Libre Baskerville', serif; font-size: 14px; font-weight: 700;
          color: #fff; line-height: 1.3; text-shadow: 0 1px 10px rgba(0,0,0,1);
          transition: color .3s ease;
        }
        .bw-card-arrow {
          font-size: 20px; color: #d4af37;
          text-shadow: 0 0 12px rgba(212,175,55,.8); flex-shrink: 0;
        }
        .bw-card-outer:hover { box-shadow: 0 16px 48px rgba(212,175,55,.2); transform: translateY(-4px); }
        .bw-card-outer::after {
          content: ''; position: absolute; inset: 0; border-radius: 16px;
          border: 2px solid transparent;
          background: linear-gradient(135deg, rgba(212,175,55,.6), transparent 50%, rgba(212,175,55,.3)) border-box;
          -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: destination-out; mask-composite: exclude;
          opacity: 0; transition: opacity .3s ease; pointer-events: none; z-index: 20;
        }
        .bw-card-outer:hover::after { opacity: 1; }
        .bw-card-outer:hover .bw-card-title { color: #f4e5b8; }
        .bw-custom-cursor {
          position: absolute; transform: translate(-50%, -50%);
          pointer-events: none; transition: opacity .3s ease; z-index: 100;
        }
        .bw-cursor-circle {
          width: 48px; height: 48px; border-radius: 50%;
          background: rgba(15,15,15,.8); backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 2px 20px rgba(0,0,0,.4), 0 0 0 1px rgba(212,175,55,.2);
        }

        /* Body text */
        .bw-body-text {
          max-width: 900px; margin: 40px auto 0;
          text-align: center; padding: 0 16px;
          opacity: 0; transform: translateY(24px);
          transition: opacity .7s ease .2s, transform .7s ease .2s;
        }
        .bw-body-text.visible { opacity: 1; transform: translateY(0); }
        .bw-body-para {
          font-family: 'Inter', sans-serif;
          font-size: clamp(.88rem, 1.5vw, 1rem);
          line-height: 1.9; color: rgba(255,255,255,.58);
        }

        /* ════ MOBILE CARDS ════ */
        .mob-card-anim {
          transition: opacity .58s ease, transform .58s cubic-bezier(0.22,1,0.36,1);
          border-radius: 18px; overflow: hidden;
          -webkit-tap-highlight-color: transparent; touch-action: pan-y;
        }
        .mob-img-outer {
          position: relative; height: 300px; border-radius: 18px; overflow: hidden;
          background: #111; border: 2px solid rgba(212,175,55,.4);
          box-shadow: 0 10px 40px rgba(0,0,0,.7), 0 0 0 1px rgba(212,175,55,.1);
        }
        .mob-scroll-container {
          position: absolute; inset: 0; overflow-y: scroll; overflow-x: hidden;
          scrollbar-width: none; -webkit-overflow-scrolling: touch;
          touch-action: pan-y; cursor: pointer; z-index: 2;
        }
        .mob-scroll-container::-webkit-scrollbar { display: none; }
        .mob-img-wrap { height: auto; pointer-events: none; }
        .mob-img { width: 100%; height: auto; object-fit: initial; object-position: top center; display: block; user-select: none; }
        .mob-shine {
          position: absolute; top: 0; left: -100%; bottom: 0; width: 55%;
          background: linear-gradient(105deg, transparent 20%, rgba(255,255,255,.2) 50%, transparent 80%);
          pointer-events: none; z-index: 15; opacity: 0;
        }
        .mob-shine.mob-shine-run { animation: bwShineSweep .9s ease-out .25s forwards; }
        .mob-grad-top {
          position: absolute; top: 0; left: 0; right: 0; height: 64px;
          background: linear-gradient(to bottom, rgba(0,0,0,.6), transparent);
          pointer-events: none; z-index: 5;
        }
        .mob-grad-bot {
          position: absolute; bottom: 0; left: 0; right: 0; height: 170px;
          background: linear-gradient(to top, rgba(0,0,0,.95) 0%, rgba(0,0,0,.7) 35%, rgba(0,0,0,.2) 70%, transparent 100%);
          pointer-events: none; z-index: 5;
        }
        .mob-badge {
          position: absolute; top: 14px; left: 14px;
          background: rgba(212,175,55,.92); color: #000;
          font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 700;
          letter-spacing: .06em; padding: 4px 12px; border-radius: 50px;
          z-index: 10; backdrop-filter: blur(4px);
        }
        .mob-hint {
          position: absolute; bottom: 58px; left: 50%; transform: translateX(-50%);
          display: flex; align-items: center; gap: 8px;
          background: rgba(0,0,0,.72); backdrop-filter: blur(10px);
          border: 1px solid rgba(212,175,55,.3); border-radius: 50px;
          padding: 6px 14px; z-index: 20; pointer-events: none; white-space: nowrap;
        }
        .mob-hint.mob-hint-pulse { animation: bwHintPulse .55s ease; }
        .mob-hint-scroll, .mob-hint-dbl {
          display: flex; align-items: center; gap: 5px;
          font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 600;
          letter-spacing: .04em; color: rgba(244,229,184,.9);
        }
        .mob-hint-divider { color: rgba(212,175,55,.5); font-size: 12px; }
        .mob-scroll-track {
          position: absolute; right: 8px; top: 14px; bottom: 14px;
          width: 3px; background: rgba(255,255,255,.12);
          border-radius: 2px; z-index: 10; pointer-events: none; overflow: hidden;
        }
        .mob-scroll-dot {
          width: 100%; height: 22%;
          background: linear-gradient(to bottom, #d4af37, #b8912a); border-radius: 2px;
        }
        .mob-info {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 14px 14px 18px;
          display: flex; align-items: flex-end; justify-content: space-between;
          z-index: 10; pointer-events: none;
        }
        .mob-title {
          font-family: 'Libre Baskerville', serif; font-size: 14px; font-weight: 700;
          color: #fff; line-height: 1.3; text-shadow: 0 1px 12px rgba(0,0,0,1);
          margin: 0; max-width: 78%;
        }
        .mob-arrow {
          font-size: 20px; color: #d4af37;
          text-shadow: 0 0 14px rgba(212,175,55,.9); flex-shrink: 0; line-height: 1;
        }

        /* ════ CLOSING SECTION ════ */
        .bw-closing-section {
          position: relative; min-height: 500px; display: flex;
          align-items: center; padding: 60px 28px; overflow: hidden;
          background: #000; width: 100%;
        }
        .bw-closing-bg {
          position: absolute; inset: 0;
          background-image: url('https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/business.webp');
          background-size: cover; background-position: center;
          opacity: 0.45; z-index: 0;
        }
        .bw-closing-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to left, rgba(0,0,0,.72) 0%, rgba(0,0,0,.28) 55%, rgba(0,0,0,.65) 100%);
          z-index: 1;
        }
        .bw-closing-particles { position: absolute; inset: 0; pointer-events: none; z-index: 1; }
        .bw-cp {
          position: absolute; width: 2px; height: 2px; border-radius: 50%;
          background: rgba(212,175,55,.5);
          animation: bwFloatY var(--dur, 4s) ease-in-out var(--delay, 0s) infinite;
        }
        .bw-closing-inner {
          position: relative; z-index: 2; max-width: 1200px;
          width: 100%; margin: 0 auto; display: flex; justify-content: flex-end;
        }
        .bw-torn-card {
          position: relative; width: min(500px, 90vw); padding: 48px 44px 44px 36px;
          background: rgba(5,5,5,.74);
          backdrop-filter: blur(10px) saturate(1.4); -webkit-backdrop-filter: blur(10px) saturate(1.4);
          clip-path: polygon(0% 0%, 97% 0%, 100% 7%, 98% 14%, 100% 21%, 97% 28%, 99% 35%, 100% 42%, 98% 50%, 100% 57%, 97% 64%, 100% 71%, 98% 78%, 100% 85%, 97% 92%, 100% 100%, 0% 100%);
          border-left: 1px solid rgba(212,175,55,.18); border-top: 1px solid rgba(212,175,55,.14);
          border-bottom: 1px solid rgba(212,175,55,.14);
          animation: bwTornFlicker 4s ease-in-out infinite;
          opacity: 0; transform: translateX(55px); transition: opacity .9s ease, transform .9s ease;
        }
        .bw-torn-card.visible { opacity: 1; transform: translateX(0); }
        .bw-torn-card::after {
          content: ''; position: absolute; right: 0; top: 0; bottom: 0; width: 3px;
          background: linear-gradient(to bottom, transparent 0%, rgba(212,175,55,.55) 12%, rgba(212,175,55,.25) 25%, rgba(212,175,55,.65) 40%, rgba(212,175,55,.2) 55%, rgba(212,175,55,.6) 70%, rgba(212,175,55,.28) 85%, transparent 100%);
          filter: blur(1px);
        }
        .bw-torn-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(212,175,55,.08); border: 1px solid rgba(212,175,55,.22);
          border-radius: 50px; padding: 5px 14px; margin-bottom: 16px;
        }
        .bw-torn-dot { width: 6px; height: 6px; border-radius: 50%; background: #d4af37; animation: bwPulseDot 2s ease-in-out infinite; }
        .bw-torn-eyebrow span {
          font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 700;
          letter-spacing: .14em; color: #d4af37; text-transform: uppercase;
        }
        .bw-torn-title {
          font-family: 'Libre Baskerville', serif;
          font-size: clamp(1.6rem, 3vw, 2.35rem);
          font-weight: 700; line-height: 1.25; color: #fff; margin-bottom: 14px;
        }
        .bw-torn-title span {
          background: linear-gradient(90deg, #d4af37, #f4e5b8);
          -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
        }
        .bw-torn-divider { width: 52px; height: 2px; background: linear-gradient(to right, #d4af37, transparent); border-radius: 2px; margin-bottom: 16px; }
        .bw-torn-para {
          font-family: 'Inter', sans-serif; font-size: clamp(.84rem, 1.4vw, .96rem);
          font-weight: 400; line-height: 1.88; color: rgba(255,255,255,.65); margin-bottom: 28px;
        }
        .bw-learn-btn {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 700;
          letter-spacing: .06em; color: #000;
          background: linear-gradient(90deg, #d4af37, #f4e5b8, #d4af37);
          background-size: 200% auto; padding: 14px 36px; border-radius: 50px;
          border: none; cursor: pointer; transition: all .3s ease;
          box-shadow: 0 4px 24px rgba(212,175,55,.35);
          animation: bwShimmer 4s linear infinite;
        }
        .bw-learn-btn:hover { transform: translateY(-2px) scale(1.04); box-shadow: 0 8px 36px rgba(212,175,55,.55); }
        .bw-learn-btn svg { transition: transform .3s ease; }
        .bw-learn-btn:hover svg { transform: translateX(4px); }

        /* ══ TABLET ≤ 1024px 2 columns ══ */
        @media (max-width: 1024px) {
          .bw-grid { grid-template-columns: repeat(2, 1fr); }
          .bw-grid-row2 > * {
            width: calc((100% - 28px) / 2);
            max-width: calc((900px - 28px) / 2);
          }
        }

        /* ══ SMALL TABLET ≤ 900px ══ */
        @media (max-width: 900px) {
          .bw-projects-section { padding: 50px 20px 50px; }
        }

        /* ══ MOBILE ≤ 640px ══ */
        @media (max-width: 640px) {
          .bw-projects-section { padding: 40px 12px 40px; }

          /* Single column stack all cards */
          .bw-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .bw-grid-row2 {
            flex-direction: column;
            gap: 16px;
            margin-top: 16px;
          }
          .bw-grid-row2 > * {
            width: 100%;
            max-width: 100%;
          }

          .bw-search-bar-wrap { padding: 0 6px; margin-bottom: 18px; }
          .bw-body-text { margin-top: 24px; }
          .bw-body-para { font-size: .81rem; }

          .bw-closing-section { padding: 36px 12px; min-height: auto; }
          .bw-closing-inner { justify-content: center; }
          .bw-torn-card {
            width: 100%; padding: 26px 20px 26px 16px;
            transform: none !important;
            clip-path: polygon(0% 0%, 96% 0%, 100% 5%, 97% 11%, 100% 17%, 96% 23%, 100% 29%, 97% 35%, 100% 41%, 96% 47%, 100% 53%, 97% 59%, 100% 65%, 96% 71%, 100% 77%, 97% 83%, 100% 89%, 97% 95%, 100% 100%, 0% 100%);
          }
          .bw-torn-card.visible { transform: none !important; }
          .bw-torn-title { font-size: clamp(1.15rem, 5.5vw, 1.45rem); }
          .bw-torn-para { font-size: .8rem; margin-bottom: 20px; }
          .bw-learn-btn { padding: 10px 22px; font-size: 13px; }
        }

        /* ══ TINY ≤ 380px ══ */
        @media (max-width: 380px) {
          .bw-projects-section { padding: 32px 8px 32px; }
          .mob-hint-dbl { display: none; }
          .mob-hint-divider { display: none; }
        }
      
        /* The finger double-taps, pauses, repeats. A static icon read as
           decoration, and the old chevron duplicated the "Scroll" half of
           this same hint; the motion is what says "tappable". */
        .tap-ico { flex-shrink: 0; animation: tapTwice 2.6s ease-in-out infinite; transform-origin: 50% 70%; }
        @keyframes tapTwice {
          0%, 62%, 100% { transform: translateY(0) scale(1); }
          8%            { transform: translateY(1.5px) scale(.88); }
          16%           { transform: translateY(0) scale(1); }
          24%           { transform: translateY(1.5px) scale(.88); }
          32%           { transform: translateY(0) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) { .tap-ico { animation: none; } }
`}</style>

      <div className="bw-page">

        {/* ════ SECTION 1 HERO (hidden) ════ */}
        {/*
        <section className="bw-hero-section">
          ...hero content hidden...
        </section>
        */}

        {/* ════ SECTION 2 INFO / VIDEO (hidden) ════ */}
        {/*
        <section className="bw-info-section">
          ...info + video content hidden...
        </section>
        */}

        <section className="bw-projects-section" style={{ paddingTop: '0px' }}>

          {/* Navbar spacer - adjusted for more breathing room */}
          <div style={{
            display: "block", width: "100%", height: isMobile ? "100px" : "160px",
            flexShrink: 0, pointerEvents: "none", paddingTop: '0px'
          }} aria-hidden="true" />

          {/* Header */}
          <div ref={sec3Ref} className={`bw-projects-header ${sec3Visible ? "visible" : ""}`}>
            <div className="bw-eyebrow-row">



            </div>
            <h2 className="bw-projects-title">
              Have a look at our various <span>Business</span> Projects
            </h2>
            <p className="bw-projects-sub">Our Business Websites</p>
          </div>

          {/* Search */}
          <SearchBar
            query={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search business projects..."
            prefix="bw"
          />

          {/* Cards */}
          {filteredProjects.length === 0 ? (
            <div className="bw-no-results">
              No projects found for <span>"{searchQuery}"</span>
            </div>
          ) : (
            <>
              {/* Row 1 first 3 cards */}
              <div className="bw-grid">
                {filteredProjects.slice(0, 3).map((project, index) => (
                  <AnimatedCard
                    key={project.title}
                    project={project}
                    index={index}
                    isVisible={sec3Visible}
                  />
                ))}
              </div>

              {/* Row 2 remaining cards, centered */}
              {filteredProjects.length > 3 && (
                <div className="bw-grid-row2">
                  {filteredProjects.slice(3).map((project, index) => (
                    <AnimatedCard
                      key={project.title}
                      project={project}
                      index={index + 3}
                      isVisible={sec3Visible}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {/* Body text */}
          <div className={`bw-body-text ${sec3Visible ? "visible" : ""}`}>
            <p className="bw-body-para">
              We specialize in crafting bespoke business websites tailored to meet specific industry
              needs. Whether optimizing e-commerce platforms or developing AI-driven solutions, we
              deliver cutting-edge web solutions that empower businesses to thrive in the digital landscape.
            </p>
          </div>
        </section>


        <ContactUsForm /><br />
        <PortfolioSection />
      </div>
    </>
  );
};

export default BusinessWebsitesPage;