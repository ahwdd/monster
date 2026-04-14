"use client";

// src/app/[locale]/auth/signup/page.tsx
import { useState, useEffect } from "react";
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
    user,
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

  useEffect(() => {
    if (error) {
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

  function validate(): boolean {
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
    return Object.keys(e).length === 0;
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
      router.push(`/${locale}`);
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
      <AuthShell>
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-[#78be20] border-t-transparent rounded-full animate-spin" />
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell>
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="w-full max-w-sm">
          {isAuthenticated && <AlreadyLoggedInBanner />}

          <div className="bg-[#0d0d0d] border border-zinc-800 rounded-2xl p-6 sm:p-8">
            <div className="mb-6 text-center">
              <h1 className="header-small font-display font-semibold text-white uppercase mb-1">
                {t("signupTitle")}
              </h1>
              <p className="txt-small text-zinc-500">
                {step === "contact" ? t("signupSub") : t("otpSub")}
              </p>
            </div>

            <AnimatePresence initial={false}>
              {step === "contact" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex justify-between items-center mb-5 overflow-hidden">
                  <span className="txt-regular font-medium text-white">
                    {tab === "whatsapp" ? t("tabPhone") : t("tabEmail")}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      switchTab(tab === "whatsapp" ? "email" : "whatsapp")
                    }
                    className="flex items-center gap-1.5 txt-small text-zinc-400 hover:text-[#78be20] transition-colors duration-200">
                    {tab === "whatsapp" ? (
                      <>
                        <CiMail className="size-4" />
                        {t("useEmail")}
                      </>
                    ) : (
                      <>
                        <CiMobile1 className="size-4" />
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
                    initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3">
                    {/* Name */}
                    <div>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          setErrors({});
                        }}
                        placeholder={t("namePlaceholder")}
                        className="w-full px-4 py-3.5 bg-black border border-zinc-700 rounded-lg text-white txt-regular placeholder:text-zinc-600 outline-none focus:border-[#78be20] transition-colors duration-200"
                      />
                      {errors.name && (
                        <p className="txt-smaller text-red-400 mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {tab === "whatsapp" ? (
                      <div>
                        <div className="flex gap-2">
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
                            className="flex-1 px-4 py-3.5 bg-black border border-zinc-700 rounded-lg text-white txt-regular placeholder:text-zinc-600 outline-none focus:border-[#78be20] transition-colors duration-200"
                          />
                        </div>
                        {errors.phone && (
                          <p className="txt-smaller text-red-400 mt-1">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    ) : (
                      <div>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setErrors({});
                          }}
                          placeholder={t("emailPlaceholder")}
                          className="w-full px-4 py-3.5 bg-black border border-zinc-700 rounded-lg text-white txt-regular placeholder:text-zinc-600 outline-none focus:border-[#78be20] transition-colors duration-200"
                        />
                        {errors.email && (
                          <p className="txt-smaller text-red-400 mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}

                {step === "otp" && (
                  <motion.div
                    key="otp"
                    initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4">
                    <p className="txt-small text-center text-zinc-400">
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
                      <p className="txt-smaller text-red-400 text-center">
                        {errors.otp}
                      </p>
                    )}
                    <div className="flex justify-center">
                      <ResendTimer onResend={handleResend} disabled={loading} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="button"
                onClick={step === "contact" ? handleSend : handleVerify}
                disabled={loading}
                className="w-full py-3.5 bg-[#78be20] hover:bg-[#8fd428] text-black font-display font-semibold uppercase tracking-wider txt-regular rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {loading ? (
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
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
                  type="button"
                  onClick={() => {
                    setStep("contact");
                    setOtp("");
                    setErrors({});
                    clearAuthError();
                  }}
                  className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white txt-small font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
                  {isRTL ? (
                    <IoArrowForward className="size-4" />
                  ) : (
                    <IoArrowBack className="size-4" />
                  )}
                  {t("changeContact")}
                </button>
              )}
            </div>

            <div className="mt-6 text-center">
              <p className="txt-small text-zinc-500">
                {t("hasAccount")}{" "}
                <Link
                  href="/auth/signin"
                  className="text-[#78be20] hover:text-[#8fd428] font-medium transition-colors">
                  {t("signinLink")}
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AuthShell>
  );
}
