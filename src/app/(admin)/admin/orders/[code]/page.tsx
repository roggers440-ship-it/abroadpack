import { notFound } from "next/navigation";
import { getOrder } from "@/lib/admin-orders";
import {
  Container,
  Card,
  CardContent,
  Stack,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Divider,
  Chip,
  Alert,
} from "@mui/material";
import { npr, kg } from "@/lib/money";
import StatusActions from "@/components/admin/StatusActions";

export default async function AdminOrderDetail({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const order = await getOrder(code);
  if (!order) notFound();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
          <Typography variant="h6" sx={{ fontFamily: "monospace" }}>
            {order.code}
          </Typography>
          <Chip size="small" label={order.status.replace(/_/g, " ")} />
        </Stack>

        <Card>
          <CardContent>
            <Stack spacing={0.5}>
              <Typography>{order.customer.fullName}</Typography>
              <Typography variant="body2" color="text.secondary">
                {order.customer.phone} · {order.destination ?? "—"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Placed {order.createdAt.toLocaleDateString("en-GB")}
                {order.depositRef && ` · eSewa ref ${order.depositRef}`}
              </Typography>
            </Stack>
          </CardContent>
        </Card>

        <StatusActions code={order.code} status={order.status} />

        <Card>
          <CardContent>
            <Typography sx={{ fontWeight: 600, mb: 1 }}>
              Sourcing list
            </Typography>
            <Table size="small">
              <TableBody>
                {order.lines.map((l) => (
                  <TableRow key={l.id}>
                    <TableCell>{l.productName}</TableCell>
                    <TableCell>{l.brandName}</TableCell>
                    <TableCell align="right">×{l.qtyOrdered}</TableCell>
                    <TableCell align="right">{npr(l.pricePaisa)}</TableCell>
                    <TableCell align="right">{kg(l.weightGrams)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Divider sx={{ my: 2 }} />
            <Stack spacing={0.5}>
              <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                <Typography variant="body2">Estimated total</Typography>
                <Typography variant="body2">
                  {npr(order.estTotalPaisa)}
                </Typography>
              </Stack>
              <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                <Typography variant="body2">Deposit paid</Typography>
                <Typography variant="body2">
                  {order.status === "DRAFT" ? "—" : npr(order.depositPaisa)}
                </Typography>
              </Stack>
              <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                <Typography variant="body2" color="text.secondary">
                  Total weight
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {kg(order.estWeightGrams)}
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        {order.status === "READY_FOR_PICKUP" && (
          <Alert severity="info">
            Settlement screen comes later — for now record rejected items on
            paper.
          </Alert>
        )}
      </Stack>
    </Container>
  );
}
