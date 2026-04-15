// src/components/ui/CanLevelMeter.tsx
"use client";
import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { useLocale } from "next-intl";
import {
  RANK_THRESHOLDS,
  MIN_CONTENT,
  MIN_MONTHS,
  MONTH_RANGE,
  getRankProgress,
  getMonthsInProgram,
  formatNumber,
} from "@/lib/utils/rank";

const RANK_CAN: Record<string, string> = {
  UNRANKED: "/assets/program/ranks-can.png",
  ROOKIE:   "/assets/program/ranks-can.png",
  MEGA:     "/assets/program/ranks-can.png",
  RISING:   "/assets/program/ranks-can.png",
  ELITE:    "/assets/program/ranks-can.png",
  COLD:     "/assets/program/ranks-can.png",
};

const RANK_COLOR: Record<string, string> = {
  UNRANKED: "#6b7280",
  ROOKIE:   "#78be20",
  MEGA:     "#9ce63a",
  RISING:   "#a3e635",
  ELITE:    "#bef264",
  COLD:     "#38bdf8",
};

type ContentCounts = {
  pictureCount:   number;
  storyCount:     number;
  reelCount:      number;
  longVideoCount: number;
  postCount:      number;
};

type Props = {
  rank:             string;
  currentRankReach: number;
  approvedAt?:      Date | null;
  content:          ContentCounts;
  className?:       string;
};

const CONTENT_TYPE_REQ: Record<string, number> = {
  UNRANKED: Math.ceil(8  / 5), // 2 each → total 8
  ROOKIE:   Math.ceil(32 / 5), // 7 each → total ~35 (round up)
  MEGA:     Math.ceil(32 / 5),
  RISING:   Math.ceil(56 / 5), // 12 each → total ~60
  ELITE:    Math.ceil(56 / 5),
  COLD:     0,
};

export default function CanLevelMeter({ rank, currentRankReach, approvedAt, content, className = "" }: Props) {
  const locale  = useLocale();
  const isAr    = locale === "ar";
  const color   = RANK_COLOR[rank] ?? "#78be20";
  const progress = getRankProgress(rank, currentRankReach);
  const threshold = RANK_THRESHOLDS[rank] ?? 0;
  const isCold  = rank === "COLD";

  // Month progress
  const monthsIn   = getMonthsInProgram(approvedAt ?? null);
  const minMonths  = MIN_MONTHS[rank] ?? 0;
  const [, maxMonth] = MONTH_RANGE[rank] ?? [0, 1];
  const monthDisplay = `${Math.min(monthsIn, maxMonth)} / ${maxMonth}`;

  // Per-type counts and per-rank requirement
  const typeReq = CONTENT_TYPE_REQ[rank] ?? 0;
  const types = [
    { key: "Pic",   val: content.pictureCount   },
    { key: "Story", val: content.storyCount     },
    { key: "Reel",  val: content.reelCount      },
    { key: "Video", val: content.longVideoCount  },
    { key: "Post",  val: content.postCount       },
  ];

  const fillSpring = useSpring(0, { stiffness: 45, damping: 18 });

  useEffect(() => {
    const timer = setTimeout(() => fillSpring.set(isCold ? 1 : Math.min(progress, 1)), 400);
    return () => clearTimeout(timer);
  }, [progress, fillSpring, isCold]);

  const clipInset = useTransform(
    fillSpring,
    (v) => `inset(${Math.round((1 - v) * 100)}% 0% 0% 0%)`
  );

  const pct = isCold ? 100 : Math.round(progress * 100);

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>

      <p className="font-display font-black uppercase text-lg leading-none" style={{ color }}>
        {rank.replace(/_/g, " ")}
      </p>

      <div className="relative" style={{ width: "120px", height: "200px" }}>
        <img
          src={RANK_CAN[rank] ?? RANK_CAN.UNRANKED}
          alt=""
          aria-hidden
          draggable={false}
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          style={{ filter: "grayscale(100%) brightness(0.25)" }}
        />

        <motion.img
          src={RANK_CAN[rank] ?? RANK_CAN.UNRANKED}
          alt={`${rank} can`}
          draggable={false}
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          style={{ clipPath: clipInset }}
        />

        {(pct >= 99 || isCold) && (
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(ellipse at 50% 85%, ${color}30 0%, transparent 65%)` }} />
        )}

        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2
          bg-black border border-zinc-700 rounded-full px-2.5 py-0.5
          font-display font-black text-xs whitespace-nowrap"
          style={{ color }}>
          {isCold ? "MAX" : `${pct}%`}
        </div>
      </div>

      <div className="w-full mt-3 space-y-1">
        <div className="flex justify-between txt-smaller text-zinc-500">
          <span>{isAr ? "الوصول" : "Reach"}</span>
          <span style={{ color }}>
            {formatNumber(currentRankReach)}
            {!isCold && ` / ${formatNumber(threshold)}`}
          </span>
        </div>
        <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: color }}
            initial={{ width: "0%" }}
            animate={{ width: `${Math.min(pct, 100)}%` }}
            transition={{ duration: 1, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>
      </div>

      {/* Month progress */}
      <div className="w-full flex items-center justify-between txt-smaller">
        <span className="text-zinc-500">{isAr ? "الأشهر" : "Months"}</span>
        <span className="font-semibold" style={{ color: monthsIn >= minMonths ? color : "#facc15" }}>
          {monthDisplay}
        </span>
      </div>

      {/* Per-type content counts x/req */}
      {typeReq > 0 && (
        <div className="w-full grid grid-cols-5 gap-1">
          {types.map(({ key, val }) => {
            const met = val >= typeReq;
            return (
              <div key={key} className="flex flex-col items-center bg-zinc-900 border border-zinc-800 rounded-lg p-1.5">
                <span className="font-display font-bold text-sm leading-none"
                  style={{ color: met ? color : "white" }}>
                  {val}/{typeReq}
                </span>
                <span className="txt-smaller text-zinc-500 mt-0.5">{key}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}