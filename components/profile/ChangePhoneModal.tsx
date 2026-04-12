// src/components/profile/ChangePhoneModal.tsx
"use client";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose, IoArrowForward, IoArrowBack, IoPhonePortraitOutline } from "react-icons/io5";
import { useAuth } from "@/hooks/useAuth";
import OtpInput from "@/components/auth/OtpInput";
import ResendTimer from "@/components/auth/ResendTimer";
import CountrySelect from "@/components/ui/CountrySelect";
import { Country } from "@/lib/types/countries";
import { useToast } from "@/contexts/ToastContext";

type Step = "phone" | "otp";

type Props = {
  currentPhone?:    string | null;
  currentPhoneKey?: string | null;
  onClose: () => void;
};

export default function ChangePhoneModal({ currentPhone, currentPhoneKey, onClose }: Props) {
  const t      = useTranslations("profile");
  const locale = useLocale();
  const isRTL  = locale === "ar";
  const toast  = useToast();
  const { refreshUser, sendWhatsAppLoginOTP } = useAuth();

  const [step,     setStep]     = useState<Step>("phone");
  const [phone,    setPhone]    = useState("");
  const [phoneKey, setPhoneKey] = useState(currentPhoneKey || "+966");
  const [otp,      setOtp]      = useState("");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState<string | null>(null);

  async function handleSend() {
    if (!phone || !/^\d{7,15}$/.test(phone)) { setError(t("errorPhone")); return; }

    const full = `${phoneKey}${phone}`;
    if (currentPhoneKey && currentPhone && full === `${currentPhoneKey}${currentPhone}`) {
      setError(t("errorSamePhone")); return;
    }

    setLoading(true); setError(null);
    try {
      const check = await fetch(`/api/users/check-phone?phone=${encodeURIComponent(phone)}&phoneKey=${encodeURIComponent(phoneKey)}`);
      const checkData = await check.json();
      if (checkData.exists) { setError(t("errorPhoneTaken")); return; }

      const ok = await sendWhatsAppLoginOTP(phone, phoneKey);
      if (ok) { setStep("otp"); toast.success(t("otpSent")); }
      else throw new Error(t("errorSendOtp"));
    } catch (e) {
      setError(e instanceof Error ? e.message : t("errorSendOtp"));
    } finally {
      setLoading(false);
    }
  }

  async function handleVerify() {
    if (otp.replace(/\s/g, "").length < 6) { setError(t("errorOtp")); return; }

    setLoading(true); setError(null);
    try {
      // 1. Verify OTP — does NOT set cookie
      const verifyRes = await fetch("/api/auth/login/whatsapp/verify-otp-only", {
        method: "POST", credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: `${phoneKey}${phone}`, otp: otp.replace(/\s/g, "") }),
      });
      const verifyData = await verifyRes.json();
      if (!verifyRes.ok) throw new Error(verifyData.error || t("errorOtpInvalid"));

      // 2. Update phone in DB
      const updateRes = await fetch("/api/users/user", {
        method: "PUT", credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: `${phoneKey}${phone}`, phoneKey }),
      });
      if (!updateRes.ok) {
        const d = await updateRes.json();
        throw new Error(d.error || t("errorUpdate"));
      }

      // 3. Swap cookie to new token
      if (verifyData.accessToken) {
        await fetch("/api/auth/update-token", {
          method: "POST", credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ accessToken: verifyData.accessToken }),
        });
      }

      // 4. Refresh redux store
      await refreshUser(true);
      toast.success(t("phoneUpdated"));
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : t("errorUpdate"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 12 }}
        animate={{ opacity: 1, scale: 1,    y: 0  }}
        exit={{    opacity: 0, scale: 0.97, y: 12 }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-md bg-[#0d0d0d] border border-zinc-800 rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        dir={isRTL ? "rtl" : "ltr"}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <IoPhonePortraitOutline className="size-5 text-[#78be20]" />
            <h3 className="header-smaller font-display font-semibold text-white uppercase">
              {t(currentPhone ? "changePhone" : "addPhone")}
            </h3>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors duration-200">
            <IoClose className="size-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <AnimatePresence mode="wait" initial={false}>

            {step === "phone" && (
              <motion.div key="phone-step"
                initial={{ opacity: 0, x: isRTL ? -16 : 16 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRTL ? 16 : -16 }} transition={{ duration: 0.18 }}
                className="space-y-4"
              >
                {currentPhone && (
                  <p className="txt-small text-zinc-500">
                    {t("currentPhone")}: <span className="text-white">{currentPhoneKey}{currentPhone}</span>
                  </p>
                )}
                <div>
                  <div className="flex gap-2">
                    <CountrySelect
                      value={phoneKey}
                      onChange={(c: Country) => { setPhoneKey(c.callingCode); setError(null); }}
                    />
                    <input
                      type="tel" inputMode="numeric" value={phone} autoFocus
                      onChange={(e) => { setPhone(e.target.value.replace(/\D/g, "")); setError(null); }}
                      placeholder={t("phonePlaceholder")}
                      className="flex-1 px-4 py-3.5 bg-black border border-zinc-700 rounded-lg text-white txt-regular placeholder:text-zinc-600 outline-none focus:border-[#78be20] transition-colors duration-200"
                    />
                  </div>
                  {error && <p className="txt-smaller text-red-400 mt-1.5">{error}</p>}
                </div>
              </motion.div>
            )}

            {step === "otp" && (
              <motion.div key="otp-step"
                initial={{ opacity: 0, x: isRTL ? -16 : 16 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRTL ? 16 : -16 }} transition={{ duration: 0.18 }}
                className="space-y-4"
              >
                <p className="txt-small text-zinc-400 text-center">
                  {t("otpSentTo")} <span className="text-white font-medium">{phoneKey} {phone}</span>
                </p>
                <OtpInput value={otp} onChange={(v) => { setOtp(v); setError(null); }} disabled={loading} />
                {error && <p className="txt-smaller text-red-400 text-center">{error}</p>}
                <div className="flex justify-center">
                  <ResendTimer onResend={handleSend} disabled={loading} />
                </div>
              </motion.div>
            )}

          </AnimatePresence>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            {step === "otp" && (
              <button onClick={() => { setStep("phone"); setOtp(""); setError(null); }}
                className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 text-white txt-small font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                {isRTL ? <IoArrowForward className="size-4" /> : <IoArrowBack className="size-4" />}
                {t("back")}
              </button>
            )}
            <button
              onClick={step === "phone" ? handleSend : handleVerify}
              disabled={loading}
              className="flex-1 py-3 bg-[#78be20] hover:bg-[#8fd428] text-black font-display font-semibold uppercase txt-small rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading
                ? <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                : <>
                    {step === "phone" ? t("sendCode") : t("verifyAndSave")}
                    {isRTL ? <IoArrowBack className="size-4" /> : <IoArrowForward className="size-4" />}
                  </>
              }
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}