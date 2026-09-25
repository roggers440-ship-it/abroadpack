import { rename } from "fs/promises";
import path from "path";

const DIR = "public/products";

const MAP = {
  "socks1.jpg": "socks-premium.jpg",
  "socks2.jpg": "socks-value.jpg",
  "hoodie1.jpg": "sweater-hoodie-premium.jpg",
  "hoodie2.jpg": "sweater-hoodie-value.jpg",
  "jeans1.jpg": "jeans-trousers-premium.jpg",
  "jeans2.jpg": "jeans-trousers-value.jpg",
  "tshirt1.jpg": "tshirts-shirts-premium.jpg",
  "tshirt2.jpg": "tshirts-shirts-value.jpg",
  "joggers.jpg": "joggers-premium.jpg",
  "joggers2.jpg": "joggers-value.jpg",
  "sandals1.jpg": "sandals-premium.jpg",
  "sandals2.jpg": "sandals-value.jpg",
  "cabin-bag1.jpg": "cabin-bag-premium.jpg",
  "cabin-bag2.jpg": "cabin-bag-value.jpg",
  "4 socket extension board heavy duty.jpg": "extension-cord-value.jpg",
};

for (const [from, to] of Object.entries(MAP)) {
  try {
    await rename(path.join(DIR, from), path.join(DIR, to));
    console.log(`${from}  →  ${to}`);
  } catch {
    console.log(`skip (not found): ${from}`);
  }
}
