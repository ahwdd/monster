// src/components/landing/CtaStrip.tsx
"use client";
import Link from "next/link";
import { useLocale } from "next-intl";
import FadeInView from "../FadeInView";

export default function CtaStrip() {
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <section className="w-full text-center relative overflow-hidden">
      <div className="absolute size-full inset-x-0 top-14">
        <img
          src="/assets/textures/skew-texture.png"
          alt=""
          className="w-full object-cover"
        />
        <span
          className="absolute inset-0 bg-monster opacity-80 pointer-events-none"
          style={{
            WebkitMaskImage: "url(/assets/textures/skew-texture.png)",
            WebkitMaskSize: "cover",
            WebkitMaskRepeat: "no-repeat",
            maskImage: "url(/assets/textures/skew-texture.png)",
            maskSize: "cover",
            maskRepeat: "no-repeat",
          }}
        />
      </div>
      <FadeInView className="relative z-1 pt-40 md:pt-60 pb-16 md:pb-20 flex flex-col items-center justify-center px-4">
        <h2
          className="font-display font-black text-white uppercase mb-2"
          style={{
            fontSize: "clamp(1.6rem, 3vw, 3rem)",
            letterSpacing: "0.03em",
          }}>
          {isAr ? "مستعد لتصبح مونستر؟" : "READY TO BECOME A MONSTER?"}
        </h2>
        <p className="font-proxima text-white mb-1 txt-larger">
          <Link href={`/${locale}/submissions/register`}>
            {isAr
              ? "انضم للبرنامج وأثبت نفسك."
              : "Join the program and prove your performance."}
          </Link>
        </p>
      </FadeInView>
    </section>
  );
}
