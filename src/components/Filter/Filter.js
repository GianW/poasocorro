import * as React from "react";
import {
  Box,
  Chip,
  Divider,
  Drawer,
  Typography,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Stack,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import tipos from "../../data/tipos.json";
import especialidades from "../../data/especialidades.json";

const tipoIcons = {
  Hospital: <LocalHospitalIcon fontSize="small" />,
  PA: <MedicalServicesIcon fontSize="small" />,
  CS: <HealthAndSafetyIcon fontSize="small" />,
  UBS: <HealthAndSafetyIcon fontSize="small" />,
  ESF: <VaccinesIcon fontSize="small" />,
  "ESF ": <VaccinesIcon fontSize="small" />,
  AEM: <MedicalServicesIcon fontSize="small" />,
  AEC: <MedicalServicesIcon fontSize="small" />,
};

export const CategoryBar = ({ categories, onToggleCategory }) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        px: 3,
        py: 1.5,
        overflowX: "auto",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      {tipos.map((tipo) => {
        const isActive = categories.includes(tipo.trim());
        return (
          <Chip
            key={tipo}
            label={tipo.trim()}
            icon={tipoIcons[tipo] || <MedicalServicesIcon fontSize="small" />}
            onClick={() => onToggleCategory(tipo.trim())}
            variant={isActive ? "filled" : "outlined"}
            sx={{
              flexShrink: 0,
              fontWeight: 500,
              borderColor: isActive ? "text.primary" : "divider",
              backgroundColor: isActive ? "text.primary" : "transparent",
              color: isActive ? "background.paper" : "text.primary",
              "& .MuiChip-icon": {
                color: isActive ? "background.paper" : "text.secondary",
              },
              "&:hover": {
                backgroundColor: isActive ? "text.primary" : "action.hover",
              },
            }}
          />
        );
      })}
    </Box>
  );
};

export const Filter = ({ open, setOpen, setFilter, state }) => {
  const theme = useTheme();
  const handleClose = () => setOpen(false);

  const [lists, setLists] = React.useState({
    specialities: initialList(especialidades, state.specialty),
  });

  React.useEffect(() => {
    setLists({ specialities: initialList(especialidades, state.specialty) });
  }, [state.specialty]);

  const checkSpeciality = (name) => {
    setLists((prev) => ({
      specialities: prev.specialities.map((val) =>
        val.name === name ? { ...val, checked: !val.checked } : val
      ),
    }));
  };

  const updateFilter = () => {
    setFilter(
      state.category,
      lists.specialities.filter((e) => e.checked).map((e) => e.name)
    );
    handleClose();
  };

  const clearAll = () => {
    setLists({ specialities: initialList(especialidades, []) });
  };

  return (
    <Drawer anchor="right" open={open} onClose={handleClose}>
      <Box
        sx={{
          width: 360,
          p: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          backgroundColor: "background.paper",
          height: "100%",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" fontWeight={700}>
            Filtros
          </Typography>
          <Button
            size="small"
            onClick={clearAll}
            sx={{ color: "text.secondary", textDecoration: "underline" }}
          >
            Limpar tudo
          </Button>
        </Box>

        <Divider />

        <Typography variant="subtitle1" fontWeight={600}>
          Especialidades
        </Typography>
        <FormGroup>
          {lists.specialities.map((espec) => (
            <FormControlLabel
              key={espec.name}
              control={
                <Checkbox
                  checked={espec.checked}
                  onChange={() => checkSpeciality(espec.name)}
                  sx={{
                    color: "divider",
                    "&.Mui-checked": { color: "text.primary" },
                  }}
                />
              }
              label={
                <Typography variant="body2" sx={{ textTransform: "capitalize" }}>
                  {espec.name}
                </Typography>
              }
            />
          ))}
        </FormGroup>

        <Box sx={{ mt: "auto", pt: 2 }}>
          <Divider sx={{ mb: 2 }} />
          <Stack direction="row" justifyContent="flex-end">
            <Button
              variant="contained"
              onClick={updateFilter}
              sx={{
                borderRadius: "8px",
                backgroundColor: theme.palette.text.primary,
                color: theme.palette.background.paper,
                "&:hover": {
                  backgroundColor:
                    theme.palette.mode === "dark" ? "#CCCCCC" : "#444444",
                },
                px: 4,
              }}
            >
              Aplicar filtros
            </Button>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
};

const initialList = (dados, checkedList) =>
  dados.map((dado) => ({ name: dado, checked: checkedList.includes(dado) }));
