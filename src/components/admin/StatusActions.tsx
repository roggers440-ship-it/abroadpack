"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  Stack,
  Button,
  Alert,
  Typography,
} from "@mui/material";

const NEXT: Record<string, { label: string; to: string }[]> = {
  DEPOSIT_PAID: [{ label: "Start sourcing", to: "SOURCING" }],
  SOURCING: [{ label: "Mark ready for pickup", to: "READY_FOR_PICKUP" }],
  READY_FOR_PICKUP: [{ label: "Back to sourcing", to: "SOURCING" }],
};

export default function StatusActions({
  code,
  status,
}: {
  code: string;
  status: string;
}) {
  const router = useRouter();
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const actions = NEXT[status] ?? [];

  if (actions.length === 0) return null;

  const move = async (to: string) => {
    setBusy(true);
    setErr("");
    const res = await fetch(`/api/admin/orders/${code}/status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: to }),
    });
    if (res.ok) router.refresh();
    else setErr((await res.json()).error);
    setBusy(false);
  };

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="body2" color="text.secondary">
            Move this order forward
          </Typography>
          <Stack direction="row" spacing={1}>
            {actions.map((a) => (
              <Button
                key={a.to}
                variant="contained"
                disabled={busy}
                onClick={() => move(a.to)}
              >
                {a.label}
              </Button>
            ))}
          </Stack>
          {err && <Alert severity="error">{err}</Alert>}
        </Stack>
      </CardContent>
    </Card>
  );
}
