"use client";

import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { ContentCopy, Check } from "@mui/icons-material";

export default function CopyCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked */
    }
  };

  return (
    <>
      <Typography
        component="span"
        sx={{
          fontFamily: "monospace",
          fontWeight: 700,
          fontSize: 18,
          letterSpacing: "0.02em",
          color: "text.primary",
        }}
      >
        {code}
      </Typography>
      <Box
        component="button"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy order code"}
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 1,
          px: 1.5,
          py: 0.75,
          borderRadius: 2,
          cursor: "pointer",
          font: "inherit",
          bgcolor: copied ? "rgba(0,167,111,0.10)" : "rgba(16,24,40,0.04)",
          border: "1px solid",
          borderColor: copied ? "rgba(0,167,111,0.32)" : "rgba(16,24,40,0.08)",
          transition: "all .18s",
          "&:hover": {
            bgcolor: copied ? "rgba(0,167,111,0.10)" : "rgba(16,24,40,0.07)",
          },
          "&:active": { transform: "scale(0.98)" },
        }}
      >
        <Box
          sx={{
            display: "grid",
            placeItems: "center",
            width: 16,
            height: 16,
            flexShrink: 0,
          }}
        >
          {copied ? (
            <Check sx={{ fontSize: 15, color: "primary.main" }} />
          ) : (
            <ContentCopy sx={{ fontSize: 14, color: "text.secondary" }} />
          )}
        </Box>

        <Typography
          component="span"
          sx={{
            fontSize: 12,
            fontWeight: 600,
            color: copied ? "primary.main" : "text.secondary",
            minWidth: 30,
            textAlign: "left",
          }}
        >
          {copied ? "Copied" : "Copy"}
        </Typography>
      </Box>
    </>
  );
}
