// src/components/landing/TopMonstersSection.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { formatNumber } from "@/lib/utils/rank";
import FadeInView from "../FadeInView";
import { SkeletonTableRow } from "../Skeleton";

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
    <section id="leaderboard" className="w-full bg-black py-25 px-35 relative">
    <img src="/assets/textures/monster-texture.png" alt="" 
    className="absolute size-full inset-x-0 top-8 z-1 object-cover" />
      <div className="container relative z-2">
        <FadeInView className="text-center mb-14">
          <h2
            className="header-larger tracking-wide font-display font-black text-white uppercase mb-3">
            {isAr ? "أفضل المونسترز" : "Top Monsters"}
          </h2>
          <p className="font-proxima text-[#ccccd0] txt-regular">
            {isAr ? "تنافس. احتل مكانك. سيطر." : "Compete. Rank. Dominate."}
          </p>
        </FadeInView>

        <FadeInView delay={0.1} className="max-w-225 mx-auto px-8 border-s border-s-[#636363] rounded-l">
          {/* Table header */}
          <div className="grid grid-cols-[80px_1fr_1fr_1fr] border-b border-[#272727] pb-3">
            {HEADERS.map((h, i) => (
              <span
                key={i}
                className="font-display font-bold text-white uppercase"
                style={{ fontSize: "13px", letterSpacing: "0.08em" }}>
                {h}
              </span>
            ))}
          </div>

          {/* Loading skeletons */}
          {loading && (
            <>
              {Array.from({ length: 5 }).map((_, i) => (
                <SkeletonTableRow
                  key={i}
                  cols={4}
                  className="grid-cols-[80px_1fr_1fr_1fr]"
                />
              ))}
            </>
          )}

          {/* Rows */}
          {!loading && leaders.length === 0 && (
            <div className="py-12 text-center font-proxima text-[#ccccd0] txt-regular">
              {isAr ? "لا توجد بيانات بعد" : "No ambassadors ranked yet."}
            </div>
          )}

          {!loading &&
            leaders.map((leader, i) => {
              const initial = leader.nickname?.charAt(0)?.toUpperCase() ?? "?";
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
                  className="grid grid-cols-[80px_1fr_1fr_1fr] py-4 
                  border-b border-[#272727] hover:bg-[#0a0a0a] transition-colors items-center">
                  <span className="font-proxima text-[#ccccd0] txt-regular">
                    {i + 1}
                  </span>

                  {/* Creator with avatar */}
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="font-proxima text-[#ccccd0] txt-regular truncate">
                      {leader.nickname}
                    </span>
                  </div>

                  <span className="font-proxima text-[#ccccd0] txt-regular">
                    {levelLabel}
                  </span>
                  <span className="font-proxima text-[#ccccd0] txt-regular">
                    {formatNumber(leader.totalReachAllTime)}
                  </span>
                </motion.div>
              );
            })}
        </FadeInView>

        {/* Full leaderboard link */}
        <div className="flex justify-center mt-10">
          <Link
            href={`/${locale}/leaderboard`}
            className="h-12 px-10 flex items-center font-display font-bold uppercase tracking-[2px] txt-small border border-[#333] text-[#ccccd0] hover:border-white hover:text-white transition-colors">
            {isAr ? "لوحة الصدارة الكاملة" : "Full Leaderboard"}
          </Link>
        </div>
      </div>
    </section>
  );
}
