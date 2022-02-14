import * as React from "react";

import { makeStyles } from "@mui/styles";
import { AppBar, Toolbar, Typography } from "@mui/material";

export const AppHeader = () => {
  const classes = useStyles();

  return (
    <>
      <AppBar position="static">
        <Toolbar className={classes.toolBar}>
          <Typography variant="h6" component="div">
            POA Socorro
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

const useStyles = makeStyles(() => {
  return {
    toolBar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      "& > :first-child": {
        marginLeft: "80%"
      }
    }
  };
});
