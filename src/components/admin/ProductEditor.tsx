"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Card,
  CardContent,
  Stack,
  TextField,
  Button,
  Typography,
  Alert,
  Switch,
  FormControlLabel,
  Divider,
  Box,
  IconButton,
  Chip,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ShopPreview from "./ShopPreview";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { useToast } from "./ToastProvider";
import { apiCall } from "@/lib/api-client";

type Variant = {
  id: string;
  brandName: string;
  tier: string;
  pricePaisa: number;
  weightGrams: number;
  imageUrl: string | null;
  availability: string;
  tags: string[];
  isActive: boolean;
  _count: { orderLines: number };
};

type Product = {
  id: string;
  name: string;
  description: string | null;
  contents: string | null;
  note: string | null;
  imageUrl: string | null;
  isActive: boolean;
  category: { name: string; slug: string };
  variants: Variant[];
};

export default function ProductEditor({ product }: { product: Product }) {
  const router = useRouter();
  const toast = useToast();
  const [err, setErr] = useState("");
  const [saved, setSaved] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const [form, setForm] = useState({
    name: product.name,
    description: product.description ?? "",
    contents: product.contents ?? "",
    note: product.note ?? "",
    imageUrl: product.imageUrl ?? "",
  });

  const saveProduct = async () => {
    const res = await apiCall(`/api/admin/cms/products/${product.id}`, {
      method: "PATCH",
      body: form,
    });
    if (res.ok) {
      toast.success("Product saved");
      router.refresh();
    } else toast.error(res.error);
  };

  const toggleActive = async (v: boolean) => {
    const res = await apiCall(`/api/admin/cms/products/${product.id}`, {
      method: "PATCH",
      body: { isActive: v },
    });
    if (res.ok) {
      toast.success(v ? "Now visible on shop" : "Hidden from shop");
      router.refresh();
    } else toast.error(res.error);
  };

  const addVariant = async () => {
    const res = await apiCall("/api/admin/cms/variants", {
      method: "POST",
      body: { productId: product.id, brandName: "New brand", tier: "VALUE" },
    });
    if (res.ok) {
      toast.success("Brand added");
      router.refresh();
    } else toast.error(res.error);
  };
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button
        size="small"
        component={Link}
        href={`/admin/catalog/${product.category.slug}`}
        sx={{ mb: 2 }}
        startIcon={<ArrowBackIcon />}
      >
        {product.category.name}
      </Button>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack spacing={2}>
            <Stack
              direction="row"
              sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <Typography sx={{ fontWeight: 600 }}>Product</Typography>
              <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                <Button size="small" onClick={() => setShowPreview(true)}>
                  Show preview
                </Button>
                <FormControlLabel
                  control={
                    <Switch
                      checked={product.isActive}
                      onChange={(e) => toggleActive(e.target.checked)}
                    />
                  }
                  label="Visible on shop"
                />
              </Stack>
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
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
            <TextField
              label="Contents (for sets)"
              fullWidth
              value={form.contents}
              placeholder="4 plates, 4 bowls, 4 spoons…"
              onChange={(e) => setForm({ ...form, contents: e.target.value })}
            />
            <TextField
              label="Note / warning"
              fullWidth
              multiline
              rows={2}
              value={form.note}
              placeholder="Customs restrictions, prescription requirements…"
              onChange={(e) => setForm({ ...form, note: e.target.value })}
            />
            <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
              <TextField
                label="Image URL"
                fullWidth
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              />
              <Box
                component="img"
                src={form.imageUrl || "https://placehold.co/80x80?text=%20"}
                alt=""
                sx={{
                  width: 56,
                  height: 56,
                  objectFit: "cover",
                  borderRadius: 1,
                  border: "1px solid #E5E7EB",
                }}
              />
            </Stack>

            <Box>
              <Button variant="contained" onClick={saveProduct}>
                Save product
              </Button>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "center", mb: 2 }}
      >
        <Typography sx={{ fontWeight: 600 }}>Brand options</Typography>
        <Button onClick={addVariant}>Add brand</Button>
      </Stack>

      <Stack spacing={2}>
        {product.variants.map((v, index) => (
          <VariantRow key={v.id} index={index + 1} variant={v} />
        ))}
        {product.variants.length === 0 && (
          <Alert severity="warning">
            Add at least one brand before making this product visible.
          </Alert>
        )}
      </Stack>
      <Dialog
        open={showPreview}
        onClose={() => setShowPreview(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Shop preview</DialogTitle>
        <DialogContent dividers>
          <ShopPreview product={product} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPreview(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

function VariantRow({ variant, index }: { variant: Variant; index: number }) {
  const router = useRouter();
  const toast = useToast();
  const [v, setV] = useState({
    brandName: variant.brandName,
    tier: variant.tier,
    priceNpr: (variant.pricePaisa / 100).toString(),
    weightGrams: variant.weightGrams.toString(),
    imageUrl: variant.imageUrl ?? "",
    availability: variant.availability ?? "Available",
    tags: (variant.tags ?? []).join(", "),
  });
  const [busy, setBusy] = useState(false);

  const save = async () => {
    setBusy(true);
    const res = await apiCall(`/api/admin/cms/variants/${variant.id}`, {
      method: "PATCH",
      body: {
        ...v,
        tags: v.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      },
    });
    if (res.ok) {
      toast.success(`${v.brandName} saved`);
      router.refresh();
    } else toast.error(res.error);
    setBusy(false);
  };

  const toggle = async (isActive: boolean) => {
    const res = await apiCall(`/api/admin/cms/variants/${variant.id}`, {
      method: "PATCH",
      body: { isActive },
    });
    if (res.ok) {
      toast.success(isActive ? "Brand visible" : "Brand hidden");
      router.refresh();
    } else toast.error(res.error);
  };

  const remove = async () => {
    if (!confirm(`Delete "${variant.brandName}"? This cannot be undone.`))
      return;
    const res = await apiCall(`/api/admin/cms/variants/${variant.id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      toast.success("Brand deleted");
      router.refresh();
    } else toast.error(res.error);
  };

  return (
    <Card sx={{ opacity: variant.isActive ? 1 : 0.6 }}>
      <CardContent>
        <Stack spacing={2}>
          <Typography sx={{ fontWeight: 600, fontSize: "1.25rem" }}>
            Brand {index}
          </Typography>
          <Divider />

          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            <Box
              component="img"
              src={v.imageUrl || "https://placehold.co/80x80?text=%20"}
              alt=""
              sx={{
                width: 48,
                height: 48,
                objectFit: "cover",
                borderRadius: 1,
                border: "1px solid #E5E7EB",
              }}
            />
            <TextField
              label="Brand name"
              size="small"
              fullWidth
              value={v.brandName}
              onChange={(e) => setV({ ...v, brandName: e.target.value })}
            />
            <FormControl size="small" sx={{ minWidth: 130 }}>
              <InputLabel>Tier</InputLabel>
              <Select
                label="Tier"
                value={v.tier}
                onChange={(e) => setV({ ...v, tier: e.target.value })}
              >
                <MenuItem value="PREMIUM">Premium</MenuItem>
                <MenuItem value="VALUE">Value</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="Price (NPR)"
              size="small"
              type="number"
              value={v.priceNpr}
              onChange={(e) => setV({ ...v, priceNpr: e.target.value })}
            />
            <TextField
              label="Weight (grams)"
              size="small"
              type="number"
              value={v.weightGrams}
              onChange={(e) => setV({ ...v, weightGrams: e.target.value })}
            />
            <TextField
              label="Availability"
              size="small"
              value={v.availability}
              placeholder="Available / 2–3 days"
              onChange={(e) => setV({ ...v, availability: e.target.value })}
            />
          </Stack>

          <TextField
            label="Image URL"
            size="small"
            fullWidth
            value={v.imageUrl}
            onChange={(e) => setV({ ...v, imageUrl: e.target.value })}
          />
          <TextField
            label="Tags (comma separated)"
            size="small"
            fullWidth
            value={v.tags}
            placeholder="100% original, 10 days replacement"
            onChange={(e) => setV({ ...v, tags: e.target.value })}
          />

          <Stack
            direction="row"
            spacing={2}
            sx={{ alignItems: "center", paddingY: "8px" }}
          >
            <Button
              variant="contained"
              size="small"
              onClick={save}
              disabled={busy}
            >
              Save brand
            </Button>
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  checked={variant.isActive}
                  onChange={(e) => toggle(e.target.checked)}
                />
              }
              label="Visible"
            />
            <Box sx={{ flexGrow: 1 }} />
            {variant._count.orderLines > 0 ? (
              <Chip
                size="small"
                label={`In ${variant._count.orderLines} order(s)`}
              />
            ) : (
              <IconButton size="small" color="error" onClick={remove}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            )}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
