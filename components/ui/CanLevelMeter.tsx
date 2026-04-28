// src/components/ui/CanLevelMeter.tsx
"use client";
import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect }   from "react";
import { useLocale }   from "next-intl";
import {
  RANK_THRESHOLDS,
  MIN_MONTHS,
  MONTH_RANGE,
  getRankProgress,
  getMonthsInProgram,
  formatNumber,
} from "@/lib/utils/rank";

const CAN_IMG = "/assets/flavors/original.webp";

const RANK_COLOR: Record<string, string> = {
  UNRANKED: "#6b7280",
  ROOKIE:   "#78be20",
  MEGA:     "#9ce63a",
  RISING:   "#a3e635",
  ELITE:    "#bef264",
  COLD:     "#38bdf8",
};

const CONTENT_TYPE_REQ: Record<string, number> = {
  UNRANKED: 8,   // 8  / 5 → 2
  ROOKIE:   32,   // 32 / 5 → 7 (rounds up; total ~35)
  MEGA:     32,
  RISING:   56,  // 56 / 5 → 12 (~60)
  ELITE:    56,
  COLD:     56,   // max rank
};

type ContentCounts = {
  pictureCount: number;
  storyCount: number;
  reelCount: number;
  longVideoCount: number;
  postCount: number;
  liveCount: number;
  streamCount: number;
};

type Props = {
  rank:             string;
  currentRankReach: number;
  approvedAt?:      Date | null;
  content:          ContentCounts;
  className?:       string;
};

export default function CanLevelMeter({ rank, currentRankReach, approvedAt, content, className = "" }: Props) {
  const locale = useLocale();
  const isAr   = locale === "ar";
  const color  = RANK_COLOR[rank] ?? "#78be20";
  const isCold = rank === "COLD";

  const progress  = getRankProgress(rank, currentRankReach);
  const threshold = RANK_THRESHOLDS[rank] ?? 0;
  const pct       = isCold ? 100 : Math.round(Math.min(progress, 1) * 100);

  const fillSpring = useSpring(0, { stiffness: 45, damping: 18 });

  useEffect(() => {
    const timer = setTimeout(
      () => fillSpring.set(isCold ? 1 : Math.min(progress, 1)),
      400
    );
    return () => clearTimeout(timer);
  }, [progress, fillSpring, isCold]);

  const clipInset = useTransform(
    fillSpring,
    (v) => `inset(${Math.round((1 - v) * 100)}% 0% 0% 0%)`
  );

  const monthsIn     = getMonthsInProgram(approvedAt ?? null);
  const minMonths    = MIN_MONTHS[rank] ?? 0;
  const [, maxMonth] = MONTH_RANGE[rank] ?? [0, 1];
  const monthDisplay = `${Math.min(monthsIn, maxMonth)} / ${maxMonth}`;
  const monthMet     = monthsIn >= minMonths;

  const typeReq = CONTENT_TYPE_REQ[rank] ?? 0;
  const types = [
    { key: isAr ? "صورة"  : "Pic",   val: content.pictureCount   },
    { key: isAr ? "ستوري" : "Story", val: content.storyCount     },
    { key: isAr ? "ريل"   : "Reel",  val: content.reelCount      },
    { key: isAr ? "فيديو" : "Video", val: content.longVideoCount  },
    { key: isAr ? "بوست"  : "Post",  val: content.postCount       },
  ];

  return (
    <div className={`flex flex-col items-center gap-4 w-full ${className}`}>

      <p className="font-display font-black uppercase text-xl leading-none tracking-wide"
        style={{ color }}>
        {rank.replace(/_/g, " ")}
      </p>

      <div className="relative" style={{ width: "120px", height: "200px" }}>

        <img
          src={CAN_IMG}
          alt=""
          aria-hidden
          draggable={false}
          className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
          style={{ filter: "grayscale(100%) brightness(0.22)" }}
        />

        <motion.img
          src={CAN_IMG}
          alt={`${rank} rank`}
          draggable={false}
          className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
          style={{ clipPath: clipInset }}
        />

        {(pct >= 99 || isCold) && (
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(ellipse at 50% 85%, ${color}35 0%, transparent 65%)` }} />
        )}

        <div
          className="absolute -bottom-4 left-1/2 -translate-x-1/2
            bg-black border border-zinc-700 rounded-full
            px-2.5 py-0.5 font-display font-black text-xs whitespace-nowrap"
          style={{ color }}
        >
          {isCold ? (isAr ? "الحد الأقصى" : "MAX") : `${pct}%`}
        </div>
      </div>

      <div className="w-full mt-4 space-y-1.5">
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
            transition={{ duration: 1.0, delay: 0.55, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>
      </div>

      <div className="w-full flex items-center justify-between txt-smaller border-t border-zinc-800 pt-3">
        <span className="text-zinc-500">{isAr ? "الأشهر في البرنامج" : "Months in program"}</span>
        <span className="font-semibold tabular-nums" style={{ color: monthMet ? color : "#facc15" }}>
          {monthDisplay}
        </span>
      </div>

      {typeReq > 0 && (
        <div className="w-full grid grid-cols-5 gap-1">
          {types.map(({ key, val }) => {
            const met = val >= typeReq;
            return (
              <div key={key}
                className="flex flex-col items-center bg-zinc-900 border border-zinc-800 rounded-lg py-1.5 px-1">
                <span
                  className="font-display font-bold leading-none"
                  style={{ fontSize: "0.8rem", color: met ? color : "white" }}
                >
                  {val}/{typeReq}
                </span>
                <span className="txt-smaller text-zinc-500 mt-0.5 text-center leading-none">{key}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}