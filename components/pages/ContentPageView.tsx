import Image from "next/image";
import Link from "next/link";
import type { ContentPage, SiteContent } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Breadcrumb, { type Crumb } from "@/components/ui/Breadcrumb";
import CtaBand from "@/components/sections/CtaBand";
import Blocks from "./Blocks";

type Related = { label: string; href: string };

type Props = {
  lang: Locale;
  page: ContentPage;
  labels: SiteContent["labels"];
  crumbs: Crumb[];
  related: Related[];
  relatedTitle: string;
  ctaLabel: string;
};

function Hero({ lang, page, crumbs, ctaLabel }: Pick<Props, "lang" | "page" | "crumbs" | "ctaLabel">) {
  const requestHref = `/${lang}/demander-un-tuteur`;
  const text = (
    <div className="flex flex-col items-start gap-5">
      <Breadcrumb items={crumbs} />
      <h1 className="text-4xl font-extrabold leading-tight text-ink md:text-5xl">{page.title}</h1>
      <p className="max-w-xl text-lg leading-relaxed text-slate">{page.intro}</p>
      <Button href={requestHref} size="lg" className="mt-1">
        {ctaLabel}
        <Icon name="arrow" className="h-5 w-5" />
      </Button>
    </div>
  );

  // Variante « panneau » (villes) : infos pratiques à la place de la photo.
  if (page.hero === "panel" && page.facts) {
    return (
      <section className="bg-linear-to-b from-sky to-white">
        <Container size="wide" className="grid items-center gap-10 py-10 md:py-16 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
          {text}
          <dl className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line shadow-lift">
            {page.facts.map((f) => (
              <div key={f.label} className="flex items-center gap-4 bg-white p-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-sky text-primary">
                  <Icon name={f.icon} className="h-6 w-6" />
                </span>
                <div>
                  <dt className="text-sm text-slate">{f.label}</dt>
                  <dd className="font-bold text-ink">{f.value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-linear-to-b from-sky to-white">
      <Container size="wide" className="grid items-center gap-10 py-10 md:py-16 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        {text}
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lift">
          <Image src={page.image} alt={page.imageAlt} fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="hero-zoom object-cover" />
        </div>
      </Container>
    </section>
  );
}

/** Gabarit des pages Service, Matière, Région et À propos : en-tête + blocs propres à chaque page. */
export default function ContentPageView({ lang, page, labels, crumbs, related, relatedTitle, ctaLabel }: Props) {
  return (
    <>
      <Hero lang={lang} page={page} crumbs={crumbs} ctaLabel={ctaLabel} />

      <Blocks blocks={page.blocks} labels={labels} />

      {page.faq.length > 0 && (
        <section className="py-12 md:py-16">
          <Container size="narrow">
            <h2 className="mb-6 text-2xl font-extrabold text-ink md:text-3xl">{labels.faqTitle}</h2>
            <div className="flex flex-col gap-3">
              {page.faq.map((f) => (
                <details key={f.q} className="group rounded-2xl border border-line bg-white open:shadow-card">
                  <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 px-6 py-4 font-bold text-ink">
                    {f.q}
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sky text-primary transition-transform group-open:rotate-180">
                      <Icon name="chevronDown" className="h-4 w-4" />
                    </span>
                  </summary>
                  <p className="px-6 pb-6 leading-relaxed text-slate">{f.a}</p>
                </details>
              ))}
            </div>
          </Container>
        </section>
      )}

      {related.length > 0 && (
        <section className="pb-4 pt-8">
          <Container>
            <nav aria-label={relatedTitle} className="flex flex-col items-center gap-4 border-t border-line pt-10 text-center">
              <h2 className="font-bold text-ink">{relatedTitle}</h2>
              <ul className="flex flex-wrap justify-center gap-2">
                {related.map((r) => (
                  <li key={r.href}>
                    <Link
                      href={r.href}
                      className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-line px-4 font-semibold text-ink transition-colors hover:border-primary hover:text-primary"
                    >
                      {r.label}
                      <Icon name="arrow" className="h-4 w-4 text-primary" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Container>
        </section>
      )}

      <CtaBand title={labels.ctaTitle} body={labels.ctaBody} primaryLabel={labels.ctaButton} primaryHref={`/${lang}/demander-un-tuteur`} />
    </>
  );
}
