// src/components/main/Header.tsx
"use client";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import LocationPopup from "@/components/main/LocationPopup";
import WhereToBuyPopup from "@/components/main/WhereToBuyPopup";
import { IoChevronDown } from "react-icons/io5";
import { MdOutlineLocationOn } from "react-icons/md";
import { PiGlobeLight } from "react-icons/pi";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, rankLinks } from "@/lib/data/navLinks";
import UserMenu from "./auth/UserMenu";

export default function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === "ar";

  const [dropdownOpen, setDropdownOpen] = useState(false);
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
    if (dropdownOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPos({ top: rect.bottom });
    }
  }, [dropdownOpen]);

  useEffect(() => {
    function handle(e: MouseEvent) {
      const target = e.target as Node;
      if (dropRef.current?.contains(target)) return;
      const portal = document.getElementById("dropdown-portal-root");
      if (portal?.contains(target)) return;
      setDropdownOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  // ── Same animation variants as the original ───────────────
  const backdropVariants = {
    hidden: { scaleY: 0, originY: 0 },
    visible: {
      scaleY: 1,
      originY: 0,
      transition: { duration: 0.22, ease: [0.4, 0, 0.2, 1] as const },
    },
    exit: {
      scaleY: 0,
      originY: 0,
      transition: { duration: 0.18, ease: [0.4, 0, 1, 1] as const },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 16, scaleY: 0.85 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scaleY: 1,
      transition: {
        delay: 0.1 + i * 0.035,
        duration: 0.2,
        ease: [0, 0, 0.2, 1] as const,
      },
    }),
    exit: {
      opacity: 0,
      y: 8,
      scaleY: 0.9,
      transition: { duration: 0.12, ease: [0.4, 0, 1, 1] as const },
    },
  };

  // ── Dropdown portal — mirrors flavor dropdown exactly ─────
  const dropdownContent = (
    <AnimatePresence>
      {dropdownOpen && (
        <motion.div
          id="dropdown-portal-root"
          variants={backdropVariants}
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
          {/* Inner container — same as original: bg-[#111], border, centered flex row */}
          <div
            className="flex items-stretch justify-center bg-[#111] border border-[#222] border-t-0
            w-full overflow-hidden gap-0 max-w-375 m-auto">
            {rankLinks.map((rank, i) => (
              <motion.div
                key={rank.href}
                custom={i}
                variants={itemVariants}
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
                      className="text-white font-medium header-small uppercase"
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

  return (
    <>
      <header
        className="fixed top-0 inset-x-0 z-40 flex items-center h-20.5
        bg-[rgba(5,5,5,0.97)] border-b border-zinc-900 backdrop-blur-sm">
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="logo relative bg-[#171717] py-3 px-7.5 w-55 h-23.5 flex items-center justify-center shrink-0">
          <Image
            src="/assets/logo.png"
            alt="Monster Energy"
            width={220}
            height={94}
            className="object-contain object-center pt-2.5"
          />
        </Link>

        {/* Nav */}
        <nav className="flex items-center flex-1 px-2 h-full gap-0.5 overflow-x-auto header-smaller">
          {/* Ranks dropdown trigger */}
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

          {/* Static links */}
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

        {/* Right side */}
        <div className="flex items-center gap-1 pe-2.5 shrink-0">
          <button
            className="size-10.5 flex items-center justify-center text-white transition-colors"
            onClick={() => setLocationOpen(true)}
            aria-label={t("location.title")}>
            <PiGlobeLight className="size-5.5" />
          </button>
          <button
            className="size-10.5 flex items-center justify-center text-white transition-colors"
            onClick={() => setStoreOpen(true)}
            aria-label={t("store.title")}>
            <MdOutlineLocationOn className="size-5.5" />
          </button>
          <UserMenu />
        </div>
      </header>

      {mounted && createPortal(dropdownContent, document.body)}
      {locationOpen && <LocationPopup onClose={() => setLocationOpen(false)} />}
      {storeOpen && <WhereToBuyPopup onClose={() => setStoreOpen(false)} />}
    </>
  );
}
