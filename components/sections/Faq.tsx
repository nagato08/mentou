import type { Dictionary } from "@/lib/i18n";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";

export default function Faq({ dict }: { dict: Dictionary }) {
  const t = dict.home.faq;
  return (
    <section id="faq" className="section bg-paper">
      <Container size="narrow">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} />
        <div className="mt-12 flex flex-col gap-3">
          {t.items.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-line bg-white open:shadow-card"
            >
              <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 px-6 py-4 text-left font-bold text-ink">
                {item.q}
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sky text-primary transition-transform duration-200 group-open:rotate-180">
                  <Icon name="chevronDown" className="h-4 w-4" />
                </span>
              </summary>
              <p className="px-6 pb-6 leading-relaxed text-slate">{item.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
