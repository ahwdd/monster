// src/components/ui/CanLevelMeter.tsx
"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

type Rank =
  | "UNRANKED"
  | "ROOKIE_MONSTER"
  | "RISING_MONSTER"
  | "ELITE_MONSTER"
  | "MEGA_MONSTER"
  | "COLD_MONSTER";

// Map each rank to its flavor can image.
// Replace these paths with your actual Cloudinary / public URLs.
const RANK_CAN: Record<Rank, string> = {
  UNRANKED:       "/assets/flavors/original.webp",
  ROOKIE_MONSTER: "/assets/flavors/top.webp",
  RISING_MONSTER: "/assets/flavors/coffee.webp",
  ELITE_MONSTER:  "/assets/flavors/juice.webp",
  MEGA_MONSTER:   "/assets/flavors/tea.webp",
  COLD_MONSTER:   "/assets/flavors/zero.webp",
};

const RANK_LABEL: Record<Rank, { en: string; ar: string }> = {
  UNRANKED:       { en: "Unranked",       ar: "غير مصنّف"       },
  ROOKIE_MONSTER: { en: "Rookie Monster", ar: "مبتدئ"           },
  RISING_MONSTER: { en: "Rising Monster", ar: "صاعد"            },
  ELITE_MONSTER:  { en: "Elite Monster",  ar: "نخبة"            },
  MEGA_MONSTER:   { en: "Mega Monster",   ar: "ميقا"            },
  COLD_MONSTER:   { en: "Cold Monster",   ar: "كولد"            },
};

type Props = {
  rank:          Rank;
  progress:      number;   // 0.0 – 1.0 within the current level
  totalPoints:   number;
  levelNum:      number;
  locale?:       string;
  className?:    string;
};

export default function CanLevelMeter({
  rank, progress, totalPoints, levelNum, locale = "en", className = "",
}: Props) {
  const isAr = locale === "ar";
  const canImg = RANK_CAN[rank] ?? RANK_CAN.UNRANKED;
  const label = RANK_LABEL[rank] ?? RANK_LABEL.UNRANKED;

  const fillSpring = useSpring(0, { stiffness: 60, damping: 18 });

  useEffect(() => {
    if (levelNum > 1) {
      fillSpring.jump(1);
      
      const t1 = setTimeout(() => {
        fillSpring.jump(0); // Snap to bottom
        fillSpring.set(Math.min(Math.max(progress, 0), 1)); // Animate up
      }, 100);

      return () => clearTimeout(t1);
    } else {
      const t2 = setTimeout(() => {
        fillSpring.set(Math.min(Math.max(progress, 0), 1));
      }, 300);
      return () => clearTimeout(t2);
    }
  }, [progress, fillSpring, levelNum]);

  const clipInset = useTransform(
    fillSpring,
    (v) => `inset(${Math.round((1 - v) * 100)}% 0% 0% 0%)`
  );

  const pct = Math.round(progress * 100);

  return (
    <div className={`flex flex-col items-center gap-3 select-none ${className}`}>

      {/* Can container */}
      <div className="relative w-28 h-48 sm:w-32 sm:h-56">

        {/* Back layer — grayscale, always full height */}
        <img
          src={canImg}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-contain grayscale brightness-45 opacity-70"
        //   style={{ filter: "grayscale(100%) brightness(0.45)" }}
          draggable={false}
        />

        {/* Front layer — color, clipped bottom-to-top */}
        <motion.img
          src={canImg}
          alt={isAr ? label.ar : label.en}
          className="absolute inset-0 w-full h-full object-contain"
          style={{ clipPath: clipInset }}
          draggable={false}
        />

        {/* Glow when full */}
        {progress >= 0.99 && (
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, rgba(120,190,32,0.18) 0%, transparent 70%)",
              animation: "pulse 2s ease-in-out infinite",
            }}
          />
        )}

        {/* Percentage badge */}
        <div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-black border border-zinc-700 rounded-full px-2.5 py-0.5 flex items-center gap-1"
          style={{ whiteSpace: "nowrap" }}
        >
          <span
            className="font-display font-bold text-[#78be20]"
            style={{ fontSize: "0.72rem", lineHeight: 1 }}
          >
            {pct}%
          </span>
        </div>
      </div>

      {/* Labels */}
      <div className="text-center mt-2">
        <p className="font-display font-bold text-white uppercase tracking-wider" style={{ fontSize: "0.85rem" }}>
          {isAr ? label.ar : label.en}
        </p>
        <p className="text-zinc-500 mt-0.5" style={{ fontSize: "0.7rem" }}>
          {isAr ? `المستوى ${levelNum}` : `Level ${levelNum}`}
          {" · "}
          {totalPoints.toLocaleString()} pts
        </p>
      </div>

    </div>
  );
}