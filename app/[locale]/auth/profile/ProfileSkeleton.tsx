import Skeleton from "@/components/Skeleton";
import React from "react";
import { motion } from "framer-motion";

export default function ProfileSkeleton() {
  return (
    <div className="space-y-5 px-4 md:px-35 py-8">
      <div className="flex items-center gap-4">
        <Skeleton className="w-16 h-16 rounded-full shrink-0" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-6 w-44" />
          <Skeleton className="h-4 w-28" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Skeleton className="h-36 rounded-lg" />
        <Skeleton className="h-36 rounded-lg" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Skeleton className="h-24 rounded-lg" />
        <Skeleton className="h-24 rounded-lg" />
        <Skeleton className="h-24 rounded-lg" />
      </div>
      <Skeleton className="h-48 rounded-lg" />
    </div>
  );
}

export function ReqRow({
  label,
  current,
  max,
  color,
}: {
  label: string;
  current: number;
  max: number;
  color: string;
}) {
  const pct = max > 0 ? Math.min((current / max) * 100, 100) : 0;
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="txt-smaller text-[#ccccd0]">{label}</span>
        {/* current smaller + muted, / separator, max bigger + green */}
        <span className="tabular-nums flex items-baseline gap-0.5">
          <span className="txt-smaller text-[#666]">{current}&nbsp;/</span>
          <span className="txt-small font-bold" style={{ color: "#22bb39" }}>
            {max}
          </span>
        </span>
      </div>
      <div className="w-full bg-[#272727]" style={{ height: "4px" }}>
        <motion.div
          className="h-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
    </div>
  );
}

export function StatCard({
  label,
  current,
  target,
  targetColor,
  plain,
}: {
  label: string;
  current?: string;
  target?: string;
  targetColor?: string;
  /** pass plain + value for simple non-split display (e.g. "42 submissions") */
  plain?: string;
}) {
  return (
    <div className="bg-[#171717] rounded-lg px-5 py-4 flex flex-col gap-1.5">
      <p className="txt-smaller font-bold text-white uppercase tracking-wider">{label}</p>
      {plain !== undefined ? (
        <p
          className="font-black text-white leading-none"
          style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}>
          {plain}
        </p>
      ) : (
        <div className="flex items-baseline gap-1 leading-none">
          <span
            className="font-semibold tabular-nums"
            style={{ fontSize: "clamp(1rem, 1.8vw, 1.4rem)", color: "#ccccd0" }}>
            {current}&nbsp;/
          </span>
          <span
            className="font-black tabular-nums"
            style={{
              fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
              color: targetColor ?? "#22bb39",
            }}>
            {target}
          </span>
        </div>
      )}
    </div>
  );
}

export function RankBadge({ rank, label }: { rank: string; label: string }) {
  const color = RANK_COLORS[rank] ?? "#6b7280";
  if (rank === "UNRANKED") {
    return (
      <span className="inline-block px-3 py-1 font-proxima txt-smaller text-[#ccccd0] border border-[#333]">
        {label}
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center px-3 font-proxima font-semibold txt-smaller"
      style={{
        height: "26px",
        background: color,
        color: color === "#d4ff00" ? "#000" : "#fff",
      }}>
      {label}
    </span>
  );
}

export const RANK_COLORS: Record<string, string> = {
  UNRANKED: "#6b7280",
  ROOKIE:   "#22bb39",
  RISING:   "#d4ff00",
  COLD:     "#00cfff",
};

export const NEXT_RANK_COLOR: Record<string, string> = {
  UNRANKED: "#22bb39",
  ROOKIE:   "#d4ff00",
  RISING:   "#00cfff",
  COLD:     "#00cfff",
};

export const RANK_LABEL_EN: Record<string, string> = {
  UNRANKED: "Unranked",
  ROOKIE:   "Rookie Monster",
  RISING:   "Rising Monster",
  COLD:     "Cold Monster",
};

export const RANK_LABEL_AR: Record<string, string> = {
  UNRANKED: "غير مصنّف",
  ROOKIE:   "مبتدئ مونستر",
  RISING:   "صاعد مونستر",
  COLD:     "كولد مونستر",
};

export const KPI_VIEWS: Record<string, string> = {
  UNRANKED: "50K", ROOKIE: "75K", RISING: "150K", COLD: "650K",
};
export const KPI_ENG: Record<string, string> = {
  UNRANKED: "0.5%", ROOKIE: "1%", RISING: "2%", COLD: "3%",
};
export const REQ: Record<string, [number, number, number]> = {
  UNRANKED: [8, 2, 10], ROOKIE: [12, 4, 16], RISING: [16, 8, 24], COLD: [20, 16, 36],
};
export const STATUS_BG: Record<string, string> = {
  APPROVED: "#22bb39",
  PENDING:  "#bfec1d",
  REJECTED: "#ef4444",
};