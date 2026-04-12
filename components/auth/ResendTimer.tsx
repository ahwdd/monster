// components/auth/ResendTimer.tsx
"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

type Props = {
  onResend:  () => void;
  disabled?: boolean;
  initialSeconds?: number;
};

export default function ResendTimer({ onResend, disabled, initialSeconds = 60 }: Props) {
  const t = useTranslations("auth");
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) return;
    const id = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [seconds]);

  function handleResend() {
    if (seconds > 0 || disabled) return;
    setSeconds(initialSeconds);
    onResend();
  }

  return (
    <button
      type="button"
      onClick={handleResend}
      disabled={seconds > 0 || disabled}
      className="txt-small text-zinc-500 hover:text-zinc-300 disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200"
    >
      {seconds > 0
        ? t("resendIn", { seconds })
        : t("resendOtp")}
    </button>
  );
}