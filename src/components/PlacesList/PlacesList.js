import * as React from "react";
import { Grid, Card, CardHeader, CardContent, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const PlacesList = ({ dados }) => {
  const classes = useStyles();
  return (
    <>
      <Grid className={classes.gridBox}>
        {dados &&
          dados.map((place) => (
            <Card key={place.cod_estab} style={{ margin: "12px" }}>
              <CardHeader subheader={place.nome} />
              <CardContent>
                <Typography variant="body2">
                  <strong>Endereço:</strong> {place.endereco}
                </Typography>
                <Typography variant="body2">
                  <strong>Horário:</strong> {place.hr_funcionamento}
                </Typography>
                <Typography variant="body2">
                  <strong>Tipo:</strong> {place.tipo}
                </Typography>
                <Typography variant="body2">
                  <strong>Telefone:</strong> {place.telefone}
                </Typography>
                <Typography
                  variant="body2"
                  style={{ maxWidth: "98%", overflowWrap: "break-word" }}
                >
                  <strong>Especialidades:</strong>
                  <br />
                  {place.especialidades.join(",")}
                </Typography>
              </CardContent>
            </Card>
          ))}
      </Grid>
    </>
  );
};

const useStyles = makeStyles(() => {
  return {
    gridBox: {
      height: "90vh",
      backgroundColor: "#4d4b49",
      overflow: "auto",
      "&::-webkit-scrollbar": {
        width: "0.5em",
      },
      "&::-webkit-scrollbar-track": {
        boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
        webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#1a1919",
        outline: "1px solid #4f1616",
      },
    },
  };
});
