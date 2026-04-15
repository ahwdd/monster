// src/app/[locale]/auth/profile/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter }           from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Link                    from "next/link";
import { motion }              from "framer-motion";
import {
  IoPersonOutline, IoLogOutOutline, IoMailOutline,
  IoPhonePortraitOutline, IoDocumentTextOutline,
  IoAddCircleOutline, IoArrowForward, IoArrowBack,
  IoCheckmarkCircleOutline, IoWarningOutline,
  IoSparklesOutline, IoTimeOutline, IoCreateOutline,
  IoTrophyOutline, IoCalendarOutline,
} from "react-icons/io5";
import AuthShell        from "@/components/auth/AuthShell";
import ChangeEmailModal from "@/components/profile/ChangeEmailModal";
import ChangePhoneModal from "@/components/profile/ChangePhoneModal";
import { useAuth }      from "@/hooks/useAuth";
import { useToast }     from "@/contexts/ToastContext";
import {
  getRankProgress,
  formatNumber,
  getMonthsInProgram,
  MONTH_RANGE,
  RANK_THRESHOLDS,
  getDecorativeTitle,
} from "@/lib/utils/rank";

const PENDING_CAP = 5;

export default function ProfilePage() {
  const t      = useTranslations("profile");
  const ts     = useTranslations("submissions");
  const tr     = useTranslations("rank");
  const locale = useLocale();
  const isRTL  = locale === "ar";
  const router = useRouter();
  const toast  = useToast();
  const { user, isAuthenticated, initializationComplete, logout } = useAuth();

  const [profile,       setProfile]       = useState<any>(null);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [subCount,      setSubCount]      = useState<number | null>(null);
  const [pendingCount,  setPendingCount]  = useState(0);
  const [canSubmit,     setCanSubmit]     = useState(true);
  const [showEmail,     setShowEmail]     = useState(false);
  const [showPhone,     setShowPhone]     = useState(false);

  useEffect(() => {
    if (initializationComplete && !isAuthenticated) router.push("/auth/signin");
  }, [initializationComplete, isAuthenticated, router]);

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
          setSubCount(d.data.length);
          setPendingCount(d.pendingCount ?? 0);
          setCanSubmit(d.canSubmit ?? true);
        }
      })
      .catch(() => {});
  }, [user]);

  if (!initializationComplete || !user) {
    return (
      <AuthShell>
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-[#78be20] border-t-transparent rounded-full animate-spin" />
        </div>
      </AuthShell>
    );
  }

  const displayEmail = user.email && !user.email.includes("@temp.monster") ? user.email : null;
  const initial      = user.firstName?.charAt(0)?.toUpperCase() ?? "?";

  // Status flags
  const isRegistered      = profileLoaded && !!profile;
  const isApproved        = profile?.status === "APPROVED";
  const isPending         = profile?.status === "PENDING";
  const isRejected        = profile?.status === "REJECTED";
  const canAccessSubmit   = isApproved && canSubmit;

  // Rank data
  const rank              = profile?.rank ?? "UNRANKED";
  const currentRankReach  = profile?.currentRankReach  ?? 0;
  const totalReachAllTime = profile?.totalReachAllTime ?? 0;
  const rankProgress      = getRankProgress(rank, currentRankReach);
  const progressPct       = Math.round(rankProgress * 100);
  const threshold         = RANK_THRESHOLDS[rank] ?? 0;
  const decorativeTitle   = getDecorativeTitle(rank, rankProgress);

  // Month tracking
  const approvedAt  = profile?.approvedAt ? new Date(profile.approvedAt) : null;
  const monthsIn    = getMonthsInProgram(approvedAt);
  const [, maxMonth]= MONTH_RANGE[rank] ?? [0, 1];
  const monthDisplay= `${Math.min(monthsIn, maxMonth)}/${maxMonth}`;

  // Content counts
  const totalContent = (profile?.pictureCount ?? 0) + (profile?.storyCount ?? 0) +
    (profile?.reelCount ?? 0) + (profile?.longVideoCount ?? 0) + (profile?.postCount ?? 0);

  const Arrow = isRTL ? IoArrowBack : IoArrowForward;

  return (
    <AuthShell>
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-4">

        {/* Identity card */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}
          className="bg-[#0d0d0d] border border-zinc-800 rounded-2xl p-5 flex items-center gap-4"
        >
          <span className="w-14 h-14 rounded-full bg-[#78be20] flex items-center justify-center font-display font-bold text-black text-2xl shrink-0">
            {initial}
          </span>
          <div className="min-w-0 flex-1">
            <h1 className="header-smaller font-display font-semibold text-white truncate">
              {user.firstName} {user.lastName}
            </h1>
            {profile?.nickname && (
              <p className="txt-smaller text-zinc-400 truncate">@{profile.nickname}</p>
            )}
            <p className="txt-smaller text-zinc-500 truncate">{displayEmail || user.phone}</p>
            <div className="flex gap-2 mt-1.5 flex-wrap">
              {/* Rank badge */}
              {isApproved && rank !== "UNRANKED" && (
                <span className="txt-smaller font-medium uppercase tracking-wide text-[#78be20] border border-[#78be20]/30 px-2 py-0.5 rounded-sm">
                  {tr(rank.toLowerCase() as any)}
                </span>
              )}
              {/* Decorative sub-rank */}
              {decorativeTitle && (
                <span className="txt-smaller text-zinc-400 border border-zinc-700 px-2 py-0.5 rounded-sm italic">
                  {tr(decorativeTitle.toLowerCase() as any)}
                </span>
              )}
              {/* Status badge */}
              {isApproved && (
                <span className="txt-smaller text-[#78be20] border border-[#78be20]/30 px-2 py-0.5 rounded-sm flex items-center gap-1">
                  <IoCheckmarkCircleOutline className="size-3" />{t("registered")}
                </span>
              )}
              {isPending && (
                <span className="txt-smaller text-yellow-400 border border-yellow-400/30 px-2 py-0.5 rounded-sm flex items-center gap-1">
                  <IoTimeOutline className="size-3" />{t("pendingApproval")}
                </span>
              )}
              {isRejected && (
                <span className="txt-smaller text-red-400 border border-red-400/30 px-2 py-0.5 rounded-sm flex items-center gap-1">
                  <IoWarningOutline className="size-3" />{t("rejected")}
                </span>
              )}
            </div>
          </div>
        </motion.div>

        {/* Status banners */}
        {isPending && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04, duration: 0.28 }}
            className="bg-yellow-400/5 border border-yellow-400/30 rounded-2xl p-4 flex items-start justify-between gap-3"
          >
            <div className="flex items-start gap-3">
              <IoTimeOutline className="size-5 text-yellow-400 shrink-0 mt-0.5" />
              <div>
                <p className="txt-small font-semibold text-yellow-400">{t("applicationUnderReview")}</p>
                <p className="txt-smaller text-zinc-400 mt-0.5">{t("applicationUnderReviewDesc")}</p>
              </div>
            </div>
            <Link href={`/${locale}/submissions/register?editMode=true`}
              className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white txt-smaller rounded-lg transition-colors">
              <IoCreateOutline className="size-3.5" />{t("editApplication")}
            </Link>
          </motion.div>
        )}

        {isRejected && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04, duration: 0.28 }}
            className="bg-red-400/5 border border-red-400/30 rounded-2xl p-4 flex items-start justify-between gap-3"
          >
            <div className="flex items-start gap-3">
              <IoWarningOutline className="size-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="txt-small font-semibold text-red-400">{t("applicationRejected")}</p>
                <p className="txt-smaller text-zinc-400 mt-0.5">{t("applicationRejectedDesc")}</p>
                {profile?.adminNotes && (
                  <p className="txt-smaller text-zinc-500 mt-1 italic">"{profile.adminNotes}"</p>
                )}
              </div>
            </div>
            <Link href={`/${locale}/submissions/register?editMode=true`}
              className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-[#78be20] hover:bg-[#8fd428] text-black font-semibold txt-smaller rounded-lg transition-colors">
              <IoCreateOutline className="size-3.5" />{t("editApplication")}
            </Link>
          </motion.div>
        )}

        {/* Rank + progress card — only when approved */}
        {isApproved && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.28 }}
            className="bg-[#0d0d0d] border border-zinc-800 rounded-2xl p-5 space-y-4"
          >
            <div className="flex items-center gap-2">
              <IoTrophyOutline className="size-4 text-[#78be20]" />
              <span className="txt-regular font-semibold text-white uppercase">{tr(rank.toLowerCase() as any)}</span>
              {decorativeTitle && (
                <span className="txt-smaller text-zinc-500 italic">/ {tr(decorativeTitle.toLowerCase() as any)}</span>
              )}
            </div>

            {/* Month counter */}
            {approvedAt && (
              <div className="flex items-center gap-2 txt-smaller text-zinc-500">
                <IoCalendarOutline className="size-3.5" />
                {t("monthsInProgram")}: <span className="text-white font-medium">{monthDisplay}</span>
              </div>
            )}

            {/* Reach progress toward next rank */}
            {rank !== "COLD" && (
              <div className="space-y-2">
                <div className="flex justify-between txt-smaller">
                  <span className="text-zinc-500">{t("currentRankReach")}</span>
                  <span className="text-white font-medium">
                    {formatNumber(currentRankReach)} / {formatNumber(threshold === Infinity ? 0 : threshold)}
                  </span>
                </div>
                <div className="h-2.5 rounded-full bg-zinc-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPct}%` }}
                    transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, #78be20, #a3e635)" }}
                  />
                </div>
                <p className="txt-smaller text-zinc-500">
                  {progressPct}% {tr("progressLabel", { next: tr(rank === "UNRANKED" ? "rookie" : rank === "ROOKIE" ? "rising" : "cold") })}
                </p>
              </div>
            )}

            {/* COLD rank note */}
            {rank === "COLD" && (
              <p className="txt-small text-[#78be20]">{tr("coldNote")}</p>
            )}

            {/* Total reach all time */}
            <div className="flex justify-between txt-smaller text-zinc-500 pt-1 border-t border-zinc-800">
              <span>{t("totalReach")}</span>
              <span className="text-white font-medium">{formatNumber(totalReachAllTime)}</span>
            </div>

            {/* Content counts */}
            <div className="grid grid-cols-5 gap-2">
              {[
                { label: "Pic",   val: profile.pictureCount    },
                { label: "Story", val: profile.storyCount      },
                { label: "Reel",  val: profile.reelCount       },
                { label: "Video", val: profile.longVideoCount  },
                { label: "Post",  val: profile.postCount       },
              ].map(({ label, val }) => (
                <div key={label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-2 text-center">
                  <p className="txt-small font-bold text-white">{val}</p>
                  <p className="txt-smaller text-zinc-500 mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Pending submissions cap warning */}
        {isApproved && !canSubmit && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06, duration: 0.28 }}
            className="bg-yellow-400/5 border border-yellow-400/30 rounded-2xl p-4 flex items-start gap-3"
          >
            <IoWarningOutline className="size-5 text-yellow-400 shrink-0 mt-0.5" />
            <div>
              <p className="txt-small font-semibold text-yellow-400">{t("pendingLimit")}</p>
              <p className="txt-smaller text-zinc-400 mt-0.5">{t("pendingLimitDesc", { count: pendingCount, cap: PENDING_CAP })}</p>
            </div>
          </motion.div>
        )}

        {/* First submission nudge */}
        {isApproved && subCount === 0 && canSubmit && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06, duration: 0.28 }}
            className="bg-[#78be20]/5 border border-[#78be20]/30 rounded-2xl p-4 flex items-start gap-3"
          >
            <IoSparklesOutline className="size-5 text-[#78be20] shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="txt-small font-semibold text-[#78be20]">{t("registrationComplete")}</p>
              <p className="txt-smaller text-zinc-400 mt-0.5">{t("registrationCompleteDesc")}</p>
              <Link href={`/${locale}/submissions/submit`}
                className="inline-flex items-center gap-1.5 mt-2.5 txt-smaller font-semibold text-[#78be20] hover:text-[#8fd428] transition-colors">
                {t("submitFirst")}<Arrow className="size-3.5" />
              </Link>
            </div>
          </motion.div>
        )}

        {/* Action cards */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.28 }}
          className="space-y-3"
        >
          {/* Register — if not done */}
          {profileLoaded && !profile && (
            <ActionCard href={`/${locale}/submissions/register`} isRTL={isRTL} highlight
              icon={<IoPersonOutline className="size-5 text-[#78be20]" />}
              title={ts("register")} description={ts("registerDesc")} cta={ts("registerStart")} />
          )}

          {/* New submission */}
          {isApproved && (
            <ActionCard href={`/${locale}/submissions/submit`} isRTL={isRTL} disabled={!canSubmit}
              icon={<IoAddCircleOutline className={`size-5 ${canSubmit ? "text-[#78be20]" : "text-zinc-600"}`} />}
              title={ts("newSubmission")}
              description={!canSubmit ? ts("pendingCountHeader", { count: pendingCount, cap: PENDING_CAP }) : ts("newSubmissionDesc")}
              cta={ts("submitCta")}
            />
          )}

          {/* Submissions history */}
          {isRegistered && (
            <ActionCard href={`/${locale}/submissions`} isRTL={isRTL}
              icon={<IoDocumentTextOutline className="size-5 text-[#78be20]" />}
              title={ts("history")}
              description={subCount === null ? "..." : subCount === 0 ? ts("historyNone") : `${subCount} — ${pendingCount} ${ts("pending")}`}
              cta={ts("history")}
            />
          )}
        </motion.div>

        {/* Contact info */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.28 }}
          className="bg-[#0d0d0d] border border-zinc-800 rounded-2xl p-5"
        >
          <h2 className="txt-small font-semibold text-white uppercase tracking-wide mb-3">{t("contactInfo")}</h2>
          {[
            { icon: IoMailOutline,          label: t("email"), value: displayEmail, action: () => setShowEmail(true), actionLabel: displayEmail ? t("change") : t("add") },
            { icon: IoPhonePortraitOutline, label: t("phone"), value: user.phone || null, action: () => setShowPhone(true), actionLabel: user.phone ? t("change") : t("add") },
          ].map(({ icon: Icon, label, value, action, actionLabel }) => (
            <div key={label} className="flex items-center justify-between py-3 border-b border-zinc-800 last:border-0">
              <div className="flex items-center gap-3 min-w-0">
                <Icon className="size-4 text-zinc-500 shrink-0" />
                <div className="min-w-0">
                  <p className="txt-smaller text-zinc-500">{label}</p>
                  <p className="txt-small text-white truncate">{value || t("notSet")}</p>
                </div>
              </div>
              <button onClick={action}
                className="shrink-0 ms-4 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white txt-smaller font-medium rounded-lg transition-colors duration-200">
                {actionLabel}
              </button>
            </div>
          ))}
        </motion.div>

        {/* Logout */}
        <div className="h-0.75 bg-zinc-800 rounded-full" />
        <button onClick={() => { toast.info(t("loggingOut")); logout(); }}
          className="w-full flex items-center justify-center gap-3 py-3.5 bg-zinc-900 hover:bg-red-500/10 border border-zinc-800 hover:border-red-500/30 text-zinc-300 hover:text-red-400 txt-regular font-medium rounded-xl transition-colors duration-200"
        >
          <IoLogOutOutline className="size-5" />{t("logout")}
        </button>
      </div>

      {showEmail && <ChangeEmailModal currentEmail={displayEmail} onClose={() => setShowEmail(false)} />}
      {showPhone && <ChangePhoneModal currentPhone={user.phone} currentPhoneKey={user.phoneKey} onClose={() => setShowPhone(false)} />}
    </AuthShell>
  );
}

function ActionCard({ href, icon, title, description, cta, isRTL, highlight, disabled }: {
  href: string; icon: React.ReactNode; title: string;
  description: string; cta: string; isRTL: boolean;
  highlight?: boolean; disabled?: boolean;
}) {
  const Arrow = isRTL ? IoArrowBack : IoArrowForward;
  const inner = (
    <>
      <div className="shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className={`txt-regular font-semibold truncate ${disabled ? "text-zinc-600" : "text-white"}`}>{title}</p>
        <p className="txt-smaller text-zinc-500 truncate">{description}</p>
      </div>
      <div className={`shrink-0 flex items-center gap-1.5 txt-smaller font-medium transition-colors ${
        disabled ? "text-zinc-700" : highlight ? "text-[#78be20]" : "text-zinc-500 group-hover:text-white"
      }`}>
        <span className="hidden sm:inline">{cta}</span>
        <Arrow className="size-4" />
      </div>
    </>
  );
  const cls = `flex items-center gap-4 p-4 rounded-2xl border transition-colors duration-200 group ${
    disabled ? "bg-zinc-900/30 border-zinc-800 cursor-not-allowed opacity-60"
    : highlight ? "bg-[#78be20]/5 border-[#78be20]/30 hover:bg-[#78be20]/10 hover:border-[#78be20]/60"
    : "bg-[#0d0d0d] border-zinc-800 hover:border-zinc-600"
  }`;
  if (disabled) return <div className={cls}>{inner}</div>;
  return <Link href={href} className={cls}>{inner}</Link>;
}