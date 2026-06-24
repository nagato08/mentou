import { NextResponse } from "next/server";
import { getDb, rowToComment } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = await getDb();
    const { rows } = await db.execute(
      "SELECT * FROM comments WHERE approved = 1 ORDER BY created_at DESC LIMIT 10"
    );
    return NextResponse.json(rows.map(rowToComment));
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

    const db = await getDb();
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    await db.execute({
      sql: "INSERT INTO comments (id, name, message, rating, approved, created_at) VALUES (?, ?, ?, ?, 1, ?)",
      args: [id, name.trim(), message.trim(), rating, new Date().toISOString()],
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("POST /api/comments", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
