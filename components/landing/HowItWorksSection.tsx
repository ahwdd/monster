// src/components/landing/HowItWorksSection.tsx
"use client";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { HOW_IT_WORKS_STEPS } from "@/lib/data/program";
import FadeInView from "../FadeInView";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function HowItWorksSection() {
  const locale = useLocale();
  const t = useTranslations("hero");
  const isAr = locale === "ar";

  return (
    <section className="w-full bg-black py-16 md:py-25 px-4 md:px-35">
      <div className="container">
        <FadeInView className="text-center mb-5 md:mb-16">
          <h2 className="header-larger font-display font-black text-white uppercase mb-0.5 md:mb-1 tracking-wide">
            {t("howItWorks")}
          </h2>
          <p className="font-proxima text-[#ccccd0] header-small max-w-140 mx-auto">
            {t("howItWorksDesc")}
          </p>
        </FadeInView>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {HOW_IT_WORKS_STEPS.map((step, i) => (
            <motion.div
              key={step.numEn}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
              className="">
              <div
                className="flex items-center justify-center rounded mb-4 md:mb-6 bg-[#171717]"
                style={{
                  width: "clamp(60px, 10vw, 86px)",
                  height: "clamp(60px, 10vw, 86px)",
                }}>
                <span
                  className="font-display font-black"
                  style={{
                    fontSize: "clamp(1.4rem, 3vw, 2.5rem)",
                    color: "#22bb39",
                  }}>
                  {step.numEn}
                </span>
              </div>

              <h3
                className="font-display font-black text-white uppercase mb-2 md:mb-3"
                style={{
                  fontSize: "clamp(0.8rem, 1.2vw, 1.1rem)",
                  letterSpacing: "0.06em",
                }}>
                {isAr ? step.titleAr : step.titleEn}
              </h3>

              <p
                className="font-proxima text-[#ccccd0] txt-regular max-w-56"
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
