// Type partagé (client + serveur) — aucune dépendance serveur ici.

/** Formules actuellement proposées sur le site. */
export type Offer = "monthly" | "inperson-hourly" | "online-hourly";

/** Anciennes offres (Groupe Mentou) encore présentes en base. */
export type LegacyOffer = "weekly" | "daily" | "event-player" | "event-spectator";

export type StoredOffer = Offer | LegacyOffer;

export type RegistrationStatus = "pending" | "paid" | "canceled";

export type RegistrationInput = {
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  childName: string;
  childAge: string;
  childSchool: string;
  address: string;
  city: string;
  postalCode: string;
  province: string;
  offer: Offer;
  hours: number | null; // offres à l'heure uniquement
  availability: string;
  expectations: string;
  suggestions: string;
  studentLevel: string; // id de niveau (voir lib/tutor)
  subjects: string[]; // ids de matières souhaitées
  otherSubject: string; // matière libre
};

export type Registration = Omit<RegistrationInput, "offer"> & {
  offer: StoredOffer;
  id: string;
  status: RegistrationStatus;
  stripeSessionId: string | null;
  stripeSubscriptionId: string | null;
  createdAt: string;
};

export const ALL_OFFERS: Offer[] = ["monthly", "inperson-hourly", "online-hourly"];

export type HourlyOffer = Exclude<Offer, "monthly">;

/** Tarif horaire en cents (CAD), hors taxes. */
export const HOURLY_RATES: Record<HourlyOffer, number> = {
  "inperson-hourly": 4500,
  "online-hourly": 3000,
};

/** Prix du forfait mensuel en cents (CAD), hors taxes — doit refléter STRIPE_PRICE_MONTHLY. */
export const MONTHLY_PRICE = 50000;

/** Heures hebdomadaires incluses dans le forfait mensuel. */
export const MONTHLY_HOURS_PER_WEEK = 12;

export const MIN_HOURS = 1;
export const MAX_HOURS = 40;

export const OFFER_LABELS: Record<StoredOffer, string> = {
  monthly: "Forfait mensuel présentiel (500 $ / mois)",
  "inperson-hourly": "Présentiel à l'heure (45 $ / h)",
  "online-hourly": "En ligne à l'heure (30 $ / h)",
  weekly: "Ancien forfait — 150 $ / semaine",
  daily: "Ancien forfait — 75 $ / jour",
  "event-player": "Ancien tournoi — Joueur",
  "event-spectator": "Ancien tournoi — Spectateur",
};

export const HOURLY_PRODUCT_NAMES: Record<HourlyOffer, string> = {
  "inperson-hourly": "Mentou Academy — Tutorat en présentiel (à l'heure)",
  "online-hourly": "Mentou Academy — Tutorat en ligne (à l'heure)",
};

export function isOffer(v: unknown): v is Offer {
  return ALL_OFFERS.includes(v as Offer);
}

export function isHourlyOffer(offer: StoredOffer): offer is HourlyOffer {
  return offer === "inperson-hourly" || offer === "online-hourly";
}

export function isLegacyOffer(offer: StoredOffer): offer is LegacyOffer {
  return !isOffer(offer);
}

/** Le présentiel exige une adresse ; le tutorat en ligne non. */
export function requiresAddress(offer: Offer): boolean {
  return offer !== "online-hourly";
}

export function parseHours(v: unknown): number | null {
  const n = typeof v === "string" ? Number(v) : v;
  if (typeof n !== "number" || !Number.isInteger(n)) return null;
  return n >= MIN_HOURS && n <= MAX_HOURS ? n : null;
}

/** Libellé complet d'une inscription (offre + heures). */
export function registrationLabel(r: Pick<Registration, "offer" | "hours">): string {
  const base = OFFER_LABELS[r.offer] ?? r.offer;
  return isHourlyOffer(r.offer) && r.hours ? `${base} × ${r.hours} h` : base;
}
