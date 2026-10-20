import fr from "@/content/fr";
import en from "@/content/en";
import type { ContentPage, SiteContent } from "@/content/types";
import type { Locale } from "./i18n-config";

const CONTENT: Record<Locale, SiteContent> = { fr, en };

export function getContent(lang: Locale): SiteContent {
  return CONTENT[lang];
}

export type Collection = "services" | "subjects" | "regions";

/** Segment d'URL (identique en FR et EN) de chaque collection. */
export const COLLECTION_PATH: Record<Collection, string> = {
  services: "services",
  subjects: "matieres",
  regions: "regions",
};

export function findPage(lang: Locale, collection: Collection, slug: string): ContentPage | undefined {
  return CONTENT[lang][collection].find((p) => p.slug === slug);
}

export function slugsOf(collection: Collection): string[] {
  return fr[collection].map((p) => p.slug);
}
