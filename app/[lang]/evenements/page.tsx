import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/ui/PageHeader";
import EventsList from "@/components/sections/EventsList";
import EventsPoles from "@/components/sections/EventsPoles";
import EventsCodeConduite from "@/components/sections/EventsCodeConduite";
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
  const e = dict.events;
  return buildMetadata({
    lang,
    path: "/evenements",
    title: `${e.title} ${e.titleAccent}`,
    description: e.subtitle,
  });
}

export default async function EvenementsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const typedLang = lang as Locale;
  const e = dict.events;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: dict.nav.home, url: `${SITE_URL}/${lang}` },
            { name: dict.nav.events, url: `${SITE_URL}/${lang}/evenements` },
          ]),
        ]}
      />
      <PageHeader
        kicker={e.kicker}
        title={e.title}
        titleAccent={e.titleAccent}
        subtitle={e.subtitle}
        image={e.image}
      />
      <EventsList dict={dict} lang={typedLang} />
      <EventsPoles dict={dict} />
      <EventsCodeConduite dict={dict} lang={typedLang} />
    </>
  );
}
