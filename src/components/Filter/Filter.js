import * as React from "react";
import {
  Modal,
  Box,
  Typography,
  Grid,
  Button,
  Switch,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import tipos from "../../data/tipos.json";
import especialidades from "../../data/especialidades.json";

export const Filter = ({ open, setOpen, setFilter, state }) => {
  const handleClose = () => setOpen(false);

  const [lists, setLists] = React.useState({
    categories: initialList(tipos, state.category),
    specialities: initialList(especialidades, state.specialty),
  });

  const checkSpeciality = (event) => {
    let newSpec = lists.specialities.map((val) => {
      if (val.name === event.target.id) {
        val.checked = !val.checked;
      }
      return val;
    });

    setLists({ ...lists, specialities: newSpec });
  };

  const checkCategory = (event) => {
    let newSpec = lists.categories.map((val) => {
      if (val.name === event.target.id) {
        val.checked = !val.checked;
      }
      return val;
    });

    setLists({ ...lists, categories: newSpec });
  };

  const updateFilter = () => {
    setFilter(
      lists.categories.filter((elem) => elem.checked).map((elem) => elem.name),
      lists.specialities.filter((elem) => elem.checked).map((elem) => elem.name)
    );
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Filtro de busca
        </Typography>
        <Grid container spacing={2}>
          <Grid
            item
            xs={6}
            style={{
              maxHeight: "100vh",
              columnCount: "2",
              columnGap: "50%",
            }}
          >
            <Typography>Especialidades</Typography>
            <FormGroup>
              {lists &&
                lists.specialities.map((espec) => (
                  <SwitchButton
                    key={espec.name}
                    elem={espec}
                    changeFunc={checkSpeciality}
                  />
                ))}
            </FormGroup>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={5}>
            <Typography>Tipos</Typography>
            <FormGroup>
              {lists &&
                lists.categories.map((tipo) => (
                  <SwitchButton
                    key={tipo.name}
                    elem={tipo}
                    changeFunc={checkCategory}
                  />
                ))}
            </FormGroup>
          </Grid>
          <Grid item xs={8}></Grid>
          <Grid item xs={4}>
            <Button variant="contained" onClick={updateFilter}>
              Aplicar filtros
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

const SwitchButton = ({ elem, changeFunc }) => (
  <FormControlLabel
    key={elem.name}
    control={
      <Switch
        id={elem.name}
        checked={elem.checked}
        color="secondary"
        onChange={changeFunc}
      />
    }
    label={elem.name}
  />
);

const initialList = (dados, checkedList) =>
  dados.map((dado) => ({ name: dado, checked: checkedList.includes(dado) }));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
