import "dotenv/config";
import { Client } from "pg";

const c = new Client({ connectionString: process.env.DATABASE_URL });
try {
  await c.connect();
  console.log("connected:", (await c.query("select now()")).rows[0]);
} catch (e) {
  console.error("FAILED:", e.message);
} finally {
  await c.end().catch(() => {});
}
