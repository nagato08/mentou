import Container from "@/components/layout/Container";
import type { Dictionary } from "@/lib/i18n";

type Props = { dict: Dictionary };

export default function VisionManifesto({ dict }: Props) {
  const t = dict.vision.manifesto;

  return (
    <section className="relative section-y border-b border-bone/10 bg-paper text-ink overflow-hidden">
      <span
        aria-hidden
        className="pointer-events-none select-none absolute left-0 top-1/2 -translate-y-1/2 font-display text-[20vw] leading-none text-ink/[0.03] tracking-tighter"
      >
        I
      </span>
      <Container size="wide" className="relative">
        <div className="grid grid-cols-12 gap-8 lg:gap-16">
          <div className="col-span-12 md:col-span-4" data-gsap="fade-up">
            <div className="flex items-center gap-3 mb-4">
              <span className="block h-px w-8 bg-burgundy" />
              <span className="eyebrow text-burgundy">{t.eyebrow}</span>
            </div>
          </div>
          <div className="col-span-12 md:col-span-8 flex flex-col gap-10" data-gsap="fade-right">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-ink">
              {t.title}
            </h2>
            <p className="dropcap font-display text-xl md:text-2xl lg:text-[1.6rem] leading-[1.55] text-ink/85">
              {t.body}
            </p>
            <blockquote className="border-l border-gold/60 pl-6 md:pl-8 mt-4">
              <p className="font-italic-display text-xl md:text-2xl text-ink/80 leading-snug">
                « {t.quote} »
              </p>
              <footer className="mt-3 text-[0.65rem] uppercase tracking-[0.35em] text-burgundy">
                — {t.author}
              </footer>
            </blockquote>
          </div>
        </div>
      </Container>
    </section>
  );
}
