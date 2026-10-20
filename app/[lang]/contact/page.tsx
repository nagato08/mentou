import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/layout/Container";
import PageHeader from "@/components/ui/PageHeader";
import ContactForm from "@/components/forms/ContactForm";
import Icon, { type IconName } from "@/components/ui/Icon";
import JsonLd from "@/components/seo/JsonLd";
import OpeningHours from "@/components/ui/OpeningHours";
import { getContent } from "@/lib/content";
import { getDictionary, hasLocale, locales, type Locale } from "@/lib/i18n";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/jsonld";
import { EMAIL_CONTACT, EMAIL_INFO, PHONE_DISPLAY, PHONE_TEL } from "@/lib/contact";

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
    title: dict.contact.metaTitle,
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

  const channels: { icon: IconName; label: string; value: string; href?: string }[] = [
    { icon: "phone", label: c.channels.phone, value: PHONE_DISPLAY, href: PHONE_TEL },
    { icon: "mail", label: c.channels.info, value: EMAIL_INFO, href: `mailto:${EMAIL_INFO}` },
    { icon: "chat", label: c.channels.contact, value: EMAIL_CONTACT, href: `mailto:${EMAIL_CONTACT}` },
    { icon: "pin", label: c.channels.area, value: c.channels.areaValue },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: dict.nav.home, url: `${SITE_URL}/${lang}` },
          { name: dict.nav.contact, url: `${SITE_URL}/${lang}/contact` },
        ])}
      />
      <PageHeader kicker={c.kicker} title={c.title} subtitle={c.subtitle} />
      <Container size="wide" className="grid items-start gap-8 pb-20 lg:grid-cols-[22rem_1fr]">
        <div className="flex flex-col gap-4">
        <ul className="flex flex-col gap-4">
          {channels.map((ch) => {
            const body = (
              <>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-sky text-primary">
                  <Icon name={ch.icon} className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm text-slate">{ch.label}</span>
                  <span className="block wrap-break-word font-bold text-ink">{ch.value}</span>
                </span>
              </>
            );
            return (
              <li key={ch.label}>
                {ch.href ? (
                  <a
                    href={ch.href}
                    className="flex items-center gap-4 rounded-2xl border border-line bg-white p-5 shadow-card transition-colors hover:border-primary"
                  >
                    {body}
                  </a>
                ) : (
                  <div className="flex items-center gap-4 rounded-2xl border border-line bg-white p-5 shadow-card">
                    {body}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
          <div className="rounded-2xl border border-line bg-white p-5 shadow-card">
            <OpeningHours labels={getContent(lang as Locale).labels} />
          </div>
        </div>

        <div className="rounded-3xl border border-line bg-white p-6 shadow-card md:p-10">
          <h2 className="mb-6 text-2xl font-extrabold text-ink">{c.form.title}</h2>
          <ContactForm t={c.form} />
        </div>
      </Container>
    </>
  );
}
