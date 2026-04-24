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
import { SiKick } from "react-icons/si";

const SOCIALS = [
  { Icon: IoLogoYoutube, href: "https://youtube.com", label: "YouTube" },
  { Icon: IoLogoInstagram, href: "https://instagram.com", label: "Instagram" },
  { Icon: IoLogoTwitch, href: "https://twitch.tv", label: "Twitch" },
  { Icon: SiKick, href: "https://kick.com", label: "Kick" },
  { Icon: IoLogoTiktok, href: "https://tiktok.com", label: "TikTok" },
  { Icon: IoLogoFacebook, href: "https://facebook.com", label: "Facebook" },
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
          {/* Social icons */}
          <div className="flex items-center gap-2 flex-wrap">
            {SOCIALS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 border border-[#333] flex items-center justify-center text-[#ccccd0] hover:text-white hover:border-[#555] transition-colors">
                <Icon className="size-3.5" />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns from navLinks.ts footerLinks */}
        {footerLinks.map((col) => (
          <div key={col.titleKey}>
            <p className="font-display font-bold text-white uppercase tracking-[0.15em] txt-small mb-4">
              {t(col.titleKey)}
            </p>
            <div className="flex flex-col gap-3">
              {col.links.map(({ labelKey, href }) => (
                <Link
                  key={labelKey}
                  href={`/${locale}${href}`}
                  className="font-proxima txt-small text-[#ccccd0] hover:text-white transition-colors footer-link">
                  {t(labelKey)}
                </Link>
              ))}
            </div>
          </div>
        ))}
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
