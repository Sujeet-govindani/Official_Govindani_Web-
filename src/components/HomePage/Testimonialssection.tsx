import React, { useEffect, useRef, useState } from 'react';

interface ClientData {
  image: string;
  name: string;
}

interface PartnerData {
  image: string;
  name: string;
}

const ClientTestimonialSection: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const row1: ClientData[] = [
    { image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Logo-Designing/Logos/muktaShop.webp', name: 'MUKTA' },
    { image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Logo-Designing/Logos/Animals-Matter-To-Me.png', name: 'Animals Matter to Me' },
    { image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Logo-Designing/Logos/JungleBrook.webp', name: 'JUNGLE BROOKE' },
    { image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Logo-Designing/Logos/Gau-Seva-Dham-Hospital.webp', name: 'GausevaDham' },
    { image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Logo-Designing/Logos/Nitynand-Ashram.webp', name: 'Nityanand Ashram' },
    { image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Logo-Designing/Logos/RBNEUROZYME.webp', name: 'RBNEUROZYME' },
  ];

  const row2: ClientData[] = [
    { image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Logo-Designing/Logos/KhambaniFoods.webp', name: 'Khambani' },
    { image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Logo-Designing/Logos/BabajikiButiLogo.webp', name: 'Babaji Ki Buti' },
    { image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Logo-Designing/Logos/Nanhi-Pari-Foundation.webp', name: 'Nanhi Pari' },
    { image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Logo-Designing/Logos/ThePerfumeByGoldy.webp', name: 'GP The Perfume' },
    { image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Logo-Designing/Logos/GSD-Organics.webp', name: 'GSD Organics' },
    { image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Services/All/Services-Logo-Designing/Logos/Real-Vr-Logo-1.webp', name: 'Realtor VR' },
  ];

  const partnerRow1: PartnerData[] = [
    { image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Razorpay-logo.png', name: 'Razorpay' },
    { image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Cashfree-logo.png', name: 'CashFree' },
    { image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PhonePe-Logo.png', name: 'PhonePe' },
    { image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PAYU-logo.webp', name: 'PayU' },
    { image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/StripeLogo.png', name: 'Stripe' },
    { image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Shopify-logo.png', name: 'Shopify' },
    { image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PickrrLogo.png', name: 'Pickrr' },
    { image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ShipwayLogo.webp', name: 'WooCommerce' },
    { image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/woocommlogo.png', name: 'Shipway' },
    { image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/shiprocket.webp', name: 'Shiprocket' },
    { image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/interakt.png', name: 'Interakt' },
    { image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/watilogo.png', name: 'Wati' },
    { image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/TwilioLogo.png', name: 'Twilio' },
    { image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/GupshupLogo.png', name: 'GupShup' },
    { image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/MSG91Logo.jfif', name: 'MSG91' },
    { image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/hostinger.png', name: 'Hostinger' },
  ];

  const partnerRow2: PartnerData[] = [
    { image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/aws.png', name: 'AWS' },
    { image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/GCloud-logo.png', name: 'Google Cloud' },
    { image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/DO.webp', name: 'DigitalOcean' },
    { image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Godaddy-logo.png', name: 'GoDaddy' },
    { image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/zohologo.png', name: 'Partner 11' },
    { image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/mailchimp-logo.webp', name: 'Mailchimp' },
    { image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/moengage-logo.png', name: 'Partner 14' },
    { image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/signzy-logo.png', name: 'Signzy' },
    { image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/IdfyLogo.avif', name: 'Idfy' },
    { image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/tally-logo.png', name: 'Tally' },
    { image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/VyaparLogo.webp', name: 'Vyapar' },
    { image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/QuickBookLogo.png', name: 'QuickBooks' },
    { image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/gupshup-logo.png', name: 'GupShup' },
  ];

  const partnerRow1Ref = useRef<HTMLDivElement>(null);
  const partnerRow2Ref = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Restart animations cleanly on mount
  useEffect(() => {
    [row1Ref, row2Ref, partnerRow1Ref, partnerRow2Ref].forEach(ref => {
      if (ref.current) {
        ref.current.style.animation = 'none';
        void ref.current.offsetHeight; // force reflow
        ref.current.style.animation = '';
      }
    });
  }, []);

  // Parallax-style mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
      setMousePos({ x, y });
    };
    const section = sectionRef.current;
    section?.addEventListener('mousemove', handleMouseMove);
    return () => section?.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const ColLabel = ({ text }: { text: string }) => (
    <div className="text-center mb-6">
      <h3
        className="font-baskerville text-lg sm:text-xl md:text-2xl font-black tracking-wide"
        style={{
          background: 'linear-gradient(135deg, #D4AF37 0%, #F5E6D3 25%, #FFD700 50%, #F5E6D3 75%, #D4AF37 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 1px 6px rgba(212, 175, 55, 0.35))',
        }}
      >
        {text}
      </h3>
      <div className="flex items-center justify-center gap-2 mt-2">
        <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#D4AF37]" style={{ opacity: 0.5 }} />
        <div className="w-1 h-1 rounded-full bg-[#D4AF37]" style={{ opacity: 0.6 }} />
        <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#D4AF37]" style={{ opacity: 0.5 }} />
      </div>
    </div>
  );

  const orb1X = 10 + mousePos.x * 20;
  const orb1Y = 10 + mousePos.y * 20;
  const orb2X = 60 + mousePos.x * -15;
  const orb2Y = 50 + mousePos.y * -15;
  const orb3X = 30 + mousePos.x * 10;
  const orb3Y = 70 + mousePos.y * 10;

  return (
    <div
      id="collaborations"
      ref={sectionRef}
      className="w-full py-12 md:py-16 overflow-hidden relative"
      style={{
        background: `
          radial-gradient(ellipse 70% 60% at ${orb1X}% ${orb1Y}%, rgba(30, 20, 5, 0.95) 0%, transparent 65%),
          radial-gradient(ellipse 60% 55% at ${orb2X}% ${orb2Y}%, rgba(45, 28, 5, 0.9) 0%, transparent 60%),
          radial-gradient(ellipse 55% 65% at ${orb3X}% ${orb3Y}%, rgba(20, 12, 2, 0.85) 0%, transparent 70%),
          linear-gradient(135deg,
            #0a0702 0%, #120d04 15%, #1a1006 30%, #0e0b05 45%,
            #161209 60%, #0c0903 75%, #100c05 90%, #080601 100%
          )
        `,
        transition: 'background 0.15s ease-out',
      }}
    >
      {/* Animated background overlays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute rounded-full" style={{ width: '70%', height: '70%', top: '-10%', left: '-5%', background: 'radial-gradient(ellipse, rgba(212,175,55,0.07) 0%, rgba(184,134,11,0.04) 40%, transparent 70%)', animation: 'driftA 18s ease-in-out infinite alternate', filter: 'blur(40px)' }} />
        <div className="absolute rounded-full" style={{ width: '60%', height: '60%', bottom: '-15%', right: '-5%', background: 'radial-gradient(ellipse, rgba(245,230,211,0.06) 0%, rgba(212,175,55,0.04) 35%, transparent 65%)', animation: 'driftB 22s ease-in-out infinite alternate', filter: 'blur(50px)' }} />
        <div className="absolute rounded-full" style={{ width: '40%', height: '40%', top: '30%', left: '30%', background: 'radial-gradient(ellipse, rgba(180,100,20,0.05) 0%, transparent 70%)', animation: 'driftC 14s ease-in-out infinite alternate', filter: 'blur(60px)' }} />
        <div className="absolute inset-0" style={{ backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 80px, rgba(212,175,55,0.015) 80px, rgba(212,175,55,0.015) 81px)` }} />
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`, backgroundSize: '180px 180px' }} />
        {[...Array(8)].map((_, i) => (
          <div key={i} className="absolute rounded-full" style={{ width: i % 3 === 0 ? '3px' : '2px', height: i % 3 === 0 ? '3px' : '2px', left: `${10 + i * 11}%`, top: `${15 + (i * 17) % 70}%`, background: i % 2 === 0 ? 'rgba(212,175,55,0.5)' : 'rgba(245,230,211,0.4)', animation: `floatParticle ${6 + i * 1.5}s ease-in-out infinite`, animationDelay: `${i * 0.8}s` }} />
        ))}
        <div className="absolute top-0 left-0 right-0 h-24" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 100%)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-24" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)' }} />
      </div>

      <style>{`
        .font-baskerville {
          font-family: 'Libre Baskerville', serif;
          font-weight: 900 !important;
        }

        /* KEY FIX: use width:max-content so -50% is exactly half of all items */
        .marquee-inner          { width: max-content; animation: marqueeScroll 20s linear infinite !important; }
        .marquee-inner-reverse  { width: max-content; animation: marqueeScrollReverse 24s linear infinite !important; }
        .partner-marquee-left   { width: max-content; animation: marqueeScroll 40s linear infinite !important; }
        .partner-marquee-right  { width: max-content; animation: marqueeScrollReverse 45s linear infinite !important; }

        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marqueeScrollReverse {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }

        @keyframes driftA {
          0%   { transform: translate(0%, 0%) scale(1); }
          50%  { transform: translate(8%, 6%) scale(1.08); }
          100% { transform: translate(4%, 12%) scale(0.95); }
        }
        @keyframes driftB {
          0%   { transform: translate(0%, 0%) scale(1); }
          50%  { transform: translate(-6%, -8%) scale(1.05); }
          100% { transform: translate(-10%, 4%) scale(0.98); }
        }
        @keyframes driftC {
          0%   { transform: translate(0%, 0%) scale(1); }
          100% { transform: translate(5%, -5%) scale(1.1); }
        }
        @keyframes floatParticle {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          25%       { transform: translateY(-12px) translateX(4px); opacity: 0.7; }
          50%       { transform: translateY(-6px) translateX(-4px); opacity: 0.5; }
          75%       { transform: translateY(-18px) translateX(2px); opacity: 0.6; }
        }

        @media (max-width: 767px) {
          .marquee-inner          { animation-duration: 16s !important; }
          .marquee-inner-reverse  { animation-duration: 20s !important; }
          .partner-marquee-left   { animation-duration: 28s !important; }
          .partner-marquee-right  { animation-duration: 32s !important; }
        }

        .marquee-track {
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            rgba(0,0,0,0.2) 6%,
            rgba(0,0,0,0.7) 12%,
            black 20%,
            black 80%,
            rgba(0,0,0,0.7) 88%,
            rgba(0,0,0,0.2) 94%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            rgba(0,0,0,0.2) 6%,
            rgba(0,0,0,0.7) 12%,
            black 20%,
            black 80%,
            rgba(0,0,0,0.7) 88%,
            rgba(0,0,0,0.2) 94%,
            transparent 100%
          );
        }
      `}</style>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADING */}
        <div className="text-center mb-10 md:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <div className="flex gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#F5E6D3]/70 animate-pulse" style={{ animationDelay: '300ms' }} />
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" style={{ animationDelay: '600ms' }} />
            </div>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>
          <h2
            className="font-baskerville text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight"
            style={{
              background: 'linear-gradient(135deg, #D4AF37 0%, #F5E6D3 25%, #FFD700 50%, #F5E6D3 75%, #D4AF37 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 2px 8px rgba(212, 175, 55, 0.4))',
            }}
          >
            Our Partners &amp; Collaborations
          </h2>
          <p className="mt-3 text-sm md:text-base font-medium" style={{ color: '#E8DCC4', opacity: 0.7 }}>
            Powering Growth &nbsp;·&nbsp; Trusted by Industry Leaders Worldwide
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <div className="w-2 h-2 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#F5E6D3]/40" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>
        </div>

        {/* TWO COLUMNS */}
        <div className="flex flex-col md:flex-row md:items-start gap-0">

          {/* LEFT Proud Partners */}
          <div className="w-full md:w-1/2 flex flex-col md:pr-6 lg:pr-10 pb-12 md:pb-0">
            <ColLabel text="Proud Partners" />

            {/* Partner Row 1 scroll left */}
            <div className="marquee-track overflow-hidden w-full relative select-none mb-5">
              <div ref={partnerRow1Ref} className="partner-marquee-left flex items-center">
                {/* Duplicate the full 16-item array so -50% lands on the seam */}
                {[...partnerRow1, ...partnerRow1].map((partner, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-28 sm:w-32 flex items-center justify-center mx-3"
                  >
                    <img
                      src={partner.image}
                      alt={partner.name}
                      className="w-full h-16 sm:h-20 object-contain"
                      draggable={false}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Partner Row 2 scroll right */}
            <div className="marquee-track overflow-hidden w-full relative select-none">
              <div ref={partnerRow2Ref} className="partner-marquee-right flex items-center">
                {[...partnerRow2, ...partnerRow2].map((partner, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-28 sm:w-32 flex items-center justify-center mx-3"
                  >
                    <img
                      src={partner.image}
                      alt={partner.name}
                      className="w-full h-16 sm:h-20 object-contain"
                      draggable={false}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Vertical divider desktop */}
          <div
            className="hidden md:block flex-shrink-0 w-px self-stretch"
            style={{ background: 'linear-gradient(to bottom, transparent 0%, #D4AF37 25%, #D4AF37 75%, transparent 100%)', opacity: 0.25 }}
          />

          {/* Horizontal divider mobile */}
          <div
            className="block md:hidden w-full h-px my-2"
            style={{ background: 'linear-gradient(to right, transparent, #D4AF37, transparent)', opacity: 0.25 }}
          />

          {/* RIGHT Proud Collaborations */}
          <div className="w-full md:w-1/2 flex flex-col md:pl-6 lg:pl-10 pt-10 md:pt-0">
            <ColLabel text="Proud Collaborations" />

            {/* Row 1 scroll left */}
            <div className="marquee-track overflow-hidden w-full relative select-none mb-5">
              <div ref={row1Ref} className="marquee-inner flex items-center">
                {[...row1, ...row1].map((client, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-28 sm:w-32 flex items-center justify-center mx-3"
                  >
                    <img
                      src={client.image}
                      alt={client.name}
                      className="w-full h-16 sm:h-20 object-contain"
                      draggable={false}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2 scroll right */}
            <div className="marquee-track overflow-hidden w-full relative select-none">
              <div ref={row2Ref} className="marquee-inner-reverse flex items-center">
                {[...row2, ...row2].map((client, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-28 sm:w-32 flex items-center justify-center mx-3"
                  >
                    <img
                      src={client.image}
                      alt={client.name}
                      className="w-full h-16 sm:h-20 object-contain"
                      draggable={false}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ClientTestimonialSection;