import FadeIn from "./FadeIn";
import { ArrowDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Glow accent */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center pt-20 pb-12 md:pt-28 md:pb-16">
        <FadeIn delay={0.1}>
          <p className="mb-5 text-sm md:text-base font-semibold uppercase tracking-[0.2em] text-primary">
            Our Work · Case Studies
          </p>
        </FadeIn>

        <FadeIn delay={0.25}>
          <h1 className="text-4xl sm:text-4xl md:text-4xl lg:text-4xl font-bold leading-tight tracking-tight">
            Case Studies That Turn{" "}
            <span className="text-primary">Purpose</span> Into{" "} <br />
            <span className="text-primary">Performance</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.4}>
          <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl leading-relaxed text-muted-foreground">
            We partner with nonprofits, trusts, and mission-led organizations to build
            digital experiences that drive clarity, trust, and measurable impact.
          </p>
        </FadeIn>
      </div>
    </section>
  );
};

export default HeroSection;