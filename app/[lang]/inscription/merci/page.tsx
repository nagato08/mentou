import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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
  const t = dict.registration.thanks;

  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-ink px-6 py-24">
      <div className="max-w-xl text-center flex flex-col items-center gap-6">
        <div className="flex items-center gap-3">
          <span className="block h-px w-8 bg-gold" />
          <span className="text-[0.65rem] uppercase tracking-[0.35em] text-gold">
            {t.kicker}
          </span>
          <span className="block h-px w-8 bg-gold" />
        </div>
        <h1 className="font-display text-4xl md:text-6xl leading-[1.05] text-bone">
          {t.title}{" "}
          <em className="not-italic font-italic-display text-gold/90">
            {t.titleAccent}
          </em>
        </h1>
        <p className="text-bone/60 leading-relaxed max-w-md">{t.body}</p>
        <Link
          href={`/${lang}`}
          className="mt-4 inline-flex items-center gap-2 px-7 py-3.5 border border-gold/40 text-gold text-sm uppercase tracking-[0.2em] hover:bg-gold/10 transition-colors"
        >
          {t.cta}
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
