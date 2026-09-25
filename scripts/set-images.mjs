import "dotenv/config";
import { readdir } from "fs/promises";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";

const adapter = new PrismaPg({ connectionString: process.env.DIRECT_URL });
const prisma = new PrismaClient({ adapter });

const files = await readdir("public/products");

const variants = await prisma.variant.findMany({ include: { product: true } });

let matched = 0;
for (const v of variants) {
  const base = `${v.product.slug}-${v.tier.toLowerCase()}`;
  const file = files.find((f) => f.replace(/\.[^.]+$/, "") === base);
  if (!file) {
    console.log("MISSING:", base);
    continue;
  }
  await prisma.variant.update({
    where: { id: v.id },
    data: { imageUrl: `/products/${file}` },
  });
  matched++;
}

console.log(`matched ${matched} of ${variants.length}`);
await prisma.$disconnect();
