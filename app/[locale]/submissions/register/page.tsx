// src/app/[locale]/submissions/register/page.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import AuthShell               from "@/components/auth/AuthShell";
import CreatorRegistrationForm from "@/components/forms/CreatorRegistrationForm";
import { useAuth }             from "@/hooks/useAuth";
import { useToast }            from "@/contexts/ToastContext";

export default function RegisterPage() {
  const locale = useLocale();
  const isAr   = locale === "ar";
  const router = useRouter();
  const toast  = useToast();
  const { user, isAuthenticated, initializationComplete } = useAuth();

  useEffect(() => {
    if (initializationComplete && !isAuthenticated) router.push("/auth/signin");
  }, [initializationComplete, isAuthenticated, router]);

  // Redirect if already registered
  useEffect(() => {
    if (!user) return;
    fetch("/api/profile/register", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => {
        if (d.data) {
          toast.info(isAr ? "لقد قدّمت الطلب من قبل." : "You've already registered.");
          router.replace("/auth/profile");
        }
      })
      .catch(() => {});
  }, [user, router, isAr]);

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
        <div className="text-center mb-6">
          <h1 className="header-large font-display font-semibold text-white uppercase mb-2">
            {isAr ? "استمارة التسجيل" : "Creator Registration"}
          </h1>
          <p className="txt-small text-zinc-500">
            {isAr ? "أكمل بياناتك للانضمام إلى برنامج مونستر كريتورز" : "Complete your details to join the Monster Creators program"}
          </p>
        </div>
        <CreatorRegistrationForm
          onSuccess={() => {
            toast.success(isAr ? "تم التسجيل بنجاح!" : "Registered successfully!");
            router.push("/auth/profile");
          }}
        />
      </div>
    </AuthShell>
  );
}