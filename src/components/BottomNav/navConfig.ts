import type { LucideIcon } from "lucide-react";
import {
  Home,
  LayoutGrid,
  Briefcase,
  IndianRupee,
  Phone,
  ChevronLeft,
  Send,
  Sparkles,
  HeartHandshake,
  Users,
  FileText,
  Images,
  PlayCircle,
  Building2,
  Mail,
  MapPin,
  MoreHorizontal,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import type { IconType } from "react-icons";

import {
  ALL_SERVICES,
  PORTFOLIO_TYPES,
  type CatalogItem,
} from "@/config/serviceCatalog";

/**
 * `back`  — history back
 * `quote` — open the quote form
 * `sheet` — open this item's own picker sheet (its `options`)
 */
export type NavAction = "back" | "quote" | "sheet";

export type NavItem = {
  key: string;
  label: string;
  icon: LucideIcon | IconType;
  to?: string;
  href?: string;
  action?: NavAction;
  /** Renders as the raised centre button. One per config. */
  primary?: boolean;
  /** Present when action is "sheet" — what the picker lists. */
  options?: CatalogItem[];
  sheetTitle?: string;
};

export type NavConfig = {
  /** Animation key, so the dock re-renders when the section changes. */
  id: string;
  items: NavItem[];
};

const QUOTE_MSG = "Hi! I would like a quote.";

/* ------------------------------------------------------------------ *
 * Reusable slots
 * ------------------------------------------------------------------ */

const servicesSheet: NavItem = {
  key: "services",
  label: "Services",
  icon: LayoutGrid,
  action: "sheet",
  sheetTitle: "What do you need built?",
  options: [
    { label: "All Services", desc: "See the complete list on one page", to: "/services" },
    ...ALL_SERVICES,
  ],
};

const portfolioSheet: NavItem = {
  key: "work",
  label: "Work",
  icon: Briefcase,
  action: "sheet",
  sheetTitle: "Browse work by type",
  options: [
    { label: "Case Studies", desc: "Results, in detail", to: "/pages/case-study" },
    ...PORTFOLIO_TYPES,
  ],
};

// One destination, not a five-way pricing sheet. We publish a price for Give
// Setu; everything else is confirmed by the team, so offering a "pricing" picker
// promised numbers that are not there.
const pricingSheet: NavItem = {
  key: "givesetu",
  label: "Give Setu",
  icon: IndianRupee,
  to: "/pricing/ngo-os",
};

const chatSlot: NavItem = {
  key: "chat",
  label: "WhatsApp",
  icon: FaWhatsapp,
  href: "__wa__",
};

const backSlot: NavItem = {
  key: "back",
  label: "Back",
  icon: ChevronLeft,
  action: "back",
};

/* ------------------------------------------------------------------ *
 * Section configs
 * ------------------------------------------------------------------ */

const home: NavConfig = {
  id: "home",
  items: [
    { key: "home", label: "Home", icon: Home, to: "/" },
    servicesSheet,
    { key: "quote", label: "Get Quote", icon: Sparkles, action: "quote", primary: true },
    portfolioSheet,
    {
      key: "more",
      label: "More",
      icon: MoreHorizontal,
      action: "sheet",
      sheetTitle: "More",
      options: [
        { label: "NGO Ecosystem", desc: "Donation infrastructure for NGOs", to: "/pages/ngopage" },
        { label: "Give Setu", desc: "Donations, 80G receipts and compliance", to: "/pricing/ngo-os" },
        { label: "About the Company", desc: "Who we are", to: "/about-us/about-company" },
        { label: "About the Founder", desc: "Sujeet Govindani", to: "/about-us/about-founder" },
        { label: "Careers", desc: "Work with us", to: "/careers" },
        { label: "Contact Us", desc: "Talk to a human", to: "/contact-us" },
      ],
    },
  ],
};

const services: NavConfig = {
  id: "services",
  items: [backSlot, servicesSheet, { key: "quote", label: "Get Quote", icon: Sparkles, action: "quote", primary: true }, pricingSheet, chatSlot],
};

const portfolio: NavConfig = {
  id: "portfolio",
  items: [backSlot, portfolioSheet, { key: "quote", label: "Enquire", icon: Send, action: "quote", primary: true }, servicesSheet, chatSlot],
};

const ngo: NavConfig = {
  id: "ngo",
  items: [
    backSlot,
    { key: "ngo", label: "Give Setu", icon: HeartHandshake, to: "/pages/ngopage" },
    { key: "quote", label: "Book a Call", icon: Sparkles, action: "quote", primary: true },
    { key: "ngowork", label: "NGO Work", icon: Images, to: "/portfolio/ngo" },
    chatSlot,
  ],
};

const pricing: NavConfig = {
  id: "pricing",
  items: [backSlot, pricingSheet, { key: "quote", label: "Get Quote", icon: Sparkles, action: "quote", primary: true }, servicesSheet, chatSlot],
};

const whatsapp: NavConfig = {
  id: "whatsapp",
  items: [
    backSlot,
    {
      key: "suite",
      label: "Suite",
      icon: LayoutGrid,
      action: "sheet",
      sheetTitle: "WhatsApp suite",
      options: [
        { label: "WhatsApp Business API", desc: "Official API onboarding", to: "/whatsapp/business-api" },
        { label: "WhatsApp Automation", desc: "Flows that run themselves", to: "/whatsapp/automation" },
        { label: "Chatbot Builder", desc: "Build without code", to: "/whatsapp/chatbot-builder" },
        { label: "WhatsApp CRM", desc: "Conversations as pipeline", to: "/whatsapp/crm" },
        { label: "Click-to-WhatsApp Ads", desc: "Ads that open a chat", to: "/whatsapp/click-to-whatsapp-ads" },
        { label: "WhatsApp Commerce", desc: "Sell inside the chat", to: "/whatsapp/commerce" },
        { label: "Chat Widget", desc: "On-site WhatsApp entry point", to: "/whatsapp/chat-widget" },
        { label: "Instagram Automation", desc: "DMs and comments on autopilot", to: "/instagram/automation" },
      ],
    },
    { key: "quote", label: "Book Demo", icon: Sparkles, action: "quote", primary: true },
    {
      key: "industries",
      label: "Industries",
      icon: Building2,
      action: "sheet",
      sheetTitle: "By industry",
      options: [
        { label: "B2B Sales", desc: "Pipeline and follow-up", to: "/whatsapp/industries/b2b-sales" },
        { label: "Travel & Tourism", desc: "Bookings and itineraries", to: "/whatsapp/industries/travel-tourism" },
        { label: "Restaurants & Food", desc: "Orders and reservations", to: "/whatsapp/industries/restaurants-food" },
        { label: "Spas & Salons", desc: "Appointments and reminders", to: "/whatsapp/industries/spas-salons" },
        { label: "Health & Wellness", desc: "Programmes and check-ins", to: "/whatsapp/industries/health-wellness" },
        { label: "Beauty & Cosmetics", desc: "Catalogue and repeat orders", to: "/whatsapp/industries/beauty-cosmetics" },
        { label: "EdTech", desc: "Admissions and batches", to: "/whatsapp/industries/edtech" },
        { label: "Automotive", desc: "Test drives and servicing", to: "/whatsapp/industries/automotive" },
        { label: "Home Decor", desc: "Catalogue and quotations", to: "/whatsapp/industries/home-decor" },
        { label: "Marketing Agency", desc: "Client comms at scale", to: "/whatsapp/industries/marketing-agency" },
        { label: "Banking & Finance", desc: "Alerts and onboarding", to: "/whatsapp/industries/banking-finance" },
        { label: "Freelancers & Consultants", desc: "Enquiries to invoices", to: "/whatsapp/industries/freelancer-consultant" },
      ],
    },
    chatSlot,
  ],
};

const caseStudy: NavConfig = {
  id: "case-study",
  items: [
    backSlot,
    { key: "all", label: "All Cases", icon: FileText, to: "/pages/case-study" },
    { key: "quote", label: "Start Yours", icon: Sparkles, action: "quote", primary: true },
    portfolioSheet,
    chatSlot,
  ],
};

const about: NavConfig = {
  id: "about",
  items: [
    backSlot,
    { key: "company", label: "Company", icon: Building2, to: "/about-us/about-company" },
    { key: "quote", label: "Contact", icon: Send, action: "quote", primary: true },
    { key: "founder", label: "Founder", icon: Users, to: "/about-us/about-founder" },
    {
      key: "more",
      label: "More",
      icon: MoreHorizontal,
      action: "sheet",
      sheetTitle: "More",
      options: [
        { label: "Careers", desc: "Open roles", to: "/careers" },
        { label: "Explore Careers", desc: "How we hire", to: "/explore-career" },
        { label: "Tech Roles", desc: "Engineering openings", to: "/tech-roles" },
        { label: "Case Studies", desc: "Our work", to: "/pages/case-study" },
      ],
    },
  ],
};

const contact: NavConfig = {
  id: "contact",
  items: [
    backSlot,
    { key: "call", label: "Call", icon: Phone, href: "__tel__" },
    { key: "chat", label: "WhatsApp", icon: FaWhatsapp, href: "__wa__", primary: true },
    { key: "mail", label: "Email", icon: Mail, href: "__mail__" },
    { key: "map", label: "Visit", icon: MapPin, href: "__map__" },
  ],
};

const tutorials: NavConfig = {
  id: "tutorials",
  items: [
    backSlot,
    { key: "videos", label: "Videos", icon: PlayCircle, to: "/tutorials/ngo-videos" },
    { key: "quote", label: "Get Quote", icon: Sparkles, action: "quote", primary: true },
    { key: "ngo", label: "Give Setu", icon: HeartHandshake, to: "/pages/ngopage" },
    chatSlot,
  ],
};

const legal: NavConfig = {
  id: "legal",
  items: [
    backSlot,
    { key: "home", label: "Home", icon: Home, to: "/" },
    { key: "quote", label: "Contact", icon: Send, action: "quote", primary: true },
    { key: "sitemap", label: "Sitemap", icon: FileText, to: "/sitemap" },
    chatSlot,
  ],
};

/* ------------------------------------------------------------------ *
 * Resolver — most specific prefix wins, so order matters.
 * ------------------------------------------------------------------ */

const RULES: Array<[string, NavConfig]> = [
  ["/pages/ngopage", ngo],
  ["/portfolio/ngo", ngo],
  ["/services/social-media/ngo", ngo],
  ["/tutorials", tutorials],
  ["/pages/case-study", caseStudy],
  ["/portfolio", portfolio],
  ["/pricing", pricing],
  ["/whatsapp", whatsapp],
  ["/instagram", whatsapp],
  ["/rcs", whatsapp],
  ["/services", services],
  ["/real-estate", services],
  ["/about-us", about],
  ["/careers", about],
  ["/explore-career", about],
  ["/tech-roles", about],
  ["/contact-us", contact],
  ["/privacy-policy", legal],
  ["/terms-of-service", legal],
  ["/cookie-policy", legal],
  ["/sitemap", legal],
];

export function resolveNav(pathname: string): NavConfig {
  const path = pathname.toLowerCase().replace(/\/+$/, "") || "/";
  if (path === "/") return home;
  for (const [prefix, config] of RULES) {
    if (path === prefix || path.startsWith(prefix + "/")) return config;
  }
  return home;
}

export { QUOTE_MSG };
