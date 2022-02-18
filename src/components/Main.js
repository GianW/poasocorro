import * as React from "react";
import { Grid } from "@mui/material";
import { Header } from "./Header";
import { PlacesList } from "./PlacesList";
import { Map } from "./Map";

export const Main = () => {
  return (
    <>
      <Header />
      <Grid container layout={"row"} xs={12}>
        <Grid item xs={4}>
          <PlacesList />
        </Grid>
        <Grid item xs={8}>
          <Map />
        </Grid>
      </Grid>
    </>
  );
};
