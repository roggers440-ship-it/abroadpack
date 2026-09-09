import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DIRECT_URL });
const prisma = new PrismaClient({ adapter });

const img = (t: string) => `https://placehold.co/400x300?text=${encodeURIComponent(t)}`;

const data = [
  {
    name: "Kitchen Accessories",
    slug: "kitchen",
    products: [
      {
        name: "Pressure Cooker 3L",
        slug: "pressure-cooker-3l",
        description: "Enough for daily dal-bhat for 2–3 people. Fits in a suitcase corner.",
        imageUrl: img("Cooker"),
        variants: [
          { brandName: "Prestige 3L Stainless Steel", tier: "PREMIUM", pricePaisa: 520000, weightGrams: 2600, imageUrl: img("Prestige Cooker") },
          { brandName: "Hawkins 3L Aluminium", tier: "VALUE", pricePaisa: 340000, weightGrams: 1900, imageUrl: img("Hawkins Cooker") },
        ],
      },
      {
        name: "Frying Pan 24cm",
        slug: "frying-pan-24",
        description: "One good pan handles most cooking. 24cm fits a standard hostel stove.",
        imageUrl: img("Pan"),
        variants: [
          { brandName: "Prestige Tri-Ply Stainless Steel", tier: "PREMIUM", pricePaisa: 380000, weightGrams: 1200, imageUrl: img("Tri-Ply Pan") },
          { brandName: "Hawkins Futura Non-Stick", tier: "VALUE", pricePaisa: 220000, weightGrams: 900, imageUrl: img("Futura Pan") },
        ],
      },
      {
        name: "Spice Box (Masala Dani)",
        slug: "spice-box",
        description: "Keeps your daily masalas organised instead of loose in packets.",
        imageUrl: img("Masala Dani"),
        variants: [
          { brandName: "Stainless Steel 7-Compartment", tier: "PREMIUM", pricePaisa: 95000, weightGrams: 700, imageUrl: img("Steel Spice Box") },
          { brandName: "Compact Acrylic Organizer", tier: "VALUE", pricePaisa: 45000, weightGrams: 350, imageUrl: img("Acrylic Spice Box") },
        ],
      },
      {
        name: "Rolling Pin & Board (Belna Chakla)",
        slug: "belna-chakla",
        description: "For roti and paratha. Marble is heavier but lasts forever.",
        imageUrl: img("Belna Chakla"),
        variants: [
          { brandName: "Heavy Duty Marble Chakla Set", tier: "PREMIUM", pricePaisa: 140000, weightGrams: 2400, imageUrl: img("Marble Chakla") },
          { brandName: "Traditional Teak Wood Set", tier: "VALUE", pricePaisa: 70000, weightGrams: 900, imageUrl: img("Wood Belna") },
        ],
      },
      {
        name: "Utensil Starter Kit (1 set)",
        slug: "utensil-starter-kit",
        description: "Everything you need to cook and eat from day one.",
        contents: "Plates, bowls, glasses, spoons, forks, ladle, spatula, knife",
        imageUrl: img("Utensil Set"),
        variants: [
          { brandName: "Premium Heavy-Duty Cutlery Set", tier: "PREMIUM", pricePaisa: 420000, weightGrams: 3400, imageUrl: img("Premium Utensils") },
          { brandName: "Standard 12-Piece Steel Set", tier: "VALUE", pricePaisa: 210000, weightGrams: 2900, imageUrl: img("Standard Utensils") },
        ],
      },
    ],
  },

  {
    name: "Innerwear & Base Layers",
    slug: "innerwear",
    products: [
      {
        name: "Thermals (Top & Bottom)",
        slug: "thermal-set",
        description: "The single most important winter item. Wear under everything.",
        imageUrl: img("Thermals"),
        variants: [
          { brandName: "Jockey Heavyweight Fleece Set", tier: "PREMIUM", pricePaisa: 280000, weightGrams: 600, imageUrl: img("Jockey Thermal") },
          { brandName: "Clovia Thermal Set", tier: "VALUE", pricePaisa: 140000, weightGrams: 500, imageUrl: img("Clovia Thermal") },
        ],
      },
      {
        name: "Socks (multi-pack)",
        slug: "socks",
        description: "Thermal socks matter more than you think for a European winter.",
        imageUrl: img("Socks"),
        variants: [
          { brandName: "Heat Keepers Thermal Wool (Pack of 3)", tier: "PREMIUM", pricePaisa: 120000, weightGrams: 400, imageUrl: img("Thermal Socks") },
          { brandName: "Goldstar Cotton Crew (Pack of 5)", tier: "VALUE", pricePaisa: 55000, weightGrams: 350, imageUrl: img("Cotton Socks") },
        ],
      },
      {
        name: "Underwear (Pack of 5)",
        slug: "underwear",
        description: "Cheaper here than anywhere in Europe. Take enough.",
        imageUrl: img("Underwear"),
        variants: [
          { brandName: "Jockey Seamless Microfiber", tier: "PREMIUM", pricePaisa: 190000, weightGrams: 350, imageUrl: img("Jockey Briefs") },
          { brandName: "VIP Cotton Briefs/Trunks", tier: "VALUE", pricePaisa: 95000, weightGrams: 400, imageUrl: img("VIP Briefs") },
        ],
      },
      {
        name: "Woolen Topi / Beanie",
        slug: "beanie",
        description: "Most heat is lost from the head. Non-negotiable for winter.",
        imageUrl: img("Beanie"),
        variants: [
          { brandName: "Branded Acrylic Knit", tier: "PREMIUM", pricePaisa: 65000, weightGrams: 120, imageUrl: img("Branded Beanie") },
          { brandName: "Hand-Knitted Fleece-Lined", tier: "VALUE", pricePaisa: 35000, weightGrams: 150, imageUrl: img("Local Beanie") },
        ],
      },
    ],
  },

  {
    name: "Jackets & Heavy Outerwear",
    slug: "jackets",
    products: [
      {
        name: "Heavy Snow Jacket",
        slug: "snow-jacket",
        description: "Your biggest single purchase. Buy here — European winter jackets cost 3–4× more.",
        imageUrl: img("Snow Jacket"),
        variants: [
          { brandName: "Branded Down Jacket (-15°C)", tier: "PREMIUM", pricePaisa: 950000,weightGrams: 1100, imageUrl: img("Down Jacket"),availability: "2–3 days" },
          { brandName: "Export Fleece-Lined Waterproof Parka", tier: "VALUE", pricePaisa: 480000, weightGrams: 1400, imageUrl: img("Parka") },
        ],
      },
      {
        name: "Windbreaker / Normal Jacket",
        slug: "windbreaker",
        description: "For autumn and spring, when the snow jacket is too much.",
        imageUrl: img("Windbreaker"),
        variants: [
          { brandName: "Branded All-Weather Lightweight", tier: "PREMIUM", pricePaisa: 420000, weightGrams: 600, imageUrl: img("Branded Windbreaker") },
          { brandName: "Local Waterproof Windcheater", tier: "VALUE", pricePaisa: 190000, weightGrams: 700, imageUrl: img("Local Windcheater") },
        ],
      },
      {
        name: "Sweater / Hoodie",
        slug: "sweater-hoodie",
        description: "The mid-layer. Two of these will get heavy use.",
        imageUrl: img("Hoodie"),
        variants: [
          { brandName: "Premium Woolen Cardigan/Pullover", tier: "PREMIUM", pricePaisa: 320000, weightGrams: 700, imageUrl: img("Woolen Pullover") },
          { brandName: "Fleece Oversized Hoodie", tier: "VALUE", pricePaisa: 160000, weightGrams: 800, imageUrl: img("Fleece Hoodie") },
        ],
      },
    ],
  },

  {
    name: "Everyday Clothing",
    slug: "clothing",
    products: [
      {
        name: "Jeans & Trousers",
        slug: "jeans-trousers",
        description: "Two pairs is plenty. Denim is heavy — watch the counter.",
        imageUrl: img("Jeans"),
        variants: [
          { brandName: "Branded Stretchable Chinos/Slacks", tier: "PREMIUM", pricePaisa: 350000, weightGrams: 600, imageUrl: img("Chinos") },
          { brandName: "Goldstar Casual Denim", tier: "VALUE", pricePaisa: 170000, weightGrams: 750, imageUrl: img("Denim") },
        ],
      },
      {
        name: "T-Shirts & Shirts",
        slug: "tshirts-shirts",
        description: "Basics that get worn constantly. Cheap here, expensive there.",
        imageUrl: img("Shirts"),
        variants: [
          { brandName: "Branded Button-Down Shirts (Pack of 2)", tier: "PREMIUM", pricePaisa: 280000, weightGrams: 500, imageUrl: img("Button Down") },
          { brandName: "Export Cotton Crew Neck (Pack of 3)", tier: "VALUE", pricePaisa: 135000, weightGrams: 550, imageUrl: img("Crew Neck Tees") },
        ],
      },
      {
        name: "Track Pants / Joggers",
        slug: "joggers",
        description: "What you'll actually live in indoors. Heating isn't always generous.",
        imageUrl: img("Joggers"),
        variants: [
          { brandName: "Branded Athletic Joggers", tier: "PREMIUM", pricePaisa: 240000, weightGrams: 500, imageUrl: img("Athletic Joggers") },
          { brandName: "Local Cotton Fleece Sweatpants", tier: "VALUE", pricePaisa: 110000, weightGrams: 600, imageUrl: img("Sweatpants") },
        ],
      },
    ],
  },

  {
    name: "Footwear",
    slug: "footwear",
    products: [
      {
        name: "Snow / Winter Boots",
        slug: "snow-boots",
        description: "Anti-slip sole matters more than looks. Icy pavements are the real risk.",
        imageUrl: img("Snow Boots"),
        variants: [
          { brandName: "Branded Anti-Slip Insulated", tier: "PREMIUM", pricePaisa: 720000, weightGrams: 1500, imageUrl: img("Branded Boots") },
          { brandName: "Local Export Leather Waterproof", tier: "VALUE", pricePaisa: 380000, weightGrams: 1600, imageUrl: img("Leather Boots") },
        ],
      },
      {
        name: "Daily Sneakers",
        slug: "sneakers",
        description: "You'll walk far more than you do in Kathmandu. Comfort over style.",
        imageUrl: img("Sneakers"),
        variants: [
          { brandName: "Branded Comfort Walking Shoes", tier: "PREMIUM", pricePaisa: 480000, weightGrams: 900, imageUrl: img("Walking Shoes") },
          { brandName: "Goldstar Running Sneakers", tier: "VALUE", pricePaisa: 220000, weightGrams: 850, imageUrl: img("Goldstar") },
        ],
      },
      {
        name: "Sandals / Slippers",
        slug: "sandals",
        description: "Shared bathrooms make these essential, not optional.",
        imageUrl: img("Sandals"),
        variants: [
          { brandName: "Ergonomic Leather Slides", tier: "PREMIUM", pricePaisa: 150000, weightGrams: 500, imageUrl: img("Leather Slides") },
          { brandName: "Rubber Bathroom Flip-Flops", tier: "VALUE", pricePaisa: 40000, weightGrams: 300, imageUrl: img("Flip Flops") },
        ],
      },
    ],
  },

  {
    name: "Luggage & Travel Bags",
    slug: "luggage",
    products: [
      {
        name: 'Check-in Luggage (28"/30")',
        slug: "checkin-luggage",
        description: "Empty weight counts against your allowance. Lighter shell = more you can carry.",
        imageUrl: img("Large Suitcase"),
        variants: [
          { brandName: "VIP / American Tourister TSA-Locked", tier: "PREMIUM", pricePaisa: 1350000, weightGrams: 4200, imageUrl: img("American Tourister") },
          { brandName: "Local Hard-Shell Polycarbonate", tier: "VALUE", pricePaisa: 620000, weightGrams: 4900, imageUrl: img("Local Suitcase") },
        ],
      },
      {
        name: 'Cabin / Hand Bag (20")',
        slug: "cabin-bag",
        description: "Carry your documents, laptop and one change of clothes here.",
        imageUrl: img("Cabin Bag"),
        variants: [
          { brandName: "Branded Lightweight Spinner", tier: "PREMIUM", pricePaisa: 780000, weightGrams: 2600, imageUrl: img("Spinner Cabin") },
          { brandName: "Local Expandable Cabin Trolley", tier: "VALUE", pricePaisa: 380000, weightGrams: 3000, imageUrl: img("Local Trolley") },
        ],
      },
      {
        name: "College / Laptop Backpack",
        slug: "laptop-backpack",
        description: "Daily-use bag for university. Padded laptop sleeve is the thing to check.",
        imageUrl: img("Backpack"),
        variants: [
          { brandName: "Wildcraft / Lenovo Anti-Theft Padded", tier: "PREMIUM", pricePaisa: 380000, weightGrams: 850, imageUrl: img("Wildcraft") },
          { brandName: "Local Waterproof Multi-Compartment", tier: "VALUE", pricePaisa: 160000, weightGrams: 900, imageUrl: img("Local Backpack") },
        ],
      },
    ],
  },

  {
    name: "First Aid & Medicines",
    slug: "first-aid",
    products: [
      {
        name: "General Pain & Cold Kit",
        slug: "pain-cold-kit",
        description: "Familiar medicines you know how to use. Getting a prescription abroad takes time.",
        contents: "Cetamol, Sinex, Avomine, De-Cold",
        note: "Carry in original packaging with a copy of any prescription. Keep in cabin baggage.",
        imageUrl: img("Cold Kit"),
        variants: [
          { brandName: "Standard Nepali Medical Kit", tier: "VALUE", pricePaisa: 90000, weightGrams: 400, imageUrl: img("Cold Kit") },
        ],
      },
      {
        name: "Wound & Stomach Care Kit",
        slug: "wound-stomach-kit",
        description: "Covers cuts, upset stomach and dehydration — the common first-month problems.",
        contents: "Betadine, bandages, Jeevan Jal, Digene, Norflox-TZ",
        note: "Carry in original packaging with a copy of any prescription. Keep in cabin baggage.",
        imageUrl: img("First Aid"),
        variants: [
          { brandName: "First Aid Essentials Set", tier: "VALUE", pricePaisa: 110000, weightGrams: 500, imageUrl: img("First Aid") },
        ],
      },
    ],
  },

  {
    name: "Spices & Dry Foods",
    slug: "spices",
    products: [
      {
        name: "Everyday Spice Bundle",
        slug: "spice-bundle",
        description: "The base of every Nepali meal. Costs several times more in Europe.",
        contents: "Garam masala, meat masala, turmeric, cumin, chili powder",
        note: "Dry spices only — sealed and labelled. Declare food items on arrival if asked.",
        imageUrl: img("Spices"),
        variants: [
          { brandName: "Century Spices Pack", tier: "PREMIUM", pricePaisa: 160000, weightGrams: 1200, imageUrl: img("Century Spices") },
          { brandName: "Local Mill Pack", tier: "VALUE", pricePaisa: 85000, weightGrams: 1200, imageUrl: img("Local Spices") },
        ],
      },
      {
        name: "Specialty Food Pack",
        slug: "specialty-food",
        description: "Gundruk and jimbu travel fine. Sukuti does not, if you're flying to the EU.",
        contents: "Jimbu & gundruk pack (250g)",
        note: "EU DESTINATIONS: meat and dairy products from Nepal are banned and will be seized at customs — sukuti, chhurpi and meat masala with dairy cannot be carried. Dried vegetables and herbs like gundruk and jimbu are allowed. Rules differ for Australia, USA and Canada — check before you fly.",
        imageUrl: img("Gundruk Jimbu"),
        variants: [
          { brandName: "Homemade Jimbu & Gundruk (250g)", tier: "VALUE", pricePaisa: 60000, weightGrams: 300, imageUrl: img("Gundruk") },
        ],
      },
    ],
  },

  {
    name: "Adapters & Electronics",
    slug: "electronics",
    products: [
      {
        name: "Multi-Plug Travel Adapter",
        slug: "travel-adapter",
        description: "Nepali plugs don't fit German sockets. Buy two — you'll lose one.",
        note: "Germany and most of the EU use Type C/F sockets, 230V.",
        imageUrl: img("Adapter"),
        variants: [
          { brandName: "Universal Adapter (Type C/F)", tier: "PREMIUM", pricePaisa: 120000, weightGrams: 200, imageUrl: img("Universal Adapter") },
        ],
      },
      {
        name: "Extension Cord",
        slug: "extension-cord",
        description: "One adapter plus an extension board runs all your Nepali-plug devices.",
        imageUrl: img("Extension Cord"),
        variants: [
          { brandName: "Branded Surge Protected", tier: "PREMIUM", pricePaisa: 150000, weightGrams: 700, imageUrl: img("Surge Extension") },
          { brandName: "Local 4-Socket Heavy Duty", tier: "VALUE", pricePaisa: 70000, weightGrams: 600, imageUrl: img("Local Extension") },
        ],
      },
    ],
  },
];

async function main() {
  await prisma.orderLine.deleteMany();
  await prisma.order.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  for (const [ci, cat] of data.entries()) {
    await prisma.category.create({
      data: {
        name: cat.name,
        slug: cat.slug,
        sortOrder: ci,
        products: {
          create: cat.products.map((p, pi) => ({
            name: p.name,
            slug: p.slug,
            description: "description" in p ? (p.description as string) : null,
            contents: "contents" in p ? (p.contents as string) : null,
            note: "note" in p ? (p.note as string) : null,
            imageUrl: "imageUrl" in p ? (p.imageUrl as string) : null,
            sortOrder: pi,
            variants: {
              create: p.variants.map((v: Record<string, unknown>) => ({
                ...v,
                availability: v.availability ?? "Available",
                tags:
                  v.tags ??
                  (v.tier === "PREMIUM"
                    ? ["100% original", "Original brand", "10 days replacement"]
                    : ["Export quality", "Checked before pickup"]),
              })) as never,
            },
          })),
        },
      },
    });
  }
  console.log("seeded");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());