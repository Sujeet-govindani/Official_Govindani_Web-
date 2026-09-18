import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import NgoIntroVideoFinal from "@/components/HomePage/NgoIntroVideoFinal";

const NGOSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const backboneRowRef = useRef<HTMLDivElement>(null);
  const becauseRef = useRef<HTMLHeadingElement>(null);
  const builtHeadlineRef = useRef<HTMLHeadingElement>(null);
  const builtContainerRef = useRef<HTMLDivElement>(null);

  // Text stretching logic removed as requested to prevent distortion
  useEffect(() => {
    // Logic for resizing/stretching removed to fix "too much stretched" issue
  }, []);

  const backboneLetters = [
    { letter: "B", image: null },
    { letter: "A", image: null },
    { letter: "C", image: null },
    { letter: "K", image: null },
    { letter: "B", image: null },
    { letter: "O", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ngo2.jpg" },
    { letter: "N", image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ngo1.webp" },
    { letter: "E", image: null },
    { letter: "S", image: null },
  ];

  const ngoStats = [
    "Served more than 10000+ people foods everyday",
    "Provided shelters to 1 lakh womens every month",
  ];

  const crowdfundingProblems = [
    "Hidden percentage cuts on every donation",
    "No full donor data ownership",
    "No brand identity NGO becomes a listing page",
  ];

  const ourAdvantages = [
    "100% Ownership",
    "Automated Tax & Compliance",
    "Zero Platform Commission",
    "Recurring Donation Engine",
    "Transparent Accounting",
    "Peer-to-Peer Fundraising",
    "Direct Donor Relationship",
    "WhatsApp + SMS + Email Automation",
  ];

  const impactStats = [
    { figure: "₹10+ Crore", label: "Raised Every 2 3 Months" },
    { figure: "10,000+", label: "Meals Served Daily" },
    { figure: "1 Lakh+", label: "Women Supported Monthly" },
    { figure: "100%", label: "Automated Donation System" },
  ];

  const functionalityGrid = [
    { title: "Donation Engine", desc: "Recurring, One-Time, Tribute, Anonymous, Flexible Amounts" },
    { title: "Admin Control Panel", desc: "Campaign Management, Bulk Receipts, Reports Export, Role Access" },
    { title: "Growth Tools", desc: "Peer Fundraising, Social Sharing, Progress Bars, Countdown Timers" },
    { title: "Automation & Receipts", desc: "Instant 80G PDF, Annual Summary, WhatsApp/SMS/Email Alerts" },
    { title: "Transparency & Compliance", desc: "Legal Uploads, Transaction IDs, CSR Pages, FCRA Ready" },
    { title: "Payment & Global Support", desc: "All Major Gateways, International Donations, Offline Approvals" },
    { title: "Ownership & Scalability", desc: "No Recurring Platform Fee, Full Data Access, Future-Ready System" },
  ];

  const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };
  const fadeLeft = { hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0 } };
  const fadeRight = { hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0 } };

  return (
    <section id="ngo"

      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ background: "#000000" }}
    >
      {/* ══ SVG Filter ══ */}
      <svg width="0" height="0" style={{ position: "absolute", overflow: "hidden" }} aria-hidden>
        <defs>
          <filter id="bb-grain" x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.72 0.85" numOctaves="4" seed="17" stitchTiles="stitch" result="noise" />
            <feColorMatrix type="matrix"
              values="0 0 0 0 0.88
                      0 0 0 0 0.72
                      0 0 0 0 0.10
                      0 0 0 0.38 0"
              in="noise" result="goldGrain" />
            <feComposite in="goldGrain" in2="SourceAlpha" operator="in" result="masked" />
            <feBlend in="SourceGraphic" in2="masked" mode="overlay" />
          </filter>
          <linearGradient id="bb-gold-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#faf1b1" />
            <stop offset="15%" stopColor="#f8ea85" />
            <stop offset="42%" stopColor="#faf1b1" />
            <stop offset="55%" stopColor="#f2be4e" />
            <stop offset="70%" stopColor="#ecb741" />
            <stop offset="82%" stopColor="#cf8f1d" />
            <stop offset="90%" stopColor="#c68b22" />
            <stop offset="100%" stopColor="#b87c16" />
          </linearGradient>
        </defs>
      </svg>

      {/* ── Bokeh ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div className="bokeh" style={{ top: "5%", left: "3%", width: 500, height: 500, animationDelay: "0s" }} />
        <div className="bokeh" style={{ top: "25%", right: "2%", width: 380, height: 380, animationDelay: "1.5s" }} />
        <div className="bokeh" style={{ top: "55%", left: "15%", width: 320, height: 320, animationDelay: "3s" }} />
        <div className="bokeh" style={{ top: "75%", right: "10%", width: 420, height: 420, animationDelay: "0.8s" }} />
        <div className="bokeh" style={{ top: "40%", left: "45%", width: 280, height: 280, animationDelay: "2s" }} />
        {([
          { top: "2%", left: "8%", size: 3, delay: "0s", dur: "3.2s" },
          { top: "4%", left: "33%", size: 1.5, delay: "1.3s", dur: "4.6s" },
          { top: "6%", left: "67%", size: 2.5, delay: "0.4s", dur: "3.9s" },
          { top: "9%", left: "55%", size: 2, delay: "0.7s", dur: "4s" },
          { top: "11%", left: "18%", size: 1.5, delay: "2.9s", dur: "3.5s" },
          { top: "12%", left: "82%", size: 3.5, delay: "1.4s", dur: "2.8s" },
          { top: "14%", left: "44%", size: 2, delay: "0.2s", dur: "5.1s" },
          { top: "17%", left: "92%", size: 1.5, delay: "3.7s", dur: "3.3s" },
          { top: "18%", left: "22%", size: 2, delay: "2.1s", dur: "3.6s" },
          { top: "20%", left: "60%", size: 3, delay: "1.0s", dur: "2.9s" },
        ] as { top: string; left: string; size: number; delay: string; dur: string }[]).map((s, i) => (
          <div key={i} className="sparkle-dot"
            style={{ top: s.top, left: s.left, width: s.size, height: s.size, animationDelay: s.delay, animationDuration: s.dur }}
          />
        ))}
      </div>

      {/* ════════════════════════════════════
          PART 1 Hero
          ════════════════════════════════════ */}
      <NgoIntroVideoFinal />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20">
        <div className="hero-stack">
          <motion.div className="hero-line hero-line--1"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <h1 className="we-build-text">WE BUILD</h1>
          </motion.div>

          <motion.div className="hero-line hero-line--2"
            initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 1, delay: 0.1 }}>
            <div className="bb-glow-bg" />
            <div className="backbone-letters" ref={backboneRowRef}>
              {backboneLetters.map((item, i) => {
                const isImg = item.image !== null;
                if (isImg) {
                  return (
                    <motion.span key={i} className="bb-letter bb-letter--photo"
                      initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.15 + i * 0.055 }}
                      style={{
                        backgroundImage: `url(${item.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}>
                      {item.letter}
                    </motion.span>
                  );
                }
                return (
                  <motion.span key={i} className="bb-letter bb-letter--fresh-gold"
                    initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.15 + i * 0.055 }}>
                    {item.letter}
                  </motion.span>
                );
              })}
            </div>
          </motion.div>

          <motion.div className="hero-line hero-line--3"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.25 }}>
            <h2 className="because-text">
              Because, Our NGO
            </h2>
          </motion.div>
        </div>

        <div className="below-hero-stack">
          <div className="stats-col">
            {ngoStats.map((stat, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible"
                viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 + i * 0.15 }}
                className="stat-line">
                <span className="stat-arrow">→</span>
                <span className="stat-text">{stat}</span>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeLeft} initial="hidden" whileInView="visible"
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
            <p className="related-sentence">Every contribution creates ripples of hope in countless lives across our communities</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.93 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.2 }}>
            <blockquote className="tagline-quote">"They are not our NGO but we are their backbone.."</blockquote>
          </motion.div>

          <div className="why-stack">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible"
              viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}>
              <h3 className="why-claims-heading">Why this claims?</h3>
              <div className="why-dot-row"><span className="why-dot" /></div>
            </motion.div>
            <motion.div variants={fadeLeft} initial="hidden" whileInView="visible"
              viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.25 }}>
              <p className="statement-text-1">"These NGO's are not owned by us, but <span className="gold-span">created by us.</span>"</p>
            </motion.div>
            <motion.div variants={fadeRight} initial="hidden" whileInView="visible"
              viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }}>
              <p className="statement-text-2">We don't own the NGOs, but we provide food, shelter and support that enables them to more positive change every day.</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════
          PART 2 Infrastructure
          ════════════════════════════════════ */}
      <div className="relative z-10 section-divider">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24">

          <motion.div
            ref={builtContainerRef}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="mb-4 sm:mb-5 w-full px-0 overflow-hidden text-center"
            style={{ width: "100%" }}
          >
            <h2
              className="built-headline"
            >
              Built to Raise. Built to Scale. Built to Serve Millions.
            </h2>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
            <p className="built-subtitle">NGOs using our infrastructure are raising <strong className="gold-strong">₹10+ Crore</strong> every 2 3 months combined without paying crowdfunding commissions.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-10 sm:mb-14">
            <motion.div variants={fadeLeft} initial="hidden" whileInView="visible"
              viewport={{ once: true }} transition={{ duration: 0.8 }} className="compare-card">
              <h3 className="compare-head">Why NGOs Move Away from Crowdfunding Platforms</h3>
              <div className="compare-items-list">
                {crowdfundingProblems.map((p, i) => (
                  <div key={i} className="compare-row-bad">
                    <span className="compare-icon-bad">✕</span>
                    <span className="compare-row-text">{p}</span>
                  </div>
                ))}
              </div>
              <div className="eliminated-pill">We eliminated platform dependency. <span className="gold-span">Every NGO now owns their ecosystem.</span></div>
            </motion.div>
            <motion.div variants={fadeRight} initial="hidden" whileInView="visible"
              viewport={{ once: true }} transition={{ duration: 0.8 }} className="compare-card compare-card-good">
              <h3 className="compare-head">What Changes With Our Dedicated NGO Infrastructure</h3>
              <div className="advantages-grid">
                {ourAdvantages.map((a, i) => (
                  <div key={i} className="compare-row-good">
                    <span className="compare-icon-good">✓</span>
                    <span className="compare-row-text-good">{a}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-12 sm:mb-16">
            {impactStats.map((s, i) => (
              <motion.div key={i} className="impact-box"
                initial={{ opacity: 0, scale: 0.88 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.05 + i * 0.1 }}>
                <span className="impact-num">{s.figure}</span>
                <span className="impact-label">{s.label}</span>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible"
            viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-8 sm:mb-10">
            <h3 className="func-grid-heading">Functionality Power Grid</h3>
          </motion.div>

          <div className="func-grid mb-12 sm:mb-16">
            {functionalityGrid.map((item, i) => {
              const isLastLone = i === functionalityGrid.length - 1 && functionalityGrid.length % 3 !== 0;
              return (
                <motion.div key={i}
                  className={`func-grid-card${isLastLone ? " func-grid-card--last" : ""}`}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.04 + i * 0.07 }}>
                  {isLastLone
                    ? <div className="func-card-inner"><h4 className="func-card-title">{item.title}</h4><p className="func-card-desc">{item.desc}</p></div>
                    : <><h4 className="func-card-title">{item.title}</h4><p className="func-card-desc">{item.desc}</p></>
                  }
                </motion.div>
              );
            })}
          </div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible"
            viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-8 sm:mb-10">
            <p className="bottom-statement">These NGOs are not owned by us. <span className="gold-span">But their digital backbone is built by us.</span></p>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible"
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="cta-banner">
            <p className="cta-banner-text">Build Your Own Donation Infrastructure. <span className="gold-span">Stop Paying Platform Commission.</span></p>
            <div className="button-wrap">
              <Link to="/contact-us" className="premium-button">
                <span>Book a Call</span>
              </Link>
              <div className="button-shadow" />
            </div>
          </motion.div>

        </div>
      </div>



      {/* ═══════════════════════════════════════════════
          STYLES
      ═══════════════════════════════════════════════ */}
      <style>{`

        .bokeh{position:absolute;border-radius:50%;background:radial-gradient(circle,rgba(218,165,32,0.12) 0%,rgba(218,165,32,0.05) 40%,transparent 70%);filter:blur(60px);animation:bokeh-float 8s ease-in-out infinite;pointer-events:none;}
        @keyframes bokeh-float{0%,100%{transform:translate(0,0) scale(1);opacity:0.7;}33%{transform:translate(20px,-15px) scale(1.05);opacity:1;}66%{transform:translate(-15px,10px) scale(0.97);opacity:0.8;}}

        .sparkle-dot{position:absolute;border-radius:50%;background:radial-gradient(circle,#FFD700 0%,#DAA520 50%,rgba(218,165,32,0.2) 80%,transparent 100%);box-shadow:0 0 5px 1px rgba(255,215,0,0.8),0 0 10px 2px rgba(218,165,32,0.5);animation:sparkle-twinkle ease-in-out infinite;pointer-events:none;}
        @keyframes sparkle-twinkle{0%{opacity:0;transform:scale(0.3) rotate(0deg);}25%{opacity:1;transform:scale(1.4) rotate(60deg);}50%{opacity:0.5;transform:scale(0.9) rotate(120deg);}75%{opacity:1;transform:scale(1.2) rotate(150deg);}100%{opacity:0;transform:scale(0.3) rotate(180deg);}}

        .hero-stack{display:flex;flex-direction:column;align-items:flex-start;gap:0;width:100%;}
        .hero-line{width:100%;margin:0;padding:0;line-height:1;}
        .hero-line--1{margin-bottom:-0.04em;}
        .hero-line--2{margin-bottom:-0.04em;position:relative;}
        .hero-line--3{overflow:visible;}

        .we-build-text{
          font-family:'Libre Baskerville',serif;
          font-size:clamp(2rem,5.5vw,4.5rem);
          font-weight:700;font-style:normal;line-height:1.05;letter-spacing:0.04em;display:block;margin:0;
          background: linear-gradient(180deg, #d0ad6a 0%, #c09840 50%, #b48832 100%);
          -webkit-background-clip: text;background-clip: text;-webkit-text-fill-color: transparent;
        }

        .because-text{
          font-family:'Libre Baskerville',serif;font-size:clamp(1.8rem,5.8vw,6.2rem);font-weight:700;font-style:normal;letter-spacing:0.01em;line-height:1.05;display:inline-block;margin:0;color:#ebb331;-webkit-text-fill-color:#ebb331;
        }

        .bb-glow-bg{position:absolute;top:50%;left:0;width:100%;height:200%;transform:translateY(-50%);background:radial-gradient(ellipse 68% 55% at 38% 50%,rgba(200,160,20,0.18) 0%,rgba(100,75,5,0.09) 45%,transparent 70%);pointer-events:none;z-index:0;}

        .backbone-letters{position:relative;z-index:1;display:flex;align-items:center;justify-content:space-between;flex-wrap:nowrap;line-height:1;width:100%;}

        .bb-letter{font-family:'Libre Baskerville',serif;font-size:clamp(2.4rem,9.5vw,10rem);font-weight:700;font-style:normal;letter-spacing:0;display:inline-block;position:relative;transform:skewX(-5deg);line-height:1;cursor:default;transition:transform 0.35s cubic-bezier(0.25,1,0.5,1), filter 0.35s ease;}
        .bb-letter:hover{transform:skewX(-5deg) scale(1.07) translateY(-5px);}

        .bb-letter--fresh-gold{
          background: linear-gradient(180deg,#faf1b1 0%,#f9ee9a 8%,#f8ea85 16%,#f5d96a 22%,#f2be4e 30%,#eebb42 40%,#ecb741 55%,#dfa030 62%,#cf8f1d 70%,#c68b22 82%,#bc841e 91%,#b87c16 100%);
          -webkit-background-clip: text;background-clip: text;-webkit-text-fill-color: transparent;
        }

        .bb-letter--photo{-webkit-text-fill-color:transparent;color:transparent;filter:drop-shadow(0 8px 20px rgba(0,0,0,0.68)) drop-shadow(0 0 22px rgba(255,255,255,0.30)) drop-shadow(0 0 42px rgba(240,195,20,0.18));}
        .bb-letter--photo:hover{filter:drop-shadow(0 10px 24px rgba(0,0,0,0.72)) drop-shadow(0 0 30px rgba(255,255,255,0.42)) drop-shadow(0 0 55px rgba(240,200,20,0.26));}

        .below-hero-stack{display:flex;flex-direction:column;align-items:flex-start;gap:1.25rem;padding-top:1.5rem;width:100%;}
        .stats-col{display:flex;flex-direction:column;gap:0.6rem;width:100%;max-width:640px;}
        .why-stack{display:flex;flex-direction:column;gap:0.75rem;width:100%;padding-top:0.5rem;}
        .why-claims-heading{text-align:left!important;}
        .why-dot-row{justify-content:flex-start!important;}
        .tagline-quote{text-align:left;padding-left:0;}

        @keyframes shimmer{to{background-position:200% center;}}

        .stat-line{display:flex;align-items:center;gap:0.75rem;padding:0.75rem 1rem;background:linear-gradient(90deg,rgba(218,165,32,0.07) 0%,transparent 100%);border-left:3px solid rgba(218,165,32,0.5);}
        .stat-arrow{font-size:1.3rem;color:#DAA520;font-weight:700;flex-shrink:0;text-shadow:0 0 12px rgba(218,165,32,0.6);}
        .stat-text{font-family:'Inter',sans-serif;font-size:clamp(1rem,1.8vw,1.25rem);font-weight:600;color:#ffffff;letter-spacing:0.01em;}
        .related-sentence{font-family:'Inter',sans-serif;font-size:clamp(0.95rem,1.8vw,1.35rem);font-weight:600;color:rgba(218,165,32,0.95);line-height:1.6;padding:0.75rem 1.2rem;border-left:3px solid rgba(218,165,32,0.5);background:linear-gradient(90deg,rgba(218,165,32,0.09) 0%,transparent 100%);}
        .tagline-quote{font-family:'Inter',sans-serif;font-size:clamp(0.95rem,1.9vw,1.55rem);font-style:italic;font-weight:600;color:#f4f4ed;padding:0.75rem 1.25rem;animation:glow-pulse 3s ease-in-out infinite;}
        @keyframes glow-pulse{0%,100%{text-shadow:0 0 12px rgba(34,211,238,0.5),0 0 25px rgba(34,211,238,0.25);}50%{text-shadow:0 0 22px rgba(34,211,238,0.7),0 0 45px rgba(34,211,238,0.35);}}
        .why-claims-heading{font-family:'Libre Baskerville',serif;font-size:clamp(1.6rem,4vw,3.5rem);font-weight:700;background:linear-gradient(180deg,#FFF5C0 0%,#FFD700 18%,#D4AF37 50%,#C08B0A 75%,#8A6200 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:0.4rem;text-align:center;width:100%;}
        .why-dot-row{display:flex;align-items:center;justify-content:center;margin-bottom:0.5rem;}
        .why-dot{display:inline-block;width:8px;height:8px;border-radius:50%;background:#D4AF37;box-shadow:0 0 10px rgba(212,175,55,0.6);}
        .statement-text-1{font-family:'Inter',sans-serif;font-size:clamp(1rem,1.9vw,1.5rem);font-weight:700;color:#ffffff;line-height:1.6;}
        .statement-text-2{font-family:'Inter',sans-serif;font-size:clamp(0.95rem,1.6vw,1.15rem);font-weight:400;color:rgba(255,255,255,0.82);line-height:1.7;}
        .gold-span{color:#D4AF37;-webkit-text-fill-color:#D4AF37;font-weight:700;}
        .section-divider{border-top:1px solid rgba(218,165,32,0.1);background:linear-gradient(180deg,rgba(218,165,32,0.025) 0%,transparent 80px);}

        .built-headline{
          font-family:'Libre Baskerville',serif;font-weight:700;
          background:linear-gradient(90deg,#D4AF37 0%,#FFD700 45%,#C08B0A 80%,#D4AF37 100%);
          background-size:200% auto;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;
          animation:shimmer 3.5s linear infinite;line-height:1.25;letter-spacing:-0.01em;
          font-size: clamp(2.5rem, 6vw, 5rem);display: inline-block;
          text-align: center;
        }

        .built-subtitle{font-family:'Inter',sans-serif;font-size:clamp(0.95rem,1.6vw,1.1rem);color:rgba(255,255,255,0.82);line-height:1.8;}
        .gold-strong{color:#D4AF37;-webkit-text-fill-color:#D4AF37;font-weight:700;}
        .compare-card{padding:1.75rem;background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.07);border-radius:0.75rem;backdrop-filter:blur(8px);}
        .compare-card-good{border-color:rgba(218,165,32,0.2);background:rgba(218,165,32,0.04);}
        .compare-head{font-family:'Libre Baskerville',serif;font-size:clamp(0.95rem,1.8vw,1.15rem);font-weight:700;color:rgba(218,165,32,0.95);margin-bottom:1rem;line-height:1.4;}
        .compare-items-list{display:flex;flex-direction:column;gap:0.6rem;}
        .compare-row-bad{display:flex;align-items:flex-start;gap:0.6rem;padding:0.65rem 0.75rem;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:0.4rem;}
        .compare-icon-bad{width:18px;height:18px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:rgba(239,68,68,0.12);border:1px solid rgba(239,68,68,0.3);color:rgba(239,68,68,0.85);font-size:0.55rem;font-weight:700;margin-top:0.1rem;}
        .compare-row-text{font-family:'Inter',sans-serif;font-size:clamp(0.88rem,1.4vw,1.02rem);color:#ffffff;line-height:1.5;font-weight:500;}
        .eliminated-pill{font-family:'Inter',sans-serif;margin-top:1rem;padding:0.65rem 0.9rem;background:rgba(218,165,32,0.07);border:1px solid rgba(218,165,32,0.2);border-radius:0.4rem;font-size:clamp(0.82rem,1.3vw,0.95rem);color:rgba(255,255,255,0.78);line-height:1.5;}
        .advantages-grid{display:grid;grid-template-columns:1fr 1fr;gap:0.55rem;}
        .compare-row-good{display:flex;align-items:center;gap:0.55rem;padding:0.6rem 0.7rem;background:rgba(218,165,32,0.05);border:1px solid rgba(218,165,32,0.14);border-radius:0.4rem;transition:background 0.25s;}
        .compare-row-good:hover{background:rgba(218,165,32,0.1);}
        .compare-icon-good{width:18px;height:18px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:rgba(218,165,32,0.12);border:1px solid rgba(218,165,32,0.3);color:#DAA520;font-size:0.55rem;font-weight:700;}
        .compare-row-text-good{font-family:'Inter',sans-serif;font-size:clamp(0.84rem,1.3vw,0.96rem);color:#ffffff;line-height:1.35;font-weight:500;}
        .impact-box{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:1.25rem 0.75rem;border:1px solid rgba(218,165,32,0.2);border-radius:0.6rem;background:rgba(218,165,32,0.05);transition:all 0.3s;cursor:default;}
        .impact-box:hover{background:rgba(218,165,32,0.1);border-color:rgba(218,165,32,0.4);transform:translateY(-3px);box-shadow:0 10px 28px rgba(218,165,32,0.14);}
        .impact-num{font-family:'Libre Baskerville',serif;font-size:clamp(1.4rem,4vw,2.8rem);font-weight:700;color:#DAA520;display:block;line-height:1;text-shadow:0 0 20px rgba(218,165,32,0.3);}
        .impact-label{font-family:'Inter',sans-serif;font-size:clamp(0.75rem,1.2vw,0.9rem);color:#ffffff;margin-top:0.4rem;text-align:center;line-height:1.35;font-weight:500;}
        .func-grid-heading{font-family:'Libre Baskerville',serif;font-size:clamp(1.3rem,3vw,2.2rem);font-weight:700;background:linear-gradient(180deg,#FFF5C0 0%,#FFD700 18%,#D4AF37 50%,#C08B0A 75%,#8A6200 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;}
        .func-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(218,165,32,0.09);border:1px solid rgba(218,165,32,0.1);border-radius:0.5rem;overflow:hidden;}
        .func-grid-card{padding:1.4rem 1.2rem;background:#000000;transition:background 0.3s;cursor:default;}
        .func-grid-card:hover{background:rgba(218,165,32,0.05);}
        .func-grid-card--last{grid-column:1 / -1;display:flex;justify-content:center;background:#000000;border-top:1px solid rgba(218,165,32,0.09);}
        .func-grid-card--last:hover{background:rgba(218,165,32,0.05);}
        .func-grid-card--last .func-card-inner{width:calc(33.333% - 1px);max-width:420px;padding:1.4rem 1.2rem;text-align:center;}
        .func-card-title{font-family:'Libre Baskerville',serif;font-size:clamp(0.9rem,1.5vw,1.06rem);font-weight:700;color:#FFD700;margin-bottom:0.45rem;}
        .func-card-desc{font-family:'Inter',sans-serif;font-size:clamp(0.8rem,1.2vw,0.92rem);color:#ffffff;line-height:1.55;font-weight:400;}
        .bottom-statement{font-family:'Inter',sans-serif;font-size:clamp(0.95rem,2vw,1.35rem);font-weight:600;color:rgba(255,255,255,0.75);line-height:1.6;}
        .cta-banner{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:1.5rem;padding:2.5rem 2rem;background:rgba(218,165,32,0.05);border:1px solid rgba(218,165,32,0.18);border-radius:0.75rem;}
        .cta-banner-text{font-family:'Inter',sans-serif;font-size:clamp(1rem,2vw,1.35rem);font-weight:700;color:rgba(255,255,255,0.9);line-height:1.5;max-width:700px;}
        .button-wrap{position:relative;z-index:2;border-radius:999vw;flex-shrink:0;}
        .button-shadow{--sc:2em;position:absolute;width:calc(100% + var(--sc));height:calc(100% + var(--sc));top:calc(0% - var(--sc)/2);left:calc(0% - var(--sc)/2);filter:blur(clamp(2px,0.125em,12px));overflow:visible;pointer-events:none;}
        .button-shadow::after{content:"";position:absolute;z-index:0;inset:0;border-radius:999vw;background:linear-gradient(180deg,rgba(218,165,32,0.3),rgba(218,165,32,0.15));width:calc(100% - var(--sc) - 0.25em);height:calc(100% - var(--sc) - 0.25em);top:calc(var(--sc) - 0.5em);left:calc(var(--sc) - 0.875em);padding:0.125em;box-sizing:border-box;mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);mask-composite:exclude;}
        
        /* ✅ UPDATED: Gold/cream background with dark brown text matches the reference button image */
        .premium-button{
          --bw:clamp(1px,0.0625em,4px);
          all:unset;cursor:pointer;position:relative;z-index:3;
          background:linear-gradient(145deg,#fdf5e0 0%,#f2df9a 45%,#e8c96e 100%);
          border-radius:999vw;
          box-shadow:inset 0 0.125em 0.125em rgba(0,0,0,0.15),inset 0 -0.125em 0.125em rgba(245,245,220,0.3),0 0 20px rgba(255,239,213,0.3);
          backdrop-filter:blur(10px);
          transition:all 0.35s cubic-bezier(0.25,1,0.5,1);
          display:inline-block;
          text-decoration: none;
        }
        .premium-button:hover{
          transform:scale(0.975);
          background:linear-gradient(145deg,#fffde8 0%,#f7e8a0 45%,#f0d35a 100%);
          box-shadow:inset 0 0.125em 0.125em rgba(0,0,0,0.15),inset 0 -0.125em 0.125em rgba(245,245,220,0.4),0 0 30px rgba(255,239,213,0.45);
        }
        .premium-button:active{transform:scale(0.95);}
        .premium-button span{
          position:relative;display:block;user-select:none;
          font-family:'Inter',sans-serif;letter-spacing:0.07em;font-weight:800;font-size:0.9rem;
          /* ✅ Dark brown text on gold background */
          background:linear-gradient(135deg,#7a5c0e 0%,#5D4A36 100%);
          -webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;
          padding:0.72rem 1.75rem;text-align:center;
        }
        .premium-button::after{content:"";position:absolute;z-index:1;inset:0;border-radius:999vw;width:calc(100% + var(--bw));height:calc(100% + var(--bw));top:calc(0% - var(--bw)/2);left:calc(0% - var(--bw)/2);padding:var(--bw);box-sizing:border-box;background:linear-gradient(135deg,rgba(212,175,55,0.6),rgba(200,165,40,0.4),rgba(212,175,55,0.6));mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);mask-composite:exclude;}

        @media(max-width:1280px){.bb-letter{font-size:clamp(2.2rem,9vw,9rem);}}
        @media(max-width:1024px){
          .advantages-grid{grid-template-columns:1fr 1fr;}
          .func-grid{grid-template-columns:1fr 1fr;}
          .func-grid-card--last{grid-column:1 / -1;}
          .func-grid-card--last .func-card-inner{width:50%;}
        }
        @media(max-width:768px){
          .we-build-text{font-size:clamp(1.6rem,7vw,3rem);}
          .bb-letter{font-size:clamp(1.8rem,9vw,5.5rem);letter-spacing:0;}
          .because-text{font-size:clamp(1.4rem,6.5vw,3.5rem);}
          .func-grid{grid-template-columns:1fr 1fr;}
          .func-grid-card--last .func-card-inner{width:60%;}
          .cta-banner{flex-direction:column;align-items:center;padding:1.5rem 1.2rem;}
          .advantages-grid{grid-template-columns:1fr;}
        }
        @media(max-width:640px){
          .we-build-text{font-size:clamp(1.4rem,8vw,2.5rem);}
          .bb-letter{font-size:clamp(1.5rem,9.5vw,4.5rem);letter-spacing:0;}
          .because-text{font-size:clamp(1.2rem,7vw,2.8rem);}
          .backbone-letters{gap:0;}
          .func-grid{grid-template-columns:1fr;}
          .func-grid-card--last{grid-column:unset;justify-content:flex-start;}
          .func-grid-card--last .func-card-inner{width:100%;max-width:100%;text-align:left;}
          .func-grid-card{padding:1.1rem;}
          .compare-card{padding:1.25rem;}
          .cta-banner{padding:1rem;}
          .premium-button span{font-size:0.82rem;padding:0.6rem 1.4rem;}
          .headline-break{display:block;}
          .impact-box{padding:0.9rem 0.5rem;}
          .impact-num{font-size:clamp(1.2rem,5vw,2rem);}
        }
        @media(max-width:480px){
          .bb-letter{font-size:clamp(1.2rem,9.5vw,3.5rem);letter-spacing:0;}
          .we-build-text{font-size:clamp(1.2rem,8vw,2rem);}
          .because-text{font-size:clamp(1rem,7.5vw,2.2rem);}
          .advantages-grid{grid-template-columns:1fr;}
        }
        @media(max-width:375px){.bb-letter{font-size:clamp(1rem,9.5vw,3rem);letter-spacing:0;}}
      `}</style>
    </section>
  );
};

export default NGOSection;
