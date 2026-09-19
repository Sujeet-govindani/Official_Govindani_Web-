// @ts-nocheck
// NGO Portfolio Page
import { useState, useEffect, useRef, useCallback } from "react";
import PortfolioSection from "@/components/HomePage/PortfolioSection";
import ContactUsForm from "./ContactUsForm";

// ─── Detect touch device ───────────────────────────────────────────────────────
const isTouchDevice = () =>
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

// ─── Helper: convert any Google Drive URL to a direct thumbnail URL ───────────
function driveToImg(url) {
  if (!url) return url;
  if (!url.includes("drive.google.com")) return url;
  let id = null;
  const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (fileMatch) id = fileMatch[1];
  else if (idMatch) id = idMatch[1];
  if (id) return `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
  return url;
}

// ─── Search Bar Component ─────────────────────────────────────────────────────
function SearchBar({ query, onChange, placeholder = "Search projects...", prefix = "ngo" }) {
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
        transitionDelay: `${(index % 6) * 0.07}s`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(48px) scale(0.95)",
      }}
    >
      <div className="mob-img-outer">
        <div ref={scrollRef} className="mob-scroll-container" onTouchEnd={handleTap} onClick={handleTap}>
          <div className="mob-img-wrap">
            <img src={project.image} srcSet={[`${project.image.replace(/\.webp$/, '-480w.webp')} 480w`, `${project.image} 800w`].join(', ')} sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw" alt={project.title} className="mob-img" draggable={false} loading="lazy" decoding="async" />
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
    <div
      className={`ngo-card-anim ${isVisible ? "visible" : ""}`}
      style={{ transitionDelay: `${(index % 9) * 0.07}s` }}
    >
      <div
        ref={containerRef}
        className="ngo-card-outer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onClick={() => window.open(project.url, "_blank", "noopener,noreferrer")}
      >
        <div ref={scrollRef} className="ngo-card-inner-scroll">
          <div className="ngo-card-img-wrap">
            <img src={project.image} srcSet={[`${project.image.replace(/\.webp$/, '-480w.webp')} 480w`, `${project.image} 800w`].join(', ')} sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw" alt={project.title} className="ngo-card-img" draggable={false} loading="lazy" decoding="async" />
          </div>
          <div className="ngo-card-grad-top" />
          <div className="ngo-card-grad-bot" />
          <div className="ngo-cat-badge">{project.category.toUpperCase()}</div>
          <div className="ngo-scroll-bar"><div className="ngo-scroll-bar-fill" /></div>
          <div className="ngo-card-info">
            <h3 className="ngo-card-title">{project.title}</h3>
            <span className="ngo-card-arrow">↗</span>
          </div>
        </div>
        <div className="ngo-custom-cursor" style={{ left: cursor.x, top: cursor.y, opacity: cursor.opacity }}>
          <div className="ngo-cursor-circle">
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

// ─── View More Button ─────────────────────────────────────────────────────────
function ViewMoreButton({ remainingCount, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="view-more-wrap">
      <button
        className={`view-more-btn ${hovered ? "hovered" : ""}`}
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        View More
      </button>
    </div>
  );
}

// ─── Mobile Connect Banner ────────────────────────────────────────────────────
function MobileConnectBanner({ onConnect }) {
  return (
    <div className="mob-connect-banner">
      <div className="mob-connect-inner">
        <div className="mob-connect-icon">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <circle cx="11" cy="11" r="10" stroke="#d4af37" strokeWidth="1.4" />
            <path d="M7 11h8M11 7l4 4-4 4" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="mob-connect-text">
          <p className="mob-connect-heading">Explore Our Full Portfolio</p>
          <p className="mob-connect-sub">40+ NGO websites crafted across India</p>
        </div>
        <button className="mob-connect-btn" onClick={onConnect}>
          Connect
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── Main NGO Page ────────────────────────────────────────────────────────────
const NgoPortfolio = () => {
  const [sec1Visible, setSec1Visible] = useState(false);
  const [sec3Visible, setSec3Visible] = useState(false);
  const [ngoSearch, setNgoSearch] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const sec1Ref = useRef(null);
  const sec3Ref = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const allProjects = [
    { title: "Popatbhai Charitable Trust", category: "ngo", url: "https://popatbhaicharitablefoundation.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Popatbhai-Charitable-Trust.webp" },
    { title: "Harsh Chhikkara Jan Seva Trust", category: "ngo", url: "https://harshchhikara.com/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Harsh-Chhikkara-Jan-Seva-Trust.webp" },
    { title: "Mahipatsinh Foundation", category: "ngo", url: "https://mahipatsinhfoundation.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Mahipatsinh-Foundation.webp" },
    { title: "Gau Seva Dham", category: "ngo", url: "https://gausevadham.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Gau-Seva-Dham.webp" },
    { title: "Community Welfare", category: "ngo", url: "https://mallakhambartist.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Mallakhamb-Artist.webp" },
    { title: "Nanhi Pari Foundation", category: "ngo", url: "https://nanhiparifoundation.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Nanhi-Pari-Foundationngo.webp" },
    { title: "Palawi", category: "ngo", url: "https://palawi.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Palawingo.webp" },
    { title: "Animals Matter to Me", category: "ngo", url: "https://amtmindia.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Animals-Matterto-Me.webp" },
    // >>> latest-captured portfolio sites (auto-added, review before deploy)
    { title: "Aajol Parivar", category: "ngo", url: "https://aajol.org", image: "/images/portfolio-sites/aajol-parivar.jpg" },
    { title: "Aloka Foundation", category: "ngo", url: "https://aloka-foundation.org", image: "/images/portfolio-sites/aloka-foundation.jpg" },
    { title: "Amee Foundation", category: "ngo", url: "https://ameefoundation.com", image: "/images/portfolio-sites/amee-foundation.jpg" },
    { title: "Anugrah Foundation", category: "ngo", url: "https://anugrahfoundation.org", image: "/images/portfolio-sites/anugrah-foundation.jpg" },
    { title: "Ashish Legal Foundation", category: "ngo", url: "https://ashishlegalfoundation.org", image: "/images/portfolio-sites/ashish-legal-foundation.jpg" },
    { title: "Avyaym Foundation", category: "ngo", url: "https://avyaymfoundation.org", image: "/images/portfolio-sites/avyaym-foundation.jpg" },
    { title: "Balyam Child Care", category: "ngo", url: "https://balyamorphan.com", image: "/images/portfolio-sites/balyam-child-care.jpg" },
    { title: "Bharat Welfare Association", category: "ngo", url: "https://bharatwelfare.org", image: "/images/portfolio-sites/bharat-welfare-association.jpg" },
    { title: "Bhumi Mitra Foundation", category: "ngo", url: "https://bhumimitra.org", image: "/images/portfolio-sites/bhumi-mitra-foundation.jpg" },
    { title: "Dattaaie Foundation", category: "ngo", url: "https://dattaaiefoundation.org", image: "/images/portfolio-sites/dattaaie-foundation.jpg" },
    { title: "DAVO Foundation", category: "ngo", url: "https://davongo.in", image: "/images/portfolio-sites/davo-ngo.jpg" },
    { title: "Dharmaraj Bahuudeshiya Va Shikshan Prasarak Mandal", category: "ngo", url: "https://dbvspm.org", image: "/images/portfolio-sites/dbvspm.jpg" },
    { title: "Edugap Foundation", category: "ngo", url: "https://edugap.org", image: "/images/portfolio-sites/edugap-foundation.jpg" },
    { title: "EMPCI Foundation", category: "ngo", url: "https://empcofindia.com", image: "/images/portfolio-sites/empci-foundation.jpg" },
    { title: "Glid Care Foundation", category: "ngo", url: "https://glidcarefoundation.org", image: "/images/portfolio-sites/glid-care-foundation.jpg" },
    { title: "Globira Medical Council", category: "ngo", url: "https://globiramedicalcouncil.org", image: "/images/portfolio-sites/globira-medical-council.jpg" },
    { title: "Handmade Heart Foundation", category: "ngo", url: "https://handmadehearts.org", image: "/images/portfolio-sites/handmade-heart-foundation.jpg" },
    { title: "Helping Hearts", category: "ngo", url: "https://helpingheartsngo.com", image: "/images/portfolio-sites/helping-hearts.jpg" },
    { title: "Hetch Foundation", category: "ngo", url: "https://hetchfoundation.com", image: "/images/portfolio-sites/hetch-foundation.jpg" },
    { title: "Jagrati Foundation", category: "ngo", url: "https://jagratifoundation.com", image: "/images/portfolio-sites/jagrati-foundation.jpg" },
    { title: "K3 Learning & Development Foundation", category: "ngo", url: "https://k3foundation.org", image: "/images/portfolio-sites/k3-foundation.jpg" },
    { title: "Karmada Foundation", category: "ngo", url: "https://karmadafoundation.org", image: "/images/portfolio-sites/karmada-foundation.jpg" },
    { title: "Karuna Seva Trust", category: "ngo", url: "https://karunasevatrust.org", image: "/images/portfolio-sites/karuna-seva-trust.jpg" },
    { title: "Kishan Singh Foundation", category: "ngo", url: "https://kishanfoundation.org", image: "/images/portfolio-sites/kishan-singh-foundation.jpg" },
    { title: "Lahari Home Foundation", category: "ngo", url: "https://laharifoundation.org", image: "/images/portfolio-sites/lahari-home-foundation.jpg" },
    { title: "Manav Parivar Trust", category: "ngo", url: "https://manavparivartrust.org", image: "/images/portfolio-sites/manav-parivar-trust.jpg" },
    { title: "Mayaraini Educational Foundation", category: "ngo", url: "https://mayarainieducationalfoundation.org", image: "/images/portfolio-sites/mayaraini-educational-foundation.jpg" },
    { title: "Majha Sankalp Muscular Dystrophy Mukticha Association", category: "ngo", url: "https://msmdmassociation.org", image: "/images/portfolio-sites/msmdm-association.jpg" },
    { title: "Nekwan Charitable Trust", category: "ngo", url: "https://nekwanfoundation.org", image: "/images/portfolio-sites/nekwan-charitable-trust.jpg" },
    { title: "Nostro Destino Foundation", category: "ngo", url: "https://nostrodestino.org", image: "/images/portfolio-sites/nostro-destino-foundation.jpg" },
    { title: "Nyay Ki Ganga", category: "ngo", url: "https://nyaykiganga.org", image: "/images/portfolio-sites/nyay-ki-ganga.jpg" },
    { title: "Oshi Foundation", category: "ngo", url: "https://oshifoundation.org", image: "/images/portfolio-sites/oshi-foundation.jpg" },
    { title: "Punit Kumar Sahu & Associates", category: "ngo", url: "https://punitkumarsahu.com", image: "/images/portfolio-sites/punit-kumar-sahu.jpg" },
    { title: "Rajkumar Talwar Foundation", category: "ngo", url: "https://rajkumartalwarfoundation.org", image: "/images/portfolio-sites/rajkumar-talwar-foundation.jpg" },
    { title: "Relief Helping Hands Foundation", category: "ngo", url: "https://reliefhelpinghands.org", image: "/images/portfolio-sites/relief-helping-hands-foundation.jpg" },
    { title: "Sahaya India", category: "ngo", url: "https://sahayaindia.org", image: "/images/portfolio-sites/sahaya-india.jpg" },
    { title: "Samarpan Pratishthan", category: "ngo", url: "https://samarpanpratishthan.org", image: "/images/portfolio-sites/samarpan-pratishthan.jpg" },
    { title: "Sampoorna Seva Charitable Trust", category: "ngo", url: "https://sampoornaseva.com", image: "/images/portfolio-sites/sampoorna-seva.jpg" },
    { title: "SHABASH (Sant Banadas Seva Sangh)", category: "ngo", url: "https://shabash.org.in", image: "/images/portfolio-sites/shabash.jpg" },
    { title: "ShreeNiketan Child Care Foundation", category: "ngo", url: "https://shreeniketanchildcare.org", image: "/images/portfolio-sites/shree-niketan-child-care.jpg" },
    { title: "Shree Satyanarayan Memorial Charitable Trust", category: "ngo", url: "https://shreesatyanarayantrust.org", image: "/images/portfolio-sites/shree-satyanarayan-trust.jpg" },
    { title: "Snehankit Helpline", category: "ngo", url: "https://snehankithelpline.org", image: "/images/portfolio-sites/snehankit-helpline.jpg" },
    { title: "Talent4Nation", category: "ngo", url: "https://talent4nation.org", image: "/images/portfolio-sites/talent4nation.jpg" },
    { title: "Ajit Foundation", category: "ngo", url: "https://theajitfoundation.in", image: "/images/portfolio-sites/ajit-foundation.jpg" },
    { title: "The Arms Of Hope Charitable Trust", category: "ngo", url: "https://thearmsofhope.org.in", image: "/images/portfolio-sites/arms-of-hope.jpg" },
    { title: "Swarajya Foundation", category: "ngo", url: "https://theswarajyafoundation.org", image: "/images/portfolio-sites/swarajya-foundation.jpg" },
    { title: "Trikut Seva Foundation", category: "ngo", url: "https://trikutsevafoundation.org", image: "/images/portfolio-sites/trikut-seva-foundation.jpg" },
    { title: "Trilochanay Welfare Foundation", category: "ngo", url: "https://trilochanayngo.com", image: "/images/portfolio-sites/trilochanay-foundation.jpg" },
    { title: "Yakshit Yuva Foundation", category: "ngo", url: "https://yakshitngo.in", image: "/images/portfolio-sites/yakshit-foundation.jpg" },
    { title: "Yuva Swaraj Foundation", category: "ngo", url: "https://yuvaswarajfoundation.org", image: "/images/portfolio-sites/yuva-swaraj-foundation.jpg" },
    // <<< latest-captured
    { title: "Anekaa Care Foundation", category: "ngo", url: "https://anekaacarefoundation.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Anekaa-Care-Foundation.webp" },
    { title: "Little Heart Foundation", category: "ngo", url: "https://littleheartfoundation.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Little-Heart-Foundation.png" },
    { title: "Voice Of Slum", category: "ngo", url: "https://voiceofslum.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Voice-Of-Slum.webp" },
    { title: "Vishramgahr Foundation", category: "ngo", url: "https://vishramgharfoundation.in/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Vishramgahr-Foundation.webp" },
    { title: "Second Chance India", category: "ngo", url: "https://secondchanceindia.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Second-Chance-India.webp" },
    { title: "Sanyogam Foundation", category: "ngo", url: "https://sanyogam.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Sanyogam-Foundation.webp" },
    { title: "Citare Foundation", category: "ngo", url: "https://citarefoundation.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Citare-Foundationngo.webp" },
    { title: "Parag Foundation", category: "ngo", url: "https://paragfoundation.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Parag-Foundation.webp" },
    { title: "Hand-In-Hand", category: "ngo", url: "https://handinhandwecan.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Hand-In-Hand.webp" },
    { title: "Aashray Samiti", category: "ngo", url: "https://aashraysamiti.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-AashraySamiti.webp" },
    { title: "Humanity Charity", category: "ngo", url: "https://humanitycharity.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Humanity-Charity.webp" },
    { title: "Vikasana Foundation", category: "ngo", url: "https://vikasanafoundation.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Vikasana-Foundation.webp" },

    { title: "V-Care-Foundation", category: "ngo", url: "https://vcarengo.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-V-Care-Ngo.webp" },
    { title: "Krishna Dham Gaushala Ngo", category: "ngo", url: "https://krishnadhamgaushala.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Krishna-Dham-Gaushala.webp" },
    { title: "Doon Animal Welfare Foundation", category: "ngo", url: "https://doonanimalwelfare.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Doon-Animal-Welfare.webp" },
    { title: "Shikshan and Krushi Vikas Pratishthan Medshingi", category: "ngo", url: "https://skvpm.in/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Shikshan-Krushi-Vikas-Prathisthan-Medshingi.webp" },
    { title: "Nishchay Foundation", category: "ngo", url: "https://nishchayfoundation.co.in/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Nishchay-Foundation.webp" },
    { title: "Life for Strays", category: "ngo", url: "https://lifeforstrays.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Life-for-Strays.webp" },
    { title: "Jidd Pratishthan Foundation", category: "ngo", url: "https://jiddpratishthan.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Jidd-Pratishthan.webp" },
    { title: "Neevira Foundation", category: "ngo", url: "https://neevira.com/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Neevira-Foundation.webp" },
    { title: "Ahilya Foundation", category: "ngo", url: "https://ahilyasfoundation.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Ahilya-Foundation.webp" },
    { title: "One Step For Help Foundation", category: "ngo", url: "https://onestep4helpfoundation.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-One-Step-For-Help-Foundation.webp" },
    { title: "Trivanta Foundation", category: "ngo", url: "https://trivanta.org.in/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Trivanta-Foundation.webp" },
    { title: "We For Orphans", category: "ngo", url: "https://we4orphans.com/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-We-For-Orphans.webp" },
    { title: "Alamaan Trust Foundation", category: "ngo", url: "https://alamaantrust.com/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Ai-Amaan-Trust.webp" },
    { title: "We Grow Global Foundation", category: "ngo", url: "https://wegrowglobalfoundation.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-We-Grow-Global-Foundation.webp" },
    { title: "Navdeepam Foundation", category: "ngo", url: "https://navdeepam.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Navdeepam-Foundation.webp" },
    { title: "Hands for Hope Foundation", category: "ngo", url: "https://handsforhopefoundation.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Hands-For-Hope-Foundation.webp" },
    { title: "Arthashila Foundation", category: "ngo", url: "https://arthashilafoundation.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Arthashila-Foundation.webp" },
    { title: "Riday Foundation", category: "ngo", url: "https://ridayfoundations.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Riday-Foundation.webp" },
    { title: "Sarthak Charitable Trust", category: "ngo", url: "https://sarthakcharitabletrust.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Sarthak-Charitable-Trust.webp" },
    { title: "Manav Janhit Kalyan Sansthan", category: "ngo", url: "https://manavjanhitkalyansansthan.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Manav-Janhit-Kalyan-Sansthan.webp" },
    { title: "Save a Stray", category: "ngo", url: "https://saveastray.in/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Save-a-Stray.webp" },
    { title: "Samajik Vikas Kendra", category: "ngo", url: "https://samajikvikaskendra.in/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Samajik-Vikas-Kendra.webp" },
    { title: "Akhil Bharat Samiti", category: "ngo", url: "https://akhilabharatasamiti.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Akhil-Bharat-Samiti.webp" },
    { title: "Muskan Sewa Foundation", category: "ngo", url: "https://muskansewa.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Muskan-Sewa-Foundation.webp" },
    { title: "Satya Abhiyan Foundation", category: "ngo", url: "https://www.satyaabhiyanfoundation.com/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Satya-Abhiyan-Foundation.webp" },
    { title: "Parash Dhyan Shikshan Prasarak Mandal", category: "ngo", url: "https://pdspm.in/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Parash-Dhyan-Shikshan-Prasarak-Mandal.webp" },
    { title: "Vashundhara Foundation", category: "ngo", url: "https://vashundharafoundation.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Vashundhara-Foundation.webp" },
    { title: "Mauli Foundation", category: "ngo", url: "https://maulifoundation.net/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Mauli-Foundation.webp" },
    { title: "Earthlings Trust", category: "ngo", url: "https://earthlingstrust.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Earthlings-Trust.webp" },
    { title: "Raskala Manch", category: "ngo", url: "https://raskalamanch.com/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Raskala-Manch.webp" },
    { title: "Barwa Foundation", category: "ngo", url: "https://barwafoundation.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Barwa-Foundation.webp" },
    { title: "Charan Vandan", category: "ngo", url: "https://charanvandan.com/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Charan-Vandan.webp" },
    { title: "Yashr Foundation", category: "ngo", url: "https://yashrfoundation.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Yashr-Foundation.webp" },
    { title: "Malini Charitable Trust", category: "ngo", url: "https://mctindia.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Malini-Charitable-Trust-India.webp" },
    { title: "Anitya Welfare Society", category: "ngo", url: "https://anityawelfaresociety.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Anitya-Welfare-Society.webp" },
    { title: "Live For Others Being Helpful", category: "ngo", url: "https://lfobhf.com/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Live-For-Others-Being-Helpful.webp" },
    { title: "Helping Hands Society", category: "ngo", url: "https://hhsindia.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Helping-Hands-Society.webp" },
    { title: "Bholeki Nagri", category: "ngo", url: "https://bholekinagri.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Bholeki-Nagri.webp" },
    { title: "Vakula Devi Foundation", category: "ngo", url: "https://vakuladevi.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Vakula-Devi-Foundation.webp" },
    { title: "Hanshamaa Foundation", category: "ngo", url: "https://hanshamaa.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Hanshamaa-Foundation.webp" },
    { title: "Joyful Global Foundation", category: "ngo", url: "https://joyfulglobalfoundation.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Joyful-Global-Foundation.webp" },
    { title: "Samaira Foundation", category: "ngo", url: "https://samairafoundation.com/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Samaira-Foundation.webp" },
    { title: "Child Educational Trust", category: "ngo", url: "https://childeducationaltrust.in/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Child-Educational-Trust.webp" },
    { title: "Island Development Organization", category: "ngo", url: "https://islanddevelopment.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Island-Development-Organization.webp" },
    { title: "Dharmyog Foundation", category: "ngo", url: "https://dharmyogfoundation.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Dharmyog-Foundation.webp" },
    { title: "Child & Baby Care", category: "ngo", url: "https://childbabycare.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Child-and-Baby-Care.webp" },
    { title: "AvPravah Foundation", category: "ngo", url: "https://avpravahfoundation.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Av-Pravah-Foundationngo.webp" },
    { title: "Kamayani Foundation", category: "ngo", url: "https://kamayanifoundation.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Kamayani-Foundation.webp" },
    { title: "Novel India Foundation", category: "ngo", url: "https://novelindia.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Novel-India.webp" },
    { title: "Harit Disha Foundation", category: "ngo", url: "https://haritdishafoundation.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Harit-Disha-Foundationngo.webp" },
    { title: "Just Help Me", category: "ngo", url: "https://just-helpme.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Just-Help-Me.webp" },
    { title: "Mother Teresa Family", category: "ngo", url: "https://mtsfamily.in/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Mother-Teresa-Family.webp" },
    { title: "Sevak Charity ", category: "ngo", url: "https://sevakcharity.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Sevak-Charity.webp" },
    { title: "Aghor Shakti Peeth", category: "ngo", url: "https://aghorshaktipeeth.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Aghor-Shakti-Peeth.webp" },
    { title: "Akhil Bhartiya Apang Kalyankari Bahuuddeshiya Sanstha", category: "ngo", url: "https://abakbsfoundation.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Akhil%20Bhartiya-Apang-Kalyankari-Bahuuddeshiya-Sanstha.webp" },
    { title: "Mission of Happiness", category: "ngo", url: "https://missionofhappiness.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Mission-of-Happiness.webp" },
    { title: "Rekhant Foundation", category: "ngo", url: "https://www.rekhantfoundation.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Rekhant-Foundation.webp" },
    { title: "Aap Foundation", category: "ngo", url: "https://aapfoundation.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Aap-Foundation.webp" },
    { title: "Tintern Charitable Trust", category: "ngo", url: "https://tinterncharitabletrust.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Tintern-Charitable-Trust.webp" },
    { title: "Aadev Health Serve Foundation", category: "ngo", url: "https://aadevhealth.org/", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/PortFolioWebsites/Ngo-Projects/Ngo-Aadev-Health-Serve-Foundation.webp" },
  ];

  const filteredProjects = allProjects.filter(p =>
    p.title.toLowerCase().includes(ngoSearch.toLowerCase())
  );

  const DESKTOP_INITIAL = 15;
  const MOBILE_INITIAL = 6;
  const initialCount = isMobile ? MOBILE_INITIAL : DESKTOP_INITIAL;

  const displayedProjects = ngoSearch
    ? filteredProjects
    : showAll
      ? filteredProjects
      : filteredProjects.slice(0, initialCount);

  const remaining = filteredProjects.length - initialCount;
  const showViewMore = !ngoSearch && !showAll && filteredProjects.length > initialCount;
  const showMobileConnect = isMobile && !ngoSearch && !showAll && filteredProjects.length > MOBILE_INITIAL;

  const scrollToContact = () => {
    document.querySelector(".contact-page")?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const items = [
      { ref: sec1Ref, setter: setSec1Visible },
      { ref: sec3Ref, setter: setSec3Visible },
    ];
    const obs = items.map(({ ref, setter }) => {
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setter(true); },
        { threshold: 0.05 }
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
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes ngoFadeUp    { from{opacity:0;transform:translateY(36px)} to{opacity:1;transform:translateY(0)} }
        @keyframes ngoShimmer   { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes ngoFloatY    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes ngoPulseDot  { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.6)} }
        @keyframes ngoShineSweep {
          0%  {left:-100%;opacity:.55} 60%{left:120%;opacity:.25} 100%{left:120%;opacity:0}
        }
        @keyframes ngoHintPulse {
          0%,100%{transform:translateX(-50%) scale(1)} 50%{transform:translateX(-50%) scale(1.06)}
        }
        @keyframes tornFlicker {
          0%,100%{filter:drop-shadow(0 0 18px rgba(212,175,55,.35))}
          50%    {filter:drop-shadow(0 0 32px rgba(212,175,55,.6))}
        }
        @keyframes teaserIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes viewMorePop {
          0%   { transform: scale(0.85); opacity: 0; }
          70%  { transform: scale(1.04); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes goldShimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes bannerSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes imgShimmer {
          0%   { left: -100%; }
          100% { left: 120%; }
        }

        /* ── Base ── */
        .ngo-page {
          background: #000;
          min-height: 100vh;
          overflow-x: hidden;
          width: 100%;
        }

        /* ════ SHARED SEARCH BAR ════ */
        .ngo-search-bar-wrap {
          width: 100%;
          max-width: 520px;
          margin: 0 auto 40px;
          padding: 0 16px;
        }
        .ngo-search-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(212,175,55,0.25);
          border-radius: 50px;
          padding: 12px 20px;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .ngo-search-bar-wrap.focused .ngo-search-bar {
          border-color: rgba(212,175,55,0.6);
          box-shadow: 0 0 0 3px rgba(212,175,55,0.08);
        }
        .ngo-search-icon { color: rgba(212,175,55,0.7); flex-shrink: 0; }
        .ngo-search-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          color: #fff;
          min-width: 0;
        }
        .ngo-search-input::placeholder { color: rgba(255,255,255,.35); }
        .ngo-search-clear {
          background: rgba(212,175,55,.12);
          border: 1px solid rgba(212,175,55,.25);
          border-radius: 50%;
          width: 24px; height: 24px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; flex-shrink: 0;
          color: rgba(212,175,55,.8);
          transition: background .2s ease;
        }
        .ngo-search-clear:hover { background: rgba(212,175,55,.22); }
        .ngo-search-hint {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          color: rgba(255,255,255,.4);
          text-align: center;
          margin-top: 10px;
        }
        .ngo-search-hint em { color: rgba(212,175,55,.7); font-style: normal; }
        .ngo-no-results {
          text-align: center;
          padding: 60px 20px;
          font-family: 'Inter', sans-serif;
          color: rgba(255,255,255,.35);
          font-size: 15px;
        }
        .ngo-no-results span { color: rgba(212,175,55,.6); }

        /* ════ VIEW MORE BUTTON ════ */
        .view-more-wrap {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 52px;
          animation: viewMorePop .6s cubic-bezier(0.22,1,0.36,1) .2s both;
        }
        .view-more-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #f5f0e8;
          border: none;
          border-radius: 50px;
          padding: 14px 36px;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: .04em;
          color: #c9a227;
          box-shadow:
            0 4px 24px rgba(212,175,55,.22),
            0 1px 0 rgba(255,255,255,.8) inset,
            0 -1px 0 rgba(180,140,30,.2) inset;
          transition: transform .25s ease, box-shadow .25s ease, background .25s ease;
          position: relative;
          overflow: hidden;
        }
        .view-more-btn::before {
          content: '';
          position: absolute; inset: 0;
          border-radius: 50px;
          background: linear-gradient(90deg, transparent 20%, rgba(212,175,55,.08) 50%, transparent 80%);
          background-size: 200% auto;
          animation: goldShimmer 3s linear infinite;
          pointer-events: none;
        }
        .view-more-btn.hovered,
        .view-more-btn:hover {
          transform: translateY(-3px) scale(1.03);
          box-shadow:
            0 10px 40px rgba(212,175,55,.38),
            0 1px 0 rgba(255,255,255,.9) inset;
          background: #fdfaf3;
        }

        /* ════ MOBILE CONNECT BANNER ════ */
        .mob-connect-banner {
          margin-top: 32px;
          padding: 0 4px;
          animation: bannerSlideUp .6s ease .3s both;
        }
        .mob-connect-inner {
          display: flex;
          align-items: center;
          gap: 14px;
          background: linear-gradient(135deg, rgba(212,175,55,.08) 0%, rgba(0,0,0,0) 100%);
          border: 1px solid rgba(212,175,55,.28);
          border-radius: 18px;
          padding: 18px 20px;
          position: relative;
          overflow: hidden;
        }
        .mob-connect-inner::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(212,175,55,.5), transparent);
        }
        .mob-connect-icon {
          width: 44px; height: 44px;
          border-radius: 50%;
          background: rgba(212,175,55,.08);
          border: 1px solid rgba(212,175,55,.22);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .mob-connect-text { flex: 1; min-width: 0; }
        .mob-connect-heading {
          font-family: 'Libre Baskerville', serif;
          font-size: 13.5px; font-weight: 700;
          color: #fff;
          margin-bottom: 3px;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .mob-connect-sub {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          color: rgba(212,175,55,.7);
          font-weight: 500;
        }
        .mob-connect-btn {
          display: inline-flex; align-items: center; gap: 6px;
          background: linear-gradient(90deg, #d4af37, #f4e5b8, #d4af37);
          background-size: 200% auto;
          animation: goldShimmer 3s linear infinite;
          border: none; border-radius: 50px;
          padding: 9px 18px;
          font-family: 'Inter', sans-serif;
          font-size: 12px; font-weight: 700;
          color: #000; cursor: pointer; flex-shrink: 0;
          transition: transform .2s ease, box-shadow .2s ease;
          box-shadow: 0 4px 16px rgba(212,175,55,.3);
        }
        .mob-connect-btn:active { transform: scale(0.96); }

        /* ════ SECTION 1 HERO ════ */
        .ngo-hero-section {
          position: relative;
          background: #000;
          padding: 20px 22px 76px;
          overflow: hidden;
          width: 100%;
        }
        .ngo-hero-section::before {
          content:'';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 50% 0%, rgba(212,175,55,.05) 0%, transparent 60%);
          pointer-events: none;
        }
        .ngo-hero-header {
          text-align: center;
          max-width: 860px;
          margin: 0 auto 48px;
          padding: 0 4px;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity .8s ease, transform .8s ease;
        }
        .ngo-hero-header.visible { opacity:1; transform:translateY(0); }
        .ngo-eyebrow-row {
          display: inline-flex; align-items: center; gap: 10px; margin-bottom: 20px;
        }
        .ngo-eyebrow-line {
          width: 36px; height: 1px;
          background: linear-gradient(to right, transparent, #d4af37);
        }
        .ngo-eyebrow-line.r { background: linear-gradient(to left, transparent, #d4af37); }
        .ngo-eyebrow-text {
          font-family: 'Inter', sans-serif;
          font-size: 11px; font-weight: 700;
          letter-spacing: .16em; color: #d4af37; text-transform: uppercase;
        }
        .ngo-hero-title {
          font-family: 'Libre Baskerville', serif;
          font-size: clamp(1.9rem, 5vw, 3.6rem);
          font-weight: 700; line-height: 1.15; color: #fff;
          margin-bottom: 16px;
        }
        .ngo-hero-title span {
          background: linear-gradient(90deg,#d4af37,#f4e5b8,#d4af37);
          background-size: 200% auto;
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: ngoShimmer 4s linear infinite;
        }
        .ngo-hero-divider {
          width: 70px; height: 3px;
          background: linear-gradient(to right, #d4af37, #f4e5b8);
          border-radius: 2px; margin: 0 auto 24px;
        }
        .ngo-hero-sub {
          font-family: 'Inter', sans-serif;
          font-size: clamp(.85rem, 2vw, 1rem);
          line-height: 1.8; color: rgba(255,255,255,.6);
          max-width: 600px; margin: 0 auto;
        }

        /* ── Grid ── */
        .ngo-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        /* ── Desktop Card ── */
        .ngo-card-anim {
          opacity: 0;
          transform: translateY(24px) scale(.97);
          transition: opacity .5s ease, transform .5s ease;
        }
        .ngo-card-anim.visible { opacity:1; transform:translateY(0) scale(1); }
        .ngo-card-outer {
          position: relative; height: 360px; border-radius: 16px;
          overflow: hidden; cursor: none; background: #0a0a0a;
          box-shadow: 0 8px 32px rgba(0,0,0,.6);
          transition: box-shadow .3s ease, transform .3s ease;
        }
        .ngo-card-inner-scroll {
          position: relative; height: 100%;
          overflow-y: auto; overflow-x: hidden; scrollbar-width: none;
        }
        .ngo-card-inner-scroll::-webkit-scrollbar { display: none; }
        .ngo-card-img-wrap { position: relative; height: auto; pointer-events: none; }
        .ngo-card-img { width:100%; height: auto; object-fit: initial; object-position:top center; display:block; user-select:none; }
        .ngo-card-grad-top {
          position: sticky; top: 0; left: 0; right: 0; height: 60px; margin-bottom: -60px;
          background: linear-gradient(to bottom,rgba(0,0,0,.6),transparent);
          pointer-events: none; z-index: 3;
        }
        .ngo-card-grad-bot {
          position: sticky; bottom: 0; left: 0; right: 0; height: 160px; margin-top: -160px;
          background: linear-gradient(to top,rgba(0,0,0,1) 0%,rgba(0,0,0,.9) 30%,rgba(0,0,0,.55) 65%,transparent 100%);
          pointer-events: none; z-index: 3;
        }
        .ngo-cat-badge {
          position: sticky; top: 12px; float: left; margin: -48px 0 0 12px;
          background: rgba(212,175,55,.92); color: #000;
          padding: 4px 13px; border-radius: 50px;
          font-size: 10px; font-weight: 700; letter-spacing: .06em;
          font-family: 'Inter', sans-serif; backdrop-filter: blur(4px); z-index: 10; clear: left;
        }
        .ngo-scroll-bar {
          position: sticky; bottom: 62px; float: right; margin: 0 10px -24px 0;
          width: 3px; height: 50px; background: rgba(255,255,255,.12);
          border-radius: 2px; overflow: hidden; z-index: 10; clear: right;
        }
        .ngo-scroll-bar-fill {
          width: 100%; height: 22%;
          background: linear-gradient(to bottom,#d4af37,#b8912a); border-radius: 2px;
        }
        .ngo-card-info {
          position: sticky; bottom: 0; padding: 12px 16px 16px; z-index: 10; pointer-events: none;
          display: flex; align-items: flex-end; justify-content: space-between;
        }
        .ngo-card-title {
          font-family: 'Libre Baskerville', serif;
          font-size: 13px; font-weight: 700; color: #fff; line-height: 1.3;
          text-shadow: 0 1px 10px rgba(0,0,0,1); transition: color .3s ease;
        }
        .ngo-card-arrow { font-size: 20px; color: #d4af37; text-shadow: 0 0 12px rgba(212,175,55,.8); flex-shrink: 0; }
        .ngo-card-outer:hover { box-shadow: 0 16px 48px rgba(212,175,55,.2); transform: translateY(-4px); }
        .ngo-card-outer::after {
          content:''; position:absolute; inset:0; border-radius:16px;
          border: 2px solid transparent;
          background: linear-gradient(135deg,rgba(212,175,55,.6),transparent 50%,rgba(212,175,55,.3)) border-box;
          -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: destination-out; mask-composite: exclude;
          opacity: 0; transition: opacity .3s ease; pointer-events: none; z-index: 20;
        }
        .ngo-card-outer:hover::after { opacity: 1; }
        .ngo-card-outer:hover .ngo-card-title { color: #f4e5b8; }
        .ngo-custom-cursor {
          position: absolute; transform: translate(-50%,-50%);
          pointer-events: none; transition: opacity .3s ease; z-index: 100;
        }
        .ngo-cursor-circle {
          width: 48px; height: 48px; border-radius: 50%;
          background: rgba(15,15,15,.8); backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 2px 20px rgba(0,0,0,.4), 0 0 0 1px rgba(212,175,55,.2);
        }

        /* ── Mobile Card ── */
        .mob-card-anim {
          transition: opacity .58s ease, transform .58s cubic-bezier(0.22,1,0.36,1);
          border-radius: 18px; overflow: hidden;
          -webkit-tap-highlight-color: transparent;
          touch-action: pan-y;
        }
        .mob-img-outer {
          position: relative; height: 300px; border-radius: 18px; overflow: hidden;
          background: #111;
          border: 2px solid rgba(212,175,55,.4);
          box-shadow: 0 10px 40px rgba(0,0,0,.7), 0 0 0 1px rgba(212,175,55,.1);
        }
        .mob-scroll-container {
          position: absolute; inset: 0;
          overflow-y: scroll; overflow-x: hidden;
          scrollbar-width: none; -webkit-overflow-scrolling: touch;
          touch-action: pan-y; cursor: pointer; z-index: 2;
        }
        .mob-scroll-container::-webkit-scrollbar { display: none; }
        .mob-img-wrap { height: auto; pointer-events: none; }
        .mob-img { width:100%; height: auto; object-fit: initial; object-position:top center; display:block; user-select:none; }
        .mob-shine {
          position: absolute; top: 0; left: -100%; bottom: 0; width: 55%;
          background: linear-gradient(105deg,transparent 20%,rgba(255,255,255,.2) 50%,transparent 80%);
          pointer-events: none; z-index: 15; opacity: 0;
        }
        .mob-shine.mob-shine-run { animation: ngoShineSweep .9s ease-out .25s forwards; }
        .mob-grad-top {
          position: absolute; top: 0; left: 0; right: 0; height: 64px;
          background: linear-gradient(to bottom,rgba(0,0,0,.6),transparent);
          pointer-events: none; z-index: 5;
        }
        .mob-grad-bot {
          position: absolute; bottom: 0; left: 0; right: 0; height: 160px;
          background: linear-gradient(to top,rgba(0,0,0,.95) 0%,rgba(0,0,0,.7) 35%,rgba(0,0,0,.2) 70%,transparent 100%);
          pointer-events: none; z-index: 5;
        }
        .mob-badge {
          position: absolute; top: 14px; left: 14px;
          background: rgba(212,175,55,.92); color: #000;
          font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: .06em;
          padding: 4px 12px; border-radius: 50px; z-index: 10; backdrop-filter: blur(4px);
        }
        .mob-hint {
          position: absolute; bottom: 54px; left: 50%; transform: translateX(-50%);
          display: flex; align-items: center; gap: 8px;
          background: rgba(0,0,0,.72); backdrop-filter: blur(10px);
          border: 1px solid rgba(212,175,55,.3); border-radius: 50px;
          padding: 5px 12px; z-index: 20; pointer-events: none;
          white-space: nowrap; transition: opacity .3s ease;
        }
        .mob-hint.mob-hint-pulse { animation: ngoHintPulse .55s ease; }
        .mob-hint-scroll, .mob-hint-dbl {
          display: flex; align-items: center; gap: 4px;
          font-family: 'Inter', sans-serif; font-size: 9.5px; font-weight: 600;
          letter-spacing: .04em; color: rgba(244,229,184,.9);
        }
        .mob-hint-divider { color: rgba(212,175,55,.5); font-size: 12px; }
        .mob-scroll-track {
          position: absolute; right: 8px; top: 14px; bottom: 14px;
          width: 3px; background: rgba(255,255,255,.12); border-radius: 2px; z-index: 10; pointer-events: none; overflow: hidden;
        }
        .mob-scroll-dot { width:100%; height:22%; background: linear-gradient(to bottom,#d4af37,#b8912a); border-radius:2px; }
        .mob-info {
          position: absolute; bottom: 0; left: 0; right: 0; padding: 12px 14px 16px;
          display: flex; align-items: flex-end; justify-content: space-between; z-index: 10; pointer-events: none;
        }
        .mob-title {
          font-family: 'Libre Baskerville', serif;
          font-size: 13px; font-weight: 700; color: #fff; line-height: 1.3;
          text-shadow: 0 1px 12px rgba(0,0,0,1); margin: 0; max-width: 78%;
        }
        .mob-arrow { font-size: 20px; color: #d4af37; text-shadow: 0 0 14px rgba(212,175,55,.9); flex-shrink: 0; line-height: 1; }

        /* ════ SECTION 2 CLOSING ════ */
        .ngo-closing-section {
          position: relative; min-height: 560px;
          display: flex; align-items: center;
          padding: 80px 24px; overflow: hidden;
          background: #000; width: 100%;
        }
        .ngo-closing-bg {
          position: absolute; inset: 0;
          background-image: url('https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ngopage.webp');
          background-size: cover; background-position: center;
          opacity: 0.35; z-index: 0;
        }
        .ngo-closing-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to right, rgba(0,0,0,.75) 0%, rgba(0,0,0,.3) 55%, rgba(0,0,0,.7) 100%);
          z-index: 1;
        }
        .ngo-closing-inner {
          position: relative; z-index: 2;
          max-width: 1200px; width: 100%;
          margin: 0 auto;
          display: flex; align-items: center; justify-content: flex-start;
        }
        .ngo-torn-card {
          position: relative;
          width: min(520px, 100%);
          padding: 48px 40px;
          background: rgba(5,5,5,.72);
          backdrop-filter: blur(10px) saturate(1.4);
          -webkit-backdrop-filter: blur(10px) saturate(1.4);
          clip-path: polygon(
            0% 0%, 100% 0%, 100% 100%, 0% 100%,
            2% 93%, 0% 86%, 3% 79%, 1% 72%, 0% 65%,
            2% 58%, 0% 50%, 3% 43%, 1% 36%, 0% 28%,
            2% 21%, 0% 14%, 3% 7%
          );
          border-right: 1px solid rgba(212,175,55,.2);
          border-top: 1px solid rgba(212,175,55,.15);
          border-bottom: 1px solid rgba(212,175,55,.15);
          animation: tornFlicker 4s ease-in-out infinite;
          opacity: 0; transform: translateX(-50px);
          transition: opacity .9s ease, transform .9s ease;
        }
        .ngo-torn-card.visible { opacity:1; transform:translateX(0); }
        .ngo-torn-card::before {
          content: '';
          position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
          background: linear-gradient(to bottom,
            transparent 0%, rgba(212,175,55,.6) 15%, rgba(212,175,55,.3) 30%,
            rgba(212,175,55,.7) 45%, rgba(212,175,55,.2) 60%,
            rgba(212,175,55,.65) 75%, rgba(212,175,55,.3) 90%, transparent 100%
          );
          filter: blur(1px);
        }
        .ngo-torn-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          margin-bottom: 20px;
          background: rgba(212,175,55,.08);
          border: 1px solid rgba(212,175,55,.22);
          border-radius: 50px; padding: 5px 14px;
        }
        .ngo-torn-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #d4af37;
          animation: ngoPulseDot 2s ease-in-out infinite;
        }
        .ngo-torn-eyebrow span {
          font-family: 'Inter', sans-serif;
          font-size: 10px; font-weight: 700;
          letter-spacing: .14em; color: #d4af37; text-transform: uppercase;
        }
        .ngo-torn-title {
          font-family: 'Libre Baskerville', serif;
          font-size: clamp(1.5rem, 3.5vw, 2.4rem);
          font-weight: 700; line-height: 1.25; color: #fff; margin-bottom: 16px;
        }
        .ngo-torn-title span {
          background: linear-gradient(90deg, #d4af37, #f4e5b8);
          -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
        }
        .ngo-torn-divider {
          width: 55px; height: 2px;
          background: linear-gradient(to right, #d4af37, transparent);
          border-radius: 2px; margin-bottom: 20px;
        }
        .ngo-torn-para {
          font-family: 'Inter', sans-serif;
          font-size: clamp(.82rem, 1.8vw, .95rem);
          font-weight: 400; line-height: 1.85;
          color: rgba(255,255,255,.68); margin-bottom: 36px;
        }
        .ngo-connect-btn {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'Inter', sans-serif;
          font-size: 14px; font-weight: 700;
          letter-spacing: .06em; color: #000;
          background: linear-gradient(90deg,#d4af37,#f4e5b8,#d4af37);
          background-size: 200% auto;
          padding: 13px 32px; border-radius: 50px;
          border: none; cursor: pointer;
          transition: all .3s ease;
          box-shadow: 0 4px 24px rgba(212,175,55,.35);
          animation: ngoShimmer 4s linear infinite;
        }
        .ngo-connect-btn:hover { transform: translateY(-2px) scale(1.04); box-shadow: 0 8px 36px rgba(212,175,55,.55); }
        .ngo-connect-btn svg { transition: transform .3s ease; }
        .ngo-connect-btn:hover svg { transform: translateX(4px); }
        .ngo-closing-particles { position:absolute; inset:0; pointer-events:none; z-index:1; }
        .ngo-c-particle {
          position: absolute; width: 2px; height: 2px; border-radius: 50%;
          background: rgba(212,175,55,.5);
          animation: ngoFloatY var(--dur,4s) ease-in-out var(--delay,0s) infinite;
        }

        /* ═══════════ RESPONSIVE ═══════════ */
        @media (max-width: 1024px) {
          .ngo-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
        
        }
        @media (max-width: 768px) {
          .ngo-hero-section  { padding-top: 110px; }
          .ngo-closing-section { padding: 60px 16px; min-height: auto; }
          .ngo-hero-header   { margin-bottom: 36px; }
          .ngo-search-bar-wrap { margin-bottom: 32px; padding: 0; }
          .ngo-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
          .ngo-card-outer { height: 300px; }
          .mob-img-outer  { height: 270px; }
          .ngo-closing-inner { justify-content: center; }
          .ngo-torn-card { padding: 36px 28px; }
        
        }
        @media (max-width: 640px) {
          .ngo-hero-section  { padding-top: 100px; padding-left: 14px; padding-right: 14px; }
          .ngo-closing-section { padding: 52px 14px; }
          .ngo-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
          .ngo-card-outer { height: 260px; }
          .ngo-card-title { font-size: 11px; }
          .mob-img-outer  { height: 240px; }
          .mob-title { font-size: 11px; }
          .ngo-eyebrow-line { width: 24px; }
          .ngo-search-bar { padding: 10px 16px; }
          .ngo-search-input { font-size: 13px; }
          .ngo-torn-card { padding: 30px 22px 30px 32px; }
          .ngo-connect-btn { padding: 12px 26px; font-size: 13px; }
          .view-more-btn { padding: 12px 24px; }
        
        }
        @media (max-width: 480px) {
          .ngo-hero-section  { padding-top: 90px; padding-left: 12px; padding-right: 12px; }
          .ngo-closing-section { padding: 48px 12px; }
          .ngo-grid { grid-template-columns: 1fr; gap: 14px; }
          .ngo-card-outer { height: 280px; cursor: pointer; }
          .ngo-custom-cursor { display: none; }
          .mob-img-outer { height: 260px; }
          .mob-title { font-size: 13px; }
          .ngo-card-title { font-size: 13px; }
          .ngo-hero-header { margin-bottom: 28px; }
          .ngo-search-bar-wrap { margin-bottom: 24px; }
          .ngo-torn-card {
            width: 100%; padding: 28px 20px 28px 30px;
            clip-path: none;
            border: 1px solid rgba(212,175,55,.25);
            border-radius: 16px;
          }
          .ngo-torn-card::before { display: none; }
          .mob-hint { bottom: 48px; padding: 4px 10px; gap: 6px; }
          .mob-hint-scroll, .mob-hint-dbl { font-size: 9px; }
          .view-more-btn { padding: 11px 20px; gap: 8px; }
        
          .mob-connect-inner { padding: 14px 16px; gap: 10px; }
          .mob-connect-heading { font-size: 12.5px; }
          .mob-connect-sub { font-size: 10px; }
          .mob-connect-btn { padding: 8px 14px; font-size: 11px; }
        }
        @media (max-width: 360px) {
          .ngo-hero-section  { padding-top: 80px; padding-left: 10px; padding-right: 10px; }
          .ngo-grid { gap: 10px; }
          .ngo-card-outer { height: 250px; }
          .mob-img-outer  { height: 230px; }
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

      <div className="ngo-page">

        {/* ════ SECTION 1 HERO + ALL PROJECTS ════ */}
        <section className="ngo-hero-section" style={{ paddingTop: '0px' }}>

          {/* The navbar spacer that used to sit here is gone: .ngo-page now
              supplies the standard opening margin (100px mobile / 120px
              desktop), so the spacer was doubling it and pushing this page's
              first heading to 199px while every other page opened at 100. */}

          <div ref={sec1Ref} className={`ngo-hero-header ${sec1Visible ? "visible" : ""}`}>

            <h1 className="ngo-hero-title">
              Our <span>NGO</span> Projects
            </h1>
            <div className="ngo-hero-divider" />
            <p className="ngo-hero-sub">
              Crafting impactful digital experiences for non-profit organisations websites that inspire
              action, build trust, and amplify every cause they stand for.
            </p>
          </div>

          {/* ── Search Bar ── */}
          <SearchBar
            query={ngoSearch}
            onChange={setNgoSearch}
            placeholder="Search projects..."
            prefix="ngo"
          />

          {/* ── Project Grid (starts directly from Popatbhai) ── */}
          {filteredProjects.length === 0 ? (
            <div className="ngo-no-results">
              No projects found for <span>"{ngoSearch}"</span>
            </div>
          ) : (
            <div className="ngo-grid">
              {displayedProjects.map((project, index) => (
                <AnimatedCard
                  key={project.title}
                  project={project}
                  index={index}
                  isVisible={sec1Visible}
                />
              ))}
            </div>
          )}

          {/* ── Desktop: View More pill button ── */}
          {!isMobile && showViewMore && (
            <ViewMoreButton
              remainingCount={remaining}
              onClick={() => setShowAll(true)}
            />
          )}

          {/* ── Mobile: Connect banner ── */}
          {showMobileConnect && (
            <MobileConnectBanner onConnect={scrollToContact} />
          )}

        </section>


        <ContactUsForm /> <br />
        <PortfolioSection />
      </div>
    </>
  );
};

export default NgoPortfolio;