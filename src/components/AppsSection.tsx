import { Apple, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";

const AppsSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  // Function to scroll to PortfolioSection
  const scrollToPortfolio = () => {
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  useEffect(() => {
    // Load GSAP and ScrollTrigger
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const scrollScript = document.createElement("script");
      scrollScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js";
      scrollScript.async = true;
      document.body.appendChild(scrollScript);

      scrollScript.onload = () => {
        const gsap = (window as any).gsap;
        const ScrollTrigger = (window as any).ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        // Make cards visible immediately
        gsap.set(cardsRef.current, { opacity: 1 });

        // Make cards visible immediately
        gsap.set(cardsRef.current, { opacity: 1 });

        // 1) ONE entrance timeline (all cards same motion)
        const entranceTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        entranceTl.fromTo(
          cardsRef.current,
          {
            y: 60,
            opacity: 0,
            scale: 0.92,
            rotation: 0,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1.2,
            ease: "power3.out",
            stagger: 0.15,
          }
        );

        // 2) ONE floating tween for all cards (same motion always)
        entranceTl.add(() => {
          gsap.to(cardsRef.current, {
            y: -3,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: 0, // all same motion
          });
        });

        cardsRef.current.forEach((card) => {
          if (card) {
            // Wait till entrance animation finishes before starting float
            //     gsap.to(cardsRef.current, {
            //   y: -3,
            //   duration: 2,
            //   repeat: -1,
            //   yoyo: true,
            //   ease: "sine.inOut",
            //   delay: 1.6,
            //   stagger: 0
            // });
          }
        });

        // Phone screen parallax effect on hover
        cardsRef.current.forEach((card) => {
          if (!card) return;

          const phone = card.querySelector(".phone-container");
          if (!phone) return;

          const handleMouseEnter = () => {
            gsap.to(phone, {
              scale: 1.05,
              rotationY: 5,
              duration: 0.6,
              ease: "power2.out",
            });
          };

          const handleMouseLeave = () => {
            gsap.to(phone, {
              scale: 1,
              rotationY: 0,
              duration: 0.6,
              ease: "power2.out",
            });
          };

          const handleMouseMove = (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            gsap.to(phone, {
              rotationY: x * 10,
              rotationX: -y * 10,
              duration: 0.3,
              ease: "power1.out",
            });
          };

          card.addEventListener("mouseenter", handleMouseEnter);
          card.addEventListener("mouseleave", handleMouseLeave);
          card.addEventListener("mousemove", handleMouseMove);

          // Cleanup function stored for later
          card._cleanup = () => {
            card.removeEventListener("mouseenter", handleMouseEnter);
            card.removeEventListener("mouseleave", handleMouseLeave);
            card.removeEventListener("mousemove", handleMouseMove);
          };
        });
      };
    };

    return () => {
      // Cleanup event listeners
      cardsRef.current.forEach((card) => {
        if (card && card._cleanup) {
          card._cleanup();
        }
      });

      // Cleanup GSAP ScrollTrigger instances
      if (typeof window !== 'undefined') {
        const gsap = (window as any).gsap;
        const ScrollTrigger = (window as any).ScrollTrigger;

        if (gsap && ScrollTrigger) {
          const triggers = ScrollTrigger.getAll();
          triggers.forEach((t: any) => t.kill());
        }
      }
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const apps = [
    {
      name: "Jyotish",
      description: "Productivity app for seamless task management",
      category: "Astrology",
      platforms: ["ios", "android"],
      image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/astro.webp",
      heading: "ASTROLOGY APP"
    },
    {
      name: "CI Builders",
      description: "Exclusive luxury township with impeccable planning and top amenities",
      category: "Luxury Living",
      platforms: ["ios", "android"],
      image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/crm.webp",
      heading: "CRM"
    },
    {
      name: "Barncops",
      description: "Manage political campaigns, profiles, and research with powerful tools",
      category: "Political Campaigns",
      platforms: ["ios", "android"],
      image: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/barnstorm.webp",
      heading: "POLITICAL INSIGHTS"
    },
  ];

  const cardBackgrounds = [
    "bg-gradient-to-br from-indigo-900 to-purple-500",
    "bg-gradient-to-br from-blue-900 to-sky-400",
    "bg-gradient-to-br from-slate-800 to-blue-600",
  ];

  return (
    <section ref={sectionRef} className="pb-4 pt-0 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-500/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-${i} ${5 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        ${[...Array(20)].map((_, i) => `
          @keyframes float-${i} {
            0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px); opacity: 0; }
          }
        `).join('')}
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
        @keyframes gradient-slow {
          0%, 100% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
        }
        .animate-gradient-slow {
          animation: gradient-slow 8s ease infinite;
        }
      `}</style>

      <div className="container mx-auto px-4 relative z-10 pt-20">
        {/* Section Header */}
        <div className="text-center mb-6">
          <span className="text-blue-600 font-medium mb-2 flex items-center gap-2 justify-center text-sm">
            <Sparkles className="w-3 h-3 animate-pulse text-semibold" />
            Our Apps
            <Sparkles className="w-3 h-3 animate-pulse" style={{ animationDelay: "0.3s" }} />
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Explore <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-[length:200%_auto] animate-gradient">Our Innovations</span>
          </h2>

          <p className="text-gray-300 text-sm max-w-xl mx-auto">
            Explore our portfolio of mobile applications designed to solve real-world problems
            and enhance user experiences.
          </p>
          <br /><br />
        </div>
        {/* Apps Grid */}
        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto" style={{ perspective: "1000px" }}>
          {apps.map((app, index) => (
            <div
              key={index}
              ref={addToRefs}
              className="group relative rounded-lg bg-white shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden animated-gradient-border"
              style={{ transformStyle: "preserve-3d" }}
            >

              {/* Holographic Shine Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/20 animate-shimmer" />
              </div>

              {/* App Info Header */}
              <div className="p-4 pb-2 relative">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {app.name}
                  </h3>
                  {/* Glowing Category Badge */}
                  <span className="text-[9px] text-cyan-600 font-medium uppercase tracking-wider inline-block px-2 py-0.5 rounded-full bg-blue-50 backdrop-blur-sm border border-blue-200 shadow-sm shadow-blue-500/20">
                    {app.category}
                  </span>
                </div>
              </div>

              {/* App Preview */}
              <div className="aspect-[4/5] flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-gray-900 via-cyan-900 to-cyan-900">
                {/* Animated Background Grid */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: "linear-gradient(0deg, transparent 24%, rgba(0, 0, 0, .05) 25%, rgba(0, 0, 0, .05) 26%, transparent 27%, transparent 74%, rgba(0, 0, 0, .05) 75%, rgba(0, 0, 0, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 0, 0, .05) 25%, rgba(0, 0, 0, .05) 26%, transparent 27%, transparent 74%, rgba(0, 0, 0, .05) 75%, rgba(0, 0, 0, .05) 76%, transparent 77%, transparent)",
                    backgroundSize: "40px 40px"
                  }} />
                </div>

                <div className="phone-container w-60 h-[380px] rounded-[36px] bg-gray-900 border-[3px] border-gray-700 relative overflow-hidden shadow-2xl" style={{ transformStyle: "preserve-3d" }}>
                  {/* Phone Screen with Gradient Animation */}
                  <div className="absolute inset-2 rounded-[32px] bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-blue-500/20 bg-[length:200%_200%] animate-gradient-slow flex items-center justify-center overflow-hidden">
                    {/* Glowing Orbs */}
                    <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-blue-500/30 rounded-full blur-2xl animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-purple-500/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "1s" }} />

                    {/* Image and Content */}
                    <div className="absolute inset-0 flex flex-col">
                      {/* Image */}
                      <div className="flex-1 relative">
                        <img
                          src={app.image}
                          alt={app.name}
                          className="w-full h-full object-cover rounded-t-[32px]"
                        />
                      </div>

                      {/* Bottom section with heading and name */}
                      <div className="app-heading-bg p-3 absolute bottom-0 left-0 right-0 rounded-b-lg">
                        <p className="text-[9px] app-heading-text font-semibold tracking-wider mb-0.5 uppercase">{app.heading}</p>
                        <p className="text-sm font-bold app-heading-text">{app.name}</p>
                      </div>
                    </div>
                  </div>
                  {/* Notch with Glow */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-gray-900 rounded-full shadow-inner" />
                  
                  {/* Screen Reflection */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50 pointer-events-none rounded-[36px]" />
                </div>
              </div>
              {/* Bottom Glow Line */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div> {/* container div ending here, after cards */}
      
      {/* Add the button here */}
      <div className="flex justify-center mt-12 mb-6">
        <button 
          type="button" 
          className="discover-btn"
          onClick={scrollToPortfolio}
        >
          Discover More
          <span>➡️</span>
        </button>
      </div>
    </section>
  );
};

export default AppsSection;