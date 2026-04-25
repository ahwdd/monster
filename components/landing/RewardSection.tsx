// src/components/landing/RewardSection.tsx
"use client";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { REWARD_PACKS } from "@/lib/data/program";
import FadeInView from "../FadeInView";
import { hexToRgba } from "@/lib/utils/colors";
import { BsTrophy } from "react-icons/bs";
import { FaBoltLightning } from "react-icons/fa6";

const EASE = [0.22, 1, 0.36, 1] as const;

const XD_COLORS: Record<string, string> = {
  "Rookie Pack": "#22bb39",
  "Rising Pack": "#d4ff00",
  "Cold Pack": "#00cfff",
};

export default function RewardsSection() {
  const locale = useLocale();
  const t = useTranslations("hero");
  const isAr = locale === "ar";

  return (
    <section
      id="rewards"
      className="w-full bg-black py-16 md:py-25 px-4 md:px-35 relative">
      <img
        src="/assets/textures/skew-texture.png"
        alt=""
        className="absolute size-full inset-x-0 top-8 z-1 object-cover"
      />
      <div className="container relative z-2">
        <FadeInView className="text-center mb-10 md:mb-16">
          <h2 className="header-larger tracking-wide font-display font-black text-white uppercase">
            {t("whatUEarn")}
          </h2>
        </FadeInView>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {REWARD_PACKS.map((pack, i) => {
            const color = XD_COLORS[pack.titleEn] ?? pack.color;

            return (
              <motion.div
                key={pack.titleEn}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}>
                <div
                  className="p-6 md:p-8 space-y-2 h-full overflow-hidden relative rounded-md"
                  style={{
                    border: `1px solid ${color}`,
                    background: `linear-gradient(to top, ${hexToRgba(color, 0.3)} 0%, ${hexToRgba(color, 0.2)} 10%, ${hexToRgba(color, 0)} 100%)`,
                  }}>
                  {/* Trophy icon — same circle style as LevelingSection's FaStar */}
                  <div
                    className="rounded-full w-fit p-3"
                    style={{
                      color,
                      border: `1px solid ${color}`,
                      background: hexToRgba(color, 0.1),
                    }}>
                    <BsTrophy className="size-6" />
                  </div>

                  <h3
                    className="font-display font-black uppercase mb-1"
                    style={{
                      fontSize: "clamp(1rem, 1.5vw, 1.3rem)",
                      color,
                      letterSpacing: "0.05em",
                    }}>
                    {isAr ? pack.titleAr : pack.titleEn}
                  </h3>

                  <p className="font-proxima text-white font-semibold txt-regular">
                    {t("includes")}:
                  </p>

                  <div className="flex flex-col gap-1.5 text-white">
                    {(isAr ? pack.itemsAr : pack.itemsEn).map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 px-2 bg-[#636363]/50 w-fit rounded-2xl">
                        <FaBoltLightning className="shrink-0 size-3.5" />
                        <span className="font-proxima txt-regular">{item}</span>
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
