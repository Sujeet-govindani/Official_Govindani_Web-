import { useFadeInOnScroll } from "@/hooks/use-fade-in";
import ContactUsForm from "@/pages/ContactUsForm";
import { ArrowRight, X, Check, PhoneCall, PhoneIncoming, TrendingUp, Eye, Lock, Brain, LayoutDashboard, Headphones, ShoppingBag, MessageSquare, Shield } from "lucide-react";

// ─────────────────────────────────────────────────────────────────
//  IMAGE CONFIGURATION
// ─────────────────────────────────────────────────────────────────
const IMAGES = {
  hero: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Wp1.webp",
  builtForTeams: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Wp2.webp",
  pricing: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/WP3.webp",

  bgHero: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/bg-hero.webp",
  bgWhy: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/bg-why.webp",
  bgComplete: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/bg-complete.webp",
  bgTeams: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/bg-teams.webp",
  bgTable: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/bg-table.webp",
  bgPricing: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/bg-pricing.webp",
  bgCta: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/bg-cta.webp",

  cardPickup: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=60",
  cardQuality: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=60",
  cardInsights: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=60",
  cardOneNumber: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=60",
  cardPickupRate: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=60",
  cardOptIns: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=60",
  cardCrmIntel: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=60",
  cardOneInbox: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=600&q=60",
};

// ─────────────────────────────────────────────────────────────────
//  SECTION BACKGROUND OVERLAY
// ─────────────────────────────────────────────────────────────────
const SectionBg = ({ src, opacity = 0.08 }: { src: string; opacity?: number }) => (
  <div className="absolute inset-0 w-full h-full pointer-events-none select-none" aria-hidden="true" style={{ zIndex: 0 }}>
    <img src={src} alt="" className="w-full h-full object-cover" style={{ opacity }} loading="lazy" />
    <div className="absolute inset-0 bg-background/70" />
  </div>
);

// ─────────────────────────────────────────────────────────────────
//  TEAL ICON COMPONENT
// ─────────────────────────────────────────────────────────────────
const TealIcon = ({ icon: Icon, size = "md" }: { icon: React.ElementType; size?: "sm" | "md" }) => {
  const dim = size === "sm" ? "w-11 h-11" : "w-14 h-14";
  const iconDim = size === "sm" ? "w-5 h-5" : "w-6 h-6";
  return (
    <div className={`${dim} rounded-full flex items-center justify-center shrink-0`} style={{ background: "rgba(0,200,170,0.15)" }}>
      <Icon className={iconDim} style={{ color: "#00b894" }} />
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────
//  SWIPE CARD
// ─────────────────────────────────────────────────────────────────
const SwipeCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`card-premium swipe-card ${className}`} style={{ "--swipe-color": "rgba(255,255,255,0.06)" } as React.CSSProperties}>
    <span className="swipe-shine" aria-hidden="true" />
    {children}
  </div>
);

// ─────────────────────────────────────────────────────────────────
//  GOLD BUTTON
// ─────────────────────────────────────────────────────────────────
const GoldBtn = ({ children, outline = false }: { children: React.ReactNode; outline?: boolean }) => (
  <button
    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-0.5"
    style={{
      fontSize: "16px",
      ...(outline
        ? { border: "1px solid #c9961a", color: "#d4a827", background: "transparent", boxShadow: "0 0 18px rgba(201,150,26,0.15)" }
        : { background: "linear-gradient(135deg,#c9961a,#e8c04a,#c9961a)", color: "#000", boxShadow: "0 4px 24px rgba(201,150,26,0.3)" }
      )
    }}
  >
    {children}
  </button>
);

// ─────────────────────────────────────────────────────────────────
//  PAGE
// ─────────────────────────────────────────────────────────────────
const WhatsAppVoiceCalling = () => {
  const containerRef = useFadeInOnScroll();

  return (
    <>
      <style>{`
        /* ── Headings font: Libre Baskerville ── */
        h1, h2, h3, h4, .font-heading {
          font-family: 'Libre Baskerville', serif !important;
          font-weight: 700 !important;
        }
          .wa-voice-page section:first-of-type {
    margin-top: 0px !important;
    padding-top: 0 !important;
}
          

        /* ── NEW GOLD GRADIENT FOR ALL HEADINGS & GOLD TEXT CLASSES ── */
        h1, h2, h3, h4, .font-heading,
        .text-gradient-gold,
        .text-gradient-gold-pure {
          background: linear-gradient(135deg, #f5d87a 0%, #e8b84b 30%, #fff8e7 55%, #c8922a 80%, #f5d87a 100%) !important;
          -webkit-background-clip: text !important;
          background-clip: text !important;
          color: transparent !important;
        }

        /* ── Card background image ── */
        .card-bg-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          border-radius: inherit;
          opacity: 0.09;
          pointer-events: none;
          transition: opacity 0.4s ease;
          z-index: 0;
        }
        .swipe-card:hover .card-bg-img { opacity: 0.15; }
        .swipe-card > *:not(.swipe-shine):not(.card-bg-img) { position: relative; z-index: 1; }

        /* ── Compact card padding ── */
        .card-compact { padding: 1.25rem !important; }

        /* ── Swipe / shimmer ── */
        .swipe-card { position: relative; overflow: hidden; }
        .swipe-shine {
          position: absolute; inset: 0;
          background: linear-gradient(120deg, transparent 0%, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%, transparent 100%);
          transform: translateX(-100%);
          transition: transform 0.55s ease;
          pointer-events: none;
          border-radius: inherit;
        }
        .swipe-card:hover .swipe-shine { transform: translateX(100%); }
        .swipe-card:hover {
          border-color: hsl(43 74% 49% / 0.45) !important;
          box-shadow: 0 6px 36px -6px hsl(43 74% 49% / 0.22) !important;
          transform: translateY(-3px);
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
        }

        /* ── Fix gradient-text clipping ── */
        .text-gradient-gold,
        .text-gradient-gold-pure {
          padding-bottom: 0.2em;
          margin-bottom: -0.2em;
          display: inline-block;
        }

        /* ── Shimmer-wave ── */
        .shimmer-wave-safe {
          position: relative;
          overflow: visible !important;
          display: block !important;
          padding-bottom: 0.2em;
        }
        .shimmer-wave-safe::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, hsla(0,0%,100%,0.08), hsla(0,0%,100%,0.15), hsla(0,0%,100%,0.08), transparent);
          animation: shimmer 4s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes shimmer { 0% { left: -100%; } 100% { left: 200%; } }

        /* ── Animated dashed divider ── */
        @keyframes dashMove {
          0%   { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -22; }
        }

        /* ── "Why Businesses" card: mobile horizontal dividers ── */
        @media (max-width: 767px) {
          .why-cell + .why-cell {
            border-top: 1px solid hsl(43 74% 49% / 0.15);
          }
        }

        /* ── Hero: NO gap at top ── */
        .section-hero {
          padding-top: 0 !important;
          margin-top: 0 !important;
        }

        /* ── Page wrapper: kill any inherited gap ── */
        .page-wrapper {
          margin-top: 0 !important;
          padding-top: 0 !important;
        }

        /* ── All other sections: consistent padding ── */
        .section-rest { 
          padding-top: 3rem; 
          padding-bottom: 3rem; 
        }
        @media (min-width: 768px) { 
          .section-rest { 
            padding-top: 5rem; 
            padding-bottom: 5rem; 
          } 
        }
        .section-pricing {
          padding-bottom: 1.5rem !important;
        }

        /* ── Mobile tighten ── */
        @media (max-width: 767px) {
          .divider-gold { margin: 0 !important; padding: 0 !important; }
          .section-rest { 
            padding-top: 3rem; 
            padding-bottom: 3rem; 
          }
          .section-pricing {
            padding-bottom: 1rem !important;
          }
          .fade-section.text-center.mb-16 { margin-bottom: 1.5rem !important; }
          
          /* Ensure hero container padding on mobile */
          .section-hero .container {
            padding-top: 4rem !important;
          }
        }

        /* ── Contact Form Section ── */
        .section-contact {
          padding-top: 0;
          padding-bottom: 4rem;
        }
        @media (min-width: 768px) {
          .section-contact {
            padding-top: 0;
            padding-bottom: 6rem;
          }
        }
      `}</style>

      {/* ── page-wrapper: zero margin/padding so hero sits flush under navbar ── */}
      <div
        ref={containerRef}
        className="wa-voice-page page-wrapper min-h-screen bg-background font-body"
        style={{ marginTop: 0, paddingTop: 0 }}
      >

        {/* ══════════════════════════════════════════════════════════
            HERO flush under navbar, no gap
        ══════════════════════════════════════════════════════════ */}
        <section className="section-hero relative overflow-hidden pb-10 md:pb-14">
          <SectionBg src={IMAGES.bgHero} opacity={0.1} />
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(43_74%_49%_/_0.06)_0%,_transparent_60%)]"
            style={{ zIndex: 1 }}
          />
          {/* paddingTop here = navbar height so text isn't hidden behind it */}
          <div
            className="container mx-auto px-6 relative"
            style={{ zIndex: 2, paddingTop: "8rem" }}
          >
            <div className="fade-section max-w-4xl mx-auto text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-gold-light mb-6 font-body">

              </p>
              <h3 className="font-heading font-bold text-3xl md:text-2xl lg:text-4xl leading-tight mb-6 shimmer-wave text-gradient-gold">
                WhatsApp Business Calling<br />
                Centralize & Track Every Call
              </h3>
              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                Enable your team to make and receive WhatsApp calls from a single number. Access call
                recordings, AI summaries, and track agent performance, all in one place.
              </p>
            </div>

            {/* ── HERO IMAGE ── */}
            <div className="fade-section mt-10 w-full max-w-5xl mx-auto">
              <img
                src={IMAGES.hero}
                alt="WhatsApp Business Calling agent dashboard with AI call summary"
                className="w-full h-auto object-contain"
                loading="eager"
              />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            WHY BUSINESSES ARE MOVING
        ══════════════════════════════════════════════════════════ */}
        <section className="section-rest relative overflow-hidden">
          <SectionBg src={IMAGES.bgWhy} opacity={0.07} />
          <div className="container mx-auto px-6 relative" style={{ zIndex: 2 }}>

            <div className="fade-section text-center mb-10">
              <h2 className="font-heading font-bold text-3xl md:text-2xl lg:text-4xl leading-tight mb-6 shimmer-wave text-gradient-gold">
                Why Businesses Are Moving Calls to WhatsApp
              </h2>
              <br /><br />
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Customers trust WhatsApp more than unknown phone numbers. Businesses using WhatsApp-native calling see:
              </p>
            </div>

            <div className="fade-section max-w-4xl mx-auto">
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{ border: "1px solid hsl(43 74% 49% / 0.2)", background: "hsl(0 0% 6%)" }}
              >
                <img
                  src={IMAGES.cardPickup} alt="" aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
                  style={{ opacity: 0.07 }}
                />
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-3">

                  <div className="why-cell flex flex-col items-center text-center px-8 py-10 transition-colors duration-300 hover:bg-white/[0.03]">
                    <div className="mb-5"><TealIcon icon={PhoneIncoming} /></div>
                    <h3 className="font-heading font-bold text-lg text-foreground leading-snug">Higher call pickup rates</h3>
                  </div>

                  <div className="hidden md:block absolute top-0 bottom-0" style={{ left: "calc(100% / 3)", width: "1px" }}>
                    <svg width="1" height="100%" style={{ position: "absolute", inset: 0 }}>
                      <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="hsl(43 74% 49% / 0.45)" strokeWidth="1" strokeDasharray="6 5" style={{ strokeDashoffset: 0, animation: "dashMove 1.6s linear infinite" }} />
                    </svg>
                  </div>

                  <div className="why-cell flex flex-col items-center text-center px-8 py-10 transition-colors duration-300 hover:bg-white/[0.03]">
                    <div className="mb-5"><TealIcon icon={Eye} /></div>
                    <h3 className="font-heading font-bold text-lg text-foreground leading-snug">Easier Quality Monitoring</h3>
                  </div>

                  <div className="hidden md:block absolute top-0 bottom-0" style={{ left: "calc(200% / 3)", width: "1px" }}>
                    <svg width="1" height="100%" style={{ position: "absolute", inset: 0 }}>
                      <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="hsl(43 74% 49% / 0.45)" strokeWidth="1" strokeDasharray="6 5" style={{ strokeDashoffset: 0, animation: "dashMove 1.6s linear infinite" }} />
                    </svg>
                  </div>

                  <div className="why-cell flex flex-col items-center text-center px-8 py-10 transition-colors duration-300 hover:bg-white/[0.03]">
                    <div className="mb-5"><TealIcon icon={TrendingUp} /></div>
                    <h3 className="font-heading font-bold text-lg text-foreground leading-snug">Better Call Insights</h3>
                  </div>

                </div>
              </div>
            </div>

            <div className="fade-section mt-6 max-w-4xl mx-auto">
              <div className="rounded-xl py-4 px-6 text-center font-semibold" style={{ background: "var(--gradient-gold)" }}>
                <span className="text-primary-foreground text-base">When calls happen inside WhatsApp, customers answer.</span>
              </div>
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            A COMPLETE WHATSAPP CALLING SYSTEM
        ══════════════════════════════════════════════════════════ */}
        <section className="section-rest relative overflow-hidden">
          <SectionBg src={IMAGES.bgComplete} opacity={0.08} />
          <div className="container mx-auto px-6 relative" style={{ zIndex: 2 }}>
            <div className="fade-section text-center mb-12">
              <h2 className="font-heading font-bold text-3xl md:text-2xl lg:text-4xl leading-tight mb-6 shimmer-wave text-gradient-gold">
                A Complete WhatsApp Calling System
              </h2>
            </div>

            <div className="fade-section grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-6">
              <SwipeCard className="card-compact">
                <img src={IMAGES.cardOneNumber} alt="" className="card-bg-img" aria-hidden="true" loading="lazy" decoding="async" />
                <div className="mb-4"></div>
                <h3 className="font-heading text-xl text-foreground mb-3">One calling number for Sales & Support</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Centralize all calls via Whats App Calling, for better monitoring & accountability.
                </p>
              </SwipeCard>
              <SwipeCard className="card-compact">
                <img src={IMAGES.cardPickupRate} alt="" className="card-bg-img" aria-hidden="true" loading="lazy" decoding="async" />
                <div className="mb-4"></div>
                <h3 className="font-heading text-xl text-foreground mb-3">Increase Customer Pickup Rate</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Calls show your verified WhatsApp business name, not a random number. More trust. More pickups.
                </p>
              </SwipeCard>
              <SwipeCard className="card-compact">
                <img src={IMAGES.cardOptIns} alt="" className="card-bg-img" aria-hidden="true" loading="lazy" decoding="async" />
                <div className="mb-4"></div>
                <h3 className="font-heading text-xl text-foreground mb-3">Increase Customer Trust via Opt-ins</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Every outbound call requires explicit customer opt-in. End spam. Full permission-based calling.
                </p>
              </SwipeCard>
            </div>

            <div className="fade-section grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <SwipeCard className="card-compact">
                <img src={IMAGES.cardCrmIntel} alt="" className="card-bg-img" aria-hidden="true" loading="lazy" decoding="async" />
                <div className="mb-4"></div>
                <h3 className="font-heading text-xl text-foreground mb-3">Turn Calls into CRM Intelligence</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">Every call is automatically tagged with:</p>
                <ul className="text-muted-foreground text-sm mt-2 space-y-1">
                  <li>• Recordings</li>
                  <li>• AI transcripts</li>
                  <li>• AI summaries</li>
                  <li>• Agent Performance Indicators</li>
                </ul>
              </SwipeCard>
              <SwipeCard className="card-compact">
                <img src={IMAGES.cardOneInbox} alt="" className="card-bg-img" aria-hidden="true" loading="lazy" decoding="async" />
                <div className="mb-4"></div>
                <h3 className="font-heading text-xl text-foreground mb-3">All Conversations. One Inbox.</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Manage WhatsApp messages, WhatsApp calls, Instagram DMs, and comments from a single dashboard.
                </p>
                <p className="text-gold text-sm font-medium mt-3 italic">One Platform. One Timeline.</p>
              </SwipeCard>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            BUILT FOR TEAMS
        ══════════════════════════════════════════════════════════ */}
        <section className="section-rest relative overflow-hidden">
          <SectionBg src={IMAGES.bgTeams} opacity={0.08} />
          <div className="container mx-auto px-6 relative" style={{ zIndex: 2 }}>
            <div className="fade-section text-center mb-12">
              <h2 className="font-heading font-bold text-3xl md:text-2xl lg:text-4xl leading-tight mb-6 shimmer-wave text-gradient-gold">
                Built for Teams That Talk<br />to Customers
              </h2>
            </div>

            <div className="fade-section w-full max-w-5xl mx-auto mb-10">
              <img
                src={IMAGES.builtForTeams}
                alt="Sales and support team using WhatsApp Business calling"
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            </div>

            <div className="fade-section grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto mb-10">
              <SwipeCard className="flex items-start gap-4">
                <TealIcon icon={Headphones} size="sm" />
                <div><h4 className="font-heading text-foreground text-lg">Sales teams closing high-intent leads</h4></div>
              </SwipeCard>
              <SwipeCard className="flex items-start gap-4">
                <TealIcon icon={ShoppingBag} size="sm" />
                <div><h4 className="font-heading text-foreground text-lg">D2C brands selling high-value products</h4></div>
              </SwipeCard>
              <SwipeCard className="flex items-start gap-4">
                <TealIcon icon={MessageSquare} size="sm" />
                <div><h4 className="font-heading text-foreground text-lg">Support teams handling complex queries</h4></div>
              </SwipeCard>
              <SwipeCard className="flex items-start gap-4">
                <TealIcon icon={Shield} size="sm" />
                <div><h4 className="font-heading text-foreground text-lg">Service businesses that rely on trust</h4></div>
              </SwipeCard>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            COMPARISON TABLE
        ══════════════════════════════════════════════════════════ */}
        <section className="section-rest relative overflow-hidden">
          <SectionBg src={IMAGES.bgTable} opacity={0.07} />
          <div className="container mx-auto px-6 relative" style={{ zIndex: 2 }}>
            <div className="fade-section text-center mb-12">
              <h2 className="font-heading font-bold text-3xl md:text-2xl lg:text-4xl leading-tight mb-6 shimmer-wave text-gradient-gold">
                WhatsApp Voice Calling vs Traditional Telephony vs WATI
              </h2>
            </div>
            <div className="fade-section max-w-4xl mx-auto overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gold/30">
                    <th className="text-left py-4 px-4 text-foreground font-heading text-lg">Feature</th>
                    <th className="text-center py-4 px-4 text-gradient-gold-pure font-heading text-lg">WhatsApp<br />Voice Calling</th>
                    <th className="text-center py-4 px-4 text-muted-foreground font-heading text-lg">Traditional<br />Telephony</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {[
                    { feature: "Number rental fees", interakt: "None", trad: "High" },
                    { feature: "WhatsApp-native calling", interakt: "Yes", trad: "No" },
                    { feature: "Verified business identity", interakt: "Yes", trad: "No" },
                    { feature: "Mandatory auto-compliance", interakt: "Built-in", trad: "No" },
                    { feature: "CRM-integrated call logs", interakt: "Yes", trad: "No" },
                    { feature: "Call recordings & transcripts", interakt: "Yes (Available for free with WhatsApp Calling)", trad: "Paid add-ons" },
                    { feature: "Unified inbox (All Messages + All Calls in a single view)", interakt: "Yes", trad: "No" },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                      <td className="py-4 px-4 text-foreground font-medium">{row.feature}</td>
                      <td className="py-4 px-4 text-center">
                        <span className="inline-flex items-center gap-1.5 text-gold">
                          <Check className="w-4 h-4" /> {row.interakt}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                          <X className="w-4 h-4" /> {row.trad}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SIMPLE PRICING
        ══════════════════════════════════════════════════════════ */}
        <section className="section-rest section-pricing relative overflow-hidden">
          <SectionBg src={IMAGES.bgPricing} opacity={0.08} />
          <div className="container mx-auto px-6 relative" style={{ zIndex: 2 }}>
            <div className="fade-section text-center max-w-3xl mx-auto">
              <h2 className="font-heading font-bold text-3xl md:text-2xl lg:text-4xl leading-tight mb-6 shimmer-wave text-gradient-gold">
                Simple Pricing. No Additional Costs.
              </h2>
              <p className="text-muted-foreground text-lg mb-10 mt-6">
                WhatsApp Business Voice Calling is included by default on Advanced & CRM plans!
              </p>

              <div className="fade-section my-10 w-full max-w-2xl mx-auto">
                <img
                  src={IMAGES.pricing}
                  alt="Interakt pricing plans Advanced and CRM include WhatsApp calling"
                  className="w-full h-auto object-contain"
                  loading="lazy"
                />
              </div>

              <p className="text-muted-foreground text-lg mb-8">
                Only pay competitive per-minute calling charges.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            CONTACT US FORM pinned at the very bottom
        ══════════════════════════════════════════════════════════ */}
        <section className="section-contact relative overflow-hidden">
          <SectionBg src={IMAGES.bgCta} opacity={0.08} />
          <div className="container mx-auto px-6 relative" style={{ zIndex: 2 }}>
            <ContactUsForm />
          </div>
        </section>

      </div>
    </>
  );
};

export default WhatsAppVoiceCalling;