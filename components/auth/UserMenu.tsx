// src/components/auth/UserMenu.tsx
"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { IoPersonOutline, IoLogOutOutline, IoChevronDown } from "react-icons/io5";
import { useAuth } from "@/hooks/useAuth";

export default function UserMenu() {
  const t      = useTranslations("nav");
  const locale = useLocale();
  const isRTL  = locale === "ar";
  const { user, logout } = useAuth();

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const initial = user?.firstName?.charAt(0)?.toUpperCase() ?? "?";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="User menu"
        className="flex items-center gap-1.5 group"
      >
        <span
          className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#78be20] flex items-center justify-center
            font-display font-bold text-black txt-larger select-none
            ring-2 ring-transparent group-hover:ring-[#78be20]/40 transition-all duration-200"
        >
          {initial}
        </span>
        <IoChevronDown
          className={`size-3 text-zinc-400 transition-transform duration-200 hidden md:block ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1     }}
            exit={{    opacity: 0, y: -8, scale: 0.97  }}
            transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
            className="absolute top-full mt-2 z-50 w-56 bg-[#0d0d0d] border border-zinc-800 rounded-xl overflow-hidden shadow-2xl"
            style={{ [isRTL ? "left" : "right"]: 0 }}
          >

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
                </div>
              </div>
            </div>

            <div className="py-1.5">
              <Link
                href="/auth/profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 txt-regular text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-colors duration-150"
              >
                <IoPersonOutline className="size-4 shrink-0 text-[#78be20]" />
                {t("profile")}
              </Link>
            </div>

            <div className="h-0.75 bg-zinc-800 mx-4 rounded-full" />

            <div className="py-1.5">
              <button
                onClick={() => { setOpen(false); logout(); }}
                className="w-full flex items-center gap-3 px-4 py-3 txt-regular text-zinc-300 hover:text-red-400 hover:bg-red-400/5 transition-colors duration-150 text-start"
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