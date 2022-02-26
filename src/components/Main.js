import * as React from "react";
import { Grid } from "@mui/material";
import { Header } from "./Header";
import { PlacesList } from "./PlacesList/PlacesList";
import { Map } from "./Map/Map";
import dados from "../data/dados.json";

export const Main = () => {
  return (
    <>
      <Header />
      <Grid container layout={"row"}>
        <Grid item xs={4}>
          <PlacesList dados={dados} />
        </Grid>
        <Grid item xs={8}>
          <Map dados={dados} />
        </Grid>
      </Grid>
    </>
  );
};
