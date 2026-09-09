"use client";

import { useEffect, useRef } from "react";
import { Box, CircularProgress, Typography, Stack } from "@mui/material";

export default function AutoSubmit({
  action,
  fields,
}: {
  action: string;
  fields: Record<string, string>;
}) {
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    ref.current?.submit();
  }, []);

  return (
    <Box
      sx={{
        display: "grid",
        placeItems: "center",
        minHeight: "60vh",
        bgColor: "#f4f8f8",
      }}
    >
      <Stack spacing={2} sx={{ alignItems: "center" }}>
        <CircularProgress />
        <Typography color="text.secondary">Redirecting to eSewa…</Typography>
      </Stack>
      <form ref={ref} action={action} method="POST">
        {Object.entries(fields).map(([k, v]) => (
          <input key={k} type="hidden" name={k} value={v} />
        ))}
      </form>
    </Box>
  );
}
