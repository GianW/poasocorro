import * as React from "react";
import {
  AppBar,
  Toolbar,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { ColorModeContext } from "../contexts/ColorMode";

export const Header = ({ handleChange }) => {
  const theme = useTheme();
  const { toggleColorMode } = React.useContext(ColorModeContext);
  const isDark = theme.palette.mode === "dark";

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar sx={{ justifyContent: "center", py: 1, gap: 2, position: "relative" }}>
        <Box
          component="img"
          src="/favicon.ico"
          alt="POA Socorro"
          sx={{ width: 32, height: 32, position: "absolute", left: 24 }}
        />

        <TextField
          placeholder="Buscar estabelecimento ou endereço..."
          variant="outlined"
          size="small"
          onChange={handleChange}
          sx={{
            width: { xs: "100%", sm: 480 },
            "& .MuiOutlinedInput-root": {
              borderRadius: "40px",
              backgroundColor: "background.paper",
              boxShadow: "0 1px 2px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.08)",
              "& fieldset": { borderColor: "divider" },
              "&:hover fieldset": { borderColor: "text.primary" },
              "&.Mui-focused fieldset": { borderColor: "text.primary", borderWidth: 2 },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "primary.main" }} />
              </InputAdornment>
            ),
          }}
        />

        <Tooltip title={isDark ? "Modo claro" : "Modo escuro"}>
          <IconButton
            onClick={toggleColorMode}
            sx={{
              position: "absolute",
              right: 24,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: "50%",
            }}
          >
            {isDark ? (
              <LightModeIcon fontSize="small" />
            ) : (
              <DarkModeIcon fontSize="small" />
            )}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};
