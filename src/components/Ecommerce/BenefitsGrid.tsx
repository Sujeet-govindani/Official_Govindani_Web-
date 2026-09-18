import { Lock, Palette, Ban, TrendingDown, CreditCard, Zap, CheckCircle2 } from "lucide-react";


const benefits = [
  {
    title: "Get Your Own System",
    description: "Complete ownership of your platform, data, and customer relationships.",
  },
  {
    title: "100% Customization",
    description: "Every pixel designed according to your brand. No templates, no limits.",
  },
  {
    title: "No Markup Charges",
    description: "Zero hidden fees on your transactions. What you earn is fully yours.",
  },
  {
    title: "No Sudden Inflation",
    description: "Fixed pricing that never changes. No surprise price hikes ever.",
  },
  {
    title: "No Monthly Subscription",
    description: "Pay once, use forever. No recurring charges draining your profits.",
  },
  {
    title: "One-Time Investment",
    description: "A single payment for lifetime ownership of your complete e-commerce ecosystem.",
  },
];

const BenefitsGrid = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-black">
      {/* Background patterns */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: "radial-gradient(#D4AF37 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      
      {/* Ambient gold glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full blur-[120px] pointer-events-none opacity-20"
        style={{ background: "#D4AF37" }} />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full blur-[120px] pointer-events-none opacity-10"
        style={{ background: "#F5E6D3" }} />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20">
            <CheckCircle2 size={12} />
            The Ultimate Advantage
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Problems <span className="text-gradient-gold">We Eliminate</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            We break the chains of platform dependency and high commissions, 
            giving you total control over your digital future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative rounded-3xl p-8 bg-white/[0.03] border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-500 hover:-translate-y-2 backdrop-blur-sm"
            >
              {/* Content */}
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#D4AF37] transition-colors duration-300" style={{ fontFamily: 'var(--font-heading)' }}>
                {benefit.title}
              </h3>
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                {benefit.description}
              </p>

              {/* Subtle hover accent line */}
              <div className="absolute bottom-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsGrid;