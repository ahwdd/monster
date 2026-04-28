// src/app/[locale]/admin/rank-downs/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter }           from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoWarningOutline, IoCheckmarkCircle, IoCloseCircle,
  IoRefreshOutline, IoArrowDownCircleOutline,
  IoInformationCircleOutline,
} from "react-icons/io5";
import { useAuth }  from "@/hooks/useAuth";
import { useToast } from "@/contexts/ToastContext";
import { formatNumber, getMonthsInProgram, RANK_THRESHOLDS, type RankUpEligibility } from "@/lib/utils/rank";
import { RANK_COLOR, RANK_LABEL_EN } from "@/lib/data/rankConfig";
import Skeleton from "@/components/Skeleton";

type Creator = {
  id: string; rank: string; nickname: string;
  currentRankReach: number; totalReachAllTime: number;
  approvedAt: string | null; rankedUpAt: string | null;
  eligibility: RankUpEligibility;
  latestSnapshotKey: string | null;
  user: { firstName: string; lastName: string; email: string | null };
};

const EASE    = [0.22, 1, 0.36, 1] as const;
const RANK_ORDER = ["UNRANKED","ROOKIE","RISING","COLD"];

function prevRank(rank: string): string | null {
  const i = RANK_ORDER.indexOf(rank);
  return i > 0 ? RANK_ORDER[i-1] : null;
}

export default function AdminRankDownsPage() {
  const router = useRouter();
  const toast  = useToast();
  const { user, isAuthenticated, initializationComplete } = useAuth();

  const [creators,  setCreators]  = useState<Creator[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [demoting,  setDemoting]  = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  useEffect(() => {
    if (!initializationComplete) return;
    if (!isAuthenticated || user?.role !== "ADMIN") router.replace("/");
  }, [initializationComplete, isAuthenticated, user, router]);

  useEffect(() => {
    if (!user || user.role !== "ADMIN") return;
    load();
  }, [user]);

  async function load() {
    setLoading(true);
    try {
      const res  = await fetch("/api/admin/rank-downs", { credentials: "include" });
      const data = await res.json();
      if (data.success) setCreators(data.data);
    } catch { toast.error("Failed to load"); }
    finally  { setLoading(false); }
  }

  async function executeDemote(id: string, snapshotKey: string | null) {
    setDemoting(id);
    setConfirmId(null);
    try {
      const res  = await fetch(`/api/admin/rank-downs/${id}`, {
        method: "POST", credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ snapshotKey }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        if (data.needsRepair) {
          toast.info("Run Repair Data to recalculate content counts");
        }
        setCreators((prev) => prev.filter((c) => c.id !== id));
      } else {
        toast.error(data.error || "Failed to demote");
      }
    } catch { toast.error("Error"); }
    finally  { setDemoting(null); }
  }

  if (!initializationComplete || !user || user.role !== "ADMIN") {
    return <div className="px-6 py-8 space-y-3">{Array.from({length:4}).map((_,i)=><Skeleton key={i} className="h-20"/>)}</div>;
  }

  const confirmCreator = creators.find((c) => c.id === confirmId);

  return (
    <div className="px-6 py-8 max-w-5xl">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="font-display font-black text-white uppercase header-large">Rank Downs</h1>
          <p className="txt-smaller text-[#555] mt-1">Demote a creator to their previous rank. Use only to correct mistakes.</p>
        </div>
        <button onClick={load}
          className="p-2.5 bg-[#171717] border border-[#272727] hover:border-[#444] text-white transition-colors">
          <IoRefreshOutline className="size-4"/>
        </button>
      </div>

      {/* Warning banner */}
      <div className="flex items-start gap-3 p-4 border border-[#bfec1d]/20 bg-[#bfec1d]/5 mb-5">
        <IoWarningOutline className="size-5 text-[#bfec1d] shrink-0 mt-0.5"/>
        <p className="txt-smaller text-[#ccccd0]">
          Demoting restores pre-rank-up values from the saved snapshot where available.
          If no snapshot exists, all rank-window counters reset to zero.
          Content counts may need a Repair after demotion.
        </p>
      </div>

      {loading ? (
        <div className="space-y-2">{Array.from({length:5}).map((_,i)=><Skeleton key={i} className="h-16"/>)}</div>
      ) : creators.length === 0 ? (
        <div className="text-center py-20 text-[#555] font-proxima txt-regular">No ranked creators found</div>
      ) : (
        <div className="space-y-2">
          {creators.map((c, i) => {
            const rankColor  = RANK_COLOR[c.rank] ?? "#6b7280";
            const prev       = prevRank(c.rank);
            const prevColor  = prev ? (RANK_COLOR[prev] ?? "#6b7280") : "#6b7280";
            const wasEligible = c.eligibility.reachOk;
            const rankedUpAt  = c.rankedUpAt ? new Date(c.rankedUpAt) : null;

            return (
              <motion.div key={c.id}
                initial={{opacity:0,y:6}} animate={{opacity:1,y:0}}
                transition={{delay:i*0.025,ease:EASE}}
                className="bg-[#0a0a0a] border border-[#272727] overflow-hidden">
                <div className="p-4 flex items-center gap-4 flex-wrap">
                  <div className="size-9 rounded-full flex items-center justify-center font-display font-black text-black txt-smaller shrink-0"
                    style={{background:rankColor}}>
                    {c.nickname.charAt(0).toUpperCase()}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-display font-bold text-white txt-small">{c.nickname}</span>
                      <span className="txt-smaller text-[#444]">{c.user.firstName} {c.user.lastName}</span>
                      <span className="txt-smaller font-bold px-1.5 py-0.5 rounded-sm"
                        style={{color:rankColor,background:`${rankColor}18`}}>
                        {RANK_LABEL_EN[c.rank]??c.rank}
                      </span>
                      {prev && (
                        <span className="txt-smaller text-[#444]">
                          → <span style={{color:prevColor}}>{RANK_LABEL_EN[prev]}</span>
                        </span>
                      )}
                    </div>
                    <div className="flex gap-3 flex-wrap txt-smaller">
                      {rankedUpAt && (
                        <span className="text-[#444]">
                          Ranked up: {rankedUpAt.toLocaleDateString()}
                        </span>
                      )}
                      <span className="text-[#444]">
                        Reach: {formatNumber(c.currentRankReach)}
                      </span>
                      {c.latestSnapshotKey ? (
                        <span className="text-[#22bb39] flex items-center gap-1">
                          <IoCheckmarkCircle className="size-3"/>Snapshot available
                        </span>
                      ) : (
                        <span className="text-[#bfec1d] flex items-center gap-1">
                          <IoInformationCircleOutline className="size-3"/>No snapshot — will reset to zero
                        </span>
                      )}
                      {wasEligible && (
                        <span className="text-[#bfec1d] flex items-center gap-1">
                          <IoWarningOutline className="size-3"/>Was eligible for this rank
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => setConfirmId(c.id)}
                    disabled={!!demoting || !prev}
                    className="flex items-center gap-2 px-4 py-2 bg-red-400/10 hover:bg-red-400/20 text-red-400 border border-red-400/20 font-display font-bold uppercase txt-smaller tracking-wider transition-colors disabled:opacity-40 shrink-0">
                    {demoting===c.id
                      ? <div className="w-3.5 h-3.5 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin"/>
                      : <IoArrowDownCircleOutline className="size-4"/>}
                    Demote
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Confirm demotion modal */}
      <AnimatePresence>
        {confirmId && confirmCreator && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            onClick={() => setConfirmId(null)}>
            <motion.div
              initial={{scale:0.95,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.95,opacity:0}}
              transition={{duration:0.2,ease:EASE}}
              className="bg-[#0a0a0a] border border-red-400/30 p-6 max-w-md w-full space-y-4"
              onClick={(e) => e.stopPropagation()}>

              <div className="flex items-center gap-3">
                <IoArrowDownCircleOutline className="size-5 text-red-400 shrink-0"/>
                <h3 className="txt-small font-display font-bold text-red-400 uppercase">Confirm Demotion</h3>
              </div>

              <p className="txt-small text-[#ccccd0]">
                Demote <span className="text-white font-bold">{confirmCreator.nickname}</span> from{" "}
                <span style={{color:RANK_COLOR[confirmCreator.rank]??'#fff'}}>{RANK_LABEL_EN[confirmCreator.rank]}</span> to{" "}
                <span style={{color:RANK_COLOR[prevRank(confirmCreator.rank)??'UNRANKED']??'#fff'}}>
                  {RANK_LABEL_EN[prevRank(confirmCreator.rank)??'UNRANKED']}
                </span>?
              </p>

              {/* Eligibility warning */}
              {confirmCreator.eligibility.reachOk && (
                <div className="flex items-start gap-2 p-3 border border-[#bfec1d]/20 bg-[#bfec1d]/5">
                  <IoWarningOutline className="size-4 text-[#bfec1d] shrink-0 mt-0.5"/>
                  <p className="txt-smaller text-[#bfec1d]">
                    This creator met the reach requirements for their current rank. Demotion may be unwarranted.
                  </p>
                </div>
              )}

              {/* Snapshot info */}
              {confirmCreator.latestSnapshotKey ? (
                <div className="flex items-start gap-2 p-3 border border-[#22bb39]/20 bg-[#22bb39]/5">
                  <IoCheckmarkCircle className="size-4 text-[#22bb39] shrink-0 mt-0.5"/>
                  <p className="txt-smaller text-[#22bb39]">
                    Pre-rank-up snapshot found. Reach, engagement, and scores will be restored to their previous values.
                    Run Repair Data afterward to fix content counts.
                  </p>
                </div>
              ) : (
                <div className="flex items-start gap-2 p-3 border border-[#bfec1d]/20 bg-[#bfec1d]/5">
                  <IoInformationCircleOutline className="size-4 text-[#bfec1d] shrink-0 mt-0.5"/>
                  <p className="txt-smaller text-[#bfec1d]">
                    No snapshot available. All rank-window counters will reset to zero.
                    Run Repair Data afterward to recalculate from submissions.
                  </p>
                </div>
              )}

              <div className="flex gap-3 pt-1">
                <button onClick={() => setConfirmId(null)}
                  className="flex-1 py-2.5 bg-[#171717] border border-[#272727] hover:border-[#444] text-white txt-smaller transition-colors">
                  Cancel
                </button>
                <button
                  onClick={() => executeDemote(confirmCreator.id, confirmCreator.latestSnapshotKey)}
                  disabled={!!demoting}
                  className="flex-1 py-2.5 bg-red-400/10 hover:bg-red-400/20 border border-red-400/30 text-red-400 font-display font-bold uppercase txt-smaller tracking-wider transition-colors disabled:opacity-50">
                  Confirm Demote
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}