"use client";

import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  Chip,
  Radio,
  Alert,
  Divider,
} from "@mui/material";

const PLACEHOLDER = "https://placehold.co/200x200?text=%20";
const npr = (p: number) =>
  "NPR " + (p / 100).toLocaleString("en-IN", { maximumFractionDigits: 0 });
const kg = (g: number) => (g / 1000).toFixed(1) + " kg";

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
};

type Product = {
  name: string;
  description: string | null;
  contents: string | null;
  note: string | null;
  imageUrl: string | null;
  isActive: boolean;
  variants: Variant[];
};

export default function ShopPreview({ product }: { product: Product }) {
  const live = product.variants.filter((v) => v.isActive);
  const first = live[0];

  return (
    <Box>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 2 }}>
        <Typography sx={{ fontWeight: 600 }}>Shop preview</Typography>
        {!product.isActive && (
          <Chip
            size="small"
            color="warning"
            label="Hidden — students can't see this yet"
          />
        )}
      </Stack>

      {live.length === 0 ? (
        <Alert severity="warning">
          No visible brands — nothing would render on the shop.
        </Alert>
      ) : (
        <Stack spacing={2}>
          {/* selected-state card, as the student sees it */}
          <Card sx={{ borderColor: "primary.main" }}>
            <CardContent>
              <Stack direction="row" spacing={2}>
                <Box
                  component="img"
                  src={first.imageUrl || product.imageUrl || PLACEHOLDER}
                  alt=""
                  sx={{
                    width: 72,
                    height: 72,
                    objectFit: "cover",
                    borderRadius: 1.5,
                    border: "1px solid #ECECEC",
                    flexShrink: 0,
                  }}
                />
                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                  <Typography sx={{ fontWeight: 600 }}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {first.brandName}
                  </Typography>
                </Box>
              </Stack>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                sx={{ mt: 2 }}
              >
                {live.map((v, i) => (
                  <Box
                    key={v.id}
                    sx={{
                      flex: 1,
                      p: 1.5,
                      borderRadius: 2,
                      border: "1.5px solid",
                      borderColor: i === 0 ? "primary.main" : "#ECECEC",
                      bgcolor: i === 0 ? "rgba(27,94,32,0.04)" : "transparent",
                    }}
                  >
                    <Stack direction="row" spacing={1.5}>
                      <Radio
                        checked={i === 0}
                        size="small"
                        sx={{ p: 0, mt: 0.25 }}
                        readOnly
                      />
                      <Box
                        component="img"
                        src={v.imageUrl || product.imageUrl || PLACEHOLDER}
                        alt=""
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
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {v.brandName}
                        </Typography>
                        <Typography variant="body2">
                          {npr(v.pricePaisa)}
                          <Box
                            component="span"
                            sx={{ color: "text.secondary", ml: 1 }}
                          >
                            {kg(v.weightGrams)}
                          </Box>
                        </Typography>
                        <Stack
                          direction="row"
                          spacing={0.5}
                          sx={{ mt: 0.75, flexWrap: "wrap", gap: 0.5 }}
                        >
                          <Chip
                            size="small"
                            label={v.availability ?? "Available"}
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
                              sx={{ height: 20, fontSize: 11 }}
                            />
                          ))}
                        </Stack>
                      </Box>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>

          {/* details modal content */}
          <Card>
            <CardContent>
              <Typography variant="caption" color="text.secondary">
                Details modal
              </Typography>
              <Stack spacing={2} sx={{ mt: 1.5 }}>
                <Typography sx={{ fontWeight: 600 }}>{product.name}</Typography>

                {product.description ? (
                  <Typography variant="body2">{product.description}</Typography>
                ) : (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontStyle: "italic" }}
                  >
                    No description — students see an empty modal.
                  </Typography>
                )}

                {product.contents && (
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, mb: 0.5 }}
                    >
                      What&apos;s in the set
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.contents}
                    </Typography>
                  </Box>
                )}

                {product.note && <Alert severity="info">{product.note}</Alert>}

                <Divider />

                <Stack direction="row" spacing={2}>
                  {live.map((v) => (
                    <Box key={v.id} sx={{ flex: 1 }}>
                      <Box
                        component="img"
                        src={v.imageUrl || product.imageUrl || PLACEHOLDER}
                        alt=""
                        sx={{
                          width: "100%",
                          aspectRatio: "4/3",
                          objectFit: "cover",
                          borderRadius: 2,
                          border: "1px solid #ECECEC",
                          mb: 1,
                        }}
                      />
                      <Typography
                        variant="body2"
                        component="span"
                        sx={{ fontWeight: 600 }}
                      >
                        {v.brandName}
                        {v.tier === "PREMIUM" && (
                          <Chip
                            label="Premium"
                            size="small"
                            sx={{ ml: 1, height: 18, fontSize: 11 }}
                          />
                        )}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {npr(v.pricePaisa)} · {kg(v.weightGrams)}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      )}
    </Box>
  );
}
