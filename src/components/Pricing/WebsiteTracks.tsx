import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  PLATFORMS, PURPOSES, MATRIX, WP_NGO, WP_ECOM, CODED_ECOM, CODED_NGO, SHOPIFY_ECOM,
  WP_GENERIC, CODED_GENERIC,
  COMMON_TERMS, PHASED, type TrackId,
} from './websiteTracksData';

const CSS = `
.wtr { --gold:#b3924f; --gold-soft:#d8c48d; --dark:#111; --paper:#f6f3ec; --card:#fff;
  --rule:#e6e0d4; --ink2:#5a5348; color:var(--dark);
  font-family:'Inter',system-ui,sans-serif; background:var(--paper); }
.wtr .wrap { max-width:1200px; margin:0 auto; padding:0 20px; }
.wtr h2 { font-family:'Libre Baskerville',Georgia,serif; font-size:clamp(1.5rem,3vw,2.1rem);
  margin:0 0 10px; letter-spacing:-.01em; }
.wtr h3 { font-family:'Libre Baskerville',Georgia,serif; font-size:1.22rem; margin:26px 0 10px; }
.wtr section { padding:56px 0; border-top:1px solid var(--rule); }
.wtr p.lede { color:var(--ink2); max-width:72ch; line-height:1.75; }

/* the chooser grid */
.wtr .grid { display:grid; gap:12px; margin-top:26px;
  grid-template-columns:minmax(120px,.8fr) repeat(2,1fr); align-items:stretch; }
.wtr .gh { font-size:.72rem; letter-spacing:.13em; text-transform:uppercase; font-weight:700;
  color:var(--gold); align-self:end; padding-bottom:6px; }
.wtr .rowlab { display:flex; flex-direction:column; justify-content:center; }
.wtr .rowlab b { font-family:'Libre Baskerville',Georgia,serif; font-size:1.05rem; font-weight:400; }
.wtr .rowlab span { font-size:.8rem; color:var(--ink2); line-height:1.5; margin-top:4px; }
.wtr .cell { background:var(--card); border:1px solid var(--rule); border-radius:12px;
  padding:16px; text-align:left; cursor:pointer; font:inherit; color:inherit;
  transition:border-color .2s ease, box-shadow .2s ease, transform .2s ease; }
.wtr .cell:hover { border-color:var(--gold-soft); transform:translateY(-2px);
  box-shadow:0 6px 18px rgba(17,17,17,.06); }
.wtr .cell.on { border-color:var(--gold); box-shadow:0 0 0 1px var(--gold) inset; }
.wtr .cell .amt { font-weight:800; font-size:1.16rem; display:block; }
.wtr .cell .sub { font-size:.78rem; color:var(--ink2); display:block; margin-top:4px; line-height:1.5; }
.wtr .cell.na { background:transparent; border-style:dashed; cursor:default; color:#a49b8b;
  font-size:.82rem; display:grid; place-items:center; text-align:center; }
.wtr .cell.na:hover { transform:none; box-shadow:none; border-color:var(--rule); }
@media (max-width:760px){
  .wtr .grid { grid-template-columns:1fr 1fr; }
  .wtr .rowlab { grid-column:1 / -1; margin-top:10px; }
  .wtr .gh { display:none; }
}

/* panel */
.wtr .panel { background:var(--card); border:1px solid var(--rule); border-radius:16px;
  padding:clamp(20px,3vw,34px); margin-top:26px; }
.wtr .eyebrow { font-size:.72rem; letter-spacing:.14em; text-transform:uppercase;
  font-weight:700; color:var(--gold); margin:0 0 8px; }
.wtr .bigprice { font-size:clamp(2rem,5vw,2.8rem); font-weight:800; letter-spacing:-.02em; }
.wtr .gst { font-size:.86rem; color:var(--ink2); font-weight:500; margin-left:8px; }
.wtr .what { background:var(--paper); border-left:3px solid var(--gold); padding:16px 20px;
  border-radius:0 10px 10px 0; margin:20px 0; line-height:1.75; color:#3c362c; }
.wtr table { width:100%; border-collapse:collapse; font-size:.92rem; }
.wtr th,.wtr td { text-align:left; padding:11px 14px; border-bottom:1px solid var(--rule);
  vertical-align:top; }
.wtr th { font-size:.7rem; letter-spacing:.1em; text-transform:uppercase; color:var(--ink2);
  font-weight:700; }
.wtr td.num { text-align:right; font-weight:700; white-space:nowrap; }
.wtr tr.tot td { border-top:2px solid var(--dark); border-bottom:0; font-weight:800; }
.wtr .tw { overflow-x:auto; border:1px solid var(--rule); border-radius:12px; }
.wtr .cols { display:grid; grid-template-columns:repeat(auto-fit,minmax(250px,1fr)); gap:10px 26px; }
.wtr dl { margin:0; }
.wtr dt { font-weight:700; font-size:.93rem; margin-top:13px; }
.wtr dd { margin:3px 0 0; font-size:.91rem; line-height:1.65; color:var(--ink2); }
.wtr .chip { display:inline-block; background:#eaf6ee; color:#1e7a45; font-weight:700;
  font-size:.78rem; padding:5px 12px; border-radius:999px; margin:0 8px 8px 0; }
.wtr .btn { display:inline-block; background:var(--gold); color:#111; font-weight:700;
  padding:13px 26px; border-radius:8px; text-decoration:none; margin-top:18px; }

.wtr .tiers { display:grid; gap:16px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin-top:22px; }
.wtr .tier { border:1px solid var(--rule); border-radius:14px; padding:24px; background:#fff; position:relative; }
.wtr .tier.rec { border-color:#1e7a45; background:#f4fbf6; }
.wtr .tier .tname { font-size:.72rem; letter-spacing:.13em; text-transform:uppercase; font-weight:700; color:var(--ink2); }
.wtr .tier .tprice { font-size:2rem; font-weight:800; letter-spacing:-.02em; margin:6px 0 2px; }
.wtr .tier .ttag { color:var(--gold); font-weight:700; font-size:.85rem; }
.wtr .tier .tbest { color:var(--ink2); font-size:.9rem; line-height:1.6; margin:10px 0 0; }
.wtr .tier ul { list-style:none; padding:0; margin:14px 0 0; }
.wtr .tier li { font-size:.9rem; line-height:1.55; padding:8px 0; border-top:1px solid var(--rule); color:#3c362c; }
.wtr .tier .badge { position:absolute; top:-11px; left:22px; background:#1e7a45; color:#fff;
  font-size:.62rem; font-weight:700; letter-spacing:.1em; padding:4px 11px; border-radius:999px; }
`;

const money = (s: string) => s;

function Totals({ rows, totalWith, totalWithout, totalWithoutLabel }:
  { rows: string[][]; totalWith: string; totalWithout: string; totalWithoutLabel: string }) {
  return (
    <div className="tw" style={{ marginTop: 18 }}>
      <table>
        <thead><tr><th>Item</th><th>Detail</th><th style={{ textAlign: 'right' }}>Amount</th></tr></thead>
        <tbody>
          {rows.map(([a, b, c]) => (
            <tr key={a}><td><strong>{a}</strong></td><td style={{ color: 'var(--ink2)' }}>{b}</td><td className="num">{money(c)}</td></tr>
          ))}
          <tr className="tot"><td colSpan={2}>Total including hosting</td><td className="num">{totalWith}</td></tr>
          <tr><td colSpan={2} style={{ color: 'var(--ink2)' }}>{totalWithoutLabel}</td><td className="num">{totalWithout}</td></tr>
        </tbody>
      </table>
    </div>
  );
}

function Milestones({ rows }: { rows: string[][] }) {
  return (
    <div className="tw" style={{ marginTop: 12 }}>
      <table>
        <thead><tr><th>Milestone</th><th>Stage</th><th>%</th><th style={{ textAlign: 'right' }}>Amount</th><th>Due</th></tr></thead>
        <tbody>
          {rows.map(([m, s, pc, amt, due]) => (
            <tr key={m}><td><strong>{m}</strong></td><td style={{ color: 'var(--ink2)' }}>{s}</td><td>{pc}</td><td className="num">{amt}</td><td style={{ color: 'var(--ink2)' }}>{due}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Groups({ groups }: { groups: { group: string; items: string[][] }[] }) {
  return (
    <>
      {groups.map((g) => (
        <div key={g.group}>
          <h3>{g.group}</h3>
          <div className="cols">
            {g.items.map(([t, d]) => (
              <dl key={t}><dt>{t}</dt><dd>{d}</dd></dl>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

function BuildPanel({ t }: { t: typeof WP_NGO | typeof WP_ECOM | typeof CODED_ECOM }) {
  const pages = 'pages' in t ? t.pages : undefined;
  const pagesCount = 'pagesCount' in t ? t.pagesCount : pages?.length;
  const hosting = 'hosting' in t ? t.hosting : undefined;
  const hostingNote = 'hostingNote' in t ? t.hostingNote : undefined;
  const tradeoff = ('tradeoff' in t ? t.tradeoff : undefined) as { title: string; body: string } | undefined;
  const upsell = ('upsell' in t ? t.upsell : undefined) as { title: string; body: string } | undefined;
  const platformCost = ('platformCost' in t ? t.platformCost : undefined) as
    { title: string; note: string; url: string; rows: string[][]; kicker: string } | undefined;
  return (
    <div className="panel">
      <p className="eyebrow">{t.eyebrow}</p>
      <h2>{t.title}</h2>
      <div className="bigprice">{t.price}<span className="gst">{t.priceNote}</span></div>
      <p className="what">{t.what}</p>

      <div>
        <span className="chip">{pagesCount} pages</span>
        <span className="chip">Delivery in {t.timeline}</span>
        <span className="chip">50 / 30 / 20 payment</span>
      </div>

      <h3>What it costs</h3>
      <Totals rows={t.totals} totalWith={t.totalWith} totalWithout={t.totalWithout} totalWithoutLabel={t.totalWithoutLabel} />

      <h3>Payment milestones</h3>
      <Milestones rows={t.milestones} />
      <p style={{ fontSize: '.86rem', color: 'var(--ink2)', marginTop: 10 }}>
        Work begins only after the advance is received and all content and access credentials are
        submitted. {t.timelineNote}
      </p>

      {hosting && (
        <>
          <h3>Hosting — required for this build</h3>
          <div className="tw"><table><tbody>
            {hosting.map(([a, b, c]) => (
              <tr key={a}><td><strong>{a}</strong></td><td style={{ color: 'var(--ink2)' }}>{b}</td><td className="num">{c}</td></tr>
            ))}
          </tbody></table></div>
          <p style={{ fontSize: '.88rem', color: 'var(--ink2)', marginTop: 10 }}>{hostingNote}</p>
        </>
      )}

      {tradeoff && (
        <div className="what" style={{ borderLeftColor: '#8a8172' }}>
          <strong>{tradeoff.title}.</strong> {tradeoff.body}
        </div>
      )}

      {platformCost && (
        <>
          <h3>{platformCost.title}</h3>
          <div className="tw"><table>
            <thead><tr><th>Shopify plan</th><th>What it costs</th><th style={{ textAlign: 'right' }}>Per year</th></tr></thead>
            <tbody>{platformCost.rows.map(([a, b, c]) => (
              <tr key={a}><td><strong>{a}</strong></td><td style={{ color: 'var(--ink2)' }}>{b}</td><td className="num">{c}</td></tr>
            ))}</tbody>
          </table></div>
          <p style={{ fontSize: '.86rem', color: 'var(--ink2)', marginTop: 10 }}>
            {platformCost.note}{' '}
            <a href={platformCost.url} target="_blank" rel="noopener noreferrer nofollow"
               style={{ color: 'var(--dark)' }}>Check it yourself</a>.
          </p>
          <div className="what"><strong>{platformCost.kicker}</strong></div>
        </>
      )}

      <Groups groups={t.featureGroups} />

      {upsell && (
        <div className="what" style={{ borderLeftColor: '#1e7a45' }}>
          <strong>{upsell.title}.</strong> {upsell.body}
        </div>
      )}

      {pages && (
        <>
          <h3>Every page you get — {pages.length} in total</h3>
          <div className="tw"><table><tbody>
            {pages.map(([p, d], i) => (
              <tr key={p}><td style={{ color: 'var(--ink2)', width: 34 }}>{i + 1}</td><td><strong>{p}</strong></td><td style={{ color: 'var(--ink2)' }}>{d}</td></tr>
            ))}
          </tbody></table></div>
        </>
      )}

      <a className="btn" href="/contact-us/">Ask for this build</a>
    </div>
  );
}

const TRACKS: Record<string, { price: string; sub: string }> = {
  'wp-ngo':       { price: '₹35,000', sub: '18 pages · 35 features · 25 days' },
  'wp-ecom':      { price: '₹48,000', sub: 'WooCommerce + our plugin · 30 days' },
  'shopify-ecom': { price: 'From ₹75,000', sub: 'Hosted commerce · fastest launch · 20 days' },
  'coded-ngo':    { price: 'Quoted to scope', sub: 'Or included inside Give Setu' },
  'coded-ecom':   { price: '₹2,50,000', sub: 'Spring Boot + React · your server · 48 days' },
  'wp-generic':   { price: '₹25,000 – ₹45,000', sub: 'Three sizes · one-time · you own it' },
  'coded-generic':{ price: 'From ₹2,50,000', sub: 'When the site is really an application' },
};

export default function WebsiteTracks({ onShopify }: { onShopify?: () => void }) {
  const [params] = useSearchParams();
  const [sel, setSel] = useState<TrackId>('wp-ngo');
  useEffect(() => {
    const t = params.get('track') as TrackId | null;
    if (t && TRACKS[t]) {
      setSel(t);
      document.getElementById('website-tracks')?.scrollIntoView({ block: 'start' });
    }
  }, [params]);

  return (
    <div className="wtr">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <section id="website-tracks" style={{ borderTop: 0 }}>
        <div className="wrap">
          <h2>Pick the platform, then the purpose.</h2>
          <p className="lede">
            A website for a non-profit and a website for a shop are not the same job, and WordPress,
            Shopify and custom code are not interchangeable foundations. Choose the pair that
            matches you and the exact scope, price and timeline are below — no ranges, no “starting
            from”.
          </p>

          <div className="grid">
            <div />
            {PURPOSES.map((p) => <div className="gh" key={p.id}>{p.label}</div>)}

            {PLATFORMS.map((pf) => (
              <>
                <div className="rowlab" key={`${pf.id}-lab`}>
                  <b>{pf.label}</b><span>{pf.blurb}</span>
                </div>
                {PURPOSES.map((pu) => {
                  const id = MATRIX[pf.id]?.[pu.id];
                  if (!id) {
                    return <div className="cell na" key={`${pf.id}-${pu.id}`}>Not offered on this platform</div>;
                  }
                  const meta = TRACKS[id];
                  return (
                    <button
                      key={`${pf.id}-${pu.id}`}
                      type="button"
                      className={`cell${sel === id ? ' on' : ''}`}
                      aria-pressed={sel === id}
                      onClick={() => {
                        setSel(id);
                        if (id === 'shopify-ecom' && onShopify) onShopify();
                      }}
                    >
                      <span className="amt">{meta.price}</span>
                      <span className="sub">{meta.sub}</span>
                    </button>
                  );
                })}
              </>
            ))}
          </div>

          <div hidden={sel !== 'wp-ngo'}><BuildPanel t={WP_NGO} /></div>
          <div hidden={sel !== 'wp-ecom'}><BuildPanel t={WP_ECOM} /></div>
          <div hidden={sel !== 'coded-ecom'}><BuildPanel t={CODED_ECOM} /></div>
          <div hidden={sel !== 'coded-ngo'}>
            <div className="panel">
              <p className="eyebrow">{CODED_NGO.eyebrow}</p>
              <h2>{CODED_NGO.title}</h2>
              <div className="bigprice">{CODED_NGO.price}<span className="gst">{CODED_NGO.priceNote}</span></div>
              <p className="what">{CODED_NGO.what}</p>
              <p className="lede">{CODED_NGO.cta}</p>
              <Link className="btn" to={CODED_NGO.ctaHref}>{CODED_NGO.ctaLabel}</Link>
            </div>
          </div>
          <div hidden={sel !== 'wp-generic'}>
            <div className="panel">
              <p className="eyebrow">{WP_GENERIC.eyebrow}</p>
              <h2>{WP_GENERIC.title}</h2>
              <p className="lede">{WP_GENERIC.intro}</p>
              <div className="tiers">
                {WP_GENERIC.tiers.map((tr) => {
                  const isRec = 'rec' in tr && tr.rec;
                  return (
                    <div className={`tier${isRec ? ' rec' : ''}`} key={tr.name}>
                      {isRec && <span className="badge">MOST CHOSEN</span>}
                      <div className="tname">{tr.name}</div>
                      <div className="tprice">{tr.price}</div>
                      <div className="ttag">{tr.tag}</div>
                      <p className="tbest">{tr.best}</p>
                      <ul>{tr.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
                    </div>
                  );
                })}
              </div>
              <p className="what" style={{ marginTop: 22 }}>{WP_GENERIC.note}</p>
              <p className="lede">{WP_GENERIC.outro}</p>
              <a className="btn" href="/contact-us/">Ask for this build</a>
            </div>
          </div>

          <div hidden={sel !== 'coded-generic'}>
            <div className="panel">
              <p className="eyebrow">{CODED_GENERIC.eyebrow}</p>
              <h2>{CODED_GENERIC.title}</h2>
              <div className="bigprice">{CODED_GENERIC.price}<span className="gst">{CODED_GENERIC.priceNote}</span></div>
              <p className="what">{CODED_GENERIC.what}</p>
              <p className="lede">{CODED_GENERIC.cta}</p>
              <a className="btn" href={CODED_GENERIC.ctaHref}>{CODED_GENERIC.ctaLabel}</a>
            </div>
          </div>

          <div hidden={sel !== 'shopify-ecom'}>
            <BuildPanel t={SHOPIFY_ECOM} />
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <h2>{PHASED.title}</h2>
          <p className="lede">{PHASED.body}</p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <h2>What applies to every build</h2>
          <p className="lede">
            The clauses below are the ones that decide whether a project runs cleanly or turns into
            an argument. They are here, before you commit, rather than in an annexure afterwards.
          </p>
          <div className="cols" style={{ marginTop: 18 }}>
            {COMMON_TERMS.map(([t, d]) => (
              <dl key={t}><dt>{t}</dt><dd>{d}</dd></dl>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
