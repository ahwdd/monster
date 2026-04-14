// src/components/ui/CanLevelMeter.tsx
"use client";
import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect }    from "react";
import { useTranslations } from "next-intl";

// Map level number → flavor can image path
// Replace with your actual public paths / Cloudinary URLs
const LEVEL_CAN: Record<number, string> = {
  1: "/assets/flavors/original.png",
  2: "/assets/flavors/green.png",
  3: "/assets/flavors/blue.png",
  4: "/assets/flavors/purple.png",
  5: "/assets/flavors/ultra.png",
};

type Props = {
  levelNum:     number;   // 1-5, current level
  levelProgress:number;   // 0.0-1.0, progress within current level
  totalPoints:  number;
  rank:         string;
  className?:   string;
};

export default function CanLevelMeter({
  levelNum, levelProgress, totalPoints, rank, className = "",
}: Props) {
  const t  = useTranslations("level");

  const TOTAL_LEVELS = 5;
  const levels = Array.from({ length: TOTAL_LEVELS }, (_, i) => i + 1);

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      {/* Row of cans */}
      <div className="flex items-end gap-2 sm:gap-3">
        {levels.map((lvl) => (
          <CanUnit
            key={lvl}
            levelNum={lvl}
            currentLevel={levelNum}
            progress={lvl < levelNum ? 1 : lvl === levelNum ? levelProgress : 0}
            canImg={LEVEL_CAN[lvl] ?? LEVEL_CAN[1]}
            isCurrent={lvl === levelNum}
            t={t}
          />
        ))}
      </div>

      {/* Total points + rank */}
      <div className="text-center mt-1">
        <p className="font-display font-bold text-white uppercase tracking-wide txt-small">
          {rank !== "UNRANKED" ? rank.replace(/_/g, " ") : t("unranked")}
        </p>
        <p className="txt-smaller text-zinc-500">
          {totalPoints.toLocaleString()} {t("level")}  {levelNum}
        </p>
      </div>
    </div>
  );
}

// ── Single can ───────────────────────────────────────────────
function CanUnit({
  levelNum, currentLevel, progress, canImg, isCurrent, t,
}: {
  levelNum:     number;
  currentLevel: number;
  progress:     number;  // 0 = empty, 1 = full
  canImg:       string;
  isCurrent:    boolean;
  t:            ReturnType<typeof useTranslations<"level">>;
}) {
  const fillSpring = useSpring(0, { stiffness: 55, damping: 20 });

  useEffect(() => {
    const delay = 200 + levelNum * 120; // stagger each can
    const timer = setTimeout(() => fillSpring.set(progress), delay);
    return () => clearTimeout(timer);
  }, [progress, levelNum, fillSpring]);

  // inset(top right bottom left) — shrink from top reveals bottom fill
  const clipInset = useTransform(
    fillSpring,
    (v) => `inset(${Math.round((1 - v) * 100)}% 0% 0% 0%)`
  );

  const isPast    = levelNum < currentLevel;
  const isFuture  = levelNum > currentLevel;
  const pct       = Math.round(progress * 100);

  // Size: current can is larger
  const h = isCurrent ? "h-44 sm:h-52" : "h-32 sm:h-40";
  const w = isCurrent ? "w-16 sm:w-20" : "w-11 sm:w-14";

  return (
    <div className="flex flex-col items-center gap-1.5">
      {/* Level label above */}
      <span className={`txt-smaller font-medium ${isCurrent ? "text-[#78be20]" : isFuture ? "text-zinc-700" : "text-zinc-500"}`}>
        {t("level")} {levelNum}
      </span>

      {/* Can */}
      <div className={`relative ${w} ${h}`}>
        {/* Back: always grayscale full height */}
        <img
          src={canImg}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-contain"
          style={{ filter: "grayscale(100%) brightness(0.3)" }}
          draggable={false}
        />

        {/* Front: color, clipped bottom-to-top by spring */}
        <motion.img
          src={canImg}
          alt={`Level ${levelNum}`}
          className="absolute inset-0 w-full h-full object-contain"
          style={{ clipPath: clipInset }}
          draggable={false}
        />

        {/* Glow on fully filled cans */}
        {(isPast || (isCurrent && progress >= 0.99)) && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 50% 80%, rgba(120,190,32,0.15) 0%, transparent 65%)",
            }}
          />
        )}
      </div>

      {/* Percentage badge below — only for current */}
      {isCurrent && (
        <span
          className="bg-black border border-zinc-700 rounded-full px-2 py-0.5 text-[#78be20] font-display font-bold"
          style={{ fontSize: "0.68rem" }}
        >
          {pct}%
        </span>
      )}

      {/* Checkmark for completed levels */}
      {isPast && (
        <span className="text-[#78be20]" style={{ fontSize: "0.7rem" }}>✓</span>
      )}
    </div>
  );
}