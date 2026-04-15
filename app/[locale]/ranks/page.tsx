// src/app/[locale]/ranks/page.tsx
"use client";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { IoCheckmarkCircle } from "react-icons/io5";
import PageTitle from "@/components/ui/PageTitle";
import SkewBtn from "@/components/ui/SkewBtn";
import { RANK_DETAILS } from "@/lib/data/program";
import Header from "@/components/Header";

export default function RanksPage() {
  const locale = useLocale();
  const t = useTranslations("ranks"); // ranks.* namespace
  const tn = useTranslations("nav"); // nav.* for CTA buttons
  const isAr = locale === "ar";

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <PageTitle title={t("pageTitle")} />

      <div
        style={{
          width: "100%",
          maxWidth: "1300px",
          margin: "60px auto 80px",
          borderBottom: "1px solid #171717",
        }}>
        <div className="px-6 space-y-12 pb-20">
          {/* Subtitle */}
          <p className="font-proxima txt-regular text-zinc-500 text-center max-w-xl mx-auto">
            {t("subtitle")}
          </p>

          {RANK_DETAILS.map((rank) => (
            <motion.section
              key={rank.id}
              id={rank.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden"
              style={{
                border: "solid 1px #707070",
                background: "rgba(0,0,0,.2)",
              }}>
              {/* Top color bar */}
              <div
                className="h-0.5 w-full"
                style={{ background: rank.color }}
              />

              {/* Icon gradient top-right */}
              <div
                className="absolute top-0 end-0 w-48 h-48 pointer-events-none"
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
                    style={{
                      color: rank.color,
                      background: `${rank.color}18`,
                      border: `1px solid ${rank.color}40`,
                    }}>
                    {isAr ? rank.reachAr : rank.reachEn}
                  </span>

                  {/* Rank name + optional can image */}
                  <div className="flex items-start gap-4 mb-4">
                    {rank.id === "cold" && (
                      <div
                        className="relative shrink-0"
                        style={{ width: "80px", height: "100px" }}>
                        <Image
                          src="/assets/program/ranks-can.png"
                          alt="Cold rank"
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <div>
                      <h2
                        className="font-display font-black uppercase leading-none mb-1 text-3xl md:text-4xl"
                        style={{ color: rank.color }}>
                        {isAr ? rank.nameAr : rank.nameEn}
                      </h2>
                      <p className="txt-smaller uppercase tracking-widest text-zinc-500 mb-4">
                        {isAr ? rank.tagAr : rank.tagEn}
                      </p>
                    </div>
                  </div>

                  <p className="font-proxima txt-regular text-zinc-400 leading-relaxed mb-4">
                    {isAr ? rank.descAr : rank.descEn}
                  </p>

                  <p className="txt-smaller text-zinc-600 italic mb-5">
                    📅 {isAr ? rank.monthsAr : rank.monthsEn}
                  </p>

                  <p className="txt-smaller font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                    {t("requirements")}
                  </p>
                  <ul className="space-y-1.5">
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
                <div className="p-8 border-s border-[#707070] relative z-10">
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

          {/* CTA */}
          <div className="text-center pt-8 border-t border-[#171717]">
            <p className="font-display font-black text-white uppercase text-3xl mb-6">
              {t("readyTitle")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <SkewBtn
                href={`/${locale}/submissions/register`}
                text={t("registerCta")}
              />
              <SkewBtn
                href={`/${locale}/leaderboard`}
                text={t("leaderboardCta")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
