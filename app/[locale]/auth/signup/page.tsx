// src/app/[locale]/auth/signup/page.tsx
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
type Step = "contact" | "otp";

function XdInput({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  error,
}: {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-proxima text-white text-sm">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-12 px-4 bg-[#171717] text-[#ccccd0] text-sm font-proxima rounded-lg
          placeholder:text-[#ccccd0]/40 outline-none border border-transparent transition-colors"
      />
      {error && <p className="font-proxima text-red-400 text-xs">{error}</p>}
    </div>
  );
}

export default function SignupPage() {
  const t = useTranslations("auth");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const router = useRouter();
  const toast = useToast();

  const {
    sendWhatsAppRegisterOTP,
    verifyWhatsAppRegisterOTP,
    sendEmailRegisterOTP,
    verifyEmailRegisterOTP,
    loading,
    error,
    isAuthenticated,
    initializationComplete,
    clearAuthError,
  } = useAuth();

  const [tab, setTab] = useState<Tab>("whatsapp");
  const [step, setStep] = useState<Step>("contact");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneKey, setPhoneKey] = useState("+20");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    if (!name.trim()) e.name = t("errorName");
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
        ? await sendWhatsAppRegisterOTP(name.trim(), phone, phoneKey)
        : await sendEmailRegisterOTP(name.trim(), email);
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
        ? await verifyWhatsAppRegisterOTP(
            `${phoneKey}${phone}`,
            otp.replace(/\s/g, ""),
          )
        : await verifyEmailRegisterOTP(email, otp.replace(/\s/g, ""));
    if (ok) {
      toast.success(t("signupSuccess"));
      router.push(`/`);
    }
  }

  async function handleResend() {
    clearAuthError();
    if (tab === "whatsapp")
      await sendWhatsAppRegisterOTP(name.trim(), phone, phoneKey);
    else await sendEmailRegisterOTP(name.trim(), email);
    toast.success(t("otpResent"));
  }

  if (!initializationComplete) {
    return (
      <AuthShell
        breadcrumbs={[{ label: isRTL ? "إنشاء حساب" : "Join the Crew" }]}>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-[#6bd41a] border-t-transparent rounded-full animate-spin" />
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      breadcrumbs={[{ label: isRTL ? "إنشاء حساب" : "Join the Crew" }]}>
      <div className="flex items-center justify-center py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="w-full max-w-90">
          {isAuthenticated && <AlreadyLoggedInBanner />}

          <div className="text-center mb-8">
            <h1
              className="font-display font-black text-white uppercase mb-2"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
                letterSpacing: "0.04em",
              }}>
              {isRTL ? "إنشاء حساب" : "Join the Crew"}
            </h1>
            <p className="font-proxima text-[#ccccd0] text-sm">
              {step === "contact" ? t("signupSub") : t("otpSub")}
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
                  className="flex items-center gap-1.5 font-proxima text-xs text-[#6bd41a] hover:opacity-80">
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
              {step === "contact" && (
                <motion.div
                  key={`c-${tab}`}
                  initial={{ opacity: 0, x: isRTL ? -16 : 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isRTL ? 16 : -16 }}
                  transition={{ duration: 0.18 }}
                  className="space-y-4">
                  <XdInput
                    label={isRTL ? "الاسم الكامل" : "Full Name"}
                    placeholder={t("namePlaceholder")}
                    value={name}
                    onChange={(v) => {
                      setName(v);
                      setErrors({});
                    }}
                    error={errors.name}
                  />

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
                          className="flex-1 h-full px-4 bg-[#171717] text-[#ccccd0] text-sm font-proxima rounded-lg
                            placeholder:text-[#ccccd0]/40 outline-none border border-transparent transition-colors"
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

            {/* White button — same as signin */}
            <button
              onClick={step === "contact" ? handleSend : handleVerify}
              disabled={loading}
              className="w-full h-12 bg-white hover:bg-[#eee] text-black font-display
                font-black uppercase text-sm tracking-[2px] transition-colors
                disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              {loading ? (
                <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  {step === "contact" ? t("sendOtp") : t("verifyAndSignup")}
                  {isRTL ? (
                    <IoArrowBack className="size-4" />
                  ) : (
                    <IoArrowForward className="size-4" />
                  )}
                </>
              )}
            </button>

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

          <div className="mt-8 text-center">
            <p className="font-proxima text-[#6bd41a] text-sm">
              {t("hasAccount")}{" "}
              <Link
                href={`/auth/signin`}
                className="underline underline-offset-2 hover:opacity-80 font-semibold">
                {t("signinLink")}
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </AuthShell>
  );
}
