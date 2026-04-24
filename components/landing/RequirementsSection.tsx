// src/components/landing/RequirementsSection.tsx
"use client";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";

// XD sec2 exact text
const ITEMS = [
  {
    titleEn: "LOYALTY",
    titleAr: "الولاء",
    descEn:  "To be part of the program, you must not promote any direct competitor products across your platforms.",
    descAr:  "لكي تكون جزءاً من البرنامج، يجب ألا تروّج لأي منتجات منافسة مباشرة على منصاتك.",
    icon: "🤝",
  },
  {
    titleEn: "CONTENT",
    titleAr: "المحتوى",
    descEn:  "A total of 25 pieces of content are required. Your content will evolve and improve as part of the program.",
    descAr:  "مطلوب ما مجموعه 25 قطعة محتوى. سيتطور محتواك ويتحسن كجزء من البرنامج.",
    icon: "🎬",
  },
  {
    titleEn: "KEEP IT CLEAN",
    titleAr: "حافظ على النظافة",
    descEn:  "We aim to have respectful and family-friendly content. Content branded under Monster Energy must be free of profanity, smoking, religious bias, and political bias.",
    descAr:  "نهدف إلى محتوى محترم وملائم للعائلة. يجب أن يكون المحتوى المرتبط بمونستر إنرجي خالياً من الألفاظ النابية والتدخين والتحيز الديني والسياسي.",
    icon: "✨",
  },
];

export default function RequirementsSection() {
  const locale = useLocale();
  const isAr   = locale === "ar";

  return (
    // XD sec2: full-width black, centered content
    <section className="w-full bg-black py-25 px-35">
      <div className="max-w-480 mx-auto">

        {/* XD: "Requirements" white heading, centered */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display font-black text-white uppercase text-center mb-16"
          style={{ fontSize: "clamp(2rem, 3.5vw, 4rem)", letterSpacing: "0.03em" }}>
          {isAr ? "المتطلبات" : "REQUIREMENTS"}
        </motion.h2>

        {/* XD: 3 cards side by side, each has icon top, title white, desc #ccccd0 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.titleEn}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="bg-[#0a0a0a] border border-[#171717] p-8">

              {/* Icon area — XD has mask group (image icon) */}
              <div className="w-15 h-15 bg-[#171717] flex items-center justify-center mb-6 text-2xl">
                {item.icon}
              </div>

              {/* XD: title white */}
              <h3 className="font-display font-black text-white uppercase mb-4"
                style={{ fontSize: "clamp(1rem, 1.5vw, 1.3rem)", letterSpacing: "0.05em" }}>
                {isAr ? item.titleAr : item.titleEn}
              </h3>

              {/* XD: desc #ccccd0 */}
              <p className="font-proxima text-[#ccccd0] leading-relaxed"
                style={{ fontSize: "14px" }}>
                {isAr ? item.descAr : item.descEn}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}