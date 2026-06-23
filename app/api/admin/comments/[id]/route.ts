import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getDb } from "@/lib/db";

export const runtime = "nodejs";

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session")?.value === process.env.ADMIN_SECRET;
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    const { approved } = await req.json();
    const db = getDb();
    db.prepare("UPDATE comments SET approved = ? WHERE id = ?").run(
      approved ? 1 : 0,
      id
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("PATCH /api/admin/comments/[id]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    const db = getDb();
    db.prepare("DELETE FROM comments WHERE id = ?").run(id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("DELETE /api/admin/comments/[id]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
