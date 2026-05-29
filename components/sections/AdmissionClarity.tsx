import Container from "@/components/layout/Container";
import type { Dictionary } from "@/lib/i18n";

type Props = { dict: Dictionary };

export default function AdmissionClarity({ dict }: Props) {
  const t = dict.admission.clarity;

  return (
    <section className="relative section-y border-b border-bone/10 bg-night/40 overflow-hidden">
      <Container size="wide">
        <div className="grid grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="col-span-12 lg:col-span-4" data-gsap="fade-right">
            <div className="flex items-center gap-3">
              <span className="block h-px w-8 bg-gold" />
              <span className="eyebrow">{t.eyebrow}</span>
            </div>
            <h2 className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-bone">
              {t.title}
            </h2>
            <p className="mt-6 text-bone/60 leading-relaxed">{t.body}</p>
          </div>

          <ul className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-px bg-bone/10" data-gsap="stagger">
            {t.items.map((item, index) => (
              <li key={item.title} className="bg-ink p-6 md:p-8 min-h-44">
                <span className="font-mono text-xs text-gold tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 font-display text-2xl md:text-3xl leading-tight text-bone">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm md:text-base leading-relaxed text-bone/60">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
