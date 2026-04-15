import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // requestLocale comes from the [locale] URL segment
  let locale = await requestLocale;

  // Fall back to default if locale is invalid or missing
  if (!locale || !routing.locales.includes(locale as "en" | "ar")) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
    timeZone: "Africa/Cairo"
  };
});