import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";

type ManifestoProps = { dict: Dictionary };

export default function Manifesto({ dict }: ManifestoProps) {
  const t = dict.home.manifesto;

  return (
    <section className="relative section-y border-b hairline bg-ink">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-12 gap-8 md:gap-16 items-start">
          {/* Image */}
          <div className="col-span-12 md:col-span-5 lg:col-span-5" data-gsap="fade-left">
            <div className="relative aspect-4/5 w-full overflow-hidden">
              <Image
                src="/images/manifesto.jpg"
                alt="Étudiant en pleine lecture"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-ink/20" />
            </div>
            <div className="mt-4 flex items-center gap-3">
              <span className="block h-px w-8 bg-gold" />
              <span className="text-[0.65rem] uppercase tracking-[0.35em] text-bone/50">
                {t.eyebrow}
              </span>
            </div>
          </div>

          {/* Texte */}
          <div className="col-span-12 md:col-span-7 lg:col-span-7" data-gsap="fade-right">
            <p className="dropcap font-display text-2xl md:text-3xl lg:text-[2.25rem] leading-[1.45] text-bone/95">
              <span className="text-gold font-display">{t.lead}</span>
              {t.body}
            </p>

            <div className="mt-12 md:mt-16 pl-6 md:pl-8 border-l hairline-gold">
              <blockquote>
                <p className="font-italic-display text-xl md:text-2xl text-bone/90 leading-snug">
                  « {t.quote} »
                </p>
                <footer className="mt-3 text-[0.65rem] uppercase tracking-[0.35em] text-gold">
                  — {t.quoteAuthor}
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
