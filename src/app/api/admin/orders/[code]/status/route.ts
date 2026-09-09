import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifySession, COOKIE } from "@/lib/auth";
import { cookies } from "next/headers";

const ALLOWED: Record<string, string[]> = {
  DEPOSIT_PAID: ["SOURCING", "CANCELLED"],
  SOURCING: ["READY_FOR_PICKUP", "CANCELLED"],
  READY_FOR_PICKUP: ["SOURCING"],
  DRAFT: ["CANCELLED"],
};

export async function POST(
  req: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const jar = await cookies();
  if (!(await verifySession(jar.get(COOKIE)?.value))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { code } = await params;
  const { status } = await req.json();

  const order = await prisma.order.findUnique({ where: { code } });
  if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (!ALLOWED[order.status]?.includes(status)) {
    return NextResponse.json(
      { error: `Cannot go ${order.status} → ${status}` },
      { status: 400 }
    );
  }

  await prisma.order.update({ where: { id: order.id }, data: { status } });
  return NextResponse.json({ ok: true });
}