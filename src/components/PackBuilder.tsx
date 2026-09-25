"use client";

import { useMemo, useState } from "react";
import type { Catalog, Presets } from "@/lib/catalog";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Checkbox,
  Stack,
  Box,
  Button,
  Radio,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Chip,
  Alert,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { npr, kg } from "@/lib/money";
import CheckoutDialog from "./CheckoutDialog";
import { Check, Close, Add } from "@mui/icons-material";

const LIMITS = [
  { label: "23 kg (1 bag)", grams: 23000 },
  { label: "30 kg", grams: 30000 },
  { label: "40 kg (2 bags)", grams: 40000 },
  { label: "46 kg (2 × 23)", grams: 46000 },
];

type Product = Catalog[number]["products"][number];
type Variant = Product["variants"][number];
type Pick = { variantId: string; qty: number };

const PLACEHOLDER = "https://placehold.co/200x200?text=%20";

export default function PackBuilder({
  catalog,
  presets,
}: {
  catalog: Catalog;
  presets: Presets;
}) {
  const [picked, setPicked] = useState<Record<string, Pick>>({});
  const [limit, setLimit] = useState(LIMITS[1].grams);
  const [preview, setPreview] = useState<Product | null>(null);
  const [checkout, setCheckout] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const allVariants = useMemo(() => {
    const m = new Map<string, Variant>();
    catalog.forEach((c) =>
      c.products.forEach((p) => p.variants.forEach((v) => m.set(v.id, v))),
    );
    return m;
  }, [catalog]);

  const totals = useMemo(() => {
    let paisa = 0,
      grams = 0,
      units = 0;
    Object.values(picked).forEach(({ variantId, qty }) => {
      const v = allVariants.get(variantId);
      if (v) {
        paisa += v.pricePaisa * qty;
        grams += v.weightGrams * qty;
        units += qty;
      }
    });
    return { paisa, grams, units, lines: Object.keys(picked).length };
  }, [picked, allVariants]);

  const presetState = (preset: Presets[number]) => {
    const total = preset.items.length;
    const applied = preset.items.filter(
      (i) => picked[i.variant.productId]?.variantId === i.variantId,
    ).length;
    const cost = preset.items.reduce(
      (s, i) => s + i.variant.pricePaisa * i.qty,
      0,
    );
    const grams = preset.items.reduce(
      (s, i) => s + i.variant.weightGrams * i.qty,
      0,
    );
    return { total, applied, cost, grams, full: applied === total };
  };

  const togglePreset = (preset: Presets[number]) => {
    const { full } = presetState(preset);
    setPicked((prev) => {
      const next = { ...prev };
      if (full) {
        preset.items.forEach((i) => {
          if (next[i.variant.productId]?.variantId === i.variantId) {
            delete next[i.variant.productId];
          }
        });
      } else {
        preset.items.forEach((i) => {
          next[i.variant.productId] = { variantId: i.variantId, qty: i.qty };
        });
        // open the categories the preset touches
        const cats = new Set(
          preset.items.map((i) => i.variant.product.category.id),
        );
        setExpanded((e) => {
          const ne = { ...e };
          cats.forEach((c) => (ne[c] = true));
          return ne;
        });
      }
      return next;
    });
  };

  const toggle = (p: Product) =>
    setPicked((prev) => {
      const next = { ...prev };
      if (next[p.id]) delete next[p.id];
      else
        next[p.id] = {
          variantId: p.variants[p.variants.length - 1].id,
          qty: 1,
        };
      return next;
    });

  const setVariant = (productId: string, variantId: string) =>
    setPicked((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], variantId },
    }));

  const bumpQty = (productId: string, delta: number) =>
    setPicked((prev) => {
      const cur = prev[productId];
      if (!cur) return prev;
      const qty = Math.min(10, Math.max(1, cur.qty + delta));
      return { ...prev, [productId]: { ...cur, qty } };
    });

  const pct = Math.min(100, (totals.grams / limit) * 100);
  const over = totals.grams > limit;

  // flatten selection into repeated variant ids for the API
  const variantIds = Object.values(picked).flatMap(({ variantId, qty }) =>
    Array.from({ length: qty }, () => variantId),
  );

  const selectFromModal = (productId: string, variantId: string) => {
    setPicked((prev) => ({
      ...prev,
      [productId]: { variantId, qty: prev[productId]?.qty ?? 1 },
    }));
    setPreview(null);
  };

  return (
    <Box sx={{ pb: 14, pt: { xs: 2, md: 4 } }}>
      <Container maxWidth="md" sx={{ py: { xs: 0, md: 3 } }}>
        <Stack spacing={1} sx={{ mb: 4, display: { xs: "none", md: "block" } }}>
          <Typography
            component="h1"
            sx={{
              fontWeight: 700,
              fontSize: { xs: 24, sm: 28, md: 34 },
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            Everything you need for Abroad Study
          </Typography>
          <Typography
            component="h2"
            color="text.secondary"
            sx={{
              fontWeight: 400,
              fontSize: { xs: 14, md: 15 },
              lineHeight: 1.6,
              opacity: 0.8,
            }}
          >
            Pick what you need. We source it, you inspect it in Kathmandu before
            paying the balance.
          </Typography>

          <Typography
            component={Link}
            href="/guide"
            sx={{
              fontSize: 14,
              fontWeight: 600,
              color: "primary.main",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Groceries and documents? See what to buy yourself →
          </Typography>
        </Stack>

        <Box
          sx={{
            mb: 2,
            mt: { xs: 2, md: 6 },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "flex-start", md: "center" },
            justifyContent: "space-between",
            gap: { xs: 1.5, md: 2 },
          }}
        >
          <Typography
            component="h2"
            sx={{
              fontWeight: 600,
              fontSize: { xs: 16, md: 18 },
              flexShrink: 0,
            }}
          >
            How many kg can you take?
          </Typography>
          <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
            {LIMITS.map((l) => (
              <Chip
                key={l.grams}
                label={l.label}
                color={limit === l.grams ? "primary" : "default"}
                variant={limit === l.grams ? "filled" : "outlined"}
                onClick={() => setLimit(l.grams)}
              />
            ))}
          </Stack>
        </Box>
        {presets.length > 0 && (
          <Box sx={{ mb: 5 }}>
            <Typography
              component="h2"
              sx={{ fontWeight: 700, fontSize: 18, mb: 0.5 }}
            >
              Start with a set
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
              Adds everything at once. You can remove anything you don&apos;t
              need afterwards.
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              {presets.map((p) => {
                const st = presetState(p);
                const partial = st.applied > 0 && !st.full;

                return (
                  <Box
                    key={p.id}
                    onClick={() => togglePreset(p)}
                    sx={{
                      flex: 1,
                      p: 2.5,
                      borderRadius: 3,
                      cursor: "pointer",
                      border: "1.5px solid",
                      borderColor: st.full ? "primary.main" : "#F0F1F3",
                      bgcolor: st.full ? "rgba(0,167,111,0.04)" : "#fff",
                      transition: "all .18s",
                      "&:hover": {
                        borderColor: st.full ? "primary.main" : "#DFE3E8",
                        boxShadow:
                          "0 1px 2px rgba(16,24,40,0.04), 0 12px 28px -12px rgba(16,24,40,0.14)",
                      },
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={1.5}
                      sx={{ alignItems: "flex-start", mb: 1 }}
                    >
                      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                        <Typography
                          sx={{
                            fontWeight: 700,
                            fontSize: 16,
                            lineHeight: 1.3,
                          }}
                        >
                          {p.name}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 13,
                            color: "text.secondary",
                            mt: 0.25,
                          }}
                        >
                          {st.total} items · {npr(st.cost)} · {kg(st.grams)}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          width: 26,
                          height: 26,
                          borderRadius: 99,
                          flexShrink: 0,
                          display: "grid",
                          placeItems: "center",
                          bgcolor: st.full ? "primary.main" : "transparent",
                          border: st.full ? "none" : "1.5px solid #DFE3E8",
                          color: "#fff",
                        }}
                      >
                        {st.full ? (
                          <Check sx={{ fontSize: 16 }} />
                        ) : (
                          <Add sx={{ fontSize: 16, color: "#919EAB" }} />
                        )}
                      </Box>
                    </Stack>

                    {p.description && (
                      <Typography
                        sx={{
                          fontSize: 13.5,
                          color: "text.secondary",
                          lineHeight: 1.55,
                        }}
                      >
                        {p.description}
                      </Typography>
                    )}

                    {partial && (
                      <Chip
                        size="small"
                        label={`${st.applied} of ${st.total} selected — tap to add the rest`}
                        sx={{
                          mt: 1.5,
                          height: 22,
                          fontSize: 11.5,
                          fontWeight: 600,
                          bgcolor: "rgba(0,167,111,0.10)",
                          color: "primary.dark",
                        }}
                      />
                    )}
                  </Box>
                );
              })}
            </Stack>
          </Box>
        )}
        {catalog.map((cat, ci) => {
          const chosen = cat.products.filter((p) => picked[p.id]).length;
          const open = expanded[cat.id] ?? ci === 0;

          return (
            <Accordion
              key={cat.id}
              expanded={open}
              onChange={() => setExpanded({ ...expanded, [cat.id]: !open })}
              disableGutters
              sx={{
                mb: 2,
                borderRadius: 0,
                bgcolor: "#fff",
                border: "1px solid",
                borderColor: open ? "#e7e9ee" : "#e7e9ee",
                boxShadow: open
                  ? "0 1px 2px rgba(16,24,40,0.04), 0 20px 48px -16px rgba(16,24,40,0.16)"
                  : "0 1px 2px rgba(16,24,40,0.03)",
                overflow: "hidden",
                position: "relative",
                transition: "box-shadow .25s, border-color .25s",
                "&:before": { display: "none" },
                "&.Mui-expanded": {
                  margin: "0 0 24px 0",
                },
                "&:hover": {
                  boxShadow:
                    "0 1px 2px rgba(16,24,40,0.04), 0 8px 20px -8px rgba(16,24,40,0.12)",
                },
                // left accent rail
                "&::after": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 4,
                  bgcolor: chosen > 0 ? "primary.main" : "transparent",
                  transition: "background-color .25s",
                },
              }}
            >
              <AccordionSummary
                expandIcon={null}
                sx={{
                  px: 3,
                  py: 1,
                  "& .MuiAccordionSummary-content": {
                    alignItems: "center",
                    gap: 2,
                    my: 2.25,
                  },
                }}
              >
                {/* index */}
                <Typography
                  component="h2"
                  sx={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: chosen > 0 ? "primary.main" : "#C4CDD5",
                    fontVariantNumeric: "tabular-nums",
                    minWidth: 18,
                  }}
                >
                  {String(ci + 1).padStart(2, "0")}
                </Typography>

                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                  <Typography
                    component="h2"
                    sx={{
                      fontWeight: 700,
                      fontSize: 17,
                      letterSpacing: "-0.01em",
                      lineHeight: 1.3,
                    }}
                  >
                    {cat.name}
                  </Typography>
                  <Link underline="none">{`${cat.products.length} items`}</Link>
                </Box>

                {chosen > 0 && (
                  <Chip
                    size="small"
                    label={`${chosen} item selected`}
                    color="warning"
                  />
                )}

                {/* toggle */}
                <Box
                  sx={{
                    width: 34,
                    height: 34,
                    borderRadius: 99,
                    flexShrink: 0,
                    display: "grid",
                    placeItems: "center",
                    border: "1px solid",
                    borderColor: open ? "transparent" : "#E6E9EC",
                    bgcolor: open ? "secondary.main" : "transparent",
                    color: open ? "#fff" : "#637381",
                    transition: "all .25s",
                  }}
                >
                  <ArrowDropDownIcon
                    sx={{
                      fontSize: 30,
                      transform: open ? "rotate(180deg)" : "none",
                      transition: "transform .25s",
                    }}
                  />
                </Box>
              </AccordionSummary>

              <AccordionDetails sx={{ p: 2, bgcolor: "#fff" }}>
                <Stack spacing={1.5}>
                  {cat.products.map((p) => {
                    const sel = picked[p.id];
                    const selVariant = sel
                      ? allVariants.get(sel.variantId)
                      : null;
                    const cheapest = p.variants[p.variants.length - 1];

                    return (
                      <Card
                        key={p.id}
                        sx={{
                          borderColor: sel ? "primary.main" : "#ECECEC",
                          transition: "border-color .15s",
                        }}
                      >
                        <CardContent>
                          {/* header */}
                          <Stack direction="row" spacing={2}>
                            <Checkbox
                              checked={!!sel}
                              onChange={() => toggle(p)}
                              sx={{ mt: -1, ml: -1, alignSelf: "flex-start" }}
                            />

                            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                              <Stack
                                direction="row"
                                sx={{
                                  justifyContent: "space-between",
                                  alignItems: "flex-start",
                                }}
                              >
                                <Box>
                                  <Typography
                                    component="h2"
                                    sx={{ fontWeight: 600 }}
                                  >
                                    {p.name}
                                  </Typography>
                                  <Typography
                                    component="h2"
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    {selVariant
                                      ? selVariant.brandName
                                      : `from ${npr(cheapest.pricePaisa)} · ${kg(cheapest.weightGrams)}`}
                                  </Typography>
                                </Box>
                                <Button
                                  size="small"
                                  onClick={() => setPreview(p)}
                                >
                                  Details
                                </Button>
                              </Stack>
                              {!sel && p.description && (
                                <Typography
                                  component="h2"
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{ mt: 0.5 }}
                                  noWrap
                                >
                                  {p.description}
                                </Typography>
                              )}
                            </Box>
                          </Stack>

                          {/* brand chooser */}
                          {sel && (
                            <>
                              <Stack
                                direction={{ xs: "column", sm: "row" }}
                                spacing={1.5}
                                sx={{ mt: 2 }}
                              >
                                {p.variants.map((v) => {
                                  const on = sel.variantId === v.id;
                                  return (
                                    <Box
                                      key={v.id}
                                      onClick={() => setVariant(p.id, v.id)}
                                      sx={{
                                        flex: 1,
                                        p: 1.5,
                                        cursor: "pointer",
                                        borderRadius: 2,
                                        border: "1.5px solid",
                                        borderColor: on
                                          ? "primary.main"
                                          : "#ECECEC",
                                        bgcolor: on
                                          ? "rgba(50, 161, 124, 0.15)"
                                          : "transparent",
                                        "&:hover": {
                                          borderColor: on
                                            ? "primary.main"
                                            : "#D0D0D0",
                                        },
                                      }}
                                    >
                                      <Stack direction="row" spacing={1.5}>
                                        <Radio
                                          checked={on}
                                          size="small"
                                          sx={{ p: 0, mt: 0.25 }}
                                        />
                                        <Box
                                          component="img"
                                          src={
                                            v.imageUrl ||
                                            p.imageUrl ||
                                            PLACEHOLDER
                                          }
                                          alt={`${p.name} — ${v.brandName}`}
                                          sx={{
                                            width: 56,
                                            height: 56,
                                            objectFit: "cover",
                                            borderRadius: 1,
                                            border: "1px solid #ECECEC",
                                            flexShrink: 0,
                                          }}
                                        />
                                        <Box sx={{ minWidth: 0 }}>
                                          <Typography
                                            component="h2"
                                            variant="body2"
                                            sx={{ fontWeight: 600 }}
                                          >
                                            {v.brandName}
                                          </Typography>
                                          <Typography
                                            component="h2"
                                            variant="body2"
                                          >
                                            {npr(v.pricePaisa)}
                                            <Box
                                              component="span"
                                              sx={{
                                                color: "text.secondary",
                                                ml: 1,
                                              }}
                                            >
                                              {kg(v.weightGrams)}
                                            </Box>
                                          </Typography>
                                          <Stack
                                            direction="row"
                                            spacing={0.5}
                                            sx={{
                                              mt: 0.75,
                                              flexWrap: "wrap",
                                              gap: 0.5,
                                            }}
                                          >
                                            <Chip
                                              size="small"
                                              label={
                                                v.availability ?? "Available"
                                              }
                                              color={
                                                v.availability === "Available"
                                                  ? "success"
                                                  : "warning"
                                              }
                                              variant="outlined"
                                              sx={{ height: 20, fontSize: 11 }}
                                            />
                                            {(v.tags ?? []).map((t) => (
                                              <Chip
                                                key={t}
                                                size="small"
                                                label={t}
                                                sx={{
                                                  height: 20,
                                                  fontSize: 11,
                                                }}
                                              />
                                            ))}
                                          </Stack>
                                        </Box>
                                      </Stack>
                                    </Box>
                                  );
                                })}
                              </Stack>

                              {/* qty + line total */}
                              <Stack
                                direction="row"
                                spacing={2}
                                sx={{ alignItems: "center", mt: 2 }}
                              >
                                <Stack
                                  direction="row"
                                  sx={{
                                    alignItems: "center",
                                    border: "1px solid #ECECEC",
                                    borderRadius: 1.5,
                                  }}
                                >
                                  <IconButton
                                    size="small"
                                    onClick={() => bumpQty(p.id, -1)}
                                    disabled={sel.qty <= 1}
                                  >
                                    <RemoveIcon fontSize="small" />
                                  </IconButton>
                                  <Typography
                                    component="h3"
                                    sx={{ minWidth: 24, textAlign: "center" }}
                                  >
                                    {sel.qty}
                                  </Typography>
                                  <IconButton
                                    size="small"
                                    onClick={() => bumpQty(p.id, 1)}
                                    disabled={sel.qty >= 10}
                                  >
                                    <AddIcon fontSize="small" />
                                  </IconButton>
                                </Stack>
                                <Typography
                                  component="h3"
                                  sx={{ fontWeight: 600 }}
                                >
                                  {npr((selVariant?.pricePaisa ?? 0) * sel.qty)}
                                </Typography>
                                <Typography
                                  component="h3"
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {kg((selVariant?.weightGrams ?? 0) * sel.qty)}
                                </Typography>
                              </Stack>
                            </>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </Stack>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Container>

      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          bgcolor: "background.paper",
          borderTop: "1px solid #ECECEC",
          zIndex: 10,
        }}
      >
        <LinearProgress
          variant="determinate"
          value={pct}
          color={over ? "error" : "primary"}
          sx={{ height: 4 }}
        />
        <Container maxWidth="md" sx={{ py: 2 }}>
          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography component="h6" variant="h6">
                {npr(totals.paisa)}
              </Typography>
              <Typography
                variant="body2"
                color={over ? "error.main" : "text.secondary"}
              >
                {kg(totals.grams)} of {kg(limit)} · {totals.units} items
              </Typography>
            </Box>
            <Button
              variant="contained"
              size="large"
              disabled={totals.lines === 0}
              onClick={() => setCheckout(true)}
            >
              Continue
            </Button>
          </Stack>
        </Container>
      </Box>

      <Dialog
        open={!!preview}
        onClose={() => setPreview(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            px: { xs: 2, md: 4 },
            pr: { xs: 7, md: 8 },
            display: "flex",
            alignItems: "center",
          }}
        >
          {preview?.name}
          <IconButton
            onClick={() => setPreview(null)}
            sx={{
              position: "absolute",
              right: { xs: 8, md: 16 },
              top: 12,
              color: "text.secondary",
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ px: { xs: 2, md: 4 }, pb: 3 }}>
          <Stack spacing={3}>
            {preview?.description && (
              <Typography
                sx={{ fontSize: 15, lineHeight: 1.7, color: "text.secondary" }}
              >
                {preview.description}
              </Typography>
            )}

            {preview?.contents && (
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2.5,
                  bgcolor: "#FAFBFA",
                }}
              >
                <Typography sx={{ fontWeight: 600, fontSize: 14, mb: 0.75 }}>
                  What&apos;s in the set
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", lineHeight: 1.65 }}
                >
                  {preview.contents}
                </Typography>
              </Box>
            )}

            {preview?.note && (
              <Alert severity="info" sx={{ borderRadius: 2.5, fontSize: 13.5 }}>
                {preview.note}
              </Alert>
            )}

            <Box>
              <Typography sx={{ fontWeight: 600, fontSize: 14, mb: 1.5 }}>
                Choose your brand
              </Typography>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                {preview?.variants.map((v) => (
                  <Box
                    key={v.id}
                    onClick={() => selectFromModal(preview.id, v.id)}
                    sx={{
                      flex: 1,
                      borderRadius: 3,
                      border: "1.5px solid",
                      borderColor:
                        picked[preview.id]?.variantId === v.id
                          ? "primary.main"
                          : "#F0F1F3",
                      overflow: "hidden",
                      bgcolor: "#fff",
                      cursor: "pointer",
                      position: "relative",
                      transition:
                        "border-color .2s, box-shadow .2s, transform .2s",
                      "&:hover": {
                        borderColor:
                          picked[preview.id]?.variantId === v.id
                            ? "primary.main"
                            : "#DFE3E8",
                        boxShadow:
                          "0 1px 2px rgba(16,24,40,0.04), 0 12px 28px -10px rgba(16,24,40,0.14)",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <Box sx={{ position: "relative" }}>
                      <Box
                        component="img"
                        src={v.imageUrl || preview.imageUrl || PLACEHOLDER}
                        alt={v.brandName}
                        sx={{
                          width: "100%",
                          aspectRatio: "4/3",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                      {v.tier === "PREMIUM" && (
                        <Chip
                          label="Premium"
                          size="small"
                          sx={{
                            position: "absolute",
                            top: 10,
                            left: 10,
                            height: 22,
                            fontSize: 11,
                            fontWeight: 600,
                            bgcolor: "rgba(28,37,46,0.88)",
                            color: "#fff",
                            backdropFilter: "blur(4px)",
                          }}
                        />
                      )}
                    </Box>

                    <Stack spacing={1.25} sx={{ p: 2 }}>
                      {picked[preview.id]?.variantId === v.id && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: 10,
                            right: 10,
                            width: 26,
                            height: 26,
                            borderRadius: 99,
                            bgcolor: "primary.main",
                            display: "grid",
                            placeItems: "center",
                            boxShadow: "0 2px 8px rgba(0,167,111,0.4)",
                          }}
                        >
                          <Check sx={{ fontSize: 16, color: "#fff" }} />
                        </Box>
                      )}
                      <Box>
                        <Typography
                          sx={{
                            fontWeight: 600,
                            fontSize: 14.5,
                            lineHeight: 1.35,
                          }}
                        >
                          {v.brandName}
                        </Typography>
                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{ alignItems: "baseline", mt: 0.5 }}
                        >
                          <Typography
                            sx={{
                              fontWeight: 700,
                              fontSize: 17,
                              letterSpacing: "-0.01em",
                            }}
                          >
                            {npr(v.pricePaisa)}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                          >
                            {kg(v.weightGrams)}
                          </Typography>
                        </Stack>
                      </Box>

                      <Stack spacing={0.75}>
                        <Stack
                          direction="row"
                          spacing={0.75}
                          sx={{ alignItems: "center" }}
                        >
                          <Box
                            sx={{
                              width: 6,
                              height: 6,
                              borderRadius: 99,
                              bgcolor:
                                (v.availability ?? "Available") === "Available"
                                  ? "primary.main"
                                  : "warning.main",
                              flexShrink: 0,
                            }}
                          />
                          <Typography
                            sx={{ fontSize: 12.5, color: "text.secondary" }}
                          >
                            {v.availability ?? "Available"}
                          </Typography>
                        </Stack>

                        {(v.tags ?? []).map((t) => (
                          <Stack
                            key={t}
                            direction="row"
                            spacing={0.75}
                            sx={{ alignItems: "center" }}
                          >
                            <Check
                              sx={{
                                fontSize: 13,
                                color: "primary.main",
                                flexShrink: 0,
                              }}
                            />
                            <Typography
                              sx={{ fontSize: 12.5, color: "text.secondary" }}
                            >
                              {t}
                            </Typography>
                          </Stack>
                        ))}
                      </Stack>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ pb: 2, pr: 3 }}>
          <Button variant="outlined" onClick={() => setPreview(null)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <CheckoutDialog
        open={checkout}
        onClose={() => setCheckout(false)}
        variantIds={variantIds}
        totalPaisa={totals.paisa}
        totalGrams={totals.grams}
      />
    </Box>
  );
}
