import { listPresets } from "@/lib/cms";
import PresetTable from "@/components/admin/PresetTable";

export default async function PresetsPage() {
  const presets = await listPresets();
  return <PresetTable presets={presets} />;
}
