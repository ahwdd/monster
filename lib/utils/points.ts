// lib/utils/points.ts
export const LEVEL_THRESHOLDS = {
  LEVEL_1: { min: 0,     max: 999    },
  LEVEL_2: { min: 1000,  max: 4999   },
  LEVEL_3: { min: 5000,  max: 14999  },
  LEVEL_4: { min: 15000, max: 49999  },
  LEVEL_5: { min: 50000, max: Infinity },
} as const;

export type LevelKey = keyof typeof LEVEL_THRESHOLDS;

const RANK_MULTIPLIER: Record<string, number> = {
  UNRANKED:       1.0,
  ROOKIE_MONSTER: 1.0,
  RISING_MONSTER: 1.5,
  ELITE_MONSTER:  2.0,
  MEGA_MONSTER:   2.5,
  COLD_MONSTER:   3.0,
};

const APPEARANCE_BONUS = 50;

export function calculateSubmissionPoints({
  totalViews,
  totalReach,
  monsterAppearances,
  rank,
}: {
  totalViews:         number;
  totalReach:         number;
  monsterAppearances: string[];
  rank:               string;
}): number {
  const base        = Math.floor(totalViews  / 1000);        // 1 pt per 1000 views
  const reachBonus  = Math.floor(totalReach  / 1000 * 0.5);  // 0.5 pt per 1000 reach
  const appBonus    = monsterAppearances.length * APPEARANCE_BONUS;
  const multiplier  = RANK_MULTIPLIER[rank] ?? 1.0;

  return Math.round((base + reachBonus + appBonus) * multiplier);
}

export function getLevelFromPoints(points: number): LevelKey {
  if (points >= LEVEL_THRESHOLDS.LEVEL_5.min) return "LEVEL_5";
  if (points >= LEVEL_THRESHOLDS.LEVEL_4.min) return "LEVEL_4";
  if (points >= LEVEL_THRESHOLDS.LEVEL_3.min) return "LEVEL_3";
  if (points >= LEVEL_THRESHOLDS.LEVEL_2.min) return "LEVEL_2";
  return "LEVEL_1";
}

export function getLevelProgress(points: number): number {
  const level     = getLevelFromPoints(points);
  const threshold = LEVEL_THRESHOLDS[level];
  if (threshold.max === Infinity) return 1.0; // maxed out

  const range    = threshold.max - threshold.min + 1;
  const progress = (points - threshold.min) / range;
  return Math.min(Math.max(progress, 0), 1);
}

export function formatLevelProgress(points: number): string {
  const level    = getLevelFromPoints(points);
  const progress = getLevelProgress(points);
  const num      = parseInt(level.replace("LEVEL_", ""), 10);
  return `${Math.round(progress * 100)}% of Level ${num}`;
}