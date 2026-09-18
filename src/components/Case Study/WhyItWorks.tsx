import FadeIn from "./FadeIn";
import { CheckCircle2 } from "lucide-react";

const reasons = [
  {
    title: "Clarity Over Complexity",
    text: "We distill multi-faceted missions into intuitive digital structures that visitors understand in second not minutes.",
  },
  {
    title: "Trust by Design",
    text: "From credibility framing to donor journey optimization, every design decision is engineered to build confidence.",
  },
  {
    title: "Emotion Meets Architecture",
    text: "Storytelling without structure is noise. We balance emotional impact with rigorous information architecture.",
  },
  {
    title: "Conversion Without Compromise",
    text: "Our CTAs feel natural, not aggressive. Support pathways are woven into the experience not bolted on.",
  },
];

const WhyItWorks = () => {
  return (
    <section className="py-14 md:py-20 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <FadeIn>
              <p className="mb-3 text-sm md:text-base font-semibold uppercase tracking-[0.2em] text-primary">
                Why It Works
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Websites built for missions that{" "}
                <span className="text-primary">matter</span>.
              </h2>
              <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                Nonprofits and foundations face a unique challenge: communicating urgency, compassion, and credibility all at once. Our approach ensures every digital touchpoint serves that purpose.
              </p>
            </FadeIn>
          </div>

          <div className="space-y-5">
            {reasons.map((r, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
                  <div>
                    <h4 className="text-base font-semibold text-foreground">
                      {r.title}
                    </h4>
                    <p className="mt-1 text-base leading-relaxed text-muted-foreground">
                      {r.text}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyItWorks;