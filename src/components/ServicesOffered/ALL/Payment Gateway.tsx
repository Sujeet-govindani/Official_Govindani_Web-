import { useState, useRef, useEffect } from "react";
import ContactUsForm from "@/pages/ContactUsForm";
import ServiceSection from "@/components/HomePage/ServicesSection";

interface Gateway {
  name: string;
  logo: string | React.ReactNode;
  isFullColor?: boolean;
}

const GATEWAYS: Gateway[] = [
  { name: "Stripe", logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/StripeLogo.png" },
  { name: "PayPal", logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PayPalLogo.png" },
  { name: "Razorpay", logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Razorpay-logo.png", isFullColor: true },
  { name: "Square", logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ShipdelightLogo.webp" },
  { name: "Braintree", logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/shiprocket.webp" },
  { name: "Adyen", logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ShipwayLogo.webp" },
  { name: "Klarna", logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/signzy-logo.png" },
  { name: "Authorize", logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/woocomm.png" },
  { name: "WorldPay", logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/zoho.webp" },
  { name: "Checkout", logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/QuickBookLogo.png" },
  { name: "2Checkout", logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PhonePe-Logo.png" },
  { name: "2Checkout", logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/nimbusLogo.webp" },
  { name: "2Checkout", logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Bluedart-logo.png" },
  { name: "2Checkout", logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Cashfree-logo.png" },
  { name: "2Checkout", logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Hubspot-logo.png" },
];

const FEATURES = [
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>,
    title: "Lightning Fast",
    desc: "Sub-second transaction processing with 99.99% uptime SLA.",
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
    title: "PCI DSS Level 1",
    desc: "Bank-grade encryption protecting every transaction end to end.",
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 010 20 15.3 15.3 0 010-20" /></svg>,
    title: "Global Reach",
    desc: "Accept payments in 135+ currencies across 180+ countries.",
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.21 15.89A10 10 0 118 2.83M22 12A10 10 0 0012 2v10z" /></svg>,
    title: "Smart Analytics",
    desc: "Real-time dashboards with chargeback and fraud intelligence.",
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6" /></svg>,
    title: "Simple Integration",
    desc: "REST APIs, SDKs for all major stacks live in under a day.",
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" /></svg>,
    title: "24 / 7 Support",
    desc: "Dedicated integration engineers on call around the clock.",
  },
];

const STEPS = [
  { n: "01", title: "Create Account", desc: "Register and complete KYB/KYC in minutes." },
  { n: "02", title: "API Keys", desc: "Obtain sandbox and production credentials." },
  { n: "03", title: "Integrate SDK", desc: "Drop our SDK into your stack with a single import." },
  { n: "04", title: "Test & Go Live", desc: "Run test transactions, flip the switch, and ship." },
];

const TERMS = [
  "All transactions are subject to applicable tax laws and regulatory compliance.",
  "Merchant agrees to maintain PCI DSS compliance within their own infrastructure.",
  "Refunds and chargebacks are governed by the card network and gateway policies.",
  "Service availability is subject to our 99.99% uptime SLA, excluding scheduled maintenance.",
  "Integration credentials must not be shared; merchants are liable for credential misuse.",
  "We reserve the right to suspend accounts that violate our acceptable-use policy.",
];

function StarRating() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          onClick={() => setRating(s)}
          onMouseEnter={() => setHover(s)}
          onMouseLeave={() => setHover(0)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 28,
            color: (hover || rating) >= s ? "#D4AF37" : "#444",
            transition: "color .2s, transform .2s",
            transform: hover >= s ? "scale(1.25)" : "scale(1)",
            padding: 0,
          }}
          aria-label={`Rate ${s} stars`}
        >
          ★
        </button>
      ))}
      {rating > 0 && (
        <span style={{ color: "#D4AF37", fontFamily: "Inter, sans-serif", fontSize: 13, marginLeft: 8 }}>
          {["", "Poor", "Fair", "Good", "Great", "Excellent"][rating]}
        </span>
      )}
    </div>
  );
}

function IconSlider({ gateways }: { gateways: Gateway[] }) {
  const items = [...gateways, ...gateways];
  return (
    <div style={{ width: "100%", overflow: "hidden", position: "relative", padding: "24px 0" }}>
      <div
        style={{
          position: "absolute", left: 0, top: 0, width: 120, height: "100%",
          background: "linear-gradient(to right, #000, transparent)",
          zIndex: 2, pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute", right: 0, top: 0, width: 120, height: "100%",
          background: "linear-gradient(to left, #000, transparent)",
          zIndex: 2, pointerEvents: "none",
        }}
      />
      <div
        className="slider-track"
        style={{
          display: "flex",
          gap: 32,
          width: "max-content",
          animation: "slideLeft 28s linear infinite",
        }}
      >
        {items.map((g, i) => (
          <div
            key={i}
            title={g.name}
            className="slider-item"
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, flexShrink: 0 }}
          >
            <div
              style={{ width: 120, height: 80, display: "flex", alignItems: "center", justifyContent: "center", transition: "transform .3s" }}
              className="icon-card"
            >
              {typeof g.logo === "string" ? (
                <img
                  src={g.logo}
                  alt={g.name}
                  style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "12px" }}
                  onError={(e) => {
                    const parent = (e.currentTarget as HTMLImageElement).closest('.slider-item');
                    if (parent) (parent as HTMLElement).style.display = 'none';
                  }}
                />
              ) : (
                <div style={{ color: "#D4AF37" }}>{g.logo}</div>
              )}
              <span
                style={{ position: "absolute", color: "#D4AF37", fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 18, display: "none" }}
                className="fallback-label"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PaymentGatewayPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        heroRef.current.style.backgroundPositionY = `${window.scrollY * 0.3}px`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="service-page">
      <style>{`

        *, *::before, *::after { box-sizing: border-box; }
body {
          margin: 0;
          background: #000;
          color: #F5F0E8;
          font-family: 'Inter', sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        .service-page { padding-top: 100px; }

        .service-section {
          padding: 80px clamp(20px, 5vw, 80px);
        }

        @keyframes slideLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-gold {
          0%, 100% { box-shadow: 0 0 0 0 rgba(212,175,55,0); }
          50%       { box-shadow: 0 0 0 12px rgba(212,175,55,0.08); }
        }
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }

        .animate-up { animation: fadeUp 0.8s ease both; }
        .icon-card:hover { transform: translateY(-4px) scale(1.1) !important; }
        .feature-card:hover {
          border-color: rgba(212,175,55,0.5) !important;
          background: rgba(255,255,255,0.07) !important;
          transform: translateY(-4px) !important;
        }
        .step-node:hover {
          background: linear-gradient(135deg,#D4AF37,#F5E27A) !important;
          color: #000 !important;
        }
        input:focus, textarea:focus {
          border-color: rgba(212,175,55,0.6) !important;
          box-shadow: 0 0 0 3px rgba(212,175,55,0.12);
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }

        @media (max-width: 768px) {
          .service-page { padding-top: 100px !important; }

          .hero-section {
            padding-top: 180px !important;
            padding-bottom: 20px !important;
            min-height: auto !important;
          }

          .service-section { padding: 40px 20px !important; }
          /* font-size removed: the global type scale in index.css owns heading sizes */
          .three-col { grid-template-columns: 1fr 1fr !important; }
          .form-inner { padding: 32px 20px !important; }
          .step-grid { grid-template-columns: 1fr 1fr !important; }
          .summary-section { padding-top: 20px !important; }
          .slider-section { padding: 30px 0 !important; }
          .step-item { align-items: center !important; text-align: center !important; }
        }

        @media (max-width: 480px) {
          .three-col { grid-template-columns: 1fr !important; }
          .step-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        id="hero"
        className="hero-section"
        style={{
          minHeight: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          /* ✅ FIX: 220px top clears the fixed navbar on desktop, 20px bottom removes gap */
          padding: "220px clamp(20px,5vw,80px) 20px",
          position: "relative",
          overflow: "hidden",
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,175,55,0.08) 0%, transparent 70%), #000",
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: i === 0 ? 400 : i === 1 ? 200 : 300,
              height: i === 0 ? 400 : i === 1 ? 200 : 300,
              borderRadius: "50%",
              background: `rgba(212,175,55,${0.02 + i * 0.01})`,
              border: "1px solid rgba(212,175,55,0.06)",
              top: i === 0 ? "10%" : i === 1 ? "60%" : "30%",
              left: i === 0 ? "-8%" : i === 1 ? "80%" : "85%",
              pointerEvents: "none",
              animation: `pulse-gold ${4 + i}s ease-in-out infinite`,
            }}
          />
        ))}

        <div style={{ maxWidth: 820, position: "relative", zIndex: 1 }}>
          <h1
            className="hero-title"
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: "clamp(40px,6vw,72px)",
              fontWeight: 700,
              lineHeight: 1.1,
              color: "#F5F0E8",
              marginTop: "50px",
              marginBottom: "50px",
              animation: "fadeUp .7s .1s ease both",
              opacity: 0,
              animationFillMode: "forwards",
            }}
          >
            Seamless Payment Gateway
            <br />
            <span
              style={{
                background: "linear-gradient(90deg,#D4AF37,#F5E27A,#B8860B)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Integration, Elevated.
            </span>
          </h1>

          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(15px,2vw,18px)",
              color: "#9A8060",
              lineHeight: 1.8,
              maxWidth: 560,
              /* ✅ FIX: removed bottom margin so no empty space below subtitle */
              margin: "0 auto 0",
              animation: "fadeUp .7s .2s ease both",
              opacity: 0,
              animationFillMode: "forwards",
            }}
          >
            Connect your platform to the world's leading payment networks.
            Secure, intelligent, and built for scale from day one.
          </p>
        </div>
      </section>

      {/* ── ICON SLIDER ── */}
      <section
        className="slider-section"
        style={{
          padding: "60px 0",
          background: "rgba(255,255,255,0.015)",
          borderTop: "1px solid rgba(212,175,55,0.08)",
          borderBottom: "1px solid rgba(212,175,55,0.08)",
        }}
      >
        <p
          style={{
            textAlign: "center",
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(12px, 2vw, 14px)",
            letterSpacing: "0.2em",
            color: "#D4AF37",
            marginBottom: 32,
            textTransform: "uppercase",
            fontWeight: 600,
            opacity: 0.9,
          }}
        >
          Supported Gateways & Integration Partners
        </p>
        <IconSlider gateways={GATEWAYS} />
      </section>

      {/* ── FEATURES ── */}
      <section
        id="features"
        className="service-section"
        style={{ maxWidth: 1200, margin: "0 auto" }}
      >
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ color: "#D4AF37", fontFamily: "Inter, sans-serif", fontSize: 11, letterSpacing: "0.18em", marginBottom: 12 }}>
            WHY PAYVAULT
          </p>
          <h2
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: "clamp(28px,4vw,44px)",
              color: "#F5F0E8",
              margin: 0,
            }}
          >
            Infrastructure Built for Ambition
          </h2>
        </div>

        <div
          className="three-col"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}
        >
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className="feature-card"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(212,175,55,0.12)",
                borderRadius: 20,
                padding: "32px 28px",
                backdropFilter: "blur(10px)",
                transition: "all .3s",
                cursor: "default",
              }}
            >
              <div
                style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: "rgba(212,175,55,0.08)",
                  border: "1px solid rgba(212,175,55,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#D4AF37", marginBottom: 20,
                }}
              >
                {f.icon}
              </div>
              <h3 style={{ fontFamily: "'Libre Baskerville', serif", color: "#F5F0E8", fontSize: 18, margin: "0 0 10px" }}>
                {f.title}
              </h3>
              <p style={{ fontFamily: "Inter, sans-serif", color: "#fff", fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── INTEGRATION STEPS ── */}
      <section
        id="integrate"
        className="service-section"
        style={{
          paddingTop: "40px",
          background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(212,175,55,0.04) 0%, transparent 70%)",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ color: "#D4AF37", fontFamily: "Inter, sans-serif", fontSize: 11, letterSpacing: "0.18em", marginBottom: 12 }}>
              ONBOARDING
            </p>
            <h2
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "clamp(28px,4vw,44px)",
                color: "#F5F0E8",
                margin: 0,
              }}
            >
              Go Live in Four Steps
            </h2>
          </div>

          <div className="step-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
            {STEPS.map((s, i) => (
              <div key={i} className="step-item" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", position: "relative" }}>
                {i < STEPS.length - 1 && (
                  <div
                    style={{
                      position: "absolute", top: 28, right: "-12px",
                      width: "calc(100% - 56px)", height: 1,
                      background: "linear-gradient(to right, rgba(212,175,55,0.3), transparent)",
                      display: "none",
                    }}
                    className="step-connector"
                  />
                )}
                <div
                  className="step-node"
                  style={{
                    width: 56, height: 56, borderRadius: 14,
                    background: "rgba(212,175,55,0.08)",
                    border: "1px solid rgba(212,175,55,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Libre Baskerville', serif",
                    fontSize: 18, color: "#D4AF37", fontWeight: 700,
                    marginBottom: 20, transition: "all .3s", cursor: "default",
                  }}
                >
                  {s.n}
                </div>
                <h3 style={{ fontFamily: "'Libre Baskerville', serif", color: "#F5F0E8", fontSize: 17, margin: "0 0 8px" }}>
                  {s.title}
                </h3>
                <p style={{ fontFamily: "Inter, sans-serif", color: "#6B5A45", fontSize: 13, lineHeight: 1.7, margin: 0 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TERMS ── */}
      <section id="terms" className="service-section" style={{ paddingTop: "40px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ color: "#D4AF37", fontFamily: "Inter, sans-serif", fontSize: 11, letterSpacing: "0.18em", marginBottom: 12 }}>
            LEGAL
          </p>
          <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(28px,4vw,40px)", color: "#F5F0E8", margin: 0 }}>
            Terms &amp; Conditions
          </h2>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(212,175,55,0.14)",
            borderRadius: 20,
            padding: "40px 44px",
            backdropFilter: "blur(10px)",
          }}
        >
          {TERMS.map((t, i) => (
            <div
              key={i}
              style={{
                display: "flex", gap: 18, padding: "18px 0",
                borderBottom: i < TERMS.length - 1 ? "1px solid rgba(212,175,55,0.07)" : "none",
                alignItems: "flex-start",
              }}
            >
              <span style={{ color: "#D4AF37", fontFamily: "'Libre Baskerville', serif", fontSize: 13, fontWeight: 700, flexShrink: 0, marginTop: 2, opacity: 0.7 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <p style={{ fontFamily: "Inter, sans-serif", color: "#fff", fontSize: 14, lineHeight: 1.75, margin: 0 }}>
                {t}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SUMMARY ── */}
      <section className="service-section summary-section" style={{ paddingTop: "40px", maxWidth: 860, margin: "0 auto" }}>
        <div
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(212,175,55,0.14)",
            borderRadius: 24,
            padding: "56px 48px",
            backdropFilter: "blur(10px)",
            textAlign: "center",
          }}
        >
          <div style={{ width: 64, height: 3, background: "linear-gradient(90deg,#D4AF37,#F5E27A)", borderRadius: 2, margin: "0 auto 28px" }} />
          <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(22px,3vw,32px)", color: "#F5F0E8", margin: "0 0 20px" }}>
            Payment Gateway, Simplified
          </h2>
          <p style={{ fontFamily: "Inter, sans-serif", color: "#fff", fontSize: 15, lineHeight: 1.9, margin: "0 auto", maxWidth: 640 }}>
            PayVault bridges your platform to a curated network of the world's most trusted payment
            processors. With a single unified API, you gain access to fraud prevention, multi-currency
            settlement, real time webhooks, and PCI-compliant token vaulting without managing
            individual gateway contracts. Whether you're scaling a marketplace, SaaS product, or
            e commerce store, our infrastructure grows with you from first transaction to billions.
          </p>
          <div style={{ marginTop: 36, display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap" }}>
            {[["135+", "Currencies"], ["180+", "Countries"], ["99.99%", "Uptime"], ["<1s", "Latency"]].map(
              ([val, label]) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 30, color: "#fff", fontWeight: 700 }}>
                    {val}
                  </div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#5A4A35", letterSpacing: "0.1em", marginTop: 4 }}>
                    {label}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <ContactUsForm />
      <ServiceSection />
    </div>
  );
}