// pages/NgoPage.tsx - With VideomonialSection (gap fixed)
"use client";

import { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import NgoHeroSection from "@/components/NgoHeroSection";
import HomeMarqueeStrips from "@/components/HomeMarqueeStrips";
import StatsSection2 from '@/components/StatsSection2';
import StatsSection from '@/components/StatsSection';
import NGOPartnersSection from '@/components/NGOPartnersSection';
import PremiumCarousel from "@/components/ui/PremiumCarousel";
import NgoServicesSection from "@/components/NgoServicesSection";
import OptimalResults from "@/components/OptimalResults";
import BonusPhase from "@/components/BonusPhase";
import NgoPhotography from "@/components/NgoPhotography";

import NgoVideoShowcase from "./NgoVideoShowcase";
import NgoVideoIntroSection from "./NgoVideoIntroSection";



const NgoPage = () => {
  return (
    <div className="w-full bg-black ngo-page-wrapper">
      <style>{`

        .ngo-page-wrapper {
          font-family: 'Inter', sans-serif;
        }

        .ngo-page-wrapper h1, 
        .ngo-page-wrapper h2, 
        .ngo-page-wrapper h3, 
        .ngo-page-wrapper h4, 
        .ngo-page-wrapper h5, 
        .ngo-page-wrapper h6,
        .ngo-page-wrapper h1 *,
        .ngo-page-wrapper h2 *,
        .ngo-page-wrapper h3 *,
        .ngo-page-wrapper h4 *,
        .ngo-page-wrapper h5 *,
        .ngo-page-wrapper h6 * {
          font-family: 'Libre Baskerville', serif !important;
        }

        .ngo-page-wrapper p,
        .ngo-page-wrapper p *,
        .ngo-page-wrapper .font-sans {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
      <NgoVideoIntroSection />
      <NgoHeroSection />
      <HomeMarqueeStrips />
      <StatsSection2 />
      <StatsSection />
      <NGOPartnersSection />
      <PremiumCarousel/>
      <NgoServicesSection/>
      
      <OptimalResults />
      <BonusPhase />
      <NgoPhotography/>
         
      {/* ✅ VIDEOMONIAL SECTION - NO GAP */}
      <NgoVideoShowcase/>
      
      {/* <NgoFooter/> */}
    </div>
  );
};

export default NgoPage;