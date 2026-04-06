"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { locationData, Country } from "@/utils/data/locations";

type Tab = "americas" | "asia_pacific" | "emea";

export default function LocationPopup({ onClose }: { onClose: () => void }) {
  const t      = useTranslations("location");
  const locale = useLocale();
  const isRTL  = locale === "ar";

  const [activeTab, setActiveTab] = useState<Tab>("americas");

  const tabs: { key: Tab; label: string }[] = [
    { key: "americas",     label: t("americas")    },
    { key: "asia_pacific", label: t("asiaPacific") },
    { key: "emea",         label: t("emea")        },
  ];

  const countries: Country[] =
    activeTab === "americas"     ? locationData.americas     :
    activeTab === "asia_pacific" ? locationData.asia_pacific :
    locationData.emea;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl mx-4 rounded-sm overflow-hidden bg-[#111] border border-[#222] max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
        dir={isRTL ? "rtl" : "ltr"}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 inset-e-4 z-10 txt-larger text-gray-400 hover:text-white font-light leading-none transition-colors"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Title */}
        <div className="pt-10 pb-6 text-center">
          <h2 className="text-white font-black header-large md:header-larger tracking-widest uppercase">
            {t("title")}
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex justify-center border-b border-gray-800">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-3 txt-smaller font-bold tracking-widest uppercase transition-colors relative ${
                activeTab === tab.key ? "text-white" : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#78be20]" />
              )}
            </button>
          ))}
        </div>

        {/* Countries grid */}
        <div className="overflow-y-auto p-6 max-h-[55vh] bg-[#0a0a0a]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
            {countries.map((c: Country) => (
              <div key={c.country} className="flex items-start gap-3">
                <span className={`fi fi-${c.flag} shrink-0 mt-0.5 txt-larger`} style={{ borderRadius: "2px" }} />
                <div>
                  <p className="text-white font-bold txt-small">
                    {c.country}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {c.languages.map((lang) => (
                      <a
                        key={lang.label}
                        href={lang.href === "/ar" || lang.href === "/en" ? lang.href : "/en"}
                        className="txt-smaller text-gray-400 hover:text-white transition-colors"
                      >
                        {lang.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}