import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";

type Props = { dict: Dictionary; lang: Locale };

export default function EventPricingSection({ dict, lang }: Props) {
  const t = dict.admission.eventPricing;

  return (
    <section
      id="tournoi"
      className="relative section-y-home border-t hairline bg-night scroll-mt-24 overflow-hidden"
    >
      {/* Decorative grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #d4af37 1px, transparent 1px), linear-gradient(to bottom, #d4af37 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div className="relative mx-auto w-full max-w-5xl px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 flex flex-col items-center gap-5">
          <div className="flex items-center gap-3">
            <span className="block h-px w-8 bg-gold" />
            <span className="text-[0.65rem] uppercase tracking-[0.35em] text-gold">
              {t.eyebrow}
            </span>
            <span className="block h-px w-8 bg-gold" />
          </div>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-bone">
            {t.title}{" "}
            <em className="not-italic font-italic-display text-gold/90">
              {t.titleAccent}
            </em>
          </h2>
          <p className="max-w-xl text-bone/55 leading-relaxed">{t.subtitle}</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.items.map((item) => (
            <div
              key={item.offer}
              className={`relative flex flex-col p-8 md:p-10 border ${
                item.featured
                  ? "border-gold/40 bg-gold/[0.06]"
                  : "border-bone/10 bg-ink/40"
              }`}
            >
              {/* Accent */}
              <span
                className={`block h-px w-12 mb-6 ${item.featured ? "bg-gold" : "bg-bone/30"}`}
              />

              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-gold/70 mb-3">
                {item.role}
              </p>

              <div className="flex items-baseline gap-1 mb-4">
                <span className="font-display text-5xl md:text-6xl text-bone">
                  {item.price}
                </span>
                <span className="text-2xl text-gold">$</span>
              </div>

              <p className="text-sm text-bone/65 leading-relaxed mb-6">
                {item.description}
              </p>

              <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                {item.perks.map((perk, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-bone/70">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold/70" />
                    {perk}
                  </li>
                ))}
              </ul>

              <Link
                href={`/${lang}/inscription?offre=${item.offer}`}
                className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm uppercase tracking-[0.2em] font-semibold transition-colors ${
                  item.featured
                    ? "bg-gold text-ink hover:bg-gold-soft"
                    : "border border-gold/40 text-gold hover:bg-gold/10"
                }`}
              >
                {t.cta}
                <span aria-hidden>→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
