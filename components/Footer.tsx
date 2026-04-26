// src/components/main/Footer.tsx
"use client";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { footerLinks } from "@/lib/data/navLinks";
import { IoLogoYoutube, IoLogoInstagram, IoLogoFacebook } from "react-icons/io5";
import { SiDiscord, SiX } from "react-icons/si";
import { FaGlobe, FaLinkedin } from "react-icons/fa";
import NextLink from "next/link";

const SOCIALS = [
  { Icon: FaGlobe,           href: "https://arabhardware.net",                        label: "Website"     },
  { Icon: IoLogoFacebook,    href: "https://www.facebook.com/arabhardware",            label: "Facebook"    },
  { Icon: IoLogoInstagram,   href: "https://www.instagram.com/arabhardware",           label: "Instagram"   },
  { Icon: IoLogoYoutube,     href: "https://www.youtube.com/@arabhardware",            label: "YouTube"     },
  { Icon: SiX,               href: "https://x.com/arabhardware",                       label: "X (Twitter)" },
  { Icon: FaLinkedin,        href: "https://www.linkedin.com/company/arabhardware.net",label: "LinkedIn"    },
  { Icon: SiDiscord,         href: "https://discord.gg/arabhardware",                  label: "Discord"     },
];

export default function Footer() {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-6 sm:px-8 lg:px-14 py-10 sm:py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_180px_180px_180px] gap-10 lg:gap-12">

        {/* ── Brand column ── */}
        <div className={isRTL ? "text-right" : "text-left"}>
          <NextLink href="/" className="inline-block mb-4">
            <Image
              src="/assets/logo.png"
              alt="Monster Energy"
              width={280}
              height={120}
              className="object-contain h-20 w-auto"
              priority={false}
            />
          </NextLink>
          <p className="font-proxima txt-large text-[#ccccd0] leading-relaxed mb-5 max-w-65">
            {isRTL
              ? "برنامج تطوير لصناع محتوى الألعاب في منطقة MENA."
              : "A gaming content creator development program across MENA."}
          </p>
        </div>

        {/* ── Link columns from footerLinks ── */}
        {footerLinks.map((col) => (
          <div key={col.titleKey} className={isRTL ? "text-right" : "text-left"}>
            <p
              className={`font-display font-bold text-white uppercase header-smallest mb-1 ${
                isRTL ? "tracking-normal" : "tracking-[0.15em]"
              }`}>
              {t(col.titleKey)}
            </p>
            <div className="flex flex-col gap-1.5">
              {col.links.map(({ labelKey, href }) => (
                <NextLink
                  key={labelKey}
                  href={href}
                  className="font-proxima txt-large text-white transition-colors hover:text-[#6bd41a] footer-link">
                  {t(labelKey)}
                </NextLink>
              ))}
            </div>
          </div>
        ))}

        {/* ── Connect / Socials column ── */}
        <div className={isRTL ? "text-right" : "text-left"}>
          <p
            className={`font-display font-bold text-white uppercase header-smallest mb-4 ${
              isRTL ? "tracking-normal" : "tracking-[0.15em]"
            }`}>
            {t("footer.connect")}
          </p>
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
          <NextLink href="/terms" className="hover:text-white transition-colors">
            {t("footer.terms")}
          </NextLink>
        </div>
      </div>
    </footer>
  );
}