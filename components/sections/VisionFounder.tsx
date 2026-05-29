import Image from "next/image";
import Container from "@/components/layout/Container";
import type { Dictionary } from "@/lib/i18n";

type Props = { dict: Dictionary };

export default function VisionFounder({ dict }: Props) {
  const t = dict.vision.founder;

  return (
    <section className="relative section-y border-b border-bone/10 bg-night/30">
      <Container size="wide">
        <div className="grid grid-cols-12 gap-8 lg:gap-20 items-center">
          <div className="col-span-12 md:col-span-5 lg:col-span-5" data-gsap="fade-right">
            <div className="relative aspect-4/5 w-full overflow-hidden">
              <Image
                src={t.image}
                alt=""
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover grayscale"
              />
              <div className="absolute inset-0 bg-ink/15" />
            </div>
          </div>

          <div className="col-span-12 md:col-span-7 lg:col-span-7 flex flex-col gap-8" data-gsap="fade-left">
            <div className="flex items-center gap-3">
              <span className="block h-px w-8 bg-gold" />
              <span className="eyebrow">{t.eyebrow}</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-bone">
              {t.title}
            </h2>
            <span className="block h-px w-16 bg-gold/50" />
            <p className="text-lg md:text-xl text-bone/70 leading-relaxed max-w-2xl">
              {t.body}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
