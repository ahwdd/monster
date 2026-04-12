// src/app/[locale]/admin/submissions/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter }           from "next/navigation";
import { useLocale, useTranslations }     from "next-intl";
import { motion }              from "framer-motion";
import { IoAddOutline, IoCheckmarkCircleOutline, IoCloseCircleOutline } from "react-icons/io5";
import { useAuth } from "@/hooks/useAuth";

type Submission = {
  id:                 string;
  userId:             string;
  platform:           string;
  contentLink:        string;
  contentTypes:       string[];
  monsterAppearances: string[];
  totalReach:         number;
  totalViews:         number;
  pointsAwarded:      number;
  rank:               string;
  isApproved:         boolean;
  adminNotes:         string | null;
  createdAt:          string;
  user: { firstName: string; lastName: string; email: string | null; phone: string | null };
};

export default function AdminSubmissionsPage() {
  const t      = useTranslations("admin");
  const router = useRouter();
  const locale = useLocale();
  const { user, isAuthenticated, initializationComplete } = useAuth();

  const [submissions, setSubmissions]   = useState<Submission[]>([]);
  const [loading,     setLoading]       = useState(true);
  const [page,        setPage]          = useState(1);
  const [totalPages,  setTotalPages]    = useState(1);

  useEffect(() => {
    if (!initializationComplete) return;
    if (!isAuthenticated || user?.role !== "ADMIN") {
      router.replace(`/${locale}`);
    }
  }, [initializationComplete, isAuthenticated, user, router]);

  useEffect(() => {
    if (!user || user.role !== "ADMIN") return;
    setLoading(true);
    fetch(`/api/admin/submissions?page=${page}&limit=20`, { credentials: "include" })
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setSubmissions(d.data);
          setTotalPages(d.pagination?.totalPages ?? 1);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user, page]);

  async function toggleApproval(id: string, current: boolean) {
    await fetch(`/api/admin/submissions/${id}`, {
      method: "PATCH", credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isApproved: !current }),
    });
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isApproved: !current } : s))
    );
  }

  if (!initializationComplete || !user || user.role !== "ADMIN") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-(--color-bg)">
        <div className="w-10 h-10 border-2 border-[#78be20] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-(--color-bg) pt-20 px-4 pb-12">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="header-large font-display font-semibold text-white uppercase">{t("submissionsTitle")}</h1>
          <button
            onClick={() => router.push("/admin/submissions/new")}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#78be20] hover:bg-[#8fd428] text-black font-display font-semibold txt-small uppercase rounded-lg transition-colors duration-200"
          >
            <IoAddOutline className="size-5" />
            {t("addSubmission")}
          </button>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-2 border-[#78be20] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : submissions.length === 0 ? (
          <div className="text-center py-20 text-zinc-500 txt-regular">{t("noSubmissions")}</div>
        ) : (
          <div className="space-y-3">
            {submissions.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="bg-[#0d0d0d] border border-zinc-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                {/* Creator */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="txt-small font-medium text-white">
                      {s.user.firstName} {s.user.lastName}
                    </span>
                    <span className="txt-smaller text-zinc-500">
                      {s.user.email || s.user.phone}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="txt-smaller font-medium uppercase text-[#78be20] bg-[#78be20]/10 px-2 py-0.5 rounded-sm">{s.platform}</span>
                    <span className="txt-smaller text-zinc-500">{s.rank.replace(/_/g, " ")}</span>
                    <a href={s.contentLink} target="_blank" rel="noopener noreferrer"
                      className="txt-smaller text-zinc-400 hover:text-white transition-colors truncate max-w-xs">
                      {s.contentLink}
                    </a>
                  </div>
                  <div className="flex gap-4 mt-1.5 txt-smaller text-zinc-500">
                    <span>{s.totalViews.toLocaleString()} views</span>
                    <span>{s.totalReach.toLocaleString()} reach</span>
                    <span className="text-[#78be20] font-medium">+{s.pointsAwarded} pts</span>
                  </div>
                </div>

                {/* Approval toggle */}
                <button
                  onClick={() => toggleApproval(s.id, s.isApproved)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg txt-small font-medium transition-colors duration-200 shrink-0 ${
                    s.isApproved
                      ? "bg-[#78be20]/10 text-[#78be20] hover:bg-red-500/10 hover:text-red-400"
                      : "bg-zinc-800 text-zinc-400 hover:bg-[#78be20]/10 hover:text-[#78be20]"
                  }`}
                >
                  {s.isApproved
                    ? <><IoCheckmarkCircleOutline className="size-4" /> {t("approved")}</>
                    : <><IoCloseCircleOutline className="size-4" /> {t("pending")}</>
                  }
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-8">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white txt-small rounded-lg disabled:opacity-40 transition-colors duration-200">
              ←
            </button>
            <span className="txt-small text-zinc-400">{page} / {totalPages}</span>
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white txt-small rounded-lg disabled:opacity-40 transition-colors duration-200">
              →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}