import { NextResponse } from "next/server";
import { createOrder } from "@/lib/order";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, phone, destination, variantIds } = body;

    if (!fullName?.trim() || !/^9\d{9}$/.test(phone ?? "")) {
      return NextResponse.json({ error: "Name and valid phone required" }, { status: 400 });
    }
    if (!Array.isArray(variantIds) || variantIds.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const order = await createOrder({ fullName, phone, destination, variantIds });
    return NextResponse.json({ code: order.code });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Could not create order" }, { status: 500 });
  }
}