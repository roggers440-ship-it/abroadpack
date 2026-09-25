import { getCatalog } from "@/lib/catalog";
import PackBuilder from "@/components/PackBuilder";

export const metadata = {
  title: "Build your packing list",
  description:
    "Choose kitchen, clothing, footwear, bags and spices. Live cost in NPR and weight in kg against your airline baggage limit.",
  alternates: { canonical: "/build" },
};

export default async function BuildPage() {
  const catalog = await getCatalog();
  return <PackBuilder catalog={catalog} />;
}
