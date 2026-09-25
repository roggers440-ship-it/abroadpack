import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { paymentFields, ESEWA_URL } from "@/lib/esewa";
import AutoSubmit from "@/components/AutoSubmit";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function PayPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const order = await prisma.order.findUnique({ where: { code } });
  if (!order) notFound();
  if (order.status !== "DRAFT") notFound();

  const fields = paymentFields({
    totalRupees: (order.depositPaisa / 100).toFixed(0),
    uuid: order.code,
  });

  return <AutoSubmit action={ESEWA_URL} fields={fields} />;
}
