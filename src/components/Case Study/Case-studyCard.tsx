import { CaseStudy } from "@/data/caseStudies";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  study: CaseStudy;
  index: number;
}

/**
 * The card is a HOOK, not the case study.
 *
 * It used to print the challenge, what we delivered and the impact, each
 * clamped to three lines. Measured on the live page: 108 clipped blocks, and on
 * the Mahipatsinh card those three paragraphs showed 82px of 218px, 191px and
 * 136px - roughly 60% of the writing hidden. So the card asked you to read
 * three half-sentences that all stopped mid-thought, under a bullet list and
 * two equally loud buttons. That is what made it read cheap: not the colour or
 * the type, but a layout fighting its own content.
 *
 * It now makes ONE point - who, the promise, the number that proves it, and a
 * way in. Everything that was truncated lives on the detail page, in full,
 * where there is room for it.
 */

/** "5,000+ children supported" -> ["5,000+", "children supported"]. */
function splitStat(s: string): [string, string] {
  const m = (s || "").match(
    /^\s*([₹$]?[\d][\d,.]*\s*(?:\+|%|x|Cr|L|K|M|crore|lakh)?)\s+(.*)$/i,
  );
  return m ? [m[1].trim(), m[2].trim()] : ["", (s || "").trim()];
}

/** The first sentence of the impact - the claim, without the essay. */
function firstSentence(text: string): string {
  const t = (text || "").trim();
  const cut = t.search(/[.!?]\s/);
  return cut > 40 ? t.slice(0, cut + 1) : t;
}

const CaseStudyCard = ({ study, index }: Props) => {
  const isReversed = index % 2 === 1;
  const [figure, figureLabel] = splitStat(study.stats?.[0] ?? "");
  const restStats = (study.stats ?? []).slice(1);

  return (
    <article className="border-t border-border/30 bg-background px-4 py-10 md:px-8 md:py-14">
      <motion.div
        className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_8px_48px_rgba(0,0,0,0.35)] backdrop-blur-md"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* One layout at every width. The old card carried a separate mobile
            and desktop copy of the same content - 301 lines, already drifting
            apart from each other. */}
        <div
          className={`flex flex-col lg:min-h-[26rem] lg:flex-row ${
            isReversed ? "lg:flex-row-reverse" : ""
          }`}
        >
          {/* ── The build ───────────────────────────────────────────────── */}
          <div className="relative h-[clamp(190px,48vw,330px)] shrink-0 overflow-hidden lg:h-auto lg:w-[55%]">
            <img
              src={study.image}
              alt={`The ${study.client} website, built by Govindani Infotech`}
              loading="lazy"
              decoding="async"
              /* object-top, not object-center. These are page captures:
                 centred, the frame landed halfway down the page and showed the
                 client's own nav bar floating across the card, which reads as
                 a mistake rather than a crop. */
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
            <div
              className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent lg:bg-gradient-to-r ${
                isReversed
                  ? "lg:from-background/80 lg:via-transparent lg:to-transparent"
                  : "lg:from-transparent lg:via-transparent lg:to-background/80"
              }`}
            />
            <span className="absolute left-4 top-4 z-10 inline-flex items-center rounded-full border border-primary/30 bg-black/70 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary backdrop-blur-md">
              {study.category}
            </span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 right-4 select-none text-[5rem] font-black leading-none text-white/[0.05] lg:text-[9rem]"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* ── The hook ────────────────────────────────────────────────── */}
          <div className="flex flex-1 flex-col justify-center gap-5 px-6 py-8 md:px-10 md:py-12">
            <h3 className="text-[1.9rem] font-extrabold leading-[1.1] tracking-tight text-white md:text-[2.4rem]">
              {study.client}
            </h3>

            {/* The promise, in full. It is one line and was never the thing
                that needed truncating. */}
            <p className="border-l-[3px] border-primary/40 pl-4 text-lg font-medium leading-snug text-primary md:text-xl">
              {study.tagline}
            </p>

            {/* The number that proves it - one figure, large enough to be the
                thing you carry away from the card. */}
            {figure ? (
              <div className="flex items-baseline gap-3">
                <span className="text-[clamp(2.1rem,6vw,3rem)] font-extrabold leading-none text-white">
                  {figure}
                </span>
                <span className="text-sm font-medium uppercase tracking-wide text-white/55 md:text-base">
                  {figureLabel}
                </span>
              </div>
            ) : (
              <div className="text-lg font-semibold text-white">{figureLabel}</div>
            )}

            {/* One line, whole. Nothing on this card is clamped any more. */}
            <p className="text-[1.02rem] leading-relaxed text-white/75 md:text-lg">
              {firstSentence(study.impact)}
            </p>

            {restStats.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {restStats.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-[0.78rem] font-semibold text-primary"
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-1">
              <Link
                to={`/pages/case-study/${study.id}`}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Read the case study <ArrowUpRight className="h-4 w-4" />
              </Link>

              {/* Secondary, and quiet. Two equally loud buttons made the card
                  ask twice and land neither. */}
              <a
                href={study.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-base font-medium text-white/60 underline-offset-4 transition-colors hover:text-primary hover:underline"
              >
                Visit the site <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </article>
  );
};

export default CaseStudyCard;
