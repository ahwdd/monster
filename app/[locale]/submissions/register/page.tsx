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
  const [formSubmitted, setFormSubmitted] = useState(false);

  const editMode = searchParams.get("editMode") === "true";

  const [profile, setProfile] = useState<any>(null);
  const [profileLoaded, setProfileLoaded] = useState(false);

  useEffect(() => {
    if (initializationComplete && !isAuthenticated) {
      router.push(`/auth/signin`);
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
      router.replace(`/auth/profile`);
    }
  }, [profileLoaded, profile, editMode, locale, router, toast, t]);

  useEffect(() => {
    if (!profileLoaded) return;
    if (profile && profile.status !== "APPROVED" && !editMode) {
      router.replace(`/submissions/register?editMode=true`);
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
        {!formSubmitted && (
          <>
            <div className="mb-8 text-center">
              <h1 className="header-small font-black text-white uppercase tracking-tight mb-1">
                {isEdit ? t("editTitle") : t("title")}
              </h1>
              <p className="txt-regular text-[#b6b6b6]">
                {isEdit ? t("editSubtitle") : t("subtitle")}
              </p>
            </div>
            {isEdit && profile.status === "PENDING" && (
              <div className="flex items-center gap-3 bg-[#171717] border border-[#272727] border-s-[#6bd41a] border-s-2 p-4 mb-6">
                <div className="w-2 h-2 rounded-full bg-[#bfec1d] animate-pulse shrink-0" />
                <p className="txt-regular text-[#ccccd0]">
                  {isAr
                    ? "طلبك قيد المراجعة. يمكنك تحديث بياناتك."
                    : "Your application is under review. You can update your details."}
                </p>
              </div>
            )}
            {isEdit && profile.status === "REJECTED" && (
              <div className="flex items-center gap-3 bg-red-500/5 border border-red-500/20 border-s-red-500 border-s-2 p-4 mb-6">
                <p className="txt-regular text-red-300">
                  {isAr
                    ? "تم رفض طلبك. راجع بياناتك وأعد الإرسال."
                    : "Your application was rejected. Review your details and resubmit."}
                </p>
              </div>
            )}
          </>
        )}

        <CreatorRegistrationForm
          initialData={profile}
          onSuccess={() => {
            setFormSubmitted(true);
          }}
        />
      </div>
    </AuthShell>
  );
}
