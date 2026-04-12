// src/components/auth/AuthShell.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { PiGlobeLight } from "react-icons/pi";
import LocationPopup from "@/components/main/LocationPopup";

export default function AuthShell({ children }: { children: React.ReactNode }) {
  const t = useTranslations("location");
  const [locationOpen, setLocationOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-(--color-bg)">
      {/* Minimal header */}
      <header className="fixed top-0 inset-x-0 z-40 flex items-center justify-between h-16 px-4 md:px-8
        bg-[rgba(5,5,5,0.97)] border-b border-zinc-900 backdrop-blur-sm">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/assets/logo.png" alt="Monster Energy" width={120} height={52} className="object-contain h-10 w-auto" />
        </Link>

        {/* Globe only */}
        <button
          className="size-10 flex items-center justify-center text-white hover:text-accent transition-colors duration-200"
          onClick={() => setLocationOpen(true)}
          aria-label={t("title")}
        >
          <PiGlobeLight className="size-5.5" />
        </button>
      </header>

      {/* Page content pushed below header */}
      <main className="flex-1 pt-16">
        {children}
      </main>

      {locationOpen && <LocationPopup onClose={() => setLocationOpen(false)} />}
    </div>
  );
}