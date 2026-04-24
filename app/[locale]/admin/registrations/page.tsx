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
import Skeleton from "@/components/Skeleton";

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

const EASE = [0.22, 1, 0.36, 1] as const;

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
    <div className="px-6 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="font-display font-black text-white uppercase header-large">
          {t("registrationsTitle")}
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

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-20" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 text-[#555] font-proxima txt-regular">
          {t("noRegistrations")}
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02, ease: EASE }}
              className="bg-[#0a0a0a] border border-[#272727] overflow-hidden">
              <div className="p-4 flex items-center gap-4 flex-wrap">
                {r.channelLogo && (
                  <div className="relative w-10 h-10 border border-[#272727] shrink-0 bg-[#171717]">
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
                    <span className="font-display font-bold text-white txt-small">
                      {r.nickname}
                    </span>
                    <span className="txt-smaller text-[#555]">
                      {r.realName}
                    </span>
                    <span
                      className={`txt-smaller px-2 py-0.5 ${STATUS_STYLE[r.status]}`}>
                      {t(r.status.toLowerCase() as any)}
                    </span>
                  </div>
                  <div className="flex gap-3 txt-smaller text-[#555] flex-wrap">
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
                      className="flex items-center gap-1.5 px-3 py-2 txt-smaller font-display font-bold uppercase tracking-wide bg-[#22bb39]/10 text-[#22bb39] hover:bg-[#22bb39] hover:text-black transition-colors disabled:opacity-50">
                      <IoCheckmarkCircle className="size-4" />
                      {t("approve")}
                    </button>
                  )}
                  {r.status !== "REJECTED" && (
                    <button
                      onClick={() => handleDecision(r.id, "REJECTED")}
                      disabled={saving === r.id}
                      className="flex items-center gap-1.5 px-3 py-2 txt-smaller font-display font-bold uppercase tracking-wide bg-red-400/10 text-red-400 hover:bg-red-400/20 transition-colors disabled:opacity-50">
                      <IoCloseCircle className="size-4" />
                      {t("reject")}
                    </button>
                  )}
                  <button
                    onClick={() =>
                      setExpandedId(expandedId === r.id ? null : r.id)
                    }
                    className="p-2 text-[#555] hover:text-white transition-colors">
                    {expandedId === r.id ? (
                      <IoChevronUp className="size-4" />
                    ) : (
                      <IoChevronDown className="size-4" />
                    )}
                  </button>
                </div>
              </div>

              {expandedId === r.id && (
                <div className="border-t border-[#272727] p-5 space-y-4 bg-[#050505]">
                  <div className="grid grid-cols-2 gap-4">
                    {r.channelLogo && (
                      <div>
                        <p className="txt-smaller text-[#555] mb-2">
                          {t("channelLogo")}
                        </p>
                        <div className="relative w-24 h-24 border border-[#272727] bg-[#171717]">
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
                      <p className="txt-smaller text-[#555] mb-1">
                        {t("birthDate")}
                      </p>
                      <p className="txt-small text-white">{r.birthDate}</p>
                      {r.approvedAt && (
                        <p className="txt-smaller text-[#555] mt-1">
                          Approved:{" "}
                          {new Date(r.approvedAt).toLocaleDateString(locale)}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="txt-smaller text-[#555] mb-2">
                      {t("platforms")}
                    </p>
                    <div className="space-y-1.5">
                      {(r.platformLinks ?? []).map((pl) => (
                        <div
                          key={pl.platform}
                          className="flex items-center gap-3">
                          <span className="txt-smaller text-[#ccccd0] w-20 shrink-0">
                            {pl.platform}
                          </span>
                          <a
                            href={pl.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="txt-smaller text-[#6bd41a] hover:opacity-80 flex items-center gap-1 truncate">
                            <span className="truncate">{pl.url}</span>
                            <IoOpenOutline className="size-3 shrink-0" />
                          </a>
                          {pl.url === r.primarySocialLink && (
                            <span className="txt-smaller text-[#555] border border-[#272727] px-1.5 py-0.5 shrink-0">
                              primary
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="txt-smaller text-[#555] mb-2">
                      {t("eventAttendance")}:{" "}
                      <span className="text-white">{r.eventAttendance}</span>
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {r.discoverySources.map((ds) => (
                        <span
                          key={ds}
                          className="txt-smaller px-2 py-0.5 bg-[#171717] border border-[#272727] text-[#ccccd0]">
                          {ds.replace(/_/g, " ")}
                        </span>
                      ))}
                    </div>
                  </div>

                  {r.whyJoin && (
                    <div>
                      <p className="txt-smaller text-[#555] mb-1">
                        {t("whyJoin")}
                      </p>
                      <p className="txt-small text-[#ccccd0] leading-relaxed">
                        {r.whyJoin}
                      </p>
                    </div>
                  )}

                  <div className="border-t border-[#272727] pt-4 space-y-3">
                    <div className="space-y-1">
                      <label className="txt-smaller text-[#ccccd0]">
                        {t("notes")}
                      </label>
                      <textarea
                        value={notesInput}
                        onChange={(e) => setNotesInput(e.target.value)}
                        rows={2}
                        defaultValue={r.adminNotes ?? ""}
                        placeholder={t("notesPlaceholder")}
                        className="w-full px-4 py-3 bg-[#171717] border border-[#272727] text-white txt-small outline-none focus:border-[#6bd41a] resize-none placeholder:text-[#555] transition-colors"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleDecision(r.id, "APPROVED")}
                        disabled={r.status === "APPROVED" || saving === r.id}
                        className="flex-1 py-2.5 bg-[#6bd41a] hover:bg-[#7de020] text-black font-display font-bold uppercase txt-smaller tracking-wider transition-colors disabled:opacity-40">
                        {t("approveApplication")}
                      </button>
                      <button
                        onClick={() => handleDecision(r.id, "REJECTED")}
                        disabled={r.status === "REJECTED" || saving === r.id}
                        className="flex-1 py-2.5 bg-red-400/10 hover:bg-red-400/20 text-red-400 font-display font-bold uppercase txt-smaller tracking-wider border border-red-400/20 transition-colors disabled:opacity-40">
                        {t("rejectApplication")}
                      </button>
                    </div>
                  </div>

                  {r.adminNotes && (
                    <p className="txt-smaller text-[#555] italic">
                      Note: "{r.adminNotes}"
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-[#171717] border border-[#272727] text-white txt-small disabled:opacity-40 hover:border-[#444] transition-colors">
            ←
          </button>
          <span className="txt-small text-[#ccccd0] font-proxima">
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-[#171717] border border-[#272727] text-white txt-small disabled:opacity-40 hover:border-[#444] transition-colors">
            →
          </button>
        </div>
      )}
    </div>
  );
}
