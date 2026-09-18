import { useEffect, useMemo, useRef, useState } from "react";

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showAny, setShowAny] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const aboutRef = useRef<HTMLDivElement>(null);
  const [aboutVisible, setAboutVisible] = useState(false);

  const headingWrapRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);

  // ✅ Used for the simple hero card reveal
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isHeroImgVisible, setIsHeroImgVisible] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);

  const stats = [
    { number: 8, suffix: "+", label: "YEARS IN MARKET" },
    { number: 1000, suffix: "+", label: "HAPPY CLIENTS" },
    { number: 3824, suffix: "+", label: "PROJECTS DONE" },
    { number: 958026, suffix: "+", label: "NGO RAISED AMOUNT" },
  ];

  const [animatedStats, setAnimatedStats] = useState<number[]>(
    stats.map(() => 0)
  );

  // Track animation completion to prevent glitches
  const [animationCompleted, setAnimationCompleted] = useState<boolean[]>(
    stats.map(() => false)
  );

  const animateCount = (
    start: number,
    end: number,
    duration: number,
    setValue: (val: number) => void,
    index: number
  ) => {
    const startTime = performance.now();
    const update = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      
      // Ensure value never goes below 0
      const safeValue = Math.max(0, value);
      setValue(safeValue);
      
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        // Animation completed for this stat
        setAnimationCompleted(prev => {
          const newCompleted = [...prev];
          newCompleted[index] = true;
          return newCompleted;
        });
      }
    };
    requestAnimationFrame(update);
  };

  // ✅ Simple reveal for the hero (single card)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsHeroVisible(true);
            setTimeout(() => setIsHeroImgVisible(true), 300);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAboutVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (aboutRef.current) observer.observe(aboutRef.current);
    return () => observer.disconnect();
  }, []);

  const mixText = (text: string) => {
    const words = text.split(" ");
    return (
      <span className="swap">
        {words.map((w, i) => (
          <span key={`${w}-${i}`} className={i % 2 === 0 ? "white" : "gold"}>
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </span>
    );
  };

  const lines = useMemo(
    () => [
      "We are not selling websites.",
      "We provide a dedicated platform for lifetime.",
      "Independency where NGOs can raise funds directly.",
      "Without relying on any platform, we open gates for NGOs to raise funds.",
    ],
    []
  );

  useEffect(() => {
    if (!card1Ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          card1Ref.current?.classList.add("animate-in");
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(card1Ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setShowAny(true);

          stats.forEach((stat, index) => {
            setTimeout(() => {
              animateCount(0, stat.number, 1500 + index * 200, (val) => {
                setAnimatedStats((prev) => {
                  const copy = [...prev];
                  copy[index] = val;
                  return copy;
                });
              }, index);
            }, index * 150);
          });

          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black"
    >
      {/* Simple black background with minimal golden glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-[420px] h-[420px] rounded-full blur-[160px]"
          style={{ background: "rgba(217,119,6,0.04)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[380px] h-[380px] rounded-full blur-[150px]"
          style={{ background: "rgba(251,191,36,0.03)" }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 py-6 sm:py-10 md:py-14 z-10">
        {/* HERO CARD - Golden theme with centralized content and golden border */}
        <div
          className="
            relative rounded-[30px]
            border border-amber-400/40
            bg-black/80
            backdrop-blur-sm
            shadow-[0_10px_40px_rgba(245,158,11,0.1)]
            overflow-hidden
            p-6 sm:p-8 md:p-10
            mb-10 md:mb-14
          "
          style={{
            opacity: isHeroVisible ? 1 : 0,
            transform: isHeroVisible ? "translateY(0)" : "translateY(18px)",
            transition: "all 900ms ease",
          }}
        >
          {/* Minimal golden glow strip */}
          <div className="pointer-events-none absolute inset-x-0 -top-20 h-44 blur-3xl opacity-30 bg-gradient-to-r from-amber-500/10 via-amber-400/8 to-amber-500/10" />
          
          {/* Inner ring for consistency */}
          <div className="pointer-events-none absolute inset-0 rounded-[30px] ring-1 ring-amber-400/20" />

          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-10 items-center relative z-10">
            {/* LEFT: TEXT - Fully centered */}
            <div className="text-center">
              <h3
                className="mt-4 font-black tracking-tight text-white"
                style={{
                  fontSize: "clamp(1.7rem, 3.4vw, 2.8rem)",
                  lineHeight: 1.08,
                }}
              >
                We are{" "}
                <span className="text-amber-400 drop-shadow-[0_0_10px_rgba(245,158,11,0.25)]">
                  Not selling Website
                </span>
              </h3>

              <p
                className="mt-3 text-white/80 font-semibold max-w-3xl mx-auto"
                style={{ fontSize: "clamp(1.02rem, 1.55vw, 1.2rem)" }}
              >
                A simple, dedicated platform that helps NGOs raise funds directly
                with lifetime ownership and measurable impact.
              </p>

              <div className="mt-6 space-y-1">
                <p
                  className="font-extrabold tracking-tight text-white/95 mx-auto"
                  style={{
                    fontSize: "clamp(1.06rem, 1.9vw, 1.5rem)",
                    lineHeight: 1.3,
                  }}
                >
                  {mixText(lines[1])}
                </p>
                <p
                  className="font-extrabold tracking-tight text-white/95 mx-auto"
                  style={{
                    fontSize: "clamp(1.06rem, 1.9vw, 1.5rem)",
                    lineHeight: 1.3,
                  }}
                >
                  {mixText(lines[2])}
                </p>
                <p
                  className="font-extrabold tracking-tight text-white/95 mx-auto"
                  style={{
                    fontSize: "clamp(1.06rem, 1.9vw, 1.5rem)",
                    lineHeight: 1.3,
                  }}
                >
                  {mixText(lines[3])}
                </p>
              </div>
            </div>

            {/* RIGHT: IMAGE */}
            <div className="flex justify-center lg:justify-end">
              <div
                className="relative w-full max-w-[420px]"
                style={{
                  opacity: isHeroImgVisible ? 1 : 0,
                  transform: isHeroImgVisible ? "scale(1)" : "scale(0.94)",
                  transition: "all 900ms ease",
                }}
              >
                {/* Golden frame with reduced shadow */}
                <div 
                  className="relative rounded-[28px] border border-amber-500/25 bg-black/40 overflow-hidden shadow-[0_0_30px_rgba(245,158,11,0.15)] transition-all duration-500 ease-out group"
                  style={{
                    boxShadow: isImageHovered 
                      ? '0 0 40px rgba(245,158,11,0.2), 0 0 15px rgba(245,158,11,0.15) inset' 
                      : '0 0 30px rgba(245,158,11,0.15)',
                    borderColor: isImageHovered ? 'rgba(245,158,11,0.35)' : 'rgba(245,158,11,0.25)',
                    transform: isImageHovered ? 'scale(1.01)' : 'scale(1)',
                  }}
                  onMouseEnter={() => setIsImageHovered(true)}
                  onMouseLeave={() => setIsImageHovered(false)}
                >
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <img
                      src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/Ngo-Images/Ngo-Herosection3-img1.webp"
                      alt="NGO children"
                      className="w-full h-full object-cover transition-all duration-700 ease-out"
                      style={{
                        filter: isImageHovered 
                          ? 'brightness(1.05) contrast(1.02) saturate(1.05)' 
                          : 'brightness(1) contrast(1) saturate(1)',
                        transform: isImageHovered ? 'scale(1.02)' : 'scale(1)',
                      }}
                      loading="lazy"
                    />
                  </div>
                  <div 
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-all duration-500"
                    style={{
                      opacity: isImageHovered ? 0.4 : 0.5,
                    }}
                  />
                  {/* Minimal golden overlay on hover */}
                  <div 
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-amber-500/0 via-amber-500/0 to-amber-500/0 transition-all duration-700"
                    style={{
                      background: isImageHovered 
                        ? 'linear-gradient(to top, rgba(245,158,11,0.03) 0%, rgba(245,158,11,0.01) 20%, transparent 60%)' 
                        : 'linear-gradient(to top, transparent 0%, transparent 100%)',
                    }}
                  />
                </div>

                {/* Minimal golden floating accent with reduced blur */}
                <div 
                  className="pointer-events-none absolute -right-5 -top-5 h-20 w-20 rounded-full transition-all duration-700 ease-out"
                  style={{
                    backgroundColor: isImageHovered ? 'rgba(245,158,11,0.15)' : 'rgba(245,158,11,0.1)',
                    filter: isImageHovered ? 'blur(30px)' : 'blur(25px)',
                    opacity: isImageHovered ? 0.8 : 0.7,
                    transform: isImageHovered ? 'scale(1.1)' : 'scale(1)',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Bottom minimal golden glow */}
          <div className="pointer-events-none absolute inset-x-0 -bottom-24 h-52 blur-3xl opacity-30 bg-gradient-to-r from-amber-500/10 via-amber-400/12 to-amber-500/10" />
        </div>

        {/* STATS SECTION - With centralized content and golden border */}
        <div ref={statsRef} className="mt-10 md:mt-14">
          <div className="relative rounded-[28px] border border-amber-400/40 bg-black/60 backdrop-blur-sm p-4 sm:p-6 md:p-8 shadow-[0_0_30px_-10px_rgba(245,158,11,0.2)]">
            <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-amber-400/20" />

            {/* Stats grid with centered content */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-4 relative z-10">
              {stats.map((stat, index) => {
                const showSuffix = animationCompleted[index] || (isVisible && animatedStats[index] === stat.number);
                const isLargeNumber = stat.number > 10000;
                
                return (
                  <div
                    key={index}
                    className={`text-center group min-w-0 overflow-visible px-1 ${isLargeNumber ? 'stat-large-number' : ''}`}
                  >
                    <div
                      className="statValueWrap font-extrabold flex items-end justify-center whitespace-nowrap w-full min-h-[clamp(3rem,7vw,6rem)]"
                      style={{
                        opacity: showAny ? 1 : 0,
                        transform: showAny
                          ? "translateY(0) scale(1) translateX(0)"
                          : "translateY(50px) scale(0.8) translateX(-100px)",
                        filter: showAny ? "blur(0)" : "blur(15px)",
                        transition: "all 1s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      }}
                    >
                      <div className="inline-flex items-end justify-center leading-none">
                        <span className="statNumber">
                          {isVisible ? animatedStats[index] : 0}
                        </span>
                        {showSuffix && (
                          <span className="statSuffix text-amber-400">+</span>
                        )}
                      </div>
                    </div>

                    <div className="mt-1 sm:mt-1.5 text-[9px] sm:text-[10px] md:text-[11px] font-bold tracking-[0.15em] text-white/85 px-0.5">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* text swap */
        .swap span { transition: color 160ms ease; }
        .swap .white { color: rgba(255,255,255,0.95); }
        .swap .gold { color: rgba(245,158,11,0.95); }
        .swap:hover .white { color: rgba(245,158,11,0.95); }
        .swap:hover .gold { color: rgba(255,255,255,0.95); }

        /* STATS STYLES */
        .statValueWrap {
          width: 100%;
          overflow: visible;
          text-overflow: clip;
          padding: 0 2px;
          position: relative;
          display: flex !important;
          align-items: flex-end !important;
          justify-content: center !important;
        }

        .statValueWrap > div {
          display: inline-flex;
          align-items: flex-end;
          justify-content: center;
          line-height: 1;
          height: 100%;
        }

        .statNumber {
          color: #ffffff;
          display: inline-block;
          line-height: 0.9;
          font-size: clamp(2rem, 5.2vw, 4.5rem);
          filter: none;
          text-shadow: 0 0 10px rgba(245,158,11,0.2);
          overflow: visible;
          white-space: nowrap;
          font-weight: 900;
          letter-spacing: -0.02em;
          position: relative;
          min-width: 0;
          height: fit-content;
          align-self: flex-end;
        }

        .statSuffix {
          display: inline-block;
          line-height: 0.75;
          margin-left: 0.08em;
          font-size: clamp(2.3rem, 5.9vw, 5.1rem);
          font-weight: 900;
          overflow: visible;
          letter-spacing: -0.02em;
          position: relative;
          z-index: 1;
          color: rgba(245,158,11,1) !important;
          text-shadow: 0 0 10px rgba(245,158,11,0.4);
          transform: translateY(-0.06em);
          height: fit-content;
          align-self: flex-end;
        }

        /* Responsive adjustments */
        @media (min-width: 375px) {
          .statNumber { font-size: clamp(2.1rem, 5.4vw, 4.7rem); line-height: 0.9; }
          .statSuffix { font-size: clamp(2.4rem, 6.1vw, 5.3rem); line-height: 0.75; }
        }

        @media (min-width: 480px) {
          .statNumber { font-size: clamp(2.2rem, 5.6vw, 4.9rem); line-height: 0.9; }
          .statSuffix { font-size: clamp(2.5rem, 6.3vw, 5.5rem); line-height: 0.75; }
        }

        @media (min-width: 640px) {
          .statNumber { font-size: clamp(2.3rem, 5.8vw, 5.1rem); line-height: 0.9; }
          .statSuffix { font-size: clamp(2.6rem, 6.5vw, 5.7rem); line-height: 0.75; }
          .statValueWrap { min-height: clamp(2.8rem, 6vw, 5.5rem) !important; }
        }

        @media (min-width: 768px){
          .statNumber{ font-size: clamp(2rem, 3.6vw, 4.6rem); line-height: 0.85; }
          .statSuffix{ font-size: clamp(2.3rem, 4vw, 5rem); line-height: 0.7; }
          .statValueWrap { min-height: clamp(2.5rem, 4.5vw, 5rem) !important; }
          
          .stat-large-number .statNumber { font-size: clamp(1.7rem, 3vw, 4rem) !important; }
          .stat-large-number .statSuffix { font-size: clamp(2rem, 3.4vw, 4.4rem) !important; }
        }

        @media (min-width: 1024px){
          .statNumber{ font-size: clamp(2.1rem, 3.7vw, 4.8rem); line-height: 0.85; }
          .statSuffix{ font-size: clamp(2.4rem, 4.1vw, 5.2rem); line-height: 0.7; }
          .statValueWrap { min-height: clamp(2.6rem, 4.6vw, 5.2rem) !important; }
          
          .stat-large-number .statNumber { font-size: clamp(1.8rem, 3.1vw, 4.2rem) !important; }
          .stat-large-number .statSuffix { font-size: clamp(2.1rem, 3.5vw, 4.6rem) !important; }
        }

        @media (min-width: 1280px){
          .statNumber{ font-size: clamp(2.2rem, 3.8vw, 5rem); line-height: 0.85; }
          .statSuffix{ font-size: clamp(2.5rem, 4.2vw, 5.4rem); line-height: 0.7; }
          .statValueWrap { min-height: clamp(2.7rem, 4.7vw, 5.4rem) !important; }
          
          .stat-large-number .statNumber { font-size: clamp(1.9rem, 3.2vw, 4.4rem) !important; }
          .stat-large-number .statSuffix { font-size: clamp(2.2rem, 3.6vw, 4.8rem) !important; }
        }

        @media (max-width: 374px) {
          .statNumber { font-size: clamp(1.8rem, 4.8vw, 4.3rem); line-height: 0.9; }
          .statSuffix { font-size: clamp(2.1rem, 5.4vw, 4.8rem); line-height: 0.75; }
          .statValueWrap { min-height: clamp(2.5rem, 6vw, 5.5rem) !important; }
        }
      `}</style>
    </section>
  );
};

export default StatsSection;