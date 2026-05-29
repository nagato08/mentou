"use client";

import { useState } from "react";
import Container from "@/components/layout/Container";

type FaqItem = { q: string; a: string };

type Props = {
  eyebrow: string;
  title: string;
  items: FaqItem[];
};

export default function AdmissionFaq({ eyebrow, title, items }: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="relative section-y border-b border-bone/10 bg-ink overflow-hidden">
      <Container size="wide">
        <div className="grid grid-cols-12 gap-8 mb-12 md:mb-20 items-end" data-gsap="fade-up">
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

        <ul className="flex flex-col" data-gsap="stagger">
          {items.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <li key={i} className="border-t border-bone/10 last:border-b">
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="group w-full flex items-start justify-between gap-6 py-6 md:py-8 text-left hover:text-gold transition-colors duration-300"
                >
                  <span className="flex items-baseline gap-4 md:gap-6">
                    <span className="font-mono text-xs text-gold/70 tabular-nums shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-xl md:text-2xl lg:text-3xl text-bone group-hover:text-gold transition-colors duration-300">
                      {item.q}
                    </span>
                  </span>
                  <span
                    className={`font-display text-3xl md:text-4xl text-gold/60 transition-transform duration-500 shrink-0 ${
                      isOpen ? "rotate-45" : "rotate-0"
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-8 md:pb-10 pl-[2.25rem] md:pl-12 pr-12 text-base md:text-lg text-bone/65 leading-relaxed max-w-3xl">
                      {item.a}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
