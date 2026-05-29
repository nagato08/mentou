import Container from "@/components/layout/Container";
import type { Dictionary } from "@/lib/i18n";

type Props = { dict: Dictionary };

export default function AdmissionProcess({ dict }: Props) {
  const t = dict.admission.process;

  return (
    <section className="relative section-y border-b border-bone/10 bg-ink overflow-hidden">
      <Container size="wide">
        <div className="grid grid-cols-12 gap-8 mb-12 md:mb-20 items-end" data-gsap="fade-up">
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

        {/* Steps timeline */}
        <ol className="relative" data-gsap="stagger">
          {t.steps.map((step, i) => {
            const isLast = i === t.steps.length - 1;
            return (
              <li
                key={step.n}
                className="group grid grid-cols-12 gap-4 md:gap-8 lg:gap-12 items-start py-8 md:py-12 border-t border-bone/10 relative"
              >
                {/* Number */}
                <div className="col-span-2 md:col-span-2 lg:col-span-1 flex flex-col items-start">
                  <span className="font-display text-3xl md:text-5xl lg:text-6xl text-gold/40 group-hover:text-gold transition-colors duration-500 tabular-nums leading-none">
                    {step.n}
                  </span>
                </div>

                {/* Label + duration */}
                <div className="col-span-10 md:col-span-4 lg:col-span-4 flex flex-col gap-2">
                  <h3 className="font-display text-2xl md:text-4xl text-bone">
                    {step.label}
                  </h3>
                  <span className="text-[0.65rem] uppercase tracking-[0.4em] text-gold/70">
                    ◦ {step.duration}
                  </span>
                </div>

                {/* Body */}
                <div className="col-span-12 md:col-span-6 lg:col-span-7">
                  <p className="text-base md:text-lg text-bone/65 leading-relaxed">
                    {step.body}
                  </p>
                </div>

                {/* Connector vertical line */}
                {!isLast && (
                  <span
                    aria-hidden
                    className="absolute left-[5%] md:left-[8%] lg:left-[4%] top-full -translate-x-1/2 h-12 w-px bg-gold/20"
                  />
                )}
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
