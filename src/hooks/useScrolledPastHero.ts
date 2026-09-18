import { useEffect, useState } from 'react';

/**
 * True once the visitor has scrolled past the hero.
 *
 * The floating "Reach Out" and WhatsApp buttons sat on top of the hero from the
 * first paint, competing with the hero's own calls to action. They should only
 * appear once the hero has been scrolled away.
 *
 * The threshold is the bottom of the hero section where one exists (the
 * homepage), and a plain scroll distance elsewhere, so inner pages behave
 * sensibly too.
 *
 * Starts false deliberately: the pre-renderer captures every page at scroll 0,
 * so the first client render must agree or React throws a hydration mismatch
 * and re-renders the whole tree.
 */
const FALLBACK_SCROLL = 320;

export function useScrolledPastHero(): boolean {
  const [past, setPast] = useState(false);

  useEffect(() => {
    let frame = 0;

    const compute = () => {
      frame = 0;
      const hero = document.querySelector('section#home');
      const threshold = hero
        ? hero.getBoundingClientRect().height * 0.75
        : FALLBACK_SCROLL;
      setPast(window.scrollY > threshold);
    };

    // rAF-throttled: this fires on every scroll event otherwise
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(compute);
    };

    compute();                       // sync once after mount
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return past;
}
