import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";

type ParentsCircleProps = { dict: Dictionary };

export default function ParentsCircle({ dict }: ParentsCircleProps) {
  const t = dict.home.parentsCircle;

  return (
    <section className="relative section-y-home border-b hairline overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/parents.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-ink/85" />
      <div className="absolute inset-0 bg-linear-to-b from-ink via-transparent to-ink" />

      <div className="relative mx-auto w-full max-w-5xl px-6 md:px-12 lg:px-20 text-center" data-gsap="scale">
        <div className="inline-flex items-center gap-3 mb-6 md:mb-8">
          <span className="block h-px w-6 sm:w-8 bg-gold" />
          <span className="text-[0.65rem] uppercase tracking-[0.24em] sm:tracking-[0.35em] text-gold">
            {t.eyebrow}
          </span>
          <span className="block h-px w-6 sm:w-8 bg-gold" />
        </div>

        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.1] text-bone">
          {t.title}
        </h2>

        <p className="mt-6 max-w-2xl mx-auto text-base md:text-lg text-bone/75 leading-relaxed">
          {t.body}
        </p>

        <ul className="mt-10 grid sm:grid-cols-3 gap-4 md:gap-6" data-gsap="stagger">
          {t.points.map((p, i) => (
            <li
              key={i}
              className="bg-ink/60 border hairline backdrop-blur-sm px-5 sm:px-6 py-6 sm:py-10 text-bone/90 flex flex-col items-center gap-3"
            >
              <span className="font-display text-3xl text-gold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-lg">{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
