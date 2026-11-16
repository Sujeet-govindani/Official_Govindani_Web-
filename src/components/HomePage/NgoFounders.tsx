import { ngoFounders, NGO_FOUNDER_REACH } from '@/data/ngoFounders';
import '@/styles/ngo-founders.css';

/**
 * "The people behind these builds" — the top of the NGO portfolio.
 *
 * The list underneath is a grid of websites, which says what we made but
 * nothing about who trusted us with it. These four founders reach more than ten
 * million people between them, and that is the argument: organisations with
 * that kind of audience chose us.
 *
 * Every number is read off the live profile rather than inherited from old copy
 * — three of the Instagram counts were being UNDERSTATED. Mallakhamb leads with
 * their India's Got Talent win instead, because a trophy outranks a follower
 * count. Harsh Chhikara's figure is a combined total across platforms, so his
 * card says "across platforms" and carries no Instagram tick: the same shape of
 * number meaning two different things is how a page quietly starts lying.
 */
export default function NgoFounders() {
  return (
    <section className="gnf" aria-label="The founders behind our NGO work">
      <div className="gnf-wrap">

        <header className="gnf-head">
          <p className="gnf-eyebrow">Who trusts us</p>
          <h2 className="gnf-h">
            These founders reach over {NGO_FOUNDER_REACH} people.<br />
            <em>They chose us to build it.</em>
          </h2>
        </header>

        <div className="gnf-grid">
          {ngoFounders.map((f) => (
            <article className="gnf-card" key={f.id}>
              <div className="gnf-top">
                <img className="gnf-face" src={f.portrait} alt="" aria-hidden="true"
                     width="72" height="72" loading="lazy" decoding="async" />
                <div className="gnf-id">
                  <h3 className="gnf-name">{f.name}</h3>
                  <a className="gnf-org" href={f.orgUrl} target="_blank" rel="noopener noreferrer">
                    {f.org} &#8599;
                  </a>
                </div>
                <div className="gnf-reach">
                  <b>{f.followers}</b>
                  <span>
                    {/* An Instagram count and a combined total are different
                        claims; the label says which, right under the figure. */}
                    {f.scope === 'all-platforms' ? 'across platforms' : 'followers'}
                    {f.verified && (
                      <svg className="gnf-tick" viewBox="0 0 24 24" aria-label="Verified account" role="img">
                        <path d="M12 2l2.4 1.8 3-.2.9 2.9 2.5 1.6-1.2 2.8 1.2 2.8-2.5 1.6-.9 2.9-3-.2L12 22l-2.4-1.8-3 .2-.9-2.9-2.5-1.6L4.4 13 3.2 10.2l2.5-1.6.9-2.9 3 .2z" fill="#3797f0" />
                        <path d="M10.6 15.2l-2.9-2.9 1.3-1.3 1.6 1.6 4-4 1.3 1.3z" fill="#fff" />
                      </svg>
                    )}
                  </span>
                </div>
              </div>

              {f.badge && <p className="gnf-badge">&#127942; {f.badge}</p>}
              <p className="gnf-claim">{f.claim}</p>

              {/* Their actual recent grid. A still, captured 17 Nov - it is
                  evidence of the account, not a pretend live embed. */}
              <a className="gnf-feed" href={`https://www.instagram.com/${f.handle}/`}
                 target="_blank" rel="noopener noreferrer"
                 aria-label={`Open @${f.handle} on Instagram`}>
                <img src={f.feed} alt={`Recent posts from @${f.handle}`}
                     width="1200" height="400" loading="lazy" decoding="async" />
                <span className="gnf-handle">@{f.handle}</span>
              </a>
            </article>
          ))}
        </div>

        <p className="gnf-foot">
          Follower counts read from each verified Instagram profile on 17 November 2026.
        </p>
      </div>
    </section>
  );
}
