import { useEffect, useState } from "react";
import ContactUsForm from "@/pages/ContactUsForm";
import CrmIntroVideo from "@/pages/CrmIntroVideo";

const GOLD = "#C9A84C";
const GOLD_LIGHT = "#E2C170";
const GOLD_DIM = "rgba(201,168,76,0.15)";
const CREAM = "#F5EDD9";
const WHITE = "#FFFFFF";
const BLACK = "#080808";
const CARD_BG = "rgba(255,255,255,0.03)";
const BORDER = "rgba(201,168,76,0.2)";

const fonts = `

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { background: ${BLACK}; color: ${WHITE}; font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .fade-up { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) both; }
  .delay-1 { animation-delay: 0.1s; }
  .delay-2 { animation-delay: 0.22s; }
  .delay-3 { animation-delay: 0.34s; }
  .delay-4 { animation-delay: 0.46s; }
  .delay-5 { animation-delay: 0.58s; }

  .feature-card {
    background: ${CARD_BG};
    border: 1px solid ${BORDER};
    border-radius: 16px;
    padding: 36px 30px;
    transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    cursor: default;
  }
  .feature-card:hover {
    transform: translateY(-6px);
    border-color: ${GOLD};
    box-shadow: 0 20px 60px rgba(201,168,76,0.08);
  }

  .btn-primary {
    background: linear-gradient(135deg, ${GOLD} 0%, ${GOLD_LIGHT} 100%);
    color: ${BLACK};
    font-family: 'Inter', sans-serif;
    font-weight: 600; font-size: 14px; letter-spacing: 0.06em; text-transform: uppercase;
    border: none; border-radius: 8px; padding: 16px 32px; cursor: pointer;
    transition: opacity 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
    box-shadow: 0 4px 24px rgba(201,168,76,0.3);
  }
  .btn-primary:hover { opacity: 0.92; transform: translateY(-2px); box-shadow: 0 8px 32px rgba(201,168,76,0.4); }

  .highlight-pill {
    display: flex; align-items: center; gap: 10px;
    background: rgba(201,168,76,0.06); border: 1px solid rgba(201,168,76,0.2);
    border-radius: 100px; padding: 12px 22px;
    font-size: 13px; font-weight: 500; color: ${CREAM}; letter-spacing: 0.03em;
    transition: background 0.25s, border-color 0.25s;
  }
  .highlight-pill:hover { background: rgba(201,168,76,0.1); border-color: ${GOLD}; }
`;

const features = [
  { title: "Lead Tracking", desc: "Capture and track every inbound lead with structured stages, ownership assignment, and real time status visibility across your sales team." },
  { title: "Site Visit Scheduling", desc: "Plan and manage site visits with calendar integration, automated reminders, and confirmation workflows- keeping every appointment organized." },
  { title: "Follow-Up Reminders", desc: "Never miss a follow-up. Intelligent reminder triggers keep your team proactive and prospects engaged at every critical touchpoint." },
  { title: "Sales Pipeline Visibility", desc: "A clear, stage-wise pipeline view gives your team real time clarity on deal progress, conversion rates, and bottlenecks." },
  { title: "Customer Management", desc: "Maintain rich customer profiles with communication history, document records, and notes - all centralized in one clean interface." },
  { title: "Project Communication Flow", desc: "Bridge the gap between sales and site teams. Structured communication channels ensure clients and coordinators stay aligned throughout." },
];

const highlights = [
  { label: "Structured Lead Flow" },
  { label: "Better Follow-Up Control" },
  { label: "Organized Sales Process" },
  { label: "Faster Team Coordination" },
];

function useWindowWidth() {
  const [width, setWidth] = useState(
    1440
  );
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);

    // Sync to the real viewport immediately after mount. The initial state is
    // fixed at the pre-render value so hydration matches; without this line a
    // phone would stay on the desktop layout until the first resize event.
    handler();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
}

export default function CIBuilderCRM() {
  const width = useWindowWidth();
  const isMobile = width <= 600;
  const isTablet = width <= 960 && width > 600;

  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = fonts;
    document.head.appendChild(s);
    return () => { document.head.removeChild(s); };
  }, []);

  const secFeatPadding = isMobile ? "24px 18px 56px" : isTablet ? "40px 36px 80px" : "60px 60px";
  const secShowPadding = isMobile ? "56px 0 56px" : isTablet ? "80px 0 80px" : "120px 0 100px";
  const divWrapPadding = isMobile ? "0 18px" : isTablet ? "0 36px" : "0 60px";
  const featGridCols = isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)";
  const imgHeight = isMobile ? 260 : isTablet ? 500 : 680;

  // Horizontal padding inside the image card
  const imgCardPadH = isMobile ? "16px" : isTablet ? "24px" : "40px";

  return (
    <div style={{ background: BLACK, minHeight: "100vh", overflowX: "hidden" }}>
      <CrmIntroVideo />

      {/* ══════════════════ FEATURES ══════════════════ */}
      <section style={{ padding: secFeatPadding, position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(ellipse 60% 50% at 50% 0%, rgba(201,168,76,0.04) 0%, transparent 60%)`, pointerEvents: "none" }} />
        <div style={{ maxWidth: 1280, margin: "100px auto" }}>

          <div style={{ textAlign: "center", marginBottom: 72 }}>

            <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(32px, 4vw, 52px)", color: WHITE, lineHeight: 1.15 }}>
              Everything Your Team Needs<br /><span style={{ color: GOLD }}>in One Place</span>
            </h2>
            <p style={{ fontSize: 16, color: "rgba(245,237,217,0.6)", maxWidth: 520, margin: "0px auto", lineHeight: 1.75 }}>
              A purpose-built CRM designed for the pace and complexity of modern real-estate and construction sales workflows.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: featGridCols, gap: 24 }}>
            {features.map((f, i) => (
              <div key={f.title} className="feature-card fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 18, color: WHITE, marginBottom: 12, fontWeight: 700 }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: "rgba(245,237,217,0.6)", lineHeight: 1.75 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ maxWidth: 1280, margin: "-80px auto", padding: divWrapPadding }}>
        <div style={{ height: 1, background: `linear-gradient(to right, transparent, ${BORDER}, transparent)` }} />
      </div>

      {/* ══════════════════ SHOWCASE ══════════════════ */}
      <section style={{ padding: secShowPadding, position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(ellipse 70% 60% at 50% 100%, rgba(201,168,76,0.04) 0%, transparent 60%)`, pointerEvents: "none" }} />

        {/* Heading block keep centered with maxWidth */}
        <div style={{ maxWidth: 1280, margin: "0px auto", padding: isMobile ? "0 18px" : isTablet ? "0 36px" : "0 60px", marginBottom: 64 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 40, height: 1, background: GOLD, opacity: 0.5 }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: GOLD, letterSpacing: "0.14em", textTransform: "uppercase" }}>CRM in Action</span>
              <div style={{ width: 40, height: 1, background: GOLD, opacity: 0.5 }} />
            </div>
            <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(32px, 4vw, 52px)", color: WHITE, lineHeight: 1.15, marginBottom: 20 }}>
              From Lead to Handover -<br /><span style={{ color: GOLD }}>Full Visibility, Zero Gaps</span>
            </h2>
            <p style={{ fontSize: 16, color: "rgba(245,237,217,0.6)", maxWidth: 600, margin: "0 auto", lineHeight: 1.8 }}>
              CI Builder CRM brings your sales team, project coordinators, and client communication into a single, structured platform - reducing friction and accelerating decisions.
            </p>
          </div>
        </div>

        {/* ── Full-width dashboard image container ── */}
        <div
          style={{
            width: "100%",
            padding: `0 ${imgCardPadH}`,
            marginBottom: 64,
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.02)",
              border: `1px solid ${BORDER}`,
              borderRadius: 24,
              padding: isMobile ? "20px 16px 0" : isTablet ? "28px 28px 0" : "44px 44px 0",
              boxShadow: "0 60px 160px rgba(0,0,0,0.5), inset 0 1px 0 rgba(201,168,76,0.15)",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* Gold top line */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />

            <img
              src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/Social-Media/Application%26Saas/Crm-Ci-Builders.webp"
              alt="CI Builder CRM Dashboard"
              style={{
                width: "100%",
                height: imgHeight,
                display: "block",
                borderRadius: "16px 16px 0 0",
                objectFit: "cover",
                objectPosition: "top left",   // ← show left side (sidebar) fully
              }}
            />
          </div>
        </div>

        {/* Highlight pills + contact form back inside maxWidth */}
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: isMobile ? "0 18px" : isTablet ? "0 36px" : "0 60px" }}>

          <div style={{ display: "flex", gap: isMobile ? 10 : 16, justifyContent: "center", marginBottom: 56, flexWrap: "wrap" }}>
            {highlights.map(h => (
              <div key={h.label} className="highlight-pill">
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: GOLD, flexShrink: 0, display: "inline-block" }} />
                {h.label}
              </div>
            ))}
          </div>

          {/* ══════════════════ CONTACT FORM ══════════════════ */}
          <div
            style={{
              marginTop: isMobile ? 48 : 72,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >

          </div>

        </div>
      </section>
      <ContactUsForm />

    </div>
  );
}