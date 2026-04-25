"use client";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { LANDING_RANKS } from "@/lib/data/program";
import FadeInView from "../FadeInView";
import { hexToRgba } from "@/lib/utils/colors";
import { FaStar, FaEye, FaCalendar, FaVideo } from "react-icons/fa";

const EASE = [0.22, 1, 0.36, 1] as const;

const XD_COLORS: Record<string, string> = {
  rookie: "#22bb39",
  rising: "#d4ff00",
  cold: "#00cfff",
};

export default function LevelingSection() {
  const locale = useLocale();
  const t = useTranslations("hero");
  const isAr = locale === "ar";

  return (
    <section
      id="levels"
      className="w-screen py-16 md:py-25 px-4 md:px-35 relative">
      <img
        src="/assets/textures/skew-texture.png"
        alt=""
        className="absolute size-full inset-x-0 top-8 z-1 object-cover"
      />
      <div className="container relative z-2">
        <FadeInView className="text-center mb-10 md:mb-16">
          <h2 className="header-larger font-display font-black text-white tracking-wide uppercase mb-3 md:mb-4">
            {t("levelingSystem")}
          </h2>
          <p className="font-proxima text-[#ccccd0] txt-regular max-w-xl mx-auto">
            {t("levelingDesc")}
          </p>
        </FadeInView>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {LANDING_RANKS.map((rank, i) => {
            const color = XD_COLORS[rank.id] ?? rank.color;
            const highlights = [
              { icon: FaEye, text: isAr ? rank.reachAr : rank.reachEn },
              { icon: FaCalendar, text: isAr ? rank.monthsAr : rank.monthsEn },
              { icon: FaVideo, text: isAr ? rank.requirementsAr[0] : rank.requirementsEn[0] },
            ];

            return (
              <motion.div
                key={rank.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}>
                <div className="block p-6 md:p-8 space-y-2 h-full overflow-hidden relative rounded-md"
                  style={{
                    border: `1px solid ${color}`,
                    background: `linear-gradient(to top, ${hexToRgba(color, 0.3)} 0%, ${hexToRgba(color, 0.2)} 10%, ${hexToRgba(color, 0)} 100%)`,
                  }}>
                  <div
                    className="rounded-full w-fit p-3"
                    style={{
                      color,
                      border: `1px solid ${color}`,
                      background: hexToRgba(color, 0.1),
                    }}>
                    <FaStar className="size-6" />
                  </div>

                  <h3
                    className="font-display font-black uppercase mb-1"
                    style={{
                      fontSize: "clamp(1rem, 1.5vw, 1.3rem)",
                      color,
                      letterSpacing: "0.05em",
                    }}>
                    {isAr ? rank.nameAr : rank.nameEn}
                  </h3>

                  <p className="font-proxima text-white font-semibold txt-regular">
                    {t("requirements")}:
                  </p>

                  <div className="flex flex-col gap-1.5 text-white">
                    {highlights.map(({ icon: Icon, text }) => (
                      <div key={text} className="flex items-center gap-2 px-2 bg-[#636363]/50 w-fit rounded-2xl">
                        <Icon
                          className="shrink-0 size-3.5"/>
                        <span className="font-proxima txt-regular">
                          {text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
