import FadeIn from "./FadeIn";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const FinalCTA = () => {
  return (
    <section className="py-14 md:py-20 px-6 md:px-12 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] rounded-full bg-primary/5 blur-[140px]" />

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        <FadeIn>
          <p className="mb-4 text-sm md:text-base font-semibold uppercase tracking-[0.2em] text-primary">
            Let's Build Yours
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="mx-auto max-w-3xl text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            If your mission deserves to be understood, your website should do more than just{" "}
            <span className="text-primary">exist</span>.
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="mx-auto mt-5 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
            Whether you're a nonprofit, trust, or foundation we'll help you build a digital
            presence that earns trust, drives donations, and amplifies your impact.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-8">
            <Link to="/contact-us" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold text-base transition-all hover:opacity-90">
              Start a Conversation <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default FinalCTA;