// src/app/[locale]/leaderboard/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { formatNumber } from "@/lib/utils/rank";
import Header from "@/components/Header";
import FadeInView from "@/components/animation/FadeInView";
import { SkeletonTableRow } from "@/components/Skeleton";

type Leader = {
  id: string;
  nickname: string;
  rank: string;
  totalReachAllTime: number;
  currentRankReach: number;
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

  const HEADERS = isAr
    ? ["المرتبة", "صانع المحتوى", "التصنيف", "المشاهدات"]
    : ["Rank", "Creator", "Level", "Views"];

  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* Breadcrumb bar */}
      <div className="mt-20 border-b border-[#171717]">
        <div
          className="container px-35 flex items-center gap-3 font-proxima text-[#ccccd0] txt-regular"
          style={{ height: "58px" }}>
          <Link href={`/`} className="hover:text-white transition-colors">
            {isAr ? "الرئيسية" : "Home"}
          </Link>
          <span className="text-[#555]">›</span>
          <span>{isAr ? "لوحة الصدارة" : "Leaderboard"}</span>
        </div>
      </div>

      <div className="container px-35 py-16">
        <FadeInView className="text-center mb-14">
          <h1
            className="font-display font-black text-white uppercase mb-3"
            style={{
              fontSize: "clamp(2rem, 3.5vw, 4rem)",
              letterSpacing: "0.03em",
            }}>
            {isAr ? "لوحة الصدارة" : "Leaderboard"}
          </h1>
          <p className="font-proxima text-[#ccccd0] txt-regular">
            {isAr ? "تنافس. احتل مكانك. سيطر." : "Compete. Rank. Dominate."}
          </p>
        </FadeInView>

        <FadeInView delay={0.1} className="max-w-225 mx-auto">
          {/* Table header — identical to TopMonstersSection */}
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

          {/* Skeleton rows */}
          {loading && (
            <>
              {Array.from({ length: 10 }).map((_, i) => (
                <SkeletonTableRow
                  key={i}
                  cols={4}
                  className="grid-cols-[80px_1fr_1fr_1fr]"
                />
              ))}
            </>
          )}

          {!loading && leaders.length === 0 && (
            <div className="py-16 text-center font-proxima text-[#ccccd0] txt-regular">
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
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  className="grid grid-cols-[80px_1fr_1fr_1fr] py-4 border-b border-[#272727] hover:bg-[#0a0a0a] transition-colors items-center">
                  <span className="font-proxima text-[#ccccd0] txt-regular">
                    {i + 1}
                  </span>

                  <div className="flex items-center gap-4 min-w-0">
                    <div className="relative w-10 h-10 shrink-0 overflow-hidden bg-[#171717]">
                      {leader.channelLogo ? (
                        <Image
                          src={leader.channelLogo}
                          alt={leader.nickname}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-display font-black text-[#ccccd0] txt-regular">
                          {initial}
                        </div>
                      )}
                    </div>
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
      </div>

      {/* XD: green CTA strip */}
      <div
        className="w-full py-16 text-center"
        style={{ background: "#6bd41a" }}>
        <h2
          className="font-display font-black text-white uppercase mb-4"
          style={{
            fontSize: "clamp(1.8rem, 3vw, 3rem)",
            letterSpacing: "0.03em",
          }}>
          {isAr ? "مستعد لتصبح مونستر؟" : "READY TO BECOME A MONSTER?"}
        </h2>
        <p className="font-proxima text-white mb-8 txt-larger">
          {isAr
            ? "انضم للبرنامج وأثبت نفسك."
            : "Join the program and prove your performance."}
        </p>
        <Link
          href={`/submissions/register`}
          className="inline-flex items-center justify-center h-12 px-12 bg-black text-white font-display font-black uppercase tracking-[2px] txt-small hover:bg-[#111] transition-colors">
          {isAr ? "انضم الآن" : "Join Now"}
        </Link>
      </div>

      {/* Footer */}
      <footer className="bg-black border-t border-[#272727]">
        <div
          className="container px-35 flex items-center justify-between font-proxima text-[#ccccd0]"
          style={{ height: "58px", fontSize: "13px" }}>
          <span>© 2026 Monster Energy Ambassadors Program.</span>
          <Link href={`/terms`} className="hover:text-white transition-colors">
            Terms & Conditions
          </Link>
        </div>
      </footer>
    </div>
  );
}
