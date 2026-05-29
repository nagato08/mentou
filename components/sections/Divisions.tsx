import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";

type DivisionsProps = { dict: Dictionary };

function DivisionCard({
  label,
  ageRange,
  headline,
  points,
  image,
  imageAlt,
}: {
  label: string;
  ageRange: string;
  headline: string;
  points: string[];
  image: string;
  imageAlt: string;
}) {
  return (
    <article className="relative overflow-hidden border hairline group">
      {/* Image */}
      <div className="relative aspect-4/5 md:aspect-3/4 lg:aspect-4/5 min-h-[420px] sm:min-h-[480px] lg:min-h-[520px]">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover grayscale-40 group-hover:grayscale-0 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/60 to-ink/20" />

        {/* Content overlay */}
        <div className="absolute inset-0 p-6 sm:p-8 md:p-10 flex flex-col justify-end">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-5 sm:mb-6">
            <span className="text-[0.65rem] uppercase tracking-[0.24em] sm:tracking-[0.35em] text-gold">
              {label}
            </span>
            <span className="font-display text-xl text-bone">{ageRange}</span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl md:text-4xl leading-tight text-bone mb-6 md:mb-8">
            {headline}
          </h3>

          <span className="block h-px w-12 bg-gold mb-6" />

          <ul className="space-y-2">
            {points.map((p, i) => (
              <li
                key={i}
                className="flex gap-3 sm:gap-4 items-baseline text-bone/85 text-sm md:text-base"
              >
                <span className="font-mono text-[0.65rem] text-gold/70 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export default function Divisions({ dict }: DivisionsProps) {
  const t = dict.home.divisions;

  return (
    <section className="relative section-y-home border-b hairline bg-ink">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-12 gap-8 mb-10 md:mb-12 items-end" data-gsap="fade-up">
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

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <div data-gsap="fade-left">
            <DivisionCard
              label={t.junior.label}
              ageRange={t.junior.ageRange}
              headline={t.junior.headline}
              points={t.junior.points}
              image="/images/junior.jpg"
              imageAlt={t.junior.label}
            />
          </div>
          <div data-gsap="fade-right">
            <DivisionCard
              label={t.senior.label}
              ageRange={t.senior.ageRange}
              headline={t.senior.headline}
              points={t.senior.points}
              image="/images/senior.jpg"
              imageAlt={t.senior.label}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
