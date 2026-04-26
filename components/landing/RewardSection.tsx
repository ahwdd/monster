"use client";

import { useLocale, useTranslations } from "next-intl";
import { PACK_IMAGES, REWARD_PACKS } from "@/lib/data/program";
import FadeInView from "../FadeInView";
import PackSection from "./PackSection";

const XD_COLORS: Record<string, string> = {
  "Rookie Pack": "#22bb39",
  "Rising Pack": "#d4ff00",
  "Cold Pack":   "#00cfff",
};

export default function RewardsSection() {
  const locale = useLocale();
  const t = useTranslations("hero");
  const isAr = locale === "ar";

  return (
    <section
      id="rewards"
      className="w-full bg-black py-16 md:py-25 px-4 md:px-20 lg:px-35 relative overflow-hidden"
    >
      <div className="container px-[10%]">
        {/* Title */}
        <FadeInView className="text-center mb-12 md:mb-16 relative z-2">
          <h2 className="header-larger tracking-wide font-display font-black text-white uppercase">
            {t("whatUEarn")}
          </h2>
        </FadeInView>

        {/* Pack sections — stacked vertically, with extra end padding on lg to leave room for floating images */}
        <div className="flex flex-col gap-10 md:gap-14 relative z-2 lg:pe-52">
          {REWARD_PACKS.map((pack, i) => {
            const color = XD_COLORS[pack.titleEn] ?? pack.color;
            const images = PACK_IMAGES[pack.titleEn] ?? [];

            return (
              <PackSection
                key={pack.titleEn}
                pack={pack}
                color={color}
                images={images}
                index={i}
                isAr={isAr}
                t={t}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}