import { useEffect, useMemo, useRef, useState } from "react";

const StatsSection2 = () => {
  const statsRef = useRef<HTMLDivElement>(null);

  const [mainCounter, setMainCounter] = useState(1);
  const [bottomCounter, setBottomCounter] = useState(1);

  const animateCount = (
    start: number,
    end: number,
    duration: number,
    setValue: (val: number) => void
  ) => {
    const startTime = performance.now();
    const update = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(easeProgress * (end - start) + start);
      setValue(value);
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  };

  // Trigger counters
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animateCount(1, 12000, 3500, setMainCounter);
          animateCount(1, 12000, 3500, setBottomCounter);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const digitImages = {
    pos0: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1800&q=80",
    pos1A: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1800&q=80",
    pos1B: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1800&q=80",
    pos2: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1800&q=80",
    pos3: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1800&q=80",
    pos4: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=1800&q=80",
    plus: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1800&q=80",
  };

  const counterStr = String(mainCounter).padStart(5, "0");
  const digits = counterStr.split("");

  const shouldHideLeading = (idx: number) => {
    for (let i = 0; i < idx; i++) {
      if (digits[i] !== "0") return false;
    }
    return digits[idx] === "0" && idx < digits.length - 1;
  };

  return (
    <section
      id="ngo-stats"
      ref={statsRef}
      className="relative w-full overflow-hidden min-h-auto sm:min-h-screen py-10 sm:py-8 flex items-center justify-center"
      style={{
        scrollMarginTop: "84px",
        background: "#000",
      }}
    >
      {/* Static black background no animations, no bubbles, no stars */}
      <div className="absolute inset-0 z-0 pointer-events-none">

        {/* Soft static amber glow no animation */}
        <div
          className="absolute top-1/4 left-1/4 w-[420px] h-[420px] rounded-full blur-[160px]"
          style={{ background: "rgba(217,119,6,0.06)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[380px] h-[380px] rounded-full blur-[150px]"
          style={{ background: "rgba(251,191,36,0.04)" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full px-5 sm:px-10 lg:px-14 max-w-7xl mx-auto pb-0">
        {/* Heading */}
        <div className="pt-0 sm:pt-4 md:pt-6">
          <h3 className="text-white/90 font-bold tracking-wide text-left leading-tight desktop-heading mobile-heading">
            We served <span className="ngoCyan">NGO</span> more than
          </h3>
        </div>

        {/* Number */}
        <div className="w-full flex items-center justify-center pt-0 sm:pt-1">
          <div className="relative w-full">
            {/* WHITE GLOW LAYER */}
            <div className="absolute inset-0 flex items-center justify-center z-0">
              <div className="bigDigitsWrap whiteGlowLayer" aria-hidden="true">
                {digits.map((digit, idx) => (
                  <span
                    key={idx}
                    className={`whiteGlowDigit ${shouldHideLeading(idx) ? "leadingHide" : ""}`}
                  >
                    {digit}
                  </span>
                ))}
                <span className="whiteGlowDigit whiteGlowPlus">+</span>
              </div>
            </div>

            {/* Main Numbers */}
            <div className="bigDigitsWrap select-none relative z-10" aria-label={`${mainCounter}+`}>
              <span
                className={`digitFill ${shouldHideLeading(0) ? "leadingHide" : ""}`}
                style={{ backgroundImage: `url(${digitImages.pos0})` }}
              >
                {digits[0]}
              </span>
              <span
                className={`digitFill digitTwoLayer ${shouldHideLeading(1) ? "leadingHide" : ""}`}
                style={{ backgroundImage: `url(${digitImages.pos1A}), url(${digitImages.pos1B})` }}
              >
                {digits[1]}
              </span>
              <span
                className={`digitFill ${shouldHideLeading(2) ? "leadingHide" : ""}`}
                style={{ backgroundImage: `url(${digitImages.pos2})` }}
              >
                {digits[2]}
              </span>
              <span
                className={`digitFill ${shouldHideLeading(3) ? "leadingHide" : ""}`}
                style={{ backgroundImage: `url(${digitImages.pos3})` }}
              >
                {digits[3]}
              </span>
              <span
                className={`digitFill ${shouldHideLeading(4) ? "leadingHide" : ""}`}
                style={{ backgroundImage: `url(${digitImages.pos4})` }}
              >
                {digits[4]}
              </span>
              <span
                className="digitFill diamondPlus"
                style={{ backgroundImage: `url(${digitImages.plus})` }}
                aria-label="plus"
              >
                +
              </span>
            </div>

            {/* Subtle background glow behind number amber only, no purple */}
            <div className="absolute inset-0 blur-3xl bg-gradient-to-br from-amber-500/10 via-yellow-500/8 to-amber-400/10 -z-10" />
          </div>
        </div>

        {/* Bottom heading */}
        <div className="w-full flex justify-end pt-0 sm:pt-1 pb-0">
          <div className="relative group inline-block text-right">
            <h3 className="text-white/90 font-bold tracking-wide text-left leading-tight desktop-heading mobile-heading">
              Empowering <span className="ngoCyan"> Lives</span> Worldwide
            </h3>
          </div>
        </div>
      </div>

      <style>{`
        .desktop-heading {
          font-size: clamp(22px, 3.2vw, 40px);
        }

        .bigDigitsWrap {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          gap: clamp(8px, 1.2vw, 22px);
          line-height: 1;
          flex-wrap: nowrap;
          position: relative;
        }

        .whiteGlowLayer {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          gap: clamp(8px, 1.2vw, 22px);
          line-height: 1;
          flex-wrap: nowrap;
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .whiteGlowDigit {
          font-size: clamp(150px, 23vw, 500px);
          letter-spacing: -0.07em;
          font-weight: 900;
          display: inline-block;
          color: transparent;
          -webkit-text-fill-color: transparent;
          -webkit-text-stroke: 4px rgba(255, 255, 255, 0.25);
          text-shadow:
            0 0 20px rgba(255, 255, 255, 0.7),
            0 0 20px rgba(255, 255, 255, 0.5),
            0 0 20px rgba(255, 255, 255, 0.3),
            0 0 20px rgba(255, 255, 255, 0.1);
          filter: blur(3px);
          opacity: 0.9;
        }

        .whiteGlowPlus {
          margin-left: clamp(6px, 0.8vw, 14px);
          transform: translateY(clamp(-10px, -0.8vw, -22px));
          -webkit-text-stroke: 4px rgba(255, 255, 255, 0.35);
          text-shadow:
            0 0 20px rgba(255, 255, 255, 0.9),
            0 0 20px rgba(255, 255, 255, 0.7),
            0 0 20px rgba(255, 255, 255, 0.5),
            0 0 20px rgba(255, 255, 255, 0.3);
          filter: blur(4px);
          opacity: 1;
        }

        .digitFill {
          font-size: clamp(150px, 23vw, 500px);
          letter-spacing: -0.07em;
          font-weight: 900;
          display: inline-block;
          position: relative;
          background-repeat: no-repeat;
          background-size: auto 110% !important;
          background-position: center center !important;
          background-origin: border-box;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          -webkit-text-stroke: 2.5px rgba(255,255,255,0.2);
          filter:
            drop-shadow(0 2px 8px rgba(251, 191, 36, 0.2))
            drop-shadow(0 1px 8px rgba(217, 119, 6, 0.15))
            contrast(1.2)
            saturate(1.3)
            brightness(1.15);
          padding: 0 0.02em;
        }

        .leadingHide {
          opacity: 0;
          -webkit-text-stroke: 0px transparent;
          filter: none;
        }

        .digitTwoLayer {
          background-size: auto 110%, auto 110% !important;
          background-position: center center, center center !important;
          background-origin: border-box, border-box;
          background-blend-mode: overlay, normal;
        }

        .diamondPlus {
          margin-left: clamp(6px, 0.8vw, 14px);
          transform: translateY(clamp(-10px, -0.8vw, -22px));
          background-size: auto 110% !important;
          background-position: center center !important;
          background-origin: border-box;
          -webkit-text-stroke: 3px rgba(255, 255, 255, 0.4);
          filter:
            brightness(1.4)
            contrast(1.3)
            drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))
            drop-shadow(0 0 8px rgba(251, 191, 36, 0.5))
            saturate(1.6);
          animation: diamondGlow 3s ease-in-out infinite alternate;
        }

        .ngoCyan {
          color: #f59e0b;
          font-weight: 900;
          text-shadow: 0 0 12px rgba(251, 191, 36, 0.6), 0 0 34px rgba(251, 191, 36, 0.3);
        }

        @keyframes diamondGlow {
          0% {
            filter:
              brightness(1.3)
              contrast(1.2)
              drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))
              drop-shadow(0 0 8px rgba(251, 191, 36, 0.4))
              saturate(1.4);
          }
          100% {
            filter:
              brightness(1.5)
              contrast(1.4)
              drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))
              drop-shadow(0 0 8px rgba(251, 191, 36, 0.5))
              saturate(1.7);
          }
        }

        /* Mobile */
        @media (max-width: 768px) {
          .mobile-heading {
            font-size: clamp(18px, 2.5vw, 28px) !important;
          }
          .whiteGlowDigit {
            font-size: clamp(80px, 18vw, 160px) !important;
            letter-spacing: -0.05em;
            -webkit-text-stroke: 2px rgba(255, 255, 255, 0.2) !important;
            text-shadow:
              0 0 15px rgba(255, 255, 255, 0.6),
              0 0 30px rgba(255, 255, 255, 0.4),
              0 0 45px rgba(255, 255, 255, 0.2) !important;
            filter: blur(2px) !important;
            opacity: 0.85 !important;
          }
          .whiteGlowPlus {
            font-size: clamp(80px, 18vw, 160px) !important;
            margin-left: clamp(4px, 1vw, 10px) !important;
            transform: translateY(clamp(-6px, -1vw, -12px)) !important;
            -webkit-text-stroke: 2px rgba(255, 255, 255, 0.25) !important;
            text-shadow:
              0 0 20px rgba(255, 255, 255, 0.7),
              0 0 40px rgba(255, 255, 255, 0.5),
              0 0 60px rgba(255, 255, 255, 0.3) !important;
            filter: blur(2.5px) !important;
            opacity: 0.9 !important;
          }
          .digitFill {
            font-size: clamp(80px, 18vw, 160px) !important;
            letter-spacing: -0.05em;
            -webkit-text-stroke: 2px rgba(255,255,255,0.2);
            background-size: auto 110% !important;
            background-position: center center !important;
            background-origin: border-box;
            filter:
              drop-shadow(0 2px 8px rgba(251, 191, 36, 0.2))
              drop-shadow(0 1px 8px rgba(217, 119, 6, 0.15))
              contrast(1.2)
              saturate(1.3)
              brightness(1.15);
          }
          .digitTwoLayer {
            background-size: auto 110%, auto 110% !important;
            background-position: center center, center center !important;
            background-origin: border-box, border-box;
          }
          .diamondPlus {
            margin-left: clamp(4px, 1vw, 10px);
            transform: translateY(clamp(-6px, -1vw, -12px));
            background-size: auto 110% !important;
            background-position: center center !important;
            background-origin: border-box;
          }
        }

        @media (max-width: 560px) {
          .mobile-heading { font-size: clamp(16px, 2.2vw, 24px) !important; }
          .whiteGlowDigit, .digitFill { font-size: clamp(70px, 16vw, 140px) !important; }
          .whiteGlowPlus { font-size: clamp(70px, 16vw, 140px) !important; }
        }

        @media (max-width: 380px) {
          .mobile-heading { font-size: clamp(14px, 2vw, 20px) !important; }
          .whiteGlowDigit, .digitFill { font-size: clamp(60px, 15vw, 120px) !important; }
          .whiteGlowPlus { font-size: clamp(60px, 15vw, 120px) !important; }
        }
      `}</style>
    </section>
  );
};

export default StatsSection2;