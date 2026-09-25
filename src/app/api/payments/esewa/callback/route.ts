import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyCallback } from "@/lib/esewa";
import { BASE_URL } from "@/lib/site";

export async function GET(req: Request) {
  const encoded = new URL(req.url).searchParams.get("data");
  const base = BASE_URL;

  if (!encoded) return NextResponse.redirect(`${base}/?error=missing_data`);

  try {
    const { data, valid } = verifyCallback(encoded);

    if (!valid || data.status !== "COMPLETE") {
      return NextResponse.redirect(`${base}/order/${data.transaction_uuid}?error=failed`);
    }

    const order = await prisma.order.findUnique({ where: { code: data.transaction_uuid } });
    if (!order) return NextResponse.redirect(`${base}/?error=no_order`);

    // amount check — never trust the redirect blindly
    if (Math.round(parseFloat(data.total_amount.replace(/,/g, "")) * 100) !== order.depositPaisa) {
      return NextResponse.redirect(`${base}/order/${order.code}?error=amount_mismatch`);
    }

    if (order.status === "DRAFT") {
      await prisma.order.update({
        where: { id: order.id },
        data: { status: "DEPOSIT_PAID", depositRef: data.transaction_code },
      });
    }

    return NextResponse.redirect(`${base}/order/${order.code}`);
  } catch {
    return NextResponse.redirect(`${base}/?error=bad_callback`);
  }
}