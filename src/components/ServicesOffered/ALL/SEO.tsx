import { useState, useEffect, useRef } from "react";
import ServiceSection from "@/components/ServicesSection";
import ContactUsForm from "@/pages/ContactUsForm";
import SEO from "@/components/SEO";
import { pageSEO } from "@/seo/pageSEO";

const DEMO_QUERIES = [
  
  "ngo children website",
  "ngos for children",
  "ngo for anath ashram",
  "ngo for cows",
  "animal ngo in mumbai",
];

interface SearchResult {
  title: string;
  url: string;
  desc: string;
  link?: string;
  sitelinks?: string[];
}

const MOCK_RESULTS: Record<string, SearchResult[]> = {
  
  "ngo children website": [
    { title: "Nanhi Pari Foundation - NGO for Children | Education & Care", url: "nanhiparifoundation.org", desc: "Nanhi Pari Foundation works for underprivileged children providing education, healthcare and a safe environment across India.", link: "https://nanhiparifoundation.org/", sitelinks: ["Donate Now", "Our Work", "Gallery", "Contact"] },
    { title: "Child Rights NGOs in India - Give India", url: "giveindia.org › ngo › children", desc: "List of verified NGOs working for children's rights, education and welfare in India." },
    { title: "NGOs for Children - Charity Navigator India", url: "charitynavigator.org › ngo-children", desc: "Browse highly rated NGOs working for children's welfare, education and protection across India." },
  ],
  "ngos for children": [
    { title: "Nanhi Pari Foundation - Dedicated NGO for Children's Education", url: "nanhiparifoundation.org", desc: "We believe every child deserves a chance. Join us in transforming lives through education, nutrition and healthcare programs.", link: "https://nanhiparifoundation.org/", sitelinks: ["Volunteer", "Donate", "Programs", "Stories"] },
    { title: "Best NGOs Working for Children in India - The Better India", url: "thebetterindia.com › ngos-for-children", desc: "Top NGOs making a real difference for children in India through education, healthcare and protection." },
    { title: "Donate to Children NGOs India - Impact Guru", url: "impactguru.com › children-ngo", desc: "Support verified NGOs working for underprivileged children. 100% transparent fund utilisation." },
  ],
  "ngo for anath ashram": [
    { title: "Popatbhai Charitable Foundation - Anath Ashram NGO India", url: "popatbhaicharitablefoundation.org", desc: "Popatbhai Charitable Foundation runs orphanages and anath ashrams across India providing shelter, education and care to orphans.", link: "https://popatbhaicharitablefoundation.org/", sitelinks: ["Donate", "Our Ashrams", "Children", "About Us"] },
    { title: "Best NGOs Running Orphanages in India - Impact Guru", url: "impactguru.com › ngo-orphanage-india", desc: "Support verified NGOs running orphanages across India. Transparent fund usage and impact reports." },
    { title: "Anath Ashram NGOs - Give India", url: "giveindia.org › anath-ashram", desc: "Donate to verified anath ashrams and orphanage NGOs helping orphan children across India." },
  ],
  "ngo for cows": [
    { title: "Gau Seva Dham - Leading NGO for Cow Protection & Care in India", url: "gausevadham.org", desc: "Gau Seva Dham is India's most trusted NGO dedicated to cow rescue, Gau Shala management and cow protection awareness.", link: "https://gausevadham.org/", sitelinks: ["Donate", "Adopt a Cow", "Gau Shala", "Volunteer"] },
    { title: "Cow Protection NGOs India - Animal Welfare Board", url: "awbi.in › cow-protection-ngo", desc: "Registered NGOs working for cow welfare and protection across India under Animal Welfare Board." },
    { title: "Best Gau Seva NGOs in India - The Better India", url: "thebetterindia.com › gau-seva-ngo", desc: "Discover India's best organisations working tirelessly for the protection and care of cows." },
  ],
  "animal ngo in mumbai": [
    { title: "Animal Matter To Me (AMTM) - Animal NGO Mumbai | Rescue & Rehab", url: "amtmindia.org", desc: "AMTM is Mumbai's premier animal welfare NGO. We rescue, rehabilitate and rehome stray and injured animals across the city.", link: "https://amtmindia.org/", sitelinks: ["Adopt", "Donate", "Volunteer", "Report Animal"] },
    { title: "Top 5 Animal NGOs in Mumbai - The Better India", url: "thebetterindia.com › animal-ngos-mumbai", desc: "Discover Mumbai's best animal welfare organizations working tirelessly for street and shelter animals." },
    { title: "Animal Rescue NGOs Mumbai - Give India", url: "giveindia.org › animal-ngo-mumbai", desc: "Support verified animal welfare NGOs in Mumbai. Help rescue and rehome stray and injured animals." },
  ],
};

type AutoPhase = "typing" | "results" | "opening" | "erasing";
const CHROME_BAR_H = 44;
const GOOGLE_PAGE_H = 680;
const SHELL_TOTAL_H = CHROME_BAR_H + GOOGLE_PAGE_H;

const LiveGoogleCard = () => {
  const [displayText, setDisplayText] = useState("");
  const [queryIndex, setQueryIndex] = useState(0);
  const [phase, setPhase] = useState<AutoPhase>("typing");
  const [showResults, setShowResults] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [isUserMode, setIsUserMode] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentQuery = DEMO_QUERIES[queryIndex % DEMO_QUERIES.length];
  const activeQuery = isUserMode ? userInput : displayText;
  const currentResults = MOCK_RESULTS[currentQuery] || [];
  const displayResults = (isUserMode ? MOCK_RESULTS[userInput] : null) || currentResults;

  const clearTimer = () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };

  useEffect(() => {
    if (isUserMode) return;
    clearTimer();
    if (phase === "typing") {
      if (displayText.length < currentQuery.length) {
        timeoutRef.current = setTimeout(() => { setDisplayText(currentQuery.slice(0, displayText.length + 1)); }, 65 + Math.random() * 35);
      } else {
        setShowResults(true);
        timeoutRef.current = setTimeout(() => setPhase("opening"), 1400);
      }
    }
    if (phase === "opening") {
      setIsOpening(true);
      timeoutRef.current = setTimeout(() => { setIsOpening(false); setPhase("erasing"); }, 1800);
    }
    if (phase === "erasing") {
      if (displayText.length > 0) {
        timeoutRef.current = setTimeout(() => setDisplayText((t) => t.slice(0, -1)), 22);
      } else {
        setShowResults(false);
        setQueryIndex((q) => (q + 1) % DEMO_QUERIES.length);
        setPhase("typing");
      }
    }
    return clearTimer;
  }, [displayText, phase, currentQuery, isUserMode]);

  useEffect(() => {
    if (!isUserMode || userInput.length < 2) { setSuggestions([]); return; }
    const q = userInput.toLowerCase();
    setSuggestions(DEMO_QUERIES.filter((d) => d.includes(q)).slice(0, 4));
  }, [userInput, isUserMode]);

  const handleSearch = (query?: string) => {
    const q = (query ?? (isUserMode ? userInput : displayText)).trim();
    if (q) window.open(`https://www.google.com/search?q=${encodeURIComponent(q)}`, "_blank", "noopener,noreferrer");
  };

  const openResultLink = (result: SearchResult, index: number) => {
    if (index === 0 && result.link) window.open(result.link, "_blank", "noopener,noreferrer");
    else handleSearch();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
    setIsUserMode(true);
    setShowResults(e.target.value.length > 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
    if (e.key === "Escape") resumeAuto();
  };

  const resumeAuto = () => {
    setIsUserMode(false); setUserInput(""); setShowResults(false);
    setIsFocused(false); setSuggestions([]);
    setDisplayText(""); setPhase("typing"); setIsOpening(false);
  };

  const pickSuggestion = (s: string) => { setUserInput(s); setSuggestions([]); handleSearch(s); };

  return (
    <div style={{ maxWidth: 1500, margin: "0 auto 56px", padding: "0 20px" }}>
      <div style={{ textAlign: "center", marginBottom: 22 }}>
        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.4em", textTransform: "uppercase" as const, color: "var(--gold)", fontFamily: "'Inter', sans-serif" }}>Live Google Demo</span>
        <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(20px, 2.8vw, 28px)", fontWeight: 700, color: "var(--white)", marginTop: 8, marginBottom: 8 }}>See Our Clients Rank - Right Now</h3>
        <p style={{ fontSize: 13, fontWeight: 300, color: "rgba(245,240,232,0.5)", fontFamily: "'Inter', sans-serif", lineHeight: 1.6 }}>Auto-searching every keyword and cycling through all 7 clients continuously.</p>
      </div>

      <div style={{ height: SHELL_TOTAL_H, minHeight: SHELL_TOTAL_H, maxHeight: SHELL_TOTAL_H, overflow: "hidden", borderRadius: 14, border: `1px solid ${isOpening ? "rgba(201,168,76,0.7)" : "rgba(201,168,76,0.28)"}`, boxShadow: isOpening ? "0 0 40px rgba(201,168,76,0.2), 0 24px 64px rgba(0,0,0,0.55)" : "0 24px 64px rgba(0,0,0,0.55)", transition: "border-color 0.3s, box-shadow 0.4s", display: "flex", flexDirection: "column" }}>
        <div style={{ height: CHROME_BAR_H, minHeight: CHROME_BAR_H, maxHeight: CHROME_BAR_H, flexShrink: 0, background: "#1f1f1f", padding: "0 16px", display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid rgba(201,168,76,0.12)" }}>
          <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
            {["#FF5F56", "#FFBD2E", "#27C93F"].map((c, i) => (<div key={i} style={{ width: 11, height: 11, borderRadius: "50%", background: c, opacity: 0.85 }} />))}
          </div>
          <div style={{ flex: 1, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "5px 13px", display: "flex", alignItems: "center", gap: 7, minWidth: 0 }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}><rect x="3" y="11" width="18" height="11" rx="2" stroke="rgba(201,168,76,0.55)" strokeWidth="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="rgba(201,168,76,0.55)" strokeWidth="2" /></svg>
            <span style={{ fontSize: 11, color: isOpening ? "rgba(201,168,76,0.9)" : "rgba(245,240,232,0.4)", fontFamily: "monospace", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", transition: "color 0.3s" }}>{`google.com/search?q=${activeQuery ? encodeURIComponent(activeQuery) : "..."}`}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, fontWeight: 600, color: isOpening ? "#C9A84C" : "#4ade80", letterSpacing: "0.07em", textTransform: "uppercase" as const, fontFamily: "'Inter', sans-serif", flexShrink: 0, transition: "color 0.3s" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: isOpening ? "#C9A84C" : "#4ade80", display: "inline-block", transition: "background 0.3s" }} />
            {isOpening ? "Ranking…" : "Live"}
          </div>
        </div>

        <div style={{ flex: 1, height: GOOGLE_PAGE_H, minHeight: GOOGLE_PAGE_H, maxHeight: GOOGLE_PAGE_H, overflow: "hidden", background: "#fff", padding: "24px 28px", boxSizing: "border-box" }}>
          <div style={{ textAlign: "center", marginBottom: 20, fontSize: 36, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1, userSelect: "none" as const }}>
            <span style={{ color: "#4285F4" }}>G</span><span style={{ color: "#EA4335" }}>o</span>
            <span style={{ color: "#FBBC04" }}>o</span><span style={{ color: "#4285F4" }}>g</span>
            <span style={{ color: "#34A853" }}>l</span><span style={{ color: "#EA4335" }}>e</span>
          </div>

          <div style={{ position: "relative", marginBottom: 4 }}>
            <div style={{ display: "flex", alignItems: "center", border: isFocused ? "1px solid #4285F4" : "1px solid #dfe1e5", borderRadius: 24, boxShadow: isFocused ? "0 1px 6px rgba(32,33,36,0.25)" : "0 1px 3px rgba(0,0,0,0.08)", padding: "10px 16px", background: "#fff", gap: 10, transition: "border 0.2s, box-shadow 0.2s" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}><circle cx="11" cy="11" r="7" stroke="#9AA0A6" strokeWidth="2" /><path d="M20 20L16.5 16.5" stroke="#9AA0A6" strokeWidth="2" strokeLinecap="round" /></svg>
              <div style={{ flex: 1, position: "relative", height: 24, overflow: "hidden" }}>
                {!isUserMode && (
                  <div style={{ position: "absolute", inset: 0, fontSize: 16, color: "#202124", fontFamily: "Arial, sans-serif", display: "flex", alignItems: "center", pointerEvents: "none", whiteSpace: "nowrap" }}>
                    {displayText}
                    <span style={{ display: "inline-block", width: 2, height: 18, background: "#4285F4", marginLeft: 1, flexShrink: 0, animation: "blink 0.85s step-end infinite" }} />
                  </div>
                )}
                <input ref={inputRef} type="text" value={isUserMode ? userInput : ""} onChange={handleInputChange} onKeyDown={handleKeyDown} onFocus={() => setIsFocused(true)} onBlur={() => setTimeout(() => { setIsFocused(false); setSuggestions([]); }, 180)} style={{ position: "absolute", inset: 0, background: "transparent", border: "none", outline: "none", fontSize: 16, color: isUserMode ? "#202124" : "transparent", fontFamily: "Arial, sans-serif", width: "100%", cursor: "text" }} />
              </div>
              {isUserMode && userInput && (<button onClick={resumeAuto} style={{ background: "none", border: "none", cursor: "pointer", color: "#9AA0A6", fontSize: 20, padding: "0 2px", lineHeight: 1, flexShrink: 0 }} title="Clear & resume demo">×</button>)}
              <div style={{ width: 1, height: 24, background: "#dfe1e5", flexShrink: 0 }} />
              <button onClick={() => handleSearch()} style={{ background: "none", border: "none", cursor: "pointer", padding: "0 2px", flexShrink: 0, lineHeight: 1 }} title="Search on Google">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="#4285F4" strokeWidth="2.2" /><path d="M20 20L16.5 16.5" stroke="#4285F4" strokeWidth="2.2" strokeLinecap="round" /></svg>
              </button>
            </div>
            {isFocused && suggestions.length > 0 && (
              <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, zIndex: 20, background: "#fff", border: "1px solid #dfe1e5", borderRadius: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.15)", overflow: "hidden" }}>
                {suggestions.map((s, i) => (
                  <div key={i} onMouseDown={() => pickSuggestion(s)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 16px", cursor: "pointer", borderBottom: i < suggestions.length - 1 ? "1px solid #f1f3f4" : "none", fontSize: 14, fontFamily: "Arial, sans-serif", color: "#202124", background: "#fff" }} onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "#f8f9fa"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "#fff"; }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}><circle cx="11" cy="11" r="7" stroke="#BDC1C6" strokeWidth="2" /><path d="M20 20L16.5 16.5" stroke="#BDC1C6" strokeWidth="2" strokeLinecap="round" /></svg>
                    {s}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 18 }}>
            {["Google Search", "I'm Feeling Lucky"].map((label, i) => (
              <button key={i} onClick={() => handleSearch()} style={{ background: "#f8f9fa", border: "1px solid #f8f9fa", borderRadius: 4, padding: "8px 16px", fontSize: 13, color: "#3c4043", cursor: "pointer", fontFamily: "Arial, sans-serif" }} onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.border = "1px solid #dadce0"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 1px 2px rgba(0,0,0,0.1)"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.border = "1px solid #f8f9fa"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "none"; }}>{label}</button>
            ))}
          </div>

          <div style={{ borderTop: "1px solid #ebebeb", marginBottom: 14 }} />
          <div style={{ fontSize: 13, color: "#70757a", fontFamily: "Arial, sans-serif", marginBottom: 14, height: 18, overflow: "hidden" }}>
            {showResults && `About ${(Math.floor(Math.random() * 80) + 20).toLocaleString()},000,000 results (0.${Math.floor(Math.random() * 50) + 20} seconds)`}
          </div>

          <div style={{ height: 400, overflow: "hidden" }}>
            {showResults && displayResults.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {displayResults.map((result, i) => (
                  <div key={i} onClick={() => openResultLink(result, i)} style={{ cursor: "pointer", animation: `fadeUp 0.4s ease ${i * 0.08}s both`, outline: i === 0 && isOpening ? "2px solid rgba(201,168,76,0.55)" : "none", borderRadius: i === 0 && isOpening ? 8 : 0, background: i === 0 && isOpening ? "rgba(201,168,76,0.04)" : "transparent", padding: i === 0 && isOpening ? "6px 8px" : "0", transition: "background 0.3s, outline 0.3s, padding 0.2s" }}>
                    {i === 0 && (
                      <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: isOpening ? "rgba(201,168,76,0.18)" : "rgba(201,168,76,0.1)", border: `1px solid ${isOpening ? "rgba(201,168,76,0.6)" : "rgba(201,168,76,0.35)"}`, borderRadius: 4, padding: "2px 9px", fontSize: 11, fontWeight: 600, color: "#b8860b", fontFamily: "'Inter', sans-serif", letterSpacing: "0.04em", marginBottom: 5, transition: "background 0.3s, border-color 0.3s" }}>
                        {isOpening ? "★ Ranked #1 — Our Client" : "★ Our Client — Rank #1"}
                      </div>
                    )}
                    <div style={{ fontSize: 13, color: "#202124", fontFamily: "Arial, sans-serif", marginBottom: 2, display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 18, height: 18, borderRadius: 2, background: "#f1f3f4", border: "1px solid #dfe1e5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#5f6368" strokeWidth="2.5" /></svg>
                      </div>
                      <span style={{ fontSize: 12, color: "#202124" }}>{result.url.split(" ›")[0]}{result.url.includes("›") && ` › ${result.url.split(" › ").slice(1).join(" › ")}`}</span>
                    </div>
                    <div style={{ fontSize: 18, color: "#1a0dab", fontFamily: "Arial, sans-serif", fontWeight: i === 0 ? 500 : 400, lineHeight: 1.35, marginBottom: 3, borderLeft: i === 0 ? "3px solid rgba(201,168,76,0.6)" : "none", paddingLeft: i === 0 ? 8 : 0 }}>{result.title}</div>
                    <div style={{ fontSize: 13, color: "#4d5156", fontFamily: "Arial, sans-serif", lineHeight: 1.55 }}>{result.desc}</div>
                    {i === 0 && result.sitelinks && (
                      <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 6, marginTop: 8 }}>
                        {result.sitelinks.map((sl, j) => (
                          <div key={j} onClick={(e) => { e.stopPropagation(); if (result.link) window.open(result.link, "_blank", "noopener,noreferrer"); }} style={{ border: "1px solid #dadce0", borderRadius: 8, padding: "5px 12px", fontSize: 12, color: "#1a0dab", fontFamily: "Arial, sans-serif", cursor: "pointer", background: "#fff" }} onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "#f8f9fa"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "#fff"; }}>{sl}</div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div onClick={() => handleSearch()} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", padding: "10px 14px", background: "#f8f9fa", borderRadius: 8, border: "1px solid #dadce0" }} onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "#f1f3f4"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "#f8f9fa"; }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="#4285F4" strokeWidth="2" /><path d="M20 20L16.5 16.5" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" /></svg>
                  <span style={{ fontSize: 13, color: "#1a73e8", fontFamily: "Arial, sans-serif", fontWeight: 500 }}>View full results on Google →</span>
                </div>
              </div>
            )}
            {!showResults && (
              <div style={{ textAlign: "center", padding: "28px 0", color: "#9aa0a6", fontSize: 13, fontFamily: "Arial, sans-serif" }}>Searching for "<strong style={{ color: "#5f6368" }}>{displayText || "..."}</strong>"</div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
};

interface ServiceItemProps {
  svc: { num: string; title: string; sub: string; items: string[] };
  index: number;
  isVisible: boolean;
  refSetter: (el: HTMLElement | null) => void;
  id: string;
}

const ServiceItem = ({ svc, index, isVisible, refSetter, id }: ServiceItemProps) => {
  const [open, setOpen] = useState(index === 0);
  return (
    <div id={id} ref={refSetter} className={`service-item${open ? " open" : ""}${isVisible ? " visible" : ""}`} style={{ transitionDelay: `${index * 0.08}s` }}>
      <div className="service-header" onClick={() => setOpen(!open)}>
        <span className="service-num">{svc.num}</span>
        <span className="service-name">{svc.title}</span>
        <span className="service-toggle">+</span>
      </div>
      <div className="service-body">
        <p className="service-sub">{svc.sub}</p>
        <ul className="service-bullets">{svc.items.map((item, j) => <li key={j}>{item}</li>)}</ul>
      </div>
    </div>
  );
};

const SEOSection = () => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const refs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { setVisibleSections((prev) => new Set([...prev, entry.target.id])); } }); },
      { threshold: 0.1 }
    );
    Object.values(refs.current).forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const setRef = (id: string) => (el: HTMLElement | null) => { refs.current[id] = el; };
  const isVisible = (id: string) => visibleSections.has(id);

  const services = [
    { num: "01", title: "Technical SEO", sub: "Make sure search engines can actually read and trust your site.", items: ["Site structure, crawlability and index coverage", "Core Web Vitals: speed, responsiveness, mobile experience", "Clean URLs, redirects, canonical tags and sitemap setup", "Security & HTTPS checks"] },
    { num: "02", title: "On-Page SEO", sub: "Every page built to rank for something specific and convert someone specific.", items: ["Keyword & intent mapping for each page", "SEO-optimized titles, meta descriptions and headings", "Content structure that answers real user questions", "Internal linking to push authority to important pages"] },
    { num: "03", title: "Content & Authority", sub: "Show search engines you're not just shouting; you know what you're talking about.", items: ["Topic clusters & blog strategy for your industry", "Long-form content, FAQs, guides and resources", "Case studies, testimonials and proof-driven pages", "Schema / rich snippets where relevant (FAQ, how-to, local, etc.)"] },
    { num: "04", title: "Off-Page & Trust Signals", sub: 'Build signals outside your website that say: "this brand is real and established".', items: ["Backlink strategy from relevant, safe websites", "Local SEO optimization (GMB, citations, reviews) where applicable", "Brand search optimization (people searching your name + services)"] },
    { num: "05", title: "Measurement & Growth", sub: "If we can't measure, we don't pretend.", items: ["Analytics & Search Console setup and dashboards", "Keyword ranking tracking for priority terms", "Monthly reports with traffic, leads, conversions and next actions"] },
  ];

  const growth = [
    { icon: "◈", title: "Compounding Traffic Growth", body: "Every optimized page you publish keeps working for you month after month, bringing in new visitors without extra ad spend." },
    { icon: "◎", title: "High-Intent Visitors", body: "People who search on Google already have a problem or need. Good SEO puts you in front of them at the exact decision moment." },
    { icon: "◇", title: "Lower Cost Per Acquisition", body: "Once the foundations are set, each lead / donation / sale from organic traffic becomes cheaper than paid ads over time." },
  ];

  const proofScreenshots = [
    
    { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/seo3.webp", query: "ngos for children", rank: 1, client: "Nanhi Pari Foundation", highlightTop: 20 },
    { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/seo4.webp", query: "ngo for anath ashram", rank: 1, client: "Popatbhai Charitable Foundation", highlightTop: 22 },
    { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/seo5.webp", query: "ngo for cows", rank: 1, client: "Gau Seva Dham", highlightTop: 20 },
    { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/seo6.webp", query: "animal ngo in mumbai", rank: 1, client: "Animal Matter To Me (AMTM)", highlightTop: 38 },
    { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/seo7.webp", query: "best digital marketing agency in pune", rank: 1, client: "Govindani Infotech Pvt. Ltd.", highlightTop: 26 },
  ];

  return (
    <>
      <SEO {...pageSEO.seo} />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root { --black: #080808; --black-2: #111111; --black-3: #1a1a1a; --cream: #F5F0E8; --cream-2: #EDE8DC; --white: #FAFAF8; --gold: #C9A84C; --gold-light: #E4C97E; --gold-line: rgba(201,168,76,0.3); --text-muted: rgba(245,240,232,0.45); }
        .seo-root { background: var(--black); color: var(--cream); font-family: 'Inter', sans-serif; overflow-x: hidden; }
        .hero { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: clamp(100px, 8vw, 120px) 20px clamp(48px, 5vw, 64px); overflow: hidden; }
        .hero-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px); background-size: 60px 60px; mask-image: radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 100%); }
        .hero-orb { position: absolute; width: 600px; height: 600px; border-radius: 50%; background: radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%); top: 50%; left: 50%; transform: translate(-50%, -50%); pointer-events: none; }
        .hero-label { font-size: 11px; font-weight: 500; letter-spacing: 0.35em; text-transform: uppercase; color: var(--gold); margin-bottom: 20px; opacity: 0; animation: fadeUp 0.8s ease 0.2s forwards; position: relative; }
        .hero-title { font-family: 'Libre Baskerville', serif; font-size: clamp(36px, 6vw, 80px); font-weight: 700; line-height: 1.08; color: var(--white); max-width: 860px; opacity: 0; animation: fadeUp 0.9s ease 0.4s forwards; position: relative; }
        .hero-title em { font-style: italic; color: var(--gold-light); }
        .hero-line { width: 50px; height: 1px; background: var(--gold); margin: 24px auto; opacity: 0; animation: scaleIn 0.6s ease 0.9s forwards; transform-origin: center; position: relative; }
        .hero-sub { font-size: clamp(15px, 1.8vw, 18px); font-weight: 300; color: var(--cream-2); max-width: 580px; line-height: 1.75; opacity: 0; animation: fadeUp 0.8s ease 1s forwards; position: relative; }
        .proof-section { padding: 48px 20px; max-width: 1200px; margin: 0 auto; width: 100%; }
        .proof-header { text-align: center; margin-bottom: 40px; }
        .proof-subtitle { font-size: 14px; font-weight: 300; color: var(--cream-2); line-height: 1.75; max-width: 600px; margin: 0 auto; }
        .proof-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
        .proof-sc-card { position: relative; border: 1px solid var(--gold-line); border-radius: 14px; overflow: visible; opacity: 0; transform: translateY(28px); transition: opacity 0.6s ease, transform 0.6s ease, border-color 0.3s ease, box-shadow 0.3s ease; background: var(--black-2); }
        .proof-sc-card.visible { opacity: 1; transform: translateY(0); }
        .proof-sc-card:hover { border-color: rgba(201,168,76,0.55); box-shadow: 0 8px 40px rgba(0,0,0,0.5); }
        .proof-rank-pill { position: absolute; top: -14px; right: 16px; z-index: 10; display: flex; align-items: center; gap: 6px; padding: 5px 13px 5px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; box-shadow: 0 4px 20px rgba(0,0,0,0.4); transform: scale(0) rotate(-8deg); opacity: 0; transition: transform 0.45s cubic-bezier(0.175,0.885,0.32,1.275), opacity 0.3s ease; transition-delay: 0.35s; }
        .proof-sc-card.visible .proof-rank-pill { transform: scale(1) rotate(0deg); opacity: 1; }
        .proof-rank-pill.rank-1 { background: var(--gold); color: var(--black); }
        .proof-rank-pill.rank-2 { background: #b0b8c8; color: #0a0a0a; }
        .proof-rank-pill.rank-3 { background: #c08050; color: #0a0a0a; }
        .proof-sc-header { background: var(--black-3); border-radius: 14px 14px 0 0; border-bottom: 1px solid var(--gold-line); padding: 10px 12px; display: flex; align-items: center; gap: 8px; }
        .proof-sc-glogo { font-size: 14px; font-weight: 700; letter-spacing: -0.02em; flex-shrink: 0; line-height: 1; }
        .proof-sc-glogo span:nth-child(1){color:#4285F4} .proof-sc-glogo span:nth-child(2){color:#EA4335} .proof-sc-glogo span:nth-child(3){color:#FBBC04} .proof-sc-glogo span:nth-child(4){color:#4285F4} .proof-sc-glogo span:nth-child(5){color:#34A853} .proof-sc-glogo span:nth-child(6){color:#EA4335}
        .proof-sc-bar { flex: 1; background: rgba(255,255,255,0.05); border: 1px solid rgba(201,168,76,0.18); border-radius: 20px; padding: 5px 12px; display: flex; align-items: center; gap: 7px; min-width: 0; }
        .proof-sc-bar-text { font-size: 11px; color: rgba(245,240,232,0.65); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .proof-sc-imgwrap { position: relative; overflow: hidden; line-height: 0; }
        .proof-sc-img { width: 100%; height: 210px; object-fit: initial; object-position: top; display: block; }
        .proof-highlight-box { position: absolute; left: 5%; right: 5%; height: 22%; border: 2px solid var(--gold); border-radius: 6px; background: transparent; pointer-events: none; animation: highlightGlow 2.5s ease-in-out infinite; opacity: 0; transition: opacity 0.5s ease 0.6s; }
        .proof-sc-card.visible .proof-highlight-box { opacity: 1; }
        @keyframes highlightGlow { 0%,100%{box-shadow:0 0 14px rgba(201,168,76,0.55)} 50%{box-shadow:0 0 28px rgba(201,168,76,0.9)} }
        .proof-highlight-bar { position: absolute; left: 5%; width: 4px; height: 22%; background: var(--gold); border-radius: 4px; box-shadow: 0 0 10px rgba(201,168,76,0.7); opacity: 0; transition: opacity 0.5s ease 0.65s; }
        .proof-sc-card.visible .proof-highlight-bar { opacity: 1; }
        .proof-arrow-wrap { position: absolute; left: 5px; display: flex; align-items: center; gap: 4px; opacity: 0; transition: opacity 0.5s ease 0.75s; pointer-events: none; }
        .proof-sc-card.visible .proof-arrow-wrap { opacity: 1; }
        .proof-arrow-wrap svg { animation: arrowBounce 1.1s ease-in-out infinite; filter: drop-shadow(0 0 6px rgba(201,168,76,0.6)); }
        @keyframes arrowBounce { 0%,100%{transform:translateX(0)} 50%{transform:translateX(5px)} }
        .proof-sc-footer { padding: 11px 14px; background: var(--black-3); border-top: 1px solid var(--gold-line); border-radius: 0 0 14px 14px; display: flex; align-items: center; justify-content: space-between; gap: 8px; }
        .proof-sc-client { font-family: 'Libre Baskerville', serif; font-size: 12px; font-weight: 700; color: var(--white); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .proof-sc-live { flex-shrink: 0; display: flex; align-items: center; gap: 5px; font-size: 10px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; color: #4ade80; }
        .proof-live-dot { width: 6px; height: 6px; border-radius: 50%; background: #4ade80; animation: livePulse 1.5s ease-in-out infinite; flex-shrink: 0; }
        @keyframes livePulse { 0%,100%{opacity:1;transform:scale(1);box-shadow:0 0 0 0 rgba(74,222,128,0.4)} 50%{opacity:0.8;transform:scale(1.1);box-shadow:0 0 0 4px rgba(74,222,128,0)} }
        .proof-grid .proof-sc-card:last-child:nth-child(3n+1) { grid-column: 1/-1; max-width: 420px; margin: 0 auto; }
        .why-strip { padding: 48px 20px; max-width: 1200px; margin: 0 auto; width: 100%; }
        .section-eyebrow { font-size: 10px; font-weight: 600; letter-spacing: 0.4em; text-transform: uppercase; color: var(--gold); margin-bottom: 10px; display: block; }
        .section-title { font-family: 'Libre Baskerville', serif; font-size: clamp(24px, 3.5vw, 42px); font-weight: 700; color: var(--white); line-height: 1.15; margin-bottom: 32px; max-width: 520px; }
        .growth-grid { display: grid; grid-template-columns: repeat(3, 1fr); border: 1px solid var(--gold-line); }
        .growth-card { padding: 32px 28px; background: var(--black-2); border-right: 1px solid var(--gold-line); position: relative; overflow: hidden; opacity: 0; transform: translateY(20px); transition: opacity 0.7s ease, transform 0.7s ease, background 0.3s ease; }
        .growth-card:last-child { border-right: none; }
        .growth-card:hover { background: var(--black-3); }
        .growth-card::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, var(--gold), transparent); opacity: 0; transition: opacity 0.3s ease; }
        .growth-card:hover::after { opacity: 1; }
        .growth-card.visible { opacity: 1; transform: translateY(0); }
        .card-icon { font-size: 22px; color: var(--gold); margin-bottom: 14px; display: block; }
        .card-title { font-family: 'Libre Baskerville', serif; font-size: 17px; font-weight: 700; color: var(--white); margin-bottom: 8px; line-height: 1.3; }
        .card-body { font-size: 13px; font-weight: 300; color: var(--cream-2); line-height: 1.75; }
        .system-section { padding: 48px 20px; background: var(--black-2); position: relative; overflow: hidden; }
        .system-section::before { content: 'SEO'; position: absolute; right: -40px; top: 50%; transform: translateY(-50%) rotate(90deg); font-family: 'Libre Baskerville', serif; font-size: 180px; font-weight: 700; color: rgba(201,168,76,0.025); pointer-events: none; letter-spacing: -0.05em; }
        .system-inner { max-width: 1200px; margin: 0 auto; width: 100%; }
        .system-header { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: end; margin-bottom: 40px; }
        .system-sub { font-size: 14px; font-weight: 300; color: var(--text-muted); line-height: 1.8; padding-top: 14px; border-top: 1px solid var(--gold-line); align-self: end; }
        .service-list { border-top: 1px solid var(--gold-line); }
        .service-item { border-bottom: 1px solid var(--gold-line); opacity: 0; transform: translateX(-14px); transition: opacity 0.5s ease, transform 0.5s ease; }
        .service-item.visible { opacity: 1; transform: translateX(0); }
        .service-header { display: grid; grid-template-columns: 64px 1fr auto; align-items: center; gap: 16px; padding: 24px 0; cursor: pointer; user-select: none; }
        .service-num { font-family: 'Libre Baskerville', serif; font-size: 12px; color: var(--gold); letter-spacing: 0.1em; }
        .service-name { font-family: 'Libre Baskerville', serif; font-size: clamp(16px, 2vw, 22px); font-weight: 700; color: var(--white); line-height: 1.2; }
        .service-toggle { width: 30px; height: 30px; border: 1px solid var(--gold-line); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--gold); font-size: 17px; flex-shrink: 0; transition: all 0.3s ease; font-weight: 300; line-height: 1; }
        .service-item.open .service-toggle { background: var(--gold); color: var(--black); border-color: var(--gold); transform: rotate(45deg); }
        .service-body { display: none; padding: 0 0 24px 80px; }
        .service-item.open .service-body { display: block; }
        .service-sub { font-size: 13px; font-weight: 300; color: var(--text-muted); margin-bottom: 14px; font-style: italic; line-height: 1.7; }
        .service-bullets { list-style: none; display: flex; flex-direction: column; gap: 9px; }
        .service-bullets li { font-size: 13px; font-weight: 400; color: var(--cream-2); padding-left: 16px; position: relative; line-height: 1.6; }
        .service-bullets li::before { content: '—'; position: absolute; left: 0; color: var(--gold); font-size: 11px; }
        .core-section { padding: 48px 20px 32px; max-width: 860px; margin: 0 auto; text-align: center; }
        .core-quote-mark { font-family: 'Libre Baskerville', serif; font-size: 90px; line-height: 0.5; color: var(--gold); opacity: 0.12; display: block; margin-bottom: 24px; }
        .core-message { font-family: 'Libre Baskerville', serif; font-size: clamp(17px, 2.2vw, 26px); font-weight: 400; line-height: 1.7; color: var(--cream); font-style: italic; }
        .core-message strong { font-style: normal; font-weight: 700; color: var(--white); position: relative; }
        .core-message strong::after { content: ''; position: absolute; bottom: -2px; left: 0; right: 0; height: 1px; background: var(--gold); }
        .core-divider { width: 36px; height: 1px; background: var(--gold); margin: 36px auto 0; }

        @media (max-width: 1024px) { .proof-grid{grid-template-columns:repeat(2,1fr)} .proof-grid .proof-sc-card:last-child:nth-child(3n+1){grid-column:auto;max-width:none;margin:0} .proof-grid .proof-sc-card:last-child:nth-child(odd){grid-column:1/-1;max-width:420px;margin:0 auto} }
        @media (max-width: 768px) { .hero{padding:clamp(80px,10vw,100px) 16px clamp(32px,5vw,48px)} .proof-section{padding:32px 16px} .proof-grid{grid-template-columns:1fr;gap:28px} .proof-grid .proof-sc-card:last-child:nth-child(3n+1){grid-column:auto;max-width:none;margin:0} .why-strip{padding:32px 16px;margin:0;max-width:100%} .system-section{padding:32px 16px} .core-section{padding:32px 16px 20px;max-width:100%;margin:0} .section-title{margin-bottom:20px} .growth-grid{grid-template-columns:1fr} .growth-card{border-right:none;border-bottom:1px solid var(--gold-line);padding:24px 20px} .growth-card:last-child{border-bottom:none} .system-header{grid-template-columns:1fr;gap:12px;margin-bottom:24px} .service-header{grid-template-columns:44px 1fr auto;gap:8px;padding:16px 0} .service-body{padding:0 0 16px 52px} .service-num{font-size:11px} .hero-orb{width:320px;height:320px} }

        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes scaleIn { from{opacity:0;transform:scaleX(0)} to{opacity:1;transform:scaleX(1)} }
      `}</style>

      <div className="seo-root">
        <section className="hero">
          <div className="hero-grid" />
          <div className="hero-orb" />
          <span className="hero-label">Search Engine Optimisation</span>
          <h1 className="hero-title">SEO That Turns Search Traffic Into <em>Real Business</em></h1>
          <div className="hero-line" />
          <p className="hero-sub">SEO isn't about ranking for random keywords. It's about owning the searches that bring you donors, buyers, bookings and serious inquiries.</p>
        </section>

        <LiveGoogleCard />

        <section className="proof-section" id="proof" ref={setRef("proof")}>
          <div className="proof-header">
            <span className="section-eyebrow">Proven Results</span>
            <h2 className="section-title" style={{ maxWidth: 640, margin: "0 auto 14px" }}>Our Clients Rank Where It Matters</h2>
            <p className="proof-subtitle">Real keywords. Real rankings. Here's what it looks like when SEO actually works — your brand sitting at the top of Google, right where your customers are searching.</p>
          </div>
          <div className="proof-grid">
            {proofScreenshots.map((shot, i) => (
              <div key={i} id={`proof-${i}`} ref={setRef(`proof-${i}`)} className={`proof-sc-card${isVisible(`proof-${i}`) ? " visible" : ""}`} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className={`proof-rank-pill rank-${shot.rank}`}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  Rank #{shot.rank}
                </div>
                <div className="proof-sc-header">
                  <div className="proof-sc-glogo" aria-hidden="true"><span>G</span><span>o</span><span>o</span><span>g</span><span>l</span><span>e</span></div>
                  <div className="proof-sc-bar">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}><circle cx="11" cy="11" r="7" stroke="rgba(245,240,232,0.35)" strokeWidth="2" /><path d="M20 20L16.5 16.5" stroke="rgba(245,240,232,0.35)" strokeWidth="2" strokeLinecap="round" /></svg>
                    <span className="proof-sc-bar-text">{shot.query}</span>
                  </div>
                </div>
                <div className="proof-sc-imgwrap">
                  <img src={shot.src} alt={`${shot.client} ranking for "${shot.query}"`} className="proof-sc-img"  loading="lazy" decoding="async" />
                  <div className="proof-highlight-box" style={{ top: `${shot.highlightTop}%` }} />
                  <div className="proof-highlight-bar" style={{ top: `${shot.highlightTop}%` }} />
                  <div className="proof-arrow-wrap" style={{ top: `calc(${shot.highlightTop}% + 7%)` }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                </div>
                <div className="proof-sc-footer">
                  <span className="proof-sc-client">{shot.client}</span>
                  <span className="proof-sc-live"><span className="proof-live-dot" />Live Result</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="why-strip">
          <span className="section-eyebrow">Why It Matters</span>
          <h2 className="section-title">Three Reasons SEO Changes Everything</h2>
          <div className="growth-grid">
            {growth.map((item, i) => (
              <div key={i} id={`growth-${i}`} ref={setRef(`growth-${i}`)} className={`growth-card${isVisible(`growth-${i}`) ? " visible" : ""}`} style={{ transitionDelay: `${i * 0.12}s` }}>
                <span className="card-icon">{item.icon}</span>
                <h3 className="card-title">{item.title}</h3>
                <p className="card-body">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="system-section">
          <div className="system-inner">
            <div className="system-header">
              <div>
                <span className="section-eyebrow">The Full System</span>
                <h2 className="section-title" style={{ marginBottom: 0 }}>Our SEO Optimisation System</h2>
              </div>
              <p className="system-sub">One continuous system, not a few keywords and a plugin. Every layer works together - technical, content, authority and measurement - to build compounding organic growth.</p>
            </div>
            <div className="service-list">
              {services.map((svc, i) => (
                <ServiceItem key={i} svc={svc} index={i} isVisible={isVisible(`svc-${i}`)} refSetter={setRef(`svc-${i}`)} id={`svc-${i}`} />
              ))}
            </div>
          </div>
        </section>

        <section id="core" ref={setRef("core")} className="core-section" >
          <span className="core-quote-mark" >"</span>
          <p className="core-message" style={{ opacity: isVisible("core") ? 1 : 0, transform: isVisible("core") ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.9s ease, transform 0.9s ease", marginBottom:80}}>
            SEO Optimisation is the <strong>key system we engineer behind your website</strong> so that search engines understand your content, <strong>trust your brand</strong> and send you the <strong>right visitors every single day.</strong>
          </p>
          
          
    
        </section>
        <ContactUsForm/>
        <div>
           <ServiceSection /> 
        </div>
      </div>
    </>
  );
};

export default SEOSection;
