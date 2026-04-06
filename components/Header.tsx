"use client";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import LocationPopup from "@/components/main/LocationPopup";
import WhereToBuyPopup from "@/components/main/WhereToBuyPopup";
import { flavorItems } from "@/utils/data/flavors";
import { IoChevronDown } from "react-icons/io5";
import { navLinks } from "@/utils/data/navLinks";
import { MdOutlineLocationOn } from "react-icons/md";
import { PiGlobeLight } from "react-icons/pi";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [storeOpen, setStoreOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dropdownPos, setDropdownPos] = useState({ left: 0, top: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Recalculate position whenever dropdown opens
  useEffect(() => {
    if (dropdownOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPos({
        left: isRTL ? undefined : rect.left,
        right: isRTL ? window.innerWidth - rect.right : undefined,
        top: rect.bottom,
      } as any);
    }
  }, [dropdownOpen, isRTL]);

  useEffect(() => {
    function handle(e: MouseEvent) {
      const target = e.target as Node;
      const isInsideTrigger = dropRef.current?.contains(target);
      const portalEl = document.getElementById("dropdown-portal-root");
      const isInsidePortal = portalEl?.contains(target);
      if (!isInsideTrigger && !isInsidePortal) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

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
        ease: [0.0, 0.0, 0.2, 1] as const,
      },
    }),
    exit: {
      opacity: 0,
      y: 8,
      scaleY: 0.9,
      transition: { duration: 0.12, ease: [0.4, 0, 1, 1] as const },
    },
  };

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
          <div className="flex items-stretch justify-center bg-[#111] border border-[#222] border-t-0 
            min-w-180 w-full overflow-hidden gap-2.5 max-w-375 m-auto">
            {flavorItems.map((item, i) => (
              <motion.div
                key={item.nameKey}
                custom={i}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{ transformOrigin: "bottom" }}
                className="flex-1 w-46.25 h-61.5">
                <Link
                  href="#"
                  onClick={() => setDropdownOpen(false)}
                  className={`flex flex-col items-center gap-2 pt-4 pb-3 px-3 relative border-b-4 border-transparent 
                  transition-all flavor ${item.bg} `}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.borderBottomColor =
                      item.color)
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.borderBottomColor =
                      "transparent")
                  }>
                  <div className="text-center">
                    <p className="text-white font-medium header-small uppercase">
                      {t(`flavors.${item.nameKey}`)}
                    </p>
                    <p
                      className="txt-regular mt-0.5"
                      style={{ color: item.color }}>
                      {t(`flavors.${item.subKey}`)}
                    </p>
                  </div>
                  <div className="relative shrink-0 w-15.75 h-39.25">
                    <Image
                      src={item.img}
                      alt={t(`flavors.${item.nameKey}`)}
                      fill
                      className="object-contain drop-shadow-lg"
                    />
                  </div>
                </Link>

                
              </motion.div>
            ))}

            
            <Link
                href="#"
                onClick={() => setDropdownOpen(false)}
                className="flex flex-col items-center justify-center size-full gap-1 text-center group/shop 
                flavor bg-suggested-texture w-46.25 h-61.5 ">
                <span
                className="text-white font-medium header-small uppercase">
                {t("nav.shopAllFlavors")}
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
        className="fixed top-0 inset-x-0 z-40 flex items-center h-20.5 bg-[rgba(5,5,5,0.97)] 
            border-b border-zinc-900 backdrop-blur-sm">
        {/* ── Logo ── */}
        <Link
          href="/"
          className="logo relative bg-[#171717] py-3 px-7.5 w-55 h-23.5 flex items-center justify-center">
          <Image
            src="/assets/logo.png"
            alt="Monster Energy"
            width={220}
            height={94}
            className="object-contain object-center pt-2.5"
          />
        </Link>

        {/* ── Nav ── */}
        <nav className="flex items-center flex-1 px-2 h-full gap-0.5 overflow-x-auto header-smaller">
          {/* Energy Drinks dropdown trigger */}
          <div
            ref={dropRef}
            className="relative h-full flex items-center shrink-0">
            <button
              ref={buttonRef}
              onClick={() => setDropdownOpen((v) => !v)}
              className="flex items-center gap-1.5 px-4 h-full text-white font-semibold 
                            uppercase relative whitespace-nowrap">
              {t("nav.energyDrinks")}
              <IoChevronDown
                className={`size-2.5 transition-transform text-accent
                                    ${dropdownOpen ? "rotate-180" : "rotate-0"}`}
              />
              <span
                className="absolute bottom-0 inset-x-0 h-0.5 transition-colors z-10"
                style={{
                  background: dropdownOpen ? "#78be20" : "transparent",
                }}
              />
            </button>
          </div>

          {/* Other links */}
          {navLinks.map(({ labelKey, href, highlight }) => (
            <Link
              key={labelKey}
              href={href}
              className={`px-3 h-full flex items-center font-semibold uppercase text-white 
                relative group/navitem whitespace-nowrap shrink-0 ${highlight ? "text-accent" : "text-stone-300"}`}>
              {t(labelKey)}
              <span className="absolute bottom-0 inset-x-0 h-0.5 opacity-0 group-hover/navitem:opacity-100 transition-opacity bg-monster" />
            </Link>
          ))}
        </nav>

        {/* ── Right icons ── */}
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
        </div>
      </header>

      {/* Portal dropdown — rendered outside header, no overflow constraint */}
      {mounted && createPortal(dropdownContent, document.body)}

      {locationOpen && <LocationPopup onClose={() => setLocationOpen(false)} />}
      {storeOpen && <WhereToBuyPopup onClose={() => setStoreOpen(false)} />}
    </>
  );
}
