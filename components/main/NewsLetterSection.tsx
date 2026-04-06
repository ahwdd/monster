"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { IoArrowForward, IoArrowBack } from "react-icons/io5";

export default function NewsletterSection() {
  const locale = useLocale();
  const t      = useTranslations("newsletter");
  const isAr   = locale === "ar";

  const [email,     setEmail]     = useState("");
  const [error,     setError]     = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showError, setShowError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(t("errorInvalid"));
      setShowError(true);
      return;
    }
    setShowError(false);
    setError("");
    setSubmitted(true);
  }

  return (
    <section className="relative overflow-hidden py-[10%]">

      {/* Background image */}
      <Image
        src="/assets/newsletter/bg.webp"
        alt=""
        fill
        className="absolute top-0 left-0 w-full h-full z-1 object-cover object-center rtl:-scale-x-100"
        priority
      />

      {/* Content wrapper */}
      <div className="relative z-2 max-w-400 w-full h-full mx-auto flex items-end justify-end text-left pe-15">

        <div className="max-w-118.75 ms-auto p-0">

          {/* Title */}
          <div className="font-medium header-huge uppercase mb-5 text-white">
            {isAr ? (
              <>
                {t("titleLine1Ar")}{" "}
                <span className="text-[#6bd41a]">{t("titleAccentAr")}</span>
              </>
            ) : (
              <>
                UNLEASH THE{" "}
                <span className="text-[#6bd41a]">BEAST</span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="font-proxima txt-huge font-normal not-italic text-[#b6b6b6] mb-7.5 p-0">
            {t("desc")}
          </p>

          {/* Form area */}
          <form onSubmit={handleSubmit} noValidate className="w-full">

            {/* Input row with gradient border */}
            <div className="relative block bg-[linear-gradient(90deg,#bff10f,#22bb3a)] p-0.5 rounded-lg mb-2.5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("placeholder")}
                className="header-smaller text-left rounded-lg bg-black text-white w-full border-0 py-3.5 ps-5.25 
                pe-16.25 outline-none placeholder:text-gray-500 font-proxima"
              />
              {/* Arrow button */}
              <button
                type="submit"
                className="absolute top-4.75 inset-e-4 cursor-pointer h-6 w-9 flex items-center justify-center text-white 
                hover:text-[#6bd41a] transition-colors"
                aria-label={t("submit")}
              >
                {isAr
                  ? <IoArrowBack  className="w-5 h-5" />
                  : <IoArrowForward className="w-5 h-5" />
                }
              </button>
            </div>

          </form>

          {/* Feedback area */}
          <div className="relative min-h-25">

            {/* Error message */}
            <div
              className={`font-normal not-italic txt-larger text-[#ec8690] border border-[#851f2b] bg-[#2d0b0e] 
                py-2 px-3.5 rounded text-center mt-0 mb-4 transition-[opacity,transform] duration-300 ease-out 
                ${showError
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-2.5 pointer-events-none"
                }`}
            >
              {error}
            </div>

            {/* Success message */}
            <p
              className={`font-normal not-italic txt-huge text-[#b6b6b6] m-0 transition-[opacity,transform] duration-300 ease-out ${
                submitted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2.5 pointer-events-none"
              }`}
            >
              {t("success")}
            </p>

          </div>

        </div>
      </div>
    </section>
  );
}