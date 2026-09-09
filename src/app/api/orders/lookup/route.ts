import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const hits = new Map<string, { n: number; at: number }>();

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? "local";
    const now = Date.now();
    const rec = hits.get(ip);

    if (rec && now - rec.at < 15 * 60_000 && rec.n >= 10) {
      return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 });
    }

    const { phone, code } = await req.json();

    if (!/^9\d{9}$/.test(phone ?? "") || !code?.trim()) {
      return NextResponse.json({ error: "Enter your phone number and order code" }, { status: 400 });
    }

    const order = await prisma.order.findUnique({
      where: { code: code.trim().toUpperCase() },
      include: { customer: true },
    });

    if (!order || order.customer.phone !== phone) {
      hits.set(ip, { n: (rec?.n ?? 0) + 1, at: rec?.at ?? now });
      return NextResponse.json(
        { error: "No order found with that phone number and code" },
        { status: 404 }
      );
    }

    hits.delete(ip);
    return NextResponse.json({ code: order.code });
  } catch (e) {
    console.error("order lookup failed:", e);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}