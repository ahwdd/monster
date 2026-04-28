// src/app/[locale]/submissions/page.tsx
"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoAddCircleOutline,
  IoOpenOutline,
  IoWarningOutline,
  IoCheckmarkCircle,
  IoTimeOutline,
  IoCloseCircle,
  IoCreateOutline,
  IoClose,
  IoImageOutline,
  IoArrowUpOutline,
  IoChevronBackOutline,
  IoChevronForwardOutline
} from "react-icons/io5";
import AuthShell from "@/components/auth/AuthShell";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/contexts/ToastContext";
import { formatNumber } from "@/lib/utils/rank";
import { uploadToCloudinary } from "@/lib/utils/uploadImages";
import { RANK_COLOR, RANK_LABEL_EN, RANK_LABEL_AR } from "@/lib/data/rankConfig";

const PENDING_CAP = 5;
const PAGE_LIMIT   = 20;

type Submission = {
  id: string;
  platform: string;
  contentLink: string;
  contentTypes: string[];
  submittedReach: number;
  acceptedReach: number;
  pendingReach: number | null;
  previousAcceptedReach: number | null;
  statsScreenshotUrl: string | null;
  status: "PENDING" | "APPROVED" | "REJECTED";
  adminNotes: string | null;
  isEdited: boolean;
  rank: string;
  createdAt: string;
  updatedAt: string;
};

const STATUS_STYLE: Record<string, string> = {
  APPROVED: "text-[#78be20] bg-[#78be20]/10",
  PENDING:  "text-yellow-400 bg-yellow-400/10",
  REJECTED: "text-red-400 bg-red-400/10",
};
const STATUS_ICON: Record<string, React.ElementType> = {
  APPROVED: IoCheckmarkCircle,
  PENDING:  IoTimeOutline,
  REJECTED: IoCloseCircle,
};

function extractPublicId(url: string): string | null {
  try {
    const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[a-z]+)?$/i);
    return match?.[1] ?? null;
  } catch {
    return null;
  }
}

async function deleteFromCloudinary(url: string) {
  const publicId = extractPublicId(url);
  if (!publicId) return;
  await fetch("/api/cloudinary/delete", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ public_id: publicId }),
  }).catch(() => {});
}

/** Small inline rank pill, reused per card */
function RankPill({ rank, isAr }: { rank: string; isAr: boolean }) {
  const color = RANK_COLOR[rank] ?? "#6b7280";
  const label = isAr ? (RANK_LABEL_AR[rank] ?? rank) : (RANK_LABEL_EN[rank] ?? rank);
  return (
    <span
      className="txt-smaller px-2 py-0.5 rounded-sm font-semibold uppercase"
      style={{ color, background: `${color}18` }}>
      {label}
    </span>
  );
}

export default function SubmissionsPage() {
  const t    = useTranslations("submissions");
  const locale = useLocale();
  const isAr   = locale === "ar";
  const router = useRouter();
  const toast  = useToast();
  const { user, isAuthenticated, initializationComplete } = useAuth();

  const [submissions,  setSubmissions]  = useState<Submission[]>([]);
  const [loading,      setLoading]      = useState(true);
  const [pendingCount, setPendingCount] = useState(0);
  const [canSubmit,    setCanSubmit]    = useState(true);
  const [currentRank,  setCurrentRank]  = useState<string | null>(null);

  // Pagination
  const [page,       setPage]       = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Reach-update panel
  const [updatingId,     setUpdatingId]     = useState<string | null>(null);
  const [reachInput,     setReachInput]     = useState("");
  const [newScreenshot,  setNewScreenshot]  = useState<string | null>(null);
  const [uploading,      setUploading]      = useState(false);
  const [saving,         setSaving]         = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initializationComplete && !isAuthenticated) router.push("/auth/signin");
  }, [initializationComplete, isAuthenticated, router]);

  useEffect(() => {
    if (!user) return;
    // Fetch current rank from profile once
    fetch("/api/profile/register", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setCurrentRank(d.data?.rank ?? null))
      .catch(() => {});
  }, [user]);

  const loadSubmissions = useCallback(
    async (p: number) => {
      setLoading(true);
      // Close any open update panel when navigating pages
      setUpdatingId(null);
      setReachInput("");
      setNewScreenshot(null);
      try {
        const res = await fetch(
          `/api/submissions?page=${p}&limit=${PAGE_LIMIT}`,
          { credentials: "include" },
        );
        const d = await res.json();
        if (d.success) {
          setSubmissions(d.data);
          setPendingCount(d.pendingCount ?? 0);
          setCanSubmit(d.canSubmit ?? true);
          setTotalCount(d.total ?? d.data.length);
          setTotalPages(d.totalPages ?? 1);
        }
      } catch {
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    if (!user) return;
    loadSubmissions(page);
  }, [user, page, loadSubmissions]);

  function openReachUpdate(s: Submission) {
    setUpdatingId(s.id);
    setReachInput(String(s.acceptedReach));
    setNewScreenshot(null);
  }

  async function cancelReachUpdate() {
    if (newScreenshot) await deleteFromCloudinary(newScreenshot);
    setUpdatingId(null);
    setReachInput("");
    setNewScreenshot(null);
  }

  async function handleScreenshotChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error(isAr ? "الحجم الأقصى 5 ميجا" : "Max file size is 5 MB");
      return;
    }
    if (newScreenshot) await deleteFromCloudinary(newScreenshot);
    setUploading(true);
    const result = await uploadToCloudinary(file, "monster-creators/stats");
    setUploading(false);
    if (result.error) {
      toast.error(result.error);
    } else {
      setNewScreenshot(result.secure_url);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function removeNewScreenshot() {
    if (newScreenshot) await deleteFromCloudinary(newScreenshot);
    setNewScreenshot(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function submitReachUpdate(s: Submission) {
    const newReach = parseInt(reachInput, 10);
    if (isNaN(newReach) || newReach <= s.acceptedReach) {
      toast.error(
        isAr
          ? `الوصول الجديد يجب أن يكون أكبر من ${formatNumber(s.acceptedReach)}`
          : `New reach must be greater than ${formatNumber(s.acceptedReach)}`,
      );
      return;
    }
    setSaving(true);
    try {
      const payload: Record<string, unknown> = { submittedReach: newReach };
      if (newScreenshot) payload.statsScreenshotUrl = newScreenshot;

      const res  = await fetch(`/api/submissions/${s.id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success) {
        setSubmissions((prev) =>
          prev.map((sub) => (sub.id === s.id ? { ...sub, ...data.data } : sub)),
        );
        toast.success(
          isAr ? "تم إرسال تحديث الوصول للمراجعة!" : "Reach update sent for review!",
        );
        setUpdatingId(null);
        setReachInput("");
        setNewScreenshot(null);
      } else {
        toast.error(data.error || (isAr ? "حدث خطأ" : "Error"));
      }
    } catch {
      toast.error(isAr ? "حدث خطأ" : "Error");
    } finally {
      setSaving(false);
    }
  }

  if (!initializationComplete || !user) {
    return (
      <AuthShell>
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-[#78be20] border-t-transparent rounded-full animate-spin" />
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell>
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h1 className="header-large font-display font-semibold text-white uppercase">
            {t("title")}
          </h1>
          {canSubmit ? (
            <Link
              href="/submissions/submit"
              className="flex items-center gap-2 px-4 py-2.5 bg-[#78be20] hover:bg-[#8fd428]
                text-black font-display font-semibold txt-small uppercase rounded-xl transition-colors">
              <IoAddCircleOutline className="size-4" />
              {t("newSubmission")}
            </Link>
          ) : (
            <div className="flex items-center gap-1.5 px-4 py-2.5 bg-zinc-800 text-zinc-500 txt-small rounded-xl cursor-not-allowed">
              <IoWarningOutline className="size-4 text-yellow-500" />
              {t("pendingCountHeader", { count: pendingCount, cap: PENDING_CAP })}
            </div>
          )}
        </div>

        {/* Pending cap warning */}
        {!canSubmit && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-yellow-400/5 border border-yellow-400/30 rounded-2xl p-4 flex items-start gap-3 mb-5">
            <IoWarningOutline className="size-5 text-yellow-400 shrink-0 mt-0.5" />
            <div>
              <p className="txt-small font-semibold text-yellow-400">
                {t("pendingCapReached")}
              </p>
              <p className="txt-smaller text-zinc-400 mt-0.5">
                {t("pendingCapDesc", { count: pendingCount, cap: PENDING_CAP })}
              </p>
            </div>
          </motion.div>
        )}

        {/* List */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#78be20] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : submissions.length === 0 ? (
          <div className="bg-[#0d0d0d] border border-zinc-800 rounded-2xl p-12 text-center space-y-4">
            <p className="txt-regular text-zinc-500">{t("noSubmissions")}</p>
            {canSubmit && (
              <Link
                href="/submissions/submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#78be20] hover:bg-[#8fd428]
                  text-black font-display font-semibold txt-small uppercase rounded-xl transition-colors">
                <IoAddCircleOutline className="size-4" />
                {t("addFirst")}
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {submissions.map((s, i) => {
                const StatusIcon  = STATUS_ICON[s.status];
                const statusStyle = STATUS_STYLE[s.status];
                const hasDelta    = s.pendingReach !== null;
                const delta       = hasDelta
                  ? s.pendingReach! - (s.previousAcceptedReach ?? s.acceptedReach)
                  : 0;
                const isUpdating = updatingId === s.id;

                // "Update Reach" is only allowed on APPROVED submissions
                // that belong to the creator's current rank window.
                const isCurrentRank  = currentRank !== null && s.rank === currentRank;
                const canUpdateReach = s.status === "APPROVED" && !hasDelta && isCurrentRank;

                return (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="bg-[#0d0d0d] border border-zinc-800 rounded-2xl overflow-hidden">

                    {/* Card body */}
                    <div className="p-4">
                      {/* Top row */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          {/* Platform */}
                          <span className="txt-smaller font-medium uppercase text-[#78be20] bg-[#78be20]/10 px-2 py-0.5 rounded-sm">
                            {s.platform}
                          </span>

                          {/* Rank at time of submission */}
                          <RankPill rank={s.rank} isAr={isAr} />

                          {/* Status */}
                          <span className={`txt-smaller px-2 py-0.5 rounded-sm flex items-center gap-1 ${statusStyle}`}>
                            <StatusIcon className="size-3" />
                            {t(s.status.toLowerCase() as Parameters<typeof t>[0])}
                          </span>

                          {hasDelta && (
                            <span className="txt-smaller text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-sm flex items-center gap-1">
                              <IoTimeOutline className="size-3" />
                              {t("editPending")}
                            </span>
                          )}

                          <span className="txt-smaller text-zinc-500">
                            {new Date(s.createdAt).toLocaleDateString(locale)}
                          </span>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-2 shrink-0">
                          {/* Update Reach — only for current-rank approved submissions */}
                          {canUpdateReach && (
                            <button
                              onClick={() => isUpdating ? cancelReachUpdate() : openReachUpdate(s)}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#78be20]/10
                                hover:bg-[#78be20]/20 text-[#78be20] txt-smaller font-medium
                                rounded-lg transition-colors">
                              {isUpdating
                                ? <IoClose className="size-3.5" />
                                : <IoArrowUpOutline className="size-3.5" />}
                              {isUpdating
                                ? (isAr ? "إلغاء" : "Cancel")
                                : (isAr ? "تحديث الوصول" : "Update Reach")}
                            </button>
                          )}

                          {/* Edit — only for PENDING / REJECTED */}
                          {s.status !== "APPROVED" && (
                            <Link
                              href={`/submissions/edit/${s.id}`}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800
                                hover:bg-zinc-700 text-white txt-smaller font-medium
                                rounded-lg transition-colors">
                              <IoCreateOutline className="size-3.5" />
                              {t("edit")}
                            </Link>
                          )}
                        </div>
                      </div>

                      {/* Content link */}
                      <a
                        href={s.contentLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="txt-small text-zinc-400 hover:text-white transition-colors
                          flex items-center gap-1.5 truncate max-w-xs mb-2">
                        <span className="truncate">{s.contentLink}</span>
                        <IoOpenOutline className="size-3.5 shrink-0" />
                      </a>

                      {/* Content types */}
                      <div className="flex gap-1.5 flex-wrap mb-3">
                        {s.contentTypes.map((ct) => (
                          <span
                            key={ct}
                            className="txt-smaller bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-400">
                            {ct.replace(/_/g, " ")}
                          </span>
                        ))}
                      </div>

                      {/* Reach */}
                      <div className="flex items-center gap-4 flex-wrap txt-smaller">
                        <div>
                          <span className="text-zinc-500">{t("acceptedReach")}: </span>
                          <span className="text-white font-medium">{formatNumber(s.acceptedReach)}</span>
                        </div>
                        {hasDelta && (
                          <div className="flex items-center gap-1">
                            <span className="text-zinc-500">{t("pendingReach")}: </span>
                            <span className="text-yellow-400 font-medium">
                              {formatNumber(s.pendingReach!)}
                              {delta > 0 && (
                                <span className="text-zinc-500 ms-1">
                                  (+{formatNumber(delta)})
                                </span>
                              )}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Admin notes */}
                      {s.adminNotes && (
                        <p className="txt-smaller text-zinc-500 mt-2 italic border-t border-zinc-800 pt-2">
                          &ldquo;{s.adminNotes}&rdquo;
                        </p>
                      )}
                    </div>

                    {/* ── Inline reach-update panel ── */}
                    <AnimatePresence>
                      {isUpdating && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                          className="overflow-hidden">
                          <div className="border-t border-zinc-800 p-4 bg-zinc-900/30 space-y-4">
                            {/* Reach input */}
                            <div className="space-y-1.5">
                              <label className="txt-small font-medium text-white">
                                {isAr ? "الوصول الإجمالي الجديد" : "New Total Reach"}
                                <span className="text-red-400 ms-1">*</span>
                              </label>
                              <p className="txt-smaller text-zinc-500">
                                {isAr
                                  ? `يجب أن يكون أكبر من الوصول المعتمد الحالي: ${formatNumber(s.acceptedReach)}`
                                  : `Must exceed current accepted reach: ${formatNumber(s.acceptedReach)}`}
                              </p>
                              <input
                                type="number"
                                min={s.acceptedReach + 1}
                                value={reachInput}
                                onChange={(e) => setReachInput(e.target.value)}
                                className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-lg
                                  text-white txt-regular placeholder:text-zinc-600 outline-none
                                  focus:border-[#78be20] transition-colors"
                                placeholder={String(s.acceptedReach + 1)}
                              />
                              {reachInput &&
                                !isNaN(parseInt(reachInput)) &&
                                parseInt(reachInput) > s.acceptedReach && (
                                  <p className="txt-smaller text-[#78be20]">
                                    +{formatNumber(parseInt(reachInput) - s.acceptedReach)}{" "}
                                    {isAr ? "زيادة في الوصول" : "increase"}
                                  </p>
                                )}
                            </div>

                            {/* Screenshot section */}
                            <div className="space-y-1.5">
                              <label className="txt-small font-medium text-white">
                                {isAr ? "تحديث صورة الإحصائيات" : "Update Stats Screenshot"}
                                <span className="txt-smaller text-zinc-500 font-normal ms-2">
                                  ({isAr ? "اختياري" : "optional"})
                                </span>
                              </label>
                              <p className="txt-smaller text-zinc-500">
                                {isAr
                                  ? "الصورة القديمة لن تُحذف من Cloudinary إلا عند الضغط على زر التحديث."
                                  : "The old screenshot won't be deleted from Cloudinary until you press Update."}
                              </p>

                              <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleScreenshotChange}
                                className="hidden"
                              />

                              {newScreenshot ? (
                                <div className="relative w-full h-40 rounded-xl overflow-hidden border border-[#78be20]/40 group">
                                  <Image
                                    src={newScreenshot}
                                    alt="New screenshot"
                                    fill
                                    className="object-contain bg-zinc-900 p-2"
                                  />
                                  <button
                                    type="button"
                                    onClick={removeNewScreenshot}
                                    className="absolute top-2 inset-e-2 p-1.5 bg-black/80 hover:bg-black
                                      rounded-lg text-white transition-colors">
                                    <IoClose className="size-4" />
                                  </button>
                                  <div className="absolute bottom-0 inset-x-0 bg-black/70 py-1.5 text-center">
                                    <span className="txt-smaller text-[#78be20]">
                                      {isAr ? "✓ صورة جديدة جاهزة" : "✓ New screenshot ready"}
                                    </span>
                                  </div>
                                </div>
                              ) : (
                                <div className="space-y-2">
                                  {s.statsScreenshotUrl && (
                                    <div className="relative w-full h-28 rounded-xl overflow-hidden border border-zinc-700/40">
                                      <Image
                                        src={s.statsScreenshotUrl}
                                        alt="Current"
                                        fill
                                        className="object-contain bg-zinc-900/50 p-2 opacity-40"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="txt-smaller text-zinc-400 bg-black/70 px-3 py-1 rounded-lg">
                                          {isAr ? "الصورة الحالية" : "Current screenshot"}
                                        </span>
                                      </div>
                                    </div>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={uploading}
                                    className="w-full flex flex-col items-center justify-center gap-2 h-24
                                      rounded-xl border-2 border-dashed border-zinc-700 bg-zinc-900/50
                                      hover:border-[#78be20] hover:bg-[#78be20]/5
                                      transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                    {uploading ? (
                                      <>
                                        <div className="w-5 h-5 border-2 border-[#78be20] border-t-transparent rounded-full animate-spin" />
                                        <span className="txt-smaller text-zinc-400">
                                          {isAr ? "جارٍ الرفع..." : "Uploading..."}
                                        </span>
                                      </>
                                    ) : (
                                      <>
                                        <IoImageOutline className="size-6 text-zinc-500" />
                                        <span className="txt-smaller text-zinc-400">
                                          {isAr ? "رفع صورة جديدة" : "Upload new screenshot"}
                                        </span>
                                      </>
                                    )}
                                  </button>
                                </div>
                              )}
                            </div>

                            {/* Confirm / Cancel */}
                            <div className="flex gap-2 pt-1">
                              <button
                                onClick={cancelReachUpdate}
                                disabled={saving}
                                className="flex-1 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white
                                  txt-small font-medium rounded-xl transition-colors disabled:opacity-50">
                                {isAr ? "إلغاء" : "Cancel"}
                              </button>
                              <button
                                onClick={() => submitReachUpdate(s)}
                                disabled={saving || uploading}
                                className="flex-1 py-2.5 bg-[#78be20] hover:bg-[#8fd428] text-black
                                  txt-small font-semibold rounded-xl transition-colors
                                  disabled:opacity-50 disabled:cursor-not-allowed
                                  flex items-center justify-center gap-2">
                                {saving ? (
                                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                ) : (
                                  <IoArrowUpOutline className="size-4" />
                                )}
                                {isAr ? "تحديث" : "Update"}
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* ── Pagination ── */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6 gap-3">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1 || loading}
                  className="flex items-center gap-1.5 px-4 py-2 bg-zinc-800 hover:bg-zinc-700
                    text-white txt-smaller font-medium rounded-xl transition-colors
                    disabled:opacity-40 disabled:cursor-not-allowed">
                  <IoChevronBackOutline className="size-3.5" />
                  {isAr ? "السابق" : "Previous"}
                </button>

                <span className="txt-smaller text-zinc-400 tabular-nums">
                  {isAr
                    ? `${page} / ${totalPages} — ${totalCount} مشاركة`
                    : `${page} / ${totalPages} — ${totalCount} submissions`}
                </span>

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages || loading}
                  className="flex items-center gap-1.5 px-4 py-2 bg-zinc-800 hover:bg-zinc-700
                    text-white txt-smaller font-medium rounded-xl transition-colors
                    disabled:opacity-40 disabled:cursor-not-allowed">
                  {isAr ? "التالي" : "Next"}
                  <IoChevronForwardOutline className="size-3.5" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </AuthShell>
  );
}