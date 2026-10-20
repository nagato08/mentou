import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon, { type IconName } from "@/components/ui/Icon";

const ICONS: IconName[] = ["users", "spark", "chat", "graduation", "laptop", "shield"];

export default function WhyUs({ dict }: { dict: Dictionary }) {
  const t = dict.home.why;
  return (
    <section className="section">
      <Container size="wide" className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="relative hidden aspect-[4/5] overflow-hidden rounded-3xl shadow-card lg:block">
          <Image
            src="/images/junior.jpg"
            alt=""
            fill
            sizes="40vw"
            className="object-cover"
          />
        </div>
        <div>
          <SectionHeading eyebrow={t.eyebrow} title={t.title} align="left" />
          <ul className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2" data-gsap="stagger">
            {t.items.map((item, i) => (
              <li key={item.title} className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-sky text-primary">
                  <Icon name={ICONS[i] ?? "check"} className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-bold text-ink">{item.title}</h3>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-slate">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
