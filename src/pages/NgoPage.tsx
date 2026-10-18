// pages/NgoPage.tsx — above-the-fold eager; heavy below-the-fold sections (three.js /
// recharts / gsap) are lazy + content-visibility deferred, mirroring the homepage, so
// the initial bundle no longer carries them. (The old gsap/ScrollTrigger/hook imports
// here were unused — removed.)
"use client";

import { lazy, Suspense } from "react";
import NgoHeroSection from "@/components/NgoHeroSection";
import HomeMarqueeStrips from "@/components/HomeMarqueeStrips";
import StatsSection2 from "@/components/StatsSection2";
import StatsSection from "@/components/StatsSection";
import NGOPartnersSection from "@/components/NGOPartnersSection";
import PremiumCarousel from "@/components/ui/PremiumCarousel";
import NgoVideoIntroSection from "./NgoVideoIntroSection";

// Below the fold — loaded on demand so three.js/recharts/gsap stay out of first paint.
const NgoServicesSection = lazy(() => import("@/components/NgoServicesSection"));
const OptimalResults = lazy(() => import("@/components/OptimalResults"));
const BonusPhase = lazy(() => import("@/components/BonusPhase"));
const NgoPhotography = lazy(() => import("@/components/NgoPhotography"));
const NgoVideoShowcase = lazy(() => import("./NgoVideoShowcase"));

const NgoPage = () => {
  return (
    <div className="w-full bg-black ngo-page-wrapper">
      <style>{`
        .ngo-page-wrapper { font-family: 'Inter', sans-serif; }
        .ngo-page-wrapper h1, .ngo-page-wrapper h2, .ngo-page-wrapper h3,
        .ngo-page-wrapper h4, .ngo-page-wrapper h5, .ngo-page-wrapper h6,
        .ngo-page-wrapper h1 *, .ngo-page-wrapper h2 *, .ngo-page-wrapper h3 *,
        .ngo-page-wrapper h4 *, .ngo-page-wrapper h5 *, .ngo-page-wrapper h6 * {
          font-family: 'Libre Baskerville', serif !important;
        }
        .ngo-page-wrapper p, .ngo-page-wrapper p *, .ngo-page-wrapper .font-sans {
          font-family: 'Inter', sans-serif;
        }
      `}</style>

      <NgoVideoIntroSection />
      <NgoHeroSection />
      <HomeMarqueeStrips />
      <StatsSection2 />
      <StatsSection />
      <NGOPartnersSection />
      <PremiumCarousel />

      <Suspense fallback={null}>
        <div className="cv-defer"><NgoServicesSection /></div>
        <div className="cv-defer"><OptimalResults /></div>
        <div className="cv-defer"><BonusPhase /></div>
        <div className="cv-defer"><NgoPhotography /></div>
        <div className="cv-defer"><NgoVideoShowcase /></div>
      </Suspense>
    </div>
  );
};

export default NgoPage;
