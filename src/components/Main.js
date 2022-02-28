import * as React from "react";
import { Grid } from "@mui/material";
import { Header } from "./Header";
import { PlacesList } from "./PlacesList/PlacesList";
import { Map } from "./Map/Map";
import dados from "../data/dados.json";

export const Main = () => {
  const [state, setState] = React.useState({
    dados: dados,
    filter: "",
    category: "",
    specialty: "Hospital",
  });

  const stabs = React.useMemo(() => filterData(state), [state]);

  const handleChangeFilter = (event) => {
    setState({
      ...state,
      filter: event.target.value,
    });
  };

  return (
    <>
      <Header handleChange={handleChangeFilter} />
      <Grid container layout={"row"}>
        <Grid item xs={4}>
          <PlacesList dados={stabs} />
        </Grid>
        <Grid item xs={8}>
          <Map dados={stabs} />
        </Grid>
      </Grid>
    </>
  );
};

const filterData = (state) =>
  state.dados
    .filter((stab) => stab.tipo === state.specialty)
    .filter((stab) => {
      let expres = new RegExp(state.filter, "i");
      if (stab.filter === "") {
        return true;
      } else {
        return expres.test(stab.nome) || expres.test(stab.endereco);
      }
    });
