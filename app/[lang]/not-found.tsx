import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";

// Rendu hors contexte de langue : textes en français (langue par défaut).
export default function NotFound() {
  return (
    <section className="bg-linear-to-b from-sky to-white">
      <Container size="narrow" className="flex min-h-[60vh] flex-col items-center justify-center gap-5 py-20 text-center">
        <span className="eyebrow">404</span>
        <h1 className="text-4xl font-extrabold text-ink md:text-5xl">Page introuvable</h1>
        <p className="max-w-md text-lg text-slate">
          La page que vous cherchez n&apos;existe pas ou a été déplacée.
        </p>
        <Button href="/fr" size="lg">
          Retour à l&apos;accueil
        </Button>
      </Container>
    </section>
  );
}
