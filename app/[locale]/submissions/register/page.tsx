"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import AuthShell from "@/components/auth/AuthShell";
import CreatorRegistrationForm from "@/components/forms/CreatorRegistrationForm";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/contexts/ToastContext";

export default function RegisterPage() {
  const t = useTranslations("registration");
  const locale = useLocale();
  const isAr = locale === "ar";
  const router = useRouter();
  const toast = useToast();
  const searchParams = useSearchParams();
  const { user, isAuthenticated, initializationComplete } = useAuth();

  const editMode = searchParams.get("editMode") === "true";

  const [profile, setProfile] = useState<any>(null);
  const [profileLoaded, setProfileLoaded] = useState(false);

  useEffect(() => {
    if (initializationComplete && !isAuthenticated) {
      router.push(`/${locale}/auth/signin`);
    }
  }, [initializationComplete, isAuthenticated, locale, router]);

  useEffect(() => {
    if (!user) return;
    fetch("/api/profile/register", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setProfile(d.data ?? null))
      .catch(() => {})
      .finally(() => setProfileLoaded(true));
  }, [user]);

  useEffect(() => {
    if (!profileLoaded) return;
    if (profile?.status === "APPROVED" && !editMode) {
      toast.info(t("alreadyApproved"));
      router.replace(`/${locale}/auth/profile`);
    }
  }, [profileLoaded, profile, editMode, locale, router, toast, t]);

  useEffect(() => {
    if (!profileLoaded) return;
    if (profile && profile.status !== "APPROVED" && !editMode) {
      router.replace(`/${locale}/submissions/register?editMode=true`);
    }
  }, [profileLoaded, profile, editMode, locale, router]);

  const isSpinning =
    !initializationComplete ||
    !user ||
    !profileLoaded ||
    (profile?.status === "APPROVED" && !editMode);

  if (isSpinning) {
    return (
      <AuthShell>
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-[#6bd41a] border-t-transparent rounded-full animate-spin" />
        </div>
      </AuthShell>
    );
  }

  const isEdit = !!profile;

  return (
    <AuthShell breadcrumbs={[{ label: isAr ? "التسجيل" : "Register" }]}>
      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Page header */}
        <div className="mb-8">
          {/* Accent bar */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-8 bg-[#6bd41a]" />
            <span className="text-xs text-[#6bd41a] font-display font-bold uppercase tracking-[0.2em]">
              {isAr ? "برنامج المبعوثين" : "Monster Ambassadors"}
            </span>
          </div>
          <h1 className="text-3xl font-display font-black text-white uppercase tracking-tight mb-1">
            {isEdit ? t("editTitle") : t("title")}
          </h1>
          <p className="text-sm text-[#b6b6b6]">
            {isEdit ? t("editSubtitle") : t("subtitle")}
          </p>
        </div>

        {/* Status banner for pending/rejected */}
        {isEdit && profile.status === "PENDING" && (
          <div className="flex items-center gap-3 bg-[#171717] border border-[#272727] border-s-[#6bd41a] border-s-2 p-4 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#bfec1d] animate-pulse shrink-0" />
            <p className="text-sm text-[#ccccd0]">
              {isAr
                ? "طلبك قيد المراجعة. يمكنك تحديث بياناتك."
                : "Your application is under review. You can update your details."}
            </p>
          </div>
        )}
        {isEdit && profile.status === "REJECTED" && (
          <div className="flex items-center gap-3 bg-red-500/5 border border-red-500/20 border-s-red-500 border-s-2 p-4 mb-6">
            <p className="text-sm text-red-300">
              {isAr
                ? "تم رفض طلبك. راجع بياناتك وأعد الإرسال."
                : "Your application was rejected. Review your details and resubmit."}
            </p>
          </div>
        )}

        {/* Form card */}
        <div className="bg-[#0d0d0d] border border-[#272727] p-6">
          <CreatorRegistrationForm
            initialData={profile}
            onSuccess={() => router.push(`/${locale}/auth/profile`)}
          />
        </div>
      </div>
    </AuthShell>
  );
}
