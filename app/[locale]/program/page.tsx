// src/app/[locale]/program/page.tsx
"use client";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useRef } from "react";
import { motion } from "framer-motion";
import {
  IoCheckmarkCircle,
  IoChevronBack,
  IoChevronForward,
  IoGiftOutline,
  IoGameControllerOutline,
  IoRibbonOutline,
  IoFlashOutline,
  IoSparklesOutline,
  IoDocumentTextOutline,
  IoPeopleOutline,
  IoStarOutline,
  IoCalendarOutline,
  IoTrophyOutline,
  IoBarChartOutline,
  IoShieldCheckmarkOutline,
  IoArrowUpOutline,
  IoArrowDownOutline,
  IoRemoveOutline,
} from "react-icons/io5";
import Header from "@/components/Header";
import PageTitle from "@/components/ui/PageTitle";
import SkewBtn from "@/components/ui/SkewBtn";
import KpiTable from "@/components/program/KpiTable";
import ScoringSystem from "@/components/program/ScoringSystem";
import {
  RANK_DETAILS,
  REWARD_PACKS,
  PROGRAM_TIMELINE,
  CONTENT_APPROVAL_TYPES,
  CONTENT_APPROVAL_NOTE,
  SELECTION_PHASES,
  TRACKING_RULES,
  TERMS,
  PROGRAM_STATS,
  PROGRESSION_RULES,
} from "@/lib/data/program";

function GlassCard({
  children,
  className = "",
  accent,
  textureOverlay = false,
}: {
  children: React.ReactNode;
  className?: string;
  accent?: string;
  textureOverlay?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        border: "solid 1px #707070",
        background: "rgba(0,0,0,.2)",
        backdropFilter: "blur(8px)",
      }}>
      {textureOverlay && (
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: "url('/assets/textures/texture.webp')",
            backgroundSize: "cover",
          }}
        />
      )}
      {accent && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top right, rgba(0,0,0,0.3) 0%, transparent 60%)",
          }}
        />
      )}
      {accent && (
        <div
          className="absolute top-0 inset-x-0 h-px"
          style={{ background: accent }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function SectionTag({
  en,
  ar,
  locale,
}: {
  en: string;
  ar: string;
  locale: string;
}) {
  return (
    <p className="txt-huge font-medium uppercase tracking-[3px] text-[#6bd41a] mb-3">
      {locale === "ar" ? ar : en}
    </p>
  );
}

const CONTENT_ICONS = [
  IoGameControllerOutline,
  IoRibbonOutline,
  IoFlashOutline,
  IoSparklesOutline,
];
const SELECTION_ICONS = [IoDocumentTextOutline, IoPeopleOutline, IoStarOutline];
const TRACKING_ICONS = [
  IoCalendarOutline,
  IoCheckmarkCircle,
  IoBarChartOutline,
  IoShieldCheckmarkOutline,
];

export default function ProgramPage() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const t = useTranslations("program");
  const timelineRef = useRef<HTMLDivElement>(null);

  const scrollTimeline = (dir: "left" | "right") => {
    if (!timelineRef.current) return;
    timelineRef.current.scrollBy({
      left: dir === "left" ? -340 : 340,
      behavior: "smooth",
    });
  };

  const mainRanks = RANK_DETAILS.filter((r) => r.id !== "unranked");

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <PageTitle title={isAr ? "البرنامج" : "The Program"} />

      <div
        style={{ width: "100%", maxWidth: "1300px", margin: "60px auto 80px" }}>
        <div className="px-4 sm:px-6 space-y-0">
          {/* ── Overview ── */}
          <section className="py-12 md:py-16 border-b border-[#171717]">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex-1">
                <SectionTag
                  en="Program Overview"
                  ar="نظرة عامة"
                  locale={locale}
                />
                <h2
                  className="font-display font-black text-white uppercase leading-none mb-6"
                  style={{ fontSize: "clamp(2rem,4vw,3.5rem)" }}>
                  {isAr ? "برنامج مونستر للسفراء" : "MONSTER AMBASSADORS"}
                </h2>
                <p className="font-proxima text-[#b6b6b6] txt-larger leading-relaxed mb-4">
                  {isAr
                    ? "برنامج تطوير لمدة 9 أشهر يهدف إلى تموضع مونستر إنرجي كعلامة رائدة بين صناع محتوى الألعاب في منطقة MENA. كل ربع سنة، ينضم صناع محتوى جدد حتى يصل إجمالي سفراء مونستر إلى 45."
                    : "A 9-month development program positioning Monster Energy as the leading brand among gaming creators across MENA. Each quarter, new creators join until reaching 45 total Monster Ambassadors."}
                </p>
                {/* Stats strip */}
                <div className="flex flex-wrap gap-4 mt-6">
                  {PROGRAM_STATS.map((stat) => (
                    <div key={stat.labelEn} className="text-center">
                      <p className="font-display font-black text-[#78be20] text-2xl">
                        {isAr ? stat.valAr : stat.valEn}
                      </p>
                      <p className="txt-smaller text-zinc-500">
                        {isAr ? stat.labelAr : stat.labelEn}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <SkewBtn
                    href={`/${locale}/submissions/register`}
                    text={isAr ? "سجّل الآن" : "REGISTER NOW"}
                  />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative shrink-0"
                style={{ width: "200px", height: "260px" }}>
                <div
                  className="absolute inset-0 opacity-30 blur-3xl"
                  style={{
                    background:
                      "radial-gradient(ellipse, #78be20, transparent)",
                  }}
                />
                <Image
                  src="/assets/program/ranks-can.png"
                  alt="Monster Ranks"
                  fill
                  className="object-contain drop-shadow-2xl relative z-10"
                />
              </motion.div>
            </div>
          </section>

          {/* ── Rank cards ── */}
          <section className="py-12 md:py-16 border-b border-[#171717]">
            <SectionTag
              en="Leveling System"
              ar="نظام التصنيف"
              locale={locale}
            />
            <h2
              className="font-display font-black text-white uppercase leading-none mb-8"
              style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
              {isAr ? "ارتقِ عبر التصنيفات" : "RISE THROUGH THE RANKS"}
            </h2>
            <div className="flex flex-col md:flex-row gap-5">
              {mainRanks.map((rank, i) => (
                <motion.div
                  key={rank.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="flex-1">
                  <GlassCard
                    accent={rank.color}
                    textureOverlay
                    className="h-full">
                    <div
                      className="absolute top-0 inset-e-0 opacity-[0.04] pointer-events-none select-none
                      font-display font-black leading-none text-white"
                      style={{ fontSize: "8rem", lineHeight: 1 }}>
                      {i + 1}
                    </div>
                    <div className="p-6">
                      <span
                        className="txt-smaller font-bold uppercase tracking-wider px-2 py-1 mb-4 inline-block"
                        style={{
                          color: rank.color,
                          background: `${rank.color}18`,
                          border: `1px solid ${rank.color}40`,
                        }}>
                        {isAr ? rank.reachAr : rank.reachEn}
                      </span>
                      <h3
                        className="font-display font-black text-2xl uppercase leading-none mb-2"
                        style={{ color: rank.color }}>
                        {isAr ? rank.nameAr : rank.nameEn}
                      </h3>
                      <p className="font-proxima txt-larger text-[#b6b6b6] leading-relaxed mb-4">
                        {isAr ? rank.descAr : rank.descEn}
                      </p>
                      <ul className="space-y-1">
                        {(isAr ? rank.requirementsAr : rank.requirementsEn).map(
                          (r) => (
                            <li
                              key={r}
                              className="flex items-center gap-2 txt-small text-zinc-400">
                              <span style={{ color: rank.color }}>→</span>
                              {r}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ── KPI Table ── */}
          <section className="py-12 md:py-16 border-b border-[#171717]">
            <SectionTag
              en="KPI Requirements"
              ar="متطلبات KPI"
              locale={locale}
            />
            <h2
              className="font-display font-black text-white uppercase leading-none mb-8"
              style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
              {t("kpiTableTitle")}
            </h2>
            <GlassCard>
              <KpiTable />
            </GlassCard>
            {/* Content approval note */}
            <p className="txt-smaller text-zinc-500 mt-4 italic">
              * {isAr ? CONTENT_APPROVAL_NOTE.ar : CONTENT_APPROVAL_NOTE.en}
            </p>
          </section>

          {/* ── Scoring system ── */}
          <section className="py-12 md:py-16 border-b border-[#171717]">
            <SectionTag en="Scoring System" ar="نظام النقاط" locale={locale} />
            <h2
              className="font-display font-black text-white uppercase leading-none mb-8"
              style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
              {t("scoringTitle")}
            </h2>
            <ScoringSystem />
          </section>

          {/* ── Level progression rules ── */}
          <section className="py-12 md:py-16 border-b border-[#171717] relative overflow-hidden">
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.04]"
              style={{
                backgroundImage: "url('/assets/textures/texture.webp')",
                backgroundSize: "cover",
                backgroundAttachment: "fixed",
              }}
            />
            <div className="relative z-10">
              <SectionTag
                en="Progression Rules"
                ar="قواعد الترقية"
                locale={locale}
              />
              <h2
                className="font-display font-black text-white uppercase leading-none mb-8"
                style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
                {t("progressionTitle")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {[
                  {
                    icon: IoArrowUpOutline,
                    color: "#78be20",
                    labelKey: "levelUp",
                    textKey: isAr
                      ? PROGRESSION_RULES.levelUpAr
                      : PROGRESSION_RULES.levelUpEn,
                  },
                  {
                    icon: IoRemoveOutline,
                    color: "#facc15",
                    labelKey: "levelStay",
                    textKey: isAr
                      ? PROGRESSION_RULES.stayAr
                      : PROGRESSION_RULES.stayEn,
                  },
                  {
                    icon: IoArrowDownOutline,
                    color: "#ef4444",
                    labelKey: "levelDown",
                    textKey: isAr
                      ? PROGRESSION_RULES.levelDownAr
                      : PROGRESSION_RULES.levelDownEn,
                  },
                ].map(({ icon: Icon, color, labelKey, textKey }) => (
                  <GlassCard key={labelKey} accent={color}>
                    <div className="p-6">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                        style={{
                          background: `${color}18`,
                          border: `1px solid ${color}40`,
                        }}>
                        <Icon className="size-5" style={{ color }} />
                      </div>
                      <p
                        className="font-display font-bold uppercase txt-larger mb-2"
                        style={{ color }}>
                        {t(labelKey as any)}
                      </p>
                      <p className="font-proxima txt-small text-zinc-400 leading-relaxed">
                        {textKey}
                      </p>
                    </div>
                  </GlassCard>
                ))}
              </div>
              <p className="txt-smaller text-zinc-500 mt-4 italic">
                *{" "}
                {isAr
                  ? PROGRESSION_RULES.resetNoteAr
                  : PROGRESSION_RULES.resetNoteEn}
              </p>
            </div>
          </section>

          {/* ── Selection process ── */}
          <section className="py-12 md:py-16 border-b border-[#171717]">
            <SectionTag
              en="Selection Process"
              ar="عملية الاختيار"
              locale={locale}
            />
            <h2
              className="font-display font-black text-white uppercase leading-none mb-8"
              style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
              {isAr ? "كيف يتم الاختيار" : "HOW SELECTION WORKS"}
            </h2>
            <div className="flex flex-col md:flex-row gap-5">
              {SELECTION_PHASES.map((p, i) => {
                const Icon = SELECTION_ICONS[i] ?? IoDocumentTextOutline;
                return (
                  <motion.div
                    key={p.phase}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex-1">
                    <GlassCard accent="#78be20" className="h-full">
                      <div className="p-6">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                          style={{
                            background: "rgba(120,190,32,0.15)",
                            border: "1px solid rgba(120,190,32,0.3)",
                          }}>
                          <Icon className="size-6 text-[#78be20]" />
                        </div>
                        <span className="txt-huge font-medium uppercase tracking-[2px] text-[#6bd41a] mb-2 block">
                          {p.phase}
                        </span>
                        <h3 className="font-display font-bold text-white uppercase txt-larger mb-3">
                          {isAr ? p.titleAr : p.titleEn}
                        </h3>
                        <p className="font-proxima txt-larger text-[#b6b6b6] leading-relaxed">
                          {isAr ? p.descAr : p.descEn}
                        </p>
                      </div>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* ── Content approval ── */}
          <section className="py-12 md:py-16 border-b border-[#171717]">
            <SectionTag
              en="Content Approval"
              ar="اعتماد المحتوى"
              locale={locale}
            />
            <h2
              className="font-display font-black text-white uppercase leading-none mb-8"
              style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
              {isAr ? "محتوى مونستر" : "MONSTER CONTENT"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {CONTENT_APPROVAL_TYPES.map((ct, i) => {
                const Icon = CONTENT_ICONS[i] ?? IoFlashOutline;
                return (
                  <motion.div
                    key={ct.en}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}>
                    <GlassCard
                      accent="#78be20"
                      textureOverlay
                      className="h-full">
                      <div className="p-5 flex gap-4 items-start">
                        <div className="relative shrink-0">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center"
                            style={{
                              background: "rgba(120,190,32,0.12)",
                              border: "1px solid rgba(120,190,32,0.3)",
                            }}>
                            <Icon className="size-6 text-[#78be20]" />
                          </div>
                        </div>
                        <div>
                          <p className="font-display font-bold text-white uppercase txt-larger mb-1">
                            {isAr ? ct.ar : ct.en}
                          </p>
                          <p className="font-proxima txt-larger text-[#b6b6b6] leading-relaxed">
                            {isAr ? ct.descAr : ct.descEn}
                          </p>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </div>
            <p className="txt-smaller text-zinc-500 mt-4 italic">
              * {isAr ? CONTENT_APPROVAL_NOTE.ar : CONTENT_APPROVAL_NOTE.en}
            </p>
          </section>

          {/* ── Rewards ── */}
          <section className="py-12 md:py-16 border-b border-[#171717]">
            <SectionTag en="Rewards" ar="المكافآت" locale={locale} />
            <h2
              className="font-display font-black text-white uppercase leading-none mb-8"
              style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
              {isAr ? "ما تربحه" : "WHAT YOU EARN"}
            </h2>
            <div className="flex flex-col md:flex-row gap-5 mb-5">
              {REWARD_PACKS.map((rw, i) => (
                <motion.div
                  key={rw.titleEn}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex-1">
                  <GlassCard
                    accent={rw.color}
                    textureOverlay
                    className="h-full">
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-5">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center"
                          style={{
                            background: `${rw.color}18`,
                            border: `1px solid ${rw.color}40`,
                          }}>
                          <IoGiftOutline
                            className="size-4"
                            style={{ color: rw.color }}
                          />
                        </div>
                        <h3 className="font-display font-bold text-white uppercase txt-larger">
                          {isAr ? rw.titleAr : rw.titleEn}
                        </h3>
                      </div>
                      <ul className="space-y-2">
                        {(isAr ? rw.itemsAr : rw.itemsEn).map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-2 txt-larger text-zinc-400">
                            <IoCheckmarkCircle
                              className="size-4 shrink-0"
                              style={{ color: rw.color }}
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
            {/* Grand prize note */}
            <GlassCard accent="#38bdf8" textureOverlay>
              <div className="p-6 flex items-start gap-4">
                <IoTrophyOutline className="size-8 text-[#38bdf8] shrink-0 mt-1" />
                <div>
                  <p className="txt-huge font-medium uppercase tracking-[3px] text-[#38bdf8] mb-1">
                    {isAr ? "الجائزة الكبرى" : "GRAND PRIZE"}
                  </p>
                  <p className="font-proxima txt-larger text-[#b6b6b6]">
                    {isAr
                      ? "أفضل 2 Cold Monsters بعد الربع الثاني يحصلون على رحلة لحدث ألعاب عالمي."
                      : "Top 2 Cold Monsters after their 2nd quarter earn a trip to a global gaming event."}
                  </p>
                </div>
              </div>
            </GlassCard>
          </section>

          {/* ── Timeline ── */}
          <section className="py-12 md:py-16 border-b border-[#171717] relative overflow-hidden">
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.04]"
              style={{
                backgroundImage: "url('/assets/textures/texture.webp')",
                backgroundSize: "cover",
                backgroundAttachment: "fixed",
              }}
            />
            <div className="relative z-10">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <SectionTag
                    en="Program Timeline"
                    ar="الجدول الزمني"
                    locale={locale}
                  />
                  <h2
                    className="font-display font-black text-white uppercase leading-none"
                    style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
                    {isAr ? "خريطة الطريق" : "THE ROAD MAP"}
                  </h2>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => scrollTimeline("left")}
                    className="w-10 h-10 flex items-center justify-center text-white"
                    style={{
                      border: "1px solid #707070",
                      background: "rgba(0,0,0,0.2)",
                    }}>
                    <IoChevronBack className="size-5" />
                  </button>
                  <button
                    onClick={() => scrollTimeline("right")}
                    className="w-10 h-10 flex items-center justify-center text-white"
                    style={{
                      border: "1px solid #707070",
                      background: "rgba(0,0,0,0.2)",
                    }}>
                    <IoChevronForward className="size-5" />
                  </button>
                </div>
              </div>
              <div
                ref={timelineRef}
                className="overflow-x-auto pb-6"
                style={{ scrollbarWidth: "none" }}>
                <div className="relative flex items-start min-w-max gap-0 px-2">
                  <div
                    className="absolute top-[2.2rem] left-[3rem] right-[3rem] h-px"
                    style={{
                      background: "linear-gradient(90deg, #78be20, #38bdf8)",
                    }}
                  />
                  {PROGRAM_TIMELINE.map((item, i) => (
                    <motion.div
                      key={item.month}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      className="flex flex-col items-center shrink-0 px-3"
                      style={{ width: "200px" }}>
                      <div
                        className="relative z-10 w-[68px] h-[68px] flex items-center justify-center mb-4"
                        style={{
                          border: "solid 2px #707070",
                          background: "rgba(0,0,0,0.6)",
                          boxShadow: "0 0 20px rgba(120,190,32,0.15)",
                        }}>
                        <span className="font-display font-black text-[#78be20] txt-larger tracking-wider">
                          {item.month}
                        </span>
                      </div>
                      <GlassCard accent="#78be20" className="w-full">
                        <div className="p-3 text-center">
                          <p className="font-display font-bold text-white uppercase txt-small leading-tight mb-1">
                            {isAr ? item.titleAr : item.titleEn}
                          </p>
                          <p className="font-proxima txt-smaller text-zinc-500 leading-snug">
                            {isAr ? item.descAr : item.descEn}
                          </p>
                        </div>
                      </GlassCard>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── Tracking & Validation ── */}
          <section className="py-12 md:py-16 border-b border-[#171717]">
            <SectionTag
              en="Tracking & Validation"
              ar="المتابعة والتحقق"
              locale={locale}
            />
            <h2
              className="font-display font-black text-white uppercase leading-none mb-8"
              style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
              {isAr ? "كيف يُتتبَّع أداؤك" : "HOW YOU'RE TRACKED"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TRACKING_RULES.map((item, i) => {
                const Icon = TRACKING_ICONS[i] ?? IoCheckmarkCircle;
                return (
                  <motion.div
                    key={item.en}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}>
                    <GlassCard accent="#78be20">
                      <div className="p-5 flex items-start gap-4">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                          style={{
                            background: "rgba(120,190,32,0.12)",
                            border: "1px solid rgba(120,190,32,0.3)",
                          }}>
                          <Icon className="size-5 text-[#78be20]" />
                        </div>
                        <span className="font-proxima txt-larger text-zinc-300 leading-relaxed">
                          {isAr ? item.ar : item.en}
                        </span>
                      </div>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* ── Terms ── */}
          <section className="py-12 md:py-16">
            <SectionTag
              en="Terms & Conditions"
              ar="الشروط والأحكام"
              locale={locale}
            />
            <GlassCard textureOverlay>
              <div className="p-6 sm:p-8">
                <ul className="space-y-3">
                  {TERMS.map((item, i) => (
                    <motion.li
                      key={item.en}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04 }}
                      className="flex items-start gap-3 font-proxima txt-larger text-zinc-400">
                      <IoCheckmarkCircle className="size-4 text-[#78be20] shrink-0 mt-0.5" />
                      {isAr ? item.ar : item.en}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </GlassCard>
          </section>
        </div>

        {/* Final CTA */}
        <div className="text-center py-12 md:py-16 border-t border-[#171717] px-4">
          <p
            className="font-display font-black text-white uppercase leading-none mb-6"
            style={{ fontSize: "clamp(2rem,5vw,4rem)" }}>
            {isAr ? "مستعد؟" : "READY?"}
          </p>
          <p className="font-proxima txt-larger text-zinc-500 mb-8">
            {isAr
              ? "لا مكافآت مضمونة — كل شيء يُكتسَب."
              : "No guaranteed rewards — everything is earned."}
          </p>
          <SkewBtn
            href={`/${locale}/submissions/register`}
            text={isAr ? "سجّل الآن" : "REGISTER NOW"}
          />
        </div>
      </div>
    </div>
  );
}
