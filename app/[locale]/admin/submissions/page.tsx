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
  user: {
    firstName: string;
    lastName: string;
    email: string | null;
    phone: string | null;
  };
};

const EASE = [0.22, 1, 0.36, 1] as const;

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

  if (!initializationComplete || !user || user.role !== "ADMIN") {
    return (
      <div className="px-6 py-8 space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-20" />
        ))}
      </div>
    );
  }

  const STATUS_STYLE: Record<string, string> = {
    APPROVED: "text-[#22bb39] bg-[#22bb39]/10",
    PENDING: "text-[#bfec1d] bg-[#bfec1d]/10",
    REJECTED: "text-red-400 bg-red-400/10",
  };

  return (
    <div className="px-6 py-8 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="font-display font-black text-white uppercase header-large">
          {t("submissionsTitle")}
        </h1>
        <div className="flex gap-2 items-center">
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
                className={`px-3 py-1.5 txt-smaller font-display font-bold uppercase tracking-wider transition-colors ${
                  filter === f
                    ? "bg-[#6bd41a] text-black"
                    : "text-[#ccccd0] hover:text-white"
                }`}>
                {f === "all" ? t("all") : t(f.toLowerCase() as any)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-20" />
          ))}
        </div>
      ) : submissions.length === 0 ? (
        <div className="text-center py-20 text-[#555] font-proxima txt-regular">
          {t("noSubmissions")}
        </div>
      ) : (
        <div className="space-y-2">
          {submissions.map((s, i) => {
            const hasDelta = s.pendingReach !== null;
            const delta = hasDelta
              ? s.pendingReach! - (s.previousAcceptedReach ?? s.acceptedReach)
              : 0;
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.02, ease: EASE }}
                className="bg-[#0a0a0a] border border-[#272727] overflow-hidden">
                <div className="p-4 flex items-center gap-4 flex-wrap">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-display font-bold text-white txt-small">
                        {s.nickname}
                      </span>
                      <span className="txt-smaller text-[#555]">
                        {s.user.firstName} {s.user.lastName}
                      </span>
                      <span className="txt-smaller uppercase text-[#6bd41a] bg-[#6bd41a]/10 px-2 py-0.5">
                        {s.platform}
                      </span>
                      <span className="txt-smaller text-[#ccccd0] uppercase">
                        {s.rank.replace(/_/g, " ")}
                      </span>
                      <span
                        className={`txt-smaller px-2 py-0.5 ${STATUS_STYLE[s.status]}`}>
                        {t(s.status.toLowerCase() as any)}
                      </span>
                      {hasDelta && (
                        <span className="txt-smaller text-[#bfec1d] bg-[#bfec1d]/10 px-2 py-0.5 flex items-center gap-1">
                          <IoTimeOutline className="size-3" />
                          {t("pendingEdit")}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-4 txt-smaller flex-wrap">
                      <span>
                        <span className="text-[#555]">
                          {t("acceptedReach")}:{" "}
                        </span>
                        <span className="text-white font-medium">
                          {formatNumber(s.acceptedReach)}
                        </span>
                      </span>
                      {hasDelta && (
                        <span>
                          <span className="text-[#555]">
                            {t("pendingEdit")}:{" "}
                          </span>
                          <span className="text-[#bfec1d] font-medium">
                            {formatNumber(s.pendingReach!)}
                            {delta > 0 && (
                              <span className="text-[#555] ms-1">
                                (+{formatNumber(delta)})
                              </span>
                            )}
                          </span>
                        </span>
                      )}
                      <span className="text-[#555]">
                        {new Date(s.createdAt).toLocaleDateString(locale)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 flex-wrap">
                    {s.status !== "APPROVED" && (
                      <button
                        onClick={() => handleDecision(s.id, "APPROVED")}
                        className="flex items-center gap-1.5 px-3 py-2 txt-smaller font-display font-bold uppercase tracking-wide bg-[#22bb39]/10 text-[#22bb39] hover:bg-[#22bb39] hover:text-black transition-colors">
                        <IoCheckmarkCircle className="size-4" />
                        {t("approve")}
                      </button>
                    )}
                    {s.status !== "REJECTED" && (
                      <button
                        onClick={() => handleDecision(s.id, "REJECTED")}
                        className="flex items-center gap-1.5 px-3 py-2 txt-smaller font-display font-bold uppercase tracking-wide bg-red-400/10 text-red-400 hover:bg-red-400/20 transition-colors">
                        <IoCloseCircle className="size-4" />
                        {t("reject")}
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setEditingId(s.id);
                        setExpandedId(s.id);
                        setReachInput(
                          String(s.pendingReach ?? s.submittedReach),
                        );
                        setNotesInput(s.adminNotes ?? "");
                      }}
                      className="px-3 py-2 bg-[#171717] border border-[#272727] hover:border-[#444] text-white txt-smaller transition-colors">
                      {t("edit")}
                    </button>
                    <button
                      onClick={() =>
                        setExpandedId(expandedId === s.id ? null : s.id)
                      }
                      className="p-2 text-[#555] hover:text-white transition-colors">
                      {expandedId === s.id ? (
                        <IoChevronUp className="size-4" />
                      ) : (
                        <IoChevronDown className="size-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded detail */}
                {expandedId === s.id && (
                  <div className="border-t border-[#272727] p-5 space-y-4 bg-[#050505]">
                    <div>
                      <p className="txt-smaller text-[#555] mb-1">
                        {t("contentLink")}
                      </p>
                      <a
                        href={s.contentLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="txt-small text-[#6bd41a] hover:opacity-80 flex items-center gap-1.5 break-all">
                        {s.contentLink}
                        <IoOpenOutline className="size-3.5 shrink-0" />
                      </a>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="txt-smaller text-[#555] mb-2">
                          {t("contentTypes")}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {s.contentTypes.map((c) => (
                            <span
                              key={c}
                              className="txt-smaller px-2 py-0.5 bg-[#171717] border border-[#272727] text-[#ccccd0]">
                              {c.replace(/_/g, " ")}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="txt-smaller text-[#555] mb-2">
                          {t("monsterAppearance")}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {s.monsterAppearances.map((a) => (
                            <span
                              key={a}
                              className="txt-smaller px-2 py-0.5 bg-[#171717] border border-[#272727] text-[#ccccd0]">
                              {a.replace(/_/g, " ")}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {hasDelta && (
                      <div className="border border-[#bfec1d]/20 bg-[#bfec1d]/5 p-3 space-y-1">
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

                    {s.statsScreenshotUrl && (
                      <div>
                        <p className="txt-smaller text-[#555] mb-2">
                          {t("statsScreenshot")}
                        </p>
                        <div className="relative w-full max-w-xs h-40 border border-[#272727] overflow-hidden">
                          <Image
                            src={s.statsScreenshotUrl}
                            alt="stats"
                            fill
                            className="object-contain bg-[#0a0a0a] p-2"
                          />
                        </div>
                      </div>
                    )}

                    {editingId === s.id && (
                      <div className="border-t border-[#272727] pt-4 space-y-3">
                        <p className="txt-small font-display font-bold text-white uppercase tracking-wide">
                          {t("editSubmission")}
                        </p>
                        <div className="space-y-1">
                          <label className="txt-smaller text-[#ccccd0]">
                            {t("overrideReach")}{" "}
                            <span className="text-[#555]">
                              ({t("overrideReachHint")})
                            </span>
                          </label>
                          <input
                            type="number"
                            min="0"
                            value={reachInput}
                            onChange={(e) => setReachInput(e.target.value)}
                            className="xd-input"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="txt-smaller text-[#ccccd0]">
                            {t("notes")}
                          </label>
                          <textarea
                            value={notesInput}
                            onChange={(e) => setNotesInput(e.target.value)}
                            rows={2}
                            placeholder={t("notesPlaceholder")}
                            className="w-full px-4 py-3 bg-[#171717] border border-[#272727] text-white txt-small outline-none focus:border-[#6bd41a] resize-none placeholder:text-[#555] transition-colors"
                          />
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingId(null);
                              setReachInput("");
                              setNotesInput("");
                            }}
                            className="flex-1 py-2.5 bg-[#171717] border border-[#272727] hover:border-[#444] text-white txt-smaller transition-colors">
                            {t("cancel")}
                          </button>
                          <button
                            onClick={() => handleDecision(s.id, "APPROVED")}
                            disabled={saving}
                            className="flex-1 py-2.5 bg-[#6bd41a] hover:bg-[#7de020] text-black font-display font-bold uppercase txt-smaller tracking-wider transition-colors disabled:opacity-50">
                            {t("approve")}
                          </button>
                          <button
                            onClick={() => handleDecision(s.id, "REJECTED")}
                            disabled={saving}
                            className="flex-1 py-2.5 bg-red-400/10 hover:bg-red-400/20 text-red-400 font-display font-bold uppercase txt-smaller tracking-wider border border-red-400/20 transition-colors disabled:opacity-50">
                            {t("reject")}
                          </button>
                        </div>
                      </div>
                    )}

                    {s.adminNotes && editingId !== s.id && (
                      <p className="txt-smaller text-[#555] italic">
                        "{s.adminNotes}"
                      </p>
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
          <span className="txt-small text-[#ccccd0] font-proxima">
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-[#171717] border border-[#272727] text-white txt-small disabled:opacity-40 transition-colors hover:border-[#444]">
            →
          </button>
        </div>
      )}
    </div>
  );
}
