import * as React from "react";
import { AppBar, Typography, Toolbar } from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";

export const Header = () => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolBar}>
        <>a</>
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
      "& > :second-child": {
        marginLeft: "85%",
      },
    },
  };
});
