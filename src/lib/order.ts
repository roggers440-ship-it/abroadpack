import { prisma } from "./prisma";
import crypto from "crypto";

export const DEPOSIT_PAISA = 100000; // NPR 1,000

function makeCode() {
  return "AP-" + crypto.randomBytes(5).toString("hex").toUpperCase();
}

export async function createOrder(input: {
  fullName: string;
  phone: string;
  destination?: string;
  variantIds: string[];
}) {
  const counts = new Map<string, number>();
  input.variantIds.forEach((id) => counts.set(id, (counts.get(id) ?? 0) + 1));

  const variants = await prisma.variant.findMany({
    where: { id: { in: [...counts.keys()] }, isActive: true },
    include: { product: true },
  });

  if (variants.length === 0) throw new Error("No valid items");

  const estTotalPaisa = variants.reduce((s, v) => s + v.pricePaisa * counts.get(v.id)!, 0);
  const estWeightGrams = variants.reduce((s, v) => s + v.weightGrams * counts.get(v.id)!, 0);

  const customer = await prisma.customer.upsert({
    where: { phone: input.phone },
    update: { fullName: input.fullName },
    create: { phone: input.phone, fullName: input.fullName },
  });

  return prisma.order.create({
    data: {
      code: makeCode(),
      customerId: customer.id,
      status: "DRAFT",
      estTotalPaisa,
      estWeightGrams,
      depositPaisa: DEPOSIT_PAISA,
      destination: input.destination,
      lines: {
        create: variants.map((v) => ({
          variantId: v.id,
          productName: v.product.name,
          brandName: v.brandName,
          pricePaisa: v.pricePaisa,
          weightGrams: v.weightGrams,
          qtyOrdered: counts.get(v.id)!,
        })),
      },
    },
    include: { lines: true, customer: true },
  });
}