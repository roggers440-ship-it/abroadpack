import { notFound } from "next/navigation";
import { listProducts } from "@/lib/cms";
import ProductTable from "@/components/admin/ProductTable";

export default async function CategoryProducts({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = await listProducts(slug);
  if (!cat) notFound();
  return <ProductTable category={cat} />;
}
