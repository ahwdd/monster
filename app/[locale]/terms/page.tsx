// src/app/[locale]/terms/page.tsx
"use client";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { IoCheckmarkCircle, IoWarningOutline, IoShieldCheckmarkOutline } from "react-icons/io5";
import PageTitle from "@/components/ui/PageTitle";
import { TERMS, REMOVAL_REASONS, PROGRESSION_RULES } from "@/lib/data/program";
import FadeInView, { StaggerContainer, StaggerItem } from "@/components/FadeInView";
import Header from "@/components/Header";

export default function TermsPage() {
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <PageTitle title={isAr ? "الشروط والأحكام" : "Terms & Conditions"} />

      <div className="max-w-325 mx-auto px-6 py-16 space-y-16">

        {/* Introduction */}
        <FadeInView>
          <div className="border border-[#272727] p-8" style={{ background: "rgba(0,0,0,0.3)" }}>
            <div className="flex items-center gap-3 mb-4">
              <IoShieldCheckmarkOutline className="size-6 text-[#6bd41a]" />
              <h2 className="font-display font-black text-white uppercase txt-larger tracking-wider">
                {isAr ? "نظرة عامة" : "Overview"}
              </h2>
            </div>
            <p className="font-proxima txt-regular text-zinc-400 leading-relaxed">
              {isAr
                ? "بانضمامك إلى برنامج Monster Ambassadors، فإنك توافق على الالتزام بالشروط والأحكام التالية طوال فترة مشاركتك."
                : "By joining the Monster Ambassadors Program, you agree to comply with the following terms and conditions throughout your participation."}
            </p>
          </div>
        </FadeInView>

        {/* Main Terms */}
        <section>
          <FadeInView className="mb-8">
            <p className="txt-small font-bold uppercase tracking-[3px] text-[#6bd41a] mb-2">
              {isAr ? "الشروط العامة" : "General Terms"}
            </p>
            <h2
              className="font-display font-black text-white uppercase"
              style={{ fontSize: "clamp(1.8rem, 3vw, 3rem)" }}>
              {isAr ? "القواعد والالتزامات" : "RULES & OBLIGATIONS"}
            </h2>
          </FadeInView>

          <StaggerContainer className="space-y-3">
            {TERMS.map((item, i) => (
              <StaggerItem key={item.en}>
                <div
                  className="flex items-start gap-4 p-5"
                  style={{ border: "1px solid #272727", background: "rgba(0,0,0,0.2)" }}>
                  <span
                    className="shrink-0 w-8 h-8 flex items-center justify-center font-display font-black txt-small"
                    style={{ color: "#6bd41a", border: "1px solid #6bd41a30", background: "#6bd41a10" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex items-start gap-3 flex-1">
                    <IoCheckmarkCircle className="size-4 shrink-0 mt-0.5 text-[#6bd41a]" />
                    <p className="font-proxima txt-regular text-zinc-300 leading-relaxed">
                      {isAr ? item.ar : item.en}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* Level Progression Rules */}
        <section>
          <FadeInView className="mb-8">
            <p className="txt-small font-bold uppercase tracking-[3px] text-[#6bd41a] mb-2">
              {isAr ? "قواعد الترقية" : "Progression Rules"}
            </p>
            <h2
              className="font-display font-black text-white uppercase"
              style={{ fontSize: "clamp(1.8rem, 3vw, 3rem)" }}>
              {isAr ? "كيف يعمل نظام الترقية" : "HOW LEVELING WORKS"}
            </h2>
          </FadeInView>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { color: "#22bb39", icon: "↑", labelEn: "Level Up", labelAr: "ترقية", textEn: PROGRESSION_RULES.levelUpEn, textAr: PROGRESSION_RULES.levelUpAr },
              { color: "#bfec1d", icon: "—", labelEn: "Stay",     labelAr: "بقاء",   textEn: PROGRESSION_RULES.stayEn,    textAr: PROGRESSION_RULES.stayAr },
              { color: "#ef4444", icon: "↓", labelEn: "Level Down",labelAr: "هبوط",  textEn: PROGRESSION_RULES.levelDownEn, textAr: PROGRESSION_RULES.levelDownAr },
            ].map(({ color, icon, labelEn, labelAr, textEn, textAr }) => (
              <FadeInView key={labelEn}>
                <div
                  className="p-6 h-full"
                  style={{ border: `1px solid ${color}40`, background: `${color}08` }}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-display font-black text-2xl" style={{ color }}>{icon}</span>
                    <p className="font-display font-bold uppercase txt-larger" style={{ color }}>
                      {isAr ? labelAr : labelEn}
                    </p>
                  </div>
                  <p className="font-proxima txt-regular text-zinc-400 leading-relaxed">
                    {isAr ? textAr : textEn}
                  </p>
                </div>
              </FadeInView>
            ))}
          </div>

          <FadeInView delay={0.1} className="mt-4">
            <p className="txt-smaller text-zinc-500 italic">
              * {isAr ? PROGRESSION_RULES.resetNoteAr : PROGRESSION_RULES.resetNoteEn}
            </p>
          </FadeInView>
        </section>

        {/* Removal Rules */}
        <section>
          <FadeInView className="mb-8">
            <p className="txt-small font-bold uppercase tracking-[3px] text-red-400 mb-2">
              {isAr ? "قواعد الإقصاء" : "Removal Rules"}
            </p>
            <h2
              className="font-display font-black text-white uppercase"
              style={{ fontSize: "clamp(1.8rem, 3vw, 3rem)" }}>
              {isAr ? "متى يتم إقصاؤك" : "WHEN YOU GET REMOVED"}
            </h2>
          </FadeInView>

          <div
            className="p-8"
            style={{ border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.05)" }}>
            <div className="flex items-center gap-3 mb-6">
              <IoWarningOutline className="size-6 text-red-400" />
              <p className="font-display font-bold uppercase txt-larger text-red-400">
                {isAr ? "تحذير صارم" : "Strict Warning"}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {REMOVAL_REASONS.map((reason) => (
                <div key={reason.en} className="flex items-start gap-3">
                  <span className="txt-regular text-red-400 shrink-0 mt-0.5">✗</span>
                  <p className="font-proxima txt-regular text-zinc-300">
                    {isAr ? reason.ar : reason.en}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer note */}
        <FadeInView className="text-center pb-8">
          <p className="font-proxima txt-smaller text-zinc-600">
            {isAr
              ? "هذه الشروط خاضعة للتغيير. تحتفظ مونستر إنرجي بحق تعديلها في أي وقت."
              : "These terms are subject to change. Monster Energy reserves the right to modify them at any time."}
          </p>
        </FadeInView>
      </div>
    </div>
  );
}