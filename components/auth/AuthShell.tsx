// src/components/auth/AuthShell.tsx
"use client";
import Link from "next/link";
import { useLocale } from "next-intl";
import Header from "../Header";
import Footer from "../Footer";

type Crumb = { label: string; href?: string };
type Props = { children: React.ReactNode; breadcrumbs?: Crumb[] };

export default function AuthShell({ children, breadcrumbs }: Props) {
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />

      <div className="mt-20 border-b border-[#171717]">
        <div
          className="container px-35 flex items-center gap-3 font-proxima text-[#ccccd0] txt-regular"
          style={{ height: "58px" }}>
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
        </div>
      </div>

      <main className="flex-1 bg-black">{children}</main>

    </div>
  );
}
