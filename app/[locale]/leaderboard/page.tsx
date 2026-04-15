// src/app/[locale]/leaderboard/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { IoArrowForward, IoArrowBack } from "react-icons/io5";
import PageTitle from "@/components/ui/PageTitle";
import SkewBtn from "@/components/ui/SkewBtn";
import { getRankConfig, LEADERBOARD_POSITION_STYLES } from "@/lib/data/program";
import { formatNumber } from "@/lib/utils/rank";
import Header from "@/components/Header";

type Leader = {
  id: string;
  nickname: string;
  rank: string;
  totalReachAllTime: number;
  currentRankReach: number;
  channelLogo: string | null;
};

// Star rating — max 4 stars, scale by rank
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
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="none">
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
  const isRTL = locale === "ar";
  const Arrow = isRTL ? IoArrowBack : IoArrowForward;

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
      <PageTitle title={locale === "ar" ? "لوحة الصدارة" : "Leaderboard"} />

      <div className="w-full max-w-325 mx-auto mt-15 mb-20">
        <div className="px-6">
          {loading ? (
            <div className="flex justify-center py-24">
              <div className="w-10 h-10 border-2 border-[#78be20] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : leaders.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-proxima txt-regular text-zinc-500">
                {locale === "ar"
                  ? "لا توجد بيانات بعد"
                  : "No ambassadors ranked yet."}
              </p>
            </div>
          ) : (
            <div className="space-y-0">
              {leaders.map((leader, i) => {
                const rankCfg = getRankConfig(leader.rank);
                const stars = RANK_STARS[leader.rank] ?? 1;
                const initial =
                  leader.nickname?.charAt(0)?.toUpperCase() ?? "?";
                const isFirst = i === 0;
                const placement = `#${i + 1}`;

                return (
                  <motion.div
                    key={leader.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    // Outer border — accent green on first, otherwise subtle
                    className="relative flex items-stretch overflow-hidden"
                    style={{
                      borderBottom: `1px solid ${isFirst ? rankCfg.color + "60" : "#1f1f1f"}`,
                      background: isFirst
                        ? `linear-gradient(90deg, ${rankCfg.color}08 0%, transparent 50%)`
                        : "transparent",
                    }}>
                    {/* Rank-color left accent bar */}
                    <div
                      className="w-1 shrink-0 self-stretch"
                      style={{ background: rankCfg.color }}
                    />

                    {/* Avatar — square, slightly negative top (like reference) */}
                    <div
                      className="relative shrink-0 self-center -my-1"
                      style={{
                        width: "72px",
                        height: "72px",
                        marginLeft: "0",
                      }}>
                      {leader.channelLogo ? (
                        <Image
                          src={leader.channelLogo}
                          alt={leader.nickname}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center font-display font-black text-2xl"
                          style={{
                            background: `${rankCfg.color}20`,
                            color: rankCfg.color,
                          }}>
                          {initial}
                        </div>
                      )}
                      {/* Placement badge */}
                      <div
                        className="absolute -top-1 -start-1 w-5 h-5 rounded-full flex items-center
                          justify-center font-display font-black text-black"
                        style={{
                          background: rankCfg.color,
                          fontSize: "0.55rem",
                        }}>
                        {i + 1}
                      </div>
                    </div>

                    {/* Identity block */}
                    <div className="flex-1 min-w-0 px-4 py-3 flex flex-col justify-center">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span
                          className="font-display font-black uppercase text-xl leading-none"
                          style={{ color: rankCfg.color }}>
                          {leader.nickname}
                        </span>
                        <span className="font-proxima font-semibold uppercase txt-small text-zinc-500">
                          / {locale === "ar" ? rankCfg.labelAr : rankCfg.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Stars count={stars} color={rankCfg.color} />
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="w-px self-stretch bg-zinc-800 my-3 shrink-0" />

                    {/* Stats — reach + placement */}
                    <div className="flex items-center divide-x divide-zinc-800 shrink-0">
                      <div className="px-6 py-3 text-center min-w-[100px]">
                        <p
                          className="font-display font-black text-white text-2xl leading-none"
                          style={{ color: rankCfg.color }}>
                          {formatNumber(leader.totalReachAllTime)}
                        </p>
                        <p className="txt-smaller text-zinc-500 uppercase tracking-widest mt-1">
                          {locale === "ar" ? "إجمالي الوصول" : "TOTAL REACH"}
                        </p>
                      </div>
                      <div className="px-6 py-3 text-center min-w-[80px]">
                        <p className="font-display font-black text-white text-2xl leading-none">
                          {placement}
                        </p>
                        <p className="txt-smaller text-zinc-500 uppercase tracking-widest mt-1">
                          {locale === "ar" ? "المرتبة" : "RANK"}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 flex flex-col sm:flex-row items-center gap-6 border-t border-[#171717] pt-12">
            <p className="font-proxima txt-regular text-zinc-500 sm:me-auto">
              {locale === "ar"
                ? "هل أنت صانع محتوى؟ سجّل الآن وحقق مكانك."
                : "Are you a creator? Register now and earn your spot."}
            </p>
            <SkewBtn
              href={`/${locale}/submissions/register`}
              text={locale === "ar" ? "سجّل الآن" : "REGISTER NOW"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
