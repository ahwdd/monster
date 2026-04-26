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
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/contexts/ToastContext";
import {
  getRankProgress,
  formatNumber,
  getMonthsInProgram,
  MONTH_RANGE,
  RANK_THRESHOLDS,
  MIN_QUARTER_SCORE,
  MIN_CONTENT,
  MAX_SUBMISSIONS_PER_RANK,
  MAX_REACH_PER_RANK,
} from "@/lib/utils/rank";
import ProfileSkeleton, {
  KPI_ENG,
  KPI_VIEWS,
  RANK_COLORS,
  RANK_LABEL_AR,
  RANK_LABEL_EN,
  NEXT_RANK_COLOR,
  RankBadge,
  ReqRow,
  StatCard,
  STATUS_BG,
  REQ,
} from "./ProfileSkeleton";

const PENDING_CAP = 5;

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
  const [canSubmit, setCanSubmit] = useState(true);
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  useEffect(() => {
    if (initializationComplete && !isAuthenticated)
      router.push(`/auth/signin`);
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
  const rankLabel = isRTL
    ? (RANK_LABEL_AR[rank] ?? rank)
    : (RANK_LABEL_EN[rank] ?? rank);
  const currentRankReach = profile?.currentRankReach ?? 0;
  const totalReachAllTime = profile?.totalReachAllTime ?? 0;
  const threshold = RANK_THRESHOLDS[rank] ?? 0;
  const rankProgress = getRankProgress(rank, currentRankReach);
  const progressPct = Math.min(Math.round(rankProgress * 100), 100);
  const approvedAt = profile?.approvedAt ? new Date(profile.approvedAt) : null;
  const monthsIn = getMonthsInProgram(approvedAt);
  const [, maxMonth] = MONTH_RANGE[rank] ?? [0, 3];
  const [reqStreams, reqReels, reqStories] = REQ[rank] ?? REQ.UNRANKED;
  const recentSubs = submissions.slice(0, 3);

  // ── Performance score: derived from available API data ───────────────────
  // Full score (commitment + admin grading) lives server-side only.
  // We compute the two parts we have:
  //   • Views component  (out of 10): proportional to currentRankReach / threshold
  //   • Content component (out of 20): proportional to approvedSubs / MIN_CONTENT[rank]
  const approvedSubs = submissions.filter(
    (s) => s.status === "APPROVED",
  ).length;
  const minContent = MIN_CONTENT[rank] ?? 20;
  const scoreMax = MIN_QUARTER_SCORE[rank] || 50; // 50 / 70 / 90 per rank; 0 for UNRANKED → show /50
  const viewsPts = Math.min(
    10,
    Math.round((currentRankReach / (threshold || 1)) * 10),
  );
  const contentPts = Math.min(
    20,
    Math.round((approvedSubs / (minContent || 1)) * 20),
  );
  const estScore = viewsPts + contentPts;

  // ── Stat card targets ────────────────────────────────────────────────────
  const maxSubs = MAX_SUBMISSIONS_PER_RANK[rank] ?? 20;
  const maxReach = MAX_REACH_PER_RANK[rank] ?? 50_000;

  // Next rank label
  const NEXT_RANK_LABEL_EN: Record<string, string> = {
    UNRANKED: "Rookie Monster",
    ROOKIE: "Rising Monster",
    RISING: "Cold Monster",
    COLD: "Cold Monster",
  };
  const NEXT_RANK_LABEL_AR: Record<string, string> = {
    UNRANKED: "مبتدئ مونستر",
    ROOKIE: "صاعد مونستر",
    RISING: "كولد مونستر",
    COLD: "كولد مونستر",
  };
  const NEXT_RANK_COLOR_MAP: Record<string, string> = {
    UNRANKED: "#22bb39",
    ROOKIE: "#d4ff00",
    RISING: "#00cfff",
    COLD: "#00cfff",
  };

  return (
    <AuthShell breadcrumbs={[{ label: isRTL ? "لوحة التحكم" : "Dashboard" }]}>
      {/* Show skeleton while profile loads */}
      {!profileLoaded ? (
        <ProfileSkeleton />
      ) : (
        <div className="font-proxima max-w-340 mx-auto px-4 md:px-8 xl:px-35 py-8 md:py-10 space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start sm:items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              {/* Avatar circle with rank color */}
              <div
                className="p-2 md:p-4 aspect-square rounded-full flex items-center justify-center 
                 font-black text-white bg-[#22bb39] header-regular">
                {initials}
              </div>
              <div>
                <h1
                  className=" font-black text-white leading-tight"
                  style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)" }}>
                  {isRTL
                    ? `مرحباً، ${user.firstName}`
                    : `Hello, ${user.firstName}`}
                </h1>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  {isApproved && <RankBadge rank={rank} label={rankLabel} />}
                  {isApproved && (
                    <span className=" text-[#555] txt-smaller">
                      {isRTL
                        ? `• الربع 1 | الشهر ${Math.min(monthsIn, maxMonth)}`
                        : `• Quarter 1 | Month ${Math.min(monthsIn, maxMonth)}`}
                    </span>
                  )}
                  {isPending && (
                    <span
                      className=" txt-smaller px-2 py-0.5 border"
                      style={{ color: "#bfec1d", borderColor: "#bfec1d44" }}>
                      {isRTL ? "قيد المراجعة" : "Pending Approval"}
                    </span>
                  )}
                  {isRejected && (
                    <span className=" txt-smaller px-2 py-0.5 border border-red-400/30 text-red-400">
                      {isRTL ? "مرفوض" : "Rejected"}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3 flex-wrap">
              {isApproved && canSubmit && (
                <Link
                  href={`/submissions/submit`}
                  className="h-11 px-5 bg-[#22bb39] txt-smaller flex items-center gap-2  
                  font-bold uppercase text-black tracking-[1.2px] hover:opacity-90 transition-opacity whitespace-nowrap">
                  <IoAddCircleOutline className="size-4" />
                  <span>{isRTL ? "رفع محتوى" : "Submit Content"}</span>
                </Link>
              )}
            </div>
          </motion.div>

          {/* ── Status banners ── */}
          {isPending && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-start justify-between gap-4 p-4 border border-[#bfec1d]/25 bg-[#bfec1d]/5">
              <div className="flex items-start gap-3">
                <IoTimeOutline
                  className="size-5 shrink-0 mt-0.5"
                  style={{ color: "#bfec1d" }}
                />
                <div>
                  <p
                    className=" font-bold uppercase txt-small"
                    style={{ color: "#bfec1d" }}>
                    {t("applicationUnderReview")}
                  </p>
                  <p className=" txt-smaller text-[#ccccd0] mt-1">
                    {t("applicationUnderReviewDesc")}
                  </p>
                </div>
              </div>
              <Link
                href={`/submissions/register?editMode=true`}
                className="shrink-0 flex items-center gap-1.5 px-3 h-8 bg-[#171717] text-white  txt-smaller hover:bg-[#222] transition-colors whitespace-nowrap">
                <IoCreateOutline className="size-3.5" />
                {t("editApplication")}
              </Link>
            </motion.div>
          )}

          {isRejected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-start justify-between gap-4 p-4 border border-red-400/25 bg-red-400/5">
              <div className="flex items-start gap-3">
                <IoWarningOutline className="size-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className=" font-bold text-red-400 uppercase txt-small">
                    {t("applicationRejected")}
                  </p>
                  <p className=" txt-smaller text-[#ccccd0] mt-1">
                    {t("applicationRejectedDesc")}
                  </p>
                </div>
              </div>
              <Link
                href={`/submissions/register?editMode=true`}
                className="shrink-0 flex items-center gap-1.5 px-3 h-8 bg-[#22bb39] text-white  txt-smaller font-semibold hover:opacity-90 transition-opacity whitespace-nowrap">
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
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 }}
                  className="bg-[#171717] rounded-lg p-5 md:p-6">
                  <p className="txt-smaller font-bold text-white uppercase tracking-wider mb-4">
                    {isRTL ? "تقدم المستوى" : "Level Progress"}
                  </p>
                  <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="font-black uppercase txt-small"
                        style={{ color: rankColor }}>
                        {rankLabel}
                      </span>
                      {rank !== "COLD" && (
                        <>
                          <span className="text-[#444] txt-smaller">→</span>
                          <span
                            className="font-black uppercase txt-small"
                            style={{ color: NEXT_RANK_COLOR_MAP[rank] }}>
                            {isRTL
                              ? NEXT_RANK_LABEL_AR[rank]
                              : NEXT_RANK_LABEL_EN[rank]}
                          </span>
                        </>
                      )}
                    </div>
                    <span className="font-black text-white txt-larger tabular-nums">
                      {rank === "COLD" ? "MAX" : `${progressPct}%`}
                    </span>
                  </div>
                  <div
                    className="w-full bg-[#272727] rounded-full overflow-hidden"
                    style={{ height: "10px" }}>
                    <motion.div
                      className="h-full"
                      style={{
                        background:
                          rank === "COLD"
                            ? rankColor
                            : `linear-gradient(to right, ${rankColor}, ${NEXT_RANK_COLOR_MAP[rank]})`,
                        backgroundSize: `${(100 / (progressPct / 100)) * 1}% 100%`,
                        backgroundRepeat: "no-repeat",
                      }}
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
                    <p className="txt-smaller text-[#555] mt-3">
                      {isRTL
                        ? `${formatNumber(Math.max(0, threshold - currentRankReach))} مشاهدة متبقية`
                        : `${formatNumber(Math.max(0, threshold - currentRankReach))} views left to next level`}
                    </p>
                  )}
                </motion.div>

                {/* Performance Score card — estimated from API data */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.09 }}
                  className="bg-[#171717] rounded-lg p-5 md:p-6 flex flex-col justify-center">
                  <p className="txt-smaller font-bold text-white uppercase tracking-wider mb-3">
                    {isRTL ? "نقاط الأداء" : "Performance Score"}
                  </p>
                  <p className="text-white leading-none mb-1 header-small">
                    <span>{estScore} / </span>
                    <span className="header-regular text-[#22bb39]">
                      {scoreMax} pts
                    </span>
                  </p>
                  <p className="txt-smaller text-[#555]">
                    {isRTL
                      ? "نقاط التفاعل الإجمالية"
                      : "Overall Engagement Score"}
                  </p>
                </motion.div>
              </div>

              {/* Row 2: 3 stat cards */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.11 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                <StatCard
                  label={isRTL ? "إجمالي المشاهدات" : "Total Views"}
                  current={formatNumber(currentRankReach)}
                  target={KPI_VIEWS[rank] ?? "50K"}
                  targetColor={NEXT_RANK_COLOR[rank]}
                />
                <StatCard
                  label={isRTL ? "إجمالي الوصول" : "Total Reach"}
                  current={formatNumber(totalReachAllTime)}
                  target={formatNumber(maxReach)}
                  targetColor={NEXT_RANK_COLOR[rank]}
                />
                <StatCard
                  label={isRTL ? "المشاركات" : "Submissions"}
                  current={String(submissions.length)}
                  target={String(maxSubs)}
                  targetColor={NEXT_RANK_COLOR[rank]}
                />
              </motion.div>

              {/* Row 3: KPI Metric Targets */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-[#171717] rounded-lg p-5 md:p-6">
                <p className="txt-smaller font-bold text-white uppercase tracking-wider mb-4">
                  {isRTL ? "مستهدفات KPI" : "KPI Metric Targets"}
                </p>
                <div className="space-y-5">
                  {/* Views KPI */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="txt-smaller text-[#ccccd0]">
                        {isRTL ? "مشاهدات KPI" : "Views KPI"}
                      </span>
                      <span className="txt-smaller font-semibold tabular-nums text-[#22bb39]">
                        {formatNumber(currentRankReach)} /{" "}
                        {KPI_VIEWS[rank] ?? "50K"}
                      </span>
                    </div>
                    <div
                      className="w-full bg-[#272727] rounded-full overflow-hidden"
                      style={{ height: "6px" }}>
                      <motion.div
                        className="h-full bg-[#22bb39]"
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
                  {/* Engagement Rate — target */}
                  {/* <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="txt-smaller text-[#ccccd0]">
                        {isRTL ? "معدل التفاعل" : "Engagement Rate"}
                      </span>
                      <span
                        className="txt-smaller font-semibold tabular-nums"
                        style={{ color: "#bfec1d" }}>
                        0.8% / {KPI_ENG[rank] ?? "0.5%"}
                      </span>
                    </div>
                    <div
                      className="w-full bg-[#272727] rounded-full overflow-hidden"
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
                  </div> */}
                </div>
              </motion.div>

              {/* Row 4: Recent Submissions table */}
              {recentSubs.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.17 }}
                  className="bg-[#171717] rounded-lg p-5 md:p-6 overflow-x-auto">
                  <div className="flex items-center justify-between mb-4 min-w-100">
                    <p className=" txt-smaller text-[#b6b6b6] uppercase tracking-wider">
                      {isRTL ? "آخر المشاركات" : "Recent Submissions"}
                    </p>
                    <Link
                      href={`/submissions`}
                      className=" txt-smaller text-[#555] hover:text-[#ccccd0] transition-colors flex items-center gap-1">
                      {isRTL ? "عرض الكل" : "View All"}
                      <Arrow className="size-3" />
                    </Link>
                  </div>
                  <div className="min-w-100">
                    <div className="grid grid-cols-[1fr_100px_100px_90px] gap-3 pb-3 border-b border-[#272727]">
                      {(isRTL
                        ? ["عنوان المحتوى", "النوع", "المشاهدات", "الحالة"]
                        : ["Content", "Type", "Views", "Status"]
                      ).map((h, i) => (
                        <span
                          key={i}
                          className="font-bold text-white uppercase tracking-wider"
                          style={{ fontSize: "11px" }}>
                          {h}
                        </span>
                      ))}
                    </div>
                    {recentSubs.map((sub) => (
                      <div
                        key={sub.id}
                        className="grid grid-cols-[1fr_100px_100px_90px] gap-3 py-3 border-b border-[#272727] items-center">
                        <span className=" txt-smaller text-white truncate">
                          {sub.contentLink?.split("/").pop()?.slice(0, 24) ??
                            "Content"}
                        </span>
                        <span className=" txt-smaller text-[#ccccd0] capitalize">
                          {sub.contentTypes?.[0]?.toLowerCase() ?? "-"}
                        </span>
                        <span className=" txt-smaller text-white tabular-nums">
                          {formatNumber(
                            sub.acceptedReach ?? sub.submittedReach ?? 0,
                          )}
                        </span>
                        <span
                          className="inline-flex items-center justify-center font-bold uppercase
                          h-5 px-1.5 text-xs text-[9px] tracking-wider w-fit rounded-lg"
                          style={{
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
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#171717] rounded-lg p-8 md:p-10 text-center border border-[#272727]">
              <p
                className=" font-black text-white uppercase mb-2"
                style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}>
                {isRTL ? "أكمل تسجيلك" : "Complete Your Registration"}
              </p>
              <p className=" text-[#ccccd0] mb-6 txt-small">
                {ts("registrationRequiredDesc")}
              </p>
              <Link
                href={`/submissions/register`}
                className="inline-flex items-center gap-2 h-12 px-10 bg-[#22bb39] text-white  font-black uppercase txt-small tracking-[2px] hover:opacity-90 transition-opacity">
                {ts("registerStart")}
                <Arrow className="size-4" />
              </Link>
            </motion.div>
          )}

          {/* Contact info card */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.19 }}
            className="bg-[#171717] rounded-lg p-5 md:p-6">
            <p className=" txt-smaller text-[#b6b6b6] uppercase tracking-wider mb-4">
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
                className="flex items-center justify-between py-3 border-b border-[#272727] last:border-0 gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <Icon className="size-4 text-[#444] shrink-0" />
                  <div className="min-w-0">
                    <p className=" txt-smaller text-[#b6b6b6]">{label}</p>
                    <p className=" txt-small text-white truncate">
                      {value || t("notSet")}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onEdit}
                  className="shrink-0 px-3 h-8 bg-black border border-[#333] text-[#ccccd0]  hover:text-white hover:border-[#555] transition-colors txt-smaller whitespace-nowrap">
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
            className="w-full flex items-center justify-center gap-3 h-12 border border-[#2a2a2a] text-[#ccccd0] hover:text-red-400 hover:border-red-400/30  font-bold uppercase transition-colors"
            style={{ fontSize: "13px", letterSpacing: "1.5px" }}>
            <IoLogOutOutline className="size-5" />
            {t("logout")}
          </button>
        </div>
      )}

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
