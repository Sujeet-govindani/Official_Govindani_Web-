"use client";

import { useState } from "react";
import { CaseStudy } from "@/data/caseStudies";
import CaseStudyCard from "./Case-studyCard";
import FadeIn from "./FadeIn";
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Extra grid studies data ───────────────────────────────────────────────────
const gridStudies = [
  {
    id: "g1",
    client: "Varun Malik",
    company: "CI Builder, Bhopal",
    category: "Construction",
    tagline: "Building trust, one project at a time.",
    challenge:
      "CI Builder needed a strong digital identity to stand out in Bhopal's competitive construction market and convert visitors into leads.",
    delivered:
      "A bold, conversion-first website with project galleries, client testimonials, and a streamlined inquiry flow.",
    impact:
      "40% increase in qualified inquiries within the first 60 days of launch.",
    stats: ["40% More Leads", "60-Day Results", "Full Rebrand"],
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
  },
  {
    id: "g2",
    client: "GreenRoots Foundation",
    company: "Environmental NGO, Delhi",
    category: "Nonprofit",
    tagline: "Turning grassroots passion into global impact.",
    challenge:
      "A scattered online presence was diluting donor trust and volunteer sign-ups for this growing environmental nonprofit.",
    delivered:
      "A unified donor journey with storytelling-first landing pages and an integrated volunteer portal.",
    impact:
      "Donor retention improved by 55% and volunteer sign-ups tripled post-launch.",
    stats: ["55% Donor Retention", "3× Volunteers", "Unified Platform"],
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
  },
  {
    id: "g3",
    client: "Aasha Trust",
    company: "Community Foundation, Mumbai",
    category: "Foundation",
    tagline: "Hope, engineered into every pixel.",
    challenge:
      "Aasha Trust struggled to communicate the breadth of their community programmes to potential corporate donors.",
    delivered:
      "An impact-dashboard-style website with real-time stats, programme showcases, and a polished CSR pitch deck page.",
    impact:
      "Secured three new corporate partnerships worth ₹45L within the first quarter after launch.",
    stats: ["₹45L Raised", "3 New Partners", "Q1 Results"],
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80",
  },
  {
    id: "g4",
    client: "EduBridge Society",
    company: "Education Trust, Pune",
    category: "Education",
    tagline: "Bridging the gap between learning and opportunity.",
    challenge:
      "Parents and students couldn't quickly understand the programmes on offer, leading to high bounce rates and lost admissions.",
    delivered:
      "A restructured programme catalogue with clear learning pathways, video testimonials, and a frictionless application flow.",
    impact:
      "Application conversions rose by 70% and average session time doubled.",
    stats: ["70% More Applications", "2× Session Time", "Full UX Overhaul"],
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
  },
];

// ─── Grid Card Component ───────────────────────────────────────────────────────
const GridCard = ({
  gs,
  gi,
}: {
  gs: (typeof gridStudies)[0];
  gi: number;
}) => (
  <motion.article
    key={gs.id}
    className="relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-[0_4px_32px_rgba(0,0,0,0.28)] overflow-hidden flex flex-col sm:flex-row"
    initial={{ opacity: 0, y: 32 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.6,
      delay: gi * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94],
    }}
  >
    {/* Image left half */}
    <div className="relative w-full sm:w-[42%] h-52 sm:h-auto overflow-hidden bg-gray-900 shrink-0">
      <img
        src={gs.image}
        alt={gs.client}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-black/50 pointer-events-none" />

      {/* Category badge */}
      <span className="absolute top-3 left-3 z-10 inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-[0.18em] bg-black/70 backdrop-blur-md text-primary border border-primary/30">
        {gs.category}
      </span>

      {/* Ghost number */}
      <span className="absolute bottom-1 right-3 text-[4rem] font-black text-white/[0.05] leading-none select-none pointer-events-none">
        {String(gi + 1).padStart(2, "0")}
      </span>
    </div>

    {/* Content right half */}
    <div className="flex-1 flex flex-col justify-center p-5 md:p-6 space-y-3">
      <div>
        <h3 className="text-lg md:text-xl font-extrabold leading-tight text-white">
          {gs.client}
        </h3>
        <p className="text-xs text-white/50 mt-0.5">{gs.company}</p>
      </div>

      <p className="text-sm text-primary font-medium border-l-2 border-primary/40 pl-3 leading-relaxed">
        {gs.tagline}
      </p>

      <div className="space-y-2">
        {[
          { label: "Challenge", text: gs.challenge },
          { label: "Delivered", text: gs.delivered },
          { label: "Impact", text: gs.impact },
        ].map(({ label, text }) => (
          <div key={label}>
            <h4 className="text-[9px] font-black uppercase tracking-[0.18em] text-primary mb-0.5">
              {label}
            </h4>
            <p className="text-xs md:text-sm leading-relaxed text-white/75 line-clamp-2">
              {text}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-1.5 pt-1">
        {gs.stats.map((s, si) => (
          <span
            key={si}
            className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold bg-primary/10 text-primary border border-primary/20"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  </motion.article>
);

// ─── Main Wrapper ──────────────────────────────────────────────────────────────
interface CaseStudiesSectionProps {
  studies: CaseStudy[];
}

const CaseStudiesSection = ({ studies }: CaseStudiesSectionProps) => {
  const [showGrid, setShowGrid] = useState(false);

  return (
    <section id="case-studies" className="w-full">
      {/* All vertical case study cards */}
      {studies.map((study, index) => (
        <CaseStudyCard key={study.id ?? index} study={study} index={index} />
      ))}

      {/* ── View More button centered, cream bg, brown text ── */}
      <div className="flex justify-center py-10 px-4">
        <motion.button
          onClick={() => {
            setShowGrid((v) => !v);
          }}
          className="inline-flex items-center gap-2.5 px-9 py-4 rounded-xl font-semibold text-base tracking-wide transition-all hover:scale-105 active:scale-100"
          style={{
            backgroundColor: "#fdf6ec",
            color: "#6b3a1f",
            border: "1.5px solid #c9975a",
            boxShadow: "0 2px 16px rgba(180,120,50,0.13)",
          }}
          whileTap={{ scale: 0.97 }}
        >
          {showGrid ? (
            <>
              Show Less <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              View More <ChevronDown className="h-4 w-4" />
            </>
          )}
        </motion.button>
      </div>

      {/* ── Expandable 2×2 grid opens right below the button ── */}
      <AnimatePresence>
        {showGrid && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="mx-auto w-full max-w-[1400px] px-4 md:px-6 pb-16">
              <FadeIn>
                <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-8">
                  More Case Studies
                </p>
              </FadeIn>
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
                {gridStudies.map((gs, gi) => (
                  <GridCard key={gs.id} gs={gs} gi={gi} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CaseStudiesSection;