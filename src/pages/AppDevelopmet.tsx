"use client";

import React, { useRef, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AppsSection from "@/components/AppsSection";
// import Footer from "@/components/Footer";
import OurApps from "@/components/OurApps";
import AppBenefitsSection from "@/components/AppBenefitsSection";
import EnhancedSection2 from "@/components/EnhancedSection2";

gsap.registerPlugin(ScrollTrigger);

const AppDevelopment = () => {
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
            // ✅ target correct element (you removed `.heading-text` so it was returning null)
            const heading =
                headingWrapRef.current?.querySelector<HTMLElement>("[data-heading]");

            if (heading) {
                // ✅ ensure no old transforms stick to heading
                gsap.set(heading, { clearProps: "transform,opacity,filter" });

                gsap.fromTo(
                    heading,
                    { yPercent: 120, opacity: 0, rotateX: -80 },
                    {
                        yPercent: 0,
                        opacity: 1,
                        rotateX: 0,
                        ease: "expo.out",
                        duration: 1.1,
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 70%",
                        },
                    }
                );

                const waveTl = gsap.timeline({
                    repeat: -1,
                    repeatDelay: 0.8,
                    paused: true,
                });

                // ✅ keep your wave effect, but apply to the actual heading element
                waveTl.to(heading, {
                    backgroundPosition: "100% 50%",
                    duration: 0.9,
                    ease: "sine.inOut",
                    onStart: () => {
                        gsap.to(heading, {
                            duration: 0.22,
                            textShadow:
                                "0 0 12px rgba(56,189,248,0.75), 0 0 26px rgba(56,189,248,0.45)",
                            scale: 1.03,
                            ease: "sine.out",
                        });
                    },
                    onComplete: () => {
                        gsap.to(heading, {
                            duration: 0.32,
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
                        duration: 0.9,
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
                        duration: 0.7,
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
                        duration: 1,
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
                className={`line block overflow-hidden transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                style={{ transitionDelay: "600ms" }}
            >
                We craft Android & iOS apps that feel premium, respond instantly,
            </span>
            <span
                className={`line block overflow-hidden transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                style={{ transitionDelay: "750ms" }}
            >
                and keep users engaged from the very first tap.
            </span>
            <span
                className={`line block overflow-hidden transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                style={{ transitionDelay: "900ms" }}
            >
                From planning to launch, we build clean and scalable ready for growth.
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
          px-4
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

                <div className="relative z-30 w-full max-w-7xl mx-auto px-6 lg:px-12">
                    <div
                        className="
              relative rounded-[48px] overflow-hidden
              w-full h-[80vh]
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

                        <div className="relative z-20 h-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 p-10 md:p-14 lg:p-16 items-center">
                            <div
                                ref={contentContainerRef}
                                className={`content-container flex justify-center lg:justify-start transition-all duration-1200 ease-out ${isVisible ? "opacity-100" : "opacity-0"
                                    }`}
                                style={{ transitionDelay: "400ms" }}
                            >
                                <div className="relative w-full max-w-[650px] space-y-10">
                                    <div className="pl-8 space-y-8">
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
                                                {/* ✅ actual animated element: now selectable by GSAP */}
                                                <h3
                                                    data-heading
                                                    className="font-bold text-2xl md:text-1xl lg:text-2xl leading-tight text-cyan relative z-10 transform-none"
                                                    style={{
                                                        color: headingColor,
                                                        textShadow: "0 0 2px rgba(34,211,238,0.4)",
                                                    }}
                                                >
                                                    <span className="mr-3 relative z-10">
                                                        <span className="relative z-10">
                                                            <span className="text-cyan relative z-10">
                                                                APP DEVELOPMENT
                                                            </span>

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
                                                className="text-xl md:text-2xl font-semibold text-white/80 leading-relaxed max-w-[620px]"
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
                                            className={`pt-2 transition-all duration-700 ${isVisible
                                                    ? "opacity-100 scale-100 rotate-0"
                                                    : "opacity-0 scale-0 -rotate-180"
                                                }`}
                                            style={{ transitionDelay: "1000ms" }}
                                        >
                                            <button className="group relative px-8 py-4 bg-gradient-to-r from-neon-500 to-blue-500 rounded-2xl overflow-hidden shadow-[0_0_5px_rgba(34,211,238,0.4)] hover:shadow-[0_0_5px_rgba(34,211,238,0.7)] transition-all duration-300 hover:scale-105">
                                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-neon-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                                <div className="relative flex items-center gap-3 text-white font-semibold text-lg">
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
                                className={`image-container flex justify-center lg:justify-start transition-all duration-1300 ease-out ${isVisible ? "opacity-100" : "opacity-0"
                                    }`}
                                style={{
                                    transitionDelay: "200ms",
                                    animation: isVisible
                                        ? "float 3.5s ease-in-out infinite"
                                        : "none",
                                }}
                            >
                                <div className="relative w-[480px] max-w-full">
                                    <div
                                        className="relative group"
                                        onMouseMove={handleMouseMove}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <div
                                            className="absolute inset-0 rounded-[36px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            data-neon-light
                                        />
                                        <div
                                            ref={cardRef}
                                            className="
    relative rounded-[36px] overflow-hidden w-full aspect-square
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

            <EnhancedSection2 />
            <AppBenefitsSection />
            <OurApps />
            {/* <Footer /> */}
        </>
    );
};

export default AppDevelopment;
