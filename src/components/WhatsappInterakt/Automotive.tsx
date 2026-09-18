import { useState, useEffect } from "react";
import GoogleForm from "../ui/GoogleForm";
import ContactUsForm from "@/pages/ContactUsForm";
// import GoogleForm from "/NewProject/NEWGIIT/Official_Govindani_Web/src/components/ui/GoogleForm";

const CSS = `

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
body{background:#0A0A0A;color:#fff;font-family:'Inter',sans-serif;overflow-x:hidden;}

:root{
  --g:#C9A84C; --g2:#E0B85A; --cr:#F5F0E8;
  --b1:#0A0A0A; --b2:#0E0E0E; --b3:#111111;
  --bd:rgba(201,168,76,.18); --bds:rgba(201,168,76,.07);
}

.av{width:100%;padding:64px 7vw;position:relative;}
.av.b1{background:var(--b1);}
.av.b2{background:var(--b2);}
.av.b3{background:var(--b3);}
.av+.av{border-top:1px solid var(--bd);}
.inn{max-width:1200px;margin:0 auto;}
.tc{display:flex;align-items:center;gap:64px;}
.tc .col{flex:1;min-width:0;}
.tc .coli{flex:1;display:flex;justify-content:center;align-items:center;}
.ibox{width:100%;max-width:510px;aspect-ratio:4/3;border-radius:16px;border:none;background:transparent;overflow:hidden;}
.ibox img{width:100%;height:100%;object-fit:contain;border-radius:16px;display:block;}
.hg{font-family:'Libre Baskerville',serif;font-size:clamp(1.7rem,2.5vw,2.5rem);font-weight:700;color:var(--g);line-height:1.27;letter-spacing:-.01em;margin-bottom:24px;}
.hg-sm{font-size:clamp(1.2rem,1.7vw,1.75rem);}
.hg-lg{font-size:clamp(1.9rem,3vw,2.9rem);}
.hg-c{text-align:center;}
.sub{font-family:'Inter',sans-serif;font-size:clamp(.88rem,1.05vw,1rem);color:var(--cr);line-height:1.73;opacity:.88;}
.sub-p{font-family:'Inter',sans-serif;font-size:clamp(.88rem,1.05vw,1rem);color:var(--cr);line-height:1.73;opacity:.88;margin-bottom:16px;}
.gb{width:48px;height:3px;background:var(--g);border-radius:2px;margin-bottom:20px;}
.gb-c{margin:0 auto 20px;}
.bl{list-style:none;display:flex;flex-direction:column;gap:12px;margin-bottom:28px;}
.bi{display:flex;align-items:flex-start;gap:11px;font-family:'Inter',sans-serif;font-size:clamp(.86rem,1vw,.98rem);color:var(--cr);line-height:1.68;}
.bi .tk{flex-shrink:0;margin-top:2px;}
.br{display:flex;flex-wrap:wrap;gap:14px;}
.bg-btn{background:var(--g);color:#0A0A0A;font-family:'Inter',sans-serif;font-weight:700;font-size:.9rem;padding:13px 30px;border:none;border-radius:6px;cursor:pointer;letter-spacing:.03em;transition:all .25s;white-space:nowrap;}
.bg-btn:hover{background:var(--g2);transform:translateY(-2px);box-shadow:0 8px 24px rgba(201,168,76,.32);}

.slo{position:relative;overflow:hidden;padding:10px 0;}
.slo::before,.slo::after{content:'';position:absolute;top:0;bottom:0;width:160px;z-index:2;pointer-events:none;}
.slo.fb1::before{left:0;background:linear-gradient(to right,#0A0A0A 25%,transparent);}
.slo.fb1::after{right:0;background:linear-gradient(to left,#0A0A0A 25%,transparent);}
.slo.fb2::before{left:0;background:linear-gradient(to right,#0E0E0E 25%,transparent);}
.slo.fb2::after{right:0;background:linear-gradient(to left,#0E0E0E 25%,transparent);}
.slo.fb3::before{left:0;background:linear-gradient(to right,#111111 25%,transparent);}
.slo.fb3::after{right:0;background:linear-gradient(to left,#111111 25%,transparent);}
.s-track{display:flex;gap:22px;width:max-content;animation:mq 24s linear infinite;}
.s-track.rv{animation-direction:reverse;animation-duration:19s;}
.s-track:hover{animation-play-state:paused;}
@keyframes mq{from{transform:translateX(0);}to{transform:translateX(-50%);}}
.icl,.ics{width:140px;height:50px;border-radius:10px;border:1px solid var(--bd);background:var(--bds);display:flex;align-items:center;justify-content:center;padding:6px 10px;flex-shrink:0;overflow:hidden;transition:border-color .3s,transform .3s;}
.icl:hover,.ics:hover{border-color:var(--g);transform:translateY(-4px);}
.icl img,.ics img{width:100%;height:100%;object-fit:contain;display:block;}
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
.dblk+.dblk{margin-top:80px;padding-top:80px;border-top:1px solid var(--bd);}
.glass-row{display:flex;gap:20px;flex-wrap:wrap;margin-top:36px;}
.glass-card{flex:1;min-width:130px;padding:28px 22px;border-radius:18px;text-align:center;background:rgba(255,255,255,.04);border:1px solid rgba(201,168,76,.25);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);box-shadow:0 4px 32px rgba(0,0,0,.35),inset 0 1px 0 rgba(255,255,255,.06);transition:border-color .3s,transform .3s;position:relative;overflow:hidden;}
.glass-card::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at top left,rgba(201,168,76,.1) 0%,transparent 65%);pointer-events:none;}
.glass-card:hover{border-color:var(--g);transform:translateY(-6px);}
.gc-num{font-family:'Libre Baskerville',serif;font-size:clamp(1.8rem,3vw,2.6rem);font-weight:700;color:var(--g);margin-bottom:10px;line-height:1;}
.gc-lbl{font-family:'Inter',sans-serif;font-size:.8rem;color:var(--cr);line-height:1.5;opacity:.82;}
.dbl{display:flex;flex-direction:column;gap:16px;overflow:hidden;}
.glass-cta-wrap{position:relative;margin-top:72px;}
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
.q-block{border-left:3px solid var(--g);padding-left:22px;margin-bottom:32px;}
.q-text{font-family:'Libre Baskerville',serif;font-style:italic;font-size:clamp(.93rem,1.2vw,1.05rem);color:var(--cr);line-height:1.72;margin-bottom:12px;}
.q-attr{font-family:'Inter',sans-serif;font-size:.82rem;color:var(--g);font-weight:600;}

@media(min-width:961px){
  .av.hero{padding-top:160px;padding-bottom:0;}
  .av:not(.hero){padding-top:48px;padding-bottom:48px;}
}
@media(max-width:960px){
  .av{padding:72px 5vw;}
  .av.hero{padding-top:100px;}
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
  .av{padding:56px 5vw 64px;}
  .av.hero{padding-top:0px !important;}
  .tc,.tc.fl{flex-direction:column !important;gap:28px;}
  .coli{width:100%;}
  .ibox{max-width:100%;aspect-ratio:3/2;}
  .br{flex-direction:column;}
  .bg-btn{width:100%;text-align:center;padding:14px 20px;}
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
}
`;


const TL = [
  { c: "cc1", i: "🖱️", t: "Acquire", d: "Integrate your online store for capturing qualified leads & drive conversions. Run Ads that Click to WhatsApp on FB & Insta and acquire more customers." },
  { c: "cc2", i: "💼", t: "Convert", d: "Upsell & Cross-Sell with personalized recommendations like car accessories, roadside insurance, and more. Send payment links for collecting payment on WhatsApp & quick settlements." },
  { c: "cc3", i: "😊", t: "Delight", d: "Support clients at scale 24×7 on WhatsApp and gather ratings / feedback from clients using WhatsApp automated flows." },
  { c: "cc4", i: "🔔", t: "Engage", d: "Promote customer testimonials, success stories and user generated content as social proof. Send brochures or newsletters to share new launch updates." },
];
const STATS = [
  { num: "1800", lbl: "Conversations started via Ads that Click to WhatsApp" },
  { num: "90", lbl: "Orders placed in a month via Ads that Click to WhatsApp" },
  { num: "5X", lbl: "ROAS on WhatsApp with Ads that Click to WhatsApp" },
];


function Img({ src, alt }: { src: string; alt: string }) { return (<div className="ibox"><img src={src} alt={alt} loading="lazy" decoding="async" /></div>); }
function Bullets({ items }: { items: string[] }) { return (<ul className="bl">{items.map((t, i) => (<li className="bi" key={i}><span className="tk">✅</span><span>{t}</span></li>))}</ul>); }
function Track({ items, reverse = false }: { items: { src: string }[]; reverse?: boolean }) {
  const d = [...items, ...items];
  return (<div className={"s-track" + (reverse ? " rv" : "")}>{d.map((item, i) => (<div className="icl" key={i}><img src={item.src} alt="" loading="lazy" decoding="async" /></div>))}</div>);
}

export default function AutomotivePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 767);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const CTA = () => <div className="br"></div>;

  return (
    <>
      <style>{CSS}</style>
      <GoogleForm isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <section className="av b1 hero" style={{ paddingTop: 160, paddingBottom: 0 }}>
        <div className="inn" style={{ marginTop: isMobile ? "70px" : 0 }}>
          <div className="tc">
            <div className="col">

              <h1 className="hg hg-lg" >Grow your Automotive business using WhatsApp</h1>
              <Bullets items={["Promote your offering with WhatsApp broadcast", "Support your customers 24×7 at scale", "Showcase your products on WhatsApp storefront"]} />
              <CTA />
            </div>
            <div className="coli"><Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Automotive%20Industry/Automotive-Industry-section1.webp" alt="Automotive WhatsApp hero" /></div>
          </div>
        </div>
      </section>



      <section className="av b3">
        <div className="inn">
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div className="gb gb-c" />
            <h2 className="hg hg-c" style={{ marginBottom: 0 }}>Create delightful experiences on WhatsApp</h2>
          </div>
          <div className="tlw">
            {TL.map((item, i) => (<div className="tli" key={i}><div className={"tlic " + item.c}>{item.i}</div><div className="tlb"><div className="tlt">{item.t}</div><p className="tld">{item.d}</p></div></div>))}
          </div>
          <div className="s3bot">
            <div className="gb gb-c" />
            <h3 className="hg hg-sm hg-c" style={{ marginBottom: 14 }}>How to use WhatsApp Business API to grow your Automotive business</h3>
            <p className="sub">From promoting your deals and discounts to scheduling servicing, <strong style={{ color: "var(--g)", fontWeight: 600 }}>WhatsApp Business API</strong> simplifies customer communication and enhances their experience with your automotive business.</p>
          </div>
        </div>
      </section>

      <section className="av b1">
        <div className="inn">
          <div className="dblk">
            <div className="tc">
              <div className="col">
                <div className="gb" />
                <h2 className="hg hg-sm">Generate more leads for your automobile business</h2>
                <p className="sub-p">Run click to WhatsApp ads on social media to generate qualified leads for your business.</p>
                <p className="sub-p">Integrate Whatsapp with your CRM or Google Excel sheet to save prospect information in a streamlined manner for timely follow-ups.</p>
                <CTA />
              </div>
              <div className="coli"><Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Automotive%20Industry/Automotive-Industry-section3-img1.webp" alt="Generate more leads" /></div>
            </div>
          </div>
          <div className="dblk">
            <div className="tc fl">
              <div className="coli"><Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Automotive%20Industry/Automotive-Industry-section3-img2.webp" alt="Promote new vehicles" /></div>
              <div className="col">
                <div className="gb" />
                <h2 className="hg hg-sm">Promote the sale of new vehicles</h2>
                <p className="sub-p">Use WhatsApp broadcasts to bring attention to the new vehicle models available at your showrooms.</p>
                <p className="sub-p">Share vehicle pictures and videos along with limited period discounts or benefits on purchase.</p>
                <CTA />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="av b2">
        <div className="inn">
          <div className="dblk">
            <div className="tc">
              <div className="col">
                <div className="gb" />
                <h2 className="hg hg-sm">Schedule test drives and walk-ins</h2>
                <p className="sub-p">Let potential buyers experience the vehicles they are interested in by scheduling test drives and walk-ins at your showroom.</p>
                <p className="sub-p">Get an opportunity to explain the various features and benefits a new model has to offer, and sell through experiences on test drives!</p>
                <CTA />
              </div>
              <div className="coli"><Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Automotive%20Industry/Automotive-Industry-section4-img1.webp" alt="Schedule test drives" /></div>
            </div>
          </div>
          <div className="dblk">
            <div className="tc fl">
              <div className="coli"><Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Automotive%20Industry/Automotive-Industry-section4-img2.webp" alt="Take service bookings" /></div>
              <div className="col">
                <div className="gb" />
                <h2 className="hg hg-sm">Take bookings for services</h2>
                <p className="sub-p">Promote the automobile services you offer for repair, rental and maintenance of vehicles using WhatsApp broadcasts.</p>
                <p className="sub-p">Use interactive messages to take requests and schedule servicing, and follow up with timely reminders.</p>
                <CTA />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="av b3">
        <div className="inn">
          <div className="dblk">
            <div className="tc">
              <div className="col">
                <div className="gb" />
                <h2 className="hg hg-sm">Invite used cars for reselling</h2>
                <p className="sub-p">If your automobile business also resells vehicles, proactively reach and promote the same using WhatsApp.</p>
                <p className="sub-p">Let customers know they can sell their used vehicles through you. Collect information, make an offer and schedule picks all on chat!</p>
                <CTA />
              </div>
              <div className="coli"><Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Automotive%20Industry/Automotive-Industry-Section-5-img1.webp" alt="Invite used cars" /></div>
            </div>
          </div>
          <div className="dblk">
            <div className="tc fl">
              <div className="coli"><Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Automotive%20Industry/Automotive-Industry-Section5-img2.webp" alt="Mechanical consultation" /></div>
              <div className="col">
                <div className="gb" />
                <h2 className="hg hg-sm">Provide mechanical consultation</h2>
                <p className="sub-p">Offer post-purchase and post-service consultation on WhatsApp by addressing FAQs using automations.</p>
                <p className="sub-p">From mileage related queries to maintenance related questions, answer them all and build trust in your customers.</p>
                <CTA />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="av b1">
        <div className="inn">
          <div className="dblk">
            <div className="tc">
              <div className="col">
                <div className="gb" />
                <h2 className="hg hg-sm">Request reviews on automotive services</h2>
                <p className="sub-p">Gather social proof for the quality of services your automotive business offers. Use WhatsApp to send automated review requests post service completion.</p>
                <p className="sub-p">Get reviews for your Google My Business account, Facebook page or even your website!</p>
                <CTA />
              </div>
              <div className="coli"><Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Automotive%20Industry/Automotive-Industry-Section6-img1.webp" alt="Request reviews" /></div>
            </div>
          </div>
          <div className="dblk">
            <div className="tc fl">
              <div className="coli"><Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Automotive%20Industry/Automotive-Industry-Section6-img2.webp" alt="Announce new launches" /></div>
              <div className="col">
                <div className="gb" />
                <h2 className="hg hg-sm">Announce new launches, events and more</h2>
                <p className="sub-p">If your automotive business is launching a new service, service center, showroom, event or bringing in the latest vehicle from a top manufacturer, use WhatsApp broadcasts to bring them into the limelight.</p>
                <p className="sub-p">Keeping your customers informed on what's new and your activities helps them see how up-to-date you are.</p>
                <CTA />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="av b2">
        <div className="inn">
          <div className="dblk">
            <div className="tc">
              <div className="col">
                <div className="gb" />
                <h2 className="hg hg-sm">Collect and share customer documents</h2>
                <p className="sub-p">Be it for a purchase or booking a service, collect consumer documents over an encrypted chat.</p>
                <p className="sub-p">From identification proof, driving license, insurance, bills and more, collect and share documents easily on WhatsApp.</p>
                <CTA />
              </div>
              <div className="coli"><Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Automotive%20Industry/Automotive-Industry-Section7-img1.webp" alt="Collect documents" /></div>
            </div>
          </div>
          <div className="dblk">
            <div className="tc fl">
              <div className="coli"><Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Automotive%20Industry/Automotive-Industry-Section7-img2.webp" alt="Educate customers" /></div>
              <div className="col">
                <div className="gb" />
                <h2 className="hg hg-sm">Educate your customers and prospects</h2>
                <p className="sub-p">Don't just use WhatsApp as a channel to promote your services or book test drives. Go one step further!</p>
                <p className="sub-p">Educate customers on topics related to their purchases or the last service availed. Share your knowledge to showcase expertise.</p>
                <CTA />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="av b3">
        <div className="inn">
          <div className="tc">
            <div className="col">
              <div className="gb" />
              <div className="q-block">
                <p className="q-text">"Gear Guard designs high-quality automotive accessories. They have been using Ads that Click to WhatsApp to drive conversions and grow their business."</p>
                <p className="q-attr">  Gear Guard</p>
              </div>
              <div className="glass-row">
                {STATS.map((s, i) => (<div className="glass-card" key={i}><div className="gc-num">{s.num}</div><div className="gc-lbl">{s.lbl}</div></div>))}
              </div>
            </div>
            <div className="coli"><Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Automotive%20Industry/Automotive-Industry-Section8.webp" alt="Gear Guard success story" /></div>
          </div>
        </div>
      </section>



      <ContactUsForm />
    </>
  );
}
