import { useState } from "react";
import GoogleForm from "../ui/GoogleForm";
import ContactUsForm from "@/pages/ContactUsForm";
/* ═══════════════════════════════════════════════════════════════
   RealEstatePage.jsx   Real Estate Business full page
   Fonts : Libre Baskerville (headings) | Inter (body)
   Palette: Gold #C9A84C | Cream #F5F0E8 | BG #0A0A0A
═══════════════════════════════════════════════════════════════ */

const CSS = `

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
body{background:#0A0A0A;color:#fff;font-family:'Inter',sans-serif;overflow-x:hidden;}

:root{
  --g:#C9A84C; --g2:#E0B85A; --cr:#F5F0E8;
  --b1:#0A0A0A; --b2:#0E0E0E; --b3:#111111;
  --bd:rgba(201,168,76,.18); --bds:rgba(201,168,76,.07);
}

/* ── section ── */
.re{width:100%;padding:64px 7vw;position:relative;}
.re.b1{background:var(--b1);}
.re.b2{background:var(--b2);}
.re.b3{background:var(--b3);}
.re+.re{border-top:1px solid var(--bd);}

.inn{max-width:1200px;margin:0 auto;}

/* ── two-col ── */
.tc{display:flex;align-items:center;gap:64px;}
.tc .col{flex:1;min-width:0;}
.tc .coli{flex:1;display:flex;justify-content:center;align-items:center;}

/* ── image box ── */
.ibox{width:100%;max-width:510px;aspect-ratio:4/3;border-radius:16px;border:none;background:transparent;overflow:hidden;}
.ibox img{width:100%;height:100%;object-fit:contain;border-radius:16px;display:block;}

/* ── typography ── */
.hg{font-family:'Libre Baskerville',serif;font-size:clamp(1.7rem,2.5vw,2.5rem);font-weight:700;color:var(--g);line-height:1.27;letter-spacing:-.01em;margin-bottom:24px;}
.hg-sm{font-size:clamp(1.2rem,1.7vw,1.75rem);}
.hg-lg{font-size:clamp(1.9rem,3vw,2.9rem);}
.hg-c{text-align:center;}
.sub{font-family:'Inter',sans-serif;font-size:clamp(.88rem,1.05vw,1rem);color:var(--cr);line-height:1.73;opacity:.88;}
.sub-p{font-family:'Inter',sans-serif;font-size:clamp(.88rem,1.05vw,1rem);color:var(--cr);line-height:1.73;opacity:.88;margin-bottom:14px;}

/* gold bar */
.gb{width:48px;height:3px;background:var(--g);border-radius:2px;margin-bottom:20px;}
.gb-c{margin:0 auto 20px;}

/* ── bullets ── */
.bl{list-style:none;display:flex;flex-direction:column;gap:12px;margin-bottom:28px;}
.bi{display:flex;align-items:flex-start;gap:11px;font-family:'Inter',sans-serif;font-size:clamp(.86rem,1vw,.98rem);color:var(--cr);line-height:1.68;}
.bi .tk{flex-shrink:0;margin-top:2px;}

/* ── buttons ── */
.br{display:flex;flex-wrap:wrap;gap:14px;}
.bg-btn{background:var(--g);color:#0A0A0A;font-family:'Inter',sans-serif;font-weight:700;font-size:.9rem;padding:13px 30px;border:none;border-radius:6px;cursor:pointer;letter-spacing:.03em;transition:all .25s;white-space:nowrap;}
.bg-btn:hover{background:var(--g2);transform:translateY(-2px);box-shadow:0 8px 24px rgba(201,168,76,.32);}
.bo-btn{background:transparent;color:var(--g);font-family:'Inter',sans-serif;font-weight:700;font-size:.9rem;padding:12px 30px;border:1.5px solid var(--g);border-radius:6px;cursor:pointer;letter-spacing:.03em;transition:all .25s;white-space:nowrap;}
.bo-btn:hover{background:rgba(201,168,76,.08);transform:translateY(-2px);}

/* ════════════════════
   SLIDER
════════════════════ */
.slo{position:relative;overflow:hidden;padding:10px 0;}
.slo::before,.slo::after{content:'';position:absolute;top:0;bottom:0;width:160px;z-index:2;pointer-events:none;}
.slo.fb1::before{left:0;background:linear-gradient(to right,#0A0A0A 25%,transparent);}
.slo.fb1::after{right:0;background:linear-gradient(to left,#0A0A0A 25%,transparent);}
.slo.fb2::before{left:0;background:linear-gradient(to right,#0E0E0E 25%,transparent);}
.slo.fb2::after{right:0;background:linear-gradient(to left,#0E0E0E 25%,transparent);}
.slo.fb3::before{left:0;background:linear-gradient(to right,#111111 25%,transparent);}
.slo.fb3::after{right:0;background:linear-gradient(to left,#111111 25%,transparent);}

.s-track{display:flex;gap:22px;width:max-content;animation:mq 22s linear infinite;}
.s-track.rv{animation-direction:reverse;animation-duration:18s;}
.s-track:hover{animation-play-state:paused;}
@keyframes mq{from{transform:translateX(0);}to{transform:translateX(-50%);}}

/* ── Section 2 trust icon cards 140×50, image fully fits ── */
.icl{
  width:140px;
  height:50px;
  border-radius:10px;
  border:1px solid var(--bd);
  background:var(--bds);
  display:flex;
  align-items:center;
  justify-content:center;
  padding:6px 12px;
  flex-shrink:0;
  transition:border-color .3s,transform .3s;
  overflow:hidden;
}
.icl:hover{border-color:var(--g);transform:translateY(-4px);}
.icl img{
  width:100%;
  height:100%;
  object-fit:contain;
  display:block;
}

/* ── Section 9 integration icon cards 140×50, image fully fills, no label ── */
.ics{
  width:140px;
  height:50px;
  border-radius:10px;
  border:1px solid var(--bd);
  background:var(--bds);
  display:flex;
  align-items:center;
  justify-content:center;
  padding:6px 12px;
  flex-shrink:0;
  transition:border-color .3s,transform .3s;
  overflow:hidden;
}
.ics:hover{border-color:var(--g);transform:translateY(-4px);}
.ics img{
  width:100%;
  height:100%;
  object-fit:contain;
  display:block;
}

/* ════════════════════
   S3 TIMELINE
════════════════════ */
.tlw{position:relative;display:flex;flex-direction:column;max-width:780px;margin:0 auto 52px;}
.tlw::before{content:'';position:absolute;left:27px;top:28px;bottom:28px;width:2px;background:linear-gradient(to bottom,#1a6b1a 0%,#E6A817 33%,#22c55e 66%,#2563EB 100%);border-radius:2px;}
.tli{display:flex;gap:28px;align-items:flex-start;padding:20px 0;}
.tlic{width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0;position:relative;z-index:1;}
.cc1{background:#1a6b1a;} .cc2{background:#E6A817;} .cc3{background:#22c55e;} .cc4{background:#2563EB;}
.tlb{flex:1;padding-top:10px;}
.tlt{font-family:'Libre Baskerville',serif;font-size:1.1rem;font-weight:700;color:var(--g);margin-bottom:7px;}
.tld{font-family:'Inter',sans-serif;font-size:.93rem;color:var(--cr);line-height:1.7;opacity:.85;}

/* s3 bottom text */
.s3bot{text-align:center;max-width:760px;margin:0 auto;padding-top:44px;border-top:1px solid var(--bd);}
.s3bot strong{color:var(--g);font-weight:600;}

/* ════════════════════
   DUAL-BLOCK DIVIDER
════════════════════ */
.dblk+.dblk{margin-top:80px;padding-top:80px;border-top:1px solid var(--bd);}

/* ════════════════════
   DOUBLE SLIDER (integration)
════════════════════ */
.dbl{display:flex;flex-direction:column;gap:16px;overflow:hidden;}

/* ════════════════════
   S11 LAST SECTION center CTA text above card
════════════════════ */
.cta-center{text-align:center;max-width:720px;margin:0 auto 52px;}
.cta-center .hg{margin-bottom:14px;}
.cta-center .ls-sub{font-family:'Libre Baskerville',serif;font-style:italic;font-size:clamp(.9rem,1.2vw,1.05rem);color:var(--cr);margin-bottom:8px;}
.cta-center .ls-tag{font-family:'Inter',sans-serif;font-size:.78rem;color:var(--g);opacity:.8;letter-spacing:.04em;margin-bottom:24px;}

/* ════════════════════
   GLASSY CTA CARD
════════════════════ */
.glass-cta-wrap{position:relative;margin-top:64px;}
.glass-cta{padding:56px 48px;border-radius:20px;text-align:center;background:rgba(255,255,255,.03);border:1px solid rgba(201,168,76,.25);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);box-shadow:0 8px 48px rgba(0,0,0,.4),inset 0 1px 0 rgba(255,255,255,.07);position:relative;overflow:hidden;}
.glass-cta::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at top center,rgba(201,168,76,.1) 0%,transparent 60%);pointer-events:none;}
.glass-cta::after{content:'';position:absolute;top:-60px;left:50%;transform:translateX(-50%);width:240px;height:240px;border-radius:50%;background:radial-gradient(circle,rgba(201,168,76,.12) 0%,transparent 70%);pointer-events:none;}
.gc-inner{position:relative;z-index:1;}
.cpills{display:flex;flex-wrap:wrap;justify-content:center;gap:14px;margin-bottom:36px;}
.cpill{display:flex;align-items:center;gap:9px;padding:11px 22px;border:1px solid rgba(201,168,76,.25);border-radius:50px;background:rgba(255,255,255,.04);backdrop-filter:blur(8px);font-family:'Inter',sans-serif;font-size:.88rem;color:var(--cr);transition:all .3s;white-space:nowrap;}
.cpill:hover{border-color:var(--g);background:rgba(201,168,76,.1);transform:translateY(-3px);}
.cpill .pc{color:var(--g);}

/* ════════════════════
   RESPONSIVE
════════════════════ */
@media(min-width:961px){
  .re.hero{padding-top:160px;padding-bottom:0;}
  .re:not(.hero){padding-top:48px;padding-bottom:48px;}
}
@media(max-width:960px){
  .re{padding:72px 5vw;}
  .re.hero{padding-top:100px;}
  .tc{flex-direction:column;gap:36px;}
  .tc.fl{flex-direction:column-reverse;}
  .coli{width:100%;}
  .ibox{max-width:100%;}
  .tlw{max-width:100%;}
  .tlw::before{left:23px;}
  .tlic{width:48px;height:48px;}
  .slo::before,.slo::after{width:80px;}
  .glass-cta{padding:44px 28px;}
  .dblk+.dblk{margin-top:56px;padding-top:56px;}
  .hg{font-size:clamp(1.5rem,3.5vw,2.2rem);}
  .hg-lg{font-size:clamp(1.7rem,4vw,2.4rem);}
}
@media(max-width:600px){
  .re{padding:56px 5vw 64px;}
  .re.hero{padding-top:100px !important;}
  .tc,.tc.fl{flex-direction:column !important;gap:28px;}
  .coli{width:100%;}
  .ibox{max-width:100%;aspect-ratio:3/2;}
  .br{flex-direction:column;}
  .bg-btn,.bo-btn{width:100%;text-align:center;padding:14px 20px;}
  .slo::before,.slo::after{width:44px;}
  .tlw::before{left:18px;top:24px;bottom:24px;}
  .tlic{width:38px;height:38px;font-size:.88rem;}
  .tli{gap:14px;padding:15px 0;}
  .tlb{padding-top:4px;}
  .tlt{font-size:1rem;}
  .tld{font-size:.87rem;}
  .cpills{gap:10px;}
  .cpill{padding:10px 14px;font-size:.8rem;}
  .glass-cta{padding:32px 18px;}
  .hg{font-size:clamp(1.3rem,6vw,1.75rem);}
  .hg-lg{font-size:clamp(1.5rem,6.5vw,2rem);}
  .hg-sm{font-size:clamp(1.05rem,4.8vw,1.4rem);}
  .hg-c{font-size:clamp(1.2rem,5.5vw,1.6rem);}
  .sub{font-size:.9rem;}
  .sub-p{font-size:.9rem;}
  .bi{font-size:.88rem;}
  .gb{margin-bottom:16px;}
  .dblk+.dblk{margin-top:44px;padding-top:44px;}
}
`;


const TL = [
  {
    c: "cc1", i: "🏠", t: "Acquire",
    d: "Integrate Google & FB Leads form to obtain leads. Answer FAQs quickly via custom auto-replies and help clients in choosing the right home & book site visits."
  },
  {
    c: "cc2", i: "💼", t: "Convert",
    d: "Send reminders for site visits. Upsell & Cross-sell with personalized plumbing, furniture, etc recommendations on WhatsApp."
  },
  {
    c: "cc3", i: "😊", t: "Delight",
    d: "Solve client queries quickly and at scale on WhatsApp. Gather ratings/feedback from clients using WhatsApp automated flows."
  },
  {
    c: "cc4", i: "🔔", t: "Engage",
    d: "Send festive and other discount offers to drive purchase interest. Send personalized property recommendations in their preferred location."
  },
];



/* ─── HELPERS ───────────────────────────────────────────── */
function Img({ src, alt }) {
  return (<div className="ibox"><img src={src} alt={alt} loading="lazy" decoding="async" /></div>);
}
function Bullets({ items }) {
  return (
    <ul className="bl">
      {items.map((t, i) => (<li className="bi" key={i}><span className="tk">✅</span><span>{t}</span></li>))}
    </ul>
  );
}
function Track({ items, small = false, reverse = false }) {
  const d = [...items, ...items];
  return (
    <div className={"s-track" + (reverse ? " rv" : "")}>
      {d.map((item, i) =>
        small
          ? <div className="ics" key={i}><img src={item.src} alt={item.label} loading="lazy" decoding="async" /></div>
          : <div className="icl" key={i}><img src={item.src} alt={item.label} loading="lazy" decoding="async" /></div>
      )}
    </div>
  );
}

/* ─── PAGE ──────────────────────────────────────────────── */
export default function RealEstatePage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <style>{CSS}</style>
      <GoogleForm isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      {/* ══ S1 HERO (L text, R image) ══ */}
      <section className="re b1 hero" style={{ paddingTop: 0, paddingBottom: 90 }}>
        <div className="inn">
          <div className="tc">
            <div className="col">

              <h1 className="hg hg-lg" style={{ marginTop: 200 }}>
                Scale your Real Estate Business with WhatsApp Automations
              </h1>
              <Bullets items={[
                "Schedule property visits & send automated reminders",
                "Automate FAQs for fast-tracking property deals",
                "Share property details catalog via PDF files",
              ]} />

            </div>
            <div className="coli">
              <Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Real-Estate/Real-Estate-Section1.webp" alt="Real Estate WhatsApp hero" />
            </div>
          </div>
        </div>
      </section>




      {/* ══ S2 TRUST + SLIDER ══ */}
      <section className="re b3">
        <div className="inn">
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div className="gb gb-c" />
            <h2 className="hg hg-c" style={{ marginBottom: 0 }}>
              Create delightful experiences on WhatsApp
            </h2>
          </div>

          <div className="tlw">
            {TL.map((item, i) => (
              <div className="tli" key={i}>
                <div className={"tlic " + item.c}>{item.i}</div>
                <div className="tlb">
                  <div className="tlt">{item.t}</div>
                  <p className="tld">{item.d}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="s3bot">
            <p className="sub" style={{ marginBottom: 18 }}>
              Leverage the WhatsApp Business Platform to acquire, engage & convert prospect buyers and retain customers.
            </p>
            <div className="gb gb-c" />
            <h3 className="hg hg-sm hg-c" style={{ marginBottom: 14 }}>
              Streamline Real Estate Lead Conversion with WhatsApp Business API
            </h3>
            <p className="sub">
              Leverage{" "}
              <strong style={{ color: "var(--g)", fontWeight: 600 }}>WhatsApp Business API</strong>{" "}
              to attract, engage, and retain real estate clients, driving higher conversions and satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* ══ S3 GENERATE LEADS + QUALIFY BUYERS ══ */}
      <section className="re b1">
        <div className="inn">

          {/* Block A Generate leads (L text, R image) */}
          <div className="dblk" style={{ marginTop: 0, paddingTop: 0, borderTop: "none" }}>
            <div className="tc">
              <div className="col">
                <div className="gb" />
                <h2 className="hg hg-sm">
                  Generate more leads for your real estate business with WhatsApp
                </h2>
                <Bullets items={[
                  "Run click-to-WhatsApp ads to generate leads",
                  "Share WhatsApp links on social media",
                  "Add WhatsApp chat widget on website and real estate agent landing pages",
                  "Offer QR code scan to enquire about properties",
                  "Set up automated greeting messages to share property details, collect information, request call backs",
                  "Use WhatsApp broadcasts to promote new property listings",
                ]} />

              </div>
              <div className="coli">
                <Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Real-Estate/Real-Estate-Section3-img1.webp" alt="Generate more real estate leads" />
              </div>
            </div>
          </div>

          {/* Block B Qualify leads (L image, R text) */}
          <div className="dblk">
            <div className="tc fl">
              <div className="coli">
                <Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Real-Estate/Real-Estate-Section3-img2.webp" alt="Qualify potential buyers" />
              </div>
              <div className="col">
                <div className="gb" />
                <h2 className="hg hg-sm">
                  Identify potential buyers with lead qualification on WhatsApp
                </h2>
                <Bullets items={[
                  "Follow up with targeted questions requesting budget, type of property and other questions",
                  "Set up FAQs around property details for faster resolution of queries",
                  "Use interactive WhatsApp messages to streamline responses and data collection",
                  "Integrate with CRM for better lead segmentation",
                  "Nurture long-distance leads with virtual property tours on WhatsApp",
                  "Assign leads to respective real estate agents based on location and other data points",
                ]} />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ══ S4 SCHEDULE VISITS + DOCUMENTS ══ */}
      <section className="re b2">
        <div className="inn">

          {/* Block A Schedule site visits (L text, R image) */}
          <div className="dblk" style={{ marginTop: 0, paddingTop: 0, borderTop: "none" }}>
            <div className="tc">
              <div className="col">
                <div className="gb" />
                <h2 className="hg hg-sm">
                  Schedule and confirm site visits on WhatsApp
                </h2>
                <Bullets items={[
                  "Follow-up with prospect buyers to schedule site visits",
                  "Set up WhatsApp chatbots to request preferred day and time with prospects",
                  "Schedule the site visit and assign real estate agents for walkthroughs",
                  "Set up site visit reminders and easy rescheduling to reduce last-minute drop-offs",
                ]} />
              </div>
              <div className="coli">
                <Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Real-Estate/Real-Estate-Section4-img1.webp" alt="Schedule site visits" />
              </div>
            </div>
          </div>

          {/* Block B Simplify documents (L image, R text) */}
          <div className="dblk">
            <div className="tc fl">
              <div className="coli">
                <Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Real-Estate/Real-Estate-Section5-img1.webp" alt="Simplify document submission" />
              </div>
              <div className="col">
                <div className="gb" />
                <h2 className="hg hg-sm">
                  Simplify document submission for prospect buyers
                </h2>
                <Bullets items={[
                  "Request documents for buyer verification using WhatsApp chatbots",
                  "Collect documents on WhatsApp over an encrypted channel",
                  "Categorize and save documents in your CRM",
                ]} />

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ══ S5 CUSTOMER SERVICE + SELLER SUBMISSION ══ */}
      <section className="re b3">
        <div className="inn">

          {/* Block A Customer service (L image, R text) */}
          <div className="dblk" style={{ marginTop: 0, paddingTop: 0, borderTop: "none" }}>
            <div className="tc fl">
              <div className="coli">
                <Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Real-Estate/Real-Estate-Section6.webp" alt="Customer service and support" />
              </div>
              <div className="col">
                <div className="gb" />
                <h2 className="hg hg-sm">
                  Offer proactive customer service and support
                </h2>
                <Bullets items={[
                  "Make complaint and request submission easy with WhatsApp automation data collection",
                  "Offer help in finding carpenters, painters, plumbers and more for repairs and refurbishments",
                ]} />
              </div>
            </div>
          </div>

          {/* Block B Seller property submission (L text, R image) */}
          <div className="dblk">
            <div className="tc">
              <div className="col">
                <div className="gb" />
                <h2 className="hg hg-sm">
                  Streamline property submission for sellers
                </h2>
                <Bullets items={[
                  "Request seller property details using list messages and request buttons",
                  "Invite property media (pictures and videos) for qualification",
                  "Request seller and property verification documents over an encrypted platform",
                  "Integrate with CRM to maintain seller records",
                ]} />

              </div>
              <div className="coli">
                <Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Real-Estate/Real-Estate-Section7.webp" alt="Property submission for sellers" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ══ S6 PAYMENT REMINDERS ══ */}
      <section className="re b1">
        <div className="inn">
          <div className="tc fl">
            <div className="coli">
              <Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Real-Estate/Real-Estate-section4-img2.webp" alt="Payment reminders" />
            </div>
            <div className="col">
              <div className="gb" />
              <h2 className="hg hg-sm">
                Automate payment reminders for real estate services and property
              </h2>
              <Bullets items={[
                "Follow up on pending payments, EMIs, rents and maintenance charges",
                "Request and remind broker fees submission (if applicable)",
                "Send WhatsApp checkout links to collect payments on the messaging platform",
              ]} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ S7 WHY WHATSAPP (top heading + L text R image) ══ */}
      <section className="re b2">
        <div className="inn">
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div className="gb gb-c" />
            <h2 className="hg hg-c" style={{ marginBottom: 0 }}>
              Why use WhatsApp for your Real Estate Business?
            </h2>
          </div>
          <div className="tc">
            <div className="col">
              <p className="sub-p">
                Real estate businesses typically experience lengthier sales cycles that include a lot of back and forth between buyers, sellers and agents. Using WhatsApp can help streamline the process for better resource allocation and ROI.
              </p>
              <Bullets items={[
                "24×7 support to buyers and sellers",
                "Conversation and interactive marketing of real estate properties",
                "Automated lead generation and qualification for better resource allocation",
                "Multilingual Support",
                "Proactive assistance in facilitating buying, selling and renting properties",
                "Reduce support costs by automating property queries",
                "Non-intrusive way of communicating with customers as compared to calls",
              ]} />
            </div>
            <div className="coli">
              <Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Real-Estate/Real-Estate-section4-img2.webp" alt="Why WhatsApp for real estate" />
            </div>
          </div>
        </div>
      </section>

      <ContactUsForm />
    </>
  );
}