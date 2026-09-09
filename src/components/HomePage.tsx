"use client";

import Link from "next/link";
import {
  Container,
  Typography,
  Button,
  Box,
  Stack,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  LinearProgress,
} from "@mui/material";
import {
  ArrowForward,
  Add,
  CheckCircleOutlined,
  StorefrontOutlined,
  ReplayOutlined,
  VerifiedUser,
  ArrowOutward,
  LocationOn,
} from "@mui/icons-material";
import ContactForm from "./ContactForm";

const FAQS = [
  {
    q: "What if I reject everything at pickup?",
    a: "Your NPR 1,000 deposit is refunded in full. You are never obliged to buy anything you haven't seen and approved in person.",
  },
  {
    q: "Why not just buy from Asan myself?",
    a: "You can. We save you the days of running between markets, and we tell you what each item weighs — which is the part that catches most students out at the airport.",
  },
  {
    q: "Can I add or remove items after ordering?",
    a: "Yes. Removing is easy at pickup. For additions, call us before we start sourcing and we'll update the list.",
  },
  {
    q: "What about food and medicine at customs?",
    a: "The EU bans meat and dairy from Nepal — these are seized at the border. We only sell dry spices, lentils and dried vegetables for EU destinations. Medicines should travel in original packaging with a prescription copy.",
  },
  {
    q: "How long does sourcing take?",
    a: "Usually 3–5 working days. If something takes longer we call you before you travel to the office.",
  },
];

// TODO: REPLACE WITH REAL CUSTOMERS BEFORE LAUNCH — placeholder text for UI testing only
const TESTIMONIALS = [
  {
    name: "Aayush Shrestha",
    route: "Kathmandu → Berlin, Winter 2026",
    text: "I had three days left and no idea what to buy. Built the list on my phone, went to the office once, and walked out with everything. The weight counter saved me — I was 6kg over before I swapped the suitcase.",
  },
  {
    name: "Sneha Karki",
    route: "Kathmandu → Melbourne, 2026",
    text: "My father came with me to check everything. He wanted to see the jacket stitching himself before paying. We dropped two items we didn't need and the bill changed right there.",
  },
  {
    name: "Sneha Karki",
    route: "Kathmandu → Melbourne, 2026",
    text: "My father came with me to check everything. He wanted to see the jacket stitching himself before paying. We dropped two items we didn't need and the bill changed right there.",
  },
];

const ink = "#1C252E";
const muted = "#637381";
const line = "#F0F1F3";

export default function HomePage() {
  return (
    <Box sx={{ color: ink }}>
      {/* ── hero ────────────────────────────── */}
      <Container
        maxWidth="lg"
        sx={{ pt: { xs: 7, md: 12 }, pb: { xs: 8, md: 13 } }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 7, md: 8 }}
          sx={{ alignItems: "center" }}
        >
          {/* left */}
          <Stack spacing={4} sx={{ flex: 1, maxWidth: 560 }}>
            <Chip
              label="Nothing to pay until you see it"
              // size="small"
              sx={{
                alignSelf: "flex-start",
                bgcolor: "rgba(0,167,111,0.08)",
                color: "primary.dark",
                fontWeight: 600,
                borderRadius: 99,
                px: 1.5,
              }}
            />
            <Typography
              sx={{
                fontWeight: 700,
                letterSpacing: "-0.03em",
                fontSize: { xs: 38, md: 64 },
                lineHeight: 1.15,
              }}
            >
              Flying Out Soon?
              <br />
              <Box component="span" sx={{ color: muted }}>
                Get everything in one place.
              </Box>
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: 17, md: 18 },
                color: muted,
                lineHeight: 1.65,
              }}
            >
              Choose what you need, we bring it together, you come see it once.
              Nothing to pay until you&apos;re happy with what&apos;s in front
              of you.
            </Typography>
            <Stack
              direction="row"
              spacing={2}
              sx={{ alignItems: "center", pt: 1 }}
            >
              <Button
                component={Link}
                href="/build"
                variant="contained"
                size="large"
                endIcon={<ArrowForward />}
                sx={{ borderRadius: 99, px: 3.5, py: 1.4 }}
              >
                Build my pack
              </Button>
              <Typography variant="body2" sx={{ color: muted }}>
                Free · no account
              </Typography>
            </Stack>
          </Stack>

          {/* right — offset image pair */}
          <Box
            sx={{
              flex: 1,
              width: "100%",
              position: "relative",
              aspectRatio: { xs: "4/3", md: "1/1" },
              maxWidth: { md: 520 },
            }}
          >
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1648737967037-96967e9151b5?w=800&q=75&auto=format&fit=crop"
              alt="Clothes and shoes packed into a suitcase"
              sx={{
                position: "absolute",
                left: 0,
                bottom: "5%",
                width: "58%",
                aspectRatio: "3/4",
                objectFit: "cover",
                borderRadius: 4,
                zIndex: 2,
                boxShadow: "0 24px 48px -12px rgba(16,24,40,0.28)",
              }}
            />
            {/* back — overhead packing shot */}
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=700&q=80"
              alt="Packing a suitcase, overhead view"
              sx={{
                position: "absolute",
                right: 0,
                top: 0,
                width: "62%",
                aspectRatio: "4/5",
                objectFit: "cover",
                borderRadius: 4,
                zIndex: 1,
                boxShadow: "0 24px 48px -12px rgba(16,24,40,0.18)",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                inset: "8% 4% 4% 8%",
                borderRadius: "50%",
                zIndex: 0,
                background:
                  "radial-gradient(circle, rgba(0,167,111,0.10) 0%, rgba(0,167,111,0) 70%)",
              }}
            />
          </Box>
        </Stack>
      </Container>

      {/* ── how it works ───────────────────── */}
      <Box id="how" sx={{ bgcolor: "#FAFBFA" }}>
        <Container maxWidth="lg" sx={{ py: { xs: 12, md: 22 } }}>
          <Stack spacing={1.5} sx={{ mb: { xs: 6, md: 9 }, maxWidth: 620 }}>
            <Typography
              variant="overline"
              sx={{
                color: "primary.main",
                fontWeight: 700,
                letterSpacing: "0.08em",
              }}
            >
              How it works
            </Typography>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: { xs: 28, md: 40 },
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              Four steps — You pay at the end.
            </Typography>
          </Stack>

          <Box sx={{ position: "relative" }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 56px 1fr" },
                gap: { xs: 5, md: 0 },
                columnGap: { md: 3 },
                rowGap: { md: 3 },
                alignItems: "stretch",
              }}
            >
              <StepCard
                n={1}
                title="Select the Products"
                body="Pick what you need, category by category. Each item has two brand choices. The counter shows your total cost and weight as you go."
                figure={<FigureBuilder />}
              />

              <Arrow dir="right" />
              <StepCard
                n={2}
                title="Refundable Deposit"
                body="A refundable deposit so we can buy stock for you before you arrive. That's the only money that moves until you've seen everything."
                figure={<FigureDeposit />}
              />

              {/* middle row: down arrow under the right column */}
              <Box sx={{ display: { xs: "none", md: "block" } }} />
              <Box sx={{ display: { xs: "none", md: "block" } }} />
              <Arrow dir="down" />

              <StepCard
                n={4}
                title="Check it, then pay"
                body="Try sizes, check the quality, leave behind anything you don't want. The bill changes in front of you."
                figure={<FigureSettlement />}
                sx={{ order: { xs: 4, md: 0 } }}
              />
              <Arrow dir="left" />
              <StepCard
                n={3}
                title="We source it"
                body="We get everything from wholesalers around Kathmandu. It takes three to five days."
                figure={<FigureSourcing />}
                sx={{ order: { xs: 3, md: 0 } }}
              />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ── deposit promise ────────────────── */}
      <Box
        sx={{
          bgcolor: "#1C252E",
          color: "#fff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* soft green glow */}
        <Box
          sx={{
            position: "absolute",
            top: "-40%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 700,
            height: 700,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,167,111,0.18) 0%, rgba(0,167,111,0) 65%)",
            pointerEvents: "none",
          }}
        />

        <Container maxWidth="md" sx={{ py: 10, position: "relative" }}>
          <Stack spacing={3} sx={{ textAlign: "center", alignItems: "center" }}>
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: 99,
                display: "grid",
                placeItems: "center",
                bgcolor: "rgba(0,167,111,0.14)",
                border: "1px solid rgba(91,228,155,0.25)",
              }}
            >
              <VerifiedUser sx={{ fontSize: 30, color: "#5BE49B" }} />
            </Box>

            <Typography
              sx={{
                fontWeight: 700,
                fontSize: { xs: 26, md: 38 },
                letterSpacing: "-0.025em",
                lineHeight: 1.25,
                maxWidth: 640,
              }}
            >
              Reject everything and you still get your{" "}
              <Box component="span" sx={{ color: "#5BE49B" }}>
                Deposit back
              </Box>
              .
            </Typography>

            <Typography
              sx={{
                color: "rgba(255,255,255,0.62)",
                maxWidth: 540,
                lineHeight: 1.7,
                fontSize: 17,
              }}
            >
              The advance only exists so we can buy stock ahead of your visit.
              If nothing meets your expectations at the office, it&apos;s
              refunded in full.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 2, sm: 4 }}
              sx={{ pt: 3, alignItems: "center" }}
            >
              {[
                {
                  icon: <CheckCircleOutlined />,
                  label: "No obligation to buy",
                },
                {
                  icon: <StorefrontOutlined />,
                  label: "Inspect before paying",
                },
                { icon: <ReplayOutlined />, label: "Refunded in full" },
              ].map((f) => (
                <Stack
                  key={f.label}
                  direction="row"
                  spacing={1.25}
                  sx={{ alignItems: "center" }}
                >
                  <Box
                    sx={{
                      color: "#5BE49B",
                      display: "grid",
                      placeItems: "center",
                      "& svg": { fontSize: 19 },
                    }}
                  >
                    {f.icon}
                  </Box>
                  <Typography
                    sx={{ fontSize: 14.5, color: "rgba(255,255,255,0.82)" }}
                  >
                    {f.label}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* ── office ─────────────────────────── */}
      <Box id="office" sx={{ bgcolor: "#FAFBFA" }}>
        <Container maxWidth="lg" sx={{ py: { xs: 12, md: 30 } }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={{ xs: 4, md: 8 }}
            sx={{ alignItems: "center" }}
          >
            {/* TODO: replace with a real photo of the office */}
            <Box
              component="img"
              src="https://static.fibre2fashion.com/newsresource/images/275/shutterstock-498932230_286830.jpg"
              alt="Our Kathmandu office"
              sx={{
                flex: 1,
                width: "100%",
                aspectRatio: "4/3",
                objectFit: "cover",
                borderRadius: 4,
              }}
            />

            <Stack spacing={3} sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: 26, md: 34 },
                  letterSpacing: "-0.02em",
                  lineHeight: 1.25,
                }}
              >
                We&apos;re a real place you can walk into.
              </Typography>
              <Typography sx={{ color: muted, lineHeight: 1.7, fontSize: 17 }}>
                Not an online-only shop. Every order is handed over in person,
                which is why you can check stitching, try sizes, and say no to
                anything.
              </Typography>
              {/* TODO: replace with real address, hours and phone */}
              <Stack spacing={1.5}>
                <Typography sx={{ fontWeight: 600 }}>
                  Putalisadak, Kathmandu, 44500
                </Typography>
                <Typography sx={{ color: muted }}>
                  <b>9840953995</b> · Sun–Fri, 10am–6pm
                </Typography>
              </Stack>

              {/* directions card */}
              <Box
                component="a"
                // TODO: replace with your real coordinates
                href="https://www.google.com/maps/search/?api=1&query=27.7060,85.3250"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 2.25,
                  textDecoration: "none",
                  borderRadius: 3,
                  bgcolor: "#fff",
                  border: "1px solid #F0F1F3",
                  boxShadow: "0 1px 2px rgba(16,24,40,0.04)",
                  transition: "box-shadow .2s, transform .2s, border-color .2s",
                  "&:hover": {
                    borderColor: "transparent",
                    boxShadow:
                      "0 1px 2px rgba(16,24,40,0.04), 0 12px 28px -10px rgba(16,24,40,0.16)",
                    transform: "translateY(-1px)",
                  },
                  "&:hover .arrow": { transform: "translate(3px, -3px)" },
                }}
              >
                <Box
                  sx={{
                    width: 46,
                    height: 46,
                    borderRadius: 2.5,
                    flexShrink: 0,
                    bgcolor: "rgba(0,167,111,0.10)",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <LocationOn sx={{ fontSize: 24, color: "primary.main" }} />
                </Box>

                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                  <Typography
                    sx={{ fontWeight: 600, fontSize: 15, color: ink }}
                  >
                    Find us on Google Maps
                  </Typography>
                  <Typography sx={{ fontSize: 13.5, color: muted, mt: 0.25 }}>
                    Putalisadak, Kathmandu · 5 min from Ratna Park
                  </Typography>
                </Box>

                <ArrowOutward
                  className="arrow"
                  sx={{
                    fontSize: 19,
                    color: muted,
                    flexShrink: 0,
                    transition: "transform .2s",
                  }}
                />
              </Box>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* ── testimonials ───────────────────── */}
      <Box
        sx={{
          bgcolor: "#f4f8f8",
        }}
      >
        <Container sx={{ py: { xs: 12, md: 20 } }}>
          <Stack spacing={1.5} sx={{ mb: 6, maxWidth: 520 }}>
            <Typography
              variant="overline"
              sx={{
                color: "primary.main",
                fontWeight: 700,
                letterSpacing: "0.08em",
              }}
            >
              Students
            </Typography>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: { xs: 28, md: 36 },
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              Packed with us, landed sorted.
            </Typography>
          </Stack>

          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            {TESTIMONIALS.map((t, i) => (
              <Box
                key={i}
                sx={{
                  flex: 1,
                  p: 4,
                  borderRadius: 4,
                  bgcolor: "#FAFBFA",
                  boxShadow:
                    "0 1px 2px rgba(16,24,40,0.04), 0 16px 40px -12px rgba(16,24,40,0.10)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 16,
                    lineHeight: 1.55,
                    letterSpacing: "-0.01em",
                    flexGrow: 1,
                    color: ink,
                  }}
                >
                  {t.text}
                </Typography>
                <Divider />
                <Stack
                  direction="row"
                  spacing={1.75}
                  sx={{ alignItems: "center" }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 99,
                      bgcolor: "#EEF1EF",
                      flexShrink: 0,
                    }}
                  />
                  <Box sx={{ minWidth: 0 }}>
                    <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                      {t.name}
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: muted }}>
                      {t.route}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* ── faq + contact ──────────────────── */}
      <Container id="contact" maxWidth="lg" sx={{ py: { xs: 9, md: 14 } }}>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: { xs: 28, md: 36 },
            letterSpacing: "-0.02em",
            mb: { xs: 5, md: 8 },
          }}
        >
          Frequently asked questions
        </Typography>

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 10, md: 16 }}
        >
          <Box sx={{ flex: 1 }}>
            {FAQS.map((f) => (
              <Accordion
                key={f.q}
                disableGutters
                sx={{
                  bgcolor: "transparent",
                  boxShadow: "none",
                  border: "none",
                  borderBottom: `1px solid ${line}`,
                  borderRadius: 0,
                  paddingY: 2,
                  "&:before": { display: "none" },
                  "&.Mui-expanded": { margin: 0 },
                }}
              >
                <AccordionSummary
                  expandIcon={<Add sx={{ fontSize: 20, color: muted }} />}
                  sx={{
                    px: 0,
                    py: 1.75,
                    "& .MuiAccordionSummary-content": { my: 0 },
                    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded svg":
                      {
                        transform: "rotate(45deg)",
                      },
                    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                      transform: "none",
                    },
                  }}
                >
                  <Typography sx={{ fontWeight: 600, fontSize: 16 }}>
                    {f.q}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 0, pt: 0, pb: 2.5 }}>
                  <Typography
                    sx={{ color: muted, lineHeight: 1.75, fontSize: 15.5 }}
                  >
                    {f.a}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>

          <Box sx={{ flex: 1 }}>
            <ContactForm />
          </Box>
        </Stack>
      </Container>

      {/* ── closing ────────────────────────── */}
      <Box sx={{ bgcolor: "#FAFBFA" }}>
        <Container
          maxWidth="md"
          sx={{ py: { xs: 9, md: 13 }, textAlign: "center" }}
        >
          <Stack spacing={3} sx={{ alignItems: "center" }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: { xs: 28, md: 38 },
                letterSpacing: "-0.025em",
                lineHeight: 1.2,
              }}
            >
              Start with the weight tracker.
            </Typography>
            <Typography
              sx={{
                color: muted,
                maxWidth: 460,
                fontSize: 17,
                lineHeight: 1.7,
              }}
            >
              Free, no account, no commitment. See what actually fits in your
              baggage allowance before you spend anything.
            </Typography>
            <Button
              component={Link}
              href="/build"
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              sx={{ borderRadius: 99, px: 3.5, py: 1.4, mt: 1 }}
            >
              Build my pack
            </Button>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Typography variant="body2" sx={{ color: muted }}>
          AbroadPack Nepal · Kathmandu
        </Typography>
      </Container>
    </Box>
  );
}

/* ── figures ──────────────────────────── */

function FigureBuilder() {
  return (
    <Frame>
      <Stack spacing={1.5} sx={{ py: 1.3 }}>
        {[
          {
            name: "Pressure Cooker 3L",
            brand: "Hawkins 3L Aluminium",
            price: "NPR 3,400",
            kg: "1.9 kg",
            on: true,
          },
          {
            name: "Snow Boots",
            brand: "Anti-slip insulated",
            price: "NPR 7,200",
            kg: "1.5 kg",
            on: true,
          },
          {
            name: "Thermal Set",
            brand: "Jockey heavyweight",
            price: "NPR 2,800",
            kg: "0.6 kg",
            on: false,
          },
        ].map((r) => (
          <Stack
            key={r.name}
            direction="row"
            spacing={1.5}
            sx={{ alignItems: "center" }}
          >
            <Box
              sx={{
                width: 18,
                height: 18,
                borderRadius: 0.75,
                flexShrink: 0,
                bgcolor: r.on ? "primary.main" : "transparent",
                border: r.on ? "none" : `1.5px solid #DFE3E8`,
                display: "grid",
                placeItems: "center",
                color: "#fff",
                fontSize: 12,
              }}
            >
              {r.on ? "✓" : ""}
            </Box>
            <Box
              sx={{
                width: 34,
                height: 34,
                borderRadius: 1,
                bgcolor: "#F4F6F8",
                flexShrink: 0,
              }}
            />
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Typography sx={{ fontSize: 13, fontWeight: 600 }} noWrap>
                {r.name}
              </Typography>
              <Typography sx={{ fontSize: 11.5, color: muted }} noWrap>
                {r.brand}
              </Typography>
            </Box>
            <Stack sx={{ alignItems: "flex-end", flexShrink: 0 }}>
              <Typography sx={{ fontSize: 12.5, fontWeight: 600 }}>
                {r.price}
              </Typography>
              <Typography sx={{ fontSize: 11.5, color: muted }}>
                {r.kg}
              </Typography>
            </Stack>
          </Stack>
        ))}

        <Divider sx={{ pt: 0.5 }} />

        <Box>
          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", my: 0.75 }}
          >
            <Typography sx={{ fontSize: 12.5, color: muted }}>
              3.4 kg of 46 kg
            </Typography>
            <Typography sx={{ fontSize: 13, fontWeight: 700 }}>
              NPR 10,600
            </Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={7}
            sx={{ height: 6, borderRadius: 99, bgcolor: "#F0F1F3" }}
          />
        </Box>
      </Stack>
    </Frame>
  );
}

function FigureDeposit() {
  return (
    <Frame>
      <Stack
        spacing={2.5}
        sx={{ py: 1.5, alignItems: "center", textAlign: "center" }}
      >
        <Typography sx={{ fontSize: 12.5, color: muted }}>
          Pay to confirm
        </Typography>
        <Typography
          sx={{
            fontSize: 40,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1,
          }}
        >
          NPR 1,000
        </Typography>
        <Chip
          label="Fully Refundable"
          size="small"
          sx={{
            bgcolor: "rgba(0,167,111,0.08)",
            color: "primary.dark",
            fontWeight: 600,
            borderRadius: 99,
          }}
        />
        <Divider flexItem />
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <Box
            sx={{ width: 30, height: 30, borderRadius: 1, bgcolor: "#F4F6F8" }}
          />
          <Typography sx={{ fontSize: 13, color: muted }}>
            eSewa · Fonepay
          </Typography>
        </Stack>
      </Stack>
    </Frame>
  );
}

function FigureSourcing() {
  return (
    <Frame>
      <Stack spacing={2} sx={{ py: 1.5, alignItems: "flex-start" }}>
        <Typography sx={{ fontSize: 12.5, color: muted }}>
          Order AP-3F9A2C
        </Typography>
        {[
          { label: "Deposit received", done: true },
          { label: "Sourcing from wholesalers", done: true, active: true },
          { label: "Ready for pickup", done: false },
        ].map((s, i, arr) => (
          <Stack
            key={s.label}
            direction="row"
            spacing={1.75}
            sx={{ alignItems: "flex-start", mt: 0.5 }}
          >
            <Stack sx={{ alignItems: "center", pt: 0.25 }}>
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  borderRadius: 99,
                  flexShrink: 0,
                  bgcolor: s.done ? "primary.main" : "#fff",
                  border: s.done ? "none" : "1.5px solid #DFE3E8",
                  display: "grid",
                  placeItems: "center",
                  color: "#fff",
                  fontSize: 10,
                }}
              >
                {s.done ? "✓" : ""}
              </Box>
              {i < arr.length - 1 && (
                <Box
                  sx={{
                    width: 1.5,
                    height: 22,
                    bgcolor: s.done ? "primary.main" : "#EDEFF1",
                    opacity: 0.35,
                  }}
                />
              )}
            </Stack>
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: s.active ? 600 : 400,
                color: s.done ? ink : muted,
              }}
            >
              {s.label}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Frame>
  );
}

function FigureSettlement() {
  return (
    <Frame>
      <Stack spacing={1.5}>
        <Typography sx={{ fontSize: 12.5, color: muted }}>
          At the counter
        </Typography>

        {[
          { name: "Pressure Cooker 3L", price: "NPR 3,400", kept: true },
          { name: "Snow Boots", price: "NPR 7,200", kept: false },
          { name: "Utensil Set", price: "NPR 2,100", kept: true },
        ].map((r) => (
          <Stack
            key={r.name}
            direction="row"
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Typography
              sx={{
                fontSize: 14,
                color: r.kept ? ink : muted,
                textDecoration: r.kept ? "none" : "line-through",
              }}
            >
              {r.name}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              {!r.kept && (
                <Typography
                  sx={{ fontSize: 11, color: muted, fontWeight: 600 }}
                >
                  removed
                </Typography>
              )}
              <Typography
                sx={{
                  fontSize: 13.5,
                  color: r.kept ? ink : muted,
                  textDecoration: r.kept ? "none" : "line-through",
                }}
              >
                {r.price}
              </Typography>
            </Stack>
          </Stack>
        ))}

        <Divider sx={{ pt: 0.5 }} />

        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <Typography sx={{ fontSize: 13, color: muted }}>
            Deposit paid
          </Typography>
          <Typography sx={{ fontSize: 13, color: muted }}>
            − NPR 1,000
          </Typography>
        </Stack>
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "baseline" }}
        >
          <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
            Balance due
          </Typography>
          <Typography
            sx={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em" }}
          >
            NPR 4,500
          </Typography>
        </Stack>
      </Stack>
    </Frame>
  );
}

/* ── step card ────────────────────────── */

function StepCard({
  n,
  title,
  body,
  figure,
  sx,
}: {
  n: number;
  title: string;
  body: string;
  figure: React.ReactNode;
  sx?: object;
}) {
  return (
    <Box
      sx={{
        p: { xs: 3, md: 3.5 },
        display: "flex",
        flexDirection: "column",
        gap: 2.5,
        ...sx,
      }}
    >
      <Stack spacing={1.25}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <Box
            sx={{
              width: 30,
              height: 30,
              borderRadius: 99,
              bgcolor: "primary.main",
              color: "#fff",
              display: "grid",
              placeItems: "center",
              fontSize: 13,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {n}
          </Box>
          <Typography
            sx={{ fontWeight: 700, fontSize: 19, letterSpacing: "-0.01em" }}
          >
            {title}
          </Typography>
        </Stack>
        <Typography sx={{ color: muted, lineHeight: 1.65, fontSize: 15 }}>
          {body}
        </Typography>
      </Stack>
      <Box sx={{ mb: "auto" }}>{figure}</Box>
    </Box>
  );
}

function Arrow({ dir }: { dir: "right" | "down" | "left" }) {
  const vertical = dir === "down";
  const rotate = dir === "right" ? 0 : dir === "down" ? 90 : 180;

  return (
    <Box
      sx={{
        display: { xs: "none", md: "grid" },
        placeItems: "center",
        minHeight: vertical ? 72 : "auto",
        height: vertical ? "auto" : "100%",
        width: "100%",
      }}
    >
      <Box
        component="svg"
        viewBox="0 0 48 32"
        preserveAspectRatio="none"
        sx={{
          width: vertical ? 40 : "100%",
          height: vertical ? 48 : 26,
          transform: `rotate(${rotate}deg)`,
          overflow: "visible",
        }}
      >
        {/* shaft + head as one polygon */}
        <polygon
          points="0,10 30,10 30,0 48,16 30,32 30,22 0,22"
          fill="#00A76F"
        />
      </Box>
    </Box>
  );
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        borderRadius: 3,
        bgcolor: "#fff",
        p: 2.5,
        boxShadow:
          "0 1px 2px rgba(16,24,40,0.04), 0 16px 40px -12px rgba(16,24,40,0.10)",
      }}
    >
      {children}
    </Box>
  );
}
