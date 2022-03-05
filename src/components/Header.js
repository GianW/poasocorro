import * as React from "react";
import {
  AppBar,
  Typography,
  Toolbar,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";

export const Header = ({ handleChange, openConfig }) => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolBar}>
        <div>
          <TextField
            id="pesquisar"
            label=""
            variant="outlined"
            margin="dense"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={handleChange}
          />
          <IconButton aria-label="Settings" size="large" onClick={openConfig}>
            <DisplaySettingsIcon fontSize="inherit" />
          </IconButton>
        </div>
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
