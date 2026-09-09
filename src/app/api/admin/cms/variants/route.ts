import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-guard";

export async function POST(req: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const b = await req.json();
  if (!b.productId || !b.brandName?.trim()) {
    return NextResponse.json({ error: "Brand name required" }, { status: 400 });
  }

  const v = await prisma.variant.create({
    data: {
      productId: b.productId,
      brandName: b.brandName.trim(),
      tier: b.tier === "PREMIUM" ? "PREMIUM" : "VALUE",
      pricePaisa: Math.round(Number(b.priceNpr || 0) * 100),
      weightGrams: Math.round(Number(b.weightGrams || 0)),
      imageUrl: b.imageUrl?.trim() || null,
      availability: b.availability?.trim() || "Available",
      tags: Array.isArray(b.tags) ? b.tags : [],
    },
  });
  return NextResponse.json(v);
}