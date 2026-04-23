// src/lib/utils/rank.ts
export type CreatorRank = "UNRANKED" | "ROOKIE" | "MEGA" | "RISING" | "ELITE" | "COLD";

// ── Monthly view targets per rank (from PDF page 10 KPI table) ──
// These are MONTHLY view targets, not cumulative reach.
// Used as the "denominator" for the CanLevelMeter fill.
export const RANK_THRESHOLDS: Record<string, number> = {
  UNRANKED:  50_000,   // needs 50K monthly views
  ROOKIE:    75_000,   // needs 75K monthly views
  MEGA:      75_000,   // decorative sub-rank of ROOKIE
  RISING:   150_000,   // needs 150K monthly views
  ELITE:    150_000,   // decorative sub-rank of RISING
  COLD:     650_000,   // needs 650K monthly views
};

// Main ranks in order
export const MAIN_RANKS: CreatorRank[] = ["UNRANKED", "ROOKIE", "RISING", "COLD"];
export const ALL_RANKS:  CreatorRank[] = ["UNRANKED", "ROOKIE", "MEGA", "RISING", "ELITE", "COLD"];

// ── Minimum quarters (PDF calls them quarters, not months) ────
// Displayed as months in the UI (1 quarter = 3 months)
export const MIN_MONTHS: Record<string, number> = {
  UNRANKED: 3,   // first quarter (3 months)
  ROOKIE:   3,   // 1 quarter
  MEGA:     3,
  RISING:   6,   // 2 quarters
  ELITE:    6,
  COLD:     9,   // 3 quarters
};

// Month range for display: [min, max] months at this rank
export const MONTH_RANGE: Record<string, [number, number]> = {
  UNRANKED: [0, 3],
  ROOKIE:   [3, 6],
  MEGA:     [3, 6],
  RISING:   [6, 9],
  ELITE:    [6, 9],
  COLD:     [9, 9],
};

// ── Monthly content minimums (from PDF KPI table) ─────────────
// Total pieces = streams + reels + stories per month
export const MIN_CONTENT: Record<string, number> = {
  UNRANKED: 20,   // 8 stream + 2 reel + 10 story
  ROOKIE:   32,   // 12 stream + 4 reel + 16 story
  MEGA:     32,
  RISING:   48,   // 16 stream + 8 reel + 24 story
  ELITE:    48,
  COLD:     72,   // 20 stream + 16 reel + 36 story
};

// ── Engagement rate targets per rank (quarterly) ──────────────
export const MIN_ENGAGEMENT_RATE: Record<string, number> = {
  UNRANKED: 0.005, // 0.5%
  ROOKIE:   0.01,  // 1%
  MEGA:     0.01,
  RISING:   0.02,  // 2%
  ELITE:    0.02,
  COLD:     0.03,  // 3%
};

// ── Quarter score needed to level up ─────────────────────────
export const MIN_QUARTER_SCORE: Record<string, number> = {
  UNRANKED: 0,    // N/A — evaluated for entry
  ROOKIE:   50,
  MEGA:     50,
  RISING:   70,
  ELITE:    70,
  COLD:     90,
};

// ── Max creators per rank (from PDF page 10) ─────────────────
export const MAX_CREATORS: Record<string, number> = {
  UNRANKED: 45,   // unranked + rookie = 45 total
  ROOKIE:   45,
  RISING:   20,
  COLD:     10,
};

// ── Progress toward monthly view target (0.0 – 1.0) ──────────
export function getRankProgress(rank: string, currentRankReach: number): number {
  const threshold = RANK_THRESHOLDS[rank] ?? Infinity;
  if (threshold === Infinity) return 1.0;
  return Math.min(currentRankReach / threshold, 1.0);
}

export function getRankProgressLabel(rank: string, currentRankReach: number): string {
  const threshold = RANK_THRESHOLDS[rank] ?? Infinity;
  const pct       = Math.round(getRankProgress(rank, currentRankReach) * 100);
  if (threshold === Infinity) return "100%";
  return `${pct}% (${formatNumber(currentRankReach)} / ${formatNumber(threshold)})`;
}

// ── Month count since approval ────────────────────────────────
export function getMonthsInProgram(approvedAt: Date | null | undefined): number {
  if (!approvedAt) return 0;
  const now    = new Date();
  const months = (now.getFullYear() - approvedAt.getFullYear()) * 12
    + (now.getMonth() - approvedAt.getMonth());
  return Math.max(0, months);
}

export function getMonthDisplay(rank: string, approvedAt: Date | null | undefined): string {
  const months   = getMonthsInProgram(approvedAt);
  const [, max]  = MONTH_RANGE[rank] ?? [0, 3];
  const clamped  = Math.min(months, max);
  return `${clamped}/${max}`;
}

// ── Total content within current rank ────────────────────────
export function totalContentInRank(profile: {
  pictureCount:   number;
  storyCount:     number;
  reelCount:      number;
  longVideoCount: number;
  postCount:      number;
}): number {
  return profile.pictureCount + profile.storyCount +
    profile.reelCount + profile.longVideoCount + profile.postCount;
}

// ── Rank-up eligibility check ─────────────────────────────────
export type RankUpEligibility = {
  eligible:       boolean;
  reachOk:        boolean;
  monthsOk:       boolean;
  contentOk:      boolean;
  missingReach:   number;
  missingMonths:  number;
  missingContent: number;
};

export function checkRankUpEligibility(
  rank:             string,
  currentRankReach: number,
  approvedAt:       Date | null | undefined,
  profile: {
    pictureCount: number; storyCount: number; reelCount: number;
    longVideoCount: number; postCount: number;
  }
): RankUpEligibility {
  const neededReach   = RANK_THRESHOLDS[rank] ?? Infinity;
  const neededMonths  = MIN_MONTHS[rank] ?? 0;
  const neededContent = MIN_CONTENT[rank] ?? 0;
  const currentMonths = getMonthsInProgram(approvedAt);
  const currentContent= totalContentInRank(profile);

  const reachOk   = currentRankReach >= neededReach;
  const monthsOk  = currentMonths    >= neededMonths;
  const contentOk = currentContent   >= neededContent;

  return {
    eligible:       reachOk && monthsOk && contentOk,
    reachOk,
    monthsOk,
    contentOk,
    missingReach:   Math.max(0, neededReach   - currentRankReach),
    missingMonths:  Math.max(0, neededMonths  - currentMonths),
    missingContent: Math.max(0, neededContent - currentContent),
  };
}

// ── Next rank ─────────────────────────────────────────────────
export function getNextRank(rank: string): CreatorRank | null {
  const map: Record<string, CreatorRank> = {
    UNRANKED: "ROOKIE",
    ROOKIE:   "RISING",
    MEGA:     "RISING",
    RISING:   "COLD",
    ELITE:    "COLD",
  };
  return map[rank] ?? null;
}

// ── Decorative sub-rank title ─────────────────────────────────
export function getDecorativeTitle(rank: string, progress: number): string | null {
  if (rank === "ROOKIE"  && progress >= 0.75) return "MEGA";
  if (rank === "RISING"  && progress >= 0.75) return "ELITE";
  return null;
}

// ── Format number ─────────────────────────────────────────────
export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}