import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-guard";
import { slugify } from "@/lib/cms";

export async function POST(req: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name } = await req.json();
  if (!name?.trim()) return NextResponse.json({ error: "Name required" }, { status: 400 });

  const count = await prisma.category.count();
  const cat = await prisma.category.create({
    data: { name: name.trim(), slug: slugify(name), sortOrder: count },
  });
  return NextResponse.json(cat);
}