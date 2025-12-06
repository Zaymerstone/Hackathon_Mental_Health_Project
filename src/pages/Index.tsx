import { useRef } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/landing/HeroSection";
import WhySection from "@/components/landing/WhySection";
import PortfolioSection from "@/components/landing/PortfolioSection";
import RoleSelectionSection from "@/components/landing/RoleSelectionSection";

const Index = () => {
  const roleSelectionRef = useRef<HTMLDivElement>(null);
  const whySectionRef = useRef<HTMLDivElement>(null);

  const scrollToRoleSelection = () => {
    roleSelectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollToWhySection = () => {
    whySectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onGetStartedClick={scrollToRoleSelection} />
      <main className="flex-1 pt-16">
        <HeroSection onGetStartedClick={scrollToRoleSelection} onLearnMoreClick={scrollToWhySection} />
        <div ref={whySectionRef}>
          <WhySection />
        </div>
        <PortfolioSection />
        <RoleSelectionSection ref={roleSelectionRef} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
