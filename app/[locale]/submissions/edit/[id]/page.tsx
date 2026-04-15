// src/app/[locale]/submissions/edit/[id]/page.tsx
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
      router.push(
        `/${locale}/auth/signin?returnUrl=/${locale}/submissions/edit/${id}`,
      );
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

  if (!initializationComplete || !user || loading) {
    return (
      <AuthShell>
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-[#78be20] border-t-transparent rounded-full animate-spin" />
        </div>
      </AuthShell>
    );
  }

  if (error || !submission) {
    return (
      <AuthShell>
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="bg-[#0d0d0d] border border-zinc-800 rounded-2xl p-8 max-w-sm w-full text-center space-y-4">
            <IoWarningOutline className="size-10 text-zinc-500 mx-auto" />
            <p className="header-smaller font-display font-semibold text-white">
              {error ?? (isAr ? "غير موجود" : "Not found")}
            </p>
            <Link
              href={`/${locale}/submissions`}
              className="block w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-medium
                txt-small rounded-xl transition-colors text-center">
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
          <div className="bg-[#0d0d0d] border border-[#78be20]/20 rounded-2xl p-8 max-w-sm w-full text-center space-y-4">
            <div
              className="w-12 h-12 rounded-full bg-[#78be20]/10 border border-[#78be20]/30
              flex items-center justify-center mx-auto text-2xl">
              ✓
            </div>
            <p className="header-smaller font-display font-semibold text-[#78be20]">
              {isAr ? "المشاركة معتمدة" : "Submission Approved"}
            </p>
            <p className="txt-small text-zinc-400">
              {isAr
                ? "لا يمكن تعديل المشاركات المعتمدة."
                : "Approved submissions cannot be edited."}
            </p>
            <Link
              href={`/${locale}/submissions`}
              className="block w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-medium
                txt-small rounded-xl transition-colors text-center">
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
          <div className="bg-[#0d0d0d] border border-yellow-400/20 rounded-2xl p-8 max-w-sm w-full text-center space-y-4">
            <div
              className="w-12 h-12 rounded-full bg-yellow-400/10 border border-yellow-400/30
              flex items-center justify-center mx-auto text-2xl">
              ⏳
            </div>
            <p className="header-smaller font-display font-semibold text-yellow-400">
              {isAr ? "في انتظار المراجعة" : "Pending Review"}
            </p>
            <p className="txt-small text-zinc-400">
              {isAr
                ? "هذه المشاركة قيد المراجعة. لا يمكن تعديلها حتى يتم البت فيها."
                : "This submission is currently under review. You can't edit it until a decision is made."}
            </p>
            <Link
              href={`/${locale}/submissions`}
              className="block w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-medium
                txt-small rounded-xl transition-colors text-center">
              {isAr ? "العودة للمشاركات" : "Back to Submissions"}
            </Link>
          </div>
        </div>
      </AuthShell>
    );
  }

  const Arrow = isAr ? IoArrowForward : IoArrowBack;
  const nickname = profile?.nickname ?? submission.nickname;

  return (
    <AuthShell>
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Back link */}
        <Link
          href={`/${locale}/submissions`}
          className="inline-flex items-center gap-2 txt-small text-zinc-500 hover:text-white
            transition-colors mb-6 group">
          <Arrow className="size-4 transition-transform group-hover:-translate-x-0.5" />
          {isAr ? "العودة للمشاركات" : "Back to Submissions"}
        </Link>

        {/* Page title */}
        <div className="mb-6">
          <h1 className="header-large font-display font-semibold text-white uppercase mb-1">
            {isAr ? "تعديل المشاركة" : "Edit Submission"}
          </h1>
          <p className="txt-small text-zinc-500">
            {isAr
              ? "تعديل بياناتك سيُعيد المشاركة إلى قائمة المراجعة."
              : "Editing your submission will send it back for admin review."}
          </p>
        </div>

        {/* Status banner — show only for REJECTED so user knows why they're editing */}
        {submission.status === "REJECTED" && (
          <div className="flex items-start gap-3 bg-red-500/5 border border-red-500/20 rounded-xl p-4 mb-6">
            <IoWarningOutline className="size-5 text-red-400 shrink-0 mt-0.5" />
            <p className="txt-small text-red-300">
              {isAr
                ? "تم رفض هذه المشاركة. يمكنك تعديلها وإعادة إرسالها."
                : "This submission was rejected. Update your details and resubmit."}
            </p>
          </div>
        )}

        {/* Accepted reach info — useful context when editing reach */}
        {submission.acceptedReach > 0 && (
          <div
            className="flex items-center gap-3 bg-[#78be20]/5 border border-[#78be20]/20
            rounded-xl p-4 mb-6">
            <span className="txt-smaller text-zinc-400">
              {isAr ? "الوصول المعتمد الحالي:" : "Current accepted reach:"}
            </span>
            <span className="txt-small font-semibold text-[#78be20]">
              {submission.acceptedReach.toLocaleString()}
            </span>
          </div>
        )}

        {/* Form */}
        <div className="bg-[#0d0d0d] border border-zinc-800 rounded-2xl p-6">
          <SubmissionForm
            nickname={nickname}
            rank={submission.rank}
            initialData={submission}
            onSuccess={() => {
              toast.success(
                isAr ? "تم تحديث المشاركة!" : "Submission updated!",
              );
              router.push(`/${locale}/submissions`);
            }}
          />
        </div>
      </div>
    </AuthShell>
  );
}
