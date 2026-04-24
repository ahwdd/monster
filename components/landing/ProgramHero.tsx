// src/components/landing/ProgramHero.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useState, useEffect, useCallback, useRef } from "react";

const SLIDES = [
  { key: "1", img: "/assets/hero/1.webp" },
  { key: "2", img: "/assets/hero/2.webp" },
  { key: "3", img: "/assets/hero/3.webp" },
];

export default function ProgramHero() {
  const locale = useLocale();
  const isAr   = locale === "ar";
  const [current,   setCurrent]   = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((i: number) => {
    if (animating || i === current) return;
    setAnimating(true);
    setCurrent(i);
    setTimeout(() => setAnimating(false), 600);
  }, [animating, current]);

  const next = useCallback(() => goTo((current + 1) % SLIDES.length), [current, goTo]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 5000);
  }, [next]);

  useEffect(() => {
    timerRef.current = setInterval(next, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [next]);

  return (
    // XD: 1920×1080 Slider group, bg white then image on top
    <section className="relative w-full mt-20 overflow-hidden bg-black"
      style={{ height: "calc(100vw * 1080 / 1920)", minHeight: "480px", maxHeight: "1080px" }}>

      {/* Slides */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.key}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}>
          <Image
            src={slide.img}
            alt=""
            fill
            className="object-cover object-center"
            style={{ filter: "brightness(0.45) saturate(0.4)" }}
            priority={i === 0}
          />
        </div>
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Content — XD positions: tag at top, "BE A MONSTER" center, subtitle below */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">

        {/* XD: "Monster Ambassadors Program" white small caps */}
        <p className="font-proxima text-white uppercase tracking-[0.3em] mb-4"
          style={{ fontSize: "clamp(11px, 1.2vw, 16px)" }}>
          {isAr ? "برنامج السفراء" : "Monster Ambassadors Program"}
        </p>

        {/* XD: "BE A MONSTER" — color #6bd41a, very large */}
        <h1
          className="font-display font-black uppercase leading-none mb-4"
          style={{
            fontSize:   "clamp(3rem, 8vw, 9rem)",
            color:      "#6bd41a",
            textShadow: "0 0 40px rgba(107,212,26,0.3)",
            letterSpacing: "-0.02em",
          }}>
          {isAr ? "كن مونستر" : "BE A MONSTER"}
        </h1>

        {/* XD: subtitle color #ccccd0 */}
        <p className="font-proxima text-[#ccccd0] max-w-xl leading-relaxed mb-8 hidden sm:block"
          style={{ fontSize: "clamp(13px, 1.2vw, 16px)" }}>
          {isAr
            ? "برنامج تطوير لصناع المحتوى لمدة 9 أشهر في منطقة MENA"
            : "A 9-month development program designed to position Monster Energy as a leading brand among gamers and content creators across the MENA region."}
        </p>

        {/* XD: two buttons side by side — dark bg, white text */}
        <div className="flex items-center gap-4">
          {/* Learn More — dark outlined */}
          <Link href={`/${locale}/program`}
            className="h-12 px-8 flex items-center font-display font-bold uppercase tracking-[2px]
              text-white border border-white/40 hover:border-white/80 hover:bg-white/10
              transition-colors text-sm">
            {isAr ? "تعرّف أكثر" : "Learn More"}
          </Link>
          {/* Join Now — XD: dark bg, white text */}
          <Link href={`/${locale}/submissions/register`}
            className="h-12 px-8 flex items-center font-display font-bold uppercase tracking-[2px]
              bg-[#6bd41a] text-black hover:bg-[#7de020] transition-colors text-sm">
            {isAr ? "انضم الآن" : "Join Now"}
          </Link>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={() => { goTo((current - 1 + SLIDES.length) % SLIDES.length); resetTimer(); }}
        className="absolute top-1/2 -translate-y-1/2 left-6 z-30 w-10 h-10 flex items-center
          justify-center text-white/60 hover:text-white transition-colors">
        <svg width="32" height="32" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="15" fill="black" fillOpacity="0.5" stroke="white" strokeOpacity="0.3" strokeWidth="1" />
          <polyline points="19,10 13,16 19,22" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        onClick={() => { next(); resetTimer(); }}
        className="absolute top-1/2 -translate-y-1/2 right-6 z-30 w-10 h-10 flex items-center
          justify-center text-white/60 hover:text-white transition-colors">
        <svg width="32" height="32" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="15" fill="black" fillOpacity="0.5" stroke="white" strokeOpacity="0.3" strokeWidth="1" />
          <polyline points="13,10 19,16 13,22" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* XD dots — bottom center, skewed rectangles */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => { goTo(i); resetTimer(); }}
            className="-skew-x-15 transition-all duration-300"
            style={{
              width:      i === current ? "48px" : "24px",
              height:     "6px",
              background: i === current ? "#6bd41a" : "rgba(255,255,255,0.3)",
            }}
          />
        ))}
      </div>
    </section>
  );
}