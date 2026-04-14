// src/app/[locale]/auth/profile/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter }           from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Link                    from "next/link";
import { motion }              from "framer-motion";
import {
  IoPersonOutline, IoLogOutOutline,
  IoMailOutline, IoPhonePortraitOutline,
  IoDocumentTextOutline, IoAddCircleOutline,
  IoArrowForward, IoArrowBack,
  IoCheckmarkCircleOutline, IoWarningOutline,
  IoSparklesOutline, IoTimeOutline,
} from "react-icons/io5";
import AuthShell        from "@/components/auth/AuthShell";
import ChangeEmailModal from "@/components/profile/ChangeEmailModal";
import ChangePhoneModal from "@/components/profile/ChangePhoneModal";
import CanLevelMeter    from "@/components/ui/CanLevelMeter";
import { useAuth }      from "@/hooks/useAuth";
import { useToast }     from "@/contexts/ToastContext";
import { getLevelFromPoints, LEVEL_THRESHOLDS } from "@/lib/utils/points";

const PENDING_CAP = 5;

export default function ProfilePage() {
  const t      = useTranslations("profile");
  const ts     = useTranslations("submissions");
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

  const displayEmail    = user.email && !user.email.includes("@temp.monster") ? user.email : null;
  const initial         = user.firstName?.charAt(0)?.toUpperCase() ?? "?";
  const totalPoints     = profile?.totalPoints  ?? 0;
  const levelKey        = getLevelFromPoints(totalPoints);
  const levelNum        = parseInt(levelKey.replace("LEVEL_", ""), 10);
  const levelProgress   = profile?.levelProgress ?? 0;
  const threshold       = LEVEL_THRESHOLDS[levelKey];
  const nextTarget      = threshold.max === Infinity ? null : threshold.max + 1;

  // Form 1 submitted (registered) but admin hasn't approved yet
  const isRegistered    = profileLoaded && !!profile;
  const isApproved      = !!profile?.isApproved;
  const isPendingApproval = isRegistered && !isApproved;
  // Can submit content only if Form 1 is approved
  const canAccessSubmit = isApproved && canSubmit;
  // Show level bar only when there are approved content submissions
  const hasPoints       = totalPoints > 0 || (profile?.rank && profile.rank !== "UNRANKED");

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
            <p className="txt-smaller text-zinc-500 truncate">{displayEmail || user.phone}</p>
            <div className="flex gap-2 mt-1.5 flex-wrap">
              {profile?.rank && profile.rank !== "UNRANKED" && (
                <span className="txt-smaller font-medium uppercase tracking-wide text-[#78be20] border border-[#78be20]/30 px-2 py-0.5 rounded-sm">
                  {profile.rank.replace(/_/g, " ")}
                </span>
              )}
              {isRegistered && isApproved && (
                <span className="txt-smaller text-[#78be20] border border-[#78be20]/30 px-2 py-0.5 rounded-sm flex items-center gap-1">
                  <IoCheckmarkCircleOutline className="size-3" />{t("registered")}
                </span>
              )}
              {isPendingApproval && (
                <span className="txt-smaller text-yellow-400 border border-yellow-400/30 px-2 py-0.5 rounded-sm flex items-center gap-1">
                  <IoTimeOutline className="size-3" />{t("loggingOut" /* placeholder — we use inline text below */)}
                </span>
              )}
            </div>
          </div>
        </motion.div>

        {/* Pending approval banner — Form 1 submitted but not yet approved */}
        {isPendingApproval && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04, duration: 0.28 }}
            className="bg-yellow-400/5 border border-yellow-400/30 rounded-2xl p-4 flex items-start gap-3"
          >
            <IoTimeOutline className="size-5 text-yellow-400 shrink-0 mt-0.5" />
            <div>
              <p className="txt-small font-semibold text-yellow-400">
                {locale === "ar" ? "طلبك قيد المراجعة" : "Application Under Review"}
              </p>
              <p className="txt-smaller text-zinc-400 mt-0.5">
                {locale === "ar"
                  ? "سيقوم الفريق بمراجعة طلبك قريبًا. ستتمكن من رفع المشاركات بعد القبول."
                  : "The team will review your application soon. You'll be able to submit content after approval."
                }
              </p>
            </div>
          </motion.div>
        )}

        {/* Level can meter — only after approval + has points */}
        {isApproved && hasPoints && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.28 }}
            className="bg-[#0d0d0d] border border-zinc-800 rounded-2xl p-5"
          >
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <CanLevelMeter
                levelNum={levelNum}
                levelProgress={levelProgress}
                totalPoints={totalPoints}
                rank={profile.rank}
                className="shrink-0"
              />
              <div className="flex-1 w-full space-y-4">
                <div className="flex items-center justify-between">
                  <span className="txt-small font-semibold text-white uppercase tracking-wide">{t("progress")}</span>
                  {nextTarget && (
                    <span className="txt-smaller text-zinc-500">{t("nextLevel")}: {nextTarget.toLocaleString()} pts</span>
                  )}
                </div>
                <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${Math.round(levelProgress * 100)}%` }}
                    transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1], delay: 0.4 }}
                    className="h-full bg-monster rounded-full" />
                </div>
                <p className="txt-smaller text-zinc-500">
                  {Math.round(levelProgress * 100)}% {locale === "ar" ? `من المستوى ${levelNum}` : `of Level ${levelNum}`}
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: t("streams"), val: profile.streamCount, target: 10 },
                    { label: t("shorts"),  val: profile.shortCount,  target: 10 },
                    { label: t("reels"),   val: profile.reelCount,   target: 5  },
                  ].map(({ label, val, target }) => (
                    <div key={label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-center">
                      <p className="header-smaller font-display font-bold text-white leading-none">
                        {val}<span className="txt-smaller text-zinc-500 font-normal">/{target}</span>
                      </p>
                      <p className="txt-smaller text-zinc-500 mt-1">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
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
              <p className="txt-smaller text-zinc-400 mt-0.5">
                {t("pendingLimitDesc", { count: pendingCount, cap: PENDING_CAP })}
              </p>
            </div>
          </motion.div>
        )}

        {/* First-submission nudge — approved but no submissions yet */}
        {isApproved && subCount === 0 && canSubmit && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06, duration: 0.28 }}
            className="bg-[#78be20]/5 border border-[#78be20]/30 rounded-2xl p-4 flex items-start gap-3"
          >
            <IoSparklesOutline className="size-5 text-[#78be20] shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="txt-small font-semibold text-[#78be20]">{t("registrationComplete")}</p>
              <p className="txt-smaller text-zinc-400 mt-0.5">{t("registrationCompleteDesc")}</p>
              <Link href="/submissions/submit"
                className="inline-flex items-center gap-1.5 mt-2.5 txt-smaller font-semibold text-[#78be20] hover:text-[#8fd428] transition-colors">
                {t("submitFirst")}
                <Arrow className="size-3.5" />
              </Link>
            </div>
          </motion.div>
        )}

        {/* Action cards */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.28 }}
          className="space-y-3"
        >
          {/* Registration — if not yet submitted */}
          {profileLoaded && !profile && (
            <ActionCard href="/submissions/register" isRTL={isRTL} highlight
              icon={<IoPersonOutline className="size-5 text-[#78be20]" />}
              title={ts("register")} description={ts("registerDesc")} cta={ts("registerStart")} />
          )}

          {/* New submission — only if approved */}
          {isRegistered && (
            <ActionCard
              href="/submissions/submit" isRTL={isRTL} disabled={!canAccessSubmit}
              icon={<IoAddCircleOutline className={`size-5 ${canAccessSubmit ? "text-[#78be20]" : "text-zinc-600"}`} />}
              title={ts("newSubmission")}
              description={
                isPendingApproval
                  ? (locale === "ar" ? "متاح بعد الموافقة على طلبك" : "Available after your application is approved")
                  : !canSubmit
                    ? ts("pendingCountHeader", { count: pendingCount, cap: PENDING_CAP })
                    : ts("newSubmissionDesc")
              }
              cta={ts("submitCta")}
            />
          )}

          {/* History — if registered */}
          {isRegistered && (
            <ActionCard href="/submissions" isRTL={isRTL}
              icon={<IoDocumentTextOutline className="size-5 text-[#78be20]" />}
              title={ts("history")}
              description={
                subCount === null
                  ? "..."
                  : subCount === 0
                    ? ts("historyNone")
                    : ts(subCount === 1 ? "historyCount" : "historyCountPlural", { count: subCount, pending: pendingCount })
              }
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
            { icon: IoMailOutline,         label: t("email"), value: displayEmail, action: () => setShowEmail(true), actionLabel: displayEmail ? t("change") : t("add") },
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
          <IoLogOutOutline className="size-5" />
          {t("logout")}
        </button>

      </div>

      {showEmail && <ChangeEmailModal currentEmail={displayEmail} onClose={() => setShowEmail(false)} />}
      {showPhone && <ChangePhoneModal currentPhone={user.phone} currentPhoneKey={user.phoneKey} onClose={() => setShowPhone(false)} />}
    </AuthShell>
  );
}

function ActionCard({ href, icon, title, description, cta, isRTL, highlight, disabled }: {
  href: string; icon: React.ReactNode; title: string; description: string;
  cta: string; isRTL: boolean; highlight?: boolean; disabled?: boolean;
}) {
  const Arrow = isRTL ? IoArrowBack : IoArrowForward;
  const inner = (
    <>
      <div className="shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className={`txt-regular font-semibold truncate ${disabled ? "text-zinc-600" : "text-white"}`}>{title}</p>
        <p className="txt-smaller text-zinc-500 truncate">{description}</p>
      </div>
      <div className={`shrink-0 flex items-center gap-1.5 txt-smaller font-medium transition-colors duration-200 ${
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