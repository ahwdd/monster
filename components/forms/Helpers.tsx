"use client";
import { useState } from "react";

export const readonlyInput =
  "w-full px-4 h-12 bg-[#0d0d0d] border border-[#272727] text-[#555] text-sm flex items-center opacity-70 cursor-not-allowed";

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
    <div className="space-y-1.5">
      <label className="txt-larger font-medium text-white mb-4">
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
          ? "border-[#6bd41a] bg-[#6bd41a]/10 text-[#6bd41a]"
          : "border-[#272727] text-[#b6b6b6] hover:border-[#444] bg-[#171717]"
      }`}>
      {children}
    </button>
  );
}

export function input(error?: string) {
  return `w-full px-4 h-12 bg-[#171717] border text-white rounded-lg text-sm 
  placeholder:text-[#ccccd0]/40 outline-none transition-colors duration-200 ${
    error
      ? "border-red-500 focus:border-red-400"
      : "border-[#272727] focus:border-[#6bd41a]"
  }`;
}

// ── NumberInput ───────────────────────────────────────────────────────────────
// Renders a text input that only accepts digits, hides browser spin arrows,
// and shows a validation error on blur.

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
    // Strip any non-digit characters so only numbers get through
    const numeric = e.target.value.replace(/\D/g, "");
    onChange(numeric);
    // Clear inline blur error while typing
    if (blurError) setBlurError(null);
  }

  function handleBlur() {
    if (value.trim() === "") {
      setBlurError(null); // Let the parent's required validation handle empty
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
        // Use "text" + inputMode so we keep full control and hide spin buttons
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className={input(combinedError)}
        placeholder={placeholder}
        // Belt-and-suspenders: hide arrows via inline style for browsers that
        // ignore the Tailwind [appearance:none] utility on number inputs
        style={{ MozAppearance: "textfield" } as React.CSSProperties}
      />
      {combinedError && (
        <p className="text-xs text-red-400 mt-1">{combinedError}</p>
      )}
    </div>
  );
}

// ── UrlInput ──────────────────────────────────────────────────────────────────
// Renders a URL input that validates the value on blur and shows an error if
// the entered text is not a well-formed URL.

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
      setBlurError(null); // Let parent required validation handle empty
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