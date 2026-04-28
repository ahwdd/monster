// src/app/[locale]/admin/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  IoArrowUpCircleOutline, IoDocumentTextOutline,
  IoPeopleOutline, IoBarChartOutline, IoRefreshOutline,
} from "react-icons/io5";
import { useAuth }  from "@/hooks/useAuth";
import { useToast } from "@/contexts/ToastContext";
import { formatNumber } from "@/lib/utils/rank";
import { RANK_COLOR, PLATFORM_COLOR } from "@/lib/data/rankConfig";
import Skeleton from "@/components/Skeleton";

type DashData = {
  totalCreators:        number;
  pendingRegistrations: number;
  pendingSubmissions:   number;
  eligibleForRankUp:    number;
  rankDistribution:     Record<string, number>;
  platforms: {
    platform: string; totalReach: number; submissionCount: number;
    avgEngagement: number; avgQuality: number | null;
  }[];
  contentTypes: {
    type: string; totalReach: number; submissionCount: number; avgReach: number;
  }[];
};

const EASE = [0.22, 1, 0.36, 1] as const;

export default function AdminDashboard() {
  const router = useRouter();
  const toast  = useToast();
  const { user, isAuthenticated, initializationComplete } = useAuth();
  const [data,    setData]    = useState<DashData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!initializationComplete) return;
    if (!isAuthenticated || user?.role !== "ADMIN") router.replace("/");
  }, [initializationComplete, isAuthenticated, user, router]);

  function load() {
    setLoading(true);
    fetch("/api/admin/dashboard", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => { if (d.success) setData(d.data); })
      .catch(() => toast.error("Failed to load dashboard"))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    if (!user || user.role !== "ADMIN") return;
    load();
  }, [user]);

  if (!initializationComplete || !user || user.role !== "ADMIN") return null;

  return (
    <div className="px-6 py-8 max-w-6xl space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="font-display font-black text-white uppercase header-large">Dashboard</h1>
        <button onClick={load}
          className="p-2.5 bg-[#171717] border border-[#272727] hover:border-[#444] text-white transition-colors">
          <IoRefreshOutline className="size-4" />
        </button>
      </div>

      {loading ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({length:4}).map((_,i)=><Skeleton key={i} className="h-24"/>)}
          </div>
          <Skeleton className="h-40"/>
          <Skeleton className="h-56"/>
        </div>
      ) : data ? (
        <>
          {/* Rank-up eligible banner */}
          {data.eligibleForRankUp > 0 && (
            <motion.div initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}}
              className="flex items-center justify-between gap-4 p-4 border border-[#6bd41a]/30 bg-[#6bd41a]/5">
              <div className="flex items-center gap-3">
                <IoArrowUpCircleOutline className="size-5 text-[#6bd41a] shrink-0"/>
                <p className="font-proxima txt-small text-[#6bd41a] font-bold">
                  {data.eligibleForRankUp} creator{data.eligibleForRankUp !== 1 ? "s" : ""} eligible for rank-up
                </p>
              </div>
              <Link href="/admin/rank-ups"
                className="px-4 py-2 bg-[#6bd41a] text-black font-display font-bold uppercase txt-smaller tracking-wider hover:bg-[#7de020] transition-colors">
                Review →
              </Link>
            </motion.div>
          )}

          {/* KPI cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label:"Total Creators",       value:data.totalCreators,        icon:IoPeopleOutline,        color:"#6bd41a", href:"/admin/creators"      },
              { label:"Pending Approvals",    value:data.pendingRegistrations, icon:IoDocumentTextOutline,  color:"#bfec1d", href:"/admin/registrations" },
              { label:"Pending Submissions",  value:data.pendingSubmissions,   icon:IoDocumentTextOutline,  color:"#bfec1d", href:"/admin/submissions"   },
              { label:"Rank-Up Eligible",     value:data.eligibleForRankUp,    icon:IoArrowUpCircleOutline, color:"#22bb39", href:"/admin/rank-ups"      },
            ].map(({label,value,icon:Icon,color,href},i)=>(
              <motion.div key={label}
                initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
                transition={{delay:i*0.05,ease:EASE}}>
                <Link href={href}
                  className="block bg-[#0a0a0a] border border-[#272727] p-5 hover:border-[#444] transition-colors group">
                  <div className="flex items-center justify-between mb-3">
                    <p className="txt-smaller text-[#555] font-proxima uppercase tracking-wider">{label}</p>
                    <Icon className="size-4 transition-colors" style={{color}} />
                  </div>
                  <p className="font-display font-black text-white" style={{fontSize:"1.8rem"}}>{value}</p>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Rank distribution */}
          <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.22,ease:EASE}}
            className="bg-[#0a0a0a] border border-[#272727] p-5">
            <p className="txt-small font-display font-bold text-white uppercase tracking-wider mb-4">
              Rank Distribution
            </p>
            <div className="flex gap-6 flex-wrap">
              {Object.entries(data.rankDistribution).map(([rank,count])=>(
                <div key={rank} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{background:RANK_COLOR[rank]??"#6b7280"}}/>
                  <span className="txt-small text-white font-proxima font-bold tabular-nums">{count}</span>
                  <span className="txt-smaller text-[#555]">{rank}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Platform analytics */}
          {data.platforms.length > 0 && (
            <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.27,ease:EASE}}
              className="bg-[#0a0a0a] border border-[#272727] p-5">
              <p className="txt-small font-display font-bold text-white uppercase tracking-wider mb-4">
                <IoBarChartOutline className="size-4 inline me-2"/>Platform Performance
              </p>
              <div className="space-y-4">
                {data.platforms.map((p)=>{
                  const maxReach = data.platforms[0].totalReach || 1;
                  const pct   = Math.round((p.totalReach / maxReach) * 100);
                  const color = PLATFORM_COLOR[p.platform] ?? "#6bd41a";
                  return (
                    <div key={p.platform}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="txt-small font-bold" style={{color}}>{p.platform}</span>
                          <span className="txt-smaller text-[#444]">{p.submissionCount} submissions</span>
                          {p.avgQuality && (
                            <span className="txt-smaller text-[#bfec1d]">★ {p.avgQuality.toFixed(1)}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="txt-smaller text-[#555]">{p.avgEngagement.toFixed(2)}% eng</span>
                          <span className="txt-smaller text-white font-semibold tabular-nums w-16 text-end">
                            {formatNumber(p.totalReach)}
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-[#171717] rounded-full overflow-hidden" style={{height:"4px"}}>
                        <motion.div className="h-full rounded-full" style={{background:color}}
                          initial={{width:0}} animate={{width:`${pct}%`}}
                          transition={{duration:0.8,delay:0.35,ease:[0.4,0,0.2,1]}}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Content type performance */}
          {data.contentTypes.length > 0 && (
            <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.32,ease:EASE}}
              className="bg-[#0a0a0a] border border-[#272727] p-5">
              <p className="txt-small font-display font-bold text-white uppercase tracking-wider mb-4">
                Content Type Performance
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {data.contentTypes.map((ct)=>(
                  <div key={ct.type} className="bg-[#111] border border-[#1a1a1a] p-3">
                    <p className="txt-smaller text-[#555] capitalize mb-1.5">{ct.type.replace(/_/g," ")}</p>
                    <p className="font-display font-bold text-white txt-small tabular-nums">{formatNumber(ct.totalReach)}</p>
                    <p className="txt-smaller text-[#444] mt-0.5">{ct.submissionCount} subs</p>
                    <p className="txt-smaller text-[#6bd41a] mt-0.5">~{formatNumber(ct.avgReach)} avg</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </>
      ) : null}
    </div>
  );
}