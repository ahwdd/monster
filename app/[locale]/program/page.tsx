"use client";

// src/app/[locale]/program/page.tsx
import { useLocale } from "next-intl";
import Link          from "next/link";
import Image         from "next/image";
import { motion }    from "framer-motion";
import { IoCheckmarkCircle, IoArrowForward, IoArrowBack, IoGiftOutline, IoDocumentTextOutline } from "react-icons/io5";
import {
  RANK_DETAILS,
  REWARD_PACKS,
  PROGRAM_TIMELINE,
  CONTENT_APPROVAL_TYPES,
  SELECTION_PHASES,
  TRACKING_RULES,
  TERMS,
} from "@/lib/data/program";

export default function ProgramPage() {
  const locale = useLocale();
  const isRTL  = locale === "ar";
  const Arrow  = isRTL ? IoArrowBack : IoArrowForward;

  // Only the main 3 ranks for the leveling section (exclude UNRANKED detail)
  const mainRanks = RANK_DETAILS.filter((r) => r.id !== "unranked");

  return (
    <div className="min-h-screen bg-black">
      {/* Hero strip */}
      <div className="pt-20 pb-16 relative overflow-hidden bg-[#050505] border-b border-zinc-900">
        <div className="absolute inset-0 opacity-10"
          style={{ background: "radial-gradient(ellipse 60% 80% at 50% 100%, #78be20, transparent)" }} />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <p className="txt-small font-semibold uppercase tracking-[0.3em] text-[#78be20] mb-4">
            {locale === "ar" ? "نظرة عامة" : "Program Overview"}
          </p>
          <h1 className="font-display font-black text-white uppercase text-5xl md:text-6xl leading-none mb-6">
            {locale === "ar" ? "برنامج مونستر\nللسفراء" : "MONSTER\nAMBASSADORS"}
          </h1>
          <p className="txt-regular text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            {locale === "ar"
              ? "برنامج تطوير لمدة 9 أشهر مصمم لتموضع مونستر إنرجي كعلامة رائدة بين لاعبي الجذب الشعبي وصناع المحتوى في منطقة MENA. كل شهر، ينضم 5 مؤثرين صغار، ليصل مجموع الفريق إلى 30 صانع محتوى بنهاية البرنامج."
              : "A 9-month development program designed to position Monster Energy as a leading brand among grassroots gamers and content creators across the MENA Region. Each month, 5 micro-influencers join, forming a squad of 30 creators by the end of the program."}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link href={`/${locale}/submissions/register`}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#78be20] hover:bg-[#8fd428]
                text-black font-display font-bold uppercase tracking-wider txt-small rounded-sm
                transition-all duration-200 hover:shadow-[0_0_20px_rgba(120,190,32,0.4)] group">
              {locale === "ar" ? "سجّل الآن" : "Register Now"}
              <Arrow className="size-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link href={`/${locale}/ranks`}
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-zinc-700
                hover:border-zinc-400 text-zinc-300 hover:text-white font-display font-bold
                uppercase tracking-wider txt-small rounded-sm transition-colors duration-200">
              {locale === "ar" ? "التصنيفات" : "View Ranks"}
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-20 space-y-24">

        {/* Leveling system */}
        <section>
          <SectionLabel en="Leveling System" ar="نظام التصنيف" locale={locale} />
          <h2 className="font-display font-black text-white uppercase text-3xl md:text-4xl mb-8">
            {locale === "ar" ? "ارتقِ عبر التصنيفات" : "RISE THROUGH THE RANKS"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="txt-regular text-zinc-400 leading-relaxed mb-6">
                {locale === "ar"
                  ? "كل تصنيف يُكتسب — لا ترقيات تلقائية. تُثبت ثباتك، تحقق أهداف الوصول، ويقوم الفريق بترقيتك. عداد المشاهدات يعود إلى الصفر عند كل تصنيف جديد."
                  : "Every rank is earned — no automatic upgrades. You prove consistency, hit your reach targets, and the team ranks you up. The views counter resets to 0 at each new level."}
              </p>
              {mainRanks.map((rank) => (
                <div key={rank.id} className="flex items-center gap-3 py-2.5 border-b border-zinc-800 last:border-0">
                  <span style={{ color: rank.color }} className="font-bold shrink-0">✦</span>
                  <span className="txt-small text-zinc-300">
                    {locale === "ar" ? rank.nameAr : rank.nameEn}
                    {" — "}
                    {locale === "ar" ? rank.reachAr : rank.reachEn}
                  </span>
                </div>
              ))}
            </div>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 opacity-30 blur-3xl pointer-events-none"
                style={{ background: "radial-gradient(ellipse, #78be20, transparent 70%)" }} />
              <Image src="/assets/program/ranks-can.png" alt="Monster Ranks"
                width={380} height={480} className="relative z-10 drop-shadow-2xl w-full max-w-xs md:max-w-sm" />
            </div>
          </div>
        </section>

        {/* Selection process */}
        <section>
          <SectionLabel en="Selection Process" ar="عملية الاختيار" locale={locale} />
          <h2 className="font-display font-black text-white uppercase text-3xl md:text-4xl mb-8">
            {locale === "ar" ? "كيف يتم الاختيار" : "HOW SELECTION WORKS"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SELECTION_PHASES.map((p, i) => (
              <motion.div key={p.phase}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-6">
                <span className="txt-smaller font-bold uppercase tracking-wider text-[#78be20] bg-[#78be20]/10 px-2 py-0.5 rounded-sm mb-3 inline-block">
                  {p.phase}
                </span>
                <h3 className="font-display font-bold text-white uppercase txt-larger mb-2">
                  {locale === "ar" ? p.titleAr : p.titleEn}
                </h3>
                <p className="txt-small text-zinc-500 leading-relaxed">
                  {locale === "ar" ? p.descAr : p.descEn}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Content approval */}
        <section>
          <SectionLabel en="Content Approval" ar="اعتماد المحتوى" locale={locale} />
          <h2 className="font-display font-black text-white uppercase text-3xl md:text-4xl mb-8">
            {locale === "ar" ? "ما يُحتسب كمحتوى مونستر" : "WHAT COUNTS AS MONSTER CONTENT"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CONTENT_APPROVAL_TYPES.map((ct, i) => (
              <motion.div key={ct.en}
                initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex gap-4 bg-[#0a0a0a] border border-zinc-800 rounded-xl p-4">
                <span className="w-2 bg-[#78be20] rounded-full shrink-0" />
                <div>
                  <p className="font-semibold text-white txt-small uppercase mb-1">
                    {locale === "ar" ? ct.ar : ct.en}
                  </p>
                  <p className="txt-smaller text-zinc-500">
                    {locale === "ar" ? ct.descAr : ct.descEn}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Rewards */}
        <section>
          <SectionLabel en="Rewards" ar="المكافآت" locale={locale} />
          <h2 className="font-display font-black text-white uppercase text-3xl md:text-4xl mb-8">
            {locale === "ar" ? "ما تربحه" : "WHAT YOU EARN"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REWARD_PACKS.map((rw, i) => (
              <motion.div key={rw.titleEn}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-0.5" style={{ background: rw.color }} />
                <div className="flex items-center gap-2 mb-5">
                  <IoGiftOutline className="size-5" style={{ color: rw.color }} />
                  <h3 className="font-display font-bold text-white uppercase txt-larger">
                    {locale === "ar" ? rw.titleAr : rw.titleEn}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {(locale === "ar" ? rw.itemsAr : rw.itemsEn).map((item) => (
                    <li key={item} className="flex items-center gap-2 txt-small text-zinc-400">
                      <IoCheckmarkCircle className="size-4 shrink-0" style={{ color: rw.color }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Grand prize */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="mt-6 relative rounded-2xl overflow-hidden border border-[#38bdf8]/30 bg-[#38bdf8]/5 p-8 text-center">
            <div className="absolute inset-0 opacity-10 pointer-events-none"
              style={{ background: "radial-gradient(ellipse, #38bdf8, transparent 70%)" }} />
            <p className="txt-smaller font-semibold uppercase tracking-[0.3em] text-[#38bdf8] mb-2">
              {locale === "ar" ? "الجائزة الكبرى" : "Grand Prize"}
            </p>
            <h3 className="font-display font-black text-white uppercase text-2xl md:text-3xl mb-3">
              {locale === "ar" ? "3 ملايين مشاهدة = كريدت PC كامل" : "3M VIEWS = FULL PC CREDIT"}
            </h3>
            <p className="txt-small text-zinc-400">
              {locale === "ar"
                ? "بمجرد وصول كولد مونستر إلى 3 ملايين مشاهدة، يحصل على رصيد كامل لجهاز PC من متجر AHW."
                : "Once a Cold Monster reaches 3M views, they will get a full PC worth of credit on the AHW store."}
            </p>
          </motion.div>
        </section>

        {/* Tracking */}
        <section>
          <SectionLabel en="Tracking & Validation" ar="المتابعة والتحقق" locale={locale} />
          <h2 className="font-display font-black text-white uppercase text-3xl md:text-4xl mb-8">
            {locale === "ar" ? "كيف يُتتبَّع أداؤك" : "HOW YOUR PERFORMANCE IS TRACKED"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TRACKING_RULES.map((item) => (
              <div key={item.en} className="flex items-start gap-3 bg-[#0a0a0a] border border-zinc-800 rounded-xl p-4">
                <IoCheckmarkCircle className="size-4 text-[#78be20] shrink-0 mt-0.5" />
                <span className="txt-small text-zinc-300">{locale === "ar" ? item.ar : item.en}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section>
          <SectionLabel en="Program Timeline" ar="الجدول الزمني" locale={locale} />
          <h2 className="font-display font-black text-white uppercase text-3xl md:text-4xl mb-8">
            {locale === "ar" ? "خريطة الطريق" : "THE ROAD MAP"}
          </h2>
          <div className="relative">
            <div className="absolute ltr:left-[2.1rem] rtl:right-[2.1rem] top-0 bottom-0 w-px bg-zinc-800" />
            <div className="space-y-6">
              {PROGRAM_TIMELINE.map((item, i) => (
                <motion.div key={item.month}
                  initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-6">
                  <div className="shrink-0 w-16 h-16 rounded-xl bg-[#0a0a0a] border border-zinc-800 flex items-center justify-center relative z-10">
                    <span className="font-display font-black text-[#78be20] txt-small">{item.month}</span>
                  </div>
                  <div className="flex-1 bg-[#0a0a0a] border border-zinc-800 rounded-xl p-4">
                    <p className="font-display font-bold text-white uppercase txt-small mb-1">
                      {locale === "ar" ? item.titleAr : item.titleEn}
                    </p>
                    <p className="txt-smaller text-zinc-500">
                      {locale === "ar" ? item.descAr : item.descEn}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Terms */}
        <section>
          <SectionLabel en="Terms & Conditions" ar="الشروط والأحكام" locale={locale} />
          <div className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <IoDocumentTextOutline className="size-5 text-[#78be20]" />
              <h2 className="font-display font-bold text-white uppercase txt-larger">
                {locale === "ar" ? "الشروط والأحكام" : "Terms & Conditions"}
              </h2>
            </div>
            <ul className="space-y-3">
              {TERMS.map((item) => (
                <li key={item.en} className="flex items-start gap-3 txt-small text-zinc-400">
                  <IoCheckmarkCircle className="size-4 text-[#78be20] shrink-0 mt-0.5" />
                  {locale === "ar" ? item.ar : item.en}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Final CTA */}
        <div className="text-center py-12 border-t border-zinc-800">
          <p className="font-display font-black text-white uppercase text-3xl md:text-4xl mb-4">
            {locale === "ar" ? "مستعد لتكون مونستر؟" : "READY TO BE A MONSTER?"}
          </p>
          <p className="txt-regular text-zinc-500 mb-8">
            {locale === "ar" ? "لا مكافآت مضمونة — كل شيء يُكتسب." : "No guaranteed rewards — everything is earned."}
          </p>
          <Link href={`/${locale}/submissions/register`}
            className="inline-flex items-center gap-2 px-10 py-4 bg-[#78be20] hover:bg-[#8fd428]
              text-black font-display font-bold uppercase tracking-wider txt-regular
              rounded-sm transition-all duration-200 hover:shadow-[0_0_30px_rgba(120,190,32,0.4)]
              hover:-translate-y-0.5 group">
            {locale === "ar" ? "سجّل الآن" : "REGISTER NOW"}
            <Arrow className="size-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function SectionLabel({ en, ar, locale }: { en: string; ar: string; locale: string }) {
  return (
    <p className="txt-smaller font-semibold uppercase tracking-[0.3em] text-[#78be20] mb-3">
      {locale === "ar" ? ar : en}
    </p>
  );
}