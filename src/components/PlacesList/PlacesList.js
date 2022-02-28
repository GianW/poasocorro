import * as React from "react";
import { Grid, Card, CardHeader, CardContent, Typography } from "@mui/material";

export const PlacesList = ({ dados }) => {
  return (
    <>
      <Grid
        style={{
          height: "90vh",
          backgroundColor: "#4d4b49",
          overflow: "auto",
        }}
      >
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
