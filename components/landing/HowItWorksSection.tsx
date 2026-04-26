"use client";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { HOW_IT_WORKS_STEPS } from "@/lib/data/program";
import FadeInView from "../animation/FadeInView";

const EASE = [0.22, 1, 0.36, 1] as const;
const DOT_COUNT = 6;
const DOT_COUNT_XL = 10;
const BOX_SIZE_DESKTOP = "clamp(52px, 8vw, 86px)";
const BOX_SIZE_MOBILE = "56px";

export default function HowItWorksSection() {
  const locale = useLocale();
  const t = useTranslations("hero");
  const isAr = locale === "ar";
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);

  return (
    <section className="w-full bg-black py-16 lg:py-25 px-4 lg:px-35">
      <div className="container">
        <FadeInView className="text-center mb-5 lg:mb-16">
          <h2 className="header-larger font-display font-black text-white uppercase mb-0.5 lg:mb-1 tracking-wide">
            {t("howItWorks")}
          </h2>
          <p className="font-proxima text-[#ccccd0] header-small max-w-140 mx-auto">
            {t("howItWorksDesc")}
          </p>
        </FadeInView>

        {/* ── MOBILE layout ── */}
        <div className="flex flex-col gap-0 lg:hidden">
          {HOW_IT_WORKS_STEPS.map((step, i) => {
            const isLast = i === HOW_IT_WORKS_STEPS.length - 1;
            const connectorLit = hoveredIndex >= i + 1;

            return (
              <div key={step.numEn}>
                {/* Step row */}
                <div
                  className="flex flex-row items-start gap-4 cursor-default"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(-1)}>
                  {/* Number box */}
                  <div
                    className="flex items-center justify-center rounded shrink-0 transition-colors duration-300"
                    style={{
                      width: BOX_SIZE_MOBILE,
                      height: BOX_SIZE_MOBILE,
                      background: i <= hoveredIndex ? "#22bb39" : "#171717",
                    }}>
                    <span
                      className="font-display font-black transition-colors duration-300"
                      style={{
                        fontSize: "1.5rem",
                        color: i <= hoveredIndex ? "#ffffff" : "#22bb39",
                      }}>
                      {step.numEn}
                    </span>
                  </div>

                  {/* Text beside the box */}
                  <div className="flex flex-col justify-center pt-1 flex-1">
                    <h3
                      className="font-display font-black uppercase mb-1 transition-colors duration-300"
                      style={{
                        fontSize: "0.875rem",
                        letterSpacing: "0.06em",
                        color: i <= hoveredIndex ? "#22bb39" : "#ffffff",
                      }}>
                      {isAr ? step.titleAr : step.titleEn}
                    </h3>
                    <p
                      className="font-proxima text-[#ccccd0] text-sm"
                      style={{ lineHeight: "1.6" }}>
                      {isAr ? step.descAr : step.descEn}
                    </p>
                  </div>
                </div>

                {/* Vertical dots — under the number box only */}
                {!isLast && (
                  <div
                    className="flex flex-col items-center gap-1.25 py-2"
                    style={{ width: BOX_SIZE_MOBILE }}>
                    {Array.from({ length: DOT_COUNT }).map((_, d) => (
                      <span
                        key={d}
                        className="size-1 rounded-full transition-colors duration-250"
                        style={{
                          background: connectorLit ? "#22bb39" : "#444444",
                          transitionDelay: connectorLit
                            ? `${d * 40}ms`
                            : `${(DOT_COUNT - 1 - d) * 40}ms`,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── DESKTOP layout ── */}
        <div className="hidden lg:flex flex-row flex-nowrap items-start w-full">
          {HOW_IT_WORKS_STEPS.map((step, i) => {
            const connectorLit = hoveredIndex >= i + 1;
            const isLast = i === HOW_IT_WORKS_STEPS.length - 1;

            return (
              <div key={step.numEn} className="contents">
                {/* Step card */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                  className="flex flex-col cursor-default shrink-0"
                  style={{ width: "clamp(100px, 20vw, 200px)" }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(-1)}>
                  <div
                    className="flex items-center justify-center rounded mb-4 transition-colors duration-300 relative z-10"
                    style={{
                      width: BOX_SIZE_DESKTOP,
                      height: BOX_SIZE_DESKTOP,
                      background: i <= hoveredIndex ? "#22bb39" : "#171717",
                    }}>
                    <span
                      className="font-display font-black transition-colors duration-300"
                      style={{
                        fontSize: "clamp(1.2rem, 2.5vw, 2.5rem)",
                        color: i <= hoveredIndex ? "#ffffff" : "#22bb39",
                      }}>
                      {step.numEn}
                    </span>
                  </div>

                  <h3
                    className="font-display font-black uppercase mb-2 header-small transition-colors duration-300"
                    style={{
                      letterSpacing: "0.06em",
                      color: i <= hoveredIndex ? "#22bb39" : "#ffffff",
                    }}>
                    {isAr ? step.titleAr : step.titleEn}
                  </h3>

                  <p className="font-proxima text-[#ccccd0] txt-large">
                    {isAr ? step.descAr : step.descEn}
                  </p>
                </motion.div>

                {/* Horizontal dots connector */}
                {!isLast && (
                  <div
                    className="shrink-0 flex items-center ms-[-10%]"
                    style={{
                      flex: "1 1 0",
                      minWidth: 0,
                      // center dots on the box: push down by half box, then shift left slightly
                      marginTop: `calc(${BOX_SIZE_DESKTOP} / 2)`,
                      transform: "translateY(-50%) translateX(-8px)",
                      paddingRight: "8px",
                    }}>
                    {/* md → xl: 6 dots */}
                    <div className="xl:hidden flex flex-row flex-nowrap justify-between w-full">
                      {Array.from({ length: DOT_COUNT }).map((_, d) => (
                        <span
                          key={d}
                          className="size-1 rounded-full shrink-0 transition-colors duration-250"
                          style={{
                            background: connectorLit ? "#22bb39" : "#444444",
                            transitionDelay: connectorLit
                              ? `${d * 40}ms`
                              : `${(DOT_COUNT - 1 - d) * 40}ms`,
                          }}
                        />
                      ))}
                    </div>

                    {/* xl+: 10 dots */}
                    <div className="hidden xl:flex flex-row flex-nowrap justify-between w-full">
                      {Array.from({ length: DOT_COUNT_XL }).map((_, d) => (
                        <span
                          key={d}
                          className="size-1 rounded-full shrink-0 transition-colors duration-250"
                          style={{
                            background: connectorLit ? "#22bb39" : "#444444",
                            transitionDelay: connectorLit
                              ? `${d * 40}ms`
                              : `${(DOT_COUNT_XL - 1 - d) * 40}ms`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
