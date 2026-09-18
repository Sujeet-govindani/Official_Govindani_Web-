import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

const strips = [
  {
    quotes: [
      "This platform helped us raise  ₹10,000 in just 2 months it literally saved lives.",
      "Recurring donations brought stable support without spending on marketing.",
    ],
    direction: "ltr", // All moving same direction: right to left
    link: "/impact#recurring-donations",
  },
  {
    quotes: [
      "Because of this platform, we secured education for children who had dropped out.",
      "Multiple payment gateways helped donors contribute from different countries easily.",
    ],
    direction: "ltr", // Changed to same direction
    link: "/impact#global-payments",
  },
  {
    quotes: [
      "We were able to support labour kids and their families consistently.",
      "The simplicity of this platform allowed us to focus on impact, not tech.",
    ],
    direction: "ltr", // All moving same direction: right to left
    link: "/impact#ngo-stories",
  },
];

const HomeMarqueeStrips = () => {
  const navigate = useNavigate();
  const trackRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    trackRefs.current.forEach((track, index) => {
      if (!track) return;

      // All strips now use the same direction (-1 for left movement)
      const direction = -1; // Force same direction for all strips

      // 🔑 CRITICAL FIX: divide by 3 because we render quotes × 3
      const travelDistance = track.scrollWidth / 3;

      gsap.fromTo(
        track,
        { x: 0 },
        {
          x: direction * travelDistance,
          duration: 60,
          ease: "none",
          repeat: -1,
        }
      );
    });
  }, []);

  return (
    <section
    
    id="home-marquee"
      className="
      
        relative w-full overflow-hidden
        bg-[#050505]
        space-y-3
        py-8
        px-6 md:px-10
      "
    >
      {/* 🌟 Soft NGO Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/4 w-[500px] h-[500px] bg-[#ffd76a]/10 blur-[160px]" />
        <div className="absolute -bottom-24 right-1/4 w-[500px] h-[500px] bg-[#ffd76a]/5 blur-[180px]" />
      </div>

      {strips.map((strip, index) => (
        <div
          key={index}
          onClick={() => navigate(strip.link)}
          className="
            group relative cursor-pointer overflow-hidden
            border border-white/10
            rounded-xl
            h-14 md:h-16
            flex items-center
            bg-black/50 backdrop-blur-md
            hover:bg-black/70
            transition-colors
          "
        >
          {/* ✨ Gold Sweep */}
          <span
            className="
              pointer-events-none absolute inset-0
              bg-gradient-to-r from-transparent via-[#ffd76a]/25 to-transparent
              opacity-0 group-hover:opacity-100
              animate-gold-sweep
            "
          />

          {/* 🔁 MOVING TRACK NO BLANK EVER */}
          <div
            ref={(el) => {
              if (el) trackRefs.current[index] = el;
            }}
            className="relative z-10 flex whitespace-nowrap gap-16"
            style={{ fontFamily: "Libre Baskerville, serif" }}
          >
            {[
              ...strip.quotes,
              ...strip.quotes,
              ...strip.quotes,
            ].map((quote, i) => (
              <span
                key={i}
                className="
                  text-sm md:text-lg
                  font-medium
                  text-white/90
                  group-hover:text-[#ffd76a]
                  transition-colors
                "
              >
                “{quote}”
              </span>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default HomeMarqueeStrips;