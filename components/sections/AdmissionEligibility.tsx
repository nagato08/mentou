import Image from "next/image";
import Container from "@/components/layout/Container";
import type { Dictionary } from "@/lib/i18n";

type Props = { dict: Dictionary };

export default function AdmissionEligibility({ dict }: Props) {
  const t = dict.admission.eligibility;

  return (
    <section className="relative section-y border-b border-bone/10 bg-paper text-ink overflow-hidden">
      <Container size="wide">
        <div className="grid grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Content */}
          <div className="col-span-12 lg:col-span-6 flex flex-col gap-8 lg:order-1" data-gsap="fade-right">
            <div className="flex items-center gap-3">
              <span className="block h-px w-8 bg-burgundy" />
              <span className="eyebrow text-burgundy">{t.eyebrow}</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-ink">
              {t.title}
            </h2>
            <span className="block h-px w-16 bg-gold" />

            <ul className="flex flex-col">
              {t.criteria.map((c, i) => (
                <li
                  key={i}
                  className="group grid grid-cols-[2.5rem_1fr] items-baseline gap-4 py-4 border-t border-ink/10"
                >
                  <span className="font-mono text-xs text-gold tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-lg md:text-xl text-ink/85">
                    {c}
                  </span>
                </li>
              ))}
            </ul>

            <p className="font-italic-display text-lg md:text-xl text-burgundy mt-4 border-l border-gold pl-5">
              {t.note}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-ink/10">
              {t.profiles.map((profile) => (
                <div key={profile.title} className="bg-paper p-5">
                  <h3 className="font-display text-xl text-ink">
                    {profile.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">
                    {profile.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="col-span-12 lg:col-span-6 lg:order-2" data-gsap="fade-left">
            <div className="relative aspect-4/5 w-full overflow-hidden">
              <Image
                src={t.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
