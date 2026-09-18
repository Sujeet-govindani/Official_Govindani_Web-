"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const Section1WithArrows = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  const services = [
    {
      title: "Videography",
      description: "Cinematic property tours that captivate and sell",
      video: "/Videos/videography.mp4",
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1200&auto=format&fit=crop",
      link: "/services/videography"
    },
    {
      title: "Lead Generation",
      description: "Strategic marketing to attract quality buyers",
      video: "/Videos/lead.mp4",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1200&auto=format&fit=crop",
      link: "/services/lead-generation"
    },
    {
      title: "360° Virtual Tour",
      description: "Immersive remote property exploration experience",
      video: "/Videos/homepage-ai-3.mp4",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200&auto=format&fit=crop",
      link: "/services/virtual-tour"
    },
    {
      title: "Website Design",
      description: "Custom platforms for your real estate brand",
      video: "/Videos/website.mp4",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
      link: "/services/website"
    },
    {
      title: "Photography",
      description: "Professional imagery that showcases excellence",
      video: "/Videos/photography.mp4",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
      link: "/services/photography"
    }
  ];

  // ============================================================
  // ✅ CAROUSEL WITH ANIMATED ARROWS
  // ============================================================
  useEffect(() => {
    if (!rootRef.current) return;

    const cleanupFunctions: (() => void)[] = [];

    const initDesktopCarousel = () => {
      const cards = document.querySelectorAll(".circular-card");
      const totalCards = cards.length;
      const radius = window.innerWidth < 640 ? 180 : window.innerWidth < 768 ? 280 : window.innerWidth < 1024 ? 450 : 600;

      let currentRotation = 0;

      const positionCards = (rotation: number) => {
        const isMobile = window.innerWidth < 640;
        const isSmall = window.innerWidth >= 640 && window.innerWidth < 768;
        const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

        cards.forEach((card, index) => {
          const angle = (360 / totalCards) * index + rotation;
          const rad = (angle * Math.PI) / 180;

          const x = Math.sin(rad) * radius;
          const z = Math.cos(rad) * radius;

          const normalizedZ = (z + radius) / (radius * 2);
          const scale = 0.6 + normalizedZ * 0.7;
          const opacity = 0.4 + normalizedZ * 0.6;
          const blur = (1 - normalizedZ) * 8;

          const centerThreshold = isMobile ? 0.65 : 0.7;
          const isCenter = z > radius * centerThreshold;

          let centerScale = 1.2;
          if (isMobile) centerScale = 1.4;
          else if (isSmall) centerScale = 1.35;
          else if (isTablet) centerScale = 1.25;

          gsap.to(card, {
            x: x,
            z: z,
            scale: isCenter ? centerScale : scale,
            opacity: isCenter ? 1 : opacity,
            filter: isCenter ? "blur(0px)" : `blur(${blur}px)`,
            rotateY: -angle,
            duration: 1,
            ease: "power2.out",
          });

          const content = card.querySelector(".card-content");
          if (content) {
            gsap.to(content, {
              scale: isCenter ? 1 : 0.85,
              opacity: isCenter ? 1 : 0.7,
              duration: 1,
              ease: "power2.out",
            });
          }

          const centerGlow = card.querySelector(".center-glow");
          if (centerGlow && isCenter) {
            gsap.to(centerGlow, { opacity: 1, duration: 0.8, ease: "power2.out" });
          } else if (centerGlow) {
            gsap.to(centerGlow, { opacity: 0, duration: 0.8, ease: "power2.out" });
          }

          // ✅ ANIMATED ARROW - Show only when card is centered
          const arrow = card.querySelector(".card-arrow");
          if (arrow && isCenter) {
            gsap.to(arrow, { 
              opacity: 1, 
              scale: 1, 
              duration: 0.8, 
              ease: "back.out(1.7)" 
            });
          } else if (arrow) {
            gsap.to(arrow, { 
              opacity: 0, 
              scale: 0.5, 
              duration: 0.8, 
              ease: "power2.out" 
            });
          }

          const videoElement = document.querySelector(`.bg-video-${index}`) as HTMLVideoElement | null;
          if (videoElement) {
            if (isCenter) {
              videoElement.currentTime = 0;
              videoElement.play();
              gsap.to(videoElement, { opacity: 0.9, duration: 1, ease: "power2.out" });
            } else {
              gsap.to(videoElement, {
                opacity: 0,
                duration: 1,
                ease: "power2.out",
                onComplete: () => { videoElement.pause(); }
              });
            }
          }
        });
      };

      positionCards(currentRotation);

      const rotateCarousel = () => {
        currentRotation -= 360 / totalCards;
        positionCards(currentRotation);
      };

      return setInterval(rotateCarousel, 4500);
    };

    const initMobileCarousel = () => {
      const mobileCards = document.querySelectorAll(".mobile-circular-card");
      if (!mobileCards.length) return null;

      const totalMobileCards = mobileCards.length;
      const radius = 160;
      let currentMobileRotation = 0;

      const positionMobileCards = (rotation: number) => {
        mobileCards.forEach((item, index) => {
          const angle = (360 / totalMobileCards) * index + rotation;
          const rad = (angle * Math.PI) / 180;

          const x = Math.sin(rad) * radius;
          const z = Math.cos(rad) * radius;

          const normalizedZ = (z + radius) / (radius * 2);
          const scale = 0.5 + normalizedZ * 0.6;
          const opacity = 0.3 + normalizedZ * 0.7;
          const blur = (1 - normalizedZ) * 6;

          const centerThreshold = 0.7;
          const isCenter = z > radius * centerThreshold;
          const centerScale = 1.3;

          gsap.to(item, {
            x: x,
            z: z,
            scale: isCenter ? centerScale : scale,
            opacity: isCenter ? 1 : opacity,
            filter: isCenter ? "blur(0px)" : `blur(${blur}px)`,
            rotateY: -angle,
            duration: 1.2,
            ease: "power2.out",
          });

          const centerGlow = item.querySelector(".mobile-center-glow");
          if (centerGlow && isCenter) {
            gsap.to(centerGlow, { opacity: 1, duration: 0.8, ease: "power2.out" });
          } else if (centerGlow) {
            gsap.to(centerGlow, { opacity: 0, duration: 0.8, ease: "power2.out" });
          }

          // ✅ MOBILE ARROW - Show only when card is centered
          const arrow = item.querySelector(".card-arrow");
          if (arrow && isCenter) {
            gsap.to(arrow, { 
              opacity: 1, 
              scale: 1, 
              duration: 0.8, 
              ease: "back.out(1.7)" 
            });
          } else if (arrow) {
            gsap.to(arrow, { 
              opacity: 0, 
              scale: 0.5, 
              duration: 0.8, 
              ease: "power2.out" 
            });
          }
        });
      };

      positionMobileCards(currentMobileRotation);

      const rotateMobileCarousel = () => {
        currentMobileRotation -= 360 / totalMobileCards;
        positionMobileCards(currentMobileRotation);
      };

      return setInterval(rotateMobileCarousel, 4000);
    };

    // Initialize based on screen size
    if (window.innerWidth >= 768) {
      const desktopInterval = initDesktopCarousel();
      if (desktopInterval) {
        cleanupFunctions.push(() => clearInterval(desktopInterval));
      }
    } else {
      const mobileInterval = initMobileCarousel();
      if (mobileInterval) {
        cleanupFunctions.push(() => clearInterval(mobileInterval));
      }
    }

    // Handle resize
    const handleResize = () => {
      cleanupFunctions.forEach(fn => { if (typeof fn === 'function') fn(); });
      cleanupFunctions.length = 0;

      if (window.innerWidth >= 768) {
        const desktopInterval = initDesktopCarousel();
        if (desktopInterval) {
          cleanupFunctions.push(() => clearInterval(desktopInterval));
        }
      } else {
        const mobileInterval = initMobileCarousel();
        if (mobileInterval) {
          cleanupFunctions.push(() => clearInterval(mobileInterval));
        }
      }
    };

    window.addEventListener('resize', handleResize);
    cleanupFunctions.push(() => window.removeEventListener('resize', handleResize));

    return () => {
      cleanupFunctions.forEach(fn => { if (typeof fn === 'function') fn(); });
    };
  }, []);

  return (
    <div ref={rootRef}>
      {/* SECTION 1 SERVICE CARDS CAROUSEL WITH ARROWS */}
      <section className="relative overflow-hidden min-h-auto md:min-h-screen py-4 md:py-8 isolation-isolate" style={{ zIndex: 10 }}>
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #0a1628, #0d1b2e, #0f1f35)' }} />
          
          {/* Background Videos */}
          {services.map((service, index) => (
            <video
              key={index}
              className={`bg-video bg-video-${index} absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-1000`}
              src={service.video}
              autoPlay
              muted
              loop
              playsInline
              preload="none"
            />
          ))}
          
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,22,40,0.7), rgba(13,27,46,0.8), rgba(10,22,40,0.7))' }} />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, rgba(212,175,55,0.05) 0%, rgba(10,22,40,0.8) 70%)' }} />
        </div>

        {/* Heading */}
        <div className="container mx-auto px-4 relative z-20 text-center mb-2 md:mb-4">
          <h1 className="text-2xl md:text-5xl font-bold tracking-tight leading-tight mb-1">
            <span className="bg-gradient-to-r from-[#d4af37] via-[#f4e5b8] to-[#d4af37] bg-clip-text text-transparent">
              Real Estate
            </span>{" "}
            <span className="text-white">Services</span>
          </h1>
          <p className="text-sm md:text-lg text-slate-300/80 max-w-2xl mx-auto px-2">
            Elevate your property marketing with our premium digital solutions
          </p>
        </div>

        {/* DESKTOP CAROUSEL */}
        <div className="hidden md:block relative z-10 w-full flex items-center justify-center mt-0">
          <div className="w-full h-[640px]" style={{ perspective: "1500px" }}>
            <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
              {services.map((service, index) => {
                const isPhotography = service.title === "Photography";
                return (
                  <a
                    key={index}
                    href={service.link}
                    className="circular-card absolute group"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div 
                      className={`card-content relative overflow-hidden rounded-2xl border-2 ${isPhotography ? 'border-[#d4af37]' : 'border-[#d4af37]/30'} shadow-[0_8px_32px_rgba(212,175,55,0.3)] hover:shadow-[0_12px_48px_rgba(212,175,55,0.5)] transition-all duration-500 w-[210px] h-[210px]`}
                      style={{
                        background: isPhotography
                          ? 'linear-gradient(135deg, rgba(13,27,46,0.95), rgba(212,175,55,0.1), rgba(13,27,46,0.95))'
                          : 'linear-gradient(135deg, rgba(13,27,46,0.9), rgba(10,22,40,0.8), rgba(13,27,46,0.9))'
                      }}
                    >
                      {/* Background Image */}
                      <div className="absolute inset-0 z-0 overflow-hidden">
                        <img 
                          src={service.image} 
                          alt={service.title} 
                          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" 
                          loading="lazy" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                      </div>

                      {/* Overlay */}
                      <div className="absolute inset-0 z-10" style={{
                        background: isPhotography
                          ? 'linear-gradient(to bottom, rgba(212,175,55,0.08), rgba(13,27,46,0.6), rgba(10,22,40,0.4))'
                          : 'linear-gradient(to bottom, rgba(10,22,40,0.4), rgba(13,27,46,0.5), rgba(10,22,40,0.4))'
                      }} />

                      {/* Center Glow */}
                      <div className="center-glow absolute inset-0 z-10 rounded-2xl pointer-events-none" style={{
                        boxShadow: "inset 0 0 15px rgba(212,175,55,0.4), 0 0 20px rgba(212,175,55,0.35)",
                        opacity: 0
                      }} />
                      
                      {/* ✅ ANIMATED ARROW (DESKTOP) */}
                      <div className="card-arrow absolute -top-16 left-1/2 -translate-x-1/2 opacity-0 scale-50 pointer-events-none z-30">
                        <svg width="40" height="60" viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-bounce-slow">
                          <path 
                            d="M20 2 L20 45 M20 45 L10 35 M20 45 L30 35" 
                            stroke="#d4af37" 
                            strokeWidth="3" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            filter="drop-shadow(0 0 8px rgba(212,175,55,0.8))"
                          />
                        </svg>
                      </div>

                      {/* Content */}
                      <div className="relative z-20 h-full flex flex-col justify-end p-3">
                        <div className="text-center space-y-1.5">
                          <h2 className="text-base font-bold tracking-tight leading-tight">
                            <span className={`${isPhotography ? 'text-[#f4e5b8]' : 'bg-gradient-to-r from-[#d4af37] via-[#f4e5b8] to-[#d4af37] bg-clip-text text-transparent'} drop-shadow-lg`}>
                              {service.title}
                            </span>
                          </h2>
                          <div className={`h-[1px] w-12 mx-auto bg-gradient-to-r from-transparent ${isPhotography ? 'via-[#f4e5b8]' : 'via-[#d4af37]/80'} to-transparent`} />
                          <p className="text-[9px] text-white/95 leading-tight font-medium px-1 drop-shadow-md">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* MOBILE CAROUSEL */}
        <div className="md:hidden w-full h-[280px] mt-4 relative" style={{ perspective: "1200px" }}>
          <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
            {services.map((service, index) => {
              const isPhotography = service.title === "Photography";
              return (
                <div key={index} className="mobile-circular-card absolute" style={{ transformStyle: "preserve-3d" }}>
                  <a href={service.link} className="block">
                    <div 
                      className="relative overflow-hidden rounded-lg border-2 border-[#d4af37]/30 shadow-[0_4px_12px_rgba(212,175,55,0.25)] w-[160px] h-[210px]"
                      style={{
                        background: isPhotography
                          ? 'linear-gradient(135deg, rgba(13,27,46,0.95), rgba(212,175,55,0.12), rgba(13,27,46,0.95))'
                          : 'linear-gradient(135deg, rgba(13,27,46,0.92), rgba(10,22,40,0.85), rgba(13,27,46,0.92))'
                      }}
                    >
                      <img
                        className="w-full h-full object-cover"
                        src={service.image}
                        alt={service.title}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      
                      {/* Mobile Center Glow */}
                      <div className="mobile-center-glow absolute inset-0 rounded-lg pointer-events-none opacity-0" style={{
                        boxShadow: "inset 0 0 12px rgba(212,175,55,0.4), 0 0 16px rgba(212,175,55,0.35)",
                      }} />
                      
                      {/* ✅ ANIMATED ARROW (MOBILE) */}
                      <div className="card-arrow absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 scale-50 pointer-events-none z-30">
                        <svg width="32" height="48" viewBox="0 0 32 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-bounce-slow">
                          <path 
                            d="M16 2 L16 36 M16 36 L8 28 M16 36 L24 28" 
                            stroke="#d4af37" 
                            strokeWidth="2.5" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            filter="drop-shadow(0 0 6px rgba(212,175,55,0.8))"
                          />
                        </svg>
                      </div>

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
                        <div className="text-center">
                          <h2 className="text-sm font-bold tracking-tight leading-tight mb-1">
                            <span className={`${isPhotography ? 'text-[#f4e5b8]' : 'bg-gradient-to-r from-[#d4af37] via-[#f4e5b8] to-[#d4af37] bg-clip-text text-transparent'} drop-shadow-md`}>
                              {service.title}
                            </span>
                          </h2>
                          <div className={`h-[0.5px] w-8 mx-auto bg-gradient-to-r from-transparent ${isPhotography ? 'via-[#f4e5b8]/80' : 'via-[#d4af37]/70'} to-transparent mb-1`} />
                          <p className="text-[9px] text-white/95 leading-tight font-medium drop-shadow px-1">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* STYLES */}
      <style>{`
        /* Arrow Bounce Animation */
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-bounce-slow { 
          animation: bounce-slow 2s ease-in-out infinite; 
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          section {
            margin-top: 0 !important;
            margin-bottom: 0 !important;
          }
          .mobile-circular-card {
            transform-origin: center center !important;
          }
        }

        /* Reduced Motion Support */
        @media (prefers-reduced-motion: reduce) {
          .animate-bounce-slow {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Section1WithArrows;