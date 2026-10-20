import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";
import Container from "./Container";
import Logo from "./Logo";
import Icon from "@/components/ui/Icon";
import { PHONE_DISPLAY, PHONE_TEL, EMAIL_INFO, EMAIL_CONTACT } from "@/lib/contact";

type FooterProps = {
  lang: Locale;
  dict: Dictionary;
};

export default function Footer({ lang, dict }: FooterProps) {
  const base = `/${lang}`;
  const year = new Date().getFullYear();
  const nav = [
    { href: base, label: dict.nav.home },
    { href: `${base}#services`, label: dict.nav.services },
    { href: `${base}#tarifs`, label: dict.nav.pricing },
    { href: `${base}#faq`, label: dict.nav.faq },
    { href: `${base}/demander-un-tuteur`, label: dict.nav.cta },
    { href: `${base}/contact`, label: dict.nav.contact },
  ];

  return (
    <footer className="border-t border-line bg-paper">
      <Container size="wide" className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <Link href={base} aria-label={dict.meta.siteName}>
            <Logo name={dict.meta.siteName} size="lg" />
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-slate">{dict.footer.about}</p>
        </div>

        <nav aria-label={dict.footer.navTitle} className="flex flex-col gap-3 text-sm">
          <h2 className="text-sm font-bold text-ink">{dict.footer.navTitle}</h2>
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-slate transition-colors hover:text-primary">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3 text-sm">
          <h2 className="text-sm font-bold text-ink">{dict.footer.servicesTitle}</h2>
          <ul className="flex flex-col gap-3 text-slate">
            {dict.footer.services.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <h2 className="text-sm font-bold text-ink">{dict.footer.contactTitle}</h2>
          <a href={PHONE_TEL} className="flex items-center gap-2.5 text-slate transition-colors hover:text-primary">
            <Icon name="phone" className="h-4 w-4 text-primary" />
            {PHONE_DISPLAY}
          </a>
          <a href={`mailto:${EMAIL_INFO}`} className="flex items-center gap-2.5 text-slate transition-colors hover:text-primary">
            <Icon name="mail" className="h-4 w-4 text-primary" />
            {EMAIL_INFO}
          </a>
          <a href={`mailto:${EMAIL_CONTACT}`} className="flex items-center gap-2.5 text-slate transition-colors hover:text-primary">
            <Icon name="mail" className="h-4 w-4 text-primary" />
            {EMAIL_CONTACT}
          </a>
          <p className="flex items-center gap-2.5 text-slate">
            <Icon name="pin" className="h-4 w-4 text-primary" />
            {dict.footer.area}
          </p>
        </div>
      </Container>

      <div className="border-t border-line">
        <Container size="wide" className="flex flex-col gap-2 py-6 text-xs text-muted md:flex-row md:justify-between">
          <span>
            © {year} {dict.meta.companyName} · {dict.meta.siteName}. {dict.footer.rights}
          </span>
          <span>mentou.ca</span>
        </Container>
      </div>
    </footer>
  );
}
