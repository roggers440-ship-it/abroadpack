import { prisma } from "./prisma";

export async function getCatalog() {
  return prisma.category.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    include: {
      products: {
        where: { isActive: true },
        orderBy: { sortOrder: "asc" },
        include: {
          variants: {
            where: { isActive: true },
            orderBy: { pricePaisa: "desc" },
          },
        },
      },
    },
  });
}

export type Catalog = Awaited<ReturnType<typeof getCatalog>>;

export async function getPresets() {
  return prisma.preset.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    include: {
      items: {
        orderBy: { sortOrder: "asc" },
        include: {
          variant: {
            include: { product: { include: { category: true } } },
          },
        },
      },
    },
  });
}

export type Presets = Awaited<ReturnType<typeof getPresets>>;