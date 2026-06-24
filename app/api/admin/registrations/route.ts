import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getDb, rowToRegistration } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session")?.value === process.env.ADMIN_SECRET;
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const db = await getDb();
    const { rows } = await db.execute(
      "SELECT * FROM registrations ORDER BY created_at DESC"
    );
    return NextResponse.json(rows.map(rowToRegistration));
  } catch (err) {
    console.error("GET /api/admin/registrations", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
