import Link from "next/link";
import type { Locale } from "@/lib/i18n";

type PricingItem = {
  period: string;
  price: number;
  description: string;
  featured?: boolean;
  offer?: string;
};

type Props = {
  lang: Locale;
  cta: string;
  eyebrow: string;
  title: string;
  items: PricingItem[];
  paymentMethods: {
    label: string;
    methods: string[];
  };
};

export default function PricingSection({
  lang,
  cta,
  eyebrow,
  title,
  items,
  paymentMethods,
}: Props) {
  return (
    <section
      className="border-t border-bone/10 py-16 md:py-20 lg:py-24"
      data-gsap="fade-up"
    >
      <div className="flex flex-col items-center">
        {/* Header - Centered */}
        <div className="flex flex-col gap-6 mb-16 text-center max-w-2xl px-4">
          <div className="flex items-center justify-center gap-3">
            <span className="block h-px w-8 bg-gold" />
            <span className="eyebrow">{eyebrow}</span>
            <span className="block h-px w-8 bg-gold" />
          </div>
          <h2
            className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] text-bone"
            data-gsap="fade-left"
          >
            {title}
          </h2>
        </div>

        {/* Pricing Cards - Centered Grid */}
        <div className="w-full max-w-5xl px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {items.map((item, i) => (
            <div
              key={item.period}
              className={`relative flex flex-col p-0 overflow-hidden transition-all duration-300 ${
                item.featured ? "lg:scale-105 lg:shadow-2xl" : ""
              }`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Accent Bar */}
              <div
                className={`h-1 ${
                  item.featured ? "bg-gold" : "bg-bone/20"
                }`}
              />

              {/* Card Content */}
              <div
                className={`flex flex-col p-8 md:p-10 text-center border-b border-l border-r border-bone/10 ${
                  item.featured ? "bg-gold/10" : "bg-ink/50"
                }`}
              >
                {/* Badge */}
                {item.featured && (
                  <div className="inline-flex items-center justify-center gap-2 mb-6 mx-auto">
                    <div className="w-2 h-2 rounded-full bg-bone" />
                    <span className="text-xs font-semibold uppercase tracking-widest text-bone">
                      Meilleure valeur
                    </span>
                  </div>
                )}

                {/* Period */}
                <p className="text-sm text-bone/60 uppercase tracking-widest mb-4">
                  {item.period}
                </p>

                {/* Price */}
                <div className="flex items-baseline justify-center gap-1 mb-8">
                  <span className="font-display text-5xl md:text-6xl font-700 text-bone">
                    {item.price}
                  </span>
                  <span className="text-2xl text-gold">$</span>
                </div>

                {/* Description */}
                <p className="text-base text-bone leading-relaxed mb-8">
                  {item.description}
                </p>

                {/* CTA */}
                {item.offer && (
                  <Link
                    href={`/${lang}/inscription?offre=${item.offer}`}
                    className={`mt-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm uppercase tracking-[0.2em] font-semibold transition-colors ${
                      item.featured
                        ? "bg-gold text-ink hover:bg-gold-soft"
                        : "border border-gold/40 text-gold hover:bg-gold/10"
                    }`}
                  >
                    {cta}
                    <span aria-hidden>→</span>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Payment Methods - Centered */}
        <div className="w-full border-t border-bone/10 pt-16">
          <div className="flex flex-col items-center">
            <h3 className="font-display text-2xl md:text-3xl text-bone mb-8 text-center">
              {paymentMethods.label}
            </h3>
            <div className="w-full max-w-4xl px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
              {paymentMethods.methods.map((method, i) => {
                const methodType =
                  method.toLowerCase().includes("carte") ||
                  method.toLowerCase().includes("card")
                    ? 0
                    : method.toLowerCase().includes("paypal")
                      ? 1
                      : 2;

                const labels = ["Carte bancaire", "PayPal", "Sur place"];
                return (
                  <div
                    key={i}
                    className="flex items-center justify-center gap-4 p-4 rounded border border-bone/10"
                  >
                    <div className="shrink-0 w-10 h-10 flex items-center justify-center rounded bg-gold/20 text-gold font-semibold">
                      {methodType === 0 ? "◆" : methodType === 1 ? "●" : "■"}
                    </div>
                    <div className="text-left">
                      <p className="text-xs uppercase tracking-widest text-bone/60">
                        {labels[methodType]}
                      </p>
                      <p className="text-sm text-bone font-medium">{method}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
