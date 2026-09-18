import React, { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ─── Detect touch device ───────────────────────────────────────────────────────
const isTouchDevice = () =>
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

// ─────────────────────────────────────────────────────────────────────────────
//  NGO PORTFOLIO MINI SECTION  (embedded at top of this component)
// ─────────────────────────────────────────────────────────────────────────────

const ngoProjects = [
  { title: "Popatbhai Charitable Trust",     url: "https://popatbhaicharitablefoundation.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Popatbhai-Charitable-Trust.webp" },
  { title: "Harsh Chhikkara Jan Seva Trust", url: "https://harshchhikara.com/",                 image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Harsh-Chhikkara-Jan-Seva-Trust.webp" },
  { title: "Mahipatsinh Foundation",         url: "https://mahipatsinhfoundation.org/",          image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Mahipatsinh-Foundation.webp" },
  { title: "Gau Seva Dham",                  url: "https://gausevadham.org/",                    image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Gau-Seva-Dham.webp" },
  { title: "Mallakhamb Artist",              url: "https://mallakhambartist.org/",               image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Mallakhamb-Artist.webp" },
  { title: "Nanhi Pari Foundation",                     url: "https://nanhiparifoundation.org/",             image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Nanhi-Pari-Foundationngo.webp" },
  { title: "Palawi Foundation",              url: "https://palawi.org/",                          image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Palawingo.webp" },
  { title: "Animals Matter to Me",           url: "https://amtmindia.org/",                       image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Animals-Matterto-Me.webp" },
  { title: "Anekaa Care Foundation",         url: "https://anekaacarefoundation.org/",            image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Anekaa-Care-Foundation.webp" },
  { title: "Little Heart Foundation",        url: "https://littleheartfoundation.org/",           image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Little-Heart-Foundation.png" },
  { title: "Voice Of Slum",                  url: "https://voiceofslum.org/",                     image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Voice-Of-Slum.webp" },
  { title: "Vishramgahr Foundation",         url: "https://vishramgharfoundation.in/",            image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Vishramgahr-Foundation.webp" },
];

// Desktop NGO card (scroll-on-hover)
function NgoDesktopCard({ project, index, isVisible }: { project: typeof ngoProjects[0]; index: number; isVisible: boolean }) {
  const containerRef  = useRef<HTMLDivElement>(null);
  const scrollRef     = useRef<HTMLDivElement>(null);
  const mousePos      = useRef({ x: 0, y: 0 });
  const cursorPos     = useRef({ x: 0, y: 0 });
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
    if (cur > 0.5) { scrollRef.current.scrollTop = cur * 0.88; scrollAnimRef.current = requestAnimationFrame(animateScrollReset); }
    else scrollRef.current.scrollTop = 0;
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

  return (
    <div
      className="pc-ngo-card-anim"
      style={{ transitionDelay: `${(index % 6) * 0.07}s`, opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.97)" }}
    >
      <div
        ref={containerRef}
        className="pc-ngo-card-outer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onClick={() => window.open(project.url, "_blank", "noopener,noreferrer")}
      >
        <div ref={scrollRef} className="pc-ngo-card-scroll">
          <div className="pc-ngo-img-wrap">
            <img src={project.image} srcSet={[`${project.image.replace(/\.webp$/, '-480w.webp')} 480w`, `${project.image} 800w`].join(', ')} sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw" alt={project.title} className="pc-ngo-img" loading="lazy" decoding="async" draggable={false} />
          </div>
          <div className="pc-ngo-grad-top" />
          <div className="pc-ngo-grad-bot" />
          <div className="pc-ngo-badge">NGO</div>
          <div className="pc-ngo-card-info">
            <h3 className="pc-ngo-card-title">{project.title}</h3>
            <span className="pc-ngo-card-arrow">↗</span>
          </div>
        </div>
        <div className="pc-ngo-cursor" style={{ left: cursor.x, top: cursor.y, opacity: cursor.opacity }}>
          <div className="pc-ngo-cursor-circle">
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

// Mobile NGO card
function NgoMobileCard({ project, index }: { project: typeof ngoProjects[0]; index: number }) {
  const cardRef       = useRef<HTMLDivElement>(null);
  const scrollRef     = useRef<HTMLDivElement>(null);
  const lastTapRef    = useRef(0);
  const tapTimerRef   = useRef<NodeJS.Timeout | null>(null);
  const scrollAnimRef = useRef(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => () => {
    cancelAnimationFrame(scrollAnimRef.current);
    if (tapTimerRef.current) clearTimeout(tapTimerRef.current);
  }, []);

  const triggerScrollHint = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    let progress = 0;
    const target = 130;
    const goDown = () => {
      progress += (target - progress) * 0.14;
      el.scrollTop = progress;
      if (target - progress > 0.8) scrollAnimRef.current = requestAnimationFrame(goDown);
      else {
        el.scrollTop = target;
        setTimeout(() => {
          const goUp = () => { el.scrollTop = el.scrollTop * 0.84; if (el.scrollTop > 0.5) scrollAnimRef.current = requestAnimationFrame(goUp); else el.scrollTop = 0; };
          scrollAnimRef.current = requestAnimationFrame(goUp);
        }, 520);
      }
    };
    cancelAnimationFrame(scrollAnimRef.current);
    scrollAnimRef.current = requestAnimationFrame(goDown);
  }, []);

  const handleTap = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    if (e.type === "touchend") e.preventDefault();
    const now = Date.now();
    const gap = now - lastTapRef.current;
    lastTapRef.current = now;
    if (gap < 320 && gap > 0) {
      if (tapTimerRef.current) clearTimeout(tapTimerRef.current);
      window.open(project.url, "_blank", "noopener,noreferrer");
    } else {
      if (tapTimerRef.current) clearTimeout(tapTimerRef.current);
      tapTimerRef.current = setTimeout(() => triggerScrollHint(), 200);
    }
  }, [project.url, triggerScrollHint]);

  return (
    <div ref={cardRef} className="pc-ngo-mob-anim" style={{ transitionDelay: `${(index % 6) * 0.07}s`, opacity: visible ? 1 : 0, transform: visible ? "translateY(0) scale(1)" : "translateY(48px) scale(0.95)" }}>
      <div className="pc-ngo-mob-outer">
        <div ref={scrollRef} className="pc-ngo-mob-scroll" onTouchEnd={handleTap} onClick={handleTap}>
          <div style={{ height: "300%" }}>
            <img src={project.image} srcSet={[`${project.image.replace(/\.webp$/, '-480w.webp')} 480w`, `${project.image} 800w`].join(', ')} sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw" alt={project.title} className="pc-ngo-img" loading="lazy" decoding="async" draggable={false} />
          </div>
        </div>
        <div className="pc-ngo-grad-top" />
        <div className="pc-ngo-grad-bot" />
        <div className="pc-ngo-badge">NGO</div>
        <div className="pc-ngo-card-info">
          <h3 className="pc-ngo-card-title">{project.title}</h3>
          <span className="pc-ngo-card-arrow">↗</span>
        </div>
      </div>
    </div>
  );
}

function NgoSmartCard({ project, index, isVisible }: { project: typeof ngoProjects[0]; index: number; isVisible: boolean }) {
  const [touch, setTouch] = useState(false);
  useEffect(() => { setTouch(isTouchDevice()); }, []);
  return touch
    ? <NgoMobileCard project={project} index={index} />
    : <NgoDesktopCard project={project} index={index} isVisible={isVisible} />;
}

// ─────────────────────────────────────────────────────────────────────────────
//  NGO PORTFOLIO SECTION
// ─────────────────────────────────────────────────────────────────────────────
function NgoPortfolioSection({ ngoPagePath = "/ngo" }: { ngoPagePath?: string }) {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [cardsVisible,  setCardsVisible]  = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeaderVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setCardsVisible(true); }, { threshold: 0.05 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="pc-ngo-section">
      {/* Header */}
      <div ref={headerRef} className={`pc-ngo-header ${headerVisible ? "pc-ngo-header--visible" : ""}`}>
        <div className="pc-ngo-eyebrow-row">
          <div className="pc-ngo-eyebrow-line" />
          <span className="pc-ngo-eyebrow-text">Our NGO Portfolio</span>
          <div className="pc-ngo-eyebrow-line pc-ngo-eyebrow-line--r" />
        </div>
        <h2 className="pc-ngo-title">
          Our <span className="pc-ngo-title-gold">NGO</span> Projects
        </h2>
        <div className="pc-ngo-divider" />
        <p className="pc-ngo-sub">
          Crafting impactful digital experiences for non-profit organisations websites that inspire
          action, build trust, and amplify every cause they stand for.
        </p>
      </div>

      {/* Cards grid */}
      <div ref={gridRef} className="pc-ngo-grid">
        {ngoProjects.map((project, index) => (
          <NgoSmartCard key={project.title} project={project} index={index} isVisible={cardsVisible} />
        ))}
      </div>

      {/* View More button redirects to NGO page */}
      <div className="pc-ngo-viewmore-wrap">
        <a href={ngoPagePath} className="pc-ngo-viewmore-btn">
          View More Projects
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  PREMIUM CAROUSEL  (original untouched)
// ─────────────────────────────────────────────────────────────────────────────
const PremiumCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [headingVisible, setHeadingVisible] = useState(false);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const carouselData = [
    {
      image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/recurringdonation.webp",
      title: "Recurring Donations",
      description: "Create flexible recurring donation forms with donor-selected or admin-defined frequencies, time periods, and amounts."
    },
    {
      image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Fee Recovery.webp",
      title: "Fee Recovery",
      description: "Customizable fee recovery at global, gateway, and form levels with donor opt-in options."
    },
    {
      image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/formmanager.webp",
      title: "Form Field Manager",
      description: "Easily add and manage custom fields to meet specific donation form requirements."
    },
    {
      image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Funds and Designations.webp",
      title: "Funds and Designations",
      description: "Create unlimited funds, use multiple forms, and view reports by form and fund."
    },
    {
      image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/tribute12.webp",
      title: "Tributes",
      description: "Built to scale from startup to enterprise without compromising on speed or reliability."
    },
    { 
      image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PDF Receipt.webp", 
      title: "PDF Receipts",
      description: "Generate and send customizable PDF receipts to donors after each donation." 
    },
    {
      image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/peertopeer.webp",
      title: "Peer-to-Peer",
      description: "Empower your community with team or individual fundraising on your donation forms."
    },
    {
      image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/webhooks.webp",
      title: "WebHooks",
      description: "Connect donation forms with any CRM system for automatic donor data synchronization."
    },
    {
      image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Blink Gateway.webp",
      title: "Blink Gateway",
      description: "UK nonprofits accept donations via cards and secure Open Banking with lower fees."
    },
    {
      image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/activecampn.webp",
      title: "Active Campaign",
      description: "Segment donors using powerful lists and automate personalized communication workflows."
    },
    {
      image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Constant Contact.webp",
      title: "Constant Contact",
      description: "Sync donors to targeted mailing lists and grow your organization's reach with opt-ins."
    },
    {
      image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/annualmain.png",
      title: "Annual Receipts",
      description: "Donors download annual donation records for tax purposes through self-service portal."
    },
  ];

  // CSS animation trigger
  useEffect(() => {
    setTimeout(() => setHeadingVisible(true), 100);
  }, []);

  // Handle user interaction
  const handleUserInteractionStart = () => {
    setIsUserInteracting(true);
    setIsAutoPlaying(false);
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }
  };

  const handleUserInteractionEnd = () => {
    interactionTimeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false);
      setIsAutoPlaying(true);
    }, 3000);
  };

  // Auto-play logic
  useEffect(() => {
    if (!isAutoPlaying || isUserInteracting) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % carouselData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isUserInteracting, carouselData.length]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
      }
    };
  }, []);

  const handlePrev = () => {
    handleUserInteractionStart();
    setActiveIndex((prev) => (prev - 1 + carouselData.length) % carouselData.length);
    handleUserInteractionEnd();
  };

  const handleNext = () => {
    handleUserInteractionStart();
    setActiveIndex((prev) => (prev + 1) % carouselData.length);
    handleUserInteractionEnd();
  };

  const handleDotClick = (index: number) => {
    handleUserInteractionStart();
    setActiveIndex(index);
    handleUserInteractionEnd();
  };

  const handleTouchStart = () => { handleUserInteractionStart(); };
  const handleTouchEnd   = () => { handleUserInteractionEnd(); };
  const handleMouseEnter = () => { handleUserInteractionStart(); };
  const handleMouseLeave = () => { handleUserInteractionEnd(); };

  return (
    <section 
      id="premium-carousel"
      className="relative w-full pt-0 pb-8 md:py-16 px-3 sm:px-4 lg:px-6 overflow-hidden bg-black"
    >
      {/* Simple black background with subtle golden glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-[520px] h-[520px] rounded-full blur-[140px]"
          style={{ background: "rgba(217,119,6,0.04)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[620px] h-[620px] rounded-full blur-[160px]"
          style={{ background: "rgba(251,191,36,0.03)" }}
        />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header with Golden & White Combination */}
        <div className={`text-center mb-8 md:mb-12 overflow-hidden transition-all duration-1000 ${headingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-3xl leading-tight relative">
            <span className="inline-block mr-1 sm:mr-2">
              <span className="golden-text">Discover</span>
            </span>
            <span className="inline-block mr-1 sm:mr-2">
              <span className="golden-text">Our</span>
            </span>
            <span className="inline-block mr-1 sm:mr-2">
              <span className="golden-text">Features</span>
            </span>
          </h1>
          
          <div 
            className={`h-1 w-24 sm:w-32 md:w-48 mx-auto rounded-full mt-4 sm:mt-6 transition-all duration-1000 delay-500 ${headingVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}`}
            style={{
              background: 'linear-gradient(90deg, #fbbf24, #f59e0b, #fbbf24)',
              backgroundSize: '200% 100%',
              boxShadow: '0 0 15px rgba(251, 191, 36, 0.2)'
            }}
          />
        </div>

        {/* Carousel Container with golden border */}
        <div 
          className="relative rounded-2xl lg:rounded-[2.5rem] overflow-hidden p-3 md:p-6 lg:p-8 border border-amber-400/30"
          style={{
            background: 'linear-gradient(135deg, #000 0%, #000 50%, #000 100%)',
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Inner ring */}
          <div className="absolute inset-0 rounded-2xl lg:rounded-[2.5rem] ring-1 ring-amber-400/20 pointer-events-none"></div>
          
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 rounded-2xl lg:rounded-[2.5rem] bg-gradient-to-br from-amber-500/5 via-transparent to-amber-500/5 pointer-events-none"></div>
          
          {/* Carousel Content */}
          <div className="relative h-[480px] sm:h-[520px] md:h-[560px] lg:h-[500px] flex items-center justify-center">
            {carouselData.map((item, index) => (
              <div key={index}
                className={`absolute inset-0 transition-all duration-1000 cubic-bezier ${
                  index === activeIndex
                    ? "opacity-100 translate-x-0 scale-100 z-10"
                    : index < activeIndex
                    ? "opacity-0 -translate-x-full scale-90 pointer-events-none"
                    : "opacity-0 translate-x-full scale-90 pointer-events-none"
                }`}
              >
                <div className="flex flex-col lg:flex-row items-center justify-between gap-4 md:gap-6 lg:gap-4 h-full px-2 sm:px-4 lg:px-0">
                  
                  {/* Description Card */}
                  <div className="w-full lg:w-[38%] xl:w-[36%] relative z-20 flex items-center">
                    <div className="w-full bg-gradient-to-br from-gray-900/90 to-black/90 border border-amber-500/30 rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-5 xl:p-6 shadow-xl transform hover:scale-105 transition-transform duration-300 backdrop-blur-sm">
                      <div className="inline-block mb-2">
                        <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30">
                          #{String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl lg:text-2xl xl:text-3xl font-bold mb-2 md:mb-3 bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent leading-tight">
                        {item.title}
                      </h3>

                      <p className="text-white/90 text-sm sm:text-base lg:text-sm xl:text-base leading-relaxed">
                        {item.description}
                      </p>

                      <div className="mt-3 md:mt-4 h-1 w-12 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full" />
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-amber-500/5 rounded-xl md:rounded-2xl -z-10 blur-xl" />
                    </div>
                  </div>

                  {/* Arrow - Desktop Only */}
                  <div className="hidden lg:flex w-[14%] xl:w-[16%] items-center justify-center relative flex-shrink-0">
                    <svg width="140" height="80" viewBox="0 0 140 80" className="animate-float w-full h-auto max-w-[140px]">
                      <defs>
                        <linearGradient id={`arrowGrad${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#fbbf24" />
                          <stop offset="100%" stopColor="#f59e0b" />
                        </linearGradient>
                        <filter id={`glow${index}`}>
                          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                          <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>
                      <path d="M 20 40 Q 70 20, 120 40"
                        stroke={`url(#arrowGrad${index})`} strokeWidth="2.5" fill="none"
                        strokeDasharray="8,8" filter={`url(#glow${index})`} className="animate-dash"
                      />
                      <polygon points="120,40 112,36 112,44"
                        fill={`url(#arrowGrad${index})`} filter={`url(#glow${index})`}
                        className="animate-pulse-arrow"
                      />
                      <circle cx="20" cy="40" r="4"
                        fill={`url(#arrowGrad${index})`} className="animate-pulse-slow"
                      />
                      <circle cx="70" cy="20" r="3"
                        fill="#fbbf24" opacity="0.6" className="animate-ping-slow"
                      />
                    </svg>
                  </div>

                  {/* Image */}
                  <div className="w-full lg:w-[48%] xl:w-[48%] relative z-20 flex items-center">
                    <div className="w-full relative rounded-xl md:rounded-2xl overflow-hidden border border-amber-500/30 shadow-xl">
                      <div className="aspect-[16/10] lg:aspect-[4/3] relative overflow-hidden bg-black">
                        <img src={item.image} srcSet={[`${item.image.replace(/\.webp$/, '-480w.webp')} 480w`, `${item.image} 800w`].join(', ')} sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw" alt={item.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/800x600/0a0a0a/f59e0b?text=Feature+Image';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-transparent to-amber-500/20 pointer-events-none" />
                      </div>
                      <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-amber-500 rounded-xl md:rounded-2xl opacity-20 blur-xl -z-10" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-3 md:gap-4 lg:gap-6 mt-4 md:mt-6">
            <button 
              onClick={handlePrev}
              onTouchStart={handleTouchStart}
              onMouseDown={handleTouchStart}
              className="bg-gray-900 hover:bg-gradient-to-r hover:from-amber-600 hover:to-amber-600 p-2.5 md:p-3 lg:p-4 rounded-full transition-all duration-300 hover:scale-110 border border-amber-500/30 shadow-lg active:scale-95"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </button>

            <div 
              className="flex items-center gap-1.5 md:gap-2 bg-gray-900/50 backdrop-blur-sm px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded-full border border-amber-500/20 overflow-x-auto max-w-[240px] sm:max-w-[300px] md:max-w-none"
              onTouchStart={handleTouchStart}
            >
              {carouselData.map((_, index) => (
                <button 
                  key={index} 
                  onClick={() => handleDotClick(index)} 
                  onTouchStart={handleTouchStart}
                  className="relative flex-shrink-0"
                >
                  <div className={`transition-all duration-500 rounded-full ${
                      index === activeIndex
                        ? "w-7 md:w-8 lg:w-10 h-2 md:h-2.5 lg:h-3 bg-gradient-to-r from-amber-400 to-amber-500"
                        : "w-2 md:w-2.5 lg:w-3 h-2 md:h-2.5 lg:h-3 bg-gray-600 hover:bg-gray-500"
                    }`}
                  />
                  {index === activeIndex && (
                    <div className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-50" />
                  )}
                </button>
              ))}
            </div>

            <button 
              onClick={handleNext}
              onTouchStart={handleTouchStart}
              onMouseDown={handleTouchStart}
              className="bg-gray-900 hover:bg-gradient-to-r hover:from-amber-600 hover:to-amber-600 p-2.5 md:p-3 lg:p-4 rounded-full transition-all duration-300 hover:scale-110 border border-amber-500/30 shadow-lg active:scale-95"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </button>
          </div>

          {/* Auto-play status indicator */}
          <div className="absolute bottom-2 right-2 opacity-30 pointer-events-none">
            <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? "bg-green-400" : "bg-amber-400"}`} />
          </div>
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
//  COMBINED PAGE EXPORT
// ─────────────────────────────────────────────────────────────────────────────
const PremiumCarouselPage = () => {
  return (
    <div id="portfolio" style={{ background: "#000" }}>
      {/* ── SECTION 1: NGO Portfolio (title + cards + view more) ── */}
      <NgoPortfolioSection ngoPagePath="/portfolio/ngo" />

      {/* ── SECTION 2: Premium Features Carousel (untouched original) ── */}
      <PremiumCarousel />

      <style>{`

        /* ══════════════════════════════════════
           NGO SECTION STYLES (pc-ngo- prefix)
        ══════════════════════════════════════ */

        @keyframes pcNgoShimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes pcNgoShineSweep { 0%{left:-100%;opacity:.55} 60%{left:120%;opacity:.25} 100%{left:120%;opacity:0} }
        @keyframes pcGoldShimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes pcViewMorePop { 0%{transform:scale(0.85);opacity:0} 70%{transform:scale(1.04)} 100%{transform:scale(1);opacity:1} }

        .pc-ngo-section {
          background: #000;
          padding: 72px 24px 80px;
          position: relative;
          overflow: hidden;
          width: 100%;
        }
        .pc-ngo-section::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 50% 0%, rgba(212,175,55,.05) 0%, transparent 60%);
          pointer-events: none;
        }

        /* Header */
        .pc-ngo-header {
          text-align: center;
          max-width: 860px;
          margin: 0 auto 48px;
          padding: 0 8px;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity .8s ease, transform .8s ease;
        }
        .pc-ngo-header--visible { opacity: 1; transform: translateY(0); }

        .pc-ngo-eyebrow-row {
          display: inline-flex; align-items: center; gap: 10px; margin-bottom: 20px;
        }
        .pc-ngo-eyebrow-line {
          width: 36px; height: 1px;
          background: linear-gradient(to right, transparent, #d4af37);
        }
        .pc-ngo-eyebrow-line--r { background: linear-gradient(to left, transparent, #d4af37); }
        .pc-ngo-eyebrow-text {
          font-family: 'Inter', sans-serif;
          font-size: 11px; font-weight: 700;
          letter-spacing: .16em; color: #d4af37; text-transform: uppercase;
        }

        .pc-ngo-title {
          font-family: 'Libre Baskerville', serif;
          font-size: clamp(1.9rem, 5vw, 3.6rem);
          font-weight: 700; line-height: 1.15; color: #fff;
          margin-bottom: 16px;
        }
        .pc-ngo-title-gold {
          background: linear-gradient(90deg, #d4af37, #f4e5b8, #d4af37);
          background-size: 200% auto;
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: pcNgoShimmer 4s linear infinite;
        }
        .pc-ngo-divider {
          width: 70px; height: 3px;
          background: linear-gradient(to right, #d4af37, #f4e5b8);
          border-radius: 2px; margin: 0 auto 24px;
        }
        .pc-ngo-sub {
          font-family: 'Inter', sans-serif;
          font-size: clamp(.85rem, 2vw, 1rem);
          line-height: 1.8; color: rgba(255,255,255,.6);
          max-width: 600px; margin: 0 auto;
        }

        /* Grid */
        .pc-ngo-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        /* Desktop card */
        .pc-ngo-card-anim {
          transition: opacity .5s ease, transform .5s ease;
        }
        .pc-ngo-card-outer {
          position: relative; height: 360px; border-radius: 16px;
          overflow: hidden; cursor: none; background: #0a0a0a;
          box-shadow: 0 8px 32px rgba(0,0,0,.6);
          transition: box-shadow .3s ease, transform .3s ease;
        }
        .pc-ngo-card-scroll {
          position: relative; height: 100%;
          overflow-y: auto; overflow-x: hidden; scrollbar-width: none;
        }
        .pc-ngo-card-scroll::-webkit-scrollbar { display: none; }
        .pc-ngo-img-wrap { position: relative; height: auto; pointer-events: none; }
        .pc-ngo-img { width: 100%; height: auto; object-fit: initial; object-position: top center; display: block; user-select: none; }
        .pc-ngo-grad-top {
          position: sticky; top: 0; left: 0; right: 0; height: 60px; margin-bottom: -60px;
          background: linear-gradient(to bottom, rgba(0,0,0,.6), transparent);
          pointer-events: none; z-index: 3;
        }
        .pc-ngo-grad-bot {
          position: sticky; bottom: 0; left: 0; right: 0; height: 160px; margin-top: -160px;
          background: linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,.9) 30%, rgba(0,0,0,.55) 65%, transparent 100%);
          pointer-events: none; z-index: 3;
        }
        .pc-ngo-badge {
          position: sticky; top: 12px; float: left; margin: -48px 0 0 12px;
          background: rgba(212,175,55,.92); color: #000;
          padding: 4px 13px; border-radius: 50px;
          font-size: 10px; font-weight: 700; letter-spacing: .06em;
          font-family: 'Inter', sans-serif; backdrop-filter: blur(4px); z-index: 10; clear: left;
        }
        .pc-ngo-card-info {
          position: sticky; bottom: 0; padding: 12px 16px 16px; z-index: 10; pointer-events: none;
          display: flex; align-items: flex-end; justify-content: space-between;
        }
        .pc-ngo-card-title {
          font-family: 'Libre Baskerville', serif;
          font-size: 13px; font-weight: 700; color: #fff; line-height: 1.3;
          text-shadow: 0 1px 10px rgba(0,0,0,1); transition: color .3s ease;
        }
        .pc-ngo-card-arrow { font-size: 20px; color: #d4af37; text-shadow: 0 0 12px rgba(212,175,55,.8); flex-shrink: 0; }
        .pc-ngo-card-outer:hover { box-shadow: 0 16px 48px rgba(212,175,55,.2); transform: translateY(-4px); }
        .pc-ngo-card-outer::after {
          content: ''; position: absolute; inset: 0; border-radius: 16px;
          border: 2px solid transparent;
          background: linear-gradient(135deg, rgba(212,175,55,.6), transparent 50%, rgba(212,175,55,.3)) border-box;
          -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: destination-out; mask-composite: exclude;
          opacity: 0; transition: opacity .3s ease; pointer-events: none; z-index: 20;
        }
        .pc-ngo-card-outer:hover::after { opacity: 1; }
        .pc-ngo-card-outer:hover .pc-ngo-card-title { color: #f4e5b8; }
        .pc-ngo-cursor {
          position: absolute; transform: translate(-50%, -50%);
          pointer-events: none; transition: opacity .3s ease; z-index: 100;
        }
        .pc-ngo-cursor-circle {
          width: 48px; height: 48px; border-radius: 50%;
          background: rgba(15,15,15,.8); backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 2px 20px rgba(0,0,0,.4), 0 0 0 1px rgba(212,175,55,.2);
        }

        /* Mobile card */
        .pc-ngo-mob-anim {
          transition: opacity .58s ease, transform .58s cubic-bezier(0.22,1,0.36,1);
          border-radius: 18px; overflow: hidden;
          -webkit-tap-highlight-color: transparent; touch-action: pan-y;
        }
        .pc-ngo-mob-outer {
          position: relative; height: 300px; border-radius: 18px; overflow: hidden;
          background: #111;
          border: 2px solid rgba(212,175,55,.4);
          box-shadow: 0 10px 40px rgba(0,0,0,.7), 0 0 0 1px rgba(212,175,55,.1);
        }
        .pc-ngo-mob-scroll {
          position: absolute; inset: 0;
          overflow-y: scroll; overflow-x: hidden;
          scrollbar-width: none; -webkit-overflow-scrolling: touch;
          touch-action: pan-y; cursor: pointer; z-index: 2;
        }
        .pc-ngo-mob-scroll::-webkit-scrollbar { display: none; }

        /* View More */
        .pc-ngo-viewmore-wrap {
          display: flex; justify-content: center; align-items: center;
          margin-top: 52px;
          animation: pcViewMorePop .6s cubic-bezier(0.22,1,0.36,1) .2s both;
        }
        .pc-ngo-viewmore-btn {
          display: inline-flex; align-items: center; gap: 10px;
          background: linear-gradient(90deg, #d4af37, #f4e5b8, #d4af37);
          background-size: 200% auto;
          animation: pcGoldShimmer 3s linear infinite;
          border: none; border-radius: 50px;
          padding: 14px 36px;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          font-size: 14px; font-weight: 700; letter-spacing: .04em;
          color: #000; text-decoration: none;
          box-shadow: 0 4px 24px rgba(212,175,55,.35);
          transition: transform .25s ease, box-shadow .25s ease;
          position: relative; overflow: hidden;
        }
        .pc-ngo-viewmore-btn:hover {
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 10px 40px rgba(212,175,55,.5);
        }
        .pc-ngo-viewmore-btn svg { transition: transform .3s ease; flex-shrink: 0; }
        .pc-ngo-viewmore-btn:hover svg { transform: translateX(4px); }

        /* Responsive */
        @media (max-width: 1024px) {
          .pc-ngo-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
        }
        @media (max-width: 768px) {
          .pc-ngo-section { padding-top: 24px; padding-bottom: 24px; }
          .pc-ngo-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
          .pc-ngo-card-outer { height: 300px; }
          .pc-ngo-mob-outer { height: 270px; }
          .pc-ngo-header { margin-bottom: 24px; }
          .pc-ngo-eyebrow-row { margin-bottom: 12px; }
        }
        @media (max-width: 640px) {
          .pc-ngo-section { padding-left: 14px; padding-right: 14px; }
          .pc-ngo-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
          .pc-ngo-card-outer { height: 260px; }
          .pc-ngo-card-title { font-size: 11px; }
          .pc-ngo-mob-outer { height: 240px; }
        }
        @media (max-width: 480px) {
          .pc-ngo-section { padding-top: 0; padding-bottom: 12px; padding-left: 12px; padding-right: 12px; }
          .pc-ngo-header { margin-bottom: 16px; }
          .pc-ngo-eyebrow-row { margin-bottom: 8px; }
          .pc-ngo-grid { grid-template-columns: 1fr; gap: 14px; }
          .pc-ngo-card-outer { height: 280px; cursor: pointer; }
          .pc-ngo-cursor { display: none; }
          .pc-ngo-mob-outer { height: 260px; }
          .pc-ngo-card-title { font-size: 13px; }
          .pc-ngo-viewmore-btn { padding: 12px 24px; font-size: 13px; }
        }

        /* ══════════════════════════════════════
           CAROUSEL ORIGINAL STYLES
        ══════════════════════════════════════ */

        .golden-text {
          background: linear-gradient(135deg, #d4af37, #f4e5b8, #c9a961);
          -webkit-background-clip: text; 
          background-clip: text;
          color: transparent; 
          display: inline-block;
          filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.2));
        }

        @keyframes word-fade-in {
          from { opacity: 0; transform: translateY(20px); filter: blur(10px); }
          to   { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        .animate-word-fade-in { animation: word-fade-in 1s ease-out forwards; opacity: 0; }

        @keyframes dash { to { stroke-dashoffset: -40; } }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(1deg); }
        }
        @keyframes pulse-arrow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
        @keyframes pulse-slow { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(2); opacity: 0; }
        }
        
        .animate-dash { animation: dash 2s linear infinite; }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-pulse-arrow { animation: pulse-arrow 2s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-ping-slow { animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite; }
        .cubic-bezier { transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1); }

        @media (prefers-reduced-motion: reduce) {
          .animate-word-fade-in, .animate-dash, .animate-float, .animate-pulse-arrow,
          .animate-pulse-slow, .animate-ping-slow { animation: none !important; }
        }
      `}</style>
    </div>
  );
};

export default PremiumCarouselPage;