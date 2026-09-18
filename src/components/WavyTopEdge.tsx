import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface WavyTopEdgeProps {
  bgColor?: string; // The color of the section above (to fill the wave cutout)
}

export const WavyTopEdge: React.FC<WavyTopEdgeProps> = ({ 
  bgColor = '#fef3e2' // cream/beige color from section above
}) => {
  const wavePathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!wavePathRef.current) return;

    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    
    // Animate the wave shape
    tl.to(wavePathRef.current, {
      attr: {
        d: 'M0,0 L0,150 C200,90 400,120 600,50 C800,10 1000,100 1200,60 C1300,40 1370,70 1440,50 L1440,0 Z',
      },
      duration: 5,
      ease: 'sine.inOut',
    })
    .to(wavePathRef.current, {
      attr: {
        d: 'M0,0 L0,150 C200,50 400,80 600,70 C800,60 1000,40 1200,70 C1300,80 1370,60 1440,70 L1440,0 Z',
      },
      duration: 5,
      ease: 'sine.inOut',
    })
    .to(wavePathRef.current, {
      attr: {
        d: 'M0,0 L0,150 C200,70 400,100 600,60 C800,20 1000,80 1200,50 C1300,60 1370,50 1440,60 L1440,0 Z',
      },
      duration: 5,
      ease: 'sine.inOut',
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="absolute top-0 left-0 right-0 w-full h-[150px] overflow-hidden pointer-events-none z-50">
      <svg
        viewBox="0 0 1440 150"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full block"
        preserveAspectRatio="none"
      >
        <path
          ref={wavePathRef}
          d="M0,0 L0,150 C200,70 400,100 600,60 C800,20 1000,80 1200,50 C1300,60 1370,50 1440,60 L1440,0 Z"
          fill={bgColor}
        />
      </svg>
    </div>
  );
};

export default WavyTopEdge;