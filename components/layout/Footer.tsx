import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";
import { COLLECTION_PATH, getContent, type Collection } from "@/lib/content";
import Container from "./Container";
import Logo from "./Logo";
import Icon from "@/components/ui/Icon";
import OpeningHours from "@/components/ui/OpeningHours";
import { PHONE_DISPLAY, PHONE_TEL, EMAIL_INFO, EMAIL_CONTACT, BILLING_PORTAL_URL } from "@/lib/contact";

type FooterProps = {
  lang: Locale;
  dict: Dictionary;
};

const LINK = "text-slate transition-colors hover:text-primary";

export default function Footer({ lang, dict }: FooterProps) {
  const base = `/${lang}`;
  const year = new Date().getFullYear();
  const c = getContent(lang);

  const column = (collection: Collection, title: string) => (
    <nav aria-label={title} className="flex flex-col gap-3 text-sm">
      <h2 className="text-sm font-bold text-ink">
        <Link href={`${base}/${COLLECTION_PATH[collection]}`} className="hover:text-primary">
          {title}
        </Link>
      </h2>
      {c[collection].map((p) => (
        <Link key={p.slug} href={`${base}/${COLLECTION_PATH[collection]}/${p.slug}`} className={LINK}>
          {p.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <footer className="border-t border-line bg-paper">
      <Container size="wide" className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-5">
        <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
          <Link href={base} aria-label={dict.meta.siteName}>
            <Logo name={dict.meta.siteName} size="lg" />
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-slate">{dict.footer.about}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <Link href={`${base}/tarifs`} className={LINK}>{c.labels.pricing}</Link>
            <Link href={`${base}/a-propos`} className={LINK}>{c.labels.about}</Link>
            <Link href={`${base}/demander-un-tuteur`} className={LINK}>{dict.nav.cta}</Link>
            <a href={BILLING_PORTAL_URL} target="_blank" rel="noopener noreferrer" className={LINK}>{dict.billing.manage}</a>
          </div>
        </div>

        {column("services", c.labels.services)}
        {column("subjects", c.labels.subjects)}
        {column("regions", c.labels.regions)}

        <div className="flex flex-col gap-3 text-sm">
          <h2 className="text-sm font-bold text-ink">
            <Link href={`${base}/contact`} className="hover:text-primary">{dict.footer.contactTitle}</Link>
          </h2>
          <a href={PHONE_TEL} className={`flex items-center gap-2.5 ${LINK}`}>
            <Icon name="phone" className="h-4 w-4 shrink-0 text-primary" />
            {PHONE_DISPLAY}
          </a>
          <a href={`mailto:${EMAIL_INFO}`} className={`flex items-center gap-2.5 ${LINK}`}>
            <Icon name="mail" className="h-4 w-4 shrink-0 text-primary" />
            {EMAIL_INFO}
          </a>
          <a href={`mailto:${EMAIL_CONTACT}`} className={`flex items-center gap-2.5 ${LINK}`}>
            <Icon name="mail" className="h-4 w-4 shrink-0 text-primary" />
            {EMAIL_CONTACT}
          </a>
          <p className="flex items-start gap-2.5 text-slate">
            <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            {c.labels.centerAddress}
          </p>
          <div className="mt-2 border-t border-line pt-4">
            <OpeningHours labels={c.labels} />
          </div>
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
