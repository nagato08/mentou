import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import EspritGroupe from "@/components/sections/EspritGroupe";
import WhoItsFor from "@/components/sections/WhoItsFor";
import PillarsList from "@/components/sections/PillarsList";
import ProgramRhythm from "@/components/sections/ProgramRhythm";
import Transformation from "@/components/sections/Transformation";
import CommentsSection from "@/components/sections/CommentsSection";
import Divisions from "@/components/sections/Divisions";
import ParentsCircle from "@/components/sections/ParentsCircle";
import AdmissionCTA from "@/components/sections/AdmissionCTA";
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
    path: "/",
    title: `${dict.meta.siteName} — ${dict.meta.tagline}`,
    description: dict.home.hero.subtitle,
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const typedLang = lang as Locale;

  return (
    <>
      <Hero lang={typedLang} dict={dict} />
      <Manifesto dict={dict} />
      <EspritGroupe dict={dict} />
      <WhoItsFor dict={dict} />
      <PillarsList lang={typedLang} dict={dict} />
      <ProgramRhythm dict={dict} />
      <Transformation dict={dict} />
      <CommentsSection
        eyebrow={dict.home.testimonials.eyebrow}
        title={dict.home.testimonials.title}
      />
      <Divisions dict={dict} />
      <ParentsCircle dict={dict} />
      <AdmissionCTA lang={typedLang} dict={dict} />
    </>
  );
}
