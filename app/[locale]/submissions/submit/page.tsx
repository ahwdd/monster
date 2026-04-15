// src/app/[locale]/submissions/submit/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter }           from "next/navigation";
import { useLocale }           from "next-intl";
import Link                    from "next/link";
import AuthShell          from "@/components/auth/AuthShell";
import SubmissionForm     from "@/components/forms/SubmissionForm";
import { useAuth }        from "@/hooks/useAuth";
import { useToast }       from "@/contexts/ToastContext";

const PENDING_CAP = 5;

export default function SubmitPage() {
  const locale = useLocale();
  const isAr   = locale === "ar";
  const router = useRouter();
  const toast  = useToast();
  const { user, isAuthenticated, initializationComplete } = useAuth();

  const [profile,       setProfile]       = useState<any>(null);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [pendingCount,  setPendingCount]  = useState(0);
  const [canSubmit,     setCanSubmit]     = useState(true);
  const [subsLoaded,    setSubsLoaded]    = useState(false);

  useEffect(() => {
    if (initializationComplete && !isAuthenticated) router.push("/auth/signin");
  }, [initializationComplete, isAuthenticated, router]);

  useEffect(() => {
    if (!user) return;
    fetch("/api/profile/register", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setProfile(d.data ?? null))
      .catch(() => {})
      .finally(() => setProfileLoaded(true));
  }, [user]);

  useEffect(() => {
    if (!user) return;
    fetch("/api/submissions", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setPendingCount(d.pendingCount ?? 0);
          setCanSubmit(d.canSubmit ?? true);
        }
      })
      .catch(() => {})
      .finally(() => setSubsLoaded(true));
  }, [user]);

  if (!initializationComplete || !user || !profileLoaded || !subsLoaded) {
    return (
      <AuthShell>
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-[#78be20] border-t-transparent rounded-full animate-spin" />
        </div>
      </AuthShell>
    );
  }

  // Not registered yet
  if (!profile) {
    return (
      <AuthShell>
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="bg-[#0d0d0d] border border-zinc-800 rounded-2xl p-8 max-w-sm w-full text-center space-y-4">
            <p className="header-smaller font-display font-semibold text-white">
              {isAr ? "يجب إكمال التسجيل أولاً" : "Registration Required"}
            </p>
            <p className="txt-small text-zinc-500">
              {isAr
                ? "أكمل استمارة التسجيل قبل رفع أي مشاركة."
                : "Complete your registration form before submitting content."}
            </p>
            <Link href="/submissions/register"
              className="block w-full py-3 bg-[#78be20] hover:bg-[#8fd428] text-black font-display
                font-semibold uppercase txt-small rounded-xl transition-colors duration-200 text-center">
              {isAr ? "اذهب إلى التسجيل" : "Go to Registration"}
            </Link>
          </div>
        </div>
      </AuthShell>
    );
  }

  // Pending cap reached
  if (!canSubmit) {
    return (
      <AuthShell>
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="bg-[#0d0d0d] border border-yellow-400/20 rounded-2xl p-8 max-w-sm w-full text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-yellow-400/10 border border-yellow-400/30
              flex items-center justify-center mx-auto text-2xl">
              ⏳
            </div>
            <p className="header-smaller font-display font-semibold text-yellow-400">
              {isAr ? "الحد الأقصى من المشاركات المعلّقة" : "Pending Limit Reached"}
            </p>
            <p className="txt-small text-zinc-400">
              {isAr
                ? `لديك ${pendingCount} مشاركات قيد المراجعة (الحد الأقصى ${PENDING_CAP}). لا يمكنك إضافة المزيد حتى تتم مراجعة بعضها.`
                : `You have ${pendingCount}/${PENDING_CAP} pending submissions. You can't add more until some are reviewed.`}
            </p>
            <div className="flex flex-col gap-2">
              <Link href="/submissions"
                className="block w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-medium
                  txt-small rounded-xl transition-colors duration-200 text-center">
                {isAr ? "عرض مشاركاتي" : "View My Submissions"}
              </Link>
              <Link href="/auth/profile"
                className="block w-full py-3 text-zinc-500 hover:text-white txt-smaller
                  transition-colors duration-200 text-center">
                {isAr ? "العودة للملف الشخصي" : "Back to Profile"}
              </Link>
            </div>
          </div>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <h1 className="header-large font-display font-semibold text-white uppercase mb-2">
            {isAr ? "مشاركة جديدة" : "New Submission"}
          </h1>
          <p className="txt-small text-zinc-500">
            {isAr
              ? `يمكنك إضافة ${PENDING_CAP - pendingCount} مشاركة أخرى قبل الوصول للحد الأقصى`
              : `You can add ${PENDING_CAP - pendingCount} more submission${PENDING_CAP - pendingCount !== 1 ? "s" : ""} before reaching the limit`}
          </p>
        </div>
        <div className="bg-[#0d0d0d] border border-zinc-800 rounded-2xl p-6">
          <SubmissionForm
            nickname={profile.nickname}
            rank={profile.rank}
            onSuccess={() => {
              toast.success(isAr ? "تم إرسال المشاركة!" : "Submission sent!");
              router.push("/submissions");
            }}
          />
        </div>
      </div>
    </AuthShell>
  );
}