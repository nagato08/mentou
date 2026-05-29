import "server-only";
import type { Locale } from "./i18n-config";
import frDict from "@/dictionaries/fr.json";

export {
  locales,
  defaultLocale,
  hasLocale,
  type Locale,
} from "./i18n-config";

export type Dictionary = typeof frDict;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  fr: () => import("@/dictionaries/fr.json").then((m) => m.default as Dictionary),
  en: () => import("@/dictionaries/en.json").then((m) => m.default as Dictionary),
};

export const getDictionary = async (lang: Locale): Promise<Dictionary> =>
  dictionaries[lang]();
