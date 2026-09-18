/* ------------------------------------------------------------------
   Website tracks — platform x purpose.
   Content transcribed from the Comprehensive Digital Transformation
   Proposal dated 22-08-2026 (NGO Website / E-Commerce / Puja Booking).
   Prices are development cost excluding 18% GST unless stated.
   ------------------------------------------------------------------ */

export type TrackId =
  | 'wp-ngo' | 'wp-ecom' | 'shopify-ecom' | 'coded-ngo' | 'coded-ecom'
  | 'wp-generic' | 'coded-generic';

export const PLATFORMS = [
  { id: 'wordpress', label: 'WordPress', blurb: 'You own the install. No SaaS subscription, no vendor feature caps.' },
  { id: 'shopify',   label: 'Shopify',   blurb: 'Hosted commerce. Fastest to launch, platform fees apply.' },
  { id: 'coded',     label: 'Custom-coded', blurb: 'Built from the ground up. No platform ceiling at all.' },
];

export const PURPOSES = [
  { id: 'ngo',   label: 'For an NGO' },
  { id: 'ecom',  label: 'For e-commerce' },
  { id: 'other', label: 'Every other industry' },
];

/* which cells exist */
export const MATRIX: Record<string, Partial<Record<string, TrackId>>> = {
  wordpress: { ngo: 'wp-ngo', ecom: 'wp-ecom', other: 'wp-generic' },
  shopify:   { ecom: 'shopify-ecom' },
  coded:     { ngo: 'coded-ngo', ecom: 'coded-ecom', other: 'coded-generic' },
};

/* ---------------- WordPress · NGO — the proposal, in full -------------- */
export const WP_NGO = {
  id: 'wp-ngo' as TrackId,
  eyebrow: 'WordPress · For an NGO',
  title: 'A WordPress website your organisation owns outright.',
  price: '₹35,000',
  priceNote: '+ 18% GST · one-time development cost',
  totals: [
    ['NGO WordPress website development', '18 pages, 35 features, full handover', '₹35,000'],
    ['Razorpay integration & setup', 'Gateway connected, tested and live before handover', '₹2,500'],
    ['GST @ 18%', 'On ₹37,500 — development and Razorpay', '₹6,750'],
    ['Hosting & domain — 1 year', 'Only if you do not already have hosting. No GST on this line', '₹2,500'],
  ],
  totalWith: '₹46,750',
  totalWithout: '₹44,250',
  totalWithoutLabel: 'If you already have hosting',
  what: 'A professionally crafted, fully custom WordPress website built exclusively for your organisation. This is not a SaaS subscription plan — you own the website. No recurring platform fees, no third-party plan lock-ins, and no feature caps imposed by an external vendor. Full control. Full ownership.',
  timeline: '25 working days',
  timelineNote: 'Counted from advance payment, content submission and access credentials all being received.',
  afterYearOne: {
    title: 'What happens after the first year',
    body: 'The website is yours outright, so there is nothing to renew to keep it. What is not included beyond handover is our time: maintenance past the free 30 days, new case or campaign pages built by us, and changes after the design is locked are quoted as work. If you would rather those were simply covered, that is the argument for Give Setu Growth — the site sits inside the plan and so does the year.',
  },
  milestones: [
    ['Advance', 'Before work begins', '50%', '₹17,500', 'Immediately'],
    ['First draft approval', 'After the first design draft is shared', '30%', '₹10,500', 'Within 2 days of draft share'],
    ['Final delivery', 'Website live + handover complete', '20%', '₹7,000', 'Within 1 day of handover'],
  ],
  pages: [
    ['Home', 'Dynamic hero, mission highlights, donation CTA, program previews, testimonials, live counter'],
    ['About us', 'Organisation story, founder’s message, values, vision and mission'],
    ['Our mission & vision', 'Dedicated page expanding the cause, impact philosophy and long-term goals'],
    ['Our team', 'Team member cards with photo, designation and bio'],
    ['Programs / projects', 'Listing plus detail pages for all running and completed programs'],
    ['Campaign / cause pages', 'Individual campaign pages with progress bar, story and donate button'],
    ['Volunteer registration', 'Sign-up form with interest selection and automated confirmation email'],
    ['Donation page', 'Full Razorpay integration — one-time, custom amount, with donor certificate option'],
    ['Blog / news & updates', 'Categorised article listing plus detail page; publish from the dashboard'],
    ['Gallery / media', 'Photo and video gallery with filterable categories'],
    ['Events', 'Upcoming and past events with date, venue and registration link'],
    ['Impact stories / testimonials', 'Beneficiary stories and donor testimonials with media support'],
    ['CSR / partners', 'Corporate partner and donor logos, partnership program description'],
    ['FAQ', 'Accordion FAQs for donors, volunteers and general visitors'],
    ['Contact us', 'Contact form, Google Maps embed, social links, office address'],
    ['Terms & conditions', 'Legal page required by Razorpay and payment gateways'],
    ['Privacy policy', 'Data privacy page, required by Razorpay'],
    ['Refund & cancellation policy', 'Mandatory Razorpay requirement for donation refund procedures'],
  ],
  featureGroups: [
    {
      group: 'Donations & donor handling',
      items: [
        ['Razorpay donation integration', 'Live payment gateway — one-time and custom amounts, instant confirmation'],
        ['Automated donor email', 'Every donor receives a branded confirmation email immediately after donating'],
        ['Donor certificate (PDF)', 'Auto-generated downloadable acknowledgement certificate'],
        ['Campaign progress bar', 'Real-time fundraising goal tracker on each campaign page'],
        ['Admin donation dashboard', 'View all donations, donor details and amounts from the backend'],
        ['Donation export (CSV / Excel)', 'One-click donor data export for accounting and reporting'],
        ['Custom & preset amounts', 'Donor types any amount, or quick-selects ₹500 / ₹1,000 / ₹5,000'],
        ['Pop-up donation prompt', 'Timed or scroll-triggered prompt on key pages'],
        ['Live donor / impact counter', 'Animated counter showing donors, funds raised and beneficiaries served'],
        ['80G / tax receipt ready', 'Structured to carry your 80G number in the certificate output'],
      ],
    },
    {
      group: 'Running it without a developer',
      items: [
        ['Program / project management', 'Create, edit and publish programs from the backend'],
        ['Blog / news publishing', 'Rich text editor, categories, tags, featured images, SEO fields'],
        ['Events calendar', 'Upcoming events with date countdown and registration'],
        ['Gallery management', 'Upload photos and videos directly from the admin panel'],
        ['Team member management', 'Add, edit and remove members with photo and bio'],
        ['Testimonial / impact management', 'Add beneficiary stories and donor testimonials from the backend'],
        ['Partner / sponsor logos', 'Managed logo section you update yourself'],
        ['Multi-admin role support', 'Multiple staff log in with individual permissions'],
        ['Admin tutorial videos', 'Screen-recorded walkthroughs of every major function — no dependency on us'],
      ],
    },
    {
      group: 'Reach, speed and trust',
      items: [
        ['On-page SEO', 'Meta titles, descriptions, Open Graph tags, XML sitemap'],
        ['Google Analytics', 'Visitors, sessions and donation-page conversions'],
        ['Google Tag Manager ready', 'Pre-connected for future marketing tags without code changes'],
        ['Social media integration', 'Live feed and share buttons on blog, campaign and donation pages'],
        ['WhatsApp chat widget', 'Floating button for instant visitor enquiry'],
        ['Mobile responsive design', 'Pixel-perfect on mobile, tablet and desktop'],
        ['Cross-browser tested', 'Chrome, Firefox, Safari and Edge'],
        ['Speed optimisation', 'Image compression, lazy loading and caching'],
        ['SSL ready (HTTPS)', 'Secure connection — required for the gateway and for donor trust'],
        ['SMTP email configuration', 'Website email sent via professional SMTP, not generic server mail'],
        ['Google Maps embed', 'Office location on the contact page'],
        ['Volunteer & contact forms', 'Auto email to admin and volunteer, with anti-spam protection'],
      ],
    },
    {
      group: 'Handover',
      items: [
        ['30-day free maintenance', 'All bugs from any source — Razorpay, hosting, email — fixed at zero cost for 30 days'],
        ['Website transfer & handover', 'Full credentials, source access and a walkthrough on final delivery'],
      ],
    },
  ],
};

/* ---------------- WordPress · E-commerce (WooCommerce) ---------------- */
export const WP_ECOM = {
  id: 'wp-ecom' as TrackId,
  eyebrow: 'WordPress · For e-commerce',
  title: 'WooCommerce, with our own plugin instead of a dozen paid ones.',
  price: '₹48,000',
  priceNote: '+ 18% GST · one-time, includes the proprietary plugin',
  totals: [
    ['WordPress e-commerce + custom plugin', 'WooCommerce, proprietary plugin, 20 pages', '₹48,000'],
    ['Custom booking plugin', 'Included in the development price', 'Included'],
    ['Product listing — 25 products', 'Content and images provided by you', 'Included'],
    ['GST @ 18%', 'On development cost', '₹8,640'],
    ['Shared hosting — 1 year', 'Only if you do not already have hosting. No GST on this line', '₹2,500'],
  ],
  totalWith: '₹59,140',
  totalWithout: '₹56,640',
  totalWithoutLabel: 'If you already have hosting',
  what: 'A complete e-commerce website on WordPress with WooCommerce, augmented by our own custom-built plugin that replaces the need for dozens of expensive third-party tools. No Shopify. No third-party SaaS fees. The plugin is installed on your WordPress installation and it is yours.',
  timeline: '30 working days',
  timelineNote: 'Counted from advance payment, content submission and access credentials all being received.',
  milestones: [
    ['Advance', 'Before work begins', '50%', '₹24,000', 'Immediately'],
    ['First draft approval', 'After the first design draft is shared', '30%', '₹14,400', 'Within 2 days of draft share'],
    ['Final delivery', 'Website live + handover complete', '20%', '₹9,600', 'Within 1 day of handover'],
  ],
  featureGroups: [
    {
      group: 'What our plugin replaces',
      items: [
        ['Supreme coupon engine', 'Unlimited coupons — percentage, flat, free shipping, product-specific, cart-minimum, first-order, user-specific, with full expiry and usage-limit controls'],
        ['Marketing tools dashboard', 'Flash sales, BOGO, referral codes and a loyalty point system from one admin panel'],
        ['Customer email automation', 'Branded transactional email for order placed, payment confirmed, processed, shipped, out for delivery, delivered, cancelled, refund initiated and refund completed'],
        ['Order management system', 'View, filter, process, hold, cancel and update orders from a single screen built for speed'],
        ['Return & refund management', 'Customer submits, admin approves or rejects, refund processed through the gateway — full audit trail'],
        ['Real-time order tracking', 'Confirmed → packed → shipped → out for delivery → delivered, visible to the customer and by email'],
        ['Partial COD', 'Customer pays part online at checkout, the rest on delivery — configurable ratio per category or product'],
        ['Inventory & stock alerts', 'Live stock tracking, low-stock email alerts, automatic out-of-stock badges'],
        ['Sales analytics', 'Revenue charts, top-selling products, order volume trends and coupon performance'],
      ],
    },
    {
      group: 'Booking system — built for puja commerce',
      items: [
        ['Creation panel', 'Create a booking event with title, description, rich content, embedded video, image gallery and pricing plans — no developer needed'],
        ['Multi-plan per event', 'Each event carries several plans, each with different inclusions and prices'],
        ['Physical product bundling', 'Attach specific WooCommerce products to a plan — booking one automatically adds them to the delivery order'],
        ['Auto order generation', 'The moment a booking is made, the product delivery order is created in the backend with no manual intervention'],
        ['Admin booking dashboard', 'All bookings, filterable by event, date and status; mark complete and dispatch delivery from one screen'],
        ['Confirmation emails', 'Branded confirmation carrying the event, the plan, the products to be delivered and the expected date'],
      ],
    },
  ],
  pagesCount: 20,
};

/* ---------------- Custom-coded · E-commerce ---------------- */
export const CODED_ECOM = {
  id: 'coded-ecom' as TrackId,
  eyebrow: 'Custom-coded · For e-commerce',
  title: 'Spring Boot and React. No platform ceiling at all.',
  price: '₹2,50,000',
  priceNote: '+ 18% GST · one-time · runs on your own server',
  totals: [
    ['Custom-coded e-commerce + booking system', 'Spring Boot + React, full-stack development', '₹2,50,000'],
    ['GST @ 18%', 'On development cost', '₹45,000'],
    ['Server', 'Yours — bought in your name, billed to you directly by the provider', 'Not charged by us'],
    ['3 months maintenance', 'From the date of handover', 'Included'],
  ],
  totalWith: '₹2,95,000',
  totalWithout: '₹2,50,000',
  totalWithoutLabel: 'Development cost before GST',
  what: 'A ground-up custom-coded platform — backend on Spring Boot (Java), frontend on React. The same class of technology used by large Indian marketplaces. It is not limited by WordPress’s architecture, plugin conflicts or hosting restrictions. Every behaviour and every screen is engineered to your requirements.',
  timeline: '48 working days',
  timelineNote: 'Counted from advance payment, content submission and approvals all being received.',
  milestones: [
    ['Advance', 'Before work begins', '50%', '₹1,25,000', 'Immediately'],
    ['First draft approval', 'After the first design draft is shared', '30%', '₹75,000', 'Within 2 days of draft share'],
    ['Final delivery', 'Website live + handover complete', '20%', '₹50,000', 'Within 1 day of handover'],
  ],
  featureGroups: [
    {
      group: 'What is built',
      items: [
        ['Spring Boot REST API backend', 'High-performance Java backend serving products, orders, bookings and payments over secure REST APIs'],
        ['React frontend application', 'Component-driven UI, pixel-perfect on all devices, with server-side rendering capability for SEO'],
        ['Complete e-commerce module', 'Catalogue, cart, checkout, orders and returns — the same business logic as the WooCommerce build, with zero dependency on WordPress'],
        ['Proprietary booking module', 'The same booking system, built as a native coded module rather than a plugin'],
        ['Supreme custom UI / UX', 'Crafted to your brand — every spacing, colour, interaction and animation is custom. Nothing is a template'],
        ['Custom admin panel', 'A dedicated dashboard for product management, order fulfilment, booking tracking and reports'],
        ['Payment gateway integration', 'Razorpay or Cashfree — UPI, cards, net banking, EMI and partial COD via custom API integration, not a plugin'],
        ['JWT authentication', 'Token-based login for customers and admin with no third-party auth dependency'],
        ['Deployed on your own server', 'A dedicated server, not shared hosting. It is bought in your name and billed to you directly, so your platform never sits inside a vendor account. We size it, set it up, secure it and deploy to it.'],
        ['3 months maintenance, included', 'All bugs from any source covered for three months from handover, at no cost.'],
        ['Future scalability', 'The architecture allows mobile apps, third-party integrations and marketplace features without rebuilding'],
      ],
    },
  ],
  hosting: [
    ['VPS server — recommended to start', 'Dedicated RAM and CPU, predictable billing, no surprise charges. We handle setup, configuration, SSL, deployment and hardening. You own the server account. Recommended spec 4 GB RAM / 2 vCPU / 80 GB SSD.', '₹15,000 – ₹16,000 / year'],
    ['Amazon AWS — for scale-first', 'Pay-per-use; no fixed annual prepayment. Our recommended starter configuration typically runs at $20–25/month for low-to-medium traffic and scales automatically as orders grow.', '≈ $20–25 / month, billed by AWS'],
  ],
  hostingNote: 'A custom-coded application cannot run on shared hosting; a dedicated server environment is required. The server is yours — bought in your own name and paid to the provider directly — so nothing about your platform sits inside a vendor account. Start on VPS for predictable cost; we migrate you to AWS when order volume needs elastic scaling.',
  tradeoff: {
    title: 'What a one-time build does not include',
    body: 'This is bought once and owned outright, which also means it carries no subscription behind it — and therefore none of the monthly design template library that Give Setu plans receive. No new festival or disaster-appeal templates arrive each month. What is built is what you have, and changes after handover are quoted as work.',
  },
};

/* ---------------- Shopify · E-commerce ----------------
   Shopify's own subscription prices read from shopify.com/in/pricing on
   7 September 2026. They are what the client pays Shopify, not us.        */
export const SHOPIFY_ECOM = {
  id: 'shopify-ecom' as const,
  eyebrow: 'Shopify · For e-commerce',
  title: 'The fastest route to a working store.',
  price: 'From ₹75,000',
  priceNote: '+ 18% GST · one-time build cost · Shopify’s own subscription is separate',
  totals: [
    ['Shopify store build', 'Theme development, configuration, product setup, launch', '₹75,000'],
    ['GST @ 18%', 'On development cost', '₹13,500'],
    ['Shopify subscription', 'Paid by you to Shopify, every month, for as long as you trade', 'Not charged by us'],
  ],
  totalWith: '₹88,500',
  totalWithout: '₹75,000',
  totalWithoutLabel: 'Build cost before GST',
  what: 'Shopify carries the hosting, security, updates and payments for you, which is why it is the quickest way to start selling. We build the store on top of it — theme, structure, product setup, checkout and launch. The trade-off is honest and worth reading before you commit: you rent the platform for as long as you trade on it.',
  timeline: '20 working days',
  timelineNote: 'Counted from advance payment, content submission and store access being received.',
  milestones: [
    ['Advance', 'Before work begins', '50%', '₹37,500', 'Immediately'],
    ['First draft approval', 'After the first design draft is shared', '30%', '₹22,500', 'Within 2 days of draft share'],
    ['Final delivery', 'Store live + handover complete', '20%', '₹15,000', 'Within 1 day of handover'],
  ],
  platformCost: {
    title: 'What Shopify charges you, every month, forever',
    note: 'Read off shopify.com/in/pricing on 7 September 2026. This is separate from our build cost and is paid by you directly to Shopify.',
    url: 'https://www.shopify.com/in/pricing',
    rows: [
      ['Basic', '₹1,499 / month on annual billing', '₹17,988 a year'],
      ['Grow', '₹5,599 / month on annual billing', '₹67,188 a year'],
      ['Advanced', '₹22,680 / month on annual billing', '₹2,72,160 a year'],
      ['Plus', 'From ₹1,75,000 / month', '₹21,00,000 a year'],
    ],
    kicker: 'A store on the Grow plan pays Shopify ₹67,188 every year and owns nothing at the end of it. Our WooCommerce build is ₹48,000 once, and the installation is yours — which is why the honest recommendation below is not always Shopify.',
  },
  featureGroups: [
    {
      group: 'What we build on it',
      items: [
        ['Theme development and brand fit', 'Your colours, typography, layout and imagery applied throughout, not a stock theme left as-is.'],
        ['Product and collection setup', 'Catalogue structure, categories, variants, tags and filters configured so the store is navigable from day one.'],
        ['Checkout and payments', 'Payment provider connected and tested, with a live test order placed before launch.'],
        ['Shipping and tax configuration', 'Zones, rates and tax settings configured to how you actually ship.'],
        ['Essential pages', 'Home, shop, product, cart, checkout, about, contact, and the policy pages payment providers require.'],
        ['Analytics and tracking', 'Google Analytics and Tag Manager connected, conversion tracking verified.'],
        ['Handover with tutorials', 'Screen-recorded walkthroughs of every admin function, so your team runs the store without us.'],
      ],
    },
    {
      group: 'Where Shopify will limit you',
      items: [
        ['The monthly fee never stops', 'It rises as you grow — Basic to Grow to Advanced — and none of it builds equity in something you own.'],
        ['Third-party transaction fees', 'Using a payment provider other than Shopify Payments attracts an additional fee, the rate depending on your plan.'],
        ['App subscriptions stack up', 'Capability Shopify does not include is bought as apps, each with its own monthly fee, and they compound.'],
        ['You work inside the platform', 'Behaviour Shopify does not support cannot be built. On WooCommerce or a custom build, it can.'],
      ],
    },
  ],
  pagesCount: 8,
  upsell: {
    title: 'When we will tell you not to choose Shopify',
    body: 'If your monthly Shopify and app fees are heading past roughly ₹5,000, the arithmetic stops favouring renting. Our WooCommerce build is ₹48,000 once and the plugin that replaces most of those paid apps is included — coupons, loyalty, referrals, partial COD, returns, order tracking and email automation. If your requirement goes past what WooCommerce can do comfortably, the custom-coded build is the honest answer, not a bigger Shopify plan.',
  },
};

/* ---------------- Custom-coded · NGO ---------------- */
export const CODED_NGO = {
  id: 'coded-ngo' as TrackId,
  eyebrow: 'Custom-coded · For an NGO',
  title: 'A custom-coded NGO platform, or the whole operating system.',
  price: 'Quoted to scope',
  priceNote: 'Our published custom-coded build rate starts at ₹2,50,000 + 18% GST',
  what: 'A custom-coded NGO site is built the same way as the e-commerce platform — Spring Boot and React, your own server, no platform ceiling. Because an NGO build turns on how many of donations, receipting, membership, cases and compliance you need, it is quoted against your actual scope rather than sold as a fixed package.',
  cta: 'Most organisations asking for this are better served by Give Setu, where the custom-coded website is included inside the annual plan rather than bought separately.',
  ctaHref: '/pricing/ngo-os',
  ctaLabel: 'See Give Setu',
};

/* ---------------- WordPress · every other industry ----------------
   Three tiers, because a clinic, a builder and a manufacturer are not
   buying the same size of site. Tier contents describe scale; the exact
   page list is fixed at scoping.                                        */
export const WP_GENERIC = {
  id: 'wp-generic' as const,
  eyebrow: 'WordPress · Every other industry',
  title: 'A website your business owns, in three sizes.',
  intro: 'Clinics, builders, manufacturers, consultants, schools, hospitality — the build is the same discipline, and only the scale changes. Every tier is a one-time cost. There is no monthly platform fee and nothing to renew except your hosting and domain.',
  tiers: [
    {
      name: 'Short', price: '₹25,000', tag: 'A credible presence',
      best: 'A single service, a single location, and a clear reason to call you.',
      points: [
        'Up to 6 pages — home, about, services, gallery, contact and one policy page',
        'Enquiry form delivered straight to your inbox, with anti-spam',
        'WhatsApp chat button and Google Maps on contact',
        'Mobile responsive, cross-browser tested, SSL',
        'On-page SEO — titles, descriptions, Open Graph, XML sitemap',
        'Google Analytics connected',
        '30-day free maintenance after handover',
      ],
    },
    {
      name: 'Mid', price: '₹35,000', tag: 'Most businesses land here', rec: true,
      best: 'Several services or locations, and content you intend to keep publishing.',
      points: [
        'Everything in Short',
        'Up to 15 pages, including individual pages per service',
        'Blog or news system you publish from the dashboard — categories, tags, images',
        'Gallery and testimonial management you control',
        'Team and partner sections, editable without a developer',
        'Google Tag Manager pre-connected for future marketing tags',
        'Speed optimisation — compression, lazy loading, caching',
        'Admin tutorial videos so your team runs it without us',
      ],
    },
    {
      name: 'Advance', price: '₹45,000', tag: 'When the site has to do work',
      best: 'Lead capture that feeds a process, or a catalogue people browse before enquiring.',
      points: [
        'Everything in Mid',
        'Up to 25 pages',
        'Product or catalogue listing with filters — browse and enquire, without a checkout',
        'Multi-step enquiry forms routed to different inboxes by service',
        'Events or appointments listing with registration',
        'Multi-admin roles so several staff log in with their own permissions',
        'SMTP email configuration so mail is delivered properly, not to spam',
        'Priority handling during the 30-day maintenance window',
      ],
    },
  ],
  note: 'All three are plus 18% GST. Hosting and domain are ₹2,500 + GST a year if you do not already have them. Payment follows the same 50 / 30 / 20 milestones as every other build.',
  outro: 'If what you need is a store, a donation engine or a booking system, none of these three is the right answer — the e-commerce and NGO tracks are.',
};

export const CODED_GENERIC = {
  id: 'coded-generic' as const,
  eyebrow: 'Custom-coded · Every other industry',
  title: 'When the website is really an application.',
  price: 'From ₹2,50,000',
  priceNote: '+ 18% GST · quoted against your scope · runs on your own server',
  what: 'Some businesses do not need a website — they need software with a website attached. A portal customers log into, a dashboard your team works in, a calculator or configurator that drives the enquiry, an integration with the system you already run. That is coded work, priced against what it actually has to do, on the same Spring Boot and React foundation as our e-commerce platform.',
  cta: 'The fastest way to a real number is a scoping call. Bring what it must do; we quote against that rather than a package.',
  ctaHref: '/contact-us/',
  ctaLabel: 'Book a scoping call',
};

/* ---------------- Shared: what applies to every build ---------------- */
export const COMMON_TERMS = [
  ['Scope lock', 'The scope is what the quotation lists. Anything not explicitly listed is out of scope and quoted separately, and cannot delay in-scope delivery.'],
  ['Design lock', 'Once the design is approved in writing, no structural layout changes are permitted. Content-level changes — text and images — remain permitted until the first-draft stage.'],
  ['Revision limit', 'Two rounds of revision are included at the design stage and at the first-draft stage. Further rounds are ₹500 each on WordPress, ₹1,500 each on custom-coded.'],
  ['Feedback window', 'Consolidated feedback within 3 working days of any draft. If none arrives in that window the draft is treated as approved and development proceeds.'],
  ['Client delay clause', 'Late content, feedback, payment or credentials extend the deadline day-for-day.'],
  ['Timeline start condition', 'The clock starts only when all three are true: advance received, content submitted in full, and hosting or server access provided.'],
  ['Ownership on full payment', 'On receipt of 100% payment you own the website — all code, design assets and content built for the project transfers to you.'],
  ['Custom plugins', 'Our proprietary plugins are licensed for use on your website only. Redistribution or resale is not permitted.'],
  ['No product image creation', 'We design website layout graphics and UI elements. Product photography, and any stock imagery, is provided by you or purchased separately.'],
  ['Content responsibility', 'All written content, images, videos, logos and product data are provided by you unless separately contracted.'],
  ['Third-party charges', 'Paid plugins and services are passed through at actuals with zero markup. Gateway and shipping transaction fees are borne by you.'],
  ['GST', 'All prices are exclusive of GST, charged at 18%.'],
];

export const PHASED = {
  title: 'Start smart. Scale when the data says so.',
  body: 'We do not over-engineer to bill more. Start on WordPress — it comfortably handles thousands of orders a month, your team can run it, and it costs a fraction of the custom-coded path. Move to custom-coded when you are consistently processing orders and genuinely feel the ceiling. At that point we migrate your data, catalogue, booking history and customer accounts. Nothing is lost. You upgrade from a position of strength, not speculation.',
};
