import type { Dictionary, Locale } from "@/lib/i18n";
import CtaBand from "./CtaBand";

export default function FinalCta({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.home.finalCta;
  return (
    <CtaBand
      title={t.title}
      body={t.body}
      primaryLabel={t.primary}
      primaryHref={`/${lang}/demander-un-tuteur`}
      phoneLabel={t.secondary}
    />
  );
}
