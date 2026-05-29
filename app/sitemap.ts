import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n-config";
import { SITE_URL } from "@/lib/seo";

const PATHS = ["", "/piliers", "/vision", "/admission", "/galerie", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return PATHS.flatMap((path) =>
    locales.map((lang) => ({
      url: `${SITE_URL}/${lang}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((alt) => [alt, `${SITE_URL}/${alt}${path}`]),
        ),
      },
    })),
  );
}
