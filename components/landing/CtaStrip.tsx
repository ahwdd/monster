// src/components/landing/CtaStrip.tsx
"use client";
import Link from "next/link";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";

export default function CtaStrip() {
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    // XD sec7: bg #6bd41a (green), full width, centered content
    <section
      className="w-full py-25 px-35 text-center"
      style={{ background: "#6bd41a" }}>
      <div className="max-w-480 mx-auto">
        {/* XD: heading white */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display font-black text-white uppercase mb-4"
          style={{
            fontSize: "clamp(1.8rem, 3.5vw, 3.5rem)",
            letterSpacing: "0.03em",
          }}>
          {isAr ? "مستعد لتصبح مونستر؟" : "READY TO BECOME A MONSTER?"}
        </motion.h2>

        {/* XD: subtitle white */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="font-proxima text-white mb-10"
          style={{ fontSize: "16px" }}>
          {isAr
            ? "لن نطور أداءك فحسب."
            : "Join the program and prove your performance."}
        </motion.p>

        {/* XD: "Join Now" button — dark bg (#171717 from XD btns group), #000 text in XD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.14 }}>
          <Link
            href={`/${locale}/submissions/register`}
            className="inline-flex items-center justify-center h-12 px-12
              bg-black text-white font-display font-black uppercase tracking-[2px] text-sm
              hover:bg-[#111] transition-colors">
            {isAr ? "انضم الآن" : "Join Now"}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
