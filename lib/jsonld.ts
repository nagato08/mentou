import { SITE_URL } from "./seo";
import type { Locale } from "./i18n-config";

const PHONE = "+1-438-342-7730";
const EMAIL = "admission@mentou.ca";
const WHATSAPP = "+14383427730";

/**
 * Organization schema - identifies Groupe Mentou as a business entity
 * Used globally on every page
 */
export function organizationSchema(lang: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${SITE_URL}/#organization`,
    name: "Groupe Mentou",
    alternateName: "Groupe Mentou - Les Piliers des Leaders",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/og-default.jpg`,
      width: 1200,
      height: 630,
    },
    description:
      lang === "fr"
        ? "Programme privé de leadership pour les jeunes de 12 à 22 ans au Québec. Tutorat, mentorat, expression et discipline."
        : "Private leadership program for young people aged 12 to 22 in Québec. Tutoring, mentorship, expression and discipline.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Québec",
      addressRegion: "QC",
      addressCountry: "CA",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: PHONE,
        contactType: "customer service",
        email: EMAIL,
        availableLanguage: ["French", "English"],
        areaServed: "CA",
      },
      {
        "@type": "ContactPoint",
        telephone: WHATSAPP,
        contactType: "WhatsApp",
        availableLanguage: ["French", "English"],
      },
    ],
    sameAs: [],
    foundingDate: "2026",
    knowsLanguage: ["fr-CA", "en-CA"],
  };
}

/**
 * LocalBusiness schema - for local SEO and Google Maps integration
 */
export function localBusinessSchema(lang: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: "Groupe Mentou",
    image: `${SITE_URL}/images/og-default.jpg`,
    url: SITE_URL,
    telephone: PHONE,
    email: EMAIL,
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Québec",
      addressRegion: "QC",
      addressCountry: "CA",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    areaServed: {
      "@type": "Place",
      name: "Québec, Canada",
    },
    description:
      lang === "fr"
        ? "Programme privé de développement du leadership pour jeunes de 12 à 22 ans."
        : "Private leadership development program for young people aged 12 to 22.",
  };
}

/**
 * WebSite schema - enables sitelinks search box in Google
 */
export function websiteSchema(lang: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "Groupe Mentou",
    inLanguage: lang === "fr" ? "fr-CA" : "en-CA",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

/**
 * BreadcrumbList schema - shows breadcrumb path in search results
 */
export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * FAQ schema - enables collapsible FAQ in search results
 */
export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

/**
 * Service schema for each pillar/discipline
 */
export function serviceSchema(
  lang: Locale,
  service: { name: string; description: string; image?: string }
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    image: service.image ? `${SITE_URL}${service.image}` : undefined,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: {
      "@type": "Place",
      name: "Québec, Canada",
    },
    availableLanguage: lang === "fr" ? "fr-CA" : "en-CA",
  };
}
