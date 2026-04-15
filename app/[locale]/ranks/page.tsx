"use client";

// src/app/[locale]/ranks/page.tsx
import { useLocale }   from "next-intl";
import Link            from "next/link";
import Image           from "next/image";
import { motion }      from "framer-motion";
import { IoCheckmarkCircle, IoArrowForward, IoArrowBack } from "react-icons/io5";
import { RANK_DETAILS } from "@/lib/data/program";

export default function RanksPage() {
  const locale = useLocale();
  const isRTL  = locale === "ar";
  const Arrow  = isRTL ? IoArrowBack : IoArrowForward;

  return (
    <div className="min-h-screen bg-black">
      {/* Page header */}
      <div className="pt-20 pb-16 relative overflow-hidden border-b border-zinc-900 bg-[#050505]">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 80% at 50% 100%, #78be20, transparent)" }} />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <p className="txt-small font-semibold uppercase tracking-[0.3em] text-[#78be20] mb-4">
            {locale === "ar" ? "نظام التصنيف" : "Ranking System"}
          </p>
          <h1 className="font-display font-black text-white uppercase text-5xl md:text-6xl leading-none mb-4">
            {locale === "ar" ? "جميع التصنيفات" : "ALL RANKS"}
          </h1>
          <p className="txt-regular text-zinc-400 max-w-xl mx-auto">
            {locale === "ar"
              ? "لا ترقيات تلقائية. كل مستوى يُكتسب بالثبات والوصول وموافقة الفريق."
              : "No automatic upgrades. Every level is earned through consistency, reach, and team approval."}
          </p>
        </div>
      </div>

      {/* Rank sections */}
      <div className="max-w-5xl mx-auto px-6 py-20 space-y-12">
        {RANK_DETAILS.map((rank) => (
          <motion.section
            key={rank.id}
            id={rank.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl overflow-hidden border border-zinc-800 bg-[#0a0a0a] relative"
          >
            {/* Top color bar */}
            <div className="h-1 w-full" style={{ background: rank.color }} />

            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none opacity-5"
              style={{ background: `radial-gradient(ellipse 80% 60% at 20% 50%, ${rank.color}, transparent)` }} />

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left — info */}
              <div className="p-8 relative z-10">
                <span
                  className="txt-smaller font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm mb-4 inline-block"
                  style={{ color: rank.color, background: `${rank.color}15` }}
                >
                  {locale === "ar" ? rank.reachAr : rank.reachEn}
                </span>

                <h2
                  className="font-display font-black uppercase leading-none mb-1 text-3xl md:text-4xl"
                  style={{ color: rank.color }}
                >
                  {locale === "ar" ? rank.nameAr : rank.nameEn}
                </h2>
                <p className="txt-smaller uppercase tracking-widest text-zinc-500 mb-4">
                  {locale === "ar" ? rank.tagAr : rank.tagEn}
                </p>

                <p className="txt-small text-zinc-400 leading-relaxed mb-4">
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
              <div className="p-8 border-s border-zinc-800 relative z-10">
                {/* Can image only on Cold — the premium rank */}
                {rank.id === "cold" && (
                  <div className="relative w-32 h-32 mb-6 mx-auto">
                    <Image
                      src="/assets/program/ranks-can.png"
                      alt="Cold Monster rank"
                      fill
                      className="object-contain drop-shadow-lg"
                    />
                  </div>
                )}

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

                {/* Grand prize callout for Cold */}
                {rank.id === "cold" && (
                  <div className="mt-6 p-4 rounded-xl border border-[#38bdf8]/30 bg-[#38bdf8]/5">
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
      </div>

      {/* Bottom CTA */}
      <div className="max-w-5xl mx-auto px-6 pb-24 text-center">
        <div className="border-t border-zinc-800 pt-16">
          <p className="font-display font-black text-white uppercase text-3xl mb-6">
            {locale === "ar" ? "مستعد للبدء؟" : "READY TO START?"}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={`/${locale}/submissions/register`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#78be20] hover:bg-[#8fd428]
                text-black font-display font-bold uppercase tracking-wider txt-small rounded-sm
                transition-all duration-200 hover:shadow-[0_0_24px_rgba(120,190,32,0.4)] group">
              {locale === "ar" ? "سجّل الآن" : "Register Now"}
              <Arrow className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href={`/${locale}/leaderboard`}
              className="inline-flex items-center gap-2 px-8 py-4 border border-zinc-700
                hover:border-zinc-400 text-zinc-300 hover:text-white font-display font-bold
                uppercase tracking-wider txt-small rounded-sm transition-colors duration-200">
              {locale === "ar" ? "لوحة الصدارة" : "Leaderboard"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}