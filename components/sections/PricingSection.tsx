type PricingItem = {
  period: string;
  price: number;
  description: string;
  secondary: string;
  featured?: boolean;
};

type Props = {
  eyebrow: string;
  title: string;
  items: PricingItem[];
  paymentMethods: {
    label: string;
    methods: string[];
  };
};

export default function PricingSection({
  eyebrow,
  title,
  items,
  paymentMethods,
}: Props) {
  const paymentSymbols = {
    card: "💳",
    paypal: "🌐",
    place: "📍",
  };

  return (
    <section
      className="border-t border-bone/10 py-16 md:py-20 lg:py-24"
      data-gsap="fade-up"
    >
      <div className="container">
        {/* Header */}
        <div className="flex flex-col gap-8 mb-16">
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

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
          {items.map((item, i) => (
            <div
              key={item.period}
              className={`border rounded-lg p-8 md:p-10 transition-all duration-300 hover:border-gold/50 hover:shadow-lg group ${
                item.featured
                  ? "border-gold/30 bg-gold/5"
                  : "border-bone/10 bg-ink"
              }`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Featured Badge */}
              {item.featured && (
                <div className="inline-block mb-4 px-3 py-1 bg-burgundy text-bone text-xs font-semibold uppercase tracking-widest">
                  Meilleure valeur
                </div>
              )}

              {/* Period Label */}
              <span className="text-[0.65rem] uppercase tracking-[0.35em] text-gold block mb-2">
                {item.period}
              </span>

              {/* Price */}
              <div className="mb-6">
                <span className="font-display text-5xl md:text-6xl text-bone">
                  {item.price}
                </span>
                <span className="text-xl text-gold ml-1">$</span>
              </div>

              {/* Description */}
              <p className="text-bone text-base md:text-lg leading-relaxed mb-4">
                {item.description}
              </p>

              {/* Secondary Info */}
              <p className="text-bone/60 text-sm mb-8">{item.secondary}</p>

              {/* CTA Button */}
              <button
                aria-label={`Enroll ${item.period.toLowerCase()}`}
                className="w-full bg-gold text-ink font-semibold py-3 px-6 rounded transition-all duration-300 hover:bg-gold/90 active:scale-95 group-hover:shadow-lg"
              >
                Demander une admission
              </button>
            </div>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="bg-ink border border-bone/10 rounded-lg p-8 md:p-10">
          <h3 className="font-display text-xl md:text-2xl text-bone mb-6">
            {paymentMethods.label}
          </h3>
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {paymentMethods.methods.map((method, i) => {
              const methodKey =
                method.toLowerCase().includes("carte") ||
                method.toLowerCase().includes("card")
                  ? "card"
                  : method.toLowerCase().includes("paypal")
                    ? "paypal"
                    : "place";
              return (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xl">
                    {paymentSymbols[methodKey as keyof typeof paymentSymbols]}
                  </span>
                  <span className="text-bone text-sm md:text-base">
                    {method}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
