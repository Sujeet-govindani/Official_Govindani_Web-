import React, { useEffect, useRef } from "react";
import { Search, Users, BadgeCheck, TrendingUp } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);

type Step = {
  title: string;
  description: string;
  icon: React.ElementType;
  image?: string;
};

const steps: Step[] = [
  {
    icon: Search,
    title: "Increased Visibility",
    description:
      "Enhance your online presence with high-quality content that ranks well in different search engines.",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop",
  },
  {
    icon: Users,
    title: "Audience Engagement",
    description:
      "Create engaging content that captures your audience's attention and encourages interaction.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop",
  },
  {
    icon: BadgeCheck,
    title: "Brand Authority",
    description:
      "Establish your brand as a thought leader in your industry with informative and valuable content.",
    image:
      "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?w=800&h=600&fit=crop",
  },
  {
    icon: TrendingUp,
    title: "Lead Generation",
    description:
      "Generate leads by providing content that addresses your audience's pain points and offers solutions.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
  },
];

const ContentBenefits = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const particlesCanvasRef = useRef<HTMLCanvasElement>(null);

  // Mouse follow animation for cards (fixed cleanup + no duplicate listeners)
  useEffect(() => {
    const firstEnter: Record<number, boolean> = {};

    const handleMouseEnter = (e: Event, index: number) => {
      const el = e.currentTarget as HTMLElement;
      const image = el.querySelector(".swipeimage") as HTMLElement;
      if (!image) return;

      firstEnter[index] = true;

      const setX = gsap.quickTo(image, "x", { duration: 0.4, ease: "power3" });
      const setY = gsap.quickTo(image, "y", { duration: 0.4, ease: "power3" });

      const align = (ev: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = ev.clientX - rect.left - image.offsetWidth / 2;
        const y = ev.clientY - rect.top - image.offsetHeight / 2;

        if (firstEnter[index]) {
          setX(x, x);
          setY(y, y);
          firstEnter[index] = false;
        } else {
          setX(x);
          setY(y);
        }
      };

      gsap.to(image, { autoAlpha: 1, duration: 0.2 });
      (el as any).__alignHandler = align;
      document.addEventListener("mousemove", align);

      const seed = (e as any) as MouseEvent;
      align({ clientX: seed.clientX ?? 0, clientY: seed.clientY ?? 0 } as any);
    };

    const handleMouseLeave = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      const image = el.querySelector(".swipeimage") as HTMLElement;

      if (image) gsap.to(image, { autoAlpha: 0, duration: 0.2 });

      if ((el as any).__alignHandler) {
        document.removeEventListener("mousemove", (el as any).__alignHandler);
        (el as any).__alignHandler = null;
      }
    };

    const cards = cardsRef.current.filter(Boolean);
    cards.forEach((card, index) => {
      const enter = (e: Event) => handleMouseEnter(e, index);
      (card as any).__enterHandler = enter;

      card.addEventListener("mouseenter", enter);
      card.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      const cards2 = cardsRef.current.filter(Boolean);
      cards2.forEach((card) => {
        if ((card as any).__enterHandler)
          card.removeEventListener("mouseenter", (card as any).__enterHandler);
        card.removeEventListener("mouseleave", handleMouseLeave);

        if ((card as any).__alignHandler) {
          document.removeEventListener("mousemove", (card as any).__alignHandler);
          (card as any).__alignHandler = null;
        }
      });
    };
  }, []);

  // Video autoplay (unchanged)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";

    video.play().catch((e) => {
      console.log("Autoplay blocked, waiting for interaction:", e);
    });
  }, []);

  // In-view observer (unchanged)
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

  // ✅ GSAP animations: prevent overlap & stacking issues on scroll
  useGSAP(
    () => {
      const el = sectionRef.current;
      if (!el || !gridRef.current) return;

      const cards = cardsRef.current.filter(Boolean);
      if (!cards.length) return;

      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === gridRef.current) st.kill(true);
      });

      const prefersReduced =
        window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ??
        false;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 25%",
          end: "bottom 30%",
          scrub: 0.5,
          pin: gridRef.current,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, i) => {
        tl.fromTo(
          card,
          { x: "-120%", autoAlpha: 0, scale: 0.85 },
          {
            x: "0%",
            autoAlpha: 1,
            scale: 1,
            duration: 0.1,
            ease: "power2.out",
          },
          i * 0.025
        );
      });

      cards.forEach((card) => {
        const onEnter = () =>
          gsap.to(card, { scale: 1.05, duration: 0.35, ease: "power2.out" });
        const onLeave = () =>
          gsap.to(card, { scale: 1, duration: 0.35, ease: "power2.out" });

        (card as any).__hoverEnter = onEnter;
        (card as any).__hoverLeave = onLeave;

        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);
      });

      if (!prefersReduced) {
        [1, 3].forEach((idx) => {
          const card = cards[idx];
          if (card) {
            gsap.to(card, {
              y: -15,
              duration: 0.6,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
            });
          }
        });
      }

      return () => {
        const cards2 = cardsRef.current.filter(Boolean);
        cards2.forEach((card) => {
          if ((card as any).__hoverEnter)
            card.removeEventListener("mouseenter", (card as any).__hoverEnter);
          if ((card as any).__hoverLeave)
            card.removeEventListener("mouseleave", (card as any).__hoverLeave);
        });

        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === gridRef.current) st.kill(true);
        });
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden"
    >
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .subtitle { opacity: 0; transform: translateY(30px); }
        .in-view .subtitle { animation: fadeSlideUp 0.8s ease-out forwards; }

        .word {
          display: inline-block;
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .in-view .word { animation: fadeSlideUp 0.8s ease-out forwards, float 3s ease-in-out infinite; }
        .word:hover { transform: translateY(-8px) scale(1.05); }

        .word-0 { animation-delay: 0.3s; animation-fill-mode: both; }
        .word-1 { animation-delay: 0.5s; animation-fill-mode: both; }
        .word-2 { animation-delay: 0.7s; animation-fill-mode: both; }

        /* ✅ NO CONTAINER LOOK: no bg, no pill, no ring */
        .word-container{
          position: relative;
          display: inline-block;
          padding: 0;              /* no container spacing */
          border-radius: 0;        /* no pill */
          background: transparent; /* no container */
          line-height: 1.1;
        }

        /* base text */
        .word-text{
          display: inline-block;
          transition: all 260ms ease;
          text-shadow: none;
          filter: none;
          will-change: filter;
        }

        /* default WHITE */
        .word-container[data-tone="white"] .word-text{
          color: #ffffff;
        }

        /* default CYAN gradient */
        .word-container[data-tone="cyan"] .word-text{
          background: linear-gradient(135deg, #22d3ee, #3b82f6, #06b6d4);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradientShift 2.6s ease-in-out infinite;
        }

        @keyframes gradientShift{
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        /* ✅ small light shadow like screenshot (subtle) */
        .word-container:hover .word-text{
          text-shadow:
            0 0 10px rgba(34, 211, 238, 0.28),
            0 0 18px rgba(59, 130, 246, 0.14);
          filter: drop-shadow(0 0 6px rgba(34, 211, 238, 0.18));
        }

        /* hover swap: white -> cyan */
        .word-container[data-tone="white"]:hover .word-text{
          background: linear-gradient(135deg, #22d3ee, #3b82f6, #06b6d4);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradientShift 2.2s ease-in-out infinite;
        }

        /* hover swap: cyan -> white */
        .word-container[data-tone="cyan"]:hover .word-text{
          background: none;
          -webkit-background-clip: initial;
          background-clip: initial;
          -webkit-text-fill-color: #ffffff;
          color: #ffffff;
          animation: none;
        }

        /* particles (no ring, only around text) */
        .glow-ring{ display:none; }

        .particle{
          position:absolute;
          width:4px;
          height:4px;
          background: rgba(34, 211, 238, 0.9);
          border-radius: 999px;
          opacity:0;
          pointer-events:none;
          filter: drop-shadow(0 0 8px rgba(34,211,238,0.55));
        }

        .particle-1 { top: 50%; left: -8px; transform: translateY(-50%); }
        .particle-2 { top: -10px; left: 50%; transform: translateX(-50%); }
        .particle-3 { top: 50%; right: -8px; transform: translateY(-50%); }
        .particle-4 { bottom: -10px; left: 50%; transform: translateX(-50%); }

        .word-container:hover .particle-1 { animation: particleFloat1 900ms ease-out forwards; }
        .word-container:hover .particle-2 { animation: particleFloat2 980ms ease-out forwards; }
        .word-container:hover .particle-3 { animation: particleFloat3 940ms ease-out forwards; }
        .word-container:hover .particle-4 { animation: particleFloat4 1020ms ease-out forwards; }

        @keyframes particleFloat1 {
          0% { opacity: 1; transform: translateY(-50%) translate(0, 0) scale(1); }
          100% { opacity: 0; transform: translateY(-50%) translate(-18px, -14px) scale(0.6); }
        }
        @keyframes particleFloat2 {
          0% { opacity: 1; transform: translateX(-50%) translate(0, 0) scale(1); }
          100% { opacity: 0; transform: translateX(-50%) translate(14px, -22px) scale(0.6); }
        }
        @keyframes particleFloat3 {
          0% { opacity: 1; transform: translateY(-50%) translate(0, 0) scale(1); }
          100% { opacity: 0; transform: translateY(-50%) translate(18px, 10px) scale(0.6); }
        }
        @keyframes particleFloat4 {
          0% { opacity: 1; transform: translateX(-50%) translate(0, 0) scale(1); }
          100% { opacity: 0; transform: translateX(-50%) translate(-12px, 20px) scale(0.6); }
        }

        .floating { animation: float 2s ease-in-out infinite; }

        .card-shine {
          position: absolute; inset: -2px; border-radius: 16px;
          background: linear-gradient(90deg, rgba(34,211,238,0.35), rgba(59,130,246,0.18), rgba(99,102,241,0.25));
          opacity: 0.6; filter: blur(0.4px); transition: opacity 300ms ease; pointer-events: none;
        }
        .group:hover .card-shine { opacity: 1; }

        .card-glow {
          position: absolute; inset: 0; border-radius: 16px;
          background: radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%),
            rgba(34,211,238,0.16), rgba(59,130,246,0.10), transparent 55%);
          opacity: 0; transition: opacity 250ms ease; pointer-events: none;
        }
        .group:hover .card-glow { opacity: 1; }

        .swipeimage {
          position: absolute !important; top: 0 !important; left: 0 !important;
          width: 100% !important; height: 100% !important;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, rgba(34,211,238,0.6) 100%) !important;
          background-size: 300% 100% !important; opacity: 0 !important; pointer-events: none !important;
          border-radius: inherit !important; will-change: transform !important;
          transform: translate(-50%, -50%) !important; z-index: 20;
        }
        .group { perspective: none; transform-style: flat; }

        .video-bg {
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
          z-index: -3 !important;
          opacity: 0.15 !important;
          mix-blend-mode: screen !important;
          pointer-events: none !important;
        }

        .falling-particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: rgba(34, 211, 238, 0.4);
          border-radius: 50%;
          pointer-events: none;
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-85 h-56 w-[70%] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-10 h-44 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-44 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        {/* ✅ reduced top spacing */}
        <div className="mt-6 md:mt-2">
          <div ref={containerRef} className="text-center mb-8">
            <span className="subtitle text-cyan-400 font-medium text-lg md:text-xl mb-3 block tracking-wider uppercase floating">
              How Content Marketing Can Help You
            </span>
            <br />
            <h3 className="font-bold text-3xl md:text-2xl lg:text-3xl leading-tight">
              <span className="word word-0 mr-3">
                <span className="word-container" data-tone="white">
                  <span className="word-text">Enhance Your</span>
                  <span className="glow-ring"></span>
                  <span className="particle particle-1"></span>
                  <span className="particle particle-2"></span>
                  <span className="particle particle-3"></span>
                  <span className="particle particle-4"></span>
                </span>
              </span>

              <span className="word word-1 mr-3">
                <span className="word-container" data-tone="cyan">
                  <span className="word-text">Online</span>
                  <span className="glow-ring"></span>
                  <span className="particle particle-1"></span>
                  <span className="particle particle-2"></span>
                  <span className="particle particle-3"></span>
                  <span className="particle particle-4"></span>
                </span>
              </span>

              <span className="word word-1 mr-3">
                <span className="word-container" data-tone="white">
                  <span className="word-text">Presence</span>
                  <span className="glow-ring"></span>
                  <span className="particle particle-1"></span>
                  <span className="particle particle-2"></span>
                  <span className="particle particle-3"></span>
                  <span className="particle particle-4"></span>
                </span>
              </span>

              <span className="word word-1 mr-3">
                <span className="word-container" data-tone="white">
                  <span className="word-text">Business Growth</span>
                  <span className="glow-ring"></span>
                  <span className="particle particle-1"></span>
                  <span className="particle particle-2"></span>
                  <span className="particle particle-3"></span>
                  <span className="particle particle-4"></span>
                </span>
              </span>

              <br />
              <br className="hidden md:block" />
            </h3>
          </div>

          <div className="mb-7 md:mb-12 relative min-h-[600px]">
            <video
              ref={videoRef}
              className="video-bg"
              loop
              muted
              playsInline
              preload="auto"
            >
              <source src="/process.mp4" type="video/mp4" />
              Video not supported.
            </video>

            <div className="absolute inset-0 overflow-hidden -z-20">
              {[...Array(20)].map((_, i) => {
                const startLeft = Math.random() * 100;
                const drift = (Math.random() - 0.5) * 20;
                return (
                  <div
                    key={`falling-particle-${i}`}
                    className="falling-particle"
                    style={{
                      left: `${startLeft}%`,
                      animation: `floatDown${i} ${
                        8 + Math.random() * 15
                      }s linear infinite`,
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

            <canvas
              ref={particlesCanvasRef}
              className="particles-canvas absolute inset-0 w-full h-full z-[-1] pointer-events-none"
            />

            <div
              ref={gridRef}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10"
            >
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={index}
                    className="relative group overflow-hidden rounded-2xl"
                    ref={(node) => {
                      if (node) cardsRef.current[index] = node;
                    }}
                    onMouseMove={(e) => {
                      const target = e.currentTarget as HTMLDivElement;
                      const rect = target.getBoundingClientRect();
                      const mx = ((e.clientX - rect.left) / rect.width) * 100;
                      const my = ((e.clientY - rect.top) / rect.height) * 100;
                      target.style.setProperty("--mx", `${mx}%`);
                      target.style.setProperty("--my", `${my}%`);
                    }}
                  >
                    <div className="swipeimage" />
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-cyan-400/50 to-transparent z-0" />
                    )}
                    <div className="card-shine" />

                    <div
                      className="relative z-10 h-full rounded-2xl
                      bg-gradient-to-br from-cyan-900/25 via-cyan-800/15 to-slate-900/40
                      backdrop-blur-xl
                      border border-cyan-400/25
                      shadow-[0_8px_32px_-8px_rgba(34,211,238,0.3)]
                      transition-all duration-500
                      flex flex-col
                      overflow-hidden
                      group-hover:bg-gradient-to-br group-hover:from-cyan-900/35 group-hover:via-cyan-800/25 group-hover:to-slate-900/50
                      group-hover:border-cyan-400/50
                      group-hover:shadow-[0_20px_80px_-15px_rgba(34,211,238,0.6),0_0_40px_rgba(34,211,238,0.2)]
                      group-hover:-translate-y-3
                      group-hover:scale-[1.02]"
                    >
                      <div className="card-glow" />

                      {step.image && (
                        <div className="relative w-full h-56 overflow-hidden">
                          <img
                            src={step.image}
                            alt={step.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent"></div>
                        </div>
                      )}

                      <div className="p-8 flex flex-col flex-grow">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-400/20">
                            <Icon className="h-5 w-5 text-cyan-300" />
                          </span>
                          <h3 className="font-heading text-xl font-bold text-white transition-colors duration-300 group-hover:text-cyan-300 text-left">
                            {step.title}
                          </h3>
                        </div>

                        <p className="text-slate-300/90 text-base leading-relaxed text-left">
                          {step.description}
                        </p>
                      </div>

                      <div className="pointer-events-none absolute inset-x-8 bottom-6 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentBenefits;
