import { getCatalog } from "@/lib/catalog";
import PackBuilder from "@/components/PackBuilder";

export default async function BuildPage() {
  const catalog = await getCatalog();
  return <PackBuilder catalog={catalog} />;
}
