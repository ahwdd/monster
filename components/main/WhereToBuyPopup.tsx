"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { flavors } from "@/utils/data/flavors";


export default function WhereToBuyPopup({ onClose }: { onClose: () => void }) {
  const t      = useTranslations("store");
  const locale = useLocale();
  const isRTL  = locale === "ar";

  const [selected,  setSelected]  = useState(flavors[0]);
  const [activeTab, setActiveTab] = useState<"online" | "store">("store");
  const [address,   setAddress]   = useState("");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl mx-4 rounded-sm overflow-hidden bg-[#111] border border-[#222] max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
        dir={isRTL ? "rtl" : "ltr"}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 inset-e-3 z-10 txt-large leading-none text-accent hover:opacity-80 transition-opacity"
          aria-label="Close"
        >
          ✕
        </button>

        <div className="flex min-h-125">

          {/* ── Col 1: Flavor list ── */}
          <div className="overflow-y-auto shrink-0 w-55 border-e border-[#222] bg-surface">
            {flavors.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelected(f)}
                className="flex items-center gap-3 w-full p-3 text-start transition-colors border-b border-gray-800 hover:bg-gray-900"
                style={{
                  background:             selected.id === f.id ? "#111111" : undefined,
                  borderInlineStartWidth: "3px",
                  borderInlineStartStyle: "solid",
                  borderInlineStartColor: selected.id === f.id ? "#78be20" : "transparent",
                }}
              >
                <div className="relative shrink-0 w-12 h-16 rounded-sm overflow-hidden bg-gray-900">
                  <Image src={f.img} alt={locale === "ar" ? f.nameAr : f.name} fill className="object-contain p-1" />
                </div>
                <span className="txt-smaller text-gray-300 leading-tight line-clamp-3">
                  {locale === "ar" ? f.nameAr : f.name}
                </span>
              </button>
            ))}
          </div>

          {/* ── Col 2: Detail ── */}
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center border-e border-[#222] bg-[#0f0f0f]">
            <div className="relative mb-4 w-35 h-55">
              <Image src={selected.img} alt={locale === "ar" ? selected.nameAr : selected.name} fill className="object-contain" />
            </div>
            <h3 className="text-white font-black header-small uppercase mb-3 tracking-wider">
              {locale === "ar" ? selected.nameAr : selected.name}
            </h3>
            <p className="txt-small text-gray-400 leading-relaxed max-w-xs">
              {locale === "ar" ? selected.descAr : selected.desc}
            </p>
          </div>

          {/* ── Col 3: Finder ── */}
          <div className="flex flex-col w-70 bg-surface">

            {/* Address input */}
            <div className="flex items-center gap-2 p-3 m-4 rounded-sm border border-accent">
              <svg viewBox="0 0 24 24" fill="none" stroke="#78be20" strokeWidth="2" className="w-4 h-4 shrink-0">
                <circle cx="12" cy="10" r="3" />
                <path d="M12 2C7.58 2 4 5.58 4 10c0 5.25 8 12 8 12s8-6.75 8-12c0-4.42-3.58-8-8-8z" />
              </svg>
              <input
                type="text"
                placeholder={t("addressPlaceholder")}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="flex-1 bg-transparent txt-small text-gray-300 placeholder-gray-600 outline-none"
              />
            </div>

            {/* Tabs */}
            <div className="flex mx-4 mb-4">
              {(["online", "store"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="flex-1 py-2 txt-smaller font-bold tracking-widest uppercase transition-colors bg-transparent"
                  style={{
                    color:        activeTab === tab ? "#fff" : "#555",
                    borderBottom: activeTab === tab ? "2px solid #78be20" : "2px solid transparent",
                  }}
                >
                  {tab === "online" ? t("shopOnline") : t("findInStore")}
                </button>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="mx-4 flex-1 rounded-sm flex items-center justify-center bg-[#1a1a1a] border border-[#2a2a2a] min-h-40">
              <div className="m-4 p-4 text-center txt-small text-gray-600 rounded-sm bg-[#222] border border-[#333]">
                {t("enterZip")}
              </div>
            </div>

            {/* Not available */}
            <div className="mx-4 my-4 text-center">
              <p className="text-gray-500 txt-smaller">{t("notAvailable")}</p>
            </div>

            {/* Mapbox credit */}
            <div className="px-4 pb-3 flex justify-end">
              <span className="text-gray-700 txt-smaller">⊙ mapbox</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}