import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/ui/PageHeader";
import VisionManifesto from "@/components/sections/VisionManifesto";
import VisionPrinciples from "@/components/sections/VisionPrinciples";
import VisionMethod from "@/components/sections/VisionMethod";
import VisionFounder from "@/components/sections/VisionFounder";
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
    path: "/vision",
    title: dict.vision.title,
    description: dict.vision.subtitle,
  });
}

export default async function VisionPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const v = dict.vision;

  return (
    <>
      <PageHeader
        kicker={v.kicker}
        title={v.title}
        titleAccent={v.titleAccent}
        subtitle={v.subtitle}
        image={v.image}
      />
      <VisionManifesto dict={dict} />
      <VisionPrinciples dict={dict} />
      <VisionMethod dict={dict} />
      <VisionFounder dict={dict} />
      <CtaPanel
        title={v.cta.title}
        body={v.cta.body}
        primaryLabel={v.cta.label}
        primaryHref={`/${lang}/admission`}
      />
    </>
  );
}
