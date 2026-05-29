import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/ui/PageHeader";
import AdmissionProcess from "@/components/sections/AdmissionProcess";
import AdmissionClarity from "@/components/sections/AdmissionClarity";
import AdmissionEligibility from "@/components/sections/AdmissionEligibility";
import AdmissionFaq from "@/components/sections/AdmissionFaq";
import { getDictionary, hasLocale, locales, type Locale } from "@/lib/i18n";
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
      <PageHeader
        kicker={a.kicker}
        title={a.title}
        titleAccent={a.titleAccent}
        subtitle={a.subtitle}
        image={a.image}
      />
      <AdmissionProcess dict={dict} />
      <AdmissionClarity dict={dict} />
      <AdmissionEligibility dict={dict} />
      <AdmissionFaq
        eyebrow={a.faq.eyebrow}
        title={a.faq.title}
        items={a.faq.items}
      />
    </>
  );
}
