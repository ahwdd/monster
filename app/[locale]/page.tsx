// src/app/[locale]/page.tsx
"use client";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import Header               from "@/components/Header";
import ProgramHero          from "@/components/landing/ProgramHero";
import ProgramOverview      from "@/components/landing/ProgramOverview";
import RequirementsSection  from "@/components/landing/RequirementsSection";
import LevelingSection      from "@/components/landing/LevelingSection";
import HowItWorksSection    from "@/components/landing/HowItWorksSection";
import RewardsSection       from "@/components/landing/RewardSection";
import TopMonstersSection   from "@/components/landing/TopMonstersSection";
import CtaStrip             from "@/components/landing/CtaStrip";
import SectionReveal from "@/components/animation/SectionReveal";

export default function Home() {
  const locale = useLocale();
  const isRTL  = locale === "ar";

  return (
    <main className="bg-black overflow-x-hidden">
      <Header />

      <ProgramHero />

      <SectionReveal id="overview" isRTL={isRTL}>
        <ProgramOverview />
      </SectionReveal>

      <SectionReveal id="requirements" isRTL={isRTL}>
        <RequirementsSection />
      </SectionReveal>

      <SectionReveal id="levels" isRTL={isRTL}>
        <LevelingSection />
      </SectionReveal>

      <SectionReveal id="howItWorks" isRTL={isRTL}>
        <HowItWorksSection />
      </SectionReveal>

      <SectionReveal id="rewards" isRTL={isRTL}>
        <RewardsSection />
      </SectionReveal>

      <SectionReveal id="leaderboard" isRTL={isRTL}>
        <TopMonstersSection />
      </SectionReveal>

      <SectionReveal id="cta" isRTL={isRTL}>
        <CtaStrip />
      </SectionReveal>
    </main>
  );
}