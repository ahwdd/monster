// src/components/main/UserMenu.tsx
"use client";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoPersonOutline,
  IoLogOutOutline,
  IoChevronDown,
  IoAddCircleOutline,
  IoDocumentTextOutline,
  IoLockClosedOutline,
} from "react-icons/io5";
import { useAuth } from "@/hooks/useAuth";

type ProfileStatus = "APPROVED" | "PENDING" | "REJECTED" | null;

export default function UserMenu() {
  const t      = useTranslations("nav");
  const locale = useLocale();
  const isRTL  = locale === "ar";
  const { user, logout } = useAuth();

  const [open,           setOpen]           = useState(false);
  const [profileStatus,  setProfileStatus]  = useState<ProfileStatus>(null);
  const [profileChecked, setProfileChecked] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  useEffect(() => {
    if (!user || profileChecked) return;
    setProfileChecked(true);
    fetch("/api/profile/register", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => {
        setProfileStatus(d.data?.status ?? null);
      })
      .catch(() => {});
  }, [user, profileChecked]);

  const initial    = user?.firstName?.charAt(0)?.toUpperCase() ?? "?";
  const isApproved = profileStatus === "APPROVED";

  // Pending label shown next to locked item
  const pendingLabel = profileStatus === null
    ? (locale === "ar" ? "سجّل أولاً" : "Register first")
    : profileStatus === "PENDING"
      ? (locale === "ar" ? "قيد المراجعة" : "Pending")
      : (locale === "ar" ? "مرفوض" : "Rejected");

  return (
    <div ref={ref} className="relative">
      {/* Avatar trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="User menu"
        className="flex items-center gap-1.5 group"
      >
        <span className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#78be20] flex items-center justify-center
          font-display font-bold text-black txt-larger select-none
          ring-2 ring-transparent group-hover:ring-[#78be20]/40 transition-all duration-200"
        >
          {initial}
        </span>
        <IoChevronDown
          className={`size-3 text-zinc-400 transition-transform duration-200 hidden md:block ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1     }}
            exit={{    opacity: 0, y: -8, scale: 0.97  }}
            transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
            className="absolute top-full mt-2 z-50 w-64 bg-[#0d0d0d] border border-zinc-800 rounded-xl overflow-hidden shadow-2xl"
            style={{ [isRTL ? "left" : "right"]: 0 }}
          >
            {/* User info — thick bottom border */}
            <div className="px-4 py-4 border-b-4 border-zinc-800">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-[#78be20] flex items-center justify-center font-display font-bold text-black txt-larger shrink-0">
                  {initial}
                </span>
                <div className="min-w-0">
                  <p className="text-white font-medium txt-regular truncate">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-zinc-500 txt-smaller truncate">
                    {user?.email || user?.phone || ""}
                  </p>
                  {/* Profile status pill — shown when not approved */}
                  {profileStatus && profileStatus !== "APPROVED" && (
                    <span className={`inline-block mt-1 txt-smaller px-1.5 py-0.5 rounded-sm ${
                      profileStatus === "PENDING"
                        ? "text-yellow-400 bg-yellow-400/10"
                        : "text-red-400 bg-red-400/10"
                    }`}>
                      {profileStatus === "PENDING"
                        ? (locale === "ar" ? "قيد المراجعة" : "Pending Approval")
                        : (locale === "ar" ? "مرفوض" : "Rejected")
                      }
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Nav links */}
            <div className="py-1.5">

              <Link
                href={`/${locale}/auth/profile`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 txt-small text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-colors duration-150"
              >
                <IoPersonOutline className="size-4 shrink-0 text-[#78be20]" />
                {t("profile")}
              </Link>

              {isApproved ? (
                <Link
                  href={`/${locale}/submissions/submit`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 txt-small text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-colors duration-150"
                >
                  <IoAddCircleOutline className="size-4 shrink-0 text-[#78be20]" />
                  {t("newSubmission")}
                </Link>
              ) : (
                <div
                  title={pendingLabel}
                  className="flex items-center gap-3 px-4 py-2.5 txt-small text-zinc-600 cursor-not-allowed select-none"
                >
                  <IoLockClosedOutline className="size-4 shrink-0 text-zinc-700" />
                  <span className="flex-1">{t("newSubmission")}</span>
                  <span className="txt-smaller text-zinc-700 shrink-0">{pendingLabel}</span>
                </div>
              )}

              <Link
                href={`/${locale}/submissions`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 txt-small text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-colors duration-150"
              >
                <IoDocumentTextOutline className="size-4 shrink-0 text-[#78be20]" />
                {t("viewSubmissions")}
              </Link>

            </div>

            <div className="h-0.75 bg-zinc-800 mx-4 rounded-full" />

            <div className="py-1.5">
              <button
                onClick={() => { setOpen(false); logout(); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 txt-small text-zinc-300 hover:text-red-400 hover:bg-red-400/5 transition-colors duration-150 text-start"
              >
                <IoLogOutOutline className="size-4 shrink-0 text-red-400" />
                {t("logout")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}