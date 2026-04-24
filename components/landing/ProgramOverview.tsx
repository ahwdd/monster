// src/components/landing/ProgramOverview.tsx
"use client";
import Image from "next/image";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";

// XD sec1: stats show 5 New/Mo, 30 Creators, 9 Months in #6bd41a
const STATS = [
  { numEn: "9",  numAr: "٩",  labelEn: "Months",   labelAr: "أشهر" },
  { numEn: "30", numAr: "٣٠", labelEn: "Creators",  labelAr: "صانع محتوى" },
  { numEn: "5",  numAr: "٥",  labelEn: "New / Mo",  labelAr: "جديد / شهر" },
];

export default function ProgramOverview() {
  const locale = useLocale();
  const isAr   = locale === "ar";

  return (
    // XD sec1: bg #000000, full width, image on right ~720px wide
    <section className="w-full bg-black">
      <div className="max-w-480 mx-auto px-35 py-25
        grid grid-cols-2 gap-16 items-center">

        {/* Left: text + stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}>

          {/* XD: "PROGRAM OVERVIEW" — white, font-display */}
          <h2 className="font-display font-black text-white uppercase mb-6"
            style={{ fontSize: "clamp(2rem, 3.5vw, 4rem)", letterSpacing: "0.03em" }}>
            {isAr ? "نظرة عامة" : "PROGRAM OVERVIEW"}
          </h2>

          {/* XD: body text #ccccd0 */}
          <p className="font-proxima text-[#ccccd0] leading-relaxed mb-4"
            style={{ fontSize: "clamp(14px, 1.1vw, 16px)" }}>
            {isAr
              ? "برنامج السفراء من مونستر هو برنامج تطوير لمدة 9 أشهر مصمم لتعزيز مكانة مونستر إنرجي كعلامة رائدة بين الغيمرز وصناع المحتوى في منطقة MENA."
              : "Monster Ambassadors is a 9-month development program designed to position Monster Energy as a leading brand among grassroots gamers and content creators across the MENA region."}
          </p>
          <p className="font-proxima text-[#ccccd0] leading-relaxed mb-14"
            style={{ fontSize: "clamp(14px, 1.1vw, 16px)" }}>
            {isAr
              ? "يكتسب المشاركون الاعتراف بالعلامة، يوسّعون وصولهم، يبنون روابط قيّمة، ويحصلون على فرص المشاركة في فعاليات مونستر."
              : "Participants gain brand recognition, expand their reach, build valuable connections, and unlock opportunities to take part in Monster events."}
          </p>

          {/* XD stats: large #6bd41a number, #b6b6b6 label below */}
          <div className="flex items-start gap-16">
            {STATS.map((s) => (
              <div key={s.numEn} className="text-center">
                <p className="font-display font-black leading-none"
                  style={{ fontSize: "clamp(3rem, 5vw, 6rem)", color: "#6bd41a" }}>
                  {isAr ? s.numAr : s.numEn}
                </p>
                <p className="font-proxima text-[#b6b6b6] uppercase tracking-widest mt-2"
                  style={{ fontSize: "12px" }}>
                  {isAr ? s.labelAr : s.labelEn}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: image — XD shows a Monster event/booth photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="relative w-full overflow-hidden bg-[#111]"
          style={{ aspectRatio: "16/10" }}>
          <Image
            src="/assets/textures/texture.webp"
            alt="Monster Energy Program"
            fill
            className="object-cover object-center opacity-60"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-linear-to-r from-black/60 via-transparent to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}