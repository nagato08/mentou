import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";

type Props = { dict: Dictionary; lang: Locale };

export default function TutorCTA({ dict, lang }: Props) {
  const t = dict.tutor.cta;

  return (
    <section className="relative section-y-home bg-night/40 border-y hairline overflow-hidden">
      {/* Accent géométrique discret */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #b8924a 1px, transparent 1px), linear-gradient(to bottom, #b8924a 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="relative mx-auto w-full max-w-5xl px-6 md:px-12 lg:px-20 flex flex-col items-center text-center gap-6" data-gsap="fade-up">
        <div className="flex items-center gap-3">
          <span className="block h-px w-8 bg-gold" />
          <span className="text-[0.65rem] uppercase tracking-[0.35em] text-gold">
            {t.eyebrow}
          </span>
          <span className="block h-px w-8 bg-gold" />
        </div>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-bone max-w-3xl">
          {t.title}{" "}
          <em className="not-italic font-italic-display text-gold/90">
            {t.titleAccent}
          </em>
        </h2>
        <p className="text-base md:text-lg text-bone/60 leading-relaxed max-w-2xl">
          {t.body}
        </p>
        <Link
          href={`/${lang}/admission#devenir-tuteur`}
          className="mt-2 inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-ink font-semibold text-sm uppercase tracking-[0.2em] hover:bg-gold-soft transition-colors"
        >
          {t.button}
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
