import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import HeroSection1 from "./homepage/_components/heroSection1";
import StatsSection from "./homepage/_components/StatsSection";
import CtaSection from "./homepage/_components/CtaSection";
import BentoGridSection from "./homepage/_components/BentoGridSection";
import PricingSection from "./homepage/_components/PricingSection";
import NewsletterSection from "./homepage/_components/NewsletterSection";

export default function Home() {
  return (
   <div>
    <div className="">
      <HeroSection1/>
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
