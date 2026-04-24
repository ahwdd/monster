// src/components/ui/LangToggle.tsx
"use client";
import Link from "next/link";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";

type Props = {
  className?: string;
};

export default function LangToggle({ className = "" }: Props) {
  const locale = useLocale();
  const pathname = usePathname();
  const isAr = locale === "ar";

  const enPath = pathname.replace(/^\/(ar)/, "/en");
  const arPath = pathname.replace(/^\/(en)/, "/ar");

  return (
    <div
      className={`flex items-center overflow-hidden border border-[#333] ${className}`}
      style={{ height: "30px" }}>
      {!isAr ? (
        <span
          className="flex items-center justify-center px-3 font-display font-bold uppercase"
          style={{
            fontSize: "11px",
            letterSpacing: "1px",
            background: "#6bd41a",
            color: "#000",
            height: "100%",
          }}>
          EN
        </span>
      ) : (
        <Link
          href={enPath}
          className="flex items-center justify-center px-3 font-display font-bold uppercase hover:text-white transition-colors"
          style={{
            fontSize: "11px",
            letterSpacing: "1px",
            color: "#666",
            height: "100%",
          }}>
          EN
        </Link>
      )}
      <div className="w-px h-full bg-[#333]" />
      {isAr ? (
        <span
          className="flex items-center justify-center px-3 font-display font-bold uppercase"
          style={{
            fontSize: "11px",
            letterSpacing: "1px",
            background: "#6bd41a",
            color: "#000",
            height: "100%",
          }}>
          AR
        </span>
      ) : (
        <Link
          href={arPath}
          className="flex items-center justify-center px-3 font-display font-bold uppercase hover:text-white transition-colors"
          style={{
            fontSize: "11px",
            letterSpacing: "1px",
            color: "#666",
            height: "100%",
          }}>
          AR
        </Link>
      )}
    </div>
  );
}
