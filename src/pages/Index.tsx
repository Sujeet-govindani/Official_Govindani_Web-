import { lazy, Suspense } from "react";
import Header from "@/components/HomePage/Header";
import HeroSection from "@/components/HomePage/HeroSection";

// Everything below the hero is code-split. The initial JS bundle is then just
// the app shell + Header + HeroSection — which is what gates first paint and
// LCP on mobile. These still prerender into the HTML (prerender.mjs waits for
// networkidle0, so the lazy chunks resolve before capture, keeping SEO intact)
// and hydrate as separate chunks after the hero, instead of bloating one 383 KB
// bundle that the phone must parse before anything becomes interactive.
const CredibilityBanners = lazy(() => import("@/components/HomePage/CredibilityBanners"));
const VideoSection = lazy(() => import("@/components/HomePage/Section2Video"));
const LatestWork = lazy(() => import("@/components/HomePage/LatestWork"));
const ServicesSection = lazy(() => import("@/components/HomePage/ServicesSection"));
const ClientTestimonialSection = lazy(() => import("@/components/HomePage/Testimonialssection"));
const AboutUsSection = lazy(() => import("@/components/HomePage/AboutUsSection"));
const TextServicesSection = lazy(() => import("@/components/HomePage/TextServicesSection"));
const FunkyHinglishSection = lazy(() => import("@/components/HomePage/WhatsappInteraktSection"));
const PortfolioSection = lazy(() => import("@/components/HomePage/PortfolioSection"));
const PortfolioShowcase = lazy(() => import("@/components/HomePage/Portfolioshowcase"));

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        {/* content-visibility:auto (cv-defer) lets the browser skip layout &
            paint for each below-the-fold section until it's scrolled near — the
            single biggest cut to the mobile Style & Layout / Rendering cost on
            this long, animation-heavy page. */}
        <Suspense fallback={null}>
          <div className="cv-defer"><CredibilityBanners /></div>
          <div className="cv-defer"><VideoSection /></div>
          <div className="cv-defer"><LatestWork /></div>
          <div className="cv-defer"><ServicesSection /></div>
          <div className="cv-defer"><ClientTestimonialSection /></div>
          <div className="cv-defer"><AboutUsSection /></div>
          <div className="cv-defer"><TextServicesSection /></div>
          <div className="cv-defer"><FunkyHinglishSection /></div>
          <div className="cv-defer"><PortfolioSection /></div>
          <div className="cv-defer"><PortfolioShowcase /></div>
        </Suspense>
      </main>
    </div>
  );
};

export default Index;
