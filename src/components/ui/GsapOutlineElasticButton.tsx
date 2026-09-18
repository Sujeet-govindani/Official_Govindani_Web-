// // GsapOutlineElasticButton.tsx
// import React, { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { Button } from "@/components/ui/button";

// const GsapOutlineElasticButton: React.FC = () => {
//   const btnRef = useRef<HTMLButtonElement | null>(null);
//   const colorRef = useRef<string>("#6366F1"); // fallback color

//   useEffect(() => {
//     // Try to read your theme primary color: hsl(var(--primary))
//     if (typeof window !== "undefined") {
//       const rootStyles = getComputedStyle(document.documentElement);
//       const primaryVar = rootStyles.getPropertyValue("--primary").trim();
//       if (primaryVar) {
//         colorRef.current = `hsl(${primaryVar})`;
//       }
//     }

//     if (!btnRef.current) return;

//     // Subtle entrance
//     gsap.from(btnRef.current, {
//       y: 16,
//       opacity: 0,
//       duration: 0.7,
//       ease: "power3.out",
//     });

//     // Soft breathing border glow loop
//     gsap.to(btnRef.current, {
//       boxShadow: `0 0 18px ${colorRef.current}40`,
//       duration: 1.6,
//       ease: "sine.inOut",
//       repeat: -1,
//       yoyo: true,
//     });
//   }, []);

//   const handleMouseEnter = () => {
//     if (!btnRef.current) return;

//     gsap.to(btnRef.current, {
//       scale: 1.06,
//       backgroundColor: colorRef.current,
//       color: "#ffffff",
//       duration: 0.25,
//       ease: "power3.out",
//     });
//   };

//   const handleMouseLeave = () => {
//     if (!btnRef.current) return;

//     gsap.to(btnRef.current, {
//       scale: 1,
//       backgroundColor: "transparent",
//       color: colorRef.current,
//       duration: 0.3,
//       ease: "power3.out",
//     });
//   };

//   const handleClick = () => {
//     if (!btnRef.current) return;

//     // Elastic click feedback
//     gsap.fromTo(
//       btnRef.current,
//       { scale: 0.95 },
//       {
//         scale: 1.08,
//         duration: 0.4,
//         ease: "elastic.out(1, 0.5)",
//       }
//     );
//   };

//   return (
//     <Button
//       ref={btnRef}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//       onClick={handleClick}
//       className="
//         relative overflow-hidden
//         rounded-full px-8 py-3
//         font-semibold
//         border-2
//         bg-transparent
//         transition-none
//       "
//       style={{
//         // base styles using theme primary
//         borderColor: colorRef.current,
//         color: colorRef.current,
//       }}
//     >
//       <span className="relative z-10">Get Started</span>
//     </Button>
//   );
// };

// export default GsapOutlineElasticButton;

// GsapOutlineElasticButton.tsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";

interface GsapOutlineElasticButtonProps {
  label?: string;
  href?: string;
}

const GsapOutlineElasticButton: React.FC<GsapOutlineElasticButtonProps> = ({
  label = "Get Started",
  href,
}) => {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const colorRef = useRef<string>("#6366F1"); // fallback color

  useEffect(() => {
    // Read theme primary color
    if (typeof window !== "undefined") {
      const rootStyles = getComputedStyle(document.documentElement);
      const primaryVar = rootStyles.getPropertyValue("--primary").trim();
      if (primaryVar) {
        colorRef.current = `hsl(${primaryVar})`;
      }
    }

    if (!btnRef.current) return;

    // Entrance animation
    gsap.from(btnRef.current, {
      y: 16,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
    });

    // Soft breathing glow
    gsap.to(btnRef.current, {
      boxShadow: `0 0 18px ${colorRef.current}40`,
      duration: 1.6,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
  }, []);

  const handleMouseEnter = () => {
    if (!btnRef.current) return;

    gsap.to(btnRef.current, {
      scale: 1.06,
      backgroundColor: colorRef.current,
      color: "#ffffff",
      duration: 0.25,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    if (!btnRef.current) return;

    gsap.to(btnRef.current, {
      scale: 1,
      backgroundColor: "transparent",
      color: colorRef.current,
      duration: 0.3,
      ease: "power3.out",
    });
  };

  const handleClick = () => {
    if (!btnRef.current) return;

    gsap.fromTo(
      btnRef.current,
      { scale: 0.95 },
      {
        scale: 1.08,
        duration: 0.4,
        ease: "elastic.out(1, 0.5)",
      }
    );
  };

  const button = (
    <Button
      ref={btnRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="
        relative overflow-hidden
        rounded-full px-8 py-3
        font-semibold
        border-2
        bg-transparent
        transition-none
      "
      style={{
        borderColor: colorRef.current,
        color: colorRef.current,
      }}
    >
      <span className="relative z-10">{label}</span>
    </Button>
  );

  // If href provided → act like a link
  return href ? <a href={href}>{button}</a> : button;
};

export default GsapOutlineElasticButton;
