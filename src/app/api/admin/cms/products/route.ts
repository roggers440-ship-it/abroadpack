import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-guard";
import { slugify } from "@/lib/cms";

export async function POST(req: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { categoryId, name } = await req.json();
  if (!categoryId || !name?.trim()) {
    return NextResponse.json({ error: "Category and name required" }, { status: 400 });
  }

  const count = await prisma.product.count({ where: { categoryId } });
  let slug = slugify(name);
  if (await prisma.product.findUnique({ where: { slug } })) {
    slug = `${slug}-${Date.now().toString(36).slice(-4)}`;
  }

  const product = await prisma.product.create({
    data: { categoryId, name: name.trim(), slug, sortOrder: count, isActive: false },
  });
  return NextResponse.json(product);
}