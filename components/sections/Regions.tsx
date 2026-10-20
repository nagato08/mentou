import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { COLLECTION_PATH, getContent } from "@/lib/content";
import Container from "@/components/layout/Container";
import Icon from "@/components/ui/Icon";

/** Bandeau des villes desservies + adresse du centre (accueil). */
export default function Regions({ lang }: { lang: Locale }) {
  const c = getContent(lang);
  const base = `/${lang}/${COLLECTION_PATH.regions}`;
  return (
    <section className="section bg-paper">
      <Container size="wide" className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div className="flex flex-col items-start gap-4">
          <span className="eyebrow">{c.hubs.regions.kicker}</span>
          <h2 className="text-3xl font-extrabold leading-tight text-ink md:text-4xl">{c.labels.regionsHome}</h2>
          <p className="text-lg leading-relaxed text-slate">{c.labels.regionsHomeBody}</p>
          <div className="mt-2 flex items-center gap-4 rounded-2xl border border-line bg-white p-4 shadow-card">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent-soft text-ink">
              <Icon name="pin" className="h-6 w-6" />
            </span>
            <div>
              <p className="text-sm text-slate">{c.labels.center}</p>
              <p className="font-bold text-ink">{c.labels.centerAddress}</p>
            </div>
          </div>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2" data-reveal="stagger">
          {c.regions.map((r) => (
            <li key={r.slug}>
              <Link
                href={`${base}/${r.slug}`}
                className="lift group flex items-center justify-between gap-3 rounded-2xl border border-line bg-white p-5 shadow-card hover:border-primary"
              >
                <span className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-sky text-primary">
                    <Icon name="home" className="h-5 w-5" />
                  </span>
                  <span className="text-lg font-bold text-ink">{r.label}</span>
                </span>
                <Icon name="arrow" className="h-5 w-5 text-primary transition-transform group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
          <li className="sm:col-span-2">
            <Link
              href={base}
              className="flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-sky-strong p-4 font-semibold text-primary transition-colors hover:bg-sky"
            >
              {c.labels.monteregie}
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </li>
        </ul>
      </Container>
    </section>
  );
}
