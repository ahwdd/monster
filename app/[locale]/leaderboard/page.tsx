// src/app/[locale]/leaderboard/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/Header";
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

// XD rank label map
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

  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* XD: breadcrumb bar same pattern as AuthShell */}
      <div className="mt-20 border-b border-[#171717]">
        <div
          className="max-w-480 mx-auto px-35 h-14.5 flex items-center gap-3
          font-proxima text-[#ccccd0] text-sm">
          <Link
            href={`/${locale}`}
            className="hover:text-white transition-colors">
            {isAr ? "الرئيسية" : "Home"}
          </Link>
          <span className="text-[#555]">›</span>
          <span>{isAr ? "لوحة الصدارة" : "Leaderboard"}</span>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-480 mx-auto px-35 py-16">
        {/* XD: heading + subtitle (same pattern as sec6 in Home) */}
        <div className="text-center mb-14">
          <h1
            className="font-display font-black text-white uppercase mb-3"
            style={{
              fontSize: "clamp(2rem, 3.5vw, 4rem)",
              letterSpacing: "0.03em",
            }}>
            {isAr ? "لوحة الصدارة" : "Leaderboard"}
          </h1>
          <p
            className="font-proxima text-[#ccccd0]"
            style={{ fontSize: "14px" }}>
            {isAr ? "تنافس. احتل مكانك. سيطر." : "Compete. Rank. Dominate."}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <div className="w-10 h-10 border-2 border-[#6bd41a] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : leaders.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-proxima text-[#ccccd0] text-sm">
              {isAr ? "لا توجد بيانات بعد" : "No ambassadors ranked yet."}
            </p>
          </div>
        ) : (
          <div className="max-w-275 mx-auto">
            {/* XD table header — white text */}
            <div
              className="grid grid-cols-[80px_1fr_240px_160px] gap-6
              pb-3 border-b border-[#272727]">
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

            {/* XD rows — #ccccd0 text, #272727 dividers */}
            {leaders.map((leader, i) => {
              const initial = leader.nickname?.charAt(0)?.toUpperCase() ?? "?";
              const labelEn = RANK_LABEL_EN[leader.rank] ?? leader.rank;
              const labelAr = RANK_LABEL_AR[leader.rank] ?? leader.rank;

              return (
                <motion.div
                  key={leader.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  className="grid grid-cols-[80px_1fr_240px_160px] gap-6 py-5
                    border-b border-[#272727] items-center
                    hover:bg-[#0a0a0a] transition-colors">
                  {/* Rank number */}
                  <span
                    className="font-proxima text-[#ccccd0]"
                    style={{ fontSize: "14px" }}>
                    {i + 1}
                  </span>

                  {/* Creator — avatar + nickname */}
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
                        <div
                          className="w-full h-full flex items-center justify-center
                          font-display font-black text-[#ccccd0]"
                          style={{ fontSize: "1rem" }}>
                          {initial}
                        </div>
                      )}
                    </div>
                    <span
                      className="font-proxima text-[#ccccd0] truncate"
                      style={{ fontSize: "14px" }}>
                      {leader.nickname}
                    </span>
                  </div>

                  {/* Level — plain text, no pill */}
                  <span
                    className="font-proxima text-[#ccccd0]"
                    style={{ fontSize: "14px" }}>
                    {isAr ? labelAr : labelEn}
                  </span>

                  {/* Views */}
                  <span
                    className="font-proxima text-[#ccccd0]"
                    style={{ fontSize: "14px" }}>
                    {formatNumber(leader.totalReachAllTime)}
                  </span>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* XD sec7 CTA strip — same green strip as landing */}
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
        <p
          className="font-proxima text-white mb-8"
          style={{ fontSize: "15px" }}>
          {isAr
            ? "لن نطور أداءك فحسب."
            : "Join the program and prove your performance."}
        </p>
        <Link
          href={`/${locale}/submissions/register`}
          className="inline-flex items-center justify-center h-12 px-12
            bg-black text-white font-display font-black uppercase tracking-[2px] text-sm
            hover:bg-[#111] transition-colors">
          {isAr ? "انضم الآن" : "Join Now"}
        </Link>
      </div>

      {/* Footer — reuse same pattern as AuthShell */}
      <footer className="bg-black border-t border-[#272727]">
        <div
          className="max-w-480 mx-auto px-35 h-14.5 flex items-center justify-between
          font-proxima text-[#ccccd0] text-[13px]">
          <span>© 2026 Monster Energy Ambassadors Program.</span>
          <Link
            href={`/${locale}/program`}
            className="hover:text-white transition-colors">
            Terms & Conditions
          </Link>
        </div>
      </footer>
    </div>
  );
}
