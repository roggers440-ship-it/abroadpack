import { notFound } from "next/navigation";
import { getProductForEdit } from "@/lib/cms";
import ProductEditor from "@/components/admin/ProductEditor";

export default async function ProductEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductForEdit(id);
  if (!product) notFound();
  return <ProductEditor product={product} />;
}
