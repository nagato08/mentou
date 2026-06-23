import Link from "next/link";
import Image from "next/image";
import type { Dictionary, Locale } from "@/lib/i18n";
import Container from "./Container";

type FooterProps = {
  lang: Locale;
  dict: Dictionary;
};

export default function Footer({ lang, dict }: FooterProps) {
  const base = `/${lang}`;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-bone/10 bg-ink text-bone/70">
      <Container size="wide" as="div" className="pt-20 pb-12 px-3 md:px-6">
        {/* Main grid: Brand + Navigation + Pillars + Contact */}
        <div className="grid gap-12 md:grid-cols-6">
          {/* Brand section */}
          <div className="md:col-span-2">
            <Link href={base}>
              <Image
                src="/logo-remove.png"
                alt="Groupe Mentou"
                width={60}
                height={60}
                className="h-12 w-auto"
                priority
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-bone/60">
              {dict.footer.tagline}
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.25em] text-gold">
              {dict.footer.address}
            </p>
          </div>

          {/* Navigation links */}
          <nav aria-label="Navigation" className="flex flex-col gap-3 text-sm">
            <span className="eyebrow text-gold/90">Navigation</span>
            <Link href={base} className="hover:text-gold transition-colors">
              {dict.nav.home}
            </Link>
            <Link href={`${base}/piliers`} className="hover:text-gold transition-colors">
              {dict.nav.pillars}
            </Link>
            <Link href={`${base}/vision`} className="hover:text-gold transition-colors">
              {dict.nav.vision}
            </Link>
            <Link href={`${base}/admission`} className="hover:text-gold transition-colors">
              {dict.nav.admission}
            </Link>
            <Link href={`${base}/galerie`} className="hover:text-gold transition-colors">
              {dict.nav.gallery}
            </Link>
            <Link href={`${base}/contact`} className="hover:text-gold transition-colors">
              {dict.nav.contact}
            </Link>
          </nav>

          {/* The 7 Pillars */}
          <nav aria-label="Les 7 Piliers" className="flex flex-col gap-3 text-sm">
            <span className="eyebrow text-gold/90">Piliers</span>
            {dict.home.pillars.items.map((pillar, i) => (
              <div key={i} className="text-bone/70 hover:text-gold transition-colors cursor-default">
                {pillar.title}
              </div>
            ))}
          </nav>

          {/* Contact section */}
          <div className="flex flex-col gap-3 text-sm">
            <span className="eyebrow text-gold/90">{dict.nav.contact}</span>
            <Link
              href="mailto:admission@mentou.ca"
              className="hover:text-gold transition-colors text-xs"
            >
              admission@mentou.ca
            </Link>
            <div className="mt-2">
              <p className="text-xs uppercase tracking-[0.25em] text-gold/80 mb-2">WhatsApp</p>
              <Link
                href={`https://wa.me/14383427730`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-medium text-bone hover:text-gold transition-colors"
              >
                {dict.footer.whatsapp}
              </Link>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="mt-16 flex flex-col gap-2 border-t border-bone/10 pt-8 text-xs text-bone/40 md:flex-row md:justify-between">
          <span>
            © {year} {dict.meta.companyName}. {dict.footer.rights}
          </span>
          <span className="uppercase tracking-[0.25em]">{dict.meta.tagline}</span>
        </div>
      </Container>
    </footer>
  );
}
