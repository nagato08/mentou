// Structure du contenu éditorial des pages Services, Matières, Régions, À propos.

export type ContentSection = {
  title: string;
  body?: string;
  items?: string[];
};

export type Faq = { q: string; a: string };

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
  highlights: string[];
  sections: ContentSection[];
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
    relatedTitle: string;
    ctaTitle: string;
    ctaBody: string;
    ctaButton: string;
    center: string;
    centerAddress: string;
    centerBody: string;
    regionsHome: string;
    regionsHomeBody: string;
    monteregie: string;
    breadcrumbHome: string;
  };
};
