import Image from "next/image";
import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";

type Props = { dict: Dictionary; lang: Locale };

function StatusBadge({
  status,
  labels,
}: {
  status: string;
  labels: { open: string; soon: string; tbd: string };
}) {
  const map: Record<string, { text: string; cls: string }> = {
    open: { text: labels.open, cls: "bg-gold text-ink" },
    soon: { text: labels.soon, cls: "bg-bone/10 text-bone/70 border border-bone/20" },
    tbd: { text: labels.tbd, cls: "bg-bone/10 text-bone/70 border border-bone/20" },
  };
  const s = map[status] ?? map.soon;
  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1.5 text-[0.55rem] uppercase tracking-[0.25em] font-semibold ${s.cls}`}
    >
      {status === "open" && (
        <span className="h-1.5 w-1.5 rounded-full bg-ink animate-pulse" />
      )}
      {s.text}
    </span>
  );
}

export default function EventsList({ dict, lang }: Props) {
  const t = dict.events.list;
  const labels = { open: t.statusOpen, soon: t.statusSoon, tbd: t.statusTbd };
  const featured = t.items.find((e) => e.featured);
  const rest = t.items.filter((e) => !e.featured);

  return (
    <section className="relative section-y-home border-b hairline bg-ink overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="mb-12 md:mb-16" data-gsap="fade-up">
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

        {/* Featured event */}
        {featured && (
          <div
            className="group relative grid grid-cols-1 lg:grid-cols-2 border border-bone/10 overflow-hidden mb-6"
            data-gsap="fade-up"
          >
            {/* Image */}
            <div className="relative min-h-[280px] lg:min-h-[460px] overflow-hidden">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/30 to-transparent lg:bg-linear-to-r" />
              <div className="absolute top-5 left-5">
                <StatusBadge status={featured.status} labels={labels} />
              </div>
            </div>

            {/* Details */}
            <div className="relative flex flex-col justify-center gap-5 p-8 md:p-10 lg:p-12 bg-night/30">
              <span className="text-[0.65rem] uppercase tracking-[0.3em] text-gold/70">
                {featured.category}
              </span>
              <h3 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] text-bone">
                {featured.title}
              </h3>
              <p className="font-italic-display text-lg text-gold/80">
                {featured.tagline}
              </p>
              <p className="text-sm uppercase tracking-[0.2em] text-bone/50">
                {featured.date}
              </p>

              {featured.meta.length > 0 && (
                <ul className="flex flex-col gap-2.5 border-t border-bone/10 pt-5">
                  {featured.meta.map((m, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-bone/70">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold/70" />
                      {m}
                    </li>
                  ))}
                </ul>
              )}

              {featured.cta && (
                <Link
                  href={`/${lang}/admission#tournoi`}
                  className="mt-2 inline-flex items-center justify-center gap-2 self-start px-7 py-3.5 bg-gold text-ink font-semibold text-sm uppercase tracking-[0.2em] hover:bg-gold-soft transition-colors"
                >
                  {featured.cta}
                  <span aria-hidden>→</span>
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Official tournament poster */}
        {featured && (
          <div className="mb-12" data-gsap="fade-up">
            <div className="flex items-center gap-3 mb-6">
              <span className="block h-px w-8 bg-gold" />
              <span className="text-[0.65rem] uppercase tracking-[0.35em] text-gold">
                {t.poster.eyebrow}
              </span>
            </div>
            <div className="relative w-full border border-bone/10 overflow-hidden">
              <Image
                src="/images/event.jpg"
                alt={t.poster.title}
                width={1200}
                height={1600}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link
                href={`/${lang}/inscription?offre=event-player`}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold text-ink font-semibold text-sm uppercase tracking-[0.2em] hover:bg-gold-soft transition-colors"
              >
                {t.poster.cta}
                <span aria-hidden>→</span>
              </Link>
              <a
                href="/images/event.jpg"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-bone/20 text-bone/70 font-semibold text-sm uppercase tracking-[0.2em] hover:border-gold hover:text-bone transition-colors"
              >
                {t.poster.zoom}
                <span aria-hidden>↗</span>
              </a>
            </div>
          </div>
        )}

        {/* Other events grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          data-gsap="stagger"
        >
          {rest.map((event) => (
            <article
              key={event.id}
              className="group relative border border-bone/10 overflow-hidden aspect-4/5 sm:aspect-3/4"
            >
              <Image
                src={event.image}
                alt={event.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/50 to-ink/10" />

              {/* Badge */}
              <div className="absolute top-5 left-5">
                <StatusBadge status={event.status} labels={labels} />
              </div>

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-7 flex flex-col gap-2">
                <span className="text-[0.6rem] uppercase tracking-[0.3em] text-gold/70">
                  {event.category}
                </span>
                <h3 className="font-display text-2xl md:text-3xl leading-tight text-bone">
                  {event.title}
                </h3>
                <p className="text-sm text-bone/60 leading-relaxed">
                  {event.tagline}
                </p>
                <span className="mt-2 inline-block text-[0.65rem] uppercase tracking-[0.2em] text-bone/40">
                  {event.date}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
