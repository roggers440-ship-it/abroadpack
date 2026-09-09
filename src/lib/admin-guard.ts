import { cookies } from "next/headers";
import { verifySession, COOKIE } from "./auth";

export async function requireAdmin() {
  const jar = await cookies();
  return verifySession(jar.get(COOKIE)?.value);
}