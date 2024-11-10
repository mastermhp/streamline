import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import HeroSection1 from "./homepage/_components/HeroSection1";
import StatsSection from "./homepage/_components/StatsSection";
import CtaSection from "./homepage/_components/CtaSection";
import BentoGridSection from "./homepage/_components/BentoGridSection";
import PricingSection from "./homepage/_components/PricingSection";
import NewsletterSection from "./homepage/_components/NewsletterSection";
import PowerfulFeatures from "./homepage/_components/PowerfulFeatures";

export default function Home() {
  return (
   <div>
    <div className="">
      <HeroSection1/>
    </div>
    <div>
      <PowerfulFeatures/>
    </div>
    <div>
      <BentoGridSection/>
    </div>
    <div>
      <CtaSection/>
    </div>
    
    <div>
      <PricingSection/>
    </div>
    <div>
      <StatsSection/>
    </div>
    <div>
      <NewsletterSection/>
    </div>
   </div>
  );
}
