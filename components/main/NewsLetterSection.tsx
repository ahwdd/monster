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
    <section className="relative overflow-hidden py-[8%] sm:py-[10%]">

      {/* Background — flipped on RTL */}
      <Image
        src="/assets/newsletter/bg.webp"
        alt=""
        fill
        className={`object-cover object-center z-1 ${isAr ? "-scale-x-100" : ""}`}
        priority
      />

      {/* Overlay so text stays legible */}
      <div className="absolute inset-0 z-1 bg-black/30" />

      {/* Content wrapper */}
      <div className="relative z-2 max-w-400 w-full mx-auto px-4 sm:px-8 lg:px-15
        flex flex-col sm:items-end sm:justify-end sm:text-start">

        <div className="w-full sm:max-w-118.75 sm:ms-auto">

          {/* Title */}
          <h2 className="font-display font-medium header-huge uppercase mb-4 sm:mb-5 text-white leading-tight">
            {isAr ? (
              <>{t("titleLine1Ar")} <span className="text-[#6bd41a]">{t("titleAccentAr")}</span></>
            ) : (
              <>UNLEASH THE <span className="text-[#6bd41a]">BEAST</span></>
            )}
          </h2>

          {/* Description */}
          <p className="font-proxima txt-larger sm:txt-huge font-normal not-italic text-[#b6b6b6] mb-6 sm:mb-7.5 p-0">
            {t("desc")}
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="w-full">
            <div className="relative bg-[linear-gradient(90deg,#bff10f,#22bb3a)] p-0.5 rounded-lg mb-2.5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("placeholder")}
                className="txt-regular sm:header-smaller text-start rounded-lg bg-black text-white w-full border-0 py-3 sm:py-3.5 ps-4 sm:ps-5.25 pe-12 sm:pe-16.25 outline-none placeholder:text-gray-500 font-proxima"
              />
              <button
                type="submit"
                className="absolute top-1/2 -translate-y-1/2 inset-e-4 cursor-pointer h-6 w-9 flex items-center justify-center text-white hover:text-[#6bd41a] transition-colors"
                aria-label={t("submit")}
              >
                {isAr ? <IoArrowBack className="w-5 h-5" /> : <IoArrowForward className="w-5 h-5" />}
              </button>
            </div>
          </form>

          {/* Feedback */}
          <div className="relative min-h-16 sm:min-h-25">
            <div className={`font-proxima font-normal not-italic txt-regular text-[#ec8690] border border-[#851f2b] bg-[#2d0b0e] py-2 px-3.5 rounded text-center mb-4 transition-[opacity,transform] duration-300 ease-out ${
              showError ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2.5 pointer-events-none"
            }`}>
              {error}
            </div>
            <p className={`font-proxima font-normal not-italic txt-larger sm:txt-huge text-[#b6b6b6] m-0 transition-[opacity,transform] duration-300 ease-out ${
              submitted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2.5 pointer-events-none"
            }`}>
              {t("success")}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}