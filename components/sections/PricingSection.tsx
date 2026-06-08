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

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {items.map((item, i) => (
            <div
              key={item.period}
              className={`relative flex flex-col p-0 overflow-hidden transition-all duration-300 ${
                item.featured ? "lg:scale-105 lg:shadow-2xl" : ""
              }`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Card Border Accent */}
              <div
                className={`absolute top-0 left-0 w-full h-1 ${
                  item.featured ? "bg-gold" : "bg-bone/20"
                }`}
              />

              {/* Card Content */}
              <div
                className={`flex flex-col p-8 md:p-10 border-b border-l border-r border-bone/10 ${
                  item.featured ? "bg-gold/10" : "bg-ink/50"
                }`}
              >
                {/* Badge */}
                {item.featured && (
                  <div className="inline-flex items-center gap-2 mb-6 w-fit">
                    <div className="w-2 h-2 rounded-full bg-burgundy" />
                    <span className="text-xs font-semibold uppercase tracking-widest text-burgundy">
                      Meilleure valeur
                    </span>
                  </div>
                )}

                {/* Period + Price */}
                <div className="mb-8">
                  <p className="text-sm text-bone/60 uppercase tracking-widest mb-3">
                    {item.period}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-5xl md:text-6xl font-700 text-bone">
                      {item.price}
                    </span>
                    <span className="text-2xl text-gold">$</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-base text-bone leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Secondary Info */}
                <p className="text-sm text-bone/50 mb-8 pb-8 border-b border-bone/10">
                  {item.secondary}
                </p>

                {/* CTA Button */}
                <button
                  aria-label={`Demander admission pour ${item.period.toLowerCase()}`}
                  className={`w-full font-semibold py-3 px-6 rounded transition-all duration-200 active:scale-95 ${
                    item.featured
                      ? "bg-gold text-ink hover:bg-gold/90"
                      : "bg-bone/10 text-bone hover:bg-bone/20 border border-bone/20"
                  }`}
                >
                  Demander une admission
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="border-t border-bone/10 pt-16">
          <h3 className="font-display text-2xl md:text-3xl text-bone mb-8">
            {paymentMethods.label}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  className="flex items-center gap-4 p-4 rounded bg-ink/50 border border-bone/10 hover:border-gold/30 transition-colors"
                >
                  <div className="shrink-0 w-10 h-10 flex items-center justify-center rounded bg-gold/20 text-gold font-semibold">
                    {methodType === 0 ? "◆" : methodType === 1 ? "●" : "■"}
                  </div>
                  <div>
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
    </section>
  );
}
