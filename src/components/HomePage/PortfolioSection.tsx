import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Detect touch device ───────────────────────────────────────────────────────
const isTouchDevice = () =>
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

// ─── Mobile Card single tap scrolls, double tap opens URL ──────────────────
function MobileCard({
  project,
  index,
}: {
  project: { title: string; category: string; url: string; image: string };
  index: number;
}) {
  const cardRef      = useRef<HTMLDivElement>(null);
  const scrollRef    = useRef<HTMLDivElement>(null);
  const lastTapRef   = useRef<number>(0);
  const tapTimerRef  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollAnimRef= useRef<number>(0);

  const [visible,      setVisible]      = useState(false);
  const [hintVisible,  setHintVisible]  = useState(true);
  const [hintPulse,    setHintPulse]    = useState(false);
  const [scrolled,     setScrolled]     = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    setVisible(true);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onInnerScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const maxScroll = scrollHeight - clientHeight;
      setScrollProgress(maxScroll > 0 ? scrollTop / maxScroll : 0);

      if (!scrolled) {
        setScrolled(true);
        setHintVisible(false);
      }
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
            if (el.scrollTop > 0.5) {
              scrollAnimRef.current = requestAnimationFrame(goUp);
            } else {
              el.scrollTop = 0;
            }
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
    const gap  = now - lastTapRef.current;
    lastTapRef.current = now;
    if (gap < 320 && gap > 0) {
      if (tapTimerRef.current) clearTimeout(tapTimerRef.current);
      cancelAnimationFrame(scrollAnimRef.current);
      window.open(project.url, "_blank", "noopener,noreferrer");
    } else {
      if (tapTimerRef.current) clearTimeout(tapTimerRef.current);
      tapTimerRef.current = setTimeout(() => {
        triggerScrollHint();
      }, 200);
    }
  }, [project.url, triggerScrollHint]);

  const fillTopPercent = scrollProgress * 80;

  return (
    <div
      ref={cardRef}
      className="mob-card-anim"
      style={{
        opacity:   1,
        transform: "none",
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
            <img src={project.image} srcSet={[`${project.image.replace(/\.webp$/, '-480w.webp')} 480w`, `${project.image} 800w`].join(', ')} sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw" alt={project.title} className="mob-img" loading="lazy" decoding="async" draggable={false} />
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
                <rect x="1" y="1" width="11" height="16" rx="5.5" stroke="currentColor" strokeWidth="1.4"/>
                <line x1="6.5" y1="4" x2="6.5" y2="8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
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
        <div className="mob-scroll-track">
          <div
            className="mob-scroll-dot"
            style={{ top: `${fillTopPercent}%`, transition: "top 0.1s linear" }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Desktop Animated Card ────────────────────────────────────────────────────
function DesktopCard({
  project,
  index,
  isVisible,
}: {
  project: { title: string; category: string; url: string; image: string };
  index: number;
  isVisible: boolean;
}) {
  const containerRef  = useRef<HTMLDivElement>(null);
  const scrollRef     = useRef<HTMLDivElement>(null);
  const mousePos      = useRef({ x: 0, y: 0 });
  const cursorPos     = useRef({ x: 0, y: 0 });
  const scrollAnimRef = useRef<number>(0);
  const cursorAnimRef = useRef<number>(0);

  const [cursor,         setCursor]         = useState({ x: 0, y: 0, opacity: 0 });
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
    if (cur > 0.5) {
      scrollRef.current.scrollTop = cur * 0.88;
      scrollAnimRef.current = requestAnimationFrame(animateScrollReset);
    } else {
      scrollRef.current.scrollTop = 0;
    }
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
    <div
      className={`card-anim visible`}
    >
      <div
        ref={containerRef}
        className="card-outer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onClick={() => window.open(project.url, "_blank", "noopener,noreferrer")}
      >
        <div ref={scrollRef} className="card-inner-scroll" onScroll={handleScroll}>
          <div className="card-img-wrap">
            <img src={project.image} srcSet={[`${project.image.replace(/\.webp$/, '-480w.webp')} 480w`, `${project.image} 800w`].join(', ')} sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw" alt={project.title} className="card-img" loading="lazy" decoding="async" draggable={false} />
          </div>
          <div className="card-grad-top" />
          <div className="card-grad-bot" />
          <div className="cat-badge">{project.category.toUpperCase()}</div>
          <div className="scroll-bar">
            <div
              className="scroll-bar-fill"
              style={{ top: `${fillTopPercent}%`, transition: "top 0.1s linear" }}
            />
          </div>
          <div className="card-info">
            <h3 className="card-title">{project.title}</h3>
          </div>
        </div>
        <div
          className="custom-cursor"
          style={{ left: cursor.x, top: cursor.y, opacity: cursor.opacity }}
        >
          <div className="cursor-circle">
            <svg width="18" height="26" viewBox="0 0 18 26" fill="none">
              <rect x="1" y="1" width="16" height="22" rx="8" stroke="white" strokeWidth="1.5"/>
              <line x1="9" y1="5" x2="9" y2="10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Smart Card ───────────────────────────────────────────────────────────────
function AnimatedCard({
  project, index, isVisible,
}: {
  project: { title: string; category: string; url: string; image: string };
  index: number;
  isVisible: boolean;
}) {
  const [touch, setTouch] = useState(false);
  useEffect(() => { setTouch(isTouchDevice()); }, []);

  return touch
    ? <MobileCard project={project} index={index} />
    : <DesktopCard project={project} index={index} isVisible={isVisible} />;
}

// ─── Category to View More URL mapping ─────────────────────────────────────────
const categoryViewMoreLinks: Record<string, string> = {
  "all":         "/portfolio/ngo",
  "ngo":         "/portfolio/ngo",
  "real-estate": "/portfolio/builders",
  "ecommerce":   "/portfolio/ecommerce",
  "healthcare":  "/portfolio/healthcare",
  "Businesses":  "/portfolio/business",
  "Hospitality": "/portfolio/hospitality",
};

// ─── Main Portfolio Section ───────────────────────────────────────────────────
const PortfolioSection = () => {
  const [isVisible, setIsVisible]                           = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory]             = useState("ngo");
  const [typingText, setTypingText]                         = useState("Projects");

  const sectionRef        = useRef<HTMLElement>(null);
  const dropdownRef       = useRef<HTMLDivElement>(null);
  const dropdownRefMobile = useRef<HTMLDivElement>(null);

  const categories = [
    { id: "all",         label: "All Projects" },
    { id: "ngo",         label: "NGO"          },
    { id: "real-estate", label: "Real Estate"  },
    { id: "ecommerce",   label: "E-Commerce"   },
    { id: "healthcare",  label: "Healthcare"   },
    { id: "Businesses",  label: "Business"     },
    { id: "Hospitality", label: "Hospitality"  },
  ];

  const projects = [
    { title: "Popatbhai Charitable Trust",      category: "ngo", url: "https://popatbhaicharitablefoundation.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Popatbhai-Charitable-Trust.webp" },
    { title: "Harsh Chhikkara Jan Seva Trust",  category: "ngo", url: "https://harshchhikara.com/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Harsh-Chhikkara-Jan-Seva-Trust.webp" },
    { title: "Mahipatsinh Foundation",          category: "ngo", url: "https://mahipatsinhfoundation.org/",         image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Mahipatsinh-Foundation.webp" },                
    { title: "Gau Seva Dham",                   category: "ngo", url: "https://gausevadham.org/",                    image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Gau-Seva-Dham.webp" },
    { title: "Mallakhamb Artist",               category: "ngo", url: "https://mallakhambartist.org/",               image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Mallakhamb-Artist.webp" },
    { title: "Nanhi Pari Foundation",                      category: "ngo", url: "https://nanhiparifoundation.org/",           image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Nanhi-Pari-Foundationngo.webp" },
    { title: "CI BUILDERS",                     category: "real-estate", url: "https://cibuilders.in/",              image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/RealEstate/Real-Estate-Ci-Builders.webp" },
    { title: "JANKI BUILDERS",                  category: "real-estate", url: "https://jankibuilders.com/",          image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/RealEstate/Real-Estate-Jank-Builders.webp" },
    { title: "TERRA BY TRISHLA",                category: "ecommerce",   url: "https://terrabytrishla.com/",         image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/E-Commerce/Wordpress/Wordpress-Terra-By-Trishla.webp" },
    { title: "Baba ji ki Buti",                 category: "ecommerce",   url: "https://babajikibuti.com/home",       image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/E-Commerce/Coding/Coding-Babajikibuti.webp" },
    { title: "Madhav Numerology",               category: "ecommerce",   url: "https://madhavnumerology.com/",       image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/E-Commerce/Wordpress/Wordpress-Madhav-Numerology.webp" },
    { title: "GSD Organics",                    category: "ecommerce",   url: "https://gsdorganics.com/",            image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/E-Commerce/Wordpress/Wordpress-Gsd-Organics.webp" },
    { title: "Mukta",                           category: "ecommerce",   url: "https://muktashop.com/",              image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/E-Commerce/Shopify/Shopify-Muktashop.webp" },
    { title: "Kryelet Studios",                 category: "ecommerce",   url: "https://kryeletstudios.com/",         image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/E-Commerce/Shopify/Shopify-kryelet-studios.webp" },
    { title: "MAHAVEER EYE HOSPITAL",           category: "healthcare",  url: "https://mahaveereyehospital.com/",    image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Healthcare/Healthcare-mahaveer-eye-hospital.webp" },
    // Business 3 cards (replace image paths with your actual images)
    { title: "Aadev International Trade Solutions",              category: "Businesses",  url: "https://aadevtrade.com/",                                    image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/BusinessWebsites/Business-Website-Aadev-International-Trade-Solutions.webp" },
    { title: "Dr-C-K-Reddy-Group",              category: "Businesses",  url: "https://drckreddygroup.com/",                                    image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/BusinessWebsites/Business-Website-Dr-C-K-Reddy-Group.webp" },
    { title: "Happili-Digital-Innovations",              category: "Businesses",  url: "https://happileedigitalinnovations.com/",                                    image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/BusinessWebsites/Business-Website-Happili-Digital-Innovations.webp" },
    // Hospitality 3 cards (replace image paths with your actual images)
    { title: "99-Tasty-Hub",           category: "Hospitality", url: "https://99tastyhub.com/",                                    image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Hospitality/Hospitality-99-Tasty-Hub.webp" },
    { title: "Cafe-Nouris",           category: "Hospitality", url: "https://cafenouris.com/",                                    image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Hospitality/Hospitality-Cafe-Nouris.webp" },
    { title: "Jungle-Brooke",           category: "Hospitality", url: "https://junglebrooke.com/",                                    image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Hospitality/Hospitality-Jungle-Brooke.webp" },
  ];

  const displayProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter(p => p.category === selectedCategory);

  const isHealthcareSingle =
    selectedCategory === "healthcare" && displayProjects.length === 1;

  // Center Real Estate (2 cards)
  const isRealEstatePair =
    selectedCategory === "real-estate" && displayProjects.length === 2;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const words = ["Projects", "NGO", "Real Estate", "E-Commerce", "Healthcare", "Business", "Hospitality"];
    let wi = 0, ci = 0, deleting = false;
    let t: ReturnType<typeof setTimeout>;
    const tick = () => {
      const w = words[wi];
      if (!deleting && ci <= w.length) {
        setTypingText(w.slice(0, ci++));
        t = setTimeout(tick, 100);
      } else if (!deleting) {
        t = setTimeout(() => { deleting = true; tick(); }, 2800);
      } else if (ci > 0) {
        setTypingText(w.slice(0, --ci));
        t = setTimeout(tick, 55);
      } else {
        deleting = false;
        wi = (wi + 1) % words.length;
        t = setTimeout(tick, 400);
      }
    };
    tick();
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      const target = e.target as Node;
      const outsideDesktop = dropdownRef.current && !dropdownRef.current.contains(target);
      const outsideMobile  = dropdownRefMobile.current && !dropdownRefMobile.current.contains(target);
      if (outsideDesktop && outsideMobile)
        setIsCategoryDropdownOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const handleCategorySelect = (id: string) => {
    setSelectedCategory(id);
    setIsCategoryDropdownOpen(false);
  };

  // ─── View More handler navigates based on selected category ────────────
  const handleViewMore = () => {
    const link = categoryViewMoreLinks[selectedCategory] || "/NgoPortfolio";
    window.location.href = link;
  };

  // Calculate dropdown height for proper spacing
  const dropdownItemCount = categories.length;
  const dropdownHeight = dropdownItemCount * 42 + 20; // approx height

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }

        @keyframes wave {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-6px); }
        }
        .animate-wave { animation: wave 2s ease-in-out infinite; }

        @keyframes blink { 0%,50%{opacity:1} 51%,100%{opacity:0} }
        .typing-cursor {
          display:inline-block; animation:blink 1s step-end infinite;
          margin-left:2px; color:#d4af37;
        }

        @keyframes clickHerePulse {
          0%, 100% {
            background: #F5F5DC;
            box-shadow: 0px 0px 60px rgba(245,245,220,0.6),
                        0px 0px 20px rgba(245,245,220,0.3);
            color: #6B3A1F;
            transform: scale(1);
          }
          50% {
            background: linear-gradient(270deg, rgba(212,175,55,0.68) 0%, rgba(244,229,184,0.87) 60%);
            box-shadow: 0px 0px 80px rgba(212,175,55,0.8),
                        0px 0px 30px rgba(212,175,55,0.5);
            color: #6B3A1F;
            transform: scale(1.03);
          }
        }
        @keyframes clickHerePulseMobile {
          0%, 100% {
            background: #F5F5DC;
            box-shadow: 0px 0px 30px rgba(245,245,220,0.5),
                        0px 0px 12px rgba(245,245,220,0.25);
            color: #6B3A1F;
            transform: scale(1);
          }
          50% {
            background: linear-gradient(270deg, rgba(212,175,55,0.68) 0%, rgba(244,229,184,0.87) 60%);
            box-shadow: 0px 0px 40px rgba(212,175,55,0.8),
                        0px 0px 16px rgba(212,175,55,0.5);
            color: #6B3A1F;
            transform: scale(1.02);
          }
        }

        .click-btn {
          border: none; outline: none; cursor: default;
          text-transform: uppercase; letter-spacing: .05em;
          font-family: 'Libre Baskerville', serif;
          font-weight: 700; pointer-events: none;
          border-radius: .4rem; white-space: nowrap;
          background: #F5F5DC;
          color: #6B3A1F;
          animation: clickHerePulse 3s ease-in-out infinite;
          font-size: .95rem; padding: .65rem 1.6rem;
          flex-shrink: 0;
          -webkit-box-reflect: below 10px linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,.4));
        }

        @media(max-width:767px){
          .click-btn {
            font-size: .58rem; padding: .42rem .8rem;
            animation: clickHerePulseMobile 3s ease-in-out infinite;
            -webkit-box-reflect: below 5px linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,.2));
          }
        }

        .projects-trigger {
          cursor:pointer; display:inline-flex; align-items:center;
          font-family:'Libre Baskerville',serif; font-weight:700;
          background:linear-gradient(90deg,#d4af37,#f4e5b8,#d4af37);
          -webkit-background-clip:text; background-clip:text;
          -webkit-text-fill-color:transparent;
          border:none; outline:none;
          font-size:3.75rem; line-height:1.2;
          padding-bottom:0.1em; overflow:visible;
        }
        @media(max-width:1023px){ .projects-trigger{ font-size:3rem; } }
        @media(max-width:767px) { .projects-trigger{ font-size:1.875rem; } }

        .ddpanel {
          position:absolute; top:calc(100% + 14px); left:50%;
          transform:translateX(-50%) scaleY(.92);
          width:240px;
          border-radius:12px; overflow:visible; z-index:9999;
          border:1px solid rgba(212,175,55,.35);
          box-shadow:0 16px 48px rgba(0,0,0,.9),0 6px 20px rgba(212,175,55,.25);
          backdrop-filter:blur(10px);
          background:linear-gradient(135deg,rgba(13,27,46,.98),rgba(10,22,40,.98));
          opacity:0; pointer-events:none;
          transition:opacity .25s ease,transform .25s ease;
          transform-origin:top center;
        }
        .ddpanel.open { opacity:1; transform:translateX(-50%) scaleY(1); pointer-events:auto; }
        .ddopt {
          width:100%; padding:13px 18px; text-align:left;
          background:transparent; border:none; cursor:pointer;
          font-family:'Libre Baskerville',serif; font-size:14px;
          font-weight:500; color:#cbd5e1;
          transition:all .2s ease;
          display:flex; align-items:center; justify-content:space-between;
        }
        .ddopt + .ddopt { border-top:1px solid rgba(212,175,55,.1); }
        .ddopt:hover { background:rgba(212,175,55,.07); color:#fff; }
        .ddopt.active {
          background:linear-gradient(90deg,#d4af37,#f4e5b8,#d4af37);
          -webkit-background-clip:text; background-clip:text;
          -webkit-text-fill-color:transparent; font-weight:700;
        }
        .ddopt.active::after {
          content:''; width:8px; height:8px; border-radius:50%;
          background:#d4af37; box-shadow:0 0 10px rgba(212,175,55,.9);
          flex-shrink:0; margin-left:8px; display:inline-block;
        }

        .card-outer {
          position: relative; height: 460px;
          border-radius: 16px; overflow: hidden;
          cursor: none; background: #0a0a0a;
          box-shadow: 0 8px 32px rgba(0,0,0,.5);
          transition: box-shadow .3s ease, transform .3s ease;
        }
        .card-inner-scroll {
          position: relative; height: 100%;
          overflow-y: auto; overflow-x: hidden; scrollbar-width: none;
        }
        .card-inner-scroll::-webkit-scrollbar { display: none; }
        .card-img-wrap { position: relative; height: auto; pointer-events: none; }
        .card-img { width:100%; height: auto; object-fit: initial; object-position:top center; display:block; user-select:none; }
        .card-grad-top {
          position:sticky; top:0; left:0; right:0; height:70px; margin-bottom:-70px;
          background:linear-gradient(to bottom,rgba(0,0,0,.55),transparent);
          pointer-events:none; z-index:3;
        }
        .card-grad-bot {
          position:sticky; bottom:0; left:0; right:0; height:160px; margin-top:-160px;
          background:linear-gradient(to top,rgba(0,0,0,1) 0%,rgba(0,0,0,.9) 30%,rgba(0,0,0,.55) 65%,transparent 100%);
          pointer-events:none; z-index:3;
        }
        .cat-badge {
          position:sticky; top:12px; float:left; margin:-60px 0 0 12px;
          background:rgba(234,179,8,.92); color:#000;
          padding:4px 13px; border-radius:50px;
          font-size:11px; font-weight:700; letter-spacing:.05em;
          backdrop-filter:blur(4px); z-index:10; clear:left;
        }
        .scroll-bar {
          position:sticky; bottom:70px; float:right; margin:0 10px -24px 0;
          width:3px; height:60px; background:rgba(255,255,255,.15);
          border-radius:2px; z-index:10; clear:right;
          overflow: visible;
        }
        .scroll-bar-fill {
          position: absolute; left: 0; width: 100%; height: 20%;
          background: linear-gradient(to bottom,#eab308,#ca8a04);
          border-radius: 2px;
        }
        .card-info {
          position:sticky; bottom:0; padding:14px 16px 18px; z-index:10; pointer-events:none;
        }
        .card-title {
          font-family:'Libre Baskerville',serif;
          font-size:15px; font-weight:700; color:#fff; line-height:1.3;
          text-shadow:0 1px 10px rgba(0,0,0,1),0 0 3px rgba(0,0,0,1);
          transition:color .3s ease;
        }
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
        .custom-cursor {
          position:absolute; transform:translate(-50%,-50%);
          pointer-events:none; transition:opacity 0.3s ease; z-index:100;
        }
        .cursor-circle {
          width:52px; height:52px; border-radius:50%;
          background:rgba(15,15,15,0.78); backdrop-filter:blur(6px);
          display:flex; align-items:center; justify-content:center;
          box-shadow:0 2px 20px rgba(0,0,0,.35),0 0 0 1px rgba(234,179,8,.18);
          transition:transform 0.15s ease;
        }
        .card-outer:hover .cursor-circle { transform:scale(1.08); }

        .card-anim { opacity:1; transform:none; }
        .card-anim.visible { opacity:1; transform:none; }

        .mob-card-anim {
          border-radius: 18px;
          overflow: hidden;
          -webkit-tap-highlight-color: transparent;
          touch-action: pan-y;
        }
        .mob-img-outer {
          position: relative;
          height: 320px;
          border-radius: 18px;
          overflow: hidden;
          background: #111;
          border: 2px solid rgba(212,175,55,.45);
          box-shadow: 0 10px 40px rgba(0,0,0,.7), 0 0 0 1px rgba(212,175,55,.12);
        }
        .mob-scroll-container {
          position: absolute;
          inset: 0;
          overflow-y: scroll;
          overflow-x: hidden;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
          touch-action: pan-y;
          cursor: pointer;
          z-index: 2;
        }
        .mob-scroll-container::-webkit-scrollbar { display: none; }
        .mob-img-wrap { height: auto; pointer-events: none; }
        .mob-img { width:100%; height: auto; object-fit: initial; object-position:top center; display:block; user-select:none; }

        @keyframes shineSweep {
          0%   { left: -100%; opacity: 0.55; }
          60%  { left: 120%;  opacity: 0.25; }
          100% { left: 120%;  opacity: 0; }
        }
        .mob-shine {
          position: absolute; top: 0; left: -100%; bottom: 0; width: 55%;
          background: linear-gradient(105deg, transparent 20%, rgba(255,255,255,.2) 50%, transparent 80%);
          pointer-events: none; z-index: 15; opacity: 0;
        }
        .mob-shine.mob-shine-run { animation: shineSweep 0.9s ease-out 0.25s forwards; }
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
          background: rgba(234,179,8,.92); color: #000;
          font-family: 'Libre Baskerville', serif;
          font-size: 10px; font-weight: 700; letter-spacing: .06em;
          padding: 4px 12px; border-radius: 50px;
          z-index: 10; backdrop-filter: blur(4px);
        }
        @keyframes hintPulseAnim {
          0%,100% { transform: translateX(-50%) scale(1);    box-shadow: 0 0 0 0 rgba(212,175,55,.5); }
          50%     { transform: translateX(-50%) scale(1.06); box-shadow: 0 0 0 8px rgba(212,175,55,0); }
        }
        .mob-hint {
          position: absolute; bottom: 58px; left: 50%;
          transform: translateX(-50%);
          display: flex; align-items: center; gap: 8px;
          background: rgba(0,0,0,.72); backdrop-filter: blur(10px);
          border: 1px solid rgba(212,175,55,.3);
          border-radius: 50px; padding: 6px 14px;
          z-index: 20; pointer-events: none;
          white-space: nowrap; transition: opacity .3s ease;
        }
        .mob-hint.mob-hint-pulse { animation: hintPulseAnim 0.55s ease; }
        .mob-hint-scroll, .mob-hint-dbl {
          display: flex; align-items: center; gap: 5px;
          font-family: 'Libre Baskerville', serif;
          font-size: 10px; font-weight: 700; letter-spacing: .04em;
          color: rgba(244,229,184,.9);
        }
        .mob-hint-divider { color: rgba(212,175,55,.5); font-size: 12px; }
        .mob-scroll-track {
          position: absolute; right: 8px; top: 14px; bottom: 14px;
          width: 3px; background: rgba(255,255,255,.12);
          border-radius: 2px; z-index: 10; pointer-events: none;
          overflow: visible;
        }
        .mob-scroll-dot {
          position: absolute; left: 0; width: 100%; height: 22%;
          background: linear-gradient(to bottom, #eab308, #ca8a04);
          border-radius: 2px;
        }
        .mob-info {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 14px 14px 18px;
          display: flex; align-items: flex-end; justify-content: space-between;
          z-index: 10; pointer-events: none;
        }
        .mob-title {
          font-family: 'Libre Baskerville', serif;
          font-size: 14px; font-weight: 700; color: #fff; line-height: 1.3;
          text-shadow: 0 1px 12px rgba(0,0,0,1); margin: 0; max-width: 78%;
        }
        .mob-arrow {
          font-size: 20px; color: #facc15;
          text-shadow: 0 0 14px rgba(212,175,55,.9);
          flex-shrink: 0; line-height: 1;
        }

        .sec-fade { opacity:0; transform:translateY(20px); transition:opacity .6s ease,transform .6s ease; }
        .sec-fade.visible { opacity:1; transform:translateY(0); }

        .portfolio-grid {
          display:grid;
          grid-template-columns:1fr;
          gap:24px;
          padding:0 16px;
          max-width:72rem;
          margin-left:auto;
          margin-right:auto;
          transition: margin-top 0.35s cubic-bezier(0.4,0,0.2,1);
        }
        @media(min-width:640px){
          .portfolio-grid{ grid-template-columns:1fr 1fr; }
        }
        @media(min-width:1024px){
          .portfolio-grid{ grid-template-columns:1fr 1fr 1fr; gap:28px; padding:0; }
        }

        .portfolio-grid.single-center {
          grid-template-columns: 1fr;
          max-width: 400px;
        }
        @media(min-width:640px){
          .portfolio-grid.single-center{ grid-template-columns:1fr; max-width:420px; }
        }
        @media(min-width:1024px){
          .portfolio-grid.single-center{ max-width:440px; }
        }

        .portfolio-grid.two-center {
          max-width: 56rem;
          justify-items: center;
        }
        @media(min-width:640px){
          .portfolio-grid.two-center{ grid-template-columns:1fr 1fr; }
        }
        @media(min-width:1024px){
          .portfolio-grid.two-center{ grid-template-columns:1fr 1fr; max-width:56rem; }
        }

        .portfolio-section {
          position:relative; padding:40px 24px 16px;
          background: #000;
          overflow:visible; margin-top:-48px;
          font-family:'Libre Baskerville',serif; min-height:100vh;
        }
        @media(min-width:768px){ .portfolio-section{ padding-top:80px; margin-top:-96px; } }

        .header-wrap { max-width:80rem; margin:0 auto; text-align:center; }
        .wave-text {
          display:inline-block;
          background:linear-gradient(90deg,#facc15,#fef9c3,#facc15);
          -webkit-background-clip:text; background-clip:text;
          -webkit-text-fill-color:transparent; font-weight:700;
        }
        .desktop-header { display:none; }
        .mobile-header  { display:block; }
        @media(min-width:768px){ .desktop-header{display:block;} .mobile-header{display:none;} }

        .heading-line1 {
          display:flex; flex-wrap:wrap; align-items:center;
          justify-content:center; gap:16px;
          font-size:3.75rem; font-weight:700; margin-bottom:16px;
        }
        @media(max-width:1023px){ .heading-line1{ font-size:3rem; } }

        .heading-line2 {
          display:flex; align-items:center; justify-content:center; gap:24px;
          position: relative;
          overflow: visible;
          padding-bottom: 0.25em;
        }

        .divider {
          display:none; width:96px; height:4px;
          background:linear-gradient(to right,#facc15,#ca8a04);
          margin:16px auto 0; border-radius:9999px;
        }
        @media(min-width:768px){ .divider{ display:block; } }

        /* ── VIEW MORE BUTTON ── */
        .view-more-btn {
          display: block;
          margin: 56px auto 0;
          padding: .65rem 2.2rem;
          font-family: 'Libre Baskerville', serif;
          font-size: .75rem;
          font-weight: 600;
          color: #7a5c0e;
          -webkit-text-fill-color: #7a5c0e !important;
          background: linear-gradient(145deg, #fdf5e0 0%, #f2df9a 45%, #e8c96e 100%);
          border: 1.5px solid rgba(212,175,55,.5);
          border-radius: 50px;
          cursor: pointer;
          letter-spacing: .6px;
          text-transform: uppercase;
          box-shadow: rgba(139,105,20,.42) 0 20px 30px -10px, rgba(0,0,0,.5) 0 8px 18px -5px, inset 0 1px 0 rgba(255,255,255,.55);
          transition: all .22s cubic-bezier(.23,1,.32,1);
          position: relative;
          white-space: nowrap;
          overflow: hidden;
        }
        .view-more-btn::after {
          content: '';
          display: block;
          height: 100%;
          width: 100%;
          border-radius: 100px;
          position: absolute;
          top: 0;
          left: 0;
          z-index: -1;
          background: #f0d96a;
          transition: all .4s;
        }
        .view-more-btn:hover {
          transform: translateY(-4px);
          background: linear-gradient(145deg, #fffde8 0%, #f7e8a0 45%, #f0d35a 100%) !important;
          color: #7a5c0e !important;
          -webkit-text-fill-color: #7a5c0e !important;
          border-color: rgba(212,175,55,.75);
          box-shadow: rgba(212,175,55,.55) 0 22px 34px -8px, rgba(0,0,0,.52) 0 12px 22px -6px, inset 0 1px 0 rgba(255,255,255,.65);
        }
        .view-more-btn:hover::after {
          transform: scaleX(1.4) scaleY(1.6);
          opacity: 0;
        }
        .view-more-btn:active {
          transform: translateY(-1px);
        }

        @media(min-width:768px){ 
          .view-more-btn{ 
            margin-top: 80px;
            padding: .75rem 2.5rem;
            font-size: .85rem;
          } 
        }
        @media(max-width:480px){
          .view-more-btn {
            font-size: .56rem;
            padding: .36rem .7rem;
          }
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

      <section id="portfolio" ref={sectionRef} className="portfolio-section">

        {/* ════ HEADER ════ */}
        <div className={`header-wrap sec-fade ${isVisible ? "visible" : ""}`}>

          {/* DESKTOP */}
          <div className="desktop-header" style={{ marginBottom: 32 }}>
            <div className="heading-line1">
              {"Have a Look At Our Featured".split(" ").map((word, wi) => (
                <span key={wi} style={{ display: "inline-block" }}>
                  {word.split("").map((char, ci) => (
                    <span
                      key={ci}
                      className="wave-text animate-wave"
                      style={{ animationDelay: `${(wi * 10 + ci) * 0.1}s`, display: "inline-block" }}
                    >{char}</span>
                  ))}
                </span>
              ))}
            </div>

            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-340px)",
                  top: 0,
                  bottom: 0,
                  display: "flex",
                  alignItems: "center",
                  pointerEvents: "none",
                  zIndex: 10,
                }}
              >
                <button className="click-btn" disabled>CLICK HERE →</button>
              </div>

              <div className="heading-line2" ref={dropdownRef} style={{ justifyContent: "center" }}>
                <div style={{ position: "relative", marginLeft: "220px" }}>
                  <button
                    className="projects-trigger"
                    onClick={() => setIsCategoryDropdownOpen(o => !o)}
                    onMouseEnter={() => setIsCategoryDropdownOpen(true)}
                  >
                    {typingText}<span className="typing-cursor">|</span>
                  </button>
                  <div className={`ddpanel ${isCategoryDropdownOpen ? "open" : ""}`}>
                    {categories.map(cat => (
                      <button
                        key={cat.id}
                        className={`ddopt ${selectedCategory === cat.id ? "active" : ""}`}
                        onClick={() => handleCategorySelect(cat.id)}
                      >{cat.label}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MOBILE */}
          <div className="mobile-header" style={{ marginBottom: 24 }}>
            <h2 style={{
              fontSize: "1.875rem", fontWeight: 700, lineHeight: 1.3,
              background: "linear-gradient(90deg,#facc15,#fef9c3,#facc15)",
              WebkitBackgroundClip: "text", backgroundClip: "text",
              WebkitTextFillColor: "transparent", padding: "0 8px", marginBottom: 16,
            }}>
              Have a Look At Our Featured
            </h2>
            <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", minHeight: 56, overflow: "visible", paddingBottom: "0.25em" }} ref={dropdownRefMobile}>

              <div style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                <button className="click-btn" disabled>CLICK HERE →</button>
              </div>

              <div style={{ position: "relative", marginLeft: "110px" }}>
                <button
                  className="projects-trigger"
                  onClick={() => setIsCategoryDropdownOpen(o => !o)}
                >
                  {typingText}<span className="typing-cursor">|</span>
                </button>
                <div className={`ddpanel ${isCategoryDropdownOpen ? "open" : ""}`} style={{ width: 160 }}>
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      className={`ddopt ${selectedCategory === cat.id ? "active" : ""}`}
                      style={{ fontSize: "11px", padding: "8px 11px" }}
                      onClick={() => handleCategorySelect(cat.id)}
                    >{cat.label}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="divider" />
        </div>

        {/* ════ CARDS ════ */}
        <div
          className={`portfolio-grid ${isHealthcareSingle ? "single-center" : ""} ${isRealEstatePair ? "two-center" : ""}`}
          style={{ 
            marginTop: isCategoryDropdownOpen ? (dropdownHeight + 60) : 40,
            minHeight: "460px" // Ensure space for items so footer doesn't jump too much
          }}
        >
          <AnimatePresence mode="popLayout">
            {displayProjects.length === 0 ? (
              <motion.div 
                key="no-projects"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ gridColumn: "1/-1", textAlign: "center", color: "#9ca3af", padding: "64px 0" }}
              >
                No projects in this category yet.
              </motion.div>
            ) : (
              displayProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ 
                    duration: 0.4, 
                    ease: "easeOut",
                    delay: index * 0.05 
                  }}
                >
                  <AnimatedCard
                    project={project}
                    index={index}
                    isVisible={isVisible}
                  />
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* ════ VIEW MORE BUTTON ════ */}
        <div style={{ display: "flex", justifyContent: "center", paddingBottom: 16 }}>
          <button className="view-more-btn" onClick={handleViewMore}>
            View More Projects
          </button>
        </div>
      </section>
    </>
  );
};

export default PortfolioSection;
