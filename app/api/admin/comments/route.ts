import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getDb, dbRowToComment } from "@/lib/db";

export const runtime = "nodejs";

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session")?.value === process.env.ADMIN_SECRET;
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const db = getDb();
    const rows = db
      .prepare("SELECT * FROM comments ORDER BY created_at DESC")
      .all() as Record<string, unknown>[];
    return NextResponse.json(rows.map(dbRowToComment));
  } catch (err) {
    console.error("GET /api/admin/comments", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
