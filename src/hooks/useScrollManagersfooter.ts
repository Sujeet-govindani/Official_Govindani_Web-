import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FooterAnimationRefs {
  section1Ref: React.RefObject<HTMLDivElement>;
  section2Ref: React.RefObject<HTMLDivElement>;
  section3Ref: React.RefObject<HTMLDivElement>;
  section4Ref: React.RefObject<HTMLDivElement>;
  puzzlesRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
  phoneDigitsRef: React.MutableRefObject<(HTMLSpanElement | null)[]>;
  socialSignsRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
  bgLinesRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

export const useFooterAnimations = (refs: FooterAnimationRefs) => {
  const {
    section1Ref,
    section2Ref,
    section3Ref,
    section4Ref,
    puzzlesRef,
    phoneDigitsRef,
    socialSignsRef,
    bgLinesRef,
  } = refs;

  useEffect(() => {
    // Kill all existing ScrollTriggers to prevent conflicts
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    const ctx = gsap.context(() => {
      // Configure ScrollTrigger defaults for smoother performance
      ScrollTrigger.config({
        limitCallbacks: true,
        syncInterval: 150,
      });

      // ========== SECTION 1: IT WILL MAKE SENSE ==========
      if (section1Ref.current) {
        const section = section1Ref.current;
        const words = section.querySelectorAll('.word-animate');

        // Set initial states
        gsap.set(words, { 
          y: 150, 
          opacity: 0, 
          scale: 0.7,
          rotationX: -90
        });

        // Create scroll-triggered animation
        const tl1 = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
            fastScrollEnd: true,
          }
        });

        tl1.to(words, {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: 'back.out(1.4)',
        });
      }

      // ========== SECTION 2: CONTACT SECTION ==========
      if (section2Ref.current) {
        const section = section2Ref.current;
        const heading = section.querySelector('.contact-heading');
        const callText = section.querySelector('.call-text');
        const phoneContainer = section.querySelector('.phone-container');
        const hotline = section.querySelector('.hotline-text');
        const digits = phoneDigitsRef.current.filter(d => d !== null);

        // Set initial states
        gsap.set([heading, callText, phoneContainer, hotline], { 
          y: 100, 
          opacity: 0 
        });

        // Create main timeline
        const tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
            fastScrollEnd: true,
          }
        });

        tl2
          .to(heading, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
          })
          .to(callText, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
          }, '-=0.4')
          .to(phoneContainer, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
          }, '-=0.4')
          .to(hotline, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
          }, '-=0.4');

        // Phone digits wave animation (triggered after main animation)
        if (digits.length > 0) {
          ScrollTrigger.create({
            trigger: section,
            start: 'top 40%',
            onEnter: () => {
              digits.forEach((digit, index) => {
                if (digit) {
                  gsap.to(digit, {
                    y: -20,
                    duration: 0.6,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                    delay: index * 0.08,
                  });
                }
              });
            },
            onLeaveBack: () => {
              digits.forEach(digit => {
                if (digit) {
                  gsap.killTweensOf(digit);
                  gsap.to(digit, { y: 0, duration: 0.3 });
                }
              });
            }
          });
        }
      }

      // ========== SECTION 3: SOCIAL MEDIA ==========
      if (section3Ref.current) {
        const section = section3Ref.current;
        const heading = section.querySelector('.social-heading');
        const signs = socialSignsRef.current.filter(s => s !== null);
        const lines = bgLinesRef.current.filter(l => l !== null);

        // Set initial states
        gsap.set(heading, { 
          scale: 0.5, 
          opacity: 0,
          y: -50
        });

        signs.forEach((sign) => {
          if (sign) {
            gsap.set(sign, { 
              x: -200, 
              opacity: 0,
              rotationY: -90
            });
          }
        });

        lines.forEach((line, index) => {
          if (line) {
            gsap.set(line, { 
              x: index % 2 === 0 ? '-120%' : '120%',
              opacity: 0
            });
          }
        });

        // Create main timeline
        const tl3 = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
            fastScrollEnd: true,
          }
        });

        // Animate background lines first
        tl3.to(lines, {
          x: '0%',
          opacity: 0.2,
          duration: 1,
          stagger: 0.08,
          ease: 'power2.out',
        })
        // Then heading
        .to(heading, {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'back.out(2)',
        }, '-=0.5')
        // Then social signs
        .to(signs, {
          x: 0,
          opacity: 1,
          rotationY: 0,
          duration: 1,
          stagger: 0.12,
          ease: 'back.out(1.5)',
        }, '-=0.4');

        // Hover animations for social signs
        signs.forEach((sign) => {
          if (sign) {
            const handleMouseEnter = () => {
              gsap.to(sign, {
                scale: 1.05,
                x: gsap.utils.random(-8, 8),
                y: gsap.utils.random(-8, 8),
                rotation: gsap.utils.random(-3, 3),
                duration: 0.3,
                ease: 'power2.out',
              });
            };

            const handleMouseLeave = () => {
              gsap.to(sign, {
                scale: 1,
                x: 0,
                y: 0,
                rotation: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.6)',
              });
            };

            sign.addEventListener('mouseenter', handleMouseEnter);
            sign.addEventListener('mouseleave', handleMouseLeave);
          }
        });
      }

      // ========== SECTION 4: NEWSLETTER ==========
      if (section4Ref.current) {
        const section = section4Ref.current;
        const heading = section.querySelector('.newsletter-heading');
        const input = section.querySelector('.email-input-wrapper');
        const links = section.querySelector('.footer-links');
        const logo = section.querySelector('.mob-logo');
        const puzzles = puzzlesRef.current.filter(p => p !== null);

        // Set initial states
        gsap.set(heading, { 
          scale: 0.8, 
          opacity: 0,
          y: 60
        });

        gsap.set(input, { 
          scale: 0.7, 
          opacity: 0,
          y: 40
        });

        gsap.set([links, logo], { 
          y: 40, 
          opacity: 0 
        });

        puzzles.forEach((puzzle) => {
          if (puzzle) {
            gsap.set(puzzle, { 
              scale: 0, 
              opacity: 0,
              rotation: gsap.utils.random(-180, 180)
            });
          }
        });

        // Create main timeline
        const tl4 = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
            fastScrollEnd: true,
          }
        });

        tl4
          // Animate puzzles first
          .to(puzzles, {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 1,
            stagger: 0.08,
            ease: 'back.out(1.5)',
          })
          // Then heading
          .to(heading, {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'back.out(1.7)',
          }, '-=0.6')
          // Then input
          .to(input, {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'back.out(1.7)',
          }, '-=0.5')
          // Then footer elements
          .to([links, logo], {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
          }, '-=0.4');

        // Continuous floating animation for puzzles
        ScrollTrigger.create({
          trigger: section,
          start: 'top 50%',
          onEnter: () => {
            puzzles.forEach((puzzle, index) => {
              if (puzzle) {
                gsap.to(puzzle, {
                  y: gsap.utils.random(-20, 20),
                  rotation: gsap.utils.random(-8, 8),
                  duration: gsap.utils.random(2, 4),
                  repeat: -1,
                  yoyo: true,
                  ease: 'sine.inOut',
                  delay: index * 0.1,
                });
              }
            });
          },
          onLeaveBack: () => {
            puzzles.forEach(puzzle => {
              if (puzzle) {
                gsap.killTweensOf(puzzle);
              }
            });
          }
        });
      }

      // Refresh ScrollTrigger after all animations are set up
      ScrollTrigger.refresh();
    });

    // Cleanup function
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [
    section1Ref,
    section2Ref,
    section3Ref,
    section4Ref,
    puzzlesRef,
    phoneDigitsRef,
    socialSignsRef,
    bgLinesRef,
  ]);

  return {};
};