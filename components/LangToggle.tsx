"use client";

import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { useTransition } from "react";

type Props = { label: string };

export default function LangToggle({ label }: Props) {
  const locale   = useLocale();
  const router   = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function toggle() {
    const nextLocale = locale === "en" ? "ar" : "en";
    const newPath    = pathname.replace(`/${locale}`, `/${nextLocale}`);
    startTransition(() => router.push(newPath));
  }

  return (
    <button
      onClick={toggle}
      disabled={isPending}
      className="px-3 py-1 txt-smaller font-bold rounded-sm border border-[#333] text-accent bg-transparent cursor-pointer transition-all disabled:opacity-50"
    >
      {label}
    </button>
  );
}