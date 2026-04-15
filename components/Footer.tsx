// src/components/Footer.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import {
  IoLogoYoutube,
  IoLogoInstagram,
  IoLogoTwitch,
  IoLogoFacebook,
  IoLogoTiktok,
} from "react-icons/io5";
import { SiKick } from "react-icons/si";
import { footerLinks } from "@/lib/data/navLinks";

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
    <footer className="bg-[#050505] border-t border-zinc-900">
      {/* ── Main grid ── */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand column */}
        <div className="md:col-span-1">
          <Link href={`/${locale}`} className="inline-block mb-5">
            <Image
              src="/assets/logo.png"
              alt="Monster Energy"
              width={140}
              height={60}
              className="object-contain h-10 w-auto"
            />
          </Link>
          <p className="font-proxima txt-small text-zinc-500 leading-relaxed mb-6 max-w-xs">
            {locale === "ar"
              ? "برنامج تطوير لصناع محتوى الألعاب في منطقة MENA. لا مكافآت مضمونة — كل شيء يُكتسب."
              : "A gaming content creator development program across MENA. No guaranteed rewards — everything is earned."}
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-3 flex-wrap">
            {SOCIALS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 flex items-center justify-center text-zinc-500
                  hover:text-[#78be20] transition-colors duration-200">
                <Icon className="size-4.5" />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {footerLinks.map((col) => (
          <div key={col.titleKey}>
            <p className="font-display font-bold text-white uppercase tracking-widest txt-small mb-5">
              {t(col.titleKey)}
            </p>
            <ul className="space-y-3">
              {col.links.map(({ labelKey, href }) => (
                <li key={labelKey}>
                  <Link
                    href={`/${locale}${href}`}
                    className="font-proxima txt-small text-zinc-500 hover:text-[#78be20]
                      transition-colors duration-200 flex items-center gap-1.5 group">
                    <span
                      className="w-1 h-1 rounded-full bg-zinc-700
                      group-hover:bg-[#78be20] transition-colors shrink-0"
                    />
                    {t(labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-zinc-900">
        <div
          className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center
          justify-between gap-3 txt-smaller text-zinc-600">
          <p>
            © {year} Monster Energy Ambassadors Program.{" "}
            {locale === "ar" ? "جميع الحقوق محفوظة." : "All rights reserved."}
          </p>
          <div className="flex items-center gap-4">
            <Link
              href={`/${locale}/program`}
              className="hover:text-zinc-400 transition-colors">
              {locale === "ar" ? "عن البرنامج" : "About"}
            </Link>
            <Link
              href={`/${locale}/ranks`}
              className="hover:text-zinc-400 transition-colors">
              {locale === "ar" ? "التصنيفات" : "Ranks"}
            </Link>
            <Link
              href={`/${locale}/leaderboard`}
              className="hover:text-zinc-400 transition-colors">
              {locale === "ar" ? "لوحة الصدارة" : "Leaderboard"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
