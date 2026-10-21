import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getDb } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session")?.value === process.env.ADMIN_SECRET;
}

/** Supprime une inscription au paiement non finalisé. Les inscriptions de clients (payées, refusées, résiliées) sont conservées. */
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    const db = await getDb();
    const result = await db.execute({
      sql: "DELETE FROM registrations WHERE id = ? AND status = 'pending'",
      args: [id],
    });
    if (result.rowsAffected === 0) {
      return NextResponse.json({ error: "Introuvable ou déjà payée" }, { status: 409 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("DELETE /api/admin/registrations/[id]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
