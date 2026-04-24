// src/components/landing/TopMonstersSection.tsx
"use client";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { formatNumber } from "@/lib/utils/rank";
import FadeInView from "../FadeInView";
import { SkeletonTableRow } from "../Skeleton";
import OutlinedParaBtn from "../ui/OutlinedParaBtn";

type Leader = {
  id: string;
  nickname: string;
  rank: string;
  totalReachAllTime: number;
  channelLogo: string | null;
};

const RANK_LABEL_EN: Record<string, string> = {
  UNRANKED: "Unranked",
  ROOKIE: "Rookie Monster",
  RISING: "Rising Monster",
  COLD: "Cold Monster",
};

const RANK_LABEL_AR: Record<string, string> = {
  UNRANKED: "غير مصنّف",
  ROOKIE: "مبتدئ مونستر",
  RISING: "صاعد مونستر",
  COLD: "كولد مونستر",
};

export default function TopMonstersSection() {
  const locale = useLocale();
  const isAr = locale === "ar";

  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setLeaders(d.data.slice(0, 5));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const HEADERS = isAr
    ? ["المرتبة", "صانع المحتوى", "التصنيف", "المشاهدات"]
    : ["Rank", "Creator", "Level", "Views"];

  return (
    <section
      id="leaderboard"
      className="w-full bg-black py-16 md:py-25 px-4 md:px-35 relative">
      <img
        src="/assets/textures/monster-texture.png"
        alt=""
        className="absolute size-full inset-x-0 top-8 z-1 object-cover"
      />
      <div className="container relative z-2">
        <FadeInView className="text-center mb-10 md:mb-14">
          <h2 className="header-larger tracking-wide font-display font-black text-white uppercase mb-3">
            {isAr ? "أفضل المونسترز" : "Top Monsters"}
          </h2>
          <p className="font-proxima text-[#ccccd0] txt-regular">
            {isAr ? "تنافس. احتل مكانك. سيطر." : "Compete. Rank. Dominate."}
          </p>
        </FadeInView>

        {/* Table — overflow-x on mobile so it stays intact */}
        <FadeInView delay={0.1}>
          <div className="overflow-x-auto">
            <div
              className="min-w-120 mx-auto border-s border-s-[#636363] px-4 md:px-8"
              style={{ maxWidth: "900px" }}>
              {/* Header */}
              <div className="grid grid-cols-[60px_1fr_1fr_1fr] border-b border-[#272727] pb-3">
                {HEADERS.map((h, i) => (
                  <span
                    key={i}
                    className="font-display font-bold text-white uppercase"
                    style={{ fontSize: "13px", letterSpacing: "0.08em" }}>
                    {h}
                  </span>
                ))}
              </div>

              {/* Skeleton */}
              {loading &&
                Array.from({ length: 5 }).map((_, i) => (
                  <SkeletonTableRow
                    key={i}
                    cols={4}
                    className="grid-cols-[60px_1fr_1fr_1fr]"
                  />
                ))}

              {/* Empty */}
              {!loading && leaders.length === 0 && (
                <div className="py-12 text-center font-proxima text-[#ccccd0] txt-regular">
                  {isAr ? "لا توجد بيانات بعد" : "No ambassadors ranked yet."}
                </div>
              )}

              {/* Rows */}
              {!loading &&
                leaders.map((leader, i) => {
                  const levelLabel = isAr
                    ? (RANK_LABEL_AR[leader.rank] ?? leader.rank)
                    : (RANK_LABEL_EN[leader.rank] ?? leader.rank);

                  return (
                    <motion.div
                      key={leader.id}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: i * 0.07 }}
                      className="grid grid-cols-[60px_1fr_1fr_1fr] py-4 border-b border-[#272727] hover:bg-[#0a0a0a] transition-colors items-center">
                      <span className="font-proxima text-[#ccccd0] txt-regular">
                        {i + 1}
                      </span>
                      <span className="font-proxima text-[#ccccd0] txt-regular truncate">
                        {leader.nickname}
                      </span>
                      <span className="font-proxima text-[#ccccd0] txt-regular">
                        {levelLabel}
                      </span>
                      <span className="font-proxima text-[#ccccd0] txt-regular tabular-nums">
                        {formatNumber(leader.totalReachAllTime)}
                      </span>
                    </motion.div>
                  );
                })}
            </div>
          </div>
        </FadeInView>

        <div className="flex justify-center mt-8 md:mt-10">
          
          <OutlinedParaBtn href={`/${locale}/leaderboard`} withBorder>
            {isAr ? "لوحة الصدارة الكاملة" : "Full Leaderboard"}
          </OutlinedParaBtn>
        </div>
      </div>
    </section>
  );
}
