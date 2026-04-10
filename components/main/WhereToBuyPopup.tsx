"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { flavors } from "@/lib/data/flavors";
import { AnimatePresence, motion } from "framer-motion";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

export default function WhereToBuyPopup({ onClose }: { onClose: () => void }) {
  const t = useTranslations("store");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const [selected, setSelected] = useState(flavors[0]);
  const [activeTab, setActiveTab] = useState<"online" | "store">("store");
  const [address, setAddress] = useState("");

  // Mobile: show list or detail
  const [mobileView, setMobileView] = useState<"list" | "detail">("list");

  function selectFlavor(f: (typeof flavors)[0]) {
    setSelected(f);
    setMobileView("detail");
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/90"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}>
        <motion.div
          className="relative w-full sm:max-w-5xl sm:mx-4 rounded-t-xl sm:rounded-sm overflow-hidden bg-[#111] border border-[#222] max-h-[94vh] sm:max-h-[90vh] flex flex-col"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          onClick={(e) => e.stopPropagation()}
          dir={isRTL ? "rtl" : "ltr"}>
          {/* Drag handle — mobile */}
          <div className="sm:hidden flex justify-center pt-3 pb-1 shrink-0">
            <div className="w-10 h-1 rounded-full bg-zinc-600" />
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-3 inset-e-3 z-10 txt-large leading-none text-accent hover:opacity-80 transition-opacity"
            aria-label="Close">
            ✕
          </button>

          {/* ── Desktop layout: 3 cols ── */}
          <div className="hidden sm:flex flex-1 overflow-hidden min-h-125">
            {/* Col 1 — Flavor list */}
            <div className="overflow-y-auto shrink-0 w-44 md:w-55 border-e border-[#222] bg-surface">
              {flavors.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelected(f)}
                  className={`flex items-center gap-2 md:gap-3 w-full p-2.5 md:p-3 text-start transition-colors border-b border-gray-800 hover:bg-gray-900 border-s-[3px] ${
                    selected.id === f.id
                      ? "bg-[#111111] border-s-[#78be20]"
                      : "border-s-transparent"
                  }`}>
                  <div className="relative shrink-0 w-10 md:w-12 h-14 md:h-16 rounded-sm overflow-hidden bg-gray-900">
                    <Image
                      src={f.img}
                      alt={isRTL ? f.nameAr : f.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <span className="txt-smaller text-gray-300 leading-tight line-clamp-3">
                    {isRTL ? f.nameAr : f.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Col 2 — Detail */}
            <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-6 text-center border-e border-[#222] bg-[#0f0f0f]">
              <div className="relative mb-4 w-28 md:w-35 h-44 md:h-55">
                <Image
                  src={selected.img}
                  alt={isRTL ? selected.nameAr : selected.name}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-white font-black txt-larger md:header-small uppercase mb-3 tracking-wider">
                {isRTL ? selected.nameAr : selected.name}
              </h3>
              <p className="txt-smaller md:txt-small text-gray-400 leading-relaxed max-w-xs">
                {isRTL ? selected.descAr : selected.desc}
              </p>
            </div>

            {/* Col 3 — Finder */}
            <FinderCol
              t={t}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              address={address}
              setAddress={setAddress}
            />
          </div>

          {/* ── Mobile layout: list → detail ── */}
          <div className="sm:hidden flex flex-col flex-1 overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              {/* Mobile list view */}
              {mobileView === "list" && (
                <motion.div
                  key="list"
                  initial={{ x: isRTL ? "100%" : "-100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: isRTL ? "100%" : "-100%", opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                  className="flex flex-col flex-1 overflow-hidden">
                  <p className="txt-small text-gray-500 px-4 pt-3 pb-2 shrink-0">
                    {t("selectFlavor")}
                  </p>
                  <div className="overflow-y-auto flex-1">
                    {flavors.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => selectFlavor(f)}
                        className="flex items-center gap-3 w-full p-3 text-start border-b border-gray-800 hover:bg-gray-900 active:bg-gray-800 transition-colors">
                        <div className="relative shrink-0 w-10 h-14 rounded-sm overflow-hidden bg-gray-900">
                          <Image
                            src={f.img}
                            alt={isRTL ? f.nameAr : f.name}
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                        <span className="txt-regular text-gray-300 leading-tight flex-1">
                          {isRTL ? f.nameAr : f.name}
                        </span>
                        {isRTL ? (
                          <IoChevronBack className="size-4 text-gray-600 shrink-0" />
                        ) : (
                          <IoChevronForward className="size-4 text-gray-600 shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Mobile detail view */}
              {mobileView === "detail" && (
                <motion.div
                  key="detail"
                  initial={{ x: isRTL ? "-100%" : "100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: isRTL ? "-100%" : "100%", opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                  className="flex flex-col flex-1 overflow-y-auto">
                  {/* Back button */}
                  <button
                    onClick={() => setMobileView("list")}
                    className="flex items-center gap-2 px-4 py-3 txt-small text-accent shrink-0 border-b border-gray-800">
                    {isRTL ? (
                      <IoChevronForward className="size-4" />
                    ) : (
                      <IoChevronBack className="size-4" />
                    )}
                    {t("backToFlavors")}
                  </button>

                  {/* Selected flavor info */}
                  <div className="flex items-center gap-4 p-4 border-b border-gray-800">
                    <div className="relative shrink-0 w-14 h-20">
                      <Image
                        src={selected.img}
                        alt={isRTL ? selected.nameAr : selected.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-white font-bold txt-larger uppercase">
                        {isRTL ? selected.nameAr : selected.name}
                      </h3>
                      <p className="txt-small text-gray-400 mt-1">
                        {isRTL ? selected.descAr : selected.desc}
                      </p>
                    </div>
                  </div>

                  {/* Finder — reused */}
                  <FinderCol
                    t={t}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    address={address}
                    setAddress={setAddress}
                    mobile
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Shared finder column ─────────────────────────────────────────
function FinderCol({
  t,
  activeTab,
  setActiveTab,
  address,
  setAddress,
  mobile = false,
}: {
  t: ReturnType<typeof useTranslations<"store">>;
  activeTab: "online" | "store";
  setActiveTab: (v: "online" | "store") => void;
  address: string;
  setAddress: (v: string) => void;
  mobile?: boolean;
}) {
  return (
    <div
      className={`flex flex-col bg-surface ${mobile ? "flex-1" : "w-60 md:w-70 shrink-0"}`}>
      {/* Address */}
      <div className="flex items-center gap-2 p-3 m-4 rounded-sm border border-accent">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#78be20"
          strokeWidth="2"
          className="w-4 h-4 shrink-0">
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
            className={`flex-1 py-2 txt-smaller font-bold tracking-widest uppercase transition-colors bg-transparent border-b-2 ${
              activeTab === tab
                ? "text-white border-[#78be20]"
                : "text-[#555] border-transparent"
            }`}>
            {tab === "online" ? t("shopOnline") : t("findInStore")}
          </button>
        ))}
      </div>

      {/* Map placeholder */}
      <div className="mx-4 flex-1 rounded-sm flex items-center justify-center bg-[#1a1a1a] border border-[#2a2a2a] min-h-32 sm:min-h-40">
        <div className="m-4 p-4 text-center txt-small text-gray-600 rounded-sm bg-[#222] border border-[#333]">
          {t("enterZip")}
        </div>
      </div>

      <div className="mx-4 my-4 text-center">
        <p className="text-gray-500 txt-smaller">{t("notAvailable")}</p>
      </div>
      <div className="px-4 pb-3 flex justify-end">
        <span className="text-gray-700 txt-smaller">⊙ mapbox</span>
      </div>
    </div>
  );
}
