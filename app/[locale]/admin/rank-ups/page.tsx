// src/app/[locale]/admin/rank-ups/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter }           from "next/navigation";
import { useTranslations }     from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { IoWarningOutline, IoCheckmarkCircle, IoCloseCircle, IoRefreshOutline, IoArrowUpCircleOutline } from "react-icons/io5";
import { useAuth }  from "@/hooks/useAuth";
import { useToast } from "@/contexts/ToastContext";
import { formatNumber, getMonthsInProgram, RANK_THRESHOLDS, MIN_MONTHS, MONTH_RANGE, type RankUpEligibility } from "@/lib/utils/rank";
import { RANK_COLOR, RANK_LABEL_EN, NEXT_RANK_LABEL_EN, NEXT_RANK_COLOR } from "@/lib/data/rankConfig";
import Skeleton from "@/components/Skeleton";

type Creator = {
  id: string; rank: string; nickname: string;
  currentRankReach: number; totalReachAllTime: number;
  approvedAt: string | null; rankedUpAt: string | null;
  pictureCount: number; storyCount: number; reelCount: number;
  longVideoCount: number; postCount: number; streamCount: number; liveCount: number;
  eligibility: RankUpEligibility; nextRank: string | null;
  user: { firstName: string; lastName: string; email: string | null };
};

type Filter = "all" | "eligible" | "near";
const EASE = [0.22, 1, 0.36, 1] as const;

export default function AdminRankUpsPage() {
  const t      = useTranslations("admin");
  const router = useRouter();
  const toast  = useToast();
  const { user, isAuthenticated, initializationComplete } = useAuth();

  const [creators,  setCreators]  = useState<Creator[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [filter,    setFilter]    = useState<Filter>("all");
  const [promoting, setPromoting] = useState<string | null>(null);
  const [warnId,    setWarnId]    = useState<string | null>(null);

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
      const res  = await fetch(`/api/admin/rank-ups?filter=${filter}`, { credentials: "include" });
      const data = await res.json();
      if (data.success) setCreators(data.data);
    } catch { toast.error(t("failedLoad")); }
    finally  { setLoading(false); }
  }

  async function executeRankUp(id: string, force = false) {
    setPromoting(id);
    setWarnId(null);
    try {
      const res  = await fetch(`/api/admin/rank-ups/${id}`, {
        method: "POST", credentials: "include",
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
    } catch { toast.error(t("failedUpdate")); }
    finally  { setPromoting(null); }
  }

  function handleRankUpClick(creator: Creator) {
    if (creator.eligibility.eligible) executeRankUp(creator.id, false);
    else setWarnId(creator.id);
  }

  if (!initializationComplete || !user || user.role !== "ADMIN") {
    return <div className="px-6 py-8 space-y-3">{Array.from({length:5}).map((_,i)=><Skeleton key={i} className="h-20"/>)}</div>;
  }

  const warnCreator = creators.find((c) => c.id === warnId);

  return (
    <div className="px-6 py-8 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="font-display font-black text-white uppercase header-large">
          {t("rankUpsTitle")}
        </h1>
        <div className="flex gap-2 items-center">
          <button onClick={load}
            className="p-2.5 bg-[#171717] border border-[#272727] hover:border-[#444] text-white transition-colors">
            <IoRefreshOutline className="size-4" />
          </button>
          <div className="flex gap-1 bg-[#0a0a0a] border border-[#272727] p-1">
            {(["all","eligible","near"] as Filter[]).map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-1.5 txt-smaller font-display font-bold uppercase tracking-wider transition-colors ${
                  filter===f ? "bg-[#6bd41a] text-black" : "text-[#ccccd0] hover:text-white"
                }`}>
                {f==="all" ? t("all") : f==="eligible" ? t("eligible") : t("nearEligible")}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="space-y-2">{Array.from({length:5}).map((_,i)=><Skeleton key={i} className="h-20"/>)}</div>
      ) : creators.length === 0 ? (
        <div className="text-center py-20 text-[#555] font-proxima txt-regular">{t("noRankUpCandidates")}</div>
      ) : (
        <div className="space-y-2">
          {creators.map((c, i) => {
            const e          = c.eligibility;
            const total      = c.pictureCount + c.storyCount + c.reelCount + c.longVideoCount + c.postCount + c.liveCount + c.streamCount;
            const months     = getMonthsInProgram(c.approvedAt ? new Date(c.approvedAt) : null);
            const [,maxMonth]= MONTH_RANGE[c.rank] ?? [0,1];
            const neededReach   = RANK_THRESHOLDS[c.rank] ?? 0;
            const neededMonths  = MIN_MONTHS[c.rank] ?? 0;
            const neededContent = total + e.missingContent;
            const rankColor     = RANK_COLOR[c.rank] ?? "#6b7280";
            const nextColor     = NEXT_RANK_COLOR[c.rank] ?? "#6bd41a";
            const reachPct      = Math.min(100, Math.round((c.currentRankReach / (neededReach||1)) * 100));

            return (
              <motion.div key={c.id}
                initial={{opacity:0,y:6}} animate={{opacity:1,y:0}}
                transition={{delay:i*0.025,ease:EASE}}
                className="bg-[#0a0a0a] border border-[#272727] overflow-hidden">
                <div className="p-4">
                  {/* Top row */}
                  <div className="flex items-center justify-between gap-4 flex-wrap mb-3">
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Rank avatar */}
                      <div className="size-9 rounded-full flex items-center justify-center font-display font-black text-black txt-smaller shrink-0"
                        style={{background:rankColor}}>
                        {c.nickname.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-display font-bold text-white txt-small">{c.nickname}</span>
                          <span className="txt-smaller text-[#444]">{c.user.firstName} {c.user.lastName}</span>
                          <span className="txt-smaller font-bold px-1.5 py-0.5 rounded-sm"
                            style={{color:rankColor,background:`${rankColor}18`}}>
                            {RANK_LABEL_EN[c.rank] ?? c.rank}
                          </span>
                          {c.nextRank && (
                            <span className="txt-smaller text-[#444]">
                              → <span style={{color:nextColor}}>{NEXT_RANK_LABEL_EN[c.rank]}</span>
                            </span>
                          )}
                          {e.eligible && (
                            <span className="txt-smaller text-[#22bb39] bg-[#22bb39]/10 px-1.5 py-0.5 rounded-sm flex items-center gap-1">
                              <IoCheckmarkCircle className="size-3"/>All requirements met
                            </span>
                          )}
                        </div>
                        {/* Reach progress bar */}
                        <div className="flex items-center gap-2 mt-1.5">
                          <div className="w-32 bg-[#1a1a1a] rounded-full overflow-hidden" style={{height:"3px"}}>
                            <div className="h-full rounded-full transition-all" style={{width:`${reachPct}%`,background:rankColor}}/>
                          </div>
                          <span className="txt-smaller text-[#444] tabular-nums">
                            {formatNumber(c.currentRankReach)} / {formatNumber(neededReach)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button onClick={() => handleRankUpClick(c)} disabled={!!promoting}
                      className="flex items-center gap-2 px-4 py-2 bg-[#6bd41a] hover:bg-[#7de020] text-black font-display font-bold uppercase txt-smaller tracking-wider transition-colors disabled:opacity-50 shrink-0">
                      {promoting===c.id
                        ? <div className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin"/>
                        : <IoArrowUpCircleOutline className="size-4"/>}
                      {t("rankUp")}
                    </button>
                  </div>

                  {/* Requirement chips */}
                  <div className="flex gap-2 flex-wrap">
                    {[
                      { label:"Reach",   ok:e.reachOk,   val:`${formatNumber(c.currentRankReach)}/${formatNumber(neededReach)}` },
                      { label:"Months",  ok:e.monthsOk,  val:`${months}/${neededMonths}` },
                      { label:"Content", ok:e.contentOk, val:`${total}/${neededContent}` },
                    ].map(({label,ok,val})=>(
                      <div key={label}
                        className={`flex items-center gap-1.5 px-2.5 py-1 txt-smaller border rounded-sm ${
                          ok ? "bg-[#22bb39]/8 border-[#22bb39]/25 text-[#22bb39]"
                             : "bg-red-400/8 border-red-400/25 text-red-400"
                        }`}>
                        {ok
                          ? <IoCheckmarkCircle className="size-3 shrink-0"/>
                          : <IoCloseCircle     className="size-3 shrink-0"/>}
                        <span className="font-medium">{label}:</span>
                        <span className="tabular-nums">{val}</span>
                      </div>
                    ))}
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
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            onClick={() => setWarnId(null)}>
            <motion.div
              initial={{scale:0.95,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.95,opacity:0}}
              transition={{duration:0.2,ease:EASE}}
              className="bg-[#0a0a0a] border border-[#bfec1d]/30 p-6 max-w-md w-full space-y-4"
              onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-3">
                <IoWarningOutline className="size-5 text-[#bfec1d] shrink-0"/>
                <h3 className="txt-small font-display font-bold text-[#bfec1d] uppercase">{t("forceRankUpTitle")}</h3>
              </div>
              <p className="txt-small text-[#ccccd0]">{t("forceRankUpDesc",{name:warnCreator.nickname})}</p>
              <ul className="space-y-2">
                {!warnCreator.eligibility.reachOk && (
                  <li className="flex items-center gap-2 txt-smaller text-red-400">
                    <IoCloseCircle className="size-4 shrink-0"/>
                    {t("reachNotMet")}: {formatNumber(warnCreator.currentRankReach)} / {formatNumber(RANK_THRESHOLDS[warnCreator.rank]??0)}
                    {" "}(-{formatNumber(warnCreator.eligibility.missingReach)})
                  </li>
                )}
                {!warnCreator.eligibility.monthsOk && (
                  <li className="flex items-center gap-2 txt-smaller text-red-400">
                    <IoCloseCircle className="size-4 shrink-0"/>
                    {t("monthsNotMet")}: {getMonthsInProgram(warnCreator.approvedAt?new Date(warnCreator.approvedAt):null)} / {MIN_MONTHS[warnCreator.rank]??0}
                    {" "}(-{warnCreator.eligibility.missingMonths})
                  </li>
                )}
                {!warnCreator.eligibility.contentOk && (
                  <li className="flex items-center gap-2 txt-smaller text-red-400">
                    <IoCloseCircle className="size-4 shrink-0"/>
                    {t("contentNotMet")}: {warnCreator.pictureCount+warnCreator.storyCount+warnCreator.reelCount+warnCreator.longVideoCount+warnCreator.postCount} pieces
                    {" "}(-{warnCreator.eligibility.missingContent})
                  </li>
                )}
              </ul>
              <div className="flex gap-3 pt-1">
                <button onClick={() => setWarnId(null)}
                  className="flex-1 py-2.5 bg-[#171717] border border-[#272727] hover:border-[#444] text-white txt-smaller transition-colors">
                  {t("cancel")}
                </button>
                <button onClick={() => executeRankUp(warnId,true)} disabled={!!promoting}
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