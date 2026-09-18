"use client";
import ContactUsForm from "@/pages/ContactUsForm";
import React, { useEffect, useRef, useState } from "react";
import SEO from "@/components/SEO";
import { pageSEO } from "@/seo/pageSEO";

// ─── useInView ───────────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─── Animations ──────────────────────────────────────────────────────────────
const fadeUp = (v: boolean, d = 0) =>
  `transition-all duration-700 ease-out ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}` +
  (d ? ` delay-[${d}ms]` : "");

const fadeIn = (v: boolean, d = 0) =>
  `transition-all duration-700 ease-out ${v ? "opacity-100" : "opacity-0"}` +
  (d ? ` delay-[${d}ms]` : "");

// ─── Tokens ───────────────────────────────────────────────────────────────────
const goldText   = "bg-gradient-to-r from-[#C9A84C] via-[#FFE08A] to-[#C9A84C] bg-clip-text text-transparent";
const goldBorder = "border border-[#C9A84C]/40";

// ─── Section ─────────────────────────────────────────────────────────────────
function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`w-full px-4 sm:px-8 lg:px-16 ${className}`} style={{ paddingTop: "clamp(80px, 8vw, 110px)", paddingBottom: "clamp(32px, 4vw, 48px)" }}>
      {children}
    </section>
  );
}

// ─── GoldBtn ─────────────────────────────────────────────────────────────────
function GoldBtn({ children, outline = false }: { children: React.ReactNode; outline?: boolean }) {
  return (
    <button
      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-0.5"
      style={{
        fontSize: "16px",
        fontFamily: "'Inter', sans-serif",
        cursor: "pointer",
        ...(outline
          ? { border: "1px solid #C9A84C", color: "#d4a827", background: "transparent", boxShadow: "0 0 18px rgba(201,168,76,0.15)" }
          : { background: "linear-gradient(135deg,#C9A84C,#FFE08A,#C9A84C)", color: "#000", boxShadow: "0 4px 24px rgba(201,168,76,0.35)", border: "none" }
        )
      }}
    >
      {children}
    </button>
  );
}

// ─── GlowCard ────────────────────────────────────────────────────────────────
function GlowCard({ children, className = "", delay = 0, visible }: {
  children: React.ReactNode; className?: string; delay?: number; visible: boolean;
}) {
  return (
    <div
      className={`group relative rounded-2xl p-6 ${goldBorder} bg-black/40 backdrop-blur-sm
        hover:shadow-[0_0_32px_2px_rgba(201,168,76,0.25)] hover:border-[#FFE08A]/60
        transition-all duration-500 cursor-default ${fadeUp(visible, delay)} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
        <div className="absolute -inset-full w-1/2 h-full bg-gradient-to-r from-transparent via-[#FFE08A]/10 to-transparent skew-x-[-20deg] group-hover:translate-x-[300%] transition-transform duration-700" />
      </div>
      {children}
    </div>
  );
}

// ─── StatPill ────────────────────────────────────────────────────────────────
function StatPill({ value, label, visible, delay }: { value: string; label: string; visible: boolean; delay: number }) {
  return (
    <div className={`flex flex-col items-center gap-2 ${fadeUp(visible, delay)}`} style={{ transitionDelay: `${delay}ms` }}>
      <span className={`text-5xl sm:text-6xl font-bold font-['Baskerville',serif] ${goldText}`}>{value}</span>
      <span className="text-white/70 text-sm sm:text-base text-center max-w-[180px] font-['Inter',sans-serif]">{label}</span>
    </div>
  );
}

// ─── FAQItem ─────────────────────────────────────────────────────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`${goldBorder} rounded-xl overflow-hidden transition-all duration-300 ${open ? "bg-[#C9A84C]/10" : "bg-black/30"} hover:border-[#FFE08A]/60`}>
      <button className="w-full flex justify-between items-center px-5 py-4 text-left" onClick={() => setOpen(o => !o)}>
        <span className={`text-[18px] font-bold font-['Baskerville',serif] ${goldText} pr-4`}>{q}</span>
        <span className={`text-[#C9A84C] text-xl transition-transform duration-300 flex-shrink-0 ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
        <p className="px-5 pb-5 text-white/70 text-sm font-['Inter',sans-serif] leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

// ─── HeroVideo — autoplay, muted, no controls, no play button ────────────────
function HeroVideo({ visible }: { visible: boolean }) {
  return (
    <div className={`relative flex justify-center items-center ${fadeIn(visible, 400)}`} style={{ transitionDelay: "400ms" }}>
      <div className="absolute -inset-6 bg-gradient-to-br from-[#C9A84C]/20 via-transparent to-[#C9A84C]/10 rounded-3xl blur-3xl pointer-events-none" />
      <div
        className={`relative w-full max-w-xl rounded-3xl overflow-hidden ${goldBorder} bg-black shadow-[0_0_60px_rgba(201,168,76,0.15)]`}
        style={{ aspectRatio: "16/9" }}
      >
        <video
          className="w-full h-full object-cover"
          src="/Videos/WhatsApp-Form-V2.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
    </div>
  );
}

// ─── TrustMarquee ────────────────────────────────────────────────────────────
type LogoEntry = { imgSrc?: string; alt?: string; text?: string };

const RAW_LOGOS: LogoEntry[] = [
  { imgSrc: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/M1.svg",  alt: "Logo 1" },
  { imgSrc: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/M2.svg",  alt: "Logo 2" },
  { imgSrc: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/M3.svg",  alt: "Logo 3" },
  { imgSrc: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/M4.svg",  alt: "Logo 4" },
  { imgSrc: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/M5.svg",  alt: "Logo 5" },
  { imgSrc: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/M6.svg",  alt: "Logo 6" },
  { imgSrc: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/M7.svg",  alt: "Logo 7" },
  { imgSrc: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/M8.svg",  alt: "Logo 8" },
  { imgSrc: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/M9.svg",  alt: "Logo 9" },
  { imgSrc: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/M10.svg", alt: "Logo 10" },
  { imgSrc: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/M11.svg", alt: "Logo 11" },
  { imgSrc: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/M12.svg", alt: "Logo 12" },
];
const MARQUEE_LOGOS: LogoEntry[] = [...RAW_LOGOS, ...RAW_LOGOS];

function TrustMarquee() {
  const { ref, visible } = useInView();
  return (
    <section className="w-full overflow-hidden" ref={ref}>
      <p className={`
        text-center text-2xl sm:text-3xl font-bold font-['Baskerville',serif] ${goldText}
        mt-10 mb-4 px-4
        transition-all duration-700 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      `}>
        50,000+ Businesses Across the Globe Trust 
      </p>
      <div className="relative py-0">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10 bg-gradient-to-r from-[#0a0a0a] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10 bg-gradient-to-l from-[#0a0a0a] to-transparent" />
        <div className="flex w-max items-center" style={{ animation: "marqueescroll 32s linear infinite" }}>
          {MARQUEE_LOGOS.map((logo, i) => (
            <div key={i}
              className="mx-3 flex-shrink-0 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity duration-300 cursor-default"
              style={{ minWidth: "110px", height: "60px" }}>
              {logo.imgSrc
                ? <img src={logo.imgSrc} alt={logo.alt ?? ""} className="h-10 w-auto object-contain" style={{ filter: "none", maxWidth: "130px" }} />
                : <span className="text-[#C9A84C]/70 text-sm font-['Inter',sans-serif] whitespace-nowrap hover:text-[#FFE08A] transition-colors duration-300">{logo.text}</span>
              }
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes marqueescroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }`}</style>
    </section>
  );
}

// ─── MaximizeSection ─────────────────────────────────────────────────────────
const MAXIMIZE_TABS = [
  {
    title: "Minimize User Drop-Offs",
    desc: "Scale engagement and task completion while reducing user drop-offs by collecting user details from within the chat interface.",
    imageSrc: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Maximize1.webp",
    imageAlt: "Minimize Drop-Offs",
  },
  {
    title: "App-like Interface On WhatsApp",
    desc: "Forms on WhatsApp replace the need to create website or app for customer engagement. Forms streamline lead generation, appointment booking, registration, sign-up and sign-in, and drive customer service and feedback collection.",
    imageSrc: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Maximize2.webp",
    imageAlt: "App-like Interface",
  },
  {
    title: "Track Success Metrics",
    desc: "WhatsApp Form power-packed analytics dashboard allows you to track and optimize KPIs such as clickthrough rates (CTR), conversion rates, and customer satisfaction scores.",
    imageSrc: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Maximize3.webp",
    imageAlt: "Track Metrics",
  },
];

function MaximizeSection({ maximizeRef, visible }: {
  maximizeRef: React.RefObject<HTMLDivElement> | React.MutableRefObject<HTMLDivElement | null>; visible: boolean;
}) {
  const [active, setActive] = useState(0);
  const [animImg, setAnimImg] = useState(false);
  const switchTab = (i: number) => {
    if (i === active) return;
    setAnimImg(true);
    setTimeout(() => { setActive(i); setAnimImg(false); }, 250);
  };
  const tab = MAXIMIZE_TABS[active];

  return (
    <section className="w-full px-4 sm:px-8 lg:px-16 pt-[20px] sm:pt-[30px] pb-[40px]">
      <div ref={maximizeRef} className="max-w-6xl mx-auto">
        <h2 className={`text-center text-xl sm:text-2xl lg:text-3xl font-bold font-['Baskerville',serif] ${goldText} mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          Maximize the Impact of WhatsApp Forms
        </h2>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* LEFT: Bare image — no container */}
          <div className={`relative transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`} style={{ transitionDelay: "100ms" }}>
            <div className="relative" style={{ paddingTop: "75%" }}>
              <img
                key={active}
                src={tab.imageSrc}
                alt={tab.imageAlt}
                className={`absolute inset-0 w-full h-full object-contain transition-all duration-500 ${animImg ? "opacity-0 scale-[1.04]" : "opacity-100 scale-100"}`}
              />
            </div>
            <div className="flex justify-center gap-2 mt-4">
              {MAXIMIZE_TABS.map((_, i) => (
                <button key={i} onClick={() => switchTab(i)}
                  className={`transition-all duration-300 rounded-full ${active === i ? "w-6 h-2 bg-gradient-to-r from-[#C9A84C] to-[#FFE08A]" : "w-2 h-2 bg-[#C9A84C]/30 hover:bg-[#C9A84C]/60"}`} />
              ))}
            </div>
          </div>
          {/* RIGHT: Accordion */}
          <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`} style={{ transitionDelay: "200ms" }}>
            {MAXIMIZE_TABS.map((t, i) => (
              <div key={t.title} className="border-b border-[#C9A84C]/20 last:border-b-0">
                <button onClick={() => switchTab(i)} className="w-full flex items-center justify-between py-5 text-left group">
                  <span className={`text-[18px] font-bold font-['Baskerville',serif] transition-all duration-300 pr-4 ${active === i ? goldText : "text-white/50 group-hover:text-white/75"}`}>{t.title}</span>
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 ${active === i ? "border-[#C9A84C] bg-[#C9A84C]/15" : "border-white/20 group-hover:border-[#C9A84C]/40"}`}>
                    <svg className={`w-3 h-3 transition-all duration-300 ${active === i ? "text-[#C9A84C] rotate-180" : "text-white/30"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${active === i ? "max-h-48 opacity-100 pb-5" : "max-h-0 opacity-0 pb-0"}`}>
                  <p className="text-white/55 text-sm font-['Inter',sans-serif] leading-relaxed">{t.desc}</p>
                  <div className="mt-4 h-px w-full bg-[#C9A84C]/10 rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r from-[#C9A84C] to-[#FFE08A] rounded-full transition-all duration-[600ms] ease-out ${active === i ? "w-full" : "w-0"}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── EngageSection ───────────────────────────────────────────────────────────
const ENGAGE_STEPS = [
  {
    num: "1",
    label: "Forms For Appointment Booking",
    desc: "Let customers book appointments, select time slots, and confirm details all inside a WhatsApp conversation with zero friction.",
    imageSrc: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/user1.webp",
    imageAlt: "Appointment Booking",
  },
  {
    num: "2",
    label: "Forms For Lead Generation",
    desc: "Capture high-intent leads directly through WhatsApp with structured forms — name, contact details, business size, and more.",
    imageSrc: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/user2.webp",
    imageAlt: "Lead Generation",
  },
  {
    num: "3",
    label: "Forms For Upsell & Cross Sell",
    desc: "Recommend relevant products and services to existing customers through smart in-chat forms triggered by purchase history.",
    imageSrc: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/user3.webp",
    imageAlt: "Upsell & Cross-sell",
  },
];

function EngageSection({ engageRef, visible }: {
  engageRef: React.RefObject<HTMLDivElement> | React.MutableRefObject<HTMLDivElement | null>; visible: boolean;
}) {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const switchTab = (i: number) => {
    if (i === active) return;
    setAnimating(true);
    setTimeout(() => { setActive(i); setAnimating(false); }, 280);
  };
  const step = ENGAGE_STEPS[active];

  return (
    <section className="w-full px-4 sm:px-8 lg:px-16 pt-0 pb-[40px]">
      <div ref={engageRef} className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT */}
          <div className={`space-y-8 ${fadeUp(visible)}`}>
            <div>
              <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold font-['Baskerville',serif] ${goldText} leading-normal pb-1 mb-4`}>
                Engage with Users at Every Stage
              </h2>
              <p className="text-white/50 text-sm sm:text-base font-['Inter',sans-serif] leading-relaxed">
                From discovery to post-purchase, trigger Forms from within the WhatsApp Form platform.
              </p>
            </div>
            <div className="relative">
              <div className="absolute left-5 top-6 bottom-6 w-px bg-gradient-to-b from-[#C9A84C]/60 via-[#C9A84C]/20 to-transparent" />
              <div className="space-y-2">
                {ENGAGE_STEPS.map((s, i) => (
                  <button key={s.num} onClick={() => switchTab(i)}
                    className={`relative w-full flex items-center gap-5 px-4 py-4 rounded-2xl text-left transition-all duration-300 group
                      ${active === i ? "bg-[#C9A84C]/10 border border-[#C9A84C]/40 shadow-[0_0_20px_rgba(201,168,76,0.12)]" : "border border-transparent hover:bg-white/[0.03] hover:border-[#C9A84C]/20"}`}>
                    <div className={`relative z-10 w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold font-['Inter',sans-serif] transition-all duration-300
                      ${active === i ? "bg-gradient-to-br from-[#C9A84C] to-[#FFE08A] text-black shadow-[0_0_16px_rgba(201,168,76,0.4)]" : "bg-[#C9A84C]/15 text-[#C9A84C]/60 group-hover:bg-[#C9A84C]/25 group-hover:text-[#C9A84C]"}`}>
                      {s.num}
                    </div>
                    <div className="flex-1">
                      <span className={`text-base sm:text-lg font-['Inter',sans-serif] font-medium transition-all duration-300 ${active === i ? goldText : "text-white/40 group-hover:text-white/65"}`}>
                        {s.label}
                      </span>
                      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${active === i ? "max-h-24 mt-1.5 opacity-100" : "max-h-0 opacity-0"}`}>
                        <p className="text-white/50 text-xs font-['Inter',sans-serif] leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                    <div className={`flex-shrink-0 transition-all duration-300 ${active === i ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`}>
                      <svg className="w-4 h-4 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — bare image, no container */}
          <div className={`flex justify-center items-start ${fadeUp(visible, 200)}`} style={{ transitionDelay: "200ms" }}>
            <div className="relative w-full max-w-lg">
              <div className={`relative transition-all duration-300 ${animating ? "opacity-0 scale-[0.97]" : "opacity-100 scale-100"}`} style={{ paddingTop: "133.33%" }}>
                {step.imageSrc ? (
                  <img src={step.imageSrc} alt={step.imageAlt} className="absolute inset-0 w-full h-full object-contain" />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <svg className="w-10 h-10 text-[#C9A84C]/25 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.5" />
                      <circle cx="8.5" cy="8.5" r="1.5" strokeWidth="1.5" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 15l-5-5L5 21" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex justify-center gap-2 mt-4">
                {ENGAGE_STEPS.map((_, i) => (
                  <button key={i} onClick={() => switchTab(i)}
                    className={`transition-all duration-300 rounded-full ${active === i ? "w-6 h-2 bg-gradient-to-r from-[#C9A84C] to-[#FFE08A]" : "w-2 h-2 bg-[#C9A84C]/30 hover:bg-[#C9A84C]/60"}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── IndustrySection ─────────────────────────────────────────────────────────
const INDUSTRY_TABS = [
  {
    label: "Retail",
    heading: "Capture customer intent & retarget for higher conversion",
    desc: "Get purchase interest, send exclusive deals, timely reminders, and custom recommendations to streamline shopping experiences, boost conversions and win loyalty.",
  },
  {
    label: "Fintech",
    heading: "Qualify Leads & collect feedback for higher engagement",
    desc: "Maximize lead generation for loan applications, amplify consultations for financial advice, simplify feedback and survey collection, and provide personalized offers for increased engagement and customer satisfaction.",
  },
  {
    label: "Hospitality",
    heading: "Boost conversions & retain customers",
    desc: "Streamline reservation bookings and reminders, offers and promotions, loyalty program updates, and emergency alerts for better customer experience, increased efficiency, and higher revenue.",
  },
];

const INDUSTRY_IMAGES: Record<number, { src: string; alt: string }[]> = {
  0: [
    { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/F1.webp",  alt: "Retail 1" },
    { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/F11.webp", alt: "Retail 2" },
    { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/F12.webp", alt: "Retail 3" },
    { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/F13.webp", alt: "Retail 4" },
  ],
  1: [
    { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/fintek1.webp", alt: "Fintech 1" },
    { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/fintek2.webp", alt: "Fintech 2" },
    { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/fintek3.webp", alt: "Fintech 3" },
    { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/fintek4.webp", alt: "Fintech 4" },
    { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/fintek5.webp", alt: "Fintech 5" },
  ],
  2: [
    { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/hos1.webp", alt: "Hospitality 1" },
    { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/hos2.webp", alt: "Hospitality 2" },
    { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/hos3.webp", alt: "Hospitality 3" },
    { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/hos4.webp", alt: "Hospitality 4" },
  ],
};

const SHOW = 3;

function IndustrySection({ industryRef, visible }: {
  industryRef: React.RefObject<HTMLDivElement> | React.MutableRefObject<HTMLDivElement | null>; visible: boolean;
}) {
  const [activeTab, setActiveTab]     = useState(0);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [tabAnim, setTabAnim]         = useState(false);

  const imgs  = INDUSTRY_IMAGES[activeTab];
  const total = imgs.length;
  const tab   = INDUSTRY_TABS[activeTab];
  const mod   = (n: number, m: number) => ((n % m) + m) % m;

  const switchTab = (i: number) => {
    if (i === activeTab) return;
    setTabAnim(true);
    setTimeout(() => { setActiveTab(i); setCarouselIdx(0); setTabAnim(false); }, 260);
  };

  const prev = (e: React.MouseEvent) => { e.preventDefault(); e.stopPropagation(); setCarouselIdx(c => mod(c - 1, total)); };
  const next = (e: React.MouseEvent) => { e.preventDefault(); e.stopPropagation(); setCarouselIdx(c => mod(c + 1, total)); };

  const visImgs = Array.from({ length: Math.min(SHOW, total) }, (_, i) => imgs[mod(carouselIdx + i, total)]);

  return (
    <section className="w-full px-4 sm:px-8 lg:px-16 pt-[60px] sm:pt-[100px] pb-[40px]">
      <div ref={industryRef} className="max-w-7xl mx-auto">
        <h2 className={`text-center text-xl sm:text-2xl lg:text-3xl font-bold font-['Baskerville',serif] ${goldText} mb-10 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          Forms Elevate Your Engagement Efforts Irrespective of Industry
        </h2>
        <div className={`flex justify-center gap-4 mb-12 flex-wrap transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: "100ms" }}>
          {INDUSTRY_TABS.map((t, i) => (
            <button key={t.label} onClick={() => switchTab(i)}
              className={`px-8 py-3 rounded-full text-base font-['Inter',sans-serif] font-medium border-2 transition-all duration-300
                ${activeTab === i ? "bg-gradient-to-r from-[#C9A84C] to-[#FFE08A] text-black border-transparent shadow-[0_0_24px_rgba(201,168,76,0.45)] scale-105" : "border-[#C9A84C]/35 text-[#C9A84C]/70 hover:border-[#C9A84C]/70 hover:text-[#C9A84C]"}`}>
              {t.label}
            </button>
          ))}
        </div>
        <div className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center transition-all duration-400 ${tabAnim ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0"}`}>
          {/* LEFT: text */}
          <div className={`space-y-6 transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`} style={{ transitionDelay: "150ms" }}>
            <h3 className={`text-2xl sm:text-3xl lg:text-4xl font-bold font-['Baskerville',serif] ${goldText} leading-snug`}>{tab.heading}</h3>
            <p className="text-white/55 text-base font-['Inter',sans-serif] leading-relaxed">{tab.desc}</p>
            <div className="flex items-center gap-3 pt-2">
              <div className="h-px flex-1 bg-gradient-to-r from-[#C9A84C]/40 to-transparent" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]/60" />
            </div>
            {["Higher conversion rates", "Reduced drop-offs", "Real-time analytics", "Seamless WhatsApp integration"].map(f => (
              <div key={f} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border border-[#C9A84C]/50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-2.5 h-2.5 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                </div>
                <span className="text-white/60 text-sm font-['Inter',sans-serif]">{f}</span>
              </div>
            ))}
          </div>

          {/* RIGHT: bare images */}
          <div className={`relative transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`} style={{ transitionDelay: "200ms" }}>
            <div className="grid grid-cols-3 gap-3 items-end">
              {visImgs.map((img, i) => (
                <div
                  key={`${activeTab}-${carouselIdx}-${i}`}
                  className={`relative transition-all duration-500 ${
                    i === 1 ? "scale-[1.06] z-10" : "opacity-70 scale-100"
                  }`}
                  style={{ paddingTop: "177.78%" }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 hover:scale-105"
                  />
                </div>
              ))}
            </div>
            <button type="button" onClick={prev} aria-label="Previous"
              className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/80 border border-[#C9A84C]/40 flex items-center justify-center text-[#C9A84C] hover:bg-[#C9A84C]/15 hover:border-[#C9A84C] hover:shadow-[0_0_14px_rgba(201,168,76,0.3)] transition-all duration-300 z-20">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button type="button" onClick={next} aria-label="Next"
              className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/80 border border-[#C9A84C]/40 flex items-center justify-center text-[#C9A84C] hover:bg-[#C9A84C]/15 hover:border-[#C9A84C] hover:shadow-[0_0_14px_rgba(201,168,76,0.3)] transition-all duration-300 z-20">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
            <div className="flex justify-center gap-1.5 mt-5">
              {imgs.map((_, i) => (
                <button key={i} type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCarouselIdx(i); }}
                  className={`transition-all duration-300 rounded-full ${i === carouselIdx ? "w-5 h-1.5 bg-gradient-to-r from-[#C9A84C] to-[#FFE08A]" : "w-1.5 h-1.5 bg-[#C9A84C]/30 hover:bg-[#C9A84C]/60"}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function WhatsAppFormsPage() {
  const hero     = useInView(0.1);
  const engage   = useInView();

  // ── Hero top padding (inline, beats Tailwind !important) ──
  const [heroPt, setHeroPt] = useState("160px");
  // ── h1 extra top margin on mobile to push heading below navbar ──
  const [heroH1Mt, setHeroH1Mt] = useState("0px");
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) {
        setHeroPt("80px");
        setHeroH1Mt("100px");
      } else if (window.innerWidth < 1024) {
        setHeroPt("180px");
        setHeroH1Mt("0px");
      } else {
        setHeroPt("200px");
        setHeroH1Mt("0px");
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  const maximize = useInView();
  const stats    = useInView();
  const industry = useInView();
  const reasons  = useInView();
  const quote    = useInView();
  const faq      = useInView();
  const cta      = useInView();

  const reasonCards = [
    { imgSrc: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/icon11.png",  icon: "🔗", title: "Access to Meta's APIs",          desc: "Leverage official Meta/WhatsApp APIs to build robust, scalable Business API engagement." },
    { imgSrc: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/icon12.webp", icon: "🏗️", title: "Scalable Infrastructure",        desc: "1000s of brands trust our enterprise-grade infrastructure for high customer support & engagement." },
    { imgSrc: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/icon13.png",  icon: "⚡",  title: "Seamless Integrations",          desc: "600+ integrations include CRM, payment gateways, & marketing automations." },
    { imgSrc: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/icon14.webp", icon: "🚀", title: "Smooth Onboarding & Easy Setup", desc: "Minimum configuration, an intuitive solution for your business from day one." },
    { imgSrc: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/icon15.png",  icon: "💰", title: "Highly Competitive Pricing",     desc: "No hidden costs — transparent pricing. We show you campaign costs upfront so planning is stress-free." },
    { imgSrc: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/icon16.webp", icon: "🎯", title: "Industry Leading Support",       desc: "Premium customer support and a dedicated account administrator available 24/7." },
  ];

  const miniStats = [
    { v: "5x",      l: "Increase in ROI with Click-To-WhatsApp-Ads" },
    { v: "4x",      l: "Uplift in lead-to-quote generation" },
    { v: "4 in 10", l: "Customers complete journeys in native language" },
  ];

  const faqs = [
    { q: "Are WhatsApp Forms available for both Android and iOS?",
      a: "Yes, if you send a Forms to a customer ; they will be able to receive it & fill it up irrespective of whether they have an Android or an iOS phone." },
    { q: "Is WhatsApp Forms available on API business platform and Business app both?",
      a: "For now, forms on WhatsApp are available on API business platforms only." },
    { q: "Can WhatsApp Forms only be used in a WhatsApp campaign?",
      a: "Yes forms can be attached in message templates that are sent out in bulk via campaigns. Sending a flow in campaigns is a great way to drive event registrations, generate opt-ins for offers, collect feedback on services etc." },
    { q: "How much do I have to pay to use WhatsApp Forms?",
      a: "To use WhatsApp Forms , you need a WhatsApp Business Solution Provider & with whatsApp form you can access flows on WhatsApp with Growth / Advanced / Enterprise plans." },
    { q: "If I send a WhatsApp Forms to my customer, will they be able to see and fill up the form via WhatsApp Web?",
      a: "No, forms on WhatsApp can only be seen and filled up in WhatsApp's mobile app." },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden" style={{ background: "#0a0a0a" }}>
      <SEO {...pageSEO.whatsappForms} />

      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(201,168,76,0.08),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_80%,rgba(201,168,76,0.04),transparent)]" />
      </div>

      <div className="relative z-10">

        {/* ── HERO — raw <section> with JS-driven inline paddingTop
            Mobile (<640px) : 280px  |  sm: 180px  |  lg: 200px
            Inline style always beats Tailwind !important classes.
        */}
        <section
          className="w-full px-4 sm:px-8 lg:px-16 pb-[40px]"
          style={{ marginTop: 200 }}
        >
          <div ref={hero.ref} className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center"style={{ marginTop: 150 }}>
            <div className="space-y-6">
              <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold font-['Baskerville',serif] leading-[1.1] opacity-100 translate-y-0 transition-all duration-700 ease-out`}
                style={{ }}>
                <span className={goldText}>Amplify Conversations</span><br />
                <span className="text-white">to Conversion With</span><br />
                <span className={goldText}>WhatsApp Forms</span>
              </h1>
              <p className={`text-white/60 text-base sm:text-lg font-['Inter',sans-serif] leading-relaxed max-w-lg opacity-100 translate-y-0 transition-all duration-700 ease-out`}>
                Leverage WhatsApp Forms to create in-channel interactive forms that automate message sequences, and engage further with media CTA to drive conversions on WhatsApp.
              </p>

             

            </div>
            <HeroVideo visible={hero.visible} />
          </div>
        </section>

        {/* ── TRUST MARQUEE ── */}
        <TrustMarquee />

        {/* ── ENGAGE ── */}
        <EngageSection engageRef={engage.ref} visible={engage.visible} />

        {/* ── MAXIMIZE ── */}
        <MaximizeSection maximizeRef={maximize.ref} visible={maximize.visible} />

        {/* ── STATS ── */}
        <Section className="!pt-[20px] sm:!pt-[30px] !pb-[20px]">
          <div ref={stats.ref} className="max-w-5xl mx-auto">
            <h2 className={`text-center text-xl sm:text-2xl lg:text-3xl font-bold font-['Baskerville',serif] ${goldText} mb-8 ${fadeUp(stats.visible)}`}>
              Leading Brands are Unlocking Real Value from WhatsApp Forms
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                { value: "150%", label: "increase in conversion with Forms compared to chatbots",   delay: 100 },
                { value: "2.6x", label: "revenue on sales cost generated with WhatsApp Forms",       delay: 200 },
                { value: "8.2x", label: "Higher appointment booking conversion with WhatsApp Forms", delay: 300 },
              ].map((s) => (
                <div key={s.value}
                  className={`rounded-2xl ${goldBorder} bg-black/40 backdrop-blur-sm p-8 flex flex-col gap-3 hover:shadow-[0_0_24px_rgba(201,168,76,0.15)] hover:border-[#FFE08A]/50 transition-all duration-300 ${fadeUp(stats.visible, s.delay)}`}
                  style={{ transitionDelay: `${s.delay}ms` }}>
                  <span className={`text-5xl sm:text-6xl font-bold font-['Baskerville',serif] ${goldText}`}>{s.value}</span>
                  <p className="text-white/65 text-sm font-['Inter',sans-serif] leading-snug">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── INDUSTRY ── */}
        <IndustrySection industryRef={industry.ref} visible={industry.visible} />

        {/* ── REASONS ── */}
        <Section className="!pt-[20px] sm:!pt-[30px]">
          <div ref={reasons.ref} className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className={`text-xl sm:text-2xl lg:text-3xl font-bold font-['Baskerville',serif] ${goldText} ${fadeUp(reasons.visible)}`}>
                More reasons to choose Whats App Form
              </h2>
              <p className={`text-white/40 text-sm font-['Inter',sans-serif] mt-2 ${fadeUp(reasons.visible, 80)}`} style={{ transitionDelay: "80ms" }}>
                Get a Green Tick via the WhatsApp Business API account along with:
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {reasonCards.map((c, i) => (
                <GlowCard key={c.title} delay={i * 90} visible={reasons.visible}>
                  <div className="flex justify-center mb-5">
                    {c.imgSrc
                      ? <img src={c.imgSrc} alt={c.title} className="w-10 h-10 object-contain" style={{ filter: "none" }} />
                      : <span className="text-3xl">{c.icon}</span>
                    }
                  </div>
                  <h3 className={`text-[18px] font-bold font-['Baskerville',serif] ${goldText} mb-2 text-center`}>{c.title}</h3>
                  <p className="text-white/50 text-sm font-['Inter',sans-serif] leading-relaxed text-center">{c.desc}</p>
                </GlowCard>
              ))}
            </div>
          </div>
        </Section>

        {/* ── TESTIMONIAL ── */}
        <Section className="!pt-[20px] sm:!pt-[30px]">
          <div ref={quote.ref} className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left — stats + quote */}
            <div className={`space-y-8 ${fadeUp(quote.visible)}`}>
              <div className="grid grid-cols-3 gap-4">
                {miniStats.map((s, i) => (
                  <div key={s.v}
                    className={`p-5 rounded-2xl ${goldBorder} bg-black/40 hover:shadow-[0_0_20px_rgba(201,168,76,0.18)] hover:border-[#FFE08A]/50 transition-all duration-300 ${fadeUp(quote.visible, i * 100)}`}
                    style={{ transitionDelay: `${i * 100}ms` }}>
                    <div className={`text-3xl sm:text-4xl font-bold font-['Baskerville',serif] ${goldText} mb-2`}>{s.v}</div>
                    <p className="text-white/50 text-xs font-['Inter',sans-serif] leading-snug">{s.l}</p>
                  </div>
                ))}
              </div>
              <div className={`relative ${fadeUp(quote.visible, 300)}`} style={{ transitionDelay: "300ms" }}>
                <div className={`text-[96px] leading-none font-bold font-['Baskerville',serif] ${goldText} opacity-20 select-none mb-[-28px]`}>"</div>
                <p className="text-white/75 text-base sm:text-lg font-['Inter',sans-serif] leading-relaxed italic">
                  Integrating WhatsApp Business APIs with our core platforms enables personalized experiences for diverse customers. This foundation allows us to create exceptional CX in preferred languages.
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#a07830] flex items-center justify-center text-black font-bold text-base flex-shrink-0 shadow-[0_0_16px_rgba(201,168,76,0.35)]">M</div>
                  <div>
                    <p className={`text-base font-bold font-['Inter',sans-serif] ${goldText}`}>Mukul Jain</p>
                    <p className="text-white/45 text-sm font-['Inter',sans-serif]">CTO, Max Life Insurance</p>
                  </div>
                </div>
                <div className="mt-6 h-px bg-gradient-to-r from-[#C9A84C]/40 via-[#C9A84C]/15 to-transparent" />
              </div>
            </div>

            {/* Right — autoplay video */}
            <div className={`flex justify-center items-center ${fadeUp(quote.visible, 200)}`} style={{ transitionDelay: "200ms" }}>
              <div className="relative w-full">
                <div className="absolute -inset-6 bg-gradient-to-br from-[#C9A84C]/15 via-transparent to-[#C9A84C]/8 rounded-3xl blur-3xl pointer-events-none" />
                <div
                  className={`relative w-full rounded-3xl overflow-hidden ${goldBorder} bg-black shadow-[0_8px_60px_rgba(0,0,0,0.6)]`}
                  style={{ aspectRatio: "1/1" }}
                >
                  <video
                    className="w-full h-full object-cover"
                    src="/Videos/v1.webm"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                  <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-[#C9A84C]/30 backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
                    <span className="text-[#C9A84C] text-[10px] font-['Inter',sans-serif] font-medium tracking-wide uppercase">Max Life Insurance</span>
                  </div>
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#C9A84C]/50 rounded-tl-3xl pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#C9A84C]/50 rounded-br-3xl pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ── FAQ ── */}
        <Section className="!pt-[20px] sm:!pt-[30px]">
          <div ref={faq.ref} className="max-w-3xl mx-auto">
            <h2 className={`text-center text-xl sm:text-2xl lg:text-3xl font-bold font-['Baskerville',serif] ${goldText} mb-12 ${fadeUp(faq.visible)}`}>
              Frequently Asked Questions
            </h2>
            <div className={`space-y-3 ${fadeUp(faq.visible, 100)}`} style={{ transitionDelay: "100ms" }}>
              {faqs.map(f => <FAQItem key={f.q} q={f.q} a={f.a} />)}
            </div>
          </div>
        </Section>
        <ContactUsForm/>
      </div>
    </div>
    
  );
}