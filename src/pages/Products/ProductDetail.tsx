// @ts-nocheck
/**
 * One product of the Govindani Group, shown on the website of the company that
 * builds it.
 *
 * It is a page about the product, not a copy of the product's own site: the
 * hero, the problem it solves, what you get, who it is for, and then the two
 * links that matter — the product's own site and its page on the group site.
 * Every figure comes from src/data/groupProducts.ts.
 *
 * Routes are registered one per slug in App.tsx rather than as /products/:slug,
 * because prerender.mjs reads literal `path="..."` strings out of App.tsx and
 * skips anything with a colon in it — a param route would ship six pages that
 * no crawler ever sees.
 */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GROUP_PRODUCTS, productBySlug } from '@/data/groupProducts';
import { Band, Kicker, StatRow, Btn, NAVY, GOLD } from './ProductShell';

export default function ProductDetail({ slug }) {
  const p = productBySlug(slug);
  const others = GROUP_PRODUCTS.filter((x) => x.slug !== slug);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!p) return null;

  const a = p.accent;
  const tint = (o) => `color-mix(in srgb, ${a} ${o}%, transparent)`;

  return (
    /* The header clearance lives on this root div, not on the hero <section>.
       index.css carries a global
         @media (max-width:768px) { section:first-of-type { padding-top: 0 !important } }
       written for the homepage's full-bleed first section, and it zeroes the
       top padding of ANY page whose first element is a <section> — which put
       the breadcrumb and the product mark underneath the fixed header pill on
       every phone. --header-offset is the variable index.css defines for this
       exact job and it already tracks the pill's two heights. */
    <div style={{ background: NAVY, color: '#fff', minHeight: '100vh',
      fontFamily: 'inherit', overflowX: 'hidden', paddingTop: 'var(--header-offset)' }}>

      {/* ── Hero ── */}
      <Band pad="0 1.25rem 3.5rem">
        <nav aria-label="Breadcrumb" style={{ fontSize: '0.78rem', marginBottom: '1.8rem',
          color: 'rgba(255,255,255,0.45)' }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 0.5rem' }}>/</span>
          <Link to="/products" style={{ color: 'inherit', textDecoration: 'none' }}>Products</Link>
          <span style={{ margin: '0 0.5rem' }}>/</span>
          <span style={{ color: 'rgba(255,255,255,0.8)' }}>{p.name}</span>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', marginBottom: '1.4rem' }}>
          <img src={p.mark} alt="" width={44} height={44} loading="eager"
            style={{ width: '44px', height: '44px', objectFit: 'contain', borderRadius: '10px' }} />
          <div>
            <div style={{ fontSize: '1.05rem', fontWeight: 700 }}>{p.name}</div>
            <div style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.5)' }}>
              {p.kicker} · {p.domain}
            </div>
          </div>
        </div>

        <h1 style={{ fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3.4rem)', lineHeight: 1.1, letterSpacing: '-0.02em',
          margin: '0 0 1.3rem', maxWidth: '18ch' }}>{p.headline}</h1>
        <p style={{ fontSize: 'clamp(1rem, 1.6vw, 1.15rem)', lineHeight: 1.65,
          color: 'rgba(255,255,255,0.72)', maxWidth: '58ch', margin: '0 0 2.2rem' }}>{p.lede}</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '3rem' }}>
          <Btn href={p.liveUrl} accent={a} primary>Visit {p.domain} →</Btn>
          <Btn href="tel:+919201958273" accent={a}>Call +91 92019 58273</Btn>
        </div>

        <StatRow stats={p.stats} accent={a} />
      </Band>

      {/* ── The problem it answers ── */}
      <Band pad="3.5rem 1.25rem" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem', alignItems: 'start' }}>
          <div>
            <Kicker color={a}>Why it exists</Kicker>
            <h2 style={{ fontWeight: 700, fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', lineHeight: 1.2, letterSpacing: '-0.015em',
              margin: '0 0 1.1rem', maxWidth: '20ch' }}>{p.whyTitle}</h2>
            <p style={{ fontSize: '0.98rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.68)',
              margin: 0, maxWidth: '54ch' }}>{p.why}</p>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.9rem' }}>
            {p.points.map((pt) => (
              <li key={pt} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start',
                fontSize: '0.93rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.78)' }}>
                <span aria-hidden style={{ flex: 'none', width: '7px', height: '7px', marginTop: '0.55rem',
                  borderRadius: '50%', background: a }} />
                {pt}
              </li>
            ))}
          </ul>
        </div>
      </Band>

      {/* ── What you get ── */}
      <Band pad="3.5rem 1.25rem">
        <Kicker color={a}>What you get</Kicker>
        <h2 style={{ fontWeight: 700, fontSize: 'clamp(1.4rem, 2.6vw, 2rem)', lineHeight: 1.2, letterSpacing: '-0.015em',
          margin: '0 0 2.2rem' }}>Inside {p.name}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1rem' }}>
          {p.features.map((f) => (
            <div key={f.t} style={{ background: `linear-gradient(145deg, ${tint(6)}, rgba(255,255,255,0.015))`,
              border: `1px solid ${tint(16)}`, borderRadius: '18px', padding: '1.4rem' }}>
              <div style={{ fontSize: '0.98rem', fontWeight: 700, marginBottom: '0.5rem' }}>{f.t}</div>
              <div style={{ fontSize: '0.86rem', lineHeight: 1.6,
                color: 'rgba(255,255,255,0.62)' }}>{f.d}</div>
            </div>
          ))}
        </div>
      </Band>

      {/* ── Who it is for, and the two links out ── */}
      <Band pad="1rem 1.25rem 3.5rem">
        <div style={{ background: `linear-gradient(145deg, ${tint(9)}, rgba(255,255,255,0.02))`,
          border: `1px solid ${tint(22)}`, borderRadius: '24px', padding: 'clamp(1.6rem, 4vw, 2.6rem)' }}>
          <Kicker color={a}>Who it is for</Kicker>
          <p style={{ fontSize: 'clamp(1rem, 1.8vw, 1.2rem)', lineHeight: 1.6, fontWeight: 500,
            margin: '0 0 1.8rem', maxWidth: '62ch' }}>{p.audience}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
            <Btn href={p.liveUrl} accent={a} primary>Open {p.domain} →</Btn>
            {p.groupUrl !== p.liveUrl && (
              <Btn href={p.groupUrl} accent={a}>See it on Govindani Group</Btn>
            )}
          </div>
          <p style={{ marginTop: '1.4rem', marginBottom: 0, fontSize: '0.78rem',
            color: 'rgba(255,255,255,0.4)' }}>
            {p.name} is built and run by Govindani Infotech Private Limited, Pune — part of
            the <a href="https://govindanigroup.com/" target="_blank" rel="noopener"
              style={{ color: a, textDecoration: 'none' }}>Govindani Group</a>.
          </p>
        </div>
      </Band>

      {/* ── The rest of the shelf ── */}
      <Band pad="2rem 1.25rem 5rem" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <Kicker>The rest of the group</Kicker>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '0.8rem', marginTop: '1.4rem' }}>
          {others.map((o) => (
            <Link key={o.slug} to={`/products/${o.slug}`}
              style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', padding: '0.95rem 1.1rem',
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.09)',
                borderRadius: '14px', textDecoration: 'none', color: '#fff', minWidth: 0 }}>
              <img src={o.mark} alt="" width={26} height={26} loading="lazy"
                style={{ width: '26px', height: '26px', objectFit: 'contain', flex: 'none' }} />
              <span style={{ minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: '0.86rem', fontWeight: 600,
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{o.name}</span>
                <span style={{ display: 'block', fontSize: '0.7rem',
                  color: 'rgba(255,255,255,0.45)' }}>{o.kicker}</span>
              </span>
            </Link>
          ))}
        </div>
      </Band>
    </div>
  );
}
