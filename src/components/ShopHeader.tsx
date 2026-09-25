"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Stack,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { PhoneOutlined, ExpandMore, Phone } from "@mui/icons-material";

const ink = "#1C252E";
const muted = "#637381";

const PHONE = "9840953995";
const PHONE_INTL = "+9779840953995";

const NAV = [
  { label: "How it works", href: "/#how" },
  { label: "Packing guide", href: "/guide" },
  { label: "Our office", href: "/#office" },
  { label: "My orders", href: "/find-order" },
];

export default function ShopHeader() {
  const pathname = usePathname();
  const onBuild = pathname.startsWith("/build");
  const [contactAnchor, setContactAnchor] = useState<null | HTMLElement>(null);

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: "rgba(255,255,255,0.82)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid",
        borderColor: "rgba(16,24,40,0.06)",
      }}
    >
      <Toolbar
        sx={{ maxWidth: 1200, mx: "auto", width: "100%", px: { xs: 2, md: 3 } }}
      >
        <Typography
          component={Link}
          href="/"
          sx={{
            fontWeight: 700,
            fontSize: { xs: 20, md: 30 },
            letterSpacing: "-0.02em",
            color: ink,
            textDecoration: "none",
            mr: { xs: 0, md: 5 },
          }}
        >
          Abroad
          <Box component="span" sx={{ color: "primary.main" }}>
            Pack
          </Box>
        </Typography>

        <Stack
          direction="row"
          spacing={3}
          sx={{ flexGrow: 1, pl: 3, display: { xs: "none", md: "flex" } }}
        >
          {NAV.map((l) => (
            <Typography
              key={l.href}
              component={Link}
              href={l.href}
              sx={{
                fontSize: 14.5,
                fontWeight: 500,
                color: muted,
                textDecoration: "none",
                "&:hover": { color: ink },
                transition: "color .15s",
              }}
            >
              {l.label}
            </Typography>
          ))}
        </Stack>

        <Box sx={{ flexGrow: { xs: 1, md: 0 } }} />

        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
          <IconButton
            onClick={(e) => setContactAnchor(e.currentTarget)}
            sx={{
              display: { xs: "inline-flex", sm: "none" },
              color: "primary.main",
            }}
          >
            <PhoneOutlined sx={{ fontSize: 21 }} />
            <ExpandMore color="secondary" sx={{ fontSize: 14 }} />
          </IconButton>
          <Stack
            component="button"
            onClick={(e: React.MouseEvent<HTMLElement>) =>
              setContactAnchor(e.currentTarget)
            }
            direction="row"
            spacing={0.75}
            sx={{
              alignItems: "center",
              color: ink,
              display: { xs: "none", sm: "flex" },
              border: "none",
              bgcolor: "transparent",
              cursor: "pointer",
              p: 0,
              font: "inherit",
              "&:hover .num": { color: "primary.main" },
            }}
          >
            <PhoneOutlined sx={{ fontSize: 17, color: "primary.main" }} />
            <Typography
              className="num"
              sx={{ fontSize: 14.5, fontWeight: 600, transition: "color .15s" }}
            >
              {PHONE}
            </Typography>
            <ExpandMore sx={{ fontSize: 16, color: muted }} />
          </Stack>

          <Menu
            anchorEl={contactAnchor}
            open={!!contactAnchor}
            onClose={() => setContactAnchor(null)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            slotProps={{
              paper: {
                sx: {
                  mt: 1,
                  minWidth: 230,
                  borderRadius: 3,
                  boxShadow:
                    "0 1px 2px rgba(16,24,40,0.04), 0 16px 40px -12px rgba(16,24,40,0.18)",
                  border: "1px solid #F0F1F3",
                },
              },
            }}
          >
            <MenuItem
              component="a"
              href={`tel:${PHONE_INTL}`}
              onClick={() => setContactAnchor(null)}
              sx={{ py: 1.5, gap: 1.75 }}
            >
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: 99,
                  flexShrink: 0,
                  bgcolor: "rgba(0,167,111,0.10)",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <Phone sx={{ fontSize: 18, color: "primary.main" }} />
              </Box>
              <Box>
                <Typography sx={{ fontSize: 14.5, fontWeight: 600 }}>
                  Call us
                </Typography>
                <Typography sx={{ fontSize: 12.5, color: muted }}>
                  Sun–Fri, 10am–6pm
                </Typography>
              </Box>
            </MenuItem>

            <MenuItem
              component="a"
              href={`https://wa.me/977${PHONE}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setContactAnchor(null)}
              sx={{ py: 1.5, gap: 1.75 }}
            >
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: 99,
                  flexShrink: 0,
                  bgcolor: "rgba(37,211,102,0.12)",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <Box
                  component="svg"
                  viewBox="0 0 24 24"
                  sx={{ width: 19, height: 19, fill: "#25D366" }}
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.896 9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.892c0 2.096.549 4.142 1.595 5.945L0 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411" />
                </Box>
              </Box>
              <Box>
                <Typography sx={{ fontSize: 14.5, fontWeight: 600 }}>
                  WhatsApp
                </Typography>
                <Typography sx={{ fontSize: 12.5, color: muted }}>
                  Usually replies fast
                </Typography>
              </Box>
            </MenuItem>
          </Menu>

          {!onBuild && (
            <Button
              component={Link}
              href="/build"
              variant="contained"
              sx={{ borderRadius: 99, px: 2.5, whiteSpace: "nowrap" }}
            >
              Build my pack
            </Button>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
