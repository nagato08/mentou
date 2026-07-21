import Image from "next/image";
import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";

type HeroProps = {
  lang: Locale;
  dict: Dictionary;
};

export default function Hero({ lang, dict }: HeroProps) {
  const t = dict.home.hero;
  const base = `/${lang}`;

  return (
    <section className="relative min-h-[100svh] md:min-h-[92vh] flex items-end overflow-hidden border-b hairline">
      {/* Background image */}
      <Image
        src="/images/hero-accueil-2026.jpeg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
        data-gsap="parallax"
      />

      {/* Layered gradients pour lisibilité */}
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-b from-ink/85 via-ink/40 to-ink"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-r from-ink/80 via-ink/30 to-transparent"
      />

      {/* Content */}
      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-20 pt-28 pb-14 sm:pb-20 md:pb-28">
        {/* Top eyebrow */}
        <div className="reveal delay-1 mb-8 md:mb-20 flex items-center gap-4">
          <span className="block h-px w-8 sm:w-12 bg-gold" />
          <span className="text-[0.65rem] sm:text-[0.7rem] uppercase tracking-[0.24em] sm:tracking-[0.35em] text-gold">
            {t.kicker}
          </span>
        </div>

        {/* Title block */}
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 lg:col-span-9">
            <h1 className="font-display leading-[0.95] text-bone">
              <span className="block text-[2.25rem] sm:text-[4rem] md:text-[6rem] lg:text-[7.5rem] reveal delay-2">
                {t.title}
              </span>
              <span className="block text-[1.875rem] sm:text-[3.25rem] md:text-[5rem] lg:text-[6.25rem] font-italic-display text-gold/95 reveal delay-3">
                {t.titleAccent}
              </span>
            </h1>
          </div>

          {/* Age badge right */}
          <aside className="col-span-12 lg:col-span-3 flex lg:justify-end mt-6 lg:mt-0 reveal delay-4">
            <div className="flex items-center gap-4">
              <span className="hidden lg:block h-16 w-px bg-gold/60" />
              <div>
                <span className="block font-display text-3xl md:text-4xl text-bone leading-none">
                  {t.ageBadge}
                </span>
                <span className="mt-2 block text-[0.62rem] uppercase tracking-[0.24em] sm:tracking-[0.35em] text-bone/60">
                  {t.ageLabel}
                </span>
              </div>
            </div>
          </aside>
        </div>

        {/* Subtitle + CTAs */}
        <div className="mt-8 md:mt-16 grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-7 reveal delay-5">
            <p className="text-lg md:text-xl text-bone/85 leading-relaxed">
              {t.subtitle}
            </p>
            <ul className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {t.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.24em] text-bone/75"
                >
                  <span
                    className="h-px w-5 sm:w-6 bg-gold/70 shrink-0"
                    aria-hidden
                  />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-12 md:col-span-5 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 md:justify-end reveal delay-6">
            <Link
              href={`${base}/contact`}
              className="group inline-flex items-center justify-between gap-4 w-full sm:w-80 border border-gold bg-gold text-ink px-5 sm:px-7 py-4 text-[0.68rem] sm:text-[0.7rem] uppercase tracking-[0.2em] sm:tracking-[0.3em] font-medium hover:bg-gold-soft transition-all duration-500 focus-visible:outline-2 focus-visible:outline-bone focus-visible:outline-offset-4"
            >
              {t.primaryCta}
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              href={`${base}/piliers`}
              className="group inline-flex items-center justify-between gap-4 w-full sm:w-80 border border-bone/30 text-bone px-5 sm:px-7 py-4 text-[0.68rem] sm:text-[0.7rem] uppercase tracking-[0.2em] sm:tracking-[0.3em] font-medium hover:border-gold hover:text-gold transition-colors duration-500"
            >
              {t.secondaryCta}
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll cue absolute bottom */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 scroll-cue">
        <span className="text-[0.55rem] uppercase tracking-[0.5em] text-bone/50">
          scroll
        </span>
        <span className="block h-10 w-px bg-bone/30" />
      </div>
    </section>
  );
}
