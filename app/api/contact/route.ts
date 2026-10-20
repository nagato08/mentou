import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Champ piège anti-robot : rempli = robot, on ignore silencieusement.
    if (str(body.website, 200)) {
      return NextResponse.json({ ok: true });
    }

    const message = {
      name: str(body.name, 120),
      email: str(body.email, 200),
      phone: str(body.phone, 40),
      message: str(body.message, 5000),
    };

    if (!message.name || !EMAIL_RE.test(message.email) || !message.message) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    const sent = await sendContactEmail(message);
    if (!sent) {
      return NextResponse.json({ error: "Envoi impossible" }, { status: 503 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("POST /api/contact", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
