import FlavorsSection from "@/components/main/FlavorsSection";
import Header from "@/components/main/Header";
import Hero from "@/components/main/Hero";
import NewsSection from "@/components/main/NewsSection";

export default function Home() {
  return (
    <main className="">
      <Header />
      <Hero />
      <FlavorsSection />
      <NewsSection />
    </main>
  );
}