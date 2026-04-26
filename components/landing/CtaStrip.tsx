// src/components/landing/CtaStrip.tsx
"use client";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import FadeInView from "../animation/FadeInView";

export default function CtaStrip() {
  const locale = useLocale();
  const t = useTranslations("hero");
  const isAr = locale === "ar";

  return (
    <section className="w-full py-28 lg:py-36 px-4 lg:px-35 relative">
      <div className="container px-4 lg:px-8">
        <FadeInView>
          <div
            className="relative flex items-center justify-between gap-2 lg:gap-6 rounded-lg 
            px-8 lg:px-14 py-5 lg:py-6 min-h-40 max-lg:flex-wrap"
            style={{
              background: isAr
                ? "linear-gradient(to left, #22bb39 0%, #bfec1d 60%, #d4ff00 100%)"
                : "linear-gradient(to right, #22bb39 0%, #bfec1d 60%, #d4ff00 100%)",
            }}>
            {/* Left — text */}
            <div className="relative z-10 max-w-md">
              <h2 className="font-display header-regular font-black text-white uppercase leading-none mb-2">
                {isAr ? "مستعد لتصبح مونستر؟" : "READY TO BECOME A MONSTER?"}
              </h2>
              <p className="font-proxima text-white/80 txt-larger">
                {isAr
                  ? "انضم للبرنامج وأثبت نفسك."
                  : "Join the program and prove your performance."}
              </p>
            </div>

            {/* Centre — can image */}
            <img
              src="/assets/flavors/can.png"
              alt="Monster Energy can"
              className={` absolute left-4/7 -translate-x-1/2 h-56 lg:h-80 object-contain
                drop-shadow-2xl pointer-events-none select-none max-xl:hidden
                ${isAr ? "-rotate-20" : "rotate-20"}`}
            />

            {/* Right — button */}
            <div className="relative z-10">
              <Link
                href={`/submissions/register`}
                className="bg-white text-black -skew-x-12 px-4 py-2 block">
                <span className="txt-huge font-display font-semibold tracking-wide skew-x-12 block">
                  {isAr ? "انضم الآن" : "JOIN NOW"}
                </span>
              </Link>
            </div>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
