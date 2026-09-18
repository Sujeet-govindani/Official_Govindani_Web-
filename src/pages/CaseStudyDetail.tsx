import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { caseStudies } from '@/data/caseStudies';
import Header from '@/components/HomePage/Header';
import Footer from '@/components/HomePage/Footer';

/**
 * One case study, rendered from src/data/caseStudies.ts.
 *
 * A single template rather than 15 hand-built pages: the content differs, the
 * argument structure does not, and 15 copies of the same layout would drift
 * apart the first time anyone edited one of them.
 */
export default function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const cs = slug ? caseStudies.find(c => c.id === slug) : undefined;

  if (!cs) {
    return (
      <div style={{ background: '#0a0a0a', minHeight: '100vh' }}>
        <Header />
        <div style={{ maxWidth: 720, margin: '0 auto', padding: 'var(--header-offset) 1.5rem 6rem', textAlign: 'center' }}>
          <h1 style={{ fontFamily: "'Libre Baskerville',serif", color: '#E3C766', fontSize: '1.8rem' }}>
            Case study not found
          </h1>
          <p style={{ fontFamily: "'Inter',sans-serif", color: 'rgba(245,234,212,0.75)', lineHeight: 1.7 }}>
            This case study may have moved. Browse all of our work instead.
          </p>
          <Link to="/pages/case-study" style={{ color: '#E3C766', textDecoration: 'underline' }}>
            View all case studies
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const related = caseStudies.filter(c => c.id !== cs.id).slice(0, 3);

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh' }}>
      <Header />

      <style>{`
        .cs-wrap { max-width: 900px; margin: 0 auto; padding: var(--header-offset) 1.5rem 4rem; }
        .cs-eyebrow { font-family:'Montserrat',sans-serif; font-size:.7rem; letter-spacing:.18em;
          text-transform:uppercase; color:#C5A028; margin:0 0 1rem; }
        .cs-h1 { font-family:'Libre Baskerville',serif; font-size:2.1rem; line-height:1.25;
          color:#F5EAD4; margin:0 0 1.2rem; }
        .cs-summary { font-family:'Inter',sans-serif; font-size:1.05rem; line-height:1.8;
          color:rgba(245,234,212,0.86); margin:0 0 2rem; }
        .cs-meta { display:flex; flex-wrap:wrap; gap:.6rem; margin:0 0 2.6rem; }
        .cs-chip { font-family:'Inter',sans-serif; font-size:.72rem; letter-spacing:.04em;
          color:#43230F; background:#E3C766; border-radius:100px; padding:.34rem .8rem; font-weight:600; }
        .cs-hero-img { width:100%; border-radius:14px; border:1px solid rgba(197,160,40,.28);
          display:block; margin:0 0 3rem; }
        .cs-h2 { font-family:'Libre Baskerville',serif; font-size:1.4rem; color:#E3C766;
          margin:3rem 0 1rem; }
        .cs-h3 { font-family:'Libre Baskerville',serif; font-size:1.02rem; color:#F5EAD4;
          margin:0 0 .45rem; }
        .cs-p, .cs-li { font-family:'Inter',sans-serif; font-size:.95rem; line-height:1.8;
          color:rgba(245,234,212,0.82); }
        .cs-list { padding-left:1.15rem; margin:0; display:flex; flex-direction:column; gap:.7rem; }
        .cs-step { border-left:2px solid rgba(197,160,40,.4); padding:0 0 0 1.1rem; margin:0 0 1.6rem; }
        .cs-deliver { display:grid; grid-template-columns:repeat(auto-fit,minmax(250px,1fr)); gap:.8rem; }
        .cs-deliver div { background:rgba(197,160,40,.07); border:1px solid rgba(197,160,40,.2);
          border-radius:10px; padding:.85rem 1rem; font-family:'Inter',sans-serif;
          font-size:.88rem; color:rgba(245,234,212,0.88); }
        .cs-visit { display:inline-block; margin-top:2.4rem; font-family:'Inter',sans-serif;
          font-size:.9rem; color:#43230F; background:#E3C766; padding:.7rem 1.5rem;
          border-radius:100px; text-decoration:none; font-weight:600; }
        .cs-related { border-top:1px solid rgba(197,160,40,.22); margin-top:4rem; padding-top:2.4rem; }
        .cs-rel-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(230px,1fr)); gap:1.2rem; }
        .cs-rel-card { display:block; text-decoration:none; border:1px solid rgba(197,160,40,.22);
          border-radius:12px; overflow:hidden; background:rgba(197,160,40,.04); }
        .cs-rel-card img { width:100%; height:120px; object-fit:cover; display:block; }
        .cs-rel-card span { display:block; padding:.8rem 1rem; font-family:'Inter',sans-serif;
          font-size:.86rem; color:#F5EAD4; }
        @media (max-width:640px){
          .cs-wrap { padding:var(--header-offset) 1.1rem 3rem; }
          .cs-h1 { font-size:1.55rem; }
          .cs-summary { font-size:.96rem; }
          .cs-h2 { font-size:1.2rem; margin-top:2.2rem; }
        }
      `}</style>

      <article className="cs-wrap">
        <p className="cs-eyebrow">{cs.category}</p>
        <h1 className="cs-h1">{cs.client}: {cs.tagline}</h1>
        <p className="cs-summary">{cs.challenge}</p>

        <div className="cs-meta">
          {cs.stats.map(x => <span className="cs-chip" key={x}>{x}</span>)}
        </div>

        <img
          className="cs-hero-img"
          src={cs.image}
          alt={`${cs.client} website built by Govindani Infotech`}
          loading="lazy"
          decoding="async"
        />

        <h2 className="cs-h2">What we delivered</h2>
        <p className="cs-p">{cs.delivered}</p>

        <h2 className="cs-h2">The impact</h2>
        <p className="cs-p">{cs.impact}</p>

        <h2 className="cs-h2">Highlights</h2>
        <div className="cs-deliver">
          {cs.highlights.map((d, i) => <div key={i}>{d}</div>)}
        </div>

        <a className="cs-visit" href={cs.url} target="_blank" rel="noopener noreferrer">
          Visit {cs.client} →
        </a>

        <section className="cs-related">
          <h2 className="cs-h2" style={{ marginTop: 0 }}>More of our work</h2>
          <div className="cs-rel-grid">
            {related.map(r => (
              <Link className="cs-rel-card" to={`/pages/case-study/${r.id}`} key={r.id}>
                <img src={r.image} alt={r.client} loading="lazy" decoding="async" />
                <span>{r.client}</span>
              </Link>
            ))}
          </div>
        </section>
      </article>

      <Footer />
    </div>
  );
}
