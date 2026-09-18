import { MessageSquare, Lightbulb, Code2, Rocket, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect, CSSProperties, FC, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Step = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
};

type GlowPulseProps = {
  show: boolean;
  color?: string;
};

type ElectricSparkProps = {
  show: boolean;
};

const ProcessSection: FC = () => {
  const [showHow, setShowHow] = useState(false);
  const [showCan, setShowCan] = useState(false);
  const [showYou, setShowYou] = useState(false);
  const [showAchieve, setShowAchieve] = useState(false);
  const [showExcellence, setShowExcellence] = useState(false);
  const [showFor, setShowFor] = useState(false);
  const [showYour, setShowYour] = useState(false);
  const [showBusiness, setShowBusiness] = useState(false);

  const explainerVideoSrc1 = "/Videos/V5.mp4";
  const explainerVideoSrc = "/Videos/impact6.mp4";


  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const graphContainerRef = useRef<HTMLDivElement | null>(null);
  const graphBarsRef = useRef<(HTMLDivElement | null)[]>([]);

  // GSAP Animations
  useEffect(() => {
    // 3D Video Container Animation on Scroll
    if (videoContainerRef.current) {
      gsap.fromTo(
        videoContainerRef.current,
        {
          rotateY: -25,
          rotateX: 10,
          scale: 0.85,
          opacity: 0,
          z: -100,
        },
        {
          rotateY: 0,
          rotateX: 0,
          scale: 1,
          opacity: 1,
          z: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: videoContainerRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: 1,
          },
        }
      );
    }

    // Graph Bars Sequential Animation
    if (graphBarsRef.current.length > 0) {
      graphBarsRef.current.forEach((bar, index) => {
        if (bar) {
          const progressBar = bar.querySelector(".progress-bar");
          const label = bar.querySelector(".graph-label");
          const value = bar.querySelector(".graph-value");

          gsap.fromTo(
            bar,
            { x: -50, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.6,
              delay: index * 0.15,
              ease: "power2.out",
              scrollTrigger: {
                trigger: graphContainerRef.current,
                start: "top 70%",
              },
            }
          );

          if (progressBar) {
            gsap.fromTo(
              progressBar,
              { width: "0%" },
              {
                width: progressBar.getAttribute("data-width") || "0%",
                duration: 1,
                delay: index * 0.15 + 0.3,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: graphContainerRef.current,
                  start: "top 70%",
                },
              }
            );
          }
        }
      });
    }
  }, []);

  useEffect(() => {
    const timers = [
      setTimeout(() => setShowHow(true), 100),
      setTimeout(() => setShowCan(true), 250),
      setTimeout(() => setShowYou(true), 400),
      setTimeout(() => setShowAchieve(true), 550),
      setTimeout(() => setShowExcellence(true), 700),
      setTimeout(() => setShowFor(true), 950),
      setTimeout(() => setShowYour(true), 1100),
      setTimeout(() => setShowBusiness(true), 1250),
    ];

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => { });
        } else {
          el.pause();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const steps: Step[] = [
    {
      icon: MessageSquare,
      title: "Discovery & Consultation",
      description:
        "We begin by understanding your business, goals, and challenges through in-depth discussions.",
    },
    {
      icon: Lightbulb,
      title: "Strategy & Planning",
      description: "Our team develops a comprehensive strategy and roadmap tailored to your objectives.",
    },
    {
      icon: Code2,
      title: "Design & Development",
      description: "We bring your vision to life with cutting-edge design and development practices.",
    },
    {
      icon: Rocket,
      title: "Launch & Support",
      description: "After rigorous testing, we launch your project and provide ongoing support.",
    },
  ];

  const elasticStyle = (show: boolean): CSSProperties => ({
    opacity: show ? 1 : 0,
    transform: show
      ? "translateY(0) scale(1) rotateX(0deg)"
      : "translateY(-80px) scale(0.3) rotateX(-90deg)",
    filter: show ? "blur(0)" : "blur(8px)",
    transition: "all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    display: "inline-block",
    position: "relative",
    overflow: "hidden",
    paddingBottom: "0.3rem",
    marginRight: "0.5rem",
    transformStyle: "preserve-3d",
  });

  const GlowPulse: FC<GlowPulseProps> = ({ show, color = "rgba(34, 211, 238, 0.6)" }) =>
    show ? (
      <span
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "100%",
          height: "100%",
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, ${color}, transparent 70%)`,
          animation: "pulse 2s ease-in-out infinite",
          pointerEvents: "none",
          opacity: 0.4,
        }}
      />
    ) : null;

  const ElectricSpark: FC<ElectricSparkProps> = ({ show }) =>
    show ? (
      <>
        <span
          style={{
            position: "absolute",
            top: 0,
            left: "-100%",
            width: "100%",
            height: "100%",
            background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)",
            animation: "electricSlide 3s ease-in-out infinite",
            pointerEvents: "none",
            filter: "blur(1px)",
          }}
        />
        <span
          style={{
            position: "absolute",
            top: "-2px",
            left: "-2px",
            right: "-2px",
            bottom: "-2px",
            background: "linear-gradient(45deg, #22d3ee, #3b82f6, #8b5cf6, #22d3ee)",
            backgroundSize: "300% 300%",
            animation: "gradientShift 3s ease infinite",
            opacity: 0.3,
            filter: "blur(8px)",
            zIndex: -1,
            pointerEvents: "none",
          }}
        />
      </>
    ) : null;

  const headlineMetrics = ["Web Presence", "Brand Identity", "Digital Marketing", "Customer Engagement"];
  const metricValues = [80, 70, 90, 75];

  return (
    <section className="py-24 relative overflow-hidden bg-slate-900 isolate z-10">
      {/* Animated Background Layer */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="
            absolute inset-0
            backdrop-blur-lg
            bg-cyan-400/10
            border-y border-cyan-300/20
            shadow-[inset_0_0_80px_rgba(34,211,238,0.18)]
            pointer-events-none
          "
        />

        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />

        <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div
          className="absolute bottom-0 right-0 w-72 h-72 bg-primary/15 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => {
            const startLeft = Math.random() * 100;
            const drift = (Math.random() - 0.5) * 20;
            return (
              <div
                key={`particle-${i}`}
                className="absolute w-1 h-1 bg-primary/40 rounded-full"
                style={{
                  left: `${startLeft}%`,
                  animation: `floatDown${i} ${8 + Math.random() * 15}s linear infinite`,
                  animationDelay: `${Math.random() * 8}s`,
                }}
              >
                <style>{`
                  @keyframes floatDown${i} {
                    0% { transform: translate(0, -20px); opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { transform: translate(${drift}px, calc(100vh + 20px)); opacity: 0; }
                  }
                `}</style>
              </div>
            );
          })}
        </div>

        {/* Floating Cubes */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => {
            const startLeft = Math.random() * 90;
            const drift = (Math.random() - 0.5) * 30;
            const rotateSpeed = Math.random() * 360;
            return (
              <div
                key={`cube-${i}`}
                className="absolute w-6 h-6"
                style={{
                  left: `${startLeft}%`,
                  animation: `floatCubeDown${i} ${12 + Math.random() * 18}s linear infinite`,
                  animationDelay: `${Math.random() * 8}s`,
                  transformStyle: "preserve-3d",
                }}
              >
                <style>{`
                  @keyframes floatCubeDown${i} {
                    0% { transform: translate(0, -30px) rotateX(0deg) rotateY(0deg) rotateZ(0deg); opacity: 0; }
                    10% { opacity: 0.6; }
                    90% { opacity: 0.6; }
                    100% { transform: translate(${drift}px, calc(100vh + 30px)) rotateX(${rotateSpeed}deg) rotateY(${rotateSpeed}deg) rotateZ(${rotateSpeed / 2}deg); opacity: 0; }
                  }
                `}</style>
                <div
                  className="absolute w-6 h-6 border border-primary/25 backdrop-blur-sm"
                  style={{
                    transform: "translateZ(3px) rotateX(0deg) rotateY(0deg)",
                    background: "rgba(34, 211, 238, 0.08)",
                    boxShadow: "0 0 8px rgba(34, 211, 238, 0.3)",
                  }}
                />
                <div
                  className="absolute w-6 h-6 border border-primary/25 backdrop-blur-sm"
                  style={{
                    transform: "rotateY(90deg) translateZ(3px)",
                    background: "rgba(34, 211, 238, 0.06)",
                    boxShadow: "0 0 8px rgba(34, 211, 238, 0.2)",
                  }}
                />
                <div
                  className="absolute w-6 h-6 border border-primary/25 backdrop-blur-sm"
                  style={{
                    transform: "rotateX(90deg) translateZ(3px)",
                    background: "rgba(34, 211, 238, 0.06)",
                    boxShadow: "0 0 8px rgba(34, 211, 238, 0.2)",
                  }}
                />
                <div
                  className="absolute w-6 h-6 border border-primary/25 backdrop-blur-sm"
                  style={{
                    transform: "translateZ(-3px) rotateX(0deg) rotateY(0deg)",
                    background: "rgba(34, 211, 238, 0.04)",
                  }}
                />
                <div
                  className="absolute w-6 h-6 border border-primary/25 backdrop-blur-sm"
                  style={{
                    transform: "rotateY(-90deg) translateZ(3px)",
                    background: "rgba(34, 211, 238, 0.04)",
                  }}
                />
                <div
                  className="absolute w-6 h-6 border border-primary/25 backdrop-blur-sm"
                  style={{
                    transform: "rotateX(-90deg) translateZ(3px)",
                    background: "rgba(34, 211, 238, 0.04)",
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Content Layer */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6" style={{ lineHeight: "1.5" }}>
            <span
              style={{
                ...elasticStyle(showHow),
                color: "#ffffff",
                textShadow: "0 0 2px rgba(34, 211, 238, 0.5), 0 0 40px rgba(34, 211, 238, 0.3)",
                fontWeight: 95,
              }}
            >
              How
            </span>

            <span
              style={{
                ...elasticStyle(showCan),
                color: "#ffffff",
                textShadow: "0 0 2px rgba(34, 211, 238, 0.5), 0 0 8px rgba(34, 211, 238, 0.3)",
                fontWeight: 95,
              }}
            >
              can
            </span>

            <span
              style={{
                ...elasticStyle(showYou),
                color: "#ffffff",
                textShadow: "0 0 2px rgba(34, 211, 238, 0.5), 0 0 8px rgba(34, 211, 238, 0.3)",
                fontWeight: 95,
              }}
            >
              you
            </span>

            <span
              style={{
                ...elasticStyle(showAchieve),
                color: "#ffffff",
                textShadow: "0 0 2px rgba(34, 211, 238, 0.5), 0 0 8px rgba(34, 211, 238, 0.3)",
                fontWeight: 95,
              }}
            >
              achieve
            </span>

            <span
              style={{
                ...elasticStyle(showExcellence),
                background:
                  "linear-gradient(135deg, #22d3ee 0%, #3b82f6 50%, #8b5cf6 100%)", // ✅ FIXED
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",

                filter: showExcellence
                  ? "blur(0) brightness(1.4) drop-shadow(0 0 4px rgba(34, 211, 238, 0.8))"
                  : "blur(0.8px)",

                fontWeight: 320,
                position: "relative",
                zIndex: 1,

                /* 🔥 Vertical floating animation */
                animation: showExcellence
                  ? "floatY 1.2s ease-in-out infinite"
                  : "none",
              }}
            >
              excellence
            </span>
            <br />
          </h2>

          <div className="mt-10 grid gap-8 md:grid-cols-2 items-stretch text-left">
            {/* Left side: 3D LCD TV */}
            <div className="flex flex-col gap-6 h-full">
              <div
                ref={videoContainerRef}
                className="relative aspect-video group"
                style={{
                  perspective: "1000px",
                  transformStyle: "preserve-3d",
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = (e.clientX - rect.left) / rect.width - 0.5;
                  const y = (e.clientY - rect.top) / rect.height - 0.5;

                  gsap.to(videoContainerRef.current, {
                    rotateY: x * 8,
                    rotateX: -y * 8,
                    duration: 0.5,
                    ease: "power2.out",
                  });
                }}
                onMouseLeave={() => {
                  gsap.to(videoContainerRef.current, {
                    rotateY: 0,
                    rotateX: 0,
                    duration: 0.7,
                    ease: "power2.out",
                  });
                }}
              >
                {/* LCD TV Frame */}
                <div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: "linear-gradient(145deg, #1a1a1a, #0a0a0a)",
                    padding: "1.2rem",
                    boxShadow: `
                      0 0 30px rgba(34, 211, 238, 0.3),
                      inset 0 2px 4px rgba(255, 255, 255, 0.1),
                      inset 0 -2px 4px rgba(0, 0, 0, 0.5),
                      0 20px 60px rgba(0, 0, 0, 0.6)
                    `,
                    transformStyle: "preserve-3d",
                    transform: "translateZ(20px)",
                  }}
                >
                  {/* Inner bezel */}
                  <div
                    className="absolute inset-[1rem] rounded-xl"
                    style={{
                      background: "linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)",
                      boxShadow: "inset 0 0 20px rgba(0, 0, 0, 0.8)",
                    }}
                  />

                  {/* Screen glow effect */}
                  <div
                    className="absolute inset-[1.2rem] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: "radial-gradient(circle at center, rgba(212, 175, 55, 0.15), transparent 70%)",
                      filter: "blur(10px)",
                      pointerEvents: "none",
                    }}
                  />

                  {/* Video screen */}
                  <div className="relative w-full h-full rounded-xl overflow-hidden bg-black" style={{ transform: "translateZ(10px)" }}>
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        boxShadow: "inset 0 0 20px rgba(34, 211, 238, 0.4), 0 0 15px rgba(34, 211, 238, 0.3)",
                        borderRadius: "0.75rem",
                      }}
                    />

                    {explainerVideoSrc1 ? (
                      <video
                        ref={videoRef}
                        src={explainerVideoSrc1}
                        controls
                        muted
                        playsInline
                        preload="none"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-slate-400 text-sm">Your explainer video goes here</span>
                      </div>
                    )}
                  </div>

                  {/* Bottom light indicator */}
                  <div
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
                    style={{
                      background: "radial-gradient(circle, rgba(34, 211, 238, 0.8), transparent)",
                      boxShadow: "0 0 8px rgba(34, 211, 238, 0.6)",
                      animation: "breathe 3s ease-in-out infinite",
                    }}
                  />
                </div>

                {/* Stand */}
                <div
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-24 h-8"
                  style={{
                    background: "linear-gradient(180deg, #2a2a2a, #1a1a1a)",
                    clipPath: "polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
                  }}
                />
              </div>

              {/* Text */}
              <div className="mt-8">
                <h3 className="font-heading text-xl font-semibold mb-3 text-white">Grow your digital presence</h3>
                <p className="text-slate-300 text-base leading-relaxed font-medium">
                  In today&apos;s digital age, having a strong online presence is crucial. Our comprehensive approach
                  ensures your business stands out and connects with your target audience effectively.
                </p>
              </div>
            </div>

            {/* Right side: Animated Graph */}
            <div
              ref={graphContainerRef}
              className="relative overflow-hidden rounded-xl border border-slate-700/40 h-full min-h-[420px] flex flex-col"
            >
              {/* 🔹 Background Video */}
              {explainerVideoSrc && (
                <video
                  ref={videoRef}
                  src={explainerVideoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="none"
                  className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
                />
              )}

              {/* 🔹 Dark Overlay for Readability */}
              <div className="absolute inset-0 bg-black/55 z-10" />

              {/* 🔹 Optional Texture / Image Overlay */}


              {/* 🔹 CONTENT ON TOP */}
              <div className="relative z-20 p-6 flex-1 flex flex-col backdrop-blur-sm">
                <h3 className="font-heading text-xl font-semibold mb-4 text-center text-white">
                  Impact Overview
                </h3>

                <div className="flex-1 flex flex-col justify-center">
                  {headlineMetrics.map((label, index) => {
                    const value = metricValues[index];
                    return (
                      <div
                        key={label}
                        ref={(el) => (graphBarsRef.current[index] = el)}
                        className="mb-7 last:mb-0"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-white graph-label">
                            {label}
                          </span>
                          <span className="text-xs text-slate-300 graph-value">
                            {value}%
                          </span>
                        </div>

                        <div className="h-2 w-full bg-slate-700/70 rounded-full overflow-hidden">
                          <div
                            className="progress-bar h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all"
                            data-width={`${value}%`}
                            style={{ width: "0%" }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { 
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.4;
          }
          50% { 
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0.2;
          }
        }

        @keyframes electricSlide {
          0% { left: -100%; opacity: 0; }
          50% { opacity: 1; }
          100% { left: 200%; opacity: 0; }
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes breathe {
          0%, 100% { 
            opacity: 0.6;
            transform: scale(1);
          }
          50% { 
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
    </section>
  );
};

export default ProcessSection;