// src/app/[locale]/admin/submissions/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  IoCheckmarkCircle,
  IoCloseCircle,
  IoChevronDown,
  IoChevronUp,
  IoOpenOutline,
  IoRefreshOutline,
  IoTimeOutline,
} from "react-icons/io5";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/contexts/ToastContext";
import { formatNumber } from "@/lib/utils/rank";

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
  user: {
    firstName: string;
    lastName: string;
    email: string | null;
    phone: string | null;
  };
};

export default function AdminSubmissionsPage() {
  const t = useTranslations("admin");
  const locale = useLocale();
  const router = useRouter();
  const toast = useToast();
  const { user, isAuthenticated, initializationComplete } = useAuth();

  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState<
    "all" | "PENDING" | "APPROVED" | "REJECTED"
  >("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [reachInput, setReachInput] = useState("");
  const [notesInput, setNotesInput] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!initializationComplete) return;
    if (!isAuthenticated || user?.role !== "ADMIN") router.replace("/");
  }, [initializationComplete, isAuthenticated, user, router]);

  useEffect(() => {
    if (!user || user.role !== "ADMIN") return;
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, page, filter]);

  async function load() {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: "15" });
      if (filter !== "all") params.set("status", filter);
      const res = await fetch(`/api/admin/submissions?${params}`, {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setSubmissions(data.data);
        setTotalPages(data.pagination?.totalPages ?? 1);
      }
    } catch {
      toast.error(t("failedLoad"));
    } finally {
      setLoading(false);
    }
  }

  async function handleDecision(id: string, status: "APPROVED" | "REJECTED") {
    setSaving(true);
    const overrideReach = reachInput ? parseInt(reachInput, 10) : undefined;
    try {
      const res = await fetch(`/api/admin/submissions/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          acceptedReach: overrideReach,
          adminNotes: notesInput || undefined,
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
        setEditingId(null);
        setReachInput("");
        setNotesInput("");
      } else {
        toast.error(t("failedUpdate"));
      }
    } catch {
      toast.error(t("failedUpdate"));
    } finally {
      setSaving(false);
    }
  }

  function openEdit(s: Submission) {
    setEditingId(s.id);
    setReachInput(String(s.pendingReach ?? s.submittedReach));
    setNotesInput(s.adminNotes ?? "");
  }

  if (!initializationComplete || !user || user.role !== "ADMIN") {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-2 border-[#78be20] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="px-6 py-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="header-large font-display font-semibold text-white uppercase">
          {t("submissionsTitle")}
        </h1>
        <div className="flex gap-2 items-center">
          <button
            onClick={load}
            className="p-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl transition-colors">
            <IoRefreshOutline className="size-4" />
          </button>
          <div className="flex gap-1 bg-zinc-900 rounded-xl p-1">
            {(["all", "PENDING", "APPROVED", "REJECTED"] as const).map((f) => (
              <button
                key={f}
                onClick={() => {
                  setFilter(f);
                  setPage(1);
                }}
                className={`px-3 py-2 txt-smaller font-medium rounded-lg transition-colors duration-200 ${
                  filter === f
                    ? "bg-[#78be20] text-black"
                    : "text-zinc-400 hover:text-white"
                }`}>
                {f === "all" ? t("all") : t(f.toLowerCase() as any)}
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
      ) : submissions.length === 0 ? (
        <div className="text-center py-20 text-zinc-500 txt-regular">
          {t("noSubmissions")}
        </div>
      ) : (
        <div className="space-y-3">
          {submissions.map((s, i) => {
            const hasDelta = s.pendingReach !== null;
            const delta = hasDelta
              ? s.pendingReach! - (s.previousAcceptedReach ?? s.acceptedReach)
              : 0;

            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.025 }}
                className="bg-[#0d0d0d] border border-zinc-800 rounded-2xl overflow-hidden">
                {/* Summary */}
                <div className="p-4 flex items-center gap-4 flex-wrap">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="txt-small font-medium text-white">
                        {s.nickname}
                      </span>
                      <span className="txt-smaller text-zinc-500">
                        {s.user.firstName} {s.user.lastName}
                      </span>
                      <span className="txt-smaller uppercase text-[#78be20] bg-[#78be20]/10 px-2 py-0.5 rounded-sm">
                        {s.platform}
                      </span>
                      <span className="txt-smaller text-zinc-400 uppercase">
                        {s.rank.replace(/_/g, " ")}
                      </span>
                      <span
                        className={`txt-smaller px-2 py-0.5 rounded-sm ${
                          s.status === "APPROVED"
                            ? "text-[#78be20] bg-[#78be20]/10"
                            : s.status === "REJECTED"
                              ? "text-red-400 bg-red-500/10"
                              : "text-yellow-400 bg-yellow-400/10"
                        }`}>
                        {t(s.status.toLowerCase() as any)}
                      </span>
                      {hasDelta && (
                        <span className="txt-smaller text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-sm flex items-center gap-1">
                          <IoTimeOutline className="size-3" />
                          {t("pendingEdit")}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-4 txt-smaller flex-wrap">
                      <span>
                        <span className="text-zinc-500">
                          {t("acceptedReach")}:{" "}
                        </span>
                        <span className="text-white font-medium">
                          {formatNumber(s.acceptedReach)}
                        </span>
                      </span>
                      {hasDelta && (
                        <span>
                          <span className="text-zinc-500">
                            {t("pendingEdit")}:{" "}
                          </span>
                          <span className="text-yellow-400 font-medium">
                            {formatNumber(s.pendingReach!)}
                            {delta > 0 && (
                              <span className="text-zinc-500 ms-1">
                                (+{formatNumber(delta)})
                              </span>
                            )}
                          </span>
                        </span>
                      )}
                      <span className="text-zinc-500">
                        {new Date(s.createdAt).toLocaleDateString(locale)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 flex-wrap">
                    {s.status !== "APPROVED" && (
                      <button
                        onClick={() => handleDecision(s.id, "APPROVED")}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg txt-smaller font-medium
                          bg-[#78be20]/10 text-[#78be20] hover:bg-[#78be20] hover:text-black transition-colors">
                        <IoCheckmarkCircle className="size-4" />
                        {t("approve")}
                      </button>
                    )}
                    {s.status !== "REJECTED" && (
                      <button
                        onClick={() => handleDecision(s.id, "REJECTED")}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg txt-smaller font-medium
                          bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
                        <IoCloseCircle className="size-4" />
                        {t("reject")}
                      </button>
                    )}
                    <button
                      onClick={() => {
                        openEdit(s);
                        setExpandedId(s.id);
                      }}
                      className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-white txt-smaller rounded-lg transition-colors">
                      {t("edit")}
                    </button>
                    <button
                      onClick={() =>
                        setExpandedId(expandedId === s.id ? null : s.id)
                      }
                      className="p-2 text-zinc-500 hover:text-white transition-colors">
                      {expandedId === s.id ? (
                        <IoChevronUp className="size-4" />
                      ) : (
                        <IoChevronDown className="size-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded */}
                {expandedId === s.id && (
                  <div className="border-t border-zinc-800 p-5 space-y-4 bg-zinc-900/20">
                    <div>
                      <p className="txt-smaller text-zinc-500 mb-1">
                        {t("contentLink")}
                      </p>
                      <a
                        href={s.contentLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="txt-small text-[#78be20] hover:text-[#8fd428] flex items-center gap-1.5 break-all">
                        {s.contentLink}{" "}
                        <IoOpenOutline className="size-3.5 shrink-0" />
                      </a>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="txt-smaller text-zinc-500 mb-2">
                          {t("contentTypes")}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {s.contentTypes.map((c) => (
                            <span
                              key={c}
                              className="txt-smaller px-2 py-0.5 bg-zinc-800 rounded text-zinc-300">
                              {c.replace(/_/g, " ")}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="txt-smaller text-zinc-500 mb-2">
                          {t("monsterAppearance")}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {s.monsterAppearances.map((a) => (
                            <span
                              key={a}
                              className="txt-smaller px-2 py-0.5 bg-zinc-800 rounded text-zinc-300">
                              {a.replace(/_/g, " ")}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {hasDelta && (
                      <div className="bg-yellow-400/5 border border-yellow-400/20 rounded-xl p-3 space-y-1">
                        <p className="txt-smaller font-semibold text-yellow-400">
                          {t("pendingEdit")}
                        </p>
                        <div className="flex gap-4 txt-smaller flex-wrap">
                          <span>
                            <span className="text-zinc-500">
                              {t("previousAccepted")}:{" "}
                            </span>
                            <span className="text-white">
                              {formatNumber(
                                s.previousAcceptedReach ?? s.acceptedReach,
                              )}
                            </span>
                          </span>
                          <span>
                            <span className="text-zinc-500">New: </span>
                            <span className="text-yellow-400">
                              {formatNumber(s.pendingReach!)}
                            </span>
                          </span>
                          <span>
                            <span className="text-zinc-500">Delta: </span>
                            <span
                              className={
                                delta >= 0 ? "text-[#78be20]" : "text-red-400"
                              }>
                              +{formatNumber(delta)}
                            </span>
                          </span>
                        </div>
                      </div>
                    )}

                    {s.statsScreenshotUrl && (
                      <div>
                        <p className="txt-smaller text-zinc-500 mb-2">
                          {t("statsScreenshot")}
                        </p>
                        <div className="relative w-full max-w-xs h-40 rounded-xl overflow-hidden border border-zinc-700">
                          <Image
                            src={s.statsScreenshotUrl}
                            alt="stats"
                            fill
                            className="object-contain bg-zinc-900 p-2"
                          />
                        </div>
                      </div>
                    )}

                    {editingId === s.id && (
                      <div className="border-t border-zinc-700 pt-4 space-y-3">
                        <p className="txt-small font-semibold text-white">
                          {t("editSubmission")}
                        </p>
                        <div className="space-y-1">
                          <label className="txt-smaller text-zinc-500">
                            {t("overrideReach")}
                            <span className="text-zinc-600 ms-1">
                              ({t("overrideReachHint")})
                            </span>
                          </label>
                          <input
                            type="number"
                            min="0"
                            value={reachInput}
                            onChange={(e) => setReachInput(e.target.value)}
                            placeholder={String(
                              s.pendingReach ?? s.submittedReach,
                            )}
                            className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-lg text-white
                              txt-small outline-none focus:border-[#78be20] placeholder:text-zinc-600 transition-colors"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="txt-smaller text-zinc-500">
                            {t("notes")}
                          </label>
                          <textarea
                            value={notesInput}
                            onChange={(e) => setNotesInput(e.target.value)}
                            rows={2}
                            placeholder={t("notesPlaceholder")}
                            className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-lg text-white
                              txt-small outline-none focus:border-[#78be20] resize-none
                              placeholder:text-zinc-600 transition-colors"
                          />
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingId(null);
                              setReachInput("");
                              setNotesInput("");
                            }}
                            className="flex-1 py-2 bg-zinc-800 hover:bg-zinc-700 text-white txt-smaller rounded-lg transition-colors">
                            {t("cancel")}
                          </button>
                          <button
                            onClick={() => handleDecision(s.id, "APPROVED")}
                            disabled={saving}
                            className="flex-1 py-2 bg-[#78be20] hover:bg-[#8fd428] text-black txt-smaller
                              font-semibold rounded-lg transition-colors disabled:opacity-50">
                            {t("approve")}
                          </button>
                          <button
                            onClick={() => handleDecision(s.id, "REJECTED")}
                            disabled={saving}
                            className="flex-1 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 txt-smaller
                              font-semibold rounded-lg border border-red-500/20 transition-colors disabled:opacity-50">
                            {t("reject")}
                          </button>
                        </div>
                      </div>
                    )}

                    {s.adminNotes && editingId !== s.id && (
                      <div>
                        <p className="txt-smaller text-zinc-500 mb-1">
                          {t("notes")}
                        </p>
                        <p className="txt-small text-zinc-300 italic">
                          &ldquo;{s.adminNotes}&rdquo;
                        </p>
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
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white txt-small rounded-lg disabled:opacity-40 transition-colors">
            ←
          </button>
          <span className="txt-small text-zinc-400">
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white txt-small rounded-lg disabled:opacity-40 transition-colors">
            →
          </button>
        </div>
      )}
    </div>
  );
}
