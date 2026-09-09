import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-guard";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    const b = await req.json();
    const data: Record<string, unknown> = {};

    for (const f of ["name", "description", "contents", "note", "imageUrl"] as const) {
      if (f in b) data[f] = b[f]?.trim() || null;
    }
    if (typeof b.isActive === "boolean") data.isActive = b.isActive;
    if (typeof b.sortOrder === "number") data.sortOrder = b.sortOrder;

    if (data.isActive === true) {
      const active = await prisma.variant.count({ where: { productId: id, isActive: true } });
      if (active === 0) {
        return NextResponse.json(
          { error: "Add at least one active brand before publishing" },
          { status: 400 }
        );
      }
    }

    await prisma.product.update({ where: { id }, data });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("product PATCH failed:", e);
    return NextResponse.json({ error: "Save failed" }, { status: 500 });
  }
}