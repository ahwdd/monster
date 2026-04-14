// src/app/[locale]/admin/registrations/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter }           from "next/navigation";
import { useTranslations }     from "next-intl";
import { motion }              from "framer-motion";
import Image                   from "next/image";
import {
  IoCheckmarkCircle, IoCloseCircle,
  IoChevronDown, IoChevronUp, IoOpenOutline,
  IoRefreshOutline,
} from "react-icons/io5";
import { useAuth }  from "@/hooks/useAuth";
import { useToast } from "@/contexts/ToastContext";
import AdminSidebar from "@/components/admin/AdminSideBar";

type Registration = {
  id:              string;
  isApproved:      boolean;
  channelLogo:     string | null;
  platforms:       string[];
  contentType:     string;
  socialMediaLink: string;
  followers:       number;
  eventAttendance: string;
  whyJoin:         string;
  joinedAt:        string | null;
  user: { firstName: string; lastName: string; email: string | null; phone: string | null; phoneKey: string | null };
};

export default function AdminRegistrationsPage() {
  const t      = useTranslations("admin");
  const router = useRouter();
  const toast  = useToast();
  const { user, isAuthenticated, initializationComplete } = useAuth();

  const [items,       setItems]       = useState<Registration[]>([]);
  const [loading,     setLoading]     = useState(true);
  const [page,        setPage]        = useState(1);
  const [totalPages,  setTotalPages]  = useState(1);
  const [filter,      setFilter]      = useState<"all" | "pending" | "approved">("all");
  const [expandedId,  setExpandedId]  = useState<string | null>(null);
  const [saving,      setSaving]      = useState<string | null>(null); // id being saved

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
      const params = new URLSearchParams({
        page:  String(page),
        limit: "15",
        ...(filter !== "all" ? { isApproved: filter === "approved" ? "true" : "false" } : {}),
      });
      const res  = await fetch(`/api/admin/registrations?${params}`, { credentials: "include" });
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

  async function handleDecision(id: string, approve: boolean) {
    setSaving(id);
    try {
      const res  = await fetch(`/api/admin/registrations/${id}`, {
        method: "PATCH", credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isApproved: approve }),
      });
      const data = await res.json();
      if (data.success) {
        setItems((prev) => prev.map((r) => r.id === id ? { ...r, isApproved: approve } : r));
        toast.success(approve ? t("applicationApproved") : t("applicationRejected"));
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
      <div className="min-h-screen flex items-center justify-center bg-(--color-bg)">
        <div className="w-10 h-10 border-2 border-[#78be20] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-(--color-bg)">
      <AdminSidebar />

      <main className="flex-1 pt-20 px-6 pb-12 overflow-x-auto">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <h1 className="header-large font-display font-semibold text-white uppercase">
              {t("registrationsTitle")}
            </h1>
            <div className="flex gap-2 items-center">
              <button onClick={load}
                className="p-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl transition-colors">
                <IoRefreshOutline className="size-4" />
              </button>
              <div className="flex gap-1 bg-zinc-900 rounded-xl p-1">
                {(["all","pending","approved"] as const).map((f) => (
                  <button key={f} onClick={() => { setFilter(f); setPage(1); }}
                    className={`px-4 py-2 txt-smaller font-medium rounded-lg transition-colors duration-200 ${
                      filter === f ? "bg-[#78be20] text-black" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {t(f === "all" ? "all" : f === "pending" ? "pending" : "approved")}
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
            <div className="text-center py-20 text-zinc-500 txt-regular">{t("noRegistrations")}</div>
          ) : (
            <div className="space-y-3">
              {items.map((r, i) => (
                <motion.div key={r.id}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.025 }}
                  className="bg-[#0d0d0d] border border-zinc-800 rounded-2xl overflow-hidden"
                >
                  {/* Summary row */}
                  <div className="p-4 flex items-center gap-4 flex-wrap">
                    {/* Logo thumbnail */}
                    {r.channelLogo && (
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-zinc-700 shrink-0 bg-zinc-900">
                        <Image src={r.channelLogo} alt="" fill className="object-contain p-1" />
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="txt-small font-medium text-white">
                          {r.user.firstName} {r.user.lastName}
                        </span>
                        <span className="txt-smaller text-zinc-500">{r.user.email || `${r.user.phoneKey ?? ""}${r.user.phone}`}</span>
                        <span className={`txt-smaller px-2 py-0.5 rounded-sm ${
                          r.isApproved
                            ? "text-[#78be20] bg-[#78be20]/10"
                            : "text-yellow-400 bg-yellow-400/10"
                        }`}>
                          {r.isApproved ? t("approved") : t("pending")}
                        </span>
                      </div>
                      <div className="flex gap-3 txt-smaller text-zinc-500 flex-wrap">
                        <span>{r.contentType}</span>
                        <span>{r.followers.toLocaleString()} {t("followers")}</span>
                        <span className="flex gap-1 flex-wrap">
                          {r.platforms.map((p) => (
                            <span key={p} className="bg-zinc-800 px-1.5 py-0.5 rounded">{p}</span>
                          ))}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleDecision(r.id, !r.isApproved)}
                        disabled={saving === r.id}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg txt-smaller font-medium transition-colors duration-200 disabled:opacity-50 ${
                          r.isApproved
                            ? "bg-[#78be20]/10 text-[#78be20] hover:bg-red-500/10 hover:text-red-400"
                            : "bg-zinc-800 text-zinc-400 hover:bg-[#78be20]/10 hover:text-[#78be20]"
                        }`}
                      >
                        {saving === r.id
                          ? <div className="w-3.5 h-3.5 border border-current border-t-transparent rounded-full animate-spin" />
                          : r.isApproved
                            ? <><IoCheckmarkCircle className="size-4" />{t("approved")}</>
                            : <><IoCloseCircle    className="size-4" />{t("pending")}</>
                        }
                      </button>

                      <button onClick={() => setExpandedId(expandedId === r.id ? null : r.id)}
                        className="p-2 text-zinc-500 hover:text-white transition-colors">
                        {expandedId === r.id ? <IoChevronUp className="size-4" /> : <IoChevronDown className="size-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded details */}
                  {expandedId === r.id && (
                    <div className="border-t border-zinc-800 p-5 space-y-4 bg-zinc-900/20">
                      <div className="grid grid-cols-2 gap-4">

                        {/* Channel logo large */}
                        {r.channelLogo && (
                          <div>
                            <p className="txt-smaller text-zinc-500 mb-2">{t("channelLogo")}</p>
                            <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-zinc-700 bg-zinc-900">
                              <Image src={r.channelLogo} alt="" fill className="object-contain p-2" />
                            </div>
                          </div>
                        )}

                        {/* Social link */}
                        <div>
                          <p className="txt-smaller text-zinc-500 mb-1">{t("socialLink")}</p>
                          <a href={r.socialMediaLink} target="_blank" rel="noopener noreferrer"
                            className="txt-small text-[#78be20] hover:text-[#8fd428] flex items-center gap-1.5 break-all">
                            {r.socialMediaLink} <IoOpenOutline className="size-3.5 shrink-0" />
                          </a>
                        </div>

                        {/* Event attendance */}
                        <div>
                          <p className="txt-smaller text-zinc-500 mb-1">{t("eventAttendance")}</p>
                          <p className="txt-small text-white">{r.eventAttendance}</p>
                        </div>
                      </div>

                      {/* Why join */}
                      <div>
                        <p className="txt-smaller text-zinc-500 mb-1">{t("whyJoin")}</p>
                        <p className="txt-small text-zinc-300 leading-relaxed">{r.whyJoin}</p>
                      </div>

                      {/* Approve / Reject buttons at bottom of expanded */}
                      <div className="flex gap-3 pt-2 border-t border-zinc-800">
                        <button
                          onClick={() => handleDecision(r.id, true)}
                          disabled={r.isApproved || saving === r.id}
                          className="flex-1 py-2.5 bg-[#78be20] hover:bg-[#8fd428] text-black font-semibold txt-small rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          {t("approveApplication")}
                        </button>
                        <button
                          onClick={() => handleDecision(r.id, false)}
                          disabled={!r.isApproved || saving === r.id}
                          className="flex-1 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-semibold txt-small rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed border border-red-500/20"
                        >
                          {t("rejectApplication")}
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-8">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white txt-small rounded-lg disabled:opacity-40 transition-colors">←</button>
              <span className="txt-small text-zinc-400">{page} / {totalPages}</span>
              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white txt-small rounded-lg disabled:opacity-40 transition-colors">→</button>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}