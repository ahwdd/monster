"use client";

// src/components/landing/HeroSection.tsx
import { useLocale, useTranslations } from "next-intl";
import Link   from "next/link";
import Image  from "next/image";
import { motion } from "framer-motion";
import { IoArrowForward, IoArrowBack } from "react-icons/io5";

export default function HeroSection() {
  const locale = useLocale();
  const isRTL  = locale === "ar";
  const Arrow  = isRTL ? IoArrowBack : IoArrowForward;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      {/* Background — dark gradient + green glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-br from-black via-[#0a0a0a] to-black" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 60% 50%, rgba(120,190,32,0.35) 0%, transparent 70%)",
          }}
        />
        {/* Scanline texture overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
          }}
        />
      </div>

      {/* Can image — right side */}
      <motion.div
        initial={{ opacity: 0, x: isRTL ? -80 : 80, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
        className="absolute ltr:right-0 rtl:left-0 top-1/2 -translate-y-1/2 z-10
          w-[45vw] max-w-140 min-w-55 ltr:translate-x-[10%] rtl:-translate-x-[10%]
          pointer-events-none select-none"
      >
        <Image
          src="/assets/program/ranks-can.png"
          alt="Monster Ranks"
          width={560}
          height={700}
          className="w-full h-auto object-contain drop-shadow-2xl"
          priority
        />
        {/* Glow beneath can */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-24 blur-3xl -z-10"
          style={{ background: "radial-gradient(ellipse, rgba(120,190,32,0.5) 0%, transparent 70%)" }}
        />
      </motion.div>

      {/* Text content — left side */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-16 py-32">
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="txt-small font-semibold uppercase tracking-[0.3em] text-[#78be20] mb-4"
          >
            {locale === "ar" ? "برنامج مونستر للسفراء" : "Monster Ambassadors Program"}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display font-black text-white uppercase leading-none mb-6"
            style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)", lineHeight: 0.95 }}
          >
            {locale === "ar" ? (
              <>
                كن <span className="text-[#78be20]">مونستر</span>
              </>
            ) : (
              <>
                BE A<br />
                <span className="text-[#78be20]">MONSTER</span>
              </>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="txt-regular text-zinc-400 leading-relaxed mb-8 max-w-md"
          >
            {locale === "ar"
              ? "برنامج تطوير لمدة 9 أشهر لصناع المحتوى وتوليد المحتوى في منطقة الشرق الأوسط وشمال أفريقيا. ارتقِ بتصنيفك وحقق مكافآت حقيقية."
              : "A 9-month development program for gaming content creators across MENA. Rise through the ranks. Earn real rewards. Unleash the beast within."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href={`/${locale}/submissions/register`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#78be20] hover:bg-[#8fd428]
                text-black font-display font-bold uppercase tracking-wider txt-regular
                rounded-sm transition-all duration-200 hover:shadow-[0_0_30px_rgba(120,190,32,0.4)]
                hover:-translate-y-0.5 group"
            >
              {locale === "ar" ? "سجّل الآن" : "REGISTER NOW"}
              <Arrow className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href={`/${locale}/program`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-transparent
                border border-zinc-700 hover:border-zinc-400 text-zinc-300 hover:text-white
                font-display font-bold uppercase tracking-wider txt-regular
                rounded-sm transition-all duration-200"
            >
              {locale === "ar" ? "تعرّف على البرنامج" : "LEARN MORE"}
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex gap-8 mt-12 pt-8 border-t border-zinc-800"
          >
            {[
              { val: "9",    label: locale === "ar" ? "أشهر" : "Months" },
              { val: "30",   label: locale === "ar" ? "صانع محتوى" : "Creators" },
              { val: "15M+", label: locale === "ar" ? "وصول" : "Reach" },
            ].map(({ val, label }) => (
              <div key={label}>
                <p className="font-display font-black text-white text-3xl leading-none">{val}</p>
                <p className="txt-smaller text-zinc-500 mt-1 uppercase tracking-wide">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-linear-to-t from-black to-transparent z-10 pointer-events-none" />
    </section>
  );
}