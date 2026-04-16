// src/components/landing/ProgramHero.tsx
"use client";
import Image from "next/image";
import Link  from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { useState, useEffect, useCallback, useRef } from "react";

const slides = [
  { key: "slide1", img: "/assets/hero/1.webp", titleKey: "slide1Title" },
  { key: "slide2", img: "/assets/hero/2.webp", titleKey: "slide2Title" },
  { key: "slide3", img: "/assets/hero/3.webp", titleKey: "slide3Title" },
];

export default function ProgramHero() {
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
    setDirection(dir); setPrev(current); setCurrent(index); setAnimating(true);
  }, [animating, current]);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length, isRTL ? "prev" : "next");
  }, [current, goTo, isRTL]);

  const prevSlide = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length, isRTL ? "next" : "prev");
  }, [current, goTo, isRTL]);

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
    <section className="hero hero-bg relative w-full mt-16 md:mt-10 overflow-hidden">
      {/* On mobile use min-h; on desktop use aspect-video */}
      <div className="relative w-full overflow-hidden container min-h-[56vw] md:aspect-video">
        {slides.map((slide, index) => (
          <div key={slide.key} className={getSlideClass(index)}>
            <Image src={slide.img} alt={t(slide.titleKey)} fill
              className="object-cover object-center"
              style={{ filter: "saturate(0.3) brightness(0.55)" }}
              priority={index === 0} />
          </div>
        ))}

        <div className="absolute inset-0 bg-black/50 z-1" />

        <div className="absolute inset-0 z-2 flex flex-col items-center justify-center text-center pointer-events-none px-4">
          <p className="font-proxima font-semibold uppercase tracking-[0.3em] text-[#78be20] txt-small md:txt-larger mb-2 md:mb-3">
            {locale === "ar" ? "برنامج السفراء" : "Monster Ambassadors Program"}
          </p>
          <h1 className="font-display font-black text-white uppercase leading-none mb-3 md:mb-5"
            style={{ fontSize: "clamp(2rem, 6vw, 6rem)", textShadow: "0 2px 30px rgba(0,0,0,0.9)" }}>
            {locale === "ar"
              ? <>كن <span className="text-[#78be20]">مونستر</span></>
              : <>BE A <span className="text-[#78be20]">MONSTER</span></>
            }
          </h1>
          <p className="font-proxima text-zinc-300 max-w-lg txt-small md:txt-regular leading-relaxed hidden sm:block">
            {locale === "ar"
              ? "برنامج تطوير لصناع المحتوى لمدة 9 أشهر في منطقة MENA"
              : "A 9-month content creator development program across MENA."}
          </p>

          <Link href={`/${locale}/submissions/register`}
            className="mt-4 md:hidden inline-block -skew-x-6 bg-[#3a5e00] p-[0_3px_3px_0]">
            <span className="bg-monster inline-block px-5 py-2 text-white font-display font-bold text-sm uppercase tracking-[2px] skew-x-6">
              {locale === "ar" ? "سجّل الآن" : "Register Now"}
            </span>
          </Link>
        </div>

        {/* Arrows */}
        <button onClick={handlePrev} aria-label="Previous"
          className={`absolute top-0 bottom-0 z-3 flex items-center px-2 md:px-4 opacity-50 hover:opacity-100 transition-opacity ${isRTL ? "right-0" : "left-0"}`}>
          <svg width="36" height="36" className="md:w-12 md:h-12" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="23" fill="black" fillOpacity="1" stroke="white" strokeOpacity="0.45" strokeWidth="1" />
            {isRTL
              ? <polyline points="20,16 28,24 20,32" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              : <polyline points="28,16 20,24 28,32" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />}
          </svg>
        </button>
        <button onClick={handleNext} aria-label="Next"
          className={`absolute top-0 bottom-0 z-3 flex items-center px-2 md:px-4 opacity-50 hover:opacity-100 transition-opacity ${isRTL ? "left-0" : "right-0"}`}>
          <svg width="36" height="36" className="md:w-12 md:h-12" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="23" fill="black" fillOpacity="1" stroke="white" strokeOpacity="0.45" strokeWidth="1" />
            {isRTL
              ? <polyline points="28,16 20,24 28,32" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              : <polyline points="20,16 28,24 20,32" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />}
          </svg>
        </button>

        {/* Bottom bar — hidden on mobile, visible md+ */}
        <div className="absolute bottom-0 left-0 right-0 z-3 hidden md:flex items-end justify-between">
          <div className="relative bg-black py-5 pl-7.5 pr-31.25 float-left">
            <p className="font-proxima font-bold text-white txt-large m-0">
              {locale === "ar" ? "انضم إلى أفضل صناع المحتوى في MENA" : "Join the top gaming content creators in MENA"}
            </p>
            <Link href={`/${locale}/submissions/register`}
              className="cta-btn absolute top-1/2 -right-23 -translate-y-1/2 -skew-x-15 bg-[#3a5e00] p-[0_3px_3px_0] no-underline inline-block cursor-pointer z-10">
              <span className="bg-monster relative z-1 inline-block px-6.25 pt-2.5 pb-1.25 text-white font-display font-bold text-[20px] uppercase tracking-[2px] whitespace-nowrap [text-shadow:0_0_5px_rgba(0,0,0,0.75)]">
                {locale === "ar" ? "سجّل الآن" : "Register Now"}
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-3.75 pb-7.5 pr-6">
            {slides.map((_, i) => (
              <button key={i} onClick={() => handleDot(i)}
                className={`w-15 h-2 border-0 cursor-pointer p-0 -skew-x-15 transition-all duration-300 ${i === current ? "bg-monster" : "bg-black"}`} />
            ))}
          </div>
        </div>

        {/* Mobile dots */}
        <div className="absolute bottom-3 left-0 right-0 z-3 flex justify-center gap-2 md:hidden">
          {slides.map((_, i) => (
            <button key={i} onClick={() => handleDot(i)}
              className={`w-6 h-1.5 border-0 cursor-pointer p-0 -skew-x-15 transition-all duration-300 ${i === current ? "bg-monster" : "bg-zinc-700"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}