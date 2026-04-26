// src/app/[locale]/admin/layout.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  IoDocumentTextOutline,
  IoPeopleOutline,
  IoArrowUpCircleOutline,
  IoGridOutline,
} from "react-icons/io5";
import { useAuth } from "@/hooks/useAuth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations("admin");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, initializationComplete } = useAuth();

  useEffect(() => {
    if (!initializationComplete) return;
    if (!isAuthenticated || user?.role !== "ADMIN") router.replace(`/`);
  }, [initializationComplete, isAuthenticated, user, router, locale]);

  const NAV = [
    { href: `/admin/submissions`,   icon: IoDocumentTextOutline, labelEn: "Submissions",   labelAr: "المشاركات" },
    { href: `/admin/registrations`, icon: IoPeopleOutline,        labelEn: "Registrations", labelAr: "التسجيلات" },
    { href: `/admin/rank-ups`,      icon: IoArrowUpCircleOutline, labelEn: "Rank Ups",      labelAr: "الترقيات" },
  ];

  return (
    <div className="flex min-h-screen bg-[#000]">
      {/* Fixed sidebar */}
      <aside
        className="fixed top-0 bottom-0 z-30 flex flex-col bg-[#050505]"
        style={{
          width: "240px",
          borderInlineEnd: "1px solid #272727",
          [isRTL ? "right" : "left"]: 0,
        }}>
        {/* Logo area */}
        <div
          className="flex items-center px-6 shrink-0"
          style={{ height: "80px", borderBottom: "1px solid #272727" }}>
          <Link href={`/admin/submissions`}>
            <Image src="/assets/logo.png" alt="Monster" width={120} height={52} className="object-contain h-8 w-auto" />
          </Link>
        </div>

        {/* Admin label */}
        <div className="px-6 py-4 border-b border-[#272727]">
          <p className="font-display font-bold uppercase text-[#6bd41a] tracking-[2px]" style={{ fontSize: "11px" }}>
            {isRTL ? "لوحة الإدارة" : "Admin Panel"}
          </p>
        </div>

        {/* Nav links */}
        <nav className="flex-1 py-4">
          {NAV.map(({ href, icon: Icon, labelEn, labelAr }) => {
            const isActive = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-6 h-12 font-proxima txt-small transition-colors ${
                  isActive
                    ? "text-[#6bd41a] bg-[#6bd41a]/5 border-s-2 border-[#6bd41a]"
                    : "text-[#ccccd0] hover:text-white hover:bg-white/5"
                }`}>
                <Icon className="size-4 shrink-0" />
                {isRTL ? labelAr : labelEn}
              </Link>
            );
          })}
        </nav>

        {/* User info bottom */}
        {user && (
          <div className="px-6 py-4 border-t border-[#272727]">
            <p className="font-proxima txt-smaller text-[#555]">
              {user.firstName} {user.lastName}
            </p>
            <p className="font-proxima txt-smaller text-[#333]">{user.email ?? user.phone ?? ""}</p>
          </div>
        )}
      </aside>

      {/* Main content — offset by sidebar width */}
      <div
        className="flex-1 flex flex-col"
        style={{ [isRTL ? "marginRight" : "marginLeft"]: "240px" }}>
        {/* Top header bar */}
        <header
          className="sticky top-0 z-20 flex items-center justify-between px-6 bg-[#050505]"
          style={{ height: "80px", borderBottom: "1px solid #272727" }}>
          <h1 className="font-display font-black text-white uppercase tracking-wide" style={{ fontSize: "1.2rem" }}>
            {t("dashboardTitle")}
          </h1>
          <Link
            href={`/`}
            className="font-proxima txt-smaller text-[#ccccd0] hover:text-white transition-colors">
            {isRTL ? "← الموقع الرئيسي" : "← Main Site"}
          </Link>
        </header>

        {/* Page content */}
        <motion.main
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 overflow-x-auto">
          {children}
        </motion.main>
      </div>
    </div>
  );
}