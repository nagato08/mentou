import type { Dictionary } from "@/lib/i18n";

type Props = { dict: Dictionary };

export default function EventsPoles({ dict }: Props) {
  const t = dict.events.poles;

  return (
    <section className="relative section-y-home border-b hairline bg-ink overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-20">
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
            <em className="not-italic font-italic-display text-gold/90">
              {t.titleAccent}
            </em>
          </h2>
        </div>

        {/* 3-column grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 border border-bone/10"
          data-gsap="stagger"
        >
          {t.items.map((pole, idx) => (
            <div
              key={pole.index}
              className={`group relative flex flex-col gap-6 p-8 md:p-10 lg:p-12 bg-ink hover:bg-night/50 transition-colors duration-500
                ${idx < t.items.length - 1 ? "border-b md:border-b-0 md:border-r border-bone/10" : ""}
              `}
            >
              {/* Large index */}
              <span className="absolute top-6 right-8 font-display text-[5rem] leading-none text-bone/[0.05] select-none group-hover:text-gold/[0.07] transition-colors duration-500">
                {pole.index}
              </span>

              {/* Gold bar */}
              <span className="block h-px w-10 bg-gold group-hover:w-20 transition-all duration-500" />

              {/* Text */}
              <div className="flex flex-col gap-3 pr-10">
                <p className="text-[0.65rem] uppercase tracking-[0.3em] text-gold/60">
                  {pole.lead}
                </p>
                <h3 className="font-display text-2xl md:text-3xl leading-snug text-bone group-hover:text-gold transition-colors duration-500">
                  {pole.title}
                </h3>
                <p className="text-sm md:text-base text-bone/55 leading-relaxed mt-1">
                  {pole.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
