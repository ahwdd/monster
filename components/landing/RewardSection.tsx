// src/components/landing/RewardSection.tsx
"use client";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { REWARD_PACKS } from "@/lib/data/program";
import FadeInView from "../FadeInView";
import { hexToRgba } from "@/lib/utils/colors";
import { BsTrophy } from "react-icons/bs";

const EASE = [0.22, 1, 0.36, 1] as const;

const XD_COLORS: Record<string, string> = {
  "Rookie Pack": "#22bb39",
  "Rising Pack": "#d4ff00",
  "Cold Pack": "#00cfff",
};

export default function RewardsSection() {
  const locale = useLocale();
  const t = useTranslations("hero")
  const isAr = locale === "ar";

  return (
    <section className="w-full bg-black py-25 px-35 relative">
    <img src="/assets/textures/skew-texture.png" alt="" 
    className="absolute size-full inset-x-0 top-8 z-1 object-cover" />
      <div className="container relative z-2">
        <FadeInView className="text-center mb-16">
          <h2
            className="header-larger tracking-wide font-display font-black text-white uppercase">
            {t("rewards")}
          </h2>
        </FadeInView>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REWARD_PACKS.map((pack, i) => {
            const color = XD_COLORS[pack.titleEn] ?? pack.color;
            return (
              <motion.div
                key={pack.titleEn}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                className="p-8 relative overflow-hidden"
                style={{
                    background: `linear-gradient(
                      to top,
                      ${hexToRgba(color, 0.3)} 0%,
                      ${hexToRgba(color, 0.2)} 10%,
                      ${hexToRgba(color, 0)} 100%
                    )`
                  }}>
                  <BsTrophy className="absolute top-2 inset-e-2 size-10" style={{color}} />
                  <span className="absolute top-3 -left-3 h-2 w-3/4 skew-x-[-45deg]" style={{backgroundColor: color}} />
                <h3
                  className="font-display font-black tracking-wide header-small uppercase mb-3"
                  style={{
                    color,
                  }}>
                  {isAr ? pack.titleAr : pack.titleEn}
                </h3>

                <p className="-ms-1 font-proxima text-white tracking-wide font-semibold mb-2 txt-large">
                  {t("includes")}:
                </p>

                <div className="flex flex-col gap-3">
                  {(isAr ? pack.itemsAr : pack.itemsEn).map((item) => (
                    <div key={item} className="flex items-start gap-0.5">
                      <div
                        className="mt-1.5 shrink-0 size-2"
                        style={{ background: color, }}
                      />
                      <span
                        className="font-proxima text-[#ccccd0] txt-regular"
                        style={{ lineHeight: "1.5" }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
