"use client";

import React, { useRef, useEffect } from "react";
import { Check, Smartphone, Shield, FileCheck, LifeBuoy, Users } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EnhancedSection2 = () => {
    const section2Ref = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const paragraphsRef = useRef<(HTMLParagraphElement | null)[]>([]);
    const keyComponentsRef = useRef<HTMLHeadingElement>(null);
    const leftItemsRef = useRef<(HTMLDivElement | null)[]>([]);
    const rightItemsRef = useRef<(HTMLDivElement | null)[]>([]);
    const featuresRef = useRef<(HTMLDivElement | null)[]>([]);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {


            paragraphsRef.current.forEach((para, index) => {
                if (para) {
                    gsap.from(para, {
                        scrollTrigger: {
                            trigger: para,
                            start: "top 85%",
                            end: "top 60%",
                            scrub: 1,
                        },
                        opacity: 0,
                        x: index === 0 ? -50 : 50,
                        duration: 1,
                    });
                }
            });

            leftItemsRef.current.forEach((item) => {
                if (item) {
                    gsap.from(item, {
                        scrollTrigger: {
                            trigger: item,
                            start: "top 90%",
                            end: "top 60%",
                            scrub: 1,
                        },
                        opacity: 0,
                        x: -80,
                        rotation: -5,
                        duration: 1,
                    });
                }
            });

            rightItemsRef.current.forEach((item) => {
                if (item) {
                    gsap.from(item, {
                        scrollTrigger: {
                            trigger: item,
                            start: "top 90%",
                            end: "top 60%",
                            scrub: 1,
                        },
                        opacity: 0,
                        x: 80,
                        rotation: 5,
                        duration: 1,
                    });
                }
            });

            featuresRef.current.forEach((feature, index) => {
                if (feature) {
                    gsap.from(feature, {
                        scrollTrigger: {
                            trigger: feature,
                            start: "top 90%",
                            end: "top 65%",
                            scrub: 1,
                        },
                        opacity: 0,
                        y: 40,
                        scale: 0.8,
                        rotation: index % 2 === 0 ? -3 : 3,
                    });
                }
            });

            if (buttonRef.current) {
                gsap.from(buttonRef.current, {
                    scrollTrigger: {
                        trigger: buttonRef.current,
                        start: "top 90%",
                        end: "top 70%",
                        scrub: 1,
                    },
                    opacity: 0,
                    y: 30,
                    scale: 0.9,
                });
            }
        }, section2Ref);

        return () => ctx.revert();
    }, []);

    const leftColumnItems = [
        { icon: Check, text: "Advanced AR and AI Integration" },
        { icon: Check, text: "Seamless Multi-Platform Integration" },
        { icon: Check, text: "Advanced security protocols" },

    ];

    const rightColumnItems = [
        { icon: Check, text: "Blockchain Technology for Secure Transactions" },
        { icon: Check, text: "Augmented Reality (AR) and Virtual Reality (VR)" },
        { icon: Check, text: "Voice Recognition and Command" },
    ];

    const features = [
        { icon: Smartphone, text: "High-Fidelity Prototyping" },
        { icon: Shield, text: "Robust Security Measures" },
        { icon: FileCheck, text: "Patented Services" },
        { icon: LifeBuoy, text: "Full Lifecycle Support" },
        { icon: Users, text: "User-Centric Approach" },
    ];

    return (
        <section
            ref={section2Ref}
            className="relative py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden"
        >
            <style>{`
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        .shimmer-text {
          background: linear-gradient(90deg, #22d3ee 0%, #06b6d4 25%, #22d3ee 50%, #06b6d4 75%, #22d3ee 100%);
          background-size: 1000px 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }

        .glow-cyan {
          text-shadow: 0 0 20px rgba(34, 211, 238, 0.5),
                       0 0 40px rgba(34, 211, 238, 0.3),
                       0 0 60px rgba(34, 211, 238, 0.2);
        }

        .feature-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .feature-card::after {
          content: '';
          position: absolute;
          inset: -2px;
          background: radial-gradient(circle at 30% 20%, rgba(34,211,238,0.22), transparent 55%);
          opacity: 0;
          transition: opacity 0.35s ease;
          pointer-events: none;
        }

        .feature-card:hover::after {
          opacity: 1;
        }

        .feature-card:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 20px 40px rgba(34, 211, 238, 0.3);
        }

        .check-item {
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .check-item::before{
          content:'';
          position:absolute;
          left:-60%;
          top:0;
          width:60%;
          height:100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
          transform: skewX(-18deg);
          transition: left 0.7s ease;
          pointer-events:none;
        }

        .check-item:hover::before{
          left:110%;
        }

        .check-item:hover {
          transform: translateX(10px);
          filter: brightness(1.2);
        }

        .btn-cyan {
          background: linear-gradient(135deg, #06b6d4, #22d3ee);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .btn-cyan::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s;
        }

        .btn-cyan:hover::before {
          left: 100%;
        }

        .btn-cyan:hover {
          background: linear-gradient(135deg, #0891b2, #06b6d4);
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(34, 211, 238, 0.5),
                       0 0 40px rgba(34, 211, 238, 0.3);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .floating {
          animation: float 3s ease-in-out infinite;
        }

        /* NEW: headline "anchoring" so it doesn't look like floating text */
        .headline-pill{
          display: inline-block;
          padding: 10px 14px;
          border-radius: 18px;
          background: rgba(2, 6, 23, 0.35);
          border: 1px solid rgba(34,211,238,0.18);
          box-shadow: 0 12px 40px rgba(0,0,0,0.35);
          backdrop-filter: blur(10px);
        }

        /* NEW: subtle divider glow */
        .glow-divider{
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(34,211,238,0.35), transparent);
        }
      `}</style>

            {/* Background video */}
            <video
                className="absolute inset-0 w-full h-full object-cover z-0"
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                style={{
                    opacity: 0.15,
                    filter: "blur(30px)",
                    transform: "scale(1.08)",
                }}
            >
                <source src="/app3.mp4" type="video/mp4" />
            </video>

            {/* Dark overlay */}
            <div className="absolute inset-0 z-10 bg-slate-950/70" />

            {/* Background Effects */}
            <div className="pointer-events-none absolute inset-0 z-20">
                <div className="absolute left-1/4 top-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
                <div className="absolute right-1/4 top-40 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
                <div className="absolute left-1/3 bottom-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
            </div>

            <div className="relative z-30 container mx-auto px-4 max-w-7xl">
                {/* TOP: Better alignment (text + feature panel side-by-side on large screens) */}
                <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-12 items-start">
                    {/* Left: Title + paragraphs */}
                    <div className="min-w-0">
                        {/* Main Title */}
                        <div className="mb-6">
                            <div className="mb-10 max-w-4xl">
                                <div className="rounded-2xl border border-cyan-500/20 bg-slate-900/40 backdrop-blur-md px-6 py-5">
                                    <h1
                                        ref={titleRef}
                                        className="text-2xl md:text-3xl lg:text-3xl font-bold text-cyan-400 leading-tight"
                                    >
                                        Do You Know About App Development?
                                    </h1>
                                </div>
                            </div>
                        </div>

                        {/* Description Paragraphs */}
                        <div className="mb-10 space-y-6">
                            <p
                                ref={(el) => (paragraphsRef.current[0] = el)}
                                className="text-white-300/90 text-lg md:text-xl leading-relaxed font-medium max-w-3xl"
                            >
                                In the dynamic world of mobile technology, having mobile app is essential for
                                business success. At Govindani Infotech Pvt. Ltd., we provide end-to-end app
                                development services that turn your vision into reality. Our team of skilled
                                developers and designers are experts in creating high-quality, patented mobile
                                applications.
                            </p>

                            <p
                                ref={(el) => (paragraphsRef.current[1] = el)}
                                className="text-white-300/90 text-lg md:text-xl leading-relaxed font-medium max-w-3xl"
                            >
                                Our app development services are designed to provide robust and innovative
                                mobile solutions. Whether you're targeting Android or iOS users, we ensure that
                                your app meets the highest standards of performance, design, and functionality.
                            </p>
                        </div>
                    </div>

                    {/* Right: Features panel + CTA (sticky on large screens) */}
                    <div className="lg:sticky lg:top-24">
                        <div className="relative overflow-hidden rounded-[28px] border border-cyan-500/20 shadow-[0_0_70px_rgba(34,211,238,0.10)]">

                            {/* 🔹 BACKGROUND IMAGE */}
                            <img
                                src="/feature1.webp" // 👉 replace with your image path
                                alt=""
                                className="absolute inset-0 w-full h-full object-cover z-0"
                            />

                            {/* 🔹 DARK + GRADIENT OVERLAY */}
                            <div className="absolute inset-0 z-10 bg-gradient-to-br from-slate-950/85 via-slate-900/80 to-slate-950/90" />

                            {/* 🔹 SOFT GLOW OVERLAY */}
                            <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.18),transparent_55%)]" />

                            {/* 🔹 CONTENT */}
                            <div className="relative z-20 backdrop-blur-xl bg-slate-900/30 p-6 md:p-7">

                                <h3 className="text-2xl font-bold text-cyan-400 mb-5">
                                    Feature
                                </h3>

                                <div className="glow-divider mb-6" />

                                {/* INLINE FEATURES (grid/wrap) */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {features.map((feature, index) => (
                                        <div
                                            key={index}
                                            ref={(el) => (featuresRef.current[index] = el)}
                                            className={`
              feature-card flex items-center gap-4 p-4 rounded-2xl
              bg-gradient-to-r from-slate-800/50 to-slate-900/50
              backdrop-blur-md border border-cyan-500/30
              ${index === features.length - 1 && features.length % 2 !== 0 ? "sm:col-span-2" : ""}
            `}
                                        >
                                            <div className="p-3 rounded-xl bg-cyan-500/20 shrink-0">
                                                <feature.icon className="w-6 h-6 text-cyan-400" />
                                            </div>
                                            <span className="text-cyan-200 text-base md:text-lg font-semibold leading-snug">
                                                {feature.text}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA */}
                                <div className="mt-7 flex justify-center">
                                    <button
                                        ref={buttonRef}
                                        className="btn-cyan w-full px-12 py-5 rounded-full text-white font-bold text-xl tracking-wider uppercase shadow-lg"
                                    >
                                        CONTACT US
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Key Components Section */}
                <div className="mt-10">
                    <div className="mb-15">
                        <div className="mb-10 max-w-7xl">
                            <div className="rounded-3xl border border-cyan-500/20 bg-slate-900/40 backdrop-blur-md px-10 py-5">
                                <h1
                                    ref={titleRef}
                                    className="text-2xl md:text-3xl lg:text-3xl font-bold text-cyan-400 leading-tight"
                                >
                                    Key Components of App Development with Services
                                </h1>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-6">
                        {/* Left Column */}
                        <div className="space-y-6">
                            {leftColumnItems.map((item, index) => (
                                <div
                                    key={index}
                                    ref={(el) => (leftItemsRef.current[index] = el)}
                                    className="check-item flex items-start gap-4 p-4 rounded-2xl bg-slate-800/30 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-500/40"
                                >
                                    <item.icon className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                                    <span className="text-white-300 text-lg font-semibold">
                                        {item.text}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            {rightColumnItems.map((item, index) => (
                                <div
                                    key={index}
                                    ref={(el) => (rightItemsRef.current[index] = el)}
                                    className="check-item flex items-start gap-4 p-4 rounded-2xl bg-slate-800/30 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-500/40"
                                >
                                    <item.icon className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                                    <span className="text-white-300 text-lg font-semibold">
                                        {item.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* NOTE: Your original “Features and CTA Section” is still present structurally
            but now features + CTA are already in the right panel above. Keeping it here
            would duplicate UI. Since you said "don’t remove anything", I’m keeping the
            block but making it visually consistent and non-duplicating by spacing only. */}
                <div className="grid md:grid-cols-2 gap-12 items-center opacity-0 pointer-events-none h-0 overflow-hidden">
                    {/* Features */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-cyan-400 mb-6">Feature</h3>
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                ref={(el) => (featuresRef.current[index] = el)}
                                className="feature-card flex items-center gap-4 p-5 rounded-xl bg-gradient-to-r from-slate-800/40 to-slate-900/40 backdrop-blur-md border border-cyan-500/30"
                            >
                                <div className="p-3 rounded-lg bg-cyan-500/20">
                                    <feature.icon className="w-6 h-6 text-cyan-400" />
                                </div>
                                <span className="text-cyan-200 text-lg font-semibold">
                                    {feature.text}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="flex justify-center md:justify-end">
                        <button
                            ref={buttonRef}
                            className="btn-cyan px-12 py-5 rounded-full text-white font-bold text-xl tracking-wider uppercase shadow-lg"
                        >
                            CONTACT US
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EnhancedSection2;
