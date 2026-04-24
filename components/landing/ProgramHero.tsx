// src/components/landing/ProgramHero.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useState, useEffect, useCallback, useRef } from "react";
import OutlinedParaBtn from "../ui/OutlinedParaBtn";
import SolidParaBtn from "../ui/SolidParaBtn";

const SLIDES = [
  { key: "1", img: "/assets/textures/texture.webp" },
  { key: "2", img: "/assets/textures/texture.webp" },
  { key: "3", img: "/assets/textures/texture.webp" },
];

export default function ProgramHero() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const t = useTranslations("program");

  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (i: number) => {
      if (animating || i === current) return;
      setAnimating(true);
      setCurrent(i);
      setTimeout(() => setAnimating(false), 600);
    },
    [animating, current],
  );

  const next = useCallback(
    () => goTo((current + 1) % SLIDES.length),
    [current, goTo],
  );

  return (
    <section
      className="relative w-full mt-16 overflow-hidden hero-bg h-[calc(100vh-80px)] min-h-120 max-h-270">
      {/* Slides — images fade over the texture bg */}
      {SLIDES.map((slide, i) => (
        <div key={slide.key}
          className="absolute inset-0 transition-opacity duration-700 "
          style={{
            opacity: i === current ? 1 : 0,
            zIndex: i === current ? 1 : 0,
          }}>
          <Image
            src={slide.img} loading="eager"
            alt="" width={1900} height={960}
            className="object-cover size-full"
            priority={i === 0}
          />
        </div>
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
        <p
          className="font-proxima text-white uppercase tracking-[0.3em] mb-4"
          style={{ fontSize: "clamp(10px, 1.2vw, 13px)" }}>
          {t("heroTagline")}
        </p>

        <h1
          className="font-display header-larger  font-black uppercase leading-none mb-4"
          style={{
            letterSpacing: "-0.02em",
          }}>
            <span>{t("heroTitle")}</span> <span className="text-accent">{t("heroMonster")}</span>
          
        </h1>

        <p
          className="font-proxima text-[#ccccd0] max-w-100 leading-relaxed mb-8 hidden sm:block"
          style={{ fontSize: "clamp(13px, 1.2vw, 16px)" }}>
          {t("heroSub")}
        </p>

        <div className="flex items-center gap-4">
          <OutlinedParaBtn href={`/${locale}/program`} withBorder>
            {t("learnMore")}
          </OutlinedParaBtn>
          
          <SolidParaBtn href={`/${locale}/submissions/register`}>
            {t("joinNow")}
          </SolidParaBtn>
        </div>
      </div>

      {/* XD dots — bottom center, skewed rectangles */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => { goTo(i); }}
            className="-skew-x-15 transition-all duration-300 h-1.5"
            style={{
              width: i === current ? "48px" : "24px",
              background: i === current ? "#6bd41a" : "rgba(255,255,255,0.3)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
