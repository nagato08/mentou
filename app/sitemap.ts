import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n-config";
import { SITE_URL } from "@/lib/seo";
import { COLLECTION_PATH, slugsOf, type Collection } from "@/lib/content";

const COLLECTIONS: Collection[] = ["services", "subjects", "regions"];

const PATHS = [
  "",
  "/demander-un-tuteur",
  "/tarifs",
  "/a-propos",
  "/contact",
  ...COLLECTIONS.flatMap((c) => [
    `/${COLLECTION_PATH[c]}`,
    ...slugsOf(c).map((slug) => `/${COLLECTION_PATH[c]}/${slug}`),
  ]),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return PATHS.flatMap((path) =>
    locales.map((lang) => ({
      url: `${SITE_URL}/${lang}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : path.split("/").length > 2 ? 0.7 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((alt) => [alt, `${SITE_URL}/${alt}${path}`]),
        ),
      },
    })),
  );
}
