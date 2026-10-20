import type { Dictionary, Locale } from "@/lib/i18n";
import { COLLECTION_PATH, getContent, type Collection } from "@/lib/content";
import NavbarClient, { type NavItem } from "./NavbarClient";

type NavbarProps = {
  lang: Locale;
  dict: Dictionary;
};

export default function Navbar({ lang, dict }: NavbarProps) {
  const base = `/${lang}`;
  const c = getContent(lang);

  const group = (collection: Collection, label: string): NavItem => {
    const hubHref = `${base}/${COLLECTION_PATH[collection]}`;
    return {
      href: hubHref,
      label,
      children: [
        ...c[collection].map((p) => ({ href: `${hubHref}/${p.slug}`, label: p.label })),
        { href: hubHref, label: c.labels.seeAll },
      ],
    };
  };

  const items: NavItem[] = [
    group("services", c.labels.services),
    group("subjects", c.labels.subjects),
    group("regions", c.labels.regions),
    { href: `${base}/tarifs`, label: c.labels.pricing },
    { href: `${base}/a-propos`, label: c.labels.about },
    { href: `${base}/contact`, label: dict.nav.contact },
  ];

  return (
    <NavbarClient
      lang={lang}
      items={items}
      announcement={dict.announcement}
      labels={{
        cta: dict.nav.cta,
        phone: dict.nav.phone,
        menuOpen: dict.nav.menuOpen,
        menuClose: dict.nav.menuClose,
        siteName: dict.meta.siteName,
      }}
    />
  );
}
