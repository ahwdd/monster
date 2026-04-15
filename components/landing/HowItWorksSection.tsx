// src/components/landing/HowItWorks.tsx
"use client";
import Link       from "next/link";
import { useLocale } from "next-intl";
import { motion }    from "framer-motion";
import SkewBtn       from "@/components/ui/SkewBtn";
import {
  HOW_IT_WORKS_STEPS,
  PROGRAM_REQUIREMENTS,
  REMOVAL_REASONS,
} from "@/lib/data/program";
import {
  IoDocumentTextOutline,
  IoCheckmarkCircleOutline,
  IoTrophyOutline,
  IoHeartOutline,
  IoShieldCheckmarkOutline,
  IoVideocamOutline,
  IoCloseCircleOutline,
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

// Flavor textures reused for requirement boxes
const REQ_TEXTURES = [
  "bg-monster-texture",
  "bg-ultra-texture",
  "bg-juice-texture",
  "bg-rehab-texture",
];

export default function HowItWorks() {
  const locale = useLocale();

  return (
    <section className="how-it-works-bg relative w-full overflow-hidden">
      <div className="absolute inset-0 bg-black/75 pointer-events-none z-0" />

      <div className="container relative z-10 mt-30 mb-20 border border-t-0 border-[rgba(204,204,204,0.4)]">

        {/* ── 3-column header (same as NewsSection) ── */}
        <div className="flex">
          <div className="w-1/3 shrink-0 -mt-5 py-5 border-e border-[rgba(204,204,204,0.4)]">
            <div className="border-t border-[rgba(204,204,204,0.4)]" />
          </div>
          <div className="w-1/3 shrink-0 flex items-start justify-center px-2.5 -mb-25">
            <h2 className="font-display font-semibold text-white uppercase text-center w-full inline-block px-2.5 -mt-16.25 
            text-[4.5rem] leading-6.25">
              {locale === "ar" ? "كيف تنضم" : "HOW IT WORKS"}
            </h2>
          </div>
          <div className="w-1/3 shrink-0 -mt-5 py-5 border-s border-[rgba(204,204,204,0.4)]">
            <div className="border-t border-[rgba(204,204,204,0.4)]" />
          </div>
        </div>

        {/* ── Horizontal timeline ── */}
        <div className="relative px-8 pt-20 pb-10">
          {/* Connecting line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
            className="absolute top-22 left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-px bg-[#78be20]/40 origin-left"
          />

          <div className="flex items-start justify-between gap-4">
            {HOW_IT_WORKS_STEPS.map((step, i) => {
              const Icon = STEP_ICONS[step.icon];
              return (
                <motion.div
                  key={step.numEn}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.18 }}
                  className="flex-1 flex flex-col items-center text-center"
                >
                  {/* Circle node on the timeline */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-full bg-[#0d0d0d] border-2 border-[#78be20]/40
                      flex items-center justify-center relative z-10
                      shadow-[0_0_20px_rgba(120,190,32,0.2)]">
                      <Icon className="size-7 text-[#78be20]" />
                    </div>
                    {/* Step number badge */}
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#78be20]
                      flex items-center justify-center font-display font-black text-black text-xs z-20">
                      {step.numEn}
                    </span>
                  </div>
                  <p className="txt-huge font-medium uppercase tracking-[2px] text-[#6bd41a] mb-3">
                    {locale === "ar" ? step.titleAr : step.titleEn}
                  </p>
                  <p className="txt-larger text-[#b6b6b6] leading-relaxed max-w-xs mx-auto">
                    {locale === "ar" ? step.descAr : step.descEn}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Requirement boxes (gaming style, texture BG) ── */}
        <div className="border-t border-[rgba(204,204,204,0.2)] px-0">
          <div className="flex flex-col md:flex-row">
            {PROGRAM_REQUIREMENTS.map((rule, i) => {
              const Icon = REQ_ICONS[rule.icon];
              return (
                <motion.div
                  key={rule.titleEn}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative flex-1 border-e border-[rgba(204,204,204,0.15)] last:border-e-0
                    overflow-hidden flavor ${REQ_TEXTURES[i]}`}
                >
                  {/* Dark overlay on texture */}
                  <div className="absolute inset-0 bg-black/70" />
                  <div className="relative z-10 px-8 py-10">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                      style={{ background: `${rule.color}20` }}>
                      <Icon className="size-6" style={{ color: rule.color }} />
                    </div>
                    <p className="txt-huge font-medium uppercase tracking-[2px] mb-3"
                      style={{ color: rule.color }}>
                      {locale === "ar" ? rule.titleAr : rule.titleEn}
                    </p>
                    <p className="txt-larger text-[#b6b6b6] leading-relaxed">
                      {locale === "ar" ? rule.descAr : rule.descEn}
                    </p>
                  </div>
                </motion.div>
              );
            })}

            {/* Removal box — 4th slot with red accent */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className={`relative flex-1 overflow-hidden flavor ${REQ_TEXTURES[3]}`}
            >
              <div className="absolute inset-0 bg-black/75" />
              <div className="relative z-10 px-8 py-10">
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
      <div className="relative z-10 flex flex-wrap justify-center gap-4 my-7.5">
        <SkewBtn href={`/${locale}/submissions/register`}
          text={locale === "ar" ? "سجّل الآن" : "REGISTER NOW"} />
        <SkewBtn href={`/${locale}/program`}
          text={locale === "ar" ? "عن البرنامج" : "ABOUT THE PROGRAM"} />
      </div>
    </section>
  );
}