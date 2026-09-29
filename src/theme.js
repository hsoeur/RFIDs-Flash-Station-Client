import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#24377A",
      dark: "#18275F",
      light: "#EEF1FF",
      contrastText: "#FFFFFF",
    },
    success: { main: "#16805C", dark: "#0E6245", light: "#EAF7F1" },
    error: { main: "#F0443E", dark: "#C8322D", light: "#FFF0EF" },
    warning: { main: "#C96A12", dark: "#96500D", light: "#FFF5E9" },
    info: { main: "#3156B7", light: "#EEF4FF" },
    background: { default: "#F4F6F8", paper: "#FFFFFF" },
    text: { primary: "#111827", secondary: "#667085" },
    divider: "#E1E6EB",
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: 'Inter, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    h1: {
      fontSize: "clamp(1.65rem, 3vw, 2.25rem)",
      lineHeight: 1.18,
      fontWeight: 700,
      letterSpacing: "-0.035em",
    },
    h2: {
      fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
      lineHeight: 1.3,
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h3: { fontSize: "1rem", lineHeight: 1.4, fontWeight: 700 },
    body1: { fontSize: "1rem", lineHeight: 1.55 },
    body2: { fontSize: "0.875rem", lineHeight: 1.5 },
    button: { fontWeight: 700, textTransform: "none", letterSpacing: 0 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { minWidth: 320 },
        "::selection": { backgroundColor: "#DDE4FF", color: "#111827" },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          minHeight: 48,
          borderRadius: 10,
          paddingInline: 20,
          transition: "background-color 140ms ease, border-color 140ms ease",
          "&:focus-visible": { outline: "3px solid #9AAAF0", outlineOffset: 2 },
        },
      },
    },
    MuiTextField: { defaultProps: { variant: "outlined" } },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          minHeight: 56,
          borderRadius: 10,
          backgroundColor: "#FFFFFF",
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderWidth: 2 },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { borderColor: "#E1E6EB", padding: "12px 16px" },
        head: { color: "#475467", fontWeight: 700, backgroundColor: "#F8FAFC" },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: { padding: 12, "&:focus-visible": { outline: "3px solid #9AAAF0" } },
      },
    },
  },
});

export default theme;
