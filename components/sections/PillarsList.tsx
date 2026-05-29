import Image from "next/image";
import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";

type PillarsListProps = { lang: Locale; dict: Dictionary };

export default function PillarsList({ lang, dict }: PillarsListProps) {
  const t = dict.home.pillars;

  return (
    <section className="relative section-y-home border-b hairline bg-ink overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="grid grid-cols-12 gap-8 mb-10 md:mb-14 items-end" data-gsap="fade-up">
          <div className="col-span-12 md:col-span-4">
            <div className="flex items-center gap-3">
              <span className="block h-px w-8 bg-gold" />
              <span className="text-[0.65rem] uppercase tracking-[0.35em] text-gold">
                {t.eyebrow}
              </span>
            </div>
          </div>
          <h2 className="col-span-12 md:col-span-8 font-display text-3xl md:text-5xl lg:text-6xl leading-[1.1] text-bone">
            {t.title}
          </h2>
        </div>

        {/* Grid pillars — disposition 2+3+2 */}
        <div className="grid grid-cols-1 md:grid-cols-6" data-gsap="stagger">
          {t.items.map((p, idx) => {
            const colSpan =
              idx < 2 ? "md:col-span-3" :
              idx < 5 ? "md:col-span-2" :
              "md:col-span-3";
            return (
              <Link
                key={p.roman}
                href={`/${lang}/piliers#pilier-${p.roman}`}
                className={`group relative bg-ink border border-bone/10 p-5 sm:p-6 md:p-10 flex flex-col gap-5 hover:bg-night/40 transition-colors duration-500 ${colSpan}`}
              >
                {/* Image */}
                <div className="relative w-full overflow-hidden aspect-4/3">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-ink/20 group-hover:bg-ink/0 transition-colors duration-500" />
                  <span className="absolute top-4 left-4 font-display text-3xl text-bone/90 mix-blend-difference">
                    {p.roman}
                  </span>
                </div>

                {/* Texte */}
                <div className="flex flex-col gap-3">
                  <h3 className="font-display text-2xl md:text-3xl leading-tight text-bone group-hover:text-gold transition-colors duration-500">
                    {p.title}
                  </h3>
                  <span className="font-italic-display text-base md:text-lg text-gold/80">
                    {p.lead}
                  </span>
                  <p className="text-sm md:text-base text-bone/65 leading-relaxed">
                    {p.body}
                  </p>
                </div>

                <span
                  aria-hidden
                  className="mt-auto inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.22em] sm:tracking-[0.3em] text-bone/40 group-hover:text-gold transition-colors"
                >
                  En savoir plus
                  <span className="transition-transform duration-500 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            );
          })}

        </div>
      </div>
    </section>
  );
}
