import Image from "next/image";
import Link from "next/link";
import type { ContentPage, Hub, SiteContent } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import Container from "@/components/layout/Container";
import Icon from "@/components/ui/Icon";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CtaBand from "@/components/sections/CtaBand";

type Props = {
  lang: Locale;
  hub: Hub;
  pages: ContentPage[];
  basePath: string;
  labels: SiteContent["labels"];
  /** Carte supplémentaire non cliquable (ex. « Toute la Montérégie »). */
  extra?: { title: string; body: string };
};

/** Page d'index d'une collection : cartes vers chaque page. */
export default function HubView({ lang, hub, pages, basePath, labels, extra }: Props) {
  return (
    <>
      <section className="bg-linear-to-b from-sky to-white">
        <Container className="flex flex-col items-center gap-4 py-12 text-center md:py-16">
          <Breadcrumb items={[{ name: labels.breadcrumbHome, href: `/${lang}` }, { name: hub.kicker }]} />
          <span className="eyebrow">{hub.kicker}</span>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-ink md:text-5xl">{hub.title}</h1>
          <p className="max-w-2xl text-lg leading-relaxed text-slate">{hub.intro}</p>
        </Container>
      </section>

      <section className="pb-8 pt-4">
        <Container size="wide">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-gsap="stagger">
            {pages.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`${basePath}/${p.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card transition-shadow hover:shadow-lift"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image src={p.image} alt="" fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-300 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-6">
                    <h2 className="text-xl font-extrabold text-ink">{p.label}</h2>
                    <p className="flex-1 leading-relaxed text-slate">{p.summary}</p>
                    <span className="mt-2 inline-flex items-center gap-1.5 font-semibold text-primary">
                      {labels.learnMore}
                      <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
            {extra && (
              <li className="flex flex-col justify-center gap-3 rounded-3xl border-2 border-dashed border-sky-strong bg-sky p-8">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-white text-primary">
                  <Icon name="pin" className="h-6 w-6" />
                </span>
                <h2 className="text-xl font-extrabold text-ink">{extra.title}</h2>
                <p className="leading-relaxed text-slate">{extra.body}</p>
              </li>
            )}
          </ul>
        </Container>
      </section>

      <CtaBand title={labels.ctaTitle} body={labels.ctaBody} primaryLabel={labels.ctaButton} primaryHref={`/${lang}/demander-un-tuteur`} />
    </>
  );
}
