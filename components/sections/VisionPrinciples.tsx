import Container from "@/components/layout/Container";
import type { Dictionary } from "@/lib/i18n";

type Props = { dict: Dictionary };

export default function VisionPrinciples({ dict }: Props) {
  const t = dict.vision.principles;

  return (
    <section className="relative section-y border-b border-bone/10 bg-ink">
      <Container size="wide">
        <div className="grid grid-cols-12 gap-8 mb-12 md:mb-16 items-end" data-gsap="fade-up">
          <div className="col-span-12 md:col-span-4">
            <div className="flex items-center gap-3">
              <span className="block h-px w-8 bg-gold" />
              <span className="eyebrow">{t.eyebrow}</span>
            </div>
          </div>
          <h2 className="col-span-12 md:col-span-8 font-display text-3xl md:text-5xl lg:text-6xl leading-[1.1] text-bone">
            {t.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-bone/10" data-gsap="stagger">
          {t.items.map((item) => (
            <article
              key={item.n}
              className="group relative bg-ink p-8 md:p-12 flex flex-col gap-6 hover:bg-night/40 transition-colors duration-500"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-display text-5xl md:text-7xl text-gold/20 leading-none group-hover:text-gold/50 transition-colors duration-500 tabular-nums">
                  {item.n}
                </span>
                <span className="block h-px w-16 bg-gold/40 group-hover:w-24 group-hover:bg-gold transition-all duration-500" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-bone group-hover:text-gold transition-colors duration-500">
                {item.title}
              </h3>
              <p className="text-base text-bone/65 leading-relaxed">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
