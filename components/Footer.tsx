"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
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
  { icon: FaFacebookF,    href: "https://www.facebook.com/MonsterEnergy/",      label: "Facebook"  },
  { icon: FaInstagram,    href: "https://www.instagram.com/monsterenergy/",      label: "Instagram" },
  { icon: FaYoutube,      href: "https://www.youtube.com/monsterenergy",         label: "YouTube"   },
  { icon: FaTwitter,      href: "https://twitter.com/monsterenergy",             label: "Twitter"   },
  { icon: FaTiktok,       href: "https://www.tiktok.com/@monsterenergy",         label: "TikTok"    },
  { icon: FaSnapchatGhost,href: "https://snapchat.com/add/monsterenergy",        label: "Snapchat"  },
  { icon: FaTwitch,       href: "https://www.twitch.tv/monsterenergy",           label: "Twitch"    },
];

const companyLinks = [
  { labelKey: "aboutUs",       href: "#" },
  { labelKey: "careers",       href: "#" },
  { labelKey: "sustainability", href: "#" },
  { labelKey: "energyInfo",    href: "#" },
  { labelKey: "monsterArmy",   href: "https://www.monsterarmy.com/" },
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

export default function Footer() {
  const t  = useTranslations("footer");

  return (
    <footer className="py-15 font-proxima ">
      <div className="container">

        {/* ── Main 4-col row ── */}
        <div className="flex flex-wrap gap-y-0 -mx-3">

          {/* Col 1 — Logo + socials */}
          <div className="px-3 w-full md:w-1/4 order-first">
            <Image
              src="/assets/logo.png"
              alt="Monster Energy"
              width={187}
              height={82}
              className="mb-6"
            />
            <ul className="flex flex-wrap items-center justify-start gap-2 mb-4 list-none p-0 m-0 max-w-48">
              {socials.map(({ icon: Icon, href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex aspect-square items-center justify-center border border-white rounded-full p-2
                    text-[#b6b6b6] hover:text-white hover:border-[#6bd41a] transition-colors"
                  >
                    <Icon className="size-5.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2 — Company */}
          <div className="px-3 w-full md:w-1/4">
            <FooterCol title={t("company")} links={companyLinks} t={t} />
          </div>

          {/* Col 3 — Support */}
          <div className="px-3 w-full md:w-1/4">
            <FooterCol title={t("support")} links={supportLinks} t={t} />
          </div>

          {/* Col 4 — Explore */}
          <div className="px-3 w-full md:w-1/4">
            <FooterCol title={t("explore")} links={exploreLinks} t={t} />
          </div>

        </div>

        {/* ── Legal row ── */}
        <div className="flex flex-wrap items-center gap-3.75 mt-10">
          <span className="block text-[#808080] txt-smaller">
            © Monster Energy Company. {t("allRightsReserved")}
          </span>
          {legalLinks.map(({ labelKey, href }) => (
            <a
              key={labelKey}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="block txt-smaller text-[#808080] hover:text-white transition-colors"
            >
              {t(labelKey)}
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
  t,
}: {
  title: string;
  links: { labelKey: string; href: string }[];
  t: ReturnType<typeof useTranslations<"footer">>;
}) {
  return (
    <div>
      {/* Column title */}
      <p className=" text-white header-smaller font-medium mb-4">
        {title}
      </p>
      <ul className="list-none p-0 m-0 flex flex-col gap-2">
        {links.map(({ labelKey, href }) => (
          <li key={labelKey}>
            <Link
              href={href}
              className="footer-link relative overflow-hidden txt-regular text-[#b6b6b6]"
            >
              {t(labelKey)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}