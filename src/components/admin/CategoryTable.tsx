"use client";
import Link from "next/link";
import { useState } from "react";
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
  Alert,
} from "@mui/material";

type Row = {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  _count: { products: number };
};

export default function CategoryTable({ categories }: { categories: Row[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [err, setErr] = useState("");

  const patch = async (id: string, body: object) => {
    const res = await fetch(`/api/admin/cms/categories/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) router.refresh();
    else setErr((await res.json()).error);
  };

  const create = async () => {
    const res = await fetch("/api/admin/cms/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (res.ok) {
      setOpen(false);
      setName("");
      router.refresh();
    } else setErr((await res.json()).error);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "center", mb: 3 }}
      >
        <Typography variant="h6">Catalog</Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add category
        </Button>
        <Stack direction="row" spacing={1}>
          <Button component={Link} href="/admin/catalog/presets">
            Sets
          </Button>
          <Button variant="contained" onClick={() => setOpen(true)}>
            Add category
          </Button>
        </Stack>
      </Stack>

      {err && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setErr("")}>
          {err}
        </Alert>
      )}

      <Card>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell align="right">Products</TableCell>
              <TableCell align="center">Visible</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((c) => (
              <TableRow key={c.id} hover>
                <TableCell>{c.name}</TableCell>
                <TableCell align="right">{c._count.products}</TableCell>
                <TableCell align="center">
                  <Switch
                    size="small"
                    checked={c.isActive}
                    onChange={(e) =>
                      patch(c.id, { isActive: e.target.checked })
                    }
                  />
                </TableCell>
                <TableCell align="right">
                  <Button
                    component={Link}
                    href={`/admin/catalog/${c.slug}`}
                    size="small"
                    variant="outlined"
                  >
                    Open
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>New category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Name"
            sx={{ mt: 1 }}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && name && create()}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={create} disabled={!name.trim()}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
