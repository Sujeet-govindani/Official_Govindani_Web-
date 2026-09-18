import { useState, useEffect } from "react";

const videos = [
  { id:1,  youtubeId:"jMqmQ7_5qwI", hindi:"80G Receipt कैसे Automatically Generate करें?",        english:"Learn how to automate 80G receipts for donors and simplify your operations.",                          cat:"compliance", featured:true },
  { id:2,  youtubeId:"kwlxMe575y4", hindi:"Donors Insights कैसे देखें?",                            english:"Discover how to track donor behavior, donation trends, and insights efficiently.",                     cat:"donor" },
  { id:3,  youtubeId:"kpXi20ubvlo", hindi:"Website Content कौन लिखेगा?",                            english:"Understand how professional content can elevate your website.",                                        cat:"website" },
  { id:4,  youtubeId:"aHnoX3R-cik", hindi:"क्या हम 80G, 12A, या अन्य Documents बनाते हैं?",         english:"Find out how we assist with compliance documents like 80G and 12A.",                                  cat:"compliance" },
  { id:5,  youtubeId:"9dkXWAtVNFU", hindi:"Donor Dashboard कैसा होता है?",                          english:"Get a glimpse of how donor dashboards improve transparency and engagement.",                           cat:"donor" },
  { id:6,  youtubeId:"ogrYr12RLxk", hindi:"क्या हम Marketing भी करते हैं?",                         english:"Learn how our marketing solutions can boost your fundraising and outreach.",                           cat:"marketing" },
  { id:7,  youtubeId:"1MCzqhr8SRw", hindi:"Website में कितने Pages होंगे?",                          english:"Know the essentials for structuring a well-designed website.",                                        cat:"website" },
  { id:8,  youtubeId:"eeJAeg8skyo", hindi:"Marketing Team को Support कैसे मिलेगा?",                  english:"Explore the tools and techniques we provide to support your marketing team.",                         cat:"marketing" },
  { id:10, youtubeId:"eKGqRLYiZSA", hindi:"Website Cost: One-Time या Lifetime?",                    english:"Understand the costs involved in building and maintaining a website.",                                 cat:"website" },
  { id:11, youtubeId:"f2eu5jXlBKo", hindi:"After Website Complete क्या होता है?",                   english:"Discover what happens after website completion, including maintenance and updates.",                   cat:"website" },
  { id:12, youtubeId:"OrIAxzVZ3Ik", hindi:"Payment Gateway क्या है और इसे कैसे Integrate करें?",    english:"Learn how to set up and integrate secure payment gateways.",                                          cat:"website" },
  { id:13, youtubeId:"FwdZ8pJ99ek", hindi:"Daily, Weekly, Monthly Reports: कब और कैसे मिलती हैं?", english:"Track website performance through detailed daily, weekly, and monthly reports.",                      cat:"reports" },
  { id:14, youtubeId:"9dkXWAtVNFU", hindi:"Website से Donor Data कैसे निकाले?",                     english:"Find out how to extract and manage donor data efficiently.",                                          cat:"donor" },
];

const filters = [
  { key:"all",        label:" All Videos" },
  { key:"compliance", label:" Compliance" },
  { key:"donor",      label:" Donor" },
  { key:"website",    label:" Website" },
  { key:"marketing",  label:" Marketing" },
  { key:"reports",    label:" Reports" },
];

const catMeta = {
  compliance: { label:"Compliance", bg:"#c9922a",  text:"#080808" },
  donor:      { label:"Donor",      bg:"#f5ead8",  text:"#080808" },
  website:    { label:"Website",    bg:"#ffffff",  text:"#080808" },
  marketing:  { label:"Marketing",  bg:"#e8b24a",  text:"#080808" },
  reports:    { label:"Reports",    bg:"#f5cc76",  text:"#080808" },
};

/* ── tiny SVG icons ─────────────────────────────────── */
const PlayIcon  = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>;
const ArrowIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>;
const YTIcon    = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="#ff4444"><path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 00.5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 002.1 2.1C4.5 20.4 12 20.4 12 20.4s7.5 0 9.4-.5a3 3 0 002.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z"/></svg>;

/* ── Video Card ─────────────────────────────────────── */
function VideoCard({ video, index, isFeaturedWide, isMobile }) {
  const [hov, setHov] = useState(false);
  const cm = catMeta[video.cat] || catMeta.website;

  return (
    <a
      href={`https://youtu.be/${video.youtubeId}`}
      target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "linear-gradient(145deg,#161616 0%,#111 100%)",
        border: `1px solid ${hov ? "rgba(201,146,42,.45)" : "rgba(245,234,216,.08)"}`,
        borderRadius: isMobile ? 11 : 15,
        overflow: "hidden",
        display: "flex",
        flexDirection: isFeaturedWide ? "row" : "column",
        textDecoration: "none",
        color: "inherit",
        cursor: "pointer",
        transition: "transform .28s ease, border-color .28s ease, box-shadow .28s ease",
        transform: hov ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hov
          ? "0 18px 56px rgba(0,0,0,.8), 0 0 0 1px rgba(201,146,42,.14)"
          : "0 3px 20px rgba(0,0,0,.5)",
        animation: `fadeUp .4s ease ${index * 0.055}s both`,
        gridColumn: isFeaturedWide ? "span 2" : "span 1",
      }}
    >
      {/* ── Thumbnail ── */}
      <div style={{
        position: "relative",
        width: isFeaturedWide ? "52%" : "100%",
        flexShrink: 0,
        aspectRatio: "16/9",
        overflow: "hidden",
        background: "#0a0a0a",
      }}>
        <img
          src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
          alt={video.hindi}
          style={{
            width:"100%", height:"100%", objectFit:"cover", display:"block",
            transition:"transform .38s ease",
            transform: hov ? "scale(1.06)" : "scale(1)",
          }}
        />
        {/* overlay */}
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(0,0,0,.65) 0%,transparent 52%)", pointerEvents:"none" }}/>

        {/* play */}
        <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", zIndex:2 }}>
          <div style={{
            width: isMobile ? 36 : 48,
            height: isMobile ? 36 : 48,
            borderRadius:"50%",
            background: hov ? "#c9922a" : "rgba(245,234,216,.92)",
            display:"flex", alignItems:"center", justifyContent:"center",
            boxShadow: hov ? "0 0 26px rgba(201,146,42,.6)" : "0 3px 18px rgba(0,0,0,.5)",
            transition:"all .22s ease",
            transform: hov ? "scale(1.12)" : "scale(1)",
            color: hov ? "#fff" : "#080808",
          }}>
            <PlayIcon/>
          </div>
        </div>

        {/* category pill */}
        <div style={{
          position:"absolute", bottom:8, left:9, zIndex:3,
          background: cm.bg, color: cm.text,
          fontSize: isMobile ? "0.56rem" : "0.62rem",
          fontWeight:700, padding: isMobile ? "2px 7px" : "3px 9px",
          borderRadius:100, letterSpacing:"0.05em", textTransform:"uppercase",
          fontFamily:"'Inter',sans-serif",
        }}>
          {cm.label}
        </div>

        {/* featured badge (desktop only) */}
        {isFeaturedWide && (
          <div style={{
            position:"absolute", top:10, right:10, zIndex:3,
            background:"rgba(201,146,42,.9)", color:"#080808",
            fontSize:"0.6rem", fontWeight:700,
            padding:"3px 11px", borderRadius:100,
            letterSpacing:"0.07em", textTransform:"uppercase",
            fontFamily:"'Inter',sans-serif",
          }}>★ Featured</div>
        )}
      </div>

      {/* ── Body ── */}
      <div style={{
        padding: isMobile
          ? "10px 10px 12px"
          : isFeaturedWide ? "28px 26px" : "16px 16px 18px",
        display:"flex", flexDirection:"column",
        gap: isMobile ? 4 : 6,
        flex:1,
        justifyContent: isFeaturedWide ? "center" : "flex-start",
      }}>
        {/* number */}
        <span style={{
          fontSize: isMobile ? "0.58rem" : "0.65rem",
          fontWeight:700, color:"#c9922a",
          letterSpacing:"0.07em", textTransform:"uppercase",
          fontFamily:"'Inter',sans-serif",
        }}>
          Video {String(video.id).padStart(2,"0")}
        </span>

        {/* hindi title */}
        <div style={{
          fontFamily:"'Libre Baskerville',serif",
          fontSize: isMobile ? "0.78rem" : isFeaturedWide ? "1.2rem" : "0.92rem",
          fontWeight:700, color:"#f5ead8",
          lineHeight:1.38,
        }}>
          {video.hindi}
        </div>

        {/* english hide on mobile for compact cards */}
        {!isMobile && (
          <div style={{
            fontFamily:"'Inter',sans-serif",
            fontSize: isFeaturedWide ? "0.86rem" : "0.77rem",
            color:"rgba(245,234,216,.48)",
            lineHeight:1.6, flex:1, fontWeight:400,
          }}>
            {video.english}
          </div>
        )}

        {/* footer row */}
        <div style={{
          display:"flex", alignItems:"center", justifyContent:"space-between",
          marginTop: isMobile ? 7 : 10,
          paddingTop: isMobile ? 7 : 10,
          borderTop:"1px solid rgba(245,234,216,.07)",
        }}>
          <span style={{
            display:"inline-flex", alignItems:"center", gap:4,
            fontSize: isMobile ? "0.66rem" : "0.74rem",
            fontWeight:600,
            color: hov ? "#e8b24a" : "#c9922a",
            transition:"color .2s",
            fontFamily:"'Inter',sans-serif",
          }}>
            Watch <ArrowIcon/>
          </span>
          {!isMobile && (
            <span style={{ display:"flex", alignItems:"center", gap:4, fontSize:"0.66rem", color:"rgba(245,234,216,.26)", fontFamily:"'Inter',sans-serif" }}>
              <YTIcon/> YouTube
            </span>
          )}
        </div>
      </div>
    </a>
  );
}

/* ── Page ───────────────────────────────────────────── */
export default function NGOVideosPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [width, setWidth] = useState(1440);

  useEffect(() => {
    const fn = () => setWidth(window.innerWidth);

    // Sync to the real viewport immediately after mount. The initial state is
    // fixed at the pre-render value so hydration matches; without this line a
    // phone would stay on the desktop layout until the first resize event.
    fn();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel  = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap";
    document.head.appendChild(link);

    const s = document.createElement("style");
    s.textContent = `
      @keyframes fadeUp { from{opacity:0;transform:translateY(26px)} to{opacity:1;transform:translateY(0)} }
      *{box-sizing:border-box} body{margin:0;background:#080808}
      ::-webkit-scrollbar{width:5px} ::-webkit-scrollbar-track{background:#080808} ::-webkit-scrollbar-thumb{background:#c9922a;border-radius:10px}
    `;
    document.head.appendChild(s);
  }, []);

  const isMobile = width < 580;
  const isTablet = width >= 580 && width < 960;

  const gridCols = isMobile
    ? "repeat(2,1fr)"           /* ← 2 compact cards on mobile */
    : isTablet
      ? "repeat(2,1fr)"
      : "repeat(3,1fr)";

  const gridGap = isMobile ? 10 : isTablet ? 16 : 24;

  const filtered = activeFilter === "all"
    ? videos
    : videos.filter(v => v.cat === activeFilter);

  /* featured wide only on desktop when showing all */
  const showFeaturedWide = !isMobile && !isTablet && activeFilter === "all";

  return (
    <div style={{ background:"#080808", minHeight:"100vh", fontFamily:"'Inter',sans-serif" }}>

      {/* ════════════ HERO ════════════ */}
      <header style={{
        position:"relative", background:"#080808", overflow:"hidden",
        /* ↓ more top padding */
        padding: isMobile ? "110px 20px 72px" : isTablet ? "130px 28px 80px" : "150px 24px 96px",
        textAlign:"center",
      }}>
        {/* blobs */}
        <div style={{ position:"absolute", inset:0, pointerEvents:"none", background:`radial-gradient(ellipse 50% 50% at 15% 22%,rgba(201,146,42,.12) 0%,transparent 60%),radial-gradient(ellipse 45% 45% at 85% 75%,rgba(201,146,42,.08) 0%,transparent 60%),radial-gradient(ellipse 80% 30% at 50% 100%,rgba(201,146,42,.06) 0%,transparent 55%)` }}/>

        {/* rings */}
        {[{s:480,t:-180,l:-140,o:.08},{s:300,b:-90,r:-70,o:.05},{s:120,b:70,lp:"14%",o:.12}].map((r,i)=>(
          <div key={i} style={{ position:"absolute", width:r.s, height:r.s, top:r.t, left:r.lp||r.l, bottom:r.b, right:r.r, borderRadius:"50%", border:`1px solid rgba(201,146,42,${r.o})`, pointerEvents:"none" }}/>
        ))}

        <div style={{ position:"relative", zIndex:2 }}>
          {/* badge */}
          <div style={{
            display:"inline-flex", alignItems:"center", gap:8,
            background:"rgba(201,146,42,.1)", border:"1px solid rgba(201,146,42,.3)",
            borderRadius:100, padding: isMobile ? "6px 16px" : "8px 22px",
            fontSize: isMobile ? "0.64rem" : "0.72rem", fontWeight:600,
            color:"#e8b24a", letterSpacing:"0.1em", textTransform:"uppercase",
            marginBottom: isMobile ? 22 : 30, fontFamily:"'Inter',sans-serif",
          }}>
            NGO &amp; Business Video Library
          </div>

          {/* H1 */}
          <h1 style={{
            fontFamily:"'Libre Baskerville',serif",
            fontSize: isMobile ? "1.7rem" : isTablet ? "2.5rem" : "3.7rem",
            fontWeight:700, color:"#f5ead8", lineHeight:1.18,
            maxWidth:820, margin:"0 auto 12px", letterSpacing:"-0.01em",
          }}>
            Explore Our{" "}
            <h3 style={{  color:"#e8b24a" }}>Informative Videos</h3>
            <br/>for NGOs and Businesses
          </h1>

          {/* gold rule */}
          <div style={{ width:60, height:3, background:"linear-gradient(90deg,#c9922a,#f5cc76)", borderRadius:2, margin:"22px auto" }}/>

          {/* subtitle */}
          <p style={{
            fontFamily:"'Inter',sans-serif",
            fontSize: isMobile ? "0.84rem" : "1.04rem",
            color:"rgba(245,234,216,.52)", maxWidth:520,
            margin:"0 auto 44px", lineHeight:1.75, fontWeight:400,
          }}>
            Step-by-step guides, insights, and expert answers all in one place
            to help your NGO thrive digitally.
          </p>

          {/* stats */}
          <div style={{ display:"flex", justifyContent:"center", gap: isMobile ? 26 : 48, flexWrap:"wrap" }}>
            {[{v:"14+",l:"Videos"},{v:"100%",l:"Free"},{v:"Hindi",l:"+ English"}].map(s=>(
              <div key={s.l} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
                <strong style={{ fontFamily:"'Libre Baskerville',serif", fontSize: isMobile ? "1.5rem" : "2rem", fontWeight:700, color:"#e8b24a", lineHeight:1 }}>{s.v}</strong>
                <small style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.66rem", color:"rgba(245,234,216,.35)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500 }}>{s.l}</small>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ════════════ FILTER BAR centred ════════════ */}
      <div style={{
        background:"#0c0c0c",
        borderTop:"1px solid rgba(245,234,216,.06)",
        borderBottom:"1px solid rgba(245,234,216,.06)",
        position:"sticky", top:0, zIndex:100,
        padding:"0 16px",
      }}>
        <div style={{
          maxWidth:1280, margin:"0 auto",
          display:"flex",
          alignItems:"center",
          justifyContent:"center",   /* ← centred */
          flexWrap:"wrap",
          gap: isMobile ? 6 : 8,
          padding:"12px 0",
        }}>
          {filters.map(f => {
            const active = activeFilter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                style={{
                  display:"inline-flex", alignItems:"center",
                  padding: isMobile ? "5px 11px" : "7px 15px",
                  borderRadius:100,
                  border:`1.5px solid ${active ? "#c9922a" : "rgba(245,234,216,.12)"}`,
                  background: active ? "#c9922a" : "transparent",
                  fontFamily:"'Inter',sans-serif",
                  fontSize: isMobile ? "0.68rem" : "0.78rem",
                  fontWeight: active ? 700 : 500,
                  color: active ? "#080808" : "rgba(245,234,216,.62)",
                  cursor:"pointer",
                  whiteSpace:"nowrap",
                  transition:"all .2s ease",
                  outline:"none",
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ════════════ MAIN ════════════ */}
      <main style={{ maxWidth:1280, margin:"0 auto", padding: isMobile ? "32px 12px 56px" : "52px 24px 80px" }}>

        {/* heading row */}
        <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:28, flexWrap:"wrap", gap:12 }}>
          <div>
            <h2 style={{ fontFamily:"'Libre Baskerville',serif", fontSize: isMobile ? "1.25rem" : "clamp(1.4rem,3vw,2rem)", fontWeight:700, color:"#f5ead8", lineHeight:1.2, marginBottom:5 }}>
              Watch &amp; Learn
            </h2>
            <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.7rem", fontWeight:500, color:"rgba(245,234,216,.3)", letterSpacing:"0.06em", textTransform:"uppercase" }}>
              Practical guides for your NGO
            </p>
          </div>
          <div style={{ background:"rgba(201,146,42,.12)", border:"1px solid rgba(201,146,42,.25)", color:"#e8b24a", fontFamily:"'Inter',sans-serif", fontSize:"0.74rem", fontWeight:700, padding:"5px 14px", borderRadius:100, letterSpacing:"0.04em" }}>
            {filtered.length} Video{filtered.length !== 1 ? "s" : ""}
          </div>
        </div>

        {/* divider */}
        <div style={{ height:1, background:"linear-gradient(90deg,transparent,rgba(201,146,42,.3) 30%,rgba(201,146,42,.3) 70%,transparent)", marginBottom:28 }}/>

        {/* grid */}
        <div style={{ display:"grid", gridTemplateColumns:gridCols, gap:gridGap }}>
          {filtered.length === 0 ? (
            <div style={{ gridColumn:"1 / -1", textAlign:"center", padding:"60px 0", color:"rgba(245,234,216,.3)", fontFamily:"'Inter',sans-serif" }}>
              No videos found for this category.
            </div>
          ) : (
            filtered.map((video, i) => (
              <VideoCard
                key={`${video.id}-${i}`}
                video={video}
                index={i}
                isFeaturedWide={video.featured && showFeaturedWide}
                isMobile={isMobile}
              />
            ))
          )}
        </div>

        {/* ════ CTA BANNER ════ */}
        <div style={{
          marginTop: isMobile ? 44 : 68,
          background:"linear-gradient(135deg,#0f0f0f 0%,#141008 50%,#0f0f0f 100%)",
          border:"1px solid rgba(201,146,42,.2)",
          borderRadius: isMobile ? 13 : 20,
          padding: isMobile ? "38px 20px" : "54px 40px",
          textAlign:"center",
          position:"relative", overflow:"hidden",
        }}>
          <div style={{ position:"absolute", inset:0, pointerEvents:"none", background:`radial-gradient(ellipse 55% 70% at 10% 50%,rgba(201,146,42,.09) 0%,transparent 60%),radial-gradient(ellipse 45% 60% at 90% 45%,rgba(201,146,42,.07) 0%,transparent 60%)` }}/>
          <div style={{ position:"absolute", top:0, left:"20%", right:"20%", height:1, background:"linear-gradient(90deg,transparent,rgba(201,146,42,.5),transparent)" }}/>

          <div style={{ position:"relative", zIndex:2 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(201,146,42,.1)", border:"1px solid rgba(201,146,42,.25)", borderRadius:100, padding:"5px 15px", fontSize:"0.66rem", fontWeight:600, color:"#e8b24a", letterSpacing:"0.08em", textTransform:"uppercase", fontFamily:"'Inter',sans-serif", marginBottom:16 }}>
             Get Started
            </div>

            <h3 style={{ fontFamily:"'Libre Baskerville',serif", fontSize: isMobile ? "1.35rem" : "clamp(1.5rem,3.5vw,2.2rem)", fontWeight:700, color:"#f5ead8", marginBottom:12, lineHeight:1.25 }}>
              Ready to Transform Your NGO's<br/>
              <h3 style={{  color:"#e8b24a" }}>Digital Presence?</h3>
            </h3>

            <p style={{ fontFamily:"'Inter',sans-serif", fontSize: isMobile ? "0.83rem" : "0.92rem", color:"rgba(245,234,216,.48)", maxWidth:450, margin:"0 auto 28px", lineHeight:1.75, fontWeight:400 }}>
              Watch all our videos, implement the strategies, and grow your impact.
              We're here to help every step of the way.
            </p>

            <a
              href="http://www.youtube.com/@Sujeetgovindani"
              target="_blank" rel="noopener noreferrer"
              style={{
                display:"inline-flex", alignItems:"center", gap:8,
                background:"linear-gradient(135deg,#c9922a 0%,#e8b24a 100%)",
                color:"#080808",
                fontFamily:"'Inter',sans-serif",
                fontSize: isMobile ? "0.82rem" : "0.88rem",
                fontWeight:700,
                padding: isMobile ? "12px 22px" : "13px 28px",
                borderRadius:100, textDecoration:"none",
                boxShadow:"0 4px 22px rgba(201,146,42,.35)",
                letterSpacing:"0.01em",
              }}
            >
              Visit Our YouTube Channel
            </a>
          </div>
        </div>
      </main>

      {/* ════ FOOTER ════ */}
      <footer style={{
        background:"#050505",
        borderTop:"1px solid rgba(245,234,216,.05)",
        textAlign:"center",
        padding:"20px 16px",
        fontFamily:"'Inter',sans-serif",
        fontSize:"0.71rem",
        color:"rgba(245,234,216,.2)",
        letterSpacing:"0.04em",
      }}>
        © 2024 NGO Video Library &nbsp;·&nbsp; Made with 💛 for NGOs &amp; Businesses &nbsp;·&nbsp;{" "}
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={{ color:"#c9922a", textDecoration:"none" }}>
          YouTube Channel
        </a>
      </footer>
    </div>
  );
}