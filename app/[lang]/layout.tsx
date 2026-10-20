import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/layout/BackToTop";
import GsapAnimations from "@/components/layout/GsapAnimationsLazy";
import JsonLd from "@/components/seo/JsonLd";
import { getDictionary, hasLocale, locales, type Locale } from "@/lib/i18n";
import { SITE_URL } from "@/lib/seo";
import {
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
} from "@/lib/jsonld";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

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
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${dict.meta.siteName} | ${dict.meta.tagline}`,
      template: `%s · ${dict.meta.siteName}`,
    },
    description: dict.meta.description,
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:font-semibold focus:text-white"
      >
        {dict.nav.skipToContent}
      </a>
      <JsonLd
        data={[
          organizationSchema(lang as Locale),
          websiteSchema(lang as Locale),
          localBusinessSchema(lang as Locale),
        ]}
      />
      <Navbar lang={lang as Locale} dict={dict} />
      <main id="contenu" className="flex-1">{children}</main>
      <Footer lang={lang as Locale} dict={dict} />
      <BackToTop label={dict.nav.backToTop} />
      <GsapAnimations />

      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}', { anonymize_ip: true });`}
          </Script>
        </>
      )}
    </div>
  );
}
