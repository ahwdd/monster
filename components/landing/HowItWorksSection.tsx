"use client";

// src/components/landing/HowItWorksSection.tsx
import { useLocale } from "next-intl";
import Link          from "next/link";
import { motion }    from "framer-motion";
import {
  IoDocumentTextOutline,
  IoCheckmarkCircleOutline,
  IoTrophyOutline,
  IoArrowForward,
  IoArrowBack,
} from "react-icons/io5";
import { HOW_IT_WORKS_STEPS } from "@/lib/data/program";

// Map icon string keys to actual components
const ICON_MAP = {
  document:  IoDocumentTextOutline,
  checkmark: IoCheckmarkCircleOutline,
  trophy:    IoTrophyOutline,
} as const;

export default function HowItWorksSection() {
  const locale = useLocale();
  const isRTL  = locale === "ar";
  const Arrow  = isRTL ? IoArrowBack : IoArrowForward;

  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #78be20, transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="txt-small font-semibold uppercase tracking-[0.3em] text-[#78be20] mb-3"
          >
            {locale === "ar" ? "كيف يعمل البرنامج" : "How It Works"}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="font-display font-black text-white uppercase text-4xl md:text-5xl leading-none"
          >
            {locale === "ar" ? "ثلاث خطوات للانضمام" : "THREE STEPS TO JOIN"}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-10 left-[16.5%] right-[16.5%] h-px bg-zinc-800 z-0" />

          {HOW_IT_WORKS_STEPS.map((step, i) => {
            const Icon = ICON_MAP[step.icon];
            return (
              <motion.div
                key={step.numEn}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative z-10 text-center"
              >
                <div className="relative inline-flex flex-col items-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-[#0d0d0d] border-2 border-[#78be20]/30
                    flex items-center justify-center mb-3 relative">
                    <Icon className="size-8 text-[#78be20]" />
                    <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#78be20]
                      flex items-center justify-center font-display font-black text-black text-xs">
                      {step.numEn}
                    </span>
                  </div>
                </div>
                <h3 className="font-display font-bold text-white uppercase text-xl mb-3">
                  {locale === "ar" ? step.titleAr : step.titleEn}
                </h3>
                <p className="txt-small text-zinc-500 leading-relaxed max-w-xs mx-auto">
                  {locale === "ar" ? step.descAr : step.descEn}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.5 }}
          className="text-center mt-14"
        >
          <Link
            href={`/${locale}/submissions/register`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#78be20] hover:bg-[#8fd428]
              text-black font-display font-bold uppercase tracking-wider txt-regular
              rounded-sm transition-all duration-200 hover:shadow-[0_0_24px_rgba(120,190,32,0.4)]
              hover:-translate-y-0.5 group"
          >
            {locale === "ar" ? "ابدأ التسجيل" : "START YOUR APPLICATION"}
            <Arrow className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}