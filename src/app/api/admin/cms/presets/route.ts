import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-guard";
import { slugify } from "@/lib/cms";

export async function POST(req: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { name } = await req.json();
    if (!name?.trim()) return NextResponse.json({ error: "Name required" }, { status: 400 });

    let slug = slugify(name);
    if (await prisma.preset.findUnique({ where: { slug } })) {
      slug = `${slug}-${Date.now().toString(36).slice(-4)}`;
    }

    const count = await prisma.preset.count();
    const preset = await prisma.preset.create({
      data: { name: name.trim(), slug, sortOrder: count, isActive: false },
    });
    return NextResponse.json(preset);
  } catch (e) {
    console.error("preset POST failed:", e);
    return NextResponse.json({ error: "Could not create preset" }, { status: 500 });
  }
}