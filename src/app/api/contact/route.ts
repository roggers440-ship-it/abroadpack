import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const hits = new Map<string, { n: number; at: number }>();

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? "local";
    const now = Date.now();
    const rec = hits.get(ip);

    if (rec && now - rec.at < 60 * 60_000 && rec.n >= 5) {
      return NextResponse.json({ error: "Too many messages. Try again later." }, { status: 429 });
    }

    const b = await req.json();

    // honeypot — bots fill every field
    if (b.website) return NextResponse.json({ ok: true });

    if (!b.fullName?.trim() || !b.message?.trim()) {
      return NextResponse.json({ error: "Name and message are required" }, { status: 400 });
    }
    if (!/^9\d{9}$/.test(b.phone ?? "")) {
      return NextResponse.json({ error: "Enter a valid 10-digit phone number" }, { status: 400 });
    }
    if (b.message.length > 2000) {
      return NextResponse.json({ error: "Message is too long" }, { status: 400 });
    }

    await prisma.contactMessage.create({
      data: {
        fullName: b.fullName.trim().slice(0, 120),
        phone: b.phone,
        email: b.email?.trim().slice(0, 160) || null,
        subject: b.subject?.trim().slice(0, 200) || null,
        message: b.message.trim(),
      },
    });

    hits.set(ip, { n: (rec?.n ?? 0) + 1, at: rec?.at ?? now });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("contact POST failed:", e);
    return NextResponse.json({ error: "Could not send message" }, { status: 500 });
  }
}