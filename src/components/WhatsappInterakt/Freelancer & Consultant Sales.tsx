import { useState } from "react";
import GoogleForm from "../ui/GoogleForm";
import ContactUsForm from "@/pages/ContactUsForm";
const CSS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
body{background:#0A0A0A;color:#fff;font-family:'Inter',sans-serif;overflow-x:hidden;}
:root{--g:#C9A84C;--g2:#E0B85A;--cr:#F5F0E8;--b1:#0A0A0A;--b2:#0E0E0E;--b3:#111111;--bd:rgba(201,168,76,.18);--bds:rgba(201,168,76,.07);}
.fc{width:100%;padding:48px 7vw;position:relative;}.fc.b1{background:var(--b1);}.fc.b2{background:var(--b2);}.fc.b3{background:var(--b3);}.fc+.fc{border-top:1px solid var(--bd);}
.fc.hero{padding-top:160px !important;padding-bottom:0 !important;}
.inn{max-width:1200px;margin:0 auto;}
.tc{display:flex;align-items:center;gap:64px;}.tc .col{flex:1;min-width:0;}.tc .coli{flex:1;display:flex;justify-content:center;align-items:center;}
.fc.hero .tc{align-items:flex-start;}
.ibox{width:100%;max-width:510px;aspect-ratio:4/3;border-radius:0;border:none;background:transparent;overflow:hidden;}.ibox img{width:100%;height:100%;object-fit:contain;border-radius:0;display:block;}
.hg{font-family:'Libre Baskerville',serif;font-size:clamp(1.7rem,2.5vw,2.5rem);font-weight:700;color:var(--g);line-height:1.27;letter-spacing:-.01em;margin-bottom:24px;}
.hg-sm{font-size:clamp(1.2rem,1.7vw,1.75rem);}.hg-lg{font-size:clamp(1.9rem,3vw,2.9rem);}.hg-c{text-align:center;}
.sub{font-family:'Inter',sans-serif;font-size:clamp(.88rem,1.05vw,1rem);color:var(--cr);line-height:1.73;opacity:.88;}
.sub-p{font-family:'Inter',sans-serif;font-size:clamp(.88rem,1.05vw,1rem);color:var(--cr);line-height:1.73;opacity:.88;margin-bottom:14px;}
.gb{width:48px;height:3px;background:var(--g);border-radius:2px;margin-bottom:20px;}.gb-c{margin:0 auto 20px;}
.bl{list-style:none;display:flex;flex-direction:column;gap:12px;margin-bottom:28px;}.bi{display:flex;align-items:flex-start;gap:11px;font-family:'Inter',sans-serif;font-size:clamp(.86rem,1vw,.98rem);color:var(--cr);line-height:1.68;}.bi .tk{flex-shrink:0;margin-top:2px;}
.br{display:flex;flex-wrap:wrap;gap:14px;}.bg-btn{background:var(--g);color:#0A0A0A;font-family:'Inter',sans-serif;font-weight:700;font-size:.9rem;padding:13px 30px;border:none;border-radius:6px;cursor:pointer;letter-spacing:.03em;transition:all .25s;white-space:nowrap;}.bg-btn:hover{background:var(--g2);transform:translateY(-2px);box-shadow:0 8px 24px rgba(201,168,76,.32);}
.slo{position:relative;overflow:hidden;padding:10px 0;}.slo::before,.slo::after{content:'';position:absolute;top:0;bottom:0;width:160px;z-index:2;pointer-events:none;}
.slo.fb2::before{left:0;background:linear-gradient(to right,#0E0E0E 25%,transparent);}.slo.fb2::after{right:0;background:linear-gradient(to left,#0E0E0E 25%,transparent);}
.slo.fb3::before{left:0;background:linear-gradient(to right,#111111 25%,transparent);}.slo.fb3::after{right:0;background:linear-gradient(to left,#111111 25%,transparent);}
.s-track{display:flex;gap:22px;width:max-content;animation:mq 24s linear infinite;}.s-track.rv{animation-direction:reverse;animation-duration:20s;}.s-track:hover{animation-play-state:paused;}
@keyframes mq{from{transform:translateX(0);}to{transform:translateX(-50%);}}

/* ── Trust-strip card: 140×50, image fills full, no label ── */
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

/* ── Integration rows card: image fills full, no label ── */
.ics{
  width:100px;
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
.ics:hover{border-color:var(--g);transform:translateY(-3px);}
.ics img{
  width:100%;
  height:100%;
  object-fit:contain;
  object-position:center;
  display:block;
}

.tlw{position:relative;display:flex;flex-direction:column;max-width:780px;margin:0 auto 52px;}.tlw::before{content:'';position:absolute;left:27px;top:28px;bottom:28px;width:2px;background:linear-gradient(to bottom,#1a6b1a 0%,#E6A817 33%,#22c55e 66%,#2563EB 100%);border-radius:2px;}
.tli{display:flex;gap:28px;align-items:flex-start;padding:20px 0;}.tlic{width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0;position:relative;z-index:1;}
.cc1{background:#1a6b1a;}.cc2{background:#E6A817;}.cc3{background:#22c55e;}.cc4{background:#2563EB;}
.tlb{flex:1;padding-top:10px;}.tlt{font-family:'Libre Baskerville',serif;font-size:1.1rem;font-weight:700;color:var(--g);margin-bottom:7px;}.tld{font-family:'Inter',sans-serif;font-size:.93rem;color:var(--cr);line-height:1.7;opacity:.85;}
.s3bot{text-align:center;max-width:760px;margin:0 auto;padding-top:44px;border-top:1px solid var(--bd);}.s3bot strong{color:var(--g);font-weight:600;}
.dblk+.dblk{margin-top:80px;padding-top:80px;border-top:1px solid var(--bd);}
.dbl{display:flex;flex-direction:column;gap:16px;overflow:hidden;}
.glass-cta-wrap{position:relative;margin-top:72px;}.glass-cta{padding:56px 48px;border-radius:20px;text-align:center;background:rgba(255,255,255,.03);border:1px solid rgba(201,168,76,.25);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);box-shadow:0 8px 48px rgba(0,0,0,.4),inset 0 1px 0 rgba(255,255,255,.07);position:relative;overflow:hidden;}.glass-cta::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at top center,rgba(201,168,76,.1) 0%,transparent 60%);pointer-events:none;}.glass-cta::after{content:'';position:absolute;top:-60px;left:50%;transform:translateX(-50%);width:240px;height:240px;border-radius:50%;background:radial-gradient(circle,rgba(201,168,76,.12) 0%,transparent 70%);pointer-events:none;}.gc-inner{position:relative;z-index:1;}
.cpills{display:flex;flex-wrap:wrap;justify-content:center;gap:14px;margin-bottom:36px;}.cpill{display:flex;align-items:center;gap:9px;padding:11px 22px;border:1px solid rgba(201,168,76,.25);border-radius:50px;background:rgba(255,255,255,.04);backdrop-filter:blur(8px);font-family:'Inter',sans-serif;font-size:.88rem;color:var(--cr);transition:all .3s;white-space:nowrap;}.cpill:hover{border-color:var(--g);background:rgba(201,168,76,.1);transform:translateY(-3px);}.cpill .pc{color:var(--g);}
.ls-sub{font-family:'Libre Baskerville',serif;font-style:italic;font-size:clamp(.9rem,1.2vw,1.05rem);color:var(--cr);margin-bottom:8px;}.ls-tag{font-family:'Inter',sans-serif;font-size:.78rem;color:var(--g);opacity:.8;letter-spacing:.04em;margin-bottom:28px;}
@media(max-width:960px){.fc{padding:72px 5vw;}.fc.hero{padding-top:100px;}.tc{flex-direction:column;gap:36px;}.tc.fl{flex-direction:column-reverse;}.coli{width:100%;}.ibox{max-width:100%;}.tlw{max-width:100%;}.tlw::before{left:23px;}.tlic{width:48px;height:48px;}.slo::before,.slo::after{width:80px;}.glass-cta{padding:44px 28px;}.dblk+.dblk{margin-top:56px;padding-top:56px;}.hg{font-size:clamp(1.5rem,3.5vw,2.2rem);}.hg-lg{font-size:clamp(1.7rem,4vw,2.4rem);}}
@media(max-width:600px){.fc{padding:56px 5vw 64px;}.fc.hero{padding-top:100px !important;}.tc,.tc.fl{flex-direction:column !important;gap:28px;}.coli{width:100%;}.ibox{max-width:100%;aspect-ratio:3/2;}.br{flex-direction:column;}.bg-btn{width:100%;text-align:center;padding:14px 20px;}.slo::before,.slo::after{width:44px;}.tlw::before{left:18px;top:24px;bottom:24px;}.tlic{width:38px;height:38px;font-size:.88rem;}.tli{gap:14px;padding:15px 0;}.tlb{padding-top:4px;}.tlt{font-size:1rem;}.tld{font-size:.87rem;}.cpills{gap:10px;}.cpill{padding:10px 14px;font-size:.8rem;}.glass-cta{padding:32px 18px;}.hg{font-size:clamp(1.3rem,6vw,1.75rem);}.hg-lg{font-size:clamp(1.5rem,6.5vw,2rem);}.hg-sm{font-size:clamp(1.05rem,4.8vw,1.4rem);}.hg-c{font-size:clamp(1.2rem,5.5vw,1.6rem);}.sub{font-size:.9rem;}.sub-p{font-size:.9rem;}.bi{font-size:.88rem;}.gb{margin-bottom:16px;}.dblk+.dblk{margin-top:44px;padding-top:44px;}.icl{width:110px;height:40px;padding:4px 8px;}.ics{width:80px;height:40px;padding:4px 8px;}}
`;

const TRUST_ICONS = [{ src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ws12-1.webp" }, { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ws12-2.webp" }, { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ws12-3.webp" }, { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ws12-4.webp" }, { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ws12-5.webp" }, { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ws12-6.webp" }, { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ws12-7.webp" }];
const TL = [{ c: "cc1", i: "🖱️", t: "Acquire", d: "Integrate Google & FB Leads form to obtain new clients. Answer FAQs quickly via custom auto-replies and help clients with their queries and fast-track the deals." }, { c: "cc2", i: "💼", t: "Convert", d: "Share service and product recommendations based on project requirements. Send payment links for collecting payment on WhatsApp & quick settlements." }, { c: "cc3", i: "😊", t: "Delight", d: "Support clients at scale 24×7 on WhatsApp. Gather ratings/feedback from clients using WhatsApp automated flows." }, { c: "cc4", i: "🔔", t: "Engage", d: "Send newsletters & educational material to engage clients & prospects. Send regular work updates to keep clients apprised of the progress." }];
const INT_R1 = [{ src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-1.png" }, { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-2.webp" }, { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-3.png" }, { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-4.png" }, { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-5.png" }, { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-6.png" }, { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-7.png" }, { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-8.png" }];
const INT_R2 = [{ src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-9.png" }, { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-10.webp" }, { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-11.png" }, { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-12.png" }, { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-13.png" }, { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-14.png" }, { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-15.png" }, { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-16.png" }];

function Img({ src, alt }: { src: string; alt: string }) { return (<div className="ibox"><img src={src} alt={alt} loading="lazy" decoding="async" /></div>); }
function Bullets({ items }: { items: string[] }) { return (<ul className="bl">{items.map((t, i) => (<li className="bi" key={i}><span className="tk">✅</span><span>{t}</span></li>))}</ul>); }
function Track({ items, small = false, reverse = false }: { items: { src: string }[]; small?: boolean; reverse?: boolean }) {
  const d = [...items, ...items];
  return (
    <div className={"s-track" + (reverse ? " rv" : "")}>
      {d.map((item, i) => small
        ? <div className="ics" key={i}><img src={item.src} alt="" loading="lazy" decoding="async" /></div>
        : <div className="icl" key={i}><img src={item.src} alt="" loading="lazy" decoding="async" /></div>
      )}
    </div>
  );
}

function CTA() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>


    </>
  );
}

export default function FreelancerConsultantPage() {
  const [modalOpen, setModalOpen] = useState(false);


  return (<>
    <style>{CSS}</style>
    <GoogleForm isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    {/* section1 */}
    <section className="fc b1 hero" style={{ paddingTop: 160, paddingBottom: 0 }}><div className="inn"><div className="tc"><div className="col"><div className="gb" /><h1 className="hg hg-lg">Increase your Freelancer and Consultant sales with WhatsApp</h1><Bullets items={["Automate FAQs to resolve queries faster", "Send encrypted e-invoices for ongoing projects", "Keep your clients engaged with personalized notifications"]} /><CTA /></div><div className="coli"><Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Freelancer-Consultant/Freelancer-Consultant-Section1.webp" alt="Freelancer Consultant WhatsApp hero" /></div></div></div></section>
    {/* section2 */}
    <section className="fc b3"><div className="inn"><div style={{ textAlign: "center", marginBottom: 52 }}><div className="gb gb-c" /><h2 className="hg hg-c" style={{ marginBottom: 0 }}>Create delightful experiences on WhatsApp</h2></div><div className="tlw">{TL.map((item, i) => (<div className="tli" key={i}><div className={"tlic " + item.c}>{item.i}</div><div className="tlb"><div className="tlt">{item.t}</div><p className="tld">{item.d}</p></div></div>))}</div><div className="s3bot"><div className="gb gb-c" /><h3 className="hg hg-sm hg-c" style={{ marginBottom: 14 }}>How freelancers and consultants are using the WhatsApp Business Platform</h3><p className="sub">See how businesses and freelancers are exploring <strong style={{ color: "var(--g)", fontWeight: 600 }}>WhatsApp Business API</strong> to create personalized and streamlined customer journeys.</p></div></div></section>
    {/* section3 */}
    <section className="fc b1"><div className="inn">
      <div className="dblk" style={{ marginTop: 0, paddingTop: 0, borderTop: "none" }}><div className="tc"><div className="col"><div className="gb" /><h2 className="hg hg-sm">Turn prospects into customers through timely conversations on WhatsApp</h2><Bullets items={["Verify and generate leads on WhatsApp with greeting and introductory messages", "Follow-up with verified service requests to get project details", "Automate FAQs to resolve queries faster", "Use WhatsApp broadcasts to promote new services and offering", "Send project proposals and quotations to fast-track deals", "Take freelance and consultant project fees with WhatsApp checkout links"]} /><CTA /></div><div className="coli"><Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Freelancer-Consultant/Freelancer-Consultant-Section3-img1.webp" alt="Turn prospects into customers" /></div></div></div>
      <div className="dblk"><div className="tc fl"><div className="coli"><Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Freelancer-Consultant/Freelancer-Consultant-Section3-img2.webp" alt="Keep clients updated on projects" /></div><div className="col"><div className="gb" /><h2 className="hg hg-sm">Use WhatsApp to keep clients up-to-date on projects and your progress.</h2><Bullets items={["Send project updates for easy tracking of progress", "Share success stories from other projects to inspire work together", "Collaborate on project collaterals, documents and more over an encrypted channel", "Request referrals in lieu of benefits and wavers on project invoices"]} /><CTA /></div></div></div>
    </div></section>
    {/* section4 */}
    <section className="fc b2"><div className="inn"><div className="tc"><div className="col"><div className="gb" /><h2 className="hg hg-sm">Delight your clients by ensuring a positive customer experience</h2><Bullets items={["Use labels to keep conversations well-categorized", "Set up away messages and availability for transparency", "Request customer feedback and reviews on ongoing / completed projects"]} /><CTA /></div><div className="coli"><Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Freelancer-Consultant/Freelancer-Consultant-Section4.webp" alt="Delight clients with positive experience" /></div></div></div></section>



    <ContactUsForm />
  </>);
}