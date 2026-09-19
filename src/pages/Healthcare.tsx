import { useState, useEffect, useRef, useCallback } from "react";
import PortfolioSection from "@/components/HomePage/PortfolioSection";
import ContactUsForm from "@/pages/ContactUsForm";
import HealthcareIntroVideo from "@/pages/HealthcareIntroVideo";

// ─── Detect touch device ───────────────────────────────────────────────────────
const isTouchDevice = () =>
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

// ─── Mobile Card ──────────────────────────────────────────────────────────────
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
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => { if (!scrolled) { setScrolled(true); setHintVisible(false); } };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
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
    const now = Date.now(); const gap = now - lastTapRef.current; lastTapRef.current = now;
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
        <div className="mob-grad-top" /><div className="mob-grad-bot" />
        <div className="mob-badge">{project.category.toUpperCase()}</div>
        {hintVisible && (
          <div className={`mob-hint ${hintPulse ? "mob-hint-pulse" : ""}`}>
            <span className="mob-hint-scroll">
              <svg width="13" height="20" viewBox="0 0 13 20" fill="none">
                <rect x="1" y="1" width="11" height="16" rx="5.5" stroke="currentColor" strokeWidth="1.4" />
                <line x1="6.5" y1="4" x2="6.5" y2="8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              Scroll
            </span>
            <span className="mob-hint-divider">·</span>
            <span className="mob-hint-dbl">
              <svg className="tap-ico" width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M8.2 6.4a5.4 5.4 0 0 1 7.6 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity=".6"/>
                <path d="M5.6 3.9a9 9 0 0 1 12.8 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity=".3"/>
                <path d="M12.9 9.6v5.1l-1.7-1.3-1.3 1.2 2.8 3.4a2.6 2.6 0 0 0 2 .95h2.7a2.6 2.6 0 0 0 2.6-2.6v-3.1a1.7 1.7 0 0 0-1.37-1.67l-3.4-.7V9.6a1.15 1.15 0 0 0-2.3 0Z" fill="currentColor"/>
              </svg>
              Double tap to visit
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

// ─── Desktop Card ─────────────────────────────────────────────────────────────
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
    } else {
      scrollRef.current.scrollTop = 0;
    }
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
    <div
      className={`nb-card-anim ${isVisible ? "visible" : ""}`}
      style={{ transitionDelay: `${index * 0.09}s` }}
    >
      <div
        ref={containerRef}
        className="nb-card-outer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onClick={() => window.open(project.url, "_blank", "noopener,noreferrer")}
      >
        <div ref={scrollRef} className="nb-card-inner-scroll">
          <div className="nb-card-img-wrap">
            <img src={project.image} alt={project.title} className="nb-card-img" draggable={false} loading="lazy" decoding="async" />
          </div>
          <div className="nb-card-grad-top" />
          <div className="nb-card-grad-bot" />
          <div className="nb-cat-badge">{project.category.toUpperCase()}</div>
          <div className="nb-scroll-bar"><div className="nb-scroll-bar-fill" /></div>
          <div className="nb-card-info">
            <h3 className="nb-card-title">{project.title}</h3>
            <span className="nb-card-arrow">↗</span>
          </div>
        </div>
        <div
          className="nb-custom-cursor"
          style={{ left: cursor.x, top: cursor.y, opacity: cursor.opacity }}
        >
          <div className="nb-cursor-circle">
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

// ─── Main Healthcare Page ─────────────────────────────────────────────────────
const HealthcarePage = () => {
  const [sec1Visible, setSec1Visible] = useState(false);
  const [sec2Visible, setSec2Visible] = useState(false);
  const [sec3Visible, setSec3Visible] = useState(false);
  const [sec4Visible, setSec4Visible] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);

  const sec1Ref = useRef(null);
  const sec2Ref = useRef(null);
  const sec3Ref = useRef(null);
  const sec4Ref = useRef(null);
  const videoRef = useRef(null);

  const allProjects = [
    // >>> latest-captured portfolio sites (auto-added, review before deploy)
    { title: "Dentivaa (Femdent Care)", category: "healthcare", url: "https://dentivaa.com", image: "/images/portfolio-sites/dentivaa.jpg" },
    // <<< latest-captured
    {
      title: "OUR HEALTHCARE WEBSITE",
      category: "healthcare",
      url: "https://mahaveereyehospital.com/",
      image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Healthcare/Healthcare-mahaveer-eye-hospital.webp",
    },
  ];

  useEffect(() => {
    const items = [
      { ref: sec1Ref, setter: setSec1Visible },
      { ref: sec2Ref, setter: setSec2Visible },
      { ref: sec3Ref, setter: setSec3Visible },
      { ref: sec4Ref, setter: setSec4Visible },
      { ref: videoRef, setter: setVideoVisible },
    ];
    const obs = items.map(({ ref, setter }) => {
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setter(true); },
        { threshold: 0 }
      );
      if (ref.current) o.observe(ref.current);
      return o;
    });
    return () => obs.forEach(o => o.disconnect());
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setSec1Visible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

        @keyframes nbShimmer    { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes nbFloatY     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
        @keyframes nbPulseDot   { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.45;transform:scale(1.6)} }
        @keyframes nbBorderGlow {
          0%,100%{ box-shadow:0 0 0 1px rgba(212,175,55,.18),0 12px 48px rgba(0,0,0,.8); }
          50%    { box-shadow:0 0 0 1px rgba(212,175,55,.45),0 12px 64px rgba(212,175,55,.12); }
        }
        @keyframes nbShineSweep  { 0%{left:-100%;opacity:.55} 60%{left:120%;opacity:.25} 100%{left:120%;opacity:0} }
        @keyframes nbHintPulse   { 0%,100%{transform:translateX(-50%) scale(1)} 50%{transform:translateX(-50%) scale(1.06)} }
        @keyframes nbTornFlicker {
          0%,100%{filter:drop-shadow(0 0 18px rgba(212,175,55,.3))}
          50%    {filter:drop-shadow(0 0 30px rgba(212,175,55,.58))}
        }

        .nb-page { background:#000; min-height:100vh; overflow-x:hidden; }

        /* ══ HERO ══ */
        .nb-hero-section { position:relative;background:#000;min-height:70vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px 28px 80px;overflow:hidden; }
        @media(max-width:640px){
          .nb-hero-section { padding:40px 14px 60px; justify-content:flex-start; min-height:unset; }
        }
        .nb-hero-section::before { content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,rgba(212,175,55,.04) 0%,transparent 60%);pointer-events:none; }
        .nb-hero-particles { position:absolute;inset:0;pointer-events:none;z-index:0; }
        .nb-particle { position:absolute;border-radius:50%;background:rgba(212,175,55,.5);animation:nbFloatY var(--dur,5s) ease-in-out var(--delay,0s) infinite; }

        .nb-hero-card { position:relative;z-index:2;width:96%;max-width:1260px;padding:62px 68px;border-radius:22px;overflow:hidden;background:rgba(255,255,255,.04);backdrop-filter:blur(10px) saturate(1.5);-webkit-backdrop-filter:blur(10px) saturate(1.5);border:1px solid rgba(212,175,55,.16);animation:nbBorderGlow 4.5s ease-in-out infinite;opacity:0;transform:translateY(36px) scale(.98);transition:opacity .9s ease,transform .9s ease; }
        .nb-hero-card.visible { opacity:1;transform:translateY(0) scale(1); }
        .nb-hero-card-bg { position:absolute;inset:0;background-image:url('https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/bghealthcare1.webp');background-size:cover;background-position:center;opacity:0.35;z-index:0;pointer-events:none; }
        .nb-hero-card-overlay { position:absolute;inset:0;background:radial-gradient(ellipse at 50% 110%,rgba(0,0,0,.65) 0%,transparent 65%),radial-gradient(ellipse at 50% -10%,rgba(0,0,0,.5) 0%,transparent 60%),linear-gradient(to right,rgba(0,0,0,.25) 0%,transparent 40%,rgba(0,0,0,.15) 100%);z-index:0;pointer-events:none; }
        .nb-hero-card-content { position:relative;z-index:1;display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center; }
        @media(max-width:900px){ .nb-hero-card-content{grid-template-columns:1fr;gap:36px;} .nb-hero-card{padding:40px 28px;} }

        .nb-hero-eyebrow { display:inline-flex;align-items:center;gap:9px;background:rgba(212,175,55,.09);border:1px solid rgba(212,175,55,.28);border-radius:50px;padding:5px 16px;margin-bottom:20px; }
        .nb-hero-eyebrow-dot { width:7px;height:7px;border-radius:50%;background:#d4af37;animation:nbPulseDot 2s ease-in-out infinite; }
        .nb-hero-eyebrow span { font-family:'Inter',sans-serif;font-size:11px;font-weight:700;letter-spacing:.13em;color:#d4af37;text-transform:uppercase; }
        .nb-hero-title { font-family:'Libre Baskerville',serif;font-size:clamp(1.9rem,3.5vw,3rem);font-weight:700;line-height:1.18;color:#fff;margin-bottom:12px; }
        .nb-hero-title span { background:linear-gradient(90deg,#d4af37,#f4e5b8,#d4af37);background-size:200% auto;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:nbShimmer 4s linear infinite; }
        .nb-hero-subtitle { font-family:'Libre Baskerville',serif;font-style:italic;font-size:clamp(.95rem,1.6vw,1.1rem);color:rgba(212,175,55,.75);margin-bottom:20px;line-height:1.5; }
        .nb-hero-divider-line { display:flex;align-items:center;gap:12px;margin-bottom:20px; }
        .nb-hero-divider-line::before { content:'';flex:1;height:1px;background:linear-gradient(to right,#d4af37,transparent); }
        .nb-hero-divider-diamond { width:7px;height:7px;border:1.5px solid #d4af37;transform:rotate(45deg);flex-shrink:0; }
        .nb-hero-divider-line::after { content:'';flex:1;height:1px;background:linear-gradient(to left,#d4af37,transparent); }
        .nb-hero-features { display:flex;flex-direction:column;gap:12px; }
        .nb-hero-feature { display:flex;align-items:center;gap:12px; }
        .nb-feature-icon { width:32px;height:32px;border-radius:8px;flex-shrink:0;background:rgba(212,175,55,.1);border:1px solid rgba(212,175,55,.22);display:flex;align-items:center;justify-content:center; }
        .nb-feature-text { font-family:'Inter',sans-serif;font-size:.88rem;font-weight:500;color:rgba(255,255,255,.72);line-height:1.4; }
        .nb-feature-text strong { display:block;color:#fff;font-weight:600;font-size:.9rem; }
        .nb-hero-para { font-family:'Inter',sans-serif;font-size:clamp(.88rem,1.5vw,1rem);line-height:1.85;color:rgba(255,255,255,.68); }

        /* ══ SECTION 2 ══ */
        .nb-info-section { position:relative;background:#000;padding:100px 28px;overflow:hidden; }
        .nb-info-section::before { content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 20% 50%,rgba(212,175,55,.04) 0%,transparent 60%);pointer-events:none; }
        .nb-info-inner { max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;position:relative;z-index:1; }
        @media(max-width:900px){ .nb-info-inner{grid-template-columns:1fr;gap:48px;} }

        .nb-video-wrap { position:relative;border-radius:20px;overflow:hidden;border:1px solid rgba(212,175,55,.2);box-shadow:0 24px 80px rgba(0,0,0,.8),0 0 0 1px rgba(212,175,55,.07);aspect-ratio:16/9;background:#0a0a0a;opacity:0;transform:translateX(60px);transition:opacity .85s ease,transform .85s ease; }
        .nb-video-wrap.visible { opacity:1;transform:translateX(0); }
        .nb-video-wrap iframe { width:100%;height:100%;display:block;border:none; }
        .nb-video-badge { position:absolute;top:14px;left:14px;background:rgba(212,175,55,.92);color:#000;font-family:'Inter',sans-serif;font-size:10px;font-weight:700;letter-spacing:.08em;padding:4px 12px;border-radius:50px;z-index:5; }
        .nb-video-corner-top { position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(to right,#d4af37,#f4e5b8,#d4af37); }

        .nb-content-left { opacity:0;transform:translateX(-60px);transition:opacity .85s ease .15s,transform .85s ease .15s; }
        .nb-content-left.visible { opacity:1;transform:translateX(0); }

        .nb-tag-pill { display:inline-flex;align-items:center;gap:8px;background:rgba(212,175,55,.08);border:1px solid rgba(212,175,55,.24);border-radius:50px;padding:5px 14px;margin-bottom:18px; }
        .nb-tag-pill span { font-family:'Inter',sans-serif;font-size:10px;font-weight:700;letter-spacing:.14em;color:#d4af37;text-transform:uppercase; }
        .nb-do-you-know { font-family:'Libre Baskerville',serif;font-size:1rem;color:rgba(212,175,55,.65);margin-bottom:6px; }
        .nb-sec2-title { font-family:'Libre Baskerville',serif;font-size:clamp(1.8rem,3.2vw,2.7rem);font-weight:700;line-height:1.2;color:#fff;margin-bottom:22px; }
        .nb-sec2-title em { font-style:normal;background:linear-gradient(90deg,#d4af37,#f4e5b8);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent; }
        .nb-sec2-divider { width:55px;height:2px;background:linear-gradient(to right,#d4af37,transparent);margin-bottom:24px;border-radius:2px; }
        .nb-sec2-para { font-family:'Inter',sans-serif;font-size:clamp(.87rem,1.5vw,.98rem);font-weight:400;line-height:1.88;color:rgba(255,255,255,.62);margin-bottom:18px; }
        .nb-sec2-cta { font-family:'Libre Baskerville',serif;font-style:italic;font-size:1rem;color:#d4af37;margin-top:8px;display:flex;align-items:center;gap:8px; }
        .nb-sec2-cta::after { content:'→';font-style:normal;font-size:1.1rem; }

        /* ══ SECTION 3 ══ */
        .nb-projects-section { position:relative;background:linear-gradient(to bottom,#000,#08070d,#000);padding:0px 28px 80px;overflow:hidden; }
        .nb-projects-section::before { content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(212,175,55,.05) 0%,transparent 55%);pointer-events:none; }

        .nb-projects-header { text-align:center;max-width:740px;margin:0 auto 20px;opacity:0;transform:translateY(28px);transition:opacity .75s ease,transform .75s ease; }
        .nb-projects-header.visible { opacity:1;transform:translateY(0); }

        .nb-eyebrow-row { display:inline-flex;align-items:center;gap:10px;margin-bottom:18px; }
        .nb-eyebrow-line { width:34px;height:1px;background:linear-gradient(to right,transparent,#d4af37); }
        .nb-eyebrow-line.r { background:linear-gradient(to left,transparent,#d4af37); }
        .nb-eyebrow-text { font-family:'Inter',sans-serif;font-size:11px;font-weight:700;letter-spacing:.16em;color:#d4af37;text-transform:uppercase; }
        .nb-projects-title { font-family:'Libre Baskerville',serif;font-size:clamp(1.9rem,3.8vw,3rem);font-weight:700;line-height:1.18;color:#fff;margin-bottom:10px; }
        .nb-projects-title span { background:linear-gradient(90deg,#d4af37,#f4e5b8,#d4af37);background-size:200% auto;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:nbShimmer 4s linear infinite; }
        .nb-projects-sub { font-family:'Libre Baskerville',serif;font-size:1.05rem;color:rgba(212,175,55,.65);margin-bottom:0; }

        .nb-grid-single { display:flex;justify-content:center;align-items:stretch;max-width:1200px;margin:48px auto 0;padding:0; }

        .nb-card-anim { width:100%;max-width:860px;opacity:0;transform:translateY(28px) scale(.97);transition:opacity .65s ease,transform .65s cubic-bezier(0.22,1,0.36,1); }
        .nb-card-anim.visible { opacity:1 !important;transform:translateY(0) scale(1) !important; }

        .nb-card-outer { position:relative;height:440px;border-radius:16px;overflow:hidden;cursor:none;background:#0a0a0a;box-shadow:0 8px 40px rgba(0,0,0,.7);transition:box-shadow .3s ease,transform .3s ease; }
        .nb-card-inner-scroll { position:relative;height:100%;overflow-y:auto;overflow-x:hidden;scrollbar-width:none; }
        .nb-card-inner-scroll::-webkit-scrollbar { display:none; }
        .nb-card-img-wrap { position:relative;height: auto;pointer-events:none; }
        .nb-card-img { width:100%;height: auto;object-fit: initial;object-position:top center;display:block;user-select:none; }
        .nb-card-grad-top { position:sticky;top:0;left:0;right:0;height:60px;margin-bottom:-60px;background:linear-gradient(to bottom,rgba(0,0,0,.6),transparent);pointer-events:none;z-index:3; }
        .nb-card-grad-bot { position:sticky;bottom:0;left:0;right:0;height:160px;margin-top:-160px;background:linear-gradient(to top,rgba(0,0,0,1) 0%,rgba(0,0,0,.9) 30%,rgba(0,0,0,.55) 65%,transparent 100%);pointer-events:none;z-index:3; }
        .nb-cat-badge { position:sticky;top:12px;float:left;margin:-48px 0 0 12px;background:rgba(212,175,55,.92);color:#000;padding:4px 13px;border-radius:50px;font-size:10px;font-weight:700;letter-spacing:.06em;font-family:'Inter',sans-serif;backdrop-filter:blur(4px);z-index:10;clear:left; }
        .nb-scroll-bar { position:sticky;bottom:62px;float:right;margin:0 10px -24px 0;width:3px;height:50px;background:rgba(255,255,255,.12);border-radius:2px;overflow:hidden;z-index:10;clear:right; }
        .nb-scroll-bar-fill { width:100%;height:22%;background:linear-gradient(to bottom,#d4af37,#b8912a);border-radius:2px; }
        .nb-card-info { position:sticky;bottom:0;padding:12px 16px 16px;z-index:10;pointer-events:none;display:flex;align-items:flex-end;justify-content:space-between; }
        .nb-card-title { font-family:'Libre Baskerville',serif;font-size:15px;font-weight:700;color:#fff;line-height:1.3;text-shadow:0 1px 10px rgba(0,0,0,1);transition:color .3s ease; }
        .nb-card-arrow { font-size:22px;color:#d4af37;text-shadow:0 0 12px rgba(212,175,55,.8);flex-shrink:0; }
        .nb-card-outer:hover { box-shadow:0 16px 56px rgba(212,175,55,.22);transform:translateY(-4px); }
        .nb-card-outer::after { content:'';position:absolute;inset:0;border-radius:16px;border:2px solid transparent;background:linear-gradient(135deg,rgba(212,175,55,.6),transparent 50%,rgba(212,175,55,.3)) border-box;-webkit-mask:linear-gradient(#fff 0 0) padding-box,linear-gradient(#fff 0 0);mask:linear-gradient(#fff 0 0) padding-box,linear-gradient(#fff 0 0);-webkit-mask-composite:destination-out;mask-composite:exclude;opacity:0;transition:opacity .3s ease;pointer-events:none;z-index:20; }
        .nb-card-outer:hover::after { opacity:1; }
        .nb-card-outer:hover .nb-card-title { color:#f4e5b8; }
        .nb-custom-cursor { position:absolute;transform:translate(-50%,-50%);pointer-events:none;transition:opacity .3s ease;z-index:100; }
        .nb-cursor-circle { width:48px;height:48px;border-radius:50%;background:rgba(15,15,15,.8);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;box-shadow:0 2px 20px rgba(0,0,0,.4),0 0 0 1px rgba(212,175,55,.2); }

        .nb-more-note { max-width:700px;margin:52px auto 0;text-align:center;padding:28px 36px;border-radius:16px;background:rgba(212,175,55,.04);border:1px solid rgba(212,175,55,.15);opacity:0;transform:translateY(20px);transition:opacity .7s ease .3s,transform .7s ease .3s; }
        .nb-more-note.visible { opacity:1;transform:translateY(0); }
        .nb-more-note p { font-family:'Inter',sans-serif;font-size:.95rem;color:rgba(255,255,255,.6);line-height:1.7; }
        .nb-more-note strong { color:#d4af37;font-weight:600; }

        /* Mobile card */
        .mob-card-anim { transition:opacity .58s ease,transform .58s cubic-bezier(0.22,1,0.36,1);border-radius:18px;overflow:hidden;-webkit-tap-highlight-color:transparent;touch-action:pan-y;width:100%; }
        .mob-img-outer { position:relative;height:360px;border-radius:18px;overflow:hidden;background:#111;border:2px solid rgba(212,175,55,.4);box-shadow:0 10px 40px rgba(0,0,0,.7),0 0 0 1px rgba(212,175,55,.1); }
        .mob-scroll-container { position:absolute;inset:0;overflow-y:scroll;overflow-x:hidden;scrollbar-width:none;-webkit-overflow-scrolling:touch;touch-action:pan-y;cursor:pointer;z-index:2; }
        .mob-scroll-container::-webkit-scrollbar { display:none; }
        .mob-img-wrap { height: auto;pointer-events:none; }
        .mob-img { width:100%;height: auto;object-fit: initial;object-position:top center;display:block;user-select:none; }
        .mob-shine { position:absolute;top:0;left:-100%;bottom:0;width:55%;background:linear-gradient(105deg,transparent 20%,rgba(255,255,255,.2) 50%,transparent 80%);pointer-events:none;z-index:15;opacity:0; }
        .mob-shine.mob-shine-run { animation:nbShineSweep .9s ease-out .25s forwards; }
        .mob-grad-top { position:absolute;top:0;left:0;right:0;height:64px;background:linear-gradient(to bottom,rgba(0,0,0,.6),transparent);pointer-events:none;z-index:5; }
        .mob-grad-bot { position:absolute;bottom:0;left:0;right:0;height:170px;background:linear-gradient(to top,rgba(0,0,0,.95) 0%,rgba(0,0,0,.7) 35%,rgba(0,0,0,.2) 70%,transparent 100%);pointer-events:none;z-index:5; }
        .mob-badge { position:absolute;top:14px;left:14px;background:rgba(212,175,55,.92);color:#000;font-family:'Inter',sans-serif;font-size:10px;font-weight:700;letter-spacing:.06em;padding:4px 12px;border-radius:50px;z-index:10;backdrop-filter:blur(4px); }
        .mob-hint { position:absolute;bottom:58px;left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:8px;background:rgba(0,0,0,.72);backdrop-filter:blur(10px);border:1px solid rgba(212,175,55,.3);border-radius:50px;padding:6px 14px;z-index:20;pointer-events:none;white-space:nowrap; }
        .mob-hint.mob-hint-pulse { animation:nbHintPulse .55s ease; }
        .mob-hint-scroll,.mob-hint-dbl { display:flex;align-items:center;gap:5px;font-family:'Inter',sans-serif;font-size:10px;font-weight:600;letter-spacing:.04em;color:rgba(244,229,184,.9); }
        .mob-hint-divider { color:rgba(212,175,55,.5);font-size:12px; }
        .mob-scroll-track { position:absolute;right:8px;top:14px;bottom:14px;width:3px;background:rgba(255,255,255,.12);border-radius:2px;z-index:10;pointer-events:none;overflow:hidden; }
        .mob-scroll-dot { width:100%;height:22%;background:linear-gradient(to bottom,#d4af37,#b8912a);border-radius:2px; }
        .mob-info { position:absolute;bottom:0;left:0;right:0;padding:14px 14px 18px;display:flex;align-items:flex-end;justify-content:space-between;z-index:10;pointer-events:none; }
        .mob-title { font-family:'Libre Baskerville',serif;font-size:14px;font-weight:700;color:#fff;line-height:1.3;text-shadow:0 1px 12px rgba(0,0,0,1);margin:0;max-width:78%; }
        .mob-arrow { font-size:20px;color:#d4af37;text-shadow:0 0 14px rgba(212,175,55,.9);flex-shrink:0;line-height:1; }

        /* ══ SECTION 4 ══ */
        .nb-closing-section { position:relative;min-height:580px;display:flex;align-items:center;padding:80px 28px;overflow:hidden;background:#000; }
        .nb-closing-bg { position:absolute;inset:0;background-image:url('https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/bghealthcare2.jpg');background-size:cover;background-position:center;opacity:0.45;z-index:0; }
        .nb-closing-overlay { position:absolute;inset:0;background:linear-gradient(to left,rgba(0,0,0,.72) 0%,rgba(0,0,0,.28) 55%,rgba(0,0,0,.65) 100%);z-index:1; }
        .nb-closing-particles { position:absolute;inset:0;pointer-events:none;z-index:1; }
        .nb-cp { position:absolute;width:2px;height:2px;border-radius:50%;background:rgba(212,175,55,.5);animation:nbFloatY var(--dur,4s) ease-in-out var(--delay,0s) infinite; }
        .nb-closing-inner { position:relative;z-index:2;max-width:1200px;width:100%;margin:0 auto;display:flex;justify-content:flex-end; }

        .nb-torn-card { position:relative;width:min(500px,90vw);padding:56px 52px 52px 44px;background:rgba(5,5,5,.74);backdrop-filter:blur(10px) saturate(1.4);-webkit-backdrop-filter:blur(10px) saturate(1.4);clip-path:polygon(0% 0%,97% 0%,100% 7%,98% 14%,100% 21%,97% 28%,99% 35%,100% 42%,98% 50%,100% 57%,97% 64%,100% 71%,98% 78%,100% 85%,97% 92%,100% 100%,0% 100%);border-left:1px solid rgba(212,175,55,.18);border-top:1px solid rgba(212,175,55,.14);border-bottom:1px solid rgba(212,175,55,.14);animation:nbTornFlicker 4s ease-in-out infinite;opacity:0;transform:translateX(55px);transition:opacity .9s ease,transform .9s ease; }
        .nb-torn-card.visible { opacity:1;transform:translateX(0); }
        .nb-torn-card::after { content:'';position:absolute;right:0;top:0;bottom:0;width:3px;background:linear-gradient(to bottom,transparent 0%,rgba(212,175,55,.55) 12%,rgba(212,175,55,.25) 25%,rgba(212,175,55,.65) 40%,rgba(212,175,55,.2) 55%,rgba(212,175,55,.6) 70%,rgba(212,175,55,.28) 85%,transparent 100%);filter:blur(1px); }

        .nb-torn-eyebrow { display:inline-flex;align-items:center;gap:8px;background:rgba(212,175,55,.08);border:1px solid rgba(212,175,55,.22);border-radius:50px;padding:5px 14px;margin-bottom:20px; }
        .nb-torn-dot { width:6px;height:6px;border-radius:50%;background:#d4af37;animation:nbPulseDot 2s ease-in-out infinite; }
        .nb-torn-eyebrow span { font-family:'Inter',sans-serif;font-size:10px;font-weight:700;letter-spacing:.14em;color:#d4af37;text-transform:uppercase; }
        .nb-torn-title { font-family:'Libre Baskerville',serif;font-size:clamp(1.6rem,3vw,2.35rem);font-weight:700;line-height:1.25;color:#fff;margin-bottom:16px; }
        .nb-torn-title span { background:linear-gradient(90deg,#d4af37,#f4e5b8);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent; }
        .nb-torn-divider { width:52px;height:2px;background:linear-gradient(to right,#d4af37,transparent);border-radius:2px;margin-bottom:20px; }
        .nb-torn-para { font-family:'Inter',sans-serif;font-size:clamp(.84rem,1.4vw,.96rem);font-weight:400;line-height:1.88;color:rgba(255,255,255,.65);margin-bottom:36px; }
        .nb-learn-btn { display:inline-flex;align-items:center;gap:10px;font-family:'Inter',sans-serif;font-size:14px;font-weight:700;letter-spacing:.06em;color:#000;background:linear-gradient(90deg,#d4af37,#f4e5b8,#d4af37);background-size:200% auto;padding:14px 36px;border-radius:50px;border:none;cursor:pointer;transition:all .3s ease;box-shadow:0 4px 24px rgba(212,175,55,.35);animation:nbShimmer 4s linear infinite; }
        .nb-learn-btn:hover { transform:translateY(-2px) scale(1.04);box-shadow:0 8px 36px rgba(212,175,55,.55); }
        .nb-learn-btn svg { transition:transform .3s ease; }
        .nb-learn-btn:hover svg { transform:translateX(4px); }

        @media(max-width:768px){
          .nb-closing-inner { justify-content:center; }
          .nb-torn-card { padding:40px 32px 40px 28px; }
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

      <div className="nb-page">
        <HealthcareIntroVideo />

        {/* ════ SECTION 1 ════ */}
        <section className="nb-hero-section">


          <div className="nb-hero-particles">
            {[
              { left: "8%", top: "25%", w: "2px", dur: "5s", delay: "0s" },
              { left: "92%", top: "40%", w: "2px", dur: "7s", delay: "1.2s" },
              { left: "18%", top: "72%", w: "3px", dur: "4s", delay: "2s" },
              { left: "78%", top: "65%", w: "2px", dur: "6s", delay: ".6s" },
              { left: "50%", top: "12%", w: "2px", dur: "8s", delay: "1.5s" },
              { left: "35%", top: "85%", w: "3px", dur: "5.5s", delay: "3s" },
              { left: "65%", top: "30%", w: "2px", dur: "9s", delay: ".3s" },
            ].map((p, i) => (
              <div key={i} className="nb-particle"
                style={{ left: p.left, top: p.top, width: p.w, height: p.w, "--dur": p.dur, "--delay": p.delay } as any} />
            ))}
          </div>

          <div ref={sec1Ref} className={`nb-hero-card ${sec1Visible ? "visible" : ""}`}>
            <div className="nb-hero-card-bg" />
            <div className="nb-hero-card-overlay" />
            <div className="nb-hero-card-content">
              <div>
                <div className="nb-hero-eyebrow">
                  <div className="nb-hero-eyebrow-dot" />
                  <span>Healthcare Solutions</span>
                </div>
                <h1 className="nb-hero-title">Our <span>Healthcare</span> Websites</h1>
                <p className="nb-hero-subtitle">Empowering Health Through Technology</p>
                <div className="nb-hero-divider-line"><div className="nb-hero-divider-diamond" /></div>
                <div className="nb-hero-features">
                  {[
                    { label: "Hospital Portals", sub: "Seamless patient-provider connectivity" },
                    { label: "Wellness Platforms", sub: "Holistic health & lifestyle management" },
                    { label: "Telemedicine", sub: "Online consultations & virtual care" },
                    { label: "Trusted & Accessible", sub: "Secure, compliant & inclusive by design" },
                  ].map(f => (
                    <div key={f.label} className="nb-hero-feature">

                      <div className="nb-feature-text"><strong>{f.label}</strong>{f.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="nb-hero-para">
                  We create dynamic healthcare websites designed to connect patients and providers
                  seamlessly. From hospital portals to wellness platforms and telemedicine solutions,
                  our projects are tailored to enhance accessibility, trust, and care delivery putting
                  people's health and wellbeing at the heart of every digital experience we build.
                </p>
              </div>
            </div>
          </div>
        </section>



        {/* ════ SECTION 3 ════ */}
        <section ref={sec3Ref} className="nb-projects-section">
          <div className={`nb-projects-header ${sec3Visible ? "visible" : ""}`}>
            <div className="nb-eyebrow-row">
              <div className="nb-eyebrow-line" />
              <span className="nb-eyebrow-text">Portfolio</span>
              <div className="nb-eyebrow-line r" />
            </div>
            <h2 className="nb-projects-title">Our <span>Healthcare</span> Website</h2>
            <p className="nb-projects-sub">Healthcare & Wellness Platform</p>
          </div>

          <div className="nb-grid-single">
            {allProjects.map((project, index) => (
              <AnimatedCard
                key={project.title}
                project={project}
                index={index}
                isVisible={sec3Visible}
              />
            ))}
          </div>

          <div className={`nb-more-note ${sec3Visible ? "visible" : ""}`}>
            <p>
              This is our <strong>featured Healthcare project</strong> a comprehensive digital health platform.
              Want a custom solution? <strong>Connect with us</strong> to explore how we can build the
              perfect healthcare website tailored to your needs.
            </p>
          </div>
        </section>


        <ContactUsForm /> <br />
        <PortfolioSection />
      </div>
    </>
  );
};

export default HealthcarePage;