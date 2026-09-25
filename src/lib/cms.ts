import { prisma } from "./prisma";

export const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export async function listCategories() {
  return prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { products: true } } },
  });
}

export async function listProducts(categorySlug: string) {
  return prisma.category.findUnique({
    where: { slug: categorySlug },
    include: {
      products: {
        orderBy: { sortOrder: "asc" },
        include: { _count: { select: { variants: true } } },
      },
    },
  });
}

export async function getProductForEdit(id: string) {
  return prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      variants: {
        orderBy: { pricePaisa: "desc" },
        include: { _count: { select: { orderLines: true } } },
      },
    },
  });
}
export async function listPresets() {
  return prisma.preset.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { items: true } } },
  });
}

export async function getPresetForEdit(id: string) {
  return prisma.preset.findUnique({
    where: { id },
    include: {
      items: {
        orderBy: { sortOrder: "asc" },
        include: { variant: { include: { product: true } } },
      },
    },
  });
}

export async function allVariantsForPicker() {
  return prisma.category.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    include: {
      products: {
        where: { isActive: true },
        orderBy: { sortOrder: "asc" },
        include: {
          variants: { where: { isActive: true }, orderBy: { pricePaisa: "desc" } },
        },
      },
    },
  });
}