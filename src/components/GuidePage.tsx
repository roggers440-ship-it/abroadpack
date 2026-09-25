/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Container,
  Typography,
  Box,
  Stack,
  Alert,
  Button,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  LinearProgress,
  Divider,
} from "@mui/material";
import { ExpandMore, Close, ArrowForward } from "@mui/icons-material";
import { SECTIONS } from "@/lib/guide";

const ink = "#1C252E";
const muted = "#637381";
const STORE_KEY = "ap_guide_checked";

export default function GuidePage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) setChecked(JSON.parse(raw));
    } catch {
      /* private mode */
    }
    setMounted(true);
  }, []);

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(STORE_KEY, JSON.stringify(next));
      } catch {
        /* private mode */
      }
      return next;
    });
  };

  const allIds = useMemo(
    () =>
      SECTIONS.flatMap((s) =>
        s.groups.flatMap((g) => g.items.map((i) => i.id)),
      ),
    [],
  );
  const doneCount = allIds.filter((id) => checked[id]).length;
  const pct = allIds.length ? (doneCount / allIds.length) * 100 : 0;

  // highlight the section currently on screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-100px 0px -60% 0px" },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const sectionProgress = (sectionId: string) => {
    const s = SECTIONS.find((x) => x.id === sectionId);
    if (!s) return { done: 0, total: 0 };
    const ids = s.groups.flatMap((g) => g.items.map((i) => i.id));
    return { done: ids.filter((id) => checked[id]).length, total: ids.length };
  };

  return (
    <Box sx={{ color: ink }}>
      {/* header */}
      <Box sx={{ bgcolor: "#FAFBFA" }}>
        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 9 } }}>
          <Stack spacing={2} sx={{ maxWidth: 700 }}>
            <Typography
              component="h1"
              sx={{
                fontWeight: 700,
                fontSize: { xs: 32, md: 46 },
                letterSpacing: "-0.03em",
                lineHeight: 1.08,
              }}
            >
              Before you fly
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: 16, md: 18 },
                color: muted,
                lineHeight: 1.65,
              }}
            >
              The full checklist for a Nepali student going abroad — documents,
              food, winter clothes, money, and the first week after you land.
              Tick things off as you go; it saves on this device.
            </Typography>
            <Typography sx={{ fontSize: 14, color: muted }}>
              We don&apos;t sell most of this. Buy it yourself — this is just
              the list nobody gives you.
            </Typography>
          </Stack>

          {/* progress */}
          {mounted && (
            <Box sx={{ mt: 4, maxWidth: 420 }}>
              <Stack
                direction="row"
                sx={{ justifyContent: "space-between", mb: 1 }}
              >
                <Typography sx={{ fontSize: 13.5, fontWeight: 600 }}>
                  {doneCount} of {allIds.length} done
                </Typography>
                <Typography sx={{ fontSize: 13.5, color: muted }}>
                  {Math.round(pct)}%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={pct}
                sx={{ height: 6, borderRadius: 99, bgcolor: "#EDEFF1" }}
              />
            </Box>
          )}
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 4, md: 7 }}
        >
          {/* sticky nav — desktop */}
          <Box
            component="nav"
            sx={{
              display: { xs: "none", md: "block" },
              width: 230,
              flexShrink: 0,
              alignSelf: "flex-start",
              position: "sticky",
              top: 96,
            }}
          >
            <Stack spacing={0.5}>
              {SECTIONS.map((s) => {
                const p = sectionProgress(s.id);
                const active = activeSection === s.id;
                return (
                  <Box
                    key={s.id}
                    component="a"
                    href={`#${s.id}`}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      px: 1.5,
                      py: 1,
                      borderRadius: 2,
                      textDecoration: "none",
                      bgcolor: active ? "rgba(0,167,111,0.08)" : "transparent",
                      transition: "background-color .15s",
                      "&:hover": {
                        bgcolor: active ? "rgba(0,167,111,0.08)" : "#F4F6F8",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 14.5,
                        fontWeight: active ? 600 : 500,
                        color: active ? "primary.dark" : muted,
                        flexGrow: 1,
                      }}
                    >
                      {s.title}
                    </Typography>
                    {mounted && p.done > 0 && (
                      <Typography
                        sx={{
                          fontSize: 11.5,
                          fontWeight: 600,
                          color: p.done === p.total ? "primary.main" : muted,
                        }}
                      >
                        {p.done}/{p.total}
                      </Typography>
                    )}
                  </Box>
                );
              })}
            </Stack>
          </Box>

          {/* sections */}
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Stack spacing={2}>
              {SECTIONS.map((s, si) => {
                const p = sectionProgress(s.id);
                const isOpen = open[s.id] ?? si === 0;

                return (
                  <Accordion
                    key={s.id}
                    id={s.id}
                    expanded={isOpen}
                    onChange={() => setOpen({ ...open, [s.id]: !isOpen })}
                    disableGutters
                    sx={{
                      scrollMarginTop: 90,
                      borderRadius: 0,
                      bgcolor: "#fff",
                      border: "1px solid #F0F1F3",
                      boxShadow: isOpen
                        ? "0 1px 2px rgba(16,24,40,0.04), 0 16px 40px -14px rgba(16,24,40,0.14)"
                        : "none",
                      overflow: "hidden",
                      transition: "box-shadow .2s",
                      "&:before": { display: "none" },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                      sx={{
                        px: { xs: 2, md: 3 },
                        "& .MuiAccordionSummary-content": { my: 2 },
                      }}
                    >
                      <Box sx={{ flexGrow: 1, minWidth: 0, pr: 2 }}>
                        <Stack
                          direction="row"
                          spacing={1.5}
                          sx={{ alignItems: "center" }}
                        >
                          <Typography
                            component="h2"
                            sx={{
                              fontWeight: 700,
                              fontSize: { xs: 17, md: 19 },
                              letterSpacing: "-0.01em",
                            }}
                          >
                            {s.title}
                          </Typography>
                          {mounted && p.done === p.total && p.total > 0 && (
                            <Box
                              sx={{
                                px: 1,
                                py: 0.25,
                                borderRadius: 99,
                                bgcolor: "rgba(0,167,111,0.10)",
                                fontSize: 11.5,
                                fontWeight: 700,
                                color: "primary.dark",
                              }}
                            >
                              Done
                            </Box>
                          )}
                        </Stack>
                        <Typography
                          sx={{ fontSize: 13.5, color: muted, mt: 0.25 }}
                        >
                          {s.subtitle}
                          {mounted && p.total > 0 && ` · ${p.done}/${p.total}`}
                        </Typography>
                      </Box>
                    </AccordionSummary>

                    <AccordionDetails
                      sx={{ px: { xs: 2, md: 3 }, pt: 0, pb: 3 }}
                    >
                      <Divider sx={{ mb: 2.5, borderColor: "#F4F6F8" }} />

                      {s.intro && (
                        <Typography
                          sx={{
                            fontSize: 15,
                            color: muted,
                            lineHeight: 1.7,
                            mb: 3,
                          }}
                        >
                          {s.intro}
                        </Typography>
                      )}

                      {s.warning && (
                        <Alert
                          severity="error"
                          sx={{ borderRadius: 2.5, mb: 3 }}
                        >
                          <Typography
                            component="h3"
                            sx={{ fontWeight: 700, fontSize: 15, mb: 1 }}
                          >
                            {s.warning.title}
                          </Typography>
                          <Stack spacing={0.75}>
                            {s.warning.items.map((w) => (
                              <Stack
                                key={w}
                                direction="row"
                                spacing={1}
                                sx={{ alignItems: "flex-start" }}
                              >
                                <Close
                                  sx={{ fontSize: 15, mt: 0.35, flexShrink: 0 }}
                                />
                                <Typography
                                  sx={{ fontSize: 14, lineHeight: 1.6 }}
                                >
                                  {w}
                                </Typography>
                              </Stack>
                            ))}
                          </Stack>
                          {s.warning.footer && (
                            <Typography
                              sx={{
                                fontSize: 13,
                                mt: 1.5,
                                opacity: 0.9,
                                lineHeight: 1.6,
                              }}
                            >
                              {s.warning.footer}
                            </Typography>
                          )}
                        </Alert>
                      )}

                      <Stack spacing={3.5}>
                        {s.groups.map((g) => (
                          <Box key={g.title}>
                            <Typography
                              component="h3"
                              sx={{
                                fontWeight: 700,
                                fontSize: 15.5,
                                mb: g.note ? 0.5 : 1.5,
                              }}
                            >
                              {g.title}
                            </Typography>
                            {g.note && (
                              <Typography
                                sx={{
                                  fontSize: 13.5,
                                  color: muted,
                                  mb: 1.5,
                                  lineHeight: 1.6,
                                }}
                              >
                                {g.note}
                              </Typography>
                            )}

                            <Stack spacing={0}>
                              {g.items.map((item) => {
                                const on = !!checked[item.id];
                                return (
                                  <Box
                                    key={item.id}
                                    onClick={() => toggle(item.id)}
                                    sx={{
                                      display: "flex",
                                      alignItems: "flex-start",
                                      gap: 1,
                                      py: 1,
                                      px: 1,
                                      ml: -1,
                                      borderRadius: 2,
                                      cursor: "pointer",
                                      "&:hover": { bgcolor: "#FAFBFA" },
                                    }}
                                  >
                                    <Checkbox
                                      checked={mounted && on}
                                      size="small"
                                      sx={{ p: 0, mt: 0.25 }}
                                      tabIndex={-1}
                                    />
                                    <Box sx={{ minWidth: 0 }}>
                                      <Typography
                                        sx={{
                                          fontSize: 15,
                                          lineHeight: 1.55,
                                          color: mounted && on ? muted : ink,
                                          textDecoration:
                                            mounted && on
                                              ? "line-through"
                                              : "none",
                                          transition: "color .15s",
                                        }}
                                      >
                                        {item.text}
                                      </Typography>
                                      {item.note && (
                                        <Typography
                                          sx={{
                                            fontSize: 13,
                                            color: muted,
                                            mt: 0.25,
                                            lineHeight: 1.55,
                                          }}
                                        >
                                          {item.note}
                                        </Typography>
                                      )}
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

            {/* cta */}
            <Box
              sx={{
                mt: 5,
                p: { xs: 3, md: 4 },
                borderRadius: 4,
                bgcolor: "#FAFBFA",
              }}
            >
              <Typography
                component="h2"
                sx={{ fontWeight: 700, fontSize: 21, mb: 1 }}
              >
                The heavy things, we can handle
              </Typography>
              <Typography
                sx={{ color: muted, lineHeight: 1.7, mb: 3, maxWidth: 560 }}
              >
                Cooker, jackets, boots, suitcases, thermals — the items that
                take days to shop for. Build your list, see what it weighs, and
                check everything at our Kathmandu office before you pay.
              </Typography>
              <Button
                component={Link}
                href="/build"
                variant="contained"
                endIcon={<ArrowForward />}
                sx={{ borderRadius: 99, px: 3 }}
              >
                Build my pack
              </Button>
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
