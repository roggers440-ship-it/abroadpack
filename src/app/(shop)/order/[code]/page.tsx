import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
  Divider,
  Alert,
  Chip,
  Button,
  Box,
} from "@mui/material";
import { npr, kg } from "@/lib/money";
import SaveOrderCode from "@/components/SaveOrderCode";
import CopyCode from "@/components/CopyCode";

const LABEL: Record<string, string> = {
  DRAFT: "Awaiting deposit",
  DEPOSIT_PAID: "Confirmed",
  SOURCING: "Sourcing your items",
  READY_FOR_PICKUP: "Ready for pickup",
  SETTLED: "Completed",
  CANCELLED: "Cancelled",
};

export default async function OrderPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const order = await prisma.order.findUnique({
    where: { code },
    include: { lines: true, customer: true },
  });
  if (!order) notFound();

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Stack spacing={3}>
        <SaveOrderCode code={order.code} />
        <Stack spacing={1}>
          <Typography variant="h5">Order {order.code}</Typography>
          <Typography
            sx={{
              color: "text.secondary",
            }}
          >
            {order.customer.fullName} · {order.customer.phone}
          </Typography>
          <Chip
            label={LABEL[order.status] ?? order.status}
            size="small"
            color={order.status === "DRAFT" ? "default" : "primary"}
            sx={{ alignSelf: "flex-start" }}
          />
        </Stack>

        {order.status === "DRAFT" ? (
          <>
            <Alert severity="warning">
              Order is not confirmed until the {npr(order.depositPaisa)} advance
              is paid.
            </Alert>
            <Button
              variant="contained"
              size="large"
              href={`/order/${order.code}/pay`}
            >
              Pay {npr(order.depositPaisa)} deposit
            </Button>
          </>
        ) : (
          <Alert severity="success">
            Deposit of {npr(order.depositPaisa)} received. We&apos;ve started
            sourcing your items — we&apos;ll call you when they&apos;re ready
            for pickup.
          </Alert>
        )}

        <Card>
          <CardContent>
            <Stack spacing={1.5}>
              {order.lines.map((l) => (
                <Stack
                  key={l.id}
                  direction="row"
                  sx={{ justifyContent: "space-between" }}
                >
                  <Stack>
                    <Typography variant="body2">{l.productName}</Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "text.secondary",
                      }}
                    >
                      {l.brandName}
                    </Typography>
                  </Stack>
                  <Typography variant="body2">{npr(l.pricePaisa)}</Typography>
                </Stack>
              ))}
              <Divider />
              <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                <Typography>Estimated total</Typography>
                <Typography>{npr(order.estTotalPaisa)}</Typography>
              </Stack>
              <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                <Typography variant="body2" color="text.secondary">
                  Deposit paid
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {order.status === "DRAFT"
                    ? "—"
                    : `− ${npr(order.depositPaisa)}`}
                </Typography>
              </Stack>
              <Divider />
              <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                <Typography sx={{ fontWeight: 700 }}>
                  Balance at pickup
                </Typography>
                <Typography sx={{ fontWeight: 700 }}>
                  {npr(
                    order.status === "DRAFT"
                      ? order.estTotalPaisa
                      : order.estTotalPaisa - order.depositPaisa,
                  )}
                </Typography>
              </Stack>
              <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                <Typography variant="body2" color="text.secondary">
                  Estimated weight
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {kg(order.estWeightGrams)}
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        <Alert severity="info" sx={{ borderRadius: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.75,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Save your order code:
            </Typography>
            <CopyCode code={order.code} />
          </Box>
          <Typography variant="caption">
            Screenshot this page. You&apos;ll need the code and your phone
            number to open this page again from{" "}
            <Box
              component="a"
              href="/find-order"
              sx={{ color: "inherit", fontWeight: 600 }}
            >
              Find my order
            </Box>
            .
          </Typography>
        </Alert>
        <Divider />
        <Stack direction="row" spacing={2} sx={{ pt: 1 }}>
          <Button href="/">Back to home</Button>
          <Button href="/build">Build another pack</Button>
        </Stack>
      </Stack>
    </Container>
  );
}
