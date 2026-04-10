"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { locationData, Country } from "@/lib/data/locations";
import { AnimatePresence, motion } from "framer-motion";

type Tab = "americas" | "asia_pacific" | "emea";

export default function LocationPopup({ onClose }: { onClose: () => void }) {
  const t = useTranslations("location");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const [activeTab, setActiveTab] = useState<Tab>("americas");

  const tabs: { key: Tab; label: string }[] = [
    { key: "americas", label: t("americas") },
    { key: "asia_pacific", label: t("asiaPacific") },
    { key: "emea", label: t("emea") },
  ];

  const countries: Country[] =
    activeTab === "americas"
      ? locationData.americas
      : activeTab === "asia_pacific"
        ? locationData.asia_pacific
        : locationData.emea;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/85"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}>
        <motion.div
          className="relative w-full sm:max-w-4xl sm:mx-4 rounded-t-xl sm:rounded-sm overflow-hidden bg-[#111] border border-[#222] max-h-[92vh] sm:max-h-[90vh] flex flex-col"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          onClick={(e) => e.stopPropagation()}
          dir={isRTL ? "rtl" : "ltr"}>
          {/* Drag handle — mobile only */}
          <div className="sm:hidden flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-zinc-600" />
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-3 sm:top-4 inset-e-3 sm:inset-e-4 z-10 txt-larger text-gray-400 hover:text-white font-light leading-none transition-colors"
            aria-label="Close">
            ✕
          </button>

          {/* Title */}
          <div className="pt-6 sm:pt-10 pb-4 sm:pb-6 text-center shrink-0">
            <h2 className="text-white font-black header-regular sm:header-large md:header-larger tracking-widest uppercase">
              {t("title")}
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex justify-center border-b border-gray-800 shrink-0 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-3 sm:px-5 py-3 txt-smaller font-bold tracking-widest uppercase transition-colors relative whitespace-nowrap ${
                  activeTab === tab.key
                    ? "text-white"
                    : "text-gray-500 hover:text-gray-300"
                }`}>
                {tab.label}
                {activeTab === tab.key && (
                  <motion.span
                    layoutId="tab-indicator"
                    className="absolute bottom-0 inset-x-0 h-0.5 bg-[#78be20]"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Countries grid — scrollable */}
          <div className="overflow-y-auto p-4 sm:p-6 bg-[#0a0a0a] flex-1">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-8 gap-y-4 sm:gap-y-6">
              {countries.map((c: Country) => (
                <div key={c.country} className="flex items-start gap-3">
                  <span
                    className={`fi fi-${c.flag} shrink-0 mt-0.5 txt-larger rounded-sm`}
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
