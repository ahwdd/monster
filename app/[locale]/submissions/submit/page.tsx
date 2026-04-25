"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import SubmissionForm from "@/components/forms/SubmissionForm";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/contexts/ToastContext";

const PENDING_CAP = 5;

export default function SubmitPage() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const router = useRouter();
  const toast = useToast();
  
  const { user, isAuthenticated, initializationComplete } = useAuth();

  const [profile, setProfile] = useState<any>(null);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [canSubmit, setCanSubmit] = useState(true);
  const [subsLoaded, setSubsLoaded] = useState(false);

  useEffect(() => {
    if (initializationComplete && !isAuthenticated)
      router.push(`/${locale}/auth/signin`);
  }, [initializationComplete, isAuthenticated, router, locale]);

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
          <div className="w-10 h-10 border-2 border-[#6bd41a] border-t-transparent rounded-full animate-spin" />
        </div>
      </AuthShell>
    );
  }

  // Not registered yet
  if (!profile) {
    return (
      <AuthShell>
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="bg-[#0d0d0d] border border-[#272727] p-8 max-w-sm w-full text-center space-y-5">
            <div className="w-12 h-12 bg-[#171717] border border-[#272727] flex items-center justify-center mx-auto text-2xl">
              📋
            </div>
            <div>
              <p className="text-base font-display font-bold text-white uppercase tracking-wide mb-2">
                {isAr ? "يجب إكمال التسجيل أولاً" : "Registration Required"}
              </p>
              <p className="text-sm text-[#b6b6b6]">
                {isAr
                  ? "أكمل استمارة التسجيل قبل رفع أي مشاركة."
                  : "Complete your registration form before submitting content."}
              </p>
            </div>
            <Link
              href={`/${locale}/submissions/register`}
              className="w-full h-12 bg-[#6bd41a] hover:bg-[#7ee520] text-black font-display font-bold uppercase tracking-widest text-sm transition-colors duration-200 flex items-center justify-center"
              style={{
                clipPath:
                  "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
              }}>
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
          <div className="bg-[#0d0d0d] border border-[#272727] border-t-2 border-t-yellow-400 p-8 max-w-sm w-full text-center space-y-5">
            <div className="w-12 h-12 bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center mx-auto text-2xl">
              ⏳
            </div>
            <div>
              <p className="text-base font-display font-bold text-yellow-400 uppercase tracking-wide mb-2">
                {isAr
                  ? "الحد الأقصى من المشاركات المعلّقة"
                  : "Pending Limit Reached"}
              </p>
              <p className="text-sm text-[#b6b6b6]">
                {isAr
                  ? `لديك ${pendingCount} مشاركات قيد المراجعة (الحد الأقصى ${PENDING_CAP}).`
                  : `You have ${pendingCount}/${PENDING_CAP} pending submissions. Wait for some to be reviewed.`}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Link
                href={`/${locale}/submissions`}
                className="w-full h-12 bg-[#171717] border border-[#272727] hover:border-[#444] text-white font-display 
                font-bold uppercase tracking-wider text-sm transition-colors duration-200 flex items-center justify-center">
                {isAr ? "عرض مشاركاتي" : "View My Submissions"}
              </Link>
              <Link
                href={`/${locale}/auth/profile`}
                className="block text-center text-sm text-[#555] hover:text-[#ccccd0] transition-colors duration-200 py-2">
                {isAr ? "العودة للملف الشخصي" : "Back to Profile"}
              </Link>
            </div>
          </div>
        </div>
      </AuthShell>
    );
  }

  const remaining = PENDING_CAP - pendingCount;

  return (
    <AuthShell
      breadcrumbs={[
        {
          label: isAr ? "المشاركات" : "Submissions",
          href: `/${locale}/submissions`,
        },
        { label: isAr ? "مشاركة جديدة" : "New Submission" },
      ]}>
      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Page header */}
        <div className="mb-8 text-center">
          <h1 className="header-small font-display font-black text-white uppercase tracking-tight mb-1">
            {isAr ? "مشاركة جديدة" : "New Submission"}
          </h1>
          <p className="txt-regular text-[#b6b6b6]">
            {isAr
              ? `يمكنك إضافة ${remaining} مشاركة أخرى قبل الوصول للحد الأقصى`
              : `You can add ${remaining} more submission${remaining !== 1 ? "s" : ""} before reaching the limit`}
          </p>
        </div>
        
        <div className="flex items-center gap-3 mb-3">
          <div className="w-1 h-8 bg-[#6bd41a]" />
          <span className="text-xs font-bold uppercase">
            <span className="text-[#6bd41a]">{profile.nickname}</span> · {profile.rank?.replace(/_/g, " ")}
          </span>
        </div>

        {/* Form card */}
        <div className="py-6">
          <SubmissionForm
            nickname={profile.nickname}
            rank={profile.rank}
            onSuccess={() => {
              toast.success(isAr ? "تم إرسال المشاركة!" : "Submission sent!");
              router.push(`/${locale}/submissions`);
            }}
          />
        </div>
      </div>
    </AuthShell>
  );
}
