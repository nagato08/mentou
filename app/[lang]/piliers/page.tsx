import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { notFound } from "next/navigation";
import Container from "@/components/layout/Container";
import JsonLd from "@/components/seo/JsonLd";
import { getDictionary, hasLocale, locales, type Locale } from "@/lib/i18n";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import { breadcrumbSchema, serviceSchema } from "@/lib/jsonld";

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
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: dict.nav.home, url: `${SITE_URL}/${lang}` },
            { name: dict.nav.pillars, url: `${SITE_URL}/${lang}/piliers` },
          ]),
          ...items.map((p) =>
            serviceSchema(lang as Locale, {
              name: p.title,
              description: p.body,
              image: p.image,
            })
          ),
        ]}
      />
      {/* Page Hero */}
      <section className="relative min-h-[76svh] md:min-h-[80vh] flex items-end border-b border-bone/10 overflow-hidden bg-ink">
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
        <div aria-hidden className="pointer-events-none select-none absolute right-0 top-1/2 -translate-y-1/2 hidden sm:block font-display text-[28vw] leading-none text-bone/3 tracking-tighter">
          VII
        </div>
        <Container size="wide" className="relative pb-10 sm:pb-14 md:pb-16 pt-32 md:pt-36 flex flex-col gap-5 md:gap-6" data-gsap="fade-up">
          <div className="flex items-center gap-4">
            <span className="block h-px w-8 sm:w-10 bg-gold" />
            <span className="eyebrow tracking-[0.24em] sm:tracking-[0.4em]">
              {dict.home.pillars.eyebrow}
            </span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] text-bone max-w-4xl" data-gsap="fade-left">
            {dict.pillars.title}
          </h1>
          <span className="block h-px w-20 bg-gold" />
          <p className="max-w-2xl text-base md:text-xl text-bone/65 leading-relaxed">
            {dict.pillars.subtitle}
          </p>

          {/* Quick nav */}
          <nav
            aria-label="Piliers"
            className="-mx-6 mt-2 flex gap-3 overflow-x-auto px-6 pb-2 sm:mx-0 sm:mt-4 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0"
          >
            {items.map((p) => (
              <a
                key={p.roman}
                href={`#pilier-${p.roman}`}
                className="inline-flex shrink-0 items-center gap-2 border border-bone/20 px-3 sm:px-4 py-2 text-[0.62rem] sm:text-[0.65rem] uppercase tracking-[0.18em] sm:tracking-[0.3em] text-bone/60 hover:border-gold hover:text-gold transition-colors duration-300"
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
              className="pointer-events-none select-none absolute top-20 font-display text-[34vw] sm:text-[24vw] lg:top-1/2 lg:-translate-y-1/2 lg:text-[20vw] leading-none text-bone/250 tracking-tighter"
              style={{ [isEven ? "right" : "left"]: "-2vw" }}
            >
              {p.roman}
            </span>

            <Container size="wide" className="relative py-12 sm:py-16 lg:py-28">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-20 items-center ${isEven ? "" : "lg:[&>*:first-child]:order-last"}`}>

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
                    <span className="absolute top-4 left-4 md:top-5 md:left-5 font-display text-4xl md:text-5xl text-bone/80 mix-blend-difference leading-none">
                      {p.roman}
                    </span>
                  </div>
                  {"image2" in p && p.image2 && (
                    <div className="relative hidden sm:block w-2/3 self-end overflow-hidden aspect-4/3">
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
                <div className="flex flex-col gap-6 md:gap-8" data-gsap="fade-right">
                  {/* Eyebrow */}
                  <div className="flex items-center gap-4">
                    <span className="block h-px w-8 bg-gold" />
                    <span className="text-[0.65rem] uppercase tracking-[0.24em] sm:tracking-[0.4em] text-gold">
                      Pilier {p.roman}
                    </span>
                  </div>

                  {/* Title + lead */}
                  <div className="flex flex-col gap-3">
                    <h2 className="font-display text-3xl sm:text-5xl md:text-6xl leading-[1.02] text-bone">
                      {p.title}
                    </h2>
                    <p className="font-italic-display text-xl sm:text-2xl md:text-3xl text-gold/85">
                      {p.lead}
                    </p>
                  </div>

                  <span className="block h-px w-16 bg-gold/40" />

                  {/* Body */}
                  <p className="text-base md:text-lg text-bone/70 leading-relaxed">
                    {p.body}
                  </p>

                  {"practice" in p && p.practice && (
                    <div className="border-l border-gold/50 pl-4 sm:pl-5">
                      <span className="text-[0.65rem] uppercase tracking-[0.22em] sm:tracking-[0.35em] text-gold">
                        {dict.pillars.practiceLabel}
                      </span>
                      <p className="mt-3 text-sm md:text-base text-bone/65 leading-relaxed">
                        {p.practice as string}
                      </p>
                    </div>
                  )}

                  {/* Outcomes */}
                  {"outcomes" in p && Array.isArray(p.outcomes) && (
                    <div>
                      <span className="text-[0.65rem] uppercase tracking-[0.22em] sm:tracking-[0.35em] text-gold">
                        {dict.pillars.outcomesLabel}
                      </span>
                      <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                        {(p.outcomes as string[]).map((outcome, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="mt-1.5 block h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
                            <span className="text-sm text-bone/65">{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {"signals" in p && Array.isArray(p.signals) && (
                    <div>
                      <span className="text-[0.65rem] uppercase tracking-[0.22em] sm:tracking-[0.35em] text-gold">
                        {dict.pillars.signalsLabel}
                      </span>
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-px bg-bone/10">
                        {(p.signals as string[]).map((signal) => (
                          <div key={signal} className="bg-night/40 p-4">
                            <p className="text-sm leading-relaxed text-bone/65">
                              {signal}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Container>
          </section>
        );
      })}

      {/* Engagement */}
      <section className="relative py-12 sm:py-16 lg:py-28 bg-paper text-ink border-b border-ink/10 overflow-hidden">
        <Container size="wide">
          <div className="grid grid-cols-12 gap-8 lg:gap-16 items-start">
            <div className="col-span-12 lg:col-span-5" data-gsap="fade-right">
              <div className="flex items-center gap-3">
                <span className="block h-px w-8 bg-burgundy" />
                <span className="eyebrow text-burgundy">
                  {dict.pillars.engagement.eyebrow}
                </span>
              </div>
              <h2 className="mt-5 md:mt-6 font-display text-3xl md:text-5xl lg:text-6xl leading-[1.05] text-ink">
                {dict.pillars.engagement.title}
              </h2>
              <p className="mt-5 md:mt-6 text-ink/65 leading-relaxed">
                {dict.pillars.engagement.body}
              </p>
            </div>

            <div className="col-span-12 lg:col-span-7" data-gsap="stagger">
              <ul className="grid grid-cols-1 gap-px bg-ink/10">
                {dict.pillars.engagement.items.map((item, index) => (
                  <li key={item.title} className="bg-paper p-5 sm:p-6 md:p-8">
                    <span className="font-mono text-xs text-gold tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 md:mt-5 font-display text-2xl md:text-3xl text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm md:text-base leading-relaxed text-ink/60">
                      {item.body}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="mt-6 md:mt-8 border-l border-gold pl-4 sm:pl-5 font-italic-display text-lg sm:text-xl md:text-2xl leading-snug text-burgundy">
                {dict.pillars.engagement.note}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA final */}
      <section className="relative py-12 sm:py-16 lg:py-28 bg-night/60 border-b border-bone/10">
        <Container size="narrow" className="flex flex-col items-center text-center gap-6 md:gap-8">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="block h-px w-6 sm:w-8 bg-gold" />
            <span className="eyebrow tracking-[0.24em] sm:tracking-[0.4em]">
              {dict.home.admission.eyebrow}
            </span>
            <span className="block h-px w-6 sm:w-8 bg-gold" />
          </div>
          <h2 className="font-display text-3xl md:text-5xl leading-[1.05] text-bone">
            {dict.home.admission.title}
          </h2>
          <p className="text-bone/60 text-base md:text-lg max-w-lg">
            {dict.home.admission.body}
          </p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
            <Link
              href={`/${lang}/contact`}
              className="group inline-flex items-center justify-between gap-4 border border-gold bg-gold text-ink px-5 sm:px-8 py-4 sm:py-5 text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] font-medium hover:bg-gold-soft transition-all duration-500"
            >
              {dict.home.admission.cta}
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href={`/${lang}/admission`}
              className="group inline-flex items-center justify-between gap-4 border border-bone/30 text-bone px-5 sm:px-8 py-4 sm:py-5 text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] font-medium hover:border-gold hover:text-gold transition-colors duration-500"
            >
              {dict.home.admission.secondaryCta}
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
