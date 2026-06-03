import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/ui/PageHeader";
import ContactSplit from "@/components/sections/ContactSplit";
import AdmissionFaq from "@/components/sections/AdmissionFaq";
import JsonLd from "@/components/seo/JsonLd";
import { getDictionary, hasLocale, locales, type Locale } from "@/lib/i18n";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import { faqSchema, breadcrumbSchema } from "@/lib/jsonld";

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
    path: "/contact",
    title: `${dict.contact.title} ${dict.contact.titleAccent}`,
    description: dict.contact.subtitle,
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const c = dict.contact;

  return (
    <>
      <JsonLd
        data={[
          faqSchema(c.faq.items),
          breadcrumbSchema([
            { name: dict.nav.home, url: `${SITE_URL}/${lang}` },
            { name: dict.nav.contact, url: `${SITE_URL}/${lang}/contact` },
          ]),
        ]}
      />
      <PageHeader
        kicker={c.kicker}
        title={c.title}
        titleAccent={c.titleAccent}
        subtitle={c.subtitle}
        image={c.image}
      />
      <ContactSplit dict={dict} />
      <AdmissionFaq
        eyebrow={c.faq.eyebrow}
        title={c.faq.title}
        items={c.faq.items}
      />
    </>
  );
}
