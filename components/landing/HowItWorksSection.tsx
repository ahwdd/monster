// src/components/landing/HowItWorksSection.tsx
"use client";
import { useLocale } from "next-intl";
import { motion }    from "framer-motion";
import SkewBtn       from "@/components/ui/SkewBtn";
import {
  HOW_IT_WORKS_STEPS, PROGRAM_REQUIREMENTS, REMOVAL_REASONS,
} from "@/lib/data/program";
import {
  IoDocumentTextOutline, IoCheckmarkCircleOutline, IoTrophyOutline,
  IoHeartOutline, IoShieldCheckmarkOutline, IoVideocamOutline, IoCloseCircleOutline,
} from "react-icons/io5";

const STEP_ICONS = {
  document:  IoDocumentTextOutline,
  checkmark: IoCheckmarkCircleOutline,
  trophy:    IoTrophyOutline,
} as const;

const REQ_ICONS = {
  heart:  IoHeartOutline,
  shield: IoShieldCheckmarkOutline,
  video:  IoVideocamOutline,
} as const;

const REQ_TEXTURES = ["bg-monster-texture","bg-ultra-texture","bg-juice-texture","bg-rehab-texture"];

export default function HowItWorksSection() {
  const locale = useLocale();

  return (
    <section className="how-it-works-bg relative w-full overflow-hidden">
      <div className="absolute inset-0 bg-black/75 pointer-events-none z-0" />

      <div className="container relative z-10 mt-15 md:mt-30 mb-15 md:mb-20
        border border-t-0 border-[rgba(204,204,204,0.4)] max-2xl:mx-auto max-2xl:max-w-[95%]">

        {/* ── 3-col header ── */}
        <div className="flex">
          <div className="w-1/3 shrink-0 -mt-5 py-5 border-e border-[rgba(204,204,204,0.4)]">
            <div className="border-t border-[rgba(204,204,204,0.4)]" />
          </div>
          <div className="w-1/3 shrink-0 flex items-start justify-center px-2.5 -mb-20 md:-mb-25">
            <h2 className="font-display font-semibold text-white uppercase text-center w-full inline-block 2xl:px-2.5
              -mt-16.25 2xl:leading-6.25 leading-8 max-2xl:-mt-8"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
              {locale === "ar" ? "كيف تنضم" : "HOW IT WORKS"}
            </h2>
          </div>
          <div className="w-1/3 shrink-0 -mt-5 py-5 border-s border-[rgba(204,204,204,0.4)]">
            <div className="border-t border-[rgba(204,204,204,0.4)]" />
          </div>
        </div>

        {/* ── Timeline — horizontal scroll ── */}
        <div className="relative px-4 md:px-8 pt-16 md:pt-20 pb-8 md:pb-10">
          {/* Connector line — only visible on md+ */}
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="hidden md:block absolute top-22 h-px bg-[#78be20]/40 origin-left"
            style={{ left: "calc(16.66% + 2rem)", right: "calc(16.66% + 2rem)" }} />

          <div className="flex flex-col md:flex-row items-start gap-8 md:gap-4 justify-between">
            {HOW_IT_WORKS_STEPS.map((step, i) => {
              const Icon = STEP_ICONS[step.icon];
              return (
                <motion.div key={step.numEn}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 + i * 0.18 }}
                  className="flex-1 flex flex-col md:items-center md:text-center gap-3 md:gap-0">
                  {/* Circle node */}
                  <div className="relative shrink-0 mb-0 md:mb-6">
                    <div className="w-16 h-16 rounded-full bg-[#0d0d0d] border-2 border-[#78be20]/40
                      flex items-center justify-center relative z-10
                      shadow-[0_0_20px_rgba(120,190,32,0.2)]">
                      <Icon className="size-7 text-[#78be20]" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#78be20]
                      flex items-center justify-center font-display font-black text-black text-xs z-20">
                      {step.numEn}
                    </span>
                  </div>
                  <div>
                    <p className="txt-huge font-medium uppercase tracking-[2px] text-[#6bd41a] mb-2">
                      {locale === "ar" ? step.titleAr : step.titleEn}
                    </p>
                    <p className="txt-larger text-[#b6b6b6] leading-relaxed">
                      {locale === "ar" ? step.descAr : step.descEn}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Requirement boxes — 1 col mobile, 2 col sm, 4 col md ── */}
        <div className="border-t border-[rgba(204,204,204,0.2)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            {PROGRAM_REQUIREMENTS.map((rule, i) => {
              const Icon = REQ_ICONS[rule.icon];
              return (
                <motion.div key={rule.titleEn}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative overflow-hidden flavor ${REQ_TEXTURES[i]}
                    border-e border-b border-[rgba(204,204,204,0.15)] last:border-e-0`}>
                  <div className="absolute inset-0 bg-black/70" />
                  <div className="relative z-10 px-6 py-8">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                      style={{ background: `${rule.color}20` }}>
                      <Icon className="size-6" style={{ color: rule.color }} />
                    </div>
                    <p className="txt-huge font-medium uppercase tracking-[2px] mb-3" style={{ color: rule.color }}>
                      {locale === "ar" ? rule.titleAr : rule.titleEn}
                    </p>
                    <p className="txt-larger text-[#b6b6b6] leading-relaxed">
                      {locale === "ar" ? rule.descAr : rule.descEn}
                    </p>
                  </div>
                </motion.div>
              );
            })}

            {/* Removal — 4th box */}
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
              className={`relative overflow-hidden flavor ${REQ_TEXTURES[3]}
                border-b border-[rgba(204,204,204,0.15)] sm:col-span-2 md:col-span-1`}>
              <div className="absolute inset-0 bg-black/75" />
              <div className="relative z-10 px-6 py-8">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-red-500/20">
                  <IoCloseCircleOutline className="size-6 text-red-400" />
                </div>
                <p className="txt-huge font-medium uppercase tracking-[2px] text-red-400 mb-3">
                  {locale === "ar" ? "أسباب الإقصاء" : "REMOVAL"}
                </p>
                <ul className="space-y-2">
                  {REMOVAL_REASONS.map((r) => (
                    <li key={r.en} className="flex items-start gap-2 txt-larger text-[#b6b6b6] leading-snug">
                      <span className="text-red-400 shrink-0 mt-0.5 font-bold">×</span>
                      {locale === "ar" ? r.ar : r.en}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div className="relative z-10 flex flex-wrap justify-center gap-3 md:gap-4 my-7.5 px-4">
        <SkewBtn href={`/${locale}/submissions/register`}
          text={locale === "ar" ? "سجّل الآن" : "REGISTER NOW"} />
        <SkewBtn href={`/${locale}/program`}
          text={locale === "ar" ? "عن البرنامج" : "ABOUT THE PROGRAM"} />
      </div>
    </section>
  );
}