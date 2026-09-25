"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Container,
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Stack,
  Button,
  Switch,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useToast } from "./ToastProvider";
import { apiCall } from "@/lib/api-client";

type Row = {
  id: string;
  name: string;
  isActive: boolean;
  _count: { items: number };
};

export default function PresetTable({ presets }: { presets: Row[] }) {
  const router = useRouter();
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const patch = async (id: string, body: object) => {
    const res = await apiCall(`/api/admin/cms/presets/${id}`, {
      method: "PATCH",
      body,
    });
    if (res.ok) router.refresh();
    else toast.error(res.error);
  };

  const create = async () => {
    const res = await apiCall("/api/admin/cms/presets", {
      method: "POST",
      body: { name },
    });
    if (res.ok) {
      const p = res.data as { id: string };
      router.push(`/admin/catalog/presets/${p.id}`);
    } else toast.error(res.error);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button
        size="small"
        component={Link}
        href="/admin/catalog"
        startIcon={<ArrowBack />}
        sx={{ mb: 2 }}
      >
        Catalog
      </Button>

      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "center", mb: 3 }}
      >
        <Typography variant="h6">Sets</Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add set
        </Button>
      </Stack>

      <Card>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Set</TableCell>
              <TableCell align="right">Items</TableCell>
              <TableCell align="center">Visible</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {presets.map((p) => (
              <TableRow key={p.id} hover>
                <TableCell>{p.name}</TableCell>
                <TableCell align="right">
                  {p._count.items === 0 ? (
                    <Chip size="small" color="warning" label="empty" />
                  ) : (
                    p._count.items
                  )}
                </TableCell>
                <TableCell align="center">
                  <Switch
                    size="small"
                    checked={p.isActive}
                    onChange={(e) =>
                      patch(p.id, { isActive: e.target.checked })
                    }
                  />
                </TableCell>
                <TableCell align="right">
                  <Button
                    size="small"
                    component={Link}
                    href={`/admin/catalog/presets/${p.id}`}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {presets.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  align="center"
                  sx={{ py: 5, color: "text.secondary" }}
                >
                  No sets yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>New set</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Set name"
            sx={{ mt: 1 }}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && name && create()}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={create} disabled={!name.trim()}>
            Create &amp; edit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
