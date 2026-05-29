import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/ui/PageHeader";
import GalleryGrid from "@/components/sections/GalleryGrid";
import CtaPanel from "@/components/sections/CtaPanel";
import { getDictionary, hasLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

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
