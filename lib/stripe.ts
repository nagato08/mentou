import "server-only";
import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY;

// Instancié paresseusement — évite de planter au build si la clé manque.
export const stripe = key ? new Stripe(key) : null;

/** Prix Stripe récurrent du forfait mensuel (500 $ / mois). */
export const MONTHLY_PRICE_ID = process.env.STRIPE_PRICE_MONTHLY;

/** Taux de taxe fixes (TPS + TVQ) — IDs Stripe txr_..., ex. STRIPE_TAX_RATES="txr_gst,txr_qst". */
export function taxRates(): string[] {
  return (process.env.STRIPE_TAX_RATES ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}
