"use client";

import { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ServiceSection from "@/components/HomePage/ServicesSection";
import ContactUsForm from "@/pages/ContactUsForm";

gsap.registerPlugin(ScrollTrigger);

// ─── MATTERPORT TOURS DATA ────────────────────────────────────────────────────
const matterportTours = [
  { cls: "mp3-card1", m: "W7z5TJPfsJS", title: "CI Grand" },
  { cls: "mp3-card2", m: "icGMBANVL1Y", title: "CI Estate The Park" },
];

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
const VirtualTourSections = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  // Deterministic particles (no hydration mismatch)
  const bubbles = useMemo(() => Array.from({ length: 12 }).map((_, i) => ({
    id: i, left: `${(i * 8.33) % 100}%`, size: `${14 + (i * 7) % 28}px`,
    drift: `${-40 + (i * 11) % 80}px`, dur: `${11 + (i * 3) % 10}s`,
    delay: `${-((i * 2.3) % 14)}s`, opacity: 0.12 + (i % 4) * 0.04, blur: `${0.5 + (i % 3)}px`,
  })), []);

  const stars = useMemo(() => Array.from({ length: 16 }).map((_, i) => ({
    id: i, left: `${(i * 6.25) % 100}%`, size: `${2 + (i % 4)}px`,
    drift: `${-50 + (i * 8) % 100}px`, dur: `${9 + (i * 2) % 10}s`,
    delay: `${-((i * 1.8) % 12)}s`, opacity: 0.18 + (i % 3) * 0.08,
  })), []);

  // ── ScrollTrigger: VT2 + MP3 ─────────────────────────────────────────────
  useEffect(() => {
    if (!rootRef.current) return;

    gsap.set(".vt2-video", { scale: 1.08, filter: "blur(8px) saturate(1.05)", opacity: 0.85 });
    gsap.set(".vt2-glass", { opacity: 1, x: 0, y: 0, filter: "blur(0px)" });
    gsap.set(".vt2-kicker", { opacity: 0, y: 10 });
    gsap.set(".vt2-title", { opacity: 0, y: 14, filter: "blur(10px)" });
    gsap.set(".vt2-para", { opacity: 0, y: 14, filter: "blur(10px)" });
    gsap.set(".vt2-tags", { opacity: 0, y: 10 });
    gsap.set(".mp3-kicker", { opacity: 0, y: 10 });
    gsap.set(".mp3-title", { opacity: 0, y: 16, filter: "blur(10px)" });
    gsap.set(".mp3-subtitle", { opacity: 0, y: 8, filter: "blur(5px)" });
    gsap.set(".mp3-card1", { opacity: 1, scale: 1, filter: "blur(0px)", xPercent: -50 });
    gsap.set(".mp3-card2", { opacity: 0, scale: 0.96, filter: "blur(10px)", xPercent: -50 });

    ScrollTrigger.matchMedia({
      "(min-width: 1024px)": () => {
        // ── VT2 pinned scroll ──
        const tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: ".vt2-trigger",
            start: "top top", end: "+=140%",
            pin: true, pinSpacing: true, scrub: 1,
            anticipatePin: 1, invalidateOnRefresh: true,
          },
          defaults: { ease: "none" },
        });
        tl2
          .to(".vt2-video", { scale: 1, opacity: 1, filter: "blur(0px) saturate(1)", duration: 0.35 }, 0)
          .fromTo(".vt2-glass", { y: 12, filter: "blur(6px)", opacity: 0.85 }, { y: 0, filter: "blur(0px)", opacity: 1, duration: 0.22 }, 0.12)
          .to(".vt2-kicker", { opacity: 1, y: 0, duration: 0.8 }, 0.22)
          .to(".vt2-title", { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.18 }, 0.28)
          .to(".vt2-para", { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.22, stagger: 0.08 }, 0.36)
          .to(".vt2-tags", { opacity: 1, y: 0, duration: 0.14 }, 0.62)
          .to(".vt2-videoCard", { y: -10, duration: 0.38 }, 0.7)
          .to(".vt2-glass", { y: 6, duration: 0.38 }, 0.7);

        gsap.to(".vt2-video", {
          scale: 1.012, duration: 2.8, ease: "sine.inOut", yoyo: true, repeat: -1,
          scrollTrigger: { trigger: ".vt2-trigger", start: "top top", end: "+=140%" },
        });

        // ── MP3 pinned scroll ──
        const tl3 = gsap.timeline({
          scrollTrigger: {
            trigger: ".mp3-trigger",
            start: "top top", end: "+=150%",
            pin: true, pinSpacing: true, scrub: 1,
            anticipatePin: 1, invalidateOnRefresh: true,
          },
          defaults: { ease: "none" },
        });
        tl3
          .to(".mp3-kicker", { opacity: 1, y: 0, duration: 0.12 }, 0)
          .to(".mp3-title", { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.18 }, 0.04)
          .to(".mp3-subtitle", { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.15 }, 0.1)
          .to(".mp3-card1", { x: -22, xPercent: -100, scale: 0.92, duration: 0.32 }, 0.22)
          .to(".mp3-card2", { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.22 }, 0.3)
          .to(".mp3-card2", { x: 22, xPercent: 0, scale: 0.92, duration: 0.32 }, 0.52)
          .to([".mp3-card1", ".mp3-card2"], { filter: "blur(0px)", duration: 0.01 }, 0.86);
      },

      "(max-width: 1023px)": () => {
        // ── VT2 mobile scroll ──
        const tl2m = gsap.timeline({
          scrollTrigger: {
            trigger: ".vt2-trigger",
            start: "top 75%", end: "bottom 35%",
            scrub: 0.5, invalidateOnRefresh: true,
          },
          defaults: { ease: "power3.out" },
        });
        tl2m
          .to(".vt2-kicker", { opacity: 1, y: 0, duration: 0.35 }, 0)
          .to(".vt2-title", { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.45 }, 0.08)
          .to(".vt2-para", { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.45, stagger: 0.08 }, 0.16)
          .to(".vt2-tags", { opacity: 1, y: 0, duration: 0.25 }, 0.28)
          .to(".vt2-video", { scale: 1, opacity: 1, filter: "blur(0px) saturate(1)", duration: 0.45 }, 0.1);

        // ── MP3 mobile scroll ──
        const tl3m = gsap.timeline({
          scrollTrigger: { trigger: ".mp3-trigger", start: "top 75%", invalidateOnRefresh: true },
          defaults: { ease: "power3.out" },
        });
        tl3m
          .to(".mp3-kicker", { opacity: 1, y: 0, duration: 0.45 }, 0)
          .to(".mp3-title", { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7 }, 0.08)
          .to(".mp3-subtitle", { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.4 }, 0.12)
          .to(".mp3-card1", { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.6 }, 0.18)
          .to(".mp3-card2", { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.6 }, 0.34);
      },
    });

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  // ─── RENDER ───────────────────────────────────────────────────────────────
  return (
    <main ref={rootRef} className="min-h-screen overflow-x-hidden bg-black">

      {/* ── Fixed decorative background ── */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-black overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -left-40 w-[480px] h-[480px] rounded-full blur-[140px] bg-yellow-500/8 animate-sp1" />
        <div className="absolute -bottom-48 -right-48 w-[580px] h-[580px] rounded-full blur-[160px] bg-amber-600/10 animate-sp2" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(#1e293b 1px,transparent 1px),linear-gradient(90deg,#1e293b 1px,transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        {bubbles.map((b) => (
          <span
            key={b.id}
            className="bg-bubble"
            style={{
              left: b.left, width: b.size, height: b.size,
              opacity: b.opacity, filter: `blur(${b.blur})`,
              ["--drift" as string]: b.drift,
              ["--dur" as string]: b.dur,
              ["--delay" as string]: b.delay,
            }}
          />
        ))}
        {stars.map((s) => (
          <span
            key={s.id}
            className="bg-star"
            style={{
              left: s.left, width: s.size, height: s.size, opacity: s.opacity,
              ["--drift" as string]: s.drift,
              ["--dur" as string]: s.dur,
              ["--delay" as string]: s.delay,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">

        {/* ══ SECTION 1 WHAT IS 360° VIRTUAL TOUR ════════════════════════ */}
        {/*
          FIX 1 Desktop: was min-height:10vh (too short for pinned scroll to work correctly).
                   Now 100vh so GSAP pins it at full viewport height.
          FIX 2 Mobile: padding-top accounts for fixed header (~72px → 5rem).
                   Also switched align to flex-start so content never hides under header.
        */}
        <div
          className="vt2-trigger relative"
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {/*
            Mobile: pt-20 (5rem / 80px) clears a typical fixed header.
            Desktop (lg:): pt-0 because the section is full-screen pinned and vertically centred.
          */}
          <div className="w-full px-4 sm:px-6 lg:px-8 pt-20 pb-12 lg:pt-0 lg:pb-0">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row items-stretch justify-center gap-5 md:gap-8 lg:gap-12">

                {/* ── Video card ── */}
                <div className="vt2-left w-full md:flex-1 md:min-w-0 md:[max-width:52%]">
                  <div
                    className="vt2-videoCard relative rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] shadow-[0_20px_60px_rgba(0,0,0,0.65)]"
                    style={{ height: "clamp(220px, 56vw, 560px)" }}
                  >
                    <div className="pointer-events-none absolute inset-0 rounded-xl md:rounded-2xl lg:rounded-3xl ring-1 ring-cyan-400/15 z-10" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-50 z-10" />
                    <video
                      className="vt2-video w-full h-full object-cover will-change-transform"
                      src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Real-Estate-Videos/360%20min%20virtual%20tour%20(1).mp4"
                      autoPlay muted loop playsInline
                    />
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.06)_0%,rgba(0,0,0,0.35)_74%,rgba(0,0,0,0.62)_100%)] z-10" />
                    <div className="pointer-events-none absolute -bottom-16 left-1/2 h-32 w-[60%] -translate-x-1/2 rounded-full bg-cyan-400/12 blur-[50px] z-0" />
                  </div>
                </div>

                {/* ── Glass info card ── */}
                <div className="vt2-right w-full md:flex-1 md:min-w-0 md:[max-width:48%]">
                  <div
                    className="vt2-glass relative overflow-hidden rounded-xl md:rounded-2xl lg:rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-[14px] shadow-[0_20px_60px_rgba(0,0,0,0.45)] px-5 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-10 lg:py-12"
                    style={{
                      minHeight: "clamp(260px, 45vw, 560px)",
                      display: "flex", flexDirection: "column", justifyContent: "center",
                    }}
                  >
                    <div className="pointer-events-none absolute inset-0 rounded-xl md:rounded-2xl lg:rounded-3xl ring-1 ring-white/10" />
                    <div className="pointer-events-none absolute -inset-16 bg-[conic-gradient(from_220deg,rgba(34,211,238,0.12),transparent_25%,transparent_65%,rgba(59,130,246,0.10))] opacity-60" />
                    <div className="relative z-10 space-y-3 md:space-y-5">
                      <p className="vt2-kicker text-blue-400/90 tracking-[0.15em] text-[10px] sm:text-xs md:text-sm font-semibold uppercase">
                        Do You Know
                      </p>
                      <h2 className="vt2-title text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white leading-tight">
                        What is{" "}
                        <span className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
                          360°
                        </span>{" "}
                        Virtual Tour?
                      </h2>
                      <div className="flex items-center gap-3">
                        <div className="h-px w-8 md:w-14 bg-gradient-to-r from-transparent to-cyan-400/50" />
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/60" />
                        <div className="h-px w-8 md:w-14 bg-gradient-to-l from-transparent to-cyan-400/50" />
                      </div>
                      <div className="space-y-2 md:space-y-3">
                        <p className="vt2-para text-slate-200/85 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
                          A 360° virtual tour is an immersive experience that lets users explore a space as if they were physically present looking around in all directions and moving between areas seamlessly.
                        </p>
                        <p className="vt2-para text-slate-200/80 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
                          Unlike normal photos or videos, it's interactive. With panoramic capture + tour software, viewers can explore every angle from the comfort of their device.
                        </p>
                      </div>
                      <div className="vt2-tags flex flex-wrap gap-1.5 md:gap-2 pt-1">
                        <span className="px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.06] text-cyan-100 text-[10px] sm:text-xs md:text-sm">
                          360° View
                        </span>
                        <span className="px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.06] text-cyan-100 text-[10px] sm:text-xs md:text-sm">
                          Interactive
                        </span>
                        <span className="px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.06] text-cyan-100 text-[10px] sm:text-xs md:text-sm whitespace-nowrap">
                          Seamless Navigation
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* ══ SECTION 2 OUR 360° VIRTUAL TOURS (MATTERPORT) ═════════════ */}
        {/*
          FIX 3 Removed all inline marginTop:0/paddingTop:0 overrides that were
                   forcing the section flush against Section 1 on mobile.
          FIX 4 Mobile: pt-20 clears fixed header; desktop: min-h-screen + flex centres content.
        */}
        <div className="mp3-trigger">
          <div className="lg:min-h-screen flex flex-col lg:justify-center pt-10 pb-12 lg:pt-0 lg:pb-0">
            <div className="container mx-auto px-4">

              {/* Heading */}
              <div className="text-center mb-8 md:mb-12">
                <h2
                  className="mp3-title text-2xl sm:text-3xl md:text-3xl font-extrabold mb-3"
                  style={{
                    background: "linear-gradient(135deg,#fff 0%,#d4af37 30%,#f4e5b8 50%,#d4af37 70%,#fff 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Our 360° Virtual Tours
                </h2>
                <p className="mp3-subtitle text-sm md:text-lg text-slate-300/78 max-w-2xl mx-auto px-4">
                  Immersive remote property exploration walk through spaces from anywhere
                </p>
              </div>

              {/* ── Mobile: stacked cards ── */}
              <div className="flex flex-col gap-4 md:hidden">
                {matterportTours.map(({ m, title }) => (
                  <div
                    key={m}
                    className="rounded-2xl overflow-hidden border border-[#d4af37]/18"
                    style={{ background: "rgba(5,5,5,0.9)", backdropFilter: "blur(8px)" }}
                  >
                    <div className="px-4 py-3 border-b border-white/6 flex items-center gap-2">
                      <span className="text-blue-400/65 text-[10px] font-semibold uppercase tracking-wider">Real Estate</span>
                      <span className="text-white/20">·</span>
                      <h3 className="text-sm font-semibold gold-text">{title}</h3>
                    </div>
                    <div className="aspect-video">
                      <iframe
                        className="w-full h-full"
                        src={`https://my.matterport.com/show/?m=${m}`}
                        title={title}
                        frameBorder="0"
                        allow="xr-spatial-tracking; fullscreen"
                        allowFullScreen
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* ── Desktop: pinned slide animation ── */}
              <div className="hidden md:block mp3-stage relative max-w-5xl mx-auto">
                <div className="relative mp3-viewport h-[420px] lg:h-[480px]">
                  {matterportTours.map(({ cls, m, title }) => (
                    <article
                      key={m}
                      className={`mp3-card ${cls} absolute top-1/2 left-1/2 w-[64%] lg:w-[56%] -translate-y-1/2`}
                    >
                      <div
                        className="rounded-2xl overflow-hidden border border-[#d4af37]/18"
                        style={{ background: "rgba(5,5,5,0.75)", backdropFilter: "blur(8px)" }}
                      >
                        <div className="px-5 py-4 border-b border-white/6">
                          <p className="text-blue-400/60 text-xs font-semibold uppercase tracking-wider mb-1">
                            Real Estate
                          </p>
                          <h3 className="text-xl md:text-2xl font-semibold gold-text">{title}</h3>
                        </div>
                        <div className="aspect-video">
                          <iframe
                            className="w-full h-full"
                            src={`https://my.matterport.com/show/?m=${m}`}
                            title={title}
                            frameBorder="0"
                            allow="xr-spatial-tracking; fullscreen"
                            allowFullScreen
                          />
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        <ServiceSection />
        <ContactUsForm />

      </div>{/* /relative z-10 */}

      {/* ═══════════════ GLOBAL STYLES ════════════════════════════════════ */}
      <style>{`
        .gold-text {
          background: linear-gradient(90deg, #d4af37, #f4e5b8, #d4af37);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .vt2-trigger {
          background-color: #000 !important;
          isolation: isolate;
          position: relative;
          z-index: 2;
        }
        .mp3-trigger {
          background-color: #000 !important;
          isolation: isolate;
          position: relative;
          z-index: 2;
        }
        @media (min-width: 1024px) {
          .vt2-trigger { margin-top: 100px; min-height: 100vh; }
          .mp3-title { margin-top: 100px; }
        }
        @media (max-width: 1023px) {
          .vt2-trigger { min-height: auto !important; }
        }
        @media (max-width: 767px) {
          .container { padding-left: 1rem; padding-right: 1rem; }
        }
        @media (prefers-reduced-motion: reduce) {
          .bg-bubble, .bg-star,
          .animate-sp1, .animate-sp2 {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

    </main>

  );
};

export default VirtualTourSections;