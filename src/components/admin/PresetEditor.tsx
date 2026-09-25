"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Container,
  Card,
  CardContent,
  Stack,
  TextField,
  Button,
  Typography,
  Switch,
  FormControlLabel,
  Box,
  Divider,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Alert,
} from "@mui/material";
import { ArrowBack, ExpandMore, DeleteOutlined } from "@mui/icons-material";
import { useToast } from "./ToastProvider";
import { apiCall } from "@/lib/api-client";
import { npr, kg } from "@/lib/money";

type Variant = {
  id: string;
  brandName: string;
  tier: string;
  pricePaisa: number;
  weightGrams: number;
};
type Product = { id: string; name: string; variants: Variant[] };
type Category = { id: string; name: string; products: Product[] };

type Preset = {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  isActive: boolean;
  items: { id: string; variantId: string }[];
};

export default function PresetEditor({
  preset,
  catalog,
}: {
  preset: Preset;
  catalog: Category[];
}) {
  const router = useRouter();
  const toast = useToast();

  const [form, setForm] = useState({
    name: preset.name,
    description: preset.description ?? "",
    imageUrl: preset.imageUrl ?? "",
  });
  const [selected, setSelected] = useState<string[]>(
    preset.items.map((i) => i.variantId),
  );
  const [busy, setBusy] = useState(false);

  const variantById = new Map<string, { v: Variant; productName: string }>();
  catalog.forEach((c) =>
    c.products.forEach((p) =>
      p.variants.forEach((v) =>
        variantById.set(v.id, { v, productName: p.name }),
      ),
    ),
  );

  const totals = selected.reduce(
    (acc, id) => {
      const found = variantById.get(id);
      if (found) {
        acc.paisa += found.v.pricePaisa;
        acc.grams += found.v.weightGrams;
      }
      return acc;
    },
    { paisa: 0, grams: 0 },
  );

  // one variant per product — picking a second replaces the first
  const pick = (productId: string, variantId: string) => {
    const product = catalog
      .flatMap((c) => c.products)
      .find((p) => p.id === productId);
    const siblingIds = product?.variants.map((v) => v.id) ?? [];
    setSelected((prev) => {
      const isOn = prev.includes(variantId);
      const without = prev.filter((id) => !siblingIds.includes(id));
      return isOn ? without : [...without, variantId];
    });
  };

  const saveDetails = async () => {
    const res = await apiCall(`/api/admin/cms/presets/${preset.id}`, {
      method: "PATCH",
      body: form,
    });
    if (res.ok) {
      toast.success("Set saved");
      router.refresh();
    } else toast.error(res.error);
  };

  const saveItems = async () => {
    setBusy(true);
    const res = await apiCall(`/api/admin/cms/presets/${preset.id}/items`, {
      method: "PUT",
      body: { variantIds: selected },
    });
    if (res.ok) {
      toast.success(`${selected.length} items saved`);
      router.refresh();
    } else toast.error(res.error);
    setBusy(false);
  };

  const toggleActive = async (v: boolean) => {
    const res = await apiCall(`/api/admin/cms/presets/${preset.id}`, {
      method: "PATCH",
      body: { isActive: v },
    });
    if (res.ok) {
      toast.success(v ? "Now visible on shop" : "Hidden from shop");
      router.refresh();
    } else toast.error(res.error);
  };

  const remove = async () => {
    if (!confirm(`Delete "${preset.name}"? This cannot be undone.`)) return;
    const res = await apiCall(`/api/admin/cms/presets/${preset.id}`, {
      method: "DELETE",
    });
    if (res.ok) router.push("/admin/catalog/presets");
    else toast.error(res.error);
  };

  const dirty =
    JSON.stringify([...selected].sort()) !==
    JSON.stringify(preset.items.map((i) => i.variantId).sort());

  return (
    <Container maxWidth="md" sx={{ py: 4, pb: 12 }}>
      <Button
        size="small"
        component={Link}
        href="/admin/catalog/presets"
        startIcon={<ArrowBack />}
        sx={{ mb: 2 }}
      >
        All sets
      </Button>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack spacing={2}>
            <Stack
              direction="row"
              sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <Typography sx={{ fontWeight: 600 }}>Set details</Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={preset.isActive}
                    onChange={(e) => toggleActive(e.target.checked)}
                  />
                }
                label="Visible on shop"
              />
            </Stack>

            <TextField
              label="Name"
              fullWidth
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={2}
              value={form.description}
              placeholder="Everything you need to cook and eat from day one."
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
            <TextField
              label="Image URL (optional)"
              fullWidth
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            />

            <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
              <Button variant="contained" onClick={saveDetails}>
                Save details
              </Button>
              <Box sx={{ flexGrow: 1 }} />
              <Button
                color="error"
                startIcon={<DeleteOutlined />}
                onClick={remove}
              >
                Delete set
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      <Typography sx={{ fontWeight: 600, mb: 0.5 }}>
        Items in this set
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
        Pick one brand per product. Choosing a different brand replaces the
        current one.
      </Typography>

      {selected.length === 0 && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          Add at least one item before making this set visible.
        </Alert>
      )}

      <Stack spacing={1.5}>
        {catalog.map((cat) => {
          const chosen = cat.products.filter((p) =>
            p.variants.some((v) => selected.includes(v.id)),
          ).length;

          return (
            <Accordion
              key={cat.id}
              disableGutters
              sx={{
                borderRadius: 2,
                border: "1px solid #E5E7EB",
                boxShadow: "none",
                "&:before": { display: "none" },
                "&.Mui-expanded": { margin: 0 },
              }}
            >
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Stack
                  direction="row"
                  spacing={1.5}
                  sx={{ alignItems: "center", flexGrow: 1 }}
                >
                  <Typography sx={{ fontWeight: 600, flexGrow: 1 }}>
                    {cat.name}
                  </Typography>
                  {chosen > 0 && (
                    <Chip
                      size="small"
                      color="primary"
                      label={`${chosen} picked`}
                      sx={{ height: 22 }}
                    />
                  )}
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {cat.products.length}
                  </Typography>
                </Stack>
              </AccordionSummary>

              <AccordionDetails sx={{ pt: 0 }}>
                <Divider sx={{ mb: 2 }} />
                <Stack spacing={2}>
                  {cat.products.map((p) => (
                    <Box key={p.id}>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, mb: 0.75 }}
                      >
                        {p.name}
                      </Typography>
                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={1}
                      >
                        {p.variants.map((v) => {
                          const on = selected.includes(v.id);
                          return (
                            <Box
                              key={v.id}
                              onClick={() => pick(p.id, v.id)}
                              sx={{
                                flex: 1,
                                px: 1.5,
                                py: 1,
                                borderRadius: 1.5,
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                border: "1px solid",
                                borderColor: on ? "primary.main" : "#E5E7EB",
                                bgcolor: on
                                  ? "rgba(0,167,111,0.06)"
                                  : "transparent",
                              }}
                            >
                              <Checkbox
                                checked={on}
                                size="small"
                                sx={{ p: 0 }}
                                tabIndex={-1}
                              />
                              <Box sx={{ minWidth: 0 }}>
                                <Typography
                                  sx={{ fontSize: 13.5, fontWeight: 600 }}
                                  noWrap
                                >
                                  {v.brandName}
                                </Typography>
                                <Typography
                                  sx={{ fontSize: 12, color: "text.secondary" }}
                                >
                                  {npr(v.pricePaisa)} · {kg(v.weightGrams)}
                                </Typography>
                              </Box>
                            </Box>
                          );
                        })}
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Stack>

      {/* sticky save bar */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          bgcolor: "background.paper",
          borderTop: "1px solid #E5E7EB",
        }}
      >
        <Container maxWidth="md" sx={{ py: 2 }}>
          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography sx={{ fontWeight: 600 }}>
                {selected.length} items · {npr(totals.paisa)}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {kg(totals.grams)}
              </Typography>
            </Box>
            <Button
              variant="contained"
              size="large"
              onClick={saveItems}
              disabled={busy || !dirty}
            >
              {busy ? "Saving…" : dirty ? "Save items" : "Saved"}
            </Button>
          </Stack>
        </Container>
      </Box>
    </Container>
  );
}
