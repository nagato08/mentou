// Type partagé (client + serveur) — aucune dépendance serveur ici.

export type Offer = "weekly" | "monthly";

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
  availability: string;
  expectations: string;
  suggestions: string;
};

export type Registration = RegistrationInput & {
  id: string;
  status: RegistrationStatus;
  stripeSessionId: string | null;
  stripeSubscriptionId: string | null;
  createdAt: string;
};

export const OFFER_LABELS: Record<Offer, string> = {
  weekly: "150 $ / semaine",
  monthly: "500 $ / mois",
};

export function isOffer(v: unknown): v is Offer {
  return v === "weekly" || v === "monthly";
}
