import { useState, useEffect } from "react";
import GoogleForm from "../ui/GoogleForm";
import ContactUsForm from "@/pages/ContactUsForm";
/* ═══════════════════════════════════════════════════════════════
   SpasSalonsPage.jsx   full page, all sections
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

/* ── all sections reduced padding ── */
.sp{width:100%;padding:52px 7vw 28px;position:relative;}
.sp.b1{background:var(--b1);}
.sp.b2{background:var(--b2);}
.sp.b3{background:var(--b3);}
.sp+.sp{border-top:1px solid var(--bd);}

/* ── hero large top padding desktop only, small bottom ── */
.sp.hero{padding-top:160px;padding-bottom:20px;}

.inn{max-width:1200px;margin:0 auto;}

/* ── two-col ── */
.tc{display:flex;align-items:center;gap:60px;}
.tc .col{flex:1;min-width:0;}
.tc .coli{flex:1;display:flex;justify-content:center;align-items:center;}

/* ── image box fully invisible, image shows directly ── */
.ibox{
  width:100%;max-width:500px;aspect-ratio:4/3;
  border-radius:0;border:none;background:transparent;overflow:hidden;
}
.ibox img{width:100%;height:100%;object-fit:contain;border-radius:0;display:block;}

/* ── typography ── */
.hg{
  font-family:'Libre Baskerville',serif;
  font-size:clamp(1.7rem,2.5vw,2.5rem);
  font-weight:700;color:var(--g);
  line-height:1.28;letter-spacing:-.01em;margin-bottom:24px;
}
.hg-sm{font-size:clamp(1.25rem,1.75vw,1.8rem);}
.hg-lg{font-size:clamp(1.9rem,3vw,2.9rem);}
.hg-c{text-align:center;}

.sub{
  font-family:'Inter',sans-serif;
  font-size:clamp(.88rem,1.05vw,1rem);
  color:var(--cr);line-height:1.72;opacity:.88;
}

/* gold bar */
.gb{width:48px;height:3px;background:var(--g);border-radius:2px;margin-bottom:20px;}
.gb-c{margin:0 auto 20px;}

/* ── bullets ── */
.bl{list-style:none;display:flex;flex-direction:column;gap:12px;margin-bottom:28px;}
.bi{
  display:flex;align-items:flex-start;gap:11px;
  font-family:'Inter',sans-serif;
  font-size:clamp(.86rem,1vw,.98rem);
  color:var(--cr);line-height:1.68;
}
.bi .tk{flex-shrink:0;margin-top:2px;}

/* ── buttons ── */
.br{display:flex;flex-wrap:wrap;gap:14px;}
.bg{
  background:var(--g);color:#0A0A0A;
  font-family:'Inter',sans-serif;font-weight:700;
  font-size:.9rem;padding:13px 30px;
  border:none;border-radius:6px;cursor:pointer;
  letter-spacing:.03em;transition:all .25s;white-space:nowrap;
}
.bg:hover{background:var(--g2);transform:translateY(-2px);box-shadow:0 8px 24px rgba(201,168,76,.32);}
.bo{
  background:transparent;color:var(--g);
  font-family:'Inter',sans-serif;font-weight:700;
  font-size:.9rem;padding:12px 30px;
  border:1.5px solid var(--g);border-radius:6px;cursor:pointer;
  letter-spacing:.03em;transition:all .25s;white-space:nowrap;
}
.bo:hover{background:rgba(201,168,76,.08);transform:translateY(-2px);}

/* ══════════════════════════════════════════
   SLIDER
══════════════════════════════════════════ */
.slo{position:relative;overflow:hidden;padding:10px 0;}
.slo::before,.slo::after{
  content:'';position:absolute;top:0;bottom:0;
  width:160px;z-index:2;pointer-events:none;
}
.slo.fb1::before{left:0;background:linear-gradient(to right,#0A0A0A 25%,transparent);}
.slo.fb1::after {right:0;background:linear-gradient(to left ,#0A0A0A 25%,transparent);}
.slo.fb2::before{left:0;background:linear-gradient(to right,#0E0E0E 25%,transparent);}
.slo.fb2::after {right:0;background:linear-gradient(to left ,#0E0E0E 25%,transparent);}
.slo.fb3::before{left:0;background:linear-gradient(to right,#111111 25%,transparent);}
.slo.fb3::after {right:0;background:linear-gradient(to left ,#111111 25%,transparent);}

.st{display:flex;gap:22px;width:max-content;animation:mq 22s linear infinite;}
.st.rv{animation-direction:reverse;animation-duration:18s;}
.st:hover{animation-play-state:paused;}
@keyframes mq{from{transform:translateX(0);}to{transform:translateX(-50%);}}

/* ── both slider cards 140×50, image fills container ── */
.icl,
.ics{
  width:140px;
  height:50px;
  border-radius:8px;
  border:1px solid var(--bd);
  background:var(--bds);
  display:flex;
  align-items:center;
  justify-content:center;
  flex-shrink:0;
  overflow:hidden;
  padding:0;
  transition:border-color .3s,transform .3s;
}
.icl:hover,
.ics:hover{border-color:var(--g);transform:translateY(-3px);}
.icl img,
.ics img{width:100%;height:100%;object-fit:contain;display:block;}
.icl span,
.ics span{display:none;}

/* ══════════════════════════════════════════
   S3 TIMELINE
══════════════════════════════════════════ */
.tlw{
  position:relative;display:flex;flex-direction:column;
  max-width:780px;margin:0 auto 48px;
}
.tlw::before{
  content:'';position:absolute;left:27px;top:28px;bottom:28px;width:2px;
  background:linear-gradient(to bottom,#1a6b1a 0%,#E6A817 35%,#22c55e 65%,#2563EB 100%);
  border-radius:2px;
}
.tli{display:flex;gap:28px;align-items:flex-start;padding:20px 0;}
.tlic{
  width:56px;height:56px;border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  font-size:1.2rem;flex-shrink:0;position:relative;z-index:1;
}
.cc1{background:#1a6b1a;} .cc2{background:#E6A817;}
.cc3{background:#22c55e;} .cc4{background:#2563EB;}
.tlb{flex:1;padding-top:10px;}
.tlt{font-family:'Libre Baskerville',serif;font-size:1.1rem;font-weight:700;color:var(--g);margin-bottom:7px;}
.tld{font-family:'Inter',sans-serif;font-size:.93rem;color:var(--cr);line-height:1.7;opacity:.85;}

.s3bot{
  text-align:center;max-width:740px;margin:0 auto;
  padding-top:36px;border-top:1px solid var(--bd);
}
.s3bot strong{color:var(--g);font-weight:600;}

/* ══════════════════════════════════════════
   DUAL-BLOCK
══════════════════════════════════════════ */
.dblk+.dblk{margin-top:52px;padding-top:52px;border-top:1px solid var(--bd);}

/* ══════════════════════════════════════════
   WHY STATS 3 cards
══════════════════════════════════════════ */
.why-wrap{
  display:grid;grid-template-columns:repeat(3,1fr);
  gap:24px;margin-top:40px;
}
.why-card{
  padding:36px 28px;border-radius:18px;
  border:1px solid var(--bd);background:var(--bds);
  position:relative;overflow:hidden;
  transition:border-color .35s,transform .35s;
  text-align:center;
}
.why-card::before{
  content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse at top left,rgba(201,168,76,.1) 0%,transparent 65%);
  pointer-events:none;
}
.why-card:hover{border-color:var(--g);transform:translateY(-6px);}
.why-card:hover .wc-num{color:var(--g2);}
.wc-num{
  font-family:'Libre Baskerville',serif;
  font-size:clamp(2rem,3.5vw,3rem);
  font-weight:700;color:var(--g);margin-bottom:10px;line-height:1;
}
.wc-lbl{
  font-family:'Inter',sans-serif;
  font-size:.88rem;color:var(--cr);line-height:1.55;opacity:.85;
}

/* ══════════════════════════════════════════
   DOUBLE SLIDER
══════════════════════════════════════════ */
.dbl{display:flex;flex-direction:column;gap:16px;overflow:hidden;}

/* ══════════════════════════════════════════
   TORN PAPER CARD
══════════════════════════════════════════ */
.torn-wrap{position:relative;margin-top:56px;}
.torn-card{
  background:rgba(201,168,76,.07);
  border:1px solid var(--bd);border-radius:4px;
  padding:48px 48px;position:relative;overflow:hidden;
}
.torn-card::before{
  content:'';position:absolute;top:-1px;left:0;right:0;height:20px;
  background:var(--b3);
  clip-path:polygon(
    0% 0%,1.5% 100%,3% 15%,4.5% 90%,6% 5%,7.5% 95%,9% 10%,10.5% 88%,
    12% 3%,13.5% 92%,15% 18%,16.5% 85%,18% 8%,19.5% 94%,21% 12%,22.5% 80%,
    24% 5%,25.5% 96%,27% 20%,28.5% 82%,30% 6%,31.5% 91%,33% 16%,34.5% 86%,
    36% 3%,37.5% 94%,39% 22%,40.5% 78%,42% 8%,43.5% 93%,45% 14%,46.5% 88%,
    48% 4%,49.5% 97%,51% 18%,52.5% 83%,54% 5%,55.5% 91%,57% 20%,58.5% 80%,
    60% 6%,61.5% 95%,63% 12%,64.5% 86%,66% 3%,67.5% 93%,69% 22%,70.5% 78%,
    72% 8%,73.5% 96%,75% 15%,76.5% 84%,78% 4%,79.5% 92%,81% 18%,82.5% 82%,
    84% 6%,85.5% 94%,87% 14%,88.5% 88%,90% 3%,91.5% 95%,93% 20%,94.5% 80%,
    96% 8%,97.5% 92%,100% 0%
  );
}
.torn-card::after{
  content:'';position:absolute;bottom:-1px;left:0;right:0;height:20px;
  background:var(--b3);
  clip-path:polygon(
    0% 100%,1.5% 0%,3% 85%,4.5% 10%,6% 95%,7.5% 5%,9% 90%,10.5% 12%,
    12% 97%,13.5% 8%,15% 82%,16.5% 15%,18% 92%,19.5% 6%,21% 88%,22.5% 20%,
    24% 95%,25.5% 4%,27% 80%,28.5% 18%,30% 94%,31.5% 9%,33% 84%,34.5% 14%,
    36% 97%,37.5% 6%,39% 78%,40.5% 22%,42% 92%,43.5% 7%,45% 86%,46.5% 12%,
    48% 96%,49.5% 3%,51% 82%,52.5% 17%,54% 95%,55.5% 9%,57% 80%,58.5% 20%,
    60% 94%,61.5% 5%,63% 88%,64.5% 14%,66% 97%,67.5% 7%,69% 78%,70.5% 22%,
    72% 92%,73.5% 4%,75% 85%,76.5% 16%,78% 96%,79.5% 8%,81% 82%,82.5% 18%,
    84% 94%,85.5% 6%,87% 86%,88.5% 12%,90% 97%,91.5% 5%,93% 80%,94.5% 20%,
    96% 92%,97.5% 8%,100% 100%
  );
}
.torn-inner{text-align:center;}
.tpills{display:flex;flex-wrap:wrap;justify-content:center;gap:14px;margin-bottom:36px;}
.tpill{
  display:flex;align-items:center;gap:9px;
  padding:11px 22px;border:1px solid var(--bd);
  border-radius:50px;background:rgba(201,168,76,.05);
  font-family:'Inter',sans-serif;font-size:.88rem;color:var(--cr);
  transition:all .3s;white-space:nowrap;
}
.tpill:hover{border-color:var(--g);background:rgba(201,168,76,.1);transform:translateY(-3px);}
.tpill .pc{color:var(--g);}

.ls-sub{
  font-family:'Libre Baskerville',serif;font-style:italic;
  font-size:clamp(.9rem,1.2vw,1.05rem);color:var(--cr);margin-bottom:8px;
}
.ls-tag{
  font-family:'Inter',sans-serif;font-size:.78rem;
  color:var(--g);opacity:.8;letter-spacing:.04em;margin-bottom:28px;
}

/* ══════════════════════════════════════════
   RESPONSIVE
══════════════════════════════════════════ */
@media(max-width:960px){
  .sp{padding:44px 5vw 24px;}
  /* hero: lock top at 108px on tablet, keep bottom small */
  .sp.hero{padding-top:108px;padding-bottom:70px;}
  .tc{flex-direction:column;gap:36px;}
  .tc.fl{flex-direction:column-reverse;}
  .coli{width:100%;}
  .ibox{max-width:100%;}
  .tlw{max-width:100%;}
  .tlw::before{left:23px;}
  .tlic{width:48px;height:48px;}
  .slo::before,.slo::after{width:80px;}
  .why-wrap{grid-template-columns:1fr 1fr;gap:18px;}
  .torn-card{padding:44px 28px;}
  .dblk+.dblk{margin-top:44px;padding-top:44px;}
}

/* ── mobile completely untouched from original ── */
@media(max-width:600px){
  .sp{padding:56px 5vw 64px;}
  .sp.hero{padding-top:0px !important;}
  .tc,.tc.fl{flex-direction:column !important;gap:28px;}
  .coli{width:100%;}
  .ibox{max-width:100%;aspect-ratio:3/2;}
  .br{flex-direction:column;}
  .bg,.bo{width:100%;text-align:center;padding:14px 20px;}
  .slo::before,.slo::after{width:44px;}
  .tlw::before{left:18px;top:24px;bottom:24px;}
  .tlic{width:38px;height:38px;font-size:.88rem;}
  .tli{gap:14px;padding:15px 0;}
  .tlb{padding-top:4px;}
  .tlt{font-size:1rem;}
  .tld{font-size:.87rem;}
  .why-wrap{grid-template-columns:1fr;gap:14px;}
  .why-card{padding:26px 20px;}
  .wc-num{font-size:2rem;}
  .tpills{gap:10px;}
  .tpill{padding:10px 14px;font-size:.8rem;}
  .torn-card{padding:32px 18px;}
  .torn-card::before,.torn-card::after{height:14px;}
  .hg{font-size:clamp(1.3rem,6vw,1.75rem);}
  .hg-lg{font-size:clamp(1.5rem,6.5vw,2rem);}
  .hg-sm{font-size:clamp(1.1rem,5vw,1.45rem);}
  .hg-c{font-size:clamp(1.2rem,5.5vw,1.6rem);}
  .sub{font-size:.9rem;}
  .bi{font-size:.88rem;}
  .gb{margin-bottom:16px;}
  .dblk+.dblk{margin-top:44px;padding-top:44px;}
}
`;

/* ── DATA ────────────────────────────────────────────────── */


const TL = [
  {
    c: "cc1", i: "🖱️", t: "Acquire",
    d: "Add WhatsApp widget on website/place WA link on social handles to generate leads. Answer FAQs via custom auto-replies to help customers pick & choose the right spa and salon services."
  },
  {
    c: "cc2", i: "💼", t: "Convert",
    d: "Upsell & Cross-sell with personalized recommendations like haircut, facials and more. Retarget leads acquired via click to WhatsApp ads to boost conversions & Send payment links for quick settlements."
  },
  {
    c: "cc3", i: "😊", t: "Delight",
    d: "Support clients at scale on WhatsApp. Gather ratings/feedback from clients using WhatsApp automated flows."
  },
  {
    c: "cc4", i: "🔔", t: "Engage",
    d: "Send festive offers, new launch & sales updates to drive sales. Send regular how-to videos and articles, for taking care post different treatments at the Spa/Saloon."
  },
];



const WHY_STATS = [
  { num: "98%", lbl: "Average open rate on campaigns" },
  { num: "47%", lbl: "Click-through rate on WhatsApp broadcasts" },
  { num: "17%", lbl: "Higher conversion rate as compared to email, SMS and social media" },
];

/* ── HELPERS ─────────────────────────────────────────────── */
function Img({ src, alt }) {
  return (
    <div className="ibox">
      <img src={src} alt={alt} loading="lazy" decoding="async" />
    </div>
  );
}
function Bullets({ items }) {
  return (
    <ul className="bl">
      {items.map((t, i) => (
        <li className="bi" key={i}><span className="tk">✅</span><span>{t}</span></li>
      ))}
    </ul>
  );
}
function Track({ items, small = false, reverse = false }) {
  const d = [...items, ...items];
  return (
    <div className={`st${reverse ? " rv" : ""}`}>
      {d.map((item, i) =>
        small
          ? <div className="ics" key={i}><img src={item.src} alt={item.label} loading="lazy" decoding="async" /><span>{item.label}</span></div>
          : <div className="icl" key={i}><img src={item.src} alt={item.label} loading="lazy" decoding="async" /><span>{item.label}</span></div>
      )}
    </div>
  );
}

/* ── PAGE ────────────────────────────────────────────────── */
export default function SpasSalonsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 767);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <>
      <style>{CSS}</style>
      <GoogleForm isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      {/* S1 HERO */}
      <section className="sp b1 hero">
        <div className="inn" style={{ marginTop: isMobile ? "60px" : 0 }}>
          <div className="tc">
            <div className="col">

              <h1 className="hg hg-lg">
                Get more appointments for your Spas and Salons using WhatsApp
              </h1>
              <Bullets items={[
                "Send discount & offers to 1000s of customers",
                "Stay connected 24×7 with WhatsApp automation",
                "Showcase your services with WhatsApp storefront",
              ]} />

            </div>
            <div className="coli">
              <Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Spas-Salons/Spas-Salons-section1.webp" alt="Spa & Salon WhatsApp hero" />
            </div>
          </div>
        </div>
      </section>
      {/* S2 TIMELINE + BOTTOM TEXT */}
      <section className="sp b3">
        <div className="inn">
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div className="gb gb-c" />
            <h2 className="hg hg-c" style={{ marginBottom: 0 }}>
              Create delightful Spa experiences on WhatsApp
            </h2>
          </div>

          <div className="tlw">
            {TL.map((item, i) => (
              <div className="tli" key={i}>
                <div className={`tlic ${item.c}`}>{item.i}</div>
                <div className="tlb">
                  <div className="tlt">{item.t}</div>
                  <p className="tld">{item.d}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="s3bot">
            <h3 className="hg hg-sm hg-c" style={{ marginBottom: 14 }}>
              How to use WhatsApp Business Platform to grow your Spa &amp; Saloon business
            </h3>
            <p className="sub">
              The{" "}
              <strong style={{ color: "var(--g)", fontWeight: 600 }}>WhatsApp Business API</strong>{" "}
              equips you with powerful features that enable automation for marketing, customer support and service, and sales, so you can increase foot traffic in no time and grow your business.
            </p>
          </div>
        </div>
      </section>

      {/* S3 REACH MORE CUSTOMERS */}
      <section className="sp b1">
        <div className="inn">
          <div className="tc">
            <div className="col">
              <div className="gb" />
              <h2 className="hg hg-sm">
                Reach more customers for your spa and salon services
              </h2>
              <Bullets items={[
                "Run click to WhatsApp ads to capture consumer intent",
                "Verify consumer interest and generate more leads",
                "Take appointment & payments on WhatsApp for confirmed walk-ins",
              ]} />

            </div>
            <div className="coli">
              <Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Spas-Salons/Spas-Salons-section3.webp" alt="Reach more customers" />
            </div>
          </div>
        </div>
      </section>

      {/* S4 REDUCE DROP-OFFS */}
      <section className="sp b2">
        <div className="inn">
          <div className="tc fl">
            <div className="coli">
              <Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Spas-Salons/Spas-Salons-section4.webp" alt="Reduce appointment drop-offs" />
            </div>
            <div className="col">
              <div className="gb" />
              <h2 className="hg hg-sm">
                Keep your customers engaged to reduce appointment drop-offs
              </h2>
              <Bullets items={[
                "Automate appointment reminders on WhatsApp",
                "Use WhatsApp broadcasts to promote events, limited time offers and discounts",
                "Notify customers of important updates like store closure, availability and more",
                "Offer easy rescheduling and cancellation of appointments",
              ]} />
            </div>
          </div>
        </div>
      </section>

      {/* S5 POST-APPOINTMENT SELL + WHY STATS */}
      <section className="sp b3">
        <div className="inn">
          <div className="dblk">
            <div className="tc">
              <div className="col">
                <div className="gb" />
                <h2 className="hg hg-sm">
                  Turn post-appointment experiences into an opportunity to sell more
                </h2>
                <Bullets items={[
                  "Run surveys to understand consumer preferences",
                  "Seek insights to expand and improve your services",
                  "Promote your referral and loyalty program for benefits",
                  "Collect feedback with automated WhatsApp flows",
                ]} />

              </div>
              <div className="coli">
                <Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Spas-Salons/Spas-Salons-section5.webp" alt="Post-appointment sell more" />
              </div>
            </div>
          </div>

          <div className="dblk">
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <div className="gb gb-c" />
              <h2 className="hg hg-c" style={{ marginBottom: 12 }}>
                Why use WhatsApp Business for Spas &amp; Saloons
              </h2>
              <p className="sub" style={{ maxWidth: 640, margin: "0 auto" }}>
                The spa &amp; salon industry is growing rapidly and WhatsApp gives you an opportunity to cut through the noise on other channels to reach your customers faster.
              </p>
            </div>
            <div className="why-wrap">
              {WHY_STATS.map((w, i) => (
                <div className="why-card" key={i}>
                  <div className="wc-num">{w.num}</div>
                  <div className="wc-lbl">{w.lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <ContactUsForm />
    </>
  );
}