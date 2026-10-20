import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/layout/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Pricing from "@/components/sections/Pricing";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";
import JsonLd from "@/components/seo/JsonLd";
import { getDictionary, hasLocale, locales, type Locale } from "@/lib/i18n";
import { getContent } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { faqSchema } from "@/lib/jsonld";

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
  const hub = getContent(lang).hubs.pricing;
  return buildMetadata({ lang, path: "/tarifs", title: hub.metaTitle, description: hub.metaDescription });
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const typedLang = lang as Locale;
  const dict = await getDictionary(typedLang);
  const c = getContent(typedLang);

  return (
    <>
      <JsonLd data={faqSchema(dict.home.faq.items)} />
      <div className="bg-sky">
        <Container className="flex justify-center pt-8">
          <Breadcrumb items={[{ name: c.labels.breadcrumbHome, href: `/${lang}` }, { name: c.labels.pricing }]} />
        </Container>
      </div>
      <Pricing lang={typedLang} dict={dict} headingLevel="h1" />
      <Faq dict={dict} />
      <FinalCta lang={typedLang} dict={dict} />
    </>
  );
}
