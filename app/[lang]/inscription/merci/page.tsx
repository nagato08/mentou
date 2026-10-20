import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { getDictionary, hasLocale, locales, type Locale } from "@/lib/i18n";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function MerciPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const t = dict.request.thanks;

  return (
    <section className="bg-linear-to-b from-sky to-white">
      <Container size="narrow" className="flex min-h-[65vh] flex-col items-center justify-center gap-5 py-20 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-success/10 text-success">
          <Icon name="check" className="h-8 w-8" strokeWidth={3} />
        </span>
        <span className="eyebrow">{t.kicker}</span>
        <h1 className="text-4xl font-extrabold text-ink md:text-5xl">{t.title}</h1>
        <p className="max-w-lg text-lg leading-relaxed text-slate">{t.body}</p>
        <Button href={`/${lang}`} size="lg" className="mt-2">
          {t.cta}
        </Button>
      </Container>
    </section>
  );
}
