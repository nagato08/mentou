import { notFound, redirect } from "next/navigation";
import { hasLocale } from "@/lib/i18n";
import { isOffer } from "@/lib/registration";

// Ancienne URL d'inscription : redirige vers « Demander un tuteur ».
export default async function InscriptionPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ offre?: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { offre } = await searchParams;
  redirect(`/${lang}/demander-un-tuteur${isOffer(offre) ? `?offre=${offre}` : ""}`);
}
