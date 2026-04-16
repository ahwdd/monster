// src/app/[locale]/leaderboard/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import PageTitle from "@/components/ui/PageTitle";
import SkewBtn from "@/components/ui/SkewBtn";
import { getRankConfig } from "@/lib/data/program";
import { formatNumber } from "@/lib/utils/rank";

type Leader = {
  id: string;
  nickname: string;
  rank: string;
  totalReachAllTime: number;
  currentRankReach: number;
  channelLogo: string | null;
};

const RANK_STARS: Record<string, number> = {
  UNRANKED: 1,
  ROOKIE: 2,
  MEGA: 2,
  RISING: 3,
  ELITE: 3,
  COLD: 4,
};

function Stars({ count, color }: { count: number; color: string }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 4 }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 14 14" fill="none">
          <polygon
            points="7,1 8.5,5.5 13,5.5 9.5,8.5 11,13 7,10 3,13 4.5,8.5 1,5.5 5.5,5.5"
            fill={i < count ? color : "#374151"}
          />
        </svg>
      ))}
    </div>
  );
}

export default function LeaderboardPage() {
  const locale = useLocale();
  const isAr = locale === "ar";

  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setLeaders(d.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <PageTitle title={isAr ? "لوحة الصدارة" : "Leaderboard"} />

      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 mt-10 mb-20">
        {loading ? (
          <div className="flex justify-center py-24">
            <div className="w-10 h-10 border-2 border-[#78be20] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : leaders.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-proxima txt-regular text-zinc-500">
              {isAr ? "لا توجد بيانات بعد" : "No ambassadors ranked yet."}
            </p>
          </div>
        ) : (
          <div className="space-y-2 sm:space-y-0">
            {leaders.map((leader, i) => {
              const rankCfg = getRankConfig(leader.rank);
              const stars = RANK_STARS[leader.rank] ?? 1;
              const initial = leader.nickname?.charAt(0)?.toUpperCase() ?? "?";
              const isFirst = i === 0;

              return (
                <motion.div
                  key={leader.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="relative overflow-hidden"
                  style={{
                    background: isFirst
                      ? `linear-gradient(90deg, ${rankCfg.color}08 0%, transparent 60%)`
                      : "transparent",
                    borderBottom: `1px solid ${isFirst ? rankCfg.color + "50" : "#1f1f1f"}`,
                  }}>
                  <div
                    className="absolute inset-y-0 inset-s-0 w-1"
                    style={{ background: rankCfg.color }}
                  />

                  {/* ── MOBILE: stacked card ─────────────────────── */}
                  <div className="sm:hidden ps-4 pe-3 py-3 space-y-2.5">
                    {/* Row 1: avatar + name + rank */}
                    <div className="flex items-center gap-3">
                      <div className="relative shrink-0 w-11 h-11">
                        {leader.channelLogo ? (
                          <Image
                            src={leader.channelLogo}
                            alt={leader.nickname}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div
                            className="w-full h-full flex items-center justify-center
                            font-display font-black text-lg"
                            style={{
                              background: `${rankCfg.color}20`,
                              color: rankCfg.color,
                            }}>
                            {initial}
                          </div>
                        )}
                        {/* Placement badge */}
                        <div
                          className="absolute -top-1 -inset-s-1 w-4 h-4 rounded-full
                          flex items-center justify-center font-display font-black text-black"
                          style={{
                            background: rankCfg.color,
                            fontSize: "0.45rem",
                          }}>
                          {i + 1}
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p
                          className="font-display font-black uppercase text-base leading-none mb-0.5 truncate"
                          style={{ color: rankCfg.color }}>
                          {leader.nickname}
                        </p>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <Stars count={stars} color={rankCfg.color} />
                          <span className="txt-smaller text-zinc-500 uppercase">
                            {isAr ? rankCfg.labelAr : rankCfg.label}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Row 2: stats */}
                    <div className="flex items-center gap-6 border-t border-zinc-800/50 pt-2">
                      <div>
                        <p
                          className="font-display font-black text-lg leading-none"
                          style={{ color: rankCfg.color }}>
                          {formatNumber(leader.totalReachAllTime)}
                        </p>
                        <p className="txt-smaller text-zinc-500 uppercase tracking-widest">
                          {isAr ? "الوصول" : "REACH"}
                        </p>
                      </div>
                      <div className="ms-auto text-end">
                        <p className="font-display font-black text-lg leading-none text-white">
                          #{i + 1}
                        </p>
                        <p className="txt-smaller text-zinc-500 uppercase tracking-widest">
                          {isAr ? "المرتبة" : "RANK"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ── DESKTOP: roster row ──────────────────────── */}
                  <div className="hidden sm:flex items-stretch">
                    {/* Avatar */}
                    <div className="relative shrink-0 self-center ms-1 -my-1 w-18 h-18">
                      {leader.channelLogo ? (
                        <Image
                          src={leader.channelLogo}
                          alt={leader.nickname}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center
                          font-display font-black text-2xl"
                          style={{
                            background: `${rankCfg.color}20`,
                            color: rankCfg.color,
                          }}>
                          {initial}
                        </div>
                      )}
                      <div
                        className="absolute -top-1 -inset-s-1 w-5 h-5 rounded-full
                        flex items-center justify-center font-display font-black text-black"
                        style={{
                          background: rankCfg.color,
                          fontSize: "0.55rem",
                        }}>
                        {i + 1}
                      </div>
                    </div>

                    {/* Identity */}
                    <div className="flex-1 min-w-0 px-4 py-3 flex flex-col justify-center">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span
                          className="font-display font-black uppercase text-xl leading-none"
                          style={{ color: rankCfg.color }}>
                          {leader.nickname}
                        </span>
                        <span className="font-proxima font-semibold uppercase txt-small text-zinc-500">
                          / {isAr ? rankCfg.labelAr : rankCfg.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Stars count={stars} color={rankCfg.color} />
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="w-px self-stretch bg-zinc-800 my-3 shrink-0" />

                    {/* Stats */}
                    <div className="flex items-center shrink-0">
                      <div
                        className="px-4 md:px-6 py-3 text-center"
                        style={{ minWidth: "90px" }}>
                        <p
                          className="font-display font-black text-xl md:text-2xl leading-none"
                          style={{ color: rankCfg.color }}>
                          {formatNumber(leader.totalReachAllTime)}
                        </p>
                        <p className="txt-smaller text-zinc-500 uppercase tracking-widest mt-1">
                          {isAr ? "الوصول" : "REACH"}
                        </p>
                      </div>
                      <div className="w-px self-stretch bg-zinc-800 my-3 shrink-0" />
                      <div
                        className="px-4 md:px-6 py-3 text-center"
                        style={{ minWidth: "64px" }}>
                        <p className="font-display font-black text-xl md:text-2xl leading-none text-white">
                          #{i + 1}
                        </p>
                        <p className="txt-smaller text-zinc-500 uppercase tracking-widest mt-1">
                          {isAr ? "المرتبة" : "RANK"}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* CTA */}
        <div
          className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-center gap-4 sm:gap-6
          border-t border-[#171717] pt-8 sm:pt-12">
          <p className="font-proxima txt-regular text-zinc-500 sm:me-auto text-center sm:text-start">
            {isAr
              ? "هل أنت صانع محتوى؟ سجّل الآن وحقق مكانك."
              : "Are you a creator? Register now and earn your spot."}
          </p>
          <SkewBtn
            href={`/${locale}/submissions/register`}
            text={isAr ? "سجّل الآن" : "REGISTER NOW"}
          />
        </div>
      </div>
    </div>
  );
}
