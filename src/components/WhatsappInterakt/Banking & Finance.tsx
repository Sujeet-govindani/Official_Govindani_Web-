import { useState } from "react";
import GoogleForm from "../ui/GoogleForm";
import ContactUsForm from "@/pages/ContactUsForm";

const CSS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
body{background:#0A0A0A;color:#fff;font-family:'Inter',sans-serif;overflow-x:hidden;}
:root{--g:#C9A84C;--g2:#E0B85A;--cr:#F5F0E8;--b1:#0A0A0A;--b2:#0E0E0E;--b3:#111111;--bd:rgba(201,168,76,.18);--bds:rgba(201,168,76,.07);}
.bf{width:100%;padding:48px 7vw;position:relative;}
.bf.b1{background:var(--b1);}.bf.b2{background:var(--b2);}.bf.b3{background:var(--b3);}
.bf+.bf{border-top:1px solid var(--bd);}
.bf.hero{padding-top:160px !important;padding-bottom:0 !important;}
.inn{max-width:1200px;margin:0 auto;}
.tc{display:flex;align-items:center;gap:64px;}
.tc .col{flex:1;min-width:0;}.tc .coli{flex:1;display:flex;justify-content:center;align-items:center;}
.bf.hero .tc{align-items:flex-start;}
.ibox{width:100%;max-width:510px;aspect-ratio:4/3;border-radius:0;border:none;background:transparent;overflow:hidden;}
.ibox img{width:100%;height:100%;object-fit:contain;border-radius:0;display:block;}
.hg{font-family:'Libre Baskerville',serif;font-size:clamp(1.7rem,2.5vw,2.5rem);font-weight:700;color:var(--g);line-height:1.27;letter-spacing:-.01em;margin-bottom:24px;}
.hg-sm{font-size:clamp(1.2rem,1.7vw,1.75rem);}.hg-lg{font-size:clamp(1.9rem,3vw,2.9rem);}.hg-c{text-align:center;}
.sub{font-family:'Inter',sans-serif;font-size:clamp(.88rem,1.05vw,1rem);color:var(--cr);line-height:1.73;opacity:.88;}
.sub-p{font-family:'Inter',sans-serif;font-size:clamp(.88rem,1.05vw,1rem);color:var(--cr);line-height:1.73;opacity:.88;margin-bottom:14px;}
.gb{width:48px;height:3px;background:var(--g);border-radius:2px;margin-bottom:20px;}.gb-c{margin:0 auto 20px;}
.bl{list-style:none;display:flex;flex-direction:column;gap:12px;margin-bottom:28px;}
.bi{display:flex;align-items:flex-start;gap:11px;font-family:'Inter',sans-serif;font-size:clamp(.86rem,1vw,.98rem);color:var(--cr);line-height:1.68;}
.bi .tk{flex-shrink:0;margin-top:2px;}
.br{display:flex;flex-wrap:wrap;gap:14px;}
.bg-btn{background:var(--g);color:#0A0A0A;font-family:'Inter',sans-serif;font-weight:700;font-size:.9rem;padding:13px 30px;border:none;border-radius:6px;cursor:pointer;letter-spacing:.03em;transition:all .25s;white-space:nowrap;}
.bg-btn:hover{background:var(--g2);transform:translateY(-2px);box-shadow:0 8px 24px rgba(201,168,76,.32);}
.slo{position:relative;overflow:hidden;padding:10px 0;}
.slo::before,.slo::after{content:'';position:absolute;top:0;bottom:0;width:160px;z-index:2;pointer-events:none;}
.slo.fb1::before{left:0;background:linear-gradient(to right,#0A0A0A 25%,transparent);}.slo.fb1::after{right:0;background:linear-gradient(to left,#0A0A0A 25%,transparent);}
.slo.fb2::before{left:0;background:linear-gradient(to right,#0E0E0E 25%,transparent);}.slo.fb2::after{right:0;background:linear-gradient(to left,#0E0E0E 25%,transparent);}
.slo.fb3::before{left:0;background:linear-gradient(to right,#111111 25%,transparent);}.slo.fb3::after{right:0;background:linear-gradient(to left,#111111 25%,transparent);}
.s-track{display:flex;gap:22px;width:max-content;animation:mq 22s linear infinite;}
.s-track.rv{animation-direction:reverse;animation-duration:18s;}
.s-track:hover{animation-play-state:paused;}
@keyframes mq{from{transform:translateX(0);}to{transform:translateX(-50%);}}

/* ── Trust-strip card: 140 × 50 image fills full container ── */
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
  padding:6px 10px;
  transition:border-color .3s,transform .3s;
}
.icl:hover{border-color:var(--g);transform:translateY(-3px);}
.icl img{
  width:100%;
  height:100%;
  object-fit:contain;
  object-position:center;
  display:block;
}

.ics{width:152px;height:56px;border-radius:10px;border:1px solid var(--bd);background:var(--bds);display:flex;align-items:center;gap:10px;padding:0 14px;flex-shrink:0;transition:border-color .3s;}
.ics:hover{border-color:var(--g);}.ics img{width:28px;height:28px;object-fit:contain;flex-shrink:0;}
.ics span{font-size:.68rem;color:var(--cr);opacity:.75;font-family:'Inter',sans-serif;white-space:nowrap;}
.tlw{position:relative;display:flex;flex-direction:column;max-width:780px;margin:0 auto 52px;}
.tlw::before{content:'';position:absolute;left:27px;top:28px;bottom:28px;width:2px;background:linear-gradient(to bottom,#1a6b1a 0%,#E6A817 33%,#22c55e 66%,#2563EB 100%);border-radius:2px;}
.tli{display:flex;gap:28px;align-items:flex-start;padding:20px 0;}
.tlic{width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0;position:relative;z-index:1;}
.cc1{background:#1a6b1a;}.cc2{background:#E6A817;}.cc3{background:#22c55e;}.cc4{background:#2563EB;}
.tlb{flex:1;padding-top:10px;}
.tlt{font-family:'Libre Baskerville',serif;font-size:1.1rem;font-weight:700;color:var(--g);margin-bottom:7px;}
.tld{font-family:'Inter',sans-serif;font-size:.93rem;color:var(--cr);line-height:1.7;opacity:.85;}
.s3bot{text-align:center;max-width:760px;margin:0 auto;padding-top:44px;border-top:1px solid var(--bd);}
.dblk+.dblk{margin-top:80px;padding-top:80px;border-top:1px solid var(--bd);}
.why-section{margin-top:64px;padding-top:64px;border-top:1px solid var(--bd);}
.why-intro{text-align:center;max-width:680px;margin:0 auto 40px;}
.why-grid{display:flex;gap:24px;flex-wrap:wrap;}
.why-card{flex:1;min-width:160px;padding:36px 24px;border-radius:18px;text-align:center;border:1px solid var(--bd);background:var(--bds);position:relative;overflow:hidden;transition:border-color .35s,transform .35s;}
.why-card::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at top,rgba(201,168,76,.09) 0%,transparent 65%);pointer-events:none;}
.why-card:hover{border-color:var(--g);transform:translateY(-6px);}
.wc-num{font-family:'Libre Baskerville',serif;font-size:clamp(2rem,3.5vw,3rem);font-weight:700;color:var(--g);margin-bottom:10px;line-height:1;}
.wc-lbl{font-family:'Inter',sans-serif;font-size:.85rem;color:var(--cr);line-height:1.55;opacity:.84;}
.glass-row{display:flex;gap:20px;flex-wrap:wrap;margin-top:32px;}
.glass-card{flex:1;min-width:130px;padding:28px 22px;border-radius:18px;text-align:center;background:rgba(255,255,255,.04);border:1px solid rgba(201,168,76,.25);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);box-shadow:0 4px 32px rgba(0,0,0,.35),inset 0 1px 0 rgba(255,255,255,.06);transition:border-color .3s,transform .3s;position:relative;overflow:hidden;}
.glass-card::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at top left,rgba(201,168,76,.1) 0%,transparent 65%);pointer-events:none;}
.glass-card:hover{border-color:var(--g);transform:translateY(-6px);}
.gc-num{font-family:'Libre Baskerville',serif;font-size:clamp(1.8rem,3vw,2.5rem);font-weight:700;color:var(--g);margin-bottom:10px;line-height:1;}
.gc-lbl{font-family:'Inter',sans-serif;font-size:.8rem;color:var(--cr);line-height:1.5;opacity:.82;}
.q-block{border-left:3px solid var(--g);padding-left:22px;margin-bottom:32px;}
.q-text{font-family:'Libre Baskerville',serif;font-style:italic;font-size:clamp(.93rem,1.2vw,1.05rem);color:var(--cr);line-height:1.72;margin-bottom:12px;}
.q-attr{font-family:'Inter',sans-serif;font-size:.82rem;color:var(--g);font-weight:600;}
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
.ls-tag{font-family:'Inter',sans-serif;font-size:.78rem;color:var(--g);opacity:.8;letter-spacing:.04em;margin-bottom:28px;}

@media(max-width:960px){
  .bf{padding:72px 5vw;}.bf.hero{padding-top:100px;}
  .tc{flex-direction:column;gap:36px;}.tc.fl{flex-direction:column-reverse;}
  .coli{width:100%;}.ibox{max-width:100%;}.tlw{max-width:100%;}
  .tlw::before{left:23px;}.tlic{width:48px;height:48px;}
  .slo::before,.slo::after{width:80px;}
  .glass-row{gap:14px;}.why-grid{gap:16px;}
  .glass-cta{padding:44px 28px;}.dblk+.dblk{margin-top:56px;padding-top:56px;}
  .hg{font-size:clamp(1.5rem,3.5vw,2.2rem);}.hg-lg{font-size:clamp(1.7rem,4vw,2.4rem);}
  .why-section{margin-top:48px;padding-top:48px;}
}
@media(max-width:600px){
  .bf{padding:56px 5vw 64px;}.bf.hero{padding-top:100px !important;}
  .tc,.tc.fl{flex-direction:column !important;gap:28px;}
  .coli{width:100%;}.ibox{max-width:100%;aspect-ratio:3/2;}
  .br{flex-direction:column;}.bg-btn{width:100%;text-align:center;padding:14px 20px;}
  .slo::before,.slo::after{width:44px;}
  .tlw::before{left:18px;top:24px;bottom:24px;}.tlic{width:38px;height:38px;font-size:.88rem;}
  .tli{gap:14px;padding:15px 0;}.tlb{padding-top:4px;}.tlt{font-size:1rem;}.tld{font-size:.87rem;}
  .glass-row{flex-direction:column;gap:12px;}.glass-card{padding:22px 18px;}.gc-num{font-size:2rem;}
  .why-grid{flex-direction:column;gap:14px;}.why-card{padding:26px 18px;}.wc-num{font-size:2.2rem;}
  .cpills{gap:10px;}.cpill{padding:10px 14px;font-size:.8rem;}
  .glass-cta{padding:32px 18px;}
  .hg{font-size:clamp(1.3rem,6vw,1.75rem);}.hg-lg{font-size:clamp(1.5rem,6.5vw,2rem);}
  .hg-sm{font-size:clamp(1.05rem,4.8vw,1.4rem);}.hg-c{font-size:clamp(1.2rem,5.5vw,1.6rem);}
  .sub{font-size:.9rem;}.sub-p{font-size:.9rem;}.bi{font-size:.88rem;}.gb{margin-bottom:16px;}
  .dblk+.dblk{margin-top:44px;padding-top:44px;}.q-block{padding-left:14px;}.q-text{font-size:.9rem;}
  .why-section{margin-top:36px;padding-top:36px;}
  .icl{width:110px;height:40px;padding:4px 8px;}
}
`;


const TL=[{c:"cc1",i:"💳",t:"Acquire",d:"Run click to WhatsApp ads to promote your BFSI products and services. Answer FAQs quickly via custom auto-replies and help customers with their queries."},{c:"cc2",i:"💼",t:"Convert",d:"Carry out KYC processes like ID verification, document verification over an encrypted channel to expedite loan applications. Upsell & Cross-Sell by sending personalized BFSI product recommendations based on purchase history & credit score."},{c:"cc3",i:"😊",t:"Delight",d:"Solve queries & support customers at scale on WhatsApp. Gather ratings/feedback from clients using WhatsApp automated flows."},{c:"cc4",i:"🔔",t:"Engage",d:"Proactively notify target audience of new offers, loyalty points and more. Send informative and educational content relevant to their needs."}];
const WHY_STATS=[{num:"68%",lbl:"Of users agree WhatsApp is the easiest way to contact a business"},{num:"98%",lbl:"Average open rate on WhatsApp broadcasts and notifications"},{num:"5%+",lbl:"Higher customer engagement and response rate on WhatsApp"}];
const PAISABAZAAR_STATS=[{num:"3X",lbl:"Read rate as compared to SMS"},{num:"50%",lbl:"Reduction in cost per lead"},{num:"7-8M",lbl:"Users check credit score on WhatsApp"}];
const INT_R1=[{src:"https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-1.png",label:"Salesforce"},{src:"https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-2.webp",label:"HubSpot"},{src:"https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-3.png",label:"Shopify"},{src:"https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-4.png",label:"Zoho CRM"},{src:"https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-5.png",label:"Zapier"},{src:"https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-6.png",label:"Slack"},{src:"https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-7.png",label:"WooCommerce"},{src:"https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-8.png",label:"Google Sheets"}];
const INT_R2=[{src:"https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-9.png",label:"Razorpay"},{src:"https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-10.webp",label:"Stripe"},{src:"https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-11.png",label:"Intercom"},{src:"https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-12.png",label:"Freshdesk"},{src:"https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-13.png",label:"Mailchimp"},{src:"https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-14.png",label:"Pipedrive"},{src:"https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-15.png",label:"Zendesk"},{src:"https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-16.png",label:"Google Analytics"}];

function Img({src,alt}:{src:string;alt:string}){return(<div className="ibox"><img src={src} alt={alt} loading="lazy" decoding="async" /></div>);}
function Bullets({items}:{items:string[]}){return(<ul className="bl">{items.map((t,i)=>(<li className="bi" key={i}><span className="tk">✅</span><span>{t}</span></li>))}</ul>);}
function Track({items,small=false,reverse=false}:{items:{src:string;label?:string}[];small?:boolean;reverse?:boolean}){
  const d=[...items,...items];
  return(
    <div className={"s-track"+(reverse?" rv":"")}>
      {d.map((item,i)=>small
        ? <div className="ics" key={i}><img src={item.src} alt={item.label||""} loading="lazy" decoding="async" /><span>{item.label}</span></div>
        : <div className="icl" key={i}><img src={item.src} alt={item.label||""} loading="lazy" decoding="async" /></div>
      )}
    </div>
  );
}

export default function BankFinancePage(){
  const[modalOpen,setModalOpen]=useState(false);
  const CTA=()=><div className="br"></div>;

  return(
    <>
      <style>{CSS}</style>
      <GoogleForm isOpen={modalOpen} onClose={()=>setModalOpen(false)}/>
{/* section1 */}
      <section className="bf b1 hero" style={{paddingTop:160,paddingBottom:0}}>
        <div className="inn"><div className="tc">
          <div className="col">
            <div className="gb"/>
            <h1 className="hg hg-lg">Build a positive customer experience with WhatsApp for Banking and Finance business</h1>
            <Bullets items={["Carry out KYC processes like ID verification, document verification etc","Respond to customer queries 24×7","Showcase your offerings with WhatsApp storefront"]}/>
            <CTA/>
          </div>
          <div className="coli"><Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Banking-Finance/Banking-Finance-Section1.webp" alt="Banking Finance WhatsApp hero"/></div>
        </div></div>
      </section>

      
{/* section2 */}
      <section className="bf b3">
        <div className="inn">
          <div style={{textAlign:"center",marginBottom:52}}><div className="gb gb-c"/><h2 className="hg hg-c" style={{marginBottom:0}}>Create delightful experiences on WhatsApp</h2></div>
          <div className="tlw">{TL.map((item,i)=>(<div className="tli" key={i}><div className={"tlic "+item.c}>{item.i}</div><div className="tlb"><div className="tlt">{item.t}</div><p className="tld">{item.d}</p></div></div>))}</div>
          <div className="s3bot"><div className="gb gb-c"/><h3 className="hg hg-sm hg-c" style={{marginBottom:14}}>How the banking and finance sector is digitizing with WhatsApp</h3><p className="sub">See how businesses in the BFSI sector are exploring WhatsApp conversational commerce to create personalized and streamlined customer journeys.</p></div>
        </div>
      </section>
{/* section3 */}
      <section className="bf b1">
        <div className="inn">
          <div className="dblk" style={{marginTop:0,paddingTop:0,borderTop:"none"}}>
            <div className="tc"><div className="col"><div className="gb"/><h2 className="hg hg-sm">Use WhatsApp to enable conversational commerce for faster conversions.</h2><Bullets items={["Verify and generate leads with timely greeting messages and follow-ups","Automate follow ups on WhatsApp with leads and prospects","Offer personalized financial buying assistance (loan applications, mutual funds, etc)"]}/><CTA/></div><div className="coli"><Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ws13img3.webp" alt="Conversational commerce for BFSI"/></div></div>
          </div>
          <div className="dblk">
            <div className="tc fl"><div className="coli"><Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Banking-Finance/Banking-Finance-Section3.webp" alt="Reduce customer drop-offs"/></div><div className="col"><div className="gb"/><h2 className="hg hg-sm">Reduce customer drop-offs and churn by using WhatsApp as a channel to enable their financial journeys</h2><Bullets items={["Onboard customers seamlessly with WhatsApp interactive messages","Collect personal information and lead customers to the next course of action","Send more information about your products and services with PDFs and videos"]}/><CTA/></div></div>
          </div>
        </div>
      </section>
{/* section4 */}
      <section className="bf b2">
        <div className="inn"><div className="tc"><div className="col"><div className="gb"/><h2 className="hg hg-sm">Ensure a great post-purchase experience for brand loyalty</h2><Bullets items={["Share reminder notifications about recurring payments","Send out alerts on transfer limits","Help customers with account details and interest rates","Simplify account information updates and password resets","Share invoices, e-policies, e-receipts with customers","Assist in credit card actions (blocking, renewing, upgrading, etc)"]}/><CTA/></div><div className="coli"><Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Banking-Finance/Banking-Finance-Section4%20%26Section5.webp" alt="Post-purchase experience for BFSI"/></div></div></div>
      </section>

      {/* <section className="bf b3">
        <div style={{padding:"0 7vw"}}><div className="inn" style={{textAlign:"center",marginBottom:52}}><div className="gb gb-c"/><h2 className="hg hg-c" style={{marginBottom:0}}>Seamless integration with 15+ popular business platforms</h2></div></div>
        <div className="dbl"><div className="slo fb3"><Track items={INT_R1} small/></div><div className="slo fb3"><Track items={INT_R2} small reverse/></div></div>
        <div style={{padding:"0 7vw"}}><div className="inn"><div className="why-section"><div className="why-intro"><div className="gb gb-c"/><h2 className="hg hg-sm hg-c" style={{marginBottom:14}}>Why should BFSI use WhatsApp for Business?</h2><p className="sub">WhatsApp is one of the most commonly used messaging platforms across all demographics. It offers a more direct channel to reach and engage your prospects as well as customers.</p></div><div className="why-grid">{WHY_STATS.map((w,i)=>(<div className="why-card" key={i}><div className="wc-num">{w.num}</div><div className="wc-lbl">{w.lbl}</div></div>))}</div></div></div></div>
      </section> */}
{/* section5 */}
      <section className="bf b1">
        <div className="inn"><div className="tc"><div className="col"><div className="gb"/><div className="q-block"><p className="q-text">"Haptik's conversational AI platform has revolutionized the way we engage with our customers. The implementation of their AI-powered conversations on WhatsApp has brought a new level of convenience and personalization to our services. Our customers can now interact with us seamlessly through a messaging app they already use every day."</p><p className="q-attr">  Sachin Vashishtha, Chief Marketing Officer, Paisabazaar</p></div><div className="glass-row">{PAISABAZAAR_STATS.map((s,i)=>(<div className="glass-card" key={i}><div className="gc-num">{s.num}</div><div className="gc-lbl">{s.lbl}</div></div>))}</div></div><div className="coli"><Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Banking-Finance/Banking-Finance-Section4%20%26Section5.webp" alt="Paisabazaar success story"/></div></div></div>
      </section>

      <ContactUsForm/>
    </>
  );
}