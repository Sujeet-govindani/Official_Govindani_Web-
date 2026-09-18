"use client";

import React, { useRef, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import ContentSection2 from "@/components/ContentSection2";
import ContentBenefits from "@/components/ContentBenefits";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);


const ContentMarketing = () => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingWrapRef = useRef<HTMLDivElement | null>(null);
  const paraRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const contentContainerRef = useRef<HTMLDivElement | null>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [headingColor, setHeadingColor] = useState("#a5f3fc");
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // ✅ Included section refs (hero + cards)
  const includedHeroRef = useRef<HTMLElement | null>(null);
  const includedBgRef = useRef<HTMLDivElement | null>(null);
  const includedTitleRef = useRef<HTMLHeadingElement | null>(null);
  const includedCardLRef = useRef<HTMLDivElement | null>(null);
  const includedCardRRef = useRef<HTMLDivElement | null>(null);

  // ✅ NEW "RESULTS" section refs (image → hover reveal content)
  const resultsSectionRef = useRef<HTMLElement | null>(null);
  const resultsStageRef = useRef<HTMLDivElement | null>(null);
  const resultsBgRef = useRef<HTMLDivElement | null>(null);
  const resultsRevealRef = useRef<HTMLDivElement | null>(null);
  const resultsKickerRef = useRef<HTMLParagraphElement | null>(null);
  const resultsHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const resultsLeftRef = useRef<HTMLDivElement | null>(null);
  const resultsRightRef = useRef<HTMLDivElement | null>(null);
  const resultsHoverTl = useRef<gsap.core.Timeline | null>(null);
  const resultsSplitRef = useRef<{ kicker?: SplitText; heading?: SplitText }>(
    {}
  );

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.3;
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.isIntersecting && setIsVisible(true)),
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => sectionRef.current && observer.unobserve(sectionRef.current);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !headingWrapRef.current) return;

    const ctx = gsap.context(() => {
      const heading =
        headingWrapRef.current?.querySelector<HTMLElement>("[data-heading]");

      if (heading) {
        gsap.set(heading, { clearProps: "transform,opacity,filter" });

        gsap.fromTo(
          heading,
          { yPercent: 120, opacity: 0, rotateX: -80 },
          {
            yPercent: 0,
            opacity: 1,
            rotateX: 0,
            ease: "expo.out",
            duration: 0.75,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            },
          }
        );

        const waveTl = gsap.timeline({
          repeat: -1,
          repeatDelay: 0.55,
          paused: true,
        });

        waveTl.to(heading, {
          backgroundPosition: "100% 50%",
          duration: 0.65,
          ease: "sine.inOut",
          onStart: () => {
            gsap.to(heading, {
              duration: 0.16,
              textShadow:
                "0 0 12px rgba(56,189,248,0.75), 0 0 26px rgba(56,189,248,0.45)",
              scale: 1.03,
              ease: "sine.out",
            });
          },
          onComplete: () => {
            gsap.to(heading, {
              duration: 0.22,
              textShadow: "0 0 6px rgba(34,211,238,0.22)",
              scale: 1,
              ease: "sine.out",
            });
            gsap.set(heading, { backgroundPosition: "0% 50%" });
          },
        });

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 70%",
          onEnter: () => waveTl.play(),
        });
      }

      if (paraRef.current) {
        gsap.fromTo(
          paraRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 68%",
            },
          }
        );
      }

      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { y: 40, opacity: 0, scale: 0.7, rotate: -8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.52,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 65%",
            },
          }
        );
      }

      if (imageContainerRef.current) {
        gsap.fromTo(
          imageContainerRef.current,
          { y: 80, opacity: 0, scale: 0.92 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.72,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ✅ Included section animations (hero + cards)
  useEffect(() => {
    if (!includedHeroRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        includedHeroRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.72,
          ease: "power3.out",
          scrollTrigger: {
            trigger: includedHeroRef.current,
            start: "top 80%",
          },
        }
      );

      if (includedBgRef.current) {
        gsap.fromTo(
          includedBgRef.current,
          { scale: 1.06, y: 16 },
          {
            scale: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: includedHeroRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.35,
            },
          }
        );
      }

      if (includedTitleRef.current) {
        const split = new SplitText(includedTitleRef.current, {
          type: "words",
          wordsClass: "split-word",
        });

        gsap.set(split.words, { opacity: 0, y: 16, filter: "blur(6px)" });

        gsap.to(split.words, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.42,
          ease: "power3.out",
          stagger: 0.035,
          scrollTrigger: {
            trigger: includedHeroRef.current,
            start: "top 74%",
          },
          onComplete: () => split.revert(),
        });
      }

      // ✅ Responsive scroll offsets (less X on mobile)
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      const xDist = isMobile ? 56 : 120;

      if (includedCardLRef.current) {
        gsap.fromTo(
          includedCardLRef.current,
          { x: -xDist, opacity: 0, rotateY: isMobile ? 0 : 10 },
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: includedCardLRef.current,
              start: "top 92%",
            },
          }
        );
      }

      if (includedCardRRef.current) {
        gsap.fromTo(
          includedCardRRef.current,
          { x: xDist, opacity: 0, rotateY: isMobile ? 0 : -10 },
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: includedCardRRef.current,
              start: "top 92%",
            },
          }
        );
      }
    }, includedHeroRef);

    return () => ctx.revert();
  }, []);

  // ✅ NEW: Results section (parallax + hover reveal + word-by-word text)
  useEffect(() => {
    if (!resultsSectionRef.current || !resultsStageRef.current) return;

    const ctx = gsap.context(() => {
      // Background parallax
      if (resultsBgRef.current) {
        gsap.fromTo(
          resultsBgRef.current,
          { scale: 1.12, y: 30 },
          {
            scale: 1,
            y: -30,
            ease: "none",
            scrollTrigger: {
              trigger: resultsStageRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          }
        );
      }

      // Reveal initial state
      if (resultsRevealRef.current) {
        gsap.set(resultsRevealRef.current, {
          autoAlpha: 0,
          y: 18,
          pointerEvents: "none",
        });
      }

      // SplitText word-by-word (kicker + heading)
      if (resultsKickerRef.current && resultsHeadingRef.current) {
        resultsSplitRef.current.kicker = new SplitText(resultsKickerRef.current, {
          type: "words",
          wordsClass: "split-word",
        });
        resultsSplitRef.current.heading = new SplitText(resultsHeadingRef.current, {
          type: "words",
          wordsClass: "split-word",
        });

        const words = [
          ...resultsSplitRef.current.kicker.words,
          ...resultsSplitRef.current.heading.words,
        ];

        gsap.set(words, { opacity: 0, y: 18, filter: "blur(8px)" });
      }

      // Build hover timeline
      resultsHoverTl.current = gsap.timeline({ paused: true });

      resultsHoverTl.current
        .to(resultsRevealRef.current, {
          autoAlpha: 1,
          y: 0,
          duration: 0.38,
          ease: "power3.out",
          onStart: () => {
            if (resultsRevealRef.current) resultsRevealRef.current.style.pointerEvents = "auto";
          },
        })
        .to(
          resultsSplitRef.current.kicker?.words || [],
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.28,
            ease: "power3.out",
            stagger: 0.022,
          },
          0.06
        )
        .to(
          resultsSplitRef.current.heading?.words || [],
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.45,
            ease: "power3.out",
            stagger: 0.04,
          },
          0.14
        )
        .fromTo(
          [resultsLeftRef.current, resultsRightRef.current],
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.48, ease: "power3.out", stagger: 0.14 },
          0.34
        );

      // Mobile / no-hover devices: auto reveal on scroll
      const noHover =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(hover: none)").matches;

      if (noHover) {
        ScrollTrigger.create({
          trigger: resultsStageRef.current,
          start: "top 80%",
          onEnter: () => resultsHoverTl.current?.play(),
        });
      }

      // Smoothness (small global tweak only for this area)
      ScrollTrigger.refresh();
    }, resultsSectionRef);

    return () => {
      resultsSplitRef.current.kicker?.revert();
      resultsSplitRef.current.heading?.revert();
      ctx.revert();
    };
  }, []);

  const handleResultsEnter = () => {
    resultsHoverTl.current?.play();
  };
  const handleResultsLeave = () => {
    // reverse only on true hover devices
    const canHover =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(hover: hover)").matches;
    if (canHover) resultsHoverTl.current?.reverse();
  };

  const handleHeadingClick = () => {
    const heading =
      headingWrapRef.current?.querySelector<HTMLElement>("[data-heading]");
    if (!heading) return;

    setHeadingColor("#a855f7");

    gsap.fromTo(
      heading,
      { scale: 1, rotate: 0 },
      {
        scale: 1.12,
        rotate: 2,
        duration: 0.18,
        yoyo: true,
        repeat: 1,
        ease: "back.out(3)",
        onStart: () => {
          heading.style.color = "#a855f7";
          heading.style.textShadow = "0 0 30px rgba(168,85,247,0.9)";
        },
        onComplete: () => {
          heading.style.color = "#a5f3fc";
          heading.style.textShadow = "0 0 10px rgba(34,211,238,0.4)";
          setHeadingColor("#a5f3fc");
        },
      }
    );
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const light =
      card.parentElement?.querySelector<HTMLElement>("[data-neon-light]");
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y - rect.height / 2) / rect.height) * -12;
    const rotateY = ((x - rect.width / 2) / rect.width) * 12;

    const px = (x / rect.width) * 100;
    const py = (y / rect.height) * 100;

    card.style.transform = `
      perspective(900px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateZ(14px)
    `;

    if (light) {
      light.style.background = `
        radial-gradient(
          circle at ${px}% ${py}%,
          rgba(56,189,248,0.45),
          rgba(45,212,191,0.25) 30%,
          transparent 60%
        )
      `;
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    const light =
      card.parentElement?.querySelector<HTMLElement>("[data-neon-light]");

    card.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    if (light) light.style.background = "transparent";
  };

  const ParagraphLines = () => (
    <span className="block">
      <span
        className={`line block overflow-hidden transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionDelay: "600ms" }}
      >
        Our content marketing services are designed to inspire,
      </span>
      <span
        className={`line block overflow-hidden transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionDelay: "750ms" }}
      >
        engage, and optimize high-quality content that truly
      </span>
      <span
        className={`line block overflow-hidden transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionDelay: "900ms" }}
      >
        connects with your target audience.
      </span>
    </span>
  );

  return (
    <>
      <section
        ref={sectionRef}
        id="about"
        className="
          relative overflow-hidden
          min-h-[calc(120vh-108px)]
          flex items-center justify-center
          px-3 sm:px-4
          backdrop-blur-lg
          bg-[#021523]
          border border-[#0ea5e980]
          shadow-[0_8px_25px_rgba(8,145,178,0.45)]
          rounded-3xl
        "
      >
        <style>{`
          @keyframes floatGentle {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          @keyframes breathe {
            0%, 100% { transform: translateY(0px); opacity: 0.95; }
            50% { transform: translateY(-4px); opacity: 1; }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
          }

          .split-word { display: inline-block; will-change: transform, opacity, filter; }

          .glass-panel {
            background: rgba(22, 18, 38, 0.42);
            border: 1px solid rgba(255, 255, 255, 0.12);
            box-shadow:
              0 18px 55px rgba(0, 0, 0, 0.45),
              0 0 60px rgba(34, 211, 238, 0.08);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
          }
          .hero-bottom-fade {
            background: linear-gradient(
              to bottom,
              rgba(12, 10, 24, 0.15) 0%,
              rgba(12, 10, 24, 0.55) 35%,
              rgba(12, 10, 24, 0.92) 100%
            );
          }

          .feature-card {
            position: relative;
            background: rgba(10, 10, 20, 0.40);
            border: 1px solid rgba(255,255,255,0.10);
            box-shadow:
              0 10px 30px rgba(0, 0, 0, 0.38),
              0 0 34px rgba(34, 211, 238, 0.05);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            overflow: hidden;
            transition: transform 0.35s ease, box-shadow 0.35s ease;
          }

          .feature-card:hover {
            transform: translateY(-6px);
            box-shadow:
              0 14px 38px rgba(0, 0, 0, 0.42),
              0 0 46px rgba(34, 211, 238, 0.08);
          }

          .card-bg-img {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            opacity: 0.20;
            filter: brightness(1.18) contrast(1.06) saturate(1.12);
            transform: scale(1.02);
            z-index: 0;
          }

          .card-bg-overlay {
            position: absolute;
            inset: 0;
            background:
              radial-gradient(circle at 30% 20%, rgba(34,211,238,0.10), transparent 55%),
              radial-gradient(circle at 80% 35%, rgba(45,212,191,0.08), transparent 55%),
              linear-gradient(to bottom, rgba(0,0,0,0.12), rgba(0,0,0,0.42));
            z-index: 1;
            pointer-events: none;
          }

          .card-content { position: relative; z-index: 2; }

          .feature-card h3 { font-weight: 700; }
          .feature-card p { font-weight: 500; }
          .pill-row { font-weight: 600; }

          .feature-card:hover h3 {
            color: #22d3ee;
            text-shadow: 0 0 18px rgba(34,211,238,0.22);
          }
          .feature-card:hover p { color: rgba(255,255,255,0.82); }
          .feature-card:hover .pill-row { border-color: rgba(34,211,238,0.22); }

          .pill-row {
            background: rgba(255,255,255,0.04);
            border: 1px solid rgba(255,255,255,0.08);
            box-shadow: 0 0 24px rgba(0,0,0,0.34);
            transition: border-color 0.35s ease, transform 0.35s ease;
          }

          .feature-card:hover .pill-row { transform: translateY(-1px); }

          /* ✅ NEW Results section polish */
          .results-glass {
            background: rgba(10, 10, 22, 0.52);
            border: 1px solid rgba(255,255,255,0.12);
            box-shadow:
              0 18px 55px rgba(0, 0, 0, 0.55),
              0 0 60px rgba(34, 211, 238, 0.10),
              0 0 45px rgba(168, 85, 247, 0.12);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
          }

          .results-pill {
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(34,211,238,0.18);
            box-shadow: 0 0 18px rgba(34,211,238,0.08);
          }

          .results-stage:hover .results-hint {
            opacity: 0;
            transform: translateY(-6px);
          }
        `}</style>

        <div className="absolute inset-0 z-10 bg-[#021523]/70" />

        <div className="pointer-events-none absolute inset-0 z-20">
          <div
            className="absolute rounded-full blur-3xl opacity-40 animate-pulse"
            style={{
              bottom: "-20%",
              right: "-10%",
              width: "700px",
              height: "700px",
              background:
                "radial-gradient(circle, rgba(4, 6, 6, 0.3) 0%, rgba(4, 6, 6, 0.3) 2%, transparent 70%)",
              animation: "pulse 4s ease-in-out infinite",
            }}
          />
        </div>

        <div className="relative z-30 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-12">
          <div
            className="
              relative rounded-[36px] sm:rounded-[48px] overflow-hidden
              w-full h-[92vh] sm:h-[84vh] lg:h-[80vh]
              border border-[#1d4ed880]
              shadow-[0_0_80px_rgba(8,145,178,0.35)]
              backdrop-blur-xl
            "
          >
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover z-0"
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              style={{
                opacity: 0.3,
                filter: "blur(10px)",
                transform: "scale(1.08)",
              }}
            >
              <source src="/app3.mp4" type="video/mp4" />
            </video>

            <img
              src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/app3-bg.jpg"
              alt=""
              className="absolute inset-0 w-full h-full object-cover z-0"
              style={{ opacity: 0.12 }}
              loading="lazy"
            />

            <div
              className="
                absolute inset-0 z-10 pointer-events-none
                bg-gradient-to-br from-[#021321]/80 via-[#03253a]/75 to-[#063750]/80
              "
            />
            <div
              className="
                absolute inset-0 z-10 pointer-events-none
                bg-[radial-gradient(circle_at_30%_30%,rgba(56,189,248,0.18),transparent_55%)]
              "
            />
            <div className="absolute inset-0 pointer-events-none rounded-[48px] z-10" />

            <div className="relative z-20 h-full grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-24 p-6 sm:p-10 md:p-12 lg:p-16 items-center">
              <div
                ref={contentContainerRef}
                className={`content-container flex justify-center lg:justify-start transition-all duration-1200 ease-out ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
                style={{ transitionDelay: "400ms" }}
              >
                <div className="relative w-full max-w-[650px] space-y-8 sm:space-y-10">
                  <div className="pl-0 sm:pl-8 space-y-6 sm:space-y-8">
                    <div className="space-y-4">
                      <div
                        ref={headingWrapRef}
                        onClick={handleHeadingClick}
                        className="relative inline-flex flex-col gap-1 cursor-pointer overflow-visible"
                        style={{
                          animation: isVisible
                            ? "floatGentle 3s ease-in-out infinite"
                            : "none",
                        }}
                      >
                        <h3
                          data-heading
                          className="font-bold text-xl sm:text-2xl lg:text-2xl leading-tight text-cyan relative z-10 transform-none"
                          style={{
                            color: headingColor,
                            textShadow: "0 0 2px rgba(34,211,238,0.4)",
                          }}
                        >
                          <span className="mr-3 relative z-10">
                            <span className="relative z-10">
                              <span className="text-cyan relative z-10">
                                CONTENT MARKETING
                              </span>
                              <br />
                              <br />
                              <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl leading-tight">
                                Elevate Your Brand with Compelling Content
                              </h1>
                              <span className="glow-ring"></span>
                              <span className="particle particle-1"></span>
                              <span className="particle particle-2"></span>
                              <span className="particle particle-3"></span>
                              <span className="particle particle-4"></span>
                            </span>
                          </span>
                        </h3>
                      </div>

                      <p
                        ref={paraRef}
                        className="text-base sm:text-xl md:text-2xl font-semibold text-white/80 leading-relaxed max-w-[620px]"
                        style={{
                          animation: isVisible
                            ? "breathe 3s ease-in-out infinite"
                            : "none",
                        }}
                      >
                        <ParagraphLines />
                      </p>
                    </div>

                    <div
                      ref={ctaRef}
                      className={`pt-1 sm:pt-2 transition-all duration-700 ${
                        isVisible
                          ? "opacity-100 scale-100 rotate-0"
                          : "opacity-0 scale-0 -rotate-180"
                      }`}
                      style={{ transitionDelay: "1000ms" }}
                    >
                      <button className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-neon-500 to-blue-500 rounded-2xl overflow-hidden shadow-[0_0_5px_rgba(34,211,238,0.4)] hover:shadow-[0_0_5px_rgba(34,211,238,0.7)] transition-all duration-300 hover:scale-105">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-neon-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative flex items-center gap-3 text-white font-semibold text-base sm:text-lg">
                          <span>Explore More</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div
                ref={imageContainerRef}
                className={`image-container flex justify-center lg:justify-start transition-all duration-1300 ease-out ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  transitionDelay: "200ms",
                  animation: isVisible
                    ? "float 3.5s ease-in-out infinite"
                    : "none",
                }}
              >
                <div className="relative w-full max-w-[480px]">
                  <div
                    className="relative group"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div
                      className="absolute inset-0 rounded-[28px] sm:rounded-[36px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      data-neon-light
                    />
                    <div
                      ref={cardRef}
                      className="
                        relative rounded-[28px] sm:rounded-[36px] overflow-hidden w-full aspect-[4/3] sm:aspect-square
                        shadow-[0_0_40px_rgba(8,145,178,0.45)]
                        transition-transform duration-300
                      "
                    >
                      <video
                        src="/App6.mp4"
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* end grid */}
            </div>
          </div>
        </div>
      </section>

      <ContentSection2 />
      <ContentBenefits />

      {/* HERO + BELOW 2 CARDS */}
      <section
        ref={includedHeroRef}
        className="relative w-full px-0 md:px-0 lg:px-0 py-0"
      >
        <div className="relative w-full max-w-[100%] overflow-hidden rounded-[22px] sm:rounded-[28px]">
          <div
            ref={includedBgRef}
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=2000&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "saturate(1.02) contrast(1.05)",
              transform: "scale(1.02)",
            }}
          />

          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 hero-bottom-fade" />

          <div className="relative h-[220px] sm:h-[260px] md:h-[320px] lg:h-[360px] group">
            <div
              className="
                absolute left-4 sm:left-6 md:left-10 lg:left-14 top-1/2 -translate-y-1/2
                w-[92%] sm:w-[86%] md:w-[72%] lg:w-[62%]
                rounded-[16px] sm:rounded-[18px]
                px-5 sm:px-7 md:px-10 py-5 sm:py-7 md:py-9
                glass-panel
                opacity-0 translate-y-4 pointer-events-none
                transition-all duration-700 ease-out
                group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto
              "
            >
              <h2
                ref={includedTitleRef}
                className="
                  text-white font-extrabold
                  text-[20px] sm:text-[25px] md:text-[35px] lg:text-[40px]
                  leading-[1.05]
                "
                style={{
                  textShadow:
                    "0 0 2px rgba(34,211,238,0.18), 0 0 5px rgba(45,212,191,0.10)",
                }}
              >
                What Is Included In Our <br />
                <span
                  className="bg-gradient-to-r from-white via-cyan-200 to-[#22d3ee] bg-clip-text text-transparent text-weight-10"
                  style={{
                    filter:
                      "drop-shadow(0 0 2px rgba(34,211,238,0.20)) drop-shadow(0 0 2px rgba(45,212,191,0.12))",
                  }}
                >
                  Content Marketing?
                </span>
              </h2>
              <div className="mt-2 sm:mt-2 h-8 sm:h-15" />
            </div>
          </div>
        </div>

        <div className="relative bg-[#050611]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-10 md:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14">
              <div
                ref={includedCardLRef}
                className="feature-card rounded-[22px] sm:rounded-[26px]"
              >
                <img
                  className="card-bg-img"
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1600&q=80"
                  alt=""
                  loading="lazy"
                />
                <div className="card-bg-overlay" />

                <div className="card-content px-5 sm:px-7 md:px-9 py-7 sm:py-8 md:py-9">
                  <h3
                    className="text-center text-white text-lg sm:text-xl md:text-2xl"
                    style={{
                      textShadow:
                        "0 0 10px rgba(0,0,0,0.55), 0 0 16px rgba(34,211,238,0.08)",
                    }}
                  >
                    Content Strategy Development
                  </h3>

                  <p
                    className="mt-3 text-center text-white/70 leading-relaxed text-sm sm:text-base"
                    style={{ textShadow: "0 0 14px rgba(0,0,0,0.65)" }}
                  >
                    We create a tailored content marketing strategy based on your
                    business goals.
                  </p>

                  <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
                    <div className="pill-row rounded-xl px-4 py-3 text-white/75 text-sm sm:text-base">
                      <span className="text-cyan-200 mr-2">🔎</span>
                      Conduct market research and audience analysis
                    </div>
                    <div className="pill-row rounded-xl px-4 py-3 text-white/75 text-sm sm:text-base">
                      <span className="text-[#2dd4bf] mr-2">🗓️</span>
                      Develop a content calendar and distribution plan
                    </div>
                  </div>
                </div>
              </div>

              <div
                ref={includedCardRRef}
                className="feature-card rounded-[22px] sm:rounded-[26px]"
              >
                <img
                  className="card-bg-img"
                  src="https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=1600&q=80"
                  alt=""
                  loading="lazy"
                />
                <div className="card-bg-overlay" />

                <div className="card-content px-5 sm:px-7 md:px-9 py-7 sm:py-8 md:py-9">
                  <h3
                    className="text-center text-white text-lg sm:text-xl md:text-2xl"
                    style={{
                      textShadow:
                        "0 0 10px rgba(0,0,0,0.55), 0 0 16px rgba(45,212,191,0.08)",
                    }}
                  >
                    Audience Research
                  </h3>

                  <p
                    className="mt-3 text-center text-white/70 leading-relaxed text-sm sm:text-base"
                    style={{ textShadow: "0 0 14px rgba(0,0,0,0.65)" }}
                  >
                    Understand your target audience&apos;s preferences, behaviors,
                    and pain points.
                  </p>

                  <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
                    <div className="pill-row rounded-xl px-4 py-3 text-white/75 text-sm sm:text-base">
                      <span className="text-cyan-200 mr-2">🧠</span>
                      Analyze audience demographics and psychographics
                    </div>
                    <div className="pill-row rounded-xl px-4 py-3 text-white/75 text-sm sm:text-base">
                      <span className="text-[#2dd4bf] mr-2">🧩</span>
                      Identify key topics and content formats
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 h-[2px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </div>
      </section>

      {/* ===================== NEW RESULTS SECTION (Copied from image + enhanced) ===================== */}
      {/* ✅ Put these files in /public (or change paths):
          /results-bg.jpg
          /targeting.png
          /engagement.png
      */}
      <section ref={resultsSectionRef} className="relative bg-[#050611] py-14 sm:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
          <div
            ref={resultsStageRef}
            className="results-stage relative overflow-hidden rounded-[28px] sm:rounded-[36px]
                       border border-white/10 shadow-[0_0_90px_rgba(34,211,238,0.18)]"
            onMouseEnter={handleResultsEnter}
            onMouseLeave={handleResultsLeave}
          >
            {/* Background only visible initially */}
            <div
              ref={resultsBgRef}
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "url('https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/img1.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "saturate(1.05) contrast(1.08)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-[#020617]/70 to-black/85" />
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.22),transparent_55%)]" />
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_80%_30%,rgba(168,85,247,0.18),transparent_55%)]" />

            {/* Hint (hidden on hover) */}
           

            {/* Reveal Content (hidden until hover / scroll on mobile) */}
            <div
              ref={resultsRevealRef}
              className="relative z-20 px-6 sm:px-10 lg:px-14 py-14 sm:py-16"
            >
              <p
                ref={resultsKickerRef}
                className="text-center text-xs sm:text-sm font-semibold tracking-widest uppercase"
                style={{
                  background: "linear-gradient(90deg,#22d3ee,#a855f7,#ffffff)",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  textShadow: "0 0 10px rgba(34,211,238,0.10)",
                }}
              >
                HOW OUR CONTENT MARKETING CAN INCREASE YOUR REACH AND IMPRESSIONS?
              </p>

              <h2
                ref={resultsHeadingRef}
                className="mt-4 text-center text-white font-extrabold
                           text-3xl sm:text-4xl lg:text-5xl leading-tight"
                style={{
                  textShadow:
                    "0 0 22px rgba(34,211,238,0.22), 0 0 22px rgba(168,85,247,0.14)",
                }}
              >
                Driving Results Through Effective Content <br />
                Strategies
              </h2>

              <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
                {/* LEFT */}
                <div
                  ref={resultsLeftRef}
                  className="results-glass rounded-[22px] sm:rounded-[26px] p-7 sm:p-8"
                >
                  <div className="flex justify-center">
                    <div
                      className="rounded-2xl p-4 border border-white/10 bg-white/5
                                 shadow-[0_0_22px_rgba(34,211,238,0.12)]"
                    >
                      <img
                        src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/targeting.png"
                        alt="Enhanced Targeting"
                        className="h-14 w-14 object-contain"
                      />
                    </div>
                  </div>

                  <h3
                    className="mt-5 text-center text-white text-xl sm:text-2xl font-bold"
                    style={{
                      textShadow:
                        "0 0 14px rgba(34,211,238,0.16), 0 0 14px rgba(168,85,247,0.10)",
                    }}
                  >
                    Enhanced Targeting
                  </h3>

                  <p className="mt-3 text-center text-white/70">
                    Reach the right audience with content tailored to their interests and needs.
                  </p>

                  <div className="mt-7 space-y-3">
                    <div className="results-pill rounded-2xl px-4 py-3 text-white/80">
                      Use audience segmentation and targeting techniques
                    </div>
                    <div className="results-pill rounded-2xl px-4 py-3 text-white/80">
                      Develop personalized content that resonates with specific audience
                    </div>
                  </div>
                </div>

                {/* RIGHT */}
                <div
                  ref={resultsRightRef}
                  className="results-glass rounded-[22px] sm:rounded-[26px] p-7 sm:p-8"
                >
                  <div className="flex justify-center">
                    <div
                      className="rounded-2xl p-4 border border-white/10 bg-white/5
                                 shadow-[0_0_22px_rgba(168,85,247,0.12)]"
                    >
                      <img
                        src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/engagement.png"
                        alt="Increased Engagement"
                        className="h-14 w-14 object-contain"
                      />
                    </div>
                  </div>

                  <h3
                    className="mt-5 text-center text-white text-xl sm:text-2xl font-bold"
                    style={{
                      textShadow:
                        "0 0 14px rgba(34,211,238,0.14), 0 0 18px rgba(168,85,247,0.14)",
                    }}
                  >
                    Increased Engagement
                  </h3>

                  <p className="mt-3 text-center text-white/70">
                    Create engaging content that encourages shares, comments, and interactions.
                  </p>

                  <div className="mt-7 space-y-3">
                    <div className="results-pill rounded-2xl px-4 py-3 text-white/80">
                      Produce visually appealing and interactive content
                    </div>
                    <div className="results-pill rounded-2xl px-4 py-3 text-white/80">
                      Encourage audience participation through calls-to-action (CTAs)
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 h-[2px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* <Footer /> */}
    </>
  );
};

export default ContentMarketing;
