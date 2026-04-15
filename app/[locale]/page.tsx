// src/app/[locale]/page.tsx"use client";
import Header from "@/components/Header";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import ProgramHero from "@/components/landing/ProgramHero";
import RanksSection from "@/components/landing/RankSection";
import Hero from "@/components/main/Hero";
import NewsSection from "@/components/main/NewsSection";
 
export default function Home() {
  return (
    <main>
      <Header />
      <ProgramHero />
      <RanksSection />
      <HowItWorksSection />
      <NewsSection />
    </main>
  );
}