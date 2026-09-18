import { useState, useEffect } from "react";
import GoogleForm from "../ui/GoogleForm";
import ContactUsForm from "@/pages/ContactUsForm";
/* ═══════════════════════════════════════════════════════════════
   RestaurantPage.jsx   full page, all sections
   Fonts : Libre Baskerville (headings) | Inter (body)
   Palette: Gold #C9A84C | Cream #F5F0E8 | BG #0A0A0A
═══════════════════════════════════════════════════════════════ */

const CSS = `

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
body{background:#0A0A0A;color:#fff;font-family:'Inter',sans-serif;overflow-x:hidden;}

:root{
  --g:#C9A84C; --g2:#E0B85A; --cr:#F5F0E8;
  --b1:#0A0A0A; --b2:#0E0E0E; --b3:#111111;
  --bd:rgba(201,168,76,.18); --bds:rgba(201,168,76,.08);
}

/* ── section ── */
.rs{width:100%;padding:52px 7vw;position:relative;}
.rs.b1{background:var(--b1);}
.rs.b2{background:var(--b2);}
.rs.b3{background:var(--b3);}
.rs+.rs{border-top:1px solid var(--bd);}

/* ── hero large top padding desktop, SMALL bottom padding ── */
.rs.hero{padding-top:160px;padding-bottom:20px;}

.inn{max-width:1200px;margin:0 auto;}

/* ── two-col base ── */
.tc{display:flex;align-items:center;gap:60px;}
.tc .col{flex:1;min-width:0;}
.tc .coli{flex:1;display:flex;justify-content:center;align-items:center;}

/* ── image box fully transparent, no border, no bg ── */
.ibox{
  width:100%;max-width:500px;aspect-ratio:4/3;
  border-radius:0;border:none;background:transparent;overflow:hidden;
}
.ibox img{width:100%;height:100%;object-fit:contain;border-radius:0;display:block;}

/* ── typography ── */
.hg{font-family:'Libre Baskerville',serif;
  font-size:clamp(1.7rem,2.5vw,2.5rem);
  font-weight:700;color:var(--g);line-height:1.28;
  letter-spacing:-.01em;margin-bottom:24px;}
.hg-sm{font-size:clamp(1.3rem,1.8vw,1.85rem);}
.hg-lg{font-size:clamp(1.9rem,3vw,2.9rem);}
.hg-c{text-align:center;}

.sub{font-family:'Inter',sans-serif;font-size:clamp(.88rem,1.05vw,1rem);
  color:var(--cr);line-height:1.72;opacity:.88;}

/* gold bar */
.gb{width:48px;height:3px;background:var(--g);border-radius:2px;margin-bottom:20px;}
.gb-c{margin:0 auto 20px;}

/* ── bullets ── */
.bl{list-style:none;display:flex;flex-direction:column;gap:12px;margin-bottom:28px;}
.bi{display:flex;align-items:flex-start;gap:11px;
  font-family:'Inter',sans-serif;font-size:clamp(.86rem,1vw,.98rem);
  color:var(--cr);line-height:1.68;}
.bi .tk{flex-shrink:0;margin-top:2px;}

/* ── buttons ── */
.br{display:flex;flex-wrap:wrap;gap:14px;}
.bg{background:var(--g);color:#0A0A0A;font-family:'Inter',sans-serif;
  font-weight:700;font-size:.9rem;padding:13px 30px;
  border:none;border-radius:6px;cursor:pointer;letter-spacing:.03em;
  transition:all .25s;white-space:nowrap;}
.bg:hover{background:var(--g2);transform:translateY(-2px);box-shadow:0 8px 24px rgba(201,168,76,.32);}
.bo{background:transparent;color:var(--g);font-family:'Inter',sans-serif;
  font-weight:700;font-size:.9rem;padding:12px 30px;
  border:1.5px solid var(--g);border-radius:6px;cursor:pointer;letter-spacing:.03em;
  transition:all .25s;white-space:nowrap;}
.bo:hover{background:rgba(201,168,76,.08);transform:translateY(-2px);}

/* ══════════════════════════════════════════
   SLIDER
══════════════════════════════════════════ */
.slo{position:relative;overflow:hidden;padding:10px 0;}
.slo::before,.slo::after{content:'';position:absolute;top:0;bottom:0;
  width:160px;z-index:2;pointer-events:none;}
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

/* large icon card S2 trust slider 140×50 */
.icl{
  width:140px;height:50px;border-radius:8px;border:1px solid var(--bd);
  background:var(--bds);display:flex;align-items:center;justify-content:center;
  flex-shrink:0;overflow:hidden;padding:0;
  transition:border-color .3s,transform .3s;
}
.icl:hover{border-color:var(--g);transform:translateY(-3px);}
.icl img{width:100%;height:100%;object-fit:contain;display:block;}
.icl span{display:none;}

/* small icon card S11 integration slider 140×50 */
.ics{
  width:140px;height:50px;border-radius:8px;border:1px solid var(--bd);
  background:var(--bds);display:flex;align-items:center;justify-content:center;
  flex-shrink:0;overflow:hidden;padding:0;
  transition:border-color .3s,transform .3s;
}
.ics:hover{border-color:var(--g);transform:translateY(-3px);}
.ics img{width:100%;height:100%;object-fit:contain;display:block;}
.ics span{display:none;}

/* ══════════════════════════════════════════
   S3 TIMELINE
══════════════════════════════════════════ */
.tlw{position:relative;display:flex;flex-direction:column;
  max-width:780px;margin:0 auto 48px;}
.tlw::before{content:'';position:absolute;left:27px;top:28px;bottom:28px;width:2px;
  background:linear-gradient(to bottom,#1a6b1a 0%,#E6A817 35%,#22c55e 65%,#2563EB 100%);
  border-radius:2px;}
.tli{display:flex;gap:28px;align-items:flex-start;padding:20px 0;}
.tlic{width:56px;height:56px;border-radius:50%;display:flex;align-items:center;
  justify-content:center;font-size:1.2rem;flex-shrink:0;position:relative;z-index:1;}
.cc1{background:#1a6b1a;} .cc2{background:#E6A817;}
.cc3{background:#22c55e;} .cc4{background:#2563EB;}
.tlb{flex:1;padding-top:10px;}
.tlt{font-family:'Libre Baskerville',serif;font-size:1.1rem;
  font-weight:700;color:var(--g);margin-bottom:7px;}
.tld{font-family:'Inter',sans-serif;font-size:.93rem;
  color:var(--cr);line-height:1.7;opacity:.85;}

.s3bot{text-align:center;max-width:740px;margin:0 auto;
  padding-top:36px;border-top:1px solid var(--bd);}
.s3bot strong{color:var(--g);font-weight:600;}

/* ══════════════════════════════════════════
   DUAL-BLOCK
══════════════════════════════════════════ */
.dblk+.dblk{margin-top:52px;padding-top:52px;border-top:1px solid var(--bd);}

/* ══════════════════════════════════════════
   S10 WHY CARDS
══════════════════════════════════════════ */
.why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:20px;}
.why-card{
  padding:36px 28px;border-radius:16px;
  border:1px solid var(--bd);background:var(--bds);
  position:relative;overflow:hidden;
  transition:border-color .35s,transform .35s;
}
.why-card::before{
  content:'';position:absolute;inset:0;
  background:linear-gradient(135deg,rgba(201,168,76,.07) 0%,transparent 60%);
  pointer-events:none;
}
.why-card:hover{border-color:var(--g);transform:translateY(-6px);}
.why-icon{font-size:2.2rem;margin-bottom:18px;}
.why-label{font-family:'Libre Baskerville',serif;
  font-size:1.15rem;font-weight:700;color:var(--g);margin-bottom:12px;}
.why-desc{font-family:'Inter',sans-serif;font-size:.9rem;
  color:var(--cr);line-height:1.7;opacity:.85;}

/* ══════════════════════════════════════════
   S9 QUOTE + STATS  (FIXED)
══════════════════════════════════════════ */
.qbox{border-left:3px solid var(--g);padding-left:22px;margin-bottom:36px;}
.qtxt{font-family:'Libre Baskerville',serif;font-style:italic;
  font-size:clamp(.95rem,1.25vw,1.1rem);color:var(--cr);line-height:1.72;margin-bottom:12px;}
.qattr{font-family:'Inter',sans-serif;font-size:.82rem;color:var(--g);font-weight:600;}

/* stat row equal columns, no min-width causing overflow */
.srow{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:14px;
}
.scard{
  padding:20px 14px;
  border-radius:14px;
  border:1px solid var(--bd);
  background:var(--bds);
  text-align:center;
  /* ensure content never breaks out */
  overflow:hidden;
  word-break:break-word;
}
.snum{
  font-family:'Libre Baskerville',serif;
  font-size:clamp(1.4rem,2vw,1.9rem);
  font-weight:700;color:var(--g);
  margin-bottom:8px;
  line-height:1.2;
}
.slbl{
  font-family:'Inter',sans-serif;
  font-size:.72rem;
  color:var(--cr);
  opacity:.82;
  line-height:1.5;
  /* no whitespace forcing overflow */
  white-space:normal;
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
  clip-path:polygon(0% 0%,1.5% 100%,3% 15%,4.5% 90%,6% 5%,7.5% 95%,9% 10%,10.5% 88%,
  12% 3%,13.5% 92%,15% 18%,16.5% 85%,18% 8%,19.5% 94%,21% 12%,22.5% 80%,
  24% 5%,25.5% 96%,27% 20%,28.5% 82%,30% 6%,31.5% 91%,33% 16%,34.5% 86%,
  36% 3%,37.5% 94%,39% 22%,40.5% 78%,42% 8%,43.5% 93%,45% 14%,46.5% 88%,
  48% 4%,49.5% 97%,51% 18%,52.5% 83%,54% 5%,55.5% 91%,57% 20%,58.5% 80%,
  60% 6%,61.5% 95%,63% 12%,64.5% 86%,66% 3%,67.5% 93%,69% 22%,70.5% 78%,
  72% 8%,73.5% 96%,75% 15%,76.5% 84%,78% 4%,79.5% 92%,81% 18%,82.5% 82%,
  84% 6%,85.5% 94%,87% 14%,88.5% 88%,90% 3%,91.5% 95%,93% 20%,94.5% 80%,
  96% 8%,97.5% 92%,100% 0%);
}
.torn-card::after{
  content:'';position:absolute;bottom:-1px;left:0;right:0;height:20px;
  background:var(--b3);
  clip-path:polygon(0% 100%,1.5% 0%,3% 85%,4.5% 10%,6% 95%,7.5% 5%,9% 90%,10.5% 12%,
  12% 97%,13.5% 8%,15% 82%,16.5% 15%,18% 92%,19.5% 6%,21% 88%,22.5% 20%,
  24% 95%,25.5% 4%,27% 80%,28.5% 18%,30% 94%,31.5% 9%,33% 84%,34.5% 14%,
  36% 97%,37.5% 6%,39% 78%,40.5% 22%,42% 92%,43.5% 7%,45% 86%,46.5% 12%,
  48% 96%,49.5% 3%,51% 82%,52.5% 17%,54% 95%,55.5% 9%,57% 80%,58.5% 20%,
  60% 94%,61.5% 5%,63% 88%,64.5% 14%,66% 97%,67.5% 7%,69% 78%,70.5% 22%,
  72% 92%,73.5% 4%,75% 85%,76.5% 16%,78% 96%,79.5% 8%,81% 82%,82.5% 18%,
  84% 94%,85.5% 6%,87% 86%,88.5% 12%,90% 97%,91.5% 5%,93% 80%,94.5% 20%,
  96% 92%,97.5% 8%,100% 100%);
}
.torn-inner{text-align:center;}
.tpills{display:flex;flex-wrap:wrap;justify-content:center;gap:14px;margin-bottom:36px;}
.tpill{display:flex;align-items:center;gap:9px;padding:11px 22px;
  border:1px solid var(--bd);border-radius:50px;background:rgba(201,168,76,.05);
  font-family:'Inter',sans-serif;font-size:.88rem;color:var(--cr);
  transition:all .3s;white-space:nowrap;}
.tpill:hover{border-color:var(--g);background:rgba(201,168,76,.1);transform:translateY(-3px);}
.tpill .pc{color:var(--g);}

.ls-sub{font-family:'Libre Baskerville',serif;font-style:italic;
  font-size:clamp(.9rem,1.2vw,1.05rem);color:var(--cr);margin-bottom:8px;}
.ls-tag{font-family:'Inter',sans-serif;font-size:.78rem;
  color:var(--g);opacity:.8;letter-spacing:.04em;margin-bottom:28px;}

/* ══════════════════════════════════════════
   RESPONSIVE
══════════════════════════════════════════ */
@media(max-width:960px){
  .rs{padding:44px 5vw;}
  .rs.hero{padding-top:108px;padding-bottom:16px;}
  .tc{flex-direction:column;gap:36px;}
  .tc.fl{flex-direction:column-reverse;}
  .coli{width:100%;}
  .ibox{max-width:100%;}
  .why-grid{grid-template-columns:1fr 1fr;gap:18px;}
  .tlw{max-width:100%;}
  .tlw::before{left:23px;}
  .tlic{width:48px;height:48px;}
  .slo::before,.slo::after{width:80px;}
  .srow{gap:10px;}
  .torn-card{padding:44px 28px;}
  .dblk+.dblk{margin-top:44px;padding-top:44px;}
}
@media(max-width:600px){
  .rs{padding:32px 5vw 40px;}
  .rs.hero{padding-top:0px !important;padding-bottom:0px !important;}
  .tc,.tc.fl{flex-direction:column !important;gap:24px;}
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
  .why-grid{grid-template-columns:1fr;}
  .why-card{padding:28px 22px;}
  /* hide stat cards on mobile */
  .srow{display:none;}
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
  .qbox{padding-left:14px;}
  .qtxt{font-size:.92rem;}
  .dblk+.dblk{margin-top:36px;padding-top:36px;}
  .gb{margin-bottom:16px;}
}
`;

/* ── DATA ──────────────────────────────────────────────── */

const TL = [
  {
    c: "cc1", i: "🖱️", t: "Acquire",
    d: "Integrate Google & FB Leads form to obtain new foodies for your business. Solve queries via custom auto-replies and help customers in making quick & tasty purchase."
  },
  {
    c: "cc2", i: "💼", t: "Convert",
    d: "Upsell & Cross-sell with personalized food & beverage recommendations. Send payment links for quick settlements."
  },
  {
    c: "cc3", i: "😊", t: "Delight",
    d: "Support clients 24×7 at scale on WhatsApp. Gather ratings/feedback from clients using WhatsApp automated flows."
  },
  {
    c: "cc4", i: "🔔", t: "Engage",
    d: "Setup automated & personalized WhatsApp notifications to send offer & discount. Keep customers updated with automated delivery updates on WhatsApp."
  },
];

const WHY = [
  {
    icon: "🎯", label: "Acquire",
    desc: "Don't wait for customers to discover your new food items and cuisines on food apps. Use broadcasts to promote your menu proactively!"
  },
  {
    icon: "💬", label: "Engage",
    desc: "Stay in touch with customers through WhatsApp promotions and personalized recommendations from your menu."
  },
  {
    icon: "🌟", label: "Delight",
    desc: "Make order payments simpler, send order tracking and food delivery notifications, request feedback and issue returns/refunds faster for a delightful customer experience."
  },
];



/* ── HELPERS ────────────────────────────────────────────── */
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

/* ── PAGE ───────────────────────────────────────────────── */
export default function RestaurantPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 767);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const CTA = () => <div className="btn-row"><button className="btn-g" onClick={() => setModalOpen(true)}>Contact Us</button></div>;
  return (
    <>
      <style>{CSS}</style>
      <GoogleForm isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      {/* S1 HERO */}
      <section className="rs b1 hero">
        <div className="inn" style={{ marginTop: isMobile ? "60px" : 0 }}>
          <div className="tc">
            <div className="col">

              <h1 className="hg hg-lg">
                Grow your Restaurant & Food Business with WhatsApp
              </h1>
              <Bullets items={[
                "Promote your food menu with WhatsApp Catalogs",
                "Take food orders & payments on WhatsApp",
                "Offer 24×7 customer support",
              ]} />

            </div>
            <div className="coli">
              <Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Restaurants%20%26%20Food%20Businesses/Restaurants-Food-section1.webp" alt="Restaurant WhatsApp hero" />
            </div>
          </div>
        </div>
      </section>

      {/* S2 TIMELINE + BOTTOM TEXT */}
      <section className="rs b3">
        <div className="inn">
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div className="gb gb-c" />
            <h2 className="hg hg-c" style={{ marginBottom: 0 }}>
              Create delightful restaurant journeys on WhatsApp
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
              Promote Your Food Services Seamlessly with WhatsApp Business API
            </h3>
            <p className="sub">
              Promote your menu, take orders for delivery, pickup, or dine-in, and share
              recommendations all through{" "}
              <strong style={{ color: "var(--g)", fontWeight: 600 }}>WhatsApp Business API</strong>{" "}

            </p>
          </div>
        </div>
      </section>

      {/* S3 PROMOTE MENU + TABLE BOOKINGS */}
      <section className="rs b1">
        <div className="inn">
          <div className="dblk">
            <div className="tc">
              <div className="col">
                <div className="gb" />
                <h2 className="hg hg-sm">Promote your dine-in menu and online food products</h2>
                <Bullets items={[
                  "Use WhatsApp broadcasts to promote restaurant menus and the products available for ordering online.",
                  "Get your new cuisines and collections noticed instantly!",
                ]} />
              </div>
              <div className="coli"><Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Restaurants%20%26%20Food%20Businesses/Restaurants-Food-section3-img1.webp" alt="Promote menu" /></div>
            </div>
          </div>
          <div className="dblk">
            <div className="tc fl">
              <div className="coli"><Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Restaurants%20%26%20Food%20Businesses/Restaurants-Food-section3-img-2.webp" alt="Table bookings" /></div>
              <div className="col">
                <div className="gb" />
                <h2 className="hg hg-sm">Take restaurant dine-in table bookings</h2>
                <Bullets items={[
                  "Welcome consumer queries about your restaurant, open timings, cuisines and more, on WhatsApp.",
                  "Capture their email address and phone number to follow-up on table bookings and pre-orders for an excellent dining experience.",
                ]} />

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* S4 ADDRESS QUERIES */}
      <section className="rs b2">
        <div className="inn">
          <div className="tc">
            <div className="col">
              <div className="gb" />
              <h2 className="hg hg-sm">Address consumer queries and help place orders faster</h2>
              <Bullets items={[
                "Whether dine-in or online, use WhatsApp to answer customer queries about the cuisine, products and orders in real-time.",
                "Set up WhatsApp automation for FAQs to help customers place informed food orders and deliver a great experience!",
              ]} />
            </div>
            <div className="coli"><Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Restaurants%20%26%20Food%20Businesses/Restaurants-Food-section4.webp" alt="Address queries" /></div>
          </div>
        </div>
      </section>

      {/* S5 PAYMENTS + ORDER TRACKING */}
      <section className="rs b3">
        <div className="inn">
          <div className="dblk">
            <div className="tc fl">
              <div className="coli"><Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Restaurants%20%26%20Food%20Businesses/Restaurants-Food-section5-img1.webp" alt="Take payments" /></div>
              <div className="col">
                <div className="gb" />
                <h2 className="hg hg-sm">Take payments on WhatsApp to process orders faster</h2>
                <Bullets items={[
                  "Give your customers a faster and seamless way to pay for their food orders.",
                  "Send checkout links using the WhatsApp Business API to accept order payments on the messaging app itself.",
                ]} />
              </div>
            </div>
          </div>
          <div className="dblk">
            <div className="tc">
              <div className="col">
                <div className="gb" />
                <h2 className="hg hg-sm">Enable easy order and food delivery tracking on WhatsApp</h2>
                <Bullets items={[
                  "Keep your customers informed and updated about their orders.",
                  "Set up automated order and delivery tracking notifications on WhatsApp to address post-purchase anxiety.",
                ]} />

              </div>
              <div className="coli"><Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Restaurants%20%26%20Food%20Businesses/Restaurants-Food-section5-img2.webp" alt="Order tracking" /></div>
            </div>
          </div>
        </div>
      </section>

      {/* S6 REPEAT ORDERS + RETURNS */}
      <section className="rs b1">
        <div className="inn">
          <div className="dblk">
            <div className="tc fl">
              <div className="coli"><Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Restaurants%20%26%20Food%20Businesses/Restaurants-Food-section6-img1.webp" alt="Repeat orders" /></div>
              <div className="col">
                <div className="gb" />
                <h2 className="hg hg-sm">Encourage repeat orders on food orders to boost customer loyalty</h2>
                <Bullets items={[
                  "Leverage customer order history data to re-engage them on WhatsApp.",
                  "Send out a WhatsApp campaign to encourage repeat purchase on a product or dish they loved, with a special discount to win their hearts.",
                ]} />
              </div>
            </div>
          </div>
          <div className="dblk">
            <div className="tc">
              <div className="col">
                <div className="gb" />
                <h2 className="hg hg-sm">Issue verified returns and refunds for positive customer experiences</h2>
                <Bullets items={[
                  "Did a customer not like the food delivered or did you end up sending the wrong/incomplete order to them?",
                  "Make returns and refunds easy using WhatsApp. Verify customer and order details, choose return/refund method and address the issue instantly!",
                ]} />

              </div>
              <div className="coli"><Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Restaurants%20%26%20Food%20Businesses/Restaurants-Food-section6-img2.webp" alt="Returns and refunds" /></div>
            </div>
          </div>
        </div>
      </section>

      {/* S7 REVIEWS + CURBSIDE PICKUP */}
      <section className="rs b2">
        <div className="inn">
          <div className="dblk">
            <div className="tc fl">
              <div className="coli"><Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Restaurants%20%26%20Food%20Businesses/Restaurants-Food-section7-img1.webp" alt="Reviews" /></div>
              <div className="col">
                <div className="gb" />
                <h2 className="hg hg-sm">Request product reviews and customer feedback on orders</h2>
                <Bullets items={[
                  "Follow up with customers after order delivery to seek reviews and feedback.",
                  "Automate post-purchase delivery feedback request campaign on WhatsApp . Use interactive messages to collect streamlined insights from customers.",
                ]} />
              </div>
            </div>
          </div>
          <div className="dblk">
            <div className="tc">
              <div className="col">
                <div className="gb" />
                <h2 className="hg hg-sm">Schedule curbside pick up and order takeaways</h2>
                <Bullets items={[
                  "Want to let customers place an order with your restaurant and pick it up on their own?",
                  "Make it easier for them to know when to stop by using WhatsApp to share order status notifications and schedule pickups.",
                ]} />

              </div>
              <div className="coli"><Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Restaurants%20%26%20Food%20Businesses/Restaurants-Food-section7-img2.webp" alt="Curbside pickup" /></div>
            </div>
          </div>
        </div>
      </section>

      {/* S8 QUOTE + STATS */}
      <section className="rs b3">
        <div className="inn">
          <div className="tc">
            <div className="col">
              <div className="gb" />
              <div className="qbox">
                <p className="qtxt">
                  "Bandar Mithai is a one-stop-shop for fresh mouth watering traditional foods who offers a fine selection of delicious Sweets & Homefoods for special occasions and celebrations. High-quality ingredients mixed with excellent service is our Secret of Success."
                </p>
                <p className="qattr">  Bandar Mithai</p>
              </div>
              <div className="srow">
                <div className="scard">
                  <div className="snum">35%</div>
                  <div className="slbl">Orders via WhatsApp out of total orders booked for the month of January</div>
                </div>
                <div className="scard">
                  <div className="snum">12X</div>
                  <div className="slbl">Returns on campaign spends (ROAS)</div>
                </div>
                <div className="scard">
                  <div className="snum">1.5X</div>
                  <div className="slbl">Higher AOV as compared to other websites</div>
                </div>
              </div>
            </div>
            <div className="coli">
              <Img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/WhatsAppInterakt-By-Industry/Restaurants%20%26%20Food%20Businesses/Restaurants-Food-section8.webp" alt="Bandar Mithai success story" />
            </div>
          </div>
        </div>
      </section>

      {/* S9 WHY WHATSAPP */}
      <section className="rs b1">
        <div className="inn">
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div className="gb gb-c" />
            <h2 className="hg hg-c" style={{ marginBottom: 0 }}>
              Why use WhatsApp Business API for restaurants?
            </h2>
          </div>
          <div className="why-grid">
            {WHY.map((w, i) => (
              <div className="why-card" key={i}>
                <div className="why-icon">{w.icon}</div>
                <div className="why-label">{w.label}</div>
                <p className="why-desc">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      <ContactUsForm />

    </>
  );
}