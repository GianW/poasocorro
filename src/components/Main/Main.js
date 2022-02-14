import * as React from "react";

import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { AppHeader } from "../Header/Header";
import { Map } from "../Map/Map";
import { ListaUnidades } from "../ListaUnidades/ListaUnidades";

// insp
// https://dev.to/maj07/tutorial-react-leaflet-d65

export const Main = () => {
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={2}
      className={classes.root}
      direction="row"
      justifyContent="center"
    >
      <AppHeader />
      <Grid item xs={4} style={{ backgroundColor: "black", color: "white" }}>
        <ListaUnidades />
      </Grid>
      <Grid xs={8}>
        <Map />
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    root: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(2)
    }
  };
});
