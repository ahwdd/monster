"use client";

// src/components/landing/RanksSection.tsx
import { useLocale } from "next-intl";
import Link          from "next/link";
import { motion }    from "framer-motion";
import { IoTrophyOutline, IoArrowForward, IoArrowBack } from "react-icons/io5";
import { LANDING_RANKS } from "@/lib/data/program";

export default function RanksSection() {
  const locale = useLocale();
  const isRTL  = locale === "ar";
  const Arrow  = isRTL ? IoArrowBack : IoArrowForward;

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-100 opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #78be20 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.4 }}
            className="txt-small font-semibold uppercase tracking-[0.3em] text-[#78be20] mb-3"
          >
            {locale === "ar" ? "نظام التصنيف" : "Leveling System"}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display font-black text-white uppercase text-4xl md:text-5xl leading-none mb-4"
          >
            {locale === "ar" ? "ارتقِ عبر التصنيفات" : "RISE THROUGH THE RANKS"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.4 }}
            className="txt-regular text-zinc-500 max-w-xl mx-auto"
          >
            {locale === "ar"
              ? "لا ترقيات تلقائية — كل مستوى يُكسب. انقر على أي تصنيف لمعرفة المزيد."
              : "No automatic upgrades — every level is earned. Click any rank to learn more."}
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LANDING_RANKS.map((rank, i) => (
            <motion.div
              key={rank.id}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <Link
                href={`/${locale}/ranks#${rank.id}`}
                className="group block h-full relative rounded-2xl overflow-hidden border border-zinc-800
                  hover:border-zinc-600 transition-all duration-300 hover:-translate-y-1
                  hover:shadow-2xl bg-[#0a0a0a]"
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${rank.glow}`; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = ""; }}
              >
                <div className="h-1 w-full" style={{ background: rank.color }} />

                <div className="p-7">
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className="txt-smaller font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm"
                      style={{ color: rank.color, background: `${rank.color}15` }}
                    >
                      {locale === "ar" ? rank.reachAr : rank.reachEn}
                    </span>
                    <IoTrophyOutline className="size-5 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                  </div>

                  <h3
                    className="font-display font-black uppercase leading-none mb-3 whitespace-pre-line"
                    style={{ fontSize: "2rem", color: rank.color }}
                  >
                    {locale === "ar" ? rank.nameAr : rank.nameEn}
                  </h3>
                  <p className="txt-smaller font-semibold uppercase tracking-widest text-zinc-500 mb-4">
                    {locale === "ar" ? rank.tagAr : rank.tagEn}
                  </p>

                  <p className="txt-small text-zinc-400 leading-relaxed mb-6">
                    {locale === "ar" ? rank.descAr : rank.descEn}
                  </p>

                  <ul className="space-y-1.5 mb-6">
                    {(locale === "ar" ? rank.rewardsAr : rank.rewardsEn).map((r) => (
                      <li key={r} className="flex items-start gap-2 txt-smaller text-zinc-400">
                        <span style={{ color: rank.color }} className="mt-0.5 shrink-0">✦</span>
                        {r}
                      </li>
                    ))}
                  </ul>

                  <div
                    className="flex items-center gap-1.5 txt-smaller font-semibold uppercase tracking-wide"
                    style={{ color: rank.color }}
                  >
                    {locale === "ar" ? "تفاصيل التصنيف" : "Rank Details"}
                    <Arrow className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}