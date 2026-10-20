import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon, { type IconName } from "@/components/ui/Icon";

type Pillar = {
  title: string;
  body: string;
  items: string[];
  imageAlt: string;
};

function PillarCard({
  pillar,
  image,
  icon,
  tone,
}: {
  pillar: Pillar;
  image: string;
  icon: IconName;
  tone: "primary" | "accent";
}) {
  const badge = tone === "primary" ? "bg-primary text-white" : "bg-accent text-ink";
  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card">
      <div className="relative aspect-[16/9]">
        <Image src={image} alt={pillar.imageAlt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-7 md:p-8">
        <span className={`relative z-10 -mt-14 grid h-14 w-14 place-items-center rounded-2xl ring-4 ring-white ${badge}`}>
          <Icon name={icon} className="h-7 w-7" />
        </span>
        <h3 className="text-2xl font-extrabold text-ink">{pillar.title}</h3>
        <p className="leading-relaxed text-slate">{pillar.body}</p>
        <ul className="mt-1 flex flex-col gap-3">
          {pillar.items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-ink">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-sky text-primary">
                <Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function Services({ dict }: { dict: Dictionary }) {
  const t = dict.home.services;
  const f = dict.home.formats;
  return (
    <section id="services" className="section bg-paper">
      <Container>
        <SectionHeading eyebrow={t.eyebrow} title={t.title} intro={t.intro} />
        <div className="mt-14 grid gap-8 md:grid-cols-2" data-gsap="stagger">
          <PillarCard pillar={t.tutoring} image="/images/tutorat.jpeg" icon="book" tone="primary" />
          <PillarCard pillar={t.growth} image="/images/mentorat.jpeg" icon="spark" tone="accent" />
        </div>

        <div className="mt-16">
          <SectionHeading eyebrow={f.eyebrow} title={f.title} />
          <ul className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
            {f.items.map((item, i) => (
              <li key={item.title} className="flex gap-5 rounded-2xl border border-line bg-white p-6">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-sky text-primary">
                  <Icon name={i === 0 ? "home" : "laptop"} className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-ink">{item.title}</h3>
                  <p className="mt-1 leading-relaxed text-slate">{item.body}</p>
                  <p className="mt-3 inline-flex rounded-full bg-accent-soft px-3 py-1 text-sm font-bold text-ink">
                    {item.price}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
