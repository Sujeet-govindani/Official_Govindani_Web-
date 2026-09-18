import { useState, useEffect, useRef, useCallback } from "react";
import PortfolioSection from "@/components/HomePage/PortfolioSection";
import ContactUsForm from "./ContactUsForm";

// ─── Detect touch device ───────────────────────────────────────────────────────
const isTouchDevice = () =>
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

// ─── Search Bar Component ─────────────────────────────────────────────────────
function SearchBar({
  query,
  onChange,
  placeholder = "Search projects...",
  prefix = "ec",
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div className={`${prefix}-search-bar-wrap ${focused ? "focused" : ""}`}>
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
        transitionDelay: `${index * 0.09}s`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(48px) scale(0.95)",
      }}
    >
      <div className="mob-img-outer">
        <div
          ref={scrollRef}
          className="mob-scroll-container"
          onTouchEnd={handleTap}
          onClick={handleTap}
        >
          <div className="mob-img-wrap">
            <img src={project.image} alt={project.title} className="mob-img" draggable={false} loading="lazy" decoding="async" />
          </div>
        </div>
        <div className={`mob-shine ${visible ? "mob-shine-run" : ""}`} />
        <div className="mob-grad-top" />
        <div className="mob-grad-bot" />
        {/* Category badge top-left */}
        <div className="mob-badge">{project.badge || project.category.toUpperCase()}</div>
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

// ─── Desktop Animated Card ────────────────────────────────────────────────────
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
      className={`ec-card-anim ${isVisible ? "visible" : ""}`}
      style={{ transitionDelay: `${index * 0.08}s` }}
    >
      <div
        ref={containerRef}
        className="ec-card-outer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onClick={() => window.open(project.url, "_blank", "noopener,noreferrer")}
      >
        <div ref={scrollRef} className="ec-card-inner-scroll">
          <div className="ec-card-img-wrap">
            <img src={project.image} alt={project.title} className="ec-card-img" draggable={false} loading="lazy" decoding="async" />
          </div>
          <div className="ec-card-grad-top" />
          <div className="ec-card-grad-bot" />
          {/* Badge top-left: uses project.badge (tech type) */}
          <div className="ec-cat-badge">{project.badge || project.category.toUpperCase()}</div>
          <div className="ec-scroll-bar"><div className="ec-scroll-bar-fill" /></div>
          <div className="ec-card-info">
            <h3 className="ec-card-title">{project.title}</h3>
            <span className="ec-card-arrow">↗</span>
          </div>
        </div>
        <div
          className="ec-custom-cursor"
          style={{ left: cursor.x, top: cursor.y, opacity: cursor.opacity }}
        >
          <div className="ec-cursor-circle">
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

// ─── Smart Card ───────────────────────────────────────────────────────────────
function AnimatedCard({ project, index, isVisible }) {
  const [touch, setTouch] = useState(false);
  useEffect(() => { setTouch(isTouchDevice()); }, []);
  return touch
    ? <MobileCard project={project} index={index} />
    : <DesktopCard project={project} index={index} isVisible={isVisible} />;
}

// ─── Category Filter Buttons ──────────────────────────────────────────────────
function CategoryFilters({ activeFilter, onFilterChange }) {
  const filters = ["All", "Shopify", "Coding", "WordPress"];
  return (
    <div className="ec-filter-wrap">
      {filters.map((f) => (
        <button
          key={f}
          className={`ec-filter-btn ${activeFilter === f ? "active" : ""}`}
          onClick={() => onFilterChange(f)}
          type="button"
        >
          {f === "All" && (
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ flexShrink: 0 }}>
              <rect x="1" y="1" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.3" />
              <rect x="7.5" y="1" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.3" />
              <rect x="1" y="7.5" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.3" />
              <rect x="7.5" y="7.5" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.3" />
            </svg>
          )}
          {f === "Shopify" && (
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ flexShrink: 0 }}>
              <path d="M9.5 3.5C9.5 3.5 9 1 6.5 1C4 1 3.5 3.5 3.5 3.5H2L3 11H10L11 3.5H9.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
              <path d="M5 3.5C5 2.5 5.7 2 6.5 2C7.3 2 8 2.5 8 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          )}
          {f === "Coding" && (
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ flexShrink: 0 }}>
              <path d="M4 4L1.5 6.5L4 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9 4L11.5 6.5L9 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7.5 2.5L5.5 10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          )}
          {f === "WordPress" && (
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ flexShrink: 0 }}>
              <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M1 6.5H12M6.5 1C6.5 1 4.5 3.5 4.5 6.5C4.5 9.5 6.5 12 6.5 12C6.5 12 8.5 9.5 8.5 6.5C8.5 3.5 6.5 1 6.5 1Z" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          )}
          {f}
        </button>
      ))}
    </div>
  );
}

// ─── Main E-Commerce Page ─────────────────────────────────────────────────────
const EcommercePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [lastVisible, setLastVisible] = useState(false);
  const [videoInView, setVideoInView] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const heroRef = useRef(null);
  const cardsRef = useRef(null);
  const lastRef = useRef(null);
  const videoRef = useRef(null);

  // ── All 13 projects badge = tech type label shown on the card top-left ──
  // Change badge values anytime: "Shopify" | "Coding" | "WordPress"
  // filter field must match exactly: "Shopify" | "Coding" | "WordPress"
  const ecomProjects = [
    // ── Original 6 ──
    {
      title: "Baba Ji Ki Buti",
      category: "e-commerce",
      badge: "Coding",         // ← change badge label here
      filter: "Coding",        // ← change filter category here
      url: "https://babajikibuti.com/home",
      image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/E-Commerce/Coding/Coding-Babajikibuti.webp",
    },
    {
      title: "Tarushpranna",
      category: "e-commerce",
      badge: "Coding",         // ← change badge label here
      filter: "Coding",        // ← change filter category here
      url: "https://tarushpranaa.com/",
      image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/E-Commerce/Coding/Coding-Tarushpranna.webp",
    },
    {
      title: "Terra by Trishla",
      category: "e-commerce",
      badge: "WordPress",
      filter: "WordPress",
      url: "https://terrabytrishla.com/",
      image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/E-Commerce/Wordpress/Wordpress-Terra-By-Trishla.webp",
    },
    {
      title: "Madhav Numerology",
      category: "e-commerce",
      badge: "WordPress",
      filter: "WordPress",
      url: "https://madhavnumerology.com/",
      image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/E-Commerce/Wordpress/Wordpress-Madhav-Numerology.webp",
    },
    {
      title: "GSD Organics",
      category: "e-commerce",
      badge: "WordPress",
      filter: "WordPress",
      url: "https://gsdorganics.com/",
      image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/E-Commerce/Wordpress/Wordpress-Gsd-Organics.webp",
    },
    {
      title: "MuktaShop",
      category: "e-commerce",
      badge: "Shopify",
      filter: "Shopify",
      url: "https://muktashop.com/",
      image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/E-Commerce/Shopify/Shopify-Muktashop.webp",
    },
    {
      title: "Gllora",
      category: "e-commerce",
      badge: "Shopify",
      filter: "Shopify",
      url: "https://gllora.com/",
      image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/E-Commerce/Shopify/Shopify-Gllora.webp",
    },
    {
      title: "Kryelet Studios",
      category: "e-commerce",
      badge: "Shopify",
      filter: "Shopify",
      url: "https://kryeletstudios.com/",
      image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/E-Commerce/Shopify/Shopify-kryelet-studios.webp",
    },

    // ── New 7 add your images to /Images/ and update the image paths below ──
    {
      title: "Gau Mandir Satva",
      category: "e-commerce",
      badge: "WordPress",         // ← update badge/filter when you know
      filter: "WordPress",
      url: "https://gaumandirsatva.com/",
      image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/E-Commerce/Wordpress/Wordpress-Gau-Mandir-Satva.webp",   // ← replace with your actual image file
    },

    {
      title: "City Bazaar",
      category: "e-commerce",
      badge: "WordPress",
      filter: "WordPress",
      url: "https://citybazaarstore.com/",
      image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/E-Commerce/Wordpress/Wordpress-Home-City-Bazaar.webp",
    },

    {
      title: "Malini Charitable Trust",
      category: "e-commerce",
      badge: "WordPress",
      filter: "WordPress",
      url: "http://mctindia.org",
      image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/E-Commerce/Wordpress/Wordpress-Malini-Charitable-Trust.webp",
    },
    {
      title: "Khambani Foods",
      category: "e-commerce",
      badge: "Shopify",
      filter: "Shopify",
      url: "https://www.khambani.com/",
      image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/E-Commerce/Shopify/Shopify-Khambani-Foods.webp",
    },

  ];

  // ── Filter logic: category button + search query both apply ──
  const filteredProjects = ecomProjects.filter((p) => {
    const matchesFilter = activeFilter === "All" || p.filter === activeFilter;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  useEffect(() => {
    const observers = [
      { ref: heroRef, setter: setIsVisible },
      { ref: cardsRef, setter: setCardsVisible },
      { ref: lastRef, setter: setLastVisible },
      { ref: videoRef, setter: setVideoInView },
    ];
    const obs = observers.map(({ ref, setter }) => {
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setter(true); },
        { threshold: 0.1 }
      );
      if (ref.current) o.observe(ref.current);
      return o;
    });
    return () => obs.forEach(o => o.disconnect());
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Libre Baskerville', serif !important; }

        @keyframes fadeUp   { from { opacity:0; transform:translateY(40px); } to { opacity:1; transform:translateY(0); } }
        @keyframes shimmer  { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes floatY   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes borderGlow {
          0%,100%{ box-shadow: 0 0 0 1px rgba(212,175,55,.2), 0 8px 40px rgba(0,0,0,.6); }
          50%    { box-shadow: 0 0 0 1px rgba(212,175,55,.5), 0 8px 60px rgba(212,175,55,.15); }
        }
        @keyframes pulseDot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.5)} }
        @keyframes shineSweep {
          0%   { left:-100%; opacity:.55; }
          60%  { left:120%;  opacity:.25; }
          100% { left:120%;  opacity:0;   }
        }
        @keyframes hintPulseAnim {
          0%,100%{ transform:translateX(-50%) scale(1); }
          50%    { transform:translateX(-50%) scale(1.06); }
        }

        .ec-page {
          background: #000;
          min-height: 100vh;
          overflow-x: hidden;
          font-family: 'Inter', sans-serif;
          padding-top: 60px !important;
        }
        @media (min-width: 768px) {
          .ec-page {
            padding-top: 120px !important;
          }
        }
        @media (min-width: 1024px) {
          .ec-page {
            padding-top: 140px !important;
          }
        }

        /* ════ SEARCH BAR ════ */
        .ec-search-bar-wrap {
          max-width: 520px;
          margin: 0 auto 28px;
          padding: 0 16px;
        }
        .ec-search-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(212,175,55,0.25);
          border-radius: 50px;
          padding: 12px 20px;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .ec-search-bar-wrap.focused .ec-search-bar {
          border-color: rgba(212,175,55,0.6);
          box-shadow: 0 0 0 3px rgba(212,175,55,0.08);
        }
        .ec-search-icon { color: rgba(212,175,55,0.7); flex-shrink: 0; }
        .ec-search-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 400;
          color: #fff;
          min-width: 0;
        }
        .ec-search-input::placeholder { color: rgba(255,255,255,0.35); }
        .ec-search-clear {
          background: rgba(212,175,55,0.12);
          border: 1px solid rgba(212,175,55,0.25);
          border-radius: 50%;
          width: 24px; height: 24px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; flex-shrink: 0;
          color: rgba(212,175,55,0.8);
          transition: background 0.2s ease;
        }
        .ec-search-clear:hover { background: rgba(212,175,55,0.22); }
        .ec-search-hint {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          color: rgba(255,255,255,0.4);
          text-align: center;
          margin-top: 10px;
        }
        .ec-search-hint em { color: rgba(212,175,55,0.7); font-style: normal; }
        .ec-no-results {
          text-align: center;
          padding: 60px 20px;
          font-family: 'Inter', sans-serif;
          color: rgba(255,255,255,0.35);
          font-size: 15px;
        }
        .ec-no-results span { color: rgba(212,175,55,0.6); }

        /* ════ CATEGORY FILTER BUTTONS ════ */
        .ec-filter-wrap {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          max-width: 700px;
          margin: 0 auto 36px;
          padding: 0 16px;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .ec-filter-wrap::-webkit-scrollbar { display: none; }
        .ec-filter-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: rgba(212,175,55,1);
          background: rgba(212,175,55,0.1);
          border: 1.5px solid rgba(212,175,55,0.8);
          border-radius: 50px;
          padding: 8px 20px;
          cursor: pointer;
          transition: all 0.22s ease;
          white-space: nowrap;
          outline: none;
          flex-shrink: 0;
        }
        .ec-filter-btn:hover {
          background: rgba(212,175,55,0.15);
          border-color: rgba(212,175,55,0.75);
          color: rgba(212,175,55,1);
          transform: translateY(-1px);
        }
        .ec-filter-btn.active {
          background: linear-gradient(90deg, #d4af37, #f4e5b8, #d4af37);
          background-size: 200% auto;
          animation: shimmer 4s linear infinite;
          border-color: transparent;
          color: #000;
          font-weight: 700;
          box-shadow: 0 4px 18px rgba(212,175,55,0.35);
          transform: translateY(-1px);
        }
        .ec-filter-btn.active svg { stroke: #000; }
        @media (max-width: 640px) {
          .ec-filter-wrap { 
            gap: 8px; 
            flex-wrap: nowrap;
            justify-content: flex-start;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            padding: 4px 20px;
          }
          .ec-filter-btn { font-size: 12px; padding: 8px 14px; }
        }

        /* ════ PROJECTS SECTION ════ */
        .ec-projects-section {
          position: relative;
          background: linear-gradient(to bottom, #000, #070d1a, #000);
          padding: 60px 24px 80px;
          overflow: hidden;
        }
        @media (max-width: 768px) {
          .ec-projects-section {
            padding-top: 80px;
          }
        }
        .ec-projects-section::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; bottom: 0;
          background: radial-gradient(ellipse at 50% 0%, rgba(212,175,55,.06) 0%, transparent 60%);
          pointer-events: none;
        }
        .ec-projects-header {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 36px;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity .7s ease, transform .7s ease;
        }
        @media (max-width: 768px) {
          .ec-projects-header {
            margin-top: 40px;
          }
        }
        .ec-projects-header.visible { opacity: 1; transform: translateY(0); }
        .ec-projects-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          margin-bottom: 20px;
        }
        .ec-eyebrow-line {
          width: 32px; height: 1px;
          background: linear-gradient(to right, transparent, #d4af37);
        }
        .ec-eyebrow-line.right {
          background: linear-gradient(to left, transparent, #d4af37);
        }
        .ec-eyebrow-text {
          font-family: 'Inter', sans-serif;
          font-size: 11px; font-weight: 700;
          letter-spacing: .16em; color: #d4af37;
          text-transform: uppercase;
        }
        .ec-projects-title {
          font-family: 'Libre Baskerville', serif;
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 700;
          line-height: 1.2;
          color: #fff;
          margin-bottom: 16px;
        }
        .ec-projects-title span {
          background: linear-gradient(90deg, #d4af37, #f4e5b8, #d4af37);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }
        .ec-projects-sub {
          font-family: 'Inter', sans-serif;
          font-size: .95rem;
          color: rgba(255,255,255,.5);
          line-height: 1.7;
          margin-bottom: 0;
        }

        /* ════ GRID ════ */
        .ec-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          max-width: 1200px;
          margin: 0 auto;
        }
        @media(max-width: 1024px) { .ec-grid { grid-template-columns: repeat(2, 1fr); } }
        @media(max-width: 640px)  { .ec-grid { grid-template-columns: 1fr; } }

        /* ════ DESKTOP PROJECT CARD ════ */
        .ec-card-anim {
          opacity: 0; transform: translateY(24px) scale(.97);
          transition: opacity .5s ease, transform .5s ease;
        }
        .ec-card-anim.visible { opacity: 1; transform: translateY(0) scale(1); }
        .ec-card-outer {
          position: relative; height: 380px;
          border-radius: 16px; overflow: hidden;
          cursor: none; background: #0a0a0a;
          box-shadow: 0 8px 32px rgba(0,0,0,.6);
          transition: box-shadow .3s ease, transform .3s ease;
        }
        .ec-card-inner-scroll {
          position: relative; height: 100%;
          overflow-y: auto; overflow-x: hidden; scrollbar-width: none;
        }
        .ec-card-inner-scroll::-webkit-scrollbar { display: none; }
        .ec-card-img-wrap { position: relative; height: auto; pointer-events: none; }
        .ec-card-img { width:100%; height: auto; object-fit: initial; object-position:top center; display:block; user-select:none; }
        .ec-card-grad-top {
          position:sticky; top:0; left:0; right:0; height:60px; margin-bottom:-60px;
          background:linear-gradient(to bottom,rgba(0,0,0,.6),transparent);
          pointer-events:none; z-index:3;
        }
        .ec-card-grad-bot {
          position:sticky; bottom:0; left:0; right:0; height:160px; margin-top:-160px;
          background:linear-gradient(to top,rgba(0,0,0,1) 0%,rgba(0,0,0,.9) 30%,rgba(0,0,0,.55) 65%,transparent 100%);
          pointer-events:none; z-index:3;
        }
        .ec-cat-badge {
          position:sticky; top:12px; float:left; margin:-48px 0 0 12px;
          background:rgba(212,175,55,.92); color:#000;
          padding:4px 13px; border-radius:50px;
          font-size:10px; font-weight:700; letter-spacing:.06em;
          font-family:'Inter',sans-serif;
          backdrop-filter:blur(4px); z-index:10; clear:left;
        }
        .ec-scroll-bar {
          position:sticky; bottom:62px; float:right; margin:0 10px -24px 0;
          width:3px; height:50px; background:rgba(255,255,255,.12);
          border-radius:2px; overflow:hidden; z-index:10; clear:right;
        }
        .ec-scroll-bar-fill {
          width:100%; height:22%;
          background:linear-gradient(to bottom,#d4af37,#b8912a);
          border-radius:2px;
        }
        .ec-card-info {
          position:sticky; bottom:0; padding:12px 16px 16px; z-index:10; pointer-events:none;
          display:flex; align-items:flex-end; justify-content:space-between;
        }
        .ec-card-title {
          font-family:'Libre Baskerville',serif;
          font-size:14px; font-weight:700; color:#fff; line-height:1.3;
          text-shadow:0 1px 10px rgba(0,0,0,1);
          transition:color .3s ease;
        }
        .ec-card-arrow {
          font-size:20px; color:#d4af37;
          text-shadow:0 0 12px rgba(212,175,55,.8);
          flex-shrink:0;
        }
        .ec-card-outer:hover { box-shadow:0 16px 48px rgba(212,175,55,.2); transform:translateY(-4px); }
        .ec-card-outer::after {
          content:''; position:absolute; inset:0; border-radius:16px;
          border:2px solid transparent;
          background:linear-gradient(135deg,rgba(212,175,55,.6),transparent 50%,rgba(212,175,55,.3)) border-box;
          -webkit-mask:linear-gradient(#fff 0 0) padding-box,linear-gradient(#fff 0 0);
          mask:linear-gradient(#fff 0 0) padding-box,linear-gradient(#fff 0 0);
          -webkit-mask-composite:destination-out; mask-composite:exclude;
          opacity:0; transition:opacity .3s ease; pointer-events:none; z-index:20;
        }
        .ec-card-outer:hover::after { opacity:1; }
        .ec-card-outer:hover .ec-card-title { color:#f4e5b8; }
        .ec-custom-cursor {
          position:absolute; transform:translate(-50%,-50%);
          pointer-events:none; transition:opacity 0.3s ease; z-index:100;
        }
        .ec-cursor-circle {
          width:48px; height:48px; border-radius:50%;
          background:rgba(15,15,15,0.8); backdrop-filter:blur(6px);
          display:flex; align-items:center; justify-content:center;
          box-shadow:0 2px 20px rgba(0,0,0,.4),0 0 0 1px rgba(212,175,55,.2);
        }

        /* ════ MOBILE CARD ════ */
        .mob-card-anim {
          transition: opacity 0.58s ease, transform 0.58s cubic-bezier(0.22,1,0.36,1);
          border-radius: 18px; overflow: hidden;
          -webkit-tap-highlight-color: transparent; touch-action: pan-y;
        }
        .mob-img-outer {
          position:relative; height:320px; border-radius:18px; overflow:hidden;
          background:#111; border:2px solid rgba(212,175,55,.4);
          box-shadow:0 10px 40px rgba(0,0,0,.7),0 0 0 1px rgba(212,175,55,.1);
        }
        .mob-scroll-container {
          position:absolute; inset:0; overflow-y:scroll; overflow-x:hidden;
          scrollbar-width:none; -webkit-overflow-scrolling:touch;
          touch-action:pan-y; cursor:pointer; z-index:2;
        }
        .mob-scroll-container::-webkit-scrollbar { display:none; }
        .mob-img-wrap { height: auto; pointer-events:none; }
        .mob-img { width:100%; height: auto; object-fit: initial; object-position:top center; display:block; user-select:none; }
        .mob-shine { position:absolute; top:0; left:-100%; bottom:0; width:55%;
          background:linear-gradient(105deg,transparent 20%,rgba(255,255,255,.2) 50%,transparent 80%);
          pointer-events:none; z-index:15; opacity:0; }
        .mob-shine.mob-shine-run { animation:shineSweep .9s ease-out .25s forwards; }
        .mob-grad-top { position:absolute; top:0; left:0; right:0; height:64px;
          background:linear-gradient(to bottom,rgba(0,0,0,.6),transparent);
          pointer-events:none; z-index:5; }
        .mob-grad-bot { position:absolute; bottom:0; left:0; right:0; height:170px;
          background:linear-gradient(to top,rgba(0,0,0,.95) 0%,rgba(0,0,0,.7) 35%,rgba(0,0,0,.2) 70%,transparent 100%);
          pointer-events:none; z-index:5; }
        .mob-badge {
          position:absolute; top:14px; left:14px;
          background:rgba(212,175,55,.92); color:#000;
          font-family:'Inter',sans-serif;
          font-size:10px; font-weight:700; letter-spacing:.06em;
          padding:4px 12px; border-radius:50px;
          z-index:10; backdrop-filter:blur(4px);
        }
        .mob-hint {
          position:absolute; bottom:58px; left:50%; transform:translateX(-50%);
          display:flex; align-items:center; gap:8px;
          background:rgba(0,0,0,.72); backdrop-filter:blur(10px);
          border:1px solid rgba(212,175,55,.3); border-radius:50px;
          padding:6px 14px; z-index:20; pointer-events:none;
          white-space:nowrap; transition:opacity .3s ease;
        }
        .mob-hint.mob-hint-pulse { animation:hintPulseAnim .55s ease; }
        .mob-hint-scroll,.mob-hint-dbl {
          display:flex; align-items:center; gap:5px;
          font-family:'Inter',sans-serif;
          font-size:10px; font-weight:600; letter-spacing:.04em;
          color:rgba(244,229,184,.9);
        }
        .mob-hint-divider { color:rgba(212,175,55,.5); font-size:12px; }
        .mob-scroll-track {
          position:absolute; right:8px; top:14px; bottom:14px;
          width:3px; background:rgba(255,255,255,.12);
          border-radius:2px; z-index:10; pointer-events:none; overflow:hidden;
        }
        .mob-scroll-dot { width:100%; height:22%;
          background:linear-gradient(to bottom,#d4af37,#b8912a); border-radius:2px; }
        .mob-info {
          position:absolute; bottom:0; left:0; right:0;
          padding:14px 14px 18px;
          display:flex; align-items:flex-end; justify-content:space-between;
          z-index:10; pointer-events:none;
        }
        .mob-title {
          font-family:'Libre Baskerville',serif;
          font-size:14px; font-weight:700; color:#fff; line-height:1.3;
          text-shadow:0 1px 12px rgba(0,0,0,1); margin:0; max-width:78%;
        }
        .mob-arrow { font-size:20px; color:#d4af37;
          text-shadow:0 0 14px rgba(212,175,55,.9); flex-shrink:0; line-height:1; }

        /* ════ CLOSING SECTION ════ */
        .ec-last-section {
          position: relative;
          min-height: 420px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 80px 24px;
          overflow: hidden;
          background: #000;
        }
        .ec-last-bg {
          position: absolute; inset: 0;
          background-image: url('https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/bgecomm.jfif');
          background-size: cover;
          background-position: center;
          opacity: 0.38;
          z-index: 0;
        }
        .ec-last-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(0,0,0,.7) 0%, rgba(0,0,0,.4) 50%, rgba(0,0,0,.7) 100%);
          z-index: 1;
        }
        .ec-last-card {
          position: relative; z-index: 2;
          max-width: 700px; width: 90%;
          padding: 60px 52px;
          border-radius: 24px;
          background: rgba(255,255,255,.04);
          backdrop-filter: blur(10px) saturate(1.5);
          -webkit-backdrop-filter: blur(10px) saturate(1.5);
          border: 1px solid rgba(212,175,55,.15);
          text-align: center;
          overflow: hidden;
          opacity: 0;
          transform: translateY(40px) scale(.97);
          transition: opacity .8s ease, transform .8s ease;
        }
        .ec-last-card.visible { opacity: 1; transform: translateY(0) scale(1); }
        .ec-last-card-bg {
          position: absolute; inset: 0;
          background-size: cover;
          background-position: center;
          opacity: 0.70;
          z-index: 0;
          pointer-events: none;
        }
        .ec-last-card-overlay {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 50% 110%, rgba(0,0,0,.65) 0%, transparent 65%),
                      radial-gradient(ellipse at 50% -10%, rgba(0,0,0,.5) 0%, transparent 60%);
          z-index: 0;
          pointer-events: none;
        }
        .ec-last-card-content { position: relative; z-index: 1; }
        .ec-last-card::before {
          content: '';
          position: absolute; inset: 0; border-radius: 24px;
          background: radial-gradient(ellipse at 50% 0%, rgba(212,175,55,.07) 0%, transparent 60%);
          pointer-events: none; z-index: 0;
        }
        .ec-last-icon {
          width: 52px; height: 52px;
          margin: 0 auto 24px;
          border-radius: 50%;
          background: rgba(212,175,55,.1);
          border: 1px solid rgba(212,175,55,.3);
          display: flex; align-items: center; justify-content: center;
        }
        .ec-last-title {
          font-family: 'Libre Baskerville', serif;
          font-size: clamp(1.6rem, 3.5vw, 2.4rem);
          font-weight: 700;
          line-height: 1.25;
          color: #fff;
          margin-bottom: 20px;
        }
        .ec-last-title span {
          background: linear-gradient(90deg, #d4af37, #f4e5b8);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .ec-last-line {
          width: 60px; height: 2px;
          background: linear-gradient(to right, transparent, #d4af37, transparent);
          margin: 0 auto 24px;
          border-radius: 2px;
        }
        .ec-last-para {
          font-family: 'Inter', sans-serif;
          font-size: clamp(.88rem, 1.8vw, 1rem);
          font-weight: 400;
          line-height: 1.85;
          color: rgba(255,255,255,.65);
          margin-bottom: 36px;
        }
        .ec-learn-btn {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'Inter', sans-serif;
          font-size: 14px; font-weight: 600;
          letter-spacing: .06em;
          color: #000;
          background: linear-gradient(90deg, #d4af37, #f4e5b8, #d4af37);
          background-size: 200% auto;
          padding: 14px 36px;
          border-radius: 50px;
          border: none; cursor: pointer;
          transition: all .3s ease;
          box-shadow: 0 4px 24px rgba(212,175,55,.35);
          animation: shimmer 4s linear infinite;
        }
        .ec-learn-btn:hover {
          transform: translateY(-2px) scale(1.04);
          box-shadow: 0 8px 36px rgba(212,175,55,.5);
        }
        .ec-learn-btn svg { transition: transform .3s ease; }
        .ec-learn-btn:hover svg { transform: translateX(4px); }

        @media(max-width: 640px) {
          .ec-last-card { padding: 40px 24px; }
          .ec-search-bar-wrap { padding: 0 8px; }
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

      <div className="ec-page">

        {/* ════ SECTION 1 HERO (hidden) ════ */}
        {/*
        <section className="ec-hero">
          ...hero content...
        </section>
        */}

        {/* ════ SECTION 2 VIDEO + CONTENT (hidden) ════ */}
        {/*
        <section className="ec-info-section">
          ...video + info content...
        </section>
        */}

        {/* ════ SECTION 3 PROJECTS (page starts here) ════ */}
        <section className="ec-projects-section">
          <div ref={cardsRef} className={`ec-projects-header ${cardsVisible ? "visible" : ""}`}>

            <h2 className="ec-projects-title">
              Have a look at our
              <span><br />E-COMMERCE</span> Projects
            </h2>
            <p className="ec-projects-sub">
              Each website crafted with precision blending aesthetics with performance-driven architecture.
            </p>
          </div>

          {/* ── Category Filter Buttons ── */}
          <CategoryFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />

          {/* ── Search Bar ── */}
          <SearchBar
            query={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search e-commerce projects..."
            prefix="ec"
          />

          {filteredProjects.length === 0 ? (
            <div className="ec-no-results">
              No projects found for <span>"{searchQuery}"</span>
              {activeFilter !== "All" && <> in <span>{activeFilter}</span></>}
            </div>
          ) : (
            <div className="ec-grid">
              {filteredProjects.map((project, index) => (
                <AnimatedCard
                  key={project.title}
                  project={project}
                  index={index}
                  isVisible={cardsVisible}
                />
              ))}
            </div>
          )}
        </section>


        <ContactUsForm /> <br />
        <PortfolioSection />
      </div>
    </>
  );
};

export default EcommercePage;