import type { Metadata } from "next";
import type { Locale } from "./i18n-config";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mentou.ca";

type BuildMetadataInput = {
  lang: Locale;
  path: string;
  title: string;
  description: string;
  image?: string;
};

export function buildMetadata({
  lang,
  path,
  title,
  description,
  image = "/images/og-default.jpg",
}: BuildMetadataInput): Metadata {
  const url = `${SITE_URL}/${lang}${path === "/" ? "" : path}`;
  const altLang = lang === "fr" ? "en" : "fr";
  const altUrl = `${SITE_URL}/${altLang}${path === "/" ? "" : path}`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        fr: `${SITE_URL}/fr${path === "/" ? "" : path}`,
        en: `${SITE_URL}/en${path === "/" ? "" : path}`,
        "x-default": `${SITE_URL}/fr${path === "/" ? "" : path}`,
      },
    },
    openGraph: {
      type: "website",
      locale: lang === "fr" ? "fr_CA" : "en_CA",
      alternateLocale: lang === "fr" ? "en_CA" : "fr_CA",
      url,
      siteName: "Mentou",
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    other: {
      "x-alt-url": altUrl,
    },
  };
}
