import React, { useEffect, useRef, useState } from 'react';
import { useHeaderSkin } from '@/hooks/useHeaderTint';
import LangToggle from '../../i18n/LangToggle';
import { PRICING_LIVE, usePreviewVisible } from '@/config/flags';
import { Menu, X, ChevronRight, ChevronDown } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const colors = {
  midnightBlue: '#0B1929',
  darkBlue: '#162438',
  white: '#FFFFFF',
  gold: '#D4AF37',
  royalBlue: '#4169E1',
  glowGold: 'rgba(212, 175, 55, 0.3)',
  glowBlue: 'rgba(65, 105, 225, 0.3)',
};

const allServicesMap: Record<string, { title: string; image: string; link: string }> = {
  'WhatsApp Flow': { title: 'WhatsApp Flow', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/WAICON.webp', link: '/services/whatsapp-flow' },
  'Google Ads': { title: 'Google Ads', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/GADSICON.webp', link: '/services/google-ads' },
  'Social Media Marketing': { title: 'Social Media Marketing', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/SMMICON.webp', link: '/services/social-media' },
  'Logo Designing': { title: 'Logo Designing', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/LDICON.png', link: '/services/logo-designing' },
  'Lead Generation': { title: 'Lead Generation', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/LGICON.png', link: '/services/lead-generation' },
  'Videography': { title: 'Videography', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/VIDEOGRAPHYICON.webp', link: '/services/videography' },
  '360° Virtual Tour': { title: '360° Virtual Tour', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/360VT.webp', link: '/services/virtual-tours' },
  'Ecommerce Platform Listing': { title: 'Ecommerce Platform Listing', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/EPLICON.png', link: '/services/platform-listing' },
  'Product Shoot': { title: 'Product Shoot', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PSICON.webp', link: '/services/product-shoot' },
  'Website Creation': { title: 'Website Creation', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/WCICON.webp', link: '/services/website-creation' },
  'SEO': { title: 'SEO', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/SEOICON.webp', link: '/services/seo' },
  'Graphic Designer': { title: 'Graphic Designer', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/GRAPHICICON.webp', link: '/services/graphic-designer' },

  'Advanced Checkout System': { title: 'Advanced Checkout System', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ACSicon.webp', link: '/services/checkout-system' },
  // ── Newly added services ──
  'Meta Ads': { title: 'Meta Ads', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/MADSICON.png', link: '/services/meta-ads' },
  'Logistic Integration': { title: 'Logistic Integration', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/LIICON.webp', link: '/services/logistic-integration' },
  'Payment Gateway': { title: 'Payment Gateway', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PGIICON.webp', link: '/services/payment-gateway' },
  'AI Automation': { title: 'AI Automation', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/AAICON.webp', link: '/services/ai-automation' },
  'Video Editing': { title: 'Video Editing', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/VEICON.webp', link: '/services/video-editing' },
};

const categoryFirstCards: Record<string, { title: string; image: string; link: string }> = {
  'NGO': { title: 'NGO', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ngoicon.webp', link: '/pages/NgoPage' },
  'Real Estate': { title: 'Real Estate', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/REICON.webp', link: '/portfolio/virtual-tour' },
  'Ecommerce': { title: 'E-Commerce', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ECOMMERCEICON.webp', link: '/services/ecommerce' },
};

const categoryHighlights: Record<string, string[]> = {
  'All': ['WhatsApp Flow', 'Google Ads', 'Social Media Marketing', 'Logo Designing', 'Meta Ads', 'AI Automation'],
  'NGO': ['Social Media Marketing', 'Logo Designing', 'WhatsApp Flow', 'Lead Generation'],
  'Real Estate': ['Lead Generation', 'Google Ads', 'WhatsApp Flow', 'Videography', '360° Virtual Tour'],
  'Ecommerce': ['Ecommerce Platform Listing', 'Product Shoot', 'Google Ads', 'WhatsApp Flow', 'Social Media Marketing', 'Logistic Integration', 'Payment Gateway'],
  'Healthcare': ['WhatsApp Flow', 'Website Creation', 'Lead Generation', 'Social Media Marketing', 'Payment Gateway'],
  'Personal Brand': ['Social Media Marketing', 'Videography', 'WhatsApp Flow', 'Logo Designing', 'Video Editing', 'AI Automation'],
};

const allDefaults = categoryHighlights['All'];

const getOrderedServices = (category: string) => {
  const highlights = categoryHighlights[category] || [];
  const seen = new Set<string>();
  const result: { title: string; image: string; link: string; highlighted: boolean }[] = [];
  const firstCard = categoryFirstCards[category];
  if (firstCard) result.push({ ...firstCard, highlighted: true });
  for (const name of highlights) {
    if (!seen.has(name) && allServicesMap[name]) { seen.add(name); result.push({ ...allServicesMap[name], highlighted: true }); }
  }
  for (const name of allDefaults) {
    if (!seen.has(name) && allServicesMap[name]) { seen.add(name); result.push({ ...allServicesMap[name], highlighted: true }); }
  }
  for (const name of Object.keys(allServicesMap)) {
    if (!seen.has(name)) { seen.add(name); result.push({ ...allServicesMap[name], highlighted: false }); }
  }
  return result;
};

const socialMediaPages = [
  { title: 'NGO', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ngoicon.webp', link: '/services/social-media/ngo' },
  { title: 'Real Estate', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/REICON.webp', link: '/services/social-media/real-estate' },
  { title: 'Ecommerce', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ECOMMERCEICON.webp', link: '/services/social-media/ecommerce' },
  { title: 'Hospitality', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/RESTOICON.webp', link: '/services/social-media/hospitality' },
  { title: 'Astrology & Spiritual', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ANSICON.webp', link: '/services/social-media/astrology' },
];

const resourcesData = [
  { title: 'Case Study', icon: '📋', link: '/pages/case-study', description: 'Real results from real clients.' },
  { title: 'Tutorials', icon: '🎓', link: '/tutorials/ngo-videos', description: 'Step-by-step guides & how-tos.' },
  { title: 'Careers', icon: '💼', link: '/careers', description: 'Join our team and make a difference.' },
];

const portfolioData = [
  { title: 'NGO', icon: '📲', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ngoicon.webp', link: '/portfolio/ngo' },
  { title: 'Real Estate', icon: '✨', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/REICON.webp', link: '/portfolio/builders' },
  { title: 'E-Commerce', icon: '🛍️', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ECOMMERCEICON.webp', link: '/portfolio/ecommerce' },
  { title: 'Healthcare', icon: '🏥', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/HEALTHCAREICON.webp', link: '/portfolio/healthcare' },
  { title: 'Business Websites', icon: '🌐', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/BWICON.webp', link: '/portfolio/business' },
  { title: 'Hospitality', icon: '🏨', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/RESTOICON.webp', link: '/portfolio/hospitality' },
];

const seoPortfolioData = [
  { title: 'NGO SEO', icon: '🤝', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/SEOICON.webp', link: '/services/seo' },
  { title: 'Hospitality SEO', icon: '🏨', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/SEOICON.webp', link: '/services/seo' },
  { title: 'Real Estate SEO', icon: '🏢', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/SEOICON.webp', link: '/services/seo' },
  { title: 'Ecommerce SEO', icon: '🛍️', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/SEOICON.webp', link: '/services/seo' },
];

const socialMediaPortfolioData = [
  { title: 'NGO', icon: '🤝', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ngoicon.webp', link: '/services/social-media/ngo' },
  { title: 'Real Estate', icon: '🏢', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/REICON.webp', link: '/services/social-media/real-estate' },
  { title: 'Ecommerce', icon: '🛍️', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ECOMMERCEICON.webp', link: '/services/social-media/ecommerce' },
  { title: 'Hospitality', icon: '🏨', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/RESTOICON.webp', link: '/services/social-media/hospitality' },
  { title: 'Astrology & Spiritual', icon: '🔮', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ANSICON.webp', link: '/services/social-media/astrology' },
];

const applicationsPortfolioData = [
  { title: 'CI Builder CRM', icon: '', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/CRMICON.webp', link: '/services/ci-crm' },
  { title: 'Hotelfolio CRM', icon: '', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/CRMICON.webp', link: '/services/hotel-crm' },
  { title: 'Car Washing CRM', icon: '', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/CRMICON.webp', link: '/services/car-wash-crm' },
];

const saasPortfolioData = [
  { title: 'CI Builder CRM', icon: '', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/CRMICON.webp', link: '/services/ci-crm' },
  { title: 'Hotelfolio CRM', icon: '', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/CRMICON.webp', link: '/services/hotel-crm' },
  { title: 'Car Washing CRM', icon: '', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/CRMICON.webp', link: '/services/car-wash-crm' },
];

const portfolioFilters = ['Websites', 'Whatsapp Interakt', 'Social Media', 'SEO', 'Applications', 'SaaS'];

const whatsappIndustries = [
  { name: 'B2B Sales', icon: '💼', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wasapi1.webp', link: '/WhatsappInterakt/b2b-sales' },
  { name: 'Travel and Tourism', icon: '✈️', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wasapi2.webp', link: '/whatsapp/industries/travel-tourism' },
  { name: 'Restaurants & Food Business', icon: '🍽️', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wasapi3.webp', link: '/whatsapp/industries/restaurants-food' },
  { name: 'Spas and Salons', icon: '💆', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wasapi4.webp', link: '/whatsapp/industries/spas-salons' },
  { name: 'Health & Wellness Brands', icon: '💚', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wasapi5.webp', link: '/whatsapp/industries/health-wellness' },
  { name: 'Beauty & Cosmetic Brands', icon: '💄', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wasapi6.webp', link: '/whatsapp/industries/beauty-cosmetics' },
  { name: 'Automotive Industry', icon: '🎓', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wasapi7.webp', link: '/whatsapp/industries/automotive' },
  { name: 'Home Decor & Furnishing', icon: '🚗', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wasapi8.webp', link: '/whatsapp/industries/home-decor' },
  { name: 'Marketing Agency', icon: '🏠', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wasapi9.webp', link: '/whatsapp/industries/marketing-agency' },
  { name: 'Banking and Finance', icon: '📢', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wasapi10.webp', link: '/whatsapp/industries/banking-finance' },
  { name: 'Real Estate', icon: '🏢', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wasapi11.webp', link: '/whatsapp/industries/real-estate' },
  { name: 'Freelancer and Consultant Sales', icon: '👤', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wasapi12.webp', link: '/whatsapp/industries/freelancer-consultant' },
];

const aboutData = [
  { title: 'About Founder', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Sujeetsir.webp', description: 'Visionary leader behind our creative journey.', Route: '/about-us/about-founder' },
  { title: 'About Company', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/govindanilogomain.webp', description: 'Building brands that inspire and connect.', Route: '/about-us/about-company' },
];

const whatsappChannels = [
  {
    name: 'WhatsApp', icon: '', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/wpicon.webp', isNew: false,
    subItems: [
      { title: 'WhatsApp Voice Calling', link: '/whatsapp/voice-calling', isNew: false },
      { title: 'No Code Chatbot Builder', link: '/whatsapp/chatbot-builder', isNew: true },
      { title: 'WhatsApp Business API', link: '/whatsapp/business-api', isNew: false },
      { title: 'WhatsApp Forms', link: '/whatsapp/forms', isNew: false },
      { title: 'Click to WhatsApp Ads', link: '/whatsapp/click-to-whatsapp-ads', isNew: false },
      { title: 'WhatsApp Marketing', link: '/whatsapp/marketing', isNew: false },
      { title: 'WhatsApp Automation', link: '/whatsapp/automation', isNew: false },
      { title: 'WhatsApp CRM', link: '/whatsapp/crm', isNew: false },
      { title: 'WhatsApp Commerce', link: '/whatsapp/commerce', isNew: false },
      { title: 'WhatsApp Chat Widget', link: '/whatsapp/chat-widget', isNew: false },
      { title: 'WhatsApp Notification Library', link: '/whatsapp/notification-library', isNew: false },
    ],
  },
  {
    name: 'Instagram', icon: '', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Instagram_icon.webp', isNew: false,
    subItems: [{ title: 'Instagram Automation', link: '/instagram/automation', isNew: false }],
  },
  {
    name: 'RCS Fallback', icon: '💬', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/icons/rcs-fallback.png', isNew: true,
    subItems: [{ title: 'RCS Fallback', link: '/rcs/fallback', isNew: false }],
  },
];

const websiteSubItems = [
  { title: 'WordPress', icon: '🔷', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Wordpress55.webp', desc: 'NGO ₹35,000 · e-commerce ₹48,000', sectionId: 'website-tracks' },
  { title: 'Shopify', icon: '🟢', image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ShopifyHeaderLogo.png', desc: 'Online stores — from ₹75,000', sectionId: 'website-tracks' },
  { title: 'Custom Coding', icon: '⚡', image: '', desc: 'Bespoke web applications', sectionId: 'custom-coding' },
];

const pricingMainItems = [
  { id: 'websites', icon: '🌐', title: 'Websites', desc: 'WordPress, Shopify & Custom builds', hasSubMenu: true, link: undefined },
  { id: 'social-media', icon: '📱', title: 'Social Media', desc: 'SMM plans & portfolio showcase', hasSubMenu: false, link: '/pricing/social-media' },
  { id: 'ngo-website', icon: '🤝', title: 'NGO', desc: 'WordPress ₹35,000 · Give Setu · custom-coded', hasSubMenu: false, link: '/pricing/ngo-website' },
  { id: 'other-services', icon: '🚀', title: 'Other Services', desc: 'SEO, Ads, Branding & more', hasSubMenu: false, link: '/pricing/other-services' },
];

const D_ICON_W = '8.5rem';
const D_ICON_H = '8rem';
const D_CARD_PAD = '0.7rem';
const M_ICON_W = '3.8rem';
const M_ICON_H = '3.8rem';
const M_CARD_PAD = '0.35rem';

const NewBadge = () => (
  <span style={{ background: 'linear-gradient(135deg,#D4AF37,#B7950B)', color: '#0B1929', fontSize: '0.58rem', fontWeight: 700, padding: '2px 7px', borderRadius: '20px', whiteSpace: 'nowrap', flexShrink: 0 }}>New</span>
);

interface FlyoutProps {
  channel: typeof whatsappChannels[0];
  anchorRect: DOMRect;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onSubItemClick: (link: string) => void;
}
const FlyoutPanel: React.FC<FlyoutProps> = ({ channel, anchorRect, onMouseEnter, onMouseLeave, onSubItemClick }) => {
  const [hoveredSub, setHoveredSub] = useState<string | null>(null);
  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
      style={{ position: 'fixed', top: anchorRect.top, left: anchorRect.right + 8, zIndex: 99999, background: 'rgba(11,25,41,0.97)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', borderRadius: '16px', border: '1px solid rgba(212,175,55,0.28)', boxShadow: '0 20px 60px rgba(0,0,0,0.7),0 0 30px rgba(212,175,55,0.12)', minWidth: '230px', animation: 'flyoutIn 0.16s ease-out', pointerEvents: 'auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem 0.55rem', borderBottom: '1px solid rgba(212,175,55,0.15)' }}>
        <span style={{ fontSize: '1rem' }}>{channel.icon}</span>
        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#D4AF37' }}>{channel.name}</span>
      </div>
      <div style={{ padding: '0.4rem 0.5rem 0.5rem' }}>
        {channel.subItems.map(sub => (
          <div key={sub.title} onClick={() => onSubItemClick(sub.link)}
            onMouseEnter={() => setHoveredSub(sub.title)} onMouseLeave={() => setHoveredSub(null)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.48rem 0.85rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem', color: hoveredSub === sub.title ? '#D4AF37' : 'rgba(255,255,255,0.72)', background: hoveredSub === sub.title ? 'rgba(212,175,55,0.09)' : 'transparent', border: hoveredSub === sub.title ? '1px solid rgba(212,175,55,0.2)' : '1px solid transparent', transition: 'all 0.15s', fontWeight: hoveredSub === sub.title ? 500 : 400 }}>
            <span style={{ flex: 1 }}>{sub.title}</span>
            {sub.isNew && <NewBadge />}
          </div>
        ))}
      </div>
    </div>
  );
};

interface WebsitesFlyoutProps {
  anchorRect: DOMRect;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onItemClick: (sectionId: string) => void;
}
const WebsitesFlyout: React.FC<WebsitesFlyoutProps> = ({ anchorRect, onMouseEnter, onMouseLeave, onItemClick }) => {
  const [hoveredSub, setHoveredSub] = useState<string | null>(null);
  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
      style={{ position: 'fixed', top: anchorRect.top, left: anchorRect.right + 8, zIndex: 99999, background: 'rgba(11,25,41,0.97)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', borderRadius: '16px', border: '1px solid rgba(212,175,55,0.28)', boxShadow: '0 20px 60px rgba(0,0,0,0.7),0 0 30px rgba(212,175,55,0.12)', minWidth: '230px', animation: 'flyoutIn 0.16s ease-out', pointerEvents: 'auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem 0.55rem', borderBottom: '1px solid rgba(212,175,55,0.15)' }}>
        <span style={{ fontSize: '1rem' }}>🌐</span>
        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#D4AF37' }}>Websites</span>
      </div>
      <div style={{ padding: '0.4rem 0.5rem 0.5rem' }}>
        {websiteSubItems.map(sub => (
          <div key={sub.title} onClick={() => onItemClick(sub.sectionId)}
            onMouseEnter={() => setHoveredSub(sub.title)} onMouseLeave={() => setHoveredSub(null)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.6rem 0.85rem', borderRadius: '8px', cursor: 'pointer', color: hoveredSub === sub.title ? '#D4AF37' : 'rgba(255,255,255,0.8)', background: hoveredSub === sub.title ? 'rgba(212,175,55,0.09)' : 'transparent', border: hoveredSub === sub.title ? '1px solid rgba(212,175,55,0.2)' : '1px solid transparent', transition: 'all 0.15s' }}>
            <div style={{ width: '30px', height: '30px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              {sub.image ? (
                <img src={sub.image} alt={sub.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  onError={(e) => { e.currentTarget.style.display = 'none'; const p = e.currentTarget.parentElement; if (p && !p.querySelector('.sub-icon-fallback')) { const s = document.createElement('span'); s.className = 'sub-icon-fallback'; s.textContent = sub.icon; s.style.fontSize = '1rem'; p.appendChild(s); } }} />
              ) : (
                <span style={{ fontSize: '1rem' }}>{sub.icon}</span>
              )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', flex: 1 }}>
              <span style={{ fontSize: '0.8rem', fontWeight: hoveredSub === sub.title ? 600 : 500 }}>{sub.title}</span>
              <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.38)', lineHeight: 1.3 }}>{sub.desc}</span>
            </div>
            <ChevronRight size={12} style={{ color: 'rgba(255,255,255,0.2)', flexShrink: 0 }} />
          </div>
        ))}
      </div>
    </div>
  );
};

const scrollToSection = (sectionId: string, retries = 8) => {
  const attempt = (n: number) => {
    const el = document.getElementById(sectionId);
    if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    else if (n > 0) { setTimeout(() => attempt(n - 1), 120); }
  };
  attempt(retries);
};

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [screen, setScreen] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [hoveredFilter, setHoveredFilter] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const [selectedPortfolioFilter, setSelectedPortfolioFilter] = useState('Websites');
  const [hoveredPortfolioFilter, setHoveredPortfolioFilter] = useState<string | null>(null);
  const [hoveredPortfolio, setHoveredPortfolio] = useState<string | null>(null);
  const [hoveredAbout, setHoveredAbout] = useState<string | null>(null);
  const [hoveredResource, setHoveredResource] = useState<string | null>(null);

  const [waSection, setWaSection] = useState<'By Channels' | 'By Industry'>('By Channels');
  const [hoveredIndustry, setHoveredIndustry] = useState<string | null>(null);
  const [hoveredChannelRow, setHoveredChannelRow] = useState<string | null>(null);
  const [flyoutChannel, setFlyoutChannel] = useState<string | null>(null);
  const [flyoutRect, setFlyoutRect] = useState<DOMRect | null>(null);
  const channelRowRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const flyoutTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [hoveredPricingItem, setHoveredPricingItem] = useState<string | null>(null);
  const showPricing = usePreviewVisible(PRICING_LIVE);
  const skin = useHeaderSkin();
  const [websitesFlyoutRect, setWebsitesFlyoutRect] = useState<DOMRect | null>(null);
  const [showWebsitesFlyout, setShowWebsitesFlyout] = useState(false);
  const websitesRowRef = useRef<HTMLDivElement | null>(null);
  const websitesFlyoutTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pricingDropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [mobileOpen, setMobileOpen] = useState<string | null>(null);
  const [mobilePricingOpen, setMobilePricingOpen] = useState(false);
  const [mobileWebsitesOpen, setMobileWebsitesOpen] = useState(false);
  const [mobileWaSection, setMobileWaSection] = useState<string | null>(null);
  const [mobileWaChannel, setMobileWaChannel] = useState<string | null>(null);

  const resourcesNavRef = useRef<HTMLDivElement | null>(null);
  const [resourcesDropdownPosition, setResourcesDropdownPosition] = useState<{ top: number; left: number } | null>(null);

  const clearFlyoutTimer = () => { if (flyoutTimer.current) clearTimeout(flyoutTimer.current); };
  const clearDropdownTimer = () => { if (dropdownTimer.current) clearTimeout(dropdownTimer.current); };
  const clearWebsitesFlyoutTimer = () => { if (websitesFlyoutTimer.current) clearTimeout(websitesFlyoutTimer.current); };
  const clearPricingDropdownTimer = () => { if (pricingDropdownTimer.current) clearTimeout(pricingDropdownTimer.current); };

  const openFlyout = (name: string) => {
    clearFlyoutTimer();
    const el = channelRowRefs.current[name];
    if (el) { setFlyoutRect(el.getBoundingClientRect()); setFlyoutChannel(name); }
  };
  const closeFlyoutDelayed = () => { clearFlyoutTimer(); flyoutTimer.current = setTimeout(() => { setFlyoutChannel(null); setFlyoutRect(null); }, 80); };
  const closeDropdownDelayed = () => { clearDropdownTimer(); dropdownTimer.current = setTimeout(() => setActiveDropdown(null), 120); };
  const cancelClose = () => { clearFlyoutTimer(); clearDropdownTimer(); };

  const openWebsitesFlyout = () => {
    clearWebsitesFlyoutTimer();
    if (websitesRowRef.current) { setWebsitesFlyoutRect(websitesRowRef.current.getBoundingClientRect()); setShowWebsitesFlyout(true); }
  };
  const closeWebsitesFlyoutDelayed = () => {
    clearWebsitesFlyoutTimer();
    websitesFlyoutTimer.current = setTimeout(() => { setShowWebsitesFlyout(false); setWebsitesFlyoutRect(null); }, 80);
  };
  const closePricingDropdownDelayed = () => {
    clearPricingDropdownTimer();
    pricingDropdownTimer.current = setTimeout(() => { setActiveDropdown(null); setShowWebsitesFlyout(false); }, 120);
  };
  const cancelPricingClose = () => { clearWebsitesFlyoutTimer(); clearPricingDropdownTimer(); };

  const handleWebsitesSubClick = (sectionId: string) => {
    clearWebsitesFlyoutTimer(); clearPricingDropdownTimer();
    setActiveDropdown(null); setShowWebsitesFlyout(false);
    if (location.pathname === '/pricing/websites') { setTimeout(() => scrollToSection(sectionId), 200); }
    else { navigate('/pricing/websites'); setTimeout(() => scrollToSection(sectionId), 500); }
  };

  const industries = ['All', 'NGO', 'Real Estate', 'Ecommerce', 'Healthcare', 'Personal Brand', 'Social Media'];

  const getFilteredServices = () => {
    if (selectedIndustry === 'Social Media') return socialMediaPages.map(s => ({ ...s, highlighted: false, industry: 'Social Media' }));
    return getOrderedServices(selectedIndustry);
  };

  useEffect(() => {
    const updatePosition = () => {
      if (activeDropdown === 'Resources' && resourcesNavRef.current) {
        const rect = resourcesNavRef.current.getBoundingClientRect();
        const top = screen === 'tablet' ? 106 : 116;
        const w = 320;
        setResourcesDropdownPosition({ top, left: rect.left + rect.width / 2 - w / 2 });
      } else { setResourcesDropdownPosition(null); }
    };
    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);
    return () => { window.removeEventListener('resize', updatePosition); window.removeEventListener('scroll', updatePosition); };
  }, [activeDropdown, screen]);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setScreen(w < 1040 ? 'mobile' : w < 1280 ? 'tablet' : 'desktop');
    };
    const handleClickOutside = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (
        !t.closest('.nav-item') &&
        !t.closest('.dropdown-container') &&
        !t.closest('.wa-flyout') &&
        !t.closest('.websites-flyout') &&
        !t.closest('.mobile-menu')
      ) {
        setActiveDropdown(null); setFlyoutChannel(null); setShowWebsitesFlyout(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', () => setScrolled(window.scrollY > 20));
    document.addEventListener('click', handleClickOutside);
    return () => { window.removeEventListener('resize', handleResize); document.removeEventListener('click', handleClickOutside); };
  }, []);

  const handleCardNavigation = (link: string, isMobile: boolean) => {
    setActiveDropdown(null);
    setMobileOpen(null);
    setSelectedIndustry('All');
    if (isMobile) setMenuOpen(false);
    if (link.includes('#')) {
      const [path, hash] = link.split('#');
      if (location.pathname === path) { setTimeout(() => scrollToSection(hash), 100); }
      else { navigate(path); setTimeout(() => scrollToSection(hash), 600); }
    } else { navigate(link); }
  };

  const handleSubItemClick = (link: string) => { clearFlyoutTimer(); clearDropdownTimer(); setActiveDropdown(null); setFlyoutChannel(null); navigate(link); };
  const handleIndustryClick = (link: string) => { clearDropdownTimer(); setActiveDropdown(null); navigate(link); };

  const toggleMobile = (key: string) => setMobileOpen(prev => prev === key ? null : key);

  const filterBtnStyle = (ind: string, selected: string, hovered: string | null): React.CSSProperties => ({
    background: selected === ind || hovered === ind ? 'linear-gradient(135deg,rgba(212,175,55,0.22),rgba(212,175,55,0.12))' : 'linear-gradient(135deg,rgba(212,175,55,0.08),rgba(212,175,55,0.04))',
    border: selected === ind ? '1px solid rgba(212,175,55,0.5)' : hovered === ind ? '1px solid rgba(212,175,55,0.3)' : '1px solid transparent',
    borderRadius: '14px', padding: '0.6rem 1rem',
    color: selected === ind || hovered === ind ? '#F5E6D3' : 'rgba(245,230,211,0.6)',
    fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.3s', textAlign: 'left' as const,
    fontWeight: selected === ind ? 600 : 400, width: '100%',
    boxShadow: selected === ind ? '0 4px 14px rgba(212,175,55,0.3)' : hovered === ind ? '0 4px 14px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.15)',
  });
  const filterBtn = (ind: string) => filterBtnStyle(ind, selectedIndustry, hoveredFilter);

  const makeCardStyle = (k: string, isHighlighted: boolean, isDimmed: boolean, isMobile: boolean): React.CSSProperties => {
    const h = hoveredCard === k;
    return {
      background: h ? 'rgba(255,255,255,0.05)' : 'linear-gradient(135deg,rgba(212,175,55,0.08),rgba(212,175,55,0.04))',
      backdropFilter: 'blur(10px)', borderRadius: '12px',
      padding: isMobile ? M_CARD_PAD : D_CARD_PAD,
      border: h ? '1px solid rgba(212,175,55,0.4)' : isHighlighted ? '1px solid rgba(212,175,55,0.25)' : '1px solid rgba(212,175,55,0.08)',
      textDecoration: 'none', color: '#fff',
      transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)', cursor: 'pointer',
      display: 'flex', flexDirection: 'column' as const, alignItems: 'center',
      gap: '0.25rem', textAlign: 'center' as const,
      transform: h ? (isMobile ? 'translateY(-2px) scale(1.03)' : 'translateY(-3px) scale(1.04)') : 'none',
      boxShadow: h ? '0 8px 25px rgba(212,175,55,0.3),0 0 20px rgba(212,175,55,0.3)' : isHighlighted ? '0 6px 20px rgba(212,175,55,0.3)' : '0 2px 8px rgba(0,0,0,0.2)',
      opacity: isDimmed ? 0.45 : 1, alignSelf: 'start',
    };
  };

  const renderCard = (
    item: { title: string; icon?: string; image: string; link: string },
    k: string, isHighlighted: boolean, isDimmed: boolean, isMobile: boolean,
  ) => {
    const iconW = isMobile ? M_ICON_W : D_ICON_W;
    const iconH = isMobile ? M_ICON_H : D_ICON_H;
    const txtSize = isMobile ? '0.55rem' : '0.74rem';
    const hasHash = item.link.includes('#');
    return (
      <div key={k} onClick={() => handleCardNavigation(item.link, isMobile)}
        onMouseEnter={() => setHoveredCard(k)} onMouseLeave={() => setHoveredCard(null)}
        style={{ ...makeCardStyle(k, isHighlighted, isDimmed, isMobile), cursor: 'pointer' }}>
        <div style={{ width: iconW, height: iconH, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'visible' }}>
          <img src={item.image} alt={item.title}
            style={{ width: '100%', height: '100%', objectFit: 'contain', filter: hoveredCard === k ? 'drop-shadow(0 0 8px rgba(212,175,55,0.55)) brightness(1.1)' : 'drop-shadow(0 2px 6px rgba(0,0,0,0.4))', transition: 'filter 0.25s ease' }}
            onError={(e) => {
              const t = e.currentTarget; t.style.display = 'none';
              const p = t.parentElement;
              if (p && !p.querySelector('.efb')) { const s = document.createElement('span'); s.className = 'efb'; s.style.fontSize = isMobile ? '1.5rem' : '2rem'; s.textContent = item.icon || '📦'; p.appendChild(s); }
            }} />
        </div>
        <span style={{ fontSize: txtSize, fontWeight: 600, lineHeight: 1.25, color: hoveredCard === k ? '#D4AF37' : 'rgba(255,255,255,0.88)', transition: 'color 0.2s', paddingBottom: '0.1rem' }}>
          {item.title}
        </span>
        {hasHash && !isMobile && (
          <span style={{ fontSize: '0.55rem', color: 'rgba(212,175,55,0.65)', letterSpacing: '0.04em', lineHeight: 1, marginTop: '1px' }}>Healthcare ↓</span>
        )}
      </div>
    );
  };

  const renderServicesGrid = (isMobile: boolean) => {
    const cols = isMobile ? 'repeat(3,1fr)' : 'repeat(4,1fr)';
    const gap = isMobile ? '0.28rem' : '0.5rem';
    const services = getFilteredServices();
    return (
      <div style={{ display: 'grid', gridTemplateColumns: cols, gap }}>
        {services.map((s, i) => {
          const k = `${isMobile ? 'm' : 'd'}svc-${i}`;
          const hi = 'highlighted' in s ? s.highlighted : false;
          const di = selectedIndustry !== 'All' && selectedIndustry !== 'Social Media' && !hi;
          return renderCard(s, k, hi, di, isMobile);
        })}
      </div>
    );
  };

  const renderPortfolioGrid = (isMobile = false) => {
    const cols2 = isMobile ? 'repeat(2,1fr)' : 'repeat(3,1fr)';
    const cols4 = isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)';
    const cols3 = isMobile ? 'repeat(2,1fr)' : 'repeat(3,1fr)';
    const gap = isMobile ? '0.28rem' : '0.5rem';
    const pfx = isMobile ? 'mport' : 'dport';
    if (selectedPortfolioFilter === 'Websites')
      return <div style={{ display: 'grid', gridTemplateColumns: cols2, gap }}>{portfolioData.map((p, i) => renderCard(p, `${pfx}-web-${i}`, false, false, isMobile))}</div>;
    if (selectedPortfolioFilter === 'Whatsapp Interakt')
      return <div style={{ display: 'grid', gridTemplateColumns: cols2, gap }}>{whatsappIndustries.map((ind, i) => renderCard({ title: ind.name, icon: ind.icon, image: ind.image, link: ind.link }, `${pfx}-wa-${i}`, false, false, isMobile))}</div>;
    if (selectedPortfolioFilter === 'Social Media')
      return <div style={{ display: 'grid', gridTemplateColumns: cols2, gap }}>{socialMediaPortfolioData.map((p, i) => renderCard(p, `${pfx}-sm-${i}`, false, false, isMobile))}</div>;
    if (selectedPortfolioFilter === 'SEO')
      return <div style={{ display: 'grid', gridTemplateColumns: cols4, gap }}>{seoPortfolioData.map((p, i) => renderCard(p, `${pfx}-seo-${i}`, false, false, isMobile))}</div>;
    if (selectedPortfolioFilter === 'Applications')
      return <div style={{ display: 'grid', gridTemplateColumns: cols3, gap }}>{applicationsPortfolioData.map((p, i) => renderCard(p, `${pfx}-app-${i}`, false, false, isMobile))}</div>;
    if (selectedPortfolioFilter === 'SaaS')
      return <div style={{ display: 'grid', gridTemplateColumns: cols3, gap }}>{saasPortfolioData.map((p, i) => renderCard(p, `${pfx}-saas-${i}`, false, false, isMobile))}</div>;
    return null;
  };

  const mobileFilterBtn = (ind: string): React.CSSProperties => ({
    background: selectedIndustry === ind ? 'linear-gradient(135deg,rgba(212,175,55,0.22),rgba(212,175,55,0.12))' : 'linear-gradient(135deg,rgba(212,175,55,0.08),rgba(212,175,55,0.04))',
    border: selectedIndustry === ind ? '1px solid rgba(212,175,55,0.5)' : '1px solid transparent',
    borderRadius: '20px', padding: '0.35rem 0.7rem',
    color: selectedIndustry === ind ? '#F5E6D3' : 'rgba(245,230,211,0.6)',
    fontSize: '0.65rem', cursor: 'pointer', transition: 'all 0.3s', fontWeight: selectedIndustry === ind ? 600 : 400,
    boxShadow: selectedIndustry === ind ? '0 4px 14px rgba(212,175,55,0.3)' : '0 2px 8px rgba(0,0,0,0.15)',
  });
  const mobilePortfolioFilterBtn = (f: string): React.CSSProperties => ({
    background: selectedPortfolioFilter === f ? 'linear-gradient(135deg,rgba(212,175,55,0.22),rgba(212,175,55,0.12))' : 'linear-gradient(135deg,rgba(212,175,55,0.08),rgba(212,175,55,0.04))',
    border: selectedPortfolioFilter === f ? '1px solid rgba(212,175,55,0.5)' : '1px solid transparent',
    borderRadius: '20px', padding: '0.35rem 0.7rem',
    color: selectedPortfolioFilter === f ? '#F5E6D3' : 'rgba(245,230,211,0.6)',
    fontSize: '0.65rem', cursor: 'pointer', transition: 'all 0.3s', fontWeight: selectedPortfolioFilter === f ? 600 : 400,
    boxShadow: selectedPortfolioFilter === f ? '0 4px 14px rgba(212,175,55,0.3)' : '0 2px 8px rgba(0,0,0,0.15)',
  });

  const waSecBtn = (sec: string): React.CSSProperties => {
    const a = waSection === sec;
    return { display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.75rem 1.2rem', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.25s', background: a ? 'linear-gradient(135deg,rgba(212,175,55,0.18),rgba(212,175,55,0.08))' : 'transparent', border: a ? '1px solid rgba(212,175,55,0.35)' : '1px solid transparent', color: a ? '#D4AF37' : 'rgba(255,255,255,0.6)', fontWeight: a ? 600 : 400, fontSize: '0.84rem', userSelect: 'none' as const, whiteSpace: 'nowrap' as const };
  };

  const handleMobileWebsitesSubClick = (sectionId: string) => {
    setMenuOpen(false); setMobilePricingOpen(false); setMobileWebsitesOpen(false); setMobileOpen(null);
    if (location.pathname === '/pricing/websites') { setTimeout(() => scrollToSection(sectionId), 200); }
    else { navigate('/pricing/websites'); setTimeout(() => scrollToSection(sectionId), 500); }
  };

  const mobileAccRow = (isOpen: boolean): React.CSSProperties => ({
    color: '#D4AF37', padding: '0 1rem', height: '52px',
    fontSize: '0.95rem', fontWeight: 600, borderRadius: '12px',
    background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)',
    cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    userSelect: 'none', touchAction: 'manipulation',
  });

  // Header pill + logo: one rule everywhere. Logo keeps its 400:202 ratio and
  // always sits with the same 6px breathing room inside the pill.
  const PILL_H = screen === 'mobile' ? 60 : 80;
  const LOGO_H = PILL_H - 12;
  const LOGO_W = Math.round(LOGO_H * 400 / 202);
  const dropdownTop = screen === 'tablet' ? '106px' : '116px';
  // "Give Setu" replaces "Pricing". It is a plain link to the Give Setu page,
  // not a dropdown and not the finder pop-up: the finder asked people to choose
  // an industry and a platform before it would tell them anything, and we sell
  // one product to non-profits. E-commerce, WordPress and social pricing are no
  // longer offered from the menu at all.
  const navItems = ['Home', 'About Us', 'Services', 'Portfolio', 'Whatsapp', 'Give Setu', 'Resources', 'Blog']
    .filter((n) => n !== 'Give Setu' || showPricing);
  const dropdownItems = ['About Us', 'Services', 'Portfolio', 'Whatsapp', 'Resources'];

  return (
    <>
      {flyoutChannel && flyoutRect && (() => {
        const ch = whatsappChannels.find(c => c.name === flyoutChannel);
        if (!ch || ch.subItems.length === 0) return null;
        return <div className="wa-flyout"><FlyoutPanel channel={ch} anchorRect={flyoutRect} onMouseEnter={cancelClose} onMouseLeave={closeFlyoutDelayed} onSubItemClick={handleSubItemClick} /></div>;
      })()}
      {showWebsitesFlyout && websitesFlyoutRect && (
        <div className="websites-flyout"><WebsitesFlyout anchorRect={websitesFlyoutRect} onMouseEnter={cancelPricingClose} onMouseLeave={closeWebsitesFlyoutDelayed} onItemClick={handleWebsitesSubClick} /></div>
      )}

      <nav style={{ position: 'fixed', top: screen === 'mobile' ? (scrolled ? '10px' : '20px') : (scrolled ? '10px' : '20px'), left: 0, right: 0, zIndex: 1000, display: 'flex', justifyContent: 'center', padding: '0 1rem', transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)' }}>
        {/* Softens anything sliding through the gap above the floating pill. */}
        <div aria-hidden style={{ position: 'absolute', top: `-${scrolled ? 10 : 20}px`, left: 0, right: 0,
          height: `${PILL_H + (scrolled ? 10 : 20) + 26}px`, background: skin.scrim,
          backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 58%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 58%, rgba(0,0,0,0) 100%)',
          pointerEvents: 'none' }} />
        <div style={{ width: '100%', maxWidth: screen === 'mobile' ? '100%' : '1200px', height: `${PILL_H}px`, background: skin.pill, backdropFilter: 'blur(10px) saturate(1.25)', WebkitBackdropFilter: 'blur(10px) saturate(1.25)', borderRadius: '100px', border: skin.border, boxShadow: skin.shadow, display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center', padding: screen === 'mobile' ? '0 1.2rem' : '0 2.5rem', position: 'relative', overflow: 'visible' }}>
          <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px', background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)' }} />
          <Link to="/" style={{
            display: 'flex', alignItems: 'center', flexShrink: 0,
            // The logo is light artwork (measured at 150/255), so it disappears
            // on a pale pill. A dark chip behind it keeps the lockup legible
            // without recolouring the brand mark.
            background: skin.onLight ? 'rgba(14,22,34,0.92)' : 'transparent',
            borderRadius: skin.onLight ? '999px' : 0,
            padding: skin.onLight ? '4px 14px 4px 10px' : 0,
            transition: 'background .25s ease, padding .25s ease',
          }}>
            <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/govindanilogo-400w.webp" alt="Govindani Infotech"
              width={400} height={202} fetchPriority="high" style={{ height: `${LOGO_H}px`, width: `${LOGO_W}px`, minWidth: `${LOGO_W}px`, flexShrink: 0, objectFit: 'contain', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }} loading="lazy" decoding="async" />
          </Link>

          {/* ─── DESKTOP / TABLET NAV ─── */}
          {screen !== 'mobile' && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: screen === 'tablet' ? '0.9rem' : '1.3rem' }}>
              {navItems.map(item => (
                <div key={item} className="nav-item" ref={item === 'Resources' ? resourcesNavRef : undefined} style={{ position: 'relative' }}
                  onMouseEnter={() => {
                    if (screen === 'desktop' || screen === 'tablet') {
                      clearDropdownTimer(); clearPricingDropdownTimer();
                      setActiveDropdown(item === 'Give Setu' ? null : item);
                      if (item !== 'Whatsapp') { setFlyoutChannel(null); setFlyoutRect(null); }
                      setShowWebsitesFlyout(false);
                    }
                  }}
                  onMouseLeave={() => { }}>
                  {dropdownItems.includes(item) ? (
                    <span
                      onClick={() => {
                        // Tap/click opens this item's mega-menu inline on the
                        // current page — never navigates to a separate page.
                        // Hover already opens it on desktop; this makes tap work
                        // on touch devices (where hover never fires) and lets a
                        // click toggle it closed again.
                        setFlyoutChannel(null); setFlyoutRect(null); setShowWebsitesFlyout(false);
                        setActiveDropdown(activeDropdown === item ? null : item);
                      }}
                      className="nav-link" style={{ color: skin.ink, fontSize: '0.85rem', fontWeight: 500, opacity: skin.onLight ? 0.92 : 0.8, transition: '0.3s', whiteSpace: 'nowrap', padding: '0.5rem 0.8rem', borderRadius: '50px', display: 'inline-block', cursor: 'pointer', background: activeDropdown === item ? skin.wash : 'transparent' }}>{item}</span>
                  ) : (
                    <span onClick={() => { if (item === 'Home') navigate('/'); else if (item === 'Blog') navigate('/blog'); else if (item === 'Give Setu') { setActiveDropdown(null); setShowWebsitesFlyout(false); navigate('/pricing/ngo-os'); } }}
                      className="nav-link" style={{ color: skin.ink, fontSize: '0.85rem', fontWeight: 500, opacity: skin.onLight ? 0.92 : 0.8, transition: '0.3s', whiteSpace: 'nowrap', padding: '0.5rem 0.8rem', borderRadius: '50px', display: 'inline-block', cursor: 'pointer', background: 'transparent' }}>{item}</span>
                  )}

                  {item === 'About Us' && activeDropdown === 'About Us' && (
                    <div className="dropdown-container" onMouseLeave={() => setActiveDropdown(null)}
                      style={{ position: 'absolute', top: 'calc(100% + 10px)', left: '50%', transform: 'translateX(-50%)', background: 'rgba(11,25,41,0.92)', backdropFilter: 'blur(10px)', borderRadius: '24px', padding: '1.6rem', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 60px rgba(212,175,55,0.3)', width: '480px', maxWidth: '90vw', animation: 'slideDownLocal 0.3s ease-out', zIndex: 9999, overflow: 'visible' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1.2rem' }}>
                        {aboutData.map((a, i) => {
                          const k = `about-${i}`;
                          const isHovered = hoveredAbout === k;
                          return (
                            <Link key={i} to={a.Route} onClick={() => setActiveDropdown(null)}
                              onMouseEnter={() => setHoveredAbout(k)} onMouseLeave={() => setHoveredAbout(null)}
                              style={{ 
                                background: isHovered ? 'rgba(212,175,55,0.08)' : 'linear-gradient(135deg,rgba(212,175,55,0.06),rgba(212,175,55,0.02))', 
                                backdropFilter: 'blur(10px)', 
                                borderRadius: '20px', 
                                padding: '1.2rem', 
                                border: isHovered ? '1px solid rgba(212,175,55,0.4)' : '1px solid rgba(212,175,55,0.12)', 
                                textDecoration: 'none', 
                                color: '#fff', 
                                transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)', 
                                cursor: 'pointer', 
                                display: 'flex', 
                                flexDirection: 'column', 
                                alignItems: 'center', 
                                gap: '0.8rem', 
                                textAlign: 'center', 
                                transform: isHovered ? 'translateY(-6px)' : 'none', 
                                boxShadow: isHovered ? '0 12px 30px rgba(212,175,55,0.2)' : '0 4px 20px rgba(0,0,0,0.2)' 
                              }}>
                              <div style={{ 
                                width: '100%', 
                                height: '130px', 
                                background: 'rgba(0,0,0,0.2)', 
                                borderRadius: '14px', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                overflow: 'hidden', 
                                border: '1px solid rgba(212,175,55,0.1)',
                                transition: '0.3s'
                              }}>
                                <img src={a.image} alt={a.title} style={{ 
                                  width: '100%', 
                                  height: '100%', 
                                  objectFit: a.title === 'About Founder' ? 'cover' : 'contain',
                                  objectPosition: a.title === 'About Founder' ? 'top' : 'center',
                                  transition: 'transform 0.5s ease',
                                  transform: isHovered ? 'scale(1.08)' : 'scale(1)'
                                }} />
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: isHovered ? '#D4AF37' : '#fff', transition: 'color 0.3s' }}>{a.title}</span>
                                <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.4 }}>{a.description}</span>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {item === 'Services' && activeDropdown === 'Services' && (
                    <div className="dropdown-container" onMouseLeave={() => setActiveDropdown(null)}
                      style={{ position: 'absolute', top: 'calc(100% + 10px)', left: '50%', transform: 'translateX(-50%)', background: 'rgba(11,25,41,0.85)', backdropFilter: 'blur(10px)', borderRadius: '24px', padding: '1.2rem', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 60px rgba(212,175,55,0.3)', minWidth: '960px', maxWidth: '96vw', maxHeight: '600px', animation: 'slideDownLocal 0.3s ease-out', zIndex: 9999, display: 'flex', gap: '1rem', overflow: 'hidden' }}>
                      <div style={{ minWidth: '130px', display: 'flex', flexDirection: 'column', gap: '0.35rem', flexShrink: 0 }}>
                        <h4 style={{ color: 'rgba(245,230,211,0.7)', fontSize: '0.85rem', fontWeight: 600, margin: '0 0 0.3rem 0' }}>Industry</h4>
                        {industries.map(ind => (
                          <button key={ind} onClick={() => setSelectedIndustry(ind)} onMouseEnter={() => setHoveredFilter(ind)} onMouseLeave={() => setHoveredFilter(null)} style={filterBtn(ind)}>
                            {ind === 'Social Media' ? 'Social Media' : ind}
                          </button>
                        ))}
                      </div>
                      <div className="services-scroll" style={{ flex: 1, overflowY: 'auto', padding: '0.2rem' }}>
                        {selectedIndustry === 'Social Media' && (
                          <div style={{ fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.6)', fontWeight: 600, marginBottom: '0.5rem' }}>Social Media Pages click to visit</div>
                        )}
                        {renderServicesGrid(false)}
                      </div>
                    </div>
                  )}

                  {item === 'Portfolio' && activeDropdown === 'Portfolio' && (
                    <div className="dropdown-container" onMouseLeave={() => setActiveDropdown(null)}
                      style={{ position: 'absolute', top: 'calc(100% + 10px)', left: '50%', transform: 'translateX(-50%)', background: 'rgba(11,25,41,0.85)', backdropFilter: 'blur(10px)', borderRadius: '24px', padding: '1.2rem', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 60px rgba(212,175,55,0.3)', minWidth: '820px', maxWidth: '90vw', maxHeight: '520px', animation: 'slideDownLocal 0.3s ease-out', zIndex: 9999, display: 'flex', gap: '1rem', overflow: 'hidden' }}>
                      <div style={{ minWidth: '150px', display: 'flex', flexDirection: 'column', gap: '0.35rem', flexShrink: 0 }}>
                        <h4 style={{ color: 'rgba(245,230,211,0.7)', fontSize: '0.85rem', fontWeight: 600, margin: '0 0 0.3rem 0' }}>Category</h4>
                        {portfolioFilters.map(f => (
                          <button key={f} onClick={() => setSelectedPortfolioFilter(f)} onMouseEnter={() => setHoveredPortfolioFilter(f)} onMouseLeave={() => setHoveredPortfolioFilter(null)} style={filterBtnStyle(f, selectedPortfolioFilter, hoveredPortfolioFilter)}>
                            {f === 'Websites' ? ' Websites' : f === 'Whatsapp Interakt' ? ' Whatsapp Interakt' : f === 'Social Media' ? ' Social Media' : f === 'SEO' ? ' SEO' : f === 'Applications' ? ' Applications' : 'SaaS'}
                          </button>
                        ))}
                      </div>
                      <div className="services-scroll portfolio-scroll-hide" style={{ flex: 1, overflowY: 'auto', padding: '0.2rem' }}>
                        <div style={{ fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.6)', fontWeight: 600, marginBottom: '0.5rem' }}>
                          {selectedPortfolioFilter === 'Websites' && ' Website Portfolio click to explore'}
                          {selectedPortfolioFilter === 'Whatsapp Interakt' && ' Whatsapp Interakt by industry'}
                          {selectedPortfolioFilter === 'Social Media' && ' Social Media Portfolio'}
                          {selectedPortfolioFilter === 'SEO' && ' SEO Portfolio'}
                          {selectedPortfolioFilter === 'Applications' && ' Applications Portfolio'}
                          {selectedPortfolioFilter === 'SaaS' && ' SaaS Portfolio'}
                        </div>
                        {renderPortfolioGrid(false)}
                      </div>
                    </div>
                  )}

                  {item === 'Whatsapp' && activeDropdown === 'Whatsapp' && (
                    <div className="dropdown-container"
                      onMouseLeave={() => { closeDropdownDelayed(); closeFlyoutDelayed(); }}
                      onMouseEnter={() => { clearDropdownTimer(); clearFlyoutTimer(); }}
                      style={{ position: 'absolute', top: 'calc(100% + 10px)', left: '50%', transform: 'translateX(-50%)', background: 'rgba(11,25,41,0.93)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', borderRadius: '22px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 60px rgba(212,175,55,0.3),0 0 40px rgba(212,175,55,0.1)', width: '500px', maxWidth: '90vw', animation: 'slideDownLocal 0.3s ease-out', zIndex: 9999, display: 'flex', overflow: 'visible', minHeight: '160px' }}>
                      <div style={{ width: '190px', flexShrink: 0, padding: '1.6rem 1.2rem', borderRight: '1px solid rgba(255,255,255,0.07)', display: 'flex', flexDirection: 'column', gap: '0.5rem', borderRadius: '22px 0 0 22px', overflow: 'hidden' }}>
                        <div style={{ fontSize: '0.62rem', letterSpacing: '0.13em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.5)', fontWeight: 600, marginBottom: '0.6rem' }}>Browse by</div>
                        {(['By Channels', 'By Industry'] as const).map(sec => (
                          <div key={sec} onMouseEnter={() => { setWaSection(sec); if (sec !== 'By Channels') closeFlyoutDelayed(); }} style={waSecBtn(sec)}>
                            <span style={{ fontSize: '1rem' }}>{sec === 'By Channels' ? '📡' : '🏭'}</span>
                            <span>{sec}</span>
                          </div>
                        ))}
                      </div>
                      <div style={{ flex: 1, overflow: 'hidden', borderRadius: '0 22px 22px 0' }}>
                        <div className="services-scroll" style={{ padding: '1.4rem 1.3rem', overflowY: 'auto', maxHeight: '460px', height: '100%' }}>
                          {waSection === 'By Industry' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
                              <div style={{ fontSize: '0.62rem', letterSpacing: '0.13em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.5)', fontWeight: 600, marginBottom: '0.7rem' }}>Select Industry</div>
                              {whatsappIndustries.map(ind => (
                                <div key={ind.name} onClick={() => handleIndustryClick(ind.link)} onMouseEnter={() => setHoveredIndustry(ind.name)} onMouseLeave={() => setHoveredIndustry(null)}
                                  style={{ padding: '0.55rem 1rem', borderRadius: '9px', cursor: 'pointer', fontSize: '0.82rem', color: hoveredIndustry === ind.name ? '#D4AF37' : 'rgba(255,255,255,0.75)', background: hoveredIndustry === ind.name ? 'linear-gradient(135deg,rgba(212,175,55,0.12),rgba(212,175,55,0.06))' : 'transparent', border: hoveredIndustry === ind.name ? '1px solid rgba(212,175,55,0.22)' : '1px solid transparent', transition: 'all 0.18s', fontWeight: hoveredIndustry === ind.name ? 500 : 400 }}>
                                  {ind.name}
                                </div>
                              ))}
                            </div>
                          )}
                          {waSection === 'By Channels' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                              <div style={{ fontSize: '0.62rem', letterSpacing: '0.13em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.5)', fontWeight: 600, marginBottom: '0.7rem' }}>Select Channel</div>
                              {whatsappChannels.map(channel => (
                                <div key={channel.name} ref={el => { channelRowRefs.current[channel.name] = el; }}
                                  onMouseEnter={() => { setHoveredChannelRow(channel.name); if (channel.subItems.length > 0) openFlyout(channel.name); else setFlyoutChannel(null); }}
                                  onMouseLeave={() => { setHoveredChannelRow(null); if (channel.subItems.length > 0) closeFlyoutDelayed(); }}
                                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1.1rem', borderRadius: '12px', cursor: 'pointer', background: flyoutChannel === channel.name || hoveredChannelRow === channel.name ? 'linear-gradient(135deg,rgba(212,175,55,0.14),rgba(212,175,55,0.06))' : 'transparent', border: flyoutChannel === channel.name ? '1px solid rgba(212,175,55,0.32)' : hoveredChannelRow === channel.name ? '1px solid rgba(212,175,55,0.15)' : '1px solid transparent', transition: 'all 0.2s' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <img src={channel.image} alt={channel.name} style={{ width: '32px', height: '32px', objectFit: 'contain', flexShrink: 0 }}
                                      onError={(e) => { const t = e.currentTarget; t.style.display = 'none'; const p = t.parentElement; if (p && !p.querySelector('.ch-emoji')) { const s2 = document.createElement('span'); s2.className = 'ch-emoji'; s2.style.fontSize = '1.1rem'; s2.textContent = channel.icon; p.appendChild(s2); } }} />
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                                      <span style={{ fontSize: '0.86rem', fontWeight: 600, transition: 'color 0.18s', color: flyoutChannel === channel.name ? '#D4AF37' : hoveredChannelRow === channel.name ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.82)' }}>{channel.name}</span>
                                      <span style={{ fontSize: '0.66rem', color: 'rgba(255,255,255,0.35)' }}>{channel.subItems.length} feature{channel.subItems.length !== 1 ? 's' : ''}</span>
                                    </div>
                                    {channel.isNew && <NewBadge />}
                                  </div>
                                  {channel.subItems.length > 0 && <ChevronRight size={14} style={{ color: flyoutChannel === channel.name ? '#D4AF37' : 'rgba(255,255,255,0.3)', transition: 'color 0.18s', flexShrink: 0 }} />}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {item === 'Resources' && activeDropdown === 'Resources' && (
                    <div className="dropdown-container" onMouseLeave={() => setActiveDropdown(null)}
                      style={{ position: 'absolute', top: 'calc(100% + 10px)', left: '50%', transform: 'translateX(-50%)', width: '320px', maxWidth: '90vw', background: 'rgba(11,25,41,0.97)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', borderRadius: '20px', padding: '1.2rem 1rem 1rem', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 18px 50px rgba(212,175,55,0.3),0 0 28px rgba(212,175,55,0.08)', animation: 'slideDownLocal 0.3s ease-out', zIndex: 9999 }}>
                      <div style={{ fontSize: '0.62rem', letterSpacing: '0.13em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.5)', fontWeight: 600, marginBottom: '0.8rem', paddingLeft: '0.3rem' }}>📚 Explore Resources</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                        {resourcesData.map((r, i) => {
                          const k = `res-${i}`;
                          return (
                            <Link key={k} to={r.link} onClick={() => setActiveDropdown(null)}
                              onMouseEnter={() => setHoveredResource(k)} onMouseLeave={() => setHoveredResource(null)}
                              style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', padding: '0.85rem 1rem', borderRadius: '14px', textDecoration: 'none', color: '#fff', transition: 'all 0.22s cubic-bezier(0.4,0,0.2,1)', background: hoveredResource === k ? 'linear-gradient(135deg,rgba(212,175,55,0.16),rgba(212,175,55,0.07))' : 'linear-gradient(135deg,rgba(212,175,55,0.07),rgba(212,175,55,0.03))', border: hoveredResource === k ? '1px solid rgba(212,175,55,0.4)' : '1px solid rgba(212,175,55,0.1)', boxShadow: hoveredResource === k ? '0 6px 18px rgba(212,175,55,0.3)' : 'none', transform: hoveredResource === k ? 'translateX(3px)' : 'none' }}>
                              <span style={{ fontSize: '1.65rem', flexShrink: 0 }}>{r.icon}</span>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.14rem' }}>
                                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: hoveredResource === k ? '#D4AF37' : '#fff', transition: 'color 0.2s' }}>{r.title}</span>
                                <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.48)', lineHeight: 1.4 }}>{r.description}</span>
                              </div>
                              <ChevronRight size={13} style={{ marginLeft: 'auto', flexShrink: 0, color: hoveredResource === k ? '#D4AF37' : 'rgba(255,255,255,0.18)', transition: 'color 0.2s' }} />
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifySelf: 'end' }}>
            <LangToggle compact={screen === 'mobile'} ink={skin.ink} />
            {screen !== 'mobile' ? (
              <button className="get-quote-btn" onClick={() => navigate('/contact-us')} style={{ background: 'linear-gradient(135deg,#D4AF37,#B7950B)', color: '#0B1929', border: 'none', padding: '0.4rem 1rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', transition: '0.3s', whiteSpace: 'nowrap' }}>Contact Us</button>
            ) : (
              <button
                onClick={() => setMenuOpen(p => !p)}
                  aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={menuOpen}
                style={{ background: 'none', border: 'none', color: '#D4AF37', cursor: 'pointer', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', touchAction: 'manipulation', minWidth: '44px', minHeight: '44px' }}
              >
                {menuOpen ? <X size={24} color={skin.ink} /> : <Menu size={24} color={skin.ink} />}
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* ══════════════════════ MOBILE MENU ══════════════════════ */}
      {screen === 'mobile' && menuOpen && (
        <div
          className="mobile-menu"
          style={{
            position: 'fixed',
            top: '74px',
            left: '0.5rem',
            right: '0.5rem',
            background: 'rgba(11,25,41,0.97)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '0.55rem',
            zIndex: 998,
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.7)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.28rem',
            maxHeight: 'calc(100svh - 84px)',
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
        >
          {/* Home */}
          <div
            onClick={() => { navigate('/'); setMenuOpen(false); }}
            style={{ color: skin.ink, padding: '0 1rem', height: '52px', fontSize: '0.95rem', borderRadius: '12px', background: skin.wash, border: skin.border, cursor: 'pointer', display: 'flex', alignItems: 'center', touchAction: 'manipulation' }}
          >Home</div>

          {/* ── About Us ── */}
          <div>
            <div style={mobileAccRow(mobileOpen === 'AboutUs')} onClick={() => toggleMobile('AboutUs')}>
              About Us
              <ChevronRight size={18} style={{ transform: mobileOpen === 'AboutUs' ? 'rotate(90deg)' : 'none', transition: '0.25s', pointerEvents: 'none', flexShrink: 0 }} />
            </div>
            {mobileOpen === 'AboutUs' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '0.5rem', marginTop: '0.35rem' }}>
                {aboutData.map((a, i) => (
                  <Link key={i} to={a.Route} onClick={() => { setMenuOpen(false); setMobileOpen(null); }}
                    style={{ background: 'linear-gradient(135deg,rgba(212,175,55,0.12),rgba(212,175,55,0.05))', borderRadius: '15px', padding: '0.8rem 0.5rem', border: '1px solid rgba(212,175,55,0.25)', textDecoration: 'none', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', textAlign: 'center' }}>
                    <div style={{ width: '100%', height: '80px', background: 'rgba(0,0,0,0.15)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '1px solid rgba(212,175,55,0.1)' }}>
                      <img src={a.image} alt={a.title} style={{ width: '100%', height: '100%', objectFit: a.title === 'About Founder' ? 'cover' : 'contain', objectPosition: a.title === 'About Founder' ? 'top' : 'center', display: 'block' }} loading="lazy" decoding="async" />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#D4AF37' }}>{a.title}</span>
                      <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.2 }}>{a.description}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* ── Services ── */}
          <div>
            <div style={mobileAccRow(mobileOpen === 'Services')} onClick={() => toggleMobile('Services')}>
              Services
              <ChevronRight size={18} style={{ transform: mobileOpen === 'Services' ? 'rotate(90deg)' : 'none', transition: '0.25s', pointerEvents: 'none', flexShrink: 0 }} />
            </div>
            {mobileOpen === 'Services' && (
              <div style={{ marginTop: '0.28rem' }}>
                <div style={{ display: 'flex', gap: '0.22rem', marginBottom: '0.38rem', flexWrap: 'wrap' }}>
                  {industries.map(ind => (
                    <button key={ind} onClick={() => setSelectedIndustry(ind)} style={mobileFilterBtn(ind)}>
                      {ind === 'Social Media' ? 'SMM' : ind}
                    </button>
                  ))}
                </div>
                {renderServicesGrid(true)}
              </div>
            )}
          </div>

          {/* ── Portfolio ── */}
          <div>
            <div style={mobileAccRow(mobileOpen === 'Portfolio')} onClick={() => toggleMobile('Portfolio')}>
              Portfolio
              <ChevronRight size={18} style={{ transform: mobileOpen === 'Portfolio' ? 'rotate(90deg)' : 'none', transition: '0.25s', pointerEvents: 'none', flexShrink: 0 }} />
            </div>
            {mobileOpen === 'Portfolio' && (
              <div style={{ marginTop: '0.28rem' }}>
                <div style={{ display: 'flex', gap: '0.22rem', marginBottom: '0.38rem', flexWrap: 'wrap' }}>
                  {portfolioFilters.map(f => (
                    <button key={f} onClick={() => setSelectedPortfolioFilter(f)} style={mobilePortfolioFilterBtn(f)}>
                      {f === 'Websites' ? '🌐 Web' : f === 'Whatsapp Interakt' ? '💬 WA' : f === 'Social Media' ? '📱 SMM' : f === 'SEO' ? '🔍 SEO' : f === 'Applications' ? '📱 Apps' : '☁️ SaaS'}
                    </button>
                  ))}
                </div>
                {renderPortfolioGrid(true)}
              </div>
            )}
          </div>

          {/* ── Whatsapp ── */}
          <div>
            <div style={mobileAccRow(mobileOpen === 'Whatsapp')} onClick={() => toggleMobile('Whatsapp')}>
              Whatsapp
              <ChevronRight size={18} style={{ transform: mobileOpen === 'Whatsapp' ? 'rotate(90deg)' : 'none', transition: '0.25s', pointerEvents: 'none', flexShrink: 0 }} />
            </div>
            {mobileOpen === 'Whatsapp' && (
              <div style={{ marginTop: '0.28rem', display: 'flex', flexDirection: 'column', gap: '0.18rem' }}>

                {/* By Channels */}
                <div>
                  <div
                    onClick={() => setMobileWaSection(p => p === 'By Channels' ? null : 'By Channels')}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 0.85rem', height: '46px', borderRadius: '10px', cursor: 'pointer', background: mobileWaSection === 'By Channels' ? 'rgba(212,175,55,0.12)' : 'rgba(255,255,255,0.03)', border: mobileWaSection === 'By Channels' ? '1px solid rgba(212,175,55,0.28)' : '1px solid rgba(255,255,255,0.06)', color: mobileWaSection === 'By Channels' ? '#D4AF37' : 'rgba(255,255,255,0.8)', fontSize: '0.85rem', fontWeight: 600, touchAction: 'manipulation' }}
                  >
                    <span>📡 By Channels</span>
                    <ChevronRight size={15} style={{ transform: mobileWaSection === 'By Channels' ? 'rotate(90deg)' : 'none', transition: '0.25s', pointerEvents: 'none', flexShrink: 0 }} />
                  </div>
                  {mobileWaSection === 'By Channels' && (
                    <div style={{ paddingLeft: '0.4rem', marginTop: '0.18rem', display: 'flex', flexDirection: 'column', gap: '0.08rem' }}>
                      {whatsappChannels.map(ch => (
                        <div key={ch.name}>
                          <div
                            onClick={() => setMobileWaChannel(p => p === ch.name ? null : ch.name)}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 0.8rem', height: '44px', borderRadius: '9px', cursor: 'pointer', background: mobileWaChannel === ch.name ? 'rgba(212,175,55,0.1)' : 'transparent', border: mobileWaChannel === ch.name ? '1px solid rgba(212,175,55,0.2)' : '1px solid transparent', color: mobileWaChannel === ch.name ? '#D4AF37' : 'rgba(255,255,255,0.75)', fontSize: '0.82rem', fontWeight: 600, touchAction: 'manipulation' }}
                          >
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <img src={ch.image} alt={ch.name} style={{ width: '24px', height: '24px', objectFit: 'contain', flexShrink: 0 }}
                                onError={(e) => { e.currentTarget.style.display = 'none'; const p = e.currentTarget.parentElement; if (p && !p.querySelector('.ch-m-emoji')) { const s2 = document.createElement('span'); s2.className = 'ch-m-emoji'; s2.textContent = ch.icon; s2.style.fontSize = '0.9rem'; p.appendChild(s2); } }} />
                              {ch.name} {ch.isNew && <NewBadge />}
                            </span>
                            {ch.subItems.length > 0 && <ChevronDown size={13} style={{ transform: mobileWaChannel === ch.name ? 'rotate(180deg)' : 'none', transition: '0.25s', pointerEvents: 'none', flexShrink: 0 }} />}
                          </div>
                          {mobileWaChannel === ch.name && ch.subItems.length > 0 && (
                            <div style={{ marginLeft: '0.7rem', paddingLeft: '0.65rem', borderLeft: '2px solid rgba(212,175,55,0.2)', display: 'flex', flexDirection: 'column' }}>
                              {ch.subItems.map(sub => (
                                <div key={sub.title}
                                  onClick={() => { setMenuOpen(false); setMobileOpen(null); navigate(sub.link); }}
                                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0 0.5rem', height: '36px', fontSize: '0.75rem', color: 'rgba(255,255,255,0.65)', cursor: 'pointer', borderRadius: '6px', touchAction: 'manipulation' }}
                                >
                                  <span style={{ flex: 1 }}>{sub.title}</span>{sub.isNew && <NewBadge />}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* By Industry */}
                <div>
                  <div
                    onClick={() => setMobileWaSection(p => p === 'By Industry' ? null : 'By Industry')}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 0.85rem', height: '46px', borderRadius: '10px', cursor: 'pointer', background: mobileWaSection === 'By Industry' ? 'rgba(212,175,55,0.12)' : 'rgba(255,255,255,0.03)', border: mobileWaSection === 'By Industry' ? '1px solid rgba(212,175,55,0.28)' : '1px solid rgba(255,255,255,0.06)', color: mobileWaSection === 'By Industry' ? '#D4AF37' : 'rgba(255,255,255,0.8)', fontSize: '0.85rem', fontWeight: 600, touchAction: 'manipulation' }}
                  >
                    <span>🏭 By Industry</span>
                    <ChevronRight size={15} style={{ transform: mobileWaSection === 'By Industry' ? 'rotate(90deg)' : 'none', transition: '0.25s', pointerEvents: 'none', flexShrink: 0 }} />
                  </div>
                  {mobileWaSection === 'By Industry' && (
                    <div style={{ marginLeft: '0.4rem', paddingLeft: '0.65rem', borderLeft: '2px solid rgba(212,175,55,0.15)', display: 'flex', flexDirection: 'column' }}>
                      {whatsappIndustries.map(ind => (
                        <div key={ind.name}
                          onClick={() => { setMenuOpen(false); setMobileOpen(null); navigate(ind.link); }}
                          style={{ display: 'flex', alignItems: 'center', padding: '0 0.7rem', height: '36px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.68)', cursor: 'pointer', borderRadius: '7px', touchAction: 'manipulation' }}
                        >
                          {ind.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ── Give Setu — a solo button straight to the page ── */}
          {showPricing && (
            <div style={mobileAccRow(false)} onClick={() => { setMenuOpen(false); navigate('/pricing/ngo-os'); }}>
              Give Setu
            </div>
          )}

          {/* ── Resources ── */}
          <div>
            <div style={mobileAccRow(mobileOpen === 'Resources')} onClick={() => toggleMobile('Resources')}>
              Resources
              <ChevronRight size={18} style={{ transform: mobileOpen === 'Resources' ? 'rotate(90deg)' : 'none', transition: '0.25s', pointerEvents: 'none', flexShrink: 0 }} />
            </div>
            {mobileOpen === 'Resources' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.28rem', marginTop: '0.28rem' }}>
                {resourcesData.map((r, i) => (
                  <Link key={i} to={r.link} onClick={() => { setMenuOpen(false); setMobileOpen(null); }}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0 0.9rem', height: '56px', borderRadius: '12px', textDecoration: 'none', color: '#fff', background: 'linear-gradient(135deg,rgba(212,175,55,0.09),rgba(212,175,55,0.04))', border: '1px solid rgba(212,175,55,0.18)' }}
                  >
                    <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{r.icon}</span>
                    <div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#D4AF37' }}>{r.title}</div>
                      <div style={{ fontSize: '0.63rem', color: 'rgba(255,255,255,0.5)' }}>{r.description}</div>
                    </div>
                    <ChevronRight size={13} style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.25)', flexShrink: 0 }} />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Blog */}
          <div
            onClick={() => { navigate('/blog'); setMenuOpen(false); }}
            style={{ color: skin.ink, padding: '0 1rem', height: '52px', fontSize: '0.95rem', borderRadius: '12px', background: skin.wash, border: skin.border, cursor: 'pointer', display: 'flex', alignItems: 'center', touchAction: 'manipulation' }}
          >Blog</div>

          {/* Contact */}
          <button
            onClick={() => { navigate('/contact-us'); setMenuOpen(false); }}
            style={{ background: 'linear-gradient(135deg,#D4AF37,#B7950B)', color: '#0B1929', border: 'none', height: '50px', borderRadius: '12px', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer', marginTop: '0.1rem', width: '100%', touchAction: 'manipulation' }}
          >Contact Us</button>

        </div>
      )}

      <style>{`
        @keyframes slideDown { from{opacity:0;transform:translateX(-50%) translateY(-10px)}to{opacity:1;transform:translateX(-50%) translateY(0)} }
        @keyframes slideDownLocal { from{opacity:0;transform:translateX(-50%) translateY(-8px)}to{opacity:1;transform:translateX(-50%) translateY(0)} }
        @keyframes flyoutIn { from{opacity:0;transform:translateX(-6px)}to{opacity:1;transform:translateX(0)} }
        .nav-link:hover{opacity:1!important;color:#D4AF37!important;text-shadow:0 0 10px rgba(212,175,55,0.3);background:rgba(255,255,255,0.08)!important}
        .get-quote-btn:hover{transform:scale(1.05);box-shadow:0 6px 20px rgba(212,175,55,0.4)!important}
        .services-scroll::-webkit-scrollbar{width:5px}
        .services-scroll::-webkit-scrollbar-track{background:rgba(255,255,255,0.04);border-radius:10px}
        .services-scroll::-webkit-scrollbar-thumb{background:#D4AF37;border-radius:10px}
        body{margin:0;background:#060b13;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
        .portfolio-scroll-hide::-webkit-scrollbar{display:none}
        .portfolio-scroll-hide{scrollbar-width:none;-ms-overflow-style:none}
      `}</style>
          {/* The full-screen finder is no longer mounted. Nothing opens it now
              that Give Setu is a direct link, and leaving it mounted kept a
              hidden dialog and its 42-function dataset on every page. */}
    </>
  );
};

export default Header;