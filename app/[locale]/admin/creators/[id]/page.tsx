// src/app/[locale]/admin/creators/[id]/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  IoArrowBack, IoSaveOutline, IoArrowUpCircleOutline,
  IoStar, IoStarOutline, IoChevronBack, IoChevronForward,
  IoVideocamOutline, IoFilmOutline, IoCameraOutline,
} from "react-icons/io5";
import { useAuth }  from "@/hooks/useAuth";
import { useToast } from "@/contexts/ToastContext";
import {
  formatNumber, checkRankUpEligibility,
  RANK_THRESHOLDS, MIN_QUARTER_SCORE, MIN_ENGAGEMENT_RATE,
  MIN_CONTENT, MAX_SUBMISSIONS_PER_RANK, MAX_REACH_PER_RANK,
} from "@/lib/utils/rank";
import {
  RANK_COLOR, PLATFORM_COLOR, STATUS_TEXT_CLASS,
  SCORE_COMPONENTS, CONTENT_REQ, NEXT_RANK_COLOR,
} from "@/lib/data/rankConfig";
import Skeleton from "@/components/Skeleton";
import { CircularProgress } from "@/app/[locale]/auth/profile/ProfileSkeleton";

const EASE = [0.22, 1, 0.36, 1] as const;
const PAGE_SIZE = 20;

function Stars({ value }: { value: number | null }) {
  if (!value) return <span className="txt-smaller text-[#333]">—</span>;
  const color = value <= 1 ? "#ef4444" : value <= 2 ? "#f97316"
              : value <= 3 ? "#eab308" : value <= 4 ? "#84cc16" : "#22bb39";
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map((s) => (
        value >= s ? <IoStar key={s} className="size-3" style={{color}}/>
        : value >= s-0.5 ? <IoStar key={s} className="size-3 opacity-50" style={{color}}/>
        : <IoStarOutline key={s} className="size-3 text-[#333]"/>
      ))}
      <span className="txt-smaller text-[#555] ms-1">{value.toFixed(1)}</span>
    </div>
  );
}

function Sparkline({ data, color = "#6bd41a" }: { data: number[]; color?: string }) {
  if (data.length < 2) return <p className="txt-smaller text-[#333]">Not enough data</p>;
  const max = Math.max(...data, 1);
  const w = 140, h = 40, pad = 4;
  const xs = data.map((_,i) => pad + (i/(data.length-1))*(w-pad*2));
  const ys = data.map((v) => h - pad - ((v/max)*(h-pad*2)));
  const d  = xs.map((x,i) => `${i===0?"M":"L"}${x},${ys[i]}`).join(" ");
  return (
    <svg width={w} height={h} className="overflow-visible">
      <path d={d} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx={xs[xs.length-1]} cy={ys[ys.length-1]} r="2.5" fill={color}/>
    </svg>
  );
}

export default function AdminCreatorDetail() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const toast  = useToast();
  const { user, initializationComplete } = useAuth();

  const [data,     setData]     = useState<any>(null);
  const [loading,  setLoading]  = useState(true);
  const [saving,   setSaving]   = useState(false);
  const [snapping, setSnapping] = useState(false);
  const [subPage,  setSubPage]  = useState(1);

  const [commitmentScore, setCommitmentScore] = useState("");
  const [adminGradeScore, setAdminGradeScore]  = useState("");
  const [adminNote,       setAdminNote]        = useState("");

  useEffect(() => {
    if (initializationComplete && user?.role !== "ADMIN") router.push("/");
  }, [initializationComplete, user]);

  function load() {
    setLoading(true);
    fetch(`/api/admin/creators/${params.id}`, { credentials: "include" })
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setData(d.data);
          setCommitmentScore(String(d.data.profile.commitmentScore ?? 0));
          setAdminGradeScore(String(d.data.profile.adminGradeScore  ?? 0));
          setAdminNote(d.data.profile.adminNote ?? "");
        }
      })
      .catch(() => toast.error("Failed to load"))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    if (!user || user.role !== "ADMIN") return;
    load();
  }, [user, params.id]);

  async function saveScores() {
    const cs = parseFloat(commitmentScore);
    const ag = parseFloat(adminGradeScore);
    if (isNaN(cs)||cs<0||cs>15) { toast.error("Commitment: 0–15"); return; }
    if (isNaN(ag)||ag<0||ag>30) { toast.error("Admin grade: 0–30"); return; }
    setSaving(true);
    try {
      const res  = await fetch(`/api/admin/creators/${params.id}`, {
        method:"PATCH", credentials:"include",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ commitmentScore:cs, adminGradeScore:ag, adminNote }),
      });
      const json = await res.json();
      if (json.success) {
        setData((prev:any) => ({...prev, profile:{...prev.profile,
          commitmentScore:json.data.commitmentScore,
          adminGradeScore:json.data.adminGradeScore,
          adminNote:json.data.adminNote,
        }}));
        toast.success("Saved");
      } else toast.error(json.error || "Failed");
    } catch { toast.error("Error"); }
    finally   { setSaving(false); }
  }

  async function takeSnapshot() {
    setSnapping(true);
    try {
      const res  = await fetch(`/api/admin/snapshots/${data.profile.userId}`, {
        method:"POST", credentials:"include",
      });
      const json = await res.json();
      if (json.success) { toast.success("Snapshot saved for " + new Date().toISOString().slice(0,7)); load(); }
      else toast.error(json.error || "Failed");
    } catch { toast.error("Error"); }
    finally   { setSnapping(false); }
  }

  if (loading || !data) {
    return (
      <div className="px-6 py-8 max-w-5xl space-y-4">
        <Skeleton className="h-8 w-32"/>
        <Skeleton className="h-20"/>
        <div className="grid grid-cols-3 gap-4">
          <Skeleton className="h-64"/>
          <div className="col-span-2 space-y-4">
            <Skeleton className="h-24"/>
            <Skeleton className="h-40"/>
          </div>
        </div>
      </div>
    );
  }

  const { profile, submissions, snapshots, platformStats } = data;
  const rank           = profile.rank ?? "UNRANKED";
  const rankColor      = RANK_COLOR[rank] ?? "#6b7280";
  const nextRankColor  = NEXT_RANK_COLOR[rank] ?? "#22bb39";

  // ── Stats — mirrors profile page logic exactly ─────────────────────────
  const currentRankReach  = profile.currentRankReach  ?? 0;
  const totalReachAllTime = profile.totalReachAllTime  ?? 0;
  const engagementRate    = profile.engagementRate     ?? 0;
  const commitmentSaved   = profile.commitmentScore    ?? 0;
  const adminGradeSaved   = profile.adminGradeScore    ?? 0;

  const threshold    = RANK_THRESHOLDS[rank] ?? 50000;
  const scoreMax     = MIN_QUARTER_SCORE[rank] || 50;
  const targetEngPct = (MIN_ENGAGEMENT_RATE[rank] ?? 0.005) * 100;
  const minContent   = MIN_CONTENT[rank] ?? 20;
  const maxSubs      = MAX_SUBMISSIONS_PER_RANK[rank] ?? 20;
  const maxReach     = MAX_REACH_PER_RANK[rank] ?? 50_000;

  // Approved submissions AT CURRENT RANK ONLY (mirrors profile page)
  const approvedSubsCurrentRank = submissions.filter(
    (s:any) => s.status === "APPROVED" && s.rank === rank
  ).length;
  const approvedSubsTotal = submissions.filter((s:any) => s.status === "APPROVED").length;

  // Score components — same formula as profile page
  const viewsPts   = Math.min(SCORE_COMPONENTS[0].max, Math.round((currentRankReach / (threshold||1)) * SCORE_COMPONENTS[0].max));
  const contentPts = Math.min(SCORE_COMPONENTS[1].max, Math.round((approvedSubsCurrentRank / (minContent||1)) * SCORE_COMPONENTS[1].max));
  const engPts     = Math.min(SCORE_COMPONENTS[2].max, Math.round((engagementRate / (targetEngPct||0.5)) * SCORE_COMPONENTS[2].max));
  const totalScore = viewsPts + contentPts + engPts + Math.round(commitmentSaved) + Math.round(adminGradeSaved);
  const scorePct   = scoreMax > 0 ? Math.round((totalScore/scoreMax)*100) : 0;

  // Content counts — rank window counters (same as profile)
  const currentCounts = {
    streams: (profile.longVideoCount??0) + (profile.liveCount??0) + (profile.streamCount??0),
    reels:   profile.reelCount   ?? 0,
    stories: (profile.storyCount ??0) + (profile.postCount??0) + (profile.pictureCount??0),
  };
  const [reqStreams, reqReels, reqStories] = CONTENT_REQ[rank] ?? CONTENT_REQ.UNRANKED;
  const reqCounts = { streams: reqStreams, reels: reqReels, stories: reqStories };
  const contentRows = [
    { key:"streams", Icon:IoVideocamOutline, label:"Streams / Live / Long Video", cur:currentCounts.streams, req:reqStreams },
    { key:"reels",   Icon:IoFilmOutline,     label:"Reels / Short Videos",        cur:currentCounts.reels,   req:reqReels   },
    { key:"stories", Icon:IoCameraOutline,   label:"Stories / Posts / Pictures",  cur:currentCounts.stories, req:reqStories },
  ];

  // Eligibility
  const elig = rank !== "COLD" ? checkRankUpEligibility(rank, currentRankReach,
    profile.approvedAt ? new Date(profile.approvedAt) : null, {
      pictureCount:profile.pictureCount??0, storyCount:profile.storyCount??0,
      reelCount:profile.reelCount??0, longVideoCount:profile.longVideoCount??0, 
      postCount:profile.postCount??0, streamCount:profile.streamCount??0,  liveCount:profile.liveCount??0, 
    }) : null;

  // Platform breakdown
  const platAgg: Record<string, {reach:number;count:number;engSum:number}> = {};
  for (const ps of platformStats) {
    const p = ps.platform;
    if (!platAgg[p]) platAgg[p] = {reach:0,count:0,engSum:0};
    platAgg[p].reach  += ps.acceptedReach ?? 0;
    platAgg[p].count  += 1;
    platAgg[p].engSum += (ps.engagementRate??0)*(ps.acceptedReach??0);
  }
  const platforms = Object.entries(platAgg)
    .map(([platform,v]) => ({platform, totalReach:v.reach, count:v.count, avgEng:v.reach>0?v.engSum/v.reach:0}))
    .sort((a,b) => b.totalReach-a.totalReach);

  // Sparklines
  const reachHistory = snapshots.map((s:any) => s.reach);
  const engHistory   = snapshots.map((s:any) => s.engagementRate);

  // Paginated submissions
  const totalSubPages = Math.ceil(submissions.length / PAGE_SIZE);
  const pagedSubs = submissions.slice((subPage-1)*PAGE_SIZE, subPage*PAGE_SIZE);

  return (
    <div className="px-6 py-8 max-w-5xl space-y-5">
      <Link href="/admin/creators"
        className="inline-flex items-center gap-2 text-[#555] hover:text-white txt-smaller transition-colors">
        <IoArrowBack className="size-4"/>Back to Creators
      </Link>

      {/* Creator header */}
      <div className="bg-[#0a0a0a] border border-[#272727] p-5 flex items-center gap-4 flex-wrap">
        <div className="size-14 rounded-full flex items-center justify-center font-display font-black text-black shrink-0"
          style={{background:rankColor}}>
          {profile.nickname?.charAt(0)?.toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="font-display font-black text-white txt-regular">{profile.realName}</h1>
          <p className="txt-smaller text-[#555]">@{profile.nickname} · {profile.user?.email ?? profile.contactEmail ?? profile.user?.phone}</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap shrink-0">
          <span className="txt-smaller px-2 py-1 font-bold rounded-sm"
            style={{color:rankColor,background:`${rankColor}18`}}>{rank}</span>
          <span className={`txt-smaller px-2 py-1 rounded-sm ${STATUS_TEXT_CLASS[profile.status]??""}`}>
            {profile.status}
          </span>
          {elig?.reachOk && (
            <span className="txt-smaller text-[#6bd41a] bg-[#6bd41a]/10 px-2 py-1 rounded-sm flex items-center gap-1">
              <IoArrowUpCircleOutline className="size-3"/>Eligible
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* ── Left: score + admin controls ── */}
        <div className="space-y-4">

          {/* Performance score */}
          <div className="bg-[#0a0a0a] border border-[#272727] p-5">
            <p className="txt-small font-display font-bold text-white uppercase tracking-wider mb-4">Performance Score</p>
            <div className="flex items-center gap-4 mb-4">
              <div className="relative flex items-center justify-center">
                <CircularProgress pct={scorePct} size={72} stroke={6} rankColor={rankColor}/>
                <span className="absolute text-white font-black" style={{fontSize:"14px"}}>{totalScore}</span>
              </div>
              <div>
                <p className="txt-small text-white font-bold">{totalScore} / {scoreMax} pts</p>
                <p className="txt-smaller text-[#555]">{scorePct}% of target</p>
              </div>
            </div>
            <div className="space-y-1.5 border-t border-[#1a1a1a] pt-3">
              {[
                {label:"Views (auto)",      pts:viewsPts,                   max:SCORE_COMPONENTS[0].max, dim:true  },
                {label:"Content (auto)",    pts:contentPts,                 max:SCORE_COMPONENTS[1].max, dim:true  },
                {label:"Engagement (auto)", pts:engPts,                     max:SCORE_COMPONENTS[2].max, dim:true  },
                {label:"Commitment",        pts:Math.round(commitmentSaved),max:SCORE_COMPONENTS[3].max, dim:false },
                {label:"Admin Grade",       pts:Math.round(adminGradeSaved),max:SCORE_COMPONENTS[4].max, dim:false },
              ].map(({label,pts,max,dim}) => (
                <div key={label} className="flex justify-between txt-smaller">
                  <span className={dim?"text-[#444]":"text-[#888]"}>{label}</span>
                  <span className="tabular-nums">
                    <span className="text-[#555]">{pts}&nbsp;/</span>
                    <span className={`font-bold ms-0.5 ${dim?"text-[#444]":"text-[#6bd41a]"}`}>{max}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Admin controls */}
          <div className="bg-[#0a0a0a] border border-[#272727] p-5 space-y-4">
            <p className="txt-small font-display font-bold text-white uppercase tracking-wider">Quarterly Scores</p>
            {[
              {label:"Commitment Score (0–15)", val:commitmentScore, set:setCommitmentScore, min:0, max:15},
              {label:"Admin Grade (0–30)",      val:adminGradeScore, set:setAdminGradeScore,  min:0, max:30},
            ].map(({label,val,set,min,max}) => (
              <div key={label}>
                <label className="txt-smaller text-[#666] mb-1 block">{label}</label>
                <input type="number" min={min} max={max} step={0.5} value={val}
                  onChange={(e) => set(e.target.value)}
                  className="w-full px-3 py-2 bg-[#111] border border-[#272727] text-white txt-smaller outline-none focus:border-[#6bd41a] transition-colors"
                />
              </div>
            ))}
            <div>
              <label className="txt-smaller text-[#666] mb-1 block">
                Admin Note <span className="text-[#444]">(visible to creator)</span>
              </label>
              <textarea value={adminNote} onChange={(e) => setAdminNote(e.target.value)}
                rows={3} placeholder="Feedback, coaching tips…"
                className="w-full px-3 py-2 bg-[#111] border border-[#272727] text-white txt-smaller outline-none focus:border-[#6bd41a] resize-none placeholder:text-[#333] transition-colors"
              />
            </div>
            <button onClick={saveScores} disabled={saving}
              className="w-full flex items-center justify-center gap-2 h-9 bg-[#6bd41a] text-black font-display font-bold uppercase txt-smaller tracking-wider hover:bg-[#7de020] transition-colors disabled:opacity-50">
              {saving ? <div className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin"/> : <IoSaveOutline className="size-4"/>}
              Save
            </button>
            <div className="border-t border-[#1a1a1a] pt-3">
              <button onClick={takeSnapshot} disabled={snapping}
                className="w-full flex items-center justify-center gap-2 h-9 bg-[#171717] border border-[#272727] hover:border-[#444] text-white txt-smaller transition-colors disabled:opacity-50">
                {snapping && <div className="w-3.5 h-3.5 border-2 border-[#555] border-t-white rounded-full animate-spin"/>}
                📸 Save Monthly Snapshot
              </button>
              <p className="txt-smaller text-[#333] mt-1 text-center">{new Date().toISOString().slice(0,7)}</p>
            </div>
          </div>
        </div>

        {/* ── Right 2 cols ── */}
        <div className="lg:col-span-2 space-y-4">

          {/* ── Rank-window stats (matches profile page) ── */}
          <div className="bg-[#0a0a0a] border border-[#272727] p-5">
            <p className="txt-small font-display font-bold text-white uppercase tracking-wider mb-4">
              Rank Window Stats
              <span className="txt-smaller text-[#444] ms-2 normal-case">resets on rank-up</span>
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
              {[
                {label:"Rank Reach",          value:formatNumber(currentRankReach),     sub:`/ ${formatNumber(maxReach)}`},
                {label:"Engagement",          value:`${engagementRate.toFixed(2)}%`,    sub:`target ${(targetEngPct).toFixed(1)}%`},
                {label:"Approved (this rank)",value:String(approvedSubsCurrentRank),   sub:`/ ${maxSubs} target`},
              ].map(({label,value,sub}) => (
                <div key={label} className="bg-[#111] border border-[#1a1a1a] px-3 py-2.5">
                  <p className="txt-smaller text-[#555]">{label}</p>
                  <p className="txt-small font-bold text-white">{value}</p>
                  <p className="txt-smaller text-[#444]">{sub}</p>
                </div>
              ))}
            </div>

            {/* Content requirements */}
            <div className="space-y-3">
              {contentRows.map(({key,Icon,label,cur,req}) => {
                const pct   = req > 0 ? Math.min(Math.round((cur/req)*100),100) : 100;
                const isMet = cur >= req;
                return (
                  <div key={key} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <Icon className="size-3.5 shrink-0" style={{color:isMet?nextRankColor:"#555"}}/>
                      <span className="txt-smaller text-[#888] truncate">{label}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="txt-smaller font-semibold tabular-nums"
                        style={{color:isMet?nextRankColor:"white"}}>{cur}</span>
                      <span className="txt-smaller text-[#444]">/ {req}</span>
                      <CircularProgress pct={pct} size={24} stroke={2.5} rankColor={nextRankColor}/>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── All-time stats ── */}
          <div className="bg-[#0a0a0a] border border-[#272727] p-5">
            <p className="txt-small font-display font-bold text-white uppercase tracking-wider mb-3">
              All-time Stats
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                {label:"Total Reach",     value:formatNumber(totalReachAllTime)},
                {label:"All Approved",    value:String(approvedSubsTotal)},
                {label:"Submissions",     value:String(submissions.length)},
                {label:"Followers",       value:formatNumber(profile.followers??0)},
              ].map(({label,value}) => (
                <div key={label} className="bg-[#111] border border-[#1a1a1a] px-3 py-2.5">
                  <p className="txt-smaller text-[#555]">{label}</p>
                  <p className="txt-small font-bold text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Snapshot sparklines */}
          {snapshots.length > 1 && (
            <div className="bg-[#0a0a0a] border border-[#272727] p-5">
              <p className="txt-small font-display font-bold text-white uppercase tracking-wider mb-4">Monthly Trend</p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="txt-smaller text-[#555] mb-2">Rank Reach</p>
                  <Sparkline data={reachHistory} color="#6bd41a"/>
                  <div className="flex justify-between mt-1">
                    {snapshots.slice(-3).map((s:any) => (
                      <span key={s.month} className="txt-smaller text-[#333]">{s.month.slice(5)}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="txt-smaller text-[#555] mb-2">Engagement %</p>
                  <Sparkline data={engHistory} color="#bfec1d"/>
                </div>
              </div>
            </div>
          )}

          {/* Platform breakdown */}
          {platforms.length > 0 && (
            <div className="bg-[#0a0a0a] border border-[#272727] p-5">
              <p className="txt-small font-display font-bold text-white uppercase tracking-wider mb-4">Platform Breakdown</p>
              <div className="space-y-3">
                {platforms.map((p) => {
                  const maxR  = platforms[0].totalReach || 1;
                  const pct   = Math.round((p.totalReach/maxR)*100);
                  const color = PLATFORM_COLOR[p.platform] ?? "#6bd41a";
                  return (
                    <div key={p.platform}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="txt-smaller font-bold" style={{color}}>{p.platform}</span>
                          <span className="txt-smaller text-[#444]">{p.count} subs</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="txt-smaller text-[#555]">{p.avgEng.toFixed(2)}%</span>
                          <span className="txt-smaller text-white font-semibold tabular-nums">{formatNumber(p.totalReach)}</span>
                        </div>
                      </div>
                      <div className="w-full bg-[#171717] rounded-full overflow-hidden" style={{height:"3px"}}>
                        <motion.div className="h-full rounded-full" style={{background:color}}
                          initial={{width:0}} animate={{width:`${pct}%`}}
                          transition={{duration:0.7,delay:0.2,ease:[0.4,0,0.2,1]}}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Submissions list — paginated by 20 ── */}
          <div className="bg-[#0a0a0a] border border-[#272727] p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="txt-small font-display font-bold text-white uppercase tracking-wider">
                Submissions ({submissions.length})
              </p>
              {totalSubPages > 1 && (
                <div className="flex items-center gap-2">
                  <button onClick={() => setSubPage((p) => Math.max(1,p-1))} disabled={subPage===1}
                    className="p-1 text-[#444] hover:text-white disabled:opacity-30 transition-colors">
                    <IoChevronBack className="size-4"/>
                  </button>
                  <span className="txt-smaller text-[#555] tabular-nums">{subPage}/{totalSubPages}</span>
                  <button onClick={() => setSubPage((p) => Math.min(totalSubPages,p+1))} disabled={subPage===totalSubPages}
                    className="p-1 text-[#444] hover:text-white disabled:opacity-30 transition-colors">
                    <IoChevronForward className="size-4"/>
                  </button>
                </div>
              )}
            </div>
            <div className="space-y-1.5">
              {submissions.length === 0 ? (
                <p className="txt-smaller text-[#444] text-center py-6">No submissions yet</p>
              ) : pagedSubs.map((sub:any) => (
                <div key={sub.id}
                  className="flex items-center justify-between gap-3 px-3 py-2 bg-[#111] border border-[#1a1a1a]">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className={`w-1 h-5 shrink-0 ${
                      sub.status==="APPROVED"?"bg-[#22bb39]":sub.status==="REJECTED"?"bg-red-400":"bg-[#bfec1d]"
                    }`}/>
                    <span className="txt-smaller font-bold shrink-0"
                      style={{color:PLATFORM_COLOR[sub.platform]??"#ccc"}}>
                      {sub.platform}
                    </span>
                    <span className="txt-smaller text-[#555] truncate max-w-32">{sub.contentLink}</span>
                    <div className="hidden md:flex gap-1 shrink-0">
                      {(sub.contentTypes??[]).map((ct:string) => (
                        <span key={ct} className="txt-smaller text-[#444]">{ct.replace(/_/g," ")}</span>
                      ))}
                    </div>
                    {/* Rank badge on submission */}
                    <span className="txt-smaller text-[#333] shrink-0">{sub.rank}</span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <Stars value={sub.qualityRating}/>
                    <span className="txt-smaller text-white tabular-nums">{formatNumber(sub.acceptedReach)}</span>
                  </div>
                </div>
              ))}
            </div>
            {totalSubPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-[#1a1a1a]">
                <button onClick={() => setSubPage((p) => Math.max(1,p-1))} disabled={subPage===1}
                  className="px-3 py-1.5 bg-[#171717] border border-[#272727] text-white txt-smaller disabled:opacity-40 hover:border-[#444] transition-colors">←</button>
                <span className="txt-smaller text-[#555]">Page {subPage} of {totalSubPages}</span>
                <button onClick={() => setSubPage((p) => Math.min(totalSubPages,p+1))} disabled={subPage===totalSubPages}
                  className="px-3 py-1.5 bg-[#171717] border border-[#272727] text-white txt-smaller disabled:opacity-40 hover:border-[#444] transition-colors">→</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}