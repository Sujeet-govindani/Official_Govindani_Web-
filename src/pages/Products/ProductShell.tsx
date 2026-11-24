// @ts-nocheck
/**
 * Shared chrome for the product shelf: the gold-on-navy look the header
 * dropdowns already use, so these pages read as part of govindaniit.com and not
 * as a lifted copy of govindanigroup.com.
 *
 * Everything here is presentational. The product facts live in
 * src/data/groupProducts.ts and nowhere else.
 */
import React from 'react';

export const NAVY = '#0B1929';
export const GOLD = '#D4AF37';

/** Section wrapper with the page's standard rhythm and max width. */
export function Band({ children, pad = '5rem 1.25rem', style = {} }) {
  return (
    <section style={{ padding: pad, ...style }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>{children}</div>
    </section>
  );
}

/** Small uppercase label that sits above a heading. */
export function Kicker({ children, color = GOLD }) {
  return (
    <div style={{ fontSize: '0.7rem', letterSpacing: '0.16em', textTransform: 'uppercase',
      color, fontWeight: 700, marginBottom: '0.9rem' }}>{children}</div>
  );
}

/**
 * The four-figure band. Sized against the row with a container query rather
 * than the viewport, because the same markup runs at 1440px and at 360px and a
 * viewport-based clamp clipped the longest label on a phone.
 */
export function StatRow({ stats, accent }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '1rem', containerType: 'inline-size' }}>
      {stats.map((s) => (
        <div key={s.k} style={{ background: 'rgba(255,255,255,0.035)',
          border: '1px solid rgba(255,255,255,0.09)', borderRadius: '16px',
          padding: '1.15rem 1rem', minWidth: 0, overflow: 'hidden' }}>
          <div style={{ fontWeight: 700, fontSize: 'clamp(1.3rem, 3.6cqw, 1.9rem)', lineHeight: 1.1, color: accent,
            whiteSpace: 'nowrap' }}>{s.v}</div>
          <div style={{ marginTop: '0.4rem', fontSize: '0.78rem', lineHeight: 1.45,
            color: 'rgba(255,255,255,0.6)' }}>{s.k}</div>
        </div>
      ))}
    </div>
  );
}

/** Primary / secondary buttons, accent-tinted per product. */
export function Btn({ href, to, children, accent, primary = false, onClick }) {
  const style = {
    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
    padding: '0.85rem 1.5rem', borderRadius: '100px', fontSize: '0.88rem', fontWeight: 600,
    textDecoration: 'none', transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)', cursor: 'pointer',
    background: primary ? accent : 'rgba(255,255,255,0.04)',
    color: primary ? NAVY : 'rgba(255,255,255,0.88)',
    border: primary ? '1px solid transparent' : '1px solid rgba(255,255,255,0.16)',
  };
  if (href) {
    /* External product sites open in a new tab: this page is the house, the
       product's own site is the destination, and sending people away from
       govindaniit.com entirely loses the thread back to it. */
    const ext = href.startsWith('http');
    return (
      <a href={href} style={style} onClick={onClick}
        {...(ext ? { target: '_blank', rel: 'noopener' } : {})}>{children}</a>
    );
  }
  return <a href={to} style={style} onClick={onClick}>{children}</a>;
}
