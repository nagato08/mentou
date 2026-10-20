import Image from "next/image";
import Link from "next/link";
import { COLLECTION_PATH, getContent } from "@/lib/content";
import type { Dictionary, Locale } from "@/lib/i18n";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

type HeroProps = {
  lang: Locale;
  dict: Dictionary;
};

export default function Hero({ lang, dict }: HeroProps) {
  const t = dict.home.hero;
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-sky to-white">
      <Container size="wide" className="grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-primary shadow-card">
            <Icon name="graduation" className="h-4 w-4" />
            {t.kicker}
          </span>

          <h1 className="text-4xl font-extrabold leading-[1.1] text-ink sm:text-5xl lg:text-[3.4rem]">
            {t.title} <span className="text-primary">{t.titleAccent}</span>
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-slate">{t.subtitle}</p>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button href={`/${lang}/demander-un-tuteur`} size="lg">
              {t.primaryCta}
              <Icon name="arrow" className="h-5 w-5" />
            </Button>
            <Button href={`/${lang}#tarifs`} variant="secondary" size="lg">
              {t.secondaryCta}
            </Button>
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
            {t.points.map((p) => (
              <li key={p} className="flex items-center gap-2 text-sm font-semibold text-ink">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-success/10 text-success">
                  <Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lift">
            <Image
              src="/images/tutorat1.jpeg"
              alt={t.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="hero-zoom object-cover"
            />
          </div>
          <div className="absolute -bottom-6 left-4 right-4 flex items-center gap-4 rounded-2xl bg-white p-4 shadow-lift sm:left-auto sm:right-6 sm:max-w-xs">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
              <Icon name="spark" className="h-6 w-6" />
            </span>
            <div>
              <p className="text-sm font-bold text-ink">{t.cardTitle}</p>
              <p className="text-sm text-slate">{t.cardBody}</p>
            </div>
          </div>
        </div>
      </Container>

      <Container size="wide" className="pb-12 pt-6 md:pt-4">
        <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:gap-5">
          <span className="text-sm font-bold text-ink">{dict.home.subjects.label}</span>
          <ul className="flex flex-wrap gap-2">
            {getContent(lang).subjects.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/${lang}/${COLLECTION_PATH.subjects}/${s.slug}`}
                  className="inline-flex min-h-9 items-center rounded-full border border-line bg-white px-3.5 text-sm font-medium text-slate transition-colors hover:border-primary hover:text-primary"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
