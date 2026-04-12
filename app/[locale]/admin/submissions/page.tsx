// src/app/[locale]/admin/submissions/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter }           from "next/navigation";
import { useLocale }           from "next-intl";
import { motion }              from "framer-motion";
import {
  IoCheckmarkCircle, IoCloseCircle,
  IoChevronDown, IoChevronUp, IoOpenOutline,
  IoRefreshOutline,
} from "react-icons/io5";
import Image        from "next/image";
import { useAuth }  from "@/hooks/useAuth";
import { useToast } from "@/contexts/ToastContext";

const RANKS = [
  "UNRANKED","ROOKIE_MONSTER","RISING_MONSTER",
  "ELITE_MONSTER","MEGA_MONSTER","COLD_MONSTER",
] as const;
type Rank = typeof RANKS[number];

type Submission = {
  id: string; platform: string; contentLink: string;
  contentTypes: string[]; monsterAppearances: string[];
  totalViews: number; totalReach: number;
  pointsAwarded: number; rank: Rank;
  isApproved: boolean; adminNotes: string | null;
  statsScreenshotUrl: string | null;
  createdAt: string;
  user: { firstName: string; lastName: string; email: string | null; phone: string | null };
};

export default function AdminSubmissionsPage() {
  const locale = useLocale();
  const isAr   = locale === "ar";
  const router = useRouter();
  const toast  = useToast();
  const { user, isAuthenticated, initializationComplete } = useAuth();

  const [submissions,  setSubmissions]  = useState<Submission[]>([]);
  const [loading,      setLoading]      = useState(true);
  const [page,         setPage]         = useState(1);
  const [totalPages,   setTotalPages]   = useState(1);
  const [filter,       setFilter]       = useState<"all" | "pending" | "approved">("all");
  const [expandedId,   setExpandedId]   = useState<string | null>(null);
  const [editingId,    setEditingId]    = useState<string | null>(null);

  // Edit state — pointsInput is string so empty string = "recalculate"
  const [rankInput,    setRankInput]    = useState<Rank>("UNRANKED");
  const [pointsInput,  setPointsInput]  = useState<string>("");   // "" = auto
  const [origPoints,   setOrigPoints]   = useState<number>(0);    // original value for dirty check
  const [notesInput,   setNotesInput]   = useState<string>("");
  const [saving,       setSaving]       = useState(false);

  useEffect(() => {
    if (!initializationComplete) return;
    if (!isAuthenticated || user?.role !== "ADMIN") router.replace("/");
  }, [initializationComplete, isAuthenticated, user, router]);

  useEffect(() => {
    if (!user || user.role !== "ADMIN") return;
    loadSubmissions();
  }, [user, page, filter]);

  async function loadSubmissions() {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page:  String(page),
        limit: "15",
        ...(filter !== "all" ? { isApproved: filter === "approved" ? "true" : "false" } : {}),
      });
      const res  = await fetch(`/api/admin/submissions?${params}`, { credentials: "include" });
      const data = await res.json();
      if (data.success) {
        setSubmissions(data.data);
        setTotalPages(data.pagination?.totalPages ?? 1);
      }
    } catch {
      toast.error("Failed to load");
    } finally {
      setLoading(false);
    }
  }

  async function handleApproval(id: string, approve: boolean) {
    try {
      const res  = await fetch(`/api/admin/submissions/${id}`, {
        method: "PATCH", credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isApproved: approve }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmissions((prev) => prev.map((s) =>
          s.id === id ? { ...s, isApproved: approve, pointsAwarded: data.data.pointsAwarded } : s
        ));
        toast.success(approve
          ? (isAr ? "تم القبول ✓" : "Approved ✓")
          : (isAr ? "تم الرفض" : "Rejected")
        );
      }
    } catch {
      toast.error("Failed to update");
    }
  }

  async function handleSaveEdit(id: string) {
    setSaving(true);
    try {
      // Build payload — only send pointsOverride if admin explicitly changed it
      const payload: Record<string, any> = {
        rank:       rankInput,
        adminNotes: notesInput || undefined,
      };

      if (pointsInput === "") {
        // Empty = admin cleared the field → recalculate from rank
        payload.pointsOverride = null;
      } else {
        const parsed = parseInt(pointsInput, 10);
        if (!isNaN(parsed) && parsed !== origPoints) {
          // Admin typed a different number → use as override
          payload.pointsOverride = parsed;
        }
        // If parsed === origPoints (unchanged) → don't send pointsOverride at all
        // The API will recalculate if rank changed, or keep existing if rank also unchanged
      }

      const res  = await fetch(`/api/admin/submissions/${id}`, {
        method: "PATCH", credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success) {
        setSubmissions((prev) => prev.map((s) =>
          s.id === id ? { ...s, ...data.data } : s
        ));
        toast.success(isAr ? "تم الحفظ ✓" : "Saved ✓");
        setEditingId(null);
      } else {
        toast.error(data.error || "Failed to save");
      }
    } catch {
      toast.error("Failed to save");
    } finally {
      setSaving(false);
    }
  }

  function openEdit(s: Submission) {
    setEditingId(s.id);
    setRankInput(s.rank);
    setPointsInput(String(s.pointsAwarded)); // show current, but track original for dirty check
    setOrigPoints(s.pointsAwarded);
    setNotesInput(s.adminNotes ?? "");
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
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <h1 className="header-large font-display font-semibold text-white uppercase">
            {isAr ? "المشاركات" : "Submissions"}
          </h1>
          <div className="flex gap-2 items-center">
            <button onClick={loadSubmissions}
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
                  {f === "all"      ? (isAr ? "الكل"          : "All")
                   : f === "pending" ? (isAr ? "قيد المراجعة"  : "Pending")
                   :                   (isAr ? "مقبول"          : "Approved")}
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
            {isAr ? "لا توجد مشاركات" : "No submissions found"}
          </div>
        ) : (
          <div className="space-y-3">
            {submissions.map((s, i) => (
              <motion.div key={s.id}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.025 }}
                className="bg-[#0d0d0d] border border-zinc-800 rounded-2xl overflow-hidden"
              >
                {/* Summary row */}
                <div className="p-4 flex items-center gap-4 flex-wrap">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="txt-small font-medium text-white">
                        {s.user.firstName} {s.user.lastName}
                      </span>
                      <span className="txt-smaller text-zinc-500">{s.user.email || s.user.phone}</span>
                      <span className="txt-smaller uppercase text-[#78be20] bg-[#78be20]/10 px-2 py-0.5 rounded-sm">{s.platform}</span>
                      <span className="txt-smaller text-zinc-400 uppercase">{s.rank.replace(/_/g, " ")}</span>
                    </div>
                    <div className="flex gap-4 txt-smaller text-zinc-500 flex-wrap">
                      <span>{s.totalViews.toLocaleString()} {isAr ? "مشاهدة" : "views"}</span>
                      <span>{s.totalReach.toLocaleString()} {isAr ? "وصول" : "reach"}</span>
                      <span className="text-[#78be20] font-semibold">+{s.pointsAwarded} pts</span>
                      <span>{new Date(s.createdAt).toLocaleDateString(locale)}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0 flex-wrap">
                    <button onClick={() => handleApproval(s.id, !s.isApproved)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg txt-smaller font-medium transition-colors duration-200 ${
                        s.isApproved
                          ? "bg-[#78be20]/10 text-[#78be20] hover:bg-red-500/10 hover:text-red-400"
                          : "bg-zinc-800 text-zinc-400 hover:bg-[#78be20]/10 hover:text-[#78be20]"
                      }`}
                    >
                      {s.isApproved
                        ? <><IoCheckmarkCircle className="size-4" />{isAr ? "مقبول" : "Approved"}</>
                        : <><IoCloseCircle    className="size-4" />{isAr ? "معلّق" : "Pending"}</>
                      }
                    </button>

                    <button onClick={() => {
                        openEdit(s);
                        setExpandedId(expandedId === s.id ? expandedId : s.id);
                      }}
                      className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-white txt-smaller rounded-lg transition-colors">
                      {isAr ? "تعديل" : "Edit"}
                    </button>

                    <button onClick={() => setExpandedId(expandedId === s.id ? null : s.id)}
                      className="p-2 text-zinc-500 hover:text-white transition-colors">
                      {expandedId === s.id ? <IoChevronUp className="size-4" /> : <IoChevronDown className="size-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded */}
                {expandedId === s.id && (
                  <div className="border-t border-zinc-800 p-4 space-y-4 bg-zinc-900/20">

                    {/* Link */}
                    <div>
                      <p className="txt-smaller text-zinc-500 mb-1">{isAr ? "رابط المحتوى" : "Content Link"}</p>
                      <a href={s.contentLink} target="_blank" rel="noopener noreferrer"
                        className="txt-small text-[#78be20] hover:text-[#8fd428] flex items-center gap-1.5 break-all">
                        {s.contentLink} <IoOpenOutline className="size-3.5 shrink-0" />
                      </a>
                    </div>

                    {/* Types + appearances */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="txt-smaller text-zinc-500 mb-2">{isAr ? "نوع المحتوى" : "Content Types"}</p>
                        <div className="flex flex-wrap gap-1">
                          {s.contentTypes.map((c) => (
                            <span key={c} className="txt-smaller px-2 py-0.5 bg-zinc-800 rounded text-zinc-300">{c}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="txt-smaller text-zinc-500 mb-2">{isAr ? "ظهور مونستر" : "Monster Appearance"}</p>
                        <div className="flex flex-wrap gap-1">
                          {s.monsterAppearances.map((a) => (
                            <span key={a} className="txt-smaller px-2 py-0.5 bg-zinc-800 rounded text-zinc-300">{a.replace(/_/g, " ")}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Screenshot */}
                    {s.statsScreenshotUrl && (
                      <div>
                        <p className="txt-smaller text-zinc-500 mb-2">{isAr ? "صورة الإحصائيات" : "Stats Screenshot"}</p>
                        <div className="relative w-full max-w-xs h-40 rounded-xl overflow-hidden border border-zinc-700">
                          <Image src={s.statsScreenshotUrl} alt="stats" fill className="object-contain bg-zinc-900 p-2" />
                        </div>
                      </div>
                    )}

                    {/* Edit panel */}
                    {editingId === s.id && (
                      <div className="border-t border-zinc-700 pt-4 space-y-3">
                        <p className="txt-small font-semibold text-white">
                          {isAr ? "تعديل البيانات" : "Edit Submission"}
                        </p>

                        <div className="grid grid-cols-2 gap-3">
                          {/* Rank */}
                          {/* <div className="space-y-1">
                            <label className="txt-smaller text-zinc-500">{isAr ? "التصنيف" : "Rank"}</label>
                            <select value={rankInput} onChange={(e) => setRankInput(e.target.value as Rank)}
                              className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-lg text-white txt-small outline-none focus:border-[#78be20] transition-colors">
                              {RANKS.map((r) => (
                                <option key={r} value={r}>{r.replace(/_/g, " ")}</option>
                              ))}
                            </select>
                          </div> */}

                          {/* Points */}
                          <div className="space-y-1">
                            <label className="txt-smaller text-zinc-500 flex items-center gap-1">
                              {isAr ? "النقاط" : "Points"}
                              <span className="text-zinc-600 txt-smaller">
                                ({isAr ? "فارغ = تلقائي" : "empty = auto"})
                              </span>
                            </label>
                            <div className="flex gap-1.5">
                              <input
                                type="number" min="0"
                                value={pointsInput}
                                onChange={(e) => setPointsInput(e.target.value)}
                                placeholder={isAr ? "تلقائي من التصنيف" : "Auto from rank"}
                                className="flex-1 px-3 py-2 bg-black border border-zinc-700 rounded-lg text-white txt-small outline-none focus:border-[#78be20] placeholder:text-zinc-600 transition-colors"
                              />
                              {/* Clear button — sets to empty (auto) */}
                              {pointsInput !== "" && (
                                <button type="button" onClick={() => setPointsInput("")}
                                  title={isAr ? "حذف والحساب تلقائياً" : "Clear, recalculate"}
                                  className="px-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-lg transition-colors txt-smaller">
                                  ×
                                </button>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Notes */}
                        <div className="space-y-1">
                          <label className="txt-smaller text-zinc-500">{isAr ? "ملاحظات الإدارة" : "Admin Notes"}</label>
                          <textarea value={notesInput} onChange={(e) => setNotesInput(e.target.value)}
                            rows={2}
                            className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-lg text-white txt-small outline-none focus:border-[#78be20] resize-none placeholder:text-zinc-600 transition-colors"
                            placeholder={isAr ? "اختياري..." : "Optional..."} />
                        </div>

                        {/* Hint */}
                        <p className="txt-smaller text-zinc-600">
                          {isAr
                            ? "تغيير التصنيف فقط سيعيد حساب النقاط تلقائياً. إذا أدخلت قيمة للنقاط، ستُستخدم مباشرةً."
                            : "Changing rank alone recalculates points automatically. Entering a points value uses it directly."
                          }
                        </p>

                        <div className="flex gap-2">
                          <button onClick={() => { setEditingId(null); }}
                            className="flex-1 py-2 bg-zinc-800 hover:bg-zinc-700 text-white txt-smaller rounded-lg transition-colors">
                            {isAr ? "إلغاء" : "Cancel"}
                          </button>
                          <button onClick={() => handleSaveEdit(s.id)} disabled={saving}
                            className="flex-1 py-2 bg-[#78be20] hover:bg-[#8fd428] text-black txt-smaller font-semibold rounded-lg transition-colors disabled:opacity-50">
                            {saving ? "..." : (isAr ? "حفظ" : "Save")}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Show notes read-only when not editing */}
                    {s.adminNotes && editingId !== s.id && (
                      <div>
                        <p className="txt-smaller text-zinc-500 mb-1">{isAr ? "ملاحظات" : "Notes"}</p>
                        <p className="txt-small text-zinc-300">{s.adminNotes}</p>
                      </div>
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
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white txt-small rounded-lg disabled:opacity-40 transition-colors">←</button>
            <span className="txt-small text-zinc-400">{page} / {totalPages}</span>
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white txt-small rounded-lg disabled:opacity-40 transition-colors">→</button>
          </div>
        )}
      </div>
    </div>
  );
}