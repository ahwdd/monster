// src/app/[locale]/page.tsx
"use client";
import Header from "@/components/Header";
import ProgramHero from "@/components/landing/ProgramHero";
import ProgramOverview from "@/components/landing/ProgramOverview";
import RequirementsSection from "@/components/landing/RequirementsSection";
import LevelingSection from "@/components/landing/LevelingSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import RewardsSection from "@/components/landing/RewardSection";
import TopMonstersSection from "@/components/landing/TopMonstersSection";
import CtaStrip from "@/components/landing/CtaStrip";

export default function Home() {
  return (
    <main className="bg-black">
      <Header />
      <ProgramHero />
      <ProgramOverview />
      <RequirementsSection />
      <LevelingSection />
      <HowItWorksSection />
      <RewardsSection />
      <TopMonstersSection />
      <CtaStrip />
    </main>
  );
}