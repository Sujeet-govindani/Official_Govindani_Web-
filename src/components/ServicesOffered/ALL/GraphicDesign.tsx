import React from 'react';
import ServiceSection from '@/components/HomePage/ServicesSection';
import ContactUsForm from '@/pages/ContactUsForm';

const GraphicDesigner: React.FC = () => {
  const features = [
    'Custom Designs',
    'High-Quality Graphics',
    'Creative Concepts',
    'Professional Designers',
    'Timely Delivery',
  ];

  const keyComponents = [
    'Logo Design',
    'Branding and Identity',
    'Brochure and Flyer Design',
    'Social Media Graphics',
    'Infographics',
    'Packaging Design',
    'Business Cards and Stationery',
    'Advertisement Design',
  ];

  const graphicImages = [
    { image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/graphic-1.webp" },
    { image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/graphic-2.webp" },
    { image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/graphic-3.webp" },
    { image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/graphic-4.webp" },
    { image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/graphic-5.webp" },
    { image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/graphic-6.webp" },
    { image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/graphic-22.webp" },
    { image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/graphic-8.webp" },
    { image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/graphic-9.webp" },
    { image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/graphic-10.webp" },
    { image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/graphic-11.webp" },
    { image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/graphic-12.webp" },
    { image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/graphic-13.webp" },
    { image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/graphic-14.webp" },
    { image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/graphic-15.webp" },
    { image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/graphic-16.webp" },
    { image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/graphic-17.webp" },
    { image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/graphic-18.webp" },
    { image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/graphic-19.webp" },
    { image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/graphic-20.webp" },
    { image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/graphic-21.webp" },

  ];

  // Global style for fonts
  const globalStyle = `
    
    .service-page {
      font-family: 'Inter', sans-serif;
      padding-top:100px !important;
    }
    
    h1, h2, h3, h4, h5, h6, 
    .font-heading,
    [class*="heading"],
    .service-heading,
    .service-subheading {
      font-family: 'Libre Baskerville', Georgia, serif !important;
    }
    
    p, span, li, div:not(h1):not(h2):not(h3):not(h4):not(h5):not(h6),
    .service-text,
    .service-text-muted,
    .font-body {
      font-family: 'Inter', sans-serif !important;
    }

    /* Fix clipping for gradient text */
    .shimmer-wave, .text-gradient-gold {
      display: inline-block !important;
      padding-left: 0.15em !important;
      padding-right: 0.15em !important;
      margin-left: -0.15em !important;
      margin-right: -0.15em !important;
      overflow: visible !important;
      line-height: 1.3 !important;
    }

    @media (max-width: 768px) {
      .service-section {
        padding: 45px 16px 25px !important;
      }
      .service-page {
        padding-top: 95px !important;
      }
    }
  `;

  return (
    <>
      <style>{globalStyle}</style>
      <div className="service-page">
        {/* Section 1: Hero */}
        <section className="service-section">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-16">
            <div className="w-full lg:w-1/2 space-y-6">
              <p className="font-body text-gold uppercase tracking-[0.2em] text-sm font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
                GRAPHIC DESIGNING
              </p>
              <h1 className="font-heading font-bold text-3xl md:text-2xl lg:text-4xl leading-tight mb-6 shimmer-wave text-gradient-gold" style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}>
                Creativity that Speaks Volumes
              </h1>
              <p className="service-text text-base md:text-lg" style={{ fontFamily: "'Inter', sans-serif" }}>
                Top-tier graphic designing services that transform your ideas into visually stunning designs.
                From branding and marketing materials to digital graphics, we deliver creative solutions that
                captivate and engage your audience.
              </p>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="image-container aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/graphicdesign.webp"
                  alt="Graphic Designing"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Know About + Features Glass Card */}
        <section className="service-section">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <div className="w-full lg:w-3/5 space-y-6">
              <h2 className="font-heading font-bold text-3xl md:text-2xl lg:text-4xl leading-tight mb-6 shimmer-wave text-gradient-gold" style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}>
                Know About Graphic Designing
              </h2>
              <p className="service-text text-sm md:text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
                Graphic design is a powerful tool for communicating your brand's message and establishing a strong
                visual identity. At Govindani Infotech Pvt. Ltd., we specialize in creating eye-catching designs
                that resonate with your target audience. Our comprehensive graphic designing services encompass a
                wide range of solutions, including branding, marketing materials, digital graphics, and more.
              </p>
              <p className="service-text-muted text-sm md:text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
                Our team of skilled designers works closely with you to understand your vision and objectives. We
                utilize the latest design software and techniques to ensure that every project is executed to the
                highest standards of quality and creativity. Whether you need a new logo, brochure, social media
                graphics, or an entire brand identity, we have the expertise to deliver exceptional results that
                align with your brand's values and goals.
              </p>

              <div className="mt-8">
                <h3 className="service-subheading text-xl md:text-2xl mb-4" style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}>
                  Key Components of Our Graphic Designing Service
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {keyComponents.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-gold flex-shrink-0" />
                      <span className="service-text text-sm md:text-base" style={{ fontFamily: "'Inter', sans-serif" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full lg:w-2/5">
              <div className="glass-card p-6 md:p-8 space-y-1">
                <h3 className="service-heading text-lg md:text-xl mb-6" style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}>Features</h3>
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 py-4 border-b last:border-b-0"
                    style={{ borderColor: 'hsla(43, 74%, 49%, 0.15)' }}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, hsla(43, 74%, 49%, 0.2), hsla(43, 74%, 49%, 0.05))' }}
                    >
                      <span className="text-gold font-bold text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    <span className="service-text text-sm md:text-base font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Our Graphics */}
        <section className="service-section">
          <h2 className="service-heading text-2xl md:text-3xl lg:text-4xl text-center mb-12" style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}>
            Have a Look at Our Graphics
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {graphicImages.map((item, index) => (
              <div
                key={index}
                className="glass-card overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
              >
                <div className="image-container aspect-[9/9]">
                  <img
                    src={item.image}
                    alt={`Graphic design ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Services Section */}
        <ContactUsForm />
        <ServiceSection />
      </div>
    </>
  );
};

export default GraphicDesigner;