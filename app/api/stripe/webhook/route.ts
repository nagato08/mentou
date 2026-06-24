import { NextResponse } from "next/server";
import { getDb, rowToRegistration } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { sendRegistrationEmails } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!stripe) {
    return NextResponse.json({ error: "Non configuré" }, { status: 503 });
  }

  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = req.headers.get("stripe-signature");
  if (!secret || !signature) {
    return NextResponse.json({ error: "Signature manquante" }, { status: 400 });
  }

  // Corps brut requis pour vérifier la signature.
  const payload = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, secret);
  } catch (err) {
    console.error("Webhook signature invalide", err);
    return NextResponse.json({ error: "Signature invalide" }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const regId =
        session.metadata?.registrationId ?? session.client_reference_id;

      if (regId) {
        const db = await getDb();
        await db.execute({
          sql: "UPDATE registrations SET status = 'paid', stripe_subscription_id = ? WHERE id = ?",
          args: [
            typeof session.subscription === "string" ? session.subscription : null,
            regId,
          ],
        });

        const { rows } = await db.execute({
          sql: "SELECT * FROM registrations WHERE id = ?",
          args: [regId],
        });
        if (rows[0]) {
          await sendRegistrationEmails(rowToRegistration(rows[0]));
        }
      }
    }

    if (event.type === "customer.subscription.deleted") {
      const sub = event.data.object;
      const db = await getDb();
      await db.execute({
        sql: "UPDATE registrations SET status = 'canceled' WHERE stripe_subscription_id = ?",
        args: [sub.id],
      });
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook handler error", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
