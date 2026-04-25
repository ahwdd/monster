// src/components/auth/AuthShell.tsx
"use client";
import Link from "next/link";
import { useLocale } from "next-intl";
import Header from "../Header";
import Footer from "../Footer";
import LangToggle from "../LangToggle";

type Crumb = { label: string; href?: string };
type Props = { children: React.ReactNode; breadcrumbs?: Crumb[] };

export default function AuthShell({ children, breadcrumbs }: Props) {
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <div className="min-h-screen w-full bg-black flex flex-col">
      <Header />

      <div
        className="container mt-14 px-35 flex items-center justify-center gap-3 
        font-proxima text-[#ccccd0] txt-regular h-14.5 relative">
        <Link
          href={`/${locale}`}
          className="hover:text-white transition-colors">
          {isAr ? "الرئيسية" : "Home"}
        </Link>
        {breadcrumbs?.map((crumb, i) => (
          <span key={i} className="contents">
            <span className="text-[#555]">›</span>
            {crumb.href ? (
              <Link
                href={crumb.href}
                className="hover:text-white transition-colors">
                {crumb.label}
              </Link>
            ) : (
              <span>{crumb.label}</span>
            )}
          </span>
        ))}
        <LangToggle className="ms-auto absolute inset-s-[9%] top-4" />
      </div>

      <main className="flex-1 bg-black">{children}</main>

    </div>
  );
}
