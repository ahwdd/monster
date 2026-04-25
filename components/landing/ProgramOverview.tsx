// src/components/landing/ProgramOverview.tsx
"use client";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import FadeInView from "../FadeInView";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ProgramOverview() {
  const locale = useLocale();
  const t = useTranslations("hero");
  const isAr = locale === "ar";

  // const DISPLAY_STATS = [
  //   { val: "9", label: t("overviewMonths") },
  //   { val: "30", label: t("overviewCreators") },
  //   { val: "5", label: t("overviewNewPerMonth") },
  // ];

  return (
    <section id="overview" className="w-full bg-black">
      <div className="container xl:px-8 px-4 py-16 md:py-25 
      grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
        {/* Left: text + stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EASE }}
          className="max-w-full md:max-w-120 ">
          <h2 className="header-regular font-display font-black text-white uppercase mb-2 md:mb-4 tracking-wide">
            {t("overviewTitle")}
          </h2>
          <p className="font-proxima text-[#ccccd0] leading-relaxed mb-1.5 md:mb-2 txt-larger">
            {t("overviewDesc1")}
          </p>
          <p className="font-proxima text-[#ccccd0] leading-relaxed mb-4 md:mb-8 txt-larger">
            {t("overviewDesc2")}
          </p>

          {/* Stats row — horizontal scroll on very small screens */}
          {/* <div className="flex items-start gap-3 md:gap-4 overflow-x-auto pb-1">
            {DISPLAY_STATS.map((s, i) => (
              <motion.div
                key={s.val}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: 0.2 + i * 0.08,
                  ease: EASE,
                }}
                className="shrink-0">
                <div className="bg-[#171717] -skew-x-12 xl:px-8 xl:py-4 px-4 py-2 flex flex-col items-center justify-center">
                  <p className="skew-x-12 font-display font-black leading-none text-accent header-large">
                    {s.val}
                  </p>
                  <p className="skew-x-12 font-proxima text-[#b6b6b6] txt-smaller uppercase tracking-widest mt-2">
                    {s.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div> */}
        </motion.div>

        {/* Right: image — hidden on very small screens, shown md+ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
          className="relative w-full overflow-hidden max-w-full md:max-w-120 hidden md:block"
          style={{ aspectRatio: "4/3" }}>
          <Image
            src="/assets/hero/overview.png"
            alt="Monster Energy Program"
            fill
            className="object-cover object-center opacity-60 rtl:-scale-x-100"
          />
          <div className="absolute inset-0" />
        </motion.div>
      </div>
    </section>
  );
}
