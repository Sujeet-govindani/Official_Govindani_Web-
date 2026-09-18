import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import {
  Repeat,
  MailCheck,
  HeartHandshake,
  Users,
  Megaphone,
  ClipboardList,
  CreditCard,
  LayoutDashboard,
  Lock,
  X,
  Send,
  Calendar,
  ChevronDown,
  Link2,
  UserCircle2,
  Receipt,
  Flower2,
  Globe,
  ArrowUpCircle,
  Wallet,
  Sparkles,
} from "lucide-react";

// ✅ Popups removed as requested
// ✅ Import the ContactUsForm component
import ContactUsForm from "../pages/ContactUsForm";

gsap.registerPlugin(ScrollTrigger);

type Feature = {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  image?: string;
  blank?: boolean;
};

const iconClass = "h-10 w-10";

function burstParticles(hostEl: HTMLElement, clientX: number, clientY: number) {
  const rect = hostEl.getBoundingClientRect();
  const localX = clientX - rect.left;
  const localY = clientY - rect.top;

  const count = 14;
  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    p.className = "burst-particle";
    p.style.left = `${localX}px`;
    p.style.top = `${localY}px`;
    hostEl.appendChild(p);

    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.35;
    const dist = 34 + Math.random() * 46;

    gsap.fromTo(
      p,
      { x: 0, y: 0, scale: 1, opacity: 1 },
      {
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        scale: 0,
        opacity: 0,
        duration: 0.65,
        ease: "power3.out",
        onComplete: () => p.remove(),
      }
    );
  }
}

const NgoServicesSection = () => {
  const [showDigital, setShowDigital] = useState(false);
  const [showLine, setShowLine] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [viewMoreClicked, setViewMoreClicked] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const viewMoreBtnRef = useRef<HTMLButtonElement | null>(null);
  const extraWrapRef = useRef<HTMLDivElement | null>(null);
  const sparkleLayerRef = useRef<HTMLDivElement | null>(null);
  const headingHostRef = useRef<HTMLSpanElement | null>(null);
  const headingSparkleLayerRef = useRef<HTMLSpanElement | null>(null);

  const headingContainerRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useRef(false);

  useEffect(() => {
    const checkMobile = () => {
      isMobile.current = window.innerWidth < 768;
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const particles = useMemo(
    () =>
      Array.from({ length: isMobile.current ? 10 : 20 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        dur: 5 + Math.random() * 10,
        delay: Math.random() * 5,
        drift: Math.random() * 100 - 50,
      })),
    []
  );

  const cubes = useMemo(
    () =>
      Array.from({ length: isMobile.current ? 6 : 12 }).map(() => ({
        left: Math.random() * 90,
        top: Math.random() * 90,
        dur: 8 + Math.random() * 12,
        delay: Math.random() * 6,
        drift1: Math.random() * 40 - 20,
        drift2: Math.random() * 60 - 30,
      })),
    []
  );

  const floatKeyframesCss = useMemo(() => {
    const particleCss = particles
      .map(
        (p, i) => `
@keyframes float-${i} {
  0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(-100vh) translateX(${p.drift}px); opacity: 0; }
}`
      )
      .join("\n");

    const cubeCss = cubes
      .map(
        (c, i) => `
@keyframes floatCube-${i} {
  0% { transform: translateY(0) translateX(0) rotateX(0deg) rotateY(0deg) rotateZ(0deg); opacity: 0; }
  10% { opacity: 0.6; }
  50% { transform: translateY(-50vh) translateX(${c.drift1}px) rotateX(180deg) rotateY(360deg) rotateZ(180deg); opacity: 0.4; }
  90% { opacity: 0.6; }
  100% { transform: translateY(-100vh) translateX(${c.drift2}px) rotateX(360deg) rotateY(720deg) rotateZ(360deg); opacity: 0; }
}`
      )
      .join("\n");

    const sparkleCss = `
@keyframes vmSparkle {
  0%   { transform: translate(-50%, -50%) translate(0px, 0px) scale(0.2); opacity: 0; filter: blur(1px); }
  12%  { opacity: 1; }
  100% { transform: translate(-50%, -50%) translate(var(--tx), var(--ty)) scale(1); opacity: 0; filter: blur(0px); }
}`;

    const energyCss = `
.energy-btn { position: relative; isolation: isolate; overflow: hidden; }
.energy-btn .energy-bg {
  position: absolute; inset: -40%; border-radius: 9999px; z-index: 0;
  background:
    radial-gradient(closest-side, rgba(212,175,55,0.22), transparent 65%),
    radial-gradient(closest-side, rgba(255,215,120,0.18), transparent 62%),
    conic-gradient(from 90deg, rgba(212,175,55,0.00), rgba(212,175,55,0.22), rgba(255,215,120,0.20), rgba(212,175,55,0.00));
  filter: blur(12px); opacity: 0.85; animation: energySpin 4.2s linear infinite;
  transform: translateZ(0);
}
.energy-btn .energy-border {
  position: absolute; inset: -2px; border-radius: 9999px; z-index: 1; padding: 2px;
  background: conic-gradient(from 0deg, rgba(212,175,55,0.85), rgba(255,215,120,0.75), rgba(201,169,97,0.85), rgba(212,175,55,0.85));
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0.55; transition: opacity 250ms ease, filter 250ms ease;
}
.energy-btn:hover .energy-border { opacity: 0.85; filter: drop-shadow(0 0 18px rgba(212,175,55,0.28)); }
@keyframes energySpin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
`;

    return `${particleCss}\n${cubeCss}\n${sparkleCss}\n${energyCss}`;
  }, [particles, cubes]);

  useEffect(() => {
    const t1 = window.setTimeout(() => setShowDigital(true), 900);
    const t2 = window.setTimeout(() => setShowLine(true), 2200);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
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

    if (headingContainerRef.current) observer.observe(headingContainerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!showForm) {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [showForm]);

  const openGoogleForm = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  useEffect(() => {
    if (!showForm) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeForm();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showForm]);

  const handleSuccessSubmit = () => {
    setUnlocked(true);
    window.setTimeout(() => {
      extraWrapRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 250);
  };

  const burstSparkles = () => {
    const layer = sparkleLayerRef.current;
    if (!layer) return;

    const sparkles = layer.querySelectorAll<HTMLElement>(".vm-sparkle");
    if (!sparkles.length) return;

    gsap.killTweensOf(sparkles);
    sparkles.forEach((s) => {
      s.style.animation = "none";
      s.offsetHeight;
      s.style.animation = "vmSparkle 760ms ease-out forwards";
    });

    gsap.set(sparkles, { opacity: 0, scale: 0.25 });
    gsap.to(sparkles, {
      opacity: 1,
      scale: 1,
      duration: 0.1,
      ease: "power2.out",
      stagger: 0.015,
    });

    gsap.to(sparkles, { opacity: 0, duration: 0.22, delay: 0.55, ease: "power2.out" });
  };

  const handleViewMore = () => {
    const btn = viewMoreBtnRef.current;
    if (btn) {
      gsap.fromTo(btn, { scale: 1 }, { scale: 1.04, duration: 0.12, yoyo: true, repeat: 1, ease: "power2.out" });
    }

    setViewMoreClicked(true);
    burstSparkles();
    window.setTimeout(() => setViewMoreClicked(false), 900);

    window.setTimeout(() => {
      openGoogleForm();
    }, 280);
  };

  const handleFeatureClick = (index: number) => {
    if (index >= 8 && !unlocked) {
      openGoogleForm();
    }
  };

  const features: Feature[] = [
    {
      title: "Recurring Donation",
      description: "Enable donors to give automatically.\nMonthly or yearly plans supported.",
      icon: <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/icon-Recurring-Donations.png" alt="Recurring Donation" className={iconClass} loading="lazy" decoding="async" />,
    },
    {
      title: "Fee Recovery",
      description: "Allow donors to optionally cover credit card processing fees so that 100% of their intended donation goes directly to your cause.",
      icon: <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/icon-Fee-Recovery.png" alt="Fee Recovery" className={iconClass} loading="lazy" decoding="async" />,
    },
    {
      title: "Funds and Designations",
      description: "Set donation funds and designations to enhance your online fundraising structure",
      icon: <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/icon-Funds-Designations.webp" alt="Funds and Designations" className={iconClass} loading="lazy" decoding="async" />,
    },
    {
      title: "Gift Aid",
      description: "Gift Aid is a program the UK government put in place to encourage donors to give more via a tax relief incentive.",
      icon: <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/icon-Gift-Aid.png" alt="Gift Aid" className={iconClass} loading="lazy" decoding="async" />,
    },
    {
      title: "Webhooks",
      description: "Webhooks allow your website to communicate with other web applications in real-time by sending notifications.",
      icon: <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/icon-Webhooks2.webp" alt="Webhooks" className={iconClass} loading="lazy" decoding="async" />,
    },
    {
      title: "ActiveCampaign",
      description: "ActiveCampaign helps you boost fundraising by automating email campaigns and strengthening donor relationships through smart CRM tools.",
      icon: <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/icon-Active-Campaign.png" alt="ActiveCampaign" className={iconClass} loading="lazy" decoding="async" />,
    },
    {
      title: "Mollie Payment Gateway",
      description: "Let donors give quickly and securely using iDEAL, credit cards, bank transfers, PayPal, Belfius Direct Net, and SOFORT.",
      icon: <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Mollie1.png" alt="Mollie Payment Gateway" className={iconClass} loading="lazy" decoding="async" />,
    },
    {
      title: "PDF Receipts",
      description: "PDF Receipts lets donors easily download and print their tax-deductible donation receipts anytime.",
      icon: <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/icon-PDF-Receipts.webp" alt="PDF Receipts" className={iconClass} loading="lazy" decoding="async" />,
    },
    {
      title: "Peer to peer Fundraising",
      description: "Let supporters create personal fundraising pages.\nTrack team goals and social sharing.",
      icon: <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/peer1.png" alt="Peer to Peer Fundraising" className={iconClass} loading="lazy" decoding="async" />,
    },
    {
      title: "Paytm Gateway",
      description: "Give members a private dashboard experience.\nView receipts, profile, and giving history.",
      icon: <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/paytm1.png" alt="Memberdash" className={iconClass} loading="lazy" decoding="async" />,
    },
    {
      title: "Annual Receipt",
      description: "Generate yearly donation receipts automatically.\nOne-click email and download options.",
      icon: <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/icon-Annual-Receipts.png" alt="Annual Receipt" className={iconClass} loading="lazy" decoding="async" />,
    },
    {
      title: "Tributes",
      description: "Accept donations made in honor or memory of someone and automatically send tribute emails and acknowledgements.",
      icon: <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/icon-Tributes.png" alt="Tributes" className={iconClass} loading="lazy" decoding="async" />,
    },
    {
      title: "Currency Switcher",
      description: "Let donors choose their preferred currency.\nShow amounts correctly for global donors.",
      icon: <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/icon-Currency-Switcher.png" alt="Currency Switcher" className={iconClass} loading="lazy" decoding="async" />,
    },
    {
      title: "Donation Upsells For WooCommerce",
      description: "Add donation prompts in checkout and cart.\nIncrease average donation per order.",
      icon: <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/icon-woo3.png" alt="Donation Upsells" className={iconClass} loading="lazy" decoding="async" />,
    },
    {
      title: "Stripe Gateway",
      description: "Accept secure Stripe card payments easily.\nSupports one-time and recurring donations.",
      icon: <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/stripemain.png" alt="Stripe Gateway" className={iconClass} loading="lazy" decoding="async" />,
    },
    {
      title: "JOVVIE",
      description: "Engage donors with smart automation tools.\nImprove retention and follow-up flows.",
      icon: <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/jovvie-icon12.png" alt="JOVVIE" className={iconClass} loading="lazy" decoding="async" />,
    },
  ];

  useGSAP(
    () => {
      const el = sectionRef.current;
      if (!el) return;

      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      ScrollTrigger.config({ ignoreMobileResize: true });

      const cards = gsap.utils.toArray<HTMLElement>(el.querySelectorAll(".service-card.top-card"));
      if (!cards.length) return;

      if (prefersReduced) {
        gsap.set(cards, { clearProps: "all", autoAlpha: 1 });
        return;
      }

      gsap.set(cards, {
        willChange: "transform, opacity, filter",
        autoAlpha: 0,
        y: 40,
        scale: 0.96,
        filter: "blur(8px)",
        force3D: true,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el.querySelector(".cards-wrap-top") || el,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
          invalidateOnRefresh: true,
          markers: false,
        },
      });

      tl.to(cards, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power3.out",
        stagger: { each: 0.06, from: "start" },
      });

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    { scope: sectionRef }
  );

  useGSAP(
    () => {
      if (unlocked) return;

      const btn = viewMoreBtnRef.current;
      if (!btn) return;

      const intro = gsap.fromTo(
        btn,
        { autoAlpha: 0, y: 18, scale: 0.95, filter: "blur(6px)" },
        { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.8, ease: "expo.out", delay: 0.15 }
      );

      const float = gsap.to(btn, { y: -4, duration: 1.8, ease: "sine.inOut", yoyo: true, repeat: -1 });

      return () => {
        intro.kill();
        float.kill();
      };
    },
    { scope: sectionRef, dependencies: [unlocked] }
  );

  useEffect(() => {
    const wrap = extraWrapRef.current;
    if (!wrap) return;

    const cards = gsap.utils.toArray<HTMLElement>(wrap.querySelectorAll(".service-card.extra-card"));
    if (!cards.length) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    if (!unlocked) {
      gsap.set(cards, { autoAlpha: 0.8, y: 0, scale: 1, filter: "blur(6px)" });
      return;
    }

    gsap.to(cards, {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.06,
    });
  }, [unlocked]);

  const sparkleHeadingDots = () => {
    const host = headingHostRef.current;
    const layer = headingSparkleLayerRef.current;
    if (!host || !layer) return;

    layer.querySelectorAll(".heading-dot").forEach((n) => n.remove());

    const rect = host.getBoundingClientRect();
    const count = isMobile.current ? 8 : 14;

    for (let i = 0; i < count; i++) {
      const dot = document.createElement("span");
      dot.className = "heading-dot";

      const side = Math.floor(Math.random() * 4);
      const pad = 10 + Math.random() * 18;

      let x = Math.random() * rect.width;
      let y = Math.random() * rect.height;

      if (side === 0) y = -pad;
      if (side === 2) y = rect.height + pad;
      if (side === 1) x = rect.width + pad;
      if (side === 3) x = -pad;

      x += (Math.random() - 0.5) * 14;
      y += (Math.random() - 0.5) * 10;

      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;

      const size = i % 4 === 0 ? 6 : 4;
      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;

      dot.style.background = i % 3 === 0 ? "rgba(212,175,55,0.95)" : "rgba(244,229,184,0.70)";
      dot.style.boxShadow = "0 0 14px rgba(212,175,55,0.45)";

      layer.appendChild(dot);

      gsap.fromTo(dot, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.18, ease: "power2.out" });

      gsap.to(dot, {
        y: -10 - Math.random() * 10,
        x: (Math.random() - 0.5) * 20,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        onComplete: () => dot.remove(),
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-12 md:py-16 relative overflow-hidden bg-black"
    >
      {/* Simple black background with subtle golden glow - NO ANIMATIONS */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-[520px] h-[520px] rounded-full blur-[140px]"
          style={{ background: "rgba(217,119,6,0.04)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[620px] h-[620px] rounded-full blur-[160px]"
          style={{ background: "rgba(251,191,36,0.03)" }}
        />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      {/* Subtle gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent" />

      {/* Floating particles (kept minimal) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-amber-500/20 rounded-full"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              animation: `float-${i} ${p.dur}s linear infinite`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Floating cubes (kept minimal) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {cubes.map((c, i) => (
          <div
            key={`cube-${i}`}
            className="absolute w-4 md:w-6 h-4 md:h-6"
            style={{
              left: `${c.left}%`,
              top: `${c.top}%`,
              animation: `floatCube-${i} ${c.dur}s ease-in-out infinite`,
              animationDelay: `${c.delay}s`,
              transformStyle: "preserve-3d",
            }}
          >
            <div
              className="absolute w-4 md:w-6 h-4 md:h-6 border border-amber-400/10 backdrop-blur-sm"
              style={{
                transform: "translateZ(2px)",
                background: "rgba(2, 6, 23, 0.4)",
              }}
            />
            <div
              className="absolute w-4 md:w-6 h-4 md:h-6 border border-amber-400/10 backdrop-blur-sm"
              style={{
                transform: "rotateY(90deg) translateZ(2px)",
                background: "rgba(2, 6, 23, 0.4)",
              }}
            />
            <div
              className="absolute w-4 md:w-6 h-4 md:h-6 border border-amber-400/10 backdrop-blur-sm"
              style={{
                transform: "rotateX(90deg) translateZ(2px)",
                background: "rgba(2, 6, 23, 0.4)",
              }}
            />
          </div>
        ))}
      </div>

      <style>{floatKeyframesCss}</style>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-8 md:mb-12">
          <div ref={headingContainerRef} className="mt-2 md:mt-4">
            <h2 className="font-bold text-2xl sm:text-3xl md:text-3xl lg:text-3xl leading-tight px-2">
              <span className="inline-block mr-2">
                <span className="white-text">Premium</span>
              </span>
              <span className="inline-block mr-2">
                <span className="golden-text">Solutions</span>
              </span>
              <span className="inline-block mr-2">
                <span className="white-text">for</span>
              </span>
              <span className="inline-block">
                <span className="golden-text">Excellence</span>
              </span>
            </h2>
          </div>
        </div>

        <div className="cards-wrap-top grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {features.slice(0, 8).map((feature, index) => (
            <FeatureCard
              key={index}
              feature={feature}
              cardClassName="top-card"
              unlocked={true}
              onClick={() => handleFeatureClick(index)}
            />
          ))}
        </div>

        <div className="mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {features.slice(8, 12).map((feature, index) => (
            <FeatureCard
              key={`extra-first-${index}`}
              feature={feature}
              cardClassName="extra-card"
              unlocked={unlocked}
              onClick={() => handleFeatureClick(index + 8)}
            />
          ))}
        </div>

        {!unlocked && (
          <div className="relative my-8 md:my-12 flex justify-center items-center">
            <div className="pointer-events-auto relative">
              <div
                ref={sparkleLayerRef}
                className="absolute left-1/2 top-1/2 z-30 pointer-events-none"
                style={{
                  width: "280px",
                  height: "70px",
                  transform: "translate(-50%, -50%)",
                  overflow: "visible",
                }}
                aria-hidden="true"
              >
                {Array.from({ length: 14 }).map((_, i) => {
                  const angle = (Math.PI * 2 * i) / 14;
                  const radius = 40 + (i % 5) * 8;
                  const tx = Math.cos(angle) * radius;
                  const ty = Math.sin(angle) * (radius * 0.65);

                  const isGold = i % 2 === 0;
                  return (
                    <span
                      key={`sp-${i}`}
                      className="vm-sparkle absolute left-1/2 top-1/2 rounded-full"
                      style={{
                        width: i % 3 === 0 ? 8 : 6,
                        height: i % 3 === 0 ? 8 : 6,
                        opacity: 0,
                        background: isGold ? "rgba(212, 175, 55, 0.95)" : "rgba(255, 215, 120, 0.92)",
                        boxShadow: isGold
                          ? "0 0 12px rgba(212, 175, 55, 0.5)"
                          : "0 0 12px rgba(255, 215, 120, 0.5)",
                        ["--tx" as any]: `${tx}px`,
                        ["--ty" as any]: `${ty}px`,
                      }}
                    />
                  );
                })}
              </div>

              <button
                ref={viewMoreBtnRef}
                onClick={handleViewMore}
                className="
                  energy-btn
                  group relative
                  inline-flex items-center justify-center gap-2
                  w-[220px] sm:w-[260px] md:w-[300px]
                  h-12 md:h-14
                  px-6 md:px-10
                  rounded-full
                  backdrop-blur-sm
                  text-sm md:text-base font-semibold
                  border border-amber-400/30
                  transition-all duration-300
                  active:scale-[0.98]
                "
                style={{
                  background: viewMoreClicked
                    ? "linear-gradient(90deg, rgba(2, 6, 23, 0.95), rgba(255,215,120,0.16))"
                    : "linear-gradient(90deg, rgba(255,215,120,0.14), rgba(212,175,55,0.10))",
                  borderColor: viewMoreClicked ? "rgba(212,175,55,0.45)" : "rgba(212,175,55,0.18)",
                  boxShadow: viewMoreClicked
                    ? "0 16px 32px rgba(212,175,55,0.12), 0 12px 24px rgba(255,215,120,0.10)"
                    : "0 12px 24px rgba(255,215,120,0.12)",
                  color: viewMoreClicked ? "rgba(254, 250, 240, 0.98)" : "rgba(255, 215, 120, 0.98)",
                }}
                type="button"
              >
                <span className="energy-bg" />
                <span className="energy-border" />

                <span
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(600px circle at 50% 40%, rgba(2, 6, 23, 0.95), rgba(212,175,55,0.08), transparent 50%)",
                  }}
                />

                <Lock className="h-4 w-4 md:h-5 md:w-5 relative z-10 text-amber-400" />
                <span className="relative z-10">Unlock More</span>
                <span className="relative z-10 translate-x-0 group-hover:translate-x-1 transition-transform duration-300 text-amber-400">
                  →
                </span>
              </button>
            </div>
          </div>
        )}

        <div ref={extraWrapRef} className="mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {features.slice(12).map((feature, index) => (
            <FeatureCard
              key={`extra-second-${index}`}
              feature={feature}
              cardClassName="extra-card"
              unlocked={unlocked}
              onClick={() => handleFeatureClick(index + 12)}
            />
          ))}
        </div>
      </div>


      {/* ✅ Use the new ContactUsForm component in a modal via React Portal */}
      {showForm && typeof window !== "undefined" && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8"
          onClick={closeForm}
        >
          <div
            className="relative w-full max-w-5xl h-[90vh] overflow-y-auto rounded-3xl border border-amber-500/30 bg-black shadow-2xl custom-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            <ContactUsForm onSuccess={handleSuccessSubmit} isModal={true} onClose={closeForm} />
          </div>
        </div>,
        document.body
      )}

      <style>{`
        /* ✅ Improved Mobile Responsiveness */
        @media (max-width: 640px) {
          .service-card {
            height: 240px !important;
            padding: 1.5rem !important;
          }
          
          .container {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
        }

        @media (max-width: 768px) {
          .cards-wrap-top {
            gap: 1rem !important;
          }
          
          .hero-heading {
            font-size: 1.875rem !important;
            line-height: 2.25rem !important;
          }
        }

        /* ✅ Smoother Animations */
        .service-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }

        .service-card:hover {
          transform: translateY(-4px) scale(1.02) !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }

        /* ✅ Animated Heading Styles */
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        
        .subtitle { opacity: 0; transform: translateY(20px); }
        .in-view .subtitle { animation: fadeSlideUp 0.6s ease-out forwards; }
        .word {
          display: inline-block; opacity: 0; transform: translateY(30px);
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .in-view .word { 
          animation: fadeSlideUp 0.6s ease-out forwards, float 3s ease-in-out infinite;
          animation-fill-mode: both;
        }
        .word:hover { transform: translateY(-6px) scale(1.03); }
        .word-0 { animation-delay: 0.2s; }
        .word-1 { animation-delay: 0.4s; }

        @media (max-width: 768px) {
          .word {
            animation: fadeSlideUp 0.6s ease-out forwards !important;
          }
          .word:hover {
            transform: translateY(-4px) scale(1.02) !important;
          }
        }

        .white-text {
          color: white;
          display: inline-block;
          font-weight: 700;
        }
        
        .golden-text {
          background: linear-gradient(135deg, #d4af37, #f4e5b8, #c9a961);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          display: inline-block;
          font-weight: 700;
          filter: drop-shadow(0 2px 8px rgba(212, 175, 55, 0.3));
        }

        /* ✅ Particle burst */
        .burst-particle{
          position:absolute;
          width:5px;
          height:5px;
          border-radius:999px;
          background: rgba(212, 175, 55, 0.75);
          box-shadow: 0 0 8px rgba(212, 175, 55, 0.55);
          pointer-events:none;
          transform: translate(-50%, -50%);
          z-index: 40;
        }

        /* ✅ Heading soft sparkle dots */
        .heading-dot{
          position:absolute;
          border-radius:999px;
          pointer-events:none;
          transform: translate(-50%, -50%);
          z-index: 6;
        }

        @media (max-width: 768px) {
          .shooting {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce){
          .service-card, .word { animation: none !important; }
          .service-card:hover { transform: none !important; }
        }

        /* ✅ FIXED: Improved Card Hover Effects with proper border-radius containment */
        .service-card{
          position: relative;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          backface-visibility: hidden;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          overflow: hidden !important;
          isolation: isolate;
          border: 1px solid rgba(212, 175, 55, 0.2);
          background: linear-gradient(180deg, rgba(15, 25, 45, 0.95), rgba(8, 15, 30, 0.85));
          backdrop-filter: blur(10px);
        }

        .service-card:hover{
          border-color: rgba(212, 175, 55, 0.5) !important;
          box-shadow:
            0 5px 15px rgba(0,0,0,0.2),
            0 0 15px rgba(212, 175, 55, 0.25) !important;
          transform: translateY(-6px) scale(1.02) !important;
        }

        .service-card > * {
          border-radius: inherit;
        }

        .service-card::before,
        .service-card::after,
        .service-card .icon-ring,
        .service-card .icon-pulse {
          border-radius: inherit !important;
        }

        /* ✅ Touch-friendly improvements */
        @media (hover: none) {
          .service-card:hover {
            transform: none !important;
          }
          
          .word:hover {
            transform: none !important;
          }
          
          .energy-btn:hover .energy-border {
            opacity: 0.55 !important;
          }
        }

        /* ✅ Better scrolling on mobile */
        @media (max-width: 768px) {
          html {
            -webkit-overflow-scrolling: touch;
          }
          
          .modal-panel {
            -webkit-overflow-scrolling: touch;
            overscroll-behavior: contain;
          }
        }

        /* ✅ Performance optimizations */
        .service-card * {
          transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-font-smoothing: antialiased;
        }

        /* ✅ Icon container styles */
        .service-card .icon-container {
          background: white;
          border: 2px solid rgba(212, 175, 55, 0.3);
          box-shadow: 0 0 8px rgba(212,175,55,0.3), inset 0 0 10px rgba(255,255,255,0.8);
        }

        .service-card:hover .icon-container {
          border-color: rgba(212, 175, 55, 0.6);
          box-shadow: 0 0 15px rgba(212,175,55,0.4), inset 0 0 15px rgba(255,255,255,0.9);
        }
      `}</style>
    </section>
  );
};

const FeatureCard = ({
  feature,
  cardClassName = "",
  unlocked = true,
  onClick,
}: {
  feature: Feature;
  cardClassName?: string;
  unlocked?: boolean;
  onClick?: () => void;
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const iconWrapRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);

  const isLocked = cardClassName.includes("extra-card") && !unlocked;
  const isBlank = !!feature.blank;
  const isMobile = typeof window !== "undefined" ? window.innerWidth < 768 : false;

  useLayoutEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    if (isLocked || isBlank || isMobile) {
      card.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
      return;
    }

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const baseShadow = "0 5px 15px rgba(0,0,0,0.15)";
    card.style.boxShadow = baseShadow;

    if (prefersReduced) return;

    const iconEl = iconWrapRef.current;
    const titleEl = titleRef.current;
    const descEl = descRef.current;

    const setX = gsap.quickSetter(card, "x", "px") as (v: number) => void;
    const setY = gsap.quickSetter(card, "y", "px") as (v: number) => void;
    const setShadow = gsap.quickSetter(card, "boxShadow") as (v: string) => void;

    const setIconX = iconEl ? (gsap.quickSetter(iconEl, "x", "px") as (v: number) => void) : null;
    const setIconY = iconEl ? (gsap.quickSetter(iconEl, "y", "px") as (v: number) => void) : null;
    const setTitleX = titleEl ? (gsap.quickSetter(titleEl, "x", "px") as (v: number) => void) : null;
    const setDescX = descEl ? (gsap.quickSetter(descEl, "x", "px") as (v: number) => void) : null;

    const onMove = (e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;

      const mx = (px - 0.5) * 8;
      const my = (py - 0.5) * 8;
      setX(mx);
      setY(my);

      const dx = px - 0.5;
      const dy = py - 0.5;

      if (setIconX && setIconY) {
        setIconX(dx * 8);
        setIconY(dy * 6);
      }
      if (setTitleX) setTitleX(dx * 5);
      if (setDescX) setDescX(dx * 3);

      const golden = `${(dx * 12).toFixed(1)}px ${(dy * 12).toFixed(1)}px 20px rgba(212, 175, 55, 0.15)`;
      const soft = `0 5px 12px rgba(0, 0, 0, 0.1)`;
      setShadow(`${golden}, ${soft}`);

      const angle = Math.round(
        Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * (180 / Math.PI)
      );
      card.style.setProperty("--a", `${angle}deg`);
      card.style.setProperty("--mx", `${px * 100}%`);
      card.style.setProperty("--my", `${py * 100}%`);
    };

    const onEnter = (e: MouseEvent) => {
      gsap.to(card, { duration: 0.15, ease: "power3.out", scale: 1.02, y: -2 });

      if (iconEl) {
        const ring = iconEl.querySelector(".icon-ring") as HTMLElement | null;
        const pulse = iconEl.querySelector(".icon-pulse") as HTMLElement | null;

        if (ring) gsap.to(ring, { rotate: "+=180", duration: 0.7, ease: "power2.out" });
        if (pulse) {
          gsap.fromTo(pulse, { scale: 0.9, opacity: 0.0 }, { scale: 1.6, opacity: 0, duration: 0.45, ease: "power2.out" });
        }
      }

      burstParticles(card, e.clientX, e.clientY);
    };

    const onLeave = () => {
      gsap.to(card, { x: 0, y: 0, scale: 1, duration: 0.25, ease: "power3.out" });
      if (iconEl) gsap.to(iconEl, { x: 0, y: 0, duration: 0.25, ease: "power3.out" });
      if (titleEl) gsap.to(titleEl, { x: 0, duration: 0.25, ease: "power3.out" });
      if (descEl) gsap.to(descEl, { x: 0, duration: 0.25, ease: "power3.out" });
      setShadow(baseShadow);

      card.style.setProperty("--a", `0deg`);
      card.style.setProperty("--mx", `50%`);
      card.style.setProperty("--my", `40%`);
    };

    card.style.setProperty("--a", `0deg`);
    card.style.setProperty("--mx", `50%`);
    card.style.setProperty("--my", `40%`);

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("mouseleave", onLeave);

    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseenter", onEnter);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, [isLocked, isBlank, isMobile]);

  const lines = (feature.description || "").split("\n").slice(0, 2);

  const lockedStyle = {
    opacity: 0.8,
    filter: "blur(4px) saturate(0.9)",
    pointerEvents: "none" as const,
    background: "linear-gradient(180deg, rgba(15, 25, 45, 0.85), rgba(8, 15, 30, 0.75))",
  };

  const blankStyle = {
    opacity: 0.78,
    filter: "saturate(0.95)",
    background: "linear-gradient(180deg, rgba(15, 25, 45, 0.75), rgba(8, 15, 30, 0.65))",
  };

  return (
    <div
      ref={cardRef}
      className={`
        service-card group ${cardClassName}
        relative h-64 md:h-72 rounded-xl md:rounded-2xl p-4 md:p-6
        flex flex-col items-center justify-center gap-3 md:gap-4
        overflow-hidden
        transition-all duration-300
        will-change-transform
        backdrop-blur-lg md:backdrop-blur-xl
        ${onClick ? 'cursor-pointer active:scale-[0.98]' : 'cursor-default'}
      `}
      style={
        isLocked
          ? {
            ...lockedStyle,
            borderRadius: "0.75rem",
            border: "1px solid rgba(212, 175, 55, 0.15)",
          }
          : isBlank
            ? {
              ...blankStyle,
              borderRadius: "0.75rem",
              border: "1px solid rgba(212, 175, 55, 0.1)",
            }
            : {
              background: "linear-gradient(180deg, rgba(15, 25, 45, 0.95), rgba(8, 15, 30, 0.85))",
              backdropFilter: "blur(10px)",
              boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
              borderRadius: "0.75rem",
              border: "1px solid rgba(212, 175, 55, 0.2)",
            }
      }
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (!onClick) return;
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
    >
      {!isBlank && (
        <>
          <div
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden"
            style={{
              background: "radial-gradient(400px circle at var(--mx) var(--my), rgba(212,175,55,0.15), rgba(255,215,120,0.08), transparent 70%)",
              borderRadius: "inherit",
            }}
          />

          <div
            className="pointer-events-none absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(212,175,55,0.08) 0%, transparent 50%, rgba(255,215,120,0.05) 100%)",
              borderRadius: "inherit",
            }}
          />
        </>
      )}

      {!isBlank && !isMobile && (
        <>
          <div
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden"
            style={{
              background: "conic-gradient(from var(--a), rgba(212,175,55,0.4), rgba(255,215,120,0.2), rgba(212,175,55,0.4))",
              padding: "2px",
              WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              WebkitMaskComposite: "xor" as any,
              maskComposite: "exclude" as any,
              borderRadius: "inherit",
            }}
          />

          <div
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden"
            style={{
              background: "linear-gradient(transparent 0%, rgba(212,175,55,0.1) 50%, transparent 100%)",
              transform: "translateY(-40%)",
              animation: "scanline 1.8s ease-in-out infinite",
              mixBlendMode: "overlay",
              borderRadius: "inherit",
            }}
          />
        </>
      )}

      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-55%); opacity: 0; }
          15% { opacity: 0.5; }
          50% { opacity: 0.3; }
          100% { transform: translateY(55%); opacity: 0; }
        }
        
        @media (max-width: 768px) {
          .icon-ring, .icon-pulse {
            display: none;
          }
        }
      `}</style>

      <div
        ref={iconWrapRef}
        className="
          relative z-10 h-16 w-16 md:h-20 md:w-20 rounded-xl md:rounded-2xl flex items-center justify-center
          border-2
          transition-all duration-300
          group-hover:scale-110
          overflow-hidden
          icon-container
        "
        style={{
          background: "linear-gradient(180deg, #ffffff, #f8f8f8)",
          borderColor: "rgba(212, 175, 55, 0.4)",
          boxShadow: "0 0 8px rgba(212,175,55,0.4), inset 0 0 10px rgba(255,255,255,0.8)",
        }}
      >
        <div
          className="absolute -inset-3 md:-inset-4 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden"
          style={{
            background: "linear-gradient(180deg, rgba(212, 175, 55, 0.25), rgba(255, 215, 120, 0.2))",
            filter: "blur(10px)",
            borderRadius: "inherit",
          }}
        />

        {!isMobile && (
          <>
            <div
              className="icon-ring pointer-events-none absolute -inset-[4px] md:-inset-[6px] rounded-xl md:rounded-2xl overflow-hidden"
              style={{
                border: "2px solid rgba(212,175,55,0.5)",
                boxShadow: "0 0 15px rgba(212,175,55,0.4)",
                borderRadius: "inherit",
              }}
            />
            <div
              className="icon-pulse pointer-events-none absolute -inset-1.5 md:-inset-2 rounded-xl md:rounded-2xl opacity-0 overflow-hidden"
              style={{
                border: "2px solid rgba(212,175,55,0.7)",
                boxShadow: "0 0 25px rgba(212,175,55,0.6)",
                background: "radial-gradient(circle at center, rgba(212,175,55,0.25) 0%, transparent 70%)",
                borderRadius: "inherit",
              }}
            />
          </>
        )}
        <div className="flex items-center justify-center w-full h-full p-2 md:p-3">
          <div className="
            [&>svg]:h-8 [&>svg]:w-8 md:[&>svg]:h-10 md:[&>svg]:w-10 
            [&>img]:h-10 [&>img]:w-10 md:[&>img]:h-12 md:[&>img]:w-12
            [&>svg]:text-gray-800
            group-hover:[&>svg]:text-gray-900
            [&>svg]:transition-all 
            [&>img]:object-contain [&>img]:p-1
          ">
            {!isBlank ? feature.icon : null}
          </div>
        </div>
      </div>

      <h3
        ref={titleRef}
        className="relative z-10 text-lg md:text-xl font-bold text-center transition-all duration-300"
        style={{
          color: "rgba(255, 255, 255, 0.98)",
          textShadow: "0 2px 4px rgba(0,0,0,0.3)"
        }}
      >
        {!isBlank ? feature.title : ""}
      </h3>

      <p
        ref={descRef}
        className="relative z-10 text-xs md:text-sm text-center leading-relaxed whitespace-pre-line transition-all duration-300 px-2"
        style={{
          color: "rgba(244, 229, 184, 0.85)",
          textShadow: "0 1px 2px rgba(0,0,0,0.2)"
        }}
      >
        {!isBlank ? lines.join("\n") : ""}
      </p>

      {!isBlank && !isMobile && (
        <style>{`
          .service-card.group:hover h3{
            background: linear-gradient(135deg, #d4af37 0%, #f4e5b8 50%, #d4af37 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            filter: drop-shadow(0 0 12px rgba(212,175,55,0.5)) brightness(1.2);
          }
          .service-card.group:hover p{
            color: rgba(255, 255, 255, 0.95);
            text-shadow: 0 2px 8px rgba(212,175,55,0.3);
          }
        `}</style>
      )}

      <div className="relative z-10 w-full pt-1 md:pt-2">
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
      </div>
    </div>
  );
};

export default NgoServicesSection;