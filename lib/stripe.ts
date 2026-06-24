import "server-only";
import Stripe from "stripe";
import type { Offer } from "./registration";

const key = process.env.STRIPE_SECRET_KEY;

// Instancié paresseusement — évite de planter au build si la clé manque.
export const stripe = key ? new Stripe(key) : null;

export function priceIdFor(offer: Offer): string | undefined {
  return offer === "weekly"
    ? process.env.STRIPE_PRICE_WEEKLY
    : process.env.STRIPE_PRICE_MONTHLY;
}
