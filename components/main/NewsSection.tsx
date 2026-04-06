"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { newsArticles } from "@/utils/data/news";
import SkewBtn from "@/components/ui/SkewBtn";

export default function NewsSection() {
  const t      = useTranslations("news");
  const locale = useLocale();
  const isAr   = locale === "ar";

  return (
    <section className="relative w-full transition-[opacity,transform] duration-800 
    ease-[cubic-bezier(.25,.1,.25,1)] news-bg ">

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none z-0" />

      {/* ── Main container ── */}
      <div className="container relative z-10  mb-52.5 pt-62.5 overflow-visible">

        {/* ── Header: 3-col border trick ── */}
        <div className="flex">

          {/* Left third */}
          <div className="w-1/3 shrink-0 py-5 -mt-10 border-e border-[rgba(204,204,204,0.4)]">
            <div className="border-t border-[rgba(204,204,204,0.4)]" />
          </div>

          {/* Center third — title */}
          <div className="w-1/3 shrink-0 flex items-start justify-center px-2.5">
            <h2 className="font-semibold text-white uppercase text-center w-full inline-block align-middle px-2.5 
            -mt-5 text-[4.5rem] leading-6.25">
              {t("sectionTitle")}
            </h2>
          </div>

          {/* Right third */}
          <div className="w-1/3 shrink-0 py-5 -mt-10 border-s border-[rgba(204,204,204,0.4)]">
            <div className="border-t border-[rgba(204,204,204,0.4)]" />
          </div>

        </div>

        {/* ── Article list ── */}
        <div className="flex flex-col gap-5 relative px-7.5 -mt-6 pt-20 border-l border-r overflow-y-visible border-[rgba(204,204,204,0.4)]">
          {newsArticles.map((article, i) => (
            <NewsCard key={article.id} article={article} isAr={isAr} index={i} />
          ))}

          <span className="absolute w-[calc(100%+2px)] bottom-0 h-10 -left-px right-0 border border-b-0 border-t-[rgba(204,204,204,0.4)] border-r-black border-l-black"></span>
        </div>

        
        {/* ── View All CTA ── */}
        <div className="relative z-10 flex justify-center mt-10">
            <SkewBtn href="/news" text={t("viewAll")} />
        </div>

      </div>


    </section>
  );
}

function NewsCard({
  article,
  isAr,
  index,
}: {
  article: (typeof newsArticles)[number];
  isAr: boolean;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className=" h-1/2"
    >
      <Link href={article.href} className="news-card flex no-underline group relative z-1">

        {/* ── Image half ── */}
        <div className="relative w-1/2 shrink-0 min-h-100 overflow-hidden">
          <Image
            src={article.img}
            alt={isAr ? article.titleAr : article.title}
            fill
            className="news-card-img object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
          />
        </div>

        {/* ── Info half ── */}
        <div className="news-card-info relative w-1/2 shrink-0 pt-7.5 px-7.5 pb-20 bg-[#171717] group-hover:shadow-[inset_0_0_25px_5px_#363636] transition-all duration-500">

          {/* 1. Tag  ≈ 1.1rem → txt-huge (1.125rem) */}
          <p className="txt-huge font-medium uppercase tracking-[2px] text-[#6bd41a] mb-7.5">
            {isAr ? article.tagAr : article.tag}
            {" / "}
            {isAr ? article.tagSubAr : article.tagSub}
          </p>

          {/* 2. Title  1.5rem → header-small clamp(1.25–1.5rem) */}
          <h3 className="header-small text-white font-bold mb-6.25">
            {isAr ? article.titleAr : article.title}
          </h3>

          {/* 3. Excerpt  1.2rem → header-smaller clamp(1.125–1.3rem) */}
          <p className="font-proxima header-smaller text-[#b6b6b6] font-semibold not-italic">
            {isAr ? article.excerptAr : article.excerpt}
          </p>

          {/* 4. Date / category — absolute bottom-start */}
          <p className="txt-larger font-semibold not-italic absolute bottom-7.5 start-7.5">
            <span className="text-[#6bd41a]">{isAr ? article.dateAr : article.date}</span>
            {" — "}
            <span className="text-[#6bd41a]">{isAr ? article.dateCatAr : article.dateCat}</span>
          </p>

        </div>
      </Link>
    </motion.div>
  );
}