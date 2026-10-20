import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Hero from "@/components/sections/Hero";
import Signs from "@/components/sections/Signs";
import Services from "@/components/sections/Services";
import HowItWorks from "@/components/sections/HowItWorks";
import Pricing from "@/components/sections/Pricing";
import WhyUs from "@/components/sections/WhyUs";
import CommentsSection from "@/components/sections/CommentsSection";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";
import JsonLd from "@/components/seo/JsonLd";
import { getDictionary, hasLocale, locales, type Locale } from "@/lib/i18n";
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
  const dict = await getDictionary(lang);
  return buildMetadata({
    lang,
    path: "/",
    title: `${dict.meta.siteName} | ${dict.meta.tagline}`,
    description: dict.meta.description,
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const typedLang = lang as Locale;
  const dict = await getDictionary(typedLang);

  return (
    <>
      <JsonLd data={faqSchema(dict.home.faq.items)} />
      <Hero lang={typedLang} dict={dict} />
      <Signs dict={dict} />
      <Services dict={dict} />
      <HowItWorks lang={typedLang} dict={dict} />
      <Pricing lang={typedLang} dict={dict} />
      <WhyUs dict={dict} />
      <CommentsSection
        eyebrow={dict.home.testimonials.eyebrow}
        title={dict.home.testimonials.title}
        labels={dict.comments}
        dateLocale={typedLang === "fr" ? "fr-CA" : "en-CA"}
      />
      <Faq dict={dict} />
      <FinalCta lang={typedLang} dict={dict} />
    </>
  );
}
