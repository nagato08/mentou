import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/ui/PageHeader";
import GalleryGrid from "@/components/sections/GalleryGrid";
import CtaPanel from "@/components/sections/CtaPanel";
import JsonLd from "@/components/seo/JsonLd";
import { getDictionary, hasLocale, locales, type Locale } from "@/lib/i18n";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/jsonld";

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
  const dict = await getDictionary(lang);
  return buildMetadata({
    lang,
    path: "/galerie",
    title: `${dict.gallery.title} ${dict.gallery.titleAccent}`,
    description: dict.gallery.subtitle,
  });
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const g = dict.gallery;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: dict.nav.home, url: `${SITE_URL}/${lang}` },
          { name: dict.nav.gallery, url: `${SITE_URL}/${lang}/galerie` },
        ])}
      />
      <PageHeader
        kicker={g.kicker}
        title={g.title}
        titleAccent={g.titleAccent}
        subtitle={g.subtitle}
        image="/images/gallery/g-5212703.jpg"
      />
      <GalleryGrid
        eyebrow={g.kicker}
        title={g.title}
        filters={g.filters}
        items={g.items}
      />
      <CtaPanel
        title={dict.home.admission.title}
        body={dict.home.admission.body}
        primaryLabel={dict.home.admission.cta}
        primaryHref={`/${lang}/admission`}
      />
    </>
  );
}
