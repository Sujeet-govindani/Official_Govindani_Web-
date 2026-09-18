import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ServiceSection from '@/components/HomePage/ServicesSection';
import ContactUsForm from '@/pages/ContactUsForm';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
type IconType = 'image' | 'emoji';

interface FlowStep {
  step: string;
  title: string;
  desc: string;
  icon: string;
  iconType: IconType;
  detail: string;
}

interface Comparison {
  feature: string;
  custom: boolean;
  standard: boolean;
}

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────
const flowSteps: FlowStep[] = [
  {
    step: '01',
    title: 'Customer Places Order',
    desc: 'Customer selects products, applies coupons, and proceeds to checkout on your website.',
    icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Addtocart11.webp', // ✅ Correct public-folder path
    iconType: 'image',               // ✅ Tells renderer to use <img>
    detail:
      'Our custom checkout captures all order details seamlessly product variants, quantities, delivery preferences, and payment method selection.',
  },
  {
    step: '02',
    title: 'Smart Order Processing',
    desc: 'Orders are automatically validated, inventory checked, and routed to the fulfillment pipeline.',
    icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/smartorder11.webp',
    iconType: 'image',
    detail:
      'Real-time inventory sync prevents overselling. Automatic address validation reduces RTO. Fraud detection filters out suspicious orders.',
  },
  {
    step: '03',
    title: 'Payment Gateway Integration',
    desc: 'Secure payment processing with multiple options UPI, cards, wallets, COD, and EMI.',
    icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/atmcard11.webp',
    iconType: 'image',
    detail:
      'Integrated with Razorpay, Cashfree, and PhonePe. Automatic retry on failed payments. Instant refund processing for cancellations.',
  },
  {
    step: '04',
    title: 'Shiprocket / Custom Logistics',
    desc: 'Auto-assign shipping partner based on location, weight, and delivery speed.',
    icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/shiprocket11.webp',
    iconType: 'image',
    detail:
      'Integration with Shiprocket, Delhivery, BlueDart, and 15+ carriers. Automated AWB generation. Rate comparison for lowest shipping cost.',
  },
  {
    step: '05',
    title: 'Real Time Tracking & Notifications',
    desc: 'Customers receive WhatsApp & SMS updates at every milestone from order placed to delivered.',
    icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/realtime11.webp',
    iconType: 'image',
    detail:
      'Branded tracking page. Automated notifications on dispatch, out-for-delivery, and delivery. NDR management for failed deliveries.',
  },
  {
    step: '06',
    title: 'Post Delivery & Returns',
    desc: 'Automated review collection, return/exchange flow, and analytics dashboard.',
    icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/postdelivery11.webp',
    iconType: 'image',
    detail:
      'Easy return initiation. Reverse pickup scheduling. Refund tracking. Post purchase upselling and customer feedback loops.',
  },
];

const comparisons: Comparison[] = [
  { feature: 'Custom Checkout UI', custom: true, standard: false },
  { feature: 'Multi Carrier Shipping', custom: true, standard: true },
  { feature: 'WhatsApp Notifications', custom: true, standard: false },
  { feature: 'Branded Tracking Page', custom: true, standard: false },
  { feature: 'COD Verification Calls', custom: true, standard: false },
  { feature: 'Abandoned Cart Recovery', custom: true, standard: false },
  { feature: 'Auto Rate Comparison', custom: true, standard: true },
  { feature: 'NDR Management', custom: true, standard: true },
  { feature: 'Custom Analytics Dashboard', custom: true, standard: false },
  { feature: 'Fraud Detection', custom: true, standard: false },
];

// ─────────────────────────────────────────────
// StepIcon renders <img> OR emoji correctly
// ─────────────────────────────────────────────
interface StepIconProps {
  icon: string;
  iconType: IconType;
  title: string;
  size?: 'sm' | 'lg'; // sm = sidebar list, lg = detail panel
}

const StepIcon: React.FC<StepIconProps> = ({ icon, iconType, title, size = 'sm' }) => {
  if (iconType === 'image') {
    // Inline styles guarantee size regardless of global CSS conflicts
    const style: React.CSSProperties =
      size === 'sm'
        ? { width: '36px', height: '36px', objectFit: 'contain', flexShrink: 0, display: 'block' }
        : { width: '56px', height: '56px', objectFit: 'contain', flexShrink: 0, display: 'block' };

    return <img src={icon}
        alt=""
        aria-hidden="true" alt={title} style={style} loading="lazy" decoding="async" />;
  }

  // emoji
  const style: React.CSSProperties =
    size === 'sm'
      ? { fontSize: '1.5rem', lineHeight: 1, flexShrink: 0 }
      : { fontSize: '2.8rem', lineHeight: 1, flexShrink: 0 };

  return <span style={style} aria-label={title}>{icon}</span>;
};

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────
const CheckoutSystem: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const active = flowSteps[activeStep];

  return (
    <div className="service-page">

      {/* ── Section 1: Hero ── */}
      <section className="service-section">
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h1 className="service-heading text-3xl md:text-3xl lg:text-4xl leading-tight">
            The Checkout Experience Your{' '} <br />
            <span className="service-heading text-3xl md:text-3xl lg:text-4xl leading-tight">Customers Deserve</span>
          </h1>
          <p className="service-text text-base md:text-lg max-w-2xl mx-auto">
            A fully custom, end to end checkout and order management system from the moment
            a customer clicks "Buy Now" to the delivery at their doorstep and beyond.
          </p>
        </div>

        <div className="mt-12">
          <div className="image-container aspect-[21/9] rounded-2xl overflow-hidden max-w-5xl mx-auto">
            <img
              src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ACS.webp"
              alt="Advanced Checkout System"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── Section 2: Interactive Flow ── */}
      <section className="service-section">
        <h2 className="service-heading text-2xl md:text-3xl lg:text-4xl text-center mb-12">
          How It Works The Complete Flow
        </h2>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

          {/* Left: Step selector */}
          <div className="w-full lg:w-2/5 space-y-3">
            {flowSteps.map((step, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className="w-full text-left p-4 md:p-5 rounded-xl transition-all duration-300"
                style={{
                  background:
                    activeStep === i
                      ? 'linear-gradient(135deg, hsla(43,74%,49%,0.15), hsla(43,74%,49%,0.05))'
                      : 'hsla(0,0%,100%,0.02)',
                  border:
                    activeStep === i
                      ? '1px solid hsla(43,74%,49%,0.4)'
                      : '1px solid hsla(0,0%,100%,0.06)',
                  transform: activeStep === i ? 'scale(1.02)' : 'none',
                }}
              >
                <div className="flex items-center gap-3" style={{ minWidth: 0 }}>
                  {/* Icon: fixed size, never stretches the row */}
                  <div style={{ flexShrink: 0 }}>
                    <StepIcon icon={step.icon} iconType={step.iconType} title={step.title} size="sm" />
                  </div>
                  {/* Text: takes remaining space, wraps naturally */}
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <span className="text-gold font-body text-xs font-semibold block">
                      STEP {step.step}
                    </span>
                    <h3
                      className="font-heading text-cream font-bold"
                      style={{ fontSize: '0.875rem', lineHeight: '1.35', wordBreak: 'break-word' }}
                    >
                      {step.title}
                    </h3>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Right: Step detail */}
          <div className="w-full lg:w-3/5">
            <div className="glass-card p-8 md:p-10 lg:p-12 h-full flex flex-col justify-center">

              {/* ✅ Large icon in detail panel */}
              <div className="mb-6">
                <StepIcon icon={active.icon} iconType={active.iconType} title={active.title} size="lg" />
              </div>

              <span className="text-gold font-body text-sm font-semibold uppercase tracking-widest">
                Step {active.step}
              </span>

              <h3 className="font-heading text-cream text-2xl md:text-3xl font-bold mt-2 mb-4">
                {active.title}
              </h3>

              <p className="service-text text-base md:text-lg mb-6">
                {active.desc}
              </p>

              <p className="service-text-muted text-sm md:text-base">
                {active.detail}
              </p>



            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: Comparison Table ── */}
      <section className="service-section">
        <h2 className="service-heading text-2xl md:text-3xl lg:text-4xl text-center mb-4">
          Custom vs Standard Checkout
        </h2>
        <p className="service-text-muted text-center max-w-xl mx-auto mb-12">
          See why businesses choose our advanced checkout system over default solutions.
        </p>

        <div className="glass-card overflow-hidden max-w-3xl mx-auto">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid hsla(43,74%,49%,0.2)' }}>
                  <th className="text-left p-4 md:p-5 font-heading text-cream text-sm md:text-base">
                    Feature
                  </th>
                  <th className="text-center p-4 md:p-5 font-heading text-gold text-sm md:text-base">
                    Our System
                  </th>
                  <th className="text-center p-4 md:p-5 font-heading text-muted-foreground text-sm md:text-base">
                    Standard
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid hsla(0,0%,100%,0.05)' }}>
                    <td className="p-4 md:p-5 service-text text-sm md:text-base">{row.feature}</td>
                    <td className="p-4 md:p-5 text-center text-xl">{row.custom ? '✅' : '❌'}</td>
                    <td className="p-4 md:p-5 text-center text-xl">{row.standard ? '✅' : '❌'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Section 4: Shiprocket Integration ── */}
      <section className="service-section">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <div className="w-full lg:w-1/2">
            <div className="image-container aspect-[4/3] rounded-2xl overflow-hidden">
              <img
                src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ShiprocketIntegration.webp"
                alt="Shiprocket Integration"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-6">
            <h2 className="service-heading text-2xl md:text-3xl">
              Powered by Shiprocket & Beyond
            </h2>
            <p className="service-text text-base md:text-lg">
              We integrate with Shiprocket for automated shipping but we don't stop there.
              Our custom layer adds intelligent carrier selection, branded tracking, and
              WhatsApp-based delivery updates that standard Shiprocket integrations simply can't offer.
            </p>
            <div className="space-y-3">
              {[
                '15+ Carrier Partners',
                'Automated AWB Generation',
                'Real Time Rate Comparison',
                'NDR & RTO Management',
                'Reverse Logistics',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-gold flex-shrink-0" />
                  <span className="service-text text-sm md:text-base">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 5: CTA ── */}
      {/* <section className="service-section text-center">
        <div className="glass-card p-8 md:p-12 lg:p-16 max-w-3xl mx-auto">
          <h3 className="service-subheading text-xl md:text-2xl lg:text-3xl mb-4">
            Ready to Upgrade Your Checkout?
          </h3>
          <p className="service-text-muted text-sm md:text-base mb-8 max-w-xl mx-auto">
            Stop losing customers at checkout. Our advanced system increases conversion rates,
            reduces RTO, and delivers a premium buying experience.
          </p>
          <Link to="/contact-us" className="cta-button">
            Get a Demo
          </Link>
        </div>
      </section> */}

      {/* Services Section */}
      <ContactUsForm />
      <ServiceSection />
      <style>{`

        .service-page {
          font-family: 'Inter', sans-serif;
          padding-top: 100px !important;
        }

        @media (max-width: 768px) {
          .service-page {
            padding-top: 85px !important;
          }
          .service-section {
            padding: 2.5rem 1.25rem !important;
          }
          /* Ensure hero section heading has proper top padding */
          section.service-section:first-of-type {
            padding-top: 4rem !important;
            padding-bottom: 1.5rem !important;
          }
          /* Specific fix for Custom vs Standard Checkout top gap */
          section.service-section:nth-of-type(3) {
            padding-top: 1.5rem !important;
          }
          .service-heading {
            margin-top: 0 !important;
          }
          .mt-12 {
            margin-top: 2rem !important;
          }
          .mb-12 {
            margin-bottom: 2rem !important;
          }
        }

        h1, h2, h3, h4, h5, h6,
        .service-heading,
        .font-heading {
          font-family: 'Libre Baskerville', serif !important;
        }

        p, span, div, li, td, th, button, label, input, textarea,
        .service-text,
        .service-text-muted,
        .font-body {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
    </div>
  );
};

export default CheckoutSystem;