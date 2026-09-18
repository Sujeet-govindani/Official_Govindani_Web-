import React, {
  useLayoutEffect,
  useRef,
  type ReactNode,
} from "react";
import { gsap } from "gsap";

interface HeroGsapCardProps {
  children: ReactNode;
}

const HeroGsapCard: React.FC<HeroGsapCardProps> = ({ children }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      // Text stagger entrance animation only no card movement
      const items = gsap.utils.toArray<HTMLElement>(".hero-animate");
      gsap.from(items, {
        y: 20,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.25,
      });
    }, cardRef);

    return () => { ctx.revert(); };
  }, []);

  return (
    <div ref={cardRef} className="relative w-full max-w-5xl mx-auto">
      {/*
        OUTER CARD
        Desktop: static 3D perspective tilt (rotateX + rotateY) via CSS,
          no JS animation, no fluctuation
        Mobile: flat, no transform at all (media query resets it)
      */}
      <div
        className="hero-card-outer relative p-[2px] overflow-visible hero-card-3d"
        style={{
          borderRadius: "40px",
          backgroundImage:
            "linear-gradient(135deg, rgba(251,191,36,0.6), rgba(255,255,255,0.10), rgba(251,191,36,0.3))",
          boxShadow:
            "0 0 24px rgba(251,191,36,0.20), 0 0 60px rgba(251,191,36,0.08)",
          transform: "skewX(-10deg)",
        }}
      >
        {/* INNER FROSTED SURFACE */}
        <div
          className="relative overflow-hidden backdrop-blur-2xl border border-white/8"
          style={{
            borderRadius: "38px",
            background:
              "radial-gradient(circle at top, rgba(10,10,10,0.95), rgba(5,5,5,0.88))",
            transform: "skewX(10deg)",
          }}
        >
          {/* Golden top-edge shimmer */}
          <div
            className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(251,191,36,0.45), rgba(255,255,255,0.25), rgba(251,191,36,0.45), transparent)",
            }}
          />

          {/* Faint golden corner accents */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div
              className="absolute top-0 left-0 w-32 h-32 rounded-full blur-[60px] opacity-10"
              style={{ background: "rgba(251,191,36,1)" }}
            />
            <div
              className="absolute bottom-0 right-0 w-32 h-32 rounded-full blur-[60px] opacity-[0.08]"
              style={{ background: "rgba(251,191,36,1)" }}
            />
          </div>

          {/* CONTENT */}
          <div className="relative z-10 px-6 py-6 md:px-12 md:py-14">
            {children}
          </div>
        </div>
      </div>

      <style>{`
        /* Desktop only static 3D tilt, no animation */
        @media (min-width: 1024px) {
          .hero-card-3d {
            transform: perspective(1200px) rotateX(4deg) rotateY(-2deg);
            transform-style: preserve-3d;
            transition: transform 0.4s ease;
          }
          /* Hover slightly eases the tilt no movement at all */
          .hero-card-3d:hover {
            transform: perspective(1200px) rotateX(2deg) rotateY(-1deg);
          }
        }

        /* Mobile & tablet completely flat */
        @media (max-width: 1023px) {
          .hero-card-3d {
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroGsapCard;