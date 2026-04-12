// components/auth/OtpInput.tsx
"use client";

import { useRef } from "react";
import { useLocale } from "next-intl";

type Props = {
  value:    string;
  onChange: (val: string) => void;
  disabled?: boolean;
};

// 6 individual boxes — each accepts one digit
export default function OtpInput({ value, onChange, disabled }: Props) {
  const locale = useLocale();
  const isRTL  = locale === "ar";
  const refs   = Array.from({ length: 6 }, () => useRef<HTMLInputElement>(null));

  function handleChange(i: number, char: string) {
    const digit = char.replace(/\D/, "").slice(-1);
    const arr   = value.padEnd(6, " ").split("");
    arr[i]      = digit || " ";
    const next  = arr.join("").trimEnd();
    onChange(next);
    if (digit && i < 5) refs[i + 1]?.current?.focus();
  }

  function handleKeyDown(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace") {
      if (!value[i] && i > 0) refs[i - 1]?.current?.focus();
      const arr = value.padEnd(6, " ").split("");
      arr[i]    = " ";
      onChange(arr.join("").trimEnd());
    }
    if (e.key === "ArrowLeft")  (isRTL ? refs[i + 1] : refs[i - 1])?.current?.focus();
    if (e.key === "ArrowRight") (isRTL ? refs[i - 1] : refs[i + 1])?.current?.focus();
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    onChange(pasted);
    refs[Math.min(pasted.length, 5)]?.current?.focus();
  }

  return (
    <div
      className={`flex gap-2 justify-center ${isRTL ? "flex-row-reverse" : "flex-row"}`}
      dir="ltr" // always LTR so digits render left-to-right
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <input
          key={i}
          ref={refs[i]}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] || ""}
          disabled={disabled}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          className="w-11 h-13 text-center txt-larger font-bold bg-black border border-zinc-700
            rounded-lg text-white outline-none transition-colors duration-200
            focus:border-[#78be20] disabled:opacity-40 caret-[#78be20]"
        />
      ))}
    </div>
  );
}