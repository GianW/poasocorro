import * as React from "react";
import { Grid } from "@mui/material";
import { Header } from "./Header";
import { PlacesList } from "./PlacesList/PlacesList";
import { Map } from "./Map/Map";
import dados from "../data/dados.json";
import { Filter } from "./Filter/Filter";

export const Main = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const [state, setState] = React.useState({
    dados: dados,
    filter: "",
    category: ["Hospital"],
    specialty: [],
  });

  const stabs = React.useMemo(() => filterData(state), [state]);

  const handleChangeFilter = (event) => {
    setState({
      ...state,
      filter: event.target.value,
    });
  };

  const setFilter = (categories, specialties) =>
    setState({
      ...state,
      category: categories,
      specialty: specialties,
    });

  return (
    <>
      <Header handleChange={handleChangeFilter} openConfig={handleOpen} />
      <Grid container layout={"row"}>
        <Grid item xs={4}>
          <PlacesList dados={stabs} />
        </Grid>
        <Grid item xs={8}>
          <Map dados={stabs} />
        </Grid>
      </Grid>
      <Filter
        open={open}
        setOpen={setOpen}
        setFilter={setFilter}
        state={state}
      />
    </>
  );
};

const filterData = (state) =>
  state.dados
    .filter((stab) => state.category.includes(stab.tipo))
    .filter((stab) => {
      return state.specialty.length > 0
        ? stab.especialidades.some((r) => state.specialty.includes(r))
        : true;
    })
    .filter((stab) => {
      let expres = new RegExp(state.filter, "i");
      if (stab.filter === "") {
        return true;
      } else {
        return expres.test(stab.nome) || expres.test(stab.endereco);
      }
    });
