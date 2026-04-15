"use client";

// src/components/landing/RequirementsSection.tsx
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import {
  IoHeartOutline,
  IoShieldCheckmarkOutline,
  IoVideocamOutline,
  IoCloseCircleOutline,
} from "react-icons/io5";
import { PROGRAM_REQUIREMENTS, REMOVAL_REASONS } from "@/lib/data/program";

const ICON_MAP = {
  heart: IoHeartOutline,
  shield: IoShieldCheckmarkOutline,
  video: IoVideocamOutline,
} as const;

export default function RequirementsSection() {
  const locale = useLocale();

  return (
    <section className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="txt-small font-semibold uppercase tracking-[0.3em] text-[#78be20] mb-3">
            {locale === "ar" ? "متطلبات البرنامج" : "Requirements"}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-white uppercase text-4xl md:text-5xl leading-none">
            {locale === "ar" ? "ما يُتوقع منك" : "WHAT WE EXPECT"}
          </motion.h2>
        </div>

        {/* Rules grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {PROGRAM_REQUIREMENTS.map((rule, i) => {
            const Icon = ICON_MAP[rule.icon];
            return (
              <motion.div
                key={rule.titleEn}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${rule.color}15` }}>
                  <Icon className="size-6" style={{ color: rule.color }} />
                </div>
                <h3 className="font-display font-bold text-white uppercase txt-larger mb-2">
                  {locale === "ar" ? rule.titleAr : rule.titleEn}
                </h3>
                <p className="txt-small text-zinc-500 leading-relaxed">
                  {locale === "ar" ? rule.descAr : rule.descEn}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Removal reasons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-red-950/20 border border-red-900/40 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <IoCloseCircleOutline className="size-6 text-red-400 shrink-0" />
            <h3 className="font-display font-bold text-red-400 uppercase txt-larger">
              {locale === "ar"
                ? "أسباب الإقصاء — لا استثناءات"
                : "Removal Reasons — No Exceptions"}
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {REMOVAL_REASONS.map((r) => (
              <div
                key={r.en}
                className="flex items-center gap-2 txt-small text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                {locale === "ar" ? r.ar : r.en}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
