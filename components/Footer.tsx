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
    <footer className="bg-[#050505] border-t border-zinc-900">
      <div
        className="max-w-7xl mx-auto px-5 py-10 md:py-16
        grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">

        <div className="col-span-2 md:col-span-1">
          <Link href={`/${locale}`} className="inline-block mb-4">
            <Image
              src="/assets/logo.png"
              alt="Monster Energy"
              width={140}
              height={60}
              className="object-contain h-8 md:h-10 w-auto"
            />
          </Link>
          <p className="font-proxima txt-small text-zinc-500 leading-relaxed mb-5 max-w-xs">
            {locale === "ar"
              ? "برنامج تطوير لصناع محتوى الألعاب في منطقة MENA."
              : "A gaming content creator development program across MENA."}
          </p>
          <div className="flex items-center gap-2.5 flex-wrap">
            {SOCIALS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 flex items-center justify-center text-zinc-500
                  hover:text-[#78be20] transition-colors duration-200">
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>


        {footerLinks.map((col) => (
          <div key={col.titleKey}>
            <p className="font-display font-bold text-white uppercase tracking-widest txt-small mb-4">
              {t(col.titleKey)}
            </p>
            <ul className="space-y-2.5">
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

      <div className="border-t border-zinc-900">
        <div
          className="max-w-7xl mx-auto px-5 py-4 flex flex-col sm:flex-row items-center
          justify-between gap-2 txt-smaller text-zinc-600">
          <p>© {year} Monster Energy Ambassadors Program.</p>
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <Link
              href={`/${locale}/program`}
              className="hover:text-zinc-400 transition-colors">
              {locale === "ar" ? "البرنامج" : "About"}
            </Link>
            <Link
              href={`/${locale}/ranks`}
              className="hover:text-zinc-400 transition-colors">
              {locale === "ar" ? "التصنيفات" : "Ranks"}
            </Link>
            <Link
              href={`/${locale}/leaderboard`}
              className="hover:text-zinc-400 transition-colors">
              {locale === "ar" ? "الصدارة" : "Leaderboard"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
