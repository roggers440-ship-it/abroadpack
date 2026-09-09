"use client";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { shopTheme } from "./shop";

export default function ShopThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={shopTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
