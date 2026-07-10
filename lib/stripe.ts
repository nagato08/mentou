import "server-only";
import Stripe from "stripe";
import type { Offer } from "./registration";

const key = process.env.STRIPE_SECRET_KEY;

// Instancié paresseusement — évite de planter au build si la clé manque.
export const stripe = key ? new Stripe(key) : null;

export function priceIdFor(offer: Offer): string | undefined {
  switch (offer) {
    case "weekly":
      return process.env.STRIPE_PRICE_WEEKLY;
    case "monthly":
      return process.env.STRIPE_PRICE_MONTHLY;
    case "daily":
      return process.env.STRIPE_PRICE_DAILY;
    case "event-player":
      return process.env.STRIPE_PRICE_EVENT_PLAYER;
    case "event-spectator":
      return process.env.STRIPE_PRICE_EVENT_SPECTATOR;
  }
}
