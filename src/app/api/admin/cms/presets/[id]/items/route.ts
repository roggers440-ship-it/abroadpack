import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-guard";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    const { variantIds } = await req.json();

    if (!Array.isArray(variantIds)) {
      return NextResponse.json({ error: "variantIds must be an array" }, { status: 400 });
    }

    await prisma.$transaction([
      prisma.presetItem.deleteMany({ where: { presetId: id } }),
      prisma.presetItem.createMany({
        data: variantIds.map((variantId: string, idx: number) => ({
          presetId: id,
          variantId,
          qty: 1,
          sortOrder: idx,
        })),
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("preset items PUT failed:", e);
    return NextResponse.json({ error: "Save failed" }, { status: 500 });
  }
}