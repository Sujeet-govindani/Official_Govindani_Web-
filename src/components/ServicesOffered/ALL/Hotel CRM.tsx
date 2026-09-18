import { useEffect, useState } from "react";
import ContactUsForm from "@/pages/ContactUsForm";
import PortfolioSection from "@/components/HomePage/PortfolioSection";

const GOLD = "#C9A84C";
const GOLD_LIGHT = "#DDB96A";
const GOLD_DIM = "rgba(201,168,76,0.13)";
const CREAM = "#F5EDD9";
const WHITE = "#FFFFFF";
const BLACK = "#050507";
const CARD_BG = "rgba(255,255,255,0.025)";
const BORDER = "rgba(201,168,76,0.18)";

const fonts = `

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { background: ${BLACK}; color: ${WHITE}; font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .fu  { animation: fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) both; }
  .d0  { animation-delay: 0.05s; }
  .d1  { animation-delay: 0.18s; }
  .d2  { animation-delay: 0.3s; }
  .d3  { animation-delay: 0.42s; }
  .d4  { animation-delay: 0.54s; }

  .fc {
    background: ${CARD_BG};
    border: 1px solid ${BORDER};
    border-radius: 16px;
    padding: 32px 26px;
    position: relative;
    overflow: hidden;
    transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    cursor: default;
  }
  .fc::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(to right, transparent, ${GOLD}44, transparent);
    transform: scaleX(0);
    transition: transform 0.4s ease;
  }
  .fc:hover { transform: translateY(-5px); border-color: rgba(201,168,76,0.5); box-shadow: 0 20px 60px rgba(0,0,0,0.4); }
  .fc:hover::after { transform: scaleX(1); }

  .bp {
    background: linear-gradient(135deg, ${GOLD} 0%, ${GOLD_LIGHT} 100%);
    color: ${BLACK};
    font-family: 'Inter', sans-serif; font-weight: 600; font-size: 13px;
    letter-spacing: 0.07em; text-transform: uppercase;
    border: none; border-radius: 9px; padding: 15px 30px; cursor: pointer;
    box-shadow: 0 4px 22px rgba(201,168,76,0.26);
    transition: opacity 0.22s, transform 0.22s, box-shadow 0.22s;
  }
  .bp:hover { opacity: 0.88; transform: translateY(-2px); box-shadow: 0 10px 34px rgba(201,168,76,0.36); }

  .hp {
    display: flex; align-items: center; gap: 10px;
    background: rgba(201,168,76,0.05); border: 1px solid rgba(201,168,76,0.15);
    border-radius: 100px; padding: 11px 20px;
    font-size: 13px; font-weight: 500; color: ${CREAM}; letter-spacing: 0.025em;
    transition: background 0.22s, border-color 0.22s;
  }
  .hp:hover { background: rgba(201,168,76,0.09); border-color: ${GOLD}; }
`;

const features = [
  { title: "Guest Profile Management", desc: "Maintain complete guest profiles with stay history, preferences, special requests, and communication logs enabling personalized service at every touchpoint." },
  { title: "Booking Visibility", desc: "A unified booking dashboard that shows real time room availability, reservation status, and upcoming arrivals giving your front-desk team instant clarity." },
  { title: "Folio & Billing Overview", desc: "Track all charges, service additions, and outstanding balances per guest folio. Simplify check-out billing with a structured, transparent financial view." },
  { title: "Service Request Coordination", desc: "Capture, assign, and track in-room service requests in real time. Ensure every request is acknowledged, actioned, and resolved without gaps." },
  { title: "Stay History Tracking", desc: "Access complete stay records for returning guests past bookings, room preferences, special occasions, and notes enabling meaningful, consistent hospitality." },
  { title: "Front-Desk Workflow Support", desc: "Streamline your front-desk operations with structured check-in checklists, pending task views, and shift handover notes keeping every team member aligned." },
];

const highlights = [
  "Better Guest Coordination",
  "Clear Folio Management",
  "Streamlined Hospitality Workflow",
  "Improved Service Visibility",
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

export default function HotelFolioCRM() {
  const width = useWindowWidth();
  const isMobile = width <= 600;
  const isTablet = width <= 960 && width > 600;

  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = fonts;
    document.head.appendChild(s);
    return () => { document.head.removeChild(s); };
  }, []);

  const secFeatPadding = isMobile ? "56px 18px 56px" : isTablet ? "80px 36px 80px" : "118px 60px";
  const secShowPadding = isMobile ? "56px 18px 56px" : isTablet ? "80px 36px 80px" : "112px 60px 100px";
  const divWrapPadding = isMobile ? "0 18px" : isTablet ? "0 36px" : "0 60px";
  const showOuterPadding = isMobile ? "22px 18px 0" : isTablet ? "32px 32px 0" : "44px 44px 0";
  const featGridCols = isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)";
  const imgHeight = isMobile ? 260 : isTablet ? 500 : 800;

  return (
    <div style={{ background: BLACK, minHeight: "100vh", overflowX: "hidden" }}>

      {/* ══════════════════ FEATURES ══════════════════ */}
      <section style={{ padding: secFeatPadding, position: "relative", }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(ellipse 60% 50% at 50% 0%, rgba(201,168,76,0.04) 0%, transparent 60%)`, pointerEvents: "none" }} />
        <div style={{ maxWidth: 1280, margin: "100px auto" }}>

          <div style={{ textAlign: "center", marginBottom: 70 }}>

            <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(30px, 4vw, 50px)", color: WHITE, lineHeight: 1.15, marginBottom: 18, marginTop: "160px" }}>
              Designed for <span style={{ fontStyle: "italic" }}>Hospitality</span> Teams<br />
              <span style={{ color: GOLD }}>That Demand Precision</span>
            </h2>
            <p style={{ fontSize: 15, color: "rgba(245,237,217,0.52)", maxWidth: 500, margin: "0px auto", lineHeight: 1.82 }}>
              Every module in Hotel Folio CRM is crafted to support the rhythm of a hotel-from the front desk to back-office billing.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: featGridCols, gap: 20 }}>
            {features.map((f, i) => (
              <div key={f.title} className="fc fu" style={{ animationDelay: `${i * 0.1}s` }}>
                <div style={{ position: "absolute", top: 0, left: 24, right: 24, height: 1, background: `linear-gradient(to right, transparent, ${GOLD}33, transparent)` }} />
                <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 17, color: WHITE, marginBottom: 10 }}>{f.title}</h3>
                <p style={{ fontSize: 13.5, color: "rgba(245,237,217,0.56)", lineHeight: 1.78 }}>{f.desc}</p>
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
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(ellipse 70% 60% at 50% 100%, rgba(201,168,76,0.04) 0%, transparent 62%)`, pointerEvents: "none" }} />
        <div style={{ maxWidth: 1280, margin: "-100px auto" }}>

          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
              <div style={{ width: 36, height: 1, background: GOLD, opacity: 0.4 }} />
              <span style={{ fontSize: 10, fontWeight: 600, color: GOLD, letterSpacing: "0.15em", textTransform: "uppercase" }}>Product Showcase</span>
              <div style={{ width: 36, height: 1, background: GOLD, opacity: 0.4 }} />
            </div>
            <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(30px, 4vw, 50px)", color: WHITE, lineHeight: 1.15, marginBottom: 18 }}>
              A CRM That Thinks in<br />
              <span style={{ color: GOLD }}>Guest-First <span style={{ fontStyle: "italic" }}>Terms</span></span>
            </h2>
            <p style={{ fontSize: 15, color: "rgba(245,237,217,0.56)", maxWidth: 600, margin: "0 auto", lineHeight: 1.85 }}>
              Hotel Folio CRM gives your hospitality team a complete operational picture-from arrival to departure. Manage guest profiles, folio balances, service coordination, and front-desk workflows with clarity and speed.
            </p>
          </div>

          {/* Dashboard Image Container */}
          <div
            style={{
              background: "rgba(255,255,255,0.02)",
              border: `1px solid ${BORDER}`,
              borderRadius: 24,
              padding: showOuterPadding,
              marginBottom: 60,
              boxShadow: "0 80px 180px rgba(0,0,0,0.55), inset 0 1px 0 rgba(201,168,76,0.12)",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />
            <img
              src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/Social-Media/Application%26Saas/Crm-Hotel-Folio-Happilee-Digital-Innovations.webp"
              alt="Hotel Folio CRM Dashboard"
              style={{
                width: "100%",
                height: imgHeight,
                display: "block",
                borderRadius: "16px 16px 0 0",
                objectFit: "cover",
                objectPosition: "top center",
              }}
            />
          </div>

          {/* Highlight pills */}
          <div style={{ display: "flex", gap: isMobile ? 10 : 14, justifyContent: "center", marginBottom: 52, flexWrap: "wrap" }}>
            {highlights.map(h => (
              <div key={h} className="hp">
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: GOLD, flexShrink: 0 }} />
                {h}
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
              marginBottom: "100px"
            }}
          >

          </div>

        </div>


      </section>
      <PortfolioSection />
      <ContactUsForm />
    </div>
  );
}