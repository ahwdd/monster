// src/lib/utils/rank.ts
export type CreatorRank = "UNRANKED" | "ROOKIE" | "MEGA" | "RISING" | "ELITE" | "COLD";

// ── Reach thresholds for rank promotion ─────────────────────
export const RANK_THRESHOLDS: Record<string, number> = {
  UNRANKED: 100_000,   // needs 100k to become ROOKIE
  ROOKIE:   500_000,   // needs 500k to become RISING
  MEGA:     500_000,   // decorative — same threshold as ROOKIE
  RISING:   1_000_000, // needs 1M to become COLD
  ELITE:    1_000_000, // decorative — same threshold as RISING
  COLD:     Infinity,  // max rank — no further promotion
};

// Main ranks in order (excluding decorative sub-ranks)
export const MAIN_RANKS: CreatorRank[] = ["UNRANKED", "ROOKIE", "RISING", "COLD"];

// All ranks ordered by progression
export const ALL_RANKS: CreatorRank[] = ["UNRANKED", "ROOKIE", "MEGA", "RISING", "ELITE", "COLD"];

// ── Minimum months per rank before eligible to rank up ───────
export const MIN_MONTHS: Record<string, number> = {
  UNRANKED: 1,
  ROOKIE:   1,
  MEGA:     1,
  RISING:   4,
  ELITE:    4,
  COLD:     0, // max rank, never ranks up
};

// ── Month display: [min, max] ─────────────────────────────── 
// This is how many months in the program the display shows.
export const MONTH_RANGE: Record<string, [number, number]> = {
  UNRANKED: [0, 1],
  ROOKIE:   [1, 4],
  MEGA:     [1, 4],
  RISING:   [4, 7],
  ELITE:    [4, 7],
  COLD:     [7, 7],
};

// ── Minimum content counts for rank-up eligibility ──────────
// All content types count toward the total regardless of type.
// "8 Long Video OR 8 Short OR 4 Story" = minimum total pieces
export const MIN_CONTENT: Record<string, number> = {
  UNRANKED: 8,   // 8 total pieces to rank up to ROOKIE
  ROOKIE:   32,  // 32 total pieces to rank up to RISING
  MEGA:     32,
  RISING:   56,  // 56 total pieces to rank up to COLD
  ELITE:    56,
  COLD:     0,   // max rank
};

// ── Progress toward next rank (0.0 – 1.0) ───────────────────
export function getRankProgress(rank: string, currentRankReach: number): number {
  const threshold = RANK_THRESHOLDS[rank] ?? Infinity;
  if (threshold === Infinity) return 1.0;
  return Math.min(currentRankReach / threshold, 1.0);
}

// ── Human-readable rank progress ─────────────────────────────
export function formatRankProgress(rank: string, currentRankReach: number): string {
  const threshold = RANK_THRESHOLDS[rank] ?? Infinity;
  const pct       = Math.round(getRankProgress(rank, currentRankReach) * 100);
  if (threshold === Infinity) return "100%";
  return `${pct}% (${formatNumber(currentRankReach)} / ${formatNumber(threshold)})`;
}

// ── Month count since approval ────────────────────────────────
export function getMonthsInProgram(approvedAt: Date | null | undefined): number {
  if (!approvedAt) return 0;
  const now   = new Date();
  const diff  = now.getTime() - new Date(approvedAt).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 30.44));
}

// ── Month display string ─────────────────────────────────────
// e.g. "2/4" for Rookie with 2 months
export function formatMonthDisplay(rank: string, approvedAt: Date | null | undefined): string {
  const months   = getMonthsInProgram(approvedAt);
  const [, max]  = MONTH_RANGE[rank] ?? [0, 1];
  const clamped  = Math.min(months, max);
  return `${clamped}/${max}`;
}

// ── Total content count ──────────────────────────────────────
export function totalContentInRank(profile: {
  pictureCount:   number;
  storyCount:     number;
  reelCount:      number;
  longVideoCount: number;
  postCount:      number;
}): number {
  return (
    profile.pictureCount +
    profile.storyCount +
    profile.reelCount +
    profile.longVideoCount +
    profile.postCount
  );
}

// ── Eligibility check for rank-up ────────────────────────────
export type EligibilityStatus = "green" | "yellow" | "red";

export interface RankUpEligibility {
  reachOk:       boolean;
  reachStatus:   EligibilityStatus;
  monthsOk:      boolean;
  monthsStatus:  EligibilityStatus;
  contentOk:     boolean;
  contentStatus: EligibilityStatus;
  allOk:         boolean;
  // display values
  currentReach:  number;
  neededReach:   number;
  currentMonths: number;
  neededMonths:  number;
  currentContent:number;
  neededContent: number;
}

export function checkRankUpEligibility(
  rank:          string,
  currentRankReach: number,
  approvedAt:    Date | null | undefined,
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
    reachOk,
    reachStatus:   reachOk   ? "green" : "red",
    monthsOk,
    monthsStatus:  monthsOk  ? "green" : currentMonths >= neededMonths * 0.75 ? "yellow" : "red",
    contentOk,
    contentStatus: contentOk ? "green" : currentContent >= neededContent * 0.75 ? "yellow" : "red",
    allOk: reachOk && monthsOk && contentOk,
    currentReach:   currentRankReach,
    neededReach:    neededReach === Infinity ? 0 : neededReach,
    currentMonths,
    neededMonths,
    currentContent,
    neededContent,
  };
}

// ── Next main rank ────────────────────────────────────────────
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

// ── Decorative title ─────────────────────────────────────────
// Returns a sub-rank title based on progress percentage
export function getDecorativeTitle(rank: string, progress: number): string | null {
  if (rank === "ROOKIE" && progress >= 0.75) return "MEGA";
  if (rank === "RISING" && progress >= 0.75) return "ELITE";
  return null;
}

// ── Helper ────────────────────────────────────────────────────
export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}