import type { Dictionary, Locale } from "@/lib/i18n";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Icon, { type IconName } from "@/components/ui/Icon";

const ICONS: IconName[] = ["calendar", "chat", "users", "target"];

export default function HowItWorks({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.home.howItWorks;
  return (
    <section id="fonctionnement" className="section">
      <Container>
        <SectionHeading eyebrow={t.eyebrow} title={t.title} />
        <ol className="relative mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4" data-reveal="stagger">
          {t.steps.map((step, i) => (
            <li key={step.title} className="relative flex flex-col items-start gap-4">
              {/* Trait de liaison entre les étapes (desktop). */}
              {i < t.steps.length - 1 && (
                <span
                  aria-hidden
                  className="absolute left-16 right-0 top-7 hidden border-t-2 border-dashed border-sky-strong lg:block"
                />
              )}
              <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-primary text-white shadow-lift">
                <Icon name={ICONS[i] ?? "check"} className="h-6 w-6" />
                <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-accent text-xs font-extrabold text-ink">
                  {i + 1}
                </span>
              </span>
              <h3 className="text-lg font-bold text-ink">{step.title}</h3>
              <p className="leading-relaxed text-slate">{step.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12 flex justify-center">
          <Button href={`/${lang}/demander-un-tuteur`} size="lg">
            {t.cta}
            <Icon name="arrow" className="h-5 w-5" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
