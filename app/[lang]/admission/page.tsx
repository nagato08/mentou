import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/ui/PageHeader";
import AdmissionProcess from "@/components/sections/AdmissionProcess";
import AdmissionClarity from "@/components/sections/AdmissionClarity";
import PricingSection from "@/components/sections/PricingSection";
import AdmissionEligibility from "@/components/sections/AdmissionEligibility";
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
    path: "/admission",
    title: `${dict.admission.title} ${dict.admission.titleAccent}`,
    description: dict.admission.subtitle,
  });
}

export default async function AdmissionPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const a = dict.admission;

  return (
    <>
      <JsonLd
        data={[
          faqSchema(a.faq.items),
          breadcrumbSchema([
            { name: dict.nav.home, url: `${SITE_URL}/${lang}` },
            { name: dict.nav.admission, url: `${SITE_URL}/${lang}/admission` },
          ]),
        ]}
      />
      <PageHeader
        kicker={a.kicker}
        title={a.title}
        titleAccent={a.titleAccent}
        subtitle={a.subtitle}
        image={a.image}
      />
      <AdmissionProcess dict={dict} />
      <AdmissionClarity dict={dict} />
      <PricingSection
        eyebrow={a.pricing.eyebrow}
        title={a.pricing.title}
        items={a.pricing.items}
        paymentMethods={a.pricing.paymentMethods}
      />
      <AdmissionEligibility dict={dict} />
      <AdmissionFaq
        eyebrow={a.faq.eyebrow}
        title={a.faq.title}
        items={a.faq.items}
      />
    </>
  );
}
