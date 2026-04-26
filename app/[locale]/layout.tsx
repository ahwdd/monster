import type { Metadata } from "next";
import localFont from "next/font/local";
import { Teko, Cairo, Changa } from "next/font/google";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Providers from "./providers";
import "../globals.css";
import "flag-icons/css/flag-icons.min.css";
import Footer from "@/components/Footer";

// ── Fonts ────────────────────────────────────────────────────
const teko = Teko({
  subsets:  ["latin"],
  weight:   ["400", "500", "600", "700"],
  variable: "--font-teko",
});

const cairo = Cairo({
  subsets:  ["arabic"],
  weight:   ["400", "500", "600", "700"],
  variable: "--font-cairo",
});

const lemonada = Changa({
  subsets:  ["arabic"],
  weight:   ["400", "500", "600", "700"],
  variable: "--font-lemonada",
});

const proximaNova = localFont({
  variable: "--font-proxima",
  display: "swap",
  fallback: ["system-ui", "Arial"],
  src: [
    {
      path: "../../public/fonts/proxima-nova/proximanova-regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/proxima-nova/proximanova-semibold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/proxima-nova/proximanova-bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/proxima-nova/proximanova-extrabold.ttf",
      weight: "800",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title:       "Monster Energy",
  description: "Unleash the Beast – Monster Energy official site",
};

type Props = {
  children: React.ReactNode;
  params:   Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en")) {// | "ar"
    notFound();
  }

  const messages = await getMessages();
  const isRTL    = locale === "ar";

  return (
    <div
      lang={locale}
      dir={isRTL ? "rtl" : "ltr"}
      className={`${teko.variable} ${cairo.variable} ${proximaNova.variable} ${lemonada.variable}`}
    >
      <Providers locale={locale} messages={messages}>
        {children}
        <Footer />
      </Providers>
    </div>
  );
}