import { useState, useEffect } from "react";
import GoogleForm from "../ui/GoogleForm";
import ContactUsForm from "@/pages/ContactUsForm";
/* ═══════════════════════════════════════════════════════════════
   TravelTourismPage.jsx   complete 13-section page
   Fonts : Libre Baskerville (headings) + Inter (body)
   Colors: Gold #C9A84C | Cream #F5F0E8 | White #FFFFFF | BG #0A0A0A
═══════════════════════════════════════════════════════════════ */

const CSS = `

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
body{background:#0A0A0A;color:#fff;font-family:'Inter',sans-serif;overflow-x:hidden;}

:root{
  --g:   #C9A84C;
  --g2:  #E0B85A;
  --cr:  #F5F0E8;
  --w:   #FFFFFF;
  --b1:  #0A0A0A;
  --b2:  #0E0E0E;
  --b3:  #111111;
  --bd:  rgba(201,168,76,.18);
}

.tt-sec{width:100%;padding:56px 7vw;position:relative;}
.tt-sec.b1{background:var(--b1);}
.tt-sec.b2{background:var(--b2);}
.tt-sec.b3{background:var(--b3);}
.tt-sec+.tt-sec{border-top:1px solid var(--bd);}

.tt-sec.hero-sec{padding-top:160px;padding-bottom:60px;}

.inn{max-width:1200px;margin:0 auto;}

.tc{display:flex;align-items:center;gap:64px;}
.tc .col{flex:1;min-width:0;}
.tc .col-i{flex:1;display:flex;justify-content:center;align-items:center;}

.ibox{
  width:100%;max-width:520px;aspect-ratio:4/3;
  border-radius:14px;background:transparent;border:none;overflow:hidden;
}
.ibox img{width:100%;height:100%;object-fit:contain;display:block;border-radius:14px;}

.hg{
  font-family:'Libre Baskerville',serif;
  font-size:clamp(1.7rem,2.6vw,2.55rem);
  font-weight:700;color:var(--g);
  line-height:1.28;letter-spacing:-.01em;margin-bottom:26px;
}
.hg-sm{font-size:clamp(1.35rem,2vw,1.9rem);}
.hg-c{text-align:center;}
.hg-lg{font-size:clamp(1.9rem,3vw,2.9rem);}

.pc{
  font-family:'Inter',sans-serif;
  font-size:clamp(.88rem,1.1vw,1rem);
  color:var(--cr);line-height:1.72;opacity:.88;
}

.gbar{width:52px;height:3px;background:var(--g);border-radius:2px;margin-bottom:22px;}
.gbar-c{margin:0 auto 22px;}

.blist{list-style:none;display:flex;flex-direction:column;gap:13px;margin-bottom:30px;}
.bitem{
  display:flex;align-items:flex-start;gap:11px;
  font-family:'Inter',sans-serif;
  font-size:clamp(.88rem,1.05vw,1rem);
  color:var(--cr);line-height:1.68;
}
.bitem .tk{flex-shrink:0;margin-top:2px;}

.brow{display:flex;flex-wrap:wrap;gap:14px;}
.btng{
  background:var(--g);color:#0A0A0A;
  font-family:'Inter',sans-serif;font-weight:700;
  font-size:.9rem;padding:13px 30px;
  border:none;border-radius:5px;cursor:pointer;
  letter-spacing:.03em;transition:all .25s;white-space:nowrap;
}
.btng:hover{background:var(--g2);transform:translateY(-2px);box-shadow:0 8px 24px rgba(201,168,76,.32);}
.btno{
  background:transparent;color:var(--g);
  font-family:'Inter',sans-serif;font-weight:700;
  font-size:.9rem;padding:12px 30px;
  border:1.5px solid var(--g);border-radius:5px;cursor:pointer;
  letter-spacing:.03em;transition:all .25s;white-space:nowrap;
}
.btno:hover{background:rgba(201,168,76,.08);transform:translateY(-2px);}

/* ── S2 TRUST BAND ── */
.trust-head{
  font-family:'Libre Baskerville',serif;
  font-size:clamp(1rem,1.4vw,1.25rem);
  color:var(--cr);text-align:center;
  line-height:1.6;opacity:.85;max-width:720px;margin:0 auto 52px;
}

/* ── SLIDERS ── */
.sl-outer{position:relative;overflow:hidden;padding:10px 0;}
.sl-outer::before,.sl-outer::after{
  content:'';position:absolute;top:0;bottom:0;width:160px;z-index:2;pointer-events:none;
}
.sl-b1::before{left:0;background:linear-gradient(to right,#0A0A0A 25%,transparent);}
.sl-b1::after {right:0;background:linear-gradient(to left ,#0A0A0A 25%,transparent);}
.sl-b2::before{left:0;background:linear-gradient(to right,#0E0E0E 25%,transparent);}
.sl-b2::after {right:0;background:linear-gradient(to left ,#0E0E0E 25%,transparent);}
.sl-b3::before{left:0;background:linear-gradient(to right,#111111 25%,transparent);}
.sl-b3::after {right:0;background:linear-gradient(to left ,#111111 25%,transparent);}

.sl-track{
  display:flex;gap:24px;width:max-content;
  animation:marquee 22s linear infinite;
}
.sl-track.rev{animation-direction:reverse;animation-duration:19s;}
.sl-track:hover{animation-play-state:paused;}

@keyframes marquee{from{transform:translateX(0);}to{transform:translateX(-50%);}}

/* ══════════════════════════════════════════════════
   BOTH SLIDER CARDS 361×121, image fills container
══════════════════════════════════════════════════ */
.ic-lg,
.ic-sm {
  width: 140px;
  height: 50px;
  border-radius: 12px;
  border: 1px solid var(--bd);
  background: rgba(201,168,76,.04);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
  transition: border-color .3s, transform .3s;
  padding: 0;
}
.ic-lg:hover,
.ic-sm:hover {
  border-color: var(--g);
  transform: translateY(-4px);
}

/* Image fills the full container no gaps, no padding */
.ic-lg img,
.ic-sm img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

/* Label hidden image fills everything */
.ic-lg span,
.ic-sm span {
  display: none;
}

/* ── S3 TIMELINE ── */
.tl-wrap{
  position:relative;display:flex;flex-direction:column;
  max-width:780px;margin:0 auto 48px;
}
.tl-wrap::before{
  content:'';position:absolute;left:27px;top:28px;bottom:28px;width:2px;
  background:linear-gradient(to bottom,#1a6b1a 0%,#E6A817 35%,#22c55e 65%,#2563EB 100%);
  border-radius:2px;
}
.tl-item{display:flex;gap:30px;align-items:flex-start;padding:20px 0;}
.tl-ico{
  width:56px;height:56px;border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  font-size:1.25rem;flex-shrink:0;position:relative;z-index:1;
}
.c1{background:#1a6b1a;}.c2{background:#E6A817;}.c3{background:#22c55e;}.c4{background:#2563EB;}
.tl-body{flex:1;padding-top:10px;}
.tl-t{font-family:'Libre Baskerville',serif;font-size:1.15rem;font-weight:700;color:var(--g);margin-bottom:8px;}
.tl-d{font-family:'Inter',sans-serif;font-size:.94rem;color:var(--cr);line-height:1.7;opacity:.85;}

.s3-bottom{text-align:center;max-width:720px;margin:0 auto;padding-top:20px;border-top:1px solid var(--bd);}
.s3-bottom .hg{font-size:clamp(1.4rem,2vw,1.9rem);}
.s3-bottom strong{color:var(--g);font-weight:600;}

/* ── S11 QUOTE + STATS ── */
.quote-box{border-left:3px solid var(--g);padding-left:22px;margin-bottom:36px;}
.quote-text{
  font-family:'Libre Baskerville',serif;font-style:italic;
  font-size:clamp(1rem,1.35vw,1.2rem);color:var(--cr);line-height:1.7;margin-bottom:12px;
}
.quote-attr{font-family:'Inter',sans-serif;font-size:.85rem;color:var(--g);font-weight:600;}

.stats-row{display:flex;gap:20px;flex-wrap:wrap;}
.stat-card{
  flex:1;min-width:140px;padding:22px 20px;border-radius:12px;
  border:1px solid var(--bd);background:rgba(201,168,76,.05);text-align:center;
}
.stat-num{
  font-family:'Libre Baskerville',serif;font-size:clamp(1.6rem,2.5vw,2.2rem);
  font-weight:700;color:var(--g);margin-bottom:8px;
}
.stat-lbl{font-family:'Inter',sans-serif;font-size:.8rem;color:var(--cr);opacity:.8;line-height:1.45;}

/* ── S12 DOUBLE SLIDER ── */
.dbl{display:flex;flex-direction:column;gap:16px;overflow:hidden;}

/* ── S13 TORN CARD ── */
.torn-wrap{position:relative;margin-top:56px;}
.torn-card{
  background:rgba(201,168,76,.07);border:1px solid var(--bd);
  border-radius:4px;padding:44px 48px;position:relative;overflow:hidden;
}
.torn-card::before{
  content:'';position:absolute;top:-1px;left:0;right:0;height:18px;
  background:var(--b2);
  clip-path:polygon(
    0% 0%,2% 100%,4% 20%,6% 90%,8% 10%,10% 85%,12% 5%,
    14% 95%,16% 15%,18% 88%,20% 8%,22% 92%,24% 18%,
    26% 82%,28% 12%,30% 90%,32% 5%,34% 88%,36% 20%,
    38% 80%,40% 10%,42% 95%,44% 12%,46% 85%,48% 3%,
    50% 92%,52% 15%,54% 82%,56% 8%,58% 90%,60% 18%,
    62% 78%,64% 5%,66% 95%,68% 20%,70% 85%,72% 10%,
    74% 92%,76% 18%,78% 80%,80% 5%,82% 90%,84% 15%,
    86% 88%,88% 8%,90% 95%,92% 20%,94% 85%,96% 5%,
    98% 92%,100% 0%
  );
}
.torn-card::after{
  content:'';position:absolute;bottom:-1px;left:0;right:0;height:18px;
  background:var(--b2);
  clip-path:polygon(
    0% 100%,2% 0%,4% 80%,6% 10%,8% 90%,10% 15%,12% 95%,
    14% 5%,16% 85%,18% 12%,20% 92%,22% 18%,24% 82%,
    26% 8%,28% 88%,30% 20%,32% 95%,34% 12%,36% 80%,
    38% 5%,40% 90%,42% 18%,44% 88%,46% 8%,48% 97%,
    50% 15%,52% 85%,54% 5%,56% 92%,58% 20%,60% 82%,
    62% 10%,64% 95%,66% 22%,68% 80%,70% 8%,72% 90%,
    74% 15%,76% 85%,78% 5%,80% 92%,82% 20%,84% 80%,
    86% 10%,88% 95%,90% 15%,92% 85%,94% 8%,96% 92%,
    98% 15%,100% 100%
  );
}
.torn-inner{text-align:center;}
.torn-inner .hg{font-size:clamp(1.4rem,2vw,1.85rem);margin-bottom:32px;}

.t-pills{display:flex;flex-wrap:wrap;justify-content:center;gap:14px;margin-bottom:36px;}
.t-pill{
  display:flex;align-items:center;gap:9px;padding:11px 22px;
  border:1px solid var(--bd);border-radius:50px;background:rgba(201,168,76,.05);
  font-family:'Inter',sans-serif;font-size:.88rem;color:var(--cr);
  transition:all .3s;white-space:nowrap;
}
.t-pill:hover{border-color:var(--g);background:rgba(201,168,76,.1);transform:translateY(-3px);}
.t-pill .pc2{color:var(--g);}

.s13-sub{
  font-family:'Libre Baskerville',serif;font-style:italic;
  font-size:clamp(.9rem,1.2vw,1.05rem);color:var(--cr);margin-bottom:8px;
}
.s13-tags{
  font-family:'Inter',sans-serif;font-size:.8rem;
  color:var(--g);opacity:.8;letter-spacing:.04em;margin-bottom:30px;
}

/* ── RESPONSIVE ── */
@media(max-width:960px){
  .tt-sec{padding:44px 5vw;}
  .tt-sec.hero-sec{padding-top:108px;padding-bottom:28px;}
  .tc{flex-direction:column;gap:36px;}
  .tc.flip{flex-direction:column-reverse;}
  .col-i{width:100%;}
  .ibox{max-width:100%;}
  .tl-wrap{max-width:100%;}
  .tl-wrap::before{left:23px;}
  .tl-ico{width:48px;height:48px;}
  .sl-outer::before,.sl-outer::after{width:80px;}
  .stats-row{gap:14px;}
  .torn-card{padding:36px 28px;}
  .hg{font-size:clamp(1.5rem,3.5vw,2.2rem);}
  .hg-lg{font-size:clamp(1.7rem,4vw,2.4rem);}
  .ic-lg,.ic-sm{width:260px;height:88px;}
}
  @media (max-width: 600px) {
    .tt-sec.hero-sec {
        padding-top: 0px !important;
        padding-bottom: 24px !important;
    }
}

@media(max-width:600px){
  .tt-sec{padding:32px 5vw 40px;}
  .tt-sec.hero-sec{padding-top:108px !important;padding-bottom:24px !important;}
  .tc{gap:24px;}
  .tc,.tc.flip{flex-direction:column !important;}
  .col-i{width:100%;}
  .ibox{max-width:100%;aspect-ratio:3/2;}
  .brow{flex-direction:column;}
  .btng,.btno{width:100%;text-align:center;padding:14px 20px;}
  .sl-outer::before,.sl-outer::after{width:44px;}
  .tl-ico{width:38px;height:38px;font-size:.9rem;}
  .tl-item{gap:14px;padding:16px 0;}
  .tl-body{padding-top:4px;}
  .tl-wrap::before{left:18px;top:24px;bottom:24px;}
  .tl-t{font-size:1rem;}
  .tl-d{font-size:.88rem;}
  .stats-row{flex-direction:column;gap:12px;}
  .stat-card{padding:18px 16px;}
  .t-pill{padding:10px 14px;font-size:.8rem;}
  .t-pills{gap:10px;}
  .torn-card{padding:28px 18px;}
  .torn-card::before,.torn-card::after{height:12px;}
  .hg{font-size:clamp(1.3rem,6vw,1.75rem);}
  .hg-lg{font-size:clamp(1.5rem,6.5vw,2rem);}
  .hg-c{font-size:clamp(1.2rem,5.5vw,1.6rem);}
  .pc{font-size:.9rem;}
  .bitem{font-size:.88rem;}
  .quote-box{padding-left:16px;}
  .quote-text{font-size:.95rem;}
  .gbar{margin-bottom:16px;}
  .ic-lg,.ic-sm{width:180px;height:60px;}
}
`;

/* ─── DATA ──────────────────────────────────────────────────── */


const TL_DATA = [
  {color:"c1",icon:"🖱️",title:"Acquire",
   desc:"Add WhatsApp widget on website/place WA link on social handles to generate leads. Answer FAQs via custom auto-replies to help customers pick & choose travel packages."},
  {color:"c2",icon:"💼",title:"Convert",
   desc:"Upsell & Cross-sell with personalized hotel, taxi, etc recommendations on WhatsApp. Retarget leads acquired via click to WhatsApp ads to boost conversions & Send payment links for quick settlements."},
  {color:"c3",icon:"😊",title:"Delight",
   desc:"Support clients at scale on WhatsApp. Gather ratings/feedback from clients using WhatsApp automated flows."},
  {color:"c4",icon:"🔔",title:"Engage",
   desc:"Send itinerary and other booking related information regularly on WhatsApp. Setup automated & personalized WhatsApp notifications to send offers & discounts in peak season."},
];

const INT_R1 = [
  {src:"https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-1.png",        label:""},
  {src:"https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-2.webp",  label:""},
  {src:"https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-3.png",  label:""},
  {src:"https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-4.png",  label:""},
  {src:"https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-5.png",  label:""},
  {src:"https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-6.png",  label:""},
  {src:"https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-7.png",  label:""},
  {src:"https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-8.png",  label:""},
];
const INT_R2 = [
  {src:"https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-9.png",  label:""},
  {src:"https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-10.webp", label:""},
  {src:"https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-11.png", label:""},
  {src:"https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-12.png", label:""},
  {src:"https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-13.png", label:""},
  {src:"https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-14.png", label:""},
  {src:"https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-15.png", label:""},
  {src:"https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-16.png", label:""},
];

/* ─── HELPERS ───────────────────────────────────────────────── */
function Img({src, alt}) {
  return (
    <div className="ibox">
      <img src={src} alt={alt} loading="lazy" decoding="async" />
    </div>
  );
}

function Bullets({items}) {
  return (
    <ul className="blist">
      {items.map((t,i) => (
        <li className="bitem" key={i}>
          <span className="tk">✅</span><span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

function Track({items, small=false, reverse=false}) {
  const d = [...items,...items];
  return (
    <div className={`sl-track${reverse?" rev":""}`}>
      {d.map((item,i) =>
        small
          ? <div className="ic-sm" key={i}><img src={item.src} alt={item.label} loading="lazy" decoding="async" /><span>{item.label}</span></div>
          : <div className="ic-lg" key={i}><img src={item.src} alt={item.label} loading="lazy" decoding="async" /><span>{item.label}</span></div>
      )}
    </div>
  );
}

/* ─── PAGE ───────────────────────────────────────────────────── */
export default function TravelTourismPage() {
  const [modalOpen,setModalOpen]=useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 767);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const CTA=()=><div className="btn-row"></div>;
  
  return (
    <>
      <style>{CSS}</style>
      <GoogleForm isOpen={modalOpen} onClose={() => setModalOpen(false)}/>

      {/* S1 HERO */}
      <section className="tt-sec b1 hero-sec">
        <div className="inn" style={{marginTop: 0}}>
          <div className="tc">
            <div className="col">
             
              <h1 className="hg hg-lg">
                Generate more leads for your travel agency on WhatsApp
              </h1>
              <Bullets items={[
                "Enable 24/7 customer support and agent availability",
                "Automate FAQs around travel and tourism queries",
                "Share relevant documents, PDFs, property brochures on WhatsApp",
              ]}/>
              
            </div>
            <div className="col-i">
              <Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Travel-Tourism/Travel-Tourism-section1.webp" alt="Travel WhatsApp Hero"/>
            </div>
          </div>
        </div>
      </section>

      
      
      {/* S2 TIMELINE */}
      <section className="tt-sec b3">
        <div className="inn">
          <div style={{textAlign:"center",marginBottom:40}}>
            <div className="gbar gbar-c"/>
            <h2 className="hg hg-c" style={{marginBottom:0}}>
              Create delightful experiences on WhatsApp
            </h2>
          </div>
          <div className="tl-wrap">
            {TL_DATA.map((item,i)=>(
              <div className="tl-item" key={i}>
                <div className={`tl-ico ${item.color}`}>{item.icon}</div>
                <div className="tl-body">
                  <div className="tl-t">{item.title}</div>
                  <p className="tl-d">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="s3-bottom">
            <h2 className="hg" style={{marginBottom:16}}>
              Explore use cases of WhatsApp Marketing & Automations for your travel business
            </h2>
            <p className="pc">
              As the travel market grows to $1 trillion by 2026,{" "}
              <strong style={{color:"var(--g)",fontWeight:600}}>WhatsApp Business API</strong>{" "}
              offers seamless connections with your customers!
            </p>
          </div>
        </div>
      </section>

      {/* S3 Cut through noise */}
      <section className="tt-sec b1">
        <div className="inn">
          <div className="tc">
            <div className="col">
              <div className="gbar"/>
              <h2 className="hg">Cut through the noise and generate more leads on WhatsApp</h2>
              <Bullets items={[
                "Run click to WhatsApp ads with exclusive offers to generate interest",
                "Use WhatsApp links to promote on social media and other platforms",
                "Add a WhatsApp widget on your website to initiate conversations",
                "Follow up with customers using automated greeting messages to get more details",
              ]}/>
              
            </div>
            <div className="col-i"><Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Travel-Tourism/Travel-Tourism-section3.webp" alt="Generate leads"/></div>
          </div>
        </div>
      </section>

      {/* S4 Qualify leads */}
      <section className="tt-sec b2">
        <div className="inn">
          <div className="tc flip">
            <div className="col-i"><Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Travel-Tourism/Travel-Tourism-section4.webp" alt="Qualify leads"/></div>
            <div className="col">
              <div className="gbar"/>
              <h2 className="hg">Qualify leads on WhatsApp for timely follow-ups based on their travel requirements</h2>
              <Bullets items={[
                "Use WhatsApp chatbots to request more information like budget, destination, number of travelers and more",
                "Integrate with CRM to store customer data and assign the right travel agents",
                "Send WhatsApp broadcasts to promote new packages and deals based on query",
                "Automate FAQs to answer travel queries",
              ]}/>
            </div>
          </div>
        </div>
      </section>

      {/* S5 Reduce drop-offs + Proactive updates */}
      <section className="tt-sec b3">
        <div className="inn">
          <div className="tc" style={{marginBottom:60}}>
            <div className="col">
              <div className="gbar"/>
              <h2 className="hg">Reduce drop-offs, take bookings & payments for travel packages on WhatsApp</h2>
              <Bullets items={[
                "Take package customizations and requirements on WhatsApp",
                "Share final proposal and itinerary on WhatsApp as PDFs",
                "Take booking confirmations and payments on WhatsApp",
              ]}/>
              
            </div>
            <div className="col-i"><Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Travel-Tourism/Travel-Tourism-section5.webp" alt="Reduce drop-offs"/></div>
          </div>
          <div style={{height:1,background:"var(--bd)",margin:"0 0 60px"}}/>
          <div className="tc flip">
            <div className="col-i"><Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Travel-Tourism/Travel-Tourism-section6.webp" alt="Proactive updates"/></div>
            <div className="col">
              <div className="gbar"/>
              <h2 className="hg">Send proactive updates for travel booking confirmation, & reminders</h2>
              <Bullets items={[
                "Automate booking status and confirmation updates",
                "Send booking progress for international travels like VISA application and more",
                "Offer easy rescheduling and requests for services over WhatsApp",
                "Share boarding passes and e-tickets on WhatsApp for easy document access",
              ]}/>
             
            </div>
          </div>
        </div>
      </section>

      {/* S6  Positive experience */}
      <section className="tt-sec b1">
        <div className="inn">
          <div className="tc flip">
            <div className="col-i"><Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Travel-Tourism/Travel-Tourism-section7.webp" alt="Customer experience"/></div>
            <div className="col">
              <div className="gbar"/>
              <h2 className="hg">Use WhatsApp to go one step further & deliver a truly positive customer experience for travelers</h2>
              <Bullets items={[
                "Enable easy hotel check-in services through WhatsApp",
                "Offer booking for services such as wheelchair assistance, calling for an extra bed, taking restaurant reservations and more",
              ]}/>
            </div>
          </div>
        </div>
      </section>

      {/* S7 Post-purchase support */}
      <section className="tt-sec b2">
        <div className="inn">
          <div className="tc">
            <div className="col">
              <div className="gbar"/>
              <h2 className="hg">Offer proactive post-purchase customer support and service</h2>
              <Bullets items={[
                "Take complaints and requests using interactive messages and reply buttons",
                "Request seller and property verification documents over an encrypted platform",
                "Integrate with CRM to maintain seller records",
                "Schedule call backs and coordination with destination agents",
                "Take cancellations and issue refunds through conversations",
              ]}/>
             
            </div>
            <div className="col-i"><Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Travel-Tourism/Travel-Tourism-section8.webp" alt="Post-purchase support"/></div>
          </div>
        </div>
      </section>

      {/* S8 Repeat bookings */}
      <section className="tt-sec b3">
        <div className="inn">
          <div className="tc flip">
            <div className="col-i"><Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Travel-Tourism/Travel-Tourism-section9.webp" alt="Repeat bookings"/></div>
            <div className="col">
              <div className="gbar"/>
              <h2 className="hg">Keep customers engaged for repeat bookings & boost loyalty</h2>
              <Bullets items={[
                "Automate customer feedback and review requests",
                "Conduct surveys to capture insights to improve hospitality",
                "Request referrals from happy customers in lieu of discounts",
                "Encourage customers to join loyalty program to avail added benefits",
                "Make it easy to re-book packages at set intervals",
                "Send travel package recommendations based on previous purchases using WhatsApp broadcasts",
                "Keep customers up-to-date with news and media mentions of your agency",
              ]}/>
            </div>
          </div>
        </div>
      </section>

      {/* S9 Why WhatsApp */}
      <section className="tt-sec b1">
        <div className="inn">
          <div style={{textAlign:"center",marginBottom:44}}>
            <div className="gbar gbar-c"/>
            <h2 className="hg hg-c" style={{marginBottom:0}}>
              Why use WhatsApp Business API for travel and tourism business?
            </h2>
          </div>
          <div className="tc">
            <div className="col">
              <p className="pc" style={{marginBottom:24}}>
                WhatsApp is bringing back human conversations into online sales journeys, helping businesses engage and understand customers better.
              </p>
              <Bullets items={[
                "Enable 24/7 customer support and agent availability",
                "Automate FAQs around travel and tourism queries",
                "Streamline your acquisition and engagement campaigns on one channel",
                "Gather more insights about customer requirements through natural conversations",
                "Optimize travel agent time on follow-ups for higher ROI",
                "Reduce your sales cycle with proactive communication",
              ]}/>
            </div>
            <div className="col-i"><Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Travel-Tourism/Travel-Tourism-section10.webp" alt="Why WhatsApp for travel"/></div>
          </div>
        </div>
      </section>

      {/* S10 QUOTE + STATS */}
      <section className="tt-sec b2">
        <div className="inn">
          <div className="tc">
            <div className="col">
              <div className="quote-box">
                <p className="quote-text">
                  "To have one WhatsApp number managed by multiple team members is something that I have always wanted in the past two years. Whatsapp has helped fulfill that."
                </p>
                <p className="quote-attr">  Varun Sarda, Founder & CEO, WTFares</p>
              </div>
              <div className="stats-row">
                <div className="stat-card">
                  <div className="stat-num">60%</div>
                  <div className="stat-lbl">Of entire conversations are handled on WhatsApp</div>
                </div>
                <div className="stat-card">
                  <div className="stat-num">15</div>
                  <div className="stat-lbl">Minutes to convert a lead into sales</div>
                </div>
                <div className="stat-card">
                  <div className="stat-num">2.5Cr</div>
                  <div className="stat-lbl">Monthly Revenue</div>
                </div>
              </div>
            </div>
            <div className="col-i"><Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Travel-Tourism/Travels-Tourism-Section-11.webp" alt="WTFares success story"/></div>
          </div>
        </div>
      </section>

     

      <ContactUsForm/>
    </>
  );
}