import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";
import { ALL_OFFERS, HOURLY_RATES, MONTHLY_PRICE, isHourlyOffer, type Offer } from "@/lib/registration";
import { formatPrice } from "@/lib/format";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { buttonClass } from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

function priceOf(offer: Offer): number {
  return isHourlyOffer(offer) ? HOURLY_RATES[offer] : MONTHLY_PRICE;
}

export default function Pricing({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.home.pricing;
  return (
    <section id="tarifs" className="section bg-linear-to-b from-white to-sky">
      <Container>
        <SectionHeading eyebrow={t.eyebrow} title={t.title} intro={t.intro} />

        <ul className="mt-14 grid items-stretch gap-6 lg:grid-cols-3" data-gsap="stagger">
          {ALL_OFFERS.map((offer) => {
            const plan = t.plans[offer];
            const featured = offer === "monthly";
            return (
              <li
                key={offer}
                className={`relative flex flex-col rounded-3xl bg-white p-8 ${
                  featured ? "border-2 border-primary shadow-lift" : "border border-line shadow-card"
                }`}
              >
                {featured && (
                  <span className="absolute -top-3.5 left-8 rounded-full bg-accent px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-ink">
                    {t.popular}
                  </span>
                )}
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-sky px-3 py-1 text-xs font-bold text-primary">
                  <Icon name={offer === "online-hourly" ? "laptop" : "home"} className="h-3.5 w-3.5" />
                  {plan.mode}
                </span>
                <h3 className="mt-4 text-xl font-extrabold text-ink">{plan.name}</h3>
                <p className="mt-1 text-slate">{plan.description}</p>

                <p className="mt-6 flex items-baseline gap-1.5">
                  <span className="text-5xl font-extrabold tracking-tight text-ink tabular-nums">
                    {formatPrice(priceOf(offer), lang)}
                  </span>
                  <span className="font-semibold text-muted">
                    {isHourlyOffer(offer) ? t.perHour : t.perMonth}
                  </span>
                </p>

                <ul className="mt-6 flex flex-1 flex-col gap-3 border-t border-line pt-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-ink">
                      <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-success" strokeWidth={2.5} />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/${lang}/demander-un-tuteur?offre=${offer}`}
                  className={buttonClass(featured ? "primary" : "secondary", "lg", "mt-8 w-full")}
                >
                  {t.cta}
                </Link>
              </li>
            );
          })}
        </ul>

        <p className="mx-auto mt-8 flex max-w-2xl items-center justify-center gap-2 text-center text-sm text-slate">
          <Icon name="lock" className="h-4 w-4 shrink-0 text-primary" />
          {t.taxNote}
        </p>
      </Container>
    </section>
  );
}
