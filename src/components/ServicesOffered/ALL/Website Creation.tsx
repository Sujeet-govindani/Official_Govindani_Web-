import { useState, useEffect, useRef, useCallback } from "react";
import ServiceSection from "@/components/ServicesSection";
import ContactUsForm from "@/pages/ContactUsForm";
import SEO from "@/components/SEO";
import { pageSEO } from "@/seo/pageSEO";

// ─── Detect touch device ────────────────────────────────────────────────────
const isTouchDevice = () =>
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

// ── Menu Icon SVG (no external dependency) ───────────────────────────────────
const MenuIcon = ({ style }: { style?: React.CSSProperties }) => (
  <svg
    width="14" height="14" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2.5"
    strokeLinecap="round" strokeLinejoin="round"
    style={style}
  >
    <line x1="3" y1="6"  x2="21" y2="6"  />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

// ── Radial Nav Menu ───────────────────────────────────────────────────────────
const RadialNavMenu = () => {
  const [open, setOpen] = useState(false);

  const topItems = [
    { label: "About",    section: "about-section"    },
    { label: "Features", section: "features-section" },
    { label: "Projects", section: "projects-section" },
  ];
  const bottomItems = [
    { label: "NGO",        section: "ngo-section"        },
    { label: "E-Commerce", section: "ecomm-section"      },
    { label: "Healthcare", section: "healthcare-section" },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  const btnBase: React.CSSProperties = {
    position:      "absolute",
    right:         0,
    width:         "80px",
    padding:       "6px 4px",
    fontSize:      "10px",
    fontWeight:    600,
    letterSpacing: "0.03em",
    textAlign:     "center",
    border:        "1px solid rgba(251,191,36,0.45)",
    borderRadius:  "8px 0 0 8px",
    background:    "linear-gradient(135deg,#1a1200,#0c0c0c)",
    color:         "#fbbf24",
    cursor:        "pointer",
    whiteSpace:    "nowrap",
    transition:    "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
    backdropFilter:"blur(10px)",
    boxShadow:     "0 2px 12px rgba(0,0,0,0.6)",
    lineHeight:    "1.3",
  };

  const topStyles: React.CSSProperties[] = topItems.map((_, i) => ({
    ...btnBase,
    bottom:          `${(topItems.length - i) * 46 + 8}px`,
    opacity:         open ? 1 : 0,
    transform:       open ? "translateX(0) scale(1)" : "translateX(30px) scale(0.7)",
    transitionDelay: open ? `${i * 55}ms` : `${(topItems.length - 1 - i) * 35}ms`,
    pointerEvents:   open ? "auto" : "none",
  }));

  const bottomStyles: React.CSSProperties[] = bottomItems.map((_, i) => ({
    ...btnBase,
    top:             `${(i + 1) * 46 + 8}px`,
    opacity:         open ? 1 : 0,
    transform:       open ? "translateX(0) scale(1)" : "translateX(30px) scale(0.7)",
    transitionDelay: open ? `${i * 55}ms` : `${(bottomItems.length - 1 - i) * 35}ms`,
    pointerEvents:   open ? "auto" : "none",
  }));

  const totalItems = topItems.length + bottomItems.length + 1;

  return (
    <div
      style={{
        position:      "fixed",
        right:         0,
        top:           "50%",
        transform:     "translateY(-50%)",
        zIndex:        9999,
        display:       "flex",
        flexDirection: "column",
        alignItems:    "flex-end",
      }}
    >
      <div
        style={{
          position:       "relative",
          height:         `${totalItems * 46 + 20}px`,
          width:          "88px",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "flex-end",
        }}
      >
        {/* Top buttons (spread upward) */}
        {topItems.map((item, i) => (
          <button
            key={item.section}
            style={topStyles[i]}
            onClick={() => scrollTo(item.section)}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background  = "linear-gradient(135deg,#92400e,#1a1200)";
              (e.currentTarget as HTMLButtonElement).style.color       = "#fff";
              (e.currentTarget as HTMLButtonElement).style.boxShadow   = "0 4px 18px rgba(251,191,36,0.3)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background  = "linear-gradient(135deg,#1a1200,#0c0c0c)";
              (e.currentTarget as HTMLButtonElement).style.color       = "#fbbf24";
              (e.currentTarget as HTMLButtonElement).style.boxShadow   = "0 2px 12px rgba(0,0,0,0.6)";
            }}
          >
            {item.label}
          </button>
        ))}

        {/* Central Menu toggle button */}
        <button
          onClick={() => setOpen((p) => !p)}
          style={{
            position:      "absolute",
            right:         0,
            top:           "50%",
            transform:     "translateY(-50%)",
            width:         "80px",
            padding:       "10px 4px",
            fontSize:      "11px",
            fontWeight:    700,
            letterSpacing: "0.08em",
            textAlign:     "center",
            border:        "1px solid rgba(251,191,36,0.7)",
            borderRadius:  "10px 0 0 10px",
            background:    open
              ? "linear-gradient(135deg,#92400e,#451a03)"
              : "linear-gradient(135deg,#451a03,#1a0800)",
            color:         "#fbbf24",
            cursor:        "pointer",
            transition:    "all 0.3s ease",
            backdropFilter:"blur(10px)",
            boxShadow:     open
              ? "0 0 20px rgba(251,191,36,0.35), -4px 0 16px rgba(251,191,36,0.2)"
              : "0 2px 14px rgba(0,0,0,0.7)",
            zIndex:        10,
            display:       "flex",
            flexDirection: "column",
            alignItems:    "center",
            gap:           "4px",
          }}
        >
          <MenuIcon
            style={{
              color:      "#fbbf24",
              transition: "transform 0.3s ease",
              transform:  open ? "rotate(90deg)" : "rotate(0deg)",
            }}
          />
          Menu
        </button>

        {/* Bottom buttons (spread downward) */}
        {bottomItems.map((item, i) => (
          <button
            key={item.section}
            style={bottomStyles[i]}
            onClick={() => scrollTo(item.section)}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background  = "linear-gradient(135deg,#92400e,#1a1200)";
              (e.currentTarget as HTMLButtonElement).style.color       = "#fff";
              (e.currentTarget as HTMLButtonElement).style.boxShadow   = "0 4px 18px rgba(251,191,36,0.3)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background  = "linear-gradient(135deg,#1a1200,#0c0c0c)";
              (e.currentTarget as HTMLButtonElement).style.color       = "#fbbf24";
              (e.currentTarget as HTMLButtonElement).style.boxShadow   = "0 2px 12px rgba(0,0,0,0.6)";
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

// ─── Mobile Card ─────────────────────────────────────────────────────────────
function MobileCard({
  project,
  index,
}: {
  project: { title: string; category: string; url: string; image: string };
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastTapRef = useRef<number>(0);
  const tapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollAnimRef = useRef<number>(0);
  const [visible, setVisible] = useState(false);
  const [hintVisible, setHintVisible] = useState(true);
  const [hintPulse, setHintPulse] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

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
      const { scrollTop, scrollHeight, clientHeight } = el;
      const maxScroll = scrollHeight - clientHeight;
      setScrollProgress(maxScroll > 0 ? scrollTop / maxScroll : 0);
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

  const handleTap = useCallback((e: React.TouchEvent | React.MouseEvent) => {
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
      tapTimerRef.current = setTimeout(() => { triggerScrollHint(); }, 200);
    }
  }, [project.url, triggerScrollHint]);

  const fillTopPercent = scrollProgress * 80;
  return (
    <div ref={cardRef} className="mob-card-anim" style={{ transitionDelay: `${index * 0.09}s`, opacity: visible ? 1 : 0, transform: visible ? "translateY(0) scale(1)" : "translateY(48px) scale(0.95)" }}>
      <div className="mob-img-outer">
        <div ref={scrollRef} className="mob-scroll-container" onTouchEnd={handleTap} onClick={handleTap}>
          <div className="mob-img-wrap">
            <img src={project.image} alt={project.title} className="mob-img" draggable={false} />
          </div>
        </div>
        <div className={`mob-shine ${visible ? "mob-shine-run" : ""}`} />
        <div className="mob-grad-top" />
        <div className="mob-grad-bot" />
        <div className="mob-badge">{project.category.toUpperCase()}</div>
        {hintVisible && (
          <div className={`mob-hint ${hintPulse ? "mob-hint-pulse" : ""}`}>
            <span className="mob-hint-scroll">
              <svg width="13" height="20" viewBox="0 0 13 20" fill="none"><rect x="1" y="1" width="11" height="16" rx="5.5" stroke="currentColor" strokeWidth="1.4"/><line x1="6.5" y1="4" x2="6.5" y2="8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
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
        <div className="mob-scroll-track">
          <div className="mob-scroll-dot" style={{ top: `${fillTopPercent}%`, transition: "top 0.1s linear" }} />
        </div>
      </div>
    </div>
  );
}

// ─── Desktop Animated Card ────────────────────────────────────────────────────
function DesktopCard({
  project, index, isVisible,
}: {
  project: { title: string; category: string; url: string; image: string };
  index: number;
  isVisible: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const scrollAnimRef = useRef<number>(0);
  const cursorAnimRef = useRef<number>(0);
  const [cursor, setCursor] = useState({ x: 0, y: 0, opacity: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  const animateCursor = useCallback(() => {
    cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.12;
    cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.12;
    setCursor(prev => ({ ...prev, x: cursorPos.current.x, y: cursorPos.current.y }));
    cursorAnimRef.current = requestAnimationFrame(animateCursor);
  }, []);

  const animateScrollReset = useCallback(() => {
    if (!scrollRef.current) return;
    const cur = scrollRef.current.scrollTop;
    if (cur > 0.5) { scrollRef.current.scrollTop = cur * 0.88; scrollAnimRef.current = requestAnimationFrame(animateScrollReset); }
    else { scrollRef.current.scrollTop = 0; }
  }, []);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const maxScroll = scrollHeight - clientHeight;
    setScrollProgress(maxScroll > 0 ? scrollTop / maxScroll : 0);
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

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mousePos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  useEffect(() => () => {
    cancelAnimationFrame(cursorAnimRef.current);
    cancelAnimationFrame(scrollAnimRef.current);
  }, []);

  const fillTopPercent = scrollProgress * 80;
  return (
    <div className={`card-anim ${isVisible ? "visible" : ""}`} style={{ transitionDelay: `${index * 0.1}s` }}>
      <div ref={containerRef} className="card-outer" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onMouseMove={handleMouseMove} onClick={() => window.open(project.url, "_blank", "noopener,noreferrer")}>
        <div ref={scrollRef} className="card-inner-scroll" onScroll={handleScroll}>
          <div className="card-img-wrap">
            <img src={project.image} alt={project.title} className="card-img" draggable={false} />
          </div>
          <div className="card-grad-top" />
          <div className="card-grad-bot" />
          <div className="cat-badge">{project.category.toUpperCase()}</div>
          <div className="scroll-bar">
            <div className="scroll-bar-fill" style={{ top: `${fillTopPercent}%`, transition: "top 0.1s linear" }} />
          </div>
          <div className="card-info">
            <h3 className="card-title">{project.title}</h3>
          </div>
        </div>
        <div className="custom-cursor" style={{ left: cursor.x, top: cursor.y, opacity: cursor.opacity }}>
          <div className="cursor-circle">
            <svg width="18" height="26" viewBox="0 0 18 26" fill="none"><rect x="1" y="1" width="16" height="22" rx="8" stroke="white" strokeWidth="1.5"/><line x1="9" y1="5" x2="9" y2="10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Smart Card ───────────────────────────────────────────────────────────────
function AnimatedCard({ project, index, isVisible }: { project: { title: string; category: string; url: string; image: string }; index: number; isVisible: boolean; }) {
  const [touch, setTouch] = useState(false);
  useEffect(() => { setTouch(isTouchDevice()); }, []);
  return touch
    ? <MobileCard project={project} index={index} />
    : <DesktopCard project={project} index={index} isVisible={isVisible} />;
}

// ─── Intersection Observer hook ──────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Section Category Title ───────────────────────────────────────────────────
function CatTitle({ children }: { children: React.ReactNode }) {
  const { ref, inView } = useInView(0.2);
  return (
    <div ref={ref} className={`cat-title-wrap fade-up ${inView ? "visible" : ""}`}>
      <div className="cat-title-line left-line" />
      <h2 className="cat-title">{children}</h2>
      <div className="cat-title-line right-line" />
    </div>
  );
}

// ─── View More Button ─────────────────────────────────────────────────────────
function ViewMoreBtn({ onClick, label = "View More Projects" }: { onClick: () => void; label?: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 48, marginBottom: 0 }}>
      <button className="view-more-btn" onClick={onClick}>{label}</button>
    </div>
  );
}

// ─── Cards Grid ───────────────────────────────────────────────────────────────
function CardsGrid({ projects, cols = 3 }: { projects: { title: string; category: string; url: string; image: string }[]; cols?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setIsVisible(true); }, { threshold: 0.05 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${Math.min(cols, projects.length)}, 1fr)`,
    gap: 24,
    width: "100%",
  };

  return (
    <div ref={ref} className="cards-grid-wrapper" style={gridStyle}>
      {projects.map((p, i) => (
        <AnimatedCard key={p.title} project={p} index={i} isVisible={isVisible} />
      ))}
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
const WebDevelopmentPage = () => {
  const hero = useInView(0.1);
  const about = useInView(0.1);
  const projects = useInView(0.05);

  const handleNgoPortfolio = () => { window.location.href = "/portfolio/NGO#/portfolio/NGO"; };
  const handleEcommercePortfolio = () => { window.location.href = "/portfolio/NGO#/portfolio/EcommercePage"; };
  const handleNewsBlogging = () => { window.location.href = "/portfolio/NGO#/portfolio/Business"; };
  const handleHealthcarePortfolio = () => { window.location.href = "/portfolio/NGO#/portfolio/healthcare"; };

  const ngoProjects = [
    { title: "Popatbhai Charitable Trust", category: "ngo", url: "https://popatbhaicharitablefoundation.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PCF.webp" },
    { title: "Harsh Chhikkara Jan Seva Trust", category: "ngo", url: "https://harshchhikara.com/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/np1.webp" },
    { title: "Mahipatsinh Foundation", category: "ngo", url: "https://mahipatsinhfoundation.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/MP.webp" },
  ];
  const realEstateProjects = [
    { title: "CI BUILDERS", category: "real-estate", url: "https://cibuilders.in/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/RE2.webp" },
    { title: "JANKI BUILDERS", category: "real-estate", url: "https://jankibuilders.com/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/RE1.webp" },
  ];
  const ecommProjects = [
    { title: "Baba Ji Ki Buti", category: "e-commerce", url: "https://babajikibuti.com/home", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/BJKB2.webp" },
    { title: "Terra by Trishla", category: "e-commerce", url: "https://terrabytrishla.com/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ecomm2.webp" },
    { title: "Madhav Numerology", category: "e-commerce", url: "https://madhavnumerology.com/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ecomm3.webp" },
  ];
  const newsProjects = [
    { title: "Anekaa Care Foundation", category: "blog", url: "https://anekaacarefoundation.org/our-blogs/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Anekaa-Care-Foundation.webp" },
    { title: "GSD Organics", category: "blog", url: "https://gsdorganics.com/our-blogs/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/E-Commerce/Wordpress/Wordpress-Gsd-Organics.webp" },
    { title: "Voice Of Slum", category: "news", url: "https://voiceofslum.org/blog/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Voice-Of-Slum.webp" },
    { title: "Dr. C.K. Reddy Group", category: "blog", url: "https://drckreddygroup.com/our-blogs/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/BusinessWebsites/Business-Website-Dr-C-K-Reddy-Group.webp" },
  ];
  const healthcareProjects = [
    { title: "MAHAVEER EYE HOSPITAL", category: "healthcare", url: "https://mahaveereyehospital.com/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/hospital.webp" },
  ];

  const features = [
    { icon: "📱", label: "Responsive Design", desc: "Flawless on every screen size" },
    { icon: "🎨", label: "Custom Solutions", desc: "Tailored to your brand identity" },
    { icon: "🛒", label: "E-commerce Integration", desc: "Secure payment & product flows" },
    { icon: "🔍", label: "SEO-Friendly", desc: "Built to rank on Google" },
    { icon: "🔒", label: "Security", desc: "SSL, firewall & data protection" },
    { icon: "⚡", label: "Speed Optimized", desc: "Sub-2s load times guaranteed" },
    { icon: "☁️", label: "CMS Development", desc: "Easy content management" },
    { icon: "🌐", label: "PWA Ready", desc: "Works offline like a native app" },
  ];

  const keyComponents = [
    "Better Core Web Vitals",
    "Modern Content Formats",
   
  ];

  return (
    <>
      <SEO {...pageSEO.websiteCreation} />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --gold: #d4af37;
          --gold-light: #f4e5b8;
          --gold-dark: #a07d1c;
          --cream: #fdf5e0;
          --black: #000000;
          --dark: #0a0a0a;
          --dark2: #111111;
          --text-primary: #f0e8d0;
          --text-muted: #8a7a5a;
          --font-head: 'Libre Baskerville', serif;
          --font-body: 'Inter', sans-serif;
        }

        body { background: var(--black); color: var(--text-primary); }

        /* ── UTILS ── */
        .fade-up {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .fade-up.visible { opacity: 1; transform: translateY(0); }
        .fade-left {
          opacity: 0;
          transform: translateX(-32px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .fade-left.visible { opacity: 1; transform: translateX(0); }
        .fade-right {
          opacity: 0;
          transform: translateX(32px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .fade-right.visible { opacity: 1; transform: translateX(0); }

        .gold-text {
          background: linear-gradient(90deg, #d4af37, #f4e5b8, #d4af37);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* ── PAGE WRAPPER ── */
        .page-wrap {
          background: var(--black);
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* ══════════════════════════════════════════
           SECTION 1 — HERO
        ══════════════════════════════════════════ */
        .hero-section {
          min-height: 10vh;
          display: flex;
          align-items: center;
          padding: clamp(100px, 8vw, 120px) 6vw clamp(48px, 5vw, 60px);
          position: relative;
          overflow: hidden;
        }
        .hero-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 70% at 70% 50%, rgba(212,175,55,0.07) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 10% 20%, rgba(212,175,55,0.04) 0%, transparent 60%);
          pointer-events: none;
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          max-width: 1280px;
          margin: 0 auto;
          width: 100%;
        }
        .hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(212,175,55,0.1);
          border: 1px solid rgba(212,175,55,0.25);
          border-radius: 50px;
          padding: 6px 16px;
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 24px;
        }
        .hero-tag::before {
          content: '';
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--gold);
          box-shadow: 0 0 8px rgba(212,175,55,0.8);
          animation: pulse-dot 2s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%,100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }
        .hero-h1 {
          font-family: var(--font-head);
          font-size: clamp(2.8rem, 5vw, 4.5rem);
          font-weight: 700;
          line-height: 1.1;
          margin-bottom: 12px;
          color: #fff;
        }
        .hero-sub {
          font-family: var(--font-head);
          font-size: clamp(1.1rem, 2vw, 1.5rem);
          font-weight: 400;
          font-style: italic;
          color: var(--gold-light);
          margin-bottom: 28px;
          line-height: 1.4;
        }
        .hero-desc {
          font-family: var(--font-body);
          font-size: 16px;
          font-weight: 400;
          line-height: 1.75;
          color: rgba(240,232,208,0.75);
          max-width: 500px;
          margin-bottom: 40px;
        }
        .hero-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 32px;
          background: linear-gradient(135deg, #d4af37, #a07d1c);
          color: #000;
          font-family: var(--font-body);
          font-weight: 600;
          font-size: 14px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 24px rgba(212,175,55,0.3);
        }
        .hero-cta:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(212,175,55,0.45); }
        .hero-right {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hero-img-frame {
          position: relative;
          width: 100%;
          max-width: 560px;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(212,175,55,0.2);
          box-shadow: 0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,175,55,0.08);
        }
        .hero-img-frame img { width: 100%; height: auto; display: block; }
        .hero-img-frame::before {
          content: '';
          position: absolute;
          top: -1px; left: -1px; right: -1px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #d4af37, transparent);
          z-index: 2;
        }
        .hero-stat {
          position: absolute;
          background: rgba(10,10,10,0.92);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(212,175,55,0.25);
          border-radius: 12px;
          padding: 12px 18px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .hero-stat-num { font-family: var(--font-head); font-size: 22px; font-weight: 700; color: var(--gold); }
        .hero-stat-lbl { font-family: var(--font-body); font-size: 11px; color: rgba(240,232,208,0.55); letter-spacing: 0.05em; text-transform: uppercase; }
        .stat-1 { bottom: 24px; left: -24px; }
        .stat-2 { top: 24px; right: -24px; }

        /* ══════════════════════════════════════════
           SECTION 2 — ABOUT / KEY COMPONENTS
        ══════════════════════════════════════════ */
        .about-section {
          padding: 100px 6vw 0;
          background: var(--black);
          position: relative;
        }
        .about-section::before {
          content: '';
          position: absolute;
          left: 0; top: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent);
        }
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: start;
          max-width: 1280px;
          margin: 0 auto;
        }
        .section-label {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .section-label::before { content: ''; width: 32px; height: 1px; background: var(--gold); }
        .about-h2 {
          font-family: var(--font-head);
          font-size: clamp(1.9rem, 3.5vw, 2.8rem);
          font-weight: 700;
          line-height: 1.2;
          color: #fff;
          margin-bottom: 24px;
        }
        .about-p { font-family: var(--font-body); font-size: 15px; line-height: 1.8; color: rgba(240,232,208,0.7); margin-bottom: 16px; }
        .key-comp-title { font-family: var(--font-head); font-size: 16px; font-weight: 700; color: var(--gold-light); margin: 32px 0 16px; }
        .key-comp-list { display: flex; flex-direction: column; gap: 10px; }
        .key-comp-item {
          display: flex; align-items: center; gap: 12px;
          font-family: var(--font-body); font-size: 14px; color: rgba(240,232,208,0.8);
          padding: 10px 16px;
          background: rgba(212,175,55,0.04); border: 1px solid rgba(212,175,55,0.1); border-radius: 8px;
          transition: all 0.25s ease;
        }
        .key-comp-item:hover { background: rgba(212,175,55,0.08); border-color: rgba(212,175,55,0.25); transform: translateX(4px); }
        .key-comp-item::before { content: '→'; color: var(--gold); font-size: 13px; flex-shrink: 0; }
        .torn-page {
          position: relative;
          background: linear-gradient(160deg, #1a1500 0%, #0f0e06 100%);
          border: 1px solid rgba(212,175,55,0.15);
          border-radius: 4px 16px 16px 4px;
          padding: 36px 32px 40px;
          box-shadow: 8px 8px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(212,175,55,0.08);
        }
        .torn-page::before {
          content: '';
          position: absolute; left: -10px; top: 0; bottom: 0; width: 10px;
          background: linear-gradient(to right, transparent, rgba(212,175,55,0.04));
          clip-path: polygon(100% 0, 100% 5%, 50% 8%, 100% 12%, 50% 16%, 100% 20%, 50% 24%, 100% 28%, 50% 32%, 100% 36%, 50% 40%, 100% 44%, 50% 48%, 100% 52%, 50% 56%, 100% 60%, 50% 64%, 100% 68%, 50% 72%, 100% 76%, 50% 80%, 100% 84%, 50% 88%, 100% 92%, 50% 96%, 100% 100%, 0 100%, 0 0);
        }
        .torn-page-title {
          font-family: var(--font-head); font-size: 20px; font-weight: 700; color: var(--gold-light);
          margin-bottom: 28px; padding-bottom: 16px; border-bottom: 1px solid rgba(212,175,55,0.15);
          display: flex; align-items: center; gap: 10px;
        }
        .features-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .feature-item {
          padding: 16px; background: rgba(212,175,55,0.04); border: 1px solid rgba(212,175,55,0.1);
          border-radius: 10px; transition: all 0.3s ease; cursor: default;
        }
        .feature-item:hover { background: rgba(212,175,55,0.08); border-color: rgba(212,175,55,0.3); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.4); }
        .feature-icon { font-size: 22px; margin-bottom: 8px; }
        .feature-label { font-family: var(--font-head); font-size: 13px; font-weight: 700; color: #fff; margin-bottom: 4px; }
        .feature-desc { font-family: var(--font-body); font-size: 11px; color: rgba(240,232,208,0.5); line-height: 1.5; }

        /* ══════════════════════════════════════════
           SECTION 4 — PROJECTS
        ══════════════════════════════════════════ */
        .projects-section {
          padding: 80px 6vw 0;
          background: var(--black);
          position: relative;
        }
        .projects-section::before {
          content: '';
          position: absolute; left: 0; top: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent);
        }
        .projects-inner { max-width: 1280px; margin: 0 auto; }
        .proj-main-header { text-align: center; margin-bottom: 80px; }
        .proj-main-label { font-family: var(--font-body); font-size: 12px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); margin-bottom: 12px; }
        .proj-main-h1 { font-family: var(--font-head); font-size: clamp(2.2rem, 5vw, 4rem); font-weight: 700; color: #fff; margin-bottom: 8px; line-height: 1.1; }
        .proj-main-h2 { font-family: var(--font-head); font-size: clamp(1.4rem, 3vw, 2.2rem); font-weight: 400; font-style: italic; color: var(--gold-light); }
        .proj-main-divider { width: 80px; height: 3px; background: linear-gradient(90deg, #d4af37, #f4e5b8); border-radius: 2px; margin: 20px auto 0; }
        .cat-block { margin-bottom: 96px; }
        .cat-title-wrap { display: flex; align-items: center; gap: 20px; margin-bottom: 40px; justify-content: center; }
        .cat-title {
          font-family: var(--font-head); font-size: clamp(1.5rem, 3vw, 2.2rem); font-weight: 700; white-space: nowrap;
          background: linear-gradient(90deg, #d4af37, #f4e5b8, #d4af37);
          -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
        }
        .cat-title-line { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, rgba(212,175,55,0.35)); max-width: 200px; }
        .cat-title-line.right-line { background: linear-gradient(90deg, rgba(212,175,55,0.35), transparent); }
        .cat-desc { font-family: var(--font-body); font-size: 15px; line-height: 1.75; color: rgba(240,232,208,0.65); text-align: center; max-width: 680px; margin: 0 auto 32px; }
        .cards-grid-wrapper { width: 100%; display: grid; gap: 24px; }
        .re-info-box { margin-top: 32px; background: rgba(212,175,55,0.04); border: 1px solid rgba(212,175,55,0.12); border-radius: 14px; padding: 28px 32px; display: flex; gap: 32px; align-items: flex-start; }
        .re-info-icon { font-size: 32px; flex-shrink: 0; margin-top: 2px; }
        .re-info-content { flex: 1; }
        .re-info-title { font-family: var(--font-head); font-size: 16px; font-weight: 700; color: var(--gold-light); margin-bottom: 8px; }
        .re-info-text { font-family: var(--font-body); font-size: 14px; line-height: 1.7; color: rgba(240,232,208,0.6); }
        .healthcare-single { display: flex; justify-content: center; }
        .healthcare-single > * { max-width: 400px; width: 100%; }

        /* CARD STYLES */
        .card-outer {
          position: relative; height: 460px; border-radius: 16px; overflow: hidden;
          cursor: none; background: #0a0a0a; box-shadow: 0 8px 32px rgba(0,0,0,.5);
          transition: box-shadow .3s ease, transform .3s ease;
        }
        .card-inner-scroll { position: relative; height: 100%; overflow-y: auto; overflow-x: hidden; scrollbar-width: none; }
        .card-inner-scroll::-webkit-scrollbar { display: none; }
        .card-img-wrap { position: relative; height: auto; pointer-events: none; }
        .card-img { width:100%; height: auto; object-fit: initial; object-position:top center; display:block; user-select:none; }
        .card-grad-top { position:sticky; top:0; left:0; right:0; height:70px; margin-bottom:-70px; background:linear-gradient(to bottom,rgba(0,0,0,.55),transparent); pointer-events:none; z-index:3; }
        .card-grad-bot { position:sticky; bottom:0; left:0; right:0; height:160px; margin-top:-160px; background:linear-gradient(to top,rgba(0,0,0,1) 0%,rgba(0,0,0,.9) 30%,rgba(0,0,0,.55) 65%,transparent 100%); pointer-events:none; z-index:3; }
        .cat-badge { position:sticky; top:12px; float:left; margin:-60px 0 0 12px; background:rgba(234,179,8,.92); color:#000; padding:4px 13px; border-radius:50px; font-size:11px; font-weight:700; letter-spacing:.05em; backdrop-filter:blur(4px); z-index:10; clear:left; }
        .scroll-bar { position:sticky; bottom:70px; float:right; margin:0 10px -24px 0; width:3px; height:60px; background:rgba(255,255,255,.15); border-radius:2px; z-index:10; clear:right; overflow:visible; }
        .scroll-bar-fill { position:absolute; left:0; width:100%; height:20%; background:linear-gradient(to bottom,#eab308,#ca8a04); border-radius:2px; }
        .card-info { position:sticky; bottom:0; padding:14px 16px 18px; z-index:10; pointer-events:none; }
        .card-title { font-family:'Libre Baskerville',serif; font-size:15px; font-weight:700; color:#fff; line-height:1.3; text-shadow:0 1px 10px rgba(0,0,0,1),0 0 3px rgba(0,0,0,1); transition:color .3s ease; }
        .card-outer:hover { box-shadow:0 16px 48px rgba(234,179,8,.25); transform:translateY(-4px); }
        .card-outer::after {
          content:''; position:absolute; inset:0; border-radius:16px;
          border:2px solid transparent;
          background:linear-gradient(135deg,rgba(234,179,8,.6),transparent 50%,rgba(234,179,8,.3)) border-box;
          -webkit-mask:linear-gradient(#fff 0 0) padding-box,linear-gradient(#fff 0 0);
          mask:linear-gradient(#fff 0 0) padding-box,linear-gradient(#fff 0 0);
          -webkit-mask-composite:destination-out; mask-composite:exclude;
          opacity:0; transition:opacity .3s ease; pointer-events:none; z-index:20;
        }
        .card-outer:hover::after { opacity:1; }
        .card-outer:hover .card-title { color:#facc15; }
        .custom-cursor { position:absolute; transform:translate(-50%,-50%); pointer-events:none; transition:opacity 0.3s ease; z-index:100; }
        .cursor-circle { width:52px; height:52px; border-radius:50%; background:rgba(15,15,15,0.78); backdrop-filter:blur(6px); display:flex; align-items:center; justify-content:center; box-shadow:0 2px 20px rgba(0,0,0,.35),0 0 0 1px rgba(234,179,8,.18); transition:transform 0.15s ease; }
        .card-outer:hover .cursor-circle { transform:scale(1.08); }
        .card-anim { opacity:0; transform:translateY(24px) scale(.97); transition:opacity .5s ease,transform .5s ease; }
        .card-anim.visible { opacity:1; transform:translateY(0) scale(1); }

        /* Mobile card styles */
        .mob-card-anim { transition: opacity 0.58s ease, transform 0.58s cubic-bezier(0.22,1,0.36,1); border-radius: 18px; overflow: hidden; -webkit-tap-highlight-color: transparent; touch-action: pan-y; }
        .mob-img-outer { position:relative; height:320px; border-radius:18px; overflow:hidden; background:#111; border:2px solid rgba(212,175,55,.45); box-shadow:0 10px 40px rgba(0,0,0,.7), 0 0 0 1px rgba(212,175,55,.12); }
        .mob-scroll-container { position:absolute; inset:0; overflow-y:scroll; overflow-x:hidden; scrollbar-width:none; -webkit-overflow-scrolling:touch; touch-action:pan-y; cursor:pointer; z-index:2; }
        .mob-scroll-container::-webkit-scrollbar { display:none; }
        .mob-img-wrap { height: auto; pointer-events:none; }
        .mob-img { width:100%; height: auto; object-fit: initial; object-position:top center; display:block; user-select:none; }
        @keyframes shineSweep { 0% { left:-100%; opacity:0.55; } 60% { left:120%; opacity:0.25; } 100% { left:120%; opacity:0; } }
        .mob-shine { position:absolute; top:0; left:-100%; bottom:0; width:55%; background:linear-gradient(105deg, transparent 20%, rgba(255,255,255,.2) 50%, transparent 80%); pointer-events:none; z-index:15; opacity:0; }
        .mob-shine.mob-shine-run { animation:shineSweep 0.9s ease-out 0.25s forwards; }
        .mob-grad-top { position:absolute; top:0; left:0; right:0; height:64px; background:linear-gradient(to bottom,rgba(0,0,0,.6),transparent); pointer-events:none; z-index:5; }
        .mob-grad-bot { position:absolute; bottom:0; left:0; right:0; height:170px; background:linear-gradient(to top,rgba(0,0,0,.95) 0%,rgba(0,0,0,.7) 35%,rgba(0,0,0,.2) 70%,transparent 100%); pointer-events:none; z-index:5; }
        .mob-badge { position:absolute; top:14px; left:14px; background:rgba(234,179,8,.92); color:#000; font-family:'Libre Baskerville',serif; font-size:10px; font-weight:700; letter-spacing:.06em; padding:4px 12px; border-radius:50px; z-index:10; backdrop-filter:blur(4px); }
        @keyframes hintPulseAnim { 0%,100% { transform:translateX(-50%) scale(1); box-shadow:0 0 0 0 rgba(212,175,55,.5); } 50% { transform:translateX(-50%) scale(1.06); box-shadow:0 0 0 8px rgba(212,175,55,0); } }
        .mob-hint { position:absolute; bottom:58px; left:50%; transform:translateX(-50%); display:flex; align-items:center; gap:8px; background:rgba(0,0,0,.72); backdrop-filter:blur(10px); border:1px solid rgba(212,175,55,.3); border-radius:50px; padding:6px 14px; z-index:20; pointer-events:none; white-space:nowrap; transition:opacity .3s ease; }
        .mob-hint.mob-hint-pulse { animation:hintPulseAnim 0.55s ease; }
        .mob-hint-scroll, .mob-hint-dbl { display:flex; align-items:center; gap:5px; font-family:'Libre Baskerville',serif; font-size:10px; font-weight:700; letter-spacing:.04em; color:rgba(244,229,184,.9); }
        .mob-hint-divider { color:rgba(212,175,55,.5); font-size:12px; }
        .mob-scroll-track { position:absolute; right:8px; top:14px; bottom:14px; width:3px; background:rgba(255,255,255,.12); border-radius:2px; z-index:10; pointer-events:none; overflow:visible; }
        .mob-scroll-dot { position:absolute; left:0; width:100%; height:22%; background:linear-gradient(to bottom,#eab308,#ca8a04); border-radius:2px; }
        .mob-info { position:absolute; bottom:0; left:0; right:0; padding:14px 14px 18px; display:flex; align-items:flex-end; justify-content:space-between; z-index:10; pointer-events:none; }
        .mob-title { font-family:'Libre Baskerville',serif; font-size:14px; font-weight:700; color:#fff; line-height:1.3; text-shadow:0 1px 12px rgba(0,0,0,1); margin:0; max-width:78%; }
        .mob-arrow { font-size:20px; color:#facc15; text-shadow:0 0 14px rgba(212,175,55,.9); flex-shrink:0; line-height:1; }

        /* VIEW MORE BUTTON */
        .view-more-btn {
          display: inline-block; padding: .65rem 2.4rem;
          font-family: var(--font-head); font-size: .8rem; font-weight: 700;
          color: #6B3A1F !important; -webkit-text-fill-color: #6B3A1F !important;
          background: linear-gradient(145deg, #fdf5e0 0%, #f2df9a 45%, #e8c96e 100%);
          border: 1.5px solid rgba(212,175,55,.5); border-radius: 50px; cursor: pointer;
          letter-spacing: .06em; text-transform: uppercase;
          box-shadow: rgba(139,105,20,.42) 0 20px 30px -10px, rgba(0,0,0,.5) 0 8px 18px -5px, inset 0 1px 0 rgba(255,255,255,.55);
          transition: all .22s cubic-bezier(.23,1,.32,1); position: relative; white-space: nowrap; overflow: hidden;
        }
        .view-more-btn::after { content: ''; display: block; height: 100%; width: 100%; border-radius: 100px; position: absolute; top: 0; left: 0; z-index: -1; background: #f0d96a; transition: all .4s; }
        .view-more-btn:hover { transform: translateY(-4px); border-color: rgba(212,175,55,.75); box-shadow: rgba(212,175,55,.55) 0 22px 34px -8px, rgba(0,0,0,.52) 0 12px 22px -6px, inset 0 1px 0 rgba(255,255,255,.65); }
        .view-more-btn:hover::after { transform: scaleX(1.4) scaleY(1.6); opacity: 0; }
        .view-more-btn:active { transform: translateY(-1px); }

        /* ══════════════════════════════════════════
           RESPONSIVE
        ══════════════════════════════════════════ */
        @media (max-width: 1024px) {
          .hero-grid, .about-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          .hero-section { min-height: auto; padding: clamp(80px, 10vw, 100px) 6vw clamp(32px, 4vw, 48px); }
          .hero-right { order: -1; }
          .hero-img-frame { max-width: 100%; }
          .stat-1, .stat-2 { display: none; }
          .re-info-box { flex-direction: column; gap: 16px; }
        }

        @media (max-width: 768px) {
          .hero-section { padding: 80px 5vw 48px; }
          .about-section, .projects-section { padding: 64px 5vw 0; }
          .features-grid { grid-template-columns: 1fr 1fr; }
          .cards-grid-wrapper { grid-template-columns: 1fr !important; }
          .healthcare-single > * { max-width: 100%; }
          .proj-main-h1 { font-size: 2rem; }
          .cat-title-line { display: none; }
          .view-more-btn { font-size: .7rem; padding: .55rem 1.8rem; }
        }

        @media (max-width: 480px) {
          .features-grid { grid-template-columns: 1fr; }
          .about-section, .projects-section { padding: 48px 4vw 0; }
          .hero-section { padding: 64px 4vw 40px; }
          .view-more-btn { font-size: .65rem; padding: .5rem 1.4rem; }
        }

        @media (min-width: 640px) and (max-width: 1023px) {
          .cards-grid-wrapper { grid-template-columns: 1fr 1fr !important; }
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

      <div className="page-wrap">

        {/* ══════ STICKY RADIAL NAV MENU ══════ */}
        <RadialNavMenu />

        {/* ══════ SECTION 1 — HERO ══════ */}
        <section className="hero-section">
          <div className="hero-grid">
            <div ref={hero.ref} className={`hero-left fade-left ${hero.inView ? "visible" : ""}`}>
              <div className="hero-tag">Web Development</div>
              <h1 className="hero-h1">
                Creating Your<br />
                <span className="gold-text">Online Presence</span>
              </h1>
              <p className="hero-sub">Bespoke Websites for Unique Businesses</p>
              <p className="hero-desc">
                We specialize in crafting bespoke websites that cater to your unique business needs.
                Our web development services focus on building robust and user-friendly websites that
                enhance your online presence and drive business growth.
              </p>
              <button className="hero-cta">
                Explore Our Work
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            <div className={`hero-right fade-right ${hero.inView ? "visible" : ""}`} style={{ transitionDelay: "0.15s" }}>
              <div className="hero-img-frame" style={{ overflow: "hidden", background: "#0a0a0a" }}>
                <img
                  src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/web-hero.webp"
                  alt="Web Development"
                  style={{ width: "100%", height: "auto", display: "block" }}
                  onError={(e) => {
                    const t = e.currentTarget;
                    t.style.display = "none";
                    const parent = t.parentElement;
                    if (parent) {
                      parent.style.minHeight = "340px";
                      parent.style.background = "linear-gradient(135deg, #1a1400 0%, #0a0800 50%, #1a1100 100%)";
                      parent.innerHTML = `<div style="width:100%;height:340px;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:12px;"><div style="font-size:48px;">🌐</div><p style="font-family:'Libre Baskerville',serif;color:#d4af37;font-size:16px;">Web Development</p></div>`;
                    }
                  }}
                />
                <div className="hero-stat stat-1">
                  <span className="hero-stat-num">150+</span>
                  <span className="hero-stat-lbl">Websites Built</span>
                </div>
                <div className="hero-stat stat-2">
                  <span className="hero-stat-num">98%</span>
                  <span className="hero-stat-lbl">Client Satisfaction</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════ SECTION 2 — ABOUT / KEY COMPONENTS ══════ */}
        <section className="about-section" id="about-section">
          <div className="about-grid">
            <div ref={about.ref} className={`about-left fade-left ${about.inView ? "visible" : ""}`}>
              <div className="section-label">About Our Services</div>
              <h2 className="about-h2">
                Know About<br />
                <span className="gold-text">Website Development</span>
              </h2>
              <p className="about-p">
                In today's digital world, a strong online presence is essential for business success.
                At Govindani Infotech Pvt. Ltd., we specialize in developing cutting-edge websites
                that not only look great but also deliver outstanding performance and functionality.
                Whether you need a sophisticated e-commerce platform, a donation site for a non-profit
                organization, or a data-driven AI project website, our team of expert developers and
                designers has you covered.
              </p>
              <p className="about-p">
                We understand that each business is unique, and our approach to web development
                reflects this. We work closely with you to understand your specific needs, target
                audience, and business objectives, creating a customized solution that drives
                engagement and conversions. Our websites are built using the latest technologies
                and best practices to ensure they are fast, secure, and easy to navigate.
              </p>
              <div className="key-comp-title">Key Components of Our Website Development Services</div>
              <div className="key-comp-list">
                {keyComponents.map((item, i) => (
                  <div key={i} className="key-comp-item">{item}</div>
                ))}
              </div>
            </div>

            <div id="features-section" className={`about-right fade-right ${about.inView ? "visible" : ""}`} style={{ transitionDelay: "0.2s" }}>
              <div className="torn-page">
                <div className="torn-page-title">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <polygon points="10,2 12.5,7.5 18.5,8.5 14,13 15.5,19 10,16 4.5,19 6,13 1.5,8.5 7.5,7.5" fill="#d4af37" opacity="0.9"/>
                  </svg>
                  Features &amp; Capabilities
                </div>
                <div className="features-grid">
                  {features.map((f, i) => (
                    <div key={i} className="feature-item" style={{ transitionDelay: `${i * 0.05}s` }}>
                      <div className="feature-icon">{f.icon}</div>
                      <div className="feature-label">{f.label}</div>
                      <div className="feature-desc">{f.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════ SECTION 4 — PROJECTS ══════ */}
        <section className="projects-section" id="projects-section">
          <div ref={projects.ref} className={`projects-inner fade-up ${projects.inView ? "visible" : ""}`}>
            <div className="proj-main-header">
              <div className="proj-main-label">Our Portfolio</div>
              <h2 className="proj-main-h1">Have a Look at Our <span className="gold-text">Projects</span></h2>
              <p className="proj-main-h2">Our Websites</p>
              <div className="proj-main-divider" />
            </div>

            <div className="cat-block" id="ngo-section">
              <CatTitle>NGO Websites</CatTitle>
              <p className="cat-desc">
                We are proud to have built digital platforms for impactful non-profit organizations,
                helping them amplify their reach and connect with donors, volunteers, and communities worldwide.
              </p>
              <CardsGrid projects={ngoProjects} cols={3} />
              <ViewMoreBtn onClick={handleNgoPortfolio} />
            </div>

            <div className="cat-block">
              <CatTitle>Real Estate Websites</CatTitle>
              <CardsGrid projects={realEstateProjects} cols={2} />
              <div className="re-info-box" style={{ marginTop: 32 }}>
                <div className="re-info-icon">🏗️</div>
                <div className="re-info-content">
                  <div className="re-info-title">Built for the Property Market</div>
                  <p className="re-info-text">
                    Our real estate websites are crafted to showcase properties with stunning visual galleries,
                    interactive maps, and advanced search filters. We help builders and developers convert
                    online visitors into genuine leads — with mobile-first design, fast load times, and
                    integrated inquiry management systems.
                  </p>
                </div>
              </div>
            </div>

            <div className="cat-block" id="ecomm-section">
              <CatTitle>E-Commerce Websites</CatTitle>
              <p className="cat-desc">
                From boutique stores to large-scale marketplaces, we build e-commerce platforms that
                convert visitors into loyal customers with seamless shopping experiences.
              </p>
              <CardsGrid projects={ecommProjects} cols={3} />
              <ViewMoreBtn onClick={handleEcommercePortfolio} label="View More E-Commerce Projects" />
            </div>

            <div className="cat-block">
              <CatTitle>News &amp; Blogging Websites</CatTitle>
              <p className="cat-desc">
                High-performance news portals and blog platforms designed for speed, readability, and
                strong search visibility — so your content always reaches the right audience.
              </p>
              <CardsGrid projects={newsProjects} cols={3} />
              <ViewMoreBtn onClick={handleNewsBlogging} label="View More News & Blogging Projects" />
            </div>

            <div className="cat-block" id="healthcare-section">
              <CatTitle>Healthcare Websites</CatTitle>
              <p className="cat-desc">
                Trusted, accessible, and HIPAA-conscious web solutions for hospitals, clinics, and
                healthcare professionals — built to instil patient confidence and drive appointments.
              </p>
              <div className="healthcare-single">
                <AnimatedCard project={healthcareProjects[0]} index={0} isVisible={true} />
              </div>
              <ViewMoreBtn onClick={handleHealthcarePortfolio} label="View More Healthcare Projects" />
            </div>
          </div>
        </section>
        <ContactUsForm/>
        <ServiceSection/>
      </div>
    </>
  );
};

export default WebDevelopmentPage;