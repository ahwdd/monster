// src/components/landing/HowItWorksSection.tsx
"use client";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { HOW_IT_WORKS_STEPS } from "@/lib/data/program";
import FadeInView from "../FadeInView";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function HowItWorksSection() {
  const locale = useLocale();
  const t = useTranslations("hero")
  const isAr = locale === "ar";

  return (
    <section className="w-full bg-black py-25 px-35">
      <div className="container">
        <FadeInView className="text-center mb-16">
          <h2
            className="header-larger tracking-wide font-display font-black text-white uppercase mb-4">
            {t("howItWorks")}
          </h2>
          <p className="font-proxima text-[#ccccd0] max-w-92 mx-auto txt-regular">
            {t("howItWorksDesc")}
          </p>
        </FadeInView>

        <div className="flex flex-wrap gap-8 items-start justify-center">
          {HOW_IT_WORKS_STEPS.map((step, i) => (
            <motion.div
              key={step.numEn}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
              className="flex flex-col justify-between items-start w-full sm:w-[40%] lg:w-[23%]">

              <div
                className="flex items-center justify-center mb-6 bg-[#171717] size-16 rounded">
                <span
                  className="font-display font-black header-regular text-accent">
                  {step.numEn}
                </span>
              </div>

              <h3
                className="font-display font-black text-white uppercase mb-3"
                style={{
                  fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)",
                  letterSpacing: "0.06em",
                }}>
                {isAr ? step.titleAr : step.titleEn}
              </h3>

              <p
                className="font-proxima text-[#ccccd0] txt-regular max-w-44"
                style={{ lineHeight: "1.6" }}>
                {isAr ? step.descAr : step.descEn}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
