import { ArrowRight, Phone, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(0 0% 8%) 0%, hsl(0 0% 4%) 100%)" }}>
      {/* Ambient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, hsla(38, 92%, 50%, 0.1) 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, hsla(38, 92%, 50%, 0.08) 0%, transparent 70%)" }} />

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="text-center">
          {/* Main headline */}
          <h2 className="text-3xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Ready to Own Your <br />
            <span className="text-gradient-gold">E-Commerce Empire?</span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Stop paying platform fees. Start keeping 100% of your profits.
            Get your custom website today.
          </p>

          {/* CTA buttons - Stack on mobile, inline on desktop */}
          <div className="flex flex-col md:flex-row flex-wrap justify-center gap-4 mb-12">
            <Link to="/contact-us" className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-gold text-primary-foreground font-bold text-lg glow-gold hover:scale-105 active:scale-95 transition-all">
              Contact Us
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;