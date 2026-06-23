import type { Dictionary } from "@/lib/i18n";

type EspritGroupeProps = { dict: Dictionary };

export default function EspritGroupe({ dict }: EspritGroupeProps) {
  const t = dict.home.espritGroupe;

  return (
    <section className="relative section-y-home border-b hairline bg-night overflow-hidden">
      {/* Subtle background grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #d4af37 1px, transparent 1px), linear-gradient(to bottom, #d4af37 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="mb-14 md:mb-20" data-gsap="fade-up">
          <div className="flex items-center gap-3 mb-6">
            <span className="block h-px w-8 bg-gold" />
            <span className="text-[0.65rem] uppercase tracking-[0.35em] text-gold">
              {t.eyebrow}
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] text-bone">
            {t.title}{" "}
            <em className="not-italic text-gold">{t.titleAccent}</em>
          </h2>
        </div>

        {/* Pillars grid — 2×2 */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-px border border-bone/10 mb-px"
          data-gsap="stagger"
        >
          {t.pillars.map((pillar) => (
            <div
              key={pillar.index}
              className="group relative bg-ink p-8 md:p-10 lg:p-12 flex flex-col gap-5 border-bone/10 hover:bg-night/60 transition-colors duration-500"
            >
              {/* Index number */}
              <span className="font-display text-[4rem] leading-none text-bone/8 select-none absolute top-6 right-8 group-hover:text-gold/10 transition-colors duration-500">
                {pillar.index}
              </span>

              {/* Gold accent bar */}
              <span className="block h-px w-10 bg-gold group-hover:w-16 transition-all duration-500" />

              {/* Title */}
              <h3 className="font-display text-xl md:text-2xl leading-snug text-bone group-hover:text-gold transition-colors duration-500 pr-10">
                {pillar.title}
              </h3>

              {/* Body */}
              <p className="text-sm md:text-base text-bone/60 leading-relaxed">
                {pillar.body}
              </p>
            </div>
          ))}
        </div>

        {/* Esprit du Groupe — full-width banner */}
        <div
          className="border border-bone/10 border-t-0 px-8 md:px-14 lg:px-20 py-12 md:py-16 flex flex-col md:flex-row md:items-center gap-10 md:gap-16"
          data-gsap="fade-up"
        >
          {/* Left: eyebrow + body */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="block h-px w-6 bg-gold/60" />
              <span className="text-[0.6rem] uppercase tracking-[0.35em] text-gold/60">
                {t.esprit.eyebrow}
              </span>
            </div>
            <p className="text-bone/70 text-base md:text-lg leading-relaxed max-w-lg">
              {t.esprit.body}
            </p>
          </div>

          {/* Divider */}
          <span
            aria-hidden
            className="hidden md:block w-px self-stretch bg-bone/10"
          />
          <span aria-hidden className="block md:hidden h-px w-full bg-bone/10" />

          {/* Right: quote */}
          <blockquote className="flex-1 flex flex-col gap-3">
            <span className="font-display text-4xl text-gold/30 leading-none select-none">
              «
            </span>
            <p className="font-italic-display text-xl md:text-2xl text-bone leading-snug">
              {t.esprit.quote}
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
