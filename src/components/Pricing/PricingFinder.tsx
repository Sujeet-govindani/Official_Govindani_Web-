import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* ------------------------------------------------------------------
   Full-screen pricing finder. Two ways through it:
     browse — what are you pricing -> category -> foundation -> page
     guide  — category -> budget -> functions -> a recommendation
   ------------------------------------------------------------------ */

type Dest = { to: string; label: string };

const CSS = `
.pfx { position:fixed; inset:0; z-index:2000; display:grid; place-items:center;
  padding:24px; overflow-y:auto;
  background:rgba(6,6,5,.90); backdrop-filter:blur(10px) saturate(.75) brightness(.55);
  -webkit-backdrop-filter:blur(10px) saturate(.75) brightness(.55);
  animation:pfxIn .28s cubic-bezier(.4,0,.2,1); font-family:'Inter',system-ui,sans-serif; }
@keyframes pfxIn { from { opacity:0 } to { opacity:1 } }
.pfx .sheet { width:min(1080px,100%); margin:auto; animation:pfxUp .34s cubic-bezier(.4,0,.2,1); }
@keyframes pfxUp { from { opacity:0; transform:translateY(14px) } to { opacity:1; transform:none } }
.pfx .kick { font-size:.72rem; letter-spacing:.16em; text-transform:uppercase; font-weight:700;
  color:#d8c48d; margin:0 0 8px; }
.pfx h2 { font-family:'Libre Baskerville',Georgia,serif; color:#fff; margin:0 0 6px;
  font-size:clamp(1.5rem,3.4vw,2.3rem); line-height:1.2; }
.pfx .sub { color:#ddd7ca; margin:0 0 26px; line-height:1.6; max-width:62ch; }
.pfx .opts { display:grid; gap:14px; grid-template-columns:repeat(auto-fit,minmax(210px,1fr)); }
.pfx .opt { background:rgba(255,255,255,.07); border:1px solid rgba(255,255,255,.22);
  border-radius:16px; padding:22px; text-align:left; cursor:pointer; color:#fff; font:inherit;
  transition:background .2s, border-color .2s, transform .2s; }
.pfx .opt:hover { background:rgba(216,196,141,.13); border-color:#d8c48d; transform:translateY(-3px); }
.pfx .opt.on { border-color:#d8c48d; background:rgba(216,196,141,.16); }
.pfx .opt b { display:block; font-family:'Libre Baskerville',Georgia,serif; font-size:1.16rem;
  font-weight:400; margin-bottom:6px; }
.pfx .opt span { display:block; color:#cfc8ba; font-size:.87rem; line-height:1.55; }
.pfx .opt em { display:block; color:#d8c48d; font-style:normal; font-weight:700; font-size:.9rem; margin-top:9px; }
.pfx .tagrec { display:inline-block; background:#1e7a45; color:#fff; font-size:.62rem; font-weight:700;
  letter-spacing:.1em; padding:3px 9px; border-radius:999px; margin-bottom:9px; }
.pfx .bar { display:flex; gap:14px; align-items:center; margin-top:26px; flex-wrap:wrap; }
.pfx .lnk { background:none; border:0; color:#d8c48d; cursor:pointer; font:inherit;
  text-decoration:underline; text-underline-offset:4px; padding:0; }
.pfx .x { position:fixed; top:18px; right:20px; width:42px; height:42px; border-radius:50%;
  background:rgba(255,255,255,.1); border:1px solid rgba(255,255,255,.2); color:#fff;
  font-size:1.3rem; cursor:pointer; line-height:1; }
.pfx .x:hover { background:rgba(255,255,255,.2); }
.pfx .crumbs { color:#8f8878; font-size:.8rem; margin-bottom:14px; }
.pfx .crumbs b { color:#d8c48d; font-weight:600; }
.pfx .chk { display:flex; gap:11px; align-items:flex-start; padding:13px 15px; cursor:pointer;
  border:1px solid rgba(255,255,255,.14); border-radius:11px; background:rgba(255,255,255,.04);
  color:#fff; text-align:left; font:inherit; transition:border-color .18s, background .18s; }
.pfx .chk.on { border-color:#d8c48d; background:rgba(216,196,141,.14); }
.pfx .chk i { flex:none; width:19px; height:19px; border-radius:5px; border:1px solid #8f8878;
  display:grid; place-items:center; font-style:normal; font-size:.72rem; margin-top:1px; }
.pfx .chk.on i { background:#d8c48d; border-color:#d8c48d; color:#111; }
.pfx .chk span { font-size:.9rem; line-height:1.45; }
.pfx .grid3 { display:grid; gap:10px; grid-template-columns:repeat(auto-fit,minmax(230px,1fr)); }
.pfx .go { background:#d8c48d; color:#111; border:0; border-radius:9px; padding:14px 30px;
  font-weight:700; font-size:1rem; cursor:pointer; font-family:inherit; }
.pfx .go[disabled] { opacity:.4; cursor:not-allowed; }
.pfx .rec { background:rgba(255,255,255,.06); border:1px solid #d8c48d; border-radius:16px; padding:26px; }
.pfx .rec .why { color:#c9c3b6; line-height:1.7; margin:12px 0 0; }
.pfx .rec .why b { color:#fff; }
@media (prefers-reduced-motion:reduce){ .pfx, .pfx .sheet { animation:none } .pfx .opt:hover { transform:none } }
.pfx .opt.tinted { border-color:color-mix(in srgb, var(--accent) 55%, transparent);
  background:color-mix(in srgb, var(--accent) 20%, rgba(255,255,255,.05)); }
.pfx .opt.tinted:hover { border-color:var(--accent);
  background:color-mix(in srgb, var(--accent) 34%, rgba(255,255,255,.06)); }
.pfx .opt .ico { display:block; font-size:1.5rem; line-height:1; margin-bottom:10px; }
.pfx .opts-ind { grid-template-columns:repeat(auto-fit,minmax(190px,1fr)); }

/* ---- function picker: dense enough that 40+ fit in one view ---- */
.pfx .tools { display:flex; flex-wrap:wrap; gap:8px; align-items:center; margin:0 0 14px; }
.pfx .tool { background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.2);
  color:#fff; font:inherit; font-size:.82rem; font-weight:600; padding:9px 14px;
  border-radius:8px; cursor:pointer; transition:background .18s, border-color .18s; }
.pfx .tool:hover { background:rgba(216,196,141,.2); border-color:#d8c48d; }
.pfx .tool.ghost { background:none; color:#a49b8b; }
.pfx .tool.typeit { margin:0 0 14px; }
.pfx .mic { display:inline-flex; align-items:center; gap:8px; background:#d8c48d; color:#111;
  border:0; font:inherit; font-size:.84rem; font-weight:700; padding:9px 16px; border-radius:8px;
  cursor:pointer; }
.pfx .mic.on { background:#c0392b; color:#fff; animation:pfxPulse 1.1s ease-in-out infinite; }
@keyframes pfxPulse { 0%,100% { opacity:1 } 50% { opacity:.62 } }
.pfx .count { font-size:.8rem; color:#a49b8b; margin-left:auto; }
.pfx .heard { margin:0 0 14px; }
.pfx .heard textarea { width:100%; background:rgba(255,255,255,.06);
  border:1px solid rgba(255,255,255,.2); border-radius:10px; color:#fff; font:inherit;
  font-size:.9rem; line-height:1.5; padding:11px 13px; resize:vertical; }
.pfx .heard textarea::placeholder { color:#8f8878; }
.pfx .heard .matched { margin:9px 0 0; font-size:.88rem; color:#cfc8ba; }
.pfx .heard .matched strong { color:#d8c48d; }
.pfx .heard .err { margin:0 0 8px; font-size:.85rem; color:#e5a3a3; }

.pfx .chips { display:grid; gap:6px; align-items:start; grid-template-columns:repeat(auto-fill,minmax(196px,1fr)); }
.pfx .chip { display:flex; align-items:center; gap:9px; text-align:left; font:inherit;
  font-size:.8rem; line-height:1.25; padding:7px 10px; border-radius:8px; cursor:pointer;
  white-space:nowrap; overflow:hidden;
  background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.14); color:#e8e3d9;
  transition:background .15s, border-color .15s, color .15s; }
.pfx .chip:hover { border-color:#d8c48d; background:rgba(216,196,141,.12); }
.pfx .chip.on { border-color:#d8c48d; background:rgba(216,196,141,.2); color:#fff; font-weight:600; }
.pfx .chip > span { overflow:hidden; text-overflow:ellipsis; }
.pfx .chip i { flex:none; width:17px; height:17px; border-radius:5px; font-style:normal;
  border:1.5px solid #8f8878; display:grid; place-items:center; font-size:.7rem; color:transparent;
  transition:background .15s, border-color .15s, color .15s; }
.pfx .chip.on i { background:#d8c48d; border-color:#d8c48d; color:#111; }
@media (max-width:640px){
  .pfx .chips { grid-template-columns:1fr 1fr; }
  .pfx .chip { font-size:.78rem; padding:8px 9px; }
  .pfx .count { margin-left:0; }
}
.pfx .lang { background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.2);
  color:#fff; font:inherit; font-size:.82rem; font-weight:600; padding:9px 10px; border-radius:8px;
  cursor:pointer; }
.pfx .lang option { background:#161513; color:#fff; }
.pfx .tool.star { border-color:#d8c48d; color:#d8c48d; }
.pfx .go.basis { margin-top:11px; padding:11px 22px; font-size:.92rem; }
.pfx .chipwrap { position:relative; display:flex; align-items:stretch;
  border:1px solid rgba(255,255,255,.14); border-radius:8px; background:rgba(255,255,255,.05);
  transition:background .15s, border-color .15s; }
.pfx .chipwrap:hover { border-color:#d8c48d; background:rgba(216,196,141,.12); }
.pfx .chipwrap.on { border-color:#d8c48d; background:rgba(216,196,141,.2); }
.pfx .chipwrap .chip { flex:1; border:0; background:none; border-radius:8px 0 0 8px; min-width:0; }
.pfx .chipwrap.on .chip { color:#fff; font-weight:600; }
.pfx .whybtn { flex:none; width:26px; border:0; border-left:1px solid rgba(255,255,255,.12);
  background:none; color:#8f8878; font:inherit; font-size:.72rem; font-weight:700; cursor:pointer;
  border-radius:0 8px 8px 0; font-style:italic; }
.pfx .whybtn:hover { background:rgba(216,196,141,.24); color:#d8c48d; }
.pfx .whybox { position:absolute; z-index:20; top:calc(100% + 6px); left:0; width:max-content;
  max-width:min(330px,74vw); background:#0f0e0d; border:1px solid #d8c48d; border-radius:10px;
  padding:12px 14px; font-size:.83rem; line-height:1.55; color:#ddd7ca; white-space:normal;
  box-shadow:0 14px 34px rgba(0,0,0,.55); }
.pfx .whybox b { display:block; color:#d8c48d; margin-bottom:5px; font-size:.86rem; }
`;

type Feat = { id: string; label: string; kw: string[]; rec?: boolean; why?: string };

/* The NGO list is the published Give Setu capability set, condensed to the
   things a trustee would actually recognise. `kw` drives spoken-requirement
   matching; `rec` is the set we pre-select when someone asks us to choose. */
const FEATURES: Record<string, Feat[]> = {
  ngo: [
    { id: 'donations',   label: 'Online donations',        kw: ['donation','donate','collect','fundrais','contribut'], why: 'A donation page in your own name, with the gateway connected and tested before launch. Money settles from the gateway to your bank, never through us.', rec: true },
    { id: 'recurring',   label: 'Recurring donations',  kw: ['recurring','monthly','subscription','mandate','sip','regular giving'], why: 'A donor authorises once and gives every month. Only the donor can change the date or skip a month — your office cannot do it for them, which is what makes them comfortable committing.', rec: true },
    { id: 'receipts',    label: '80G receipts',      kw: ['80g','receipt','tax exempt','acknowledg'], why: 'The moment a donation lands, an immutable 80G receipt is issued, numbered and stored, and reaches the donor in under four seconds.', rec: true },
    { id: 'numbering',   label: 'Gapless numbering',    kw: ['numbering','serial','gapless','sequence','register'], why: 'RCP/2026-27/000481 format, resetting on 1 April, with no gaps ever — because a gap in the register is the first thing an assessing officer asks about.' },
    { id: 'qr',          label: 'QR-verified receipts',         kw: ['qr','verify','verification','authentic','genuine'], why: 'Every receipt carries a QR code opening a page that confirms it is genuine, with amount, date and your name. Your donor’s accountant verifies it without calling you.' },
    { id: 'certs',       label: 'Donor certificates',     kw: ['certificate','pdf','download'], why: 'An auto-generated acknowledgement certificate the donor downloads themselves, in your branding.' },
    { id: 'amounts',     label: 'Custom amounts',      kw: ['amount','preset','custom amount','any amount'], why: 'Quick-select buttons at ₹500, ₹1,000 and ₹5,000, and a free-text box for any other amount.' },
    { id: 'refunds',     label: 'Refunds',     kw: ['refund','cancel','reversal','return money'], why: 'A refund cancels the original receipt with a watermark, keeps its number in the register forever, and links the two permanently. There is no delete button anywhere.' },
    { id: 'tenbd',       label: '10BD return',         kw: ['10bd','return','filing','file','income tax','statement'], why: 'Year-round readiness tracking, PAN validation before filing, and a portal-ready export. You find the problem in October, not on the last night of May.', rec: true },
    { id: 'tenbe',       label: '10BE dispatch', kw: ['10be','certificate dispatch','send certificate'], why: 'Every 10BE certificate goes out to every donor automatically by email and WhatsApp. What took three weeks takes one click.', rec: true },
    { id: 'pan',         label: 'PAN recovery',       kw: ['pan','missing pan','kyc','tax id'], why: 'Donors missing a PAN get a polite WhatsApp and email sequence, and a valid reply writes the PAN into the record automatically after checksum validation.' },
    { id: 'donorcrm',    label: 'Donor 360 records',kw: ['donor record','history','crm','database','profile','who gave'], why: 'One page per donor: full giving timeline, lifetime value, every receipt, every note, and every message you have ever sent them.', rec: true },
    { id: 'segments',    label: 'Donor segments',kw: ['segment','filter','group','list','target'], why: 'Combine any conditions you like, or type what you want in plain language and let the system build the list.' },
    { id: 'merge',       label: 'Duplicate merge',        kw: ['duplicate','merge','same donor','clean'], why: 'Candidates surfaced by phone, PAN or email. Merging keeps both giving histories under one master record — nothing is lost.' },
    { id: 'lapsed',      label: 'Lapsed donor alerts',      kw: ['lapsed','churn','stopped','inactive','drifting','retention'], why: 'Every donor scored on the risk of going quiet, surfaced before they are lost rather than after, ranked by what they were worth to you.' },
    { id: 'sleeping',    label: 'Sleeping donors free',  kw: ['sleeping','legacy','old donors','archive'], why: 'A legacy database of two lakh contacts costs nothing to hold. You are charged for donors you actively work with, never for donors you merely store.' },
    { id: 'members',     label: 'Membership renewals',     kw: ['member','membership','renewal','subscription plan'], why: 'Plans, fees and renewals in one flow. Reminders at thirty days, seven days and on the day, then grace, then automatic suspension — nobody chased by hand.' },
    { id: 'idcards',     label: 'Digital ID cards',  kw: ['id card','identity card','card','badge'], why: 'Membership cards and certificates rendered on demand behind a QR verification page, with a distinct design per plan on Advanced.' },
    { id: 'cases',       label: 'Case pages',       kw: ['case','beneficiar','patient','child','story','individual'], why: 'A page per beneficiary with its own story, media and donation route, so a giver funds a person rather than a general appeal.' },
    { id: 'casebuilt',   label: 'Cases written for you',    kw: ['write','content','copywriting','build case','our team'], why: 'Our content team writes and builds the case pages for you — 2, 5 or 10 a month by plan, with two revisions included.' },
    { id: 'campaigns',   label: 'Goal tracker',  kw: ['campaign','goal','target','thermometer','progress','appeal'], why: 'A campaign page with a live goal thermometer, a public recognition wall, and per-edition tracking so you know what actually raised the money.', rec: true },
    { id: 'tracking',    label: 'Tracking links',  kw: ['tracking','which link','attribution','source','utm'], why: 'Know precisely which link, poster or WhatsApp forward produced which donation — tracked fact, not guesswork.' },
    { id: 'matching',    label: 'Matching pledges',    kw: ['match','doubl','patron','pledge'], why: 'Run “every rupee doubled by our patron until midnight” with a live matched counter.' },
    { id: 'festival',    label: 'Festival kits',       kw: ['festival','diwali','navratri','ekadashi','amavasya','tithi','shradh'], why: 'A rolling radar of the next forty-five days including Amavasya, Ekadashi and Shradh. Pick one and the whole kit is generated — page copy, a five-message WhatsApp series, two emails and poster lines, in Hindi and English.' },
    { id: 'templates',   label: 'New templates monthly', kw: ['template','design','new page','layout','refresh'], why: 'New campaign page designs released every month for as long as you are on a plan — 2 a month on Starter, 3 on Growth, all of them on Advanced.' },
    { id: 'disaster',    label: 'Disaster appeals',    kw: ['disaster','flood','earthquake','emergency','relief','crisis'], why: 'Disaster-relief templates held ready, so when a flood or an earthquake happens you publish the appeal the same day instead of briefing a designer.' },
    { id: 'whatsapp',    label: 'WhatsApp broadcasts',      kw: ['whatsapp','wa','message','broadcast'], why: 'A verified WhatsApp number in your organisation’s name, with Meta-approved templates and automatic opt-out handling. No platform fee — you pay ₹1.00 a message and nothing else.', rec: true },
    { id: 'wareceipt',   label: 'Receipts on WhatsApp',       kw: ['whatsapp receipt','receipt on whatsapp'], why: 'The 80G receipt delivered on WhatsApp as well as email, at the same per-message rate.' },
    { id: 'email',       label: 'Unlimited email',kw: ['email','mail','confirmation'], why: 'Receipts, confirmations, renewal notices and certificates are never metered or charged, on any plan.', rec: true },
    { id: 'emailcamp',   label: 'Email campaigns',              kw: ['newsletter','email campaign','bulk email','mailer'], why: 'Recipient-counted campaigns, with the exact count, your remaining quota and the top-up cost shown before you press send.' },
    { id: 'sms',         label: 'SMS at cost',                  kw: ['sms','text message'], why: 'Passed through at the carrier rate with no margin added by us.' },
    { id: 'website',     label: 'Website included',             kw: ['website','site','web','page','online presence'], why: 'Built, hosted, secured with SSL and maintained by us for your whole term, with no developer invoice each time a page changes.', rec: true },
    { id: 'coded',       label: 'Custom-coded design',    kw: ['custom design','bespoke','unique design','coded'], why: 'Advanced receives a fully custom-coded design built to your own layout, rather than our CMS portal. It runs on our platform and is not handed over as code.' },
    { id: 'app',         label: 'Mobile app',     kw: ['app','android','ios','mobile app','play store'], why: 'Your website converted into an Android and iOS application with your icon, working push notifications and in-app donations. Advanced only, and a one-time build charge.' },
    { id: 'microsite',   label: 'Campaign microsites',          kw: ['microsite','separate site','landing page'], why: 'A separate campaign site under its own address — one included on Advanced.' },
    { id: 'branches',    label: 'Branch reporting',       kw: ['branch','chapter','location','unit','multiple offices'], why: 'Every donation, receipt, member and case carries a branch tag. Branch users see only their own branch, while 10BD stays correctly at entity level with a branch breakup annexure.' },
    { id: 'portal',      label: 'Donor & member portal',  kw: ['portal','login','self service','own receipt'], why: 'Donors and members log in with an OTP to see their history, download their own receipts and renew, without calling your office.' },
    { id: 'roles',       label: 'Multi-admin roles',            kw: ['admin','staff','role','permission','team access'], why: 'Multiple staff with individual permissions, and field-level masking by role on Advanced.' },
    { id: 'auditor',     label: 'CA / auditor access',          kw: ['auditor','ca','chartered','accountant','audit access'], why: 'A read-only seat for your chartered accountant or auditor — free on Growth and Advanced.' },
    { id: 'audit',       label: 'Audit trail',         kw: ['audit trail','log','who changed','history of changes'], why: 'Every change recorded permanently with who, what, when and from where. Append-only; there is no delete facility, not even for us.' },
    { id: 'export',      label: 'Free data export',   kw: ['export','download data','excel','csv','take my data'], why: 'Everything you hold, exportable in full at any time, free, including on the way out. There is no exit fee and no export charge.', rec: true },
    { id: 'ai',          label: 'AI insights',    kw: ['ai','insight','predict','forecast','analytics','report'], why: 'Churn risk, lapsed donors ranked by value, retention cohorts, festival year-on-year, channel attribution, collection forecasting and anomaly alerts. Available from Growth.' },
  ],
  ecom: [
    { id: 'store',    label: 'Cart and checkout', kw: ['product','cart','checkout','sell','shop','store'], rec: true },
    { id: 'catalogue',label: 'Filters and search', kw: ['category','filter','search','catalogue','browse'], rec: true },
    { id: 'variants', label: 'Product variants',    kw: ['variant','size','colour','color','option'] },
    { id: 'cod',      label: 'Cash on delivery',            kw: ['cod','cash on delivery','partial'] },
    { id: 'coupons',  label: 'Coupons and offers',          kw: ['coupon','discount','offer','promo','sale'], rec: true },
    { id: 'loyalty',  label: 'Loyalty points',              kw: ['loyalty','points','reward'] },
    { id: 'referral', label: 'Referral codes',              kw: ['referral','refer','affiliate'] },
    { id: 'bogo',     label: 'Flash sales, BOGO',        kw: ['flash','bogo','buy one','deal'] },
    { id: 'returns',  label: 'Returns and refunds',         kw: ['return','refund','exchange'], rec: true },
    { id: 'tracking', label: 'Order tracking',              kw: ['track','shipment','delivery status','courier'], rec: true },
    { id: 'stock',    label: 'Stock alerts',  kw: ['stock','inventory','out of stock','alert'], rec: true },
    { id: 'bookings', label: 'Bookings',    kw: ['booking','appointment','slot','schedule','puja'] },
    { id: 'bundles',  label: 'Product bundles',             kw: ['bundle','combo','kit','package'] },
    { id: 'invoices', label: 'Invoices and GST',            kw: ['invoice','gst','tax','bill'] },
    { id: 'dashboard',label: 'Customer accounts',       kw: ['account','dashboard','my orders','wishlist'] },
    { id: 'analytics',label: 'Sales analytics',             kw: ['analytics','revenue','report','best selling'] },
    { id: 'emails',   label: 'Automated emails',     kw: ['email','notification','confirmation'], rec: true },
    { id: 'whatsapp', label: 'WhatsApp updates',      kw: ['whatsapp','message'] },
    { id: 'own',      label: 'No monthly fee',     kw: ['own','no monthly','no subscription','one time','buy once'], rec: true },
    { id: 'fast',     label: 'Fastest to launch',    kw: ['fast','quick','urgent','soon','immediately'] },
    { id: 'small',    label: 'Small catalogue',kw: ['small','simple','few products','basic'] },
    { id: 'custom',   label: 'Beyond any platform',kw: ['custom','bespoke','unique','not possible','special'] },
  ],
  other: [
    { id: 'pages',    label: 'Service pages',   kw: ['service','page','contact','about'], rec: true },
    { id: 'enquiry',  label: 'Enquiry forms', kw: ['enquiry','inquiry','form','lead','contact form'], rec: true },
    { id: 'whatsapp', label: 'WhatsApp button',     kw: ['whatsapp','chat','message'], rec: true },
    { id: 'blog',     label: 'Blog and news',      kw: ['blog','news','article','update','publish'] },
    { id: 'gallery',  label: 'Gallery and photos',          kw: ['gallery','photo','image','video'], rec: true },
    { id: 'team',     label: 'Team & testimonials',       kw: ['team','staff','testimonial','review','doctor'] },
    { id: 'catalogue',label: 'Browse & enquire',kw: ['catalogue','product','listing','project','property','crop'] },
    { id: 'events',   label: 'Event registration',    kw: ['event','registration','workshop','seminar'] },
    { id: 'booking',  label: 'Paid bookings',kw: ['booking','appointment','consultation','session','reading','slot'] },
    { id: 'payments', label: 'Online payments',        kw: ['payment','pay','razorpay','online payment','fee'] },
    { id: 'routing',  label: 'Routed enquiries', kw: ['route','routing','different inbox','department','branch'] },
    { id: 'multiadmin',label: 'Multiple staff',   kw: ['admin','staff','login','role','permission'] },
    { id: 'maps',     label: 'Maps & locations', kw: ['map','location','branch','address','direction'] },
    { id: 'seo',      label: 'SEO and analytics',   kw: ['seo','google','rank','analytics','traffic'], rec: true },
    { id: 'multilang',label: 'Multiple languages',      kw: ['language','hindi','marathi','bilingual','translate'] },
    { id: 'portal',   label: 'Customer portal', kw: ['portal','login','customer area','dashboard'] },
    { id: 'integrate',label: 'Integrations',   kw: ['integrat','api','tally','erp','existing system','crm'] },
    { id: 'custom',   label: 'Bespoke design',      kw: ['custom','bespoke','unique','entirely mine','own design'] },
  ],
};

/* Real matching, not a decorative number. A spoken or typed description is
   split into clauses; a clause counts as matched when it contains a keyword
   from a published capability. The percentage shown is matched clauses over
   clauses we could read — so it is answerable if a client asks how we got it. */
export const LANGS = [
  { code: 'en-IN', label: 'English' },
  { code: 'hi-IN', label: 'हिन्दी' },
  { code: 'mr-IN', label: 'मराठी' },
  { code: 'gu-IN', label: 'ગુજરાતી' },
  { code: 'bn-IN', label: 'বাংলা' },
  { code: 'ta-IN', label: 'தமிழ்' },
  { code: 'te-IN', label: 'తెలుగు' },
  { code: 'kn-IN', label: 'ಕನ್ನಡ' },
];

/* Requirements arrive in Hindi, Marathi and Hinglish far more often than in
   clean English, so the matcher carries the vocabulary people actually use —
   Devanagari and Roman transliteration together, keyed by function id. */
const I18N: Record<string, string[]> = {
  donations:  ['दान','daan','chanda','चंदा','donesan','paisa','पैसा','fund','निधि','nidhi'],
  recurring:  ['मासिक','masik','har mahine','हर महीने','maheena','monthly dan','niyamit','नियमित'],
  receipts:   ['रसीद','raseed','rasid','पावती','pavti','pohoch','receipt dena'],
  certs:      ['प्रमाण','praman','patra','पत्र','certificate dena','सर्टिफिकेट'],
  tenbd:      ['रिटर्न','return bharna','आयकर','aaykar','income tax bharna','filing karna'],
  donorcrm:   ['दानदाता','daata','दाता','donor list','sanstha ke log','डेटाबेस','database'],
  members:    ['सदस्य','sadasya','sadasyata','सदस्यता','membar','member banana'],
  cases:      ['केस','मरीज','mareez','labharthi','लाभार्थी','bachcha','बच्चा','kahani','कहानी'],
  campaigns:  ['अभियान','abhiyan','mohim','मोहीम','campaign chalana','lakshya','लक्ष्य'],
  festival:   ['त्योहार','tyohar','diwali','दिवाली','navratri','नवरात्रि','ganpati','गणपती','utsav','उत्सव'],
  disaster:   ['आपदा','aapda','baadh','बाढ़','bhookamp','भूकंप','sankat','संकट','raahat','राहत'],
  whatsapp:   ['व्हाट्सएप','whatsapp bhejna','sandesh','संदेश','message bhejna'],
  email:      ['ईमेल','email bhejna','मेल'],
  sms:        ['एसएमएस','sms bhejna','massage'],
  website:    ['वेबसाइट','website banana','साइट','sanstha ki website','online'],
  app:        ['मोबाइल ऐप','mobile app banana','एप','application banana'],
  portal:     ['पोर्टल','portal','login karna','लॉगिन'],
  volunteers: ['स्वयंसेवक','swayamsevak','sevak','सेवक','volunteer jodna'],
  branches:   ['शाखा','shakha','branch','कार्यालय','karyalay','multiple jagah'],
  roles:      ['स्टाफ','staff','karmchari','कर्मचारी','admin banana'],
  auditor:    ['लेखा','lekha','ca','chartered','auditor','अंकेक्षक'],
  export:     ['निर्यात','export karna','data nikalna','डेटा','excel nikalna'],
  ai:         ['रिपोर्ट','report','vishleshan','विश्लेषण','analysis'],
  // e-commerce
  store:      ['दुकान','dukan','bechna','बेचना','saman','सामान','product bechna','ऑनलाइन दुकान'],
  cod:        ['कैश ऑन डिलीवरी','cash on delivery','डिलीवरी पर'],
  coupons:    ['छूट','chhoot','discount dena','कूपन','offer dena'],
  tracking:   ['ट्रैकिंग','order kahan','कहाँ है','shipment'],
  bookings:   ['बुकिंग','booking','samay','समय','appointment lena','puja','पूजा'],
  // generic
  enquiry:    ['पूछताछ','poochtach','enquiry','sampark','संपर्क','form bharna'],
  gallery:    ['फोटो','photo','तस्वीर','tasveer','gallery banana','video'],
  payments:   ['भुगतान','bhugtan','payment lena','पेमेंट','fees','शुल्क'],
  booking:    ['बुकिंग','booking lena','consultation','परामर्श','paramarsh','sitting'],
  events:     ['कार्यक्रम','karyakram','event','आयोजन','aayojan'],
  multilang:  ['भाषा','bhasha','hindi mein','मराठी','marathi mein','do bhasha'],
};

export function matchRequirement(text: string, feats: Feat[]) {
  // \p{M} matters: Devanagari vowel signs are Marks, not Letters. Without it
  // "मासिक" is stripped to "मसक" and no Hindi keyword can ever match.
  const clean = text.toLowerCase().replace(/[^\p{L}\p{N}\p{M}\s,.&]/gu, ' ');
  const clauses = clean
    .split(/,|\.|\band\b|\balso\b|\bthen\b|\bplus\b|और|तथा|फिर|आणि|\baur\b|\bphir\b|\bani\b/)
    .map((c) => c.trim())
    .filter((c) => c.length > 3);
  // Match at word starts, not anywhere in the string. Plain `includes` made
  // "whatsapp" match the keyword "app" and tick Mobile app. Keywords are still
  // allowed to be stems — "donat" matches donation and donate — because the
  // boundary is only required at the front.
  const esc = (k: string) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const has = (clause: string, kw: string) =>
    /^[\x00-\x7F]+$/.test(kw)
      ? new RegExp(`\\b${esc(kw)}`).test(clause)   // \b is ASCII-only, so Latin only
      : clause.includes(kw);                        // Devanagari and other scripts
  const hit = new Set<string>();
  let matchedClauses = 0;
  for (const c of clauses) {
    let any = false;
    for (const f of feats) {
      const words = [...f.kw, ...(I18N[f.id] ?? [])];
      if (words.some((k) => has(c, k))) { hit.add(f.id); any = true; }
    }
    if (any) matchedClauses += 1;
  }
  const pct = clauses.length ? Math.round((matchedClauses / clauses.length) * 100) : 0;
  return { ids: [...hit], matchedClauses, clauses: clauses.length, pct };
}

const INDUSTRIES = [
  { id: 'ngo',      features: 'ngo',   icon: '🤝', accent: '#1e7a45',
    b: 'NGO or non-profit', s: 'Donations, 80G receipts, causes, volunteers, compliance' },
  { id: 'ecom',     features: 'ecom',  icon: '🛒', accent: '#b3924f',
    b: 'E-commerce', s: 'Products, cart, checkout, delivery' },
  { id: 'realestate', features: 'other', icon: '🏢', accent: '#3f6c9b',
    b: 'Real estate', s: 'Projects, listings, site visits and enquiries that convert' },
  { id: 'hospital', features: 'other', icon: '🏥', accent: '#4a8f8a',
    b: 'Hospital or clinic', s: 'Departments, doctors, appointments and patient trust' },
  { id: 'agriculture', features: 'other', icon: '🌾', accent: '#7a8f3f',
    b: 'Agriculture', s: 'Produce, dealers, catalogues and enquiries' },
  { id: 'numerology', features: 'other', icon: '🔢', accent: '#7b5ea7',
    b: 'Numerology', s: 'Readings, consultations and paid bookings' },
  { id: 'tarot',    features: 'other', icon: '🔮', accent: '#8f4f7b',
    b: 'Tarot reading', s: 'Sessions, packages and online booking' },
  { id: 'other',    features: 'other', icon: '✳️', accent: '#5a5348',
    b: 'Every other industry', s: 'Manufacturing, consultants, schools, hospitality and the rest' },
];



/* Recommendation is biased by industry, deliberately:
   an NGO leans to Give Setu, a store leans to WooCommerce or coded, and
   Shopify is only suggested when speed and simplicity are what was asked for. */
function recommend(industry: string, fns: string[]): { to: string; label: string; title: string; price: string; why: string } {
  const has = (x: string) => fns.includes(x);

  if (industry === 'ngo') {
    const systemish = ['receipts', 'compliance', 'donorcrm', 'members', 'cases', 'campaigns', 'whatsapp'].filter(has).length;
    if (has('brochure') && systemish === 0) {
      return { to: '/pricing/ngo-website', label: 'See the WordPress NGO build',
        title: 'WordPress NGO website', price: '₹35,000 + GST, one-time',
        why: 'You want the organisation represented properly, not a donation engine behind it. A one-time WordPress build does exactly that, and you own it outright.' };
    }
    if (has('custom') && systemish <= 1) {
      return { to: '/pricing/ngo-website', label: 'See the custom-coded option',
        title: 'Custom-coded NGO site', price: 'Quoted to scope',
        why: 'You want the design and behaviour to be entirely yours, without much of the receipting machinery. That is a coded build, quoted against your scope.' };
    }
    return { to: '/pricing/ngo-os', label: 'See Give Setu', title: 'Give Setu',
      price: 'From ₹25,000 a year + GST',
      why: systemish >= 3
        ? 'What you have described is not website work — it is an operating system. Receipts, compliance, donors and campaigns all belong in one register, and the website comes inside the plan rather than as a separate bill.'
        : 'Even for donations alone, the receipt is the hard part — numbered, immutable, and defensible in an assessment. Give Setu issues it in under four seconds, takes 0% commission, and includes the website in the plan.' };
  }

  if (industry === 'ecom') {
    if (has('custom')) {
      return { to: '/pricing/websites?track=coded-ecom', label: 'See the custom-coded build',
        title: 'Custom-coded store', price: '₹2,50,000 + GST, one-time',
        why: 'You named behaviour no platform will let you build. That is the honest reason to code it — and it runs on your own server with no monthly fee to anyone.' };
    }
    const wooish = ['coupons', 'cod', 'returns', 'tracking', 'bookings', 'own'].filter(has).length;
    if (wooish >= 1) {
      return { to: '/pricing/websites?track=wp-ecom', label: 'See the WooCommerce build',
        title: 'WooCommerce with our plugin', price: '₹48,000 + GST, one-time',
        why: 'Coupons, loyalty, partial COD, returns and order tracking are exactly what our plugin covers. Bought as Shopify apps they are a monthly bill that never stops; here it is one payment and the installation is yours.' };
    }
    if (has('fast') || has('small')) {
      return { to: '/pricing/websites?track=shopify-ecom', label: 'See the Shopify build',
        title: 'Shopify store', price: 'From ₹75,000 + GST, plus Shopify’s monthly fee',
        why: 'A straightforward catalogue with nothing unusual, and speed matters most — that is the one case where renting the platform is the right call. Read the monthly-fee table before you commit.' };
    }
    return { to: '/pricing/websites?track=wp-ecom', label: 'See the WooCommerce build',
      title: 'WooCommerce with our plugin', price: '₹48,000 + GST, one-time',
      why: 'For a store you intend to keep, buying the installation once beats renting it every month — and our plugin covers what Shopify would charge you in apps.' };
  }

  const appish = ['portal', 'integrate', 'custom'].filter(has).length;
  if (appish >= 1) {
    return { to: '/pricing/websites?track=coded-generic', label: 'See the custom-coded option',
      title: 'Custom-coded', price: 'From ₹2,50,000 + GST',
      why: 'A portal, an integration or behaviour that is entirely yours is software with a website attached, not a website. It is quoted against what it has to do.' };
  }
  const heavy = ['catalogue', 'events', 'routing', 'multiadmin'].filter(has).length;
  if (heavy >= 1) {
    return { to: '/pricing/websites?track=wp-generic', label: 'See the three WordPress plans',
      title: 'WordPress — Advance', price: '₹45,000 + GST, one-time',
      why: 'A catalogue, event registration, routed enquiries or several staff logging in separately all sit in the Advance tier. Everything below it is included.' };
  }
  if (has('blog') || has('gallery')) {
    return { to: '/pricing/websites?track=wp-generic', label: 'See the three WordPress plans',
      title: 'WordPress — Mid', price: '₹35,000 + GST, one-time',
      why: 'Content you intend to keep publishing, and sections your own team edits, is the Mid tier. It is where most businesses land.' };
  }
  return { to: '/pricing/websites?track=wp-generic', label: 'See the three WordPress plans',
    title: 'WordPress — Short', price: '₹25,000 + GST, one-time',
    why: 'A credible presence with an enquiry route, and nothing you are paying for that you would not use.' };
}

export default function PricingFinder({ open, onClose }: { open: boolean; onClose: () => void }) {
  const nav = useNavigate();
  const [step, setStep] = useState<'root' | 'industry' | 'features' | 'rec'>('root');
  const [industry, setIndustry] = useState('');
  const [fns, setFns] = useState<string[]>([]);
  const [listening, setListening] = useState(false);
  const [spoken, setSpoken] = useState('');
  const [match, setMatch] = useState<{ matchedClauses: number; clauses: number; pct: number } | null>(null);
  const [micErr, setMicErr] = useState('');
  const [lang, setLang] = useState('en-IN');
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [why, setWhy] = useState<string | null>(null);
  const recog = useRef<any>(null);

  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', k);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', k); document.body.style.overflow = prev; };
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setStep('root'); setIndustry(''); setFns([]);
      setSpoken(''); setMatch(null); setMicErr(''); setListening(false);
      setMatchedIds([]); setLang('en-IN'); setWhy(null);
    }
  }, [open]);
  if (!open) return null;

  const go = (to: string) => {
    try {
      const feats = FEATURES[featureKey] ?? [];
      sessionStorage.setItem('gs.pick', JSON.stringify({
        industry, industryLabel,
        picked: fns.map((id) => feats.find((f) => f.id === id)?.label).filter(Boolean),
        ids: fns,
        described: spoken.trim(),
      }));
    } catch { /* private mode — the page simply shows its default */ }
    onClose();
    nav(to);
  };
  const Opt = ({ b, s: sub2, extra, rec, icon, accent, onClick }:
    { b: string; s: string; extra?: string; rec?: boolean; icon?: string; accent?: string; onClick: () => void }) => (
    <button
      className={`opt${accent ? ' tinted' : ''}`}
      type="button"
      onClick={onClick}
      style={accent ? { ['--accent' as string]: accent } : undefined}
    >
      {rec && <span className="tagrec">RECOMMENDED</span>}
      {icon && <span className="ico" aria-hidden="true">{icon}</span>}
      <b>{b}</b><span>{sub2}</span>{extra && <em>{extra}</em>}
    </button>
  );

  const ind = INDUSTRIES.find((i) => i.id === industry);
  const industryLabel = ind?.b ?? '';
  const featureKey = ind?.features ?? 'other';

  /* every platform available to the chosen industry, so the suggestion can be overridden */
  const ALTERNATIVES: Record<string, { b: string; s: string; extra: string; to: string }[]> = {
    ngo: [
      { b: 'Give Setu', s: 'Donations, 80G receipts, donors, members, compliance — website included', extra: 'From ₹25,000 / year', to: '/pricing/ngo-os' },
      { b: 'NGO WordPress', s: '18 pages, 35 features, Razorpay donations. Bought once, owned outright', extra: '₹35,000 + GST', to: '/pricing/ngo-website' },
      { b: 'Compare all three', s: 'WordPress, Give Setu and custom-coded side by side, line by line', extra: 'All prices on one page', to: '/pricing/ngo-website' },
    ],
    ecom: [
      { b: 'Shopify', s: 'Fastest to launch, and a monthly fee for as long as you trade', extra: 'From ₹75,000 + GST', to: '/pricing/websites?track=shopify-ecom' },
      { b: 'WooCommerce', s: 'Our plugin replaces the paid apps. One payment, and it is yours', extra: '₹48,000 + GST', to: '/pricing/websites?track=wp-ecom' },
      { b: 'Custom-coded', s: 'Spring Boot and React on your own server, no platform limits', extra: '₹2,50,000 + GST', to: '/pricing/websites?track=coded-ecom' },
    ],
    other: [
      { b: 'WordPress', s: 'Three sizes — Short, Mid and Advance. One-time, and you own it', extra: '₹25,000 – ₹45,000', to: '/pricing/websites?track=wp-generic' },
      { b: 'Custom-coded', s: 'When the site is really an application — a portal, an integration', extra: 'From ₹2,50,000', to: '/pricing/websites?track=coded-generic' },
    ],
  };

  return (
    <div className="pfx" role="dialog" aria-modal="true" aria-label="Find your pricing"
         onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <button className="x" onClick={onClose} aria-label="Close">×</button>

      <div className="sheet">
        {step === 'root' && (
          <>
            <p className="kick">Pricing</p>
            <h2>What are you pricing?</h2>
            <p className="sub">Pick the closest one. Every route ends on a page with real numbers on it —
              no ranges, and nothing hidden behind a form.</p>
            <div className="opts">
              <Opt b="A website" s="For a non-profit, a store, or any other industry" onClick={() => setStep('industry')} />
              <Opt b="Social media" s="Management retainers and content plans" onClick={() => go('/pricing/social-media')} />
            </div>
          </>
        )}

        {step === 'industry' && (
          <>
            <p className="crumbs"><b>Website</b></p>
            <h2>Which industry is it for?</h2>
            <p className="sub">A site that issues 80G receipts and one that takes orders are different
              builds. Tell us the industry and the next question gets specific.</p>
            <div className="opts opts-ind">
              {INDUSTRIES.map((i) => (
                <Opt key={i.id} b={i.b} s={i.s} icon={i.icon} accent={i.accent}
                  onClick={() => { setIndustry(i.id); setFns([]); setStep('features'); }} />
              ))}
            </div>
            <div className="bar"><button className="lnk" onClick={() => setStep('root')}>← Back</button></div>
          </>
        )}

        {step === 'features' && (() => {
          const feats = FEATURES[featureKey] ?? [];
          const startMic = () => {
            const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            if (!SR) { setMicErr('This browser will not do speech. Type it below instead.'); return; }
            setMicErr('');
            const r = new SR();
            recog.current = r;
            r.lang = lang; r.interimResults = true; r.continuous = false;
            r.onresult = (e: any) => {
              const t = Array.from(e.results).map((x: any) => x[0].transcript).join(' ');
              setSpoken(t);
              const m = matchRequirement(t, feats);
              setFns((prev) => [...new Set([...prev, ...m.ids])]);
              setMatchedIds(m.ids);
              setMatch({ matchedClauses: m.matchedClauses, clauses: m.clauses, pct: m.pct });
            };
            r.onerror = (e: any) => {
              setMicErr(e?.error === 'not-allowed'
                ? 'Microphone permission was refused. Type it below instead.'
                : 'The microphone stopped. Type it below instead.');
              setListening(false);
            };
            r.onend = () => setListening(false);
            setListening(true);
            r.start();
          };
          const applyTyped = (t: string) => {
            setSpoken(t);
            if (t.trim().length < 4) { setMatch(null); setMatchedIds([]); return; }
            const m = matchRequirement(t, feats);
            setFns((prev) => [...new Set([...prev, ...m.ids])]);
            setMatchedIds(m.ids);
            setMatch({ matchedClauses: m.matchedClauses, clauses: m.clauses, pct: m.pct });
          };
          return (
            <>
              <p className="crumbs">Website · <b>{industryLabel}</b></p>
              <h2>What does it actually have to do?</h2>
              <p className="sub">
                Tick what applies, or press the mic and just say it. There are {feats.length} here —
                nobody needs all of them, and the recommendation is worked out from what you pick.
              </p>

              <div className="tools">
                <select className="lang" value={lang} onChange={(e) => setLang(e.target.value)}
                  aria-label="Language you will speak in">
                  {LANGS.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
                </select>
                <button type="button" className={`mic${listening ? ' on' : ''}`}
                  onClick={() => (listening ? recog.current?.stop() : startMic())}
                  aria-label={listening ? 'Stop listening' : 'Describe your requirement out loud'}>
                  <span aria-hidden="true">{listening ? '■' : '🎤'}</span>
                  {listening ? 'Listening…' : 'Say it instead'}
                </button>
                <button type="button" className="tool star"
                  onClick={() => setFns(matchedIds.length
                    ? [...new Set([...matchedIds, ...feats.filter((f) => f.rec).map((f) => f.id)])]
                    : feats.filter((f) => f.rec).map((f) => f.id))}>
                  ★ {matchedIds.length ? 'Recommended for what you said' : 'Recommended'}
                </button>
                <button type="button" className="tool" onClick={() => setFns(feats.map((f) => f.id))}>Select all</button>
                <button type="button" className="tool ghost" onClick={() => { setFns([]); setSpoken(''); setMatch(null); }}>Clear</button>
                <span className="count">{fns.length} selected</span>
              </div>

              {(spoken || micErr) && (
                <div className="heard">
                  {micErr && <p className="err">{micErr}</p>}
                  <textarea
                    value={spoken}
                    onChange={(e) => applyTyped(e.target.value)}
                    placeholder="…or type it: we take monthly donations, need 80G receipts and a donor list"
                    rows={2}
                  />
                  {match && (
                    <>
                      <p className="matched">
                        <strong>{match.matchedClauses} of {match.clauses}</strong> things you described map to a
                        Give Setu function — <strong>{match.pct}% matched</strong>, and they are ticked below.
                      </p>
                      <button type="button" className="go basis"
                        onClick={() => {
                          setFns([...new Set([...matchedIds, ...feats.filter((f) => f.rec).map((f) => f.id)])]);
                          setStep('rec');
                        }}>
                        Show me options based on this
                      </button>
                    </>
                  )}
                </div>
              )}

              {!spoken && !micErr && (
                <button type="button" className="tool typeit" onClick={() => setSpoken(' ')}>
                  or type your requirement instead
                </button>
              )}

              <div className="chips">
                {feats.map((f) => {
                  const on = fns.includes(f.id);
                  return (
                    <span key={f.id} className={`chipwrap${on ? ' on' : ''}`}>
                      <button type="button" className="chip" aria-pressed={on}
                        onClick={() => setFns(on ? fns.filter((x) => x !== f.id) : [...fns, f.id])}>
                        <i aria-hidden="true">{on ? '✓' : ''}</i><span>{f.label}</span>
                      </button>
                      {f.why && (
                        <button type="button" className="whybtn" aria-label={`What ${f.label} means`}
                          onClick={(e) => { e.stopPropagation(); setWhy(why === f.id ? null : f.id); }}>
                          i
                        </button>
                      )}
                      {why === f.id && f.why && (
                        <span className="whybox" role="tooltip">
                          <b>{f.label}</b>
                          {f.why}
                        </span>
                      )}
                    </span>
                  );
                })}
              </div>

              <div className="bar">
                <button className="go" disabled={!fns.length} onClick={() => setStep('rec')}>Show me what fits</button>
                <button className="lnk" onClick={() => setStep('industry')}>← Back</button>
              </div>
            </>
          );
        })()}

        {step === 'rec' && (() => {
          const r = recommend(featureKey, fns);
          const alts = (ALTERNATIVES[featureKey] ?? []).filter((a) => !r.title.startsWith(a.b));
          return (
            <>
              <p className="crumbs">Website · {industryLabel} · <b>Our recommendation</b></p>
              <h2>{r.title}</h2>
              <div className="rec">
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#d8c48d' }}>{r.price}</div>
                <p className="why">{r.why}</p>
                <div className="bar">
                  <button className="go" onClick={() => go(r.to)}>{r.label}</button>
                  <button className="lnk" onClick={() => setStep('features')}>← Change my answers</button>
                </div>
              </div>
              {alts.length > 0 && (
                <>
                  <p className="sub" style={{ margin: '26px 0 12px' }}>
                    The other routes for a {industryLabel.toLowerCase()} website, in case we read you wrong:
                  </p>
                  <div className="opts">
                    {alts.map((a) => <Opt key={a.b} b={a.b} s={a.s} extra={a.extra} onClick={() => go(a.to)} />)}
                  </div>
                </>
              )}
            </>
          );
        })()}
      </div>
    </div>
  );
}
