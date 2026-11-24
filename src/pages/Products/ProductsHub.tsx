// @ts-nocheck
/**
 * /products — the shelf.
 *
 * Govindani Infotech builds websites, stores and campaigns for clients, and it
 * also builds six products of its own. Until this page existed the second half
 * was invisible here: govindanigroup.com linked out to every venture and no
 * venture linked back, so nothing tied the products to the company making them.
 */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GROUP_PRODUCTS } from '@/data/groupProducts';
import { Band, Kicker, Btn, NAVY, GOLD } from './ProductShell';

export default function ProductsHub() {
  const [hover, setHover] = useState(null);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    /* Header clearance on the root div, not the hero <section> — see the note
       in ProductDetail.tsx: a global section:first-of-type rule in index.css
       strips a first section's top padding below 768px. */
    <div style={{ background: NAVY, color: '#fff', minHeight: '100vh', overflowX: 'hidden',
      paddingTop: 'var(--header-offset)' }}>

      <Band pad="0 1.25rem 2.5rem">
        <Kicker>Govindani Group · Products</Kicker>
        <h1 style={{ fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.08, letterSpacing: '-0.025em',
          margin: '0 0 1.3rem', maxWidth: '16ch' }}>
          The software we build for ourselves.
        </h1>
        <p style={{ fontSize: 'clamp(1rem, 1.7vw, 1.18rem)', lineHeight: 1.65,
          color: 'rgba(255,255,255,0.72)', maxWidth: '62ch', margin: '0 0 2rem' }}>
          Govindani Infotech has built websites, stores and donation platforms for clients since
          2018. Along the way we kept hitting the same gaps — leads going cold, WhatsApp run from
          one phone, NGOs losing a cut of every donation — and built products to close them. Six of
          them are live, each on its own domain, all made and run by the same company in Pune.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
          <Btn href="https://govindanigroup.com/" accent={GOLD} primary>
            See the whole group →
          </Btn>
          <Btn to="/pages/case-study" accent={GOLD}>Client work instead</Btn>
        </div>
      </Band>

      {/* ── The six, as cards ── */}
      <Band pad="2.5rem 1.25rem 4rem">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.1rem' }}>
          {GROUP_PRODUCTS.map((p) => {
            const on = hover === p.slug;
            return (
              <Link key={p.slug} to={`/products/${p.slug}`}
                onMouseEnter={() => setHover(p.slug)} onMouseLeave={() => setHover(null)}
                style={{
                  display: 'block', textDecoration: 'none', color: '#fff', minWidth: 0,
                  background: on
                    ? `linear-gradient(150deg, color-mix(in srgb, ${p.accent} 14%, transparent), rgba(255,255,255,0.02))`
                    : 'linear-gradient(150deg, rgba(255,255,255,0.045), rgba(255,255,255,0.015))',
                  border: `1px solid ${on ? `color-mix(in srgb, ${p.accent} 45%, transparent)` : 'rgba(255,255,255,0.09)'}`,
                  borderRadius: '22px', padding: '1.6rem',
                  transform: on ? 'translateY(-5px)' : 'none',
                  boxShadow: on ? `0 18px 44px -20px color-mix(in srgb, ${p.accent} 55%, transparent)` : 'none',
                  transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
                }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem',
                  marginBottom: '1.1rem' }}>
                  <img src={p.mark} alt="" width={36} height={36} loading="lazy"
                    style={{ width: '36px', height: '36px', objectFit: 'contain', flex: 'none' }} />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: '1rem', fontWeight: 700, whiteSpace: 'nowrap',
                      overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
                    <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.48)' }}>
                      {p.kicker} · {p.domain}
                    </div>
                  </div>
                </div>
                <div style={{ fontSize: '1.02rem', fontWeight: 600, lineHeight: 1.35,
                  marginBottom: '0.7rem', color: on ? p.accent : '#fff',
                  transition: 'color 0.3s' }}>{p.headline}</div>
                <p style={{ fontSize: '0.86rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.6)',
                  margin: '0 0 1.2rem' }}>{p.menuLine}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                  {p.stats.slice(0, 2).map((s) => (
                    <span key={s.k} style={{ fontSize: '0.7rem', padding: '0.3rem 0.65rem',
                      borderRadius: '100px', border: '1px solid rgba(255,255,255,0.12)',
                      color: 'rgba(255,255,255,0.6)', whiteSpace: 'nowrap' }}>
                      <b style={{ color: p.accent, fontWeight: 700 }}>{s.v}</b> {s.k}
                    </span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      </Band>

      {/* ── The house itself ── */}
      <Band pad="0 1.25rem 5rem">
        <div style={{ background: 'linear-gradient(145deg, rgba(212,175,55,0.1), rgba(255,255,255,0.02))',
          border: '1px solid rgba(212,175,55,0.24)', borderRadius: '24px',
          padding: 'clamp(1.6rem, 4vw, 2.6rem)' }}>
          <Kicker>The house that builds them</Kicker>
          <h2 style={{ fontWeight: 700, fontSize: 'clamp(1.4rem, 2.8vw, 2.1rem)', lineHeight: 1.2, letterSpacing: '-0.015em',
            margin: '0 0 1rem', maxWidth: '22ch' }}>
            Govindani Infotech — the IT house behind 900+ websites.
          </h2>
          <p style={{ fontSize: '0.98rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.7)',
            maxWidth: '60ch', margin: '0 0 1.8rem' }}>
            NGOs, hospitals, marketplaces and D2C brands, for clients across India, the USA, the UK
            and the UAE since 2018. The products above come out of that work — each one started as
            something a client needed and no tool did properly.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
            <Btn to="/about-us/about-company" accent={GOLD} primary>About the company</Btn>
            <Btn href="https://govindanigroup.com/ventures/infotech" accent={GOLD}>
              Infotech on the group site
            </Btn>
          </div>
        </div>
      </Band>
    </div>
  );
}
