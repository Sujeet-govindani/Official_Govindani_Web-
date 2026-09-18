import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LANGS, isLang, translator, coverage } from './i18n';
import SEO from '@/components/SEO';
import InfoTip from './InfoTip';
import SecondYearCalculator from './SecondYearCalculator';
import { PLANS, COMPARISON, ADDONS, TRUST, FAQ,
  BENCHMARKS, YEAR_TWO, REFRAMES, VERIFIED_ON, PAINS, HEADLINE, GROWTH_MATH,
  MODULES, ONBOARDING, RESCUE, WELCOME } from './ngoOsPricingData';

const CSS = `
.ngoos { --gold:#b3924f; --gold-soft:#d8c48d; --dark:#111111; --green:#1e7a45;
  --tint:#eaf6ee; --paper:#f6f3ec; --card:#ffffff; --rule:#e6e0d4; --ink-2:#5a5348;
  background:var(--paper); color:var(--dark); font-family:'Inter',system-ui,sans-serif; }
.ngoos section { background:var(--paper); }
.ngoos section.alt { background:#efeade; }
.ngoos .wrap { max-width:1200px; margin:0 auto; padding:0 20px; }
.ngoos h1,.ngoos h2 { font-family:'Libre Baskerville',Georgia,serif; letter-spacing:-.01em; }
.ngoos h1 { font-size:clamp(2rem,4.6vw,3.2rem); line-height:1.12; margin:0 0 20px; }
.ngoos h2 { font-size:clamp(1.5rem,3vw,2.1rem); margin:0 0 10px; }
.ngoos section { padding:64px 0; border-top:1px solid var(--rule); }
.ngoos section:first-child { border-top:0; }

.ngoos .hero { background:var(--dark); color:#fff;
  padding:var(--hero-pt) 0 var(--hero-pb); }
@media (max-width:768px){ .ngoos .hero {
  padding:var(--hero-pt-mobile) 0 var(--hero-pb-mobile); } }
.ngoos .hero h1 { color:#fff; }
.ngoos .hero p { font-size:1.12rem; line-height:1.7; color:#d6d6d6; max-width:62ch; }
.ngoos .hero strong { color:var(--gold); }
.ngoos .chips { display:flex; flex-wrap:wrap; gap:10px; margin:26px 0 30px; }
.ngoos .chip { border:1px solid rgba(179,146,79,.5); color:var(--gold);
  padding:7px 15px; border-radius:999px; font-size:.86rem; }
.ngoos .ctas { display:flex; flex-wrap:wrap; gap:12px; }
.ngoos .btn { display:inline-block; padding:13px 26px; border-radius:8px; font-weight:700;
  font-size:.94rem; text-decoration:none; cursor:pointer; border:1px solid transparent; }
.ngoos .btn-primary { background:var(--gold); color:#111; }
.ngoos .btn-ghost { border-color:rgba(255,255,255,.35); color:#fff; }

.ngoos .plans { display:grid; grid-template-columns:repeat(auto-fit,minmax(270px,1fr)); gap:20px; }
.ngoos .plan { border:1px solid var(--rule); border-radius:14px; padding:26px;
  position:relative; background:var(--card); }
.ngoos .plan.rec { border-color:var(--green); background:var(--tint); }
.ngoos .badge { position:absolute; top:-11px; left:26px; background:var(--green); color:#fff;
  font-size:.66rem; font-weight:700; letter-spacing:.09em; padding:4px 11px; border-radius:999px; }
.ngoos .plan h3 { font-size:.8rem; letter-spacing:.12em; color:#666; margin:0 0 12px; }
.ngoos .price { font-size:2rem; font-weight:800; }
.ngoos .gst { font-size:.82rem; color:#666; font-weight:500; }
.ngoos .plan ul { list-style:none; padding:0; margin:16px 0 0; font-size:.9rem; }
.ngoos .plan li { padding:7px 0; border-top:1px solid rgba(0,0,0,.07); color:#444; }

.ngoos .tablewrap { overflow-x:auto; border:1px solid #e4e4e4; border-radius:12px; }
.ngoos table { width:100%; border-collapse:collapse; font-size:.9rem; min-width:760px; }
.ngoos th,.ngoos td { padding:13px 16px; text-align:left; border-bottom:1px solid var(--rule); vertical-align:top; }
.ngoos th { background:#fafafa; font-size:.72rem; letter-spacing:.09em; text-transform:uppercase; color:#666; }
.ngoos th.rec,.ngoos td.rec { background:var(--tint); }
.ngoos td.feat { font-weight:600; min-width:220px; }
.ngoos tr:last-child td { border-bottom:0; }

.ngoos-tip-wrap { position:relative; display:inline-flex; margin-left:6px; vertical-align:middle; }
.ngoos-tip-btn { width:14px; height:14px; border-radius:50%; border:1px solid var(--gold);
  background:transparent; color:var(--gold); opacity:.6; font-size:9px; line-height:1;
  font-style:italic; font-weight:700; cursor:pointer; display:flex; align-items:center;
  justify-content:center; padding:0; }
.ngoos-tip-btn:hover,.ngoos-tip-btn:focus-visible { opacity:1; outline-offset:2px; }
.ngoos-tip { position:fixed; width:max-content; max-width:min(340px,86vw);
  background:#111; color:#fff; font-size:.84rem; line-height:1.55; padding:11px 14px;
  border-radius:9px; z-index:3000; white-space:normal; box-shadow:0 10px 30px rgba(0,0,0,.3);
  pointer-events:auto; font-family:'Inter',system-ui,sans-serif; }

.ngoos .note { background:#fafafa; border-left:3px solid var(--gold); padding:16px 20px;
  border-radius:0 8px 8px 0; font-size:.92rem; line-height:1.65; color:#444; margin-top:18px; }
.ngoos .faq { border-bottom:1px solid #eee; }
.ngoos .faq button { width:100%; text-align:left; background:none; border:0; padding:17px 0;
  font-size:1rem; font-weight:600; cursor:pointer; display:flex; justify-content:space-between; gap:16px; }
.ngoos .faq p { margin:0 0 17px; color:#555; line-height:1.7; font-size:.93rem; max-width:70ch; }
.ngoos .final { background:var(--dark); color:#fff; text-align:center; }
.ngoos .final h2 { color:#fff; }
@media (prefers-reduced-motion:reduce){ .ngoos *{transition:none!important} }

/* ---- value blocks ---- */
.ngoos .det { display:block; font-size:.79rem; color:#8a8172; font-weight:400; margin-top:3px; }
.ngoos .reframe { border:1px solid var(--gold-soft); background:#fbf7ec; border-radius:12px;
  padding:15px 18px; margin-top:14px; }
.ngoos .reframe h4 { margin:0 0 5px; font-size:.78rem; letter-spacing:.07em; font-weight:700;
  text-transform:uppercase; color:var(--gold); }
.ngoos .reframe p { margin:0; font-size:.92rem; line-height:1.6; color:#3c362c; }
.ngoos .yeartwo { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr));
  gap:18px; margin-top:24px; }
.ngoos .step { background:var(--card); border:1px solid var(--rule); border-radius:14px; padding:24px; }
.ngoos .step .yr { font-size:.72rem; letter-spacing:.12em; text-transform:uppercase;
  font-weight:700; color:var(--gold); }
.ngoos .step .pl { font-family:'Libre Baskerville',Georgia,serif; font-size:1.2rem; margin:8px 0 10px; }
.ngoos .step p { margin:0; font-size:.94rem; line-height:1.65; color:var(--ink-2); }
.ngoos .keepbar { margin-top:22px; background:var(--dark); color:#fff; border-radius:14px; padding:24px 26px; }
.ngoos .keepbar a { color:var(--gold-soft); }
.ngoos .bench { background:var(--card); border:1px solid var(--rule); border-radius:14px;
  padding:24px; margin-top:18px; }
.ngoos .bench .need { font-family:'Libre Baskerville',Georgia,serif; font-size:1.16rem; margin:0 0 6px; }
.ngoos .bench .we { display:inline-block; background:var(--tint); color:var(--green); font-weight:700;
  font-size:.85rem; padding:5px 12px; border-radius:999px; margin:0 0 12px; }
.ngoos .vend { display:flex; flex-wrap:wrap; gap:6px 18px; justify-content:space-between;
  align-items:baseline; padding:11px 0; border-top:1px solid var(--rule); font-size:.92rem; }
.ngoos .vend a { color:var(--dark); text-decoration:underline; text-underline-offset:3px;
  text-decoration-color:var(--gold-soft); }
.ngoos .vend .amt { font-weight:700; white-space:nowrap; }
.ngoos .srcline { font-size:.79rem; color:#8a8172; margin-top:10px; line-height:1.6; max-width:80ch; }

/* ---- the problems, answered ---- */
.ngoos .blaze { background:var(--dark); color:#fff; }
.ngoos .blaze h2 { color:#fff; max-width:20ch; }
.ngoos .blaze .kicker { font-size:.74rem; letter-spacing:.16em; text-transform:uppercase;
  color:var(--gold); font-weight:700; margin:0 0 14px; }
.ngoos .blaze .lede { color:#c9c3b6; max-width:62ch; line-height:1.75; font-size:1.03rem; margin:0 0 34px; }
.ngoos .pain { border-top:1px solid rgba(255,255,255,.14); }
.ngoos .pain:last-child { border-bottom:1px solid rgba(255,255,255,.14); }
.ngoos .pain button { width:100%; background:none; border:0; cursor:pointer; text-align:left;
  padding:22px 0; display:flex; gap:18px; align-items:flex-start; color:#fff;
  font-family:'Libre Baskerville',Georgia,serif; font-size:clamp(1.02rem,2.1vw,1.32rem);
  line-height:1.4; }
.ngoos .pain .qtext { flex:1; transition:color .35s ease, opacity .35s ease; }
.ngoos .pain.open .qtext { color:#8f8878; text-decoration:line-through;
  text-decoration-color:var(--gold); text-decoration-thickness:1px; }
.ngoos .pain .mark { flex:none; width:26px; height:26px; margin-top:4px; border-radius:50%;
  border:1px solid var(--gold); color:var(--gold); display:grid; place-items:center;
  font-size:1.05rem; line-height:1; font-family:'Inter',sans-serif;
  transition:transform .4s cubic-bezier(.4,0,.2,1), background .35s ease, color .35s ease; }
.ngoos .pain.open .mark { transform:rotate(135deg); background:var(--gold); color:var(--dark); }
.ngoos .painbody { display:grid; grid-template-rows:0fr;
  transition:grid-template-rows .45s cubic-bezier(.4,0,.2,1); }
.ngoos .pain.open .painbody { grid-template-rows:1fr; }
.ngoos .painbody > .inner { overflow:hidden; min-height:0; }
.ngoos .painbody .move { opacity:0; transform:translateY(-8px);
  transition:opacity .34s ease .06s, transform .34s cubic-bezier(.4,0,.2,1) .06s; }
.ngoos .pain.open .painbody .move { opacity:1; transform:none; }
.ngoos .painbody p { margin:0 0 22px 44px; color:#d6d0c4; line-height:1.75; max-width:70ch;
  font-size:1rem; }
.ngoos .painbody .tag { display:inline-block; margin:0 0 12px 44px; background:rgba(179,146,79,.16);
  border:1px solid rgba(179,146,79,.5); color:var(--gold); font-size:.72rem; font-weight:700;
  letter-spacing:.11em; text-transform:uppercase; padding:5px 12px; border-radius:999px;
  font-family:'Inter',sans-serif; }
@media (max-width:600px){
  .ngoos .painbody p, .ngoos .painbody .tag { margin-left:0; }
}
@media (prefers-reduced-motion:reduce){
  .ngoos .painbody, .ngoos .painbody .move, .ngoos .pain .mark, .ngoos .pain .qtext {
    transition:none; }

}

/* ---- capability modules ---- */
.ngoos .mod { border:1px solid var(--rule); border-radius:14px; background:var(--card);
  margin-top:12px; overflow:hidden; }
.ngoos .mod > button { width:100%; background:none; border:0; cursor:pointer; text-align:left;
  padding:20px 22px; display:flex; gap:16px; align-items:baseline; color:var(--dark); }
.ngoos .mod .mtitle { font-family:'Libre Baskerville',Georgia,serif; font-size:1.1rem; flex:none; }
.ngoos .mod .mlead { flex:1; color:var(--ink-2); font-size:.92rem; line-height:1.5; }
.ngoos .mod .msign { flex:none; color:var(--gold); font-size:1.3rem; line-height:1;
  transition:transform .4s cubic-bezier(.4,0,.2,1); font-family:'Inter',sans-serif; }
.ngoos .mod.open .msign { transform:rotate(45deg); }
.ngoos .modbody { display:grid; grid-template-rows:0fr;
  transition:grid-template-rows .45s cubic-bezier(.4,0,.2,1); }
.ngoos .mod.open .modbody { grid-template-rows:1fr; }
.ngoos .modbody > .inner { overflow:hidden; min-height:0; }
.ngoos .modbody dl { margin:0; padding:0 22px 6px; }
.ngoos .modbody dt { font-weight:700; font-size:.94rem; margin-top:14px; color:var(--dark); }
.ngoos .modbody dd { margin:4px 0 0; font-size:.94rem; line-height:1.7; color:var(--ink-2); }
.ngoos .modbody .pad { height:18px; }
@media (max-width:720px){
  .ngoos .mod > button { flex-wrap:wrap; gap:6px 14px; }
  .ngoos .mod .mlead { flex-basis:100%; order:3; }
}
.ngoos .onb { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:16px; margin-top:24px; }
.ngoos .onb div { background:var(--card); border:1px solid var(--rule); border-radius:12px; padding:18px 20px; }
.ngoos .onb strong { display:block; margin-bottom:5px; font-size:.95rem; }
.ngoos .onb span { color:var(--ink-2); font-size:.92rem; line-height:1.65; }
@media (prefers-reduced-motion:reduce){
  .ngoos .modbody, .ngoos .mod .msign { transition:none; }
}

/* ---- get rescue from ---- */
.ngoos .rescue { background:var(--dark); color:#fff; padding:72px 0 64px; border:0; }
.ngoos .rescue .kick { font-size:.74rem; letter-spacing:.2em; text-transform:uppercase;
  font-weight:700; color:var(--gold); margin:0 0 22px; }
/* Every line is stacked in one grid cell, so the block is exactly as tall as
   the tallest line at the current width — no reserved void, and no jump when
   the line changes. The old min-height reserved 210px for a line that measured
   115px, which is the empty band that made this section look broken. */
.ngoos .rescue .stage { display:grid; }
.ngoos .rescue .prob { grid-area:1/1; font-family:'Libre Baskerville',Georgia,serif;
  font-size:clamp(1.5rem,4.4vw,3rem); line-height:1.2; letter-spacing:-.015em; color:#fff;
  margin:0; max-width:26ch; opacity:0; transform:translateY(10px); pointer-events:none;
  transition:opacity .55s cubic-bezier(.2,0,.2,1), transform .55s cubic-bezier(.2,0,.2,1); }
/* Cross-fade: the outgoing line is still leaving as the next arrives, so the
   headline is never blank. It used to animate up from opacity 0 on each turn,
   which left the hero empty for part of every cycle. */
.ngoos .rescue .prob.on { opacity:1; transform:none; pointer-events:auto; }
.ngoos .rescue .ticker { display:flex; gap:10px; margin-top:26px; flex-wrap:wrap; }
.ngoos .rescue .dot { width:26px; height:3px; border-radius:2px; background:rgba(255,255,255,.18);
  border:0; padding:0; cursor:pointer; transition:background .3s; }
.ngoos .rescue .dot.on { background:var(--gold); }
.ngoos .rescue .closer { margin:38px 0 0; padding-top:28px;
  border-top:1px solid rgba(255,255,255,.14); display:flex; gap:22px; align-items:center;
  flex-wrap:wrap; }
.ngoos .rescue .closer b { font-family:'Libre Baskerville',Georgia,serif; font-weight:400;
  font-size:clamp(1.3rem,2.6vw,1.9rem); color:var(--gold-soft); }
.ngoos .rescue .closer a { background:var(--gold); color:#111; font-weight:700;
  padding:13px 26px; border-radius:8px; text-decoration:none; }
.ngoos .rescue .all { margin:24px 0 0; columns:2; column-gap:34px; }
.ngoos .rescue .all li { color:#9c9484; font-size:.86rem; line-height:1.6; padding:3px 0;
  list-style:none; }
@media (max-width:700px){ .ngoos .rescue .all { columns:1 } }
@media (prefers-reduced-motion:reduce){ .ngoos .rescue .prob { transition:none; transform:none } }

/* ---- arrival welcome ---- */
.gsw { position:fixed; inset:0; z-index:2500; display:grid; place-items:center; padding:24px;
  background:rgba(6,6,5,.9); backdrop-filter:blur(10px) brightness(.6);
  -webkit-backdrop-filter:blur(10px) brightness(.6); animation:gswIn .3s ease; }
@keyframes gswIn { from { opacity:0 } to { opacity:1 } }
.gsw .card { width:min(620px,100%); background:#141311; border:1px solid var(--gold);
  border-radius:20px; padding:clamp(26px,4vw,40px); text-align:center;
  animation:gswUp .4s cubic-bezier(.2,0,.2,1); }
@keyframes gswUp { from { opacity:0; transform:translateY(18px) scale(.98) } to { opacity:1; transform:none } }
.gsw .kick { font-size:.72rem; letter-spacing:.2em; text-transform:uppercase; font-weight:700;
  color:var(--gold); margin:0 0 12px; }
.gsw h3 { font-family:'Libre Baskerville',Georgia,serif; color:#fff; margin:0 0 14px;
  font-size:clamp(1.3rem,3.2vw,1.9rem); line-height:1.25; }
.gsw p { color:#c9c3b6; line-height:1.7; margin:0 auto 22px; max-width:52ch; font-size:.98rem; }
.gsw .stats { display:grid; grid-template-columns:repeat(auto-fit,minmax(120px,1fr)); gap:12px;
  margin:0 0 24px; }
.gsw .stat { background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.12);
  border-radius:12px; padding:14px 10px; }
.gsw .stat b { display:block; color:var(--gold); font-size:1.15rem; margin-bottom:4px; }
.gsw .stat span { color:#9c9484; font-size:.76rem; line-height:1.45; display:block; }
.gsw .yours { background:rgba(30,122,69,.14); border:1px solid rgba(30,122,69,.5);
  border-radius:12px; padding:14px 16px; margin:0 0 22px; text-align:left; }
.gsw .yours b { color:#7fd6a2; font-size:.8rem; letter-spacing:.06em; text-transform:uppercase;
  display:block; margin-bottom:7px; }
.gsw .yours span { color:#d6d0c4; font-size:.9rem; line-height:1.6; }
.gsw .go { background:var(--gold); color:#111; border:0; font:inherit; font-weight:700;
  padding:14px 32px; border-radius:9px; cursor:pointer; font-size:1rem; }
.gsw .skip { display:block; margin:14px auto 0; background:none; border:0; color:#8f8878;
  font:inherit; font-size:.85rem; cursor:pointer; text-decoration:underline; text-underline-offset:3px; }

/* ---- the picks they arrived with ---- */
.ngoos .picked { background:var(--tint); border:1px solid rgba(30,122,69,.35);
  border-radius:14px; padding:20px 22px; margin-top:24px; }
.ngoos .picked .lbl { font-size:.72rem; letter-spacing:.12em; text-transform:uppercase;
  font-weight:700; color:var(--green); margin:0 0 10px; }
.ngoos .picked ul { list-style:none; padding:0; margin:0; display:flex; flex-wrap:wrap; gap:7px; }
.ngoos .picked li { background:#fff; border:1px solid rgba(30,122,69,.3); border-radius:999px;
  padding:6px 13px; font-size:.85rem; color:#1e5c37; font-weight:600; }
.ngoos .picked .more { background:var(--green); color:#fff; border:0; cursor:pointer;
  font:inherit; font-size:.85rem; font-weight:700; padding:6px 14px; border-radius:999px; }
.ngoos .picked .note { margin:12px 0 0; font-size:.88rem; color:#3c362c; line-height:1.6; }

/* ---- year-two calculator ---- */
.ngoos .calc { margin-top:24px; }
.ngoos .calcgrid { display:grid; grid-template-columns:1.15fr .85fr; gap:22px; align-items:start; }
@media (max-width:860px){ .ngoos .calcgrid { grid-template-columns:1fr } }
.ngoos .calcinputs { background:var(--card); border:1px solid var(--rule); border-radius:14px;
  padding:22px 24px; }
.ngoos .calcrow { padding:14px 0; border-bottom:1px solid var(--rule); }
.ngoos .calcrow:last-child { border-bottom:0; padding-bottom:0; }
.ngoos .calcrow label { display:block; margin-bottom:9px; }
.ngoos .calcrow .cl { display:block; font-weight:700; font-size:.95rem; }
.ngoos .calcrow .ch { display:block; font-size:.83rem; color:var(--ink-2); line-height:1.5; margin-top:3px; }
.ngoos .calcrow .cin { display:flex; gap:12px; align-items:center; }
.ngoos .calcrow.calctoggle .cin { gap:8px; }
.ngoos .calcrow .seg { flex:none; font:inherit; font-weight:700; font-size:.88rem;
  padding:8px 20px; border:1px solid var(--rule); border-radius:8px; background:var(--paper);
  color:var(--ink-2); cursor:pointer; }
.ngoos .calcrow .seg.on { background:var(--dark); border-color:var(--dark); color:#fff; }
.ngoos .calcrow input[type=range] { flex:1; accent-color:var(--gold); min-width:0; }
.ngoos .calcrow input[type=number] { width:92px; flex:none; font:inherit; font-weight:700;
  font-size:.92rem; padding:8px 10px; border:1px solid var(--rule); border-radius:8px;
  background:var(--paper); color:var(--dark); }
.ngoos .calcout { background:var(--dark); color:#fff; border-radius:14px; padding:24px 26px;
  position:sticky; top:110px; }
.ngoos .calcout .colbl { font-size:.72rem; letter-spacing:.14em; text-transform:uppercase;
  font-weight:700; color:var(--gold); margin:0 0 6px; }
.ngoos .calcout .coplan { font-family:'Libre Baskerville',Georgia,serif; font-size:2rem;
  margin:0 0 4px; color:#fff; }
.ngoos .calcout .cototal { font-size:1.5rem; font-weight:800; color:var(--gold-soft); margin:0 0 18px; }
.ngoos .calcout .cototal span { font-size:.82rem; font-weight:500; color:#9c9484; margin-left:7px; }
.ngoos .calcout .colines { list-style:none; padding:0; margin:0 0 16px; }
.ngoos .calcout .colines li { display:flex; justify-content:space-between; gap:16px;
  padding:9px 0; border-top:1px solid rgba(255,255,255,.13); font-size:.86rem; align-items:baseline; }
.ngoos .calcout .colines span { color:#c9c3b6; line-height:1.45; }
.ngoos .calcout .colines b { white-space:nowrap; color:#fff; }
.ngoos .calcout .conote { font-size:.84rem; color:#9c9484; line-height:1.6; margin:0; }
.ngoos .calcout .conote strong { color:var(--gold-soft); }
.ngoos .calcfoot { font-size:.82rem; color:#8a8172; line-height:1.65; margin-top:14px; max-width:82ch; }

/* ---- language switcher ---- */
.ngoos .langbar { background:#efeade; border-bottom:1px solid var(--rule); padding:10px 0; }
.ngoos .langbar .wrap { display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
.ngoos .langbar .lbl { font-size:.74rem; letter-spacing:.1em; text-transform:uppercase;
  font-weight:700; color:var(--ink-2); margin-right:2px; }
.ngoos .langbar a { font-size:.86rem; padding:5px 12px; border-radius:999px; text-decoration:none;
  color:var(--dark); border:1px solid var(--rule); background:#fff; }
.ngoos .langbar a:hover { border-color:var(--gold); }
.ngoos .langbar a.on { background:var(--dark); color:#fff; border-color:var(--dark); font-weight:600; }
.ngoos .partial { font-size:.8rem; color:var(--ink-2); margin:8px 0 0; line-height:1.55; }
`;

function Reframe({ k }: { k: keyof typeof REFRAMES }) {
  const r = REFRAMES[k];
  return <div className="reframe"><h4>{r.title}</h4><p>{r.body}</p></div>;
}

export default function NgoOsPricing() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [openPain, setOpenPain] = useState<number | null>(0);
  const [openMod, setOpenMod] = useState<string | null>('receipting');
  const { lang: langParam } = useParams();
  const lang = isLang(langParam) ? langParam : 'en';
  const t = translator(lang);
  const covered = coverage(lang);

  const [prob, setProb] = useState(0);
  const [pick, setPick] = useState<{ industryLabel: string; picked: string[]; described: string } | null>(null);
  const [welcome, setWelcome] = useState(false);
  const [showAllPicks, setShowAllPicks] = useState(false);
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('gs.pick');
      if (!raw) return;
      const p = JSON.parse(raw);
      if (p?.picked?.length) { setPick(p); setWelcome(true); }
      // the welcome fires once, but the chat still wants to know what they picked
      sessionStorage.setItem('gs.pick.seen', raw);
      sessionStorage.removeItem('gs.pick');
    } catch { /* nothing to restore */ }
  }, []);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setProb((p) => (p + 1) % RESCUE.problems.length), 2900);
    return () => clearInterval(t);
  }, []);


  return (
    <div className="ngoos">
      <SEO
        title="Give Setu Pricing | NGO Donation Platform &amp; 80G Receipt Software from ₹25,000"
        description="Transparent pricing for Govindani Give Setu: donations, 80G receipts, donors, members, cases, campaigns, compliance, website and mobile app in one system. 0% commission on every rupee you raise, forever."
        keywords="Give Setu pricing, NGO donation platform India, 80G receipt software, NGO CRM pricing, 10BD 10BE filing software"
      />
      {/* Every language of this page declares every other, so Google serves the
          right one and does not read them as duplicates. */}
      <link rel="alternate" hrefLang="x-default" href="https://govindaniit.com/pricing/ngo-os/" />
      {LANGS.map((l) => (
        <link key={l.code} rel="alternate" hrefLang={l.hreflang}
          href={`https://govindaniit.com/pricing/ngo-os/${l.code === 'en' ? '' : l.code + '/'}`} />
      ))}

      <style>{CSS}</style>

      {welcome && pick && (
        <div className="gsw" role="dialog" aria-modal="true" aria-label="Welcome"
             onClick={(e) => { if (e.target === e.currentTarget) setWelcome(false); }}>
          <div className="card">
            <p className="kick">{WELCOME.kicker}</p>
            <h3>{WELCOME.title}</h3>
            <p>{WELCOME.body}</p>
            <div className="stats">
              {WELCOME.points.map(([n2, l]) => (
                <div className="stat" key={l}><b>{n2}</b><span>{l}</span></div>
              ))}
            </div>
            <div className="yours">
              <b>Carried over from your answers</b>
              <span>
                {pick.picked.slice(0, 4).join(' · ')}
                {pick.picked.length > 4 && ` · and ${pick.picked.length - 4} more`}
                {' — all of it is inside the plans below.'}
              </span>
            </div>
            <button className="go" onClick={() => setWelcome(false)}>{WELCOME.cta}</button>
            <button className="skip" onClick={() => setWelcome(false)}>Close</button>
          </div>
        </div>
      )}

      <header className="hero">
        <div className="wrap">
          <h1>{t('Give Setu — the operating system for Indian non-profits.')}</h1>
          <p>
            Donations, receipts, donors, members, cases, campaigns, compliance, website
            and mobile app — in one system. Your website included free.{' '}
            <strong>0% commission on every rupee you raise, forever.</strong>
          </p>
          <div className="chips">
            <span className="chip">80G receipt in under 4 seconds</span>
            <span className="chip">0% commission, permanently</span>
            <span className="chip">Your data exports free, any time</span>
          </div>
          <div className="ctas">
            <a className="btn btn-primary" href="/contact-us/">Book a 20-minute demo</a>
            <a className="btn btn-ghost" href="#included">See what's included</a>
          </div>
        </div>
      </header>

      <div className="langbar">
        <div className="wrap">
          <span className="lbl">भाषा · Language</span>
          {LANGS.map((l) => (
            <a key={l.code}
               className={l.code === lang ? 'on' : ''}
               href={`/pricing/ngo-os/${l.code === 'en' ? '' : l.code + '/'}`}
               lang={l.hreflang}>{l.native}</a>
          ))}
        </div>
      </div>

      <section className="rescue">
        <div className="wrap">
          <p className="kick">{t(RESCUE.kicker)}</p>
          <div className="stage">
            {RESCUE.problems.map((pTxt, i) => (
              <p key={pTxt} className={`prob${i === prob ? ' on' : ''}`} aria-hidden={i !== prob}>
                {t(pTxt)}
              </p>
            ))}
          </div>
          <div className="ticker" role="tablist" aria-label="Problems Give Setu removes">
            {RESCUE.problems.map((pTxt, i) => (
              <button key={pTxt} type="button" className={`dot${i === prob ? ' on' : ''}`}
                aria-label={pTxt} aria-selected={i === prob} role="tab"
                onClick={() => setProb(i)} />
            ))}
          </div>
          <div className="closer">
            <b>{t(RESCUE.closer)}</b>
            <a href="#plans">{t(RESCUE.cta)}</a>
          </div>
          <ul className="all">
            {RESCUE.problems.map((pTxt) => <li key={pTxt}>{t(pTxt)}</li>)}
          </ul>
        </div>
      </section>

      <section id="plans">
        <div className="wrap">
          <h2>{t('Plans')}</h2>
          {pick && pick.picked.length > 0 && (
            <div className="picked">
              <p className="lbl">
                What you asked for{pick.industryLabel ? ` · ${pick.industryLabel}` : ''}
              </p>
              <ul>
                {(showAllPicks ? pick.picked : pick.picked.slice(0, 6)).map((x) => <li key={x}>{x}</li>)}
                {!showAllPicks && pick.picked.length > 6 && (
                  <li style={{ padding: 0, border: 0, background: 'none' }}>
                    <button className="more" onClick={() => setShowAllPicks(true)}>
                      + {pick.picked.length - 6} more
                    </button>
                  </li>
                )}
              </ul>
              <p className="note">
                Every one of these is included from the plan marked below — and the plan carries{' '}
                <strong>{COMPARISON.length - pick.picked.length > 0
                  ? `${COMPARISON.length - pick.picked.length} further capabilities`
                  : 'the rest of the system'}</strong>{' '}
                you did not ask for but get anyway. The full list is in{' '}
                <a href="#included" style={{ color: 'var(--green)' }}>Everything compared</a>.
              </p>
            </div>
          )}
          <div className="plans">
            {PLANS.map(p => (
              <div key={p.name} className={`plan${p.rec ? ' rec' : ''}`}>
                {p.rec && <span className="badge">RECOMMENDED</span>}
                <h3>{t(p.name)}</h3>
                <div className="price">{p.annual} <span className="gst">+ 18% GST</span></div>
                <ul>
                  <li>Monthly {p.monthly} + 18% GST</li>
                  <li>3 months (−8%) {p.q} + 18% GST</li>
                  <li>6 months (−10%) {p.h} + 18% GST</li>
                  <li>{t('Website included, free')}: {t(p.site)}</li>
                  <li>{t(p.best)}</li>
                </ul>
                {p.rec && <Reframe k="advanced" />}
              </div>
            ))}
          </div>
          <p className="note">
            <strong>Custom plan:</strong> From ₹15,000/month + 18% GST — for organisations
            at national scale. Terms negotiated.
          </p>
          <p className="note">
            Annual billing carries a 16.7% saving — effectively two months free. Your plan
            price is locked for your full term. Any revision applies only with 30 days'
            written notice and is never retrospective.
          </p>
        </div>
      </section>

      <section id="included">
        <div className="wrap">
          <h2>{t('Everything compared')}</h2>
          <div className="tablewrap">
            <table>
              <thead>
                <tr>
                  <th>Feature</th><th>Starter</th><th>Growth</th><th className="rec">Advanced</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map(r => (
                  <tr key={r.feature}>
                    <td className="feat">{t(r.feature)}<InfoTip text={r.tip} /></td>
                    <td>{t(r.starter)}</td>
                    <td>{t(r.growth)}</td>
                    <td className="rec"><strong>{t(r.advanced)}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <h2>{t(YEAR_TWO.title)}</h2>
          <p style={{ color: 'var(--ink-2)', maxWidth: '72ch', lineHeight: 1.7, fontSize: '1.02rem' }}>
            {YEAR_TWO.lead}
          </p>
          <div className="yeartwo">
            {YEAR_TWO.steps.map((st) => (
              <div className="step" key={st.year}>
                <div className="yr">{st.year}</div>
                <div className="pl">{st.plan}</div>
                <p>{st.body}</p>
              </div>
            ))}
          </div>
          <div className="keepbar">
            <p style={{ margin: 0, fontSize: '1.02rem', lineHeight: 1.7 }}>
              {YEAR_TWO.proof} <a href={YEAR_TWO.proofHref}>Compare all three NGO routes</a>.
            </p>
          </div>
          <p className="note" style={{ marginTop: 18 }}>
            <strong>To be exact about what changes.</strong> {YEAR_TWO.caution}
          </p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <h2>{GROWTH_MATH.title}</h2>
          <p className="lede" style={{ color: 'var(--ink-2)', maxWidth: '72ch', lineHeight: 1.75 }}>
            {GROWTH_MATH.lead}
          </p>
          <div className="tablewrap" style={{ marginTop: 20 }}>
            <table>
              <thead><tr><th>Route</th><th>What it is</th><th style={{ textAlign: 'right' }}>Cost</th></tr></thead>
              <tbody>
                {GROWTH_MATH.rows.map(([a, b, c], i) => (
                  <tr key={a}>
                    <td className="feat">{a}</td>
                    <td style={{ color: 'var(--ink-2)' }}>{b}</td>
                    <td style={{ textAlign: 'right', fontWeight: 700, whiteSpace: 'nowrap' }}>{c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="note" style={{ marginTop: 16 }}><strong>{GROWTH_MATH.delta}</strong> For that, the year includes:</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '6px 26px', marginTop: 12 }}>
            {GROWTH_MATH.buys.map((b) => (
              <p key={b} style={{ margin: 0, padding: '8px 0', borderTop: '1px solid var(--rule)', fontSize: '.93rem', lineHeight: 1.55, color: '#3c362c' }}>{b}</p>
            ))}
          </div>
          <p className="note" style={{ marginTop: 20 }}>{GROWTH_MATH.closing}</p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <h2>Your organisation, on your donor's phone.</h2>
          <Reframe k="app" />
          <p className="note">
            This is a <strong>converted application</strong>, not a separately designed
            native product. Once your website is built, its mobile view is moulded into a
            native application shell for Android and iOS. The screens, images and content
            inside the app are your website's own mobile screens — whatever a visitor sees
            on your website on a phone browser is exactly what they will see inside the
            application. What the application adds on top is real: an installable icon,
            working push notifications, in-app toggle controls, and donations completed
            inside the app.
          </p>
          <div className="tablewrap" style={{ marginTop: 22 }}>
            <table>
              <thead><tr><th>Option</th><th>What it covers</th><th>Charge</th></tr></thead>
              <tbody>
                <tr><td className="feat">Android application</td><td>Your website converted into an Android app with icon, push notifications and in-app donations, handed to you ready to publish.</td><td><strong>₹30,000</strong> + 18% GST</td></tr>
                <tr><td className="feat">iOS application</td><td>The same, built for Apple devices and handed to you ready to publish.</td><td><strong>₹30,000</strong> + 18% GST</td></tr>
                <tr><td className="feat">Complete bundle ⭐</td><td>Both applications built <strong>and pushed live onto both stores by our team</strong> — listing, submission, compliance declarations, data-safety forms and review handling managed end to end.</td><td><strong>₹1,00,000</strong> + 18% GST</td></tr>
              </tbody>
            </table>
          </div>
          <p className="note">
            <strong>Why the accounts must be in your name:</strong> a store account holds
            your organisation's legal identity, tax declarations and payout details. It must
            belong to you, permanently, so your application can never be held by anyone else.
            We will not take ownership of it, and no vendor ever should.
          </p>
          <p className="note">
            <strong>Review timeline:</strong> Google and Apple typically take 45 to 60 days
            to approve an application of this type. This period is controlled entirely by
            Google and Apple and sits outside our delivery timeline.
          </p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <h2>Add-ons</h2>
          <p style={{ color: '#666', marginBottom: 20 }}>
            All optional. Added only when you need them, and shown on your invoice as a
            clear line item.
          </p>
          <div className="tablewrap">
            <table>
              <thead><tr><th>Add-on</th><th>Charge</th></tr></thead>
              <tbody>
                {ADDONS.map(a => (
                  <tr key={a.name}>
                    <td className="feat">{a.name}<InfoTip text={a.tip} /></td>
                    <td>{a.charge}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Reframe k="server" />
          <Reframe k="message" />
        </section>

      <section className="alt">
        <div className="wrap">
          <h2>What each part actually does</h2>
          <p style={{ color: 'var(--ink-2)', maxWidth: '70ch', lineHeight: 1.7 }}>
            The comparison above says what you get. This says what it means when you use it.
            Open only the parts you care about.
          </p>
          {MODULES.map((mod) => (
            <div className={`mod${openMod === mod.id ? ' open' : ''}`} key={mod.id}>
              <button
                type="button"
                aria-expanded={openMod === mod.id}
                aria-controls={`mod-${mod.id}`}
                onClick={() => setOpenMod(openMod === mod.id ? null : mod.id)}
              >
                <span className="mtitle">{mod.title}</span>
                <span className="mlead">{mod.lead}</span>
                <span className="msign" aria-hidden="true">+</span>
              </button>
              <div className="modbody" id={`mod-${mod.id}`} role="region">
                <div className="inner">
                  <dl>
                    {mod.points.map(([t, d]) => (
                      <div key={t}><dt>{t}</dt><dd>{d}</dd></div>
                    ))}
                  </dl>
                  <div className="pad" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="wrap">
          <h2>What you would otherwise be paying.</h2>
          <p style={{ color: '#555', maxWidth: '70ch', lineHeight: 1.7 }}>
            Most organisations do not buy one system. They buy six — a website from one
            vendor, a WhatsApp tool from another, an email platform from a third, a donation
            page from a fourth, spreadsheets for donors, and a chartered accountant's time to
            stitch 10BD together every May. Here is the honest arithmetic.
          </p>
          <div className="tablewrap" style={{ marginTop: 22 }}>
            <table>
              <thead><tr><th>What you need</th><th>Bought separately</th><th className="rec">With Give Setu Advanced</th></tr></thead>
              <tbody>
                <tr><td className="feat">A custom-coded website</td><td>₹2,50,000 one-time<span className="det">What commissioning one costs, at our published rate</span></td><td className="rec"><strong>Included in the plan</strong><span className="det">Runs on our platform; not handed over as code</span></td></tr>
                <tr><td className="feat">Server, database &amp; load balancer</td><td>≈ ₹81,600 / year<span className="det">AWS Lightsail list price, $72/month</span></td><td className="rec"><strong>Included</strong></td></tr>
                <tr><td className="feat">A WhatsApp business platform</td><td>₹36,468 – ₹1,12,150 / year<span className="det">Interakt Advanced at the low end, Wati Growth at the high end</span></td><td className="rec"><strong>₹0 platform fee</strong> — per-message cost only</td></tr>
                <tr><td className="feat">Unlimited transactional email</td><td>Metered by every provider<span className="det">Amazon SES bills $0.10 per 1,000, plus a fixed fee on higher tiers</span></td><td className="rec"><strong>Unlimited — free</strong></td></tr>
                <tr><td className="feat">Commission on what you raise</td><td>Typically 2–5% of every rupee</td><td className="rec"><strong>0%, permanently</strong></td></tr>
                <tr><td className="feat"><strong>Those four line items alone</strong></td><td><strong>₹3,68,068 in year one</strong><span className="det">Taking the cheapest verified option in every row</span></td><td className="rec"><strong>₹80,000 + 18% GST</strong></td></tr>
              </tbody>
            </table>
          </div>
          <p className="srcline">
            Every figure above was read off the vendor&rsquo;s own public pricing page on {VERIFIED_ON},
            and each one is linked in full below. USD converted at ₹94.4 = $1. We have deliberately taken
            the cheapest verified option in each row, and left out donor CRM, membership management and
            your chartered accountant&rsquo;s time for 10BD — because we could not source prices for those
            we were willing to publish.
          </p>

          <h2 style={{ marginTop: 44 }}>Check every number yourself.</h2>
          <p style={{ color: 'var(--ink-2)', maxWidth: '72ch', lineHeight: 1.7 }}>
            A pricing page that asks to be trusted is worth very little. Every claim we make about what
            the rest of the market charges is below, with the vendor&rsquo;s own link beside it. Open them.
            If a figure has moved since {VERIFIED_ON}, tell us and we will correct this page.
          </p>

          {BENCHMARKS.map((b) => (
            <div className="bench" key={b.need}>
              <p className="need">{b.need}</p>
              <span className="we">{b.weCharge}</span>
              <p style={{ margin: '0 0 6px', fontSize: '.94rem', lineHeight: 1.65, color: 'var(--ink-2)' }}>{b.weNote}</p>
              {b.market.map((mk) => (
                <div className="vend" key={mk.vendor + mk.cost}>
                  <a href={mk.url} target="_blank" rel="noopener noreferrer nofollow">{mk.vendor}<span className="det">{mk.detail}</span></a>
                  <span className="amt">{mk.cost}</span>
                </div>
              ))}
              {b.total && (
                <div className="vend"><strong>Running that stack yourself</strong><span className="amt">{b.total}</span></div>
              )}
              <div className="reframe"><h4>What that actually means</h4><p>{b.reframe}</p></div>
            </div>
          ))}

          <h2 style={{ marginTop: 44 }}>The commission trap</h2>
          <div className="tablewrap">
            <table>
              <thead><tr><th>Your annual collection</th><th>A platform charging 3%</th><th className="rec">Govindani Give Setu</th><th>You keep</th></tr></thead>
              <tbody>
                <tr><td className="feat">₹20,00,000</td><td>₹60,000 taken</td><td className="rec"><strong>₹0 taken</strong></td><td>₹60,000</td></tr>
                <tr><td className="feat">₹50,00,000</td><td>₹1,50,000 taken</td><td className="rec"><strong>₹0 taken</strong></td><td>₹1,50,000</td></tr>
                <tr><td className="feat">₹1,00,00,000</td><td>₹3,00,000 taken</td><td className="rec"><strong>₹0 taken</strong></td><td>₹3,00,000</td></tr>
              </tbody>
            </table>
          </div>
          <p className="note">
            <strong>Read that line again.</strong> An organisation raising ₹1 crore a year
            on a 3% platform hands over ₹3,00,000 — nearly four times our entire Advanced
            annual fee — for the privilege of collecting its own donations. We take{' '}
            <strong>0%, permanently.</strong>
          </p>
          <Reframe k="commission" />

          <h2 style={{ marginTop: 48 }}>₹80,000 is a first-year number. Work out your second.</h2>
          <p className="lede" style={{ color: 'var(--ink-2)', maxWidth: '74ch', lineHeight: 1.75 }}>
            Advanced is what most organisations start on, because the first year is when the website
            is built and the data comes across. From the second year the only question is volume —
            how many donors you actually work with, and how many receipts, emails and messages go
            out. If that sits inside a smaller plan, move to it. Put your own numbers in.
          </p>
          <SecondYearCalculator />
        </div>
      </section>

      <section>
        <div className="wrap">
          <h2>{ONBOARDING.title}</h2>
          <p style={{ color: 'var(--ink-2)', maxWidth: '72ch', lineHeight: 1.7 }}>{ONBOARDING.lead}</p>
          <div className="onb">
            {ONBOARDING.points.map(([t, d]) => (
              <div key={t}><strong>{t}</strong><span>{d}</span></div>
            ))}
          </div>
          <p className="note" style={{ marginTop: 20 }}>{ONBOARDING.closing}</p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <h2>{t('What we commit to')}</h2>
          <div className="tablewrap">
            <table>
              <thead><tr><th>Commitment</th><th>Standard</th></tr></thead>
              <tbody>
                {TRUST.map(([k, v]) => (
                  <tr key={k}><td className="feat">{t(k)}</td><td>{t(v)}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <h2>How billing actually behaves. Stated before you sign, not after.</h2>
          <p className="note">
            <strong>Usage auto-settlement.</strong> Usage charges — receipt overage, WhatsApp
            messages, email top-ups — accrue as you consume them and settle automatically
            once they cross your plan threshold: <strong>₹500 on Starter · ₹1,500 on Growth ·
            ₹5,000 on Advanced</strong>. If a settlement fails and remains unpaid for 48 hours,
            marketing sends pause until it clears. <strong>Donations, receipt issuing, your
            donor portal and your data export never stop.</strong> Your fundraising is never
            held for a usage bill.
          </p>
          <p className="note">
            <strong>If your growth outgrows shared infrastructure.</strong> Your plan runs on
            shared infrastructure that comfortably carries the great majority of organisations.
            If your donation volume, traffic or data size grows beyond what it can serve
            properly, your organisation moves onto a <strong>dedicated server of its own</strong>{' '}
            at <strong>₹15,000 per month + 18% GST</strong>. We tell you this is approaching
            before it happens, with the usage figures in front of you — never as a surprise on
            an invoice, and never as the reason your donation page slowed down.
          </p>
          <div className="tablewrap" style={{ marginTop: 18 }}>
            <table>
              <thead><tr><th>If a renewal invoice goes unpaid</th><th>What happens</th></tr></thead>
              <tbody>
                <tr><td className="feat">Days 1–7</td><td>Full function. A reminder banner appears and reminders are sent. Nothing is restricted.</td></tr>
                <tr><td className="feat">Days 8–30</td><td>Your admin panel becomes read-only. <strong>Your public website stays live and donations continue to be accepted and receipted.</strong></td></tr>
                <tr><td className="feat">Day 30 onward</td><td>Your public website is replaced with an Under Maintenance page. Billing and export screens remain open, and donors can still download their own past receipts.</td></tr>
                <tr><td className="feat">On payment</td><td>Everything restores instantly and completely. <strong>Nothing is lost at any stage.</strong></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap" style={{ maxWidth: 860 }}>
          <h2>{t('Questions')}</h2>
          {FAQ.map(([q, a], i) => (
            <div className="faq" key={q}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}>
                <span>{t(q)}</span><span aria-hidden="true">{openFaq === i ? '−' : '+'}</span>
              </button>
              {openFaq === i && <p>{a}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="blaze">
        <div className="wrap">
          <p className="kicker">{t(HEADLINE.kicker)}</p>
          <h2>{t(HEADLINE.title)}</h2>
          <p className="lede">{HEADLINE.body}</p>

          {PAINS.map((pn, i) => (
            <div className={`pain${openPain === i ? ' open' : ''}`} key={pn.q}>
              <button
                type="button"
                aria-expanded={openPain === i}
                aria-controls={`pain-${i}`}
                onClick={() => setOpenPain(openPain === i ? null : i)}
              >
                <span className="mark" aria-hidden="true">+</span>
                <span className="qtext">{pn.q}</span>
              </button>
              <div className="painbody" id={`pain-${i}`} role="region">
                <div className="inner">
                  <div className="move">
                    <span className="tag">{pn.tag}</span>
                    <p>{pn.a}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="final">
        <div className="wrap">
          <h2>Every rupee acknowledged. Every donor remembered. Every filing ready.</h2>
          <p style={{ color: '#d6d6d6', maxWidth: '62ch', margin: '14px auto 26px', lineHeight: 1.7 }}>
            Book a twenty-minute demo and we will show you your own numbers inside the
            system — your donors, your receipts, your compliance position — before you
            commit to anything.
          </p>
          <div className="ctas" style={{ justifyContent: 'center' }}>
            <a className="btn btn-primary" href="/contact-us/">Book a demo</a>
            <a className="btn btn-ghost" href="https://wa.me/919201958278">
              Talk to us on WhatsApp — +91 92019 58278
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
