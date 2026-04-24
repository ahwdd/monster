// src/components/landing/HowItWorksSection.tsx
"use client";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";

// XD sec4 exact text
const STEPS = [
  {
    numEn: "1",
    titleEn: "APPLY",
    titleAr: "قدّم طلبك",
    descEn: "Creators apply via the website form",
    descAr: "يتقدم صناع المحتوى عبر نموذج الموقع",
  },
  {
    numEn: "2",
    titleEn: "GET SELECTED",
    titleAr: "احصل على القبول",
    descEn: "Selection based on content consistency, relevance, and brand fit",
    descAr: "الاختيار بناءً على ثبات المحتوى، الصلة بالمجال، وملاءمة العلامة",
  },
  {
    numEn: "3",
    titleEn: "PROVE CONSISTENCY",
    titleAr: "أثبت ثباتك",
    descEn: "Submit weekly content and meet performance requirements",
    descAr: "أرسل محتوى أسبوعياً واستوفِ متطلبات الأداء",
  },
  {
    numEn: "4",
    titleEn: "LEVEL UP",
    titleAr: "ارتقِ بمستواك",
    descEn: "Progress through levels based on performance",
    descAr: "تقدّم عبر التصنيفات بناءً على أدائك",
  },
];

export default function HowItWorksSection() {
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    // XD sec4: bg #000000
    <section className="w-full bg-black py-25 px-35">
      <div className="max-w-480 mx-auto">
        {/* XD heading + subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          <h2
            className="font-display font-black text-white uppercase mb-4"
            style={{
              fontSize: "clamp(2rem, 3.5vw, 4rem)",
              letterSpacing: "0.03em",
            }}>
            {isAr ? "كيف يعمل البرنامج" : "HOW IT WORKS"}
          </h2>
          <p
            className="font-proxima text-[#ccccd0] max-w-2xl mx-auto"
            style={{ fontSize: "14px" }}>
            {isAr
              ? "يتقدم صناع المحتوى → يُختارون → يُثبتون ثباتهم → يرتقون بناءً على استيفاء متطلبات كل مستوى"
              : "Creators apply → get selected → prove consistency → level up based on meeting level requirements"}
          </p>
        </motion.div>

        {/* XD: 4 steps in a row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.numEn}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="flex flex-col items-center text-center">
              {/* XD: 86×86 #171717 square with #22bb39 number */}
              <div
                className="flex items-center justify-center mb-6"
                style={{
                  width: "86px",
                  height: "86px",
                  background: "#171717",
                }}>
                <span
                  className="font-display font-black"
                  style={{
                    fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                    color: "#22bb39",
                  }}>
                  {step.numEn}
                </span>
              </div>

              {/* XD: title white */}
              <h3
                className="font-display font-black text-white uppercase mb-3"
                style={{
                  fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)",
                  letterSpacing: "0.06em",
                }}>
                {isAr ? step.titleAr : step.titleEn}
              </h3>

              {/* XD: desc #ccccd0 */}
              <p
                className="font-proxima text-[#ccccd0]"
                style={{ fontSize: "14px", lineHeight: "1.6" }}>
                {isAr ? step.descAr : step.descEn}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
