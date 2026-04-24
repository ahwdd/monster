// src/app/[locale]/ranks/page.tsx
"use client";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";
import { IoCheckmarkCircle } from "react-icons/io5";
import PageTitle from "@/components/ui/PageTitle";
import { RANK_DETAILS } from "@/lib/data/program";
import Header from "@/components/Header";
import FadeInView from "@/components/FadeInView";
import SkewButton from "@/components/ui/SkewBtn";

export default function RanksPage() {
  const locale = useLocale();
  const t = useTranslations("ranks");
  const isAr = locale === "ar";

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <PageTitle title={t("pageTitle")} />

      <div className="max-w-325 mx-auto px-6 py-16">
        <FadeInView className="text-center mb-16">
          <p className="font-proxima txt-regular text-zinc-500 max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </FadeInView>

        <div className="space-y-12">
          {RANK_DETAILS.map((rank, idx) => (
            <motion.section
              key={rank.id}
              id={rank.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.55,
                delay: idx * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative overflow-hidden"
              style={{
                border: "1px solid #272727",
                background: "rgba(0,0,0,0.3)",
              }}>
              {/* Top accent bar */}
              <div
                className="h-0.5 w-full"
                style={{ background: rank.color }}
              />

              {/* Corner glow */}
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
                    className="txt-smaller font-bold uppercase tracking-wider px-2.5 py-1 mb-5 inline-block"
                    style={{
                      color: rank.color,
                      background: `${rank.color}18`,
                      border: `1px solid ${rank.color}40`,
                    }}>
                    {isAr ? rank.reachAr : rank.reachEn}
                  </span>

                  {/* Rank name */}
                  <h2
                    className="font-display font-black uppercase leading-none mb-2"
                    style={{
                      fontSize: "clamp(1.8rem, 3vw, 3rem)",
                      color: rank.color,
                    }}>
                    {isAr ? rank.nameAr : rank.nameEn}
                  </h2>

                  <p className="txt-smaller uppercase tracking-widest text-zinc-500 mb-4">
                    {isAr ? rank.tagAr : rank.tagEn}
                  </p>

                  <p className="font-proxima txt-regular text-zinc-400 leading-relaxed mb-4">
                    {isAr ? rank.descAr : rank.descEn}
                  </p>

                  <p className="txt-smaller text-zinc-600 italic mb-5">
                    📅 {isAr ? rank.monthsAr : rank.monthsEn}
                  </p>

                  <p className="txt-smaller font-semibold uppercase tracking-wider text-zinc-500 mb-3">
                    {t("requirements")}
                  </p>
                  <ul className="space-y-2">
                    {(isAr ? rank.requirementsAr : rank.requirementsEn).map(
                      (r) => (
                        <li
                          key={r}
                          className="flex items-center gap-2 txt-small text-zinc-300">
                          <span style={{ color: rank.color }}>→</span> {r}
                        </li>
                      ),
                    )}
                  </ul>
                </div>

                {/* Right — rewards */}
                <div className="p-8 border-s border-[#272727] relative z-10">
                  <p className="txt-smaller font-semibold uppercase tracking-wider text-zinc-500 mb-4">
                    {t("rewards")}
                  </p>
                  <ul className="space-y-3">
                    {(isAr ? rank.rewardsAr : rank.rewardsEn).map((r) => (
                      <li
                        key={r}
                        className="flex items-start gap-2.5 txt-small text-zinc-300">
                        <IoCheckmarkCircle
                          className="size-4 shrink-0 mt-0.5"
                          style={{ color: rank.color }}
                        />
                        {r}
                      </li>
                    ))}
                  </ul>

                  {rank.id === "cold" && (
                    <div
                      className="mt-6 p-4"
                      style={{
                        border: "1px solid rgba(56,189,248,0.3)",
                        background: "rgba(56,189,248,0.05)",
                      }}>
                      <p className="txt-smaller font-bold text-[#38bdf8] uppercase tracking-wide mb-1">
                        🏆 {t("grandPrize")}
                      </p>
                      <p className="txt-smaller text-zinc-400">
                        {t("grandPrizeDesc")}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.section>
          ))}
        </div>

        {/* CTA */}
        <FadeInView
          delay={0.1}
          className="text-center pt-16 border-t border-[#171717] mt-16">
          <p
            className="font-display font-black text-white uppercase mb-6"
            style={{ fontSize: "clamp(1.8rem, 3vw, 3rem)" }}>
            {t("readyTitle")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <SkewButton
              href={`/${locale}/submissions/register`}
              variant="primary">
              {t("registerCta")}
            </SkewButton>
            <SkewButton href={`/${locale}/leaderboard`} variant="default">
              {t("leaderboardCta")}
            </SkewButton>
          </div>
        </FadeInView>
      </div>
    </div>
  );
}
