import HeroSection from "@/components/Case Study/CSHeroSection";
import TrustStrip from "@/components/Case Study/TrustStrip";
import CaseStudyCard from "@/components/Case Study/Case-studyCard";
import ProcessSection from "@/components/Case Study/ProcessSection";
import WhyItWorks from "@/components/Case Study/WhyItWorks";
import FinalCTA from "@/components/Case Study/FinalCTA";
import { caseStudies } from "@/data/caseStudies";

const CaseStudies = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <TrustStrip />

      <section id="case-studies">
        {caseStudies.map((study, i) => (
          <CaseStudyCard key={study.id} study={study} index={i} />
        ))}
      </section>

      <ProcessSection />
      <WhyItWorks />
      <FinalCTA />
    </main>
  );
};

export default CaseStudies;
