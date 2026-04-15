// src/app/[locale]/page.tsx"use client";
import HeroSection        from "@/components/landing/HeroSection";
import HowItWorksSection  from "@/components/landing/HowItWorksSection";
import ProgramStatsStrip from "@/components/landing/ProgramStatsStrip";
import RanksSection from "@/components/landing/RankSection";
import RequirementsSection from "@/components/landing/RequirementsSection";
import NewsletterSection from "@/components/main/NewsLetterSection";
import NewsSection from "@/components/main/NewsSection";

export default function LandingPage() {
  return (
    <main>
      <HeroSection />
      <ProgramStatsStrip />
      <RanksSection />
      <HowItWorksSection />
      <RequirementsSection />
     <NewsSection />
     <NewsletterSection />
    </main>
  );
}