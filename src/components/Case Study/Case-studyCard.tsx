import { CaseStudy } from "@/data/caseStudies";
import { Link } from "react-router-dom";
import FadeIn from "./FadeIn";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  study: CaseStudy;
  index: number;
}

const CaseStudyCard = ({ study, index }: Props) => {
  const isReversed = index % 2 === 1;

  return (
    <article className="border-t border-border/30 bg-background py-12 md:py-16 px-4 md:px-8">

      {/* ═══════════════════════════════════════════════════
          GLASSY CONTAINER WRAPPER wraps both mobile & desktop
      ═══════════════════════════════════════════════════ */}
      <motion.div
        className="relative mx-auto max-w-6xl rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-[0_8px_48px_rgba(0,0,0,0.35)] overflow-hidden"
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Subtle inner glow on top edge */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        {/* Subtle inner glow on bottom edge */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* ═══════════════════════════════════════════════════
            MOBILE LAYOUT  (hidden on lg+)
        ═══════════════════════════════════════════════════ */}
        <div className="lg:hidden">

          {/* Image box */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "min(52vw, 360px)",
              minHeight: "200px",
              overflow: "hidden",
              display: "block",
            }}
          >
            <img
              src={study.image}
              alt={study.client}
              loading="lazy"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                display: "block",
              }}
            />

            {/* Bottom fade */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to bottom, transparent 55%, rgba(0,0,0,0.5) 100%)",
                pointerEvents: "none",
              }}
            />

            {/* Category badge */}
            <span
              style={{
                position: "absolute",
                top: 14,
                left: 14,
                zIndex: 10,
              }}
              className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] bg-black/70 backdrop-blur-md text-primary border border-primary/30 shadow-sm"
            >
              {study.category}
            </span>

            {/* Ghost number */}
            <span
              style={{
                position: "absolute",
                bottom: 0,
                right: 12,
                fontSize: "6rem",
                fontWeight: 900,
                color: "rgba(255,255,255,0.04)",
                lineHeight: 1,
                userSelect: "none",
                pointerEvents: "none",
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Content */}
          <div className="px-6 py-8 space-y-6">

            <h3 className="text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight text-white">
              {study.client}
            </h3>

            <p className="text-lg sm:text-xl text-primary font-medium leading-relaxed border-l-[3px] border-primary/40 pl-4">
              {study.tagline}
            </p>

            <div className="space-y-5">
              {[
                { label: "The Challenge", text: study.challenge },
                { label: "What We Delivered", text: study.delivered },
                { label: "The Impact", text: study.impact },
              ].map(({ label, text }) => (
                <div key={label}>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2">
                    {label}
                  </h4>
                  <p className="text-base sm:text-[1.05rem] leading-relaxed text-white/80 line-clamp-3">
                    {text}
                  </p>
                </div>
              ))}
            </div>

            <ul className="space-y-2">
              {study.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3 text-base sm:text-[1.05rem] text-white/85">
                  <span className="mt-[9px] block h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {h}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {study.stats.map((s, i) => (
                <span
                  key={i}
                  className="inline-flex items-center px-3.5 py-1.5 rounded-full text-sm font-semibold bg-primary/10 text-primary border border-primary/20"
                >
                  {s}
                </span>
              ))}
            </div>

            <Link
              to={`/pages/case-study/${study.id}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-primary/50 text-primary font-semibold text-base hover:bg-primary/10 transition mr-3"
            >
              Read Case Study <ArrowUpRight className="h-4 w-4" />
            </Link>

            <a
              href={study.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-base hover:opacity-90 transition-opacity"
            >
              View Project <ArrowUpRight className="h-4 w-4" />
            </a>

          </div>
        </div>

        {/* ═══════════════════════════════════════════════════
            DESKTOP LAYOUT  (hidden below lg)
        ═══════════════════════════════════════════════════ */}
        <div
          className={`hidden lg:flex min-h-[60vh] ${
            isReversed ? "flex-row-reverse" : "flex-row"
          }`}
        >
          {/* Image half slightly reduced width */}
          <motion.div
            className="relative overflow-hidden flex-shrink-0 w-[60%]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.img
              src={study.image}
              alt={study.client}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-center"
              whileHover={{ scale: 1.035 }}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
            <div
              className={`absolute inset-0 pointer-events-none ${
                isReversed
                  ? "bg-gradient-to-l from-background/85 via-background/20 to-transparent"
                  : "bg-gradient-to-r from-transparent via-background/20 to-background/85"
              }`}
            />
            <motion.span
              className="absolute top-5 left-5 z-10 inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] bg-background/80 backdrop-blur-md text-primary border border-primary/25 shadow-sm"
              initial={{ opacity: 0, y: -8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {study.category}
            </motion.span>
            <span className="absolute bottom-5 right-6 text-[14rem] font-black text-white/[0.04] leading-none select-none pointer-events-none">
              {String(index + 1).padStart(2, "0")}
            </span>
          </motion.div>

          {/* Content half */}
          <div className="flex-1 flex items-center bg-transparent">
            <div className="w-full px-10 xl:px-12 py-14 space-y-6">

              <FadeIn>
                <h3 className="text-[2.6rem] xl:text-5xl font-extrabold leading-[1.1] tracking-tight text-white">
                  {study.client}
                </h3>
              </FadeIn>

              <FadeIn delay={0.05}>
                <p className="text-xl md:text-2xl text-primary font-medium leading-relaxed border-l-[3px] border-primary/40 pl-4">
                  {study.tagline}
                </p>
              </FadeIn>

              <FadeIn delay={0.1}>
                <div className="space-y-5">
                  {[
                    { label: "The Challenge", text: study.challenge },
                    { label: "What We Delivered", text: study.delivered },
                    { label: "The Impact", text: study.impact },
                  ].map(({ label, text }) => (
                    <div key={label}>
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2">
                        {label}
                      </h4>
                      <p className="text-[1.05rem] md:text-lg leading-relaxed text-white/80 line-clamp-3">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </FadeIn>

              <FadeIn delay={0.15}>
                <ul className="space-y-2">
                  {study.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 text-[1.05rem] md:text-lg text-white/85">
                      <span className="mt-[9px] block h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {h}
                    </li>
                  ))}
                </ul>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="flex flex-wrap gap-2">
                  {study.stats.map((s, i) => (
                    <span key={i} className="inline-flex items-center px-3.5 py-1.5 rounded-full text-sm font-semibold bg-primary/10 text-primary border border-primary/20">
                      {s}
                    </span>
                  ))}
                </div>
              </FadeIn>

              <FadeIn delay={0.25}>
                <Link
                  to={`/pages/case-study/${study.id}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-primary/50 text-primary font-semibold text-base hover:bg-primary/10 transition mr-3"
                >
                  Read Case Study <ArrowUpRight className="h-4 w-4" />
                </Link>

                <motion.a
                  href={study.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-base hover:opacity-90 transition-opacity"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  View Project <ArrowUpRight className="h-4 w-4" />
                </motion.a>
              </FadeIn>

            </div>
          </div>
        </div>

      </motion.div>
    </article>
  );
};

export default CaseStudyCard;