// src/components/program/ScoringSystem.tsx
"use client";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { IoCheckmarkCircle } from "react-icons/io5";
import { SCORING_SYSTEM } from "@/lib/data/program";

const COLORS = ["#78be20", "#a3e635", "#38bdf8"];

export default function ScoringSystem() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const t = useTranslations("program");

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="font-proxima txt-regular text-zinc-500 max-w-xl mx-auto">
          {t("scoringSubtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {SCORING_SYSTEM.map((cat, i) => (
          <motion.div
            key={cat.titleEn}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="relative overflow-hidden"
            style={{
              border: "solid 1px #707070",
              background: "rgba(0,0,0,.2)",
            }}>
            {/* Top color bar */}
            <div className="h-0.5 w-full" style={{ background: COLORS[i] }} />

            {/* Icon gradient */}
            <div
              className="absolute top-0 inset-e-0 w-32 h-32 pointer-events-none"
              style={{
                background: `linear-gradient(to bottom left, ${COLORS[i]}15 0%, transparent 70%)`,
              }}
            />

            <div className="p-6 relative z-10">
              {/* Points badge */}
              <div className="flex items-center justify-between mb-4">
                <h3
                  className="font-display font-black uppercase txt-larger"
                  style={{ color: COLORS[i] }}>
                  {isAr ? cat.titleAr : cat.titleEn}
                </h3>
                <span
                  className="font-display font-black text-2xl"
                  style={{ color: COLORS[i] }}>
                  {cat.points}
                  <span className="txt-smaller text-zinc-500 font-proxima font-normal ms-1">
                    pts
                  </span>
                </span>
              </div>

              <ul className="space-y-2">
                {(isAr ? cat.itemsAr : cat.itemsEn).map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 txt-smaller text-zinc-400">
                    <IoCheckmarkCircle
                      className="size-3.5 shrink-0 mt-0.5"
                      style={{ color: COLORS[i] }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Total badge */}
      <div
        className="flex items-center justify-center gap-4 py-4"
        style={{ border: "1px solid #707070", background: "rgba(0,0,0,.2)" }}>
        <p className="font-proxima txt-small text-zinc-500">
          {isAr ? "المجموع" : "Total"}
        </p>
        <p className="font-display font-black text-3xl text-white">
          100 <span className="txt-small text-zinc-500">pts / quarter</span>
        </p>
      </div>
    </div>
  );
}
