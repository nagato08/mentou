import type { Dictionary } from "@/lib/i18n";

type TransformationProps = { dict: Dictionary };

export default function Transformation({ dict }: TransformationProps) {
  const t = dict.home.transformation;

  return (
    <section className="relative section-y border-b hairline bg-paper overflow-hidden">
      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="mb-16 md:mb-24 flex flex-col gap-4" data-gsap="fade-up">
          <div className="flex items-center gap-4">
            <span className="block h-px w-8 bg-gold" />
            <span className="eyebrow text-burgundy">{t.eyebrow}</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] text-ink max-w-3xl">
            {t.title}
          </h2>
        </div>

        {/* Pairs */}
        <ul className="flex flex-col" data-gsap="stagger-left">
          {t.pairs.map((pair, i) => (
            <li
              key={i}
              className="group grid grid-cols-[1.5rem_1fr_2.5rem_1fr] sm:grid-cols-[2rem_1fr_3rem_1fr] md:grid-cols-[3rem_1fr_5rem_1fr] items-center gap-3 md:gap-8 py-6 md:py-10 border-t border-ink/10 transition-all duration-500 hover:border-gold/40"
            >
              {/* Numéro */}
              <span className="font-display text-2xl sm:text-4xl md:text-6xl text-ink/10 leading-none tabular-nums group-hover:text-gold/25 transition-colors duration-500">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Avant */}
              <div className="flex flex-col gap-0.5">
                <span className="text-[0.55rem] uppercase tracking-[0.3em] text-ink/30 group-hover:text-ink/50 transition-colors duration-300">
                  Avant
                </span>
                <span className="font-display text-xl sm:text-3xl md:text-5xl lg:text-6xl text-ink/25 line-through decoration-1 decoration-ink/20 leading-none group-hover:text-ink/35 transition-colors duration-500">
                  {pair.before}
                </span>
              </div>

              {/* Flèche */}
              <div className="flex flex-col items-center gap-1">
                <span className="block h-px w-full bg-gold/40 group-hover:bg-gold transition-colors duration-500" />
                <span className="font-display text-base md:text-3xl text-gold/60 group-hover:text-gold transition-all duration-500 group-hover:translate-x-1 inline-block">
                  →
                </span>
              </div>

              {/* Après */}
              <div className="flex flex-col gap-0.5">
                <span className="text-[0.55rem] uppercase tracking-[0.3em] text-gold/60 group-hover:text-gold transition-colors duration-300">
                  Après
                </span>
                <span className="font-display text-xl sm:text-3xl md:text-5xl lg:text-6xl text-ink leading-none group-hover:text-gold transition-colors duration-500">
                  {pair.after}
                </span>
              </div>
            </li>
          ))}
        </ul>

        {/* Footer accent */}
        <div className="mt-12 md:mt-16 flex items-center gap-6 border-t border-ink/10 pt-8">
          <span className="block h-px w-16 bg-gold" />
          <p className="font-italic-display text-xl md:text-2xl text-ink/50">
            Résultats visibles en quelques mois.
          </p>
        </div>
      </div>
    </section>
  );
}
