import { NextResponse } from "next/server";
import { getDb, dbRowToComment } from "@/lib/db";

export const runtime = "nodejs";

export function GET() {
  try {
    const db = getDb();
    const rows = db
      .prepare(
        "SELECT * FROM comments WHERE approved = 1 ORDER BY created_at DESC LIMIT 10"
      )
      .all() as Record<string, unknown>[];
    return NextResponse.json(rows.map(dbRowToComment));
  } catch (err) {
    console.error("GET /api/comments", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, message, rating } = await req.json();

    if (
      typeof name !== "string" ||
      typeof message !== "string" ||
      typeof rating !== "number" ||
      !name.trim() ||
      !message.trim() ||
      rating < 1 ||
      rating > 5
    ) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const db = getDb();
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    db.prepare(
      "INSERT INTO comments (id, name, message, rating, approved, created_at) VALUES (?, ?, ?, ?, 1, ?)"
    ).run(id, name.trim(), message.trim(), rating, new Date().toISOString());

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("POST /api/comments", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
