// src/components/landing/CtaStrip.tsx
"use client";
import Link from "next/link";
import { useLocale } from "next-intl";
import FadeInView from "../FadeInView";

export default function CtaStrip() {
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <section
      className="w-full py-16 text-center"
      style={{ background: "#6bd41a" }}>
      <FadeInView>
        <h2
          className="font-display font-black text-white uppercase mb-4"
          style={{
            fontSize: "clamp(1.8rem, 3vw, 3rem)",
            letterSpacing: "0.03em",
          }}>
          {isAr ? "مستعد لتصبح مونستر؟" : "READY TO BECOME A MONSTER?"}
        </h2>
        <p className="font-proxima text-white mb-8 txt-larger">
          {isAr
            ? "انضم للبرنامج وأثبت نفسك."
            : "Join the program and prove your performance."}
        </p>
        <Link
          href={`/${locale}/submissions/register`}
          className="inline-flex items-center justify-center h-12 px-12 bg-black text-white font-display font-black uppercase tracking-[2px] txt-small hover:bg-[#111] transition-colors">
          {isAr ? "انضم الآن" : "Join Now"}
        </Link>
      </FadeInView>
    </section>
  );
}
