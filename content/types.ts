// Structure du contenu éditorial des pages Services, Matières, Régions, À propos.
// Chaque page compose ses propres blocs : deux pages n'ont pas la même structure.

import type { IconName } from "@/components/ui/Icon";

export type Faq = { q: string; a: string };

export type Block =
  /** Déroulé vertical (séance type, compte à rebours, organisation). */
  | { type: "steps"; title: string; intro?: string; steps: { title: string; body: string }[] }
  /** Deux options côte à côte (domicile / centre, en ligne / présentiel). */
  | {
      type: "compare";
      title: string;
      intro?: string;
      columns: { title: string; icon: IconName; items: string[]; tag?: string; featured?: boolean }[];
    }
  /** Mosaïque : une photo + cartes teintées. */
  | {
      type: "features";
      title: string;
      intro?: string;
      image: string;
      imageAlt: string;
      items: { icon: IconName; title: string; body: string }[];
    }
  /** Phrase forte pleine largeur. */
  | { type: "statement"; text: string; body?: string }
  /** Liste à cocher : signes (warn) ou prérequis (ok). */
  | { type: "checklist"; title: string; intro?: string; tone: "ok" | "warn"; items: string[] }
  /** Tarifs + exemples chiffrés. */
  | {
      type: "price";
      title: string;
      body?: string;
      offers: { label: string; value: string; detail: string }[];
      examples?: { label: string; value: string }[];
      note: string;
    }
  /** Niveaux scolaires et cours, par groupe. */
  | { type: "levels"; title: string; intro?: string; groups: { title: string; items: string[] }[] }
  /** Pastilles (secteurs, villes, matières). */
  | { type: "chips"; title: string; body?: string; chips: string[] }
  /** Centre + carte Google Maps. */
  | { type: "map"; title: string; body: string }
  /** Établissements ou villes des environs. */
  | { type: "nearby"; title: string; intro?: string; places: { name: string; note: string }[] }
  /** Deux colonnes « C'est pour vous si / Ce n'est pas pour vous si ». */
  | { type: "fit"; title: string; yesTitle: string; yes: string[]; noTitle: string; no: string[] }
  /** Paragraphe simple. */
  | { type: "text"; title: string; body: string };

/** Variante d'en-tête : photo, ou panneau d'infos pratiques (villes). */
export type HeroVariant = "image" | "panel";

export type ContentPage = {
  slug: string;
  /** Libellé court (menus, cartes). */
  label: string;
  /** Résumé d'une phrase (cartes des pages d'index). */
  summary: string;
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  title: string;
  intro: string;
  image: string;
  imageAlt: string;
  hero?: HeroVariant;
  /** Infos du panneau d'en-tête (variante « panel »). */
  facts?: { icon: IconName; label: string; value: string }[];
  blocks: Block[];
  faq: Faq[];
};

export type Hub = {
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  title: string;
  intro: string;
};

export type SiteContent = {
  services: ContentPage[];
  subjects: ContentPage[];
  regions: ContentPage[];
  about: ContentPage;
  hubs: {
    services: Hub;
    subjects: Hub;
    regions: Hub;
    pricing: Hub;
  };
  labels: {
    services: string;
    subjects: string;
    regions: string;
    pricing: string;
    about: string;
    seeAll: string;
    learnMore: string;
    faqTitle: string;
    otherServices: string;
    otherSubjects: string;
    otherRegions: string;
    ctaTitle: string;
    ctaBody: string;
    ctaButton: string;
    center: string;
    centerAddress: string;
    centerBody: string;
    directions: string;
    mapTitle: string;
    examples: string;
    regionsHome: string;
    regionsHomeBody: string;
    monteregie: string;
    breadcrumbHome: string;
    hoursTitle: string;
    hoursWeekdays: string;
    hoursWeekend: string;
    hoursWeekdaysTime: string;
    hoursWeekendTime: string;
    open7: string;
  };
};
