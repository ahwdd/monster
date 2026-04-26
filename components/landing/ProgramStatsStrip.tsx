"use client";

// src/components/landing/ProgramStatsStrip.tsx
import { useLocale } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";
import { PROGRAM_STATS } from "@/lib/data/program";

export default function ProgramStatsStrip() {
  const locale = useLocale();

  return (
    <div className="relative bg-[#78be20] overflow-hidden">
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent, transparent 6px, rgba(0,0,0,0.1) 6px, rgba(0,0,0,0.1) 12px)",
        }}
      />
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-stretch overflow-x-auto divide-x divide-black/10">
          {PROGRAM_STATS.map((s, i) => (
            <motion.div
              key={s.labelEn}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex-1 min-w-35 px-6 py-5 text-center">
              <p className="font-display font-black text-black text-2xl md:text-3xl leading-none">
                {locale === "ar" ? s.valAr : s.valEn}
              </p>
              <p className="txt-smaller font-semibold uppercase tracking-wider text-black/60 mt-1">
                {locale === "ar" ? s.labelAr : s.labelEn}
              </p>
            </motion.div>
          ))}
          {/* Program link */}
          <div className="flex-1 min-w-35 flex items-center justify-center px-6 py-5">
            <Link
              href={`/program`}
              className="txt-small font-display font-bold uppercase tracking-wider text-black hover:underline transition-all">
              {locale === "ar" ? "عن البرنامج ←" : "About Program →"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
