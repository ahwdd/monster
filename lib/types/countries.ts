// src/lib/types/countries.ts
export type Country = {
  key:         string;  // ISO 3166-1 alpha-2 e.g. "EG"
  label:       string;  // English name
  arLabel:     string;  // Arabic name
  callingCode: string;  // e.g. "+20"
  flag:        string;  // ISO code used for flag rendering e.g. "EG"
};