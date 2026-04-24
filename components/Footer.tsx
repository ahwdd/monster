// src/components/main/Footer.tsx
"use client";
import Link from "next/image";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { footerLinks } from "@/lib/data/navLinks";
import {
  IoLogoYoutube,
  IoLogoInstagram,
  IoLogoTwitch,
  IoLogoFacebook,
  IoLogoTiktok,
} from "react-icons/io5";
import { SiKick, SiX } from "react-icons/si";
import { FaSnapchatGhost } from "react-icons/fa";
import NextLink from "next/link";

const SOCIALS = [
  { Icon: IoLogoFacebook, href: "https://facebook.com", label: "Facebook" },
  { Icon: IoLogoInstagram, href: "https://instagram.com", label: "Instagram" },
  { Icon: IoLogoYoutube, href: "https://youtube.com", label: "YouTube" },
  { Icon: SiX, href: "https://x.com", label: "X" },
  { Icon: IoLogoTiktok, href: "https://tiktok.com", label: "TikTok" },
  { Icon: FaSnapchatGhost, href: "https://snapchat.com", label: "Snapchat" },
  { Icon: IoLogoTwitch, href: "https://twitch.tv", label: "Twitch" },
  { Icon: SiKick, href: "https://kick.com", label: "Kick" },
];

export default function Footer() {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer
      className="bg-black border-t border-[#272727]"
      dir={isRTL ? "rtl" : "ltr"}>
      {/*
        Layout:
        - Mobile  (<md): single column stack
        - Tablet  (md):  2-column grid
        - Desktop (lg):  4-column grid — Brand | Program | Join | Connect
      */}
      <div className="container mx-auto px-6 sm:px-8 lg:px-14 py-10 sm:py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_180px_180px_180px] gap-10 lg:gap-12">
        {/* ── Brand column ── */}
        <div className={isRTL ? "text-right" : "text-left"}>
          <NextLink href={`/${locale}`} className="inline-block mb-4">
            {/* 
              next/image requires explicit width/height.
              object-contain + h-10 w-auto keeps the logo proportional
              and prevents it from being clipped or stretched.
            */}
            <Image
              src="/assets/logo.png"
              alt="Monster Energy"
              width={140}
              height={60}
              className="object-contain h-10 w-auto"
              priority={false}
            />
          </NextLink>
          <p className="font-proxima text-sm text-[#ccccd0] leading-relaxed mb-5 max-w-65">
            {isRTL
              ? "برنامج تطوير لصناع محتوى الألعاب في منطقة MENA."
              : "A gaming content creator development program across MENA."}
          </p>
        </div>

        {/* ── Link columns from footerLinks ── */}
        {footerLinks.map((col) => (
          <div
            key={col.titleKey}
            className={isRTL ? "text-right" : "text-left"}>
            <p
              className={`font-display font-bold text-white uppercase text-xs mb-3 ${
                isRTL ? "tracking-normal" : "tracking-[0.15em]"
              }`}>
              {t(col.titleKey)}
            </p>
            <div className="flex flex-col gap-1.5">
              {col.links.map(({ labelKey, href }) => (
                <NextLink
                  key={labelKey}
                  href={`/${locale}${href}`}
                  className="font-proxima text-sm text-white transition-colors hover:text-[#6bd41a] footer-link">
                  {t(labelKey)}
                </NextLink>
              ))}
            </div>
          </div>
        ))}

        {/* ── Connect / Socials column ── */}
        <div className={isRTL ? "text-right" : "text-left"}>
          <p
            className={`font-display font-bold text-white uppercase text-xs mb-4 ${
              isRTL ? "tracking-normal" : "tracking-[0.15em]"
            }`}>
            {t("footer.connect")}
          </p>

          {/* 4-column icon grid; gap tightened for small screens */}
          <div className="grid grid-cols-4 gap-x-3 gap-y-4 w-fit">
            {SOCIALS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-white hover:text-[#6bd41a] transition-colors block">
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-[#272727]">
        <div
          className={`container mx-auto px-6 sm:px-8 lg:px-14 flex flex-col sm:flex-row items-center gap-2 sm:gap-0 sm:justify-between 
            font-proxima text-[#ccccd0] py-4 sm:py-0 sm:h-14.5 text-[13px] ${
            isRTL ? "sm:flex-row-reverse" : ""
          }`}>
          <span>© {year} Monster Energy Ambassadors Program.</span>
          <NextLink
            href={`/${locale}/terms`}
            className="hover:text-white transition-colors">
            {t("footer.terms")}
          </NextLink>
        </div>
      </div>
    </footer>
  );
}
