import { useEffect, useState } from "react";
import ContactUsForm from "@/pages/ContactUsForm";
import PortfolioSection from "@/components/HomePage/PortfolioSection";

const GOLD = "#C9A84C";
const GOLD_LIGHT = "#E2C170";
const GOLD_DIM = "rgba(201,168,76,0.14)";
const CREAM = "#F5EDD9";
const WHITE = "#FFFFFF";
const BLACK = "#060606";
const CARD_BG = "rgba(255,255,255,0.03)";
const BORDER = "rgba(201,168,76,0.18)";

const fonts = `

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { background: ${BLACK}; color: ${WHITE}; font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .fade-up { animation: fadeUp 0.85s cubic-bezier(0.16,1,0.3,1) both; }
  .d1 { animation-delay: 0.08s; }
  .d2 { animation-delay: 0.2s; }
  .d3 { animation-delay: 0.32s; }
  .d4 { animation-delay: 0.44s; }
  .d5 { animation-delay: 0.56s; }

  .feat-card {
    background: ${CARD_BG};
    border: 1px solid ${BORDER};
    border-radius: 18px;
    padding: 34px 28px;
    transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
    cursor: default;
    position: relative;
    overflow: hidden;
  }
  .feat-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(to right, transparent, ${GOLD}66, transparent);
    opacity: 0;
    transition: opacity 0.3s;
  }
  .feat-card:hover { transform: translateY(-5px); border-color: ${GOLD}; box-shadow: 0 24px 64px rgba(201,168,76,0.07); background: rgba(201,168,76,0.03); }
  .feat-card:hover::before { opacity: 1; }

  .btn-p {
    background: linear-gradient(135deg, ${GOLD} 0%, ${GOLD_LIGHT} 100%);
    color: ${BLACK};
    font-family: 'Inter', sans-serif; font-weight: 600; font-size: 13px; letter-spacing: 0.07em; text-transform: uppercase;
    border: none; border-radius: 9px; padding: 15px 30px; cursor: pointer;
    box-shadow: 0 4px 24px rgba(201,168,76,0.28);
    transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
  }
  .btn-p:hover { opacity: 0.9; transform: translateY(-2px); box-shadow: 0 10px 36px rgba(201,168,76,0.38); }

  .pill {
    display: flex; align-items: center; gap: 10px;
    background: rgba(201,168,76,0.06); border: 1px solid rgba(201,168,76,0.18);
    border-radius: 100px; padding: 11px 20px;
    font-size: 13px; font-weight: 500; color: ${CREAM}; letter-spacing: 0.02em;
    transition: background 0.2s, border-color 0.2s;
  }
  .pill:hover { background: rgba(201,168,76,0.1); border-color: ${GOLD}; }
`;

const features = [
  { title: "Booking Management", desc: "Handle walk-ins and pre-scheduled bookings from one unified calendar. Reduce wait times and ensure every slot is accounted for with real time visibility." },
  { title: "Wash Package Tracking", desc: "Track package selections, usage frequency, and upsell opportunities. Manage your service tiers cleanly across all customer interactions." },
  { title: "Customer History", desc: "Maintain detailed service records for every customer - visit dates, packages chosen, preferences noted, and loyalty status tracked automatically." },
  { title: "Staff Assignment", desc: "Assign the right staff to each booking with smart scheduling, availability tracking, and workload balancing across shifts and service bays." },
  { title: "Service Status Updates", desc: "Real-time progress tracking for each vehicle in service - from arrival to completion - keeping your team and customers informed at every stage." },
  { title: "Payment & Invoice Visibility", desc: "Clear payment tracking, invoice generation, and pending balance visibility - giving your operations team a complete financial snapshot daily." },
];

const highlights = [
  "Faster Booking Management",
  "Better Customer Tracking",
  "Smooth Daily Operations",
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

export default function CarWashingCRM() {
  const width = useWindowWidth();
  const isMobile = width <= 600;
  const isTablet = width <= 960 && width > 600;

  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = fonts;
    document.head.appendChild(s);
    return () => { document.head.removeChild(s); };
  }, []);

  const secFeatPadding = isMobile ? "56px 18px 56px" : isTablet ? "80px 36px 80px" : "110px 60px";
  const secShowPadding = isMobile ? "56px 18px 56px" : isTablet ? "80px 36px 80px" : "110px 60px 100px";
  const divWrapPadding = isMobile ? "0 18px" : isTablet ? "0 36px" : "0 60px";
  const showOuterPadding = isMobile ? "22px 18px 0" : isTablet ? "32px 32px 0" : "44px 44px 0";
  const featGridCols = isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)";
  const imgHeight = isMobile ? 260 : isTablet ? 500 : 800;

  return (
    <div style={{ background: BLACK, minHeight: "100vh", overflowX: "hidden" }}>

      {/* ══════════════════ FEATURES ══════════════════ */}
      <section style={{ padding: secFeatPadding, position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(ellipse 55% 50% at 50% 0%, rgba(201,168,76,0.045) 0%, transparent 60%)`, pointerEvents: "none" }} />
        <div style={{ maxWidth: 1280, margin: "100px auto" }}>

          <div style={{ textAlign: "center", marginBottom: 70 }}>

            <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(30px, 4vw, 50px)", color: WHITE, lineHeight: 1.15, marginBottom: 18, marginTop: "160px" }}>
              Built for Service Precision<br /><span style={{ color: GOLD }}>& Operational Flow</span>
            </h2>
            <p style={{ fontSize: 15, color: "rgba(245,237,217,0.55)", maxWidth: 500, margin: "0 auto", lineHeight: 1.8 }}>
              Every feature is designed to reduce friction for your staff and create a seamless experience for your customers from booking to billing.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: featGridCols, gap: 22 }}>
            {features.map((f, i) => (
              <div key={f.title} className="feat-card fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 17, color: WHITE, marginBottom: 10, fontWeight: 700 }}>{f.title}</h3>
                <p style={{ fontSize: 13.5, color: "rgba(245,237,217,0.58)", lineHeight: 1.78 }}>{f.desc}</p>
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
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(ellipse 65% 55% at 50% 100%, rgba(201,168,76,0.04) 0%, transparent 65%)`, pointerEvents: "none" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>

          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
              <div style={{ width: 36, height: 1, background: GOLD, opacity: 0.45 }} />
              <span style={{ fontSize: 10, fontWeight: 600, color: GOLD, letterSpacing: "0.15em", textTransform: "uppercase" }}>Business Value</span>
              <div style={{ width: 36, height: 1, background: GOLD, opacity: 0.45 }} />
            </div>
            <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(30px, 4vw, 50px)", color: WHITE, lineHeight: 1.15, marginBottom: 18 }}>
              Cleaner Operations.<br /><span style={{ color: GOLD }}>Loyal Customers. Daily Growth.</span>
            </h2>
            <p style={{ fontSize: 15, color: "rgba(245,237,217,0.58)", maxWidth: 580, margin: "0 auto", lineHeight: 1.85 }}>
              The Car Washing CRM transforms your daily workflow-from manual bookings and scattered records to an organized, automated, and data-driven operation. Your team works smarter. Your customers return more often.
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
              boxShadow: "0 70px 160px rgba(0,0,0,0.55), inset 0 1px 0 rgba(201,168,76,0.12)",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />
            <img
              src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/Social-Media/Application%26Saas/Crm-Car-Washing-Crm.webp"
              alt="Car Washing CRM Dashboard"
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
              <div key={h} className="pill">
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
            }}
          >

          </div>

        </div>

      </section>

      <ContactUsForm /><br />
      <PortfolioSection />

    </div>
  );
}