import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-guard";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    const { isRead } = await req.json();
    await prisma.contactMessage.update({ where: { id }, data: { isRead: !!isRead } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("message PATCH failed:", e);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}