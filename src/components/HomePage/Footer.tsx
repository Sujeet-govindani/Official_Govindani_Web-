import React, { useEffect } from "react";

// ─── Elfsight Google Reviews Loader ───────────────────────────────────────
const ElfsightReviews = () => {
  useEffect(() => {
    if (document.querySelector('script[src="https://elfsightcdn.com/platform.js"]')) return;
    const script = document.createElement("script");
    script.src = "https://elfsightcdn.com/platform.js";
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return (
    <div
      className="elfsight-app-1d4e2f4c-43ab-4d6a-96f1-70a786ffd72f"
      data-elfsight-app-lazy=""
    />
  );
};

// ─── Inline Google Fonts ───────────────────────────────────────────────────
const FontLoader = () => (
  <style>{`

    :root {
      --gold-deep:    #b8860b;
      --gold-mid:     #c9a84c;
      --gold-bright:  #d4af37;
      --gold-light:   #e8d48b;
      --cream:        #f5ead4;
      --cream-dim:    #d9c9a8;
      --white:        #ffffff;
      --white-dim:    rgba(255,255,255,0.72);
      --bg-black:     #0a0a0a;
      --bg-card:      #111111;
      --bg-section:   #0d0d0d;
      --border-gold:  rgba(212,175,55,0.18);
      --border-cream: rgba(245,234,212,0.1);
    }

    .footer-root * { box-sizing: border-box; }

    .font-baskerville { font-family: 'Libre Baskerville', Georgia, serif; }
    .font-inter       { font-family: 'Inter', system-ui, sans-serif; }

    /* Gold rule */
    .gold-rule {
      border: none;
      height: 1px;
      background: linear-gradient(90deg, transparent 0%, var(--gold-mid) 30%, var(--gold-bright) 50%, var(--gold-mid) 70%, transparent 100%);
      opacity: 0.45;
    }

    /* Footer link hover */
    .footer-link {
      color: var(--white-dim);
      text-decoration: none;
      transition: color 0.25s ease, letter-spacing 0.25s ease;
      position: relative;
    }
    .footer-link::after {
      content: '';
      position: absolute;
      bottom: -2px; left: 0;
      width: 0; height: 1px;
      background: var(--gold-bright);
      transition: width 0.3s ease;
    }
    .footer-link:hover { color: var(--gold-light); letter-spacing: 0.02em; }
    .footer-link:hover::after { width: 100%; }

    /* City link hover */
    .city-link {
      color: rgba(245,234,212,0.55);
      text-decoration: none;
      transition: color 0.22s ease;
      white-space: nowrap;
    
        /* Lighthouse flags these as touch targets that are too small and
           too tightly packed. 24px is its minimum, and the padding also
           supplies the spacing it wants between adjacent targets. */
        display: inline-block;
        min-height: 24px;
        line-height: 24px;
        padding: 0 4px;
      }
    .city-link:hover { color: var(--gold-light); }

    /* Column heading */
    .col-heading {
      font-family: 'Libre Baskerville', Georgia, serif;
      color: var(--gold-bright);
      letter-spacing: 0.06em;
      font-size: 0.8rem;
      text-transform: uppercase;
      font-weight: 700;
    }

    /* Social icon ring */
    .social-btn {
      display: inline-flex; align-items: center; justify-content: center;
      width: 38px; height: 38px; border-radius: 50%;
      border: 1px solid var(--border-gold);
      color: #0a0a0a;
      background: linear-gradient(135deg, #d4af37 0%, #ffffff 100%);
      transition: border-color 0.25s, color 0.25s, transform 0.25s;
      text-decoration: none; font-size: 0.8rem;
    }
    .social-btn:hover {
      border-color: var(--white);
      color: #0a0a0a;
      background: linear-gradient(135deg, #ffffff 0%, #d4af37 100%);
      transform: translateY(-2px);
    }

    /* Noise grain overlay */
    .noise-overlay::before {
      content: '';
      position: absolute; inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
      opacity: 0.025;
      pointer-events: none;
      z-index: 0;
    }
    .footer-root { position: relative; }

    /* Bottom bar glow */
    .bottom-glow {
      background: linear-gradient(90deg, transparent, rgba(212,175,55,0.06) 30%, rgba(212,175,55,0.06) 70%, transparent);
    }

    /* Reviews section */
    .reviews-section {
      background: linear-gradient(180deg, #0a0a0a 0%, rgba(212,175,55,0.03) 100%);
      border-bottom: 1px solid rgba(212,175,55,0.15);
      border-top: 1px solid rgba(212,175,55,0.15);
      position: relative;
      overflow: hidden;
    }

    .elfsight-container-glow {
      position: relative;
      padding: 1.5rem;
      border-radius: 16px;
      background: rgba(10, 10, 10, 0.6);
      border: 1px solid rgba(212, 175, 55, 0.2);
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), inset 0 0 30px rgba(212, 175, 55, 0.05);
      backdrop-filter: blur(10px);
    }
    
    .elfsight-container-glow::before {
      content: '';
      position: absolute;
      inset: -1px;
      border-radius: 16px;
      background: linear-gradient(135deg, rgba(212,175,55,0.5), transparent 30%, transparent 70%, rgba(255,255,255,0.3));
      z-index: -1;
    }

    /* Aggressive Elfsight Inner Overrides for dark/golden theme */
    .elfsight-container-glow [class*="eapps-widget"] {
      background: transparent !important;
    }
    .elfsight-container-glow [class*="WidgetBackground__Container"] {
      background: transparent !important;
    }
    .elfsight-container-glow [class*="Review__Container"],
    .elfsight-container-glow [class*="eapps-google-reviews-item"] {
      background: #0d0d0d !important;
      border: 1px solid rgba(212,175,55,0.3) !important;
      border-radius: 12px !important;
      box-shadow: 0 4px 15px rgba(0,0,0,0.5) !important;
    }
    .elfsight-container-glow [class*="Text__Container"],
    .elfsight-container-glow [class*="eapps-google-reviews-item-text"] {
      color: rgba(245,234,212,0.85) !important;
      font-family: 'Inter', sans-serif !important;
    }
    .elfsight-container-glow [class*="Author__Name"],
    .elfsight-container-glow [class*="eapps-google-reviews-item-author-name"] {
      color: #d4af37 !important;
      font-family: 'Libre Baskerville', serif !important;
    }
    .elfsight-container-glow [class*="Badge__Container"] {
      background: linear-gradient(135deg, #d4af37, #ffffff) !important;
      color: #0a0a0a !important;
    }

    /* Override for Elfsight internal title if it exists */
    .elfsight-container-glow [class*="Header__Title"],
    .elfsight-container-glow [class*="Header__Name"],
    .elfsight-container-glow [class*="WidgetTitle"],
    .elfsight-container-glow [class*="Title-sc"] {
      color: #ffffff !important;
    }

    /* Elfsight widget dark override */
    .reviews-wrapper {
      max-width: 1400px;
      margin: 0 auto;
      padding: 3rem 2rem 2.5rem;
      position: relative;
      z-index: 1;
    }

    @media (max-width: 768px) {
      .footer-grid { 
        grid-template-columns: 1fr 1fr !important; 
        gap: 2.5rem 1.5rem !important;
      }
      .footer-col-services { grid-column: span 2; }
      
      .cities-container { gap: 0.5rem !important; }
      .city-row { gap: 0.5rem 0 !important; }
      .city-link { font-size: 0.75rem !important; min-height: 24px !important; line-height: 24px !important; padding: 0 4px !important; }
      .city-separator { margin: 0 0.35rem !important; font-size: 0.45rem !important; }

      /* Bottom Bar Mobile */
      .bottom-bar-content {
        flex-direction: column !important;
        align-items: center !important;
        text-align: center !important;
        gap: 1.5rem !important;
        padding-top: 2rem !important;
        padding-bottom: 3rem !important;
      }
      .legal-links-grid {
        display: grid !important;
        grid-template-columns: 1fr 1fr !important;
        gap: 0.8rem 2rem !important;
        width: 100% !important;
        justify-items: center !important;
      }

      .copyright-text {
        order: 2 !important;
      }
      .legal-links-wrapper {
        order: 1 !important;
      }

      /* Top Strip Mobile Centering */
      .footer-top-strip {
        flex-direction: column !important;
        align-items: center !important;
        text-align: center !important;
      }
      .brand-block {
        max-width: 100% !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
      }
      .logo-container {
        justify-content: center !important;
      }
      .social-newsletter-block {
        align-items: center !important;
      }
    }
    @media (max-width: 480px) {
      .footer-grid { 
        grid-template-columns: 1fr 1fr !important; 
        gap: 2rem 1rem !important;
      }
      .footer-col-services { grid-column: span 2; }
      /* Keep the 2-column layout as requested for Portfolio/Careers and Contact/Company */
    }
  `}</style>
);

// ─── Data ─────────────────────────────────────────────────────────────────
const SERVICES = [
  { label: "360° Virtual Tour", href: "/services/virtual-tours" },
  { label: "Advanced Checkout System", href: "/services/checkout-system" },
  { label: "AI Automation", href: "/services/ai-automation" },
  { label: "Ecommerce Platform Listing", href: "/services/marketplace-brand-listing" },
  { label: "Google Ads", href: "/services/google-ads" },
  { label: "Graphic Designer", href: "/services/graphic-designer" },
  { label: "Lead Generation", href: "/services/lead-generation" },
  { label: "Logistic Integration", href: "/services/logistic-integration" },
  { label: "Logo Designing", href: "/services/logo-designing" },
  { label: "Meta Ads", href: "/services/meta-ads" },
  { label: "Payment Gateway", href: "/services/payment-gateway" },
  { label: "Product Shoot", href: "/services/product-shoot" },
  { label: "SEO", href: "/services/seo" },
  { label: "Social Media Marketing", href: "/services/social-media" },
  { label: "Video Editing", href: "/services/video-editing" },
  { label: "Videography", href: "/services/videography" },
  { label: "Website Creation", href: "/services/website-creation" },
  { label: "WhatsApp Flow", href: "/services/whatsapp-flow" },
];


const PORTFOLIO = [
  { label: "Ngo-Portfolio", href: "/portfolio/ngo" },
  { label: "Real-Estate", href: "/portfolio/builders" },
  { label: "E-Commerce", href: "/portfolio/ecommerce" },
  { label: "HealthCare", href: "/portfolio/healthcare" },
  { label: "Business Website", href: "/portfolio/business" },
];

const CAREERS = [
  { label: "Open Positions", href: "/tech-roles" },
  { label: "Internships", href: "/tech-roles" },
  { label: "Culture & Values", href: "/about-us/about-company" },
];

const CONTACT = [
  { label: "92019 58271", href: "tel:+919201958271" },
  { label: "support@govindaniit.org", href: "mailto:support@govindaniit.org" },
  {
    label: "India: 2nd Floor, Landmark plaza, 206, Satara Rd, Pune, MH 411009",
    href: "https://www.google.com/maps/dir//Govindani+Infotech+Pvt.+Ltd.,+2nd+Floor,+Landmark+plaza,+206,+Satara+Rd,+in+front+of+city+pride+multiplex,+Adinath+Society,+Parvati+Industrial+Estate,+Parvati+Paytha,+Pune,+Maharashtra+411009/@18.4943555,73.8557952,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0xda5371ea3e28765:0xcdff9771e928393c!2m2!1d73.8568103!2d18.4884205?entry=ttu&g_ep=EgoyMDI2MDUwNi4wIKXMDSoASAFQAw%3D%3D"
  },
  {
    label: "USA: 30 N Gould St Ste N, Sheridan, WY 82801",
    href: "https://www.google.com/maps/search/?api=1&query=30+N+Gould+St+Ste+N,+Sheridan,+WY+82801,+USA"
  },
];


const COMPANY = [
  { label: "About Us", href: "/about-us/about-founder" },
  { label: "Our Story", href: "/about-us/about-company" },
  { label: "Case Studies", href: "/pages/case-study" },
];

const CITIES = [
  "Pune", "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata",
  "Ahmedabad", "Surat", "Jaipur", "Lucknow", "Kochi", "Chandigarh", "Nagpur",
  "Indore", "Bhopal", "Vadodara", "Coimbatore", "Visakhapatnam", "Noida",
];


// ─── Sub-components ────────────────────────────────────────────────────────
const LinkColumn: React.FC<{ title: string; links: { label: string; href: string }[] }> = ({ title, links }) => (
  <div style={{ minWidth: 0 }}>
    <p className="col-heading" style={{ marginBottom: "1.25rem" }}>{title}</p>
    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
      {links.map((l) => (
        <li key={l.label}>
          <a href={l.href} className="footer-link font-inter"
            style={{ fontSize: "0.78rem", fontWeight: 400, letterSpacing: "0.01em", lineHeight: 1.6 }}>
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

// ─── SVG Icons ─────────────────────────────────────────────────────────────
const IconFacebook = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>;
const IconLinkedin = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>;
const IconInsta = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>;
const IconYoutube = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12z" /></svg>;

// ─── Main Component ────────────────────────────────────────────────────────
export default function PremiumFooter() {
  const year = new Date().getFullYear();
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      await fetch("https://script.google.com/macros/s/AKfycbxaXavz15SJMeTef1SgZAvrAK4yZNkCVOuCInvCtns9vEgqzmYj1NWzaDs8t56TsoHp/exec", {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
          name: "Subscriber",
          experience: "N/A",
          phone: "N/A",
          email: email,
          subject: "Newsletter Subscription",
          message: `New newsletter subscription from: ${email}`,
        }),
      });

      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("Subscription error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <>
      <FontLoader />
      <footer
        className="footer-root noise-overlay"
        style={{
          background: "linear-gradient(180deg, #0a0a0a 0%, #080808 100%)",
          color: "#fff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ambient top glow */}
        <div style={{
          position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
          width: "60%", height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.55) 40%, rgba(212,175,55,0.55) 60%, transparent)",
          zIndex: 1,
        }} />

        {/* ═══════════════ SECTION 0: GOOGLE REVIEWS ═══════════════════ */}
        <div className="reviews-section" style={{ position: "relative", zIndex: 2 }}>
          {/* Subtle golden ambient glow behind the reviews */}
          <div style={{
            position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
            width: "80%", height: "80%",
            background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 60%)",
            pointerEvents: "none", zIndex: 0,
          }} />

        </div>

        {/* ═══════════════ SECTION 1: MAIN FOOTER ══════════════════════ */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "4rem 2rem 3.5rem" }}>

            {/* Top strip: logo + description on left, social on right */}
            <div className="footer-top-strip" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "2rem", marginBottom: "3.5rem" }}>

              {/* Brand block */}
              <div className="brand-block" style={{ maxWidth: "320px" }}>
                {/* Logo image + company name */}
                <div className="logo-container" style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.2rem" }}>
                  {/*
                    ── LOGO IMAGE ──
                    Replace the src below with your actual logo path.
                    e.g. src="/assets/govindani-logo.png"
                  */}
                  <img
                    src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/govindanilogomain.webp"
                    alt="Govindani Infotech"
                    style={{
                      height: "150px",
                      width: "auto",
                      objectFit: "contain",
                      flexShrink: 0,
                    }}
                  />

                </div>

                {/* Tagline */}


                {/* Description */}
                <p className="font-inter"
                  style={{ color: "rgba(245,234,212,0.58)", fontSize: "0.8rem", lineHeight: 1.8, fontWeight: 300 }}>
                  We craft premium digital experiences from bespoke web architectures to intelligent AI integrations for brands that refuse to settle for ordinary.
                </p>




              </div>

              {/* Social + newsletter */}
              <div className="social-newsletter-block" style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "1.2rem" }}>
                <p className="col-heading" style={{ fontSize: "0.7rem" }}>Follow Our Journey</p>
                <div style={{ display: "flex", gap: "0.6rem" }}>
                  {[
                    { icon: <IconLinkedin />, label: "Govindani Infotech on LinkedIn", href: "https://www.linkedin.com/company/govindani-infotech/?viewAsMember=true" },
                    { icon: <IconInsta />, label: "Govindani Infotech on Instagram", href: "https://www.instagram.com/govindani_infotech_pvt_ltd/" },
                    { icon: <IconFacebook />, label: "Govindani Infotech on Facebook", href: "https://www.facebook.com/people/Govindani-Infotech/100089453446845/" },
                    { icon: <IconYoutube />, label: "Govindani Infotech on YouTube", href: "https://www.youtube.com/channel/UCMPVJv_auCr-TAQiPFX1KZg" },
                  ].map((s, i) => (
                    <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="social-btn" aria-label={s.label} title={s.label}>{s.icon}</a>
                  ))}
                </div>

                {/* Newsletter */}
                <form onSubmit={handleSubscribe} style={{ display: "flex", gap: 0, borderRadius: "4px", overflow: "hidden", border: "1px solid var(--border-gold)" }}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Your email address"
                    className="font-inter"
                    style={{
                      background: "rgba(255,255,255,0.04)", border: "none", outline: "none",
                      padding: "0.55rem 0.9rem", color: "var(--cream-dim)",
                      fontSize: "0.75rem", width: "200px",
                    }}
                  />
                  <button
                    type="submit"
                    disabled={status === "loading" || status === "success"}
                    className="font-inter"
                    style={{
                      background: status === "success" ? "linear-gradient(135deg, #10b981, #059669)" : "linear-gradient(135deg, #c9a84c, #b8860b)",
                      border: "none", cursor: status === "loading" || status === "success" ? "not-allowed" : "pointer",
                      padding: "0 1rem", color: "#0a0a0a",
                      fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.06em",
                    }}>
                    {status === "loading" ? "..." : status === "success" ? "SUBSCRIBED" : "SUBSCRIBE"}
                  </button>
                </form>

              </div>
            </div>

            {/* Gold rule */}
            <hr className="gold-rule" style={{ marginBottom: "3.5rem" }} />

            {/* ── Link columns grid ── */}
            <div
              className="footer-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "2.2fr 1fr 1fr 1fr 1.1fr",
                gap: "2.5rem 2rem",
              }}
            >
              {/* SERVICES wide column with 2-col layout */}
              <div className="footer-col-services">
                <p className="col-heading" style={{ marginBottom: "1.25rem" }}>Services</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem 2.5rem" }}>
                  {SERVICES.map((l) => (
                    <a key={l.label} href={l.href} className="footer-link font-inter"
                      style={{ fontSize: "0.78rem", fontWeight: 400, letterSpacing: "0.01em", lineHeight: 1.4, whiteSpace: "nowrap" }}>
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>


              <div className="footer-col-portfolio">
                <LinkColumn title="Portfolio" links={PORTFOLIO} />
              </div>
              <div className="footer-col-careers">
                <LinkColumn title="Careers" links={CAREERS} />
              </div>
              <div className="footer-col-contact">
                <LinkColumn title="Contact" links={CONTACT} />
              </div>
              <div className="footer-col-company">
                <LinkColumn title="Company" links={COMPANY} />
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════ SECTION 2: CITY LINKS (ALL SERVICES) ════════ */}
        <div style={{
          position: "relative", zIndex: 2,
          borderTop: "1px solid rgba(212,175,55,0.1)",
          background: "linear-gradient(180deg, rgba(212,175,55,0.02) 0%, transparent 100%)",
        }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "2.8rem 2rem" }}>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
              <div style={{ width: "28px", height: "1px", background: "var(--gold-bright)", opacity: 0.5 }} />
              <p className="font-baskerville"
                style={{ color: "rgba(212,175,55,0.7)", fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase", margin: 0 }}>
                Serving Across India
              </p>
              <div style={{ flex: 1, height: "1px", background: "var(--border-gold)" }} />
            </div>

            {/* Was 18 services x 20 cities = 360 links: 720 DOM nodes, 29% of the
                whole page, and the cause of both the touch-target and legible-font
                audit failures. It also read as doorway linking. The geographic
                signal is kept; the link farm is not. */}
            <div className="cities-container" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.35rem 0" }}>
              {CITIES.map((city, idx) => (
                <React.Fragment key={city}>
                  <span className="city-link font-inter"
                    style={{ fontSize: "0.75rem", fontWeight: 400, letterSpacing: "0.01em" }}>
                    {city}
                  </span>
                  {idx < CITIES.length - 1 && (
                    <span className="city-separator" style={{
                      color: "rgba(212,175,55,0.25)", margin: "0 0.55rem",
                      fontSize: "0.55rem", alignSelf: "center", userSelect: "none",
                    }}>◆</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* ═══════════════ BOTTOM BAR ═══════════════════════════════════ */}
        <div className="bottom-glow" style={{
          position: "relative", zIndex: 2,
          borderTop: "1px solid rgba(212,175,55,0.12)",
        }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "2.5rem 2rem" }}>
            <div className="bottom-bar-content" style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              textAlign: "center", gap: "1.8rem",
            }}>
              <div className="legal-links-wrapper legal-links-grid" style={{ display: "flex", gap: "1.8rem", flexWrap: "wrap", justifyContent: "center" }}>
                {[
                  { t: "Terms of Service", h: "/terms-of-service" },
                  { t: "Privacy Policy", h: "/privacy-policy" },
                  { t: "Cookie Policy", h: "/cookie-policy" },
                  { t: "Sitemap", h: "/sitemap" }
                ].map((link) => (
                  <a key={link.t} href={link.h} className="font-inter"
                    style={{ color: "rgba(245,234,212,0.7)", fontSize: "0.75rem", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold-light)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,234,212,0.3)")}>
                    {link.t}
                  </a>
                ))}
              </div>

              <a href="/" className="font-inter copyright-text"
                style={{ color: "rgba(245,234,212,0.7)", fontSize: "0.75rem", fontWeight: 300, margin: 0, textDecoration: "none" }}>
                © {year} Govindani Infotech Pvt. Ltd. All rights reserved.
              </a>


            </div>
          </div>
        </div>

        {/* Bottom ambient glow */}
        <div style={{
          position: "absolute", bottom: "0", left: "50%", transform: "translateX(-50%)",
          width: "300px", height: "80px",
          background: "radial-gradient(ellipse, rgba(212,175,55,0.07) 0%, transparent 70%)",
          pointerEvents: "none", zIndex: 1,
        }} />
      </footer>
    </>
  );
}