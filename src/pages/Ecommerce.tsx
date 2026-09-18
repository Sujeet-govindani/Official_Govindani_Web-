import React from "react";
import "@/styles/ecommerce.css";
import HeroSection from "@/components/Ecommerce/HeroSection";
import IntegrationsSlider from "@/components/Ecommerce/IntegrationsSlider";
import StepsSection from "@/components/Ecommerce/StepsSection";
import BenefitsGrid from "@/components/Ecommerce/BenefitsGrid";
import TestimonialsSlider from "@/components/Ecommerce/TestimonialsSlider";
import PortfolioShowcase from "@/components/Ecommerce/PortfolioShowcase";
import PlatformsSection from "@/components/Ecommerce/PlatformsSection";
import FeaturesTable from "@/components/Ecommerce/FeaturesTable";
import CustomIdeasSection from "@/components/Ecommerce/CustomIdeasSection";
import CTASection from "@/components/Ecommerce/CTASection";
import Footer from "@/components/HomePage/Footer";
import EcommercePortfolio from "@/components/Ecommerce/EcommercePortfolio";
import EcommerceIntroVideo from "@/components/Ecommerce/EcommerceIntroVideo";

/**
 * Ecommerce Page
 * Updated to match the premium Black & Gold theme of the main site.
 * Background: Deep Black (#000000)
 * Accent: Royal Gold (#D4AF37)
 * Typography: Libre Baskerville (Headings) / Inter (Body)
 */
const Ecommerce = () => {
  return (
    <>
      <main
        className="ecommerce-scope min-h-screen"
        style={{
          backgroundColor: "#000000",
          color: "#FFFFFF",
          fontFamily: "var(--font-body)",
        }}
      >

        <EcommerceIntroVideo />
        {/* All components inside will now inherit or use the updated ecommerce.css tokens */}
        <HeroSection />

        {/* Seamless integrations slider */}
        <IntegrationsSlider />

        {/* 4 Steps to launch */}
        <StepsSection />

        {/* Benefits / Problems we eliminate */}
        <BenefitsGrid />

        {/* Customer testimonials */}


        {/* E-commerce portfolio showcase */}
        <EcommercePortfolio />

        {/* Platform options */}
        <PlatformsSection />

        {/* 100+ Features table */}
        <FeaturesTable />

        {/* Custom development ideas */}
        <CustomIdeasSection />

        <TestimonialsSlider />
        {/* Final CTA */}
        <CTASection />
      </main>

    </>
  );
};

export default Ecommerce;