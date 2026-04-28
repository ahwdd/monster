// src/app/[locale]/admin/submissions/page.tsx
"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  IoCheckmarkCircle,
  IoCloseCircle,
  IoChevronDown,
  IoChevronUp,
  IoOpenOutline,
  IoRefreshOutline,
  IoTimeOutline,
  IoClose,
  IoSearchOutline,
  IoStarOutline,
  IoStar,
} from "react-icons/io5";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/contexts/ToastContext";
import { formatNumber } from "@/lib/utils/rank";
import Skeleton from "@/components/Skeleton";

type Submission = {
  id: string;
  nickname: string;
  rank: string;
  platform: string;
  contentLink: string;
  contentTypes: string[];
  monsterAppearances: string[];
  submittedReach: number;
  acceptedReach: number;
  pendingReach: number | null;
  previousAcceptedReach: number | null;
  statsScreenshotUrl: string | null;
  status: "PENDING" | "APPROVED" | "REJECTED";
  adminNotes: string | null;
  isEdited: boolean;
  createdAt: string;
  engagementRate: number | null;
  qualityRating: number | null;
  rejectionReason: string | null;
  user: {
    firstName: string;
    lastName: string;
    email: string | null;
    phone: string | null;
  };
};

const REJECTION_REASONS = [
  { value: "LOW_QUALITY", label: "Low Quality" },
  { value: "WRONG_CONTENT_TYPE", label: "Wrong Content Type" },
  { value: "INSUFFICIENT_REACH", label: "Insufficient Reach" },
  { value: "GUIDELINE_VIOLATION", label: "Guideline Violation" },
  { value: "DUPLICATE", label: "Duplicate" },
  { value: "OTHER", label: "Other" },
];

const PLATFORM_COLORS: Record<string, string> = {
  TIKTOK: "#ff004f",
  INSTAGRAM: "#e1306c",
  YOUTUBE: "#ff0000",
  FACEBOOK: "#1877f2",
  TWITCH: "#9146ff",
  KICK: "#53fc18",
};

const STATUS_STYLE: Record<string, string> = {
  APPROVED: "text-[#22bb39] bg-[#22bb39]/10",
  PENDING: "text-[#bfec1d] bg-[#bfec1d]/10",
  REJECTED: "text-red-400 bg-red-400/10",
};

// Star rating component — 0.5 steps, 1–5
function StarRating({
  value,
  onChange,
}: {
  value: number | null;
  onChange: (v: number) => void;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const display = hovered ?? value ?? 0;

  function getColor(filled: number) {
    if (filled <= 1) return "#ef4444";
    if (filled <= 2) return "#f97316";
    if (filled <= 3) return "#eab308";
    if (filled <= 4) return "#84cc16";
    return "#22bb39";
  }

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const full = display >= star;
        const half = !full && display >= star - 0.5;
        return (
          <div
            key={star}
            className="relative w-6 h-6 cursor-pointer"
            onMouseLeave={() => setHovered(null)}>
            {/* Left half — 0.5 */}
            <div
              className="absolute inset-0 w-1/2 z-10"
              onMouseEnter={() => setHovered(star - 0.5)}
              onClick={() => onChange(star - 0.5)}
            />
            {/* Right half — full */}
            <div
              className="absolute inset-0 left-1/2 z-10"
              onMouseEnter={() => setHovered(star)}
              onClick={() => onChange(star)}
            />
            {full || half ? (
              <IoStar
                className="size-5 transition-colors"
                style={{ color: getColor(display), opacity: half ? 0.6 : 1 }}
              />
            ) : (
              <IoStarOutline className="size-5 text-[#333]" />
            )}
          </div>
        );
      })}
      {value && (
        <span className="txt-smaller text-[#555] ms-1 tabular-nums">
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
}

// Zoomable screenshot popup
function ScreenshotPopup({
  url,
  onClose,
}: {
  url: string;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-100 bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}>
      <button
        onClick={onClose}
        className="absolute top-4 inset-e-4 p-2 bg-[#111] border border-[#272727] text-white hover:text-red-400 transition-colors">
        <IoClose className="size-5" />
      </button>
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="relative max-w-3xl max-h-[85vh] overflow-y-auto w-full"
        onClick={(e) => e.stopPropagation()}>
        <img
          src={url}
          alt="Stats screenshot"
          className="w-full object-contain rounded"
        />
      </motion.div>
    </motion.div>
  );
}

const EASE = [0.22, 1, 0.36, 1] as const;
const PAGE_SIZES = [10, 20, 30] as const;

export default function AdminSubmissionsPage() {
  const t = useTranslations("admin");
  const locale = useLocale();
  const router = useRouter();
  const toast = useToast();
  const { user, isAuthenticated, initializationComplete } = useAuth();

  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<10 | 20 | 30>(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [filter, setFilter] = useState<
    "all" | "PENDING" | "APPROVED" | "REJECTED"
  >("all");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [zoomUrl, setZoomUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Edit state
  const [reachInput, setReachInput] = useState("");
  const [notesInput, setNotesInput] = useState("");
  const [engMode, setEngMode] = useState<"rate" | "raw">("rate");
  const [engRate, setEngRate] = useState("");
  const [engLikes, setEngLikes] = useState("");
  const [engComments, setEngComments] = useState("");
  const [engShares, setEngShares] = useState("");
  const [qualityRating, setQualityRating] = useState<number | null>(null);
  const [rejReason, setRejReason] = useState<string>("");

  useEffect(() => {
    if (!initializationComplete) return;
    if (!isAuthenticated || user?.role !== "ADMIN") router.replace("/");
  }, [initializationComplete, isAuthenticated, user, router]);

  useEffect(() => {
    if (!user || user.role !== "ADMIN") return;
    load();
  }, [user, page, pageSize, filter]);

  async function load() {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(pageSize),
      });
      if (filter !== "all") params.set("status", filter);
      const res = await fetch(`/api/admin/submissions?${params}`, {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setSubmissions(data.data);
        setTotalPages(data.pagination?.totalPages ?? 1);
        setTotalCount(data.pagination?.total ?? 0);
      }
    } catch {
      toast.error(t("failedLoad"));
    } finally {
      setLoading(false);
    }
  }

  function openEdit(s: Submission) {
    setEditingId(s.id);
    setExpandedId(s.id);
    setReachInput(s.acceptedReach > 0? String(s.acceptedReach): String(s.pendingReach ?? s.submittedReach));
    setNotesInput(s.adminNotes ?? "");
    setEngMode("rate");
    setEngRate(s.engagementRate != null ? s.engagementRate.toFixed(2) : "");
    setEngLikes("");
    setEngComments("");
    setEngShares("");
    setQualityRating(s.qualityRating ?? null);
    setRejReason(s.rejectionReason ?? "");
  }

  function closeEdit() {
    setEditingId(null);
    setReachInput("");
    setNotesInput("");
    setEngRate("");
    setEngLikes("");
    setEngComments("");
    setEngShares("");
    setQualityRating(null);
    setRejReason("");
  }

  function previewRate(s: Submission): string | null {
    if (engMode !== "raw") return null;
    const reach = reachInput
      ? parseInt(reachInput, 10)
      : (s.pendingReach ?? s.submittedReach);
    const interactions =
      parseInt(engLikes || "0", 10) +
      parseInt(engComments || "0", 10) +
      parseInt(engShares || "0", 10);
    if (!reach || !interactions) return null;
    return ((interactions / reach) * 100).toFixed(2);
  }

  async function handleDecision(id: string, status: "APPROVED" | "REJECTED") {
    // Frontend validation: quality rating required for approval
    if (status === "APPROVED" && !qualityRating) {
      toast.error("Quality rating is required before approving");
      return;
    }
    if (status === "REJECTED" && !rejReason) {
      toast.error("Please select a rejection reason");
      return;
    }

    setSaving(true);
    const overrideReach = reachInput ? parseInt(reachInput, 10) : undefined;
    const engPayload: Record<string, any> = {};
    if (status === "APPROVED") {
      if (engMode === "rate" && engRate)
        engPayload.engagementRate = parseFloat(engRate);
      else if (engMode === "raw") {
        if (engLikes) engPayload.submittedLikes = parseInt(engLikes, 10);
        if (engComments)
          engPayload.submittedComments = parseInt(engComments, 10);
        if (engShares) engPayload.submittedShares = parseInt(engShares, 10);
      }
    }

    try {
      const res = await fetch(`/api/admin/submissions/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          acceptedReach: overrideReach,
          adminNotes: notesInput || undefined,
          qualityRating: status === "APPROVED" ? qualityRating : undefined,
          rejectionReason:
            status === "REJECTED" ? rejReason || undefined : undefined,
          ...engPayload,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmissions((prev) =>
          prev.map((s) => (s.id === id ? { ...s, ...data.data } : s)),
        );
        toast.success(
          status === "APPROVED" ? t("approvedOk") : t("rejectedOk"),
        );
        closeEdit();
      } else {
        toast.error(data.error || t("failedUpdate"));
      }
    } catch {
      toast.error(t("failedUpdate"));
    } finally {
      setSaving(false);
    }
  }

  const filtered = submissions.filter((s) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      s.nickname.toLowerCase().includes(q) ||
      s.user.firstName.toLowerCase().includes(q) ||
      s.contentLink.toLowerCase().includes(q)
    );
  });

  if (!initializationComplete || !user || user.role !== "ADMIN") {
    return (
      <div className="px-6 py-8 space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-16" />
        ))}
      </div>
    );
  }

  return (
    <div className="px-6 py-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <h1 className="font-display font-black text-white uppercase header-large">
          {t("submissionsTitle")}
        </h1>
        <div className="flex gap-2 items-center flex-wrap">
          {/* Page size */}
          <div className="flex gap-1 bg-[#0a0a0a] border border-[#272727] p-1">
            {PAGE_SIZES.map((n) => (
              <button
                key={n}
                onClick={() => {
                  setPageSize(n);
                  setPage(1);
                }}
                className={`px-2.5 py-1 txt-smaller font-bold transition-colors ${pageSize === n ? "bg-[#272727] text-white" : "text-[#555] hover:text-white"}`}>
                {n}
              </button>
            ))}
          </div>
          <button
            onClick={load}
            className="p-2.5 bg-[#171717] border border-[#272727] hover:border-[#444] text-white transition-colors">
            <IoRefreshOutline className="size-4" />
          </button>
          <div className="flex gap-1 bg-[#0a0a0a] border border-[#272727] p-1">
            {(["all", "PENDING", "APPROVED", "REJECTED"] as const).map((f) => (
              <button
                key={f}
                onClick={() => {
                  setFilter(f);
                  setPage(1);
                }}
                className={`px-3 py-1.5 txt-smaller font-display font-bold uppercase tracking-wider transition-colors ${filter === f ? "bg-[#6bd41a] text-black" : "text-[#ccccd0] hover:text-white"}`}>
                {f === "all" ? t("all") : t(f.toLowerCase() as any)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <IoSearchOutline className="absolute inset-s-3 top-1/2 -translate-y-1/2 size-4 text-[#555]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by nickname, name, or link…"
          className="w-full ps-9 pe-4 py-2.5 bg-[#0a0a0a] border border-[#272727] text-white txt-small
                     placeholder:text-[#444] outline-none focus:border-[#6bd41a] transition-colors font-proxima"
        />
      </div>

      {/* Count */}
      <p className="txt-smaller text-[#555] mb-3 font-proxima">
        {totalCount} submissions · page {page}/{totalPages}
      </p>

      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-14" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-[#555] font-proxima txt-regular">
          {t("noSubmissions")}
        </div>
      ) : (
        <div className="space-y-1.5">
          {filtered.map((s, i) => {
            const hasDelta = s.pendingReach !== null;
            const delta = hasDelta
              ? s.pendingReach! - (s.previousAcceptedReach ?? s.acceptedReach)
              : 0;
            const isExpanded = expandedId === s.id;
            const isEditing = editingId === s.id;
            const platColor = PLATFORM_COLORS[s.platform] ?? "#ccc";
            const ratePreview = isEditing ? previewRate(s) : null;

            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.015, ease: EASE }}
                className="bg-[#0a0a0a] border border-[#272727] overflow-hidden">
                {/* ── Main row ── */}
                <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-3">
                  {/* Left: status dot + platform badge */}
                  <div className="flex items-center gap-2 shrink-0">
                    <div
                      className={`w-1.5 h-8 rounded-full ${
                        s.status === "APPROVED"
                          ? "bg-[#22bb39]"
                          : s.status === "REJECTED"
                            ? "bg-red-400"
                            : "bg-[#bfec1d]"
                      }`}
                    />
                    <span
                      className="txt-smaller font-bold uppercase px-2 py-0.5 rounded-sm"
                      style={{
                        color: platColor,
                        background: `${platColor}18`,
                      }}>
                      {s.platform}
                    </span>
                  </div>

                  {/* Center: info row */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <span className="font-display font-bold text-white txt-small">
                        {s.nickname}
                      </span>
                      <span className="txt-smaller text-[#444]">
                        {s.user.firstName} {s.user.lastName}
                      </span>
                      <span
                        className={`txt-smaller px-1.5 py-0.5 rounded-sm ${STATUS_STYLE[s.status]}`}>
                        {s.status}
                      </span>
                      {hasDelta && (
                        <span className="txt-smaller text-[#bfec1d] bg-[#bfec1d]/10 px-1.5 py-0.5 rounded-sm flex items-center gap-1">
                          <IoTimeOutline className="size-3" />+
                          {formatNumber(delta)}
                        </span>
                      )}
                    </div>
                    {/* Content info on large screens */}
                    <div className="flex items-center gap-3 flex-wrap">
                      <a
                        href={s.contentLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="txt-smaller text-[#555] hover:text-[#6bd41a] transition-colors flex items-center gap-1 truncate max-w-64"
                        onClick={(e) => e.stopPropagation()}>
                        <span className="truncate">{s.contentLink}</span>
                        <IoOpenOutline className="size-3 shrink-0" />
                      </a>
                      <div className="flex gap-1 flex-wrap">
                        {s.contentTypes.map((c) => (
                          <span
                            key={c}
                            className="txt-smaller bg-[#171717] border border-[#272727] px-1.5 py-0.5 text-[#888] rounded-sm">
                            {c.replace(/_/g, " ")}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-1 flex-wrap">
                        {s.monsterAppearances.map((a) => (
                          <span
                            key={a}
                            className="txt-smaller bg-[#0f1f0f] border border-[#22bb39]/20 px-1.5 py-0.5 text-[#22bb39]/70 rounded-sm">
                            {a.replace(/_/g, " ")}
                          </span>
                        ))}
                      </div>
                      <span className="txt-smaller text-[#444] whitespace-nowrap">
                        {formatNumber(s.acceptedReach)} views
                      </span>
                      {s.qualityRating && (
                        <span className="txt-smaller text-[#bfec1d]">
                          ★ {s.qualityRating.toFixed(1)}
                        </span>
                      )}
                      <span className="txt-smaller text-[#333]">
                        {new Date(s.createdAt).toLocaleDateString(locale)}
                      </span>
                    </div>
                  </div>

                  {/* Right: screenshot thumb + expand */}
                  <div className="flex items-center gap-2 shrink-0">
                    {s.statsScreenshotUrl && (
                      <button
                        onClick={() => setZoomUrl(s.statsScreenshotUrl)}
                        className="relative w-10 h-10 border border-[#272727] overflow-hidden hover:border-[#6bd41a] transition-colors group">
                        <Image
                          src={s.statsScreenshotUrl}
                          alt="stats"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <IoSearchOutline className="size-3 text-white" />
                        </div>
                      </button>
                    )}
                    <button
                      onClick={() => {
                        if (isExpanded && !isEditing) {
                          setExpandedId(null);
                        } else if (!isExpanded) {
                          setExpandedId(s.id);
                        } else closeEdit();
                      }}
                      className="p-1.5 text-[#444] hover:text-white transition-colors">
                      {isExpanded ? (
                        <IoChevronUp className="size-4" />
                      ) : (
                        <IoChevronDown className="size-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* ── Expanded panel ── */}
                {isExpanded && (
                  <div className="border-t border-[#171717] bg-[#050505] p-5 space-y-4">
                    {/* Pending reach info */}
                    {hasDelta && (
                      <div className="border border-[#bfec1d]/20 bg-[#bfec1d]/5 p-3 space-y-1 rounded-sm">
                        <p className="txt-smaller font-bold text-[#bfec1d]">
                          {t("pendingEdit")}
                        </p>
                        <div className="flex gap-4 txt-smaller flex-wrap">
                          <span>
                            <span className="text-[#555]">
                              {t("previousAccepted")}:{" "}
                            </span>
                            <span className="text-white">
                              {formatNumber(
                                s.previousAcceptedReach ?? s.acceptedReach,
                              )}
                            </span>
                          </span>
                          <span>
                            <span className="text-[#555]">New: </span>
                            <span className="text-[#bfec1d]">
                              {formatNumber(s.pendingReach!)}
                            </span>
                          </span>
                          <span>
                            <span className="text-[#555]">Delta: </span>
                            <span
                              className={
                                delta >= 0 ? "text-[#22bb39]" : "text-red-400"
                              }>
                              +{formatNumber(delta)}
                            </span>
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Admin notes read-only */}
                    {s.adminNotes && !isEditing && (
                      <p className="txt-smaller text-[#555] italic">
                        "{s.adminNotes}"
                      </p>
                    )}
                    {s.rejectionReason && !isEditing && (
                      <p className="txt-smaller text-red-400/70">
                        Rejection reason:{" "}
                        {
                          REJECTION_REASONS.find(
                            (r) => r.value === s.rejectionReason,
                          )?.label
                        }
                      </p>
                    )}

                    {/* Edit / actions buttons when not editing */}
                    {!isEditing && (
                      <button
                        onClick={() => openEdit(s)}
                        className="px-4 py-2 bg-[#171717] border border-[#272727] hover:border-[#444] text-white txt-smaller font-medium transition-colors">
                        {t("edit")} / Review
                      </button>
                    )}

                    {/* ── Edit panel ── */}
                    {isEditing && (
                      <div className="space-y-4 border-t border-[#272727] pt-4">
                        {/* Reach override */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="txt-smaller text-[#888] font-medium">
                              {t("overrideReach")}
                              <span className="text-[#444] ms-1">
                                ({t("overrideReachHint")})
                              </span>
                            </label>
                            <input
                              type="number"
                              min="0"
                              value={reachInput}
                              onChange={(e) => setReachInput(e.target.value)}
                              className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-[#272727] text-white txt-small
                                         outline-none focus:border-[#6bd41a] transition-colors placeholder:text-[#444]"
                              placeholder="Leave empty to use submitted value"
                            />
                          </div>

                          {/* Quality rating */}
                          <div className="space-y-1.5">
                            <label className="txt-smaller text-[#888] font-medium">
                              Content Quality Rating
                              <span className="text-red-400 ms-1">*</span>
                            </label>
                            <div className="flex items-center gap-2 py-1">
                              <StarRating
                                value={qualityRating}
                                onChange={setQualityRating}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Engagement */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <label className="txt-smaller text-[#888] font-medium">
                              Engagement Rate{" "}
                            </label>
                            <div className="flex gap-1 bg-[#0a0a0a] border border-[#272727] p-0.5">
                              {(["rate", "raw"] as const).map((m) => (
                                <button
                                  key={m}
                                  onClick={() => setEngMode(m)}
                                  className={`px-2.5 py-1 txt-smaller font-bold uppercase tracking-wide transition-colors ${engMode === m ? "bg-[#bfec1d] text-black" : "text-[#555] hover:text-white"}`}>
                                  {m === "rate" ? "% Direct" : "Raw Counts"}
                                </button>
                              ))}
                            </div>
                          </div>

                          {engMode === "rate" ? (
                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                min="0"
                                max="100"
                                step="0.01"
                                value={engRate}
                                onChange={(e) => setEngRate(e.target.value)}
                                placeholder="e.g. 2.35"
                                className="flex-1 px-4 py-2.5 bg-[#0a0a0a] border border-[#272727] text-white txt-small outline-none focus:border-[#bfec1d] transition-colors placeholder:text-[#444]"
                              />
                              <span className="txt-small text-[#444] shrink-0">
                                %
                              </span>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <div className="grid grid-cols-3 gap-2">
                                {[
                                  {
                                    label: "Likes",
                                    val: engLikes,
                                    set: setEngLikes,
                                  },
                                  {
                                    label: "Comments",
                                    val: engComments,
                                    set: setEngComments,
                                  },
                                  {
                                    label: "Shares",
                                    val: engShares,
                                    set: setEngShares,
                                  },
                                ].map(({ label, val, set }) => (
                                  <div key={label} className="space-y-1">
                                    <label className="txt-smaller text-[#555]">
                                      {label}
                                    </label>
                                    <input
                                      type="number"
                                      min="0"
                                      value={val}
                                      onChange={(e) => set(e.target.value)}
                                      placeholder="0"
                                      className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#272727] text-white txt-smaller outline-none focus:border-[#bfec1d] transition-colors placeholder:text-[#444]"
                                    />
                                  </div>
                                ))}
                              </div>
                              {ratePreview && (
                                <p className="txt-smaller text-[#bfec1d]">
                                  → Calculated:{" "}
                                  <span className="font-bold">
                                    {ratePreview}%
                                  </span>
                                </p>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Admin notes */}
                        <div className="space-y-1.5">
                          <label className="txt-smaller text-[#888] font-medium">
                            {t("notes")}
                          </label>
                          <textarea
                            value={notesInput}
                            onChange={(e) => setNotesInput(e.target.value)}
                            rows={2}
                            placeholder={t("notesPlaceholder")}
                            className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-[#272727] text-white txt-small
                                       outline-none focus:border-[#6bd41a] resize-none placeholder:text-[#444] transition-colors"
                          />
                        </div>

                        {/* Rejection reason (shown always so admin can pre-select before deciding) */}
                        <div className="space-y-1.5">
                          <label className="txt-smaller text-[#888] font-medium">
                            Rejection Reason{" "}
                            <span className="text-red-400">*</span>
                            <span className="text-[#444] ms-1">
                              (required if rejecting)
                            </span>
                          </label>
                          <div className="flex flex-wrap gap-1.5">
                            {REJECTION_REASONS.map((r) => (
                              <button
                                key={r.value}
                                onClick={() =>
                                  setRejReason(
                                    rejReason === r.value ? "" : r.value,
                                  )
                                }
                                className={`px-3 py-1.5 txt-smaller border transition-colors rounded-sm ${
                                  rejReason === r.value
                                    ? "bg-red-400/15 border-red-400/50 text-red-400"
                                    : "bg-transparent border-[#272727] text-[#555] hover:border-[#444] hover:text-[#ccc]"
                                }`}>
                                {r.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex gap-2 pt-1">
                          <button
                            onClick={closeEdit}
                            className="px-4 py-2.5 bg-[#171717] border border-[#272727] hover:border-[#444] text-white txt-smaller transition-colors">
                            {t("cancel")}
                          </button>
                          <button
                            onClick={() => handleDecision(s.id, "APPROVED")}
                            disabled={saving}
                            className="flex-1 py-2.5 bg-[#6bd41a] hover:bg-[#7de020] text-black font-display font-bold uppercase txt-smaller tracking-wider transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                            {saving ? (
                              <div className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                            ) : (
                              <IoCheckmarkCircle className="size-4" />
                            )}
                            {t("approve")}
                          </button>
                          <button
                            onClick={() => handleDecision(s.id, "REJECTED")}
                            disabled={saving}
                            className="flex-1 py-2.5 bg-red-400/10 hover:bg-red-400/20 text-red-400 font-display font-bold uppercase txt-smaller tracking-wider border border-red-400/20 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                            <IoCloseCircle className="size-4" />
                            {t("reject")}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-[#171717] border border-[#272727] text-white txt-small disabled:opacity-40 transition-colors hover:border-[#444]">
            ←
          </button>
          <div className="flex gap-1">
            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
              const p = i + 1;
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 txt-smaller font-bold transition-colors ${page === p ? "bg-[#6bd41a] text-black" : "bg-[#171717] border border-[#272727] text-[#ccc] hover:border-[#444]"}`}>
                  {p}
                </button>
              );
            })}
          </div>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-[#171717] border border-[#272727] text-white txt-small disabled:opacity-40 transition-colors hover:border-[#444]">
            →
          </button>
        </div>
      )}

      <AnimatePresence>
        {zoomUrl && (
          <ScreenshotPopup url={zoomUrl} onClose={() => setZoomUrl(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
