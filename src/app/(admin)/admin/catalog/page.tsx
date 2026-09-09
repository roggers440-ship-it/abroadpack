import { listCategories } from "@/lib/cms";
import CategoryTable from "@/components/admin/CategoryTable";

export default async function CatalogPage() {
  const categories = await listCategories();
  return <CategoryTable categories={categories} />;
}
