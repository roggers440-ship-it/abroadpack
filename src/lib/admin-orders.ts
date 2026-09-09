import { prisma } from "./prisma";
import type { OrderStatus } from "@/generated/prisma/enums";

export async function listOrders(status?: OrderStatus) {
  return prisma.order.findMany({
    where: status ? { status } : {},
    orderBy: { createdAt: "desc" },
    include: { customer: true, _count: { select: { lines: true } } },
    take: 100,
  });
}

export async function getOrder(code: string) {
  return prisma.order.findUnique({
    where: { code },
    include: { customer: true, lines: { orderBy: { productName: "asc" } } },
  });
}

export async function orderCounts() {
  const rows = await prisma.order.groupBy({ by: ["status"], _count: true });
  return Object.fromEntries(rows.map((r) => [r.status, r._count]));
}