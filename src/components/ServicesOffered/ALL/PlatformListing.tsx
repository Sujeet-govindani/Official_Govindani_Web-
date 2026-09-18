import React from 'react';
import { Link } from 'react-router-dom';
import ServiceSection from '@/components/HomePage/ServicesSection';
import ContactUsForm from '@/pages/ContactUsForm';

const platforms = [
  { name: 'Myntra', logo: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Ecommerce-Platform-Listing/Ecommerce-Platform-Listing-Myntra.webp', desc: 'India\'s leading fashion destination' },
  { name: 'JioMart', logo: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Ecommerce-Platform-Listing/Ecommerce-Platform-Listing-JioMart.webp', desc: 'Reliance\'s marketplace powerhouse' },
  { name: 'Amazon', logo: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Ecommerce-Platform-Listing/Ecommerce-Platform-Listing-Amezon.webp', desc: 'Global e commerce giant' },
  { name: 'Flipkart', logo: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Ecommerce-Platform-Listing/Ecommerce-Platform-Listing-Flipcart.webp', desc: 'India\'s homegrown marketplace' },
  { name: 'Meesho', logo: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Ecommerce-Platform-Listing/Eommerce-Platform-Listing-Meesho.webp', desc: 'Social commerce revolution' },
  { name: 'Ajio', logo: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Ecommerce-Platform-Listing/Eommerce-Platform-Listing-Ajio.webp', desc: 'Premium fashion & lifestyle' },
];

const stats = [
  { number: '75,000 Cr+', label: 'Myntra\'s Annual GMV' },
  { number: '50M+', label: 'Active Buyers on Flipkart' },
  { number: '4X', label: 'Revenue Growth for Sellers' },
  { number: '30+', label: 'Marketplaces We Cover' },
];

const processSteps = [
  { step: '01', title: 'Brand Consultation', desc: 'We understand your product range, brand story, and target audience to identify the right platforms.' },
  { step: '02', title: 'Platform Registration', desc: 'Our team handles the entire registration and documentation process, bypassing common delays.' },
  { step: '03', title: 'Catalog & Listing', desc: 'Professional product photography guidance, compelling descriptions, and SEO-optimized listings.' },
  { step: '04', title: 'Account Optimization', desc: 'Pricing strategy, inventory management setup, and performance tracking dashboards.' },
  { step: '05', title: 'Launch & Scale', desc: 'Go live with full support ad management, promotions, and growth strategy.' },
];

const painPoints = [
  'Applied to Myntra months ago but haven\'t heard back?',
  'Struggling with complex documentation for marketplace onboarding?',
  'Missing out on festive season sales due to delays?',
  'Don\'t know which platform suits your product category?',
  'Need someone to manage listings while you focus on product?',
];

const PlatformListing: React.FC = () => {
  return (
    <div className="service-page pt-[100px] md:pt-[120px] lg:pt-[140px] px-0">
      <style>{`
        @media (max-width: 768px) {
          .service-page {
            padding-top: 100px !important;
          }
          .service-section {
            padding: 1.5rem 1rem !important;
          }
          .service-page section:first-of-type {
            margin-top: 0 !important;
            padding-top: 1rem !important;
          }
        }
        .image-container {
          position: relative;
          box-shadow: 0 25px 50px -12px rgba(212, 175, 55, 0.25);
          border: 1px solid rgba(212, 175, 55, 0.3);
        }
        .image-container::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.6));
          pointer-events: none;
        }
      `}</style>
      {/* Section 1: Hero */}
      <section className="service-section relative overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 blur-[120px] -z-10 rounded-full" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gold/5 blur-[100px] -z-10 rounded-full" />

        <div className="flex flex-col-reverse lg:flex-row-reverse items-center gap-10 lg:gap-16">
          <div className="w-full lg:w-1/2 space-y-6">
            <p className="font-body text-gold uppercase tracking-[0.2em] text-sm font-semibold">
              E-COMMERCE PLATFORM LISTING
            </p>
            <h1 className="service-heading text-3xl md:text-4xl lg:text-5xl leading-tight">
              Get Your Brand on Every <span className="text-gold">Major Marketplace</span>
            </h1>
            <p className="service-text text-base md:text-lg">
              From Myntra to JioMart, Amazon to Flipkart we help brands onboard, list, and sell on
              India's and the world's biggest e commerce platforms. No delays, no rejections.
            </p>

          </div>
          <div className="w-full lg:w-1/2">
            <div className="image-container aspect-[4/3] rounded-2xl overflow-hidden">
              <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ecom.webp" alt="E commerce platforms" className="w-full h-full object-cover" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Stats */}
      <section className="service-section">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="glass-card p-6 md:p-8 text-center transition-all duration-300 hover:scale-105">
              <p className="font-heading text-gold text-2xl md:text-3xl lg:text-4xl font-bold mb-2">{stat.number}</p>
              <p className="service-text-muted text-xs md:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Pain Points */}
      <section className="service-section">
        <div className="glass-card p-8 md:p-12 lg:p-16">
          <h2 className="service-heading text-2xl md:text-3xl text-center mb-4">Fed Up?</h2>
          <p className="service-text-muted text-center max-w-xl mx-auto mb-10">
            We get it. Getting listed on major marketplaces can be frustratingly slow and complicated.
          </p>
          <div className="space-y-4 max-w-2xl mx-auto">
            {painPoints.map((point, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-xl" style={{ background: 'hsla(43, 74%, 49%, 0.06)' }}>
                <div className="w-6 h-6 rounded-full bg-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-midnight text-xs font-bold">!</span>
                </div>
                <p className="service-text text-sm md:text-base">{point}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-8">
            <span className="service-heading text-lg md:text-xl">We solve all of this <span className="text-gold">guaranteed.</span></span>
          </p>
        </div>
      </section>

      {/* Section 4: Platforms We Cover */}
      <section className="service-section">
        <h2 className="service-heading text-2xl md:text-3xl lg:text-4xl text-center mb-12">
          Platforms We Cover
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {platforms.map((p, i) => (
            <div key={i} className="glass-card p-6 md:p-8 text-center transition-all duration-300 hover:scale-105 flex flex-col items-center gap-4">
              <div className="image-container w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden">
                <img src={p.logo} alt={p.name} className="w-full h-full object-contain" loading="lazy" decoding="async" />
              </div>
              <h3 className="font-heading text-cream text-lg md:text-xl font-bold">{p.name}</h3>
              <p className="service-text-muted text-xs md:text-sm">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: Our Process */}
      <section className="service-section">
        <h2 className="service-heading text-2xl md:text-3xl lg:text-4xl text-center mb-12">
          How We Get You Listed
        </h2>
        <div className="space-y-6 max-w-3xl mx-auto">
          {processSteps.map((step, i) => (
            <div key={i} className="glass-card p-6 md:p-8 flex flex-col sm:flex-row items-start gap-6 transition-all duration-300 hover:scale-[1.02]">
              <div className="text-gold font-heading text-4xl md:text-5xl font-bold opacity-40 flex-shrink-0">
                {step.step}
              </div>
              <div>
                <h3 className="font-heading text-cream text-lg md:text-xl font-bold mb-2">{step.title}</h3>
                <p className="service-text-muted text-sm md:text-base">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>



      {/* Services Section */}

      <ServiceSection />
      <ContactUsForm />
    </div>
  );
};

export default PlatformListing;
