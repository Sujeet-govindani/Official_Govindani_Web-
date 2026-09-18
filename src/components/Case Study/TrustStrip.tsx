import { px } from "framer-motion";
import FadeIn from "./FadeIn";
import { Shield, Heart, TrendingUp, Eye } from "lucide-react";

const bullets = [
  { icon: Eye, text: "Clarity-first digital architecture" },
  { icon: Heart, text: "Emotion-led storytelling frameworks" },
  { icon: Shield, text: "Trust-driven donor journeys" },
  { icon: TrendingUp, text: "Conversion-focused design systems" },
];

const TrustStrip = () => {
  return (
    <section id="trust" className="py-12 md:py-16 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <p className="mb-3 text-sm md:text-base font-semibold uppercase tracking-[0.2em] text-primary">
            What We Do
          </p>
          <h2 className="text-3xl sm:text-3xl md:text-3xl font-bold">
            We Help Mission-Led Organizations Build Websites That{" "}
            <span className="text-primary">Inspires Action</span>
          </h2>
          <p className="mt-5 max-w-3xl text-base md:text-lg text-muted-foreground leading-relaxed">
            From nonprofits rescuing animals to foundations uplifting communities, we design
            digital experiences that turn complex missions into clear, trustworthy, and
            conversion-ready platforms.
          </p>
        </FadeIn>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {bullets.map((b, i) => (
            <FadeIn key={i} delay={i * 0.1} className="h-full">
              <div className="flex items-start gap-4 p-6 h-full rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/30">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <b.icon className="h-5 w-5" />
                </div>
                <p className="text-sm md:text-base font-medium leading-relaxed text-foreground">
                  {b.text}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;