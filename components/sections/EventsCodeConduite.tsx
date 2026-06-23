import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";

type Props = { dict: Dictionary; lang: Locale };

export default function EventsCodeConduite({ dict, lang }: Props) {
  const t = dict.events.conduite;
  const cta = dict.events.cta;

  return (
    <>
      {/* Code de conduite */}
      <section className="relative section-y-home border-b hairline bg-night overflow-hidden">
        {/* Decorative corner lines */}
        <span
          aria-hidden
          className="pointer-events-none absolute top-0 left-0 w-32 h-32 border-t border-l border-gold/15"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-0 w-32 h-32 border-b border-r border-gold/15"
        />

        <div
          className="mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24"
          data-gsap="fade-up"
        >
          {/* Left: title + body */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="block h-px w-8 bg-gold" />
              <span className="text-[0.65rem] uppercase tracking-[0.35em] text-gold">
                {t.eyebrow}
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.05] text-bone">
              {t.title}{" "}
              <em className="not-italic font-italic-display text-gold/90">
                {t.titleAccent}
              </em>
            </h2>
            <p className="text-base md:text-lg text-bone/60 leading-relaxed max-w-lg">
              {t.body}
            </p>
          </div>

          {/* Right: values list */}
          <ul className="flex flex-col justify-center gap-0 divide-y divide-bone/10">
            {t.values.map((value, idx) => (
              <li
                key={idx}
                className="group flex items-start gap-5 py-5 first:pt-0 last:pb-0"
              >
                <span className="mt-1 shrink-0 w-5 h-5 rounded-full border border-gold/40 flex items-center justify-center group-hover:bg-gold/10 transition-colors duration-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold/60" />
                </span>
                <p className="text-sm md:text-base text-bone/70 leading-relaxed group-hover:text-bone transition-colors duration-300">
                  {value}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 md:py-28 bg-ink border-b hairline overflow-hidden">
        {/* Subtle gold grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #d4af37 1px, transparent 1px), linear-gradient(to bottom, #d4af37 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div
          className="relative mx-auto w-full max-w-4xl px-6 md:px-12 text-center flex flex-col items-center gap-8"
          data-gsap="fade-up"
        >
          <div className="flex items-center gap-3">
            <span className="block h-px w-8 bg-gold/60" />
            <span className="text-[0.65rem] uppercase tracking-[0.35em] text-gold/60">
              {cta.eyebrow}
            </span>
            <span className="block h-px w-8 bg-gold/60" />
          </div>

          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] text-bone">
            {cta.title}
          </h2>

          <p className="text-base md:text-lg text-bone/55 max-w-md leading-relaxed">
            {cta.body}
          </p>

          <Link
            href={`/${lang}${cta.href}`}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gold text-ink font-semibold text-sm uppercase tracking-widest hover:bg-gold/90 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2"
          >
            {cta.button}
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
