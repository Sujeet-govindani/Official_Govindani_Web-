import React, { useMemo } from "react";
import { Headphones, CheckCircle } from "lucide-react";

const BonusPhase = () => {
  const bonusPhase = {
    icon: Headphones,
    title: "Bonus: 30-Day Maintenance & Support",
    description:
      "We stay with you even after launch to ensure everything runs smoothly and make any necessary adjustments.",
    color: "from-amber-500 to-amber-600",
    features: [
      "24/7 priority support",
      "Bug fixes & minor adjustments",
      "Performance monitoring",
      "Security updates",
      "One round of content updates",
      "Analytics review & recommendations",
    ],
    note: "Our team is available for any questions or modifications during this period. Think of us as your extended development team!",
  };

  return (
    <div 
      className="w-full pt-0 pb-0 md:pt-16 md:pb-0 relative overflow-hidden bg-black"
    >
      {/* Simple black background with subtle golden glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-[520px] h-[520px] rounded-full blur-[140px]"
          style={{ background: "rgba(217,119,6,0.04)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[620px] h-[620px] rounded-full blur-[160px]"
          style={{ background: "rgba(251,191,36,0.03)" }}
        />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      <style>{`
        /* Golden text style */
        .golden-text {
          background: linear-gradient(135deg, #d4af37, #f4e5b8, #c9a961);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          display: inline-block;
          font-weight: 700;
          filter: drop-shadow(0 2px 8px rgba(212, 175, 55, 0.3));
        }
        
        /* Gradient animation for heading */
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-gradient-x { 
          animation: gradient-x 3s ease-in-out infinite; 
          background-size: 200% 100%;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-gradient-x {
            animation: none !important;
          }
        }
      `}</style>

      <div className="container mx-auto px-4 relative z-10">
        {/* Single Line Heading with Subheading - WITH GRADIENT ANIMATION */}
        <div className="text-center mb-6 md:mb-10">
          <h1 className="font-bold text-3xl md:text-3xl lg:text-3xl leading-tight">
            <span className="text-white">Beyond Launch: </span>
            <span className="bg-gradient-to-r from-[#d4af37] via-[#f4e5b8] to-[#d4af37] bg-clip-text text-transparent animate-gradient-x">
              Continued Support & Maintenance
            </span>
          </h1>
          <p className="text-amber-100/70 mt-3 md:mt-4 max-w-2xl mx-auto text-sm md:text-base">
            Our commitment doesn't end at launch. We ensure your solution thrives with dedicated post-launch care.
          </p>
        </div>

        {/* Bonus Card - Centered with reduced top margin */}
        <div className="flex justify-center mt-4">
          <div className="max-w-4xl w-full">
            <div className="bonus-card relative group">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-500/10 via-amber-600/10 to-amber-500/10 blur-xl group-hover:blur-2xl transition-all duration-500"></div>

              <div className="relative bg-gradient-to-br from-slate-900/70 to-slate-800/40 backdrop-blur-xl rounded-3xl p-8 pb-4 md:p-12 md:pb-8 border-2 border-amber-500/30 group-hover:border-amber-500/50 transition-all duration-300">
                <div className="absolute -top-4 right-8 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg">
                  BONUS INCLUDED
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 p-5">
                    <bonusPhase.icon className="w-full h-full text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
                      {bonusPhase.title}
                    </h1>
                    <p className="text-amber-100/80">{bonusPhase.description}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {bonusPhase.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                      <span className="text-amber-100/80">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                  <p className="text-amber-300/90 italic">{bonusPhase.note}</p>
                </div>

                <div className="mt-4 pt-4 md:mt-8 md:pt-8 border-t border-amber-500/20">
                  <div className="flex items-center justify-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      <span className="text-amber-100/70 text-sm">Launch Day</span>
                    </div>
                    <div className="flex-1 h-0.5 bg-gradient-to-r from-amber-500/50 to-amber-500"></div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      <span className="text-amber-100/70 text-sm">Day 30</span>
                    </div>
                  </div>
                  <p className="text-center text-amber-400 text-sm mt-2">
                    30 days of dedicated support included with every project
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BonusPhase;