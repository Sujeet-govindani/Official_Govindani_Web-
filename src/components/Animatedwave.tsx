// import React, { useEffect, useRef } from 'react';
// import gsap from 'gsap';

// interface AnimatedWaveProps {
//   color: string;
//   opacity?: number;
//   direction?: 'normal' | 'reverse';
//   speed?: number;
//   className?: string;
//   position?: 'top' | 'bottom';
// }

// export const AnimatedWave: React.FC<AnimatedWaveProps> = ({
//   color,
//   opacity = 1,
//   direction = 'normal',
//   speed = 8,
//   className = '',
//   position = 'bottom',
// }) => {
//   const waveRef = useRef<SVGPathElement>(null);

//   useEffect(() => {
//     if (!waveRef.current) return;

//     const wave = waveRef.current;
//     const tl = gsap.timeline({ repeat: -1 });

//     if (position === 'bottom') {
//       tl.to(wave, {
//         attr: {
//           d: 'M0,100 C200,20 400,140 600,60 C800,10 1000,120 1440,50 L1440,200 L0,200 Z',
//         },
//         duration: speed,
//         ease: 'sine.inOut',
//       })
//         .to(wave, {
//           attr: {
//             d: 'M0,50 C200,130 400,30 600,110 C800,150 1000,40 1440,100 L1440,200 L0,200 Z',
//           },
//           duration: speed,
//           ease: 'sine.inOut',
//         })
//         .to(wave, {
//           attr: {
//             d: 'M0,80 C200,10 400,120 600,40 C800,140 1000,30 1440,90 L1440,200 L0,200 Z',
//           },
//           duration: speed,
//           ease: 'sine.inOut',
//         })
//         .to(wave, {
//           attr: {
//             d: 'M0,60 C200,120 400,40 600,130 C800,20 1000,110 1440,60 L1440,200 L0,200 Z',
//           },
//           duration: speed,
//           ease: 'sine.inOut',
//         });
//     } else {
//       // Top position waves
//       tl.to(wave, {
//         attr: {
//           d: 'M0,0 L1440,0 L1440,150 C1200,50 900,180 600,90 C300,20 150,140 0,100 Z',
//         },
//         duration: speed,
//         ease: 'sine.inOut',
//       })
//         .to(wave, {
//           attr: {
//             d: 'M0,0 L1440,0 L1440,100 C1200,160 900,60 600,140 C300,180 150,70 0,130 Z',
//         },
//           duration: speed,
//           ease: 'sine.inOut',
//         })
//         .to(wave, {
//           attr: {
//             d: 'M0,0 L1440,0 L1440,130 C1200,80 900,170 600,70 C300,150 150,50 0,110 Z',
//           },
//           duration: speed,
//           ease: 'sine.inOut',
//         })
//         .to(wave, {
//           attr: {
//             d: 'M0,0 L1440,0 L1440,120 C1200,170 900,70 600,150 C300,60 150,130 0,90 Z',
//           },
//           duration: speed,
//           ease: 'sine.inOut',
//         });
//     }

//     if (direction === 'reverse') {
//       tl.timeScale(-1);
//     }

//     return () => {
//       tl.kill();
//     };
//   }, [speed, direction, position]);

//   const positionClass = position === 'bottom' ? 'bottom-0' : 'top-0';

//   return (
//     <div className={`absolute ${positionClass} left-0 right-0 w-full h-48 pointer-events-none overflow-hidden ${className} z-20`}>
//       <svg
//         viewBox="0 0 1440 200"
//         xmlns="http://www.w3.org/2000/svg"
//         className="w-full h-full"
//         preserveAspectRatio="none"
//         style={{ display: 'block' }}
//       >
//         <path
//           ref={waveRef}
//           d={
//             position === 'bottom'
//               ? 'M0,100 C200,20 400,140 600,60 C800,10 1000,120 1440,50 L1440,200 L0,200 Z'
//               : 'M0,0 L1440,0 L1440,150 C1200,50 900,180 600,90 C300,20 150,140 0,100 Z'
//           }
//           fill={color}
//           opacity={opacity}
//           strokeWidth="0"
//         />
//       </svg>
//     </div>
//   );
// };

// // Section 1 to 2 transition - Blue to Cream wave at BOTTOM of Section 1
// export const BlueWave: React.FC<{ className?: string }> = ({ className }) => (
//   <AnimatedWave
//     color="#fef3e2"
//     opacity={1}
//     speed={5}
//     position="bottom"
//     className={className}
//   />
// );

// // Section 2 to 3 transition - Cream to Yellow wave at BOTTOM of Section 2
// export const CreamWave: React.FC<{ className?: string }> = ({ className }) => (
//   <AnimatedWave
//     color="#FFC107"
//     opacity={1}
//     speed={5.5}
//     direction="reverse"
//     position="bottom"
//     className={className}
//   />
// );

// // Section 3 Yellow wave at TOP - for cream background showing through
// export const YellowWaveTop: React.FC<{ className?: string }> = ({ className }) => (
//   <AnimatedWave
//     color="#fef3e2"
//     opacity={1}
//     speed={5}
//     position="top"
//     className={className}
//   />
// );

// export default AnimatedWave;