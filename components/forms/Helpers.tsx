"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  IoCheckmarkCircle,
  IoArrowForward,
  IoArrowBack,
  IoClose,
} from "react-icons/io5";

export const readonlyInput =
  "w-full px-4 h-12 bg-[#0d0d0d] border border-[#272727] text-[#555] text-sm flex items-center opacity-70 cursor-not-allowed";

export function input(error?: string) {
  return `w-full px-4 h-12 bg-[#171717] border text-white rounded-lg text-sm rounded-lg
  placeholder:text-[#ccccd0]/40 outline-none transition-colors duration-200 ${
    error
      ? "border-red-500 focus:border-red-400"
      : "border-[#272727] focus:border-[#22bb39]"
  }`;
}

export function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-start gap-2">
      <label className="txt-larger font-medium text-white">
        {label}
        {required && <span className="text-red-400 ms-1">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

export function ToggleBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors duration-200 ${
        active
          ? "border-[#22bb39] bg-[#22bb39]/10 text-[#22bb39]"
          : "border-[#272727] text-[#b6b6b6] hover:border-[#444] bg-[#171717]"
      }`}>
      {children}
    </button>
  );
}

export function NumberInput({
  value,
  onChange,
  error,
  placeholder = "0",
  min,
}: {
  value: string;
  onChange: (val: string) => void;
  error?: string;
  placeholder?: string;
  min?: number;
}) {
  const [blurError, setBlurError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const numeric = e.target.value.replace(/\D/g, "");
    onChange(numeric);
    if (blurError) setBlurError(null);
  }

  function handleBlur() {
    if (value.trim() === "") {
      setBlurError(null);
      return;
    }
    const n = Number(value);
    if (isNaN(n)) {
      setBlurError("Please enter a valid number.");
    } else if (min !== undefined && n < min) {
      setBlurError(`Value must be at least ${min}.`);
    } else {
      setBlurError(null);
    }
  }

  const combinedError = error || blurError || undefined;

  return (
    <div>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className={input(combinedError)}
        placeholder={placeholder}
        style={{ MozAppearance: "textfield" } as React.CSSProperties}
      />
      {combinedError && (
        <p className="text-xs text-red-400 mt-1">{combinedError}</p>
      )}
    </div>
  );
}

export function UrlInput({
  value,
  onChange,
  error,
  placeholder = "https://",
}: {
  value: string;
  onChange: (val: string) => void;
  error?: string;
  placeholder?: string;
}) {
  const [blurError, setBlurError] = useState<string | null>(null);

  function handleBlur() {
    if (!value.trim()) {
      setBlurError(null);
      return;
    }
    try {
      new URL(value.trim());
      setBlurError(null);
    } catch {
      setBlurError("Please enter a valid URL (e.g. https://example.com).");
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value);
    if (blurError) setBlurError(null);
  }

  const combinedError = error || blurError || undefined;

  return (
    <div>
      <input
        type="url"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className={input(combinedError)}
        placeholder={placeholder}
      />
      {combinedError && (
        <p className="text-xs text-red-400 mt-1">{combinedError}</p>
      )}
    </div>
  );
}

export function FormStepper({
  currentStep,
  steps,
}: {
  currentStep: number;
  steps: readonly { num: number; label: string }[];
}) {
  return (
    <div className="flex items-center mb-8">
      {steps.map((s, i) => {
        const done = currentStep > s.num;
        const active = currentStep === s.num;
        return (
          <div key={s.num} className="flex items-center flex-1 last:flex-none">
            <div className="flex items-center shrink-0 text-white">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300 ${
                  done || active
                    ? "bg-[#22bb39]"
                    : "bg-[#171717]"
                }`}>
                {s.num}
              </div>
              <span
                className={`txt-smaller font-bold capitalize transition-colors duration-300 ${
                  active || done ? "text-[#22bb39]" : ""
                }`}>
                {s.label}
              </span>
            </div>

            {i < steps.length - 1 && (
              <div className="flex-1 mx-3 h-px bg-[#272727] relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-[#22bb39]"
                  animate={{ width: currentStep > s.num ? "100%" : "0%" }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function NavButtons({
  onBack, onNext, nextLabel, backLabel, isSubmit = false, loading = false, disabled = false,
}: {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel: string;
  backLabel?: string;
  isSubmit?: boolean;
  loading?: boolean;
  disabled?: boolean;
}) {
  const nextCls = `w-fit h-10 bg-monster text-white font-display font-bold uppercase tracking-widest txt-large 
  transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center 
  justify-center gap-2 px-4 rounded-lg`;

  return (
    <div className="flex items-center justify-between gap-3 pt-1">
      {onBack && backLabel && (
        <button type="button" onClick={onBack}
          className="h-10 px-2 border border-[#ccc]/50 text-[#ccc] 
          font-display font-bold uppercase tracking-wider rounded-lg txt-regular transition-colors duration-200 flex items-center gap-2">
          <IoArrowBack className="size-4" />
          {backLabel}
        </button>
      )}

      {isSubmit ? (
        <button
          type="submit"
          disabled={loading || disabled}
          className={nextCls}>
          {loading ? (
            <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
          ) : (
            <>
              <IoCheckmarkCircle className="size-5" />
              {nextLabel}
            </>
          )}
        </button>
      ) : (
        <button
          type="button"
          onClick={onNext}
          disabled={disabled}
          className={nextCls}>
          {nextLabel}
          <IoArrowForward className="size-4" />
        </button>
      )}
    </div>
  );
}
