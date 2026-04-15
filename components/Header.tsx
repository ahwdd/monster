// src/components/Header.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal }  from "react-dom";
import Image             from "next/image";
import Link              from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoChevronDown, IoClose, IoMenu,
  IoPersonOutline, IoAddCircleOutline, IoDocumentTextOutline,
} from "react-icons/io5";
import { MdOutlineLocationOn }   from "react-icons/md";
import { PiGlobeLight }          from "react-icons/pi";
import LocationPopup   from "@/components/main/LocationPopup";
import WhereToBuyPopup from "@/components/main/WhereToBuyPopup";
import { useAuth }     from "@/hooks/useAuth";
import { flavorItems } from "@/lib/data/flavors";
import { navLinks }    from "@/lib/data/navLinks";
import UserMenu from "./auth/UserMenu";

export default function Header() {
  const t      = useTranslations();
  const locale = useLocale();
  const isRTL  = locale === "ar";
  const { isAuthenticated, initializationComplete } = useAuth();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [storeOpen,    setStoreOpen]    = useState(false);
  const [mounted,      setMounted]      = useState(false);

  const [profileApproved, setProfileApproved] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;
    fetch("/api/profile/register", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => { if (d.data?.status === "APPROVED") setProfileApproved(true); })
      .catch(() => {});
  }, [isAuthenticated]);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropRef   = useRef<HTMLDivElement>(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0 });

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    if (dropdownOpen && buttonRef.current) {
      setDropdownPos({ top: buttonRef.current.getBoundingClientRect().bottom });
    }
  }, [dropdownOpen]);

  useEffect(() => {
    function handle(e: MouseEvent) {
      const target       = e.target as Node;
      const insideTrig   = dropRef.current?.contains(target);
      const portalEl     = document.getElementById("dropdown-portal-root");
      const insidePortal = portalEl?.contains(target);
      if (!insideTrig && !insidePortal) setDropdownOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  // ── Framer variants ──────────────────────────────────────────
  const backdropVariants = {
    hidden:  { scaleY: 0, originY: 0 },
    visible: { scaleY: 1, originY: 0, transition: { duration: 0.22, ease: [0.4, 0, 0.2, 1] as const } },
    exit:    { scaleY: 0, originY: 0, transition: { duration: 0.18, ease: [0.4, 0, 1,   1] as const } },
  };

  const itemVariants = {
    hidden:  { opacity: 0, y: 16, scaleY: 0.85 },
    visible: (i: number) => ({
      opacity: 1, y: 0, scaleY: 1,
      transition: { delay: 0.08 + i * 0.03, duration: 0.2, ease: [0, 0, 0.2, 1] as const },
    }),
    exit: { opacity: 0, y: 8, scaleY: 0.9, transition: { duration: 0.12, ease: [0.4, 0, 1, 1] as const } },
  };

  const mobileMenuVariants = {
    hidden:  { x: isRTL ? "-100%" : "100%", opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.3,  ease: [0.4, 0, 0.2, 1] as const } },
    exit:    { x: isRTL ? "-100%" : "100%", opacity: 0, transition: { duration: 0.25, ease: [0.4, 0, 1, 1] as const } },
  };

  const dropdownContent = (
    <AnimatePresence>
      {dropdownOpen && (
        <motion.div
          id="dropdown-portal-root"
          variants={backdropVariants}
          initial="hidden" animate="visible" exit="exit"
          style={{ position: "fixed", top: dropdownPos.top, left: 0, right: 0, zIndex: 9999, transformOrigin: "top" }}
          className="bg-black w-screen"
        >
          <div className="flex items-stretch justify-center bg-[#111] border border-[#222] border-t-0 w-full overflow-x-auto">
            {flavorItems.map((item, i) => (
              <motion.div
                key={item.nameKey} custom={i} variants={itemVariants}
                initial="hidden" animate="visible" exit="exit"
                style={{ transformOrigin: "bottom" }}
                className="flex-1 min-w-30 xl:min-w-37.5"
              >
                <Link
                  href="#"
                  onClick={() => setDropdownOpen(false)}
                  className={`flex flex-col items-center gap-2 pt-4 pb-3 px-2 xl:px-3 relative border-b-4 border-transparent transition-colors duration-200 flavor ${item.bg} h-full`}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderBottomColor = item.color)}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderBottomColor = "transparent")}
                >
                  <div className="text-center">
                    <p className="text-white font-medium text-sm xl:header-small uppercase leading-tight">{t(`flavors.${item.nameKey}`)}</p>
                    <p className="txt-small xl:txt-regular mt-0.5" style={{ color: item.color }}>{t(`flavors.${item.subKey}`)}</p>
                  </div>
                  <div className="relative shrink-0 w-14 h-32 xl:w-16 xl:h-40">
                    <Image src={item.img} alt={t(`flavors.${item.nameKey}`)} fill className="object-contain drop-shadow-lg" />
                  </div>
                </Link>
              </motion.div>
            ))}
            <Link
              href="#"
              onClick={() => setDropdownOpen(false)}
              className="flex flex-col items-center justify-center min-w-25 xl:min-w-35 px-4 gap-1 text-center group/shop flavor bg-suggested-texture"
            >
              <span className="text-white font-medium text-sm xl:header-small uppercase leading-tight">{t("nav.shopAllFlavors")}</span>
              <span className="text-accent text-xl xl:text-2xl ltr:block rtl:rotate-180">→</span>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-40 flex items-center h-16 md:h-20.5 bg-[rgba(5,5,5,0.97)] border-b border-zinc-900 backdrop-blur-sm">

        {/* Logo */}
        <Link href={`/${locale}`} className="logo relative bg-[#171717] py-2 md:py-3 px-4 md:px-7.5 w-36 md:w-55 h-full flex items-center justify-center shrink-0">
          <Image src="/assets/logo.png" alt="Monster Energy" width={220} height={94} className="object-contain object-center pt-1 md:pt-2.5 w-full h-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center flex-1 px-2 h-full gap-0.5 overflow-x-auto header-smaller">
          <div ref={dropRef} className="relative h-full flex items-center shrink-0">
            <button
              ref={buttonRef}
              onClick={() => setDropdownOpen((v) => !v)}
              className="flex items-center gap-1.5 px-3 xl:px-4 h-full text-white font-semibold uppercase relative whitespace-nowrap text-sm xl:header-smaller"
            >
              {t("nav.energyDrinks")}
              <IoChevronDown className={`size-2.5 transition-transform duration-200 text-accent ${dropdownOpen ? "rotate-180" : ""}`} />
              <span className={`absolute bottom-0 inset-x-0 h-0.5 transition-colors duration-200 z-10 ${dropdownOpen ? "bg-accent" : "bg-transparent"}`} />
            </button>
          </div>

          {navLinks.map(({ labelKey, href, highlight }) => (
            <Link
              key={labelKey} href={href}
              className={`px-2 xl:px-3 h-full flex items-center font-semibold uppercase relative group/navitem whitespace-nowrap shrink-0 text-sm xl:header-smaller transition-colors duration-200 ${highlight ? "text-accent" : "text-stone-300 hover:text-white"}`}
            >
              {t(labelKey)}
              <span className="absolute bottom-0 inset-x-0 h-0.5 opacity-0 group-hover/navitem:opacity-100 transition-opacity duration-200 bg-monster" />
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-1 pe-2 md:pe-2.5 ms-auto lg:ms-0 shrink-0">
          {/* Globe */}
          <button
            className="size-9 md:size-10.5 flex items-center justify-center text-white hover:text-accent transition-colors duration-200"
            onClick={() => setLocationOpen(true)}
            aria-label={t("location.title")}
          >
            <PiGlobeLight className="size-5 md:size-5.5" />
          </button>

          {/* Pin */}
          <button
            className="size-9 md:size-10.5 flex items-center justify-center text-white hover:text-accent transition-colors duration-200"
            onClick={() => setStoreOpen(true)}
            aria-label={t("store.title")}
          >
            <MdOutlineLocationOn className="size-5 md:size-5.5" />
          </button>

          {/* User avatar or sign-in link */}
          {initializationComplete && (
            isAuthenticated
              ? <UserMenu />
              : (
                <Link
                  href={`/${locale}/auth/signin`}
                  className="hidden md:flex items-center px-3 py-1.5 txt-small font-semibold uppercase border border-[#78be20] text-[#78be20] hover:bg-[#78be20] hover:text-black rounded-sm transition-colors duration-200"
                >
                  {t("nav.signin")}
                </Link>
              )
          )}

          {/* Hamburger */}
          <button
            className="lg:hidden size-9 md:size-10.5 flex items-center justify-center text-white hover:text-accent transition-colors duration-200"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen
                ? <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90,  opacity: 0 }} transition={{ duration: 0.15 }}><IoClose className="size-5 md:size-6" /></motion.span>
                : <motion.span key="open"  initial={{ rotate: 90,  opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><IoMenu  className="size-5 md:size-6" /></motion.span>
              }
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-45 bg-black/70 lg:hidden"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              variants={mobileMenuVariants}
              initial="hidden" animate="visible" exit="exit"
              className="fixed top-16 md:top-20.5 ltr:right-0 rtl:left-0 bottom-0 z-46 w-72 sm:w-80 bg-[#0d0d0d] border-s border-zinc-800 overflow-y-auto lg:hidden flex flex-col"
            >
              <MobileAccordion label={t("nav.energyDrinks")} t={t} onClose={() => setMobileOpen(false)} />

              {navLinks.map(({ labelKey, href, highlight }) => (
                <Link
                  key={labelKey} href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-6 py-4 font-semibold uppercase txt-larger border-b border-zinc-800 transition-colors duration-200 ${highlight ? "text-accent" : "text-stone-300 hover:text-white"}`}
                >
                  {t(labelKey)}
                </Link>
              ))}

              <div className="mt-auto p-6 flex flex-col gap-3 border-t border-zinc-800">
                <button
                  onClick={() => { setLocationOpen(true); setMobileOpen(false); }}
                  className="flex items-center gap-3 text-stone-300 hover:text-white transition-colors duration-200 txt-larger font-medium"
                >
                  <PiGlobeLight className="size-5 shrink-0" />
                  {t("location.title")}
                </button>
                <button
                  onClick={() => { setStoreOpen(true); setMobileOpen(false); }}
                  className="flex items-center gap-3 text-stone-300 hover:text-white transition-colors duration-200 txt-larger font-medium"
                >
                  <MdOutlineLocationOn className="size-5 shrink-0" />
                  {t("store.title")}
                </button>

                {/* Mobile auth */}
                {initializationComplete && (
                  isAuthenticated
                    ? (
                      <div className="flex flex-col gap-1 border-t border-zinc-800 pt-3">
                        <Link href={`/${locale}/auth/profile`} onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-2 text-[#78be20] txt-small font-medium py-2">
                          <IoPersonOutline className="size-4 shrink-0" />
                          {t("nav.profile")}
                        </Link>
                        {profileApproved && (
                          <Link href={`/${locale}/submissions/submit`} onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-2 text-zinc-300 hover:text-white txt-small font-medium py-2 transition-colors">
                            <IoAddCircleOutline className="size-4 shrink-0 text-[#78be20]" />
                            {t("nav.newSubmission")}
                          </Link>
                        )}
                        <Link href={`/${locale}/submissions`} onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-2 text-zinc-300 hover:text-white txt-small font-medium py-2 transition-colors">
                          <IoDocumentTextOutline className="size-4 shrink-0 text-[#78be20]" />
                          {t("nav.viewSubmissions")}
                        </Link>
                      </div>
                    )
                    : (
                      <Link href={`/${locale}/auth/signin`} onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-center py-3 border border-[#78be20] text-[#78be20] font-semibold uppercase txt-small rounded-sm hover:bg-[#78be20] hover:text-black transition-colors duration-200">
                        {t("nav.signin")}
                      </Link>
                    )
                )}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {mounted && createPortal(dropdownContent, document.body)}
      {locationOpen && <LocationPopup  onClose={() => setLocationOpen(false)} />}
      {storeOpen    && <WhereToBuyPopup onClose={() => setStoreOpen(false)}    />}
    </>
  );
}

// ── Mobile accordion ─────────────────────────────────────────
function MobileAccordion({ label, t, onClose }: { label: string; t: ReturnType<typeof useTranslations>; onClose: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-zinc-800">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-4 font-semibold uppercase txt-larger text-white"
      >
        {label}
        <IoChevronDown className={`size-3.5 text-accent transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-2 p-4 bg-[#111]">
              {flavorItems.map((item) => (
                <Link
                  key={item.nameKey} href="#" onClick={onClose}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-sm border border-zinc-800 hover:border-zinc-600 transition-colors duration-200 flavor ${item.bg}`}
                >
                  <div className="relative w-10 h-16 shrink-0">
                    <Image src={item.img} alt={t(`flavors.${item.nameKey}`)} fill className="object-contain" />
                  </div>
                  <p className="text-white txt-smaller font-medium uppercase text-center leading-tight">{t(`flavors.${item.nameKey}`)}</p>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}