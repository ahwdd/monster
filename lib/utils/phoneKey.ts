// src/lib/utils/phoneKey.ts
import { countriesList } from "@/lib/data/countries";

const SORTED_COUNTRIES = [...countriesList].sort(
  (a, b) => b.callingCode.length - a.callingCode.length
);

export function extractPhoneKey(fullPhone: string): string {
  if (!fullPhone.startsWith("+")) return "+20"; // fallback

  const match = SORTED_COUNTRIES.find((c) =>
    fullPhone.startsWith(c.callingCode)
  );

  return match?.callingCode ?? "+20";
}

export function stripPhoneKey(fullPhone: string, phoneKey: string): string {
  if (fullPhone.startsWith(phoneKey)) {
    return fullPhone.slice(phoneKey.length);
  }
  return fullPhone;
}