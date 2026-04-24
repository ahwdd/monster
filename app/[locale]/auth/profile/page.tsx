// src/app/[locale]/auth/profile/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  IoLogOutOutline,
  IoMailOutline,
  IoPhonePortraitOutline,
  IoCreateOutline,
  IoWarningOutline,
  IoTimeOutline,
  IoAddCircleOutline,
  IoArrowForward,
  IoArrowBack,
} from "react-icons/io5";
import AuthShell from "@/components/auth/AuthShell";
import ChangeEmailModal from "@/components/profile/ChangeEmailModal";
import ChangePhoneModal from "@/components/profile/ChangePhoneModal";
import LangToggle from "@/components/LangToggle";
import { Skeleton } from "@/components/Skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/contexts/ToastContext";
import {
  getRankProgress,
  formatNumber,
  getMonthsInProgram,
  MONTH_RANGE,
  RANK_THRESHOLDS,
} from "@/lib/utils/rank";

const PENDING_CAP = 5;

// XD exact rank colors from design file
const RANK_COLORS: Record<string, string> = {
  UNRANKED: "#6b7280",
  ROOKIE:   "#22bb39",
  RISING:   "#d4ff00",
  COLD:     "#00cfff",
};

const RANK_LABEL_EN: Record<string, string> = {
  UNRANKED: "Unranked",
  ROOKIE:   "Rookie Monster",
  RISING:   "Rising Monster",
  COLD:     "Cold Monster",
};
const RANK_LABEL_AR: Record<string, string> = {
  UNRANKED: "غير مصنّف",
  ROOKIE:   "مبتدئ مونستر",
  RISING:   "صاعد مونستر",
  COLD:     "كولد مونستر",
};

// XD KPI targets per rank
const KPI_VIEWS: Record<string, string>  = { UNRANKED: "50K", ROOKIE: "75K", RISING: "150K", COLD: "650K" };
const KPI_ENG: Record<string, string>    = { UNRANKED: "0.5%", ROOKIE: "1%", RISING: "2%", COLD: "3%" };
const REQ: Record<string, [number, number, number]> = {
  UNRANKED: [8, 2, 10], ROOKIE: [12, 4, 16], RISING: [16, 8, 24], COLD: [20, 16, 36],
};

// XD: solid colored rectangle badge — 146×26px
function RankBadge({ rank, label }: { rank: string; label: string }) {
  const color = RANK_COLORS[rank] ?? "#6b7280";
  if (rank === "UNRANKED") {
    return (
      <span className="inline-block px-3 py-0.5 font-proxima txt-smaller text-[#ccccd0] border border-[#444]">
        {label}
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center px-4 font-proxima font-semibold txt-smaller tracking-wide"
      style={{ height: "26px", background: color, color: color === "#d4ff00" ? "#000" : "#fff" }}>
      {label}
    </span>
  );
}

// XD: #171717 card with proxima label + display value
function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#171717] px-5 py-4 flex flex-col gap-1.5">
      <p className="font-proxima txt-smaller text-[#b6b6b6] uppercase tracking-wider">{label}</p>
      <p className="font-display font-black text-white leading-none" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}>
        {value}
      </p>
    </div>
  );
}

// XD: progress row with #272727 track
function ReqRow({ label, current, max, color }: { label: string; current: number; max: number; color: string }) {
  const pct = max > 0 ? Math.min((current / max) * 100, 100) : 0;
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="font-proxima txt-smaller text-[#ccccd0]">{label}</span>
        <span className="font-proxima txt-smaller font-semibold tabular-nums" style={{ color }}>
          {current} / {max}
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

// XD: table row for recent submissions
const STATUS_BG: Record<string, string> = {
  APPROVED: "#22bb39",
  PENDING:  "#bfec1d",
  REJECTED: "#ef4444",
};

function ProfileSkeleton() {
  return (
    <div className="space-y-5 px-4 md:px-35 py-8">
      {/* Identity row */}
      <div className="flex items-center gap-4">
        <Skeleton className="w-16 h-16 rounded-full shrink-0" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-6 w-44" />
          <Skeleton className="h-4 w-28" />
        </div>
      </div>
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Skeleton className="h-36" />
        <Skeleton className="h-36" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
      </div>
      <Skeleton className="h-48" />
    </div>
  );
}

export default function ProfilePage() {
  const t  = useTranslations("profile");
  const ts = useTranslations("submissions");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const router = useRouter();
  const toast = useToast();
  const Arrow = isRTL ? IoArrowBack : IoArrowForward;

  const { user, isAuthenticated, initializationComplete, logout } = useAuth();
  const [profile, setProfile]         = useState<any>(null);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [canSubmit, setCanSubmit]     = useState(true);
  const [showEmail, setShowEmail]     = useState(false);
  const [showPhone, setShowPhone]     = useState(false);

  useEffect(() => {
    if (initializationComplete && !isAuthenticated) router.push(`/${locale}/auth/signin`);
  }, [initializationComplete, isAuthenticated]);

  useEffect(() => {
    if (!user) return;
    fetch("/api/profile/register", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setProfile(d.data ?? null))
      .catch(() => {})
      .finally(() => setProfileLoaded(true));
  }, [user]);

  useEffect(() => {
    if (!user) return;
    fetch("/api/submissions", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setSubmissions(d.data ?? []);
          setCanSubmit(d.canSubmit ?? true);
        }
      })
      .catch(() => {});
  }, [user]);

  if (!initializationComplete || !user) {
    return (
      <AuthShell breadcrumbs={[{ label: isRTL ? "لوحة التحكم" : "Dashboard" }]}>
        <ProfileSkeleton />
      </AuthShell>
    );
  }

  const displayEmail  = user.email && !user.email.includes("@temp.monster") ? user.email : null;
  const initials      = `${user.firstName?.charAt(0) ?? ""}${user.lastName?.charAt(0) ?? ""}`.toUpperCase() || "AZ";
  const isApproved    = profile?.status === "APPROVED";
  const isPending     = profile?.status === "PENDING";
  const isRejected    = profile?.status === "REJECTED";
  const rank          = profile?.rank ?? "UNRANKED";
  const rankColor     = RANK_COLORS[rank] ?? "#6b7280";
  const rankLabel     = isRTL ? (RANK_LABEL_AR[rank] ?? rank) : (RANK_LABEL_EN[rank] ?? rank);
  const currentRankReach  = profile?.currentRankReach ?? 0;
  const totalReachAllTime = profile?.totalReachAllTime ?? 0;
  const threshold     = RANK_THRESHOLDS[rank] ?? 0;
  const rankProgress  = getRankProgress(rank, currentRankReach);
  const progressPct   = Math.min(Math.round(rankProgress * 100), 100);
  const approvedAt    = profile?.approvedAt ? new Date(profile.approvedAt) : null;
  const monthsIn      = getMonthsInProgram(approvedAt);
  const [, maxMonth]  = MONTH_RANGE[rank] ?? [0, 3];
  const [reqStreams, reqReels, reqStories] = REQ[rank] ?? REQ.UNRANKED;
  const recentSubs    = submissions.slice(0, 3);

  // Next rank label
  const NEXT_RANK_LABEL_EN: Record<string, string> = {
    UNRANKED: "Rookie Monster", ROOKIE: "Rising Monster", RISING: "Cold Monster", COLD: "Cold Monster",
  };
  const NEXT_RANK_LABEL_AR: Record<string, string> = {
    UNRANKED: "مبتدئ مونستر", ROOKIE: "صاعد مونستر", RISING: "كولد مونستر", COLD: "كولد مونستر",
  };
  const NEXT_RANK_COLOR: Record<string, string> = {
    UNRANKED: "#22bb39", ROOKIE: "#d4ff00", RISING: "#00cfff", COLD: "#00cfff",
  };

  return (
    <AuthShell breadcrumbs={[{ label: isRTL ? "لوحة التحكم" : "Dashboard" }]}>
      {/* Show skeleton while profile loads */}
      {!profileLoaded ? (
        <ProfileSkeleton />
      ) : (
        <div className="max-w-340 mx-auto px-4 md:px-8 xl:px-35 py-8 md:py-10 space-y-5">

          {/* ── Identity row ── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start sm:items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              {/* Avatar circle with rank color */}
              <div
                className="w-14 h-14 md:w-18 md:h-18 rounded-full flex items-center justify-center font-display font-black text-white shrink-0"
                style={{ background: rankColor, fontSize: "clamp(1rem, 2vw, 1.4rem)" }}>
                {initials}
              </div>
              <div>
                <h1
                  className="font-display font-black text-white leading-tight"
                  style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)" }}>
                  {isRTL ? `مرحباً، ${user.firstName}` : `Hello, ${user.firstName}`}
                </h1>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  {isApproved && <RankBadge rank={rank} label={rankLabel} />}
                  {isApproved && (
                    <span className="font-proxima text-[#555] txt-smaller">
                      {isRTL
                        ? `• الربع 1 | الشهر ${Math.min(monthsIn, maxMonth)}`
                        : `• Quarter 1 | Month ${Math.min(monthsIn, maxMonth)}`}
                    </span>
                  )}
                  {isPending && (
                    <span className="font-proxima txt-smaller px-2 py-0.5 border" style={{ color: "#bfec1d", borderColor: "#bfec1d44" }}>
                      {isRTL ? "قيد المراجعة" : "Pending Approval"}
                    </span>
                  )}
                  {isRejected && (
                    <span className="font-proxima txt-smaller px-2 py-0.5 border border-red-400/30 text-red-400">
                      {isRTL ? "مرفوض" : "Rejected"}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right actions: lang toggle + submit */}
            <div className="flex items-center gap-3 flex-wrap">
              <LangToggle />
              {isApproved && canSubmit && (
                <Link
                  href={`/${locale}/submissions/submit`}
                  className="flex items-center gap-2 font-display font-bold uppercase text-black tracking-[1.2px] hover:opacity-90 transition-opacity whitespace-nowrap"
                  style={{ height: "44px", paddingInline: "20px", background: "#22bb39", fontSize: "12px" }}>
                  <IoAddCircleOutline className="size-4" />
                  {isRTL ? "+ رفع محتوى" : "+ Submit Content"}
                </Link>
              )}
            </div>
          </motion.div>

          {/* ── Status banners ── */}
          {isPending && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex items-start justify-between gap-4 p-4 border border-[#bfec1d]/25 bg-[#bfec1d]/5">
              <div className="flex items-start gap-3">
                <IoTimeOutline className="size-5 shrink-0 mt-0.5" style={{ color: "#bfec1d" }} />
                <div>
                  <p className="font-display font-bold uppercase txt-small" style={{ color: "#bfec1d" }}>
                    {t("applicationUnderReview")}
                  </p>
                  <p className="font-proxima txt-smaller text-[#ccccd0] mt-1">{t("applicationUnderReviewDesc")}</p>
                </div>
              </div>
              <Link
                href={`/${locale}/submissions/register?editMode=true`}
                className="shrink-0 flex items-center gap-1.5 px-3 h-8 bg-[#171717] text-white font-proxima txt-smaller hover:bg-[#222] transition-colors whitespace-nowrap">
                <IoCreateOutline className="size-3.5" />
                {t("editApplication")}
              </Link>
            </motion.div>
          )}

          {isRejected && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex items-start justify-between gap-4 p-4 border border-red-400/25 bg-red-400/5">
              <div className="flex items-start gap-3">
                <IoWarningOutline className="size-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-display font-bold text-red-400 uppercase txt-small">{t("applicationRejected")}</p>
                  <p className="font-proxima txt-smaller text-[#ccccd0] mt-1">{t("applicationRejectedDesc")}</p>
                </div>
              </div>
              <Link
                href={`/${locale}/submissions/register?editMode=true`}
                className="shrink-0 flex items-center gap-1.5 px-3 h-8 bg-[#22bb39] text-white font-proxima txt-smaller font-semibold hover:opacity-90 transition-opacity whitespace-nowrap">
                <IoCreateOutline className="size-3.5" />
                {t("editApplication")}
              </Link>
            </motion.div>
          )}

          {/* ── Dashboard (approved only) ── */}
          {isApproved && (
            <>
              {/* Row 1: Level Progress + Performance Score */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-4">
                {/* Level Progress card */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }}
                  className="bg-[#171717] p-5 md:p-6">
                  <p className="font-proxima txt-smaller text-[#b6b6b6] uppercase tracking-wider mb-4">
                    {isRTL ? "تقدم المستوى" : "Level Progress"}
                  </p>
                  {/* Rank labels */}
                  <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-display font-black uppercase txt-small" style={{ color: rankColor }}>
                        {rankLabel}
                      </span>
                      {rank !== "COLD" && (
                        <>
                          <span className="text-[#444] txt-smaller">→</span>
                          <span className="font-display font-black uppercase txt-small" style={{ color: NEXT_RANK_COLOR[rank] }}>
                            {isRTL ? NEXT_RANK_LABEL_AR[rank] : NEXT_RANK_LABEL_EN[rank]}
                          </span>
                        </>
                      )}
                    </div>
                    <span className="font-display font-black text-white txt-larger tabular-nums">
                      {rank === "COLD" ? "MAX" : `${progressPct}%`}
                    </span>
                  </div>
                  {/* XD: 10px track #272727, white fill */}
                  <div className="w-full bg-[#272727]" style={{ height: "10px" }}>
                    <motion.div
                      className="h-full bg-white"
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPct}%` }}
                      transition={{ duration: 1, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    />
                  </div>
                  {rank !== "COLD" && (
                    <p className="font-proxima txt-smaller text-[#555] mt-3">
                      {isRTL
                        ? `${formatNumber(Math.max(0, threshold - currentRankReach))} مشاهدة متبقية`
                        : `${formatNumber(Math.max(0, threshold - currentRankReach))} views left to next level`}
                    </p>
                  )}
                </motion.div>

                {/* Performance Score card */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.09 }}
                  className="bg-[#171717] p-5 md:p-6 flex flex-col justify-center">
                  <p className="font-proxima txt-smaller text-[#b6b6b6] uppercase tracking-wider mb-3">
                    {isRTL ? "نقاط الأداء" : "Performance Score"}
                  </p>
                  <p className="font-display font-black text-white leading-none mb-1" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}>
                    40 / 50 pts
                  </p>
                  <p className="font-proxima txt-smaller text-[#555]">
                    {isRTL ? "نقاط التفاعل الإجمالية" : "Overall Engagement Score"}
                  </p>
                </motion.div>
              </div>

              {/* Row 2: 3 stat cards */}
              <motion.div
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.11 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                <StatCard
                  label={isRTL ? "إجمالي المشاهدات" : "Total Views"}
                  value={`${formatNumber(currentRankReach)} / ${KPI_VIEWS[rank] ?? "50K"}`}
                />
                <StatCard
                  label={isRTL ? "إجمالي الوصول" : "Total Reach"}
                  value={formatNumber(totalReachAllTime)}
                />
                <StatCard
                  label={isRTL ? "المشاركات" : "Submissions"}
                  value={String(submissions.length)}
                />
              </motion.div>

              {/* Row 3: Content Requirements + KPI Targets */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Content Requirements */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.13 }}
                  className="bg-[#171717] p-5 md:p-6">
                  <p className="font-proxima txt-smaller text-[#b6b6b6] uppercase tracking-wider mb-4">
                    {isRTL ? "متطلبات المحتوى" : "Content Requirements"}
                  </p>
                  <div className="space-y-4">
                    <ReqRow
                      label={isRTL ? "بثوث مباشرة" : "Live Streams"}
                      current={profile?.longVideoCount ?? 0}
                      max={reqStreams}
                      color={rankColor}
                    />
                    <ReqRow
                      label={isRTL ? "ريلز قصيرة" : "Short Reels"}
                      current={profile?.reelCount ?? 0}
                      max={reqReels}
                      color={rankColor}
                    />
                    <ReqRow
                      label={isRTL ? "ستوريز" : "Stories"}
                      current={profile?.storyCount ?? 0}
                      max={reqStories}
                      color={rankColor}
                    />
                  </div>
                </motion.div>

                {/* KPI Metric Targets */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                  className="bg-[#171717] p-5 md:p-6">
                  <p className="font-proxima txt-smaller text-[#b6b6b6] uppercase tracking-wider mb-4">
                    {isRTL ? "مستهدفات KPI" : "KPI Metric Targets"}
                  </p>
                  <div className="space-y-5">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-proxima txt-smaller text-[#ccccd0]">
                          {isRTL ? "مشاهدات KPI" : "Views KPI"}
                        </span>
                        <span className="font-proxima txt-smaller font-semibold tabular-nums" style={{ color: rankColor }}>
                          {formatNumber(currentRankReach)} / {KPI_VIEWS[rank] ?? "50K"}
                        </span>
                      </div>
                      <div className="w-full bg-[#272727]" style={{ height: "6px" }}>
                        <motion.div
                          className="h-full"
                          style={{ background: rankColor }}
                          initial={{ width: 0 }}
                          animate={{ width: `${progressPct}%` }}
                          transition={{ duration: 0.9, delay: 0.45, ease: [0.4, 0, 0.2, 1] }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-proxima txt-smaller text-[#ccccd0]">
                          {isRTL ? "معدل التفاعل" : "Engagement Rate"}
                        </span>
                        <span className="font-proxima txt-smaller font-semibold tabular-nums" style={{ color: "#bfec1d" }}>
                          0.8% / {KPI_ENG[rank] ?? "0.5%"}
                        </span>
                      </div>
                      <div className="w-full bg-[#272727]" style={{ height: "6px" }}>
                        <motion.div
                          className="h-full bg-[#bfec1d]"
                          initial={{ width: 0 }}
                          animate={{ width: "80%" }}
                          transition={{ duration: 0.9, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Row 4: Recent Submissions table */}
              {recentSubs.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.17 }}
                  className="bg-[#171717] p-5 md:p-6 overflow-x-auto">
                  <div className="flex items-center justify-between mb-4 min-w-[400px]">
                    <p className="font-proxima txt-smaller text-[#b6b6b6] uppercase tracking-wider">
                      {isRTL ? "آخر المشاركات" : "Recent Submissions"}
                    </p>
                    <Link
                      href={`/${locale}/submissions`}
                      className="font-proxima txt-smaller text-[#555] hover:text-[#ccccd0] transition-colors flex items-center gap-1">
                      {isRTL ? "عرض الكل" : "View All"}
                      <Arrow className="size-3" />
                    </Link>
                  </div>
                  {/* Table — scrollable on mobile */}
                  <div className="min-w-[400px]">
                    {/* Header */}
                    <div className="grid grid-cols-[1fr_100px_100px_90px] gap-3 pb-3 border-b border-[#272727]">
                      {(isRTL
                        ? ["عنوان المحتوى", "النوع", "المشاهدات", "الحالة"]
                        : ["Content", "Type", "Views", "Status"]
                      ).map((h, i) => (
                        <span key={i} className="font-display font-bold text-white uppercase" style={{ fontSize: "11px", letterSpacing: "0.08em" }}>
                          {h}
                        </span>
                      ))}
                    </div>
                    {/* Rows */}
                    {recentSubs.map((sub) => (
                      <div key={sub.id} className="grid grid-cols-[1fr_100px_100px_90px] gap-3 py-3 border-b border-[#272727] items-center">
                        <span className="font-proxima txt-smaller text-white truncate">
                          {sub.contentLink?.split("/").pop()?.slice(0, 24) ?? "Content"}
                        </span>
                        <span className="font-proxima txt-smaller text-[#ccccd0] capitalize">
                          {sub.contentTypes?.[0]?.toLowerCase() ?? "-"}
                        </span>
                        <span className="font-proxima txt-smaller text-white tabular-nums">
                          {formatNumber(sub.acceptedReach ?? sub.submittedReach ?? 0)}
                        </span>
                        {/* XD: solid colored pill, black text */}
                        <span
                          className="inline-flex items-center justify-center font-display font-bold uppercase"
                          style={{
                            height: "20px",
                            paddingInline: "6px",
                            fontSize: "9px",
                            letterSpacing: "0.06em",
                            background: STATUS_BG[sub.status] ?? "#555",
                            color: sub.status === "REJECTED" ? "#fff" : "#000",
                          }}>
                          {sub.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </>
          )}

          {/* Not registered */}
          {!profile && (
            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              className="bg-[#171717] p-8 md:p-10 text-center border border-[#272727]">
              <p className="font-display font-black text-white uppercase mb-2" style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}>
                {isRTL ? "أكمل تسجيلك" : "Complete Your Registration"}
              </p>
              <p className="font-proxima text-[#ccccd0] mb-6 txt-small">{ts("registrationRequiredDesc")}</p>
              <Link
                href={`/${locale}/submissions/register`}
                className="inline-flex items-center gap-2 h-12 px-10 bg-[#22bb39] text-white font-display font-black uppercase txt-small tracking-[2px] hover:opacity-90 transition-opacity">
                {ts("registerStart")}
                <Arrow className="size-4" />
              </Link>
            </motion.div>
          )}

          {/* Contact info card */}
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.19 }}
            className="bg-[#171717] p-5 md:p-6">
            <p className="font-proxima txt-smaller text-[#b6b6b6] uppercase tracking-wider mb-4">{t("contactInfo")}</p>
            {[
              { Icon: IoMailOutline,          label: t("email"), value: displayEmail, onEdit: () => setShowEmail(true), cta: displayEmail ? t("change") : t("add") },
              { Icon: IoPhonePortraitOutline, label: t("phone"), value: user.phone || null, onEdit: () => setShowPhone(true), cta: user.phone ? t("change") : t("add") },
            ].map(({ Icon, label, value, onEdit, cta }) => (
              <div key={label} className="flex items-center justify-between py-3 border-b border-[#272727] last:border-0 gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <Icon className="size-4 text-[#444] shrink-0" />
                  <div className="min-w-0">
                    <p className="font-proxima txt-smaller text-[#b6b6b6]">{label}</p>
                    <p className="font-proxima txt-small text-white truncate">{value || t("notSet")}</p>
                  </div>
                </div>
                <button
                  onClick={onEdit}
                  className="shrink-0 px-3 h-8 bg-black border border-[#333] text-[#ccccd0] font-proxima hover:text-white hover:border-[#555] transition-colors txt-smaller whitespace-nowrap">
                  {cta}
                </button>
              </div>
            ))}
          </motion.div>

          {/* Logout */}
          <button
            onClick={() => { toast.info(t("loggingOut")); logout(); }}
            className="w-full flex items-center justify-center gap-3 h-12 border border-[#2a2a2a] text-[#ccccd0] hover:text-red-400 hover:border-red-400/30 font-display font-bold uppercase transition-colors"
            style={{ fontSize: "13px", letterSpacing: "1.5px" }}>
            <IoLogOutOutline className="size-5" />
            {t("logout")}
          </button>
        </div>
      )}

      {showEmail && <ChangeEmailModal currentEmail={displayEmail} onClose={() => setShowEmail(false)} />}
      {showPhone && <ChangePhoneModal currentPhone={user.phone} currentPhoneKey={user.phoneKey} onClose={() => setShowPhone(false)} />}
    </AuthShell>
  );
}