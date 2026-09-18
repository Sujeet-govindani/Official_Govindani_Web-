import '@/styles/credibility.css';

/**
 * One credibility banner, split in two, shown under the hero:
 *   LEFT  — Meta Business Partner: the official Meta badge (Meta's own
 *           endorsement), shown alone with clear space per Meta brand rules.
 *   RIGHT — Birla Open Minds x Govindani: a partnership lockup for a marquee client.
 * Side-by-side on desktop/tablet, stacked on mobile. Motion is CSS-only and
 * respects prefers-reduced-motion.
 */
export default function CredibilityBanners() {
  return (
    <section className="gicred-split" aria-label="Trusted by Meta and Birla Open Minds">
      {/* -------- LEFT: Meta Business Partner -------- */}
      <div className="gicred-half gicred-meta">
        <div className="gicred-inner">
          <div className="gicred-pedestal gicred-rise">
            <img
              className="gicred-metabadge"
              src="/images/partners/meta-partner-badge-dark.png"
              alt="Meta Business Partner — official badge"
              width="360" height="202" loading="lazy"
            />
          </div>
          <p className="gicred-eyebrow gicred-rise d1">Officially recognised by Meta</p>
          <h2 className="gicred-h gicred-rise d1"><em>Meta</em> approves a few.<br />We made the cut.</h2>
          <p className="gicred-sub gicred-rise d2">
            You don&rsquo;t take our word for it &mdash; you take Meta&rsquo;s. Govindani is a{' '}
            <strong>verified Meta Business Partner</strong>, vetted and badged by Meta itself.
          </p>
          <div className="gicred-cta gicred-rise d3">
            <a className="gicred-btn gicred-btn-meta" href="/services/meta-ads/">Run ads with a Meta Partner &rarr;</a>
          </div>
        </div>
      </div>

      {/* -------- RIGHT: Birla Open Minds × Govindani -------- */}
      <div className="gicred-half gicred-birla">
        <div className="gicred-inner">
          <div className="gicred-birlacard gicred-rise">
            <img src="/images/partners/birla-open-minds-mark.svg" alt="Birla Open Minds" width="268" height="175" loading="lazy" />
          </div>
          <p className="gicred-eyebrow gicred-rise d1">A Birla-legacy institution chose us</p>
          <h2 className="gicred-h gicred-rise d1">The digital force behind<br /><em>Birla Open Minds.</em></h2>
          <p className="gicred-sub gicred-rise d2">
            The technology partner Birla Open Minds trusts to <strong>build, structure and power their
            entire digital world</strong> &mdash; engineered for the scale a name like Birla demands.
          </p>
          <div className="gicred-cta gicred-rise d3">
            <a className="gicred-btn gicred-btn-birla" href="https://birlaopenmindsbhopal.com" target="_blank" rel="noopener noreferrer">See it live &#8599;</a>
            <a className="gicred-btn gicred-btn-ghost gicred-ghost-dark" href="/contact/">Partner with us</a>
          </div>
        </div>
      </div>
    </section>
  );
}
