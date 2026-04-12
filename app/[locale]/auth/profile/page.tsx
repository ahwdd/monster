// src/app/[locale]/auth/profile/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter }           from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { motion }              from "framer-motion";
import {
  IoPersonOutline, IoLogOutOutline, IoMailOutline,
  IoPhonePortraitOutline, IoTrophyOutline, IoDocumentTextOutline,
} from "react-icons/io5";
import AuthShell          from "@/components/auth/AuthShell";
import ChangeEmailModal   from "@/components/profile/ChangeEmailModal";
import ChangePhoneModal   from "@/components/profile/ChangePhoneModal";
import { useAuth }        from "@/hooks/useAuth";
import { useToast }       from "@/contexts/ToastContext";
import {
  formatLevelProgress,
  getLevelFromPoints,
  LEVEL_THRESHOLDS,
} from "@/lib/utils/points";

type Submission = {
  id:                 string;
  platform:           string;
  contentLink:        string;
  contentTypes:       string[];
  monsterAppearances: string[];
  totalReach:         number;
  totalViews:         number;
  pointsAwarded:      number;
  rank:               string;
  createdAt:          string;
};

export default function ProfilePage() {
  const t      = useTranslations("profile");
  const locale = useLocale();
  const router = useRouter();
  const toast  = useToast();
  const { user, isAuthenticated, initializationComplete, logout } = useAuth();

  const [submissions,      setSubmissions]      = useState<Submission[]>([]);
  const [submissionsLoaded, setSubmissionsLoaded] = useState(false);
  const [showEmailModal,   setShowEmailModal]   = useState(false);
  const [showPhoneModal,   setShowPhoneModal]   = useState(false);

  useEffect(() => {
    if (initializationComplete && !isAuthenticated) router.push(`/${locale}/auth/signin`);
  }, [initializationComplete, isAuthenticated]);

  useEffect(() => {
    if (!user) return;
    fetch("/api/submissions/mine", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => { if (d.success) setSubmissions(d.data); })
      .catch(() => {})
      .finally(() => setSubmissionsLoaded(true));
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

  const profile       = user.profile;
  const totalPoints   = profile?.totalPoints ?? 0;
  const levelKey      = getLevelFromPoints(totalPoints);
  const levelNum      = parseInt(levelKey.replace("LEVEL_", ""), 10);
  const levelProgress = profile?.levelProgress ?? 0;
  const progressPct   = Math.round(levelProgress * 100);
  const threshold     = LEVEL_THRESHOLDS[levelKey];
  const nextTarget    = threshold.max === Infinity ? null : threshold.max + 1;

  const initial = user.firstName?.charAt(0)?.toUpperCase() ?? "?";

  // Show email if it doesn't look like a phone-derived placeholder
  const displayEmail = user.email && !user.email.includes("@temp.monster") ? user.email : null;

  return (
    <AuthShell>
      <div className="max-w-2xl mx-auto px-4 py-10 space-y-6">

        {/* ── Identity card ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="bg-[#0d0d0d] border border-zinc-800 rounded-2xl p-6 flex items-center gap-5"
        >
          <span className="w-16 h-16 rounded-full bg-[#78be20] flex items-center justify-center font-display font-bold text-black text-3xl shrink-0">
            {initial}
          </span>
          <div className="min-w-0 flex-1">
            <h1 className="header-small font-display font-semibold text-white truncate">
              {user.firstName} {user.lastName}
            </h1>
            <p className="txt-small text-zinc-500 truncate">{displayEmail || user.phone}</p>
            {profile?.rank && profile.rank !== "UNRANKED" && (
              <span className="inline-block mt-1.5 txt-smaller font-medium uppercase tracking-wide text-[#78be20] border border-[#78be20]/30 px-2 py-0.5 rounded-sm">
                {profile.rank.replace(/_/g, " ")}
              </span>
            )}
          </div>
        </motion.div>

        {/* ── Level & progress ── */}
        {profile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05, ease: [0.4, 0, 0.2, 1] }}
            className="bg-[#0d0d0d] border border-zinc-800 rounded-2xl p-6 space-y-4"
          >
            <div className="flex items-center gap-2 mb-1">
              <IoTrophyOutline className="size-5 text-[#78be20]" />
              <h2 className="txt-larger font-semibold text-white uppercase tracking-wide">
                {t("level")} {levelNum}
              </h2>
              <span className="ms-auto txt-small text-zinc-400">
                {totalPoints.toLocaleString()} {t("points")}
              </span>
            </div>

            {/* Progress bar */}
            <div className="h-2.5 rounded-full bg-zinc-800 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
                className="h-full bg-monster rounded-full"
              />
            </div>
            <div className="flex justify-between txt-smaller text-zinc-500">
              <span>{formatLevelProgress(totalPoints)}</span>
              {nextTarget && <span>{t("nextLevel")}: {nextTarget.toLocaleString()} pts</span>}
            </div>

            {/* Content quotas */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { label: t("streams"), value: profile.streamCount, target: 10 },
                { label: t("shorts"),  value: profile.shortCount,  target: 10 },
                { label: t("reels"),   value: profile.reelCount,   target: 5  },
              ].map(({ label, value, target }) => (
                <div key={label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-center">
                  <p className="header-small font-display font-bold text-white leading-none">
                    {value}
                    <span className="txt-small text-zinc-500 font-normal">/{target}</span>
                  </p>
                  <p className="txt-smaller text-zinc-500 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Submissions history ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          className="bg-[#0d0d0d] border border-zinc-800 rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-5">
            <IoDocumentTextOutline className="size-5 text-[#78be20]" />
            <h2 className="txt-larger font-semibold text-white uppercase tracking-wide">{t("submissions")}</h2>
          </div>

          {!submissionsLoaded ? (
            <div className="flex justify-center py-8">
              <div className="w-7 h-7 border-2 border-[#78be20] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : submissions.length === 0 ? (
            <p className="txt-small text-zinc-500 text-center py-8">{t("noSubmissions")}</p>
          ) : (
            <div className="space-y-3">
              {submissions.map((s, i) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-center justify-between gap-4"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="txt-smaller font-medium uppercase text-[#78be20] bg-[#78be20]/10 px-2 py-0.5 rounded-sm">
                        {s.platform}
                      </span>
                      <span className="txt-smaller text-zinc-500">
                        {new Date(s.createdAt).toLocaleDateString(locale)}
                      </span>
                    </div>
                    <a href={s.contentLink} target="_blank" rel="noopener noreferrer"
                      className="txt-small text-zinc-300 hover:text-white transition-colors truncate block max-w-xs">
                      {s.contentLink}
                    </a>
                    <div className="flex gap-3 mt-1.5 txt-smaller text-zinc-500 flex-wrap">
                      <span>{s.totalViews.toLocaleString()} {t("views")}</span>
                      <span>{s.totalReach.toLocaleString()} {t("reach")}</span>
                    </div>
                  </div>
                  <div className="text-end shrink-0">
                    <p className="header-smaller font-display font-bold text-[#78be20]">+{s.pointsAwarded}</p>
                    <p className="txt-smaller text-zinc-500">{t("points")}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* ── Contact info ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
          className="bg-[#0d0d0d] border border-zinc-800 rounded-2xl p-6 space-y-3"
        >
          <h2 className="txt-larger font-semibold text-white uppercase tracking-wide mb-4">{t("contactInfo")}</h2>

          {/* Email row */}
          <div className="flex items-center justify-between py-3 border-b border-zinc-800">
            <div className="flex items-center gap-3 min-w-0">
              <IoMailOutline className="size-4 text-zinc-500 shrink-0" />
              <div className="min-w-0">
                <p className="txt-smaller text-zinc-500">{t("email")}</p>
                <p className="txt-small text-white truncate">{displayEmail || t("notSet")}</p>
              </div>
            </div>
            <button
              onClick={() => setShowEmailModal(true)}
              className="shrink-0 ms-4 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white txt-smaller font-medium rounded-lg transition-colors duration-200"
            >
              {displayEmail ? t("change") : t("add")}
            </button>
          </div>

          {/* Phone row */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3 min-w-0">
              <IoPhonePortraitOutline className="size-4 text-zinc-500 shrink-0" />
              <div className="min-w-0">
                <p className="txt-smaller text-zinc-500">{t("phone")}</p>
                <p className="txt-small text-white truncate">
                  {user.phone ? `${user.phoneKey ?? ""}${user.phone}` : t("notSet")}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowPhoneModal(true)}
              className="shrink-0 ms-4 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white txt-smaller font-medium rounded-lg transition-colors duration-200"
            >
              {user.phone ? t("change") : t("add")}
            </button>
          </div>
        </motion.div>

        {/* ── Logout ── */}
        <div className="h-0.75 bg-zinc-800 rounded-full" />
        <button
          onClick={() => { toast.info(t("loggingOut")); logout(); }}
          className="w-full flex items-center justify-center gap-3 py-3.5 bg-zinc-900 hover:bg-red-500/10 border border-zinc-800 hover:border-red-500/30 text-zinc-300 hover:text-red-400 txt-regular font-medium rounded-xl transition-colors duration-200"
        >
          <IoLogOutOutline className="size-5" />
          {t("logout")}
        </button>

      </div>

      {/* Modals */}
      {showEmailModal && (
        <ChangeEmailModal
          currentEmail={displayEmail}
          onClose={() => setShowEmailModal(false)}
        />
      )}
      {showPhoneModal && (
        <ChangePhoneModal
          currentPhone={user.phone}
          currentPhoneKey={user.phoneKey}
          onClose={() => setShowPhoneModal(false)}
        />
      )}
    </AuthShell>
  );
}