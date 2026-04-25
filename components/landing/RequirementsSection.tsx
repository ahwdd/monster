// src/components/landing/RequirementsSection.tsx
"use client";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  IoVideocamOutline,
} from "react-icons/io5";
import { PROGRAM_REQUIREMENTS } from "@/lib/data/program";
import FadeInView from "../FadeInView";
import { MdOutlineHandshake } from "react-icons/md";
import { TbHandStop } from "react-icons/tb";
import { FiVideo } from "react-icons/fi";

const EASE = [0.22, 1, 0.36, 1] as const;

const ICON_MAP = {
  heart: MdOutlineHandshake,
  shield: TbHandStop,
  video: FiVideo,
};

export default function RequirementsSection() {
  const locale = useLocale();
  const t = useTranslations("hero");
  const isAr = locale === "ar";

  return (
    <section className="w-full bg-black py-16 md:py-25 px-4 md:px-35">
      <div className="container">
        <FadeInView className="text-center mb-10 md:mb-16">
          <h2
            className="header-larger tracking-wide font-display font-black text-white uppercase">
            {t("requirements")}
          </h2>
        </FadeInView>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {PROGRAM_REQUIREMENTS.map((item, i) => {
            const Icon = ICON_MAP[item.icon] ?? IoVideocamOutline;
            return (
              <motion.div
                key={item.titleEn}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                className={`p-8`}>
                {/* XD: 60×60 #171717 icon box */}
                <div
                  className={`-skew-x-12 ms-2 flex items-center justify-center size-18 mb-6
                  bg-[#171717]`}>
                  <Icon className="size-10 skew-x-12 text-white" />
                </div>

                <h3
                  className="font-display font-black text-white uppercase mt-2"
                  style={{
                    fontSize: "clamp(1rem, 1.5vw, 1.3rem)",
                    letterSpacing: "0.05em",
                  }}>
                  {isAr ? item.titleAr : item.titleEn}
                </h3>

                <p className="font-proxima text-[#ccccd0] leading-relaxed txt-regular max-w-72">
                  {isAr ? item.descAr : item.descEn}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
