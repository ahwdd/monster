// src/app/[locale]/auth/profile/ProfileSkeleton.tsx
import Skeleton from "@/components/Skeleton";
import React    from "react";
import { motion } from "framer-motion";
import { FaTrophy } from "react-icons/fa";
import { hexToRgba } from "@/lib/utils/colors";
import {
  RANK_COLOR, NEXT_RANK_COLOR, RANK_LABEL_EN, RANK_LABEL_AR,
  KPI_VIEWS_LABEL, KPI_ENG_LABEL, CONTENT_REQ, STATUS_BG,
} from "@/lib/data/rankConfig";

// Re-export with legacy names so existing imports keep working
export { RANK_COLOR as RANK_COLORS, NEXT_RANK_COLOR, RANK_LABEL_EN, RANK_LABEL_AR, STATUS_BG };
export const KPI_VIEWS = KPI_VIEWS_LABEL;
export const KPI_ENG   = KPI_ENG_LABEL;
export const REQ       = CONTENT_REQ;

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

// ── Circular Progress ─────────────────────────────────────────────────────────
// When pct >= 100 (met or exceeded), `rankColor` overrides the default scale.
export function CircularProgress({
  pct, size = 52, stroke = 5, color, rankColor,
}: {
  pct: number; size?: number; stroke?: number;
  color?: string;
  rankColor?: string; // if provided, used when pct >= 100
}) {
  const radius     = (size - stroke) / 2;
  const circ       = 2 * Math.PI * radius;
  const clamped    = Math.min(pct, 100);
  const dashOffset = circ - (clamped / 100) * circ;

  // Color priority:
  // 1. explicit `color` prop
  // 2. `rankColor` when at/above 100%
  // 3. default red→orange→yellow→green scale
  const resolvedColor =
    color ??
    (pct >= 100 && rankColor ? rankColor
    : pct >= 100              ? "#22bb39"
    : pct >= 75               ? "#22bb39"
    : pct >= 50               ? "#d4ff00"
    : pct >= 25               ? "#f97316"
                              : "#ef4444");

  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="#272727" strokeWidth={stroke}/>
      <motion.circle
        cx={size/2} cy={size/2} r={radius}
        fill="none" stroke={resolvedColor} strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: dashOffset }}
        transition={{ duration: 1, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
      />
    </svg>
  );
}

export function ReqRow({ label, current, max, color }: {
  label: string; current: number; max: number; color: string;
}) {
  const pct = max > 0 ? Math.min((current / max) * 100, 100) : 0;
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="txt-smaller text-[#ccccd0]">{label}</span>
        <span className="tabular-nums flex items-baseline gap-0.5">
          <span className="txt-smaller text-[#666]">{current}&nbsp;/</span>
          <span className="txt-small font-bold" style={{ color: "#22bb39" }}>{max}</span>
        </span>
      </div>
      <div className="w-full bg-[#272727]" style={{ height: "4px" }}>
        <motion.div className="h-full" style={{ background: color }}
          initial={{ width: 0 }} animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
    </div>
  );
}

// ── StatCard ──────────────────────────────────────────────────────────────────
export function StatCard({
  label, current, target, targetColor, currentRaw, targetRaw, plain, rankColor,
}: {
  label: string; current?: string; target?: string;
  targetColor?: string; currentRaw?: number; targetRaw?: number;
  plain?: string; rankColor?: string;
}) {
  const pct =
    currentRaw !== undefined && targetRaw !== undefined && targetRaw > 0
      ? Math.round((currentRaw / targetRaw) * 100)
      : undefined;

  const isMaxed = pct !== undefined && pct >= 100;

  return (
    <div className="bg-[#171717] border border-[#272727] rounded-lg px-5 py-4 flex flex-col gap-2">
      <p className="header-smallest font-black text-white/80 capitalize tracking-wider">{label}</p>
      {plain !== undefined ? (
        <p className="header-small text-white leading-none">{plain}</p>
      ) : (
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-1 leading-none">
            <span className="tabular-nums txt-small" style={{color: isMaxed?targetColor:"#ccc"}}>{current}</span>
            <span className="tabular-nums font-bold txt-large" style={{ color: targetColor }}>
              &nbsp;/{target}
            </span>
          </div>
          {pct !== undefined && (
            <CircularProgress pct={pct} size={44} stroke={4} rankColor={rankColor} />
          )}
        </div>
      )}
    </div>
  );
}

// ── RankBadge ─────────────────────────────────────────────────────────────────
export function RankBadge({ rank, label }: { rank: string; label: string }) {
  const color = RANK_COLOR[rank] ?? "#6b7280";
  if (rank === "UNRANKED") {
    return (
      <div className="px-1 txt-smaller rounded-full text-[#ccccd0] border border-[#333] flex items-center justify-center gap-1">
        <FaTrophy /><span>{label}</span>
      </div>
    );
  }
  return (
    <span
      className="px-1 txt-smaller rounded-full border flex items-center justify-center gap-1"
      style={{
        borderColor: hexToRgba(color, 0.5),
        color: color,
        background: hexToRgba(color, 0.15),
      }}>
      <FaTrophy style={{ color }}/><span>{label}</span>
    </span>
  );
}