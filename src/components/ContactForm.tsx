"use client";

import { useState } from "react";
import {
  Box,
  Stack,
  TextField,
  Button,
  Typography,
  Alert,
  MenuItem,
} from "@mui/material";

const SUBJECTS = [
  "Question about an order",
  "Item or price question",
  "Baggage weight help",
  "Customs and what I can carry",
  "Something else",
];

export default function ContactForm() {
  const [f, setF] = useState({
    fullName: "",
    phone: "",
    subject: "",
    message: "",
    website: "",
  });
  const [state, setState] = useState<"idle" | "busy" | "done">("idle");
  const [err, setErr] = useState("");

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setF({ ...f, [k]: e.target.value });

  const submit = async () => {
    setState("busy");
    setErr("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(f),
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(d.error ?? "Could not send");
      setState("done");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Could not send");
      setState("idle");
    }
  };

  if (state === "done") {
    return (
      <Alert severity="success" sx={{ borderRadius: 3 }}>
        Message received. We&apos;ll call you back on {f.phone}.
      </Alert>
    );
  }

  const valid = f.fullName.trim() && f.phone.length === 10 && f.message.trim();

  return (
    <Stack spacing={2}>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: { xs: 18, md: 22 },
          letterSpacing: "-0.02em",
          mb: 1,
        }}
      >
        Haven&apos;t found the right help?
      </Typography>

      <TextField
        placeholder="Name"
        fullWidth
        value={f.fullName}
        onChange={set("fullName")}
      />
      <TextField
        placeholder="Phone (98XXXXXXXX)"
        fullWidth
        value={f.phone}
        onChange={(e) =>
          setF({ ...f, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })
        }
      />

      <TextField
        select
        fullWidth
        value={f.subject}
        onChange={set("subject")}
        slotProps={{
          select: {
            displayEmpty: true,
            renderValue: (v: unknown) =>
              v ? (
                (v as string)
              ) : (
                <Box component="span" sx={{ color: "text.disabled" }}>
                  Subject
                </Box>
              ),
          },
        }}
      >
        {SUBJECTS.map((s) => (
          <MenuItem key={s} value={s}>
            {s}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        placeholder="Enter your message here."
        fullWidth
        multiline
        rows={5}
        value={f.message}
        onChange={set("message")}
      />

      {/* honeypot — hidden from humans */}
      <Box
        component="input"
        tabIndex={-1}
        autoComplete="off"
        value={f.website}
        onChange={set("website")}
        sx={{
          position: "absolute",
          left: "-9999px",
          opacity: 0,
          height: 0,
          width: 0,
        }}
      />

      {err && <Alert severity="error">{err}</Alert>}

      <Button
        color="secondary"
        variant="contained"
        size="large"
        onClick={submit}
        sx={{ fontWeight: 600, fontSize: 16 }}
      >
        {state === "busy" ? "Sending…" : "Submit"}
      </Button>
    </Stack>
  );
}
