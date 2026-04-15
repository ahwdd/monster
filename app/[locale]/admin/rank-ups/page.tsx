"use client";

// src/app/[locale]/admin/rank-ups/page.tsx
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
  MIN_CONTENT,
  MONTH_RANGE,
  getNextRank,
  type RankUpEligibility,
} from "@/lib/utils/rank";
import AdminSidebar from "@/components/admin/AdminSideBar";

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

const STATUS_COLOR: Record<string, string> = {
  green: "text-[#78be20]",
  yellow: "text-yellow-400",
  red: "text-red-400",
};

const STATUS_BG: Record<string, string> = {
  green: "bg-[#78be20]/10 border-[#78be20]/30",
  yellow: "bg-yellow-400/10 border-yellow-400/30",
  red: "bg-red-400/10 border-red-400/30",
};

export default function AdminRankUpsPage() {
  const t = useTranslations("admin");
  const router = useRouter();
  const toast = useToast();
  const { user, isAuthenticated, initializationComplete } = useAuth();

  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("all");
  const [promoting, setPromoting] = useState<string | null>(null);
  const [warnId, setWarnId] = useState<string | null>(null); // warning popup

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
    if (creator.eligibility.allOk) {
      executeRankUp(creator.id, false);
    } else {
      // Show warning popup asking admin to confirm force rank-up
      setWarnId(creator.id);
    }
  }

  if (!initializationComplete || !user || user.role !== "ADMIN") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-(--color-bg)">
        <div className="w-10 h-10 border-2 border-[#78be20] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const warnCreator = creators.find((c) => c.id === warnId);

  return (
    <div className="flex min-h-screen bg-(--color-bg)">
      <AdminSidebar />

      <main className="flex-1 pt-20 px-6 pb-12 overflow-x-auto">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <h1 className="header-large font-display font-semibold text-white uppercase">
              {t("rankUpsTitle")}
            </h1>
            <div className="flex gap-2 items-center">
              <button
                onClick={load}
                className="p-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl transition-colors">
                <IoRefreshOutline className="size-4" />
              </button>
              <div className="flex gap-1 bg-zinc-900 rounded-xl p-1">
                {(["all", "eligible", "near"] as Filter[]).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 txt-smaller font-medium rounded-lg transition-colors duration-200 ${
                      filter === f
                        ? "bg-[#78be20] text-black"
                        : "text-zinc-400 hover:text-white"
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

          {/* List */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-2 border-[#78be20] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : creators.length === 0 ? (
            <div className="text-center py-20 text-zinc-500 txt-regular">
              {t("noRankUpCandidates")}
            </div>
          ) : (
            <div className="space-y-4">
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
                    transition={{ delay: i * 0.03 }}
                    className="bg-[#0d0d0d] border border-zinc-800 rounded-2xl p-5">
                    {/* Top row */}
                    <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
                      <div className="min-w-0">
                        <p className="txt-regular font-semibold text-white">
                          {c.nickname}{" "}
                          <span className="txt-smaller text-zinc-500">
                            ({c.user.firstName} {c.user.lastName})
                          </span>
                        </p>
                        <div className="flex gap-2 flex-wrap mt-1">
                          <span className="txt-smaller uppercase text-[#78be20] bg-[#78be20]/10 px-2 py-0.5 rounded-sm">
                            {c.rank.replace(/_/g, " ")}
                          </span>
                          {c.nextRank && (
                            <span className="txt-smaller text-zinc-500">
                              → {c.nextRank.replace(/_/g, " ")}
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => handleRankUpClick(c)}
                        disabled={!!promoting}
                        className="flex items-center gap-2 px-4 py-2.5 bg-[#78be20] hover:bg-[#8fd428] text-black font-semibold txt-small rounded-xl transition-colors disabled:opacity-50">
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
                      <div
                        className={`rounded-xl p-3 border ${STATUS_BG[e.reachStatus]}`}>
                        <p className="txt-smaller text-zinc-500 mb-1">
                          {t("totalReach")}
                        </p>
                        <p
                          className={`txt-regular font-bold ${STATUS_COLOR[e.reachStatus]}`}>
                          {formatNumber(e.currentReach)}
                        </p>
                        <p className="txt-smaller text-zinc-600">
                          / {formatNumber(e.neededReach)}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          {e.reachOk ? (
                            <IoCheckmarkCircle className="size-3 text-[#78be20]" />
                          ) : (
                            <IoCloseCircle className="size-3 text-red-400" />
                          )}
                          <span
                            className={`txt-smaller ${STATUS_COLOR[e.reachStatus]}`}>
                            {e.reachOk ? t("met") : t("notMet")}
                          </span>
                        </div>
                      </div>

                      {/* Months */}
                      <div
                        className={`rounded-xl p-3 border ${STATUS_BG[e.monthsStatus]}`}>
                        <p className="txt-smaller text-zinc-500 mb-1">
                          {t("months")}
                        </p>
                        <p
                          className={`txt-regular font-bold ${STATUS_COLOR[e.monthsStatus]}`}>
                          {months}/{maxMonth}
                        </p>
                        <p className="txt-smaller text-zinc-600">
                          {t("minMonths")}: {e.neededMonths}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          {e.monthsOk ? (
                            <IoCheckmarkCircle className="size-3 text-[#78be20]" />
                          ) : (
                            <IoCloseCircle className="size-3 text-red-400" />
                          )}
                          <span
                            className={`txt-smaller ${STATUS_COLOR[e.monthsStatus]}`}>
                            {e.monthsOk ? t("met") : t("notMet")}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div
                        className={`rounded-xl p-3 border ${STATUS_BG[e.contentStatus]}`}>
                        <p className="txt-smaller text-zinc-500 mb-1">
                          {t("contentCount")}
                        </p>
                        <p
                          className={`txt-regular font-bold ${STATUS_COLOR[e.contentStatus]}`}>
                          {total}
                        </p>
                        <div className="txt-smaller text-zinc-600 space-y-0.5">
                          {c.pictureCount > 0 && (
                            <div>
                              {c.pictureCount} {t("picture")}
                            </div>
                          )}
                          {c.storyCount > 0 && (
                            <div>
                              {c.storyCount} {t("story")}
                            </div>
                          )}
                          {c.reelCount > 0 && (
                            <div>
                              {c.reelCount} {t("reel")}
                            </div>
                          )}
                          {c.longVideoCount > 0 && (
                            <div>
                              {c.longVideoCount} {t("longVideo")}
                            </div>
                          )}
                          {c.postCount > 0 && (
                            <div>
                              {c.postCount} {t("post")}
                            </div>
                          )}
                        </div>
                        <p className="txt-smaller text-zinc-600">
                          {t("min")}: {e.neededContent}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          {e.contentOk ? (
                            <IoCheckmarkCircle className="size-3 text-[#78be20]" />
                          ) : (
                            <IoCloseCircle className="size-3 text-red-400" />
                          )}
                          <span
                            className={`txt-smaller ${STATUS_COLOR[e.contentStatus]}`}>
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
        </div>
      </main>

      {/* Warning popup — admin forcing rank-up when minimums not met */}
      <AnimatePresence>
        {warnId && warnCreator && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setWarnId(null)}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-[#0d0d0d] border border-yellow-400/30 rounded-2xl p-6 max-w-md w-full space-y-4"
              onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-3">
                <IoWarningOutline className="size-6 text-yellow-400 shrink-0" />
                <h3 className="txt-larger font-semibold text-yellow-400">
                  {t("forceRankUpTitle")}
                </h3>
              </div>

              <p className="txt-small text-zinc-300">
                {t("forceRankUpDesc", { name: warnCreator.nickname })}
              </p>

              {/* Show which minimums are not met */}
              <ul className="space-y-1.5">
                {!warnCreator.eligibility.reachOk && (
                  <li className="flex items-center gap-2 txt-smaller text-red-400">
                    <IoCloseCircle className="size-4 shrink-0" />
                    {t("reachNotMet")}:{" "}
                    {formatNumber(warnCreator.eligibility.currentReach)} /{" "}
                    {formatNumber(warnCreator.eligibility.neededReach)}
                  </li>
                )}
                {!warnCreator.eligibility.monthsOk && (
                  <li className="flex items-center gap-2 txt-smaller text-red-400">
                    <IoCloseCircle className="size-4 shrink-0" />
                    {t("monthsNotMet")}: {warnCreator.eligibility.currentMonths}{" "}
                    / {warnCreator.eligibility.neededMonths}
                  </li>
                )}
                {!warnCreator.eligibility.contentOk && (
                  <li className="flex items-center gap-2 txt-smaller text-red-400">
                    <IoCloseCircle className="size-4 shrink-0" />
                    {t("contentNotMet")}:{" "}
                    {warnCreator.eligibility.currentContent} /{" "}
                    {warnCreator.eligibility.neededContent}
                  </li>
                )}
              </ul>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setWarnId(null)}
                  className="flex-1 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white txt-small rounded-xl transition-colors">
                  {t("cancel")}
                </button>
                <button
                  onClick={() => executeRankUp(warnId, true)}
                  disabled={!!promoting}
                  className="flex-1 py-2.5 bg-yellow-400/10 hover:bg-yellow-400/20 border border-yellow-400/30 text-yellow-400 font-semibold txt-small rounded-xl transition-colors disabled:opacity-50">
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
