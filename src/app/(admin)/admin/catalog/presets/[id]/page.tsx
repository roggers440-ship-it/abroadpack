import { notFound } from "next/navigation";
import { getPresetForEdit, allVariantsForPicker } from "@/lib/cms";
import PresetEditor from "@/components/admin/PresetEditor";

export default async function PresetEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [preset, catalog] = await Promise.all([
    getPresetForEdit(id),
    allVariantsForPicker(),
  ]);
  if (!preset) notFound();
  return <PresetEditor preset={preset} catalog={catalog} />;
}
