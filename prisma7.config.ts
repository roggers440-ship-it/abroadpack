import "dotenv/config";
import { defineConfig } from "prisma/config";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = async () =>
  new PrismaPg({ connectionString: process.env.DIRECT_URL });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations", seed: "tsx prisma/seed.ts" },
  datasource: { url: process.env.DIRECT_URL! },
  migrate: { adapter },
  studio: { adapter },
});