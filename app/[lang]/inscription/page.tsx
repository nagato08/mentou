import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import PageHeader from "@/components/ui/PageHeader";
import InscriptionForm from "@/components/sections/InscriptionForm";
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
    path: "/inscription",
    title: `${dict.registration.title} ${dict.registration.titleAccent}`,
    description: dict.registration.subtitle,
  });
}

export default async function InscriptionPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ offre?: string; annule?: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { offre, annule } = await searchParams;

  // Offre invalide ou absente → retour aux tarifs.
  if (!isOffer(offre)) {
    redirect(`/${lang}/admission`);
  }

  const dict = await getDictionary(lang as Locale);
  const t = dict.registration;

  return (
    <>
      <PageHeader
        kicker={t.kicker}
        title={t.title}
        titleAccent={t.titleAccent}
        subtitle={t.subtitle}
      />
      <InscriptionForm dict={dict} offer={offre} canceled={annule === "1"} />
    </>
  );
}
