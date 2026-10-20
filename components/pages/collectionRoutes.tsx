import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, locales, type Locale } from "@/lib/i18n";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/jsonld";
import { COLLECTION_PATH, findPage, getContent, slugsOf, type Collection } from "@/lib/content";
import JsonLd from "@/components/seo/JsonLd";
import HubView from "./HubView";
import ContentPageView from "./ContentPageView";

type LangParams = { params: Promise<{ lang: string }> };
type SlugParams = { params: Promise<{ lang: string; slug: string }> };

/** Routes d'index (/services, /matieres, /regions). */
export function hubRoutes(collection: Collection) {
  const path = `/${COLLECTION_PATH[collection]}`;

  async function generateMetadata({ params }: LangParams): Promise<Metadata> {
    const { lang } = await params;
    if (!hasLocale(lang)) return {};
    const hub = getContent(lang).hubs[collection];
    return buildMetadata({ lang, path, title: hub.metaTitle, description: hub.metaDescription });
  }

  async function Page({ params }: LangParams) {
    const { lang } = await params;
    if (!hasLocale(lang)) notFound();
    const c = getContent(lang);
    return (
      <>
        <JsonLd
          data={breadcrumbSchema([
            { name: c.labels.breadcrumbHome, url: `${SITE_URL}/${lang}` },
            { name: c.hubs[collection].kicker, url: `${SITE_URL}/${lang}${path}` },
          ])}
        />
        <HubView
          lang={lang}
          hub={c.hubs[collection]}
          pages={c[collection]}
          basePath={`/${lang}${path}`}
          labels={c.labels}
          extra={collection === "regions" ? { title: c.labels.monteregie, body: c.labels.regionsHomeBody } : undefined}
        />
      </>
    );
  }

  return {
    generateStaticParams: async () => locales.map((lang) => ({ lang })),
    generateMetadata,
    Page,
  };
}

/** Routes de détail (/services/[slug], etc.). */
export function detailRoutes(collection: Collection) {
  const path = `/${COLLECTION_PATH[collection]}`;

  async function generateMetadata({ params }: SlugParams): Promise<Metadata> {
    const { lang, slug } = await params;
    if (!hasLocale(lang)) return {};
    const page = findPage(lang, collection, slug);
    if (!page) return {};
    return buildMetadata({
      lang,
      path: `${path}/${slug}`,
      title: page.metaTitle,
      description: page.metaDescription,
      image: page.image,
    });
  }

  async function Page({ params }: SlugParams) {
    const { lang, slug } = await params;
    if (!hasLocale(lang)) notFound();
    const page = findPage(lang, collection, slug);
    if (!page) notFound();
    const c = getContent(lang);
    const dict = await getDictionary(lang as Locale);
    const hub = c.hubs[collection];
    const base = `/${lang}${path}`;

    // Pages liées : les autres pages de la même collection.
    const related = c[collection]
      .filter((p) => p.slug !== slug)
      .map((p) => ({ label: p.label, summary: p.summary, href: `${base}/${p.slug}` }));

    return (
      <>
        <JsonLd
          data={[
            breadcrumbSchema([
              { name: c.labels.breadcrumbHome, url: `${SITE_URL}/${lang}` },
              { name: hub.kicker, url: `${SITE_URL}${base}` },
              { name: page.label, url: `${SITE_URL}${base}/${slug}` },
            ]),
            serviceSchema(lang, { name: page.title, description: page.metaDescription, image: page.image }),
            ...(page.faq.length ? [faqSchema(page.faq)] : []),
          ]}
        />
        <ContentPageView
          lang={lang}
          page={page}
          labels={c.labels}
          ctaLabel={dict.nav.cta}
          crumbs={[
            { name: c.labels.breadcrumbHome, href: `/${lang}` },
            { name: hub.kicker, href: base },
            { name: page.label },
          ]}
          related={related}
        />
      </>
    );
  }

  return {
    generateStaticParams: async () =>
      locales.flatMap((lang) => slugsOf(collection).map((slug) => ({ lang, slug }))),
    generateMetadata,
    Page,
  };
}
