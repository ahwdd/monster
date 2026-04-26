// src/app/[locale]/admin/creators/[id]/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  IoArrowBack,
  IoCheckmarkCircle,
  IoTimeOutline,
  IoCloseCircle,
  IoSaveOutline,
  IoPersonOutline,
  IoTrophyOutline,
} from "react-icons/io5";
import { useAuth }  from "@/hooks/useAuth";
import { useToast } from "@/contexts/ToastContext";
import { formatNumber } from "@/lib/utils/rank";
import { CircularProgress } from "@/app/[locale]/auth/profile/ProfileSkeleton";

const RANK_COLORS: Record<string, string> = {
  UNRANKED: "#6b7280",
  ROOKIE:   "#22bb39",
  RISING:   "#d4ff00",
  COLD:     "#00cfff",
};

const STATUS_STYLE: Record<string, string> = {
  APPROVED: "text-[#22bb39] bg-[#22bb39]/10",
  PENDING:  "text-yellow-400 bg-yellow-400/10",
  REJECTED: "text-red-400 bg-red-400/10",
};
const STATUS_ICON: Record<string, React.ElementType> = {
  APPROVED: IoCheckmarkCircle,
  PENDING:  IoTimeOutline,
  REJECTED: IoCloseCircle,
};

export default function AdminCreatorDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const toast  = useToast();
  const { user, initializationComplete } = useAuth();

  const [data,    setData]    = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);

  // Editable score state
  const [commitmentScore, setCommitmentScore] = useState("");
  const [adminGradeScore, setAdminGradeScore]  = useState("");

  useEffect(() => {
    if (initializationComplete && user?.role !== "ADMIN") router.push("/");
  }, [initializationComplete, user]);

  useEffect(() => {
    if (!user || user.role !== "ADMIN") return;
    fetch(`/api/admin/creators/${params.id}`, { credentials: "include" })
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setData(d.data);
          setCommitmentScore(String(d.data.profile.commitmentScore ?? 0));
          setAdminGradeScore(String(d.data.profile.adminGradeScore  ?? 0));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user, params.id]);

  async function saveScores() {
    const cs = parseFloat(commitmentScore);
    const ag = parseFloat(adminGradeScore);
    if (isNaN(cs) || cs < 0 || cs > 15) {
      toast.error("Commitment score must be 0–15");
      return;
    }
    if (isNaN(ag) || ag < 0 || ag > 30) {
      toast.error("Admin grade must be 0–30");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/creators/${params.id}`, {
        method:  "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ commitmentScore: cs, adminGradeScore: ag }),
      });
      const json = await res.json();
      if (json.success) {
        setData((prev: any) => ({
          ...prev,
          profile: {
            ...prev.profile,
            commitmentScore: json.data.commitmentScore,
            adminGradeScore:  json.data.adminGradeScore,
          },
        }));
        toast.success("Scores updated");
      } else {
        toast.error(json.error || "Failed to update scores");
      }
    } catch {
      toast.error("Error saving scores");
    } finally {
      setSaving(false);
    }
  }

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#22bb39] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const { profile, submissions } = data;
  const rank      = profile.rank      ?? "UNRANKED";
  const rankColor = RANK_COLORS[rank] ?? "#6b7280";

  const engagementRate  = profile.engagementRate  ?? 0;
  const commitmentSaved = profile.commitmentScore ?? 0;
  const adminGradeSaved = profile.adminGradeScore  ?? 0;

  // Score breakdown (same formula as profile page)
  const threshold    = { UNRANKED: 50000, ROOKIE: 75000, RISING: 150000, COLD: 650000 }[rank as string] ?? 50000;
  const minContent   = { UNRANKED: 20, ROOKIE: 32, RISING: 48, COLD: 72 }[rank as string] ?? 20;
  const scoreMax     = { UNRANKED: 50, ROOKIE: 50, RISING: 70, COLD: 90 }[rank as string] ?? 50;
  const targetEngPct = { UNRANKED: 0.5, ROOKIE: 1, RISING: 2, COLD: 3 }[rank as string] ?? 0.5;

  const approvedSubs = submissions.filter((s: any) => s.status === "APPROVED").length;
  const viewsPts     = Math.min(10, Math.round((profile.currentRankReach / (threshold || 1)) * 10));
  const contentPts   = Math.min(20, Math.round((approvedSubs / (minContent || 1)) * 20));
  const engPts       = Math.min(15, Math.round((engagementRate / (targetEngPct || 0.5)) * 15));
  const totalScore   = viewsPts + contentPts + engPts + Math.round(commitmentSaved) + Math.round(adminGradeSaved);
  const scorePct     = scoreMax > 0 ? Math.round((totalScore / scoreMax) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

        {/* Back */}
        <Link
          href="/admin/creators"
          className="inline-flex items-center gap-2 text-[#555] hover:text-white txt-larger transition-colors">
          <IoArrowBack className="size-4" />
          Back to Creators
        </Link>

        {/* Creator header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#111] border border-[#222] rounded-xl p-6 flex items-center gap-5">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center font-black text-white shrink-0"
            style={{ background: rankColor }}>
            {`${profile.user?.firstName?.charAt(0) ?? ""}${profile.user?.lastName?.charAt(0) ?? ""}`.toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-black text-white txt-small">
              {profile.realName ?? `${profile.user?.firstName} ${profile.user?.lastName}`}
            </h1>
            <p className="txt-larger text-[#555]">@{profile.nickname}</p>
            <p className="txt-larger text-[#555]">{profile.user?.email ?? profile.contactEmail}</p>
          </div>
          <div className="text-right shrink-0">
            <span
              className="px-2 py-0.5 txt-smaller font-bold rounded-full"
              style={{ background: `${rankColor}22`, color: rankColor }}>
              {rank}
            </span>
            <p className="txt-larger text-[#555] mt-1">
              {formatNumber(profile.totalReachAllTime)} total reach
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* ── Performance Score Panel ───────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-[#111] border border-[#222] rounded-xl p-6 space-y-5">
            <h2 className="txt-small font-bold text-white capitalize tracking-wider">
              Performance Score
            </h2>

            {/* Score ring */}
            <div className="flex items-center gap-5">
              <div className="relative flex items-center justify-center">
                <CircularProgress pct={scorePct} size={80} stroke={7} />
                <span className="absolute text-white font-black" style={{ fontSize: "15px" }}>
                  {totalScore}
                </span>
              </div>
              <div>
                <p className="txt-larger text-[#555]">out of {scoreMax} pts</p>
                <p className="txt-larger text-[#555]">{scorePct}% of target</p>
              </div>
            </div>

            {/* Breakdown */}
            <div className="space-y-2 border-t border-[#222] pt-4">
              {[
                { label: "Views (auto)",      pts: viewsPts,                    max: 10, muted: true },
                { label: "Content (auto)",    pts: contentPts,                  max: 20, muted: true },
                { label: "Engagement (auto)", pts: engPts,                      max: 15, muted: true },
                { label: "Commitment",        pts: Math.round(commitmentSaved), max: 15, muted: false },
                { label: "Admin Grade",       pts: Math.round(adminGradeSaved), max: 30, muted: false },
              ].map(({ label, pts, max, muted }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className={`txt-larger ${muted ? "text-[#444]" : "text-[#aaa]"}`}>{label}</span>
                  <span className="tabular-nums flex items-baseline gap-0.5">
                    <span className="txt-smaller text-[#888]">{pts}&nbsp;/</span>
                    <span className={`txt-smaller font-bold ${muted ? "text-[#555]" : "text-[#22bb39]"}`}>{max}</span>
                  </span>
                </div>
              ))}
            </div>

            {/* Editable score inputs */}
            <div className="space-y-3 border-t border-[#222] pt-4">
              <p className="txt-smaller font-bold text-[#ccc] uppercase tracking-wider">
                Set Quarterly Scores
              </p>
              <div>
                <label className="txt-smaller text-[#666] mb-1 block">
                  Commitment Score <span className="text-[#444]">(0 – 15)</span>
                </label>
                <input
                  type="number"
                  min={0}
                  max={15}
                  step={0.5}
                  value={commitmentScore}
                  onChange={(e) => setCommitmentScore(e.target.value)}
                  className="w-full px-3 py-2 bg-black border border-[#2a2a2a] rounded-lg
                             text-white txt-larger outline-none focus:border-[#22bb39] transition-colors"
                />
              </div>
              <div>
                <label className="txt-smaller text-[#666] mb-1 block">
                  Admin Grade <span className="text-[#444]">(0 – 30)</span>
                </label>
                <input
                  type="number"
                  min={0}
                  max={30}
                  step={0.5}
                  value={adminGradeScore}
                  onChange={(e) => setAdminGradeScore(e.target.value)}
                  className="w-full px-3 py-2 bg-black border border-[#2a2a2a] rounded-lg
                             text-white txt-larger outline-none focus:border-[#22bb39] transition-colors"
                />
              </div>
              <button
                onClick={saveScores}
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 h-10 bg-[#22bb39]
                           text-black font-bold txt-larger rounded-lg hover:opacity-90
                           transition-opacity disabled:opacity-50">
                {saving ? (
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                ) : (
                  <IoSaveOutline className="size-4" />
                )}
                Save Scores
              </button>
            </div>
          </motion.div>

          {/* ── Creator Stats ─────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="bg-[#111] border border-[#222] rounded-xl p-6 space-y-4">
            <h2 className="txt-small font-bold text-white capitalize tracking-wider">
              Creator Stats
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Rank Reach",     value: formatNumber(profile.currentRankReach) },
                { label: "All-time Reach", value: formatNumber(profile.totalReachAllTime) },
                { label: "Engagement",     value: `${engagementRate.toFixed(2)}%` },
                { label: "Submissions",    value: String(submissions.length) },
                { label: "Approved",       value: String(approvedSubs) },
                { label: "Followers",      value: formatNumber(profile.followers ?? 0) },
              ].map(({ label, value }) => (
                <div key={label} className="bg-[#0d0d0d] rounded-lg px-4 py-3">
                  <p className="txt-smaller text-[#555]">{label}</p>
                  <p className="txt-small font-bold text-white">{value}</p>
                </div>
              ))}
            </div>

            {/* Content breakdown */}
            <div className="border-t border-[#222] pt-4 space-y-2">
              <p className="txt-smaller font-bold text-[#ccc] uppercase tracking-wider">
                Content (rank window)
              </p>
              {[
                { label: "Reels / Videos", value: profile.reelCount + profile.longVideoCount },
                { label: "Stories",        value: profile.storyCount },
                { label: "Pictures",       value: profile.pictureCount },
                { label: "Posts",          value: profile.postCount },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between txt-larger">
                  <span className="text-[#555]">{label}</span>
                  <span className="text-white font-semibold">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Submissions list ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="bg-[#111] border border-[#222] rounded-xl p-6">
          <h2 className="txt-small font-bold text-white capitalize tracking-wider mb-4">
            Submissions ({submissions.length})
          </h2>
          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {submissions.length === 0 ? (
              <p className="txt-larger text-[#555] text-center py-8">No submissions yet</p>
            ) : (
              submissions.map((sub: any) => {
                const StatusIcon  = STATUS_ICON[sub.status]  ?? IoTimeOutline;
                const statusStyle = STATUS_STYLE[sub.status] ?? "";
                return (
                  <div
                    key={sub.id}
                    className="flex items-center justify-between gap-4 p-3 bg-[#0d0d0d] rounded-lg">
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`txt-smaller px-2 py-0.5 rounded flex items-center gap-1 shrink-0 ${statusStyle}`}>
                        <StatusIcon className="size-3" />
                        {sub.status}
                      </span>
                      <span className="txt-larger text-[#aaa] truncate">{sub.contentLink}</span>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="txt-larger text-white tabular-nums">
                        {formatNumber(sub.acceptedReach)}
                      </p>
                      {sub.engagementRate != null && (
                        <p className="txt-smaller text-[#555]">
                          {sub.engagementRate.toFixed(2)}%
                        </p>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}