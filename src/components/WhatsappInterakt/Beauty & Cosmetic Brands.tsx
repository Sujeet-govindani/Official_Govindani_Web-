import { useState, useEffect } from "react";
import GoogleForm from "../ui/GoogleForm";
import ContactUsForm from "@/pages/ContactUsForm";

const CSS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
body{background:#0A0A0A;color:#fff;font-family:'Inter',sans-serif;overflow-x:hidden;}
:root{--g:#C9A84C;--g2:#E0B85A;--cr:#F5F0E8;--b1:#0A0A0A;--b2:#0E0E0E;--b3:#111111;--bd:rgba(201,168,76,.18);--bds:rgba(201,168,76,.07);}
.bc{width:100%;padding:64px 7vw;position:relative;}.bc.b1{background:var(--b1);}.bc.b2{background:var(--b2);}.bc.b3{background:var(--b3);}.bc+.bc{border-top:1px solid var(--bd);}
.inn{max-width:1200px;margin:0 auto;}
.tc{display:flex;align-items:center;gap:64px;}.tc .col{flex:1;min-width:0;}.tc .coli{flex:1;display:flex;justify-content:center;align-items:center;}
.ibox{width:100%;max-width:510px;aspect-ratio:4/3;border-radius:16px;border:none;background:transparent;overflow:hidden;}.ibox img{width:100%;height:100%;object-fit:contain;border-radius:16px;display:block;}
.hg{font-family:'Libre Baskerville',serif;font-size:clamp(1.7rem,2.5vw,2.5rem);font-weight:700;color:var(--g);line-height:1.27;letter-spacing:-.01em;margin-bottom:24px;}
.hg-sm{font-size:clamp(1.25rem,1.75vw,1.8rem);}.hg-lg{font-size:clamp(1.9rem,3vw,2.9rem);}.hg-c{text-align:center;}
.sub{font-family:'Inter',sans-serif;font-size:clamp(.88rem,1.05vw,1rem);color:var(--cr);line-height:1.73;opacity:.88;}
.gb{width:48px;height:3px;background:var(--g);border-radius:2px;margin-bottom:20px;}.gb-c{margin:0 auto 20px;}
.bl{list-style:none;display:flex;flex-direction:column;gap:12px;margin-bottom:28px;}
.bi{display:flex;align-items:flex-start;gap:11px;font-family:'Inter',sans-serif;font-size:clamp(.86rem,1vw,.98rem);color:var(--cr);line-height:1.68;}.bi .tk{flex-shrink:0;margin-top:2px;}
.br{display:flex;flex-wrap:wrap;gap:14px;}
.bg-btn{background:var(--g);color:#0A0A0A;font-family:'Inter',sans-serif;font-weight:700;font-size:.9rem;padding:13px 30px;border:none;border-radius:6px;cursor:pointer;letter-spacing:.03em;transition:all .25s;white-space:nowrap;}
.bg-btn:hover{background:var(--g2);transform:translateY(-2px);box-shadow:0 8px 24px rgba(201,168,76,.32);}
.slo{position:relative;overflow:hidden;padding:10px 0;}.slo::before,.slo::after{content:'';position:absolute;top:0;bottom:0;width:160px;z-index:2;pointer-events:none;}
.slo.fb1::before{left:0;background:linear-gradient(to right,#0A0A0A 25%,transparent);}.slo.fb1::after{right:0;background:linear-gradient(to left,#0A0A0A 25%,transparent);}
.slo.fb2::before{left:0;background:linear-gradient(to right,#0E0E0E 25%,transparent);}.slo.fb2::after{right:0;background:linear-gradient(to left,#0E0E0E 25%,transparent);}
.slo.fb3::before{left:0;background:linear-gradient(to right,#111111 25%,transparent);}.slo.fb3::after{right:0;background:linear-gradient(to left,#111111 25%,transparent);}
.s-track{display:flex;gap:22px;width:max-content;animation:mq 22s linear infinite;}.s-track.rv{animation-direction:reverse;animation-duration:18s;}.s-track:hover{animation-play-state:paused;}
@keyframes mq{from{transform:translateX(0);}to{transform:translateX(-50%);}}
.icl{width:140px;height:50px;border-radius:12px;border:1px solid var(--bd);background:transparent;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden;padding:0;transition:border-color .3s,transform .3s;}.icl:hover{border-color:var(--g);transform:translateY(-4px);}.icl img{width:100%;height:100%;object-fit:contain;display:block;}.icl span{display:none;}
.ics{width:140px;height:50px;border-radius:10px;border:1px solid var(--bd);background:transparent;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden;padding:0;transition:border-color .3s;}.ics:hover{border-color:var(--g);}.ics img{width:100%;height:100%;object-fit:contain;display:block;}.ics span{display:none;}
.tlw{position:relative;display:flex;flex-direction:column;max-width:780px;margin:0 auto 56px;}.tlw::before{content:'';position:absolute;left:27px;top:28px;bottom:28px;width:2px;background:linear-gradient(to bottom,#1a6b1a 0%,#E6A817 33%,#22c55e 66%,#2563EB 100%);border-radius:2px;}
.tli{display:flex;gap:28px;align-items:flex-start;padding:20px 0;}.tlic{width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0;position:relative;z-index:1;}
.cc1{background:#1a6b1a;}.cc2{background:#E6A817;}.cc3{background:#22c55e;}.cc4{background:#2563EB;}
.tlb{flex:1;padding-top:10px;}.tlt{font-family:'Libre Baskerville',serif;font-size:1.1rem;font-weight:700;color:var(--g);margin-bottom:7px;}.tld{font-family:'Inter',sans-serif;font-size:.93rem;color:var(--cr);line-height:1.7;opacity:.85;}
.s3bot{text-align:center;max-width:760px;margin:0 auto;padding-top:48px;border-top:1px solid var(--bd);}.s3bot strong{color:var(--g);font-weight:600;}
.dblk+.dblk{margin-top:80px;padding-top:80px;border-top:1px solid var(--bd);}
.glass-row{display:flex;gap:20px;flex-wrap:wrap;margin-top:36px;}
.glass-card{flex:1;min-width:140px;padding:28px 22px;border-radius:18px;text-align:center;background:rgba(255,255,255,.04);border:1px solid rgba(201,168,76,.25);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);box-shadow:0 4px 32px rgba(0,0,0,.35),inset 0 1px 0 rgba(255,255,255,.06);transition:border-color .3s,transform .3s;position:relative;overflow:hidden;}
.glass-card::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at top left,rgba(201,168,76,.1) 0%,transparent 65%);pointer-events:none;}.glass-card:hover{border-color:var(--g);transform:translateY(-6px);}
.gc-num{font-family:'Libre Baskerville',serif;font-size:clamp(1.8rem,3vw,2.6rem);font-weight:700;color:var(--g);margin-bottom:10px;line-height:1;}.gc-lbl{font-family:'Inter',sans-serif;font-size:.82rem;color:var(--cr);line-height:1.5;opacity:.82;}
.dbl{display:flex;flex-direction:column;gap:16px;overflow:hidden;}
.glass-cta-wrap{position:relative;margin-top:72px;}.glass-cta{padding:56px 48px;border-radius:20px;text-align:center;background:rgba(255,255,255,.03);border:1px solid rgba(201,168,76,.25);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);box-shadow:0 8px 48px rgba(0,0,0,.4),inset 0 1px 0 rgba(255,255,255,.07);position:relative;overflow:hidden;}
.glass-cta::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at top center,rgba(201,168,76,.1) 0%,transparent 60%);pointer-events:none;}.glass-cta::after{content:'';position:absolute;top:-60px;left:50%;transform:translateX(-50%);width:240px;height:240px;border-radius:50%;background:radial-gradient(circle,rgba(201,168,76,.12) 0%,transparent 70%);pointer-events:none;}
.gc-inner{position:relative;z-index:1;}
.cpills{display:flex;flex-wrap:wrap;justify-content:center;gap:14px;margin-bottom:36px;}.cpill{display:flex;align-items:center;gap:9px;padding:11px 22px;border:1px solid rgba(201,168,76,.25);border-radius:50px;background:rgba(255,255,255,.04);backdrop-filter:blur(8px);font-family:'Inter',sans-serif;font-size:.88rem;color:var(--cr);transition:all .3s;white-space:nowrap;}.cpill:hover{border-color:var(--g);background:rgba(201,168,76,.1);transform:translateY(-3px);}.cpill .pc{color:var(--g);}
.ls-sub{font-family:'Libre Baskerville',serif;font-style:italic;font-size:clamp(.9rem,1.2vw,1.05rem);color:var(--cr);margin-bottom:8px;}.ls-tag{font-family:'Inter',sans-serif;font-size:.78rem;color:var(--g);opacity:.8;letter-spacing:.04em;margin-bottom:28px;}
.q-block{border-left:3px solid var(--g);padding-left:22px;margin-bottom:36px;}.q-text{font-family:'Libre Baskerville',serif;font-style:italic;font-size:clamp(.95rem,1.25vw,1.1rem);color:var(--cr);line-height:1.72;margin-bottom:12px;}.q-attr{font-family:'Inter',sans-serif;font-size:.82rem;color:var(--g);font-weight:600;}
@media(min-width:961px){.bc.hero{padding-top:160px;padding-bottom:0;}.bc:not(.hero){padding-top:48px;padding-bottom:48px;}}
@media(max-width:960px){.bc{padding:72px 5vw;}.bc.hero{padding-top:100px;}.tc{flex-direction:column;gap:36px;}.tc.fl{flex-direction:column-reverse;}.coli{width:100%;}.ibox{max-width:100%;}.tlw{max-width:100%;}.tlw::before{left:23px;}.tlic{width:48px;height:48px;}.slo::before,.slo::after{width:80px;}.glass-row{gap:14px;}.glass-cta{padding:44px 28px;}.dblk+.dblk{margin-top:56px;padding-top:56px;}.hg{font-size:clamp(1.5rem,3.5vw,2.2rem);}.hg-lg{font-size:clamp(1.7rem,4vw,2.4rem);}}
@media(max-width:600px){.bc{padding:56px 5vw 64px;}.bc.hero{padding-top:0px !important;}.tc,.tc.fl{flex-direction:column !important;gap:28px;}.coli{width:100%;}.ibox{max-width:100%;aspect-ratio:3/2;}.br{flex-direction:column;}.bg-btn{width:100%;text-align:center;padding:14px 20px;}.slo::before,.slo::after{width:44px;}.tlw::before{left:18px;top:24px;bottom:24px;}.tlic{width:38px;height:38px;font-size:.88rem;}.tli{gap:14px;padding:15px 0;}.tlb{padding-top:4px;}.tlt{font-size:1rem;}.tld{font-size:.87rem;}.glass-row{flex-direction:column;gap:12px;}.glass-card{padding:22px 18px;}.gc-num{font-size:2rem;}.cpills{gap:10px;}.cpill{padding:10px 14px;font-size:.8rem;}.glass-cta{padding:32px 18px;}.hg{font-size:clamp(1.3rem,6vw,1.75rem);}.hg-lg{font-size:clamp(1.5rem,6.5vw,2rem);}.hg-sm{font-size:clamp(1.1rem,5vw,1.45rem);}.hg-c{font-size:clamp(1.2rem,5.5vw,1.6rem);}.sub{font-size:.9rem;}.bi{font-size:.88rem;}.gb{margin-bottom:16px;}.dblk+.dblk{margin-top:44px;padding-top:44px;}.q-block{padding-left:14px;}.q-text{font-size:.92rem;}}
`;


const TL = [{ c: "cc1", i: "🖱️", t: "Acquire", d: "Integrate your website with WhatsApp Business Platform & streamline business operations. Answer FAQs via custom auto-replies and help customers in making the right purchase decisions." }, { c: "cc2", i: "💼", t: "Convert", d: "Upsell & Cross-sell with personalized beauty & cosmetics recommendations on WhatsApp. Send payment links for quick settlements." }, { c: "cc3", i: "😊", t: "Delight", d: "Solve customer queries & support them at scale on WhatsApp. Gather ratings/feedback from clients using WhatsApp automated flows." }, { c: "cc4", i: "🔔", t: "Engage", d: "Send new launch & festive sale offers to drive sales. Send regular tips on how to use beauty & cosmetics products for the ones they bought." }];
const STATS = [{ num: "₹3.5L", lbl: "Revenue from WhatsApp campaigns in 3 months" }, { num: "15X", lbl: "Returns on campaign spends (ROAS)" }, { num: "₹1.3L", lbl: "Revenue from WhatsApp Catalog" }];
const INT_R1 = [{ src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-1.png" }, { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-2.webp" }, { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-3.png" }, { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-4.png" }, { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-5.png" }, { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-6.png" }, { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-7.png" }, { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-8.png" }];
const INT_R2 = [{ src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-9.png" }, { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-10.webp" }, { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-11.png" }, { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-12.png" }, { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-13.png" }, { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-14.png" }, { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-15.png" }, { src: "https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-16.png" }];

function Img({ src, alt }: { src: string; alt: string }) { return (<div className="ibox"><img src={src} alt={alt} loading="lazy" decoding="async" /></div>); }
function Bullets({ items }: { items: string[] }) { return (<ul className="bl">{items.map((t, i) => (<li className="bi" key={i}><span className="tk">✅</span><span>{t}</span></li>))}</ul>); }
function Track({ items, small = false, reverse = false }: { items: { src: string }[]; small?: boolean; reverse?: boolean }) { const d = [...items, ...items]; return (<div className={"s-track" + (reverse ? " rv" : "")}>{d.map((item, i) => small ? <div className="ics" key={i}><img src={item.src} alt="" loading="lazy" decoding="async" /></div> : <div className="icl" key={i}><img src={item.src} alt="" loading="lazy" decoding="async" /></div>)}</div>); }

export default function BeautyCosmeticsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 767);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const CTA = () => <div className="br"></div>;

  return (<>
    <style>{CSS}</style>
    <GoogleForm isOpen={modalOpen} onClose={() => setModalOpen(false)} />

    <section className="bc b1 hero" style={{ paddingTop: isMobile ? 0 : 160, paddingBottom: 0 }}>
      <div className="inn" style={{ marginTop: isMobile ? "60px" : 24 }}><div className="tc"><div className="col"><h1 className="hg hg-lg">Unlock the potential of WhatsApp Business for your Beauty &amp; Cosmetics brand</h1><Bullets items={["Showcase your products with WhatsApp storefront", "Send discount & offers to 1000s of customers", "Stay connected 24×7 with WhatsApp automation"]} /><CTA /></div><div className="coli"><Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Beauty-Cosmetics/Beauty-Cosmetic-section1.webp" alt="Beauty Cosmetics hero" /></div></div></div>
    </section>



    <section className="bc b3">
      <div className="inn"><div style={{ textAlign: "center", marginBottom: 52 }}><div className="gb gb-c" /><h2 className="hg hg-c" style={{ marginBottom: 0 }}>Create delightful experiences on WhatsApp</h2></div>
        <div className="tlw">{TL.map((item, i) => (<div className="tli" key={i}><div className={"tlic " + item.c}>{item.i}</div><div className="tlb"><div className="tlt">{item.t}</div><p className="tld">{item.d}</p></div></div>))}</div>
        <div className="s3bot"><h3 className="hg hg-sm hg-c" style={{ marginBottom: 14 }}>How to use WhatsApp Business API to grow your business</h3><p className="sub">The beauty and cosmetics industry is growing at a rapid annual compounded growth rate of 4.75% worldwide, with more brands joining the league to meet consumer demand. See how leading brands use <strong style={{ color: "var(--g)", fontWeight: 600 }}>WhatsApp Business API</strong> to grow online shoppers in the rising competition.</p></div></div>
    </section>

    <section className="bc b1">
      <div className="inn">
        <div className="dblk"><div className="tc"><div className="col"><div className="gb" /><h2 className="hg hg-sm">Acquire new customers for your Beauty &amp; Cosmetic brand</h2><Bullets items={["Run click to WhatsApp ads to capture consumer information and intent", "Use a website WhatsApp widget to initiate conversations", "Use QR codes in print ads and packaging to get opt-ins", "Share WhatsApp links on social media"]} /><CTA /></div><div className="coli"><Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Beauty-Cosmetics/Beauty-Cosmetic-Section3-img1.webp" alt="Acquire customers" /></div></div></div>
        <div className="dblk"><div className="tc fl"><div className="coli"><Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Beauty-Cosmetics/Beauty-Cosmetic-Section3-img2.webp" alt="Dont let shoppers slip" /></div><div className="col"><div className="gb" /><h2 className="hg hg-sm">Don't let high-intent online shoppers slip away</h2><Bullets items={["Create an automated welcome series to understand consumers better", "Share best-selling products and collections through WhatsApp catalog messages", "Create checkout links and take payments for orders on WhatsApp", "Automate abandoned cart recovery messages to bring back lost shoppers"]} /><CTA /></div></div></div>
        <div className="dblk"><div className="tc"><div className="col"><div className="gb" /><h2 className="hg hg-sm">Keep your shoppers engaged to drive conversions</h2><Bullets items={["Set up WhatsApp broadcasts to share product launches, new collections and offers", "Promote customer testimonials and user generated content", "Run contests and quizzes using interactive messages"]} /><CTA /></div><div className="coli"><Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Beauty-Cosmetics/Beauty-Cosmetic-Section3-img3.webp" alt="Keep shoppers engaged" /></div></div></div>
        <div className="dblk"><div className="tc fl"><div className="coli"><Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Beauty-Cosmetics/Beauty-Cosmetic-Section4-img1.webp" alt="Personalized lifecycle" /></div><div className="col"><div className="gb" /><h2 className="hg hg-sm">Offer personalized shopping experience across customer lifecycle to boost retention and loyalty</h2><Bullets items={["Offer proactive customer support and assistance before, during and after purchase", "Set up automated transactional and order status alerts", "Reduce NDRs and RTOs with automated delivery and shipping notifications", "Request product reviews, ratings and customer feedback on WhatsApp", "Share product how-to videos, lookbooks, makeup inspiration and more"]} /><CTA /></div></div></div>
      </div>
    </section>

    <section className="bc b2">
      <div className="inn"><div className="tc"><div className="col"><div className="gb" /><div className="q-block"><p className="q-text">"Isak is a fragrance house dedicated to the creation of unrivalled niche Indian artisanal fragrances of rare notes and blends that manufactures and extracts many of their own essences using traditional infusion &amp; distillation techniques."</p><p className="q-attr">  Isak Fragrances</p></div><div className="glass-row">{STATS.map((s, i) => (<div className="glass-card" key={i}><div className="gc-num">{s.num}</div><div className="gc-lbl">{s.lbl}</div></div>))}</div></div><div className="coli"><Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Beauty-Cosmetics/Beauty-Cosmetic-Section5.webp" alt="Isak Fragrances success" /></div></div></div>
    </section>
    <ContactUsForm />
  </>);
}
