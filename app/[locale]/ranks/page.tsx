// src/app/[locale]/ranks/page.tsx
"use client";
import { useLocale }   from "next-intl";
import Link            from "next/link";
import Image           from "next/image";
import { motion }      from "framer-motion";
import { IoCheckmarkCircle, IoArrowForward, IoArrowBack } from "react-icons/io5";
import PageTitle from "@/components/ui/PageTitle";
import SkewBtn   from "@/components/ui/SkewBtn";
import { RANK_DETAILS } from "@/lib/data/program";
import Header from "@/components/Header";

export default function RanksPage() {
  const locale = useLocale();
  const isRTL  = locale === "ar";
  const Arrow  = isRTL ? IoArrowBack : IoArrowForward;

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <PageTitle title={locale === "ar" ? "التصنيفات" : "Ranks"} />

      <div style={{ width: "100%", maxWidth: "1300px", margin: "60px auto 80px", borderBottom: "1px solid #171717" }}>
        <div className="px-6 space-y-12 pb-20">

          <p className="font-proxima txt-regular text-zinc-500 text-center max-w-xl mx-auto">
            {locale === "ar"
              ? "لا ترقيات تلقائية. كل مستوى يُكتسب بالثبات والوصول وموافقة الفريق."
              : "No automatic upgrades. Every level is earned through consistency, reach, and team approval."}
          </p>

          {RANK_DETAILS.map((rank, i) => (
            <motion.section
              key={rank.id}
              id={rank.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="relative overflow-hidden"
              style={{
                border: "solid 1px #707070",
                background: "rgba(0,0,0,.2)",
              }}
            >
              <div className="h-0.5 w-full" style={{ background: rank.color }} />

              <div
                className="absolute top-0 inset-e-0 w-48 h-48 pointer-events-none"
                style={{
                  background: `linear-gradient(to bottom left, ${rank.color}18 0%, transparent 70%)`,
                }}
              />

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Left — info */}
                <div className="p-8 relative z-10">
                  {/* Reach badge */}
                  <span
                    className="txt-smaller font-bold uppercase tracking-wider px-2.5 py-1 mb-4 inline-block"
                    style={{ color: rank.color, background: `${rank.color}18`, border: `1px solid ${rank.color}40` }}
                  >
                    {locale === "ar" ? rank.reachAr : rank.reachEn}
                  </span>

                  {/* Rank name vertical-ish with image */}
                  <div className="flex items-start gap-4 mb-4">
                    {rank.id === "cold" && (
                      <div className="relative shrink-0" style={{ width: "80px", height: "100px" }}>
                        <Image src="/assets/program/ranks-can.png" alt="Cold rank" fill className="object-contain" />
                      </div>
                    )}
                    <div>
                      <h2
                        className="font-display font-black uppercase leading-none mb-1 text-3xl md:text-4xl"
                        style={{ color: rank.color }}
                      >
                        {locale === "ar" ? rank.nameAr : rank.nameEn}
                      </h2>
                      <p className="txt-smaller uppercase tracking-widest text-zinc-500 mb-4">
                        {locale === "ar" ? rank.tagAr : rank.tagEn}
                      </p>
                    </div>
                  </div>

                  <p className="font-proxima txt-regular text-zinc-400 leading-relaxed mb-4">
                    {locale === "ar" ? rank.descAr : rank.descEn}
                  </p>

                  <p className="txt-smaller text-zinc-600 italic mb-5">
                    📅 {locale === "ar" ? rank.monthsAr : rank.monthsEn}
                  </p>

                  {/* Requirements */}
                  <p className="txt-smaller font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                    {locale === "ar" ? "المتطلبات" : "Requirements"}
                  </p>
                  <ul className="space-y-1.5">
                    {(locale === "ar" ? rank.requirementsAr : rank.requirementsEn).map((r) => (
                      <li key={r} className="flex items-center gap-2 txt-small text-zinc-300">
                        <span style={{ color: rank.color }}>→</span> {r}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right — rewards */}
                <div className="p-8 border-s border-[#707070] relative z-10">
                  <p className="txt-smaller font-semibold uppercase tracking-wider text-zinc-500 mb-4">
                    {locale === "ar" ? "المكافآت" : "Rewards"}
                  </p>
                  <ul className="space-y-3">
                    {(locale === "ar" ? rank.rewardsAr : rank.rewardsEn).map((r) => (
                      <li key={r} className="flex items-start gap-2.5 txt-small text-zinc-300">
                        <IoCheckmarkCircle className="size-4 shrink-0 mt-0.5" style={{ color: rank.color }} />
                        {r}
                      </li>
                    ))}
                  </ul>

                  {rank.id === "cold" && (
                    <div className="mt-6 p-4"
                      style={{ border: "1px solid rgba(56,189,248,0.3)", background: "rgba(56,189,248,0.05)" }}>
                      <p className="txt-smaller font-bold text-[#38bdf8] uppercase tracking-wide mb-1">
                        {locale === "ar" ? "🏆 الجائزة الكبرى" : "🏆 Grand Prize"}
                      </p>
                      <p className="txt-smaller text-zinc-400">
                        {locale === "ar"
                          ? "3M مشاهدة = كريدت PC كامل من متجر AHW"
                          : "3M views = Full PC credit from AHW Store"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.section>
          ))}

          {/* CTA */}
          <div className="text-center pt-8 border-t border-[#171717]">
            <p className="font-display font-black text-white uppercase text-3xl mb-6">
              {locale === "ar" ? "مستعد للبدء؟" : "READY TO START?"}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <SkewBtn href={`/${locale}/submissions/register`}
                text={locale === "ar" ? "سجّل الآن" : "REGISTER NOW"} />
              <SkewBtn href={`/${locale}/leaderboard`}
                text={locale === "ar" ? "لوحة الصدارة" : "LEADERBOARD"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}