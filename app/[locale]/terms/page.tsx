// src/app/[locale]/terms/page.tsx
"use client";
import { useLocale, useTranslations } from "next-intl";
import { motion, useTransform } from "framer-motion";
import {
  IoCheckmarkCircle,
  IoCloseCircle,
  IoShieldCheckmarkOutline,
  IoDocumentTextOutline,
  IoArrowUpOutline,
  IoRemoveOutline,
  IoArrowDownOutline,
} from "react-icons/io5";
import { IoWarningOutline } from "react-icons/io5";
import { TERMS, REMOVAL_REASONS, PROGRESSION_RULES } from "@/lib/data/program";
import Header from "@/components/Header";
import CtaStrip from "@/components/landing/CtaStrip";
import PageTitle from "@/components/ui/PageTitle";

const EASE = [0.22, 1, 0.36, 1] as const;

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-proxima txt-smaller font-bold uppercase tracking-[3px] text-[#6bd41a] mb-3">
      {children}
    </p>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-display font-black text-white uppercase mb-8"
      style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.8rem)", letterSpacing: "0.03em" }}>
      {children}
    </h2>
  );
}

export default function TermsPage() {
  const locale = useLocale();
  const t = useTranslations("terms")
  const isAr = locale === "ar";

  return (
    <div className="bg-black">
      <Header />
      <section className="w-screen min-h-screen ">
        <PageTitle title={t("pageTitle")}/>
        <div className="mx-auto flex w-full max-w-lg justify-center flex-col gap-px">
          {TERMS.map((term, i)=>{
            return <div className="text-[#ccc] flex items-start gap-2">
              <span className="size-1 bg-[#ccc] rounded-full mt-3.5" />
              <p>{isAr?term.ar:term.en}</p>
            </div>
          })}
        </div>
      </section>
      <CtaStrip />
    </div>
  );
}