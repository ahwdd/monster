// src/components/auth/AuthShell.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { PiGlobeLight } from "react-icons/pi";
import LocationPopup from "@/components/main/LocationPopup";
import { useAuth } from "@/hooks/useAuth";
import UserMenu from "./UserMenu";

export default function AuthShell({ children }: { children: React.ReactNode }) {
  const t = useTranslations();
  const locale = useLocale();
  const { isAuthenticated, initializationComplete } = useAuth();

  const [locationOpen, setLocationOpen] = useState(false);

  const homeHref = `/${locale}`;

  return (
    <div className="min-h-screen flex flex-col bg-(--color-bg)">
      <header
        className="fixed top-0 inset-x-0 z-40 flex items-center justify-between h-16 px-4 md:px-8
        bg-[rgba(5,5,5,0.97)] border-b border-zinc-900 backdrop-blur-sm">
        <Link href={homeHref} className="flex items-center shrink-0">
          <Image
            src="/assets/logo.png"
            alt="Monster Energy"
            width={120}
            height={52}
            className="object-contain h-10 w-auto"
          />
        </Link>

        {/* Right side: globe + user controls */}
        <div className="flex items-center gap-1">
          {/* Globe */}
          <button
            className="size-10 flex items-center justify-center text-white hover:text-accent transition-colors duration-200"
            onClick={() => setLocationOpen(true)}
            aria-label={t("location.title")}>
            <PiGlobeLight className="size-5.5" />
          </button>

          {initializationComplete &&
            (isAuthenticated ? (
              <UserMenu />
            ) : (
              <Link
                href={`/${locale}/auth/signin`}
                className="hidden md:flex items-center px-3 py-1.5 txt-small font-semibold uppercase
                    border border-[#78be20] text-[#78be20] hover:bg-[#78be20] hover:text-black
                    rounded-sm transition-colors duration-200">
                {t("nav.signin")}
              </Link>
            ))}
        </div>
      </header>

      <main className="flex-1 pt-16">{children}</main>

      {locationOpen && <LocationPopup onClose={() => setLocationOpen(false)} />}
    </div>
  );
}
