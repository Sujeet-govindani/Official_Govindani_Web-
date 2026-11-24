/**
 * The Govindani Group product shelf, as it appears on govindaniit.com.
 *
 * Govindani Infotech is the IT house the group grew out of; these are the
 * products the same company builds and runs. Each one has its own live site —
 * this is the product section of the house that makes them, not a mirror of
 * those sites, so every card and page ends at the product's own domain.
 *
 * Copy, figures and accents are taken from each product's venture page on
 * govindanigroup.com, which is itself built from the product's own site, so the
 * three places agree. Figures that only one site states are not repeated here.
 *
 * Why it exists at all: govindanigroup.com links out to all seven ventures and
 * not one of them linked back, so search engines had no way to tie the products
 * to the company that makes them. These pages are that link.
 */

export type ProductStat = { v: string; k: string };

export type GroupProduct = {
  slug: string;
  name: string;
  /** Short category line shown beside the name. */
  kicker: string;
  domain: string;
  liveUrl: string;
  groupUrl: string;
  /** Accent colour, same hue the product's own site and venture page use. */
  accent: string;
  mark: string;
  /** One line for the nav card — must fit two lines at 220px. */
  menuLine: string;
  headline: string;
  lede: string;
  /** Four figures. Only ones the product's own site states. */
  stats: ProductStat[];
  /** The problem this product is for, and how it answers it. */
  whyTitle: string;
  why: string;
  points: string[];
  /** What you get, for the feature grid. */
  features: { t: string; d: string }[];
  /** Who it is for, in one sentence. */
  audience: string;
  /** schema.org type for this product's page. */
  appCategory: string;
};

export const GROUP_PRODUCTS: GroupProduct[] = [
  {
    slug: 'customerbond',
    name: 'CustomerBond',
    kicker: 'Sales CRM',
    domain: 'customerbond.com',
    liveUrl: 'https://customerbond.com',
    groupUrl: 'https://govindanigroup.com/ventures/customerbond',
    accent: '#22d3ee',
    mark: 'https://gi-img-cdn.sujeet.workers.dev/Images/products/customerbond.svg',
    menuLine: 'Every lead routed, every follow-up chased.',
    headline: 'The sales CRM that works every lead.',
    lede: 'Facebook, Google and WhatsApp leads land in one place and reach the right salesperson in minutes. Calls log themselves on Android, every follow-up is chased, GST quotes are accepted online, and an AI layer calls, listens, writes and answers so your team only talks to people who are ready.',
    stats: [
      { v: '5', k: 'Lead sources, one intake' },
      { v: '12', k: 'Ready-made sales roles' },
      { v: '3', k: 'Lead routing methods' },
      { v: '40', k: 'Background jobs, none to build' },
    ],
    whyTitle: 'The ad worked. Now the follow-up does too.',
    why: "Most Indian businesses don't lose leads at the ad. They lose them afterwards, in a spreadsheet, a WhatsApp group or one salesperson's phone. CustomerBond catches every enquiry, routes it by your rules, and lets each call's outcome decide the next step. When something slips, a manager hears about it before the customer goes cold.",
    points: [
      'Facebook Lead Ads, Google Ads lead forms, WhatsApp, CSV/Excel and API in one intake',
      'Round-robin, load-based or score-based routing, with shadow mode to test new rules',
      'Android call-log sync, with the call outcome booking the next task',
      'Reminders every 5 minutes and SLA breaches escalated to the manager',
    ],
    features: [
      { t: 'One intake', d: 'Lead ads, website forms, WhatsApp, spreadsheets and API arrive on the same board.' },
      { t: 'Routing that holds', d: 'Round-robin, load-based or score-based, testable in shadow mode before it goes live.' },
      { t: 'Nothing goes quiet', d: 'Every lead carries a next action; overdue ones surface instead of dying silently.' },
      { t: 'One lead record', d: 'Calls, WhatsApp, notes and quotes on a single timeline for that person.' },
      { t: 'GST quotations', d: 'Send a quote and let the customer accept it online, with the tax treatment already right.' },
      { t: 'An AI layer', d: 'It calls, listens, writes and follows up alongside the salesperson, not instead of them.' },
    ],
    audience: 'Indian small and medium businesses running paid lead generation — real estate, education, healthcare, services and manufacturing — where speed to first contact decides the sale.',
    appCategory: 'BusinessApplication',
  },
  {
    slug: 'trring',
    name: 'Trring',
    kicker: 'AI calling',
    domain: 'trring.io',
    liveUrl: 'https://trring.io',
    groupUrl: 'https://govindanigroup.com/ventures/trring',
    accent: '#2bd9a4',
    mark: 'https://gi-img-cdn.sujeet.workers.dev/Images/products/trring.svg',
    menuLine: 'Calls a thousand numbers in Hindi, bills only the conversations.',
    headline: 'Give us 1,000 numbers. We make every call.',
    lede: 'An AI calling platform for Indian businesses, run for you. We set up the number, write the Hindi call script from your own brochure, call your whole list, grade every lead and hand the live call to your team. You pay only for the seconds a real person was talking.',
    stats: [
      { v: '6', k: 'Industry scripts' },
      { v: '0', k: 'Rang-out calls billed' },
      { v: '16', k: 'Indian voices' },
      { v: '~2 h', k: 'For 1,000 calls on 6 lines' },
    ],
    whyTitle: '800 rang out. You paid for none of them.',
    why: 'On a cold list, about one in five people pick up. A telecaller managing 80 dials a day spends ten working days on the 800 that ring out. Trring makes all 1,000 calls the same morning and bills only the conversations worth having.',
    points: [
      'Ringing, voicemail, IVRs and switched-off numbers cost nothing',
      'Billed by the second of real conversation, never by the dial',
      'Machines that answer are caught and not billed',
      'Every call recorded, transcribed and graded hot, warm or cold',
    ],
    features: [
      { t: 'Done for you', d: 'We set up the number, write the script from your brochure and run the campaign.' },
      { t: 'Hindi that lands', d: 'Sixteen Indian voices, in the language your list actually answers the phone in.' },
      { t: 'Live transfer', d: 'When the lead is warm, the call moves to your team while the person is still on the line.' },
      { t: 'Graded, not guessed', d: 'Every call is recorded, transcribed and marked hot, warm or cold with the reason.' },
      { t: 'Six lines at once', d: 'A thousand numbers in about two hours, not ten working days.' },
      { t: 'Pay for talk time', d: 'Rang out, voicemail, IVR and answering machines are never billed.' },
    ],
    audience: 'Indian businesses with a list to call — real estate, education, finance and services — that cannot staff enough telecallers to dial it.',
    appCategory: 'BusinessApplication',
  },
  {
    slug: 'msgsutra',
    name: 'MsgSutra',
    kicker: 'WhatsApp Business API',
    domain: 'msgsutra.io',
    liveUrl: 'https://msgsutra.io',
    groupUrl: 'https://govindanigroup.com/ventures/msgsutra',
    accent: '#25d366',
    mark: 'https://gi-img-cdn.sujeet.workers.dev/Images/products/msgsutra.svg',
    menuLine: 'One WhatsApp number, the whole team, broadcasts and AI agents.',
    headline: 'Every WhatsApp chat, one team, one inbox.',
    lede: 'The WhatsApp Business API platform for Indian businesses. Your whole team answers from one shared inbox, sends broadcasts and retargets the people who read them, builds chatbots without code, and lets an AI agent trained on your business reply 24×7, handing over to a person when it should.',
    stats: [
      /* No price here on purpose: plans change and a figure baked into this
         file would go stale silently. The page links to msgsutra.io/pricing,
         which is the only place a current price should be read from. */
      { v: '16', k: 'Product modules' },
      { v: '12', k: 'Industry playbooks' },
      { v: '24×7', k: 'AI agent cover' },
      { v: '1', k: 'Number, your whole team' },
    ],
    whyTitle: 'Send to thousands. Follow up with those who read.',
    why: "Pick a segment, pick a Meta-approved template with an image and buttons, and send. The report counts sent, delivered, read and replied as it happens, and one click re-sends to the people who read but didn't answer. Opted-out contacts are skipped automatically.",
    points: [
      'One number, many agents, with assignment, internal notes and quick replies',
      'Broadcasts on approved templates, with read-but-silent contacts retargeted in a click',
      'A no-code chatbot builder that goes live in minutes',
      'AI agents trained on your business that hand over to a person when they should',
    ],
    features: [
      { t: 'Shared team inbox', d: 'One WhatsApp number, many agents, with assignment and internal notes nobody outside sees.' },
      { t: 'Broadcasts', d: 'Template campaigns to opted-in contacts, with delivery and read reporting as it happens.' },
      { t: 'Retargeting', d: 'Re-send to the people who read the campaign and never replied, in one click.' },
      { t: 'No-code chatbots', d: 'Drag-and-drop flows, live in minutes, no developer in the loop.' },
      { t: 'AI agents', d: 'Answer common questions 24×7 and hand over to a human at the right moment.' },
      { t: 'Payments and Shopify', d: 'Collect money inside the chat; order and cart events arrive on WhatsApp.' },
    ],
    audience: 'Indian small and medium businesses and D2C brands that sell and support on WhatsApp, and the agencies running it for them.',
    appCategory: 'BusinessApplication',
  },
  {
    slug: 'brandwheel',
    name: 'Brandwheel',
    kicker: 'Social media',
    domain: 'brandwheel.in',
    liveUrl: 'https://brandwheel.in',
    groupUrl: 'https://govindanigroup.com/ventures/brandwheel',
    accent: '#e879f9',
    mark: 'https://gi-img-cdn.sujeet.workers.dev/Images/products/brandwheel.svg',
    menuLine: 'Plan, approve, publish and reply on 15 platforms from one login.',
    headline: 'Run every brand. Watch it happen.',
    lede: 'The AI social media workspace for Indian brands and agencies. Plan, approve, publish, reply and grow on 15 platforms and WhatsApp from one login. AI writes the captions, drafts the replies and plans the month; a person approves before anything goes out.',
    stats: [
      { v: '15', k: 'Platforms + WhatsApp' },
      { v: '7', k: 'Autopilot automations' },
      { v: '20', k: 'MCP tools for AI agents' },
      { v: '6', k: 'Networks with inbox replies' },
    ],
    whyTitle: 'The festival post writes itself. The client approves from a link.',
    why: 'Monday, 9:40 am, and the same post is being copied into four apps by hand while the caption breaks on LinkedIn. In Brandwheel it is one composer: AI drafts the caption and hashtags in your brand voice, the client approves by magic link without making an account, and the post goes out on every network through each platform’s own API.',
    points: [
      'One post, tailored per network, with live previews side by side',
      'An Indian festival calendar planned ahead, with queues and posting slots',
      'Clients approve, request changes, reject or hold in one tap',
      'Every decision on record: who approved what, and when',
    ],
    features: [
      { t: 'One composer', d: 'Write once, tailored per network, with live previews beside each other.' },
      { t: 'Client approval', d: 'A magic link, no account to create, with approve, change, reject or hold in one tap.' },
      { t: 'Festival calendar', d: 'The Indian festival year planned ahead, with queues and posting slots per brand.' },
      { t: 'Inbox replies', d: 'Comments and DMs from six networks answered from the same workspace.' },
      { t: 'AI that waits', d: 'It drafts captions, hashtags and replies in your brand voice — a person still presses send.' },
      { t: 'An audit trail', d: 'Who approved what, and when, kept on the record for every brand you run.' },
    ],
    audience: 'Indian brands running their own channels and the agencies running many at once.',
    appCategory: 'BusinessApplication',
  },
  {
    slug: 'givesetu',
    name: 'GiveSetu',
    kicker: 'NGO operating system',
    domain: 'givesetu.com',
    liveUrl: 'https://givesetu.com',
    groupUrl: 'https://govindanigroup.com/ventures/givesetu',
    accent: '#8b74ff',
    mark: 'https://gi-img-cdn.sujeet.workers.dev/Images/products/givesetu.png',
    menuLine: "Donations to the NGO's own account, 0% taken, 80G instantly.",
    headline: 'Run the whole NGO office. Keep every rupee.',
    lede: "GiveSetu is the operating system for Indian NGOs. Donations, 80G receipts, Form 10BD and 10BE, WhatsApp on your own number, your website, donors and members, all from one login. Every donation settles straight into the NGO's own Razorpay or Cashfree account, and GiveSetu takes 0% of it.",
    stats: [
      { v: '0%', k: 'Of donations taken, on every plan' },
      { v: '80G', k: 'Receipt out the moment money lands' },
      { v: '10', k: 'Website themes, content on a switch' },
      { v: '550+', k: 'Websites built for NGOs by this team' },
    ],
    whyTitle: 'The receipt is out before the thank-you.',
    why: "A donor pays on UPI at midnight. The money settles in the NGO's own bank. GiveSetu issues the 80G receipt, numbered in the financial-year series with a QR anyone can verify, sends it on WhatsApp and email, updates the donor's record and logs the gift for Form 10BD. Nobody retypes anything.",
    points: [
      'One-time, monthly, offline and QR donations in one ledger',
      'Cash over ₹2,000 and FCRA gifts handled by the 80G rules automatically',
      'No PAN yet? The receipt waits and the donor gets a link to add it',
      'A WhatsApp welcome within the hour of every first gift',
    ],
    features: [
      { t: '0% commission', d: "Money settles in the NGO's own Razorpay or Cashfree account. GiveSetu takes none of it." },
      { t: 'Instant 80G', d: 'Numbered in the financial-year series, QR-verifiable, out on WhatsApp and email at once.' },
      { t: '10BD and 10BE', d: 'Every gift logged the way the return wants it, so filing is not a December reconstruction.' },
      { t: 'Donor CRM', d: 'Donors, members and their whole giving history on one record.' },
      { t: "The NGO's website", d: 'Ten themes with the content on a switch, donation-ready from the first day.' },
      { t: "WhatsApp on your number", d: 'Thank-yous, receipts and campaigns from the number donors already know.' },
    ],
    audience: 'Indian trusts, societies and section-8 companies with 12A and 80G registration that want donations and compliance in one place.',
    appCategory: 'BusinessApplication',
  },
  {
    slug: 'productions',
    name: 'Govindani Productions',
    kicker: 'Media & films',
    domain: 'govindanigroup.com',
    liveUrl: 'https://govindanigroup.com/ventures/productions',
    groupUrl: 'https://govindanigroup.com/ventures/productions',
    accent: '#fb7185',
    mark: 'https://gi-img-cdn.sujeet.workers.dev/Images/products/productions.svg',
    menuLine: 'The Sujeet Show, the channel, and every product film in-house.',
    headline: 'A group that tells its own story.',
    lede: "Most companies hire someone to explain what they do. We built a studio. Govindani Productions runs The Sujeet Show podcast and the founder's 100,000+ subscriber channel, and makes every product film in-house.",
    stats: [
      { v: '100K+', k: 'Channel subscribers' },
      { v: '79', k: 'Podcast episodes' },
      { v: '314', k: 'Videos published' },
      { v: '25+', k: 'Books by the founder' },
    ],
    whyTitle: 'Life, ambition and failure, in plain Hindi.',
    why: "Sujeet's podcast is about the things we should understand for a better life, told simply: the beginning, decisions, failure, focus, exams, office politics, entrepreneurship. 79 episodes across five seasons, from May 2021 to November 2022, for anyone who has struggled, failed and kept going.",
    points: [
      '79 episodes across five seasons, in Hindi, 2021–22',
      'On Apple Podcasts and YouTube, free to listen',
      "The founder's channel, past 100,000 subscribers and 314 videos",
      'Every product film in the group made in-house, not outsourced',
    ],
    features: [
      { t: 'The Sujeet Show', d: '79 Hindi episodes on life, ambition and failure, across five seasons.' },
      { t: 'The channel', d: 'Past 100,000 subscribers and 314 videos, run by the founder.' },
      { t: 'Product films', d: 'Every launch film and explainer in the group, shot and cut in-house.' },
      { t: 'Books', d: 'Twenty-five and more titles written by the founder alongside the channel.' },
    ],
    audience: 'The group itself, and anyone who would rather hear the thinking than read the brochure.',
    appCategory: 'Series',
  },
];

export const productBySlug = (slug: string) =>
  GROUP_PRODUCTS.find((p) => p.slug === slug);
