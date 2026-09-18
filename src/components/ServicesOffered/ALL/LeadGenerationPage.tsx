import React from "react";
import ServiceSection from "@/components/HomePage/ServicesSection";
import ContactUsForm from "@/pages/ContactUsForm";

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="9" cy="9" r="9" fill="url(#goldcg)" />
    <path d="M5 9l3 3 5-5" stroke="#111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <defs>
      <linearGradient id="goldcg" x1="0" y1="0" x2="18" y2="18" gradientUnits="userSpaceOnUse">
        <stop stopColor="#f5e27a" />
        <stop offset="1" stopColor="#c89b2a" />
      </linearGradient>
    </defs>
  </svg>
);

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ display: "inline" }}>
    <polygon points="7,1 8.5,5.5 13,5.5 9.5,8.5 11,13 7,10 3,13 4.5,8.5 1,5.5 5.5,5.5" fill="#c89b2a" />
  </svg>
);

const features = [
  { label: "High-Quality Leads" },
  { label: "Customized Strategies" },
  { label: "Advanced Technology" },
  { label: "Experienced Team" },
  { label: "Data-Driven Approach" },
];

const leftChecks = [
  "Audience Targeted Advertising",
  "SEO Optimization",
  "Virtual Tours and 3D Walkthroughs",
  "Leveraging Social Media Campaigns",
];

const rightChecks = [
  "Utilize CRM tools to Manage Leads",
  "Running pay-per-click campaigns",
  "Creating optimized landing pages",
  "Analytics and Reporting",
];

const franchiseChecks1 = [
  "Targeted Outreach to Potential Owners",
  "Creating informative content",
  "Quality work on SEO and PPC",
  "Email Campaigns",
  "Social Media Advertising",
  "Creating detailed brochures",
];

const franchiseChecks2 = [
  "Creating optimized landing pages",
  "Analytics and Reporting Feature",
  "High Conversion Ratio",
  "Per Week Campaign Optimization",
  "Advanced Technology",
  "Efficient CRM Management",
  "Data-Driven Approach",
];

/* ─── Style tokens ─── */
const GOLD_TEXT = {
  background: "linear-gradient(120deg, #f5e27a 0%, #d4a82a 45%, #ffe066 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const GOLD_BTN = {
  background: "linear-gradient(120deg, #f5e27a 0%, #c89b2a 60%, #f0c040 100%)",
  border: "none",
  cursor: "pointer",
  color: "#111",
  fontFamily: "'Inter', sans-serif",
  fontWeight: 700,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  borderRadius: 4,
  padding: "14px 38px",
  fontSize: "0.82rem",
  display: "inline-block",
};

const OUTLINE_BTN = {
  background: "transparent",
  border: "1.5px solid #c89b2a",
  cursor: "pointer",
  color: "#f5e27a",
  fontFamily: "'Inter', sans-serif",
  fontWeight: 600,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  borderRadius: 4,
  padding: "13px 36px",
  fontSize: "0.82rem",
  display: "inline-block",
};

const GLASS = {
  background: "rgba(255,255,255,0.03)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  border: "1px solid rgba(212,168,42,0.18)",
  borderRadius: 20,
};

const GOLD_LINE = {
  height: 1,
  background:
    "linear-gradient(90deg, transparent, #c89b2a 40%, #f5e27a 50%, #c89b2a 60%, transparent)",
};

const SERIF = { fontFamily: "'Libre Baskerville', serif" };
const SANS = { fontFamily: "'Inter', sans-serif" };

/* ─── Reusable components ─── */
function Eyebrow({ children, center = false }) {
  const dash = (dir) => ({
    display: "inline-block",
    width: 24,
    height: 1,
    background:
      dir === "l"
        ? "linear-gradient(90deg, transparent, #c89b2a)"
        : "linear-gradient(90deg, #c89b2a, transparent)",
    flexShrink: 0,
  });
  return (
    <div
      style={{
        ...SANS,
        fontSize: "0.78rem",
        letterSpacing: "0.25em",
        color: "#c89b2a",
        textTransform: "uppercase",
        marginBottom: 16,
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        gap: 10,
        justifyContent: center ? "center" : "flex-start",
      }}
    >
      <span style={dash("l")} />
      {children}
      <span style={dash("r")} />
    </div>
  );
}

function CheckItem({ text, fontSize = "0.9rem" }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        fontSize,
        color: "#ccc",
        lineHeight: 1.5,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <CheckIcon />
      <span>{text}</span>
    </div>
  );
}

function Orb({ w = 500, h = 300, style = {} }) {
  return (
    <div
      style={{
        position: "absolute",
        width: w,
        height: h,
        borderRadius: "50%",
        filter: "blur(100px)",
        pointerEvents: "none",
        zIndex: 0,
        ...style,
      }}
    />
  );
}

/* ═══════════════════════════════════════════
   Main component
═══════════════════════════════════════════ */
export default function LeadGenerationPage() {
  const [vw, setVw] = React.useState(
    1440
  );
  React.useEffect(() => {
    const fn = () => setVw(window.innerWidth);

    // Sync to the real viewport immediately after mount. The initial state is
    // fixed at the pre-render value so hydration matches; without this line a
    // phone would stay on the desktop layout until the first resize event.
    fn();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const isMobile = vw < 640;
  const isTablet = vw >= 640 && vw < 960;
  const isDesktop = vw >= 960;

  const hPad = isMobile ? "5%" : isTablet ? "6%" : "8%";
  const vPad = isMobile ? 10 : 100;

  const NAVBAR_H = isMobile ? 90 : 100;

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        background: "#080808",
        color: "#fff",
        overflowX: "hidden",
        paddingTop: NAVBAR_H,
      }}
    >
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        img { display: block; max-width: 100%; }
      `}</style>

      {/* ════════════════════════════════
          S1 Hero
      ════════════════════════════════ */}
      <section
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr",
          gap: isDesktop ? 60 : 40,
          alignItems: "center",
          padding: `${vPad}px ${hPad}`,
          minHeight: isDesktop ? `min(calc(100vh - ${NAVBAR_H}px), var(--hero-max))` : "auto",
          overflow: "hidden",
        }}
      >
        {/* Top border line */}
        <div style={{ ...GOLD_LINE, position: "absolute", top: 0, left: 0, right: 0 }} />

        <Orb
          w={600} h={400}
          style={{ background: "rgba(180,130,20,0.07)", top: 0, left: -100 }}
        />

        {/* ── Left copy on mobile this renders BELOW the image ── */}
        <div style={{ position: "relative", zIndex: 1, order: isMobile ? 2 : 1 }}>
          <p
            style={{
              ...SANS,
              fontSize: "0.78rem",
              color: "#c89b2a",
              fontWeight: 600,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              marginBottom: 18,
            }}
          >
            Lead Generation Services
          </p>

          <h1
            style={{
              ...SERIF,
              fontSize: isMobile ? "2rem" : isTablet ? "2.6rem" : "3.6rem",
              lineHeight: 1.15,
              marginBottom: 24,
              color: "#fff",
            }}
          >
            Fuel Your Business Growth with{" "}
            <span style={GOLD_TEXT}>Targeted Lead Generation</span>
          </h1>

          <p style={{ ...SANS, fontSize: "1rem", lineHeight: 1.85, color: "#aaa", marginBottom: 16 }}>
            Whether you are in real estate, clothing, interior design, or
            franchising, our innovative strategies and data-driven approach
            ensure that you connect with potential clients and drive your
            business forward.
          </p>
          <p style={{ ...SANS, fontSize: "1rem", lineHeight: 1.85, color: "#aaa" }}>
            At Govindani Infotech Pvt. Ltd., we provide specialized lead
            generation services designed to meet the unique demands of various
            industries.
          </p>
        </div>

        {/* ── Right image on mobile this renders FIRST (above the text) ── */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            borderRadius: 12,
            overflow: "hidden",
            height: isMobile ? 260 : isTablet ? 360 : 520,
            border: "1px solid rgba(212,168,42,0.2)",
            order: isMobile ? 1 : 2,
          }}
        >
          <img
            src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Lead-Generation/Lead-Generation-Section1-Hero.webp"
            alt="Lead generation"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          {[
            { top: 12, left: 12 },
            { top: 12, right: 12 },
            { bottom: 12, left: 12 },
            { bottom: 12, right: 12 },
          ].map((pos, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: 20,
                height: 20,
                ...pos,
                borderTop: i < 2 ? "1.5px solid #c89b2a" : undefined,
                borderBottom: i >= 2 ? "1.5px solid #c89b2a" : undefined,
                borderLeft: i % 2 === 0 ? "1.5px solid #c89b2a" : undefined,
                borderRight: i % 2 === 1 ? "1.5px solid #c89b2a" : undefined,
              }}
            />
          ))}
        </div>
      </section>

      <div style={{ ...GOLD_LINE, margin: `0 ${hPad}` }} />

      {/* ════════════════════════════════
          S2 Real Estate
      ════════════════════════════════ */}
      <section
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: `${vPad}px ${hPad}`,
          minHeight: isMobile ? "auto" : "70vh",
          overflow: "hidden",
          background: "#0c0c0c",
        }}
      >
        <img
          src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Lead-Generation/Lead-Generation-Section2-Background-Bg-1.webp"
          alt=""
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", opacity: 0.15, zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute", inset: 0, zIndex: 1,
            background:
              "radial-gradient(ellipse at 70% 50%, rgba(180,130,20,0.12) 0%, transparent 55%), radial-gradient(ellipse at 20% 30%, rgba(180,130,20,0.08) 0%, transparent 50%)",
          }}
        />
        <Orb w={500} h={300} style={{ background: "rgba(180,130,20,0.1)", top: "20%", right: "5%", zIndex: 1 }} />

        <div
          style={{
            ...GLASS,
            position: "relative",
            zIndex: 2,
            maxWidth: 700,
            width: "100%",
            padding: isMobile ? "36px 22px" : isTablet ? "48px 32px" : "70px 64px",
            textAlign: "center",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 20 }}>
            <StarIcon /><StarIcon /><StarIcon />
          </div>

          <Eyebrow center>Lead Generation</Eyebrow>

          <h2
            style={{
              ...SERIF,
              fontSize: isMobile ? "1.7rem" : isTablet ? "2.2rem" : "3rem",
              marginBottom: 22,
              lineHeight: 1.2,
              color: "#fff",
            }}
          >
            Lead Generation for <span style={GOLD_TEXT}>Real Estate</span>
          </h2>

          <p style={{ ...SANS, color: "#999", lineHeight: 1.85, fontSize: "1rem", marginBottom: 40 }}>
            Empowering Your Business Growth with Precision and Expertise. Our
            lead generation services for the real estate sector are designed to
            capture and convert high-intent prospects into valuable clients
            leveraging advanced digital marketing techniques.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════
          S3 Focused on Your Success
      ════════════════════════════════ */}
      <section
        style={{
          padding: `${vPad}px ${hPad}`,
          display: "grid",
          gridTemplateColumns: isDesktop ? "1fr 320px" : "1fr",
          gap: isDesktop ? 60 : 48,
          alignItems: "start",
          background: "#080808",
        }}
      >
        {/* Left */}
        <div>
          <Eyebrow>Focused on Your Success</Eyebrow>

          <h2
            style={{
              ...SERIF,
              fontSize: isMobile ? "1.7rem" : isTablet ? "2.2rem" : "2.8rem",
              lineHeight: 1.25,
              marginBottom: 20,
              color: "#fff",
            }}
          >
            We provide specialized{" "}
            <span style={GOLD_TEXT}>lead generation services</span>{" "}
            designed for your industry
          </h2>

          <p style={{ ...SANS, color: "#999", lineHeight: 1.85, fontSize: "0.97rem", marginBottom: 14 }}>
            Our strategic approach and advanced techniques ensure that your
            business connects with high-quality leads, driving growth and
            success across industries.
          </p>
          <p style={{ ...SANS, color: "#999", lineHeight: 1.85, fontSize: "0.97rem" }}>
            Our lead generation services for the real estate sector are designed
            to capture and convert high-intent prospects into valuable clients.
            We leverage advanced digital marketing techniques to attract
            potential buyers and renters, ensuring a steady stream of qualified
            leads for your properties.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: isMobile ? 12 : "14px 28px",
              marginTop: 28,
            }}
          >
            {[...leftChecks, ...rightChecks].map((item, i) => (
              <CheckItem key={i} text={item} />
            ))}
          </div>
        </div>

        {/* Right sticky feature card */}
        <div
          style={{
            background: "#0f0f0f",
            border: "1px solid rgba(212,168,42,0.22)",
            borderRadius: 16,
            padding: "36px 26px",
            position: isDesktop ? "sticky" : "static",
            top: NAVBAR_H + 20,
          }}
        >
          <h3 style={{ ...SERIF, fontSize: "1.5rem", marginBottom: 6, color: "#fff" }}>Feature</h3>
          <div style={{ ...GOLD_LINE, marginTop: 10, marginBottom: 22 }} />

          {features.map((f, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "13px 0",
                borderBottom:
                  i < features.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
              }}
            >
              <span style={{ ...SANS, fontSize: "0.92rem", color: "#ddd", fontWeight: 500 }}>
                {f.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <div style={{ ...GOLD_LINE, margin: `0 ${hPad}` }} />

      {/* ════════════════════════════════
          S4 Franchise Hero
      ════════════════════════════════ */}
      <section
        style={{
          position: "relative",
          display: "flex",
          flexDirection: isDesktop ? "row" : "column",
          alignItems: isDesktop ? "center" : "flex-start",
          padding: `${vPad}px ${hPad}`,
          minHeight: isDesktop ? "80vh" : "auto",
          overflow: "hidden",
          background: "#0a0a0a",
          gap: isDesktop ? 0 : 48,
        }}
      >
        <img
          src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Lead-Generation/Lead-Generation-Section3-Background-Bg.webp"
          alt=""
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", opacity: 0.12, zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute", inset: 0, zIndex: 1,
            background:
              "radial-gradient(ellipse at 20% 60%, rgba(180,130,20,0.1) 0%, transparent 55%), radial-gradient(ellipse at 90% 20%, rgba(200,160,40,0.07) 0%, transparent 50%)",
          }}
        />
        <Orb w={500} h={400} style={{ background: "rgba(180,130,20,0.09)", bottom: "-10%", left: "10%", zIndex: 1 }} />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 2, flex: 1, maxWidth: isDesktop ? "52%" : "100%" }}>
          <Eyebrow>Lead Generation</Eyebrow>

          <h2
            style={{
              ...SERIF,
              fontSize: isMobile ? "1.9rem" : isTablet ? "2.4rem" : "3.2rem",
              marginBottom: 20,
              lineHeight: 1.2,
              color: "#fff",
            }}
          >
            Lead Generation for <span style={GOLD_TEXT}>Franchise Business</span>
          </h2>

          <p style={{ ...SANS, color: "#999", lineHeight: 1.85, fontSize: "0.97rem", marginBottom: 38 }}>
            Comprehensive Franchise Lead Generation Solutions. We help you
            identify and connect with the right franchise partners who share
            your vision, values, and ambition for mutual long-term growth.
          </p>
        </div>

        {/* Torn card */}
        <div
          style={{
            position: isDesktop ? "absolute" : "relative",
            marginBottom: "0px",
            right: isDesktop ? hPad : undefined,
            top: isDesktop ? "50%" : undefined,
            transform: isDesktop ? "translateY(-50%)" : undefined,
            width: isDesktop ? 320 : "100%",
            zIndex: 2,
            background: "#111",
            border: "1px solid rgba(212,168,42,0.25)",
            borderRadius: isDesktop ? 0 : 12,
            padding: isMobile ? "28px 20px 34px" : "38px 30px 50px",
            boxShadow: "8px 8px 40px rgba(0,0,0,0.7), 0 0 30px rgba(180,130,20,0.08)",
          }}
        >
          <h3 style={{ ...SERIF, fontSize: "1.15rem", marginBottom: 6, color: "#fff" }}>
            Why Choose Us
          </h3>
          <div
            style={{
              height: 1,
              background: "linear-gradient(90deg, #c89b2a, transparent)",
              marginBottom: 40,
              marginTop: 4,
            }}
          />
          {[
            "Targeted Lead Outreach",
            "Verified Franchise Leads",
            "SEO & PPC Campaigns",
            "CRM Integration",
            "Weekly Optimization",
            "Data-Driven Results",
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                marginBottom: 11,
                fontSize: "0.87rem",
                color: "#bbb",
                lineHeight: 1.5,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <CheckIcon />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════
          S5 Franchise Details
      ════════════════════════════════ */}
      <section style={{ padding: `${vPad}px ${hPad}`, background: "#080808" }}>
        <div
          style={{
            ...GLASS,
            padding: isMobile ? "36px 22px" : isTablet ? "40px 28px" : "64px 56px",
            display: "grid",
            gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr",
            gap: isDesktop ? 60 : 40,
            alignItems: "start",
          }}
        >
          {/* Left */}
          <div>
            <Eyebrow>Your Path to Success</Eyebrow>

            <h2
              style={{
                ...SERIF,
                fontSize: isMobile ? "1.7rem" : isTablet ? "2.1rem" : "2.6rem",
                lineHeight: 1.25,
                marginBottom: 20,
                color: "#fff",
              }}
            >
              Your Path to <span style={GOLD_TEXT}>Franchise Success</span>
            </h2>

            <p style={{ ...SANS, color: "#999", lineHeight: 1.85, fontSize: "0.97rem", marginBottom: 14 }}>
              At Govindani Infotech Pvt. Ltd., we understand the unique
              challenges and opportunities in the franchising industry. Our lead
              generation services are designed to help you identify and connect
              with potential franchisees, ensuring your business grows with the
              right partners who share your vision and values.
            </p>
            <p style={{ ...SANS, color: "#999", lineHeight: 1.85, fontSize: "0.97rem" }}>
              Our lead generation services for the real estate sector are
              designed to capture and convert high-intent prospects into
              valuable clients. We leverage advanced digital marketing
              techniques to attract potential buyers and renters, ensuring a
              steady stream of qualified leads for your properties.
            </p>
          </div>

          {/* Right */}
          <div>
            <Eyebrow>What We Offer</Eyebrow>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: "12px 16px",
                marginBottom: 36,
              }}
            >
              {[...franchiseChecks1, ...franchiseChecks2].map((item, i) => (
                <CheckItem key={i} text={item} fontSize="0.87rem" />
              ))}
            </div>

            <div style={{ ...GOLD_LINE, marginBottom: 28 }} />

            <div
              style={{
                display: "flex",
                gap: 36,
                flexWrap: "wrap",
                justifyContent: isMobile ? "center" : "flex-start",
                paddingTop: 8,
              }}
            >
              {[
                ["500+", "Leads / Month"],
                ["95%", "Client Retention"],
                ["3×", "ROI Average"],
              ].map(([num, label], i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      ...SERIF,
                      fontSize: "2.2rem",
                      fontWeight: 700,
                      background: "linear-gradient(120deg, #f5e27a, #c89b2a)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {num}
                  </div>
                  <div style={{ ...SANS, fontSize: "0.78rem", color: "#9e9e9e", marginTop: 4, letterSpacing: "0.05em" }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          S6 Results Cards
      ════════════════════════════════ */}
      <section style={{ padding: `${vPad}px ${hPad}`, background: "#060606" }}>
        <div style={{ textAlign: "center", marginBottom: 0 }}>
          <Eyebrow center>Performance</Eyebrow>

          <h2
            style={{
              ...SERIF,
              fontSize: isMobile ? "1.7rem" : isTablet ? "2.2rem" : "3rem",
              marginBottom: 12,
              color: "#fff",
            }}
          >
            Have a look at our{" "}
            <span style={GOLD_TEXT}>Lead Generation Results</span>
          </h2>

          <p style={{ ...SANS, color: "#9e9e9e", fontSize: "1rem", marginTop: 12 }}>Our Leads</p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3, 1fr)",
            gap: 24,
          }}
        >
          {[
            {
              tag: "Real Estate",
              title: "Real Estate Leads",
              desc: "High-intent buyers and renters captured through targeted digital campaigns across platforms.",
              img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Lead-Generation/Lead-Generation-Section6-img1.webp",
            },
            {
              tag: "Franchise",
              title: "Franchise Partner Leads",
              desc: "Qualified franchise inquiries from motivated business owners across India and beyond.",
              img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Lead-Generation/Lead-Generation-Section6-img2.webp",
            },
            {
              tag: "Industry",
              title: "B2B & Industry Leads",
              desc: "Decision-maker contacts in clothing, interior design, and more high-value verticals.",
              img: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Lead-Generation/Lead-Generation-Section6-Img3.webp",
            },
          ].map((card, i) => (
            <div
              key={i}
              style={{
                borderRadius: 12,
                overflow: "hidden",
                border: "1px solid rgba(212,168,42,0.15)",
                background: "#0f0f0f",
              }}
            >
              <img
                src={card.img}
                alt={card.title}
                style={{ width: "100%", height: 220, objectFit: "cover", display: "block" }}
              />
              <div style={{ padding: 26 }}>
                <span
                  style={{
                    display: "inline-block",
                    background: "rgba(212,168,42,0.1)",
                    border: "1px solid rgba(212,168,42,0.25)",
                    color: "#c89b2a",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    padding: "4px 12px",
                    borderRadius: 2,
                    marginBottom: 14,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {card.tag}
                </span>
                <h3 style={{ ...SERIF, fontSize: "1.1rem", marginBottom: 10, color: "#fff" }}>
                  {card.title}
                </h3>
                <p style={{ ...SANS, fontSize: "0.87rem", color: "#9e9e9e", lineHeight: 1.7 }}>
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>


      <ServiceSection />
      <ContactUsForm />
    </div>
  );
}