"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
type Item = {
  src: string;
  alt: string;
  category: string;
  span: string;
};

type Props = {
  eyebrow: string;
  title: string;
  filters: Record<string, string>;
  items: readonly Item[];
};

const SPAN_CLASSES: Record<string, string> = {
  wide: "col-span-4 row-span-3 md:col-span-8 md:row-span-4",
  tall: "col-span-2 row-span-4 md:col-span-4 md:row-span-5",
  small: "col-span-2 row-span-3 md:col-span-4 md:row-span-4",
};

export default function GalleryGrid({ eyebrow, title, filters, items }: Props) {
  const [active, setActive] = useState<string>("all");

  const filterKeys = useMemo(() => Object.keys(filters), [filters]);

  const visible = useMemo(
    () => (active === "all" ? items : items.filter((i) => i.category === active)),
    [items, active]
  );

  return (
    <section className="relative section-y border-b border-bone/10 bg-ink overflow-hidden">
      <div className="mx-auto w-full max-w-[1600px] px-3 md:px-6 lg:px-8">
        {/* Header */}
        <div className="grid grid-cols-12 gap-8 mb-10 md:mb-14 items-end" data-gsap="fade-up">
          <div className="col-span-12 md:col-span-4">
            <div className="flex items-center gap-3">
              <span className="block h-px w-8 bg-gold" />
              <span className="eyebrow">{eyebrow}</span>
            </div>
          </div>
          <h2 className="col-span-12 md:col-span-8 font-display text-3xl md:text-5xl lg:text-6xl leading-[1.1] text-bone">
            {title}
          </h2>
        </div>

        {/* Filters */}
        <div
          role="tablist"
          aria-label="Filtres galerie"
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-14"
        >
          {filterKeys.map((key) => {
            const isActive = active === key;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(key)}
                className={`min-h-11 px-5 py-2.5 text-[0.65rem] uppercase tracking-[0.3em] border transition-colors duration-300 cursor-pointer ${
                  isActive
                    ? "border-gold bg-gold text-ink"
                    : "border-bone/20 text-bone/70 hover:border-gold hover:text-gold"
                }`}
              >
                {filters[key]}
              </button>
            );
          })}
        </div>

        {/* Asymmetric grid */}
        <div
          className="grid grid-cols-4 md:grid-cols-12 gap-3 md:gap-4 auto-rows-[60px] md:auto-rows-[70px]"
        >
          {visible.map((item, i) => (
            <figure
              key={item.src}
              className={`group relative overflow-hidden bg-night/40 ${SPAN_CLASSES[item.span]}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                loading={i < 4 ? undefined : "lazy"}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-ink/10 group-hover:bg-ink/0 transition-colors duration-500" />
              <figcaption className="absolute inset-x-0 bottom-0 p-4 md:p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 bg-linear-to-t from-ink/90 to-transparent pt-12">
                <span className="block text-[0.6rem] uppercase tracking-[0.35em] text-gold">
                  {filters[item.category] ?? item.category}
                </span>
                <span className="mt-1 block font-display text-base md:text-lg text-bone">
                  {item.alt}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Empty state */}
        {visible.length === 0 && (
          <p className="mt-12 text-center text-bone/50 font-display text-xl">
            Aucune image dans cette catégorie pour le moment.
          </p>
        )}
      </div>
    </section>
  );
}
