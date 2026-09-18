import React, { useEffect, useRef, useState } from "react";
import {
  MessageSquare,
  Code2,
  CloudUpload,
  Headphones,
  Rocket,
  Check,
  X,
  Heart,
  Globe,
  Star,
} from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────
// SECTION 1 NGO Pricing Plans
// ─────────────────────────────────────────────

type NGOPlan = {
  name: string;
  subtitle: string;
  price: string;
  period: string;
  badge?: string;
  badgeColor?: string;
  icon: React.ElementType;
  color: string;
  glowColor: string;
  borderColor: string;
  features: { text: string; included: boolean }[];
  cta: string;
  recommended?: boolean;
};

const ngoPlans: NGOPlan[] = [
  {
    name: "Basic",
    subtitle: "For small NGOs getting started",
    price: "₹4,999",
    period: "/one-time",
    icon: Heart,
    color: "from-amber-500 to-yellow-500",
    glowColor: "rgba(217,119,6,0.12)",
    borderColor: "rgba(212,175,55,0.25)",
    features: [
      { text: "Up to 10 Pages", included: true },
      { text: "Donation Gateway Setup", included: true },
      { text: "Mobile Responsive Design", included: true },
      { text: "Basic SEO Setup", included: true },
      { text: "1 Month Support", included: true },
      { text: "Volunteer Registration Form", included: true },
      { text: "Blog / News Section", included: false },
      { text: "Event Management Module", included: false },
      { text: "Custom Donation Campaigns", included: false },
      { text: "Multi-language Support", included: false },
    ],
    cta: "Get Started",
  },
  {
    name: "Standard",
    subtitle: "Growing NGOs with more needs",
    price: "₹9,999",
    period: "/one-time",
    badge: "+ RECOMMENDED",
    badgeColor: "from-amber-400 to-yellow-400",
    icon: Globe,
    color: "from-amber-400 to-yellow-400",
    glowColor: "rgba(251,191,36,0.18)",
    borderColor: "rgba(212,175,55,0.55)",
    recommended: true,
    features: [
      { text: "Up to 25 Pages", included: true },
      { text: "Donation Gateway Setup", included: true },
      { text: "Mobile Responsive Design", included: true },
      { text: "Advanced SEO Optimization", included: true },
      { text: "3 Months Support", included: true },
      { text: "Volunteer Registration Form", included: true },
      { text: "Blog / News Section", included: true },
      { text: "Event Management Module", included: true },
      { text: "Custom Donation Campaigns", included: false },
      { text: "Multi-language Support", included: false },
    ],
    cta: "Book Now",
  },
  {
    name: "Enterprise",
    subtitle: "Large NGOs & foundations",
    price: "₹19,999",
    period: "/one-time",
    badge: "+ FLEXIBLE",
    badgeColor: "from-yellow-300 to-amber-400",
    icon: Star,
    color: "from-yellow-400 to-amber-500",
    glowColor: "rgba(234,179,8,0.12)",
    borderColor: "rgba(212,175,55,0.3)",
    features: [
      { text: "Unlimited Pages", included: true },
      { text: "Donation Gateway Setup", included: true },
      { text: "Mobile Responsive Design", included: true },
      { text: "Advanced SEO Optimization", included: true },
      { text: "6 Months Support", included: true },
      { text: "Volunteer Registration Form", included: true },
      { text: "Blog / News Section", included: true },
      { text: "Event Management Module", included: true },
      { text: "Custom Donation Campaigns", included: true },
      { text: "Multi-language Support", included: true },
    ],
    cta: "Book Now",
  },
];

const NGOPricingSection: React.FC = () => {
  const [activeMobileTab, setActiveMobileTab] = useState(1);

  return (
    <section id="pricing" className="relative pt-6 pb-6 md:pb-20 overflow-hidden bg-black">
      {/* Background glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute top-1/3 left-1/3 w-[600px] h-[600px] rounded-full blur-[160px]"
          style={{ background: "rgba(217,119,6,0.05)" }}
        />  
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[140px]"
          style={{ background: "rgba(251,191,36,0.04)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      <style>{`
        .ngo-card {
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .ngo-card:hover {
          transform: translateY(-10px);
        }
        .recommended-card {
          transform: translateY(-8px) scale(1.02);
          position: relative;
          z-index: 10;
        }
        .recommended-card:hover {
          transform: translateY(-18px) scale(1.02);
        }
        .ngo-badge {
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translateX(-50%);
          padding: 5px 20px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.12em;
          white-space: nowrap;
          text-transform: uppercase;
          color: #1a1000;
          z-index: 20;
        }
        .mobile-tab-btn {
          flex: 1;
          padding: 8px 4px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-align: center;
          border: 1px solid rgba(212,175,55,0.2);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.25s ease;
          background: transparent;
          color: rgba(251,191,36,0.5);
        }
        .mobile-tab-btn.active {
          background: linear-gradient(135deg, rgba(212,175,55,0.2), rgba(251,191,36,0.1));
          border-color: rgba(212,175,55,0.6);
          color: #f4e5b8;
        }
        .feature-check { color: #d4af37; }
        .feature-x { color: rgba(239,68,68,0.5); }
        .feature-text-on { color: rgba(251,191,36,0.85); }
        .feature-text-off { color: rgba(255,255,255,0.22); }
        .cta-btn-primary {
          width: 100%;
          padding: 13px 0;
          border-radius: 999px;
          font-weight: 800;
          font-size: 14px;
          letter-spacing: 0.05em;
          cursor: pointer;
          border: none;
          background: linear-gradient(135deg, #d4af37, #f4e5b8, #c9a961);
          color: #1a0f00;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .cta-btn-primary:hover { opacity: 0.9; transform: scale(0.98); }
        .cta-btn-secondary {
          width: 100%;
          padding: 13px 0;
          border-radius: 999px;
          font-weight: 800;
          font-size: 14px;
          letter-spacing: 0.05em;
          cursor: pointer;
          background: transparent;
          border: 1.5px solid rgba(212,175,55,0.4);
          color: #d4af37;
          transition: all 0.2s ease;
        }
        .cta-btn-secondary:hover {
          background: rgba(212,175,55,0.08);
          border-color: rgba(212,175,55,0.7);
        }
      `}</style>

      <div className="container mx-auto px-4 relative z-10">
        {/* Heading */}
        <div className="text-center mb-14">
          <span
            className="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-4"
            style={{ color: "rgba(212,175,55,0.7)" }}
          >
            NGO Website Packages
          </span>
          <h2 className="font-bold leading-tight">
            <span className="block md:inline text-white text-3xl md:text-3xl lg:text-3xl">
              Transparent Pricing for{" "}
            </span>
            <span
              className="block md:inline text-3xl md:text-3xl lg:text-3xl"
              style={{
                background: "linear-gradient(135deg, #d4af37, #f4e5b8, #c9a961)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                display: "inline-block",
                filter: "drop-shadow(0 2px 8px rgba(212,175,55,0.3))",
              }}
            >
              Every Mission
            </span>
          </h2>
          <p
            className="mt-4 text-base max-w-xl mx-auto"
            style={{ color: "rgba(251,191,36,0.5)" }}
          >
            Purpose-built digital solutions that help NGOs amplify their impact
            online no hidden costs, ever.
          </p>
        </div>

        {/* ── DESKTOP GRID (hidden on mobile) ── */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8 items-end max-w-5xl mx-auto">
          {ngoPlans.map((plan, idx) => (
            <div
              key={plan.name}
              className={`ngo-card relative rounded-2xl flex flex-col ${
                plan.recommended ? "recommended-card" : ""
              }`}
              style={{
                background:
                  "linear-gradient(145deg, rgba(15,15,20,0.95) 0%, rgba(10,10,15,0.98) 100%)",
                border: plan.recommended
                  ? "1.5px solid rgba(212,175,55,0.6)"
                  : `1px solid ${plan.borderColor}`,
                boxShadow: plan.recommended
                  ? `0 0 60px ${plan.glowColor}, 0 20px 60px rgba(0,0,0,0.5)`
                  : `0 8px 40px rgba(0,0,0,0.4)`,
                padding: "36px 28px 28px",
              }}
            >
              {plan.badge && (
                <div
                  className="ngo-badge"
                  style={{
                    background: `linear-gradient(135deg, ${
                      plan.recommended ? "#d4af37, #f4e5b8" : "#f4e5b8, #d4af37"
                    })`,
                  }}
                >
                  🚀 {plan.badge}
                </div>
              )}

              {/* Icon + Name */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center flex-shrink-0`}
                >
                  <plan.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3
                    className="font-bold text-lg leading-tight"
                    style={{
                      background: "linear-gradient(135deg, #d4af37, #f4e5b8)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: plan.recommended ? "transparent" : "white",
                    }}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "rgba(251,191,36,0.5)" }}
                  >
                    {plan.subtitle}
                  </p>
                </div>
              </div>

              {/* Price */}
              <div
                className="pb-5 mb-5"
                style={{
                  borderBottom: "1px solid rgba(212,175,55,0.12)",
                }}
              >
                <span
                  className="text-4xl font-black"
                  style={{ color: plan.recommended ? "#f4e5b8" : "white" }}
                >
                  {plan.price}
                </span>
                <span
                  className="text-sm ml-1"
                  style={{ color: "rgba(251,191,36,0.45)" }}
                >
                  {plan.period}
                </span>
              </div>

              {/* Features */}
              <ul className="flex-1 space-y-2.5 mb-7">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm">
                    {f.included ? (
                      <Check
                        className="feature-check flex-shrink-0"
                        size={14}
                      />
                    ) : (
                      <X className="feature-x flex-shrink-0" size={14} />
                    )}
                    <span
                      className={
                        f.included ? "feature-text-on" : "feature-text-off"
                      }
                    >
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              {plan.recommended ? (
                <button className="cta-btn-primary">🚀 {plan.cta}</button>
              ) : (
                <button className="cta-btn-secondary">🚀 {plan.cta}</button>
              )}
            </div>
          ))}
        </div>

        {/* ── MOBILE VIEW ── */}
        <div className="md:hidden">
          {/* Tab Switcher */}
          <div className="flex gap-2 mb-6">
            {ngoPlans.map((plan, idx) => (
              <button
                key={plan.name}
                className={`mobile-tab-btn ${activeMobileTab === idx ? "active" : ""}`}
                onClick={() => setActiveMobileTab(idx)}
              >
                {plan.name}
              </button>
            ))}
          </div>

          {/* Active Plan Card */}
          {ngoPlans.map((plan, idx) => {
            if (idx !== activeMobileTab) return null;
            return (
              <div
                key={plan.name}
                className="rounded-2xl"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(15,15,20,0.97), rgba(10,10,15,0.99))",
                  border: plan.recommended
                    ? "1.5px solid rgba(212,175,55,0.6)"
                    : `1px solid ${plan.borderColor}`,
                  boxShadow: `0 0 50px ${plan.glowColor}`,
                  padding: "28px 24px",
                }}
              >
                {/* Icon + Name */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center`}
                  >
                    <plan.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3
                      className="font-bold text-xl"
                      style={{
                        background: "linear-gradient(135deg, #d4af37, #f4e5b8)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                      }}
                    >
                      {plan.name}
                    </h3>
                    <p
                      className="text-xs"
                      style={{ color: "rgba(251,191,36,0.5)" }}
                    >
                      {plan.subtitle}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div
                  className="pb-4 mb-4"
                  style={{ borderBottom: "1px solid rgba(212,175,55,0.15)" }}
                >
                  <span className="text-4xl font-black text-white">
                    {plan.price}
                  </span>
                  <span
                    className="text-sm ml-1"
                    style={{ color: "rgba(251,191,36,0.45)" }}
                  >
                    {plan.period}
                  </span>
                </div>

                {/* Features two-column on mobile */}
                <div className="grid grid-cols-1 gap-2 mb-7">
                  {plan.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      {f.included ? (
                        <Check
                          className="feature-check flex-shrink-0"
                          size={14}
                        />
                      ) : (
                        <X className="feature-x flex-shrink-0" size={14} />
                      )}
                      <span
                        className={
                          f.included ? "feature-text-on" : "feature-text-off"
                        }
                      >
                        {f.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                {plan.recommended ? (
                  <button className="cta-btn-primary">🚀 {plan.cta}</button>
                ) : (
                  <button className="cta-btn-secondary">🚀 {plan.cta}</button>
                )}
              </div>
            );
          })}

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-5">
            {ngoPlans.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveMobileTab(idx)}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  background:
                    activeMobileTab === idx
                      ? "#d4af37"
                      : "rgba(212,175,55,0.25)",
                  transform: activeMobileTab === idx ? "scale(1.4)" : "scale(1)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// SECTION 2 Existing OptimalResults (untouched)
// ─────────────────────────────────────────────

type Phase = {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  steps: string[];
  deliverables: string[];
  badge: string;
};

const phases: Phase[] = [
  {
    icon: MessageSquare,
    badge: "Phase 1",
    title: "Discovery & Strategy",
    description:
      "We dive deep into your business, understand your goals, and plan the perfect solution tailored to your needs.",
    color: "from-amber-500 to-yellow-500",
    steps: [
      "Initial consultation & requirement gathering",
      "Market research & competitor analysis",
      "User persona & journey mapping",
      "Design concept & theme selection",
      "Technical architecture planning",
    ],
    deliverables: [
      "Comprehensive requirement document",
      "Visual design concepts",
      "Project roadmap & timeline",
      "Technology stack proposal",
      "First design draft",
    ],
  },
  {
    icon: Code2,
    badge: "Phase 2",
    title: "Development & Refinement",
    description:
      "Transforming strategy into reality with iterative development and continuous feedback integration.",
    color: "from-amber-600 to-yellow-600",
    steps: [
      "Development of first working prototype",
      "Client review & feedback collection",
      "Iterative improvements based on feedback",
      "Performance optimization",
      "Cross-browser & device testing",
    ],
    deliverables: [
      "Functional prototype",
      "Refined design system",
      "Performance audit report",
      "User testing results",
      "Final approved version",
    ],
  },
  {
    icon: CloudUpload,
    badge: "Phase 3",
    title: "Deployment & Launch",
    description:
      "Preparing your solution for the real world with robust deployment and post-launch support.",
    color: "from-amber-700 to-yellow-700",
    steps: [
      "Final quality assurance testing",
      "Server configuration & optimization",
      "Payment gateway integration",
      "Security implementation",
      "Live deployment & monitoring",
    ],
    deliverables: [
      "Live website/application",
      "Complete documentation",
      "SEO optimization",
      "Analytics setup",
      "Performance monitoring dashboard",
    ],
  },
];

const OptimalResults: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const phaseCardsRef = useRef<HTMLDivElement[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.playsInline = true;
      video.preload = "auto";
      video.play().catch((e) => {
        console.log("Autoplay blocked, waiting for interaction:", e);
      });
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("in-view");
        });
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useGSAP(() => {
    const bonusCard = document.querySelector(".bonus-card");
    if (!bonusCard) return;

    gsap.fromTo(
      bonusCard,
      { scale: 0.95, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: bonusCard,
          start: "top 80%",
          end: "bottom 30%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative pt-0 pb-4 md:pt-10 md:pb-20 overflow-hidden bg-black"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-[520px] h-[520px] rounded-full blur-[140px]"
          style={{ background: "rgba(217,119,6,0.04)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[620px] h-[620px] rounded-full blur-[160px]"
          style={{ background: "rgba(251,191,36,0.03)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      <style>{`
        .step-item { 
          position: relative; 
          padding-left: 28px; 
          margin-bottom: 12px; 
        }
        .step-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 8px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: linear-gradient(135deg, #d4af37, #f4e5b8);
        }

        .phase-card:hover .phase-card-inner {
          transform: translateY(-8px);
          border-color: rgba(212, 175, 55, 0.4) !important;
          box-shadow: 0 0 25px rgba(212, 175, 55, 0.25) !important;
          transition: all 0.3s ease-out;
        }
        
        .phase-icon { transition: transform 0.3s ease-out; }

        .phase-badge {
          position: absolute;
          top: -30px;
          left: 50%;
          transform: translateX(-50%);
          width: 180px;
          height: 58px;
          border-bottom-left-radius: 999px;
          border-bottom-right-radius: 999px;
          border-top-left-radius: 0;
          border-top-right-radius: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 30;
          padding-top: 12px;

          background:
            radial-gradient(circle at 50% 10%, rgba(212, 175, 55, 0.35), transparent 65%),
            linear-gradient(180deg, rgba(2, 6, 23, 0.95), rgba(2, 6, 23, 0.60));
          border: 1px solid rgba(212, 175, 55, 0.6);
          box-shadow:
            0 14px 44px rgba(0,0,0,0.50),
            0 0 34px rgba(212, 175, 55, 0.18);
          backdrop-filter: blur(10px);
        }

        .phase-badge span {
          color: #ffffff !important;
          font-weight: 900 !important;
          font-size: 13px !important;
          letter-spacing: 0.15em !important;
          text-transform: uppercase !important;
          text-shadow:
            0 0 10px rgba(212, 175, 55, 0.25),
            0 0 22px rgba(0,0,0,0.35);
          position: relative;
          z-index: 10;
          white-space: nowrap;
          line-height: 1;
        }

        .phase-badge::after {
          content: '';
          position: absolute;
          bottom: 8px;
          left: 50%;
          transform: translateX(-50%);
          width: 50px;
          height: 2px;
          border-radius: 999px;
          background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.9), transparent);
          opacity: 0.9;
        }

        .phase-connector {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.4), transparent);
          transform: translateY(-50%);
          z-index: 0;
        }

        @media (prefers-reduced-motion: reduce) {
          .phase-card:hover .phase-card-inner {
            transform: none !important;
          }
        }
      `}</style>

      <div className="container mx-auto px-4 relative z-10">
        <div className="mt-6 md:mt-8">
          <div ref={containerRef} className="text-center mb-8 px-2">
            <h1 className="block md:hidden font-bold text-3xl leading-tight">
              <span className="block text-white mb-1">Our Process for</span>
              <span
                className="block"
                style={{
                  background: "linear-gradient(135deg, #d4af37, #f4e5b8, #c9a961)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  display: "inline-block",
                  fontWeight: 700,
                  filter: "drop-shadow(0 2px 8px rgba(212, 175, 55, 0.3))",
                }}
              >
                Optimal Results
              </span>
            </h1>

            <h2 className="hidden md:block font-bold text-3xl lg:text-3xl leading-tight">
              <span className="text-white mr-2">Streamlined</span>
              <span className="text-white mr-2">Process</span>
              <span className="text-white mr-2">for</span>
              <span
                className="mr-2"
                style={{
                  background: "linear-gradient(135deg, #d4af37, #f4e5b8, #c9a961)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  display: "inline-block",
                  fontWeight: 700,
                  filter: "drop-shadow(0 2px 8px rgba(212, 175, 55, 0.3))",
                }}
              >
                Optimal
              </span>
              <span
                style={{
                  background: "linear-gradient(135deg, #d4af37, #f4e5b8, #c9a961)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  display: "inline-block",
                  fontWeight: 700,
                  filter: "drop-shadow(0 2px 8px rgba(212, 175, 55, 0.3))",
                }}
              >
                Results
              </span>
            </h2>
          </div>

          <div className="relative mt-16 md:mt-20 mb-16">
            <div className="phase-connector hidden lg:block"></div>

            <div className="grid lg:grid-cols-3 gap-16 lg:gap-6 relative z-10">
              {phases.map((phase, index) => (
                <div
                  key={index}
                  ref={(node) => {
                    if (node) phaseCardsRef.current[index] = node;
                  }}
                  className="phase-card relative group"
                >
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${phase.color} opacity-10 blur-xl group-hover:opacity-20 transition-opacity duration-300`}
                  ></div>

                  <div className="phase-card-inner relative bg-gradient-to-br from-slate-900/60 to-slate-800/30 backdrop-blur-xl rounded-2xl p-6 pt-14 border border-amber-500/20 transition-all duration-300 h-full min-h-[480px] lg:max-h-[480px] flex flex-col">
                    <div className="phase-badge">
                      <span>{phase.badge}</span>
                    </div>

                    <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-amber-500 flex items-center justify-center">
                      <span className="text-amber-400 font-bold text-xl">
                        {index + 1}
                      </span>
                    </div>

                    <div className="phase-icon mb-4 transition-transform duration-300">
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${phase.color} p-3`}
                      >
                        <phase.icon className="w-full h-full text-white" />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3">
                      {phase.title}
                    </h3>
                    <p className="text-amber-100/80 mb-6 text-sm">
                      {phase.description}
                    </p>

                    <div className="flex-1">
                      <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-3">
                        Key Steps
                      </h4>
                      <ul className="space-y-2">
                        {phase.steps.map((step, i) => (
                          <li
                            key={i}
                            className="step-item text-amber-100/70 text-sm"
                          >
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 p-6 bg-slate-800/30 rounded-2xl backdrop-blur-sm border border-amber-500/20">
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-400">3</div>
                <div className="text-amber-100/70">Structured Phases</div>
              </div>
              <div className="hidden md:block">
                <Rocket className="w-8 h-8 text-amber-500 rotate-45" />
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-400">30+</div>
                <div className="text-amber-100/70">Deliverables</div>
              </div>
              <div className="hidden md:block">
                <Rocket className="w-8 h-8 text-amber-500 rotate-45" />
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-400">30</div>
                <div className="text-amber-100/70">Days Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// Root Export
// ─────────────────────────────────────────────

const App: React.FC = () => (
  <>
    {/* <NGOPricingSection /> */}
    <OptimalResults />
  </>
);

export default App;
