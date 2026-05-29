import Link from "next/link";
import Container from "@/components/layout/Container";

type Props = {
  title: string;
  body: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export default function CtaPanel({
  title,
  body,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: Props) {
  return (
    <section className="relative section-y bg-night/40 border-b border-bone/10 overflow-hidden">
      <Container size="narrow" className="relative">
        <div className="flex flex-col items-center text-center gap-8" data-gsap="fade-up">
        <span className="block h-px w-20 bg-gold" />
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-bone">
          {title}
        </h2>
        <p className="text-bone/60 text-lg max-w-lg">{body}</p>
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <Link
            href={primaryHref}
            className="group inline-flex items-center justify-between gap-4 w-full sm:w-auto border border-gold bg-gold text-ink px-8 py-5 text-xs uppercase tracking-[0.3em] font-medium hover:bg-gold-soft transition-all duration-500"
          >
            {primaryLabel}
            <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
          </Link>
          {secondaryLabel && secondaryHref && (
            <Link
              href={secondaryHref}
              className="group inline-flex items-center justify-between gap-4 w-full sm:w-auto border border-bone/30 text-bone px-8 py-5 text-xs uppercase tracking-[0.3em] font-medium hover:border-gold hover:text-gold transition-colors duration-500"
            >
              {secondaryLabel}
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
            </Link>
          )}
        </div>
        </div>
      </Container>
    </section>
  );
}
