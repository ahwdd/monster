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
  IoDocumentTextOutline,
  IoArrowForward,
  IoArrowBack,
} from "react-icons/io5";
import AuthShell from "@/components/auth/AuthShell";
import ChangeEmailModal from "@/components/profile/ChangeEmailModal";
import ChangePhoneModal from "@/components/profile/ChangePhoneModal";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/contexts/ToastContext";
import {
  getRankProgress,
  formatNumber,
  getMonthsInProgram,
  MONTH_RANGE,
  RANK_THRESHOLDS,
} from "@/lib/utils/rank";
import { getRankConfig } from "@/lib/data/program";

const PENDING_CAP = 5;

// XD color map per rank
const RANK_COLORS: Record<string, string> = {
  UNRANKED: "#6b7280",
  ROOKIE: "#22bb39",
  RISING: "#d4ff00",
  COLD: "#00cfff",
};

// XD: "Rookie Monster" badge — solid colored rectangle, white text inside
function RankBadge({ rank, label }: { rank: string; label: string }) {
  const color = RANK_COLORS[rank] ?? "#6b7280";
  if (rank === "UNRANKED") {
    return (
      <span className="inline-block px-3 py-1 font-proxima text-xs text-[#ccccd0] border border-[#333]">
        {label}
      </span>
    );
  }
  // XD: Rectangle 47 — 146x26 solid fill with rank color, text white inside
  return (
    <span
      className="inline-flex items-center px-3 font-proxima font-semibold text-xs"
      style={{
        height: "26px",
        background: color,
        color: color === "#d4ff00" ? "#000" : "#fff",
      }}>
      {label}
    </span>
  );
}

// XD: stat card — #171717 bg, label #ccccd0, value white large
function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="bg-[#171717] p-6 flex flex-col gap-2">
      <p className="font-proxima text-[#ccccd0]" style={{ fontSize: "13px" }}>
        {label}
      </p>
      <p
        className="font-display font-black text-white"
        style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)" }}>
        {value}
      </p>
      {sub && (
        <p className="font-proxima text-[#ccccd0]" style={{ fontSize: "12px" }}>
          {sub}
        </p>
      )}
    </div>
  );
}

// XD: content req row — label white, count #22bb39, track #272727, filled green
function ReqRow({
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
        <span className="font-proxima text-white" style={{ fontSize: "13px" }}>
          {label}
        </span>
        <span
          className="font-proxima font-semibold"
          style={{ fontSize: "13px", color }}>
          {current} / {max}
        </span>
      </div>
      {/* XD: progress track #272727, fill color */}
      <div className="w-full h-1 bg-[#272727]">
        <motion.div
          className="h-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
      {/* XD: separator line #272727 */}
      <div className="w-full h-px bg-[#272727] mt-1" />
    </div>
  );
}

export default function ProfilePage() {
  const t = useTranslations("profile");
  const ts = useTranslations("submissions");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const router = useRouter();
  const toast = useToast();
  const Arrow = isRTL ? IoArrowBack : IoArrowForward;

  const { user, isAuthenticated, initializationComplete, logout } = useAuth();

  const [profile, setProfile] = useState<any>(null);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [canSubmit, setCanSubmit] = useState(true);
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  useEffect(() => {
    if (initializationComplete && !isAuthenticated)
      router.push(`/${locale}/auth/signin`);
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
          setPendingCount(d.pendingCount ?? 0);
          setCanSubmit(d.canSubmit ?? true);
        }
      })
      .catch(() => {});
  }, [user]);

  if (!initializationComplete || !user) {
    return (
      <AuthShell breadcrumbs={[{ label: isRTL ? "لوحة التحكم" : "Dashboard" }]}>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-[#6bd41a] border-t-transparent rounded-full animate-spin" />
        </div>
      </AuthShell>
    );
  }

  // Derived
  const displayEmail =
    user.email && !user.email.includes("@temp.monster") ? user.email : null;
  const initials =
    `${user.firstName?.charAt(0) ?? ""}${user.lastName?.charAt(0) ?? ""}`.toUpperCase() ||
    "AZ";
  const isApproved = profile?.status === "APPROVED";
  const isPending = profile?.status === "PENDING";
  const isRejected = profile?.status === "REJECTED";
  const rank = profile?.rank ?? "UNRANKED";
  const rankColor = RANK_COLORS[rank] ?? "#6b7280";
  const cfg = getRankConfig(rank);
  const currentRankReach = profile?.currentRankReach ?? 0;
  const totalReachAllTime = profile?.totalReachAllTime ?? 0;
  const threshold = RANK_THRESHOLDS[rank] ?? 0;
  const rankProgress = getRankProgress(rank, currentRankReach);
  const progressPct = Math.min(Math.round(rankProgress * 100), 100);
  const approvedAt = profile?.approvedAt ? new Date(profile.approvedAt) : null;
  const monthsIn = getMonthsInProgram(approvedAt);
  const [, maxMonth] = MONTH_RANGE[rank] ?? [0, 3];

  const rankLabelEn: Record<string, string> = {
    UNRANKED: "Unranked",
    ROOKIE: "Rookie Monster",
    RISING: "Rising Monster",
    COLD: "Cold Monster",
  };
  const rankLabelAr: Record<string, string> = {
    UNRANKED: "غير مصنّف",
    ROOKIE: "مبتدئ مونستر",
    RISING: "صاعد مونستر",
    COLD: "كولد مونستر",
  };
  const rankLabel = isRTL
    ? (rankLabelAr[rank] ?? rank)
    : (rankLabelEn[rank] ?? rank);

  // XD: content req defaults per rank (Live / Reels / Stories)
  const REQ: Record<string, [number, number, number]> = {
    UNRANKED: [8, 2, 10],
    ROOKIE: [12, 4, 16],
    RISING: [16, 8, 24],
    COLD: [20, 16, 36],
  };
  const [reqStreams, reqReels, reqStories] = REQ[rank] ?? REQ.UNRANKED;

  const KPI_VIEWS: Record<string, string> = {
    UNRANKED: "50K",
    ROOKIE: "75K",
    RISING: "150K",
    COLD: "650K",
  };
  const KPI_ENG: Record<string, string> = {
    UNRANKED: "0.5%",
    ROOKIE: "1%",
    RISING: "2%",
    COLD: "3%",
  };

  // Status pill colors — XD uses solid fill rects
  const STATUS_COLOR: Record<string, string> = {
    APPROVED: "#22bb39",
    PENDING: "#bfec1d",
    REJECTED: "#ef4444",
  };

  const recentSubs = submissions.slice(0, 3);

  return (
    <AuthShell breadcrumbs={[{ label: isRTL ? "لوحة التحكم" : "Dashboard" }]}>
      {/* XD: content starts below breadcrumb, max-width centered */}
      <div className="max-w-360 mx-auto px-35 py-10 space-y-6">
        {/* ── Identity row — XD: avatar circle + name + badge + submit btn ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            {/* XD: circle avatar with initials, bg uses rank color */}
            <div
              className="w-18 h-18 rounded-full flex items-center justify-center
                font-display font-black text-white shrink-0"
              style={{ background: rankColor, fontSize: "1.5rem" }}>
              {initials}
            </div>
            <div>
              {/* XD: "Hello, Aziz" white */}
              <h1
                className="font-display font-black text-white"
                style={{ fontSize: "clamp(1.4rem, 2vw, 1.8rem)" }}>
                {isRTL
                  ? `مرحباً، ${user.firstName}`
                  : `Hello, ${user.firstName}`}
              </h1>
              <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                {/* XD: rank badge solid rect */}
                {isApproved && <RankBadge rank={rank} label={rankLabel} />}
                {/* XD: "• Quarter 1 | Month 2" #ccccd0 */}
                {isApproved && (
                  <span
                    className="font-proxima text-[#ccccd0]"
                    style={{ fontSize: "13px" }}>
                    {isRTL
                      ? `• الربع 1 | الشهر ${Math.min(monthsIn, maxMonth)}`
                      : `• Quarter 1 | Month ${Math.min(monthsIn, maxMonth)}`}
                  </span>
                )}
                {isPending && (
                  <span className="font-proxima text-[#bfec1d] border border-[#bfec1d]/30 px-2 py-0.5 text-xs">
                    {isRTL ? "قيد المراجعة" : "Pending Approval"}
                  </span>
                )}
                {isRejected && (
                  <span className="font-proxima text-red-400 border border-red-400/30 px-2 py-0.5 text-xs">
                    {isRTL ? "مرفوض" : "Rejected"}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* XD: "Submit Content" — Rectangle 40 190x48 #22bb39 fill, white text */}
          {isApproved && canSubmit && (
            <Link
              href={`/${locale}/submissions/submit`}
              className="flex items-center gap-2 font-display font-bold uppercase text-white
                tracking-[1.5px] transition-colors hover:opacity-90"
              style={{
                height: "48px",
                paddingInline: "24px",
                background: "#22bb39",
                fontSize: "13px",
              }}>
              <IoAddCircleOutline className="size-4" />
              {isRTL ? "رفع محتوى" : "+ Submit Content"}
            </Link>
          )}
        </motion.div>

        {/* Status banners */}
        {isPending && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-start justify-between gap-4 p-5 border border-[#bfec1d]/30 bg-[#bfec1d]/5">
            <div className="flex items-start gap-3">
              <IoTimeOutline className="size-5 text-[#bfec1d] mt-0.5 shrink-0" />
              <div>
                <p className="font-display font-bold text-[#bfec1d] uppercase text-sm">
                  {t("applicationUnderReview")}
                </p>
                <p className="font-proxima text-[#ccccd0] text-xs mt-1">
                  {t("applicationUnderReviewDesc")}
                </p>
              </div>
            </div>
            <Link
              href={`/${locale}/submissions/register?editMode=true`}
              className="shrink-0 flex items-center gap-1.5 px-3 h-8 bg-[#171717] text-white font-proxima text-xs hover:bg-[#222] transition-colors">
              <IoCreateOutline className="size-3.5" />
              {t("editApplication")}
            </Link>
          </motion.div>
        )}
        {isRejected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-start justify-between gap-4 p-5 border border-red-400/30 bg-red-400/5">
            <div className="flex items-start gap-3">
              <IoWarningOutline className="size-5 text-red-400 mt-0.5 shrink-0" />
              <div>
                <p className="font-display font-bold text-red-400 uppercase text-sm">
                  {t("applicationRejected")}
                </p>
                <p className="font-proxima text-[#ccccd0] text-xs mt-1">
                  {t("applicationRejectedDesc")}
                </p>
                {profile?.adminNotes && (
                  <p className="font-proxima text-[#ccccd0]/60 text-xs mt-1 italic">
                    "{profile.adminNotes}"
                  </p>
                )}
              </div>
            </div>
            <Link
              href={`/${locale}/submissions/register?editMode=true`}
              className="shrink-0 flex items-center gap-1.5 px-3 h-8 bg-[#22bb39] text-white font-proxima text-xs font-semibold hover:opacity-90 transition-opacity">
              <IoCreateOutline className="size-3.5" />
              {t("editApplication")}
            </Link>
          </motion.div>
        )}

        {/* ── Dashboard grid (approved only) ── */}
        {isApproved && (
          <>
            {/* Row 1: Level Progress (wide) + Performance Score */}
            <div className="grid grid-cols-[1fr_420px] gap-4">
              {/* Level Progress — XD: bg transparent, track #272727 800x10, fill white 600x10 */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                className="bg-[#171717] p-6">
                <p
                  className="font-proxima text-[#ccccd0] mb-4"
                  style={{ fontSize: "13px" }}>
                  {isRTL ? "تقدم المستوى" : "Level Progress"}
                </p>
                {/* XD: "Rookie  →  Rising" colored text + percentage right */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="font-display font-black uppercase"
                    style={{
                      color: rankColor,
                      fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
                    }}>
                    {rankLabel}
                    <span className="text-[#ccccd0] mx-3">→</span>
                    <span
                      style={{
                        color: rankColor === "#22bb39" ? "#d4ff00" : rankColor,
                      }}>
                      {rank === "COLD"
                        ? rankLabel
                        : rank === "RISING"
                          ? isRTL
                            ? "كولد مونستر"
                            : "Cold Monster"
                          : rank === "ROOKIE"
                            ? isRTL
                              ? "صاعد مونستر"
                              : "Rising Monster"
                            : isRTL
                              ? "مبتدئ مونستر"
                              : "Rookie Monster"}
                    </span>
                  </span>
                  <span
                    className="font-display font-black text-white"
                    style={{ fontSize: "1.2rem" }}>
                    {rank === "COLD" ? "MAX" : `${progressPct}%`}
                  </span>
                </div>
                {/* XD: track 800x10 #272727, fill white */}
                <div className="w-full bg-[#272727]" style={{ height: "10px" }}>
                  <motion.div
                    className="h-full bg-white"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPct}%` }}
                    transition={{
                      duration: 1,
                      delay: 0.4,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                  />
                </div>
                {rank !== "COLD" && (
                  <p
                    className="font-proxima text-[#ccccd0] mt-3"
                    style={{ fontSize: "13px" }}>
                    {isRTL
                      ? `فقط ${formatNumber(Math.max(0, threshold - currentRankReach))} مشاهدة متبقية للمستوى التالي.`
                      : `Only ${formatNumber(Math.max(0, threshold - currentRankReach))} Views left to unlock the next level.`}
                  </p>
                )}
              </motion.div>

              {/* Performance Score — XD: Rectangle 50 420x194 #171717 */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-[#171717] p-6 flex flex-col justify-center">
                <p
                  className="font-proxima text-[#ccccd0] mb-4"
                  style={{ fontSize: "13px" }}>
                  {isRTL ? "نقاط الأداء" : "Performance Score"}
                </p>
                {/* XD: "40 / 50 pts" white large */}
                <p
                  className="font-display font-black text-white mb-2"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)" }}>
                  40 / 50 pts
                </p>
                <p
                  className="font-proxima text-[#ccccd0]"
                  style={{ fontSize: "13px" }}>
                  {isRTL
                    ? "نقاط التفاعل الإجمالية"
                    : "Overall Engagement Score"}
                </p>
              </motion.div>
            </div>

            {/* Row 2: 3 stat cards — XD: each 420x146 #171717 */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="grid grid-cols-3 gap-4">
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

            {/* Row 3: Content Requirements + KPI Metric Targets — each 645x216 #171717 */}
            <div className="grid grid-cols-2 gap-4">
              {/* Content Requirements */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.14 }}
                className="bg-[#171717] p-6">
                <p
                  className="font-proxima text-[#ccccd0] mb-5"
                  style={{ fontSize: "13px" }}>
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
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16 }}
                className="bg-[#171717] p-6">
                <p
                  className="font-proxima text-[#ccccd0] mb-5"
                  style={{ fontSize: "13px" }}>
                  {isRTL ? "مستهدفات KPI" : "KPI Metric Targets"}
                </p>
                <div className="space-y-5">
                  {/* Views KPI */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="font-proxima text-white"
                        style={{ fontSize: "13px" }}>
                        {isRTL ? "مشاهدات KPI (شهري)" : "Views KPI (Monthly)"}
                      </span>
                      <span
                        className="font-proxima font-semibold"
                        style={{ fontSize: "13px", color: rankColor }}>
                        {formatNumber(currentRankReach)} /{" "}
                        {KPI_VIEWS[rank] ?? "50K"}
                      </span>
                    </div>
                    <div
                      className="w-full bg-[#272727]"
                      style={{ height: "6px" }}>
                      <motion.div
                        className="h-full"
                        style={{ background: rankColor }}
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPct}%` }}
                        transition={{
                          duration: 0.9,
                          delay: 0.45,
                          ease: [0.4, 0, 0.2, 1],
                        }}
                      />
                    </div>
                  </div>
                  {/* Engagement Rate */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="font-proxima text-white"
                        style={{ fontSize: "13px" }}>
                        {isRTL ? "معدل التفاعل" : "Engagement Rate"}
                      </span>
                      <span
                        className="font-proxima font-semibold"
                        style={{ fontSize: "13px", color: "#bfec1d" }}>
                        0.8% / {KPI_ENG[rank] ?? "0.5%"}
                      </span>
                    </div>
                    <div
                      className="w-full bg-[#272727]"
                      style={{ height: "6px" }}>
                      <motion.div
                        className="h-full bg-[#bfec1d]"
                        initial={{ width: 0 }}
                        animate={{ width: "80%" }}
                        transition={{
                          duration: 0.9,
                          delay: 0.5,
                          ease: [0.4, 0, 0.2, 1],
                        }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Row 4: Recent Submissions — XD: 1320x216 #171717, table with solid status pills */}
            {recentSubs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
                className="bg-[#171717] p-6">
                <div className="flex items-center justify-between mb-4">
                  <p
                    className="font-proxima text-[#ccccd0]"
                    style={{ fontSize: "13px" }}>
                    {isRTL ? "آخر المشاركات" : "Recent Submissions"}
                  </p>
                  <Link
                    href={`/${locale}/submissions`}
                    className="font-proxima text-[#ccccd0] hover:text-white transition-colors flex items-center gap-1"
                    style={{ fontSize: "12px" }}>
                    {isRTL ? "عرض الكل" : "View All"}
                    <Arrow className="size-3" />
                  </Link>
                </div>

                {/* XD table header — white text, #272727 divider */}
                <div className="grid grid-cols-[1fr_120px_120px_100px] gap-4 pb-3 border-b border-[#272727]">
                  {["CONTENT TITLE", "TYPE", "VIEWS", "STATUS"].map((h, i) => (
                    <span
                      key={i}
                      className="font-display font-bold text-white uppercase"
                      style={{ fontSize: "11px", letterSpacing: "0.08em" }}>
                      {isRTL
                        ? ["عنوان المحتوى", "النوع", "المشاهدات", "الحالة"][i]
                        : h}
                    </span>
                  ))}
                </div>

                {/* XD rows */}
                {recentSubs.map((sub) => (
                  <div
                    key={sub.id}
                    className="grid grid-cols-[1fr_120px_120px_100px] gap-4 py-3 border-b border-[#272727] items-center">
                    <span
                      className="font-proxima text-white truncate"
                      style={{ fontSize: "13px" }}>
                      {sub.contentLink?.split("/").pop()?.slice(0, 30) ??
                        "Content"}
                    </span>
                    <span
                      className="font-proxima text-[#ccccd0] capitalize"
                      style={{ fontSize: "13px" }}>
                      {sub.contentTypes?.[0]?.toLowerCase() ?? "-"}
                    </span>
                    <span
                      className="font-proxima text-white"
                      style={{ fontSize: "13px" }}>
                      {formatNumber(
                        sub.acceptedReach ?? sub.submittedReach ?? 0,
                      )}
                    </span>
                    {/* XD: solid rect pill — bg = status color, text #000 */}
                    <span
                      className="inline-flex items-center justify-center font-display font-bold text-black uppercase"
                      style={{
                        height: "22px",
                        paddingInline: "8px",
                        fontSize: "10px",
                        letterSpacing: "0.06em",
                        background: STATUS_COLOR[sub.status] ?? "#555",
                        color: "#000",
                      }}>
                      {sub.status}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}
          </>
        )}

        {/* Not registered */}
        {profileLoaded && !profile && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#171717] p-10 text-center border border-[#272727]">
            <p
              className="font-display font-black text-white uppercase mb-2"
              style={{ fontSize: "clamp(1.2rem, 2vw, 1.6rem)" }}>
              {isRTL ? "أكمل تسجيلك" : "Complete Your Registration"}
            </p>
            <p className="font-proxima text-[#ccccd0] mb-6 text-sm">
              {ts("registrationRequiredDesc")}
            </p>
            <Link
              href={`/${locale}/submissions/register`}
              className="inline-flex items-center gap-2 h-12 px-10 bg-[#22bb39] text-white
                font-display font-black uppercase text-sm tracking-[2px] hover:opacity-90 transition-opacity">
              {ts("registerStart")}
              <Arrow className="size-4" />
            </Link>
          </motion.div>
        )}

        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#171717] p-6">
          <p
            className="font-proxima text-[#ccccd0] mb-4 uppercase tracking-widest"
            style={{ fontSize: "11px" }}>
            {t("contactInfo")}
          </p>
          {[
            {
              Icon: IoMailOutline,
              label: t("email"),
              value: displayEmail,
              onEdit: () => setShowEmail(true),
              cta: displayEmail ? t("change") : t("add"),
            },
            {
              Icon: IoPhonePortraitOutline,
              label: t("phone"),
              value: user.phone || null,
              onEdit: () => setShowPhone(true),
              cta: user.phone ? t("change") : t("add"),
            },
          ].map(({ Icon, label, value, onEdit, cta }) => (
            <div
              key={label}
              className="flex items-center justify-between py-3 border-b border-[#272727] last:border-0">
              <div className="flex items-center gap-3">
                <Icon className="size-4 text-[#555] shrink-0" />
                <div>
                  <p
                    className="font-proxima text-[#ccccd0]"
                    style={{ fontSize: "11px" }}>
                    {label}
                  </p>
                  <p
                    className="font-proxima text-white"
                    style={{ fontSize: "13px" }}>
                    {value || t("notSet")}
                  </p>
                </div>
              </div>
              <button
                onClick={onEdit}
                className="px-4 h-8 bg-black border border-[#333] text-[#ccccd0] font-proxima
                  hover:text-white hover:border-[#555] transition-colors"
                style={{ fontSize: "12px" }}>
                {cta}
              </button>
            </div>
          ))}
        </motion.div>

        {/* Logout */}
        <button
          onClick={() => {
            toast.info(t("loggingOut"));
            logout();
          }}
          className="w-full flex items-center justify-center gap-3 h-12
            border border-[#333] text-[#ccccd0] hover:text-red-400 hover:border-red-400/40
            font-display font-bold uppercase transition-colors"
          style={{ fontSize: "13px", letterSpacing: "1.5px" }}>
          <IoLogOutOutline className="size-5" />
          {t("logout")}
        </button>
      </div>

      {showEmail && (
        <ChangeEmailModal
          currentEmail={displayEmail}
          onClose={() => setShowEmail(false)}
        />
      )}
      {showPhone && (
        <ChangePhoneModal
          currentPhone={user.phone}
          currentPhoneKey={user.phoneKey}
          onClose={() => setShowPhone(false)}
        />
      )}
    </AuthShell>
  );
}
