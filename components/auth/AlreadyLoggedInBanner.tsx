// src/components/auth/AlreadyLoggedInBanner.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";

export default function AlreadyLoggedInBanner() {
  const t = useTranslations("auth");
  const [dismissed, setDismissed] = useState(false);

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="w-full bg-[#78be20]/10 border border-[#78be20] rounded-xl p-4 mb-6 flex items-start justify-between gap-4"
        >
          <div className="flex-1">
            <p className="txt-regular font-semibold text-[#78be20] mb-1">
              {t("alreadyLoggedInTitle")}
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <Link
                href="/auth/profile"
                className="txt-small font-medium text-black bg-[#78be20] hover:bg-[#8fd428] px-4 py-1.5 rounded-sm transition-colors duration-200 uppercase tracking-wide"
              >
                {t("goToProfile")}
              </Link>
              <Link
                href="/"
                className="txt-small font-medium text-[#78be20] hover:text-[#8fd428] underline underline-offset-2 transition-colors duration-200"
              >
                {t("goToHome")}
              </Link>
            </div>
          </div>

          <button
            onClick={() => setDismissed(true)}
            className="shrink-0 text-[#78be20] hover:text-white transition-colors duration-200 mt-0.5"
            aria-label="Dismiss"
          >
            <IoClose className="size-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}