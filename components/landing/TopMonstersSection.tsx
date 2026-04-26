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
        className="absolute size-full inset-x-0 top-8 z-1 object-cover object-top max-lg:object-[70%]"
      />
      <div className="container px-8 md:px-16 lg:px-28 xl:px-40 relative z-2">
        <FadeInView className="text-center mb-10 md:mb-14">
          <h2 className="header-larger tracking-wide font-display font-black text-white uppercase">
            {isAr ? "أفضل المونسترز" : "Top Monsters"}
          </h2>
          <p className="font-proxima text-[#ccc] txt-large">
            {isAr ? "تنافس. احتل مكانك. سيطر." : "Compete. Rank. Dominate."}
          </p>
        </FadeInView>

        <FadeInView delay={0.1}>
          <div className="border-4 bg-black/70 border-[#22bb39] rounded-lg px-4 md:px-8 pt-2">
            {/* ── Desktop header (md+) ── */}
            <div className="hidden md:grid grid-cols-[60px_1fr_1fr_1fr] py-3">
              {HEADERS.map((h, i) => (
                <span
                  key={i}
                  className="font-display font-bold text-white uppercase"
                  style={{ fontSize: "13px", letterSpacing: "0.08em" }}>
                  {h}
                </span>
              ))}
            </div>

            {/* ── Mobile header — Level + Views labels only, aligned to their cols ── */}
            <div className="md:hidden grid grid-cols-[1fr_1fr_1fr] py-2">
              <span />
              <span
                className="font-display font-bold text-[#22bb39] uppercase"
                style={{ fontSize: "10px", letterSpacing: "0.08em" }}>
                {HEADERS[2]}
              </span>
              <span
                className="font-display font-bold text-[#22bb39] uppercase"
                style={{ fontSize: "10px", letterSpacing: "0.08em" }}>
                {HEADERS[3]}
              </span>
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
                    className={`hover:bg-[#0a0a0a]/50 transition-colors py-3
                      ${i === leaders.length - 1 ? "" : "border-b border-[#22bb39]"}`}>
                    {/* ── Desktop row (md+) ── */}
                    <div className="hidden md:grid grid-cols-[60px_1fr_1fr_1fr] items-center text-[#ccc]">
                      <span className="txt-regular">{i + 1}</span>
                      <span className="txt-regular truncate">
                        {leader.nickname}
                      </span>
                      <span className="txt-regular">{levelLabel}</span>
                      <span className="txt-regular tabular-nums">
                        {formatNumber(leader.totalReachAllTime)}
                      </span>
                    </div>

                    {/* ── Mobile row — single line, 3 equal cols ── */}
                    <div className="md:hidden grid grid-cols-[1fr_1fr_1fr] items-center gap-x-2">
                      {/* Col 1: #rank + name, name capped at ~50% so it can't push others */}
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span
                          className="font-display font-black text-[#22bb39] shrink-0"
                          style={{ fontSize: "11px", letterSpacing: "0.1em" }}>
                          #{i + 1}
                        </span>
                        <span className="font-proxima txt-regular text-white font-semibold truncate">
                          {leader.nickname}
                        </span>
                      </div>
                      {/* Col 2: Level */}
                      <span className="font-proxima txt-regular text-[#ccc] truncate">
                        {levelLabel}
                      </span>
                      {/* Col 3: Views */}
                      <span className="font-proxima txt-regular text-[#ccc] tabular-nums">
                        {formatNumber(leader.totalReachAllTime)}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
