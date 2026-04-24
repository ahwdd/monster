// src/components/landing/TopMonstersSection.tsx
"use client";
import Link from "next/link";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { getRankConfig } from "@/lib/data/program";
import { formatNumber } from "@/lib/utils/rank";

// XD sec6 exact placeholder data
const PLACEHOLDER = [
  { rank: 1, nickname: "Ahmed", level: "Cold Monster", views: "1,300,000" },
  { rank: 2, nickname: "Sara", level: "Cold Monster", views: "1,200,000" },
  { rank: 3, nickname: "Khaled", level: "Rising Monster", views: "850,000" },
  { rank: 4, nickname: "Nour", level: "Rising Monster", views: "300,000" },
  { rank: 5, nickname: "Aziz", level: "Rookie Monster", views: "220,000" },
];

export default function TopMonstersSection() {
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <section className="w-full bg-black py-25 px-35">
      <div className="max-w-480 mx-auto">
        {/* XD: "Top Monsters" white, subtitle #ccccd0 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14">
          <h2
            className="font-display font-black text-white uppercase mb-3"
            style={{
              fontSize: "clamp(2rem, 3.5vw, 4rem)",
              letterSpacing: "0.03em",
            }}>
            {isAr ? "أفضل المونسترز" : "Top Monsters"}
          </h2>
          <p
            className="font-proxima text-[#ccccd0]"
            style={{ fontSize: "14px" }}>
            {isAr ? "تنافس. احتل مكانك. سيطر." : "Compete. Rank. Dominate."}
          </p>
        </motion.div>

        {/* XD: table — 720px wide in XD (scaled to content width here) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-225 mx-auto">
          {/* XD table header row — white text */}
          <div className="grid grid-cols-[80px_1fr_1fr_1fr] border-b border-[#272727] pb-3 mb-0">
            {["Rank", "Creator", "Level", "Views"].map((h, i) => (
              <span
                key={i}
                className="font-display font-bold text-white uppercase"
                style={{ fontSize: "13px", letterSpacing: "0.08em" }}>
                {isAr
                  ? ["المرتبة", "صانع المحتوى", "التصنيف", "المشاهدات"][i]
                  : h}
              </span>
            ))}
          </div>

          {/* XD rows — #ccccd0 text, #272727 bottom divider */}
          {PLACEHOLDER.map((row, i) => (
            <motion.div
              key={row.rank}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.07 }}
              className="grid grid-cols-[80px_1fr_1fr_1fr] py-4 border-b border-[#272727]
                hover:bg-[#0a0a0a] transition-colors">
              <span
                className="font-proxima text-[#ccccd0]"
                style={{ fontSize: "14px" }}>
                {row.rank}
              </span>
              <span
                className="font-proxima text-[#ccccd0]"
                style={{ fontSize: "14px" }}>
                {row.nickname}
              </span>
              <span
                className="font-proxima text-[#ccccd0]"
                style={{ fontSize: "14px" }}>
                {isAr
                  ? row.level
                      .replace("Cold Monster", "كولد مونستر")
                      .replace("Rising Monster", "صاعد مونستر")
                      .replace("Rookie Monster", "مبتدئ مونستر")
                  : row.level}
              </span>
              <span
                className="font-proxima text-[#ccccd0]"
                style={{ fontSize: "14px" }}>
                {row.views}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Link to full leaderboard */}
        <div className="flex justify-center mt-10">
          <Link
            href={`/${locale}/leaderboard`}
            className="h-12 px-10 flex items-center font-display font-bold uppercase
              tracking-[2px] text-sm border border-[#333] text-[#ccccd0]
              hover:border-white hover:text-white transition-colors">
            {isAr ? "لوحة الصدارة الكاملة" : "Full Leaderboard"}
          </Link>
        </div>
      </div>
    </section>
  );
}
