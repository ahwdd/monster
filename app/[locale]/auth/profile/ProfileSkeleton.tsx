import Skeleton from "@/components/Skeleton";
import React from "react";
import { motion } from "framer-motion";

export default function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-5">
        <Skeleton className="w-18 h-18 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-5 w-32" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
      </div>
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
        <span className="font-proxima text-white txt-smaller">{label}</span>
        <span
          className="font-proxima font-semibold txt-smaller"
          style={{ color }}>
          {current} / {max}
        </span>
      </div>
      <div className="w-full h-1 bg-[#272727]">
        <motion.div
          className="h-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
      <div className="w-full h-px bg-[#272727]" />
    </div>
  );
}

export function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#171717] p-6 flex flex-col gap-2">
      <p className="font-proxima text-[#ccccd0] txt-smaller">{label}</p>
      <p
        className="font-display font-black text-white"
        style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)" }}>
        {value}
      </p>
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
  ROOKIE: "#22bb39",
  RISING: "#d4ff00",
  COLD: "#00cfff",
};
