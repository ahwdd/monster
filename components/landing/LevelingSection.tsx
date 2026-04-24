// src/components/landing/LevelingSection.tsx
"use client";
import Link from "next/link";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";

// XD sec3 exact data
const LEVELS = [
  {
    titleEn: "ROOKIE MONSTER",
    titleAr: "مبتدئ مونستر",
    color: "#22bb39",
    reqEn: ["100K Views", "1 Month", "8 Live / 8 Short / 4 Story"],
    reqAr: ["١٠٠ ألف مشاهدة", "شهر واحد", "٨ بث / ٨ قصير / ٤ ستوري"],
    id: "rookie",
  },
  {
    titleEn: "RISING MONSTER",
    titleAr: "صاعد مونستر",
    color: "#d4ff00",
    reqEn: ["500K Views", "4 Months", "32 Live / 32 Short / 16 Story"],
    reqAr: ["٥٠٠ ألف مشاهدة", "٤ أشهر", "٣٢ بث / ٣٢ قصير / ١٦ ستوري"],
    id: "rising",
  },
  {
    titleEn: "COLD MONSTER",
    titleAr: "كولد مونستر",
    color: "#00cfff",
    reqEn: ["1M Views", "7 Months", "56 Live / 56 Short / 28 Story"],
    reqAr: ["١ مليون مشاهدة", "٧ أشهر", "٥٦ بث / ٥٦ قصير / ٢٨ ستوري"],
    id: "cold",
  },
];

export default function LevelingSection() {
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <section className="w-full bg-black py-25 px-35">
      <div className="max-w-480 mx-auto">
        {/* XD: "Leveling System" white heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          <h2
            className="font-display font-black text-white uppercase mb-4"
            style={{
              fontSize: "clamp(2rem, 3.5vw, 4rem)",
              letterSpacing: "0.03em",
            }}>
            {isAr ? "نظام التصنيف" : "Leveling System"}
          </h2>
          {/* XD: subtitle #ccccd0 */}
          <p
            className="font-proxima text-[#ccccd0]"
            style={{ fontSize: "14px" }}>
            {isAr
              ? "لا اختصارات. كل شيء يُكتسب."
              : "No shortcuts. Everything is earned."}
          </p>
        </motion.div>

        {/* XD: 3 rank cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LEVELS.map((level, i) => (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}>
              <Link
                href={`/${locale}/ranks#${level.id}`}
                className="block bg-[#0a0a0a] border border-[#171717] p-8 no-underline
                  hover:border-[#272727] transition-colors duration-200">
                {/* XD: rank title in rank color */}
                <h3
                  className="font-display font-black uppercase mb-6"
                  style={{
                    fontSize: "clamp(1rem, 1.5vw, 1.3rem)",
                    color: level.color,
                    letterSpacing: "0.05em",
                  }}>
                  {isAr ? level.titleAr : level.titleEn}
                </h3>

                {/* XD: "Requirements:" white label */}
                <p
                  className="font-proxima text-white font-semibold mb-4"
                  style={{ fontSize: "14px" }}>
                  {isAr ? "المتطلبات:" : "Requirements:"}
                </p>

                {/* XD: bullet dots (8×8 squares) in rank color + #ccccd0 text */}
                <div className="flex flex-col gap-3">
                  {(isAr ? level.reqAr : level.reqEn).map((req, j) => (
                    <div key={j} className="flex items-start gap-3">
                      {/* XD: 8x8 colored square bullet */}
                      <div
                        className="mt-1.5 shrink-0"
                        style={{
                          width: "8px",
                          height: "8px",
                          background: level.color,
                        }}
                      />
                      <span
                        className="font-proxima text-[#ccccd0]"
                        style={{ fontSize: "14px" }}>
                        {req}
                      </span>
                    </div>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
