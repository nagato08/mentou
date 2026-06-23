import type { Dictionary, Locale } from "@/lib/i18n";
import NavbarClient from "./NavbarClient";

type NavbarProps = {
  lang: Locale;
  dict: Dictionary;
};

export default function Navbar({ lang, dict }: NavbarProps) {
  const base = `/${lang}`;
  const items = [
    { href: base, label: dict.nav.home },
    { href: `${base}/piliers`, label: dict.nav.pillars },
    { href: `${base}/vision`, label: dict.nav.vision },
    { href: `${base}/evenements`, label: dict.nav.events },
    { href: `${base}/admission`, label: dict.nav.admission },
    { href: `${base}/galerie`, label: dict.nav.gallery },
    { href: `${base}/contact`, label: dict.nav.contact },
  ];

  return (
    <NavbarClient
      lang={lang}
      ctaLabel={dict.nav.cta}
      phoneLabel={dict.nav.phone}
      whatsappLabel={dict.footer.whatsapp}
      items={items}
      admissionHref={`${base}/contact`}
    />
  );
}
