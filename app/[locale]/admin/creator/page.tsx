// src/app/[locale]/admin/creators/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  IoSearchOutline, IoRefreshOutline, IoArrowUpCircleOutline, IoChevronForward,
} from "react-icons/io5";
import { useAuth }  from "@/hooks/useAuth";
import { useToast } from "@/contexts/ToastContext";
import { formatNumber, RANK_THRESHOLDS } from "@/lib/utils/rank";
import { RANK_COLOR, RANK_LABEL_EN, STATUS_TEXT_CLASS } from "@/lib/data/rankConfig";
import Skeleton from "@/components/Skeleton";

type Creator = {
  id: string; userId: string; realName: string; nickname: string;
  rank: string; status: string; currentRankReach: number;
  totalReachAllTime: number; engagementRate: number;
  commitmentScore: number; adminGradeScore: number;
  approvedAt: string | null; joinedAt: string;
  pictureCount: number; storyCount: number; reelCount: number;
  longVideoCount: number; postCount: number;
  user: { email: string | null; phone: string | null };
};

const EASE = [0.22, 1, 0.36, 1] as const;

export default function AdminCreatorsPage() {
  const router = useRouter();
  const toast  = useToast();
  const { user, isAuthenticated, initializationComplete } = useAuth();

  const [creators,    setCreators]    = useState<Creator[]>([]);
  const [loading,     setLoading]     = useState(true);
  const [search,      setSearch]      = useState("");
  const [rankFilter,  setRankFilter]  = useState("all");
  const [statusFilter,setStatusFilter]= useState("all");

  useEffect(() => {
    if (!initializationComplete) return;
    if (!isAuthenticated || user?.role !== "ADMIN") router.replace("/");
  }, [initializationComplete, isAuthenticated, user, router]);

  function load() {
    setLoading(true);
    fetch("/api/admin/creators", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => { if (d.success) setCreators(d.data); })
      .catch(() => toast.error("Failed to load creators"))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    if (!user || user.role !== "ADMIN") return;
    load();
  }, [user]);

  const filtered = creators
    .filter((c) => {
      if (rankFilter !== "all" && c.rank !== rankFilter) return false;
      if (statusFilter !== "all" && c.status !== statusFilter) return false;
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        c.realName.toLowerCase().includes(q) ||
        c.nickname.toLowerCase().includes(q) ||
        (c.user.email ?? "").toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      const aPct = a.currentRankReach / (RANK_THRESHOLDS[a.rank] || 1);
      const bPct = b.currentRankReach / (RANK_THRESHOLDS[b.rank] || 1);
      return bPct - aPct;
    });

  if (!initializationComplete || !user || user.role !== "ADMIN") return null;

  return (
    <div className="px-6 py-8 max-w-6xl">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <h1 className="font-display font-black text-white uppercase header-large">Creators</h1>
        <button onClick={load}
          className="p-2.5 bg-[#171717] border border-[#272727] hover:border-[#444] text-white transition-colors">
          <IoRefreshOutline className="size-4"/>
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-4 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <IoSearchOutline className="absolute inset-s-3 top-1/2 -translate-y-1/2 size-4 text-[#555]"/>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, nickname, email…"
            className="w-full ps-9 pe-4 py-2.5 bg-[#0a0a0a] border border-[#272727] text-white txt-small
                       placeholder:text-[#444] outline-none focus:border-[#6bd41a] transition-colors font-proxima"/>
        </div>
        <div className="flex gap-1 bg-[#0a0a0a] border border-[#272727] p-1">
          {["all","UNRANKED","ROOKIE","RISING","COLD"].map((r) => (
            <button key={r} onClick={() => setRankFilter(r)}
              className={`px-2.5 py-1.5 txt-smaller font-display font-bold uppercase tracking-wider transition-colors ${
                rankFilter===r ? "bg-[#6bd41a] text-black" : "text-[#555] hover:text-white"
              }`}>
              {r === "all" ? "All" : r}
            </button>
          ))}
        </div>
        <div className="flex gap-1 bg-[#0a0a0a] border border-[#272727] p-1">
          {["all","APPROVED","PENDING","REJECTED"].map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-2.5 py-1.5 txt-smaller font-display font-bold uppercase tracking-wider transition-colors ${
                statusFilter===s ? "bg-[#6bd41a] text-black" : "text-[#555] hover:text-white"
              }`}>
              {s === "all" ? "All" : s}
            </button>
          ))}
        </div>
      </div>

      <p className="txt-smaller text-[#444] mb-3 font-proxima">{filtered.length} creators</p>

      {loading ? (
        <div className="space-y-1.5">{Array.from({length:8}).map((_,i)=><Skeleton key={i} className="h-16"/>)}</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-[#555] font-proxima">No creators found</div>
      ) : (
        <div className="space-y-1.5">
          {filtered.map((c, i) => {
            const threshold = RANK_THRESHOLDS[c.rank] ?? 1;
            const pct       = Math.min(100, Math.round((c.currentRankReach / threshold) * 100));
            const rankColor = RANK_COLOR[c.rank] ?? "#6b7280";

            return (
              <motion.div key={c.id}
                initial={{opacity:0,y:4}} animate={{opacity:1,y:0}}
                transition={{delay:i*0.012,ease:EASE}}>
                <Link href={`/admin/creators/${c.id}`}
                  className="flex items-center gap-4 px-4 py-3 bg-[#0a0a0a] border border-[#272727]
                             hover:border-[#444] hover:bg-[#0d0d0d] transition-colors group">
                  <div className="size-9 rounded-full flex items-center justify-center font-display font-black text-black txt-smaller shrink-0"
                    style={{background:rankColor}}>
                    {c.nickname.charAt(0).toUpperCase()}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                      <span className="font-display font-bold text-white txt-small">{c.nickname}</span>
                      <span className="txt-smaller text-[#444]">{c.realName}</span>
                      <span className={`txt-smaller px-1.5 py-0.5 rounded-sm ${STATUS_TEXT_CLASS[c.status]??""}`}>
                        {c.status}
                      </span>
                      <span className="txt-smaller px-1.5 py-0.5 font-bold rounded-sm"
                        style={{color:rankColor,background:`${rankColor}18`}}>
                        {RANK_LABEL_EN[c.rank]??c.rank}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-[#1a1a1a] rounded-full overflow-hidden" style={{height:"3px"}}>
                        <div className="h-full rounded-full" style={{width:`${pct}%`,background:rankColor}}/>
                      </div>
                      <span className="txt-smaller text-[#444] tabular-nums shrink-0">{pct}%</span>
                      <span className="txt-smaller text-[#333] tabular-nums shrink-0 hidden md:inline">
                        {formatNumber(c.currentRankReach)} / {formatNumber(threshold)}
                      </span>
                    </div>
                  </div>

                  <div className="hidden lg:flex items-center gap-5 shrink-0">
                    <div className="text-end">
                      <p className="txt-smaller text-[#555]">Engagement</p>
                      <p className="txt-smaller text-[#bfec1d] font-semibold tabular-nums">{c.engagementRate.toFixed(2)}%</p>
                    </div>
                    <div className="text-end">
                      <p className="txt-smaller text-[#555]">All-time Reach</p>
                      <p className="txt-smaller text-white font-semibold tabular-nums">{formatNumber(c.totalReachAllTime)}</p>
                    </div>
                  </div>

                  <IoChevronForward className="size-4 text-[#333] group-hover:text-[#6bd41a] transition-colors shrink-0"/>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}