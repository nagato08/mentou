import type { Locale } from "./i18n-config";

/** Formate un montant en cents (CAD) selon la langue : « 45 $ » ou « $45 ». */
export function formatPrice(cents: number, lang: Locale): string {
  return new Intl.NumberFormat(lang === "fr" ? "fr-CA" : "en-CA", {
    style: "currency",
    currency: "CAD",
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}
