import { createTheme } from "@mui/material/styles";

export const createAppTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: { main: "#FF5A5F", contrastText: "#ffffff" },
      secondary: { main: "#00A699" },
      ...(mode === "light"
        ? {
            background: { default: "#F7F7F7", paper: "#FFFFFF" },
            text: { primary: "#222222", secondary: "#717171" },
            divider: "#EBEBEB",
          }
        : {
            background: { default: "#121212", paper: "#1E1E1E" },
            text: { primary: "#F0F0F0", secondary: "#AAAAAA" },
            divider: "#333333",
          }),
    },
    typography: {
      fontFamily: ['"Helvetica Neue"', '"Arial"', "sans-serif"].join(","),
      h6: { fontWeight: 600 },
    },
    shape: { borderRadius: 12 },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            boxShadow: `0 1px 0 ${theme.palette.divider}`,
          }),
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: "none",
            border: "none",
            transition: "box-shadow 0.2s ease, transform 0.2s ease",
          },
        },
      },
    },
  });
