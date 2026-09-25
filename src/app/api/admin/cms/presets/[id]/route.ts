import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-guard";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    const b = await req.json();
    const data: Record<string, unknown> = {};

    if (typeof b.name === "string") data.name = b.name.trim();
    if ("description" in b) data.description = b.description?.trim() || null;
    if ("imageUrl" in b) data.imageUrl = b.imageUrl?.trim() || null;
    if (typeof b.sortOrder === "number") data.sortOrder = b.sortOrder;

    if (typeof b.isActive === "boolean") {
      if (b.isActive) {
        const n = await prisma.presetItem.count({ where: { presetId: id } });
        if (n === 0) {
          return NextResponse.json(
            { error: "Add at least one item before publishing" },
            { status: 400 }
          );
        }
      }
      data.isActive = b.isActive;
    }

    await prisma.preset.update({ where: { id }, data });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("preset PATCH failed:", e);
    return NextResponse.json({ error: "Save failed" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    await prisma.preset.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("preset DELETE failed:", e);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}