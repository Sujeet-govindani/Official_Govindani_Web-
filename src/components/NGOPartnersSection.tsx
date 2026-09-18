import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Users, MapPin, Heart, TrendingUp, Sparkles, Award } from 'lucide-react';

const NGOCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [isTouching, setIsTouching] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef(null);
  const carouselInnerRef = useRef(null);
  const headingContainerRef = useRef(null);
  const flipTimerRef = useRef(null);
  const touchTimerRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const touchMoveTimeoutRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('in-view')),
      { threshold: 0.1 }
    );
    if (headingContainerRef.current) observer.observe(headingContainerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const startAutoFlip = () => {
      if (flipTimerRef.current) clearInterval(flipTimerRef.current);
      flipTimerRef.current = setInterval(() => {
        if (!isMobile || (!isTouching && !isDragging)) {
          setCurrentIndex((prev) => (prev + 1) % ngoStories.length);
        }
      }, 5000);
    };
    if (!isHovered && !isDragging && !isTouching) startAutoFlip();
    return () => { if (flipTimerRef.current) clearInterval(flipTimerRef.current); };
  }, [isHovered, isDragging, isTouching, isMobile]);

  useEffect(() => {
    if (carouselInnerRef.current && !isDragging && !isTouching) {
      const scrollContainer = carouselInnerRef.current;
      const cardWidth = scrollContainer.offsetWidth;
      scrollContainer.scrollTo({ left: currentIndex * cardWidth, behavior: 'smooth' });
    }
  }, [currentIndex, isDragging, isTouching]);

  const handleTouchStart = useCallback((e) => {
    setIsTouching(true);
    setTouchStart(e.touches[0].clientX);
    if (flipTimerRef.current) clearInterval(flipTimerRef.current);
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!touchStart || !isMobile) return;
    if (touchMoveTimeoutRef.current) clearTimeout(touchMoveTimeoutRef.current);
    touchMoveTimeoutRef.current = setTimeout(() => {
      const diff = touchStart - e.touches[0].clientX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? handleNext() : handlePrev();
        setTouchStart(0);
      }
    }, 50);
  }, [touchStart, isMobile]);

  const handleTouchEnd = useCallback(() => {
    setIsTouching(false);
    touchTimerRef.current = setTimeout(() => setIsTouching(false), 1000);
  }, []);

  const handleScroll = useCallback(() => {
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    if (flipTimerRef.current) clearInterval(flipTimerRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      if (carouselInnerRef.current && isMobile) {
        const { scrollLeft, offsetWidth } = carouselInnerRef.current;
        const newIndex = Math.round(scrollLeft / offsetWidth);
        if (newIndex !== currentIndex) setCurrentIndex(newIndex);
      }
    }, 100);
  }, [currentIndex, isMobile]);

  const ngoStories = [
    {
      id: 1, name: "Popatbhai Charitable Trust", category: "Orphan care",
      image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Popatbhaitrust.webp",
      description: "Educating children, empowering women, aiding differently abled, protecting animals",
      highlights: [
        { icon: Users, text: "Empowering 40,000+ families annually" },
        { icon: MapPin, text: "Active in 120+ remote villages" },
        { icon: Heart, text: "Community-led programs" },
        { icon: TrendingUp, text: "98% program sustainability rate" },
      ],
    },
    {
      id: 2, name: "Harsh chhikkara Jan Seva Trust", category: "Education",
      image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Harsh1.webp",
      description: "Harsh Chhikara Jan Sewa Trust is not just a name; he is a movement, a force of change dedicated to transforming lives. A visionary leader, philanthropist, and social activist, he has committed his life to uplifting marginalized communities, ensuring access to education, healthcare, and self-sufficiency for those in need.",
      highlights: [
        { icon: Users, text: "Educating 30,000+ students annually" },
        { icon: MapPin, text: "Active across 70+ rural & urban regions" },
        { icon: Heart, text: "Inclusive and community-driven programs" },
        { icon: TrendingUp, text: "90% improvement in learning outcomes" },
      ],
    },
    {
      id: 3, name: "Animals Matter To Me", category: "Animal Welfare",
      image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/animal.webp",
      description: "Dedicated to protecting, rescuing, and improving the lives of animals through care, advocacy, and compassionate community action.",
      highlights: [
        { icon: Users, text: "Supporting 20,000+ animals annually" },
        { icon: MapPin, text: "Active rescue and care programs in 12+ regions" },
        { icon: Heart, text: "Rescue, rehabilitation, and adoption services" },
        { icon: TrendingUp, text: "10,000+ successful animal recoveries & adoptions" },
      ],
    },
    {
      id: 4, name: "Gau Seva Dham", category: "Animal Welfare",
      image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Gauseva.webp",
      description: "Gau Seva Dham by World Sankirtan Tour Trust is a sanctuary of love and care, dedicated to the protection and welfare of stray animals, especially cows. Founded by Pujya Devi Chitralekha Ji on 26th May 2013, this noble initiative operates under the aegis of World Sankirtan Tour Trust and is spread over 5 acres in Hodal, Haryana.",
      highlights: [
        { icon: Users, text: "Rescuing and caring for 18,000+ stray animals yearly" },
        { icon: MapPin, text: "Active rescue operations in 25+ cities" },
        { icon: Heart, text: "Emergency treatment, sterilization, and adoption" },
        { icon: TrendingUp, text: "70% reduction in stray-related injuries in focus areas" },
      ],
    },
    {
      id: 5, name: "Mallakhamb Artist", category: "Community Welfare",
      image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Mallkhamb.webp",
      description: "Abujhmad Mallakhamb and Sports Academy isn’t just a training ground it’s a movement, a home, and a hope born in the heart of Bastar. Founded in 2016, the academy empowers tribal children through the ancient Indian art of Mallakhambh ",
      highlights: [
        { icon: Users, text: "Engaging 50,000+ citizens in green initiatives" },
        { icon: MapPin, text: "Environmental programs across 60+ regions" },
        { icon: Heart, text: "Tree plantation, waste reduction, and awareness drives" },
        { icon: TrendingUp, text: "Planted 1 million+ trees and restored green cover" },
      ],
    },
    {
      id: 6, name: "Nanhi Pari Foundation", category: "Social Justice & Community Empowerment",
      image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/pari.webp",
      description: "At Nanhi Pari Foundation, we work every day to ensure that underprivileged girls in India receive the education, healthcare, and support they deserve. Our impact is not just in numbers it is in the smiles of children who can now dream bigger, study harder, and live healthier.",
      highlights: [
        { icon: Users, text: "Representing and supporting 100,000+ slum residents" },
        { icon: MapPin, text: "Active in 40+ urban slum communities" },
        { icon: Heart, text: "Community advocacy, legal aid, and awareness" },
        { icon: TrendingUp, text: "Improved access to housing, sanitation, and welfare schemes" },
      ],
    },
    {
      id: 7, name: "Palawi", category: "Child Education",
      image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/palawi.webp",
      description: "At Palawi, under the guidance of Prabha Hira Pratisthan, we are dedicated to providing HIV-positive orphaned children with a nurturing environment where they can find hope, health, and education. ",
      highlights: [
        { icon: Users, text: "Educating and supporting 10,000+ children" },
        { icon: MapPin, text: "Learning centers and schools in 35+ regions" },
        { icon: Heart, text: "Holistic education with care and values" },
        { icon: TrendingUp, text: "85% improvement in academic performance" },
      ],
    },

  ];

  const handlePrev = useCallback(() => setCurrentIndex((p) => (p - 1 + ngoStories.length) % ngoStories.length), [ngoStories.length]);
  const handleNext = useCallback(() => setCurrentIndex((p) => (p + 1) % ngoStories.length), [ngoStories.length]);
  const handleIndicatorClick = useCallback((i) => setCurrentIndex(i), []);

  const handleMouseDown = (e) => { if (!isMobile) { setIsDragging(true); setStartX(e.pageX); } };
  const handleMouseMove = (e) => { if (!isDragging || isMobile) return; e.preventDefault(); };
  const handleMouseUp = (e) => {
    if (!isDragging || isMobile) return;
    const diff = startX - e.pageX;
    if (Math.abs(diff) > 50) diff > 0 ? handleNext() : handlePrev();
    setIsDragging(false);
  };

  useEffect(() => () => {
    [flipTimerRef, touchTimerRef, scrollTimeoutRef, touchMoveTimeoutRef].forEach((r) => {
      if (r.current) { r.current > 0 ? clearTimeout(r.current) : clearInterval(r.current); }
    });
  }, []);

  return (
    <div id="partners" className="min-h-auto md:min-h-screen relative overflow-hidden" style={{ background: '#000000' }}>

      {/* ── Pure black bg with subtle gold ambient glows ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[180px]"
          style={{ background: '#000' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[160px]"
          style={{ background: 'rgba(212,175,55,0.04)' }} />
        {/* Thin gold grid */}

      </div>

      <div className="relative z-10 py-10 md:py-20 px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* ── Heading ── */}
          <div ref={headingContainerRef} className="text-center mb-10 md:mb-16 px-2">
            <h1 className="font-bold text-2xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-3xl leading-tight">
              <span style={{ color: '#ffffff' }}>Stories That </span>
              <span style={{
                background: 'linear-gradient(135deg, #d4af37, #f4e5b8, #c9a961)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                filter: 'drop-shadow(0 0 12px rgba(212,175,55,0.3))',
              }}>
                Move Communities Forward
              </span>
            </h1>

            {/* Gold divider */}
            <div className="flex items-center justify-center gap-3 mt-5 md:mt-6">
              <div className="h-px w-16 md:w-24" style={{ background: 'linear-gradient(to right, transparent, #d4af37)' }} />
              <Award className="w-4 h-4" style={{ color: '#d4af37' }} />
              <div className="h-px w-16 md:w-24" style={{ background: 'linear-gradient(to left, transparent, #d4af37)' }} />
            </div>

            <p className="text-sm md:text-base lg:text-lg max-w-2xl mx-auto mt-4 font-light leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.6)' }}>
              Each organization represents a journey of care, resilience, and transformative impact across communities.
            </p>
          </div>

          {/* ── Carousel ── */}
          <div
            className="relative group"
            onMouseEnter={() => !isMobile && setIsHovered(true)}
            onMouseLeave={() => !isMobile && setIsHovered(false)}
          >
            <div ref={carouselRef} className="relative overflow-hidden cursor-grab active:cursor-grabbing" style={{ userSelect: 'none' }}>
              <div
                ref={carouselInnerRef}
                className={`flex transition-transform duration-700 ease-out ${isMobile ? 'overflow-x-auto snap-x snap-mandatory scrollbar-hide' : ''}`}
                style={{ transform: isMobile ? undefined : `translateX(-${currentIndex * 100}%)` }}
                onScroll={isMobile ? handleScroll : undefined}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                {ngoStories.map((ngo, index) => (
                  <div key={ngo.id} className={`min-w-full px-2 ${isMobile ? 'snap-center' : ''}`}>
                    <div
                      className="carousel-card rounded-2xl md:rounded-3xl overflow-hidden flex flex-col lg:flex-row max-w-6xl mx-auto transition-all duration-500"
                      style={{
                        background: 'linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #0d0d0d 100%)',
                        border: currentIndex === index
                          ? '1.5px solid rgba(212,175,55,0.7)'
                          : '1.5px solid rgba(212,175,55,0.2)',
                        boxShadow: currentIndex === index
                          ? '0 0 40px rgba(212,175,55,0.15), 0 20px 60px rgba(0,0,0,0.8)'
                          : '0 10px 40px rgba(0,0,0,0.6)',
                      }}
                    >
                      {/* ── Image ── */}
                      <div className="lg:w-1/2 relative overflow-hidden h-52 sm:h-64 lg:h-auto min-h-[220px] md:min-h-[340px]">
                        {/* Dark gradient overlay */}
                        <div className="absolute inset-0 z-10"
                          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)' }} />
                        {/* Gold shimmer on active */}
                        {currentIndex === index && (
                          <div className="absolute inset-0 z-[5]"
                            style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.06) 0%, transparent 60%)' }} />
                        )}
                        <img
                          src={ngo.image} alt={ngo.name}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                          loading="lazy" decoding="async"
                        />
                        {/* Category badge */}
                        <div className="absolute bottom-4 left-4 z-20">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold"
                            style={{
                              background: 'linear-gradient(135deg, #d4af37, #c9a961)',
                              color: '#000000',
                              boxShadow: '0 0 16px rgba(212,175,55,0.4)',
                            }}>
                            <Sparkles className="w-3 h-3" />
                            {ngo.category}
                          </span>
                        </div>
                      </div>

                      {/* ── Content ── */}
                      <div className="lg:w-1/2 p-5 md:p-8 flex flex-col justify-center space-y-5"
                        style={{ background: 'linear-gradient(135deg, #0d0d0d 0%, #0a0a0a 100%)' }}>

                        {/* Name row */}
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{
                              background: 'rgba(212,175,55,0.1)',
                              border: '1px solid rgba(212,175,55,0.35)',
                            }}>
                            <Heart className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: '#d4af37' }} />
                          </div>
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight"
                            style={{
                              background: 'linear-gradient(135deg, #d4af37, #f4e5b8, #ffffff)',
                              WebkitBackgroundClip: 'text',
                              backgroundClip: 'text',
                              color: 'transparent',
                            }}>
                            {ngo.name}
                          </h3>
                        </div>

                        {/* Description */}
                        <p className="text-sm sm:text-base leading-relaxed font-light"
                          style={{ color: 'rgba(255,255,255,0.75)' }}>
                          {ngo.description}
                        </p>

                        {/* Highlights */}
                        <div className="space-y-2 sm:space-y-2.5">
                          {ngo.highlights.map((highlight, idx) => (
                            <div key={idx}
                              className="flex items-start gap-3 rounded-xl p-2.5 sm:p-3 transition-all duration-300 highlight-row"
                              style={{
                                background: 'rgba(212,175,55,0.04)',
                                border: '1px solid rgba(212,175,55,0.12)',
                              }}>
                              <div className="mt-0.5 p-1.5 rounded-lg flex-shrink-0"
                                style={{ background: 'rgba(212,175,55,0.1)' }}>
                                <highlight.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: '#d4af37' }} />
                              </div>
                              <span className="text-xs sm:text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
                                {highlight.text}
                              </span>
                            </div>
                          ))}
                        </div>



                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Nav Arrows ── */}
            {!isMobile && (
              <>
                {[{ dir: 'prev', pos: 'left-2 sm:left-4', path: 'M15 19l-7-7 7-7', fn: handlePrev },
                { dir: 'next', pos: 'right-2 sm:right-4', path: 'M9 5l7 7-7 7', fn: handleNext }]
                  .map(({ dir, pos, path, fn }) => (
                    <button key={dir} onClick={fn}
                      className={`nav-arrow absolute ${pos} top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all duration-300`}
                      style={{
                        background: 'rgba(0,0,0,0.85)',
                        border: '1.5px solid rgba(212,175,55,0.4)',
                        color: '#d4af37',
                        backdropFilter: 'blur(8px)',
                      }}
                      aria-label={`${dir} story`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={path} />
                      </svg>
                    </button>
                  ))}
              </>
            )}
          </div>

          {/* ── Dot Indicators ── */}
          <div className="flex justify-center mt-8 md:mt-12 gap-2 flex-wrap py-2">
            {ngoStories.map((_, index) => (
              <button key={index} onClick={() => handleIndicatorClick(index)}
                className="h-2 rounded-full transition-all duration-500 flex-shrink-0"
                style={{
                  width: currentIndex === index ? '2.5rem' : '0.5rem',
                  background: currentIndex === index
                    ? 'linear-gradient(90deg, #d4af37, #f4e5b8)'
                    : 'rgba(212,175,55,0.25)',
                  boxShadow: currentIndex === index ? '0 0 12px rgba(212,175,55,0.5)' : 'none',
                }}
                aria-label={`Go to story ${index + 1}`}
              />
            ))}
          </div>

        </div>
      </div>

      <style>{`
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .snap-x { scroll-snap-type: x mandatory; }
        .snap-center { scroll-snap-align: center; }

        

        .highlight-row:hover {
          background: rgba(212,175,55,0.08) !important;
          border-color: rgba(212,175,55,0.3) !important;
        }

        .learn-more-btn:hover {
          background: rgba(212,175,55,0.1) !important;
          border-color: rgba(212,175,55,0.9) !important;
          box-shadow: 0 0 20px rgba(212,175,55,0.2);
        }
        .learn-more-btn:hover .btn-arrow { transform: translateX(4px); }

        .nav-arrow:hover {
          border-color: rgba(212,175,55,0.9) !important;
          box-shadow: 0 0 24px rgba(212,175,55,0.3);
        }

        @media (max-width: 768px) {
          .carousel-card {
            will-change: transform, opacity;
            backface-visibility: hidden;
            -webkit-user-select: none;
            user-select: none;
            -webkit-tap-highlight-color: transparent;
          }
          .carousel-card * { -webkit-user-drag: none; user-select: none; }
        }
      `}</style>
    </div>
  );
};

export default NGOCarousel;