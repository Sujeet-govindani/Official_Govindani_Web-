import React from "react";
import HeroSection from "../components/About/AboutHero";
import PAGE_STYLES from "../components/About/PAGE_STYLES";
import "../components/About/StorySection"; // Import hero-specific styles
import StorySection from "../components/About/StorySection";
import ImpactSection from "@/components/About/ImpactSection";   
import TestimonialsSection from "@/components/About/TestimonialsSection";
import FloatingBooks from "@/components/About/FloatingBooks";
import CTASection from "@/components/About/CTASection";


 
const AboutPage = () => {
  return (
    <>
      {/* Inject global page styles */}
      <style dangerouslySetInnerHTML={{ __html: PAGE_STYLES }} />
      
      {/* Additional style to remove extra spacing */}
      <style>{`
        .root {
          min-height: auto !important;
          padding-bottom: 0 !important;
          margin-bottom: 0 !important;
        }
        body {
          margin-bottom: 0 !important;
        }
      `}</style>
      
      {/* Root wrapper - NO additional CSS needed here */}
      <div className="root">
        {/* Hero Section - fully self-contained with all its styles */}
        <HeroSection />
        <StorySection />
        
        <ImpactSection />

        <TestimonialsSection />
        <FloatingBooks />

        <CTASection />
      </div>
    </>
  );
};

export default AboutPage;