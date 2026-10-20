import type { Dictionary } from "@/lib/i18n";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon, { type IconName } from "@/components/ui/Icon";

const ICONS: IconName[] = ["trendDown", "battery", "heart"];

export default function Signs({ dict }: { dict: Dictionary }) {
  const t = dict.home.signs;
  return (
    <section className="section">
      <Container>
        <SectionHeading eyebrow={t.eyebrow} title={t.title} />
        <ul className="mt-12 grid gap-6 md:grid-cols-3" data-reveal="stagger">
          {t.items.map((item, i) => (
            <li key={item.title} className="rounded-2xl border border-line bg-white p-7 shadow-card">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-sky text-primary">
                <Icon name={ICONS[i] ?? "target"} className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-xl font-bold text-ink">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-slate">{item.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
