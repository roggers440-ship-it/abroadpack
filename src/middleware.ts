import { NextResponse, type NextRequest } from "next/server";
import { verifySession, COOKIE } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const ok = await verifySession(req.cookies.get(COOKIE)?.value);
  if (!ok) {
    return NextResponse.redirect(new URL("/admin-login", req.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };