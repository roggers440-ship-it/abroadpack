import Link from "next/link";
import { listOrders, orderCounts } from "@/lib/admin-orders";
import {
  Container,
  Stack,
  Typography,
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Button,
  Box,
} from "@mui/material";
import { npr, kg } from "@/lib/money";
import type { OrderStatus } from "@/generated/prisma/enums";

const TABS: { label: string; value?: OrderStatus }[] = [
  { label: "All" },
  { label: "Draft", value: "DRAFT" },
  { label: "Deposit paid", value: "DEPOSIT_PAID" },
  { label: "Sourcing", value: "SOURCING" },
  { label: "Ready", value: "READY_FOR_PICKUP" },
  { label: "Settled", value: "SETTLED" },
];

const COLOR: Record<
  string,
  "default" | "warning" | "info" | "success" | "error"
> = {
  DRAFT: "default",
  DEPOSIT_PAID: "warning",
  SOURCING: "info",
  READY_FOR_PICKUP: "info",
  SETTLED: "success",
  CANCELLED: "error",
};

export default async function AdminOrders({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const active = status as OrderStatus | undefined;
  const [orders, counts] = await Promise.all([
    listOrders(active),
    orderCounts(),
  ]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Orders
      </Typography>

      <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: "wrap" }}>
        {TABS.map((t) => (
          <Link
            key={t.label}
            href={t.value ? `/admin?status=${t.value}` : "/admin"}
            style={{ textDecoration: "none" }}
          >
            <Chip
              clickable
              label={t.value ? `${t.label} (${counts[t.value] ?? 0})` : t.label}
              color={active === t.value ? "primary" : "default"}
              variant={active === t.value ? "filled" : "outlined"}
            />
          </Link>
        ))}
      </Stack>

      <Card>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Code</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell align="right">Items</TableCell>
              <TableCell align="right">Est. total</TableCell>
              <TableCell align="right">Weight</TableCell>
              <TableCell>Status</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((o) => (
              <TableRow key={o.id} hover>
                <TableCell sx={{ fontFamily: "monospace" }}>{o.code}</TableCell>
                <TableCell>
                  <Box>{o.customer.fullName}</Box>
                  <Box sx={{ color: "text.secondary", fontSize: 12 }}>
                    {o.customer.phone}
                  </Box>
                </TableCell>
                <TableCell>{o.destination ?? "—"}</TableCell>
                <TableCell align="right">{o._count.lines}</TableCell>
                <TableCell align="right">{npr(o.estTotalPaisa)}</TableCell>
                <TableCell align="right">{kg(o.estWeightGrams)}</TableCell>
                <TableCell>
                  <Chip
                    size="small"
                    label={o.status.replace(/_/g, " ")}
                    color={COLOR[o.status]}
                  />
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    size="small"
                    href={`/admin/orders/${o.code}`}
                  >
                    Open
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {orders.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={8}
                  align="center"
                  sx={{ py: 6, color: "text.secondary" }}
                >
                  No orders here yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </Container>
  );
}
