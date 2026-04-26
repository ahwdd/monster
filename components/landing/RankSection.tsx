// src/components/landing/RanksSection.tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { LANDING_RANKS } from "@/lib/data/program";
import OutlinedParaBtn from "../ui/OutlinedParaBtn";

const CYCLE_MS = 2800;

export default function RanksSection() {
  const locale = useLocale();
  const [active, setActive] = useState(-1);
  const [revealed, setRevealed] = useState(-1);

  useEffect(() => {
    const timers = [
      setTimeout(() => setRevealed(0), 600),
      setTimeout(() => setRevealed(1), 1400),
      setTimeout(() => setRevealed(2), 2200),
      setTimeout(() => setActive(0), 3000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (active === -1) return;
    const id = setInterval(
      () => setActive((a) => (a + 1) % LANDING_RANKS.length),
      CYCLE_MS,
    );
    return () => clearInterval(id);
  }, [active]);

  // Positions for desktop: Rookie=left/bottom, Rising=left/mid, Cold=right/top
  const desktopPos = [
    { side: "left", yPct: "72%" },
    { side: "left", yPct: "44%" },
    { side: "right", yPct: "18%" },
  ];

  return (
    <section className="w-full bg-[#050505] py-12 md:py-16 overflow-hidden relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 50% 60%, rgba(120,190,32,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Title */}
      <div className="text-center mb-8 md:mb-10 px-4">
        <p className="font-proxima font-semibold uppercase tracking-[0.3em] text-[#78be20] txt-larger mb-2">
          {locale === "ar" ? "نظام التصنيف" : "Leveling System"}
        </p>
        <h2
          className="font-display font-black text-white uppercase leading-none mb-6"
          style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
          {locale === "ar" ? (
            <>
              ارتقِ عبر <span className="text-accent">التصنيفات</span>
            </>
          ) : (
            <>
              RISE THROUGH THE <span className="text-accent">RANKS</span>
            </>
          )}
        </h2>

        <OutlinedParaBtn href={`/ranks`} withBorder>
          {locale === "ar" ? "عرض جميع التصنيفات" : "VIEW ALL RANKS"}
        </OutlinedParaBtn>
      </div>

      {/* ── Desktop layout: can + floating labels ── */}
      <div
        className="hidden md:block relative mx-auto max-w-4xl px-6"
        style={{ minHeight: "520px" }}>
        {/* Can */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 flex items-center justify-center"
          style={{ width: "320px" }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            className="relative w-full"
            style={{ height: "500px" }}>
            <Image
              src="/assets/program/monster-ranking.png"
              alt="Monster Ranks"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </motion.div>
        </div>

        {/* Floating rank labels */}
        {LANDING_RANKS.map((rank, i) => {
          const pos = desktopPos[i];
          const isActive = active === i;
          const isShown = revealed >= i;
          const isLeft = pos.side === "left";

          return (
            <AnimatePresence key={rank.id}>
              {isShown && (
                <motion.div
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  className={`absolute flex items-center gap-3 ${
                    isLeft
                      ? "ltr:right-[52%] rtl:left-[52%] ltr:flex-row-reverse rtl:flex-row text-end"
                      : "ltr:left-[52%] rtl:right-[52%] text-start"
                  }`}
                  style={{ top: pos.yPct, transform: "translateY(-50%)" }}>
                  <motion.div
                    animate={{
                      width: isActive ? "48px" : "24px",
                      opacity: isActive ? 1 : 0.4,
                    }}
                    transition={{ duration: 0.3 }}
                    className="h-px shrink-0"
                    style={{ background: rank.color }}
                  />
                  <Link
                    href={`/ranks#${rank.id}`}
                    className="no-underline group block">
                    <motion.div
                      animate={{
                        borderColor: isActive
                          ? rank.color
                          : "rgba(63,63,70,0.5)",
                        boxShadow: isActive ? `0 0 24px ${rank.glow}` : "none",
                      }}
                      transition={{ duration: 0.4 }}
                      className="bg-[#0d0d0d] border rounded-xl px-5 py-3 min-w-45">
                      <p
                        className="font-display font-black uppercase text-xl leading-none mb-1"
                        style={{ color: rank.color }}>
                        {locale === "ar" ? rank.nameAr : rank.nameEn}
                      </p>
                      <p className="txt-smaller text-zinc-500 uppercase tracking-wider mb-2">
                        {locale === "ar" ? rank.reachAr : rank.reachEn}
                      </p>
                      <AnimatePresence>
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="txt-smaller text-zinc-400 leading-snug overflow-hidden">
                            {locale === "ar" ? rank.descAr : rank.descEn}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          );
        })}
      </div>

      {/* ── Mobile layout: can on top, cards stacked below ── */}
      <div className="md:hidden px-4">
        {/* Can centered */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto mb-6"
          style={{ width: "160px", height: "260px" }}>
          <Image
            src="/assets/program/monster-ranking.png"
            alt="Monster Ranks"
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
        </motion.div>

        {/* Rank cards — vertical stack, all visible */}
        <div className="space-y-3">
          {LANDING_RANKS.map((rank, i) => (
            <motion.div
              key={rank.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}>
              <Link
                href={`/ranks#${rank.id}`}
                className="block bg-[#0d0d0d] border rounded-xl p-4 no-underline"
                style={{ borderColor: `${rank.color}40` }}>
                <div className="flex items-center justify-between mb-2">
                  <p
                    className="font-display font-black uppercase text-xl leading-none"
                    style={{ color: rank.color }}>
                    {locale === "ar" ? rank.nameAr : rank.nameEn}
                  </p>
                  <span
                    className="txt-smaller font-bold px-2 py-0.5 rounded"
                    style={{
                      color: rank.color,
                      background: `${rank.color}18`,
                    }}>
                    {locale === "ar" ? rank.reachAr : rank.reachEn}
                  </span>
                </div>
                <p className="txt-small text-zinc-400 leading-snug">
                  {locale === "ar" ? rank.descAr : rank.descEn}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
