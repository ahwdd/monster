"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useLocale } from "next-intl";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import SubmissionForm from "@/components/forms/SubmissionForm";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/contexts/ToastContext";
import { IoArrowBack, IoArrowForward, IoWarningOutline } from "react-icons/io5";

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
  isEdited: boolean;
  createdAt: string;
};

export default function EditSubmissionPage() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const toast = useToast();
  const { user, isAuthenticated, initializationComplete } = useAuth();

  const [submission, setSubmission] = useState<Submission | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initializationComplete && !isAuthenticated) {
      router.push(`/auth/signin?returnUrl=/${locale}/submissions/edit/${id}`);
    }
  }, [initializationComplete, isAuthenticated, router, locale, id]);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      fetch(`/api/submissions/${id}`, { credentials: "include" }).then((r) =>
        r.json(),
      ),
      fetch("/api/profile/register", { credentials: "include" }).then((r) =>
        r.json(),
      ),
    ])
      .then(([subData, profileData]) => {
        if (!subData.success) {
          setError(
            subData.error === "Not found"
              ? isAr
                ? "المشاركة غير موجودة"
                : "Submission not found"
              : isAr
                ? "حدث خطأ"
                : "Something went wrong",
          );
          return;
        }
        setSubmission(subData.data);
        setProfile(profileData.data ?? null);
      })
      .catch(() => setError(isAr ? "حدث خطأ في التحميل" : "Failed to load"))
      .finally(() => setLoading(false));
  }, [user, id, isAr]);

  const Arrow = isAr ? IoArrowForward : IoArrowBack;
  const backHref = `/submissions`;

  if (!initializationComplete || !user || loading) {
    return (
      <AuthShell>
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-[#6bd41a] border-t-transparent rounded-full animate-spin" />
        </div>
      </AuthShell>
    );
  }

  if (error || !submission) {
    return (
      <AuthShell>
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="bg-[#0d0d0d] border border-[#272727] p-8 max-w-sm w-full text-center space-y-4">
            <IoWarningOutline className="size-10 text-[#555] mx-auto" />
            <p className="text-base font-display font-semibold text-white uppercase">
              {error ?? (isAr ? "غير موجود" : "Not found")}
            </p>
            <Link
              href={backHref}
              className="w-full h-12 bg-[#171717] border border-[#272727] hover:border-[#444] text-white font-display font-bold uppercase tracking-wider text-sm transition-colors duration-200 flex items-center justify-center">
              {isAr ? "العودة للمشاركات" : "Back to Submissions"}
            </Link>
          </div>
        </div>
      </AuthShell>
    );
  }

  if (submission.status === "APPROVED") {
    return (
      <AuthShell>
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="bg-[#0d0d0d] border border-[#272727] border-t-2 border-t-[#6bd41a] p-8 max-w-sm w-full text-center space-y-4">
            <div className="w-12 h-12 bg-[#6bd41a]/10 border border-[#6bd41a]/30 flex items-center justify-center mx-auto text-2xl">
              ✓
            </div>
            <p className="text-base font-display font-semibold text-[#6bd41a] uppercase">
              {isAr ? "المشاركة معتمدة" : "Submission Approved"}
            </p>
            <p className="text-sm text-[#b6b6b6]">
              {isAr
                ? "لا يمكن تعديل المشاركات المعتمدة."
                : "Approved submissions cannot be edited."}
            </p>
            <Link
              href={backHref}
              className="w-full h-12 bg-[#171717] border border-[#272727] hover:border-[#444] text-white font-display font-bold uppercase tracking-wider text-sm transition-colors duration-200 flex items-center justify-center">
              {isAr ? "العودة للمشاركات" : "Back to Submissions"}
            </Link>
          </div>
        </div>
      </AuthShell>
    );
  }

  if (
    submission.pendingReach !== null &&
    submission.status === "PENDING" &&
    submission.isEdited
  ) {
    return (
      <AuthShell>
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="bg-[#0d0d0d] border border-[#272727] border-t-2 border-t-yellow-400 p-8 max-w-sm w-full text-center space-y-4">
            <div className="w-12 h-12 bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center mx-auto text-2xl">
              ⏳
            </div>
            <p className="text-base font-display font-semibold text-yellow-400 uppercase">
              {isAr ? "في انتظار المراجعة" : "Pending Review"}
            </p>
            <p className="text-sm text-[#b6b6b6]">
              {isAr
                ? "هذه المشاركة قيد المراجعة. لا يمكن تعديلها حتى يتم البت فيها."
                : "This submission is under review. You can't edit it until a decision is made."}
            </p>
            <Link
              href={backHref}
              className="w-full h-12 bg-[#171717] border border-[#272727] hover:border-[#444] text-white font-display font-bold uppercase tracking-wider text-sm transition-colors duration-200 flex items-center justify-center">
              {isAr ? "العودة للمشاركات" : "Back to Submissions"}
            </Link>
          </div>
        </div>
      </AuthShell>
    );
  }

  const nickname = profile?.nickname ?? submission.nickname;

  return (
    <AuthShell
      breadcrumbs={[
        { label: isAr ? "المشاركات" : "Submissions", href: backHref },
        { label: isAr ? "تعديل المشاركة" : "Edit Submission" },
      ]}>
      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Back link */}
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-sm text-[#555] hover:text-[#ccccd0] transition-colors mb-6 group">
          <Arrow className="size-4 transition-transform group-hover:-translate-x-0.5" />
          {isAr ? "العودة للمشاركات" : "Back to Submissions"}
        </Link>

        {/* Page header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-8 bg-[#6bd41a]" />
            <span className="text-xs text-[#6bd41a] font-display font-bold uppercase tracking-[0.2em]">
              {nickname} · {submission.rank?.replace(/_/g, " ")}
            </span>
          </div>
          <h1 className="text-3xl font-display font-black text-white uppercase tracking-tight mb-1">
            {isAr ? "تعديل المشاركة" : "Edit Submission"}
          </h1>
          <p className="text-sm text-[#b6b6b6]">
            {isAr
              ? "تعديل بياناتك سيُعيد المشاركة إلى قائمة المراجعة."
              : "Editing your submission will send it back for admin review."}
          </p>
        </div>

        {/* Rejected banner */}
        {submission.status === "REJECTED" && (
          <div className="flex items-start gap-3 bg-red-500/5 border border-red-500/20 border-s-red-500 border-s-2 p-4 mb-6">
            <IoWarningOutline className="size-5 text-red-400 shrink-0 mt-0.5" />
            <p className="text-sm text-red-300">
              {isAr
                ? "تم رفض هذه المشاركة. يمكنك تعديلها وإعادة إرسالها."
                : "This submission was rejected. Update your details and resubmit."}
            </p>
          </div>
        )}

        {/* Accepted reach info */}
        {submission.acceptedReach > 0 && (
          <div className="flex items-center gap-4 bg-[#171717] border border-[#272727] border-s-[#6bd41a] border-s-2 p-4 mb-6">
            <span className="text-xs text-[#b6b6b6] uppercase tracking-wider">
              {isAr ? "الوصول المعتمد الحالي" : "Current accepted reach"}
            </span>
            <span className="text-sm font-display font-bold text-[#6bd41a] ms-auto">
              {submission.acceptedReach.toLocaleString()}
            </span>
          </div>
        )}

        {/* Form card */}
        <div className="bg-[#0d0d0d] border border-[#272727] p-6">
          <SubmissionForm
            nickname={nickname}
            rank={submission.rank}
            initialData={submission}
            onSuccess={() => {
              toast.success(
                isAr ? "تم تحديث المشاركة!" : "Submission updated!",
              );
              router.push(backHref);
            }}
          />
        </div>
      </div>
    </AuthShell>
  );
}
