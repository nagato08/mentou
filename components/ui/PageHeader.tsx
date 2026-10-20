import Container from "@/components/layout/Container";

type PageHeaderProps = {
  kicker: string;
  title: string;
  subtitle?: string;
};

export default function PageHeader({ kicker, title, subtitle }: PageHeaderProps) {
  return (
    <section className="bg-linear-to-b from-sky to-white">
      <Container className="flex flex-col items-center gap-4 py-14 text-center md:py-18">
        <span className="eyebrow">{kicker}</span>
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-ink md:text-5xl">{title}</h1>
        {subtitle && <p className="max-w-2xl text-lg leading-relaxed text-slate">{subtitle}</p>}
      </Container>
    </section>
  );
}
