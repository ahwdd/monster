// src/app/[locale]/submissions/register/page.tsx
"use client";
import { useEffect, useState }              from "react";
import { useRouter, useSearchParams }        from "next/navigation";
import { useTranslations, useLocale }        from "next-intl";
import AuthShell                             from "@/components/auth/AuthShell";
import CreatorRegistrationForm               from "@/components/forms/CreatorRegistrationForm";
import { useAuth }                           from "@/hooks/useAuth";
import { useToast }                          from "@/contexts/ToastContext";

export default function RegisterPage() {
  const t            = useTranslations("registration");
  const locale       = useLocale();
  const router       = useRouter();
  const toast        = useToast();
  const searchParams = useSearchParams();
  const { user, isAuthenticated, initializationComplete } = useAuth();

  // ?editMode=true → user is intentionally editing an existing submission
  const editMode = searchParams.get("editMode") === "true";

  const [profile,       setProfile]       = useState<any>(null);
  const [profileLoaded, setProfileLoaded] = useState(false);

  // Guard: must be logged in
  useEffect(() => {
    if (initializationComplete && !isAuthenticated) {
      router.push(`/${locale}/auth/signin`);
    }
  }, [initializationComplete, isAuthenticated, locale, router]);

  // Load existing profile
  useEffect(() => {
    if (!user) return;
    fetch("/api/profile/register", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setProfile(d.data ?? null))
      .catch(() => {})
      .finally(() => setProfileLoaded(true));
  }, [user]);

  // Guard: already approved and NOT editing → redirect away
  useEffect(() => {
    if (!profileLoaded) return;
    if (profile?.status === "APPROVED" && !editMode) {
      toast.info(t("alreadyApproved"));
      router.replace(`/${locale}/auth/profile`);
    }
  }, [profileLoaded, profile, editMode, locale, router, toast, t]);

  // If profile exists (pending/rejected) and user hit the plain URL without editMode
  // → silently redirect to editMode so the form pre-fills and doesn't error
  useEffect(() => {
    if (!profileLoaded) return;
    if (profile && profile.status !== "APPROVED" && !editMode) {
      router.replace(`/${locale}/submissions/register?editMode=true`);
    }
  }, [profileLoaded, profile, editMode, locale, router]);

  // Loading state
  if (!initializationComplete || !user || !profileLoaded) {
    return (
      <AuthShell>
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-[#78be20] border-t-transparent rounded-full animate-spin" />
        </div>
      </AuthShell>
    );
  }

  // Redirect in progress (approved, no editMode)
  if (profile?.status === "APPROVED" && !editMode) {
    return (
      <AuthShell>
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-[#78be20] border-t-transparent rounded-full animate-spin" />
        </div>
      </AuthShell>
    );
  }

  const isEdit = !!profile;

  return (
    <AuthShell>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <h1 className="header-large font-display font-semibold text-white uppercase mb-2">
            {isEdit ? t("editTitle") : t("title")}
          </h1>
          <p className="txt-small text-zinc-500">
            {isEdit ? t("editSubtitle") : t("subtitle")}
          </p>
        </div>

        <CreatorRegistrationForm
          initialData={profile}
          onSuccess={() => router.push(`/${locale}/auth/profile`)}
        />
      </div>
    </AuthShell>
  );
}