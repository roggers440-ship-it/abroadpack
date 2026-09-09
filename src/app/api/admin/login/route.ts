import { NextResponse } from "next/server";
import { createSession, COOKIE } from "@/lib/auth";

// eslint-disable-next-line prefer-const
let attempts: Record<string, { n: number; at: number }> = {};

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? "local";
  const now = Date.now();
  const rec = attempts[ip];
  if (rec && now - rec.at < 15 * 60_000 && rec.n >= 5) {
    return NextResponse.json({ error: "Too many attempts. Try later." }, { status: 429 });
  }

  const { password } = await req.json();

  if (password !== process.env.ADMIN_PASSWORD) {
    attempts[ip] = { n: (rec?.n ?? 0) + 1, at: now };
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }

  delete attempts[ip];
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, await createSession(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}