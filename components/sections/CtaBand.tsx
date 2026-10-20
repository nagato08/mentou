import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/contact";

type CtaBandProps = {
  title: string;
  body: string;
  primaryLabel: string;
  primaryHref: string;
  phoneLabel?: string;
};

export default function CtaBand({ title, body, primaryLabel, primaryHref, phoneLabel }: CtaBandProps) {
  return (
    <section className="section">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-14 text-center text-white md:px-16" data-reveal="up">
          <div aria-hidden className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10" />
          <div aria-hidden className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-accent/25" />
          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-5">
            <h2 className="text-3xl font-extrabold leading-tight md:text-4xl">{title}</h2>
            <p className="text-lg text-white/85">{body}</p>
            <div className="mt-2 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
              <Button href={primaryHref} variant="light" size="lg">
                {primaryLabel}
                <Icon name="arrow" className="h-5 w-5" />
              </Button>
              <a
                href={PHONE_TEL}
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-white/40 px-7 font-semibold text-white transition-colors hover:bg-white/10"
              >
                <Icon name="phone" className="h-5 w-5" />
                {phoneLabel ? `${phoneLabel} · ` : ""}
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
