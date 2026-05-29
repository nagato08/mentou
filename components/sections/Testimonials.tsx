import Container from "@/components/layout/Container";
import type { Dictionary } from "@/lib/i18n";

type Props = { dict: Dictionary };

export default function Testimonials({ dict }: Props) {
  const t = dict.home.testimonials;

  return (
    <section className="relative section-y-home border-b border-bone/10 bg-paper text-ink overflow-hidden">
      <Container size="wide">
        <div className="grid grid-cols-12 gap-8 mb-10 md:mb-12 items-end" data-gsap="fade-up">
          <div className="col-span-12 md:col-span-4">
            <div className="flex items-center gap-3">
              <span className="block h-px w-8 bg-burgundy" />
              <span className="eyebrow text-burgundy">{t.eyebrow}</span>
            </div>
          </div>
          <h2 className="col-span-12 md:col-span-8 font-display text-3xl md:text-5xl lg:text-6xl leading-[1.1] text-ink">
            {t.title}
          </h2>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8" data-gsap="stagger">
          {t.items.map((item, i) => (
            <li
              key={i}
              className="group relative bg-bone/50 border border-ink/10 p-8 md:p-10 flex flex-col gap-6 hover:border-gold transition-colors duration-500"
            >
              <span className="font-display text-6xl md:text-7xl text-gold/70 leading-none">
                &ldquo;
              </span>
              <p className="text-base md:text-lg text-ink/80 leading-relaxed flex-1">
                {item.quote}
              </p>
              <div className="flex flex-col gap-1 border-t border-ink/10 pt-5">
                <span className="font-display text-lg text-ink">
                  {item.author}
                </span>
                <span className="text-[0.7rem] uppercase tracking-[0.25em] text-burgundy">
                  {item.role}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
