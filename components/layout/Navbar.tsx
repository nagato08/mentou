import type { Dictionary, Locale } from "@/lib/i18n";
import NavbarClient from "./NavbarClient";

type NavbarProps = {
  lang: Locale;
  dict: Dictionary;
};

export default function Navbar({ lang, dict }: NavbarProps) {
  const base = `/${lang}`;
  const items = [
    { href: `${base}#services`, label: dict.nav.services },
    { href: `${base}#fonctionnement`, label: dict.nav.howItWorks },
    { href: `${base}#tarifs`, label: dict.nav.pricing },
    { href: `${base}#faq`, label: dict.nav.faq },
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
