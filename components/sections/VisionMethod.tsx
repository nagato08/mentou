import Image from "next/image";
import Container from "@/components/layout/Container";
import type { Dictionary } from "@/lib/i18n";

type Props = { dict: Dictionary };

export default function VisionMethod({ dict }: Props) {
  const t = dict.vision.method;

  return (
    <section className="relative section-y border-b border-bone/10 bg-ink overflow-hidden">
      <Container size="wide">
        <div className="grid grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Image sticky */}
          <div className="col-span-12 lg:col-span-5" data-gsap="fade-left">
            <div className="relative aspect-3/4 w-full overflow-hidden lg:sticky lg:top-28">
              <Image
                src={t.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-ink/15" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-linear-to-t from-ink to-transparent">
                <span className="font-italic-display text-2xl md:text-3xl text-gold">
                  {t.title}
                </span>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="col-span-12 lg:col-span-7 flex flex-col">
            <div className="mb-10 md:mb-14" data-gsap="fade-up">
              <div className="flex items-center gap-3">
                <span className="block h-px w-8 bg-gold" />
                <span className="eyebrow">{t.eyebrow}</span>
              </div>
            </div>

            <ol className="flex flex-col" data-gsap="stagger-left">
              {t.steps.map((step, i) => (
                <li
                  key={step.label}
                  className="group grid grid-cols-[3rem_1fr] md:grid-cols-[5rem_1fr] gap-4 md:gap-8 py-8 md:py-10 border-t border-bone/10 first:border-t-0"
                >
                  <span className="font-display text-3xl md:text-5xl text-gold/30 group-hover:text-gold transition-colors duration-500 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-3">
                    <h3 className="font-display text-3xl md:text-4xl text-bone">
                      {step.label}
                    </h3>
                    <p className="text-base md:text-lg text-bone/60 leading-relaxed max-w-xl">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
