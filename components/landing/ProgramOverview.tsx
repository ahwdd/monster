"use client";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ProgramOverview() {
  const locale = useLocale();
  const t = useTranslations("hero");

  return (
    <section className="w-full bg-black">
      <div className="container xl:px-8 px-4 py-16 md:py-25 
                      grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-x-20 items-center">

        {/* 1. Title - Always First */}
        <motion.div
          className="md:col-start-1"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <h2 className="header-regular font-display font-black text-white uppercase tracking-wide md:mb-0">
            {t("overviewTitle")}
          </h2>
        </motion.div>

        {/* 2. Image - Second on Mobile, Right side on Desktop */}
        <motion.div
          className="relative w-full overflow-hidden md:col-start-2 md:row-span-2 md:max-w-140"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
          style={{ aspectRatio: "4/3" }}
        >
          <Image
            src="/assets/hero/overview.png"
            alt="Monster Energy Program"
            fill
            className="object-cover object-center opacity-70 rtl:-scale-x-100"
          />
        </motion.div>

        {/* 3. Description - Third on Mobile, Under Title on Desktop */}
        <motion.div
          className="md:col-start-1 md:row-start-2 xl:mt-[-40%] lg:mt-[-20%]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.2, ease: EASE }}
        >
          <p className="font-proxima text-[#ccccd0] leading-relaxed mb-4 txt-larger">
            {t("overviewDesc1")}
          </p>
          <p className="font-proxima text-[#ccccd0] leading-relaxed txt-larger">
            {t("overviewDesc2")}
          </p>
        </motion.div>

      </div>
    </section>
  );
}