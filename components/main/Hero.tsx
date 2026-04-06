"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { useState, useEffect, useCallback, useRef } from "react";

const slides = [
  { key: "slide1", img: "/assets/hero/1.webp", titleKey: "slide1Title", href: "https://www.monsterenergy.com/en-us/energy-drinks/zero-sugar/ultra-punk-punch/" },
  { key: "slide2", img: "/assets/hero/2.webp", titleKey: "slide2Title", href: "https://www.monsterenergy.com/en-us/energy-drinks/monster-energy/lando-norris/" },
  { key: "slide3", img: "/assets/hero/3.webp", titleKey: "slide3Title", href: "https://www.monsterenergy.com/en-us/energy-drinks/juice-monster/voodoo-grape/" },
];

export default function Hero() {
  const t      = useTranslations("hero");
  const locale = useLocale();
  const isRTL  = locale === "ar";

  const [current,   setCurrent]   = useState(0);
  const [prev,      setPrev]      = useState<number | null>(null);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((index: number, dir: "next" | "prev") => {
    if (animating || index === current) return;
    setDirection(dir);
    setPrev(current);
    setCurrent(index);
    setAnimating(true);
  }, [animating, current]);

  const next      = useCallback(() => goTo((current + 1) % slides.length, isRTL ? "prev" : "next"), [current, goTo, isRTL]);
  const prevSlide = useCallback(() => goTo((current - 1 + slides.length) % slides.length, isRTL ? "next" : "prev"), [current, goTo, isRTL]);

  useEffect(() => {
    if (!animating) return;
    const id = setTimeout(() => { setPrev(null); setAnimating(false); }, 650);
    return () => clearTimeout(id);
  }, [animating]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 5000);
  }, [next]);

  useEffect(() => {
    timerRef.current = setInterval(next, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [next]);

  const handleNext = () => { next(); resetTimer(); };
  const handlePrev = () => { prevSlide(); resetTimer(); };
  const handleDot  = (i: number) => {
    if (i === current) return;
    goTo(i, i > current ? (isRTL ? "prev" : "next") : (isRTL ? "next" : "prev"));
    resetTimer();
  };

  const getSlideClass = (index: number) => {
    const isActive = index === current;
    const isPrev   = index === prev;
    const base = "absolute inset-0 w-full float-left -mr-full [backface-visibility:hidden] transition-transform duration-[600ms] ease-in-out";
    if (!animating) return `${base} ${isActive ? "block" : "hidden"}`;
    if (isActive)   return `${base} block ${direction === "next" ? "animate-slide-in-right" : "animate-slide-in-left"}`;
    if (isPrev)     return `${base} block ${direction === "next" ? "animate-slide-out-left"  : "animate-slide-out-right"}`;
    return `${base} hidden`;
  };

  return (
    <section className="hero hero-bg relative w-full mt-10 overflow-hidden">
      {/* ── Slides ── */}
      <div className="relative w-full overflow-hidden container aspect-video">
        {slides.map((slide, index) => (
          <div key={slide.key} className={getSlideClass(index)}>
            <Image
              src={slide.img}
              alt={t(slide.titleKey)}
              fill
              className={`object-cover object-center ${isRTL ? "-scale-x-100" : ""}`}
              priority={index === 0}
            />
          </div>
        ))}

        {/* ── Prev arrow (ltr: left / rtl: right) ── */}
        <button
          onClick={handlePrev}
          aria-label="Previous slide"
          className="absolute top-0 bottom-0 z-10 flex items-center px-2 sm:px-4 opacity-50 hover:opacity-100 
          transition-opacity duration-150 ltr:left-0 rtl:right-0 rtl:-scale-x-100"
        >
          <svg width="36" height="36" viewBox="0 0 48 48" className="sm:w-12 sm:h-12">
            <circle cx="24" cy="24" r="23" fill="black" fillOpacity="1" stroke="white" strokeOpacity="0.45" strokeWidth="1" />
            <polyline points="28,16 20,24 28,32" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* ── Next arrow (ltr: right / rtl: left) ── */}
        <button
          onClick={handleNext}
          aria-label="Next slide"
          className="absolute top-0 bottom-0 z-10 flex items-center px-2 sm:px-4 opacity-50 hover:opacity-100 
          transition-opacity duration-150 ltr:right-0 rtl:left-0  rtl:-scale-x-100"
        >
          <svg width="36" height="36" viewBox="0 0 48 48" className="sm:w-12 sm:h-12">
            <circle cx="24" cy="24" r="23" fill="black" fillOpacity="1" stroke="white" strokeOpacity="0.45" strokeWidth="1" />
            <polyline points="20,16 28,24 20,32" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* ── Bottom bar ── */}
        <div className="absolute bottom-0 ltr:left-0 rtl:right-0 right-0 z-10 flex items-end justify-between w-full">

          {/* CTA block */}
          <div className="relative bg-black py-2 sm:py-5 ltr:pl-4 ltr:sm:pl-7.5 ltr:pr-16 ltr:sm:pr-31.25 rtl:pr-4 rtl:sm:pr-7.5 rtl:pl-16 rtl:sm:pl-31.25">
            <p className="font-proxima font-bold text-white txt-small sm:txt-large m-0 line-clamp-1">
              {t(slides[current].titleKey)}
            </p>

            {/* SHOP NOW skewed button */}
            <a
              href={slides[current].href}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn absolute top-1/2 -translate-y-1/2 -skew-x-15 bg-[#3a5e00] p-[0_3px_3px_0] no-underline inline-block cursor-pointer z-10
              ltr:-right-14 ltr:sm:-right-23 rtl:-left-14 rtl:sm:-left-23"
            >
              <span className="bg-monster relative z-1 inline-block px-3 sm:px-6.25 pt-1.5 sm:pt-2.5 pb-1 sm:pb-1.25 text-white font-bold
              text-[14px] sm:text-[20px] uppercase tracking-[2px] whitespace-nowrap [text-shadow:0_0_5px_rgba(0,0,0,0.75)]">
                {t("shopNow")}
              </span>
            </a>
          </div>

          {/* Pagination dots */}
          <div className="flex items-center gap-2 sm:gap-3.75 pb-3 sm:pb-7.5 ltr:pr-3 ltr:sm:pr-6 rtl:pl-3 rtl:sm:pl-6">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => handleDot(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`w-8 sm:w-15 h-1.5 sm:h-2 border-0 cursor-pointer p-0 -skew-x-15 transition-all duration-300 ${i === current ? "bg-monster" : "bg-black border border-white/20"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}