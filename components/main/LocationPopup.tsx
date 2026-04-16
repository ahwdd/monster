// src/components/main/LocationPopup.tsx
"use client";
import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Country, locationData } from "@/lib/data/locations";

type Tab = "americas" | "asia_pacific" | "emea";

export default function LocationPopup({ onClose }: { onClose: () => void }) {
  const t = useTranslations("location");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const [activeTab, setActiveTab] = useState<Tab>("emea"); // EMEA first — Middle East region

  // Lock body scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const tabs: { key: Tab; label: string }[] = [
    // { key: "americas",     label: t("americas")    },
    // { key: "asia_pacific", label: t("asiaPacific") },
    { key: "emea", label: t("emea") },
  ];

  const countries: Country[] =
    activeTab === "americas"
      ? (locationData.americas ?? [])
      : activeTab === "asia_pacific"
        ? (locationData.asia_pacific ?? [])
        : (locationData.emea ?? []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-9998 flex items-center justify-center bg-black/85 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}>
        <motion.div
          className="relative w-full max-w-4xl bg-[#111] border border-[#222]
            flex flex-col overflow-hidden"
          style={{
            maxHeight: "min(92vh, 700px)",
          }}
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
          onClick={(e) => e.stopPropagation()}
          dir={isRTL ? "rtl" : "ltr"}>
          <button
            onClick={onClose}
            className="absolute top-3 inset-e-3 z-10 w-8 h-8 flex items-center justify-center
              text-gray-400 hover:text-white transition-colors bg-black/40 rounded-full"
            aria-label="Close">
            ✕
          </button>

          <div className="pt-6 pb-4 px-4 text-center shrink-0">
            <h2
              className="text-white font-black uppercase tracking-widest
              text-xl sm:text-2xl md:text-3xl">
              {t("title")}
            </h2>
          </div>

          <div className="flex justify-center border-b border-gray-800 shrink-0 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative px-3 sm:px-5 py-3 txt-smaller font-bold tracking-widest
                  uppercase transition-colors whitespace-nowrap flex-1 sm:flex-none
                  ${activeTab === tab.key ? "text-white" : "text-gray-500 hover:text-gray-300"}`}>
                {tab.label}
                {activeTab === tab.key && (
                  <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#78be20]" />
                )}
              </button>
            ))}
          </div>

          <div className="overflow-y-auto overscroll-contain flex-1 bg-[#0a0a0a]">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
                gap-x-6 sm:gap-x-8 gap-y-4 sm:gap-y-6 p-4 sm:p-6">
              {countries.map((c: Country) => (
                <div key={c.country} className="flex items-start gap-3">
                  <span
                    className={`fi fi-${c.flag} shrink-0 mt-0.5 txt-larger`}
                    style={{ borderRadius: "2px" }}
                  />
                  <div>
                    <p className="text-white font-bold txt-small">
                      {c.country}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {c.languages.map((lang) => (
                        <a
                          key={lang.label}
                          href={
                            lang.href === "/ar" || lang.href === "/en"
                              ? lang.href
                              : "/en"
                          }
                          className="txt-smaller text-gray-400 hover:text-white transition-colors">
                          {lang.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
