import Image from "next/image";
import { type ReactNode } from "react";
import Container from "@/components/layout/Container";

type PageHeaderProps = {
  kicker?: string;
  title: ReactNode;
  titleAccent?: string;
  subtitle?: ReactNode;
  image?: string;
  children?: ReactNode;
};

export default function PageHeader({
  kicker,
  title,
  titleAccent,
  subtitle,
  image,
  children,
}: PageHeaderProps) {
  return (
    <section className="relative min-h-[80vh] flex items-end border-b border-bone/10 overflow-hidden bg-ink">
      {image && (
        <>
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            data-gsap="parallax"
          />
          <div aria-hidden className="absolute inset-0 bg-linear-to-b from-ink/75 via-ink/55 to-ink" />
          <div aria-hidden className="absolute inset-0 bg-linear-to-r from-ink/70 via-transparent to-transparent" />
        </>
      )}
      <Container size="wide" className="relative pb-16 md:pb-20 pt-32 md:pt-40 flex flex-col gap-6" data-gsap="fade-up">
        {kicker && (
          <div className="flex items-center gap-4">
            <span className="block h-px w-10 bg-gold" />
            <span className="eyebrow">{kicker}</span>
          </div>
        )}
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] text-bone max-w-4xl" data-gsap="fade-left">
          {title}
          {titleAccent && (
            <span className="block font-italic-display text-gold/95">
              {titleAccent}
            </span>
          )}
        </h1>
        <span className="block h-px w-20 bg-gold" />
        {subtitle && (
          <p className="max-w-2xl text-lg md:text-xl text-bone/65 leading-relaxed">
            {subtitle}
          </p>
        )}
        {children}
      </Container>
    </section>
  );
}
