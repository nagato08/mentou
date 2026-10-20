import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/layout/Container";
import PageHeader from "@/components/ui/PageHeader";
import TutorRequestForm from "@/components/forms/TutorRequestForm";
import { getDictionary, hasLocale, locales, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { isOffer } from "@/lib/registration";

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
    path: "/demander-un-tuteur",
    title: dict.request.metaTitle,
    description: dict.request.subtitle,
  });
}

export default async function RequestTutorPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ offre?: string; annule?: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { offre, annule } = await searchParams;
  const dict = await getDictionary(lang as Locale);
  const t = dict.request;

  return (
    <>
      <PageHeader kicker={t.kicker} title={t.title} subtitle={t.subtitle} />
      <Container size="wide" className="pb-20">
        <TutorRequestForm
          lang={lang as Locale}
          t={t}
          plans={dict.home.pricing.plans}
          pricing={{ perHour: dict.home.pricing.perHour, perMonth: dict.home.pricing.perMonth }}
          initialOffer={isOffer(offre) ? offre : "monthly"}
          canceled={annule === "1"}
        />
      </Container>
    </>
  );
}
