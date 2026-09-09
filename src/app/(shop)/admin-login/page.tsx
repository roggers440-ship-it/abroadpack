"use client";

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
} from "@mui/material";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    setBusy(true);
    setErr("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      const d = await res.json();
      setErr(d.error);
      setBusy(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ py: 12 }}>
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h6">Staff login</Typography>
            <TextField
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              fullWidth
              autoFocus
            />
            {err && <Alert severity="error">{err}</Alert>}
            <Button
              variant="contained"
              onClick={submit}
              disabled={busy || !password}
            >
              {busy ? "Checking…" : "Log in"}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
