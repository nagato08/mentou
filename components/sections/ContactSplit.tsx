import Container from "@/components/layout/Container";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import type { Dictionary } from "@/lib/i18n";

type Props = { dict: Dictionary };

export default function ContactSplit({ dict }: Props) {
  const c = dict.contact;

  return (
    <section className="relative section-y border-b border-bone/10 bg-ink">
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-20">
          <ContactForm dict={c.form} />
          <div className="lg:border-l lg:border-bone/10 lg:pl-12 xl:pl-20">
            <ContactInfo
              eyebrow={c.info.eyebrow}
              title={c.info.title}
              items={c.info.items}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
