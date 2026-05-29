import Link from "next/link";
import Container from "@/components/layout/Container";
import GoldLine from "@/components/ui/GoldLine";

export default function NotFound() {
  return (
    <Container size="default" className="section-y pt-32 md:pt-40 flex flex-col items-center gap-8 text-center">
      <span className="eyebrow">404</span>
      <h1 className="font-display text-6xl text-bone md:text-7xl">
        Page introuvable
      </h1>
      <GoldLine />
      <p className="max-w-md text-bone/60">
        La page que vous cherchez n&apos;existe pas ou a été déplacée.
      </p>
      <Link
        href="/fr"
        className="inline-flex items-center border border-gold px-7 py-3.5 text-xs uppercase tracking-[0.25em] text-gold hover:bg-gold hover:text-ink transition-colors"
      >
        Retour à l&apos;accueil
      </Link>
    </Container>
  );
}
