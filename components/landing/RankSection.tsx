// src/components/landing/RanksSection.tsx
"use client";
import { useState, useEffect } from "react";
import Link       from "next/link";
import Image      from "next/image";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import SkewBtn    from "@/components/ui/SkewBtn";
import { LANDING_RANKS } from "@/lib/data/program";

// Show ranks sequentially: 0=Rookie, 1=Rising, 2=Cold, then repeat
const CYCLE_MS = 2800;

export default function RanksSection() {
  const locale  = useLocale();
  // -1 = idle (none shown yet), 0/1/2 = which rank is active
  const [active, setActive] = useState(-1);
  // 0 = only Rookie visible, 1 = Rookie+Rising, 2 = all three
  const [revealed, setRevealed] = useState(-1);

  useEffect(() => {
    // Stagger reveal: Rookie at 600ms, Rising at 1400ms, Cold at 2200ms
    const timers = [
      setTimeout(() => setRevealed(0), 600),
      setTimeout(() => setRevealed(1), 1400),
      setTimeout(() => setRevealed(2), 2200),
      // Then start cycling active highlight
      setTimeout(() => setActive(0), 3000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (active === -1) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % LANDING_RANKS.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [active]);

  // Rank order in the image: index 0=Rookie(bottom), 1=Rising(mid), 2=Cold(top)
  const rankPositions = [
    { side: "left",  yPct: "72%" }, // Rookie — bottom of can
    { side: "left",  yPct: "44%" }, // Rising  — middle
    { side: "right", yPct: "18%" }, // Cold    — top
  ];

  return (
    <section className="w-full bg-[#050505] py-16 overflow-hidden relative">
      {/* Subtle green glow behind can */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 80% at 50% 60%, rgba(120,190,32,0.07) 0%, transparent 70%)" }} />

      {/* Title */}
      <div className="text-center mb-10">
        <p className="font-proxima font-semibold uppercase tracking-[0.3em] text-[#78be20] txt-larger mb-2">
          {locale === "ar" ? "نظام التصنيف" : "Leveling System"}
        </p>
        <h2 className="font-display font-black text-[clamp(2.5rem,5vw,4rem)] uppercase leading-none mb-6 text-white">
          {locale === "ar"
            ? <>ارتقِ عبر <span className="text-accent">التصنيفات</span></>
            : <>RISE THROUGH THE <span className="text-accent">RANKS</span></>
          }
        </h2>
        <SkewBtn href={`/${locale}/ranks`}
          text={locale === "ar" ? "عرض جميع التصنيفات" : "VIEW ALL RANKS"} />
      </div>

      {/* Can + rank labels */}
      <div className="relative mx-auto max-w-4xl px-6" style={{ minHeight: "520px" }}>

        {/* Can image — centered */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 flex items-center justify-center"
          style={{ width: "320px" }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            className="relative w-full"
            style={{ height: "500px" }}
          >
            <Image src="/assets/program/monster-ranking.png" alt="Monster Ranks"
              fill className="object-contain drop-shadow-2xl" priority />
          </motion.div>
        </div>

        {/* Rank labels — positioned relative to can */}
        {LANDING_RANKS.map((rank, i) => {
          const pos       = rankPositions[i];
          const isActive  = active === i;
          const isShown   = revealed >= i;
          const isLeft    = pos.side === "left";

          return (
            <AnimatePresence key={rank.id}>
              {isShown && (
                <motion.div
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  className={`absolute flex items-center gap-3 ${isLeft ? "ltr:right-[52%] rtl:left-[52%] text-end ltr:flex-row-reverse rtl:flex-row" : "ltr:left-[52%] rtl:right-[52%] text-start"}`}
                  style={{ top: pos.yPct, transform: "translateY(-50%)" }}
                >
                  {/* Connector line */}
                  <motion.div
                    animate={{ width: isActive ? "48px" : "24px", opacity: isActive ? 1 : 0.4 }}
                    transition={{ duration: 0.3 }}
                    className="h-px shrink-0"
                    style={{ background: rank.color }}
                  />

                  {/* Card */}
                  <Link href={`/${locale}/ranks#${rank.id}`}
                    className="no-underline group block">
                    <motion.div
                      animate={{
                        borderColor: isActive ? rank.color : "rgba(63,63,70,0.5)",
                        boxShadow: isActive ? `0 0 24px ${rank.glow}` : "none",
                      }}
                      transition={{ duration: 0.4 }}
                      className="bg-[#0d0d0d] border rounded-xl px-5 py-3 min-w-45"
                    >
                      <p className="font-display font-black uppercase text-xl leading-none mb-1"
                        style={{ color: rank.color }}>
                        {locale === "ar" ? rank.nameAr : rank.nameEn}
                      </p>
                      <p className="txt-smaller text-zinc-500 uppercase tracking-wider mb-2">
                        {locale === "ar" ? rank.reachAr : rank.reachEn}
                      </p>

                      {/* Animated description — only when active */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="txt-smaller text-zinc-400 leading-snug overflow-hidden"
                          >
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

      {/* Bottom CTA */}
      <div className="text-center mt-8">
        <Link href={`/${locale}/program`}
          className="inline-flex items-center gap-2 txt-small font-proxima font-semibold uppercase tracking-[0.2em] text-zinc-400 hover:text-[#78be20] transition-colors duration-200">
          {locale === "ar" ? "← عن البرنامج" : "About the Program →"}
        </Link>
      </div>
    </section>
  );
}