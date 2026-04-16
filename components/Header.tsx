// src/components/main/Header.tsx
"use client";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import LocationPopup from "@/components/main/LocationPopup";
import WhereToBuyPopup from "@/components/main/WhereToBuyPopup";
import UserMenu from "./auth/UserMenu";
import { IoChevronDown, IoClose, IoMenu } from "react-icons/io5";
import { MdOutlineLocationOn } from "react-icons/md";
import { PiGlobeLight } from "react-icons/pi";
import { motion, AnimatePresence, Easing } from "framer-motion";
import { navLinks, rankLinks } from "@/lib/data/navLinks";

export default function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === "ar";

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [storeOpen, setStoreOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0 });

  const dropRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (dropdownOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPos({ top: rect.bottom });
    }
  }, [dropdownOpen]);

  useEffect(() => {
    function handle(e: MouseEvent) {
      const target = e.target as Node;
      if (dropRef.current?.contains(target)) return;
      if (document.getElementById("dropdown-portal-root")?.contains(target))
        return;
      setDropdownOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  // ── Animation variants ────────────────────────────────────
  const backdropV = {
    hidden: { scaleY: 0, originY: 0 },
    visible: {
      scaleY: 1,
      originY: 0,
      transition: { duration: 0.22, ease: [0.4, 0, 0.2, 1] as Easing },
    },
    exit: {
      scaleY: 0,
      originY: 0,
      transition: { duration: 0.18, ease: [0.4, 0, 1, 1] as Easing },
    },
  };
  const itemV = {
    hidden: { opacity: 0, y: 16, scaleY: 0.85 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scaleY: 1,
      transition: {
        delay: 0.1 + i * 0.035,
        duration: 0.2,
        ease: [0, 0, 0.2, 1] as Easing,
      },
    }),
    exit: { opacity: 0, y: 8, scaleY: 0.9, transition: { duration: 0.12 } },
  };

  const panelV = {
    hidden: { x: isRTL ? "100%" : "-100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as Easing },
    },
    exit: {
      x: isRTL ? "100%" : "-100%",
      opacity: 0,
      transition: { duration: 0.24, ease: [0.4, 0, 1, 1] as Easing },
    },
  };
  const mItemV = {
    hidden: { opacity: 0, x: isRTL ? 24 : -24 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.15 + i * 0.055,
        duration: 0.22,
        ease: [0, 0, 0.2, 1] as Easing,
      },
    }),
  };

  // ── Desktop dropdown ──────────────────────────────────────
  const desktopDropdown = (
    <AnimatePresence>
      {dropdownOpen && (
        <motion.div
          id="dropdown-portal-root"
          variants={backdropV}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{
            position: "fixed",
            top: dropdownPos.top,
            left: 0,
            right: 0,
            zIndex: 9999,
            transformOrigin: "top",
          }}
          className="bg-black w-screen">
          <div
            className="flex items-stretch justify-center bg-[#111] border border-[#222] border-t-0
            w-full overflow-hidden gap-0 max-w-375 m-auto">
            {rankLinks.map((rank, i) => (
              <motion.div
                key={rank.href}
                custom={i}
                variants={itemV}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{ transformOrigin: "bottom" }}
                className="flex-1">
                <Link
                  href={`/${locale}${rank.href}`}
                  onClick={() => setDropdownOpen(false)}
                  className={`flex flex-col items-center gap-2 pt-4 pb-3 px-3 h-full
                    relative border-b-4 border-transparent transition-all flavor ${rank.bg}`}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderBottomColor =
                      rank.color;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderBottomColor =
                      "transparent";
                  }}>
                  <div className="text-center">
                    <p
                      className="font-medium header-small uppercase"
                      style={{ color: rank.color }}>
                      {t(rank.labelKey)}
                    </p>
                    <p className="txt-regular mt-0.5 text-zinc-400">
                      {t(rank.subKey)}
                    </p>
                  </div>
                  <div className="relative shrink-0 aspect-square w-1/2">
                    <Image
                      src={rank.img}
                      alt={t(rank.labelKey)}
                      fill
                      className="object-contain drop-shadow-lg"
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
            <Link
              href={`/${locale}/ranks`}
              onClick={() => setDropdownOpen(false)}
              className="flex flex-col items-center justify-center h-full gap-1 text-center
                group/shop flavor bg-suggested-texture flex-1 min-h-61.5">
              <span className="text-white font-medium header-small uppercase">
                {t("nav.allRanks")}
              </span>
              <span className="text-accent text-2xl">→</span>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // ── Mobile nav panel ──────────────────────────────────────
  const mobilePanel = (
    <AnimatePresence>
      {mobileOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/75 z-9997 md:hidden"
            onClick={() => setMobileOpen(false)}
          />

          <motion.aside
            variants={panelV}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`fixed top-0 bottom-0 z-9999 w-72 bg-[#0a0a0a]
              flex flex-col md:hidden overflow-hidden
              ${isRTL ? "right-0 border-l border-zinc-800" : "left-0 border-r border-zinc-800"}`}>
            {/* Panel header */}
            <div className="flex items-center justify-between px-5 h-16 border-b border-zinc-800 shrink-0">
              <Image
                src="/assets/logo.png"
                alt="Monster"
                width={110}
                height={47}
                className="object-contain h-7 w-auto"
              />
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-zinc-800">
                <IoClose className="size-5" />
              </button>
            </div>

            {/* Scrollable nav body */}
            <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
              {/* Ranks group */}
              <motion.p
                custom={0}
                variants={mItemV}
                initial="hidden"
                animate="visible"
                className="txt-smaller text-zinc-500 uppercase tracking-[0.2em] font-semibold px-3 pt-3 pb-1.5">
                {t("nav.ranks")}
              </motion.p>

              {rankLinks.map((rank, i) => (
                <motion.div
                  key={rank.href}
                  custom={i + 1}
                  variants={mItemV}
                  initial="hidden"
                  animate="visible">
                  <Link
                    href={`/${locale}${rank.href}`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-zinc-800/70 transition-colors">
                    <div
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ background: rank.color }}
                    />
                    <span
                      className="txt-small font-bold uppercase"
                      style={{ color: rank.color }}>
                      {t(rank.labelKey)}
                    </span>
                    <span className="txt-smaller text-zinc-600 ms-auto">
                      {t(rank.subKey)}
                    </span>
                  </Link>
                </motion.div>
              ))}

              <motion.div
                custom={rankLinks.length + 1}
                variants={mItemV}
                initial="hidden"
                animate="visible">
                <Link
                  href={`/${locale}/ranks`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-800/70 transition-colors">
                  <span className="txt-smaller text-zinc-400">
                    {t("nav.allRanks")} →
                  </span>
                </Link>
              </motion.div>

              <div className="h-px bg-zinc-800 my-3 mx-3" />

              {/* Static links */}
              {navLinks.map(({ labelKey, href }, i) => (
                <motion.div
                  key={labelKey}
                  custom={rankLinks.length + i + 2}
                  variants={mItemV}
                  initial="hidden"
                  animate="visible">
                  <Link
                    href={`/${locale}${href}`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-zinc-800/70 transition-colors">
                    <span className="txt-small font-semibold uppercase text-stone-300">
                      {t(labelKey)}
                    </span>
                  </Link>
                </motion.div>
              ))}

              <div className="h-px bg-zinc-800 my-3 mx-3" />

              {/* Utility */}
              <motion.div
                custom={rankLinks.length + navLinks.length + 3}
                variants={mItemV}
                initial="hidden"
                animate="visible"
                className="flex gap-2 px-3">
                <button
                  onClick={() => {
                    setLocationOpen(true);
                    setMobileOpen(false);
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg
                    bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white txt-smaller transition-colors">
                  <PiGlobeLight className="size-4" />
                  {t("location.title").split(" ")[0]}
                </button>
                <button
                  onClick={() => {
                    setStoreOpen(true);
                    setMobileOpen(false);
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg
                    bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white txt-smaller transition-colors">
                  <MdOutlineLocationOn className="size-4" />
                  {t("store.title").split(" ")[0]}
                </button>
              </motion.div>
            </nav>

            {/* User area pinned to bottom */}
            <div className="border-t border-zinc-800 p-4 shrink-0">
              <UserMenu />
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <header
        className="fixed top-0 inset-x-0 z-40 flex items-center h-16 md:h-20.5
        bg-[rgba(5,5,5,0.97)] border-b border-zinc-900 backdrop-blur-sm">
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="logo relative bg-[#171717] flex items-center justify-center shrink-0
            py-2 px-4 h-16 w-36
            md:py-3 md:px-7.5 md:h-23.5 md:w-55">
          <Image
            src="/assets/logo.png"
            alt="Monster Energy"
            width={220}
            height={94}
            className="object-contain object-center md:pt-2.5 max-h-10 md:max-h-none"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center flex-1 px-2 h-full gap-0.5 overflow-x-auto header-smaller">
          <div
            ref={dropRef}
            className="relative h-full flex items-center shrink-0">
            <button
              ref={buttonRef}
              onClick={() => setDropdownOpen((v) => !v)}
              className="flex items-center gap-1.5 px-4 h-full text-white font-semibold uppercase relative whitespace-nowrap">
              {t("nav.ranks")}
              <IoChevronDown
                className={`size-2.5 transition-transform text-accent ${dropdownOpen ? "rotate-180" : ""}`}
              />
              <span
                className="absolute bottom-0 inset-x-0 h-0.5 transition-colors z-10"
                style={{ background: dropdownOpen ? "#78be20" : "transparent" }}
              />
            </button>
          </div>
          {navLinks.map(({ labelKey, href }) => (
            <Link
              key={labelKey}
              href={`/${locale}${href}`}
              className="px-3 h-full flex items-center font-semibold uppercase text-stone-300
                relative group/navitem whitespace-nowrap shrink-0">
              {t(labelKey)}
              <span
                className="absolute bottom-0 inset-x-0 h-0.5 opacity-0
                group-hover/navitem:opacity-100 transition-opacity bg-monster"
              />
            </Link>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-0.5 ms-auto pe-3 md:pe-2.5 shrink-0">
          <button
            className="hidden md:flex size-10.5 items-center justify-center text-white transition-colors"
            onClick={() => setLocationOpen(true)}>
            <PiGlobeLight className="size-5.5" />
          </button>
          <button
            className="hidden md:flex size-10.5 items-center justify-center text-white transition-colors"
            onClick={() => setStoreOpen(true)}>
            <MdOutlineLocationOn className="size-5.5" />
          </button>
          <div className="hidden md:flex">
            <UserMenu />
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden p-2.5 text-white hover:text-[#78be20] transition-colors rounded-lg"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu">
            <motion.div
              animate={{ rotate: mobileOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}>
              {mobileOpen ? (
                <IoClose className="size-6" />
              ) : (
                <IoMenu className="size-6" />
              )}
            </motion.div>
          </button>
        </div>
      </header>

      {mounted && createPortal(desktopDropdown, document.body)}
      {mounted && createPortal(mobilePanel, document.body)}
      {locationOpen && <LocationPopup onClose={() => setLocationOpen(false)} />}
      {storeOpen && <WhereToBuyPopup onClose={() => setStoreOpen(false)} />}
    </>
  );
}
