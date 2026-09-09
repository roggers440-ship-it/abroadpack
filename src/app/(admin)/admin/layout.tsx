"use client";

import {
  ThemeProvider,
  CssBaseline,
  createTheme,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";
import ToastProvider from "@/components/admin/ToastProvider";

const adminTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#111827" },
    background: { default: "#F7F8FA" },
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: "var(--font-inter), system-ui, sans-serif",
    button: { textTransform: "none" },
  },
  components: {
    MuiButton: { defaultProps: { disableElevation: true } },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: { root: { border: "1px solid #E5E7EB" } },
    },
    MuiTableCell: {
      styleOverrides: { root: { paddingTop: 10, paddingBottom: 10 } },
    },
  },
});

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin-login";
  };

  return (
    <ThemeProvider theme={adminTheme}>
      <CssBaseline />
      <AppBar
        position="sticky"
        color="inherit"
        elevation={0}
        sx={{ borderBottom: "1px solid #E5E7EB" }}
      >
        <Toolbar>
          <Typography sx={{ flexGrow: 1, fontWeight: 700 }}>
            AbroadPack Admin
          </Typography>
          <Button href="/admin">Orders</Button>
          <Button href="/admin/catalog">Catalog</Button>
          <Button onClick={logout}>Log out</Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
        <ToastProvider>{children}</ToastProvider>
      </Box>
    </ThemeProvider>
  );
}
