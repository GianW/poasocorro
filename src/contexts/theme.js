import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FFE6AB",
    },
    secondary: {
      light: "#0066ff",
      dark: "#ff66ff",
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
  MuiList: {
    dense: true,
  },
  typography: {
    fontFamily: [
      '"Helvetica"',
      '"Roboto"',
      "Google Sans",
      '"Arial"',
      "sans-serif",
    ].join(","),
  },
  MuiCard: {
    root: {
      overflow: "unset",
      transition: "0.3s",
      borderRadius: 16,
      boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
      "&:hover": {
        boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
      },
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "#990000",
        },
      },
    },
  },
});

export default theme;
