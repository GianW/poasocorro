import * as React from "react";
import { Box, Grid, IconButton, Tooltip } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import { Header } from "./Header";
import { PlacesList } from "./PlacesList/PlacesList";
import { Map } from "./Map/Map";
import dados from "../data/dados.json";
import { Filter, CategoryBar } from "./Filter/Filter";

export const Main = () => {
  const [open, setOpen] = React.useState(false);
  const [mapBounds, setMapBounds] = React.useState(null);
  const [hoveredId, setHoveredId] = React.useState(null);
  // mapHoveredId triggers auto-scroll in the list; listHoveredId does not
  const [mapHoveredId, setMapHoveredId] = React.useState(null);

  const handleMapHover = React.useCallback((id) => {
    setHoveredId(id);
    setMapHoveredId(id);
  }, []);
  const [state, setState] = React.useState({
    dados: dados,
    filter: "",
    category: ["Hospital"],
    specialty: [],
  });

  const stabs = React.useMemo(() => filterData(state), [state]);

  const visibleDados = React.useMemo(() => {
    if (!mapBounds) return stabs;
    return stabs.filter((place) =>
      mapBounds.contains([parseFloat(place.latitude), parseFloat(place.longitude)])
    );
  }, [stabs, mapBounds]);

  const handleChangeFilter = (event) => {
    setState((prev) => ({ ...prev, filter: event.target.value }));
  };

  const handleToggleCategory = (tipo) => {
    setState((prev) => {
      const already = prev.category.includes(tipo);
      const newCats = already
        ? prev.category.filter((c) => c !== tipo)
        : [...prev.category, tipo];
      return { ...prev, category: newCats };
    });
  };

  const setFilter = (categories, specialties) =>
    setState((prev) => ({ ...prev, category: categories, specialty: specialties }));

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header handleChange={handleChangeFilter} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
          px: 2,
          gap: 1,
        }}
      >
        <Box sx={{ flex: 1, overflow: "hidden" }}>
          <CategoryBar
            categories={state.category}
            onToggleCategory={handleToggleCategory}
          />
        </Box>
        <Tooltip title="Mais filtros">
          <IconButton
            onClick={() => setOpen(true)}
            sx={{
              border: "1px solid #DDDDDD",
              borderRadius: "8px",
              px: 1.5,
              gap: 0.5,
              flexShrink: 0,
              "&:hover": { backgroundColor: "#F7F7F7" },
            }}
          >
            <TuneIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      <Grid container sx={{ flex: 1, overflow: "hidden" }}>
        <Grid item xs={5} sx={{ height: "100%", overflowY: "auto" }}>
          <PlacesList
            dados={visibleDados}
            hoveredId={hoveredId}
            mapHoveredId={mapHoveredId}
            onHover={setHoveredId}
          />
        </Grid>
        <Grid item xs={7} sx={{ height: "100%", position: "sticky", top: 0 }}>
          <Map
            dados={stabs}
            onBoundsChange={setMapBounds}
            hoveredId={hoveredId}
            onHover={handleMapHover}
            onLeave={() => { setHoveredId(null); setMapHoveredId(null); }}
          />
        </Grid>
      </Grid>

      <Filter
        open={open}
        setOpen={setOpen}
        setFilter={setFilter}
        state={state}
      />
    </Box>
  );
};

const filterData = (state) =>
  state.dados
    .filter((stab) =>
      state.category.length === 0 || state.category.includes(stab.tipo.trim())
    )
    .filter((stab) =>
      state.specialty.length > 0
        ? stab.especialidades.some((r) => state.specialty.includes(r))
        : true
    )
    .filter((stab) => {
      if (state.filter === "") return true;
      const expres = new RegExp(state.filter, "i");
      return expres.test(stab.nome) || expres.test(stab.endereco);
    });
