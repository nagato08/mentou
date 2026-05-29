import Image from "next/image";
import Container from "@/components/layout/Container";
import type { Dictionary } from "@/lib/i18n";

type Props = { dict: Dictionary };

export default function VisionFounder({ dict }: Props) {
  const t = dict.vision.founder;

  return (
    <section className="relative section-y border-b border-bone/10 bg-night/30">
      <Container size="wide">
        <div className="grid grid-cols-12 gap-8 lg:gap-20 items-start">
          <div className="col-span-12 md:col-span-5 lg:col-span-5" data-gsap="fade-right">
            <div className="relative aspect-4/5 w-full overflow-hidden">
              <Image
                src={t.image}
                alt={t.imageAlt}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover grayscale"
              />
              <div className="absolute inset-0 bg-ink/15" />
            </div>
            <div className="border-x border-b border-bone/10 px-5 py-5 md:px-6">
              <p className="font-display text-2xl text-bone">{t.name}</p>
              <p className="mt-2 text-sm leading-relaxed text-bone/55">
                {t.role}
              </p>
            </div>
          </div>

          <div className="col-span-12 md:col-span-7 lg:col-span-7 flex flex-col gap-8" data-gsap="fade-left">
            <div className="flex items-center gap-3">
              <span className="block h-px w-8 bg-gold" />
              <span className="eyebrow">{t.eyebrow}</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-bone">
              {t.title}
            </h2>
            <span className="block h-px w-16 bg-gold/50" />
            <p className="text-lg md:text-xl text-bone/70 leading-relaxed max-w-2xl">
              {t.body}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="border border-bone/10 p-5 md:p-6">
                <h3 className="text-[0.65rem] uppercase tracking-[0.3em] text-gold">
                  {t.journey.title}
                </h3>
                <ul className="mt-5 flex flex-col gap-4">
                  {t.journey.items.map((item, index) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-bone/65">
                      <span className="font-mono text-xs text-gold tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-bone/10 p-5 md:p-6">
                <h3 className="text-[0.65rem] uppercase tracking-[0.3em] text-gold">
                  {t.why.title}
                </h3>
                <p className="mt-5 text-sm md:text-base leading-relaxed text-bone/65">
                  {t.why.body}
                </p>
              </div>
            </div>

            <blockquote className="border-l border-gold pl-5 md:pl-6">
              <p className="font-italic-display text-xl md:text-2xl leading-snug text-bone/90">
                « {t.quote} »
              </p>
              <footer className="mt-4 text-[0.65rem] uppercase tracking-[0.35em] text-gold">
                — {t.signature}
              </footer>
            </blockquote>
          </div>
        </div>
      </Container>
    </section>
  );
}
