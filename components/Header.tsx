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

// ─────────────────────────────────────────────────────────────────
// XD button shapes decoded from path data:
//
// Sign In  (Group 4): outlined parallelogram
//   Main border: M9 0 L110 0 L101 44 L0 44 Z  stroke=#636363
//   Corner sq  : M2.5 0 L14.9 0 L12.5 10 L0 10 Z  fill=#636363  (bottom-right)
//   Left sliver: M11.4 0 L17 0 L7 44 L1 44 Z       fill=#ffffff  (start edge)
//
// Join Now (Group 5): solid parallelogram
//   Body       : M9 0 L138 0 L129 44 L0 44 Z  fill=#6bd41a
//
// The skew angle is atan(9/44) ≈ 11.6°  →  CSS skew(-11.6deg)
// ─────────────────────────────────────────────────────────────────

// Outlined parallelogram — "Sign In" / "Logout"
// Renders as a skewed container with border + corner square + left sliver
function OutlinedParaBtn({
  children,
  onClick,
  href,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
}) {
  const content = (
    // Outer skewed wrapper
    <span
      className="relative inline-flex items-center justify-center
        font-display font-bold uppercase text-white cursor-pointer select-none
        transition-opacity hover:opacity-80"
      style={{
        height: "44px",
        paddingInline: "20px 18px",
        fontSize: "13px",
        letterSpacing: "1.5px",
        transform: "skewX(-11.6deg)",
        /* XD: stroke #636363 border */
        border: "1px solid #636363",
      }}>
      {/* XD Path 4: white left-edge sliver — positioned at start */}
      <span
        className="absolute inset-y-0 inset-s-0 w-1.75 bg-white"
        style={{ transform: "skewX(0deg)" }}
      />
      {/* XD Path 3: #636363 small square — bottom-end corner */}
      <span
        className="absolute bottom-0 inset-e-0 w-2.5 h-2.5"
        style={{ background: "#636363" }}
      />
      {/* Un-skew the text */}
      <span
        className="relative z-10"
        style={{ transform: "skewX(11.6deg)", paddingInlineStart: "6px" }}>
        {children}
      </span>
    </span>
  );

  if (href) return <Link href={href}>{content}</Link>;
  return <button onClick={onClick}>{content}</button>;
}

// Solid parallelogram — "Join Now" / "Dashboard"
function SolidParaBtn({
  children,
  onClick,
  href,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
}) {
  const content = (
    <span
      className="relative inline-flex items-center justify-center
        font-display font-bold uppercase text-white cursor-pointer select-none
        transition-opacity hover:opacity-90"
      style={{
        height: "44px",
        paddingInline: "22px",
        fontSize: "13px",
        letterSpacing: "1.5px",
        background: "#6bd41a",
        transform: "skewX(-11.6deg)",
      }}>
      {/* Un-skew text */}
      <span className="relative z-10" style={{ transform: "skewX(11.6deg)" }}>
        {children}
      </span>
    </span>
  );

  if (href) return <Link href={href}>{content}</Link>;
  return <button onClick={onClick}>{content}</button>;
}

// ── Language toggle — EN | AR, selected = #6bd41a bg, unselected = #666 ──
function LangToggle() {
  const locale = useLocale();
  const pathname = usePathname();
  const isAr = locale === "ar";

  const enPath = pathname.replace(/^\/(ar)/, "/en");
  const arPath = pathname.replace(/^\/(en)/, "/ar");

  return (
    <div
      className="flex items-center overflow-hidden border border-[#333]"
      style={{ height: "30px" }}>
      {/* EN */}
      {!isAr ? (
        <span
          className="flex items-center justify-center px-3 font-display font-bold uppercase"
          style={{
            fontSize: "11px",
            letterSpacing: "1px",
            background: "#6bd41a",
            color: "#000",
            height: "100%",
          }}>
          EN
        </span>
      ) : (
        <Link
          href={enPath}
          className="flex items-center justify-center px-3 font-display font-bold uppercase
            hover:text-white transition-colors"
          style={{
            fontSize: "11px",
            letterSpacing: "1px",
            color: "#666",
            height: "100%",
          }}>
          EN
        </Link>
      )}
      {/* Divider */}
      <div className="w-px h-full bg-[#333]" />
      {/* AR */}
      {isAr ? (
        <span
          className="flex items-center justify-center px-3 font-display font-bold uppercase"
          style={{
            fontSize: "11px",
            letterSpacing: "1px",
            background: "#6bd41a",
            color: "#000",
            height: "100%",
          }}>
          AR
        </span>
      ) : (
        <Link
          href={arPath}
          className="flex items-center justify-center px-3 font-display font-bold uppercase
            hover:text-white transition-colors"
          style={{
            fontSize: "11px",
            letterSpacing: "1px",
            color: "#666",
            height: "100%",
          }}>
          AR
        </Link>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
export default function Header() {
  const locale = useLocale();
  const isRTL = locale === "ar";

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

  // XD nav items — matches "Home Overview Levels Rewards Leaderboard"
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

  // ── Mobile panel ─────────────────────────────────────────────
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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 bg-black/80 z-9997 md:hidden"
            onClick={() => setMobileOpen(false)}
          />

          {/* Panel */}
          <motion.aside
            variants={panelV}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`fixed top-0 bottom-0 z-9999 w-72 bg-black flex flex-col md:hidden
              ${isRTL ? "right-0 border-s border-[#171717]" : "left-0 border-e border-[#171717]"}`}>
            {/* Panel top */}
            <div
              className="flex items-center justify-between px-5 shrink-0"
              style={{ height: "80px", borderBottom: "1px solid #171717" }}>
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

            {/* Nav links */}
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
                    className="flex items-center h-12.5 px-6 font-display font-bold uppercase
                      text-white hover:text-[#6bd41a] hover:bg-[#0a0a0a] transition-colors"
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

            {/* Bottom: lang + auth */}
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
                      className="flex items-center justify-center h-11 bg-[#6bd41a] text-black
                        font-display font-black uppercase tracking-[1.5px]"
                      style={{ fontSize: "13px" }}>
                      {isRTL ? "لوحتي" : "Dashboard"}
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setMobileOpen(false);
                      }}
                      className="flex items-center justify-center h-11 border border-[#636363]
                        text-white font-display font-black uppercase tracking-[1.5px] hover:border-white transition-colors"
                      style={{ fontSize: "13px" }}>
                      {isRTL ? "خروج" : "Logout"}
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link
                      href={`/${locale}/auth/signin`}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center h-11 border border-[#636363]
                        text-white font-display font-black uppercase tracking-[1.5px] hover:border-white transition-colors"
                      style={{ fontSize: "13px" }}>
                      {isRTL ? "دخول" : "Sign In"}
                    </Link>
                    <Link
                      href={`/${locale}/auth/signup`}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center h-11 bg-[#6bd41a] text-black
                        font-display font-black uppercase tracking-[1.5px]"
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
      {/* ── XD Header: 1920×80 black, 1px #171717 bottom ── */}
      <header
        className="fixed top-0 inset-x-0 z-40 flex items-center"
        style={{
          height: "80px",
          background: "#000000",
          borderBottom: "1px solid #171717",
        }}>
        {/* Logo — XD: tx=36 from left */}
        <Link
          href={`/${locale}`}
          className="shrink-0 flex items-center justify-center px-9"
          style={{ height: "80px" }}>
          <Image
            src="/assets/logo.png"
            alt="Monster Energy"
            width={140}
            height={60}
            className="object-contain"
            style={{ maxHeight: "54px" }}
          />
        </Link>

        {/* ── Nav — XD: white text, centered ── */}
        <nav className="hidden md:flex items-center flex-1 justify-center gap-10">
          {NAV_ITEMS.map(({ labelEn, labelAr, href }) => (
            <Link
              key={href}
              href={href}
              className="relative font-display font-bold uppercase text-white
                hover:text-[#6bd41a] transition-colors group"
              style={{ fontSize: "13px", letterSpacing: "1.5px" }}>
              {isRTL ? labelAr : labelEn}
              {/* Hover underline */}
              <span
                className="absolute -bottom-1 inset-s-0 inset-e-0 h-0.5 bg-[#6bd41a]
                  scale-x-0 group-hover:scale-x-100 transition-transform"
                style={{ transformOrigin: isRTL ? "right" : "left" }}
              />
            </Link>
          ))}
        </nav>

        {/* ── Right: Lang + Auth buttons ── */}
        <div className="hidden md:flex items-center gap-5 pe-9 shrink-0">
          <LangToggle />

          {/* Auth — XD parallelogram buttons */}
          {initializationComplete ? (
            isAuthenticated ? (
              // LOGGED IN → Logout (outlined) + Dashboard (green solid)
              <div className="flex items-center gap-3">
                <OutlinedParaBtn onClick={() => logout()}>
                  {isRTL ? "خروج" : "Logout"}
                </OutlinedParaBtn>
                <SolidParaBtn href={`/${locale}/auth/profile`}>
                  {isRTL ? "لوحتي" : "Dashboard"}
                </SolidParaBtn>
              </div>
            ) : (
              // LOGGED OUT → Sign In (outlined) + Join Now (green solid)
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

        {/* Mobile hamburger */}
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
