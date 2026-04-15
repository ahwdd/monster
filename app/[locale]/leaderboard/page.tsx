"use client";

// src/app/[locale]/leaderboard/page.tsx
import { useEffect, useState } from "react";
import { useLocale }           from "next-intl";
import Image                   from "next/image";
import Link                    from "next/link";
import { motion }              from "framer-motion";
import { IoTrophyOutline, IoArrowForward, IoArrowBack } from "react-icons/io5";
import { formatNumber }                from "@/lib/utils/rank";
import { getRankConfig, LEADERBOARD_POSITION_STYLES } from "@/lib/data/program";

type Leader = {
  id:                string;
  nickname:          string;
  rank:              string;
  totalReachAllTime: number;
  currentRankReach:  number;
  channelLogo:       string | null;
  user: { firstName: string; lastName: string };
};

export default function LeaderboardPage() {
  const locale = useLocale();
  const isRTL  = locale === "ar";
  const Arrow  = isRTL ? IoArrowBack : IoArrowForward;

  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((r) => r.json())
      .then((d) => { if (d.success) setLeaders(d.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="pt-20 pb-16 relative overflow-hidden border-b border-zinc-900 bg-[#050505]">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 80% at 50% 100%, #78be20, transparent)" }} />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <IoTrophyOutline className="size-10 text-[#78be20] mx-auto mb-4" />
          <h1 className="font-display font-black text-white uppercase text-5xl md:text-6xl leading-none mb-4">
            {locale === "ar" ? "لوحة الصدارة" : "LEADERBOARD"}
          </h1>
          <p className="txt-regular text-zinc-400">
            {locale === "ar"
              ? "أفضل 5 سفراء مونستر مرتبين حسب إجمالي الوصول"
              : "The top 5 Monster Ambassadors ranked by total reach"}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {loading ? (
          <div className="flex justify-center py-24">
            <div className="w-10 h-10 border-2 border-[#78be20] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : leaders.length === 0 ? (
          <div className="text-center py-24">
            <p className="txt-regular text-zinc-500">
              {locale === "ar" ? "لا توجد بيانات بعد" : "No ambassadors ranked yet."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {leaders.map((leader, i) => {
              const rankCfg = getRankConfig(leader.rank);
              const posCfg  = LEADERBOARD_POSITION_STYLES[i] ?? LEADERBOARD_POSITION_STYLES[3];
              const initial = leader.nickname?.charAt(0)?.toUpperCase() ?? "?";
              const isTop3  = i < 3;

              return (
                <motion.div
                  key={leader.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-[#0a0a0a]"
                  style={isTop3 ? { boxShadow: `0 0 40px ${rankCfg.glow}` } : undefined}
                >
                  {/* Channel logo watermark */}
                  {leader.channelLogo && (
                    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
                      <div className="absolute ltr:right-0 rtl:left-0 top-0 bottom-0 w-2/5 opacity-[0.06]"
                        style={{ filter: "grayscale(100%) brightness(3)" }}>
                        <Image src={leader.channelLogo} alt="" fill className="object-contain object-center" />
                      </div>
                    </div>
                  )}

                  {/* Rank-color left bar */}
                  <div className="absolute ltr:left-0 rtl:right-0 top-0 bottom-0 w-1 rounded-full"
                    style={{ background: rankCfg.color }} />

                  <div className="relative z-10 p-5 ps-7 flex items-center gap-5 flex-wrap">
                    {/* Position badge */}
                    <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-display font-black txt-regular ${posCfg.orderBadge}`}>
                      {i + 1}
                    </div>

                    {/* Avatar */}
                    <div className={`relative shrink-0 ${posCfg.size} rounded-full overflow-hidden ${posCfg.ring} bg-zinc-900`}>
                      {leader.channelLogo ? (
                        <Image src={leader.channelLogo} alt={leader.nickname} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-display font-black"
                          style={{ background: `${rankCfg.color}20` }}>
                          <span className={posCfg.textSize} style={{ color: rankCfg.color }}>{initial}</span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-display font-black text-white text-xl uppercase truncate">
                          {leader.nickname}
                        </span>
                        <span
                          className="txt-smaller font-bold uppercase tracking-wide px-2 py-0.5 rounded-sm shrink-0"
                          style={{ color: rankCfg.color, background: `${rankCfg.color}15` }}
                        >
                          {locale === "ar" ? rankCfg.labelAr : rankCfg.label}
                        </span>
                      </div>
                      <p className="txt-smaller text-zinc-500 truncate">
                        {leader.user.firstName} {leader.user.lastName}
                      </p>
                    </div>

                    {/* Reach */}
                    <div className="shrink-0 ltr:text-right rtl:text-left">
                      <p className="font-display font-black text-2xl leading-none" style={{ color: rankCfg.color }}>
                        {formatNumber(leader.totalReachAllTime)}
                      </p>
                      <p className="txt-smaller text-zinc-500 uppercase tracking-wide">
                        {locale === "ar" ? "إجمالي الوصول" : "Total Reach"}
                      </p>
                      {leader.currentRankReach !== leader.totalReachAllTime && (
                        <p className="txt-smaller text-zinc-600 mt-0.5">
                          {formatNumber(leader.currentRankReach)} {locale === "ar" ? "في التصنيف الحالي" : "this rank"}
                        </p>
                      )}
                    </div>
                  </div>

                  {i === 0 && (
                    <div className="absolute top-3 ltr:right-4 rtl:left-4 text-yellow-400 text-xl select-none">👑</div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 pt-10 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <p className="txt-regular text-zinc-500 sm:me-4">
            {locale === "ar" ? "هل أنت صانع محتوى؟ انضم الآن وحقق مكانك." : "Are you a creator? Join now and earn your spot."}
          </p>
          <Link href={`/${locale}/submissions/register`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#78be20] hover:bg-[#8fd428]
              text-black font-display font-bold uppercase tracking-wider txt-small rounded-sm
              transition-all duration-200 hover:shadow-[0_0_20px_rgba(120,190,32,0.4)] group shrink-0">
            {locale === "ar" ? "سجّل الآن" : "Register Now"}
            <Arrow className="size-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}