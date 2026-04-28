// src/lib/data/rankConfig.ts
// ═══════════════════════════════════════════════════════════════════════════
// SINGLE SOURCE OF TRUTH for all rank + platform display constants.

// ── Rank colors ──────────────────────────────────────────────────────────────
export const RANK_COLOR: Record<string, string> = {
  UNRANKED: "#6b7280",
  ROOKIE:   "#22bb39",
  MEGA:     "#22bb39",
  RISING:   "#d4ff00",
  ELITE:    "#d4ff00",
  COLD:     "#00cfff",
};

export const NEXT_RANK_COLOR: Record<string, string> = {
  UNRANKED: "#22bb39",
  ROOKIE:   "#d4ff00",
  MEGA:     "#d4ff00",
  RISING:   "#00cfff",
  ELITE:    "#00cfff",
  COLD:     "#00cfff",
};

export const RANK_LABEL_EN: Record<string, string> = {
  UNRANKED: "Unranked",
  ROOKIE:   "Rookie Monster",
  MEGA:     "Mega Monster",
  RISING:   "Rising Monster",
  ELITE:    "Elite Monster",
  COLD:     "Cold Monster",
};

export const RANK_LABEL_AR: Record<string, string> = {
  UNRANKED: "غير مصنّف",
  ROOKIE:   "مبتدئ مونستر",
  MEGA:     "ميغا مونستر",
  RISING:   "صاعد مونستر",
  ELITE:    "إيليت مونستر",
  COLD:     "كولد مونستر",
};

export const NEXT_RANK_LABEL_EN: Record<string, string> = {
  UNRANKED: "Rookie Monster",
  ROOKIE:   "Rising Monster",
  MEGA:     "Rising Monster",
  RISING:   "Cold Monster",
  ELITE:    "Cold Monster",
  COLD:     "Cold Monster",
};

export const NEXT_RANK_LABEL_AR: Record<string, string> = {
  UNRANKED: "مبتدئ مونستر",
  ROOKIE:   "صاعد مونستر",
  MEGA:     "صاعد مونستر",
  RISING:   "كولد مونستر",
  ELITE:    "كولد مونستر",
  COLD:     "كولد مونستر",
};

export const PLATFORM_COLOR: Record<string, string> = {
  TIKTOK:    "#ff004f",
  INSTAGRAM: "#e1306c",
  YOUTUBE:   "#ff0000",
  FACEBOOK:  "#1877f2",
  TWITCH:    "#9146ff",
  KICK:      "#53fc18",
};

export const KPI_VIEWS_LABEL: Record<string, string> = {
  UNRANKED: "50K",
  ROOKIE:   "75K",
  MEGA:     "75K",
  RISING:   "150K",
  ELITE:    "150K",
  COLD:     "650K",
};

export const KPI_ENG_LABEL: Record<string, string> = {
  UNRANKED: "0.5%",
  ROOKIE:   "1%",
  MEGA:     "1%",
  RISING:   "2%",
  ELITE:    "2%",
  COLD:     "3%",
};

// ── Performance score component maximums ─────────────────────────────────────
// These are the per-component max points. Total varies by rank (see MIN_QUARTER_SCORE
// in rank.ts). These max values are fixed across all ranks.
export const SCORE_COMPONENTS: {
  keyEn: string;
  keyAr: string;
  max: number;
}[] = [
  { keyEn: "Views",      keyAr: "مشاهدات", max: 10 },
  { keyEn: "Content",    keyAr: "محتوى",   max: 20 },
  { keyEn: "Engagement", keyAr: "تفاعل",   max: 15 },
  { keyEn: "Commitment", keyAr: "التزام",  max: 15 },
  { keyEn: "Grading",    keyAr: "تقييم",   max: 30 },
];

// Total possible score (sum of all component maxes = 90)
// This is the absolute ceiling; actual target per rank comes from MIN_QUARTER_SCORE
export const SCORE_MAX_POSSIBLE = SCORE_COMPONENTS.reduce((s, c) => s + c.max, 0);

// ── Content requirement tuples [streams/longVideo, reels, stories] per rank ──
// Update rank.ts REQ if you change these — they must stay in sync.
export const CONTENT_REQ: Record<string, [number, number, number]> = {
  UNRANKED: [8,  2,  10],
  ROOKIE:   [12, 4,  16],
  MEGA:     [12, 4,  16],
  RISING:   [16, 8,  24],
  ELITE:    [16, 8,  24],
  COLD:     [20, 16, 36],
};

export const STATUS_BG: Record<string, string> = {
  APPROVED: "#22bb39",
  PENDING:  "#bfec1d",
  REJECTED: "#ef4444",
};

export const STATUS_TEXT_CLASS: Record<string, string> = {
  APPROVED: "text-[#22bb39] bg-[#22bb39]/10",
  PENDING:  "text-[#bfec1d] bg-[#bfec1d]/10",
  REJECTED: "text-red-400 bg-red-400/10",
};