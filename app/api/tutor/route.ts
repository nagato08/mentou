import { NextResponse } from "next/server";
import { getDb, rowToTutorApplication } from "@/lib/db";
import { sanitizeIds } from "@/lib/tutor";
import { sendTutorApplicationEmails } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = str(body.name);
    const email = str(body.email);
    const phone = str(body.phone);
    const slots = sanitizeIds(body.slots, "slots");
    const levels = sanitizeIds(body.levels, "levels");
    const subjects = sanitizeIds(body.subjects, "subjects");
    const otherSubjects = str(body.otherSubjects);
    const message = str(body.message);

    // Champs requis (les 3 groupes sont marqués obligatoires).
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Champs requis manquants" },
        { status: 400 }
      );
    }
    if (slots.length === 0 || levels.length === 0 || subjects.length === 0) {
      return NextResponse.json(
        { error: "Sélectionnez au moins une option par section." },
        { status: 400 }
      );
    }

    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const createdAt = new Date().toISOString();
    const db = await getDb();
    await db.execute({
      sql: `INSERT INTO tutor_applications
        (id, name, email, phone, slots, levels, subjects, other_subjects, message, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        id,
        name,
        email,
        phone,
        JSON.stringify(slots),
        JSON.stringify(levels),
        JSON.stringify(subjects),
        otherSubjects,
        message,
        createdAt,
      ],
    });

    const { rows } = await db.execute({
      sql: "SELECT * FROM tutor_applications WHERE id = ?",
      args: [id],
    });
    if (rows[0]) {
      await sendTutorApplicationEmails(rowToTutorApplication(rows[0]));
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("POST /api/tutor", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
