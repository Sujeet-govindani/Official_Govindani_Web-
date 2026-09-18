import React, { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Service {
  icon: string;
  iconImage: string;
  title: string;
  description: string;
  categories: string[];
  slug: string;
}

const useIsMobile = () => {
  const [mobile, setMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const cb = (e: MediaQueryListEvent) => setMobile(e.matches);
    mq.addEventListener('change', cb);
    return () => mq.removeEventListener('change', cb);
  }, []);
  return mobile;
};

const ServiceSection = () => {
  const isMobile = useIsMobile();

  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [isDropdownOpen, setIsDropdownOpen]     = useState(false);
  const [activeCardIndex, setActiveCardIndex]   = useState<number | null>(null);
  const [typingText, setTypingText]             = useState<string>('Industry');
  const [mobileShowAll, setMobileShowAll]       = useState(false);

  const cardsRef           = useRef<HTMLDivElement>(null);
  const sectionRef         = useRef<HTMLDivElement>(null);
  const dropdownRef        = useRef<HTMLDivElement>(null);
  const autoRevealTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef      = useRef<ReturnType<typeof setTimeout> | null>(null);

  const rawServices = [
    {
      icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/SMMICON.webp',
      iconImage: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/SMMICON.webp',
      title: 'Social Media Marketing',
      description: 'Strategic content creation and account management to build digital authority.',
      categories: ['real-estate', 'ngo', 'ecommerce', 'healthcare', 'numerology', 'personal-brands'],
      slug: '/services/social-media-marketing#/social-media',
    },
    {
      icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/SEOICON.webp',
      iconImage: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/SEOICON.webp',
      title: 'SEO',
      description: 'Search engine optimization to improve rankings, visibility, and organic traffic.',
      categories: ['real-estate', 'ngo', 'ecommerce', 'healthcare', 'numerology', 'personal-brands'],
      slug: '/services//services/social-media-marketing#/seo',
    },
    {
      icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/WAICON.webp',
      iconImage: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/WAICON.webp',
      title: 'WhatsApp Automation',
      description: 'Automated WhatsApp systems for lead capture, support, and sales conversion.',
      categories: ['ngo', 'ecommerce', 'numerology', 'personal-brands', 'healthcare', 'real-estate'],
      slug: '/services//services/social-media-marketing#/services/whatsapp-flow',
    },
    {
      icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/WCICON.webp',
      iconImage: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/WCICON.webp',
      title: 'Website Development',
      description: 'Custom, high-performance websites built to generate leads, sales, and brand authority.',
      categories: ['real-estate', 'ngo', 'ecommerce', 'healthcare', 'numerology', 'personal-brands'],
      slug: '/services/website-development#/services/website-creation',
    },
    {
      icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/MADSICON.png',
      iconImage: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/MADSICON.png',
      title: 'Meta Ads',
      description: 'High-converting Facebook and Instagram advertising for brand awareness and sales.',
      categories: ['real-estate', 'ngo', 'ecommerce', 'healthcare', 'numerology', 'personal-brands'],
      slug: '/services/meta-ads#/services/meta-ads',
    },
    {
      icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/VIDEOGRAPHYICON.webp',
      iconImage: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/VIDEOGRAPHYICON.webp',
      title: 'Videography',
      description: 'High-quality video production for marketing, branding, and promotional campaigns.',
      categories: ['ngo', 'numerology', 'personal-brands', 'real-estate'],
      slug: '/services/videography#/services/videography',
    },
    {
      icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/GRAPHICICON.webp',
      iconImage: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/GRAPHICICON.webp',
      title: 'Graphic Designs',
      description: 'Creative visual designs for digital, social, and promotional use.',
      categories: ['ngo', 'numerology', 'real-estate', 'ecommerce'],
      slug: '/services/videography#/services/graphic-designer',
    },
    {
      icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/LADSICON.webp',
      iconImage: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/LADSICON.webp',
      title: 'LinkedIn Ads',
      description: 'Targeted B2B advertising campaigns to generate premium business leads.',
      categories: ['personal-brands'],
      slug: '/services/linkedin-ads#/services/linkedin-ads',
    },
    {
      icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/GADSICON.webp',
      iconImage: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/GADSICON.webp',
      title: 'Google Ads',
      description: 'Strategic Google advertising campaigns focused on ROI-driven growth.',
      categories: ['real-estate', 'ngo', 'ecommerce', 'healthcare', 'numerology', 'personal-brands'],
      slug: '/services/linkedin-ads#/services/google-ads',
    },
    {
      icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ECOMMERCEICON.webp',
      iconImage: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ECOMMERCEICON.webp',
      title: 'E-Commerce Development',
      description: 'Conversion-focused online stores with seamless payment, shipping, and automation systems.',
      categories: ['ecommerce', 'numerology'],
      slug: '/services/linkedin-ads#/services/platform-listing',
    },
    {
      icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PHOTOICON.webp',
      iconImage: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PHOTOICON.webp',
      title: 'Photography',
      description: 'Professional business, product, and brand photography to elevate visual presence.',
      categories: ['ecommerce', 'real-estate', 'personal-brands', 'ngo'],
      slug: '/services/photography#/services/photography',
    },
    {
      icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/CRMICON.webp',
      iconImage: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/CRMICON.webp',
      title: 'CRM Development',
      description: 'Industry-specific CRM systems to manage leads, sales, follow-ups, and internal workflows.',
      categories: ['real-estate', 'ngo', 'ecommerce', 'healthcare'],
      slug: '/services//services/#/pages/CI%20CRM',
    },
    {
      icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/APPDICON.webp',
      iconImage: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/APPDICON.webp',
      title: 'App Development',
      description: 'Android and iOS applications designed to improve customer engagement and operational efficiency.',
      categories: ['real-estate', 'healthcare'],
      slug: '/services/#/pages/Hotel%20CRM',
    },
    {
      icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PGIICON.webp',
      iconImage: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PGIICON.webp',
      title: 'Payment Gateway Integration',
      description: 'Secure and seamless integration of payment systems for online transactions and donations.',
      categories: ['ecommerce', 'ngo', 'healthcare', 'real-estate'],
      slug: '/services/payment-gateway#/services/payment-gateway',
    },
    {
      icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/LIICON.webp',
      iconImage: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/LIICON.webp',
      title: 'Logistics Integration',
      description: 'Automated shipping and delivery integration with leading logistics partners.',
      categories: ['ecommerce'],
      slug: '/services/logistic-integration#/services/logistic-integration',
    },
    {
      icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/MPBLICON.webp',
      iconImage: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/MPBLICON.webp',
      title: 'Marketplace Brand Listing',
      description: 'Complete onboarding and optimization of brands on platforms like Amazon, Myntra, Nykaa, and Flipkart.',
      categories: ['numerology', 'ecommerce'],
      slug: '/services/marketplace-brand-listing#/services/marketplace-brand-listing',
    },
    {
      icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/LGICON.png',
      iconImage: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/LGICON.png',
      title: 'Lead Generation Systems',
      description: 'Performance-driven systems to capture, nurture, and convert high-quality leads.',
      categories: ['numerology', 'personal-brands', 'real-estate', 'ngo'],
      slug: '/services/app-development#/lead-generation',
    },
    {
      icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/LDICON.png',
      iconImage: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/LDICON.png',
      title: 'Branding And Logo Design',
      description: 'Professional brand identity development that builds trust and recognition.',
      categories: ['numerology', 'personal-brands'],
      slug: '/services/app-development#/services/logo-designing',
    },
    {
      icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/VEICON.webp',
      iconImage: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/VEICON.webp',
      title: 'Video Editing',
      description: 'Professional editing services to enhance storytelling and audience engagement.',
      categories: ['ecommerce', 'personal-brands'],
      slug: '/services/video-editing#/services/video-editing',
    },
    {
      icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/AAICON.webp',
      iconImage: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/AAICON.webp',
      title: 'AI Automation',
      description: 'AI-powered workflows to automate communication, operations, and customer journeys.',
      categories: ['numerology', 'personal-brands', 'real-estate', 'ngo', 'ecommerce', 'healthcare'],
      slug: '/services/ai-automation#/services/ai-automation',
    },
    // ── Newly added services ──
    {
      icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/360VT.webp',
      iconImage: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/360VT.webp',
      title: '360° Virtual Tour',
      description: 'Immersive 360-degree virtual tours for real estate, hospitality, and retail showrooms.',
      categories: ['real-estate', 'ecommerce', 'healthcare'],
      slug: '/services/Virtual-Tours#/services/Virtual-Tours',
    },
    {
      icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PSICON.webp',
      iconImage: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PSICON.webp',
      title: 'Product Shoot',
      description: 'Studio-quality product photography crafted to boost conversions and brand appeal.',
      categories: ['ecommerce', 'personal-brands', 'numerology'],
      slug: '/services/product-shoot#/services/product-shoot',
    },
  ];

  const services: Service[] = rawServices;

  const industries = [
    { id: 'all',             label: 'All Industries',    color: 'from-[#d4af37] to-[#f4e5b8]' },
    { id: 'real-estate',     label: 'Real Estate',       color: 'from-[#d4af37] to-[#c9a961]' },
    { id: 'ngo',             label: 'NGO & Foundations', color: 'from-[#c9a961] to-[#e8d5a1]' },
    { id: 'ecommerce',       label: 'E-commerce',        color: 'from-[#f4e5b8] to-[#d4af37]' },
    { id: 'healthcare',      label: 'Healthcare',        color: 'from-[#e8d5a1] to-[#c9a961]' },
    { id: 'numerology',      label: 'Numerology',        color: 'from-[#c9a961] to-[#e8d5a1]' },
    { id: 'personal-brands', label: 'Personal Brands',   color: 'from-[#d4af37] to-[#e8d5a1]' },
  ];

  // ── Dropdown hover helpers ────────────────────────────────────────
  const scheduleClose = useCallback(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => setIsDropdownOpen(false), 150);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  }, []);

  // ── Typing animation ──────────────────────────────────────────────
  useEffect(() => {
    const seq = ['Industry', 'Real Estate', 'NGO & Foundations', 'E-Commerce', 'Healthcare', 'Numerology', 'Personal Brands'];
    const startIdx: Record<string, number> = {
      'all': 0, 'real-estate': 1, 'ngo': 2, 'ecommerce': 3, 'healthcare': 4, 'numerology': 5, 'personal-brands': 6,
    };
    let ci = startIdx[selectedIndustry] ?? 0, ch = 0, del = false;
    let t: ReturnType<typeof setTimeout>;
    const run = () => {
      const cur = seq[ci];
      if (!del && ch <= cur.length)   { setTypingText(cur.substring(0, ch++)); t = setTimeout(run, 100); }
      else if (!del)                  { t = setTimeout(() => { del = true; run(); }, 3000); }
      else if (del && ch > 0)         { setTypingText(cur.substring(0, --ch)); t = setTimeout(run, 50); }
      else { del = false; ci = (ci + 1) % seq.length; t = setTimeout(run, 400); }
    };
    run();
    return () => clearTimeout(t);
  }, [selectedIndustry]);

  const getDisplayServices = useCallback(() => {
    if (selectedIndustry === 'all') return services;
    return [
      ...services.filter(s =>  s.categories.includes(selectedIndustry)),
      ...services.filter(s => !s.categories.includes(selectedIndustry)),
    ];
  }, [selectedIndustry]);

  const displayServices = getDisplayServices();
  useEffect(() => { setMobileShowAll(false); }, [selectedIndustry]);

  // ── Auto-reveal timer (desktop) ───────────────────────────────────
  useEffect(() => {
    if (isMobile) return;
    if (autoRevealTimerRef.current) clearTimeout(autoRevealTimerRef.current);
    setActiveCardIndex(null);
    let ci = 0;
    const showImg = () => {
      setActiveCardIndex(ci);
      autoRevealTimerRef.current = setTimeout(() => {
        setActiveCardIndex(null);
        ci = (ci + 1) % displayServices.length;
        autoRevealTimerRef.current = setTimeout(showImg, 1200);
      }, 3500);
    };
    autoRevealTimerRef.current = setTimeout(showImg, 7500);
    return () => { if (autoRevealTimerRef.current) clearTimeout(autoRevealTimerRef.current); };
  }, [displayServices.length, selectedIndustry, isMobile]);

  // ── Outside-click closes dropdown ─────────────────────────────────
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setIsDropdownOpen(false);
    };
    if (isDropdownOpen) document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [isDropdownOpen]);

  const handleIndustrySelect = (id: string) => { setSelectedIndustry(id); setIsDropdownOpen(false); };

  // ── Navigate to the specific service page ─────────────────────────
  const navigateTo = useCallback((slug: string) => {
    window.location.href = `/services/${slug}`;
  }, []);

  // ── Card interactions ─────────────────────────────────────────────
  const handleCardClick = useCallback((service: Service, index: number) => {
    if (isMobile) {
      if (activeCardIndex === index) {
        navigateTo(service.slug);
      } else {
        setActiveCardIndex(index);
      }
    } else {
      navigateTo(service.slug);
    }
  }, [isMobile, activeCardIndex, navigateTo]);

  const handleCardHover = useCallback((i: number) => { if (!isMobile) setActiveCardIndex(i); }, [isMobile]);
  const handleCardLeave = useCallback(() => { if (!isMobile) setActiveCardIndex(null); }, [isMobile]);
  useEffect(() => { setActiveCardIndex(null); }, [selectedIndustry]);

  // ── GSAP card entrance ────────────────────────────────────────────
  useEffect(() => {
    if (isMobile || !cardsRef.current) return;
    Array.from(cardsRef.current.querySelectorAll('.service-card')).forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, scale: 0.92, y: 16 },
        { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'power2.out', delay: i * 0.025 }
      );
    });
  }, [selectedIndustry, isMobile]);

  // ── Dropdown panel ────────────────────────────────────────────────
  const DropdownPanel = () => (
    <div
      className={`dd-panel absolute z-[300] ${isDropdownOpen ? 'dd-open' : 'dd-closed'}`}
      style={{ top: 'calc(100% + 14px)' }}
      onMouseEnter={cancelClose}
      onMouseLeave={scheduleClose}
    >
      {/* Invisible bridge so fast mouse moves don't close dropdown */}
      <div
        style={{ position: 'absolute', bottom: '100%', left: 0, width: '100%', height: '18px', background: 'transparent', zIndex: 1 }}
        onMouseEnter={cancelClose}
      />
      <div className="dd-arrow-outer" />
      <div className="dd-arrow-inner" />
      <div
        className="rounded-xl border border-[#d4af37]/30 overflow-hidden backdrop-blur-xl"
        style={{ background: 'rgba(0,0,0,0.98)', boxShadow: '0 20px 60px rgba(0,0,0,0.85),0 8px 24px rgba(212,175,55,0.2)' }}
      >
        {industries.map((ind, idx) => (
          <button
            key={ind.id}
            onClick={() => handleIndustrySelect(ind.id)}
            className={`w-full px-5 py-3.5 text-left transition-all duration-300 relative overflow-hidden group/opt
              ${idx !== industries.length - 1 ? 'border-b border-[#d4af37]/10' : ''}
              ${selectedIndustry === ind.id ? 'bg-[#d4af37]/10' : 'hover:bg-[#d4af37]/5'}`}
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${ind.color} opacity-0 group-hover/opt:opacity-10 transition-opacity duration-300`} />
            <span className={`relative z-10 flex items-center justify-between transition-all duration-300
              ${selectedIndustry === ind.id
                ? `bg-gradient-to-r ${ind.color} bg-clip-text text-transparent font-semibold`
                : 'text-slate-300 group-hover/opt:text-white'}`}
            >
              <span className="dd-label font-medium tracking-wide font-baskerville">{ind.label}</span>
              {selectedIndustry === ind.id && (
                <span className="w-2.5 h-2.5 rounded-full bg-[#d4af37] shadow-[0_0_12px_rgba(212,175,55,0.9)] ml-2 flex-shrink-0" />
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );

  // ── Render ────────────────────────────────────────────────────────
  return (
    <section id="services"
      ref={sectionRef}
      className="relative py-0 font-baskerville"
      style={{ backgroundColor: '#000', overflowX: 'clip', overflowY: 'visible' }}
    >
      {/* Background layers */}
      <div className="absolute inset-0 z-0" style={{ overflow: 'hidden' }}>
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 30% 20%,rgba(212,175,55,0.03) 0%,transparent 50%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 70% 80%,rgba(201,169,97,0.02) 0%,transparent 50%)' }} />
        {!isMobile && <>
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-[#d4af37]/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-l from-[#c9a961]/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
        </>}
        <div className="absolute inset-0 opacity-[0.01]" style={{ backgroundImage: `linear-gradient(rgba(212,175,55,0.2) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,0.2) 1px,transparent 1px)`, backgroundSize: '50px 50px' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* ── Heading + dropdown row ── */}
        <div className="text-center relative" style={{ overflow: 'visible', paddingTop: '2rem', paddingBottom: '0' }}>

          <div className={`transition-all duration-500 ${isDropdownOpen ? 'blur-md opacity-40' : ''}`}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-2 md:mb-3">
              <div className="flex flex-col items-center space-y-1 md:space-y-2">
                <span className="text-white block text-center w-full font-baskerville font-bold">Check Where We Can</span>
                <span className="text-white block text-center w-full font-baskerville font-bold">Help You With Your</span>
              </div>
            </h2>
          </div>

          <div
            className="row-shell"
            style={{ marginTop: '0.6rem', paddingBottom: '2.75rem', overflow: 'visible', position: 'relative', zIndex: 200 }}
          >
            <div
              ref={dropdownRef}
              className="row-pair"
              onMouseLeave={scheduleClose}
              onMouseEnter={cancelClose}
            >
              <button className="btn-lock new-btn" disabled>CLICK HERE →</button>

              <div className="typo-lock" style={{ overflow: 'visible', position: 'relative' }}>
                <button
                  onClick={() => setIsDropdownOpen(o => !o)}
                  onMouseEnter={() => { cancelClose(); if (!isMobile) setIsDropdownOpen(true); }}
                  onMouseLeave={scheduleClose}
                  className="typo-btn"
                >
                  <span className="typo-text bg-gradient-to-r from-[#d4af37] via-[#f4e5b8] to-[#d4af37] bg-clip-text text-transparent font-extrabold font-baskerville drop-shadow-[0_2px_10px_rgba(212,175,55,0.5)]">
                    {typingText}<span className="typing-cursor">|</span>
                  </span>
                </button>
                <DropdownPanel />
              </div>
            </div>
          </div>

          <div className={`transition-all duration-500 ${isDropdownOpen ? 'blur-md opacity-40' : ''}`}>
            <p className="text-sm md:text-base lg:text-lg text-slate-300/90 max-w-3xl mx-auto leading-relaxed px-4 font-Inter">
              Discover our comprehensive range of services designed to elevate your brand and drive measurable results
            </p>
            <div className="flex items-center justify-center gap-3 mt-6 md:mt-8">
              <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-[#d4af37]/60 to-[#d4af37]" />
              <div className="w-2 h-2 rotate-45 bg-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.6)]" />
              <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent via-[#d4af37]/60 to-[#d4af37]" />
            </div>
          </div>
        </div>

        {/* ── Cards grid ── */}
        <div className={`relative transition-all duration-500 pb-12 md:pb-16 lg:pb-20 mt-8 md:mt-10 ${isDropdownOpen ? 'blur-md opacity-40' : ''}`}>
          <div
            ref={cardsRef}
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 max-w-[1400px] mx-auto"
          >
            {displayServices.map((service, index) => {
              const isHiddenOnMobile = !mobileShowAll && index >= 6;
              const isActive    = activeCardIndex === index;
              const showContent = !isActive;
              const isMatching  = selectedIndustry === 'all' || service.categories.includes(selectedIndustry);

              return (
                <div
                  key={service.slug}
                  className={`service-card group block cursor-pointer${isHiddenOnMobile ? ' mobile-hidden-card' : ''}`}
                  onMouseEnter={() => handleCardHover(index)}
                  onMouseLeave={handleCardLeave}
                  onClick={() => handleCardClick(service, index)}
                  style={{ opacity: isMatching ? 1 : 0.35, contain: 'layout style' }}
                >
                  <div
                    className="relative h-full overflow-hidden rounded-xl transition-card min-h-[160px] sm:min-h-[180px] md:min-h-[220px]"
                    style={{
                      background: 'linear-gradient(135deg,rgba(0,0,0,0.6),rgba(0,0,0,0.5))',
                      boxShadow: isMatching && selectedIndustry !== 'all'
                        ? '0 8px 32px rgba(212,175,55,0.6),0 0 60px rgba(212,175,55,0.4),0 4px 16px rgba(0,0,0,0.3)'
                        : '0 4px 16px rgba(0,0,0,0.3)',
                      transform: 'translateZ(0)',
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                    {isMatching && selectedIndustry !== 'all' && (
                      <div className="absolute inset-0 rounded-xl border-2 border-[#d4af37] animate-pulse-glow pointer-events-none" style={{ animationDuration: '2s' }} />
                    )}

                    {/* ── Image layer (shown on hover / active) ── */}
                    <div
                      className="absolute inset-0 overflow-hidden rounded-xl flex items-center justify-center"
                      style={{
                        opacity:       showContent ? 0 : 1,
                        transform:     showContent ? 'scale(0.85) translateZ(0)' : 'scale(1) translateZ(0)',
                        transition:    'opacity .4s ease, transform .4s ease',
                        pointerEvents: showContent ? 'none' : 'auto',
                      }}
                    >
                      <img
                        src={service.icon} alt={service.title}
                        className="w-full h-full object-contain p-4"
                        loading="lazy" decoding="async"
                        style={{ objectFit: 'contain', objectPosition: 'center', display: 'block', maxWidth: '85%', maxHeight: '85%' }}
                        onError={(e) => {
                          const t = e.target as HTMLImageElement; t.style.display = 'none';
                          const fb = document.createElement('div');
                          fb.style.cssText = 'width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:4rem;';
                          fb.textContent = '🎯'; t.parentElement?.appendChild(fb);
                        }}
                      />
                      {/* Desktop click-to-navigate nudge */}
                      {!isMobile && (
                        <div className="absolute inset-0 flex items-end justify-center pb-3 pointer-events-none">
                          <span className="text-[10px] text-[#d4af37] font-baskerville font-bold tracking-widest uppercase bg-black/60 px-3 py-1 rounded-full border border-[#d4af37]/40">
                            Click to explore →
                          </span>
                        </div>
                      )}
                    </div>

                    {/* ── Content layer (default / resting) ── */}
                    <div
                      className="absolute inset-0 flex flex-col items-center justify-center card-content-padding text-center rounded-xl"
                      style={{
                        opacity:    showContent ? 1 : 0,
                        transform:  showContent ? 'scale(1) translateZ(0)' : 'scale(0.85) translateZ(0)',
                        transition: 'opacity .4s ease, transform .4s ease',
                        background: showContent
                          ? `radial-gradient(ellipse at 20% 10%,rgba(212,175,55,0.22) 0%,transparent 55%),radial-gradient(ellipse at 80% 90%,rgba(180,120,30,0.18) 0%,transparent 50%),linear-gradient(145deg,rgba(10,7,2,0.97) 0%,rgba(28,20,6,0.96) 45%,rgba(18,12,3,0.98) 100%)`
                          : 'transparent',
                      }}
                    >
                      <div className="relative z-20 flex flex-col items-center text-center w-full card-inner-padding">
                        <div className="mb-1.5 sm:mb-2 md:mb-3">
                          <img
                            src={service.iconImage} alt={`${service.title} icon`}
                            className="card-icon-size object-contain" loading="lazy" decoding="async"
                            style={{ display: 'block', filter: 'drop-shadow(0 0 10px rgba(212,175,55,0.45))' }}
                            onError={(e) => {
                              const t = e.target as HTMLImageElement; t.style.display = 'none';
                              const fb = document.createElement('span');
                              fb.className = 'card-emoji-size'; fb.textContent = '🎯';
                              t.parentElement?.appendChild(fb);
                            }}
                          />
                        </div>
                        <h3 className="card-title-size font-bold leading-tight card-title-margin w-full line-clamp-2">
                          <span className="bg-gradient-to-r from-[#d4af37] via-[#f4e5b8] to-[#d4af37] bg-clip-text text-transparent font-baskerville">
                            {service.title}
                          </span>
                        </h3>
                        <p className="card-desc-size leading-snug text-slate-300 w-full line-clamp-3 font-baskerville">
                          {service.description}
                        </p>
                        {/* Mobile hint */}
                        <div className="mt-1.5 sm:mt-2 md:mt-3 lg:hidden">
                          <span className="text-[9px] sm:text-[10px] text-[#d4af37]/70 font-medium font-baskerville">
                            {activeCardIndex === index ? 'Tap again to explore →' : 'Tap to see more'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {!isMobile && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out pointer-events-none" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {!mobileShowAll && displayServices.length > 6 && (
            <div className="view-gallery-btn-wrap">
              <button className="view-gallery-btn" onClick={() => setMobileShowAll(true)}>VIEW MORE</button>
            </div>
          )}
          {mobileShowAll && (
            <div className="view-gallery-btn-wrap">
              <button className="view-gallery-btn" onClick={() => {
                setMobileShowAll(false);
                sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}>
                VIEW LESS
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

        .font-baskerville { font-family:'Libre Baskerville',serif; }
        .font-inter       { font-family:'Inter',sans-serif!important; }

        .typing-cursor { display:inline-block; animation:blink 1s step-end infinite; margin-left:1px; }
        @keyframes blink { 0%,49%{opacity:1} 50%,100%{opacity:0} }

        .row-shell { display:flex; justify-content:center; align-items:center; overflow:visible; }
        .row-pair  { display:flex; align-items:center; gap:2.5rem; width:900px; overflow:visible; }
        .btn-lock  { flex-shrink:0; flex-grow:0; }

        .typo-lock {
          width:660px; flex-shrink:0; flex-grow:0;
          overflow:visible; position:relative; display:flex; align-items:center;
        }
        .typo-btn {
          background:none; border:none; outline:none; cursor:pointer;
          display:block; width:100%; text-align:left;
          padding:0; margin:0; line-height:1; overflow:visible;
        }
        .typo-text {
          display:block; font-size:clamp(2.25rem,4.5vw,4rem);
          line-height:1.2; white-space:nowrap; overflow:visible !important;
        }

        .dd-panel {
          position:absolute; left:0; width:16rem;
          transform-origin:top left; transition:opacity .2s ease,transform .2s ease;
        }
        .dd-open   { opacity:1; pointer-events:auto;  transform:scaleY(1); }
        .dd-closed { opacity:0; pointer-events:none;  transform:scaleY(0.93); }
        .dd-arrow-outer,.dd-arrow-inner {
          position:absolute; left:2rem; transform:translateX(-50%);
          width:0; height:0; border-left:solid transparent; border-right:solid transparent;
        }
        .dd-arrow-outer { top:-10px; border-left-width:9px; border-right-width:9px; border-bottom:10px solid rgba(212,175,55,0.45); }
        .dd-arrow-inner { top:-7px;  border-left-width:7px; border-right-width:7px;  border-bottom:8px solid rgba(0,0,0,0.98); }
        .dd-label { font-size:15px; }

        .new-btn {
          font-size:1.1rem; padding:.85rem 1.9rem;
          border:none; outline:none; border-radius:.4rem;
          cursor:default; text-transform:uppercase;
          background-color:#F5F5DC; color:#6B3A1F; font-weight:700;
          transition:.6s; white-space:nowrap; pointer-events:none;
          box-shadow:0 0 60px rgba(245,245,220,.55);
          -webkit-box-reflect:below 10px linear-gradient(to bottom,rgba(0,0,0,0),rgba(0,0,0,.4));
          animation:btnAnim 3s ease-in-out infinite;
        }
        @keyframes btnAnim {
          0%,100%{ background:#F5F5DC; box-shadow:0 0 60px rgba(245,245,220,.6); transform:scale(1); }
          50%    { background:linear-gradient(270deg,rgba(212,175,55,.681),rgba(244,229,184,.873)); box-shadow:0 0 80px rgba(212,175,55,.8); transform:scale(1.02); }
        }
        @keyframes btnAnimMobile {
          0%,100%{ background:#F5F5DC; box-shadow:0 0 30px rgba(245,245,220,.5); transform:scale(1); }
          50%    { background:linear-gradient(270deg,rgba(212,175,55,.681),rgba(244,229,184,.873)); box-shadow:0 0 40px rgba(212,175,55,.8); transform:scale(1.02); }
        }

        @media (hover:hover) { .transition-card:hover { transform:scale(1.03) translateY(-4px) translateZ(0) !important; } }
        .transition-card { transition:transform .35s ease,box-shadow .35s ease; will-change:transform; backface-visibility:hidden; }

        @keyframes pulse-glow { 0%,100%{opacity:.8;box-shadow:0 0 20px rgba(212,175,55,.5);}50%{opacity:1;box-shadow:0 0 30px rgba(212,175,55,.8);} }
        .animate-pulse-glow { animation:pulse-glow 2s ease-in-out infinite; }

        .view-gallery-btn-wrap { display:none; }
        .service-card { will-change:opacity; }
        .line-clamp-2 { overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2; }
        .line-clamp-3 { overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3; }

        .card-content-padding { padding:.75rem 1.25rem; }
        .card-inner-padding   { padding:0 .25rem; }
        .card-icon-size       { width:5.5rem; height:5.5rem; }
        .card-emoji-size      { font-size:3.25rem; }
        .card-title-size      { font-size:1.125rem; }
        .card-title-margin    { margin-bottom:.75rem; }
        .card-desc-size       { font-size:.875rem; font-family:'Inter',sans-serif!important; font-weight:400; line-height:1.5; }

        @media(max-width:1024px) and (min-width:769px){
          .card-content-padding{padding:.65rem 1rem;} .card-icon-size{width:4.75rem;height:4.75rem;} .card-title-size{font-size:1rem;} .card-title-margin{margin-bottom:.65rem;} .card-desc-size{font-size:.8rem;}
        }
        @media(max-width:768px) and (min-width:641px){
          .card-content-padding{padding:.5rem .75rem;} .card-inner-padding{padding:0 .15rem;} .card-icon-size{width:3.75rem;height:3.75rem;} .card-title-size{font-size:.8rem;} .card-title-margin{margin-bottom:.5rem;} .card-desc-size{font-size:.7rem;line-height:1.4;}
        }
        @media(max-width:640px) and (min-width:481px){
          .card-content-padding{padding:.4rem .6rem;} .card-inner-padding{padding:0 .1rem;} .card-icon-size{width:3.25rem;height:3.25rem;} .card-title-size{font-size:.7rem;} .card-title-margin{margin-bottom:.4rem;} .card-desc-size{font-size:.625rem;line-height:1.3;}
        }
        @media(max-width:480px){
          .card-content-padding{padding:.35rem .5rem;} .card-inner-padding{padding:0 .05rem;} .card-icon-size{width:2.75rem;height:2.75rem;} .card-title-size{font-size:.625rem;} .card-title-margin{margin-bottom:.35rem;} .card-desc-size{font-size:.55rem;line-height:1.25;}
        }
        @media(max-width:360px){
          .card-content-padding{padding:.3rem .4rem;} .card-icon-size{width:2.4rem;height:2.4rem;} .card-title-size{font-size:.575rem;} .card-title-margin{margin-bottom:.3rem;} .card-desc-size{font-size:.5rem;line-height:1.2;}
        }
        @media(max-width:640px){ .min-h-\\[160px\\]{min-height:145px;} }
        @media(max-width:480px){ .min-h-\\[160px\\]{min-height:135px;} }
        @media(max-width:360px){ .min-h-\\[160px\\]{min-height:125px;} }

        /* ════════════  MOBILE ≤ 767px  ════════════ */
        @media (max-width:767px) {
          .mobile-hidden-card { display:none !important; }
          .transition-card    { transition:box-shadow .25s ease; }
          .row-pair  { width:94vw; gap:0.7rem; align-items:center; }
          .typo-lock { width:auto; flex:1 0 0; min-width:0; }
          .typo-text { font-size:clamp(1.35rem,5.5vw,1.875rem); }
          .dd-panel  { left:auto; right:0; width:min(88vw,15rem); transform-origin:top right; }
          .dd-arrow-outer,.dd-arrow-inner { left:auto; right:1.5rem; transform:translateX(50%); }
          .dd-label  { font-size:14px; }
          .btn-lock.new-btn {
            font-size:.65rem !important; padding:.55rem .9rem !important;
            box-shadow:0 0 30px rgba(245,245,220,.45) !important;
            -webkit-box-reflect:below 5px linear-gradient(to bottom,rgba(0,0,0,0),rgba(0,0,0,.2)) !important;
            animation:btnAnimMobile 3s ease-in-out infinite !important;
          }
          .view-gallery-btn-wrap {
            display:flex; justify-content:center; align-items:center;
            margin-top:1.5rem; margin-bottom:0.5rem;
          }
          .view-gallery-btn {
            background:linear-gradient(135deg,#c8a84b 0%,#f4e5b8 40%,#c8a84b 70%,#a07830 100%);
            color:#3a2500; font-family:'Libre Baskerville',serif; font-weight:700;
            font-size:0.75rem; letter-spacing:0.12em; text-transform:uppercase;
            padding:0.65rem 2.2rem; border:none; border-radius:2rem; cursor:pointer;
            box-shadow:0 0 18px rgba(212,175,55,0.55),0 4px 16px rgba(0,0,0,0.45),inset 0 1px 0 rgba(255,255,255,0.35);
            -webkit-box-reflect:below 4px linear-gradient(to bottom,rgba(0,0,0,0),rgba(0,0,0,.22));
            transition:transform .2s ease,box-shadow .2s ease;
          }
          .view-gallery-btn:active { transform:scale(0.97); box-shadow:0 0 28px rgba(212,175,55,.8),0 2px 8px rgba(0,0,0,.4); }
        }
        @media(max-width:480px){
          .row-pair{gap:0.5rem;} .typo-text{font-size:clamp(1.1rem,5vw,1.35rem);}
          .btn-lock.new-btn{font-size:.55rem !important;padding:.45rem .7rem !important;}
          .dd-panel{width:min(85vw,14rem);} .dd-label{font-size:13px;}
          .view-gallery-btn{font-size:0.68rem;padding:0.6rem 1.8rem;}
        }
        @media(max-width:360px){
          .typo-text{font-size:clamp(.95rem,4.5vw,1.1rem);}
          .btn-lock.new-btn{font-size:.5rem !important;padding:.4rem .6rem !important;}
          .dd-panel{width:min(82vw,13rem);}
          .view-gallery-btn{font-size:0.62rem;padding:0.55rem 1.5rem;}
        }
      `}</style>
    </section>
  );
};

export default ServiceSection;