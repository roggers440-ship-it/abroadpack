import { getCatalog, getPresets } from "@/lib/catalog";
import PackBuilder from "@/components/PackBuilder";

export const metadata = {
  title: "Build your packing list",
  description:
    "Choose kitchen, clothing, footwear, bags and spices. Live cost in NPR and weight in kg against your airline baggage limit.",
  alternates: { canonical: "/build" },
};

export default async function BuildPage() {
  const [catalog, presets] = await Promise.all([getCatalog(), getPresets()]);
  return <PackBuilder catalog={catalog} presets={presets} />;
}
