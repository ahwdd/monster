// src/app/[locale]/auth/profile/ProfileSkeleton.tsx
import Skeleton from "@/components/Skeleton";
import React from "react";
import { motion } from "framer-motion";
import { FaTrophy } from "react-icons/fa";
import { hexToRgba } from "@/lib/utils/colors";

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

export function CircularProgress({
  pct,
  size = 52,
  stroke = 5,
  color,
}: {
  pct: number;
  size?: number;
  stroke?: number;
  color?: string;
}) {
  const radius      = (size - stroke) / 2;
  const circ        = 2 * Math.PI * radius;
  const clamped     = Math.min(pct, 100);
  const dashOffset  = circ - (clamped / 100) * circ;

  // Color: red → orange → yellow → green (Monster green at ≥ 75%)
  const resolvedColor =
    color ??
    (pct >= 100
      ? "#22bb39"         // ≥ 100% — max green
      : pct >= 75
      ? "#22bb39"         // 75–99% — monster green
      : pct >= 50
      ? "#d4ff00"         // 50–74% — monster yellow
      : pct >= 25
      ? "#f97316"         // 25–49% — orange
      : "#ef4444");       // 0–24%  — red

  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      {/* Track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#272727"
        strokeWidth={stroke}
      />
      {/* Progress arc */}
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={resolvedColor}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: dashOffset }}
        transition={{ duration: 1, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
      />
    </svg>
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

// ── Stat card with circular progress ─────────────────────────────────────────
export function StatCard({
  label,
  current,
  target,
  targetColor,
  currentRaw,   // raw number for pct calculation
  targetRaw,    // raw number for pct calculation
  plain,
}: {
  label: string;
  current?: string;
  target?: string;
  targetColor?: string;
  currentRaw?: number;
  targetRaw?: number;
  plain?: string;
}) {
  const pct =
    currentRaw !== undefined && targetRaw !== undefined && targetRaw > 0
      ? Math.round((currentRaw / targetRaw) * 100)
      : undefined;

  return (
    <div className="bg-[#171717] border border-[#272727] rounded-lg px-5 py-4 flex flex-col gap-2">
      <p className="txt-smaller font-black text-white capitalize tracking-wider">{label}</p>

      {plain !== undefined ? (
        <p className="header-small text-white leading-none">{plain}</p>
      ) : (
        <div className="flex items-center justify-between gap-2">
          {/* Numbers */}
          <div className="flex items-baseline gap-1 leading-none">
            <span className="tabular-nums text-[#ccc] txt-small">{current}&nbsp;/</span>
            <span
              className="tabular-nums font-bold txt-small"
              style={{ color: targetColor ?? "#22bb39" }}>
              {target}
            </span>
          </div>
          {/* Circular progress */}
          {pct !== undefined && (
            <CircularProgress pct={pct} size={44} stroke={4} />
          )}
        </div>
      )}
    </div>
  );
}

export function RankBadge({ rank, label }: { rank: string; label: string }) {
  const color = RANK_COLORS[rank] ?? "#6b7280";
  if (rank === "UNRANKED") {
    return (
      <div className="px-1 txt-smaller rounded-full text-[#ccccd0] border border-[#333] flex items-center justify-center gap-1">
        <FaTrophy />
        <span>{label}</span>
      </div>
    );
  }
  return (
    <span
      className="px-1 txt-smaller rounded-full text-[#ccccd0] border border-[#333] flex items-center justify-center gap-1"
      style={{
        borderColor: hexToRgba(color, 0.5),
        color: color === "#d4ff00" ? "#000" : "#fff",
      }}>
      <FaTrophy />
      <span>{label}</span>
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
  UNRANKED: [8, 2, 10],
  ROOKIE:   [12, 4, 16],
  RISING:   [16, 8, 24],
  COLD:     [20, 16, 36],
};
export const STATUS_BG: Record<string, string> = {
  APPROVED: "#22bb39",
  PENDING:  "#bfec1d",
  REJECTED: "#ef4444",
};