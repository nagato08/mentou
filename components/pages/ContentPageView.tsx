import Image from "next/image";
import Link from "next/link";
import type { ContentPage } from "@/content/types";
import type { SiteContent } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Breadcrumb, { type Crumb } from "@/components/ui/Breadcrumb";
import CtaBand from "@/components/sections/CtaBand";

type Related = { label: string; summary: string; href: string };

type Props = {
  lang: Locale;
  page: ContentPage;
  labels: SiteContent["labels"];
  crumbs: Crumb[];
  related: Related[];
  ctaLabel: string;
};

/** Gabarit commun des pages Service, Matière, Région et À propos. */
export default function ContentPageView({ lang, page, labels, crumbs, related, ctaLabel }: Props) {
  const requestHref = `/${lang}/demander-un-tuteur`;
  return (
    <>
      <section className="bg-linear-to-b from-sky to-white">
        <Container size="wide" className="grid items-center gap-10 py-10 md:py-16 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <div className="flex flex-col items-start gap-5">
            <Breadcrumb items={crumbs} />
            <span className="eyebrow">{page.kicker}</span>
            <h1 className="text-4xl font-extrabold leading-tight text-ink md:text-5xl">{page.title}</h1>
            <p className="max-w-xl text-lg leading-relaxed text-slate">{page.intro}</p>
            <ul className="flex flex-wrap gap-2">
              {page.highlights.map((h) => (
                <li key={h} className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-ink shadow-card">
                  <Icon name="check" className="h-4 w-4 text-success" strokeWidth={3} />
                  {h}
                </li>
              ))}
            </ul>
            <Button href={requestHref} size="lg" className="mt-2">
              {ctaLabel}
              <Icon name="arrow" className="h-5 w-5" />
            </Button>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lift">
            <Image src={page.image} alt={page.imageAlt} fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
        </Container>
      </section>

      <section className="section">
        <Container size="wide" className="grid items-start gap-10 lg:grid-cols-[1fr_20rem]">
          <div className="flex flex-col gap-6">
            {page.sections.map((s) => (
              <article key={s.title} className="rounded-3xl border border-line bg-white p-7 shadow-card md:p-9">
                <h2 className="text-2xl font-extrabold text-ink">{s.title}</h2>
                {s.body && <p className="mt-3 text-lg leading-relaxed text-slate">{s.body}</p>}
                {s.items && (
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {s.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 rounded-2xl bg-paper px-4 py-3 text-ink">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-sky text-primary">
                          <Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}

            {page.faq.length > 0 && (
              <div className="mt-4">
                <h2 className="mb-4 text-2xl font-extrabold text-ink">{labels.faqTitle}</h2>
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
              </div>
            )}
          </div>

          <aside className="flex flex-col gap-5 lg:sticky lg:top-32">
            <div className="rounded-3xl border border-line bg-white p-6 shadow-card">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-sky text-primary">
                <Icon name="pin" className="h-5 w-5" />
              </span>
              <h2 className="mt-4 font-bold text-ink">{labels.center}</h2>
              <p className="mt-1 font-semibold text-primary">{labels.centerAddress}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate">{labels.centerBody}</p>
            </div>
            {related.length > 0 && (
              <nav aria-label={labels.relatedTitle} className="rounded-3xl border border-line bg-white p-6 shadow-card">
                <h2 className="font-bold text-ink">{labels.relatedTitle}</h2>
                <ul className="mt-3 flex flex-col">
                  {related.map((r) => (
                    <li key={r.href}>
                      <Link href={r.href} className="flex items-center justify-between gap-3 border-b border-line py-3 text-sm font-semibold text-ink last:border-0 hover:text-primary">
                        {r.label}
                        <Icon name="arrow" className="h-4 w-4 shrink-0 text-primary" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </aside>
        </Container>
      </section>

      <CtaBand title={labels.ctaTitle} body={labels.ctaBody} primaryLabel={labels.ctaButton} primaryHref={requestHref} />
    </>
  );
}
