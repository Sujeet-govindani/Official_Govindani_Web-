// ============================================================
// FILE: src/components/ServicesOffered/PLANS/PlansAndPricingPage.tsx
// ADD ROUTE: your route for Plans // ADD ROUTE: /social-media/plans Pricing page
// ============================================================

// PlansAndPricingPage.tsx
// Route: /social-media/plans

import { SectionLabel, SectionHeading, GoldButton, OutlineButton, CTABand, FAQAccordion } from "../../ui/Components";
import { FONTS, GLOBAL_CSS } from "../../ui/styles";
import ServiceSection from "@/components/ServicesSection";

const plans = [
  {
    name: "Basic",
    price: "₹14,999",
    tag: "Starter",
    highlight: false,
    bullets: [
      "Up to 8 posts / month across selected platforms",
      "2 reels / videos per month",
      "Standard designs & basic caption writing",
      "Monthly report every 2 months",
      "1 platform included",
      "Email support",
    ],
    notIncluded: ["Strategy call", "Festival creatives", "Custom campaign concepts"],
  },
  {
    name: "Standard",
    price: "₹17,999",
    tag: "Most Popular",
    highlight: true,
    bullets: [
      "Around 10 posts / month",
      "4 reels / videos per month",
      "Custom captions & festival creatives",
      "Basic strategy call each month",
      "Monthly performance report",
      "Up to 2 platforms",
      "Priority email support",
    ],
    notIncluded: ["Full campaign concepts", "Priority design"],
  },
  {
    name: "Advance",
    price: "₹19,999",
    tag: "Full Power",
    highlight: false,
    bullets: [
      "Around 20 posts / month",
      "6–10 reels / videos per month",
      "Full creative customization",
      "Custom campaign concepts",
      "Priority support",
      "Detailed monthly report + strategy review",
      "Up to 3 platforms",
      "WhatsApp support",
    ],
    notIncluded: [],
  },
];

const addOns = [
  { name: "Meta / Google Ads Management", desc: "Performance marketing add-on: campaign setup, creative coordination, budget management and reporting." },
  { name: "WhatsApp Automation Setup", desc: "Build WhatsApp flows for lead nurture, abandoned cart, appointment reminders and donor journeys." },
  { name: "Extra Platform Add-on", desc: "Add YouTube, LinkedIn or Twitter/X to any plan at a reduced per-platform rate." },
  { name: "Influencer Collaboration Management", desc: "Identify, negotiate and manage influencer tie-ins for your campaign." },
];

const faqs = [
  { q: "Are these plans fixed or can they be customised?", a: "All plans can be customised. NGOs, healthcare clients and large real estate developers typically have tailored scopes. Contact us for a custom quote." },
  { q: "What's included in the monthly report?", a: "Reach, impressions, engagement rate, follower growth, link clicks and — where integrated — leads, orders or donations attributed to social." },
  { q: "Is there a setup or onboarding fee?", a: "There is no hidden fee. Onboarding (audit, strategy, calendar setup) happens in the first month and is included in your monthly plan." },
  { q: "Can I upgrade or downgrade my plan?", a: "Yes. You can move between plans at the start of any new billing month with 7 days notice." },
  { q: "Do you require a minimum contract period?", a: "We recommend a minimum of 3 months to see meaningful results (60–90 days is the industry-standard benchmark for social ROI). We don't lock you in contractually beyond that." },
];

const industries = [
  { icon: "🤝", name: "NGO", href: "/social-media/ngo" },
  { icon: "🏢", name: "Real Estate", href: "/social-media/real-estate" },
  { icon: "🛍️", name: "Ecommerce", href: "/social-media/ecommerce" },
  { icon: "🏥", name: "Healthcare", href: "/social-media/healthcare" },
  { icon: "🔮", name: "Numerology & Spiritual", href: "/social-media/numerology" },
  { icon: "👤", name: "Personal Branding", href: "/social-media/personal-branding" },
];

export default function PlansAndPricingPage() {
  return (
    <div style={{ background: "#090909", color: "#F5F0E8", minHeight: "100vh", fontFamily: "'EB Garamond', serif" }}>
      <style>{`${FONTS}${GLOBAL_CSS}
        .plan-card { border: 1px solid rgba(201,168,76,0.18); background: #090909; padding: 44px 36px; position: relative; transition: all 0.3s; }
        .plan-card.highlighted { border-color: #C9A84C; }
        .plan-card:hover { transform: translateY(-6px); border-color: rgba(201,168,76,0.5); }
        .plan-card.highlighted:hover { border-color: #D4AF37; }
        .plan-tag { position: absolute; top: -1px; left: 50%; transform: translateX(-50%); background: #C9A84C; color: #090909; font-family: 'Montserrat',sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; padding: 4px 20px; white-space: nowrap; }
        .addon-card { border: 1px solid rgba(201,168,76,0.12); background: rgba(201,168,76,0.02); padding: 28px 28px; transition: border-color 0.3s; }
        .addon-card:hover { border-color: rgba(201,168,76,0.35); }
        .compare-row { display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr; gap: 0; border-bottom: 1px solid rgba(201,168,76,0.08); }
        .compare-row:last-child { border-bottom: none; }
        .compare-cell { padding: 14px 16px; font-family: 'EB Garamond',serif; font-size: 16px; color: rgba(245,240,232,0.7); }
        .compare-cell.header { font-family: 'Montserrat',sans-serif; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #C9A84C; font-weight: 600; }
        .compare-cell.feature { color: rgba(245,240,232,0.6); }
        .compare-cell.highlight-col { background: rgba(201,168,76,0.04); }
        @media (max-width: 768px) {
          .plan-card { padding: 32px 24px; }
          .compare-row { grid-template-columns: 1fr 1fr; }
          .compare-cell:nth-child(3), .compare-cell:nth-child(4) { display: none; }
        }
        @media (max-width: 480px) {
          .plan-card { padding: 28px 16px; }
        }
      `}</style>


      {/* ── HERO ── */}
      <section style={{ padding: "clamp(100px, 8vw, 120px) clamp(16px,5vw,80px) 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(201,168,76,0.08) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <SectionLabel>Investment</SectionLabel>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(42px,7vw,88px)", fontWeight: 300, lineHeight: 1.1, color: "#F5F0E8", marginBottom: 24 }}>
            Social Media Management<br /><em style={{ color: "#C9A84C" }}>Plans & Pricing</em>
          </h1>
          <p style={{ fontSize: "clamp(17px,2vw,21px)", lineHeight: 1.75, color: "rgba(245,240,232,0.65)", maxWidth: 600, margin: "0 auto 16px", fontFamily: "'EB Garamond',serif" }}>
            Transparent, structured pricing for every stage of growth — from starter brands to established organisations.
          </p>
          <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 13, color: "rgba(201,168,76,0.7)", letterSpacing: "0.05em" }}>
            All plans include onboarding · No hidden fees · Cancel anytime after 3 months
          </p>
        </div>
      </section>

      {/* ── PLAN CARDS ── */}
      <section style={{ padding: "0 clamp(16px,5vw,80px) 80px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 2, background: "rgba(201,168,76,0.08)" }}>
            {plans.map((plan) => (
              <div key={plan.name} className={`plan-card${plan.highlight ? " highlighted" : ""}`}>
                {plan.highlight && <div className="plan-tag">{plan.tag}</div>}
                {!plan.highlight && (
                  <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, letterSpacing: "0.18em", color: "rgba(201,168,76,0.55)", textTransform: "uppercase", marginBottom: 16 }}>{plan.tag}</div>
                )}
                <div style={{ marginTop: plan.highlight ? 16 : 0 }}>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 44, fontWeight: 600, color: "#C9A84C", lineHeight: 1 }}>{plan.price}</div>
                  <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, letterSpacing: "0.12em", color: "rgba(245,240,232,0.35)", marginTop: 4, marginBottom: 12 }}>per month</div>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 500, color: "#F5F0E8", marginBottom: 28 }}>{plan.name} Plan</div>

                  <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(201,168,76,0.6)", marginBottom: 12 }}>Included</div>
                  <ul style={{ listStyle: "none", marginBottom: 24, display: "flex", flexDirection: "column", gap: 10 }}>
                    {plan.bullets.map((b) => (
                      <li key={b} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <span style={{ color: "#C9A84C", fontSize: 10, marginTop: 6, flexShrink: 0 }}>✦</span>
                        <span style={{ fontFamily: "'EB Garamond',serif", fontSize: 16, color: "rgba(245,240,232,0.72)", lineHeight: 1.5 }}>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.notIncluded.length > 0 && (
                    <>
                      <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,240,232,0.25)", marginBottom: 10 }}>Not Included</div>
                      <ul style={{ listStyle: "none", marginBottom: 28, display: "flex", flexDirection: "column", gap: 8 }}>
                        {plan.notIncluded.map((b) => (
                          <li key={b} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                            <span style={{ color: "rgba(245,240,232,0.2)", fontSize: 10, marginTop: 6, flexShrink: 0 }}>—</span>
                            <span style={{ fontFamily: "'EB Garamond',serif", fontSize: 15, color: "rgba(245,240,232,0.3)", lineHeight: 1.5 }}>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  <div style={{ marginTop: plan.notIncluded.length > 0 ? 0 : 28 }}>
                    {plan.highlight
                      ? <GoldButton fullWidth>{`Get Started — ${plan.price}`}</GoldButton>
                      : <OutlineButton fullWidth>{`Get Started — ${plan.price}`}</OutlineButton>
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p style={{ textAlign: "center", marginTop: 28, fontFamily: "'EB Garamond',serif", fontSize: 17, fontStyle: "italic", color: "rgba(245,240,232,0.4)" }}>
            Plans are customizable for NGOs, real estate, ecommerce and healthcare — talk to us for a tailored scope.
          </p>
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section style={{ padding: "80px clamp(16px,5vw,80px)", background: "rgba(201,168,76,0.02)", borderTop: "1px solid rgba(201,168,76,0.08)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeading label="Compare Plans" title={<>What's in Each<br /><em style={{ color: "#C9A84C" }}>Plan</em></>} />
          <div style={{ border: "1px solid rgba(201,168,76,0.15)", overflow: "hidden" }}>
            {/* Header */}
            <div className="compare-row" style={{ background: "rgba(201,168,76,0.05)" }}>
              <div className="compare-cell header">Feature</div>
              <div className="compare-cell header">Basic</div>
              <div className="compare-cell header highlight-col">Standard</div>
              <div className="compare-cell header">Advance</div>
            </div>
            {[
              ["Monthly Posts", "Up to 8", "~10", "~20"],
              ["Reels / Videos", "2/mo", "4/mo", "6–10/mo"],
              ["Platforms", "1", "Up to 2", "Up to 3"],
              ["Caption Writing", "Basic", "Custom", "Custom"],
              ["Festival Creatives", "—", "✦", "✦"],
              ["Strategy Call", "—", "Monthly", "Monthly"],
              ["Performance Report", "Every 2 months", "Monthly", "Detailed Monthly"],
              ["Campaign Concepts", "—", "—", "✦"],
              ["Priority Support", "—", "—", "✦"],
              ["WhatsApp Support", "—", "—", "✦"],
            ].map(([feature, basic, standard, advance]) => (
              <div className="compare-row" key={feature}>
                <div className="compare-cell feature">{feature}</div>
                <div className="compare-cell">{basic}</div>
                <div className="compare-cell highlight-col">{standard}</div>
                <div className="compare-cell">{advance}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ADD-ONS ── */}
      <section style={{ padding: "80px clamp(16px,5vw,80px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeading label="Add-Ons" title={<>Enhance Your Plan<br /><em style={{ color: "#C9A84C" }}>With Add-Ons</em></>} subtitle="Stack capabilities on top of any plan for a complete marketing system." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 2, background: "rgba(201,168,76,0.06)" }}>
            {addOns.map((a) => (
              <div key={a.name} className="addon-card" style={{ background: "#090909" }}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 500, color: "#F5F0E8", marginBottom: 10 }}>{a.name}</div>
                <p style={{ fontFamily: "'EB Garamond',serif", fontSize: 16, color: "rgba(245,240,232,0.6)", lineHeight: 1.65 }}>{a.desc}</p>
                <div style={{ marginTop: 20 }}>
                  <a href="#contact" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 11, color: "#C9A84C", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>Get a Quote →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRY-SPECIFIC NOTE ── */}
      <section style={{ padding: "80px clamp(16px,5vw,80px)", background: "rgba(201,168,76,0.02)", borderTop: "1px solid rgba(201,168,76,0.08)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeading label="Industry Customisation" title={<>Plans Tailored to<br /><em style={{ color: "#C9A84C" }}>Your Industry</em></>} subtitle="Click your industry to see how we adapt the plan scope for your specific goals." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 2, background: "rgba(201,168,76,0.07)" }}>
            {industries.map((ind) => (
              <a key={ind.name} href={ind.href} style={{
                background: "#090909", padding: "28px 20px", display: "flex",
                flexDirection: "column", alignItems: "center", gap: 10,
                textDecoration: "none", border: "1px solid rgba(201,168,76,0.12)",
                transition: "all 0.3s",
              }}
                onMouseOver={e => { (e.currentTarget as HTMLElement).style.borderColor = "#C9A84C"; (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.05)"; }}
                onMouseOut={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.12)"; (e.currentTarget as HTMLElement).style.background = "#090909"; }}
              >
                <span style={{ fontSize: 32 }}>{ind.icon}</span>
                <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, color: "#F5F0E8", textAlign: "center" }}>{ind.name}</span>
                <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#C9A84C" }}>View →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: "80px clamp(16px,5vw,80px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeading label="Quick Answers" title={<>Pricing <em style={{ color: "#C9A84C" }}>FAQ</em></>} />
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      <CTABand
        heading={"Not Sure Which Plan\nIs Right for You?"}
        sub="Book a free 20-minute strategy call and we'll recommend the right plan and scope for your industry and goals."
      />
      <ServiceSection/>
    </div>
  );
}