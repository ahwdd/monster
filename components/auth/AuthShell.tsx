// src/components/auth/AuthShell.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import {
  IoLogoYoutube,
  IoLogoInstagram,
  IoLogoTwitch,
  IoLogoFacebook,
  IoLogoTiktok,
} from "react-icons/io5";
import { SiKick } from "react-icons/si";
import { FaSnapchat, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import Header from "@/components/Header";

type Crumb = { label: string; href?: string };
type Props = { children: React.ReactNode; breadcrumbs?: Crumb[] };

const SOCIALS = [
  { Icon: IoLogoFacebook, href: "#" },
  { Icon: IoLogoInstagram, href: "#" },
  { Icon: IoLogoYoutube, href: "#" },
  { Icon: FaXTwitter, href: "#" },
  { Icon: IoLogoTiktok, href: "#" },
  { Icon: FaSnapchat, href: "#" },
  { Icon: IoLogoTwitch, href: "#" },
  { Icon: FaLinkedin, href: "#" },
];

export default function AuthShell({ children, breadcrumbs }: Props) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const px = "px-[140px]";

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />

      {/* Breadcrumb — XD: #171717 border, #ccccd0 text, 80px header so mt-20 */}
      <div className="mt-20 border-b border-[#171717]">
        <div
          className={`max-w-480 mx-auto ${px} h-14.5 flex items-center gap-3
          font-proxima text-[#ccccd0] text-sm`}>
          <Link
            href={`/${locale}`}
            className="hover:text-white transition-colors">
            {isAr ? "الرئيسية" : "Home"}
          </Link>
          {breadcrumbs?.map((crumb, i) => (
            <span key={i} className="contents">
              <span className="text-[#555]">›</span>
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="hover:text-white transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span>{crumb.label}</span>
              )}
            </span>
          ))}
        </div>
      </div>

      <main className="flex-1 bg-black">{children}</main>

      {/* Footer — exact XD layout */}
      <footer className="bg-black border-t border-[#272727]">
        <div
          className={`max-w-480 mx-auto ${px} py-12
          grid grid-cols-[1fr_200px_200px_200px] gap-12`}>
          {/* Brand col */}
          <div>
            <Image
              src="/assets/logo.png"
              alt="Monster"
              width={140}
              height={60}
              className="h-10 w-auto object-contain mb-4"
            />
            <p className="font-proxima text-[#ccccd0] text-sm leading-relaxed max-w-65">
              {isAr
                ? "برنامج تطوير لصناع محتوى الألعاب في منطقة MENA."
                : "A gaming content creator development program across MENA."}
            </p>
          </div>

          {/* Program */}
          <FooterCol
            title={isAr ? "البرنامج" : "Program"}
            links={[
              {
                label: isAr ? "نظرة عامة" : "Overview",
                href: `/${locale}/program`,
              },
              {
                label: isAr ? "التصنيفات" : "Levels",
                href: `/${locale}/ranks`,
              },
              {
                label: isAr ? "المكافآت" : "Rewards",
                href: `/${locale}/program#rewards`,
              },
              {
                label: isAr ? "الصدارة" : "Leaderboard",
                href: `/${locale}/leaderboard`,
              },
            ]}
          />

          {/* Join */}
          <FooterCol
            title={isAr ? "انضم" : "Join"}
            links={[
              {
                label: isAr ? "التسجيل" : "Register",
                href: `/${locale}/submissions/register`,
              },
              {
                label: isAr ? "رفع محتوى" : "Submit Content",
                href: `/${locale}/submissions/submit`,
              },
              {
                label: isAr ? "ملفي" : "My Profile",
                href: `/${locale}/auth/profile`,
              },
            ]}
          />

          {/* Connect — icons */}
          <div>
            <p className="font-display font-bold text-white uppercase tracking-[0.15em] text-sm mb-4">
              {isAr ? "تواصل" : "Connect"}
            </p>
            <div className="flex flex-wrap gap-2">
              {SOCIALS.map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-8 h-8 border border-[#333] flex items-center justify-center
                  text-[#ccccd0] hover:text-white hover:border-[#555] transition-colors">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#272727]">
          <div
            className={`max-w-480 mx-auto ${px} h-14.5 flex items-center justify-between
            font-proxima text-[#ccccd0] text-[13px]`}>
            <span>© 2026 Monster Energy Ambassadors Program.</span>
            <Link
              href={`/${locale}/program`}
              className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="font-display font-bold text-white uppercase tracking-[0.15em] text-sm mb-4">
        {title}
      </p>
      <div className="flex flex-col gap-3">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="font-proxima text-[#ccccd0] text-sm hover:text-white transition-colors">
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
