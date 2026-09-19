import { useEffect, useState } from 'react';

/**
 * Make the header glass out of whatever colour is behind it.
 *
 * Four attempts got here, and each failure taught the next. 3% white glass
 * vanished over pale pages. A fixed navy fixed contrast and killed the frosted
 * finish. Darkening the sampled colour produced a flat grey slab, because a
 * near-neutral cream has no hue left at a fifth of its lightness. A white pill
 * read as a white slab pasted onto a tan page.
 *
 * So the pill is now built FROM the sampled colour: the page's own hue, lifted
 * slightly so it reads as glass rather than as a hole, and the text polarity
 * flips to whatever that colour can carry. Over the tan hero you get a frosted
 * tan pill with dark text; over the dark hero, a frosted near-black one with
 * white text. Never a colour the page does not already contain.
 */
export type HeaderSkin = {
  onLight: boolean;
  pill: string;
  border: string;
  shadow: string;
  ink: string;
  wash: string;
  /** A soft band behind the pill, in the page's own colour. */
  scrim: string;
};

type RGB = [number, number, number];

const DEFAULT_BG: RGB = [11, 25, 41];

function parse(css: string): RGB | null {
  const m = css.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const [r, g, b, a] = m[1].split(',').map((v) => parseFloat(v));
  if (a !== undefined && a < 0.35) return null;
  if ([r, g, b].some((v) => Number.isNaN(v))) return null;
  return [r, g, b];
}

const luminance = ([r, g, b]: RGB) => {
  const ch = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * ch(r) + 0.7152 * ch(g) + 0.0722 * ch(b);
};

/** Move a colour towards white or black by `amount`. */
const mix = ([r, g, b]: RGB, towards: RGB, amount: number): RGB => [
  Math.round(r + (towards[0] - r) * amount),
  Math.round(g + (towards[1] - g) * amount),
  Math.round(b + (towards[2] - b) * amount),
];

function sampleAt(x: number, y: number): RGB {
  for (const el of document.elementsFromPoint(x, y)) {
    if (el.closest('nav')) continue;                   // never sample ourselves
    const c = parse(getComputedStyle(el).backgroundColor);
    if (c) return c;
  }
  return parse(getComputedStyle(document.body).backgroundColor) ?? DEFAULT_BG;
}

function skinFor(bg: RGB): HeaderSkin {
  const light = luminance(bg) > 0.4;
  // A pale page gets its own colour lifted towards white; a dark one gets its
  // own colour pushed towards black. Either way the pill belongs to the page.
  const base = light ? mix(bg, [255, 255, 255], 0.34) : mix(bg, [0, 0, 0], 0.55);
  const [r, g, b] = base;
  return {
    onLight: light,
    pill: `rgba(${r},${g},${b},${light ? 0.82 : 0.62})`,
    border: light ? '1px solid rgba(60,45,20,0.14)' : '1px solid rgba(255,255,255,0.14)',
    shadow: light ? '0 10px 30px rgba(70,55,25,0.16)' : '0 10px 30px rgba(0,0,0,0.42)',
    ink: light ? '#2b2114' : '#ffffff',
    wash: light ? 'rgba(70,55,25,0.08)' : 'rgba(255,255,255,0.08)',
    // The pill floats ten pixels below the top of the window, and page content
    // slid through that gap as sharp clipped shapes above the header. This band
    // sits behind the pill in the page's own sampled colour and fades out, so
    // whatever passes underneath softens into the page instead of appearing to
    // be a broken element. Built from the same sample as the pill, so it is
    // never a colour the page does not already contain.
    scrim: `linear-gradient(to bottom, rgba(${r},${g},${b},0.62) 0%,`
         + ` rgba(${r},${g},${b},0.34) 58%, rgba(${r},${g},${b},0) 100%)`,
  };
}

// Routes that always want a fixed dark-blue header, regardless of what's behind it.
const FORCE_DARK = ['/usa', '/us'];
const isForceDark = () =>
  typeof window !== 'undefined' &&
  FORCE_DARK.includes((window.location.pathname.replace(/\/+$/, '') || '/').toLowerCase());

export function useHeaderSkin(): HeaderSkin {
  const [skin, setSkin] = useState<HeaderSkin>(() => skinFor(DEFAULT_BG));

  useEffect(() => {
    // USA landing: pin the dark-blue header and skip colour sampling entirely.
    if (isForceDark()) { setSkin(skinFor(DEFAULT_BG)); return; }
    let frame = 0;
    const read = () => {
      frame = 0;
      // Just below the pill, averaged across three points: a single point sat
      // over one table cell on the pricing page and flipped the whole header on
      // a striped row.
      const y = Math.min(window.innerHeight - 2, 130);
      const pts = [0.2, 0.5, 0.8].map((f) => sampleAt(Math.round(window.innerWidth * f), y));
      const avg = pts.reduce<RGB>(
        (acc, c) => [acc[0] + c[0] / pts.length, acc[1] + c[1] / pts.length, acc[2] + c[2] / pts.length],
        [0, 0, 0],
      ).map(Math.round) as RGB;
      setSkin(skinFor(avg));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    const t = window.setTimeout(read, 400);            // late-decoding images
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.clearTimeout(t);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return skin;
}
