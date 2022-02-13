import * as React from "react";

import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { AppHeader } from "../Header/Header";
import { Map } from "../Map/Map";

export const Main = () => {
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={2}
      className={classes.root}
      alignItems="flex-start"
      direction="row"
      justifyContent="center"
    >
      <AppHeader />
      <Grid item xs={3} style={{ backgroundColor: "black" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          mahoe
        </Typography>
      </Grid>
      <Grid item xs={9}>
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
