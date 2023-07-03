import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import slugify from "react-slugify";
import dados from "../data/dados.json";
import {
  AppBar,
  Typography,
  Toolbar,
  Grid,
  Card,
  IconButton,
  Chip,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { makeStyles } from "@mui/styles";

export const Details = () => {
  const params = useParams();
  const classes = useStyles();
  const unit = setUnit(params.nome);
  let navigate = useNavigate();
  return (
    <>
      <AppBar position="static">
        <Toolbar className={classes.toolBar}>
          <IconButton
            aria-label="Settings"
            size="large"
            onClick={() => {
              navigate("/");
            }}
          >
            <ArrowBackIosIcon fontSize="inherit" />
          </IconButton>
          <Typography variant="h6" component="div">
            {unit.nome}
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container layout={"row"}>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <Card className={classes.mainCard}>
            <Grid container layout={"row"}>
              <Grid item xs={7}>
                <Typography variant="h6" component="div">
                  <strong>Unidade: </strong> {unit.nome}
                </Typography>
                <Typography variant="h6" component="div">
                  <strong>Tipo: </strong> {unit.tipo}
                </Typography>
                <Typography variant="h6" component="div">
                  <strong>Administração: </strong> {unit.adm}
                </Typography>
                <Typography variant="h6" component="div">
                  <strong>Telefone: </strong> {unit.telefone}
                </Typography>
                <Typography variant="h6" component="div">
                  <strong>Endereco: </strong> {unit.endereco}
                </Typography>
                <Typography variant="h6" component="div">
                  <strong>Horário funcionamento: </strong>{" "}
                  {unit.hr_funcionamento}
                </Typography>
                {unit.site && (
                  <Typography variant="h6" component="div">
                    <strong>Site: </strong> <a href={unit.nome}>{unit.nome}</a>
                  </Typography>
                )}
                <Typography variant="body1" component="div">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={`https://www.google.com/maps/place/@${unit.latitude},${unit.longitude}`}
                  >
                    Ver no Google maps
                  </a>
                </Typography>
                <div className={classes.especList}>
                  {unit.especialidades.map((especialidade) => (
                    <Chip
                      label={especialidade}
                      variant="outlined"
                      key={especialidade}
                      color="secondary"
                      className={classes.chip}
                    />
                  ))}
                </div>
              </Grid>
              <Grid item xs={5}>
                <img
                  src={unit.imagem}
                  width={400}
                  alt="Foto da frente do estabelecimento de saúde "
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src =
                      "https://www.agenciapreview.com/wp-content/uploads/2018/10/Foto-Orla-Moacyr-Scliar-1-860x480.jpg";
                  }}
                />
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

const setUnit = (nome) => dados.find((unit) => slugify(unit.nome) === nome);

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
    mainCard: {
      marginTop: "5%",
      padding: "5%",
    },
    especList: {
      marginTop: "1%",
      display: "inline-block",
    },
    chip: {
      padding: "5px",
      margin: "5px",
    },
  };
});
