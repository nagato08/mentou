// Type partagé (client + serveur) — aucune dépendance serveur ici.

export type Offer = "weekly" | "monthly" | "daily" | "event-player" | "event-spectator";

export type OfferCategory = "program" | "event";

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

export const ALL_OFFERS: Offer[] = [
  "weekly",
  "monthly",
  "daily",
  "event-player",
  "event-spectator",
];

export const OFFER_LABELS: Record<Offer, string> = {
  weekly: "150 $ / semaine",
  monthly: "500 $ / mois",
  daily: "75 $ / jour",
  "event-player": "Tournoi — Joueur (90 $)",
  "event-spectator": "Tournoi — Spectateur (55 $)",
};

// Montant unique en cents (CAD) pour les paiements ponctuels (events).
export const EVENT_AMOUNTS: Record<"event-player" | "event-spectator", number> = {
  "event-player": 9000,
  "event-spectator": 5500,
};

export const EVENT_PRODUCT_NAMES: Record<
  "event-player" | "event-spectator",
  string
> = {
  "event-player": "Tournoi des Nations Africaines — Inscription joueur",
  "event-spectator": "Tournoi des Nations Africaines — Billet spectateur",
};

export function isOffer(v: unknown): v is Offer {
  return ALL_OFFERS.includes(v as Offer);
}

export function offerCategory(offer: Offer): OfferCategory {
  return offer === "event-player" || offer === "event-spectator"
    ? "event"
    : "program";
}

export function isEventOffer(
  offer: Offer
): offer is "event-player" | "event-spectator" {
  return offerCategory(offer) === "event";
}
