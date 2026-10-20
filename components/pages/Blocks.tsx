import Image from "next/image";
import type { Block, SiteContent } from "@/content/types";
import Container from "@/components/layout/Container";
import Icon from "@/components/ui/Icon";
import { buttonClass } from "@/components/ui/Button";
import OpeningHours from "@/components/ui/OpeningHours";

type Labels = SiteContent["labels"];

const MAP_QUERY = "Groupe Mentou, 1765 boulevard Taschereau, Longueuil, QC J4K 5A2";

function Heading({ title, intro, center = false }: { title: string; intro?: string; center?: boolean }) {
  return (
    <div data-reveal="up" className={`flex max-w-2xl flex-col gap-3 ${center ? "mx-auto text-center" : ""}`}>
      <h2 className="text-3xl font-extrabold leading-tight text-ink md:text-4xl">{title}</h2>
      {intro && <p className="text-lg leading-relaxed text-slate">{intro}</p>}
    </div>
  );
}

function Steps({ block }: { block: Extract<Block, { type: "steps" }> }) {
  return (
    <Container size="wide" className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
      <div className="lg:sticky lg:top-32 lg:self-start">
        <Heading title={block.title} intro={block.intro} />
      </div>
      <ol className="relative flex flex-col gap-8 border-l-2 border-sky-strong pl-8" data-reveal="stagger">
        {block.steps.map((s, i) => (
          <li key={s.title} className="relative">
            <span className="absolute -left-[3.05rem] top-0 grid h-9 w-9 place-items-center rounded-full bg-primary text-sm font-extrabold text-white ring-4 ring-white">
              {i + 1}
            </span>
            <h3 className="text-xl font-bold text-ink">{s.title}</h3>
            <p className="mt-1.5 max-w-xl leading-relaxed text-slate">{s.body}</p>
          </li>
        ))}
      </ol>
    </Container>
  );
}

function Compare({ block }: { block: Extract<Block, { type: "compare" }> }) {
  return (
    <Container>
      <Heading title={block.title} intro={block.intro} center />
      <div className="mt-12 grid gap-6 md:grid-cols-2" data-reveal="stagger">
        {block.columns.map((col) => (
          <article
            key={col.title}
            className={`flex flex-col gap-5 rounded-3xl p-8 ${
              col.featured ? "bg-primary text-white shadow-lift" : "border border-line bg-white shadow-card"
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <span
                className={`grid h-14 w-14 place-items-center rounded-2xl ${
                  col.featured ? "bg-white/15 text-white" : "bg-sky text-primary"
                }`}
              >
                <Icon name={col.icon} className="h-7 w-7" />
              </span>
              {col.tag && (
                <span
                  className={`rounded-full px-3 py-1 text-sm font-bold ${
                    col.featured ? "bg-accent text-ink" : "bg-accent-soft text-ink"
                  }`}
                >
                  {col.tag}
                </span>
              )}
            </div>
            <h3 className={`text-2xl font-extrabold ${col.featured ? "text-white" : "text-ink"}`}>{col.title}</h3>
            <ul className="flex flex-col gap-3">
              {col.items.map((item) => (
                <li key={item} className={`flex items-start gap-3 ${col.featured ? "text-white/90" : "text-ink"}`}>
                  <Icon
                    name="check"
                    strokeWidth={2.5}
                    className={`mt-0.5 h-5 w-5 shrink-0 ${col.featured ? "text-accent" : "text-success"}`}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Container>
  );
}

const TILE_TONES = ["bg-sky", "bg-accent-soft", "bg-white border border-line", "bg-paper border border-line"];

function Features({ block }: { block: Extract<Block, { type: "features" }> }) {
  return (
    <Container size="wide">
      <Heading title={block.title} intro={block.intro} />
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2" data-reveal="stagger">
        <div className="relative min-h-64 overflow-hidden rounded-3xl md:col-span-2 lg:row-span-2">
          <Image src={block.image} alt={block.imageAlt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>
        {block.items.map((item, i) => (
          <div key={item.title} className={`flex flex-col gap-3 rounded-3xl p-6 ${TILE_TONES[i % TILE_TONES.length]}`}>
            <Icon name={item.icon} className="h-7 w-7 text-primary" />
            <h3 className="text-lg font-bold text-ink">{item.title}</h3>
            <p className="text-[0.9375rem] leading-relaxed text-slate">{item.body}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}

function Statement({ block }: { block: Extract<Block, { type: "statement" }> }) {
  return (
    <div className="bg-sky">
      <Container size="narrow" className="flex flex-col gap-5 py-16 md:py-20" data-reveal="up">
        <p className="text-3xl font-extrabold leading-snug text-ink md:text-[2.6rem]">{block.text}</p>
        {block.body && <p className="max-w-2xl text-lg leading-relaxed text-slate">{block.body}</p>}
      </Container>
    </div>
  );
}

function Checklist({ block }: { block: Extract<Block, { type: "checklist" }> }) {
  const warn = block.tone === "warn";
  return (
    <Container size="narrow">
      <Heading title={block.title} intro={block.intro} />
      <ul className="mt-8 flex flex-col gap-3" data-reveal="stagger">
        {block.items.map((item) => (
          <li
            key={item}
            className={`flex items-start gap-4 rounded-2xl px-5 py-4 text-lg text-ink ${
              warn ? "border border-accent/40 bg-accent-soft" : "border border-line bg-white"
            }`}
          >
            <Icon
              name={warn ? "alert" : "check"}
              strokeWidth={2.5}
              className={`mt-1 h-5 w-5 shrink-0 ${warn ? "text-ink" : "text-success"}`}
            />
            {item}
          </li>
        ))}
      </ul>
    </Container>
  );
}

function Price({ block, labels }: { block: Extract<Block, { type: "price" }>; labels: Labels }) {
  return (
    <Container>
      <div className="grid overflow-hidden rounded-3xl border border-line bg-white shadow-card lg:grid-cols-[1.2fr_1fr]" data-reveal="zoom">
        <div className="flex flex-col gap-6 p-8 md:p-10">
          <Heading title={block.title} intro={block.body} />
          <ul className="grid gap-4 sm:grid-cols-2">
            {block.offers.map((o) => (
              <li key={o.label} className="rounded-2xl bg-paper p-5">
                <p className="text-sm font-semibold text-slate">{o.label}</p>
                <p className="mt-1 text-4xl font-extrabold tracking-tight text-ink tabular-nums">{o.value}</p>
                <p className="mt-1 text-sm text-slate">{o.detail}</p>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted">{block.note}</p>
        </div>
        {block.examples && (
          <div className="flex flex-col justify-center gap-4 bg-accent-soft p-8 md:p-10">
            <p className="font-bold text-ink">{labels.examples}</p>
            <dl className="flex flex-col gap-3">
              {block.examples.map((e) => (
                <div key={e.label} className="flex items-baseline justify-between gap-4 rounded-xl bg-white/70 px-4 py-3">
                  <dt className="text-slate">{e.label}</dt>
                  <dd className="text-xl font-extrabold text-ink tabular-nums">{e.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </Container>
  );
}

function Levels({ block }: { block: Extract<Block, { type: "levels" }> }) {
  return (
    <Container size="wide">
      <Heading title={block.title} intro={block.intro} />
      <div className="mt-10 grid gap-6 lg:grid-cols-2" data-reveal="stagger">
        {block.groups.map((g, i) => (
          <div key={g.title} className={`rounded-3xl p-7 ${i === 0 ? "bg-sky" : "border border-line bg-white"}`}>
            <h3 className="flex items-center gap-2.5 text-xl font-extrabold text-ink">
              <Icon name={i === 0 ? "school" : "graduation"} className="h-6 w-6 text-primary" />
              {g.title}
            </h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {g.items.map((item) => (
                <li key={item} className="rounded-full border border-line bg-white px-4 py-2 text-[0.9375rem] font-medium text-ink">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Container>
  );
}

function Chips({ block }: { block: Extract<Block, { type: "chips" }> }) {
  return (
    <Container className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
      <div className="max-w-md" data-reveal="up">
        <h2 className="text-2xl font-extrabold text-ink md:text-3xl">{block.title}</h2>
        {block.body && <p className="mt-2 leading-relaxed text-slate">{block.body}</p>}
      </div>
      <ul className="flex max-w-xl flex-wrap gap-2.5 md:justify-end" data-reveal="stagger">
        {block.chips.map((c) => (
          <li key={c} className="flex items-center gap-2 rounded-full bg-paper px-4 py-2.5 font-semibold text-ink">
            <Icon name="pin" className="h-4 w-4 text-primary" />
            {c}
          </li>
        ))}
      </ul>
    </Container>
  );
}

function MapBlock({ block, labels }: { block: Extract<Block, { type: "map" }>; labels: Labels }) {
  const q = encodeURIComponent(MAP_QUERY);
  return (
    <Container size="wide" className="grid items-stretch gap-6 lg:grid-cols-[1fr_1.3fr]">
      <div className="flex flex-col justify-center gap-5 rounded-3xl bg-navy p-8 text-white md:p-10" data-reveal="left">
        <Icon name="pin" className="h-8 w-8 text-accent" />
        <h2 className="text-3xl font-extrabold leading-tight">{block.title}</h2>
        <p className="text-lg font-bold text-accent">{labels.centerAddress}</p>
        <p className="leading-relaxed text-white/80">{block.body}</p>
        <div className="rounded-2xl bg-white/10 p-4">
          <OpeningHours labels={labels} tone="dark" />
        </div>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${q}`}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass("light", "md", "self-start")}
        >
          {labels.directions}
          <Icon name="arrow" className="h-4 w-4" />
        </a>
      </div>
      <div className="relative min-h-80 overflow-hidden rounded-3xl border border-line bg-paper" data-reveal="right">
        <iframe
          title={labels.mapTitle}
          src={`https://www.google.com/maps?q=${q}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    </Container>
  );
}

function Nearby({ block }: { block: Extract<Block, { type: "nearby" }> }) {
  return (
    <Container>
      <Heading title={block.title} intro={block.intro} />
      <ul className="mt-8 grid gap-4 sm:grid-cols-2" data-reveal="stagger">
        {block.places.map((p) => (
          <li key={p.name} className="flex gap-4 border-t-2 border-primary pt-4">
            <Icon name="school" className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
            <div>
              <h3 className="font-bold text-ink">{p.name}</h3>
              <p className="mt-1 leading-relaxed text-slate">{p.note}</p>
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
}

function Fit({ block }: { block: Extract<Block, { type: "fit" }> }) {
  const col = (title: string, items: string[], ok: boolean) => (
    <div className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-6 md:p-7">
      <h3 className={`text-lg font-extrabold ${ok ? "text-success" : "text-danger"}`}>{title}</h3>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-ink">
            <Icon
              name={ok ? "check" : "close"}
              strokeWidth={2.5}
              className={`mt-1 h-4 w-4 shrink-0 ${ok ? "text-success" : "text-danger"}`}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <div className="bg-sky">
      <Container className="py-14 md:py-20">
        <h2 className="text-center text-3xl font-extrabold text-ink md:text-4xl" data-reveal="up">{block.title}</h2>
        <div className="mx-auto mt-10 grid max-w-4xl items-start gap-4 md:grid-cols-2" data-reveal="stagger">
          {col(block.yesTitle, block.yes, true)}
          {col(block.noTitle, block.no, false)}
        </div>
      </Container>
    </div>
  );
}

function Text({ block }: { block: Extract<Block, { type: "text" }> }) {
  return (
    <Container size="narrow" data-reveal="up">
      <h2 className="text-2xl font-extrabold text-ink md:text-3xl">{block.title}</h2>
      <p className="mt-4 text-lg leading-relaxed text-slate">{block.body}</p>
    </Container>
  );
}

function renderBlock(block: Block, labels: Labels) {
  switch (block.type) {
    case "steps":
      return <Steps block={block} />;
    case "compare":
      return <Compare block={block} />;
    case "features":
      return <Features block={block} />;
    case "statement":
      return <Statement block={block} />;
    case "checklist":
      return <Checklist block={block} />;
    case "price":
      return <Price block={block} labels={labels} />;
    case "levels":
      return <Levels block={block} />;
    case "chips":
      return <Chips block={block} />;
    case "map":
      return <MapBlock block={block} labels={labels} />;
    case "nearby":
      return <Nearby block={block} />;
    case "fit":
      return <Fit block={block} />;
    case "text":
      return <Text block={block} />;
  }
}

/** Rend la suite de blocs d'une page, chacun dans sa propre section. */
export default function Blocks({ blocks, labels }: { blocks: Block[]; labels: Labels }) {
  return (
    <>
      {blocks.map((block, i) =>
        block.type === "statement" || block.type === "fit" ? (
          <section key={i}>{renderBlock(block, labels)}</section>
        ) : (
          <section key={i} className="py-12 md:py-16">
            {renderBlock(block, labels)}
          </section>
        )
      )}
    </>
  );
}
