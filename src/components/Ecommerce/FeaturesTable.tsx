import { Check, Sparkles } from "lucide-react";

const features = [
  "Custom Domain Setup",
  "SSL Certificate",
  "Product Catalog",
  "Shopping Cart",
  "Secure Checkout",
  "Payment Gateway",
  "Order Management",
  "Inventory Tracking",
  "Customer Accounts",
  "Wishlist Feature",
  "Product Reviews",
  "Discount Coupons",
  "Tax Calculation",
  "Shipping Calculator",
  "Multi-Currency",
  "Email Notifications",
  "SMS Alerts",
  "WhatsApp Integration",
  "Live Chat Support",
  "Analytics Dashboard",
  "SEO Optimization",
  "Social Media Integration",
  "Product Variants",
  "Bulk Upload",
  "Export Reports",
  "Mobile Responsive",
  "PWA Support",
  "Push Notifications",
  "Abandoned Cart Recovery",
  "Loyalty Program",
  "Referral System",
  "Gift Cards",
  "Product Bundles",
  "Flash Sales",
  "Pre-Orders",
  "Backorder Management",
  "Multi-Vendor Support",
  "Vendor Dashboard",
  "Commission System",
  "Payout Management",
  "Return Management",
  "Refund Processing",
  "Invoice Generation",
  "GST Compliance",
  "Custom Reports",
  "API Access",
  "Webhook Support",
  "Third-Party Integration",
];

// Group features by category for better mobile UX
const categorizedFeatures = [
  {
    category: "Store Basics",
    icon: "🏪",
    items: ["Custom Domain Setup", "SSL Certificate", "Product Catalog", "Shopping Cart", "Mobile Responsive"]
  },
  {
    category: "Checkout & Payment",
    icon: "💳",
    items: ["Secure Checkout", "Payment Gateway", "Multi-Currency", "Tax Calculation", "Invoice Generation"]
  },
  {
    category: "Order & Inventory",
    icon: "📦",
    items: ["Order Management", "Inventory Tracking", "Shipping Calculator", "Return Management", "Refund Processing"]
  },
  {
    category: "Customer Features",
    icon: "👥",
    items: ["Customer Accounts", "Wishlist Feature", "Product Reviews", "Loyalty Program", "Referral System"]
  },
  {
    category: "Marketing & Sales",
    icon: "📢",
    items: ["Discount Coupons", "Flash Sales", "Gift Cards", "Product Bundles", "Abandoned Cart Recovery"]
  },
  {
    category: "Communication",
    icon: "💬",
    items: ["Email Notifications", "SMS Alerts", "WhatsApp Integration", "Live Chat Support", "Push Notifications"]
  },
  {
    category: "Analytics & SEO",
    icon: "📊",
    items: ["Analytics Dashboard", "SEO Optimization", "Social Media Integration", "Custom Reports", "Export Reports"]
  },
  {
    category: "Advanced Features",
    icon: "⚙️",
    items: ["Product Variants", "Bulk Upload", "PWA Support", "Pre-Orders", "Backorder Management"]
  },
  {
    category: "Multi-Vendor",
    icon: "🏢",
    items: ["Multi-Vendor Support", "Vendor Dashboard", "Commission System", "Payout Management", "API Access"]
  },
  {
    category: "Integrations",
    icon: "🔗",
    items: ["Webhook Support", "Third-Party Integration", "GST Compliance"]
  },
];

const FeaturesTable = () => {
  // Split features into 4 columns for desktop
  const columnSize = Math.ceil(features.length / 4);
  const columns = [
    features.slice(0, columnSize),
    features.slice(columnSize, columnSize * 2),
    features.slice(columnSize * 2, columnSize * 3),
    features.slice(columnSize * 3),
  ];

  return (
    <section className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(0 0% 6%) 0%, hsl(0 0% 8%) 100%)" }}>
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 bg-primary/10 text-primary border border-primary/20">
            Complete Package
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            100+ <span className="text-gradient-gold">Features Included</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Everything you need to run a successful e-commerce business
          </p>
        </div>

        {/* Features table - DESKTOP VIEW (unchanged) */}
        <div className="hidden md:block rounded-2xl glass-card p-6 md:p-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-3">
            {columns.map((column, colIndex) => (
              <div key={colIndex} className="space-y-3">
                {column.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 py-1 group"
                  >
                    <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 group-hover:bg-success/20 transition-colors">
                      <Check size={12} className="text-success" />
                    </div>
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Bottom note */}
          <div className="mt-10 pt-6 border-t border-border text-center">
            <p className="text-muted-foreground">
              Don't see what you need? We can build <span className="text-primary font-semibold">any custom feature</span> for your business.
            </p>
          </div>
        </div>

        {/* Features table - MOBILE VIEW (new categorized design) */}
        <div className="md:hidden space-y-4">
          {categorizedFeatures.map((category, idx) => (
            <div
              key={idx}
              className="rounded-xl glass-card p-4 border border-border/50 hover:border-primary/30 transition-all"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-3 pb-3 border-b border-border/30">
                <span className="text-2xl">{category.icon}</span>
                <h3 className="text-base font-bold text-foreground">{category.category}</h3>
                <span className="ml-auto text-xs font-semibold px-2 py-1 rounded-full bg-primary/10 text-primary">
                  {category.items.length}
                </span>
              </div>

              {/* Features List */}
              <div className="space-y-2.5">
                {category.items.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5"
                  >
                    <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={12} className="text-success" />
                    </div>
                    <span className="text-sm text-muted-foreground leading-relaxed">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Bottom note - Mobile */}
          <div className="mt-6 pt-6 border-t border-border text-center px-2">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Don't see what you need? We can build <span className="text-primary font-semibold">any custom feature</span> for your business.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesTable;