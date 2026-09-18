import { useState } from "react";
import GoogleForm from "../ui/GoogleForm";
import ContactUsForm from "@/pages/ContactUsForm";

const STYLES = `

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{overflow-x:hidden;}
body{background:#0A0A0A;color:#fff;font-family:'Inter',sans-serif;overflow-x:hidden;}

:root{--gold:#C9A84C;--gold2:#E0B85A;--cream:#F5F0E8;--bg:#0A0A0A;--bg2:#0E0E0E;--bg3:#111111;--border:rgba(201,168,76,0.18);}

.ps{width:100%;padding:48px 7vw;}
.ps-dark{background:#0A0A0A;}.ps-dark2{background:#0E0E0E;}.ps-dark3{background:#111111;}
.ps+.ps{border-top:1px solid var(--border);}
.ps-hero{width:100%;background:#0A0A0A;padding-left:7vw;padding-right:7vw;padding-bottom:56px;}
.hero-inner{max-width:1200px;margin:0 auto;margin-top:140px;}
.inner{max-width:1200px;margin:0 auto;}
.two-col{display:flex;align-items:center;gap:64px;}
.two-col .col{flex:1;min-width:0;}
.two-col .col-img{flex:1;display:flex;justify-content:center;}
.img-box{width:100%;max-width:760px;aspect-ratio:5/4;border-radius:14px;overflow:hidden;background:transparent;border:none;}
.img-box img{width:100%;height:100%;object-fit:contain;border-radius:14px;display:block;}
.h-gold{font-family:'Libre Baskerville',serif;font-size:clamp(1.75rem,2.6vw,2.55rem);font-weight:700;color:var(--gold);line-height:1.28;letter-spacing:-0.01em;margin-bottom:28px;}
.h-center{text-align:center;}
.p-cream{font-family:'Inter',sans-serif;font-size:clamp(0.88rem,1.1vw,1rem);color:var(--cream);line-height:1.72;opacity:0.88;}
.gold-bar{width:52px;height:3px;background:var(--gold);border-radius:2px;margin-bottom:22px;}
.gold-bar-center{margin-left:auto;margin-right:auto;}
.b-list{list-style:none;display:flex;flex-direction:column;gap:14px;margin-bottom:32px;}
.b-item{display:flex;align-items:flex-start;gap:12px;font-family:'Inter',sans-serif;font-size:clamp(0.88rem,1.05vw,1rem);color:var(--cream);line-height:1.68;}
.b-tick{flex-shrink:0;margin-top:2px;}
.btn-row{display:flex;flex-wrap:wrap;gap:16px;}
.btn-g{background:var(--gold);color:#0A0A0A;font-family:'Inter',sans-serif;font-weight:700;font-size:0.9rem;padding:13px 30px;border:none;border-radius:5px;cursor:pointer;letter-spacing:0.03em;transition:all 0.25s;white-space:nowrap;}
.btn-g:hover{background:var(--gold2);transform:translateY(-2px);box-shadow:0 8px 24px rgba(201,168,76,0.32);}
.slider-outer{position:relative;overflow:hidden;padding:10px 0;}
.slider-outer::before,.slider-outer::after{content:'';position:absolute;top:0;bottom:0;width:160px;z-index:2;pointer-events:none;}
.slider-outer.dark2::before{left:0;background:linear-gradient(to right,#0E0E0E 25%,transparent);}
.slider-outer.dark2::after{right:0;background:linear-gradient(to left,#0E0E0E 25%,transparent);}
.slider-outer.dark::before{left:0;background:linear-gradient(to right,#0A0A0A 25%,transparent);}
.slider-outer.dark::after{right:0;background:linear-gradient(to left,#0A0A0A 25%,transparent);}
.slider-outer.dark3::before{left:0;background:linear-gradient(to right,#111111 25%,transparent);}
.slider-outer.dark3::after{right:0;background:linear-gradient(to left,#111111 25%,transparent);}
.s-track{display:flex;gap:24px;width:max-content;animation:marquee 20s linear infinite;}
.s-track.rev{animation-direction:reverse;animation-duration:18s;}
.s-track:hover{animation-play-state:paused;}
@keyframes marquee{from{transform:translateX(0);}to{transform:translateX(-50%);}}
.ic-lg{width:140px;height:50px;border-radius:8px;display:flex;align-items:center;justify-content:center;gap:8px;flex-shrink:0;background:transparent;border:none;transition:transform 0.3s;}
.ic-lg:hover{transform:translateY(-2px);}
.ic-lg img{width:auto;height:100%;max-width:100%;max-height:100%;object-fit:contain;}
.ic-lg span{display:none;}
.ic-sm{width:140px;height:50px;border-radius:8px;display:flex;align-items:center;justify-content:center;gap:8px;flex-shrink:0;background:transparent;border:none;transition:transform 0.3s;}
.ic-sm:hover{transform:translateY(-2px);}
.ic-sm img{width:auto;height:100%;max-width:100%;max-height:100%;object-fit:contain;}
.ic-sm span{display:none;}
.tl-wrap{position:relative;display:flex;flex-direction:column;max-width:780px;margin:0 auto;}
.tl-wrap::before{content:'';position:absolute;left:27px;top:28px;bottom:28px;width:2px;background:linear-gradient(to bottom,#1a6b1a 0%,#E6A817 35%,#22c55e 65%,#2563EB 100%);border-radius:2px;}
.tl-item{display:flex;gap:32px;align-items:flex-start;padding:22px 0;}
.tl-icon{width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0;position:relative;z-index:1;}
.tl-icon.c1{background:#1a6b1a;}.tl-icon.c2{background:#E6A817;}.tl-icon.c3{background:#22c55e;}.tl-icon.c4{background:#2563EB;}
.tl-body{flex:1;padding-top:10px;}
.tl-title{font-family:'Libre Baskerville',serif;font-size:1.2rem;font-weight:700;color:var(--gold);margin-bottom:8px;}
.tl-desc{font-family:'Inter',sans-serif;font-size:0.95rem;color:var(--cream);line-height:1.7;opacity:0.85;}
.dbl-slider{display:flex;flex-direction:column;gap:18px;overflow:hidden;}
.s11-pills{display:flex;flex-wrap:wrap;justify-content:center;gap:18px;margin-bottom:44px;}
.s11-pill{display:flex;align-items:center;gap:10px;padding:13px 24px;border:1px solid var(--border);border-radius:50px;background:rgba(201,168,76,0.05);font-family:'Inter',sans-serif;font-size:0.93rem;color:var(--cream);transition:all 0.3s;cursor:default;white-space:nowrap;}
.s11-pill:hover{border-color:var(--gold);background:rgba(201,168,76,0.1);transform:translateY(-3px);color:#fff;}
.s11-pill .pc{color:var(--gold);}
.s10-italic{font-family:'Libre Baskerville',serif;font-size:clamp(0.95rem,1.3vw,1.15rem);color:var(--cream);font-style:italic;margin-bottom:10px;}
.s10-tags{font-family:'Inter',sans-serif;font-size:0.82rem;color:var(--gold);opacity:0.8;letter-spacing:0.04em;margin-bottom:32px;}

@media(max-width:960px){
  .ps{padding:40px 5vw;}.ps-hero{padding-left:5vw;padding-right:5vw;padding-bottom:44px;}
  .hero-inner{margin-top:160px;}
  .two-col{flex-direction:column;gap:40px;}
  .two-col.flip-mob{flex-direction:column-reverse;}
  .col-img{width:100%;}.img-box{max-width:100%;}
  .tl-wrap::before{left:23px;}.tl-icon{width:48px;height:48px;}
  .slider-outer::before,.slider-outer::after{width:80px;}
  .ic-lg,.ic-sm{width:120px;height:45px;}
}
@media(max-width:600px){
  .ps{padding:36px 5vw;}.ps-hero{padding-left:5vw;padding-right:5vw;padding-bottom:40px;}
  .hero-inner{margin-top:120px;}
  .two-col{gap:28px;}
  .btn-row{flex-direction:column;}
  .btn-g{width:100%;text-align:center;}
  .s11-pills{gap:12px;}.s11-pill{padding:11px 16px;font-size:0.82rem;}
  .tl-wrap::before{left:19px;}.tl-icon{width:40px;height:40px;font-size:1rem;}
  .tl-item{gap:18px;padding:18px 0;}.tl-body{padding-top:6px;}
  .slider-outer::before,.slider-outer::after{width:44px;}
  .ic-lg,.ic-sm{width:100px;height:38px;}
}
`;


const TL = [
  {color:"c1",icon:"🖱️",title:"Acquire",desc:"Integrate Google & FB Leads form to obtain leads. Answer FAQs via custom auto-replies to solve queries quickly & efficiently."},
  {color:"c2",icon:"💼",title:"Convert",desc:"Setup automated & personalized WhatsApp notifications to send offers & discount. Invite brands for free KT sessions and webinars via WhatsApp Broadcast."},
  {color:"c3",icon:"😊",title:"Delight",desc:"Support clients at scale on WhatsApp. Gather ratings/feedback from clients using WhatsApp automated flows."},
  {color:"c4",icon:"🔔",title:"Engage",desc:"Send payment invoices & regular account updates. Send product & company updates to keep the customers updated on new developments."},
];

function Img({src,alt}:{src:string;alt:string}){return <div className="img-box"><img src={src} alt={alt} loading="lazy" decoding="async" /></div>;}
function Bullets({items}:{items:string[]}){return(<ul className="b-list">{items.map((t,i)=>(<li className="b-item" key={i}><span className="b-tick">✅</span><span>{t}</span></li>))}</ul>);}
function Track({items,small=false,reverse=false}:{items:{src:string}[];small?:boolean;reverse?:boolean}){
  const doubled=[...items,...items];
  return(<div className={`s-track${reverse?" rev":""}`}>{doubled.map((item,i)=>small?<div className="ic-sm" key={i}><img src={item.src} alt="icon" loading="lazy" decoding="async" /></div>:<div className="ic-lg" key={i}><img src={item.src} alt="icon" loading="lazy" decoding="async" /></div>)}</div>);
}

export default function B2BSalesPage(){
  const [modalOpen,setModalOpen]=useState(false);
  const CTA=()=><div className="btn-row"></div>;

  return(
    <>
      <style>{STYLES}</style>
      <GoogleForm isOpen={modalOpen} onClose={()=>setModalOpen(false)}/>

      <section className="ps-hero ps-dark">
        <div className="hero-inner">
          <div className="two-col">
            <div className="col">
              <div className="gold-bar"/>
              <h1 className="h-gold">Close your B2B sales cycle faster with WhatsApp</h1>
              <Bullets items={["Share product / service information via catalogs","Offer 24×7 technical support with WhatsApp automation","Set up auto payment reminders on WhatsApp for subscription renewals"]}/>
              <CTA/>
            </div>
            <div className="col-img"><Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/WhatsAppB2BSales/WhatsAppB2B-Section1.webp" alt="WhatsApp B2B Hero"/></div>
          </div>
        </div>
      </section>

      <section className="ps ps-dark2" style={{padding:"48px 0 56px"}}>
        
        <div style={{padding:"0 7vw"}}>
          <div className="inner" style={{textAlign:"center"}}>
            <h2 className="h-gold h-center" style={{marginBottom:20}}>Turn B2B buyers into customers through WhatsApp conversations</h2>
            <p className="p-cream" style={{maxWidth:680,margin:"0 auto"}}>B2B SaaS market is set to hit $500B by 2026. Explore how <strong style={{color:"var(--gold)",fontWeight:600}}>WhatsApp Business API</strong> can supercharge your customer engagement!</p>
          </div>
        </div>
      </section>

      <section className="ps ps-dark3">
        <div className="inner">
          <div style={{textAlign:"center",marginBottom:40}}>
            <div className="gold-bar gold-bar-center"/>
            <h2 className="h-gold h-center" style={{marginBottom:14}}>The complete B2B WhatsApp sales journey</h2>
            <p className="p-cream" style={{maxWidth:520,margin:"0 auto"}}>From first touch to lifelong customer manage every stage seamlessly on WhatsApp.</p>
          </div>
          <div className="tl-wrap">
            {TL.map((item,i)=>(<div className="tl-item" key={i}><div className={`tl-icon ${item.color}`}>{item.icon}</div><div className="tl-body"><div className="tl-title">{item.title}</div><p className="tl-desc">{item.desc}</p></div></div>))}
          </div>
        </div>
      </section>

      <section className="ps ps-dark">
        <div className="inner">
          <div className="two-col">
            <div className="col">
              <div className="gold-bar"/>
              <h2 className="h-gold">Capture more leads with WhatsApp marketing and ad campaigns.</h2>
              <Bullets items={["Run click-to-WhatsApp ads for higher customer acquisition rates","Initiate conversations with website WhatsApp widget","Share WhatsApp links on social media to get discovered online"]}/>
              <CTA/>
            </div>
            <div className="col-img"><Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/WhatsAppB2BSales/WhatsAppB2B-section2.webp" alt="Capture leads"/></div>
          </div>
        </div>
      </section>

      <section className="ps ps-dark2"> 
        <div className="inner">
          <div className="two-col flip-mob">
            <div className="col-img"><Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/WhatsAppB2BSales/WhatsAppB2B-section3.webp" alt="Prevent drop-offs"/></div>
            <div className="col">
              <div className="gold-bar"/>
              <h2 className="h-gold">Prevent B2B leads from dropping off by setting up WhatsApp automations.</h2>
              <Bullets items={["Follow up with leads using welcome automation","Send out success stories / case studies and testimonials","Follow up to offer more assistance to B2B buyers"]}/>
              <CTA/>
            </div>
          </div>
        </div>
      </section>

      <section className="ps ps-dark3">
        <div className="inner">
          <div className="two-col">
            <div className="col">
              <div className="gold-bar"/>
              <h2 className="h-gold">Nudge your nurtured leads to move ahead in the sales funnel for more conversions.</h2>
              <Bullets items={["Accept payments on WhatsApp using frictionless payment integration","Offer product/service onboarding through automated workflows","Schedule product/service set up to converted buyers"]}/>
              <CTA/>
            </div>
            <div className="col-img"><Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/WhatsAppB2BSales/WhatsAppB2B-section4.webp" alt="Nudge leads"/></div>
          </div>
        </div>
      </section>

      <section className="ps ps-dark">
        <div className="inner">
          <div className="two-col flip-mob">
            <div className="col-img"><Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/WhatsAppB2BSales/WhatsAppB2B-section6.webp" alt="Keep engaged"/></div>
            <div className="col">
              <div className="gold-bar"/>
              <h2 className="h-gold">Keep your customers engaged with frequent conversations using WhatsApp automations.</h2>
              <Bullets items={["Send regular training videos to upskill users for your product/service","Share company newsletter on WhatsApp to keep your customers apprised of any new developments"]}/>
              <CTA/>
            </div>
          </div>
        </div>
      </section>

      <section className="ps ps-dark2">
        <div className="inner">
          <div className="two-col">
            <div className="col">
              <div className="gold-bar"/>
              <h2 className="h-gold">Use WhatsApp as a channel to continually delight your customers through interactive messages and automations.</h2>
              <Bullets items={["Send product / service reports using media files","Follow up to offer more assistance to customers","Gather customer feedback and insights using interactive messages"]}/>
              <CTA/>
            </div>
            <div className="col-img"><Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/WhatsAppB2BSales/WhatsAppB2B-section7.webp" alt="Delight customers"/></div>
          </div>
        </div>
      </section>

     

      <section className="ps ps-dark">
        <div className="inner">
          <div className="two-col">
            <div className="col">
              <div className="gold-bar"/>
              <h2 className="h-gold">Optimize your B2B sales cycle and grow your business with WhatsApp</h2>
              <p className="s10-italic">Start your 14-day free trial today</p>
              <p className="s10-tags">14-day free trial · No credit card · No setup cost</p>
              <CTA/>
            </div>
            <div className="col-img"><Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/WhatsAppB2BSales/WhatsAppB2B-section7.webp" alt="Get started"/></div>
          </div>
        </div>
      </section>

      <ContactUsForm/>
    </>
  );
}
