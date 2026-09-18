import SEO from '@/components/SEO';
import { Link } from 'react-router-dom';
import { WP_NGO } from './websiteTracksData';

/* Three routes for a non-profit, on one page, so the decision can be made
   by comparing them rather than by clicking between pages. */

const CSS = `
.ngw { --gold:#b3924f; --gold-soft:#d8c48d; --dark:#111; --green:#1e7a45; --tint:#eaf6ee;
  --paper:#f6f3ec; --card:#fff; --rule:#e6e0d4; --ink2:#5a5348;
  background:var(--paper); color:var(--dark); font-family:'Inter',system-ui,sans-serif; }
.ngw .wrap { max-width:1200px; margin:0 auto; padding:0 20px; }
.ngw h1,.ngw h2,.ngw h3 { font-family:'Libre Baskerville',Georgia,serif; letter-spacing:-.01em; }
.ngw h1 { font-size:clamp(2rem,4.6vw,3.1rem); line-height:1.13; margin:0 0 18px; color:#fff; }
.ngw h2 { font-size:clamp(1.5rem,3vw,2.1rem); margin:0 0 10px; }
.ngw h3 { font-size:1.2rem; margin:26px 0 10px; }
.ngw section { padding:60px 0; border-top:1px solid var(--rule); background:var(--paper); }
.ngw section.alt { background:#efeade; }
.ngw p.lede { color:var(--ink2); max-width:74ch; line-height:1.75; }

.ngw .hero { background:var(--dark); color:#fff; padding:var(--hero-pt) 0 var(--hero-pb); border:0; }
@media (max-width:768px){ .ngw .hero { padding:var(--hero-pt-mobile) 0 var(--hero-pb-mobile); } }
.ngw .hero p { color:#d6d0c4; max-width:66ch; line-height:1.75; font-size:1.06rem; }
.ngw .hero strong { color:var(--gold); }

.ngw .three { display:grid; gap:18px; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); margin-top:28px; }
.ngw .r { background:var(--card); border:1px solid var(--rule); border-radius:16px; padding:26px;
  position:relative; display:flex; flex-direction:column; }
.ngw .r.rec { border-color:var(--green); background:var(--tint); }
.ngw .r .badge { position:absolute; top:-11px; left:24px; background:var(--green); color:#fff;
  font-size:.62rem; font-weight:700; letter-spacing:.1em; padding:4px 12px; border-radius:999px; }
.ngw .r .nm { font-size:.72rem; letter-spacing:.13em; text-transform:uppercase; font-weight:700; color:var(--ink2); }
.ngw .r .pr { font-size:2.1rem; font-weight:800; letter-spacing:-.02em; margin:8px 0 0; }
.ngw .r .pn { font-size:.84rem; color:var(--ink2); }
.ngw .r .who { margin:14px 0 0; font-size:.95rem; line-height:1.65; color:#3c362c; }
.ngw .r ul { list-style:none; padding:0; margin:16px 0 0; flex:1; }
.ngw .r li { font-size:.9rem; line-height:1.5; padding:8px 0; border-top:1px solid rgba(0,0,0,.08); color:#3c362c; }
.ngw .r .go { display:inline-block; margin-top:18px; background:var(--gold); color:#111;
  font-weight:700; padding:12px 22px; border-radius:8px; text-decoration:none; text-align:center; }
.ngw .r.rec .go { background:var(--green); color:#fff; }

.ngw .tw { overflow-x:auto; border:1px solid var(--rule); border-radius:12px; background:var(--card); margin-top:20px; }
.ngw table { width:100%; border-collapse:collapse; font-size:.92rem; }
.ngw th,.ngw td { text-align:left; padding:12px 15px; border-bottom:1px solid var(--rule); vertical-align:top; }
.ngw th { font-size:.7rem; letter-spacing:.09em; text-transform:uppercase; color:var(--ink2); font-weight:700; }
.ngw td.f { font-weight:600; }
.ngw .col3 { background:var(--tint); }
.ngw .note { background:var(--card); border-left:3px solid var(--gold); padding:16px 20px;
  border-radius:0 10px 10px 0; margin-top:20px; line-height:1.7; color:#3c362c; }
.ngw .cols { display:grid; grid-template-columns:repeat(auto-fit,minmax(250px,1fr)); gap:8px 26px; margin-top:14px; }
.ngw dl { margin:0; } .ngw dt { font-weight:700; font-size:.93rem; margin-top:13px; }
.ngw dd { margin:3px 0 0; font-size:.91rem; line-height:1.65; color:var(--ink2); }
.ngw .chip { display:inline-block; background:var(--tint); color:var(--green); font-weight:700;
  font-size:.8rem; padding:5px 12px; border-radius:999px; margin:0 8px 8px 0; }
`;

const ROUTES = [
  {
    nm: 'One-time build',
    title: 'NGO WordPress',
    pr: '₹35,000',
    pn: '+ 18% GST · one-time · you own it',
    who: 'Your organisation needs to be represented properly online and to accept donations — but the receipting, compliance and donor systems are handled elsewhere, or not yet needed.',
    li: [
      '18 pages, written for a non-profit',
      '35 features, all editable by your own team',
      'Razorpay donations — one-time and custom amounts',
      'Automated donor email and a PDF certificate',
      'Campaign pages with a live progress bar',
      'Volunteer registration and events',
      '30-day free maintenance, then it is yours to run',
    ],
    to: '/pricing/websites?track=wp-ngo',
    cta: 'See the full build',
  },
  {
    nm: 'Subscription',
    title: 'Give Setu',
    pr: 'From ₹25,000',
    pn: 'per year + 18% GST · website included',
    rec: true,
    who: 'You issue 80G receipts, you file 10BD, you keep donor records, and you would rather all of it lived in one register than in six systems and a spreadsheet.',
    li: [
      'Everything the WordPress build does',
      '80G receipt issued in under 4 seconds, immutable, gapless numbering',
      'Compliance Centre — 10BD prepared, 10BE dispatched automatically',
      'Donor CRM, membership, cases and campaigns in one register',
      'New campaign design templates every month while you are on a plan',
      '0% commission on every rupee you raise, permanently',
      'Website included in the plan — custom-coded on Advanced, and maintained by us throughout',
    ],
    to: '/pricing/ngo-os',
    cta: 'See Give Setu in full',
  },
  {
    nm: 'Built to order',
    title: 'NGO custom-coded',
    pr: 'Quoted to scope',
    pn: 'our published coded rate starts at ₹2,50,000 + GST',
    who: 'You have a way of working that no platform will accommodate — an unusual programme structure, an integration with something you already run, or a portal your beneficiaries log into.',
    li: [
      'Spring Boot and React, on your own server',
      'Every screen and behaviour engineered to your requirement',
      'No platform ceiling and no plugin conflicts',
      'Priced against your actual scope, not a package',
      '3 months maintenance from handover',
      'No monthly template library — there is no subscription behind it',
    ],
    to: '/pricing/websites?track=coded-ngo',
    cta: 'See the coded route',
  },
];

const COMPARE: [string, string, string, string][] = [
  ['How you pay', '₹46,750 once, all-in — ₹35,000 build, ₹2,500 Razorpay, ₹6,750 GST, ₹2,500 hosting', 'From ₹25,000 a year, for as long as you use it. Growth at ₹45,000 includes this same WordPress website', 'Quoted once, to scope'],
  ['Who owns the website', 'You, outright — code handed over at handover', 'We do. It runs on our platform and is included while you are on a plan; it stops if the plan stops, and the code is not handed over', 'You, outright — code handed over at handover'],
  ['Accept donations online', 'Razorpay, one-time and custom amounts', 'Full donation engine, recurring included', 'Built to your requirement'],
  ['80G receipt', 'Structured to carry your 80G number; you supply the content', 'Issued automatically in under 4 seconds, immutable, gapless numbering, QR verification', 'Built to your requirement'],
  ['10BD / 10BE filing', 'Not included', 'Compliance Centre — validated, portal-ready, 10BE dispatched automatically', 'Built to your requirement'],
  ['Donor records', 'Donation list you export to Excel', 'Donor 360 — giving timeline, segments, PAN recovery, duplicate merge', 'Built to your requirement'],
  ['Membership', 'Not included', 'Membership ERP with renewals and digital ID cards', 'Built to your requirement'],
  ['Campaigns', 'Campaign pages with a progress bar', 'Campaign engine, tracking links, festival wizard, monthly new templates', 'Built to your requirement'],
  ['WhatsApp', 'Chat widget for enquiries', 'A verified WhatsApp rail at ₹1.00 a message, no platform fee', 'Built to your requirement'],
  ['Commission on donations', 'None — we are not in the transaction', '0%, permanently', 'None — we are not in the transaction'],
  ['Hosting', '₹2,500 + GST a year, or use your own', 'Included in the plan', 'Your own server, billed to you directly'],
  ['Maintenance', '30 days free, then quoted as work', 'For the whole of your term', '3 months from handover'],
  ['Delivery', '25 working days', 'Live within 60 seconds of payment', '48 working days or as scoped'],
];

export default function NgoWebsitePricing() {
  return (
    <div className="ngw">
      <SEO
        title="NGO Website Pricing India | WordPress ₹35,000, Give Setu or Custom-Coded"
        description="Three ways to put your non-profit online, all three prices on one page: a one-time WordPress build at ₹35,000, Give Setu from ₹25,000 a year with 80G receipting and 10BD filing, or a custom-coded platform quoted to scope."
        keywords="NGO website pricing India, NGO WordPress website cost, 80G receipt software, NGO website development price, non-profit website cost India"
      />
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <header className="hero">
        <div className="wrap">
          <h1>Three ways to put your organisation online.</h1>
          <p>
            A one-time WordPress build, a yearly system that runs your receipting and compliance,
            or a coded platform made to order. They are not tiers of the same thing — they are
            different answers, and the right one depends on whether your problem is the website
            or everything behind it. <strong>All three prices are on this page.</strong>
          </p>
        </div>
      </header>

      <section style={{ borderTop: 0 }}>
        <div className="wrap">
          <h2>The three routes</h2>
          <p className="lede">
            If you only need to be found, be trusted and collect a donation, the first one is
            enough. If you are issuing 80G receipts and filing 10BD, the second is the honest
            answer. The third exists for organisations whose way of working does not fit either.
          </p>
          <div className="three">
            {ROUTES.map((r) => (
              <div className={`r${r.rec ? ' rec' : ''}`} key={r.title}>
                {r.rec && <span className="badge">MOST ORGANISATIONS</span>}
                <div className="nm">{r.nm}</div>
                <div className="pr">{r.pr}</div>
                <div className="pn">{r.pn}</div>
                <p className="who">{r.who}</p>
                <ul>{r.li.map((x) => <li key={x}>{x}</li>)}</ul>
                <Link className="go" to={r.to}>{r.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <h2>Compared honestly, line by line</h2>
          <p className="lede">
            Where a row says “built to your requirement”, that is not a dodge — a coded build can
            do any of it, and the cost depends on how much of it you ask for.
          </p>
          <div className="tw">
            <table>
              <thead>
                <tr>
                  <th>What you need</th>
                  <th>NGO WordPress</th>
                  <th className="col3">Give Setu</th>
                  <th>Custom-coded</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map(([f, a, b, c]) => (
                  <tr key={f}>
                    <td className="f">{f}</td>
                    <td>{a}</td>
                    <td className="col3">{b}</td>
                    <td>{c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="note">
            <strong>The question that decides it.</strong> Ask who issues your 80G receipts today,
            and how. If the answer involves a spreadsheet, a template and somebody’s evening, the
            website is not your problem — and a website will not fix it.
          </p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <h2>What the WordPress build actually contains</h2>
          <p className="lede">
            The full page list and every feature, so you can check it against what you were about
            to buy elsewhere. {WP_NGO.pages.length} pages, {WP_NGO.featureGroups.reduce((n, g) => n + g.items.length, 0)} features,
            delivered in {WP_NGO.timeline}.
          </p>
          <div>
            <span className="chip">₹35,000 + 18% GST</span>
            <span className="chip">50 / 30 / 20 payment</span>
            <span className="chip">30-day free maintenance</span>
          </div>
          {WP_NGO.featureGroups.map((g) => (
            <div key={g.group}>
              <h3>{g.group}</h3>
              <div className="cols">
                {g.items.map(([t, d]) => <dl key={t}><dt>{t}</dt><dd>{d}</dd></dl>)}
              </div>
            </div>
          ))}
          <h3>Every page you get</h3>
          <div className="tw">
            <table><tbody>
              {WP_NGO.pages.map(([p, d], i) => (
                <tr key={p}>
                  <td style={{ color: 'var(--ink2)', width: 34 }}>{i + 1}</td>
                  <td className="f">{p}</td>
                  <td style={{ color: 'var(--ink2)' }}>{d}</td>
                </tr>
              ))}
            </tbody></table>
          </div>
          <p className="note">
            Hosting and domain are ₹2,500 + GST for the first year if you do not already have
            them. Payment is 50% to begin, 30% at first draft, 20% on handover — and the clock
            starts only once the advance, your content and your access credentials are all in.
          </p>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <h2>Still not sure which one?</h2>
          <p className="lede">
            Answer this instead: in twelve months, do you want to be maintaining a website, or
            running an organisation on a system? If it is the second, start on Give Setu — the
            website is included inside it, so you are not buying one twice. If owning the code
            outright matters more to you than any of the rest of it, buy the ₹35,000 WordPress
            build instead. It is yours on handover, and we would rather say that than sell you a
            subscription you did not want.
          </p>
          <div style={{ marginTop: 20, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link className="go" to="/pricing/ngo-os"
              style={{ display: 'inline-block', background: 'var(--green)', color: '#fff', fontWeight: 700, padding: '13px 26px', borderRadius: 8, textDecoration: 'none' }}>
              See Give Setu in full
            </Link>
            <a href="/contact-us/"
              style={{ display: 'inline-block', background: 'transparent', border: '1px solid var(--dark)', color: 'var(--dark)', fontWeight: 700, padding: '13px 26px', borderRadius: 8, textDecoration: 'none' }}>
              Talk it through with us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
