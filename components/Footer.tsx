// src/components/main/Footer.tsx
"use client";
import Link from "next/link";
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

const SOCIALS = [
  { Icon: IoLogoFacebook, href: "https://facebook.com", label: "Facebook" },
  { Icon: IoLogoInstagram, href: "https://instagram.com", label: "Instagram" },
  { Icon: IoLogoYoutube, href: "https://youtube.com", label: "YouTube" },
  { Icon: SiX, href: "https://x.com", label: "X"},
  { Icon: IoLogoTiktok, href: "https://tiktok.com", label: "TikTok" },
  { Icon: FaSnapchatGhost, href: "https://snapchat.com", label: "Snapchat" },
  { Icon: IoLogoTwitch, href: "https://twitch.tv", label: "Twitch" },
  { Icon: SiKick, href: "https://kick.com", label: "Kick" },
];

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-[#272727]">
      {/* XD: 4-column grid — Brand | Program | Join | Connect */}
      <div
        className="container px-35 py-12 grid gap-12"
        style={{ gridTemplateColumns: "1fr 200px 200px 200px" }}>
        {/* Brand column */}
        <div>
          <Link href={`/${locale}`} className="inline-block mb-4">
            <Image
              src="/assets/logo.png"
              alt="Monster Energy"
              width={140}
              height={60}
              className="object-contain h-10 w-auto"
            />
          </Link>
          <p className="font-proxima txt-small text-[#ccccd0] leading-relaxed mb-5 max-w-65">
            {locale === "ar"
              ? "برنامج تطوير لصناع محتوى الألعاب في منطقة MENA."
              : "A gaming content creator development program across MENA."}
          </p>
        </div>

        {/* Link columns from navLinks.ts footerLinks */}
        {footerLinks.map((col) => (
          <div key={col.titleKey}>
            <p className="font-display font-bold text-white uppercase tracking-[0.15em] txt-small mb-2">
              {t(col.titleKey)}
            </p>
            <div className="flex flex-col gap-1">
              {col.links.map(({ labelKey, href }) => (
                <Link
                  key={labelKey}
                  href={`/${locale}${href}`}
                  className="font-proxima txt-small text-white transition-colors footer-link">
                  {t(labelKey)}
                </Link>
              ))}
            </div>
          </div>
        ))}
        
        <div className="">
          <p className="font-display font-bold text-white uppercase tracking-[0.15em] txt-small mb-3">
            {t("footer.connect")}
          </p>
          
          <div className="grid grid-cols-4 gap-x-2 gap-y-8 h-fit">       
            {SOCIALS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-white block h-fit">
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#272727]">
        <div
          className="container px-35 flex items-center justify-between font-proxima text-[#ccccd0]"
          style={{ height: "58px", fontSize: "13px" }}>
          <span>© {year} Monster Energy Ambassadors Program.</span>
          <Link
            href={`/${locale}/terms`}
            className="hover:text-white transition-colors">
            {t("footer.terms")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
