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
  Chip,
  Box,
} from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";

type Product = {
  id: string;
  name: string;
  isActive: boolean;
  imageUrl: string | null;
  _count: { variants: number };
};

export default function ProductTable({
  category,
}: {
  category: { id: string; name: string; products: Product[] };
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [err, setErr] = useState("");

  const patch = async (id: string, body: object) => {
    const res = await fetch(`/api/admin/cms/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) router.refresh();
    else setErr((await res.json()).error);
  };

  const create = async () => {
    const res = await fetch("/api/admin/cms/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ categoryId: category.id, name }),
    });
    if (res.ok) {
      const p = await res.json();
      router.push(`/admin/catalog/product/${p.id}`);
    } else setErr((await res.json()).error);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button
        size="small"
        component={Link}
        href="/admin/catalog"
        sx={{ mb: 2 }}
        startIcon={<ArrowBackIcon />}
      >
        All categories
      </Button>

      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "center", mb: 3 }}
      >
        <Typography variant="h6">{category.name}</Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add product
        </Button>
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
              <TableCell />
              <TableCell>Product</TableCell>
              <TableCell align="right">Brands</TableCell>
              <TableCell align="center">Visible</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {category.products.map((p) => (
              <TableRow key={p.id} hover>
                <TableCell sx={{ width: 56 }}>
                  <Box
                    component="img"
                    src={p.imageUrl || "https://placehold.co/80x80?text=%20"}
                    alt=""
                    sx={{
                      width: 40,
                      height: 40,
                      objectFit: "cover",
                      borderRadius: 1,
                      border: "1px solid #E5E7EB",
                    }}
                  />
                </TableCell>
                <TableCell>{p.name}</TableCell>
                <TableCell align="right">
                  {p._count.variants === 0 ? (
                    <Chip size="small" color="warning" label="none" />
                  ) : (
                    p._count.variants
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
                    component={Link}
                    href={`/admin/catalog/product/${p.id}`}
                    size="small"
                    variant="outlined"
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {category.products.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  align="center"
                  sx={{ py: 5, color: "text.secondary" }}
                >
                  No products yet.
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
        <DialogTitle>New product</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Product name"
            sx={{ mt: 1 }}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && name && create()}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={create} disabled={!name.trim()}>
            Create & edit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
