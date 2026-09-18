/**
 * Every price, row and tooltip on the Give Setu pricing page, transcribed
 * verbatim from the build specification (v1.0, 26-08-2026).
 *
 * Content rules encoded here, not left to the renderer:
 *  - prices always display as the figure + 18% GST; never a GST-inclusive total
 *  - no crosses, no "not available" — a higher-tier feature reads
 *    "Available from Growth" or "Available as add-on"
 *  - support times are always "first response", never resolution
 */

export type Row = { feature: string; starter: string; growth: string; advanced: string; tip: string };

export const PLANS = [
  { name: 'STARTER',  annual: '₹25,000', monthly: '₹2,500', q: '₹6,900',  h: '₹13,500',
    site: 'Dedicated CMS portal', best: 'New and small organisations', rec: false },
  { name: 'GROWTH',   annual: '₹45,000', monthly: '₹4,500', q: '₹12,420', h: '₹24,300',
    site: 'CMS portal + a full WordPress website', best: 'Growing organisations running regular campaigns', rec: false },
  { name: 'ADVANCED', annual: '₹80,000', monthly: '₹8,000', q: '₹22,080', h: '₹43,200',
    site: 'Full custom-coded UI/UX, included in the plan', best: 'Established organisations at scale', rec: true },
];

export const COMPARISON: Row[] = [
  { feature: 'Website included, free', starter: 'Dedicated CMS portal', growth: 'CMS portal + a full WordPress website', advanced: 'Full custom-coded UI/UX', tip: "This is not WordPress. Starter and Growth receive a dedicated CMS portal of ours with the pages already fitted — home, about, causes, donation, contact and the rest — where you sign in and change the words and images yourself. There are no plugins to maintain, no themes to update and nothing to break. Growth adds a complete WordPress website on top of the portal — the same 18-page, 35-feature build we sell on its own for ₹46,750 all-in, including Razorpay setup and the first year of hosting. Advanced receives a fully custom-coded design built to your own layout and sitemap. To be plain: the site runs on our platform and is included for as long as you are on a plan. It is not handed over as code, and it stops if the subscription stops. Your data always exports free." },
  { feature: 'Active donors', starter: '2,000', growth: '10,000', advanced: '25,000', tip: 'An active donor is one who has done something real in the last 45 days — made a donation, downloaded or re-downloaded a receipt, verified through OTP, or opened their donor portal. These are the donors your AI engine is continuously syncing, scoring and segmenting. It is not your total donor count: a database of two lakh names is fine, and only the recently active ones count here. It is not a cap on donations either — a donation from any donor, active, sleeping or imported, is always accepted, always receipted, and instantly reactivates that donor at no charge. Beyond your number, older donors move to sleeping storage, held free and fully searchable. People are never billed. Paper is.' },
  { feature: 'Sleeping / legacy donors', starter: 'Unlimited — free', growth: 'Unlimited — free', advanced: 'Unlimited — free', tip: 'Old contacts and lapsed donors sit in your database at no cost, on every plan. A legacy list of two lakh names costs you nothing to hold. They only become active if you choose to work with them.' },
  { feature: '80G receipts per month', starter: '1,000', growth: '5,000', advanced: '15,000', tip: 'Every donation produces an immutable 80G receipt automatically. This counts the receipts issued, not the emails sent — delivering them by email is unlimited and free. Beyond your monthly count receipts keep issuing at the overage rate (₹0.90 Starter · ₹0.70 Growth · ₹0.50 Advanced, plus GST). Donations are never blocked and no donor is ever left waiting.' },
  { feature: 'Members', starter: '1,000 · 1 plan type', growth: '3,000 · 5 plan types', advanced: '10,000 · 15 plan types', tip: 'Full membership management with joining forms, digital ID cards, renewals and a member portal. Plan types let you run different membership categories such as annual, life and patron.' },
  { feature: 'Live cases', starter: 'Unlimited — free', growth: 'Unlimited — free', advanced: 'Unlimited — free', tip: 'Run as many live beneficiary cases as your work demands, on every plan. We do not charge rent on your beneficiaries. Each case gets a public page with its own money-in, money-spent ledger.' },
  { feature: 'Live campaigns', starter: 'Unlimited — free', growth: 'Unlimited — free', advanced: 'Unlimited — free', tip: 'Run unlimited fundraising campaigns simultaneously, on every plan. Each campaign can run a fresh edition every year while one family page carries the lifetime story.' },
  { feature: 'Cases built by our team', starter: '2 / month', growth: '5 / month', advanced: '10 / month', tip: 'Send us the brief and photographs and our content team writes and builds the case page for you. Beyond your monthly quota it is ₹499 per case with two revisions included. Building cases yourself is always unlimited and free.' },
  { feature: 'WhatsApp rail', starter: 'Available from Growth', growth: 'Included', advanced: 'Included', tip: "A verified WhatsApp business number in your organisation's name, with Meta-approved display name, template management and automatic opt-out handling. Available from the Growth plan upwards." },
  { feature: 'WhatsApp marketing message', starter: 'Available from Growth', growth: '₹1.00 + 18% GST each', advanced: '₹0.98 + 18% GST each', tip: 'That is the entire price per message. No platform fee, no server cost, no monthly subscription, no wallet to pre-load and no minimum commitment. Send nothing this month and you pay nothing this month.' },
  { feature: 'WhatsApp receipt delivery', starter: 'Available from Growth', growth: '₹1.00 + 18% GST each', advanced: '₹0.98 + 18% GST each', tip: 'WhatsApp is a paid channel operated by Meta and every message it carries has a cost, including a receipt. We pass that through at the same honest rate rather than hiding it inside a larger fee. Receipts by email remain unlimited and free.' },
  { feature: 'Mobile application — Android', starter: 'Available on Advanced', growth: 'Available on Advanced', advanced: '₹30,000 + GST', tip: 'Available on Advanced only, because the application is built from the custom-coded website — there is no custom-coded site on Starter or Growth to build it from. A one-time build charge: your site becomes an Android application with your icon, working push notifications and in-app donations, handed to you ready to publish.' },
  { feature: 'Mobile application — iOS', starter: 'Available on Advanced', growth: 'Available on Advanced', advanced: '₹30,000 + GST', tip: 'Available on Advanced only, for the same reason as Android. A one-time build charge for the Apple version, built the same way and handed to you ready to publish on the App Store.' },
  { feature: 'Complete application bundle', starter: 'Available on Advanced', growth: 'Available on Advanced', advanced: '₹1,00,000 + GST', tip: 'To be plain about the arithmetic: the two builds bought separately are ₹60,000, and you publish them yourself. The bundle is ₹1,00,000 and we take both applications through Google’s and Apple’s review for you — listing, submission, compliance declarations, data-safety forms and every round of reviewer questions. You are paying ₹40,000 for the store process, not for the applications. If your team is happy to publish, buy the two builds.' },
  { feature: 'Store developer accounts', starter: 'Available on Advanced', growth: 'Available on Advanced', advanced: 'Play ≈ ₹2,500/yr · Apple ≈ ₹8,500/yr', tip: "These accounts are purchased by you, in your organisation's own name, and paid directly to Google and Apple. A store account holds your legal identity and payout details — it must belong to you permanently, and no vendor should ever own it. We guide you through the entire purchase." },
  { feature: 'Marketing emails per month', starter: '1,000', growth: '2,500', advanced: '25,000', tip: 'Recipient-counted per month. Before every send you see the exact recipient count, your remaining quota and the precise top-up cost — so you always know the price before you press send.' },
  { feature: 'Transactional email delivery', starter: 'Unlimited — free', growth: 'Unlimited — free', advanced: 'Unlimited — free', tip: 'Delivery by email is never metered and never charged, on any plan — send a receipt to the same donor ten times and it still costs nothing. To be exact, this is the delivery, not the document: issuing an 80G receipt counts against your monthly receipt allowance in the row above, and beyond it the receipt overage rate applies. Email is the free channel; WhatsApp is Meta’s paid one.' },
  { feature: 'New design templates each month', starter: '2 per month', growth: '3 per month', advanced: 'Every template, every month', tip: 'A living library, not a one-time theme. Every month we design new campaign page templates — festival appeals built around the calendar your donors actually keep, and disaster-relief templates held ready so that when a flood or an earthquake happens you are publishing an appeal the same day instead of briefing a designer. Starter draws 2 a month, Growth 3, and Advanced receives every template we release, for as long as you are on a plan.' },
  { feature: 'AI insights', starter: 'Available from Growth', growth: 'Included', advanced: 'Included — with priority processing', tip: 'The intelligence layer: churn-risk scoring on every donor, lapsed-donor detection ranked by what they were worth, retention cohorts, festival year-on-year, channel attribution, collection forecasting and anomaly alerts. Available from the Growth plan upwards, because it needs a year of your own giving history before it says anything worth acting on.' },
  { feature: 'AI campaign packs per month', starter: '25', growth: '65', advanced: '150', tip: 'A complete bilingual campaign kit generated for you — page copy, a five-message WhatsApp series, two emails and poster lines, in Hindi and English.' },
  { feature: 'AI natural-language filters', starter: '30 / month', growth: 'Unlimited', advanced: 'Unlimited', tip: 'Ask your donor database a question in plain English or Hindi. The system plans the query across giving history, patterns, silence and festivals, returns the segment and explains how it reached it.' },
  { feature: 'Media storage', starter: '10 GB', growth: '25 GB', advanced: '50 GB', tip: 'For images and documents you upload. Receipts, certificates and ID cards are generated on demand and never consume your storage. Every image is compressed automatically on upload.' },
  { feature: 'Admin seats', starter: '2', growth: '5', advanced: '15 + custom roles & field masking', tip: "Team logins for your organisation. Advanced adds custom roles and field-level masking, so a volunteer can work without ever seeing a donor's phone number or PAN." },
  { feature: 'CA / Auditor seat', starter: 'Available as add-on', growth: '1 free', advanced: '1 free', tip: 'A read-only login for your chartered accountant with access to the compliance cockpit, registers and all exports. Zero write access anywhere in the system, enforced at the deepest level.' },
  { feature: 'Payment gateways', starter: '1', growth: '2 + automatic failover', advanced: '2 or more + failover', tip: 'If your primary gateway fails three times in sixty seconds, traffic switches to the secondary automatically. Your donations do not die because one gateway blinked during your biggest appeal.' },
  { feature: 'Donor & member portals', starter: 'Full portal access', growth: 'Full portal access', advanced: 'Full portal access', tip: 'Your donors and members log in with an OTP to see their giving history, download their own receipts, manage their profile, view their membership card and renew — without ever calling your office.' },
  { feature: 'Recurring donor self-service', starter: 'Donor mandate + cancel', growth: 'Change date & skip month', advanced: 'Change date & skip month', tip: 'From Growth upwards, a monthly donor can change their own giving date or skip a single month from their portal, with a one-tap reminder two days before every charge. A donor who can skip does not cancel.' },
  { feature: 'Compliance Centre (10BD / 10BE)', starter: 'Registers & exports', growth: '1 filing batch per year', advanced: 'Unlimited batches + priority', tip: 'Year-round readiness tracking, validation before filing, portal-ready export, and 10BE certificates dispatched automatically to every donor by email and WhatsApp. Filed batches are stored eight years, immutable.' },
  { feature: 'Case verification badge', starter: 'Available as add-on', growth: 'Included', advanced: 'Included', tip: 'Our team reviews your supporting documents and a verification badge appears publicly on the case page. Donors give more to what has been checked.' },
  { feature: 'Festival campaign wizard', starter: 'Available as add-on', growth: 'Included', advanced: 'Included', tip: 'A rolling radar of the next forty-five days including Amavasya, Ekadashi, Shradh and regional festivals. Pick one and the complete campaign kit is generated as a draft.' },
  { feature: 'Developer API & webhooks', starter: 'Available as add-on', growth: '₹1,999 / month', advanced: 'Included — 300 requests/min', tip: 'A secure REST API and signed outbound webhooks, so your other systems can read and react to donations, receipts, memberships and completed cases in real time.' },
  { feature: 'Microsites', starter: 'Available as add-on', growth: 'Available as add-on', advanced: '1 included', tip: 'A separate campaign website under its own address, useful for a flagship annual appeal that deserves its own identity.' },
  { feature: 'Instant bulk jobs per month', starter: '2', growth: '5', advanced: '15 + permanent priority', tip: 'Large generation jobs — a ZIP of ten thousand receipts, a batch of ID cards, a big export — processed immediately rather than overnight.' },
  { feature: 'Overnight bulk jobs', starter: 'Unlimited — free', growth: 'Unlimited — free', advanced: 'Unlimited — free', tip: 'Any large job can be queued free and unlimited overnight, ready by 8 AM with a WhatsApp and email link. We sell speed, never access.' },
  { feature: 'Audit trail retention', starter: '90 days', growth: '3 years', advanced: '8 years', tip: 'Every change in your system is recorded permanently with who, what, when and from where. The log is append-only — there is no delete facility, not even for us.' },
  { feature: 'Support — first response', starter: '48 hours', growth: '24 hours — priority', advanced: '12 hours', tip: 'This is the time within which a real person responds to you. Resolution of the underlying issue may take longer depending on its nature, and you are kept informed on the ticket throughout.' },
  { feature: 'Dedicated account manager', starter: 'Included', growth: 'Included', advanced: 'Included', tip: 'A named person at Govindani who owns your account, shown inside your panel with their contact hours. You always know who to call.' },
  { feature: 'Commission on donations', starter: '0% — forever', growth: '0% — forever', advanced: '0% — forever', tip: 'We take no share of any donation, ever. The payment gateway charges its own standard fee of roughly 2%, exactly as it would on any platform. Money settles from the gateway directly into your bank account — we never hold your funds.' },
];

export const ADDONS: { name: string; charge: string; tip: string }[] = [
  { name: 'Additional admin seat', charge: '₹299 / seat / month', tip: "An extra team login beyond your plan's included seats." },
  { name: 'Additional CA / auditor seat', charge: '₹399 / user / month', tip: 'An extra read-only compliance login for a second accountant or auditor.' },
  { name: 'Additional branch', charge: '₹799 / month', tip: 'A further location or unit of the same registered entity, with its own scoped users, records and reporting.' },
  { name: 'Member pack', charge: '₹149 / month', tip: 'Adds 100 members beyond your plan capacity.' },
  { name: 'Receipt overage', charge: '₹0.90 / ₹0.70 / ₹0.50 each + GST', tip: 'Charged per receipt issued beyond your monthly allowance — ₹0.90 on Starter, ₹0.70 on Growth, ₹0.50 on Advanced. This is the document, not the delivery: emailing it remains free and unlimited. Donations are never blocked and no donor ever waits.' },
  { name: 'Marketing email top-up', charge: 'From ₹499', tip: '5,000 recipients ₹499 · 12,000 ₹899 · 40,000 ₹1,999. Purchased credits never expire.' },
  { name: 'Dedicated sending domain / IP', charge: '₹499 / month', tip: 'Your own email reputation, isolated from all other senders, with guided DNS setup.' },
  { name: 'Media storage', charge: 'From ₹149 / month', tip: 'Extra space for uploaded images and documents.' },
  { name: 'WhatsApp business setup', charge: '₹3,000 one-time', tip: 'One-time: WABA creation, Meta display-name verification and starter templates. Growth and above.' },
  { name: 'WhatsApp message', charge: '₹1.00 (Growth) / ₹0.98 (Advanced) + GST', tip: 'Growth and Advanced only. No platform fee, no server cost, no subscription, no wallet. Marketing and receipt messages carry the same rate.' },
  { name: 'Case built by our team', charge: '₹499 one-time', tip: 'Beyond your monthly quota. Two revisions included; ₹99 per further revision. Building cases yourself is always free.' },
  { name: 'Campaign built by our team', charge: '₹999 one-time', tip: 'Your first two team-built campaigns are free for life. A seasonal refresh of an existing campaign is ₹499.' },
  { name: 'Custom membership card design', charge: '₹4,999 one-time', tip: 'A bespoke card design created by our team for your organisation.' },
  { name: '10BE revision batch', charge: '₹1,999', tip: 'A second or subsequent certificate batch within a year on Growth. Unlimited on Advanced.' },
  { name: 'Developer API access', charge: '₹1,999 / month', tip: 'Secure REST API and signed webhooks. Included free on Advanced.' },
  { name: 'Additional microsite', charge: '₹799 / month', tip: 'A separate campaign site under its own address.' },
  { name: 'Bulk job jump-queue', charge: '₹299 one-time', tip: 'Promote one overnight job to instant processing. A ₹499 season pass covers unlimited instant jobs through April and May.' },
  { name: 'Website migration', charge: '₹20,000 one-time', tip: 'Flat fee covering full migration of your existing website into the system.' },
  { name: 'Dedicated server', charge: '₹15,000 / month', tip: 'Where your donation volume, traffic or data size grows beyond the capacity of our shared infrastructure, your organisation moves onto a dedicated server of its own. We tell you before this is needed, never after.' },
  { name: 'Database cleanup', charge: '₹5,000 – ₹1,50,000', tip: 'Beyond mechanical fixes. Always quoted first and approved by you before any work starts.' },
];

export const TRUST = [
  ['Receipt delivered after donation', 'Under 4 seconds'],
  ['Receipt issuing throughput', '50 per second, sustained'],
  ['Donation page availability', '99.9% monthly'],
  ['Donation page load speed', 'Under 1.2 seconds'],
  ['Admin panel load speed', 'Under 1.5 seconds'],
  ['Overnight job completion', 'Every job finished by 7:30 AM'],
  ['Support first response', '48h Starter · 24h Growth · 12h Advanced — resolution may take longer'],
  ['Data recovery point', '15 minutes, with quarterly tested restore drills'],
  ['Data residency', 'All data, backups and files held in India'],
];

export const FAQ = [
  ['Do you take a commission on donations?', 'Never. 0%, permanently. The payment gateway charges its own standard fee of roughly 2%, exactly as it would on any platform, and money settles from the gateway directly into your bank account.'],
  ['Do I have to buy a website separately?', 'No. We do not sell one-time websites at all. Your website is included free inside your plan and stays hosted, secured and maintained for your whole term.'],
  ['What happens to my data if I leave?', 'You export everything, free, at any time — including on exit. There is no exit fee and no export charge.'],
  ['Can I import my old donor database?', 'Yes, unlimited and free on every plan, at any size. Up to fifty thousand rows through the self-service wizard; anything larger or messier, send it to us and our team uploads it for you at no cost.'],
  ['Do I pay for donors who never give again?', 'No. Sleeping and lapsed donors are stored free and unlimited on every plan. You are charged only for donors you actively work with.'],
  ['Is WhatsApp available on the Starter plan?', 'The WhatsApp rail is available from the Growth plan upwards. On Starter, receipts and communication are delivered by email, which is unlimited and free.'],
  ['Can you file 10BD for us?', "The system prepares, validates and exports the portal-ready file and dispatches every 10BE certificate automatically. A named officer of your organisation signs off on the data before filing — the legal filing remains your organisation's act."],
  ['How long does the mobile app take to go live?', 'The build is ours. Google and Apple then typically take 45 to 60 days to review and approve an application of this type, which is outside our control.'],
];

/* ------------------------------------------------------------------
   MARKET BENCHMARKS
   Every figure below was read off the vendor's own public pricing page
   on 6 September 2026 and is shown with a live link so a trustee can
   verify it in one tap. USD converted at ₹94.4 = $1 (RBI reference,
   4 Sep 2026). Never edit a number here without re-opening the source.
   ------------------------------------------------------------------ */
export const VERIFIED_ON = '6 September 2026';
export const USD_RATE = 94.4;

export const BENCHMARKS = [
  {
    need: 'A WhatsApp rail for your donors',
    weCharge: 'No platform fee. Ever.',
    weNote: 'You pay only the per-message rate — ₹1.00 on Growth, ₹0.98 on Advanced, plus GST.',
    market: [
      { vendor: 'Interakt Advanced', cost: '₹36,468 / year + GST', detail: '₹3,039/mo on annual billing', url: 'https://www.interakt.shop/pricing/' },
      { vendor: 'Wati Growth', cost: '≈ ₹1,12,150 / year', detail: '$99/mo billed annually = $1,188/yr', url: 'https://wati.io/pricing/' },
      { vendor: 'AiSensy chatbot builder', cost: '₹27,000 / year', detail: '₹2,250/mo annual — an add-on, not the base plan', url: 'https://aisensy.com/pricing' },
    ],
    reframe: 'These are subscriptions. You pay them in a month you send nothing. Our platform fee in that month is zero.',
  },
  {
    need: 'A server that survives a campaign spike',
    weCharge: 'Included in every plan',
    weNote: 'Hosting, backups, and the 15-minute recovery point are inside the plan price.',
    market: [
      { vendor: 'AWS Lightsail 4 GB app instance', cost: '$24 / month', detail: '4 GB RAM · 2 vCPU · 80 GB SSD', url: 'https://aws.amazon.com/lightsail/pricing/' },
      { vendor: 'AWS managed database 2 GB', cost: '$30 / month', detail: 'Standard, not high-availability', url: 'https://aws.amazon.com/lightsail/pricing/' },
      { vendor: 'AWS load balancer', cost: '$18 / month', detail: 'Needed the day traffic spikes', url: 'https://aws.amazon.com/lightsail/pricing/' },
    ],
    total: '$72 / month ≈ ₹81,600 / year',
    reframe: 'That is roughly the price of the entire Advanced plan — for the machine alone, before a single line of software, and before anyone is paid to keep it patched.',
  },
  {
    need: 'Delivering receipts and confirmations by email',
    weCharge: 'Unlimited — free, on every plan',
    weNote: 'We never charge to send an email. Issuing an 80G receipt is counted separately against your monthly allowance — the delivery is what is free.',
    market: [
      { vendor: 'Amazon SES', cost: '$0.10 per 1,000 emails', detail: 'À la carte outbound rate', url: 'https://aws.amazon.com/ses/pricing/' },
      { vendor: 'Amazon SES Pro', cost: '$105 / month + usage', detail: 'Fixed fee per account, per region', url: 'https://aws.amazon.com/ses/pricing/' },
    ],
    reframe: 'The email itself is cheap. What costs money is the plumbing around it — deliverability, bounce handling, the sending reputation. That is the part we absorb.',
  },
  {
    need: 'SMS, if you want it as well',
    weCharge: 'Passed through at cost',
    weNote: 'We add no margin to an SMS. You pay the carrier rate.',
    market: [
      { vendor: 'MSG91 transactional SMS', cost: '₹0.25 per SMS', detail: 'At 5,000 volume, excluding GST', url: 'https://msg91.com/in/pricing' },
      { vendor: 'MSG91 at scale', cost: '₹0.18 per SMS', detail: 'At 30,000 volume, excluding GST', url: 'https://msg91.com/in/pricing' },
    ],
    reframe: '10,000 donors receiving three messages a year is 30,000 SMS — about ₹5,400 + GST at the published rate. We quote it before you commit, not after.',
  },
];

/* The single most misunderstood thing about the Advanced plan: the website
   is a build, not a rental. Year one pays for it. Year two does not. */
export const YEAR_TWO = {
  title: 'The website is part of the plan, not a separate purchase.',
  lead: 'Every plan includes a working website, built and maintained by us for the whole of your term. You are not asked for a build fee on top, and you are not asked for a developer invoice every time it needs changing.',
  steps: [
    { year: 'While you are on a plan', plan: 'Built, hosted and maintained by us', body: 'Starter and Growth run on our dedicated CMS portal with the pages already fitted. Advanced receives a fully custom-coded design built to your own layout. Hosting, SSL, updates and fixes are inside the plan price for as long as you are on it.' },
    { year: 'If you ever leave', plan: 'Your data leaves with you. The website does not.', body: 'The website runs on our platform, so it stops when the subscription stops — we do not hand over the code, on any plan. What is unconditionally yours is your data: donors, members, receipts, filings and files, exportable in full, free, at any time, including on the way out.' },
  ],
  proof: 'That is the trade you are making, and we would rather you knew it now than discovered it later. You get a website worth ₹2,50,000 to commission without paying for it up front — and in exchange it lives on the platform rather than on a disk you own.',
  proofHref: '/pricing/ngo-website',
  caution: 'If owning the code matters more to you than any of the rest of it, buy a one-time build instead. Our WordPress NGO site is ₹35,000 and it is yours outright — we will tell you that rather than sell you a subscription you did not want.',
};

/* What a plan already contains, priced at what the market charges for each
   part. Sources are the same primary pages linked in BENCHMARKS. */
export const GROWTH_MATH = {
  title: 'What Growth costs against buying the website alone.',
  lead: 'Growth is ₹45,000 + 18% GST a year. The WordPress website it includes is a build we sell on its own — so this is not a comparison against someone else\'s price list, it is against ours.',
  rows: [
    ['The website, bought on its own', 'Development ₹35,000 · Razorpay setup ₹2,500 · GST ₹6,750 · hosting ₹2,500, no GST on that line', '₹46,750'],
    ['Give Setu Growth for a year', 'The same website, plus everything below it', '₹53,100 all-in'],
    ['Give Setu Advanced for a year', 'The custom-coded build, the AI insights engine, the mobile application', '₹94,400 all-in'],
  ],
  delta: 'A difference of ₹6,350 across the year — about ₹530 a month.',
  buys: [
    'A year of maintenance, rather than 30 days',
    'Case and campaign pages built by our team — 5 a month, instead of quoted each time',
    '80G receipts issued automatically, numbered and immutable',
    'The Compliance Centre for 10BD and 10BE',
    'Donor CRM, membership, and the campaign engine',
    'AI insights, and new design templates every month',
    'A WhatsApp rail at ₹1.00 a message with no platform fee',
  ],
  closing: 'The honest way to read that: for roughly ₹530 a month more than the website alone, the year stops being a series of invoices. What you give up is owning the code — the site runs on our platform, and it stops if the plan stops.',
};

export const BUNDLED = {
  heading: 'What the Advanced plan already contains',
  rows: [
    ['A custom-coded website, built and maintained for you', '₹2,50,000 to commission one, at our published rate'],
    ['Server, database and load balancing', '≈ ₹81,600 / year at AWS list price'],
    ['WhatsApp platform subscription', '₹36,468 / year at Interakt Advanced'],
    ['Unlimited transactional email', 'Metered everywhere else'],
    ['Compliance Centre — 10BD / 10BE', 'Usually a chartered accountant’s line item'],
    ['0% commission on donations', 'Typically 2–5% of everything you raise'],
  ],
  closing: 'Advanced is ₹80,000 + 18% GST for the year.',
};

/* Reframes attached to the numbers that look alarming in isolation. */
export const REFRAMES: Record<string, { title: string; body: string }> = {
  advanced: {
    title: 'Why this is the cheapest line on the page',
    body: 'Commissioning a custom-coded site on its own is ₹2,50,000 + GST before anything else runs. Here it is inside the plan, built and maintained for your whole term, with no build fee up front.',
  },
  app: {
    title: 'Why ₹30,000 is a one-time number',
    body: 'It is a build charge, not a subscription. There is no annual app fee afterwards, and the app is yours to publish under your own developer account.',
  },
  server: {
    title: 'Why you will probably never see this charge',
    body: 'Shared infrastructure carries almost every organisation. This applies only once your volume genuinely outgrows it — and we tell you before it does, never after.',
  },
  message: {
    title: 'Why a receipt costs a rupee',
    body: 'WhatsApp is Meta’s paid channel and every message on it has a real cost. We pass it through instead of burying it in a platform fee. Delivery by email stays unlimited and free on every plan.',
  },
  commission: {
    title: 'The number that actually decides your budget',
    body: 'A 3% commission on ₹50,00,000 raised is ₹1,50,000 — every year, rising as you grow. Ours is ₹0, permanently.',
  },
};

/* The problems an Indian non-profit actually walks in with. Each answer is
   grounded in a commitment stated elsewhere on this page — nothing here is
   a capability we do not already publish. */
export const PAINS = [
  {
    q: 'Are you still typing 80G receipts by hand?',
    a: 'Every donation issues its own immutable 80G receipt automatically, numbered and stored, and reaches the donor in under four seconds. At peak the system sustains fifty receipts a second, so a festival appeal does not become a fortnight of data entry.',
    tag: 'Under 4 seconds',
  },
  {
    q: 'Is a platform taking a cut of every rupee you raise?',
    a: 'Ours takes 0%, permanently. On ₹50,00,000 raised a year, a platform charging 3% keeps ₹1,50,000 of money that was donated to your cause — every year, rising as you grow. The payment gateway still charges its own fee; we add nothing on top of it.',
    tag: '0%, forever',
  },
  {
    q: 'Does 10BD season cost you a fortnight and a chartered accountant?',
    a: 'The Compliance Centre tracks readiness year-round, validates before you file, and produces the portal-ready export. Every 10BE certificate goes out to the donor automatically by email and WhatsApp. Filed batches are held eight years, immutable.',
    tag: 'Filed, not feared',
  },
  {
    q: 'Can you name a donor who gave last year and has not given this year?',
    a: 'The donor record answers that in one view. Sleeping and lapsed donors are stored free and unlimited on every plan — you are charged only for the donors you actively work with, so remembering someone costs you nothing.',
    tag: 'Nobody forgotten',
  },
  {
    q: 'Does every small website change cost you a developer?',
    a: 'Not here. The website is inside the plan — built, hosted, secured and maintained by us for your whole term, with no invoice each time a page needs changing. Starter and Growth run on our CMS portal with the pages already fitted, so your own team edits the words and images. Advanced gets a fully custom-coded design. To be plain about the trade: it runs on our platform, so it stops if the plan stops, and we do not hand over the code. If owning the code matters more to you, buy the ₹35,000 WordPress build instead — we will tell you so.',
    tag: 'No change fees',
  },
  {
    q: 'If you left tomorrow, could you take your data with you?',
    a: 'Yes, free, any time, without asking us. Everything you hold — donors, members, receipts, filings and files — is exportable on demand, and all of it is stored in India. We would rather earn the renewal than hold your records hostage.',
    tag: 'Exports free',
  },
];

export const HEADLINE = {
  kicker: 'For established organisations',
  title: 'The largest single saving most non-profits will make this year.',
  body: 'Not because the software is cheap — because six bills become one, the commission becomes zero, and the website stops being a rental. The arithmetic is further down this page, every figure linked to the vendor charging it.',
};

/* Capability depth, transcribed from the master quotation QTN/2026-08/011.
   Nothing here is invented; where the quotation predates a plan change (it
   still said WordPress and priced apps on every plan), the current position
   is used instead. */
export const MODULES = [
  {
    id: 'receipting',
    title: 'Receipting & 80G',
    lead: 'The part an assessing officer will actually look at.',
    points: [
      ['Gapless financial-year numbering', 'RCP/2026-27/000481 format, per organisation, resetting on 1 April. No gaps, ever — because a gap is what an auditor asks about first.'],
      ['A public verification page', 'Every receipt carries a QR code opening a page that confirms it is genuine, with amount, date and your organisation’s name. Your donor’s chartered accountant verifies it without calling your office.'],
      ['Correction, never silent editing', 'There is no edit button anywhere in the system. Correcting a receipt cancels the original with a watermark, keeps its number in the register forever, issues a fresh one and links the two permanently. This single decision is what makes your register defensible.'],
      ['Frozen at the moment of issue', 'Every input that produced a receipt is stored when it is issued. A receipt regenerated six years from now prints byte-for-byte identical.'],
    ],
  },
  {
    id: 'recurring',
    title: 'Recurring giving',
    lead: 'Monthly donors stay only if they feel in control.',
    points: [
      ['A cockpit for your team', 'A live feed of date changes, skips and pauses, your monthly skip-rate, and an at-risk list of donors who need a call.'],
      ['Trust architecture', 'Your organisation can never change a donor’s date or skip on their behalf. Only the donor can. That guarantee is what makes a donor comfortable enough to commit in the first place.'],
    ],
  },
  {
    id: 'crm',
    title: 'Donor CRM — Donor 360',
    lead: 'One complete page per donor, and no charge for remembering anyone.',
    points: [
      ['The whole relationship on one page', 'Full giving timeline, lifetime value, every receipt, every note, every task, and the complete log of every message you have ever sent them.'],
      ['Segments in plain language', 'Combine any conditions you like, or simply type what you want and let the system build the segment.'],
      ['Duplicate merge that loses nothing', 'Candidate pairs surfaced by phone, PAN or email. Merging preserves both giving histories under one master record.'],
      ['Automated PAN recovery', 'High-value donors missing a PAN get a polite WhatsApp and email sequence well before the compliance rush. A valid reply writes the PAN into the record automatically after checksum validation. This alone can rescue a 10BD filing.'],
      ['Activation preview before any bulk action', 'The system tells you in advance exactly how many donors an action will activate and what your capacity will be afterwards. No surprise on your invoice.'],
      ['Sleeping donors are free, forever', 'A legacy database of two lakh contacts costs nothing to hold. You are charged for donors you actively work with, never for donors you merely store. Exporting activates nothing.'],
    ],
  },
  {
    id: 'cases',
    title: 'Cases engine',
    lead: 'Unlimited live cases, free, on every plan — Starter included.',
    points: [
      ['We do not charge rent on your beneficiaries', 'Run four hundred cases if your work demands four hundred cases.'],
      ['Build them yourself, or have us do it', 'A full editor with AI writing assistance. Or our content team builds them: 2 / 5 / 10 per month by plan, ₹499 each beyond that with two revisions included.'],
    ],
  },
  {
    id: 'campaigns',
    title: 'Campaigns',
    lead: 'Built around the Hindu calendar, not a generic marketing one.',
    points: [
      ['Know which forward produced which donation', 'Tracking links per edition — which link, poster or WhatsApp message actually raised the money.'],
      ['Tithi-aware sequences', 'Schedule an appeal series around the calendar that matters to your donors, not merely by date.'],
      ['Matching pledge module', 'Run “every rupee doubled by our patron until midnight” with a live matched counter.'],
      ['Goal thermometer and recognition wall', 'Public momentum, and public gratitude by giving tier, with opt-out always respected.'],
      ['A new template library every month', 'Not a theme you are stuck with. New campaign page designs are released monthly — festival appeals timed to the calendar, and disaster-relief templates kept ready so an emergency appeal goes out the same day. Starter takes 2 a month, Growth 3, Advanced every one we release, for as long as you are on a plan.'],
      ['Festival campaign wizard (Growth and above)', 'A rolling radar of the next forty-five days including Amavasya, Ekadashi, Shradh and regional festivals. Choose one and the complete kit is generated — page copy, a five-message WhatsApp series, two emails and poster lines, in Hindi and English.'],
      ['A/B page variants (Advanced)', 'Run two versions of a campaign page and keep the one that actually raises more.'],
    ],
  },
  {
    id: 'ai',
    title: 'AI insights',
    lead: 'Available from Growth. One brain across every channel, and no separate licence.',
    points: [
      ['Churn-risk scoring', 'Every donor scored on the risk of going quiet — surfaced before they are lost, rather than after.'],
      ['Lapsed-donor detection', 'Donors who have stopped, ranked by what they were worth to you.'],
      ['Retention cohorts', 'How each year’s intake behaves over time — the truest measure of whether your fundraising is compounding or merely churning.'],
      ['Festival year-on-year', 'This Diwali against last Diwali, same period, per campaign, per channel.'],
      ['Channel attribution and forecasting', 'Which message produced the donation as tracked fact, and projected collections built from your own giving patterns so your board plans on data.'],
      ['Anomaly alerts', 'A sudden threefold spike in receipts, or an unexpected drop in a campaign, flagged to you automatically.'],
      ['Why the numbers reconcile', 'Website, chatbot, mobile application, campaigns and offline entries all land in the same system. Your insights describe your whole organisation, not five silos that never agree.'],
    ],
  },
  {
    id: 'membership',
    title: 'Membership ERP',
    lead: 'Members and donors in one register, not two systems.',
    points: [
      ['Three joining routes', 'Entered by your admin, submitted through a public form, or scanned on the spot by QR at an event.'],
      ['Fee, payment and receipt as one flow', 'A membership payment produces a receipt in the same register as every donation.'],
      ['Renewal automation', 'Reminders at thirty days, seven days and on the day, then grace, then automatic suspension. No member is chased manually.'],
      ['Family, lifetime and honorary', 'Supported natively, with digital ID cards and certificates rendered on demand behind a QR verification page.'],
    ],
  },
  {
    id: 'compliance',
    title: 'Compliance Centre — 10BD & 10BE',
    lead: 'You discover the problem in October, not on the last night of May.',
    points: [
      ['Year-round readiness radar', 'The percentage of donations carrying a valid PAN, the missing-address list, and a one-click nudge to every donor on the fix-list.'],
      ['Validation before filing', 'PAN checksums, format errors and duplicates caught and listed for correction before anything reaches the portal.'],
      ['A mandatory sign-off screen', 'A named officer of your organisation confirms the data, and that is recorded permanently. Responsibility is documented, not assumed.'],
      ['10BE dispatched automatically', 'Every certificate goes to every donor by email and WhatsApp. What used to take three weeks takes one click.'],
      ['Held eight years, immutable', 'Growth includes one filing batch a year. Advanced is unlimited, with a review queue and deadline-week priority.'],
    ],
  },
  {
    id: 'website',
    title: 'Website, portals & branches',
    lead: 'Including the case where you already have a site you like.',
    points: [
      ['Keep your existing WordPress site if you want to', 'Our plugin connects donation forms, case embeds and receipt sync directly into a site you already own and love. You are not forced to move.'],
      ['Custom domain, connected properly', 'Two DNS records, verified automatically with retry over seventy-two hours, SSL issued automatically, plain-language status at every step. Or hand us registrar access and we do it.'],
      ['Microsites', 'A separate campaign site under its own address — one included on Advanced.'],
      ['Branch system', 'Every donation, receipt, member, case and campaign carries a branch tag. Branch users see only their own branch, and their receipts stamp automatically. Branch-wise reporting throughout, while 10BD stays correctly at entity level with a branch breakup annexure.'],
    ],
  },
  {
    id: 'data',
    title: 'Your data, and your freedom',
    lead: 'The section to read twice before signing with anyone.',
    points: [
      ['Unlimited import, free, on every plan', 'Fifty thousand rows through the self-service wizard with a column mapper, full validation report and a dry run before anything commits. Larger or messier files — send them to us and our team uploads them free, at any size.'],
      ['Unlimited export, free, any time', 'There is no exit fee, no export charge and no hostage-taking. If you ever leave, you leave with everything.'],
      ['An audit trail with no delete button', 'Every change recorded permanently with who, what, when and from where. Append-only — there is no delete facility, not even for us.'],
      ['Security', 'PAN encrypted at column level and masked by default, TLS in transit, field-level masking by role on Advanced, and full DPDP consent capture. All data, backups and files held in India.'],
    ],
  },
];

export const ONBOARDING = {
  title: 'Live in sixty seconds. Supported by a person with a name.',
  lead: 'Your system is live within sixty seconds of payment — not in three weeks. What follows is the part most vendors leave vague.',
  points: [
    ['A named account manager', 'Assigned to your organisation by name, with contact hours, shown inside your panel. You always know who to call.'],
    ['A kick-off that covers the real inputs', 'Your goals, data sources, festival calendar and team roles.'],
    ['Your data imported and validated', 'With a report you keep.'],
    ['Your website built and approved by you', 'Before anything goes public.'],
    ['Two training sessions for your team', 'Not a PDF and good luck.'],
    ['A go-live checklist with a real test', 'Including a genuine ₹10 test donation and refund before you announce anything.'],
  ],
  closing: 'Every request afterwards is a ticket with a clock on it. Nothing lives in somebody’s WhatsApp, and nothing gets forgotten.',
};

/* The problems a trustee actually arrives with, stated as they would say them
   rather than as features we lack. Shown as one loud rotating line. */
export const RESCUE = {
  kicker: 'Get rescue from',
  problems: [
    'Typing 80G receipts by hand at eleven at night in May.',
    'A platform keeping 3% of money that was donated to your cause.',
    '10BD season costing you a fortnight and a chartered accountant.',
    'Not knowing which donor gave last year and has not given this year.',
    'Paying a developer every single time one page needs changing.',
    'Six vendors, six invoices, and nothing that reconciles at year end.',
    'A donor’s accountant asking for proof you cannot produce.',
    'Explaining a gap in your receipt register to someone with authority.',
    'Chasing missing PANs by telephone, one donor at a time.',
    'Three days of writing to get one festival appeal out of the door.',
    'Assembling the board’s numbers by hand on the first of every month.',
    'A flood happening on Tuesday and your appeal going live on Friday.',
  ],
  closer: 'All of it. One system.',
  cta: 'Show me the plans',
};

/* Shown once, when someone arrives having just chosen Give Setu. Celebratory,
   but every line is a claim we can stand behind — no "first in India", because
   that is not true and a trustee could check it. */
export const WELCOME = {
  kicker: 'Good decision',
  title: 'You have picked the one that keeps the money.',
  body: 'Most platforms take a percentage of what your donors give. This one takes none, permanently — and the website, the receipting and the compliance come inside the plan rather than as four more invoices.',
  points: [
    ['0%', 'commission on every rupee you raise, forever'],
    ['Under 4s', 'from donation to an immutable 80G receipt'],
    ['8 years', 'filed batches held, immutable, for any assessment'],
    ['Free', 'full data export, any time, including on the way out'],
  ],
  cta: 'See what it costs',
};
