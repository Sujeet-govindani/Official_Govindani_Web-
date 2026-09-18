import { Check } from "lucide-react";

const platforms = [
  {
    name: "Shiprocket",
    tagline: "100% Customized E-commerce",
    description: "Build a completely custom website integrated with Shiprocket's powerful logistics network.",

    features: ["Multi-carrier shipping", "Automated tracking", "COD management"],
    gradient: "from-orange-500/20 to-amber-500/20",
  },
  {
    name: "WordPress + WooCommerce",
    tagline: "Full Admin Control",
    description: "Get 100% security with seamless editing through your admin panel. Modify anything, anytime.",

    features: ["Self-hosted", "Plugin ecosystem", "SEO optimized"],
    gradient: "from-blue-500/20 to-indigo-500/20",
  },
  {
    name: "Shopify",
    tagline: "World's Safest System",
    description: "Leverage Shopify's enterprise-grade security for your custom storefront.",

    features: ["99.99% uptime", "PCI compliant", "Global CDN"],
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    name: "Custom Development",
    tagline: "100% Feature Control",
    description: "Get complete modification capabilities at your level. Every feature tailored to you.",

    features: ["Unique features", "Full ownership", "Scalable architecture"],
    gradient: "from-purple-500/20 to-violet-500/20",
  },
];

const PlatformsSection = () => {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Ambient effects */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, hsla(38, 92%, 50%, 0.05) 0%, transparent 70%)" }} />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 bg-primary/10 text-primary border border-primary/20">
            Platforms
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Choose Your <span className="text-gradient-gold">Platform</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            We build on the platform that best fits your business needs
          </p>
        </div>

        {/* Platforms grid - MOBILE: single column, DESKTOP: unchanged */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {platforms.map((platform, index) => (
            <div
              key={index}
              className="group rounded-2xl p-6 glass-card hover:border-primary/30 transition-all duration-500 hover:translate-y-[-4px]"
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">

                <div>
                  <h3 className="text-xl font-bold text-foreground">{platform.name}</h3>
                  <p className="text-primary text-sm font-semibold">{platform.tagline}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-4">{platform.description}</p>

              {/* Features */}
              <div className="flex flex-wrap gap-2">
                {platform.features.map((feature, i) => (
                  <span key={i} className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                    <Check size={12} className="text-success" />
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformsSection;