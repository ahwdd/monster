// src/components/landing/LevelingSection.tsx
"use client";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { LANDING_RANKS } from "@/lib/data/program";
import FadeInView from "../FadeInView";
import { hexToRgba } from "@/lib/utils/colors";

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
            return (
              <motion.div
                key={rank.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}>
                <Link
                  href={`/${locale}/ranks#${rank.id}`}
                  className="block p-6 md:p-8 h-full overflow-hidden relative"
                  style={{
                    background: `linear-gradient(to top, ${hexToRgba(color, 0.3)} 0%, ${hexToRgba(color, 0.2)} 10%, ${hexToRgba(color, 0)} 100%)`,
                  }}>
                  <span
                    className="absolute top-0 -left-2 h-2 w-1/2 skew-x-[-45deg]"
                    style={{ backgroundColor: color }}
                  />
                  <h3
                    className="font-display font-black uppercase mb-3"
                    style={{
                      fontSize: "clamp(1rem, 1.5vw, 1.3rem)",
                      color,
                      letterSpacing: "0.05em",
                    }}>
                    {isAr ? rank.nameAr : rank.nameEn}
                  </h3>
                  <p className="font-proxima text-white font-semibold mb-2 txt-regular">
                    {t("requirements")}:
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {(isAr ? rank.requirementsAr : rank.requirementsEn)
                      .slice(0, 3)
                      .map((req) => (
                        <div key={req} className="flex items-start gap-3">
                          <div
                            className="mt-1.5 shrink-0 size-2 relative"
                            style={{ background: color }}>
                            <span className="absolute size-1 bg-[#ccc] rounded-full -inset-e-0.5 -top-0.5 z-0" />
                          </div>
                          <span className="font-proxima text-[#ccccd0] txt-regular">
                            {req}
                          </span>
                        </div>
                      ))}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
