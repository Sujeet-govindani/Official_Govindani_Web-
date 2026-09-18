import React from "react";

const Sitemap = () => {
  const sections = [
    {
      title: "Main Pages",
      links: [
        { label: "Home", href: "/" },
        { label: "About Founder", href: "/about-us/about-founder" },
        { label: "About Company", href: "/about-us/about-company" },
        { label: "Contact Us", href: "/contact-us" },
        { label: "Careers", href: "/careers" },
        { label: "Case Studies", href: "/pages/case-study" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "WhatsApp Flow", href: "/services/whatsapp-flow" },
        { label: "Google Ads", href: "/services/google-ads" },
        { label: "Meta Ads", href: "/services/meta-ads" },
        { label: "Social Media Marketing", href: "/services/social-media" },
        { label: "AI Automation", href: "/services/ai-automation" },
        { label: "SEO", href: "/services/seo" },
        { label: "Website Creation", href: "/services/website-creation" },
        { label: "Videography", href: "/services/videography" },
        { label: "360° Virtual Tour", href: "/services/virtual-tours" },
      ],
    },
    {
      title: "Portfolio",
      links: [
        { label: "NGO Portfolio", href: "/portfolio/ngo" },
        { label: "Real Estate", href: "/portfolio/builders" },
        { label: "E-Commerce", href: "/portfolio/ecommerce" },
        { label: "HealthCare", href: "/portfolio/healthcare" },
        { label: "Business Website", href: "/portfolio/business" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms of Service", href: "/terms-of-service" },
        { label: "Cookie Policy", href: "/cookie-policy" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-inter">
      <style>{`
        .sitemap-link {
          color: rgba(255, 255, 255, 0.6);
          transition: all 0.3s ease;
          display: block;
          padding: 0.5rem 0;
          font-size: 1rem;
          text-decoration: none;
        }
        .sitemap-link:hover {
          color: #d4af37;
          transform: translateX(10px);
        }
        .gold-gradient-text {
          background: linear-gradient(135deg, #fff 0%, #d4af37 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .font-baskerville {
          font-family: 'Libre Baskerville', serif;
        }
      `}</style>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-6 overflow-hidden text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)] pointer-events-none" />
        <h1 className="text-4xl md:text-6xl font-baskerville mb-6 gold-gradient-text">
          Sitemap
        </h1>
        <p className="text-white/60 max-w-2xl mx-auto">
          Explore the architecture of Govindani Infotech's digital presence.
        </p>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {sections.map((section) => (
            <div key={section.title} className="space-y-6">
              <h2 className="font-baskerville text-[#d4af37] text-xl border-b border-[#d4af37]/20 pb-4">
                {section.title}
              </h2>
              <div className="space-y-2">
                {section.links.map((link) => (
                  <a key={link.label} href={link.href} className="sitemap-link">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
