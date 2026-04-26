"use client";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { IoVideocamOutline } from "react-icons/io5";
import { PROGRAM_REQUIREMENTS } from "@/lib/data/program";
import FadeInView from "../animation/FadeInView";
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
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);

  return (
    <section className="w-full bg-black py-16 lg:py-25 px-4 lg:px-35">
      <div className="container">
        <FadeInView className="text-center mb-10 lg:mb-16">
          <h2 className="header-larger tracking-wide font-display font-black text-white uppercase">
            {t("requirements")}
          </h2>
        </FadeInView>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {PROGRAM_REQUIREMENTS.map((item, i) => {
            const Icon = ICON_MAP[item.icon] ?? IoVideocamOutline;
            const isHovered = hoveredIndex === i;

            return (
              <motion.div
                key={item.titleEn}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                className="p-8 rounded transition-colors duration-300 cursor-default"
                style={{ background: isHovered ? "#171717" : "transparent" }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(-1)}>
                <div
                  className={`-skew-x-12 ms-2 flex items-center justify-center size-18 mb-6 transition-colors duration-300 ${
                    isHovered ? "bg-monster" : "bg-[#171717]"
                  }`}>
                  <Icon className="size-10 skew-x-12 text-white" />
                </div>

                <h3 className="font-display header-small tracking-widest font-black text-white uppercase mt-2">
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
