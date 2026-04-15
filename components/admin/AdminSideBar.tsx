// src/components/admin/AdminSidebar.tsx
"use client";
import Link      from "next/link";
import Image     from "next/image";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  IoDocumentTextOutline,
  IoPersonOutline,
  IoArrowUpCircleOutline,
} from "react-icons/io5";

const NAV = [
  { key: "submissions",   href: "/admin/submissions",   Icon: IoDocumentTextOutline   },
  { key: "registrations", href: "/admin/registrations", Icon: IoPersonOutline         },
  { key: "rankUps",       href: "/admin/rank-ups",      Icon: IoArrowUpCircleOutline  },
] as const;

export default function AdminSidebar() {
  const t        = useTranslations("admin.nav");
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 bg-[#0a0a0a] border-e border-zinc-800 flex flex-col min-h-screen pt-20">
      <div className="px-5 py-4 border-b border-zinc-800">
        <Image src="/assets/logo.png" alt="Monster" width={100} height={43} className="object-contain h-8 w-auto" />
        <p className="txt-smaller text-zinc-600 mt-1 uppercase tracking-widest">Admin</p>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {NAV.map(({ key, href, Icon }) => {
          const active = pathname.includes(href);
          return (
            <Link key={key} href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl txt-small font-medium transition-colors duration-200 ${
                active
                  ? "bg-[#78be20]/10 text-[#78be20] border border-[#78be20]/20"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800"
              }`}
            >
              <Icon className="size-4 shrink-0" />
              {t(key)}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}