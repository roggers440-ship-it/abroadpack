import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-guard";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const b = await req.json();
  const data: Record<string, unknown> = {};

  if (typeof b.brandName === "string") data.brandName = b.brandName.trim();
  if (b.tier === "PREMIUM" || b.tier === "VALUE") data.tier = b.tier;
  if (b.priceNpr !== undefined) data.pricePaisa = Math.round(Number(b.priceNpr) * 100);
  if (b.weightGrams !== undefined) data.weightGrams = Math.round(Number(b.weightGrams));
  if ("imageUrl" in b) data.imageUrl = b.imageUrl?.trim() || null;
  if (typeof b.availability === "string") data.availability = b.availability.trim() || "Available";
  if (Array.isArray(b.tags)) data.tags = b.tags;
  if (typeof b.isActive === "boolean") data.isActive = b.isActive;

  await prisma.variant.update({ where: { id }, data });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const used = await prisma.orderLine.count({ where: { variantId: id } });
  if (used > 0) {
    return NextResponse.json(
      { error: `Used in ${used} order line(s). Hide it instead.` },
      { status: 409 }
    );
  }

  await prisma.variant.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}