"use client";
import { createTheme } from "@mui/material/styles";

export const shopTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#00A76F", dark: "#007867", light: "#5BE49B" },
    secondary: { main: "#1C252E", dark: "#141A21", contrastText: "#FFFFFF" },
    error: { main: "#E03131", dark: "#A81E1E", light: "#FFA8A8" },
    background: { default: "#FCFCFC", paper: "#FFFFFF" },
    text: { primary: "#111827", secondary: "#6B7280" },
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: "var(--font-inter), system-ui, sans-serif",
    button: { textTransform: "none", fontWeight: 600 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
  },
  components: {
    MuiButton: { defaultProps: { disableElevation: true } },
    MuiPaper: { defaultProps: { elevation: 0 }, styleOverrides: { root: { border: "1px solid #ECECEC" } } },
    MuiCard: { defaultProps: { elevation: 0 }, styleOverrides: { root: { border: "1px solid #ECECEC" } } },
    MuiAppBar: { defaultProps: { elevation: 0, color: "inherit" } },
  },
});