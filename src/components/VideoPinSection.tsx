import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger);

const VideoPinSection = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const sectionRef = useRef(null);
  const videoBoxRef = useRef(null);
  const playBtnRef = useRef(null);

  useGSAP(() => {
    // For mobile, we might want to simplify or disable the animation
    if (isMobile) {
      // Optional: Simpler animation for mobile
      const section = sectionRef.current;
      const videoBox = videoBoxRef.current;
      const playBtn = playBtnRef.current;
      
      if (!section || !videoBox || !playBtn) return;

      // Reset for mobile
      gsap.set(videoBox, { clipPath: "circle(100% at 50% 50%)" });
      gsap.set(playBtn, { opacity: 1, scale: 1 });
      
      // Create a simpler scroll animation for mobile
      const st = ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(playBtn, { opacity: 1 - p });
        },
      });

      return () => st.kill();
    }

    // Desktop animation (your original code)
    const section = sectionRef.current;
    const videoBox = videoBoxRef.current;
    const playBtn = playBtnRef.current;

    if (!section || !videoBox || !playBtn) return;

    gsap.set(videoBox, { clipPath: "circle(8% at 50% 50%)" });

    // Calculate section height for desktop
    const sectionHeight = isDesktop ? "200vh" : "150vh";
    
    // Set the actual height of the section
    if (section) {
      section.style.height = sectionHeight;
    }

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top bottom-=100", // Start earlier for more scroll space
      end: "bottom top+=100", // End later for more scroll space
      scrub: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const p = self.progress;
        const circleSize = 8 + 92 * p;

        gsap.set(videoBox, { clipPath: `circle(${circleSize}% at 50% 50%)` });
        gsap.set(playBtn, { 
          opacity: 1 - p, 
          scale: 1 - 0.2 * p 
        });
      },
      onEnter: () => {
        gsap.set(videoBox, { clipPath: "circle(8% at 50% 50%)" });
        gsap.set(playBtn, { opacity: 1, scale: 1 });
      },
      onLeaveBack: () => {
        gsap.set(videoBox, { clipPath: "circle(8% at 50% 50%)" });
        gsap.set(playBtn, { opacity: 1, scale: 1 });
      }
    });

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => st.kill();
  }, { dependencies: [isMobile, isDesktop] });

  return (
    <section id="videos"
      ref={sectionRef}
      className="video-pin-section"
      style={{
        position: "relative",
        width: "100vw",
        marginLeft: "calc(-50vw + 50%)",
        // Dynamic height based on device
        height: isMobile ? "100vh" : isDesktop ? "200vh" : "150vh",
        overflow: "hidden",
        margin: "0",
        touchAction: "pan-y", // ✅ Add this for better mobile touch handling
        // Smooth transition for height changes
        transition: "height 0.3s ease",
      }}
    >
      <div
        ref={videoBoxRef}
        className="video-container"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#000",
        }}
      >
        <video
          src="/Videos/realEstate.mp4"
          playsInline
          muted
          loop
          autoPlay
          style={{ 
            width: "100%", 
            height: "100%", 
            objectFit: "cover",
            // Optional: Different object-fit for mobile
            objectPosition: "center center"
          }}
        />

        {/* Play Button Container */}
        <div
          ref={playBtnRef}
          className="play-button-container"
          style={{
            pointerEvents: "none",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
            // Responsive styles
            width: isMobile ? "auto" : "auto",
            height: isMobile ? "auto" : "auto",
          }}
        >
          <div
            className="play-button"
            style={{
              // Mobile specific styles
              width: isMobile ? "80px" : "12vw",
              height: isMobile ? "80px" : "12vw",
              minWidth: isMobile ? "80px" : "100px",
              minHeight: isMobile ? "80px" : "100px",
              borderRadius: "50%",
              display: "grid",
              placeItems: "center",
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(10px)",
              border: isMobile ? "2px solid rgba(212,175,55,0.8)" : "2px solid rgba(212,175,55,0.6)",
              boxShadow: isMobile 
                ? "0 0 40px rgba(212,175,55,0.6)" 
                : "0 0 60px rgba(212,175,55,0.4)",
              // Add transition for smoother resizing
              transition: "width 0.3s ease, height 0.3s ease, opacity 0.3s ease, transform 0.3s ease",
            }}
          >
            <svg 
              width={isMobile ? "32" : "40"} 
              height={isMobile ? "32" : "40"} 
              viewBox="0 0 24 24" 
              fill="rgba(212,175,55,0.9)"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Optional: Add a subtle overlay for better visibility on mobile */}
      {isMobile && (
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.3) 70%)",
          // pointerEffects: "none",
          zIndex: 5,
        }} />
      )}
      
      {/* Add a subtle gradient overlay for desktop to enhance visibility */}
      {!isMobile && (
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.2) 70%)",
          pointerEvents: "none",
          zIndex: 2,
        }} />
      )}
    </section>
  );
};

export default VideoPinSection;