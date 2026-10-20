import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getDb } from "@/lib/db";
import { stripe, MONTHLY_PRICE_ID, taxRates } from "@/lib/stripe";
import {
  isOffer,
  isHourlyOffer,
  parseHours,
  requiresAddress,
  HOURLY_RATES,
  HOURLY_PRODUCT_NAMES,
  type RegistrationInput,
} from "@/lib/registration";
import { isLevel, sanitizeSubjects } from "@/lib/tutor";
import { hasLocale } from "@/lib/i18n-config";
import { SITE_URL } from "@/lib/seo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

export async function POST(req: Request) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: "Paiement non configuré" },
        { status: 503 }
      );
    }

    const body = await req.json();
    const offer = body.offer;
    if (!isOffer(offer)) {
      return NextResponse.json({ error: "Formule invalide" }, { status: 400 });
    }

    const lang = typeof body.lang === "string" && hasLocale(body.lang) ? body.lang : "fr";
    const hourly = isHourlyOffer(offer);
    const hours = hourly ? parseHours(body.hours) : null;
    if (hourly && hours === null) {
      return NextResponse.json({ error: "Nombre d'heures invalide" }, { status: 400 });
    }

    const input: RegistrationInput = {
      parentName: str(body.parentName),
      parentEmail: str(body.parentEmail),
      parentPhone: str(body.parentPhone),
      childName: str(body.childName),
      childAge: str(body.childAge),
      childSchool: str(body.childSchool),
      address: str(body.address),
      city: str(body.city),
      postalCode: str(body.postalCode),
      province: str(body.province),
      offer,
      hours,
      availability: str(body.availability),
      expectations: str(body.expectations),
      suggestions: "",
      studentLevel: isLevel(body.studentLevel) ? body.studentLevel : "",
      subjects: sanitizeSubjects(body.subjects),
      otherSubject: str(body.otherSubject),
    };

    const required = [
      input.parentName,
      input.parentEmail,
      input.parentPhone,
      input.childName,
      ...(requiresAddress(offer)
        ? [input.address, input.city, input.postalCode, input.province]
        : []),
    ];
    if (required.some((v) => !v)) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    if (!hourly && !MONTHLY_PRICE_ID) {
      return NextResponse.json({ error: "Tarif non configuré" }, { status: 503 });
    }

    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const db = await getDb();
    await db.execute({
      sql: `INSERT INTO registrations
        (id, parent_name, parent_email, parent_phone, child_name, child_age, child_school,
         address, city, postal_code, province, offer, hours, availability, expectations, suggestions,
         student_level, subjects, other_subject, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?)`,
      args: [
        id,
        input.parentName,
        input.parentEmail,
        input.parentPhone,
        input.childName,
        input.childAge,
        input.childSchool,
        input.address,
        input.city,
        input.postalCode,
        input.province,
        input.offer,
        input.hours,
        input.availability,
        input.expectations,
        input.suggestions,
        input.studentLevel,
        JSON.stringify(input.subjects),
        input.otherSubject,
        new Date().toISOString(),
      ],
    });

    const rates = taxRates();
    const tax = rates.length ? { tax_rates: rates } : {};

    const common = {
      customer_email: input.parentEmail,
      client_reference_id: id,
      metadata: { registrationId: id },
      locale: lang === "en" ? ("en" as const) : ("fr-CA" as const),
      success_url: `${SITE_URL}/${lang}/inscription/merci?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/${lang}/demander-un-tuteur?offre=${offer}&annule=1`,
    };

    const sessionParams: Stripe.Checkout.SessionCreateParams = hourly
      ? {
          ...common,
          mode: "payment",
          line_items: [
            {
              price_data: {
                currency: "cad",
                unit_amount: HOURLY_RATES[offer],
                product_data: { name: HOURLY_PRODUCT_NAMES[offer] },
              },
              quantity: hours as number,
              ...tax,
            },
          ],
        }
      : {
          ...common,
          mode: "subscription",
          line_items: [{ price: MONTHLY_PRICE_ID as string, quantity: 1, ...tax }],
        };

    const session = await stripe.checkout.sessions.create(sessionParams);

    await db.execute({
      sql: "UPDATE registrations SET stripe_session_id = ? WHERE id = ?",
      args: [session.id, id],
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("POST /api/checkout", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
