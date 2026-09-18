import FadeIn from "./FadeIn";
import { Search, LayoutGrid, Palette, Code2, Gauge } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discovery",
    description: "We study your mission, audience, and goals to build a strategic foundation for every design decision.",
  },
  {
    icon: LayoutGrid,
    title: "Structure",
    description: "Content architecture, user flows, and information hierarchy organized for clarity and conversion.",
  },
  {
    icon: Palette,
    title: "Design",
    description: "Visual storytelling that balances emotion with authority. Every element earns its place.",
  },
  {
    icon: Code2,
    title: "Build",
    description: "Clean, responsive, performant code built to scale and designed to last.",
  },
  {
    icon: Gauge,
    title: "Optimization",
    description: "Performance tuning, SEO foundations, and conversion refinements to maximize long-term impact.",
  },
];

const ProcessSection = () => {
  return (
    <section id="process" className="py-14 md:py-20 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <p className="mb-3 text-sm md:text-base font-semibold uppercase tracking-[0.2em] text-primary">
            Our Process
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            From <span className="text-primary">Mission</span> to{" "}
            <span className="text-primary">Momentum</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
            A proven five-step framework that transforms organizational purpose into high-performing digital experiences.
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, i) => (
            <FadeIn key={i} delay={i * 0.1} className="h-full">
              <div className="group relative p-6 h-full text-center rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/30 flex flex-col items-center">
                <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-0.5 text-xs font-bold text-primary-foreground">
                  0{i + 1}
                </span>
                <div className="mx-auto mb-4 mt-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <step.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm md:text-base leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;