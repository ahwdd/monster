// src/components/landing/RewardsSection.tsx
"use client";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";

// XD sec5 exact data
const PACKS = [
  {
    titleEn: "ROOKIE PACK",
    titleAr: "حزمة المبتدئ",
    color:   "#22bb39",
    itemsEn: [
      "1 Monster Energy Drink (Monthly – for 3 months only)",
      "Rookie Certificate (End of Program)",
    ],
    itemsAr: [
      "١ مشروب مونستر إنرجي (شهرياً - لمدة 3 أشهر فقط)",
      "شهادة Rookie (نهاية البرنامج)",
    ],
  },
  {
    titleEn: "RISING PACK",
    titleAr: "حزمة الصاعد",
    color:   "#d4ff00",
    itemsEn: [
      "2 Monster Energy Shrinks (Monthly)",
      "$250 Financial Reward (End of Program)",
      "Headset + Camera + Microphone + Customized Fridge",
      "2 Tickets for Local Event",
      "Rising Trophy",
    ],
    itemsAr: [
      "٢ Monster Shrink شهرياً",
      "$250 مكافأة مالية (نهاية البرنامج)",
      "سماعة + كاميرا + مايك + ثلاجة مخصصة",
      "٢ تذكرة لحدث محلي",
      "كأس Rising",
    ],
  },
  {
    titleEn: "COLD PACK",
    titleAr: "حزمة الكولد",
    color:   "#00cfff",
    itemsEn: [
      "3 Monster Energy Shrinks (Monthly)",
      "$750 Financial Reward (End of Program)",
      "Lights + Gaming Chair + Joystick",
      "1 Trip to Global Gaming Event (Top 2 only)",
      "Cold Trophy / Plaque",
    ],
    itemsAr: [
      "٣ Monster Shrink شهرياً",
      "$750 مكافأة مالية (نهاية البرنامج)",
      "إضاءة + كرسي ألعاب + جويستيك",
      "رحلة لحدث ألعاب عالمي (أفضل ٢ فقط)",
      "كأس / لوحة شرف كولد مونستر",
    ],
  },
];

export default function RewardsSection() {
  const locale = useLocale();
  const isAr   = locale === "ar";

  return (
    <section className="w-full bg-black py-25 px-35">
      <div className="max-w-480 mx-auto">

        {/* XD: "Rewards" white heading centered */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display font-black text-white uppercase text-center mb-16"
          style={{ fontSize: "clamp(2rem, 3.5vw, 4rem)", letterSpacing: "0.03em" }}>
          {isAr ? "المكافآت" : "Rewards"}
        </motion.h2>

        {/* XD: 3 pack columns side by side */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PACKS.map((pack, i) => (
            <motion.div
              key={pack.titleEn}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="bg-[#0a0a0a] border border-[#171717] p-8">

              {/* XD: pack title in rank color */}
              <h3 className="font-display font-black uppercase mb-6"
                style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)", color: pack.color, letterSpacing: "0.06em" }}>
                {isAr ? pack.titleAr : pack.titleEn}
              </h3>

              {/* XD: "Includes:" white */}
              <p className="font-proxima text-white font-semibold mb-4" style={{ fontSize: "14px" }}>
                {isAr ? "يتضمن:" : "Includes:"}
              </p>

              {/* XD: items with 8×8 colored square bullet + #ccccd0 text */}
              <div className="flex flex-col gap-3">
                {(isAr ? pack.itemsAr : pack.itemsEn).map((item, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <div
                      className="mt-1.5 shrink-0"
                      style={{ width: "8px", height: "8px", background: pack.color }}
                    />
                    <span className="font-proxima text-[#ccccd0]" style={{ fontSize: "14px", lineHeight: "1.5" }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}