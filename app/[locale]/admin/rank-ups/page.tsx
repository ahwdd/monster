// src/app/[locale]/admin/rank-ups/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoWarningOutline,
  IoCheckmarkCircle,
  IoCloseCircle,
  IoRefreshOutline,
  IoArrowUpCircleOutline,
} from "react-icons/io5";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/contexts/ToastContext";
import {
  formatNumber,
  getMonthsInProgram,
  RANK_THRESHOLDS,
  MIN_MONTHS,
  MONTH_RANGE,
  type RankUpEligibility,
} from "@/lib/utils/rank";
import Skeleton from "@/components/Skeleton";

type Creator = {
  id: string;
  rank: string;
  nickname: string;
  currentRankReach: number;
  totalReachAllTime: number;
  approvedAt: string | null;
  rankedUpAt: string | null;
  pictureCount: number;
  storyCount: number;
  reelCount: number;
  longVideoCount: number;
  postCount: number;
  eligibility: RankUpEligibility;
  nextRank: string | null;
  user: { firstName: string; lastName: string; email: string | null };
};

type Filter = "all" | "eligible" | "near";
const EASE = [0.22, 1, 0.36, 1] as const;

export default function AdminRankUpsPage() {
  const t = useTranslations("admin");
  const router = useRouter();
  const toast = useToast();
  const { user, isAuthenticated, initializationComplete } = useAuth();

  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("all");
  const [promoting, setPromoting] = useState<string | null>(null);
  const [warnId, setWarnId] = useState<string | null>(null);

  useEffect(() => {
    if (!initializationComplete) return;
    if (!isAuthenticated || user?.role !== "ADMIN") router.replace("/");
  }, [initializationComplete, isAuthenticated, user, router]);

  useEffect(() => {
    if (!user || user.role !== "ADMIN") return;
    load();
  }, [user, filter]);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/rank-ups?filter=${filter}`, {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) setCreators(data.data);
    } catch {
      toast.error(t("failedLoad"));
    } finally {
      setLoading(false);
    }
  }

  async function executeRankUp(id: string, force = false) {
    setPromoting(id);
    setWarnId(null);
    try {
      const res = await fetch(`/api/admin/rank-ups/${id}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ forceRankUp: force }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`${t("rankedUp")}: ${data.message}`);
        setCreators((prev) => prev.filter((c) => c.id !== id));
      } else {
        toast.error(data.error || t("failedUpdate"));
      }
    } catch {
      toast.error(t("failedUpdate"));
    } finally {
      setPromoting(null);
    }
  }

  function handleRankUpClick(creator: Creator) {
    if (creator.eligibility.eligible) {
      executeRankUp(creator.id, false);
    } else {
      setWarnId(creator.id);
    }
  }

  if (!initializationComplete || !user || user.role !== "ADMIN") {
    return (
      <div className="px-6 py-8 space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
    );
  }

  const warnCreator = creators.find((c) => c.id === warnId);

  // Status helpers
  function statusColor(ok: boolean) {
    return ok ? "text-[#22bb39]" : "text-red-400";
  }
  function statusBg(ok: boolean) {
    return ok
      ? "bg-[#22bb39]/10 border-[#22bb39]/30"
      : "bg-red-400/10 border-red-400/30";
  }

  return (
    <div className="px-6 py-8 max-w-5xl">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="font-display font-black text-white uppercase header-large">
          {t("rankUpsTitle")}
        </h1>
        <div className="flex gap-2 items-center">
          <button
            onClick={load}
            className="p-2.5 bg-[#171717] border border-[#272727] hover:border-[#444] text-white transition-colors">
            <IoRefreshOutline className="size-4" />
          </button>
          <div className="flex gap-1 bg-[#0a0a0a] border border-[#272727] p-1">
            {(["all", "eligible", "near"] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 txt-smaller font-display font-bold uppercase tracking-wider transition-colors ${
                  filter === f
                    ? "bg-[#6bd41a] text-black"
                    : "text-[#ccccd0] hover:text-white"
                }`}>
                {f === "all"
                  ? t("all")
                  : f === "eligible"
                    ? t("eligible")
                    : t("nearEligible")}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      ) : creators.length === 0 ? (
        <div className="text-center py-20 text-[#555] font-proxima txt-regular">
          {t("noRankUpCandidates")}
        </div>
      ) : (
        <div className="space-y-3">
          {creators.map((c, i) => {
            const e = c.eligibility;
            const total =
              c.pictureCount +
              c.storyCount +
              c.reelCount +
              c.longVideoCount +
              c.postCount;
            const months = getMonthsInProgram(
              c.approvedAt ? new Date(c.approvedAt) : null,
            );
            const [, maxMonth] = MONTH_RANGE[c.rank] ?? [0, 1];
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03, ease: EASE }}
                className="bg-[#0a0a0a] border border-[#272727] p-5">
                <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
                  <div className="min-w-0">
                    <p className="txt-regular font-display font-bold text-white">
                      {c.nickname}{" "}
                      <span className="txt-smaller text-[#555]">
                        ({c.user.firstName} {c.user.lastName})
                      </span>
                    </p>
                    <div className="flex gap-2 flex-wrap mt-1">
                      <span className="txt-smaller uppercase text-[#6bd41a] bg-[#6bd41a]/10 px-2 py-0.5">
                        {c.rank.replace(/_/g, " ")}
                      </span>
                      {c.nextRank && (
                        <span className="txt-smaller text-[#555]">
                          → {c.nextRank.replace(/_/g, " ")}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleRankUpClick(c)}
                    disabled={!!promoting}
                    className="flex items-center gap-2 px-4 py-2.5 bg-[#6bd41a] hover:bg-[#7de020] text-black font-display font-bold uppercase txt-smaller tracking-wider transition-colors disabled:opacity-50">
                    {promoting === c.id ? (
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    ) : (
                      <>
                        <IoArrowUpCircleOutline className="size-4" />
                        {t("rankUp")}
                      </>
                    )}
                  </button>
                </div>

                {/* Eligibility grid */}
                <div className="grid grid-cols-3 gap-3">
                  {/* Reach */}
                  <div className={`p-3 border ${statusBg(e.reachOk)}`}>
                    <p className="txt-smaller text-[#555] mb-1">
                      {t("totalReach")}
                    </p>
                    <p
                      className={`txt-regular font-display font-bold ${statusColor(e.reachOk)}`}>
                      {formatNumber(e.missingReach ?? 0)}
                    </p>
                    <p className="txt-smaller text-[#555]">
                      / {formatNumber(e.neededReach ?? 0)}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      {e.reachOk ? (
                        <IoCheckmarkCircle className="size-3 text-[#22bb39]" />
                      ) : (
                        <IoCloseCircle className="size-3 text-red-400" />
                      )}
                      <span className={`txt-smaller ${statusColor(e.reachOk)}`}>
                        {e.reachOk ? t("met") : t("notMet")}
                      </span>
                    </div>
                  </div>

                  {/* Months */}
                  <div className={`p-3 border ${statusBg(e.monthsOk)}`}>
                    <p className="txt-smaller text-[#555] mb-1">
                      {t("months")}
                    </p>
                    <p
                      className={`txt-regular font-display font-bold ${statusColor(e.monthsOk)}`}>
                      {months}/{maxMonth}
                    </p>
                    <p className="txt-smaller text-[#555]">
                      {t("minMonths")}: {e.missingMonths ?? 0}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      {e.monthsOk ? (
                        <IoCheckmarkCircle className="size-3 text-[#22bb39]" />
                      ) : (
                        <IoCloseCircle className="size-3 text-red-400" />
                      )}
                      <span
                        className={`txt-smaller ${statusColor(e.monthsOk)}`}>
                        {e.monthsOk ? t("met") : t("notMet")}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`p-3 border ${statusBg(e.contentOk)}`}>
                    <p className="txt-smaller text-[#555] mb-1">
                      {t("contentCount")}
                    </p>
                    <p
                      className={`txt-regular font-display font-bold ${statusColor(e.contentOk)}`}>
                      {total}
                    </p>
                    <p className="txt-smaller text-[#555]">
                      {t("min")}: {e.missingContent ?? 0}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      {e.contentOk ? (
                        <IoCheckmarkCircle className="size-3 text-[#22bb39]" />
                      ) : (
                        <IoCloseCircle className="size-3 text-red-400" />
                      )}
                      <span
                        className={`txt-smaller ${statusColor(e.contentOk)}`}>
                        {e.contentOk ? t("met") : t("notMet")}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Force rank-up warning modal */}
      <AnimatePresence>
        {warnId && warnCreator && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setWarnId(null)}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="bg-[#0a0a0a] border border-[#bfec1d]/30 p-6 max-w-md w-full space-y-4"
              onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-3">
                <IoWarningOutline className="size-6 text-[#bfec1d] shrink-0" />
                <h3 className="txt-larger font-display font-bold text-[#bfec1d] uppercase">
                  {t("forceRankUpTitle")}
                </h3>
              </div>
              <p className="txt-small text-[#ccccd0]">
                {t("forceRankUpDesc", { name: warnCreator.nickname })}
              </p>
              <ul className="space-y-1.5">
                {!warnCreator.eligibility.reachOk && (
                  <li className="flex items-center gap-2 txt-smaller text-red-400">
                    <IoCloseCircle className="size-4 shrink-0" />
                    {t("reachNotMet")}:{" "}
                    {formatNumber(warnCreator.eligibility.missingReach ?? 0)} /{" "}
                    {formatNumber(warnCreator.eligibility.neededReach ?? 0)}
                  </li>
                )}
                {!warnCreator.eligibility.monthsOk && (
                  <li className="flex items-center gap-2 txt-smaller text-red-400">
                    <IoCloseCircle className="size-4 shrink-0" />
                    {t("monthsNotMet")}: {warnCreator.eligibility.missingMonths}{" "}
                    / {warnCreator.eligibility.neededMonths}
                  </li>
                )}
                {!warnCreator.eligibility.contentOk && (
                  <li className="flex items-center gap-2 txt-smaller text-red-400">
                    <IoCloseCircle className="size-4 shrink-0" />
                    {t("contentNotMet")}:{" "}
                    {warnCreator.eligibility.missingContent} /{" "}
                    {warnCreator.eligibility.neededContent}
                  </li>
                )}
              </ul>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setWarnId(null)}
                  className="flex-1 py-2.5 bg-[#171717] border border-[#272727] hover:border-[#444] text-white txt-smaller transition-colors">
                  {t("cancel")}
                </button>
                <button
                  onClick={() => executeRankUp(warnId, true)}
                  disabled={!!promoting}
                  className="flex-1 py-2.5 bg-[#bfec1d]/10 hover:bg-[#bfec1d]/20 border border-[#bfec1d]/30 text-[#bfec1d] font-display font-bold uppercase txt-smaller tracking-wider transition-colors disabled:opacity-50">
                  {t("forceConfirm")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
