import Container from "@/components/layout/Container";
import type { Dictionary } from "@/lib/i18n";

type Props = { dict: Dictionary };

export default function ProgramRhythm({ dict }: Props) {
  const t = dict.home.programRhythm;

  return (
    <section className="relative section-y-home border-b border-bone/10 bg-paper text-ink overflow-hidden">
      <Container size="wide">
        <div className="grid grid-cols-12 gap-8 lg:gap-16">
          <div className="col-span-12 lg:col-span-5" data-gsap="fade-right">
            <div className="flex items-center gap-3">
              <span className="block h-px w-8 bg-burgundy" />
              <span className="eyebrow text-burgundy">{t.eyebrow}</span>
            </div>
            <h2 className="mt-5 md:mt-6 font-display text-3xl md:text-5xl lg:text-6xl leading-[1.05] text-ink">
              {t.title}
            </h2>
            <p className="mt-6 text-ink/65 leading-relaxed">{t.body}</p>
          </div>

          <div className="col-span-12 lg:col-span-7" data-gsap="stagger">
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-ink/10">
              {t.facts.map((fact) => (
                <div key={fact.label} className="bg-paper p-5 sm:p-6 md:p-8 sm:min-h-44">
                  <dt className="text-[0.65rem] uppercase tracking-[0.3em] text-burgundy">
                    {fact.label}
                  </dt>
                  <dd className="mt-4 md:mt-5 font-display text-3xl md:text-4xl leading-none text-ink">
                    {fact.value}
                  </dd>
                  <p className="mt-4 text-sm leading-relaxed text-ink/60">
                    {fact.note}
                  </p>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}
