import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";

type AdmissionCTAProps = { lang: Locale; dict: Dictionary };

export default function AdmissionCTA({ lang, dict }: AdmissionCTAProps) {
  const t = dict.home.admission;

  return (
    <section className="relative section-y-home bg-ink border-b hairline overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 lg:col-span-7" data-gsap="fade-up">
            <span className="eyebrow">{t.eyebrow}</span>
            <h2 className="mt-5 md:mt-6 font-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-bone">
              {t.title.split(" ").slice(0, -1).join(" ")}{" "}
              <em className="font-italic-display text-gold">
                {t.title.split(" ").slice(-1)}
              </em>
            </h2>
            <p className="mt-5 md:mt-8 max-w-xl text-base md:text-lg text-bone/65 leading-relaxed">
              {t.body}
            </p>
          </div>

          <div className="col-span-12 lg:col-span-5">
            <ol className="border-t hairline-gold" data-gsap="stagger">
              {t.steps.map((s) => (
                <li
                  key={s.n}
                  className="flex items-baseline gap-4 sm:gap-6 py-4 sm:py-5 border-b hairline-gold"
                >
                  <span className="font-mono text-xs text-gold tabular-nums">
                    {s.n}
                  </span>
                  <span className="font-display text-xl md:text-2xl text-bone/85">
                    {s.label}
                  </span>
                </li>
              ))}
            </ol>

            <div className="mt-8 sm:mt-10 flex flex-col gap-3 sm:gap-4 sm:flex-row sm:flex-wrap">
              <Link
                href={`/${lang}/contact`}
                className="group inline-flex items-center justify-between gap-4 border border-gold bg-gold text-ink px-5 sm:px-8 py-4 sm:py-5 text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] font-medium hover:bg-gold-soft transition-all duration-500 focus-visible:outline-2 focus-visible:outline-bone focus-visible:outline-offset-4"
              >
                {t.cta}
                <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href={`/${lang}/admission`}
                className="group inline-flex items-center justify-between gap-4 border border-bone/30 text-bone px-5 sm:px-8 py-4 sm:py-5 text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] font-medium hover:border-gold hover:text-gold transition-colors duration-500 focus-visible:outline-2 focus-visible:outline-bone focus-visible:outline-offset-4"
              >
                {t.secondaryCta}
                <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
            <p className="mt-5 text-sm text-bone/50">{t.reassurance}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
