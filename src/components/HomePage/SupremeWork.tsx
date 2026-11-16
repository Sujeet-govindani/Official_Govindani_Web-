import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supremeWork } from '@/data/supremeWork';
import '@/styles/supreme-work.css';

/**
 * The work, shown as the work.
 *
 * This replaces a slide that told visitors what we build. Claims are cheap on a
 * web studio's homepage; the sites themselves are not. So each entry is a real
 * screenshot of the live site, the numbers that site publishes about itself,
 * the engineering worth naming, and a link straight out to it — a visitor who
 * clicks lands on the thing we are describing and can judge it unaided.
 *
 * One banner is open at a time. The rest stay as a rail of covers, so six
 * projects cost one screen rather than six.
 */
export default function SupremeWork({ only, heading, sub }: { only?: string[]; heading?: string; sub?: string } = {}) {
  // `only` narrows the set to a few ids, so the NGO service page can show the
  // NGO builds without the e-commerce ones, from this one source of truth.
  const sites = only?.length ? supremeWork.filter((s) => only.includes(s.id)) : supremeWork;
  const [active, setActive] = useState(0);
  const site = sites[Math.min(active, sites.length - 1)];

  return (
    <section className="gsw" aria-label="Recent websites we have built">
      <div className="gsw-wrap">

        <header className="gsw-head">
          <p className="gsw-eyebrow">Recently shipped</p>
          <h2 className="gsw-h">
            {heading ?? 'We could describe the work.'}<br />
            <em>{sub ?? 'Easier to just open it.'}</em>
          </h2>
        </header>

        {/* the rail of covers — tap one to open its banner */}
        <div className="gsw-rail" role="tablist" aria-label="Choose a project">
          {sites.map((s, i) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={i === active}
              className={`gsw-tab${i === active ? ' is-on' : ''}`}
              onClick={() => setActive(i)}
              style={{ '--accent': s.accent } as React.CSSProperties}
            >
              <img src={s.image} alt="" width="160" height="100" loading="lazy" decoding="async" />
              <span>{s.name}</span>
            </button>
          ))}
        </div>

        {/* the open banner */}
        <article className="gsw-banner" key={site.id} style={{ '--accent': site.accent } as React.CSSProperties}>
          <a className="gsw-shot" href={site.url} target="_blank" rel="noopener noreferrer"
             aria-label={`Open ${site.name} in a new tab`}>
            <img src={site.image} alt={`The ${site.name} website`} width="800" height="500" loading="lazy" decoding="async" />
            <span className="gsw-open">Open the live site &#8599;</span>
          </a>

          <div className="gsw-copy">
            <p className="gsw-sector">{site.sector}</p>
            <h3 className="gsw-name">{site.name}</h3>
            <p className="gsw-headline">{site.headline}</p>
            <p className="gsw-blurb">{site.blurb}</p>

            <ul className="gsw-stats">
              {site.stats.map((st) => (
                <li key={st.k}><b>{st.v}</b><span>{st.k}</span></li>
              ))}
            </ul>

            <ul className="gsw-tech">
              {site.tech.map((t) => <li key={t}>{t}</li>)}
            </ul>

            <div className="gsw-cta">
              <a className="gsw-btn" href={site.url} target="_blank" rel="noopener noreferrer">
                Visit {site.name} &#8599;
              </a>
              {site.caseStudy && (
                <Link className="gsw-btn gsw-btn-ghost" to={site.caseStudy}>Read the case study &rarr;</Link>
              )}
            </div>
          </div>
        </article>

        <p className="gsw-foot">
          Every screenshot here is the live site as it stands today &mdash; open any of them and
          judge it yourself. <Link to="/pages/case-study">See all case studies &rarr;</Link>
        </p>
      </div>
    </section>
  );
}
