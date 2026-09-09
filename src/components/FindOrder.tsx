"use client";

import { useState, useEffect } from "react";
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
  Box,
  Divider,
} from "@mui/material";

export default function FindOrder() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [recent, setRecent] = useState<string | null>(null);

  useEffect(() => {
    try {
      setRecent(localStorage.getItem("ap_last_order"));
    } catch {
      /* private mode */
    }
  }, []);

  const submit = async () => {
    setBusy(true);
    setErr("");
    try {
      const res = await fetch("/api/orders/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code }),
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(d.error ?? "Something went wrong");
      router.push(`/order/${d.code}`);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong");
      setBusy(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ py: { xs: 6, md: 10 } }}>
      <Stack spacing={3}>
        <Box>
          <Typography
            sx={{ fontWeight: 700, fontSize: 26, letterSpacing: "-0.02em" }}
          >
            Find my order
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
            Enter the phone number you ordered with and your order code.
          </Typography>
        </Box>

        {recent && (
          <Alert
            severity="info"
            action={
              <Button
                size="small"
                onClick={() => router.push(`/order/${recent}`)}
              >
                Open
              </Button>
            }
          >
            Your last order: {recent}
          </Alert>
        )}

        <Card>
          <CardContent>
            <Stack spacing={2}>
              <TextField
                label="Phone number"
                placeholder="98XXXXXXXX"
                fullWidth
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                }
              />
              <TextField
                label="Order code"
                placeholder="AP-XXXXXXXXXX"
                fullWidth
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                onKeyDown={(e) =>
                  e.key === "Enter" && phone.length === 10 && code && submit()
                }
              />
              {err && <Alert severity="error">{err}</Alert>}
              <Button
                variant="contained"
                size="large"
                onClick={submit}
                disabled={busy || phone.length !== 10 || !code.trim()}
                sx={{ borderRadius: 2 }}
              >
                {busy ? "Checking…" : "Find my order"}
              </Button>
            </Stack>
          </CardContent>
        </Card>

        <Divider />

        <Typography
          variant="body2"
          sx={{ color: "text.secondary", textAlign: "center" }}
        >
          Lost your code? Call us on{" "}
          <Box
            component="a"
            href="tel:+9779840953995"
            sx={{ color: "primary.main", fontWeight: 600 }}
          >
            9840953995
          </Box>{" "}
          and we&apos;ll find it for you.
        </Typography>
      </Stack>
    </Container>
  );
}
