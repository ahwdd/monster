// src/app/[locale]/admin/registrations/page.tsx
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
} from "react-icons/io5";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/contexts/ToastContext";

type PlatformLink = { platform: string; url: string };

type Registration = {
  id: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  realName: string;
  nickname: string;
  birthDate: string;
  nationality: string;
  residency: string;
  platforms: string[];
  platformLinks: PlatformLink[];
  primarySocialLink: string;
  channelLogo: string | null;
  contentType: string;
  followers: number;
  eventAttendance: string;
  discoverySources: string[];
  whyJoin: string | null;
  adminNotes: string | null;
  approvedAt: string | null;
  joinedAt: string;
  user: {
    firstName: string;
    lastName: string;
    email: string | null;
    phone: string | null;
    phoneKey: string | null;
  };
};

const STATUS_STYLE: Record<string, string> = {
  APPROVED: "text-[#78be20] bg-[#78be20]/10",
  PENDING: "text-yellow-400 bg-yellow-400/10",
  REJECTED: "text-red-400 bg-red-400/10",
};

export default function AdminRegistrationsPage() {
  const t = useTranslations("admin");
  const locale = useLocale();
  const router = useRouter();
  const toast = useToast();
  const { user, isAuthenticated, initializationComplete } = useAuth();

  const [items, setItems] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState<
    "all" | "PENDING" | "APPROVED" | "REJECTED"
  >("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [notesInput, setNotesInput] = useState("");
  const [saving, setSaving] = useState<string | null>(null);

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
      const res = await fetch(`/api/admin/registrations?${params}`, {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setItems(data.data);
        setTotalPages(data.pagination?.totalPages ?? 1);
      }
    } catch {
      toast.error(t("failedLoad"));
    } finally {
      setLoading(false);
    }
  }

  async function handleDecision(id: string, status: "APPROVED" | "REJECTED") {
    setSaving(id);
    try {
      const res = await fetch(`/api/admin/registrations/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, adminNotes: notesInput || undefined }),
      });
      const data = await res.json();
      if (data.success) {
        setItems((prev) =>
          prev.map((r) =>
            r.id === id
              ? { ...r, status, adminNotes: notesInput || r.adminNotes }
              : r,
          ),
        );
        toast.success(
          status === "APPROVED"
            ? t("applicationApproved")
            : t("applicationRejected"),
        );
        setNotesInput("");
        setExpandedId(null);
      } else {
        toast.error(t("failedUpdate"));
      }
    } catch {
      toast.error(t("failedUpdate"));
    } finally {
      setSaving(null);
    }
  }

  if (!initializationComplete || !user || user.role !== "ADMIN") {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-2 border-[#78be20] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="px-6 py-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="header-large font-display font-semibold text-white uppercase">
          {t("registrationsTitle")}
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
      ) : items.length === 0 ? (
        <div className="text-center py-20 text-zinc-500 txt-regular">
          {t("noRegistrations")}
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.025 }}
              className="bg-[#0d0d0d] border border-zinc-800 rounded-2xl overflow-hidden">
              {/* Summary */}
              <div className="p-4 flex items-center gap-4 flex-wrap">
                {r.channelLogo && (
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-zinc-700 shrink-0 bg-zinc-900">
                    <Image
                      src={r.channelLogo}
                      alt=""
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="txt-small font-medium text-white">
                      {r.nickname}
                    </span>
                    <span className="txt-smaller text-zinc-500">
                      {r.realName}
                    </span>
                    <span
                      className={`txt-smaller px-2 py-0.5 rounded-sm ${STATUS_STYLE[r.status]}`}>
                      {t(r.status.toLowerCase() as any)}
                    </span>
                  </div>
                  <div className="flex gap-3 txt-smaller text-zinc-500 flex-wrap">
                    <span>
                      {r.nationality} / {r.residency}
                    </span>
                    <span>
                      {r.followers.toLocaleString()} {t("followers")}
                    </span>
                    <span>{r.contentType}</span>
                    <span>
                      {new Date(r.joinedAt).toLocaleDateString(locale)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {r.status !== "APPROVED" && (
                    <button
                      onClick={() => handleDecision(r.id, "APPROVED")}
                      disabled={saving === r.id}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg txt-smaller font-medium
                        bg-[#78be20]/10 text-[#78be20] hover:bg-[#78be20] hover:text-black
                        transition-colors disabled:opacity-50">
                      <IoCheckmarkCircle className="size-4" />
                      {t("approve")}
                    </button>
                  )}
                  {r.status !== "REJECTED" && (
                    <button
                      onClick={() => handleDecision(r.id, "REJECTED")}
                      disabled={saving === r.id}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg txt-smaller font-medium
                        bg-red-500/10 text-red-400 hover:bg-red-500/20
                        transition-colors disabled:opacity-50">
                      <IoCloseCircle className="size-4" />
                      {t("reject")}
                    </button>
                  )}
                  <button
                    onClick={() =>
                      setExpandedId(expandedId === r.id ? null : r.id)
                    }
                    className="p-2 text-zinc-500 hover:text-white transition-colors">
                    {expandedId === r.id ? (
                      <IoChevronUp className="size-4" />
                    ) : (
                      <IoChevronDown className="size-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Expanded */}
              {expandedId === r.id && (
                <div className="border-t border-zinc-800 p-5 space-y-4 bg-zinc-900/20">
                  <div className="grid grid-cols-2 gap-4">
                    {r.channelLogo && (
                      <div>
                        <p className="txt-smaller text-zinc-500 mb-2">
                          {t("channelLogo")}
                        </p>
                        <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-zinc-700 bg-zinc-900">
                          <Image
                            src={r.channelLogo}
                            alt=""
                            fill
                            className="object-contain p-2"
                          />
                        </div>
                      </div>
                    )}
                    <div>
                      <p className="txt-smaller text-zinc-500 mb-1">
                        {t("birthDate")}
                      </p>
                      <p className="txt-small text-white">{r.birthDate}</p>
                      {r.approvedAt && (
                        <p className="txt-smaller text-zinc-600 mt-1">
                          Approved:{" "}
                          {new Date(r.approvedAt).toLocaleDateString(locale)}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Platform links */}
                  <div>
                    <p className="txt-smaller text-zinc-500 mb-2">
                      {t("platforms")}
                    </p>
                    <div className="space-y-1.5">
                      {(r.platformLinks ?? []).map((pl) => (
                        <div
                          key={pl.platform}
                          className="flex items-center gap-3">
                          <span className="txt-smaller text-zinc-400 w-20 shrink-0">
                            {pl.platform}
                          </span>
                          <a
                            href={pl.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="txt-smaller text-[#78be20] hover:text-[#8fd428] flex items-center gap-1 truncate">
                            <span className="truncate">{pl.url}</span>
                            <IoOpenOutline className="size-3 shrink-0" />
                          </a>
                          {pl.url === r.primarySocialLink && (
                            <span className="txt-smaller text-zinc-500 border border-zinc-700 px-1.5 py-0.5 rounded shrink-0">
                              primary
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Event + discovery */}
                  <div>
                    <p className="txt-smaller text-zinc-500 mb-2">
                      {t("eventAttendance")}:{" "}
                      <span className="text-white">{r.eventAttendance}</span>
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {r.discoverySources.map((ds) => (
                        <span
                          key={ds}
                          className="txt-smaller px-2 py-0.5 bg-zinc-800 rounded text-zinc-300">
                          {ds.replace(/_/g, " ")}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Why join */}
                  {r.whyJoin && (
                    <div>
                      <p className="txt-smaller text-zinc-500 mb-1">
                        {t("whyJoin")}
                      </p>
                      <p className="txt-small text-zinc-300 leading-relaxed">
                        {r.whyJoin}
                      </p>
                    </div>
                  )}

                  {/* Notes + approve/reject */}
                  <div className="border-t border-zinc-700 pt-4 space-y-3">
                    <div className="space-y-1">
                      <label className="txt-smaller text-zinc-500">
                        {t("notes")}
                      </label>
                      <textarea
                        value={notesInput}
                        onChange={(e) => setNotesInput(e.target.value)}
                        rows={2}
                        defaultValue={r.adminNotes ?? ""}
                        placeholder={t("notesPlaceholder")}
                        className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-lg text-white
                          txt-small outline-none focus:border-[#78be20] resize-none
                          placeholder:text-zinc-600 transition-colors"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleDecision(r.id, "APPROVED")}
                        disabled={r.status === "APPROVED" || saving === r.id}
                        className="flex-1 py-2.5 bg-[#78be20] hover:bg-[#8fd428] text-black font-semibold
                          txt-small rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                        {t("approveApplication")}
                      </button>
                      <button
                        onClick={() => handleDecision(r.id, "REJECTED")}
                        disabled={r.status === "REJECTED" || saving === r.id}
                        className="flex-1 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400
                          font-semibold txt-small rounded-xl border border-red-500/20
                          transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                        {t("rejectApplication")}
                      </button>
                    </div>
                  </div>

                  {r.adminNotes && (
                    <p className="txt-smaller text-zinc-500 italic">
                      Note: &ldquo;{r.adminNotes}&rdquo;
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          ))}
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
