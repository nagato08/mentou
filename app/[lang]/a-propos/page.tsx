import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentPageView from "@/components/pages/ContentPageView";
import { getDictionary, hasLocale, locales, type Locale } from "@/lib/i18n";
import { COLLECTION_PATH, getContent } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const page = getContent(lang).about;
  return buildMetadata({ lang, path: "/a-propos", title: page.metaTitle, description: page.metaDescription });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const typedLang = lang as Locale;
  const c = getContent(typedLang);
  const dict = await getDictionary(typedLang);
  const related = c.services.map((p) => ({
    label: p.label,
    href: `/${lang}/${COLLECTION_PATH.services}/${p.slug}`,
  }));

  return (
    <ContentPageView
      lang={typedLang}
      page={c.about}
      labels={c.labels}
      ctaLabel={dict.nav.cta}
      crumbs={[{ name: c.labels.breadcrumbHome, href: `/${lang}` }, { name: c.about.label }]}
      related={related}
      relatedTitle={c.labels.services}
    />
  );
}
