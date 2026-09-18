import { useEffect, useRef } from "react";

const integrations = [
  { name: "Stripe", logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/StripeLogo.png" },
  { name: "PayPal", logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PayPalLogo.png" },
  { name: "Razorpay", logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Razorpay-logo.png" },
  { name: "Square", logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ShipdelightLogo.webp" },
  { name: "Adyen", logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ShipwayLogo.webp" },
  { name: "Klarna", logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/signzy-logo.png" },
  { name: "Authorize", logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/woocomm.png" },
  { name: "WorldPay", logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/zoho.webp" },
  { name: "Checkout", logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/QuickBookLogo.png" },
  { name: "2Checkout", logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PhonePe-Logo.png" },
  { name: "2Checkout", logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/nimbusLogo.webp" },
  { name: "2Checkout", logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Bluedart-logo.png" },
  { name: "2Checkout", logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Cashfree-logo.png" },
  { name: "2Checkout", logo: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Hubspot-logo.png" },
];

const IntegrationsSlider = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-16 bg-background relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, hsla(38, 92%, 50%, 0.08) 0%, transparent 70%)" }} />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Get <span className="text-gradient-gold">Seamless Integrations</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with 50+ payment gateways, delivery partners & tools seamlessly
          </p>
        </div>

        {/* Infinite slider */}
        <div className="relative overflow-hidden">
          {/* Gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

          <div
            ref={scrollRef}
            className="flex gap-6 animate-slide-infinite"
            style={{ width: "fit-content" }}
          >
            {/* Double the items for seamless loop */}
            {[...integrations, ...integrations].map((item, i) => (
              <div
                key={i}
                className="flex-shrink-0 flex items-center justify-center p-6 rounded-xl glass-card hover:border-primary/30 transition-all duration-300 group min-w-[120px]"
              >
                <img
                  src={item.logo}
                  alt={item.name}
                  className="h-12 w-auto object-contain filter brightness-90 group-hover:brightness-100 group-hover:scale-110 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSlider;