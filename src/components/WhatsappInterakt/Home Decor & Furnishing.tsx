import ContactUsForm from "@/pages/ContactUsForm";
import { useState, useEffect } from "react";
// import GoogleForm from "/NewProject/NEWGIIT/Official_Govindani_Web/src/components/ui/GoogleForm";
/* ═══════════════════════════════════════════════════════════════
   HomeDecorPage.jsx   Home & Decor Business full page
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
.hd{width:100%;padding:56px 7vw;position:relative;}
.hd.b1{background:var(--b1);}
.hd.b2{background:var(--b2);}
.hd.b3{background:var(--b3);}
.hd+.hd{border-top:1px solid var(--bd);}
.hd.hero{margin-top:144px;margin-bottom:0;}

.inn{max-width:1200px;margin:0 auto;}

/* ── two-col ── */
.tc{display:flex;align-items:center;gap:64px;}
.tc .col{flex:1;min-width:0;}
.tc .coli{flex:1;display:flex;justify-content:center;align-items:center;}

/* ── image box transparent, no bg, no border ── */
.ibox{width:100%;max-width:510px;aspect-ratio:4/3;border-radius:16px;background:transparent;border:none;overflow:hidden;}
.ibox img{width:100%;height:100%;object-fit:contain;border-radius:16px;display:block;}

/* ── typography ── */
.hg{font-family:'Libre Baskerville',serif;font-size:clamp(1.7rem,2.5vw,2.5rem);font-weight:700;color:var(--g);line-height:1.27;letter-spacing:-.01em;margin-bottom:24px;}
.hg-sm{font-size:clamp(1.2rem,1.7vw,1.75rem);}
.hg-lg{font-size:clamp(1.9rem,3vw,2.9rem);}
.hg-c{text-align:center;}
.sub{font-family:'Inter',sans-serif;font-size:clamp(.88rem,1.05vw,1rem);color:var(--cr);line-height:1.73;opacity:.88;}
.sub-p{font-family:'Inter',sans-serif;font-size:clamp(.88rem,1.05vw,1rem);color:var(--cr);line-height:1.73;opacity:.88;margin-bottom:16px;}

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

/* ── Trust icon card: 140×50, image fills container ── */
.icl{
  width:140px;
  height:50px;
  border-radius:10px;
  border:1px solid var(--bd);
  background:var(--bds);
  display:flex;
  align-items:center;
  justify-content:center;
  flex-shrink:0;
  overflow:hidden;
  transition:border-color .3s,transform .3s;
}
.icl:hover{border-color:var(--g);transform:translateY(-4px);}
.icl img{
  width:100%;
  height:100%;
  object-fit:cover;
  display:block;
}

.ics{width:152px;height:56px;border-radius:10px;border:1px solid var(--bd);background:var(--bds);display:flex;align-items:center;gap:10px;padding:0 14px;flex-shrink:0;transition:border-color .3s;}
.ics:hover{border-color:var(--g);}
.ics img{width:28px;height:28px;object-fit:contain;flex-shrink:0;}
.ics span{font-size:.68rem;color:var(--cr);opacity:.75;font-family:'Inter',sans-serif;white-space:nowrap;}

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

.s3bot{text-align:center;max-width:760px;margin:0 auto;padding-top:44px;border-top:1px solid var(--bd);}
.s3bot strong{color:var(--g);font-weight:600;}

/* ════════════════════
   DUAL-BLOCK
════════════════════ */
.dblk+.dblk{margin-top:56px;padding-top:56px;border-top:1px solid var(--bd);}

/* ════════════════════
   GLASSY STAT CARDS
════════════════════ */
.glass-row{display:flex;gap:20px;flex-wrap:wrap;margin-top:32px;}
.glass-card{flex:1;min-width:130px;padding:28px 22px;border-radius:18px;text-align:center;background:rgba(255,255,255,.04);border:1px solid rgba(201,168,76,.25);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);box-shadow:0 4px 32px rgba(0,0,0,.35),inset 0 1px 0 rgba(255,255,255,.06);transition:border-color .3s,transform .3s;position:relative;overflow:hidden;}
.glass-card::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at top left,rgba(201,168,76,.1) 0%,transparent 65%);pointer-events:none;}
.glass-card:hover{border-color:var(--g);transform:translateY(-6px);}
.gc-num{font-family:'Libre Baskerville',serif;font-size:clamp(1.8rem,3vw,2.5rem);font-weight:700;color:var(--g);margin-bottom:10px;line-height:1;}
.gc-lbl{font-family:'Inter',sans-serif;font-size:.8rem;color:var(--cr);line-height:1.5;opacity:.82;}

/* ════════════════════
   WHY STATS (S7) 3 big stat cards center
════════════════════ */
.why-stats{display:flex;gap:24px;flex-wrap:wrap;margin-top:40px;}
.why-stat{flex:1;min-width:160px;padding:36px 24px;border-radius:18px;text-align:center;border:1px solid var(--bd);background:var(--bds);position:relative;overflow:hidden;transition:border-color .35s,transform .35s;}
.why-stat::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at top,rgba(201,168,76,.09) 0%,transparent 65%);pointer-events:none;}
.why-stat:hover{border-color:var(--g);transform:translateY(-6px);}
.ws-num{font-family:'Libre Baskerville',serif;font-size:clamp(2rem,3.5vw,3rem);font-weight:700;color:var(--g);margin-bottom:10px;line-height:1;}
.ws-lbl{font-family:'Inter',sans-serif;font-size:.85rem;color:var(--cr);line-height:1.55;opacity:.84;}

/* ════════════════════
   SUCCESS STORY CARDS (S8)
════════════════════ */
.ss-grid{display:grid;grid-template-columns:1fr 1fr;gap:28px;margin-top:16px;}

.ss-card{border-radius:16px;border:1px solid var(--bd);background:var(--bds);overflow:hidden;transition:border-color .35s,transform .35s;display:flex;flex-direction:column;}
.ss-card:hover{border-color:var(--g);transform:translateY(-6px);}

.ss-img{width:100%;aspect-ratio:16/9;overflow:hidden;position:relative;}
.ss-img img{width:100%;height:100%;object-fit:cover;display:block;}
.ss-logo-strip{
  position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
  background:rgba(255,255,255,.92);backdrop-filter:blur(4px);
  border-radius:10px;padding:12px 24px;
  display:flex;align-items:center;justify-content:center;
  min-width:160px;
}
.ss-logo-strip img{height:36px;object-fit:contain;}

.ss-body{padding:28px 26px 30px;flex:1;display:flex;flex-direction:column;gap:14px;}
.ss-title{font-family:'Libre Baskerville',serif;font-size:clamp(1rem,1.3vw,1.2rem);font-weight:700;color:var(--g);line-height:1.35;}
.ss-desc{font-family:'Inter',sans-serif;font-size:.88rem;color:var(--cr);opacity:.82;line-height:1.6;flex:1;}
.ss-read{align-self:flex-start;background:transparent;color:var(--g);font-family:'Inter',sans-serif;font-weight:600;font-size:.85rem;padding:9px 20px;border:1.5px solid var(--g);border-radius:6px;cursor:pointer;transition:all .25s;white-space:nowrap;}
.ss-read:hover{background:rgba(201,168,76,.1);transform:translateY(-2px);}

/* ════════════════════
   DOUBLE SLIDER (integration)
════════════════════ */
.dbl{display:flex;flex-direction:column;gap:16px;overflow:hidden;}

/* ════════════════════
   GLASSY CTA CARD (bottom)
════════════════════ */
.glass-cta-wrap{position:relative;margin-top:56px;}
.glass-cta{padding:56px 48px;border-radius:20px;text-align:center;background:rgba(255,255,255,.03);border:1px solid rgba(201,168,76,.25);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);box-shadow:0 8px 48px rgba(0,0,0,.4),inset 0 1px 0 rgba(255,255,255,.07);position:relative;overflow:hidden;}
.glass-cta::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at top center,rgba(201,168,76,.1) 0%,transparent 60%);pointer-events:none;}
.glass-cta::after{content:'';position:absolute;top:-60px;left:50%;transform:translateX(-50%);width:240px;height:240px;border-radius:50%;background:radial-gradient(circle,rgba(201,168,76,.12) 0%,transparent 70%);pointer-events:none;}
.gc-inner{position:relative;z-index:1;}

.cpills{display:flex;flex-wrap:wrap;justify-content:center;gap:14px;margin-bottom:36px;}
.cpill{display:flex;align-items:center;gap:9px;padding:11px 22px;border:1px solid rgba(201,168,76,.25);border-radius:50px;background:rgba(255,255,255,.04);backdrop-filter:blur(8px);font-family:'Inter',sans-serif;font-size:.88rem;color:var(--cr);transition:all .3s;white-space:nowrap;}
.cpill:hover{border-color:var(--g);background:rgba(201,168,76,.1);transform:translateY(-3px);}
.cpill .pc{color:var(--g);}

.ls-sub{font-family:'Libre Baskerville',serif;font-style:italic;font-size:clamp(.9rem,1.2vw,1.05rem);color:var(--cr);margin-bottom:8px;}
.ls-tag{font-family:'Inter',sans-serif;font-size:.78rem;color:var(--g);opacity:.8;letter-spacing:.04em;margin-bottom:28px;}

/* quote */
.q-block{border-left:3px solid var(--g);padding-left:22px;margin-bottom:32px;}
.q-text{font-family:'Libre Baskerville',serif;font-style:italic;font-size:clamp(.93rem,1.2vw,1.05rem);color:var(--cr);line-height:1.72;margin-bottom:12px;}
.q-attr{font-family:'Inter',sans-serif;font-size:.82rem;color:var(--g);font-weight:600;}

/* ════════════════════
   RESPONSIVE
════════════════════ */
@media(min-width:961px){
  .hd.hero{padding-top:160px;padding-bottom:0;margin-top:0;}
  .hd:not(.hero){padding-top:48px;padding-bottom:48px;}
}
@media(max-width:960px){
  .hd{padding:44px 5vw;}
  .hd.hero{margin-top:80px;margin-bottom:0;}
  .tc{flex-direction:column;gap:36px;}
  .tc.fl{flex-direction:column-reverse;}
  .coli{width:100%;}
  .ibox{max-width:100%;}
  .tlw{max-width:100%;}
  .tlw::before{left:23px;}
  .tlic{width:48px;height:48px;}
  .slo::before,.slo::after{width:80px;}
  .glass-row{gap:14px;}
  .why-stats{gap:16px;}
  .ss-grid{grid-template-columns:1fr;}
  .glass-cta{padding:44px 28px;}
  .dblk+.dblk{margin-top:40px;padding-top:40px;}
  .hg{font-size:clamp(1.5rem,3.5vw,2.2rem);}
  .hg-lg{font-size:clamp(1.7rem,4vw,2.4rem);}
}
@media(max-width:600px){
  .hd{padding:36px 5vw 44px;}
  .hd.hero{margin-top:0px !important;margin-bottom:0;}
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
  .glass-row{flex-direction:column;gap:12px;}
  .glass-card{padding:22px 18px;}
  .gc-num{font-size:2rem;}
  .why-stats{flex-direction:column;gap:12px;}
  .why-stat{padding:26px 18px;}
  .ws-num{font-size:2.2rem;}
  .ss-grid{grid-template-columns:1fr;gap:20px;}
  .ss-body{padding:22px 18px 24px;}
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
  .dblk+.dblk{margin-top:32px;padding-top:32px;}
  .q-block{padding-left:14px;}
  .q-text{font-size:.9rem;}
  /* trust icon responsive */
  .icl{width:110px;height:40px;}
}
`;



const TL = [
  {
    c: "cc1", i: "🖱️", t: "Acquire",
    d: "Integrate your online store  for capturing qualified leads & drive conversions. Answer FAQs via custom auto-replies to solve queries quickly & efficiently."
  },
  {
    c: "cc2", i: "💼", t: "Convert",
    d: "Upsell & Cross-sell with personalized home decor & furniture recommendations on WhatsApp. Setup automated & personalized WhatsApp notifications to recover abandoned carts."
  },
  {
    c: "cc3", i: "😊", t: "Delight",
    d: "Support customers at scale 24×7 on WhatsApp. Gather ratings/feedback from clients using WhatsApp automated flows."
  },
  {
    c: "cc4", i: "🔔", t: "Engage",
    d: "Send festive offers, new launch & sales updates, engaging template library to drive sales. Send regular how-to videos and articles for the furniture/home decor pieces they bought."
  },
];

const QUOTE_STATS = [
  { num: "5X", lbl: "Higher open rate on WhatsApp as compared to other channels" },
  { num: "50", lbl: "Conversations handled in an hour on WhatsApp" },
  { num: "15", lbl: "Minutes or less is the response time on WhatsApp" },
];

const WHY_STATS = [
  { num: "98%", lbl: "Average open rate on campaigns" },
  { num: "47%", lbl: "Click-through rate on WhatsApp broadcasts" },
  { num: "17%+", lbl: "Higher conversion rate as compared to email, SMS and social media" },
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
          ? <div className="ics" key={i}><img src={item.src} alt={item.label} loading="lazy" decoding="async" /><span>{item.label}</span></div>
          /* S2 trust icons: 140×50, no label, image fills container */
          : <div className="icl" key={i}><img src={item.src} alt={item.label} loading="lazy" decoding="async" /></div>
      )}
    </div>
  );
}

/* ─── PAGE ──────────────────────────────────────────────── */
export default function HomeDecorPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 767);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const CTA = () => <div className="btn-row"></div>;
  return (
    <>
      <style>{CSS}</style>
      {/* <GoogleForm isOpen={modalOpen} onClose={()=>setModalOpen(false)}/> */}

      {/* ══ S1 HERO (L text, R image) ══ */}
      <section className="hd b1 hero">
        <div className="inn" style={{ marginTop: isMobile ? "70px" : 24 }}>
          <div className="tc">
            <div className="col">

              <h1 className="hg hg-lg">
                Grow your Home Decor and Furnishings business using WhatsApp
              </h1>
              <Bullets items={[
                "Automate FAQs on WhatsApp for fast-tracking sales",
                "Share product catalog on WhatsApp",
                "Stay connected 24×7 with WhatsApp",
              ]} />
              <div className="br"></div>
            </div>
            <div className="coli">
              <Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Home-Decor/Home-Decor-Section1.webp" alt="Home Decor WhatsApp hero" />
            </div>
          </div>
        </div>
      </section>



      {/* ══ S2 TIMELINE + BOTTOM TEXT ══ */}
      <section className="hd b3">
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
            <div className="gb gb-c" />
            <h3 className="hg hg-sm hg-c" style={{ marginBottom: 14 }}>
              How to use WhatsApp Business API to grow your business
            </h3>
            <p className="sub">
              The global home decor and furnishing market size is expected to grow to $805.75 billion in 2026 at a CAGR of 5%. Explore how{" "}
              <strong style={{ color: "var(--g)", fontWeight: 600 }}>WhatsApp Business API</strong>{" "}
              can help you cut through the noise and reach your customers faster!
            </p>
          </div>
        </div>
      </section>

      {/* ══ S3 PROMOTE PRODUCTS + CONVERT INTEREST ══ */}
      <section className="hd b1">
        <div className="inn">
          {/* Block A Promote new products (L text, R image) */}
          <div className="dblk">
            <div className="tc">
              <div className="col">
                <div className="gb" />
                <h2 className="hg hg-sm">
                  Promote your new products and collections with WhatsApp broadcasts
                </h2>
                <Bullets items={[
                  "Run click to WhatsApp ads to capture intent",
                  "Generate leads from interested customers",
                  "Add a WhatsApp widget on your website to capture leads",
                  "Share WhatsApp link on social media to initiate a conversation",
                ]} />

              </div>
              <div className="coli">
                <Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Home-Decor/Home-Decor-Section3-img1.webp" alt="Promote new products" />
              </div>
            </div>
          </div>

          {/* Block B Turn interest into purchase (L image, R text) */}
          <div className="dblk">
            <div className="tc fl">
              <div className="coli">
                <Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Home-Decor/Home-Decor-section3-img2.webp" alt="Turn interest into purchase" />
              </div>
              <div className="col">
                <div className="gb" />
                <h2 className="hg hg-sm">
                  Turn consumer interest and intent into a successful purchase with follow-ups
                </h2>
                <Bullets items={[
                  "Send personalized product recommendations",
                  "Follow-up with WhatsApp broadcasts on similar deals",
                  "Run contests to boost customer engagement",
                  "Promote your customer loyalty program and benefits",
                ]} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ S4 POST-PURCHASE EXPERIENCE ══ */}
      <section className="hd b2">
        <div className="inn">
          <div className="tc">
            <div className="col">
              <div className="gb" />
              <h2 className="hg hg-sm">
                Ensure a great post-purchase experience through conversations on WhatsApp
              </h2>
              <Bullets items={[
                "Automate order status updates",
                "Send timely order shipping and delivery notifications",
                "Request post-purchase customer feedback",
                "Ask for product reviews from happy customers",
                "Run automated customer surveys for more insights",
              ]} />

            </div>
            <div className="coli">
              <Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Home-Decor/Home-Decor-Section4.webp" alt="Post-purchase experience" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ S5 NESTASIA QUOTE + GLASSY STATS (L) + IMAGE (R) ══ */}
      <section className="hd b3">
        <div className="inn">
          <div className="tc">
            <div className="col">
              <div className="gb" />
              <div className="q-block">
                <p className="q-text">
                  "It's been a fabulous experience so far working. It has helped us advance our business goals. We are very happy with the product and the support provided by the entire team. We look forward to a long partnership together."
                </p>
                <p className="q-attr">  Anurag Agrawal, Co-Founder, Nestasia</p>
              </div>
              <div className="glass-row">
                {QUOTE_STATS.map((s, i) => (
                  <div className="glass-card" key={i}>
                    <div className="gc-num">{s.num}</div>
                    <div className="gc-lbl">{s.lbl}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="coli">
              <Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Home-Decor/Home-Decor-Section-5.webp" alt="Nestasia success story" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ S6 WHY WHATSAPP (heading + 3 big stat cards) ══ */}
      <section className="hd b1">
        <div className="inn">
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <div className="gb gb-c" />
            <h2 className="hg hg-c" style={{ marginBottom: 12 }}>
              Why use WhatsApp for marketing, sales and customer support for your home decor and furnishing business?
            </h2>
          </div>
          <div className="why-stats">
            {WHY_STATS.map((w, i) => (
              <div className="why-stat" key={i}>
                <div className="ws-num">{w.num}</div>
                <div className="ws-lbl">{w.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ S7 SUCCESS STORIES (heading + 2 cards) ══ */}
      <section className="hd b2">
        <div className="inn">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="gb gb-c" />
            <h2 className="hg hg-c" style={{ marginBottom: 12 }}>
              Success stories
            </h2>
            <p className="sub" style={{ maxWidth: 600, margin: "0 auto" }}>
              See how home decor and furnishing brands are using WhatsApp to keep customers engaged and drive more sales.
            </p>
          </div>

          <div className="ss-grid">
            {/* Card 1 Home Canvas */}
            <div className="ss-card">
              <div className="ss-img">
                <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Home-Decor/Home-Decor-Section7-img1.webp" alt="Home Canvas background" loading="lazy" decoding="async" />
                <div className="ss-logo-strip">
                  <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Home-Decor/Home-Decor-Section7-img2.webp" alt="Home Canvas logo" loading="lazy" decoding="async" />
                </div>
              </div>
              <div className="ss-body">
                <div className="ss-title">
                  How Home Canvas is bringing their A-game in the world of Customer Engagement
                </div>
                <div className="ss-desc">
                  Home Canvas, was launched in 2015 as an online curation platform
                </div>

              </div>
            </div>

            {/* Card 2 Nestasia */}
            <div className="ss-card">
              <div className="ss-img">
                <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Home-Decor/Home-Decor-Section7-img3.webp" alt="Nestasia background" loading="lazy" decoding="async" />
                <div className="ss-logo-strip">
                  <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Home-Decor/Home-Decor-Section7-img4.webp" alt="Nestasia logo" loading="lazy" decoding="async" />
                </div>
              </div>
              <div className="ss-body">
                <div className="ss-title">
                  How Using WhatsApp Business API has helped Nestasia Achieve A 5x higher open rate
                </div>
                <div className="ss-desc">
                  Launched in 2019, Nestasia, a Tableware and decor platform
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>



      <ContactUsForm />
    </>
  );
}