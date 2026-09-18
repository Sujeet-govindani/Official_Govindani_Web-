import { useState, useEffect } from "react";
import GoogleForm from "../ui/GoogleForm";
import ContactUsForm from "@/pages/ContactUsForm";
/* ═══════════════════════════════════════════════════════════════
   MarketingAgencyPage.jsx   Marketing Agencies full page
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
.ma{width:100%;padding:64px 7vw;position:relative;}
.ma.b1{background:var(--b1);}
.ma.b2{background:var(--b2);}
.ma.b3{background:var(--b3);}
.ma+.ma{border-top:1px solid var(--bd);}

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
   SLIDER WRAPPER
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

/* ══════════════════════════════════════════════
   SLIDER CARD shared by S2 trust strip AND
   S7 two-row integration strip.
   140 × 50 px, image fills 100% via object-fit:cover.
   No padding, no label, no icon pure image fill.
══════════════════════════════════════════════ */
.icl,
.ics {
  width:140px;
  height:50px;
  border-radius:10px;
  border:1px solid var(--bd);
  background:var(--bds);
  flex-shrink:0;
  overflow:hidden;
  transition:border-color .3s,transform .3s;
}
.icl:hover,
.ics:hover{border-color:var(--g);transform:translateY(-4px);}
.icl img,
.ics img{
  width:100%;
  height:100%;
  object-fit:cover;
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
.s3bot{text-align:center;max-width:780px;margin:0 auto;padding-top:44px;border-top:1px solid var(--bd);}
.s3bot strong{color:var(--g);font-weight:600;}

/* ════════════════════
   DUAL-BLOCK
════════════════════ */
.dblk+.dblk{margin-top:80px;padding-top:80px;border-top:1px solid var(--bd);}

/* ════════════════════
   S2 BOTTOM TEXT
════════════════════ */
.s2-bot{text-align:center;max-width:740px;margin:52px auto 0;padding-top:52px;border-top:1px solid var(--bd);}
.s2-bot strong{color:var(--g);font-weight:600;}

/* ════════════════════
   GLASSY STAT CARDS
════════════════════ */
.glass-row{display:flex;gap:20px;flex-wrap:wrap;margin-top:32px;}
.glass-card{flex:1;min-width:130px;padding:28px 22px;border-radius:18px;text-align:center;background:rgba(255,255,255,.04);border:1px solid rgba(201,168,76,.25);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);box-shadow:0 4px 32px rgba(0,0,0,.35),inset 0 1px 0 rgba(255,255,255,.06);transition:border-color .3s,transform .3s;position:relative;overflow:hidden;}
.glass-card::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at top left,rgba(201,168,76,.1) 0%,transparent 65%);pointer-events:none;}
.glass-card:hover{border-color:var(--g);transform:translateY(-6px);}
.gc-num{font-family:'Libre Baskerville',serif;font-size:clamp(1.8rem,3vw,2.5rem);font-weight:700;color:var(--g);margin-bottom:10px;line-height:1;}
.gc-lbl{font-family:'Inter',sans-serif;font-size:.8rem;color:var(--cr);line-height:1.5;opacity:.82;}

/* quote */
.q-block{border-left:3px solid var(--g);padding-left:22px;margin-bottom:32px;}
.q-text{font-family:'Libre Baskerville',serif;font-style:italic;font-size:clamp(.93rem,1.2vw,1.05rem);color:var(--cr);line-height:1.72;margin-bottom:12px;}
.q-attr{font-family:'Inter',sans-serif;font-size:.82rem;color:var(--g);font-weight:600;}

/* partner bullets */
.partner-list{list-style:none;display:flex;flex-direction:column;gap:14px;margin-bottom:28px;}
.partner-item{display:flex;align-items:flex-start;gap:12px;font-family:'Inter',sans-serif;font-size:clamp(.86rem,1vw,.98rem);color:var(--cr);line-height:1.68;}
.partner-item .dot{width:8px;height:8px;border-radius:50%;background:var(--g);flex-shrink:0;margin-top:7px;}

/* ════════════════════
   DOUBLE SLIDER (S7)
════════════════════ */
.dbl{display:flex;flex-direction:column;gap:16px;overflow:hidden;}

/* ════════════════════
   GLASSY CTA CARD
════════════════════ */
.glass-cta-wrap{position:relative;margin-top:72px;}
.glass-cta{padding:56px 48px;border-radius:20px;text-align:center;background:rgba(255,255,255,.03);border:1px solid rgba(201,168,76,.25);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);box-shadow:0 8px 48px rgba(0,0,0,.4),inset 0 1px 0 rgba(255,255,255,.07);position:relative;overflow:hidden;}
.glass-cta::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at top center,rgba(201,168,76,.1) 0%,transparent 60%);pointer-events:none;}
.glass-cta::after{content:'';position:absolute;top:-60px;left:50%;transform:translateX(-50%);width:240px;height:240px;border-radius:50%;background:radial-gradient(circle,rgba(201,168,76,.12) 0%,transparent 70%);pointer-events:none;}
.gc-inner{position:relative;z-index:1;}

.cpills{display:flex;flex-wrap:wrap;justify-content:center;gap:14px;margin-bottom:36px;}
.cpill{display:flex;align-items:center;gap:9px;padding:11px 22px;border:1px solid rgba(201,168,76,.25);border-radius:50px;background:rgba(255,255,255,.04);backdrop-filter:blur(8px);font-family:'Inter',sans-serif;font-size:.88rem;color:var(--cr);transition:all .3s;white-space:nowrap;}
.cpill:hover{border-color:var(--g);background:rgba(201,168,76,.1);transform:translateY(-3px);}
.cpill .pc{color:var(--g);}

.ls-tag{font-family:'Inter',sans-serif;font-size:.78rem;color:var(--g);opacity:.8;letter-spacing:.04em;margin-bottom:28px;}

/* ════════════════════
   RESPONSIVE
════════════════════ */
@media(min-width:961px){
  .ma.hero{padding-top:160px;padding-bottom:0;}
  .ma:not(.hero){padding-top:48px;padding-bottom:48px;}
}
@media(max-width:960px){
  .ma{padding:72px 5vw;}
  .ma.hero{padding-top:100px;}
  .tc{flex-direction:column;gap:36px;}
  .tc.fl{flex-direction:column-reverse;}
  .coli{width:100%;}
  .ibox{max-width:100%;}
  .tlw{max-width:100%;}
  .tlw::before{left:23px;}
  .tlic{width:48px;height:48px;}
  .slo::before,.slo::after{width:80px;}
  .glass-row{gap:14px;}
  .glass-cta{padding:44px 28px;}
  .dblk+.dblk{margin-top:56px;padding-top:56px;}
  .hg{font-size:clamp(1.5rem,3.5vw,2.2rem);}
  .hg-lg{font-size:clamp(1.7rem,4vw,2.4rem);}
}
@media(max-width:600px){
  .ma{padding:56px 5vw 64px;}
  .ma.hero{padding-top:0px !important;}
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
  .q-block{padding-left:14px;}
  .q-text{font-size:.9rem;}
  .s2-bot{margin-top:36px;padding-top:36px;}
  .icl,.ics{width:110px;height:40px;}
}
`;




const TL = [
  {c:"cc1",i:"🖱️",t:"Acquire",
   d:"Leverage Ads that Click to WhatsApp to acquire new customers for your clients. Set up custom-replies on your clients' WhatsApp to solve customer queries quickly & efficiently."},
  {c:"cc2",i:"💼",t:"Convert",
   d:"Enable your clients to Upsell & Cross-sell with personalized recommendations based on purchase history. Set up catalogs to help your clients showcase their products/services and drive sales."},
  {c:"cc3",i:"😊",t:"Delight",
   d:"Enable your clients to Support customers at scale on WhatsApp. Gather ratings/feedback for your client brands using WhatsApp automated flows."},
  {c:"cc4",i:"🔔",t:"Engage",
   d:"Set up greetings, delayed, and welcome messages to engage end-customers of your clients. Send newsletters on WhatsApp to keep your clients' end-customers updated on new developments."},
];

const SOCIALEE_STATS = [
  {num:"30%", lbl:"Reduction in CPA for a Pathology Lab"},
  {num:"2X",  lbl:"Increase in ROA for a D2C Brand"},
  {num:"834", lbl:"Conversions in a month for a Pathology Lab"},
];



/* ─── HELPERS ───────────────────────────────────────────── */
function Img({src,alt}){
  return(
    <div className="ibox">
      <img src={src} alt={alt} loading="lazy" decoding="async" />
    </div>
  );
}

function Bullets({items}){
  return(
    <ul className="bl">
      {items.map((t,i)=>(
        <li className="bi" key={i}>
          <span className="tk">✅</span>
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

function PartnerBullets({items}){
  return(
    <ul className="partner-list">
      {items.map((t,i)=>(
        <li className="partner-item" key={i}>
          <span className="dot"/>
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

/*
  Track used by all sliders.
  Both small=false (S2 trust strip) and small=true (S7 integration strip)
  now render the same 140×50 fully-filled image card. No labels.
*/
function Track({items, small=false, reverse=false}){
  const d = [...items, ...items];
  const cls = small ? "ics" : "icl";
  return(
    <div className={"s-track" + (reverse ? " rv" : "")}>
      {d.map((item,i)=>(
        <div className={cls} key={i}>
          <img src={item.src} alt={item.label} loading="lazy" decoding="async" />
        </div>
      ))}
    </div>
  );
}

/* ─── PAGE ──────────────────────────────────────────────── */
export default function MarketingAgencyPage(){
   const [modalOpen,setModalOpen]=useState(false);
   const [isMobile, setIsMobile] = useState(false);
   
   useEffect(() => {
     const check = () => setIsMobile(window.innerWidth <= 767);
     check();
     window.addEventListener("resize", check);
     return () => window.removeEventListener("resize", check);
   }, []);

   const CTA=()=><div className="btn-row"></div>;
  return(
    <>
      <style>{CSS}</style>
      <GoogleForm isOpen={modalOpen} onClose={()=>setModalOpen(false)}/>

      {/* ══ S1 HERO ══ */}
      <section className="ma b1 hero" style={{paddingTop: isMobile ? 0 : 160, paddingBottom:0}}>
        <div className="inn"style={{marginTop: isMobile ? "60px" : 24}}>
          <div className="tc">
            <div className="col">
            
              <h1 className="hg hg-lg">
                Add WhatsApp as a Sales Channel to drive more conversions for your clients
              </h1>
              <Bullets items={[
                "Generate more leads and sales for your clients",
                "Enable 24×7 customer support on WhatsApp",
                "Send personalized notifications to drive purchase interest",
              ]}/>
             
            </div>
            <div className="coli">
              <Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Marketing-Agency/Marketing-Agency-Section1.webp" alt="Marketing Agency WhatsApp hero"/>
            </div>
          </div>
        </div>
      </section>

      
      

      {/* ══ S2 TIMELINE + SUB-BLOCKS ══ */}
      <section className="ma b3">
        <div className="inn">
          <div style={{textAlign:"center",marginBottom:52}}>
            <div className="gb gb-c"/>
            <h2 className="hg hg-c" style={{marginBottom:0}}>
              Create delightful experiences on WhatsApp
            </h2>
          </div>
          <div className="tlw">
            {TL.map((item,i)=>(
              <div className="tli" key={i}>
                <div className={"tlic "+item.c}>{item.i}</div>
                <div className="tlb">
                  <div className="tlt">{item.t}</div>
                  <p className="tld">{item.d}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="s3bot">
            <p className="sub">
              Enable your clients to generate more leads on WhatsApp and streamline communication
              with their customers at every stage of the buying journey for higher conversions.
            </p>
          </div>
          <div style={{height:80}}/>
          <div style={{height:1,background:"var(--bd)",marginBottom:80}}/>

          {/* Sub-block A */}
          <div className="dblk" style={{marginTop:0,paddingTop:0,borderTop:"none"}}>
            <div className="tc">
              <div className="col">
                <div className="gb"/>
                <h2 className="hg hg-sm">Generate more leads with click to WhatsApp ads</h2>
                <Bullets items={[
                  "Run click to WhatsApp ads to capture consumer information and intent",
                  "Use a website WhatsApp widget to initiate conversations",
                ]}/>
                
              </div>
              <div className="coli">
                <Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Marketing-Agency/Marketing-Agency-Section2-img1.webp" alt="Generate more leads"/>
              </div>
            </div>
          </div>

          {/* Sub-block B */}
          <div className="dblk">
            <div className="tc fl">
              <div className="coli">
                <Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Marketing-Agency/Marketing-Agency-Section2-img2.webp" alt="Qualify and nurture leads"/>
              </div>
              <div className="col">
                <div className="gb"/>
                <h2 className="hg hg-sm">Enable clients to qualify and nurture leads faster</h2>
                <Bullets items={[
                  "Run click to WhatsApp ads to capture consumer information and intent",
                  "Use a website WhatsApp widget to initiate conversations",
                  "Use QR codes in print ads and packaging to get opt-ins",
                  "Share WhatsApp links on social media",
                ]}/>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ S3 BOOST SALES + PERSONALIZED EXPERIENCES ══ */}
      <section className="ma b1">
        <div className="inn">
          <div className="dblk" style={{marginTop:0,paddingTop:0,borderTop:"none"}}>
            <div className="tc">
              <div className="col">
                <div className="gb"/>
                <h2 className="hg hg-sm">Boost client sales with WhatsApp broadcasts</h2>
                <Bullets items={[
                  "Run click to WhatsApp ads to capture consumer information and intent",
                  "Use a website WhatsApp widget to initiate conversations",
                ]}/>
              
              </div>
              <div className="coli">
                <Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Marketing-Agency/Marketing-Agency-Section3-img1.webp" alt="Boost client sales"/>
              </div>
            </div>
          </div>
          <div className="dblk">
            <div className="tc fl">
              <div className="coli">
                <Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Marketing-Agency/Marketing-Agency-section3-img2.webp" alt="Personalized experiences"/>
              </div>
              <div className="col">
                <div className="gb"/>
                <h2 className="hg hg-sm">Help clients deliver personalized experiences</h2>
                <Bullets items={[
                  "Run click to WhatsApp ads to capture consumer information and intent",
                  "Use a website WhatsApp widget to initiate conversations",
                ]}/>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ S4 DASHBOARD + GROW REVENUE ══ */}
      <section className="ma b2">
        <div className="inn">
          <div className="dblk" style={{marginTop:0,paddingTop:0,borderTop:"none"}}>
            <div className="tc">
              <div className="col">
                <div className="gb"/>
                <h2 className="hg hg-sm">Dedicated dashboard for tracking campaign performance</h2>
                <Bullets items={[
                  "Run click to WhatsApp ads to capture consumer information and intent",
                  "Use a website WhatsApp widget to initiate conversations",
                ]}/>
               
              </div>
              <div className="coli">
                <Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Marketing-Agency/Marketing-Agency-Section4-img1.webp" alt="Campaign dashboard"/>
              </div>
            </div>
          </div>
          <div className="dblk">
            <div className="tc fl">
              <div className="coli">
                <Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Marketing-Agency/Marketing-Agency-Section4-img2.webp" alt="Grow revenue by partnering"/>
              </div>
              <div className="col">
                <div className="gb"/>
                <h2 className="hg hg-sm">Grow your revenue by partnering with Whatsapp Automation</h2>
                <p className="sub-p">
                  Join hands with us and we will ensure your WhatsApp marketing agency is equipped
                  with all the how-tos from day one to help you understand the WhatsApp Business Platform.
                </p>
                <PartnerBullets items={[
                  "Earn recurring commissions on each referral",
                  "Step-by-step how-to guides",
                  "Personalized demo and onboarding",
                  "Proactive customer support",
                ]}/>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ S5 SOCIALEE QUOTE + GLASSY STATS ══ */}
      <section className="ma b3">
        <div className="inn">
          <div className="tc">
            <div className="col">
              <div className="gb"/>
              <div className="q-block">
                <p className="q-text">
                  "Socialee, a Meta certified & award-winning marketing agency, has been making waves
                  with Ads that Click to WhatsApp for its client base. They have been religiously
                  leveraging WhatsApp to skyrocket their clients businesses."
                </p>
                <p className="q-attr">  Socialee</p>
              </div>
              <div className="glass-row">
                {SOCIALEE_STATS.map((s,i)=>(
                  <div className="glass-card" key={i}>
                    <div className="gc-num">{s.num}</div>
                    <div className="gc-lbl">{s.lbl}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="coli">
              <Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Marketing-Agency/Marketing-Agency-Section5.webp" alt="Socialee success story"/>
            </div>
          </div>
        </div>
      </section>


      <ContactUsForm/>
    </>
  );
}