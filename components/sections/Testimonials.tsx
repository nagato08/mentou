import type { Dictionary } from "@/lib/i18n";

type TestimonialsProps = {
  dict: Dictionary;
};

export default function Testimonials({ dict }: TestimonialsProps) {
  const { items, eyebrow, title } = dict.home.testimonials;

  return (
    <section
      className="border-t border-bone/10 py-16 md:py-20 lg:py-24"
      data-gsap="fade-up"
    >
      <div className="container">
        {/* Header */}
        <div className="flex flex-col gap-6 mb-16 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="block h-px w-8 bg-gold" />
            <span className="eyebrow">{eyebrow}</span>
          </div>
          <h2
            className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] text-bone"
            data-gsap="fade-left"
          >
            {title}
          </h2>
        </div>

        {/* Quotes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <div
              key={i}
              className="p-8 bg-ink/50 border border-bone/10 rounded"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(item.rating)].map((_, s) => (
                  <span key={s} className="text-gold text-sm">
                    ★
                  </span>
                ))}
              </div>
              <blockquote className="mb-6">
                <p className="text-bone leading-relaxed italic">
                  &quot;{item.quote}&quot;
                </p>
              </blockquote>
              <footer>
                <p className="font-semibold text-bone">{item.author}</p>
                <p className="text-sm text-bone/60">{item.role}</p>
              </footer>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
