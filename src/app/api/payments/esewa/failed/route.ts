import { NextResponse } from "next/server";
import { BASE_URL } from "@/lib/site";

export async function GET() {
  return NextResponse.redirect(`${BASE_URL}/?error=cancelled`);
}