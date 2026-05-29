import { type ReactNode } from "react";
import Container from "@/components/layout/Container";
import GoldLine from "./GoldLine";

type PageHeroProps = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
};

export default function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <section className="relative border-b border-bone/10 bg-night/40 pt-24 md:pt-32">
      <Container size="default" className="section-y flex flex-col gap-6">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className="font-display text-5xl leading-[1.05] text-bone md:text-6xl lg:text-7xl">
          {title}
        </h1>
        <GoldLine width={80} />
        {subtitle && (
          <p className="max-w-2xl text-lg text-bone/70 md:text-xl">{subtitle}</p>
        )}
      </Container>
    </section>
  );
}
