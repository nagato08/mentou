import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { stripe, priceIdFor } from "@/lib/stripe";
import { isOffer, type RegistrationInput } from "@/lib/registration";
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
      return NextResponse.json({ error: "Offre invalide" }, { status: 400 });
    }

    const priceId = priceIdFor(offer);
    if (!priceId) {
      return NextResponse.json(
        { error: "Tarif non configuré" },
        { status: 503 }
      );
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
      availability: str(body.availability),
      expectations: str(body.expectations),
      suggestions: str(body.suggestions),
    };

    // Champs requis minimaux
    const required = [
      input.parentName,
      input.parentEmail,
      input.parentPhone,
      input.childName,
      input.childAge,
      input.address,
      input.city,
      input.postalCode,
      input.province,
    ];
    if (required.some((v) => !v)) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const db = await getDb();
    await db.execute({
      sql: `INSERT INTO registrations
        (id, parent_name, parent_email, parent_phone, child_name, child_age, child_school,
         address, city, postal_code, province, offer, availability, expectations, suggestions,
         status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?)`,
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
        input.availability,
        input.expectations,
        input.suggestions,
        new Date().toISOString(),
      ],
    });

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: input.parentEmail,
      client_reference_id: id,
      metadata: { registrationId: id },
      success_url: `${SITE_URL}/fr/inscription/merci?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/fr/inscription?offre=${offer}&annule=1`,
    });

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
