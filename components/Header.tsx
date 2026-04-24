// src/components/main/Header.tsx
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

export default function Header() {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const pathname = usePathname();

  const { isAuthenticated, initializationComplete, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

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

  const NAV_ITEMS = [
    { labelEn: "Home", labelAr: "الرئيسية", href: `/${locale}` },
    { labelEn: "Overview", labelAr: "نظرة عامة", href: `/${locale}/program` },
    { labelEn: "Levels", labelAr: "التصنيفات", href: `/${locale}/ranks` },
    {
      labelEn: "Rewards",
      labelAr: "المكافآت",
      href: `/${locale}/program#rewards`,
    },
    {
      labelEn: "Leaderboard",
      labelAr: "الصدارة",
      href: `/${locale}/leaderboard`,
    },
  ];

  const isActive = (href: string) => {
    if (href === `/${locale}`)
      return pathname === `/${locale}` || pathname === `/${locale}/`;
    return pathname.startsWith(href.split("#")[0]);
  };

  const panelV = {
    hidden: { x: isRTL ? "100%" : "-100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1] as Easing },
    },
    exit: {
      x: isRTL ? "100%" : "-100%",
      opacity: 0,
      transition: { duration: 0.22, ease: [0.4, 0, 1, 1] as Easing },
    },
  };

  const mItemV = {
    hidden: { opacity: 0, x: isRTL ? 20 : -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1 + i * 0.045,
        duration: 0.2,
        ease: [0, 0, 0.2, 1] as Easing,
      },
    }),
  };

  const mobilePanel = (
    <AnimatePresence>
      {mobileOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 bg-black/80 z-9997 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <motion.aside
            variants={panelV}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`fixed top-0 bottom-0 z-9999 w-72 bg-black flex flex-col md:hidden ${isRTL ? "right-0 border-s border-[#171717]" : "left-0 border-e border-[#171717]"}`}>
            <div
              className="flex items-center justify-between px-5 shrink-0 h-20 border-b border-b-[#171717]">
              <Image
                src="/assets/logo.png"
                alt="Monster"
                width={100}
                height={43}
                className="object-contain h-8 w-auto"
              />
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-[#ccccd0] hover:text-white transition-colors">
                <IoClose className="size-5" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto py-2">
              {NAV_ITEMS.map(({ labelEn, labelAr, href }, i) => (
                <motion.div
                  key={href}
                  custom={i}
                  variants={mItemV}
                  initial="hidden"
                  animate="visible">
                  <Link
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center h-12 px-6 font-display font-bold uppercase transition-colors ${isActive(href) ? "text-[#6bd41a] bg-[#0a0a0a]" : "text-white hover:text-[#6bd41a] hover:bg-[#0a0a0a]"}`}
                    style={{
                      fontSize: "13px",
                      letterSpacing: "1.5px",
                      borderBottom: "1px solid #111",
                    }}>
                    {isRTL ? labelAr : labelEn}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div
              className="p-5 space-y-4 shrink-0"
              style={{ borderTop: "1px solid #171717" }}>
              <LangToggle />
              {initializationComplete &&
                (isAuthenticated ? (
                  <div className="flex flex-col gap-2">
                    <Link
                      href={`/${locale}/auth/profile`}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center h-11 bg-[#6bd41a] text-black font-display font-black uppercase tracking-[1.5px]"
                      style={{ fontSize: "13px" }}>
                      {isRTL ? "لوحتي" : "Dashboard"}
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setMobileOpen(false);
                      }}
                      className="flex items-center justify-center h-11 border border-[#636363] text-white font-display font-black uppercase tracking-[1.5px] hover:border-white transition-colors"
                      style={{ fontSize: "13px" }}>
                      {isRTL ? "خروج" : "Logout"}
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link
                      href={`/${locale}/auth/signin`}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center h-11 border border-[#636363] text-white font-display font-black uppercase tracking-[1.5px] hover:border-white transition-colors"
                      style={{ fontSize: "13px" }}>
                      {isRTL ? "دخول" : "Sign In"}
                    </Link>
                    <Link
                      href={`/${locale}/auth/signup`}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center h-11 bg-[#6bd41a] text-black font-display font-black uppercase tracking-[1.5px]"
                      style={{ fontSize: "13px" }}>
                      {isRTL ? "انضم الآن" : "Join Now"}
                    </Link>
                  </div>
                ))}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <header
        className="fixed top-0 inset-x-0 z-40 flex items-center h-16 bg-black border-b border-b-[#171717]">
        <Link
          href={`/${locale}`}
          className="shrink-0 flex items-center justify-center px-9 h-20 bg-[#171717] pt-4 -ms-4 pe-4 -skew-x-12">
          <Image
            src="/assets/logo.png"
            alt="Monster Energy"
            width={140}
            height={60}
            className="object-contain"
          />
        </Link>

        <nav className="hidden md:flex items-center flex-1 justify-center gap-10">
          {NAV_ITEMS.map(({ labelEn, labelAr, href }) => (
            <Link
              key={href}
              href={href}
              className={`relative font-display font-bold uppercase transition-colors group tracking-[1.5px] text-sm`}>
              {isRTL ? labelAr : labelEn}
              <span
                className={`absolute -bottom-5 inset-s-0 inset-e-0 h-1 bg-monster -skew-x-12 transition-transform scale-x-0 group-hover:scale-x-100`}
                style={{ transformOrigin: isRTL ? "right" : "left" }}
              />
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-5 pe-9 shrink-0">
          {initializationComplete ? (
            isAuthenticated ? (
              <div className="flex items-center gap-3">
                <OutlinedParaBtn onClick={() => logout()}>
                  {isRTL ? "خروج" : "Logout"}
                </OutlinedParaBtn>
                <SolidParaBtn href={`/${locale}/auth/profile`}>
                  {isRTL ? "لوحتي" : "Dashboard"}
                </SolidParaBtn>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <OutlinedParaBtn href={`/${locale}/auth/signin`}>
                  {isRTL ? "دخول" : "Sign In"}
                </OutlinedParaBtn>
                <SolidParaBtn href={`/${locale}/auth/signup`}>
                  {isRTL ? "انضم الآن" : "Join Now"}
                </SolidParaBtn>
              </div>
            )
          ) : (
            <div style={{ width: "260px" }} />
          )}
        </div>

        <button
          className="md:hidden ms-auto me-5 p-2 text-white hover:text-[#6bd41a] transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu">
          <motion.div
            animate={{ rotate: mobileOpen ? 90 : 0 }}
            transition={{ duration: 0.18 }}>
            {mobileOpen ? (
              <IoClose className="size-6" />
            ) : (
              <IoMenu className="size-6" />
            )}
          </motion.div>
        </button>
      </header>

      {mounted && createPortal(mobilePanel, document.body)}
    </>
  );
}
