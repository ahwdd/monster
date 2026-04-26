// src/app/[locale]/auth/signin/page.tsx
"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { CiMail, CiMobile1 } from "react-icons/ci";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/contexts/ToastContext";
import AuthShell from "@/components/auth/AuthShell";
import AlreadyLoggedInBanner from "@/components/auth/AlreadyLoggedInBanner";
import OtpInput from "@/components/auth/OtpInput";
import CountrySelect from "@/components/auth/CountrySelect";
import ResendTimer from "@/components/auth/ResendTimer";

type Tab = "whatsapp" | "email";
type Step = "contact" | "otp" | "name";

// ── XD-faithful input component ──────────────────────────────────
function XdInput({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  error,
  right,
}: {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="font-proxima text-white text-sm">{label}</label>
        {right}
      </div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-12 px-4 bg-[#171717] text-[#ccccd0] text-sm font-proxima
          placeholder:text-[#ccccd0]/50 outline-none border border-transparent
          focus:border-[#6bd41a] transition-colors"
      />
      {error && <p className="font-proxima text-red-400 text-xs">{error}</p>}
    </div>
  );
}

// ── XD-faithful button ────────────────────────────────────────────
function XdBtn({
  children,
  onClick,
  loading,
  variant = "white",
  className = "",
}: {
  children: React.ReactNode;
  onClick: () => void;
  loading?: boolean;
  variant?: "white" | "green" | "dark";
  className?: string;
}) {
  const bg =
    variant === "white"
      ? "bg-white text-black hover:bg-[#eee]"
      : variant === "green"
        ? "bg-[#6bd41a] text-black hover:bg-[#7de020]"
        : "bg-[#171717] text-white hover:bg-[#222]";
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`h-12 px-8 font-display font-bold text-sm uppercase tracking-[2px]
        transition-colors disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center gap-2 ${bg} ${className}`}>
      {loading ? (
        <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
      ) : (
        children
      )}
    </button>
  );
}

export default function SigninPage() {
  const t = useTranslations("auth");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const router = useRouter();
  const toast = useToast();

  const {
    sendWhatsAppLoginOTP,
    verifyWhatsAppLoginOTP,
    sendEmailLoginOTP,
    verifyEmailLoginOTP,
    loading,
    error,
    isAuthenticated,
    initializationComplete,
    clearAuthError,
  } = useAuth();

  const [tab, setTab] = useState<Tab>("whatsapp");
  const [step, setStep] = useState<Step>("contact");
  const [phone, setPhone] = useState("");
  const [phoneKey, setPhoneKey] = useState("+20");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [nameLoading, setNameLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Warn user if they try to leave while on the name step —
  // they'd lose their session and have to re-authenticate.
  useEffect(() => {
    if (step !== "name") return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [step]);
  // Dedup: show each unique error message exactly once.
  // The ref is never reset to null — only updated when a new different error arrives.
  // This prevents the same message firing multiple times across Redux re-render cycles.
  const lastToastedError = useRef<string | null>(null);
  useEffect(() => {
    if (error && error !== lastToastedError.current) {
      lastToastedError.current = error;
      toast.error(error);
      clearAuthError();
    }
  }, [error]);

  function switchTab(next: Tab) {
    setTab(next);
    setStep("contact");
    setOtp("");
    setErrors({});
    clearAuthError();
  }

  function validate() {
    const e: Record<string, string> = {};
    if (tab === "whatsapp") {
      if (!phone || !/^\d{7,15}$/.test(phone)) e.phone = t("errorPhone");
    } else {
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        e.email = t("errorEmail");
    }
    if (step === "otp" && otp.replace(/\s/g, "").length < 6)
      e.otp = t("errorOtp");
    setErrors(e);
    return !Object.keys(e).length;
  }

  async function handleSend() {
    if (!validate()) return;
    clearAuthError();
    const ok =
      tab === "whatsapp"
        ? await sendWhatsAppLoginOTP(phone, phoneKey)
        : await sendEmailLoginOTP(email);
    if (ok) {
      setStep("otp");
      setOtp("");
      toast.success(t("otpSent"));
    }
  }

  async function handleVerify() {
    if (!validate()) return;
    clearAuthError();
    const ok =
      tab === "whatsapp"
        ? await verifyWhatsAppLoginOTP(
            `${phoneKey}${phone}`,
            otp.replace(/\s/g, ""),
          )
        : await verifyEmailLoginOTP(email, otp.replace(/\s/g, ""));
    if (ok === "requiresName") {
      setStep("name");
      return;
    }
    if (ok) {
      toast.success(t("signinSuccess"));
      router.push(`/`);
    }
  }

  async function handleCompleteName() {
    if (!name.trim() || name.trim().length < 2) {
      setErrors({ name: t("errorName") });
      return;
    }
    setErrors({});
    setNameLoading(true);
    try {
      const res = await fetch("/api/auth/complete-profile", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(t("signinSuccess"));
        router.push(`/`);
      } else {
        toast.error(data.message ?? t("errorGeneric"));
        // Session expired — send them back to start
        if (res.status === 401) setStep("contact");
      }
    } catch {
      toast.error(t("errorGeneric"));
    } finally {
      setNameLoading(false);
    }
  }

  async function handleResend() {
    clearAuthError();
    if (tab === "whatsapp") await sendWhatsAppLoginOTP(phone, phoneKey);
    else await sendEmailLoginOTP(email);
    toast.success(t("otpResent"));
  }

  if (!initializationComplete) {
    return (
      <AuthShell breadcrumbs={[{ label: "Sign in" }]}>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-[#6bd41a] border-t-transparent rounded-full animate-spin" />
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell breadcrumbs={[{ label: isRTL ? "تسجيل الدخول" : "Sign in" }]}>
      {/* XD: form centered vertically/horizontally in remaining space */}
      <div className="flex items-center justify-center py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="w-full max-w-90">
          {isAuthenticated && <AlreadyLoggedInBanner />}

          {/* ── Title — XD: white large, subtitle #ccccd0 small ── */}
          <div className="text-center mb-8">
            <h1
              className="font-display font-black text-white uppercase mb-2"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
                letterSpacing: "0.04em",
              }}>
              {isRTL ? "تسجيل الدخول" : "Sign in"}
            </h1>
            <p className="font-proxima text-[#ccccd0] text-sm">
              {step === "contact" ? t("signinSub") : t("otpSub")}
            </p>
          </div>

          {/* Tab toggle */}
          <AnimatePresence initial={false}>
            {step === "contact" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex justify-between items-center mb-5 overflow-hidden">
                <span />
                <button
                  onClick={() =>
                    switchTab(tab === "whatsapp" ? "email" : "whatsapp")
                  }
                  className="flex items-center gap-1.5 font-proxima text-xs text-[#6bd41a] hover:opacity-80 transition-opacity">
                  {tab === "whatsapp" ? (
                    <>
                      <CiMail className="size-3.5" />
                      {t("useEmail")}
                    </>
                  ) : (
                    <>
                      <CiMobile1 className="size-3.5" />
                      {t("usePhone")}
                    </>
                  )}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-4">
            <AnimatePresence mode="wait" initial={false}>
              {/* Contact step */}
              {step === "contact" && (
                <motion.div
                  key={`c-${tab}`}
                  initial={{ opacity: 0, x: isRTL ? -16 : 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isRTL ? 16 : -16 }}
                  transition={{ duration: 0.18 }}
                  className="space-y-4">
                  {tab === "whatsapp" ? (
                    <div>
                      <label className="font-proxima text-white text-sm block mb-1.5">
                        {t("tabPhone")}
                      </label>
                      <div className="flex gap-2 h-12">
                        <CountrySelect
                          value={phoneKey}
                          onChange={(c) => setPhoneKey(c.callingCode)}
                        />
                        <input
                          type="tel"
                          inputMode="numeric"
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value.replace(/\D/g, ""));
                            setErrors({});
                          }}
                          placeholder={t("phonePlaceholder")}
                          className="flex-1 h-full px-4 bg-[#171717] text-[#ccccd0] text-sm
                            font-proxima placeholder:text-[#ccccd0]/40 outline-none
                            border border-transparent focus:border-[#6bd41a] transition-colors"
                        />
                      </div>
                      {errors.phone && (
                        <p className="font-proxima text-red-400 text-xs mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  ) : (
                    <XdInput
                      label={t("tabEmail")}
                      type="email"
                      placeholder={t("emailPlaceholder")}
                      value={email}
                      onChange={(v) => {
                        setEmail(v);
                        setErrors({});
                      }}
                      error={errors.email}
                    />
                  )}
                </motion.div>
              )}

              {/* OTP step */}
              {step === "otp" && (
                <motion.div
                  key="otp"
                  initial={{ opacity: 0, x: isRTL ? -16 : 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isRTL ? 16 : -16 }}
                  transition={{ duration: 0.18 }}
                  className="space-y-4">
                  <p className="font-proxima text-sm text-center text-[#ccccd0]">
                    {t("otpSentTo")}{" "}
                    <span className="text-white font-medium">
                      {tab === "whatsapp" ? `${phoneKey} ${phone}` : email}
                    </span>
                  </p>
                  <OtpInput
                    value={otp}
                    onChange={(v) => {
                      setOtp(v);
                      setErrors({});
                    }}
                    disabled={loading}
                  />
                  {errors.otp && (
                    <p className="font-proxima text-red-400 text-xs text-center">
                      {errors.otp}
                    </p>
                  )}
                  <div className="flex justify-center">
                    <ResendTimer onResend={handleResend} disabled={loading} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Sign in button — XD: white bg, black text ── */}
            <XdBtn
              onClick={step === "contact" ? handleSend : handleVerify}
              loading={loading}
              variant="white"
              className="w-full">
              {step === "contact" ? t("sendOtp") : t("verifyAndSignin")}
              {!loading &&
                (isRTL ? (
                  <IoArrowBack className="size-4" />
                ) : (
                  <IoArrowForward className="size-4" />
                ))}
            </XdBtn>

            {step === "otp" && (
              <button
                onClick={() => {
                  setStep("contact");
                  setOtp("");
                  setErrors({});
                  clearAuthError();
                }}
                className="w-full h-10 font-proxima text-sm text-[#ccccd0] hover:text-white
                  transition-colors flex items-center justify-center gap-2">
                {isRTL ? (
                  <IoArrowForward className="size-4" />
                ) : (
                  <IoArrowBack className="size-4" />
                )}
                {t("changeContact")}
              </button>
            )}
          </div>

          {/* ── "Don't have an account? Sign Up" — XD: #6bd41a ── */}
          <div className="mt-8 text-center">
            <p className="font-proxima text-[#6bd41a] text-sm">
              {t("noAccount")}{" "}
              <Link
                href={`/auth/signup`}
                className="underline underline-offset-2 hover:opacity-80 transition-opacity font-semibold">
                {t("signupLink")}
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      {/* ── Name required modal — shown when Hub user has no local record ── */}
      <AnimatePresence>
        {step === "name" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{
              background: "rgba(0,0,0,0.85)",
              backdropFilter: "blur(4px)",
            }}>
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="w-full max-w-sm bg-[#111] border border-[#272727] p-8 relative">
              {/* Warning strip */}
              <div className="flex items-start gap-3 mb-6 p-3 border border-[#bfec1d]/30 bg-[#bfec1d]/5">
                <svg
                  className="size-4 shrink-0 mt-0.5 text-[#bfec1d]"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="font-proxima text-xs text-[#bfec1d] leading-relaxed">
                  {isRTL
                    ? "لا تغلق هذه النافذة أو تعود للخلف. إذا فعلت ذلك ستحتاج لإعادة تسجيل الدخول."
                    : "Don't close or go back. If you do, you'll need to sign in again."}
                </p>
              </div>

              <h2
                className="font-display font-black text-white uppercase mb-1 text-center"
                style={{
                  fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
                  letterSpacing: "0.04em",
                }}>
                {isRTL ? "ما اسمك؟" : "What's your name?"}
              </h2>
              <p className="font-proxima text-[#555] text-xs text-center mb-6">
                {isRTL
                  ? "نحتاج اسمك لإنشاء حسابك"
                  : "We need your name to create your account"}
              </p>

              <div className="flex flex-col gap-1.5 mb-4">
                <label className="font-proxima text-white text-sm">
                  {isRTL ? "الاسم الكامل" : "Full Name"}
                </label>
                <input
                  autoFocus
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setErrors({});
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleCompleteName()}
                  placeholder={
                    isRTL ? "أدخل اسمك الكامل" : "Enter your full name"
                  }
                  className="w-full h-12 px-4 bg-[#171717] text-[#ccccd0] text-sm font-proxima
                    placeholder:text-[#ccccd0]/40 outline-none border border-transparent
                    focus:border-[#6bd41a] transition-colors"
                />
                {errors.name && (
                  <p className="font-proxima text-red-400 text-xs">
                    {errors.name}
                  </p>
                )}
              </div>

              <button
                onClick={handleCompleteName}
                disabled={nameLoading}
                className="w-full h-12 bg-white hover:bg-[#eee] text-black font-display
                  font-black uppercase text-sm tracking-[2px] transition-colors
                  disabled:opacity-50 disabled:cursor-not-allowed
                  flex items-center justify-center gap-2">
                {nameLoading ? (
                  <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                ) : (
                  <>
                    {isRTL ? "إنشاء الحساب" : "Create Account"}
                    {isRTL ? (
                      <IoArrowBack className="size-4" />
                    ) : (
                      <IoArrowForward className="size-4" />
                    )}
                  </>
                )}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthShell>
  );
}
