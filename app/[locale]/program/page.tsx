// src/app/[locale]/program/page.tsx
"use client";
import { useLocale } from "next-intl";
import Link          from "next/link";
import Image         from "next/image";
import { useRef }    from "react";
import { motion }    from "framer-motion";
import {
  IoCheckmarkCircle, IoArrowForward, IoArrowBack,
  IoGiftOutline, IoChevronBack, IoChevronForward,
  IoGameControllerOutline, IoRibbonOutline, IoFlashOutline,
  IoShieldCheckmarkOutline, IoHeartOutline, IoVideocamOutline,
  IoDocumentTextOutline, IoStarOutline, IoCalendarOutline,
  IoTrophyOutline, IoSparklesOutline, IoPeopleOutline,
  IoBarChartOutline,
} from "react-icons/io5";
import PageTitle from "@/components/ui/PageTitle";
import SkewBtn   from "@/components/ui/SkewBtn";
import {
  RANK_DETAILS,
  REWARD_PACKS,
  PROGRAM_TIMELINE,
  CONTENT_APPROVAL_TYPES,
  SELECTION_PHASES,
  TRACKING_RULES,
  TERMS,
} from "@/lib/data/program";
import Header from "@/components/Header";

// ── Glassy card with monster border ──────────────────────────
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
      }}
    >
      {/* Optional texture bg */}
      {textureOverlay && (
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: "url('/assets/textures/texture.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}
      {/* Icon gradient: bottom-left → top-right, rgba(0,0,0,0.3) → transparent */}
      {accent && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(to top right, rgba(0,0,0,0.3) 0%, transparent 60%)`,
          }}
        />
      )}
      {/* Top accent bar */}
      {accent && (
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: accent }} />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function SectionTag({ en, ar, locale }: { en: string; ar: string; locale: string }) {
  return (
    <p className="txt-huge font-medium uppercase tracking-[3px] text-[#6bd41a] mb-3">
      {locale === "ar" ? ar : en}
    </p>
  );
}

// ── Content approval icons ────────────────────────────────────
const CONTENT_ICONS = [IoGameControllerOutline, IoRibbonOutline, IoFlashOutline, IoSparklesOutline];
const SELECTION_ICONS = [IoDocumentTextOutline, IoPeopleOutline, IoStarOutline];
const TRACKING_ICONS = [IoCalendarOutline, IoCheckmarkCircle, IoBarChartOutline, IoShieldCheckmarkOutline];

export default function ProgramPage() {
  const locale = useLocale();
  const isRTL  = locale === "ar";
  const Arrow  = isRTL ? IoArrowBack : IoArrowForward;
  const timelineRef = useRef<HTMLDivElement>(null);

  const scrollTimeline = (dir: "left" | "right") => {
    if (!timelineRef.current) return;
    timelineRef.current.scrollBy({ left: dir === "left" ? -340 : 340, behavior: "smooth" });
  };

  const mainRanks = RANK_DETAILS.filter((r) => r.id !== "unranked");

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <PageTitle title={locale === "ar" ? "البرنامج" : "The Program"} />

      <div style={{ width: "100%", maxWidth: "1300px", margin: "60px auto 80px" }}>
        <div className="px-6 space-y-0">

          {/* ── Overview ── */}
          <section className="py-16 border-b border-[#171717]">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex-1">
                <SectionTag en="Program Overview" ar="نظرة عامة" locale={locale} />
                <h2 className="font-display font-black text-white uppercase text-[clamp(2rem,4vw,3.5rem)] leading-none mb-6">
                  {locale === "ar" ? "برنامج مونستر للسفراء" : "MONSTER AMBASSADORS"}
                </h2>
                <p className="font-proxima text-[#b6b6b6] txt-larger leading-relaxed mb-6">
                  {locale === "ar"
                    ? "برنامج تطوير لمدة 9 أشهر مصمم لتموضع مونستر إنرجي كعلامة رائدة بين صناع محتوى الألعاب في منطقة MENA."
                    : "A 9-month development program designed to position Monster Energy as a leading brand among gaming content creators across MENA. Each month, 5 micro-influencers join, forming a squad of 30 creators."}
                </p>
                <SkewBtn href={`/${locale}/submissions/register`}
                  text={locale === "ar" ? "سجّل الآن" : "REGISTER NOW"} />
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
                className="relative shrink-0" style={{ width: "220px", height: "280px" }}>
                <div className="absolute inset-0 opacity-30 blur-3xl"
                  style={{ background: "radial-gradient(ellipse, #78be20, transparent)" }} />
                <Image src="/assets/program/ranks-can.png" alt="Monster Ranks"
                  fill className="object-contain drop-shadow-2xl relative z-10" />
              </motion.div>
            </div>
          </section>

          {/* ── Rank progression — glassy cards ── */}
          <section className="py-16 border-b border-[#171717]">
            <SectionTag en="Leveling System" ar="نظام التصنيف" locale={locale} />
            <h2 className="font-display font-black text-white uppercase text-[clamp(2rem,4vw,3rem)] leading-none mb-10">
              {locale === "ar" ? "ارتقِ عبر التصنيفات" : "RISE THROUGH THE RANKS"}
            </h2>
            <div className="flex flex-col md:flex-row gap-5">
              {mainRanks.map((rank, i) => (
                <motion.div key={rank.id} initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }} className="flex-1">
                  <GlassCard accent={rank.color} textureOverlay className="h-full">
                    {/* Big rank number watermark */}
                    <div className="absolute top-0 inset-e-0 opacity-[0.04] pointer-events-none select-none
                      font-display font-black leading-none text-white"
                      style={{ fontSize: "8rem", lineHeight: 1 }}>
                      {i + 1}
                    </div>
                    <div className="p-7">
                      <span className="txt-smaller font-bold uppercase tracking-wider px-2.5 py-1 mb-4 inline-block"
                        style={{ color: rank.color, background: `${rank.color}18`, border: `1px solid ${rank.color}40` }}>
                        {locale === "ar" ? rank.reachAr : rank.reachEn}
                      </span>
                      <h3 className="font-display font-black text-2xl uppercase leading-none mb-2"
                        style={{ color: rank.color }}>
                        {locale === "ar" ? rank.nameAr : rank.nameEn}
                      </h3>
                      <p className="font-proxima txt-larger text-[#b6b6b6] leading-relaxed mb-5">
                        {locale === "ar" ? rank.descAr : rank.descEn}
                      </p>
                      <ul className="space-y-1.5">
                        {(locale === "ar" ? rank.requirementsAr : rank.requirementsEn).map((r) => (
                          <li key={r} className="flex items-center gap-2 txt-larger text-zinc-400">
                            <span style={{ color: rank.color }}>→</span>{r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ── Selection process — sticky texture bg section ── */}
          <section className="py-16 border-b border-[#171717] relative overflow-hidden">
            {/* Sticky texture background */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage: "url('/assets/textures/texture.webp')",
                backgroundSize: "cover",
                backgroundAttachment: "fixed",
              }} />
            <div className="relative z-10">
              <SectionTag en="Selection Process" ar="عملية الاختيار" locale={locale} />
              <h2 className="font-display font-black text-white uppercase text-[clamp(2rem,4vw,3rem)] leading-none mb-10">
                {locale === "ar" ? "كيف يتم الاختيار" : "HOW SELECTION WORKS"}
              </h2>
              <div className="flex flex-col md:flex-row gap-5">
                {SELECTION_PHASES.map((p, i) => {
                  const Icon = SELECTION_ICONS[i] ?? IoDocumentTextOutline;
                  return (
                    <motion.div key={p.phase} initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }} className="flex-1">
                      <GlassCard accent="#78be20" className="h-full">
                        <div className="p-7">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                            style={{ background: "rgba(120,190,32,0.15)", border: "1px solid rgba(120,190,32,0.3)" }}>
                            <Icon className="size-6 text-[#78be20]" />
                          </div>
                          <span className="txt-huge font-medium uppercase tracking-[2px] text-[#6bd41a] mb-2 block">
                            {p.phase}
                          </span>
                          <h3 className="font-display font-bold text-white uppercase txt-larger mb-3">
                            {locale === "ar" ? p.titleAr : p.titleEn}
                          </h3>
                          <p className="font-proxima txt-larger text-[#b6b6b6] leading-relaxed">
                            {locale === "ar" ? p.descAr : p.descEn}
                          </p>
                        </div>
                      </GlassCard>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ── Content approval — 2x2 glassy grid ── */}
          <section className="py-16 border-b border-[#171717]">
            <SectionTag en="Content Approval" ar="اعتماد المحتوى" locale={locale} />
            <h2 className="font-display font-black text-white uppercase text-[clamp(2rem,4vw,3rem)] leading-none mb-10">
              {locale === "ar" ? "محتوى مونستر" : "MONSTER CONTENT"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {CONTENT_APPROVAL_TYPES.map((ct, i) => {
                const Icon = CONTENT_ICONS[i] ?? IoFlashOutline;
                return (
                  <motion.div key={ct.en} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}>
                    <GlassCard accent="#78be20" textureOverlay className="h-full">
                      <div className="p-6 flex gap-5 items-start">
                        {/* Icon with gradient behind it */}
                        <div className="relative shrink-0">
                          <div className="absolute inset-0 rounded-xl"
                            style={{ background: "linear-gradient(to top right, rgba(0,0,0,0.3) 0%, transparent 70%)" }} />
                          <div className="relative w-14 h-14 rounded-xl flex items-center justify-center"
                            style={{ background: "rgba(120,190,32,0.12)", border: "1px solid rgba(120,190,32,0.3)" }}>
                            <Icon className="size-7 text-[#78be20]" />
                          </div>
                        </div>
                        <div>
                          <p className="font-display font-bold text-white uppercase txt-larger mb-1">
                            {locale === "ar" ? ct.ar : ct.en}
                          </p>
                          <p className="font-proxima txt-larger text-[#b6b6b6] leading-relaxed">
                            {locale === "ar" ? ct.descAr : ct.descEn}
                          </p>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* ── Rewards — glassy packs ── */}
          <section className="py-16 border-b border-[#171717]">
            <SectionTag en="Rewards" ar="المكافآت" locale={locale} />
            <h2 className="font-display font-black text-white uppercase text-[clamp(2rem,4vw,3rem)] leading-none mb-10">
              {locale === "ar" ? "ما تربحه" : "WHAT YOU EARN"}
            </h2>
            <div className="flex flex-col md:flex-row gap-5 mb-5">
              {REWARD_PACKS.map((rw, i) => (
                <motion.div key={rw.titleEn} initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }} className="flex-1">
                  <GlassCard accent={rw.color} textureOverlay className="h-full">
                    <div className="p-7">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ background: `${rw.color}18`, border: `1px solid ${rw.color}40` }}>
                          <IoGiftOutline className="size-5" style={{ color: rw.color }} />
                        </div>
                        <h3 className="font-display font-bold text-white uppercase txt-larger">
                          {locale === "ar" ? rw.titleAr : rw.titleEn}
                        </h3>
                      </div>
                      <ul className="space-y-2.5">
                        {(locale === "ar" ? rw.itemsAr : rw.itemsEn).map((item) => (
                          <li key={item} className="flex items-center gap-2 txt-larger text-zinc-400">
                            <IoCheckmarkCircle className="size-4 shrink-0" style={{ color: rw.color }} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
            {/* Grand prize */}
            <GlassCard accent="#38bdf8" textureOverlay>
              <div className="p-8 text-center relative">
                <div className="absolute inset-0 opacity-5 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse, #38bdf8, transparent)" }} />
                <div className="relative z-10">
                  <IoTrophyOutline className="size-10 text-[#38bdf8] mx-auto mb-3" />
                  <p className="txt-huge font-medium uppercase tracking-[3px] text-[#38bdf8] mb-2">
                    {locale === "ar" ? "الجائزة الكبرى" : "GRAND PRIZE"}
                  </p>
                  <h3 className="font-display font-black text-white uppercase text-[clamp(1.5rem,3vw,2.5rem)] mb-3">
                    {locale === "ar" ? "3M مشاهدة = كريدت PC كامل" : "3M VIEWS = FULL PC CREDIT"}
                  </h3>
                  <p className="font-proxima txt-larger text-[#b6b6b6]">
                    {locale === "ar"
                      ? "بمجرد وصول كولد مونستر إلى 3 ملايين مشاهدة، يحصل على رصيد كامل لجهاز PC من متجر AHW."
                      : "Once a Cold Monster reaches 3M views, they get a full PC worth of credit on the AHW store."}
                  </p>
                </div>
              </div>
            </GlassCard>
          </section>

          {/* ── Timeline — sticky texture bg, horizontal scroll, styled ── */}
          <section className="py-16 border-b border-[#171717] relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
              style={{
                backgroundImage: "url('/assets/textures/texture.webp')",
                backgroundSize: "cover",
                backgroundAttachment: "fixed",
              }} />
            <div className="relative z-10">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <SectionTag en="Program Timeline" ar="الجدول الزمني" locale={locale} />
                  <h2 className="font-display font-black text-white uppercase text-[clamp(2rem,4vw,3rem)] leading-none">
                    {locale === "ar" ? "خريطة الطريق" : "THE ROAD MAP"}
                  </h2>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => scrollTimeline("left")}
                    className="w-10 h-10 flex items-center justify-center text-white transition-colors duration-200"
                    style={{ border: "1px solid #707070", background: "rgba(0,0,0,0.2)" }}>
                    <IoChevronBack className="size-5" />
                  </button>
                  <button onClick={() => scrollTimeline("right")}
                    className="w-10 h-10 flex items-center justify-center text-white transition-colors duration-200"
                    style={{ border: "1px solid #707070", background: "rgba(0,0,0,0.2)" }}>
                    <IoChevronForward className="size-5" />
                  </button>
                </div>
              </div>

              {/* Scrollable timeline track */}
              <div
                ref={timelineRef}
                className="overflow-x-auto pb-6"
                style={{ scrollbarWidth: "none" }}
              >
                <div className="relative flex items-start min-w-max gap-0 px-2">
                  {/* Horizontal connector */}
                  <div className="absolute top-[2.2rem] left-12 right-12 h-px"
                    style={{ background: "linear-gradient(90deg, #78be20, #38bdf8)" }} />

                  {PROGRAM_TIMELINE.map((item, i) => (
                    <motion.div
                      key={item.month}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07 }}
                      className="flex flex-col items-center shrink-0 px-4"
                      style={{ width: "220px" }}
                    >
                      {/* Month node */}
                      <div
                        className="relative z-10 w-18 h-18 flex items-center justify-center mb-5"
                        style={{
                          border: "solid 2px #707070",
                          background: "rgba(0,0,0,0.6)",
                          boxShadow: "0 0 20px rgba(120,190,32,0.15)",
                        }}
                      >
                        <span className="font-display font-black text-[#78be20] txt-larger tracking-wider">
                          {item.month}
                        </span>
                      </div>

                      {/* Info card */}
                      <GlassCard accent="#78be20" className="w-full">
                        <div className="p-4 text-center">
                          <p className="font-display font-bold text-white uppercase txt-small leading-tight mb-2">
                            {locale === "ar" ? item.titleAr : item.titleEn}
                          </p>
                          <p className="font-proxima txt-smaller text-zinc-500 leading-snug">
                            {locale === "ar" ? item.descAr : item.descEn}
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
          <section className="py-16 border-b border-[#171717]">
            <SectionTag en="Tracking & Validation" ar="المتابعة والتحقق" locale={locale} />
            <h2 className="font-display font-black text-white uppercase text-[clamp(2rem,4vw,3rem)] leading-none mb-10">
              {locale === "ar" ? "كيف يُتتبَّع أداؤك" : "HOW YOU'RE TRACKED"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TRACKING_RULES.map((item, i) => {
                const Icon = TRACKING_ICONS[i] ?? IoCheckmarkCircle;
                return (
                  <motion.div key={item.en} initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}>
                    <GlassCard accent="#78be20">
                      <div className="p-5 flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                          style={{ background: "rgba(120,190,32,0.12)", border: "1px solid rgba(120,190,32,0.3)" }}>
                          <Icon className="size-5 text-[#78be20]" />
                        </div>
                        <span className="font-proxima txt-larger text-zinc-300 leading-relaxed">
                          {locale === "ar" ? item.ar : item.en}
                        </span>
                      </div>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* ── Terms ── */}
          <section className="py-16">
            <SectionTag en="Terms & Conditions" ar="الشروط والأحكام" locale={locale} />
            <GlassCard textureOverlay>
              <div className="p-8">
                <ul className="space-y-4">
                  {TERMS.map((item, i) => (
                    <motion.li key={item.en}
                      initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-3 font-proxima txt-larger text-zinc-400">
                      <IoCheckmarkCircle className="size-4 text-[#78be20] shrink-0 mt-0.5" />
                      {locale === "ar" ? item.ar : item.en}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </GlassCard>
          </section>

        </div>

        {/* Final CTA */}
        <div className="text-center py-16 border-t border-[#171717]">
          <p className="font-display font-black text-white uppercase text-[clamp(2rem,5vw,4rem)] mb-6">
            {locale === "ar" ? "مستعد؟" : "READY?"}
          </p>
          <p className="font-proxima txt-larger text-zinc-500 mb-8">
            {locale === "ar" ? "لا مكافآت مضمونة — كل شيء يُكتسب." : "No guaranteed rewards — everything is earned."}
          </p>
          <SkewBtn href={`/${locale}/submissions/register`}
            text={locale === "ar" ? "سجّل الآن" : "REGISTER NOW"} />
        </div>
      </div>
    </div>
  );
}