/* ═══════════════════════════════════════════════════════════
   PAGE STYLES General page setup ONLY
   NO hero-specific styles (those are in HeroSection.css)
   ═══════════════════════════════════════════════════════════ */
const PAGE_STYLES = `

/* ═══ RESET ═══ */
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

/* ═══ CSS VARIABLES ═══ */
:root{
  --bg:#050505;--bgc:#0c0c0f;--bgch:#111115;
  --gold:#D4A017;--gl:#F0C850;--gb:#FFD866;
  --gd:rgba(212,160,23,0.12);--gg:rgba(212,160,23,0.35);--ggl:rgba(212,160,23,0.15);
  --w:#EDE8DF;--wd:rgba(237,232,223,0.55);--wf:rgba(237,232,223,0.22);
  --bdr:rgba(255,255,255,0.06);--bg2:rgba(212,160,23,0.15);
  --fd:'Libre Baskerville',serif;--fb:'DM Sans',sans-serif;
}

/* ═══ PAGE WRAPPER ═══ */
.root{
  background:var(--bg);
  color:var(--w);
  font-family:var(--fb);
  min-height:100vh;
  overflow-x:hidden;
  -webkit-font-smoothing:antialiased;
}

/* ═══ SHARED SECTION STYLES ═══ */
.sec-mx{max-width:1050px;margin:0 auto;padding:0 1.5rem}
@media(max-width:480px){.sec-mx{padding:0 1rem}}

.sh{text-align:center;margin-bottom:3.5rem}
@media(max-width:480px){.sh{margin-bottom:2.5rem}}

.st{font-family:var(--fd);font-size:clamp(1.8rem,4.5vw,3rem);font-weight:700;background:linear-gradient(135deg,var(--gold),var(--gb),var(--gold));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:1rem}
@media(max-width:480px){.st{font-size:clamp(1.5rem,6vw,2.2rem);margin-bottom:0.8rem}}

.sd{font-size:0.95rem;color:var(--wd);line-height:1.75;max-width:680px;margin:0 auto}
@media(max-width:480px){.sd{font-size:0.88rem}}

.sds{font-size:1rem;color:var(--wd)}
@media(max-width:480px){.sds{font-size:0.92rem}}

.g{color:var(--gold);font-weight:600}
.mt4{margin-top:1rem}

/* ═══ CARDS ═══ */
.cg3{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem}
@media(max-width:768px){.cg3{grid-template-columns:1fr;gap:1.2rem}}

.cd{background:var(--bgc);border:1px solid var(--bdr);border-radius:16px;padding:1.8rem;transition:all 0.35s ease}
@media(max-width:480px){.cd{padding:1.5rem}}

.cd:hover{border-color:var(--bg2);background:var(--bgch);transform:translateY(-4px)}

.cd-gl{box-shadow:0 0 40px rgba(212,160,23,0.04)}
.cd-gl:hover{box-shadow:0 0 50px rgba(212,160,23,0.08)}

.cd-center{text-align:center}
.cd-ic{font-size:2rem;margin-bottom:0.8rem}

.cd-t{font-family:var(--fd);font-size:1rem;color:var(--w);margin-bottom:0.8rem;font-weight:600}
@media(max-width:480px){.cd-t{font-size:0.95rem}}

.cd-l{list-style:none;display:flex;flex-direction:column;gap:0.5rem}

.cd-l li{display:flex;gap:0.5rem;font-size:0.85rem;color:var(--wd);line-height:1.55}
@media(max-width:480px){.cd-l li{font-size:0.82rem}}

.dot{color:var(--gold);font-size:0.55rem;margin-top:0.35rem;flex-shrink:0}

.cd-icir{width:50px;height:50px;border-radius:50%;background:var(--gd);display:flex;align-items:center;justify-content:center;color:var(--gold);margin:0 auto 1rem}

.cd-val{font-family:var(--fd);font-size:1.5rem;font-weight:700;background:linear-gradient(135deg,var(--gold),var(--gb));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:0.4rem}
@media(max-width:480px){.cd-val{font-size:1.3rem}}

.cd-d{font-size:0.83rem;color:var(--wd);line-height:1.55}
@media(max-width:480px){.cd-d{font-size:0.8rem}}

/* ═══ SECTIONS ═══ */
.sec-story{padding:6rem 1.5rem;background:radial-gradient(ellipse 50% 30% at 50% 0%,rgba(212,160,23,0.03),transparent),var(--bg)}
@media(max-width:768px){.sec-story{padding:4rem 1.5rem}}
@media(max-width:480px){.sec-story{padding:3rem 1rem}}

.sec-impact{padding:6rem 1.5rem}
@media(max-width:768px){.sec-impact{padding:4rem 1.5rem}}
@media(max-width:480px){.sec-impact{padding:3rem 1rem}}

.sec-testi{padding:6rem 1.5rem;background:radial-gradient(ellipse 50% 30% at 50% 0%,rgba(212,160,23,0.03),transparent),var(--bg)}
@media(max-width:768px){.sec-testi{padding:4rem 1.5rem}}
@media(max-width:480px){.sec-testi{padding:3rem 1rem}}

.sec-cta{padding:6rem 1.5rem}
@media(max-width:768px){.sec-cta{padding:4rem 1.5rem}}
@media(max-width:480px){.sec-cta{padding:3rem 1rem}}

/* ═══ TESTIMONIALS ═══ */
.ti-h{display:flex;align-items:center;gap:0.7rem;margin-bottom:1rem}

.ti-av{width:38px;height:38px;border-radius:50%;background:var(--gd);display:flex;align-items:center;justify-content:center;font-size:0.85rem;font-weight:700;color:var(--gold)}

.ti-n{font-size:0.85rem;font-weight:600;color:var(--w)}
.ti-tm{font-size:0.7rem;color:var(--wf)}

.ti-tx{font-size:0.85rem;color:rgba(237,232,223,0.7);line-height:1.65;margin-bottom:1rem;font-style:italic}
@media(max-width:480px){.ti-tx{font-size:0.82rem}}

.ti-ac{display:flex;gap:1.2rem;color:var(--wf);font-size:0.75rem}
.ti-ac span{display:flex;align-items:center;gap:4px}

/* ═══ CTA ═══ */
.cta-in{text-align:center;max-width:700px;margin:0 auto}
.cta-sp{color:var(--gold);margin:0 auto 1.5rem}
.cta-desc{max-width:600px;margin:0 auto 2rem}
.cta-btns{display:flex;flex-wrap:wrap;justify-content:center;gap:1rem}

/* ═══ BUTTONS ═══ */
.btn-p{display:inline-flex;align-items:center;gap:8px;padding:14px 34px;border-radius:999px;border:none;background:linear-gradient(135deg,var(--gold),var(--gl));color:var(--bg);font-family:var(--fb);font-weight:600;font-size:0.9rem;letter-spacing:0.02em;cursor:pointer;box-shadow:0 0 40px rgba(212,160,23,0.2);transition:all 0.3s}
@media(max-width:480px){.btn-p{padding:12px 26px;font-size:0.82rem}}

.btn-o{display:inline-flex;align-items:center;gap:8px;padding:14px 34px;border-radius:999px;border:1px solid rgba(212,160,23,0.3);background:transparent;color:var(--gold);font-family:var(--fb);font-weight:600;font-size:0.9rem;cursor:pointer;transition:all 0.3s}
@media(max-width:480px){.btn-o{padding:12px 26px;font-size:0.82rem}}

.btn-o:hover{background:rgba(212,160,23,0.08)}

/* ═══ SCROLLBAR ═══ */
::-webkit-scrollbar{width:6px}
::-webkit-scrollbar-track{background:var(--bg)}
::-webkit-scrollbar-thumb{background:rgba(212,160,23,0.2);border-radius:3px}
::-webkit-scrollbar-thumb:hover{background:rgba(212,160,23,0.35)}
`;

export default PAGE_STYLES;