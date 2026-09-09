"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  Alert,
  Typography,
  MenuItem,
} from "@mui/material";
import { npr, kg } from "@/lib/money";

const DEPOSIT = 100000;

export default function CheckoutDialog({
  open,
  onClose,
  variantIds,
  totalPaisa,
  totalGrams,
}: {
  open: boolean;
  onClose: () => void;
  variantIds: string[];
  totalPaisa: number;
  totalGrams: number;
}) {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [destination, setDestination] = useState("Germany");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    setBusy(true);
    setErr("");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, phone, destination, variantIds }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      router.push(`/order/${data.code}`);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong");
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Confirm your pack</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          <Typography variant="body2" sx={{
            color: "text.secondary"
          }}>
            {variantIds.length} items · {npr(totalPaisa)} · {kg(totalGrams)}
          </Typography>

          <TextField
            label="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Phone"
            placeholder="98XXXXXXXX"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
            }
            fullWidth
          />
          <TextField
            select
            label="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            fullWidth
          >
            {[
              "Germany",
              "Australia",
              "USA",
              "UK",
              "Canada",
              "Japan",
              "Other",
            ].map((d) => (
              <MenuItem key={d} value={d}>
                {d}
              </MenuItem>
            ))}
          </TextField>

          <Alert severity="info">
            Pay {npr(DEPOSIT)} advance to lock your order. Balance at pickup,
            after you inspect everything. You can drop any item you don&apos;t
            want.
          </Alert>

          {err && <Alert severity="error">{err}</Alert>}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={busy}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={submit}
          disabled={busy || !fullName || phone.length !== 10}
        >
          {busy ? "Placing…" : "Place order"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
