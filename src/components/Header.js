import * as React from "react";
import { AppBar, Typography, Toolbar } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const Header = () => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolBar}>
        <Typography variant="h6" component="div">
          POA Socorro
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles(() => {
  return {
    toolBar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      "& > :first-child": {
        marginLeft: "85%",
      },
    },
  };
});
