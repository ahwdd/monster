// src/components/Header.tsx
"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { IoClose, IoMenu } from "react-icons/io5";
import { motion, AnimatePresence, Easing } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import LangToggle from "./LangToggle";
import OutlinedParaBtn from "./ui/OutlinedParaBtn";
import SolidParaBtn from "./ui/SolidParaBtn";
import { NAV_ITEMS } from "@/lib/data/navLinks";

export default function Header() {
  const locale   = useLocale();
  const isRTL    = locale === "ar";
  const pathname = usePathname();

  const { isAuthenticated, initializationComplete, logout } = useAuth();
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [mounted,       setMounted]       = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const isHome =
    pathname === `/${locale}` ||
    pathname === "/" ||
    pathname === `/${locale}/`;

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // ── Active section detection ─────────────────────────────────────────────
  // Strategy: on every scroll event, measure each section's top relative to
  // the viewport. The active section is the one whose top is closest to (but
  // still above or at) 50% of the viewport height. This works correctly even
  // when a section's top has already scrolled above the viewport.
  useEffect(() => {
    if (!isHome) {
      setActiveSection(null);
      return;
    }

    const sectionIds = NAV_ITEMS
      .map((n) => n.sectionId)
      .filter(Boolean) as string[];

    function update() {
      const midpoint = window.innerHeight * 0.5;

      // If we're at the very top, "Home" is active (null = home)
      if (window.scrollY < 80) {
        setActiveSection(null);
        return;
      }

      // Find the section whose top edge is closest to the midpoint
      // from above (i.e. top <= midpoint). Among those, take the one
      // with the largest top value (most recently entered the top half).
      let best: string | null = null;
      let bestTop = -Infinity;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        // rect.top is the distance from viewport top to section top.
        // A section is "in the top half" when its top is <= midpoint.
        if (rect.top <= midpoint && rect.top > bestTop) {
          bestTop = rect.top;
          best    = id;
        }
      }

      setActiveSection(best);
    }

    update(); // run once on mount
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [isHome]);

  function isNavActive(item: (typeof NAV_ITEMS)[0]): boolean {
    if (!isHome) return false;
    if (item.sectionId === null) return activeSection === null;
    return activeSection === item.sectionId;
  }

  // ── Animation variants ───────────────────────────────────────────────────
  const panelV = {
    hidden:  { x: "100%", opacity: 0 },
    visible: { x: 0, opacity: 1,
      transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1] as Easing } },
    exit:    { x: "100%", opacity: 0,
      transition: { duration: 0.22, ease: [0.4, 0, 1, 1] as Easing } },
  };
  const mItemV = {
    hidden:  { opacity: 0, x: 20 },
    visible: (i: number) => ({
      opacity: 1, x: 0,
      transition: { delay: 0.1 + i * 0.045, duration: 0.2, ease: [0, 0, 0.2, 1] as Easing },
    }),
  };

  const mobilePanel = (
    <AnimatePresence>
      {mobileOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 bg-black/80 z-9997 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <motion.aside
            variants={panelV} initial="hidden" animate="visible" exit="exit"
            className={`fixed top-0 bottom-0 z-9999 w-72 bg-black flex flex-col md:hidden ${
              isRTL
                ? "right-0 border-s border-[#171717]"
                : "left-0 border-e border-[#171717]"
            }`}>
            <div className="flex items-center justify-between px-5 shrink-0 h-20 border-b border-b-[#171717]">
              <Image src="/assets/logo.png" alt="Monster" width={100} height={43}
                className="object-contain h-4 w-auto skew-x-12" />
              <button onClick={() => setMobileOpen(false)}
                className="p-2 text-[#ccccd0] hover:text-white transition-colors" aria-label="Close menu">
                <IoClose className="size-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-2">
              {NAV_ITEMS.map(({ labelEn, labelAr, href }, i) => (
                <motion.div key={href} custom={i} variants={mItemV} initial="hidden" animate="visible">
                  <Link
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center h-12 px-6 font-display font-bold uppercase transition-colors
                               text-[13px] tracking-[1.5px] border-b border-[#111] text-white
                               hover:text-[#6bd41a] hover:bg-[#0a0a0a]">
                    {isRTL ? labelAr : labelEn}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="p-5 space-y-3 shrink-0 border-t border-[#171717]">
              <LangToggle className="mb-8" />
              {initializationComplete && (
                isAuthenticated ? (
                  <div className="flex flex-col gap-2">
                    <Link href={`/auth/profile`} onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center h-11 bg-monster text-black font-display font-black uppercase tracking-[1.5px] text-[13px]">
                      {isRTL ? "لوحتي" : "Dashboard"}
                    </Link>
                    <button onClick={() => { logout(); setMobileOpen(false); }}
                      className="flex items-center justify-center h-11 border border-[#636363] text-white font-display font-black uppercase tracking-[1.5px] text-[13px] hover:border-white transition-colors">
                      {isRTL ? "خروج" : "Logout"}
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link href={`/auth/signin`} onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center h-11 border border-[#636363] text-white font-display font-black uppercase tracking-[1.5px] text-[13px] hover:border-white transition-colors">
                      {isRTL ? "دخول" : "Sign In"}
                    </Link>
                    <Link href={`/auth/signup`} onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center h-11 bg-monster text-black font-display font-black uppercase tracking-[1.5px] text-[13px]">
                      {isRTL ? "انضم الآن" : "Join Now"}
                    </Link>
                  </div>
                )
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-40 flex items-center rtl:flex-row-reverse h-16 bg-black border-b border-[#171717]">
        {/* Logo */}
        <Link
          href={`/`}
          className="shrink-0 flex items-center justify-center xl:ps-12 px-9 h-20 bg-[#171717] pt-4 -ms-4 pe-4 -skew-x-12">
          <Image src="/assets/logo.png" alt="Monster Energy" width={140} height={60}
            className="object-contain xl:h-17 -mt-2 h-14 w-auto skew-x-12" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center flex-1 justify-center gap-8 lg:gap-10">
          {NAV_ITEMS.map((item) => {
            const active = isNavActive(item);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative font-display font-bold uppercase transition-colors group
                            tracking-[1.5px] text-sm whitespace-nowrap
                            ${active ? "text-[#6bd41a]" : "text-white hover:text-[#6bd41a]"}`}>
                {isRTL ? item.labelAr : item.labelEn}
                <span
                  className={`absolute -bottom-5.25 inset-x-0 h-0.75 bg-monster -skew-x-12
                              transition-transform duration-200
                              ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                  style={{ transformOrigin: isRTL ? "right" : "left" }}
                />
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3 pe-6 lg:pe-9 shrink-0">
          {initializationComplete ? (
            isAuthenticated ? (
              <>
                <OutlinedParaBtn onClick={() => logout()} withBorder>
                  {isRTL ? "خروج" : "Logout"}
                </OutlinedParaBtn>
                <SolidParaBtn href={`/auth/profile`}>
                  {isRTL ? "لوحتي" : "Dashboard"}
                </SolidParaBtn>
              </>
            ) : (
              <>
                <OutlinedParaBtn href={`/auth/signin`} withBorder>
                  {isRTL ? "دخول" : "Sign In"}
                </OutlinedParaBtn>
                <SolidParaBtn href={`/auth/signup`}>
                  {isRTL ? "انضم الآن" : "Join Now"}
                </SolidParaBtn>
              </>
            )
          ) : (
            <div style={{ width: "220px" }} />
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden ltr:ms-auto rtl:me-auto me-4 p-2 text-white hover:text-[#6bd41a] transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu">
          <motion.div animate={{ rotate: mobileOpen ? 90 : 0 }} transition={{ duration: 0.18 }}>
            {mobileOpen ? <IoClose className="size-6" /> : <IoMenu className="size-6" />}
          </motion.div>
        </button>
      </header>

      {mounted && createPortal(mobilePanel, document.body)}
    </>
  );
}