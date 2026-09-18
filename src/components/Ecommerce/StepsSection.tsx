import { Globe, ShoppingCart, Wallet, Truck, ArrowDown } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Globe,
    title: "Create Your Website",
    description: "Get a 100% customized e-commerce website built exactly as per your requirements.",
    highlight: "100% Customized",
  },
  {
    number: "02",
    icon: ShoppingCart,
    title: "Seamless Checkout",
    description: "Provide your customers with a smooth, secure checkout experience on your platform.",
    highlight: "Zero Friction",
  },
  {
    number: "03",
    icon: Wallet,
    title: "Receive Your Funds",
    description: "Get payments directly to your account via any payment gateway. No middleman.",
    highlight: "Instant Settlement",
  },
  {
    number: "04",
    icon: Truck,
    title: "Delivery Partner",
    description: "Get direct assistance with Shiprocket, FedEx, Delhivery & more delivery partners.",
    highlight: "Multi-Carrier Support",
  },
];

const StepsSection = () => {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none"
           style={{ background: "radial-gradient(circle, hsla(38, 92%, 50%, 0.06) 0%, transparent 70%)" }} />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 bg-primary/10 text-primary border border-primary/20">
            How It Works
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Steps to <span className="text-gradient-gold">Launch Your Store</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            From concept to conversion in 4 simple steps
          </p>
        </div>

        {/* Steps grid - MOBILE: single column with arrows, DESKTOP: unchanged */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-24 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />

          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Card */}
              <div className="rounded-2xl p-6 h-full glass-card hover:border-primary/30 transition-all duration-500 group-hover:translate-y-[-4px]">
                {/* Step number with icon */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-gold flex items-center justify-center glow-gold group-hover:animate-pulse-glow transition-all">
                    <step.icon size={28} className="text-primary-foreground" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center text-xs font-bold text-primary">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{step.description}</p>
                
                {/* Highlight tag */}
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                  {step.highlight}
                </span>
              </div>

              {/* Arrow connector (mobile/tablet only) */}
              {index < steps.length - 1 && (
                <div className="lg:hidden flex justify-center py-4">
                  <ArrowDown size={24} className="text-primary/40" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA hint */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground text-sm">
            And guess what? <span className="text-primary font-semibold">You own everything.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default StepsSection;