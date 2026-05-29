import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { notFound } from "next/navigation";
import Container from "@/components/layout/Container";
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
    path: "/piliers",
    title: dict.pillars.title,
    description: dict.pillars.subtitle,
  });
}

export default async function PillarsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const items = dict.home.pillars.items;

  return (
    <>
      {/* Page Hero */}
      <section className="relative min-h-[80vh] flex items-end border-b border-bone/10 overflow-hidden bg-ink">
        <Image
          src="/images/piliers-hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          data-gsap="parallax"
        />
        <div aria-hidden className="absolute inset-0 bg-linear-to-b from-ink/75 via-ink/50 to-ink" />
        <div aria-hidden className="absolute inset-0 bg-linear-to-r from-ink/60 via-transparent to-transparent" />
        <div aria-hidden className="pointer-events-none select-none absolute right-0 top-1/2 -translate-y-1/2 font-display text-[28vw] leading-none text-bone/3 tracking-tighter">
          VII
        </div>
        <Container size="wide" className="relative pb-16 pt-36 flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="block h-px w-10 bg-gold" />
            <span className="eyebrow">{dict.home.pillars.eyebrow}</span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] text-bone max-w-4xl">
            {dict.pillars.title}
          </h1>
          <span className="block h-px w-20 bg-gold" />
          <p className="max-w-2xl text-lg md:text-xl text-bone/65 leading-relaxed">
            {dict.pillars.subtitle}
          </p>

          {/* Quick nav */}
          <nav aria-label="Piliers" className="mt-4 flex flex-wrap gap-3">
            {items.map((p) => (
              <a
                key={p.roman}
                href={`#pilier-${p.roman}`}
                className="inline-flex items-center gap-2 border border-bone/20 px-4 py-2 text-[0.65rem] uppercase tracking-[0.3em] text-bone/60 hover:border-gold hover:text-gold transition-colors duration-300"
              >
                <span className="font-display text-base text-gold/70">{p.roman}</span>
                {p.title}
              </a>
            ))}
          </nav>
        </Container>
      </section>

      {/* Piliers */}
      {items.map((p, idx) => {
        const isEven = idx % 2 === 0;
        return (
          <section
            key={p.roman}
            id={`pilier-${p.roman}`}
            className="relative border-b border-bone/10 bg-ink overflow-hidden scroll-mt-20"
          >
            {/* Roman number watermark */}
            <span
              aria-hidden
              className="pointer-events-none select-none absolute top-1/2 -translate-y-1/2 font-display text-[20vw] leading-none text-bone/250 tracking-tighter"
              style={{ [isEven ? "right" : "left"]: "-2vw" }}
            >
              {p.roman}
            </span>

            <Container size="wide" className="relative section-y">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${isEven ? "" : "lg:[&>*:first-child]:order-last"}`}>

                {/* Images */}
                <div className="flex flex-col gap-4" data-gsap="fade-left">
                  <div className="relative w-full overflow-hidden aspect-4/3">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-ink/10" />
                    <span className="absolute top-5 left-5 font-display text-5xl text-bone/80 mix-blend-difference leading-none">
                      {p.roman}
                    </span>
                  </div>
                  {"image2" in p && p.image2 && (
                    <div className="relative w-2/3 self-end overflow-hidden aspect-4/3">
                      <Image
                        src={p.image2 as string}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 25vw, 50vw"
                        className="object-cover grayscale-50"
                      />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col gap-8" data-gsap="fade-right">
                  {/* Eyebrow */}
                  <div className="flex items-center gap-4">
                    <span className="block h-px w-8 bg-gold" />
                    <span className="text-[0.65rem] uppercase tracking-[0.4em] text-gold">
                      Pilier {p.roman}
                    </span>
                  </div>

                  {/* Title + lead */}
                  <div className="flex flex-col gap-3">
                    <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-none text-bone">
                      {p.title}
                    </h2>
                    <p className="font-italic-display text-2xl md:text-3xl text-gold/85">
                      {p.lead}
                    </p>
                  </div>

                  <span className="block h-px w-16 bg-gold/40" />

                  {/* Body */}
                  <p className="text-base md:text-lg text-bone/70 leading-relaxed">
                    {p.body}
                  </p>

                  {/* Outcomes */}
                  {"outcomes" in p && Array.isArray(p.outcomes) && (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(p.outcomes as string[]).map((outcome, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="mt-1.5 block h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
                          <span className="text-sm text-bone/65">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </Container>
          </section>
        );
      })}

      {/* CTA final */}
      <section className="relative section-y bg-night/60 border-b border-bone/10">
        <Container size="narrow" className="flex flex-col items-center text-center gap-8">
          <div className="flex items-center gap-4">
            <span className="block h-px w-8 bg-gold" />
            <span className="eyebrow">{dict.home.admission.eyebrow}</span>
            <span className="block h-px w-8 bg-gold" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl leading-[1.05] text-bone">
            {dict.home.admission.title}
          </h2>
          <p className="text-bone/60 text-lg max-w-lg">
            {dict.home.admission.body}
          </p>
          <Link
            href={`/${lang}/admission`}
            className="group inline-flex items-center gap-4 border border-gold bg-gold text-ink px-8 py-5 text-xs uppercase tracking-[0.3em] font-medium hover:bg-gold-soft transition-all duration-500"
          >
            {dict.home.admission.cta}
            <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
          </Link>
        </Container>
      </section>
    </>
  );
}
