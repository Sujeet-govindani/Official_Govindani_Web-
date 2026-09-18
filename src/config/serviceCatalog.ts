/**
 * One list of what we sell, used by both the /services hub page and the bottom
 * dock's picker sheets. Add a service here and it appears in both places.
 *
 * Every `to` below is a route that exists in App.tsx.
 */

export type CatalogItem = {
  label: string;
  desc: string;
  to: string;
  /** Section id to scroll to after navigating, for pages that group several
      offerings on one route (e.g. the website pricing tiers). */
  hash?: string;
  /** When present the entry opens a nested picker instead of navigating. */
  children?: CatalogItem[];
};

export type CatalogGroup = {
  id: string;
  title: string;
  blurb: string;
  items: CatalogItem[];
};

export const SERVICE_GROUPS: CatalogGroup[] = [
  {
    id: "build",
    title: "Build",
    blurb: "The platforms your business runs on.",
    items: [
      {
        label: "Website Development",
        desc: "Custom, high-performance websites built to generate leads and authority.",
        to: "/services/website-creation",
      },
      {
        label: "E-Commerce Development",
        desc: "Conversion-focused stores with payment, shipping and automation built in.",
        to: "/services/ecommerce",
      },
      {
        label: "CRM Development",
        desc: "Industry-specific systems for leads, sales, follow-ups and workflows.",
        to: "/services/ci-crm",
      },
      {
        label: "Payment Gateway",
        desc: "Gateway integration and reconciliation that actually balances.",
        to: "/services/payment-gateway",
      },
      {
        label: "Checkout System",
        desc: "Fast, tested checkout flows that stop cart abandonment.",
        to: "/services/checkout-system",
      },
      {
        label: "Logistics Integration",
        desc: "Automated shipping and delivery with leading logistics partners.",
        to: "/services/logistic-integration",
      },
    ],
  },
  {
    id: "grow",
    title: "Grow",
    blurb: "Getting the right people to find you.",
    items: [
      {
        label: "Social Media Marketing",
        desc: "Strategic content and account management that builds digital authority.",
        to: "/services/social-media",
      },
      {
        label: "SEO",
        desc: "Rankings, visibility and organic traffic that compounds.",
        to: "/services/seo",
      },
      {
        label: "Meta Ads",
        desc: "High-converting Facebook and Instagram campaigns.",
        to: "/services/meta-ads",
      },
      {
        label: "Google Ads",
        desc: "ROI-driven search and display campaigns.",
        to: "/services/google-ads",
      },
      {
        label: "LinkedIn Ads",
        desc: "B2B pipeline from the platform decision-makers actually use.",
        to: "/services/linkedin-ads",
      },
      {
        label: "Lead Generation Systems",
        desc: "Capture, nurture and convert high-quality leads on autopilot.",
        to: "/services/lead-generation",
      },
      {
        label: "Marketplace Brand Listing",
        desc: "Onboarding and optimisation on Amazon, Myntra, Nykaa and Flipkart.",
        to: "/services/marketplace-brand-listing",
      },
    ],
  },
  {
    id: "automate",
    title: "Automate",
    blurb: "Work that runs without you in the room.",
    items: [
      {
        label: "WhatsApp Automation",
        desc: "Lead capture, support and sales conversion on WhatsApp.",
        to: "/services/whatsapp-flow",
      },
      {
        label: "AI Automation",
        desc: "AI workflows across communication, operations and customer journeys.",
        to: "/services/ai-automation",
      },
    ],
  },
  {
    id: "create",
    title: "Create",
    blurb: "How the brand looks, sounds and is remembered.",
    items: [
      {
        label: "Branding & Logo Design",
        desc: "Brand identity that builds trust and recognition.",
        to: "/services/logo-designing",
      },
      {
        label: "Graphic Design",
        desc: "Creative visuals for digital, social and promotional use.",
        to: "/services/graphic-designer",
      },
      {
        label: "Videography",
        desc: "Video production for marketing, branding and campaigns.",
        to: "/services/videography",
      },
      {
        label: "Video Editing",
        desc: "Editing that sharpens storytelling and holds attention.",
        to: "/services/video-editing",
      },
      {
        label: "Photography",
        desc: "Business, product and brand photography.",
        to: "/services/photography",
      },
      {
        label: "Product Shoot",
        desc: "Studio-quality product imagery built to convert.",
        to: "/services/product-shoot",
      },
      {
        label: "AI Product Shoot",
        desc: "Catalogue-ready product visuals without the studio day.",
        to: "/services/ai-product-shoot",
      },
      {
        label: "360° Virtual Tour",
        desc: "Immersive tours for real estate, hospitality and retail.",
        to: "/services/virtual-tours",
      },
    ],
  },
];

/** Flat list, for the dock sheet and for counting. */
export const ALL_SERVICES: CatalogItem[] = SERVICE_GROUPS.flatMap((g) => g.items);

export const PORTFOLIO_TYPES: CatalogItem[] = [
  { label: "NGO & Foundations", desc: "Donation platforms and NGO systems", to: "/portfolio/ngo" },
  { label: "E-Commerce", desc: "Stores, catalogues and checkout", to: "/portfolio/ecommerce" },
  { label: "Real Estate", desc: "Builders and property brands", to: "/portfolio/builders" },
  { label: "Healthcare", desc: "Clinics, hospitals and practitioners", to: "/portfolio/healthcare" },
  { label: "Hospitality", desc: "Hotels, resorts and venues", to: "/portfolio/hospitality" },
  { label: "Business Websites", desc: "Corporate and service businesses", to: "/portfolio/business" },
  { label: "Virtual Tours", desc: "360° immersive walkthroughs", to: "/portfolio/virtual-tour" },
];

/** The three website build types live as sections on /pricing/websites. */
export const WEBSITE_TYPES: CatalogItem[] = [
  {
    label: "WordPress",
    desc: "Blogs, portals and business sites",
    to: "/pricing/websites",
    hash: "wordpress-pricing",
  },
  {
    label: "Shopify",
    desc: "E-commerce and online stores",
    to: "/pricing/websites",
    hash: "shopify-pricing",
  },
  {
    label: "Custom Coding",
    desc: "Bespoke web applications",
    to: "/pricing/websites",
    hash: "custom-coding",
  },
];

/**
 * Retained for reference only — nothing imports this now.
 *
 * The menu used to offer five priced routes. We publish a price for Give Setu
 * and nothing else, so listing "Websites" and "Social Media" under Pricing sent
 * people to pages that could not answer the question they arrived with.
 */
export const PRICING_PLANS: CatalogItem[] = [
  {
    label: "Websites",
    desc: "WordPress, Shopify and custom builds",
    to: "/pricing/websites",
    children: WEBSITE_TYPES,
  },
  { label: "Social Media", desc: "SMM plans and management retainers", to: "/pricing/social-media" },
  { label: "NGO website", desc: "WordPress, Give Setu or custom-coded — compared", to: "/pricing/ngo-website" },
  { label: "Give Setu", desc: "Donations, 80G receipts and compliance", to: "/pricing/ngo-os" },
  { label: "Other Services", desc: "SEO, ads, branding and more", to: "/pricing/other-services" },
];
