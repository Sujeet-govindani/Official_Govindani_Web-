import { useState, useEffect } from "react";
import { Lightbulb, Sparkles } from "lucide-react";

const ideas = [
  "A dedicated copy of Blinkit for my grocery chain",
  "Same Amazon-style app for my electronics store",
  "QuickMart clone for my hyperlocal delivery",
  "Custom delivery tracking app for my logistics",
  "AI-powered recommendation system for my store",
  "Multi-vendor marketplace like Flipkart",
  "Subscription box e-commerce platform",
  "B2B wholesale ordering platform",
  "Auction-based selling platform",
  "Rental & subscription commerce system",
];

const CustomIdeasSection = () => {
  const [visibleIdeas, setVisibleIdeas] = useState<number[]>([0, 1, 2]);
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatingIndex(0);
      setTimeout(() => {
        setVisibleIdeas(prev => {
          const newIdeas = [...prev];
          const nextIndex = (Math.max(...prev) + 1) % ideas.length;
          newIdeas.shift();
          newIdeas.push(nextIndex);
          return newIdeas;
        });
        setAnimatingIndex(null);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, hsla(38, 92%, 50%, 0.08) 0%, transparent 70%)" }} />

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 bg-primary/10 text-primary border border-primary/20">
            <Sparkles size={14} />
            AI-Enabled Ideas
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            We Know What <span className="text-gradient-gold">You're Thinking</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Have a specific vision? We can build it exactly as you imagine.
          </p>
        </div>

        {/* Animated ideas display */}
        <div className="rounded-2xl glass-card-gold p-8 md:p-12">
          <div className="flex items-center gap-3 mb-6">
            <Lightbulb size={24} className="text-primary" />
            <span className="text-sm text-muted-foreground font-medium">Popular project ideas our clients ask for:</span>
          </div>

          <div className="space-y-4">
            {visibleIdeas.map((ideaIndex, displayIndex) => (
              <div
                key={`${ideaIndex}-${displayIndex}`}
                className={`flex items-center gap-4 p-4 rounded-xl glass-card transition-all duration-300 ${animatingIndex === displayIndex ? "opacity-0 -translate-x-4" : "opacity-100 translate-x-0"
                  }`}
              >

                <p className="text-foreground font-medium">&quot;{ideas[ideaIndex]}&quot;</p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-primary/20 text-center">
            <p className="text-muted-foreground mb-4">
              Have a unique idea? Tell us and we'll make it happen.
            </p>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomIdeasSection;