import FlavorsSection from "@/components/main/FlavorsSection";
import HashtagMarquee from "@/components/main/HashtagMarqee";
import Header from "@/components/Header";
import Hero from "@/components/main/Hero";
import NewsletterSection from "@/components/main/NewsLetterSection";
import NewsSection from "@/components/main/NewsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="">
      <Header />
      <Hero />
      <FlavorsSection />
      <NewsSection />
      <HashtagMarquee />
      <NewsletterSection />
      <Footer />
    </main>
  );
}