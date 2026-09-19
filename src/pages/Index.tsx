
import { useState } from "react";
import Header from "@/components/HomePage/Header";
import HeroSection from "@/components/HomePage/HeroSection";
import CredibilityBanners from "@/components/HomePage/CredibilityBanners";
import LatestWork from "@/components/HomePage/LatestWork";
import ServicesSection from '@/components/HomePage/ServicesSection';
import TextServicesSection from "@/components/HomePage/TextServicesSection";
import FunkyHinglishSection from "@/components/HomePage/WhatsappInteraktSection";
import ClientTestimonialSection from "@/components/HomePage/Testimonialssection";
import AboutUsSection from "@/components/HomePage/AboutUsSection";  
import PortfolioSection from "@/components/HomePage/PortfolioSection";
import PortfolioShowcase from "@/components/HomePage/Portfolioshowcase";
import NGOdisplay from "@/components/HomePage/NGOdisplay";
import ContactUsPage from "./ContactUsPage";

//import Footer from "@/components/Footer";
import NgoFooter from "@/components/NgoFooter";
import ContentMarketing from "./ContentMarketing";
import VideoSection from "@/components/HomePage/Section2Video";


const Index = () => {
  const [currentLanguage, setCurrentLanguage] = useState("en");

  const handleLanguageChange = (langCode: string) => {
    console.log("Language changed to:", langCode);
    setCurrentLanguage(langCode);
    localStorage.setItem("preferredLanguage", langCode);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <CredibilityBanners />
        <VideoSection />
        <LatestWork />
        <ServicesSection />
        <ClientTestimonialSection />
        <AboutUsSection />
        <TextServicesSection />
        <FunkyHinglishSection/>
        <PortfolioSection/>
        <PortfolioShowcase/>
        {/* NGOdisplay ("We build backbones" NGO-infrastructure section) hidden from home per request */}
        {/* <NGOdisplay/> */}
        {/* <ContactUsPage/> */}
        {/* <NgoFooter/> */}
        {/* <ContentMarketing/> */}
      </main> 
      {/* <Footer /> */}
    </div>
  );
};

export default Index;
























