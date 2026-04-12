// src/app/[locale]/submissions/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter }           from "next/navigation";
import { useLocale }           from "next-intl";
import Link                    from "next/link";
import { motion }              from "framer-motion";
import {
  IoAddCircleOutline, IoOpenOutline,
  IoWarningOutline, IoCheckmarkCircle, IoTimeOutline,
} from "react-icons/io5";
import AuthShell from "@/components/auth/AuthShell";
import { useAuth } from "@/hooks/useAuth";

const PENDING_CAP = 5;

type Submission = {
  id: string; platform: string; contentLink: string;
  contentTypes: string[]; totalViews: number; totalReach: number;
  pointsAwarded: number; isApproved: boolean; createdAt: string;
};

export default function SubmissionsPage() {
  const locale = useLocale();
  const isAr   = locale === "ar";
  const router = useRouter();
  const { user, isAuthenticated, initializationComplete } = useAuth();

  const [submissions,  setSubmissions]  = useState<Submission[]>([]);
  const [loading,      setLoading]      = useState(true);
  const [pendingCount, setPendingCount] = useState(0);
  const [canSubmit,    setCanSubmit]    = useState(true);

  useEffect(() => {
    if (initializationComplete && !isAuthenticated) router.push("/auth/signin");
  }, [initializationComplete, isAuthenticated, router]);

  useEffect(() => {
    if (!user) return;
    fetch("/api/submissions", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setSubmissions(d.data);
          setPendingCount(d.pendingCount ?? 0);
          setCanSubmit(d.canSubmit ?? true);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user]);

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
            {isAr ? "مشاركاتي" : "My Submissions"}
          </h1>
          {canSubmit ? (
            <Link href="/submissions/submit"
              className="flex items-center gap-2 px-4 py-2.5 bg-[#78be20] hover:bg-[#8fd428] text-black font-display font-semibold txt-small uppercase rounded-xl transition-colors duration-200">
              <IoAddCircleOutline className="size-4" />
              {isAr ? "إضافة" : "New"}
            </Link>
          ) : (
            <div className="flex items-center gap-1.5 px-4 py-2.5 bg-zinc-800 text-zinc-500 txt-small rounded-xl cursor-not-allowed">
              <IoWarningOutline className="size-4 text-yellow-500" />
              {isAr ? `${pendingCount}/${PENDING_CAP} معلّق` : `${pendingCount}/${PENDING_CAP} pending`}
            </div>
          )}
        </div>

        {/* Pending cap warning banner */}
        {!canSubmit && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            className="bg-yellow-400/5 border border-yellow-400/30 rounded-2xl p-4 flex items-start gap-3 mb-5"
          >
            <IoWarningOutline className="size-5 text-yellow-400 shrink-0 mt-0.5" />
            <div>
              <p className="txt-small font-semibold text-yellow-400">
                {isAr ? "لا يمكنك إضافة مشاركات جديدة حالياً" : "New submissions temporarily blocked"}
              </p>
              <p className="txt-smaller text-zinc-400 mt-0.5">
                {isAr
                  ? `لديك ${pendingCount} مشاركات قيد المراجعة (الحد الأقصى ${PENDING_CAP}). سيُفتح إمكانية الإضافة بمجرد مراجعة بعضها.`
                  : `You have ${pendingCount}/${PENDING_CAP} pending submissions. You can add more once some are reviewed.`
                }
              </p>
            </div>
          </motion.div>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#78be20] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : submissions.length === 0 ? (
          <div className="bg-[#0d0d0d] border border-zinc-800 rounded-2xl p-12 text-center space-y-4">
            <p className="txt-regular text-zinc-500">{isAr ? "لا توجد مشاركات بعد." : "No submissions yet."}</p>
            {canSubmit && (
              <Link href="/submissions/submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#78be20] hover:bg-[#8fd428] text-black font-display font-semibold txt-small uppercase rounded-xl transition-colors duration-200">
                <IoAddCircleOutline className="size-4" />
                {isAr ? "أضف أول مشاركة" : "Add your first submission"}
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {submissions.map((s, i) => (
              <motion.div key={s.id}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="bg-[#0d0d0d] border border-zinc-800 rounded-2xl p-4 flex items-start justify-between gap-4"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1.5">
                    <span className="txt-smaller font-medium uppercase text-[#78be20] bg-[#78be20]/10 px-2 py-0.5 rounded-sm">
                      {s.platform}
                    </span>
                    <span className={`txt-smaller px-2 py-0.5 rounded-sm flex items-center gap-1 ${
                      s.isApproved ? "text-[#78be20] bg-[#78be20]/10" : "text-yellow-400 bg-yellow-400/10"
                    }`}>
                      {s.isApproved
                        ? <><IoCheckmarkCircle className="size-3" />{isAr ? "معتمد" : "Approved"}</>
                        : <><IoTimeOutline className="size-3" />{isAr ? "قيد المراجعة" : "Pending"}</>
                      }
                    </span>
                    <span className="txt-smaller text-zinc-500">
                      {new Date(s.createdAt).toLocaleDateString(locale)}
                    </span>
                  </div>
                  <a href={s.contentLink} target="_blank" rel="noopener noreferrer"
                    className="txt-small text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 truncate max-w-xs">
                    <span className="truncate">{s.contentLink}</span>
                    <IoOpenOutline className="size-3.5 shrink-0" />
                  </a>
                  <div className="flex gap-4 mt-1.5 txt-smaller text-zinc-500 flex-wrap">
                    <span>{s.totalViews.toLocaleString()} {isAr ? "مشاهدة" : "views"}</span>
                    <span>{s.totalReach.toLocaleString()} {isAr ? "وصول" : "reach"}</span>
                    <span className="flex gap-1 flex-wrap">
                      {s.contentTypes.map((c) => (
                        <span key={c} className="bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-400">{c}</span>
                      ))}
                    </span>
                  </div>
                </div>
                <div className="text-end shrink-0">
                  <p className={`header-smaller font-display font-bold ${s.isApproved ? "text-[#78be20]" : "text-zinc-500"}`}>
                    +{s.pointsAwarded}
                  </p>
                  <p className="txt-smaller text-zinc-500">{isAr ? "نقطة" : "pts"}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </AuthShell>
  );
}