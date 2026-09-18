import React from 'react';
import { Link } from 'react-router-dom';
import ServiceSection from '@/components/HomePage/ServicesSection';
import ContactUsForm from '@/pages/ContactUsForm';

const AIProductShoot: React.FC = () => {
  return (
    <div className="service-page">
      {/* Section 1: Hero */}
      <section className="service-section">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <div className="w-full lg:w-1/2 space-y-6">
            <p className="font-body text-gold uppercase tracking-[0.2em] text-sm font-semibold">
              AI PRODUCT SHOOT
            </p>
            <h1 className="service-heading text-3xl md:text-4xl lg:text-5xl leading-tight">
              Next-Gen Product Visuals with <span className="text-gold">AI</span>
            </h1>
            <p className="service-text text-base md:text-lg">
              Transform your product images using cutting-edge AI technology. Generate stunning backgrounds,
              lifestyle scenes, and creative compositions without a physical photoshoot. Faster, more affordable,
              and endlessly creative.
            </p>
            <p className="service-text-muted text-sm md:text-base">
              From plain product photos to magazine-quality visuals our AI-powered editing creates
              professional-grade imagery that looks completely natural and drives conversions.
            </p>
            <div className="flex flex-wrap gap-4">
              {['AI Background Removal', 'Scene Generation', 'Model Placement', 'Batch Processing'].map((tag, i) => (
                <span key={i} className="glass-card px-4 py-2 text-sm font-body text-gold font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="image-container aspect-[4/3] rounded-2xl overflow-hidden">
              <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ai-product-shoot/hero.webp" alt="AI Product Shoot" className="w-full h-full object-cover" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: AI Image Grid Gallery */}
      <section className="service-section">
        <h2 className="service-heading text-2xl md:text-3xl lg:text-4xl text-center mb-4">
          AI-Enhanced Gallery
        </h2>
        <p className="service-text-muted text-center max-w-xl mx-auto mb-12">
          See the magic of AI-powered product photography every image below was enhanced or generated using our AI pipeline.
        </p>

        <div className="ai-image-grid">
          {/* Row 1: 3 images */}
          <div className="ai-image-row">
            <div className="ai-image rounded-xl" style={{ flex: 1, backgroundImage: "url('https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ecomm.webp')" }} />
            <div className="ai-image rounded-xl" style={{ flex: 1, backgroundImage: "url('https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/graphic2.webp')" }} />
            <div className="ai-image rounded-xl" style={{ flex: 2, backgroundImage: "url('https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/graphic3.webp')" }} />
          </div>

          {/* Row 2: 2 images */}
          <div className="ai-image-row">
            <div className="ai-image rounded-xl" style={{ flex: 1, backgroundImage: "url('https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/im1.jpeg')" }} />
            <div className="ai-image rounded-xl" style={{ flex: 2, backgroundImage: "url('https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/im2.jpeg')" }} />
          </div>

          {/* Row 3: 4 images */}
          <div className="ai-image-row">
            <div className="ai-image rounded-xl" style={{ flex: 2, backgroundImage: "url('https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/im3.jpeg')" }} />
            <div className="ai-image rounded-xl" style={{ flex: 1, backgroundImage: "url('https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/im4.jpeg')" }} />
            <div className="ai-image rounded-xl" style={{ flex: 3, backgroundImage: "url('https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/im5.jpeg')" }} />
            <div className="ai-image rounded-xl" style={{ flex: 1, backgroundImage: "url('https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/im6.jpeg')" }} />
          </div>

          {/* Row 4: 3 images */}
          <div className="ai-image-row">
            <div className="ai-image rounded-xl" style={{ flex: 1, backgroundImage: "url('https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ai-product-shoot/ai-10.webp')" }} />
            <div className="ai-image rounded-xl" style={{ flex: 1, backgroundImage: "url('https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ai-product-shoot/ai-11.webp')" }} />
            <div className="ai-image rounded-xl" style={{ flex: 1, backgroundImage: "url('https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ai-product-shoot/ai-12.webp')" }} />
          </div>
        </div>
      </section>

      {/* Section 3: How It Works */}
      <section className="service-section">
        <h2 className="service-heading text-2xl md:text-3xl lg:text-4xl text-center mb-12">
          How AI Product Shoot Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { step: '01', title: 'Upload', desc: 'Send us your raw product images even phone photos work perfectly.' },
            { step: '02', title: 'AI Magic', desc: 'Our AI removes backgrounds, generates scenes, and enhances every detail.' },
            { step: '03', title: 'Deliver', desc: 'Receive studio-quality images ready for your e commerce store or ads.' },
          ].map((item, i) => (
            <div key={i} className="glass-card p-6 md:p-8 text-center transition-all duration-300 hover:scale-105">
              <div className="text-gold font-heading text-4xl font-bold opacity-40 mb-4">{item.step}</div>
              <h3 className="font-heading text-cream text-lg md:text-xl font-bold mb-3">{item.title}</h3>
              <p className="service-text-muted text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: CTA */}
      {/* <section className="service-section text-center">
        <div className="glass-card p-8 md:p-12 lg:p-16 max-w-3xl mx-auto">
          <h3 className="service-subheading text-xl md:text-2xl lg:text-3xl mb-4">
            Ready for AI-Powered Product Visuals?
          </h3>
          <p className="service-text-muted text-sm md:text-base mb-8 max-w-xl mx-auto">
            No studio. No expensive equipment. Just stunning product photos powered by artificial intelligence.
          </p>
          <Link to="/contact-us" className="cta-button">
            Get Started
          </Link>
        </div>
      </section> */}

      {/* Services Section */}
      <ContactUsForm/>
      <ServiceSection />
    </div>
  );
};

export default AIProductShoot;
