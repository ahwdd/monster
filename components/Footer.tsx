"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaTiktok,
  FaSnapchatGhost,
  FaTwitch,
} from "react-icons/fa";

const socials = [
  { icon: FaFacebookF,     href: "https://www.facebook.com/MonsterEnergy/",   label: "Facebook"  },
  { icon: FaInstagram,     href: "https://www.instagram.com/monsterenergy/",   label: "Instagram" },
  { icon: FaYoutube,       href: "https://www.youtube.com/monsterenergy",      label: "YouTube"   },
  { icon: FaTwitter,       href: "https://twitter.com/monsterenergy",          label: "Twitter"   },
  { icon: FaTiktok,        href: "https://www.tiktok.com/@monsterenergy",      label: "TikTok"    },
  { icon: FaSnapchatGhost, href: "https://snapchat.com/add/monsterenergy",     label: "Snapchat"  },
  { icon: FaTwitch,        href: "https://www.twitch.tv/monsterenergy",        label: "Twitch"    },
];

const companyLinks = [
  { labelKey: "aboutUs",        href: "#" },
  { labelKey: "careers",        href: "#" },
  { labelKey: "sustainability",  href: "#" },
  { labelKey: "energyInfo",     href: "#" },
  { labelKey: "monsterArmy",    href: "https://www.monsterarmy.com/" },
];

const supportLinks = [
  { labelKey: "faqs",       href: "#" },
  { labelKey: "contactUs",  href: "#" },
  { labelKey: "whereToBuy", href: "#" },
];

const exploreLinks = [
  { labelKey: "gaming",       href: "https://www.monsterenergy.com/en-us/gaming/" },
  { labelKey: "energyDrinks", href: "https://www.monsterenergy.com/en-us/energy-drinks/juice-monster/" },
  { labelKey: "rehabMonster", href: "https://www.monsterenergy.com/en-us/energy-drinks/rehab-monster/" },
];

const legalLinks = [
  { labelKey: "privacyPolicy", href: "https://www.monsterenergy.com/en-us/privacy-policy/" },
  { labelKey: "cookiesPolicy", href: "https://www.monsterenergy.com/en-us/cookie-policy/" },
  { labelKey: "termsOfUse",    href: "https://www.monsterenergy.com/en-us/terms-of-use/" },
  { labelKey: "doNotSell",     href: "https://www.monsterenergy.com/en-us/#" },
];

const colGroups = [
  { titleKey: "company", links: companyLinks },
  { titleKey: "support", links: supportLinks },
  { titleKey: "explore", links: exploreLinks },
];

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="py-10 md:py-15 font-proxima bg-(--color-bg) border-t border-zinc-900">
      <div className="container px-4 md:px-6">

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">

          {/* Col 1 — Logo + socials */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Image
              src="/assets/logo.png"
              alt="Monster Energy"
              width={187}
              height={82}
              className="mb-6 w-36 md:w-46.75 h-auto"
            />
            <ul className="flex flex-wrap items-center justify-start gap-2 mb-4 list-none p-0 m-0 max-w-52">
              {socials.map(({ icon: Icon, href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 border border-white rounded-full text-[#b6b6b6] hover:text-white hover:border-[#6bd41a] transition-colors duration-200"
                  >
                    <Icon className="size-3.5 md:size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Cols 2–4 — desktop flat / mobile accordion */}
          {colGroups.map(({ titleKey, links }) => (
            <div key={titleKey} className="lg:block">
              {/* Desktop */}
              <div className="hidden lg:block">
                <p className="text-white header-smaller font-medium mb-4">{t(titleKey)}</p>
                <ul className="list-none p-0 m-0 flex flex-col gap-2">
                  {links.map(({ labelKey, href }) => (
                    <li key={labelKey}>
                      <Link href={href} className="footer-link relative overflow-hidden txt-regular">
                        {t(labelKey)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mobile/tablet accordion */}
              <FooterAccordion title={t(titleKey)} links={links} t={t} />
            </div>
          ))}

        </div>

        {/* ── Legal row ── */}
        <div className="mt-10 md:mt-12 pt-6 border-t border-zinc-900">
          {/* Mobile: stacked. md+: flex wrap */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-3.75">
            <span className="block txt-smaller text-[#808080]">
              © Monster Energy Company. {t("allRightsReserved")}
            </span>
            {legalLinks.map(({ labelKey, href }) => (
              <a
                key={labelKey}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="block txt-smaller text-[#808080] hover:text-white transition-colors duration-200"
              >
                {t(labelKey)}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}

// ── Mobile accordion for footer columns ─────────────────────────
function FooterAccordion({
  title,
  links,
  t,
}: {
  title: string;
  links: { labelKey: string; href: string }[];
  t: ReturnType<typeof useTranslations<"footer">>;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="lg:hidden border-b border-zinc-800">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-4 text-white header-smaller font-medium"
      >
        {title}
        <IoChevronDown
          className={`size-4 text-accent transition-transform duration-200 shrink-0 ms-2 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <ul className="list-none p-0 pb-4 flex flex-col gap-3">
              {links.map(({ labelKey, href }) => (
                <li key={labelKey}>
                  <Link href={href} className="footer-link relative overflow-hidden txt-regular">
                    {t(labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}