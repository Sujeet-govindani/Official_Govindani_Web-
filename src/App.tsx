import { lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import { ScrollToTop } from "./components/ScrollToTop";
import LangSync from "./i18n/LangSync";
import Seo from "./seo/Seo";
import LazyVideos from "./perf/LazyVideos";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Header from "./components/HomePage/Header"; 

import WhatsAppFloating from "./components/WhatsAppFloating";
import GetQuoteFloating from "./components/GetQuoteFloating";
import ChatWidget from "./components/ChatWidget";
import BottomNav from "./components/BottomNav/BottomNav";
const AllServices = lazy(() => import("./pages/AllServices"));
const VideoSection = lazy(() => import("./components/HomePage/Section2Video"));


// services offered pages

const NGOSocialMediaPage = lazy(() => import("./components/ServicesOffered/NGO/SocialMediaNGO"));
const EcommerceSocialMediaPage = lazy(() => import("./components/ServicesOffered/ECOMMERCE/SocialMediaEcom"));
const NumerologySocialMediaPage = lazy(() => import("./components/ServicesOffered/NUMEROLOGY/SocialMediaNum"));
const RealEstateSocialMediaPage = lazy(() => import("./components/ServicesOffered/REALESTATE/SocialMediaRE"));
const HospitalitySocialMediaPage = lazy(() => import("./components/ServicesOffered/HOSPITALITY/SocialMediaHosp"));
const PersonalBrandingSocialMediaPage = lazy(() => import("./components/ServicesOffered/PERSONALBRAND/SocialMediaPB"));
const PlansAndPricingPage = lazy(() => import("./components/ServicesOffered/PRICING/SocialMediaPP"));
const LiveProfileEmbedsPage = lazy(() => import("./components/ServicesOffered/LIVEPROFILES/SocialMediaLP"));
const SocialMediaOverviewPage = lazy(() => import("./components/ServicesOffered/ALL/SMoverview"));
const SEOSection = lazy(() => import("./components/ServicesOffered/ALL/SEO"));
const VideoGraphy = lazy(() => import("./components/ServicesOffered/ALL/VideoGraphy"));

// Import pages
const NgoPage = lazy(() => import("./pages/NgoPage"));
const ContactUsPage = lazy(() => import("./pages/ContactUsPage"));
// Import Careers page
const CareersPage = lazy(() => import("./pages/CareersPage"));
// Import other pages as needed


//services pages
const WhatsAppServices = lazy(() => import("./components/ServicesOffered/ALL/WhatsappService"));
const GoogleAds = lazy(() => import("./components/ServicesOffered/ALL/GoogleAds"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const CaseStudyDetail = lazy(() => import("./pages/CaseStudyDetail"));
// import AIProductShoot from "./components/ServicesOffered/ALL/AIProductShoot";
const CheckoutSystem = lazy(() => import("./components/ServicesOffered/ALL/CheckoutSystem"));
const GraphicDesign = lazy(() => import("./components/ServicesOffered/ALL/GraphicDesign"));
const LogoDesigning = lazy(() => import("./components/ServicesOffered/ALL/Logo Designing"));
const PlatformListing = lazy(() => import("./components/ServicesOffered/ALL/PlatformListing"));
const ProductShoot = lazy(() => import("./components/ServicesOffered/ALL/ProductShoot"));
const WebDevelopmentPage = lazy(() => import("./components/ServicesOffered/ALL/Website Creation"));
const VirtualTourSections = lazy(() => import("./pages/VT"));

//portfolio pages
const Ecommerce = lazy(() => import("./pages/Ecommerce"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const Virtualtour = lazy(() => import("./pages/Virtualtour"));
const EcommercePage = lazy(() => import("./pages/EcommercePage"));
import Ngoportfolio from "./pages/NGOportfolio";
const PortfolioIndex = lazy(() => import("./pages/Portfolio"));
const RealEstatePage = lazy(() => import("./pages/RealEstate"));
const BusinessWebsitesPage = lazy(() => import("./pages/Business"));
const EducationPage = lazy(() => import("./pages/Hospitality"));
import HealthcarePage from "./pages/Healthcare";
const CIBuilderCRM = lazy(() => import("@/components/ServicesOffered/ALL/CI CRM"));
const HotelFolioCRM = lazy(() => import("@/components/ServicesOffered/ALL/Hotel CRM"));
const CarWashCRM = lazy(() => import("@/components/ServicesOffered/ALL/Car Washing CRM"));

const Healthcare = lazy(() => import("./pages/Healthcare"));
const LeadGenerationPage = lazy(() => import("@/components/ServicesOffered/ALL/LeadGenerationPage"));
const B2BSalesPage = lazy(() => import("./components/WhatsappInterakt/B2B Sales"));
const TravelTourismPage = lazy(() => import("./components/WhatsappInterakt/Travel & Tourism"));
const RestaurantPage = lazy(() => import("./components/WhatsappInterakt/Restaurants & Food Businesses"));
const SpasSalonsPage = lazy(() => import("./components/WhatsappInterakt/Spas & Salons"));
const HealthWellnessPage = lazy(() => import("./components/WhatsappInterakt/Health & Wellness Brands"));
const BeautyCosmeticsPage = lazy(() => import("./components/WhatsappInterakt/Beauty & Cosmetic Brands"));
const EdTechPage = lazy(() => import("./components/WhatsappInterakt/Edutech"));
const AutomotivePage = lazy(() => import("./components/WhatsappInterakt/Automotive"));
const HomeDecorPage = lazy(() => import("./components/WhatsappInterakt/Home Decor & Furnishing"));
const MarketingAgencyPage = lazy(() => import("./components/WhatsappInterakt/Marketing Agency"));
const RealEstate = lazy(() => import("./components/WhatsappInterakt/Real Estate"));
const FreelancerConsultantPage = lazy(() => import("./components/WhatsappInterakt/Freelancer & Consultant Sales"));
const BankFinancePage = lazy(() => import("./components/WhatsappInterakt/Banking & Finance"));
const AboutPages = lazy(() => import("./pages/AboutCompany"));


const NGOVideos = lazy(() => import("./pages/Tutorials"));
// Import WhatsApp Voice Calling page
const WhatsAppVoiceCalling = lazy(() => import("./components/WhatsAppByChannel/WhatsAppVoiceCalling"));
// Import WhatsApp Chatbot Builder page
const WhatsAppChatbotPage = lazy(() => import("./components/WhatsAppByChannel/WhatsAppChatbotPage"));
// import HospitalPage from "./pages/HospitalPage";
// import RealEstatePage from "./pages/RealEstatePage";



//pricing and plans pages
const SocialMediaPricingPage = lazy(() => import("./components/Pricing/SocialMediapricing"));
const WebsitesPricingPage = lazy(() => import("./components/Pricing/WebsitePricing"));
const OtherServicesPricingPage = lazy(() => import("./components/Pricing/OtherServices"));
const NgoOsPricingPage = lazy(() => import("./components/Pricing/NgoOsPricing"));
const NgoWebsitePricingPage = lazy(() => import("./components/Pricing/NgoWebsitePricing"));


//whatsapp by channel pages
const Whatsappbusinessapipage = lazy(() => import("./components/WhatsAppByChannel/Whatsappbusinessapipage"));
const Whatsappformspage = lazy(() => import("./components/WhatsAppByChannel/Whatsappformspage"));
const Whatsappadspage = lazy(() => import("./components/WhatsAppByChannel/Whatsappadspage"));
const WhatsAppMarketing = lazy(() => import("./components/WhatsAppByChannel/WhatsAppMarketing"));
const WhatsAppAutomation = lazy(() => import("./components/WhatsAppByChannel/WhatsAppAutomation"));
const WhatsAppNotificationLibrary = lazy(() => import("./components/WhatsAppByChannel/WhatsAppNotificationLibrary"));
const WhatsAppCommerce = lazy(() => import("./components/WhatsAppByChannel/WhatsAppCommerce"));
const WhatsAppCrm = lazy(() => import("./components/WhatsAppByChannel/WhatsAppCrm"));
const WhatsAppWidget = lazy(() => import("./components/WhatsAppByChannel/WhatsAppWidget"));
const InstagramAutomation = lazy(() => import("./components/WhatsAppByChannel/InstagramAutomation"));
const WhatsAppRcs = lazy(() => import("./components/WhatsAppByChannel/WhatsAppRcs"));
import CardStack from "./components/CardStack";
const MetaAds = lazy(() => import("@/components/ServicesOffered/ALL/MetaAds"));
const VideoEditingPage = lazy(() => import("@/components/ServicesOffered/ALL/VideoEditing"));
const PhotographyPage = lazy(() => import("@/components/ServicesOffered/ALL/Photography"));
const LinkedInAdsPage = lazy(() => import("@/components/ServicesOffered/ALL/LinkedInAdsPage"));
const PaymentGatewayPage = lazy(() => import("@/components/ServicesOffered/ALL/Payment Gateway"));
const LogisticIntegration = lazy(() => import("@/components/ServicesOffered/ALL/LogisticIntegration"));
const MarketPlaceBrandListing = lazy(() => import("@/components/ServicesOffered/ALL/MarketPlaceBrandListing"));
const AIAutomation = lazy(() => import("./pages/AIAutomation"));
const ExploreCareer = lazy(() => import("./pages/ExploreCareer"));
import TechRoles from "./pages/TechRoles"; // ← NEW
import NGOVideoIntro from "./components/HomePage/NGOVideoIntro";
import Footer from "./components/HomePage/Footer";
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const Sitemap = lazy(() => import("./pages/Sitemap"));
const BlogListing = lazy(() => import("./pages/BlogListing"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const FAQPage = lazy(() => import("./pages/FAQPage"));

// import Videography from "./components/Videography";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Seo />
      <LazyVideos />
      <TooltipProvider>
        <div className="app-container">
          {/* <Toaster /> */}
          {/* <Sonner /> */}
          
          <Header />

          <LangSync />
        <ScrollToTop />
          <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about-us/about-founder" element={<AboutPage />} />
            <Route path="/portfolio" element={<PortfolioIndex />} />
            <Route path="/portfolio/virtual-tour" element={<Virtualtour />} />
            <Route path="/portfolio/ecommerce" element={<EcommercePage />} />
            <Route path="/portfolio/ngo" element={< Ngoportfolio/>} />
            <Route path="/portfolio/builders" element={<RealEstatePage/>} /> 
            <Route path="/portfolio/business" element={<BusinessWebsitesPage />} /> 
            <Route path="/services/ci-crm" element={<CIBuilderCRM />} />
            <Route path="/services/hotel-crm" element={<HotelFolioCRM />} />
            <Route path="/services/car-wash-crm" element={<CarWashCRM />} />
            {/* this is education page made as hospitality */}
            <Route path="/portfolio/hospitality" element={<EducationPage />} />
            <Route path="/portfolio/healthcare" element={<Healthcare />} />
            <Route path="/pages/ngopage" element={<NgoPage />} />
            <Route path="/about-us/about-company" element={<AboutPages />} />
              <Route path="/services/meta-ads" element={<MetaAds />} />
              <Route path="/services/video-editing" element={<VideoEditingPage />} />
              <Route path="/services/photography" element={<PhotographyPage />} />
            <Route path="/services/whatsapp-flow" element={<WhatsAppServices />} />
            <Route path="/services/google-ads" element={<GoogleAds />} />
            <Route path="/pages/case-study" element={<CaseStudies/>} />
            <Route path="/pages/case-study/:slug" element={<CaseStudyDetail/>} />
            {/* <Route path="/services/ai-product-shoot" element={<AIProductShoot/>} /> */}
            <Route path="/services/product-shoot" element={<ProductShoot/>} />
            <Route path="/services/checkout-system" element={<CheckoutSystem/>} />
            <Route path="/services/graphic-designer" element={<GraphicDesign/>} />
            <Route path="/services/logo-designing" element={<LogoDesigning/>} />
            <Route path="/services/website-creation" element={<WebDevelopmentPage/>} />
            <Route path="/services/videography" element={<VideoGraphy />} />
            <Route path="/services/virtual-tours" element={<VirtualTourSections />} />
            <Route path="/video-section" element={<VideoSection/>} />
            
            
            {/* // whatsapp interakt pages */}
            <Route path="/whatsapp/industries/b2b-sales" element={<B2BSalesPage />} />
            <Route path="/whatsapp/industries/travel-tourism" element={<TravelTourismPage />} />
            <Route path="/whatsapp/industries/restaurants-food" element={<RestaurantPage />} />
            <Route path="/whatsapp/industries/spas-salons" element={<SpasSalonsPage />} />
            <Route path="/whatsapp/industries/health-wellness" element={<HealthWellnessPage />} />
            <Route path="/whatsapp/industries/beauty-cosmetics" element={<BeautyCosmeticsPage />} />
            <Route path="/whatsapp/industries/edtech" element={<EdTechPage />} />
            <Route path="/whatsapp/industries/automotive" element={<AutomotivePage />} />
            <Route path="/whatsapp/industries/home-decor" element={<HomeDecorPage />} />
            <Route path="/whatsapp/industries/marketing-agency" element={<MarketingAgencyPage />} />
            <Route path="/whatsapp/industries/real-estate" element={<RealEstate />} />
            <Route path="/whatsapp/industries/freelancer-consultant" element={<FreelancerConsultantPage />} />
            <Route path="/whatsapp/industries/banking-finance" element={<BankFinancePage />} />

            <Route path="/services/seo" element={<SEOSection />} />
            <Route path="/tutorials/ngo-videos" element={<NGOVideos />} />
            <Route path="/careers" element={<CareersPage />} />

            {/* social media pages */}
        <Route path="/services/social-media" element={<SocialMediaOverviewPage />} />
        <Route path="/services/social-media/ngo" element={<NGOSocialMediaPage />} />
        <Route path="/services/social-media/ecommerce" element={<EcommerceSocialMediaPage />} />
        <Route path="/services/social-media/astrology" element={<NumerologySocialMediaPage />} />
        <Route path="/services/social-media/real-estate" element={<RealEstateSocialMediaPage />} />
        <Route path="/services/social-media/hospitality" element={<HospitalitySocialMediaPage />} />
        <Route path="/services/social-media/personal-branding" element={<PersonalBrandingSocialMediaPage />} />
        <Route path="/services/social-media/plans" element={<PlansAndPricingPage />} />
        <Route path="/services/social-media/live-profiles" element={<LiveProfileEmbedsPage />} />

            <Route path="/whatsapp/voice-calling" element={<WhatsAppVoiceCalling />} />
            <Route path="/whatsapp/chatbot-builder" element={<WhatsAppChatbotPage />} />
            <Route path="/whatsapp/business-api" element={<Whatsappbusinessapipage />} />
             <Route path="/whatsapp/forms" element={<Whatsappformspage />} />
             <Route path="/whatsapp/click-to-whatsapp-ads" element={<Whatsappadspage/>} />
             <Route path="/whatsapp/marketing" element={<WhatsAppMarketing/>} />
             <Route path="/whatsapp/automation" element={<WhatsAppAutomation/>} />
               <Route path="/whatsapp/notification-library" element={<WhatsAppNotificationLibrary/>} />
             <Route path="/whatsapp/commerce" element={<WhatsAppCommerce/>} />
             <Route path="/whatsapp/crm" element={<WhatsAppCrm/>} />
             <Route path="/whatsapp/chat-widget" element={<WhatsAppWidget/>} />
             <Route path="/instagram/automation" element={<InstagramAutomation/>} />
              <Route path="/rcs/fallback" element={<WhatsAppRcs/>} />
                <Route path="/services/linkedin-ads" element={<LinkedInAdsPage />} />
                <Route path="/services/payment-gateway" element={<PaymentGatewayPage />} />
                <Route path="/services/logistic-integration" element={<LogisticIntegration />} />
                <Route path="/services/marketplace-brand-listing" element={<MarketPlaceBrandListing />} />
                <Route path="/services/ai-automation" element={<AIAutomation />} />
      
            <Route path="/contact-us" element={<ContactUsPage />} />
            <Route path="/services/lead-generation" element={<LeadGenerationPage/>} />

            {/* Pricing and Plans Pages */}
            <Route path="/pricing/websites" element={<WebsitesPricingPage />} />
            <Route path="/pricing/social-media" element={<SocialMediaPricingPage />} />
            <Route path="/pricing/other-services" element={<OtherServicesPricingPage />} />
            <Route path="/pricing/ngo-os" element={<NgoOsPricingPage />} />
            <Route path="/pricing/ngo-os/:lang" element={<NgoOsPricingPage />} />
            <Route path="/pricing/ngo-website" element={<NgoWebsitePricingPage />} />


            {/* Career routes */}
            <Route path="/explore-career" element={<ExploreCareer />} />
            <Route path="/tech-roles" element={<TechRoles />} />  {/* ← NEW */}

            {/* Add other routes */}
            <Route path="/services/ecommerce" element={<Ecommerce />} />
            <Route path="/real-estate" element={<Virtualtour />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/sitemap" element={<Sitemap />} />
            <Route path="/services" element={<AllServices />} />
            {/* Blog routes */}
            <Route path="/blog" element={<BlogListing />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
          <Footer />
        </div>
      </TooltipProvider>
      {/* Desktop keeps the two floating buttons. On mobile they are replaced by
          the bottom dock below, which absorbs both actions and stops the three
          of them stacking on top of each other in the same corner. */}
      <div className="hidden md:block">
        <WhatsAppFloating />
        <GetQuoteFloating />
      </div>

      {/* The chat is NOT desktop-only: the bottom dock absorbs WhatsApp and Get
          Quote, but nothing else offers the assistant, so it must render on
          mobile too — sitting clear of the dock (see the mobile CSS). */}
      <ChatWidget />

      <BottomNav />
    </BrowserRouter>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;