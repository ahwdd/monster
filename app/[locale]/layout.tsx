import type { Metadata } from "next";
import localFont from "next/font/local";
import { Teko, Cairo } from "next/font/google";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Providers from "./providers";
import "../globals.css";
import "flag-icons/css/flag-icons.min.css";

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

const proximaNova = localFont({
  variable: "--font-proxima",
  display:  "swap",
  src: [
    { path: "../../public/fonts/proxima-nova/proximanova-thin.otf",          weight: "100", style: "normal"  },
    { path: "../../public/fonts/proxima-nova/proximanova-thinit.otf",        weight: "100", style: "italic"  },
    { path: "../../public/fonts/proxima-nova/proximanova-light.otf",         weight: "300", style: "normal"  },
    { path: "../../public/fonts/proxima-nova/proximanova-lightit.otf",       weight: "300", style: "italic"  },
    { path: "../../public/fonts/proxima-nova/proximanova-regular.otf",       weight: "400", style: "normal"  },
    { path: "../../public/fonts/proxima-nova/proximanova-regularit.otf",     weight: "400", style: "italic"  },
    { path: "../../public/fonts/proxima-nova/proximanova-medium.otf",        weight: "500", style: "normal"  },
    { path: "../../public/fonts/proxima-nova/proximanova-mediumit.otf",      weight: "500", style: "italic"  },
    { path: "../../public/fonts/proxima-nova/proximanova-semibold.otf",      weight: "600", style: "normal"  },
    { path: "../../public/fonts/proxima-nova/proximanova-semiboldit.otf",    weight: "600", style: "italic"  },
    { path: "../../public/fonts/proxima-nova/proximanova-bold.otf",          weight: "700", style: "normal"  },
    { path: "../../public/fonts/proxima-nova/proximanova-boldit.otf",        weight: "700", style: "italic"  },
    { path: "../../public/fonts/proxima-nova/proximanova-extrabold.otf",     weight: "800", style: "normal"  },
    { path: "../../public/fonts/proxima-nova/proximanova-extraboldit.otf",   weight: "800", style: "italic"  },
    { path: "../../public/fonts/proxima-nova/proximanova-black.otf",         weight: "900", style: "normal"  },
    { path: "../../public/fonts/proxima-nova/proximanova-blackit.otf",       weight: "900", style: "italic"  },
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

  if (!routing.locales.includes(locale as "en" | "ar")) {
    notFound();
  }

  // getMessages is a server function — fetch here and pass down to Providers
  const messages = await getMessages();
  const isRTL    = locale === "ar";

  return (
    <html lang={locale} dir={isRTL ? "rtl" : "ltr"} suppressHydrationWarning data-scroll-behavior="smooth"
      className={`${teko.variable} ${cairo.variable} ${proximaNova.variable}`}>
      <body className="font-display txt-regular">
        <Providers locale={locale} messages={messages}>
          {children}
        </Providers>
      </body>
    </html>
  );
}